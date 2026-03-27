import type { Preset } from "../types";

const STORAGE_KEY = "image-generator-presets";

export function getPresets(): Preset[] {
  try {
    const presetsJson = localStorage.getItem(STORAGE_KEY);
    return presetsJson ? JSON.parse(presetsJson) : [];
  }
  catch (error) {
    console.error("Error getting presets from localStorage:", error);
    return [];
  }
}

export function savePresets(presets: Preset[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  }
  catch (error) {
    console.error("Error saving presets to localStorage:", error);
  }
}

export function addPreset(preset: Omit<Preset, "id">): Preset {
  const presets = getPresets();
  const newPreset: Preset = {
    ...preset,
    id: Date.now().toString(),
  };
  presets.push(newPreset);
  savePresets(presets);
  return newPreset;
}

export function updatePreset(updatedPreset: Preset): void {
  const presets = getPresets();
  const index = presets.findIndex(preset => preset.id === updatedPreset.id);
  if (index !== -1) {
    presets[index] = updatedPreset;
    savePresets(presets);
  }
}

export function deletePreset(presetId: string): void {
  const presets = getPresets();
  const filteredPresets = presets.filter(preset => preset.id !== presetId);
  savePresets(filteredPresets);
}
