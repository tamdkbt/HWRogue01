'use client'
import { useState, useEffect } from 'react'

// Thêm mảng các badge phổ biến
const commonBadges = [
  "New",
  "Sale",
  "Hot",
  "Best Seller",
  "Out of Stock",
  "Limited"
];

// Thêm mảng các danh mục sản phẩm
const productCategories = [
  "Giá để tạ",
  "Tạ tay",
  "Tạ đòn",
  "Máy tập"
];

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    badge: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      setFormData({
        name: '',
        price: '',
        category: '',
        image: '',
        badge: ''
      })
      fetchProducts()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Quản Lý Sản Phẩm
        </h1>
        
        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Thêm Sản Phẩm Mới</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-base font-semibold text-gray-900">Tên sản phẩm</label>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Giá</label>
                <input
                  type="number"
                  placeholder="Nhập giá"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Danh mục</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Chọn danh mục</option>
                  {productCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">URL Hình ảnh</label>
                <input
                  type="text"
                  placeholder="Nhập URL hình ảnh"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Badge</label>
                <select
                  value={formData.badge}
                  onChange={(e) => setFormData({...formData, badge: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Chọn badge</option>
                  {commonBadges.map((badge) => (
                    <option key={badge} value={badge}>
                      {badge}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              className="mt-8 w-full md:w-auto px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold rounded-md transition duration-200 ease-in-out transform hover:-translate-y-1"
            >
              Thêm Sản Phẩm
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
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
          ))}
        </div>
      </div>
    </div>
  )
}
