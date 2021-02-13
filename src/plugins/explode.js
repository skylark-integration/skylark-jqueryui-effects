define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"skylark-domx-fx/explode",
	"../effects"
], function(langx,$,xexplode,effects) {
	return effects.define( "explode", "hide", function( options, done ) {
		xexplode(this,options,done);
	});

});
