import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import ConditionalLayout from "../components/Layout/ConditionalLayout";
import MetaPixel from "../components/common/MetaPixel";
import Script from "next/script";
import ConditionalTopLoader from "../components/common/ConditionalTopLoader";
import OrganizationSchema from "../components/seo/OrganizationSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa"
});

export const metadata = {
  title: "Dummy Flights for Visa - Eazy Visas | Visa Consultant",
  description: "Get dummy flights for visa applications. Book verifiable dummy flight tickets and hotel reservations. Fast 24-hour delivery. Trusted visa consultant.",
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
  },
  openGraph: {
    title: "Dummy Flights for Visa - Eazy Visas | Visa Consultant",
    description: "Get dummy flights for visa applications. Book verifiable dummy flight tickets and hotel reservations. Fast 24-hour delivery. Trusted visa consultant.",
    type: "website",
    locale: "en_US",
    siteName: "Easy Visa",
  },
  twitter: {
    card: "summary",
    title: "Dummy Flights for Visa - Eazy Visas | Visa Consultant",
    description: "Get dummy flights for visa applications. Book verifiable dummy flight tickets and hotel reservations. Fast 24-hour delivery. Trusted visa consultant.",
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
          <html lang="en" className={`${comfortaa.variable}`}>
        <head>
          <meta name="google-site-verification" content="mzi68Swu3UM_EQoy75guBPrCCFP8GbcSHLlyDFUEE2E" />
        </head>
        <body className="font-comfortaa">
        {/* Google Tag Manager Script */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-W9FX59F'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W9FX59F');
          `}
        </Script>
        
        {/* Google tag (gtag.js) - Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LKQVXEW96C" />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LKQVXEW96C');
          `}
        </Script>

        {/* Google tag (gtag.js) - Google Ads Conversion */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17833154075" />
        <Script id="google-ads-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17833154075');
          `}
        </Script>

        {/* Structured Data */}
        <OrganizationSchema />

        {/* Google Tag Manager (GTM) NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W9FX59F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel - Original */}
        <MetaPixel pixelId="1736415037003830" />
        
        {/* Meta Pixel - Additional */}
        <MetaPixel pixelId="2000698917125544" />

        {/* Page Content */}
        <ConditionalTopLoader />
        <BreadcrumbSchema />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
