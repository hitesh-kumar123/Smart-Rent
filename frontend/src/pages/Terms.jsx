import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const lastUpdated = "November 15, 2023";

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-primary-100">
              The rules and guidelines for using Smart Rent System
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
                Welcome to Smart Rent System. These Terms of Service govern your access to and use of the Smart Rent System website, apps, and services. By accessing or using our service, you agree to be bound by these terms.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6">
                By registering for and/or using the Service in any manner, you agree to these Terms and all other operating rules, policies, and procedures that may be published by Smart Rent System. These Terms apply to all users of the Service, including hosts, guests, and general visitors.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">2. Account Registration</h2>
              <p className="mb-4">
                To access certain features of the Service, you must register for an account. When you register, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account and password</li>
                <li>Accept all risks of unauthorized access to your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="mb-6">
                We reserve the right to refuse service, terminate accounts, or remove content in our sole discretion.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">3. Content and Conduct</h2>
              <p className="mb-4">
                Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post and the consequences of sharing it. By posting content, you represent that you have the necessary rights to that content.
              </p>
              <p className="mb-6">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Post illegal, harmful, threatening, abusive, or discriminatory content</li>
                <li>Impersonate any person or entity</li>
                <li>Falsely state or misrepresent your affiliation with a person or entity</li>
                <li>Post private or confidential information of others without permission</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Upload viruses or other malicious code</li>
                <li>Attempt to circumvent any security features of the Service</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">4. Bookings and Reservations</h2>
              <p className="mb-4">
                As a guest, when you make a booking, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Pay all fees, applicable taxes, and any other charges related to your booking</li>
                <li>Be responsible for your conduct during your stay</li>
                <li>Adhere to the host's house rules and checkout procedures</li>
                <li>Leave the property in the same condition as when you arrived</li>
                <li>Report any damage or issues promptly</li>
              </ul>
              <p className="mb-4">
                As a host, when you list your property, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Provide accurate and complete information about your space</li>
                <li>Maintain your property in a safe and clean condition</li>
                <li>Respond to booking requests in a timely manner</li>
                <li>Honor confirmed bookings</li>
                <li>Comply with all applicable laws, including tax, zoning, and safety regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">5. Cancellations and Refunds</h2>
              <p className="mb-6">
                Cancellations and refunds are handled according to the specific cancellation policy selected by the host for their listing. This policy is displayed on each listing prior to booking. By completing a booking, guests acknowledge and agree to the host's cancellation policy.
              </p>
              <p className="mb-6">
                For more information, please refer to our <Link to="/cancellation" className="text-primary-600 hover:text-primary-700">Cancellation Policy</Link>.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">6. Fees and Payments</h2>
              <p className="mb-6">
                Smart Rent System charges service fees to both guests and hosts for use of the platform. These fees are calculated as a percentage of the booking subtotal and are clearly displayed before checkout. By using our Service, you agree to pay all applicable fees. All payments are processed securely through our platform.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">7. Disclaimers and Limitations of Liability</h2>
              <p className="mb-6">
                The Service is provided on an "as is" and "as available" basis. Smart Rent System expressly disclaims all warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p className="mb-6">
                In no event shall Smart Rent System be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">8. Indemnification</h2>
              <p className="mb-6">
                You agree to defend, indemnify, and hold harmless Smart Rent System, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees and costs, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your violation of any rights of another.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">9. Modifications to Terms</h2>
              <p className="mb-6">
                We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Service after such notice constitutes your acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">10. Governing Law</h2>
              <p className="mb-6">
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within [Jurisdiction].
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">11. Contact Information</h2>
              <p className="mb-6">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-neutral-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> legal@smartrentsystem.com</p>
                <p className="mb-2"><strong>Postal Address:</strong> 123 Rent Street, City, Country</p>
                <p><strong>Phone:</strong> +1 (123) 456-7890</p>
              </div>
            </div>
          </div>

          {/* Related links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/privacy"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">Privacy Policy</h3>
              <p className="text-neutral-600 mb-2">
                Learn how we collect, use, and protect your information.
              </p>
              <span className="text-primary-600 font-medium flex items-center">
                Read Privacy Policy
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
                Find answers to common questions about our terms and policies.
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

export default Terms; 