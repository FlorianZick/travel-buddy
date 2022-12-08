import * as React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import { WikiApiDataModel } from "../models/wikiApiDataModel";

// interface for props
interface Props {
    title: string;
    snippet: string;
  }

const Eventcard: React.FC<Props> = ({ title, snippet }): React.ReactElement =>    
{
    return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {snippet}
      </IonCardContent>
    </IonCard>
  );
}

export default Eventcard;