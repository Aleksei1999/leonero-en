import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LookSwitcher } from "@/components/LookSwitcher";
import { Lookbook } from "@/components/Lookbook";
import { Mosaic } from "@/components/Mosaic";
import { Product } from "@/components/Product";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CAPES, JACKETS, VESTS } from "@/data/collection";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <SmoothScroll />
      <Header />
      <LookSwitcher
        id="collection"
        primary
        looks={[...JACKETS, ...VESTS]}
        title={["The Fur", "Collection"]}
        note="Scroll down to see each piece tried on, one by one."
      />
      <Mosaic>
        <Lookbook />
      </Mosaic>
      <LookSwitcher
        id="capes"
        opening
        looks={CAPES}
        title={["Fur", "Capes"]}
        note="An asymmetric cut with an open side."
      />
      <Product />
      <Footer />
    </main>
  );
}
