import React, { createContext, useState, FC, ReactElement } from "react";
import {
  Config,
  ConfigContextState,
  DeviceType,
  Language,
  NavigatorApp,
  Theme,
} from "./types";
const contextDefaultValues: ConfigContextState = {
  configs: {
    theme: Theme.LIGHT,
    device: DeviceType.MOBILE,
    language: Language.EN,
    navigator: NavigatorApp.GOOGLE_MAPS,
  },
};

export const ConfigContext =
  createContext<ConfigContextState>(contextDefaultValues);
type ProviderPorps = {
  configJson: Config;
  children: ReactElement;
};
const ConfigsProvider: FC<ProviderPorps> = (props) => {
  const [configs, setConfigs] = useState<Config>(props.configJson);

  return (
    <ConfigContext.Provider value={{ configs }}>
      {props.children}
    </ConfigContext.Provider>
  );
};
export default ConfigsProvider;
