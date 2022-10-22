import type { NextPage } from "next";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { accountAtom } from "../src/recoil/account";

const Home: NextPage = () => {
  const [account, setAccount] = useRecoilState(accountAtom);

  return (
    <div>
      <>
        <Link href="/mint">
          <h1>mint 페이지로 이동</h1>
        </Link>
        <Link href="/market">
          <h1>market 페이지로 이동</h1>
        </Link>
        <Link href="/currency">
          <h1>돈관리</h1>
        </Link>
        <Link href="/role">
          <h1>role관리</h1>
        </Link>
      </>
    </div>
  );
};

export default Home;
