import { NextResponse } from 'next/server'

export function middleware(request) {
  // Chỉ áp dụng cho đường dẫn /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Kiểm tra session/token từ cookies
    const session = request.cookies.get('admin_session')
    
    if (!session) {
      // Nếu không có session, chuyển hướng về trang login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: '/admin/:path*'
} 