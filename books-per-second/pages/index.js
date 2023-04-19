import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const { bookPayment } = useContext(GlobalContext);
  console.log(bookPayment);
  useEffect(
    () => {
      if (bookPayment) {
        toast.success("Transaction Completed!");
      }
    },
    [bookPayment],
    []
  );

  return (
    <div>
      <Toaster />
      <Navbar />
      <Landing />
    </div>
  );
}
