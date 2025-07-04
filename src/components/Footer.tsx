'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle newsletter signup here
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-deep-charcoal text-base pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Column 1: About */}
          <div>
            <div className="mb-5">
              <Image
                src="/SVG/logo.svg"
                alt="SerenaWell Logo"
                width={150}
                height={30}
                className="brightness-[1.75] contrast-[1.25]" // Make the logo visible on dark background
              />
            </div>
            <p className="font-body text-sm text-gray-600 mb-6">
              Premium health supplements designed with nature in mind. Quality ingredients for your well-being.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="h-8 w-8 rounded-full bg-royal-leaf-green flex items-center justify-center text-base hover:bg-fresh-sage transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a> */}
              <a href="https://www.instagram.com/serenawellvit?igsh=MWxmMXoydGxkM2xuYw==" className="h-8 w-8 rounded-full bg-royal-leaf-green flex items-center justify-center text-base hover:bg-fresh-sage transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* <a href="#" className="h-8 w-8 rounded-full bg-royal-leaf-green flex items-center justify-center text-base hover:bg-fresh-sage transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a> */}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="font-body space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-300 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-300 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-300 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Categories */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Categories</h3>
            <ul className="font-body space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-300 transition-colors">
                  Vitamins & Minerals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-300 transition-colors">
                  Probiotics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-300 transition-colors">
                  Essential Oils
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-300 transition-colors">
                  Herbal Supplements
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-300 transition-colors">
                  Protein & Fitness
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="font-body text-sm text-gray-600 mb-4">
              Subscribe to our newsletter for exclusive offers and wellness tips.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-2 rounded-md bg-white border border-gray-600 text-base placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-sunbeam-yellow"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-md bg-sunbeam-yellow hover:bg-yellow-300 text-deep-charcoal font-body font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-body text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SerenaWell. All rights reserved.
            </p>
            <div className="flex space-x-6 font-body text-xs text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 