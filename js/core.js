/**
 * @fileoverview Lightbox framework
 * @author dtong
 */

var Lightbox = {};

/**
 * Core of Lightbox framework
 */
Lightbox.Core = (function() {
	'use strict';

	/*
	 * ------------
	 * Private
	 * ------------
	 */
	var services = {};
	
	/**
	 * Retrieves a service
 	 * @param {Object} name Name of service
 	 * @returns {Object}
	 */
	function getService(name) {
		if (services[name]) {
			return services[name];
		} else {
			services[name] = Lightbox[name]();
			return services[name];
		}
	}
	
	/*
	 * ------------
	 * Public methods
	 * ------------
	 */
	return {
		getService: getService
	};
})();
