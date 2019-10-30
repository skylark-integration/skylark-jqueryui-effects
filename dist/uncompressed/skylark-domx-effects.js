/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-effects/effects',[ 
	"skylark-langx/skylark",
	"skylark-langx/langx",
	"skylark-domx-fx",
	"skylark-domx-query"
],function(skylark,langx,fx,$) {

	var dataSpace = "ui-effects-",
		dataSpaceStyle = "ui-effects-style",
		dataSpaceAnimated = "ui-effects-animated",
		plugins = {};


	var effects = skylark.effects = function() {

	};



	langx.mixin(effects,{
		define: function( name, mode, effect ) {
			if ( !effect ) {
				effect = mode;
				mode = "effect";
			}

			plugins[ name ] = effect;
			plugins[ name ].mode = mode;

			return effect;
		},

		scaledDimensions: function( element, percent, direction ) {
			if ( percent === 0 ) {
				return {
					height: 0,
					width: 0,
					outerHeight: 0,
					outerWidth: 0
				};
			}

			var x = direction !== "horizontal" ? ( ( percent || 100 ) / 100 ) : 1,
				y = direction !== "vertical" ? ( ( percent || 100 ) / 100 ) : 1;

			return {
				height: element.height() * y,
				width: element.width() * x,
				outerHeight: element.outerHeight() * y,
				outerWidth: element.outerWidth() * x
			};

		},

		clipToBox: function( animation ) {
			return {
				width: animation.clip.right - animation.clip.left,
				height: animation.clip.bottom - animation.clip.top,
				left: animation.clip.left,
				top: animation.clip.top
			};
		},

		// Injects recently queued functions to be first in line (after "inprogress")
		unshift: function( element, queueLength, count ) {
			var queue = element.queue();

			if ( queueLength > 1 ) {
				queue.splice.apply( queue,
					[ 1, 0 ].concat( queue.splice( queueLength, count ) ) );
			}
			element.dequeue();
		},

		saveStyle: function( element ) {
			element.data( dataSpaceStyle, element[ 0 ].style.cssText );
		},

		restoreStyle: function( element ) {
			element[ 0 ].style.cssText = element.data( dataSpaceStyle ) || "";
			element.removeData( dataSpaceStyle );
		},

		mode: function( element, mode ) {
			var hidden = element.is( ":hidden" );

			if ( mode === "toggle" ) {
				mode = hidden ? "show" : "hide";
			}
			if ( hidden ? mode === "hide" : mode === "show" ) {
				mode = "none";
			}
			return mode;
		},

		// Translates a [top,left] array into a baseline value
		getBaseline: function( origin, original ) {
			var y, x;

			switch ( origin[ 0 ] ) {
			case "top":
				y = 0;
				break;
			case "middle":
				y = 0.5;
				break;
			case "bottom":
				y = 1;
				break;
			default:
				y = origin[ 0 ] / original.height;
			}

			switch ( origin[ 1 ] ) {
			case "left":
				x = 0;
				break;
			case "center":
				x = 0.5;
				break;
			case "right":
				x = 1;
				break;
			default:
				x = origin[ 1 ] / original.width;
			}

			return {
				x: x,
				y: y
			};
		},

		// Creates a placeholder element so that the original element can be made absolute
		createPlaceholder: function( element ) {
			var placeholder,
				cssPosition = element.css( "position" ),
				position = element.position();

			// Lock in margins first to account for form elements, which
			// will change margin if you explicitly set height
			// see: http://jsfiddle.net/JZSMt/3/ https://bugs.webkit.org/show_bug.cgi?id=107380
			// Support: Safari
			element.css( {
				marginTop: element.css( "marginTop" ),
				marginBottom: element.css( "marginBottom" ),
				marginLeft: element.css( "marginLeft" ),
				marginRight: element.css( "marginRight" )
			} )
			.outerWidth( element.outerWidth() )
			.outerHeight( element.outerHeight() );

			if ( /^(static|relative)/.test( cssPosition ) ) {
				cssPosition = "absolute";

				placeholder = $( "<" + element[ 0 ].nodeName + ">" ).insertAfter( element ).css( {

					// Convert inline to inline block to account for inline elements
					// that turn to inline block based on content (like img)
					display: /^(inline|ruby)/.test( element.css( "display" ) ) ?
						"inline-block" :
						"block",
					visibility: "hidden",

					// Margins need to be set to account for margin collapse
					marginTop: element.css( "marginTop" ),
					marginBottom: element.css( "marginBottom" ),
					marginLeft: element.css( "marginLeft" ),
					marginRight: element.css( "marginRight" ),
					"float": element.css( "float" )
				} )
				.outerWidth( element.outerWidth() )
				.outerHeight( element.outerHeight() )
				.addClass( "ui-effects-placeholder" );

				element.data( dataSpace + "placeholder", placeholder );
			}

			element.css( {
				position: cssPosition,
				left: position.left,
				top: position.top
			} );

			return placeholder;
		},

		removePlaceholder: function( element ) {
			var dataKey = dataSpace + "placeholder",
					placeholder = element.data( dataKey );

			if ( placeholder ) {
				placeholder.remove();
				element.removeData( dataKey );
			}
		},

		// Removes a placeholder if it exists and restores
		// properties that were modified during placeholder creation
		cleanUp: function( element ) {
			effects.restoreStyle( element );
			effects.removePlaceholder( element );
		},

		setTransition: function( element, list, factor, value ) {
			value = value || {};
			langx.each( list, function( i, x ) {
				var unit = element.cssUnit( x );
				if ( unit[ 0 ] > 0 ) {
					value[ x ] = unit[ 0 ] * factor + unit[ 1 ];
				}
			} );
			return value;
		}
	});

	// Return an effect options object for the given parameters:
	function _normalizeArguments( effect, options, speed, callback ) {

		// Allow passing all options as the first parameter
		if ( langx.isPlainObject( effect ) ) {
			options = effect;
			effect = effect.effect;
		}

		// Convert to an object
		effect = { effect: effect };

		// Catch (effect, null, ...)
		if ( options == null ) {
			options = {};
		}

		// Catch (effect, callback)
		if ( langx.isFunction( options ) ) {
			callback = options;
			speed = null;
			options = {};
		}

		// Catch (effect, speed, ?)
		if ( typeof options === "number" || fx.speeds[ options ] ) {
			callback = speed;
			speed = options;
			options = {};
		}

		// Catch (effect, options, callback)
		if ( langx.isFunction( speed ) ) {
			callback = speed;
			speed = null;
		}

		// Add options to effect
		if ( options ) {
			langx.mixin( effect, options );
		}

		speed = speed || options.duration;
		effect.duration = fx.off ? 0 :
			typeof speed === "number" ? speed :
			speed in $.fx.speeds ? fx.speeds[ speed ] :
			fx.speeds._default;

		effect.complete = callback || options.complete;

		return effect;
	}

	function standardAnimationOption( option ) {

		// Valid standard speeds (nothing, number, named speed)
		if ( !option || typeof option === "number" || fx.speeds[ option ] ) {
			return true;
		}

		// Invalid strings - treat as "normal" speed
		if ( typeof option === "string" && !plugins[ option ] ) {
			return true;
		}

		// Complete callback
		if ( langx.isFunction( option ) ) {
			return true;
		}

		// Options hash (but not naming an effect)
		if ( typeof option === "object" && !option.effect ) {
			return true;
		}

		// Didn't match any standard API
		return false;
	}

	langx.mixin($.fn,{
		effect: function( /* effect, options, speed, callback */ ) {
			var args = _normalizeArguments.apply( this, arguments ),
				effectMethod = plugins[ args.effect ],
				defaultMode = effectMethod.mode,
				queue = args.queue,
				queueName = queue || "fx",
				complete = args.complete,
				mode = args.mode,
				modes = [],
				prefilter = function( next ) {
					var el = $( this ),
						normalizedMode = effects.mode( el, mode ) || defaultMode;

					// Sentinel for duck-punching the :animated pseudo-selector
					el.data( dataSpaceAnimated, true );

					// Save effect mode for later use,
					// we can't just call effects.mode again later,
					// as the .show() below destroys the initial state
					modes.push( normalizedMode );

					// See $.uiBackCompat inside of run() for removal of defaultMode in 1.13
					if ( defaultMode && ( normalizedMode === "show" ||
							( normalizedMode === defaultMode && normalizedMode === "hide" ) ) ) {
						el.show();
					}

					if ( !defaultMode || normalizedMode !== "none" ) {
						effects.saveStyle( el );
					}

					if ( langx.isFunction( next ) ) {
						next();
					}
				};

			if ( fx.off || !effectMethod ) {

				// Delegate to the original method (e.g., .show()) if possible
				if ( mode ) {
					return this[ mode ]( args.duration, complete );
				} else {
					return this.each( function() {
						if ( complete ) {
							complete.call( this );
						}
					} );
				}
			}

			function run( next ) {
				var elem = $( this );

				function cleanup() {
					elem.removeData( dataSpaceAnimated );

					effects.cleanUp( elem );

					if ( args.mode === "hide" ) {
						elem.hide();
					}

					done();
				}

				function done() {
					if ( langx.isFunction( complete ) ) {
						complete.call( elem[ 0 ] );
					}

					if ( langx.isFunction( next ) ) {
						next();
					}
				}

				// Override mode option on a per element basis,
				// as toggle can be either show or hide depending on element state
				args.mode = modes.shift();

				if ( $.uiBackCompat !== false && !defaultMode ) {
					if ( elem.is( ":hidden" ) ? mode === "hide" : mode === "show" ) {

						// Call the core method to track "olddisplay" properly
						elem[ mode ]();
						done();
					} else {
						effectMethod.call( elem[ 0 ], args, done );
					}
				} else {
					if ( args.mode === "none" ) {

						// Call the core method to track "olddisplay" properly
						elem[ mode ]();
						done();
					} else {
						effectMethod.call( elem[ 0 ], args, cleanup );
					}
				}
			}

			// Run prefilter on all elements first to ensure that
			// any showing or hiding happens before placeholder creation,
			// which ensures that any layout changes are correctly captured.
			//return queue === false ?
			//	this.each( prefilter ).each( run ) :
			//	this.queue( queueName, prefilter ).queue( queueName, run );

			return this.each( prefilter ).each( run );	
		},

		show: ( function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "show";
					return this.effect.call( this, args );
				}
			};
		} )( $.fn.show ),

		hide: ( function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "hide";
					return this.effect.call( this, args );
				}
			};
		} )( $.fn.hide ),

		toggle: ( function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) || typeof option === "boolean" ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "toggle";
					return this.effect.call( this, args );
				}
			};
		} )( $.fn.toggle ),

		cssUnit: function( key ) {
			var style = this.css( key ),
				val = [];

			langx.each( [ "em", "px", "%", "pt" ], function( i, unit ) {
				if ( style.indexOf( unit ) > 0 ) {
					val = [ parseFloat( style ), unit ];
				}
			});


			return val;
		},

		cssClip: function( clipObj ) {
			if ( clipObj ) {
				return this.css( "clip", "rect(" + clipObj.top + "px " + clipObj.right + "px " +
					clipObj.bottom + "px " + clipObj.left + "px)" );
			}
			return parseClip( this.css( "clip" ), this );
		},

		transfer: function( options, done ) {
			var element = $( this ),
				target = $( options.to ),
				targetFixed = target.css( "position" ) === "fixed",
				body = $( "body" ),
				fixTop = targetFixed ? body.scrollTop() : 0,
				fixLeft = targetFixed ? body.scrollLeft() : 0,
				endPosition = target.offset(),
				animation = {
					top: endPosition.top - fixTop,
					left: endPosition.left - fixLeft,
					height: target.innerHeight(),
					width: target.innerWidth()
				},
				startPosition = element.offset(),
				transfer = $( "<div class='ui-effects-transfer'></div>" )
					.appendTo( "body" )
					.addClass( options.className )
					.css( {
						top: startPosition.top - fixTop,
						left: startPosition.left - fixLeft,
						height: element.innerHeight(),
						width: element.innerWidth(),
						position: targetFixed ? "fixed" : "absolute"
					} )
					.animate( animation, options.duration, options.easing, function() {
						transfer.remove();
						if ( langx.isFunction( done ) ) {
							done();
						}
					} );
		}
	});

	function parseClip( str, element ) {
			var outerWidth = element.outerWidth(),
				outerHeight = element.outerHeight(),
				clipRegex = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
				values = clipRegex.exec( str ) || [ "", 0, outerWidth, outerHeight, 0 ];

			return {
				top: parseFloat( values[ 1 ] ) || 0,
				right: values[ 2 ] === "auto" ? outerWidth : parseFloat( values[ 2 ] ),
				bottom: values[ 3 ] === "auto" ? outerHeight : parseFloat( values[ 3 ] ),
				left: parseFloat( values[ 4 ] ) || 0
			};
	}

	fx.step = fx.step || {};

	fx.step.clip = function( fx ) {
		if ( !fx.clipInit ) {
			fx.start = $( fx.elem ).cssClip();
			if ( typeof fx.end === "string" ) {
				fx.end = parseClip( fx.end, fx.elem );
			}
			fx.clipInit = true;
		}

		$( fx.elem ).cssClip( {
			top: fx.pos * ( fx.end.top - fx.start.top ) + fx.start.top,
			right: fx.pos * ( fx.end.right - fx.start.right ) + fx.start.right,
			bottom: fx.pos * ( fx.end.bottom - fx.start.bottom ) + fx.start.bottom,
			left: fx.pos * ( fx.end.left - fx.start.left ) + fx.start.left
		} );
	};


	/******************************************************************************/
	/*********************************** EASING ***********************************/
	/******************************************************************************/

	// Based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

	var baseEasings = {};

	langx.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
		baseEasings[ name ] = function( p ) {
			return Math.pow( p, i + 2 );
		};
	} );

	langx.mixin( baseEasings, {
		Sine: function( p ) {
			return 1 - Math.cos( p * Math.PI / 2 );
		},
		Circ: function( p ) {
			return 1 - Math.sqrt( 1 - p * p );
		},
		Elastic: function( p ) {
			return p === 0 || p === 1 ? p :
				-Math.pow( 2, 8 * ( p - 1 ) ) * Math.sin( ( ( p - 1 ) * 80 - 7.5 ) * Math.PI / 15 );
		},
		Back: function( p ) {
			return p * p * ( 3 * p - 2 );
		},
		Bounce: function( p ) {
			var pow2,
				bounce = 4;

			while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
			return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
		}
	} );

	fx.easing = fx.easing || {};

	langx.each( baseEasings, function( name, easeIn ) {
		fx.easing[ "easeIn" + name ] = easeIn;
		fx.easing[ "easeOut" + name ] = function( p ) {
			return 1 - easeIn( 1 - p );
		};
		fx.easing[ "easeInOut" + name ] = function( p ) {
			return p < 0.5 ?
				easeIn( p * 2 ) / 2 :
				1 - easeIn( p * -2 + 2 ) / 2;
		};
	} );


	return skylark.attach("domx.effects", effects);

});

