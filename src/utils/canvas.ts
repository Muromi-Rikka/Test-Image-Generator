import { snapdom } from "@zumer/snapdom";

export async function downloadImage(element: HTMLElement | HTMLCanvasElement, filename: string = "test-image.jpg") {
  // 使用snapdom保存图片
  try {
    // 直接使用snapdom.download方法下载图片
    const result = await snapdom(element);
    await result.toJpg();
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    await result.download({ filename, quality: 0.5, format: "jpg" });
  }
  catch (error) {
    console.error("Error saving image with snapdom:", error);
    // 回退到原来的方法（仅适用于Canvas元素）
    if (element instanceof HTMLCanvasElement) {
      element.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/jpeg", 0.8);
    }
  }
}
