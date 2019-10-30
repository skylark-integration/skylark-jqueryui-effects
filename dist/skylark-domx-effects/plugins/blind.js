/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects"],function(i,t,e){return e.define("blind","hide",function(o,l){var n={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},a=t(this),c=o.direction||"up",r=a.cssClip(),p={clip:i.mixin({},r)},s=e.createPlaceholder(a);p.clip[n[c][0]]=p.clip[n[c][1]],"show"===o.mode&&(a.cssClip(p.clip),s&&s.css(e.clipToBox(p)),p.clip=r),s&&s.animate(e.clipToBox(p),o.duration,o.easing),a.animate(p,{queue:!1,duration:o.duration,easing:o.easing,complete:l})})});
//# sourceMappingURL=../sourcemaps/plugins/blind.js.map