define( 'skylark-domx-effects/plugins/blind',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "blind", "hide", function( options, done ) {
	var map = {
			up: [ "bottom", "top" ],
			vertical: [ "bottom", "top" ],
			down: [ "top", "bottom" ],
			left: [ "right", "left" ],
			horizontal: [ "right", "left" ],
			right: [ "left", "right" ]
		},
		element = $( this ),
		direction = options.direction || "up",
		start = element.cssClip(),
		animate = { clip: langx.mixin( {}, start ) },
		placeholder = effects.createPlaceholder( element );

	animate.clip[ map[ direction ][ 0 ] ] = animate.clip[ map[ direction ][ 1 ] ];

	if ( options.mode === "show" ) {
		element.cssClip( animate.clip );
		if ( placeholder ) {
			placeholder.css( effects.clipToBox( animate ) );
		}

		animate.clip = start;
	}

	if ( placeholder ) {
		placeholder.animate( effects.clipToBox( animate ), options.duration, options.easing );
	}

	element.animate( animate, {
		queue: false,
		duration: options.duration,
		easing: options.easing,
		complete: done
	} );
} );

});

define( 'skylark-domx-effects/plugins/bounce',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "bounce", function( options, done ) {
	var upAnim, downAnim, refValue,
		element = $( this ),

		// Defaults:
		mode = options.mode,
		hide = mode === "hide",
		show = mode === "show",
		direction = options.direction || "up",
		start,
		distance = options.distance,
		times = options.times || 5,

		// Number of internal animations
		anims = times * 2 + ( show || hide ? 1 : 0 ),
		speed = options.duration / anims,
		easing = options.easing,

		// Utility:
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		motion = ( direction === "up" || direction === "left" ),
		i = 0;

	effects.createPlaceholder( element );

	var Deferred = langx.Deferred;
	var funcs = [];

	refValue = element.css( ref );

	// Default distance for the BIGGEST bounce is the outer Distance / 3
	if ( !distance ) {
		distance = element[ ref === "top" ? "outerHeight" : "outerWidth" ]() / 3;
	}
	start = element.position()[ref];

	if ( show ) {
		downAnim = { opacity: 1 };
		downAnim[ ref ] = refValue;

		// If we are showing, force opacity 0 and set the initial position
		// then do the "first" animation
		element
			.css( "opacity", 0 )
			.css( ref, start + (motion ? -distance * 2 : distance * 2 ));

		funcs.push(doAnimate(element,downAnim, speed, easing));
	}

	// Start at the smallest distance if we are hiding
	if ( hide ) {
		distance = distance / Math.pow( 2, times - 1 );
	}

	downAnim = {};
	downAnim[ ref ] = refValue;


	function doAnimate(element,properties, duration, ease) {
		return function() {
			var d = new Deferred();

			element.animate( properties, duration, easing ,function(){
				d.resolve();
			});
			return d.promise;

		}
	}

	// Bounces up/down/left/right then back to 0 -- times * 2 animations happen here
	for ( ; i < times; i++ ) {
		upAnim = {};
		upAnim[ ref ] = start + ( motion ? -distance : distance) ;

		funcs.push(doAnimate(element,upAnim, speed, easing));

		funcs.push(doAnimate(element,downAnim, speed, easing));

		distance = hide ? distance * 2 : distance / 2;
	}

	// Last Bounce when Hiding
	if ( hide ) {
		upAnim = { opacity: 0 };
		upAnim[ ref ] = start + ( motion ? -1 * distance : distance) ;

		funcs.push(doAnimate(element,upAnim, speed, easing ));
	}

	funcs.push(done);
	funcs.reduce(function(prev, curr, index, array) {
  		return prev.then(curr);
	}, Deferred.resolve());

} );

});

