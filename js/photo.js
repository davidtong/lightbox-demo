/**
 * @fileoverview Photo service responsible for photo retrieval, interactions, etc
 * @author dtong
 */

/**
 * Photo service
 */
Lightbox.photoService = function() {
	'use strict';
	
	/*
	 * ------------
	 * Private
	 * ------------
	 */
	var ajaxService = Lightbox.Core.getService('ajaxService'),
	    reportService = Lightbox.Core.getService('reportService'),
	    lightboxElement = document.querySelectorAll('.lightbox')[0],
		photoFragment = document.querySelectorAll('#lightbox-photo-fragment')[0],
		prevButton = document.querySelectorAll('.lightbox-prev-button')[0],
		nextButton = document.querySelectorAll('.lightbox-next-button')[0],
		lightboxContent = lightboxElement.querySelectorAll('.lightbox-content')[0],
		lightboxImages = [],
		currIndex = 0,
		totalImages = 0;
	
	/**
	 * Given a URL, create an IMG element and add to memory
 	 * @param {Object} url URL of image
 	 * @returns {void}
	 */	
	function createImage(url) {
		var imgClone = photoFragment.querySelector('.lightbox-photo-img').cloneNode(false);
			
		imgClone.src = url;
		lightboxImages.push(imgClone);
	}
	
	/*
	 * ------------
	 * Public methods
	 * ------------
	 */
	return {
		/**
		 * Given a base URL and params for a public API, make a request to get photos
	 	 * @param {String} base Base URL of the public API
	 	 * @param {Object} params Params for the public API call
	 	 * @returns {void}
		 */
		retrievePhotos: function(base, params) {
			var paramsString = '?',
			    prop,
			    me = this;

			for (prop in params) {
				if (params.hasOwnProperty(prop)) {
					paramsString += ('&' + encodeURIComponent(prop.toLowerCase()) + '=' + encodeURIComponent(params[prop]));
				}
			}

			ajaxService.get(base + paramsString).then(function(res) {
				//me.open(res);
				reportService.set(res);
			}, function(err) {
				reportService.set(err);
			});

		},
		
		/**
		 * Open lightbox and default to first image in collection
 		 * @param {Object} obj
 		 * @returns {void}
		 */
		open: function(obj) {
			// set UI
			document.body.className += ' lightbox-opened';
			prevButton.className += ' disabled';
			
			// set content
			lightboxContent.appendChild(lightboxImages[0]);
			
			// initial states
			totalImages = lightboxImages.length;
			currIndex = 0;
			if (totalImages > 1) {
				nextButton.className = nextButton.className.replace(/disabled/g, '');
			}
		},
		
		/**
		 * Close lightbox
 		 * @returns {void}
		 */
		close: function() {
			lightboxContent.innerHTML = '';
			document.body.className = document.body.className.replace(/lightbox-opened/g, '');
			
			lightboxImages = [];
		},
		
		/**
		 * Navigate to previous image in lightbox
 		 * @returns {void}
		 */
		prev: function() {
			var currImgElement;
			
			// return if no previous image is available
			if (prevButton.className.indexOf('disabled') > 0) return;
			
			if (currIndex > 0) {
				this.navigate(nextButton, -1);
			}
			
			if (currIndex === 0) {
				prevButton.className += ' disabled';
			}
			
		},
		
		/**
		 * Navigate to next image in lightbox
 		 * @returns {void}
		 */
		next: function() {
			var currImgElement;
			
			// return if no next image is available
			if (nextButton.className.indexOf('disabled') > 0) return;
		
			if (currIndex < totalImages - 1) {
				this.navigate(prevButton, 1);
			}

			if (currIndex === totalImages - 1) {
				nextButton.className += ' disabled';
			}
		},
		
		/**
		 * Navigate to the image of the offset position. Enable the button of the opposite direction.
		 * @param {Object} button
		 * @param {Object} offset
		 */
		navigate: function(button, offset) {
			var currImgElement = lightboxElement.querySelectorAll('.lightbox-photo-img')[0];
			lightboxContent.replaceChild(lightboxImages[currIndex + offset], currImgElement);
			currIndex = currIndex + offset;
			
			// enable button
			button.className = button.className.replace(/disabled/g, '');
			
		},
		
		/**
		 * Given an object from the Flickr public API response, create images
 		 * @param {Object} obj
 		 * @returns {void}
		 */
		createFlickrContent: function(obj) {
			var photoset,
			    photos,
			    photo,
			    url,
			    i,
			    length;
			    
			photoset = obj.photoset;

			if (photoset) {
				photos = photoset.photo;
			}

			for (i = 0, length = photos.length; i < length; i++) {
				photo = photos[i];
				url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo['id'] + '_' + photo.secret + '.jpg';
				createImage(url);
			}
		},
		
		/**
		 * Given an object from the Instagram public API response, create images
 		 * @param {Object} obj
 		 * @returns {void}
		 */
		createInstagramContent: function(obj) {
			var photos,
			    photo,
			    url,
			    i,
			    length;
			    
			photos = obj.data;
			
			for (i = 0, length = photos.length; i < length; i++) {
				photo = photos[i];
				
				try{
					url = photo.images.standard_resolution.url;
					createImage(url);
				} catch(e) {
					throw(Lightbox.reportService().set('Error getting photos from Instagram into Lightbox: ' + e));
				}
			}
		}
	};
};