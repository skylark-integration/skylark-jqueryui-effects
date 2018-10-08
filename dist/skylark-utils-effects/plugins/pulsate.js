/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects"],function(e,n,i){return i.define("pulsate","show",function(i,r){function s(e,n,i,r){return function(){var s=new d;return e.animate(n,i,r,function(){s.resolve()}),s.promise}}var t=n(this),o=i.mode,u="show"===o,a="hide"===o,c=u||a,f=2*(i.times||5)+(c?1:0),h=i.duration/f,l=0,p=1;!u&&t.is(":visible")||(t.css("opacity",0).show(),l=1);for(var d=e.Deferred,v=[];p<f;p++)v.push(s(t,{opacity:l},h,i.easing)),l=1-l;v.push(s(t,{opacity:l},h,i.easing)),v.push(r),v.reduce(function(e,n,i,r){return e.then(n)},d.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/pulsate.js.map
