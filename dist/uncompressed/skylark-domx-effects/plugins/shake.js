define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "shake", function( options, done ) {

	var i = 1,
		element = $( this ),
		direction = options.direction || "left",
		distance = options.distance || 20,
		times = options.times || 3,
		anims = times * 2 + 1,
		speed = Math.round( options.duration / anims ),
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		positiveMotion = ( direction === "up" || direction === "left" ),
		animation0 = {},
		animation = {},
		animation1 = {},
		animation2 = {};


	effects.createPlaceholder( element );

	var Deferred = langx.Deferred;
		start = element.position()[ref],
		funcs = [];

	function doAnimate(element,properties, duration, ease) {
		return function() {
			var d = new Deferred();

			element.animate( properties, duration, ease ,function(){
				d.resolve();
			});
			return d.promise;

		}
	}

	// Animation
	animation0[ ref ] = start;
	animation[ ref ] = start + ( positiveMotion ? -1 : 1 ) * distance;
	animation1[ ref ] = animation[ ref ] + ( positiveMotion ? 1 : -1 ) * distance * 2;
	animation2[ ref ] = animation1[ ref ] + ( positiveMotion ? -1 : 1 ) * distance * 2;

	// Animate
    funcs.push(doAnimate(element,animation, speed, options.easing ));

	// Shakes
	for ( ; i < times; i++ ) {
	    funcs.push(doAnimate(element,animation1, speed, options.easing ));
	    funcs.push(doAnimate(element,animation2, speed, options.easing ));
	}

    funcs.push(doAnimate(element,animation0, speed /2 , options.easing ));

	funcs.push(done);
	funcs.reduce(function(prev, curr, index, array) {
  		return prev.then(curr);
	}, Deferred.resolve());
} );

});
