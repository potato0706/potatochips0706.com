<script lang="ts">
	import { onMount } from 'svelte';

	let nekoEl: HTMLDivElement;
	let nekoPosX = 32;
	let nekoPosY = 32;
	let mousePosX = 0;
	let mousePosY = 0;
	let frameCount = 0;
	let idleTime = 0;
	let idleAnimation: string | null = null;
	let idleAnimationFrame = 0;
	let lastFrameTimestamp: number | null = null;

	const NEKO_SIZE = 32;
	const HALF_NEKO_SIZE = NEKO_SIZE / 2;
	const nekoSpeed = 16;
	const spriteSets: { [key: string]: number[][] } = {
		idle: [[-3, -3]],
		alert: [[-7, -3]],
		scratchSelf: [
			[-5, 0],
			[-6, 0],
			[-7, 0]
		],
		scratchWallN: [
			[0, 0],
			[0, -1]
		],
		scratchWallS: [
			[-7, -1],
			[-6, -2]
		],
		scratchWallE: [
			[-2, -2],
			[-2, -3]
		],
		scratchWallW: [
			[-4, 0],
			[-4, -1]
		],
		tired: [[-3, -2]],
		sleeping: [
			[-2, 0],
			[-2, -1]
		],
		N: [
			[-1, -2],
			[-1, -3]
		],
		NE: [
			[0, -2],
			[0, -3]
		],
		E: [
			[-3, 0],
			[-3, -1]
		],
		SE: [
			[-5, -1],
			[-5, -2]
		],
		S: [
			[-6, -3],
			[-7, -2]
		],
		SW: [
			[-5, -3],
			[-6, -1]
		],
		W: [
			[-4, -2],
			[-4, -3]
		],
		NW: [
			[-1, 0],
			[-1, -1]
		]
	};

	function setSprite(name: string, frame: number) {
		const sprite = spriteSets[name][frame % spriteSets[name].length];
		nekoEl.style.backgroundPosition = `${sprite[0] * NEKO_SIZE}px ${sprite[1] * NEKO_SIZE}px`;
	}

	function resetIdleAnimation() {
		idleAnimation = null;
		idleAnimationFrame = 0;
	}

	function idle() {
		idleTime += 1;

		if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
			let availableIdleAnimations = ['sleeping', 'scratchSelf'];
			if (nekoPosX < NEKO_SIZE) availableIdleAnimations.push('scratchWallW');
			if (nekoPosY < NEKO_SIZE) availableIdleAnimations.push('scratchWallN');
			if (nekoPosX > window.innerWidth - NEKO_SIZE) availableIdleAnimations.push('scratchWallE');
			if (nekoPosY > window.innerHeight - NEKO_SIZE) availableIdleAnimations.push('scratchWallS');
			idleAnimation =
				availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
		}

		switch (idleAnimation) {
			case 'sleeping':
				if (idleAnimationFrame < 8) {
					setSprite('tired', 0);
					break;
				}
				setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
				if (idleAnimationFrame > 192) resetIdleAnimation();
				break;
			case 'scratchWallN':
			case 'scratchWallS':
			case 'scratchWallE':
			case 'scratchWallW':
			case 'scratchSelf':
				setSprite(idleAnimation, idleAnimationFrame);
				if (idleAnimationFrame > 9) resetIdleAnimation();
				break;
			default:
				setSprite('idle', 0);
				return;
		}
		idleAnimationFrame += 1;
	}

	function frame() {
		frameCount += 1;
		const diffX = nekoPosX - mousePosX;
		const diffY = nekoPosY - mousePosY;
		const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

		if (distance < nekoSpeed || distance < 48) {
			idle();
			return;
		}

		resetIdleAnimation();

		if (idleTime > 1) {
			setSprite('alert', 0);
			idleTime = Math.min(idleTime, 7);
			idleTime -= 1;
			return;
		}

		let direction = '';
		direction += diffY / distance > 0.5 ? 'N' : '';
		direction += diffY / distance < -0.5 ? 'S' : '';
		direction += diffX / distance > 0.5 ? 'W' : '';
		direction += diffX / distance < -0.5 ? 'E' : '';
		setSprite(direction, frameCount);

		nekoPosX -= (diffX / distance) * nekoSpeed;
		nekoPosY -= (diffY / distance) * nekoSpeed;

		nekoPosX = Math.min(Math.max(HALF_NEKO_SIZE, nekoPosX), window.innerWidth - HALF_NEKO_SIZE);
		nekoPosY = Math.min(Math.max(HALF_NEKO_SIZE, nekoPosY), window.innerHeight - HALF_NEKO_SIZE);

		nekoEl.style.left = `${nekoPosX - HALF_NEKO_SIZE}px`;
		nekoEl.style.top = `${nekoPosY - HALF_NEKO_SIZE}px`;
	}

	function onAnimationFrame(timestamp: number) {
		if (!nekoEl) return;
		if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
		if (timestamp - lastFrameTimestamp > 100) {
			lastFrameTimestamp = timestamp;
			frame();
		}
		window.requestAnimationFrame(onAnimationFrame);
	}

	onMount(() => {
		const isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

		if (isReducedMotion) return;

		nekoEl = document.createElement('div');
		nekoEl.id = 'oneko';
		nekoEl.ariaHidden = 'true';
		Object.assign(nekoEl.style, {
			width: `${NEKO_SIZE}px`,
			height: `${NEKO_SIZE}px`,
			position: 'fixed',
			pointerEvents: 'auto',
			imageRendering: 'pixelated',
			left: `${nekoPosX - HALF_NEKO_SIZE}px`,
			top: `${nekoPosY - HALF_NEKO_SIZE}px`,
			zIndex: `${Number.MAX_SAFE_INTEGER}`,
			backgroundImage: `url('./oneko.gif')`
		});

		document.body.appendChild(nekoEl);

		const handleMouseMove = (event: MouseEvent) => {
			mousePosX = event.clientX;
			mousePosY = event.clientY;
		};

		document.addEventListener('mousemove', handleMouseMove);
		window.requestAnimationFrame(onAnimationFrame);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.body.removeChild(nekoEl);
		};
	});
</script>
