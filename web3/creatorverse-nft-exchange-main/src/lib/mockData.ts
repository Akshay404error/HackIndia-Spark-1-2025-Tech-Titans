import { NFT, Creator, Collection, Blockchain, User, Bid, Sale } from './types';

// Creators
export const creators: Creator[] = [
  {
    id: "creator-1",
    name: "Alex Rivera",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isVerified: true,
    bio: "Digital artist exploring the boundaries of reality and imagination",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j",
    bannerUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    socialLinks: {
      website: "https://alexrivera.art",
      twitter: "@alexrivera_art",
      instagram: "@alexrivera_art",
      discord: "alexrivera#1234"
    }
  },
  {
    id: "creator-2",
    name: "Maya Johnson",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    isVerified: true,
    bio: "Blending traditional art techniques with blockchain technology",
    walletAddress: "0x2b3c4d5e6f7g8h9i0j1k",
    bannerUrl: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    socialLinks: {
      website: "https://mayajohnson.io",
      twitter: "@mayaj_nft",
      instagram: "@mayaj_art",
      discord: "mayaj#5678"
    }
  },
  {
    id: "creator-3",
    name: "Daniel Lee",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    isVerified: false,
    bio: "Creating abstract representations of mathematical concepts",
    walletAddress: "0x3c4d5e6f7g8h9i0j1k2l",
    bannerUrl: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    socialLinks: {
      website: "https://daniellee.xyz",
      twitter: "@daniel_creates",
      instagram: "@daniel_creates",
    }
  }
];

// Users (collectors)
export const users: User[] = [
  {
    id: "user-1",
    name: "Sam Wilson",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    walletAddress: "0x4d5e6f7g8h9i0j1k2l3m",
    isVerified: true
  },
  {
    id: "user-2",
    name: "Olivia Chen",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    walletAddress: "0x5e6f7g8h9i0j1k2l3m4n",
    isVerified: false
  },
  {
    id: "user-3",
    name: "Marcus Taylor",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    walletAddress: "0x6f7g8h9i0j1k2l3m4n5o",
    isVerified: true
  }
];

// Collections
export const collections: Collection[] = [
  {
    id: "collection-1",
    name: "Ethereal Visions",
    description: "A collection of dreamscape-inspired digital paintings exploring otherworldly landscapes",
    imageUrl: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1242&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    creatorId: "creator-1",
    items: 32,
    floorPrice: 0.25,
    volume: 156.8
  },
  {
    id: "collection-2",
    name: "Geometric Future",
    description: "Minimalist geometric patterns representing the structure of future technology",
    imageUrl: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1296&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1296&q=80",
    creatorId: "creator-2",
    items: 18,
    floorPrice: 0.15,
    volume: 89.2
  },
  {
    id: "collection-3",
    name: "Digital Fauna",
    description: "AI-generated creatures that blend organic and digital elements",
    imageUrl: "https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1576501164958-74ace1d0061c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    creatorId: "creator-3",
    items: 24,
    floorPrice: 0.08,
    volume: 42.5
  }
];

