import { createContext, useState, FC, ReactElement, useEffect } from "react";
import {
  Config,
  ConfigContextState,
  DeviceType,
  Language,
  NavigatorApp,
  Theme,
} from "./types";

/**
 * Default values for context
 */
const contextDefaultValues: ConfigContextState = {
  configs: {
    theme: Theme.DARK,
    device: DeviceType.MOBILE,
    language: Language.EN,
    navigator: NavigatorApp.GOOGLE_MAPS,
  },
  setConfigs: () => undefined,
};

/**
 * Config context
 */
export const ConfigContext =
  createContext<ConfigContextState>(contextDefaultValues);

/**
 * Props types for context
 */
type ConfigsProviderProps = {
  configJson: Config;
  children: ReactElement;
};

/**
 * Provider for config context
 * @param configJson Config json
 * @param children Children
 * @returns Config context
 */
const ConfigsProvider: FC<ConfigsProviderProps> = ({
  configJson,
  children,
}: ConfigsProviderProps) => {
  const [configs, setConfigs] = useState<Config>(configJson);
  useEffect(() => {
    // write to local storage
    localStorage.setItem("configs", JSON.stringify(configs));
  }, [configs]);
  return (
    <ConfigContext.Provider value={{ configs, setConfigs }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigsProvider;
