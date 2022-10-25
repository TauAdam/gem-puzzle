import { tiles } from './drawMatrix';
import { swap, isValidforSwap } from '../app';

let blockedPos;
function randomSwap() {
	const validPos = findValidPos(blockedPos);
	const swapPos = validPos[Math.floor(Math.random() * validPos.length)];
	swap(swapPos);
	blockedPos = swapPos;
}
function findValidPos(blockedPos) {
	const valid = [];
	for (let i = 1; i < 16; i++) {
		const tile = tiles[i];
		if (isValidforSwap(i)) {
			// console.log(tile);
			if (!blockedPos || tile.value !== blockedPos) {
				valid.push(tile.value);
			}
		}
	}
	return valid;
}

export default randomSwap;
