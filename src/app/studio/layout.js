import { Inter, Comfortaa } from "next/font/google";
import "../globals.css";
import NextTopLoader from "nextjs-toploader";
import MetaPixel from "../../components/common/MetaPixel";
import Script from "next/script";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa"
});

export const metadata = {
  title: "Easy Visa Studio - Content Management",
  description: "Content management studio for Easy Visa",
};

export default function StudioLayout({ children }) {
  return <>{children}</>;
} 