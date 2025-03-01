// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;
    IERC721 public nftContract;

    event ListingCreated(uint256 indexed tokenId, address indexed seller, uint256 price);
    event ListingSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event ListingCanceled(uint256 indexed tokenId, address indexed seller);

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    function createListing(uint256 tokenId, uint256 price) public {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(nftContract.getApproved(tokenId) == address(this), "Not approved");
        require(price > 0, "Price must be greater than 0");

        listings[tokenId] = Listing(msg.sender, price, true);
        emit ListingCreated(tokenId, msg.sender, price);
    }

    function buyNFT(uint256 tokenId) public payable nonReentrant {
        Listing memory listing = listings[tokenId];
        require(listing.active, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");

        listings[tokenId].active = false;
        nftContract.safeTransferFrom(listing.seller, msg.sender, tokenId);
        payable(listing.seller).transfer(msg.value);

        emit ListingSold(tokenId, listing.seller, msg.sender, msg.value);
    }

    function cancelListing(uint256 tokenId) public {
        require(listings[tokenId].seller == msg.sender, "Not the seller");
        require(listings[tokenId].active, "Listing not active");

        listings[tokenId].active = false;
        emit ListingCanceled(tokenId, msg.sender);
    }

    function getListing(uint256 tokenId) public view returns (address seller, uint256 price, bool active) {
        Listing memory listing = listings[tokenId];
        return (listing.seller, listing.price, listing.active);
    }
} 