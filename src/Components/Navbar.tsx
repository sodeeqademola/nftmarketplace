"use client";

import { Button } from "@nextui-org/react";
import { usePrivy } from "@privy-io/react-auth";

//icons from lucide react
import {
  AlignJustify,
  Facebook,
  Instagram,
  Linkedin,
  Search,
  Twitter,
  X,
  Youtube,
} from "lucide-react";

//external imports
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// import { Connection } from "../Utils/Conection";

//Navbar codes
const Navbar = () => {
  //sidebar
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const { authenticated, user, login, logout } = usePrivy();
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 ">
          <div className="flex justify-center items-center gap-2">
            <Image
              src={
                "https://lirp.cdn-website.com/ce014017/dms3rep/multi/opt/SPM+favicon-01-1920w.png"
              }
              alt="logo"
              width={40}
              height={40}
              quality={100}
              // className="bg-blue-950"
            />

            <Link href={"/"} className="font-semibold text-lg">
              Market
            </Link>
          </div>

          {/* navbar items */}
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-10 text-medium">
                <li className="relative">
                  <input
                    type="text"
                    className="rounded-full overflow-hidden p-3.5 border-2 h-7 border-gray-500"
                    placeholder="search NFT"
                  />
                  <Search
                    // fill="currentColor"
                    className="absolute right-2 top-2  bg-transparent h-4 p-0.5 "
                  />
                </li>
                <li className="relative">
                  <Link
                    href={"/create-nft"}
                    className="text-gray-800 font-semibold transition hover:text-gray-900/75 cursor-pointer"
                  >
                    {" "}
                    Sell Digital Asset{" "}
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href={"/my-digital-assets"}
                    className="text-gray-800 font-semibold transition hover:text-gray-900/75 cursor-pointer"
                  >
                    {" "}
                    My Digital Assets{" "}
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href={"dashboard"}
                    className="text-gray-800 font-semibold transition hover:text-gray-950 cursor-pointer"
                  >
                    {" "}
                    Creator Dashboard
                  </Link>
                </li>{" "}
              </ul>
            </nav>

            <div className="flex items-center gap-4 relative">
              <div className="relative flex items-center justify-center gap-2">
                <div>
                  {authenticated ? (
                    <Button>
                      {authenticated &&
                        `${user?.wallet?.address.slice(0, 6)}...`}
                    </Button>
                  ) : (
                    <Button>00.x00 </Button>
                  )}
                </div>
                <Image
                  src="https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg"
                  alt=""
                  width={35}
                  height={35}
                  className="rounded-full cursor-pointer"
                />
              </div>
              <div className="sm:flex  items-center sm:gap-4">
                {authenticated ? (
                  <button
                    className="rounded-md bg-gray-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700 md:block hidden cursor-pointer"
                    onClick={() => logout()}
                  >
                    Disconnect Wallet
                  </button>
                ) : (
                  <button
                    className="rounded-md bg-gray-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700 md:block hidden cursor-pointer"
                    onClick={() => login({ loginMethods: ["wallet"] })}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
              <div>
                {" "}
                {!openSideBar && (
                  <button
                    className="block rounded bg-gray-100 p-2 text-blue-600 transition hover:text-blue-600/75 md:hidden"
                    onClick={() => setOpenSideBar(!openSideBar)}
                  >
                    <span className="sr-only">Toggle menu</span>
                    <AlignJustify />
                  </button>
                )}
                {openSideBar && (
                  <button
                    className="block rounded bg-gray-100 p-2 text-blue-600 transition hover:text-blue-600/75 md:hidden"
                    onClick={() => setOpenSideBar(!openSideBar)}
                  >
                    <span className="sr-only">Toggle menu</span>
                    <X />
                  </button>
                )}
              </div>

              {/* side bar */}

              {openSideBar && (
                <div className=" shadow-2xl bg-gray-400  text-gray-700 font-normal text-[15px] px-6 py-4 w-56 rounded-md absolute top-12 right-3 space-y-1 transition md:hidden">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={
                        "https://lirp.cdn-website.com/ce014017/dms3rep/multi/opt/SPM+favicon-01-1920w.png"
                      }
                      alt="logo"
                      width={60}
                      height={60}
                      quality={100}
                      // className="bg-blue-950"
                    />
                    <h2 className="text-2xl font-bold  text-white">Supreme</h2>
                  </div>
                  <h2 className="text-[12px] text-white">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aliquam ipsum ipsa tempora natus cumque, eaque porro qui
                  </h2>
                  <div className="flex items-center gap-4 border border-b-2 border-gray-400">
                    <Facebook size={17} className="cursor-pointer" />{" "}
                    <Linkedin size={17} className="cursor-pointer" />{" "}
                    <Twitter size={17} className="cursor-pointer" />{" "}
                    <Youtube size={17} className="cursor-pointer" />{" "}
                    <Instagram size={17} className="cursor-pointer" />
                  </div>
                  <div className=" hover:text-white hover:rounded-md hover:border-2 hover:border-gray-600 transition hover:p-0.5 hover:bg-gray-600 cursor-pointer relative">
                    <div className="flex flex-row items-center justify-between">
                      <Link href={"/create-nft"} className="">
                        Sell Digital Assets
                      </Link>
                    </div>
                  </div>
                  <div className="hover:text-white hover:rounded-md hover:border-2 hover:border-gray-600 transition hover:p-0.5 hover:bg-gray-600 cursor-pointer relative">
                    <div className="flex flex-row items-center justify-between">
                      <Link href="/dashboard" className="">
                        Creator Dashboard
                      </Link>
                    </div>
                  </div>
                  <div className="hover:text-white hover:rounded-md hover:border-2 hover:border-gray-600 transition hover:p-0.5 hover:bg-gray-600 cursor-pointer">
                    <Link href={"/my-digital-assets"}> My Digital Assets </Link>
                  </div>

                  <div className="hover:text-white hover:rounded-md hover:border-2 hover:border-gray-600 transition hover:p-0.5 hover:bg-gray-600 cursor-pointer">
                    {authenticated ? (
                      <Button onClick={() => logout()}>
                        Disconnect Wallet
                      </Button>
                    ) : (
                      <Button
                        onClick={() => login({ loginMethods: ["wallet"] })}
                      >
                        Connect Wallet
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
