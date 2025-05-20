import Link from 'next/link';
import ProductCard from './ProductCard';

// Mock product data - in a real application, this would come from an API or database
const products = [
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
  }
];

const FeaturedProducts = () => {
  return (
    <section className="bg-herbal-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading text-3xl font-bold text-royal-leaf-green">Most Recommended Products</h2>
          <Link 
            href="/products" 
            className="font-body bg-royal-leaf-green hover:bg-fresh-sage text-base px-5 py-2 rounded-md transition-colors"
          >
            View all products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
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
      </div>
    </section>
  );
};

export default FeaturedProducts; 