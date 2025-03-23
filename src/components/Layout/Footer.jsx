import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Layout from "../common/Layout";
import Image from "next/image";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Explore", href: "/explore" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com" },
  { icon: FaTwitter, href: "https://twitter.com" },
  { icon: FaInstagram, href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="text-white py-10">
      <Layout>
        <div className="bg-primary-500 py-8 sm:py-10 rounded-xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between">
            {/* Left Section - Brand Info and Links */}
            <div className="space-y-4">
             <div>
              <Image src="/images/logo/logo-white.svg" alt="Logo" width={120} height={32} draggable={false} />
             </div>
              <p className="text-sm sm:text-base">
                We help travelers explore Norway's wonders effortlessly with smart
                planning and expert guides.
              </p>

              {/* Footer Links */}
              <div className="flex flex-wrap gap-4">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm sm:text-base hover:underline"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Section - Newsletter Subscription */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Stay up to date</h3>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-64 p-2 border border-white rounded-lg text-white bg-transparent focus:outline-none placeholder:text-gray-200"
                />
                <button className="w-full sm:w-auto bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright and Legal Links */}
          <div className="border-t border-white mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm sm:text-base text-center sm:text-left">
              &copy; 2025 TinyUI. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="/terms" className="text-sm sm:text-base hover:underline">
                Terms
              </a>
              <a href="/privacy" className="text-sm sm:text-base hover:underline">
                Privacy
              </a>
              <a href="/cookies" className="text-sm sm:text-base hover:underline">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </footer>
  );
}