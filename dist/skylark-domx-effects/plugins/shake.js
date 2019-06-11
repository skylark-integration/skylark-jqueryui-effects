/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../effects"],function(n,e,t){return t.define("shake",function(s,r){var u=1,i=e(this),a=s.direction||"left",f=s.distance||20,c=s.times||3,o=2*c+1,l=Math.round(s.duration/o),d="up"===a||"down"===a?"top":"left",h="up"===a||"left"===a,p={},g={},k={},v={};t.createPlaceholder(i);var m=n.Deferred;function y(n,e,t,s){return function(){var r=new m;return n.animate(e,t,s,function(){r.resolve()}),r.promise}}for(start=i.position()[d],funcs=[],p[d]=start,g[d]=start+(h?-1:1)*f,k[d]=g[d]+(h?1:-1)*f*2,v[d]=k[d]+(h?-1:1)*f*2,funcs.push(y(i,g,l,s.easing));u<c;u++)funcs.push(y(i,k,l,s.easing)),funcs.push(y(i,v,l,s.easing));funcs.push(y(i,p,l/2,s.easing)),funcs.push(r),funcs.reduce(function(n,e,t,s){return n.then(e)},m.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/shake.js.map
