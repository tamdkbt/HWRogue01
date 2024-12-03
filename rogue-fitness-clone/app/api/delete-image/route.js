import { unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request) {
  try {
    const { imagePath } = await request.json();
    
    if (!imagePath) {
      return NextResponse.json(
        { error: 'Không có đường dẫn ảnh' },
        { status: 400 }
      );
    }

    // Xử lý đường dẫn
    const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const absolutePath = path.join(process.cwd(), 'public', relativePath);

    console.log('Absolute path:', absolutePath); // Debug log

    // Kiểm tra file có tồn tại không
    if (!existsSync(absolutePath)) {
      return NextResponse.json(
        { error: 'File không tồn tại' },
        { status: 404 }
      );
    }

    // Xóa file
    await unlink(absolutePath);

    return NextResponse.json({ 
      success: true,
      message: 'Xóa ảnh thành công',
      deletedPath: imagePath 
    });
  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json(
      { 
        error: `Lỗi khi xóa ảnh: ${error.message}`,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
