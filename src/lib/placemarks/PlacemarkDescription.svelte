<script lang="ts">
	import type { Placemark } from "../../services/placemark-types";

	export let placemark: Placemark;
</script>

<div class="column has-text-centered box">
	{placemark.name}
</div>
<section>
	<img src={placemark.img} alt="" />
	{placemark.description}
</section>
