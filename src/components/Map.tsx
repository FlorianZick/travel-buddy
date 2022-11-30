import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import React from "react";

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
