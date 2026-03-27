import { Button, Stack, Text } from "@mantine/core";

interface SaveButtonProps {
  onSave: () => void;
  loading: boolean;
}

export function SaveButton({ onSave, loading }: SaveButtonProps) {
  return (
    <Stack gap="sm" align="center">
      <Button
        onClick={onSave}
        loading={loading}
        size="lg"
        className="w-full max-w-md"
      >
        保存图片到本地
      </Button>
      <Text size="sm" color="dimmed">
        图片将以JPG格式压缩保存
      </Text>
    </Stack>
  );
}
