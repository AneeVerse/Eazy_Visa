import Script from 'next/script';

export const metadata = {
  title: "Tourist & Business Visa Consultation: UK, US, Schengen",
  description: "Visa consultation for UK, US, Schengen & Australia. Clear steps, checklist-based guidance and WhatsApp support. No guarantees.",
  keywords: "UK visa, US visa, Schengen visa, Australia visa, tourist visa, business visa, visa consultancy, visa assistance, visa application",

  openGraph: {
    title: "Tourist & Business Visa Consultation: UK, US, Schengen",
    description: "Visa consultation for UK, US, Schengen & Australia. Clear steps, checklist-based guidance and WhatsApp support. No guarantees.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tourist & Business Visa Consultation: UK, US, Schengen",
    description: "Visa consultation for UK, US, Schengen & Australia. Clear steps, checklist-based guidance and WhatsApp support. No guarantees.",
  }
};

export default function AdsSchengenLayout({ children }) {
  return (
    <>
      {/* Google tag (gtag.js) - Schengen ad account */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-11158930668"
        strategy="afterInteractive"
        async
      />
      <Script id="google-ads-schengen" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11158930668');
        `}
      </Script>
      {children}
    </>
  );
}
