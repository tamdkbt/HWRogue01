export default function FeaturedCategories() {
  const categories = [
    {
      title: "Tạ Tay",
      image: "/images/categories/dumbbells.jpg",
      description: "Bộ sưu tập tạ tay cao cấp",
      link: "/ta-tay"
    },
    {
      title: "Thanh Tạ",
      image: "/images/categories/barbells.jpg",
      description: "Thanh tạ Olympic chất lượng cao",
      link: "/thanh-ta"
    },
    {
      title: "Giá Đỡ & Rack",
      image: "/images/categories/racks.jpg",
      description: "Giá đỡ và power rack chuyên nghiệp",
      link: "/gia-do"
    },
    {
      title: "Phụ Kiện",
      image: "/images/categories/accessories.jpg",
      description: "Phụ kiện tập luyện đa dạng",
      link: "/phu-kien"
    }
  ];

  return (
    <section className="py-16 bg-[#4A4A4A]">
      <div className="w-[95%] max-w-[2160px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">ƯU ĐÃI NỔI BẬT</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a 
              key={category.title}
              href={category.link}
              className="group relative overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-sm text-gray-200 mb-4">{category.description}</p>
                <span className="text-[#FFD700] text-sm font-medium group-hover:underline">
                  Xem thêm →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 