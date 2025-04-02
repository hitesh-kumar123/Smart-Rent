import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Blog categories
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'tips', name: 'Travel Tips' },
    { id: 'destinations', name: 'Destinations' },
    { id: 'hosting', name: 'Hosting Tips' },
    { id: 'news', name: 'Company News' },
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: '10 Must-Visit Hidden Gems in Europe',
      excerpt: 'Discover stunning locations off the beaten path that most tourists miss during their European travels.',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      category: 'destinations',
      author: 'Sarah Johnson',
      authorImage: 'https://randomuser.me/api/portraits/women/32.jpg',
      date: 'June 12, 2023',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 2,
      title: 'How to Pack Like a Pro: Essential Tips for Every Traveler',
      excerpt: 'Learn how to maximize space and minimize stress with these expert packing techniques for your next trip.',
      image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      category: 'tips',
      author: 'Michael Chen',
      authorImage: 'https://randomuser.me/api/portraits/men/42.jpg',
      date: 'May 28, 2023',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 3,
      title: 'Boost Your Rental Income: Photography Tips for Hosts',
      excerpt: 'Professional photography tips that can help showcase your property in the best light and attract more bookings.',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      category: 'hosting',
      author: 'Jessica Williams',
      authorImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      date: 'May 15, 2023',
      readTime: '10 min read',
      featured: false
    },
    {
      id: 4,
      title: 'Smart Rent System Launches New Mobile App Features',
      excerpt: 'Our latest app update brings exciting new features designed to make your booking experience even better.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      category: 'news',
      author: 'David Thompson',
      authorImage: 'https://randomuser.me/api/portraits/men/31.jpg',
      date: 'April 30, 2023',
      readTime: '4 min read',
      featured: false
    },
    {
      id: 5,
      title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
      excerpt: 'Simple yet effective ways to make your travels more environmentally friendly without sacrificing experiences.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      category: 'tips',
      author: 'Emma Rodriguez',
      authorImage: 'https://randomuser.me/api/portraits/women/22.jpg',
      date: 'April 18, 2023',
      readTime: '7 min read',
      featured: true
    },
    {
      id: 6,
      title: 'Top Family-Friendly Destinations for Summer 2023',
      excerpt: 'Planning a family vacation? Here are our top picks for destinations that offer something for every family member.',
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      category: 'destinations',
      author: 'James Wilson',
      authorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: 'April 5, 2023',
      readTime: '9 min read',
      featured: false
    },
    {
      id: 7,
      title: 'How to Create a Welcoming Space: Interior Design Tips for Hosts',
      excerpt: 'Transform your rental property into a cozy and inviting space that will earn you five-star reviews.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      category: 'hosting',
      author: 'Sophia Garcia',
      authorImage: 'https://randomuser.me/api/portraits/women/65.jpg',
      date: 'March 22, 2023',
      readTime: '11 min read',
      featured: false
    },
    {
      id: 8,
      title: 'Smart Rent Partners with Local Tourism Boards',
      excerpt: 'Our new partnerships aim to promote sustainable tourism and support local communities around the world.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      category: 'news',
      author: 'Alex Peterson',
      authorImage: 'https://randomuser.me/api/portraits/men/67.jpg',
      date: 'March 10, 2023',
      readTime: '5 min read',
      featured: false
    }
  ];

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Rent Blog</h1>
            <p className="text-xl text-primary-100">
              Travel tips, destination guides, and insights to help you make the most of your trips
            </p>
          </div>
        </div>
      </div>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8 text-neutral-800">Featured Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm transition duration-300 hover:shadow-md">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neutral-800 hover:text-primary-600 transition">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-neutral-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={post.authorImage} 
                        alt={post.author}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-neutral-800">{post.author}</p>
                        <p className="text-xs text-neutral-500">{post.date}</p>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-500">{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter and Blog Posts */}
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="mb-8 border-b border-neutral-200 pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm transition duration-300 hover:shadow-md">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {categories.find(cat => cat.id === post.category)?.name}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 text-neutral-800 hover:text-primary-600 transition">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-neutral-600 mb-4 text-sm">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={post.authorImage} 
                      alt={post.author}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <div>
                      <p className="text-xs font-medium text-neutral-800">{post.author}</p>
                      <p className="text-xs text-neutral-500">{post.date}</p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500">{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <h3 className="text-xl font-medium text-neutral-700 mb-2">No posts found</h3>
            <p className="text-neutral-500">No posts available in this category yet.</p>
            <button 
              onClick={() => setActiveCategory('all')} 
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
            >
              View All Posts
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-primary-50 rounded-xl p-8 md:p-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-neutral-600 mb-6">
              Get the latest travel tips, destination guides, and Smart Rent news delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-neutral-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 