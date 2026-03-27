export interface Preset {
  id: string;
  name: string;
  width: number;
  height: number;
  text: string;
  backgroundColor: string;
  gradientColors?: string[];
  textColor: string;
}

export interface ImageConfig {
  width: number;
  height: number;
  text: string;
  backgroundColor: string;
  gradientColors?: string[];
  textColor: string;
  isGradient: boolean;
}
