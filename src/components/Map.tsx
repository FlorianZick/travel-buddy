import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import { useTranslation } from "react-i18next";
import { fetchWikiData } from "../api/fetchWikiData";
import { reverseGeoEncoding } from "../api/reverseGeoEncoding";
import { ConfigContext } from "./ConfigContext";
import { useContext } from "react";
import { Language } from "./ConfigContext/types";
import { WikiApiDataModel } from "../models/wikiApiDataModel";
import RoutingMachine, {
    setCurrentPosition,
    setDestinationPosition,
} from "./RoutingMachine";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// interface for props
interface Props {
    onLocationChange: React.Dispatch<
        React.SetStateAction<WikiApiDataModel[] | null>
    >;
    onCurPosLocationChange: React.Dispatch<
        React.SetStateAction<WikiApiDataModel[] | null>
    >;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setShowCurPosInformation: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}

function LocationMarker(props: Props) {
    const { configs } = useContext(ConfigContext);

    const [position, setPosition] = React.useState<L.LatLng>();

    // const [bbox, setBbox] = React.useState<string[]>([]);
    const map = useMap();
    const { t } = useTranslation();

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
            setCurrentPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            // const radius = e.accuracy;
            // const circle = L.circle(e.latlng, radius);
            // circle.addTo(map);
            // setBbox(e.bounds.toBBoxString().split(","));
            loadLocationData(
                e.latlng,
                props.onCurPosLocationChange,
                configs.language
            ).then(() => {
                // props.setModalOpen(true);
            });
        },
        [configs.language]
    );

    const mapClickCallback = React.useCallback(
        (e: any) => {
            setPosition(e.latlng);
            setDestinationPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            loadLocationData(
                e.latlng,
                props.onLocationChange,
                configs.language
            ).then(() => {
                props.setShowCurPosInformation(false);
                props.setModalOpen(true);
            });
        },
        [configs.language]
    );

    async function loadLocationData(
        location: LatLng,
        setWikiData: any,
        lang: Language
    ) {
        const locationData = await reverseGeoEncoding(
            location.lat,
            location.lng
        );

        const wikiData = await fetchWikiData(t, locationData.city, lang);

        setWikiData(wikiData);
    }

    return null;
    // position === undefined ? null : (
    // <></>
    // <Marker
    //     position={position}
    //     eventHandlers={{
    //         click: (e) => {
    //             props.setModalOpen(true);
    //         },
    //     }}
    // >
    //     {/* <Popup>
    //         Mein Standort
    //         <br />
    //         (Blauer Kreis = Genauigkeit
    //         <br /> des Standorts)
    //     </Popup> */}
    // </Marker>
    // );
}

const Map: React.FC<Props> = ({
    onLocationChange,
    onCurPosLocationChange,
    setModalOpen,
    setShowCurPosInformation,
    children,
}): React.ReactElement => {
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
            {children}
            <LocationMarker
                onLocationChange={onLocationChange}
                onCurPosLocationChange={onCurPosLocationChange}
                setModalOpen={setModalOpen}
                setShowCurPosInformation={setShowCurPosInformation}
            />
            <RoutingMachine />
        </MapContainer>
    );
};

export default Map;

// const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
// useEffect(() => {
//     // Update network status
//     const handleStatusChange = () => {
//         setIsOnline(navigator.onLine);
//     };
//     // Listen to the online status
//     window.addEventListener("online", handleStatusChange);
//     // Listen to the offline status
//     window.addEventListener("offline", handleStatusChange);
//     // Specify how to clean up after this effect for performance improvment
//     return () => {
//         window.removeEventListener("online", handleStatusChange);
//         window.removeEventListener("offline", handleStatusChange);
//     };
// }, [isOnline]);
