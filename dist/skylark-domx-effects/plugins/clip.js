/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../effects"],function(t,e,i){return i.define("clip","hide",function(t,o){var l,r={},a=e(this),n=t.direction||"vertical",c="both"===n,s=c||"horizontal"===n,p=c||"vertical"===n;l=a.cssClip(),r.clip={top:p?(l.bottom-l.top)/2:l.top,right:s?(l.right-l.left)/2:l.right,bottom:p?(l.bottom-l.top)/2:l.bottom,left:s?(l.right-l.left)/2:l.left},i.createPlaceholder(a),"show"===t.mode&&(a.cssClip(r.clip),r.clip=l),a.animate(r,{queue:!1,duration:t.duration,easing:t.easing,complete:o})})});
//# sourceMappingURL=../sourcemaps/plugins/clip.js.map
