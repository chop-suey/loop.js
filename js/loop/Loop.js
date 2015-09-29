var Loop = function (source) {
	this.scanner = new Scanner(source);
	this.parse();
};

Loop.prototype.parse = function () {
	console.log('parsing');
};