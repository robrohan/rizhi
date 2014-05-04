/** requires showdown-0.3.1 */
const RIZHI_CONFIG = 'config.json';
RiZhi = {}
/** 
 * The main area where content is loaded into
 */
RiZhi.content_area = document.getElementById('content')
/**
 * Markdown converter
 */
RiZhi.converter = new Showdown.converter();

RiZhi.config = {};
RiZhi.page_headers = {};

/**
 * Grab the hash from the URL.  That's a rizhi "file name".
 * Returns the stuff after the hash or 'pages/index' if nothing else
 */
RiZhi.currentFilename = function() {
	return window.location.hash.toString().replace('#','') || 'pages/index';
}

/**
 * Main doobly do.  Loads up and renders the parts of the pages 
 * we care about
 */
RiZhi.init = function() {
	RiZhi.loadConfig(function(){
		//load the content for the header	
		RiZhi.loadThemeFile('header', function(){
			//and load the footer
			RiZhi.loadThemeFile('footer', function(){
				//load the actual page contents
				RiZhi.loadFile(
					[RiZhi.currentFilename(), '.md'].join(''),
					function(text) {
						
						headers_text = RiZhi.extractHeaders(text);
						if(headers_text[0]['title']) {
							document.title = headers_text[0]['title'];
						}
			
						RiZhi.displayMarkdown(
							RiZhi.content_area,
							headers_text[1],
							function() {
								//After the body text is rendered, rewrite the anchor tags
								//so linking between posts / pages works.
								var a_tags = document.getElementsByTagName("a");
								var atl = a_tags.length;
								for(var q=0; q<atl; q++) {
									a_tags[q].addEventListener('click', function(){
										window.location = this.href;
										window.location.reload()
									});
								}
							}
						)
					},
					function(h) {
						// doh.
						console.log(h);
					}
				);
			});
		});
	});
}

RiZhi.extractHeaders = function(text) {
	var headers = [];
	var text_headers = text.match(/^[a-z0-9]+\S?:\S?.+/mig);
	if(text_headers) {
		var hl = text_headers.length;
		var nv = null;
		for(var i=0; i<hl; i++) {
			text = text.replace(text_headers[i], '');
			nv = text_headers[i].split(':');
			headers[nv[0]] = nv[1];
		}
	}
	RiZhi.page_headers = headers;
	return [headers, text];
}

/**
 * Given an id, load that file into the given id area.  Meaning, if 
 * you have a file in the theme directory named 'herp' and an element with
 * and id of 'herp' this will try to load that file into that id.  
 * ('content' is the only reserved id)
 * 
 * Note: these are obviously all separate http requests so you probably 
 * want to keep them to a minimum (though they can get cached)
 */
RiZhi.loadThemeFile = function(id, after_render_callback) {
	RiZhi.loadFile(
		[RiZhi.config['theme'], '/', id, '.md'].join(''),
		function(text) {
			RiZhi.displayMarkdown(
				document.getElementById(id),
				text,
				after_render_callback
			)
		}
	);
}

RiZhi.loadConfig = function(after_load_callback) {
	RiZhi.loadFile(
		RIZHI_CONFIG,
		function(text) {
			RiZhi.config = JSON.parse(text);
			//console.log(RiZhi.config['theme'])
			if(after_load_callback) after_load_callback();
		}
	);
}

/**
 * Quick and dirty file loading.  This is for a 'static' site so
 * it really doesn't need that much for now.
 */
RiZhi.loadFile = function(file, callback, error_callback) {
	var http = new XMLHttpRequest();
	
	var url = file; //[file].join('');
	
	http.open("GET", url, true);
	http.onreadystatechange = function() {
		if(4 === http.readyState && 200 === http.status) {
			callback(http.responseText);
		} else if(4 === http.readyState && 200 !== http.status) {
			if(error_callback) error_callback(http);
		}
	};

	http.send('');
}

/**
 * Parse markdown and appendChild it to whatever area
 */
RiZhi.displayMarkdown = function(area, markdown, after_render_callback) {
	if(area && markdown) {
		var html = RiZhi.converter.makeHtml(markdown);
	
		var temp_div = document.createElement("div");
		temp_div.setAttribute('class', 'loaded_contents');
		temp_div.innerHTML = html;
		area.appendChild(temp_div);
	}
	
	if(after_render_callback) after_render_callback();
}

// bit overly complicated, but in case some one wants to add jquery or something
window.onload = (function(origin_onload, my_onload){
    return function() {
        if (origin_onload) origin_onload();
        if (my_onload) my_onload();
    };
})(window.onload, RiZhi.init);