define( 'skylark-domx-effects/plugins/clip',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "clip", "hide", function( options, done ) {
	var start,
		animate = {},
		element = $( this ),
		direction = options.direction || "vertical",
		both = direction === "both",
		horizontal = both || direction === "horizontal",
		vertical = both || direction === "vertical";

	start = element.cssClip();
	animate.clip = {
		top: vertical ? ( start.bottom - start.top ) / 2 : start.top,
		right: horizontal ? ( start.right - start.left ) / 2 : start.right,
		bottom: vertical ? ( start.bottom - start.top ) / 2 : start.bottom,
		left: horizontal ? ( start.right - start.left ) / 2 : start.left
	};

	effects.createPlaceholder( element );

	if ( options.mode === "show" ) {
		element.cssClip( animate.clip );
		animate.clip = start;
	}

	element.animate( animate, {
		queue: false,
		duration: options.duration,
		easing: options.easing,
		complete: done
	} );

} );

});

define( 'skylark-domx-effects/plugins/drop',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "drop", "hide", function( options, done ) {

	var distance,
		element = $( this ),
		mode = options.mode,
		show = mode === "show",
		direction = options.direction || "left",
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		motion = ( direction === "up" || direction === "left" ) ? -1 : 1,
		oppositeMotion =  motion * -1,
		animation = {
			opacity: 0
		},
		start = element.position()[ref];

	effects.createPlaceholder( element );

	distance = options.distance ||
		element[ ref === "top" ? "outerHeight" : "outerWidth" ]( true ) / 2;

	animation[ ref ] = start + motion * distance;

	if ( show ) {
		element.css( animation );

		animation[ ref ] = start + oppositeMotion * distance;
		animation.opacity = 1;
	}

	// Animate
	element.animate( animation, {
		queue: false,
		duration: options.duration,
		easing: options.easing,
		complete: done
	} );
} );

});

