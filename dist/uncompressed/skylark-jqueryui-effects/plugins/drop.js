define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "drop", "hide", function( options, done ) {

	var distance,
		element = $( this ),
		mode = options.mode,
		show = mode === "show",
		direction = options.direction || "left",
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		motion = ( direction === "up" || direction === "left" ) ? -1 : 1,
		oppositeMotion =  motion * -1,
		animation = {
			opacity: 0
		},
		start = element.position()[ref];

	effects.createPlaceholder( element );

	distance = options.distance ||
		element[ ref === "top" ? "outerHeight" : "outerWidth" ]( true ) / 2;

	animation[ ref ] = start + motion * distance;

	if ( show ) {
		element.css( animation );

		animation[ ref ] = start + oppositeMotion * distance;
		animation.opacity = 1;
	}

	// Animate
	element.animate( animation, {
		queue: false,
		duration: options.duration,
		easing: options.easing,
		complete: done
	} );
} );

});
