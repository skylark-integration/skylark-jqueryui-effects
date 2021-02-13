define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"skylark-domx-fx/pulsate",
	"../effects"
], function(langx,$,pulsate,effects) {
	return effects.define( "pulsate", "show", function( options, done ) {
		pulsate(this,options,done);
	} );

});
