/**
 * Created by nargit on 27/11/2014.
 */

function Media(name) {
	this.name = name;
}

Media.prototype.nextMedia = function () {
	throw new SyntaxError("Nothing implemented dude")
}

function JoieDuCode() {
	Media.call(this, ["joie du code"]);
}

JoieDuCode.prototype = Object.create(Media.prototype);
JoieDuCode.prototype.constructor = JoieDuCode;

var monMedia = new JoieDuCode();
console.log(monMedia.name);

var RandomMedias = {
	Media: function (name, getNextMediaFunction) {
		this.name = name;
		this.getNextMedia = getNextMediaFunction;
	},

	init: function (medias) {
		this.generator = function Generator(medias) {
			var mediaCollection = medias;
			var iterator = 0;
			this.nextMedia = function roundRobin() {
				var currentIndex = iterator++ % mediaCollection.length; // round robin
				var currentMedia = mediaCollection[currentIndex];
				if (currentMedia instanceof RandomMedias.Media) {
					return currentMedia.getNextMedia();
				}
				return "No media to display :(";
			};
			this.mediaNames = function mediasNames() {
				var result = [];
				mediaCollection.forEach(
					function (media) {
						result.push(media.name)
					}
				);
				return result;
			};
		};
		RandomMedias.generator(medias);
	},

	nextMedia: function () {
		return RandomMedias.generator.nextMedia();
	},

	mediaNames: function () {
		return RandomMedias.generator.mediaNames();
	}
};