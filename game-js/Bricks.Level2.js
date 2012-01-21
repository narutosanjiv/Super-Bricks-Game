if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Level2 = function (game, options) {
	this.game = game;
	this.name = "Level 2 - Juggling";
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
				startPosition: {x: 40,y: 180}
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
			cols: 10,
			width: null,
			height: 25,
			margin: 1,
			colors: ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"]
		}
	};

	this.options = this.game.utils.extend(this.defaultOptions, options);

	this.init();
};

Bricks.Level2.prototype.init = Bricks.Level1.prototype.init;

Bricks.Level2.prototype.render = Bricks.Level1.prototype.render;

Bricks.Level2.prototype.createBricks = Bricks.Level1.prototype.createBricks;

