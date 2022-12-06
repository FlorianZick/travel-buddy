import { IonApp, setupIonicReact } from "@ionic/react";

import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { locationOutline } from "ionicons/icons";

import Map from "./components/Map";
import SheetModal from "./components/SheetModal";

import { fetchWikiData } from "./api/fetchWikiData";

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

/* Theme variables */
import "./theme/variables.css";
import React, { ReactElement, useEffect, useState } from "react";
import { WikiApiDataModel } from "./models/wikiApiDataModel";

setupIonicReact();

const App: React.FC = (): ReactElement => {
  const [locationInfo, setLocationInfo] = useState<WikiApiDataModel[] | null>(
    null
  );

  // for developement use: fetch london data on start
  useEffect(() => {
    getWikiData("London");
  }, []);

  const getWikiData = async (title: string) => {
    const data = await fetchWikiData(title);
    setLocationInfo(data);
  };

  return (
    <IonApp>
      <Map>
        <SheetModal />
      </Map>
    </IonApp>
  );
};

export default App;
