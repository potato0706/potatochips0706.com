<script>
	import Background from '$lib/components/background.svelte';
	import ContentBox from '$lib/components/content-box.svelte';
	import Copyright from '$lib/components/copyright.svelte';
	import Oneko from '$lib/components/oneko.svelte';

	import '$lib/styles/globals.scss';
</script>

<Background />
<Copyright />
<ContentBox>
	<slot />
</ContentBox>
<Oneko />
