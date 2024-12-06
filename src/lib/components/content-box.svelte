<script lang="ts">
	import { page } from '$app/stores';

	$: paths = $page.url.pathname.split('/').filter(Boolean);
</script>

<div class="wrapper">
	<div class="container">
		<p class="path">
			<a href="/">home</a>{#if paths.length > 0}<span>/</span>{/if}{#each paths as path, index}<a
					href={'/' + paths.slice(0, index + 1).join('/')}>{path}</a
				>{#if index < paths.length - 1}<span>/</span>{/if}{/each}
		</p>
		<slot class="slot-content" />
	</div>
</div>

<style lang="scss">
	.wrapper {
		max-width: 60rem;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
	}

	.container {
		background-color: #1c1c1c;
		padding: 0.25rem 2rem;
		min-height: 100vh;
		opacity: 0.9;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}

	.path {
		position: absolute;
		top: 0.5rem;
		left: 1rem;
		color: #fff;
		font-size: 0.875rem;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 0.25rem 0.5rem;
	}
</style>
