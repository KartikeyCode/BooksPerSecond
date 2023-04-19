import { useRouter } from "next/router";
import React from "react";

const notFound = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/searchpage");
  }, 2000);
  return (
    <div className="text-red-700 font-mono">
      Invalid ISBN, this book is Unavailable
    </div>
  );
};

export default notFound;
