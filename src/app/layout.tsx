import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: 'FOMENKO — меховые накидки',
  description: 'Накидки из искусственного меха FOMENKO: пять цветов, одна форма.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
