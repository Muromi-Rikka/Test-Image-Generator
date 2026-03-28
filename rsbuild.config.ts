import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import tailwind from "@tailwindcss/postcss";
import postcssImport from "postcss-import";
import postcssPresetMantine from "postcss-preset-mantine";
import postcssSimpleVars from "postcss-simple-vars";

export default defineConfig({
  server: {
    port: 5000,
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          postcssImport(),
          postcssPresetMantine(),
          postcssSimpleVars({
            variables: {
              "mantine-breakpoint-xs": "36em",
              "mantine-breakpoint-sm": "48em",
              "mantine-breakpoint-md": "62em",
              "mantine-breakpoint-lg": "75em",
              "mantine-breakpoint-xl": "88em",
            },
          }),
          tailwind,
        ],
      },
    },
  },
  html: {
    title: "图像生成器 - 免费在线创建自定义图像工具",
    meta: [
      {
        name: "description",
        content: "一个简单而强大的在线图像生成器工具，支持自定义颜色、尺寸、文本和样式。无需安装，直接在浏览器中使用，免费创建高质量的自定义图像，适用于社交媒体、网站设计和个人项目。",
      },
      {
        name: "keywords",
        content: "图像生成器,在线图像创建,自定义图像,免费图像工具,React图像生成,社交媒体图像,网站设计图像",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      { property: "og:title", content: "图像生成器 - 免费在线创建自定义图像工具" },
      { property: "og:description", content: "一个简单而强大的在线图像生成器工具，支持自定义颜色、尺寸、文本和样式。无需安装，直接在浏览器中使用，免费创建高质量的自定义图像。" },
      { property: "og:url", content: "https://github.com/Muromi-Rikka/Test-Image-Generator" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://via.placeholder.com/1200x630.png?text=图像生成器" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "图像生成器 - 免费在线创建自定义图像工具" },
      { name: "twitter:description", content: "一个简单而强大的在线图像生成器工具，支持自定义颜色、尺寸、文本和样式。无需安装，直接在浏览器中使用，免费创建高质量的自定义图像。" },
      { name: "twitter:image", content: "https://via.placeholder.com/1200x630.png?text=图像生成器" },
    ],
  },
  plugins: [pluginReact()],
});
