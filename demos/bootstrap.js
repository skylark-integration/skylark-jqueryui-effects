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
				return "skylark-domx-effects/"+module;
			}
			if ( effectsAll[ j ].indexOf( module ) !== -1 ) {
				return "skylark-domx-effects/plugins/" + module;
			}
		}
	}
	if (module.indexOf("external") == -1) {
		return "skylark-domx-effects/"+module;
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
          {
           name : "skylark-langx-arrays",
           location : "../node_modules/skylark-langx-arrays/dist/uncompressed/skylark-langx-arrays",
            main: 'main'
         },
         {
           name : "skylark-langx-aspect",
           location : "../node_modules/skylark-langx-aspect/dist/uncompressed/skylark-langx-aspect",
            main: 'main'
         },
         {
           name : "skylark-langx-async",
           location : "../node_modules/skylark-langx-async/dist/uncompressed/skylark-langx-async",
            main: 'main'
         },
         {
           name : "skylark-langx-datetimes",
           location : "../node_modules/skylark-langx-datetimes/dist/uncompressed/skylark-langx-datetimes",
            main: 'main'
         },
         {
           name : "skylark-langx-emitter",
           location : "../node_modules/skylark-langx-emitter/dist/uncompressed/skylark-langx-emitter",
            main: 'main'
         },
         {
           name : "skylark-langx-funcs",
           location : "../node_modules/skylark-langx-funcs/dist/uncompressed/skylark-langx-funcs",
            main: 'main'
         },
         {
           name : "skylark-langx-hoster",
           location : "../node_modules/skylark-langx-hoster/dist/uncompressed/skylark-langx-hoster",
            main: 'main'
         },
         {
           name : "skylark-langx-klass",
           location : "../node_modules/skylark-langx-klass/dist/uncompressed/skylark-langx-klass",
            main: 'main'
         },
         {
           name : "skylark-langx-ns",
           location : "../node_modules/skylark-langx-ns/dist/uncompressed/skylark-langx-ns",
            main: 'main'
         },
         {
           name : "skylark-langx-numbers",
           location : "../node_modules/skylark-langx-numbers/dist/uncompressed/skylark-langx-numbers",
            main: 'main'
         },
         {
           name : "skylark-langx-objects",
           location : "../node_modules/skylark-langx-objects/dist/uncompressed/skylark-langx-objects",
            main: 'main'
         },
         {
           name : "skylark-langx-strings",
           location : "../node_modules/skylark-langx-strings/dist/uncompressed/skylark-langx-strings",
            main: 'main'
         },
         {
           name : "skylark-langx-topic",
           location : "../node_modules/skylark-langx-topic/dist/uncompressed/skylark-langx-topic",
            main: 'main'
         },
         {
           name : "skylark-langx-types",
           location : "../node_modules/skylark-langx-types/dist/uncompressed/skylark-langx-types",
            main: 'main'
         },
         {
           name : "skylark-langx-xhr",
           location : "../node_modules/skylark-langx-xhr/dist/uncompressed/skylark-langx-xhr",
            main: 'main'
         },
         {
           name : "skylark-langx",
           location : "../node_modules/skylark-langx/dist/uncompressed/skylark-langx",
            main: 'main'
         },


         {
           name : "skylark-domx-browser",
           location : "../node_modules/skylark-domx-browser/dist/uncompressed/skylark-domx-browser",
            main: 'main'
         },
         {
           name : "skylark-domx-css",
           location : "../node_modules/skylark-domx-css/dist/uncompressed/skylark-domx-css",
            main: 'main'
         },
         {
           name : "skylark-domx-browser",
           location : "../node_modules/skylark-domx-browser/dist/uncompressed/skylark-domx-browser",
            main: 'main'
         },
         {
           name : "skylark-domx-data",
           location : "../node_modules/skylark-domx-data/dist/uncompressed/skylark-domx-data",
            main: 'main'
         },
         {
           name : "skylark-domx-eventer",
           location : "../node_modules/skylark-domx-eventer/dist/uncompressed/skylark-domx-eventer",
            main: 'main'
         },
         {
           name : "skylark-domx-files",
           location : "../node_modules/skylark-domx-files/dist/uncompressed/skylark-domx-files",
            main: 'main'
         },
         {
           name : "skylark-domx-finder",
           location : "../node_modules/skylark-domx-finder/dist/uncompressed/skylark-domx-finder",
            main: 'main'
         },
         {
           name : "skylark-domx-fx",
           location : "../node_modules/skylark-domx-fx/dist/uncompressed/skylark-domx-fx",
            main: 'main'
         },
         {
           name : "skylark-domx-geom",
           location : "../node_modules/skylark-domx-geom/dist/uncompressed/skylark-domx-geom",
            main: 'main'
         },
         {
           name : "skylark-domx-images",
           location : "../node_modules/skylark-domx-images/dist/uncompressed/skylark-domx-images",
            main: 'main'
         },
         {
           name : "skylark-domx-noder",
           location : "../node_modules/skylark-domx-noder/dist/uncompressed/skylark-domx-noder",
            main: 'main'
         },
         {
           name : "skylark-domx-plugins",
           location : "../node_modules/skylark-domx-plugins/dist/uncompressed/skylark-domx-plugins",
            main: 'main'
         },
         {
           name : "skylark-domx-query",
           location : "../node_modules/skylark-domx-query/dist/uncompressed/skylark-domx-query",
            main: 'main'
         },

         {
           name : "skylark-domx-scripter",
           location : "../node_modules/skylark-domx-scripter/dist/uncompressed/skylark-domx-scripter",
            main: 'main'
         },
         {
           name : "skylark-domx-styler",
           location : "../node_modules/skylark-domx-styler/dist/uncompressed/skylark-domx-styler",
            main: 'main'
         },
         {
           name : "skylark-domx-tables",
           location : "../node_modules/skylark-domx-tables/dist/uncompressed/skylark-domx-tables",
            main: 'main'
         },
         {
           name : "skylark-domx-transforms",
           location : "../node_modules/skylark-domx-transforms/dist/uncompressed/skylark-domx-transforms",
            main: 'main'
         },
         {
           name : "skylark-domx-velm",
           location : "../node_modules/skylark-domx-velm/dist/uncompressed/skylark-domx-velm",
            main: 'main'
         },
                  
         {
           name : "skylark-data-collection" ,
           location : "../node_modules/skylark-data-collection/dist/uncompressed/skylark-data-collection",
            main: 'main'
         },
         {
           name : "skylark-storages-diskfs" ,
           location : "../node_modules/skylark-storages-diskfs/dist/uncompressed/skylark-storages-diskfs",
            main: 'main'
         },

         { name: "skylark-domx-effects", location: "../src" }

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

modules.unshift("skylark-domx-query");

require( modules, function(query) {
	window.$ = query;
	var newScript = document.createElement( "script" );

	document.documentElement.className = "";

	newScript.text = "( function() { " + script.innerHTML + " } )();";
	document.body.appendChild( newScript ).parentNode.removeChild( newScript );
} );

} )();
