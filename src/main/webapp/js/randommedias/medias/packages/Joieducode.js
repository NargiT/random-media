/**
 * Created by nargit on 28/11/2014.
 */
function JoieDuCode() {
	Media.apply(this, ["joie du code", "http://api.tumblr.com/v2/blog/lesjoiesducode.tumblr.com/posts?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4"]);
}

JoieDuCode.prototype = Object.create(Media.prototype);
JoieDuCode.prototype.constructor = JoieDuCode;
JoieDuCode.prototype.updateMedia = function (data) {
	var posts = data.response.posts;
	var index = Math.floor(Math.random() * posts.length);
	var regEx = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

	this._currentMedia.url = regEx.exec(data.response.posts[index].body)[1];
	this._currentMedia.title = data.response.posts[index].title;
	this.notify();
};