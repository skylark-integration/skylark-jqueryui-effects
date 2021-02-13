define( [
	"skylark-langx/langx",
	"skylark-domx-query",
	"skylark-domx-fx/shake",
	"../effects"
], function(langx,$,xshake,effects) {
return effects.define( "shake", function( options, done ) {

	effects.createPlaceholder($(this));
	xshake(this,options,done);

} );

});
