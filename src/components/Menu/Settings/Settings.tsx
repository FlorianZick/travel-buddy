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
 * Props for Settings component
 */
type SettingsProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Functional component for settings menu
 * @param isOpen - Whether settings is open
 * @param setIsOpen - Function to set whether settings is open
 * @returns Settings component
 */
const Settings: React.FC<SettingsProps> = ({
  isOpen,
  setIsOpen,
}: SettingsProps): ReactElement => {
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
