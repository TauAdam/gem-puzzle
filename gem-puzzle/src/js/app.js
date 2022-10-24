import { createMatrix, field } from './helpers/drawMatrix';
import randomSwap from './helpers/shuffleAlgorithm';
import { swap, isValidforSwap } from './helpers/swap';
import soundAccompaniment from './helpers/audio';
import audioSource from '../audio/audio_move.mp3';

const gameNode = document.getElementById('game');
const buttonRestart = document.querySelector('.btn-shuffle');

let mode = 'ready';

// function stopwatch() {
// 	var start = new Date.now(),
// 		stop = Date.now(),
// 		diff = stop - start;
// 	let seconds = 0;
// 	return diff;
// }

function render() {
	const stats = document.querySelector('.stats');
	const stopwatch = document.createElement('div');
	stopwatch.innerHTML = `Time: ${0}`;

	const moves = document.createElement('div');
	let steps = 0;
	moves.innerHTML = `Moves: ${steps}`;

	stats.append(stopwatch, moves);

	createMatrix();
	buttonRestart.textContent = 'Shuffle and Start';
}

const maxShuffleCount = 100;
let timer;

buttonRestart.addEventListener('click', () => {
	if (mode === 'shuffling') {
		return;
	}
	mode = 'shuffling';
	let shuffleCount = 0;
	clearInterval(timer);
	gameNode.classList.add('gameShuffling');

	timer = setInterval(() => {
		buttonRestart.disabled = true;
		randomSwap();
		shuffleCount++;
		if (shuffleCount >= maxShuffleCount) {
			gameNode.classList.remove('gameShuffling');
			buttonRestart.disabled = false;
			clearInterval(timer);
			mode = 'run';
			buttonRestart.textContent = 'Shuffle and Restart';
		}
	}, 50);
});
field.addEventListener('click', event => {
	// console.log('mode', mode);
	if (mode === 'shuffling') {
		return;
	}
	if (mode === 'ready') {
		alert('Press button "Shuffle and Start" to start the game!');
		return;
	}
	const tileNode = event.target.closest('.tile');
	if (!tileNode) {
		return;
	}
	const tileId = +tileNode.textContent;
	if (isValidforSwap(tileId)) {
		soundAccompaniment(audioSource);
		swap(tileId);
	}
});

render();
