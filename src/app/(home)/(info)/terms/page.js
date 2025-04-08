// pages/terms.js
import Layout from '@/components/common/Layout';
import { FiAlertCircle, FiShield, FiCreditCard, FiLock } from 'react-icons/fi';



export const metadata = {
  title: "Terms & Conditions | Eazy Visa",
  description: "Eazy Visa is a one-stop solution for all your visa needs.",
}
export default function Terms() {
  return (
    <div className="min-h-screen relative py-20">
       
       <div className="absolute blur-[200px] top-[0%] -left-[30px]  w-[400px] h-[400px] bg-[#0B82E6] opacity-50"></div>
      <Layout className="">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-blue-100 overflow-hidden">
          {/* Introduction */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start mb-6">
              <FiAlertCircle className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600">
                  Welcome to Eazy Visa! These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="divide-y divide-gray-200">
            {/* Section 1 */}
            <div className="p-8">
              <div className="flex items-start">
                <FiShield className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. User Responsibilities</h2>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>You must be at least 18 years old to use our services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>You agree to provide accurate and complete information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>You are responsible for maintaining the confidentiality of your account</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>You agree not to use our services for any illegal or unauthorized purpose</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="p-8">
              <div className="flex items-start">
                <FiCreditCard className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Payments and Refunds</h2>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>All prices are in USD unless otherwise specified</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>We accept major credit cards and PayPal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Subscription services will automatically renew unless canceled</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Refunds are available within 14 days of purchase for digital products</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="p-8">
              <div className="flex items-start">
                <FiLock className="text-blue-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>All content on our website is owned by Eazy Visa or its licensors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>You may not reproduce, distribute, or create derivative works without permission</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>User-generated content remains your property, but you grant us a license to use it</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                Eazy Visa shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-gray-600">
                Our total liability for any claims under these terms shall not exceed the amount you paid us in the last 12 months.
              </p>
            </div>

            {/* Section 5 */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the service after any changes constitutes acceptance of the new terms.
              </p>
            </div>

            {/* Contact */}
            <div className="p-8 bg-blue-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us at <a href="mailto:info@eazyvisas.com" className="text-blue-600 hover:underline">info@eazyvisas.com</a>.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}