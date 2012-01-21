if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Ball = function (game, options) {
	this.game = game;
	this.defaultOptions = {
		speed: {x: 2, y: 4},
		size: 10,
		color: "#FFFFFF",
		startPosition: {x: 200, y: 300}
	};
	this.options = this.game.utils.extend(this.defaultOptions, options);
	this.position =  this.options.startPosition;
	this.init();
};

Bricks.Ball.prototype.init = function () {
	this.alive = true;
	this.game.dynamicBallColliders.push(this);
};

Bricks.Ball.prototype.render = function () {
	if (this.alive) {
		var ball = this;
		this.game.utils.drawCircle(this.options.color, this.position.x, this.position.y, this.options.size);
		this.game.testCollision(this);
		this.game.utils.each(this.game.dynamicBallColliders, function (el) {
			if (el !== ball) {
				el.testCollision(ball);
			}
		});
		this.position.x += this.options.speed.x;
		this.position.y += this.options.speed.y;
	}
};

Bricks.Ball.prototype.testCollision = function (ball) {
	if(this.position.x === ball.position.x && this.position.y === ball.position.y){
		var oldX = this.options.speed.x,
			oldY = this.options.speed.y;
		this.options.speed.x = ball.options.speed.x;
		this.options.speed.y = ball.options.speed.y;
		ball.options.speed.x = oldX;
		ball.options.speed.y = oldY;
	}
}