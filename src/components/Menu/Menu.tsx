import React, { ReactElement, useContext, useState } from "react";
import Settings from "./Settings/Settings";
import { useTranslation } from "react-i18next";
import MenuButton from "./MenuButton";
import { WikiApiDataModel } from "../../models/wikiApiDataModel";
import { ConfigContext } from "../ConfigContext";
import "./menu.css";
import "./leafletGeosearch.css";
import { SearchField } from "./SearchField";

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
