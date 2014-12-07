/**
 * Created by nargit on 05/12/2014.
 */
function Xkcd() {
	Media.apply(this, ["xkcd", "http://dynamic.xkcd.com/api-0/jsonp/comic/"]);
}

Xkcd.prototype = Object.create(Media.prototype);
Xkcd.prototype.constructor = Xkcd;
Xkcd.prototype.updateMedia = function (data) {
	var latestPostNum = data.num;
	var num = Math.floor(Math.random() * latestPostNum - 1); // to not pull to old images
	var url = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + num;

	var self = this;
	// process an asynchronous call to get a random image
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function (data, textStatus, jqXHR) {
			var media = {title: data.title, url: data.img};
			self._currentMedia.title = media.title;
			self._currentMedia.url = media.url;
			self.notify();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(this.name + " failed to get the image");
		}
	});
};