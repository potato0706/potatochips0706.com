<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	/* Greeting message */
	const now = new Date();

	const hours = now.getHours();
	const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	const greetingTexts = [
		{ start: 0, end: 6, text: 'What made you still awake?' },
		{ start: 6, end: 12, text: 'I still want more sleep...' },
		{ start: 12, end: 18, text: 'Have you had lunch yet, or even breakfast?' },
		{ start: 18, end: 22, text: 'Time to relax!' },
		{ start: 22, end: 24, text: 'Almost time for bed, but I still want more coding...' }
	];

	const greetingText = greetingTexts.find(({ start, end }) => hours >= start && hours < end)?.text;
</script>

<svelte:head>
	<title>Potato_Chips0706</title>
	<meta
		name="description"
		content="Personal website of Potato_Chips0706, a Hongkonger born in 2007, taken by ClxudyDrxxm, depression patient and an IT9."
	/>
</svelte:head>

<div>
	<h1>Potato_Chips0706</h1>
	<span class="same-line">
		<h2 class="sub-text">@potato_chips0706</h2>
		<p>·</p>
		<p class="sub-text">he/him</p>
	</span>
</div>
<iframe
	title="discord"
	src="https://lanyard.cnrad.dev/api/589390405548769293?bg=1c1c1c&idleMessage=It's now {timeString}. {greetingText}"
	height="210"
	width="410"
/>
<div>{@html data.text}</div>
<div>
	<h2>Achievement</h2>
	<ul>
		<li>Ace of Coders 2023 Asian Game Silver Award</li>
		<li>CodeQuest Global 2023 First Prize</li>
		<li>Hong Kong Secondary School Translation Technology Quiz Competition 2023 Merit Award</li>
	</ul>
</div>
<div>
	<h2>Connect</h2>
	<a href="mailto:me@potatochips0706.com" target="_blank" title="Email">
		<Icon icon="line-md:email" width="2rem" height="2rem" />
	</a>
	<a href="https://discord.com/users/589390405548769293" target="_blank" title="Discord">
		<Icon icon="line-md:discord" width="2rem" height="2rem" />
	</a>
	<a href="https://www.instagram.com/potato_chips0706" target="_blank" title="Instagram">
		<Icon icon="line-md:instagram" width="2rem" height="2rem" />
	</a>
</div>
