export default function FeaturedCategories() {
  const categories = [
    {
      id: 1,
      title: "Barbells",
      image: "/images/categories/bars-plates.jpg",
      link: "/category/barbells"
    },
    {
      id: 2,
      title: "Plates",
      image: "/images/categories/plates.jpg",
      link: "/category/plates"
    },
    {
      id: 3,
      title: "Strength Equipment",
      image: "/images/categories/strength.jpg",
      link: "/category/strength-equipment"
    },
    {
      id: 4,
      title: "Benches",
      image: "/images/categories/benches.jpg",
      link: "/category/benches"
    },
    {
      id: 5,
      title: "Iron Game Programming",
      image: "/images/categories/programming.jpg",
      link: "/category/programming"
    },
    {
      id: 6,
      title: "Apparel",
      image: "/images/categories/apparel.jpg",
      link: "/category/apparel"
    },
    {
      id: 7,
      title: "Conditioning",
      image: "/images/categories/conditioning.jpg",
      link: "/category/conditioning"
    },
    {
      id: 8,
      title: "Echo Lineup",
      image: "/images/categories/echo.jpg",
      link: "/category/echo"
    }
  ];

  return (
    <section className="py-20 bg-[#A9A9A9]">
      <div className="w-[95%] max-w-[2160px] mx-auto px-4">
        <div className="overflow-x-auto -mx-[17vw]">
          <div className="px-[22vw]">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-black tracking-wide mb-2">
                KHUYẾN MÃI GIAO HÀNG
              </h2>
              <div className="w-full h-[1px] bg-black opacity-10"></div>
            </div>

            <div className="grid grid-cols-4 gap-6 auto-rows-fr">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={category.link}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {category.title}
                      </h3>
                      <span className="text-white text-sm font-medium hover:text-[#FFD700] transition-colors">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}