import * as React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";

// interface for props
interface Props {
    title: string;
    snippet: string;
  }

const Eventcard: React.FC<Props> = ({ title, snippet }): React.ReactElement =>    
{
    return (
    <IonCard style={{margin: 0}}>
      <IonCardHeader style={{paddingTop: 0}}>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="ion-text-wrap">
         {snippet} 
      </IonCardContent>
    </IonCard>
  );
}

export default Eventcard;