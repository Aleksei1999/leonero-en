import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy — LEONERO' };

// реквизиты в квадратных скобках заменить на данные продавца
export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="21 October 2026">
      <p>
        This policy explains what personal data [Company name] (the &ldquo;Seller&rdquo;, &ldquo;we&rdquo;), company
        number [company number], collects when you use the LEONERO website and place an order, and how that data is
        protected. We process personal data in accordance with the UK GDPR and the Data Protection Act 2018.
      </p>

      <h2>What data we collect</h2>
      <ul>
        <li>your name, phone number, email address and messaging account, which you provide when ordering;</li>
        <li>your delivery address;</li>
        <li>technical data: cookies, IP address, browser and device type, and the pages you have visited.</li>
      </ul>

      <h2>Why we collect it</h2>
      <ul>
        <li>to accept, confirm and deliver your order;</li>
        <li>to answer your questions and resolve any disputes;</li>
        <li>to improve the website and understand which sections are useful;</li>
        <li>to send you news and offers &mdash; only if you have agreed to this.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        Only those we cannot fulfil your order without: our delivery partner and payment provider, and only to the
        extent required. Your data is never sold or shared with third parties for advertising. We may disclose data to
        public authorities where the law requires us to.
      </p>

      <h2>Storage and security</h2>
      <p>
        We keep your data for as long as is necessary for the purposes above or as required by law, after which it is
        deleted. Only the staff who handle orders have access to it.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask what data we hold about you, have it corrected or erased, and withdraw your consent to processing
        and marketing at any time. Write to us at [email] and we will reply within one month. You also have the right
        to complain to the Information Commissioner&rsquo;s Office (ICO).
      </p>

      <h2>Cookies</h2>
      <p>
        The website uses cookies to function correctly and to gather anonymised statistics. You can disable them in
        your browser settings, although some features may then stop working.
      </p>

      <h2>Contact</h2>
      <p>[Company name], [registered address], [email].</p>
    </LegalPage>
  );
}
