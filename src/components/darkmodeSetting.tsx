import { ReactElement, useContext } from "react";
import { IonItem, IonLabel, IonToggle } from "@ionic/react";

import "./settings.css";
import { Theme } from "./ConfigContext/types";
import { ConfigContext } from "./ConfigContext/ConfigContext";

// interface for props

const DarkModeSetting: React.FC = (): ReactElement => {
  const { configs } = useContext(ConfigContext);

  return (
    <IonItem>
      <IonLabel>Darkmode</IonLabel>
      <IonToggle
        checked={configs.theme === Theme.DARK}
        onIonChange={(e) => {
          configs.theme = e.detail.checked ? Theme.DARK : Theme.LIGHT;
        }}
      />
    </IonItem>
  );
};

export default DarkModeSetting;
