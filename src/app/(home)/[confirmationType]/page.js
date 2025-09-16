"use client";

import { useEffect } from 'react';
import { FaCheckCircle, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { useRouter, useParams } from 'next/navigation';
import Layout from '../../../components/common/Layout';
import Footer from '../../../components/Layout/Footer';
import Link from 'next/link';
import Image from "next/image";
import Script from 'next/script';

// Configuration for different confirmation types
const confirmationConfig = {
  // Tourist Visa
  'Visa-confirmation-tourist': {
    title: 'Thank You for Your Tourist Visa Application!',
    description: 'Our visa experts will help you with your tourist visa requirements.',
    serviceName: 'Tourist Visa'
  },
  
  // Business Visa
  'Visa-confirmation-business': {
    title: 'Thank You for Your Business Visa Application!',
    description: 'Our visa experts will assist you with your business visa needs.',
    serviceName: 'Business Visa'
  },
  
  // End to End
  'Confirmation-end-to-end': {
    title: 'Thank You for Choosing Our End-to-End Service!',
    description: 'Our team will handle everything from documentation to visa approval.',
    serviceName: 'End-to-End Visa Service'
  },
  
  // Blogs
  'confirmation-blogs': {
    title: 'Thank You for Your Interest!',
    description: 'Our experts will provide you with detailed visa information.',
    serviceName: 'Visa Information'
  },
  
  // Hotel
  'Confirmation-hotel': {
    title: 'Thank You for Your Hotel Booking Inquiry!',
    description: 'Our team will help you with hotel booking requirements for your visa.',
    serviceName: 'Hotel Booking Service'
  },
  
  // Flight
  'Confirmation-flight': {
    title: 'Thank You for Your Flight Booking Inquiry!',
    description: 'Our team will assist you with flight booking requirements for your visa.',
    serviceName: 'Flight Booking Service'
  },
  
  // Contact
  'Confirmation-contact': {
    title: 'Thank You for Contacting Us!',
    description: 'One of our visa experts will get back to you shortly.',
    serviceName: 'General Inquiry'
  },
  
  // Countries
  'Confirmation-countries': {
    title: 'Thank You for Your Interest in Visa Services!',
    description: 'Our visa experts will help you with your destination country requirements.',
    serviceName: 'Country Visa Services'
  },
  
  // Most Preferred (if you have this service)
  'Visa-confirmation-most-preferred': {
    title: 'Thank You for Choosing Our Most Preferred Service!',
    description: 'Our premium visa experts will provide you with the best service.',
    serviceName: 'Most Preferred Visa Service'
  }
};

export default function DynamicThankYouPage() {
  const router = useRouter();
  const params = useParams();
  const confirmationType = params.confirmationType;
  
  // Get configuration for this confirmation type, fallback to default
  const config = confirmationConfig[confirmationType] || {
    title: 'Thank You for Connecting With Us!',
    description: 'One of our visa experts will contact you within 30 minutes.',
    serviceName: 'Visa Service'
  };

  // Set dynamic metadata based on confirmation type
  useEffect(() => {
    document.title = `${config.serviceName} - Confirmation | Eazy Visa`;
  }, [config.serviceName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-12">
      {/* Event snippet for Leads (GADS) conversion page */}
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
              'send_to': 'AW-11158930668/lNOxCMTyiN8aEOyJ_8gp',
              'value': 1500.0,
              'currency': 'INR'
          });
        `}
      </Script>

      <Layout className="">
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
            <FaCheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {config.title}
          </h1>
          <p className="mt-4 text-[25px] text-gray-600">
            {config.description}
          </p>
          {/* Show service name */}
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Service: {config.serviceName}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* What to Expect Card */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <FaClock className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">What to Expect</h3>
                <p className="text-gray-600">
                  Our expert will call you within 30 minutes to discuss your {config.serviceName.toLowerCase()} requirements and next steps.
                </p>
              </div>

              {/* Contact Info Card */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <FaPhone className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Need Immediate Help?</h3>
                <p className="text-gray-600 mb-2">
                  Call us at: <br />
                  <Link href="tel:+918850146905" className="font-semibold text-blue-600 hover:text-blue-800">
                  +91 88501 46905
                  </Link>
                </p>
              </div>

              {/* Email Card */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <FaEnvelope className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">
                  <Link href="mailto:info@eazyvisas.com" className="font-semibold text-blue-600 hover:text-blue-800">
                    info@eazyvisas.com
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

      </Layout>
       <Footer/>
    </div>
  );
}
