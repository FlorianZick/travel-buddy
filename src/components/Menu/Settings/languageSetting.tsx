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
        placeholder={configs.language}
        onIonChange={(e) => {
          configs.language = e.detail.value;
          setConfigs({ ...configs });
        }}
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
