const field = document.querySelector('.field');
const buttonRestart = document.querySelector('.btn');
let mode = 'ready';
const empty = {
	value: 0,
	top: 0,
	left: 0,
};
const tileSize =
	6.25 *
	parseInt(window.getComputedStyle(document.querySelector('html')).fontSize);

const tiles = [empty];
function createMatrix(shuffledArr) {
	const numbers = [...Array(15).keys()];
	// const shuffledNumbers = shuffle(numbers);
	for (let i = 1; i < 16; i++) {
		const tile = document.createElement('div');
		tile.className = 'tile';
		const value = numbers[i - 1] + 1;
		tile.innerHTML = value;
		const left = i % 4;
		const top = (i - left) / 4;
		tile.style.left = `${left * tileSize}px`;
		tile.style.top = `${top * tileSize}px`;
		tiles.push({
			value,
			left,
			top,
			element: tile,
		});
		field.append(tile);
	}
}
function clearMatrix() {
	tiles.length = 0;
	field.innerHTML = '';
}
function soundAccompaniment() {}
function handleClick() {
	for (let i = 1; i < 16; i++) {
		const tile = tiles[i].element;
		tile.addEventListener('click', event => {
			mode = 'run';
			swap(i);
		});
	}
}
function swap(i) {
	const tile = tiles[i];
	// console.log(isValidforSwap(i));
	if (!isValidforSwap(i)) {
		return;
	}
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
//Helpers
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
	mode = 'won';
	return tiles.every(tile => tile.value === tile.top * 4 + tile.left);
}
const message = document.querySelector('.message');
function wonMessage() {
	setTimeout(() => {
		field.classList.add('active');
		message.innerHTML =
			'You win! <br> Hooray! You solved the puzzle in ##:## and N moves!';
		alert('Hooray! You solved the puzzle in ##:## and N moves!');
		setTimeout(() => {
			message.innerHTML = '';
			field.classList.remove('active');
		}, 4000);
	}, 100);
}
function shuffle(arr) {
	return arr.concat().sort(() => Math.random() - 0.5);
}
function randomSwap() {
	const validPos = findValidPos();
	const swapPos = validPos[Math.floor(Math.random() * validPos.length)];
	console.log(swapPos);
}
function findValidPos() {
	const valid = [];
	for (let i = 1; i < 16; i++) {
		const tile = tiles[i];
		if (isValidforSwap(i)) {
			valid.push(tile);
		}
	}
	return valid;
}
buttonRestart.addEventListener('click', () => {
	randomSwap();
	// const shuffledNumbers = shuffle([...Array(15).keys()]);
	// clearMatrix();
	// createMatrix(shuffledNumbers);
	// handleClick();
});

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

	const shuffledNumbers = shuffle([...Array(15).keys()]);
	createMatrix(shuffledNumbers);
	handleClick();
}
function main() {
	render();
}
main();
