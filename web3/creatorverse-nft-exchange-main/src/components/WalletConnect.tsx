
import React, { useState } from "react";
import { Wallet, ChevronDown, Check } from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
}

const walletOptions: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "https://1000logos.net/wp-content/uploads/2023/01/WalletConnect-logo.png"
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png"
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "https://seeklogo.com/images/P/phantom-logo-10304FFD0C-seeklogo.com.png"
  }
];

const WalletConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);

  const connectWallet = (wallet: WalletOption) => {
    // This would be replaced with actual wallet connection logic
    console.log(`Connecting to ${wallet.name}...`);
    setSelectedWallet(wallet);
    setIsConnected(true);
    setWalletDropdownOpen(false);
  };

  const disconnectWallet = () => {
    // This would be replaced with actual wallet disconnection logic
    console.log("Disconnecting wallet...");
    setIsConnected(false);
    setSelectedWallet(null);
  };

  const toggleWalletDropdown = () => {
    setWalletDropdownOpen(!walletDropdownOpen);
  };

  if (isConnected && selectedWallet) {
    return (
      <div className="relative">
        <button
          onClick={toggleWalletDropdown}
          className="flex items-center space-x-2 bg-nft-teal bg-opacity-10 hover:bg-opacity-20 text-nft-teal px-4 py-2 rounded-full transition-colors duration-300"
        >
          <img
            src={selectedWallet.icon}
            alt={selectedWallet.name}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-sm font-medium">0x1a2b...3c4d</span>
          <ChevronDown size={16} />
        </button>

        {walletDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-nft py-2 z-10 animate-scale-in">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-nft-charcoal">Connected to</p>
              <div className="flex items-center mt-1 space-x-2">
                <img
                  src={selectedWallet.icon}
                  alt={selectedWallet.name}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm">{selectedWallet.name}</span>
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-200"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleWalletDropdown}
        className="btn-primary flex items-center space-x-2"
      >
        <Wallet size={18} />
        <span>Connect Wallet</span>
      </button>

      {walletDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-nft overflow-hidden z-10 animate-scale-in">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-medium text-nft-charcoal">Connect Wallet</h3>
            <p className="text-sm text-gray-500 mt-1">
              Select a wallet to connect
            </p>
          </div>
          <div className="py-2">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => connectWallet(wallet)}
                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
              >
                <img
                  src={wallet.icon}
                  alt={wallet.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm">{wallet.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
