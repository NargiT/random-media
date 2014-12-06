/**
 * Created by nargit on 03/12/2014.
 */
function Codeloving() {
	Media.apply(this, ["the code loving", "http://api.tumblr.com/v2/blog/thecodinglove.tumblr.com/posts?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4"]);
}

Codeloving.prototype = Object.create(Media.prototype);
Codeloving.prototype.constructor = Codeloving;
Codeloving.prototype.updateMedia = function (data) {
	var posts = data.response.posts;
	var index = Math.floor(Math.random() * posts.length);
	var regEx = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

	this._currentMedia.url = regEx.exec(data.response.posts[index].body)[1];
	this._currentMedia.title = data.response.posts[index].title;
	this.notify();
};