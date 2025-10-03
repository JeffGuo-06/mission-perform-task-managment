const mongoose = require('mongoose');

let app = null;
let isConnected = false;

async function connectDB() {
  console.log('connectDB called, isConnected:', isConnected, 'readyState:', mongoose.connection.readyState);
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
  console.log('MONGODB_URI preview:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 30) + '...' : 'undefined');

  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Using cached connection');
    return;
  }

  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Error stack:', err.stack);
    throw err;
  }
}

module.exports = async (req, res) => {
  try {
    console.log('Request received:', req.method, req.url);

    // Ensure DB is connected before handling request
    await connectDB();

    // Lazy load the app after connection
    if (!app) {
      console.log('Loading Express app...');
      app = require('../server');
    }

    return app(req, res);
  } catch (err) {
    console.error('Error in serverless function:', err);
    return res.status(500).json({ error: err.message });
  }
};
