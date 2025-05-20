'use client';

import { useState, useEffect } from 'react';
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
  },
  {
    id: 13,
    title: "Iron Supplement",
    price: 17.45,
    image: "/images/slide1.png",
    category: "Minerals"
  },
  {
    id: 14,
    title: "CoQ10",
    price: 29.50,
    image: "/images/slide2.png",
    category: "Heart Health"
  },
  {
    id: 15,
    title: "Melatonin Gummies",
    price: 15.99,
    image: "/images/slide3.png",
    category: "Sleep Support"
  },
  {
    id: 16,
    title: "Greens Powder",
    price: 42.99,
    image: "/images/slide1.png",
    category: "Superfoods"
  },
];

// Get unique categories from products
const categories = [...new Set(allProducts.map(product => product.category))];

const ProductsPage = () => {
  const [products, setProducts] = useState(allProducts);
  const [sortBy, setSortBy] = useState('featured');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50 });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Apply category filter
    if (categoryFilter !== 'All') {
      filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-z-a':
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // featured - keep original order
        break;
    }
    
    setProducts(filteredProducts);
    setCurrentPage(1); // Reset to first page when filters change
  }, [sortBy, categoryFilter, priceRange]);
  
  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-herbal-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-royal-leaf-green">Our Products</h1>
          <p className="mt-4 max-w-2xl mx-auto font-body text-deep-charcoal">
            Discover our range of premium health supplements designed with nature in mind.
          </p>
        </div>
        
        {/* Filters and Sorting */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block font-body text-sm font-medium text-deep-charcoal mb-2">
                Filter by Category
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md font-body focus:outline-none focus:ring-2 focus:ring-royal-leaf-green"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label className="block font-body text-sm font-medium text-deep-charcoal mb-2">
                Price Range: ${priceRange.min} - ${priceRange.max}
              </label>
              <div className="flex gap-4">
                <div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    className="w-full accent-royal-leaf-green"
                  />
                  <span className="text-xs">Min: ${priceRange.min}</span>
                </div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full accent-royal-leaf-green"
                  />
                  <span className="text-xs">Max: ${priceRange.max}</span>
                </div>
              </div>
            </div>
            
            {/* Sorting */}
            <div>
              <label htmlFor="sort" className="block font-body text-sm font-medium text-deep-charcoal mb-2">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md font-body focus:outline-none focus:ring-2 focus:ring-royal-leaf-green"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div>
          {products.length > 0 ? (
            <>
              <div className="mb-6 font-body">
                <p className="text-deep-charcoal">
                  Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map(product => (
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
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <nav className="inline-flex">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-deep-charcoal hover:text-royal-leaf-green'
                      }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
                          currentPage === index + 1
                            ? 'text-royal-leaf-green font-semibold'
                            : 'text-deep-charcoal hover:text-royal-leaf-green'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-deep-charcoal hover:text-royal-leaf-green'
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="font-heading text-xl text-deep-charcoal mb-2">No products found</h3>
              <p className="font-body text-gray-500">Try adjusting your filters to find what you&apos;re looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 