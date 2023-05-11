import { LatLng } from "leaflet";
import type { Category, Placemark } from "./placemark-types";
import type { MarkerLayer, MarkerSpec } from "./markers";
import type { ChartData } from "./charts";

export function getMarkerLayer(title: string, placemarks: Placemark[]): MarkerLayer {
    const markerSpecs = Array<MarkerSpec>();
    placemarks.forEach((placemark) => {
        markerSpecs.push({
            id: placemark.categoryid,
            title: placemark.name,
            location: new LatLng(placemark.latitude, placemark.longitude),
            popup: true
        });
    });
    return { title, markerSpecs: markerSpecs };
}

export function generateMarkerSpec(placemark: Placemark): MarkerSpec {
    return <MarkerSpec>{
        id: placemark.categoryid,
        title: placemark.name,
        location: {
            lat: placemark.latitude,
            lng: placemark.longitude
        }
    };
}

export function generateByCategoryID(categories: Category[], placemarks: Placemark[]): ChartData {
    const data: ChartData = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };
    categories.forEach((category) => {
        data.labels.push(category.title);
        let total = 0;
        placemarks.forEach((placemark) => {
            if (placemark.categoryid === category._id) {
                total += 1;
            }
        }),
        data.datasets[0].values.push(total);
    });
    return data;
}