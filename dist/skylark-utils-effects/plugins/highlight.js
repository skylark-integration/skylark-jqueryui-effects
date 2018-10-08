/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects"],function(e,o,n){return n.define("highlight","show",function(e,a){var r=o(this),i={backgroundColor:r.css("backgroundColor")};"hide"===e.mode&&(i.opacity=0),n.saveStyle(r),r.css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(i,{queue:!1,duration:e.duration,easing:e.easing,complete:a})})});
//# sourceMappingURL=../sourcemaps/plugins/highlight.js.map
