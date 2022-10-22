import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

const DynamicMinting = dynamic(() => import("../src/components/Minting"), {
  ssr: false,
});

function mint() {
  return (
    <div>
      <Link href="/">
        <h1>홈으로 이동</h1>
      </Link>
      <DynamicMinting />
    </div>
  );
}

export default mint;
