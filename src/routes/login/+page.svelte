<script lang="ts">
	import { goto } from "$app/navigation";
	import Header from "$lib/Header.svelte";
	import WelcomeNavigator from "$lib/WelcomeNavigator.svelte";
	import LoginForm from "./LoginForm.svelte";
	import { initialize, signIn, signOut } from "svelte-google-auth/client";
	import { invalidateAll } from "$app/navigation";
	import type { PageData } from "../$types";
	import { placemarkService } from "../../services/placemark-service";
	import axios from "axios";

	export let data: PageData;
	initialize(data, invalidateAll);

	async function google() {
		if (!data.auth.user) {
			await signIn();
		}
		let response = await axios.post("http://localhost:3000/api/users/authenticate/google", data.auth.user);
		let success = await placemarkService.google(response, data.auth.user);
		if (success) {
			goto("/dashboard");
		}
	}
</script>

<Header>
	<WelcomeNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<i class="fas fa-users fa-10x" />
	</div>
	<div class="column">
		<div class="box">
			<h1 class="title">Login</h1>
			<div class="column"><button class="button is-link is-light" on:click={() => google()}>Sign In with google</button></div>
			<LoginForm />
		</div>
	</div>
</div>
