import { ReactElement, useState } from "react";
import Searchbar from "./Searchbar";
import Settings from "./Settings/settings";
import MenuButton from "./menuButton";

import "./menu.css";

const Menu: React.FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Searchbar />
      <MenuButton setIsOpen={setIsOpen} />
      <Settings isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Menu;