/**
 * Created by nargit on 27/11/2014.
 */

/**
 * Interface
 * @param name
 * @param url
 * @constructor
 */
function Media(name, url) {
	this.name = name;
	this.url = url;
}

Media.prototype.randomMedia = function (data) {
	throw new SyntaxError("Nothing implemented dude");
};

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
				if (currentMedia instanceof Media) {
					$.ajax({
						url: currentMedia.url,
						dataType: "jsonp"
					}).done(function (data, textStatus, jqXHR) {
						RandomMedias.media = currentMedia.randomMedia(data);
						// trigger global event
						jQuery.event.trigger("/RandomMedia/newMedia", [RandomMedias.media]);
					}).fail(function (jqXHR, textStatus, errorThrown) {
						console.log("Fail : " + textStatus);
					});
				}
			};

			this.mediaNames = function () {
				var result = [];
				mediaCollection.forEach(
					function (media) {
						result.push(media.name)
					}
				);
				return result;
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