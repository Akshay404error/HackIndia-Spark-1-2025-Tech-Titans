
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { NFT } from "../lib/types";

interface NFTCardProps {
  nft: NFT;
  featured?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, featured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/nft/${nft.id}`} 
      className={`block overflow-hidden rounded-xl bg-white shadow-nft card-hover ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div className="relative">
        <div 
          className={`w-full ${featured ? "h-72 md:h-96" : "h-56"} bg-gray-100 overflow-hidden ${
            !imageLoaded ? "image-loading" : ""
          }`}
        >
          <img
            src={nft.imageUrl}
            alt={nft.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="tag bg-white bg-opacity-90 backdrop-blur-sm">
            {nft.blockchain}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <span className="tag bg-white bg-opacity-90 backdrop-blur-sm flex items-center">
            <Heart className="w-3 h-3 mr-1" />
            {nft.likes}
          </span>
          <span className="tag bg-white bg-opacity-90 backdrop-blur-sm flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            {nft.views}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center mb-2">
          <Link
            to={`/creator/${nft.creator.id}`}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={nft.creator.avatarUrl}
              alt={nft.creator.name}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-sm text-gray-600">
              {nft.creator.name}
              {nft.creator.isVerified && (
                <span className="inline-block w-3 h-3 bg-nft-teal rounded-full ml-1 relative top-[-1px]" />
              )}
            </p>
          </Link>
        </div>

        <h3 className="font-semibold text-lg mb-1 text-nft-charcoal">{nft.name}</h3>
        
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {nft.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Current Price</p>
            <p className="font-bold text-nft-charcoal">
              {nft.price} {nft.currency}
            </p>
          </div>
          <Link
            to={`/nft/${nft.id}`}
            className="btn-secondary text-sm py-1.5 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
