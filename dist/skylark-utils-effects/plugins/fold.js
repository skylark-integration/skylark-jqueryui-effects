/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects"],function(i,e,n){return n.define("fold","hide",function(r,s){function o(i,e,n,r){return function(){var s=new y;return i.animate(e,n,r,function(){s.resolve()}),s.promise}}var t=e(this),c=r.mode,l="show"===c,p="hide"===c,u=r.size||15,a=/([0-9]+)%/.exec(u),h=!!r.horizFirst,f=h?["right","bottom"]:["bottom","right"],d=r.duration/2,g=n.createPlaceholder(t),x=t.cssClip(),m={clip:i.mixin({},x)},v={clip:i.mixin({},x)},k=[x[f[0]],x[f[1]]];a&&(u=parseInt(a[1],10)/100*k[p?0:1]),m.clip[f[0]]=u,v.clip[f[0]]=u,v.clip[f[1]]=0,l&&(t.cssClip(v.clip),g&&g.css(n.clipToBox(v)),v.clip=x);var y=i.Deferred,B=[];g&&(B.push(o(g,n.clipToBox(m),d,r.easing)),B.push(o(g,n.clipToBox(v),d,r.easing))),B.push(o(t,m,d,r.easing)),B.push(o(t,v,d,r.easing)),B.push(s),B.reduce(function(i,e,n,r){return i.then(e)},y.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/fold.js.map
