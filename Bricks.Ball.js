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
};

Bricks.Ball.prototype.render = function () {
	this.game.utils.drawCircle(this.options.color, this.position.x, this.position.y, this.options.size);
	this.game.level.testCollision(this);
	var ball = this;
	this.game.utils.each(this.game.paddles, function (el) {el.testCollision(ball)});
	if (this.position.x + this.options.speed.x + this.options.size > this.game.params.width || this.position.x + this.options.speed.x - this.options.size < 0) {
		this.options.speed.x = -this.options.speed.x;
    }
	if (this.position.y + this.options.speed.y - this.options.size < 0) {
		this.options.speed.y = -this.options.speed.y;
    } else if (this.position.y + this.options.speed.y + this.options.size > this.game.params.height) {
		this.game.gameOver();
    }
    this.position.x += this.options.speed.x;
	this.position.y += this.options.speed.y;
};