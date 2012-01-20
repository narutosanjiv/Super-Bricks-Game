if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Ball = function (game, options) {
	this.game = game;
	this.defaultOptions = {
		speed: {x: 2, y: 4},
		size: 10,
		color: "#FFFFFF"
	};
	this.position =  {x: 0, y: 0};
	this.options = this.game.utils.extend(this.defaultOptions, options);
	this.init();
};

Bricks.Ball.prototype.init = function () {
	this.position.x = this.game.params.width / 2;
	this.position.y = this.game.params.height / 2;
	this.alive = true;
};

Bricks.Ball.prototype.render = function () {
	if (this.alive) {
		this.game.utils.drawCircle(this.options.color, this.position.x, this.position.y, this.options.size);
		this.game.testCollision(this);
		var ball = this;
		this.game.utils.each(this.game.paddles, function (el) {el.testCollision(ball)});
		this.position.x += this.options.speed.x;
		this.position.y += this.options.speed.y;
	}
};