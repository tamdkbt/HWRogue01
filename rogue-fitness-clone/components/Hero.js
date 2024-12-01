'use client'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false);
  
  const slides = [
    {
      image: "/images/banner/banner1.jpg",
      titleMain: "THIẾT BỊ TẬP LUYỆN ",
      titleYear: "2024",
      subtitle: "Nâng Tầm Sức Mạnh - Định Hình Phong Cách",
      buttonText: "KHÁM PHÁ",
      bgPosition: "center"
    },
    {
      image: "/images/banner/banner2.jpg",
      titleMain: "KHUYẾN MÃI THÁNG ",
      titleMonth: "11",
      subtitle: "Săn Deal Thả Ga - Giảm Giá Không Giới Hạn",
      buttonText: "XEM NGAY",
      bgPosition: "center"
    },
    {
      image: "/images/banner/banner3.jpg",
      titleMain: "BỘ SƯU TẬP ",
      titleYear: "MỚI",
      subtitle: "Khám Phá Đỉnh Cao - Chinh Phục Thử Thách",
      buttonText: "KHÁM PHÁ",
      bgPosition: "center"
    },
    {
      image: "/images/banner/banner4.jpg",
      titleMain: "CÔNG NGHỆ ",
      titleYear: "ĐỈNH CAO",
      subtitle: "Trải Nghiệm Tương Lai - Tập Luyện Thông Minh",
      buttonText: "TÌM HIỂU THÊM",
      bgPosition: "center"
    }
  ]

  const slideStyles = {
    slideIn: `animate-slideIn opacity-0 transform translate-x-full`,
    fadeIn: `animate-fadeIn opacity-0`,
    shine: `animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent`,
    buttonHover: `hover:bg-gradient-to-r hover:from-[#FFD700] hover:via-[#FFC700] hover:to-[#FFD700] hover:scale-105 hover:shadow-lg`
  }

  // Auto slide
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isPaused])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="relative bg-[#A9A9A9]">
      <div className="flex w-full">
        <div className="w-1/6 bg-[#A9A9A9]"></div>

        <div className="w-[120%] max-w-[2560px] mx-auto">
          <div className="h-[800px] relative overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`
                  absolute inset-0
                  transition-all duration-1000 ease-in-out
                  ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                `}
              >
                <img
                  src={slide.image}
                  alt={slide.titleMain}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ objectPosition: slide.bgPosition }}
                />
                <div className="absolute inset-0 bg-black/30" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h1 className={`text-5xl md:text-6xl font-bold mb-4 tracking-tight ${currentSlide === index ? 'animate-slideInFromTop' : ''}`}>
                    <span className="text-[#FFD700] relative overflow-hidden">
                      {slide.titleMain}
                      <span className={slideStyles.shine}></span>
                    </span>
                    <span className="text-white">{slide.titleYear || ` ${slide.titleMonth}`}</span>
                  </h1>
                  
                  <p className={`
                    text-xl md:text-2xl mb-8 font-light max-w-2xl leading-relaxed
                    text-[#E8E8E8] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                    bg-black/20 px-6 py-2 rounded-lg backdrop-blur-sm
                    ${currentSlide === index ? 'animate-slideInFromBottom' : ''}
                  `}>
                    {slide.subtitle}
                  </p>
                  
                  <button className={`
                    bg-[#4A4A4A] text-[#FFD700] px-10 py-4 font-bold
                    border-2 border-[#FFD700]
                    transition-all duration-500 relative
                    hover:bg-[#FFD700] hover:text-[#4A4A4A]
                    overflow-hidden group
                    ${currentSlide === index ? 'animate-slideUp' : ''}
                  `}>
                    <span className="relative z-10 group-hover:animate-pulse">
                      {slide.buttonText}
                    </span>
                    <span className="absolute inset-0 bg-[#FFD700]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </button>
                </div>
              </div>
            ))}

            <div className="absolute bottom-20 right-10 flex items-center space-x-4 z-20">
              <button
                onClick={togglePause}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
              >
                {isPaused ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                )}
              </button>
              
              <button 
                onClick={prevSlide}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full 
                  transition-all duration-300 transform hover:scale-110 group"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-6 h-6 group-hover:animate-pulse"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button 
                onClick={nextSlide}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full 
                  transition-all duration-300 transform hover:scale-110 group"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-6 h-6 group-hover:animate-pulse"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    transform hover:scale-150
                    ${currentSlide === index 
                      ? 'bg-[#FFD700] w-6 animate-dot-active' 
                      : 'bg-white/50 hover:bg-white/70'}
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="bg-black h-[120px] flex items-center justify-center">
            <div className="max-w-[1200px] w-full flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-bold text-white tracking-wider">
                  LỄ HỘI
                  <span className="text-[#FFD700]"> CUỐI NĂM</span>
                </span>
                <span className="text-white mx-4">|</span>
                <div className="flex items-center gap-4">
                  <span className="text-red-600 font-bold">GIẢM SỐC</span>
                  <span className="text-white">+</span>
                  <span className="text-red-600 font-bold">MUA NHIỀU GIẢM NHIỀU</span>
                  <span className="text-white">+</span>
                  <span className="text-red-600 font-bold">QUÀ TẶNG HẤP DẪN</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 w-full max-w-[600px]">
                <span className="text-2xl text-[#FFD700] mr-2">🎁</span>
                <span className="text-white mx-4">|</span>
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-white text-sm whitespace-nowrap">
                    Đừng bỏ lỡ cơ hội săn deal khủng - Nhận ngay thông báo khi có ưu đãi mới!
                  </span>
                  <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    className="flex-1 px-4 py-2 text-sm bg-white/10 text-white rounded-sm
                    focus:outline-none focus:ring-1 focus:ring-[#FFD700] placeholder-gray-400"
                  />
                  <button className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-sm
                    hover:bg-red-700 transition-all duration-300 whitespace-nowrap">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/6 bg-[#A9A9A9]"></div>
      </div>
    </section>
  )
} 