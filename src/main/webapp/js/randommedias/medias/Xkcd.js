/**
 * Created by nargit on 05/12/2014.
 */
function Xkcd() {
	Media.apply(this, ["xkcd", "http://dynamic.xkcd.com/api-0/jsonp/comic/"]);
}

Xkcd.prototype = Object.create(Media.prototype);
Xkcd.prototype.constructor = Xkcd;
Xkcd.prototype.randomMedia = function (data) {
	var latestPostNum = data.num;
	var num = Math.floor(Math.random() * latestPostNum - 1); // to not pull to old images
	var url = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + num;

	// prepare failing data
	var myMedia = {
		url: null,
		title: ""
	}, ready = false;

	// process second call to get a random image
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function (data, textStatus, jqXHR) {
			myMedia.url = data.img;
			myMedia.title = data.title;
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(this.name + " failed to get the image");
		}
	});
	return myMedia;
};