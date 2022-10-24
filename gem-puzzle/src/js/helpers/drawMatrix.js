const field = document.querySelector('.field');

const empty = {
	value: 0,
	top: 0,
	left: 0,
};
const tileSize =
	6.25 *
	parseInt(window.getComputedStyle(document.querySelector('html')).fontSize);

const tiles = [empty];
function createMatrix() {
	const numbers = [...Array(15).keys()];
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

export { tiles, empty, tileSize , createMatrix, field};
