
import React, { useState, useEffect } from "react";
import { X, Filter, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NFTCard from "../components/NFTCard";
import { nfts } from "../lib/mockData";
import { Filter as FilterType, Blockchain, NFT } from "../lib/types";

const Explore: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>(nfts);
  const [filters, setFilters] = useState<FilterType>({
    sortBy: "recent",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Blockchain options
  const blockchainOptions: Blockchain[] = [
    "Ethereum",
    "Polygon",
    "Solana",
    "Binance",
    "Arbitrum",
  ];

  // Price range options
  const priceRanges = [
    { min: 0, max: 0.1 },
    { min: 0.1, max: 0.5 },
    { min: 0.5, max: 1 },
    { min: 1, max: 5 },
    { min: 5, max: 10 },
    { min: 10, max: null },
  ];

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Apply filters to NFTs
  useEffect(() => {
    let result = [...nfts];

    // Filter by blockchain
    if (filters.blockchain) {
      result = result.filter((nft) => nft.blockchain === filters.blockchain);
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      result = result.filter((nft) => nft.price >= (filters.minPrice || 0));
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(
        (nft) => filters.maxPrice === null || nft.price <= filters.maxPrice
      );
    }

    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "recent":
          result.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "popular":
          result.sort((a, b) => b.views - a.views);
          break;
        default:
          break;
      }
    }

    setFilteredNFTs(result);
  }, [filters]);

  const toggleBlockchain = (blockchain: Blockchain) => {
    setFilters((prev) => ({
      ...prev,
      blockchain: prev.blockchain === blockchain ? undefined : blockchain,
    }));
  };

  const setPriceRange = (min: number, max: number | null) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const clearFilters = () => {
    setFilters({
      sortBy: "recent",
    });
  };

  const toggleFiltersMobile = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-16">
        <div className="nft-container">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-nft-charcoal mb-4">
              Explore NFTs
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Discover unique digital assets from creators worldwide. Filter by
              blockchain, price, and more to find your perfect NFT.
            </p>
          </div>

          {/* Filter Controls - Mobile Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={toggleFiltersMobile}
              className="btn-secondary w-full flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-64 flex-shrink-0 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="sticky top-28 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-nft-charcoal">Filters</h3>
                  {Object.keys(filters).length > 1 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Blockchain Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-nft-charcoal mb-3">
                    Blockchain
                  </h4>
                  <div className="space-y-2">
                    {blockchainOptions.map((blockchain) => (
                      <button
                        key={blockchain}
                        onClick={() => toggleBlockchain(blockchain)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                          filters.blockchain === blockchain
                            ? "bg-nft-teal bg-opacity-10 text-nft-teal font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {blockchain}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="text-sm font-medium text-nft-charcoal mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setPriceRange(range.min, range.max)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                          filters.minPrice === range.min &&
                          filters.maxPrice === range.max
                            ? "bg-nft-teal bg-opacity-10 text-nft-teal font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {range.min} ETH to{" "}
                        {range.max === null ? "+" : `${range.max} ETH`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Close Button */}
                <button
                  onClick={toggleFiltersMobile}
                  className="lg:hidden mt-6 w-full btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            {/* NFT Grid */}
            <div className="flex-grow">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  <span className="font-medium text-nft-charcoal">
                    {filteredNFTs.length}
                  </span>{" "}
                  items
                </p>

                <div className="flex items-center space-x-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value as FilterType["sortBy"],
                      }))
                    }
                    className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-nft-teal"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {Object.keys(filters).length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.blockchain && (
                    <div className="inline-flex items-center bg-nft-teal bg-opacity-10 text-nft-teal px-3 py-1.5 rounded-full text-sm">
                      {filters.blockchain}
                      <button
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            blockchain: undefined,
                          }))
                        }
                        className="ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {filters.minPrice !== undefined && (
                    <div className="inline-flex items-center bg-nft-teal bg-opacity-10 text-nft-teal px-3 py-1.5 rounded-full text-sm">
                      {filters.minPrice} ETH to{" "}
                      {filters.maxPrice === null ? "+" : `${filters.maxPrice} ETH`}
                      <button
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            minPrice: undefined,
                            maxPrice: undefined,
                          }))
                        }
                        className="ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* NFT Cards */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                {filteredNFTs.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>

              {/* Empty State */}
              {filteredNFTs.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-xl font-medium text-nft-charcoal mb-2">
                    No NFTs Found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-secondary inline-block"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
