define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
	return effects.define( "fade", "toggle", function( options, done ) {
		var show = options.mode === "show";

		$( this )
			.css( "opacity", show ? 0 : 1 )
			.animate( {
				opacity: show ? 1 : 0
			}, {
				queue: false,
				duration: options.duration,
				easing: options.easing,
				complete: done
			} );
	});

});
