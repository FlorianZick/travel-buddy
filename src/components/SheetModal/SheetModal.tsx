import React, { useContext } from "react";
import {
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
import EventCard from "../EventCard";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import Header from "./Header";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { getCurrentPosition } from "../RoutingMachine";
import { ModalContext } from "../InformationContext/InformationContext";

/**
 * Interface for props
 */
interface Props {
  data: WikiApiDataModel[] | null;
  showCurPosInformation: boolean;
  setShowCurPosInformation: React.Dispatch<React.SetStateAction<boolean>>;
}

const SheetModal: React.FC<Props> = ({
  data,
  showCurPosInformation,
  setShowCurPosInformation,
}): React.ReactElement => {
  const map = useMap();
  const modal = React.useRef(null);
  // Prevent map click propagation when clicking on sheet modal
  React.useEffect(() => {
    const sheetModalDiv = document.getElementById("sheetModalDiv")!;
    L.DomEvent.disableClickPropagation(sheetModalDiv);
  });

  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  return (
    <div id="sheetModalDiv">
      <IonFab slot="fixed" class="infoBtn">
        <IonFabButton
          id="open-modal"
          onClick={() => {
            let curPos = getCurrentPosition();
            if (curPos !== null) {
              map.flyTo(curPos, map.getZoom());
            }
            setShowCurPosInformation(true);
            setIsModalOpen(true);
          }}
        >
          <IonIcon icon={locationOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonFab slot="fixed" class="nameTag">
        <IonText color="dark">
          <h1 id="logo">Travel Buddy</h1>
        </IonText>
      </IonFab>
      <IonModal
        ref={modal}
        isOpen={isModalOpen}
        onWillDismiss={() => {
          setIsModalOpen(false);
        }}
        initialBreakpoint={0.5}
        breakpoints={[0, 0.15, 0.5, 1.0]}
        id="ionModal"
      >
        <IonContent className="ion-padding">
          <IonList>
            <Header
              title={data?.at(0)?.title}
              showCurPosInformation={showCurPosInformation}
            />
            {data?.map((item, i) => (
              <IonItem key={i}>
                <IonLabel>
                  <EventCard title={item.title} snippet={item.snippet} />
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
