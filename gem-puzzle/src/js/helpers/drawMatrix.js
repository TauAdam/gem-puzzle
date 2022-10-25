document.title = 'Gem Puzzle';
const body = document.querySelector('body');

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
body.append(wrapper);

const stats = document.createElement('div');
stats.className = 'stats';
const game = document.createElement('div');
game.className = 'game';
const footer = document.createElement('div');
footer.className = 'footer';

const field = document.createElement('div');
field.className = 'field';
game.append(field);

const buttonShuffle = document.createElement('button');
buttonShuffle.className = 'btn-shuffle btn';
footer.append(buttonShuffle);

const message = document.createElement('h1');
message.className = 'message';
wrapper.append(stats, game, footer, message);

const empty = {
	value: 16,
	top: 3,
	left: 3,
};
const tileSize =
	6.25 *
	parseInt(window.getComputedStyle(document.querySelector('html')).fontSize);

const tiles = [empty];
function createMatrix() {
	const list = [...Array(15).keys()];
	console.log(list);
	for (let i = 1; i < 16; i++) {
		const tile = document.createElement('div');
		tile.className = 'tile';
		// const value = list[i - 1] + 1;
		const value = i;
		tile.innerHTML = value;
		const left = (i - 1) % 4;
		const top = (i - left - 1) / 4;
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

export {
	tiles,
	empty,
	tileSize,
	createMatrix,
	stats,
	field,
	game,
	buttonShuffle,
	message,
};
