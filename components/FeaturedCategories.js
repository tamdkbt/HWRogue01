export default function FeaturedCategories() {
  const categories = [
    {
      id: 1,
      title: "Bars & Plates",
      image: "/images/categories/bars-plates.jpg",
      link: "/category/bars-plates"
    },
    {
      id: 2,
      title: "Thiết Bị Tập Luyện",
      image: "/images/categories/equipment.jpg",
      link: "/category/thiet-bi-tap-luyen"
    },
    {
      id: 3,
      title: "Tăng Cường Thể Lực",
      image: "/images/categories/strength.jpg",
      link: "/category/tang-cuong-the-luc"
    },
    {
      id: 4,
      title: "Phụ Kiện",
      image: "/images/categories/accessories.jpg",
      link: "/category/phu-kien"
    }
  ];

  return (
    <section className="py-12 bg-[#4A4A4A]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Danh Mục Nổi Bật
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 