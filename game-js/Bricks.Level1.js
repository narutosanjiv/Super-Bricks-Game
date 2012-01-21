if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Level1 = function (game) {
	this.game = game;
	this.levelNumber = 1;
	this.name = "The one everybody can do";
	this.options = {
		canvas: {
			padding: 5
		},
		paddles: [
			{width:120, click: 7}
		],
		balls: [
			{
				speed: {x: -2,y: 4}, 
				startPosition: {x: 60,y: 100}
			}
		],
		bricks: {
			rows: 4,
			cols: 5,
			width: null,
			height: 15,
			margin: 1,
			hitsToDestroy: 1,
			score: 100,
			colors: ["#becdff", "#becdff", "#727b9a", "#cad082"]
		},
		levelBonusScore: 0
	};

	this.init();
};

Bricks.Level1.prototype.init = function () {
	var i;
	this.createBricks();
	this.game.utils.each(this.options.balls, function (el) {
		this.game.balls.push(new Bricks.Ball(this.game, el));
	}, this); 
	this.game.utils.each(this.options.paddles, function (el) {
		this.game.paddles.push(new Bricks.Paddle(this.game, el));
	}, this);
	this.game.addToScore(this.options.levelBonusScore);
};

Bricks.Level1.prototype.render = function () {
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

Bricks.Level1.prototype.createBricks = function () {
	this.options.bricks.width = Math.floor(((this.game.options.width - 2 * this.options.canvas.padding) / this.options.bricks.cols) - this.options.bricks.margin);
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
				colors: this.options.bricks.colors,
				hitsToDestroy: this.options.bricks.hitsToDestroy,
				score: this.options.bricks.score
			};
			this.bricks[i][j] = new Bricks.Brick(this.game, options);
		}
	}
};

