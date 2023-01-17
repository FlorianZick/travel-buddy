import { WikiApiDataModel } from "../../models/wikiApiDataModel";

/**
 * State of information context
 */
export type InformationContextState = {
  informations: Information;
  setInformations: (information: Information) => void;
};

/**
 * Model for information context
 */
export type Information = {
  isModalOpen: boolean;
  locationInfo: WikiApiDataModel[] | null;
  curPosInformationInfo: WikiApiDataModel[] | null;
  showCurPosInformation: boolean;
};
