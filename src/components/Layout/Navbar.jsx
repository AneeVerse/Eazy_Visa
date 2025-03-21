"use client";
import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import Link from "next/link";
import Layout from "../common/Layout";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Countries", href: "/countries" },
  { name: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white top-0 left-0 shadow-md  fixed w-full z-50">
        <Layout className=" flex justify-between h-[80px] items-center">
          {/* Logo */}
          <Link href="/">
            <div className="text-xl font-bold text-blue-500 flex items-center gap-2 cursor-pointer">
              <img src="/images/logo/logo.png" alt="Logo" className="w-full h-8" />
             
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-around gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-500 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search and CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-blue-700 flex gap-2 items-center text-lg">
              <FiSearch /> <span className="hidden text-[15px] text-gray-600 font-medium md:inline">Where to?</span>
            </button>
            <Link
              href="/get-started"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </button>
        </Layout>
      </nav>

      {/* Sidebar (Mobile Menu) */}
      <div
        className={`fixed inset-0 bg-opacity-50 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="w-64 bg-white h-full p-6 shadow-lg flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className="self-end text-gray-700 text-2xl" onClick={() => setIsOpen(false)}>
            <FiX />
          </button>

          {/* Menu Links */}
          <nav className="mt-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-700 text-lg hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="mt-6 flex items-center border rounded-lg p-2">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Where to?"
              className="ml-2 w-full outline-none"
            />
          </div>

          {/* CTA Button */}
          <Link
            href="/get-started"
            className="mt-6 block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
