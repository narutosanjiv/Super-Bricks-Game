if (typeof Bricks === "undefined") {
	Bricks = {};
}
Bricks.Game = function (canvasId) {
	this.params = {
		background: "#000000",
		fps: 60,
		width: null,
		height: null
	};
	this.context = null;
	this.canvas = null;
	
	this.paddles = [];
	this.balls = [];
	
	this.init(canvasId);
};

Bricks.Game.prototype.init = function (canvasId) {
	this.utils = new Bricks.Utils(this);
	this.canvasId = canvasId;
};

Bricks.Game.prototype.start = function () {
	var self = this,
		interval = 1 / this.params.fps * 1000;
	this.canvas = document.getElementById(this.canvasId);
	this.context = this.canvas.getContext("2d");
	this.params.width = this.canvas.width;
	this.params.height = this.canvas.height;
	
	this.level = new Bricks.Level(this);
	this.intervalTimer = setInterval(function () { self.update.apply(self); }, interval);
};

Bricks.Game.prototype.reset = function () {
	this.init(this.canvasId);
	this.start();
};

Bricks.Game.prototype.update = function () {
	this.clear();
	this.level.render();
	this.utils.each(this.balls, function (el) { el.render();});
	this.utils.each(this.paddles, function (el) { el.render();});
};

Bricks.Game.prototype.win = function () {
	clearInterval(this.intervalTimer);
	if (confirm("You win!!! Do you want to play again?")) {
		this.reset();
	}
};

Bricks.Game.prototype.gameOver = function () {
	clearInterval(this.intervalTimer);
	if (confirm("Looser!!! Do you want to play again?")) {
		this.reset();
	}

};

Bricks.Game.prototype.clear = function () {
	this.context.clearRect(0, 0, this.params.width, this.params.height);
	this.utils.drawRectangle(this.params.background, 0, 0, this.params.width, this.params.height);
};