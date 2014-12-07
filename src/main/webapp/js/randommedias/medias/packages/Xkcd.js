/**
 * Created by nargit on 05/12/2014.
 */
function Xkcd() {
	var parameters = ["xkcd", "http://dynamic.xkcd.com/api-0/jsonp/comic/"];
	Media.apply(this, parameters);
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
		dataType: self.dataType,
		timeout: 2000,
		success: function (data, textStatus, jqXHR) {
			var title = data.title;
			var media = data.img;
			var link = "http://xkcd.com/"+num;
			self.setCurrentMedia(new MediaDTO(title, media, link, self.name));
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(this.name + " failed to get the image");
		}
	});
};