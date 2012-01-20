if (typeof Bricks === "undefined") {
	Bricks = {};
}

Bricks.Utils = function (game, options) {
	this.game = game;
};

Bricks.Utils.prototype.drawCircle = function (color, x, y, radius) {
	this.startDrawing(color);
	this.game.context.arc(x, y, radius, 0, Math.PI * 2, true);
	this.stopDrawing();
};

Bricks.Utils.prototype.drawRectangle = function (color, x, y, width, height) {
	this.startDrawing(color);
	this.game.context.rect(x, y, width, height);
	this.stopDrawing();
};

Bricks.Utils.prototype.startDrawing = function (color) {
	if (typeof color !== "undefined") {
		this.game.context.fillStyle = color;
	}
	this.game.context.beginPath();
};

Bricks.Utils.prototype.stopDrawing =  function () {
	this.game.context.closePath();
	this.game.context.fill();
};

Bricks.Utils.prototype.randomFromTo = function (from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
};

Bricks.Utils.prototype.extend = function (objToExtend, obj) {
	for(var key in obj){
		objToExtend[key] = obj[key];
	}
	return objToExtend;
};

Bricks.Utils.prototype.each = function (elements, func, scope) {
	var i = 0, length = elements.length;
	for (i; i < length; i += 1) {
		if (typeof scope === "undefined") {
			scope = elements[i];
		}
		func.call(scope, elements[i]);
	}
};

// Pattern: Initialization time branching - https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/init-time-branching.html
if (typeof window.addEventListener === 'function') {
  Bricks.Utils.prototype.addListener = function (el, type, fn) {
    el.addEventListener(type, fn, false);
  };
} else if (typeof document.attachEvent === 'function') {
  Bricks.Utils.prototype.addListener = function (el, type, fn) {
    el.attachEvent('on' + type, fn);
  };
  Bricks.Utils.prototype.removeListener = function (el, type, fn) {
    el.detachEvent('on' + type, fn);
  };
}
// End Pattern