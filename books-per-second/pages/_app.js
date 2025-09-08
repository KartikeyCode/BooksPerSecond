import GlobalState from "@/context/GlobalState";
import "@/styles/globals.css";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { sepolia} from "wagmi/chains";
const chains = [sepolia];

const client = createClient(
  getDefaultClient({
    appName: "BooksPerSecond",
    chains
  }),
);

export default function App({ Component, pageProps }) {
  return (
    <GlobalState>
      <WagmiConfig client={client}>
      <ConnectKitProvider>
      <Component {...pageProps} />
      </ConnectKitProvider>
      </WagmiConfig>
    </GlobalState>
  );
}
