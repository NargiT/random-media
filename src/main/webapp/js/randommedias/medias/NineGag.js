/**
 * Created by nargit on 05/12/2014.
 */
function NineGag() {
	Media.apply(this, ["", ""]);
}
// TODO:
NineGag.prototype = Object.create(Media.prototype);
NineGag.prototype.constructor = NineGag;
NineGag.prototype.randomMedia = function (data) {

	return {
		url: "",
		title: ""
	};
};