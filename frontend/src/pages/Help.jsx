import React, { useState } from "react";
import { Link } from "react-router-dom";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [activeTab, setActiveTab] = useState("main");

  // Mock data for help categories
  const categories = [
    { id: "general", name: "General" },
    { id: "account", name: "Account & Profile" },
    { id: "booking", name: "Booking & Reservations" },
    { id: "payment", name: "Payments & Refunds" },
    { id: "hosting", name: "Hosting" },
    { id: "safety", name: "Safety & Accessibility" },
  ];

  // Mock data for FAQs
  const faqs = {
    general: [
      {
        id: "what-is-smart-rent",
        question: "What is Smart Rent?",
        answer:
          "Smart Rent is a platform that connects property owners with travelers looking for unique and comfortable places to stay. Whether you're looking for a cozy apartment in the city or a beachfront villa, Smart Rent offers a wide range of properties to suit your needs and budget.",
      },
      {
        id: "how-to-use",
        question: "How do I use Smart Rent?",
        answer:
          "Using Smart Rent is simple. Create an account, search for properties based on your destination and dates, browse through the options, and book the one that suits you best. You can also save properties to your wishlist, message hosts directly, and leave reviews after your stay.",
      },
      {
        id: "customer-service",
        question: "How do I contact customer service?",
        answer:
          "You can contact our customer service team through various channels including email support at help@smartrent.com, our 24/7 live chat available on our website, or by phone at +1-800-SMART-RENT. We aim to respond to all inquiries within 24 hours.",
      },
    ],
    account: [
      {
        id: "create-account",
        question: "How do I create an account?",
        answer:
          'To create an account, click on the "Sign up" button in the top right corner of our website or app. You can sign up using your email address, or continue with Google or Facebook. Fill in your details, agree to our terms of service, and you\'re ready to go!',
      },
      {
        id: "delete-account",
        question: "Can I delete my account?",
        answer:
          'Yes, you can delete your account at any time. Go to your Account Settings, scroll to the bottom of the page, and click on "Delete Account". Please note that this action is irreversible and will permanently remove all your data from our platform.',
      },
    ],
    booking: [
      {
        id: "cancel-booking",
        question: "How do I cancel a booking?",
        answer:
          'To cancel a booking, go to your Trips page, find the reservation you want to cancel, and click on "Cancel Reservation". The refund amount depends on the property\'s cancellation policy and how close to the check-in date you are cancelling. Always check the cancellation policy before booking.',
      },
      {
        id: "modify-booking",
        question: "Can I modify my booking dates?",
        answer:
          'Yes, you can request to modify your booking dates. Go to your Trips page, find the reservation you want to modify, and click on "Change Reservation". Note that changes are subject to host approval and may result in price adjustments based on the new dates.',
      },
    ],
    payment: [
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods including major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and in some regions, we also offer payment installments through services like Affirm or Klarna.",
      },
      {
        id: "refund-policy",
        question: "What is your refund policy?",
        answer:
          "Our refund policy depends on the individual property's cancellation policy chosen by the host. These typically fall into three categories: Flexible, Moderate, and Strict. The specific refund amount is clearly displayed before you confirm your booking and in your trip details.",
      },
    ],
    hosting: [
      {
        id: "become-host",
        question: "How do I become a host?",
        answer:
          'To become a host, click on "Become a Host" in the top navigation menu. You\'ll need to create a listing with photos, description, and pricing details for your property. Our step-by-step guide will help you set up your listing and start welcoming guests.',
      },
      {
        id: "host-fees",
        question: "What fees do hosts pay?",
        answer:
          "Hosts pay a service fee that is typically 3% of the booking subtotal. This fee covers the cost of processing payments and the services we provide to hosts, such as 24/7 customer support and marketing of your property to millions of potential guests.",
      },
    ],
    safety: [
      {
        id: "covid-measures",
        question: "What COVID-19 safety measures are in place?",
        answer:
          "We encourage hosts to follow enhanced cleaning protocols developed with health experts. Many properties have implemented additional safety measures, which are displayed on the listing page. We also have flexible cancellation options related to COVID-19 circumstances.",
      },
      {
        id: "accessibility",
        question: "How can I find accessible properties?",
        answer:
          "You can use our accessibility filters when searching for properties to find ones that match your specific needs. Hosts can list various accessibility features such as step-free access, wide doorways, accessible parking, and more.",
      },
    ],
  };

  const toggleFaq = (id) => {
    setExpandedFaqs({
      ...expandedFaqs,
      [id]: !expandedFaqs[id],
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would search through all FAQs
    console.log("Searching for:", searchQuery);
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "guides":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Help Guides
            </h2>
            <p className="text-neutral-600 mb-6">
              Detailed guides on how to use Smart Rent features and services.
            </p>

            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-6">
                <h3 className="text-lg font-medium text-neutral-800 mb-3">
                  Getting Started
                </h3>
                <ul className="space-y-3">
                  <li className="text-primary-600 hover:text-primary-700">
                    <button
                      onClick={() => console.log("Creating account guide")}
                    >
                      How to create and set up your account
                    </button>
                  </li>
                  <li className="text-primary-600 hover:text-primary-700">
                    <button onClick={() => console.log("Search guide")}>
                      Searching for properties
                    </button>
                  </li>
                  <li className="text-primary-600 hover:text-primary-700">
                    <button onClick={() => console.log("Booking guide")}>
                      Making your first booking
                    </button>
                  </li>
                </ul>
              </div>

              <div className="border-b border-neutral-200 pb-6">
                <h3 className="text-lg font-medium text-neutral-800 mb-3">
                  Hosting
                </h3>
                <ul className="space-y-3">
                  <li className="text-primary-600 hover:text-primary-700">
                    <button onClick={() => console.log("Become host guide")}>
                      How to become a host
                    </button>
                  </li>
                  <li className="text-primary-600 hover:text-primary-700">
                    <button onClick={() => console.log("Listing guide")}>
                      Creating an attractive listing
                    </button>
                  </li>
                  <li className="text-primary-600 hover:text-primary-700">
                    <button onClick={() => console.log("Pricing guide")}>
                      Setting the right price
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-neutral-800 mb-3">
                  Payments & Security
                </h3>
                <ul className="space-y-3">
                  <li className="text-primary-600 hover:text-primary-700">
                    <button onClick={() => console.log("Payment guide")}>
                      Payment methods and processes
                    </button>
                  </li>
                  <li className="text-primary-600 hover:text-primary-700">
                    <button onClick={() => console.log("Security guide")}>
                      Keeping your account secure
                    </button>
                  </li>
                  <li className="text-primary-600 hover:text-primary-700">
                    <button onClick={() => console.log("Issues guide")}>
                      Resolving payment issues
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setActiveTab("main")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Back to Help Center
              </button>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Contact Support
            </h2>
            <p className="text-neutral-600 mb-6">
              Our support team is here to help you with any issues or questions.
            </p>

            <div className="max-w-xl mx-auto mb-8">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment Problem</option>
                    <option value="account">Account Settings</option>
                    <option value="host">Hosting Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe your issue or question"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setActiveTab("main")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Back to Help Center
              </button>
            </div>
          </div>
        );

      case "forum":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Community Forum
            </h2>
            <p className="text-neutral-600 mb-6">
              Connect with other users, share experiences, and get advice from
              the community.
            </p>

            <div className="text-center py-12">
              <svg
                className="h-16 w-16 text-neutral-400 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Coming Soon!
              </h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Our community forum is currently in development. Check back soon
                to join discussions with other Smart Rent users!
              </p>
              <button
                onClick={() => setActiveTab("main")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Back to Help Center
              </button>
            </div>
          </div>
        );

      default:
        return (
          <>
            {/* Hero section */}
            <div className="bg-primary-700 text-white rounded-lg py-12 px-8 mb-8">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl font-bold mb-4">
                  How can we help you?
                </h1>
                <p className="text-lg mb-6 text-primary-100">
                  Find answers to your questions or contact our support team
                </p>

                <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for answers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-5 py-4 rounded-full text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 border-none"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 px-5 flex items-center text-neutral-500"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 text-center">
                <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-6 w-6 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-medium text-neutral-900 mb-2">
                  Help Guides
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Detailed guides on how to use Smart Rent features
                </p>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setActiveTab("guides")}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View guides
                  </button>
                  <Link
                    to="/safety"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Safety Information
                  </Link>
                  <Link
                    to="/cancellation"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Cancellation Policies
                  </Link>
                  <Link
                    to="/report-concern"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Report a Concern
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 text-center">
                <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-6 w-6 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-medium text-neutral-900 mb-2">
                  Contact Support
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Get in touch with our customer support team
                </p>
                <button
                  onClick={() => setActiveTab("contact")}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Contact us
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 text-center">
                <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-6 w-6 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-medium text-neutral-900 mb-2">
                  Community Forum
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Connect with other users and share your experiences
                </p>
                <button
                  onClick={() => setActiveTab("forum")}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Join discussion
                </button>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden mb-12">
              <h2 className="text-xl font-semibold text-neutral-900 p-6 border-b border-neutral-200">
                Frequently Asked Questions
              </h2>

              <div className="md:flex">
                {/* Categories */}
                <div className="md:w-1/4 bg-neutral-50 p-4 border-r border-neutral-200">
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeCategory === category.id
                            ? "bg-primary-50 text-primary-700"
                            : "text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* FAQs list */}
                <div className="md:w-3/4 p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">
                    {categories.find((c) => c.id === activeCategory)?.name} FAQs
                  </h3>

                  <div className="space-y-4">
                    {faqs[activeCategory]?.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-neutral-200 rounded-md overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                        >
                          <span className="text-sm font-medium text-neutral-900">
                            {faq.question}
                          </span>
                          <svg
                            className={`h-5 w-5 text-neutral-500 transform ${
                              expandedFaqs[faq.id] ? "rotate-180" : ""
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
                            <p className="text-sm text-neutral-600">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-neutral-600 mb-4">
                      Can't find what you're looking for?
                    </p>
                    <button
                      onClick={() => setActiveTab("contact")}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Contact our support team
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 rounded-full bg-primary-100 p-2">
                    <svg
                      className="h-6 w-6 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-neutral-900">
                    Email Support
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  Our email support team is available 24/7 to assist you with
                  any questions or issues.
                </p>
                <a
                  href="mailto:support@smartrent.com"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  support@smartrent.com
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 rounded-full bg-primary-100 p-2">
                    <svg
                      className="h-6 w-6 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-neutral-900">
                    Phone Support
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  Call our customer service team for immediate assistance during
                  business hours.
                </p>
                <a
                  href="tel:+18007726238"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  +1 (800) SMART-RENT
                </a>
                <p className="text-xs text-neutral-500 mt-2">
                  Available Monday-Friday, 9am-6pm EST
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 rounded-full bg-primary-100 p-2">
                    <svg
                      className="h-6 w-6 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-neutral-900">
                    Live Chat
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  Chat with our support team in real-time for quick assistance
                  with your questions.
                </p>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Start a chat session
                </button>
                <p className="text-xs text-neutral-500 mt-2">Available 24/7</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">{renderTabContent()}</div>
    </div>
  );
};

export default Help;
