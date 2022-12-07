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
import "typeface-roboto";
import "./sheetModal.css";

function SheetModal() {
    const modal = React.useRef(null);
    return (
        <div>
            <IonFab slot="fixed" class="infoBtn">
                <IonFabButton id="open-modal">
                    <IonIcon icon={locationOutline}></IonIcon>
                </IonFabButton>
            </IonFab>
            <IonFab slot="fixed" class="nameTag">
                <IonText color="dark">
                    <h1
                        style={{
                            margin: 0,
                            fontWeight: 700,
                            fontSize: "2rem",
                            fontFamily: "Roboto, sans-serif",
                        }}
                    >
                        Travel Buddy
                    </h1>
                </IonText>
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
