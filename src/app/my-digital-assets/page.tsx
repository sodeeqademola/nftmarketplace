"use client";
import { fetchMyNNft } from "@/Utils/Querries";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [nft, setNft] = useState<any>([]);
  const getMyNft = async () => {
    const myNft = await fetchMyNNft();
    setNft(myNft);
  };

  console.log(nft);

  useEffect(() => {
    getMyNft();
  }, []);
  return (
    <div className="flex justify-center gap-4 items-center flex-wrap mt-4">
      {nft.length === 0 ? (
        <div className="grid place-content-center h-screen">
          {" "}
          You have no nft purchased personally
        </div>
      ) : (
        <div className="flex gap-4 justify-center items-center flex-wrap">
          {nft.map((item: any, i: number) => {
            return (
              <div className="block" key={i}>
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
                <Button className="w-full font-bold">{item.price} ETH</Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default page;
