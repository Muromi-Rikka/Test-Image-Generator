import type { ImageConfig } from "../types";
import { Box, ColorInput, Stack, Switch, Text } from "@mantine/core";
import * as React from "react";
import { useState } from "react";

interface ColorPickerProps {
  config: ImageConfig;
  updateConfig: (config: Partial<ImageConfig>) => void;
}

export function ColorPicker({ config, updateConfig }: ColorPickerProps) {
  const [gradientColor1, setGradientColor1] = useState(config.gradientColors?.[0] || "#ff0000");
  const [gradientColor2, setGradientColor2] = useState(config.gradientColors?.[1] || "#0000ff");

  const handleGradientToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    updateConfig({
      isGradient: checked,
      gradientColors: checked ? [gradientColor1, gradientColor2] : undefined,
    });
  };

  const handleGradientColorChange = (index: number, color: string) => {
    const newGradientColors = [...(config.gradientColors || [gradientColor1, gradientColor2])];
    newGradientColors[index] = color;
    updateConfig({ gradientColors: newGradientColors });

    if (index === 0) {
      setGradientColor1(color);
    }
    else {
      setGradientColor2(color);
    }
  };

  return (
    <Box>
      <Text size="sm" className="mb-2">颜色设置</Text>

      <Stack gap="sm">
        {/* 文字颜色 */}
        <Box>
          <Text size="sm" className="mb-2">文字颜色</Text>
          <ColorInput
            value={config.textColor}
            onChange={color => updateConfig({ textColor: color })}
            format="hex"
            withPicker
          />
        </Box>

        {/* 背景类型切换 */}
        <Box className="flex items-center justify-between">
          <Text size="sm">渐变色背景</Text>
          <Switch
            checked={config.isGradient}
            onChange={handleGradientToggle}
          />
        </Box>

        {/* 背景颜色 */}
        {!config.isGradient
          ? (
              <Box>
                <Text size="sm" className="mb-2">背景颜色</Text>
                <ColorInput
                  value={config.backgroundColor}
                  onChange={color => updateConfig({ backgroundColor: color })}
                  format="hex"
                  withPicker
                />
              </Box>
            )
          : (
              <Box>
                <Text size="sm" className="mb-2">渐变颜色</Text>
                <Stack gap="sm">
                  <Box>
                    <Text size="xs" className="mb-1">颜色 1</Text>
                    <ColorInput
                      value={gradientColor1}
                      onChange={color => handleGradientColorChange(0, color)}
                      format="hex"
                      withPicker
                    />
                  </Box>
                  <Box>
                    <Text size="xs" className="mb-1">颜色 2</Text>
                    <ColorInput
                      value={gradientColor2}
                      onChange={color => handleGradientColorChange(1, color)}
                      format="hex"
                      withPicker
                    />
                  </Box>
                </Stack>
              </Box>
            )}
      </Stack>
    </Box>
  );
}
