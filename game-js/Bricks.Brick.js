if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Brick = function (game, options) {
	this.game = game;
	this.defaultOptions = {
		height: 15,
		width: 20,
		x: 0,
		y: 0,
		color: "#C6C6C6"
	};
	this.isAlive = true;
	this.options = this.game.utils.extend(this.defaultOptions, options);
	this.init();
};

Bricks.Brick.prototype.init = function () {
	this.game.addStaticBallCollider(this.collide, this, this.options);
};

Bricks.Brick.prototype.render = function () {
	if (this.isAlive) {
		this.game.utils.drawRectangle(this.options.color, this.options.x, this.options.y, this.options.width, this.options.height);
		return true;
	} else {
		return false;
	}
};

Bricks.Brick.prototype.collide = function (ball) {
	ball.options.speed.y = -ball.options.speed.y;
	this.isAlive = false;
	this.game.removeStaticBallCollider(this.options);
};