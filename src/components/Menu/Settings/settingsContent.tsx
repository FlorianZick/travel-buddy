import { ReactElement } from "react";
import { IonContent, IonList } from "@ionic/react";

import DarkModeSetting from "./themeSetting";
import LanguageSetting from "./languageSetting";
import NavigatorAppSetting from "./navigatorAppSetting";

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
