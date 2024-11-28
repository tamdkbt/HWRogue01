import Header from '../components/Header'
import Hero from '../components/Hero'
import CountdownDeals from '../components/CountdownDeals'
import FeaturedCategories from '../components/FeaturedCategories'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <CountdownDeals />
      <FeaturedCategories />
      <ProductGrid />
      <Footer />
    </main>
  );
}
