import Hero from '@/components/Hero'
import CountdownDeals from '@/components/CountdownDeals'
import FeaturedCategories from '@/components/FeaturedCategories'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  return (
    <>
      <Hero />
      <CountdownDeals />
      <FeaturedCategories />
      <ProductGrid />
    </>
  )
}
