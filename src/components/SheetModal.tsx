import React, { useRef } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";

function SheetModal() {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton id="open-modal" expand="block">
          Öffne Ort Informationen
        </IonButton>
        <IonModal
          ref={modal}
          trigger="open-modal"
          initialBreakpoint={0.5}
          breakpoints={[0, 0.25, 0.5, 1]}
        >
          <IonContent className="ion-padding">
            <IonText>Informationen über Friedrichshafen</IonText>
            <IonButton>Route</IonButton>
            <IonList>
              {Array.from({ length: 10 }).map((_, i) => (
                <IonItem key={i + 1}>
                  <IonLabel>
                    <h2>Sehenswürdigkeit {i + 1}</h2>
                    <p>Infos zu {i + 1} </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default SheetModal;
