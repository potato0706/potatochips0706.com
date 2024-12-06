<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let error = '';
</script>

<div>
	<h1>Admin Login</h1>

	{#if error}
		<p>{error}</p>
	{/if}

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type !== 'failure') {
					await goto('/admin');
				} else {
					error = 'Invalid credentials';
				}
			};
		}}
	>
		<div>
			<label for="username">Username</label>
			<input type="text" id="username" name="username" required />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" id="password" name="password" required />
		</div>

		<button type="submit">Login</button>
	</form>
</div>
