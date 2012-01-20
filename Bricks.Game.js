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
	var i, j, self = this,
		interval = 1 / this.params.fps * 1000;
	this.canvas = document.getElementById(this.canvasId);
	this.context = this.canvas.getContext("2d");
	this.params.width = this.canvas.width;
	this.params.height = this.canvas.height;
	this.collisionPoints = [];
	for (i = 0; i < this.params.width; i += 1) {
		this.collisionPoints[i] = [];
		for (j = 0; j < this.params.height; j += 1) {
			this.collisionPoints[i][j] = null;
		}
	}
	this.addStaticBallCollider(this.wallCollision, this, {x: 0, y: 0, width: this.params.width, height: this.params.height});
	this.level = new Bricks.Level(this);
	
	this.intervalTimer = setInterval(function () { self.update.apply(self); }, interval);
};

Bricks.Game.prototype.reset = function () {
	this.init(this.canvasId);
	this.start();
};

Bricks.Game.prototype.wallCollision = function (ball) {
	var goodBallsCount = 0,
		i = 0;
	if (ball.position.x + ball.options.speed.x + ball.options.size > this.params.width || ball.position.x + ball.options.speed.x - ball.options.size < 0) {
		ball.options.speed.x = -ball.options.speed.x;
    }
	if (ball.position.y + ball.options.speed.y - ball.options.size < 0) {
		ball.options.speed.y = -ball.options.speed.y;
    } else if (ball.position.y + ball.options.speed.y + ball.options.size > this.params.height) {
		ball.alive = false;
		for (i; i < this.balls.length; i += 1){
			if (this.balls[i].alive) {
				goodBallsCount += 1;
			}
		}
		if (goodBallsCount === 0) {
			this.gameOver();
		}
    }
}

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

Bricks.Game.prototype.addStaticBallCollider = function (func, scope, options) {
	var i, j, defaultOptions = {
		x: null,
		y: null,
		width: 1,
		height: 1
	};

	this.utils.extend(defaultOptions, options);

	for (i = options.x; i < (options.x + options.width); i += 1) {
		for (j = options.y; j < (options.y + options.height); j += 1) {
			if ((i === options.x || i === (options.x + options.width - 1)) || (j === options.y || j === (options.y + options.height - 1))) {
				this.collisionPoints[i][j] = {'func': func, 'scope': scope};
			}
		}
	}
};

Bricks.Game.prototype.removeStaticBallCollider = function (options) {
	var i, j, defaultOptions = {
		x: null,
		y: null,
		width: 1,
		height: 1
	};

	this.utils.extend(defaultOptions, options);

	for (i = options.x; i < (options.x + options.width); i += 1) {
		for (j = options.y; j < (options.y + options.height); j += 1) {
			if ((i === options.x || i === (options.x + options.width - 1)) || (j === options.y || j === (options.y + options.height - 1))) {
				this.collisionPoints[i][j] = null;
			}
		}
	}
};

Bricks.Game.prototype.testCollision = function (ball) {
	var x = ball.position.x, y = ball.position.y,
		sx = ball.options.speed.x, sy = ball.options.speed.y,
		i, j, smallerX, higherX, smallerY, higherY;
	if (sx < 0) {
		smallerX = x + sx;
		higherX = x;
	} else {
		smallerX = x;
		higherX = x + sx;
	}
	if (sy < 0) {
		smallerY = y + sy;
		higherY = y;
	} else {
		smallerY = y;
		higherY = y + sy;
	}
	for (i = smallerX; i <= higherX; i += 1) {
		if(typeof this.collisionPoints[i] !== "undefined"){
			for (j = smallerY; j <= higherY; j += 1) {
				if (typeof this.collisionPoints[i][j] !== "undefined" && this.collisionPoints[i][j] !== null) {
					this.collisionPoints[i][j].func.call(this.collisionPoints[i][j].scope, ball);
					return true;
				}
			}
		}
	}
}

