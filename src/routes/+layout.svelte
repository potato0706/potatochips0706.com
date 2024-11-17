<script>
	import Background from '$lib/components/background.svelte';
	import ContentBox from '$lib/components/content-box.svelte';
	import Copyright from '$lib/components/copyright.svelte';
	import Oneko from '$lib/components/oneko.svelte';

	import '../styles/globals.css';
</script>

<Background />
<Copyright />
<ContentBox>
	<slot />
</ContentBox>
<Oneko />
