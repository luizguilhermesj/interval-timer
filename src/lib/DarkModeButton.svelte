<script>
	import { browser } from '$app/environment';
	// let { light = $bindable(true) } = $props();
	let darkMode = true;

	function toggle() {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark-mode')
			: document.documentElement.classList.remove('dark-mode');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark-mode');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark-mode');
			darkMode = false;
		}
	}
</script>

<button class="container" aria-label="Toggle color mode" title="Toggle color mode" onclick={toggle}>
	<div class="sun" class:visible={darkMode}></div>
	<div class="moon" class:visible={!darkMode}>
		<div class="star"></div>
		<div class="star small"></div>
	</div>
</button>

<style>
	.container {
		width: 46px;
		height: 46px;
		box-sizing: border-box;
		padding: 12px;
		background: none;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		cursor: pointer;
	}

	.sun {
		width: 50%;
		height: 50%;
		position: absolute;
		pointer-events: none;
		opacity: 0;
		transform: scale(0.6) rotate(0deg);
		transition:
			transform 0.3s ease-in,
			opacity 0.2s ease-in 0.1s;

		/*  white transparent for Safari  */
		background: radial-gradient(circle, rgba(0, 0, 0, 0) 50%, #f0f0f0 50%);
	}

	.sun:before {
		content: '';
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			circle,
			#f0f0f0 30%,
			rgba(0, 0, 0, 0) 30%,
			rgba(0, 0, 0, 0) 50%,
			#f0f0f0 50%
		);
		transform: rotate(45deg);
	}

	.sun.visible {
		pointer-events: auto;
		opacity: 1;
		transform: scale(1) rotate(180deg);
		transition:
			transform 0.3s ease-in,
			opacity 0.2s ease-in 0.1s;
	}

	.moon {
		width: 50%;
		height: 50%;
		pointer-events: none;
		position: absolute;
		left: 12.5%;
		top: 18.75%;
		background-color: rgba(0, 0, 0, 0);
		border-radius: 50%;
		box-shadow: 9px 3px 0px 0px #000000;
		opacity: 0;
		transform: scale(0.3) rotate(65deg);
		transition:
			transform 0.3s ease-in,
			opacity 0.2s ease-in 0.1s;
	}

	.moon.visible {
		pointer-events: auto;
		opacity: 1;
		transform: scale(1) rotate(0deg);
		transition:
			transform 0.3s ease-in,
			opacity 0.2s ease-in 0.1s;
	}

	.star {
		position: absolute;
		top: 25%;
		left: 5%;
		display: block;
		width: 0px;
		height: 0px;
		border-right: 7px solid rgba(0, 0, 0, 0);
		border-bottom: 5px solid #000000;
		border-left: 7px solid rgba(0, 0, 0, 0);
		transform: scale(0.55) rotate(35deg);
		opacity: 0;
		transition: all 0.2s ease-in 0.4s;
	}

	.star:before {
		border-bottom: 5px solid #030303;
		border-left: 3px solid rgba(0, 0, 0, 0);
		border-right: 3px solid rgba(0, 0, 0, 0);
		position: absolute;
		height: 0;
		width: 0;
		top: -3px;
		left: -5px;
		display: block;
		content: '';
		transform: rotate(-35deg);
	}

	.star:after {
		position: absolute;
		display: block;
		color: red;
		top: 0px;
		left: -7px;
		width: 0px;
		height: 0px;
		border-right: 7px solid rgba(0, 0, 0, 0);
		border-bottom: 5px solid #000000;
		border-left: 7px solid rgba(0, 0, 0, 0);
		transform: rotate(-70deg);
		content: '';
	}

	.moon.visible .star {
		opacity: 0.8;
		/*   transform: rotate(35deg); */
	}

	.star.small {
		transform: scale(0.35) rotate(35deg);
		position: relative;
		top: 50%;
		left: 37.5%;
		opacity: 0;
		transition: all 0.2s ease-in 0.45s;
	}

	.moon.visible .star.small {
		opacity: 0.7;
		transform: scale(0.45) rotate(35deg);
	}

	:root {
		--bg-color: #eeeeee;
		--text-color: #000000;
		--bg-shadow-1: rgba(45, 35, 66, 0.4);
	}

	:global(html.dark-mode) {
		--bg-color: #1d3040;
		--text-color: #bfc2c7;
		--bg-shadow-1: rgba(45, 35, 66, 0.4);
	}
</style>
