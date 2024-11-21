import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";

import { ethers } from "hardhat";

describe("Lock", function () {
  const nftMarketPlaceFixture = async () => {
    const [owner, seller1, seller2, buyer1, buyer2] = await ethers.getSigners();

    const NFTMarkeplace = await ethers.deployContract("NFTMarketplace");

    const listingPrice = ethers.parseEther("0.0015");

    const tokenURL1 = "www.token1.com";
    const tokenURL2 = "www.token2.com";
    const price = ethers.parseEther("0.05");

    return {
      price,
      tokenURL1,
      tokenURL2,
      listingPrice,
      NFTMarkeplace,
      owner,
      seller1,
      seller2,
      buyer1,
      buyer2,
    };
  };
  describe("Deployment", () => {
    it("should set the right right fixtures for deployment", async () => {
      const { owner, NFTMarkeplace, listingPrice } = await loadFixture(
        nftMarketPlaceFixture
      );

      expect(await NFTMarkeplace.owner()).to.be.equal(owner.address);
      expect(await NFTMarkeplace._tokenId()).to.be.equal(0);

      expect(await NFTMarkeplace.name()).to.be.equal("Supreme");
      expect(await NFTMarkeplace.symbol()).to.be.equal("SPM");
    });
  });
  describe("ListingPrice", () => {
    it("should get and set listing Price", async () => {
      const { NFTMarkeplace, listingPrice } = await loadFixture(
        nftMarketPlaceFixture
      );
      expect(await NFTMarkeplace.listingPrice()).to.be.equal(listingPrice);
      await NFTMarkeplace.updateListingPrice(ethers.parseEther("0.2"));
      expect(await NFTMarkeplace.getListingPrice()).to.be.equal(
        ethers.parseEther("0.2")
      );
    });
  });
  describe("CreateItem", () => {
    it("should create and confirm items created", async () => {
      const {
        NFTMarkeplace,
        seller1,
        listingPrice,
        price,
        tokenURL1,
        tokenURL2,
      } = await loadFixture(nftMarketPlaceFixture);
      const createItem = await NFTMarkeplace.createItem(
        tokenURL1,
        listingPrice,
        { value: price }
      );
      //   console.log(createItem);
      expect(await NFTMarkeplace._tokenId())
        .to.be.equal(1)
        .toString();
      const token = (await NFTMarkeplace._tokenId()).toString();
      // console.log(token);
    });
  });
  describe("marketItems", () => {
    it("should revert", async () => {
      const { NFTMarkeplace, buyer1, price, tokenURL2, tokenURL1, seller1 } =
        await loadFixture(nftMarketPlaceFixture);
      await expect(NFTMarkeplace.createItem(tokenURL1, 0)).to.be.rejectedWith(
        "Price must be at least 1"
      );
      await expect(
        NFTMarkeplace.connect(buyer1).createItem(
          tokenURL2,
          ethers.parseEther("0.5"),
          {
            value: ethers.parseEther("0.0000005"),
          }
        )
      ).to.be.rejectedWith("Price must be equal or greater than listing price");

      await NFTMarkeplace.createItem(tokenURL1, price, {
        value: ethers.parseEther("0.05"),
      });
      await NFTMarkeplace.connect(seller1).createItem(tokenURL2, price, {
        value: ethers.parseEther("0.05"),
      });
      let items = await NFTMarkeplace.fetchMarketItem();

      const itemer = await Promise.all(
        items.map(async (i: any) => {
          await NFTMarkeplace.tokenURI(i.tokenId);
          let item = {
            tokenId: i.tokenId,
            seller: i.seller,
            owner: i.owner,
            price: i.price,
            sold: i.sold,
          };
          return item;
        })
      );
      console.log(itemer);
    });
  });
});
