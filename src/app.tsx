import { createTheme, MantineProvider, useMantineColorScheme } from "@mantine/core";
import { useEffect } from "react";
import { ImageGenerator } from "./components/ImageGenerator";
import "./globals.css";

// 创建主题
const theme = createTheme({
  // 主题配置
});

function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // 从本地存储读取主题偏好，如果没有则使用系统偏好
  useEffect(() => {
    const savedScheme = localStorage.getItem("colorScheme");
    if (savedScheme === "light" || savedScheme === "dark") {
      setColorScheme(savedScheme);
    }
    else {
      // 检测系统主题偏好
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setColorScheme("dark");
      }
      else {
        setColorScheme("light");
      }
    }
  }, [setColorScheme]);

  // 保存主题偏好到本地存储
  useEffect(() => {
    if (colorScheme) {
      localStorage.setItem("colorScheme", colorScheme);
    }
  }, [colorScheme]);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem("colorScheme")) {
        setColorScheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setColorScheme]);

  const websiteSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "图像生成器",
    "url": "https://github.com/Muromi-Rikka/Test-Image-Generator",
    "description": "一个简单而强大的在线图像生成器工具，支持自定义颜色、尺寸、文本和样式。",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://github.com/Muromi-Rikka/Test-Image-Generator",
      "query-input": "required name=q",
    },
  });

  const softwareSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "图像生成器",
    "applicationCategory": "ImageEditor",
    "operatingSystem": "All",
    "url": "https://github.com/Muromi-Rikka/Test-Image-Generator",
    "description": "一个简单而强大的在线图像生成器工具，支持自定义颜色、尺寸、文本和样式。无需安装，直接在浏览器中使用。",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY",
    },
  });

  // 设置 body 元素的主题类名
  useEffect(() => {
    if (colorScheme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.add("dark");
      document.body.classList.remove("light-theme");
    }
    else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      document.body.classList.remove("dark");
    }
  }, [colorScheme]);

  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ImageGenerator />
        {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteSchema }} />
        {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: softwareSchema }} />
      </div>
    </MantineProvider>
  );
}

export default App;
