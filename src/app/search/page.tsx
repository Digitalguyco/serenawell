'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

// Mock product data - in a real app, fetch from API
const allProducts = [
  {
    id: 1,
    title: "Organic Multivitamin",
    price: 29.99,
    image: "/images/slide1.png",
    category: "Vitamins"
  },
  {
    id: 2,
    title: "Omega-3 Fish Oil",
    price: 24.95,
    image: "/images/slide2.png",
    category: "Essential Fatty Acids"
  },
  {
    id: 3,
    title: "Probiotic Complex",
    price: 34.99,
    image: "/images/slide3.png",
    category: "Digestive Health"
  },
  {
    id: 4,
    title: "Magnesium Citrate",
    price: 19.99,
    image: "/images/slide1.png",
    category: "Minerals"
  },
  {
    id: 5,
    title: "Vitamin D3 + K2",
    price: 22.95,
    image: "/images/slide2.png",
    category: "Vitamins"
  },
  {
    id: 6,
    title: "Ashwagandha Extract",
    price: 27.99,
    image: "/images/slide3.png",
    category: "Adaptogens"
  },
  {
    id: 7,
    title: "Plant Protein Powder",
    price: 39.99,
    image: "/images/slide1.png",
    category: "Protein"
  },
  {
    id: 8,
    title: "Collagen Peptides",
    price: 32.95,
    image: "/images/slide2.png",
    category: "Beauty & Wellness"
  },
  {
    id: 9,
    title: "Turmeric Curcumin",
    price: 23.99,
    image: "/images/slide3.png",
    category: "Antioxidants"
  },
  {
    id: 10,
    title: "Zinc + Vitamin C",
    price: 18.50,
    image: "/images/slide1.png",
    category: "Immune Support"
  },
  {
    id: 11,
    title: "B Complex",
    price: 21.95,
    image: "/images/slide2.png",
    category: "Vitamins"
  },
  {
    id: 12,
    title: "Elderberry Syrup",
    price: 25.99,
    image: "/images/slide3.png",
    category: "Immune Support"
  }
];

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);

  // Perform search when query changes
  useEffect(() => {
    if (query) {
      const results = allProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) || 
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setSearchQuery(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-herbal-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-royal-leaf-green mb-6">Search Results</h1>
          
          {/* Search form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="relative flex items-center">
              <input
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
          
          {query && (
            <p className="font-body text-deep-charcoal">
              {searchResults.length === 0
                ? 'No products found'
                : `Found ${searchResults.length} ${searchResults.length === 1 ? 'product' : 'products'} for "${query}"`
              }
            </p>
          )}
        </div>
        
        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <h3 className="font-heading text-xl text-deep-charcoal mb-2">No products found</h3>
            <p className="font-body text-gray-500 mb-6">Try a different search term or browse our products.</p>
            <Link 
              href="/products" 
              className="font-body inline-block bg-royal-leaf-green hover:bg-fresh-sage text-white px-5 py-2 rounded-md transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Loading fallback component
function SearchLoading() {
  return (
    <div className="bg-herbal-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-royal-leaf-green mb-6">Search Results</h1>
          <p className="font-body text-deep-charcoal">Loading search results...</p>
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResults />
    </Suspense>
  );
} 