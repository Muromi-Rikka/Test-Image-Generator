import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";

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
      data={[
        { value: "zh", label: "中文" },
        { value: "en", label: "English" },
        { value: "ja", label: "日本語" },
        { value: "ko", label: "한국어" },
        { value: "ru", label: "Русский" },
        { value: "fr", label: "Français" },
        { value: "de", label: "Deutsch" },
      ]}
      className="w-40"
      leftSection={<span className="icon-[lucide--globe]"></span>}
    />
  );
}
