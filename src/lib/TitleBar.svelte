<script lang="ts">
	import { loggedInUser } from "../stores";
	export let title = "";
	export let subTitle = "";
</script>

<div class="box has-text-centered columns m-1">
	<div class="column is-2">
		<i class="fas fa-map-marked fa-3x" style="color:rgb(30, 144, 255)" />
	</div>
	<div class="column">
		<div class="title is-6">{@html title}</div>
		<div class="subtitle is-6">{@html subTitle}</div>
	</div>
	<div class="column">
		{#if $loggedInUser?.email}
			<i class="fas fa-user-circle fa-3x" style="color:rgb(95, 96, 173)" />
			<div class="is-size-7">{@html $loggedInUser.email}</div>
		{:else}
			<div class="is-size-7">Placemark-Svelte</div>
		{/if}
	</div>
</div>