define( 'skylark-domx-effects/plugins/explode',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "explode", "hide", function( options, done ) {

	var i, j, left, top, mx, my,
		rows = options.pieces ? Math.round( Math.sqrt( options.pieces ) ) : 3,
		cells = rows,
		element = $( this ),
		mode = options.mode,
		show = mode === "show",

		// Show and then visibility:hidden the element before calculating offset
		offset = element.show().css( "visibility", "hidden" ).offset(),

		// Width and height of a piece
		width = Math.ceil( element.outerWidth() / cells ),
		height = Math.ceil( element.outerHeight() / rows ),
		pieces = [];

	// Children animate complete:
	function childComplete() {
		pieces.push( this );
		if ( pieces.length === rows * cells ) {
			animComplete();
		}
	}

	// Clone the element for each row and cell.
	for ( i = 0; i < rows; i++ ) { // ===>
		top = offset.top + i * height;
		my = i - ( rows - 1 ) / 2;

		for ( j = 0; j < cells; j++ ) { // |||
			left = offset.left + j * width;
			mx = j - ( cells - 1 ) / 2;

			// Create a clone of the now hidden main element that will be absolute positioned
			// within a wrapper div off the -left and -top equal to size of our pieces
			element
				.clone()
				.appendTo( "body" )
				.wrap( "<div></div>" )
				.css( {
					position: "absolute",
					visibility: "visible",
					left: -j * width,
					top: -i * height
				} )

				// Select the wrapper - make it overflow: hidden and absolute positioned based on
				// where the original was located +left and +top equal to the size of pieces
				.parent()
					.addClass( "ui-effects-explode" )
					.css( {
						position: "absolute",
						overflow: "hidden",
						width: width,
						height: height,
						left: left + ( show ? mx * width : 0 ),
						top: top + ( show ? my * height : 0 ),
						opacity: show ? 0 : 1
					} )
					.animate( {
						left: left + ( show ? 0 : mx * width ),
						top: top + ( show ? 0 : my * height ),
						opacity: show ? 1 : 0
					}, options.duration || 500, options.easing, childComplete );
		}
	}

	function animComplete() {
		element.css( {
			visibility: "visible"
		} );
		$( pieces ).remove();
		done();
	}
} );

});

