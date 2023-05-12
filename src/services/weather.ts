export const ssr = false;
import axios from "axios";
import type { Placemark, Weather } from "./placemark-types";

export const weather = {
    baseUrl: "http://localhost:3000",

  async getWeatherForPlacemark(placemark: Placemark): Promise<Weather> {
    try {
        const response = await axios.post(`${this.baseUrl}/api/placemark/weather`, placemark);
        return response.data;
    } catch (error) {
        const weather: Weather = {
            name: "",
            sunrise: 0,
            sunset: 0,
            current: {
                feels_like: 0,
                humidity: 0,
                pressure: 0,
                temp: 0,
                temp_max: 0,
                temp_min: 0
            },
            icon: ""
        }
        return weather;
    }
}
}
