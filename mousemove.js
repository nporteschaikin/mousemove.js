(function( $ ){
	
	var defaults = { 
		x: true,
		y: true
	},
	
	methods = {
		
		init: function ( settings, els ) {
			
			return this.each( 
				function() {
					
					__setSettings($(this), $.extend (true, {}, defaults, settings, $(this).data()));
					__setUnique($(this));
					__build($(this));
					__binds($(this));
					
				}
			)
			
		}
		
	}

	$.fn.mousemove = function( method ) {  
		
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
	
	function __getBindName ( el, e ) {
		return e + '.mousemove' + __getSetting (el, 'unique');
	}
	
	function __setUnique ( el ) {
		__setSettings ( el, { unique: Math.ceil ( Math.random() * 1000 ) } );
	}
	
	function __build ( el ) {
		__setSettings ( el, { parent: el.parent() } );
		__getSetting ( el, 'parent' ).css({'position': 'relative', 'overflow': 'hidden'});
		el.css('position', 'absolute');
	}
	
	function __binds ( el ) {
		__getSetting(el, 'parent').bind(__getBindName(el, 'mousemove'), function (e) { __move(el, e) })
	}

	function __move ( el, e ) {
		
		var child = {
			w: el.width(),
			h: el.height(),
			o: el.offset()
		}
		
		var parent = {
			w: __getSetting(el, 'parent').width(),
			h: __getSetting(el, 'parent').height(),
			o: __getSetting(el, 'parent').offset()
		}
		
		var loc = {
			left: __getSetting(el, 'x') ? -((e.pageX - parent.o.left) / parent.w) * (child.w - parent.w) : '',
			top: __getSetting(el, 'y') ? -((e.pageY - parent.o.top) / parent.h) * (child.h - parent.h) : ''
		}
		
		el.css(loc);
		
	}
	
	function __getMousePosition ( el, e ) {
		return {
			x: e.pageX - el.offset().left,
			y: e.pageY - el.offset().top
		}
	}


})( jQuery );