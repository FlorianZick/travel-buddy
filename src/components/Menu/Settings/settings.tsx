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

// interface for props
interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: React.FC<Props> = ({ isOpen, setIsOpen }): ReactElement => {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <SettingsContent />
    </IonModal>
  );
};

export default Settings;
