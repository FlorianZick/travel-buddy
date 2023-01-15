/**
 * State of config context
 */
export type ConfigContextState = {
    configs: Config;
    setConfigs: (configs: Config) => void;
};

/**
 * Enum for languages
 */
export enum Language {
    EN = "English",
    FR = "French",
    DE = "German",
    ES = "Spanish",
    IT = "Italian",
    PT = "Portuguese",
}

/**
 * Enum for themes
 */
export enum Theme {
    LIGHT = "Light",
    DARK = "Dark",
    SYSTEM_SETTING = "System Theme",
}

/**
 * Enum for navigator apps
 */
export enum NavigatorApp {
    GOOGLE_MAPS = "Google Maps",
    WAZE = "Waze",
    APPLE_MAPS = "Apple Maps",
}

/**
 * Enum for device type
 */
export enum DeviceType {
    MOBILE = "mobile",
    DESKTOP = "desktop",
}

/**
 * Model for config context
 */
export type Config = {
    theme: Theme;
    device: DeviceType;
    language: Language;
    navigator: NavigatorApp;
};
