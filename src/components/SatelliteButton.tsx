import React, { ReactElement } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { earth, earthOutline } from "ionicons/icons";
import L from "leaflet";
import "./satelliteButton.css";

/**
 * Interface for props
 */
interface Props {
    isSatellite: boolean;
    setIsSatellite: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Functional component for satellite button
 * @param param0 Object with isSatellite and setIsSatellite states
 * @returns SatelliteButton component
 */
const SatelliteButton: React.FC<Props> = ({
    isSatellite,
    setIsSatellite,
}): ReactElement => {
    // Prevent map click propagation when clicking on satellite button
    React.useEffect(() => {
        const satelliteFab = document.getElementById("satelliteFab")!;
        L.DomEvent.disableClickPropagation(satelliteFab);
    });
    return (
        <IonFab slot="fixed" id="satelliteFab">
            <IonFabButton onClick={() => setIsSatellite(!isSatellite)}>
                <IonIcon icon={isSatellite ? earthOutline : earth}></IonIcon>
            </IonFabButton>
        </IonFab>
    );
};

export default SatelliteButton;
