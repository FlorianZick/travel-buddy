import { Dispatch, SetStateAction } from "react";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";

/**
 * States of information context
 */
export type ModalContextState = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type LocationContextState = {
  locationInfo: WikiApiDataModel[] | null;
  setLocationInfo: Dispatch<SetStateAction<WikiApiDataModel[] | null>>;
};

export type CurPosInformationState = {
  curPosInformationInfo: WikiApiDataModel[] | null;
  setCurPosInformationInfo: Dispatch<SetStateAction<WikiApiDataModel[] | null>>;
};

export type ShowCurPosInformationState = {
  showCurPosInformation: boolean;
  setShowCurPosInformation: Dispatch<SetStateAction<boolean>>;
};
