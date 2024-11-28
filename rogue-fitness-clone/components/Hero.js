'use client'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: "/images/banner/banner1.jpg",
      title: "THIẾT BỊ TẬP LUYỆN 2024",
      subtitle: "Bộ sưu tập mới nhất đã có mặt",
      buttonText: "KHÁM PHÁ NGAY",
      bgPosition: "center"
    },
    {
      image: "/images/banner/banner2.jpg",
      title: "KHUYẾN MÃI THÁNG 11",
      subtitle: "Giảm giá đến 30% cho tất cả phụ kiện",
      buttonText: "XEM NGAY",
      bgPosition: "center"
    }
  ]

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative bg-[#A9A9A9]">
      <div className="flex w-full">
        <div className="w-1/6 bg-[#A9A9A9]"></div>

        <div className="w-[120%] max-w-[2560px] mx-auto h-[800px] relative overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`
                absolute inset-0
                transition-opacity duration-500
                ${currentSlide === index ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: slide.bgPosition }}
              />
              <div className="absolute inset-0 bg-black/30" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-6 font-light">{slide.subtitle}</p>
                <button className="bg-[#FFD700] text-black px-8 py-3 font-bold hover:bg-[#FFC700] transition-colors">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index 
                    ? 'bg-[#FFD700]' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="w-1/6 bg-[#A9A9A9]"></div>
      </div>

      <div className="w-full h-16 bg-[#A9A9A9]"></div>

      <div className="w-[95%] max-w-[2160px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 py-12">
          {/* Các sản phẩm sẽ được render ở đây với kích thước lớn hơn */}
        </div>
      </div>
    </section>
  )
} 