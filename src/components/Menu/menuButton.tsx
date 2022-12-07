import { ReactElement } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";

// interface for props
interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton: React.FC<Props> = ({ setIsOpen }): ReactElement => {
  return (
    <IonFab slot="fixed" onClick={() => setIsOpen(true)} class="menuBtn">
      <IonFabButton size="small" color="transparent" class="menuInnerBtn">
        <IonIcon icon={menu}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
};

export default MenuButton;
