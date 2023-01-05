import React, { ReactElement } from "react";
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
} from "@ionic/react";
import L from "leaflet";
import SettingsContent from "./settingsContent";

import { useTranslation } from "react-i18next";

// interface for props
interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: React.FC<Props> = ({ isOpen, setIsOpen }): ReactElement => {
    const { t } = useTranslation();
    React.useEffect(() => {
        const divRef = document.getElementById("settingsModal")!;
        L.DomEvent.disableClickPropagation(divRef);
    });
    return (
        <IonModal isOpen={isOpen} id="settingsModal">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t("settings.settingsTitle")}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>
                            {t("settings.close")}
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <SettingsContent />
        </IonModal>
    );
};

export default Settings;
