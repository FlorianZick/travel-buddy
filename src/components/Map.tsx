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
import RoutingMachine, {
    getCurrentPosition,
    setCurrentPosition,
    setDestinationPosition,
} from "./RoutingMachine";
import SatelliteButton from "./SatelliteButton";
import "./map.css";
import {
    CurPosInfoContext,
    LocationInfoContext,
    ModalContext,
    ShowCurPosInfoContext,
} from "./InformationContext/InformationContext";

// Set correct icons for leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

/**
 * Interface for props
 */
interface Props {
    children?: React.ReactNode;
}

function LocationMarker(props: Props) {
    const { configs } = useContext(ConfigContext);
    const map = useMap();
    const { t } = useTranslation();
    const { setIsModalOpen } = useContext(ModalContext);
    const { setShowCurPosInformation } = useContext(ShowCurPosInfoContext);
    const { setCurPosInformationInfo } = useContext(CurPosInfoContext);
    const { setLocationInfo } = useContext(LocationInfoContext);
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
                setCurPosInformationInfo,
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
                curPos ? setLocationInfo : setCurPosInformationInfo,
                configs.language
            ).then(() => {
                setShowCurPosInformation(curPos ? false : true);
                setIsModalOpen(true);
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

/**
 * Check is current theme is dark
 * @param configs config context
 * @returns is dark
 */
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

/**
 * Get element by class name once it has finished loading
 * @param className class name
 * @returns element
 */
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

const Map: React.FC<Props> = ({ children }): React.ReactElement => {
    const [isSatellite, setIsSatellite] = React.useState(false);
    const { configs } = useContext(ConfigContext);
    async function changeThemeFilter(darkMap: boolean, darkTheme: boolean) {
        await getElementByClassNameAsync("leaflet-layer mapTiles").then(
            (tilesRef) => {
                if (tilesRef) {
                    tilesRef.classList.toggle("darkTiles", darkMap);
                }
            }
        );
        document.querySelector("form")?.classList.toggle("darkForm", darkTheme);
        document
            .getElementById("settingsIcon")
            ?.classList.toggle("darkTheme", darkTheme);
    }

    React.useEffect(() => {
        let darkMap = false;
        let darkTheme = checkThemeDark(configs);
        if (!isSatellite) {
            darkMap = darkTheme;
        }
        changeThemeFilter(darkMap, darkTheme);
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
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    minZoom={3}
                />
            ) : (
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="mapTiles"
                    minZoom={3}
                />
            )}
            {children}
            <SatelliteButton
                isSatellite={isSatellite}
                setIsSatellite={setIsSatellite}
            />
            <LocationMarker />
            <RoutingMachine />
        </MapContainer>
    );
};

export default Map;
