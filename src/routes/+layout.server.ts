import { hydrateAuth } from "svelte-google-auth/server";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = ({ locals }) => {
	return { ...hydrateAuth(locals) };
};
