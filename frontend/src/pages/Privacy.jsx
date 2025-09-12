import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const lastUpdated = "November 15, 2023";

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-primary-100">
              How we collect, use, and protect your information
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-neutral-500 mb-8">Last Updated: {lastUpdated}</p>
              
              <p className="lead text-lg text-neutral-700 mb-8">
                Smart Rent System is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Personal Information</h3>
              <p className="mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Register for an account</li>
                <li>Sign up for our newsletter</li>
                <li>Request customer support</li>
                <li>Create or edit a listing</li>
                <li>Make a booking or reservation</li>
                <li>Complete a transaction</li>
                <li>Submit a review</li>
              </ul>
              <p className="mb-4">
                The personal information we may collect includes your name, email address, phone number, home address, payment information, date of birth, profile picture, and government-issued ID for verification purposes.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Automatically Collected Information</h3>
              <p className="mb-4">
                When you access our platform, we may automatically collect certain information about your device and usage of our services, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Device type, operating system, and browser type</li>
                <li>IP address and approximate location</li>
                <li>Browser and device characteristics</li>
                <li>Referring URLs and exit pages</li>
                <li>Usage patterns and interactions with our platform</li>
                <li>Session duration and browsing activity</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Create and manage your account</li>
                <li>Process and facilitate bookings and transactions</li>
                <li>Connect guests with hosts</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send transactional emails and booking confirmations</li>
                <li>Send marketing and promotional communications (with your consent)</li>
                <li>Improve our platform and user experience</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Ensure compliance with our terms of service</li>
                <li>Fulfill our legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Information Sharing and Disclosure</h2>
              <p className="mb-4">
                We may share your information in the following situations:
              </p>
              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Between Users</h3>
              <p className="mb-4">
                To facilitate bookings, we share certain information between guests and hosts, such as names, profile photos, messaging communications, and booking details.
              </p>
              
              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Service Providers</h3>
              <p className="mb-4">
                We may share your information with third-party vendors who provide services on our behalf, such as payment processing, customer support, hosting, email delivery, and analytics.
              </p>
              
              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Legal Requirements</h3>
              <p className="mb-4">
                We may disclose your information where required by law, governmental request, or to protect our rights, privacy, safety, or property.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Your Privacy Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>The right to access the personal information we have about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to opt-out of marketing communications</li>
                <li>The right to data portability</li>
                <li>The right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Data Security</h2>
              <p className="mb-6">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, no electronic transmission or storage system is 100% secure, and we cannot guarantee absolute security of your information.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Data Retention</h2>
              <p className="mb-6">
                We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Children's Privacy</h2>
              <p className="mb-6">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect or solicit personal information from children. If we learn that we have collected personal information from a child under 18, we will delete that information as quickly as possible.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Updates to This Privacy Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Contact Us</h2>
              <p className="mb-6">
                If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-neutral-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> privacy@smartrentsystem.com</p>
                <p className="mb-2"><strong>Postal Address:</strong> 123 Rent Street, City, Country</p>
                <p><strong>Phone:</strong> +1 (123) 456-7890</p>
              </div>
            </div>
          </div>

          {/* Related links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/terms"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">Terms of Service</h3>
              <p className="text-neutral-600 mb-2">
                Review our terms and conditions for using the Smart Rent platform.
              </p>
              <span className="text-primary-600 font-medium flex items-center">
                Read Terms
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/cookies"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">Cookie Policy</h3>
              <p className="text-neutral-600 mb-2">
                Learn how we use cookies and similar technologies on our website.
              </p>
              <span className="text-primary-600 font-medium flex items-center">
                Read Cookie Policy
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/help"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">Help Center</h3>
              <p className="text-neutral-600 mb-2">
                Find answers to common questions about privacy and data protection.
              </p>
              <span className="text-primary-600 font-medium flex items-center">
                Visit Help Center
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 