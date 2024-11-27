'use client'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: "https://cdn.shopify.com/s/files/1/0574/1215/7598/t/16/assets/acf.Barbell---Colorado-20KG---gym-Lifestyle575.jpg?v=1685979186",
      title: "NEW MONSTER BELLS",
      subtitle: "Premium Kettlebells Made in the USA",
      buttonText: "Shop Now"
    },
    {
      image: "https://media.self.com/photos/5981e79b1341fc7fbbb1ad53/4:3/w_2560%2Cc_limit/kettle-bells.jpg",
      title: "THE ZEUS POWER BAR",
      subtitle: "Precision Engineered Excellence",
      buttonText: "Learn More"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="relative h-[50vh] w-[66.666667%] mx-auto">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 animate-fadeIn delay-200">
                    {slide.subtitle}
                  </p>
                  <button className="bg-[#d41313] hover:bg-red-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-sm transition-colors duration-200 animate-fadeIn delay-400">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 