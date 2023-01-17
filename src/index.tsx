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
import InformationsProvider, {
  CurPosInfoContext,
} from "./components/InformationContext/InformationContext";

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
