import { Button, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface SaveButtonProps {
  onSave: () => void;
  loading: boolean;
}

export function SaveButton({ onSave, loading }: SaveButtonProps) {
  const { t } = useTranslation();
  return (
    <Stack gap="sm" align="center">
      <Button
        onClick={onSave}
        loading={loading}
        size="lg"
        className="w-full max-w-md save-button driver-guide-save"
        leftSection={<span className="icon-[lucide--download]"></span>}
      >
        {t("saveButton.save")}
      </Button>
      <Text size="sm" color="dimmed">
        {t("saveButton.formatInfo")}
      </Text>
    </Stack>
  );
}
