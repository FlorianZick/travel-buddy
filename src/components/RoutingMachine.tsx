import "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { NavigatorApp } from "./ConfigContext/types";
import "leaflet-routing-machine";
import "./routingMachine.css";
declare let L: any;

var routingControl: any;

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
    });
    return routingControl;
}

export function setCurrentPosition(pos: any) {
    routingControl.setWaypoints([L.latLng(pos.lat, pos.lng)]);
    routingControl._container.style.display = "None";
}

export function setDestinationPosition(pos: any) {
    let curPos = routingControl.getWaypoints()[0].latLng;
    // console.log(curPos);
    routingControl.setWaypoints([
        L.latLng(curPos.lat, curPos.lng),
        L.latLng(pos.lat, pos.lng),
    ]);
    // routingControl._container.style.display = "Block";
}

export function exportRoute(navigator: NavigatorApp) {
    let waypoints = routingControl.getWaypoints();
    let curPos = waypoints[0].latLng;
    let destPos = waypoints[1].latLng;
    if (navigator === NavigatorApp.GOOGLE_MAPS) {
        window.open(
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
    } else if (navigator === NavigatorApp.WAZE) {
        window.open(
            "https://www.waze.com/de/live-map/directions?to=ll." +
                destPos.lat +
                "%2C" +
                destPos.lng +
                "&from=ll." +
                curPos.lat +
                "%2C" +
                curPos.lng
        );
    } else if (navigator === NavigatorApp.APPLE_MAPS) {
        window.open(
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
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
