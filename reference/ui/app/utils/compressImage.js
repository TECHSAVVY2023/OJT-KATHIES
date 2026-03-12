// utils/compressImage.js
export async function compressImage(file, maxSizeKB = 900, quality = 0.9) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const width = img.width;
        const height = img.height;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        let currentQuality = quality;
        let compressedDataUrl = canvas.toDataURL("image/jpeg", currentQuality);

        // Loop until below size
        while (compressedDataUrl.length / 1024 > maxSizeKB && currentQuality > 0.1) {
          currentQuality -= 0.05; 
          compressedDataUrl = canvas.toDataURL("image/jpeg", currentQuality);
        }

        // Convert back to File object
        const byteString = atob(compressedDataUrl.split(",")[1]);
        const mimeString = compressedDataUrl.split(",")[0].split(":")[1].split(";")[0];

        const buffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(buffer);

        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }

        const compressedFile = new File([buffer], file.name.replace(/\.\w+$/, ".jpg"), {
          type: mimeString,
          lastModified: Date.now()
        });

        resolve(compressedFile);
      };

      img.onerror = () => reject("Image load error");
    };

    reader.onerror = () => reject("FileReader error");
    reader.readAsDataURL(file);
  });
}
