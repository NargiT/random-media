/**
 * Created by nargit on 27/11/2014.
 */

/**
 * @param {String} name name of the source
 * @param {String} url uri that will be called asynchronously
 * @constructor
 */
function Media(name, url) {
	this.name = name;
	this.url = url;
}

Media.prototype.randomMedia = function (data) {
	throw new SyntaxError("Nothing implemented dude.");
};

/**
 *
 * @param {Array.<Media>} medias
 * @constructor
 */
function RandomMedias(medias) {
	if (!medias instanceof Array) {
		throw new SyntaxError("medias is not an Array.");
	}
	this.medias = medias;
	this.media = {title: "", url: ""};

	var publishChannel = "/RandomMedia/newMedia";
	var privateChannel = "/RandomMedias/_currentMedia";

	$(this.media).on(privateChannel, function (event) {
		jQuery.event.trigger(publishChannel, [this]);
	});
}

RandomMedias.prototype.updateMedia = function () {

};

RandomMedias.prototype.mediaNames = function () {
	var result = [];
	this.medias.forEach(
		function (aMedia) {
			result.push(aMedia.name)
		}
	);
	return result;
};











/**
 * publish the next media url in "/RandomMedia/newMedia" channel
 * @type {{media: {title: string, url: string}, init: Function, changeMedia: Function, mediaNames: Function}}
 */
var RandomMedias = {
	media: {title: "", url: ""},

	init: function (medias) {
		this.generator = function (medias) {
			var mediaCollection = medias;
			var iterator = 0;

			/**
			 * Round robin algorithm
			 */
			this.nextMedia = function () {
				var currentIndex = iterator++ % mediaCollection.length;
				var currentMedia = mediaCollection[currentIndex];
				var publishChannel = "/RandomMedia/newMedia";
				if (currentMedia instanceof Media) {
					$.ajax({
						url: currentMedia.url,
						dataType: "jsonp"
					}).done(function (data, textStatus, jqXHR) {
						RandomMedias.media = currentMedia.randomMedia(data);
						// trigger global event
						jQuery.event.trigger(publishChannel, [RandomMedias.media]);
					}).fail(function (jqXHR, textStatus, errorThrown) {
						console.log("Failed : " + jqXHR.toString() + " " + textStatus);
					});
				}
			};

			this.mediaNames = function () {
			}
		};

		RandomMedias.generator(medias);
	},

	changeMedia: function () {
		RandomMedias.nextMedia();
	},

	mediaNames: function () {
		return RandomMedias.generator.mediaNames();
	}
};