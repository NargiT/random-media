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


	var controller = $(this);
	controller.on("/Xkcd/internal/newImage", function (event, media) {
		controller[0]._currentMedia.title = media.title;
		controller[0]._currentMedia.url = media.url;
		controller[0].notify();
	});
	// process an asynchronous call to get a random image
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function (data, textStatus, jqXHR) {
			var media = {title: data.title, url: data.img};
			controller.trigger("/Xkcd/internal/newImage", [media]);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(this.name + " failed to get the image");
		}
	});
};