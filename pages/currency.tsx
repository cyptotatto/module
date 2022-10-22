import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

const DynamicCurrency = dynamic(() => import("../src/components/Currency"), {
  ssr: false,
});

function currency() {
  return (
    <div>
      <Link href="/">
        <h1>홈으로 이동</h1>
      </Link>
      <DynamicCurrency />
    </div>
  );
}

export default currency;
