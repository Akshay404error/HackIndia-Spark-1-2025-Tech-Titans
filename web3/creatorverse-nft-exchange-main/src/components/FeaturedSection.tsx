
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NFTCard from "./NFTCard";
import { NFT } from "../lib/types";

interface FeaturedSectionProps {
  title: string;
  description?: string;
  nfts: NFT[];
  viewAllLink: string;
  className?: string;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  description,
  nfts,
  viewAllLink,
  className = "",
}) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="nft-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-nft-charcoal">{title}</h2>
            {description && (
              <p className="text-gray-500 mt-2 max-w-2xl">{description}</p>
            )}
          </div>
          <Link
            to={viewAllLink}
            className="mt-4 md:mt-0 inline-flex items-center text-nft-teal hover:text-nft-amber transition-colors duration-300 font-medium"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
