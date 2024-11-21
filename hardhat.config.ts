import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import fs from "fs";

const account1 = fs.readFileSync("./secret.txt").toString();

// console.log(account1);

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
    },
    BitTorrent: {
      chainId: 1029,
      url: "https://pre-rpc.bt.io/",
      accounts: [account1],
      gasPrice: 1000000000,
    },
  },
};

//0xd93a9A180E48f5c28c8D79e5dE4038F0DbF8B33a
export default config;
