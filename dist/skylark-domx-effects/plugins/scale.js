/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects","./size"],function(e,i,n,t){return n.define("scale",function(o,r){var s=i(this),a=o.mode,c=parseInt(o.percent,10)||(0===parseInt(o.percent,10)?0:"effect"!==a?0:100),f=e.mixin({from:n.scaledDimensions(s),to:n.scaledDimensions(s,c,o.direction||"both"),origin:o.origin||["middle","center"]},o);o.fade&&(f.from.opacity=1,f.to.opacity=0),t.call(this,f,r)})});
//# sourceMappingURL=../sourcemaps/plugins/scale.js.map
