import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { ConfigContext } from "../ConfigContext/ConfigContext";
import { useContext } from "react";

import RoutingMachine from "../RoutingMachine";
import SatelliteButton from "./SatelliteButton/SatelliteButton";
import "./map.css";

import { Theme } from "../ConfigContext/types";
import LocationMarker from "./locationMarker";

// Set correct icons for leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

/**
 * Check is current theme is dark
 * @param configs config context
 * @returns is dark
 */
function checkThemeDark(configs: any): boolean {
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

/**
 * Props for the map component
 */
type MapProps = {
  children?: React.ReactNode;
};

/**
 * Functional component for map
 * @param children - Children of the map
 * @returns Map component
 */
const Map: React.FC<MapProps> = ({
  children,
}: MapProps): React.ReactElement => {
  const [isSatellite, setIsSatellite] = React.useState(false);

  const { configs } = useContext(ConfigContext);

  React.useEffect(() => {
    let darkMap = false;
    let darkTheme = checkThemeDark(configs);
    if (!isSatellite) {
      darkMap = darkTheme;
    }
    changeThemeFilter(darkMap, darkTheme);
  }, [configs, isSatellite]);

  /**
   * Change theme filter
   * @param darkMap is map dark
   * @param darkTheme is theme dark
   */
  async function changeThemeFilter(
    darkMap: boolean,
    darkTheme: boolean
  ): Promise<void> {
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
