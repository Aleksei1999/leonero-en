import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LookSwitcher } from '@/components/LookSwitcher';
import { Lookbook } from '@/components/Lookbook';
import { Mosaic } from '@/components/Mosaic';
import { Product } from '@/components/Product';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ZoomReveal } from '@/components/ZoomReveal';

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <SmoothScroll />
      <Header />
      <LookSwitcher />
      <Mosaic>
        <Lookbook />
      </Mosaic>
      <ZoomReveal />
      <Product />
      <Footer />
    </main>
  );
}
