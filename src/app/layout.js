import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/common/Layout";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eazy Visa",
  description: "Eazy Visa is a one-stop solution for all your visa needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="mt-[80px]">
          {children}
          </div>

      </body>
    </html>
  );
}
