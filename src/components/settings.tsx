import React, { ReactElement, useContext } from "react";
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { ConfigContext } from "./ConfigContext/ConfigContext";
import { Language, NavigatorApp, Theme } from "./ConfigContext/types";

const Settings: React.FC = (): ReactElement => {
  const { configs } = useContext(ConfigContext);

  const theme = configs.theme;

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid fixed={true}>
            <IonRow>
              <IonCol>Theme</IonCol>
              <IonCol>
                <IonList>
                  <IonItem>
                    <IonSelect
                      onIonChange={(e) =>
                        console.log(
                          `ionChange fired with value: ${e.detail.value}`
                        )
                      }
                      selected-text={configs.theme}
                    >
                      {Object.keys(Theme).map((key) => {
                        return (
                          <IonSelectOption key={key} value={key}>
                            {key}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Language</IonCol>
              <IonCol>
                <IonList>
                  <IonItem>
                    <IonSelect selected-text={configs.language}>
                      {Object.keys(Language).map((key) => {
                        return (
                          <IonSelectOption key={key} value={key}>
                            {key}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Navigator App</IonCol>
              <IonCol>
                <IonList>
                  <IonItem>
                    <IonSelect selected-text={configs.navigator}>
                      {Object.keys(NavigatorApp).map((key) => {
                        return (
                          <IonSelectOption key={key} value={key}>
                            {key}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonMenu>
    </>
  );
};
export default Settings;
