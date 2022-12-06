// This file contains all the types used in the API calls to the Wikipedia API

// Model for the wikipdia url parameters
export type Params = {
  action: string;
  list: string;
  srsearch: string;
  format: string;
};

// Model for the wikipedia search results
type Search = {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: Date;
};

// Model for the wikipedia api response
export type WikiApiResponse = {
  batchcomplete: string;
  continue: {
    sroffset: number;
    continue: string;
  };
  query: {
    searchinfo: {
      totalhits: number;
    };
    search: Search[];
  };
};
