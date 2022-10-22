import { ethers } from "ethers";
import TattoCollectionAbi from "./abi/TattoCollection.sol/TattoCollection.json";
import TattoCurrencyAbi from "./abi/TattoCurrnency.sol/TattoCurrency.json";
import TattoMarketAbi from "./abi/TattoMarket.sol/TattoMarket.json";
import TattoRoleAbi from "./abi/TattoRole.sol/TattoRole.json";
import {
  TattoRoleAddress,
  TattoMarketAddress,
  TattoCurrencyAddess,
  TattoCollectionAddress,
} from "./constant";
import { ContractStructInterface } from "./interface";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
/**
 * backend는 아래에 해당
 */
// export const provier = new ethers.providers.AlchemyProvider(
//   "goerli",
//   process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
// );

export const signer = provider.getSigner();

export function getContract(_signer: any): ContractStructInterface {
  let role, currencyControl, market, collection;

  role = new ethers.Contract(TattoRoleAddress, TattoRoleAbi, _signer);

  currencyControl = new ethers.Contract(
    TattoCurrencyAddess,
    TattoCurrencyAbi,
    _signer
  );

  market = new ethers.Contract(TattoMarketAddress, TattoMarketAbi, _signer);

  //chizu chizu erc721
  collection = new ethers.Contract(
    TattoCollectionAddress,
    TattoCollectionAbi,
    _signer
  );

  return {
    role,
    collection,
    currencyControl,
    market,
  };
}

export const Tatto = getContract(signer);
