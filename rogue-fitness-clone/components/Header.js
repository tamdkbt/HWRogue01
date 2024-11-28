'use client'
import { useState } from 'react'

export default function Header() {
  return (
    <header className="fixed w-full z-50">
      {/* Top Promo Bar */}
      <div className="bg-[#8B0000] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <span>FREESHIP CODE: AURA2024</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#FFD700]">Theo dõi đơn hàng</a>
              <a href="#" className="hover:text-[#FFD700]">Trợ giúp</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-[#4A4A4A] border-b border-[#6E6E6E]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="/" className="text-[#FFD700] text-4xl font-bold">AURA</a>

            {/* Search Bar */}
            <div className="hidden md:block w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 bg-[#6E6E6E] text-white rounded-sm focus:ring-2 focus:ring-[#FFD700]"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Actions */}
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
      <nav className="bg-[#4A4A4A] shadow-lg">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center h-12">
            {[
              'Trang Chủ',
              'Sản Phẩm Mới',
              'Tạ Tay',
              'Thanh Tạ',
              'Phụ Kiện',
              'Giá Kệ',
              'Blog',
              'Liên Hệ'
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-white hover:text-[#FFD700] text-sm font-medium px-4 py-2 hover:bg-[#6E6E6E] transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
} 