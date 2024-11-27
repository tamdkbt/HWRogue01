'use client'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full z-50 bg-black">
      {/* Top announcement bar */}
      <div className="bg-[#d41313] text-white text-center py-2 text-sm font-medium">
        MIỄN SHIP CHO ĐƠN HÀNG CÓ KÝ HIỆU
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-white text-5xl font-bold relative group">
            <span className="hover:text-[#E0E0E0] transition-colors duration-200">AURA</span>
            <span 
              className="
                absolute 
                -top-2 
                -right-3 
                text-[0.3em] 
                opacity-70 
                group-hover:opacity-100 
                group-hover:text-[#E0E0E0] 
                transition-all 
                duration-200
              "
            >®</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Equipment', 'Barbells', 'Racks', 'Conditioning', 'Accessories'].map((item) => (
              <a
                key={item}
                href="#"
                className="
                  text-white 
                  hover:text-gray-300 
                  transition-colors 
                  duration-200 
                  text-[15px]
                  font-medium
                  tracking-wide
                  font-['SF_Pro_Display']  /* hoặc font-sans */
                  uppercase
                  hover:border-b-2
                  hover:border-[#D32F2F]
                  py-2
                "
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 