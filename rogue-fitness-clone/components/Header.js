'use client'
import { useState } from 'react'

export default function Header() {
  const [isShopOpen, setIsShopOpen] = useState(false)

  const menuItems = {
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
  }

  return (
    <header className="bg-[#4A4A4A]">
      {/* Top Promo Bar - Chỉ hiển thị 1 lần */}
      <div className="bg-[#8B0000] text-white py-2">
        <div className="w-[95%] max-w-[2160px] mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <span>FREESHIP CODE: AURA2024</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#FFD700]">Theo dõi đơn hàng</a>
              <a href="#" className="hover:text-[#FFD700]">Trợ giúp</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Logo, Search, Actions */}
      <div className="border-b border-[#6E6E6E]">
        <div className="w-[95%] max-w-[2160px] mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="text-[#FFD700] text-6xl font-bold">AURA</a>

            <div className="hidden md:block w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md 
                  focus:ring-2 focus:ring-[#FFD700] text-base placeholder-gray-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-white hover:text-[#FFD700]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#FFD700] relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-[#8B0000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-[#4A4A4A] relative">
        <div className="h-1 bg-[#A9A9A9]"></div>
        
        <div className="w-[95%] max-w-[2160px] mx-auto px-4">
          <ul className="flex justify-between items-center h-14">
            {/* SHOP Button with Dropdown */}
            <li className="relative">
              <button 
                className="bg-[#CC0000] text-white px-6 py-2 text-sm font-bold uppercase
                  hover:bg-[#990000] transition-colors duration-200 flex items-center space-x-2"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <span>SHOP</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                  strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isShopOpen && (
                <div 
                  className="absolute left-0 top-full w-64 bg-[#2A2A2A] shadow-xl z-50"
                  onMouseEnter={() => setIsShopOpen(true)}
                  onMouseLeave={() => setIsShopOpen(false)}
                >
                  {Object.entries(menuItems).map(([category, subItems]) => (
                    <div key={category} className="group relative">
                      <a 
                        href="#" 
                        className="block px-4 py-3 text-gray-200 hover:bg-[#3A3A3A] hover:text-[#FFD700]
                          text-sm font-medium border-b border-gray-700 flex justify-between items-center
                          transition-all duration-200"
                      >
                        {category}
                        {subItems.length > 0 && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                            strokeWidth={2} stroke="currentColor" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        )}
                      </a>

                      {/* Sub-menu */}
                      {subItems.length > 0 && (
                        <div className="absolute left-full top-0 w-48 bg-[#2A2A2A] shadow-xl 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                          transition-all duration-200">
                          {subItems.map((item) => (
                            <a 
                              key={item}
                              href="#" 
                              className="block px-4 py-3 text-gray-200 hover:bg-[#3A3A3A] 
                                hover:text-[#FFD700] text-sm font-medium border-b border-gray-700
                                transition-all duration-200 hover:pl-6"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>

            {/* Main Navigation Items */}
            {[
              'BARS & PLATES',
              'THIẾT BỊ TẬP LUYỆN',
              'TĂNG CƯỜNG THỂ LỰC',
              'PHỤ KIỆN',
              'COMBO THIẾT BỊ',
              'TRANG PHỤC',
              'GIÀY',
              'HOÀN THIỆN DỰ ÁN'
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-white hover:text-[#FFD700] text-sm font-bold uppercase px-4 py-3 
                  hover:bg-[#6E6E6E] transition-colors duration-200 rounded-md whitespace-nowrap"
                >
                  <span>{item}</span>
                </a>
              </li>
            ))}

            {/* DEALS Button - Right Side */}
            <li>
              <button className="bg-[#CC0000] text-white px-6 py-2 text-sm font-bold uppercase
                hover:bg-[#990000] transition-colors duration-200 animate-pulse">
                DEALS
              </button>
            </li>
          </ul>
        </div>

        <div className="h-1 bg-[#4A4A4A]"></div>
      </nav>
    </header>
  )
} 