/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Apply object visibility on filter click.
 */
Site.filter_objects = function() {
	var project_list = document.querySelectorAll('[data-id]');
	var project_checkboxes = document.querySelectorAll('input[type="radio"]');

	if (this.checked) {
		var id = this.getAttribute('id').toString();
		
		for(var i = 0; i < project_checkboxes.length; i++) {
			if(project_checkboxes[i].getAttribute('id') == id)
				project_checkboxes[i].parentElement.classList.add('active'); else
				project_checkboxes[i].parentElement.classList.remove('active');
		}

		for (var i = 0; i < project_list.length; i++) {
			if(project_list[i].getAttribute('data-id') == id)
				project_list[i].classList.add('visible'); else
				project_list[i].classList.remove('visible');
		}
	}
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// display project group on site load
	var project_visible = document.querySelectorAll('[data-id="1"]');
	var project_checkbox_visible = document.querySelector('input[id="1"]');
	project_checkbox_visible.parentElement.classList.add('active');
	for( var i = 0; i < project_visible.length; i++) {
		project_visible[i].classList.add('visible');
	}

	// attach eventlistener for filter checkboxes
	var filter_checkboxes = document.querySelectorAll('label.project input');
	for (var i = 0; i < filter_checkboxes.length; i++) {
		filter_checkboxes[i].addEventListener('click', Site.filter_objects);
	};

}
// connect document `load` event with handler function
$(Site.on_load);
