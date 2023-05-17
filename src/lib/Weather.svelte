<script lang="ts">
	import { onMount } from "svelte";
	import type { Placemark, Weather } from "../services/placemark-types";
	import { weather } from "../services/weather";
	import Charts from "./Charts.svelte";
	import { ChartDataType } from "../services/charts";

	export let placemark: Placemark;
	let selectedType: string = "bar";
	let tempIcon: string = "";
	let weatherData: Weather = {
		name: "Town name",
		sunrise: 0,
		sunset: 0,
		icon: "https://openweathermap.org/img/wn/03d.png",
		current: {
			feels_like: 0,
			humidity: 0,
			pressure: 0,
			temp: 0,
			temp_max: 0,
			temp_min: 0
		},
		list: []
	};

	onMount(async () => {
		weatherData = await weather.getWeatherForPlacemark(placemark);
		const weatherSlice = weatherData.list.slice(0, 3);
		if (weatherSlice[0]["main"]["temp"] > weatherSlice[1]["main"]["temp"] && weatherSlice[1]["main"]["temp"] > weatherSlice[2]["main"]["temp"]) {
			tempIcon = "fas fa-chevron-down";
		} else if (weatherSlice[0]["main"]["temp"] < weatherSlice[1]["main"]["temp"] && weatherSlice[1]["main"]["temp"] < weatherSlice[2]["main"]["temp"]) {
			tempIcon = "fas fa-chevron-up";
		}
	});
</script>

<div class="column box">
	<div class="tile is-ancestor">
		<div class="tile">
			<div class="tile is-parent is-8">
				<article class="tile is-child notification is-link">
					<p class="title">{weatherData?.name}</p>
					<p class="subtitle" />
					<div class="content">
						<div class="column">
							{#key weatherData.name}
								<Charts charType={selectedType} title="Temperature projection" chartDataType={ChartDataType.ByTemperature} {weatherData} />
							{/key}
						</div>
					</div>
				</article>
			</div>
			<div class="tile is-parent">
				<article class="tile is-child notification is-info" style="background-image: url(/partlysunny_day.webp);background-size:cover">
					<div class="columns">
						<div class="column is-10">
							<div class="content">
								<p class="title">Current weather</p>
								<div class="columns">
									<div class="column">
										<div class="content">Temp: {weatherData?.current.temp} C</div>
										<div class="content">Temp min: {weatherData?.current.temp_min} C</div>
										<div class="content">Humidity: {weatherData?.current.humidity}</div>
										<div class="content">Temp trends: <i class={tempIcon} style="color:rgb(25, 255, 25)" /></div>
									</div>
									<div class="column">
										<div class="content">Feels like: {weatherData?.current.feels_like} C</div>
										<div class="content">Temp max: {weatherData?.current.temp_max} C</div>
										<div class="content">Pressure: {weatherData?.current.pressure}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="column">
							<div class="content">
								<p class="title"><img src={weatherData?.icon} alt="weather" /></p>
							</div>
						</div>
					</div>
				</article>
			</div>
		</div>
	</div>
</div>
