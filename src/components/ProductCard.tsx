import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, title, price, image, category }: ProductCardProps) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-white">
        <Link href={`/products/${id}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image 
              src={image} 
              alt={title}
              fill
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute top-0 right-0 m-2">
          <span className="inline-flex items-center rounded-full bg-sunbeam-yellow px-2 py-1 text-xs font-medium text-deep-charcoal">
            {category}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="font-body text-sm text-deep-charcoal">
            <Link href={`/products/${id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p className="mt-1 font-body text-sm text-gray-500">{category}</p>
        </div>
        <p className="font-body text-sm font-medium text-royal-leaf-green">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard; 