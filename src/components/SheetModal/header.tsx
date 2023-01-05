import { ReactElement } from "react";
import {
    IonFab,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonItem,
    IonRow,
    IonText,
} from "@ionic/react";
import { navigateCircleOutline } from "ionicons/icons";
import { exportRoute } from "../RoutingMachine";
import { useContext } from "react";
import { ConfigContext } from "../ConfigContext";

// interface for props
interface Props {
    title: string | undefined;
}

const Header: React.FC<Props> = ({ title }): ReactElement => {
    const { configs, setConfigs } = useContext(ConfigContext);
    function exportRouteToNavigatorApp() {
        exportRoute(configs.navigator);
    }
    return (
        <IonItem>
            <IonGrid style={{ marginBottom: "4rem" }}>
                <IonRow
                    className="ion-justify-content-center ion-align-items-center"
                    style={{ marginBottom: "0.5rem" }}
                >
                    <IonText style={{ fontSize: "1.3rem", fontWeight: 450 }}>
                        {title}
                    </IonText>
                </IonRow>
                <IonRow style={{ justifyContent: "center" }}>
                    <IonFab>
                        <IonFabButton onClick={exportRouteToNavigatorApp}>
                            <IonIcon icon={navigateCircleOutline}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                </IonRow>
            </IonGrid>
        </IonItem>
    );
};

export default Header;
