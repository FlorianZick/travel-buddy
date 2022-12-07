import { ReactElement, useContext } from "react";
import { IonContent, IonList } from "@ionic/react";

import "./settings.css";
import { ConfigContext } from "./ConfigContext/ConfigContext";
import DarkModeSetting from "./darkmodeSetting";
import LanguageSetting from "./languageSetting";
import NavigatorAppSetting from "./navigatorAppSetting";

// interface for props

const SettingsContent: React.FC = (): ReactElement => {
  return (
    <IonContent className="ion-padding">
      <IonList inset={true}>
        <DarkModeSetting />
        <LanguageSetting />
        <NavigatorAppSetting />
      </IonList>
    </IonContent>
  );
};

export default SettingsContent;
