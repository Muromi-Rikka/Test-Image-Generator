import { ImageGenerator } from "./components/ImageGenerator";
import "./globals.css";

function App() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <ImageGenerator />
      {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteSchema }} />
      {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: softwareSchema }} />
    </div>
  );
}

export default App;
