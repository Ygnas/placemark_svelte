<script lang="ts">
	import Categories from "$lib/categories/Categories.svelte";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { onDestroy, onMount } from "svelte";
	import type { Category, Placemark } from "../../services/placemark-types";
	import { placemarkService } from "../../services/placemark-service";
	import CategoryForm from "$lib/categories/CategoryForm.svelte";
	import { categories } from "../../stores";
	import Placemarks from "$lib/placemarks/Placemarks.svelte";
	import Map from "$lib/Map.svelte";
	import { getMarkerLayer } from "../../services/placemark-utils";
	import Charts from "$lib/Charts.svelte";

	let categoryList: Category[] = [];
	let placemarkList: Placemark[] = [];

	let map: Map;

	onMount(async () => {
		placemarkService.reload();
		categoryList = await placemarkService.getCategories();
		placemarkList = await placemarkService.getPlacemarks();
		const placemarkMarkerLayer = getMarkerLayer(placemarkList);
		map.populateLayer(placemarkMarkerLayer);
	});

	const sub = categories.subscribe(async (category) => {
		categoryList = await placemarkService.getCategories();
	});

	onDestroy(sub);
</script>

<Header>
	<MainNavigator />
</Header>

<Charts />
<div class="columns">
	<div class="column has-text-centered">
		<!-- <Placemarks {placemarkList} /> -->
		<Map bind:this={map} />
	</div>
	<div class="column box has-text-centered is-one-quarter">
		<CategoryForm />
		<Categories {categoryList} {placemarkList} />
	</div>
</div>
