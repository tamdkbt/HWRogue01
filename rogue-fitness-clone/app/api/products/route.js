import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

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
    const data = await request.json();
    console.log('Received product data:', data); // Debug log

    // Validate required fields
    if (!data.name || !data.price || !data.category || !data.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert specs to JSON if your database requires it
    const productData = {
      name: data.name,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image,
      badge: data.badge || null,
      // Remove specs if your schema doesn't support it
      // specs: data.specs
    };

    console.log('Processed product data:', productData); // Debug log

    const product = await prisma.product.create({
      data: productData
    });

    console.log('Created product:', product); // Debug log

    return NextResponse.json(product);
  } catch (error) {
    console.error('Server error:', error); // Debug log
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        image: data.image,
        badge: data.badge || null,
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.product.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}
