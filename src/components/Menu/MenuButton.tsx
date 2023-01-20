import React, { ReactElement } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import L from "leaflet";
import "./menuButton.css";

/**
 * Props for the menu button component
 */
type MenuButtonProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Functional component for menu button
 * @param setIsOpen - Function to set the state of the menu
 * @returns MenuButton component
 */
const MenuButton: React.FC<MenuButtonProps> = ({
  setIsOpen,
}: MenuButtonProps): ReactElement => {
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
