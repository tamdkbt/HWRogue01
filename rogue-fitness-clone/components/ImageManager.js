import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ImageManager({ 
  currentImage, 
  onImageChange,
  directory 
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDeleteImage = async () => {
    if (!currentImage || !window.confirm('Bạn có chắc chắn muốn xóa ảnh này?')) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch('/api/delete-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagePath: currentImage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Xóa ảnh thất bại');
      }

      onImageChange(''); // Clear image path
      alert('Xóa ảnh thành công!');
    } catch (error) {
      console.error('Delete image error:', error);
      alert(`Lỗi khi xóa ảnh: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', directory);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onImageChange(data.filePath);
      alert('Upload thành công!');
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Lỗi upload: ${error.message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {currentImage ? (
        <>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ảnh Hiện Tại
          </label>
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-white/5">
            <Image
              src={currentImage.startsWith('/') ? currentImage : `/${currentImage}`}
              alt="Preview"
              width={128}
              height={128}
              className="object-cover hover:scale-110 transition-transform"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDeleteImage}
              disabled={isDeleting}
              className={`px-4 py-2 rounded-md text-white
                ${isDeleting 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isDeleting ? 'Đang xóa...' : 'Xóa ảnh cũ'}
            </button>
            
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`px-4 py-2 rounded-md text-white
                  ${isUploading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isUploading ? '��ang tải lên...' : 'Cập nhật ảnh mới'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Ảnh Mới
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`px-4 py-2 rounded-md text-white
              ${isUploading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isUploading ? 'Đang tải lên...' : 'Upload ảnh'}
          </button>
        </div>
      )}
    </div>
  );
}
