import React, { ReactElement } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { map, mapOutline } from "ionicons/icons";
import L from "leaflet";
import "./satelliteButton.css";

// interface for props
interface Props {
    isSatellite: boolean;
    setIsSatellite: React.Dispatch<React.SetStateAction<boolean>>;
}

const SatelliteButton: React.FC<Props> = ({
    isSatellite,
    setIsSatellite,
}): ReactElement => {
    React.useEffect(() => {
        const divRef = document.getElementById("satelliteBtn")!;
        L.DomEvent.disableClickPropagation(divRef);
    });
    return (
        <IonFab slot="fixed" id="satelliteBtn">
            <IonFabButton onClick={() => setIsSatellite(!isSatellite)}>
                <IonIcon icon={isSatellite ? mapOutline : map}></IonIcon>
            </IonFabButton>
        </IonFab>
    );
};

export default SatelliteButton;
