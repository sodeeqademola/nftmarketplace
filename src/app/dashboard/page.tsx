"use client";
import { fetchItemListed } from "@/Utils/Querries";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [itemCreated, setItemCreated] = useState([]);

  const [itemsSold, setItemsSold] = useState([]);

  // getcreted items
  const getItemCreated = async () => {
    const CreatedItem = (await fetchItemListed()) as any;
    // console.log(itemCreated);
    setItemCreated(CreatedItem);
  };
  console.log(itemCreated);

  //getsold items
  const getSoldItems = async () => {
    const itemsCreated: any = await fetchItemListed();
    const soldItems = itemsCreated.filter((i: any) => {
      return i.sold === true;
    });
    setItemsSold(soldItems);
  };
  console.log(itemsSold);

  useEffect(() => {
    getItemCreated();
    getSoldItems();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Item Created</h1>
      <div className="flex justify-center gap-4 items-center flex-wrap mt-4">
        {itemCreated.length === 0 ? (
          <div className="grid place-content-center h-screen">
            {" "}
            You have no nft created by you
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 items-center mt-4">
            {itemCreated.map((item: any, i: number) => {
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
                  <Button className="w-full font-bold">{item.price}ETH</Button>
                </div>
              );
            })}{" "}
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold mt-4">Item sold</h1>
      <div className="flex justify-center gap-4 items-center flex-wrap mt-4">
        {itemsSold.length === 0 ? (
          <div className=" grid place-content-center h-screen">
            You do not have any item sold out already
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {itemsSold.map((item: any, i: number) => {
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
    </div>
  );
};

export default page;
