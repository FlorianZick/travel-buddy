import { createContext, useState, FC, ReactElement, useEffect } from "react";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import {
  CurPosInformationState,
  LocationContextState,
  ModalContextState,
  ShowCurPosInformationState,
} from "./types";

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

const InformationsProvider: FC<ProviderPorps> = (props) => {
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
