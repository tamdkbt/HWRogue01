'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Thêm mảng các badge phổ biến
const commonBadges = [
  "New",
  "Sale",
  "Hot",
  "Best Seller",
  "Out of Stock",
  "Limited"
];

// Cấu trúc danh mục phân cấp
const productCategories = {
  "Bars & Plates": [],
  "Thiết Bị Tập Luyện": [
    "Rack",
    "Máy Tạ Khối",
    "Máy Tạ Dĩa"
  ],
  "Tăng Cường Thể Lực": [],
  "Phụ Kiện": [],
  "Combo Thiết Bị": [],
  "Trang Phục": [],
  "Giày": [],
  "Hoàn Thiện Dự Án": [],
  "Thực Phẩm Hỗ Trợ": [],
  "Đặc Sản Địa Phương": [],
  "Aura Supply": []
};

// Làm phẳng danh mục để sử dụng trong select
const flattenedCategories = Object.entries(productCategories).reduce((acc, [main, subs]) => {
  acc.push(main);
  if (subs.length > 0) {
    subs.forEach(sub => acc.push(`${main} - ${sub}`));
  }
  return acc;
}, []);

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
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
    setShowImageModal(true)
  }

  return (
    <div className="min-h-screen bg-[#6E6E6E]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-wide">
          Quản Lý Sản Phẩm
        </h1>
        
        <div className="bg-[#4A4A4A] rounded-lg shadow-xl p-8 mb-8 border border-[#A9A9A9]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-6 tracking-wide">
            Tìm Kiếm Sản Phẩm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-lg font-semibold text-white">Tên sản phẩm</label>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent focus:border-[#FFD700] transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-lg font-semibold text-white">Lọc theo danh mục</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent focus:border-[#FFD700] transition-all duration-300"
              >
                <option value="">Tất cả danh mục</option>
                {flattenedCategories.map((category) => (
                  <option 
                    key={category} 
                    value={category}
                    className={category.includes('-') ? 'pl-4' : 'font-semibold'}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md 
                  focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent 
                  focus:border-[#FFD700] transition-all duration-300"
                >
                  <option value="">Chọn danh mục</option>
                  {flattenedCategories.map((category) => (
                    <option 
                      key={category} 
                      value={category}
                      className={category.includes('-') ? 'pl-4' : 'font-semibold'}
                    >
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

        <div className="bg-[#4A4A4A] rounded-lg shadow-xl p-8 overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-3 text-left">Hình ảnh</th>
                <th className="px-4 py-3 text-left">Tên sản phẩm</th>
                <th className="px-4 py-3 text-left">Giá</th>
                <th className="px-4 py-3 text-left">Danh mục</th>
                <th className="px-4 py-3 text-left">Badge</th>
                <th className="px-4 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-600 hover:bg-[#5A5A5A]">
                  <td className="px-4 py-3">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                      onClick={() => handleImageClick(product.image)}
                    />
                  </td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3 text-[#FFD700]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-[#6E6E6E] px-2 py-1 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.badge && (
                      <span className="bg-red-600 px-2 py-1 rounded-full text-sm">
                        {product.badge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 bg-[#20B2AA] hover:bg-[#1A8F8A] rounded-md"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 bg-[#8B0000] hover:bg-[#660000] rounded-md"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-4 rounded-lg max-w-3xl max-h-[90vh]">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowImageModal(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={selectedImage}
                alt="Product preview"
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
