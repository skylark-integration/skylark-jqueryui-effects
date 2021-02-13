define( [
	"skylark-langx/langx",
	"skylark-domx-fx/bounce",
	"../effects"
], function(langx,xfbounce,effects) {
	return effects.define( "bounce", function( options, done ) {

		effects.createPlaceholder($(this));

		return xfbounce(this,options,done);
	});

});
