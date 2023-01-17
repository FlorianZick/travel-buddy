import React, { ReactElement, useState } from "react";
import Settings from "./Settings/Settings";
import MenuButton from "./MenuButton";
import "./menu.css";
import "./leafletGeosearch.css";
import { SearchField } from "./SearchField";

/**
 * Interface for props
 */
interface Props {
    apiKey?: string;
}

const Menu: React.FC<Props> = ({ apiKey }): ReactElement => {
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
