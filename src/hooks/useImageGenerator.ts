import type { ImageConfig } from "../types";
import { useCallback, useState } from "react";
import { downloadImage, generateImage } from "../utils/canvas";
import { compressImage } from "../utils/imageUtils";

export function useImageGenerator() {
  const [config, setConfig] = useState<ImageConfig>({
    width: 800,
    height: 600,
    text: "Test Image",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    isGradient: false,
  });

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateConfig = useCallback((newConfig: Partial<ImageConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const generate = useCallback(() => {
    setLoading(true);
    try {
      const newCanvas = generateImage(config);
      setCanvas(newCanvas);
      const url = newCanvas.toDataURL();
      setPreviewUrl(url);
    }
    catch (error) {
      console.error("Error generating image:", error);
    }
    finally {
      setLoading(false);
    }
  }, [config]);

  const save = useCallback(async (filename: string = "test-image.png") => {
    if (!canvas)
      return;

    setLoading(true);
    try {
      await compressImage(canvas);
      downloadImage(canvas, filename);
    }
    catch (error) {
      console.error("Error saving image:", error);
    }
    finally {
      setLoading(false);
    }
  }, [canvas]);

  return {
    config,
    canvas,
    previewUrl,
    loading,
    updateConfig,
    generate,
    save,
  };
}
