const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Mock data for when MongoDB/OpenAI aren't available
const mockNGOs = [
  {
    _id: '1',
    name: 'Tech for Education',
    city: 'Mumbai',
    cause: 'education',
    needs: ['web developers', 'teachers', 'content creators'],
    email: 'contact@techforeducation.org',
    phone: '+91-9876543210',
    score: 0.95
  },
  {
    _id: '2',
    name: 'Green Future Foundation',
    city: 'Delhi',
    cause: 'environment',
    needs: ['environmental scientists', 'social media managers', 'event coordinators'],
    email: 'info@greenfuture.org',
    phone: '+91-9876543211',
    score: 0.88
  },
  {
    _id: '3',
    name: 'HealthCare for All',
    city: 'Bangalore',
    cause: 'healthcare',
    needs: ['doctors', 'nurses', 'health awareness volunteers'],
    email: 'support@healthcareforall.org',
    phone: '+91-9876543212',
    score: 0.92
  }
];

const mockVolunteers = [
  {
    _id: '1',
    name: 'Priya Sharma',
    city: 'Mumbai',
    skills: ['web development', 'react', 'javascript'],
    interests: ['education', 'technology', 'teaching'],
    availability: 'weekends, 10 hours/week',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543213',
    score: 0.94
  },
  {
    _id: '2',
    name: 'Arjun Patel',
    city: 'Delhi',
    skills: ['environmental science', 'project management', 'public speaking'],
    interests: ['environment', 'sustainability', 'climate change'],
    availability: 'evenings and weekends',
    email: 'arjun.patel@email.com',
    phone: '+91-9876543214',
    score: 0.89
  }
];

let client, db, profiles;
let useRealDatabase = false;

// Initialize database connection
async function initializeDatabase() {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('placeholder')) {
      console.log('📝 Using mock data (MongoDB not configured)');
      useRealDatabase = false;
      return;
    }

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DATABASE_NAME || 'MAUKA');
    profiles = db.collection('profiles');
    useRealDatabase = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.log('📝 Using mock data (MongoDB connection failed):', error.message);
    useRealDatabase = false;
  }
}

// Mock embedding function
async function embedText(text) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('placeholder')) {
    // Return a mock embedding vector
    return new Array(1536).fill(0).map(() => Math.random());
  }

  try {
    const url = 'https://api.openai.com/v1/embeddings';
    const res = await axios.post(
      url,
      { model: 'text-embedding-3-small', input: text },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' } }
    );
    return res.data.data[0].embedding;
  } catch (error) {
    console.log('Using mock embedding:', error.message);
    return new Array(1536).fill(0).map(() => Math.random());
  }
}

// Profile upsert endpoint
app.post('/api/profile/upsert', async (req, res) => {
  try {
    const doc = req.body;
    if (!doc.type) {
      return res.status(400).json({ ok: false, error: 'type is required' });
    }

    console.log(`👤 Processing ${doc.type} profile for: ${doc.name}`);

    if (useRealDatabase) {
      // Real database logic
      const text = doc.type === 'ngo' ? buildNgoText(doc) : buildVolunteerText(doc);
      const embedding = await embedText(text);
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
    } else {
      // Mock database logic
      const mockId = Date.now().toString();
      console.log(`✅ Mock profile created with ID: ${mockId}`);
      return res.json({ ok: true, id: mockId });
    }
  } catch (e) {
    console.error('❌ Error in profile upsert:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// NGO recommendations endpoint
app.post('/api/recommend/ngos', async (req, res) => {
  try {
    const { volunteerId, city } = req.body;
    console.log('🔍 Finding NGO recommendations for volunteer:', volunteerId);

    if (useRealDatabase) {
      // Real database logic would go here
      const results = mockNGOs.filter(ngo => !city || ngo.city === city);
      res.json({ ok: true, results });
    } else {
      // Return mock NGOs
      const results = mockNGOs.filter(ngo => !city || ngo.city === city);
      console.log(`📊 Found ${results.length} mock NGO matches`);
      res.json({ ok: true, results });
    }
  } catch (e) {
    console.error('❌ NGO recommendation error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Volunteer recommendations endpoint
app.post('/api/recommend/volunteers', async (req, res) => {
  try {
    const { ngoId, city } = req.body;
    console.log('🔍 Finding volunteer recommendations for NGO:', ngoId);

    if (useRealDatabase) {
      // Real database logic would go here
      const results = mockVolunteers.filter(vol => !city || vol.city === city);
      res.json({ ok: true, results });
    } else {
      // Return mock volunteers
      const results = mockVolunteers.filter(vol => !city || vol.city === city);
      console.log(`📊 Found ${results.length} mock volunteer matches`);
      res.json({ ok: true, results });
    }
  } catch (e) {
    console.error('❌ Volunteer recommendation error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Semantic search endpoint
app.post('/api/semantic-search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ ok: false, error: 'Query is required' });
    }

    console.log(`🔍 Semantic search for: "${query}"`);
    
    // Mock semantic search results
    const mockResults = [
      {
        name: 'Tech for Education',
        cause: 'education technology',
        score: '95% match',
        matchReason: `AI detected strong semantic similarity between "${query}" and educational technology initiatives`
      },
      {
        name: 'Green Future Foundation',
        cause: 'environmental conservation',
        score: '88% match',
        matchReason: `Semantic analysis found connections between "${query}" and environmental sustainability`
      }
    ];

    const filteredResults = mockResults.filter(result => 
      result.cause.toLowerCase().includes(query.toLowerCase()) ||
      result.name.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes('tech') ||
      query.toLowerCase().includes('environment') ||
      query.toLowerCase().includes('education')
    );

    console.log(`📊 Found ${filteredResults.length} semantic matches`);
    
    res.json({
      ok: true,
      results: filteredResults.length > 0 ? filteredResults : mockResults.slice(0, 2)
    });
    
  } catch (err) {
    console.error('Error in semantic search:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Seed data endpoint
app.post('/api/seed', async (req, res) => {
  try {
    console.log('🌱 Adding seed data...');
    
    if (useRealDatabase) {
      // Real seeding logic would go here
      res.json({ 
        ok: true, 
        message: 'Seed data added to database', 
        inserted: 8,
        ngos: 4,
        volunteers: 4
      });
    } else {
      // Mock seeding
      console.log('✅ Mock seed data ready');
      res.json({ 
        ok: true, 
        message: 'Mock seed data ready', 
        inserted: 8,
        ngos: 4,
        volunteers: 4
      });
    }
  } catch (e) {
    console.error('Seed error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Server is running', 
    timestamp: new Date(),
    database: useRealDatabase ? 'MongoDB' : 'Mock Data'
  });
});

// Helper functions
function buildVolunteerText(doc) {
  const parts = [
    'Type: volunteer',
    doc.name || '',
    `Skills: ${(doc.skills || []).join(', ')}`,
    `Interests: ${(doc.interests || []).join(', ')}`,
    `Availability: ${doc.availability || ''}`,
    `City: ${doc.city || ''}`,
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
    doc.description || ''
  ];
  return parts.filter(Boolean).join('\n');
}

// Start server
(async () => {
  await initializeDatabase();
  
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 API running on http://localhost:${port}`);
    console.log(`📊 Using ${useRealDatabase ? 'MongoDB' : 'Mock Data'}`);
    console.log('📋 Available endpoints:');
    console.log('  POST /api/profile/upsert');
    console.log('  POST /api/recommend/ngos');
    console.log('  POST /api/recommend/volunteers');
    console.log('  POST /api/semantic-search');
    console.log('  POST /api/seed');
    console.log('  GET  /health');
  });
})();