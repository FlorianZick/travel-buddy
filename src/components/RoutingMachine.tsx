import "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "./routingMachine.css";
declare let L: any;

var routingControl: any;

function createRoutineMachineLayer(props: any) {
    console.log(props.pos1);
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(props.pos1.lat, props.pos1.lng),
            L.latLng(props.pos2.lat, props.pos2.lng),
        ],
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

export function changePosition(pos1: any) {
    routingControl.setWaypoints([
        L.latLng(pos1.lat, pos1.lng),
        routingControl.options.waypoints[1],
    ]);
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
