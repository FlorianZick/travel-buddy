import L, { LatLng } from "leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useMap } from "react-leaflet";
import { getLanguageCode, fetchWikiData } from "../../../api/fetchWikiData";
import { reverseGeoEncoding } from "../../../api/reverseGeoEncoding";
import { Language } from "../../ConfigContext/types";
import {
  getCurrentPosition,
  setDestinationPosition,
} from "../../RoutingMachine";
import {
  CurPosInfoContext,
  LocationInfoContext,
  ModalContext,
  ShowCurPosInfoContext,
} from "../../InformationContext/InformationContext";
import { ConfigContext } from "../../ConfigContext";

type SearchFieldProps = {
  apiKey: string | undefined;
};

/**
 * SearchField component for the map
 */
export const SearchField = ({ apiKey }: SearchFieldProps): null => {
  const { t } = useTranslation();
  const { configs } = useContext(ConfigContext);
  const { setIsModalOpen } = useContext(ModalContext);
  const { setShowCurPosInformation } = useContext(ShowCurPosInfoContext);
  const { setCurPosInformationInfo } = useContext(CurPosInfoContext);
  const { setLocationInfo } = useContext(LocationInfoContext);
  const [lastControl, setLastControl] = useState<any>(null);

  /**
   * Flies to the destination location and loads the information about the location
   * @param res information about the destination location
   */
  const mapShowlocationCallback = (res: any): void => {
    const curPos = getCurrentPosition();
    setDestinationPosition({ lat: res.location.y, lng: res.location.x });
    map.flyTo({ lat: res.location.y, lng: res.location.x }, map.getZoom());
    loadLocationData(
      L.latLng({
        lat: res.location.y,
        lng: res.location.x,
      }),
      curPos ? setLocationInfo : setCurPosInformationInfo,
      configs.language
    ).then(() => {
      setShowCurPosInformation(curPos ? false : true);
      setIsModalOpen(true);
    });
  };

  const map = useMap();

  React.useEffect(() => {
    if (lastControl) {
      map.removeControl(lastControl);
    }
    const provider = new OpenStreetMapProvider({
      params: {
        access_token: apiKey!,
        "accept-language": getLanguageCode(configs.language),
      },
    });

    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      notFoundMessage: t("errors.noSearchResult"),
      updateMap: false,
    });

    setLastControl(searchControl);
    map.addControl(searchControl);
    map.removeEventListener("geosearch/showlocation");
    map.on("geosearch/showlocation", mapShowlocationCallback);
    // eslint-disable-next-line
  }, [configs.language]);

  /**
   * Loads the information about the location
   * @param location location to load the information about
   * @param setWikiData function to set the information about the location
   * @param lang language of the information
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
};
