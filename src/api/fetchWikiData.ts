import { Language } from "../components/ConfigContext/types";
import { WikiApiDataModel } from "../models/wikiApiDataModel";
import { Params, WikiApiResponse } from "./apiTypes";

function getLanguageCode(lang: Language) {
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

export async function fetchWikiData(
    term: string,
    lang: Language
): Promise<WikiApiDataModel[]> {
    // array to hold the data we need from the search results
    let wikiSearchResults: WikiApiDataModel[] = [];
    if (
        term === undefined ||
        term === "undefined" ||
        term === "JavaScript" ||
        term === ""
    ) {
        wikiSearchResults.push({
            title: "Keine Informationen gefunden",
            snippet: "Es wurden keine Informationen zu diesem Ort gefunden.",
        });
        return wikiSearchResults;
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
            wikiSearchResults.push({
                title: "Fehler bei Datenübertragung",
                snippet:
                    "Beim Empfangen der Informationen von Wikipedia ist ein Fehler aufgetreten, bitte versuchen Sie es zu einem späteren Zeitpunkt erneut!",
            });
        });

    if (wikiSearchResults.length === 0) {
        wikiSearchResults.push({
            title: "Keine Informationen gefunden",
            snippet:
                "Es wurden unter " +
                url.split("?origin=*")[0] +
                " keine Informationen zu dem Term " +
                term +
                " gefunden.",
        });
    }
    return wikiSearchResults;
}
