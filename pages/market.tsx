import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

const DynamicOrder = dynamic(() => import("../src/components/Order"), {
  ssr: false,
});

function order() {
  return (
    <div>
      <Link href="/">
        <h1>홈으로 이동</h1>
      </Link>
      <DynamicOrder />
    </div>
  );
}

export default order;
