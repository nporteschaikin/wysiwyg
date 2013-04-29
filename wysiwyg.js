(function( $ ){
	
	var defaults = { 
		elements: {
			textarea: '.textarea', 
			bold: '.bold', 
			italic: '.italic',
			underline: '.underline',
			smaller: '.smaller',
			larger: '.larger',
			link: '.link',
			undo: '.undo',
			redo: '.redo'
		}
	},
	
	methods = {
		
		init: function ( settings, els ) {
			
			return this.each( 
				function() {
					
					__setSettings($(this), $.extend (true, {}, defaults, settings, $(this).data()));
					__setUnique($(this));
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

	function __setSettings ( el, object ) {
		
		var settings = el.data('settings');
		settings = $.extend(true, {}, settings, object);
		el.data('settings', settings);
	}
	
	function __getSetting ( el, key ) {
		
		var settings = el.data('settings');
		if ( settings[key] ) return settings[key];
		return false;
		
	}
	
	function __setUnique ( el ) {
		
		__setSettings ( el, { unique: Math.ceil ( Math.random() * 1000 ) } );
		
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
		__getElement(el, 'textarea').attr('contenteditable', true).css('overflow', 'auto');
		
	}
	
	function __binds ( el ) {
		
		$('body,html').bind(__getBindName(el, 'keyup', false), function () { 
			__update(el);
			__updateStatus(el);
		});
		
		__getAllElements(el, true).bind(__getBindName(el, 'mouseup', true), function (e) { 
			__update(el);
		});
		
		__getAllElements(el, false).bind(__getBindName(el, 'mousedown', true), function (e) { 
			__update(el);
		});
		
		__getAllElements(el, false).bind(__getBindName(el, 'click', true), function (e) { 
			e.preventDefault();
			__updateStatus(el);
		});
		
		__getElement(el, 'bold').bind(__getBindName(el, 'mousedown', false), function () { 
			__bold(); 
		});
		
		__getElement(el, 'italic').bind(__getBindName(el, 'mousedown', false), function () { 
			__italic();
		});
		
		__getElement(el, 'underline').bind(__getBindName(el, 'mousedown', false), function () { 
			__underline(); 
		});
		
		__getElement(el, 'smaller').bind(__getBindName(el, 'mousedown', false), function () { 
			__smaller(); 
		});
		
		__getElement(el, 'larger').bind(__getBindName(el, 'mousedown', false), function () { 
			__larger(); 
		});
		
		__getElement(el, 'link').bind(__getBindName(el, 'mousedown', false), function () { 
			__link(); 
		});
		
		__getElement(el, 'undo').bind(__getBindName(el, 'mousedown', false), function () { 
			__undo(); 
		});
		
		__getElement(el, 'redo').bind(__getBindName(el, 'mousedown', false), function () { 
			__redo(); 
		});
		
	}
	
	function __update ( el ) {
		__getInput(el).html(__getValue(el));
	}
	
	function __updateStatus ( el ) {
		__query('bold') == 'true' ? __getElement(el, 'bold').addClass('true') : __getElement(el, 'bold').removeClass('true');
		__query('italic') == 'true' ? __getElement(el, 'italic').addClass('true') : __getElement(el, 'italic').removeClass('true');
		__query('underline') == 'true' ? __getElement(el, 'underline').addClass('true') : __getElement(el, 'underline').removeClass('true');
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
	
	function __getElementData ( el ) {
		return el.data('settings').elements;
	}
	
	function __getElement ( el, name ) {
		if ( __getElementData(el)[name] ) return el.find(__getElementData(el)[name]);
		return $('');
	}
	
	function __getAllElements ( el, textarea ) {
		var list = [];
		for ( var key in __getElementData(el) ) {
			if ( textarea || !textarea && key != 'textarea' ) 
				list.push(__getElementData(el)[key]);
		}
		return el.find(list.join(', '));
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
	
	function __underline () {
		__exec('underline');
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
	
	function __undo () {
		__exec('undo');
	}
	
	function __redo () {
		__exec('redo');
	}
	
	function __getBindName ( el, e, all ) {
		if ( all ) return e + '.wysiwyg';
		return e + '.wysiwyg' + __getSetting (el, 'unique');
	}

})( jQuery );