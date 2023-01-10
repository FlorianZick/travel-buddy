import React from "react";
import { IonCol, IonGrid, IonRow, IonButton, IonSpinner } from "@ionic/react";
import noInternetConnectionCloud from "./resources/noInternetConnectionCloud.jpg";

import "./noInternetConnection.css";

function NoInternetConnection() {
    // const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
    // function refreshPage() {
    //     setIsRefreshing(true);
    //     setTimeout(() => {
    //         window.location.reload();
    //         setIsRefreshing(false);
    //     }, 300);
    // }
    return (
        <div id="noInternetBackground">
            <IonGrid
                style={{
                    position: "absolute",
                    top: "35%",
                    left: "50%",
                    transform: "translate(-50%, -35%)",
                }}
            >
                <IonRow>
                    <IonCol>
                        <img
                            src={noInternetConnectionCloud}
                            alt="No internet connection symbol"
                            style={{ margin: 0, width: "300px" }}
                        />
                    </IonCol>
                </IonRow>
                <IonRow style={{ marginTop: "-20px" }}>
                    <IonCol id="noInternetHead">
                        Travel Buddy can't reach the internet
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol id="noInternetBody">
                        Check your internet connection
                    </IonCol>
                </IonRow>
                {/* <IonRow style={{ marginTop: "30px" }}>
                    <IonCol>
                        <IonButton
                            onClick={refreshPage}
                            style={{ width: "150px" }}
                        >
                            {isRefreshing ? (
                                <></> // <IonSpinner name="crescent"></IonSpinner>
                            ) : (
                                "Try again"
                            )}
                        </IonButton>
                    </IonCol>
                </IonRow> */}
            </IonGrid>
        </div>
    );
}
export default NoInternetConnection;
