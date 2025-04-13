"use client";

import { useEffect } from 'react';
import { FaCheckCircle, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Layout from '@/components/common/Layout';
import Footer from '@/components/Layout/Footer';
import Link from 'next/link';

export default function ThankYouPage() {
  const router = useRouter();

  // Redirect to home if accessed directly without submission
  useEffect(() => {
    if (!sessionStorage.getItem('formSubmitted')) {
      router.push('/');
    }
    // Clear the flag so it doesn't affect future visits
    return () => sessionStorage.removeItem('formSubmitted');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-12">
      <Layout className="">
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
            <FaCheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Thank You for Connecting With Us!
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            One of our visa experts will contact you shortly.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* What to Expect Card */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <FaClock className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">What to Expect</h3>
                <p className="text-gray-600">
                  Our expert will call you within 24 hours to discuss your visa requirements and next steps.
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