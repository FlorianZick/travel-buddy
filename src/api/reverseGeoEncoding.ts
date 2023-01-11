import { NominatimAddressModel } from "../models/nominatimAddressModel";

/**
 * Determines Address from coordinates
 * @param {string} way - Map coordinates format "way", e.g. 50637691
 * @returns NominatimAddressModel - Address as Object
 */
export async function reverseGeoEncoding(
    lat: number,
    lon: number
): Promise<NominatimAddressModel> {
    // Coordinate types: node(N), way(W), relation(R).
    let url: string = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
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

            // leaflet differs between city town and village
            let cityTag = "city";
            cityTag = addressResponse.hasOwnProperty("town") ? "town" : cityTag;
            cityTag = addressResponse.hasOwnProperty("village")
                ? "village"
                : cityTag;

            addressResult = {
                road: addressResponse["road"],
                postcode: addressResponse["postcode"],
                city: addressResponse[cityTag],
                state: addressResponse["state"],
                country: addressResponse["country"],
            };
        })
        .catch((e) => {
            addressResult = {
                road: "",
                postcode: "",
                city: "",
                state: "",
                country: "",
            };
        });

    return addressResult;
}
