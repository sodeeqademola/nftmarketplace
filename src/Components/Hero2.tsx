"use client";
import {
  createMarketSale,
  fetchItemListed,
  fetchMarketItem,
} from "@/Utils/Querries";
import { Button } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type itemProps = {
  description: string;
  image: string;
  owner: string;
  price: string;
  seller: string;
  sold: boolean;
  title: string;
  tokenId: number;
};

const Hero2 = () => {
  const [nftItems, setNftItems] = useState<itemProps[] | undefined>([]);

  //getNftItems
  const getNftItems = async () => {
    const items = await fetchMarketItem();
    setNftItems(items);
  };

  // console.log(nftItems);

  //onload of the page
  useEffect(() => {
    getNftItems();

    fetchItemListed();
  }, []);

  const submit = async (tokenId: number, price: string) => {
    await createMarketSale(tokenId, price);
    toast.success("Nft Bought Succesfully");
  };
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 items-center mt-4">
      {nftItems &&
        nftItems.map((item: itemProps, i: number) => {
          return (
            <div className="block" key={i}>
              <img
                alt=""
                src={item.image}
                className="h-40 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-40 lg:h-52"
              />

              <div className="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
                <strong className="font-medium">{item.title}</strong>

                <span className="hidden sm:block sm:h-px sm:w-8 sm:bg-yellow-500"></span>

                <p className="mt-0.5 opacity-50 sm:mt-0">{item.description}</p>
              </div>
              <Button
                className="w-full font-bold"
                onClick={() => submit(item.tokenId, item.price)}
              >
                Buy Now {item.price} ETH
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default Hero2;
