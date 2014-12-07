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
	this.dataType = "jsonp";
	this._currentMedia = new MediaDTO();

	this._currentMedia = Object.defineProperties({}, {
		title: {value: "", writable: true, enumerable: true, configurable: true},
		url: {value: "", writable: true, enumerable: true, configurable: true}
	});
	this._screen = null;
}

Media.prototype.updateMedia = function (media) {
	throw new SyntaxError("This has to be implemented");
};

Media.prototype.notifyScreen = function () {
	this._screen.notify(this._currentMedia);
};

Media.prototype.setScreen = function (screen) {
	this._screen = screen;
};

/**
 *
 * @param {MediaDTO} aMedia
 */
Media.prototype.setCurrentMedia = function (aMedia) {
	this._currentMedia = aMedia;
	this.notifyScreen();
};

/**
 *
 * @param {String} title title of the post
 * @param {String} media direct url to the media (jpg, png, gif, video, text)
 * @param {String} link direct url to the post
 * @param {String} source name of the website
 * @constructor
 */
function MediaDTO(title, media, link, source) {
	this.title = title;
	this.media = media;
	this.link = link;
	this.source = source;
}

MediaDTO.prototype.toString = function () {
	return this.source+":"+this.title +" ["+this.media+"] ["+this.link+"]";
}