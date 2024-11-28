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
    id: '',
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

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      badge: product.badge || ''
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const url = `/api/products/${id}`
      console.log('Delete URL:', url)

      try {
        const res = await fetch(url, {
          method: 'DELETE',
        })

        console.log('Response status:', res.status)
        console.log('Response ok:', res.ok)

        if (!res.ok) {
          const errorData = await res.json()
          console.error('Error response:', errorData)
          throw new Error('Failed to delete product')
        }

        await fetchProducts()
        alert('Xóa sản phẩm thành công!')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Có lỗi xảy ra khi xóa sản phẩm!')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = formData.id ? 'PUT' : 'POST'
    const url = formData.id ? `/api/products/${formData.id}` : '/api/products'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      setFormData({
        id: '',
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
    <div className="min-h-screen bg-[#6E6E6E]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-wide">
          Quản Lý Sản Phẩm
        </h1>
        
        {/* Form Container - Updated styling */}
        <div className="bg-[#4A4A4A] rounded-lg shadow-xl p-8 mb-8 border border-[#A9A9A9]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-6 tracking-wide">
            {formData.id ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-lg font-semibold text-white">Tên sản phẩm</label>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent focus:border-[#FFD700] transition-all duration-300 placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-lg font-semibold text-white">Giá</label>
                <input
                  type="number"
                  placeholder="Nhập giá"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent focus:border-[#FFD700] transition-all duration-300 placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-lg font-semibold text-white">Danh mục</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent focus:border-[#FFD700] transition-all duration-300"
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
                <label className="text-lg font-semibold text-white">URL Hình ảnh</label>
                <input
                  type="text"
                  placeholder="Nhập URL hình ảnh"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent focus:border-[#FFD700] transition-all duration-300 placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-lg font-semibold text-white">Badge</label>
                <select
                  value={formData.badge}
                  onChange={(e) => setFormData({...formData, badge: e.target.value})}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent focus:border-[#FFD700] transition-all duration-300"
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
              className="mt-8 w-full md:w-auto px-8 py-4 bg-[#FFD700] hover:bg-[#B29700] text-[#4A4A4A] text-lg font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              {formData.id ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm'}
            </button>
          </form>
        </div>

        {/* Products Grid - Updated styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-[#4A4A4A] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[#A9A9A9] transform hover:-translate-y-1">
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
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{product.name}</h3>
                <p className="text-3xl font-bold text-[#FFD700] mb-3 tracking-tight">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </p>
                <p className="text-base font-medium text-white bg-[#6E6E6E] inline-block px-4 py-2 rounded-full shadow-md">
                  {product.category}
                </p>
                <div className="mt-4 flex space-x-4">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-[#20B2AA] hover:bg-[#1A8F8A] text-white rounded-md transition-all duration-300 hover:shadow-lg flex-1"
                  >
                    Chỉnh sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 bg-[#8B0000] hover:bg-[#660000] text-white rounded-md transition-all duration-300 hover:shadow-lg flex-1"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
