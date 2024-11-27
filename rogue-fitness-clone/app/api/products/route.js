import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        image: data.image,
        badge: data.badge,
        rating: data.rating ? parseFloat(data.rating) : 0,
        reviews: data.reviews ? parseInt(data.reviews) : 0,
      }
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
