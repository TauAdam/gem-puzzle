import {
	createMatrix,
	field,
	tileSize,
	tiles,
	empty,
	game as gameNode,
	buttonShuffle,
	stats,
	message,
} from './helpers/drawMatrix';
import randomSwap from './helpers/shuffleAlgorithm';
import soundAccompaniment from './helpers/audio';
import audioSource from '../audio/audio_move.mp3';

let mode = 'ready';

const timeElement = document.createElement('div');
timeElement.textContent = `Game duration: ${0} sec`;
const moves = document.createElement('div');
moves.textContent = `Moves: ${0}`;
stats.append(timeElement, moves);

function swap(i) {
	const tile = tiles[i];

	tile.element.style.left = `${empty.left * tileSize}px`;
	tile.element.style.top = `${empty.top * tileSize}px`;
	const emptyTop = empty.top;
	const emptyLeft = empty.left;
	empty.left = tile.left;
	empty.top = tile.top;
	tile.left = emptyLeft;
	tile.top = emptyTop;
	if (isSolved()) {
		wonMessage();
	}
}

function isValidforSwap(i) {
	const tile = tiles[i];
	const leftDiff = Math.abs(empty.left - tile.left);
	const topDiff = Math.abs(empty.top - tile.top);
	if (leftDiff + topDiff > 1) {
		return false;
	} else {
		return true;
	}
}

function isSolved() {
	return tiles.every(tile => tile.value === tile.top * 4 + tile.left + 1);
}

function wonMessage() {
	setTimeout(() => {
		// message.innerHTML = `You win! <br> Hooray! You solved the puzzle in ${timeElement.textContent} and ${steps} moves!`;
		alert(`Hooray! You solved the puzzle in ${t} sec and ${steps} moves!`);
		mode = 'ready';
		stopwatchRun();
		countMoves();
		setTimeout(() => {
			message.innerHTML = '';
		}, 4000);
	}, 100);
}

let stopwatch;
let t = 0;
function stopwatchRun() {
	if (mode === 'run') {
		stopwatch = setInterval(() => {
			timeElement.textContent = `Game duration: ${t} sec`;
			t++;
		}, 1000);
	}
	if (mode === 'shuffling' || mode === 'ready') {
		clearInterval(stopwatch);
		t = 0;
		timeElement.textContent = `Game duration: ${t} sec`;
	}
}

let steps = 0;
function countMoves() {
	if (mode === 'run') {
		steps++;
	}
	if (mode === 'shuffling' || mode === 'ready') {
		steps = 0;
	}
	moves.textContent = `Moves: ${steps}`;
}

function main() {
	// mode = 'run';
	// stopwatchRun();
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
	if (mode === 'shuffling') {
		return;
	}

	if (mode === 'ready') {
		alert('Press button "Start Game" to start the game!');
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
export { swap, isValidforSwap };
main();
