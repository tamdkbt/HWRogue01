import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    console.log('Login attempt with:', email)

    const user = await prisma.user.findUnique({
      where: { email }
    })
    console.log('Found user:', user ? 'Yes' : 'No')

    if (!user) {
      console.log('User not found')
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    console.log('Comparing passwords...')
    const passwordMatch = await bcrypt.compare(password, user.password)
    console.log('Password match:', passwordMatch)

    if (!passwordMatch) {
      console.log('Password does not match')
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    console.log('Login successful')
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Lỗi đăng nhập', error: error.message },
      { status: 500 }
    )
  }
}
