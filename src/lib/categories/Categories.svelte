<script lang="ts">
	import type { Category, Placemark } from "../../services/placemark-types";

	export let categoryList: Category[];
	export let placemarkList: Placemark[];
</script>

{#each categoryList as category}
	<details
		style="  max-width: 300px;
  box-sizing: border-box;
  margin-top: 5px;
  background: white;"
	>
		<summary
			style="border: 2px solid rgba(10,10,10,0.1);
		padding: 1rem;
		padding-left: 2.2rem;
		position: relative;
		cursor: pointer;display: flex;
		align-items:center;"
			>{category.title}
			<!-- <a href="/dashboard/deletecategory/">
				<i class="fas fa-folder-open" />
			</a> -->
		</summary>
		{#each placemarkList as placemark}
			{#if category._id === placemark.categoryid}
				<p>{placemark.name}</p>
			{/if}
		{/each}
	</details>
{/each}
