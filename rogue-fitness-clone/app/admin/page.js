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

// Cấu trúc mới cho productImages - Thay thế phần cũ
const productImages = {
  dumbbells: [
    { value: '/images/products/dumbbells/product1.jpg', label: 'Tạ Tay 1' },
    { value: '/images/products/dumbbells/product2.jpg', label: 'Tạ Tay 2' },
    { value: '/images/products/dumbbells/product3.jpg', label: 'Tạ Tay 3' }
  ],
  barbells: [
    { value: '/images/products/barbells/product1.jpg', label: 'Thanh Tạ 1' },
    { value: '/images/products/barbells/product2.jpg', label: 'Thanh Tạ 2' }
  ],
  rack: [
    { value: '/images/products/rack/product1.jpg', label: 'Rack 1' },
    { value: '/images/products/rack/product2.jpg', label: 'Rack 2' }
  ],
  accessories: [
    { value: '/images/products/accessories/product1.jpg', label: 'Phụ Kiện 1' },
    { value: '/images/products/accessories/product2.jpg', label: 'Phụ Kiện 2' }
  ],
  clothing: [
    { value: '/images/products/clothing/product1.jpg', label: 'Trang Phục 1' },
    { value: '/images/products/clothing/product2.jpg', label: 'Trang Phục 2' }
  ],
  shoes: [
    { value: '/images/products/shoes/product1.jpg', label: 'Giày 1' },
    { value: '/images/products/shoes/product2.jpg', label: 'Giày 2' }
  ],
  supplements: [
    { value: '/images/products/supplements/product1.jpg', label: 'Thực Phẩm 1' },
    { value: '/images/products/supplements/product2.jpg', label: 'Thực Phẩm 2' }
  ],
  'local-food': [
    { value: '/images/products/local-food/product1.jpg', label: 'Đặc Sản 1' },
    { value: '/images/products/local-food/product2.jpg', label: 'Đặc Sản 2' }
  ],
  'aura-supply': [
    { value: '/images/products/aura-supply/product1.jpg', label: 'Aura Supply 1' },
    { value: '/images/products/aura-supply/product2.jpg', label: 'Aura Supply 2' }
  ]
};

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
  const [selectedImageCategory, setSelectedImageCategory] = useState('');

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
                <label className="text-lg font-semibold text-white">Danh mục hình ảnh</label>
                <select
                  value={selectedImageCategory}
                  onChange={(e) => setSelectedImageCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md 
                  focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent 
                  focus:border-[#FFD700] transition-all duration-300"
                >
                  <option value="">Chọn danh mục hình ảnh</option>
                  {Object.keys(productImages).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select hình ảnh cụ thể - chỉ hiện khi đã chọn danh mục */}
              {selectedImageCategory && (
                <div className="space-y-2 mt-4">
                  <label className="text-lg font-semibold text-white">Hình ảnh sản phẩm</label>
                  <select
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-3 bg-white text-gray-800 rounded-md 
                    focus:ring-2 focus:ring-[#FFD700] border-2 border-transparent 
                    focus:border-[#FFD700] transition-all duration-300"
                  >
                    <option value="">Chọn hình ảnh</option>
                    {productImages[selectedImageCategory].map((img) => (
                      <option key={img.value} value={img.value}>
                        {img.label}
                      </option>
                    ))}
                  </select>

                  {/* Preview hình ảnh */}
                  {formData.image && (
                    <div className="mt-2">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-md border-2 border-[#FFD700]"
                      />
                    </div>
                  )}
                </div>
              )}

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
