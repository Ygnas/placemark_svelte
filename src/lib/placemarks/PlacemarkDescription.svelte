<script lang="ts">
	import { placemarkService } from "../../services/placemark-service";
	import type { Placemark } from "../../services/placemark-types";

	export let placemark: Placemark;

	async function deleteImage() {
		await placemarkService.deleteImage(placemark);
		placemark.img = "";
	}
</script>

<div class="column has-text-centered box">
	{@html placemark.name}
</div>
<section>
	<div>
		{#if placemark.img}
			<img src={placemark.img} alt="placemark" />
			<button on:click={deleteImage} class="button is-small is-fullwidth">Delete image</button>
		{/if}
	</div>
	{@html placemark.description}
</section>
