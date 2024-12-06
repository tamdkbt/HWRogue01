'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [currentMiniBanner, setCurrentMiniBanner] = useState(0);
  const [isMiniBannerPaused, setIsMiniBannerPaused] = useState(false);

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

  const miniBanners = [
    { image: "/images/mini-banner/banner1.jpg", alt: "Mini Banner 1" },
    { image: "/images/mini-banner/banner2.jpg", alt: "Mini Banner 2" },
    { image: "/images/mini-banner/banner3.jpg", alt: "Mini Banner 3" },
    { image: "/images/mini-banner/banner4.jpg", alt: "Mini Banner 4" },
  ];

  useEffect(() => {
    if (!isMiniBannerPaused) {
      const timer = setInterval(() => {
        setCurrentMiniBanner((prev) => (prev + 1) % miniBanners.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isMiniBannerPaused]);

  return (
    <header className="bg-[#4A4A4A]">
      {/* Top Promo Bar */}
      <div className="bg-[#8B0000] text-white py-2">
        <div className="w-[95%] max-w-[2160px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <span className="mb-2 md:mb-0">FREESHIP CODE: AURA2024</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#FFD700]">Theo dõi đơn hàng</a>
              <a href="#" className="hover:text-[#FFD700]">Trợ giúp</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-[#6E6E6E]">
        <div className="w-[95%] max-w-[2160px] mx-auto px-4">
          <div className="flex justify-between items-center h-28">
            <Link 
              href="/" 
              className="relative w-[180px] md:w-[220px] lg:w-[240px] h-20 md:h-24 lg:h-28 
                transform hover:scale-110 transition-transform duration-300 ease-in-out
                group logo-container"
              aria-label="AURA - Trang chủ"
              title="Về trang chủ AURA"
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)";
              }}
            > 
              <Image
                src="/images/admin-logo.png"
                alt="AURA Logo"
                fill
                className="object-contain drop-shadow-lg group-hover:drop-shadow-2xl
                  transition-all duration-300 logo-glow logo-entrance"
                priority={true}
                quality={90}
                loading="eager"
                sizes="(max-width: 768px) 180px,
                       (max-width: 1024px) 220px,
                       240px"
              />
            </Link>

            {/* Search Bar với Animation Banner */}
            <div className="hidden md:flex items-center space-x-4 w-2/5">
              {/* Search Bar */}
              <div className="relative w-3/5">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 bg-white text-gray-800 rounded-md pl-10 text-sm
                    border-2 border-transparent focus:border-[#CC0000] transition-all"
                />
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Mini Banner Slider */}
              <div 
                className="relative w-2/5 h-16 overflow-hidden rounded-lg mt-1
                  transition-all duration-300 ease-in-out
                  group"
                onMouseEnter={() => setIsMiniBannerPaused(true)}
                onMouseLeave={() => setIsMiniBannerPaused(false)}
              >
                {miniBanners.map((banner, index) => (
                  <div
                    key={index}
                    className={`
                      absolute inset-0 w-full h-full
                      transition-all duration-1000 ease-in-out
                      ${currentMiniBanner === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                      after:content-['']
                      after:absolute
                      after:inset-0
                      after:bg-gradient-to-b
                      after:from-black/10
                      after:to-[#4A4A4A]/30
                      after:opacity-0
                      group-hover:after:opacity-100
                      after:transition-opacity
                      after:duration-300
                    `}
                  >
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      width={400}
                      height={64}
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-8">
                {/* Tài khoản */}
                <div className="group relative">
                  <button className="flex flex-col items-center text-white hover:text-[#FFD700] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs mt-1">Tài Khoản</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full w-48 bg-[#2A2A2A] shadow-xl opacity-0 invisible 
                    group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {['Đăng Nhập', 'Đăng Ký', 'Đơn Hàng', 'Thông Tin Tài Khoản'].map((item) => (
                      <a 
                        key={item}
                        href="#" 
                        className="block px-4 py-3 text-gray-200 hover:bg-[#3A3A3A] hover:text-[#FFD700]
                          text-sm font-medium border-b border-gray-700 hover:pl-6
                          transition-all duration-200"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Giỏ Hàng */}
                <div className="group relative">
                  <button className="flex flex-col items-center text-white hover:text-[#FFD700] transition-colors">
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="absolute -top-2 -right-2 bg-[#8B0000] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                    </div>
                    <span className="text-xs mt-1">Gi Hàng</span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full w-64 bg-[#2A2A2A] shadow-xl opacity-0 invisible 
                    group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4 border-b border-gray-700">
                      <p className="text-center text-gray-400 text-sm">Giỏ hàng trống</p>
                    </div>
                    <div className="p-4">
                      <a 
                        href="#" 
                        className="block w-full py-2 px-4 text-center bg-[#8B0000] hover:bg-[#660000]
                          text-white text-sm font-medium rounded transition-colors duration-200"
                      >
                        Xem Giỏ Hàng
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hotline */}
                <div className="flex flex-col items-center text-white group">
                  <span className="text-[#FFD700] font-bold tracking-wide">Hotline</span>
                  <a 
                    href="tel:0855669988" 
                    className="flex items-center gap-1 text-sm hover:text-[#FFD700] 
                      transition-all duration-300 transform group-hover:scale-110"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-[#FFD700] animate-pulse" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                      />
                    </svg>
                    <span className="font-medium">08.5566.9988</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-3 py-2 bg-white text-gray-800 rounded-md mb-3"
          />
          {/* Mobile navigation items */}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-[#4A4A4A] relative">
        <div className="h-1 bg-[#A9A9A9]"></div>
        
        <div className="w-[95%] max-w-[2160px] mx-auto px-4">
          <ul className="flex justify-between items-center h-16">
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
  );
};

export default Header; 