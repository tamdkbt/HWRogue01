import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CanvasCursor from "@/components/CanvasCursor";

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <CanvasCursor />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
