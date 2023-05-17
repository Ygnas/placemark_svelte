<script lang="ts">
	import { goto } from "$app/navigation";
	import Header from "$lib/Header.svelte";
	import WelcomeNavigator from "../lib/WelcomeNavigator.svelte";
	import { loggedInUser } from "../stores";

	if ($loggedInUser?.email) {
		goto("/dashboard");
	}
</script>

<Header>
	<WelcomeNavigator />
</Header>

<div class="column box is-vcentered content">
	<h1 class="title">Sign up or Log in...</h1>
</div>
