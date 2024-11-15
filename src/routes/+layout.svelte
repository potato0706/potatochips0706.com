<script>
	import Background from '../components/background.svelte';
	import ContentBox from '../components/content-box.svelte';
	import Copyright from '../components/copyright.svelte';
	import Oneko from '../components/oneko.svelte';

	import '../styles/globals.css';
</script>

<Background />
<Copyright />
<ContentBox>
	<slot />
</ContentBox>
<Oneko />
