import { WikiApiDataModel } from "../models/wikiApiDataModel";
import { Params, WikiApiResponse } from "./apiTypes";

export async function fetchWikiData(term: string): Promise<WikiApiDataModel[]> {
  let url = "https://en.wikipedia.org/w/api.php";

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
          queryResultPageTitle: search.title,
          queryResultPageSnippet: search.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // remove html tags from the snippet
        });
      }
    });

  return wikiSearchResults;
}
