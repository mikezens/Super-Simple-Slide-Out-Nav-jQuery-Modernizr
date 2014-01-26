/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license *//*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */window.matchMedia=window.matchMedia||function(e,t){"use strict";var n,r=e.documentElement,i=r.firstElementChild||r.firstChild,s=e.createElement("body"),o=e.createElement("div");o.id="mq-test-1";o.style.cssText="position:absolute;top:-100em";s.style.background="none";s.appendChild(o);return function(e){o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>';r.insertBefore(s,i);n=o.offsetWidth===42;r.removeChild(s);return{matches:n,media:e}}}(document);(function(e){"use strict";function x(){w(!0)}var t={};e.respond=t;t.update=function(){};t.mediaQueriesSupported=e.matchMedia&&e.matchMedia("only all").matches;if(t.mediaQueriesSupported)return;var n=e.document,r=n.documentElement,i=[],s=[],o=[],u={},a=30,f=n.getElementsByTagName("head")[0]||r,l=n.getElementsByTagName("base")[0],c=f.getElementsByTagName("link"),h=[],p=function(){for(var t=0;t<c.length;t++){var n=c[t],r=n.href,i=n.media,s=n.rel&&n.rel.toLowerCase()==="stylesheet";if(!!r&&s&&!u[r])if(n.styleSheet&&n.styleSheet.rawCssText){v(n.styleSheet.rawCssText,r,i);u[r]=!0}else(!/^([a-zA-Z:]*\/\/)/.test(r)&&!l||r.replace(RegExp.$1,"").split("/")[0]===e.location.host)&&h.push({href:r,media:i})}d()},d=function(){if(h.length){var t=h.shift();E(t.href,function(n){v(n,t.href,t.media);u[t.href]=!0;e.setTimeout(function(){d()},0)})}},v=function(e,t,n){var r=e.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),o=r&&r.length||0;t=t.substring(0,t.lastIndexOf("/"));var u=function(e){return e.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+t+"$2$3")},a=!o&&n;t.length&&(t+="/");a&&(o=1);for(var f=0;f<o;f++){var l,c,h,p;if(a){l=n;s.push(u(e))}else{l=r[f].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;s.push(RegExp.$2&&u(RegExp.$2))}h=l.split(",");p=h.length;for(var d=0;d<p;d++){c=h[d];i.push({media:c.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:s.length-1,hasquery:c.indexOf("(")>-1,minw:c.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:c.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}w()},m,g,y=function(){var e,t=n.createElement("div"),i=n.body,s=r.style.fontSize,o=i&&i.style.fontSize,u=!1;t.style.cssText="position:absolute;font-size:1em;width:1em";if(!i){i=u=n.createElement("body");i.style.background="none"}r.style.fontSize="100%";i.style.fontSize="100%";i.appendChild(t);u&&r.insertBefore(i,r.firstChild);e=t.offsetWidth;u?r.removeChild(i):i.removeChild(t);r.style.fontSize=s;i.style.fontSize=o;e=b=parseFloat(e);return e},b,w=function(t){var u="clientWidth",l=r[u],h=n.compatMode==="CSS1Compat"&&l||n.body[u]||l,p={},d=c[c.length-1],v=(new Date).getTime();if(t&&m&&v-m<a){e.clearTimeout(g);g=e.setTimeout(w,a);return}m=v;for(var E in i)if(i.hasOwnProperty(E)){var S=i[E],x=S.minw,T=S.maxw,N=x===null,C=T===null,k="em";!x||(x=parseFloat(x)*(x.indexOf(k)>-1?b||y():1));!T||(T=parseFloat(T)*(T.indexOf(k)>-1?b||y():1));if(!S.hasquery||(!N||!C)&&(N||h>=x)&&(C||h<=T)){p[S.media]||(p[S.media]=[]);p[S.media].push(s[S.rules])}}for(var L in o)o.hasOwnProperty(L)&&o[L]&&o[L].parentNode===f&&f.removeChild(o[L]);for(var A in p)if(p.hasOwnProperty(A)){var O=n.createElement("style"),M=p[A].join("\n");O.type="text/css";O.media=A;f.insertBefore(O,d.nextSibling);O.styleSheet?O.styleSheet.cssText=M:O.appendChild(n.createTextNode(M));o.push(O)}},E=function(e,t){var n=S();if(!n)return;n.open("GET",e,!0);n.onreadystatechange=function(){if(n.readyState!==4||n.status!==200&&n.status!==304)return;t(n.responseText)};if(n.readyState===4)return;n.send(null)},S=function(){var t=!1;try{t=new e.XMLHttpRequest}catch(n){t=new e.ActiveXObject("Microsoft.XMLHTTP")}return function(){return t}}();p();t.update=p;e.addEventListener?e.addEventListener("resize",x,!1):e.attachEvent&&e.attachEvent("onresize",x)})(this);