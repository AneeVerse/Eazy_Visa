import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import ConditionalLayout from "../components/Layout/ConditionalLayout";
import MetaPixel from "../components/common/MetaPixel";
import Script from "next/script";
import ConditionalTopLoader from "../components/common/ConditionalTopLoader";
import OrganizationSchema from "../components/seo/OrganizationSchema";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import WebSiteSchema from "../components/seo/WebSiteSchema";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa"
});

export const metadata = {
  metadataBase: new URL('https://www.eazyvisas.com'),
  title: "Visa Consultant for Tourist & Business Visas + Dummy Flight Tickets | Eazy Visas",
  description: "Visa help made simple. Get document support, application guidance, and dummy flight tickets for visa (verified itinerary) - fast, clear pricing, no stress.",
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Visa Consultant for Tourist & Business Visas + Dummy Flight Tickets | Eazy Visas",
    description: "Visa help made simple. Get document support, application guidance, and dummy flight tickets for visa (verified itinerary) - fast, clear pricing, no stress.",
    url: 'https://www.eazyvisas.com',
    type: "website",
    locale: "en_US",
    siteName: "Eazy Visas",
    images: [
      {
        url: '/logo/main-logo.png',
        width: 1200,
        height: 630,
        alt: 'Eazy Visas - Visa Consulting Services',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Consultant for Tourist & Business Visas + Dummy Flight Tickets | Eazy Visas",
    description: "Visa help made simple. Get document support, application guidance, and dummy flight tickets for visa (verified itinerary) - fast, clear pricing, no stress.",
    images: ['/logo/main-logo.png'],
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
        <WebSiteSchema />

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
