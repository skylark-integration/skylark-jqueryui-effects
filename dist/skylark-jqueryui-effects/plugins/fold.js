/**
 * skylark-jqueryui-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../effects"],function(e,i,n){return n.define("fold","hide",function(r,o){var s=i(this),c=r.mode,t="show"===c,l="hide"===c,p=r.size||15,u=/([0-9]+)%/.exec(p),a=!!r.horizFirst?["right","bottom"]:["bottom","right"],h=r.duration/2,f=n.createPlaceholder(s),d=s.cssClip(),x={clip:e.mixin({},d)},g={clip:e.mixin({},d)},m=[d[a[0]],d[a[1]]];u&&(p=parseInt(u[1],10)/100*m[l?0:1]),x.clip[a[0]]=p,g.clip[a[0]]=p,g.clip[a[1]]=0,t&&(s.cssClip(g.clip),f&&f.css(n.clipToBox(g)),g.clip=d);var v=e.Deferred,k=[];function y(e,i,n,r){return function(){var o=new v;return e.animate(i,n,r,function(){o.resolve()}),o.promise}}f&&(k.push(y(f,n.clipToBox(x),h,r.easing)),k.push(y(f,n.clipToBox(g),h,r.easing))),k.push(y(s,x,h,r.easing)),k.push(y(s,g,h,r.easing)),k.push(o),k.reduce(function(e,i,n,r){return e.then(i)},v.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/fold.js.map
