import { ReactElement, useContext, useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";

import "./settings.css";
import { ConfigContext } from "./ConfigContext/ConfigContext";

// interface for props
interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton: React.FC<Props> = ({ isOpen, setIsOpen }): ReactElement => {
  const { configs } = useContext(ConfigContext);

  return (
    <IonFab slot="fixed" onClick={() => setIsOpen(true)} class="settingsBtn">
      <IonFabButton size="small" color="transparent" class="setBtn">
        <IonIcon icon={menu}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
};

export default MenuButton;
