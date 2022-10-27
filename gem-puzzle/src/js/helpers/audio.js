function soundAccompaniment(src, mute) {
	const moveAudio = new Audio(src);
	if (!mute) {
		moveAudio.play();
	}
}

export default soundAccompaniment;
