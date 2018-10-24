# skylark-utils-effects
The skylark effect utility library

<!--version-->
[skylark-utils-effects](https://github.com/skylarkutils/skylark-utils-effects/) is a effect utility library  for html5 application development using skylark.

## What's included
The effects contained in the library are listed  as follows:
- blind  
Shows or hides the element in the manner of a window blind: by moving the bottom edge down or up, or the right edge to the right or left, depending upon the specified direction and mode.
- bounce  
Causes the element to appear to bounce in the vertical or horizontal direction, optionally showing or hiding the element.
- clip
Shows or hides the element by moving opposite borders of the element together until they meet in the middle, or vice versa.  
- drop 
Shows or hides the element by making it appear to drop onto, or drop off of, the page. 
- explode
Shows or hides the element by splitting it into multiple pieces that move in radial directions as if imploding into, or exploding from, the page.  
- fade
Shows or hides the element by adjusting its opacity. This is the same as the core fade effects, but without options.  
- fold 
Shows or hides the element by adjusting opposite borders in or out, and then doing the same for the other set of borders. 
- highlight 
Calls attention to the element by momentarily changing its background color while showing or hiding the element. 
- puff
Expands or contracts the element in place while adjusting its opacity.  
- pulsate
Adjusts the opacity of the element on and off before ensuring that the element is shown or hidden as specified.  
- scale 
Expands or contracts the element by a specified percentage.
- shake
Shakes the element back and forth, either vertically or horizontally.  
- size
Resizes the element to a specified width and height. Similar to scale except for how the target size is specified. 
- slide 
Moves the element such that it appears to slide onto or off of the page.
- transfer 
Animates a transient outline element that makes the element appear to transfer to another element. The appearance of the outline element must be defined via CSS rules for the ui-effects-transfer class, or the class specified as an option.


## Dependences
| Project | Status | Description |
|---------|--------|-------------|
| [skylark-langx](https://github.com/skylarklangx/skylark-langx)   |  | Javascript language extension library |
| [skylark-utils](https://github.com/skylarkutils/skylark-utils)   |  | Javascript dom utility library |
| [skylark-utils-dom](https://github.com/skylarkutils/skylark-utils-dom) | | An Universal DOM Utility Library |

##  Different builds
builds are in the directory dist.

|  | build | Description |
|---------|--------|-------------|
| full | skylark-utils-effects-all.js | included dependences |
| only | skylark-utils-effects.js | not included dependences |
| full （development） | uncompressed/skylark-utils-effects-all.js | included dependences |
| only （development）| uncompressed/skylark-utils-effects.js | not included dependences |

Please use the "full" version when using this library alone, and use the "only" version when using other skylark libraries.

## Installation
You can get the latest version in many different ways:

- Downloading [a ZIP file from master](https://github.com/skylarkutils/skylark-utils-effects/archive/master.zip)
- Cloning using Git: `git clone https://github.com/skylarkutils/skylark-utils-effects.git`
- Installing via NPM: `npm install https://github.com/skylarkutils/skylark-utils-effects.git#master --save`


## Usage

- Using the skylark-utils-effects library for a AMD module.  
```js
require({
  'paths': {
     'skylark-utils-effects': '{location}/skylark-utils-effects-all' 
  }
}, ['skylark-utils-effects'], function(effects) {
});
```

- Using the skylark-utils-effects library for a global object named skylarkjs.  
```js
<script type="text/javascript" src="{location}/skylark-utils-effects-all.js"></script>
<script>
</script>
```

- Using the skylark-utils-effects library for a AMD package.  
```js
require({
  'packages': [
    { 'name': 'skylark-utils-effects', 'location': '{location}/skylark-utils-effects/' }
  ]
}, ['skylark-utils-effects/effects'], function(Color) {
});
```

## Building 

- Ensure that Node.js is installed.
- Run npm install https://github.com/skylarkjs/skylark-bundle-cli.git -g to ensure sbundle is installed.
- Run npm install to ensure the required dependencies are installed.
- Run npm run build. The builds will be placed in the dist/ directory.

## License

Released under the [MIT](http://opensource.org/licenses/MIT).
Based on:
- jqueryui/effects(The MIT license) 
