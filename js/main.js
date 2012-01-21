GAME = new Bricks.Game("canvas",{scoreElementId: "score", levelElementId: "level"});
GAME.utils.addListener(window, "load", function () {
	GAME.prepare();
	GAME.utils.addListener(document, "keyup", function (e) {
		if (e.keyCode === 13) {
			GAME.start();
			return false;
		}
		if (e.keyCode === 80) {
			GAME.pause();
			return false;
		}
	});
});