define( 'skylark-domx-effects/plugins/fade',[
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

define( 'skylark-domx-effects/plugins/fold',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "fold", "hide", function( options, done ) {

	// Create element
	var element = $( this ),
		mode = options.mode,
		show = mode === "show",
		hide = mode === "hide",
		size = options.size || 15,
		percent = /([0-9]+)%/.exec( size ),
		horizFirst = !!options.horizFirst,
		ref = horizFirst ? [ "right", "bottom" ] : [ "bottom", "right" ],
		duration = options.duration / 2,

		placeholder = effects.createPlaceholder( element ),

		start = element.cssClip(),
		animation1 = { clip: langx.mixin( {}, start ) },
		animation2 = { clip: langx.mixin( {}, start ) },

		distance = [ start[ ref[ 0 ] ], start[ ref[ 1 ] ] ];


	if ( percent ) {
		size = parseInt( percent[ 1 ], 10 ) / 100 * distance[ hide ? 0 : 1 ];
	}
	animation1.clip[ ref[ 0 ] ] = size;
	animation2.clip[ ref[ 0 ] ] = size;
	animation2.clip[ ref[ 1 ] ] = 0;

	if ( show ) {
		element.cssClip( animation2.clip );
		if ( placeholder ) {
			placeholder.css( effects.clipToBox( animation2 ) );
		}

		animation2.clip = start;
	}

	// Animate
	var Deferred = langx.Deferred;
	var funcs = [];

	function doAnimate(element,properties, duration, ease) {
		return function() {
			var d = new Deferred();

			element.animate( properties, duration, ease ,function(){
				d.resolve();
			});
			return d.promise;

		}
	}

	if ( placeholder ) {
		funcs.push(doAnimate(placeholder,effects.clipToBox( animation1 ), duration, options.easing ));
		funcs.push(doAnimate(placeholder,effects.clipToBox( animation2 ), duration, options.easing ));
	}

	funcs.push(doAnimate(element,animation1, duration, options.easing ));
	funcs.push(doAnimate(element,animation2, duration, options.easing ));

	funcs.push(done);
	funcs.reduce(function(prev, curr, index, array) {
  		return prev.then(curr);
	}, Deferred.resolve());
	
} );

});

