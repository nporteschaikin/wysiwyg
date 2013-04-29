(function( $ ){
	
	var defaults = {
		textarea: '.textarea', 
		bold: '.bold', 
		italic: '.italic',
		smaller: '.smaller',
		larger: '.larger',
		link: '.link'
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
			
		}
		
	}

	$.fn.wysiwyg = function( method ) {  
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		
  };

	$.fn.value = function( method ) {  
		
		return __getValue($(this));
		
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
	
	function __build ( el ) {
		
		var input = $('<textarea></textarea>');
		
		input.css({
			'width': 0,
			'height': 0,
			'display': 'none'
		});
		
		if ( __getSetting(el, 'id') ) input.attr('id', __getSetting(el, 'id'));
		if ( __getSetting(el, 'name') ) input.attr('name', __getSetting(el, 'name'));
		
		el.append(input);
		__setSettings(el, {input: input});
		__getElement(el, 'textarea').attr('contenteditable', true);
		
	}
	
	function __binds ( el ) {
		
		el.bind('keyup', function () { __update(el) } );
		
		if ( __elementExists(el, 'bold') ) 
			__getElement(el, 'bold').bind(__getBindName('click'), function (e) { e.preventDefault(); __bold(); } );
		if ( __elementExists(el, 'italic') ) 
			__getElement(el, 'italic').bind(__getBindName('click'), function (e) { e.preventDefault(); __italic(); } );
		if ( __elementExists(el, 'smaller') ) 
			__getElement(el, 'smaller').bind(__getBindName('click'), function (e) { e.preventDefault(); __smaller(); } );
		if ( __elementExists(el, 'larger') ) 
			__getElement(el, 'larger').bind(__getBindName('click'), function (e) { e.preventDefault(); __larger(); } );
		if ( __elementExists(el, 'link') ) 
			__getElement(el, 'link').bind(__getBindName('click'), function (e) { e.preventDefault(); __link(); } );
		
	}
	
	function __update ( el ) {
		
		__getInput(el).html(__getValue(el));
		
	}
	
	function __getInput ( el ) {
		return __getSetting(el, 'input');
	}
	
	function __getTextarea ( el ) {
		return __getElement(el, 'textarea');
	}
	
	function __getValue ( el ) {
		return __getTextarea(el).html();
	}
	
	function __getElement ( el, name ) {
		return el.find(__getSetting(el, name));
	}
	
	function __elementExists ( el, name ) {
		return __getElement(el, name).length
	}
	
	function __exec ( cmd, value ) {
		if (!value) value = null;
		document.execCommand(cmd, false, value);
	}
	
	function __query ( cmd ) {
		return document.queryCommandValue(cmd);
	}
	
	function __bold () {
		__exec('bold');
	}
	
	function __italic () {
		__exec('italic');
	}
	
	function __smaller () {
		__exec('fontSize', parseInt(__query('fontSize')) - 1);
	}
	
	function __larger () {
		__exec('fontSize', parseInt(__query('fontSize')) + 1);
	}
	
	function __link () {
		__exec('CreateLink', prompt('Please enter a URL.'));
	}
	
	function __getBindName ( e ) {
		return e + '.wysiwyg';
	}

})( jQuery );