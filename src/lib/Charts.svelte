<script lang="ts">
	// @ts-ignore
	import Chart from "svelte-frappe-charts";
	import { onMount } from "svelte";
	import type { ChartData } from "../services/charts";
	import { placemarkService } from "../services/placemark-service";
	import { generateByCategoryID } from "../services/placemark-utils";

	let byCategoryID: ChartData;

	onMount(async () => {
		placemarkService.reload();

		const categoryList = await placemarkService.getCategories();
		const placemarkList = await placemarkService.getPlacemarks();

		byCategoryID = generateByCategoryID(categoryList, placemarkList);
	});
</script>

<div class="columns">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemarks in categories</h1>
		<Chart data={byCategoryID} type="bar" />
	</div>
</div>
