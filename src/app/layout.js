import { Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import NextTopLoader from "nextjs-toploader";
import FloatingActionButton from "@/components/Layout/FloatingActionButton";


const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
});

export const metadata = {
  title: "Eazy Visas",
  description: "Eazy Visas is a one-stop solution for all your visa needs.",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      // For modern browsers
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
      <body className="font-sans">
      <NextTopLoader
         color="#0B82E6"
         initialPosition={0.08}
         height={3}
         showSpinner={false}
         easing="ease"
         speed={500}
         shadow="0 0 10px #2299DD,0 0 5px #2299DD"
         />
        <Navbar />
        <div className="mt-[80px]">
          {children}
           <FloatingActionButton /> 
        </div>
      </body>
    </html>
  );
}
