define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects",
	"./scale"
], function(langx,$,effects,scale) {

	return effects.define( "puff", "hide", function( options, done ) {
		var newOptions = langx.mixin( {}, options, {
			fade: true,
			percent: parseInt( options.percent, 10 ) || 150
		} );

		scale.call( this, newOptions, done );
	});

});
