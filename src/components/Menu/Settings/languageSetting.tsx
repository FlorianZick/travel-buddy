import { ReactElement, useContext } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import { Language } from "./../../ConfigContext/types";
import { ConfigContext } from "./../../ConfigContext/ConfigContext";

const LanguageSetting: React.FC = (): ReactElement => {
  const { configs, setConfigs } = useContext(ConfigContext);

  return (
    <IonItem>
      <IonLabel>Language</IonLabel>
      <IonSelect
        selectedText={configs.language}
        onIonChange={(e) => {
          configs.language = e.detail.value;
          setConfigs({ ...configs });
        }}
      >
        {Object.values(Language).map((value, i) => {
          return (
            <IonSelectOption key={i} value={value}>
              {value}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    </IonItem>
  );
};

export default LanguageSetting;
