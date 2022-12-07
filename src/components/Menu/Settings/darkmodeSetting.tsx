import { ReactElement, useContext, useEffect } from "react";
import { IonItem, IonLabel, IonToggle } from "@ionic/react";

import { Theme } from "./../../ConfigContext/types";
import { ConfigContext } from "./../../ConfigContext/ConfigContext";

const DarkModeSetting: React.FC = (): ReactElement => {
  const { configs, setConfigs } = useContext(ConfigContext);

  return (
    <IonItem>
      <IonLabel>Darkmode</IonLabel>
      <IonToggle
        checked={configs.theme === Theme.DARK}
        onIonChange={(e) => {
          configs.theme = e.detail.checked ? Theme.DARK : Theme.LIGHT;
          setConfigs({ ...configs });
        }}
      />
    </IonItem>
  );
};

export default DarkModeSetting;
