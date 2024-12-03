import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    await prisma.product.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    console.log('Updating product:', id, data); // Debug log

    // Validate required fields
    if (!data.name || !data.price || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Chuẩn hóa dữ liệu trước khi cập nhật
    const updateData = {
      name: data.name,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image,
      badge: data.badge || null,
      specs: data.specs || null // Prisma sẽ tự động xử lý JSON
    };

    console.log('Processed update data:', updateData); // Debug log

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData
    });

    console.log('Updated product:', updatedProduct); // Debug log

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
