<script>
	import { onMount } from 'svelte';

	let images = [1, 2, 3];
	let currentIndex = 0;
	let isTransitioning = false;
	let nextImageNumber = 4;

	onMount(() => {
		const interval = setInterval(() => {
			isTransitioning = true;
			setTimeout(() => {
				images = [...images];
				images[(currentIndex + 2) % 3] = nextImageNumber;
				currentIndex = (currentIndex + 1) % 3;
				nextImageNumber = nextImageNumber < 17 ? nextImageNumber + 1 : 1;
				isTransitioning = false;
			}, 1000);
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

{#each images as imageNumber, index}
	<div
		class="background"
		style="
		z-index: {-3 + index};
		background-image: url('/backgrounds/{imageNumber}.png');
		opacity: {index === currentIndex || (index === (currentIndex + 1) % 3 && isTransitioning) ? 1 : 0};"
	/>
{/each}

<style lang="scss">
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		transition: opacity 1s ease-in-out;
	}
</style>
