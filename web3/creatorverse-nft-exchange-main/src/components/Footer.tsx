
import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="nft-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-nft-charcoal">
                Creator<span className="text-nft-teal">verse</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-500 max-w-xs">
              Empowering creators with full ownership through creator-owned smart contracts and custom royalty structures.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-nft-teal transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-nft-teal transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-nft-teal transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-nft-teal transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-nft-charcoal mb-4">Marketplace</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/explore"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  Create
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-nft-charcoal mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-nft-teal transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-nft-charcoal mb-4">Subscribe</h3>
            <p className="text-gray-500 mb-4">
              Join our mailing list to stay in the loop with our newest feature releases and NFT drops.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nft-teal"
              />
              <button className="bg-nft-teal text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-colors duration-300 text-sm font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Creatorverse. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              Crafted with passion for the creator economy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
