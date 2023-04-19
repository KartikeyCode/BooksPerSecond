import { useRouter } from "next/router";
import React from "react";

const unauthenticated = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 2000);
  return (
    <div className="text-red-700 font-mono">Please Connect To Meta Mask</div>
  );
};

export default unauthenticated;
