import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    console.log('=== LOGIN ATTEMPT ===')
    console.log('Email:', email)
    console.log('Password:', password)

    const user = await prisma.user.findUnique({
      where: { email }
    })
    console.log('Found user:', user ? 'Yes' : 'No')

    if (!user) {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    console.log('Raw password from input:', password)
    console.log('Stored hash from DB:', user.password)
    
    const passwordMatch = await bcrypt.compare(password, user.password)
    console.log('Password match result:', passwordMatch)

    if (!passwordMatch) {
      console.log('Password comparison failed')
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    console.log('Password comparison successful')

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })

    response.cookies.set('admin_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Lỗi đăng nhập', error: error.message },
      { status: 500 }
    )
  }
}
