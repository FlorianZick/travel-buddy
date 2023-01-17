import { createContext, useState, FC, ReactElement, useEffect } from "react";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import { InformationContextState, Information } from "./types";

export const contextDefaultValues: InformationContextState = {
  informations: {
    isModalOpen: false,
    locationInfo: null,
    curPosInformationInfo: null,
    showCurPosInformation: true,
  },
  setInformations: () => undefined,
};

export const InformationContext =
  createContext<InformationContextState>(contextDefaultValues);

type ProviderPorps = {
  children: ReactElement;
  information: Information;
};

const InformationsProvider: FC<ProviderPorps> = (props) => {
  const [informations, setInformations] = useState<Information>(
    props.information
  );

  useEffect(() => {
    console.log(informations);
  }, [informations]);

  return (
    <InformationContext.Provider
      value={{
        informations,
        setInformations,
      }}
    >
      {props.children}
    </InformationContext.Provider>
  );
};

export default InformationsProvider;
