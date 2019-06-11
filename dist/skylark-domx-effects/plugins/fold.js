/**
 * skylark-domx-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../effects"],function(i,e,n){return n.define("fold","hide",function(r,s){var o=e(this),t=r.mode,c="show"===t,l="hide"===t,p=r.size||15,u=/([0-9]+)%/.exec(p),a=!!r.horizFirst?["right","bottom"]:["bottom","right"],h=r.duration/2,f=n.createPlaceholder(o),d=o.cssClip(),g={clip:i.mixin({},d)},m={clip:i.mixin({},d)},x=[d[a[0]],d[a[1]]];u&&(p=parseInt(u[1],10)/100*x[l?0:1]),g.clip[a[0]]=p,m.clip[a[0]]=p,m.clip[a[1]]=0,c&&(o.cssClip(m.clip),f&&f.css(n.clipToBox(m)),m.clip=d);var v=i.Deferred,k=[];function y(i,e,n,r){return function(){var s=new v;return i.animate(e,n,r,function(){s.resolve()}),s.promise}}f&&(k.push(y(f,n.clipToBox(g),h,r.easing)),k.push(y(f,n.clipToBox(m),h,r.easing))),k.push(y(o,g,h,r.easing)),k.push(y(o,m,h,r.easing)),k.push(s),k.reduce(function(i,e,n,r){return i.then(e)},v.resolve())})});
//# sourceMappingURL=../sourcemaps/plugins/fold.js.map
