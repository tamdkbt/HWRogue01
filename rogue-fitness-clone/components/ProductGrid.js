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
    <section className="py-8 md:py-16 bg-[#A9A9A9]">
      <div className="w-[95%] max-w-[2160px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">SẢN PHẨM NỔI BẬT</h2>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full md:w-auto bg-white text-gray-800 px-4 py-3 rounded-md"
            >
              <option value="all">Tất cả sản phẩm</option>
              <option value="dumbbells">Tạ tay</option>
              <option value="barbells">Thanh tạ</option>
              <option value="racks">Giá đỡ</option>
              <option value="accessories">Phụ kiện</option>
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto bg-white text-gray-800 px-4 py-3 rounded-md"
            >
              <option value="featured">Nổi bật</option>
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
} 