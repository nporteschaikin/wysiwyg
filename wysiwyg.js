(function( $ ){
	
	var defaults = {
		linkPrompt: "Please enter a URL."
	},
	
	methods = {
		
		init: function ( settings ) {
			
			return this.each( 
				function() {
					
					__setSettings($(this), $.extend ({}, defaults, settings, $(this).data()));
					__build($(this));
					__binds($(this));
					__update($(this));
					
				}
			)
			
		},
		
	}

	$.fn.wysiwyg = function( method ) {  
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		
  };

	function __setSettings ( el, object ) {
		
		var settings = el.data('settings');
		settings = $.extend({}, settings, object);
		el.data('settings', settings);
		
	}
	
	function __getSetting ( el, key ) {
		
		var settings = el.data('settings');
		if ( settings[key] ) return settings[key];
		return false;
		
	}
	
	function __getButton ( el, key ) {

		var buttons = el.data('settings').buttons;
		if ( buttons && buttons[key] ) return buttons[key];
		return false;

	}
	
	function __build ( el ) {
		
		var textarea = $('<textarea></textarea>');
		
		textarea.css({
			'width': 0,
			'height': 0,
			'display': 'none'
		});
		
		if ( __getSetting(el, 'id') ) textarea.attr('id', __getSetting(el, 'id'));
		if ( __getSetting(el, 'name') ) textarea.attr('name', __getSetting(el, 'name'));
		
		el.after(textarea);
		el.attr('contenteditable', true)
		el.data('textarea', textarea);
		
	}
	
	function __binds ( el ) {
		
		el.bind('keyup', function () { __update(el) } );
		if ( __getButton(el, 'bold') ) 
			$(__getButton(el, 'bold')).bind('click', function (e) { e.preventDefault(); __bold(); } );
		if ( __getButton(el, 'italic') ) 
			$(__getButton(el, 'italic')).bind('click', function (e) { e.preventDefault(); __italic() } );
		if ( __getButton(el, 'link') ) 
			$(__getButton(el, 'link')).bind('click', function (e) { e.preventDefault(); __link(el) } );
		
	}
	
	function __update ( el ) {
		
		__getTextarea(el).html(__getValue(el));
		
	}
	
	function __getTextarea ( el ) {
		return el.data('textarea');
	}
	
	function __getValue ( el ) {
		return el.html();
	}
	
	function __exec ( cmd, value ) {
		if (!value) value = null;
		document.execCommand(cmd, false, value);
	}
	
	function __bold () {
		__exec('bold')
	}
	
	function __italic () {
		__exec('italic')
	}
	
	function __link ( el ) {
		__exec('CreateLink', prompt(__getSetting(el, 'linkPrompt')));
	}

})( jQuery );