import {
	createMatrix,
	field,
	game as gameNode,
	buttonShuffle,
	stats,
} from './helpers/drawMatrix';
import randomSwap from './helpers/shuffleAlgorithm';
import { swap, isValidforSwap } from './helpers/swap';
import soundAccompaniment from './helpers/audio';
import audioSource from '../audio/audio_move.mp3';

let mode = 'ready';

const timeElement = document.createElement('div');
timeElement.textContent = `Time: ${0}`;
const moves = document.createElement('div');
moves.textContent = `Moves: ${0}`;
stats.append(timeElement, moves);

let stopwatch;
function stopwatchRun() {
	let t = 0;
	if (mode === 'run') {
		stopwatch = setInterval(() => {
			timeElement.textContent = `Time: ${t}`;
			t++;
		}, 1000);
	}
	if (mode === 'shuffling') {
		clearInterval(stopwatch);
	}
}

let steps = 0;
function countMoves() {
	if (mode === 'run') {
		steps++;
	}
	if (mode === 'shuffling') {
		steps = 0;
	}
	moves.textContent = `Moves: ${steps}`;
}

function main() {
	createMatrix();
	buttonShuffle.textContent = 'Start Game';
}

const maxShuffleCount = 100;
let timer;

buttonShuffle.addEventListener('click', () => {
	if (mode === 'shuffling') {
		return;
	}
	mode = 'shuffling';
	let shuffleCount = 0;
	clearInterval(timer);
	gameNode.classList.add('gameShuffling');

	timer = setInterval(() => {
		stopwatchRun();
		buttonShuffle.disabled = true;
		randomSwap();
		shuffleCount++;
		if (shuffleCount >= maxShuffleCount) {
			countMoves();
			mode = 'run';
			gameNode.classList.remove('gameShuffling');
			stopwatchRun();
			buttonShuffle.disabled = false;
			clearInterval(timer);
			buttonShuffle.textContent = 'Shuffle and Restart';
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
		countMoves();
		soundAccompaniment(audioSource);
		swap(tileId);
	}
});

main();
