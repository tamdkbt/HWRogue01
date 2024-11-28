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

  return (
    <section className="relative bg-black flex justify-center pb-16">
      <div className="
        w-[85%]          // Tăng từ 80% lên 95% để mở rộng ra hai bên
        container
        max-w-[2160px]   // Tăng max-width để container rộng hơn
        mx-auto          
        px-2            
        relative 
        overflow-hidden
        -mt-0           
        mb-6           
        h-[400px]        
        sm:h-[500px]      
        md:h-[600px]     
        lg:h-[700px]     
        xl:h-[800px]    
      ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute 
              w-full 
              h-full 
              transition-opacity duration-500
              ${currentSlide === index ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
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
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 