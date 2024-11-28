export default function FeaturedBrands() {
  const brands = [
    { name: "Brand 1", logo: "/images/brands/brand1.png" },
    { name: "Brand 2", logo: "/images/brands/brand2.png" },
    { name: "Brand 3", logo: "/images/brands/brand3.png" },
    { name: "Brand 4", logo: "/images/brands/brand4.png" },
    { name: "Brand 5", logo: "/images/brands/brand5.png" },
    { name: "Brand 6", logo: "/images/brands/brand6.png" }
  ];

  return (
    <section className="py-12 bg-[#4A4A4A]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">THƯƠNG HIỆU NỔI BẬT</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <div 
              key={brand.name}
              className="bg-[#6E6E6E] p-6 rounded-sm flex items-center justify-center hover:bg-[#A9A9A9] transition-colors duration-200"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 w-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 