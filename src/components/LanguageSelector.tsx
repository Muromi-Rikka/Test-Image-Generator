import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";

const flagMap: Record<string, string> = {
  zh: "circle-flags--cn",
  en: "circle-flags--us",
  ja: "circle-flags--jp",
  ko: "circle-flags--kr",
  ru: "circle-flags--ru",
  fr: "circle-flags--fr",
  de: "circle-flags--de",
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
          <div className="flex items-center">
            <span className={`icon-[${flagClass}] mr-2`}></span>
            {option.option.label}
          </div>
        );
      }}
    />
  );
}
