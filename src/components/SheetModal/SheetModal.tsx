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
  IonRow,
  IonGrid,
  IonCard,
} from "@ionic/react";
import { locationOutline, navigateCircleOutline } from "ionicons/icons";
import "typeface-roboto";
import "./sheetModal.css";
import Eventcard from "../Card";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";

interface Props {
  data: WikiApiDataModel[] | null;
}

const SheetModal: React.FC<Props> = ({ data }): React.ReactElement => {
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
        breakpoints={[0, 0.15, 0.5, 0.9]}
      >
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonGrid style={{ marginBottom: "4rem" }}>
                <IonRow
                  className="ion-justify-content-center ion-align-items-center"
                  style={{ marginBottom: "0.5rem" }}
                >
                  <IonText style={{ fontSize: "1.3rem", fontWeight: 450 }}>
                    {data?.at(0)?.title}
                  </IonText>
                </IonRow>

                <IonRow style={{ justifyContent: "center" }}>
                  <IonFab>
                    <IonFabButton>
                      <IonIcon icon={navigateCircleOutline}></IonIcon>
                    </IonFabButton>
                  </IonFab>
                </IonRow>
              </IonGrid>
            </IonItem>
            {data?.map((item, i) => (
              <IonItem key={i}>
                <IonLabel>
                  <Eventcard title={item.title} snippet={item.snippet} />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default SheetModal;
