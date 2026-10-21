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
        title={["Меховая", "коллекция"]}
        note="Листайте вниз: вещи по очереди примеряются на модель."
      />
      <Mosaic>
        <Lookbook />
      </Mosaic>
      <LookSwitcher
        id="capes"
        opening
        looks={CAPES}
        title={["Меховые", "накидки"]}
        note="Асимметричный крой, открытый бок."
      />
      <Product />
      <Footer />
    </main>
  );
}
