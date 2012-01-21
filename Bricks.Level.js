if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Level = function (game, options) {
	this.game = game;

	this.defaultOptions = {
		canvas: {
			padding: 5
		},
		paddles: [
			{width:120, click: 7}
		],
		balls: [
			{
				speed: {x: -2,y: 4}, 
				startPosition: {x: 10,y: 100}
			},
			{
				color: "#333333", 
				speed: {x: -2,y: 4},
				startPosition: {x: 290,y: 200}
			},
			{
				speed: {x: -2,y: 4}, 
				startPosition: {x: 40,y: 70}
			},
			{
				color: "#333333", 
				speed: {x: -2,y: 4},
				startPosition: {x: 250,y: 300}
			},
			{
				speed: {x: -2,y: 4}, 
				startPosition: {x: 60,y: 100}
			},
			{
				color: "#333333", 
				speed: {x: -2,y: 4},
				startPosition: {x: 230,y: 150}
			}
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

Bricks.Level.prototype.createBricks = function () {
	this.options.bricks.width = ((this.game.params.width - 2 * this.options.canvas.padding) / this.options.bricks.cols) - this.options.bricks.margin;
	var i, j, options;
	this.bricks = [];
	for (i = 0; i < this.options.bricks.rows; i += 1) {
		this.bricks[i] = [];
		for (j = 0; j < this.options.bricks.cols; j += 1) {
			options = {
				height: this.options.bricks.height,
				width: this.options.bricks.width,
				x: (j * (this.options.bricks.width + this.options.bricks.margin)) + this.options.canvas.padding,
				y: (i * (this.options.bricks.height + this.options.bricks.margin)) + this.options.canvas.padding,
				color: this.options.bricks.colors[this.game.utils.randomFromTo(0, this.options.bricks.colors.length)]
			};
			this.bricks[i][j] = new Bricks.Brick(this.game, options);
		}
	}
};

