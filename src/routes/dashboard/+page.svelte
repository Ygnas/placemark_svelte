<script lang="ts">
	import Categories from "$lib/categories/Categories.svelte";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { onMount } from "svelte";
	import type { Category, Placemark } from "../../services/placemark-types";
	import { placemarkService } from "../../services/placemark-service";
	import CategoryForm from "$lib/categories/CategoryForm.svelte";
	import { categories } from "../../stores";
	import Map from "$lib/Map.svelte";
	import { getMarkerLayer } from "../../services/placemark-utils";

	let categoryList: Category[] = [];
	let placemarkList: Placemark[] = [];

	let map: Map;

	onMount(async () => {
		placemarkService.reload();
		categoryList = await placemarkService.getCategories();
		placemarkList = await placemarkService.getPlacemarks();
		categoryList.map((category) => {
			const placemarks: Placemark[] = [];
			placemarkList.map((placemark) => {
				if (category._id === placemark.categoryid) {
					placemarks.push(placemark);
				}
			});
			const placemarkMarkerLayer = getMarkerLayer(category.title, placemarks);
			map.populateLayer(placemarkMarkerLayer);
		});
	});

	const sub = categories.subscribe(async (category) => {
		categoryList = await placemarkService.getCategories();
	});
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<Map bind:this={map} />
	</div>
	<div class="column box has-text-centered is-one-quarter">
		<CategoryForm />
		<Categories {categoryList} {placemarkList} />
	</div>
</div>
