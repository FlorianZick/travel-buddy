import React, { ReactElement, useContext } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import { Language } from "./../../ConfigContext/types";
import { ConfigContext } from "./../../ConfigContext/ConfigContext";

import { useTranslation } from "react-i18next";
import L from "leaflet";

const LanguageSetting: React.FC = (): ReactElement => {
    const { t, i18n } = useTranslation();
    const { configs, setConfigs } = useContext(ConfigContext);
    React.useEffect(() => {
        const divRef = document.getElementById("languageIonSelect")!;
        L.DomEvent.disableClickPropagation(divRef);
    });
    return (
        <IonItem style={{ margin: "0 20px" }}>
            <IonLabel>{t("settings.language")}</IonLabel>
            <IonSelect
                id="languageIonSelect"
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
