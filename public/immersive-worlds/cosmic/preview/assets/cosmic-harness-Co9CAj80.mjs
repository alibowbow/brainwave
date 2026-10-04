(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function gy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var xh={exports:{}},Go={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var av;function vy(){if(av)return Go;av=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Go.Fragment=t,Go.jsx=i,Go.jsxs=i,Go}var sv;function _y(){return sv||(sv=1,xh.exports=vy()),xh.exports}var vn=_y(),Sh={exports:{}},se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rv;function xy(){if(rv)return se;rv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function x(z){return z===null||typeof z!="object"?null:(z=g&&z[g]||z["@@iterator"],typeof z=="function"?z:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,M={};function S(z,tt,gt){this.props=z,this.context=tt,this.refs=M,this.updater=gt||b}S.prototype.isReactComponent={},S.prototype.setState=function(z,tt){if(typeof z!="object"&&typeof z!="function"&&z!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,z,tt,"setState")},S.prototype.forceUpdate=function(z){this.updater.enqueueForceUpdate(this,z,"forceUpdate")};function U(){}U.prototype=S.prototype;function P(z,tt,gt){this.props=z,this.context=tt,this.refs=M,this.updater=gt||b}var A=P.prototype=new U;A.constructor=P,R(A,S.prototype),A.isPureReactComponent=!0;var N=Array.isArray;function O(){}var C={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function L(z,tt,gt){var Et=gt.ref;return{$$typeof:r,type:z,key:tt,ref:Et!==void 0?Et:null,props:gt}}function F(z,tt){return L(z.type,tt,z.props)}function k(z){return typeof z=="object"&&z!==null&&z.$$typeof===r}function G(z){var tt={"=":"=0",":":"=2"};return"$"+z.replace(/[=:]/g,function(gt){return tt[gt]})}var J=/\/+/g;function X(z,tt){return typeof z=="object"&&z!==null&&z.key!=null?G(""+z.key):tt.toString(36)}function $(z){switch(z.status){case"fulfilled":return z.value;case"rejected":throw z.reason;default:switch(typeof z.status=="string"?z.then(O,O):(z.status="pending",z.then(function(tt){z.status==="pending"&&(z.status="fulfilled",z.value=tt)},function(tt){z.status==="pending"&&(z.status="rejected",z.reason=tt)})),z.status){case"fulfilled":return z.value;case"rejected":throw z.reason}}throw z}function I(z,tt,gt,Et,Lt){var kt=typeof z;(kt==="undefined"||kt==="boolean")&&(z=null);var st=!1;if(z===null)st=!0;else switch(kt){case"bigint":case"string":case"number":st=!0;break;case"object":switch(z.$$typeof){case r:case t:st=!0;break;case v:return st=z._init,I(st(z._payload),tt,gt,Et,Lt)}}if(st)return Lt=Lt(z),st=Et===""?"."+X(z,0):Et,N(Lt)?(gt="",st!=null&&(gt=st.replace(J,"$&/")+"/"),I(Lt,tt,gt,"",function(te){return te})):Lt!=null&&(k(Lt)&&(Lt=F(Lt,gt+(Lt.key==null||z&&z.key===Lt.key?"":(""+Lt.key).replace(J,"$&/")+"/")+st)),tt.push(Lt)),1;st=0;var vt=Et===""?".":Et+":";if(N(z))for(var Tt=0;Tt<z.length;Tt++)Et=z[Tt],kt=vt+X(Et,Tt),st+=I(Et,tt,gt,kt,Lt);else if(Tt=x(z),typeof Tt=="function")for(z=Tt.call(z),Tt=0;!(Et=z.next()).done;)Et=Et.value,kt=vt+X(Et,Tt++),st+=I(Et,tt,gt,kt,Lt);else if(kt==="object"){if(typeof z.then=="function")return I($(z),tt,gt,Et,Lt);throw tt=String(z),Error("Objects are not valid as a React child (found: "+(tt==="[object Object]"?"object with keys {"+Object.keys(z).join(", ")+"}":tt)+"). If you meant to render a collection of children, use an array instead.")}return st}function W(z,tt,gt){if(z==null)return z;var Et=[],Lt=0;return I(z,Et,"","",function(kt){return tt.call(gt,kt,Lt++)}),Et}function ot(z){if(z._status===-1){var tt=z._result;tt=tt(),tt.then(function(gt){(z._status===0||z._status===-1)&&(z._status=1,z._result=gt)},function(gt){(z._status===0||z._status===-1)&&(z._status=2,z._result=gt)}),z._status===-1&&(z._status=0,z._result=tt)}if(z._status===1)return z._result.default;throw z._result}var et=typeof reportError=="function"?reportError:function(z){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var tt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof z=="object"&&z!==null&&typeof z.message=="string"?String(z.message):String(z),error:z});if(!window.dispatchEvent(tt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",z);return}console.error(z)},ft={map:W,forEach:function(z,tt,gt){W(z,function(){tt.apply(this,arguments)},gt)},count:function(z){var tt=0;return W(z,function(){tt++}),tt},toArray:function(z){return W(z,function(tt){return tt})||[]},only:function(z){if(!k(z))throw Error("React.Children.only expected to receive a single React element child.");return z}};return se.Activity=_,se.Children=ft,se.Component=S,se.Fragment=i,se.Profiler=l,se.PureComponent=P,se.StrictMode=s,se.Suspense=m,se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,se.__COMPILER_RUNTIME={__proto__:null,c:function(z){return C.H.useMemoCache(z)}},se.cache=function(z){return function(){return z.apply(null,arguments)}},se.cacheSignal=function(){return null},se.cloneElement=function(z,tt,gt){if(z==null)throw Error("The argument must be a React element, but you passed "+z+".");var Et=R({},z.props),Lt=z.key;if(tt!=null)for(kt in tt.key!==void 0&&(Lt=""+tt.key),tt)!E.call(tt,kt)||kt==="key"||kt==="__self"||kt==="__source"||kt==="ref"&&tt.ref===void 0||(Et[kt]=tt[kt]);var kt=arguments.length-2;if(kt===1)Et.children=gt;else if(1<kt){for(var st=Array(kt),vt=0;vt<kt;vt++)st[vt]=arguments[vt+2];Et.children=st}return L(z.type,Lt,Et)},se.createContext=function(z){return z={$$typeof:f,_currentValue:z,_currentValue2:z,_threadCount:0,Provider:null,Consumer:null},z.Provider=z,z.Consumer={$$typeof:c,_context:z},z},se.createElement=function(z,tt,gt){var Et,Lt={},kt=null;if(tt!=null)for(Et in tt.key!==void 0&&(kt=""+tt.key),tt)E.call(tt,Et)&&Et!=="key"&&Et!=="__self"&&Et!=="__source"&&(Lt[Et]=tt[Et]);var st=arguments.length-2;if(st===1)Lt.children=gt;else if(1<st){for(var vt=Array(st),Tt=0;Tt<st;Tt++)vt[Tt]=arguments[Tt+2];Lt.children=vt}if(z&&z.defaultProps)for(Et in st=z.defaultProps,st)Lt[Et]===void 0&&(Lt[Et]=st[Et]);return L(z,kt,Lt)},se.createRef=function(){return{current:null}},se.forwardRef=function(z){return{$$typeof:p,render:z}},se.isValidElement=k,se.lazy=function(z){return{$$typeof:v,_payload:{_status:-1,_result:z},_init:ot}},se.memo=function(z,tt){return{$$typeof:d,type:z,compare:tt===void 0?null:tt}},se.startTransition=function(z){var tt=C.T,gt={};C.T=gt;try{var Et=z(),Lt=C.S;Lt!==null&&Lt(gt,Et),typeof Et=="object"&&Et!==null&&typeof Et.then=="function"&&Et.then(O,et)}catch(kt){et(kt)}finally{tt!==null&&gt.types!==null&&(tt.types=gt.types),C.T=tt}},se.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},se.use=function(z){return C.H.use(z)},se.useActionState=function(z,tt,gt){return C.H.useActionState(z,tt,gt)},se.useCallback=function(z,tt){return C.H.useCallback(z,tt)},se.useContext=function(z){return C.H.useContext(z)},se.useDebugValue=function(){},se.useDeferredValue=function(z,tt){return C.H.useDeferredValue(z,tt)},se.useEffect=function(z,tt){return C.H.useEffect(z,tt)},se.useEffectEvent=function(z){return C.H.useEffectEvent(z)},se.useId=function(){return C.H.useId()},se.useImperativeHandle=function(z,tt,gt){return C.H.useImperativeHandle(z,tt,gt)},se.useInsertionEffect=function(z,tt){return C.H.useInsertionEffect(z,tt)},se.useLayoutEffect=function(z,tt){return C.H.useLayoutEffect(z,tt)},se.useMemo=function(z,tt){return C.H.useMemo(z,tt)},se.useOptimistic=function(z,tt){return C.H.useOptimistic(z,tt)},se.useReducer=function(z,tt,gt){return C.H.useReducer(z,tt,gt)},se.useRef=function(z){return C.H.useRef(z)},se.useState=function(z){return C.H.useState(z)},se.useSyncExternalStore=function(z,tt,gt){return C.H.useSyncExternalStore(z,tt,gt)},se.useTransition=function(){return C.H.useTransition()},se.version="19.2.7",se}var ov;function Qd(){return ov||(ov=1,Sh.exports=xy()),Sh.exports}var Mn=Qd();const Sy=gy(Mn);var yh={exports:{}},Vo={},Mh={exports:{}},Eh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lv;function yy(){return lv||(lv=1,(function(r){function t(I,W){var ot=I.length;I.push(W);t:for(;0<ot;){var et=ot-1>>>1,ft=I[et];if(0<l(ft,W))I[et]=W,I[ot]=ft,ot=et;else break t}}function i(I){return I.length===0?null:I[0]}function s(I){if(I.length===0)return null;var W=I[0],ot=I.pop();if(ot!==W){I[0]=ot;t:for(var et=0,ft=I.length,z=ft>>>1;et<z;){var tt=2*(et+1)-1,gt=I[tt],Et=tt+1,Lt=I[Et];if(0>l(gt,ot))Et<ft&&0>l(Lt,gt)?(I[et]=Lt,I[Et]=ot,et=Et):(I[et]=gt,I[tt]=ot,et=tt);else if(Et<ft&&0>l(Lt,ot))I[et]=Lt,I[Et]=ot,et=Et;else break t}}return W}function l(I,W){var ot=I.sortIndex-W.sortIndex;return ot!==0?ot:I.id-W.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,p=f.now();r.unstable_now=function(){return f.now()-p}}var m=[],d=[],v=1,_=null,g=3,x=!1,b=!1,R=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,U=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;function A(I){for(var W=i(d);W!==null;){if(W.callback===null)s(d);else if(W.startTime<=I)s(d),W.sortIndex=W.expirationTime,t(m,W);else break;W=i(d)}}function N(I){if(R=!1,A(I),!b)if(i(m)!==null)b=!0,O||(O=!0,G());else{var W=i(d);W!==null&&$(N,W.startTime-I)}}var O=!1,C=-1,E=5,L=-1;function F(){return M?!0:!(r.unstable_now()-L<E)}function k(){if(M=!1,O){var I=r.unstable_now();L=I;var W=!0;try{t:{b=!1,R&&(R=!1,U(C),C=-1),x=!0;var ot=g;try{e:{for(A(I),_=i(m);_!==null&&!(_.expirationTime>I&&F());){var et=_.callback;if(typeof et=="function"){_.callback=null,g=_.priorityLevel;var ft=et(_.expirationTime<=I);if(I=r.unstable_now(),typeof ft=="function"){_.callback=ft,A(I),W=!0;break e}_===i(m)&&s(m),A(I)}else s(m);_=i(m)}if(_!==null)W=!0;else{var z=i(d);z!==null&&$(N,z.startTime-I),W=!1}}break t}finally{_=null,g=ot,x=!1}W=void 0}}finally{W?G():O=!1}}}var G;if(typeof P=="function")G=function(){P(k)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,X=J.port2;J.port1.onmessage=k,G=function(){X.postMessage(null)}}else G=function(){S(k,0)};function $(I,W){C=S(function(){I(r.unstable_now())},W)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(I){I.callback=null},r.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<I?Math.floor(1e3/I):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(I){switch(g){case 1:case 2:case 3:var W=3;break;default:W=g}var ot=g;g=W;try{return I()}finally{g=ot}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(I,W){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var ot=g;g=I;try{return W()}finally{g=ot}},r.unstable_scheduleCallback=function(I,W,ot){var et=r.unstable_now();switch(typeof ot=="object"&&ot!==null?(ot=ot.delay,ot=typeof ot=="number"&&0<ot?et+ot:et):ot=et,I){case 1:var ft=-1;break;case 2:ft=250;break;case 5:ft=1073741823;break;case 4:ft=1e4;break;default:ft=5e3}return ft=ot+ft,I={id:v++,callback:W,priorityLevel:I,startTime:ot,expirationTime:ft,sortIndex:-1},ot>et?(I.sortIndex=ot,t(d,I),i(m)===null&&I===i(d)&&(R?(U(C),C=-1):R=!0,$(N,ot-et))):(I.sortIndex=ft,t(m,I),b||x||(b=!0,O||(O=!0,G()))),I},r.unstable_shouldYield=F,r.unstable_wrapCallback=function(I){var W=g;return function(){var ot=g;g=W;try{return I.apply(this,arguments)}finally{g=ot}}}})(Eh)),Eh}var cv;function My(){return cv||(cv=1,Mh.exports=yy()),Mh.exports}var bh={exports:{}},zn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uv;function Ey(){if(uv)return zn;uv=1;var r=Qd();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)d+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,d,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:d,implementation:v}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,zn.createPortal=function(m,d){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(m,d,null,v)},zn.flushSync=function(m){var d=f.T,v=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=d,s.p=v,s.d.f()}},zn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,s.d.C(m,d))},zn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},zn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var v=d.as,_=p(v,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,x=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;v==="style"?s.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:x}):v==="script"&&s.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:x,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},zn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var v=p(d.as,d.crossOrigin);s.d.M(m,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&s.d.M(m)},zn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var v=d.as,_=p(v,d.crossOrigin);s.d.L(m,v,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},zn.preloadModule=function(m,d){if(typeof m=="string")if(d){var v=p(d.as,d.crossOrigin);s.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else s.d.m(m)},zn.requestFormReset=function(m){s.d.r(m)},zn.unstable_batchedUpdates=function(m,d){return m(d)},zn.useFormState=function(m,d,v){return f.H.useFormState(m,d,v)},zn.useFormStatus=function(){return f.H.useHostTransitionStatus()},zn.version="19.2.7",zn}var fv;function by(){if(fv)return bh.exports;fv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),bh.exports=Ey(),bh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hv;function Ty(){if(hv)return Vo;hv=1;var r=My(),t=Qd(),i=by();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function d(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return m(u),e;if(h===o)return m(u),n;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=h;else{for(var y=!1,D=u.child;D;){if(D===a){y=!0,a=u,o=h;break}if(D===o){y=!0,o=u,a=h;break}D=D.sibling}if(!y){for(D=h.child;D;){if(D===a){y=!0,a=h,o=u;break}if(D===o){y=!0,o=h,a=u;break}D=D.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function v(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=v(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),U=Symbol.for("react.consumer"),P=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),N=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),C=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function G(e){return e===null||typeof e!="object"?null:(e=k&&e[k]||e["@@iterator"],typeof e=="function"?e:null)}var J=Symbol.for("react.client.reference");function X(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===J?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case N:return"Suspense";case O:return"SuspenseList";case L:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case P:return e.displayName||"Context";case U:return(e._context.displayName||"Context")+".Consumer";case A:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case C:return n=e.displayName||null,n!==null?n:X(e.type)||"Memo";case E:n=e._payload,e=e._init;try{return X(e(n))}catch{}}return null}var $=Array.isArray,I=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ot={pending:!1,data:null,method:null,action:null},et=[],ft=-1;function z(e){return{current:e}}function tt(e){0>ft||(e.current=et[ft],et[ft]=null,ft--)}function gt(e,n){ft++,et[ft]=e.current,e.current=n}var Et=z(null),Lt=z(null),kt=z(null),st=z(null);function vt(e,n){switch(gt(kt,n),gt(Lt,e),gt(Et,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?wg(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=wg(n),e=Rg(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}tt(Et),gt(Et,e)}function Tt(){tt(Et),tt(Lt),tt(kt)}function te(e){e.memoizedState!==null&&gt(st,e);var n=Et.current,a=Rg(n,e.type);n!==a&&(gt(Lt,e),gt(Et,a))}function Ft(e){Lt.current===e&&(tt(Et),tt(Lt)),st.current===e&&(tt(st),Bo._currentValue=ot)}var le,en;function ae(e){if(le===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);le=n&&n[1]||"",en=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+le+e+en}var xe=!1;function Ne(e,n){if(!e||xe)return"";xe=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var yt=function(){throw Error()};if(Object.defineProperty(yt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(yt,[])}catch(ht){var ct=ht}Reflect.construct(e,[],yt)}else{try{yt.call()}catch(ht){ct=ht}e.call(yt.prototype)}}else{try{throw Error()}catch(ht){ct=ht}(yt=e())&&typeof yt.catch=="function"&&yt.catch(function(){})}}catch(ht){if(ht&&ct&&typeof ht.stack=="string")return[ht.stack,ct.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),y=h[0],D=h[1];if(y&&D){var V=y.split(`
`),rt=D.split(`
`);for(u=o=0;o<V.length&&!V[o].includes("DetermineComponentFrameRoot");)o++;for(;u<rt.length&&!rt[u].includes("DetermineComponentFrameRoot");)u++;if(o===V.length||u===rt.length)for(o=V.length-1,u=rt.length-1;1<=o&&0<=u&&V[o]!==rt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(V[o]!==rt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||V[o]!==rt[u]){var _t=`
`+V[o].replace(" at new "," at ");return e.displayName&&_t.includes("<anonymous>")&&(_t=_t.replace("<anonymous>",e.displayName)),_t}while(1<=o&&0<=u);break}}}finally{xe=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?ae(a):""}function ge(e,n){switch(e.tag){case 26:case 27:case 5:return ae(e.type);case 16:return ae("Lazy");case 13:return e.child!==n&&n!==null?ae("Suspense Fallback"):ae("Suspense");case 19:return ae("SuspenseList");case 0:case 15:return Ne(e.type,!1);case 11:return Ne(e.type.render,!1);case 1:return Ne(e.type,!0);case 31:return ae("Activity");default:return""}}function Xe(e){try{var n="",a=null;do n+=ge(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var nn=Object.prototype.hasOwnProperty,An=r.unstable_scheduleCallback,We=r.unstable_cancelCallback,an=r.unstable_shouldYield,K=r.unstable_requestPaint,Oe=r.unstable_now,De=r.unstable_getCurrentPriorityLevel,B=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,j=r.unstable_NormalPriority,lt=r.unstable_LowPriority,dt=r.unstable_IdlePriority,bt=r.log,Ct=r.unstable_setDisableYieldValue,pt=null,mt=null;function At(e){if(typeof bt=="function"&&Ct(e),mt&&typeof mt.setStrictMode=="function")try{mt.setStrictMode(pt,e)}catch{}}var Ht=Math.clz32?Math.clz32:Kt,Nt=Math.log,Dt=Math.LN2;function Kt(e){return e>>>=0,e===0?32:31-(Nt(e)/Dt|0)|0}var Jt=256,ie=262144,Z=4194304;function wt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function xt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var D=o&134217727;return D!==0?(o=D&~h,o!==0?u=wt(o):(y&=D,y!==0?u=wt(y):a||(a=D&~e,a!==0&&(u=wt(a))))):(D=o&~h,D!==0?u=wt(D):y!==0?u=wt(y):a||(a=o&~e,a!==0&&(u=wt(a)))),u===0?0:n!==0&&n!==u&&(n&h)===0&&(h=u&-u,a=n&-n,h>=a||h===32&&(a&4194048)!==0)?n:u}function Rt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function zt(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mt(){var e=Z;return Z<<=1,(Z&62914560)===0&&(Z=4194304),e}function Zt(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Xt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,n,a,o,u,h){var y=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var D=e.entanglements,V=e.expirationTimes,rt=e.hiddenUpdates;for(a=y&~a;0<a;){var _t=31-Ht(a),yt=1<<_t;D[_t]=0,V[_t]=-1;var ct=rt[_t];if(ct!==null)for(rt[_t]=null,_t=0;_t<ct.length;_t++){var ht=ct[_t];ht!==null&&(ht.lane&=-536870913)}a&=~yt}o!==0&&be(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(y&~n))}function be(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Ht(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Yn(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-Ht(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function ai(e,n){var a=n&-n;return a=(a&42)!==0?1:Kr(a),(a&(e.suspendedLanes|n))!==0?0:a}function Kr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Qr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Jr(){var e=W.p;return e!==0?e:(e=window.event,e===void 0?32:Jg(e.type))}function ks(e,n){var a=W.p;try{return W.p=e,n()}finally{W.p=a}}var Hi=Math.random().toString(36).slice(2),cn="__reactFiber$"+Hi,Dn="__reactProps$"+Hi,Zn="__reactContainer$"+Hi,hs="__reactEvents$"+Hi,fl="__reactListeners$"+Hi,hl="__reactHandles$"+Hi,ds="__reactResources$"+Hi,Ra="__reactMarker$"+Hi;function Ca(e){delete e[cn],delete e[Dn],delete e[hs],delete e[fl],delete e[hl]}function $i(e){var n=e[cn];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Zn]||a[cn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=Pg(e);e!==null;){if(a=e[cn])return a;e=Pg(e)}return n}e=a,a=e.parentNode}return null}function ta(e){if(e=e[cn]||e[Zn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function ps(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Da(e){var n=e[ds];return n||(n=e[ds]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function un(e){e[Ra]=!0}var dl=new Set,jr={};function w(e,n){q(e,n),q(e+"Capture",n)}function q(e,n){for(jr[e]=n,e=0;e<n.length;e++)dl.add(n[e])}var ut=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nt={},it={};function Ot(e){return nn.call(it,e)?!0:nn.call(nt,e)?!1:ut.test(e)?it[e]=!0:(nt[e]=!0,!1)}function Gt(e,n,a){if(Ot(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ut(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Bt(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function It(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function oe(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function pe(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,h.call(this,y)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Wt(e){if(!e._valueTracker){var n=oe(e)?"checked":"value";e._valueTracker=pe(e,n,""+e[n])}}function Te(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=oe(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Ke(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var qe=/[\n"\\]/g;function fe(e){return e.replace(qe,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function fn(e,n,a,o,u,h,y,D){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),n!=null?y==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+It(n)):e.value!==""+It(n)&&(e.value=""+It(n)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),n!=null?Sn(e,y,It(n)):a!=null?Sn(e,y,It(a)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),D!=null&&typeof D!="function"&&typeof D!="symbol"&&typeof D!="boolean"?e.name=""+It(D):e.removeAttribute("name")}function Vt(e,n,a,o,u,h,y,D){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){Wt(e);return}a=a!=null?""+It(a):"",n=n!=null?""+It(n):a,D||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=D?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Wt(e)}function Sn(e,n,a){n==="number"&&Ke(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function he(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+It(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Vn(e,n,a){if(n!=null&&(n=""+It(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+It(a):""}function si(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if($(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=It(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Wt(e)}function kn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var Ua=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ue(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||Ua.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function je(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Ue(e,u,o)}else for(var h in n)n.hasOwnProperty(h)&&Ue(e,h,n[h])}function vi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var He=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Gi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ci(e){return Gi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function _i(){}var mu=null;function gu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Xs=null,Ws=null;function Ap(e){var n=ta(e);if(n&&(e=n.stateNode)){var a=e[Dn]||null;t:switch(e=n.stateNode,n.type){case"input":if(fn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+fe(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[Dn]||null;if(!u)throw Error(s(90));fn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&Te(o)}break t;case"textarea":Vn(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&he(e,!!a.multiple,n,!1)}}}var vu=!1;function wp(e,n,a){if(vu)return e(n,a);vu=!0;try{var o=e(n);return o}finally{if(vu=!1,(Xs!==null||Ws!==null)&&(tc(),Xs&&(n=Xs,e=Ws,Ws=Xs=null,Ap(n),e)))for(n=0;n<e.length;n++)Ap(e[n])}}function $r(e,n){var a=e.stateNode;if(a===null)return null;var o=a[Dn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_u=!1;if(ea)try{var to={};Object.defineProperty(to,"passive",{get:function(){_u=!0}}),window.addEventListener("test",to,to),window.removeEventListener("test",to,to)}catch{_u=!1}var La=null,xu=null,pl=null;function Rp(){if(pl)return pl;var e,n=xu,a=n.length,o,u="value"in La?La.value:La.textContent,h=u.length;for(e=0;e<a&&n[e]===u[e];e++);var y=a-e;for(o=1;o<=y&&n[a-o]===u[h-o];o++);return pl=u.slice(e,1<o?1-o:void 0)}function ml(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function gl(){return!0}function Cp(){return!1}function Kn(e){function n(a,o,u,h,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var D in e)e.hasOwnProperty(D)&&(a=e[D],this[D]=a?a(h):h[D]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?gl:Cp,this.isPropagationStopped=Cp,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=gl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=gl)},persist:function(){},isPersistent:gl}),n}var ms={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vl=Kn(ms),eo=_({},ms,{view:0,detail:0}),px=Kn(eo),Su,yu,no,_l=_({},eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Eu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==no&&(no&&e.type==="mousemove"?(Su=e.screenX-no.screenX,yu=e.screenY-no.screenY):yu=Su=0,no=e),Su)},movementY:function(e){return"movementY"in e?e.movementY:yu}}),Dp=Kn(_l),mx=_({},_l,{dataTransfer:0}),gx=Kn(mx),vx=_({},eo,{relatedTarget:0}),Mu=Kn(vx),_x=_({},ms,{animationName:0,elapsedTime:0,pseudoElement:0}),xx=Kn(_x),Sx=_({},ms,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yx=Kn(Sx),Mx=_({},ms,{data:0}),Up=Kn(Mx),Ex={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},bx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Tx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ax(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Tx[e])?!!n[e]:!1}function Eu(){return Ax}var wx=_({},eo,{key:function(e){if(e.key){var n=Ex[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=ml(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?bx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Eu,charCode:function(e){return e.type==="keypress"?ml(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ml(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Rx=Kn(wx),Cx=_({},_l,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Lp=Kn(Cx),Dx=_({},eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Eu}),Ux=Kn(Dx),Lx=_({},ms,{propertyName:0,elapsedTime:0,pseudoElement:0}),Nx=Kn(Lx),Ox=_({},_l,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Px=Kn(Ox),zx=_({},ms,{newState:0,oldState:0}),Bx=Kn(zx),Ix=[9,13,27,32],bu=ea&&"CompositionEvent"in window,io=null;ea&&"documentMode"in document&&(io=document.documentMode);var Fx=ea&&"TextEvent"in window&&!io,Np=ea&&(!bu||io&&8<io&&11>=io),Op=" ",Pp=!1;function zp(e,n){switch(e){case"keyup":return Ix.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qs=!1;function Hx(e,n){switch(e){case"compositionend":return Bp(n);case"keypress":return n.which!==32?null:(Pp=!0,Op);case"textInput":return e=n.data,e===Op&&Pp?null:e;default:return null}}function Gx(e,n){if(qs)return e==="compositionend"||!bu&&zp(e,n)?(e=Rp(),pl=xu=La=null,qs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Np&&n.locale!=="ko"?null:n.data;default:return null}}var Vx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ip(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Vx[e.type]:n==="textarea"}function Fp(e,n,a,o){Xs?Ws?Ws.push(o):Ws=[o]:Xs=o,n=oc(n,"onChange"),0<n.length&&(a=new vl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var ao=null,so=null;function kx(e){yg(e,0)}function xl(e){var n=ps(e);if(Te(n))return e}function Hp(e,n){if(e==="change")return n}var Gp=!1;if(ea){var Tu;if(ea){var Au="oninput"in document;if(!Au){var Vp=document.createElement("div");Vp.setAttribute("oninput","return;"),Au=typeof Vp.oninput=="function"}Tu=Au}else Tu=!1;Gp=Tu&&(!document.documentMode||9<document.documentMode)}function kp(){ao&&(ao.detachEvent("onpropertychange",Xp),so=ao=null)}function Xp(e){if(e.propertyName==="value"&&xl(so)){var n=[];Fp(n,so,e,gu(e)),wp(kx,n)}}function Xx(e,n,a){e==="focusin"?(kp(),ao=n,so=a,ao.attachEvent("onpropertychange",Xp)):e==="focusout"&&kp()}function Wx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return xl(so)}function qx(e,n){if(e==="click")return xl(n)}function Yx(e,n){if(e==="input"||e==="change")return xl(n)}function Zx(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ri=typeof Object.is=="function"?Object.is:Zx;function ro(e,n){if(ri(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!nn.call(n,u)||!ri(e[u],n[u]))return!1}return!0}function Wp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function qp(e,n){var a=Wp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Wp(a)}}function Yp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Yp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Zp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ke(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Ke(e.document)}return n}function wu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var Kx=ea&&"documentMode"in document&&11>=document.documentMode,Ys=null,Ru=null,oo=null,Cu=!1;function Kp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Cu||Ys==null||Ys!==Ke(o)||(o=Ys,"selectionStart"in o&&wu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),oo&&ro(oo,o)||(oo=o,o=oc(Ru,"onSelect"),0<o.length&&(n=new vl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Ys)))}function gs(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Zs={animationend:gs("Animation","AnimationEnd"),animationiteration:gs("Animation","AnimationIteration"),animationstart:gs("Animation","AnimationStart"),transitionrun:gs("Transition","TransitionRun"),transitionstart:gs("Transition","TransitionStart"),transitioncancel:gs("Transition","TransitionCancel"),transitionend:gs("Transition","TransitionEnd")},Du={},Qp={};ea&&(Qp=document.createElement("div").style,"AnimationEvent"in window||(delete Zs.animationend.animation,delete Zs.animationiteration.animation,delete Zs.animationstart.animation),"TransitionEvent"in window||delete Zs.transitionend.transition);function vs(e){if(Du[e])return Du[e];if(!Zs[e])return e;var n=Zs[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Qp)return Du[e]=n[a];return e}var Jp=vs("animationend"),jp=vs("animationiteration"),$p=vs("animationstart"),Qx=vs("transitionrun"),Jx=vs("transitionstart"),jx=vs("transitioncancel"),tm=vs("transitionend"),em=new Map,Uu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Uu.push("scrollEnd");function Di(e,n){em.set(e,n),w(n,[e])}var Sl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},xi=[],Ks=0,Lu=0;function yl(){for(var e=Ks,n=Lu=Ks=0;n<e;){var a=xi[n];xi[n++]=null;var o=xi[n];xi[n++]=null;var u=xi[n];xi[n++]=null;var h=xi[n];if(xi[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}h!==0&&nm(a,u,h)}}function Ml(e,n,a,o){xi[Ks++]=e,xi[Ks++]=n,xi[Ks++]=a,xi[Ks++]=o,Lu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Nu(e,n,a,o){return Ml(e,n,a,o),El(e)}function _s(e,n){return Ml(e,null,null,n),El(e)}function nm(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&n!==null&&(u=31-Ht(a),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),h):null}function El(e){if(50<Do)throw Do=0,kf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Qs={};function $x(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function oi(e,n,a,o){return new $x(e,n,a,o)}function Ou(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,n){var a=e.alternate;return a===null?(a=oi(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function im(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function bl(e,n,a,o,u,h){var y=0;if(o=e,typeof e=="function")Ou(e)&&(y=1);else if(typeof e=="string")y=ay(e,a,Et.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case L:return e=oi(31,a,n,u),e.elementType=L,e.lanes=h,e;case R:return xs(a.children,u,h,n);case M:y=8,u|=24;break;case S:return e=oi(12,a,n,u|2),e.elementType=S,e.lanes=h,e;case N:return e=oi(13,a,n,u),e.elementType=N,e.lanes=h,e;case O:return e=oi(19,a,n,u),e.elementType=O,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case P:y=10;break t;case U:y=9;break t;case A:y=11;break t;case C:y=14;break t;case E:y=16,o=null;break t}y=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=oi(y,a,n,u),n.elementType=e,n.type=o,n.lanes=h,n}function xs(e,n,a,o){return e=oi(7,e,o,n),e.lanes=a,e}function Pu(e,n,a){return e=oi(6,e,null,n),e.lanes=a,e}function am(e){var n=oi(18,null,null,0);return n.stateNode=e,n}function zu(e,n,a){return n=oi(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var sm=new WeakMap;function Si(e,n){if(typeof e=="object"&&e!==null){var a=sm.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Xe(n)},sm.set(e,n),n)}return{value:e,source:n,stack:Xe(n)}}var Js=[],js=0,Tl=null,lo=0,yi=[],Mi=0,Na=null,Vi=1,ki="";function ia(e,n){Js[js++]=lo,Js[js++]=Tl,Tl=e,lo=n}function rm(e,n,a){yi[Mi++]=Vi,yi[Mi++]=ki,yi[Mi++]=Na,Na=e;var o=Vi;e=ki;var u=32-Ht(o)-1;o&=~(1<<u),a+=1;var h=32-Ht(n)+u;if(30<h){var y=u-u%5;h=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Vi=1<<32-Ht(n)+u|a<<u|o,ki=h+e}else Vi=1<<h|a<<u|o,ki=e}function Bu(e){e.return!==null&&(ia(e,1),rm(e,1,0))}function Iu(e){for(;e===Tl;)Tl=Js[--js],Js[js]=null,lo=Js[--js],Js[js]=null;for(;e===Na;)Na=yi[--Mi],yi[Mi]=null,ki=yi[--Mi],yi[Mi]=null,Vi=yi[--Mi],yi[Mi]=null}function om(e,n){yi[Mi++]=Vi,yi[Mi++]=ki,yi[Mi++]=Na,Vi=n.id,ki=n.overflow,Na=e}var Un=null,Qe=null,Me=!1,Oa=null,Ei=!1,Fu=Error(s(519));function Pa(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw co(Si(n,e)),Fu}function lm(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[cn]=e,n[Dn]=o,a){case"dialog":_e("cancel",n),_e("close",n);break;case"iframe":case"object":case"embed":_e("load",n);break;case"video":case"audio":for(a=0;a<Lo.length;a++)_e(Lo[a],n);break;case"source":_e("error",n);break;case"img":case"image":case"link":_e("error",n),_e("load",n);break;case"details":_e("toggle",n);break;case"input":_e("invalid",n),Vt(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":_e("invalid",n);break;case"textarea":_e("invalid",n),si(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||Tg(n.textContent,a)?(o.popover!=null&&(_e("beforetoggle",n),_e("toggle",n)),o.onScroll!=null&&_e("scroll",n),o.onScrollEnd!=null&&_e("scrollend",n),o.onClick!=null&&(n.onclick=_i),n=!0):n=!1,n||Pa(e,!0)}function cm(e){for(Un=e.return;Un;)switch(Un.tag){case 5:case 31:case 13:Ei=!1;return;case 27:case 3:Ei=!0;return;default:Un=Un.return}}function $s(e){if(e!==Un)return!1;if(!Me)return cm(e),Me=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||ah(e.type,e.memoizedProps)),a=!a),a&&Qe&&Pa(e),cm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Qe=Og(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Qe=Og(e)}else n===27?(n=Qe,Ka(e.type)?(e=ch,ch=null,Qe=e):Qe=n):Qe=Un?Ti(e.stateNode.nextSibling):null;return!0}function Ss(){Qe=Un=null,Me=!1}function Hu(){var e=Oa;return e!==null&&($n===null?$n=e:$n.push.apply($n,e),Oa=null),e}function co(e){Oa===null?Oa=[e]:Oa.push(e)}var Gu=z(null),ys=null,aa=null;function za(e,n,a){gt(Gu,n._currentValue),n._currentValue=a}function sa(e){e._currentValue=Gu.current,tt(Gu)}function Vu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function ku(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var y=u.child;h=h.firstContext;t:for(;h!==null;){var D=h;h=u;for(var V=0;V<n.length;V++)if(D.context===n[V]){h.lanes|=a,D=h.alternate,D!==null&&(D.lanes|=a),Vu(h.return,a,e),o||(y=null);break t}h=D.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,h=y.alternate,h!==null&&(h.lanes|=a),Vu(y,a,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function tr(e,n,a,o){e=null;for(var u=n,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var D=u.type;ri(u.pendingProps.value,y.value)||(e!==null?e.push(D):e=[D])}}else if(u===st.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Bo):e=[Bo])}u=u.return}e!==null&&ku(n,e,a,o),n.flags|=262144}function Al(e){for(e=e.firstContext;e!==null;){if(!ri(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ms(e){ys=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ln(e){return um(ys,e)}function wl(e,n){return ys===null&&Ms(e),um(e,n)}function um(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},aa===null){if(e===null)throw Error(s(308));aa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else aa=aa.next=n;return a}var tS=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},eS=r.unstable_scheduleCallback,nS=r.unstable_NormalPriority,hn={$$typeof:P,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Xu(){return{controller:new tS,data:new Map,refCount:0}}function uo(e){e.refCount--,e.refCount===0&&eS(nS,function(){e.controller.abort()})}var fo=null,Wu=0,er=0,nr=null;function iS(e,n){if(fo===null){var a=fo=[];Wu=0,er=Kf(),nr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Wu++,n.then(fm,fm),n}function fm(){if(--Wu===0&&fo!==null){nr!==null&&(nr.status="fulfilled");var e=fo;fo=null,er=0,nr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function aS(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var hm=I.S;I.S=function(e,n){K0=Oe(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&iS(e,n),hm!==null&&hm(e,n)};var Es=z(null);function qu(){var e=Es.current;return e!==null?e:Ye.pooledCache}function Rl(e,n){n===null?gt(Es,Es.current):gt(Es,n.pool)}function dm(){var e=qu();return e===null?null:{parent:hn._currentValue,pool:e}}var ir=Error(s(460)),Yu=Error(s(474)),Cl=Error(s(542)),Dl={then:function(){}};function pm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function mm(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(_i,_i),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,vm(e),e;default:if(typeof n.status=="string")n.then(_i,_i);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,vm(e),e}throw Ts=n,ir}}function bs(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ts=a,ir):a}}var Ts=null;function gm(){if(Ts===null)throw Error(s(459));var e=Ts;return Ts=null,e}function vm(e){if(e===ir||e===Cl)throw Error(s(483))}var ar=null,ho=0;function Ul(e){var n=ho;return ho+=1,ar===null&&(ar=[]),mm(ar,e,n)}function po(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Ll(e,n){throw n.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function _m(e){function n(Q,Y){if(e){var at=Q.deletions;at===null?(Q.deletions=[Y],Q.flags|=16):at.push(Y)}}function a(Q,Y){if(!e)return null;for(;Y!==null;)n(Q,Y),Y=Y.sibling;return null}function o(Q){for(var Y=new Map;Q!==null;)Q.key!==null?Y.set(Q.key,Q):Y.set(Q.index,Q),Q=Q.sibling;return Y}function u(Q,Y){return Q=na(Q,Y),Q.index=0,Q.sibling=null,Q}function h(Q,Y,at){return Q.index=at,e?(at=Q.alternate,at!==null?(at=at.index,at<Y?(Q.flags|=67108866,Y):at):(Q.flags|=67108866,Y)):(Q.flags|=1048576,Y)}function y(Q){return e&&Q.alternate===null&&(Q.flags|=67108866),Q}function D(Q,Y,at,St){return Y===null||Y.tag!==6?(Y=Pu(at,Q.mode,St),Y.return=Q,Y):(Y=u(Y,at),Y.return=Q,Y)}function V(Q,Y,at,St){var jt=at.type;return jt===R?_t(Q,Y,at.props.children,St,at.key):Y!==null&&(Y.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===E&&bs(jt)===Y.type)?(Y=u(Y,at.props),po(Y,at),Y.return=Q,Y):(Y=bl(at.type,at.key,at.props,null,Q.mode,St),po(Y,at),Y.return=Q,Y)}function rt(Q,Y,at,St){return Y===null||Y.tag!==4||Y.stateNode.containerInfo!==at.containerInfo||Y.stateNode.implementation!==at.implementation?(Y=zu(at,Q.mode,St),Y.return=Q,Y):(Y=u(Y,at.children||[]),Y.return=Q,Y)}function _t(Q,Y,at,St,jt){return Y===null||Y.tag!==7?(Y=xs(at,Q.mode,St,jt),Y.return=Q,Y):(Y=u(Y,at),Y.return=Q,Y)}function yt(Q,Y,at){if(typeof Y=="string"&&Y!==""||typeof Y=="number"||typeof Y=="bigint")return Y=Pu(""+Y,Q.mode,at),Y.return=Q,Y;if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case x:return at=bl(Y.type,Y.key,Y.props,null,Q.mode,at),po(at,Y),at.return=Q,at;case b:return Y=zu(Y,Q.mode,at),Y.return=Q,Y;case E:return Y=bs(Y),yt(Q,Y,at)}if($(Y)||G(Y))return Y=xs(Y,Q.mode,at,null),Y.return=Q,Y;if(typeof Y.then=="function")return yt(Q,Ul(Y),at);if(Y.$$typeof===P)return yt(Q,wl(Q,Y),at);Ll(Q,Y)}return null}function ct(Q,Y,at,St){var jt=Y!==null?Y.key:null;if(typeof at=="string"&&at!==""||typeof at=="number"||typeof at=="bigint")return jt!==null?null:D(Q,Y,""+at,St);if(typeof at=="object"&&at!==null){switch(at.$$typeof){case x:return at.key===jt?V(Q,Y,at,St):null;case b:return at.key===jt?rt(Q,Y,at,St):null;case E:return at=bs(at),ct(Q,Y,at,St)}if($(at)||G(at))return jt!==null?null:_t(Q,Y,at,St,null);if(typeof at.then=="function")return ct(Q,Y,Ul(at),St);if(at.$$typeof===P)return ct(Q,Y,wl(Q,at),St);Ll(Q,at)}return null}function ht(Q,Y,at,St,jt){if(typeof St=="string"&&St!==""||typeof St=="number"||typeof St=="bigint")return Q=Q.get(at)||null,D(Y,Q,""+St,jt);if(typeof St=="object"&&St!==null){switch(St.$$typeof){case x:return Q=Q.get(St.key===null?at:St.key)||null,V(Y,Q,St,jt);case b:return Q=Q.get(St.key===null?at:St.key)||null,rt(Y,Q,St,jt);case E:return St=bs(St),ht(Q,Y,at,St,jt)}if($(St)||G(St))return Q=Q.get(at)||null,_t(Y,Q,St,jt,null);if(typeof St.then=="function")return ht(Q,Y,at,Ul(St),jt);if(St.$$typeof===P)return ht(Q,Y,at,wl(Y,St),jt);Ll(Y,St)}return null}function qt(Q,Y,at,St){for(var jt=null,Re=null,Yt=Y,ue=Y=0,ye=null;Yt!==null&&ue<at.length;ue++){Yt.index>ue?(ye=Yt,Yt=null):ye=Yt.sibling;var Ce=ct(Q,Yt,at[ue],St);if(Ce===null){Yt===null&&(Yt=ye);break}e&&Yt&&Ce.alternate===null&&n(Q,Yt),Y=h(Ce,Y,ue),Re===null?jt=Ce:Re.sibling=Ce,Re=Ce,Yt=ye}if(ue===at.length)return a(Q,Yt),Me&&ia(Q,ue),jt;if(Yt===null){for(;ue<at.length;ue++)Yt=yt(Q,at[ue],St),Yt!==null&&(Y=h(Yt,Y,ue),Re===null?jt=Yt:Re.sibling=Yt,Re=Yt);return Me&&ia(Q,ue),jt}for(Yt=o(Yt);ue<at.length;ue++)ye=ht(Yt,Q,ue,at[ue],St),ye!==null&&(e&&ye.alternate!==null&&Yt.delete(ye.key===null?ue:ye.key),Y=h(ye,Y,ue),Re===null?jt=ye:Re.sibling=ye,Re=ye);return e&&Yt.forEach(function(ts){return n(Q,ts)}),Me&&ia(Q,ue),jt}function $t(Q,Y,at,St){if(at==null)throw Error(s(151));for(var jt=null,Re=null,Yt=Y,ue=Y=0,ye=null,Ce=at.next();Yt!==null&&!Ce.done;ue++,Ce=at.next()){Yt.index>ue?(ye=Yt,Yt=null):ye=Yt.sibling;var ts=ct(Q,Yt,Ce.value,St);if(ts===null){Yt===null&&(Yt=ye);break}e&&Yt&&ts.alternate===null&&n(Q,Yt),Y=h(ts,Y,ue),Re===null?jt=ts:Re.sibling=ts,Re=ts,Yt=ye}if(Ce.done)return a(Q,Yt),Me&&ia(Q,ue),jt;if(Yt===null){for(;!Ce.done;ue++,Ce=at.next())Ce=yt(Q,Ce.value,St),Ce!==null&&(Y=h(Ce,Y,ue),Re===null?jt=Ce:Re.sibling=Ce,Re=Ce);return Me&&ia(Q,ue),jt}for(Yt=o(Yt);!Ce.done;ue++,Ce=at.next())Ce=ht(Yt,Q,ue,Ce.value,St),Ce!==null&&(e&&Ce.alternate!==null&&Yt.delete(Ce.key===null?ue:Ce.key),Y=h(Ce,Y,ue),Re===null?jt=Ce:Re.sibling=Ce,Re=Ce);return e&&Yt.forEach(function(my){return n(Q,my)}),Me&&ia(Q,ue),jt}function ke(Q,Y,at,St){if(typeof at=="object"&&at!==null&&at.type===R&&at.key===null&&(at=at.props.children),typeof at=="object"&&at!==null){switch(at.$$typeof){case x:t:{for(var jt=at.key;Y!==null;){if(Y.key===jt){if(jt=at.type,jt===R){if(Y.tag===7){a(Q,Y.sibling),St=u(Y,at.props.children),St.return=Q,Q=St;break t}}else if(Y.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===E&&bs(jt)===Y.type){a(Q,Y.sibling),St=u(Y,at.props),po(St,at),St.return=Q,Q=St;break t}a(Q,Y);break}else n(Q,Y);Y=Y.sibling}at.type===R?(St=xs(at.props.children,Q.mode,St,at.key),St.return=Q,Q=St):(St=bl(at.type,at.key,at.props,null,Q.mode,St),po(St,at),St.return=Q,Q=St)}return y(Q);case b:t:{for(jt=at.key;Y!==null;){if(Y.key===jt)if(Y.tag===4&&Y.stateNode.containerInfo===at.containerInfo&&Y.stateNode.implementation===at.implementation){a(Q,Y.sibling),St=u(Y,at.children||[]),St.return=Q,Q=St;break t}else{a(Q,Y);break}else n(Q,Y);Y=Y.sibling}St=zu(at,Q.mode,St),St.return=Q,Q=St}return y(Q);case E:return at=bs(at),ke(Q,Y,at,St)}if($(at))return qt(Q,Y,at,St);if(G(at)){if(jt=G(at),typeof jt!="function")throw Error(s(150));return at=jt.call(at),$t(Q,Y,at,St)}if(typeof at.then=="function")return ke(Q,Y,Ul(at),St);if(at.$$typeof===P)return ke(Q,Y,wl(Q,at),St);Ll(Q,at)}return typeof at=="string"&&at!==""||typeof at=="number"||typeof at=="bigint"?(at=""+at,Y!==null&&Y.tag===6?(a(Q,Y.sibling),St=u(Y,at),St.return=Q,Q=St):(a(Q,Y),St=Pu(at,Q.mode,St),St.return=Q,Q=St),y(Q)):a(Q,Y)}return function(Q,Y,at,St){try{ho=0;var jt=ke(Q,Y,at,St);return ar=null,jt}catch(Yt){if(Yt===ir||Yt===Cl)throw Yt;var Re=oi(29,Yt,null,Q.mode);return Re.lanes=St,Re.return=Q,Re}finally{}}}var As=_m(!0),xm=_m(!1),Ba=!1;function Zu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ku(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ia(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Fa(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=El(e),nm(e,null,a),n}return Ml(e,o,n,a),El(e)}function mo(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Yn(e,a)}}function Qu(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=y:h=h.next=y,a=a.next}while(a!==null);h===null?u=h=n:h=h.next=n}else u=h=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Ju=!1;function go(){if(Ju){var e=nr;if(e!==null)throw e}}function vo(e,n,a,o){Ju=!1;var u=e.updateQueue;Ba=!1;var h=u.firstBaseUpdate,y=u.lastBaseUpdate,D=u.shared.pending;if(D!==null){u.shared.pending=null;var V=D,rt=V.next;V.next=null,y===null?h=rt:y.next=rt,y=V;var _t=e.alternate;_t!==null&&(_t=_t.updateQueue,D=_t.lastBaseUpdate,D!==y&&(D===null?_t.firstBaseUpdate=rt:D.next=rt,_t.lastBaseUpdate=V))}if(h!==null){var yt=u.baseState;y=0,_t=rt=V=null,D=h;do{var ct=D.lane&-536870913,ht=ct!==D.lane;if(ht?(Se&ct)===ct:(o&ct)===ct){ct!==0&&ct===er&&(Ju=!0),_t!==null&&(_t=_t.next={lane:0,tag:D.tag,payload:D.payload,callback:null,next:null});t:{var qt=e,$t=D;ct=n;var ke=a;switch($t.tag){case 1:if(qt=$t.payload,typeof qt=="function"){yt=qt.call(ke,yt,ct);break t}yt=qt;break t;case 3:qt.flags=qt.flags&-65537|128;case 0:if(qt=$t.payload,ct=typeof qt=="function"?qt.call(ke,yt,ct):qt,ct==null)break t;yt=_({},yt,ct);break t;case 2:Ba=!0}}ct=D.callback,ct!==null&&(e.flags|=64,ht&&(e.flags|=8192),ht=u.callbacks,ht===null?u.callbacks=[ct]:ht.push(ct))}else ht={lane:ct,tag:D.tag,payload:D.payload,callback:D.callback,next:null},_t===null?(rt=_t=ht,V=yt):_t=_t.next=ht,y|=ct;if(D=D.next,D===null){if(D=u.shared.pending,D===null)break;ht=D,D=ht.next,ht.next=null,u.lastBaseUpdate=ht,u.shared.pending=null}}while(!0);_t===null&&(V=yt),u.baseState=V,u.firstBaseUpdate=rt,u.lastBaseUpdate=_t,h===null&&(u.shared.lanes=0),Xa|=y,e.lanes=y,e.memoizedState=yt}}function Sm(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function ym(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Sm(a[e],n)}var sr=z(null),Nl=z(0);function Mm(e,n){e=pa,gt(Nl,e),gt(sr,n),pa=e|n.baseLanes}function ju(){gt(Nl,pa),gt(sr,sr.current)}function $u(){pa=Nl.current,tt(sr),tt(Nl)}var li=z(null),bi=null;function Ha(e){var n=e.alternate;gt(on,on.current&1),gt(li,e),bi===null&&(n===null||sr.current!==null||n.memoizedState!==null)&&(bi=e)}function tf(e){gt(on,on.current),gt(li,e),bi===null&&(bi=e)}function Em(e){e.tag===22?(gt(on,on.current),gt(li,e),bi===null&&(bi=e)):Ga()}function Ga(){gt(on,on.current),gt(li,li.current)}function ci(e){tt(li),bi===e&&(bi=null),tt(on)}var on=z(0);function Ol(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||oh(a)||lh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ra=0,ce=null,Ge=null,dn=null,Pl=!1,rr=!1,ws=!1,zl=0,_o=0,or=null,sS=0;function sn(){throw Error(s(321))}function ef(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!ri(e[a],n[a]))return!1;return!0}function nf(e,n,a,o,u,h){return ra=h,ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,I.H=e===null||e.memoizedState===null?r0:_f,ws=!1,h=a(o,u),ws=!1,rr&&(h=Tm(n,a,o,u)),bm(e),h}function bm(e){I.H=yo;var n=Ge!==null&&Ge.next!==null;if(ra=0,dn=Ge=ce=null,Pl=!1,_o=0,or=null,n)throw Error(s(300));e===null||pn||(e=e.dependencies,e!==null&&Al(e)&&(pn=!0))}function Tm(e,n,a,o){ce=e;var u=0;do{if(rr&&(or=null),_o=0,rr=!1,25<=u)throw Error(s(301));if(u+=1,dn=Ge=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}I.H=o0,h=n(a,o)}while(rr);return h}function rS(){var e=I.H,n=e.useState()[0];return n=typeof n.then=="function"?xo(n):n,e=e.useState()[0],(Ge!==null?Ge.memoizedState:null)!==e&&(ce.flags|=1024),n}function af(){var e=zl!==0;return zl=0,e}function sf(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function rf(e){if(Pl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Pl=!1}ra=0,dn=Ge=ce=null,rr=!1,_o=zl=0,or=null}function Xn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dn===null?ce.memoizedState=dn=e:dn=dn.next=e,dn}function ln(){if(Ge===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Ge.next;var n=dn===null?ce.memoizedState:dn.next;if(n!==null)dn=n,Ge=e;else{if(e===null)throw ce.alternate===null?Error(s(467)):Error(s(310));Ge=e,e={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},dn===null?ce.memoizedState=dn=e:dn=dn.next=e}return dn}function Bl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xo(e){var n=_o;return _o+=1,or===null&&(or=[]),e=mm(or,e,n),n=ce,(dn===null?n.memoizedState:dn.next)===null&&(n=n.alternate,I.H=n===null||n.memoizedState===null?r0:_f),e}function Il(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xo(e);if(e.$$typeof===P)return Ln(e)}throw Error(s(438,String(e)))}function of(e){var n=null,a=ce.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ce.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Bl(),ce.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=F;return n.index++,a}function oa(e,n){return typeof n=="function"?n(e):n}function Fl(e){var n=ln();return lf(n,Ge,e)}function lf(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var y=u.next;u.next=h.next,h.next=y}n.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{n=u.next;var D=y=null,V=null,rt=n,_t=!1;do{var yt=rt.lane&-536870913;if(yt!==rt.lane?(Se&yt)===yt:(ra&yt)===yt){var ct=rt.revertLane;if(ct===0)V!==null&&(V=V.next={lane:0,revertLane:0,gesture:null,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null}),yt===er&&(_t=!0);else if((ra&ct)===ct){rt=rt.next,ct===er&&(_t=!0);continue}else yt={lane:0,revertLane:rt.revertLane,gesture:null,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null},V===null?(D=V=yt,y=h):V=V.next=yt,ce.lanes|=ct,Xa|=ct;yt=rt.action,ws&&a(h,yt),h=rt.hasEagerState?rt.eagerState:a(h,yt)}else ct={lane:yt,revertLane:rt.revertLane,gesture:rt.gesture,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null},V===null?(D=V=ct,y=h):V=V.next=ct,ce.lanes|=yt,Xa|=yt;rt=rt.next}while(rt!==null&&rt!==n);if(V===null?y=h:V.next=D,!ri(h,e.memoizedState)&&(pn=!0,_t&&(a=nr,a!==null)))throw a;e.memoizedState=h,e.baseState=y,e.baseQueue=V,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function cf(e){var n=ln(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,h=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do h=e(h,y.action),y=y.next;while(y!==u);ri(h,n.memoizedState)||(pn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),a.lastRenderedState=h}return[h,o]}function Am(e,n,a){var o=ce,u=ln(),h=Me;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!ri((Ge||u).memoizedState,a);if(y&&(u.memoizedState=a,pn=!0),u=u.queue,hf(Cm.bind(null,o,u,e),[e]),u.getSnapshot!==n||y||dn!==null&&dn.memoizedState.tag&1){if(o.flags|=2048,lr(9,{destroy:void 0},Rm.bind(null,o,u,a,n),null),Ye===null)throw Error(s(349));h||(ra&127)!==0||wm(o,n,a)}return a}function wm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ce.updateQueue,n===null?(n=Bl(),ce.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Rm(e,n,a,o){n.value=a,n.getSnapshot=o,Dm(n)&&Um(e)}function Cm(e,n,a){return a(function(){Dm(n)&&Um(e)})}function Dm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!ri(e,a)}catch{return!0}}function Um(e){var n=_s(e,2);n!==null&&ti(n,e,2)}function uf(e){var n=Xn();if(typeof e=="function"){var a=e;if(e=a(),ws){At(!0);try{a()}finally{At(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:e},n}function Lm(e,n,a,o){return e.baseState=a,lf(e,Ge,typeof o=="function"?o:oa)}function oS(e,n,a,o,u){if(Vl(e))throw Error(s(485));if(e=n.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};I.T!==null?a(!0):h.isTransition=!1,o(h),a=n.pending,a===null?(h.next=n.pending=h,Nm(n,h)):(h.next=a.next,n.pending=a.next=h)}}function Nm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var h=I.T,y={};I.T=y;try{var D=a(u,o),V=I.S;V!==null&&V(y,D),Om(e,n,D)}catch(rt){ff(e,n,rt)}finally{h!==null&&y.types!==null&&(h.types=y.types),I.T=h}}else try{h=a(u,o),Om(e,n,h)}catch(rt){ff(e,n,rt)}}function Om(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Pm(e,n,o)},function(o){return ff(e,n,o)}):Pm(e,n,a)}function Pm(e,n,a){n.status="fulfilled",n.value=a,zm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Nm(e,a)))}function ff(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,zm(n),n=n.next;while(n!==o)}e.action=null}function zm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Bm(e,n){return n}function Im(e,n){if(Me){var a=Ye.formState;if(a!==null){t:{var o=ce;if(Me){if(Qe){e:{for(var u=Qe,h=Ei;u.nodeType!==8;){if(!h){u=null;break e}if(u=Ti(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){Qe=Ti(u.nextSibling),o=u.data==="F!";break t}}Pa(o)}o=!1}o&&(n=a[0])}}return a=Xn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bm,lastRenderedState:n},a.queue=o,a=i0.bind(null,ce,o),o.dispatch=a,o=uf(!1),h=vf.bind(null,ce,!1,o.queue),o=Xn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=oS.bind(null,ce,u,h,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function Fm(e){var n=ln();return Hm(n,Ge,e)}function Hm(e,n,a){if(n=lf(e,n,Bm)[0],e=Fl(oa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=xo(n)}catch(y){throw y===ir?Cl:y}else o=n;n=ln();var u=n.queue,h=u.dispatch;return a!==n.memoizedState&&(ce.flags|=2048,lr(9,{destroy:void 0},lS.bind(null,u,a),null)),[o,h,e]}function lS(e,n){e.action=n}function Gm(e){var n=ln(),a=Ge;if(a!==null)return Hm(n,a,e);ln(),n=n.memoizedState,a=ln();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function lr(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ce.updateQueue,n===null&&(n=Bl(),ce.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function Vm(){return ln().memoizedState}function Hl(e,n,a,o){var u=Xn();ce.flags|=e,u.memoizedState=lr(1|n,{destroy:void 0},a,o===void 0?null:o)}function Gl(e,n,a,o){var u=ln();o=o===void 0?null:o;var h=u.memoizedState.inst;Ge!==null&&o!==null&&ef(o,Ge.memoizedState.deps)?u.memoizedState=lr(n,h,a,o):(ce.flags|=e,u.memoizedState=lr(1|n,h,a,o))}function km(e,n){Hl(8390656,8,e,n)}function hf(e,n){Gl(2048,8,e,n)}function cS(e){ce.flags|=4;var n=ce.updateQueue;if(n===null)n=Bl(),ce.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Xm(e){var n=ln().memoizedState;return cS({ref:n,nextImpl:e}),function(){if((Le&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Wm(e,n){return Gl(4,2,e,n)}function qm(e,n){return Gl(4,4,e,n)}function Ym(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Zm(e,n,a){a=a!=null?a.concat([e]):null,Gl(4,4,Ym.bind(null,n,e),a)}function df(){}function Km(e,n){var a=ln();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&ef(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Qm(e,n){var a=ln();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&ef(n,o[1]))return o[0];if(o=e(),ws){At(!0);try{e()}finally{At(!1)}}return a.memoizedState=[o,n],o}function pf(e,n,a){return a===void 0||(ra&1073741824)!==0&&(Se&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=J0(),ce.lanes|=e,Xa|=e,a)}function Jm(e,n,a,o){return ri(a,n)?a:sr.current!==null?(e=pf(e,a,o),ri(e,n)||(pn=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(Se&261930)===0?(pn=!0,e.memoizedState=a):(e=J0(),ce.lanes|=e,Xa|=e,n)}function jm(e,n,a,o,u){var h=W.p;W.p=h!==0&&8>h?h:8;var y=I.T,D={};I.T=D,vf(e,!1,n,a);try{var V=u(),rt=I.S;if(rt!==null&&rt(D,V),V!==null&&typeof V=="object"&&typeof V.then=="function"){var _t=aS(V,o);So(e,n,_t,hi(e))}else So(e,n,o,hi(e))}catch(yt){So(e,n,{then:function(){},status:"rejected",reason:yt},hi())}finally{W.p=h,y!==null&&D.types!==null&&(y.types=D.types),I.T=y}}function uS(){}function mf(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=$m(e).queue;jm(e,u,n,ot,a===null?uS:function(){return t0(e),a(o)})}function $m(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ot,baseState:ot,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:ot},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function t0(e){var n=$m(e);n.next===null&&(n=e.alternate.memoizedState),So(e,n.next.queue,{},hi())}function gf(){return Ln(Bo)}function e0(){return ln().memoizedState}function n0(){return ln().memoizedState}function fS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=hi();e=Ia(a);var o=Fa(n,e,a);o!==null&&(ti(o,n,a),mo(o,n,a)),n={cache:Xu()},e.payload=n;return}n=n.return}}function hS(e,n,a){var o=hi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Vl(e)?a0(n,a):(a=Nu(e,n,a,o),a!==null&&(ti(a,e,o),s0(a,n,o)))}function i0(e,n,a){var o=hi();So(e,n,a,o)}function So(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Vl(e))a0(n,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var y=n.lastRenderedState,D=h(y,a);if(u.hasEagerState=!0,u.eagerState=D,ri(D,y))return Ml(e,n,u,0),Ye===null&&yl(),!1}catch{}finally{}if(a=Nu(e,n,u,o),a!==null)return ti(a,e,o),s0(a,n,o),!0}return!1}function vf(e,n,a,o){if(o={lane:2,revertLane:Kf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Vl(e)){if(n)throw Error(s(479))}else n=Nu(e,a,o,2),n!==null&&ti(n,e,2)}function Vl(e){var n=e.alternate;return e===ce||n!==null&&n===ce}function a0(e,n){rr=Pl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function s0(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Yn(e,a)}}var yo={readContext:Ln,use:Il,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useLayoutEffect:sn,useInsertionEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useSyncExternalStore:sn,useId:sn,useHostTransitionStatus:sn,useFormState:sn,useActionState:sn,useOptimistic:sn,useMemoCache:sn,useCacheRefresh:sn};yo.useEffectEvent=sn;var r0={readContext:Ln,use:Il,useCallback:function(e,n){return Xn().memoizedState=[e,n===void 0?null:n],e},useContext:Ln,useEffect:km,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Hl(4194308,4,Ym.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Hl(4194308,4,e,n)},useInsertionEffect:function(e,n){Hl(4,2,e,n)},useMemo:function(e,n){var a=Xn();n=n===void 0?null:n;var o=e();if(ws){At(!0);try{e()}finally{At(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Xn();if(a!==void 0){var u=a(n);if(ws){At(!0);try{a(n)}finally{At(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=hS.bind(null,ce,e),[o.memoizedState,e]},useRef:function(e){var n=Xn();return e={current:e},n.memoizedState=e},useState:function(e){e=uf(e);var n=e.queue,a=i0.bind(null,ce,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:df,useDeferredValue:function(e,n){var a=Xn();return pf(a,e,n)},useTransition:function(){var e=uf(!1);return e=jm.bind(null,ce,e.queue,!0,!1),Xn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ce,u=Xn();if(Me){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Ye===null)throw Error(s(349));(Se&127)!==0||wm(o,n,a)}u.memoizedState=a;var h={value:a,getSnapshot:n};return u.queue=h,km(Cm.bind(null,o,h,e),[e]),o.flags|=2048,lr(9,{destroy:void 0},Rm.bind(null,o,h,a,n),null),a},useId:function(){var e=Xn(),n=Ye.identifierPrefix;if(Me){var a=ki,o=Vi;a=(o&~(1<<32-Ht(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=zl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=sS++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:gf,useFormState:Im,useActionState:Im,useOptimistic:function(e){var n=Xn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=vf.bind(null,ce,!0,a),a.dispatch=n,[e,n]},useMemoCache:of,useCacheRefresh:function(){return Xn().memoizedState=fS.bind(null,ce)},useEffectEvent:function(e){var n=Xn(),a={impl:e};return n.memoizedState=a,function(){if((Le&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},_f={readContext:Ln,use:Il,useCallback:Km,useContext:Ln,useEffect:hf,useImperativeHandle:Zm,useInsertionEffect:Wm,useLayoutEffect:qm,useMemo:Qm,useReducer:Fl,useRef:Vm,useState:function(){return Fl(oa)},useDebugValue:df,useDeferredValue:function(e,n){var a=ln();return Jm(a,Ge.memoizedState,e,n)},useTransition:function(){var e=Fl(oa)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:xo(e),n]},useSyncExternalStore:Am,useId:e0,useHostTransitionStatus:gf,useFormState:Fm,useActionState:Fm,useOptimistic:function(e,n){var a=ln();return Lm(a,Ge,e,n)},useMemoCache:of,useCacheRefresh:n0};_f.useEffectEvent=Xm;var o0={readContext:Ln,use:Il,useCallback:Km,useContext:Ln,useEffect:hf,useImperativeHandle:Zm,useInsertionEffect:Wm,useLayoutEffect:qm,useMemo:Qm,useReducer:cf,useRef:Vm,useState:function(){return cf(oa)},useDebugValue:df,useDeferredValue:function(e,n){var a=ln();return Ge===null?pf(a,e,n):Jm(a,Ge.memoizedState,e,n)},useTransition:function(){var e=cf(oa)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:xo(e),n]},useSyncExternalStore:Am,useId:e0,useHostTransitionStatus:gf,useFormState:Gm,useActionState:Gm,useOptimistic:function(e,n){var a=ln();return Ge!==null?Lm(a,Ge,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:of,useCacheRefresh:n0};o0.useEffectEvent=Xm;function xf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Sf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=hi(),u=Ia(o);u.payload=n,a!=null&&(u.callback=a),n=Fa(e,u,o),n!==null&&(ti(n,e,o),mo(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=hi(),u=Ia(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Fa(e,u,o),n!==null&&(ti(n,e,o),mo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=hi(),o=Ia(a);o.tag=2,n!=null&&(o.callback=n),n=Fa(e,o,a),n!==null&&(ti(n,e,a),mo(n,e,a))}};function l0(e,n,a,o,u,h,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,y):n.prototype&&n.prototype.isPureReactComponent?!ro(a,o)||!ro(u,h):!0}function c0(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&Sf.enqueueReplaceState(n,n.state,null)}function Rs(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function u0(e){Sl(e)}function f0(e){console.error(e)}function h0(e){Sl(e)}function kl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function d0(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function yf(e,n,a){return a=Ia(a),a.tag=3,a.payload={element:null},a.callback=function(){kl(e,n)},a}function p0(e){return e=Ia(e),e.tag=3,e}function m0(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){d0(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){d0(n,a,o),typeof u!="function"&&(Wa===null?Wa=new Set([this]):Wa.add(this));var D=o.stack;this.componentDidCatch(o.value,{componentStack:D!==null?D:""})})}function dS(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&tr(n,a,u,!0),a=li.current,a!==null){switch(a.tag){case 31:case 13:return bi===null?ec():a.alternate===null&&rn===0&&(rn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Dl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),qf(e,o,u)),!1;case 22:return a.flags|=65536,o===Dl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),qf(e,o,u)),!1}throw Error(s(435,a.tag))}return qf(e,o,u),ec(),!1}if(Me)return n=li.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Fu&&(e=Error(s(422),{cause:o}),co(Si(e,a)))):(o!==Fu&&(n=Error(s(423),{cause:o}),co(Si(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=Si(o,a),u=yf(e.stateNode,o,u),Qu(e,u),rn!==4&&(rn=2)),!1;var h=Error(s(520),{cause:o});if(h=Si(h,a),Co===null?Co=[h]:Co.push(h),rn!==4&&(rn=2),n===null)return!0;o=Si(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=yf(a.stateNode,o,e),Qu(a,e),!1;case 1:if(n=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Wa===null||!Wa.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=p0(u),m0(u,e,a,o),Qu(a,u),!1}a=a.return}while(a!==null);return!1}var Mf=Error(s(461)),pn=!1;function Nn(e,n,a,o){n.child=e===null?xm(n,null,a,o):As(n,e.child,a,o)}function g0(e,n,a,o,u){a=a.render;var h=n.ref;if("ref"in o){var y={};for(var D in o)D!=="ref"&&(y[D]=o[D])}else y=o;return Ms(n),o=nf(e,n,a,y,h,u),D=af(),e!==null&&!pn?(sf(e,n,u),la(e,n,u)):(Me&&D&&Bu(n),n.flags|=1,Nn(e,n,o,u),n.child)}function v0(e,n,a,o,u){if(e===null){var h=a.type;return typeof h=="function"&&!Ou(h)&&h.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=h,_0(e,n,h,o,u)):(e=bl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!Df(e,u)){var y=h.memoizedProps;if(a=a.compare,a=a!==null?a:ro,a(y,o)&&e.ref===n.ref)return la(e,n,u)}return n.flags|=1,e=na(h,o),e.ref=n.ref,e.return=n,n.child=e}function _0(e,n,a,o,u){if(e!==null){var h=e.memoizedProps;if(ro(h,o)&&e.ref===n.ref)if(pn=!1,n.pendingProps=o=h,Df(e,u))(e.flags&131072)!==0&&(pn=!0);else return n.lanes=e.lanes,la(e,n,u)}return Ef(e,n,a,o,u)}function x0(e,n,a,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,n.child=null;return S0(e,n,h,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Rl(n,h!==null?h.cachePool:null),h!==null?Mm(n,h):ju(),Em(n);else return o=n.lanes=536870912,S0(e,n,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(Rl(n,h.cachePool),Mm(n,h),Ga(),n.memoizedState=null):(e!==null&&Rl(n,null),ju(),Ga());return Nn(e,n,u,a),n.child}function Mo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function S0(e,n,a,o,u){var h=qu();return h=h===null?null:{parent:hn._currentValue,pool:h},n.memoizedState={baseLanes:a,cachePool:h},e!==null&&Rl(n,null),ju(),Em(n),e!==null&&tr(e,n,o,!0),n.childLanes=u,null}function Xl(e,n){return n=ql({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function y0(e,n,a){return As(n,e.child,null,a),e=Xl(n,n.pendingProps),e.flags|=2,ci(n),n.memoizedState=null,e}function pS(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Me){if(o.mode==="hidden")return e=Xl(n,o),n.lanes=536870912,Mo(null,e);if(tf(n),(e=Qe)?(e=Ng(e,Ei),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Na!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},a=am(e),a.return=n,n.child=a,Un=n,Qe=null)):e=null,e===null)throw Pa(n);return n.lanes=536870912,null}return Xl(n,o)}var h=e.memoizedState;if(h!==null){var y=h.dehydrated;if(tf(n),u)if(n.flags&256)n.flags&=-257,n=y0(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(pn||tr(e,n,a,!1),u=(a&e.childLanes)!==0,pn||u){if(o=Ye,o!==null&&(y=ai(o,a),y!==0&&y!==h.retryLane))throw h.retryLane=y,_s(e,y),ti(o,e,y),Mf;ec(),n=y0(e,n,a)}else e=h.treeContext,Qe=Ti(y.nextSibling),Un=n,Me=!0,Oa=null,Ei=!1,e!==null&&om(n,e),n=Xl(n,o),n.flags|=4096;return n}return e=na(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Wl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function Ef(e,n,a,o,u){return Ms(n),a=nf(e,n,a,o,void 0,u),o=af(),e!==null&&!pn?(sf(e,n,u),la(e,n,u)):(Me&&o&&Bu(n),n.flags|=1,Nn(e,n,a,u),n.child)}function M0(e,n,a,o,u,h){return Ms(n),n.updateQueue=null,a=Tm(n,o,a,u),bm(e),o=af(),e!==null&&!pn?(sf(e,n,h),la(e,n,h)):(Me&&o&&Bu(n),n.flags|=1,Nn(e,n,a,h),n.child)}function E0(e,n,a,o,u){if(Ms(n),n.stateNode===null){var h=Qs,y=a.contextType;typeof y=="object"&&y!==null&&(h=Ln(y)),h=new a(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Sf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},Zu(n),y=a.contextType,h.context=typeof y=="object"&&y!==null?Ln(y):Qs,h.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(xf(n,a,y,o),h.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&Sf.enqueueReplaceState(h,h.state,null),vo(n,o,h,u),go(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){h=n.stateNode;var D=n.memoizedProps,V=Rs(a,D);h.props=V;var rt=h.context,_t=a.contextType;y=Qs,typeof _t=="object"&&_t!==null&&(y=Ln(_t));var yt=a.getDerivedStateFromProps;_t=typeof yt=="function"||typeof h.getSnapshotBeforeUpdate=="function",D=n.pendingProps!==D,_t||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(D||rt!==y)&&c0(n,h,o,y),Ba=!1;var ct=n.memoizedState;h.state=ct,vo(n,o,h,u),go(),rt=n.memoizedState,D||ct!==rt||Ba?(typeof yt=="function"&&(xf(n,a,yt,o),rt=n.memoizedState),(V=Ba||l0(n,a,V,o,ct,rt,y))?(_t||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=rt),h.props=o,h.state=rt,h.context=y,o=V):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,Ku(e,n),y=n.memoizedProps,_t=Rs(a,y),h.props=_t,yt=n.pendingProps,ct=h.context,rt=a.contextType,V=Qs,typeof rt=="object"&&rt!==null&&(V=Ln(rt)),D=a.getDerivedStateFromProps,(rt=typeof D=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==yt||ct!==V)&&c0(n,h,o,V),Ba=!1,ct=n.memoizedState,h.state=ct,vo(n,o,h,u),go();var ht=n.memoizedState;y!==yt||ct!==ht||Ba||e!==null&&e.dependencies!==null&&Al(e.dependencies)?(typeof D=="function"&&(xf(n,a,D,o),ht=n.memoizedState),(_t=Ba||l0(n,a,_t,o,ct,ht,V)||e!==null&&e.dependencies!==null&&Al(e.dependencies))?(rt||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,ht,V),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,ht,V)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ht),h.props=o,h.state=ht,h.context=V,o=_t):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(n.flags|=1024),o=!1)}return h=o,Wl(e,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&o?(n.child=As(n,e.child,null,u),n.child=As(n,null,a,u)):Nn(e,n,a,u),n.memoizedState=h.state,e=n.child):e=la(e,n,u),e}function b0(e,n,a,o){return Ss(),n.flags|=256,Nn(e,n,a,o),n.child}var bf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Tf(e){return{baseLanes:e,cachePool:dm()}}function Af(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=fi),e}function T0(e,n,a){var o=n.pendingProps,u=!1,h=(n.flags&128)!==0,y;if((y=h)||(y=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,e===null){if(Me){if(u?Ha(n):Ga(),(e=Qe)?(e=Ng(e,Ei),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Na!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},a=am(e),a.return=n,n.child=a,Un=n,Qe=null)):e=null,e===null)throw Pa(n);return lh(e)?n.lanes=32:n.lanes=536870912,null}var D=o.children;return o=o.fallback,u?(Ga(),u=n.mode,D=ql({mode:"hidden",children:D},u),o=xs(o,u,a,null),D.return=n,o.return=n,D.sibling=o,n.child=D,o=n.child,o.memoizedState=Tf(a),o.childLanes=Af(e,y,a),n.memoizedState=bf,Mo(null,o)):(Ha(n),wf(n,D))}var V=e.memoizedState;if(V!==null&&(D=V.dehydrated,D!==null)){if(h)n.flags&256?(Ha(n),n.flags&=-257,n=Rf(e,n,a)):n.memoizedState!==null?(Ga(),n.child=e.child,n.flags|=128,n=null):(Ga(),D=o.fallback,u=n.mode,o=ql({mode:"visible",children:o.children},u),D=xs(D,u,a,null),D.flags|=2,o.return=n,D.return=n,o.sibling=D,n.child=o,As(n,e.child,null,a),o=n.child,o.memoizedState=Tf(a),o.childLanes=Af(e,y,a),n.memoizedState=bf,n=Mo(null,o));else if(Ha(n),lh(D)){if(y=D.nextSibling&&D.nextSibling.dataset,y)var rt=y.dgst;y=rt,o=Error(s(419)),o.stack="",o.digest=y,co({value:o,source:null,stack:null}),n=Rf(e,n,a)}else if(pn||tr(e,n,a,!1),y=(a&e.childLanes)!==0,pn||y){if(y=Ye,y!==null&&(o=ai(y,a),o!==0&&o!==V.retryLane))throw V.retryLane=o,_s(e,o),ti(y,e,o),Mf;oh(D)||ec(),n=Rf(e,n,a)}else oh(D)?(n.flags|=192,n.child=e.child,n=null):(e=V.treeContext,Qe=Ti(D.nextSibling),Un=n,Me=!0,Oa=null,Ei=!1,e!==null&&om(n,e),n=wf(n,o.children),n.flags|=4096);return n}return u?(Ga(),D=o.fallback,u=n.mode,V=e.child,rt=V.sibling,o=na(V,{mode:"hidden",children:o.children}),o.subtreeFlags=V.subtreeFlags&65011712,rt!==null?D=na(rt,D):(D=xs(D,u,a,null),D.flags|=2),D.return=n,o.return=n,o.sibling=D,n.child=o,Mo(null,o),o=n.child,D=e.child.memoizedState,D===null?D=Tf(a):(u=D.cachePool,u!==null?(V=hn._currentValue,u=u.parent!==V?{parent:V,pool:V}:u):u=dm(),D={baseLanes:D.baseLanes|a,cachePool:u}),o.memoizedState=D,o.childLanes=Af(e,y,a),n.memoizedState=bf,Mo(e.child,o)):(Ha(n),a=e.child,e=a.sibling,a=na(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(y=n.deletions,y===null?(n.deletions=[e],n.flags|=16):y.push(e)),n.child=a,n.memoizedState=null,a)}function wf(e,n){return n=ql({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function ql(e,n){return e=oi(22,e,null,n),e.lanes=0,e}function Rf(e,n,a){return As(n,e.child,null,a),e=wf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function A0(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Vu(e.return,n,a)}function Cf(e,n,a,o,u,h){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=h)}function w0(e,n,a){var o=n.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var y=on.current,D=(y&2)!==0;if(D?(y=y&1|2,n.flags|=128):y&=1,gt(on,y),Nn(e,n,o,a),o=Me?lo:0,!D&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&A0(e,a,n);else if(e.tag===19)A0(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Ol(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Cf(n,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Ol(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Cf(n,!0,a,null,h,o);break;case"together":Cf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function la(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Xa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(tr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=na(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=na(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Df(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Al(e)))}function mS(e,n,a){switch(n.tag){case 3:vt(n,n.stateNode.containerInfo),za(n,hn,e.memoizedState.cache),Ss();break;case 27:case 5:te(n);break;case 4:vt(n,n.stateNode.containerInfo);break;case 10:za(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,tf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Ha(n),n.flags|=128,null):(a&n.child.childLanes)!==0?T0(e,n,a):(Ha(n),e=la(e,n,a),e!==null?e.sibling:null);Ha(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(tr(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return w0(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),gt(on,on.current),o)break;return null;case 22:return n.lanes=0,x0(e,n,a,n.pendingProps);case 24:za(n,hn,e.memoizedState.cache)}return la(e,n,a)}function R0(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)pn=!0;else{if(!Df(e,a)&&(n.flags&128)===0)return pn=!1,mS(e,n,a);pn=(e.flags&131072)!==0}else pn=!1,Me&&(n.flags&1048576)!==0&&rm(n,lo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=bs(n.elementType),n.type=e,typeof e=="function")Ou(e)?(o=Rs(e,o),n.tag=1,n=E0(null,n,e,o,a)):(n.tag=0,n=Ef(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===A){n.tag=11,n=g0(null,n,e,o,a);break t}else if(u===C){n.tag=14,n=v0(null,n,e,o,a);break t}}throw n=X(e)||e,Error(s(306,n,""))}}return n;case 0:return Ef(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Rs(o,n.pendingProps),E0(e,n,o,u,a);case 3:t:{if(vt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var h=n.memoizedState;u=h.element,Ku(e,n),vo(n,o,null,a);var y=n.memoizedState;if(o=y.cache,za(n,hn,o),o!==h.cache&&ku(n,[hn],a,!0),go(),o=y.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=b0(e,n,o,a);break t}else if(o!==u){u=Si(Error(s(424)),n),co(u),n=b0(e,n,o,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Qe=Ti(e.firstChild),Un=n,Me=!0,Oa=null,Ei=!0,a=xm(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Ss(),o===u){n=la(e,n,a);break t}Nn(e,n,o,a)}n=n.child}return n;case 26:return Wl(e,n),e===null?(a=Fg(n.type,null,n.pendingProps,null))?n.memoizedState=a:Me||(a=n.type,e=n.pendingProps,o=lc(kt.current).createElement(a),o[cn]=n,o[Dn]=e,On(o,a,e),un(o),n.stateNode=o):n.memoizedState=Fg(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return te(n),e===null&&Me&&(o=n.stateNode=zg(n.type,n.pendingProps,kt.current),Un=n,Ei=!0,u=Qe,Ka(n.type)?(ch=u,Qe=Ti(o.firstChild)):Qe=u),Nn(e,n,n.pendingProps.children,a),Wl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Me&&((u=o=Qe)&&(o=WS(o,n.type,n.pendingProps,Ei),o!==null?(n.stateNode=o,Un=n,Qe=Ti(o.firstChild),Ei=!1,u=!0):u=!1),u||Pa(n)),te(n),u=n.type,h=n.pendingProps,y=e!==null?e.memoizedProps:null,o=h.children,ah(u,h)?o=null:y!==null&&ah(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=nf(e,n,rS,null,null,a),Bo._currentValue=u),Wl(e,n),Nn(e,n,o,a),n.child;case 6:return e===null&&Me&&((e=a=Qe)&&(a=qS(a,n.pendingProps,Ei),a!==null?(n.stateNode=a,Un=n,Qe=null,e=!0):e=!1),e||Pa(n)),null;case 13:return T0(e,n,a);case 4:return vt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=As(n,null,o,a):Nn(e,n,o,a),n.child;case 11:return g0(e,n,n.type,n.pendingProps,a);case 7:return Nn(e,n,n.pendingProps,a),n.child;case 8:return Nn(e,n,n.pendingProps.children,a),n.child;case 12:return Nn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,za(n,n.type,o.value),Nn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Ms(n),u=Ln(u),o=o(u),n.flags|=1,Nn(e,n,o,a),n.child;case 14:return v0(e,n,n.type,n.pendingProps,a);case 15:return _0(e,n,n.type,n.pendingProps,a);case 19:return w0(e,n,a);case 31:return pS(e,n,a);case 22:return x0(e,n,a,n.pendingProps);case 24:return Ms(n),o=Ln(hn),e===null?(u=qu(),u===null&&(u=Ye,h=Xu(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),n.memoizedState={parent:o,cache:u},Zu(n),za(n,hn,u)):((e.lanes&a)!==0&&(Ku(e,n),vo(n,null,null,a),go()),u=e.memoizedState,h=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),za(n,hn,o)):(o=h.cache,za(n,hn,o),o!==u.cache&&ku(n,[hn],a,!0))),Nn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function ca(e){e.flags|=4}function Uf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(eg())e.flags|=8192;else throw Ts=Dl,Yu}else e.flags&=-16777217}function C0(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Xg(n))if(eg())e.flags|=8192;else throw Ts=Dl,Yu}function Yl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Mt():536870912,e.lanes|=n,hr|=n)}function Eo(e,n){if(!Me)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Je(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function gS(e,n,a){var o=n.pendingProps;switch(Iu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Je(n),null;case 1:return Je(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),sa(hn),Tt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&($s(n)?ca(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Hu())),Je(n),null;case 26:var u=n.type,h=n.memoizedState;return e===null?(ca(n),h!==null?(Je(n),C0(n,h)):(Je(n),Uf(n,u,null,o,a))):h?h!==e.memoizedState?(ca(n),Je(n),C0(n,h)):(Je(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&ca(n),Je(n),Uf(n,u,e,o,a)),null;case 27:if(Ft(n),a=kt.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ca(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Je(n),null}e=Et.current,$s(n)?lm(n):(e=zg(u,o,a),n.stateNode=e,ca(n))}return Je(n),null;case 5:if(Ft(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ca(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Je(n),null}if(h=Et.current,$s(n))lm(n);else{var y=lc(kt.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}h[cn]=n,h[Dn]=o;t:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break t;for(;y.sibling===null;){if(y.return===null||y.return===n)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=h;t:switch(On(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ca(n)}}return Je(n),Uf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&ca(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=kt.current,$s(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Un,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[cn]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||Tg(e.nodeValue,a)),e||Pa(n,!0)}else e=lc(e).createTextNode(o),e[cn]=n,n.stateNode=e}return Je(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=$s(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[cn]=n}else Ss(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Je(n),e=!1}else a=Hu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ci(n),n):(ci(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Je(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=$s(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[cn]=n}else Ss(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Je(n),u=!1}else u=Hu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ci(n),n):(ci(n),null)}return ci(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Yl(n,n.updateQueue),Je(n),null);case 4:return Tt(),e===null&&$f(n.stateNode.containerInfo),Je(n),null;case 10:return sa(n.type),Je(n),null;case 19:if(tt(on),o=n.memoizedState,o===null)return Je(n),null;if(u=(n.flags&128)!==0,h=o.rendering,h===null)if(u)Eo(o,!1);else{if(rn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=Ol(e),h!==null){for(n.flags|=128,Eo(o,!1),e=h.updateQueue,n.updateQueue=e,Yl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)im(a,e),a=a.sibling;return gt(on,on.current&1|2),Me&&ia(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&Oe()>jl&&(n.flags|=128,u=!0,Eo(o,!1),n.lanes=4194304)}else{if(!u)if(e=Ol(h),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Yl(n,e),Eo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Me)return Je(n),null}else 2*Oe()-o.renderingStartTime>jl&&a!==536870912&&(n.flags|=128,u=!0,Eo(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(e=o.last,e!==null?e.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Oe(),e.sibling=null,a=on.current,gt(on,u?a&1|2:a&1),Me&&ia(n,o.treeForkCount),e):(Je(n),null);case 22:case 23:return ci(n),$u(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Je(n),n.subtreeFlags&6&&(n.flags|=8192)):Je(n),a=n.updateQueue,a!==null&&Yl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&tt(Es),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),sa(hn),Je(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function vS(e,n){switch(Iu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return sa(hn),Tt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Ft(n),null;case 31:if(n.memoizedState!==null){if(ci(n),n.alternate===null)throw Error(s(340));Ss()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ci(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Ss()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return tt(on),null;case 4:return Tt(),null;case 10:return sa(n.type),null;case 22:case 23:return ci(n),$u(),e!==null&&tt(Es),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return sa(hn),null;case 25:return null;default:return null}}function D0(e,n){switch(Iu(n),n.tag){case 3:sa(hn),Tt();break;case 26:case 27:case 5:Ft(n);break;case 4:Tt();break;case 31:n.memoizedState!==null&&ci(n);break;case 13:ci(n);break;case 19:tt(on);break;case 10:sa(n.type);break;case 22:case 23:ci(n),$u(),e!==null&&tt(Es);break;case 24:sa(hn)}}function bo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var h=a.create,y=a.inst;o=h(),y.destroy=o}a=a.next}while(a!==u)}}catch(D){ze(n,n.return,D)}}function Va(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var y=o.inst,D=y.destroy;if(D!==void 0){y.destroy=void 0,u=n;var V=a,rt=D;try{rt()}catch(_t){ze(u,V,_t)}}}o=o.next}while(o!==h)}}catch(_t){ze(n,n.return,_t)}}function U0(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{ym(n,a)}catch(o){ze(e,e.return,o)}}}function L0(e,n,a){a.props=Rs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){ze(e,n,o)}}function To(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){ze(e,n,u)}}function Xi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){ze(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){ze(e,n,u)}else a.current=null}function N0(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){ze(e,e.return,u)}}function Lf(e,n,a){try{var o=e.stateNode;FS(o,e.type,a,n),o[Dn]=n}catch(u){ze(e,e.return,u)}}function O0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ka(e.type)||e.tag===4}function Nf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||O0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ka(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Of(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=_i));else if(o!==4&&(o===27&&Ka(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(Of(e,n,a),e=e.sibling;e!==null;)Of(e,n,a),e=e.sibling}function Zl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Ka(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Zl(e,n,a),e=e.sibling;e!==null;)Zl(e,n,a),e=e.sibling}function P0(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);On(n,o,a),n[cn]=e,n[Dn]=a}catch(h){ze(e,e.return,h)}}var ua=!1,mn=!1,Pf=!1,z0=typeof WeakSet=="function"?WeakSet:Set,wn=null;function _S(e,n){if(e=e.containerInfo,nh=mc,e=Zp(e),wu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var y=0,D=-1,V=-1,rt=0,_t=0,yt=e,ct=null;e:for(;;){for(var ht;yt!==a||u!==0&&yt.nodeType!==3||(D=y+u),yt!==h||o!==0&&yt.nodeType!==3||(V=y+o),yt.nodeType===3&&(y+=yt.nodeValue.length),(ht=yt.firstChild)!==null;)ct=yt,yt=ht;for(;;){if(yt===e)break e;if(ct===a&&++rt===u&&(D=y),ct===h&&++_t===o&&(V=y),(ht=yt.nextSibling)!==null)break;yt=ct,ct=yt.parentNode}yt=ht}a=D===-1||V===-1?null:{start:D,end:V}}else a=null}a=a||{start:0,end:0}}else a=null;for(ih={focusedElem:e,selectionRange:a},mc=!1,wn=n;wn!==null;)if(n=wn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,wn=e;else for(;wn!==null;){switch(n=wn,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=n,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var qt=Rs(a.type,u);e=o.getSnapshotBeforeUpdate(qt,h),o.__reactInternalSnapshotBeforeUpdate=e}catch($t){ze(a,a.return,$t)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)rh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":rh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,wn=e;break}wn=n.return}}function B0(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ha(e,a),o&4&&bo(5,a);break;case 1:if(ha(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(y){ze(a,a.return,y)}else{var u=Rs(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(y){ze(a,a.return,y)}}o&64&&U0(a),o&512&&To(a,a.return);break;case 3:if(ha(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{ym(e,n)}catch(y){ze(a,a.return,y)}}break;case 27:n===null&&o&4&&P0(a);case 26:case 5:ha(e,a),n===null&&o&4&&N0(a),o&512&&To(a,a.return);break;case 12:ha(e,a);break;case 31:ha(e,a),o&4&&H0(e,a);break;case 13:ha(e,a),o&4&&G0(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=wS.bind(null,a),YS(e,a))));break;case 22:if(o=a.memoizedState!==null||ua,!o){n=n!==null&&n.memoizedState!==null||mn,u=ua;var h=mn;ua=o,(mn=n)&&!h?da(e,a,(a.subtreeFlags&8772)!==0):ha(e,a),ua=u,mn=h}break;case 30:break;default:ha(e,a)}}function I0(e){var n=e.alternate;n!==null&&(e.alternate=null,I0(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Ca(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,Qn=!1;function fa(e,n,a){for(a=a.child;a!==null;)F0(e,n,a),a=a.sibling}function F0(e,n,a){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(pt,a)}catch{}switch(a.tag){case 26:mn||Xi(a,n),fa(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:mn||Xi(a,n);var o=$e,u=Qn;Ka(a.type)&&($e=a.stateNode,Qn=!1),fa(e,n,a),Oo(a.stateNode),$e=o,Qn=u;break;case 5:mn||Xi(a,n);case 6:if(o=$e,u=Qn,$e=null,fa(e,n,a),$e=o,Qn=u,$e!==null)if(Qn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(a.stateNode)}catch(h){ze(a,n,h)}else try{$e.removeChild(a.stateNode)}catch(h){ze(a,n,h)}break;case 18:$e!==null&&(Qn?(e=$e,Ug(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Sr(e)):Ug($e,a.stateNode));break;case 4:o=$e,u=Qn,$e=a.stateNode.containerInfo,Qn=!0,fa(e,n,a),$e=o,Qn=u;break;case 0:case 11:case 14:case 15:Va(2,a,n),mn||Va(4,a,n),fa(e,n,a);break;case 1:mn||(Xi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&L0(a,n,o)),fa(e,n,a);break;case 21:fa(e,n,a);break;case 22:mn=(o=mn)||a.memoizedState!==null,fa(e,n,a),mn=o;break;default:fa(e,n,a)}}function H0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Sr(e)}catch(a){ze(n,n.return,a)}}}function G0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Sr(e)}catch(a){ze(n,n.return,a)}}function xS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new z0),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new z0),n;default:throw Error(s(435,e.tag))}}function Kl(e,n){var a=xS(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=RS.bind(null,e,o);o.then(u,u)}})}function Jn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=e,y=n,D=y;t:for(;D!==null;){switch(D.tag){case 27:if(Ka(D.type)){$e=D.stateNode,Qn=!1;break t}break;case 5:$e=D.stateNode,Qn=!1;break t;case 3:case 4:$e=D.stateNode.containerInfo,Qn=!0;break t}D=D.return}if($e===null)throw Error(s(160));F0(h,y,u),$e=null,Qn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)V0(n,e),n=n.sibling}var Ui=null;function V0(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(n,e),jn(e),o&4&&(Va(3,e,e.return),bo(3,e),Va(5,e,e.return));break;case 1:Jn(n,e),jn(e),o&512&&(mn||a===null||Xi(a,a.return)),o&64&&ua&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ui;if(Jn(n,e),jn(e),o&512&&(mn||a===null||Xi(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[Ra]||h[cn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),On(h,o,a),h[cn]=e,un(h),o=h;break t;case"link":var y=Vg("link","href",u).get(o+(a.href||""));if(y){for(var D=0;D<y.length;D++)if(h=y[D],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(D,1);break e}}h=u.createElement(o),On(h,o,a),u.head.appendChild(h);break;case"meta":if(y=Vg("meta","content",u).get(o+(a.content||""))){for(D=0;D<y.length;D++)if(h=y[D],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(D,1);break e}}h=u.createElement(o),On(h,o,a),u.head.appendChild(h);break;default:throw Error(s(468,o))}h[cn]=e,un(h),o=h}e.stateNode=o}else kg(u,e.type,e.stateNode);else e.stateNode=Gg(u,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?kg(u,e.type,e.stateNode):Gg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Lf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Jn(n,e),jn(e),o&512&&(mn||a===null||Xi(a,a.return)),a!==null&&o&4&&Lf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Jn(n,e),jn(e),o&512&&(mn||a===null||Xi(a,a.return)),e.flags&32){u=e.stateNode;try{kn(u,"")}catch(qt){ze(e,e.return,qt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Lf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Pf=!0);break;case 6:if(Jn(n,e),jn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(qt){ze(e,e.return,qt)}}break;case 3:if(fc=null,u=Ui,Ui=cc(n.containerInfo),Jn(n,e),Ui=u,jn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Sr(n.containerInfo)}catch(qt){ze(e,e.return,qt)}Pf&&(Pf=!1,k0(e));break;case 4:o=Ui,Ui=cc(e.stateNode.containerInfo),Jn(n,e),jn(e),Ui=o;break;case 12:Jn(n,e),jn(e);break;case 31:Jn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 13:Jn(n,e),jn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Jl=Oe()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 22:u=e.memoizedState!==null;var V=a!==null&&a.memoizedState!==null,rt=ua,_t=mn;if(ua=rt||u,mn=_t||V,Jn(n,e),mn=_t,ua=rt,jn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||V||ua||mn||Cs(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){V=a=n;try{if(h=V.stateNode,u)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{D=V.stateNode;var yt=V.memoizedProps.style,ct=yt!=null&&yt.hasOwnProperty("display")?yt.display:null;D.style.display=ct==null||typeof ct=="boolean"?"":(""+ct).trim()}}catch(qt){ze(V,V.return,qt)}}}else if(n.tag===6){if(a===null){V=n;try{V.stateNode.nodeValue=u?"":V.memoizedProps}catch(qt){ze(V,V.return,qt)}}}else if(n.tag===18){if(a===null){V=n;try{var ht=V.stateNode;u?Lg(ht,!0):Lg(V.stateNode,!1)}catch(qt){ze(V,V.return,qt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Kl(e,a))));break;case 19:Jn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 30:break;case 21:break;default:Jn(n,e),jn(e)}}function jn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(O0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,h=Nf(e);Zl(e,h,u);break;case 5:var y=a.stateNode;a.flags&32&&(kn(y,""),a.flags&=-33);var D=Nf(e);Zl(e,D,y);break;case 3:case 4:var V=a.stateNode.containerInfo,rt=Nf(e);Of(e,rt,V);break;default:throw Error(s(161))}}catch(_t){ze(e,e.return,_t)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function k0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;k0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ha(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)B0(e,n.alternate,n),n=n.sibling}function Cs(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Va(4,n,n.return),Cs(n);break;case 1:Xi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&L0(n,n.return,a),Cs(n);break;case 27:Oo(n.stateNode);case 26:case 5:Xi(n,n.return),Cs(n);break;case 22:n.memoizedState===null&&Cs(n);break;case 30:Cs(n);break;default:Cs(n)}e=e.sibling}}function da(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,h=n,y=h.flags;switch(h.tag){case 0:case 11:case 15:da(u,h,a),bo(4,h);break;case 1:if(da(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(rt){ze(o,o.return,rt)}if(o=h,u=o.updateQueue,u!==null){var D=o.stateNode;try{var V=u.shared.hiddenCallbacks;if(V!==null)for(u.shared.hiddenCallbacks=null,u=0;u<V.length;u++)Sm(V[u],D)}catch(rt){ze(o,o.return,rt)}}a&&y&64&&U0(h),To(h,h.return);break;case 27:P0(h);case 26:case 5:da(u,h,a),a&&o===null&&y&4&&N0(h),To(h,h.return);break;case 12:da(u,h,a);break;case 31:da(u,h,a),a&&y&4&&H0(u,h);break;case 13:da(u,h,a),a&&y&4&&G0(u,h);break;case 22:h.memoizedState===null&&da(u,h,a),To(h,h.return);break;case 30:break;default:da(u,h,a)}n=n.sibling}}function zf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&uo(a))}function Bf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&uo(e))}function Li(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)X0(e,n,a,o),n=n.sibling}function X0(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Li(e,n,a,o),u&2048&&bo(9,n);break;case 1:Li(e,n,a,o);break;case 3:Li(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&uo(e)));break;case 12:if(u&2048){Li(e,n,a,o),e=n.stateNode;try{var h=n.memoizedProps,y=h.id,D=h.onPostCommit;typeof D=="function"&&D(y,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(V){ze(n,n.return,V)}}else Li(e,n,a,o);break;case 31:Li(e,n,a,o);break;case 13:Li(e,n,a,o);break;case 23:break;case 22:h=n.stateNode,y=n.alternate,n.memoizedState!==null?h._visibility&2?Li(e,n,a,o):Ao(e,n):h._visibility&2?Li(e,n,a,o):(h._visibility|=2,cr(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&zf(y,n);break;case 24:Li(e,n,a,o),u&2048&&Bf(n.alternate,n);break;default:Li(e,n,a,o)}}function cr(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,y=n,D=a,V=o,rt=y.flags;switch(y.tag){case 0:case 11:case 15:cr(h,y,D,V,u),bo(8,y);break;case 23:break;case 22:var _t=y.stateNode;y.memoizedState!==null?_t._visibility&2?cr(h,y,D,V,u):Ao(h,y):(_t._visibility|=2,cr(h,y,D,V,u)),u&&rt&2048&&zf(y.alternate,y);break;case 24:cr(h,y,D,V,u),u&&rt&2048&&Bf(y.alternate,y);break;default:cr(h,y,D,V,u)}n=n.sibling}}function Ao(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:Ao(a,o),u&2048&&zf(o.alternate,o);break;case 24:Ao(a,o),u&2048&&Bf(o.alternate,o);break;default:Ao(a,o)}n=n.sibling}}var wo=8192;function ur(e,n,a){if(e.subtreeFlags&wo)for(e=e.child;e!==null;)W0(e,n,a),e=e.sibling}function W0(e,n,a){switch(e.tag){case 26:ur(e,n,a),e.flags&wo&&e.memoizedState!==null&&sy(a,Ui,e.memoizedState,e.memoizedProps);break;case 5:ur(e,n,a);break;case 3:case 4:var o=Ui;Ui=cc(e.stateNode.containerInfo),ur(e,n,a),Ui=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=wo,wo=16777216,ur(e,n,a),wo=o):ur(e,n,a));break;default:ur(e,n,a)}}function q0(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Ro(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];wn=o,Z0(o,e)}q0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Y0(e),e=e.sibling}function Y0(e){switch(e.tag){case 0:case 11:case 15:Ro(e),e.flags&2048&&Va(9,e,e.return);break;case 3:Ro(e);break;case 12:Ro(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Ql(e)):Ro(e);break;default:Ro(e)}}function Ql(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];wn=o,Z0(o,e)}q0(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Va(8,n,n.return),Ql(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Ql(n));break;default:Ql(n)}e=e.sibling}}function Z0(e,n){for(;wn!==null;){var a=wn;switch(a.tag){case 0:case 11:case 15:Va(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:uo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,wn=o;else t:for(a=e;wn!==null;){o=wn;var u=o.sibling,h=o.return;if(I0(o),o===a){wn=null;break t}if(u!==null){u.return=h,wn=u;break t}wn=h}}}var SS={getCacheForType:function(e){var n=Ln(hn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Ln(hn).controller.signal}},yS=typeof WeakMap=="function"?WeakMap:Map,Le=0,Ye=null,ve=null,Se=0,Pe=0,ui=null,ka=!1,fr=!1,If=!1,pa=0,rn=0,Xa=0,Ds=0,Ff=0,fi=0,hr=0,Co=null,$n=null,Hf=!1,Jl=0,K0=0,jl=1/0,$l=null,Wa=null,yn=0,qa=null,dr=null,ma=0,Gf=0,Vf=null,Q0=null,Do=0,kf=null;function hi(){return(Le&2)!==0&&Se!==0?Se&-Se:I.T!==null?Kf():Jr()}function J0(){if(fi===0)if((Se&536870912)===0||Me){var e=ie;ie<<=1,(ie&3932160)===0&&(ie=262144),fi=e}else fi=536870912;return e=li.current,e!==null&&(e.flags|=32),fi}function ti(e,n,a){(e===Ye&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)&&(pr(e,0),Ya(e,Se,fi,!1)),Xt(e,a),((Le&2)===0||e!==Ye)&&(e===Ye&&((Le&2)===0&&(Ds|=a),rn===4&&Ya(e,Se,fi,!1)),Wi(e))}function j0(e,n,a){if((Le&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Rt(e,n),u=o?bS(e,n):Wf(e,n,!0),h=o;do{if(u===0){fr&&!o&&Ya(e,n,0,!1);break}else{if(a=e.current.alternate,h&&!MS(a)){u=Wf(e,n,!1),h=!1;continue}if(u===2){if(h=n,e.errorRecoveryDisabledLanes&h)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;t:{var D=e;u=Co;var V=D.current.memoizedState.isDehydrated;if(V&&(pr(D,y).flags|=256),y=Wf(D,y,!1),y!==2){if(If&&!V){D.errorRecoveryDisabledLanes|=h,Ds|=h,u=4;break t}h=$n,$n=u,h!==null&&($n===null?$n=h:$n.push.apply($n,h))}u=y}if(h=!1,u!==2)continue}}if(u===1){pr(e,0),Ya(e,n,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ya(o,n,fi,!ka);break t;case 2:$n=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Jl+300-Oe(),10<u)){if(Ya(o,n,fi,!ka),xt(o,0,!0)!==0)break t;ma=n,o.timeoutHandle=Cg($0.bind(null,o,a,$n,$l,Hf,n,fi,Ds,hr,ka,h,"Throttled",-0,0),u);break t}$0(o,a,$n,$l,Hf,n,fi,Ds,hr,ka,h,null,-0,0)}}break}while(!0);Wi(e)}function $0(e,n,a,o,u,h,y,D,V,rt,_t,yt,ct,ht){if(e.timeoutHandle=-1,yt=n.subtreeFlags,yt&8192||(yt&16785408)===16785408){yt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:_i},W0(n,h,yt);var qt=(h&62914560)===h?Jl-Oe():(h&4194048)===h?K0-Oe():0;if(qt=ry(yt,qt),qt!==null){ma=h,e.cancelPendingCommit=qt(og.bind(null,e,n,h,a,o,u,y,D,V,_t,yt,null,ct,ht)),Ya(e,h,y,!rt);return}}og(e,n,h,a,o,u,y,D,V)}function MS(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!ri(h(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ya(e,n,a,o){n&=~Ff,n&=~Ds,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var h=31-Ht(u),y=1<<h;o[h]=-1,u&=~y}a!==0&&be(e,a,n)}function tc(){return(Le&6)===0?(Uo(0),!1):!0}function Xf(){if(ve!==null){if(Pe===0)var e=ve.return;else e=ve,aa=ys=null,rf(e),ar=null,ho=0,e=ve;for(;e!==null;)D0(e.alternate,e),e=e.return;ve=null}}function pr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,VS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ma=0,Xf(),Ye=e,ve=a=na(e.current,null),Se=n,Pe=0,ui=null,ka=!1,fr=Rt(e,n),If=!1,hr=fi=Ff=Ds=Xa=rn=0,$n=Co=null,Hf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Ht(o),h=1<<u;n|=e[u],o&=~h}return pa=n,yl(),a}function tg(e,n){ce=null,I.H=yo,n===ir||n===Cl?(n=gm(),Pe=3):n===Yu?(n=gm(),Pe=4):Pe=n===Mf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ui=n,ve===null&&(rn=1,kl(e,Si(n,e.current)))}function eg(){var e=li.current;return e===null?!0:(Se&4194048)===Se?bi===null:(Se&62914560)===Se||(Se&536870912)!==0?e===bi:!1}function ng(){var e=I.H;return I.H=yo,e===null?yo:e}function ig(){var e=I.A;return I.A=SS,e}function ec(){rn=4,ka||(Se&4194048)!==Se&&li.current!==null||(fr=!0),(Xa&134217727)===0&&(Ds&134217727)===0||Ye===null||Ya(Ye,Se,fi,!1)}function Wf(e,n,a){var o=Le;Le|=2;var u=ng(),h=ig();(Ye!==e||Se!==n)&&($l=null,pr(e,n)),n=!1;var y=rn;t:do try{if(Pe!==0&&ve!==null){var D=ve,V=ui;switch(Pe){case 8:Xf(),y=6;break t;case 3:case 2:case 9:case 6:li.current===null&&(n=!0);var rt=Pe;if(Pe=0,ui=null,mr(e,D,V,rt),a&&fr){y=0;break t}break;default:rt=Pe,Pe=0,ui=null,mr(e,D,V,rt)}}ES(),y=rn;break}catch(_t){tg(e,_t)}while(!0);return n&&e.shellSuspendCounter++,aa=ys=null,Le=o,I.H=u,I.A=h,ve===null&&(Ye=null,Se=0,yl()),y}function ES(){for(;ve!==null;)ag(ve)}function bS(e,n){var a=Le;Le|=2;var o=ng(),u=ig();Ye!==e||Se!==n?($l=null,jl=Oe()+500,pr(e,n)):fr=Rt(e,n);t:do try{if(Pe!==0&&ve!==null){n=ve;var h=ui;e:switch(Pe){case 1:Pe=0,ui=null,mr(e,n,h,1);break;case 2:case 9:if(pm(h)){Pe=0,ui=null,sg(n);break}n=function(){Pe!==2&&Pe!==9||Ye!==e||(Pe=7),Wi(e)},h.then(n,n);break t;case 3:Pe=7;break t;case 4:Pe=5;break t;case 7:pm(h)?(Pe=0,ui=null,sg(n)):(Pe=0,ui=null,mr(e,n,h,7));break;case 5:var y=null;switch(ve.tag){case 26:y=ve.memoizedState;case 5:case 27:var D=ve;if(y?Xg(y):D.stateNode.complete){Pe=0,ui=null;var V=D.sibling;if(V!==null)ve=V;else{var rt=D.return;rt!==null?(ve=rt,nc(rt)):ve=null}break e}}Pe=0,ui=null,mr(e,n,h,5);break;case 6:Pe=0,ui=null,mr(e,n,h,6);break;case 8:Xf(),rn=6;break t;default:throw Error(s(462))}}TS();break}catch(_t){tg(e,_t)}while(!0);return aa=ys=null,I.H=o,I.A=u,Le=a,ve!==null?0:(Ye=null,Se=0,yl(),rn)}function TS(){for(;ve!==null&&!an();)ag(ve)}function ag(e){var n=R0(e.alternate,e,pa);e.memoizedProps=e.pendingProps,n===null?nc(e):ve=n}function sg(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=M0(a,n,n.pendingProps,n.type,void 0,Se);break;case 11:n=M0(a,n,n.pendingProps,n.type.render,n.ref,Se);break;case 5:rf(n);default:D0(a,n),n=ve=im(n,pa),n=R0(a,n,pa)}e.memoizedProps=e.pendingProps,n===null?nc(e):ve=n}function mr(e,n,a,o){aa=ys=null,rf(n),ar=null,ho=0;var u=n.return;try{if(dS(e,u,n,a,Se)){rn=1,kl(e,Si(a,e.current)),ve=null;return}}catch(h){if(u!==null)throw ve=u,h;rn=1,kl(e,Si(a,e.current)),ve=null;return}n.flags&32768?(Me||o===1?e=!0:fr||(Se&536870912)!==0?e=!1:(ka=e=!0,(o===2||o===9||o===3||o===6)&&(o=li.current,o!==null&&o.tag===13&&(o.flags|=16384))),rg(n,e)):nc(n)}function nc(e){var n=e;do{if((n.flags&32768)!==0){rg(n,ka);return}e=n.return;var a=gS(n.alternate,n,pa);if(a!==null){ve=a;return}if(n=n.sibling,n!==null){ve=n;return}ve=n=e}while(n!==null);rn===0&&(rn=5)}function rg(e,n){do{var a=vS(e.alternate,e);if(a!==null){a.flags&=32767,ve=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){ve=e;return}ve=e=a}while(e!==null);rn=6,ve=null}function og(e,n,a,o,u,h,y,D,V){e.cancelPendingCommit=null;do ic();while(yn!==0);if((Le&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(h=n.lanes|n.childLanes,h|=Lu,Fe(e,a,h,y,D,V),e===Ye&&(ve=Ye=null,Se=0),dr=n,qa=e,ma=a,Gf=h,Vf=u,Q0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,CS(j,function(){return hg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=I.T,I.T=null,u=W.p,W.p=2,y=Le,Le|=4;try{_S(e,n,a)}finally{Le=y,W.p=u,I.T=o}}yn=1,lg(),cg(),ug()}}function lg(){if(yn===1){yn=0;var e=qa,n=dr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=I.T,I.T=null;var o=W.p;W.p=2;var u=Le;Le|=4;try{V0(n,e);var h=ih,y=Zp(e.containerInfo),D=h.focusedElem,V=h.selectionRange;if(y!==D&&D&&D.ownerDocument&&Yp(D.ownerDocument.documentElement,D)){if(V!==null&&wu(D)){var rt=V.start,_t=V.end;if(_t===void 0&&(_t=rt),"selectionStart"in D)D.selectionStart=rt,D.selectionEnd=Math.min(_t,D.value.length);else{var yt=D.ownerDocument||document,ct=yt&&yt.defaultView||window;if(ct.getSelection){var ht=ct.getSelection(),qt=D.textContent.length,$t=Math.min(V.start,qt),ke=V.end===void 0?$t:Math.min(V.end,qt);!ht.extend&&$t>ke&&(y=ke,ke=$t,$t=y);var Q=qp(D,$t),Y=qp(D,ke);if(Q&&Y&&(ht.rangeCount!==1||ht.anchorNode!==Q.node||ht.anchorOffset!==Q.offset||ht.focusNode!==Y.node||ht.focusOffset!==Y.offset)){var at=yt.createRange();at.setStart(Q.node,Q.offset),ht.removeAllRanges(),$t>ke?(ht.addRange(at),ht.extend(Y.node,Y.offset)):(at.setEnd(Y.node,Y.offset),ht.addRange(at))}}}}for(yt=[],ht=D;ht=ht.parentNode;)ht.nodeType===1&&yt.push({element:ht,left:ht.scrollLeft,top:ht.scrollTop});for(typeof D.focus=="function"&&D.focus(),D=0;D<yt.length;D++){var St=yt[D];St.element.scrollLeft=St.left,St.element.scrollTop=St.top}}mc=!!nh,ih=nh=null}finally{Le=u,W.p=o,I.T=a}}e.current=n,yn=2}}function cg(){if(yn===2){yn=0;var e=qa,n=dr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=I.T,I.T=null;var o=W.p;W.p=2;var u=Le;Le|=4;try{B0(e,n.alternate,n)}finally{Le=u,W.p=o,I.T=a}}yn=3}}function ug(){if(yn===4||yn===3){yn=0,K();var e=qa,n=dr,a=ma,o=Q0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?yn=5:(yn=0,dr=qa=null,fg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Wa=null),Qr(a),n=n.stateNode,mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(pt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=I.T,u=W.p,W.p=2,I.T=null;try{for(var h=e.onRecoverableError,y=0;y<o.length;y++){var D=o[y];h(D.value,{componentStack:D.stack})}}finally{I.T=n,W.p=u}}(ma&3)!==0&&ic(),Wi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===kf?Do++:(Do=0,kf=e):Do=0,Uo(0)}}function fg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,uo(n)))}function ic(){return lg(),cg(),ug(),hg()}function hg(){if(yn!==5)return!1;var e=qa,n=Gf;Gf=0;var a=Qr(ma),o=I.T,u=W.p;try{W.p=32>a?32:a,I.T=null,a=Vf,Vf=null;var h=qa,y=ma;if(yn=0,dr=qa=null,ma=0,(Le&6)!==0)throw Error(s(331));var D=Le;if(Le|=4,Y0(h.current),X0(h,h.current,y,a),Le=D,Uo(0,!1),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(pt,h)}catch{}return!0}finally{W.p=u,I.T=o,fg(e,n)}}function dg(e,n,a){n=Si(a,n),n=yf(e.stateNode,n,2),e=Fa(e,n,2),e!==null&&(Xt(e,2),Wi(e))}function ze(e,n,a){if(e.tag===3)dg(e,e,a);else for(;n!==null;){if(n.tag===3){dg(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Wa===null||!Wa.has(o))){e=Si(a,e),a=p0(2),o=Fa(n,a,2),o!==null&&(m0(a,o,n,e),Xt(o,2),Wi(o));break}}n=n.return}}function qf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new yS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(If=!0,u.add(a),e=AS.bind(null,e,n,a),n.then(e,e))}function AS(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ye===e&&(Se&a)===a&&(rn===4||rn===3&&(Se&62914560)===Se&&300>Oe()-Jl?(Le&2)===0&&pr(e,0):Ff|=a,hr===Se&&(hr=0)),Wi(e)}function pg(e,n){n===0&&(n=Mt()),e=_s(e,n),e!==null&&(Xt(e,n),Wi(e))}function wS(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),pg(e,a)}function RS(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),pg(e,a)}function CS(e,n){return An(e,n)}var ac=null,gr=null,Yf=!1,sc=!1,Zf=!1,Za=0;function Wi(e){e!==gr&&e.next===null&&(gr===null?ac=gr=e:gr=gr.next=e),sc=!0,Yf||(Yf=!0,US())}function Uo(e,n){if(!Zf&&sc){Zf=!0;do for(var a=!1,o=ac;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var y=o.suspendedLanes,D=o.pingedLanes;h=(1<<31-Ht(42|e)+1)-1,h&=u&~(y&~D),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,_g(o,h))}else h=Se,h=xt(o,o===Ye?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||Rt(o,h)||(a=!0,_g(o,h));o=o.next}while(a);Zf=!1}}function DS(){mg()}function mg(){sc=Yf=!1;var e=0;Za!==0&&GS()&&(e=Za);for(var n=Oe(),a=null,o=ac;o!==null;){var u=o.next,h=gg(o,n);h===0?(o.next=null,a===null?ac=u:a.next=u,u===null&&(gr=a)):(a=o,(e!==0||(h&3)!==0)&&(sc=!0)),o=u}yn!==0&&yn!==5||Uo(e),Za!==0&&(Za=0)}function gg(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var y=31-Ht(h),D=1<<y,V=u[y];V===-1?((D&a)===0||(D&o)!==0)&&(u[y]=zt(D,n)):V<=n&&(e.expiredLanes|=D),h&=~D}if(n=Ye,a=Se,a=xt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&We(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Rt(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&We(o),Qr(a)){case 2:case 8:a=T;break;case 32:a=j;break;case 268435456:a=dt;break;default:a=j}return o=vg.bind(null,e),a=An(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&We(o),e.callbackPriority=2,e.callbackNode=null,2}function vg(e,n){if(yn!==0&&yn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(ic()&&e.callbackNode!==a)return null;var o=Se;return o=xt(e,e===Ye?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(j0(e,o,n),gg(e,Oe()),e.callbackNode!=null&&e.callbackNode===a?vg.bind(null,e):null)}function _g(e,n){if(ic())return null;j0(e,n,!0)}function US(){kS(function(){(Le&6)!==0?An(B,DS):mg()})}function Kf(){if(Za===0){var e=er;e===0&&(e=Jt,Jt<<=1,(Jt&261888)===0&&(Jt=256)),Za=e}return Za}function xg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ci(""+e)}function Sg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function LS(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var h=xg((u[Dn]||null).action),y=o.submitter;y&&(n=(n=y[Dn]||null)?xg(n.formAction):y.getAttribute("formAction"),n!==null&&(h=n,y=null));var D=new vl("action","action",null,o,u);e.push({event:D,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Za!==0){var V=y?Sg(u,y):new FormData(u);mf(a,{pending:!0,data:V,method:u.method,action:h},null,V)}}else typeof h=="function"&&(D.preventDefault(),V=y?Sg(u,y):new FormData(u),mf(a,{pending:!0,data:V,method:u.method,action:h},h,V))},currentTarget:u}]})}}for(var Qf=0;Qf<Uu.length;Qf++){var Jf=Uu[Qf],NS=Jf.toLowerCase(),OS=Jf[0].toUpperCase()+Jf.slice(1);Di(NS,"on"+OS)}Di(Jp,"onAnimationEnd"),Di(jp,"onAnimationIteration"),Di($p,"onAnimationStart"),Di("dblclick","onDoubleClick"),Di("focusin","onFocus"),Di("focusout","onBlur"),Di(Qx,"onTransitionRun"),Di(Jx,"onTransitionStart"),Di(jx,"onTransitionCancel"),Di(tm,"onTransitionEnd"),q("onMouseEnter",["mouseout","mouseover"]),q("onMouseLeave",["mouseout","mouseover"]),q("onPointerEnter",["pointerout","pointerover"]),q("onPointerLeave",["pointerout","pointerover"]),w("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),w("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),w("onBeforeInput",["compositionend","keypress","textInput","paste"]),w("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Lo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),PS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Lo));function yg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var h=void 0;if(n)for(var y=o.length-1;0<=y;y--){var D=o[y],V=D.instance,rt=D.currentTarget;if(D=D.listener,V!==h&&u.isPropagationStopped())break t;h=D,u.currentTarget=rt;try{h(u)}catch(_t){Sl(_t)}u.currentTarget=null,h=V}else for(y=0;y<o.length;y++){if(D=o[y],V=D.instance,rt=D.currentTarget,D=D.listener,V!==h&&u.isPropagationStopped())break t;h=D,u.currentTarget=rt;try{h(u)}catch(_t){Sl(_t)}u.currentTarget=null,h=V}}}}function _e(e,n){var a=n[hs];a===void 0&&(a=n[hs]=new Set);var o=e+"__bubble";a.has(o)||(Mg(n,e,2,!1),a.add(o))}function jf(e,n,a){var o=0;n&&(o|=4),Mg(a,e,o,n)}var rc="_reactListening"+Math.random().toString(36).slice(2);function $f(e){if(!e[rc]){e[rc]=!0,dl.forEach(function(a){a!=="selectionchange"&&(PS.has(a)||jf(a,!1,e),jf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[rc]||(n[rc]=!0,jf("selectionchange",!1,n))}}function Mg(e,n,a,o){switch(Jg(n)){case 2:var u=cy;break;case 8:u=uy;break;default:u=ph}a=u.bind(null,n,a,e),u=void 0,!_u||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function th(e,n,a,o,u){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var D=o.stateNode.containerInfo;if(D===u)break;if(y===4)for(y=o.return;y!==null;){var V=y.tag;if((V===3||V===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;D!==null;){if(y=$i(D),y===null)return;if(V=y.tag,V===5||V===6||V===26||V===27){o=h=y;continue t}D=D.parentNode}}o=o.return}wp(function(){var rt=h,_t=gu(a),yt=[];t:{var ct=em.get(e);if(ct!==void 0){var ht=vl,qt=e;switch(e){case"keypress":if(ml(a)===0)break t;case"keydown":case"keyup":ht=Rx;break;case"focusin":qt="focus",ht=Mu;break;case"focusout":qt="blur",ht=Mu;break;case"beforeblur":case"afterblur":ht=Mu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ht=Dp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ht=gx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ht=Ux;break;case Jp:case jp:case $p:ht=xx;break;case tm:ht=Nx;break;case"scroll":case"scrollend":ht=px;break;case"wheel":ht=Px;break;case"copy":case"cut":case"paste":ht=yx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ht=Lp;break;case"toggle":case"beforetoggle":ht=Bx}var $t=(n&4)!==0,ke=!$t&&(e==="scroll"||e==="scrollend"),Q=$t?ct!==null?ct+"Capture":null:ct;$t=[];for(var Y=rt,at;Y!==null;){var St=Y;if(at=St.stateNode,St=St.tag,St!==5&&St!==26&&St!==27||at===null||Q===null||(St=$r(Y,Q),St!=null&&$t.push(No(Y,St,at))),ke)break;Y=Y.return}0<$t.length&&(ct=new ht(ct,qt,null,a,_t),yt.push({event:ct,listeners:$t}))}}if((n&7)===0){t:{if(ct=e==="mouseover"||e==="pointerover",ht=e==="mouseout"||e==="pointerout",ct&&a!==mu&&(qt=a.relatedTarget||a.fromElement)&&($i(qt)||qt[Zn]))break t;if((ht||ct)&&(ct=_t.window===_t?_t:(ct=_t.ownerDocument)?ct.defaultView||ct.parentWindow:window,ht?(qt=a.relatedTarget||a.toElement,ht=rt,qt=qt?$i(qt):null,qt!==null&&(ke=c(qt),$t=qt.tag,qt!==ke||$t!==5&&$t!==27&&$t!==6)&&(qt=null)):(ht=null,qt=rt),ht!==qt)){if($t=Dp,St="onMouseLeave",Q="onMouseEnter",Y="mouse",(e==="pointerout"||e==="pointerover")&&($t=Lp,St="onPointerLeave",Q="onPointerEnter",Y="pointer"),ke=ht==null?ct:ps(ht),at=qt==null?ct:ps(qt),ct=new $t(St,Y+"leave",ht,a,_t),ct.target=ke,ct.relatedTarget=at,St=null,$i(_t)===rt&&($t=new $t(Q,Y+"enter",qt,a,_t),$t.target=at,$t.relatedTarget=ke,St=$t),ke=St,ht&&qt)e:{for($t=zS,Q=ht,Y=qt,at=0,St=Q;St;St=$t(St))at++;St=0;for(var jt=Y;jt;jt=$t(jt))St++;for(;0<at-St;)Q=$t(Q),at--;for(;0<St-at;)Y=$t(Y),St--;for(;at--;){if(Q===Y||Y!==null&&Q===Y.alternate){$t=Q;break e}Q=$t(Q),Y=$t(Y)}$t=null}else $t=null;ht!==null&&Eg(yt,ct,ht,$t,!1),qt!==null&&ke!==null&&Eg(yt,ke,qt,$t,!0)}}t:{if(ct=rt?ps(rt):window,ht=ct.nodeName&&ct.nodeName.toLowerCase(),ht==="select"||ht==="input"&&ct.type==="file")var Re=Hp;else if(Ip(ct))if(Gp)Re=Yx;else{Re=Wx;var Yt=Xx}else ht=ct.nodeName,!ht||ht.toLowerCase()!=="input"||ct.type!=="checkbox"&&ct.type!=="radio"?rt&&vi(rt.elementType)&&(Re=Hp):Re=qx;if(Re&&(Re=Re(e,rt))){Fp(yt,Re,a,_t);break t}Yt&&Yt(e,ct,rt),e==="focusout"&&rt&&ct.type==="number"&&rt.memoizedProps.value!=null&&Sn(ct,"number",ct.value)}switch(Yt=rt?ps(rt):window,e){case"focusin":(Ip(Yt)||Yt.contentEditable==="true")&&(Ys=Yt,Ru=rt,oo=null);break;case"focusout":oo=Ru=Ys=null;break;case"mousedown":Cu=!0;break;case"contextmenu":case"mouseup":case"dragend":Cu=!1,Kp(yt,a,_t);break;case"selectionchange":if(Kx)break;case"keydown":case"keyup":Kp(yt,a,_t)}var ue;if(bu)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else qs?zp(e,a)&&(ye="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ye="onCompositionStart");ye&&(Np&&a.locale!=="ko"&&(qs||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&qs&&(ue=Rp()):(La=_t,xu="value"in La?La.value:La.textContent,qs=!0)),Yt=oc(rt,ye),0<Yt.length&&(ye=new Up(ye,e,null,a,_t),yt.push({event:ye,listeners:Yt}),ue?ye.data=ue:(ue=Bp(a),ue!==null&&(ye.data=ue)))),(ue=Fx?Hx(e,a):Gx(e,a))&&(ye=oc(rt,"onBeforeInput"),0<ye.length&&(Yt=new Up("onBeforeInput","beforeinput",null,a,_t),yt.push({event:Yt,listeners:ye}),Yt.data=ue)),LS(yt,e,rt,a,_t)}yg(yt,n)})}function No(e,n,a){return{instance:e,listener:n,currentTarget:a}}function oc(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=$r(e,a),u!=null&&o.unshift(No(e,u,h)),u=$r(e,n),u!=null&&o.push(No(e,u,h))),e.tag===3)return o;e=e.return}return[]}function zS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Eg(e,n,a,o,u){for(var h=n._reactName,y=[];a!==null&&a!==o;){var D=a,V=D.alternate,rt=D.stateNode;if(D=D.tag,V!==null&&V===o)break;D!==5&&D!==26&&D!==27||rt===null||(V=rt,u?(rt=$r(a,h),rt!=null&&y.unshift(No(a,rt,V))):u||(rt=$r(a,h),rt!=null&&y.push(No(a,rt,V)))),a=a.return}y.length!==0&&e.push({event:n,listeners:y})}var BS=/\r\n?/g,IS=/\u0000|\uFFFD/g;function bg(e){return(typeof e=="string"?e:""+e).replace(BS,`
`).replace(IS,"")}function Tg(e,n){return n=bg(n),bg(e)===n}function Ve(e,n,a,o,u,h){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||kn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&kn(e,""+o);break;case"className":Ut(e,"class",o);break;case"tabIndex":Ut(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ut(e,a,o);break;case"style":je(e,o,h);break;case"data":if(n!=="object"){Ut(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Ci(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(n!=="input"&&Ve(e,n,"name",u.name,u,null),Ve(e,n,"formEncType",u.formEncType,u,null),Ve(e,n,"formMethod",u.formMethod,u,null),Ve(e,n,"formTarget",u.formTarget,u,null)):(Ve(e,n,"encType",u.encType,u,null),Ve(e,n,"method",u.method,u,null),Ve(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Ci(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=_i);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=Ci(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":_e("beforetoggle",e),_e("toggle",e),Gt(e,"popover",o);break;case"xlinkActuate":Bt(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Bt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Bt(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Bt(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Bt(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Bt(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Gt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=He.get(a)||a,Gt(e,a,o))}}function eh(e,n,a,o,u,h){switch(a){case"style":je(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?kn(e,o):(typeof o=="number"||typeof o=="bigint")&&kn(e,""+o);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"onClick":o!=null&&(e.onclick=_i);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!jr.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),h=e[Dn]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(n,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Gt(e,a,o)}}}function On(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",e),_e("load",e);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var y=a[h];if(y!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ve(e,n,h,y,a,null)}}u&&Ve(e,n,"srcSet",a.srcSet,a,null),o&&Ve(e,n,"src",a.src,a,null);return;case"input":_e("invalid",e);var D=h=y=u=null,V=null,rt=null;for(o in a)if(a.hasOwnProperty(o)){var _t=a[o];if(_t!=null)switch(o){case"name":u=_t;break;case"type":y=_t;break;case"checked":V=_t;break;case"defaultChecked":rt=_t;break;case"value":h=_t;break;case"defaultValue":D=_t;break;case"children":case"dangerouslySetInnerHTML":if(_t!=null)throw Error(s(137,n));break;default:Ve(e,n,o,_t,a,null)}}Vt(e,h,D,V,rt,y,u,!1);return;case"select":_e("invalid",e),o=y=h=null;for(u in a)if(a.hasOwnProperty(u)&&(D=a[u],D!=null))switch(u){case"value":h=D;break;case"defaultValue":y=D;break;case"multiple":o=D;default:Ve(e,n,u,D,a,null)}n=h,a=y,e.multiple=!!o,n!=null?he(e,!!o,n,!1):a!=null&&he(e,!!o,a,!0);return;case"textarea":_e("invalid",e),h=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(D=a[y],D!=null))switch(y){case"value":o=D;break;case"defaultValue":u=D;break;case"children":h=D;break;case"dangerouslySetInnerHTML":if(D!=null)throw Error(s(91));break;default:Ve(e,n,y,D,a,null)}si(e,o,u,h);return;case"option":for(V in a)if(a.hasOwnProperty(V)&&(o=a[V],o!=null))switch(V){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Ve(e,n,V,o,a,null)}return;case"dialog":_e("beforetoggle",e),_e("toggle",e),_e("cancel",e),_e("close",e);break;case"iframe":case"object":_e("load",e);break;case"video":case"audio":for(o=0;o<Lo.length;o++)_e(Lo[o],e);break;case"image":_e("error",e),_e("load",e);break;case"details":_e("toggle",e);break;case"embed":case"source":case"link":_e("error",e),_e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(rt in a)if(a.hasOwnProperty(rt)&&(o=a[rt],o!=null))switch(rt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ve(e,n,rt,o,a,null)}return;default:if(vi(n)){for(_t in a)a.hasOwnProperty(_t)&&(o=a[_t],o!==void 0&&eh(e,n,_t,o,a,void 0));return}}for(D in a)a.hasOwnProperty(D)&&(o=a[D],o!=null&&Ve(e,n,D,o,a,null))}function FS(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,y=null,D=null,V=null,rt=null,_t=null;for(ht in a){var yt=a[ht];if(a.hasOwnProperty(ht)&&yt!=null)switch(ht){case"checked":break;case"value":break;case"defaultValue":V=yt;default:o.hasOwnProperty(ht)||Ve(e,n,ht,null,o,yt)}}for(var ct in o){var ht=o[ct];if(yt=a[ct],o.hasOwnProperty(ct)&&(ht!=null||yt!=null))switch(ct){case"type":h=ht;break;case"name":u=ht;break;case"checked":rt=ht;break;case"defaultChecked":_t=ht;break;case"value":y=ht;break;case"defaultValue":D=ht;break;case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(s(137,n));break;default:ht!==yt&&Ve(e,n,ct,ht,o,yt)}}fn(e,y,D,V,rt,_t,h,u);return;case"select":ht=y=D=ct=null;for(h in a)if(V=a[h],a.hasOwnProperty(h)&&V!=null)switch(h){case"value":break;case"multiple":ht=V;default:o.hasOwnProperty(h)||Ve(e,n,h,null,o,V)}for(u in o)if(h=o[u],V=a[u],o.hasOwnProperty(u)&&(h!=null||V!=null))switch(u){case"value":ct=h;break;case"defaultValue":D=h;break;case"multiple":y=h;default:h!==V&&Ve(e,n,u,h,o,V)}n=D,a=y,o=ht,ct!=null?he(e,!!a,ct,!1):!!o!=!!a&&(n!=null?he(e,!!a,n,!0):he(e,!!a,a?[]:"",!1));return;case"textarea":ht=ct=null;for(D in a)if(u=a[D],a.hasOwnProperty(D)&&u!=null&&!o.hasOwnProperty(D))switch(D){case"value":break;case"children":break;default:Ve(e,n,D,null,o,u)}for(y in o)if(u=o[y],h=a[y],o.hasOwnProperty(y)&&(u!=null||h!=null))switch(y){case"value":ct=u;break;case"defaultValue":ht=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==h&&Ve(e,n,y,u,o,h)}Vn(e,ct,ht);return;case"option":for(var qt in a)if(ct=a[qt],a.hasOwnProperty(qt)&&ct!=null&&!o.hasOwnProperty(qt))switch(qt){case"selected":e.selected=!1;break;default:Ve(e,n,qt,null,o,ct)}for(V in o)if(ct=o[V],ht=a[V],o.hasOwnProperty(V)&&ct!==ht&&(ct!=null||ht!=null))switch(V){case"selected":e.selected=ct&&typeof ct!="function"&&typeof ct!="symbol";break;default:Ve(e,n,V,ct,o,ht)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var $t in a)ct=a[$t],a.hasOwnProperty($t)&&ct!=null&&!o.hasOwnProperty($t)&&Ve(e,n,$t,null,o,ct);for(rt in o)if(ct=o[rt],ht=a[rt],o.hasOwnProperty(rt)&&ct!==ht&&(ct!=null||ht!=null))switch(rt){case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(s(137,n));break;default:Ve(e,n,rt,ct,o,ht)}return;default:if(vi(n)){for(var ke in a)ct=a[ke],a.hasOwnProperty(ke)&&ct!==void 0&&!o.hasOwnProperty(ke)&&eh(e,n,ke,void 0,o,ct);for(_t in o)ct=o[_t],ht=a[_t],!o.hasOwnProperty(_t)||ct===ht||ct===void 0&&ht===void 0||eh(e,n,_t,ct,o,ht);return}}for(var Q in a)ct=a[Q],a.hasOwnProperty(Q)&&ct!=null&&!o.hasOwnProperty(Q)&&Ve(e,n,Q,null,o,ct);for(yt in o)ct=o[yt],ht=a[yt],!o.hasOwnProperty(yt)||ct===ht||ct==null&&ht==null||Ve(e,n,yt,ct,o,ht)}function Ag(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function HS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,y=u.initiatorType,D=u.duration;if(h&&D&&Ag(y)){for(y=0,D=u.responseEnd,o+=1;o<a.length;o++){var V=a[o],rt=V.startTime;if(rt>D)break;var _t=V.transferSize,yt=V.initiatorType;_t&&Ag(yt)&&(V=V.responseEnd,y+=_t*(V<D?1:(D-rt)/(V-rt)))}if(--o,n+=8*(h+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var nh=null,ih=null;function lc(e){return e.nodeType===9?e:e.ownerDocument}function wg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Rg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function ah(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var sh=null;function GS(){var e=window.event;return e&&e.type==="popstate"?e===sh?!1:(sh=e,!0):(sh=null,!1)}var Cg=typeof setTimeout=="function"?setTimeout:void 0,VS=typeof clearTimeout=="function"?clearTimeout:void 0,Dg=typeof Promise=="function"?Promise:void 0,kS=typeof queueMicrotask=="function"?queueMicrotask:typeof Dg<"u"?function(e){return Dg.resolve(null).then(e).catch(XS)}:Cg;function XS(e){setTimeout(function(){throw e})}function Ka(e){return e==="head"}function Ug(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),Sr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Oo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Oo(a);for(var h=a.firstChild;h;){var y=h.nextSibling,D=h.nodeName;h[Ra]||D==="SCRIPT"||D==="STYLE"||D==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=y}}else a==="body"&&Oo(e.ownerDocument.body);a=u}while(a);Sr(n)}function Lg(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function rh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":rh(a),Ca(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function WS(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Ra])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Ti(e.nextSibling),e===null)break}return null}function qS(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ti(e.nextSibling),e===null))return null;return e}function Ng(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ti(e.nextSibling),e===null))return null;return e}function oh(e){return e.data==="$?"||e.data==="$~"}function lh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function YS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Ti(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var ch=null;function Og(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return Ti(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function Pg(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function zg(e,n,a){switch(n=lc(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Oo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Ca(e)}var Ai=new Map,Bg=new Set;function cc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ga=W.d;W.d={f:ZS,r:KS,D:QS,C:JS,L:jS,m:$S,X:ey,S:ty,M:ny};function ZS(){var e=ga.f(),n=tc();return e||n}function KS(e){var n=ta(e);n!==null&&n.tag===5&&n.type==="form"?t0(n):ga.r(e)}var vr=typeof document>"u"?null:document;function Ig(e,n,a){var o=vr;if(o&&typeof n=="string"&&n){var u=fe(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Bg.has(u)||(Bg.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),On(n,"link",e),un(n),o.head.appendChild(n)))}}function QS(e){ga.D(e),Ig("dns-prefetch",e,null)}function JS(e,n){ga.C(e,n),Ig("preconnect",e,n)}function jS(e,n,a){ga.L(e,n,a);var o=vr;if(o&&e&&n){var u='link[rel="preload"][as="'+fe(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+fe(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+fe(a.imageSizes)+'"]')):u+='[href="'+fe(e)+'"]';var h=u;switch(n){case"style":h=_r(e);break;case"script":h=xr(e)}Ai.has(h)||(e=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),Ai.set(h,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Po(h))||n==="script"&&o.querySelector(zo(h))||(n=o.createElement("link"),On(n,"link",e),un(n),o.head.appendChild(n)))}}function $S(e,n){ga.m(e,n);var a=vr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+fe(o)+'"][href="'+fe(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=xr(e)}if(!Ai.has(h)&&(e=_({rel:"modulepreload",href:e},n),Ai.set(h,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(zo(h)))return}o=a.createElement("link"),On(o,"link",e),un(o),a.head.appendChild(o)}}}function ty(e,n,a){ga.S(e,n,a);var o=vr;if(o&&e){var u=Da(o).hoistableStyles,h=_r(e);n=n||"default";var y=u.get(h);if(!y){var D={loading:0,preload:null};if(y=o.querySelector(Po(h)))D.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},a),(a=Ai.get(h))&&uh(e,a);var V=y=o.createElement("link");un(V),On(V,"link",e),V._p=new Promise(function(rt,_t){V.onload=rt,V.onerror=_t}),V.addEventListener("load",function(){D.loading|=1}),V.addEventListener("error",function(){D.loading|=2}),D.loading|=4,uc(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:D},u.set(h,y)}}}function ey(e,n){ga.X(e,n);var a=vr;if(a&&e){var o=Da(a).hoistableScripts,u=xr(e),h=o.get(u);h||(h=a.querySelector(zo(u)),h||(e=_({src:e,async:!0},n),(n=Ai.get(u))&&fh(e,n),h=a.createElement("script"),un(h),On(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function ny(e,n){ga.M(e,n);var a=vr;if(a&&e){var o=Da(a).hoistableScripts,u=xr(e),h=o.get(u);h||(h=a.querySelector(zo(u)),h||(e=_({src:e,async:!0,type:"module"},n),(n=Ai.get(u))&&fh(e,n),h=a.createElement("script"),un(h),On(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Fg(e,n,a,o){var u=(u=kt.current)?cc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=_r(a.href),a=Da(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=_r(a.href);var h=Da(u).hoistableStyles,y=h.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,y),(h=u.querySelector(Po(e)))&&!h._p&&(y.instance=h,y.state.loading=5),Ai.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ai.set(e,a),h||iy(u,e,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=xr(a),a=Da(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function _r(e){return'href="'+fe(e)+'"'}function Po(e){return'link[rel="stylesheet"]['+e+"]"}function Hg(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function iy(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),On(n,"link",a),un(n),e.head.appendChild(n))}function xr(e){return'[src="'+fe(e)+'"]'}function zo(e){return"script[async]"+e}function Gg(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+fe(a.href)+'"]');if(o)return n.instance=o,un(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),un(o),On(o,"style",u),uc(o,a.precedence,e),n.instance=o;case"stylesheet":u=_r(a.href);var h=e.querySelector(Po(u));if(h)return n.state.loading|=4,n.instance=h,un(h),h;o=Hg(a),(u=Ai.get(u))&&uh(o,u),h=(e.ownerDocument||e).createElement("link"),un(h);var y=h;return y._p=new Promise(function(D,V){y.onload=D,y.onerror=V}),On(h,"link",o),n.state.loading|=4,uc(h,a.precedence,e),n.instance=h;case"script":return h=xr(a.src),(u=e.querySelector(zo(h)))?(n.instance=u,un(u),u):(o=a,(u=Ai.get(h))&&(o=_({},a),fh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),un(u),On(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,uc(o,a.precedence,e));return n.instance}function uc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,y=0;y<o.length;y++){var D=o[y];if(D.dataset.precedence===n)h=D;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function uh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function fh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var fc=null;function Vg(e,n,a){if(fc===null){var o=new Map,u=fc=new Map;u.set(a,o)}else u=fc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var h=a[u];if(!(h[Ra]||h[cn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(n)||"";y=e+y;var D=o.get(y);D?D.push(h):o.set(y,[h])}}return o}function kg(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function ay(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Xg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function sy(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=_r(o.href),h=n.querySelector(Po(u));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=hc.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=h,un(h);return}h=n.ownerDocument||n,o=Hg(o),(u=Ai.get(u))&&uh(o,u),h=h.createElement("link"),un(h);var y=h;y._p=new Promise(function(D,V){y.onload=D,y.onerror=V}),On(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=hc.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var hh=0;function ry(e,n){return e.stylesheets&&e.count===0&&pc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&pc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&hh===0&&(hh=62500*HS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&pc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>hh?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function hc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)pc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var dc=null;function pc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,dc=new Map,n.forEach(oy,e),dc=null,hc.call(e))}function oy(e,n){if(!(n.state.loading&4)){var a=dc.get(e);if(a)var o=a.get(null);else{a=new Map,dc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var y=u[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),h=a.get(y)||o,h===o&&a.set(null,u),a.set(y,u),this.count++,o=hc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Bo={$$typeof:P,Provider:null,Consumer:null,_currentValue:ot,_currentValue2:ot,_threadCount:0};function ly(e,n,a,o,u,h,y,D,V){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Zt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zt(0),this.hiddenUpdates=Zt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=V,this.incompleteTransitions=new Map}function Wg(e,n,a,o,u,h,y,D,V,rt,_t,yt){return e=new ly(e,n,a,y,V,rt,_t,yt,D),n=1,h===!0&&(n|=24),h=oi(3,null,null,n),e.current=h,h.stateNode=e,n=Xu(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:n},Zu(h),e}function qg(e){return e?(e=Qs,e):Qs}function Yg(e,n,a,o,u,h){u=qg(u),o.context===null?o.context=u:o.pendingContext=u,o=Ia(n),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Fa(e,o,n),a!==null&&(ti(a,e,n),mo(a,e,n))}function Zg(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function dh(e,n){Zg(e,n),(e=e.alternate)&&Zg(e,n)}function Kg(e){if(e.tag===13||e.tag===31){var n=_s(e,67108864);n!==null&&ti(n,e,67108864),dh(e,67108864)}}function Qg(e){if(e.tag===13||e.tag===31){var n=hi();n=Kr(n);var a=_s(e,n);a!==null&&ti(a,e,n),dh(e,n)}}var mc=!0;function cy(e,n,a,o){var u=I.T;I.T=null;var h=W.p;try{W.p=2,ph(e,n,a,o)}finally{W.p=h,I.T=u}}function uy(e,n,a,o){var u=I.T;I.T=null;var h=W.p;try{W.p=8,ph(e,n,a,o)}finally{W.p=h,I.T=u}}function ph(e,n,a,o){if(mc){var u=mh(o);if(u===null)th(e,n,o,gc,a),jg(e,o);else if(hy(u,e,n,a,o))o.stopPropagation();else if(jg(e,o),n&4&&-1<fy.indexOf(e)){for(;u!==null;){var h=ta(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=wt(h.pendingLanes);if(y!==0){var D=h;for(D.pendingLanes|=2,D.entangledLanes|=2;y;){var V=1<<31-Ht(y);D.entanglements[1]|=V,y&=~V}Wi(h),(Le&6)===0&&(jl=Oe()+500,Uo(0))}}break;case 31:case 13:D=_s(h,2),D!==null&&ti(D,h,2),tc(),dh(h,2)}if(h=mh(o),h===null&&th(e,n,o,gc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else th(e,n,o,null,a)}}function mh(e){return e=gu(e),gh(e)}var gc=null;function gh(e){if(gc=null,e=$i(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=f(n),e!==null)return e;e=null}else if(a===31){if(e=p(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return gc=e,null}function Jg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(De()){case B:return 2;case T:return 8;case j:case lt:return 32;case dt:return 268435456;default:return 32}default:return 32}}var vh=!1,Qa=null,Ja=null,ja=null,Io=new Map,Fo=new Map,$a=[],fy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function jg(e,n){switch(e){case"focusin":case"focusout":Qa=null;break;case"dragenter":case"dragleave":Ja=null;break;case"mouseover":case"mouseout":ja=null;break;case"pointerover":case"pointerout":Io.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fo.delete(n.pointerId)}}function Ho(e,n,a,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},n!==null&&(n=ta(n),n!==null&&Kg(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function hy(e,n,a,o,u){switch(n){case"focusin":return Qa=Ho(Qa,e,n,a,o,u),!0;case"dragenter":return Ja=Ho(Ja,e,n,a,o,u),!0;case"mouseover":return ja=Ho(ja,e,n,a,o,u),!0;case"pointerover":var h=u.pointerId;return Io.set(h,Ho(Io.get(h)||null,e,n,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Fo.set(h,Ho(Fo.get(h)||null,e,n,a,o,u)),!0}return!1}function $g(e){var n=$i(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){e.blockedOn=n,ks(e.priority,function(){Qg(a)});return}}else if(n===31){if(n=p(a),n!==null){e.blockedOn=n,ks(e.priority,function(){Qg(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=mh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);mu=o,a.target.dispatchEvent(o),mu=null}else return n=ta(a),n!==null&&Kg(n),e.blockedOn=a,!1;n.shift()}return!0}function tv(e,n,a){vc(e)&&a.delete(n)}function dy(){vh=!1,Qa!==null&&vc(Qa)&&(Qa=null),Ja!==null&&vc(Ja)&&(Ja=null),ja!==null&&vc(ja)&&(ja=null),Io.forEach(tv),Fo.forEach(tv)}function _c(e,n){e.blockedOn===n&&(e.blockedOn=null,vh||(vh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,dy)))}var xc=null;function ev(e){xc!==e&&(xc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){xc===e&&(xc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(gh(o||a)===null)continue;break}var h=ta(a);h!==null&&(e.splice(n,3),n-=3,mf(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Sr(e){function n(V){return _c(V,e)}Qa!==null&&_c(Qa,e),Ja!==null&&_c(Ja,e),ja!==null&&_c(ja,e),Io.forEach(n),Fo.forEach(n);for(var a=0;a<$a.length;a++){var o=$a[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<$a.length&&(a=$a[0],a.blockedOn===null);)$g(a),a.blockedOn===null&&$a.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],y=u[Dn]||null;if(typeof h=="function")y||ev(a);else if(y){var D=null;if(h&&h.hasAttribute("formAction")){if(u=h,y=h[Dn]||null)D=y.formAction;else if(gh(u)!==null)continue}else D=y.action;typeof D=="function"?a[o+1]=D:(a.splice(o,3),o-=3),ev(a)}}}function nv(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function _h(e){this._internalRoot=e}Sc.prototype.render=_h.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=hi();Yg(a,o,e,n,null,null)},Sc.prototype.unmount=_h.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Yg(e.current,2,null,e,null,null),tc(),n[Zn]=null}};function Sc(e){this._internalRoot=e}Sc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Jr();e={blockedOn:null,target:e,priority:n};for(var a=0;a<$a.length&&n!==0&&n<$a[a].priority;a++);$a.splice(a,0,e),a===0&&$g(e)}};var iv=t.version;if(iv!=="19.2.7")throw Error(s(527,iv,"19.2.7"));W.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=d(n),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var py={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:I,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yc.isDisabled&&yc.supportsFiber)try{pt=yc.inject(py),mt=yc}catch{}}return Vo.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=u0,h=f0,y=h0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=Wg(e,1,!1,null,null,a,o,null,u,h,y,nv),e[Zn]=n.current,$f(e),new _h(n)},Vo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",h=u0,y=f0,D=h0,V=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(D=a.onRecoverableError),a.formState!==void 0&&(V=a.formState)),n=Wg(e,1,!0,n,a??null,o,u,V,h,y,D,nv),n.context=qg(null),a=n.current,o=hi(),o=Kr(o),u=Ia(o),u.callback=null,Fa(a,u,o),a=o,n.current.lanes=a,Xt(n,a),Wi(n),e[Zn]=n.current,$f(e),new Sc(n)},Vo.version="19.2.7",Vo}var dv;function Ay(){if(dv)return yh.exports;dv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),yh.exports=Ty(),yh.exports}var wy=Ay();function Ry(r){const[t,i]=Mn.useState(!1);return Mn.useEffect(()=>{const s=window.matchMedia("(prefers-reduced-motion: reduce)"),l=()=>i(r&&!document.hidden&&!s.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(l);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),s.addEventListener("change",l),document.addEventListener("visibilitychange",l),l(),()=>{c.disconnect(),s.removeEventListener("change",l),document.removeEventListener("visibilitychange",l)}},[r]),t}function Cy(r,t,i,s){Mn.useEffect(()=>{const l=t.current,c=i.current;if(!s||!l||!c)return;const f=l.closest("[data-scene-surface]")??l;let p=null;const m=_=>{if(!p||_.pointerId!==p.id)return;const g=Math.max(1,Math.min(f.clientWidth,f.clientHeight));r.drag(c,(_.clientX-p.x)/g,(_.clientY-p.y)/g)},d=_=>{!p||_&&_.pointerId!==p.id||(p=null,delete l.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d))},v=_=>{if(p||!_.isPrimary||_.button!==0)return;const g=_.target instanceof Element?_.target:null;!g||!(l.contains(g)||g.hasAttribute("data-scene-drag"))||(_.pointerType==="mouse"&&_.preventDefault(),p={id:_.pointerId,x:_.clientX,y:_.clientY},l.dataset.look="drag",window.addEventListener("pointermove",m),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))};return f.addEventListener("pointerdown",v),()=>{f.removeEventListener("pointerdown",v),d()}},[s,r,t,i])}class Dy{constructor(t){this.options=t,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null}acquire(t){return window.clearTimeout(this.disposeTimer),this.holders.push(t),this.ensureEngine(),this.attachTop(),t.onStatus(this.status),()=>this.release(t)}setRunning(t,i){t.running=i,this.top===t&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(t){}drag(t,i,s){var l,c;this.top===t&&((c=(l=this.engine)==null?void 0:l.drag)==null||c.call(l,i,s))}releaseDrag(t){var i,s;this.top===t&&((s=(i=this.engine)==null?void 0:i.releaseDrag)==null||s.call(i))}release(t){var i,s;if(this.holders=this.holders.filter(l=>l!==t),this.holders.length){this.attachTop();return}(i=this.engine)==null||i.stop(),this.observe(null),(s=this.canvas)==null||s.remove(),this.disposeTimer=window.setTimeout(()=>this.teardown(),5e3)}setStatus(t){this.status=t;for(const i of this.holders)i.onStatus(t)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const t=document.createElement("canvas");t.className=this.options.canvasClass,t.setAttribute("aria-hidden","true"),this.canvas=t;try{this.engine=this.options.create(t,()=>this.fail())}catch{this.fail();return}const i=this.engine;this.setStatus("loading"),this.configure(i),this.resize(),i.init().then(()=>{this.engine===i&&(i.renderFrame(0),this.setStatus("ready"),this.applyRunning())}).catch(()=>this.fail())}attachTop(){var i,s;const t=this.top;!t||!this.canvas||((s=(i=this.engine)==null?void 0:i.releaseDrag)==null||s.call(i),this.canvas.parentElement!==t.mount&&t.mount.appendChild(this.canvas),this.observe(t.mount),this.resize(),this.applyRunning())}observe(t){var i;this.observed!==t&&((i=this.observer)==null||i.disconnect(),this.observed=t,t&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(t)))}resize(){var l,c;const t=(l=this.top)==null?void 0:l.mount;if(!t||!this.engine)return;const i=t.clientWidth||window.innerWidth,s=t.clientHeight||window.innerHeight;this.engine.setSize(i,s,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var t;!this.engine||this.status!=="ready"||((t=this.top)!=null&&t.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}teardown(){var t,i;window.clearTimeout(this.disposeTimer),this.observe(null),(t=this.engine)==null||t.dispose(),this.engine=null,(i=this.canvas)==null||i.remove(),this.canvas=null,this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jd="186",Uy=0,pv=1,Ly=2,Yc=1,w_=2,Ko=3,ls=0,Hn=1,zi=2,ba=0,Jo=1,Fr=2,mv=3,gv=4,Ny=5,Pr=100,Oy=101,Py=102,zy=103,By=104,Iy=200,Fy=201,Hy=202,Gy=203,R_=204,C_=205,Vy=206,ky=207,Xy=208,Wy=209,qy=210,Yy=211,Zy=212,Ky=213,Qy=214,od=0,ld=1,cd=2,nl=3,ud=4,fd=5,hd=6,dd=7,D_=0,Jy=1,jy=2,Ji=0,U_=1,L_=2,N_=3,jd=4,O_=5,P_=6,z_=7,B_=300,Hs=301,kr=302,Th=303,Ah=304,ru=306,$c=1e3,Ea=1001,pd=1002,Pn=1003,$y=1004,Mc=1005,Fn=1006,wh=1007,Bs=1008,gi=1009,I_=1010,F_=1011,il=1012,$d=1013,ji=1014,Ki=1015,Fi=1016,tp=1017,ep=1018,al=1020,H_=35902,G_=35899,V_=1021,k_=1022,Ii=1023,Aa=1026,Is=1027,X_=1028,np=1029,Gs=1030,ip=1031,ap=1033,Zc=33776,Kc=33777,Qc=33778,Jc=33779,md=35840,gd=35841,vd=35842,_d=35843,xd=36196,Sd=37492,yd=37496,Md=37488,Ed=37489,tu=37490,bd=37491,Td=37808,Ad=37809,wd=37810,Rd=37811,Cd=37812,Dd=37813,Ud=37814,Ld=37815,Nd=37816,Od=37817,Pd=37818,zd=37819,Bd=37820,Id=37821,Fd=36492,Hd=36494,Gd=36495,Vd=36283,kd=36284,eu=36285,Xd=36286,tM=3200,Wd=0,eM=1,rs="",ei="srgb",nu="srgb-linear",iu="linear",Be="srgb",Rh=7680,nM=519,iM=512,aM=513,sM=514,sp=515,rM=516,oM=517,rp=518,lM=519,cM=35044,vv="300 es",Qi=2e3,sl=2001;function uM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function au(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function fM(){const r=au("canvas");return r.style.display="block",r}const _v={};function xv(...r){const t="THREE."+r.shift();console.log(t,...r)}function W_(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ne(...r){r=W_(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...r)}}function Ae(...r){r=W_(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...r)}}function Hr(...r){const t=r.join(" ");t in _v||(_v[t]=!0,ne(...r))}function hM(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const dM={[od]:ld,[cd]:hd,[ud]:dd,[nl]:fd,[ld]:od,[hd]:cd,[dd]:ud,[fd]:nl};class Vs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sv=1234567;const jo=Math.PI/180,rl=180/Math.PI;function qr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[i&63|128]+Bn[i>>8&255]+"-"+Bn[i>>16&255]+Bn[i>>24&255]+Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]).toLowerCase()}function me(r,t,i){return Math.max(t,Math.min(i,r))}function op(r,t){return(r%t+t)%t}function pM(r,t,i,s,l){return s+(r-t)*(l-s)/(i-t)}function mM(r,t,i){return r!==t?(i-r)/(t-r):0}function $o(r,t,i){return(1-i)*r+i*t}function gM(r,t,i,s){return $o(r,t,1-Math.exp(-i*s))}function vM(r,t=1){return t-Math.abs(op(r,t*2)-t)}function _M(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*(3-2*r))}function xM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*r*(r*(r*6-15)+10))}function SM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function yM(r,t){return r+Math.random()*(t-r)}function MM(r){return r*(.5-Math.random())}function EM(r){r!==void 0&&(Sv=r);let t=Sv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bM(r){return r*jo}function TM(r){return r*rl}function AM(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function wM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function RM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function CM(r,t,i,s,l){const c=Math.cos,f=Math.sin,p=c(i/2),m=f(i/2),d=c((t+s)/2),v=f((t+s)/2),_=c((t-s)/2),g=f((t-s)/2),x=c((s-t)/2),b=f((s-t)/2);switch(l){case"XYX":r.set(p*v,m*_,m*g,p*d);break;case"YZY":r.set(m*g,p*v,m*_,p*d);break;case"ZXZ":r.set(m*_,m*g,p*v,p*d);break;case"XZX":r.set(p*v,m*b,m*x,p*d);break;case"YXY":r.set(m*x,p*v,m*b,p*d);break;case"ZYZ":r.set(m*b,m*x,p*v,p*d);break;default:ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function zr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Wn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ch={DEG2RAD:jo,RAD2DEG:rl,generateUUID:qr,clamp:me,euclideanModulo:op,mapLinear:pM,inverseLerp:mM,lerp:$o,damp:gM,pingpong:vM,smoothstep:_M,smootherstep:xM,randInt:SM,randFloat:yM,randFloatSpread:MM,seededRandom:EM,degToRad:bM,radToDeg:TM,isPowerOfTwo:AM,ceilPowerOfTwo:wM,floorPowerOfTwo:RM,setQuaternionFromProperEuler:CM,normalize:Wn,denormalize:zr},yp=class yp{constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(me(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(me(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};yp.prototype.isVector2=!0;let Qt=yp;class fs{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,f,p){let m=s[l+0],d=s[l+1],v=s[l+2],_=s[l+3],g=c[f+0],x=c[f+1],b=c[f+2],R=c[f+3];if(_!==R||m!==g||d!==x||v!==b){let M=m*g+d*x+v*b+_*R;M<0&&(g=-g,x=-x,b=-b,R=-R,M=-M);let S=1-p;if(M<.9995){const U=Math.acos(M),P=Math.sin(U);S=Math.sin(S*U)/P,p=Math.sin(p*U)/P,m=m*S+g*p,d=d*S+x*p,v=v*S+b*p,_=_*S+R*p}else{m=m*S+g*p,d=d*S+x*p,v=v*S+b*p,_=_*S+R*p;const U=1/Math.sqrt(m*m+d*d+v*v+_*_);m*=U,d*=U,v*=U,_*=U}}t[i]=m,t[i+1]=d,t[i+2]=v,t[i+3]=_}static multiplyQuaternionsFlat(t,i,s,l,c,f){const p=s[l],m=s[l+1],d=s[l+2],v=s[l+3],_=c[f],g=c[f+1],x=c[f+2],b=c[f+3];return t[i]=p*b+v*_+m*x-d*g,t[i+1]=m*b+v*g+d*_-p*x,t[i+2]=d*b+v*x+p*g-m*_,t[i+3]=v*b-p*_-m*g-d*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,f=t._order,p=Math.cos,m=Math.sin,d=p(s/2),v=p(l/2),_=p(c/2),g=m(s/2),x=m(l/2),b=m(c/2);switch(f){case"XYZ":this._x=g*v*_+d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_-g*x*b;break;case"YXZ":this._x=g*v*_+d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_+g*x*b;break;case"ZXY":this._x=g*v*_-d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_-g*x*b;break;case"ZYX":this._x=g*v*_-d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_+g*x*b;break;case"YZX":this._x=g*v*_+d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_-g*x*b;break;case"XZY":this._x=g*v*_-d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_+g*x*b;break;default:ne("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],f=i[1],p=i[5],m=i[9],d=i[2],v=i[6],_=i[10],g=s+p+_;if(g>0){const x=.5/Math.sqrt(g+1);this._w=.25/x,this._x=(v-m)*x,this._y=(c-d)*x,this._z=(f-l)*x}else if(s>p&&s>_){const x=2*Math.sqrt(1+s-p-_);this._w=(v-m)/x,this._x=.25*x,this._y=(l+f)/x,this._z=(c+d)/x}else if(p>_){const x=2*Math.sqrt(1+p-s-_);this._w=(c-d)/x,this._x=(l+f)/x,this._y=.25*x,this._z=(m+v)/x}else{const x=2*Math.sqrt(1+_-s-p);this._w=(f-l)/x,this._x=(c+d)/x,this._y=(m+v)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,f=t._w,p=i._x,m=i._y,d=i._z,v=i._w;return this._x=s*v+f*p+l*d-c*m,this._y=l*v+f*m+c*p-s*d,this._z=c*v+f*d+s*m-l*p,this._w=f*v-s*p-l*m-c*d,this._onChangeCallback(),this}slerp(t,i){let s=t._x,l=t._y,c=t._z,f=t._w,p=this.dot(t);p<0&&(s=-s,l=-l,c=-c,f=-f,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),v=Math.sin(d);m=Math.sin(m*d)/v,i=Math.sin(i*d)/v,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Mp=class Mp{constructor(t=0,i=0,s=0){this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(yv.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(yv.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,f=t.y,p=t.z,m=t.w,d=2*(f*l-p*s),v=2*(p*i-c*l),_=2*(c*s-f*i);return this.x=i+m*d+f*_-p*v,this.y=s+m*v+p*d-c*_,this.z=l+m*_+c*v-f*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this.z=me(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this.z=me(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(me(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,f=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*f-s*m,this.z=s*p-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Dh.copy(this).projectOnVector(t),this.sub(Dh)}reflect(t){return this.sub(Dh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(me(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Mp.prototype.isVector3=!0;let H=Mp;const Dh=new H,yv=new fs,Ep=class Ep{constructor(t,i,s,l,c,f,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,p,m,d)}set(t,i,s,l,c,f,p,m,d){const v=this.elements;return v[0]=t,v[1]=l,v[2]=p,v[3]=i,v[4]=c,v[5]=m,v[6]=s,v[7]=f,v[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],p=s[3],m=s[6],d=s[1],v=s[4],_=s[7],g=s[2],x=s[5],b=s[8],R=l[0],M=l[3],S=l[6],U=l[1],P=l[4],A=l[7],N=l[2],O=l[5],C=l[8];return c[0]=f*R+p*U+m*N,c[3]=f*M+p*P+m*O,c[6]=f*S+p*A+m*C,c[1]=d*R+v*U+_*N,c[4]=d*M+v*P+_*O,c[7]=d*S+v*A+_*C,c[2]=g*R+x*U+b*N,c[5]=g*M+x*P+b*O,c[8]=g*S+x*A+b*C,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],v=t[8];return i*f*v-i*p*d-s*c*v+s*p*m+l*c*d-l*f*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],v=t[8],_=v*f-p*d,g=p*m-v*c,x=d*c-f*m,b=i*_+s*g+l*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/b;return t[0]=_*R,t[1]=(l*d-v*s)*R,t[2]=(p*s-l*f)*R,t[3]=g*R,t[4]=(v*i-l*m)*R,t[5]=(l*c-p*i)*R,t[6]=x*R,t[7]=(s*m-d*i)*R,t[8]=(f*i-s*c)*R,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,f,p){const m=Math.cos(c),d=Math.sin(c);return this.set(s*m,s*d,-s*(m*f+d*p)+f+t,-l*d,l*m,-l*(-d*f+m*p)+p+i,0,0,1),this}scale(t,i){return Hr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Uh.makeScale(t,i)),this}rotate(t){return Hr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Uh.makeRotation(-t)),this}translate(t,i){return Hr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Uh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ep.prototype.isMatrix3=!0;let re=Ep;const Uh=new re,Mv=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ev=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function DM(){const r={enabled:!0,workingColorSpace:nu,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Be&&(l.r=Ta(l.r),l.g=Ta(l.g),l.b=Ta(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Be&&(l.r=Gr(l.r),l.g=Gr(l.g),l.b=Gr(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===rs?iu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Hr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Hr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[nu]:{primaries:t,whitePoint:s,transfer:iu,toXYZ:Mv,fromXYZ:Ev,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ei},outputColorSpaceConfig:{drawingBufferColorSpace:ei}},[ei]:{primaries:t,whitePoint:s,transfer:Be,toXYZ:Mv,fromXYZ:Ev,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ei}}}),r}const Ee=DM();function Ta(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let yr;class UM{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{yr===void 0&&(yr=au("canvas")),yr.width=t.width,yr.height=t.height;const l=yr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=yr}return s.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=au("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ta(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Ta(i[s]/255)*255):i[s]=Ta(i[s]);return{data:i,width:t.width,height:t.height}}else return ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let LM=0;class lp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:LM++}),this.uuid=qr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,p=l.length;f<p;f++)l[f].isDataTexture?c.push(Lh(l[f].image)):c.push(Lh(l[f]))}else c=Lh(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function Lh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?UM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ne("Texture: Unable to serialize Texture."),{})}let NM=0;const Nh=new H;class Gn extends Vs{constructor(t=Gn.DEFAULT_IMAGE,i=Gn.DEFAULT_MAPPING,s=Ea,l=Ea,c=Fn,f=Bs,p=Ii,m=gi,d=Gn.DEFAULT_ANISOTROPY,v=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:NM++}),this.uuid=qr(),this.name="",this.source=new lp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new Qt(0,0),this.repeat=new Qt(1,1),this.center=new Qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nh).x}get height(){return this.source.getSize(Nh).y}get depth(){return this.source.getSize(Nh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const s=t[i];if(s===void 0){ne(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ne(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==B_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $c:t.x=t.x-Math.floor(t.x);break;case Ea:t.x=t.x<0?0:1;break;case pd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $c:t.y=t.y-Math.floor(t.y);break;case Ea:t.y=t.y<0?0:1;break;case pd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=B_;Gn.DEFAULT_ANISOTROPY=1;const bp=class bp{constructor(t=0,i=0,s=0,l=1){this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,d=m[0],v=m[4],_=m[8],g=m[1],x=m[5],b=m[9],R=m[2],M=m[6],S=m[10];if(Math.abs(v-g)<.01&&Math.abs(_-R)<.01&&Math.abs(b-M)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+R)<.1&&Math.abs(b+M)<.1&&Math.abs(d+x+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const P=(d+1)/2,A=(x+1)/2,N=(S+1)/2,O=(v+g)/4,C=(_+R)/4,E=(b+M)/4;return P>A&&P>N?P<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(P),l=O/s,c=C/s):A>N?A<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(A),s=O/l,c=E/l):N<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(N),s=C/c,l=E/c),this.set(s,l,c,i),this}let U=Math.sqrt((M-b)*(M-b)+(_-R)*(_-R)+(g-v)*(g-v));return Math.abs(U)<.001&&(U=1),this.x=(M-b)/U,this.y=(_-R)/U,this.z=(g-v)/U,this.w=Math.acos((d+x+S-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this.z=me(this.z,t.z,i.z),this.w=me(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this.z=me(this.z,t,i),this.w=me(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(me(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};bp.prototype.isVector4=!0;let Ze=bp;class OM extends Vs{constructor(t=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=s.depth,this.scissor=new Ze(0,0,t,i),this.scissorTest=!1,this.viewport=new Ze(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:s.depth},c=new Gn(l),f=s.count;for(let p=0;p<f;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new lp(l)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const i=t.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends OM{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class q_ extends Gn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Ea,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class PM extends Gn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Ea,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const su=class su{constructor(t,i,s,l,c,f,p,m,d,v,_,g,x,b,R,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,p,m,d,v,_,g,x,b,R,M)}set(t,i,s,l,c,f,p,m,d,v,_,g,x,b,R,M){const S=this.elements;return S[0]=t,S[4]=i,S[8]=s,S[12]=l,S[1]=c,S[5]=f,S[9]=p,S[13]=m,S[2]=d,S[6]=v,S[10]=_,S[14]=g,S[3]=x,S[7]=b,S[11]=R,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new su().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,s=t.elements,l=1/Mr.setFromMatrixColumn(t,0).length(),c=1/Mr.setFromMatrixColumn(t,1).length(),f=1/Mr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),p=Math.sin(s),m=Math.cos(l),d=Math.sin(l),v=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const g=f*v,x=f*_,b=p*v,R=p*_;i[0]=m*v,i[4]=-m*_,i[8]=d,i[1]=x+b*d,i[5]=g-R*d,i[9]=-p*m,i[2]=R-g*d,i[6]=b+x*d,i[10]=f*m}else if(t.order==="YXZ"){const g=m*v,x=m*_,b=d*v,R=d*_;i[0]=g+R*p,i[4]=b*p-x,i[8]=f*d,i[1]=f*_,i[5]=f*v,i[9]=-p,i[2]=x*p-b,i[6]=R+g*p,i[10]=f*m}else if(t.order==="ZXY"){const g=m*v,x=m*_,b=d*v,R=d*_;i[0]=g-R*p,i[4]=-f*_,i[8]=b+x*p,i[1]=x+b*p,i[5]=f*v,i[9]=R-g*p,i[2]=-f*d,i[6]=p,i[10]=f*m}else if(t.order==="ZYX"){const g=f*v,x=f*_,b=p*v,R=p*_;i[0]=m*v,i[4]=b*d-x,i[8]=g*d+R,i[1]=m*_,i[5]=R*d+g,i[9]=x*d-b,i[2]=-d,i[6]=p*m,i[10]=f*m}else if(t.order==="YZX"){const g=f*m,x=f*d,b=p*m,R=p*d;i[0]=m*v,i[4]=R-g*_,i[8]=b*_+x,i[1]=_,i[5]=f*v,i[9]=-p*v,i[2]=-d*v,i[6]=x*_+b,i[10]=g-R*_}else if(t.order==="XZY"){const g=f*m,x=f*d,b=p*m,R=p*d;i[0]=m*v,i[4]=-_,i[8]=d*v,i[1]=g*_+R,i[5]=f*v,i[9]=x*_-b,i[2]=b*_-x,i[6]=p*v,i[10]=R*_+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zM,t,BM)}lookAt(t,i,s){const l=this.elements;return di.subVectors(t,i),di.lengthSq()===0&&(di.z=1),di.normalize(),es.crossVectors(s,di),es.lengthSq()===0&&(Math.abs(s.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),es.crossVectors(s,di)),es.normalize(),Ec.crossVectors(di,es),l[0]=es.x,l[4]=Ec.x,l[8]=di.x,l[1]=es.y,l[5]=Ec.y,l[9]=di.y,l[2]=es.z,l[6]=Ec.z,l[10]=di.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],p=s[4],m=s[8],d=s[12],v=s[1],_=s[5],g=s[9],x=s[13],b=s[2],R=s[6],M=s[10],S=s[14],U=s[3],P=s[7],A=s[11],N=s[15],O=l[0],C=l[4],E=l[8],L=l[12],F=l[1],k=l[5],G=l[9],J=l[13],X=l[2],$=l[6],I=l[10],W=l[14],ot=l[3],et=l[7],ft=l[11],z=l[15];return c[0]=f*O+p*F+m*X+d*ot,c[4]=f*C+p*k+m*$+d*et,c[8]=f*E+p*G+m*I+d*ft,c[12]=f*L+p*J+m*W+d*z,c[1]=v*O+_*F+g*X+x*ot,c[5]=v*C+_*k+g*$+x*et,c[9]=v*E+_*G+g*I+x*ft,c[13]=v*L+_*J+g*W+x*z,c[2]=b*O+R*F+M*X+S*ot,c[6]=b*C+R*k+M*$+S*et,c[10]=b*E+R*G+M*I+S*ft,c[14]=b*L+R*J+M*W+S*z,c[3]=U*O+P*F+A*X+N*ot,c[7]=U*C+P*k+A*$+N*et,c[11]=U*E+P*G+A*I+N*ft,c[15]=U*L+P*J+A*W+N*z,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],f=t[1],p=t[5],m=t[9],d=t[13],v=t[2],_=t[6],g=t[10],x=t[14],b=t[3],R=t[7],M=t[11],S=t[15],U=m*x-d*g,P=p*x-d*_,A=p*g-m*_,N=f*x-d*v,O=f*g-m*v,C=f*_-p*v;return i*(R*U-M*P+S*A)-s*(b*U-M*N+S*O)+l*(b*P-R*N+S*C)-c*(b*A-R*O+M*C)}determinantAffine(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[1],f=t[5],p=t[9],m=t[2],d=t[6],v=t[10];return i*(f*v-p*d)-s*(c*v-p*m)+l*(c*d-f*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],v=t[8],_=t[9],g=t[10],x=t[11],b=t[12],R=t[13],M=t[14],S=t[15],U=i*p-s*f,P=i*m-l*f,A=i*d-c*f,N=s*m-l*p,O=s*d-c*p,C=l*d-c*m,E=v*R-_*b,L=v*M-g*b,F=v*S-x*b,k=_*M-g*R,G=_*S-x*R,J=g*S-x*M,X=U*J-P*G+A*k+N*F-O*L+C*E;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/X;return t[0]=(p*J-m*G+d*k)*$,t[1]=(l*G-s*J-c*k)*$,t[2]=(R*C-M*O+S*N)*$,t[3]=(g*O-_*C-x*N)*$,t[4]=(m*F-f*J-d*L)*$,t[5]=(i*J-l*F+c*L)*$,t[6]=(M*A-b*C-S*P)*$,t[7]=(v*C-g*A+x*P)*$,t[8]=(f*G-p*F+d*E)*$,t[9]=(s*F-i*G-c*E)*$,t[10]=(b*O-R*A+S*U)*$,t[11]=(_*A-v*O-x*U)*$,t[12]=(p*L-f*k-m*E)*$,t[13]=(i*k-s*L+l*E)*$,t[14]=(R*P-b*N-M*U)*$,t[15]=(v*N-_*P+g*U)*$,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=t.x,p=t.y,m=t.z,d=c*f,v=c*p;return this.set(d*f+s,d*p-l*m,d*m+l*p,0,d*p+l*m,v*p+s,v*m-l*f,0,d*m-l*p,v*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,f=i._y,p=i._z,m=i._w,d=c+c,v=f+f,_=p+p,g=c*d,x=c*v,b=c*_,R=f*v,M=f*_,S=p*_,U=m*d,P=m*v,A=m*_,N=s.x,O=s.y,C=s.z;return l[0]=(1-(R+S))*N,l[1]=(x+A)*N,l[2]=(b-P)*N,l[3]=0,l[4]=(x-A)*O,l[5]=(1-(g+S))*O,l[6]=(M+U)*O,l[7]=0,l[8]=(b+P)*C,l[9]=(M-U)*C,l[10]=(1-(g+R))*C,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinantAffine();if(c===0)return s.set(1,1,1),i.identity(),this;let f=Mr.set(l[0],l[1],l[2]).length();const p=Mr.set(l[4],l[5],l[6]).length(),m=Mr.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Ni.copy(this);const d=1/f,v=1/p,_=1/m;return Ni.elements[0]*=d,Ni.elements[1]*=d,Ni.elements[2]*=d,Ni.elements[4]*=v,Ni.elements[5]*=v,Ni.elements[6]*=v,Ni.elements[8]*=_,Ni.elements[9]*=_,Ni.elements[10]*=_,i.setFromRotationMatrix(Ni),s.x=f,s.y=p,s.z=m,this}makePerspective(t,i,s,l,c,f,p=Qi,m=!1){const d=this.elements,v=2*c/(i-t),_=2*c/(s-l),g=(i+t)/(i-t),x=(s+l)/(s-l);let b,R;if(m)b=c/(f-c),R=f*c/(f-c);else if(p===Qi)b=-(f+c)/(f-c),R=-2*f*c/(f-c);else if(p===sl)b=-f/(f-c),R=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=v,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=_,d[9]=x,d[13]=0,d[2]=0,d[6]=0,d[10]=b,d[14]=R,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,i,s,l,c,f,p=Qi,m=!1){const d=this.elements,v=2/(i-t),_=2/(s-l),g=-(i+t)/(i-t),x=-(s+l)/(s-l);let b,R;if(m)b=1/(f-c),R=f/(f-c);else if(p===Qi)b=-2/(f-c),R=-(f+c)/(f-c);else if(p===sl)b=-1/(f-c),R=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=v,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=_,d[9]=0,d[13]=x,d[2]=0,d[6]=0,d[10]=b,d[14]=R,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}};su.prototype.isMatrix4=!0;let Ie=su;const Mr=new H,Ni=new Ie,zM=new H(0,0,0),BM=new H(1,1,1),es=new H,Ec=new H,di=new H,bv=new Ie,Tv=new fs;class cs{constructor(t=0,i=0,s=0,l=cs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],p=l[8],m=l[1],d=l[5],v=l[9],_=l[2],g=l[6],x=l[10];switch(i){case"XYZ":this._y=Math.asin(me(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,x),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-me(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(p,x),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(me(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,x),this._z=Math.atan2(-f,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-me(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,d));break;case"YZX":this._z=Math.asin(me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,d),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(p,x));break;case"XZY":this._z=Math.asin(-me(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-v,x),this._y=0);break;default:ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return bv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(bv,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Tv.setFromEuler(this),this.setFromQuaternion(Tv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cs.DEFAULT_ORDER="XYZ";class cp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let IM=0;const Av=new H,Er=new fs,va=new Ie,bc=new H,ko=new H,FM=new H,HM=new fs,wv=new H(1,0,0),Rv=new H(0,1,0),Cv=new H(0,0,1),Dv={type:"added"},GM={type:"removed"},br={type:"childadded",child:null},Oh={type:"childremoved",child:null};class Cn extends Vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:IM++}),this.uuid=qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Cn.DEFAULT_UP.clone();const t=new H,i=new cs,s=new fs,l=new H(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Ie},normalMatrix:{value:new re}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=Cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Er.setFromAxisAngle(t,i),this.quaternion.multiply(Er),this}rotateOnWorldAxis(t,i){return Er.setFromAxisAngle(t,i),this.quaternion.premultiply(Er),this}rotateX(t){return this.rotateOnAxis(wv,t)}rotateY(t){return this.rotateOnAxis(Rv,t)}rotateZ(t){return this.rotateOnAxis(Cv,t)}translateOnAxis(t,i){return Av.copy(t).applyQuaternion(this.quaternion),this.position.add(Av.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(wv,t)}translateY(t){return this.translateOnAxis(Rv,t)}translateZ(t){return this.translateOnAxis(Cv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(va.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?bc.copy(t):bc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),ko.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?va.lookAt(ko,bc,this.up):va.lookAt(bc,ko,this.up),this.quaternion.setFromRotationMatrix(va),l&&(va.extractRotation(l.matrixWorld),Er.setFromRotationMatrix(va),this.quaternion.premultiply(Er.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ae("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Dv),br.child=t,this.dispatchEvent(br),br.child=null):Ae("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(GM),Oh.child=t,this.dispatchEvent(Oh),Oh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),va.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),va.multiply(t.parent.matrixWorld)),t.applyMatrix4(va),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Dv),br.child=t,this.dispatchEvent(br),br.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,t,FM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,HM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,s=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i,s=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const c=this.children;for(let f=0,p=c.length;f<p;f++)c[f].updateWorldMatrix(!1,!0,s)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,v=m.length;d<v;d++){const _=m[d];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(t.materials,this.material[m]));l.material=p}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(t.animations,m))}}if(i){const p=f(t.geometries),m=f(t.materials),d=f(t.textures),v=f(t.images),_=f(t.shapes),g=f(t.skeletons),x=f(t.animations),b=f(t.nodes);p.length>0&&(s.geometries=p),m.length>0&&(s.materials=m),d.length>0&&(s.textures=d),v.length>0&&(s.images=v),_.length>0&&(s.shapes=_),g.length>0&&(s.skeletons=g),x.length>0&&(s.animations=x),b.length>0&&(s.nodes=b)}return s.object=l,s;function f(p){const m=[];for(const d in p){const v=p[d];delete v.metadata,m.push(v)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Cn.DEFAULT_UP=new H(0,1,0);Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class os extends Cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const VM={type:"move"};class Ph{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new os,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new os,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new os,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,f=null;const p=this._targetRay,m=this._grip,d=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(d&&t.hand){f=!0;for(const R of t.hand.values()){const M=i.getJointPose(R,s),S=this._getHandJoint(d,R);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const v=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],g=v.position.distanceTo(_.position),x=.02,b=.005;d.inputState.pinching&&g>x+b?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&g<=x-b&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));p!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(VM)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new os;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const Y_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ns={h:0,s:0,l:0},Tc={h:0,s:0,l:0};function zh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class ee{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=ei){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ee.colorSpaceToWorking(this,i),this}setRGB(t,i,s,l=Ee.workingColorSpace){return this.r=t,this.g=i,this.b=s,Ee.colorSpaceToWorking(this,l),this}setHSL(t,i,s,l=Ee.workingColorSpace){if(t=op(t,1),i=me(i,0,1),s=me(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=zh(f,c,t+1/3),this.g=zh(f,c,t),this.b=zh(f,c,t-1/3)}return Ee.colorSpaceToWorking(this,l),this}setStyle(t,i=ei){function s(c){c!==void 0&&parseFloat(c)<1&&ne("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],p=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ne("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);ne("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=ei){const s=Y_[t.toLowerCase()];return s!==void 0?this.setHex(s,i):ne("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ta(t.r),this.g=Ta(t.g),this.b=Ta(t.b),this}copyLinearToSRGB(t){return this.r=Gr(t.r),this.g=Gr(t.g),this.b=Gr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ei){return Ee.workingToColorSpace(In.copy(this),t),Math.round(me(In.r*255,0,255))*65536+Math.round(me(In.g*255,0,255))*256+Math.round(me(In.b*255,0,255))}getHexString(t=ei){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ee.workingColorSpace){Ee.workingToColorSpace(In.copy(this),i);const s=In.r,l=In.g,c=In.b,f=Math.max(s,l,c),p=Math.min(s,l,c);let m,d;const v=(p+f)/2;if(p===f)m=0,d=0;else{const _=f-p;switch(d=v<=.5?_/(f+p):_/(2-f-p),f){case s:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-s)/_+2;break;case c:m=(s-l)/_+4;break}m/=6}return t.h=m,t.s=d,t.l=v,t}getRGB(t,i=Ee.workingColorSpace){return Ee.workingToColorSpace(In.copy(this),i),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=ei){Ee.workingToColorSpace(In.copy(this),t);const i=In.r,s=In.g,l=In.b;return t!==ei?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(ns),this.setHSL(ns.h+t,ns.s+i,ns.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(ns),t.getHSL(Tc);const s=$o(ns.h,Tc.h,i),l=$o(ns.s,Tc.s,i),c=$o(ns.l,Tc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new ee;ee.NAMES=Y_;class up{constructor(t,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new ee(t),this.density=i}clone(){return new up(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class kM extends Cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cs,this.environmentIntensity=1,this.environmentRotation=new cs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Oi=new H,_a=new H,Bh=new H,xa=new H,Tr=new H,Ar=new H,Uv=new H,Ih=new H,Fh=new H,Hh=new H,Gh=new Ze,Vh=new Ze,kh=new Ze;class Bi{constructor(t=new H,i=new H,s=new H){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Oi.subVectors(t,i),l.cross(Oi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Oi.subVectors(l,i),_a.subVectors(s,i),Bh.subVectors(t,i);const f=Oi.dot(Oi),p=Oi.dot(_a),m=Oi.dot(Bh),d=_a.dot(_a),v=_a.dot(Bh),_=f*d-p*p;if(_===0)return c.set(0,0,0),null;const g=1/_,x=(d*m-p*v)*g,b=(f*v-p*m)*g;return c.set(1-x-b,b,x)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,xa)===null?!1:xa.x>=0&&xa.y>=0&&xa.x+xa.y<=1}static getInterpolation(t,i,s,l,c,f,p,m){return this.getBarycoord(t,i,s,l,xa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,xa.x),m.addScaledVector(f,xa.y),m.addScaledVector(p,xa.z),m)}static getInterpolatedAttribute(t,i,s,l,c,f){return Gh.setScalar(0),Vh.setScalar(0),kh.setScalar(0),Gh.fromBufferAttribute(t,i),Vh.fromBufferAttribute(t,s),kh.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Gh,c.x),f.addScaledVector(Vh,c.y),f.addScaledVector(kh,c.z),f}static isFrontFacing(t,i,s,l){return Oi.subVectors(s,i),_a.subVectors(t,i),Oi.cross(_a).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Oi.subVectors(this.c,this.b),_a.subVectors(this.a,this.b),Oi.cross(_a).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Bi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return Bi.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return Bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let f,p;Tr.subVectors(l,s),Ar.subVectors(c,s),Ih.subVectors(t,s);const m=Tr.dot(Ih),d=Ar.dot(Ih);if(m<=0&&d<=0)return i.copy(s);Fh.subVectors(t,l);const v=Tr.dot(Fh),_=Ar.dot(Fh);if(v>=0&&_<=v)return i.copy(l);const g=m*_-v*d;if(g<=0&&m>=0&&v<=0)return f=m/(m-v),i.copy(s).addScaledVector(Tr,f);Hh.subVectors(t,c);const x=Tr.dot(Hh),b=Ar.dot(Hh);if(b>=0&&x<=b)return i.copy(c);const R=x*d-m*b;if(R<=0&&d>=0&&b<=0)return p=d/(d-b),i.copy(s).addScaledVector(Ar,p);const M=v*b-x*_;if(M<=0&&_-v>=0&&x-b>=0)return Uv.subVectors(c,l),p=(_-v)/(_-v+(x-b)),i.copy(l).addScaledVector(Uv,p);const S=1/(M+R+g);return f=R*S,p=g*S,i.copy(s).addScaledVector(Tr,f).addScaledVector(Ar,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class ll{constructor(t=new H(1/0,1/0,1/0),i=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Pi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Pi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Pi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,p=c.count;f<p;f++)t.isMesh===!0?t.getVertexPosition(f,Pi):Pi.fromBufferAttribute(c,f),Pi.applyMatrix4(t.matrixWorld),this.expandByPoint(Pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ac.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Ac.copy(s.boundingBox)),Ac.applyMatrix4(t.matrixWorld),this.union(Ac)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pi),Pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xo),wc.subVectors(this.max,Xo),wr.subVectors(t.a,Xo),Rr.subVectors(t.b,Xo),Cr.subVectors(t.c,Xo),is.subVectors(Rr,wr),as.subVectors(Cr,Rr),Us.subVectors(wr,Cr);let i=[0,-is.z,is.y,0,-as.z,as.y,0,-Us.z,Us.y,is.z,0,-is.x,as.z,0,-as.x,Us.z,0,-Us.x,-is.y,is.x,0,-as.y,as.x,0,-Us.y,Us.x,0];return!Xh(i,wr,Rr,Cr,wc)||(i=[1,0,0,0,1,0,0,0,1],!Xh(i,wr,Rr,Cr,wc))?!1:(Rc.crossVectors(is,as),i=[Rc.x,Rc.y,Rc.z],Xh(i,wr,Rr,Cr,wc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Sa=[new H,new H,new H,new H,new H,new H,new H,new H],Pi=new H,Ac=new ll,wr=new H,Rr=new H,Cr=new H,is=new H,as=new H,Us=new H,Xo=new H,wc=new H,Rc=new H,Ls=new H;function Xh(r,t,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Ls.fromArray(r,c);const p=l.x*Math.abs(Ls.x)+l.y*Math.abs(Ls.y)+l.z*Math.abs(Ls.z),m=t.dot(Ls),d=i.dot(Ls),v=s.dot(Ls);if(Math.max(-Math.max(m,d,v),Math.min(m,d,v))>p)return!1}return!0}const gn=new H,Cc=new Qt;let XM=0;class ni extends Vs{constructor(t,i,s=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:XM++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=cM,this.updateRanges=[],this.gpuType=Ki,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Cc.fromBufferAttribute(this,i),Cc.applyMatrix3(t),this.setXY(i,Cc.x,Cc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)gn.fromBufferAttribute(this,i),gn.applyMatrix3(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)gn.fromBufferAttribute(this,i),gn.applyMatrix4(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)gn.fromBufferAttribute(this,i),gn.applyNormalMatrix(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)gn.fromBufferAttribute(this,i),gn.transformDirection(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=zr(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Wn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=zr(i,this.array)),i}setX(t,i){return this.normalized&&(i=Wn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=zr(i,this.array)),i}setY(t,i){return this.normalized&&(i=Wn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=zr(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Wn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=zr(i,this.array)),i}setW(t,i){return this.normalized&&(i=Wn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Wn(i,this.array),s=Wn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Wn(i,this.array),s=Wn(s,this.array),l=Wn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=Wn(i,this.array),s=Wn(s,this.array),l=Wn(l,this.array),c=Wn(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Z_ extends ni{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class K_ extends ni{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class we extends ni{constructor(t,i,s){super(new Float32Array(t),i,s)}}const WM=new ll,Wo=new H,Wh=new H;class ou{constructor(t=new H,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):WM.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Wo.subVectors(t,this.center);const i=Wo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Wo,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Wo.copy(t.center).add(Wh)),this.expandByPoint(Wo.copy(t.center).sub(Wh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let qM=0;const wi=new Ie,qh=new Cn,Dr=new H,pi=new ll,qo=new ll,Rn=new H;class xn extends Vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qM++}),this.uuid=qr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(uM(t)?K_:Z_)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new re().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return wi.makeRotationFromQuaternion(t),this.applyMatrix4(wi),this}rotateX(t){return wi.makeRotationX(t),this.applyMatrix4(wi),this}rotateY(t){return wi.makeRotationY(t),this.applyMatrix4(wi),this}rotateZ(t){return wi.makeRotationZ(t),this.applyMatrix4(wi),this}translate(t,i,s){return wi.makeTranslation(t,i,s),this.applyMatrix4(wi),this}scale(t,i,s){return wi.makeScale(t,i,s),this.applyMatrix4(wi),this}lookAt(t){return qh.lookAt(t),qh.updateMatrix(),this.applyMatrix4(qh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Dr).negate(),this.translate(Dr.x,Dr.y,Dr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new we(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ll);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];pi.setFromBufferAttribute(c),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,pi.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,pi.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(pi.min),this.boundingBox.expandByPoint(pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ae('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ou);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){const s=this.boundingSphere.center;if(pi.setFromBufferAttribute(t),i)for(let c=0,f=i.length;c<f;c++){const p=i[c];qo.setFromBufferAttribute(p),this.morphTargetsRelative?(Rn.addVectors(pi.min,qo.min),pi.expandByPoint(Rn),Rn.addVectors(pi.max,qo.max),pi.expandByPoint(Rn)):(pi.expandByPoint(qo.min),pi.expandByPoint(qo.max))}pi.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)Rn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(Rn));if(i)for(let c=0,f=i.length;c<f;c++){const p=i[c],m=this.morphTargetsRelative;for(let d=0,v=p.count;d<v;d++)Rn.fromBufferAttribute(p,d),m&&(Dr.fromBufferAttribute(t,d),Rn.add(Dr)),l=Math.max(l,s.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ae('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ae("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==s.count)&&(f=new ni(new Float32Array(4*s.count),4),this.setAttribute("tangent",f));const p=[],m=[];for(let E=0;E<s.count;E++)p[E]=new H,m[E]=new H;const d=new H,v=new H,_=new H,g=new Qt,x=new Qt,b=new Qt,R=new H,M=new H;function S(E,L,F){d.fromBufferAttribute(s,E),v.fromBufferAttribute(s,L),_.fromBufferAttribute(s,F),g.fromBufferAttribute(c,E),x.fromBufferAttribute(c,L),b.fromBufferAttribute(c,F),v.sub(d),_.sub(d),x.sub(g),b.sub(g);const k=1/(x.x*b.y-b.x*x.y);isFinite(k)&&(R.copy(v).multiplyScalar(b.y).addScaledVector(_,-x.y).multiplyScalar(k),M.copy(_).multiplyScalar(x.x).addScaledVector(v,-b.x).multiplyScalar(k),p[E].add(R),p[L].add(R),p[F].add(R),m[E].add(M),m[L].add(M),m[F].add(M))}let U=this.groups;U.length===0&&(U=[{start:0,count:t.count}]);for(let E=0,L=U.length;E<L;++E){const F=U[E],k=F.start,G=F.count;for(let J=k,X=k+G;J<X;J+=3)S(t.getX(J+0),t.getX(J+1),t.getX(J+2))}const P=new H,A=new H,N=new H,O=new H;function C(E){N.fromBufferAttribute(l,E),O.copy(N);const L=p[E];P.copy(L),P.sub(N.multiplyScalar(N.dot(L))).normalize(),A.crossVectors(O,L);const k=A.dot(m[E])<0?-1:1;f.setXYZW(E,P.x,P.y,P.z,k)}for(let E=0,L=U.length;E<L;++E){const F=U[E],k=F.start,G=F.count;for(let J=k,X=k+G;J<X;J+=3)C(t.getX(J+0)),C(t.getX(J+1)),C(t.getX(J+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new ni(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,x=s.count;g<x;g++)s.setXYZ(g,0,0,0);const l=new H,c=new H,f=new H,p=new H,m=new H,d=new H,v=new H,_=new H;if(t)for(let g=0,x=t.count;g<x;g+=3){const b=t.getX(g+0),R=t.getX(g+1),M=t.getX(g+2);l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,R),f.fromBufferAttribute(i,M),v.subVectors(f,c),_.subVectors(l,c),v.cross(_),p.fromBufferAttribute(s,b),m.fromBufferAttribute(s,R),d.fromBufferAttribute(s,M),p.add(v),m.add(v),d.add(v),s.setXYZ(b,p.x,p.y,p.z),s.setXYZ(R,m.x,m.y,m.z),s.setXYZ(M,d.x,d.y,d.z)}else for(let g=0,x=i.count;g<x;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),v.subVectors(f,c),_.subVectors(l,c),v.cross(_),s.setXYZ(g+0,v.x,v.y,v.z),s.setXYZ(g+1,v.x,v.y,v.z),s.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)Rn.fromBufferAttribute(t,i),Rn.normalize(),t.setXYZ(i,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function t(p,m){const d=p.array,v=p.itemSize,_=p.normalized,g=new d.constructor(m.length*v);let x=0,b=0;for(let R=0,M=m.length;R<M;R++){p.isInterleavedBufferAttribute?x=m[R]*p.data.stride+p.offset:x=m[R]*v;for(let S=0;S<v;S++)g[b++]=d[x++]}return new ni(g,v,_)}if(this.index===null)return ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new xn,s=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=t(m,s);i.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let v=0,_=d.length;v<_;v++){const g=d[v],x=t(g,s);m.push(x)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let p=0,m=f.length;p<m;p++){const d=f[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const d=s[m];t.data.attributes[m]=d.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],v=[];for(let _=0,g=d.length;_<g;_++){const x=d[_];v.push(x.toJSON(t.data))}v.length>0&&(l[m]=v,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const d in l){const v=l[d];this.setAttribute(d,v.clone(i))}const c=t.morphAttributes;for(const d in c){const v=[],_=c[d];for(let g=0,x=_.length;g<x;g++)v.push(_[g].clone(i));this.morphAttributes[d]=v}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let d=0,v=f.length;d<v;d++){const _=f[d];this.addGroup(_.start,_.count,_.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yh=new H,YM=new H,ZM=new re;class Ma{constructor(t=new H(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=Yh.subVectors(s,i).cross(YM.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,s=!0){const l=t.delta(Yh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const f=-(t.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(t.start).addScaledVector(l,f)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||ZM.getNormalMatrix(t),l=this.coplanarPoint(Yh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let KM=0;class Yr extends Vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:KM++}),this.uuid=qr(),this.name="",this.type="Material",this.blending=Jo,this.side=ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=R_,this.blendDst=C_,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=nl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rh,this.stencilZFail=Rh,this.stencilZPass=Rh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){ne(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ne(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const p in c){const m=c[p];delete m.metadata,f.push(m)}return f}if(i){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(s=>new Ma().fromJSON(s))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new Qt().fromArray(s)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Qt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ya=new H,Zh=new H,Dc=new H,Uc=new H;class fp{constructor(t=new H,i=new H(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ya)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=ya.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(ya.copy(this.origin).addScaledVector(this.direction,i),ya.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){Zh.copy(t).add(i).multiplyScalar(.5),Dc.copy(i).sub(t).normalize(),Uc.copy(this.origin).sub(Zh);const c=t.distanceTo(i)*.5,f=-this.direction.dot(Dc),p=Uc.dot(this.direction),m=-Uc.dot(Dc),d=Uc.lengthSq(),v=Math.abs(1-f*f);let _,g,x,b;if(v>0)if(_=f*m-p,g=f*p-m,b=c*v,_>=0)if(g>=-b)if(g<=b){const R=1/v;_*=R,g*=R,x=_*(_+f*g+2*p)+g*(f*_+g+2*m)+d}else g=c,_=Math.max(0,-(f*g+p)),x=-_*_+g*(g+2*m)+d;else g=-c,_=Math.max(0,-(f*g+p)),x=-_*_+g*(g+2*m)+d;else g<=-b?(_=Math.max(0,-(-f*c+p)),g=_>0?-c:Math.min(Math.max(-c,-m),c),x=-_*_+g*(g+2*m)+d):g<=b?(_=0,g=Math.min(Math.max(-c,-m),c),x=g*(g+2*m)+d):(_=Math.max(0,-(f*c+p)),g=_>0?c:Math.min(Math.max(-c,-m),c),x=-_*_+g*(g+2*m)+d);else g=f>0?-c:c,_=Math.max(0,-(f*g+p)),x=-_*_+g*(g+2*m)+d;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Zh).addScaledVector(Dc,g),x}intersectSphere(t,i){if(t.radius<0)return null;ya.subVectors(t.center,this.origin);const s=ya.dot(this.direction),l=ya.dot(ya)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),p=s-f,m=s+f;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,f,p,m;const d=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return d>=0?(s=(t.min.x-g.x)*d,l=(t.max.x-g.x)*d):(s=(t.max.x-g.x)*d,l=(t.min.x-g.x)*d),v>=0?(c=(t.min.y-g.y)*v,f=(t.max.y-g.y)*v):(c=(t.max.y-g.y)*v,f=(t.min.y-g.y)*v),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(p=(t.min.z-g.z)*_,m=(t.max.z-g.z)*_):(p=(t.max.z-g.z)*_,m=(t.min.z-g.z)*_),s>m||p>l)||((p>s||s!==s)&&(s=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,ya)!==null}intersectTriangle(t,i,s,l,c){const f=this.origin,p=this.direction,m=p.x,d=p.y,v=p.z,_=t.x-f.x,g=t.y-f.y,x=t.z-f.z,b=i.x-f.x,R=i.y-f.y,M=i.z-f.z,S=s.x-f.x,U=s.y-f.y,P=s.z-f.z,A=Math.abs(m),N=Math.abs(d),O=Math.abs(v);let C,E,L,F,k,G,J,X,$,I,W,ot;if(A>=N&&A>=O?(L=m,G=_,$=b,ot=S,m>=0?(C=d,E=v,F=g,k=x,J=R,X=M,I=U,W=P):(C=v,E=d,F=x,k=g,J=M,X=R,I=P,W=U)):N>=O?(L=d,G=g,$=R,ot=U,d>=0?(C=v,E=m,F=x,k=_,J=M,X=b,I=P,W=S):(C=m,E=v,F=_,k=x,J=b,X=M,I=S,W=P)):(L=v,G=x,$=M,ot=P,v>=0?(C=m,E=d,F=_,k=g,J=b,X=R,I=S,W=U):(C=d,E=m,F=g,k=_,J=R,X=b,I=U,W=S)),L===0)return null;const et=C/L,ft=E/L,z=1/L,tt=F-et*G,gt=k-ft*G,Et=J-et*$,Lt=X-ft*$,kt=I-et*ot,st=W-ft*ot,vt=kt*Lt-st*Et,Tt=tt*st-gt*kt,te=Et*gt-Lt*tt;if(l){if(vt<0||Tt<0||te<0)return null}else if((vt<0||Tt<0||te<0)&&(vt>0||Tt>0||te>0))return null;const Ft=vt+Tt+te;if(Ft===0)return null;const le=z*(vt*G+Tt*$+te*ot);return(Ft>0?le<0:le>0)?null:this.at(le/Ft,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Q_ extends Yr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cs,this.combine=D_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Lv=new Ie,Ns=new fp,Lc=new ou,Nv=new H,Nc=new H,Oc=new H,Pc=new H,Kh=new H,zc=new H,Ov=new H,Bc=new H;class tn extends Cn{constructor(t=new xn,i=new Q_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const p=this.morphTargetInfluences;if(c&&p){zc.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const v=p[m],_=c[m];v!==0&&(Kh.fromBufferAttribute(_,t),f?zc.addScaledVector(Kh,v):zc.addScaledVector(Kh.sub(i),v))}i.add(zc)}return i}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Lc.copy(s.boundingSphere),Lc.applyMatrix4(c),Ns.copy(t.ray).recast(t.near),!(Lc.containsPoint(Ns.origin)===!1&&(Ns.intersectSphere(Lc,Nv)===null||Ns.origin.distanceToSquared(Nv)>(t.far-t.near)**2))&&(Lv.copy(c).invert(),Ns.copy(t.ray).applyMatrix4(Lv),!(s.boundingBox!==null&&Ns.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,Ns)))}_computeIntersections(t,i,s){let l;const c=this.geometry,f=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,x=c.drawRange;if(p!==null)if(Array.isArray(f))for(let b=0,R=g.length;b<R;b++){const M=g[b],S=f[M.materialIndex],U=Math.max(M.start,x.start),P=Math.min(p.count,Math.min(M.start+M.count,x.start+x.count));for(let A=U,N=P;A<N;A+=3){const O=p.getX(A),C=p.getX(A+1),E=p.getX(A+2);l=Ic(this,S,t,s,d,v,_,O,C,E),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const b=Math.max(0,x.start),R=Math.min(p.count,x.start+x.count);for(let M=b,S=R;M<S;M+=3){const U=p.getX(M),P=p.getX(M+1),A=p.getX(M+2);l=Ic(this,f,t,s,d,v,_,U,P,A),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let b=0,R=g.length;b<R;b++){const M=g[b],S=f[M.materialIndex],U=Math.max(M.start,x.start),P=Math.min(m.count,Math.min(M.start+M.count,x.start+x.count));for(let A=U,N=P;A<N;A+=3){const O=A,C=A+1,E=A+2;l=Ic(this,S,t,s,d,v,_,O,C,E),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const b=Math.max(0,x.start),R=Math.min(m.count,x.start+x.count);for(let M=b,S=R;M<S;M+=3){const U=M,P=M+1,A=M+2;l=Ic(this,f,t,s,d,v,_,U,P,A),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function QM(r,t,i,s,l,c,f,p){let m;if(t.side===Hn?m=s.intersectTriangle(f,c,l,!0,p):m=s.intersectTriangle(l,c,f,t.side===ls,p),m===null)return null;Bc.copy(p),Bc.applyMatrix4(r.matrixWorld);const d=i.ray.origin.distanceTo(Bc);return d<i.near||d>i.far?null:{distance:d,point:Bc.clone(),object:r}}function Ic(r,t,i,s,l,c,f,p,m,d){r.getVertexPosition(p,Nc),r.getVertexPosition(m,Oc),r.getVertexPosition(d,Pc);const v=QM(r,t,i,s,Nc,Oc,Pc,Ov);if(v){const _=new H;Bi.getBarycoord(Ov,Nc,Oc,Pc,_),l&&(v.uv=Bi.getInterpolatedAttribute(l,p,m,d,_,new Qt)),c&&(v.uv1=Bi.getInterpolatedAttribute(c,p,m,d,_,new Qt)),f&&(v.normal=Bi.getInterpolatedAttribute(f,p,m,d,_,new H),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const g={a:p,b:m,c:d,normal:new H,materialIndex:0};Bi.getNormal(Nc,Oc,Pc,g.normal),v.face=g,v.barycoord=_}return v}class JM extends Gn{constructor(t=null,i=1,s=1,l,c,f,p,m,d=Pn,v=Pn,_,g){super(null,f,p,m,d,v,l,c,_,g),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Os=new ou,jM=new Qt(.5,.5),Fc=new H;class hp{constructor(t=new Ma,i=new Ma,s=new Ma,l=new Ma,c=new Ma,f=new Ma){this.planes=[t,i,s,l,c,f]}set(t,i,s,l,c,f){const p=this.planes;return p[0].copy(t),p[1].copy(i),p[2].copy(s),p[3].copy(l),p[4].copy(c),p[5].copy(f),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=Qi,s=!1){const l=this.planes,c=t.elements,f=c[0],p=c[1],m=c[2],d=c[3],v=c[4],_=c[5],g=c[6],x=c[7],b=c[8],R=c[9],M=c[10],S=c[11],U=c[12],P=c[13],A=c[14],N=c[15];if(l[0].setComponents(d-f,x-v,S-b,N-U).normalize(),l[1].setComponents(d+f,x+v,S+b,N+U).normalize(),l[2].setComponents(d+p,x+_,S+R,N+P).normalize(),l[3].setComponents(d-p,x-_,S-R,N-P).normalize(),s)l[4].setComponents(m,g,M,A).normalize(),l[5].setComponents(d-m,x-g,S-M,N-A).normalize();else if(l[4].setComponents(d-m,x-g,S-M,N-A).normalize(),i===Qi)l[5].setComponents(d+m,x+g,S+M,N+A).normalize();else if(i===sl)l[5].setComponents(m,g,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Os.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(t){Os.center.set(0,0,0);const i=jM.distanceTo(t.center);return Os.radius=.7071067811865476+i,Os.applyMatrix4(t.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Fc.x=l.normal.x>0?t.max.x:t.min.x,Fc.y=l.normal.y>0?t.max.y:t.min.y,Fc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Fc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $M extends Yr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Pv=new Ie,qd=new fp,Hc=new ou,Gc=new H;class J_ extends Cn{constructor(t=new xn,i=new $M){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Hc.copy(s.boundingSphere),Hc.applyMatrix4(l),Hc.radius+=c,t.ray.intersectsSphere(Hc)===!1)return;Pv.copy(l).invert(),qd.copy(t.ray).applyMatrix4(Pv);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=s.index,_=s.attributes.position;if(d!==null){const g=Math.max(0,f.start),x=Math.min(d.count,f.start+f.count);for(let b=g,R=x;b<R;b++){const M=d.getX(b);Gc.fromBufferAttribute(_,M),zv(Gc,M,m,l,t,i,this)}}else{const g=Math.max(0,f.start),x=Math.min(_.count,f.start+f.count);for(let b=g,R=x;b<R;b++)Gc.fromBufferAttribute(_,b),zv(Gc,b,m,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function zv(r,t,i,s,l,c,f){const p=qd.distanceSqToPoint(r);if(p<i){const m=new H;qd.closestPointToPoint(r,m),m.applyMatrix4(s);const d=l.ray.origin.distanceTo(m);if(d<l.near||d>l.far)return;c.push({distance:d,distanceToRay:Math.sqrt(p),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class j_ extends Gn{constructor(t=[],i=Hs,s,l,c,f,p,m,d,v){super(t,i,s,l,c,f,p,m,d,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class t1 extends Gn{constructor(t,i,s,l,c,f,p,m,d){super(t,i,s,l,c,f,p,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ol extends Gn{constructor(t,i,s=ji,l,c,f,p=Pn,m=Pn,d,v=Aa,_=1){if(v!==Aa&&v!==Is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:i,depth:_};super(g,l,c,f,p,m,v,s,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new lp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return i.compareFunction=this.compareFunction,i}}class e1 extends ol{constructor(t,i=ji,s=Hs,l,c,f=Pn,p=Pn,m,d=Aa){const v={width:t,height:t,depth:1},_=[v,v,v,v,v,v];super(t,t,i,s,l,c,f,p,m,d),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class $_ extends Gn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class cl extends xn{constructor(t=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const p=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],d=[],v=[],_=[];let g=0,x=0;b("z","y","x",-1,-1,s,i,t,f,c,0),b("z","y","x",1,-1,s,i,-t,f,c,1),b("x","z","y",1,1,t,s,i,l,f,2),b("x","z","y",1,-1,t,s,-i,l,f,3),b("x","y","z",1,-1,t,i,s,l,c,4),b("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new we(d,3)),this.setAttribute("normal",new we(v,3)),this.setAttribute("uv",new we(_,2));function b(R,M,S,U,P,A,N,O,C,E,L){const F=A/C,k=N/E,G=A/2,J=N/2,X=O/2,$=C+1,I=E+1;let W=0,ot=0;const et=new H;for(let ft=0;ft<I;ft++){const z=ft*k-J;for(let tt=0;tt<$;tt++){const gt=tt*F-G;et[R]=gt*U,et[M]=z*P,et[S]=X,d.push(et.x,et.y,et.z),et[R]=0,et[M]=0,et[S]=O>0?1:-1,v.push(et.x,et.y,et.z),_.push(tt/C),_.push(1-ft/E),W+=1}}for(let ft=0;ft<E;ft++)for(let z=0;z<C;z++){const tt=g+z+$*ft,gt=g+z+$*(ft+1),Et=g+(z+1)+$*(ft+1),Lt=g+(z+1)+$*ft;m.push(tt,gt,Lt),m.push(gt,Et,Lt),ot+=6}p.addGroup(x,ot,L),x+=ot,g+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class dp extends xn{constructor(t=1,i=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:s,thetaLength:l},i=Math.max(3,i);const c=[],f=[],p=[],m=[],d=new H,v=new Qt;f.push(0,0,0),p.push(0,0,1),m.push(.5,.5);for(let _=0,g=3;_<=i;_++,g+=3){const x=s+_/i*l;d.x=t*Math.cos(x),d.y=t*Math.sin(x),f.push(d.x,d.y,d.z),p.push(0,0,1),v.x=(f[g]/t+1)/2,v.y=(f[g+1]/t+1)/2,m.push(v.x,v.y)}for(let _=1;_<=i;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new we(f,3)),this.setAttribute("normal",new we(p,3)),this.setAttribute("uv",new we(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dp(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class pp extends xn{constructor(t=[],i=[],s=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:i,radius:s,detail:l};const c=[],f=[];p(l),d(s),v(),this.setAttribute("position",new we(c,3)),this.setAttribute("normal",new we(c.slice(),3)),this.setAttribute("uv",new we(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function p(U){const P=new H,A=new H,N=new H;for(let O=0;O<i.length;O+=3)x(i[O+0],P),x(i[O+1],A),x(i[O+2],N),m(P,A,N,U)}function m(U,P,A,N){const O=N+1,C=[];for(let E=0;E<=O;E++){C[E]=[];const L=U.clone().lerp(A,E/O),F=P.clone().lerp(A,E/O),k=O-E;for(let G=0;G<=k;G++)G===0&&E===O?C[E][G]=L:C[E][G]=L.clone().lerp(F,G/k)}for(let E=0;E<O;E++)for(let L=0;L<2*(O-E)-1;L++){const F=Math.floor(L/2);L%2===0?(g(C[E][F+1]),g(C[E+1][F]),g(C[E][F])):(g(C[E][F+1]),g(C[E+1][F+1]),g(C[E+1][F]))}}function d(U){const P=new H;for(let A=0;A<c.length;A+=3)P.x=c[A+0],P.y=c[A+1],P.z=c[A+2],P.normalize().multiplyScalar(U),c[A+0]=P.x,c[A+1]=P.y,c[A+2]=P.z}function v(){const U=new H;for(let P=0;P<c.length;P+=3){U.x=c[P+0],U.y=c[P+1],U.z=c[P+2];const A=M(U)/2/Math.PI+.5,N=S(U)/Math.PI+.5;f.push(A,1-N)}b(),_()}function _(){for(let U=0;U<f.length;U+=6){const P=f[U+0],A=f[U+2],N=f[U+4],O=Math.max(P,A,N),C=Math.min(P,A,N);O>.9&&C<.1&&(P<.2&&(f[U+0]+=1),A<.2&&(f[U+2]+=1),N<.2&&(f[U+4]+=1))}}function g(U){c.push(U.x,U.y,U.z)}function x(U,P){const A=U*3;P.x=t[A+0],P.y=t[A+1],P.z=t[A+2]}function b(){const U=new H,P=new H,A=new H,N=new H,O=new Qt,C=new Qt,E=new Qt;for(let L=0,F=0;L<c.length;L+=9,F+=6){U.set(c[L+0],c[L+1],c[L+2]),P.set(c[L+3],c[L+4],c[L+5]),A.set(c[L+6],c[L+7],c[L+8]),O.set(f[F+0],f[F+1]),C.set(f[F+2],f[F+3]),E.set(f[F+4],f[F+5]),N.copy(U).add(P).add(A).divideScalar(3);const k=M(N);R(O,F+0,U,k),R(C,F+2,P,k),R(E,F+4,A,k)}}function R(U,P,A,N){N<0&&U.x===1&&(f[P]=U.x-1),A.x===0&&A.z===0&&(f[P]=N/2/Math.PI+.5)}function M(U){return Math.atan2(U.z,-U.x)}function S(U){return Math.atan2(-U.y,Math.sqrt(U.x*U.x+U.z*U.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pp(t.vertices,t.indices,t.radius,t.detail)}}class wa{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ne("Curve: .getPoint() not implemented.")}getPointAt(t,i){const s=this.getUtoTmapping(t);return this.getPoint(s,i)}getPoints(t=5){const i=[];for(let s=0;s<=t;s++)i.push(this.getPoint(s/t));return i}getSpacedPoints(t=5){const i=[];for(let s=0;s<=t;s++)i.push(this.getPointAt(s/t));return i}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const i=[];let s,l=this.getPoint(0),c=0;i.push(0);for(let f=1;f<=t;f++)s=this.getPoint(f/t),c+=s.distanceTo(l),i.push(c),l=s;return this.cacheArcLengths=i,i}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,i=null){const s=this.getLengths();let l=0;const c=s.length;let f;i?f=i:f=t*s[c-1];let p=0,m=c-1,d;for(;p<=m;)if(l=Math.floor(p+(m-p)/2),d=s[l]-f,d<0)p=l+1;else if(d>0)m=l-1;else{m=l;break}if(l=m,s[l]===f)return l/(c-1);const v=s[l],g=s[l+1]-v,x=(f-v)/g;return(l+x)/(c-1)}getTangent(t,i){let l=t-1e-4,c=t+1e-4;l<0&&(l=0),c>1&&(c=1);const f=this.getPoint(l),p=this.getPoint(c),m=i||(f.isVector2?new Qt:new H);return m.copy(p).sub(f).normalize(),m}getTangentAt(t,i){const s=this.getUtoTmapping(t);return this.getTangent(s,i)}computeFrenetFrames(t,i=!1){const s=new H,l=[],c=[],f=[],p=new H,m=new Ie;for(let x=0;x<=t;x++){const b=x/t;l[x]=this.getTangentAt(b,new H)}c[0]=new H,f[0]=new H;let d=Number.MAX_VALUE;const v=Math.abs(l[0].x),_=Math.abs(l[0].y),g=Math.abs(l[0].z);v<=d&&(d=v,s.set(1,0,0)),_<=d&&(d=_,s.set(0,1,0)),g<=d&&s.set(0,0,1),p.crossVectors(l[0],s).normalize(),c[0].crossVectors(l[0],p),f[0].crossVectors(l[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),f[x]=f[x-1].clone(),p.crossVectors(l[x-1],l[x]),p.length()>Number.EPSILON){p.normalize();const b=Math.acos(me(l[x-1].dot(l[x]),-1,1));c[x].applyMatrix4(m.makeRotationAxis(p,b))}f[x].crossVectors(l[x],c[x])}if(i===!0){let x=Math.acos(me(c[0].dot(c[t]),-1,1));x/=t,l[0].dot(p.crossVectors(c[0],c[t]))>0&&(x=-x);for(let b=1;b<=t;b++)c[b].applyMatrix4(m.makeRotationAxis(l[b],x*b)),f[b].crossVectors(l[b],c[b])}return{tangents:l,normals:c,binormals:f}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class tx extends wa{constructor(t=0,i=0,s=1,l=1,c=0,f=Math.PI*2,p=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=i,this.xRadius=s,this.yRadius=l,this.aStartAngle=c,this.aEndAngle=f,this.aClockwise=p,this.aRotation=m}getPoint(t,i=new Qt){const s=i,l=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const f=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=l;for(;c>l;)c-=l;c<Number.EPSILON&&(f?c=0:c=l),this.aClockwise===!0&&!f&&(c===l?c=-l:c=c-l);const p=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(p),d=this.aY+this.yRadius*Math.sin(p);if(this.aRotation!==0){const v=Math.cos(this.aRotation),_=Math.sin(this.aRotation),g=m-this.aX,x=d-this.aY;m=g*v-x*_+this.aX,d=g*_+x*v+this.aY}return s.set(m,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class n1 extends tx{constructor(t,i,s,l,c,f){super(t,i,s,s,l,c,f),this.isArcCurve=!0,this.type="ArcCurve"}}function mp(){let r=0,t=0,i=0,s=0;function l(c,f,p,m){r=c,t=p,i=-3*c+3*f-2*p-m,s=2*c-2*f+p+m}return{initCatmullRom:function(c,f,p,m,d){l(f,p,d*(p-c),d*(m-f))},initNonuniformCatmullRom:function(c,f,p,m,d,v,_){let g=(f-c)/d-(p-c)/(d+v)+(p-f)/v,x=(p-f)/v-(m-f)/(v+_)+(m-p)/_;g*=v,x*=v,l(f,p,g,x)},calc:function(c){const f=c*c,p=f*c;return r+t*c+i*f+s*p}}}const Bv=new H,Iv=new H,Qh=new mp,Jh=new mp,jh=new mp;class ul extends wa{constructor(t=[],i=!1,s="centripetal",l=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=i,this.curveType=s,this.tension=l}getPoint(t,i=new H){const s=i,l=this.points,c=l.length,f=(c-(this.closed?0:1))*t;let p=Math.floor(f),m=f-p;this.closed?p+=p>0?0:(Math.floor(Math.abs(p)/c)+1)*c:m===0&&p===c-1&&(p=c-2,m=1);let d,v;this.closed||p>0?d=l[(p-1)%c]:(Iv.subVectors(l[0],l[1]).add(l[0]),d=Iv);const _=l[p%c],g=l[(p+1)%c];if(this.closed||p+2<c?v=l[(p+2)%c]:(Bv.subVectors(l[c-1],l[c-2]).add(l[c-1]),v=Bv),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let b=Math.pow(d.distanceToSquared(_),x),R=Math.pow(_.distanceToSquared(g),x),M=Math.pow(g.distanceToSquared(v),x);R<1e-4&&(R=1),b<1e-4&&(b=R),M<1e-4&&(M=R),Qh.initNonuniformCatmullRom(d.x,_.x,g.x,v.x,b,R,M),Jh.initNonuniformCatmullRom(d.y,_.y,g.y,v.y,b,R,M),jh.initNonuniformCatmullRom(d.z,_.z,g.z,v.z,b,R,M)}else this.curveType==="catmullrom"&&(Qh.initCatmullRom(d.x,_.x,g.x,v.x,this.tension),Jh.initCatmullRom(d.y,_.y,g.y,v.y,this.tension),jh.initCatmullRom(d.z,_.z,g.z,v.z,this.tension));return s.set(Qh.calc(m),Jh.calc(m),jh.calc(m)),s}copy(t){super.copy(t),this.points=[];for(let i=0,s=t.points.length;i<s;i++){const l=t.points[i];this.points.push(l.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let i=0,s=this.points.length;i<s;i++){const l=this.points[i];t.points.push(l.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let i=0,s=t.points.length;i<s;i++){const l=t.points[i];this.points.push(new H().fromArray(l))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Fv(r,t,i,s,l){const c=(s-t)*.5,f=(l-i)*.5,p=r*r,m=r*p;return(2*i-2*s+c+f)*m+(-3*i+3*s-2*c-f)*p+c*r+i}function i1(r,t){const i=1-r;return i*i*t}function a1(r,t){return 2*(1-r)*r*t}function s1(r,t){return r*r*t}function tl(r,t,i,s){return i1(r,t)+a1(r,i)+s1(r,s)}function r1(r,t){const i=1-r;return i*i*i*t}function o1(r,t){const i=1-r;return 3*i*i*r*t}function l1(r,t){return 3*(1-r)*r*r*t}function c1(r,t){return r*r*r*t}function el(r,t,i,s,l){return r1(r,t)+o1(r,i)+l1(r,s)+c1(r,l)}class u1 extends wa{constructor(t=new Qt,i=new Qt,s=new Qt,l=new Qt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=i,this.v2=s,this.v3=l}getPoint(t,i=new Qt){const s=i,l=this.v0,c=this.v1,f=this.v2,p=this.v3;return s.set(el(t,l.x,c.x,f.x,p.x),el(t,l.y,c.y,f.y,p.y)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class f1 extends wa{constructor(t=new H,i=new H,s=new H,l=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=i,this.v2=s,this.v3=l}getPoint(t,i=new H){const s=i,l=this.v0,c=this.v1,f=this.v2,p=this.v3;return s.set(el(t,l.x,c.x,f.x,p.x),el(t,l.y,c.y,f.y,p.y),el(t,l.z,c.z,f.z,p.z)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class h1 extends wa{constructor(t=new Qt,i=new Qt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=i}getPoint(t,i=new Qt){const s=i;return t===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(t).add(this.v1)),s}getPointAt(t,i){return this.getPoint(t,i)}getTangent(t,i=new Qt){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,i){return this.getTangent(t,i)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class d1 extends wa{constructor(t=new H,i=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=i}getPoint(t,i=new H){const s=i;return t===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(t).add(this.v1)),s}getPointAt(t,i){return this.getPoint(t,i)}getTangent(t,i=new H){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,i){return this.getTangent(t,i)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class p1 extends wa{constructor(t=new Qt,i=new Qt,s=new Qt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=i,this.v2=s}getPoint(t,i=new Qt){const s=i,l=this.v0,c=this.v1,f=this.v2;return s.set(tl(t,l.x,c.x,f.x),tl(t,l.y,c.y,f.y)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ex extends wa{constructor(t=new H,i=new H,s=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=i,this.v2=s}getPoint(t,i=new H){const s=i,l=this.v0,c=this.v1,f=this.v2;return s.set(tl(t,l.x,c.x,f.x),tl(t,l.y,c.y,f.y),tl(t,l.z,c.z,f.z)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class m1 extends wa{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,i=new Qt){const s=i,l=this.points,c=(l.length-1)*t,f=Math.floor(c),p=c-f,m=l[f===0?f:f-1],d=l[f],v=l[f>l.length-2?l.length-1:f+1],_=l[f>l.length-3?l.length-1:f+2];return s.set(Fv(p,m.x,d.x,v.x,_.x),Fv(p,m.y,d.y,v.y,_.y)),s}copy(t){super.copy(t),this.points=[];for(let i=0,s=t.points.length;i<s;i++){const l=t.points[i];this.points.push(l.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let i=0,s=this.points.length;i<s;i++){const l=this.points[i];t.points.push(l.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let i=0,s=t.points.length;i<s;i++){const l=t.points[i];this.points.push(new Qt().fromArray(l))}return this}}var g1=Object.freeze({__proto__:null,ArcCurve:n1,CatmullRomCurve3:ul,CubicBezierCurve:u1,CubicBezierCurve3:f1,EllipseCurve:tx,LineCurve:h1,LineCurve3:d1,QuadraticBezierCurve:p1,QuadraticBezierCurve3:ex,SplineCurve:m1});class gp extends pp{constructor(t=1,i=0){const s=(1+Math.sqrt(5))/2,l=[-1,s,0,1,s,0,-1,-s,0,1,-s,0,0,-1,s,0,1,s,0,-1,-s,0,1,-s,s,0,-1,s,0,1,-s,0,-1,-s,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,i),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new gp(t.radius,t.detail)}}class lu extends xn{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,f=i/2,p=Math.floor(s),m=Math.floor(l),d=p+1,v=m+1,_=t/p,g=i/m,x=[],b=[],R=[],M=[];for(let S=0;S<v;S++){const U=S*g-f;for(let P=0;P<d;P++){const A=P*_-c;b.push(A,-U,0),R.push(0,0,1),M.push(P/p),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let U=0;U<p;U++){const P=U+d*S,A=U+d*(S+1),N=U+1+d*(S+1),O=U+1+d*S;x.push(P,A,O),x.push(A,N,O)}this.setIndex(x),this.setAttribute("position",new we(b,3)),this.setAttribute("normal",new we(R,3)),this.setAttribute("uv",new we(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lu(t.width,t.height,t.widthSegments,t.heightSegments)}}class vp extends xn{constructor(t=.5,i=1,s=32,l=1,c=0,f=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:i,thetaSegments:s,phiSegments:l,thetaStart:c,thetaLength:f},s=Math.max(3,s),l=Math.max(1,l);const p=[],m=[],d=[],v=[];let _=t;const g=(i-t)/l,x=new H,b=new Qt;for(let R=0;R<=l;R++){for(let M=0;M<=s;M++){const S=c+M/s*f;x.x=_*Math.cos(S),x.y=_*Math.sin(S),m.push(x.x,x.y,x.z),d.push(0,0,1),b.x=(x.x/i+1)/2,b.y=(x.y/i+1)/2,v.push(b.x,b.y)}_+=g}for(let R=0;R<l;R++){const M=R*(s+1);for(let S=0;S<s;S++){const U=S+M,P=U,A=U+s+1,N=U+s+2,O=U+1;p.push(P,A,O),p.push(A,N,O)}}this.setIndex(p),this.setAttribute("position",new we(m,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vp(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Br extends xn{constructor(t=1,i=32,s=16,l=0,c=Math.PI*2,f=0,p=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:p},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+p,Math.PI);let d=0;const v=[],_=new H,g=new H,x=[],b=[],R=[],M=[];for(let S=0;S<=s;S++){const U=[],P=S/s,A=f+P*p,N=t*Math.cos(A),O=Math.sqrt(t*t-N*N);let C=0;S===0&&f===0?C=.5/i:S===s&&m===Math.PI&&(C=-.5/i);for(let E=0;E<=i;E++){const L=E/i,F=l+L*c;_.x=-O*Math.cos(F),_.y=N,_.z=O*Math.sin(F),b.push(_.x,_.y,_.z),g.copy(_).normalize(),R.push(g.x,g.y,g.z),M.push(L+C,1-P),U.push(d++)}v.push(U)}for(let S=0;S<s;S++)for(let U=0;U<i;U++){const P=v[S][U+1],A=v[S][U],N=v[S+1][U],O=v[S+1][U+1];(S!==0||f>0)&&x.push(P,A,O),(S!==s-1||m<Math.PI)&&x.push(A,N,O)}this.setIndex(x),this.setAttribute("position",new we(b,3)),this.setAttribute("normal",new we(R,3)),this.setAttribute("uv",new we(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Br(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class _p extends xn{constructor(t=new ex(new H(-1,-1,0),new H(-1,1,0),new H(1,1,0)),i=64,s=1,l=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:i,radius:s,radialSegments:l,closed:c};const f=t.computeFrenetFrames(i,c);this.tangents=f.tangents,this.normals=f.normals,this.binormals=f.binormals;const p=new H,m=new H,d=new Qt;let v=new H;const _=[],g=[],x=[],b=[];R(),this.setIndex(b),this.setAttribute("position",new we(_,3)),this.setAttribute("normal",new we(g,3)),this.setAttribute("uv",new we(x,2));function R(){for(let P=0;P<i;P++)M(P);M(c===!1?i:0),U(),S()}function M(P){v=t.getPointAt(P/i,v);const A=f.normals[P],N=f.binormals[P];for(let O=0;O<=l;O++){const C=O/l*Math.PI*2,E=Math.sin(C),L=-Math.cos(C);m.x=L*A.x+E*N.x,m.y=L*A.y+E*N.y,m.z=L*A.z+E*N.z,m.normalize(),g.push(m.x,m.y,m.z),p.x=v.x+s*m.x,p.y=v.y+s*m.y,p.z=v.z+s*m.z,_.push(p.x,p.y,p.z)}}function S(){for(let P=1;P<=i;P++)for(let A=1;A<=l;A++){const N=(l+1)*(P-1)+(A-1),O=(l+1)*P+(A-1),C=(l+1)*P+A,E=(l+1)*(P-1)+A;b.push(N,O,E),b.push(O,C,E)}}function U(){for(let P=0;P<=i;P++)for(let A=0;A<=l;A++)d.x=P/i,d.y=A/l,x.push(d.x,d.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new _p(new g1[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Xr(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];if(Hv(l))l.isRenderTargetTexture?(ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone();else if(Array.isArray(l))if(Hv(l[0])){const c=[];for(let f=0,p=l.length;f<p;f++)c[f]=l[f].clone();t[i][s]=c}else t[i][s]=l.slice();else t[i][s]=l}}return t}function qn(r){const t={};for(let i=0;i<r.length;i++){const s=Xr(r[i]);for(const l in s)t[l]=s[l]}return t}function Hv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function v1(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function nx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ee.workingColorSpace}const ix={clone:Xr,merge:qn};var _1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,x1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Yr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_1,this.fragmentShader=x1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xr(t.uniforms),this.uniformsGroups=v1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const s in t.uniforms){const l=t.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new ee().setHex(l.value);break;case"v2":this.uniforms[s].value=new Qt().fromArray(l.value);break;case"v3":this.uniforms[s].value=new H().fromArray(l.value);break;case"v4":this.uniforms[s].value=new Ze().fromArray(l.value);break;case"m3":this.uniforms[s].value=new re().fromArray(l.value);break;case"m4":this.uniforms[s].value=new Ie().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)this.extensions[s]=t.extensions[s];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class S1 extends _n{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class zs extends Yr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wd,this.normalScale=new Qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class y1 extends zs{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Qt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(i){this.ior=(1+.4*i)/(1-.4*i)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class M1 extends Yr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class E1 extends Yr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class cu extends Cn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=i}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}class b1 extends cu{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}toJSON(t){const i=super.toJSON(t);return i.object.groundColor=this.groundColor.getHex(),i}}const $h=new Ie,Gv=new H,Vv=new H;class ax{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Qt(512,512),this.mapType=gi,this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hp,this._frameExtents=new Qt(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera;Gv.setFromMatrixPosition(t.matrixWorld),i.position.copy(Gv),Vv.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(Vv),i.updateMatrixWorld(),this._updateMatrix(i,this.matrix,this._frustum)}_updateMatrix(t,i,s,l){$h.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),s.setFromProjectionMatrix($h,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,f=l?l.z/c.x:1,p=l?l.w/c.y:1,m=l?l.x/c.x:0,d=l?l.y/c.y:0;t.coordinateSystem===sl||t.reversedDepth?i.set(.5*f,0,0,.5*f+m,0,.5*p,0,.5*p+d,0,0,1,0,0,0,0,1):i.set(.5*f,0,0,.5*f+m,0,.5*p,0,.5*p+d,0,0,.5,.5,0,0,0,1),i.multiply($h)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Vc=new H,kc=new fs,qi=new H;class sx extends Cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=Qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Vc,kc,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vc,kc,qi.set(1,1,1)).invert()}updateWorldMatrix(t,i,s=!1){super.updateWorldMatrix(t,i,s),this.matrixWorld.decompose(Vc,kc,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vc,kc,qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ss=new H,kv=new Qt,Xv=new Qt;class mi extends sx{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=rl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(jo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rl*2*Math.atan(Math.tan(jo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ss.x,ss.y).multiplyScalar(-t/ss.z),ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ss.x,ss.y).multiplyScalar(-t/ss.z)}getViewSize(t,i){return this.getViewBounds(t,kv,Xv),i.subVectors(Xv,kv)}setViewOffset(t,i,s,l,c,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(jo*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,d=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/d,l*=f.width/m,s*=f.height/d}const p=this.filmOffset;p!==0&&(c+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class T1 extends ax{constructor(){super(new mi(90,1,.5,500)),this.isPointLightShadow=!0}}class Wv extends cu{constructor(t,i,s=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new T1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class xp extends sx{constructor(t=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,f=c+d*this.view.width,p-=v*this.view.offsetY,m=p-v*this.view.height}this.projectionMatrix.makeOrthographic(c,f,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class A1 extends ax{constructor(){super(new xp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qv extends cu{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.shadow=new A1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}const Ur=-90,Lr=1;class w1 extends Cn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new mi(Ur,Lr,t,i);l.layers=this.layers,this.add(l);const c=new mi(Ur,Lr,t,i);c.layers=this.layers,this.add(c);const f=new mi(Ur,Lr,t,i);f.layers=this.layers,this.add(f);const p=new mi(Ur,Lr,t,i);p.layers=this.layers,this.add(p);const m=new mi(Ur,Lr,t,i);m.layers=this.layers,this.add(m);const d=new mi(Ur,Lr,t,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,p,m]=i;for(const d of i)this.remove(d);if(t===Qi)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===sl)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of i)this.add(d),d.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,p,m,d,v]=this.children,_=t.getRenderTarget(),g=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const R=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(s,0,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(s,1,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,f),t.setRenderTarget(s,2,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),t.setRenderTarget(s,3,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(s,4,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),s.texture.generateMipmaps=R,t.setRenderTarget(s,5,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,v),t.setRenderTarget(_,g,x),t.xr.enabled=b,s.texture.needsPMREMUpdate=!0}}class R1 extends mi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Yv=new Ie;class C1{constructor(t,i,s=0,l=1/0){this.ray=new fp(t,i),this.near=s,this.far=l,this.camera=null,this.layers=new cp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,i.projectionMatrix.elements[14]).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):Ae("Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return Yv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yv),this}intersectObject(t,i=!0,s=[]){return Yd(t,this,s,i),s.sort(Zv),s}intersectObjects(t,i=!0,s=[]){for(let l=0,c=t.length;l<c;l++)Yd(t[l],this,s,i);return s.sort(Zv),s}}function Zv(r,t){return r.distance-t.distance}function Yd(r,t,i,s){let l=!0;if(r.layers.test(t.layers)&&r.raycast(t,i)===!1&&(l=!1),l===!0&&s===!0){const c=r.children;for(let f=0,p=c.length;f<p;f++)Yd(c[f],t,i,!0)}}const Tp=class Tp{constructor(t,i,s,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let s=0;s<4;s++)this.elements[s]=t[s+i];return this}set(t,i,s,l){const c=this.elements;return c[0]=t,c[2]=i,c[1]=s,c[3]=l,this}};Tp.prototype.isMatrix2=!0;let Kv=Tp;function Qv(r,t,i,s){const l=D1(s);switch(i){case V_:return r*t;case X_:return r*t/l.components*l.byteLength;case np:return r*t/l.components*l.byteLength;case Gs:return r*t*2/l.components*l.byteLength;case ip:return r*t*2/l.components*l.byteLength;case k_:return r*t*3/l.components*l.byteLength;case Ii:return r*t*4/l.components*l.byteLength;case ap:return r*t*4/l.components*l.byteLength;case Zc:case Kc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Qc:case Jc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case gd:case _d:return Math.max(r,16)*Math.max(t,8)/4;case md:case vd:return Math.max(r,8)*Math.max(t,8)/2;case xd:case Sd:case Md:case Ed:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case yd:case tu:case bd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Td:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ad:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case wd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Rd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Cd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Dd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Ud:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Ld:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Nd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Od:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Pd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case zd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Bd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Id:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Fd:case Hd:case Gd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Vd:case kd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case eu:case Xd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function D1(r){switch(r){case gi:case I_:return{byteLength:1,components:1};case il:case F_:case Fi:return{byteLength:2,components:1};case tp:case ep:return{byteLength:2,components:4};case ji:case $d:case Ki:return{byteLength:4,components:1};case H_:case G_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jd}}));typeof window<"u"&&(window.__THREE__?ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jd);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rx(){let r=null,t=!1,i=null,s=null;function l(c,f){s=r.requestAnimationFrame(l),i(c,f)}return{start:function(){t!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function U1(r){const t=new WeakMap;function i(p,m){const d=p.array,v=p.usage,_=d.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,d,v),p.onUploadCallback();let x;if(d instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)x=r.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=r.SHORT;else if(d instanceof Uint32Array)x=r.UNSIGNED_INT;else if(d instanceof Int32Array)x=r.INT;else if(d instanceof Int8Array)x=r.BYTE;else if(d instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:_}}function s(p,m,d){const v=m.array,_=m.updateRanges;if(r.bindBuffer(d,p),_.length===0)r.bufferSubData(d,0,v);else{_.sort((x,b)=>x.start-b.start);let g=0;for(let x=1;x<_.length;x++){const b=_[g],R=_[x];R.start<=b.start+b.count+1?b.count=Math.max(b.count,R.start+R.count-b.start):(++g,_[g]=R)}_.length=g+1;for(let x=0,b=_.length;x<b;x++){const R=_[x];r.bufferSubData(d,R.start*v.BYTES_PER_ELEMENT,v,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=t.get(p);m&&(r.deleteBuffer(m.buffer),t.delete(p))}function f(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const v=t.get(p);(!v||v.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=t.get(p);if(d===void 0)t.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,p,m),d.version=p.version}}return{get:l,remove:c,update:f}}var L1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,O1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,P1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,z1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,B1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,I1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,F1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,H1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,G1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,V1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,k1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,X1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,W1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,q1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Y1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Z1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,K1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Q1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,J1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,j1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,eE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,nE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,iE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,aE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,oE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lE="gl_FragColor = linearToOutputTexel( gl_FragColor );",cE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,fE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,mE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_E=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,SE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ME=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,EE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,bE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,TE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,AE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,RE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,CE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,DE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,UE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,LE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,NE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,OE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,PE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,FE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,HE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,GE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,VE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,XE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,WE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,YE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,KE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,JE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$E=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,eb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,nb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ib=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ab=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ob=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,lb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ub=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,db=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,mb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_b=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Eb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ab=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Db=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ub=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ob=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ib=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Fb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Vb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Jb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$b=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,iT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,oT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,de={alphahash_fragment:L1,alphahash_pars_fragment:N1,alphamap_fragment:O1,alphamap_pars_fragment:P1,alphatest_fragment:z1,alphatest_pars_fragment:B1,aomap_fragment:I1,aomap_pars_fragment:F1,batching_pars_vertex:H1,batching_vertex:G1,begin_vertex:V1,beginnormal_vertex:k1,bsdfs:X1,iridescence_fragment:W1,bumpmap_pars_fragment:q1,clipping_planes_fragment:Y1,clipping_planes_pars_fragment:Z1,clipping_planes_pars_vertex:K1,clipping_planes_vertex:Q1,color_fragment:J1,color_pars_fragment:j1,color_pars_vertex:$1,color_vertex:tE,common:eE,cube_uv_reflection_fragment:nE,defaultnormal_vertex:iE,displacementmap_pars_vertex:aE,displacementmap_vertex:sE,emissivemap_fragment:rE,emissivemap_pars_fragment:oE,colorspace_fragment:lE,colorspace_pars_fragment:cE,envmap_fragment:uE,envmap_common_pars_fragment:fE,envmap_pars_fragment:hE,envmap_pars_vertex:dE,envmap_physical_pars_fragment:bE,envmap_vertex:pE,fog_vertex:mE,fog_pars_vertex:gE,fog_fragment:vE,fog_pars_fragment:_E,gradientmap_pars_fragment:xE,lightmap_pars_fragment:SE,lights_lambert_fragment:yE,lights_lambert_pars_fragment:ME,lights_pars_begin:EE,lights_toon_fragment:TE,lights_toon_pars_fragment:AE,lights_phong_fragment:wE,lights_phong_pars_fragment:RE,lights_physical_fragment:CE,lights_physical_pars_fragment:DE,lights_fragment_begin:UE,lights_fragment_maps:LE,lights_fragment_end:NE,lightprobes_pars_fragment:OE,logdepthbuf_fragment:PE,logdepthbuf_pars_fragment:zE,logdepthbuf_pars_vertex:BE,logdepthbuf_vertex:IE,map_fragment:FE,map_pars_fragment:HE,map_particle_fragment:GE,map_particle_pars_fragment:VE,metalnessmap_fragment:kE,metalnessmap_pars_fragment:XE,morphinstance_vertex:WE,morphcolor_vertex:qE,morphnormal_vertex:YE,morphtarget_pars_vertex:ZE,morphtarget_vertex:KE,normal_fragment_begin:QE,normal_fragment_maps:JE,normal_pars_fragment:jE,normal_pars_vertex:$E,normal_vertex:tb,normalmap_pars_fragment:eb,clearcoat_normal_fragment_begin:nb,clearcoat_normal_fragment_maps:ib,clearcoat_pars_fragment:ab,iridescence_pars_fragment:sb,opaque_fragment:rb,packing:ob,premultiplied_alpha_fragment:lb,project_vertex:cb,dithering_fragment:ub,dithering_pars_fragment:fb,roughnessmap_fragment:hb,roughnessmap_pars_fragment:db,shadowmap_pars_fragment:pb,shadowmap_pars_vertex:mb,shadowmap_vertex:gb,shadowmask_pars_fragment:vb,skinbase_vertex:_b,skinning_pars_vertex:xb,skinning_vertex:Sb,skinnormal_vertex:yb,specularmap_fragment:Mb,specularmap_pars_fragment:Eb,tonemapping_fragment:bb,tonemapping_pars_fragment:Tb,transmission_fragment:Ab,transmission_pars_fragment:wb,uv_pars_fragment:Rb,uv_pars_vertex:Cb,uv_vertex:Db,worldpos_vertex:Ub,background_vert:Lb,background_frag:Nb,backgroundCube_vert:Ob,backgroundCube_frag:Pb,cube_vert:zb,cube_frag:Bb,depth_vert:Ib,depth_frag:Fb,distance_vert:Hb,distance_frag:Gb,equirect_vert:Vb,equirect_frag:kb,linedashed_vert:Xb,linedashed_frag:Wb,meshbasic_vert:qb,meshbasic_frag:Yb,meshlambert_vert:Zb,meshlambert_frag:Kb,meshmatcap_vert:Qb,meshmatcap_frag:Jb,meshnormal_vert:jb,meshnormal_frag:$b,meshphong_vert:tT,meshphong_frag:eT,meshphysical_vert:nT,meshphysical_frag:iT,meshtoon_vert:aT,meshtoon_frag:sT,points_vert:rT,points_frag:oT,shadow_vert:lT,shadow_frag:cT,sprite_vert:uT,sprite_frag:fT},Pt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new Qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},Zi={basic:{uniforms:qn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:qn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:qn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:qn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:qn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:qn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:qn([Pt.points,Pt.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:qn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:qn([Pt.common,Pt.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:qn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:qn([Pt.sprite,Pt.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distance:{uniforms:qn([Pt.common,Pt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distance_vert,fragmentShader:de.distance_frag},shadow:{uniforms:qn([Pt.lights,Pt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};Zi.physical={uniforms:qn([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new Qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new Qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new Qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const Xc={r:0,b:0,g:0},hT=new Ie,ox=new re;ox.set(-1,0,0,0,1,0,0,0,1);function dT(r,t,i,s,l,c){const f=new ee(0);let p=l===!0?0:1,m,d,v=null,_=0,g=null;function x(U){let P=U.isScene===!0?U.background:null;if(P&&P.isTexture){const A=U.backgroundBlurriness>0;P=t.get(P,A)}return P}function b(U){let P=!1;const A=x(U);A===null?M(f,p):A&&A.isColor&&(M(A,1),P=!0);const N=r.xr.getEnvironmentBlendMode();N==="additive"?i.buffers.color.setClear(0,0,0,1,c):N==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||P)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function R(U,P){const A=x(P);A&&(A.isCubeTexture||A.mapping===ru)?(d===void 0&&(d=new tn(new cl(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Xr(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(N,O,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=A,d.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(hT.makeRotationFromEuler(P.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(ox),d.material.toneMapped=Ee.getTransfer(A.colorSpace)!==Be,(v!==A||_!==A.version||g!==r.toneMapping)&&(d.material.needsUpdate=!0,v=A,_=A.version,g=r.toneMapping),d.layers.enableAll(),U.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new tn(new lu(2,2),new _n({name:"BackgroundMaterial",uniforms:Xr(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:ls,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,m.material.toneMapped=Ee.getTransfer(A.colorSpace)!==Be,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(v!==A||_!==A.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,v=A,_=A.version,g=r.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null))}function M(U,P){U.getRGB(Xc,nx(r)),i.buffers.color.setClear(Xc.r,Xc.g,Xc.b,P,c)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(U,P=1){f.set(U),p=P,M(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(U){p=U,M(f,p)},render:b,addToRenderList:R,dispose:S}}function pT(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function p(k,G,J,X,$){let I=!1;const W=_(k,X,J,G);c!==W&&(c=W,d(c.object)),I=x(k,X,J,$),I&&b(k,X,J,$),$!==null&&t.update($,r.ELEMENT_ARRAY_BUFFER),(I||f)&&(f=!1,A(k,G,J,X),$!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function m(){return r.createVertexArray()}function d(k){return r.bindVertexArray(k)}function v(k){return r.deleteVertexArray(k)}function _(k,G,J,X){const $=X.wireframe===!0;let I=s[G.id];I===void 0&&(I={},s[G.id]=I);const W=k.isInstancedMesh===!0?k.id:0;let ot=I[W];ot===void 0&&(ot={},I[W]=ot);let et=ot[J.id];et===void 0&&(et={},ot[J.id]=et);let ft=et[$];return ft===void 0&&(ft=g(m()),et[$]=ft),ft}function g(k){const G=[],J=[],X=[];for(let $=0;$<i;$++)G[$]=0,J[$]=0,X[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:J,attributeDivisors:X,object:k,attributes:{},index:null}}function x(k,G,J,X){const $=c.attributes,I=G.attributes;let W=0;const ot=J.getAttributes();for(const et in ot)if(ot[et].location>=0){const z=$[et];let tt=I[et];if(tt===void 0&&(et==="instanceMatrix"&&k.instanceMatrix&&(tt=k.instanceMatrix),et==="instanceColor"&&k.instanceColor&&(tt=k.instanceColor)),z===void 0||z.attribute!==tt||tt&&z.data!==tt.data)return!0;W++}return c.attributesNum!==W||c.index!==X}function b(k,G,J,X){const $={},I=G.attributes;let W=0;const ot=J.getAttributes();for(const et in ot)if(ot[et].location>=0){let z=I[et];z===void 0&&(et==="instanceMatrix"&&k.instanceMatrix&&(z=k.instanceMatrix),et==="instanceColor"&&k.instanceColor&&(z=k.instanceColor));const tt={};tt.attribute=z,z&&z.data&&(tt.data=z.data),$[et]=tt,W++}c.attributes=$,c.attributesNum=W,c.index=X}function R(){const k=c.newAttributes;for(let G=0,J=k.length;G<J;G++)k[G]=0}function M(k){S(k,0)}function S(k,G){const J=c.newAttributes,X=c.enabledAttributes,$=c.attributeDivisors;J[k]=1,X[k]===0&&(r.enableVertexAttribArray(k),X[k]=1),$[k]!==G&&(r.vertexAttribDivisor(k,G),$[k]=G)}function U(){const k=c.newAttributes,G=c.enabledAttributes;for(let J=0,X=G.length;J<X;J++)G[J]!==k[J]&&(r.disableVertexAttribArray(J),G[J]=0)}function P(k,G,J,X,$,I,W){W===!0?r.vertexAttribIPointer(k,G,J,$,I):r.vertexAttribPointer(k,G,J,X,$,I)}function A(k,G,J,X){R();const $=X.attributes,I=J.getAttributes(),W=G.defaultAttributeValues;for(const ot in I){const et=I[ot];if(et.location>=0){let ft=$[ot];if(ft===void 0&&(ot==="instanceMatrix"&&k.instanceMatrix&&(ft=k.instanceMatrix),ot==="instanceColor"&&k.instanceColor&&(ft=k.instanceColor)),ft!==void 0){const z=ft.normalized,tt=ft.itemSize,gt=t.get(ft);if(gt===void 0)continue;const Et=gt.buffer,Lt=gt.type,kt=gt.bytesPerElement,st=Lt===r.INT||Lt===r.UNSIGNED_INT||ft.gpuType===$d;if(ft.isInterleavedBufferAttribute){const vt=ft.data,Tt=vt.stride,te=ft.offset;if(vt.isInstancedInterleavedBuffer){for(let Ft=0;Ft<et.locationSize;Ft++)S(et.location+Ft,vt.meshPerAttribute);k.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let Ft=0;Ft<et.locationSize;Ft++)M(et.location+Ft);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let Ft=0;Ft<et.locationSize;Ft++)P(et.location+Ft,tt/et.locationSize,Lt,z,Tt*kt,(te+tt/et.locationSize*Ft)*kt,st)}else{if(ft.isInstancedBufferAttribute){for(let vt=0;vt<et.locationSize;vt++)S(et.location+vt,ft.meshPerAttribute);k.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let vt=0;vt<et.locationSize;vt++)M(et.location+vt);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let vt=0;vt<et.locationSize;vt++)P(et.location+vt,tt/et.locationSize,Lt,z,tt*kt,tt/et.locationSize*vt*kt,st)}}else if(W!==void 0){const z=W[ot];if(z!==void 0)switch(z.length){case 2:r.vertexAttrib2fv(et.location,z);break;case 3:r.vertexAttrib3fv(et.location,z);break;case 4:r.vertexAttrib4fv(et.location,z);break;default:r.vertexAttrib1fv(et.location,z)}}}}U()}function N(){L();for(const k in s){const G=s[k];for(const J in G){const X=G[J];for(const $ in X){const I=X[$];for(const W in I)v(I[W].object),delete I[W];delete X[$]}}delete s[k]}}function O(k){if(s[k.id]===void 0)return;const G=s[k.id];for(const J in G){const X=G[J];for(const $ in X){const I=X[$];for(const W in I)v(I[W].object),delete I[W];delete X[$]}}delete s[k.id]}function C(k){for(const G in s){const J=s[G];for(const X in J){const $=J[X];if($[k.id]===void 0)continue;const I=$[k.id];for(const W in I)v(I[W].object),delete I[W];delete $[k.id]}}}function E(k){for(const G in s){const J=s[G],X=k.isInstancedMesh===!0?k.id:0,$=J[X];if($!==void 0){for(const I in $){const W=$[I];for(const ot in W)v(W[ot].object),delete W[ot];delete $[I]}delete J[X],Object.keys(J).length===0&&delete s[G]}}}function L(){F(),f=!0,c!==l&&(c=l,d(c.object))}function F(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:L,resetDefaultState:F,dispose:N,releaseStatesOfGeometry:O,releaseStatesOfObject:E,releaseStatesOfProgram:C,initAttributes:R,enableAttribute:M,disableUnusedAttributes:U}}function mT(r,t,i){let s;function l(m){s=m}function c(m,d){r.drawArrays(s,m,d),i.update(d,s,1)}function f(m,d,v){v!==0&&(r.drawArraysInstanced(s,m,d,v),i.update(d,s,v))}function p(m,d,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,d,0,v);let g=0;for(let x=0;x<v;x++)g+=d[x];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=p}function gT(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(C){return!(C!==Ii&&s.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(C){const E=C===Fi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==gi&&C!==Ki&&!E&&s.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const v=m(d);v!==d&&(ne("WebGLRenderer:",d,"not supported, using",v,"instead."),d=v);const _=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),U=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),P=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),N=r.getParameter(r.MAX_SAMPLES),O=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:x,maxVertexTextures:b,maxTextureSize:R,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:U,maxVaryings:P,maxFragmentUniforms:A,maxSamples:N,samples:O}}function vT(r){const t=this;let i=null,s=0,l=!1,c=!1;const f=new Ma,p=new re,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const x=_.length!==0||g||s!==0||l;return l=g,s=_.length,x},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){i=v(_,g,0)},this.setState=function(_,g,x){const b=_.clippingPlanes,R=_.clipIntersection,M=_.clipShadows,S=r.get(_);if(!l||b===null||b.length===0||c&&!M)c?v(null):d();else{const U=c?0:s,P=U*4;let A=S.clippingState||null;m.value=A,A=v(b,g,P,x);for(let N=0;N!==P;++N)A[N]=i[N];S.clippingState=A,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=U}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function v(_,g,x,b){const R=_!==null?_.length:0;let M=null;if(R!==0){if(M=m.value,b!==!0||M===null){const S=x+R*4,U=g.matrixWorldInverse;p.getNormalMatrix(U),(M===null||M.length<S)&&(M=new Float32Array(S));for(let P=0,A=x;P!==R;++P,A+=4)f.copy(_[P]).applyMatrix4(U,p),f.normal.toArray(M,A),M[A+3]=f.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=R,t.numIntersection=0,M}}const Ir=4,_T=6,xT=20,ST=256,Yo=new xp,Jv=new ee;let td=null,ed=0,nd=0,id=!1;const yT=new H,Ps=new H;class jv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,s=.1,l=100,c={}){const{size:f=256,position:p=yT}=c;td=this._renderer.getRenderTarget(),ed=this._renderer.getActiveCubeFace(),nd=this._renderer.getActiveMipmapLevel(),id=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=e_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=t_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(td,ed,nd),this._renderer.xr.enabled=id,t.scissorTest=!1,Nr(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Hs||t.mapping===kr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),td=this._renderer.getRenderTarget(),ed=this._renderer.getActiveCubeFace(),nd=this._renderer.getActiveMipmapLevel(),id=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:Fi,format:Ii,colorSpace:nu,depthBuffer:!1},l=$v(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$v(t,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=MT(c)),this._blurMaterial=bT(c,t,i),this._ggxMaterial=ET(c,t,i)}return l}_compileMaterial(t){const i=new tn(new xn,t);this._renderer.compile(i,Yo)}_sceneToCubeUV(t,i,s,l,c){const m=new mi(90,1,i,s),d=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,x=_.toneMapping;_.getClearColor(Jv),_.toneMapping=Ji,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new tn(new cl,new Q_({name:"PMREM.Background",side:Hn,depthWrite:!1,depthTest:!1})));const R=this._backgroundBox,M=R.material;let S=!1;const U=t.background;U?U.isColor&&(M.color.copy(U),t.background=null,S=!0):(M.color.copy(Jv),S=!0);for(let P=0;P<6;P++){const A=P%3;A===0?(m.up.set(0,d[P],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[P],c.y,c.z)):A===1?(m.up.set(0,0,d[P]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[P],c.z)):(m.up.set(0,d[P],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[P]));const N=this._cubeSize;Nr(l,A*N,P>2?N:0,N,N),_.setRenderTarget(l),S&&_.render(R,m),_.render(t,m)}_.toneMapping=x,_.autoClear=g,t.background=U}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Hs||t.mapping===kr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=e_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=t_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const p=c.uniforms;p.envMap.value=t;const m=this._cubeSize;Nr(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,Yo)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=s}_applyGGXFilter(t,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,p=this._lodMeshes[s];p.material=f;const m=f.uniforms,d=s/(this._lodMeshes.length-1),v=i/(this._lodMeshes.length-1),_=Math.sqrt(d*d-v*v),g=d*1.25,x=_*g,{_lodMax:b}=this,R=this._sizeLods[s],M=3*R*(s>b-Ir?s-b+Ir:0),S=4*(this._cubeSize-R);m.envMap.value=t.texture,m.roughness.value=x,m.mipInt.value=b-i,Nr(c,M,S,3*R,2*R),l.setRenderTarget(c),l.render(p,Yo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=b-s,Nr(t,M,S,3*R,2*R),l.setRenderTarget(t),l.render(p,Yo)}_blur(t,i,s,l){const c=this._pingPongRenderTarget,f=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(t,c,i,s,f),this._blurPass(c,t,s,s,f)}_blurPass(t,i,s,l,c){const f=this._renderer,p=this._blurMaterial,m=this._lodMeshes[l];m.material=p;const d=p.uniforms;d.envMap.value=t.texture,d.sigma.value=c,d.mipInt.value=this._lodMax-s;const v=this._sizeLods[l],_=3*v*(l>this._lodMax-Ir?l-this._lodMax+Ir:0),g=4*(this._cubeSize-v);Nr(i,_,g,3*v,2*v),f.setRenderTarget(i),f.render(m,Yo)}}function MT(r){const t=[],i=[];let s=r;const l=r-Ir+1+_T;for(let c=0;c<l;c++){const f=Math.pow(2,s);t.push(f);const p=1/(f-2),m=-p,d=1+p,v=[m,m,d,m,d,d,m,m,d,d,m,d],_=6,g=6,x=3,b=new Float32Array(x*g*_),R=new Float32Array(x*g*_);for(let S=0;S<_;S++){const U=S%3*2/3-1,P=S>2?0:-1,A=[U,P,0,U+2/3,P,0,U+2/3,P+1,0,U,P,0,U+2/3,P+1,0,U,P+1,0];b.set(A,x*g*S);for(let N=0;N<g;N++){const O=v[N*2]*2-1,C=v[N*2+1]*2-1;S===0?Ps.set(1,C,O):S===1?Ps.set(-O,1,-C):S===2?Ps.set(-O,C,1):S===3?Ps.set(-1,C,-O):S===4?Ps.set(-O,-1,C):Ps.set(O,C,-1),Ps.toArray(R,(S*g+N)*x)}}const M=new xn;M.setAttribute("position",new ni(b,x)),M.setAttribute("outputDirection",new ni(R,x)),i.push(new tn(M,null)),s>Ir&&s--}return{lodMeshes:i,sizeLods:t}}function $v(r,t,i){const s=new Ri(r,t,i);return s.texture.mapping=ru,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Nr(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function ET(r,t,i){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ST,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:uu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ba,depthTest:!1,depthWrite:!1})}function bT(r,t,i){return new _n({name:"SphericalGaussianBlur",defines:{SAMPLES:xT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:uu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ba,depthTest:!1,depthWrite:!1})}function t_(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ba,depthTest:!1,depthWrite:!1})}function e_(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ba,depthTest:!1,depthWrite:!1})}function uu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class lx extends Ri{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new j_(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new cl(5,5,5),c=new _n({name:"CubemapFromEquirect",uniforms:Xr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Hn,blending:ba});c.uniforms.tEquirect.value=i;const f=new tn(l,c),p=i.minFilter;return i.minFilter===Bs&&(i.minFilter=Fn),new w1(1,10,this).update(t,f),i.minFilter=p,f.geometry.dispose(),f.material.dispose(),this}clear(t,i=!0,s=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,s,l);t.setRenderTarget(c)}}function TT(r){let t=new WeakMap,i=new WeakMap,s=null;function l(g,x=!1){return g==null?null:x?f(g):c(g)}function c(g){if(g&&g.isTexture){const x=g.mapping;if(x===Th||x===Ah)if(t.has(g)){const b=t.get(g).texture;return p(b,g.mapping)}else{const b=g.image;if(b&&b.height>0){const R=new lx(b.height);return R.fromEquirectangularTexture(r,g),t.set(g,R),g.addEventListener("dispose",d),p(R.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const x=g.mapping,b=x===Th||x===Ah,R=x===Hs||x===kr;if(b||R){let M=i.get(g);const S=M!==void 0?M.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return s===null&&(s=new jv(r)),M=b?s.fromEquirectangular(g,M):s.fromCubemap(g,M),M.texture.pmremVersion=g.pmremVersion,i.set(g,M),M.texture;if(M!==void 0)return M.texture;{const U=g.image;return b&&U&&U.height>0||R&&U&&m(U)?(s===null&&(s=new jv(r)),M=b?s.fromEquirectangular(g):s.fromCubemap(g),M.texture.pmremVersion=g.pmremVersion,i.set(g,M),g.addEventListener("dispose",v),M.texture):null}}}return g}function p(g,x){return x===Th?g.mapping=Hs:x===Ah&&(g.mapping=kr),g}function m(g){let x=0;const b=6;for(let R=0;R<b;R++)g[R]!==void 0&&x++;return x===b}function d(g){const x=g.target;x.removeEventListener("dispose",d);const b=t.get(x);b!==void 0&&(t.delete(x),b.dispose())}function v(g){const x=g.target;x.removeEventListener("dispose",v);const b=i.get(x);b!==void 0&&(i.delete(x),b.dispose())}function _(){t=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:_}}function AT(r){const t={};function i(s){if(t[s]!==void 0)return t[s];const l=r.getExtension(s);return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Hr("WebGLRenderer: "+s+" extension not supported."),l}}}function wT(r,t,i,s){const l={},c=new WeakMap;function f(_){const g=_.target;g.index!==null&&t.remove(g.index);for(const b in g.attributes)t.remove(g.attributes[b]);g.removeEventListener("dispose",f),delete l[g.id];const x=c.get(g);x&&(t.remove(x),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(_,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(_){const g=_.attributes;for(const x in g)t.update(g[x],r.ARRAY_BUFFER)}function d(_){const g=[],x=_.index,b=_.attributes.position;let R=0;if(b===void 0)return;if(x!==null){const U=x.array;R=x.version;for(let P=0,A=U.length;P<A;P+=3){const N=U[P+0],O=U[P+1],C=U[P+2];g.push(N,O,O,C,C,N)}}else{const U=b.array;R=b.version;for(let P=0,A=U.length/3-1;P<A;P+=3){const N=P+0,O=P+1,C=P+2;g.push(N,O,O,C,C,N)}}const M=new(b.count>=65535?K_:Z_)(g,1);M.version=R;const S=c.get(_);S&&t.remove(S),c.set(_,M)}function v(_){const g=c.get(_);if(g){const x=_.index;x!==null&&g.version<x.version&&d(_)}else d(_);return c.get(_)}return{get:p,update:m,getWireframeAttribute:v}}function RT(r,t,i){let s;function l(_){s=_}let c,f;function p(_){c=_.type,f=_.bytesPerElement}function m(_,g){r.drawElements(s,g,c,_*f),i.update(g,s,1)}function d(_,g,x){x!==0&&(r.drawElementsInstanced(s,g,c,_*f,x),i.update(g,s,x))}function v(_,g,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,_,0,x);let R=0;for(let M=0;M<x;M++)R+=g[M];i.update(R,s,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=v}function CT(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,p){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=p*(c/3);break;case r.LINES:i.lines+=p*(c/2);break;case r.LINE_STRIP:i.lines+=p*(c-1);break;case r.LINE_LOOP:i.lines+=p*c;break;case r.POINTS:i.points+=p*c;break;default:Ae("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function DT(r,t,i){const s=new WeakMap,l=new Ze;function c(f,p,m){const d=f.morphTargetInfluences,v=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,_=v!==void 0?v.length:0;let g=s.get(p);if(g===void 0||g.count!==_){let L=function(){C.dispose(),s.delete(p),p.removeEventListener("dispose",L)};g!==void 0&&g.texture.dispose();const x=p.morphAttributes.position!==void 0,b=p.morphAttributes.normal!==void 0,R=p.morphAttributes.color!==void 0,M=p.morphAttributes.position||[],S=p.morphAttributes.normal||[],U=p.morphAttributes.color||[];let P=0;x===!0&&(P=1),b===!0&&(P=2),R===!0&&(P=3);let A=p.attributes.position.count*P,N=1;A>t.maxTextureSize&&(N=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const O=new Float32Array(A*N*4*_),C=new q_(O,A,N,_);C.type=Ki,C.needsUpdate=!0;const E=P*4;for(let F=0;F<_;F++){const k=M[F],G=S[F],J=U[F],X=A*N*4*F;for(let $=0;$<k.count;$++){const I=$*E;x===!0&&(l.fromBufferAttribute(k,$),O[X+I+0]=l.x,O[X+I+1]=l.y,O[X+I+2]=l.z,O[X+I+3]=0),b===!0&&(l.fromBufferAttribute(G,$),O[X+I+4]=l.x,O[X+I+5]=l.y,O[X+I+6]=l.z,O[X+I+7]=0),R===!0&&(l.fromBufferAttribute(J,$),O[X+I+8]=l.x,O[X+I+9]=l.y,O[X+I+10]=l.z,O[X+I+11]=J.itemSize===4?l.w:1)}}g={count:_,texture:C,size:new Qt(A,N)},s.set(p,g),p.addEventListener("dispose",L)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let x=0;for(let R=0;R<d.length;R++)x+=d[R];const b=p.morphTargetsRelative?1:1-x;m.getUniforms().setValue(r,"morphTargetBaseInfluence",b),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function UT(r,t,i,s,l){let c=new WeakMap;function f(d){const v=l.render.frame,_=d.geometry,g=t.get(d,_);if(c.get(g)!==v&&(t.update(g),c.set(g,v)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==v&&(i.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,v))),d.isSkinnedMesh){const x=d.skeleton;c.get(x)!==v&&(x.update(),c.set(x,v))}return g}function p(){c=new WeakMap}function m(d){const v=d.target;v.removeEventListener("dispose",m),s.releaseStatesOfObject(v),i.remove(v.instanceMatrix),v.instanceColor!==null&&i.remove(v.instanceColor)}return{update:f,dispose:p}}const LT={[U_]:"LINEAR_TONE_MAPPING",[L_]:"REINHARD_TONE_MAPPING",[N_]:"CINEON_TONE_MAPPING",[jd]:"ACES_FILMIC_TONE_MAPPING",[P_]:"AGX_TONE_MAPPING",[z_]:"NEUTRAL_TONE_MAPPING",[O_]:"CUSTOM_TONE_MAPPING"};function NT(r,t,i,s,l,c){const f=new Ri(t,i,{type:r,depthBuffer:l,stencilBuffer:c,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let p=null,m=null;const d=new xn;d.setAttribute("position",new we([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new we([0,2,0,0,2,0],2));const v=new S1({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),_=new tn(d,v),g=new xp(-1,1,1,-1,0,1);let x=null,b=null,R=!1,M,S=null,U=[],P=!1;this.setSize=function(A,N){f.setSize(A,N),p!==null&&p.setSize(A,N),m!==null&&m.setSize(A,N);for(let O=0;O<U.length;O++){const C=U[O];C.setSize&&C.setSize(A,N)}},this.setEffects=function(A){U=A,P=U.length>0&&U[0].isRenderPass===!0;const N=f.width,O=f.height;U.length>0&&p===null&&(p=new Ri(N,O,{type:Fi,depthBuffer:!1,stencilBuffer:!1}),m=new Ri(N,O,{type:Fi,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<U.length;C++){const E=U[C];E.setSize&&E.setSize(N,O)}},this.begin=function(A,N){if(R||A.toneMapping===Ji&&U.length===0)return!1;if(S=N,N!==null){const O=N.width,C=N.height;(f.width!==O||f.height!==C)&&this.setSize(O,C)}return P===!1&&A.setRenderTarget(f),M=A.toneMapping,A.toneMapping=Ji,!0},this.hasRenderPass=function(){return P},this.end=function(A,N){A.toneMapping=M,R=!0;let O=f,C=p;for(let E=0;E<U.length;E++){const L=U[E];L.enabled!==!1&&(L.render(A,C,O,N),L.needsSwap!==!1&&(O=C,C=C===p?m:p))}if(x!==A.outputColorSpace||b!==A.toneMapping){x=A.outputColorSpace,b=A.toneMapping,v.defines={},Ee.getTransfer(x)===Be&&(v.defines.SRGB_TRANSFER="");const E=LT[b];E&&(v.defines[E]=""),v.needsUpdate=!0}v.uniforms.tDiffuse.value=O.texture,A.setRenderTarget(S),A.render(_,g),S=null,R=!1},this.isCompositing=function(){return R},this.dispose=function(){f.dispose(),p!==null&&p.dispose(),m!==null&&m.dispose(),d.dispose(),v.dispose()}}const cx=new Gn,Zd=new ol(1,1),ux=new q_,fx=new PM,hx=new j_,n_=[],i_=[],a_=new Float32Array(16),s_=new Float32Array(9),r_=new Float32Array(4);function Zr(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=n_[l];if(c===void 0&&(c=new Float32Array(l),n_[l]=c),t!==0){s.toArray(c,0);for(let f=1,p=0;f!==t;++f)p+=i,r[f].toArray(c,p)}return c}function bn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function Tn(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function fu(r,t){let i=i_[t];i===void 0&&(i=new Int32Array(t),i_[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function OT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function PT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bn(i,t))return;r.uniform2fv(this.addr,t),Tn(i,t)}}function zT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(bn(i,t))return;r.uniform3fv(this.addr,t),Tn(i,t)}}function BT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bn(i,t))return;r.uniform4fv(this.addr,t),Tn(i,t)}}function IT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(bn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),Tn(i,t)}else{if(bn(i,s))return;r_.set(s),r.uniformMatrix2fv(this.addr,!1,r_),Tn(i,s)}}function FT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(bn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),Tn(i,t)}else{if(bn(i,s))return;s_.set(s),r.uniformMatrix3fv(this.addr,!1,s_),Tn(i,s)}}function HT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(bn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),Tn(i,t)}else{if(bn(i,s))return;a_.set(s),r.uniformMatrix4fv(this.addr,!1,a_),Tn(i,s)}}function GT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function VT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bn(i,t))return;r.uniform2iv(this.addr,t),Tn(i,t)}}function kT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(bn(i,t))return;r.uniform3iv(this.addr,t),Tn(i,t)}}function XT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bn(i,t))return;r.uniform4iv(this.addr,t),Tn(i,t)}}function WT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function qT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bn(i,t))return;r.uniform2uiv(this.addr,t),Tn(i,t)}}function YT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(bn(i,t))return;r.uniform3uiv(this.addr,t),Tn(i,t)}}function ZT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bn(i,t))return;r.uniform4uiv(this.addr,t),Tn(i,t)}}function KT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Zd.compareFunction=i.isReversedDepthBuffer()?rp:sp,c=Zd):c=cx,i.setTexture2D(t||c,l)}function QT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||fx,l)}function JT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||hx,l)}function jT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||ux,l)}function $T(r){switch(r){case 5126:return OT;case 35664:return PT;case 35665:return zT;case 35666:return BT;case 35674:return IT;case 35675:return FT;case 35676:return HT;case 5124:case 35670:return GT;case 35667:case 35671:return VT;case 35668:case 35672:return kT;case 35669:case 35673:return XT;case 5125:return WT;case 36294:return qT;case 36295:return YT;case 36296:return ZT;case 35678:case 36198:case 36298:case 36306:case 35682:return KT;case 35679:case 36299:case 36307:return QT;case 35680:case 36300:case 36308:case 36293:return JT;case 36289:case 36303:case 36311:case 36292:return jT}}function tA(r,t){r.uniform1fv(this.addr,t)}function eA(r,t){const i=Zr(t,this.size,2);r.uniform2fv(this.addr,i)}function nA(r,t){const i=Zr(t,this.size,3);r.uniform3fv(this.addr,i)}function iA(r,t){const i=Zr(t,this.size,4);r.uniform4fv(this.addr,i)}function aA(r,t){const i=Zr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function sA(r,t){const i=Zr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function rA(r,t){const i=Zr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function oA(r,t){r.uniform1iv(this.addr,t)}function lA(r,t){r.uniform2iv(this.addr,t)}function cA(r,t){r.uniform3iv(this.addr,t)}function uA(r,t){r.uniform4iv(this.addr,t)}function fA(r,t){r.uniform1uiv(this.addr,t)}function hA(r,t){r.uniform2uiv(this.addr,t)}function dA(r,t){r.uniform3uiv(this.addr,t)}function pA(r,t){r.uniform4uiv(this.addr,t)}function mA(r,t,i){const s=this.cache,l=t.length,c=fu(i,l);bn(s,c)||(r.uniform1iv(this.addr,c),Tn(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=Zd:f=cx;for(let p=0;p!==l;++p)i.setTexture2D(t[p]||f,c[p])}function gA(r,t,i){const s=this.cache,l=t.length,c=fu(i,l);bn(s,c)||(r.uniform1iv(this.addr,c),Tn(s,c));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||fx,c[f])}function vA(r,t,i){const s=this.cache,l=t.length,c=fu(i,l);bn(s,c)||(r.uniform1iv(this.addr,c),Tn(s,c));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||hx,c[f])}function _A(r,t,i){const s=this.cache,l=t.length,c=fu(i,l);bn(s,c)||(r.uniform1iv(this.addr,c),Tn(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||ux,c[f])}function xA(r){switch(r){case 5126:return tA;case 35664:return eA;case 35665:return nA;case 35666:return iA;case 35674:return aA;case 35675:return sA;case 35676:return rA;case 5124:case 35670:return oA;case 35667:case 35671:return lA;case 35668:case 35672:return cA;case 35669:case 35673:return uA;case 5125:return fA;case 36294:return hA;case 36295:return dA;case 36296:return pA;case 35678:case 36198:case 36298:case 36306:case 35682:return mA;case 35679:case 36299:case 36307:return gA;case 35680:case 36300:case 36308:case 36293:return vA;case 36289:case 36303:case 36311:case 36292:return _A}}class SA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=$T(i.type)}}class yA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=xA(i.type)}}class MA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const p=l[c];p.setValue(t,i[p.id],s)}}}const ad=/(\w+)(\])?(\[|\.)?/g;function o_(r,t){r.seq.push(t),r.map[t.id]=t}function EA(r,t,i){const s=r.name,l=s.length;for(ad.lastIndex=0;;){const c=ad.exec(s),f=ad.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&f+2===l){o_(i,d===void 0?new SA(p,r,t):new yA(p,r,t));break}else{let _=i.map[p];_===void 0&&(_=new MA(p),o_(i,_)),i=_}}}class jc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const p=t.getActiveUniform(i,f),m=t.getUniformLocation(i,p.name);EA(p,m,this)}const l=[],c=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,f=i.length;c!==f;++c){const p=i[c],m=s[p.id];m.needsUpdate!==!1&&p.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in i&&s.push(f)}return s}}function l_(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const bA=37297;let TA=0;function AA(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let f=l;f<c;f++){const p=f+1;s.push(`${p===t?">":" "} ${p}: ${i[f]}`)}return s.join(`
`)}const c_=new re;function wA(r){Ee._getMatrix(c_,Ee.workingColorSpace,r);const t=`mat3( ${c_.elements.map(i=>i.toFixed(4))} )`;switch(Ee.getTransfer(r)){case iu:return[t,"LinearTransferOETF"];case Be:return[t,"sRGBTransferOETF"];default:return ne("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function u_(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const p=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+AA(r.getShaderSource(t),p)}else return c}function RA(r,t){const i=wA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const CA={[U_]:"Linear",[L_]:"Reinhard",[N_]:"Cineon",[jd]:"ACESFilmic",[P_]:"AgX",[z_]:"Neutral",[O_]:"Custom"};function DA(r,t){const i=CA[t];return i===void 0?(ne("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Wc=new H;function UA(){Ee.getLuminanceCoefficients(Wc);const r=Wc.x.toFixed(4),t=Wc.y.toFixed(4),i=Wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function LA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qo).join(`
`)}function NA(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function OA(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),i[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:p}}return i}function Qo(r){return r!==""}function f_(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function h_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const PA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kd(r){return r.replace(PA,BA)}const zA=new Map;function BA(r,t){let i=de[t];if(i===void 0){const s=zA.get(t);if(s!==void 0)i=de[s],ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Kd(i)}const IA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function d_(r){return r.replace(IA,FA)}function FA(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function p_(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const HA={[Yc]:"SHADOWMAP_TYPE_PCF",[Ko]:"SHADOWMAP_TYPE_VSM"};function GA(r){return HA[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const VA={[Hs]:"ENVMAP_TYPE_CUBE",[kr]:"ENVMAP_TYPE_CUBE",[ru]:"ENVMAP_TYPE_CUBE_UV"};function kA(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":VA[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const XA={[kr]:"ENVMAP_MODE_REFRACTION"};function WA(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":XA[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const qA={[D_]:"ENVMAP_BLENDING_MULTIPLY",[Jy]:"ENVMAP_BLENDING_MIX",[jy]:"ENVMAP_BLENDING_ADD"};function YA(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":qA[r.combine]||"ENVMAP_BLENDING_NONE"}function ZA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function KA(r,t,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,p=i.fragmentShader;const m=GA(i),d=kA(i),v=WA(i),_=YA(i),g=ZA(i),x=LA(i),b=NA(c),R=l.createProgram();let M,S,U=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Qo).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Qo).join(`
`),S.length>0&&(S+=`
`)):(M=[p_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qo).join(`
`),S=[p_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+v:"",i.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ji?"#define TONE_MAPPING":"",i.toneMapping!==Ji?de.tonemapping_pars_fragment:"",i.toneMapping!==Ji?DA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,RA("linearToOutputTexel",i.outputColorSpace),UA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Qo).join(`
`)),f=Kd(f),f=f_(f,i),f=h_(f,i),p=Kd(p),p=f_(p,i),p=h_(p,i),f=d_(f),p=d_(p),i.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",i.glslVersion===vv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===vv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const P=U+M+f,A=U+S+p,N=l_(l,l.VERTEX_SHADER,P),O=l_(l,l.FRAGMENT_SHADER,A);l.attachShader(R,N),l.attachShader(R,O),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function C(k){if(r.debug.checkShaderErrors){const G=l.getProgramInfoLog(R)||"",J=l.getShaderInfoLog(N)||"",X=l.getShaderInfoLog(O)||"",$=G.trim(),I=J.trim(),W=X.trim();let ot=!0,et=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(ot=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,R,N,O);else{const ft=u_(l,N,"vertex"),z=u_(l,O,"fragment");Ae("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+$+`
`+ft+`
`+z)}else $!==""?ne("WebGLProgram: Program Info Log:",$):(I===""||W==="")&&(et=!1);et&&(k.diagnostics={runnable:ot,programLog:$,vertexShader:{log:I,prefix:M},fragmentShader:{log:W,prefix:S}})}l.deleteShader(N),l.deleteShader(O),E=new jc(l,R),L=OA(l,R)}let E;this.getUniforms=function(){return E===void 0&&C(this),E};let L;this.getAttributes=function(){return L===void 0&&C(this),L};let F=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=l.getProgramParameter(R,bA)),F},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=TA++,this.cacheKey=t,this.usedTimes=1,this.program=R,this.vertexShader=N,this.fragmentShader=O,this}let QA=0;class JA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,s){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new jA(t),i.set(t,s)),s}}class jA{constructor(t){this.id=QA++,this.code=t,this.usedTimes=0}}function $A(r){return r===Gs||r===tu||r===eu}function t3(r,t,i,s,l,c){const f=new cp,p=new JA,m=new Set,d=[],v=new Map,_=s.logarithmicDepthBuffer;let g=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(E){return m.add(E),E===0?"uv":`uv${E}`}function R(E,L,F,k,G,J){const X=k.fog,$=G.geometry,I=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?k.environment:null,W=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,ot=t.get(E.envMap||I,W),et=ot&&ot.mapping===ru?ot.image.height:null,ft=x[E.type];E.precision!==null&&(g=s.getMaxPrecision(E.precision),g!==E.precision&&ne("WebGLProgram.getParameters:",E.precision,"not supported, using",g,"instead."));const z=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,tt=z!==void 0?z.length:0;let gt=0;$.morphAttributes.position!==void 0&&(gt=1),$.morphAttributes.normal!==void 0&&(gt=2),$.morphAttributes.color!==void 0&&(gt=3);let Et,Lt,kt,st;if(ft){const Fe=Zi[ft];Et=Fe.vertexShader,Lt=Fe.fragmentShader}else{Et=E.vertexShader,Lt=E.fragmentShader;const Fe=p.getVertexShaderStage(E),be=p.getFragmentShaderStage(E);p.update(E,Fe,be),kt=Fe.id,st=be.id}const vt=r.getRenderTarget(),Tt=r.state.buffers.depth.getReversed(),te=G.isInstancedMesh===!0,Ft=G.isBatchedMesh===!0,le=!!E.map,en=!!E.matcap,ae=!!ot,xe=!!E.aoMap,Ne=!!E.lightMap,ge=!!E.bumpMap&&E.wireframe===!1,Xe=!!E.normalMap,nn=!!E.displacementMap,An=!!E.emissiveMap,We=!!E.metalnessMap,an=!!E.roughnessMap,K=E.anisotropy>0,Oe=E.clearcoat>0,De=E.dispersion>0,B=E.retroreflectivity>0,T=E.iridescence>0,j=E.sheen>0,lt=E.transmission>0,dt=K&&!!E.anisotropyMap,bt=Oe&&!!E.clearcoatMap,Ct=Oe&&!!E.clearcoatNormalMap,pt=Oe&&!!E.clearcoatRoughnessMap,mt=T&&!!E.iridescenceMap,At=T&&!!E.iridescenceThicknessMap,Ht=j&&!!E.sheenColorMap,Nt=j&&!!E.sheenRoughnessMap,Dt=!!E.specularMap,Kt=!!E.specularColorMap,Jt=!!E.specularIntensityMap,ie=lt&&!!E.transmissionMap,Z=lt&&!!E.thicknessMap,wt=!!E.gradientMap,xt=!!E.alphaMap,Rt=E.alphaTest>0,zt=!!E.alphaHash,Mt=!!E.extensions;let Zt=Ji;E.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(Zt=r.toneMapping);const Xt={shaderID:ft,shaderType:E.type,shaderName:E.name,vertexShader:Et,fragmentShader:Lt,defines:E.defines,customVertexShaderID:kt,customFragmentShaderID:st,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:g,batching:Ft,batchingColor:Ft&&G._colorsTexture!==null,instancing:te,instancingColor:te&&G.instanceColor!==null,instancingMorph:te&&G.morphTexture!==null,outputColorSpace:vt===null?r.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Ee.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:le,matcap:en,envMap:ae,envMapMode:ae&&ot.mapping,envMapCubeUVHeight:et,aoMap:xe,lightMap:Ne,bumpMap:ge,normalMap:Xe,displacementMap:nn,emissiveMap:An,normalMapObjectSpace:Xe&&E.normalMapType===eM,normalMapTangentSpace:Xe&&E.normalMapType===Wd,packedNormalMap:Xe&&E.normalMapType===Wd&&$A(E.normalMap.format),metalnessMap:We,roughnessMap:an,anisotropy:K,anisotropyMap:dt,clearcoat:Oe,clearcoatMap:bt,clearcoatNormalMap:Ct,clearcoatRoughnessMap:pt,dispersion:De,retroreflection:B,iridescence:T,iridescenceMap:mt,iridescenceThicknessMap:At,sheen:j,sheenColorMap:Ht,sheenRoughnessMap:Nt,specularMap:Dt,specularColorMap:Kt,specularIntensityMap:Jt,transmission:lt,transmissionMap:ie,thicknessMap:Z,gradientMap:wt,opaque:E.transparent===!1&&E.blending===Jo&&E.alphaToCoverage===!1,alphaMap:xt,alphaTest:Rt,alphaHash:zt,combine:E.combine,mapUv:le&&b(E.map.channel),aoMapUv:xe&&b(E.aoMap.channel),lightMapUv:Ne&&b(E.lightMap.channel),bumpMapUv:ge&&b(E.bumpMap.channel),normalMapUv:Xe&&b(E.normalMap.channel),displacementMapUv:nn&&b(E.displacementMap.channel),emissiveMapUv:An&&b(E.emissiveMap.channel),metalnessMapUv:We&&b(E.metalnessMap.channel),roughnessMapUv:an&&b(E.roughnessMap.channel),anisotropyMapUv:dt&&b(E.anisotropyMap.channel),clearcoatMapUv:bt&&b(E.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&b(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&b(E.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&b(E.iridescenceMap.channel),iridescenceThicknessMapUv:At&&b(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&b(E.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&b(E.sheenRoughnessMap.channel),specularMapUv:Dt&&b(E.specularMap.channel),specularColorMapUv:Kt&&b(E.specularColorMap.channel),specularIntensityMapUv:Jt&&b(E.specularIntensityMap.channel),transmissionMapUv:ie&&b(E.transmissionMap.channel),thicknessMapUv:Z&&b(E.thicknessMap.channel),alphaMapUv:xt&&b(E.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Xe||K),vertexNormals:!!$.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!$.attributes.uv&&(le||xt),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||$.attributes.normal===void 0&&Xe===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Tt,skinning:G.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:gt,numSunLights:L.sun.length,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numSunLightShadows:L.sunShadowMap.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Zt,decodeVideoTexture:le&&E.map.isVideoTexture===!0&&Ee.getTransfer(E.map.colorSpace)===Be,decodeVideoTextureEmissive:An&&E.emissiveMap.isVideoTexture===!0&&Ee.getTransfer(E.emissiveMap.colorSpace)===Be,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===zi,flipSided:E.side===Hn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Mt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&E.extensions.multiDraw===!0||Ft)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Xt.vertexUv1s=m.has(1),Xt.vertexUv2s=m.has(2),Xt.vertexUv3s=m.has(3),m.clear(),Xt}function M(E){const L=[];if(E.shaderID?L.push(E.shaderID):(L.push(E.customVertexShaderID),L.push(E.customFragmentShaderID)),E.defines!==void 0)for(const F in E.defines)L.push(F),L.push(E.defines[F]);return E.isRawShaderMaterial===!1&&(S(L,E),U(L,E),L.push(r.outputColorSpace)),L.push(E.customProgramCacheKey),L.join()}function S(E,L){E.push(L.precision),E.push(L.outputColorSpace),E.push(L.envMapMode),E.push(L.envMapCubeUVHeight),E.push(L.mapUv),E.push(L.alphaMapUv),E.push(L.lightMapUv),E.push(L.aoMapUv),E.push(L.bumpMapUv),E.push(L.normalMapUv),E.push(L.displacementMapUv),E.push(L.emissiveMapUv),E.push(L.metalnessMapUv),E.push(L.roughnessMapUv),E.push(L.anisotropyMapUv),E.push(L.clearcoatMapUv),E.push(L.clearcoatNormalMapUv),E.push(L.clearcoatRoughnessMapUv),E.push(L.iridescenceMapUv),E.push(L.iridescenceThicknessMapUv),E.push(L.sheenColorMapUv),E.push(L.sheenRoughnessMapUv),E.push(L.specularMapUv),E.push(L.specularColorMapUv),E.push(L.specularIntensityMapUv),E.push(L.transmissionMapUv),E.push(L.thicknessMapUv),E.push(L.combine),E.push(L.fogExp2),E.push(L.sizeAttenuation),E.push(L.morphTargetsCount),E.push(L.morphAttributeCount),E.push(L.numSunLights),E.push(L.numDirLights),E.push(L.numPointLights),E.push(L.numSpotLights),E.push(L.numSpotLightMaps),E.push(L.numHemiLights),E.push(L.numRectAreaLights),E.push(L.numSunLightShadows),E.push(L.numDirLightShadows),E.push(L.numPointLightShadows),E.push(L.numSpotLightShadows),E.push(L.numSpotLightShadowsWithMaps),E.push(L.numLightProbes),E.push(L.shadowMapType),E.push(L.toneMapping),E.push(L.numClippingPlanes),E.push(L.numClipIntersection),E.push(L.depthPacking)}function U(E,L){f.disableAll(),L.instancing&&f.enable(0),L.instancingColor&&f.enable(1),L.instancingMorph&&f.enable(2),L.matcap&&f.enable(3),L.envMap&&f.enable(4),L.normalMapObjectSpace&&f.enable(5),L.normalMapTangentSpace&&f.enable(6),L.clearcoat&&f.enable(7),L.iridescence&&f.enable(8),L.alphaTest&&f.enable(9),L.vertexColors&&f.enable(10),L.vertexAlphas&&f.enable(11),L.vertexUv1s&&f.enable(12),L.vertexUv2s&&f.enable(13),L.vertexUv3s&&f.enable(14),L.vertexTangents&&f.enable(15),L.anisotropy&&f.enable(16),L.alphaHash&&f.enable(17),L.batching&&f.enable(18),L.dispersion&&f.enable(19),L.retroreflection&&f.enable(24),L.batchingColor&&f.enable(20),L.gradientMap&&f.enable(21),L.packedNormalMap&&f.enable(22),L.vertexNormals&&f.enable(23),E.push(f.mask),f.disableAll(),L.fog&&f.enable(0),L.useFog&&f.enable(1),L.flatShading&&f.enable(2),L.logarithmicDepthBuffer&&f.enable(3),L.reversedDepthBuffer&&f.enable(4),L.skinning&&f.enable(5),L.morphTargets&&f.enable(6),L.morphNormals&&f.enable(7),L.morphColors&&f.enable(8),L.premultipliedAlpha&&f.enable(9),L.shadowMapEnabled&&f.enable(10),L.doubleSided&&f.enable(11),L.flipSided&&f.enable(12),L.useDepthPacking&&f.enable(13),L.dithering&&f.enable(14),L.transmission&&f.enable(15),L.sheen&&f.enable(16),L.opaque&&f.enable(17),L.pointsUvs&&f.enable(18),L.decodeVideoTexture&&f.enable(19),L.decodeVideoTextureEmissive&&f.enable(20),L.alphaToCoverage&&f.enable(21),L.numLightProbeGrids>0&&f.enable(22),L.hasPositionAttribute&&f.enable(23),E.push(f.mask)}function P(E){const L=x[E.type];let F;if(L){const k=Zi[L];F=ix.clone(k.uniforms)}else F=E.uniforms;return F}function A(E,L){let F=v.get(L);return F!==void 0?++F.usedTimes:(F=new KA(r,L,E,l),d.push(F),v.set(L,F)),F}function N(E){if(--E.usedTimes===0){const L=d.indexOf(E);d[L]=d[d.length-1],d.pop(),v.delete(E.cacheKey),E.destroy()}}function O(E){p.remove(E)}function C(){p.dispose()}return{getParameters:R,getProgramCacheKey:M,getUniforms:P,acquireProgram:A,releaseProgram:N,releaseShaderCache:O,programs:d,dispose:C}}function e3(){let r=new WeakMap;function t(f){return r.has(f)}function i(f){let p=r.get(f);return p===void 0&&(p={},r.set(f,p)),p}function s(f){r.delete(f)}function l(f,p,m){r.get(f)[p]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function n3(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function m_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function g_(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function f(g){let x=0;return g.isInstancedMesh&&(x+=2),g.isSkinnedMesh&&(x+=1),x}function p(g,x,b,R,M,S){let U=r[t];return U===void 0?(U={id:g.id,object:g,geometry:x,material:b,materialVariant:f(g),groupOrder:R,renderOrder:g.renderOrder,z:M,group:S},r[t]=U):(U.id=g.id,U.object=g,U.geometry=x,U.material=b,U.materialVariant=f(g),U.groupOrder=R,U.renderOrder=g.renderOrder,U.z=M,U.group=S),t++,U}function m(g,x,b,R,M,S,U){U.reversedDepth===!0&&(M=-M);const P=p(g,x,b,R,M,S);b.transmission>0?s.push(P):b.transparent===!0?l.push(P):i.push(P)}function d(g,x,b,R,M,S){const U=p(g,x,b,R,M,S);b.transmission>0?s.unshift(U):b.transparent===!0?l.unshift(U):i.unshift(U)}function v(g,x){i.length>1&&i.sort(g||n3),s.length>1&&s.sort(x||m_),l.length>1&&l.sort(x||m_)}function _(){for(let g=t,x=r.length;g<x;g++){const b=r[g];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:d,finish:_,sort:v}}function i3(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new g_,r.set(s,[f])):l>=c.length?(f=new g_,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:t,dispose:i}}function a3(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new H,color:new ee};break;case"SpotLight":i={position:new H,direction:new H,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new H,color:new ee,distance:0,decay:0};break;case"HemisphereLight":i={direction:new H,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":i={color:new ee,position:new H,halfWidth:new H,halfHeight:new H};break}return r[t.id]=i,i}}}function s3(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let r3=0;function o3(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function l3(r){const t=new a3,i=s3(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new H);const l=new H,c=new Ie,f=new Ie;function p(d){let v=0,_=0,g=0;for(let G=0;G<9;G++)s.probe[G].set(0,0,0);let x=0,b=0,R=0,M=0,S=0,U=0,P=0,A=0,N=0,O=0,C=0,E=0,L=0,F=0;d.sort(o3);for(let G=0,J=d.length;G<J;G++){const X=d[G],$=X.color,I=X.intensity,W=X.distance;let ot=null;if(X.shadow&&X.shadow.map&&(X.shadow.map.texture.format===Gs?ot=X.shadow.map.texture:ot=X.shadow.map.depthTexture||X.shadow.map.texture),X.isAmbientLight)v+=$.r*I,_+=$.g*I,g+=$.b*I;else if(X.isLightProbe){for(let et=0;et<9;et++)s.probe[et].addScaledVector(X.sh.coefficients[et],I);F++}else if(X.isSunLight){const et=t.get(X);if(et.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){const ft=X.shadow,z=i.get(X);z.shadowIntensity=ft.intensity,z.shadowBias=ft.bias,z.shadowNormalBias=ft.normalBias,z.shadowRadius=ft.radius,z.shadowMapSize.copy(ft.mapSize).multiply(ft.getFrameExtents()),s.sunShadow[b]=z,s.sunShadowMap[b]=ot;const tt=ft.getViewportCount();for(let gt=0;gt<tt;gt++)s.sunShadowMatrix[R+gt]=ft.getMatrix(gt),s.sunShadowCascade[R+gt]=ft._cascadeData[gt];R+=tt,b++}s.sun[x]=et,x++}else if(X.isDirectionalLight){const et=t.get(X);if(et.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){const ft=X.shadow,z=i.get(X);z.shadowIntensity=ft.intensity,z.shadowBias=ft.bias,z.shadowNormalBias=ft.normalBias,z.shadowRadius=ft.radius,z.shadowMapSize=ft.mapSize,s.directionalShadow[M]=z,s.directionalShadowMap[M]=ot,s.directionalShadowMatrix[M]=X.shadow.matrix,N++}s.directional[M]=et,M++}else if(X.isSpotLight){const et=t.get(X);et.position.setFromMatrixPosition(X.matrixWorld),et.color.copy($).multiplyScalar(I),et.distance=W,et.coneCos=Math.cos(X.angle),et.penumbraCos=Math.cos(X.angle*(1-X.penumbra)),et.decay=X.decay,s.spot[U]=et;const ft=X.shadow;if(X.map&&(s.spotLightMap[E]=X.map,E++,ft.updateMatrices(X),X.castShadow&&L++),s.spotLightMatrix[U]=ft.matrix,X.castShadow){const z=i.get(X);z.shadowIntensity=ft.intensity,z.shadowBias=ft.bias,z.shadowNormalBias=ft.normalBias,z.shadowRadius=ft.radius,z.shadowMapSize=ft.mapSize,s.spotShadow[U]=z,s.spotShadowMap[U]=ot,C++}U++}else if(X.isRectAreaLight){const et=t.get(X);et.color.copy($).multiplyScalar(I),et.halfWidth.set(X.width*.5,0,0),et.halfHeight.set(0,X.height*.5,0),s.rectArea[P]=et,P++}else if(X.isPointLight){const et=t.get(X);if(et.color.copy(X.color).multiplyScalar(X.intensity),et.distance=X.distance,et.decay=X.decay,X.castShadow){const ft=X.shadow,z=i.get(X);z.shadowIntensity=ft.intensity,z.shadowBias=ft.bias,z.shadowNormalBias=ft.normalBias,z.shadowRadius=ft.radius,z.shadowMapSize=ft.mapSize,z.shadowCameraNear=ft.camera.near,z.shadowCameraFar=ft.camera.far,s.pointShadow[S]=z,s.pointShadowMap[S]=ot,s.pointShadowMatrix[S]=X.shadow.matrix,O++}s.point[S]=et,S++}else if(X.isHemisphereLight){const et=t.get(X);et.skyColor.copy(X.color).multiplyScalar(I),et.groundColor.copy(X.groundColor).multiplyScalar(I),s.hemi[A]=et,A++}}P>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Pt.LTC_FLOAT_1,s.rectAreaLTC2=Pt.LTC_FLOAT_2):(s.rectAreaLTC1=Pt.LTC_HALF_1,s.rectAreaLTC2=Pt.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=_,s.ambient[2]=g;const k=s.hash;(k.sunLength!==x||k.directionalLength!==M||k.pointLength!==S||k.spotLength!==U||k.rectAreaLength!==P||k.hemiLength!==A||k.numSunShadows!==b||k.numDirectionalShadows!==N||k.numPointShadows!==O||k.numSpotShadows!==C||k.numSpotMaps!==E||k.numLightProbes!==F)&&(s.sun.length=x,s.directional.length=M,s.spot.length=U,s.rectArea.length=P,s.point.length=S,s.hemi.length=A,s.sunShadow.length=b,s.sunShadowMap.length=b,s.sunShadowMatrix.length=R,s.sunShadowCascade.length=R,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.directionalShadowMatrix.length=N,s.pointShadow.length=O,s.pointShadowMap.length=O,s.pointShadowMatrix.length=O,s.spotShadow.length=C,s.spotShadowMap.length=C,s.spotLightMatrix.length=C+E-L,s.spotLightMap.length=E,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=F,k.sunLength=x,k.directionalLength=M,k.pointLength=S,k.spotLength=U,k.rectAreaLength=P,k.hemiLength=A,k.numSunShadows=b,k.numDirectionalShadows=N,k.numPointShadows=O,k.numSpotShadows=C,k.numSpotMaps=E,k.numLightProbes=F,s.version=r3++)}function m(d,v){let _=0,g=0,x=0,b=0,R=0,M=0;const S=v.matrixWorldInverse;for(let U=0,P=d.length;U<P;U++){const A=d[U];if(A.isSunLight){const N=s.sun[_];N.direction.setFromMatrixPosition(A.matrixWorld),N.direction.transformDirection(S),_++}else if(A.isDirectionalLight){const N=s.directional[g];N.direction.setFromMatrixPosition(A.matrixWorld),l.setFromMatrixPosition(A.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(S),g++}else if(A.isSpotLight){const N=s.spot[b];N.position.setFromMatrixPosition(A.matrixWorld),N.position.applyMatrix4(S),N.direction.setFromMatrixPosition(A.matrixWorld),l.setFromMatrixPosition(A.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(S),b++}else if(A.isRectAreaLight){const N=s.rectArea[R];N.position.setFromMatrixPosition(A.matrixWorld),N.position.applyMatrix4(S),f.identity(),c.copy(A.matrixWorld),c.premultiply(S),f.extractRotation(c),N.halfWidth.set(A.width*.5,0,0),N.halfHeight.set(0,A.height*.5,0),N.halfWidth.applyMatrix4(f),N.halfHeight.applyMatrix4(f),R++}else if(A.isPointLight){const N=s.point[x];N.position.setFromMatrixPosition(A.matrixWorld),N.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const N=s.hemi[M];N.direction.setFromMatrixPosition(A.matrixWorld),N.direction.transformDirection(S),M++}}}return{setup:p,setupView:m,state:s}}function v_(r){const t=new l3(r),i=[],s=[],l=[];function c(g){_.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function p(g){s.push(g)}function m(g){l.push(g)}function d(){t.setup(i)}function v(g){t.setupView(i,g)}const _={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:d,setupLightsView:v,pushLight:f,pushShadow:p,pushLightProbeGrid:m}}function c3(r){let t=new WeakMap;function i(l,c=0){const f=t.get(l);let p;return f===void 0?(p=new v_(r),t.set(l,[p])):c>=f.length?(p=new v_(r),f.push(p)):p=f[c],p}function s(){t=new WeakMap}return{get:i,dispose:s}}const u3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,h3=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],d3=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],__=new Ie,Zo=new H,sd=new H;function p3(r,t,i){let s=new hp;const l=new Qt,c=new Qt,f=new Ze,p=new M1,m=new E1,d={},v=i.maxTextureSize,_={[ls]:Hn,[Hn]:ls,[zi]:zi},g=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qt},radius:{value:4}},vertexShader:u3,fragmentShader:f3}),x=g.clone();x.defines.HORIZONTAL_PASS=1;const b=new xn;b.setAttribute("position",new ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new tn(b,g),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yc;let S=this.type;this.render=function(O,C,E){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||O.length===0)return;this.type===w_&&(ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Yc);const L=r.getRenderTarget(),F=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),G=r.state;G.setBlending(ba),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const J=S!==this.type;J&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach($=>$.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,$=O.length;X<$;X++){const I=O[X],W=I.shadow;if(W===void 0){ne("WebGLShadowMap:",I,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;l.copy(W.mapSize);const ot=W.getFrameExtents();l.multiply(ot),c.copy(W.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/ot.x),l.x=c.x*ot.x,W.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/ot.y),l.y=c.y*ot.y,W.mapSize.y=c.y));const et=r.state.buffers.depth.getReversed();if(W.camera._reversedDepth=et,W.map===null||J===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Ko){if(I.isPointLight){ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Ri(l.x,l.y,{format:Gs,type:Fi,minFilter:Fn,magFilter:Fn,generateMipmaps:!1}),W.map.texture.name=I.name+".shadowMap",W.map.depthTexture=new ol(l.x,l.y,Ki),W.map.depthTexture.name=I.name+".shadowMapDepth",W.map.depthTexture.format=Aa,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Pn,W.map.depthTexture.magFilter=Pn}else I.isPointLight?(W.map=new lx(l.x),W.map.depthTexture=new e1(l.x,ji)):(W.map=new Ri(l.x,l.y),W.map.depthTexture=new ol(l.x,l.y,ji)),W.map.depthTexture.name=I.name+".shadowMap",W.map.depthTexture.format=Aa,this.type===Yc?(W.map.depthTexture.compareFunction=et?rp:sp,W.map.depthTexture.minFilter=Fn,W.map.depthTexture.magFilter=Fn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Pn,W.map.depthTexture.magFilter=Pn);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==l.x||W.map.height!==l.y)&&W.map.setSize(l.x,l.y);const ft=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();I.isPointLight!==!0&&W.updateMatrices(I,E);for(let z=0;z<ft;z++){const tt=W.getCamera(z);if(I.isPointLight){const gt=W.camera,Et=W.matrix,Lt=I.distance||gt.far;Lt!==gt.far&&(gt.far=Lt,gt.updateProjectionMatrix()),Zo.setFromMatrixPosition(I.matrixWorld),gt.position.copy(Zo),sd.copy(gt.position),sd.add(h3[z]),gt.up.copy(d3[z]),gt.lookAt(sd),gt.updateMatrixWorld(),Et.makeTranslation(-Zo.x,-Zo.y,-Zo.z),__.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),W._frustum.setFromProjectionMatrix(__,gt.coordinateSystem,gt.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)r.setRenderTarget(W.map,z),r.clear();else{z===0&&(r.setRenderTarget(W.map),r.clear());const gt=W.getViewport(z);f.set(c.x*gt.x,c.y*gt.y,c.x*gt.z,c.y*gt.w),G.viewport(f)}s=W.getFrustum(z),A(C,E,tt,I,this.type)}W.isPointLightShadow!==!0&&this.type===Ko&&U(W,E),W.needsUpdate=!1}S=this.type,M.needsUpdate=!1,r.setRenderTarget(L,F,k)};function U(O,C){const E=t.update(R);g.defines.VSM_SAMPLES!==O.blurSamples&&(g.defines.VSM_SAMPLES=O.blurSamples,x.defines.VSM_SAMPLES=O.blurSamples,g.needsUpdate=!0,x.needsUpdate=!0),O.mapPass===null?O.mapPass=new Ri(l.x,l.y,{format:Gs,type:Fi}):(O.mapPass.width!==O.map.width||O.mapPass.height!==O.map.height)&&O.mapPass.setSize(O.map.width,O.map.height),g.uniforms.shadow_pass.value=O.map.depthTexture,g.uniforms.resolution.value.set(O.map.width,O.map.height),g.uniforms.radius.value=O.radius,r.setRenderTarget(O.mapPass),r.clear(),r.renderBufferDirect(C,null,E,g,R,null),x.uniforms.shadow_pass.value=O.mapPass.texture,x.uniforms.resolution.value.set(O.map.width,O.map.height),x.uniforms.radius.value=O.radius,r.setRenderTarget(O.map),r.clear(),r.renderBufferDirect(C,null,E,x,R,null)}function P(O,C,E,L){let F=null;const k=E.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(k!==void 0)F=k;else if(F=E.isPointLight===!0?m:p,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const G=F.uuid,J=C.uuid;let X=d[G];X===void 0&&(X={},d[G]=X);let $=X[J];$===void 0&&($=F.clone(),X[J]=$,C.addEventListener("dispose",N)),F=$}if(F.visible=C.visible,F.wireframe=C.wireframe,L===Ko?F.side=C.shadowSide!==null?C.shadowSide:C.side:F.side=C.shadowSide!==null?C.shadowSide:_[C.side],F.alphaMap=C.alphaMap,F.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,F.map=C.map,F.clipShadows=C.clipShadows,F.clippingPlanes=C.clippingPlanes,F.clipIntersection=C.clipIntersection,F.displacementMap=C.displacementMap,F.displacementScale=C.displacementScale,F.displacementBias=C.displacementBias,F.wireframeLinewidth=C.wireframeLinewidth,F.linewidth=C.linewidth,E.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const G=r.properties.get(F);G.light=E}return F}function A(O,C,E,L,F){if(O.visible===!1)return;if(O.layers.test(C.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&F===Ko)&&(!O.frustumCulled||O.intersectsFrustum(s))){O.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,O.matrixWorld);const J=t.update(O),X=O.material;if(Array.isArray(X)){const $=J.groups;for(let I=0,W=$.length;I<W;I++){const ot=$[I],et=X[ot.materialIndex];if(et&&et.visible){const ft=P(O,et,L,F);O.onBeforeShadow(r,O,C,E,J,ft,ot),r.renderBufferDirect(E,null,J,ft,O,ot),O.onAfterShadow(r,O,C,E,J,ft,ot)}}}else if(X.visible){const $=P(O,X,L,F);O.onBeforeShadow(r,O,C,E,J,$,null),r.renderBufferDirect(E,null,J,$,O,null),O.onAfterShadow(r,O,C,E,J,$,null)}}const G=O.children;for(let J=0,X=G.length;J<X;J++)A(G[J],C,E,L,F)}function N(O){O.target.removeEventListener("dispose",N);for(const E in d){const L=d[E],F=O.target.uuid;F in L&&(L[F].dispose(),delete L[F])}}}function m3(r,t){function i(){let Z=!1;const wt=new Ze;let xt=null;const Rt=new Ze(0,0,0,0);return{setMask:function(zt){xt!==zt&&!Z&&(r.colorMask(zt,zt,zt,zt),xt=zt)},setLocked:function(zt){Z=zt},setClear:function(zt,Mt,Zt,Xt,Fe){Fe===!0&&(zt*=Xt,Mt*=Xt,Zt*=Xt),wt.set(zt,Mt,Zt,Xt),Rt.equals(wt)===!1&&(r.clearColor(zt,Mt,Zt,Xt),Rt.copy(wt))},reset:function(){Z=!1,xt=null,Rt.set(-1,0,0,0)}}}function s(){let Z=!1,wt=!1,xt=null,Rt=null,zt=null;return{setReversed:function(Mt){if(wt!==Mt){const Zt=t.get("EXT_clip_control");Mt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT),wt=Mt;const Xt=zt;zt=null,this.setClear(Xt)}},getReversed:function(){return wt},setTest:function(Mt){Mt?vt(r.DEPTH_TEST):Tt(r.DEPTH_TEST)},setMask:function(Mt){xt!==Mt&&!Z&&(r.depthMask(Mt),xt=Mt)},setFunc:function(Mt){if(wt&&(Mt=dM[Mt]),Rt!==Mt){switch(Mt){case od:r.depthFunc(r.NEVER);break;case ld:r.depthFunc(r.ALWAYS);break;case cd:r.depthFunc(r.LESS);break;case nl:r.depthFunc(r.LEQUAL);break;case ud:r.depthFunc(r.EQUAL);break;case fd:r.depthFunc(r.GEQUAL);break;case hd:r.depthFunc(r.GREATER);break;case dd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Rt=Mt}},setLocked:function(Mt){Z=Mt},setClear:function(Mt){zt!==Mt&&(zt=Mt,wt&&(Mt=1-Mt),r.clearDepth(Mt))},reset:function(){Z=!1,xt=null,Rt=null,zt=null,wt=!1}}}function l(){let Z=!1,wt=null,xt=null,Rt=null,zt=null,Mt=null,Zt=null,Xt=null,Fe=null;return{setTest:function(be){Z||(be?vt(r.STENCIL_TEST):Tt(r.STENCIL_TEST))},setMask:function(be){wt!==be&&!Z&&(r.stencilMask(be),wt=be)},setFunc:function(be,Yn,ai){(xt!==be||Rt!==Yn||zt!==ai)&&(r.stencilFunc(be,Yn,ai),xt=be,Rt=Yn,zt=ai)},setOp:function(be,Yn,ai){(Mt!==be||Zt!==Yn||Xt!==ai)&&(r.stencilOp(be,Yn,ai),Mt=be,Zt=Yn,Xt=ai)},setLocked:function(be){Z=be},setClear:function(be){Fe!==be&&(r.clearStencil(be),Fe=be)},reset:function(){Z=!1,wt=null,xt=null,Rt=null,zt=null,Mt=null,Zt=null,Xt=null,Fe=null}}}const c=new i,f=new s,p=new l,m=new WeakMap,d=new WeakMap;let v={},_={},g={},x=new WeakMap,b=[],R=null,M=!1,S=null,U=null,P=null,A=null,N=null,O=null,C=null,E=new ee(0,0,0),L=0,F=!1,k=null,G=null,J=null,X=null,$=null;const I=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ot=0;const et=r.getParameter(r.VERSION);et.indexOf("WebGL")!==-1?(ot=parseFloat(/^WebGL (\d)/.exec(et)[1]),W=ot>=1):et.indexOf("OpenGL ES")!==-1&&(ot=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),W=ot>=2);let ft=null,z={};const tt=r.getParameter(r.SCISSOR_BOX),gt=r.getParameter(r.VIEWPORT),Et=new Ze().fromArray(tt),Lt=new Ze().fromArray(gt);function kt(Z,wt,xt,Rt){const zt=new Uint8Array(4),Mt=r.createTexture();r.bindTexture(Z,Mt),r.texParameteri(Z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Zt=0;Zt<xt;Zt++)Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,Rt,0,r.RGBA,r.UNSIGNED_BYTE,zt):r.texImage2D(wt+Zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,zt);return Mt}const st={};st[r.TEXTURE_2D]=kt(r.TEXTURE_2D,r.TEXTURE_2D,1),st[r.TEXTURE_CUBE_MAP]=kt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[r.TEXTURE_2D_ARRAY]=kt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),st[r.TEXTURE_3D]=kt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),p.setClear(0),vt(r.DEPTH_TEST),f.setFunc(nl),ge(!1),Xe(pv),vt(r.CULL_FACE),xe(ba);function vt(Z){v[Z]!==!0&&(r.enable(Z),v[Z]=!0)}function Tt(Z){v[Z]!==!1&&(r.disable(Z),v[Z]=!1)}function te(Z,wt){return g[Z]!==wt?(r.bindFramebuffer(Z,wt),g[Z]=wt,Z===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=wt),Z===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function Ft(Z,wt){let xt=b,Rt=!1;if(Z){xt=x.get(wt),xt===void 0&&(xt=[],x.set(wt,xt));const zt=Z.textures;if(xt.length!==zt.length||xt[0]!==r.COLOR_ATTACHMENT0){for(let Mt=0,Zt=zt.length;Mt<Zt;Mt++)xt[Mt]=r.COLOR_ATTACHMENT0+Mt;xt.length=zt.length,Rt=!0}}else xt[0]!==r.BACK&&(xt[0]=r.BACK,Rt=!0);Rt&&r.drawBuffers(xt)}function le(Z){return R!==Z?(r.useProgram(Z),R=Z,!0):!1}const en={[Pr]:r.FUNC_ADD,[Oy]:r.FUNC_SUBTRACT,[Py]:r.FUNC_REVERSE_SUBTRACT};en[zy]=r.MIN,en[By]=r.MAX;const ae={[Iy]:r.ZERO,[Fy]:r.ONE,[Hy]:r.SRC_COLOR,[R_]:r.SRC_ALPHA,[qy]:r.SRC_ALPHA_SATURATE,[Xy]:r.DST_COLOR,[Vy]:r.DST_ALPHA,[Gy]:r.ONE_MINUS_SRC_COLOR,[C_]:r.ONE_MINUS_SRC_ALPHA,[Wy]:r.ONE_MINUS_DST_COLOR,[ky]:r.ONE_MINUS_DST_ALPHA,[Yy]:r.CONSTANT_COLOR,[Zy]:r.ONE_MINUS_CONSTANT_COLOR,[Ky]:r.CONSTANT_ALPHA,[Qy]:r.ONE_MINUS_CONSTANT_ALPHA};function xe(Z,wt,xt,Rt,zt,Mt,Zt,Xt,Fe,be){if(Z===ba){M===!0&&(Tt(r.BLEND),M=!1);return}if(M===!1&&(vt(r.BLEND),M=!0),Z!==Ny){if(Z!==S||be!==F){if((U!==Pr||N!==Pr)&&(r.blendEquation(r.FUNC_ADD),U=Pr,N=Pr),be)switch(Z){case Jo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fr:r.blendFunc(r.ONE,r.ONE);break;case mv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case gv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ae("WebGLState: Invalid blending: ",Z);break}else switch(Z){case Jo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case mv:Ae("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gv:Ae("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ae("WebGLState: Invalid blending: ",Z);break}P=null,A=null,O=null,C=null,E.set(0,0,0),L=0,S=Z,F=be}return}zt=zt||wt,Mt=Mt||xt,Zt=Zt||Rt,(wt!==U||zt!==N)&&(r.blendEquationSeparate(en[wt],en[zt]),U=wt,N=zt),(xt!==P||Rt!==A||Mt!==O||Zt!==C)&&(r.blendFuncSeparate(ae[xt],ae[Rt],ae[Mt],ae[Zt]),P=xt,A=Rt,O=Mt,C=Zt),(Xt.equals(E)===!1||Fe!==L)&&(r.blendColor(Xt.r,Xt.g,Xt.b,Fe),E.copy(Xt),L=Fe),S=Z,F=!1}function Ne(Z,wt){Z.side===zi?Tt(r.CULL_FACE):vt(r.CULL_FACE);let xt=Z.side===Hn;wt&&(xt=!xt),ge(xt),Z.blending===Jo&&Z.transparent===!1?xe(ba):xe(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),f.setFunc(Z.depthFunc),f.setTest(Z.depthTest),f.setMask(Z.depthWrite),c.setMask(Z.colorWrite);const Rt=Z.stencilWrite;p.setTest(Rt),Rt&&(p.setMask(Z.stencilWriteMask),p.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),p.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),An(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?vt(r.SAMPLE_ALPHA_TO_COVERAGE):Tt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ge(Z){k!==Z&&(Z?r.frontFace(r.CW):r.frontFace(r.CCW),k=Z)}function Xe(Z){Z!==Uy?(vt(r.CULL_FACE),Z!==G&&(Z===pv?r.cullFace(r.BACK):Z===Ly?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Tt(r.CULL_FACE),G=Z}function nn(Z){Z!==J&&(W&&r.lineWidth(Z),J=Z)}function An(Z,wt,xt){Z?(vt(r.POLYGON_OFFSET_FILL),(X!==wt||$!==xt)&&(X=wt,$=xt,f.getReversed()&&(wt=-wt),r.polygonOffset(wt,xt))):Tt(r.POLYGON_OFFSET_FILL)}function We(Z){Z?vt(r.SCISSOR_TEST):Tt(r.SCISSOR_TEST)}function an(Z){Z===void 0&&(Z=r.TEXTURE0+I-1),ft!==Z&&(r.activeTexture(Z),ft=Z)}function K(Z,wt,xt){xt===void 0&&(ft===null?xt=r.TEXTURE0+I-1:xt=ft);let Rt=z[xt];Rt===void 0&&(Rt={type:void 0,texture:void 0},z[xt]=Rt),(Rt.type!==Z||Rt.texture!==wt)&&(ft!==xt&&(r.activeTexture(xt),ft=xt),r.bindTexture(Z,wt||st[Z]),Rt.type=Z,Rt.texture=wt)}function Oe(){const Z=z[ft];Z!==void 0&&Z.type!==void 0&&(r.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function De(){try{r.compressedTexImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function B(){try{r.compressedTexImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function T(){try{r.texSubImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function j(){try{r.texSubImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function lt(){try{r.compressedTexSubImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function dt(){try{r.compressedTexSubImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function bt(){try{r.texStorage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function Ct(){try{r.texStorage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function pt(){try{r.texImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function mt(){try{r.texImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function At(Z){return _[Z]!==void 0?_[Z]:r.getParameter(Z)}function Ht(Z,wt){_[Z]!==wt&&(r.pixelStorei(Z,wt),_[Z]=wt)}function Nt(Z){Et.equals(Z)===!1&&(r.scissor(Z.x,Z.y,Z.z,Z.w),Et.copy(Z))}function Dt(Z){Lt.equals(Z)===!1&&(r.viewport(Z.x,Z.y,Z.z,Z.w),Lt.copy(Z))}function Kt(Z,wt){let xt=d.get(wt);xt===void 0&&(xt=new WeakMap,d.set(wt,xt));let Rt=xt.get(Z);Rt===void 0&&(Rt=r.getUniformBlockIndex(wt,Z.name),xt.set(Z,Rt))}function Jt(Z,wt){const Rt=d.get(wt).get(Z);m.get(wt)!==Rt&&(r.uniformBlockBinding(wt,Rt,Z.__bindingPointIndex),m.set(wt,Rt))}function ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},ft=null,z={},g={},x=new WeakMap,b=[],R=null,M=!1,S=null,U=null,P=null,A=null,N=null,O=null,C=null,E=new ee(0,0,0),L=0,F=!1,k=null,G=null,J=null,X=null,$=null,Et.set(0,0,r.canvas.width,r.canvas.height),Lt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),p.reset()}return{buffers:{color:c,depth:f,stencil:p},enable:vt,disable:Tt,bindFramebuffer:te,drawBuffers:Ft,useProgram:le,setBlending:xe,setMaterial:Ne,setFlipSided:ge,setCullFace:Xe,setLineWidth:nn,setPolygonOffset:An,setScissorTest:We,activeTexture:an,bindTexture:K,unbindTexture:Oe,compressedTexImage2D:De,compressedTexImage3D:B,texImage2D:pt,texImage3D:mt,pixelStorei:Ht,getParameter:At,updateUBOMapping:Kt,uniformBlockBinding:Jt,texStorage2D:bt,texStorage3D:Ct,texSubImage2D:T,texSubImage3D:j,compressedTexSubImage2D:lt,compressedTexSubImage3D:dt,scissor:Nt,viewport:Dt,reset:ie}}function g3(r,t,i,s,l,c,f){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Qt,v=new WeakMap,_=new Set;let g;const x=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(B,T){return b?new OffscreenCanvas(B,T):au("canvas")}function M(B,T,j){let lt=1;const dt=De(B);if((dt.width>j||dt.height>j)&&(lt=j/Math.max(dt.width,dt.height)),lt<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const bt=Math.floor(lt*dt.width),Ct=Math.floor(lt*dt.height);g===void 0&&(g=R(bt,Ct));const pt=T?R(bt,Ct):g;return pt.width=bt,pt.height=Ct,pt.getContext("2d").drawImage(B,0,0,bt,Ct),ne("WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+bt+"x"+Ct+")."),pt}else return"data"in B&&ne("WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),B;return B}function S(B){return B.generateMipmaps}function U(B){r.generateMipmap(B)}function P(B){return B.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?r.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(B,T,j,lt,dt,bt=!1){if(B!==null){if(r[B]!==void 0)return r[B];ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let Ct;lt&&(Ct=t.get("EXT_texture_norm16"),Ct||ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pt=T;if(T===r.RED&&(j===r.FLOAT&&(pt=r.R32F),j===r.HALF_FLOAT&&(pt=r.R16F),j===r.UNSIGNED_BYTE&&(pt=r.R8),j===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.R16_EXT),j===r.SHORT&&Ct&&(pt=Ct.R16_SNORM_EXT)),T===r.RED_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.R8UI),j===r.UNSIGNED_SHORT&&(pt=r.R16UI),j===r.UNSIGNED_INT&&(pt=r.R32UI),j===r.BYTE&&(pt=r.R8I),j===r.SHORT&&(pt=r.R16I),j===r.INT&&(pt=r.R32I)),T===r.RG&&(j===r.FLOAT&&(pt=r.RG32F),j===r.HALF_FLOAT&&(pt=r.RG16F),j===r.UNSIGNED_BYTE&&(pt=r.RG8),j===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RG16_EXT),j===r.SHORT&&Ct&&(pt=Ct.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RG8UI),j===r.UNSIGNED_SHORT&&(pt=r.RG16UI),j===r.UNSIGNED_INT&&(pt=r.RG32UI),j===r.BYTE&&(pt=r.RG8I),j===r.SHORT&&(pt=r.RG16I),j===r.INT&&(pt=r.RG32I)),T===r.RGB_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RGB8UI),j===r.UNSIGNED_SHORT&&(pt=r.RGB16UI),j===r.UNSIGNED_INT&&(pt=r.RGB32UI),j===r.BYTE&&(pt=r.RGB8I),j===r.SHORT&&(pt=r.RGB16I),j===r.INT&&(pt=r.RGB32I)),T===r.RGBA_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RGBA8UI),j===r.UNSIGNED_SHORT&&(pt=r.RGBA16UI),j===r.UNSIGNED_INT&&(pt=r.RGBA32UI),j===r.BYTE&&(pt=r.RGBA8I),j===r.SHORT&&(pt=r.RGBA16I),j===r.INT&&(pt=r.RGBA32I)),T===r.RGB&&(j===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RGB16_EXT),j===r.SHORT&&Ct&&(pt=Ct.RGB16_SNORM_EXT),j===r.UNSIGNED_INT_5_9_9_9_REV&&(pt=r.RGB9_E5),j===r.UNSIGNED_INT_10F_11F_11F_REV&&(pt=r.R11F_G11F_B10F)),T===r.RGBA){const mt=bt?iu:Ee.getTransfer(dt);j===r.FLOAT&&(pt=r.RGBA32F),j===r.HALF_FLOAT&&(pt=r.RGBA16F),j===r.UNSIGNED_BYTE&&(pt=mt===Be?r.SRGB8_ALPHA8:r.RGBA8),j===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RGBA16_EXT),j===r.SHORT&&Ct&&(pt=Ct.RGBA16_SNORM_EXT),j===r.UNSIGNED_SHORT_4_4_4_4&&(pt=r.RGBA4),j===r.UNSIGNED_SHORT_5_5_5_1&&(pt=r.RGB5_A1)}return(pt===r.R16F||pt===r.R32F||pt===r.RG16F||pt===r.RG32F||pt===r.RGBA16F||pt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),pt}function N(B,T){let j;return B?T===null||T===ji||T===al?j=r.DEPTH24_STENCIL8:T===Ki?j=r.DEPTH32F_STENCIL8:T===il&&(j=r.DEPTH24_STENCIL8,ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ji||T===al?j=r.DEPTH_COMPONENT24:T===Ki?j=r.DEPTH_COMPONENT32F:T===il&&(j=r.DEPTH_COMPONENT16),j}function O(B,T){return S(B)===!0||B.isFramebufferTexture&&B.minFilter!==Pn&&B.minFilter!==Fn?Math.log2(Math.max(T.width,T.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?T.mipmaps.length:1}function C(B){const T=B.target;T.removeEventListener("dispose",C),L(T),T.isVideoTexture&&v.delete(T),T.isHTMLTexture&&_.delete(T)}function E(B){const T=B.target;T.removeEventListener("dispose",E),k(T)}function L(B){const T=s.get(B);if(T.__webglInit===void 0)return;const j=B.source,lt=x.get(j);if(lt){const dt=lt[T.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&F(B),Object.keys(lt).length===0&&x.delete(j)}s.remove(B)}function F(B){const T=s.get(B);r.deleteTexture(T.__webglTexture);const j=B.source,lt=x.get(j);delete lt[T.__cacheKey],f.memory.textures--}function k(B){const T=s.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),s.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(T.__webglFramebuffer[lt]))for(let dt=0;dt<T.__webglFramebuffer[lt].length;dt++)r.deleteFramebuffer(T.__webglFramebuffer[lt][dt]);else r.deleteFramebuffer(T.__webglFramebuffer[lt]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[lt])}else{if(Array.isArray(T.__webglFramebuffer))for(let lt=0;lt<T.__webglFramebuffer.length;lt++)r.deleteFramebuffer(T.__webglFramebuffer[lt]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let lt=0;lt<T.__webglColorRenderbuffer.length;lt++)T.__webglColorRenderbuffer[lt]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[lt]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const j=B.textures;for(let lt=0,dt=j.length;lt<dt;lt++){const bt=s.get(j[lt]);bt.__webglTexture&&(r.deleteTexture(bt.__webglTexture),f.memory.textures--),s.remove(j[lt])}s.remove(B)}let G=0;function J(){G=0}function X(){return G}function $(B){G=B}function I(){const B=G;return B>=l.maxTextures&&ne("WebGLTextures: Trying to use "+(B+1)+" texture units while this GPU supports only "+l.maxTextures),G+=1,B}function W(B){const T=[];return T.push(B.wrapS),T.push(B.wrapT),T.push(B.wrapR||0),T.push(B.magFilter),T.push(B.minFilter),T.push(B.anisotropy),T.push(B.internalFormat),T.push(B.format),T.push(B.type),T.push(B.generateMipmaps),T.push(B.premultiplyAlpha),T.push(B.flipY),T.push(B.unpackAlignment),T.push(B.colorSpace),T.join()}function ot(B,T){const j=s.get(B);if(B.isVideoTexture&&K(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&j.__version!==B.version){const lt=B.image;if(lt===null)ne("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(j,B,T);return}}else B.isExternalTexture&&(j.__webglTexture=B.sourceTexture?B.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,j.__webglTexture,r.TEXTURE0+T)}function et(B,T){const j=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&j.__version!==B.version){Tt(j,B,T);return}else B.isExternalTexture&&(j.__webglTexture=B.sourceTexture?B.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,j.__webglTexture,r.TEXTURE0+T)}function ft(B,T){const j=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&j.__version!==B.version){Tt(j,B,T);return}i.bindTexture(r.TEXTURE_3D,j.__webglTexture,r.TEXTURE0+T)}function z(B,T){const j=s.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&j.__version!==B.version){te(j,B,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture,r.TEXTURE0+T)}const tt={[$c]:r.REPEAT,[Ea]:r.CLAMP_TO_EDGE,[pd]:r.MIRRORED_REPEAT},gt={[Pn]:r.NEAREST,[$y]:r.NEAREST_MIPMAP_NEAREST,[Mc]:r.NEAREST_MIPMAP_LINEAR,[Fn]:r.LINEAR,[wh]:r.LINEAR_MIPMAP_NEAREST,[Bs]:r.LINEAR_MIPMAP_LINEAR},Et={[iM]:r.NEVER,[lM]:r.ALWAYS,[aM]:r.LESS,[sp]:r.LEQUAL,[sM]:r.EQUAL,[rp]:r.GEQUAL,[rM]:r.GREATER,[oM]:r.NOTEQUAL};function Lt(B,T){if(T.type===Ki&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Fn||T.magFilter===wh||T.magFilter===Mc||T.magFilter===Bs||T.minFilter===Fn||T.minFilter===wh||T.minFilter===Mc||T.minFilter===Bs)&&ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(B,r.TEXTURE_WRAP_S,tt[T.wrapS]),r.texParameteri(B,r.TEXTURE_WRAP_T,tt[T.wrapT]),(B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY)&&r.texParameteri(B,r.TEXTURE_WRAP_R,tt[T.wrapR]),r.texParameteri(B,r.TEXTURE_MAG_FILTER,gt[T.magFilter]),r.texParameteri(B,r.TEXTURE_MIN_FILTER,gt[T.minFilter]),T.compareFunction&&(r.texParameteri(B,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(B,r.TEXTURE_COMPARE_FUNC,Et[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Pn||T.minFilter!==Mc&&T.minFilter!==Bs||T.type===Ki&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const j=t.get("EXT_texture_filter_anisotropic");r.texParameterf(B,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function kt(B,T){let j=!1;B.__webglInit===void 0&&(B.__webglInit=!0,T.addEventListener("dispose",C));const lt=T.source;let dt=x.get(lt);dt===void 0&&(dt={},x.set(lt,dt));const bt=W(T);if(bt!==B.__cacheKey){dt[bt]===void 0&&(dt[bt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,j=!0),dt[bt].usedTimes++;const Ct=dt[B.__cacheKey];Ct!==void 0&&(dt[B.__cacheKey].usedTimes--,Ct.usedTimes===0&&F(T)),B.__cacheKey=bt,B.__webglTexture=dt[bt].texture}return j}function st(B,T,j){return Math.floor(Math.floor(B/j)/T)}function vt(B,T,j,lt){const bt=B.updateRanges;if(bt.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,j,lt,T.data);else{bt.sort((Ht,Nt)=>Ht.start-Nt.start);let Ct=0;for(let Ht=1;Ht<bt.length;Ht++){const Nt=bt[Ct],Dt=bt[Ht],Kt=Nt.start+Nt.count,Jt=st(Dt.start,T.width,4),ie=st(Nt.start,T.width,4);Dt.start<=Kt+1&&Jt===ie&&st(Dt.start+Dt.count-1,T.width,4)===Jt?Nt.count=Math.max(Nt.count,Dt.start+Dt.count-Nt.start):(++Ct,bt[Ct]=Dt)}bt.length=Ct+1;const pt=i.getParameter(r.UNPACK_ROW_LENGTH),mt=i.getParameter(r.UNPACK_SKIP_PIXELS),At=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let Ht=0,Nt=bt.length;Ht<Nt;Ht++){const Dt=bt[Ht],Kt=Math.floor(Dt.start/4),Jt=Math.ceil(Dt.count/4),ie=Kt%T.width,Z=Math.floor(Kt/T.width),wt=Jt,xt=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,ie),i.pixelStorei(r.UNPACK_SKIP_ROWS,Z),i.texSubImage2D(r.TEXTURE_2D,0,ie,Z,wt,xt,j,lt,T.data)}B.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,pt),i.pixelStorei(r.UNPACK_SKIP_PIXELS,mt),i.pixelStorei(r.UNPACK_SKIP_ROWS,At)}}function Tt(B,T,j){let lt=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(lt=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(lt=r.TEXTURE_3D);const dt=kt(B,T),bt=T.source;i.bindTexture(lt,B.__webglTexture,r.TEXTURE0+j);const Ct=s.get(bt);if(bt.version!==Ct.__version||dt===!0){if(i.activeTexture(r.TEXTURE0+j),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const xt=Ee.getPrimaries(Ee.workingColorSpace),Rt=T.colorSpace===rs?null:Ee.getPrimaries(T.colorSpace),zt=T.colorSpace===rs||xt===Rt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt)}i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let mt=M(T.image,!1,l.maxTextureSize);mt=Oe(T,mt);const At=c.convert(T.format,T.colorSpace),Ht=c.convert(T.type);let Nt=A(T.internalFormat,At,Ht,T.normalized,T.colorSpace,T.isVideoTexture);Lt(lt,T);let Dt;const Kt=T.mipmaps,Jt=T.isVideoTexture!==!0,ie=Ct.__version===void 0||dt===!0,Z=bt.dataReady,wt=O(T,mt);if(T.isDepthTexture)Nt=N(T.format===Is,T.type),ie&&(Jt?i.texStorage2D(r.TEXTURE_2D,1,Nt,mt.width,mt.height):i.texImage2D(r.TEXTURE_2D,0,Nt,mt.width,mt.height,0,At,Ht,null));else if(T.isDataTexture)if(Kt.length>0){Jt&&ie&&i.texStorage2D(r.TEXTURE_2D,wt,Nt,Kt[0].width,Kt[0].height);for(let xt=0,Rt=Kt.length;xt<Rt;xt++)Dt=Kt[xt],Jt?Z&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Ht,Dt.data):i.texImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,At,Ht,Dt.data);T.generateMipmaps=!1}else Jt?(ie&&i.texStorage2D(r.TEXTURE_2D,wt,Nt,mt.width,mt.height),Z&&vt(T,mt,At,Ht)):i.texImage2D(r.TEXTURE_2D,0,Nt,mt.width,mt.height,0,At,Ht,mt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Jt&&ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,wt,Nt,Kt[0].width,Kt[0].height,mt.depth);for(let xt=0,Rt=Kt.length;xt<Rt;xt++)if(Dt=Kt[xt],T.format!==Ii)if(At!==null)if(Jt){if(Z)if(T.layerUpdates.size>0){const zt=Qv(Dt.width,Dt.height,T.format,T.type);for(const Mt of T.layerUpdates){const Zt=Dt.data.subarray(Mt*zt/Dt.data.BYTES_PER_ELEMENT,(Mt+1)*zt/Dt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,Mt,Dt.width,Dt.height,1,At,Zt)}}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Dt.width,Dt.height,mt.depth,At,Dt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,xt,Nt,Dt.width,Dt.height,mt.depth,0,Dt.data,0,0);else ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?Z&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Dt.width,Dt.height,mt.depth,At,Ht,Dt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,xt,Nt,Dt.width,Dt.height,mt.depth,0,At,Ht,Dt.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{Jt&&ie&&i.texStorage2D(r.TEXTURE_2D,wt,Nt,Kt[0].width,Kt[0].height);for(let xt=0,Rt=Kt.length;xt<Rt;xt++)Dt=Kt[xt],T.format!==Ii?At!==null?Jt?Z&&i.compressedTexSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Dt.data):i.compressedTexImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,Dt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?Z&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Ht,Dt.data):i.texImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(T.isDataArrayTexture)if(Jt){if(ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,wt,Nt,mt.width,mt.height,mt.depth),Z)if(T.layerUpdates.size>0){const xt=Qv(mt.width,mt.height,T.format,T.type);for(const Rt of T.layerUpdates){const zt=mt.data.subarray(Rt*xt/mt.data.BYTES_PER_ELEMENT,(Rt+1)*xt/mt.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Rt,mt.width,mt.height,1,At,Ht,zt)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,At,Ht,mt.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Nt,mt.width,mt.height,mt.depth,0,At,Ht,mt.data);else if(T.isData3DTexture)Jt?(ie&&i.texStorage3D(r.TEXTURE_3D,wt,Nt,mt.width,mt.height,mt.depth),Z&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,At,Ht,mt.data)):i.texImage3D(r.TEXTURE_3D,0,Nt,mt.width,mt.height,mt.depth,0,At,Ht,mt.data);else if(T.isFramebufferTexture){if(ie)if(Jt)i.texStorage2D(r.TEXTURE_2D,wt,Nt,mt.width,mt.height);else{let xt=mt.width,Rt=mt.height;for(let zt=0;zt<wt;zt++)i.texImage2D(r.TEXTURE_2D,zt,Nt,xt,Rt,0,At,Ht,null),xt>>=1,Rt>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const xt=r.canvas;if(xt.hasAttribute("layoutsubtree")||xt.setAttribute("layoutsubtree","true"),mt.parentNode!==xt){xt.appendChild(mt),_.add(T),xt.onpaint=Rt=>{const zt=Rt.changedElements;for(const Mt of _)zt.includes(Mt.image)&&(Mt.needsUpdate=!0)},xt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,mt);else{const zt=r.RGBA,Mt=r.RGBA,Zt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,zt,Mt,Zt,mt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Kt.length>0){if(Jt&&ie){const xt=De(Kt[0]);i.texStorage2D(r.TEXTURE_2D,wt,Nt,xt.width,xt.height)}for(let xt=0,Rt=Kt.length;xt<Rt;xt++)Dt=Kt[xt],Jt?Z&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,At,Ht,Dt):i.texImage2D(r.TEXTURE_2D,xt,Nt,At,Ht,Dt);T.generateMipmaps=!1}else if(Jt){if(ie){const xt=De(mt);i.texStorage2D(r.TEXTURE_2D,wt,Nt,xt.width,xt.height)}Z&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Ht,mt)}else i.texImage2D(r.TEXTURE_2D,0,Nt,At,Ht,mt);S(T)&&U(lt),Ct.__version=bt.version,T.onUpdate&&T.onUpdate(T)}B.__version=T.version}function te(B,T,j){if(T.image.length!==6)return;const lt=kt(B,T),dt=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+j);const bt=s.get(dt);if(dt.version!==bt.__version||lt===!0){i.activeTexture(r.TEXTURE0+j);const Ct=Ee.getPrimaries(Ee.workingColorSpace),pt=T.colorSpace===rs?null:Ee.getPrimaries(T.colorSpace),mt=T.colorSpace===rs||Ct===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const At=T.isCompressedTexture||T.image[0].isCompressedTexture,Ht=T.image[0]&&T.image[0].isDataTexture,Nt=[];for(let Mt=0;Mt<6;Mt++)!At&&!Ht?Nt[Mt]=M(T.image[Mt],!0,l.maxCubemapSize):Nt[Mt]=Ht?T.image[Mt].image:T.image[Mt],Nt[Mt]=Oe(T,Nt[Mt]);const Dt=Nt[0],Kt=c.convert(T.format,T.colorSpace),Jt=c.convert(T.type),ie=A(T.internalFormat,Kt,Jt,T.normalized,T.colorSpace),Z=T.isVideoTexture!==!0,wt=bt.__version===void 0||lt===!0,xt=dt.dataReady;let Rt=O(T,Dt);Lt(r.TEXTURE_CUBE_MAP,T);let zt;if(At){Z&&wt&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,ie,Dt.width,Dt.height);for(let Mt=0;Mt<6;Mt++){zt=Nt[Mt].mipmaps;for(let Zt=0;Zt<zt.length;Zt++){const Xt=zt[Zt];T.format!==Ii?Kt!==null?Z?xt&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt,0,0,Xt.width,Xt.height,Kt,Xt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt,ie,Xt.width,Xt.height,0,Xt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt,0,0,Xt.width,Xt.height,Kt,Jt,Xt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt,ie,Xt.width,Xt.height,0,Kt,Jt,Xt.data)}}}else{if(zt=T.mipmaps,Z&&wt){zt.length>0&&Rt++;const Mt=De(Nt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,ie,Mt.width,Mt.height)}for(let Mt=0;Mt<6;Mt++)if(Ht){Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Nt[Mt].width,Nt[Mt].height,Kt,Jt,Nt[Mt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ie,Nt[Mt].width,Nt[Mt].height,0,Kt,Jt,Nt[Mt].data);for(let Zt=0;Zt<zt.length;Zt++){const Fe=zt[Zt].image[Mt].image;Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt+1,0,0,Fe.width,Fe.height,Kt,Jt,Fe.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt+1,ie,Fe.width,Fe.height,0,Kt,Jt,Fe.data)}}else{Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Kt,Jt,Nt[Mt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ie,Kt,Jt,Nt[Mt]);for(let Zt=0;Zt<zt.length;Zt++){const Xt=zt[Zt];Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt+1,0,0,Kt,Jt,Xt.image[Mt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt+1,ie,Kt,Jt,Xt.image[Mt])}}}S(T)&&U(r.TEXTURE_CUBE_MAP),bt.__version=dt.version,T.onUpdate&&T.onUpdate(T)}B.__version=T.version}function Ft(B,T,j,lt,dt,bt){const Ct=c.convert(j.format,j.colorSpace),pt=c.convert(j.type),mt=A(j.internalFormat,Ct,pt,j.normalized,j.colorSpace),At=s.get(T),Ht=s.get(j);if(Ht.__renderTarget=T,!At.__hasExternalTextures){const Nt=Math.max(1,T.width>>bt),Dt=Math.max(1,T.height>>bt);dt===r.TEXTURE_3D||dt===r.TEXTURE_2D_ARRAY?i.texImage3D(dt,bt,mt,Nt,Dt,T.depth,0,Ct,pt,null):i.texImage2D(dt,bt,mt,Nt,Dt,0,Ct,pt,null)}i.bindFramebuffer(r.FRAMEBUFFER,B),an(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,lt,dt,Ht.__webglTexture,0,We(T)):(dt===r.TEXTURE_2D||dt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,lt,dt,Ht.__webglTexture,bt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function le(B,T,j){if(r.bindRenderbuffer(r.RENDERBUFFER,B),T.depthBuffer){const lt=T.depthTexture,dt=lt&&lt.isDepthTexture?lt.type:null,bt=N(T.stencilBuffer,dt),Ct=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;an(T)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(T),bt,T.width,T.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(T),bt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,bt,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ct,r.RENDERBUFFER,B)}else{const lt=T.textures;for(let dt=0;dt<lt.length;dt++){const bt=lt[dt],Ct=c.convert(bt.format,bt.colorSpace),pt=c.convert(bt.type),mt=A(bt.internalFormat,Ct,pt,bt.normalized,bt.colorSpace);an(T)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(T),mt,T.width,T.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(T),mt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,mt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function en(B,T,j){const lt=T.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,B),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const dt=s.get(T.depthTexture);if(dt.__renderTarget=T,(!dt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),lt){if(dt.__webglInit===void 0&&(dt.__webglInit=!0,T.depthTexture.addEventListener("dispose",C)),dt.__webglTexture===void 0){dt.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T.depthTexture);const At=c.convert(T.depthTexture.format),Ht=c.convert(T.depthTexture.type);let Nt;T.depthTexture.format===Aa?Nt=r.DEPTH_COMPONENT24:T.depthTexture.format===Is&&(Nt=r.DEPTH24_STENCIL8);for(let Dt=0;Dt<6;Dt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,Nt,T.width,T.height,0,At,Ht,null)}}else ot(T.depthTexture,0);const bt=dt.__webglTexture,Ct=We(T),pt=lt?r.TEXTURE_CUBE_MAP_POSITIVE_X+j:r.TEXTURE_2D,mt=T.depthTexture.format===Is?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===Aa)an(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,pt,bt,0,Ct):r.framebufferTexture2D(r.FRAMEBUFFER,mt,pt,bt,0);else if(T.depthTexture.format===Is)an(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,pt,bt,0,Ct):r.framebufferTexture2D(r.FRAMEBUFFER,mt,pt,bt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(B){const T=s.get(B),j=B.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==B.depthTexture){const lt=B.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),lt){const dt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,lt.removeEventListener("dispose",dt)};lt.addEventListener("dispose",dt),T.__depthDisposeCallback=dt}T.__boundDepthTexture=lt}if(B.depthTexture&&!T.__autoAllocateDepthBuffer)if(j)for(let lt=0;lt<6;lt++)en(T.__webglFramebuffer[lt],B,lt);else{const lt=B.texture.mipmaps;lt&&lt.length>0?en(T.__webglFramebuffer[0],B,0):en(T.__webglFramebuffer,B,0)}else if(j){T.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[lt]),T.__webglDepthbuffer[lt]===void 0)T.__webglDepthbuffer[lt]=r.createRenderbuffer(),le(T.__webglDepthbuffer[lt],B,!1);else{const dt=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=T.__webglDepthbuffer[lt];r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,bt)}}else{const lt=B.texture.mipmaps;if(lt&&lt.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),le(T.__webglDepthbuffer,B,!1);else{const dt=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,bt)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(B,T,j){const lt=s.get(B);T!==void 0&&Ft(lt.__webglFramebuffer,B,B.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),j!==void 0&&ae(B)}function Ne(B){const T=B.texture,j=s.get(B),lt=s.get(T);B.addEventListener("dispose",E);const dt=B.textures,bt=B.isWebGLCubeRenderTarget===!0,Ct=dt.length>1;if(Ct||(lt.__webglTexture===void 0&&(lt.__webglTexture=r.createTexture()),lt.__version=T.version,f.memory.textures++),bt){j.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(T.mipmaps&&T.mipmaps.length>0){j.__webglFramebuffer[pt]=[];for(let mt=0;mt<T.mipmaps.length;mt++)j.__webglFramebuffer[pt][mt]=r.createFramebuffer()}else j.__webglFramebuffer[pt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){j.__webglFramebuffer=[];for(let pt=0;pt<T.mipmaps.length;pt++)j.__webglFramebuffer[pt]=r.createFramebuffer()}else j.__webglFramebuffer=r.createFramebuffer();if(Ct)for(let pt=0,mt=dt.length;pt<mt;pt++){const At=s.get(dt[pt]);At.__webglTexture===void 0&&(At.__webglTexture=r.createTexture(),f.memory.textures++)}if(B.samples>0&&an(B)===!1){j.__webglMultisampledFramebuffer=r.createFramebuffer(),j.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let pt=0;pt<dt.length;pt++){const mt=dt[pt];j.__webglColorRenderbuffer[pt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,j.__webglColorRenderbuffer[pt]);const At=c.convert(mt.format,mt.colorSpace),Ht=c.convert(mt.type),Nt=A(mt.internalFormat,At,Ht,mt.normalized,mt.colorSpace,B.isXRRenderTarget===!0),Dt=We(B);r.renderbufferStorageMultisample(r.RENDERBUFFER,Dt,Nt,B.width,B.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.RENDERBUFFER,j.__webglColorRenderbuffer[pt])}r.bindRenderbuffer(r.RENDERBUFFER,null),B.depthBuffer&&(j.__webglDepthRenderbuffer=r.createRenderbuffer(),le(j.__webglDepthRenderbuffer,B,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(bt){i.bindTexture(r.TEXTURE_CUBE_MAP,lt.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T);for(let pt=0;pt<6;pt++)if(T.mipmaps&&T.mipmaps.length>0)for(let mt=0;mt<T.mipmaps.length;mt++)Ft(j.__webglFramebuffer[pt][mt],B,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,mt);else Ft(j.__webglFramebuffer[pt],B,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);S(T)&&U(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Ct){for(let pt=0,mt=dt.length;pt<mt;pt++){const At=dt[pt],Ht=s.get(At);let Nt=r.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(Nt=B.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Nt,Ht.__webglTexture),Lt(Nt,At),Ft(j.__webglFramebuffer,B,At,r.COLOR_ATTACHMENT0+pt,Nt,0),S(At)&&U(Nt)}i.unbindTexture()}else{let pt=r.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(pt=B.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(pt,lt.__webglTexture),Lt(pt,T),T.mipmaps&&T.mipmaps.length>0)for(let mt=0;mt<T.mipmaps.length;mt++)Ft(j.__webglFramebuffer[mt],B,T,r.COLOR_ATTACHMENT0,pt,mt);else Ft(j.__webglFramebuffer,B,T,r.COLOR_ATTACHMENT0,pt,0);S(T)&&U(pt),i.unbindTexture()}B.depthBuffer&&ae(B)}function ge(B){const T=B.textures;for(let j=0,lt=T.length;j<lt;j++){const dt=T[j];if(S(dt)){const bt=P(B),Ct=s.get(dt).__webglTexture;i.bindTexture(bt,Ct),U(bt),i.unbindTexture()}}}const Xe=[],nn=[];function An(B){if(B.samples>0){if(an(B)===!1){const T=B.textures,j=B.width,lt=B.height;let dt=r.COLOR_BUFFER_BIT;const bt=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=s.get(B),pt=T.length>1;if(pt)for(let At=0;At<T.length;At++)i.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const mt=B.texture.mipmaps;mt&&mt.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let At=0;At<T.length;At++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(dt|=r.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(dt|=r.STENCIL_BUFFER_BIT)),pt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const Ht=s.get(T[At]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ht,0)}r.blitFramebuffer(0,0,j,lt,0,0,j,lt,dt,r.NEAREST),m===!0&&(Xe.length=0,nn.length=0,Xe.push(r.COLOR_ATTACHMENT0+At),B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&(Xe.push(bt),nn.push(bt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,nn)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Xe))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let At=0;At<T.length;At++){i.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const Ht=s.get(T[At]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,Ht,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&m){const T=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function We(B){return Math.min(l.maxSamples,B.samples)}function an(B){const T=s.get(B);return B.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function K(B){const T=f.render.frame;v.get(B)!==T&&(v.set(B,T),B.update())}function Oe(B,T){const j=B.colorSpace,lt=B.format,dt=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||j!==nu&&j!==rs&&(Ee.getTransfer(j)===Be?(lt!==Ii||dt!==gi)&&ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ae("WebGLTextures: Unsupported texture color space:",j)),T}function De(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(d.width=B.naturalWidth||B.width,d.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(d.width=B.displayWidth,d.height=B.displayHeight):(d.width=B.width,d.height=B.height),d}this.allocateTextureUnit=I,this.resetTextureUnits=J,this.getTextureUnits=X,this.setTextureUnits=$,this.setTexture2D=ot,this.setTexture2DArray=et,this.setTexture3D=ft,this.setTextureCube=z,this.rebindTextures=xe,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=An,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Ft,this.useMultisampledRTT=an,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function v3(r,t){function i(s,l=rs){let c;const f=Ee.getTransfer(l);if(s===gi)return r.UNSIGNED_BYTE;if(s===tp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===ep)return r.UNSIGNED_SHORT_5_5_5_1;if(s===H_)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===G_)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===I_)return r.BYTE;if(s===F_)return r.SHORT;if(s===il)return r.UNSIGNED_SHORT;if(s===$d)return r.INT;if(s===ji)return r.UNSIGNED_INT;if(s===Ki)return r.FLOAT;if(s===Fi)return r.HALF_FLOAT;if(s===V_)return r.ALPHA;if(s===k_)return r.RGB;if(s===Ii)return r.RGBA;if(s===Aa)return r.DEPTH_COMPONENT;if(s===Is)return r.DEPTH_STENCIL;if(s===X_)return r.RED;if(s===np)return r.RED_INTEGER;if(s===Gs)return r.RG;if(s===ip)return r.RG_INTEGER;if(s===ap)return r.RGBA_INTEGER;if(s===Zc||s===Kc||s===Qc||s===Jc)if(f===Be)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Zc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Kc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Qc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Zc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Kc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Qc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Jc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===md||s===gd||s===vd||s===_d)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===md)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===gd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===vd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===_d)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===xd||s===Sd||s===yd||s===Md||s===Ed||s===tu||s===bd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===xd||s===Sd)return f===Be?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===yd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Md)return c.COMPRESSED_R11_EAC;if(s===Ed)return c.COMPRESSED_SIGNED_R11_EAC;if(s===tu)return c.COMPRESSED_RG11_EAC;if(s===bd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Td||s===Ad||s===wd||s===Rd||s===Cd||s===Dd||s===Ud||s===Ld||s===Nd||s===Od||s===Pd||s===zd||s===Bd||s===Id)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Td)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ad)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===wd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Rd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Cd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Dd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ud)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ld)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Nd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Od)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Pd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===zd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Bd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Id)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Fd||s===Hd||s===Gd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===Fd)return f===Be?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Hd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Gd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Vd||s===kd||s===eu||s===Xd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Vd)return c.COMPRESSED_RED_RGTC1_EXT;if(s===kd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===eu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Xd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===al?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const _3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,x3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class S3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const s=new $_(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new _n({vertexShader:_3,fragmentShader:x3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new tn(new lu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class y3 extends Vs{constructor(t,i){super();const s=this;let l=null,c=1,f=null,p="local-floor",m=1,d=null,v=null,_=null,g=null,x=null,b=null;const R=typeof XRWebGLBinding<"u",M=new S3,S={},U=i.getContextAttributes();let P=null,A=null;const N=[],O=[],C=new Qt;let E=null,L=null;const F=new mi;F.viewport=new Ze;const k=new mi;k.viewport=new Ze;const G=[F,k],J=new R1;let X=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let vt=N[st];return vt===void 0&&(vt=new Ph,N[st]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(st){let vt=N[st];return vt===void 0&&(vt=new Ph,N[st]=vt),vt.getGripSpace()},this.getHand=function(st){let vt=N[st];return vt===void 0&&(vt=new Ph,N[st]=vt),vt.getHandSpace()};function I(st){const vt=O.indexOf(st.inputSource);if(vt===-1)return;const Tt=N[vt];Tt!==void 0&&(Tt.update(st.inputSource,st.frame,d||f),Tt.dispatchEvent({type:st.type,data:st.inputSource}))}function W(){l.removeEventListener("select",I),l.removeEventListener("selectstart",I),l.removeEventListener("selectend",I),l.removeEventListener("squeeze",I),l.removeEventListener("squeezestart",I),l.removeEventListener("squeezeend",I),l.removeEventListener("end",W),l.removeEventListener("inputsourceschange",ot);for(let st=0;st<N.length;st++){const vt=O[st];vt!==null&&(O[st]=null,N[st].disconnect(vt))}X=null,$=null,M.reset();for(const st in S)delete S[st];if(t.setRenderTarget(P),x=null,g=null,_=null,l=null,A=null,kt.stop(),s.isPresenting=!1,t.setPixelRatio(E),t.setSize(C.width,C.height,!1),L!==null){const st=L.camera;st.fov=L.fov,st.zoom=L.zoom,st.updateProjectionMatrix(),L=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){c=st,s.isPresenting===!0&&ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){p=st,s.isPresenting===!0&&ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||f},this.setReferenceSpace=function(st){d=st},this.getBaseLayer=function(){return g!==null?g:x},this.getBinding=function(){return _===null&&R&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(st){if(l=st,l!==null){if(P=t.getRenderTarget(),l.addEventListener("select",I),l.addEventListener("selectstart",I),l.addEventListener("selectend",I),l.addEventListener("squeeze",I),l.addEventListener("squeezestart",I),l.addEventListener("squeezeend",I),l.addEventListener("end",W),l.addEventListener("inputsourceschange",ot),U.xrCompatible!==!0&&await i.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(C),R&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,te=null,Ft=null;U.depth&&(Ft=U.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Tt=U.stencil?Is:Aa,te=U.stencil?al:ji);const le={colorFormat:i.RGBA8,depthFormat:Ft,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(le),l.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),A=new Ri(g.textureWidth,g.textureHeight,{format:Ii,type:gi,depthTexture:new ol(g.textureWidth,g.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:U.stencil,colorSpace:t.outputColorSpace,samples:U.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const Tt={antialias:U.antialias,alpha:!0,depth:U.depth,stencil:U.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(l,i,Tt),l.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new Ri(x.framebufferWidth,x.framebufferHeight,{format:Ii,type:gi,colorSpace:t.outputColorSpace,stencilBuffer:U.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),d=null,f=await l.requestReferenceSpace(p),kt.setContext(l),kt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function ot(st){for(let vt=0;vt<st.removed.length;vt++){const Tt=st.removed[vt],te=O.indexOf(Tt);te>=0&&(O[te]=null,N[te].disconnect(Tt))}for(let vt=0;vt<st.added.length;vt++){const Tt=st.added[vt];let te=O.indexOf(Tt);if(te===-1){for(let le=0;le<N.length;le++)if(le>=O.length){O.push(Tt),te=le;break}else if(O[le]===null){O[le]=Tt,te=le;break}if(te===-1)break}const Ft=N[te];Ft&&Ft.connect(Tt)}}const et=new H,ft=new H;function z(st,vt,Tt){et.setFromMatrixPosition(vt.matrixWorld),ft.setFromMatrixPosition(Tt.matrixWorld);const te=et.distanceTo(ft),Ft=vt.projectionMatrix.elements,le=Tt.projectionMatrix.elements,en=Ft[14]/(Ft[10]-1),ae=Ft[14]/(Ft[10]+1),xe=(Ft[9]+1)/Ft[5],Ne=(Ft[9]-1)/Ft[5],ge=(Ft[8]-1)/Ft[0],Xe=(le[8]+1)/le[0],nn=en*ge,An=en*Xe,We=te/(-ge+Xe),an=We*-ge;if(vt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(an),st.translateZ(We),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),Ft[10]===-1)st.projectionMatrix.copy(vt.projectionMatrix),st.projectionMatrixInverse.copy(vt.projectionMatrixInverse);else{const K=en+We,Oe=ae+We,De=nn-an,B=An+(te-an),T=xe*ae/Oe*K,j=Ne*ae/Oe*K;st.projectionMatrix.makePerspective(De,B,T,j,K,Oe),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function tt(st,vt){vt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(vt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(l===null)return;let vt=st.near,Tt=st.far;M.texture!==null&&(M.depthNear>0&&(vt=M.depthNear),M.depthFar>0&&(Tt=M.depthFar)),J.near=k.near=F.near=vt,J.far=k.far=F.far=Tt,(X!==J.near||$!==J.far)&&(l.updateRenderState({depthNear:J.near,depthFar:J.far}),X=J.near,$=J.far),J.layers.mask=st.layers.mask|6,F.layers.mask=J.layers.mask&-5,k.layers.mask=J.layers.mask&-3;const te=st.parent,Ft=J.cameras;tt(J,te);for(let le=0;le<Ft.length;le++)tt(Ft[le],te);Ft.length===2?z(J,F,k):J.projectionMatrix.copy(F.projectionMatrix),L===null&&st.isPerspectiveCamera&&(L={camera:st,fov:st.fov,zoom:st.zoom}),gt(st,J,te)};function gt(st,vt,Tt){Tt===null?st.matrix.copy(vt.matrixWorld):(st.matrix.copy(Tt.matrixWorld),st.matrix.invert(),st.matrix.multiply(vt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(vt.projectionMatrix),st.projectionMatrixInverse.copy(vt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=rl*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return J},this.getFoveation=function(){if(!(g===null&&x===null))return m},this.setFoveation=function(st){m=st,g!==null&&(g.fixedFoveation=st),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=st)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(J)},this.getCameraTexture=function(st){return S[st]};let Et=null;function Lt(st,vt){if(v=vt.getViewerPose(d||f),b=vt,v!==null){const Tt=v.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let te=!1;Tt.length!==J.cameras.length&&(J.cameras.length=0,te=!0);for(let ae=0;ae<Tt.length;ae++){const xe=Tt[ae];let Ne=null;if(x!==null)Ne=x.getViewport(xe);else{const Xe=_.getViewSubImage(g,xe);Ne=Xe.viewport,ae===0&&(t.setRenderTargetTextures(A,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(A))}let ge=G[ae];ge===void 0&&(ge=new mi,ge.layers.enable(ae),ge.viewport=new Ze,G[ae]=ge),ge.matrix.fromArray(xe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(xe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),ae===0&&(J.matrix.copy(ge.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale)),te===!0&&J.cameras.push(ge)}const Ft=l.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&R){_=s.getBinding();const ae=_.getDepthInformation(Tt[0]);ae&&ae.isValid&&ae.texture&&M.init(ae,l.renderState)}if(Ft&&Ft.includes("camera-access")&&R){t.state.unbindTexture(),_=s.getBinding();for(let ae=0;ae<Tt.length;ae++){const xe=Tt[ae].camera;if(xe){let Ne=S[xe];Ne||(Ne=new $_,S[xe]=Ne);const ge=_.getCameraImage(xe);Ne.sourceTexture=ge}}}}for(let Tt=0;Tt<N.length;Tt++){const te=O[Tt],Ft=N[Tt];te!==null&&Ft!==void 0&&Ft.update(te,vt,d||f)}Et&&Et(st,vt),vt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:vt}),b=null}const kt=new rx;kt.setAnimationLoop(Lt),this.setAnimationLoop=function(st){Et=st},this.dispose=function(){}}}const M3=new Ie,dx=new re;dx.set(-1,0,0,0,1,0,0,0,1);function E3(r,t){function i(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function s(M,S){S.color.getRGB(M.fogColor.value,nx(r)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function l(M,S,U,P,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),_(M,S)):S.isMeshPhongMaterial?(c(M,S),v(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),g(M,S),S.isMeshPhysicalMaterial&&x(M,S,A)):S.isMeshMatcapMaterial?(c(M,S),b(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),R(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(f(M,S),S.isLineDashedMaterial&&p(M,S)):S.isPointsMaterial?m(M,S,U,P):S.isSpriteMaterial?d(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,i(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Hn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,i(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Hn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,i(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,i(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const U=t.get(S),P=U.envMap,A=U.envMapRotation;P&&(M.envMap.value=P,M.envMapRotation.value.setFromMatrix4(M3.makeRotationFromEuler(A)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(dx),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,M.aoMapTransform))}function f(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform))}function p(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,U,P){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*U,M.scale.value=P*.5,S.map&&(M.map.value=S.map,i(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function d(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function v(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function _(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function g(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,U){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Hn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=U.texture,M.transmissionSamplerSize.value.set(U.width,U.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,M.specularIntensityMapTransform))}function b(M,S){S.matcap&&(M.matcap.value=S.matcap)}function R(M,S){const U=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(U.matrixWorld),M.nearDistance.value=U.shadow.camera.near,M.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function b3(r,t,i,s){let l={},c={},f=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,N){const O=N.program;s.uniformBlockBinding(A,O)}function d(A,N){let O=l[A.id];O===void 0&&(M(A),O=v(A),l[A.id]=O,A.addEventListener("dispose",U));const C=N.program;s.updateUBOMapping(A,C);const E=t.render.frame;c[A.id]!==E&&(g(A),c[A.id]=E)}function v(A){const N=_();A.__bindingPointIndex=N;const O=r.createBuffer(),C=A.__size,E=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,O),r.bufferData(r.UNIFORM_BUFFER,C,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,N,O),O}function _(){for(let A=0;A<p;A++)if(f.indexOf(A)===-1)return f.push(A),A;return Ae("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(A){const N=l[A.id],O=A.uniforms,C=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,N);for(let E=0,L=O.length;E<L;E++){const F=O[E];if(Array.isArray(F))for(let k=0,G=F.length;k<G;k++)x(F[k],E,k,C);else x(F,E,0,C)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,N,O,C){if(R(A,N,O,C)===!0){const E=A.__offset,L=A.value;if(Array.isArray(L)){let F=0;for(let k=0;k<L.length;k++){const G=L[k],J=S(G);b(G,A.__data,F),typeof G!="number"&&typeof G!="boolean"&&!G.isMatrix3&&!ArrayBuffer.isView(G)&&(F+=J.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(L,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,E,A.__data)}}function b(A,N,O){typeof A=="number"||typeof A=="boolean"?N[0]=A:A.isMatrix3?(N[0]=A.elements[0],N[1]=A.elements[1],N[2]=A.elements[2],N[3]=0,N[4]=A.elements[3],N[5]=A.elements[4],N[6]=A.elements[5],N[7]=0,N[8]=A.elements[6],N[9]=A.elements[7],N[10]=A.elements[8],N[11]=0):ArrayBuffer.isView(A)?N.set(new A.constructor(A.buffer,A.byteOffset,N.length)):A.toArray(N,O)}function R(A,N,O,C){const E=A.value,L=N+"_"+O;if(C[L]===void 0)return typeof E=="number"||typeof E=="boolean"?C[L]=E:ArrayBuffer.isView(E)?C[L]=E.slice():C[L]=E.clone(),!0;{const F=C[L];if(typeof E=="number"||typeof E=="boolean"){if(F!==E)return C[L]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(F.equals(E)===!1)return F.copy(E),!0}}return!1}function M(A){const N=A.uniforms;let O=0;const C=16;for(let L=0,F=N.length;L<F;L++){const k=Array.isArray(N[L])?N[L]:[N[L]];for(let G=0,J=k.length;G<J;G++){const X=k[G],$=Array.isArray(X.value)?X.value:[X.value];for(let I=0,W=$.length;I<W;I++){const ot=$[I],et=S(ot),ft=O%C,z=ft%et.boundary,tt=ft+z;O+=z,tt!==0&&C-tt<et.storage&&(O+=C-tt),X.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=O,O+=et.storage}}}const E=O%C;return E>0&&(O+=C-E),A.__size=O,A.__cache={},this}function S(A){const N={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(N.boundary=4,N.storage=4):A.isVector2?(N.boundary=8,N.storage=8):A.isVector3||A.isColor?(N.boundary=16,N.storage=12):A.isVector4?(N.boundary=16,N.storage=16):A.isMatrix3?(N.boundary=48,N.storage=48):A.isMatrix4?(N.boundary=64,N.storage=64):A.isTexture?ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(N.boundary=16,N.storage=A.byteLength):ne("WebGLRenderer: Unsupported uniform value type.",A),N}function U(A){const N=A.target;N.removeEventListener("dispose",U);const O=f.indexOf(N.__bindingPointIndex);f.splice(O,1),r.deleteBuffer(l[N.id]),delete l[N.id],delete c[N.id]}function P(){for(const A in l)r.deleteBuffer(l[A]);f=[],l={},c={}}return{bind:m,update:d,dispose:P}}const T3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Yi=null;function A3(){return Yi===null&&(Yi=new JM(T3,16,16,Gs,Fi),Yi.name="DFG_LUT",Yi.minFilter=Fn,Yi.magFilter=Fn,Yi.wrapS=Ea,Yi.wrapT=Ea,Yi.generateMipmaps=!1,Yi.needsUpdate=!0),Yi}class w3{constructor(t={}){const{canvas:i=fM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:x=gi}=t;this.isWebGLRenderer=!0;let b;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=s.getContextAttributes().alpha}else b=f;const R=x,M=new Set([ap,ip,np]),S=new Set([gi,ji,il,al,tp,ep]),U=new Uint32Array(4),P=new Int32Array(4),A=new H;let N=null,O=null;const C=[],E=[];let L=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let k=!1,G=null,J=null,X=null,$=null;this._outputColorSpace=ei;let I=0,W=0,ot=null,et=-1,ft=null;const z=new Ze,tt=new Ze;let gt=null;const Et=new ee(0);let Lt=0,kt=i.width,st=i.height,vt=1,Tt=null,te=null;const Ft=new Ze(0,0,kt,st),le=new Ze(0,0,kt,st);let en=!1;const ae=new hp;let xe=!1,Ne=!1;const ge=new Ie,Xe=new H,nn=new Ze,An={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function an(){return ot===null?vt:1}let K=s;function Oe(w,q){return i.getContext(w,q)}let De,B,T,j,lt,dt,bt,Ct,pt,mt,At,Ht,Nt,Dt,Kt,Jt,ie,Z,wt,xt,Rt,zt,Mt;try{const w={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Jd}`),i.addEventListener("webglcontextlost",Fe,!1),i.addEventListener("webglcontextrestored",be,!1),i.addEventListener("webglcontextcreationerror",Yn,!1),K===null){const q="webgl2";if(K=Oe(q,w),K===null)throw Oe(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Zt()}catch(w){throw i.removeEventListener("webglcontextlost",Fe,!1),i.removeEventListener("webglcontextrestored",be,!1),i.removeEventListener("webglcontextcreationerror",Yn,!1),Ae("WebGLRenderer: "+w.message),w}function Zt(){De=new AT(K),De.init(),Rt=new v3(K,De),B=new gT(K,De,t,Rt),T=new m3(K,De),B.reversedDepthBuffer&&g&&T.buffers.depth.setReversed(!0),J=K.createFramebuffer(),X=K.createFramebuffer(),$=K.createFramebuffer(),j=new CT(K),lt=new e3,dt=new g3(K,De,T,lt,B,Rt,j),bt=new TT(F),Ct=new U1(K),zt=new pT(K,Ct),pt=new wT(K,Ct,j,zt),mt=new UT(K,pt,Ct,zt,j),Z=new DT(K,B,dt),Kt=new vT(lt),At=new t3(F,bt,De,B,zt,Kt),Ht=new E3(F,lt),Nt=new i3,Dt=new c3(De),ie=new dT(F,bt,T,mt,b,m),Jt=new p3(F,mt,B),Mt=new b3(K,j,B,T),wt=new mT(K,De,j),xt=new RT(K,De,j),j.programs=At.programs,F.capabilities=B,F.extensions=De,F.properties=lt,F.renderLists=Nt,F.shadowMap=Jt,F.state=T,F.info=j}R!==gi&&(L=new NT(R,i.width,i.height,p,l,c));const Xt=new y3(F,K);this.xr=Xt,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const w=De.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=De.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(w){w!==void 0&&(vt=w,this.setSize(kt,st,!1))},this.getSize=function(w){return w.set(kt,st)},this.setSize=function(w,q,ut=!0){if(Xt.isPresenting){ne("WebGLRenderer: Can't change size while VR device is presenting.");return}kt=w,st=q,i.width=Math.floor(w*vt),i.height=Math.floor(q*vt),ut===!0&&(i.style.width=w+"px",i.style.height=q+"px"),L!==null&&L.setSize(i.width,i.height),this.setViewport(0,0,w,q)},this.getDrawingBufferSize=function(w){return w.set(kt*vt,st*vt).floor()},this.setDrawingBufferSize=function(w,q,ut){kt=w,st=q,vt=ut,i.width=Math.floor(w*ut),i.height=Math.floor(q*ut),this.setViewport(0,0,w,q)},this.setEffects=function(w){if(R===gi){Ae("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let q=0;q<w.length;q++)if(w[q].isOutputPass===!0){ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(z)},this.getViewport=function(w){return w.copy(Ft)},this.setViewport=function(w,q,ut,nt){w.isVector4?Ft.set(w.x,w.y,w.z,w.w):Ft.set(w,q,ut,nt),T.viewport(z.copy(Ft).multiplyScalar(vt).round())},this.getScissor=function(w){return w.copy(le)},this.setScissor=function(w,q,ut,nt){w.isVector4?le.set(w.x,w.y,w.z,w.w):le.set(w,q,ut,nt),T.scissor(tt.copy(le).multiplyScalar(vt).round())},this.getScissorTest=function(){return en},this.setScissorTest=function(w){T.setScissorTest(en=w)},this.setOpaqueSort=function(w){Tt=w},this.setTransparentSort=function(w){te=w},this.getClearColor=function(w){return w.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(w=!0,q=!0,ut=!0){let nt=0;if(w){let it=!1;if(ot!==null){const Ot=ot.texture.format;it=M.has(Ot)}if(it){const Ot=ot.texture.type,Gt=S.has(Ot),Ut=ie.getClearColor(),Bt=ie.getClearAlpha(),It=Ut.r,oe=Ut.g,pe=Ut.b;Gt?(U[0]=It,U[1]=oe,U[2]=pe,U[3]=Bt,K.clearBufferuiv(K.COLOR,0,U)):(P[0]=It,P[1]=oe,P[2]=pe,P[3]=Bt,K.clearBufferiv(K.COLOR,0,P))}else nt|=K.COLOR_BUFFER_BIT}q&&(nt|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ut&&(nt|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),nt!==0&&K.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),G=w},this.dispose=function(){i.removeEventListener("webglcontextlost",Fe,!1),i.removeEventListener("webglcontextrestored",be,!1),i.removeEventListener("webglcontextcreationerror",Yn,!1),ie.dispose(),Nt.dispose(),Dt.dispose(),lt.dispose(),bt.dispose(),mt.dispose(),zt.dispose(),Mt.dispose(),At.dispose(),Xt.dispose(),Xt.removeEventListener("sessionstart",cn),Xt.removeEventListener("sessionend",Dn),Zn.stop()};function Fe(w){w.preventDefault(),xv("WebGLRenderer: Context Lost."),k=!0}function be(){xv("WebGLRenderer: Context Restored."),k=!1;const w=j.autoReset,q=Jt.enabled,ut=Jt.autoUpdate,nt=Jt.needsUpdate,it=Jt.type;Zt(),j.autoReset=w,Jt.enabled=q,Jt.autoUpdate=ut,Jt.needsUpdate=nt,Jt.type=it}function Yn(w){Ae("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ai(w){const q=w.target;q.removeEventListener("dispose",ai),Kr(q)}function Kr(w){Qr(w),lt.remove(w)}function Qr(w){const q=lt.get(w).programs;q!==void 0&&(q.forEach(function(ut){At.releaseProgram(ut)}),w.isShaderMaterial&&At.releaseShaderCache(w))}this.renderBufferDirect=function(w,q,ut,nt,it,Ot){q===null&&(q=An);const Gt=it.isMesh&&it.matrixWorld.determinantAffine()<0,Ut=Da(w,q,ut,nt,it);T.setMaterial(nt,Gt);let Bt=ut.index,It=1;if(nt.wireframe===!0){if(Bt=pt.getWireframeAttribute(ut),Bt===void 0)return;It=2}const oe=ut.drawRange,pe=ut.attributes.position;let Wt=oe.start*It,Te=(oe.start+oe.count)*It;Ot!==null&&(Wt=Math.max(Wt,Ot.start*It),Te=Math.min(Te,(Ot.start+Ot.count)*It)),Bt!==null?(Wt=Math.max(Wt,0),Te=Math.min(Te,Bt.count)):pe!=null&&(Wt=Math.max(Wt,0),Te=Math.min(Te,pe.count));const Ke=Te-Wt;if(Ke<0||Ke===1/0)return;zt.setup(it,nt,Ut,ut,Bt);let qe,fe=wt;if(Bt!==null&&(qe=Ct.get(Bt),fe=xt,fe.setIndex(qe)),it.isMesh)nt.wireframe===!0?(T.setLineWidth(nt.wireframeLinewidth*an()),fe.setMode(K.LINES)):fe.setMode(K.TRIANGLES);else if(it.isLine){let fn=nt.linewidth;fn===void 0&&(fn=1),T.setLineWidth(fn*an()),it.isLineSegments?fe.setMode(K.LINES):it.isLineLoop?fe.setMode(K.LINE_LOOP):fe.setMode(K.LINE_STRIP)}else it.isPoints?fe.setMode(K.POINTS):it.isSprite&&fe.setMode(K.TRIANGLES);if(it.isBatchedMesh)if(De.get("WEBGL_multi_draw"))fe.renderMultiDraw(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount);else{const fn=it._multiDrawStarts,Vt=it._multiDrawCounts,Sn=it._multiDrawCount,he=Bt?Ct.get(Bt).bytesPerElement:1,Vn=lt.get(nt).currentProgram.getUniforms();for(let si=0;si<Sn;si++)Vn.setValue(K,"_gl_DrawID",si),fe.render(fn[si]/he,Vt[si])}else if(it.isInstancedMesh)fe.renderInstances(Wt,Ke,it.count);else if(ut.isInstancedBufferGeometry){const fn=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,Vt=Math.min(ut.instanceCount,fn);fe.renderInstances(Wt,Ke,Vt)}else fe.render(Wt,Ke)};function Jr(w,q,ut,nt){G!==null&&w.isNodeMaterial&&G.setObject(nt,w),xe===!0&&Kt.setState(w,ut,!1),w.transparent===!0&&w.side===zi&&w.forceSinglePass===!1?(w.side=Hn,w.needsUpdate=!0,Ca(w,q,nt),w.side=ls,w.needsUpdate=!0,Ca(w,q,nt),w.side=zi):Ca(w,q,nt)}this.compile=function(w,q,ut=null){ut===null&&(ut=w),G!==null&&G.renderStart(w,q,ut),O=Dt.get(ut),O.init(q),E.push(O),ut.traverseVisible(function(it){it.isLight&&it.layers.test(q.layers)&&(O.pushLight(it),it.castShadow&&O.pushShadow(it))}),w!==ut&&w.traverseVisible(function(it){it.isLight&&it.layers.test(q.layers)&&(O.pushLight(it),it.castShadow&&O.pushShadow(it))}),O.setupLights(),G!==null&&G.updateLights(O.state.lightsArray),Ne=this.localClippingEnabled,xe=Kt.init(this.clippingPlanes,Ne),xe===!0&&Kt.setGlobalState(this.clippingPlanes,q),G!==null&&Jt.render(O.state.shadowsArray,ut,q);const nt=new Set;return w.traverse(function(it){if(!(it.isMesh||it.isPoints||it.isLine||it.isSprite))return;const Ot=it.material;if(Ot)if(Array.isArray(Ot))for(let Gt=0;Gt<Ot.length;Gt++){const Ut=Ot[Gt];Jr(Ut,ut,q,it),nt.add(Ut)}else Jr(Ot,ut,q,it),nt.add(Ot)}),O=E.pop(),G!==null&&G.renderEnd(),nt},this.compileAsync=function(w,q,ut=null){const nt=this.compile(w,q,ut);return new Promise(it=>{function Ot(){if(nt.forEach(function(Gt){const Bt=lt.get(Gt).currentProgram;(Bt===void 0||Bt.isReady())&&nt.delete(Gt)}),nt.size===0){it(w);return}setTimeout(Ot,10)}De.get("KHR_parallel_shader_compile")!==null?Ot():setTimeout(Ot,10)})};let ks=null;function Hi(w){ks&&ks(w)}function cn(){Zn.stop()}function Dn(){Zn.start()}const Zn=new rx;Zn.setAnimationLoop(Hi),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(w){ks=w,Xt.setAnimationLoop(w),w===null?Zn.stop():Zn.start()},Xt.addEventListener("sessionstart",cn),Xt.addEventListener("sessionend",Dn),this.render=function(w,q){if(q!==void 0&&q.isCamera!==!0){Ae("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;G!==null&&G.renderStart(w,q);const ut=Xt.enabled===!0&&Xt.isPresenting===!0,nt=L!==null&&(ot===null||ut)&&L.begin(F,ot);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Xt.enabled===!0&&Xt.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(Xt.cameraAutoUpdate===!0&&Xt.updateCamera(q),q=Xt.getCamera()),w.isScene===!0&&w.onBeforeRender(F,w,q,ot),O=Dt.get(w,E.length),O.init(q),O.state.textureUnits=dt.getTextureUnits(),E.push(O),ge.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),ae.setFromProjectionMatrix(ge,Qi,q.reversedDepth),Ne=this.localClippingEnabled,xe=Kt.init(this.clippingPlanes,Ne),N=Nt.get(w,C.length),N.init(),C.push(N),Xt.enabled===!0&&Xt.isPresenting===!0){const Gt=F.xr.getDepthSensingMesh();Gt!==null&&hs(Gt,q,-1/0,F.sortObjects)}hs(w,q,0,F.sortObjects),N.finish(),G!==null&&G.updateLights(O.state.lightsArray),F.sortObjects===!0&&N.sort(Tt,te),We=Xt.enabled===!1||Xt.isPresenting===!1||Xt.hasDepthSensing()===!1,We&&ie.addToRenderList(N,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&Kt.beginShadows();const it=O.state.shadowsArray;if(Jt.render(it,w,q),xe===!0&&Kt.endShadows(),(nt&&L.hasRenderPass())===!1){const Gt=N.opaque,Ut=N.transmissive;if(O.setupLights(),q.isArrayCamera){const Bt=q.cameras;if(Ut.length>0)for(let It=0,oe=Bt.length;It<oe;It++){const pe=Bt[It];hl(Gt,Ut,w,pe)}We&&ie.render(w);for(let It=0,oe=Bt.length;It<oe;It++){const pe=Bt[It];fl(N,w,pe,pe.viewport)}}else Ut.length>0&&hl(Gt,Ut,w,q),We&&ie.render(w),fl(N,w,q)}ot!==null&&W===0&&(dt.updateMultisampleRenderTarget(ot),dt.updateRenderTargetMipmap(ot)),nt&&L.end(F),w.isScene===!0&&w.onAfterRender(F,w,q),zt.resetDefaultState(),et=-1,ft=null,E.pop(),E.length>0?(O=E[E.length-1],dt.setTextureUnits(O.state.textureUnits),xe===!0&&Kt.setGlobalState(F.clippingPlanes,O.state.camera)):O=null,C.pop(),C.length>0?N=C[C.length-1]:N=null,G!==null&&G.renderEnd()};function hs(w,q,ut,nt){if(w.visible===!1)return;if(w.layers.test(q.layers)){if(w.isGroup)ut=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(q);else if(w.isLightProbeGrid)O.pushLightProbeGrid(w);else if(w.isLight)O.pushLight(w),w.castShadow&&O.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(ae)){nt&&nn.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ge);const Gt=mt.update(w),Ut=w.material;Ut.visible&&N.push(w,Gt,Ut,ut,nn.z,null,q)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(ae))){const Gt=mt.update(w),Ut=w.material;if(nt&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),nn.copy(w.boundingSphere.center)):(Gt.boundingSphere===null&&Gt.computeBoundingSphere(),nn.copy(Gt.boundingSphere.center)),nn.applyMatrix4(w.matrixWorld).applyMatrix4(ge)),Array.isArray(Ut)){const Bt=Gt.groups;for(let It=0,oe=Bt.length;It<oe;It++){const pe=Bt[It],Wt=Ut[pe.materialIndex];Wt&&Wt.visible&&N.push(w,Gt,Wt,ut,nn.z,pe,q)}}else Ut.visible&&N.push(w,Gt,Ut,ut,nn.z,null,q)}}const Ot=w.children;for(let Gt=0,Ut=Ot.length;Gt<Ut;Gt++)hs(Ot[Gt],q,ut,nt)}function fl(w,q,ut,nt){const{opaque:it,transmissive:Ot,transparent:Gt}=w;O.setupLightsView(ut),xe===!0&&Kt.setGlobalState(F.clippingPlanes,ut),nt&&T.viewport(z.copy(nt)),it.length>0&&ds(it,q,ut),Ot.length>0&&ds(Ot,q,ut),Gt.length>0&&ds(Gt,q,ut),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function hl(w,q,ut,nt){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;if(O.state.transmissionRenderTarget[nt.id]===void 0){const Wt=De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float");O.state.transmissionRenderTarget[nt.id]=new Ri(1,1,{generateMipmaps:!0,type:Wt?Fi:gi,minFilter:Bs,samples:Math.max(4,B.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ee.workingColorSpace})}const Ot=O.state.transmissionRenderTarget[nt.id],Gt=nt.viewport||z;Ot.setSize(Gt.z*F.transmissionResolutionScale,Gt.w*F.transmissionResolutionScale);const Ut=F.getRenderTarget(),Bt=F.getActiveCubeFace(),It=F.getActiveMipmapLevel();F.setRenderTarget(Ot),F.getClearColor(Et),Lt=F.getClearAlpha(),Lt<1&&F.setClearColor(16777215,.5),F.clear(),We&&ie.render(ut);const oe=F.toneMapping;F.toneMapping=Ji;const pe=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),O.setupLightsView(nt),xe===!0&&Kt.setGlobalState(F.clippingPlanes,nt),ds(w,ut,nt),dt.updateMultisampleRenderTarget(Ot),dt.updateRenderTargetMipmap(Ot),De.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Te=0,Ke=q.length;Te<Ke;Te++){const qe=q[Te],{object:fe,geometry:fn,material:Vt,group:Sn}=qe;if(Vt.side===zi&&fe.layers.test(nt.layers)){const he=Vt.side;Vt.side=Hn,Vt.needsUpdate=!0,Ra(fe,ut,nt,fn,Vt,Sn),Vt.side=he,Vt.needsUpdate=!0,Wt=!0}}Wt===!0&&(dt.updateMultisampleRenderTarget(Ot),dt.updateRenderTargetMipmap(Ot))}F.setRenderTarget(Ut,Bt,It),F.setClearColor(Et,Lt),pe!==void 0&&(nt.viewport=pe),F.toneMapping=oe}function ds(w,q,ut){const nt=q.isScene===!0?q.overrideMaterial:null;for(let it=0,Ot=w.length;it<Ot;it++){const Gt=w[it],{object:Ut,geometry:Bt,group:It}=Gt;let oe=Gt.material;oe.allowOverride===!0&&nt!==null&&(oe=nt),Ut.layers.test(ut.layers)&&Ra(Ut,q,ut,Bt,oe,It)}}function Ra(w,q,ut,nt,it,Ot){G!==null&&it.isNodeMaterial&&G.setObject(w,it),w.onBeforeRender(F,q,ut,nt,it,Ot),w.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),it.onBeforeRender(F,q,ut,nt,w,Ot),it.transparent===!0&&it.side===zi&&it.forceSinglePass===!1?(it.side=Hn,it.needsUpdate=!0,F.renderBufferDirect(ut,q,nt,it,w,Ot),it.side=ls,it.needsUpdate=!0,F.renderBufferDirect(ut,q,nt,it,w,Ot),it.side=zi):F.renderBufferDirect(ut,q,nt,it,w,Ot),w.onAfterRender(F,q,ut,nt,it,Ot)}function Ca(w,q,ut){q.isScene!==!0&&(q=An);const nt=lt.get(w),it=O.state.lights,Ot=O.state.shadowsArray,Gt=it.state.version,Ut=At.getParameters(w,it.state,Ot,q,ut,O.state.lightProbeGridArray),Bt=At.getProgramCacheKey(Ut);let It=nt.programs;nt.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?q.environment:null,nt.fog=q.fog;const oe=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;nt.envMap=bt.get(w.envMap||nt.environment,oe),nt.envMapRotation=nt.environment!==null&&w.envMap===null?q.environmentRotation:w.envMapRotation,It===void 0&&(w.addEventListener("dispose",ai),It=new Map,nt.programs=It);let pe=It.get(Bt);if(pe!==void 0){if(nt.currentProgram===pe&&nt.lightsStateVersion===Gt)return ta(w,Ut),pe}else Ut.uniforms=At.getUniforms(w),G!==null&&w.isNodeMaterial&&G.build(w,ut,Ut),w.onBeforeCompile(Ut,F),pe=At.acquireProgram(Ut,Bt),It.set(Bt,pe),nt.uniforms=Ut.uniforms;const Wt=nt.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Wt.clippingPlanes=Kt.uniform),ta(w,Ut),nt.needsLights=dl(w),nt.lightsStateVersion=Gt,nt.needsLights&&(Wt.ambientLightColor.value=it.state.ambient,Wt.lightProbe.value=it.state.probe,Wt.sunLights.value=it.state.sun,Wt.sunLightShadows.value=it.state.sunShadow,Wt.directionalLights.value=it.state.directional,Wt.directionalLightShadows.value=it.state.directionalShadow,Wt.spotLights.value=it.state.spot,Wt.spotLightShadows.value=it.state.spotShadow,Wt.rectAreaLights.value=it.state.rectArea,Wt.ltc_1.value=it.state.rectAreaLTC1,Wt.ltc_2.value=it.state.rectAreaLTC2,Wt.pointLights.value=it.state.point,Wt.pointLightShadows.value=it.state.pointShadow,Wt.hemisphereLights.value=it.state.hemi,Wt.sunShadowMatrix.value=it.state.sunShadowMatrix,Wt.sunShadowCascade.value=it.state.sunShadowCascade,Wt.directionalShadowMatrix.value=it.state.directionalShadowMatrix,Wt.spotLightMatrix.value=it.state.spotLightMatrix,Wt.spotLightMap.value=it.state.spotLightMap,Wt.pointShadowMatrix.value=it.state.pointShadowMatrix),nt.lightProbeGrid=O.state.lightProbeGridArray.length>0,nt.currentProgram=pe,nt.uniformsList=null,pe}function $i(w){if(w.uniformsList===null){const q=w.currentProgram.getUniforms();w.uniformsList=jc.seqWithValue(q.seq,w.uniforms)}return w.uniformsList}function ta(w,q){const ut=lt.get(w);ut.outputColorSpace=q.outputColorSpace,ut.batching=q.batching,ut.batchingColor=q.batchingColor,ut.instancing=q.instancing,ut.instancingColor=q.instancingColor,ut.instancingMorph=q.instancingMorph,ut.skinning=q.skinning,ut.morphTargets=q.morphTargets,ut.morphNormals=q.morphNormals,ut.morphColors=q.morphColors,ut.morphTargetsCount=q.morphTargetsCount,ut.numClippingPlanes=q.numClippingPlanes,ut.numIntersection=q.numClipIntersection,ut.vertexAlphas=q.vertexAlphas,ut.vertexTangents=q.vertexTangents,ut.toneMapping=q.toneMapping}function ps(w,q){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;A.setFromMatrixPosition(q.matrixWorld);for(let ut=0,nt=w.length;ut<nt;ut++){const it=w[ut];if(it.texture!==null&&it.boundingBox.containsPoint(A))return it}return null}function Da(w,q,ut,nt,it){q.isScene!==!0&&(q=An),dt.resetTextureUnits();const Ot=q.fog,Gt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial?q.environment:null,Ut=ot===null?F.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Ee.workingColorSpace,Bt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial&&!nt.envMap||nt.isMeshPhongMaterial&&!nt.envMap,It=bt.get(nt.envMap||Gt,Bt),oe=nt.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pe=!!ut.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Wt=!!ut.morphAttributes.position,Te=!!ut.morphAttributes.normal,Ke=!!ut.morphAttributes.color;let qe=Ji;nt.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(qe=F.toneMapping);const fe=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,fn=fe!==void 0?fe.length:0,Vt=lt.get(nt),Sn=O.state.lights;if(xe===!0&&(Ne===!0||w!==ft)){const He=w===ft&&nt.id===et;Kt.setState(nt,w,He)}let he=!1;nt.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==Sn.state.version||Vt.outputColorSpace!==Ut||it.isBatchedMesh&&Vt.batching===!1||!it.isBatchedMesh&&Vt.batching===!0||it.isBatchedMesh&&Vt.batchingColor===!0&&it._colorsTexture===null||it.isBatchedMesh&&Vt.batchingColor===!1&&it._colorsTexture!==null||it.isInstancedMesh&&Vt.instancing===!1||!it.isInstancedMesh&&Vt.instancing===!0||it.isSkinnedMesh&&Vt.skinning===!1||!it.isSkinnedMesh&&Vt.skinning===!0||it.isInstancedMesh&&Vt.instancingColor===!0&&it.instanceColor===null||it.isInstancedMesh&&Vt.instancingColor===!1&&it.instanceColor!==null||it.isInstancedMesh&&Vt.instancingMorph===!0&&it.morphTexture===null||it.isInstancedMesh&&Vt.instancingMorph===!1&&it.morphTexture!==null||Vt.envMap!==It||nt.fog===!0&&Vt.fog!==Ot||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==Kt.numPlanes||Vt.numIntersection!==Kt.numIntersection)||Vt.vertexAlphas!==oe||Vt.vertexTangents!==pe||Vt.morphTargets!==Wt||Vt.morphNormals!==Te||Vt.morphColors!==Ke||Vt.toneMapping!==qe||Vt.morphTargetsCount!==fn||!!Vt.lightProbeGrid!=O.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,Vt.__version=nt.version);let Vn=Vt.currentProgram;he===!0&&(Vn=Ca(nt,q,it),G&&nt.isNodeMaterial&&G.onUpdateProgram(nt,Vn,Vt));let si=!1,kn=!1,Ua=!1;const Ue=Vn.getUniforms(),je=Vt.uniforms;if(T.useProgram(Vn.program)&&(si=!0,kn=!0,Ua=!0),nt.id!==et&&(et=nt.id,kn=!0),Vt.needsLights){const He=ps(O.state.lightProbeGridArray,it);Vt.lightProbeGrid!==He&&(Vt.lightProbeGrid=He,kn=!0)}if(si||ft!==w){T.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Ue.setValue(K,"projectionMatrix",w.projectionMatrix),Ue.setValue(K,"viewMatrix",w.matrixWorldInverse);const Gi=Ue.map.cameraPosition;Gi!==void 0&&Gi.setValue(K,Xe.setFromMatrixPosition(w.matrixWorld)),B.logarithmicDepthBuffer&&Ue.setValue(K,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Ue.setValue(K,"isOrthographic",w.isOrthographicCamera===!0),ft!==w&&(ft=w,kn=!0,Ua=!0)}if(Vt.needsLights&&(Sn.state.sunShadowMap.length>0&&Ue.setValue(K,"sunShadowMap",Sn.state.sunShadowMap,dt),Sn.state.directionalShadowMap.length>0&&Ue.setValue(K,"directionalShadowMap",Sn.state.directionalShadowMap,dt),Sn.state.spotShadowMap.length>0&&Ue.setValue(K,"spotShadowMap",Sn.state.spotShadowMap,dt),Sn.state.pointShadowMap.length>0&&Ue.setValue(K,"pointShadowMap",Sn.state.pointShadowMap,dt)),it.isSkinnedMesh){Ue.setOptional(K,it,"bindMatrix"),Ue.setOptional(K,it,"bindMatrixInverse");const He=it.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),Ue.setValue(K,"boneTexture",He.boneTexture,dt))}it.isBatchedMesh&&(Ue.setOptional(K,it,"batchingTexture"),Ue.setValue(K,"batchingTexture",it._matricesTexture,dt),Ue.setOptional(K,it,"batchingIdTexture"),Ue.setValue(K,"batchingIdTexture",it._indirectTexture,dt),Ue.setOptional(K,it,"batchingColorTexture"),it._colorsTexture!==null&&Ue.setValue(K,"batchingColorTexture",it._colorsTexture,dt));const vi=ut.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&Z.update(it,ut,Vn),(kn||Vt.receiveShadow!==it.receiveShadow)&&(Vt.receiveShadow=it.receiveShadow,Ue.setValue(K,"receiveShadow",it.receiveShadow)),(nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial)&&nt.envMap===null&&q.environment!==null&&(je.envMapIntensity.value=q.environmentIntensity),je.dfgLUT!==void 0&&(je.dfgLUT.value=A3()),kn){if(Ue.setValue(K,"toneMappingExposure",F.toneMappingExposure),Vt.needsLights&&un(je,Ua),Ot&&nt.fog===!0&&Ht.refreshFogUniforms(je,Ot),Ht.refreshMaterialUniforms(je,nt,vt,st,O.state.transmissionRenderTarget[w.id]),Vt.needsLights&&Vt.lightProbeGrid){const He=Vt.lightProbeGrid;je.probesSH.value=He.texture,je.probesMin.value.copy(He.boundingBox.min),je.probesMax.value.copy(He.boundingBox.max),je.probesResolution.value.copy(He.resolution)}jc.upload(K,$i(Vt),je,dt)}if(nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(jc.upload(K,$i(Vt),je,dt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Ue.setValue(K,"center",it.center),Ue.setValue(K,"modelViewMatrix",it.modelViewMatrix),Ue.setValue(K,"normalMatrix",it.normalMatrix),Ue.setValue(K,"modelMatrix",it.matrixWorld),nt.uniformsGroups!==void 0){const He=nt.uniformsGroups;for(let Gi=0,Ci=He.length;Gi<Ci;Gi++){const _i=He[Gi];Mt.update(_i,Vn),Mt.bind(_i,Vn)}}return Vn}function un(w,q){w.ambientLightColor.needsUpdate=q,w.lightProbe.needsUpdate=q,w.sunLights.needsUpdate=q,w.sunLightShadows.needsUpdate=q,w.directionalLights.needsUpdate=q,w.directionalLightShadows.needsUpdate=q,w.pointLights.needsUpdate=q,w.pointLightShadows.needsUpdate=q,w.spotLights.needsUpdate=q,w.spotLightShadows.needsUpdate=q,w.rectAreaLights.needsUpdate=q,w.hemisphereLights.needsUpdate=q}function dl(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ot},this.setRenderTargetTextures=function(w,q,ut){const nt=lt.get(w);nt.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),lt.get(w.texture).__webglTexture=q,lt.get(w.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:ut,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,q){const ut=lt.get(w);ut.__webglFramebuffer=q,ut.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(w,q=0,ut=0){ot=w,I=q,W=ut;let nt=null,it=!1,Ot=!1;if(w){const Ut=lt.get(w);if(Ut.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(K.FRAMEBUFFER,Ut.__webglFramebuffer),z.copy(w.viewport),tt.copy(w.scissor),gt=w.scissorTest,T.viewport(z),T.scissor(tt),T.setScissorTest(gt),et=-1;return}else if(Ut.__webglFramebuffer===void 0)dt.setupRenderTarget(w);else if(Ut.__hasExternalTextures)dt.rebindTextures(w,lt.get(w.texture).__webglTexture,lt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const oe=w.depthTexture;if(Ut.__boundDepthTexture!==oe){if(oe!==null&&lt.has(oe)&&(w.width!==oe.image.width||w.height!==oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");dt.setupDepthRenderbuffer(w)}}const Bt=w.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(Ot=!0);const It=lt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(It[q])?nt=It[q][ut]:nt=It[q],it=!0):w.samples>0&&dt.useMultisampledRTT(w)===!1?nt=lt.get(w).__webglMultisampledFramebuffer:Array.isArray(It)?nt=It[ut]:nt=It,z.copy(w.viewport),tt.copy(w.scissor),gt=w.scissorTest}else z.copy(Ft).multiplyScalar(vt).floor(),tt.copy(le).multiplyScalar(vt).floor(),gt=en;if(ut!==0&&(nt=J),T.bindFramebuffer(K.FRAMEBUFFER,nt)&&T.drawBuffers(w,nt),T.viewport(z),T.scissor(tt),T.setScissorTest(gt),it){const Ut=lt.get(w.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ut.__webglTexture,ut)}else if(Ot){const Ut=q;for(let Bt=0;Bt<w.textures.length;Bt++){const It=lt.get(w.textures[Bt]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+Bt,It.__webglTexture,ut,Ut)}}else if(w!==null&&ut!==0){const Ut=lt.get(w.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Ut.__webglTexture,ut)}et=-1};function jr(w){const q=lt.get(w);return(q.__readFormat!==w.format||q.__readType!==w.type)&&(q.__readFormat=w.format,q.__readType=w.type,q.__formatReadable=B.textureFormatReadable(w.format),q.__typeReadable=B.textureTypeReadable(w.type)),q}this.readRenderTargetPixels=function(w,q,ut,nt,it,Ot,Gt,Ut=0){if(!(w&&w.isWebGLRenderTarget)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=lt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Gt!==void 0&&(Bt=Bt[Gt]),Bt){T.bindFramebuffer(K.FRAMEBUFFER,Bt);try{const It=w.textures[Ut],oe=It.format,pe=It.type;w.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ut);const Wt=jr(It);if(Wt.__formatReadable===!1){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Wt.__typeReadable===!1){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=w.width-nt&&ut>=0&&ut<=w.height-it&&K.readPixels(q,ut,nt,it,Rt.convert(oe),Rt.convert(pe),Ot)}finally{const It=ot!==null?lt.get(ot).__webglFramebuffer:null;T.bindFramebuffer(K.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(w,q,ut,nt,it,Ot,Gt,Ut=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=lt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Gt!==void 0&&(Bt=Bt[Gt]),Bt)if(q>=0&&q<=w.width-nt&&ut>=0&&ut<=w.height-it){T.bindFramebuffer(K.FRAMEBUFFER,Bt);const It=w.textures[Ut],oe=It.format,pe=It.type;w.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ut);const Wt=jr(It);if(Wt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Wt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,Te),K.bufferData(K.PIXEL_PACK_BUFFER,Ot.byteLength,K.STREAM_READ),K.readPixels(q,ut,nt,it,Rt.convert(oe),Rt.convert(pe),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);const Ke=ot!==null?lt.get(ot).__webglFramebuffer:null;T.bindFramebuffer(K.FRAMEBUFFER,Ke);const qe=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await hM(K,qe,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,Te),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,Ot),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(Te),K.deleteSync(qe),Ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,q=null,ut=0){const nt=Math.pow(2,-ut),it=Math.floor(w.image.width*nt),Ot=Math.floor(w.image.height*nt),Gt=q!==null?q.x:0,Ut=q!==null?q.y:0;dt.setTexture2D(w,0),K.copyTexSubImage2D(K.TEXTURE_2D,ut,0,0,Gt,Ut,it,Ot),T.unbindTexture()},this.copyTextureToTexture=function(w,q,ut=null,nt=null,it=0,Ot=0){let Gt,Ut,Bt,It,oe,pe,Wt,Te,Ke;const qe=w.isCompressedTexture?w.mipmaps[Ot]:w.image;if(ut!==null)Gt=ut.max.x-ut.min.x,Ut=ut.max.y-ut.min.y,Bt=ut.isBox3?ut.max.z-ut.min.z:1,It=ut.min.x,oe=ut.min.y,pe=ut.isBox3?ut.min.z:0;else{const je=Math.pow(2,-it);Gt=Math.floor(qe.width*je),Ut=Math.floor(qe.height*je),w.isDataArrayTexture?Bt=qe.depth:w.isData3DTexture?Bt=Math.floor(qe.depth*je):Bt=1,It=0,oe=0,pe=0}nt!==null?(Wt=nt.x,Te=nt.y,Ke=nt.z):(Wt=0,Te=0,Ke=0);const fe=Rt.convert(q.format),fn=Rt.convert(q.type);let Vt;q.isData3DTexture?(dt.setTexture3D(q,0),Vt=K.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(dt.setTexture2DArray(q,0),Vt=K.TEXTURE_2D_ARRAY):(dt.setTexture2D(q,0),Vt=K.TEXTURE_2D),T.activeTexture(K.TEXTURE0),T.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,q.flipY),T.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),T.pixelStorei(K.UNPACK_ALIGNMENT,q.unpackAlignment);const Sn=T.getParameter(K.UNPACK_ROW_LENGTH),he=T.getParameter(K.UNPACK_IMAGE_HEIGHT),Vn=T.getParameter(K.UNPACK_SKIP_PIXELS),si=T.getParameter(K.UNPACK_SKIP_ROWS),kn=T.getParameter(K.UNPACK_SKIP_IMAGES);T.pixelStorei(K.UNPACK_ROW_LENGTH,qe.width),T.pixelStorei(K.UNPACK_IMAGE_HEIGHT,qe.height),T.pixelStorei(K.UNPACK_SKIP_PIXELS,It),T.pixelStorei(K.UNPACK_SKIP_ROWS,oe),T.pixelStorei(K.UNPACK_SKIP_IMAGES,pe);const Ua=w.isDataArrayTexture||w.isData3DTexture,Ue=q.isDataArrayTexture||q.isData3DTexture;if(w.isDepthTexture){const je=lt.get(w),vi=lt.get(q),He=lt.get(je.__renderTarget),Gi=lt.get(vi.__renderTarget);T.bindFramebuffer(K.READ_FRAMEBUFFER,He.__webglFramebuffer),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,Gi.__webglFramebuffer);for(let Ci=0;Ci<Bt;Ci++)Ua&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,lt.get(w).__webglTexture,it,pe+Ci),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,lt.get(q).__webglTexture,Ot,Ke+Ci)),K.blitFramebuffer(It,oe,Gt,Ut,Wt,Te,Gt,Ut,K.DEPTH_BUFFER_BIT,K.NEAREST);T.bindFramebuffer(K.READ_FRAMEBUFFER,null),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(it!==0||w.isRenderTargetTexture||lt.has(w)){const je=lt.get(w),vi=lt.get(q);T.bindFramebuffer(K.READ_FRAMEBUFFER,X),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,$);for(let He=0;He<Bt;He++)Ua?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,je.__webglTexture,it,pe+He):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,je.__webglTexture,it),Ue?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,vi.__webglTexture,Ot,Ke+He):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,vi.__webglTexture,Ot),it!==0?K.blitFramebuffer(It,oe,Gt,Ut,Wt,Te,Gt,Ut,K.COLOR_BUFFER_BIT,K.NEAREST):Ue?K.copyTexSubImage3D(Vt,Ot,Wt,Te,Ke+He,It,oe,Gt,Ut):K.copyTexSubImage2D(Vt,Ot,Wt,Te,It,oe,Gt,Ut);T.bindFramebuffer(K.READ_FRAMEBUFFER,null),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else Ue?w.isDataTexture||w.isData3DTexture?K.texSubImage3D(Vt,Ot,Wt,Te,Ke,Gt,Ut,Bt,fe,fn,qe.data):q.isCompressedArrayTexture?K.compressedTexSubImage3D(Vt,Ot,Wt,Te,Ke,Gt,Ut,Bt,fe,qe.data):K.texSubImage3D(Vt,Ot,Wt,Te,Ke,Gt,Ut,Bt,fe,fn,qe):w.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,Ot,Wt,Te,Gt,Ut,fe,fn,qe.data):w.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,Ot,Wt,Te,qe.width,qe.height,fe,qe.data):K.texSubImage2D(K.TEXTURE_2D,Ot,Wt,Te,Gt,Ut,fe,fn,qe);T.pixelStorei(K.UNPACK_ROW_LENGTH,Sn),T.pixelStorei(K.UNPACK_IMAGE_HEIGHT,he),T.pixelStorei(K.UNPACK_SKIP_PIXELS,Vn),T.pixelStorei(K.UNPACK_SKIP_ROWS,si),T.pixelStorei(K.UNPACK_SKIP_IMAGES,kn),Ot===0&&q.generateMipmaps&&K.generateMipmap(Vt),T.unbindTexture()},this.initRenderTarget=function(w){lt.get(w).__webglFramebuffer===void 0&&dt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?dt.setTextureCube(w,0):w.isData3DTexture?dt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?dt.setTexture2DArray(w,0):dt.setTexture2D(w,0),T.unbindTexture()},this.resetState=function(){I=0,W=0,ot=null,T.reset(),zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Ee._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ee._getUnpackColorSpace()}}const R3={follow:.09,settle:.45},x_=2.2;function C3(r,t,i){const s=l=>Number.isFinite(l)?l:0;return{yaw:i.yaw*Math.tanh(s(r)*x_),pitch:-i.pitch*Math.tanh(s(t)*x_)}}function S_(r,t,i,s,l){const c=2/s,f=c*l,p=1/(1+f+.48*f*f+.235*f*f*f),m=r-t,d=(i+c*m)*l,v=t+(m+d)*p;return t-r>0==v>t?[t,0]:[v,(i-c*d)*p]}class D3{constructor(t,i=R3){this.limit=t,this.feel=i,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(t,i){const s=C3(t,i,this.limit);this.targetYaw=s.yaw,this.targetPitch=s.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(t){if(!(t>0))return;const i=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=S_(this.yaw,this.targetYaw,this.yawVelocity,i,t),[this.pitch,this.pitchVelocity]=S_(this.pitch,this.targetPitch,this.pitchVelocity,i,t)}}const hu=`
  float hash31(vec3 p) {
    p = fract(p * .1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }
  float noise3(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash31(i), hash31(i + vec3(1,0,0)), f.x),
                   mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
                   mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float v = .52 * noise3(p);
    p = p * 2.03 + vec3(12.1, 4.7, 8.3);
    v += .26 * noise3(p);
    p = p * 2.01 + vec3(6.4, 2.8, 17.1);
    v += .13 * noise3(p);
    p = p * 2.02 + vec3(3.2, 9.3, 5.1);
    return v + .065 * noise3(p);
  }
`,y_=`
  varying vec3 vDirection;
  void main() {
    vDirection = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,U3=`
  uniform float uTime;
  varying vec3 vDirection;
  ${hu}
  void main() {
    vec3 d = normalize(vDirection);
    vec3 p = d * 4.2 + vec3(uTime * .00042, 0.0, 0.0);
    float warp = fbm(p + vec3(4.1, 8.2, 1.7));
    float clouds = fbm(p * 2.2 + vec3(warp * 1.8));
    float detail = noise3(p * 21.0 + warp * 3.0);

    // A broad, irregular river of dust, with separate dense ridges and cavities.
    float axis = d.y - .21 - d.x * .24 - sin(d.x * 4.8 - 1.1) * .065;
    float band = exp(-pow((axis + (warp - .5) * .38) * 4.3, 2.0));
    float forward = 1.0 - smoothstep(-.75, .25, d.z);
    float mass = band * smoothstep(.24, .78, clouds) * forward;
    float ridge = pow(max(0.0, 1.0 - abs(clouds - .49) * 7.0), 3.0);
    float dust = smoothstep(.39, .65, fbm(p * 1.3 + vec3(13.0))) * band;

    vec3 col = mix(vec3(.013, .021, .052), vec3(.030, .048, .080),
                   exp(-abs(d.y + .03) * 2.4));
    col += vec3(.024, .020, .057) * fbm(p * .58 + 21.0);
    vec3 cool = mix(vec3(.045, .135, .157), vec3(.120, .225, .245), clouds);
    vec3 warm = vec3(.255, .132, .115);
    float warmth = smoothstep(-.30, .62, d.x) * .79;
    col += mix(cool, warm, warmth) * mass * 1.18;
    col += mix(vec3(.10, .20, .22), vec3(.24, .15, .13), warmth)
         * ridge * band * forward * .13 * (.65 + .35 * detail);
    col *= 1.0 - dust * forward * .38;
    // A little scattered blue at the horizon separates the distant islands.
    col += vec3(.013, .030, .039) * exp(-pow((d.y + .025) * 5.5, 2.0));
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,L3=`
  uniform float uTime;
  varying vec3 vDirection;
  ${hu}
  void main() {
    vec3 d = normalize(vDirection);
    vec3 p = d * 6.5 + vec3(8.0, -uTime * .00024, 11.0);
    float n = fbm(p);
    float axis = d.y - .32 - .19 * d.x + (n - .5) * .24;
    float ribbon = exp(-axis * axis * 90.0);
    float filaments = pow(smoothstep(.39, .69, fbm(p * 2.6 + n)), 2.0);
    float alpha = ribbon * filaments * (1.0 - smoothstep(-.75, .1, d.z)) * .17;
    gl_FragColor = vec4(mix(vec3(.10, .30, .32), vec3(.36, .19, .17),
      smoothstep(-.2, .65, d.x)), alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,qc=`
  varying vec3 vLocal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vLocal = normalize(position);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,du="normalize(vec3(-.78, .40, .28))",M_=`
  uniform float uTime;
  uniform float uCompanion;
  varying vec3 vLocal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  ${hu}
  void main() {
    vec3 p = normalize(vLocal);
    // Large cloud decks remain legible across the whole sphere. The much
    // finer flow only bends their edges; it never breaks them into marbling.
    float flow = fbm(vec3(p.x * 4.5, p.y * 3.0, p.z * 4.5));
    float fine = fbm(vec3(p.x * 22.0, p.y * 10.0, p.z * 22.0) + flow);
    float latitude = p.y + (flow - .5) * .048 + (fine - .5) * .011;
    float broad = .5 + .5 * sin(latitude * 24.0 + .32 * sin(latitude * 7.0));
    float belts = smoothstep(.23, .80, broad);
    float ribbons = .5 + .5 * sin(latitude * 103.0 + flow * 1.7);
    float threads = .5 + .5 * sin(latitude * 237.0 + fine * 1.3);
    vec3 stone = mix(vec3(.12, .205, .225), vec3(.43, .52, .50), belts);
    float ochre = smoothstep(.44, .65, sin(latitude * 10.5 + 1.2) * .5 + .5);
    stone = mix(stone, mix(vec3(.265,.25,.215), vec3(.59,.52,.39), belts), ochre * .63);
    stone *= .92 + ribbons * .12 + threads * .035;
    // Restrained storm curls within selected dark belts, under the high deck.
    stone += vec3(.070,.082,.070) * (fine - .44) * (1.0 - belts) * .8;
    vec3 moon = mix(vec3(.125, .14, .20), vec3(.41, .38, .36), flow);
    moon *= .78 + fine * .48;
    stone = mix(stone, moon, uCompanion);
    vec3 normalWorld = normalize(vWorldNormal);
    vec3 light = ${du};
    float sun = dot(normalWorld, light);
    float day = smoothstep(-.025, .085, sun);
    float diffuse = pow(max(sun, 0.0), .72) * day;
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float rim = pow(1.0 - max(dot(normalWorld, viewDirection), 0.0), 4.4);
    vec3 color = stone * (vec3(.023, .038, .067) + diffuse * vec3(1.10, 1.025, .89));
    color += vec3(.13,.28,.36) * rim * smoothstep(-.09, .42, sun) * .32;
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,N3=`
  varying vec3 vLocal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  ${hu}
  void main() {
    vec3 p = normalize(vLocal);
    float flow = fbm(vec3(p.x * 8.0, p.y * 4.0, p.z * 8.0) + 9.2);
    float latitude = p.y + (flow - .5) * .041;
    float veil = fbm(vec3(p.x * 28.0, p.y * 10.0, p.z * 28.0));
    float decks = smoothstep(.72, .95, .5 + .5 * sin(latitude * 71.0 + flow));
    float strands = smoothstep(.63, .88, .5 + .5 * sin(latitude * 183.0 + flow * 1.8));
    float clouds = (decks * .20 + strands * .07) * smoothstep(.23, .7, veil);
    float sun = dot(normalize(vWorldNormal), ${du});
    float day = smoothstep(-.035, .14, sun);
    vec3 color = vec3(.55,.65,.64) * (.10 + .9 * pow(max(sun, 0.0), .65));
    gl_FragColor = vec4(color, clouds * day);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,O3=`
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float rim = pow(1.0 - max(dot(n, viewDir), 0.0), 5.4);
    float sun = dot(n, ${du});
    float light = smoothstep(-.13, .6, sun);
    gl_FragColor = vec4(vec3(.18, .42, .64), rim * light * .38);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,P3=`
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  void main() {
    vPosition = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,z3=`
  uniform vec3 uPlanetPosition;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  void main() {
    float r = length(vPosition.xy);
    float t = (r - 20.3) / 10.3;
    float edge = smoothstep(0.0, .055, t) * (1.0 - smoothstep(.87, 1.0, t));
    // Fine radial strata fade at subpixel width instead of producing moire.
    float radialPixel = max(fwidth(r), .0001);
    float grains = .59 + .16 * sin(r * 22.0) * (1.0 - smoothstep(.045, .12, radialPixel))
                       + .055 * sin(r * 63.0) * (1.0 - smoothstep(.015, .045, radialPixel));
    float division = 1.0 - smoothstep(.015, .035, abs(t - .61));
    float broad = .7 + .3 * sin(t * 19.0);
    vec3 color = mix(vec3(.29,.38,.40), vec3(.52,.45,.35), t);
    vec3 toCenter = uPlanetPosition - vWorldPosition;
    vec3 light = ${du};
    float projection = dot(toCenter, light);
    float distanceFromRay = sqrt(max(0.0, dot(toCenter, toCenter) - projection * projection));
    float shadow = smoothstep(15.5, 17.3, distanceFromRay);
    shadow = mix(1.0, shadow, smoothstep(0.0, 2.0, projection));
    color *= .2 + .8 * shadow;
    gl_FragColor = vec4(color, edge * grains * broad * (1.0 - division * .93) * .45);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,B3=`
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  varying vec3 vColor;
  varying float vIntensity;
  void main() {
    vColor = aColor;
    // No flashing: the faintest variation takes well over a minute.
    vIntensity = .91 + .09 * sin(uTime * .041 + aPhase);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize;
    gl_Position = projectionMatrix * mvPosition;
  }
`,I3=`
  varying vec3 vColor;
  varying float vIntensity;
  void main() {
    vec2 p = gl_PointCoord - .5;
    float d = length(p);
    float core = exp(-d * d * 30.0);
    float halo = exp(-d * d * 8.0) * .16;
    float a = (core + halo) * (1.0 - smoothstep(.3, .5, d)) * vIntensity;
    gl_FragColor = vec4(vColor, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function F3(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function H3(){const r=new os;r.name="cosmic-sky";const t=[],i=[],s={value:0};function l(E){return t.push(E),E}function c(E){return i.push(E),E}const f=new tn(l(new Br(230,48,32)),c(new _n({uniforms:{uTime:s},vertexShader:y_,fragmentShader:U3,side:Hn,depthWrite:!1})));f.name="distant-nebula-shell",f.renderOrder=-100,r.add(f);const p=new tn(l(new Br(205,32,24)),c(new _n({uniforms:{uTime:s},vertexShader:y_,fragmentShader:L3,side:Hn,transparent:!0,depthWrite:!1,blending:Fr})));p.name="near-nebula-filaments",p.renderOrder=-90,r.add(p);const m=F3(482092),d=2600,v=new Float32Array(d*3),_=new Float32Array(d),g=new Float32Array(d),x=new Float32Array(d*3);for(let E=0;E<d;E+=1){const L=m()*2-1,F=m()*Math.PI*2,k=Math.sqrt(1-L*L),G=175+m()*20;v.set([k*Math.cos(F)*G,L*G,k*Math.sin(F)*G],E*3);const J=m();_[E]=J>.984?3.7:.75+Math.pow(J,3)*1.85,g[E]=m()*Math.PI*2;const X=m(),$=.35+J*.65;x.set([(X>.82?1:.66+X*.25)*$,(.76+X*.14)*$,(X>.82?.68:1)*$],E*3)}const b=l(new xn);b.setAttribute("position",new ni(v,3)),b.setAttribute("aSize",new ni(_,1)),b.setAttribute("aPhase",new ni(g,1)),b.setAttribute("aColor",new ni(x,3));const R=new J_(b,c(new _n({uniforms:{uTime:s},vertexShader:B3,fragmentShader:I3,transparent:!0,depthWrite:!1,blending:Fr})));R.name="fine-distant-stars",R.renderOrder=-70,r.add(R);const M=new H(19,24,-78),S=l(new Br(16.8,96,64)),U=new tn(S,c(new _n({uniforms:{uTime:s,uCompanion:{value:0}},vertexShader:qc,fragmentShader:M_})));U.name="aurelia-gas-giant",U.position.copy(M),U.rotation.set(.16,-.4,-.27),r.add(U);const P=new tn(S,c(new _n({vertexShader:qc,fragmentShader:N3,transparent:!0,depthWrite:!1})));P.name="aurelia-high-cloud-deck",P.position.copy(M),P.rotation.copy(U.rotation),P.scale.setScalar(1.0035),P.renderOrder=-45,r.add(P);const A=new tn(S,c(new _n({vertexShader:qc,fragmentShader:O3,transparent:!0,depthWrite:!1,blending:Fr})));A.name="aurelia-thin-atmosphere",A.position.copy(M),A.scale.setScalar(1.013),A.renderOrder=-40,r.add(A);const N=new tn(l(new vp(20.3,30.6,192,1)),c(new _n({uniforms:{uPlanetPosition:{value:M}},vertexShader:P3,fragmentShader:z3,transparent:!0,side:zi,depthWrite:!1})));N.name="aurelia-dust-rings",N.position.copy(M),N.rotation.set(1.48,.4,0),N.renderOrder=-35,r.add(N);const O=new tn(l(new Br(4.1,48,32)),c(new _n({uniforms:{uTime:s,uCompanion:{value:1}},vertexShader:qc,fragmentShader:M_})));O.name="distant-companion-moon",O.position.set(-34,20,-113),O.rotation.set(.4,.3,.1),r.add(O);let C=!1;return{group:r,update(E){C||(s.value=E,U.rotation.y=-.4+E*32e-5,P.rotation.y=-.4+E*54e-5)},dispose(){if(!C){C=!0;for(const E of t)E.dispose();for(const E of i)E.dispose();r.clear()}}}}class pu extends tn{constructor(t,i={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const s=this,l=i.color!==void 0?new ee(i.color):new ee(8355711),c=i.textureWidth||512,f=i.textureHeight||512,p=i.clipBias||0,m=i.shader||pu.ReflectorShader,d=i.multisample!==void 0?i.multisample:4,v=new Ma,_=new H,g=new H,x=new H,b=new Ie,R=new H(0,0,-1),M=new Ze,S=new H,U=new H,P=new Ze,A=new Ie,N=new Ri(c,f,{samples:d,type:Fi}),O=new _n({name:m.name!==void 0?m.name:"unspecified",uniforms:ix.clone(m.uniforms),fragmentShader:m.fragmentShader,vertexShader:m.vertexShader});O.uniforms.tDiffuse.value=N.texture,O.uniforms.color.value=l,O.uniforms.textureMatrix.value=A,this.material=O,this.onBeforeRender=function(C,E,L){const F=this.getReflectionCamera(L);if(g.setFromMatrixPosition(s.matrixWorld),x.setFromMatrixPosition(L.matrixWorld),b.extractRotation(s.matrixWorld),_.set(0,0,1),_.applyMatrix4(b),S.subVectors(g,x),S.dot(_)>0===!0&&this.forceUpdate===!1)return;S.reflect(_).negate(),S.add(g),b.extractRotation(L.matrixWorld),R.set(0,0,-1),R.applyMatrix4(b),R.add(x),U.subVectors(g,R),U.reflect(_).negate(),U.add(g),F.position.copy(S),F.up.set(0,1,0),F.up.applyMatrix4(b),F.up.reflect(_),F.lookAt(U),F.far=L.far,F.updateMatrixWorld(),F.projectionMatrix.copy(L.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(F.projectionMatrix),A.multiply(F.matrixWorldInverse),A.multiply(s.matrixWorld),v.setFromNormalAndCoplanarPoint(_,g),v.applyMatrix4(F.matrixWorldInverse),M.set(v.normal.x,v.normal.y,v.normal.z,v.constant);const G=F.projectionMatrix;F.isOrthographicCamera?(P.x=(Math.sign(M.x)+G.elements[8])/G.elements[0],P.y=(Math.sign(M.y)+G.elements[9])/G.elements[5],P.z=-L.far,P.w=1):(P.x=(Math.sign(M.x)+G.elements[8])/G.elements[0],P.y=(Math.sign(M.y)+G.elements[9])/G.elements[5],P.z=-1,P.w=(1+G.elements[10])/G.elements[14]),M.multiplyScalar(2/M.dot(P)),G.elements[2]=M.x,G.elements[6]=M.y,F.isOrthographicCamera?(G.elements[10]=M.z-p,G.elements[14]=M.w-1):(G.elements[10]=M.z+1-p,G.elements[14]=M.w),s.visible=!1;const J=C.getRenderTarget(),X=C.xr.enabled,$=C.shadowMap.autoUpdate;C.xr.enabled=!1,C.shadowMap.autoUpdate=!1,C.setRenderTarget(N),C.state.buffers.depth.setMask(!0),C.autoClear===!1&&C.clear(),C.render(E,F),C.xr.enabled=X,C.shadowMap.autoUpdate=$,C.setRenderTarget(J);const I=L.viewport;I!==void 0&&C.state.viewport(I),s.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return N},this.dispose=function(){N.dispose(),s.material.dispose()},this.getReflectionCamera=function(C){let E=this._reflectionCameras.get(C);return E===void 0&&(E=C.clone(),this._reflectionCameras.set(C,E)),E}}}pu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function G3(r,t=!1){const i=r[0].index!==null,s=new Set(Object.keys(r[0].attributes)),l=new Set(Object.keys(r[0].morphAttributes)),c={},f={},p=r[0].morphTargetsRelative,m=new xn;let d=0;for(let v=0;v<r.length;++v){const _=r[v];let g=0;if(i!==(_.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in _.attributes){if(!s.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;c[x]===void 0&&(c[x]=[]),c[x].push(_.attributes[x]),g++}if(g!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". Make sure all geometries have the same number of attributes."),null;if(p!==_.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in _.morphAttributes){if(!l.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+".  .morphAttributes must be consistent throughout all geometries."),null;f[x]===void 0&&(f[x]=[]),f[x].push(_.morphAttributes[x])}if(t){let x;if(i)x=_.index.count;else if(_.attributes.position!==void 0)x=_.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". The geometry must have either an index or a position attribute"),null;m.addGroup(d,x,v),d+=x}}if(i){let v=0;const _=[];for(let g=0;g<r.length;++g){const x=r[g].index;for(let b=0;b<x.count;++b)_.push(x.getX(b)+v);v+=r[g].attributes.position.count}m.setIndex(_)}for(const v in c){const _=E_(c[v]);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+v+" attribute."),null;m.setAttribute(v,_)}for(const v in f){const _=f[v][0].length;if(_!==0){m.morphAttributes=m.morphAttributes||{},m.morphAttributes[v]=[];for(let g=0;g<_;++g){const x=[];for(let R=0;R<f[v].length;++R)x.push(f[v][R][g]);const b=E_(x);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+v+" morphAttribute."),null;m.morphAttributes[v].push(b)}}}return m}function E_(r){let t,i,s,l=-1,c=0;for(let d=0;d<r.length;++d){const v=r[d];if(t===void 0&&(t=v.array.constructor),t!==v.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(i===void 0&&(i=v.itemSize),i!==v.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(s===void 0&&(s=v.normalized),s!==v.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(l===-1&&(l=v.gpuType),l!==v.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;c+=v.count*i}const f=new t(c),p=new ni(f,i,s);let m=0;for(let d=0;d<r.length;++d){const v=r[d];if(v.isInterleavedBufferAttribute){const _=m/i;for(let g=0,x=v.count;g<x;g++)for(let b=0;b<i;b++){const R=v.getComponent(g,b);p.setComponent(g+_,b,R)}}else f.set(v.array,m);m+=v.count*i}return l!==void 0&&(p.gpuType=l),p}function V3(r,t=1e-4){t=Math.max(t,Number.EPSILON);const i={},s=r.getIndex(),l=r.getAttribute("position"),c=s?s.count:l.count;let f=0;const p=Object.keys(r.attributes),m={},d={},v=[],_=["getX","getY","getZ","getW"],g=["setX","setY","setZ","setW"];for(let U=0,P=p.length;U<P;U++){const A=p[U],N=r.attributes[A];m[A]=new N.constructor(new N.array.constructor(N.count*N.itemSize),N.itemSize,N.normalized);const O=r.morphAttributes[A];O&&(d[A]||(d[A]=[]),O.forEach((C,E)=>{const L=new C.array.constructor(C.count*C.itemSize);d[A][E]=new C.constructor(L,C.itemSize,C.normalized)}))}const x=t*.5,b=Math.log10(1/t),R=Math.pow(10,b),M=x*R;for(let U=0;U<c;U++){const P=s?s.getX(U):U;let A="";for(let N=0,O=p.length;N<O;N++){const C=p[N],E=r.getAttribute(C),L=E.itemSize;for(let F=0;F<L;F++)A+=`${Math.trunc(E[_[F]](P)*R+M)},`}if(A in i)v.push(i[A]);else{for(let N=0,O=p.length;N<O;N++){const C=p[N],E=r.getAttribute(C),L=r.morphAttributes[C],F=E.itemSize,k=m[C],G=d[C];for(let J=0;J<F;J++){const X=_[J],$=g[J];if(k[$](f,E[X](P)),L)for(let I=0,W=L.length;I<W;I++)G[I][$](f,L[I][X](P))}}i[A]=f,v.push(f),f++}}const S=r.clone();for(const U in r.attributes){const P=m[U];if(S.setAttribute(U,new P.constructor(P.array.slice(0,f*P.itemSize),P.itemSize,P.normalized)),U in d)for(let A=0;A<d[U].length;A++){const N=d[U][A];S.morphAttributes[U][A]=new N.constructor(N.array.slice(0,f*N.itemSize),N.itemSize,N.normalized)}}return S.setIndex(v),S}const En=new H(0,1,0),ii=Math.PI*2;function k3(r){let t=r|0;return()=>{t+=1831565813;let i=Math.imul(t^t>>>15,t|1);return i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296}}function Wr(r,t=!1){return new ee().setHSL(.345+r()*.065,.53+r()*.18,(t?.19:.1)+r()*.085)}class Vr{constructor(){this.positions=[],this.colors=[],this.uvs=[],this.leafData=[],this.indices=[]}vertex(t,i,s,l,c,f,p){const m=this.positions.length/3;return this.positions.push(t.x,t.y,t.z),this.colors.push(l.r,l.g,l.b),this.uvs.push(i,s),this.leafData.push(c,f,p,0),m}append(t,i){const s=this.positions.length/3,l=new H;for(let c=0;c<t.positions.length;c+=3)l.fromArray(t.positions,c).applyMatrix4(i),this.positions.push(l.x,l.y,l.z);for(const c of t.colors)this.colors.push(c);for(const c of t.uvs)this.uvs.push(c);for(const c of t.leafData)this.leafData.push(c);for(const c of t.indices)this.indices.push(c+s)}geometry(){var i;const t=new xn;return t.setAttribute("position",new we(this.positions,3)),t.setAttribute("color",new we(this.colors,3)),t.setAttribute("uv",new we(this.uvs,2)),t.setAttribute("aBotany",new we(this.leafData,4)),t.setIndex(this.indices),t.computeVertexNormals(),t.computeBoundingBox(),t.computeBoundingSphere(),(i=t.boundingBox)==null||i.expandByScalar(.06),t.boundingSphere&&(t.boundingSphere.radius+=.06),t}}function us(r,t){const i=t.family??0,s=i===1||i===2?10:i===3?12:18,l=i===2?2:i===1?4:6,c=t.direction.clone().normalize(),f=new H().crossVectors(c,t.surfaceNormal??En);f.lengthSq()<1e-4&&f.set(1,0,0),f.normalize();const p=new H().crossVectors(f,c).normalize();t.roll&&(f.applyAxisAngle(c,t.roll),p.applyAxisAngle(c,t.roll));const m=r.positions.length/3,d=new H;for(let v=0;v<=s;v++){const _=v/s;let g=Math.max(.004,Math.pow(Math.sin(Math.PI*_),i===0?.58:i===3?.65:.72));i===2&&(g=Math.max(.004,(.83+.17*Math.sin(Math.PI*_))*Math.pow(1-_,.72))),i===1&&(g*=1+Math.sin(_*Math.PI*15)*.055);const x=(t.arch??.12)*Math.sin(_*Math.PI)+(t.droop??-.09)*_*_;for(let b=0;b<=l;b++){const R=b/l*2-1,M=1+R*.07*Math.sin(_*Math.PI+t.phase),S=(t.cup??-.055)*Math.pow(Math.abs(R),1.45)*Math.sin(Math.PI*_),U=(t.twist??.035)*R*Math.sin(Math.PI*_)*_;d.copy(t.root).addScaledVector(c,t.length*_).addScaledVector(f,R*t.width*.5*g*M).addScaledVector(p,t.length*(x+S+U));const P=Math.max(0,t.root.y)*.2+_*_*.72;r.vertex(d,(R+1)*.5,_,t.color,t.phase,i,P)}}for(let v=0;v<s;v++)for(let _=0;_<l;_++){const g=m+v*(l+1)+_,x=g+l+1;r.indices.push(g,g+1,x,g+1,x+1,x)}}function Fs(r,t,i,s,l=0,c=12){const f=new ul(t),p=f.computeFrenetFrames(c,!1),m=5,d=r.positions.length/3,v=new H;for(let _=0;_<=c;_++){const g=_/c,x=f.getPointAt(g),b=i*(1-.68*g);for(let R=0;R<=m;R++){const M=R/m*ii;v.copy(x).addScaledVector(p.normals[_],Math.cos(M)*b).addScaledVector(p.binormals[_],Math.sin(M)*b),r.vertex(v,R/m,g,s,l,4,Math.max(0,v.y)*.2)}}for(let _=0;_<c;_++)for(let g=0;g<m;g++){const x=d+_*(m+1)+g,b=x+m+1;r.indices.push(x,x+1,b,x+1,b+1,b)}}function b_(r,t,i,s,l){const p=r.positions.length/3;for(let m=0;m<=5;m++){const d=m/5*Math.PI;for(let v=0;v<=8;v++){const _=v/8*ii,g=new H(t.x+Math.cos(_)*Math.sin(d)*i,t.y+Math.cos(d)*i*.68,t.z+Math.sin(_)*Math.sin(d)*i);r.vertex(g,v/8,m/5,s,l,4,t.y*.2)}}for(let m=0;m<5;m++)for(let d=0;d<8;d++){const v=p+m*9+d,_=v+8+1;r.indices.push(v,v+1,_,v+1,_+1,_)}}function X3(r,t,i){const s=new ee("#355937"),l=i()*ii;for(let c=0;c<3;c++){const f=l+c*2.39996,p=new H(Math.sin(f),0,Math.cos(f)),m=[.94,.72,.57][c],d=p.clone().multiplyScalar(.1+c*.025),v=p.clone().multiplyScalar(.07+c*.027),_=d.clone().add(v).addScaledVector(En,m),g=i()*ii;Fs(t,[d,d.clone().addScaledVector(En,m*.43),_],.013,s,g);for(let x=0;x<8;x++){const b=.13+x*.113,R=l+x*2.39996+c*1.73,M=new H(Math.sin(R),0,Math.cos(R)),S=d.clone().addScaledVector(En,m*b).addScaledVector(v,b),U=.055+(1-b)*.075,P=S.clone().addScaledVector(M,U).addScaledVector(En,.065+b*.035);Fs(t,[S,S.clone().lerp(P,.6).addScaledVector(En,.018),P],.0045,s,g,5);const A=(.51+i()*.12)*(1-x*.042)*(c===2?.86:1);us(r,{root:P,direction:M.clone().addScaledVector(En,.28+x*.073),length:A,width:A*(.6+i()*.16),color:Wr(i,x>5),phase:g,arch:.11+i()*.08,droop:-.16-i()*.15,cup:-.075-i()*.025,twist:(i()-.5)*.19,roll:(i()-.5)*.34})}}for(let c=0;c<6;c++){const f=l+c*2.39996,p=new H(Math.sin(f),0,Math.cos(f)),m=p.clone().multiplyScalar(.035),d=p.clone().multiplyScalar(.13).addScaledVector(En,.16+i()*.085),v=i()*ii;Fs(t,[m,m.clone().lerp(d,.55).addScaledVector(En,.02),d],.006,s,v,8);const _=.56+i()*.1;us(r,{root:d,direction:p.clone().addScaledVector(En,.32+i()*.2),length:_,width:_*(.65+i()*.09),color:Wr(i),phase:v,arch:.14,droop:-.31,cup:-.085,twist:(i()-.5)*.18,roll:(i()-.5)*.27})}}function W3(r,t,i){const s=new ee("#3b6035"),l=i()*ii;for(let c=0;c<11;c++){const f=l+c*2.39996+i()*.18,p=new H(Math.sin(f),0,Math.cos(f)),m=new H(Math.cos(f),0,-Math.sin(f)),d=.7+i()*.32,v=c<3,_=v?.69:1.01,g=v?1:.72+i()*.14,x=i()*ii,R=[p.clone().multiplyScalar(.015+i()*.045),p.clone().multiplyScalar(.12*d).addScaledVector(En,.27*d),p.clone().multiplyScalar(_*.53*d).addScaledVector(En,g*d),p.clone().multiplyScalar(_*d).addScaledVector(En,(v?.91:.41+i()*.2)*d)],M=new ul(R);Fs(t,R,.0065,s,x,20);for(let S=0;S<14;S++){const U=.15+S*.0615,P=Math.pow(Math.sin(Math.PI*(.18+S/14*.8)),.73);for(const A of[-1,1]){const N=A===1?.011:0,O=M.getPoint(Math.min(.985,U+N)),C=M.getTangent(U).normalize(),E=new H().crossVectors(m,C).normalize();E.y<0&&E.negate();const L=(.285+i()*.045)*P*d;us(r,{root:O,direction:m.clone().multiplyScalar(A).addScaledVector(C,.29+S*.013).addScaledVector(En,.045),length:L,width:L*(.36+i()*.09),color:Wr(i,v&&S>10),phase:x,family:1,arch:.08,droop:-.09,cup:-.036,twist:A*.035,roll:A*(.035+i()*.1),surfaceNormal:E})}}us(r,{root:M.getPoint(.93),direction:M.getTangent(.96),length:.12*d,width:.038*d,color:Wr(i,!0),phase:x,family:1})}}function q3(r,t,i){for(let s=0;s<38;s++){const l=i()*ii,c=Math.sqrt(i())*.15,f=new H(Math.sin(l),0,Math.cos(l)),p=f.clone().multiplyScalar(c),m=.4+i()*.47;us(r,{root:p,direction:f.clone().multiplyScalar(.08+i()*.27).addScaledVector(En,1),length:m,width:.012+i()*.026,color:Wr(i,s%6===0),phase:i()*ii,family:2,arch:-.06,droop:-.22-i()*.23,cup:-.024,twist:(i()-.5)*.08,roll:(i()-.5)*.7})}for(let s=0;s<4;s++){const l=i()*ii,c=new H(Math.sin(l)*.15,.6+i()*.28,Math.cos(l)*.15);Fs(t,[new H,c.clone().multiplyScalar(.55).add(new H(0,.045,0)),c],.0018,new ee("#787b42"),l);for(let f=0;f<5;f++){const p=c.clone().addScaledVector(En,-f*.025);us(r,{root:p,direction:new H(Math.sin(l+f*2.4)*.35,1,Math.cos(l+f*2.4)*.35),length:.042,width:.009,color:new ee("#8e9060"),phase:l,family:2,arch:.015,droop:0})}}}function Y3(r,t,i,s){const l=new ee("#527f55"),c=new ee("#dbbe69"),f=s()*ii;for(let p=0;p<5;p++){const m=f+p*2.4,d=new H(Math.sin(m),0,Math.cos(m)),v=d.clone().multiplyScalar(.055+s()*.08),_=.58+s()*.44,g=v.clone().addScaledVector(d,.06+s()*.1).addScaledVector(En,_),x=s()*ii,b=[v,v.clone().lerp(g,.5).addScaledVector(d,-.035),g],R=new ul(b);Fs(t,b,.0045,l,x,16);for(let M=0;M<3;M++){const S=m+M*2.2,U=new H(Math.sin(S),.45,Math.cos(S));us(r,{root:R.getPoint(.22+M*.19),direction:U,length:.22-M*.025,width:.055,color:Wr(s,M===2),phase:x,arch:.09,droop:-.12,twist:.055})}for(let M=0;M<6;M++){const S=m+M/6*ii,U=new H(Math.sin(S),.1+s()*.08,Math.cos(S)),P=new ee().setHSL(.73+s()*.035,.14+s()*.12,.71+s()*.14);us(r,{root:g.clone().addScaledVector(U,.004),direction:U,length:.105+s()*.025,width:.073+s()*.012,color:P,phase:x,family:3,arch:.13,droop:.05,cup:.075,twist:(s()-.5)*.06})}b_(i,g.clone().addScaledVector(En,.012),.022,c,x);for(let M=0;M<7;M++){const S=M/7*ii+m,U=g.clone().add(new H(Math.sin(S)*.023,.035+s()*.016,Math.cos(S)*.023));Fs(t,[g,U.clone().lerp(g,.4),U],.0011,c,x,3),b_(i,U,.0045,c,x)}}}function Z3(r,t){const i=new Vr,s=new Vr,l=new Vr,c=k3(t);return r==="fern"?W3(i,s,c):r==="grass"?q3(i,s,c):r==="blossom"?Y3(i,s,l,c):X3(i,s,c),[i,s,l]}const K3=`
  attribute vec4 aBotany;
  uniform float uBotanyTime;
  uniform vec4 uBotanyPulse;
  varying vec2 vBotanyUv;
  varying vec4 vBotanyData;
  varying float vBotanyTouch;
`,Q3=`
  vBotanyUv = uv;
  vBotanyData = aBotany;
  vec3 botanyWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
  float botanyBreeze = sin(uBotanyTime * 0.71 + botanyWorld.x * 0.47 + botanyWorld.z * 0.37);
  float botanyFlutter = sin(uBotanyTime * 1.37 + aBotany.x + uv.y * 2.1);
  float botanyWeight = min(aBotany.z, 1.25);
  transformed.x += (botanyBreeze * 0.010 + botanyFlutter * 0.0025) * botanyWeight;
  transformed.z += (botanyBreeze * 0.005 + cos(uBotanyTime * 0.53 + aBotany.x) * 0.002) * botanyWeight;
  float botanyAge = max(0.0, uBotanyPulse.w);
  float botanyDistance = distance(botanyWorld, uBotanyPulse.xyz);
  float botanyRing = exp(-pow((botanyDistance - botanyAge * 1.7) / 0.55, 2.0));
  vBotanyTouch = uBotanyPulse.w < 0.0 ? 0.0 : botanyRing * exp(-botanyAge * 0.8);
  transformed.y += sin(botanyAge * 5.0 - botanyDistance * 3.0) * vBotanyTouch * botanyWeight * 0.018;
`,J3=`
  varying vec2 vBotanyUv;
  varying vec4 vBotanyData;
  varying float vBotanyTouch;
  float botanyHash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float botanyNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(botanyHash(i), botanyHash(i + vec2(1.0, 0.0)), f.x),
      mix(botanyHash(i + vec2(0.0, 1.0)), botanyHash(i + vec2(1.0)), f.x), f.y);
  }
`;function j3(r,t){const i=new y1({color:16777215,vertexColors:!0,roughness:t==="leaf"?.66:.78,metalness:0,specularIntensity:t==="leaf"?.3:.45,side:t==="leaf"?zi:ls});return i.name=`Cosmic garden ${t}`,i.onBeforeCompile=s=>{Object.assign(s.uniforms,r),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
${K3}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${Q3}`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
${J3}`),t==="leaf"&&(s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`
        #include <color_fragment>
        float leafX = abs(vBotanyUv.x - 0.5) * 2.0;
        float leafY = vBotanyUv.y;
        float leafFamily = vBotanyData.y;
        float leafAA = max(fwidth(leafX), 0.0012);
        float leafMidribWidth = mix(0.040, 0.010, leafY);
        float leafMidrib = 1.0 - smoothstep(leafMidribWidth, leafMidribWidth + leafAA, leafX);
        float leafBranches = leafY * (leafFamily > 0.5 && leafFamily < 1.5 ? 8.0 : 6.5) - pow(leafX, 0.82) * 1.8;
        float leafBranchDistance = abs(fract(leafBranches + 0.5) - 0.5);
        float leafBranchAA = max(fwidth(leafBranches), 0.01);
        float leafBranchVein = 1.0 - smoothstep(0.025, 0.025 + leafBranchAA, leafBranchDistance);
        leafBranchVein *= (1.0 - smoothstep(0.45, 0.94, leafX)) * smoothstep(0.04, 0.17, leafY) * (1.0 - smoothstep(0.84, 1.0, leafY));
        float leafGrain = botanyNoise(vBotanyUv * vec2(26.0, 57.0) + vBotanyData.x * 3.0);
        float leafMottle = botanyNoise(vBotanyUv * vec2(4.0, 8.0) + vBotanyData.x);
        float leafVeins = max(leafMidrib * 0.38, leafBranchVein * 0.17);
        if (leafFamily > 1.5 && leafFamily < 2.5) leafVeins = leafMidrib * 0.27;
        if (leafFamily > 2.5) leafVeins = leafMidrib * 0.08 + leafBranchVein * 0.035;
        vec3 leafVeinColor = leafFamily > 2.5 ? vec3(0.62, 0.55, 0.73) : vec3(0.19, 0.33, 0.08);
        diffuseColor.rgb *= 0.90 + leafMottle * 0.16 + leafGrain * 0.045;
        diffuseColor.rgb = mix(diffuseColor.rgb, leafVeinColor, leafVeins);
        diffuseColor.rgb *= 1.0 - 0.09 * pow(leafX, 4.0);
      `).replace("#include <roughnessmap_fragment>",`
        #include <roughnessmap_fragment>
        roughnessFactor *= 0.93 + leafGrain * 0.12 - leafVeins * 0.12;
      `).replace("#include <opaque_fragment>",`
        // Thin-leaf backlight: a quiet warm key and a cool environmental edge.
        vec3 leafWarmDirection = normalize((viewMatrix * vec4(-0.4, 0.65, -0.6, 0.0)).xyz);
        vec3 leafCoolDirection = normalize((viewMatrix * vec4(0.6, 0.25, 0.7, 0.0)).xyz);
        float leafBacklight = pow(max(0.0, dot(-normal, leafWarmDirection)), 1.7);
        float leafCoolLight = pow(max(0.0, dot(-normal, leafCoolDirection)), 2.0);
        float leafThinness = (1.0 - leafVeins) * (0.55 + leafX * 0.45);
        outgoingLight += diffuseColor.rgb * leafThinness * (vec3(0.82, 0.66, 0.28) * leafBacklight * 0.14 + vec3(0.20, 0.47, 0.54) * leafCoolLight * 0.06);
        outgoingLight += diffuseColor.rgb * vec3(0.55, 0.90, 0.68) * vBotanyTouch * 0.24;
        #include <opaque_fragment>
      `))},i.customProgramCacheKey=()=>`cosmic-botany-v2-${t}`,i}function $3(r,t){const i=new os;i.name=t,i.userData.botanical=!0;const s=[new Vr,new Vr,new Vr];for(const v of r){const _=Z3(v.kind,v.seed),g=v.scale??1,x=new Ie().compose(new H(v.x??0,0,v.z??0),new fs().setFromAxisAngle(En,v.rotation??0),new H(g,g,g));_.forEach((b,R)=>s[R].append(b,x))}const l={uBotanyTime:{value:0},uBotanyPulse:{value:new Ze(0,0,0,-1)}},c=[],f=[],p=[],m=["leaf","stem","pollen"];s.forEach((v,_)=>{if(!v.indices.length)return;const g=v.geometry(),x=j3(l,m[_]),b=new tn(g,x);b.name=`${t} ${m[_]}`,b.userData.botanical=!0,b.userData.plantKind=r.length===1?r[0].kind:"garden",b.userData.label=t,b.receiveShadow=!0,b.castShadow=!1,i.add(b),c.push(x),f.push(g),_===0&&p.push(b)});let d=!1;return{group:i,interactables:p,update(v,_){d||(l.uBotanyTime.value=Number.isFinite(v)?v:0,_&&_.age>=0&&_.age<7?l.uBotanyPulse.value.set(_.position.x,_.position.y,_.position.z,_.age):l.uBotanyPulse.value.w=-1)},dispose(){d||(d=!0,f.forEach(v=>v.dispose()),c.forEach(v=>v.dispose()),i.clear(),p.length=0)}}}function t2(r,t=1){return $3([{kind:r,seed:t}],{fern:"Jade fern",broadleaf:"Verdant leaves",grass:"Silvergrass",blossom:"Moon blossoms"}[r])}function Sp(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function e2(){const r=document.createElement("canvas");r.width=r.height=512;const t=r.getContext("2d"),i=t.createImageData(512,512),s=Sp(4204),l=(p,m)=>{const d=Math.sin(p*127.1+m*311.7)*43758.5453;return d-Math.floor(d)},c=(p,m)=>{const d=Math.floor(p),v=Math.floor(m),_=p-d,g=m-v,x=_*_*(3-2*_),b=g*g*(3-2*g);return Ch.lerp(Ch.lerp(l(d,v),l(d+1,v),x),Ch.lerp(l(d,v+1),l(d+1,v+1),x),b)};for(let p=0;p<512;p++)for(let m=0;m<512;m++){const d=c(m*.012,p*.012)*.55+c(m*.037,p*.037)*.28+c(m*.115,p*.115)*.17,v=Math.pow(s(),15)*22,_=(s()-.5)*17,g=142+d*72+_-v,x=(p*512+m)*4;i.data[x]=g*.97,i.data[x+1]=g,i.data[x+2]=g*.99,i.data[x+3]=255}t.putImageData(i,0,0),t.strokeStyle="rgba(63,68,65,.19)",t.lineWidth=.65;for(let p=0;p<72;p++){let m=s()*512,d=s()*512;t.beginPath(),t.moveTo(m,d);for(let v=0;v<5;v++)m+=s()*30-10,d+=s()*35,t.lineTo(m,d);t.stroke()}const f=new t1(r);return f.colorSpace=ei,f.wrapS=f.wrapT=$c,f.repeat.set(2,2),f.anisotropy=8,f}function n2(r,t=6){const i=new gp(1,t);i.deleteAttribute("normal");const s=V3(i,1e-4);i.dispose();const l=s.attributes.position;for(let c=0;c<l.count;c++){const f=l.getX(c),p=l.getY(c),m=l.getZ(c),d=1+Math.sin(f*6.9+r)*.07+Math.sin(m*8.3+p*5.7+r)*.06+Math.sin(f*19.1+m*13.6)*.018;l.setXYZ(c,f*d,p*d,m*d)}return s.computeVertexNormals(),s}function i2(r){const t=[],i=[],s=[];for(let p=0;p<=14;p++){const m=p/14,d=-.15-m*4,v=3.1*Math.pow(1-m,.52)+.08;for(let _=0;_<=40;_++){const g=_/40*Math.PI*2,x=1+Math.sin(m*38+r)*.08+Math.sin(g*7+r+m*4)*.1+Math.cos(g*11-m*2)*.045,b=v*x;if(t.push(Math.cos(g)*b,d+Math.sin(g*5+r)*.14*(1-m),Math.sin(g)*b*.75),i.push(_/40,p/14),p<14&&_<40){const R=p*41+_,M=R+40+1;s.push(R,R+1,M,M,R+1,M+1)}}}const f=new xn;return f.setAttribute("position",new we(t,3)),f.setAttribute("uv",new we(i,2)),f.setIndex(s),f.computeVertexNormals(),f}function a2(){const r=new os;r.name="cosmic-living-terrace";const t=e2(),i=new zs({color:"#bbb8ab",map:t,bumpMap:t,bumpScale:.022,roughness:.82}),s=new zs({color:"#747e7d",map:t,bumpMap:t,bumpScale:.018,roughness:.29,metalness:.12}),l=new zs({color:"#646d78",map:t,bumpMap:t,bumpScale:.033,roughness:.86}),c=new zs({color:"#48674d",map:t,bumpMap:t,bumpScale:.033,roughness:.98}),f=new zs({color:"#c9b88f",roughness:.5,metalness:.35}),p=[i,s,l,c,f],m=[],d=[],v=[],_=[],g=Sp(81102),x=Array.from({length:6},(C,E)=>{const L=n2(31+E);return m.push(L),L}),b=(C,E,L,F=i,k=0)=>{const G=new tn(x[k%6],F);return G.position.set(E[0],E[1],E[2]),G.scale.set(L[0],L[1],L[2]),G.rotation.y=k*.71,G.castShadow=!0,G.receiveShadow=!0,G.userData.cosmicStone=!0,C.add(G),G},R=(C,E,L,F,k,G,J)=>{const X=t2(E,J);return X.group.position.set(L,F,k),X.group.scale.setScalar(G),X.group.rotation.y=J*.79,C.add(X.group),C===r&&(X.group.userData.nearPosition={x:L,z:k}),d.push(X),v.push(...X.interactables),X};b(r,[0,-1.75,2.6],[8.5,1.25,8.6],l,1),b(r,[0,-.78,3.9],[7.9,.48,5.5],i,3);for(let C=0;C<32;C++){const E=C/32*Math.PI*2,L=1+(g()-.5)*.08;b(r,[Math.cos(E)*3.12*L,-.44+g()*.1,-.85+Math.sin(E)*3.52*L],[.65+g()*.3,.34,.66+g()*.2],C%3===0?s:i,C)}b(r,[0,-.66,-.85],[2.9,.17,3.25],s,2);for(let C=0;C<42;C++){const E=g()*Math.PI*2,L=Math.sqrt(g())*2.5;b(r,[Math.cos(E)*L,-.4,-.85+Math.sin(E)*L*1.1],[.09+g()*.14,.025+g()*.025,.07+g()*.15],s,C)}[["broadleaf",-3.5,-.22,2.5,1.65],["fern",-2.55,-.18,3.9,1.2],["fern",-4,-.25,.1,1.8],["broadleaf",3.55,-.18,1,1.75],["fern",2.6,-.2,3.5,1.35],["grass",4.5,-.08,2.8,1.7],["blossom",-2.9,-.05,-2.5,1.15],["blossom",3.3,-.14,-2,1.25],["fern",-4.8,-.2,-2.7,1.5],["broadleaf",4.5,-.18,-3.8,1.35],["grass",-3.3,-.16,-4,1.1],["grass",2.7,-.1,-4.2,1]].forEach(([C,E,L,F,k],G)=>R(r,C,E,L,F,k,120+G)),R(r,"fern",-3.55,-.13,1.3,1.1,192),R(r,"broadleaf",3.3,-.14,3.45,1.5,193),R(r,"fern",4,-.1,-.6,1.5,194),R(r,"grass",-4,-.1,3.25,1,195),b(r,[-3.6,-.14,3.4],[1.6,.48,1.3],i,2),b(r,[3.75,-.28,4.15],[1.3,.34,1.5],i,4);for(let C=0;C<26;C++){const E=g()*Math.PI*2;b(r,[Math.cos(E)*(3.7+g()),-.14,-.85+Math.sin(E)*4.1],[.35+g()*.4,.08+g()*.09,.3+g()*.45],c,C)}const S=(C,E,L,F,k)=>{const G=new os;G.position.set(C,E,L),G.scale.setScalar(F),r.add(G);const J=i2(k);m.push(J);const X=new tn(J,l);X.castShadow=!0,X.receiveShadow=!0,G.add(X);for(let I=0;I<7;I++){const W=I/7*Math.PI*2;b(G,[Math.cos(W)*2.1,-.48,Math.sin(W)*1.5],[1.22,.6,.85],i,k+I)}b(G,[0,-.02,0],[2.88,.12,2.07],c,k+3),R(G,"broadleaf",-.9,.12,-.4,2,k+2),R(G,"fern",-1.35,.06,.3,1.25,k+15),R(G,"broadleaf",.45,.1,.45,1.15,k+18),R(G,"grass",1.85,.08,-.5,1.6,k+17),R(G,"fern",1.2,.13,.1,1.45,k+5),R(G,"grass",-1.8,.04,.3,1.1,k+4),R(G,"blossom",.7,.13,-.8,1.6,k+8);const $=new zs({color:"#6c7261",roughness:.85});p.push($);for(let I=0;I<5;I++){const W=I*1.42+k,ot=Math.cos(W)*2.3,et=Math.sin(W)*1.7,ft=new ul([new H(ot,.08,et),new H(ot*1.03,-.8,et*1.05),new H(ot*.86,-2.1-I*.14,et),new H(ot*.78+.2,-2.9-I*.2,et)]),z=new _p(ft,22,.026,5,!1);m.push(z);const tt=new tn(z,$);G.add(tt),I%2===0&&R(G,"fern",ot*.9,-1.1,et,.36,k+I+40)}return _.push({object:G,x:C,y:E,phase:k}),G};S(-10,2.6,-20,1.45,31).rotation.y=.5,S(9.8,.75,-16,1.15,45),S(-1.6,.55,-36,1,61),S(18,4.4,-43,1.9,76).rotation.z=-.08,S(-18,-1.4,-44,1.45,94),S(5,7.4,-57,.8,112);for(let C=0;C<7;C++)b(r,[-4.9-C*.65,-.35+C*.2,-6-C*1.35],[.88-C*.055,.25,.65],i,3+C);const U=new dp(1,96);m.push(U);const P=new pu(U,{textureWidth:1024,textureHeight:1024,clipBias:.003,multisample:0,shader:{name:"CosmicGardenWater",uniforms:{tDiffuse:{value:null},textureMatrix:{value:new Ie},color:{value:new ee},uTime:{value:0},uPulse:{value:new H},uAge:{value:20}},vertexShader:`uniform mat4 textureMatrix;varying vec4 vReflection;varying vec3 vWorld;varying vec2 vUv;
      void main(){vUv=uv;vWorld=(modelMatrix*vec4(position,1.)).xyz;vReflection=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform sampler2D tDiffuse;uniform float uTime;uniform vec3 uPulse;uniform float uAge;varying vec4 vReflection;varying vec3 vWorld;varying vec2 vUv;
      void main(){vec2 p=vWorld.xz;float t=uTime;
        vec2 ripple=vec2(sin(p.y*6.3+t*.38)+sin(p.x*9.2+p.y*4.1-t*.29),cos(p.x*5.2-t*.32)+cos(p.y*8.1-p.x*3.8+t*.21))*.0014;
        float dist=length(vWorld.xz-uPulse.xz);float wave=sin(dist*12.-uAge*2.4)*exp(-pow(dist-uAge*.34,2.)*4.)*sin(clamp(uAge/8.,0.,1.)*3.14159);
        ripple+=normalize(p-uPulse.xz+vec2(.001))*wave*.0015;
        vec2 uv=vReflection.xy/vReflection.w+ripple;
        vec3 reflected=texture2D(tDiffuse,clamp(uv,vec2(.002),vec2(.998))).rgb;
        float fresnel=pow(1.-max(dot(normalize(cameraPosition-vWorld),vec3(0,1,0)),0.),3.);
        vec3 col=mix(vec3(.048,.13,.14),reflected,.58+fresnel*.32);
        float glint=pow(max(0.,sin(p.x*17.+p.y*12.+t*.3)*sin(p.y*19.-p.x*7.-t*.25)),18.);
        col+=vec3(.2,.32,.27)*glint*.17;col+=vec3(.16,.25,.19)*max(wave,0.)*.12;
        gl_FragColor=vec4(col,.86);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`}});P.name="cosmic-reflecting-pool",P.rotation.x=-Math.PI/2,P.position.set(0,-.265,-.85),P.scale.set(2.83,3.18,1),P.material.transparent=!0,P.renderOrder=2,r.add(P),v.push(P);const A=P.material.uniforms,N=[r,..._.map(C=>C.object)];for(const C of N){const E=new Map;for(const L of[...C.children])if(L instanceof tn&&L.userData.cosmicStone){const F=L.material,k=E.get(F)??[];k.push(L),E.set(F,k)}for(const[L,F]of E){const k=F.map(J=>(J.updateMatrix(),J.geometry.clone().applyMatrix4(J.matrix))),G=G3(k);if(k.forEach(J=>J.dispose()),G){m.push(G);const J=new tn(G,L);J.castShadow=!0,J.receiveShadow=!0,C.add(J),F.forEach(X=>C.remove(X))}}}let O=!1;return{group:r,interactables:v,water:P,update(C,E){O||(d.forEach(L=>L.update(C,E)),_.forEach(({object:L,y:F,phase:k})=>{L.position.y=F+Math.sin(C*.065+k)*.055}),A.uTime.value=C,A.uAge.value=(E==null?void 0:E.age)??20,E&&A.uPulse.value.copy(E.position))},setAspect(C){const E=C<.8;for(const L of d){const F=L.group.userData.nearPosition;F&&(L.group.position.x=F.x*(E?.4:1))}for(const L of _)L.object.position.x=L.x*(E?.58:1)},setReflectionSize(C){P.getRenderTarget().setSize(C,C)},dispose(){O||(O=!0,d.forEach(C=>C.dispose()),m.forEach(C=>C.dispose()),p.forEach(C=>C.dispose()),t.dispose(),P.dispose(),r.clear())}}}function s2(r,t,i,s=1){const l=Math.max(1,r*t);return Math.min(Math.max(.5,i),2,Math.sqrt(36e5/l))*s}class T_{constructor(t){this.options=t,this.scene=new kM,this.camera=new mi(52,1,.1,300),this.sky=null,this.garden=null,this.lightSeeds=null,this.seedLocations=[],this.pointUniforms=null,this.pulseLight=new Wv("#accfd0",0,4,2),this.pulse=null,this.pulseCount=0,this.lastPulse=-10,this.time=0,this.frame=0,this.running=!1,this.disposed=!1,this.ready=!1,this.raf=0,this.lastFrame=0,this.width=1,this.height=1,this.dpr=1,this.quality=1,this.slowFor=0,this.fastFor=0,this.ray=new C1,this.look=new D3({yaw:.105,pitch:.06},{follow:.7,settle:3.2}),this.originalQuaternion=new fs,this.tick=i=>{var l,c;if(!this.running||this.disposed)return;const s=this.lastFrame?(i-this.lastFrame)/1e3:0;this.lastFrame=i,this.renderFrame(s),s>.034&&s<.5?(this.slowFor+=s,this.fastFor=0):s>0&&s<.022&&(this.fastFor+=s,this.slowFor=Math.max(0,this.slowFor-s)),this.slowFor>8&&this.quality>.8&&(this.quality=.8,this.slowFor=0,(l=this.garden)==null||l.setReflectionSize(768),this.setSize(this.width,this.height,this.dpr)),this.fastFor>24&&this.quality<1&&(this.quality=1,this.fastFor=0,(c=this.garden)==null||c.setReflectionSize(1024),this.setSize(this.width,this.height,this.dpr)),this.raf=requestAnimationFrame(this.tick)},this.renderer=new w3({canvas:t.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=ei,this.renderer.toneMapping=jd,this.renderer.toneMappingExposure=1.12,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=w_,this.renderer.shadowMap.autoUpdate=!1,this.renderer.setClearColor("#101a2b"),this.camera.position.set(0,1.65,5.8),this.camera.lookAt(0,2,-20),this.originalQuaternion.copy(this.camera.quaternion),this.onLost=i=>{i.preventDefault(),this.disposed||this.options.onContextLost()},t.canvas.addEventListener("webglcontextlost",this.onLost),t.canvas.dataset.renderer="three-webgl2"}static isSupported(){return typeof window<"u"&&typeof WebGL2RenderingContext<"u"}async init(){if(this.disposed)return;this.sky=H3(),this.garden=a2(),this.scene.add(this.sky.group,this.garden.group),this.garden.setAspect(this.width/this.height),this.sky.group.rotation.y=this.width/this.height<.8?.18:0;const t=new b1("#b9d6e1","#394147",2.05);this.scene.add(t),this.scene.fog=new up("#344b5b",.009);const i=new qv("#ffddb0",3.5);i.position.set(-7,12,8),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),i.shadow.camera.left=-14,i.shadow.camera.right=14,i.shadow.camera.top=15,i.shadow.camera.bottom=-14,i.shadow.camera.near=.5,i.shadow.camera.far=60,i.shadow.normalBias=.06,i.shadow.bias=-2e-4,this.scene.add(i);const s=new qv("#88d9e8",1.8);s.position.set(6,5,-12),this.scene.add(s);const l=new Wv("#e7c896",20,10,2);l.position.set(-3,2.8,.3),this.scene.add(l,this.pulseLight),this.buildSeeds(),this.scene.updateMatrixWorld(!0),this.renderer.shadowMap.needsUpdate=!0,await this.renderer.compileAsync(this.scene,this.camera),!this.disposed&&(this.ready=!0,this.renderFrame(0))}buildSeeds(){const t=Sp(312),i=[],s=[],l=[];for(let p=0;p<70;p++){const m=new H((t()-.5)*13,.45+t()*5,2-t()*19);this.seedLocations.push(m),i.push(m.x,m.y,m.z),s.push(t()*Math.PI*2),l.push(13+t()*17)}this.seedLocations[0].set(.65,1.15,-1.2),i.splice(0,3,.65,1.15,-1.2);const c=new xn;c.setAttribute("position",new we(i,3)),c.setAttribute("aPhase",new we(s,1)),c.setAttribute("aSize",new we(l,1)),this.pointUniforms={uTime:{value:0},uDpr:{value:1},uPulse:{value:new H(0,0,0)},uAge:{value:20}};const f=new _n({uniforms:this.pointUniforms,transparent:!0,depthWrite:!1,blending:Fr,vertexShader:`attribute float aPhase;attribute float aSize;uniform float uTime;uniform float uDpr;uniform vec3 uPulse;uniform float uAge;varying float vGlow;
      void main(){vec3 p=position;p.x+=sin(uTime*.07+aPhase)*.1;p.y+=sin(uTime*.11+aPhase)*.065;
      float influence=exp(-distance(p,uPulse)*1.4)*sin(clamp(uAge/8.,0.,1.)*3.14159);
      vGlow=.45+influence*.4;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(aSize*uDpr*4./-mv.z,2.,21.*uDpr);gl_Position=projectionMatrix*mv;}`,fragmentShader:`varying float vGlow;void main(){float d=length(gl_PointCoord-.5);float a=(exp(-d*d*40.)*.8+exp(-d*d*9.)*.16)*(1.-smoothstep(.3,.5,d));gl_FragColor=vec4(vec3(.61,.85,.82),a*vGlow);#include <tonemapping_fragment>
#include <colorspace_fragment>}`.replace(";#include",`;
#include`)});this.lightSeeds=new J_(c,f),this.lightSeeds.name="cosmic-near-light-seeds",this.scene.add(this.lightSeeds)}setSize(t,i,s){var l;this.disposed||(this.width=Math.max(1,t),this.height=Math.max(1,i),this.dpr=s,this.renderer.setPixelRatio(s2(this.width,this.height,s,this.quality)),this.renderer.setSize(this.width,this.height,!1),this.camera.aspect=this.width/this.height,(l=this.garden)==null||l.setAspect(this.camera.aspect),this.sky&&(this.sky.group.rotation.y=this.camera.aspect<.8?.18:0),this.renderer.shadowMap.needsUpdate=!0,this.camera.fov=this.camera.aspect<.8?63:52,this.camera.position.set(0,1.65,5.8),this.camera.lookAt(this.camera.aspect<.8?1:0,this.camera.aspect<.8?3.4:2,-20),this.originalQuaternion.copy(this.camera.quaternion),this.camera.updateProjectionMatrix(),this.pointUniforms&&(this.pointUniforms.uDpr.value=this.renderer.getPixelRatio()),this.options.canvas.dataset.dpr=this.renderer.getPixelRatio().toFixed(3))}renderFrame(t){var c,f,p;if(this.disposed||!this.ready)return;const i=Math.min(Math.max(t,0),.05);this.time+=i,this.frame++,this.look.update(i),this.camera.quaternion.copy(this.originalQuaternion),this.camera.rotateY(this.look.yaw),this.camera.rotateX(this.look.pitch),this.pulse&&(this.pulse.age+=i);const s=this.pulse?Math.sin(Math.min(1,this.pulse.age/8)*Math.PI):0;this.pulseLight.intensity=s*.5,this.pulse&&this.pulse.age>=8&&(this.pulse=null),(c=this.sky)==null||c.update(this.time),(f=this.garden)==null||f.update(this.time,this.pulse),this.pointUniforms&&(this.pointUniforms.uTime.value=this.time,this.pointUniforms.uAge.value=((p=this.pulse)==null?void 0:p.age)??20,this.pulse&&this.pointUniforms.uPulse.value.copy(this.pulse.position)),this.renderer.render(this.scene,this.camera);const l=this.options.canvas.dataset;l.frame=String(this.frame),l.time=this.time.toFixed(4),l.yaw=this.look.yaw.toFixed(5),l.pitch=this.look.pitch.toFixed(5),l.pulses=String(this.pulseCount),l.drawCalls=String(this.renderer.info.render.calls),l.triangles=String(this.renderer.info.render.triangles)}start(){this.running||this.disposed||!this.ready||(this.running=!0,this.lastFrame=0,this.options.canvas.dataset.running="true",this.raf=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.raf),this.raf=0,this.lastFrame=0,this.look.release(),this.options.canvas.dataset.running="false"}drag(t,i){this.running&&this.look.drag(t,i)}releaseDrag(){this.look.release()}touch(t,i){if(!this.running||!this.garden||this.time-this.lastPulse<1.2)return null;this.ray.setFromCamera(new Qt(t,i),this.camera);const s=this.ray.intersectObjects(this.garden.interactables,!1).find(c=>c.distance<18);if(s)return this.emitPulse(s.point,s.object===this.garden.water?"water":"plant");const l=this.seedLocations.find(c=>this.ray.ray.distanceToPoint(c)<.4&&this.ray.ray.direction.dot(c.clone().sub(this.camera.position))>0);return l?this.emitPulse(l,"light"):null}touchNearest(){return this.running?this.emitPulse(this.seedLocations[0],"light"):null}soundEvent(){this.running&&this.time-this.lastPulse>12&&this.emitPulse(this.seedLocations[0],"light")}emitPulse(t,i){return this.time-this.lastPulse<1.2?null:(this.lastPulse=this.time,this.pulse={position:t.clone(),age:0},this.pulseCount++,this.pulseLight.position.copy(t).add(new H(0,.2,0)),{kind:i,position:[t.x,t.y,t.z],strength:.35})}dispose(){var t,i;this.disposed||(this.stop(),this.disposed=!0,this.ready=!1,this.options.canvas.removeEventListener("webglcontextlost",this.onLost),(t=this.garden)==null||t.dispose(),(i=this.sky)==null||i.dispose(),this.garden=null,this.sky=null,this.lightSeeds&&(this.lightSeeds.geometry.dispose(),this.lightSeeds.material.dispose(),this.lightSeeds=null),this.scene.traverse(s=>{var l;s instanceof cu&&"shadow"in s&&((l=s.shadow)==null||l.dispose())}),this.scene.clear(),this.renderer.renderLists.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.options.canvas.dataset.disposed="true")}}class r2 extends Dy{constructor(){super({canvasClass:"cosmic-world-canvas",isSupported:()=>T_.isSupported(),create:(t,i)=>new T_({canvas:t,onContextLost:i})})}touch(t,i,s){var l;return this.top===t&&t.running?((l=this.engine)==null?void 0:l.touch(i,s))??null:null}touchNearest(t){var i;return this.top===t&&t.running?((i=this.engine)==null?void 0:i.touchNearest())??null:null}soundEvent(t){var i;this.top===t&&t.running&&((i=this.engine)==null||i.soundEvent())}}const Or=new r2;function A_({active:r,onInteract:t,subscribeEvents:i}){const s=Mn.useRef(null),l=Mn.useRef(null),c=Mn.useRef(null),f=Mn.useRef(t);f.current=t;const[p,m]=Mn.useState("loading"),[d,v]=Mn.useState(!0),_=Ry(r&&d);Mn.useEffect(()=>{const x=s.current;if(!x||typeof IntersectionObserver>"u")return;const b=new IntersectionObserver(R=>v(R.some(M=>M.isIntersecting)),{threshold:0});return b.observe(x),()=>b.disconnect()},[]),Mn.useEffect(()=>{if(!l.current)return;const x={mount:l.current,running:!1,onStatus:m};c.current=x;const b=Or.acquire(x);return()=>{c.current=null,b()}},[]),Mn.useEffect(()=>{c.current&&Or.setRunning(c.current,_)},[_,p]),Cy(Or,s,c,_),Mn.useEffect(()=>{const x=s.current;if(!x||!_)return;let b=null;const R=P=>{P.isPrimary&&P.button===0&&P.target instanceof HTMLCanvasElement&&(b={x:P.clientX,y:P.clientY,id:P.pointerId,moved:!1})},M=P=>{b&&P.pointerId===b.id&&Math.hypot(P.clientX-b.x,P.clientY-b.y)>8&&(b.moved=!0)},S=P=>{var C;const A=b;if(!A||A.id!==P.pointerId||(b=null,A.moved||Math.hypot(P.clientX-A.x,P.clientY-A.y)>8||!c.current))return;const N=x.getBoundingClientRect(),O=Or.touch(c.current,(P.clientX-N.left)/N.width*2-1,1-(P.clientY-N.top)/N.height*2);O&&((C=f.current)==null||C.call(f,O))},U=()=>{b=null};return x.addEventListener("pointerdown",R),window.addEventListener("pointermove",M),window.addEventListener("pointerup",S),window.addEventListener("pointercancel",U),()=>{x.removeEventListener("pointerdown",R),window.removeEventListener("pointermove",M),window.removeEventListener("pointerup",S),window.removeEventListener("pointercancel",U)}},[_]),Mn.useEffect(()=>{if(!(!_||!i))return i(x=>{(x==="bowl"||x==="chimes")&&c.current&&Or.soundEvent(c.current)})},[_,i]);const g=()=>{var b;if(!c.current)return;const x=Or.touchNearest(c.current);x&&((b=f.current)==null||b.call(f,x))};return vn.jsxs("div",{ref:s,className:"cosmic-world","data-state":p,"data-motion":_?"running":"paused","aria-label":"우주 공중정원 — 잎과 물, 행성이 있는 고요한 공간",children:[vn.jsx("div",{className:"cosmic-world-fallback","aria-hidden":"true"}),vn.jsx("div",{className:"cosmic-world-mount",ref:l}),p==="ready"&&_?vn.jsx("button",{className:"cosmic-world-access",onPointerDownCapture:x=>x.stopPropagation(),onClick:g,children:"가까운 빛에 손길 보내기"}):null,p==="loading"?vn.jsx("span",{className:"cosmic-world-status",role:"status",children:"공중정원을 준비하고 있어요"}):null,p==="failed"?vn.jsx("span",{className:"cosmic-world-status",role:"status",children:"이 환경에서는 공중정원의 3D 화면을 표시할 수 없어요."}):null]})}const rd=new Set;function o2(){const[r,t]=Mn.useState(!new URLSearchParams(location.search).has("still")),[i,s]=Mn.useState(!0),[l,c]=Mn.useState(!1),[f,p]=Mn.useState(0),m=new URLSearchParams(location.search).has("clean");return vn.jsxs("main",{children:[vn.jsx("section",{className:"garden-stage","data-scene-surface":!0,children:i&&vn.jsx(A_,{active:r,onInteract:()=>p(d=>d+1),subscribeEvents:d=>(rd.add(d),()=>{rd.delete(d)})})}),l&&vn.jsx("section",{className:"garden-second","data-scene-surface":!0,children:vn.jsx(A_,{active:r})}),!m&&vn.jsxs("nav",{"aria-label":"Validation controls",children:[vn.jsx("span",{children:"공중정원 · 우주 명상"}),vn.jsx("button",{onClick:()=>t(d=>!d),children:r?"Pause":"Resume"}),vn.jsx("button",{onClick:()=>{s(d=>!d),c(!1)},children:i?"Unmount":"Mount"}),vn.jsx("button",{onClick:()=>c(d=>!d),children:"Second holder"}),vn.jsx("button",{onClick:()=>rd.forEach(d=>d("bowl")),children:"Bowl event"}),vn.jsx("output",{"data-testid":"interaction-count",children:f})]})]})}wy.createRoot(document.getElementById("root")).render(vn.jsx(Sy.StrictMode,{children:vn.jsx(o2,{})}));
