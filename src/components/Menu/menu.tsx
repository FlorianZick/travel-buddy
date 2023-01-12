import React, { ReactElement, useState } from "react";
import Settings from "./Settings/settings";
import MenuButton from "./menuButton";
import { useMap } from "react-leaflet";

import {GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'; 

import Searchbar from "./Searchbar";
import "./leaflet-geosearch.css"

import "./menu.css";

interface Props {
    apiKey?: string;
}

const SearchField = ({ apiKey } : {apiKey:any}) => {
    const provider = new OpenStreetMapProvider({
      params: {
        access_token: apiKey,
      },
    });
  
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
    });
    
    const map = useMap();
    React.useEffect(() => {map.addControl(searchControl);}, [])
  
    return null;
  };   

const Menu: React.FC<Props> = ({apiKey}): ReactElement => {
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
