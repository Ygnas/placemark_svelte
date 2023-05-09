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

	let categoryList: Category[] = [];
	let placemarkList: Placemark[] = [];

	onMount(async () => {
		placemarkService.reload();
		categoryList = await placemarkService.getCategories();
		placemarkList = await placemarkService.getPlacemarks();
	});

	const sub = categories.subscribe(async (category) => {
		categoryList = await placemarkService.getCategories();
	});

	onDestroy(sub);
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<h1 class="title is-4">Map</h1>
		<!-- <Placemarks {placemarkList} /> -->
	</div>
	<div class="column box has-text-centered is-one-quarter">
		<h1 class="title is-4">Categories</h1>
		<CategoryForm />
		<Categories {categoryList} {placemarkList} />
	</div>
</div>
