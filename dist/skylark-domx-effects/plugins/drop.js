/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects"],function(e,t,i){return i.define("drop","hide",function(e,o){var n,a=t(this),r="show"===e.mode,d=e.direction||"left",u="up"===d||"down"===d?"top":"left",c="up"===d||"left"===d?-1:1,s=-1*c,l={opacity:0},f=a.position()[u];i.createPlaceholder(a),n=e.distance||a["top"===u?"outerHeight":"outerWidth"](!0)/2,l[u]=f+c*n,r&&(a.css(l),l[u]=f+s*n,l.opacity=1),a.animate(l,{queue:!1,duration:e.duration,easing:e.easing,complete:o})})});
//# sourceMappingURL=../sourcemaps/plugins/drop.js.map
