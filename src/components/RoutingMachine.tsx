import "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "./routingMachine.css";
declare let L: any;

function createRoutineMachineLayer(props: any) {
    console.log(props.pos1);
    const instance = L.Routing.control({
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
    return instance;
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
