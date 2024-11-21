// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

//imports from hardhat;
import "hardhat/console.sol";

// imports from openzeppelin

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is ERC721URIStorage, ReentrancyGuard {
    uint256 public _tokenId;
    uint256 private _itemsSold;

    address payable public owner;

    uint256 public listingPrice = 0.0015 ether;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event idMarketItemCreated(
        uint256 indexed _itemIds,
        address indexed seller,
        address indexed owner,
        uint256 price,
        bool sold
    );

    mapping(uint256 => MarketItem) public idMarketItem;

    constructor() ERC721("Supreme", "SPM") {
        owner = payable(msg.sender);
    }

    //only owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can change the listing price");
        _;
    }

    function updateListingPrice(uint256 _listingPrice)
        public
        payable
        nonReentrant
        onlyOwner
    {
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    //create NFTToken function

    function createItem(string memory tokenURI, uint256 price)
        public
        payable
        nonReentrant
        returns (uint256)
    {
        _tokenId++;
        uint256 newTokenId = _tokenId;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        setApprovalForAll(owner, true);

        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    //create Market Item

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1");
        require(
            msg.value >= listingPrice,
            "Price must be equal or greater than listing price"
        );

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit idMarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    //fnction for resale token
    function resellToken(uint256 tokenId, uint256 price)
        public
        payable
        nonReentrant
    {
        require(
            // idMarketItem[tokenId].seller == msg.sender,
            idMarketItem[tokenId].owner == msg.sender,
            "Only  item owner can resell"
        );
        require(
            msg.value >= listingPrice,
            "Price must be equal or greater than listingPrice"
        );

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold--;
        _transfer(msg.sender, address(this), tokenId);
    }

    //function create Markersale
    function createMarketSale(uint256 tokenId) public payable nonReentrant {
        uint256 price = idMarketItem[tokenId].price;
        require(
            price == msg.value,
            "Please submit the asking price to complete the transaction"
        );

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        // idMarketItem[tokenId].seller = address(this);
        _itemsSold++;
        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    //Getting unsold NFT Data;

    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCounts = _tokenId;
        uint256 unsoldItems = _tokenId - _itemsSold;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItems);
        for (uint256 i = 0; i < itemCounts; i++) {
            if (idMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //purchase item;
    function fetchMyNNft() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenId;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //single user items
    function fetchItemListed() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenId;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
