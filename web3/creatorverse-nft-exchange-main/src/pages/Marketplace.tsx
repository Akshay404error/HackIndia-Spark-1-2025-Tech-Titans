import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { web3 } from '../services/web3';
import { NFTGrid } from '../components/NFTGrid';
import { toast } from 'react-toastify';

export const Marketplace: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<string | null>(null);
  const [view, setView] = useState<'all' | 'owned'>('all');

  useEffect(() => {
    const init = async () => {
      try {
        const connected = await web3.connect();
        if (connected) {
          setAccount(connected.address);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        toast.error('Failed to connect wallet. Please make sure MetaMask is installed and unlocked.');
      }
    };
    init();
  }, []);

  useEffect(() => {
    loadListings();
  }, [account, view]);

  const loadListings = async () => {
    try {
      setLoading(true);
      let fetchedListings;
      
      if (view === 'owned' && account) {
        fetchedListings = await api.getListingsByUser(account);
      } else {
        fetchedListings = await api.getAllListings(true);
      }

      // Fetch metadata for each listing
      const listingsWithMetadata = await Promise.all(
        fetchedListings.map(async (listing) => {
          try {
            const metadata = await api.getNFTMetadata(listing.tokenId);
            return { ...listing, metadata };
          } catch (error) {
            console.error(`Failed to fetch metadata for token ${listing.tokenId}:`, error);
            return listing;
          }
        })
      );

      setListings(listingsWithMetadata);
    } catch (error) {
      console.error('Failed to load listings:', error);
      toast.error('Failed to load NFT listings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (tokenId: string, price: string) => {
    if (!account) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      await api.buyNFT(tokenId, price);
      toast.success('Successfully purchased NFT!');
      await loadListings();
    } catch (error) {
      console.error('Failed to buy NFT:', error);
      toast.error('Failed to purchase NFT. Please try again.');
    }
  };

  const handleList = async (tokenId: string, price: string) => {
    if (!account) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      await api.createListing(tokenId, price);
      toast.success('Successfully listed NFT!');
      await loadListings();
    } catch (error) {
      console.error('Failed to list NFT:', error);
      toast.error('Failed to list NFT. Please try again.');
    }
  };

  const handleCancel = async (tokenId: string) => {
    try {
      await api.cancelListing(tokenId);
      toast.success('Successfully cancelled listing!');
      await loadListings();
    } catch (error) {
      console.error('Failed to cancel listing:', error);
      toast.error('Failed to cancel listing. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">NFT Marketplace</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setView('all')}
            className={`px-4 py-2 rounded-md ${
              view === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Listings
          </button>
          <button
            onClick={() => setView('owned')}
            className={`px-4 py-2 rounded-md ${
              view === 'owned'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            My Listings
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : listings.length > 0 ? (
        <NFTGrid
          listings={listings}
          onBuy={handleBuy}
          onList={handleList}
          onCancel={handleCancel}
          isOwner={view === 'owned'}
        />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600">
            {view === 'owned'
              ? 'You don\'t have any NFT listings yet'
              : 'No NFTs are currently listed for sale'}
          </h2>
        </div>
      )}
    </div>
  );
}; 