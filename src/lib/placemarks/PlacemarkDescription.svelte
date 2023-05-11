<script lang="ts">
	import Notification from "$lib/Notification.svelte";
	import { placemarkService } from "../../services/placemark-service";
	import type { Placemark } from "../../services/placemark-types";

	export let placemark: Placemark;
	let message: string = "";

	async function deleteImage(img: string) {
		try {
			placemark.img = placemark.img?.filter((val) => val !== img);
			await placemarkService.deleteImage(placemark);
			message = "";
		} catch {
			message = "There was an error while deleting image";
		}
	}
</script>

<div class="column has-text-centered box">
	{@html placemark.name}
</div>
<Notification {message} />
<div class="columns is-mobile tile is-parent">
	{#if placemark.img}
		{#each placemark.img as img}
			<div class="column tile is-child">
				<img src={img} alt="placemark" />
				<button on:click={() => deleteImage(img)} class="button is-small is-fullwidth">Delete image</button>
			</div>
		{/each}
	{/if}
</div>
<section>
	{@html placemark.description}
</section>
