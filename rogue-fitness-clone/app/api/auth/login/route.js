import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Thêm đoạn code test này để tạo hash mới
const testPassword = "admin";
bcrypt.hash(testPassword, 10).then(hash => {
  console.log('=== TEST HASH ===');
  console.log('Password:', testPassword);
  console.log('Generated hash:', hash);
});

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
    
    // THÊM đoạn code test này để tạo hash mới
    const testPassword = "admin";
    const testHash = await bcrypt.hash(testPassword, 10);
    console.log('Test hash for "admin":', testHash);
    
    // So sánh password
    const passwordMatch = await bcrypt.compare(password, user.password)
    console.log('Password match result:', passwordMatch)

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    console.log('Password comparison successful')

    console.log('Password type:', typeof password);
    console.log('Password length:', password.length);
    console.log('Hash type:', typeof user.password);
    console.log('Hash length:', user.password.length);

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
