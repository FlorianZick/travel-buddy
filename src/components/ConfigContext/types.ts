export type ConfigContextState = {
  configs: Config;
  setConfigs: (configs: Config) => void;
};

export enum Language {
  EN = "en",
  FR = "fr",
  DE = "de",
  ES = "es",
  IT = "it",
  PT = "pt",
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export enum NavigatorApp {
  GOOGLE_MAPS = "google_maps",
  WAZE = "waze",
  APPLE_MAPS = "apple_maps",
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
