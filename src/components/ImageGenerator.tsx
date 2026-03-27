import { Box, Button, Card, Grid, NumberInput, Stack, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useImageGenerator } from "../hooks/useImageGenerator";
import { ColorPicker } from "./ColorPicker";
import { LanguageSelector } from "./LanguageSelector";
import { PresetManager } from "./PresetManager";
import { SaveButton } from "./SaveButton";

// 十六进制颜色正则表达式
const HEX_COLOR_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export function ImageGenerator() {
  const { config, loading, updateConfig, save, imageRef } = useImageGenerator();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { t } = useTranslation();

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("app.title")}</h1>
        <LanguageSelector />
      </div>

      <Grid gutter="md">
        {/* 左侧设置部分（主体） */}
        <Grid.Col span={8}>
          <Card shadow="sm" className="mb-6 p-4">
            <h2 className="text-xl font-semibold mb-4">{t("imageGenerator.settings")}</h2>

            <Stack gap="md">
              {/* 尺寸设置 */}
              <Grid gutter="sm">
                <Grid.Col span={6}>
                  <Text size="sm" className="mb-2">{t("imageGenerator.width")}</Text>
                  <NumberInput
                    value={config.width}
                    step={50}
                    onChange={value => updateConfig({ width: typeof value === "number" ? value : Number(value) || 1 })}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" className="mb-2">{t("imageGenerator.height")}</Text>
                  <NumberInput
                    value={config.height}
                    step={50}
                    onChange={value => updateConfig({ height: typeof value === "number" ? value : Number(value) || 1 })}
                  />
                </Grid.Col>
              </Grid>

              {/* 文字设置 */}
              <Box>
                <Text size="sm" className="mb-2">{t("imageGenerator.text")}</Text>
                <Textarea
                  value={config.text}
                  onChange={e => updateConfig({ text: e.target.value })}
                  placeholder={t("imageGenerator.textPlaceholder")}
                  minRows={3}
                />
              </Box>

              {/* 文字大小设置 */}
              <Box>
                <Text size="sm" className="mb-2">{t("imageGenerator.textSize")}</Text>
                <NumberInput
                  value={config.textSize}
                  min={1}
                  step={1}
                  onChange={value => updateConfig({ textSize: typeof value === "number" ? value : Number(value) || 1 })}
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
                        // 将十六进制颜色转换为RGB
                        const hexToRgb = (hex: string) => {
                          const result = HEX_COLOR_REGEX.exec(hex);
                          return result
                            ? {
                                r: Number.parseInt(result[1], 16),
                                g: Number.parseInt(result[2], 16),
                                b: Number.parseInt(result[3], 16),
                              }
                            : { r: 0, g: 0, b: 0 };
                        };

                        // 计算相对亮度 (WCAG标准)
                        const getLuminance = (r: number, g: number, b: number) => {
                          const [rs, gs, bs] = [r, g, b].map((c) => {
                            const s = c / 255;
                            return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
                          });
                          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
                        };

                        // 生成随机颜色
                        const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

                        // 生成高对比度文字颜色
                        const getContrastTextColor = (bgColor: string) => {
                          const rgb = hexToRgb(bgColor);
                          const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
                          // 根据背景亮度选择黑色或白色文字
                          return luminance > 0.5 ? "#000000" : "#ffffff";
                        };

                        // 随机决定是否使用渐变
                        const isGradient = Math.random() > 0.5;

                        if (isGradient) {
                          // 生成两个随机渐变颜色
                          const gradientColors = [randomColor(), randomColor()];
                          // 计算渐变平均颜色用于确定文字颜色
                          const avgColor = gradientColors[0];
                          const textColor = getContrastTextColor(avgColor);
                          updateConfig({
                            isGradient: true,
                            gradientColors,
                            textColor,
                          });
                        }
                        else {
                          // 生成一个随机背景色
                          const backgroundColor = randomColor();
                          // 根据背景色自动选择高对比度文字颜色
                          const textColor = getContrastTextColor(backgroundColor);
                          updateConfig({
                            isGradient: false,
                            backgroundColor,
                            textColor,
                          });
                        }
                      }}
                      className="w-full"
                    >
                      {t("imageGenerator.randomColors")}
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Button
                      data-testid="save-preset-button"
                      onClick={() => setShowSaveModal(true)}
                      variant="outline"
                      className="w-full"
                    >
                      {t("imageGenerator.savePreset")}
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
                      textSize: preset.textSize,
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
            <h2 className="text-xl font-semibold mb-4">{t("preview.title")}</h2>

            <div className="relative border border-gray-200 overflow-hidden mb-6 bg-gray-100">
              {loading
                ? (
                    <div className="w-full h-64 flex items-center justify-center">
                      <Text>{t("preview.saving")}</Text>
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
                        fontSize: `${config.textSize}px`,
                        fontWeight: "bold",
                        textAlign: "center",
                        wordBreak: "break-word",
                        overflow: "hidden",
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
