/* globals window, document */
( function() {

// Find the script element
var scripts = document.getElementsByTagName( "script" );
var script = scripts[ scripts.length - 1 ];

// Read the modules
var modules = script.getAttribute( "data-modules" );
var composite = script.getAttribute( "data-composite" ) || false;
var pathParts = window.location.pathname.split( "/" );
var effectsAll = [
	"plugins/blind",
	"plugins/bounce",
	"plugins/clip",
	"plugins/drop",
	"plugins/explode",
	"plugins/fade",
	"plugins/fold",
	"plugins/highlight",
	"plugins/puff",
	"plugins/pulsate",
	"plugins/scale",
	"plugins/shake",
	"plugins/size",
	"plugins/slide",
	"plugins/transfer"
];

function getPath( module ) {
	for ( var j = 0; j < effectsAll.length; j++ ) {
		if ( module !== "effects" ) {
			if ( effectsAll[ j ] === module ) {
				return "skylark-jqueryui/"+module;
			}
			if ( effectsAll[ j ].indexOf( module ) !== -1 ) {
				return "skylark-jqueryui/plugins/" + module;
			}
		}
	}
	if (module.indexOf("external") == -1) {
		return "skylark-jqueryui/"+module;
	}
	return module;
}
function fixPaths( modules ) {
	for ( var i = 0; i < modules.length; i++ ) {
		modules[ i ] = getPath( modules[ i ] );
	}
	return modules;
}

// Hide the page while things are loading to prevent a FOUC
document.documentElement.className = "demo-loading";

require.config( {
	baseUrl: window.location.pathname.indexOf( "demos/" ) !== -1 ? ".." : "../..",
	packages : [
      { name: "skylark-langx", location: "../node_modules/skylark-langx/dist/uncompressed/skylark-langx" },
      { name: "skylark-utils", location: "../node_modules/skylark-utils/dist/uncompressed/skylark-utils" },
      { name: "skylark-jquery", location: "../node_modules/skylark-jquery/dist/uncompressed/skylark-jquery" },
      { name: "skylark-jqueryui", location: "../src" }

	],
	paths: {
		"external": "./external/"
	},
	shim: {
		"external/globalize/globalize.culture.de-DE": [ "external/globalize/globalize" ],
		"external/globalize/globalize.culture.ja-JP": [ "external/globalize/globalize" ]
	},
    "map": {
        "*": {
            "jquery": "skylark-jquery"
        }
    }	
} );

// Replace effects all shortcut modules with all the effects modules
if ( modules && modules.indexOf( "effects-all" ) !== -1 ) {
	modules = modules.replace( /effects-all/, effectsAll.join( " " ) );
}

modules = modules ? modules.replace( /^\s+|\s+$/g, "" ).split( /\s+/ ) : [];
if ( !composite ) {
	modules.push( pathParts[ pathParts.length - 2 ] );
}
modules = fixPaths( modules );

modules.unshift("skylark-utils/query");

require( modules, function(query) {
	window.$ = query;
	var newScript = document.createElement( "script" );

	document.documentElement.className = "";

	newScript.text = "( function() { " + script.innerHTML + " } )();";
	document.body.appendChild( newScript ).parentNode.removeChild( newScript );
} );

} )();
