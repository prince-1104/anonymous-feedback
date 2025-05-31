// lib/mongodb/dbConnect.ts
import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  if (connection.isConnected === 1) {
    // Already connected
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
      return;
    }

    // If not connected, disconnect first to avoid parallel connections in dev
    await mongoose.disconnect();
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '');
    connection.isConnected = db.connections[0].readyState;

    if (process.env.NODE_ENV === 'development') {
      console.log(' MongoDB connected');
    }
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1); // Optional: only in CLI context
  }
}
