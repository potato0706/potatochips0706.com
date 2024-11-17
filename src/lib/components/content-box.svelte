<div class="wrapper">
	<div class="container">
		<slot />
	</div>
</div>

<style>
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
	}
</style>
