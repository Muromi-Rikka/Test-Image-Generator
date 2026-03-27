import type en from "./en.json";

// 从英文翻译文件生成类型
export type TranslationKeys = typeof en;

// 扩展i18next的类型声明
declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: TranslationKeys;
    };
  }
}
