const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data
const volunteerData = {
  type: "volunteer",
  name: "Test Volunteer",
  skills: ["web design", "copywriting"],
  interests: ["education", "environment"],
  availability: "weekends",
  city: "Pune",
  bio: "Passionate about helping NGOs with their digital presence"
};

const ngoData = {
  type: "ngo",
  name: "Test NGO",
  needs: ["web developer", "content writer"],
  cause: "education",
  schedule: "flexible",
  city: "Pune",
  requirements: ["basic computer skills"],
  description: "We help underprivileged children access quality education"
};

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test health check
    console.log('1. Testing health check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', health.data);

    // Create volunteer profile
    console.log('\n2. Creating volunteer profile...');
    const volunteerResponse = await axios.post(`${BASE_URL}/api/profile/upsert`, volunteerData);
    console.log('✅ Volunteer created:', volunteerResponse.data);
    const volunteerId = volunteerResponse.data.id;

    // Create NGO profile
    console.log('\n3. Creating NGO profile...');
    const ngoResponse = await axios.post(`${BASE_URL}/api/profile/upsert`, ngoData);
    console.log('✅ NGO created:', ngoResponse.data);
    const ngoId = ngoResponse.data.id;

    // Wait a moment for embeddings to be processed
    console.log('\n4. Waiting for embeddings to be processed...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test volunteer -> NGO recommendations
    console.log('\n5. Testing volunteer -> NGO recommendations...');
    const ngoRecommendations = await axios.post(`${BASE_URL}/api/recommend/ngos`, {
      volunteerId: volunteerId,
      city: "Pune"
    });
    console.log('✅ NGO recommendations:', ngoRecommendations.data);

    // Test NGO -> volunteer recommendations
    console.log('\n6. Testing NGO -> volunteer recommendations...');
    const volunteerRecommendations = await axios.post(`${BASE_URL}/api/recommend/volunteers`, {
      ngoId: ngoId,
      city: "Pune"
    });
    console.log('✅ Volunteer recommendations:', volunteerRecommendations.data);

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run tests
testAPI();
