"use client";

import { usePrivy } from "@privy-io/react-auth";

//icons from lucide react

//external imports

import Link from "next/link";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";

//Navbar codes
const Header = () => {
  //sidebar

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { authenticated, user, login, logout } = usePrivy();

  const menuItems = [
    { name: "Sell Digital Asset", link: "/create-nft" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "My Digital Assets", link: "/my-digital-assets" },
  ];

  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href={"/"} className="font-bold text-inherit ml-3 text-xl">
              SPM Market
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              className="text-gray-800 font-semibold transition hover:text-gray-950 cursor-pointer"
              href="/create-nft"
            >
              Sell Digital Asset
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              className="text-gray-800 font-semibold transition hover:text-gray-950 cursor-pointer"
              href="/my-digital-assets"
              aria-current="page"
            >
              My Digital Assets
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-gray-800 font-semibold transition hover:text-gray-950 cursor-pointer"
              href="dashboard"
            >
              Dashboard
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem> */}
          <NavbarItem>
            <div>
              {authenticated ? (
                <Button>
                  {authenticated && `${user?.wallet?.address.slice(0, 6)}...`}
                </Button>
              ) : (
                <Button>00.x00 </Button>
              )}
            </div>
          </NavbarItem>
          <NavbarItem>
            <div>
              {authenticated ? (
                <Button
                  className="rounded-md bg-gray-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700  cursor-pointer"
                  onClick={() => logout()}
                >
                  Disconnect Wallet
                </Button>
              ) : (
                <Button
                  className="rounded-md bg-gray-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700  cursor-pointer"
                  onClick={() => login({ loginMethods: ["wallet"] })}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.link}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default Header;
