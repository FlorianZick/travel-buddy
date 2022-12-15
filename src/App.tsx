import { IonApp, setupIonicReact } from "@ionic/react";

import Map from "./components/Map";
import SheetModal from "./components/SheetModal/SheetModal";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./global.css";

import "./i18n/config";

/* Theme variables */
import "./theme/variables.css";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { WikiApiDataModel } from "./models/wikiApiDataModel";
import Menu from "./components/Menu/menu";
import { useTranslation } from "react-i18next";
import { ConfigContext } from "./components/ConfigContext/ConfigContext";

setupIonicReact();

const App: React.FC = (): ReactElement => {
  const [locationInfo, setLocationInfo] = useState<WikiApiDataModel[] | null>(
    null
  );

  const { i18n } = useTranslation();
  const { configs } = useContext(ConfigContext);

  useEffect(() => {
    i18n.changeLanguage(configs.language);
  }, [configs.language]);

  return (
    <IonApp>
      <Map onLocationChange={setLocationInfo}>
        <Menu />
        <SheetModal data={locationInfo} />
      </Map>
    </IonApp>
  );
};

export default App;
