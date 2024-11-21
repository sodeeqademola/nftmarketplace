import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Hero1 = () => {
  return (
    <div className="flex justify-between items-center space-x-4">
      <div className="w-50%">
        <p className="sm:text-[30px] md:text-[50px]  text-gray-500 font-bold">
          Discover, collect, and sell NFTs{" "}
          <Image
            src={
              "https://cdn.pixabay.com/photo/2022/01/17/17/20/bored-6945309_640.png"
            }
            alt="nft"
            width={50}
            height={50}
            className="rounded"
          />
        </p>
        <span className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing s quaerat veniam
          odit est!
        </span>{" "}
        <br />
        <Button className="bg-gray-500 text-white px-1.5 py-1 rounded-xl mt-1">
          Start your search
        </Button>
      </div>
      <div className="w-50%">
        <Image
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrvgtgLDkS7W6AIlj4wrXxGkU0tXPsGCqI9g&s"
          }
          alt="nft"
          width={450}
          height={400}
          className=""
        />
      </div>
    </div>
  );
};

export default Hero1;
