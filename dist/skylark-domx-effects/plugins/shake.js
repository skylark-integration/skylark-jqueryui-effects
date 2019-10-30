/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects"],function(n,e,t){return t.define("shake",function(s,r){var u=1,a=e(this),f=s.direction||"left",i=s.distance||20,c=s.times||3,o=2*c+1,d=Math.round(s.duration/o),l="up"===f||"down"===f?"top":"left",h="up"===f||"left"===f,p={},g={},k={},v={};t.createPlaceholder(a);var m=n.Deferred;function x(n,e,t,s){return function(){var r=new m;return n.animate(e,t,s,function(){r.resolve()}),r.promise}}for(start=a.position()[l],funcs=[],p[l]=start,g[l]=start+(h?-1:1)*i,k[l]=g[l]+(h?1:-1)*i*2,v[l]=k[l]+(h?-1:1)*i*2,funcs.push(x(a,g,d,s.easing));u<c;u++)funcs.push(x(a,k,d,s.easing)),funcs.push(x(a,v,d,s.easing));funcs.push(x(a,p,d/2,s.easing)),funcs.push(r),funcs.reduce(function(n,e,t,s){return n.then(e)},m.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/shake.js.map
