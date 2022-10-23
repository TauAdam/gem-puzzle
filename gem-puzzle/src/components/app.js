const field = document.querySelector('.field');
const buttonRestart = document.querySelector('.btn');

const empty = {
	value: 0,
	top: 0,
	left: 0,
};
const cellSize = 100;
const cells = [empty];
function createMatrix() {
	const numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);
	for (let i = 1; i < 16; i++) {
		const cell = document.createElement('div');
		cell.className = 'cell';
		const value = numbers[i - 1] + 1;
		cell.innerHTML = value;
		const left = i % 4;
		const top = (i - left) / 4;
		cell.style.left = `${left * cellSize}px`;
		cell.style.top = `${top * cellSize}px`;
		cells.push({
			value,
			left,
			top,
			element: cell,
		});

		field.append(cell);

		cell.addEventListener('click', event => {
			move(i);
		});
	}
}

function isValidforSwap(i) {
	const cell = cells[i];
	const leftDiff = Math.abs(empty.left - cell.left);
	const topDiff = Math.abs(empty.top - cell.top);
	if (leftDiff + topDiff > 1) {
		return false;
	} else {
		return true;
	}
}
function move(i) {
	const cell = cells[i];
	// console.log(isValidforSwap(i));
	if (!isValidforSwap(i)) {
		return;
	}
	cell.element.style.left = `${empty.left * cellSize}px`;
	cell.element.style.top = `${empty.top * cellSize}px`;
	const emptyTop = empty.top;
	const emptyLeft = empty.left;
	empty.left = cell.left;
	empty.top = cell.top;
	cell.left = emptyLeft;
	cell.top = emptyTop;
	finish();
}
function finish() {
	const isSolved = cells.every(cell => cell.value === cell.top * 4 + cell.left);
	if (isSolved) {
		alert('Hooray! You solved the puzzle in ##:## and N moves!');
	}
}
function shuffle(arr) {
	arr.sort(() => Math.random() - 0.5);
}
buttonRestart.addEventListener('click', () => {});
function main() {
	createMatrix();
}
main();
