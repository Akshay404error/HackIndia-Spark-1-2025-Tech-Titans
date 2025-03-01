import { ethers } from 'ethers';
import { config } from '../config/config';

export const web3 = {
  provider: null as ethers.providers.Web3Provider | null,
  signer: null as ethers.Signer | null,
  networkReady: false,

  async connect() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error(config.ERRORS.NO_METAMASK);
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create Web3 provider
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();

      // Switch to local network if needed
      await this.ensureCorrectNetwork();

      // Setup event listeners
      this.setupEventListeners();

      this.networkReady = true;
      return accounts[0];
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      throw error;
    }
  },

  async ensureCorrectNetwork() {
    if (!this.provider) throw new Error(config.ERRORS.NOT_CONNECTED);

    const network = await this.provider.getNetwork();
    if (network.chainId !== config.CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${config.CHAIN_ID.toString(16)}` }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${config.CHAIN_ID.toString(16)}`,
              chainName: config.NETWORK_NAME,
              nativeCurrency: config.CURRENCY,
              rpcUrls: [config.RPC_URL]
            }]
          });
        } else {
          throw new Error(config.ERRORS.WRONG_NETWORK);
        }
      }
    }
  },

  setupEventListeners() {
    if (typeof window.ethereum === 'undefined') return;

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.provider = null;
        this.signer = null;
        this.networkReady = false;
        window.location.reload();
      }
    });

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('disconnect', () => {
      this.provider = null;
      this.signer = null;
      this.networkReady = false;
      window.location.reload();
    });
  },

  async getAddress() {
    if (!this.signer) {
      throw new Error(config.ERRORS.NOT_CONNECTED);
    }
    return await this.signer.getAddress();
  },

  async getBalance(address: string) {
    if (!this.provider) {
      throw new Error(config.ERRORS.NOT_CONNECTED);
    }
    const balance = await this.provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  },

  async signMessage(message: string) {
    if (!this.signer) {
      throw new Error(config.ERRORS.NOT_CONNECTED);
    }
    return await this.signer.signMessage(message);
  },

  async sendTransaction(to: string, value: string) {
    if (!this.signer) {
      throw new Error(config.ERRORS.NOT_CONNECTED);
    }
    try {
      const tx = await this.signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(value)
      });
      return await tx.wait();
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new Error(config.ERRORS.TRANSACTION_FAILED);
    }
  }
};

// Add TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
} 