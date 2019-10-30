define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "fold", "hide", function( options, done ) {

	// Create element
	var element = $( this ),
		mode = options.mode,
		show = mode === "show",
		hide = mode === "hide",
		size = options.size || 15,
		percent = /([0-9]+)%/.exec( size ),
		horizFirst = !!options.horizFirst,
		ref = horizFirst ? [ "right", "bottom" ] : [ "bottom", "right" ],
		duration = options.duration / 2,

		placeholder = effects.createPlaceholder( element ),

		start = element.cssClip(),
		animation1 = { clip: langx.mixin( {}, start ) },
		animation2 = { clip: langx.mixin( {}, start ) },

		distance = [ start[ ref[ 0 ] ], start[ ref[ 1 ] ] ];


	if ( percent ) {
		size = parseInt( percent[ 1 ], 10 ) / 100 * distance[ hide ? 0 : 1 ];
	}
	animation1.clip[ ref[ 0 ] ] = size;
	animation2.clip[ ref[ 0 ] ] = size;
	animation2.clip[ ref[ 1 ] ] = 0;

	if ( show ) {
		element.cssClip( animation2.clip );
		if ( placeholder ) {
			placeholder.css( effects.clipToBox( animation2 ) );
		}

		animation2.clip = start;
	}

	// Animate
	var Deferred = langx.Deferred;
	var funcs = [];

	function doAnimate(element,properties, duration, ease) {
		return function() {
			var d = new Deferred();

			element.animate( properties, duration, ease ,function(){
				d.resolve();
			});
			return d.promise;

		}
	}

	if ( placeholder ) {
		funcs.push(doAnimate(placeholder,effects.clipToBox( animation1 ), duration, options.easing ));
		funcs.push(doAnimate(placeholder,effects.clipToBox( animation2 ), duration, options.easing ));
	}

	funcs.push(doAnimate(element,animation1, duration, options.easing ));
	funcs.push(doAnimate(element,animation2, duration, options.easing ));

	funcs.push(done);
	funcs.reduce(function(prev, curr, index, array) {
  		return prev.then(curr);
	}, Deferred.resolve());
	
} );

});
