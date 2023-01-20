import * as React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

/**
 * Props for the event card component
 */
type EventCardProps = {
  title: string;
  snippet: string;
};

/**
 * Functional component for event card
 * @param title - Title of the event
 * @param snippet - Snippet of the event
 * @returns EventCard component
 */
const EventCard: React.FC<EventCardProps> = ({
  title,
  snippet,
}: EventCardProps): React.ReactElement => {
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
