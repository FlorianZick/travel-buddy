import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function LocationMarker() {
    const [position, setPosition] = React.useState<L.LatLng>();
    const [bbox, setBbox] = React.useState<string[]>([]);
    const map = useMap();
    React.useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
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

function Map(props: any) {
    return (
        <MapContainer
            center={{ lat: 51.166, lng: 10.452 }}
            zoom={13}
            style={{ width: "100%", height: "100vh" }}
            dragging={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.children}
            <LocationMarker />
        </MapContainer>
    );
}

export default Map;
