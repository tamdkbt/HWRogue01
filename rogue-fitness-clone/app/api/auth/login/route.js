import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    console.log('=== LOGIN ATTEMPT ===')
    console.log('Email received:', email)
    console.log('Raw password received:', password)
    console.log('Password length:', password.length)
    console.log('Password type:', typeof password)

    const user = await prisma.user.findUnique({
      where: { email }
    })
    console.log('Database query result:', user)

    if (!user) {
      console.log('User not found in database')
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    console.log('User found:', {
      id: user.id,
      email: user.email,
      role: user.role,
      hashedPassword: user.password,
      passwordLength: user.password.length
    })

    console.log('Attempting password comparison...')
    console.log('Input password:', password)
    console.log('Stored hash:', user.password)
    
    const passwordMatch = await bcrypt.compare(password, user.password)
    console.log('Password match result:', passwordMatch)

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
    console.error('=== LOGIN ERROR ===')
    console.error('Error details:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { message: 'Lỗi đăng nhập', error: error.message },
      { status: 500 }
    )
  }
}
