// lib/dbConnect.js
import mongoose from 'mongoose';

// Use global for caching across hot reloads
const globalWithMongoose = globalThis;
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}
let cached = globalWithMongoose.mongoose;

async function dbConnect() {
  // Ensure MongoDB URI is defined at runtime
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;