define( 'skylark-domx-effects/plugins/highlight',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "highlight", "show", function( options, done ) {
	var element = $( this ),
		animation = {
			backgroundColor: element.css( "backgroundColor" )
		};

	if ( options.mode === "hide" ) {
		animation.opacity = 0;
	}

	effects.saveStyle( element );

	element
		.css( {
			backgroundImage: "none",
			backgroundColor: options.color || "#ffff99"
		} )
		.animate( animation, {
			queue: false,
			duration: options.duration,
			easing: options.easing,
			complete: done
		} );
} );

});

define( 'skylark-domx-effects/plugins/size',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "size", function( options, done ) {

	// Create element
	var baseline, factor, temp,
		element = $( this ),

		// Copy for children
		cProps = [ "fontSize" ],
		vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ],
		hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ],

		// Set options
		mode = options.mode,
		restore = mode !== "effect",
		scale = options.scale || "both",
		origin = options.origin || [ "middle", "center" ],
		position = element.css( "position" ),
		pos = element.position(),
		original = effects.scaledDimensions( element ),
		from = options.from || original,
		to = options.to || effects.scaledDimensions( element, 0 );

	effects.createPlaceholder( element );

	if ( mode === "show" ) {
		temp = from;
		from = to;
		to = temp;
	}

	// Set scaling factor
	factor = {
		from: {
			y: from.height / original.height,
			x: from.width / original.width
		},
		to: {
			y: to.height / original.height,
			x: to.width / original.width
		}
	};

	// Scale the css box
	if ( scale === "box" || scale === "both" ) {

		// Vertical props scaling
		if ( factor.from.y !== factor.to.y ) {
			from = effects.setTransition( element, vProps, factor.from.y, from );
			to = effects.setTransition( element, vProps, factor.to.y, to );
		}

		// Horizontal props scaling
		if ( factor.from.x !== factor.to.x ) {
			from = effects.setTransition( element, hProps, factor.from.x, from );
			to = effects.setTransition( element, hProps, factor.to.x, to );
		}
	}

	// Scale the content
	if ( scale === "content" || scale === "both" ) {

		// Vertical props scaling
		if ( factor.from.y !== factor.to.y ) {
			from = effects.setTransition( element, cProps, factor.from.y, from );
			to = effects.setTransition( element, cProps, factor.to.y, to );
		}
	}

	// Adjust the position properties based on the provided origin points
	if ( origin ) {
		baseline = effects.getBaseline( origin, original );
		from.top = ( original.outerHeight - from.outerHeight ) * baseline.y + pos.top;
		from.left = ( original.outerWidth - from.outerWidth ) * baseline.x + pos.left;
		to.top = ( original.outerHeight - to.outerHeight ) * baseline.y + pos.top;
		to.left = ( original.outerWidth - to.outerWidth ) * baseline.x + pos.left;
	}
	element.css( from );

	// Animate the children if desired
	if ( scale === "content" || scale === "both" ) {

		vProps = vProps.concat( [ "marginTop", "marginBottom" ] ).concat( cProps );
		hProps = hProps.concat( [ "marginLeft", "marginRight" ] );

		// Only animate children with width attributes specified
		// TODO: is this right? should we include anything with css width specified as well
		element.find( "*[width]" ).each( function() {
			var child = $( this ),
				childOriginal = effects.scaledDimensions( child ),
				childFrom = {
					height: childOriginal.height * factor.from.y,
					width: childOriginal.width * factor.from.x,
					outerHeight: childOriginal.outerHeight * factor.from.y,
					outerWidth: childOriginal.outerWidth * factor.from.x
				},
				childTo = {
					height: childOriginal.height * factor.to.y,
					width: childOriginal.width * factor.to.x,
					outerHeight: childOriginal.height * factor.to.y,
					outerWidth: childOriginal.width * factor.to.x
				};

			// Vertical props scaling
			if ( factor.from.y !== factor.to.y ) {
				childFrom = effects.setTransition( child, vProps, factor.from.y, childFrom );
				childTo = effects.setTransition( child, vProps, factor.to.y, childTo );
			}

			// Horizontal props scaling
			if ( factor.from.x !== factor.to.x ) {
				childFrom = effects.setTransition( child, hProps, factor.from.x, childFrom );
				childTo = effects.setTransition( child, hProps, factor.to.x, childTo );
			}

			if ( restore ) {
				effects.saveStyle( child );
			}

			// Animate children
			child.css( childFrom );
			child.animate( childTo, options.duration, options.easing, function() {

				// Restore children
				if ( restore ) {
					effects.restoreStyle( child );
				}
			} );
		} );
	}

	// Animate
	element.animate( to, {
		queue: false,
		duration: options.duration,
		easing: options.easing,
		complete: function() {

			var offset = element.offset();

			if ( to.opacity === 0 ) {
				element.css( "opacity", from.opacity );
			}

			if ( !restore ) {
				element
					.css( "position", position === "static" ? "relative" : position )
					.offset( offset );

				// Need to save style here so that automatic style restoration
				// doesn't restore to the original styles from before the animation.
				effects.saveStyle( element );
			}

			done();
		}
	} );

} );

});

