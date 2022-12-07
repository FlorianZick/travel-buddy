import { ReactElement, useContext } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import { NavigatorApp } from "./../../ConfigContext/types";
import { ConfigContext } from "./../../ConfigContext/ConfigContext";

const NavigatorAppSetting: React.FC = (): ReactElement => {
  const { configs } = useContext(ConfigContext);

  return (
    <IonItem>
      <IonLabel>Navigator App</IonLabel>
      <IonSelect
        placeholder={configs.navigator}
        onIonChange={(e) => {
          configs.navigator = e.detail.value;
        }}
      >
        {Object.keys(NavigatorApp).map((key) => {
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

export default NavigatorAppSetting;
