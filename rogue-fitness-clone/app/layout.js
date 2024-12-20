import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CanvasCursor from "@/components/CanvasCursor";
import { Providers } from "./providers"

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          href="/images/admin-logo.png" 
          as="image"
        />
      </head>
      <body>
        <Providers>
          <Header />
          <CanvasCursor />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
