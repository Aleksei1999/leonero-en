import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'LEONERO — Fur',
  description: 'Faux fur jackets, gilets and capes by LEONERO.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
