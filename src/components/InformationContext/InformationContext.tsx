import { createContext, useState, FC, ReactElement } from "react";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import {
  CurPosInformationState,
  LocationContextState,
  ModalContextState,
  ShowCurPosInformationState,
} from "./types";

// Default values for the contexts
export const CurPosInfoDefault: CurPosInformationState = {
  curPosInformationInfo: null,
  setCurPosInformationInfo: () => undefined,
};

export const LocationInfoDefault: LocationContextState = {
  locationInfo: null,
  setLocationInfo: () => undefined,
};

export const ModalDefault: ModalContextState = {
  isModalOpen: false,
  setIsModalOpen: () => undefined,
};

export const ShowCurPosInfoDefault: ShowCurPosInformationState = {
  showCurPosInformation: true,
  setShowCurPosInformation: () => undefined,
};

// Create the contexts
export const CurPosInfoContext =
  createContext<CurPosInformationState>(CurPosInfoDefault);

export const LocationInfoContext =
  createContext<LocationContextState>(LocationInfoDefault);

export const ModalContext = createContext<ModalContextState>(ModalDefault);

export const ShowCurPosInfoContext = createContext<ShowCurPosInformationState>(
  ShowCurPosInfoDefault
);

type ProviderPorps = {
  children: ReactElement;
  curPosInformationInfo: WikiApiDataModel[] | null;
  locationInfo: WikiApiDataModel[] | null;
  isModalOpen: boolean;
  showCurPosInformation: boolean;
};

/**
 * This context provides the information about the location and the App States, that is used in several components
 * @param children Children
 * @param curPosInformationInfo Information about the current position
 * @param locationInfo Information about the location
 * @param isModalOpen Modal state
 * @param showCurPosInformation State if the current position information should be shown
 * @returns InformationProvider component
 */
const InformationsProvider: FC<ProviderPorps> = (props: ProviderPorps) => {
  const [curPosInformationInfo, setCurPosInformationInfo] = useState<
    WikiApiDataModel[] | null
  >(props.curPosInformationInfo);

  const [locationInfo, setLocationInfo] = useState<WikiApiDataModel[] | null>(
    props.locationInfo
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(props.isModalOpen);

  const [showCurPosInformation, setShowCurPosInformation] = useState<boolean>(
    props.showCurPosInformation
  );

  return (
    <CurPosInfoContext.Provider
      value={{
        curPosInformationInfo: curPosInformationInfo,
        setCurPosInformationInfo: setCurPosInformationInfo,
      }}
    >
      <LocationInfoContext.Provider
        value={{
          locationInfo: locationInfo,
          setLocationInfo: setLocationInfo,
        }}
      >
        <ModalContext.Provider
          value={{
            isModalOpen: isModalOpen,
            setIsModalOpen: setIsModalOpen,
          }}
        >
          <ShowCurPosInfoContext.Provider
            value={{
              showCurPosInformation: showCurPosInformation,
              setShowCurPosInformation: setShowCurPosInformation,
            }}
          >
            {props.children}
          </ShowCurPosInfoContext.Provider>
        </ModalContext.Provider>
      </LocationInfoContext.Provider>
    </CurPosInfoContext.Provider>
  );
};

export default InformationsProvider;
