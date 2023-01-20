import React, { ReactElement, useState } from "react";
import Settings from "./Settings/Settings";
import MenuButton from "./MenuButton";
import "./menu.css";
import "./leafletGeosearch.css";
import { SearchField } from "./SearchField";

/**
 * Props for the menu component
 */
type MenuProps = {
  apiKey?: string;
};

/**
 * Menu component
 * @param apiKey - API key for geocoding
 */
const Menu: React.FC<MenuProps> = ({ apiKey }: MenuProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <SearchField apiKey={apiKey} />
      <MenuButton setIsOpen={setIsOpen} />
      <Settings isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Menu;
