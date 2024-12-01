import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="bg-[#6E6E6E] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative aspect-w-4 aspect-h-3">
        <Image
          src={product.image}
          alt={product.name}
          width={1000}
          height={739}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={75}
          priority={false}
        />
        {product.badge && (
          <span className="absolute top-4 right-4 bg-[#8B0000] text-white px-4 py-2 rounded-full text-sm font-bold">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 tracking-tight text-white">{product.name}</h3>
        <p className="text-3xl font-bold mb-3 tracking-tight text-[#FFD700]">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </p>
        <p className="text-sm font-medium text-white bg-[#4A4A4A] inline-block px-4 py-2 rounded-full">
          {product.category}
        </p>
      </div>
    </div>
  );
} 