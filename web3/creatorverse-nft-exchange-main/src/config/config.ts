export const config = {
  API_URL: process.env.VITE_API_URL || 'http://localhost:5000/api',
  RPC_URL: process.env.VITE_RPC_URL || 'http://localhost:8545',
  NFT_CONTRACT_ADDRESS: process.env.VITE_NFT_CONTRACT_ADDRESS || '0xef0b101f2c64242a4a360db6fd5a67cdde8cae06',
  MARKETPLACE_CONTRACT_ADDRESS: process.env.VITE_MARKETPLACE_CONTRACT_ADDRESS || '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  CHAIN_ID: 31337, // Local Hardhat network
  NETWORK_NAME: 'Hardhat Local',
  CURRENCY: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  // Error messages
  ERRORS: {
    NO_METAMASK: 'Please install MetaMask to use this application',
    WRONG_NETWORK: 'Please switch to the Hardhat Local network',
    NOT_CONNECTED: 'Please connect your wallet',
    TRANSACTION_FAILED: 'Transaction failed. Please try again.'
  }
}; 