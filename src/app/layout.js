import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import ConditionalLayout from "../components/Layout/ConditionalLayout";
import MetaPixel from "../components/common/MetaPixel";
import Script from "next/script";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa"
});

export const metadata = {
  title: "Apply for Visa with low fare dummy flight & hotel bookings - Home page",
  description: "Apply for visa with low fare dummy flight tickets and hotel bookings. Get legitimate and verifiable travel documents for visa applications. Expert visa consultation services.",
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
        
        {/* Google Analytics Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C2WPXNZGXG"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C2WPXNZGXG');
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

        {/* Meta Pixel */}
        <MetaPixel />

        {/* Page Content */}
        <NextTopLoader
          color="#0B82E6"
          initialPosition={0.08}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={500}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
