<script lang="ts">
	import type { PageData } from './$types';
	import { format } from 'date-fns';

	export let data: PageData;
</script>

<article>
	<h1>{data.post.title}</h1>
	<time datetime={data.post.date}>
		{format(new Date(data.post.date), 'MMMM d, yyyy')}
	</time>

	{@html data.post.content}
</article>

<a href="/blog">Back to blog</a>
