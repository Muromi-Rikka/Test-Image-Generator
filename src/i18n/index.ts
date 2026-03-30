import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import zh from "./zh.json";
import "./types"; // 导入类型定义

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

// 获取浏览器语言
function getBrowserLanguage() {
  if (typeof window !== "undefined" && window.navigator && window.navigator.language) {
    const lang = window.navigator.language.split("-")[0]; // 只取语言代码，如 "zh-CN" 取 "zh"
    return resources[lang as keyof typeof resources] ? lang : "zh";
  }
  return "zh";
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getBrowserLanguage(), // 根据浏览器语言自动选择默认语言
    fallbackLng: "en", // 回退语言
    interpolation: {
      escapeValue: false, // React 已经会转义，不需要 i18next 再转义
    },
  });

export default i18n;
