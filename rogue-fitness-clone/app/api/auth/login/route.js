import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Tìm user trong database
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Kiểm tra user và role
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Kiểm tra password (nên dùng bcrypt để hash)
    if (password !== user.password) {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Tạo JWT token
    const token = sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    // Set cookie
    const response = NextResponse.json(
      { message: 'Đăng nhập thành công' },
      { status: 200 }
    )

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 1 day
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    )
  }
}
