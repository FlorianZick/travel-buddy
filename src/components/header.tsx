import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";
import { ReactElement } from "react";

const Header: React.FC = (): ReactElement => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Travel Buddy</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
