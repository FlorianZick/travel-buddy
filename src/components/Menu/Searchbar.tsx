import { IonFab, IonSearchbar } from "@ionic/react";
import { ReactElement } from "react";

const Searchbar: React.FC = (): ReactElement => {
  return (
    <IonFab
      slot="fixed"
      vertical="bottom"
      horizontal="end"
      edge={true}
      class="searchBar"
    >
      <IonSearchbar
        animated={true}
        style={{ width: "100%" }}
        showClearButton="never"
      ></IonSearchbar>
    </IonFab>
  );
};

export default Searchbar;
