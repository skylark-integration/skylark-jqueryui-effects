/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects","./size"],function(e,i,n,t){return n.define("scale",function(r,s){var o=i(this),a=r.mode,c=parseInt(r.percent,10)||(0===parseInt(r.percent,10)?0:"effect"!==a?0:100),f=e.mixin({from:n.scaledDimensions(o),to:n.scaledDimensions(o,c,r.direction||"both"),origin:r.origin||["middle","center"]},r);r.fade&&(f.from.opacity=1,f.to.opacity=0),t.call(this,f,s)})});
//# sourceMappingURL=../sourcemaps/plugins/scale.js.map
