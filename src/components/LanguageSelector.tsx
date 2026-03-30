import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";

const flagMap: Record<string, string> = {
  zh: "icon-[circle-flags--cn]",
  en: "icon-[circle-flags--us]",
  ja: "icon-[circle-flags--jp]",
  ko: "icon-[circle-flags--kr]",
  ru: "icon-[circle-flags--ru]",
  fr: "icon-[circle-flags--fr]",
  de: "icon-[circle-flags--de]",
};

const i18nData = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "ru", label: "Русский" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string | null) => {
    if (value) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      data={i18nData}
      className="w-40"
      leftSection={<span className="icon-[lucide--globe]"></span>}
      renderOption={(option) => {
        const flagClass = flagMap[option.option.value];
        return (
          <div className="flex items-center text-gray-800 dark:text-gray-500">
            <span className={`${flagClass} mr-2`}></span>
            {option.option.label}
          </div>
        );
      }}
    />
  );
}
