<!-- Not used, not finished -->
<script lang="ts">
	import { placemarkService } from "../../services/placemark-service";
	import type { Category, Placemark } from "../../services/placemark-types";

	let placemark: Placemark = {
		name: "",
		description: "",
		latitude: 0,
		longitude: 0,
		categoryid: ""
	};

	async function addPlacemark() {
		const success = await placemarkService.addPlacemark(placemark);
	}
</script>

<form on:submit|preventDefault={addPlacemark}>
	<div class="field is-grouped">
		<div class="control">
			<input bind:value={placemark.name} class="input heading" type="text" placeholder="Placemark name" name="name" />
		</div>
		<div class="control">
			<input bind:value={placemark.description} class="input heading" type="text" placeholder="Placemark description" name="description" />
		</div>
		<div class="control">
			<input bind:value={placemark.latitude} class="input heading" type="text" placeholder="Placemark latitude" name="latitude" />
		</div>
		<div class="control">
			<input bind:value={placemark.longitude} class="input heading" type="text" placeholder="Placemark longitude" name="longitude" />
		</div>
	</div>
	<button class="button is-info is-light heading">Add Placemark</button>
</form>
