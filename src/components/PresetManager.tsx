import type { ImageConfig, Preset } from "../types";
import { Box, Button, Modal, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { addPreset, deletePreset, getPresets, updatePreset } from "../utils/storage";

interface PresetManagerProps {
  currentConfig: ImageConfig;
  onLoadPreset: (preset: Preset) => void;
  showSaveModal?: boolean;
  onSaveModalClose?: () => void;
}

export function PresetManager({ currentConfig, onLoadPreset, showSaveModal = false, onSaveModalClose }: PresetManagerProps) {
  const [presets, setPresets] = useState<Preset[]>(() => getPresets());
  const [internalShowSaveModal, setInternalShowSaveModal] = useState(false);

  // 当外部showSaveModal变化时，更新内部状态
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (showSaveModal && !internalShowSaveModal) {
      // 使用setTimeout来避免直接在useEffect中调用setState
      timeoutId = setTimeout(() => {
        setInternalShowSaveModal(true);
      }, 0);
    }

    // 清理函数
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showSaveModal, internalShowSaveModal]);

  // 当内部模态框关闭时，通知外部
  const handleCloseModal = () => {
    setInternalShowSaveModal(false);
    if (onSaveModalClose) {
      onSaveModalClose();
    }
  };

  const handleSavePreset = () => {
    if (!currentConfig.text.trim())
      return;

    // 检查是否已存在相同文字内容的预设
    const existingPresetIndex = presets.findIndex(preset => preset.text === currentConfig.text);

    if (existingPresetIndex !== -1) {
      // 更新现有预设
      const updatedPreset: Preset = {
        ...presets[existingPresetIndex],
        width: currentConfig.width,
        height: currentConfig.height,
        backgroundColor: currentConfig.backgroundColor,
        gradientColors: currentConfig.gradientColors,
        textColor: currentConfig.textColor,
      };

      updatePreset(updatedPreset);
      const updatedPresets = [...presets];
      updatedPresets[existingPresetIndex] = updatedPreset;
      setPresets(updatedPresets);
    }
    else {
      // 添加新预设
      const newPreset = addPreset({
        name: currentConfig.text,
        width: currentConfig.width,
        height: currentConfig.height,
        text: currentConfig.text,
        backgroundColor: currentConfig.backgroundColor,
        gradientColors: currentConfig.gradientColors,
        textColor: currentConfig.textColor,
      });

      setPresets([...presets, newPreset]);
    }

    handleCloseModal();
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
      <Stack gap="sm">
        {presets.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {presets.map(preset => (
              <Box
                key={preset.id}
                className="border rounded overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleLoadPreset(preset.id)}
              >
                <div
                  className="h-24"
                  style={{
                    background: preset.gradientColors && preset.gradientColors.length >= 2
                      ? `linear-gradient(45deg, ${preset.gradientColors.join(", ")})`
                      : preset.backgroundColor,
                  }}
                >
                  <div className="h-full flex items-center justify-center p-2">
                    <Text
                      color={preset.textColor}
                      size="sm"
                      className="text-center font-bold break-words"
                    >
                      {preset.text || "无文字"}
                    </Text>
                  </div>
                </div>
                <div className="p-2 bg-gray-50">
                  <Text size="xs" className="text-gray-600">
                    {preset.width}
                    ×
                    {preset.height}
                    px
                  </Text>
                  <div className="flex justify-end mt-1">
                    <Button
                      size="xs"
                      variant="outline"
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePreset(preset.id);
                      }}
                    >
                      删除
                    </Button>
                  </div>
                </div>
              </Box>
            ))}
          </div>
        )}
      </Stack>

      <Modal
        opened={internalShowSaveModal}
        onClose={handleCloseModal}
        title="保存预设"
      >
        <Stack gap="md">
          <div className="p-4 bg-gray-50 rounded">
            <Text size="sm">预设将以当前文字内容作为标识</Text>
            <Text size="sm" className="mt-2 font-semibold">{currentConfig.text || "无文字"}</Text>
          </div>
          <div className="flex gap-sm">
            <Button onClick={handleCloseModal} variant="outline">
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
