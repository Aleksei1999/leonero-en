import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Terms of Sale — LEONERO' };

// реквизиты в квадратных скобках заменить на данные продавца
export default function Terms() {
  return (
    <LegalPage title="Terms of Sale" updated="21 October 2026">
      <p>
        These terms apply to the sale of LEONERO goods by [Company name], company number [company number] (the
        &ldquo;Seller&rdquo;). By placing an order, you (the &ldquo;Customer&rdquo;) accept these terms in full.
      </p>

      <h2>1. The goods</h2>
      <p>
        The Seller supplies the goods chosen on the website, and the Customer pays for and accepts them. The
        description, colour and price of each item are shown on the website; the shade on your screen may differ
        slightly from the real thing.
      </p>

      <h2>2. Orders</h2>
      <p>
        Orders are placed through the website or by direct message. The contract is formed once the Seller has
        confirmed the order and the Customer has paid for it.
      </p>

      <h2>3. Prices and payment</h2>
      <p>
        Prices are shown in pounds sterling. The delivery charge is confirmed together with your order. Payment is
        accepted by [payment methods]. The Seller may change prices, but the price of an order that has already been
        paid for will not change.
      </p>

      <h2>4. Delivery</h2>
      <p>
        We deliver worldwide with [courier]; delivery usually takes [number] working days from dispatch. Responsibility
        for the goods passes to the Customer upon receipt.
      </p>

      <h2>5. Returns and exchanges</h2>
      <p>
        You may cancel your order and return or exchange an item within 14 days of receiving it, provided it has not
        been worn and its labels and packaging are intact. Refunds are made within 14 days of the Seller receiving the
        returned item. If an item is faulty, the Seller will replace it or issue a full refund and cover the cost of
        return postage. This does not affect your statutory rights.
      </p>

      <h2>6. Liability</h2>
      <p>
        These terms are governed by the laws of England and Wales. Any disputes will be settled by negotiation first
        and, failing that, by the courts of England and Wales, without prejudice to your rights as a consumer.
      </p>

      <h2>7. Personal data</h2>
      <p>
        By placing an order, the Customer agrees to the processing of personal data in line with our{' '}
        <Link href="/privacy" className="underline">
          privacy policy
        </Link>
        .
      </p>

      <h2>8. Company details</h2>
      <p>
        [Company name]
        <br />
        Company number [company number]
        <br />
        Registered address: [address]
        <br />
        Email: [email]
      </p>
    </LegalPage>
  );
}
