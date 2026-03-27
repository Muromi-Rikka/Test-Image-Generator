import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import zh from "./zh.json";

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "zh", // 默认语言
    fallbackLng: "en", // 回退语言
    interpolation: {
      escapeValue: false, // React 已经会转义，不需要 i18next 再转义
    },
  });

export default i18n;
