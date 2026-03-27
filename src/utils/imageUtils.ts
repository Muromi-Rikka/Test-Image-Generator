export function compressImage(canvas: HTMLCanvasElement, quality: number = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        }
        else {
          reject(new Error("Failed to compress image"));
        }
      },
      "image/png",
      quality,
    );
  });
}

export function getImageSize(blob: Blob): string {
  const sizeInBytes = blob.size;
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInKB / 1024;

  if (sizeInMB >= 1) {
    return `${sizeInMB.toFixed(2)} MB`;
  }
  else if (sizeInKB >= 1) {
    return `${sizeInKB.toFixed(2)} KB`;
  }
  else {
    return `${sizeInBytes} bytes`;
  }
}
