import LatestGadgets from "@/components/home/latestGadgets/LatestGadgets";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <LatestGadgets />
    </>
  );
}
