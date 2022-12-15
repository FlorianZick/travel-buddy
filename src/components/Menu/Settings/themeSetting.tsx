import { ReactElement, useContext, useEffect } from "react";
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";

import { Theme } from "../../ConfigContext/types";
import { ConfigContext } from "../../ConfigContext/ConfigContext";

import { useTranslation } from "react-i18next";

const DarkModeSetting: React.FC = (): ReactElement => {
  const { t } = useTranslation();
  const { configs, setConfigs } = useContext(ConfigContext);

  return (
    <IonItem>
      <IonLabel>{t("settings.theme")}</IonLabel>
      <IonSelect
        selectedText={configs.theme}
        onIonChange={(e) => {
          configs.theme = e.detail.value;
          setConfigs({ ...configs });
        }}
      >
        {Object.values(Theme).map((value, i) => {
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

export default DarkModeSetting;
