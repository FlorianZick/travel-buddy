import { ReactElement, useContext } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import "./settings.css";
import { Language, NavigatorApp, Theme } from "./ConfigContext/types";
import { ConfigContext } from "./ConfigContext/ConfigContext";

const LanguageSetting: React.FC = (): ReactElement => {
  const { configs } = useContext(ConfigContext);

  return (
    <IonItem>
      <IonLabel>Language</IonLabel>
      <IonSelect
        placeholder={configs.language}
        onIonChange={(e) => (configs.language = e.detail.value)}
      >
        {Object.keys(Language).map((key) => {
          return (
            <IonSelectOption key={key} value={key}>
              {key}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    </IonItem>
  );
};

export default LanguageSetting;
