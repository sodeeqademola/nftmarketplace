"use client";

import toast from "react-hot-toast";
import { Connection } from "./Conection";
import { ethers } from "ethers";

// import { useRouter } from "next/navigation";

//createItem APis

export const CreateItem = async (url: string, price: any) => {
  try {
    // const router = useRouter();
    const contract = (await Connection()) as any;

    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    const transactionRespose = await contract.createItem(url, price, {
      value: listingPrice,
    });
    const receipt = await transactionRespose.wait();

    toast.success("Nft created successfully");
    //   router.push("/");
    // let event = receipt.events[0];
    // let value = event[2];
    // let tokenId = value.toNumber();
    // console.log(tokenId);

    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
  }
};

//fetchMarketItem
export const fetchMarketItem = async () => {
  try {
    const contract = (await Connection()) as any;
    const contractObj = await contract.fetchMarketItem();
    const items = await Promise.all(
      contractObj.map(async (i: any) => {
        // await contractObj.tokenURI(i.tokenId);
        const tokenURI = await contract.tokenURI(i.tokenId);
        // console.log(tokenURI);
        const req = await fetch(tokenURI);
        const res = await req.json();

        let item = {
          // tokenId: Number(i.tokenId),
          tokenId: i.tokenId,
          seller: i.seller,
          owner: i.owner,
          price: ethers.formatEther(i.price.toString()),
          // price: i.price,
          sold: i.sold,
          title: res.title,
          description: res.description,
          image: res.image,
        };
        return item;
      })
    );
    // console.log(items);
    // const person = [
    //   {
    //     i: "jkgjg",
    //     y: "jkgjguyf",
    //     t: "jkgjjvjvh",
    //   },
    //   {
    //     i: "jkgjg",
    //     y: "jkgjguyf",
    //     t: "jkgjjvjvh",
    //   },
    //   {
    //     i: "jkgjg",
    //     y: "jkgjguyf",
    //     t: "jkgjjvjvh",
    //   },
    // ];
    // console.log(person);

    return items;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMyNNft = async () => {
  try {
    const contract = (await Connection()) as any;
    const contractObj = await contract.fetchMyNNft();
    const myNft = await Promise.all(
      contractObj.map(async (i: any) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        // console.log(tokenURI);
        const req = await fetch(tokenURI);
        const res = await req.json();

        let item = {
          tokenId: Number(i.tokenId),
          seller: i.seller,
          owner: i.owner,
          price: ethers.formatEther(i.price.toString()),
          sold: i.sold,
          title: res.title,
          description: res.description,
          image: res.image,
        };
        return item;
      })
    );

    return myNft;
  } catch (error) {
    console.log(error);
  }
};

export const fetchItemListed = async () => {
  try {
    const contract = (await Connection()) as any;
    const contractObj = await contract.fetchItemListed();
    const fetchItemListed = await Promise.all(
      contractObj.map(async (i: any) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        // console.log(tokenURI);
        const req = await fetch(tokenURI);
        const res = await req.json();

        let item = {
          tokenId: Number(i.tokenId),
          seller: i.seller,
          owner: i.owner,
          price: ethers.formatEther(i.price.toString()),
          sold: i.sold,
          title: res.title,
          description: res.description,
          image: res.image,
        };
        return item;
      })
    );
    // console.log(fetchItemListed);

    return fetchItemListed;
  } catch (error) {
    console.log(error);
  }
};

export const createMarketSale = async (tokenId: any, price: any) => {
  try {
    const etherPrice = ethers.parseEther(price);

    console.log(etherPrice, tokenId);

    const contract = (await Connection()) as any;

    const transactionRespose = await contract.createMarketSale(
      tokenId.toString(),
      {
        value: etherPrice,
      }
    );
    const receipt = await transactionRespose.wait();
    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
  }
};
