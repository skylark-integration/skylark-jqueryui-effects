/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects"],function(e,t,n){return n.define("bounce",function(o,r){function i(e,t,n,o){return function(){var o=new q;return e.animate(t,n,m,function(){o.resolve()}),o.promise}}var u,s,c,a,p=t(this),f=o.mode,h="hide"===f,d="show"===f,l=o.direction||"up",y=o.distance,v=o.times||5,g=2*v+(d||h?1:0),k=o.duration/g,m=o.easing,w="up"===l||"down"===l?"top":"left",x="up"===l||"left"===l,b=0;n.createPlaceholder(p);var q=e.Deferred,D=[];for(c=p.css(w),y||(y=p["top"===w?"outerHeight":"outerWidth"]()/3),a=p.position()[w],d&&(s={opacity:1},s[w]=c,p.css("opacity",0).css(w,a+(x?2*-y:2*y)),D.push(i(p,s,k,m))),h&&(y/=Math.pow(2,v-1)),s={},s[w]=c;b<v;b++)u={},u[w]=a+(x?-y:y),D.push(i(p,u,k,m)),D.push(i(p,s,k,m)),y=h?2*y:y/2;h&&(u={opacity:0},u[w]=a+(x?-1*y:y),D.push(i(p,u,k,m))),D.push(r),D.reduce(function(e,t,n,o){return e.then(t)},q.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/bounce.js.map
