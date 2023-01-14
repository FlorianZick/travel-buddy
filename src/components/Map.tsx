import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import { useTranslation } from "react-i18next";
import { fetchWikiData } from "../api/fetchWikiData";
import { reverseGeoEncoding } from "../api/reverseGeoEncoding";
import { ConfigContext } from "./ConfigContext";
import { useContext } from "react";
import { Language, Theme } from "./ConfigContext/types";
import { WikiApiDataModel } from "../models/wikiApiDataModel";
import RoutingMachine, {
    getCurrentPosition,
    setCurrentPosition,
    setDestinationPosition,
} from "./RoutingMachine";
import SatelliteButton from "./satelliteButton";
import "./map.css";

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
            setCurrentPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
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
            const curPos = getCurrentPosition();
            setDestinationPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            loadLocationData(
                e.latlng,
                curPos ? props.onLocationChange : props.onCurPosLocationChange,
                configs.language
            ).then(() => {
                props.setShowCurPosInformation(curPos ? false : true);
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
}

function checkThemeDark(configs: any) {
    let isDark = false;
    if (configs.theme === Theme.DARK) {
        isDark = true;
    } else if (configs.theme === Theme.SYSTEM_SETTING) {
        if (window.matchMedia("(prefers-color-scheme: dark)")) {
            isDark = true;
        }
    }
    return isDark;
}

async function getElementByClassNameAsync(className: string): Promise<Element> {
    return new Promise((resolve) => {
        const getElement = () => {
            const element = document.getElementsByClassName(className)[0];
            if (element) {
                resolve(element);
            } else {
                requestAnimationFrame(getElement);
            }
        };
        getElement();
    });
}

const Map: React.FC<Props> = ({
    onLocationChange,
    onCurPosLocationChange,
    setModalOpen,
    setShowCurPosInformation,
    children,
}): React.ReactElement => {
    const [isSatellite, setIsSatellite] = React.useState(false);
    const { configs } = useContext(ConfigContext);
    async function adjustMapFilter(darkMap: boolean) {
        await getElementByClassNameAsync("leaflet-layer mapTiles").then(
            (tilesRef) => {
                if (tilesRef) {
                    tilesRef.classList.toggle("darkTiles", darkMap);
                }
            }
        );
    }

    React.useEffect(() => {
        let darkMap = false;
        if (!isSatellite) {
            darkMap = checkThemeDark(configs);
        }
        adjustMapFilter(darkMap);
    }, [configs, isSatellite]);
    return (
        <MapContainer
            center={{ lat: 51.166, lng: 10.452 }}
            zoom={13}
            style={{ width: "100%", height: "100vh" }}
            dragging={true}
            zoomControl={false}
        >
            {isSatellite ? (
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            ) : (
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="mapTiles"
                />
            )}
            {children}
            <SatelliteButton
                isSatellite={isSatellite}
                setIsSatellite={setIsSatellite}
            />
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
