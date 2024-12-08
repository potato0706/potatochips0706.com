<script lang="ts">
	import type { PageData } from './$types';
	import { format } from 'date-fns';

	export let data: PageData;
</script>

<article>
	<h1>{data.title}</h1>
	<time datetime={data.date}>
		{format(new Date(data.date), 'MMMM d, yyyy')}
	</time>

	{@html data.content}
</article>

<a href="/blog">Back to blog</a>
