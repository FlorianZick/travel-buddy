import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer center={[47.667301, 9.444]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
