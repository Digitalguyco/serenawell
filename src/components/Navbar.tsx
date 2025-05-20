'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Toggle search overlay
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the search input when opening
      setTimeout(() => {
        const searchInput = document.getElementById('navbar-search');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // If we're not on the homepage, navigate to homepage with hash
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }
    
    // If we're already on the homepage, scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white shadow-sm font-body transition-all duration-300 ${
        scrolled ? 'py-2 shadow-md' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/SVG/logo.svg"
                  alt="SerenaWell Logo"
                  width={150}
                  height={30}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-deep-charcoal hover:text-royal-leaf-green">
                Home
              </Link>
              <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium text-deep-charcoal hover:text-royal-leaf-green">
                Products
              </Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="px-3 py-2 rounded-md text-sm font-medium text-deep-charcoal hover:text-royal-leaf-green"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-3 py-2 rounded-md text-sm font-medium text-deep-charcoal hover:text-royal-leaf-green"
              >
                Contact
              </button>
            </div>

            {/* Search and Cart */}
            <div className="flex items-center">
              <button 
                onClick={toggleSearch}
                className="p-2 rounded-md text-deep-charcoal hover:text-royal-leaf-green"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/cart" className="p-2 ml-2 rounded-md text-deep-charcoal hover:text-royal-leaf-green relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-royal-leaf-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <div className="flex md:hidden ml-2">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-deep-charcoal hover:text-royal-leaf-green"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-deep-charcoal hover:text-royal-leaf-green">
                Home
              </Link>
              <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-deep-charcoal hover:text-royal-leaf-green">
                Products
              </Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-deep-charcoal hover:text-royal-leaf-green"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-deep-charcoal hover:text-royal-leaf-green"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-24">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading text-xl text-deep-charcoal">Search Products</h2>
              <button 
                onClick={toggleSearch}
                className="text-gray-500 hover:text-royal-leaf-green"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  id="navbar-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md font-body focus:outline-none focus:ring-2 focus:ring-royal-leaf-green pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-4 text-royal-leaf-green hover:text-fresh-sage"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-500">
              <p>Try searching for product names or categories like &quot;vitamin&quot;, &quot;protein&quot;, or &quot;immune support&quot;.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 