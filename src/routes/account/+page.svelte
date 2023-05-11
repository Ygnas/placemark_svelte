<script lang="ts">
	import Charts from "$lib/Charts.svelte";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { ChartDataType } from "../../services/charts";
	import { loggedInUser } from "../../stores";

	let selectedData = ChartDataType.ByCategories;
	let selectedType: string;

	let chart: Charts;
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
		<select bind:value={selectedData} name="type">
			<option value={ChartDataType.ByCategories}>By Categories</option>
			<option value={ChartDataType.ByUsers}>By Users</option>
		</select>
		<select bind:value={selectedType} name="types">
			<option value="bar">Bar</option>
			<option value="pie">Pie</option>
			<option value="donut">Donut</option>
			<option value="line">Line</option>
			<option value="percentage">Percentage</option>
		</select>
		<div class="column">
			{#key selectedData}
				{#key selectedType}
					<Charts bind:this={chart} chartDataType={selectedData} title={selectedData ? "User types" : "Placemarks in categories"} charType={selectedType} />
				{/key}
			{/key}
		</div>
	</div>
</div>
<div class="columns">
	<div class="column">
		<Charts />
	</div>
	<div class="column">
		<Charts charType="donut" />
	</div>
</div>
