const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { ethers } = require('ethers');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: '*', // Be more specific in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error",
        data: {
          message: err.message
        }
      }
    });
  }
  next();
});

// Import routes
const nftRoutes = require('./routes/nft.routes');
const marketplaceRoutes = require('./routes/marketplace.routes');

// Use routes
app.use('/api/nft', nftRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Contract address from the frontend
const CONTACT_ADDRESS = '0xef0b101f2c64242a4a360db6fd5a67cdde8cae06';

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({
    jsonrpc: "2.0",
    id: 1,
    result: {
      status: 'ok',
      timestamp: new Date().toISOString()
    }
  });
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    jsonrpc: "2.0",
    id: null,
    error: {
      code: -32601,
      message: "Method not found",
      data: {
        message: "The requested endpoint does not exist"
      }
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    jsonrpc: "2.0",
    id: null,
    error: {
      code: -32603,
      message: "Internal error",
      data: {
        message: "An unexpected error occurred"
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 