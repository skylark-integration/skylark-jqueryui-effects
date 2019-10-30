define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects",
	"./size"
], function(langx,$,effects,size) {

return effects.define( "scale", function( options, done ) {

	// Create element
	var el = $( this ),
		mode = options.mode,
		percent = parseInt( options.percent, 10 ) ||
			( parseInt( options.percent, 10 ) === 0 ? 0 : ( mode !== "effect" ? 0 : 100 ) ),

		newOptions = langx.mixin( {
			from: effects.scaledDimensions( el ),
			to: effects.scaledDimensions( el, percent, options.direction || "both" ),
			origin: options.origin || [ "middle", "center" ]
		}, options );

	// Fade option to support puff
	if ( options.fade ) {
		newOptions.from.opacity = 1;
		newOptions.to.opacity = 0;
	}

	size.call( this, newOptions, done );
} );

});
