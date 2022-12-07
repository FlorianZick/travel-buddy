import { NominatimAddressModel } from "../models/nominatimAddressModel";

/**
 * Determines Address from coordinates
 * @param {string} way - Map coordinates format "way", e.g. 50637691
 * @returns NominatimAddressModel - Address as Object
 */
export async function reverseGeoEncoding(lat: number, lon: number): Promise<NominatimAddressModel> {
    
  // Coordinate types: node(N), way(W), relation(R).
  let url:string = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  let addressResult: NominatimAddressModel = {} as NominatimAddressModel;

  // fetch data from nominatim API
  await fetch(url)

    // convert response to json
    .then((response: Response) => response.json())

    // extract data
    .then((response) => {
      
      // catch error
      if (response.address === undefined) {
        console.log("Error: No address found!");
        return;
      }

      // save data
      let addressResponse = response.address;
      
      addressResult = {
          road: addressResponse["road"],
          postcode: addressResponse["postcode"],
          city: addressResponse["city"],
          state: addressResponse["state"],
          country: addressResponse["country"]
      };
    });

  return addressResult;
}

  