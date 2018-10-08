/**
 * skylark-utils-effects - The effect features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","../effects"],function(i,e,t){return t.define("explode","hide",function(i,t){function o(){w.push(this),w.length===c*p&&s()}function s(){r.css({visibility:"visible"}),e(w).remove(),t()}var n,l,a,d,f,h,c=i.pieces?Math.round(Math.sqrt(i.pieces)):3,p=c,r=e(this),u=i.mode,v="show"===u,y=r.show().css("visibility","hidden").offset(),b=Math.ceil(r.outerWidth()/p),g=Math.ceil(r.outerHeight()/c),w=[];for(n=0;n<c;n++)for(d=y.top+n*g,h=n-(c-1)/2,l=0;l<p;l++)a=y.left+l*b,f=l-(p-1)/2,r.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-l*b,top:-n*g}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:b,height:g,left:a+(v?f*b:0),top:d+(v?h*g:0),opacity:v?0:1}).animate({left:a+(v?0:f*b),top:d+(v?0:h*g),opacity:v?1:0},i.duration||500,i.easing,o)})});
//# sourceMappingURL=../sourcemaps/plugins/explode.js.map
