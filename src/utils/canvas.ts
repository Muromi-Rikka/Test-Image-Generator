import type { ImageConfig } from "../types";
import { snapdom } from "@zumer/snapdom";

export function generateImage(config: ImageConfig): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = config.width;
  canvas.height = config.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Draw background
  if (config.isGradient && config.gradientColors && config.gradientColors.length >= 2) {
    const gradient = ctx.createLinearGradient(0, 0, config.width, config.height);
    config.gradientColors.forEach((color, index) => {
      gradient.addColorStop(index / (config.gradientColors!.length - 1), color);
    });
    ctx.fillStyle = gradient;
  }
  else {
    ctx.fillStyle = config.backgroundColor;
  }
  ctx.fillRect(0, 0, config.width, config.height);

  // Draw text
  ctx.fillStyle = config.textColor;
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Split text into lines if it's too long
  const lines = splitTextIntoLines(ctx, config.text, config.width - 40);
  const lineHeight = 60;
  const startY = (config.height - (lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, config.width / 2, startY + index * lineHeight);
  });

  return canvas;
}

function splitTextIntoLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const testLine = `${currentLine} ${words[i]}`;
    const metrics = ctx.measureText(testLine);

    if (metrics.width <= maxWidth) {
      currentLine = testLine;
    }
    else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }

  lines.push(currentLine);
  return lines;
}

export async function downloadImage(element: HTMLElement | HTMLCanvasElement, filename: string = "test-image.jpg") {
  // 使用snapdom保存图片
  try {
    // 直接使用snapdom.download方法下载图片
    await snapdom.download(element, {
      filename,
      quality: 0.8,
    });
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
