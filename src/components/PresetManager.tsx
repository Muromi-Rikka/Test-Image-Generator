import type { ImageConfig, Preset } from "../types";
import { Box, Button, Input, Modal, Select, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { addPreset, deletePreset, getPresets } from "../utils/storage";

interface PresetManagerProps {
  currentConfig: ImageConfig;
  onLoadPreset: (preset: Preset) => void;
}

export function PresetManager({ currentConfig, onLoadPreset }: PresetManagerProps) {
  const [presets, setPresets] = useState<Preset[]>(() => getPresets());
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [presetName, setPresetName] = useState("");

  const handleSavePreset = () => {
    if (!presetName.trim())
      return;

    const newPreset = addPreset({
      name: presetName,
      width: currentConfig.width,
      height: currentConfig.height,
      text: currentConfig.text,
      backgroundColor: currentConfig.backgroundColor,
      gradientColors: currentConfig.gradientColors,
      textColor: currentConfig.textColor,
    });

    setPresets([...presets, newPreset]);
    setShowSaveModal(false);
    setPresetName("");
  };

  const handleDeletePreset = (presetId: string) => {
    deletePreset(presetId);
    setPresets(presets.filter(preset => preset.id !== presetId));
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      onLoadPreset(preset);
    }
  };

  return (
    <Box>
      <Text size="sm" className="mb-2">预设管理</Text>
      <Stack gap="sm">
        <Select
          placeholder="选择预设"
          data={presets.map(preset => ({
            value: preset.id,
            label: preset.name,
          }))}
          onChange={value => value && handleLoadPreset(value)}
          className="mb-2"
        />

        <Button
          onClick={() => setShowSaveModal(true)}
          variant="outline"
          className="mt-2"
        >
          保存当前设置为预设
        </Button>

        {presets.length > 0 && (
          <Stack gap="sm" className="mt-2">
            {presets.map(preset => (
              <Box key={preset.id} className="flex justify-between items-center p-2 border rounded">
                <Text size="sm">{preset.name}</Text>
                <Button
                  size="sm"
                  variant="outline"
                  color="red"
                  onClick={() => handleDeletePreset(preset.id)}
                >
                  删除
                </Button>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>

      <Modal
        opened={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="保存预设"
      >
        <Stack gap="md">
          <Input
            placeholder="预设名称"
            value={presetName}
            onChange={e => setPresetName(e.target.value)}
          />
          <div className="flex gap-sm">
            <Button onClick={() => setShowSaveModal(false)} variant="outline">
              取消
            </Button>
            <Button onClick={handleSavePreset}>
              保存
            </Button>
          </div>
        </Stack>
      </Modal>
    </Box>
  );
}
