import { LatLng } from "leaflet";
import type { Placemark } from "./placemark-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function getMarkerLayer(placemarks: Placemark[]): MarkerLayer {
    const markerSpecs = Array<MarkerSpec>();
    placemarks.forEach((placemark) => {
        markerSpecs.push({
            id: placemark.categoryid,
            title: placemark.name,
            location: new LatLng(placemark.latitude, placemark.longitude),
            popup: true
        });
    });
    return { title: "donations", markerSpecs: markerSpecs };
}
