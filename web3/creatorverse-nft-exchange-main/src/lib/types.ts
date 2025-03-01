
export interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  creator: Creator;
  owner: User;
  collection: Collection;
  blockchain: Blockchain;
  tokenId: string;
  contractAddress: string;
  isVerified: boolean;
  likes: number;
  views: number;
  createdAt: string;
  tags: string[];
}

export interface Creator {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  bio?: string;
  walletAddress: string;
  bannerUrl?: string;
  socialLinks?: {
    website?: string;
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  walletAddress: string;
  isVerified: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  bannerUrl?: string;
  creatorId: string;
  items: number;
  floorPrice?: number;
  volume?: number;
}

export type Blockchain = 'Ethereum' | 'Polygon' | 'Solana' | 'Binance' | 'Arbitrum';

export interface Bid {
  id: string;
  nftId: string;
  bidder: User;
  amount: number;
  currency: string;
  timestamp: string;
  status: 'active' | 'accepted' | 'rejected' | 'expired';
}

export interface Sale {
  id: string;
  nftId: string;
  seller: User;
  buyer: User;
  price: number;
  currency: string;
  timestamp: string;
  transactionHash: string;
}

export interface Filter {
  blockchain?: Blockchain;
  minPrice?: number;
  maxPrice?: number;
  collections?: string[];
  sortBy?: 'recent' | 'price-asc' | 'price-desc' | 'popular';
}
