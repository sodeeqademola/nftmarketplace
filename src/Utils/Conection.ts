import { ethers } from "ethers";
import NftMarketPlace from "./NFTMarketplace.json";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export const Connection = async () => {
  //   console.log(NftMarketPlace.abi);
  const blockChainAddress = "0xd93a9A180E48f5c28c8D79e5dE4038F0DbF8B33a";

  const provider = new ethers.BrowserProvider(
    window.ethereum as MetaMaskInpageProvider
  );
  if (window.ethereum) {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      blockChainAddress,
      NftMarketPlace.abi,
      signer
    );
    return contract;
  }
};
