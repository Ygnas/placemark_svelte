<script lang="ts">
	import { goto } from "$app/navigation";
	import { signOut } from "svelte-google-auth/client";
	import { placemarkService } from "../../services/placemark-service";

	placemarkService.logout();
	signOut();
	goto("/");
</script>
