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
type ProviderPorps = {
  configJson: Config;
  children: ReactElement;
};

/**
 * Provider for config context
 * @param props Props
 * @returns Config context
 */
const ConfigsProvider: FC<ProviderPorps> = (props: ProviderPorps) => {
  const [configs, setConfigs] = useState<Config>(props.configJson);
  useEffect(() => {
    // write to local storage
    localStorage.setItem("configs", JSON.stringify(configs));
  }, [configs]);
  return (
    <ConfigContext.Provider value={{ configs, setConfigs }}>
      {props.children}
    </ConfigContext.Provider>
  );
};

export default ConfigsProvider;
