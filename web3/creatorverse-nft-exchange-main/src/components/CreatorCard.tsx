
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Creator } from "../lib/types";

interface CreatorCardProps {
  creator: Creator;
  rank?: number;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, rank }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/creator/${creator.id}`}
      className="block glass-card overflow-hidden card-hover p-5"
    >
      <div className="flex items-center">
        {rank && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-nft-charcoal text-white font-medium text-sm mr-3">
            {rank}
          </div>
        )}
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-full overflow-hidden ${
            !imageLoaded ? "image-loading" : ""
          }`}
        >
          <img
            src={creator.avatarUrl}
            alt={creator.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-nft-charcoal flex items-center">
            {creator.name}
            {creator.isVerified && (
              <span className="inline-block w-3 h-3 bg-nft-teal rounded-full ml-1.5 relative top-[0px]" />
            )}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {creator.walletAddress.substring(0, 6)}...
            {creator.walletAddress.substring(creator.walletAddress.length - 4)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CreatorCard;
