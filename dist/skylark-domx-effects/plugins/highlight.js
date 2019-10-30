/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects"],function(o,e,n){return n.define("highlight","show",function(o,a){var r=e(this),i={backgroundColor:r.css("backgroundColor")};"hide"===o.mode&&(i.opacity=0),n.saveStyle(r),r.css({backgroundImage:"none",backgroundColor:o.color||"#ffff99"}).animate(i,{queue:!1,duration:o.duration,easing:o.easing,complete:a})})});
//# sourceMappingURL=../sourcemaps/plugins/highlight.js.map
