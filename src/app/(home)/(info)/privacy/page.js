// pages/privacy.js
import Layout from '@/components/common/Layout';
import { FiShield, FiUser, FiDatabase, FiMail, FiSettings } from 'react-icons/fi';


export const metadata = {
  title: "Privacy Policy | Eazy Visas",
  description: "Eazy Visas is a one-stop solution for all your visa needs.",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen relative py-20">

       <div className="absolute blur-[200px] top-[0%] -left-[30px] -z-10  w-[400px] h-[400px] bg-[#0B82E6] opacity-50"></div>
      <Layout className="">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Effective: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-blue-100 overflow-hidden">
          {/* Introduction */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start mb-6">
              <FiShield className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
              <div>
                <p className="text-gray-600 mb-4">
                  At Eazy Visas, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                </p>
                <p className="text-gray-600">
                  By accessing or using our service, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="divide-y divide-gray-200">
            {/* Section 1 */}
            <div className="p-8">
              <div className="flex items-start">
                <FiUser className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                  <p className="text-gray-600 mb-4">We collect several types of information from and about users:</p>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Personal Data:</strong> Name, email address, phone number, payment information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Cookies:</strong> We use cookies to track activity and hold certain information</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="p-8">
              <div className="flex items-start">
                <FiDatabase className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">We use the collected data for various purposes:</p>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>To provide and maintain our service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>To notify you about changes to our service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>To allow you to participate in interactive features</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>To provide customer support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>To gather analysis to improve our service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>To monitor usage of our service</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="p-8">
              <div className="flex items-start">
                <FiSettings className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing and Disclosure</h2>
                  <p className="text-gray-600 mb-4">We may share your information in these situations:</p>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Service Providers:</strong> With third parties to facilitate our service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Business Transfers:</strong> In connection with any merger or sale of company assets</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Legal Requirements:</strong> When required by law or to protect rights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal data. However, no method of transmission over the Internet is 100% secure.
              </p>
              <p className="text-gray-600">
                We will notify you and any applicable regulator of a breach where we are legally required to do so.
              </p>
            </div>

            {/* Section 5 */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Data Protection Rights</h2>
              <p className="text-gray-600 mb-4">Depending on your location, you may have rights including:</p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Access, update or delete your information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Rectify inaccurate data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Object to our processing of your data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Request restriction of processing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Data portability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Withdraw consent</span>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to track activity and hold certain information.
              </p>
              <p className="text-gray-600">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            {/* Contact */}
            <div className="p-8 bg-blue-50">
              <div className="flex items-start">
                <FiMail className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-600">
                    For any questions about this Privacy Policy, contact us at <a href="mailto:info@eazyvisas.com" className="text-blue-600 hover:underline">info@eazyvisas.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}