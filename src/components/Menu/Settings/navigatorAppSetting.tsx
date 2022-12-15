import { ReactElement, useContext, useEffect } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import { NavigatorApp } from "./../../ConfigContext/types";
import { ConfigContext } from "./../../ConfigContext/ConfigContext";

import { useTranslation } from "react-i18next";

const NavigatorAppSetting: React.FC = (): ReactElement => {
  const { t } = useTranslation();
  const { configs, setConfigs } = useContext(ConfigContext);

  useEffect(() => {
    console.log(configs);
  }, []);

  return (
    <IonItem>
      <IonLabel>{t("settings.navigatorApp")}</IonLabel>
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
