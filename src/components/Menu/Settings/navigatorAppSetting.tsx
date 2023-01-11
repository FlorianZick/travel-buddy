import React, { ReactElement, useContext } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

import { NavigatorApp } from "./../../ConfigContext/types";
import { ConfigContext } from "./../../ConfigContext/ConfigContext";

import { useTranslation } from "react-i18next";
import L from "leaflet";

const NavigatorAppSetting: React.FC = (): ReactElement => {
    const { t } = useTranslation();
    const { configs, setConfigs } = useContext(ConfigContext);
    React.useEffect(() => {
        const divRef = document.getElementById("navigatorIonSelect")!;
        L.DomEvent.disableClickPropagation(divRef);
    });
    return (
        <IonItem style={{ margin: "0 20px" }}>
            <IonLabel>{t("settings.navigatorApp")}</IonLabel>
            <IonSelect
                id="navigatorIonSelect"
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
