export const resizeCloudinaryImage = (src = '', size: number) => {
  if (src === '') return undefined;

  const isCloudinary = src?.includes('res.cloudinary');

  if (!isCloudinary) return src;

  // it's a cloudinary
  if (!src.includes('w_') && !src.includes('h_')) {
    // not resized image
    const parts = src.split('/');
    const uploadIndex = parts.findIndex((part) => part === 'upload');

    const width = size;
    const height = size;

    parts.splice(uploadIndex + 1, 0, `w_${width},h_${height},c_fill`);

    return parts.join('/');
  }

  // this image was resized before
  return src.replace(/w_\d+/, `w_${size}`).replace(/h_\d+/, `h_${size}`);
};
