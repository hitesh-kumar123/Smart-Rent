import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaqs, setExpandedFaqs] = useState({});

  // FAQ categories
  const categories = [
    { id: 'general', name: 'General Questions' },
    { id: 'booking', name: 'Booking & Reservations' },
    { id: 'payment', name: 'Payments & Refunds' },
    { id: 'host', name: 'Hosting Questions' },
    { id: 'safety', name: 'Safety & Security' },
    { id: 'account', name: 'Account Management' }
  ];

  // FAQ data organized by category
  const faqData = {
    general: [
      {
        id: 'what-is-smart-rent',
        question: 'What is Smart Rent System?',
        answer: 'Smart Rent System is a platform that connects travelers with unique accommodations around the world. Our platform allows hosts to list their properties, and guests to book these spaces. We provide secure payment processing, verified reviews, and customer support to ensure a smooth experience for everyone.'
      },
      {
        id: 'how-to-start',
        question: 'How do I get started with Smart Rent?',
        answer: 'Getting started is easy! Simply create an account, fill out your profile information, and you can start searching for properties or list your own space. Browse listings by location, price, amenities, and more to find the perfect place for your next trip.'
      },
      {
        id: 'contact-support',
        question: 'How do I contact customer support?',
        answer: 'You can reach our customer support team through multiple channels. Use the Contact page on our website, email us at support@smartrentsystem.com, or call our support line at +1 (800) SMART-RENT. Our team is available 24/7 to assist with any questions or concerns.'
      },
      {
        id: 'app-available',
        question: 'Is there a mobile app available?',
        answer: 'Yes! The Smart Rent System app is available for both iOS and Android devices. Download it from the App Store or Google Play Store to manage your bookings, message hosts or guests, and browse listings on the go.'
      }
    ],
    booking: [
      {
        id: 'how-to-book',
        question: 'How do I book a property?',
        answer: 'To book a property, search for accommodations in your desired location and dates. Once you find a place you like, click "Reserve" or "Book Now" and follow the checkout process. Some properties allow instant booking, while others require approval from the host.'
      },
      {
        id: 'booking-confirmation',
        question: 'How do I know if my booking is confirmed?',
        answer: 'After completing the booking process, you\'ll receive a confirmation email with all the details of your reservation. You can also view the status of your booking in the "Trips" section of your account dashboard.'
      },
      {
        id: 'cancel-booking',
        question: 'How do I cancel a booking?',
        answer: 'To cancel a booking, go to the "Trips" section of your account, find the booking you wish to cancel, and click the "Cancel" option. The refund amount will depend on the property\'s cancellation policy, which is displayed before you book and in your reservation details.'
      },
      {
        id: 'modify-dates',
        question: 'Can I change the dates of my reservation?',
        answer: 'Yes, you can request to modify your reservation dates. Go to your "Trips" page, select the booking you want to change, and click "Modify Reservation." Note that this is subject to host approval and availability. Price adjustments may apply based on the new dates.'
      }
    ],
    payment: [
      {
        id: 'payment-methods',
        question: 'What payment methods are accepted?',
        answer: 'We accept major credit and debit cards (Visa, MasterCard, American Express, Discover), PayPal, and in some regions, Apple Pay and Google Pay. All payments are processed securely through our platform.'
      },
      {
        id: 'payment-timing',
        question: 'When am I charged for my booking?',
        answer: 'For most bookings, you\'ll be charged the full amount when the host accepts your reservation or immediately if you use Instant Book. For some longer stays or bookings made months in advance, you may have the option to pay in installments.'
      },
      {
        id: 'security-deposit',
        question: 'What is a security deposit and when is it returned?',
        answer: 'A security deposit is an amount held to cover potential damages during your stay. It\'s not charged unless there\'s a claim by the host. If no claim is made, the hold on your payment method is released automatically 14 days after check-out.'
      },
      {
        id: 'refund-process',
        question: 'How long do refunds take to process?',
        answer: 'Once a refund is issued, it typically takes 5-10 business days to appear on your original payment method. The exact timing depends on your payment provider and financial institution.'
      }
    ],
    host: [
      {
        id: 'become-host',
        question: 'How do I become a host?',
        answer: 'To become a host, click on "Become a Host" in the navigation menu. You\'ll need to create a listing with details about your space, set house rules, upload photos, set pricing and availability, and complete your host profile. Our step-by-step guide will walk you through the process.'
      },
      {
        id: 'host-fees',
        question: 'What fees do hosts pay?',
        answer: 'Hosts typically pay a service fee of 3% of the booking subtotal. This fee covers the cost of processing payments, platform maintenance, and host support services. The exact percentage may vary depending on your location and other factors.'
      },
      {
        id: 'host-protection',
        question: 'Is there any protection for hosts?',
        answer: 'Yes, our Host Protection Program includes property damage protection up to $1,000,000 and liability insurance. To qualify, you must follow our hosting guidelines, maintain accurate listing details, and report any incidents promptly.'
      },
      {
        id: 'payout-schedule',
        question: 'When do I receive my payout as a host?',
        answer: 'Host payouts are typically processed 24 hours after the guest\'s scheduled check-in time. The funds usually appear in your designated payout method within 3-5 business days, depending on your bank or payment provider.'
      }
    ],
    safety: [
      {
        id: 'safety-features',
        question: 'What safety features should I look for in a property?',
        answer: 'We recommend booking properties with smoke detectors, carbon monoxide detectors, fire extinguishers, and first aid kits. You can filter for these safety features in your search, and they\'re listed on each property page under "Safety Features."'
      },
      {
        id: 'verify-identity',
        question: 'How does Smart Rent verify user identities?',
        answer: 'We use a combination of ID verification, email confirmation, phone verification, and payment information to verify user identities. Some bookings may require additional verification steps for enhanced security.'
      },
      {
        id: 'report-issues',
        question: 'How do I report safety concerns or emergencies?',
        answer: 'For immediate emergencies, always contact local emergency services first. After ensuring your safety, report the issue to us through the "Report Concern" page, the Help Center, or by calling our 24/7 emergency support line at +1 (800) SMART-RENT.'
      },
      {
        id: 'covid-protocols',
        question: 'What COVID-19 safety measures are in place?',
        answer: 'We encourage hosts to follow enhanced cleaning protocols, allow for sufficient time between guests, and provide contactless check-in options where possible. Many hosts display their specific COVID safety measures on their listing pages.'
      }
    ],
    account: [
      {
        id: 'create-account',
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking "Sign Up" on our homepage. You\'ll need to provide your email address and create a password, or you can sign up using Google, Facebook, or Apple accounts for faster registration.'
      },
      {
        id: 'update-profile',
        question: 'How do I update my profile information?',
        answer: 'To update your profile, go to the "Account" section in the dropdown menu. From there, you can edit your personal information, update your profile photo, change your password, and manage notification preferences.'
      },
      {
        id: 'delete-account',
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account by going to "Account Settings" and selecting "Delete Account" at the bottom of the page. Please note that this action is permanent and will remove all your data from our platform, including booking history and reviews.'
      },
      {
        id: 'privacy-settings',
        question: 'How can I manage my privacy settings?',
        answer: 'Privacy settings can be managed in the "Account" section under "Privacy." Here you can control what information is visible to others, manage your marketing preferences, and review data sharing options.'
      }
    ]
  };

  const toggleFaq = (id) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-primary-100">
              Find answers to the most common questions about using Smart Rent System
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
            <div className="md:flex">
              {/* Categories sidebar */}
              <div className="md:w-1/4 bg-neutral-50 p-4 md:p-6 border-r border-neutral-200">
                <h3 className="font-medium text-lg text-neutral-900 mb-4">Categories</h3>
                <nav className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                        activeCategory === category.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Need more help?</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    If you can't find what you're looking for, our support team is ready to assist.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
                  >
                    Contact Support
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* FAQ content */}
              <div className="md:w-3/4 p-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  {categories.find(c => c.id === activeCategory)?.name}
                </h2>

                <div className="space-y-4">
                  {faqData[activeCategory]?.map(faq => (
                    <div 
                      key={faq.id} 
                      className="border border-neutral-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-sm"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                      >
                        <span className="font-medium text-neutral-800">{faq.question}</span>
                        <svg
                          className={`h-5 w-5 text-neutral-500 transition-transform duration-200 ${
                            expandedFaqs[faq.id] ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      
                      {expandedFaqs[faq.id] && (
                        <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                          <p className="text-neutral-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional help section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Help Center</h3>
              <p className="text-neutral-600 mb-4">
                Browse comprehensive help guides, tutorials, and troubleshooting tips for using Smart Rent.
              </p>
              <Link
                to="/help"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium text-sm"
              >
                Visit Help Center
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Safety Information</h3>
              <p className="text-neutral-600 mb-4">
                Learn about our safety protocols, guidelines for guests and hosts, and emergency resources.
              </p>
              <Link
                to="/safety"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium text-sm"
              >
                View Safety Guidelines
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Report a Concern</h3>
              <p className="text-neutral-600 mb-4">
                Need to report a safety issue, policy violation, or other concern about a listing or user?
              </p>
              <Link
                to="/report-concern"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium text-sm"
              >
                Submit a Report
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 