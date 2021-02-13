define( [
	"skylark-langx/langx",
	"skylark-domx-styler",
	"skylark-domx-query",
	"skylark-domx-fx/fade",
	"../effects"
], function(langx,styler,$,xfade,effects) {
	return effects.define( "fade", "toggle", function( options, done ) {
		var show = options.mode === "show";

		styler.css(this,"opacity", show ? 0 : 1 );

		xfade(this,  show ? 1 : 0, options ,done );
		
	});

});
