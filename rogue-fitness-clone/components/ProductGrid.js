'use client'
import { useState, useEffect } from 'react'

export default function ProductGrid() {
  const categories = [
    "All Products",
    "Strength Equipment",
    "Conditioning",
    "Accessories",
    "Deals"
  ];

  const [products, setProducts] = useState([
    {
      name: "Premium Kettlebell",
      price: 79.99,
      category: "Equipment",
      rating: 4.5,
      reviews: 128,
      image: "https://cdn.shopify.com/s/files/1/0574/1215/7598/t/16/assets/acf.Barbell---Colorado-20KG---gym-Lifestyle575.jpg?v=1685979186",
      badge: "New"
    },
    {
      name: "Olympic Barbell",
      price: 299.99,
      category: "Barbells",
      rating: 5,
      reviews: 89,
      image: "https://media.self.com/photos/5981e79b1341fc7fbbb1ad53/4:3/w_2560%2Cc_limit/kettle-bells.jpg"
    } usa thu
    // Thêm các sản phẩm mẫu khác nếu cần
  ])
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        if (data.length > 0) {
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="py-16 bg-[#E0E0E0] mt-[18vh] mx-auto max-w-[75%]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#2E2E2E]">Featured Products</h2>
          <p className="text-[#808080] max-w-2xl mx-auto">
            Discover our premium selection of fitness equipment designed for performance and durability
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border border-[#808080] text-[#2E2E2E] 
                hover:bg-[#2E2E2E] hover:text-white hover:border-[#2E2E2E] 
                transition-all duration-300"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden">
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#D32F2F] text-white px-3 py-1 text-sm rounded-full z-10">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-[#2E2E2E] bg-opacity-40 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-[#2E2E2E] px-6 py-2 rounded-sm transform -translate-y-4 
                    group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#FFC107] 
                    hover:text-white">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-[#808080]">{product.category}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#2E2E2E] hover:text-[#D32F2F] 
                  transition-colors duration-200">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-[#FFC107]"> {/* Màu vàng ánh kim cho rating */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-[#E0E0E0]'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-[#808080] ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#2E2E2E]">${product.price}</span>
                  <button className="bg-[#D32F2F] text-white px-4 py-2 rounded-sm 
                    hover:bg-[#2E2E2E] transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-[#2E2E2E] text-[#2E2E2E] 
            px-8 py-3 rounded-sm hover:bg-[#2E2E2E] hover:text-white 
            transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
} 