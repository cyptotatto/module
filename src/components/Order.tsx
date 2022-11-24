import { ethers } from "ethers";
import { arrayify } from "ethers/lib/utils";
import React, { useState } from "react";
import { signer } from "../contract/contractConfig";
import { tradeHash } from "../contract/utils/hash";
import { Tatto, provider } from "../contract/contractConfig";
import { TattoMarketAddress } from "../contract/constant";

function Order() {
  const [hash, setHash] = useState("");
  const [tradeSignature, setTradeSignature] = useState("");
  const makeHashAndSignature = async () => {
    const price = ethers.utils.parseEther("0.0001");
    const result = tradeHash(
      "0xe4F0E339c173EDb993bAe6f85DC1dcfc9EBbe810",
      "0xE976893Bf88F6CC81ae942cE9531fBebd8530D81",
      "0xEb813BD873fEE01C3Be4B2aCfc4f13f34Cea6ED5",
      price,
      123
    );
    const sig = await signer.signMessage(arrayify(result));
    setHash(result);
    setTradeSignature(sig);
  };
  const handleApprove = async () => {
    await Tatto.collection.approve(TattoMarketAddress, 1);
  };
  return (
    <div>
      <button onClick={handleApprove}>approve</button>
      <button onClick={makeHashAndSignature}>hash만들기</button>
      <div>해쉬</div>
      <div>{hash}</div>
      <div>signature</div>
      <div>{tradeSignature}</div>
    </div>
  );
}

export default Order;
