'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// Define product type
interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  benefits?: string[];
  ingredients: string;
  directions: string;
}

// Mock product data - in a real app, fetch from API
const allProducts: ProductType[] = [
  {
    id: 1,
    title: "Organic Multivitamin",
    price: 29.99,
    image: "/images/slide1.png",
    category: "Vitamins",
    description: "A complete multivitamin formula with essential nutrients derived from organic whole food sources for optimal absorption and wellness.",
    benefits: [
      "Supports overall health and vitality",
      "Contains vitamins and minerals from organic sources",
      "Easy to digest and absorb",
      "No artificial colors or preservatives"
    ],
    ingredients: "Organic vegetable blend (spinach, broccoli, carrot), Vitamin C (ascorbic acid), Vitamin D3 (cholecalciferol), Vitamin E (d-alpha tocopherol), B-Complex vitamins (B1, B2, B3, B6, B12), Folate, Calcium, Magnesium, Zinc, Selenium, Organic fruit blend (blueberry, raspberry, strawberry).",
    directions: "Take 2 capsules daily with food, or as directed by your healthcare professional."
  },
  {
    id: 2,
    title: "Omega-3 Fish Oil",
    price: 24.95,
    image: "/images/slide2.png",
    category: "Essential Fatty Acids",
    description: "High-quality fish oil supplement providing essential EPA and DHA fatty acids to support heart, brain, and joint health.",
    benefits: [
      "Supports cardiovascular health",
      "Promotes brain function and cognitive health",
      "Helps maintain healthy joints",
      "Molecularly distilled for purity"
    ],
    ingredients: "Fish oil concentrate, EPA (eicosapentaenoic acid), DHA (docosahexaenoic acid), gelatin capsule, natural lemon flavoring, mixed tocopherols (as preservative).",
    directions: "Take 1 softgel 1-2 times daily with meals, or as directed by your healthcare professional."
  },
  {
    id: 3,
    title: "Probiotic Complex",
    price: 34.99,
    image: "/images/slide3.png",
    category: "Digestive Health",
    description: "Advanced probiotic formula with multiple beneficial bacterial strains to support digestive health and immune function.",
    benefits: [
      "Supports digestive balance and gut health",
      "Helps maintain a healthy immune system",
      "Shelf-stable formula, no refrigeration required",
      "15 billion CFU per serving"
    ],
    ingredients: "Proprietary probiotic blend (Lactobacillus acidophilus, Bifidobacterium lactis, Lactobacillus plantarum, Lactobacillus paracasei), microcrystalline cellulose, vegetable capsule.",
    directions: "Take 1 capsule daily, preferably with a meal, or as directed by your healthcare professional."
  }
];

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (params.id) {
      // In a real app, you would fetch from API
      const productId = Number(params.id);
      const foundProduct = allProducts.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products (same category, excluding current)
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        // Product not found - redirect to products page
        router.push('/products');
      }
    }
    setLoading(false);
  }, [params.id, router]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
      
      // Show added to cart message
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="bg-herbal-cream min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-body text-deep-charcoal">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-herbal-cream min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-2xl text-royal-leaf-green mb-4">Product Not Found</h1>
            <p className="font-body text-deep-charcoal mb-6">We couldn&apos;t find the product you&apos;re looking for.</p>
            <Link 
              href="/products" 
              className="font-body inline-block bg-royal-leaf-green hover:bg-fresh-sage text-white px-5 py-2 rounded-md transition-colors"
            >
              Return to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-herbal-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 font-body text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-deep-charcoal hover:text-royal-leaf-green">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/products" className="text-deep-charcoal hover:text-royal-leaf-green">
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-royal-leaf-green">{product.title}</span>
            </li>
          </ol>
        </nav>

        {/* Product Detail Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gray-50">
              <div className="relative h-96 md:h-full">
                <Image 
                  src={product.image} 
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 p-8">
              <div className="mb-2">
                <span className="inline-block bg-sunbeam-yellow px-2 py-1 text-xs font-medium text-deep-charcoal rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-royal-leaf-green mb-4">{product.title}</h1>
              <p className="font-body text-2xl text-deep-charcoal mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-8">
                <p className="font-body text-deep-charcoal">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <label htmlFor="quantity" className="block font-body text-sm font-medium text-deep-charcoal mr-4">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md font-body focus:outline-none focus:ring-2 focus:ring-royal-leaf-green"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full md:w-auto bg-royal-leaf-green hover:bg-fresh-sage text-white font-bold py-3 px-8 rounded-md transition-colors"
                >
                  Add to Cart
                </button>
                
                {addedToCart && (
                  <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md">
                    Item added to cart! <Link href="/cart" className="underline">View Cart</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 px-8 py-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-royal-leaf-green mb-6">Product Details</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-3 text-deep-charcoal">Benefits</h3>
                  <ul className="list-disc pl-5 font-body text-deep-charcoal space-y-1">
                    {product.benefits?.map((benefit: string, index: number) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-3 text-deep-charcoal">Ingredients</h3>
                  <p className="font-body text-deep-charcoal">{product.ingredients}</p>
                </div>
                
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-3 text-deep-charcoal">Directions</h3>
                  <p className="font-body text-deep-charcoal">{product.directions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-royal-leaf-green mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                  <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-white">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image 
                          src={relatedProduct.image}
                          alt={relatedProduct.title}
                          fill
                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-0 right-0 m-2">
                        <span className="inline-flex items-center rounded-full bg-sunbeam-yellow px-2 py-1 text-xs font-medium text-deep-charcoal">
                          {relatedProduct.category}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <h3 className="font-body text-sm text-deep-charcoal">{relatedProduct.title}</h3>
                      <p className="font-body text-sm font-medium text-royal-leaf-green">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 