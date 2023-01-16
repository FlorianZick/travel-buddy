import React, { ReactElement, useContext, useState } from "react";
import Settings from "./Settings/Settings";
import { useTranslation } from "react-i18next";
import L, { LatLng } from "leaflet";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import MenuButton from "./MenuButton";
import { Language } from "../ConfigContext/types";
import { fetchWikiData } from "../../api/fetchWikiData";
import { getLanguageCode } from "../../api/fetchWikiData";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import { reverseGeoEncoding } from "../../api/reverseGeoEncoding";
import { ConfigContext } from "../ConfigContext";
import { setDestinationPosition, getCurrentPosition } from "../RoutingMachine";
import "./menu.css";
import "./leafletGeosearch.css";

/**
 * Interface for props
 */
interface Props {
    onLocationChange: React.Dispatch<
        React.SetStateAction<WikiApiDataModel[] | null>
    >;
    onCurPosLocationChange: React.Dispatch<
        React.SetStateAction<WikiApiDataModel[] | null>
    >;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setShowCurPosInformation: React.Dispatch<React.SetStateAction<boolean>>;
    apiKey?: string;
}

const SearchField = ({
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
        const locationData = await reverseGeoEncoding(
            location.lat,
            location.lng
        );
        const wikiData = await fetchWikiData(t, locationData.city, lang);
        setWikiData(wikiData);
    }
    return null;
};

const Menu: React.FC<Props> = ({
    onLocationChange,
    onCurPosLocationChange,
    setModalOpen,
    setShowCurPosInformation,
    apiKey,
}): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { configs } = useContext(ConfigContext);
    const { t } = useTranslation();
    return (
        <div>
            <SearchField
                onLocationChange={onLocationChange}
                onCurPosLocationChange={onCurPosLocationChange}
                setModalOpen={setModalOpen}
                setShowCurPosInformation={setShowCurPosInformation}
                configs={configs}
                apiKey={apiKey}
                t={t}
            />
            <MenuButton setIsOpen={setIsOpen} />
            <Settings isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Menu;
