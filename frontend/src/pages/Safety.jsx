import React from 'react';
import { Link } from 'react-router-dom';

const Safety = () => {
  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Safety Matters</h1>
            <p className="text-xl text-primary-100">
              Smart Rent System is committed to creating a safe environment for our hosts and guests
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">Our Commitment to Safety</h2>
            <p className="text-neutral-600 mb-4">
              At Smart Rent System, we prioritize the safety and well-being of our community. 
              We've implemented comprehensive safety measures, verification processes, and 
              support systems to ensure that both hosts and guests can use our platform with 
              confidence and peace of mind.
            </p>
            <p className="text-neutral-600">
              This page provides information about our safety practices, emergency resources, 
              and guidelines to help you stay safe while using our services.
            </p>
          </div>

          {/* Safety Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">Key Safety Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-800">Verified Profiles</h3>
                <p className="text-neutral-600">
                  All users undergo identity verification before they can book or host. 
                  This helps ensure that our community members are who they say they are.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-800">Property Standards</h3>
                <p className="text-neutral-600">
                  Properties listed on our platform must meet basic safety requirements 
                  including functional smoke and carbon monoxide detectors.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-800">24/7 Support</h3>
                <p className="text-neutral-600">
                  Our customer support team is available around the clock to assist with 
                  any safety concerns or emergencies that may arise.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">Safety Tips</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">For Guests</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Review property details carefully, including safety features and house rules.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Read reviews from previous guests to get insights about the property and host.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Keep communication within the Smart Rent System platform for your protection.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Familiarize yourself with emergency exits and safety equipment upon arrival.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Share your itinerary with a trusted friend or family member.</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">For Hosts</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Install and maintain smoke detectors, carbon monoxide detectors, and fire extinguishers.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Provide clear check-in instructions and emergency contact information.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Ensure proper locks on all doors and windows, including bedrooms.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Create and display an emergency guide with local medical facilities and emergency numbers.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Screen guests by reviewing their profiles and communication before accepting bookings.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COVID-19 Safety Measures */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">COVID-19 Safety Measures</h2>
            <p className="text-neutral-600 mb-6">
              While many regions have eased COVID-19 restrictions, we continue to encourage safety practices 
              that help protect our community:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-neutral-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3 text-neutral-800">Enhanced Cleaning Protocol</h3>
                <p className="text-neutral-600">
                  We recommend that hosts follow enhanced cleaning procedures between guests, 
                  including disinfecting high-touch surfaces and providing hand sanitizer when possible.
                </p>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3 text-neutral-800">Flexible Booking Options</h3>
                <p className="text-neutral-600">
                  Many properties offer flexible cancellation policies to accommodate unexpected 
                  changes in travel plans due to health concerns.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Resources */}
          <div className="bg-red-50 rounded-xl shadow-sm p-8 mb-12 border border-red-100">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">Emergency Resources</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-neutral-800">Immediate Emergency</h3>
              <p className="text-neutral-600 mb-2">
                For any life-threatening emergency, contact local emergency services immediately:
              </p>
              <p className="text-xl font-bold text-red-600">911</p>
              <p className="text-sm text-neutral-500">(or appropriate emergency number for your location)</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-neutral-800">Smart Rent System Urgent Support</h3>
              <p className="text-neutral-600 mb-3">
                For urgent situations that aren't life-threatening but require immediate assistance:
              </p>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="bg-white px-5 py-3 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-1">Urgent Support Line</p>
                  <p className="font-semibold">+1 (888) 555-0123</p>
                </div>
                <div className="bg-white px-5 py-3 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-1">Safety Email</p>
                  <p className="font-semibold">safety@smartrent.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reporting Concerns */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">Reporting Safety Concerns</h2>
            <p className="text-neutral-600 mb-6">
              If you encounter a safety issue or have concerns about a booking or listing, 
              we encourage you to report it to us immediately. Your reports help us maintain 
              a safe platform for everyone.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <Link 
                to="/contact"
                className="flex-1 bg-primary-500 text-white text-center py-4 rounded-lg font-medium hover:bg-primary-600 transition duration-300"
              >
                Contact Support
              </Link>
              <Link 
                to="/help"
                className="flex-1 bg-neutral-100 text-neutral-700 text-center py-4 rounded-lg font-medium hover:bg-neutral-200 transition duration-300"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety; 