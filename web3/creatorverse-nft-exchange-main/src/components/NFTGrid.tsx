import React, { useState } from 'react';
import { ListingData } from '../services/api';
import { ethers } from 'ethers';

interface NFTGridProps {
  listings: Array<ListingData & { metadata?: { name: string; image: string; description: string } }>;
  onBuy?: (tokenId: string, price: string) => Promise<void>;
  onList?: (tokenId: string, price: string) => Promise<void>;
  onCancel?: (tokenId: string) => Promise<void>;
  isOwner?: boolean;
}

export const NFTGrid: React.FC<NFTGridProps> = ({ 
  listings, 
  onBuy, 
  onList, 
  onCancel,
  isOwner = false 
}) => {
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [listingPrice, setListingPrice] = useState<string>('');

  const formatPrice = (price: string) => {
    return `${ethers.utils.formatEther(price)} ETH`;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setListingPrice(value);
  };

  const handleList = async (tokenId: string) => {
    if (!listingPrice || !onList) return;
    try {
      const priceInWei = ethers.utils.parseEther(listingPrice);
      await onList(tokenId, priceInWei.toString());
      setSelectedNFT(null);
      setListingPrice('');
    } catch (error) {
      console.error('Error listing NFT:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {listings.map((listing) => (
        <div 
          key={listing.tokenId}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {listing.metadata?.image && (
            <img 
              src={listing.metadata.image} 
              alt={listing.metadata.name || `NFT #${listing.tokenId}`}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              {listing.metadata?.name || `NFT #${listing.tokenId}`}
            </h3>
            {listing.metadata?.description && (
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {listing.metadata.description}
              </p>
            )}
            
            {listing.active ? (
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold text-blue-600">
                  {formatPrice(listing.price)}
                </p>
                {!isOwner && onBuy && (
                  <button
                    onClick={() => onBuy(listing.tokenId, listing.price)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Buy Now
                  </button>
                )}
                {isOwner && onCancel && (
                  <button
                    onClick={() => onCancel(listing.tokenId)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Cancel Listing
                  </button>
                )}
              </div>
            ) : (
              isOwner && onList && (
                <div className="flex flex-col gap-2">
                  {selectedNFT === listing.tokenId ? (
                    <>
                      <input
                        type="text"
                        value={listingPrice}
                        onChange={handlePriceChange}
                        placeholder="Price in ETH"
                        className="border rounded-md px-3 py-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleList(listing.tokenId)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setSelectedNFT(null);
                            setListingPrice('');
                          }}
                          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedNFT(listing.tokenId)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      List for Sale
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}; 