import { Language } from "../components/ConfigContext/types";
import { WikiApiDataModel } from "../models/wikiApiDataModel";
import { Params, WikiApiResponse } from "./apiTypes";

/**
 * Get the language code for a language
 * @param {Language} lang Language
 * @returns {string} Language code in the form of a 2 character string
 */
export function getLanguageCode(lang: Language): string {
    let code: string = "en";
    switch (lang) {
        case Language.EN:
            code = "en";
            break;
        case Language.DE:
            code = "de";
            break;
        case Language.FR:
            code = "fr";
            break;
        case Language.ES:
            code = "es";
            break;
        case Language.IT:
            code = "it";
            break;
        case Language.PT:
            code = "pt";
            break;
    }
    return code;
}

/**
 * Checks if searchterm is invalid
 * @param {string} term Searchterm
 * @returns {boolean} Term is invalid
 */
function checkTermInvalid(term: string): boolean {
    const invalidTerms = [undefined, "undefined", "JavaScript", ""];
    return invalidTerms.includes(term);
}

/**
 * Generates invalid term error message
 * @param t Translater
 * @returns {WikiApiDataModel[]} Invalid term error message
 */
function getInvalidTermErrorMessage(t: any): WikiApiDataModel[] {
    return [
        {
            title: t("errors.invalidTerm.title"),
            snippet: t("errors.invalidTerm.snippet"),
        },
    ];
}

/**
 * Generate data transmission error message
 * @param t Translater
 * @returns {WikiApiDataModel[]} Data transmission error message
 */
function getDataTransmissionErrorMessage(t: any): WikiApiDataModel[] {
    return [
        {
            title: t("errors.dataTransmission.title"),
            snippet: t("errors.dataTransmission.title"),
        },
    ];
}

/**
 * Generate no information error message
 * @param t Translator
 * @param {string} url Url of wiki api which was called
 * @param {string} term Searchterm
 * @returns {WikiApiDataModel[]} No information error message
 */
function getNoInformationErrorMessage(
    t: any,
    url: string,
    term: string
): WikiApiDataModel[] {
    return [
        {
            title: t("errors.noInformation.title"),
            snippet:
                t("errors.noInformation.snippet1") +
                url.split("?origin=*")[0] +
                t("errors.noInformation.snippet2") +
                term +
                t("errors.noInformation.snippet3"),
        },
    ];
}

/**
 * Search wikipedia for searchterm
 * @param t Trnaslator
 * @param {string} term Searchterm
 * @param {Language} lang Language
 * @returns {Promise<WikiApiDataModel[]>} Wiki data
 */
export async function fetchWikiData(
    t: any,
    term: string,
    lang: Language
): Promise<WikiApiDataModel[]> {
    if (checkTermInvalid(term)) {
        return getInvalidTermErrorMessage(t);
    }
    let languageCode = getLanguageCode(lang);
    let url = "https://" + languageCode + ".wikipedia.org/w/api.php";
    // parameter for the search query for the wikipedia api
    const params: Params = {
        action: "query",
        list: "search",
        srsearch: term,
        format: "json",
    };
    // construct the url with the params
    url = url + "?origin=*";
    //iterate through params object and append to url
    Object.keys(params).forEach(function (key) {
        url += "&" + key + "=" + params[key as keyof Params];
    });
    // array to hold the data we need from the search results
    let wikiSearchResults: WikiApiDataModel[] = [];
    // fetch the data from the wikipedia api
    await fetch(url)
        // convert response to json
        .then((response: Response) => response.json())
        // extract the data we need from the search results
        .then((response: WikiApiResponse) => {
            let searchResults = response.query.search;
            // iterate through the search results
            for (let i in searchResults) {
                let search = searchResults[i];
                wikiSearchResults.push({
                    title: search.title,
                    snippet: search.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // remove html tags from the snippet
                });
            }
        })
        .catch((e) => {
            return getDataTransmissionErrorMessage(t);
        });
    if (wikiSearchResults.length === 0) {
        return getNoInformationErrorMessage(t, url, term);
    }
    return wikiSearchResults;
}
