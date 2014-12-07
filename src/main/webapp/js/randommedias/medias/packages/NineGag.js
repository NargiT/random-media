/**
 * Created by nargit on 05/12/2014.
 */
function NineGag() {
	var parameters = ["9gag", "http://infinigag.eu01.aws.af.cm/hot/"];
	Media.apply(this, parameters);
	this.dataType = "json";
}
NineGag.prototype = Object.create(Media.prototype);
NineGag.prototype.constructor = NineGag;
NineGag.prototype.updateMedia = function (data) {
	var index = Math.floor(Math.random() * data.data.length);

	var url = data.data[index].images.large;
	var title = data.data[index].caption;
	var link = data.data[index].link;

	this.setCurrentMedia(new MediaDTO(title, url, link, this.name));
};