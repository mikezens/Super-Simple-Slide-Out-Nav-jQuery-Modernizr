/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.11
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 *//*jslint browser:true, node:true*//*global define, Event, Node*//**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */function FastClick(e){"use strict";var t,n=this;this.trackingClick=!1;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=10;this.layer=e;if(!e||!e.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return FastClick.prototype.onClick.apply(n,arguments)};this.onMouse=function(){return FastClick.prototype.onMouse.apply(n,arguments)};this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(n,arguments)};this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(n,arguments)};this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(n,arguments)};this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(n,arguments)};if(FastClick.notNeeded(e))return;if(this.deviceIsAndroid){e.addEventListener("mouseover",this.onMouse,!0);e.addEventListener("mousedown",this.onMouse,!0);e.addEventListener("mouseup",this.onMouse,!0)}e.addEventListener("click",this.onClick,!0);e.addEventListener("touchstart",this.onTouchStart,!1);e.addEventListener("touchmove",this.onTouchMove,!1);e.addEventListener("touchend",this.onTouchEnd,!1);e.addEventListener("touchcancel",this.onTouchCancel,!1);if(!Event.prototype.stopImmediatePropagation){e.removeEventListener=function(t,n,r){var i=Node.prototype.removeEventListener;t==="click"?i.call(e,t,n.hijacked||n,r):i.call(e,t,n,r)};e.addEventListener=function(t,n,r){var i=Node.prototype.addEventListener;t==="click"?i.call(e,t,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(e,t,n,r)}}if(typeof e.onclick=="function"){t=e.onclick;e.addEventListener("click",function(e){t(e)},!1);e.onclick=null}}FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);FastClick.prototype.needsClick=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(this.deviceIsIOS&&e.type==="file"||e.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(e.className)};FastClick.prototype.needsFocus=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!this.deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}};FastClick.prototype.sendClick=function(e,t){"use strict";var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur();r=t.changedTouches[0];n=document.createEvent("MouseEvents");n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null);n.forwardedTouchEvent=!0;e.dispatchEvent(n)};FastClick.prototype.determineEventType=function(e){"use strict";return this.deviceIsAndroid&&e.tagName.toLowerCase()==="select"?"mousedown":"click"};FastClick.prototype.focus=function(e){"use strict";var t;if(this.deviceIsIOS&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"){t=e.value.length;e.setSelectionRange(t,t)}else e.focus()};FastClick.prototype.updateScrollParent=function(e){"use strict";var t,n;t=e.fastClickScrollParent;if(!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n;e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)};FastClick.prototype.getTargetElementFromEventTarget=function(e){"use strict";return e.nodeType===Node.TEXT_NODE?e.parentNode:e};FastClick.prototype.onTouchStart=function(e){"use strict";var t,n,r;if(e.targetTouches.length>1)return!0;t=this.getTargetElementFromEventTarget(e.target);n=e.targetTouches[0];if(this.deviceIsIOS){r=window.getSelection();if(r.rangeCount&&!r.isCollapsed)return!0;if(!this.deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier){e.preventDefault();return!1}this.lastTouchIdentifier=n.identifier;this.updateScrollParent(t)}}this.trackingClick=!0;this.trackingClickStart=e.timeStamp;this.targetElement=t;this.touchStartX=n.pageX;this.touchStartY=n.pageY;e.timeStamp-this.lastClickTime<200&&e.preventDefault();return!0};FastClick.prototype.touchHasMoved=function(e){"use strict";var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1};FastClick.prototype.onTouchMove=function(e){"use strict";if(!this.trackingClick)return!0;if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e)){this.trackingClick=!1;this.targetElement=null}return!0};FastClick.prototype.findControl=function(e){"use strict";return e.control!==undefined?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};FastClick.prototype.onTouchEnd=function(e){"use strict";var t,n,r,i,s,o=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<200){this.cancelNextClick=!0;return!0}this.cancelNextClick=!1;this.lastClickTime=e.timeStamp;n=this.trackingClickStart;this.trackingClick=!1;this.trackingClickStart=0;if(this.deviceIsIOSWithBadTarget){s=e.changedTouches[0];o=document.elementFromPoint(s.pageX-window.pageXOffset,s.pageY-window.pageYOffset)||o;o.fastClickScrollParent=this.targetElement.fastClickScrollParent}r=o.tagName.toLowerCase();if(r==="label"){t=this.findControl(o);if(t){this.focus(o);if(this.deviceIsAndroid)return!1;o=t}}else if(this.needsFocus(o)){if(e.timeStamp-n>100||this.deviceIsIOS&&window.top!==window&&r==="input"){this.targetElement=null;return!1}this.focus(o);if(!this.deviceIsIOS4||r!=="select"){this.targetElement=null;e.preventDefault()}return!1}if(this.deviceIsIOS&&!this.deviceIsIOS4){i=o.fastClickScrollParent;if(i&&i.fastClickLastScrollTop!==i.scrollTop)return!0}if(!this.needsClick(o)){e.preventDefault();this.sendClick(o,e)}return!1};FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1;this.targetElement=null};FastClick.prototype.onMouse=function(e){"use strict";if(!this.targetElement)return!0;if(e.forwardedTouchEvent)return!0;if(!e.cancelable)return!0;if(!this.needsClick(this.targetElement)||this.cancelNextClick){e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0;e.stopPropagation();e.preventDefault();return!1}return!0};FastClick.prototype.onClick=function(e){"use strict";var t;if(this.trackingClick){this.targetElement=null;this.trackingClick=!1;return!0}if(e.target.type==="submit"&&e.detail===0)return!0;t=this.onMouse(e);t||(this.targetElement=null);return t};FastClick.prototype.destroy=function(){"use strict";var e=this.layer;if(this.deviceIsAndroid){e.removeEventListener("mouseover",this.onMouse,!0);e.removeEventListener("mousedown",this.onMouse,!0);e.removeEventListener("mouseup",this.onMouse,!0)}e.removeEventListener("click",this.onClick,!0);e.removeEventListener("touchstart",this.onTouchStart,!1);e.removeEventListener("touchmove",this.onTouchMove,!1);e.removeEventListener("touchend",this.onTouchEnd,!1);e.removeEventListener("touchcancel",this.onTouchCancel,!1)};FastClick.notNeeded=function(e){"use strict";var t,n;if(typeof window.ontouchstart=="undefined")return!0;n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(n){if(!FastClick.prototype.deviceIsAndroid)return!0;t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1)return!0;if(n>31&&window.innerWidth<=window.screen.width)return!0}}return e.style.msTouchAction==="none"?!0:!1};FastClick.attach=function(e){"use strict";return new FastClick(e)};if(typeof define!="undefined"&&define.amd)define(function(){"use strict";return FastClick});else if(typeof module!="undefined"&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else window.FastClick=FastClick;


// LOAD
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);