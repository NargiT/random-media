/**
 * Created by nargit on 28/11/2014.
 */
function JoieDuCode() {
	var parameters = ["joie du code", "http://api.tumblr.com/v2/blog/lesjoiesducode.tumblr.com/posts?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4"];
	Media.apply(this, parameters);
}

JoieDuCode.prototype = Object.create(Media.prototype);
JoieDuCode.prototype.constructor = JoieDuCode;
JoieDuCode.prototype.updateMedia = function (data) {
	var index = Math.floor(Math.random() * data.response.posts.length);
	var regEx = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

	var url = regEx.exec(data.response.posts[index].body)[1];
	var title = data.response.posts[index].title;
	var link = data.response.posts[index].post_url;

	this.setCurrentMedia(new MediaDTO(title, url, link, this.name));
};