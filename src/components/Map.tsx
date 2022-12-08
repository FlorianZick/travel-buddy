import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import RoutingMachine from "./RoutingMachine";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Map(props: any) {
    const [position, setPosition] = React.useState<L.LatLng>();
    function LocationMarker() {
        const map = useMap();
        React.useEffect(() => {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
                const radius = e.accuracy;
                const circle = L.circle(e.latlng, radius);
                circle.addTo(map);
            });
        }, [map]);
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
            <LocationMarker />
            <RoutingMachine
                pos1={position !== undefined ? position : { lat: 50, lng: 10 }}
                pos2={{ lat: 50.3, lng: 10.3 }}
            />
        </MapContainer>
    );
}

export default Map;
