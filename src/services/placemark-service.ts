import axios from "axios";
import { categories, loggedInUser } from "../stores";
import type { Category, Placemark } from "./placemark-types";

export const placemarkService = {
    baseUrl: "http://localhost:3000",

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                loggedInUser.set({
                    email: email,
                    token: response.data.token,
                    _id: response.data.id
                });
                localStorage.placemark = JSON.stringify({ email: email, token: response.data.token, _id: response.data.id });
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async logout() {
        loggedInUser.set({
            email: "",
            token: "",
            _id: ""
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("placemark");
    },

    async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            await axios.post(this.baseUrl + "/api/users", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    reload() {
        if (!axios.defaults.headers.common["Authorization"]) {
            const placemarkCredentials = localStorage.placemark;
            if (placemarkCredentials) {
                const savedUser = JSON.parse(placemarkCredentials);
                loggedInUser.set({
                    email: savedUser.email,
                    token: savedUser.token,
                    _id: savedUser._id
                });
                axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
            }
        }
    },

    async getCategories(): Promise<Category[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/categorys`);
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async addCategory(category: Category): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/categorys`, category);
            categories.set(response.data);
            return response.status == 200;
        } catch (error) {
            return false;
        }
    },

    async getPlacemarks(): Promise<Placemark[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/placemarks`);
            return response.data;
        } catch (error) {
            return [];
        }
    
    },

    async addPlacemark(placemark: Placemark): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/categorys/${placemark.categoryid}/placemarks`, placemark);
            console.log(response);
            return response.status == 200;
        } catch (error) {
            return false;
        }
    }
};
