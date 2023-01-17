import L, { LatLng } from "leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import React, { useState } from "react";
import { useMap } from "react-leaflet";
import { getLanguageCode, fetchWikiData } from "../../api/fetchWikiData";
import { reverseGeoEncoding } from "../../api/reverseGeoEncoding";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import { Language } from "../ConfigContext/types";
import { getCurrentPosition, setDestinationPosition } from "../RoutingMachine";

export const SearchField = ({
  onLocationChange,
  onCurPosLocationChange,
  setModalOpen,
  setShowCurPosInformation,
  configs,
  apiKey,
  t,
}: {
  onLocationChange: React.Dispatch<
    React.SetStateAction<WikiApiDataModel[] | null>
  >;
  onCurPosLocationChange: React.Dispatch<
    React.SetStateAction<WikiApiDataModel[] | null>
  >;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCurPosInformation: React.Dispatch<React.SetStateAction<boolean>>;
  configs: any;
  apiKey: any;
  t: any;
}) => {
  const [lastControl, setLastControl] = useState<any>(null);
  const mapShowlocationCallback = (res: any) => {
    const curPos = getCurrentPosition();
    setDestinationPosition({ lat: res.location.y, lng: res.location.x });
    map.flyTo({ lat: res.location.y, lng: res.location.x }, map.getZoom());
    loadLocationData(
      L.latLng({
        lat: res.location.y,
        lng: res.location.x,
      }),
      curPos ? onLocationChange : onCurPosLocationChange,
      configs.language
    ).then(() => {
      setShowCurPosInformation(curPos ? false : true);
      setModalOpen(true);
    });

    console.log(res.location);
  };

  const map = useMap();
  React.useEffect(() => {
    if (lastControl) {
      map.removeControl(lastControl);
    }
    const provider = new OpenStreetMapProvider({
      params: {
        access_token: apiKey,
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
    console.log("Create control");
    map.addControl(searchControl);
    map.removeEventListener("geosearch/showlocation");
    map.on("geosearch/showlocation", mapShowlocationCallback);
  }, [configs.language]);

  async function loadLocationData(
    location: LatLng,
    setWikiData: any,
    lang: Language
  ) {
    const locationData = await reverseGeoEncoding(location.lat, location.lng);
    const wikiData = await fetchWikiData(t, locationData.city, lang);
    setWikiData(wikiData);
  }
  return null;
};
