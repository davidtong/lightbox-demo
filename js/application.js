/**
 * @fileoverview Lightbox application logic
 * @author dtong
 */

/**
 * Application logic of the Lightbox application
 */
Lightbox.Application = function() {
	'use strict';
	
	/*
	 * ------------
	 * Private
	 * ------------
	 */
	var FLICKRAPI = {
		BASEURL: 'https://api.flickr.com/services/rest/',
		PARAMS: {
			API_KEY: '5e40833aa10be1819113f561ad2f4ef5',
			PHOTOSET_ID: '72157626579923453',
			METHOD: 'flickr.photosets.getPhotos',
			FORMAT: 'json'
		}
	},
	    INSTAGRAM = {
		BASEURL : 'https://api.instagram.com/v1/media/popular',
		PARAMS : {
			CLIENT_ID: 'b408f4ab0fd64b4680bad1424e55066f',
			callback: 'jsonInstagramApi'
		}
	},
	ESC_KEYCODE = 27,
	LEFT_KEYCODE = 37,
	RIGHT_KEYCODE = 39;

	var ajaxService = Lightbox.Core.getService('ajaxService'),
	    photoService = Lightbox.Core.getService('photoService');

	/**
	 * Handles events in the application
	 * @returns {void}
	 */
	function attachEvents() {
		document.addEventListener('click', function(event) {
			var dataName = event.target.getAttribute('data-name');

			switch(dataName) {
				case 'flickr':
					ajaxService.getJSONP(FLICKRAPI.BASEURL, FLICKRAPI.PARAMS);
					break;
				case 'instagram':
					ajaxService.getJSONP(INSTAGRAM.BASEURL, INSTAGRAM.PARAMS);
					break;
				case 'close-lightbox':
					photoService.close();
					break;
				case 'prev-img':
					photoService.prev();
					break;
				case 'next-img':
					photoService.next();
					break;
				case 'lightbox-background':
					photoService.close();
				default:
					break;
			};
			
			event.stopProgation;
			event.preventDefault;
		});
		
		document.addEventListener("keyup", function(e) {
			if (e.keyCode === ESC_KEYCODE) {
				photoService.close();
			} else if (e.keyCode === LEFT_KEYCODE) {
				photoService.prev();
			} else if (e.keyCode === RIGHT_KEYCODE) {
				photoService.next();
			}
		});

	}

	/*
	 * ------------
	 * Public methods
	 * ------------
	 */
	return {
		init: function() {
			attachEvents();
		}
	};
};


