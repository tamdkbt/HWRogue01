export default function Footer() {
  return (
    <footer className="bg-[#4A4A4A] text-white">
      <div className="w-[95%] max-w-[2160px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping Policy', 'Returns', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-base text-white hover:text-[#FFD700] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <ul className="space-y-3">
              {['Our Story', 'Careers', 'Press', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-base text-white hover:text-[#FFD700] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-base text-white hover:text-[#FFD700] transition-colors duration-200"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-base text-white mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-[#FFD700] text-base placeholder-gray-500"
            />
          </div>
        </div>
        
        <div className="border-t border-[#6E6E6E] mt-12 pt-8 text-center text-base text-white">
          <p>&copy; 2024 Rogue Fitness Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 