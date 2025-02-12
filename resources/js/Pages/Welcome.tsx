import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiOutlineChartBar, HiOutlineClock, HiOutlineChat, HiOutlineGlobe } from 'react-icons/hi';

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Review {
  name: string;
  role: string;
  text: string;
}

export default function Welcome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const features: Feature[] = [
    {
      title: "AI-Powered Analytics",
      description: "Get deep insights into your social media performance",
      image: "https://cdn-icons-png.flaticon.com/512/8665/8665789.png"
    },
    {
      title: "Multi-Platform Management",
      description: "Manage all your social accounts in one place",
      image: "https://cdn-icons-png.flaticon.com/512/9425/9425742.png"
    },
    {
      title: "Dragify Editor",
      description: "Easy drag-and-drop content creation",
      image: "https://cdn-icons-png.flaticon.com/512/1998/1998657.png"
    },
    {
      title: "Translation Tools",
      description: "Reach global audiences with automatic translation",
      image: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png"
    }
  ];

  const reviews: Review[] = [
    { name: "Sarah J.", role: "Marketing Manager", text: "This tool has revolutionized how we manage our social media presence." },
    { name: "Mike R.", role: "Content Creator", text: "The AI analytics have helped me grow my audience significantly." }
  ];

  // Add smooth scroll handler with proper typing
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      const offsetTop = (section as HTMLElement).offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['#about', '#features', '#pricing', '#contact']; // Updated order
      const current = sections.find(section => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Head title="Landing Page" />
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'
                }`}>POSTIFY</span>
            </div>

            {/* Center Nav Links */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                  {[
                    { href: '#about', label: 'About Us' },
                    { href: '#features', label: 'Features' },
                    { href: '#pricing', label: 'Pricing' },
                    { href: '#contact', label: 'Contact Us' }
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`transition-all duration-300 relative py-2 hover:text-blue-500 ${isScrolled
                        ? 'text-gray-600'
                        : 'text-white'
                        }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-300 bg-blue-500
                          ${activeSection === link.href ? 'scale-x-100' : 'scale-x-0'}`}
                      />
                    </a>
                  ))}
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/login">
                <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isScrolled
                  ? 'text-blue-600 hover:text-blue-700'
                  : 'text-white hover:text-blue-200'
                  }`}>
                  Login
                </button>
              </a>
              <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isScrolled
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}>
                Download
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div>
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://img.freepik.com/free-photo/social-media-marketing-concept-marketing-with-applications_23-2150063136.jpg"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-32 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              AI-Powered Social Media <br /> Management
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100">
              Manage all your social media accounts in one place with the power of AI
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition duration-300">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">About Us</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We're a team of passionate developers and social media experts who believe in making social media management accessible and efficient for everyone. Our AI-powered platform is designed to help businesses and individuals succeed in their social media journey.
              </p>
            </div>
            <div>
              <img
                src="https://img.freepik.com/free-vector/social-tree-concept-illustration_114360-4898.jpg"
                alt="About Us"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <img src={feature.image} alt={feature.title} className="w-16 h-16 mb-6 mx-auto" />
                <h3 className="text-xl font-bold mb-3 text-blue-600 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {reviews.map((review, index) => (
              <div key={index} className="p-8 bg-blue-50 rounded-2xl relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl">
                  "
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">"{review.text}"</p>
                <div className="flex items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${review.name}&background=random`}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-blue-600">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Simple Pricing</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-600">
              <div className="text-center">
                <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
                <h3 className="text-3xl font-bold mt-6 mb-4">Professional Plan</h3>
                <div className="flex justify-center items-baseline mb-8">
                  <span className="text-6xl font-bold text-blue-600">$5</span>
                  <span className="text-xl text-gray-500">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> All Features Included</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited Social Accounts</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> AI-Powered Analytics</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 24/7 Support</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4">SocialAI</h3>
              <p className="text-blue-100">Making social media management smarter</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-blue-100 hover:text-white">About Us</a>
                <a href="#features" className="block text-blue-100 hover:text-white">Features</a>
                <a href="#pricing" className="block text-blue-100 hover:text-white">Pricing</a>
                <a href="#contact" className="block text-blue-100 hover:text-white">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="block text-blue-100 hover:text-white">Twitter</a>
                <a href="#" className="block text-blue-100 hover:text-white">LinkedIn</a>
                <a href="#" className="block text-blue-100 hover:text-white">Facebook</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-500 text-center">
            <p>© 2024 SocialAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

}
