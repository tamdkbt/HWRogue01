import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { existsSync } from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, need raw body for file upload
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const directory = formData.get('directory');

    console.log('Received upload request:', { fileName: file?.name, directory });

    if (!file) {
      return NextResponse.json({ error: "Không nhận được file." }, { status: 400 });
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

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Chuẩn hóa đường dẫn thư mục
      let uploadDir = path.join(process.cwd(), 'public');
      
      // Nếu có directory, thêm vào đường dẫn
      if (directory) {
        // Loại bỏ các ký tự đặc biệt và khoảng trắng đầu/cuối
        const cleanDirectory = directory.trim().replace(/[\/\\]/g, path.sep);
        uploadDir = path.join(uploadDir, cleanDirectory);
      }

      console.log('Upload directory:', uploadDir);

      // Tạo thư mục nếu chưa tồn tại
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Tạo tên file duy nhất
      const timestamp = Date.now();
      const originalName = file.name;
      const extension = path.extname(originalName);
      const baseName = path.basename(originalName, extension);
      const uniqueFileName = `${baseName}-${timestamp}${extension}`;
      const filePath = path.join(uploadDir, uniqueFileName);

      console.log('Saving file to:', filePath);

      // Kiểm tra xem file đã tồn tại chưa
      if (existsSync(filePath)) {
        return NextResponse.json(
          { error: "File đã tồn tại." },
          { status: 400 }
        );
      }

      // Ghi file
      await writeFile(filePath, buffer);

      // Tạo đường dẫn tương đối để lưu vào database
      const relativePath = path.join(
        directory || '',
        uniqueFileName
      ).replace(/\\/g, '/');

      console.log('Relative path:', relativePath);

      return NextResponse.json({
        message: "Upload thành công",
        fileName: uniqueFileName,
        filePath: relativePath
      });

    } catch (error) {
      console.error('File system error:', error);
      return NextResponse.json(
        { error: `Lỗi khi lưu file: ${error.message}` },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Lỗi khi xử lý upload: ${error.message}` },
      { status: 500 }
    );
  }
}