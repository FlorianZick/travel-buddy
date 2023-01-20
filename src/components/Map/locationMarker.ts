import * as React from "react";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import { useTranslation } from "react-i18next";
import { fetchWikiData } from "../../api/fetchWikiData";
import { reverseGeoEncoding } from "../../api/reverseGeoEncoding";
import { ConfigContext } from "../ConfigContext";
import { useContext } from "react";
import { Language } from "../ConfigContext/types";
import {
  getCurrentPosition,
  setCurrentPosition,
  setDestinationPosition,
} from "../RoutingMachine";
import "./map.css";
import {
  CurPosInfoContext,
  LocationInfoContext,
  ModalContext,
  ShowCurPosInfoContext,
} from "../InformationContext/InformationContext";

/**
 * Location Marker component
 */
export default function LocationMarker(): null {
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
    // eslint-disable-next-line
  }, [configs.language]);

  /**
   * Callback for the location found event
   * @param e event
   */
  const mapLocateCallback = React.useCallback(
    (e: any): void => {
      setCurrentPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      loadLocationData(e.latlng, setCurPosInformationInfo, configs.language);
    },
    // eslint-disable-next-line
    [configs.language]
  );

  /**
   * Callback for the click event
   * @param e event
   */
  const mapClickCallback = React.useCallback(
    (e: any): void => {
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
    // eslint-disable-next-line
    [configs.language]
  );

  /**
   * Loads the location data and sets the wiki data
   * @param location Location to load the data from
   * @param setWikiData function to set the wiki data
   * @param lang language to use
   */
  async function loadLocationData(
    location: LatLng,
    setWikiData: any,
    lang: Language
  ): Promise<void> {
    const locationData = await reverseGeoEncoding(location.lat, location.lng);
    const wikiData = await fetchWikiData(t, locationData.city, lang);
    setWikiData(wikiData);
  }
  return null;
}
