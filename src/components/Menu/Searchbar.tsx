import { IonFab, IonSearchbar } from "@ionic/react";
import React, { ReactElement } from "react";
import L from "leaflet";

const Searchbar: React.FC = (): ReactElement => {
    React.useEffect(() => {
        const divRef = document.getElementById("ionSearchbar")!;
        L.DomEvent.disableClickPropagation(divRef);
    });
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
                id="ionSearchbar"
            ></IonSearchbar>
        </IonFab>
    );
};

export default Searchbar;
