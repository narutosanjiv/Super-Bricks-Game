if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Paddle = function (game, options) {
	this.game = game;

	this.defaultOptions = {
		height: 10,
		width: 75,
		color: "#F2F2F2",
		click: 3
	};

	this.position =  {x: 0, y: 0};

	this.options = this.game.utils.extend(this.defaultOptions, options);

	this.init();
};

Bricks.Paddle.prototype.init = function () {
	this.position.x = this.game.params.width / 2;
	this.position.y = this.game.params.height - this.options.height;
	this.game.dynamicBallColliders.push(this);
	var self = this;
	this.game.utils.addListener(document, "keydown", function (e) { self.onKeyDown.call(self, e); });
	this.game.utils.addListener(document, "keyup", function (e) { self.onKeyUp.call(self, e); });
};

Bricks.Paddle.prototype.testCollision = function (ball) {
	if (ball.position.y + ball.options.size + ball.options.speed.y > this.position.y && (ball.position.x > this.position.x && ball.position.x < this.position.x + this.options.width)) {
		ball.options.speed.y = -ball.options.speed.y;
		return true;
	} else {
		return false;
	}
};

Bricks.Paddle.prototype.render = function () {
	if (this.moveRight) {
		if ((this.position.x + this.options.click + this.options.width) <= this.game.params.width) {
			this.position.x += this.options.click;
		} else {
			this.position.x = this.game.params.width - this.options.width;
		}
	}
	if (this.moveLeft) {
		if ((this.position.x - this.options.click) >= 0) {
			this.position.x -= this.options.click;
		} else {
			this.position.x = 0;
		}
	}
	this.game.utils.drawRectangle(this.options.color, this.position.x, this.position.y, this.options.width, this.options.height);
};

Bricks.Paddle.prototype.onKeyDown = function (e) {
	if (e.keyCode === 39) {
		this.moveRight = true;
	} else if (e.keyCode === 37) {
		this.moveLeft = true;
	}
};

Bricks.Paddle.prototype.onKeyUp = function (e) {
	if (e.keyCode === 39) {
		this.moveRight = false;
	} else if (e.keyCode === 37) {
		this.moveLeft = false;
	}
};