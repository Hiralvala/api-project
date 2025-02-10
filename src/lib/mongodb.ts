// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
// const DB_NAME = process.env.DB_NAME || 'userData';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}


export async function connectDB(dbName:string) {

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!, {
      dbName: dbName, // Specify the database name
    });

    console.log(`Successfully connected to MongoDB database: ${dbName}`);
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}