import { Box, Button, Card, Grid, NumberInput, Stack, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import { useImageGenerator } from "../hooks/useImageGenerator";
import { ColorPicker } from "./ColorPicker";
import { PresetManager } from "./PresetManager";
import { SaveButton } from "./SaveButton";

export function ImageGenerator() {
  const { config, loading, updateConfig, save, imageRef } = useImageGenerator();
  const [showSaveModal, setShowSaveModal] = useState(false);

  // 处理渐变背景样式
  const getBackgroundStyle = () => {
    if (config.isGradient && config.gradientColors && config.gradientColors.length >= 2) {
      const gradientColors = config.gradientColors.join(", ");
      return {
        background: `linear-gradient(135deg, ${gradientColors})`,
      };
    }
    return {
      backgroundColor: config.backgroundColor,
    };
  };

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
                    onChange={value => updateConfig({ width: typeof value === "number" ? value : Number(value) || 200 })}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" className="mb-2">高度 (px)</Text>
                  <NumberInput
                    value={config.height}
                    min={200}
                    max={2000}
                    step={50}
                    onChange={value => updateConfig({ height: typeof value === "number" ? value : Number(value) || 200 })}
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

              {/* 随机颜色和预设管理 */}
              <Box>
                {/* 按钮行 */}
                <Grid gutter="sm" className="mb-4">
                  <Grid.Col span={6}>
                    <Button
                      onClick={() => {
                        // 生成随机颜色
                        const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

                        // 随机决定是否使用渐变
                        const isGradient = Math.random() > 0.5;

                        if (isGradient) {
                          // 生成两个随机渐变颜色
                          const gradientColors = [randomColor(), randomColor()];
                          updateConfig({
                            isGradient: true,
                            gradientColors,
                            textColor: randomColor(),
                          });
                        }
                        else {
                          // 生成一个随机背景色
                          const backgroundColor = randomColor();
                          // 确保文字颜色与背景色有足够对比度
                          const textColor = randomColor();
                          updateConfig({
                            isGradient: false,
                            backgroundColor,
                            textColor,
                          });
                        }
                      }}
                      className="w-full"
                    >
                      随机颜色组合
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Button
                      data-testid="save-preset-button"
                      onClick={() => setShowSaveModal(true)}
                      variant="outline"
                      className="w-full"
                    >
                      保存当前设置为预设
                    </Button>
                  </Grid.Col>
                </Grid>

                {/* 预设列表 */}
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
                  showSaveModal={showSaveModal}
                  onSaveModalClose={() => setShowSaveModal(false)}
                />
              </Box>
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
                      <Text>保存中...</Text>
                    </div>
                  )
                : (
                    <div
                      ref={imageRef}
                      style={{
                        ...getBackgroundStyle(),
                        width: `${config.width}px`,
                        height: `${config.height}px`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: config.textColor,
                        fontSize: "48px",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "20px",
                        wordBreak: "break-word",
                      }}
                      className="max-w-full max-h-[300px] object-contain overflow-auto"
                    >
                      {config.text}
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
