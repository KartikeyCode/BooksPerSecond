import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function App() {
  // const router = useRouter();
  // const { isStarted, currentIsbn } = useContext(GlobalContext);
  // console.log(currentIsbn);
  // useEffect(
  //   () => {
  //     if (isStarted) {
  //       router.push(`/preview/${currentIsbn}`);
  //       console.log("test");
  //     }
  //   },
  //   [isStarted, currentIsbn],
  //   []
  // );
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  );
}
