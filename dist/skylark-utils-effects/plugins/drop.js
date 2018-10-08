/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects"],function(e,t,i){return i.define("drop","hide",function(e,o){var n,a=t(this),r=e.mode,u="show"===r,d=e.direction||"left",s="up"===d||"down"===d?"top":"left",c="up"===d||"left"===d?-1:1,l=c*-1,f={opacity:0},p=a.position()[s];i.createPlaceholder(a),n=e.distance||a["top"===s?"outerHeight":"outerWidth"](!0)/2,f[s]=p+c*n,u&&(a.css(f),f[s]=p+l*n,f.opacity=1),a.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:o})})});
//# sourceMappingURL=../sourcemaps/plugins/drop.js.map
