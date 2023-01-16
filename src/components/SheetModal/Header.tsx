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

/**
 * Interface for props
 */
interface Props {
    title: string | undefined;
    showCurPosInformation: boolean;
}

/**
 * Functional component for header
 * @param param0 Object with title and showCurPosInformation
 * @returns Header component
 */
const Header: React.FC<Props> = ({
    title,
    showCurPosInformation,
}): ReactElement => {
    const { configs, setConfigs } = useContext(ConfigContext);
    /**
     * Export route to navigator app
     */
    function exportRouteToNavigatorApp() {
        exportRoute(configs.navigator);
    }
    return (
        <IonItem>
            <IonGrid
                style={{
                    marginBottom: !showCurPosInformation ? "4rem" : "1rem",
                }}
            >
                <IonRow
                    className="ion-justify-content-center ion-align-items-center"
                    style={{ marginBottom: "0.5rem" }}
                >
                    <IonText style={{ fontSize: "1.3rem", fontWeight: 450 }}>
                        {title}
                    </IonText>
                </IonRow>
                {!showCurPosInformation && (
                    <IonRow
                        style={{ justifyContent: "center", height: "56px" }}
                    >
                        <IonFab>
                            <IonFabButton onClick={exportRouteToNavigatorApp}>
                                <IonIcon icon={navigateCircleOutline}></IonIcon>
                            </IonFabButton>
                        </IonFab>
                    </IonRow>
                )}
            </IonGrid>
        </IonItem>
    );
};

export default Header;
