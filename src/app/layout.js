import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import ConditionalLayout from "../components/Layout/ConditionalLayout";
import MetaPixel from "../components/common/MetaPixel";
import Script from "next/script";
import ConditionalTopLoader from "../components/common/ConditionalTopLoader";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa"
});

export const metadata = {
  title: "Eazy Visas - Visa Consultant",
  description: "easy visa offers a range of visa consulting services to businesses, families and individuals. We partner with our clients from start to finish, focusing on their needs while developing effective strategies and and solutions.",
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
  },
  openGraph: {
    title: "Eazy Visas - Visa Consultant",
    description: "easy visa offers a range of visa consulting services to businesses, families and individuals. We partner with our clients from start to finish, focusing on their needs while developing effective strategies and and solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Easy Visa",
  },
  twitter: {
    card: "summary",
    title: "Eazy Visas - Visa Consultant",
    description: "easy visa offers a range of visa consulting services to businesses, families and individuals. We partner with our clients from start to finish, focusing on their needs while developing effective strategies and and solutions.",
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
        
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LKQVXEW96C" />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LKQVXEW96C');
          `}
        </Script>

        {/* Structured Data for Organization without logo */}
        <Script id="organization-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Easy Visa",
              "description": "easy visa offers a range of visa consulting services to businesses, families and individuals. We partner with our clients from start to finish, focusing on their needs while developing effective strategies and and solutions.",
              "url": "https://www.eazyvisas.com",
              "telephone": "+91 88501 46905",
              "email": "info@eazyvisas.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "sameAs": []
            }
          `}
        </Script>
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
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
