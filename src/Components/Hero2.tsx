"use client";
import {
  createMarketSale,
  fetchItemListed,
  fetchMarketItem,
} from "@/Utils/Querries";
import { Button, CardFooter } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

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
            <div key={i}>
              {/* <div className="block" key={i}>
                <img
                  alt=""
                  src={item.image}
                  className="h-40 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-40 lg:h-52"
                />

                <div className="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
                  <strong className="font-medium">{item.title}</strong>

                  <span className="hidden sm:block sm:h-px sm:w-8 sm:bg-yellow-500"></span>

                  <p className="mt-0.5 opacity-50 sm:mt-0">
                    {item.description}
                  </p>
                </div>
                <Button
                  className="w-full font-bold"
                  onClick={() => submit(item.tokenId, item.price)}
                >
                  Buy Now {item.price} ETH
                </Button>
              </div> */}
              <Card className="py-4" key={i}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">
                    {item.price} ETH
                  </p>
                  <small className="text-default-500">{item.description}</small>
                  <h4 className="font-bold text-large">{item.title}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={item.image}
                    width={270}
                    height={150}
                  />
                </CardBody>
                <CardFooter>
                  {" "}
                  <Button
                    className="w-full font-bold"
                    onClick={() => submit(item.tokenId, item.price)}
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default Hero2;
