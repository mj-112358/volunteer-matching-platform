const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db, profiles;

// Build text to embed
function buildVolunteerText(doc) {
  const parts = [
    'Type: volunteer',
    doc.name || '',
    `Skills: ${(doc.skills || []).join(', ')}`,
    `Interests: ${(doc.interests || []).join(', ')}`,
    `Availability: ${doc.availability || ''}`,
    `City: ${doc.city || ''}`,
    `Languages: ${(doc.languages || []).join(', ')}`,
    doc.bio || ''
  ];
  return parts.filter(Boolean).join('\n');
}

function buildNgoText(doc) {
  const parts = [
    'Type: ngo',
    doc.name || '',
    `Needs: ${(doc.needs || []).join(', ')}`,
    `Cause: ${doc.cause || ''}`,
    `Schedule: ${doc.schedule || ''}`,
    `City: ${doc.city || ''}`,
    `Requirements: ${(doc.requirements || []).join(', ')}`,
    doc.description || ''
  ];
  return parts.filter(Boolean).join('\n');
}

// Choose ONE of these embedding functions:

// A) Azure OpenAI embeddings (recommended for your Azure setup)
// async function embedText(text) {
//   const endpoint = process.env.AZURE_OAI_ENDPOINT;
//   const deployment = process.env.AZURE_EMBED_DEPLOYMENT; // embeddings deployment name (not gpt-4o)
//   const url = `${endpoint}/openai/deployments/${deployment}/embeddings?api-version=2024-02-15-preview`;
  
//   const res = await axios.post(
//     url,
//     { input: text },
//     { headers: { 'api-key': process.env.AZURE_OAI_API_KEY, 'Content-Type': 'application/json' } }
//   );
//   // Azure returns { data: [ { embedding: [...] } ] }
//   return res.data.data[0].embedding;
// }

// B) OpenAI embeddings (switch to this since you have OpenAI key)
async function embedText(text) {
  const url = 'https://api.openai.com/v1/embeddings';
  const res = await axios.post(
    url,
    { model: 'text-embedding-3-small', input: text },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' } }
  );
  return res.data.data[0].embedding;
}

