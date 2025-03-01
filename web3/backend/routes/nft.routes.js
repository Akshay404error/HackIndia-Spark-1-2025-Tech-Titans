const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

// NFT Contract ABI - This is a simplified version, you'll need to replace it with your actual ABI
const NFT_ABI = [
  "function mint(address to, string memory tokenURI) public returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

// Get provider and signer
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Mint new NFT
router.post('/mint', async (req, res) => {
  try {
    const { address, tokenURI } = req.body.params || {};
    
    if (!address || !tokenURI) {
      return res.status(400).json({
        jsonrpc: "2.0",
        id: req.body.id || null,
        error: {
          code: -32602,
          message: "Invalid params",
          data: {
            message: "address and tokenURI are required"
          }
        }
      });
    }

    const nftContract = new ethers.Contract(process.env.NFT_CONTRACT_ADDRESS, NFT_ABI, wallet);
    const tx = await nftContract.mint(address, tokenURI);
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

// Get NFT metadata
router.get('/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const nftContract = new ethers.Contract(process.env.NFT_CONTRACT_ADDRESS, NFT_ABI, provider);
    
    const tokenURI = await nftContract.tokenURI(tokenId);
    const owner = await nftContract.ownerOf(tokenId);
    
    res.json({
      jsonrpc: "2.0",
      id: 1,
      result: {
        tokenId,
        tokenURI,
        owner
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