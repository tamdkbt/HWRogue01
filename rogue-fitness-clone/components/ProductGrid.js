'use client'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="py-16 bg-[#A9A9A9]">
      <div className="w-[95%] max-w-[2160px] mx-auto px-4">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">SẢN PHẨM NỔI BẬT</h2>
          
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-white text-gray-800 px-4 py-3 rounded-md text-base
              focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent"
            >
              <option value="all">Tất cả sản phẩm</option>
              <option value="dumbbells">Tạ tay</option>
              <option value="barbells">Thanh tạ</option>
              <option value="racks">Giá đỡ</option>
              <option value="accessories">Phụ kiện</option>
            </select>

            {/* Sort Control */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white text-gray-800 px-4 py-3 rounded-md text-base
              focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent"
            >
              <option value="featured">Nổi bật</option>
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-[#FFD700] hover:bg-[#B29700] text-[#4A4A4A] px-8 py-3 text-lg font-bold transition-colors duration-200">
            XEM THÊM SẢN PHẨM
          </button>
        </div>
      </div>
    </section>
  )
} 