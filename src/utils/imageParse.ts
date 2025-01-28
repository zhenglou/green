
export default class ImageUploader {
  /**
   * 将文件转换为 Base64
   * @param file 要转换的文件
   * @returns Promise<string>
   */
  static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  /**
   * 将图片文件压缩为指定尺寸
   * @param file 图片文件
   * @param maxWidth 最大宽度
   * @param maxHeight 最大高度
   * @returns Promise<Blob>
   */
  static compressImage1(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error("Canvas context is not available."));
        }

        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Compression failed."));
          }
        }, file.type);
      };

      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
  static compressImage = (file: File, maxWidth: number, quality: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // 创建一个 canvas，用于压缩图片
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const scale = img.width > maxWidth ? maxWidth / img.width : 1;

          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          // 将图片压缩为 base64
          const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedBase64);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };
  static displayBlobAsImage = (blob: Blob): string => {
    // 生成 Blob URL
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl
  };
  
  static revokeObjectURL = (blobUrl:string): void =>{
    URL.revokeObjectURL(blobUrl);
  }
}
