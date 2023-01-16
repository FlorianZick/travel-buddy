import { WikiApiDataModel } from "../../models/wikiApiDataModel";

/**
 * State of information context
 */
export type InformationContextState = {
    informations: Information;
};

/**
 * Model for information context
 */
export type Information = {
    isModalOpen: boolean;
    locationInfo: WikiApiDataModel[] | null;
    curPosInformationInfo: WikiApiDataModel[] | null;
    showCurPosInformation: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setLocationInfo: React.Dispatch<
        React.SetStateAction<WikiApiDataModel[] | null>
    >;
    setCurPosLocationInfo: React.Dispatch<
        React.SetStateAction<WikiApiDataModel[] | null>
    >;
    setShowCurPosInformation: React.Dispatch<React.SetStateAction<boolean>>;
};
