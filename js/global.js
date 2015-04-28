/**
 * @fileoverview Global functions (AVOID ADDING STUFF HERE!)
 * @author dtong
 */

/**
 * JSONP function for getting Flickr images and opening a lightbox 
 * @param {Object} obj
 */
function jsonFlickrApi(obj) {
	var photoService = Lightbox.Core.getService('photoService');
	photoService.createFlickrContent(obj);
	photoService.open();
}

/**
 * JSONP function for getting Instagram images and opening a lightbox 
 * @param {Object} obj
 */
function jsonInstagramApi(obj) {
	var photoService = Lightbox.Core.getService('photoService');
	photoService.createInstagramContent(obj);
	photoService.open();
}
