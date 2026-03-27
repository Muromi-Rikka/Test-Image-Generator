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
      ]}
      className="w-40"
    />
  );
}
