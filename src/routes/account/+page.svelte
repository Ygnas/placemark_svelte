<script lang="ts">
	import Charts from "$lib/Charts.svelte";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { loggedInUser } from "../../stores";
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column">
		<div class="box">
			<div class="card-content">
				<div class="media">
					<div class="media-left">
						<span class="icon is-large">
							<i class="far fa-user fa-2x" />
						</span>
					</div>
					<div class="media-content">
						<div class="columns">
							<div class="column is-two-thirds">
								<p class="title is-4">{@html $loggedInUser.email}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="columns">
	<div class="column">
		<Charts charType="bar" />
	</div>
	<div class="column">
		<Charts charType="donut" />
	</div>
</div>
