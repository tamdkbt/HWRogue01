export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-72 object-cover"
        />
        {product.badge && (
          <span className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
        <p className="text-3xl font-bold text-blue-700 mb-3">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </p>
        <p className="text-base font-medium text-gray-700 bg-gray-100 inline-block px-4 py-2 rounded-full">
          {product.category}
        </p>
      </div>
    </div>
  )
} 