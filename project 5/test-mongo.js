import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testMongoConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found in environment variables');
    console.log('Please add your MongoDB connection string to the .env file');
    return;
  }

  console.log('🔄 Attempting to connect to MongoDB...');
  
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test database access
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log(`📚 Database: ${db.databaseName}`);
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('Collection names:', collections.map(c => c.name));
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(error.message);
    
    // Provide specific error guidance
    if (error.message.includes('authentication')) {
      console.log('\n💡 Authentication Error Solutions:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Verify database user permissions in MongoDB Atlas');
      console.log('3. Make sure the user has readWrite access to the database');
    }
    
    if (error.message.includes('network') || error.message.includes('timeout')) {
      console.log('\n💡 Network Error Solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your IP is whitelisted in MongoDB Atlas Network Access');
      console.log('3. Try adding 0.0.0.0/0 to Network Access for testing');
    }
    
    if (error.message.includes('parse')) {
      console.log('\n💡 Connection String Error:');
      console.log('1. Check for typos in your connection string');
      console.log('2. Ensure special characters in password are URL-encoded');
      console.log('3. Verify the cluster name is correct');
    }
    
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

// Run the test
testMongoConnection();
