import "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { NavigatorApp } from "./ConfigContext/types";
import "leaflet-routing-machine";
import "./routingMachine.css";
declare let L: any;

// routing control
var routingControl: any;
// red icon for destination marker
var redIcon = new L.Icon({
    iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
// route styles for route color between markers
var routeStyles = [
    { color: "#1E4B6F", opacity: 0.8, weight: 7 },
    { color: "#4CAEFD", opacity: 1, weight: 4 },
];

/**
 * Create routing machine layer
 * @returns routing control
 */
function createRoutineMachineLayer() {
    routingControl = L.Routing.control({
        waypoints: [null],
        lineOptions: {
            styles: routeStyles,
        },
        show: true,
        collapsible: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: customCreateMarker,
    });
    return routingControl;
}

/**
 * Create custom marker for routing
 * @param i current marker count
 * @param wp waypoint with latitude and longitude
 * @param n total number of markers
 * @returns marker
 */
function customCreateMarker(i: number, wp: any, n: number) {
    if (i === 0 || i < n - 1) {
        return L.marker(wp.latLng);
    } else {
        return L.marker(wp.latLng, { icon: redIcon });
    }
}

/**
 * Set current position
 * @param pos position
 */
export function setCurrentPosition(pos: any) {
    routingControl.setWaypoints([L.latLng(pos.lat, pos.lng)]);
    routingControl._container.style.display = "None";
}

/**
 * Get current position
 * @returns current position or null
 */
export function getCurrentPosition() {
    let curPos = routingControl.getWaypoints()[0].latLng;
    return curPos !== null ? curPos : null;
}

/**
 * Set destination position
 * @param pos position
 */
export function setDestinationPosition(pos: any) {
    let curPos = routingControl.getWaypoints()[0].latLng;
    if (curPos !== null) {
        routingControl.setWaypoints([
            L.latLng(curPos.lat, curPos.lng),
            L.latLng(pos.lat, pos.lng),
        ]);
    } else {
        setCurrentPosition(pos);
    }
    routingControl._container.style.display = "None";
}

/**
 * Get google maps url
 * @param curPos current position
 * @param destPos destination position
 * @returns Url for google maps navigator app
 */
function getGoogleMapsUrl(curPos: any, destPos: any): string {
    return (
        "https://www.google.com/maps/dir/?api=1&origin=" +
        curPos.lat +
        "," +
        curPos.lng +
        "&destination=" +
        destPos.lat +
        "," +
        destPos.lng +
        "&travelmode=driving"
    );
}

/**
 * Get apple maps url
 * @param curPos current position
 * @param destPos destination position
 * @returns url for apple maps navigator app
 */
function getAppleMapsUrl(curPos: any, destPos: any): string {
    return (
        "http://maps.apple.com/?saddr=" +
        curPos.lat +
        "," +
        curPos.lng +
        "&daddr=" +
        destPos.lat +
        "," +
        destPos.lng
    );
}

/**
 * Get waze navigator url
 * @param curPos current position
 * @param destPos destination position
 * @returns url for waze navigator app
 */
function getWazeUrl(curPos: any, destPos: any): string {
    return (
        "https://www.waze.com/de/live-map/directions?to=ll." +
        destPos.lat +
        "%2C" +
        destPos.lng +
        "&from=ll." +
        curPos.lat +
        "%2C" +
        curPos.lng
    );
}

/**
 * Export route to one of the three navigator apps
 * @param navigator navigator app
 */
export function exportRoute(navigator: NavigatorApp) {
    const waypoints = routingControl.getWaypoints();
    const curPos = waypoints[0].latLng;
    const destPos = waypoints[1].latLng;
    if (navigator === NavigatorApp.GOOGLE_MAPS) {
        window.open(getGoogleMapsUrl(curPos, destPos));
    } else if (navigator === NavigatorApp.WAZE) {
        window.open(getWazeUrl(curPos, destPos));
    } else if (navigator === NavigatorApp.APPLE_MAPS) {
        window.open(getAppleMapsUrl(curPos, destPos));
    }
}

// Create routing machine
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
