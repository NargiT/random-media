/**
 * Created by nargit on 06/12/14.
 */
/**
 * @param {String} name name of the source
 * @param {String} url uri that will be called asynchronously
 * @constructor
 */
function Media(name, url) {
	this.name = name;
	this.url = url;

	this._currentMedia = Object.defineProperties({}, {
		title: {value: "", writable: true, enumerable: true, configurable: true},
		url: {value: "", writable: true, enumerable: true, configurable: true}
	});
	this._screen = null;
}

Media.prototype.updateMedia = function (media) {
	throw new SyntaxError("This has to be implemented");
};

Media.prototype.notify = function () {
	//console.debug(this.name + ": notifies the screen");
	this._screen.notify({title: this._currentMedia.title, url: this._currentMedia.url});
};

Media.prototype.setScreen = function (screen) {
	this._screen = screen;
};
