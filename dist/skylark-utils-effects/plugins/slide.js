/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects"],function(t,e,i){return i.define("slide","show",function(t,o){var l,s,n=e(this),c={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},p=t.mode,r=t.direction||"left",a="up"===r||"down"===r?"top":"left",u="up"===r||"left"===r,d=t.distance||n["top"===a?"outerHeight":"outerWidth"](!0),f={};i.createPlaceholder(n),l=n.cssClip(),s=n.position()[a],f[a]=(u?-1:1)*d+s,f.clip=n.cssClip(),f.clip[c[r][1]]=f.clip[c[r][0]],"show"===p&&(n.cssClip(f.clip),n.css(a,f[a]),f.clip=l,f[a]=s),n.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:o})})});
//# sourceMappingURL=../sourcemaps/plugins/slide.js.map
