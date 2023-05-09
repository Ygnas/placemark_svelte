import { writable } from "svelte/store";
import type { Category, LoggedInUser } from "./services/placemark-types";

export const loggedInUser = writable<LoggedInUser>();
export const categories = writable<Category[]>();

