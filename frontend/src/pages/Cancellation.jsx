import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cancellation = () => {
  const [activeTab, setActiveTab] = useState('guest');

  // Policy Types
  const policyTypes = [
    {
      id: 'flexible',
      name: 'Flexible',
      color: 'green',
      description: 'Full refund if cancelled at least 24 hours before check-in',
      icon: 'leaf'
    },
    {
      id: 'moderate',
      name: 'Moderate',
      color: 'blue',
      description: 'Full refund if cancelled at least 5 days before check-in',
      icon: 'balance-scale'
    },
    {
      id: 'strict',
      name: 'Strict',
      color: 'orange',
      description: 'Full refund if cancelled at least 14 days before check-in',
      icon: 'shield-alt'
    },
    {
      id: 'nonrefundable',
      name: 'Non-Refundable',
      color: 'red',
      description: 'Special discounted rate with no refunds for cancellations',
      icon: 'lock'
    }
  ];

  // Common FAQs
  const faqs = [
    {
      question: 'How do I cancel my reservation?',
      answer: 'You can cancel a reservation from your Trips page. Simply navigate to the booking you wish to cancel, click on "Cancel reservation" and follow the prompts. The refund amount will be calculated based on the property\'s cancellation policy and how close to the check-in date you\'re cancelling.'
    },
    {
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed immediately after a cancellation is confirmed, but the time it takes for the money to appear in your account depends on your payment method and financial institution. Credit card refunds typically take 5-7 business days, while bank transfers may take 7-10 business days.'
    },
    {
      question: 'Can I get a full refund if I need to cancel due to an emergency?',
      answer: 'Standard cancellation policies apply in most circumstances, but we understand that emergencies happen. For unforeseen circumstances like serious illness, natural disasters, or transportation disruptions, you may be eligible for an exception under our Extenuating Circumstances Policy. Supporting documentation is typically required.'
    },
    {
      question: 'What if the host cancels my reservation?',
      answer: 'If a host cancels your reservation, you\'ll automatically receive a full refund regardless of the property\'s cancellation policy. You\'ll also be provided with rebooking assistance to find alternative accommodation for your trip.'
    },
    {
      question: 'Can I change the dates of my reservation instead of cancelling?',
      answer: 'Yes, instead of cancelling, you can request to modify your reservation dates if you need to adjust your travel plans. Go to your Trips page, select the booking, and click on "Change reservation." Note that date changes are subject to availability and may result in price changes.'
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cancellation Policies</h1>
            <p className="text-xl text-primary-100">
              Transparent and flexible options to give you peace of mind when booking
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">Understanding Our Policies</h2>
            <p className="text-neutral-600 mb-4">
              At Smart Rent System, we understand that plans can change. Our cancellation policies are designed to provide clarity and flexibility for both guests and hosts.
            </p>
            <p className="text-neutral-600">
              Each property on our platform has one of the cancellation policies outlined below. The specific policy for a property is clearly displayed on the listing page before you make a booking.
            </p>
          </div>

          {/* Guest/Host Toggle Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="flex border-b border-neutral-200">
              <button
                onClick={() => setActiveTab('guest')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'guest'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                For Guests
              </button>
              <button
                onClick={() => setActiveTab('host')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'host'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                For Hosts
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'guest' ? (
                <div>
                  <p className="text-neutral-600 mb-6">
                    When booking a property, check its cancellation policy to understand your refund options if you need to cancel. Here's what each policy means for you as a guest:
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-neutral-600 mb-6">
                    As a host, you can choose the cancellation policy that works best for your property and business needs. Consider the following when selecting a policy:
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Policy Types */}
          <div className="space-y-6 mb-12">
            {policyTypes.map((policy) => (
              <div key={policy.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-100">
                <div className={`bg-${policy.color}-50 p-6 border-b border-${policy.color}-100`}>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full bg-${policy.color}-100 flex items-center justify-center mr-4`}>
                      <i className={`fas fa-${policy.icon} text-${policy.color}-600 text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800">{policy.name}</h3>
                      <p className="text-neutral-600">{policy.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {policy.id === 'flexible' && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">Full refund</div>
                        <div className="text-neutral-600">
                          If cancelled at least 24 hours before check-in (2:00 PM local time)
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">Partial refund</div>
                        <div className="text-neutral-600">
                          If cancelled less than 24 hours before check-in, the first night is non-refundable but 50% of the remaining nights will be refunded
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">No refund</div>
                        <div className="text-neutral-600">
                          If the guest arrives and decides to leave early, the nights not spent are not refunded
                        </div>
                      </div>
                      
                      {activeTab === 'host' && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-neutral-600 italic">
                            <strong>Host tip:</strong> This policy is good for attracting guests who may be hesitant to commit. It works well for last-minute bookings and locations with high competition.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {policy.id === 'moderate' && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">Full refund</div>
                        <div className="text-neutral-600">
                          If cancelled at least 5 days before check-in (2:00 PM local time)
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">Partial refund</div>
                        <div className="text-neutral-600">
                          If cancelled less than 5 days before check-in, the first night is non-refundable but 50% of the remaining nights will be refunded
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">No refund</div>
                        <div className="text-neutral-600">
                          If the guest arrives and decides to leave early, the nights not spent are not refunded
                        </div>
                      </div>
                      
                      {activeTab === 'host' && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-neutral-600 italic">
                            <strong>Host tip:</strong> This balanced policy offers a good compromise between flexibility for guests and security for hosts. It works well for most property types.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {policy.id === 'strict' && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">Full refund</div>
                        <div className="text-neutral-600">
                          If cancelled at least 14 days before check-in (2:00 PM local time)
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">Partial refund</div>
                        <div className="text-neutral-600">
                          If cancelled between 7-14 days before check-in, you'll receive a 50% refund of the total cost
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">No refund</div>
                        <div className="text-neutral-600">
                          If cancelled less than 7 days before check-in, or if the guest fails to check-in, there is no refund
                        </div>
                      </div>
                      
                      {activeTab === 'host' && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-neutral-600 italic">
                            <strong>Host tip:</strong> This policy provides more security for hosts in high-demand areas or during peak seasons when rebooking cancelled dates might be difficult.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {policy.id === 'nonrefundable' && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">Discounted rate</div>
                        <div className="text-neutral-600">
                          Guests receive a 10-15% discount off the standard rate for the property
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">No refund</div>
                        <div className="text-neutral-600">
                          No refund is provided for cancellations, regardless of when they occur
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-[120px] font-medium text-neutral-700">Travel insurance</div>
                        <div className="text-neutral-600">
                          We strongly recommend guests purchase travel insurance when selecting this option
                        </div>
                      </div>
                      
                      {activeTab === 'host' && (
                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-neutral-600 italic">
                            <strong>Host tip:</strong> This option allows you to offer a discounted rate while ensuring payment security. Best for properties that are in high demand or during peak seasons.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Extenuating Circumstances */}
          <div className="bg-indigo-50 rounded-xl shadow-sm p-8 mb-12 border border-indigo-100">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0">
                <i className="fas fa-umbrella text-indigo-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">Extenuating Circumstances Policy</h3>
                <p className="text-neutral-600 mb-4">
                  In rare cases, we may override the property's standard cancellation policy and issue a partial or full refund. These exceptions are made for unforeseen circumstances that:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-neutral-600 mb-4">
                  <li>Occur before or during the stay</li>
                  <li>Make it impossible or unsafe to complete the stay</li>
                  <li>Are unforeseeable at the time of booking</li>
                </ul>
                <p className="text-neutral-600">
                  Examples include natural disasters, government-declared emergencies, serious illness or injury, or transportation disruptions that make it impossible to reach the destination.
                </p>
                <p className="text-neutral-600 mt-4">
                  <strong>Documentation may be required</strong> to support claims for extenuating circumstances.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold mb-3 text-neutral-800">{faq.question}</h3>
                  <p className="text-neutral-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Need More Help */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">Need More Help?</h2>
            <p className="text-neutral-600 mb-6">
              If you have questions about a specific reservation or need assistance with a cancellation, our support team is here to help.
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

export default Cancellation; 