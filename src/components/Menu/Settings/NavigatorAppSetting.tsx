import React, { ReactElement, useContext } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import { NavigatorApp } from "../../ConfigContext/types";
import { ConfigContext } from "../../ConfigContext/ConfigContext";

/**
 * Functional component for navigator settings
 * @returns Navigator setting component
 */
const NavigatorAppSetting: React.FC = (): ReactElement => {
    const { t } = useTranslation();
    const { configs, setConfigs } = useContext(ConfigContext);
    // Prevent map click propagation when clicking on navigator app select
    React.useEffect(() => {
        const navigatorAppSelect =
            document.getElementById("navigatorAppSelect")!;
        L.DomEvent.disableClickPropagation(navigatorAppSelect);
    });
    return (
        <IonItem style={{ margin: "0 20px" }}>
            <IonLabel>{t("settings.navigatorApp")}</IonLabel>
            <IonSelect
                id="navigatorAppSelect"
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
