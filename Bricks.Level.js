if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Level = function (game, options) {
	this.game = game;

	this.defaultOptions = {
		paddles: [
			{}
		],
		balls: [
			{}
		],
		bricks: {
			rows: 4,
			cols: 5,
			width: null,
			height: 15,
			margin: 1,
			colors: ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"]
		}
	};

	this.options = this.game.utils.extend(this.defaultOptions, options);

	this.init();
};

Bricks.Level.prototype.init = function () {
	var i;
	this.createBricks();
	this.game.utils.each(this.options.balls, function (el) {
		this.game.balls.push(new Bricks.Ball(this.game, el));
	}, this); 
	this.game.utils.each(this.options.paddles, function (el) {
		this.game.paddles.push(new Bricks.Paddle(this.game, el));
	}, this); 
};

Bricks.Level.prototype.render = function () {
	var count = 0, i, j;
	for (i = 0; i < this.options.bricks.rows; i += 1) {
		for (j = 0; j < this.options.bricks.cols; j += 1) {
			if (this.bricks[i][j].render()) {
				count += 1;
			}
		}
	}
	if (count === 0) {
		this.game.win();
	}
};

Bricks.Level.prototype.testCollision = function (ball) {
	var brickRowHeight = this.options.bricks.height + this.options.bricks.margin,
		brickColWidth = this.options.bricks.width + this.options.bricks.margin,
		row = Math.floor(ball.position.y / brickRowHeight),
		col = Math.floor(ball.position.x / brickColWidth);

	if (ball.position.y < this.options.bricks.rows * brickRowHeight && row >= 0 && col >= 0 && this.bricks[row][col].alive) {
		ball.options.speed.y = -ball.options.speed.y;
		this.bricks[row][col].collide();
	}
};

Bricks.Level.prototype.createBricks = function () {
	var i, j, options;
	this.options.bricks.width = Math.floor(this.game.params.width / this.options.bricks.cols) - this.options.bricks.margin;
	this.bricks = [];
	for (i = 0; i < this.options.bricks.rows; i += 1) {
		this.bricks[i] = [];
		for (j = 0; j < this.options.bricks.cols; j += 1) {
			options = {
				height: this.options.bricks.height,
				width: this.options.bricks.width,
				x: j * (this.options.bricks.width + this.options.bricks.margin),
				y: i * (this.options.bricks.height + this.options.bricks.margin),
				color: this.options.bricks.colors[this.game.utils.randomFromTo(0, this.options.bricks.colors.length)]
			};
			this.bricks[i][j] = new Bricks.Brick(this.game, options);
		}
	}
};

