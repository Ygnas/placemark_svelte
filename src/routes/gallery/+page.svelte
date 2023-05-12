<script lang="ts">
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
	import type { Placemark } from "../../services/placemark-types";

	let placemarkList: Placemark[] = [];
	onMount(async () => {
		placemarkList = await placemarkService.getPlacemarks();
	});
</script>

<Header>
	<MainNavigator />
</Header>

{#each placemarkList as placemark}
	<div class="columns is-desktop">
		{#if placemark.img}
			{#each placemark.img as image}
				<div class="column">
					<div class="card">
						<div class="card-image">
							<figure class="image is-4by3">
								<img src={image} alt="Placeholder" />
							</figure>
						</div>
						<div class="card-content">
							<div class="content">{placemark.name}</div>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
{/each}
