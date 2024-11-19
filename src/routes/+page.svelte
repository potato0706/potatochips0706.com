<script lang="ts">
	import Icon from '@iconify/svelte';

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
	src="https://lanyard.cnrad.dev/api/589390405548769293?bg=1c1c1c&idleMessage=Feeling so bored"
	height="210"
	width="410"
/>
<div>
	<p>It's now {timeString}. {greetingText}</p>

	<p>Hongkonger born in 2007</p>
	<p>Taken by <a href="https://clxudydrxxm.potatochips0706.com">ClxudyDrxxm</a></p>
	<p>
		Depression patient <code>&&</code> an
		<span>
			<a href="https://cantowords.com/dictionary/IT%E7%8B%97" target="_blank">IT9</a>
		</span>
	</p>
	<p>Check out my <a href="/blog">blog</a></p>
</div>
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
