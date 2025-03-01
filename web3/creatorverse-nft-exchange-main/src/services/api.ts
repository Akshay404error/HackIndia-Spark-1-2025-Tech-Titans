import { config } from '../config/config';

interface ApiResponse<T> {
  jsonrpc: '2.0';
  result?: T;
  error?: {
    code: number;
    message: string;
  };
  id: number;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

interface ListingData {
  tokenId: string;
  price: string;
  seller: string;
  active: boolean;
}

export class ApiError extends Error {
  constructor(public code: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new ApiError(response.status, error.message || 'API request failed');
  }

  const data: ApiResponse<T> = await response.json();
  if (data.error) {
    throw new ApiError(data.error.code, data.error.message);
  }

  return data.result as T;
}

export const api = {
  // NFT Operations
  async mintNFT(address: string, tokenURI: string) {
    const response = await fetch(`${config.API_URL}/nft/mint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'mint',
        params: { address, tokenURI },
        id: 1,
      }),
    });
    return handleResponse<{ tokenId: string }>(response);
  },

  async getNFTMetadata(tokenId: string) {
    const response = await fetch(`${config.API_URL}/nft/${tokenId}`);
    return handleResponse<NFTMetadata>(response);
  },

  async getOwnedNFTs(address: string) {
    const response = await fetch(`${config.API_URL}/nft/owned/${address}`);
    return handleResponse<Array<{ tokenId: string; metadata: NFTMetadata }>>(response);
  },

  // Marketplace Operations
  async createListing(tokenId: string, price: string) {
    const response = await fetch(`${config.API_URL}/marketplace/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'createListing',
        params: { tokenId, price },
        id: 1,
      }),
    });
    return handleResponse<{ listingId: string }>(response);
  },

  async buyNFT(tokenId: string, value: string) {
    const response = await fetch(`${config.API_URL}/marketplace/buy/${tokenId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'buyNFT',
        params: { value },
        id: 1,
      }),
    });
    return handleResponse<{ transactionHash: string }>(response);
  },

  async cancelListing(tokenId: string) {
    const response = await fetch(`${config.API_URL}/marketplace/cancel/${tokenId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'cancelListing',
        id: 1,
      }),
    });
    return handleResponse<{ success: boolean }>(response);
  },

  async getListing(tokenId: string) {
    const response = await fetch(`${config.API_URL}/marketplace/listing/${tokenId}`);
    return handleResponse<ListingData>(response);
  },

  async getAllListings(active: boolean = true) {
    const response = await fetch(`${config.API_URL}/marketplace/listings?active=${active}`);
    return handleResponse<ListingData[]>(response);
  },

  async getListingsByUser(address: string) {
    const response = await fetch(`${config.API_URL}/marketplace/listings/user/${address}`);
    return handleResponse<ListingData[]>(response);
  }
}; 