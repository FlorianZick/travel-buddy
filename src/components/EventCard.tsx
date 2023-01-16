import * as React from "react";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
} from "@ionic/react";

/**
 * Interface for props
 */
interface Props {
    title: string;
    snippet: string;
}

/**
 * Functional component for event card
 * @param param0 Object with title and snippet
 * @returns EventCard component
 */
const EventCard: React.FC<Props> = ({ title, snippet }): React.ReactElement => {
    return (
        <IonCard style={{ margin: 0 }}>
            <IonCardHeader style={{ paddingTop: 0 }}>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="ion-text-wrap">{snippet}</IonCardContent>
        </IonCard>
    );
};

export default EventCard;
