import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTrans from "./en/translation.json";
import deTrans from "./de/translation.json";
import frTrans from "./fr/translation.json";
import esTrans from "./es/translation.json";
import itTrans from "./it/translation.json";
import ptTrans from "./pt/translation.json";

// languaes names need to be the same in the i18next config and the configcontext language list
export const resources = {
    English: {
        translation: enTrans,
    },
    German: {
        translation: deTrans,
    },
    French: {
        translation: frTrans,
    },
    Spanish: {
        translation: esTrans,
    },
    Italian: {
        translation: itTrans,
    },
    Portuguese: {
        translation: ptTrans,
    },
};

i18next.use(initReactI18next).init({
    lng: "German", // default language
    resources,
});
