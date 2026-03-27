import { Box, Card, Grid, NumberInput, Stack, Text, Textarea } from "@mantine/core";
import { useEffect } from "react";
import { useImageGenerator } from "../hooks/useImageGenerator";
import { ColorPicker } from "./ColorPicker";
import { PresetManager } from "./PresetManager";
import { SaveButton } from "./SaveButton";

export function ImageGenerator() {
  const { config, previewUrl, loading, updateConfig, generate, save } = useImageGenerator();

  useEffect(() => {
    generate();
  }, [config, generate]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">测试图片生成器</h1>

      <Grid gutter="md">
        {/* 左侧设置部分（主体） */}
        <Grid.Col span={8}>
          <Card shadow="sm" className="mb-6 p-4">
            <h2 className="text-xl font-semibold mb-4">图片设置</h2>

            <Stack gap="md">
              {/* 尺寸设置 */}
              <Grid gutter="sm">
                <Grid.Col span={6}>
                  <Text size="sm" className="mb-2">宽度 (px)</Text>
                  <NumberInput
                    value={config.width}
                    min={200}
                    max={2000}
                    step={50}
                    onChange={value => updateConfig({ width: Number(value) || 200 })}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" className="mb-2">高度 (px)</Text>
                  <NumberInput
                    value={config.height}
                    min={200}
                    max={2000}
                    step={50}
                    onChange={value => updateConfig({ height: Number(value) || 200 })}
                  />
                </Grid.Col>
              </Grid>

              {/* 文字设置 */}
              <Box>
                <Text size="sm" className="mb-2">文字内容</Text>
                <Textarea
                  value={config.text}
                  onChange={e => updateConfig({ text: e.target.value })}
                  placeholder="请输入图片文字"
                  minRows={3}
                />
              </Box>

              {/* 颜色设置 */}
              <ColorPicker
                config={config}
                updateConfig={updateConfig}
              />

              {/* 预设管理 */}
              <PresetManager
                currentConfig={config}
                onLoadPreset={(preset) => {
                  updateConfig({
                    width: preset.width,
                    height: preset.height,
                    text: preset.text,
                    backgroundColor: preset.backgroundColor,
                    gradientColors: preset.gradientColors,
                    textColor: preset.textColor,
                    isGradient: !!preset.gradientColors && preset.gradientColors.length >= 2,
                  });
                }}
              />
            </Stack>
          </Card>
        </Grid.Col>

        {/* 右侧预览部分（缩小） */}
        <Grid.Col span={4}>
          <Card shadow="sm" className="mb-6 p-4 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">预览</h2>

            <div className="relative border border-gray-200 rounded-lg overflow-hidden mb-6 bg-gray-100">
              {loading
                ? (
                    <div className="w-full h-64 flex items-center justify-center">
                      <Text>生成中...</Text>
                    </div>
                  )
                : previewUrl
                  ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full max-h-[300px] object-contain"
                      />
                    )
                  : (
                      <div className="w-full h-64 flex items-center justify-center">
                        <Text>请调整设置生成图片</Text>
                      </div>
                    )}
            </div>

            <SaveButton
              onSave={() => save()}
              loading={loading}
            />
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
