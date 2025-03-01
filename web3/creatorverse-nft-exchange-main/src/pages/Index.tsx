import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NFTCard from "../components/NFTCard";
import CreatorCard from "../components/CreatorCard";
import FeaturedSection from "../components/FeaturedSection";
import { 
  featuredNFTs, 
  trendingNFTs, 
  recentNFTs, 
  creators 
} from "../lib/mockData";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-white to-nft-cream">
        <div className="nft-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className={`md:w-1/2 md:pr-12 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="tag bg-nft-teal bg-opacity-10 text-nft-teal mb-6 inline-block">
                Creator-Owned Smart Contracts
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-nft-charcoal mb-6">
                Own Your Digital <span className="text-nft-teal">Creations</span> 
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-xl">
                A revolutionary NFT marketplace empowering creators with full ownership,
                custom royalties, and multi-chain support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/marketplace" className="btn-primary">
                  Explore Marketplace
                </Link>
                <Link to="/my-nfts" className="btn-secondary">
                  Create & Sell NFTs
                </Link>
              </div>

              <div className="mt-12 flex items-center">
                <div className="flex -space-x-2">
                  {creators.slice(0, 3).map((creator, index) => (
                    <img
                      key={creator.id}
                      src={creator.avatarUrl}
                      alt={creator.name}
                      className="w-10 h-10 rounded-full border-2 border-white"
                      style={{ zIndex: 3 - index }}
                    />
                  ))}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-nft-charcoal">10k+ Creators</p>
                  <p className="text-sm text-gray-500">have joined already</p>
                </div>
              </div>
            </div>

            <div className={`md:w-1/2 mt-12 md:mt-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="transform translate-y-12">
                    <NFTCard nft={featuredNFTs[1]} />
                  </div>
                  <div className="hidden md:block">
                    <NFTCard nft={featuredNFTs[2]} />
                  </div>
                </div>
                <div>
                  <NFTCard nft={featuredNFTs[0]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="nft-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-nft-charcoal">10K+</p>
              <p className="text-gray-500 mt-2">Artworks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-nft-charcoal">3.2K+</p>
              <p className="text-gray-500 mt-2">Artists</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-nft-charcoal">25K+</p>
              <p className="text-gray-500 mt-2">Auctions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-nft-charcoal">10.5K</p>
              <p className="text-gray-500 mt-2">Transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-nft-cream">
        <div className="nft-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-nft-charcoal mb-4">How It Works</h2>
            <p className="text-gray-600">
              Our platform puts creators first with custom smart contracts and fair royalties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-nft-teal rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-nft-charcoal">Create Your Collection</h3>
              <p className="text-gray-600">
                Set up your custom smart contract with your desired parameters, royalty structure, and metadata.
              </p>
            </div>

            <div className="glass-card p-6 text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-nft-teal rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-nft-charcoal">Mint & List NFTs</h3>
              <p className="text-gray-600">
                Upload your artwork and mint NFTs using your own smart contract with optimized gas fees.
              </p>
            </div>

            <div className="glass-card p-6 text-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 bg-nft-teal rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-nft-charcoal">Earn Royalties</h3>
              <p className="text-gray-600">
                Collect royalties from secondary sales automatically through your custom smart contract.
              </p>
            </div>
          </div>

          <div className="text-center mt-14">
            <Link to="#" className="btn-secondary inline-flex items-center">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending NFTs Section */}
      <FeaturedSection
        title="Trending NFTs"
        description="The most viewed and popular pieces from creators around the world"
        nfts={trendingNFTs}
        viewAllLink="/explore"
        className="bg-white"
      />

      {/* Top Creators Section */}
      <section className="py-20 bg-nft-cream">
        <div className="nft-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-nft-charcoal">Top Creators</h2>
              <p className="text-gray-500 mt-2 max-w-2xl">
                Discover the creative minds behind the most innovative NFTs
              </p>
            </div>
            <Link
              to="/marketplace"
              className="mt-4 md:mt-0 inline-flex items-center text-nft-teal hover:text-nft-amber transition-colors duration-300 font-medium"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {creators.map((creator, index) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added Section */}
      <FeaturedSection
        title="Recently Added"
        description="New and fresh NFTs just minted by creators"
        nfts={recentNFTs}
        viewAllLink="/explore"
        className="bg-white"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-nft-teal to-blue-500 text-white">
        <div className="nft-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Own Your Digital Creations?</h2>
            <p className="text-xl opacity-90 mb-10">
              Join thousands of creators who have already taken control of their digital assets
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/marketplace" className="btn-primary bg-white text-nft-teal hover:bg-opacity-90">
                Explore Marketplace
              </Link>
              <Link to="/my-nfts" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:bg-opacity-10">
                Create Your Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
