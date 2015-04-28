/**
 * @fileoverview Ajax service
 * @author dtong
 */

/**
 * Ajax service
 */
Lightbox.ajaxService = function() {
	'use strict';
	
	return {
		/**
		 * Make a GET HTTP request, and return a promise object
		 * @param {String} url
		 * @returns {Object} promise object
		 */
		get : function(url) {
			return new Promise(function(resolve, reject) {
				var req = new XMLHttpRequest();
				req.open('GET', url);

				req.onload = function() {
					if (req.status == 200) {
						resolve(req.response);
					} else {
						reject(Error(req.statusText));
					}
				};

				// Handle network errors
				req.onerror = function(e) {
					reject(Error("Network Error"));
				};

				// Make the request
				req.send();
			});
		},
		
		/**
		 * Get JSONP and automatically triggers callback
		 * @param {String} base Base URL of public API
		 * @param {Object} params
		 */
		getJSONP : function(base, params) {
			var paramsString = '?',
			    prop;

			for (prop in params) {
				if (params.hasOwnProperty(prop)) {
					paramsString += ('&' + encodeURIComponent(prop.toLowerCase()) + '=' + encodeURIComponent(params[prop]));
				}
			}

			var script = document.createElement('script');
			script.src = base + paramsString;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};
};