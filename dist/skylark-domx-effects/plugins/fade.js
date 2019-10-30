/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects"],function(e,a,n){return n.define("fade","toggle",function(e,n){var i="show"===e.mode;a(this).css("opacity",i?0:1).animate({opacity:i?1:0},{queue:!1,duration:e.duration,easing:e.easing,complete:n})})});
//# sourceMappingURL=../sourcemaps/plugins/fade.js.map
