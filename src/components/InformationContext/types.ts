import { Dispatch, SetStateAction } from "react";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";

/**
 * States of modal context
 */
export type ModalContextState = {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * States of location context
 */
export type LocationContextState = {
    locationInfo: WikiApiDataModel[] | null;
    setLocationInfo: Dispatch<SetStateAction<WikiApiDataModel[] | null>>;
};

/**
 * States of current position information context
 */
export type CurPosInformationState = {
    curPosInformationInfo: WikiApiDataModel[] | null;
    setCurPosInformationInfo: Dispatch<
        SetStateAction<WikiApiDataModel[] | null>
    >;
};

/**
 * States of show current position information context
 */
export type ShowCurPosInformationState = {
    showCurPosInformation: boolean;
    setShowCurPosInformation: Dispatch<SetStateAction<boolean>>;
};
