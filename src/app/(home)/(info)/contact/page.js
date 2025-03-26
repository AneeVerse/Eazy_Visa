"use client"
// pages/contact.js
import { useState } from 'react';
import { FiMapPin, FiMail, FiPhone, FiSend } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import Layout from '@/components/common/Layout';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen relative py-20 ">
        <div className="absolute blur-[200px] top-[0%] -left-[30px]  w-[400px] h-[400px] bg-[#0B82E6] opacity-50"></div>
      <Layout className="">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let&apos;s Connect
          </h1>
          <p className="text-gray-600 text-lg">
            Have a question or want to work together? Drop us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl shadow-blue-100">
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FiMapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Headquarters</h3>
                    <p className="text-gray-600">61, CITI TOWER, SECTOR 15, CBD BELAPUR, NAVI MUMBAI, MAHARASHTRA 400614</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FiPhone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600">+91 88501 46905</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FiMail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600">info@eazyvisas.com</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-5">
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/eazyvisas/" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <FaLinkedinIn className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <FaGithub className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl shadow-blue-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <div className="relative">
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white px-6 py-3.5 rounded-lg font-medium transition-all transform hover:scale-[1.02]"
              >
                <FiSend className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20 rounded-2xl overflow-hidden shadow-2xl shadow-blue-100">
          <iframe
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.2199434248564!2d73.03089647525982!3d19.01002748218104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3d08973e3f3%3A0x4d579303c049e89c!2sEazyVisas%20l%20Dummy%20Flight%20Tickets%2C%20End%20to%20End%20Visa%20Services%20for%20over%2060%20countries!5e0!3m2!1sen!2sin!4v1742959542843!5m2!1sen!2sin"
            className="filter grayscale(30%) contrast(110%)"
            style={{ filter: 'grayscale(30%) contrast(110%)' }}
          ></iframe>
        </div>
       
      </Layout>
    </div>
  );
};

export default Contact;