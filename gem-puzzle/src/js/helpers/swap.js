import { tileSize, tiles, empty, message } from './drawMatrix';

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
	return tiles.every(tile => tile.value === tile.top * 4 + tile.left);
}
function wonMessage() {
	setTimeout(() => {
		message.innerHTML =
			'You win! <br> Hooray! You solved the puzzle in ##:## and N moves!';
		// alert('Hooray! You solved the puzzle in ##:## and N moves!');
		setTimeout(() => {
			message.innerHTML = '';
		}, 4000);
	}, 100);
}
export { swap, isValidforSwap };
