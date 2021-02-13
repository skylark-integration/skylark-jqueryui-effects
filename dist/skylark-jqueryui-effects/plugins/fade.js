/**
 * skylark-jqueryui-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","skylark-domx-query","skylark-domx-fx/fade","../effects"],function(e,s,a,f,n){return n.define("fade","toggle",function(e,a){var n="show"===e.mode;s.css(this,"opacity",n?0:1),f(this,n?1:0,e,a)})});
//# sourceMappingURL=../sourcemaps/plugins/fade.js.map
