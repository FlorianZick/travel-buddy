import { ReactElement } from "react";
import { IonContent, IonList } from "@ionic/react";
import DarkModeSetting from "./ThemeSetting";
import LanguageSetting from "./LanguageSetting";
import NavigatorAppSetting from "./NavigatorAppSetting";

/**
 * Functional component, scaffholds the settings
 * @returns Settings content component
 */
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
