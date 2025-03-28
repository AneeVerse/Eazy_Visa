import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Eazy Visa",
  description: "Eazy Visa is a one-stop solution for all your visa needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-sans">
        <Navbar />
        <div className="mt-[80px]">
          {children}
        </div>
      </body>
    </html>
  );
}