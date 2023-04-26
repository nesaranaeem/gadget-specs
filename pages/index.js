import LatestGadgets from "@/components/home/latestGadgets/LatestGadgets";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Mobile Price | Smart Watch Price in Bangladesh - Latest Mobile Specs &
          Prices
        </title>
        <meta
          name="description"
          content="Find the latest mobile, smart watch specifications and prices in Bangladesh. Compare deals and stay updated on the latest mobile trends and tech."
        />
      </Head>
      <LatestGadgets />
    </>
  );
}
