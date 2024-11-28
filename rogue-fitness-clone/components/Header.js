'use client'
import { useState } from 'react'

export default function Header() {
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
      <nav className="bg-[#4A4A4A]">
        {/* Thêm background màu xám nhạt phía trên */}
        <div className="h-1 bg-[#A9A9A9]"></div>
        
        <div className="w-[95%] max-w-[2160px] mx-auto px-4">
          <ul className="flex justify-between items-center h-14">
            {[
              'Bars & Plates',
              'Thiết Bị Tập Luyện',
              'Tăng Cường Thể Lực',
              'Phụ Kiện',
              'Combo Thiết Bị',
              'Trang Phục',
              'Giày',
              'Hoàn Thiện Dự Án'
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-white hover:text-[#FFD700] text-sm font-medium px-4 py-3 
                  hover:bg-[#6E6E6E] transition-colors duration-200 rounded-md whitespace-nowrap"
                >
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Thêm background màu xám nhạt phía dưới */}
        <div className="h-1 bg-[#4A4A4A]"></div>
      </nav>
    </header>
  )
} 