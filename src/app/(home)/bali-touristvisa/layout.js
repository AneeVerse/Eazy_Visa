import Script from 'next/script';

export const metadata = {
  title: "Tourist & Business Visa Consultation: UK, Indonesia, Schengen",
  description: "Visa consultation for UK, Indonesia, Schengen & Australia. Clear steps, checklist-based guidance and WhatsApp support. No guarantees.",
  keywords: "UK visa, Indonesia visa, Bali visa, Schengen visa, Australia visa, tourist visa, business visa, visa consultancy, visa assistance, visa application",

  openGraph: {
    title: "Tourist & Business Visa Consultation: UK, Indonesia, Schengen",
    description: "Visa consultation for UK, Indonesia, Schengen & Australia. Clear steps, checklist-based guidance and WhatsApp support. No guarantees.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tourist & Business Visa Consultation: UK, Indonesia, Schengen",
    description: "Visa consultation for UK, Indonesia, Schengen & Australia. Clear steps, checklist-based guidance and WhatsApp support. No guarantees.",
  }
};

export default function BaliTouristVisaLayout({ children }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17833154075"
        strategy="afterInteractive"
        async
      />
      <Script id="google-ads-bali-touristvisa" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17833154075');
        `}
      </Script>
      {children}
    </>
  );
}
