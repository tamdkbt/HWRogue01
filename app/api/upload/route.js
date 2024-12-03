import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const directory = formData.get('directory');

    if (!file) {
      return NextResponse.json(
        { error: "Không nhận được file." },
        { status: 400 }
      );
    }

    // Kiểm tra định dạng file
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Định dạng file không hợp lệ. Chỉ chấp nhận JPG, PNG, WEBP, GIF." },
        { status: 400 }
      );
    }

    // Kiểm tra kích thước file (giới hạn 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File quá lớn. Giới hạn 5MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo đường dẫn đầy đủ
    const uploadDir = path.join(process.cwd(), 'public', directory);

    // Tạo thư mục nếu chưa tồn tại
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    // Tạo tên file duy nhất để tránh trùng lặp
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    const uniqueFileName = `${baseName}-${timestamp}${extension}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Ghi file
    await writeFile(filePath, buffer);

    // Trả về đường dẫn tương đối để lưu vào database
    const relativePath = path.join(directory, uniqueFileName).replace(/\\/g, '/');

    return NextResponse.json({
      message: "Upload thành công",
      fileName: uniqueFileName,
      filePath: relativePath
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: "Lỗi khi upload file." },
      { status: 500 }
    );
  }
} 