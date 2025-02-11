import { Link } from '@inertiajs/react';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiOutlineChartBar, HiOutlineClock, HiOutlineChat, HiOutlineGlobe } from 'react-icons/hi';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">POSTIFY</div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact</a>
            </div>
            <div>
              <Link href={route('login')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage All Your Social Media<br />
            <span className="text-indigo-600">In One Place</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your social media management with our powerful platform.<br />
            Save time, increase engagement, and grow your presence.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700">
              Start Free Trial
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50">
              Learn More
            </button>
          </div>
          <div className="flex justify-center space-x-6 mt-12">
            <FaFacebook className="w-8 h-8 text-blue-600" />
            <FaTwitter className="w-8 h-8 text-blue-400" />
            <FaInstagram className="w-8 h-8 text-pink-600" />
            <FaLinkedin className="w-8 h-8 text-blue-700" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <HiOutlineChartBar className="w-8 h-8 text-indigo-600" />,
                title: "Analytics Dashboard",
                description: "Track performance across all platforms with detailed insights."
              },
              {
                icon: <HiOutlineClock className="w-8 h-8 text-indigo-600" />,
                title: "Schedule Posts",
                description: "Plan and schedule your content across multiple platforms."
              },
              {
                icon: <HiOutlineChat className="w-8 h-8 text-indigo-600" />,
                title: "Engagement Tools",
                description: "Manage comments and messages from one central inbox."
              },
              {
                icon: <HiOutlineGlobe className="w-8 h-8 text-indigo-600" />,
                title: "Multi-Platform Support",
                description: "Connect and manage all your social media accounts."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Social Media Management?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied users who have streamlined their social media workflow</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">POSTIFY</h3>
              <p className="text-gray-400">Your all-in-one social media management solution</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <FaTwitter className="w-6 h-6" />
                <FaFacebook className="w-6 h-6" />
                <FaInstagram className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 POSTIFY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
