'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [email, setEmail] = useState('');

  // Handle email newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <div className="bg-herbal-cream min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-heading text-3xl font-bold text-deep-charcoal">Your cart</h1>
          <Link href="/products" className="font-body text-deep-charcoal hover:text-royal-leaf-green underline">
            Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="font-body text-deep-charcoal mb-4">Your cart is currently empty.</p>
            <Link 
              href="/products" 
              className="font-body inline-block bg-royal-leaf-green hover:bg-fresh-sage text-white px-5 py-2 rounded-md transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Product Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 mb-2 border-b border-gray-200 pb-3">
              <div className="md:col-span-6 font-body uppercase text-sm font-medium text-gray-500">
                Product
              </div>
              <div className="md:col-span-3 font-body uppercase text-sm font-medium text-gray-500 text-center">
                Quantity
              </div>
              <div className="md:col-span-3 font-body uppercase text-sm font-medium text-gray-500 text-right">
                Total
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-6 mb-8">
              {cartItems.map(item => (
                <div key={item.id} className="border-b border-gray-200 pb-6">
                  <div className="grid md:grid-cols-12 gap-4 items-center">
                    {/* Product */}
                    <div className="md:col-span-6">
                      <div className="flex items-center">
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                          <Image 
                            src={item.image} 
                            alt={item.title}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-body text-base text-deep-charcoal font-medium">
                            <Link href={`/products/${item.id}`} className="hover:text-royal-leaf-green">
                              {item.title}
                            </Link>
                          </h3>
                          <p className="mt-1 font-body text-sm text-gray-500">${item.price.toFixed(2)}</p>
                          {item.color && <p className="mt-1 font-body text-sm text-gray-500">Color: {item.color}</p>}
                          {item.size && <p className="mt-1 font-body text-sm text-gray-500">Size: {item.size}</p>}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 md:hidden text-sm text-gray-500 hover:text-royal-leaf-green flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-3">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1 text-gray-600 hover:text-royal-leaf-green"
                          >
                            −
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val) && val > 0) {
                                updateQuantity(item.id, val);
                              }
                            }}
                            className="w-12 text-center border-x border-gray-300 py-1 font-body focus:outline-none"
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:text-royal-leaf-green"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-3 flex items-center justify-between">
                      <p className="font-body font-medium text-deep-charcoal md:text-right md:w-full">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="hidden md:block text-gray-500 hover:text-royal-leaf-green"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Totals */}
            <div className="border-t border-gray-200 py-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-body text-gray-600">Subtotal</p>
                <p className="font-body font-medium text-deep-charcoal">${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="font-body text-gray-600">Taxes and shipping calculated at checkout</p>
              </div>
              <div className="flex justify-end">
                <button 
                  className="font-body w-full md:w-auto bg-royal-leaf-green hover:bg-fresh-sage text-white font-medium py-3 px-8 rounded-md transition-colors"
                >
                  Check out
                </button>
              </div>
            </div>
          </>
        )}
        
        {/* Newsletter Signup */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold text-deep-charcoal mb-3">BE THE FIRST!</h2>
            <p className="font-body text-gray-600 mb-6">
              Sign up for our newsletter to receive updates on new products, promotions, and health tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-l-md font-body focus:outline-none focus:ring-2 focus:ring-royal-leaf-green"
              />
              <button 
                type="submit"
                className="bg-deep-charcoal hover:bg-gray-800 text-white font-body px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="mt-8 text-center">
          <a href="#" className="inline-block p-2 mx-1 text-deep-charcoal hover:text-royal-leaf-green">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="inline-block p-2 mx-1 text-deep-charcoal hover:text-royal-leaf-green">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
          </a>
          <a href="#" className="inline-block p-2 mx-1 text-deep-charcoal hover:text-royal-leaf-green">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 