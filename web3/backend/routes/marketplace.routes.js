const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

// Marketplace Contract ABI
const MARKETPLACE_ABI = [
  "function createListing(uint256 tokenId, uint256 price) public",
  "function buyNFT(uint256 tokenId) public payable",
  "function cancelListing(uint256 tokenId) public",
  "function getListing(uint256 tokenId) public view returns (address seller, uint256 price, bool active)",
  "event ListingCreated(uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event ListingSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price)",
  "event ListingCanceled(uint256 indexed tokenId, address indexed seller)"
];

// Get provider and signer
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Create new listing
router.post('/list', async (req, res) => {
  try {
    const { tokenId, price } = req.body.params || {};

    if (!tokenId || !price) {
      return res.status(400).json({
        jsonrpc: "2.0",
        id: req.body.id || null,
        error: {
          code: -32602,
          message: "Invalid params",
          data: {
            message: "tokenId and price are required"
          }
        }
      });
    }

    const marketplaceContract = new ethers.Contract(process.env.MARKETPLACE_CONTRACT_ADDRESS, MARKETPLACE_ABI, wallet);
    const tx = await marketplaceContract.createListing(tokenId, ethers.utils.parseEther(price.toString()));
    const receipt = await tx.wait();
    
    res.json({
      jsonrpc: "2.0",
      id: req.body.id || 1,
      result: {
        success: true,
        transactionHash: receipt.transactionHash,
        events: receipt.events
      }
    });
  } catch (error) {
    res.status(500).json({
      jsonrpc: "2.0",
      id: req.body.id || null,
      error: {
        code: -32603,
        message: "Internal error",
        data: {
          message: error.message
        }
      }
    });
  }
});

// Buy NFT
router.post('/buy/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const marketplaceContract = new ethers.Contract(process.env.MARKETPLACE_CONTRACT_ADDRESS, MARKETPLACE_ABI, wallet);
    
    const listing = await marketplaceContract.getListing(tokenId);
    const tx = await marketplaceContract.buyNFT(tokenId, { value: listing.price });
    const receipt = await tx.wait();
    
    res.json({
      jsonrpc: "2.0",
      id: req.body.id || 1,
      result: {
        success: true,
        transactionHash: receipt.transactionHash,
        events: receipt.events
      }
    });
  } catch (error) {
    res.status(500).json({
      jsonrpc: "2.0",
      id: req.body.id || null,
      error: {
        code: -32603,
        message: "Internal error",
        data: {
          message: error.message
        }
      }
    });
  }
});

// Cancel listing
router.delete('/cancel/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const marketplaceContract = new ethers.Contract(process.env.MARKETPLACE_CONTRACT_ADDRESS, MARKETPLACE_ABI, wallet);
    
    const tx = await marketplaceContract.cancelListing(tokenId);
    const receipt = await tx.wait();
    
    res.json({
      success: true,
      transactionHash: receipt.transactionHash,
      events: receipt.events
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get listing details
router.get('/listing/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const marketplaceContract = new ethers.Contract(process.env.MARKETPLACE_CONTRACT_ADDRESS, MARKETPLACE_ABI, provider);
    
    const listing = await marketplaceContract.getListing(tokenId);
    
    res.json({
      jsonrpc: "2.0",
      id: 1,
      result: {
        tokenId,
        seller: listing.seller,
        price: ethers.utils.formatEther(listing.price),
        active: listing.active
      }
    });
  } catch (error) {
    res.status(500).json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32603,
        message: "Internal error",
        data: {
          message: error.message
        }
      }
    });
  }
});

module.exports = router; 