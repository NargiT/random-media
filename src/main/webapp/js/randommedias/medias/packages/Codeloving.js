/**
 * Created by nargit on 03/12/2014.
 */
function Codeloving() {
	var parameters = ["the code loving", "http://api.tumblr.com/v2/blog/thecodinglove.tumblr.com/posts?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4"];
	Media.apply(this, parameters);
}

Codeloving.prototype = Object.create(Media.prototype);
Codeloving.prototype.constructor = Codeloving;
Codeloving.prototype.updateMedia = function (data) {
	var index = Math.floor(Math.random() * data.response.posts.length);
	var regEx = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

	var media = regEx.exec(data.response.posts[index].body)[1];
	var title = data.response.posts[index].title;
	var link = data.response.posts[index].post_url;

	this.setCurrentMedia(new MediaDTO(title, media, link, this.name));
};