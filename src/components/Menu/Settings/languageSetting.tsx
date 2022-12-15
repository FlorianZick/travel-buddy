import { ReactElement, useContext } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import { Language } from "./../../ConfigContext/types";
import { ConfigContext } from "./../../ConfigContext/ConfigContext";

import { useTranslation } from "react-i18next";

const LanguageSetting: React.FC = (): ReactElement => {
  const { t, i18n } = useTranslation();
  const { configs, setConfigs } = useContext(ConfigContext);

  return (
    <IonItem>
      <IonLabel>{t("settings.language")}</IonLabel>
      <IonSelect
        selectedText={configs.language}
        onIonChange={(e) => {
          configs.language = e.detail.value;
          setConfigs({ ...configs });
          i18n.changeLanguage(e.detail.value);
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
