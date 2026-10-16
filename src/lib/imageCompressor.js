/**
 * Client-side Image Compression utility using HTML5 Canvas.
 * Automatically converts heavy camera/phone photos (3-10 MB) into lightweight WebP/JPEG (30-60 KB).
 * Keeps quality sharp for influencer cards while saving 98%+ of database bandwidth & storage.
 */
export function compressImage(file, maxWidth = 800, maxHeight = 1000, quality = 0.78) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      return reject(new Error('Fichier image invalide'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern WebP, fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        let format = 'webp';
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          format = 'jpeg';
        }

        const head = dataUrl.indexOf(',');
        const bytes = Math.round(((dataUrl.length - head - 1) * 3) / 4);
        const sizeKb = Math.round(bytes / 1024);
        const originalSizeKb = Math.round(file.size / 1024);

        resolve({
          dataUrl,
          sizeKb,
          originalSizeKb,
          format,
          width,
          height
        });
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
