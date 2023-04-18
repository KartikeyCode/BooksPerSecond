import dynamic from "next/dynamic";

const Landing = dynamic(() => import("@/components/landing"));
const Navbar = dynamic(() => import("@/components/navbar"));

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
