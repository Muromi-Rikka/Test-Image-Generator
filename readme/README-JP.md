# テスト画像ジェネレータ

![License](https://img.shields.io/github/license/Muromi-Rikka/Test-Image-Generator)
![GitHub last commit](https://img.shields.io/github/last-commit/Muromi-Rikka/Test-Image-Generator)

---

[English](../README.md) | [中文](./README-CN.md) | [Русский язык](./README-RU.md)

> React、Mantine UI、Tailwind CSSを使用して構築されたシンプルかつ強力な画像生成ツールです。

## ✨ 特徴

- **画像カスタマイズ:** カスタム寸法、テキストコンテンツ、色を持つ画像を生成します。
- **色管理:** 単色とグラデーションの背景をサポートし、自動的にコントラストのあるテキスト色を生成します。
- **ランダムカラージェネレータ:** 最適な読みやすさのために、高いコントラストのテキストを備えたランダムなカラーコンビネーションを生成します。
- **プリセット管理:** 頻繁に使用する設定への迅速なアクセスのために、カスタムプリセットを保存および読み込みます。
- **多言語サポート:** 英語、中国語、日本語、ロシア語に対応しています。
- **画像エクスポート:** 生成した画像をJPG形式でローカルデバイスに保存します。
- **リアルタイムプレビュー:** 設定を調整すると即座に変更が表示されます。
- **レスポンシブデザイン:** さまざまな画面サイズでシームレスに動作します。

## 💻 技術スタック

- **フレームワーク/ライブラリ:** React (v19)
- **UIツールキット/スタイリング:** Mantine UI（`@mantine/core`）、Tailwind CSS（`tailwindcss`）
- **ビルドツール:** Rsbuild（`@rsbuild/core`）
- **言語:** TypeScript (v5.9.x)
- **CSS処理:** `autoprefixer`や`postcss-simple-vars`などのプラグインを備えたPostCSS
- **リンティング:** `@antfu/eslint-config`を備えたESLint
- **国際化:** i18next, react-i18next
- **画像処理:** @zumer/snapdom

依存関係の完全なリストについては[package.json](../package.json)を参照してください。

## 🚀 始め方

以下の手順に従ってプロジェクトをローカルで実行してください。

### 前提条件

以下がインストールされていることを確認してください：

- Node.js (推奨バージョン >= 18.x)
- パッケージマネージャー (npm, yarn または pnpm)

```bash
node -v
npm -v
```

### インストール

リポジトリをクローンして依存関係をインストールします：

```bash
# リポジトリをクローン
git clone https://github.com/Muromi-Rikka/Test-Image-Generator.git
cd Test-Image-Generator

# 依存関係のインストール
npm install
yarn install
pnpm install
```

### 開発

開発サーバーの起動:

```bash
npm run dev
yarn dev
pnpm dev
```

### ビルド

本番用にプロジェクトをビルド:

```bash
npm run build
yarn build
pnpm build
```

### プレビュー

ローカルで本番ビルドをプレビュー:

```bash
npm run preview
yarn preview
pnpm preview
```

### リンティング

コードベースのリント:

```bash
npm run lint
yarn lint
pnpm lint
```

## 🎨 使用方法

1. **寸法を設定:** 画像の幅と高さを調整します。
2. **テキストを追加:** 画像に表示するテキストを入力します。
3. **色をカスタマイズ:** 単色またはグラデーションの背景を選択し、テキストの色を設定します。
4. **ランダムな色を生成:** "ランダムな色の組み合わせ"ボタンをクリックして自動的な色の提案を取得します。
5. **プリセットを保存:** 現在の設定を将来の使用のためにプリセットとして保存します。
6. **プリセットを読み込み:** 保存されたプリセットから選択して、以前の設定をすばやく適用します。
7. **プレビュー:** 画像の効果をリアルタイムで確認します。
8. **画像を保存:** "ローカルに画像を保存"をクリックして生成された画像をダウンロードします。

## 🤝 コントリビューション

貢献は歓迎され、非常に高く評価されています！貢献するには以下の手順に従ってください：

1. リポジトリをフォークする
2. 機能ブランチを作成する（`git checkout -b feature/amazing-feature`）
3. 変更をコミットする（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュする（`git push origin feature/amazing-feature`）
5. Pull Requestを開く

プルリクエストを提出する前に、コードがプロジェクトのリントルールに準拠し、すべてのチェックに合格することを確認してください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細については[LICENSE](../LICENSE)ファイルを参照してください。

## 👤 作者

- **Rikka:** (admin@rikka.cc)
- **GitHub Profile:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 リンク

- **リポジトリ:** [https://github.com/Muromi-Rikka/Test-Image-Generator](https://github.com/Muromi-Rikka/Test-Image-Generator)
- **イシュー:** [https://github.com/Muromi-Rikka/Test-Image-Generator/issues](https://github.com/Muromi-Rikka/Test-Image-Generator/issues)
