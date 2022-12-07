import { ReactElement, useState } from "react";
import "./settings.css";
import Searchbar from "./Searchbar";
import Settings from "./settings";
import MenuButton from "./menuButton";

const Menu: React.FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Searchbar />
      <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <Settings isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Menu;
