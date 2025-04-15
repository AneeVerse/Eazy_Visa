"use client"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Layout from "../common/Layout";
import { useState } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from "next/link";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Dummy Bookings", href: "/dummy-bookings" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com" },
  { icon: FaTwitter, href: "https://twitter.com" },
  { icon: FaInstagram, href: "https://instagram.com" },
  { icon: FaLinkedinIn, href: "https://linkedin.com" },
  { icon: FaYoutube, href: "https://youtube.com" },
];

export default function Footer() {
  const [formData, setFormData] = useState({
      name: 'unknown',
      email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validate email
      if (!formData.email) {
        toast.error('Email is required!');
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
  
      setIsLoading(true);
  
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Subscription failed');
        }
  
        toast.success('Thank you for subscribing!');
        setFormData({ name: '', email: '' });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
  return (
    <footer className="text-white py-10">
       <ToastContainer
        position="top-right"
        autoClose={5000}
        className="mt-[70px]"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Layout>
        <div className="bg-primary-500 py-8 sm:py-10 rounded-xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between">
            {/* Left Section - Brand Info and Links */}
            <div className="space-y-4">
              <Link href={"/"} className="mb-4 block">
                <Image src="/logo/logo-white.png" alt="Logo" width={100} height={26} draggable={false} />
              </Link>
              {/* <p className="text-sm sm:text-base">
                We help travelers explore Norway's wonders effortlessly with smart
                planning and expert guides.
              </p> */}


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

              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  
                  placeholder="Enter your email"
                  className="w-full sm:w-64 p-2 border border-white rounded-lg text-white bg-transparent focus:outline-none placeholder:text-gray-200"
                />
                <button 
                onClick={handleSubmit}
                 disabled={isLoading}
                 className="w-full sm:w-auto bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                 {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-white border text-white hover:bg-opacity-30 p-2 rounded-full transition-all"
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright and Legal Links */}
          <div className="border-t border-white mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm sm:text-base text-center sm:text-left">
              &copy; 2025 Eazyvisas. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="/terms" className="text-sm sm:text-base hover:underline">
                Terms
              </a>
              <a href="/privacy" className="text-sm sm:text-base hover:underline">
                Privacy
              </a>
              {/* <a href="/cookies" className="text-sm sm:text-base hover:underline">
                Cookies
              </a> */}
            </div>
            {/* manage and powered by */}
            <div className="text-sm sm:text-base md:mt-0">
              Design & Managed by{" "}
              <Link
                href={"https://aneeverse.com/"}
                target="_blank"
                className="hover:underline inline-flex  flex-row items-center gap-2 min-h-fit"
              >
                <span>Aneeverse</span>
                <Image
                  src={"/logo/aneeverse-logo.svg"}
                  alt="Aneeverse Logo"
                  width={30}
                  height={30}
                  className="inline-block"
                />
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </footer>
  );
}