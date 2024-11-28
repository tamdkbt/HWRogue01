'use client'
import { useState, useEffect } from 'react'

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [progress, setProgress] = useState(100)

  function calculateTimeLeft() {
    const difference = new Date(endTime) - new Date()
    const totalDuration = new Date(endTime) - new Date(Date.now() - 24 * 60 * 60 * 1000) // 24h total duration
    
    // Tính phần trăm thời gian còn lại
    const currentProgress = (difference / totalDuration) * 100
    setProgress(Math.max(0, Math.min(100, currentProgress))) // Giới hạn 0-100%

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    return timeLeft
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      
      if (Object.values(newTimeLeft).every(v => v === 0)) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  if (Object.values(timeLeft).every(v => v === 0)) {
    return <div className="text-red-500 text-xs font-bold">ĐÃ KẾT THÚC</div>
  }

  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="font-mono text-green-400 text-sm min-w-[75px]">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
      <div className="h-2.5 flex-1 bg-gray-700 rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-full bg-green-400 transition-all duration-300"
        />
      </div>
    </div>
  )
}

export default function CountdownDeals() {
  const deals = [
    {
      id: 1,
      name: "Rogue Echo Bike V3.0",
      image: "/images/products/echo-bike.jpg",
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      name: "Rogue SML-2C Squat Stand",
      image: "/images/products/squat-stand.jpg",
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      name: "Rogue Echo Weight Vest",
      image: "/images/products/weight-vest.jpg",
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      name: "Rogue Manta Ray Adjustable Bench",
      image: "/images/products/bench.jpg",
      endTime: "2024-03-12T23:59:59",
    },
    {
      id: 5,
      name: "The Milo",
      image: "/images/products/milo.jpg",
      endTime: "2024-03-10T23:59:59",
    },
    {
      id: 6,
      name: "Rogue OSO Barbell Collars 2.0",
      image: "/images/products/collars.jpg",
      endTime: "2024-03-11T23:59:59",
    },
    {
      id: 7,
      name: "Rogue Curl Bar",
      image: "/images/products/curl-bar.jpg",
      endTime: "2024-03-09T23:59:59",
    }
  ]

  return (
    <section className="py-8 bg-[#4A4A4A]">
      <div className="w-[95%] max-w-[2160px] mx-auto px-4">
        <h2 className="text-xl font-bold text-white mb-6">ƯU ĐÃI NỔI BẬT</h2>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-6 min-w-max">
            {deals.map((deal) => (
              <div 
                key={deal.id}
                className="w-80 bg-[#2A2A2A] rounded-lg overflow-hidden flex-shrink-0 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-w-4 aspect-h-3">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x300";
                    }}
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="text-white text-base font-medium mb-4 truncate">
                    {deal.name}
                  </h3>
                  
                  <CountdownTimer endTime={deal.endTime} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 