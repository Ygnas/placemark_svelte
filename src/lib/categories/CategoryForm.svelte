<script lang="ts">
	import Notification from "$lib/Notification.svelte";
	import { placemarkService } from "../../services/placemark-service";
	import type { Category } from "../../services/placemark-types";
	import { loggedInUser } from "../../stores";

	let category: Category = {
		title: "",
		userid: $loggedInUser?._id
	};

	let message: string;

	async function addCategory() {
		if (!category.title || !category.userid) {
			message = "Could not add new Category";
			return;
		}
		const success = await placemarkService.addCategory(category);
		message = "";
		category.title = "";
	}
</script>

<form on:submit|preventDefault={addCategory}>
	<div class="field">
		<input bind:value={category.title} class="input heading" type="text" placeholder="Enter category title" name="title" />
	</div>
	<button class="button is-info is-light heading">Add Category</button>
</form>
<Notification {message} />
