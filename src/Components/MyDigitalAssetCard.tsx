"use client";
import { fetchMyNNft } from "@/Utils/Querries";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";

import React, { useEffect, useState } from "react";

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
const MyDigitalAssetCard = () => {
  const [nft, setNft] = useState<itemProps[] | undefined>([]);
  const getMyNft = async () => {
    const myNft = await fetchMyNNft();
    setNft(myNft);
  };

  useEffect(() => {
    getMyNft();
  }, []);
  return (
    <div className="">
      {nft && nft.length === 0 ? (
        <div className="grid place-content-center h-screen">
          {" "}
          You have no nft purchased personally
        </div>
      ) : (
        <div className="flex justify-center flex-wrap items-center gap-3">
          {nft &&
            nft.map((item: itemProps, i: number) => {
              return (
                <div key={i}>
                  {/* <div className="block" key={i}>
                    <img
                      alt=""
                      src={item.image}
                      className="h-56 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-40 lg:h-52"
                    />

                    <div className="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
                      <strong className="font-medium">{item.title}</strong>

                      <span className="hidden sm:block sm:h-px sm:w-8 sm:bg-yellow-500"></span>

                      <p className="mt-0.5 opacity-50 sm:mt-0">
                        {item.description}
                      </p>
                    </div>
                    <Button className="w-full font-bold">
                      {item.price} ETH
                    </Button>
                  </div> */}
                  <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <p className="text-tiny uppercase font-bold">
                        {item.price} ETH
                      </p>
                      <small className="text-default-500">
                        {item.description}
                      </small>
                      <h4 className="font-bold text-large">{item.title}</h4>
                    </CardHeader>
                    <CardBody className="py-2 h-40 overflow-hidden">
                      <Image
                        alt="Card background"
                        className=" rounded-xl overflow-hidden"
                        src={item.image}
                        width={200}
                        height={150}
                      />
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MyDigitalAssetCard;
