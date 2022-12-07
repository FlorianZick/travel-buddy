import { createContext, useState, FC, ReactElement, useEffect } from "react";
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
  setConfigs: () => undefined,
};

export const ConfigContext =
  createContext<ConfigContextState>(contextDefaultValues);
type ProviderPorps = {
  configJson: Config;
  children: ReactElement;
};
const ConfigsProvider: FC<ProviderPorps> = (props) => {
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
