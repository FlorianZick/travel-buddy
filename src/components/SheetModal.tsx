import React from "react";
import {
    IonButton,
    IonModal,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonFab,
    IonFabButton,
    IonIcon,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import "./sheetModal.css";

function SheetModal() {
    const modal = React.useRef(null);
    return (
        <div>
            <IonFab slot="fixed">
                <IonFabButton id="open-modal">
                    <IonIcon icon={locationOutline}></IonIcon>
                </IonFabButton>
            </IonFab>
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
        </div>
    );
}

export default SheetModal;
