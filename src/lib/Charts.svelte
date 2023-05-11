<script lang="ts">
	// @ts-ignore
	import Chart from "svelte-frappe-charts";
	import { onMount } from "svelte";
	import type { ChartData } from "../services/charts";
	import { placemarkService } from "../services/placemark-service";
	import { generateByCategoryID } from "../services/placemark-utils";

	let byCategoryID: ChartData;
	export let charType: string = "bar";

	onMount(async () => {
		placemarkService.reload();

		const categoryList = await placemarkService.getCategories();
		const placemarkList = await placemarkService.getPlacemarks();

		byCategoryID = generateByCategoryID(categoryList, placemarkList);
	});
</script>

<div class="columns px-1">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemarks in categories</h1>
		<Chart data={byCategoryID} type={charType} />
	</div>
</div>
