export type ConfigContextState = {
  configs: Config;
  setConfigs: (configs: Config) => void;
};

export enum Language {
  EN = "English",
  FR = "French",
  DE = "German",
  ES = "Spanish",
  IT = "Italian",
  PT = "Portuguese",
}

export enum Theme {
  LIGHT = "Light",
  DARK = "Dark",
  SYSTEM_SETTING = "System Theme",
}

export enum NavigatorApp {
  GOOGLE_MAPS = "Google Maps",
  WAZE = "Waze",
  APPLE_MAPS = "Apple Maps",
}

export enum DeviceType {
  MOBILE = "mobile",
  DESKTOP = "desktop",
}

export type Config = {
  theme: Theme;
  device: DeviceType;
  language: Language;
  navigator: NavigatorApp;
};
