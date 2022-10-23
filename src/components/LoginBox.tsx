import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accountAtom } from "../recoil/account";

function LoginBox() {
  const [account, setAccount] = useRecoilState(accountAtom);

  const handleLogout = () => {
    setAccount("");
  };

  const handleLogin = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
        setAccount(accounts[0]);
      } else {
        alert("Install MetaMask");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {!account ? (
        <button onClick={handleLogin}>지갑연결</button>
      ) : (
        <button onClick={handleLogout}>Logout </button>
      )}
    </div>
  );
}

export default LoginBox;
