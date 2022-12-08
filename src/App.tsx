import { IonApp, setupIonicReact } from "@ionic/react";

import Map from "./components/Map";
import SheetModal from "./components/SheetModal/SheetModal";

import { fetchWikiData } from "./api/fetchWikiData";
import { reverseGeoEncoding } from "./api/reverseGeoEncoding";

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

/* Theme variables */
import "./theme/variables.css";
import React, { ReactElement, useEffect, useState } from "react";
import { WikiApiDataModel } from "./models/wikiApiDataModel";
import Menu from "./components/Menu/menu";

setupIonicReact();

const App: React.FC = (): ReactElement => {
  const [locationInfo, setLocationInfo] = useState<WikiApiDataModel[] | null>(
    null
  );

  // for developement use: fetch london data on start, (fetch geo data)
  useEffect(() => {
    getWikiData("London");
    getGeoAddressData(51.166, 10.452);
  }, []);
  let data: WikiApiDataModel[] = [];
  const getWikiData = async (title: string) => {
    data = await fetchWikiData(title);
    // print data

    /*
    data.map((item, i) => {
      console.log("item ", i);
      console.log("title ", item.title);
      console.log("description ", item.snippet);
      console.log("\n");
    });
*/
    setLocationInfo(data);
  };

  const getGeoAddressData = async (lat: number, lon: number) => {
    const data = await reverseGeoEncoding(lat, lon);
    console.log("App geo data:", data);
  }

  return (
    <IonApp>
      <Map>
        <Menu />
        <SheetModal data={locationInfo}/>
      </Map>
    </IonApp>
  );
};

export default App;
