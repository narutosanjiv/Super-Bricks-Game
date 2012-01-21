if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Level2 = function (game, options) {
	this.game = game;
	this.name = "Level 2 - Juggling";
	this.options = {
		canvas: {
			padding: 5
		},
		paddles: [
			{width:120, click: 7, startPostion: 30}
		],
		balls: [
			{
				speed: {x: -2,y: 4}, 
				startPosition: {x: 15,y: 130}
			},
			{
				color: "#333333", 
				speed: {x: -2,y: 3},
				startPosition: {x: 290,y: 200}
			},
			{
				speed: {x: -2,y: 1}, 
				startPosition: {x: 40,y: 180}
			},
			{
				color: "#333333", 
				speed: {x: -2,y: 4},
				startPosition: {x: 250,y: 300}
			},
			{
				speed: {x: -2,y: 5}, 
				startPosition: {x: 60,y: 130}
			},
			{
				color: "#333333", 
				speed: {x: -2,y: 6},
				startPosition: {x: 230,y: 150}
			}
		],
		bricks: {
			rows: 4,
			cols: 10,
			width: null,
			height: 25,
			margin: 1,
			hitsToDestroy: 1,
			colors: ["#bcb8a4", "#9eaaf4", "#5f668f", "#404460"]
		}
	};
	this.init();
};

Bricks.Level2.prototype.init = Bricks.Level1.prototype.init;

Bricks.Level2.prototype.render = Bricks.Level1.prototype.render;

Bricks.Level2.prototype.createBricks = function () {
	this.options.bricks.width = Math.floor(((this.game.options.width - 2 * this.options.canvas.padding) / this.options.bricks.cols) - this.options.bricks.margin);
	var i, j, options, hitsToDestroy = 1;
	this.bricks = [];
	for (i = 0; i < this.options.bricks.rows; i += 1) {
		this.bricks[i] = [];
		if (i == this.options.bricks.rows -1){
			hitsToDestroy = 2;
		}
		for (j = 0; j < this.options.bricks.cols; j += 1) { 
			options = {
				height: this.options.bricks.height,
				width: this.options.bricks.width,
				x: (j * (this.options.bricks.width + this.options.bricks.margin)) + this.options.canvas.padding,
				y: (i * (this.options.bricks.height + this.options.bricks.margin)) + this.options.canvas.padding,
				colors: this.options.bricks.colors,
				hitsToDestroy: hitsToDestroy
			};
			this.bricks[i][j] = new Bricks.Brick(this.game, options);
		}
	}
};

