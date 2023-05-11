<script lang="ts">
	// @ts-ignore
	import Chart from "svelte-frappe-charts";
	import { onMount } from "svelte";
	import { type ChartData, ChartDataType } from "../services/charts";
	import { placemarkService } from "../services/placemark-service";
	import { generateByCategoryID, generateByUser } from "../services/placemark-utils";

	let chartData: ChartData;
	export let charType: string = "bar";
	export let chartDataType: ChartDataType = ChartDataType.ByCategories;
	export let title: string = "Placemarks in categories";

	onMount(async () => {
		placemarkService.reload();

		switch (chartDataType) {
			case ChartDataType.ByCategories:
				const categoryList = await placemarkService.getCategories();
				const placemarkList = await placemarkService.getPlacemarks();
				chartData = generateByCategoryID(categoryList, placemarkList);
				break;
			case ChartDataType.ByUsers:
				const users = await placemarkService.getAllUsers();
				chartData = generateByUser(users);
				break;
			default:
				break;
		}
	});
</script>

<div class="columns px-1">
	<div class="column box has-text-centered">
		<h1 class="title is-4">{title}</h1>
		<Chart data={chartData} type={charType} />
	</div>
</div>
