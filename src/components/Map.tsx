import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import { fetchWikiData } from "../api/fetchWikiData";
import { reverseGeoEncoding } from "../api/reverseGeoEncoding";
import { ConfigContext } from "./ConfigContext";
import { useContext } from "react";
import { Language } from "./ConfigContext/types";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function LocationMarker(props: any) {
  const { configs } = useContext(ConfigContext);

  const [position, setPosition] = React.useState<L.LatLng>();
  const [bbox, setBbox] = React.useState<string[]>([]);
  const map = useMap();

  React.useEffect(() => {
    // On every language change, remove the old event listeners and add new ones
    // Callbacks needs to be changed, to make sure the new language is used in the fetchWikiApi call
    map.locate().removeEventListener("locationfound");

    // Only adds a callback to the event listener and does not replace it
    map.locate().on("locationfound", mapLocateCallback);

    map.removeEventListener("click");
    map.on("click", mapClickCallback);
  }, [configs.language]);

  const mapLocateCallback = React.useCallback(
    (e: any) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
      loadLocationData(e.latlng, props.onLocationChange, configs.language);
    },
    [configs.language]
  );

  const mapClickCallback = React.useCallback(
    (e: any) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      loadLocationData(e.latlng, props.onLocationChange, configs.language);
    },
    [configs.language]
  );

  async function loadLocationData(
    location: LatLng,
    setWikiData: any,
    lang: Language
  ) {
    const locationData = await reverseGeoEncoding(location.lat, location.lng);

    const wikiData = await fetchWikiData(locationData.city, lang);

    setWikiData(wikiData);
  }

  return position === undefined ? null : (
    <Marker position={position}>
      <Popup>
        Mein Standort
        <br />
        (Blauer Kreis = Genauigkeit
        <br /> des Standorts)
      </Popup>
    </Marker>
  );
}

function Map(props: any) {
  return (
    <MapContainer
      center={{ lat: 51.166, lng: 10.452 }}
      zoom={13}
      style={{ width: "100%", height: "100vh" }}
      dragging={true}
      zoomControl={false}
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.children}
      <LocationMarker onLocationChange={props.onLocationChange} />
    </MapContainer>
  );
}

export default Map;
