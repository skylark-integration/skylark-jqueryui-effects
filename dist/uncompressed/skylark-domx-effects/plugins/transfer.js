define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
	var effect;
	if ( $.uiBackCompat !== false ) {
		effect = effects.define( "transfer", function( options, done ) {
			$(this).transfer( options, done );
		} );
	}
	return effect;

});
