import { writable } from "svelte/store";
import type { Category, LoggedInUser } from "./services/placemark-types";
import type { MarkerSpec } from "./services/markers";

export const loggedInUser = writable<LoggedInUser>();
export const categories = writable<Category[]>();
export const markerSelected = writable<MarkerSpec>();