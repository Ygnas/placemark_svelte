<script lang="ts">
	import type { Category, Placemark } from "../../services/placemark-types";

	export let categoryList: Category[];
	export let placemarkList: Placemark[];
</script>

{#each categoryList as category}
	<details>
		<summary>{category.title} </summary>
		{#each placemarkList as placemark}
			{#if category._id === placemark.categoryid}
				<li><a href="/navigator/{placemark._id}">{@html placemark.name}</a></li>
			{/if}
		{/each}
	</details>
{/each}

<style>
	details {
		max-width: 300px;
		box-sizing: border-box;
		margin-top: 5px;
		background: white;
	}

	summary {
		border: 2px solid rgba(10, 10, 10, 0.1);
		padding: 1rem;
		padding-left: 2.2rem;
		position: relative;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	li {
		padding-left: 1rem;
		text-align: left;
	}
</style>
