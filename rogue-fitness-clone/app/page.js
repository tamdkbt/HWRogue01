import Hero from '@/components/Hero'
import CountdownDeals from '@/components/CountdownDeals'
import FeaturedCategories from '@/components/FeaturedCategories'

export default function Home() {
  return (
    <main className="bg-[#A9A9A9]">
      <Hero />
      <div>
        <CountdownDeals />
        <FeaturedCategories />
      </div>
    </main>
  )
}
