import type { ImageConfig } from "../types";
import { useCallback, useRef, useState } from "react";
import { downloadImage } from "../utils/canvas";

export function useImageGenerator() {
  const [config, setConfig] = useState<ImageConfig>({
    width: 800,
    height: 600,
    text: "Test Image",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    isGradient: false,
  });

  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const updateConfig = useCallback((newConfig: Partial<ImageConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const save = useCallback(async (filename: string = "test-image.jpg") => {
    if (!imageRef.current)
      return;

    setLoading(true);
    try {
      downloadImage(imageRef.current, filename);
    }
    catch (error) {
      console.error("Error saving image:", error);
    }
    finally {
      setLoading(false);
    }
  }, []);

  return {
    config,
    loading,
    updateConfig,
    save,
    imageRef,
  };
}
