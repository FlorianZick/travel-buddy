import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTrans from "./en/translation.json";
import deTrans from "./de/translation.json";

export const resources = {
  en: {
    translation: enTrans,
  },
  de: {
    translation: deTrans,
  },
};

i18next.use(initReactI18next).init({
  lng: "de", // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});
