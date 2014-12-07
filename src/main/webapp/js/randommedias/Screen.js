/**
 * Created by nargit on 27/11/2014.
 */
/**
 *
 * @param {Array.<Media>} medias
 * @constructor
 */
function Screen(medias) {
	if (!medias instanceof Array) {
		throw new SyntaxError("medias is not an Array.");
	}
	this._medias = [];
	this.addMedias(medias);
	this._internalChannel = "/Screen/_currentMedia";

	this.$mediaReceived = $({});
	this.$mediaReceived.on(this._internalChannel, function (event, media) {
		//console.debug("internal notification received");
		//console.log("public notification triggering...");
		$.event.trigger(Screen.prototype.PUBLIC_TOPIC, [media]);
	});
}

Screen.prototype.PUBLIC_TOPIC = "/RandomMedia/newMedia";
Screen.prototype.updateMedia = function () {
	var currentMedia = this._medias[Math.floor(Math.random() * this._medias.length)];
	console.log("Ask " + currentMedia.name);
	if (currentMedia instanceof Media) {
		$.ajax({
			url: currentMedia.url,
			dataType: currentMedia.dataType,
			timeout: 10000
		}).done(function (data, textStatus, jqXHR) {
			currentMedia.updateMedia(data);
		}).fail(function (jqXHR, textStatus, errorThrown) {
			console.debug("Failed : jqXHR-> " + jqXHR.toString() + " status-> [" + textStatus + "] exception-> [" + errorThrown + "]");
		});
	}
};

Screen.prototype.mediaNames = function () {
	var result = [];
	this._medias.forEach(
		function (aMedia) {
			result.push(aMedia.name)
		}
	);
	return result;
};

/**
 *
 * @param {MediaDTO} newMedia
 */
Screen.prototype.notify = function (newMedia) {
	//console.debug("internal notification triggering..."+newMedia.title+" ["+newMedia.url+"]");
	this.$mediaReceived.trigger(this._internalChannel, [newMedia]);
};

Screen.prototype.addMedias = function (medias) {
	for (var i = 0; i < medias.length; i++) {
		this.addMedia(medias[i]);
	}
};

Screen.prototype.addMedia = function (media) {
	this._medias.push(media);
	media.setScreen(this);
};