// NFTs
export const nfts: NFT[] = [
  {
    id: "nft-1",
    name: "Celestial Harmony",
    description: "A mesmerizing digital painting that captures the harmony between galaxies in deep space, featuring intricate detail and vibrant colors.",
    imageUrl: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    price: 0.45,
    currency: "ETH",
    creator: creators[0],
    owner: users[0],
    collection: collections[0],
    blockchain: "Ethereum",
    tokenId: "1025738",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    isVerified: true,
    likes: 256,
    views: 3420,
    createdAt: "2023-08-15T14:30:00Z",
    tags: ["space", "digital", "painting", "abstract"]
  },
  {
    id: "nft-2",
    name: "Future Tessellation",
    description: "A precise geometric pattern that evolves and changes based on blockchain data, representing the fluidity of digital ownership.",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 0.18,
    currency: "ETH",
    creator: creators[1],
    owner: users[1],
    collection: collections[1],
    blockchain: "Polygon",
    tokenId: "58932",
    contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    isVerified: true,
    likes: 142,
    views: 1870,
    createdAt: "2023-09-02T09:15:00Z",
    tags: ["geometric", "pattern", "minimalist", "generative"]
  },
  {
    id: "nft-3",
    name: "Digital Moose",
    description: "A surreal AI-generated creature that combines a moose with circuit board elements, exploring the boundary between natural and artificial.",
    imageUrl: "https://images.unsplash.com/photo-1629976002300-dce2402e1637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    price: 0.085,
    currency: "ETH",
    creator: creators[2],
    owner: users[2],
    collection: collections[2],
    blockchain: "Solana",
    tokenId: "SOL-124578",
    contractAddress: "7kgkeDa4CW3hUfDEG1qQzSC7bKdXtCGsqAgnLtYEeqZz",
    isVerified: false,
    likes: 89,
    views: 1245,
    createdAt: "2023-09-18T16:45:00Z",
    tags: ["creature", "AI", "surreal", "hybrid"]
  },
  {
    id: "nft-4",
    name: "Quantum Reflection",
    description: "An ever-changing piece that reflects the quantum state of blockchain transactions, never appearing the same way twice.",
    imageUrl: "https://images.unsplash.com/photo-1633107850371-c499126f1d4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: 0.32,
    currency: "ETH",
    creator: creators[0],
    owner: users[1],
    collection: collections[0],
    blockchain: "Ethereum",
    tokenId: "1025739",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    isVerified: true,
    likes: 178,
    views: 2340,
    createdAt: "2023-08-25T11:10:00Z",
    tags: ["quantum", "interactive", "generative", "dynamic"]
  },
  {
    id: "nft-5",
    name: "Cubic Serenity",
    description: "A meditative exploration of cubic forms that rotate and transform, created with mathematical precision.",
    imageUrl: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    price: 0.21,
    currency: "ETH",
    creator: creators[1],
    owner: users[0],
    collection: collections[1],
    blockchain: "Polygon",
    tokenId: "58933",
    contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    isVerified: true,
    likes: 115,
    views: 1560,
    createdAt: "2023-09-08T13:25:00Z",
    tags: ["geometric", "3D", "meditation", "mathematical"]
  },
  {
    id: "nft-6",
    name: "Digital Fox",
    description: "An AI-reimagined fox with bioluminescent features that react to its on-chain environment.",
    imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 0.095,
    currency: "ETH",
    creator: creators[2],
    owner: users[2],
    collection: collections[2],
    blockchain: "Arbitrum",
    tokenId: "ARB-78932",
    contractAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
    isVerified: false,
    likes: 76,
    views: 980,
    createdAt: "2023-09-22T10:05:00Z",
    tags: ["fox", "AI", "bioluminescent", "reactive"]
  }
];

// Bids
export const bids: Bid[] = [
  {
    id: "bid-1",
    nftId: "nft-1",
    bidder: users[1],
    amount: 0.42,
    currency: "ETH",
    timestamp: "2023-10-05T15:30:00Z",
    status: "active"
  },
  {
    id: "bid-2",
    nftId: "nft-1",
    bidder: users[2],
    amount: 0.40,
    currency: "ETH",
    timestamp: "2023-10-05T14:20:00Z",
    status: "active"
  },
  {
    id: "bid-3",
    nftId: "nft-2",
    bidder: users[0],
    amount: 0.16,
    currency: "ETH",
    timestamp: "2023-10-04T09:45:00Z",
    status: "active"
  }
];

// Sales history
export const sales: Sale[] = [
  {
    id: "sale-1",
    nftId: "nft-3",
    seller: creators[2],
    buyer: users[2],
    price: 0.075,
    currency: "ETH",
    timestamp: "2023-09-20T11:15:00Z",
    transactionHash: "0x123f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w"
  },
  {
    id: "sale-2",
    nftId: "nft-4",
    seller: creators[0],
    buyer: users[1],
    price: 0.28,
    currency: "ETH",
    timestamp: "2023-09-10T16:30:00Z",
    transactionHash: "0x456i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z"
  }
];

// Featured NFTs
export const featuredNFTs = nfts.slice(0, 3);

// Trending NFTs
export const trendingNFTs = nfts.slice(1, 5);

// Recent NFTs
export const recentNFTs = nfts.slice(3);
