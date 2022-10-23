import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Tatto } from "../contract/contractConfig";
import { accountAtom } from "../recoil/account";

function Role() {
  const account = useRecoilValue<string>(accountAtom);
  const [role, setRole] = useState({ admin: "", market: "", back: "" });
  const [backState, setBackState] = useState("");

  useEffect(() => {
    getRoleAddress();
  }, []);

  const getRoleAddress = async () => {
    const adminAddress = await Tatto.role.getAdminAddress();
    const marketAddress = await Tatto.role.getMarketAddress();
    const backAddress = await Tatto.role.getBackAddress();
    setRole({ admin: adminAddress, market: marketAddress, back: backAddress });
  };

  const setBackRole = async () => {
    await Tatto.role.setBackAddress(backState);
  };

  return (
    <div>
      <h1>your account:{account}</h1>
      <div>admin role : {role.admin}</div>
      <div>market role : {role.market}</div>
      <div>back role : {role.back}</div>
      <input
        onChange={(e) => {
          setBackState(e.target.value);
        }}
        value={backState}
      ></input>
      <button onClick={setBackRole}>set backAddress</button>
    </div>
  );
}

export default Role;
