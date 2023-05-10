<script lang="ts">
	export let message: string;
</script>

{#if message}
	<br />
	<article class="notification is-warning">
		{@html message}
	</article>
{/if}
