/**
 * @fileoverview Report service used to show message in a dedicated UI container
 * @author dtong
 */

/**
 * Report service
 */
Lightbox.reportService = function() {
	'use strict';
	
	return {
		/**
		 * Set text in a dedicated console container
		 * @param {String} message Message to display
		 * @returns {void}
		 */
		set: function(message) {
			var consoleTextElement = document.querySelectorAll('.console-text');

			if (consoleTextElement.length) {
				consoleTextElement[0].textContent = message;
			};
		}
	};
};