// Upsert profile: generate embedding and save
app.post('/api/profile/upsert', async (req, res) => {
  try {
    const doc = req.body; // { type: 'volunteer'|'ngo', ...fields }
    if (!doc.type) return res.status(400).json({ ok: false, error: 'type is required' });

    // Build text
    const text = doc.type === 'ngo' ? buildNgoText(doc) : buildVolunteerText(doc);
    const embedding = await embedText(text); // length must match index dimensions (e.g., 1536)

    doc.embedding = embedding;
    doc.updatedAt = new Date();

    if (doc._id) {
      const id = new ObjectId(doc._id);
      delete doc._id;
      await profiles.updateOne({ _id: id }, { $set: doc }, { upsert: true });
      return res.json({ ok: true, id: id.toString() });
    } else {
      const result = await profiles.insertOne(doc);
      return res.json({ ok: true, id: result.insertedId.toString() });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Add debugging endpoint to check what's in the database
app.get('/api/debug/profiles', async (req, res) => {
  try {
    const volunteers = await profiles.find({ type: 'volunteer' }).limit(5).toArray();
    const ngos = await profiles.find({ type: 'ngo' }).limit(5).toArray();
    const total = await profiles.countDocuments();
    
    res.json({
      ok: true,
      total,
      volunteers: volunteers.length,
      ngos: ngos.length,
      sampleVolunteer: volunteers[0] ? {
        name: volunteers[0].name,
        city: volunteers[0].city,
        hasEmbedding: !!volunteers[0].embedding
      } : null,
      sampleNgo: ngos[0] ? {
        name: ngos[0].name,
        city: ngos[0].city,
        hasEmbedding: !!ngos[0].embedding
      } : null
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Volunteer -> NGOs recommendations (with better debugging)
app.post('/api/recommend/ngos', async (req, res) => {
  try {
    const { volunteerId, city } = req.body;
    console.log('🔍 Finding volunteer:', volunteerId);
    
    const vol = await profiles.findOne({ _id: new ObjectId(volunteerId), type: 'volunteer' });
    if (!vol) return res.status(404).json({ ok: false, error: 'Volunteer not found' });
    
    console.log('✅ Found volunteer:', vol.name, 'in', vol.city);

    // Build text
    let embedding = vol.embedding;
    if (!embedding) {
      console.log('🔮 Generating embedding for volunteer...');
      const text = buildVolunteerText(vol);
      console.log('📝 Text to embed:', text);
      embedding = await embedText(text);
      await profiles.updateOne({ _id: vol._id }, { $set: { embedding } });
      console.log('✅ Embedding generated and saved');
    } else {
      console.log('✅ Using existing embedding');
    }

    // Check how many NGOs exist
    const ngoCount = await profiles.countDocuments({ type: 'ngo' });
    console.log('📊 Total NGOs in database:', ngoCount);
    
    if (ngoCount === 0) {
      return res.json({ ok: true, results: [], message: 'No NGOs in database' });
    }

    console.log('🔍 Searching for similar NGOs...');
    
    // Simplified pipeline for debugging
    const pipeline = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: embedding,
          numCandidates: 100,
          limit: 50
        }
      },
      {
        $match: {
          type: 'ngo'
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          name: 1,
          cause: 1,
          city: 1,
          needs: 1,
          score: { $meta: 'vectorSearchScore' }
        }
      }
    ];

    console.log('🚀 Running aggregation pipeline...');
    const results = await profiles.aggregate(pipeline).toArray();
    console.log('📊 Vector search results:', results.length);
    
    if (results.length > 0) {
      console.log('✅ Top result:', {
        name: results[0].name,
        score: results[0].score,
        city: results[0].city
      });
    }

    // Don't filter by city for now to get more results
    const filteredResults = city ? results.filter(r => r.city === city) : results;
    console.log('📊 After city filter:', filteredResults.length);

    res.json({ ok: true, results: filteredResults });
  } catch (e) {
    console.error('❌ Recommendation error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// NGO -> Volunteers recommendations
app.post('/api/recommend/volunteers', async (req, res) => {
  try {
    const { ngoId, city } = req.body;
    const ngo = await profiles.findOne({ _id: new ObjectId(ngoId), type: 'ngo' });
    if (!ngo) return res.status(404).json({ ok: false, error: 'NGO not found' });

    // Build text
    let embedding = ngo.embedding;
    if (!embedding) {
      const text = buildNgoText(ngo);
      embedding = await embedText(text);
      await profiles.updateOne({ _id: ngo._id }, { $set: { embedding } });
    }

    // Remove filter from $vectorSearch - handle filtering after
    const pipeline = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: embedding,
          numCandidates: 100,
          limit: 50 // Get more results to filter
        }
      },
      {
        $match: {
          type: 'volunteer',
          ...(city && { city: city })
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          name: 1,
          city: 1,
          skills: 1,
          interests: 1,
          availability: 1,
          score: { $meta: 'vectorSearchScore' }
        }
      }
    ];

    const results = await profiles.aggregate(pipeline).toArray();

    await profiles.updateOne(
      { _id: ngo._id },
      { $set: { recommendations: results.map(r => ({ id: r._id, score: r.score, savedAt: new Date() })) } }
    );

    res.json({ ok: true, results });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Add a list all profiles endpoint for debugging
app.get('/api/profiles', async (req, res) => {
  try {
    const { type, limit = 10 } = req.query;
    const filter = type ? { type } : {};
    const results = await profiles.find(filter)
      .limit(parseInt(limit))
      .project({ embedding: 0 }) // Don't return embeddings in list
      .toArray();
    res.json({ ok: true, results, count: results.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Server is running', timestamp: new Date() });
});

// Add GET endpoint for seed data (for easy browser access)
app.get('/api/seed', async (req, res) => {
  try {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Seed Database</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .button { background: #007bff; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin: 10px 0; }
            .button:hover { background: #0056b3; }
            .result { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>🌱 Seed Database with Sample Data</h1>
          <p>Click the button below to add sample volunteers and NGOs to your database:</p>
          <button class="button" onclick="seedDatabase()">Add Sample Data</button>
          <div id="result"></div>
          
          <script>
            async function seedDatabase() {
              const resultDiv = document.getElementById('result');
              resultDiv.innerHTML = '<div class="result">⏳ Adding sample data...</div>';
              
              try {
                const response = await fetch('/api/seed', { 
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                
                if (data.ok) {
                  resultDiv.innerHTML = \`
                    <div class="result" style="background: #d4edda; border-color: #c3e6cb;">
                      ✅ Success! Added \${data.inserted} profiles:<br>
                      📊 \${data.ngos} NGOs<br>
                      👥 \${data.volunteers} Volunteers<br><br>
                      You can now test the AI matching on your website!
                    </div>
                  \`;
                } else {
                  resultDiv.innerHTML = \`<div class="result" style="background: #f8d7da; border-color: #f5c6cb;">❌ Error: \${data.error}</div>\`;
                }
              } catch (error) {
                resultDiv.innerHTML = \`<div class="result" style="background: #f8d7da; border-color: #f5c6cb;">❌ Error: \${error.message}</div>\`;
              }
            }
          </script>
        </body>
      </html>
    `);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Add seed data endpoint
app.post('/api/seed', async (req, res) => {
  try {
    // Sample NGOs
    const sampleNGOs = [
      {
        type: 'ngo',
        name: 'Tech for Education',
        city: 'Mumbai',
        cause: 'education',
        needs: ['web developers', 'teachers', 'content creators'],
        schedule: 'flexible, remote work available',
        description: 'We build educational apps and platforms for underprivileged children. Looking for passionate developers and educators to help bridge the digital divide.',
        updatedAt: new Date()
      },
      {
        type: 'ngo',
        name: 'Green Future Foundation',
        city: 'Delhi',
        cause: 'environment',
        needs: ['environmental scientists', 'social media managers', 'event coordinators'],
        schedule: 'weekends and evenings',
        description: 'Dedicated to environmental conservation and awareness. We organize tree planting drives, clean-up campaigns, and educational workshops.',
        updatedAt: new Date()
      },
      {
        type: 'ngo',
        name: 'HealthCare for All',
        city: 'Bangalore',
        cause: 'healthcare',
        needs: ['doctors', 'nurses', 'health awareness volunteers'],
        schedule: 'flexible timing',
        description: 'Providing free healthcare services to rural and urban poor communities. We run mobile clinics and health awareness programs.',
        updatedAt: new Date()
      },
      {
        type: 'ngo',
        name: 'Skills Development Hub',
        city: 'Pune',
        cause: 'skill development',
        needs: ['trainers', 'career counselors', 'industry mentors'],
        schedule: 'weekends',
        description: 'Empowering youth with technical and soft skills training. We focus on job readiness and entrepreneurship development.',
        updatedAt: new Date()
      }
    ];

    // Sample Volunteers
    const sampleVolunteers = [
      {
        type: 'volunteer',
        name: 'Priya Sharma',
        city: 'Mumbai',
        skills: ['web development', 'react', 'javascript'],
        interests: ['education', 'technology', 'teaching'],
        availability: 'weekends, 10 hours/week',
        bio: 'Software engineer passionate about using technology for social good. Love teaching kids coding.',
        updatedAt: new Date()
      },
      {
        type: 'volunteer',
        name: 'Arjun Patel',
        city: 'Delhi',
        skills: ['environmental science', 'project management', 'public speaking'],
        interests: ['environment', 'sustainability', 'climate change'],
        availability: 'evenings and weekends',
        bio: 'Environmental activist with 5 years experience in conservation projects. Passionate about creating awareness.',
        updatedAt: new Date()
      },
      {
        type: 'volunteer',
        name: 'Dr. Meera Reddy',
        city: 'Bangalore',
        skills: ['medical practice', 'health education', 'community outreach'],
        interests: ['healthcare', 'rural development', 'women health'],
        availability: 'flexible, 15 hours/week',
        bio: 'Medical doctor with experience in rural healthcare. Committed to making healthcare accessible to all.',
        updatedAt: new Date()
      },
      {
        type: 'volunteer',
        name: 'Rohit Kumar',
        city: 'Pune',
        skills: ['digital marketing', 'content creation', 'photography'],
        interests: ['youth development', 'skill training', 'social media'],
        availability: 'weekends',
        bio: 'Marketing professional who loves mentoring young people and creating engaging content for social causes.',
        updatedAt: new Date()
      }
    ];

    // Generate embeddings for all profiles
    const allProfiles = [...sampleNGOs, ...sampleVolunteers];
    
    for (let profile of allProfiles) {
      const text = profile.type === 'ngo' ? buildNgoText(profile) : buildVolunteerText(profile);
      profile.embedding = await embedText(text);
    }

    // Insert into database
    await profiles.deleteMany({}); // Clear existing data
    const result = await profiles.insertMany(allProfiles);
    
    console.log('✅ Seed data inserted successfully');
    res.json({ 
      ok: true, 
      message: 'Seed data inserted', 
      inserted: result.insertedIds.length,
      ngos: sampleNGOs.length,
      volunteers: sampleVolunteers.length
    });
  } catch (e) {
    console.error('Seed error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Test semantic search endpoint
app.post('/api/test/semantic', async (req, res) => {
  try {
    const { query } = req.body;
    
    // Create a test volunteer profile with the query
    const testProfile = {
      type: 'volunteer',
      name: 'Test User',
      city: 'Mumbai',
      skills: [query],
      interests: [query],
      availability: 'flexible',
      bio: `I am passionate about ${query}`
    };
    
    const text = buildVolunteerText(testProfile);
    const embedding = await embedText(text);
    
    // Search for similar NGOs
    const pipeline = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: embedding,
          numCandidates: 100,
          limit: 10
        }
      },
      {
        $match: {
          type: 'ngo'
        }
      },
      {
        $project: {
          name: 1,
          cause: 1,
          needs: 1,
          description: 1,
          score: { $meta: 'vectorSearchScore' }
        }
      }
    ];
    
    const results = await profiles.aggregate(pipeline).toArray();
    
    res.json({
      ok: true,
      query,
      testText: text,
      results: results.map(r => ({
        name: r.name,
        cause: r.cause,
        score: Math.round(r.score * 100) + '%',
        matchReason: `Matches "${query}" with their focus on ${r.cause}`
      }))
    });
    
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Start server
(async () => {
  try {
    await client.connect();
    db = client.db(process.env.DATABASE_NAME || 'MAUKA');
    profiles = db.collection('profiles');
    
    console.log('✅ Connected to MongoDB');
    console.log(`📁 Database: ${process.env.DATABASE_NAME || 'MAUKA'}`);
    console.log('📄 Collection: profiles');
    
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`🚀 API running on http://localhost:${port}`);
      console.log('📋 Available endpoints:');
      console.log('  POST /api/profile/upsert');
      console.log('  POST /api/recommend/ngos');
      console.log('  POST /api/recommend/volunteers');
      console.log('  GET  /api/profiles');
      console.log('  POST /api/seed');
      console.log('  GET  /health');
      console.log('');
      console.log('🌱 To add seed data, visit: http://localhost:4000/api/seed');
      });
    } catch (e) {
      console.error('Failed to start server:', e);
      process.exit(1);
    }
  })();
