import { createContext, useState, FC, ReactElement } from "react";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import { InformationContextState, Information } from "./types";

export const contextDefaultValues: InformationContextState = {
    informations: {
        isModalOpen: false,
        locationInfo: null,
        curPosInformationInfo: null,
        showCurPosInformation: true,
        setIsModalOpen: () => undefined,
        setLocationInfo: () => undefined,
        setCurPosLocationInfo: () => undefined,
        setShowCurPosInformation: () => undefined,
    },
};

export const InformationContext =
    createContext<InformationContextState>(contextDefaultValues);

type ProviderPorps = {
    children: ReactElement;
};

const InformationsProvider: FC<ProviderPorps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [locationInfo, setLocationInfo] = useState<WikiApiDataModel[] | null>(
        null
    );
    const [curPosInformationInfo, setCurPosLocationInfo] = useState<
        WikiApiDataModel[] | null
    >(null);
    const [showCurPosInformation, setShowCurPosInformation] =
        useState<boolean>(true);
    const [informations, setInformations] = useState<Information>({
        isModalOpen: isModalOpen,
        locationInfo: locationInfo,
        curPosInformationInfo: curPosInformationInfo,
        showCurPosInformation: showCurPosInformation,
        setIsModalOpen: setIsModalOpen,
        setLocationInfo: setLocationInfo,
        setCurPosLocationInfo: setCurPosLocationInfo,
        setShowCurPosInformation: setShowCurPosInformation,
    });
    return (
        <InformationContext.Provider
            value={{
                informations,
            }}
        >
            {props.children}
        </InformationContext.Provider>
    );
};

export default InformationsProvider;
