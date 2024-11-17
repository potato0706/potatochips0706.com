<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<h1>{data.post.title}</h1>
	<time datetime={data.post.date}>
		{new Date(data.post.date).toLocaleDateString()}
	</time>

	{@html data.post.content}
</article>

<a href="/blog">Back to blog</a>
