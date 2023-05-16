import { LatLng } from "leaflet";
import type { Category, Placemark, User, Weather } from "./placemark-types";
import type { MarkerLayer, MarkerSpec } from "./markers";
import type { ChartData } from "./charts";

export function getMarkerLayer(title: string, placemarks: Placemark[]): MarkerLayer {
    const markerSpecs = Array<MarkerSpec>();
    placemarks.forEach((placemark) => {
        markerSpecs.push({
            id: placemark.categoryid,
            title: `<a href='/navigator/${placemark._id}'>${placemark.name} <small>(click for details}</small></a>`,
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

export function generateByUser(users: User[]): ChartData {
    const data: ChartData = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };
    data.labels.push("Admins");
    data.datasets[0].values.push(users.filter(user => user.admin).length);
    data.labels.push("Users");
    data.datasets[0].values.push(users.filter(user => !user.admin).length);
    return data;
}

export function generateByTemperature(weather: Weather): ChartData {
    const data: ChartData = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };
    const weatherSlice = weather.list.slice(0, 5);
    weatherSlice.forEach((temp) => {
        data.labels.push(temp["dt_txt"]);
        data.datasets[0].values.push(temp["main"]["temp"]);
    });
    return data;
}