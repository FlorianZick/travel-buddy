import React from "react";
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
import Eventcard from "../Eventcard";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import Header from "./header";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { getCurrentPosition } from "../RoutingMachine";

interface Props {
    data: WikiApiDataModel[] | null;
    isModalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showCurPosInformation: boolean;
    setShowCurPosInformation: React.Dispatch<React.SetStateAction<boolean>>;
}

const SheetModal: React.FC<Props> = ({
    data,
    isModalOpen,
    setModalOpen,
    showCurPosInformation,
    setShowCurPosInformation,
}): React.ReactElement => {
    const map = useMap();
    const modal = React.useRef(null);
    React.useEffect(() => {
        const divRef = document.getElementById("sheetModalDiv")!;
        L.DomEvent.disableClickPropagation(divRef);
    });
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
                        setModalOpen(true);
                    }}
                >
                    <IonIcon icon={locationOutline}></IonIcon>
                </IonFabButton>
            </IonFab>
            <IonFab slot="fixed" class="nameTag">
                <IonText color="dark">
                    <h1
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "1.5rem",
                            fontFamily: "Roboto, sans-serif",
                        }}
                        id="logo"
                    >
                        Travel Buddy
                    </h1>
                </IonText>
            </IonFab>
            <IonModal
                ref={modal}
                isOpen={isModalOpen}
                onWillDismiss={() => {
                    setModalOpen(false);
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
                                    <Eventcard
                                        title={item.title}
                                        snippet={item.snippet}
                                    />
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
