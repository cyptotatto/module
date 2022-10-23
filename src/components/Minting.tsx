import { BigNumber, Contract, ethers } from "ethers";
import { arrayify } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { TattoCollectionAddress } from "../contract/constant";
import { signer, Tatto } from "../contract/contractConfig";
import { TattoCollectionListener } from "../contract/eventListener";
import { lazyMintHash } from "../contract/utils/hash";
import { generateRandomString } from "../contract/utils/transform";
import { accountAtom } from "../recoil/account";
import { tokenAtom } from "../recoil/token";

function Minting() {
  const [account, setAccount] = useRecoilState(accountAtom);
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [mintHash, setMintHash] = useState<string>("");
  const [mintSignature, setSignature] = useState<string>("");
  const [tokenIdArray, setTokenIdArray] = useRecoilState<number[]>(tokenAtom);

  useEffect(() => {
    const listener = (
      address: string,
      tokenId: BigNumber,
      ipfsHash: string
    ) => {
      !tokenIdArray.includes(Number(tokenId)) &&
        setTokenIdArray([...tokenIdArray, Number(tokenId)]);
    };
    TattoCollectionListener.addMintListener(Tatto.collection, listener);
    return () => {
      TattoCollectionListener.deleteMintListener(Tatto.collection, listener);
    };
  }, [tokenIdArray, setTokenIdArray]);

  const getMintHash = () => {
    const ipfsHashValue = generateRandomString(46);
    setIpfsHash(ipfsHashValue);
    const hashValue = lazyMintHash(
      TattoCollectionAddress,
      account,
      account,
      ipfsHashValue
    );
    setMintHash(hashValue);
  };

  const makeSignature = async () => {
    //원래 여기서 signer는 백이어야 한다.
    try {
      const signValue = await signer.signMessage(arrayify(mintHash));
      setSignature(signValue);
    } catch (err) {
      console.log(err);
    }
  };

  const mintButton = async () => {
    //원래 세번째는 back address
    try {
      await Tatto.collection.lazyMint(
        account,
        account,
        ipfsHash,
        account,
        mintHash,
        mintSignature
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>ipfs hash:{ipfsHash}</div>
      <button onClick={getMintHash}>hash 구하기</button>
      <div>hash: {mintHash}</div>
      <button onClick={makeSignature}>sign하기</button>
      <div>signature: {mintSignature}</div>
      <h2>여기까지가 백이 해야할거</h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>여기부터는 프론트가 해야할거</h2>
      <button onClick={mintButton}>민팅하기</button>
      <div>
        {tokenIdArray.map((tokenId, idx) => (
          <div key={idx}>{tokenId}</div>
        ))}
      </div>
    </div>
  );
}

export default Minting;
