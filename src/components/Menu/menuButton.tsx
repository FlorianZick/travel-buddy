import React, { ReactElement } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import L from "leaflet";

// interface for props
interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton: React.FC<Props> = ({ setIsOpen }): ReactElement => {
    React.useEffect(() => {
        const divRef = document.getElementById("menuButton")!;
        L.DomEvent.disableClickPropagation(divRef);
    });
    return (
        <IonFab
            slot="fixed"
            onClick={() => setIsOpen(true)}
            class="menuBtn"
            id="menuButton"
        >
            <IonFabButton size="small" class="menuInnerBtn">
                <IonIcon
                    icon={menu}
                    id="settingsIcon"
                    color="#222428 !important"
                ></IonIcon>
            </IonFabButton>
        </IonFab>
    );
};

export default MenuButton;
