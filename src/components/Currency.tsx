import React, { useEffect, useState } from "react";
import { Tatto, provider } from "../contract/contractConfig";
import { useRecoilValue } from "recoil";
import { accountAtom } from "../recoil/account";
import { BigNumber, ethers } from "ethers";
import {
  makeEtherFromBigNumber,
  parseEtherFromNumber,
} from "../contract/utils/transform";
import { TattoCurrencyListener } from "../contract/eventListener";
import Router from "next/router";

function Currency() {
  const account = useRecoilValue<string>(accountAtom);
  const [balance, setbalance] = useState({
    tattoBalance: 0,
    myBalance: 0,
  });
  const [depositValue, setDepositValue] = useState<number>(0);
  const [withdrawValue, setWithdrawValue] = useState<number>(0);

  useEffect(() => {
    if (account) {
      getTattoBalace(account).then((res: BigNumber) => {
        setbalance({ ...balance, tattoBalance: makeEtherFromBigNumber(res) });
      });
      getmyBalance(account).then((res: BigNumber) => {
        setbalance({ ...balance, myBalance: makeEtherFromBigNumber(res) });
      });
    }

    const listener = (from: string, to: string, amount: BigNumber) => {
      console.log(from, to, amount);
      Router.reload();
    };

    TattoCurrencyListener.addDepositListener(Tatto.currencyControl, listener);
    TattoCurrencyListener.addWithdrawListener(Tatto.currencyControl, listener);
    return () => {
      TattoCurrencyListener.deleteDepositListener(
        Tatto.currencyControl,
        listener
      );
      TattoCurrencyListener.deleteWithdrawListener(
        Tatto.currencyControl,
        listener
      );
    };
  }, [account, balance]);

  const getTattoBalace = async (_account: string): Promise<BigNumber> => {
    const value = await Tatto.currencyControl.balanceOf(_account);
    return value;
  };

  const getmyBalance = async (_account: string): Promise<BigNumber> => {
    const value = await provider.getBalance(_account);
    return value;
  };

  const depositEther = async () => {
    try {
      await Tatto.currencyControl.depositETH({
        value: parseEtherFromNumber(depositValue),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const withdrawEther = async () => {
    try {
      await Tatto.currencyControl.withdrawETH(
        parseEtherFromNumber(withdrawValue)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("-")) {
      return;
    }
    let value = Number(e.target.value);
    if (value > balance.myBalance) {
      value = balance.myBalance;
    }
    value = Math.floor(value * 10000) / 10000;
    setDepositValue(value);
  };

  const handleWithdraw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "-") {
      return;
    }
    let value = Number(e.target.value);
    if (value > balance.myBalance) {
      value = balance.myBalance;
    }
    value = Math.floor(value * 10000) / 10000;
    setWithdrawValue(value);
  };

  return (
    <div>
      <h1>{account}</h1>
      <h3>tatto balance</h3>
      <div>{balance.tattoBalance}</div>
      <div className="deposit-box">
        <h3>deposit box</h3>
        <input
          type="number"
          value={depositValue}
          onChange={handleDeposit}
        ></input>
        <button onClick={depositEther}>deposit</button>
        <div>max: {balance.tattoBalance}</div>
      </div>
      <div className="widraw-box">
        <h3>withdraw box</h3>
        <input
          type="number"
          value={withdrawValue}
          onChange={handleWithdraw}
        ></input>
        <button onClick={withdrawEther}>withdraw</button>
        <div>max: {balance.myBalance}</div>
      </div>
    </div>
  );
}

export default Currency;
