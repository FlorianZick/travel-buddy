import React, { ReactElement } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import L from "leaflet";
import "./menuButton.css";

/**
 * Interface for props
 */
interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Functional component for menu button
 * @param param0 Object with setIsOpen
 * @returns MenuButton component
 */
const MenuButton: React.FC<Props> = ({ setIsOpen }): ReactElement => {
    React.useEffect(() => {
        const menuFab = document.getElementById("menuFab")!;
        L.DomEvent.disableClickPropagation(menuFab);
    });
    return (
        <IonFab
            slot="fixed"
            onClick={() => setIsOpen(true)}
            class="menuBtn"
            id="menuFab"
        >
            <IonFabButton
                size="small"
                class="menuInnerBtn"
                id="ionFabButton"
                style={{ background: "transparent" }}
            >
                <IonIcon icon={menu} id="settingsIcon"></IonIcon>
            </IonFabButton>
        </IonFab>
    );
};

export default MenuButton;
