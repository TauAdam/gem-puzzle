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
buttonShuffle.textContent = 'Start Game';

const muteButton = document.createElement('button');
muteButton.className = 'btn';
muteButton.textContent = 'Mute';

wrapper.append(stats, game, footer);

const select = document.createElement('select');
select.className = 'btn';
for (let i = 0; i < 6; i++) {
	const option = document.createElement('option');
	option.textContent = `${i + 3}x${i + 3}`;
	option.value = i + 3;
	select.append(option);
	if (option.textContent === '4x4') {
		option.setAttribute('selected', '');
	}
}
footer.append(buttonShuffle, select, muteButton);

let frame = select.value;

const empty = {
	value: frame ** 2,
	top: 3,
	left: 3,
};

let tileSize;

let tiles = [empty];

function createMatrix() {
	frame = select.value;
	tileSize =
		6.25 *
		parseInt(window.getComputedStyle(document.querySelector('html')).fontSize);
	// const list = [...Array(15).keys()];
	for (let i = 1; i < frame ** 2; i++) {
		const tile = document.createElement('div');
		tile.className = 'tile';
		// const value = list[i - 1] + 1;
		const value = i;
		tile.innerHTML = value;
		const left = (i - 1) % frame;
		const top = (i - left - 1) / frame;
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
	tiles = [empty];
	field.innerHTML = '';
}

export {
	tiles,
	empty,
	tileSize,
	createMatrix,
	clearMatrix,
	stats,
	field,
	game,
	buttonShuffle,
	muteButton,
	select,
};
