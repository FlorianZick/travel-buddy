import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { setupIonicReact } from "@ionic/react";
import ConfigsProvider from "./components/ConfigContext/ConfigContext";
import {
  Config,
  DeviceType,
  Language,
  NavigatorApp,
  Theme,
} from "./components/ConfigContext/types";
import InformationsProvider from "./components/InformationContext/InformationContext";

/**
 * Enum for the component mode
 */
enum Mode {
  IOS = "ios",
  MD = "md",
}

/**
 * Checks if the device is an apple device
 * @returns is apple device
 */
function isAppleDevice(): boolean {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

/**
 * Detecs the mode based on the device
 * @returns device mode
 */
function detectMode(): Mode {
  if (isAppleDevice()) {
    return Mode.IOS;
  } else {
    return Mode.MD;
  }
}

/**
 * Set device mode
 */
setupIonicReact({
  mode: detectMode(),
});

// read config data from local storage
const configStorageData = localStorage.getItem("configs");

// set config data from local storage, if no data is found, set default values
const configData: Config = configStorageData
  ? JSON.parse(configStorageData)
  : {
      theme: Theme.LIGHT,
      device: DeviceType.MOBILE,
      language: Language.EN,
      navigator: NavigatorApp.GOOGLE_MAPS,
    };

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // React strict mode will render twice in development phase, comment out to prevent this behaviour
  // <React.StrictMode>
  <InformationsProvider
    curPosInformationInfo={null}
    isModalOpen={false}
    locationInfo={null}
    showCurPosInformation={false}
  >
    <ConfigsProvider configJson={configData}>
      <App />
    </ConfigsProvider>
  </InformationsProvider>
  // </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
