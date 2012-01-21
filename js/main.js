GAME = new Bricks.Game("canvas");
GAME.utils.addListener(window, "load", function () {
	GAME.prepare();
	GAME.utils.addListener(document, "keyup", function (e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			GAME.start();
			return false;
		}
	});
});