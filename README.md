# travel-buddy
## Beschreibung
Die Travel Buddy App wurde im Rahmen des Software Engineering 2 Vorlesung erstellt. Die PWA kann Informationen zu Örtlichkeiten anzeigen

## Aufgaben
- Einbinden der Leaflet-React Komponente in die App
  - Karte lädt schnell und rendert richtig ohne Anzeige Fehler
  - Karte ist reponsiv
  - Karte hat richtige Größe auf dem Display
  - Auslesen der aktuellen Position
  - Setzen der Initalien Position auf Basis des Standorts
  - Abfangen eines Karten Klick Events zum öffnen des Sheet Modals
  - Schnittstelle im Route zu Punkt zu berechnen + Route nicht mehr anzuzeigen
  
- Reverse Geocoding
  - Auslesen der Koordinaten des geklickten Ortes
  - API Anfrage für Reverse Geocoding Informationen
  - Speichern in Datenstruktur

- Sheet Modal
  - Öffnen des Sheet Modals beim Klick auf einen Ort
  - Ladescreen (Null Komponenten oder Ladekringel)
  - Abfragen der Wikipedia API Daten
  - Darstellen der Daten in einer Liste einer Event Komponente
  - Button um Route zu berechnen
  
- Event Komponente
  - Komponente, die die Informationen von Wikipedia zu einer Attraktion grafisch darstellt
  - wird als Liste im Sheet Modal präsentiert
  
- Wikipedia API 
  - Einlesen in API, was für Informationen dort geliefert werden
  - Erstellen eines Datenobjektes, das alle Informationen enthällt die verwertet werden
  - API Anfrage implementieren und speichern der Antwort in Datenobjekt
  
- Ovearlaying GPS Button
  - Button Rechts unten der über der Karte liegt mit GPS Logo
  - Beim Kartenklick: Informationen zur aktuellen Örtlichkeit

- Overlaying Reset Button
  - Wird angezeigt wenn die Route zu einem Ort angezeigt wird
  - Bei Knopfdruck -> Route wird nicht mehr angezeigt
  
- Tests
  - Wird UI auf Apple Geräten richtig geändert?

- Zusatzfeatures
  - Darkmode -> Einstellungen
  - Navigation in Navigationsapp starten
  - Auswählen der NavigationsApp (Google Maps, Safari Maps) -> Einstellungen
