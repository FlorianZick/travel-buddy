import { ReactElement, useContext, useEffect } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import { NavigatorApp } from "./../../ConfigContext/types";
import { ConfigContext } from "./../../ConfigContext/ConfigContext";

const NavigatorAppSetting: React.FC = (): ReactElement => {
  const { configs, setConfigs } = useContext(ConfigContext);

  useEffect(() => {
    console.log(configs);
  }, []);

  return (
    <IonItem>
      <IonLabel>Navigator App</IonLabel>
      <IonSelect
        selectedText={configs.navigator}
        onIonChange={(e) => {
          configs.navigator = e.detail.value;
          setConfigs({ ...configs });
        }}
      >
        {Object.values(NavigatorApp).map((value, i) => {
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

export default NavigatorAppSetting;
