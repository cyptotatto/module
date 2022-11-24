import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accountAtom } from "../recoil/account";
import { Tatto, provider } from "../contract/contractConfig";

function Role() {
  const account = useRecoilValue<string>(accountAtom);
  const [address, setAddress] = useState<string>("");
  const [admin, setAdmin] = useState<string>();
  const [market, setMarket] = useState<string>();
  const [node, setNode] = useState<string>();

  const getAdminMember = useCallback(async () => {
    const result = await Tatto.role.getAdminAddress();
    setAdmin(result);
  }, []);

  const getMarketMember = useCallback(async () => {
    const result = await Tatto.role.getMarketAddress();
    setMarket(result);
  }, []);

  const getNodeMember = useCallback(async () => {
    const result = await Tatto.role.getBackAddress();
    setNode(result);
  }, []);

  useEffect(() => {
    getAdminMember();
    getMarketMember();
    getNodeMember();
  }, [getAdminMember, getMarketMember, getNodeMember]);

  const handleMarket = async () => {
    try {
      await Tatto.role.setMarketAddress(address);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNode = async () => {
    try {
      await Tatto.role.setBackAddress(address);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>address: {account}</h1>
      <input
        onChange={(e: any) => setAddress(e.target.value)}
        value={address}
      />
      <br />
      <br />
      <button onClick={handleMarket}>grant market</button>
      <button onClick={handleNode}>grant node</button>
      <h2>admin member</h2>
      {admin}
      <h2>market member</h2>
      {market}
      <h2>node member</h2>
      {node}
    </div>
  );
}

export default Role;
