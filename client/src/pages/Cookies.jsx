import React from 'react';
import { Link } from 'react-router-dom';

const Cookies = () => {
  const lastUpdated = "November 15, 2023";

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-xl text-primary-100">
              How we use cookies and similar technologies
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
                This Cookie Policy explains how Smart Rent System uses cookies and similar technologies when you visit our website or use our services. By using our platform, you consent to the use of cookies as described in this policy.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">What Are Cookies?</h2>
              <p className="mb-6">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They're widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
              </p>
              <p className="mb-6">
                Cookies can be "first party cookies" (set by us) or "third party cookies" (set by someone else). They can also be "session cookies" (which expire when you close your browser) or "persistent cookies" (which stay on your device until they expire or are deleted).
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Types of Cookies We Use</h2>
              <p className="mb-4">
                We use the following types of cookies for the purposes described:
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Essential Cookies</h3>
              <p className="mb-6">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and account authentication. The website cannot function properly without these cookies, so they cannot be disabled.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Preference Cookies</h3>
              <p className="mb-6">
                These cookies allow us to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages. If you disable these cookies, some or all of these features may not function properly.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Analytics Cookies</h3>
              <p className="mb-6">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our website structure, content, and user experience. We use analytics providers such as Google Analytics for this purpose.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Marketing Cookies</h3>
              <p className="mb-6">
                These cookies are used to track visitors across websites. They're used to display ads that are relevant and engaging for individual users, and therefore more valuable for publishers and third-party advertisers. They may be set through our site by our advertising partners.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">Social Media Cookies</h3>
              <p className="mb-6">
                These cookies are set by social media services that we have added to the site (like sharing buttons). They're designed to enable you to share content on social networks, but they can also track your browser across other sites and build a profile of your interests.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Specific Cookies We Use</h2>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full divide-y divide-neutral-200 border border-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Provider</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Purpose</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Expiry</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">_auth_token</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">smartrentsystem.com</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">Used for authentication and security</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">_session_id</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">smartrentsystem.com</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">Maintains user session state</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">Session</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">_ga</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">Google Analytics</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">Distinguishes users for analytics</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">2 years</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">_gid</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">Google Analytics</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">Counts and tracks page views</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">24 hours</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">pref_currency</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">smartrentsystem.com</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">Remembers currency preference</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">pref_language</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">smartrentsystem.com</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">Remembers language preference</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">recently_viewed</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">smartrentsystem.com</td>
                      <td className="px-6 py-4 text-sm text-neutral-700">Tracks recently viewed listings</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Managing Your Cookie Preferences</h2>
              <p className="mb-4">
                Most web browsers allow you to manage your cookie preferences. You can:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Delete cookies from your device</li>
                <li>Block cookies by activating the setting on your browser to refuse all or some cookies</li>
                <li>Set your browser to notify you when you receive a cookie</li>
                <li>Use browser extensions or plugins for more detailed control</li>
              </ul>
              <p className="mb-6">
                Please note that if you choose to block or delete cookies, some features of our website may not function correctly, and your user experience may be affected.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">How to Manage Cookies in Major Browsers</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                <li><strong>Opera:</strong> Settings → Advanced → Privacy & security → Site settings → Cookies</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Third-Party Cookies</h2>
              <p className="mb-6">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may track your browsing activity across different websites. You can disable the use of these cookies through your browser settings or by using the opt-out options provided by these third parties.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Similar Technologies</h2>
              <p className="mb-6">
                In addition to cookies, we may use other similar technologies to store and access data on your device:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Web beacons:</strong> Small electronic files (also called clear gifs, pixel tags, and single-pixel gifs) that permit us to count users who have visited certain pages or opened an email.</li>
                <li><strong>Local Storage:</strong> Stores data locally in your browser that persists even when you close the browser.</li>
                <li><strong>Session Storage:</strong> Similar to Local Storage but data is cleared when the browser session ends.</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Updates to This Cookie Policy</h2>
              <p className="mb-6">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to periodically review this page for the latest information on our cookie practices.
              </p>

              <h2 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">Contact Us</h2>
              <p className="mb-6">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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
              to="/terms"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">Terms of Service</h3>
              <p className="text-neutral-600 mb-2">
                Review our terms and conditions for using Smart Rent.
              </p>
              <span className="text-primary-600 font-medium flex items-center">
                Read Terms
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
                Find answers to common questions about our privacy and cookies.
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

export default Cookies; 