<script lang="ts">
	// @ts-ignore
	import Chart from "svelte-frappe-charts";
	import { onMount } from "svelte";
	import { type ChartData, ChartDataType } from "../services/charts";
	import { placemarkService } from "../services/placemark-service";
	import { generateByCategoryID, generateByTemperature, generateByUser } from "../services/placemark-utils";
	import type { Weather } from "../services/placemark-types";

	let chartData: ChartData;
	export let charType: string = "bar";
	export let chartDataType: ChartDataType = ChartDataType.ByCategories;
	export let title: string = "Placemarks in categories";
	export let weatherData: Weather = {
		name: "",
		sunrise: 0,
		sunset: 0,
		icon: "",
		current: {
			feels_like: 0,
			humidity: 0,
			pressure: 0,
			temp: 0,
			temp_max: 0,
			temp_min: 0
		},
		list: []
	};

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
			case ChartDataType.ByTemperature:
				chartData = generateByTemperature(weatherData);
			default:
				break;
		}
	});
</script>

<div class="columns px-1">
	<div class="column box has-text-centered">
		<h1 class="title is-4">{title}</h1>
		<Chart data={chartData} type={charType} height="200" />
	</div>
</div>
