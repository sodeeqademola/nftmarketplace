"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { defineChain } from "viem";

const myCustomChain = defineChain({
  id: 1029, // Replace this with your chain's ID
  name: "BitTorrent Chain Donau",
  network: "BitTorrent Chain Donau",
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: "BitTorrent Chain Donau",
    symbol: "BTTC",
  },
  rpcUrls: {
    default: {
      http: ["https://pre-rpc.bt.io/"],
      // webSocket: ['wss://my-custom-chain-websocket-rpc'],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testscan.bt.io" },
  },
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NextUIProvider>
        <PrivyProvider
          appId="cm3mzcgrx02n1ab8jqr3ej6kr"
          config={{
            // Customize Privy's appearance in your app
            appearance: {
              theme: "dark",
              accentColor: "#676FFF",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROh5JMj4x9ntJdO-_Xe0G6fmxeGcMs_sfDng&s",
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            defaultChain: myCustomChain,
            supportedChains: [myCustomChain],
          }}
        >
          {children}
        </PrivyProvider>
      </NextUIProvider>
    </div>
  );
};

export default Provider;
