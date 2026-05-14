'use client';

import { useState, useRef } from 'react';
import { HiOutlinePhotograph, HiOutlineUpload, HiOutlineX, HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ImageUploader({ images, onChange, maxImages = 5 }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        continue;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');

        onChange([...images, data.url]);
        toast.success('Image uploaded');
      } catch (err) {
        toast.error(err.message);
      } finally {
        setUploading(false);
      }
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((url, i) => (
          <div key={i} className="relative group aspect-square bg-dark-800/80 border border-gold-500/20 overflow-hidden">
            <img src={url} alt={`Product image ${i + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <HiOutlineX className="w-3.5 h-3.5" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1 left-1 bg-gold-500 text-dark-950 text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                Main
              </span>
            )}
          </div>
        ))}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square border-2 border-dashed border-gold-500/20 hover:border-gold-500/50 flex flex-col items-center justify-center gap-2 transition-all bg-dark-800/30 hover:bg-dark-800/50"
          >
            {uploading ? (
              <div className="w-6 h-6 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            ) : (
              <>
                <HiOutlineUpload className="w-5 h-5 text-gold-500/40" />
                <span className="text-[9px] text-gold-500/40 tracking-wider uppercase font-bold">Upload</span>
              </>
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <p className="text-[10px] text-gold-500/30 tracking-wider">
        {images.length}/{maxImages} images · PNG, JPG, WEBP up to 5MB
      </p>
    </div>
  );
}
