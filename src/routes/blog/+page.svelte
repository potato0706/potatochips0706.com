<script lang="ts">
	import { format } from 'date-fns';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>Blog</h1>

	<div>
		{#if data.posts.length > 0}
			{#each data.posts as post}
				<article>
					<h2>
						<a href="/blog/{post.slug}" class="hover:text-blue-600">
							{post.title}
						</a>
					</h2>
					<div>
						<time datetime={post.date}>
							{format(new Date(post.date), 'MMMM d, yyyy')}
						</time>
					</div>
				</article>
			{/each}
		{:else}
			<p>No posts yet.</p>
		{/if}
	</div>

	<a href="/">Back to home page</a>
</main>
