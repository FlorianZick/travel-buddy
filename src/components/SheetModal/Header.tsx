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
// import { getCurrentPosition } from "../RoutingMachine";

// interface for props
interface Props {
    title: string | undefined;
    showCurPosInformation: boolean;
}

const Header: React.FC<Props> = ({
    title,
    showCurPosInformation,
}): ReactElement => {
    const { configs, setConfigs } = useContext(ConfigContext);
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
                        {/* <IonText
                            style={{
                                fontWeight: 300,
                                fontSize: "1rem",
                                fontFamily: "Roboto, sans-serif",
                                color: "white",
                                margin: "auto auto auto 20px",
                            }}
                        >
                            23 h 59 min
                        </IonText> */}
                        <IonFab>
                            <IonFabButton onClick={exportRouteToNavigatorApp}>
                                <IonIcon icon={navigateCircleOutline}></IonIcon>
                            </IonFabButton>
                        </IonFab>
                        {/* <IonText
                            style={{
                                fontWeight: 300,
                                fontSize: "1rem",
                                fontFamily: "Roboto, sans-serif",
                                color: "white",
                                margin: "auto 20px auto auto",
                            }}
                        >
                            99999.99 km
                        </IonText> */}
                    </IonRow>
                )}
            </IonGrid>
        </IonItem>
    );
};

export default Header;
