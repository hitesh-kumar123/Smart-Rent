import React from "react";
import { Link } from "react-router-dom";
import useScrollTop from "../hooks/useScrollTop";

const About = () => {
  // Use the scroll top hook
  useScrollTop();

  // Team members data
  const teamMembers = [
    {
      name: "Jane Smith",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "Jane founded Smart Rent System with a vision to transform the way people find and book accommodations around the world.",
    },
    {
      name: "Michael Johnson",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      bio: "Michael leads our technology team, ensuring that our platform is secure, fast, and user-friendly for both hosts and guests.",
    },
    {
      name: "Sarah Chen",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      bio: "Sarah oversees our day-to-day operations, making sure that both hosts and guests have a seamless experience on our platform.",
    },
    {
      name: "James Wilson",
      role: "Customer Experience Lead",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "James is dedicated to ensuring every user receives exceptional support and has a positive experience with Smart Rent System.",
    },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Smart Rent System
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Making property rentals simple, secure, and enjoyable for
              everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Our Story</h2>
            <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
              <p className="text-neutral-700 mb-4">
                Smart Rent System was founded in 2020 with a simple mission: to
                make property rentals accessible, secure, and enjoyable for
                everyone. We noticed that the traditional rental process was
                often complicated, time-consuming, and lacked transparency.
              </p>
              <p className="text-neutral-700 mb-4">
                We set out to build a platform that would connect property
                owners with potential renters in a seamless way, providing tools
                that make the entire process - from listing to booking to
                staying - as smooth as possible.
              </p>
              <p className="text-neutral-700">
                Today, Smart Rent System hosts thousands of properties across
                the globe, helping travelers find their perfect temporary homes
                while enabling property owners to maximize their rental
                potential with minimal hassle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
              <p className="text-neutral-600">
                We believe in creating a safe environment for both hosts and
                guests, with transparent policies and secure transactions.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Community</h3>
              <p className="text-neutral-600">
                We celebrate diversity and work to create connections between
                people from different backgrounds and cultures.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-neutral-600">
                We continuously improve our platform and services to provide the
                best experience possible for all users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-neutral-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking for a place to stay or want to share your
            property with travelers, Smart Rent System is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/listings"
              className="bg-white text-primary-700 hover:bg-neutral-100 px-8 py-3 rounded-full font-semibold transition duration-300"
            >
              Explore Properties
            </Link>
            <Link
              to="/host/become-a-host"
              className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-full font-semibold transition duration-300"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
