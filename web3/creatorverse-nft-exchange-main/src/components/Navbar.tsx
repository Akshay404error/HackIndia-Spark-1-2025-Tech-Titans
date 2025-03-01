import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import WalletConnect from "./WalletConnect";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white bg-opacity-90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="nft-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="text-2xl font-bold text-nft-charcoal">Creator<span className="text-nft-teal">verse</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors duration-200 ${
                isActive("/") && location.pathname === "/" 
                  ? "text-nft-teal font-medium" 
                  : "text-nft-charcoal hover:text-nft-teal"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/marketplace" 
              className={`transition-colors duration-200 ${
                isActive("/marketplace") 
                  ? "text-nft-teal font-medium" 
                  : "text-nft-charcoal hover:text-nft-teal"
              }`}
            >
              Marketplace
            </Link>
            <Link 
              to="/explore" 
              className={`transition-colors duration-200 ${
                isActive("/explore") 
                  ? "text-nft-teal font-medium" 
                  : "text-nft-charcoal hover:text-nft-teal"
              }`}
            >
              Explore
            </Link>
            <Link 
              to="/my-nfts" 
              className={`transition-colors duration-200 ${
                isActive("/my-nfts") 
                  ? "text-nft-teal font-medium" 
                  : "text-nft-charcoal hover:text-nft-teal"
              }`}
            >
              My NFTs
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Search NFTs, collections..."
                className="bg-nft-lightgray bg-opacity-50 text-nft-charcoal px-4 pl-10 py-2 rounded-full text-sm w-56 focus:outline-none focus:ring-2 focus:ring-nft-teal transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </nav>

          {/* Desktop Wallet Connect */}
          <div className="hidden md:block">
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-nft-charcoal focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/") && location.pathname === "/"
                    ? "bg-nft-teal bg-opacity-10 text-nft-teal font-medium" 
                    : "text-nft-charcoal hover:bg-nft-lightgray"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/marketplace"
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/marketplace") 
                    ? "bg-nft-teal bg-opacity-10 text-nft-teal font-medium" 
                    : "text-nft-charcoal hover:bg-nft-lightgray"
                }`}
                onClick={closeMenu}
              >
                Marketplace
              </Link>
              <Link
                to="/explore"
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/explore") 
                    ? "bg-nft-teal bg-opacity-10 text-nft-teal font-medium" 
                    : "text-nft-charcoal hover:bg-nft-lightgray"
                }`}
                onClick={closeMenu}
              >
                Explore
              </Link>
              <Link
                to="/my-nfts"
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive("/my-nfts") 
                    ? "bg-nft-teal bg-opacity-10 text-nft-teal font-medium" 
                    : "text-nft-charcoal hover:bg-nft-lightgray"
                }`}
                onClick={closeMenu}
              >
                My NFTs
              </Link>
              <div className="relative px-4 py-2">
                <input
                  type="text"
                  placeholder="Search NFTs, collections..."
                  className="bg-nft-lightgray bg-opacity-50 text-nft-charcoal px-4 pl-10 py-2 rounded-full text-sm w-full focus:outline-none focus:ring-2 focus:ring-nft-teal transition-all duration-300"
                />
                <Search className="absolute left-7 top-4.5 h-4 w-4 text-gray-500" />
              </div>
              <div className="px-4 py-2">
                <WalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
