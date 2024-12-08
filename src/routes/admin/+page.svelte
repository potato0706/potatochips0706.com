<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { PageData } from './$types';

	export let data: PageData;

	export let form: ActionData;

	function handleAboutSubmit() {
		return async ({ update }: { update: Function }) => {
			await update();
		};
	}

	function handlePostSubmit() {
		return async ({ update }: { update: Function }) => {
			await update();
		};
	}
</script>

<div class="admin-container">
	<header>
		<h1>Admin Dashboard</h1>
		<form action="/api/logout" method="POST" use:enhance>
			<button type="submit">Logout</button>
		</form>
	</header>

	<main>
		<form method="POST" action="?/updateAbout" use:enhance={handleAboutSubmit}>
			<h2>About me text</h2>
			<textarea name="about-text" rows="10" cols="50">{data.aboutText}</textarea>
			<button type="submit">Save about text</button>
		</form>

		<form method="POST" action="?/createPost" use:enhance={handlePostSubmit}>
			<h2>New post</h2>
			<input type="text" name="title" placeholder="Title" />
			<input type="text" name="slug" placeholder="Slug" />
			<input type="text" name="category" placeholder="Category" />
			<input type="text" name="excerpt" placeholder="Excerpt" />
			<textarea name="content" rows="10" cols="50" />
			<button type="submit">Create post</button>
		</form>

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
	</main>
</div>

<style>
	.admin-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	header {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	main {
		width: 100%;
	}

	form {
		margin-bottom: 1rem;
	}

	textarea {
		width: 100%;
		resize: none;
		outline: none;
	}

	.error {
		color: red;
		margin-top: 1rem;
	}
</style>
