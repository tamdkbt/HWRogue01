export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-xs">
      <div className="w-[95%] max-w-[2160px] mx-auto px-4 py-12">
        <div className="grid grid-cols-5 gap-8">
          <div>
            <h3 className="text-white text-xs font-bold mb-4">VỀ CHÚNG TÔI</h3>
            <ul className="space-y-2">
              {[
                'Câu Chuyện Aura',
                'Tuyển Dụng',
                '#auraVN',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-bold mb-4">DỊCH VỤ KHÁCH HÀNG</h3>
            <ul className="space-y-2">
              {[
                'Báo Giá',
                'Thanh Toán',
                'Theo Dõi Đơn Hàng',
                'Hoàn Trả & Hủy Đơn',
                'Vận Chuyển',
                'Chính Sách Sản Phẩm',
                'Bảo Hành',
                'Góp Ý',
                'Báo Lỗi Website',
                'Khảo Sát',
                'Liên Hệ',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-bold mb-4">CHÍNH SÁCH & ĐIỀU KHOẢN</h3>
            <ul className="space-y-2">
              {[
                'Thu Hồi Sản Phẩm',
                'Chính Sách Bảo Mật',
                'Điều Khoản Sử Dụng',
                'Quyền Truy Cập',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-bold mb-4">LIÊN KẾT KHÁC</h3>
            <ul className="space-y-2">
              {[
                'Aura Invitational',
                'Aura Challenges',
                'Aura Athletes',
                'The Aura Blog',
                'The Aura Gym',
                'Aura Events',
                'Phòng Tập Đối Tác',
                'Zeus',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-bold mb-4">ĐĂNG KÝ NHẬN TIN</h3>
            <p className="mb-4 text-[11px]">
              Đăng ký nhận bản tin để cập nhật tin tức và sản phẩm mới
            </p>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 bg-white/10 text-white text-[11px] rounded focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
            />
            <p className="mt-2 text-[11px]">
              Khi đăng ký, bạn đồng ý với Chính sách bảo mật, Điều khoản sử dụng và Chính sách hoàn trả của chúng tôi
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex justify-between items-center">
            <div className="text-[11px]">
              © 2010-2024 Aura Fitness. Đã đăng ký bản quyền.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  {/* Instagram icon */}
                </svg>
              </a>
              {/* Thêm các icon mạng xã hội khác */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 