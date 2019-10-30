/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects"],function(t,e,i){return i.define("slide","show",function(t,o){var l,n,s=e(this),c={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},p=t.mode,r=t.direction||"left",a="up"===r||"down"===r?"top":"left",d="up"===r||"left"===r,u=t.distance||s["top"===a?"outerHeight":"outerWidth"](!0),f={};i.createPlaceholder(s),l=s.cssClip(),n=s.position()[a],f[a]=(d?-1:1)*u+n,f.clip=s.cssClip(),f.clip[c[r][1]]=f.clip[c[r][0]],"show"===p&&(s.cssClip(f.clip),s.css(a,f[a]),f.clip=l,f[a]=n),s.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:o})})});
//# sourceMappingURL=../sourcemaps/plugins/slide.js.map
