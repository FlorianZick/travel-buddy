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
import { useTranslation } from "react-i18next";
import SettingsContent from "./SettingsContent";

/**
 * Interface for props
 */
interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Functional component for settings
 * @param param0 Object with isOpen and setIsOpen states
 * @returns Settings component
 */
const Settings: React.FC<Props> = ({ isOpen, setIsOpen }): ReactElement => {
    const { t } = useTranslation();
    // Prevent map click propagation when clicking on settings modal
    React.useEffect(() => {
        const settingsModal = document.getElementById("settingsModal")!;
        L.DomEvent.disableClickPropagation(settingsModal);
    });
    return (
        <IonModal isOpen={isOpen} id="settingsModal" backdropDismiss={false}>
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
