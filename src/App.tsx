import { IonApp, setupIonicReact } from "@ionic/react";

import Map from "./components/Map";
import SheetModal from "./components/SheetModal/SheetModal";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./global.css";

import "./i18n/config";

/* Theme variables */
import "./theme/variables.css";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { WikiApiDataModel } from "./models/wikiApiDataModel";
import Menu from "./components/Menu/Menu";
import { useTranslation } from "react-i18next";
import { ConfigContext } from "./components/ConfigContext/ConfigContext";
import { InformationContext } from "./components/InformationContext";
import { Theme } from "./components/ConfigContext/types";

setupIonicReact();

const App: React.FC = (): ReactElement => {
    const { configs } = useContext(ConfigContext);
    const { i18n } = useTranslation();
    const [locationInfo, setLocationInfo] = useState<WikiApiDataModel[] | null>(
        null
    );
    const [curPosLocationInfo, setCurPosLocationInfo] = useState<
        WikiApiDataModel[] | null
    >(null);
    const [showCurPosInformation, setShowCurPosInformation] =
        useState<boolean>(true);

    const { informations } = useContext(InformationContext);
    // const [isModalOpen, setModalOpen] = useState<boolean>(false);  // was replaced by informations context

    useEffect(() => {
        i18n.changeLanguage(configs.language);
    }, []);

    useEffect(() => {
        const theme = configs.theme;

        if (theme === Theme.LIGHT) {
            document.body.classList.toggle("dark", false);
        } else if (theme === Theme.DARK) {
            document.body.classList.toggle("dark", true);
        } else if (theme === Theme.SYSTEM_SETTING) {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            document.body.classList.toggle("dark", prefersDark.matches);
        }
    });

    return (
        <IonApp>
            <Map
                onLocationChange={setLocationInfo}
                onCurPosLocationChange={setCurPosLocationInfo}
                setModalOpen={informations.setIsModalOpen}
                setShowCurPosInformation={setShowCurPosInformation}
            >
                <Menu
                    onLocationChange={setLocationInfo}
                    onCurPosLocationChange={setCurPosLocationInfo}
                    setModalOpen={informations.setIsModalOpen}
                    setShowCurPosInformation={setShowCurPosInformation}
                />
                <SheetModal
                    data={
                        showCurPosInformation
                            ? curPosLocationInfo
                            : locationInfo
                    }
                    isModalOpen={informations.isModalOpen}
                    setModalOpen={informations.setIsModalOpen}
                    showCurPosInformation={showCurPosInformation}
                    setShowCurPosInformation={setShowCurPosInformation}
                />
            </Map>
        </IonApp>
    );
};

export default App;
