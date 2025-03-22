import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Layout from "../common/Layout";

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
    <footer className="text-white  py-10">
      <Layout>
        <div className="bg-primary-500 py-[48px] rounded-xl px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex gap-[5px] flex-wrap justify-between items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">eazy visas</h2>
            <p className="mt-2">
              We help travelers explore Norway's wonders effortlessly with smart
              planning and expert guides.
            </p>

            <div className="flex space-x-4">
              {footerLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:underline">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold">Stay up to date</h3>
            <div className="flex items-center mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border border-white rounded-l-xl text-white focus:outline-none"
              />
              <button className="bg-white border border-white text-blue-500 px-4 py-2 rounded-r-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t flex justify-between border-white mt-6 pt-4 text-center">
          <p>&copy; 2025 TinyUI. All rights reserved.</p>
          <div className="flex justify-center space-x-4 ">
            <a href="/terms" className="hover:underline">
              Terms
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
            <a href="/cookies" className="hover:underline">
              Cookies
            </a>
          </div>
        </div></div>
      </Layout>
    </footer>
  );
}
