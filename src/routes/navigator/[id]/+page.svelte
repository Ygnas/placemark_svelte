<script lang="ts">
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import Map from "$lib/Map.svelte";
	import { onMount } from "svelte";
	import type { MarkerSpec } from "../../../services/markers";
	import { generateMarkerSpec, getMarkerLayer } from "../../../services/placemark-utils";
	import { placemarkService } from "../../../services/placemark-service";
	import type { PageData } from "./$types";
	import PlacemarkDescription from "$lib/placemarks/PlacemarkDescription.svelte";
	export let data: PageData;

	let mapTerrain: Map;
	let mapSat: Map;

	function zoomTo(marker: MarkerSpec) {
		mapTerrain?.addPopupMarkerAndZoom("selected", marker);
		mapTerrain?.moveTo(marker.location, 13);
		mapSat?.moveTo(marker.location, 13);
	}

	onMount(async () => {
		zoomTo(generateMarkerSpec(data.placemark));
	});
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column">
		<Map id="terrain" height={40} bind:this={mapTerrain} />
		<Map id="sat" activeLayer={"Satellite"} height={40} bind:this={mapSat} />
	</div>
	<div class="column" style="height: 83vh; overflow-y: auto">
		<PlacemarkDescription placemark={data.placemark} />
	</div>
</div>
