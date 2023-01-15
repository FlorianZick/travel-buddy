import "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { NavigatorApp } from "./ConfigContext/types";
import "leaflet-routing-machine";
import "./routingMachine.css";
declare let L: any;

var routingControl: any;

// var routeSummary: any = null;
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

function createRoutineMachineLayer() {
    routingControl = L.Routing.control({
        waypoints: [null],
        lineOptions: {
            styles: [
                { color: "#1E4B6F", opacity: 0.8, weight: 7 },
                { color: "#4CAEFD", opacity: 1, weight: 4 },
            ],
        },
        show: true,
        collapsible: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: function (i: number, wp: any, n: number) {
            if (i === 0 || i < n - 1) {
                return L.marker(wp.latLng);
            } else {
                return L.marker(wp.latLng, { icon: redIcon });
            }
        },
    });
    // routingControl.on("routesfound", function (e: any) {
    //     let routes = e.routes;
    //     let summary = routes[0].summary;
    //     let distance = (summary.totalDistance / 1000).toFixed(2) + " km";
    //     let hours =
    //         Math.floor(summary.totalTime / 3600) > 0
    //             ? Math.floor(summary.totalTime / 3600) + " h"
    //             : "";
    //     let mins = Math.round((summary.totalTime % 3600) / 60) + " min";
    //     routeSummary = { distance: distance, time: hours + " " + mins };
    //     console.log(routeSummary);
    // });
    return routingControl;
}

export function setCurrentPosition(pos: any) {
    routingControl.setWaypoints([L.latLng(pos.lat, pos.lng)]);
    routingControl._container.style.display = "None";
}

export function getCurrentPosition() {
    let curPos = routingControl.getWaypoints()[0].latLng;
    return curPos !== null ? curPos : null;
}

export function setDestinationPosition(pos: any) {
    let curPos = routingControl.getWaypoints()[0].latLng;
    // console.log(curPos);
    if (curPos !== null) {
        routingControl.setWaypoints([
            L.latLng(curPos.lat, curPos.lng),
            L.latLng(pos.lat, pos.lng),
        ]);
    } else {
        routingControl.setWaypoints([L.latLng(pos.lat, pos.lng)]);
    }
    routingControl._container.style.display = "None";
}

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

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