define( 'skylark-domx-effects/plugins/scale',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects",
	"./size"
], function(langx,$,effects,size) {

return effects.define( "scale", function( options, done ) {

	// Create element
	var el = $( this ),
		mode = options.mode,
		percent = parseInt( options.percent, 10 ) ||
			( parseInt( options.percent, 10 ) === 0 ? 0 : ( mode !== "effect" ? 0 : 100 ) ),

		newOptions = langx.mixin( {
			from: effects.scaledDimensions( el ),
			to: effects.scaledDimensions( el, percent, options.direction || "both" ),
			origin: options.origin || [ "middle", "center" ]
		}, options );

	// Fade option to support puff
	if ( options.fade ) {
		newOptions.from.opacity = 1;
		newOptions.to.opacity = 0;
	}

	size.call( this, newOptions, done );
} );

});

define( 'skylark-domx-effects/plugins/puff',[
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

define( 'skylark-domx-effects/plugins/pulsate',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "pulsate", "show", function( options, done ) {
	var element = $( this ),
		mode = options.mode,
		show = mode === "show",
		hide = mode === "hide",
		showhide = show || hide,

		// Showing or hiding leaves off the "last" animation
		anims = ( ( options.times || 5 ) * 2 ) + ( showhide ? 1 : 0 ),
		duration = options.duration / anims,
		animateTo = 0,
		i = 1;

	if ( show || !element.is( ":visible" ) ) {
		element.css( "opacity", 0 ).show();
		animateTo = 1;
	}

	// Anims - 1 opacity "toggles"

	var Deferred = langx.Deferred;
	var funcs = [];

	function doAnimate(element,properties, duration, ease) {
		return function() {
			var d = new Deferred();

			element.animate( properties, duration, ease ,function(){
				d.resolve();
			});
			return d.promise;

		}
	}


	for ( ; i < anims; i++ ) {
		funcs.push(doAnimate(element,{ opacity: animateTo }, duration, options.easing ));
		animateTo = 1 - animateTo;
	}

    funcs.push(doAnimate(element,{ opacity: animateTo }, duration, options.easing ));

	funcs.push(done);
	funcs.reduce(function(prev, curr, index, array) {
  		return prev.then(curr);
	}, Deferred.resolve());

} );

});

