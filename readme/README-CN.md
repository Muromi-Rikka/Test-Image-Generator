# 测试图片生成器

![License](https://img.shields.io/github/license/Muromi-Rikka/Test-Image-Generator)
![GitHub last commit](https://img.shields.io/github/last-commit/Muromi-Rikka/Test-Image-Generator)

---

[English](../README.md) | [日本語](./README-JP.md) | [Русский язык](./README-RU.md)

> 一个简单而强大的图片生成工具，使用React、Mantine UI和Tailwind CSS构建。

## ✨ 特性

- **图片定制:** 生成具有自定义尺寸、文本内容和颜色的图片。
- **颜色管理:** 支持纯色和渐变背景，自动生成对比文本颜色。
- **随机颜色生成:** 生成随机颜色组合，自动确保文本与背景的高对比度，提高可读性。
- **预设管理:** 保存和加载自定义预设，快速访问常用设置。
- **多语言支持:** 支持英语、中文、日语和俄语。
- **图片导出:** 将生成的图片以JPG格式保存到本地设备。
- **实时预览:** 调整设置时即时查看效果。
- **响应式设计:** 在不同屏幕尺寸上无缝工作。

## 💻 技术栈

- **框架/库:** React (v19)
- **UI工具包/样式:** Mantine UI（`@mantine/core`）、Tailwind CSS（`tailwindcss`）
- **构建工具:** Rsbuild（`@rsbuild/core`）
- **语言:** TypeScript (v5.9.x)
- **CSS处理:** PostCSS及插件如`autoprefixer`和`postcss-simple-vars`
- **代码检查:** ESLint配合`@antfu/eslint-config`
- **国际化:** i18next, react-i18next
- **图片处理:** @zumer/snapdom

完整依赖列表参见[package.json](../package.json)。

## 🚀 开始使用

按照以下说明在本地运行项目。

### 前提条件

确保已安装以下软件：

- Node.js (推荐 >= 18.x 版本)
- 包管理器 (npm, yarn 或 pnpm)

```bash
node -v
npm -v
```

### 安装步骤

克隆仓库并安装依赖：

```bash
# 克隆仓库
git clone https://github.com/Muromi-Rikka/Test-Image-Generator.git
cd Test-Image-Generator

# 安装依赖
npm install
yarn install
pnpm install
```

### 开发

启动开发服务器:

```bash
npm run dev
yarn dev
pnpm dev
```

### 构建

为生产环境构建项目:

```bash
npm run build
yarn build
pnpm build
```

### 预览

在本地预览生产构建:

```bash
npm run preview
yarn preview
pnpm preview
```

### 代码检查

对代码库进行检查:

```bash
npm run lint
yarn lint
pnpm lint
```

## 🎨 使用方法

1. **设置尺寸:** 调整图片的宽度和高度。
2. **添加文本:** 输入要在图片上显示的文本。
3. **自定义颜色:** 选择纯色或渐变背景，并设置文本颜色。
4. **生成随机颜色:** 点击"随机颜色组合"按钮获取自动颜色建议。
5. **保存预设:** 将当前设置保存为预设，以便将来使用。
6. **加载预设:** 从保存的预设中选择，快速应用之前的设置。
7. **预览:** 实时查看图片效果。
8. **保存图片:** 点击"保存图片到本地"下载生成的图片。

## 🤝 贡献指南

欢迎贡献，非常感谢您的支持！请按照以下步骤进行贡献：

1. Fork 本仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交您的更改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开Pull Request

请确保您的代码符合项目的检查规则，并在提交PR之前通过所有检查。

## 📄 许可证

该项目采用MIT许可证 - 详情请见[LICENSE](../LICENSE)文件。

## 👤 作者

- **Rikka:** (admin@rikka.cc)
- **GitHub Profile:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 链接

- **仓库:** [https://github.com/Muromi-Rikka/Test-Image-Generator](https://github.com/Muromi-Rikka/Test-Image-Generator)
- **问题:** [https://github.com/Muromi-Rikka/Test-Image-Generator/issues](https://github.com/Muromi-Rikka/Test-Image-Generator/issues)
