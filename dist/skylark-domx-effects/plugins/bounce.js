/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects"],function(e,t,n){return n.define("bounce",function(o,r){var i,u,s,c,a=t(this),p=o.mode,f="hide"===p,d="show"===p,h=o.direction||"up",l=o.distance,y=o.times||5,m=2*y+(d||f?1:0),v=o.duration/m,g=o.easing,k="up"===h||"down"===h?"top":"left",w="up"===h||"left"===h,x=0;n.createPlaceholder(a);var b=e.Deferred,q=[];function D(e,t,n,o){return function(){var o=new b;return e.animate(t,n,g,function(){o.resolve()}),o.promise}}for(s=a.css(k),l||(l=a["top"===k?"outerHeight":"outerWidth"]()/3),c=a.position()[k],d&&((u={opacity:1})[k]=s,a.css("opacity",0).css(k,c+(w?2*-l:2*l)),q.push(D(a,u,v,g))),f&&(l/=Math.pow(2,y-1)),(u={})[k]=s;x<y;x++)(i={})[k]=c+(w?-l:l),q.push(D(a,i,v)),q.push(D(a,u,v)),l=f?2*l:l/2;f&&((i={opacity:0})[k]=c+(w?-1*l:l),q.push(D(a,i,v))),q.push(r),q.reduce(function(e,t,n,o){return e.then(t)},b.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/bounce.js.map
