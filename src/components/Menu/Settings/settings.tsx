import { ReactElement } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import SettingsContent from "./settingsContent";

import { useTranslation } from "react-i18next";

// interface for props
interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: React.FC<Props> = ({ isOpen, setIsOpen }): ReactElement => {
  const { t } = useTranslation();

  return (
    <IonModal isOpen={isOpen}>
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
