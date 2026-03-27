# Test Image Generator

![License](https://img.shields.io/github/license/Muromi-Rikka/Test-Image-Generator)
![GitHub last commit](https://img.shields.io/github/last-commit/Muromi-Rikka/Test-Image-Generator)

---

[中文](./readme/README-CN.md) | [日本語](./readme/README-JP.md) | [Русский язык](./readme/README-RU.md)

> A simple yet powerful image generator tool built with React, Mantine UI, and Tailwind CSS.

## ✨ Features

- **Image Customization:** Generate images with custom dimensions, text content, and colors.
- **Color Management:** Support for solid colors and gradient backgrounds with automatic contrast text color.
- **Random Color Generator:** Generate random color combinations with high contrast text for optimal readability.
- **Preset Management:** Save and load custom presets for quick access to frequently used settings.
- **Multi-language Support:** Available in English, Chinese, Japanese, and Russian.
- **Image Export:** Save generated images to local device in JPG format.
- **Real-time Preview:** Instantly see changes as you adjust settings.
- **Responsive Design:** Works seamlessly on different screen sizes.

## 💻 Tech Stack

- **Framework/Library:** React (v19)
- **UI Toolkit/Styling:** Mantine UI (`@mantine/core`), Tailwind CSS (`tailwindcss`)
- **Build Tool:** Rsbuild (`@rsbuild/core`)
- **Language:** TypeScript (v5.9.x)
- **CSS Processing:** PostCSS with plugins like `autoprefixer` and `postcss-simple-vars`
- **Linting:** ESLint with `@antfu/eslint-config`
- **Internationalization:** i18next, react-i18next
- **Image Processing:** @zumer/snapdom

See the [package.json](./package.json) for a full list of dependencies.

## 🚀 Getting Started

Follow these instructions to get the project running locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 18.x recommended)
- Package manager (npm, yarn, or pnpm)

```bash
node -v
npm -v
```

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/Muromi-Rikka/Test-Image-Generator.git
cd Test-Image-Generator

# Install dependencies
npm install
yarn install
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
yarn dev
pnpm dev
```

### Build

Build the project for production:

```bash
npm run build
yarn build
pnpm build
```

### Preview

Preview the production build locally:

```bash
npm run preview
yarn preview
pnpm preview
```

### Linting

Lint the codebase:

```bash
npm run lint
yarn lint
pnpm lint
```

## 🎨 Usage

1. **Set Dimensions:** Adjust the width and height of your image.
2. **Add Text:** Enter the text you want to display on the image.
3. **Customize Colors:** Choose between solid color or gradient background, and set text color.
4. **Generate Random Colors:** Click the "Random Color Combination" button for automatic color suggestions.
5. **Save Presets:** Save your current settings as a preset for future use.
6. **Load Presets:** Select from saved presets to quickly apply previous settings.
7. **Preview:** See the real-time preview of your image.
8. **Save Image:** Click "Save Image to Local" to download the generated image.

## 🤝 Contributing

Contributions are welcome and greatly appreciated! Please follow these steps to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code adheres to the project's linting rules and passes all checks before submitting a PR.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👤 Author

- **Rikka:** (admin@rikka.cc)
- **GitHub Profile:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 Links

- **Repository:** [https://github.com/Muromi-Rikka/Test-Image-Generator](https://github.com/Muromi-Rikka/Test-Image-Generator)
- **Issues:** [https://github.com/Muromi-Rikka/Test-Image-Generator/issues](https://github.com/Muromi-Rikka/Test-Image-Generator/issues)
