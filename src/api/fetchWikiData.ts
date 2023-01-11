import { Language } from "../components/ConfigContext/types";
import { WikiApiDataModel } from "../models/wikiApiDataModel";
import { Params, WikiApiResponse } from "./apiTypes";

function getLanguageCode(lang: Language): string {
    switch (lang) {
        case Language.EN:
            return "en";
        case Language.DE:
            return "de";
        case Language.FR:
            return "fr";
        case Language.ES:
            return "es";
        case Language.IT:
            return "it";
        case Language.PT:
            return "pt";
        default:
            return "en";
    }
}

function isTermInvalid(term: string): boolean {
    const invalidTerms = [undefined, "undefined", "JavaScript", ""];
    return invalidTerms.includes(term);
}

function getInvalidTermErrorMessage(t: any): WikiApiDataModel[] {
    return [
        {
            title: t("errors.invalidTerm.title"),
            snippet: t("errors.invalidTerm.snippet"),
        },
    ];
}

function getDataTransmissionErrorMessage(t: any): WikiApiDataModel[] {
    return [
        {
            title: t("errors.dataTransmission.title"),
            snippet: t("errors.dataTransmission.title"),
        },
    ];
}

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

export async function fetchWikiData(
    t: any,
    term: string,
    lang: Language
): Promise<WikiApiDataModel[]> {
    if (isTermInvalid(term)) {
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
