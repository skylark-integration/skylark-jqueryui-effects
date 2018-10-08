/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects"],function(n,e,t){return t.define("shake",function(s,r){function u(n,e,t,s){return function(){var r=new y;return n.animate(e,t,s,function(){r.resolve()}),r.promise}}var i=1,a=e(this),f=s.direction||"left",c=s.distance||20,o=s.times||3,l=2*o+1,d=Math.round(s.duration/l),h="up"===f||"down"===f?"top":"left",p="up"===f||"left"===f,g={},k={},v={},m={};t.createPlaceholder(a);var y=n.Deferred;for(start=a.position()[h],funcs=[],g[h]=start,k[h]=start+(p?-1:1)*c,v[h]=k[h]+(p?1:-1)*c*2,m[h]=v[h]+(p?-1:1)*c*2,funcs.push(u(a,k,d,s.easing));i<o;i++)funcs.push(u(a,v,d,s.easing)),funcs.push(u(a,m,d,s.easing));funcs.push(u(a,g,d/2,s.easing)),funcs.push(r),funcs.reduce(function(n,e,t,s){return n.then(e)},y.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/shake.js.map
