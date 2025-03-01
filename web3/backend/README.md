# NFT Marketplace Backend

This is the backend service for the NFT Marketplace with Creator-Owned Smart Contracts.

## Features

- NFT minting and management
- Marketplace operations (list, buy, cancel)
- Integration with Ethereum blockchain
- Custom royalty support
- Multi-chain compatibility

## Prerequisites

- Node.js v14+ and npm
- Ethereum wallet with some test ETH (for Sepolia testnet)
- Alchemy API key or similar Ethereum node provider

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
PORT=5000
RPC_URL=your-ethereum-node-url
PRIVATE_KEY=your-private-key
NFT_CONTRACT_ADDRESS=your-nft-contract-address
MARKETPLACE_CONTRACT_ADDRESS=your-marketplace-contract-address
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### NFT Operations

- `POST /api/nft/mint` - Mint a new NFT
- `GET /api/nft/:tokenId` - Get NFT metadata

### Marketplace Operations

- `POST /api/marketplace/list` - Create new listing
- `POST /api/marketplace/buy/:tokenId` - Buy NFT
- `DELETE /api/marketplace/cancel/:tokenId` - Cancel listing
- `GET /api/marketplace/listing/:tokenId` - Get listing details

## Security

- Never commit your `.env` file
- Keep your private keys secure
- Use environment variables for sensitive data

## Deployment

The backend can be deployed to any Node.js hosting service like:
- Heroku
- DigitalOcean
- AWS
- Google Cloud Platform 