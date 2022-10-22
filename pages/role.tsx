import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

const DynamicRole = dynamic(() => import("../src/components/Role"), {
  ssr: false,
});

function role() {
  return (
    <div>
      <Link href="/">
        <h1>홈으로 이동</h1>
      </Link>
      <DynamicRole />
    </div>
  );
}

export default role;