define( 'skylark-domx-effects/plugins/shake',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "shake", function( options, done ) {

	var i = 1,
		element = $( this ),
		direction = options.direction || "left",
		distance = options.distance || 20,
		times = options.times || 3,
		anims = times * 2 + 1,
		speed = Math.round( options.duration / anims ),
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		positiveMotion = ( direction === "up" || direction === "left" ),
		animation0 = {},
		animation = {},
		animation1 = {},
		animation2 = {};


	effects.createPlaceholder( element );

	var Deferred = langx.Deferred;
		start = element.position()[ref],
		funcs = [];

	function doAnimate(element,properties, duration, ease) {
		return function() {
			var d = new Deferred();

			element.animate( properties, duration, ease ,function(){
				d.resolve();
			});
			return d.promise;

		}
	}

	// Animation
	animation0[ ref ] = start;
	animation[ ref ] = start + ( positiveMotion ? -1 : 1 ) * distance;
	animation1[ ref ] = animation[ ref ] + ( positiveMotion ? 1 : -1 ) * distance * 2;
	animation2[ ref ] = animation1[ ref ] + ( positiveMotion ? -1 : 1 ) * distance * 2;

	// Animate
    funcs.push(doAnimate(element,animation, speed, options.easing ));

	// Shakes
	for ( ; i < times; i++ ) {
	    funcs.push(doAnimate(element,animation1, speed, options.easing ));
	    funcs.push(doAnimate(element,animation2, speed, options.easing ));
	}

    funcs.push(doAnimate(element,animation0, speed /2 , options.easing ));

	funcs.push(done);
	funcs.reduce(function(prev, curr, index, array) {
  		return prev.then(curr);
	}, Deferred.resolve());
} );

});

define( 'skylark-domx-effects/plugins/slide',[
	"skylark-langx/langx",
	"skylark-domx-query",
	"../effects"
], function(langx,$,effects) {
return effects.define( "slide", "show", function( options, done ) {
	var startClip, startRef,
		element = $( this ),
		map = {
			up: [ "bottom", "top" ],
			down: [ "top", "bottom" ],
			left: [ "right", "left" ],
			right: [ "left", "right" ]
		},
		mode = options.mode,
		direction = options.direction || "left",
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		positiveMotion = ( direction === "up" || direction === "left" ),
		distance = options.distance ||
			element[ ref === "top" ? "outerHeight" : "outerWidth" ]( true ),
		animation = {};

	effects.createPlaceholder( element );

	startClip = element.cssClip();
	startRef = element.position()[ ref ];

	// Define hide animation
	animation[ ref ] = ( positiveMotion ? -1 : 1 ) * distance + startRef;
	animation.clip = element.cssClip();
	animation.clip[ map[ direction ][ 1 ] ] = animation.clip[ map[ direction ][ 0 ] ];

	// Reverse the animation if we're showing
	if ( mode === "show" ) {
		element.cssClip( animation.clip );
		element.css( ref, animation[ ref ] );
		animation.clip = startClip;
		animation[ ref ] = startRef;
	}

	// Actually animate
	element.animate( animation, {
		queue: false,
		duration: options.duration,
		easing: options.easing,
		complete: done
	} );
} );

});

define( 'skylark-domx-effects/plugins/transfer',[
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

define( 'skylark-domx-effects/main',[
	"./effects",
	"./plugins/blind",
	"./plugins/bounce",
	"./plugins/clip",
	"./plugins/drop",
	"./plugins/explode",
	"./plugins/fade",
	"./plugins/fold",
	"./plugins/highlight",
	"./plugins/puff",
	"./plugins/pulsate",
	"./plugins/scale",
	"./plugins/shake",
	"./plugins/size",
	"./plugins/slide",
	"./plugins/transfer"

],function(effects){
	return effects;
});
define('skylark-domx-effects', ['skylark-domx-effects/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-effects.js.map
