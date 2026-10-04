(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();const xy="modulepreload",Sy=function(r,t){return new URL(r,t).href},av={},yy=function(t,i,a){let l=Promise.resolve();if(i&&i.length>0){let f=function(g){return Promise.all(g.map(_=>Promise.resolve(_).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};const d=document.getElementsByTagName("link"),m=document.querySelector("meta[property=csp-nonce]"),p=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));l=f(i.map(g=>{if(g=Sy(g,a),g in av)return;av[g]=!0;const _=g.endsWith(".css"),v=_?'[rel="stylesheet"]':"";if(!!a)for(let w=d.length-1;w>=0;w--){const M=d[w];if(M.href===g&&(!_||M.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${g}"]${v}`))return;const E=document.createElement("link");if(E.rel=_?"stylesheet":xy,_||(E.as="script"),E.crossOrigin="",E.href=g,p&&E.setAttribute("nonce",p),document.head.appendChild(E),_)return new Promise((w,M)=>{E.addEventListener("load",w),E.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${g}`)))})}))}function c(f){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=f,window.dispatchEvent(d),!d.defaultPrevented)throw f}return l.then(f=>{for(const d of f||[])d.status==="rejected"&&c(d.reason);return t().catch(c)})};function My(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var xh={exports:{}},Go={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sv;function Ey(){if(sv)return Go;sv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(a,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:a,key:f,ref:l!==void 0?l:null,props:c}}return Go.Fragment=t,Go.jsx=i,Go.jsxs=i,Go}var rv;function by(){return rv||(rv=1,xh.exports=Ey()),xh.exports}var vn=by(),Sh={exports:{}},se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ov;function Ty(){if(ov)return se;ov=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function x(z){return z===null||typeof z!="object"?null:(z=v&&z[v]||z["@@iterator"],typeof z=="function"?z:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,M={};function S(z,tt,gt){this.props=z,this.context=tt,this.refs=M,this.updater=gt||E}S.prototype.isReactComponent={},S.prototype.setState=function(z,tt){if(typeof z!="object"&&typeof z!="function"&&z!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,z,tt,"setState")},S.prototype.forceUpdate=function(z){this.updater.enqueueForceUpdate(this,z,"forceUpdate")};function L(){}L.prototype=S.prototype;function P(z,tt,gt){this.props=z,this.context=tt,this.refs=M,this.updater=gt||E}var A=P.prototype=new L;A.constructor=P,w(A,S.prototype),A.isPureReactComponent=!0;var O=Array.isArray;function N(){}var D={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function C(z,tt,gt){var Et=gt.ref;return{$$typeof:r,type:z,key:tt,ref:Et!==void 0?Et:null,props:gt}}function F(z,tt){return C(z.type,tt,z.props)}function k(z){return typeof z=="object"&&z!==null&&z.$$typeof===r}function G(z){var tt={"=":"=0",":":"=2"};return"$"+z.replace(/[=:]/g,function(gt){return tt[gt]})}var J=/\/+/g;function X(z,tt){return typeof z=="object"&&z!==null&&z.key!=null?G(""+z.key):tt.toString(36)}function $(z){switch(z.status){case"fulfilled":return z.value;case"rejected":throw z.reason;default:switch(typeof z.status=="string"?z.then(N,N):(z.status="pending",z.then(function(tt){z.status==="pending"&&(z.status="fulfilled",z.value=tt)},function(tt){z.status==="pending"&&(z.status="rejected",z.reason=tt)})),z.status){case"fulfilled":return z.value;case"rejected":throw z.reason}}throw z}function B(z,tt,gt,Et,Lt){var kt=typeof z;(kt==="undefined"||kt==="boolean")&&(z=null);var st=!1;if(z===null)st=!0;else switch(kt){case"bigint":case"string":case"number":st=!0;break;case"object":switch(z.$$typeof){case r:case t:st=!0;break;case g:return st=z._init,B(st(z._payload),tt,gt,Et,Lt)}}if(st)return Lt=Lt(z),st=Et===""?"."+X(z,0):Et,O(Lt)?(gt="",st!=null&&(gt=st.replace(J,"$&/")+"/"),B(Lt,tt,gt,"",function(te){return te})):Lt!=null&&(k(Lt)&&(Lt=F(Lt,gt+(Lt.key==null||z&&z.key===Lt.key?"":(""+Lt.key).replace(J,"$&/")+"/")+st)),tt.push(Lt)),1;st=0;var vt=Et===""?".":Et+":";if(O(z))for(var Tt=0;Tt<z.length;Tt++)Et=z[Tt],kt=vt+X(Et,Tt),st+=B(Et,tt,gt,kt,Lt);else if(Tt=x(z),typeof Tt=="function")for(z=Tt.call(z),Tt=0;!(Et=z.next()).done;)Et=Et.value,kt=vt+X(Et,Tt++),st+=B(Et,tt,gt,kt,Lt);else if(kt==="object"){if(typeof z.then=="function")return B($(z),tt,gt,Et,Lt);throw tt=String(z),Error("Objects are not valid as a React child (found: "+(tt==="[object Object]"?"object with keys {"+Object.keys(z).join(", ")+"}":tt)+"). If you meant to render a collection of children, use an array instead.")}return st}function W(z,tt,gt){if(z==null)return z;var Et=[],Lt=0;return B(z,Et,"","",function(kt){return tt.call(gt,kt,Lt++)}),Et}function ot(z){if(z._status===-1){var tt=z._result;tt=tt(),tt.then(function(gt){(z._status===0||z._status===-1)&&(z._status=1,z._result=gt)},function(gt){(z._status===0||z._status===-1)&&(z._status=2,z._result=gt)}),z._status===-1&&(z._status=0,z._result=tt)}if(z._status===1)return z._result.default;throw z._result}var et=typeof reportError=="function"?reportError:function(z){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var tt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof z=="object"&&z!==null&&typeof z.message=="string"?String(z.message):String(z),error:z});if(!window.dispatchEvent(tt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",z);return}console.error(z)},ft={map:W,forEach:function(z,tt,gt){W(z,function(){tt.apply(this,arguments)},gt)},count:function(z){var tt=0;return W(z,function(){tt++}),tt},toArray:function(z){return W(z,function(tt){return tt})||[]},only:function(z){if(!k(z))throw Error("React.Children.only expected to receive a single React element child.");return z}};return se.Activity=_,se.Children=ft,se.Component=S,se.Fragment=i,se.Profiler=l,se.PureComponent=P,se.StrictMode=a,se.Suspense=m,se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=D,se.__COMPILER_RUNTIME={__proto__:null,c:function(z){return D.H.useMemoCache(z)}},se.cache=function(z){return function(){return z.apply(null,arguments)}},se.cacheSignal=function(){return null},se.cloneElement=function(z,tt,gt){if(z==null)throw Error("The argument must be a React element, but you passed "+z+".");var Et=w({},z.props),Lt=z.key;if(tt!=null)for(kt in tt.key!==void 0&&(Lt=""+tt.key),tt)!b.call(tt,kt)||kt==="key"||kt==="__self"||kt==="__source"||kt==="ref"&&tt.ref===void 0||(Et[kt]=tt[kt]);var kt=arguments.length-2;if(kt===1)Et.children=gt;else if(1<kt){for(var st=Array(kt),vt=0;vt<kt;vt++)st[vt]=arguments[vt+2];Et.children=st}return C(z.type,Lt,Et)},se.createContext=function(z){return z={$$typeof:f,_currentValue:z,_currentValue2:z,_threadCount:0,Provider:null,Consumer:null},z.Provider=z,z.Consumer={$$typeof:c,_context:z},z},se.createElement=function(z,tt,gt){var Et,Lt={},kt=null;if(tt!=null)for(Et in tt.key!==void 0&&(kt=""+tt.key),tt)b.call(tt,Et)&&Et!=="key"&&Et!=="__self"&&Et!=="__source"&&(Lt[Et]=tt[Et]);var st=arguments.length-2;if(st===1)Lt.children=gt;else if(1<st){for(var vt=Array(st),Tt=0;Tt<st;Tt++)vt[Tt]=arguments[Tt+2];Lt.children=vt}if(z&&z.defaultProps)for(Et in st=z.defaultProps,st)Lt[Et]===void 0&&(Lt[Et]=st[Et]);return C(z,kt,Lt)},se.createRef=function(){return{current:null}},se.forwardRef=function(z){return{$$typeof:d,render:z}},se.isValidElement=k,se.lazy=function(z){return{$$typeof:g,_payload:{_status:-1,_result:z},_init:ot}},se.memo=function(z,tt){return{$$typeof:p,type:z,compare:tt===void 0?null:tt}},se.startTransition=function(z){var tt=D.T,gt={};D.T=gt;try{var Et=z(),Lt=D.S;Lt!==null&&Lt(gt,Et),typeof Et=="object"&&Et!==null&&typeof Et.then=="function"&&Et.then(N,et)}catch(kt){et(kt)}finally{tt!==null&&gt.types!==null&&(tt.types=gt.types),D.T=tt}},se.unstable_useCacheRefresh=function(){return D.H.useCacheRefresh()},se.use=function(z){return D.H.use(z)},se.useActionState=function(z,tt,gt){return D.H.useActionState(z,tt,gt)},se.useCallback=function(z,tt){return D.H.useCallback(z,tt)},se.useContext=function(z){return D.H.useContext(z)},se.useDebugValue=function(){},se.useDeferredValue=function(z,tt){return D.H.useDeferredValue(z,tt)},se.useEffect=function(z,tt){return D.H.useEffect(z,tt)},se.useEffectEvent=function(z){return D.H.useEffectEvent(z)},se.useId=function(){return D.H.useId()},se.useImperativeHandle=function(z,tt,gt){return D.H.useImperativeHandle(z,tt,gt)},se.useInsertionEffect=function(z,tt){return D.H.useInsertionEffect(z,tt)},se.useLayoutEffect=function(z,tt){return D.H.useLayoutEffect(z,tt)},se.useMemo=function(z,tt){return D.H.useMemo(z,tt)},se.useOptimistic=function(z,tt){return D.H.useOptimistic(z,tt)},se.useReducer=function(z,tt,gt){return D.H.useReducer(z,tt,gt)},se.useRef=function(z){return D.H.useRef(z)},se.useState=function(z){return D.H.useState(z)},se.useSyncExternalStore=function(z,tt,gt){return D.H.useSyncExternalStore(z,tt,gt)},se.useTransition=function(){return D.H.useTransition()},se.version="19.2.7",se}var lv;function Qd(){return lv||(lv=1,Sh.exports=Ty()),Sh.exports}var Mn=Qd();const Ay=My(Mn);var yh={exports:{}},Vo={},Mh={exports:{}},Eh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cv;function Ry(){return cv||(cv=1,(function(r){function t(B,W){var ot=B.length;B.push(W);t:for(;0<ot;){var et=ot-1>>>1,ft=B[et];if(0<l(ft,W))B[et]=W,B[ot]=ft,ot=et;else break t}}function i(B){return B.length===0?null:B[0]}function a(B){if(B.length===0)return null;var W=B[0],ot=B.pop();if(ot!==W){B[0]=ot;t:for(var et=0,ft=B.length,z=ft>>>1;et<z;){var tt=2*(et+1)-1,gt=B[tt],Et=tt+1,Lt=B[Et];if(0>l(gt,ot))Et<ft&&0>l(Lt,gt)?(B[et]=Lt,B[Et]=ot,et=Et):(B[et]=gt,B[tt]=ot,et=tt);else if(Et<ft&&0>l(Lt,ot))B[et]=Lt,B[Et]=ot,et=Et;else break t}}return W}function l(B,W){var ot=B.sortIndex-W.sortIndex;return ot!==0?ot:B.id-W.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,d=f.now();r.unstable_now=function(){return f.now()-d}}var m=[],p=[],g=1,_=null,v=3,x=!1,E=!1,w=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;function A(B){for(var W=i(p);W!==null;){if(W.callback===null)a(p);else if(W.startTime<=B)a(p),W.sortIndex=W.expirationTime,t(m,W);else break;W=i(p)}}function O(B){if(w=!1,A(B),!E)if(i(m)!==null)E=!0,N||(N=!0,G());else{var W=i(p);W!==null&&$(O,W.startTime-B)}}var N=!1,D=-1,b=5,C=-1;function F(){return M?!0:!(r.unstable_now()-C<b)}function k(){if(M=!1,N){var B=r.unstable_now();C=B;var W=!0;try{t:{E=!1,w&&(w=!1,L(D),D=-1),x=!0;var ot=v;try{e:{for(A(B),_=i(m);_!==null&&!(_.expirationTime>B&&F());){var et=_.callback;if(typeof et=="function"){_.callback=null,v=_.priorityLevel;var ft=et(_.expirationTime<=B);if(B=r.unstable_now(),typeof ft=="function"){_.callback=ft,A(B),W=!0;break e}_===i(m)&&a(m),A(B)}else a(m);_=i(m)}if(_!==null)W=!0;else{var z=i(p);z!==null&&$(O,z.startTime-B),W=!1}}break t}finally{_=null,v=ot,x=!1}W=void 0}}finally{W?G():N=!1}}}var G;if(typeof P=="function")G=function(){P(k)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,X=J.port2;J.port1.onmessage=k,G=function(){X.postMessage(null)}}else G=function(){S(k,0)};function $(B,W){D=S(function(){B(r.unstable_now())},W)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return v},r.unstable_next=function(B){switch(v){case 1:case 2:case 3:var W=3;break;default:W=v}var ot=v;v=W;try{return B()}finally{v=ot}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(B,W){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var ot=v;v=B;try{return W()}finally{v=ot}},r.unstable_scheduleCallback=function(B,W,ot){var et=r.unstable_now();switch(typeof ot=="object"&&ot!==null?(ot=ot.delay,ot=typeof ot=="number"&&0<ot?et+ot:et):ot=et,B){case 1:var ft=-1;break;case 2:ft=250;break;case 5:ft=1073741823;break;case 4:ft=1e4;break;default:ft=5e3}return ft=ot+ft,B={id:g++,callback:W,priorityLevel:B,startTime:ot,expirationTime:ft,sortIndex:-1},ot>et?(B.sortIndex=ot,t(p,B),i(m)===null&&B===i(p)&&(w?(L(D),D=-1):w=!0,$(O,ot-et))):(B.sortIndex=ft,t(m,B),E||x||(E=!0,N||(N=!0,G()))),B},r.unstable_shouldYield=F,r.unstable_wrapCallback=function(B){var W=v;return function(){var ot=v;v=W;try{return B.apply(this,arguments)}finally{v=ot}}}})(Eh)),Eh}var uv;function wy(){return uv||(uv=1,Mh.exports=Ry()),Mh.exports}var bh={exports:{}},zn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fv;function Cy(){if(fv)return zn;fv=1;var r=Qd();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var a={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,zn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},zn.flushSync=function(m){var p=f.T,g=a.p;try{if(f.T=null,a.p=2,m)return m()}finally{f.T=p,a.p=g,a.d.f()}},zn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(m,p))},zn.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},zn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,x=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?a.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:x}):g==="script"&&a.d.X(m,{crossOrigin:_,integrity:v,fetchPriority:x,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},zn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);a.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(m)},zn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin);a.d.L(m,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},zn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);a.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(m)},zn.requestFormReset=function(m){a.d.r(m)},zn.unstable_batchedUpdates=function(m,p){return m(p)},zn.useFormState=function(m,p,g){return f.H.useFormState(m,p,g)},zn.useFormStatus=function(){return f.H.useHostTransitionStatus()},zn.version="19.2.7",zn}var hv;function Dy(){if(hv)return bh.exports;hv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),bh.exports=Cy(),bh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dv;function Uy(){if(dv)return Vo;dv=1;var r=wy(),t=Qd(),i=Dy();function a(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)n+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,s=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(s=n.return),e=n.return;while(e)}return n.tag===3?s:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(a(188))}function p(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(a(188));return n!==e?null:e}for(var s=e,o=n;;){var u=s.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){s=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===s)return m(u),e;if(h===o)return m(u),n;h=h.sibling}throw Error(a(188))}if(s.return!==o.return)s=u,o=h;else{for(var y=!1,U=u.child;U;){if(U===s){y=!0,s=u,o=h;break}if(U===o){y=!0,o=u,s=h;break}U=U.sibling}if(!y){for(U=h.child;U;){if(U===s){y=!0,s=h,o=u;break}if(U===o){y=!0,o=h,s=u;break}U=U.sibling}if(!y)throw Error(a(189))}}if(s.alternate!==o)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),P=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),D=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function G(e){return e===null||typeof e!="object"?null:(e=k&&e[k]||e["@@iterator"],typeof e=="function"?e:null)}var J=Symbol.for("react.client.reference");function X(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===J?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case O:return"Suspense";case N:return"SuspenseList";case C:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case P:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case A:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case D:return n=e.displayName||null,n!==null?n:X(e.type)||"Memo";case b:n=e._payload,e=e._init;try{return X(e(n))}catch{}}return null}var $=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ot={pending:!1,data:null,method:null,action:null},et=[],ft=-1;function z(e){return{current:e}}function tt(e){0>ft||(e.current=et[ft],et[ft]=null,ft--)}function gt(e,n){ft++,et[ft]=e.current,e.current=n}var Et=z(null),Lt=z(null),kt=z(null),st=z(null);function vt(e,n){switch(gt(kt,n),gt(Lt,e),gt(Et,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Rg(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Rg(n),e=wg(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}tt(Et),gt(Et,e)}function Tt(){tt(Et),tt(Lt),tt(kt)}function te(e){e.memoizedState!==null&&gt(st,e);var n=Et.current,s=wg(n,e.type);n!==s&&(gt(Lt,e),gt(Et,s))}function Ft(e){Lt.current===e&&(tt(Et),tt(Lt)),st.current===e&&(tt(st),Bo._currentValue=ot)}var le,en;function ae(e){if(le===void 0)try{throw Error()}catch(s){var n=s.stack.trim().match(/\n( *(at )?)/);le=n&&n[1]||"",en=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+le+e+en}var xe=!1;function Ne(e,n){if(!e||xe)return"";xe=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var yt=function(){throw Error()};if(Object.defineProperty(yt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(yt,[])}catch(ht){var ct=ht}Reflect.construct(e,[],yt)}else{try{yt.call()}catch(ht){ct=ht}e.call(yt.prototype)}}else{try{throw Error()}catch(ht){ct=ht}(yt=e())&&typeof yt.catch=="function"&&yt.catch(function(){})}}catch(ht){if(ht&&ct&&typeof ht.stack=="string")return[ht.stack,ct.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),y=h[0],U=h[1];if(y&&U){var V=y.split(`
`),rt=U.split(`
`);for(u=o=0;o<V.length&&!V[o].includes("DetermineComponentFrameRoot");)o++;for(;u<rt.length&&!rt[u].includes("DetermineComponentFrameRoot");)u++;if(o===V.length||u===rt.length)for(o=V.length-1,u=rt.length-1;1<=o&&0<=u&&V[o]!==rt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(V[o]!==rt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||V[o]!==rt[u]){var _t=`
`+V[o].replace(" at new "," at ");return e.displayName&&_t.includes("<anonymous>")&&(_t=_t.replace("<anonymous>",e.displayName)),_t}while(1<=o&&0<=u);break}}}finally{xe=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?ae(s):""}function ge(e,n){switch(e.tag){case 26:case 27:case 5:return ae(e.type);case 16:return ae("Lazy");case 13:return e.child!==n&&n!==null?ae("Suspense Fallback"):ae("Suspense");case 19:return ae("SuspenseList");case 0:case 15:return Ne(e.type,!1);case 11:return Ne(e.type.render,!1);case 1:return Ne(e.type,!0);case 31:return ae("Activity");default:return""}}function Xe(e){try{var n="",s=null;do n+=ge(e,s),s=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var nn=Object.prototype.hasOwnProperty,An=r.unstable_scheduleCallback,We=r.unstable_cancelCallback,an=r.unstable_shouldYield,K=r.unstable_requestPaint,Oe=r.unstable_now,De=r.unstable_getCurrentPriorityLevel,I=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,j=r.unstable_NormalPriority,lt=r.unstable_LowPriority,dt=r.unstable_IdlePriority,bt=r.log,Ct=r.unstable_setDisableYieldValue,pt=null,mt=null;function At(e){if(typeof bt=="function"&&Ct(e),mt&&typeof mt.setStrictMode=="function")try{mt.setStrictMode(pt,e)}catch{}}var Ht=Math.clz32?Math.clz32:Kt,Nt=Math.log,Dt=Math.LN2;function Kt(e){return e>>>=0,e===0?32:31-(Nt(e)/Dt|0)|0}var Jt=256,ie=262144,Z=4194304;function Rt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function xt(e,n,s){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var U=o&134217727;return U!==0?(o=U&~h,o!==0?u=Rt(o):(y&=U,y!==0?u=Rt(y):s||(s=U&~e,s!==0&&(u=Rt(s))))):(U=o&~h,U!==0?u=Rt(U):y!==0?u=Rt(y):s||(s=o&~e,s!==0&&(u=Rt(s)))),u===0?0:n!==0&&n!==u&&(n&h)===0&&(h=u&-u,s=n&-n,h>=s||h===32&&(s&4194048)!==0)?n:u}function wt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function zt(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mt(){var e=Z;return Z<<=1,(Z&62914560)===0&&(Z=4194304),e}function Zt(e){for(var n=[],s=0;31>s;s++)n.push(e);return n}function Xt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,n,s,o,u,h){var y=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var U=e.entanglements,V=e.expirationTimes,rt=e.hiddenUpdates;for(s=y&~s;0<s;){var _t=31-Ht(s),yt=1<<_t;U[_t]=0,V[_t]=-1;var ct=rt[_t];if(ct!==null)for(rt[_t]=null,_t=0;_t<ct.length;_t++){var ht=ct[_t];ht!==null&&(ht.lane&=-536870913)}s&=~yt}o!==0&&be(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(y&~n))}function be(e,n,s){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Ht(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function Zn(e,n){var s=e.entangledLanes|=n;for(e=e.entanglements;s;){var o=31-Ht(s),u=1<<o;u&n|e[o]&n&&(e[o]|=n),s&=~u}}function ri(e,n){var s=n&-n;return s=(s&42)!==0?1:Kr(s),(s&(e.suspendedLanes|n))!==0?0:s}function Kr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Qr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Jr(){var e=W.p;return e!==0?e:(e=window.event,e===void 0?32:Jg(e.type))}function ks(e,n){var s=W.p;try{return W.p=e,n()}finally{W.p=s}}var Hi=Math.random().toString(36).slice(2),cn="__reactFiber$"+Hi,Dn="__reactProps$"+Hi,Kn="__reactContainer$"+Hi,hs="__reactEvents$"+Hi,fl="__reactListeners$"+Hi,hl="__reactHandles$"+Hi,ds="__reactResources$"+Hi,Ca="__reactMarker$"+Hi;function Da(e){delete e[cn],delete e[Dn],delete e[hs],delete e[fl],delete e[hl]}function $i(e){var n=e[cn];if(n)return n;for(var s=e.parentNode;s;){if(n=s[Kn]||s[cn]){if(s=n.alternate,n.child!==null||s!==null&&s.child!==null)for(e=Pg(e);e!==null;){if(s=e[cn])return s;e=Pg(e)}return n}e=s,s=e.parentNode}return null}function ta(e){if(e=e[cn]||e[Kn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function ps(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(a(33))}function Ua(e){var n=e[ds];return n||(n=e[ds]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function un(e){e[Ca]=!0}var dl=new Set,jr={};function R(e,n){q(e,n),q(e+"Capture",n)}function q(e,n){for(jr[e]=n,e=0;e<n.length;e++)dl.add(n[e])}var ut=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nt={},it={};function Ot(e){return nn.call(it,e)?!0:nn.call(nt,e)?!1:ut.test(e)?it[e]=!0:(nt[e]=!0,!1)}function Gt(e,n,s){if(Ot(n))if(s===null)e.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+s)}}function Ut(e,n,s){if(s===null)e.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+s)}}function Bt(e,n,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(n,s,""+o)}}function It(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function oe(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function pe(e,n,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){s=""+y,h.call(this,y)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(y){s=""+y},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Wt(e){if(!e._valueTracker){var n=oe(e)?"checked":"value";e._valueTracker=pe(e,n,""+e[n])}}function Te(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var s=n.getValue(),o="";return e&&(o=oe(e)?e.checked?"true":"false":e.value),e=o,e!==s?(n.setValue(e),!0):!1}function Ke(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var qe=/[\n"\\]/g;function fe(e){return e.replace(qe,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function fn(e,n,s,o,u,h,y,U){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),n!=null?y==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+It(n)):e.value!==""+It(n)&&(e.value=""+It(n)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),n!=null?Sn(e,y,It(n)):s!=null?Sn(e,y,It(s)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),U!=null&&typeof U!="function"&&typeof U!="symbol"&&typeof U!="boolean"?e.name=""+It(U):e.removeAttribute("name")}function Vt(e,n,s,o,u,h,y,U){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||s!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){Wt(e);return}s=s!=null?""+It(s):"",n=n!=null?""+It(n):s,U||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=U?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Wt(e)}function Sn(e,n,s){n==="number"&&Ke(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function he(e,n,s,o){if(e=e.options,n){n={};for(var u=0;u<s.length;u++)n["$"+s[u]]=!0;for(s=0;s<e.length;s++)u=n.hasOwnProperty("$"+e[s].value),e[s].selected!==u&&(e[s].selected=u),u&&o&&(e[s].defaultSelected=!0)}else{for(s=""+It(s),n=null,u=0;u<e.length;u++){if(e[u].value===s){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Vn(e,n,s){if(n!=null&&(n=""+It(n),n!==e.value&&(e.value=n),s==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=s!=null?""+It(s):""}function oi(e,n,s,o){if(n==null){if(o!=null){if(s!=null)throw Error(a(92));if($(o)){if(1<o.length)throw Error(a(93));o=o[0]}s=o}s==null&&(s=""),n=s}s=It(n),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),Wt(e)}function kn(e,n){if(n){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=n;return}}e.textContent=n}var La=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ue(e,n,s){var o=n.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,s):typeof s!="number"||s===0||La.has(n)?n==="float"?e.cssFloat=s:e[n]=(""+s).trim():e[n]=s+"px"}function je(e,n,s){if(n!=null&&typeof n!="object")throw Error(a(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&s[u]!==o&&Ue(e,u,o)}else for(var h in n)n.hasOwnProperty(h)&&Ue(e,h,n[h])}function _i(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var He=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Gi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ui(e){return Gi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function xi(){}var mu=null;function gu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Xs=null,Ws=null;function Ap(e){var n=ta(e);if(n&&(e=n.stateNode)){var s=e[Dn]||null;t:switch(e=n.stateNode,n.type){case"input":if(fn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),n=s.name,s.type==="radio"&&n!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+fe(""+n)+'"][type="radio"]'),n=0;n<s.length;n++){var o=s[n];if(o!==e&&o.form===e.form){var u=o[Dn]||null;if(!u)throw Error(a(90));fn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<s.length;n++)o=s[n],o.form===e.form&&Te(o)}break t;case"textarea":Vn(e,s.value,s.defaultValue);break t;case"select":n=s.value,n!=null&&he(e,!!s.multiple,n,!1)}}}var vu=!1;function Rp(e,n,s){if(vu)return e(n,s);vu=!0;try{var o=e(n);return o}finally{if(vu=!1,(Xs!==null||Ws!==null)&&(tc(),Xs&&(n=Xs,e=Ws,Ws=Xs=null,Ap(n),e)))for(n=0;n<e.length;n++)Ap(e[n])}}function $r(e,n){var s=e.stateNode;if(s===null)return null;var o=s[Dn]||null;if(o===null)return null;s=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,n,typeof s));return s}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_u=!1;if(ea)try{var to={};Object.defineProperty(to,"passive",{get:function(){_u=!0}}),window.addEventListener("test",to,to),window.removeEventListener("test",to,to)}catch{_u=!1}var Na=null,xu=null,pl=null;function wp(){if(pl)return pl;var e,n=xu,s=n.length,o,u="value"in Na?Na.value:Na.textContent,h=u.length;for(e=0;e<s&&n[e]===u[e];e++);var y=s-e;for(o=1;o<=y&&n[s-o]===u[h-o];o++);return pl=u.slice(e,1<o?1-o:void 0)}function ml(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function gl(){return!0}function Cp(){return!1}function Qn(e){function n(s,o,u,h,y){this._reactName=s,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var U in e)e.hasOwnProperty(U)&&(s=e[U],this[U]=s?s(h):h[U]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?gl:Cp,this.isPropagationStopped=Cp,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=gl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=gl)},persist:function(){},isPersistent:gl}),n}var ms={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vl=Qn(ms),eo=_({},ms,{view:0,detail:0}),vx=Qn(eo),Su,yu,no,_l=_({},eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Eu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==no&&(no&&e.type==="mousemove"?(Su=e.screenX-no.screenX,yu=e.screenY-no.screenY):yu=Su=0,no=e),Su)},movementY:function(e){return"movementY"in e?e.movementY:yu}}),Dp=Qn(_l),_x=_({},_l,{dataTransfer:0}),xx=Qn(_x),Sx=_({},eo,{relatedTarget:0}),Mu=Qn(Sx),yx=_({},ms,{animationName:0,elapsedTime:0,pseudoElement:0}),Mx=Qn(yx),Ex=_({},ms,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),bx=Qn(Ex),Tx=_({},ms,{data:0}),Up=Qn(Tx),Ax={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Rx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},wx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cx(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=wx[e])?!!n[e]:!1}function Eu(){return Cx}var Dx=_({},eo,{key:function(e){if(e.key){var n=Ax[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=ml(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Rx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Eu,charCode:function(e){return e.type==="keypress"?ml(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ml(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ux=Qn(Dx),Lx=_({},_l,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Lp=Qn(Lx),Nx=_({},eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Eu}),Ox=Qn(Nx),Px=_({},ms,{propertyName:0,elapsedTime:0,pseudoElement:0}),zx=Qn(Px),Bx=_({},_l,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ix=Qn(Bx),Fx=_({},ms,{newState:0,oldState:0}),Hx=Qn(Fx),Gx=[9,13,27,32],bu=ea&&"CompositionEvent"in window,io=null;ea&&"documentMode"in document&&(io=document.documentMode);var Vx=ea&&"TextEvent"in window&&!io,Np=ea&&(!bu||io&&8<io&&11>=io),Op=" ",Pp=!1;function zp(e,n){switch(e){case"keyup":return Gx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qs=!1;function kx(e,n){switch(e){case"compositionend":return Bp(n);case"keypress":return n.which!==32?null:(Pp=!0,Op);case"textInput":return e=n.data,e===Op&&Pp?null:e;default:return null}}function Xx(e,n){if(qs)return e==="compositionend"||!bu&&zp(e,n)?(e=wp(),pl=xu=Na=null,qs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Np&&n.locale!=="ko"?null:n.data;default:return null}}var Wx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ip(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Wx[e.type]:n==="textarea"}function Fp(e,n,s,o){Xs?Ws?Ws.push(o):Ws=[o]:Xs=o,n=oc(n,"onChange"),0<n.length&&(s=new vl("onChange","change",null,s,o),e.push({event:s,listeners:n}))}var ao=null,so=null;function qx(e){yg(e,0)}function xl(e){var n=ps(e);if(Te(n))return e}function Hp(e,n){if(e==="change")return n}var Gp=!1;if(ea){var Tu;if(ea){var Au="oninput"in document;if(!Au){var Vp=document.createElement("div");Vp.setAttribute("oninput","return;"),Au=typeof Vp.oninput=="function"}Tu=Au}else Tu=!1;Gp=Tu&&(!document.documentMode||9<document.documentMode)}function kp(){ao&&(ao.detachEvent("onpropertychange",Xp),so=ao=null)}function Xp(e){if(e.propertyName==="value"&&xl(so)){var n=[];Fp(n,so,e,gu(e)),Rp(qx,n)}}function Yx(e,n,s){e==="focusin"?(kp(),ao=n,so=s,ao.attachEvent("onpropertychange",Xp)):e==="focusout"&&kp()}function Zx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return xl(so)}function Kx(e,n){if(e==="click")return xl(n)}function Qx(e,n){if(e==="input"||e==="change")return xl(n)}function Jx(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var li=typeof Object.is=="function"?Object.is:Jx;function ro(e,n){if(li(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var s=Object.keys(e),o=Object.keys(n);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var u=s[o];if(!nn.call(n,u)||!li(e[u],n[u]))return!1}return!0}function Wp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function qp(e,n){var s=Wp(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=n&&o>=n)return{node:s,offset:n-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=Wp(s)}}function Yp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Yp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Zp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ke(e.document);n instanceof e.HTMLIFrameElement;){try{var s=typeof n.contentWindow.location.href=="string"}catch{s=!1}if(s)e=n.contentWindow;else break;n=Ke(e.document)}return n}function Ru(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var jx=ea&&"documentMode"in document&&11>=document.documentMode,Ys=null,wu=null,oo=null,Cu=!1;function Kp(e,n,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Cu||Ys==null||Ys!==Ke(o)||(o=Ys,"selectionStart"in o&&Ru(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),oo&&ro(oo,o)||(oo=o,o=oc(wu,"onSelect"),0<o.length&&(n=new vl("onSelect","select",null,n,s),e.push({event:n,listeners:o}),n.target=Ys)))}function gs(e,n){var s={};return s[e.toLowerCase()]=n.toLowerCase(),s["Webkit"+e]="webkit"+n,s["Moz"+e]="moz"+n,s}var Zs={animationend:gs("Animation","AnimationEnd"),animationiteration:gs("Animation","AnimationIteration"),animationstart:gs("Animation","AnimationStart"),transitionrun:gs("Transition","TransitionRun"),transitionstart:gs("Transition","TransitionStart"),transitioncancel:gs("Transition","TransitionCancel"),transitionend:gs("Transition","TransitionEnd")},Du={},Qp={};ea&&(Qp=document.createElement("div").style,"AnimationEvent"in window||(delete Zs.animationend.animation,delete Zs.animationiteration.animation,delete Zs.animationstart.animation),"TransitionEvent"in window||delete Zs.transitionend.transition);function vs(e){if(Du[e])return Du[e];if(!Zs[e])return e;var n=Zs[e],s;for(s in n)if(n.hasOwnProperty(s)&&s in Qp)return Du[e]=n[s];return e}var Jp=vs("animationend"),jp=vs("animationiteration"),$p=vs("animationstart"),$x=vs("transitionrun"),tS=vs("transitionstart"),eS=vs("transitioncancel"),tm=vs("transitionend"),em=new Map,Uu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Uu.push("scrollEnd");function Li(e,n){em.set(e,n),R(n,[e])}var Sl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Si=[],Ks=0,Lu=0;function yl(){for(var e=Ks,n=Lu=Ks=0;n<e;){var s=Si[n];Si[n++]=null;var o=Si[n];Si[n++]=null;var u=Si[n];Si[n++]=null;var h=Si[n];if(Si[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}h!==0&&nm(s,u,h)}}function Ml(e,n,s,o){Si[Ks++]=e,Si[Ks++]=n,Si[Ks++]=s,Si[Ks++]=o,Lu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Nu(e,n,s,o){return Ml(e,n,s,o),El(e)}function _s(e,n){return Ml(e,null,null,n),El(e)}function nm(e,n,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var u=!1,h=e.return;h!==null;)h.childLanes|=s,o=h.alternate,o!==null&&(o.childLanes|=s),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&n!==null&&(u=31-Ht(s),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=s|536870912),h):null}function El(e){if(50<Do)throw Do=0,kf=null,Error(a(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Qs={};function nS(e,n,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ci(e,n,s,o){return new nS(e,n,s,o)}function Ou(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,n){var s=e.alternate;return s===null?(s=ci(e.tag,n,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=n,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,n=e.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function im(e,n){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,n=s.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function bl(e,n,s,o,u,h){var y=0;if(o=e,typeof e=="function")Ou(e)&&(y=1);else if(typeof e=="string")y=oy(e,s,Et.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case C:return e=ci(31,s,n,u),e.elementType=C,e.lanes=h,e;case w:return xs(s.children,u,h,n);case M:y=8,u|=24;break;case S:return e=ci(12,s,n,u|2),e.elementType=S,e.lanes=h,e;case O:return e=ci(13,s,n,u),e.elementType=O,e.lanes=h,e;case N:return e=ci(19,s,n,u),e.elementType=N,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case P:y=10;break t;case L:y=9;break t;case A:y=11;break t;case D:y=14;break t;case b:y=16,o=null;break t}y=29,s=Error(a(130,e===null?"null":typeof e,"")),o=null}return n=ci(y,s,n,u),n.elementType=e,n.type=o,n.lanes=h,n}function xs(e,n,s,o){return e=ci(7,e,o,n),e.lanes=s,e}function Pu(e,n,s){return e=ci(6,e,null,n),e.lanes=s,e}function am(e){var n=ci(18,null,null,0);return n.stateNode=e,n}function zu(e,n,s){return n=ci(4,e.children!==null?e.children:[],e.key,n),n.lanes=s,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var sm=new WeakMap;function yi(e,n){if(typeof e=="object"&&e!==null){var s=sm.get(e);return s!==void 0?s:(n={value:e,source:n,stack:Xe(n)},sm.set(e,n),n)}return{value:e,source:n,stack:Xe(n)}}var Js=[],js=0,Tl=null,lo=0,Mi=[],Ei=0,Oa=null,Vi=1,ki="";function ia(e,n){Js[js++]=lo,Js[js++]=Tl,Tl=e,lo=n}function rm(e,n,s){Mi[Ei++]=Vi,Mi[Ei++]=ki,Mi[Ei++]=Oa,Oa=e;var o=Vi;e=ki;var u=32-Ht(o)-1;o&=~(1<<u),s+=1;var h=32-Ht(n)+u;if(30<h){var y=u-u%5;h=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Vi=1<<32-Ht(n)+u|s<<u|o,ki=h+e}else Vi=1<<h|s<<u|o,ki=e}function Bu(e){e.return!==null&&(ia(e,1),rm(e,1,0))}function Iu(e){for(;e===Tl;)Tl=Js[--js],Js[js]=null,lo=Js[--js],Js[js]=null;for(;e===Oa;)Oa=Mi[--Ei],Mi[Ei]=null,ki=Mi[--Ei],Mi[Ei]=null,Vi=Mi[--Ei],Mi[Ei]=null}function om(e,n){Mi[Ei++]=Vi,Mi[Ei++]=ki,Mi[Ei++]=Oa,Vi=n.id,ki=n.overflow,Oa=e}var Un=null,Qe=null,Me=!1,Pa=null,bi=!1,Fu=Error(a(519));function za(e){var n=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw co(yi(n,e)),Fu}function lm(e){var n=e.stateNode,s=e.type,o=e.memoizedProps;switch(n[cn]=e,n[Dn]=o,s){case"dialog":_e("cancel",n),_e("close",n);break;case"iframe":case"object":case"embed":_e("load",n);break;case"video":case"audio":for(s=0;s<Lo.length;s++)_e(Lo[s],n);break;case"source":_e("error",n);break;case"img":case"image":case"link":_e("error",n),_e("load",n);break;case"details":_e("toggle",n);break;case"input":_e("invalid",n),Vt(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":_e("invalid",n);break;case"textarea":_e("invalid",n),oi(n,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||n.textContent===""+s||o.suppressHydrationWarning===!0||Tg(n.textContent,s)?(o.popover!=null&&(_e("beforetoggle",n),_e("toggle",n)),o.onScroll!=null&&_e("scroll",n),o.onScrollEnd!=null&&_e("scrollend",n),o.onClick!=null&&(n.onclick=xi),n=!0):n=!1,n||za(e,!0)}function cm(e){for(Un=e.return;Un;)switch(Un.tag){case 5:case 31:case 13:bi=!1;return;case 27:case 3:bi=!0;return;default:Un=Un.return}}function $s(e){if(e!==Un)return!1;if(!Me)return cm(e),Me=!0,!1;var n=e.tag,s;if((s=n!==3&&n!==27)&&((s=n===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||ah(e.type,e.memoizedProps)),s=!s),s&&Qe&&za(e),cm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Qe=Og(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Qe=Og(e)}else n===27?(n=Qe,Qa(e.type)?(e=ch,ch=null,Qe=e):Qe=n):Qe=Un?Ai(e.stateNode.nextSibling):null;return!0}function Ss(){Qe=Un=null,Me=!1}function Hu(){var e=Pa;return e!==null&&(ti===null?ti=e:ti.push.apply(ti,e),Pa=null),e}function co(e){Pa===null?Pa=[e]:Pa.push(e)}var Gu=z(null),ys=null,aa=null;function Ba(e,n,s){gt(Gu,n._currentValue),n._currentValue=s}function sa(e){e._currentValue=Gu.current,tt(Gu)}function Vu(e,n,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===s)break;e=e.return}}function ku(e,n,s,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var y=u.child;h=h.firstContext;t:for(;h!==null;){var U=h;h=u;for(var V=0;V<n.length;V++)if(U.context===n[V]){h.lanes|=s,U=h.alternate,U!==null&&(U.lanes|=s),Vu(h.return,s,e),o||(y=null);break t}h=U.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(a(341));y.lanes|=s,h=y.alternate,h!==null&&(h.lanes|=s),Vu(y,s,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function tr(e,n,s,o){e=null;for(var u=n,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(a(387));if(y=y.memoizedProps,y!==null){var U=u.type;li(u.pendingProps.value,y.value)||(e!==null?e.push(U):e=[U])}}else if(u===st.current){if(y=u.alternate,y===null)throw Error(a(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Bo):e=[Bo])}u=u.return}e!==null&&ku(n,e,s,o),n.flags|=262144}function Al(e){for(e=e.firstContext;e!==null;){if(!li(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ms(e){ys=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ln(e){return um(ys,e)}function Rl(e,n){return ys===null&&Ms(e),um(e,n)}function um(e,n){var s=n._currentValue;if(n={context:n,memoizedValue:s,next:null},aa===null){if(e===null)throw Error(a(308));aa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else aa=aa.next=n;return s}var iS=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(s){return s()})}},aS=r.unstable_scheduleCallback,sS=r.unstable_NormalPriority,hn={$$typeof:P,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Xu(){return{controller:new iS,data:new Map,refCount:0}}function uo(e){e.refCount--,e.refCount===0&&aS(sS,function(){e.controller.abort()})}var fo=null,Wu=0,er=0,nr=null;function rS(e,n){if(fo===null){var s=fo=[];Wu=0,er=Kf(),nr={status:"pending",value:void 0,then:function(o){s.push(o)}}}return Wu++,n.then(fm,fm),n}function fm(){if(--Wu===0&&fo!==null){nr!==null&&(nr.status="fulfilled");var e=fo;fo=null,er=0,nr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function oS(e,n){var s=[],o={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<s.length;u++)(0,s[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),o}var hm=B.S;B.S=function(e,n){K0=Oe(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&rS(e,n),hm!==null&&hm(e,n)};var Es=z(null);function qu(){var e=Es.current;return e!==null?e:Ye.pooledCache}function wl(e,n){n===null?gt(Es,Es.current):gt(Es,n.pool)}function dm(){var e=qu();return e===null?null:{parent:hn._currentValue,pool:e}}var ir=Error(a(460)),Yu=Error(a(474)),Cl=Error(a(542)),Dl={then:function(){}};function pm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function mm(e,n,s){switch(s=e[s],s===void 0?e.push(n):s!==n&&(n.then(xi,xi),n=s),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,vm(e),e;default:if(typeof n.status=="string")n.then(xi,xi);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,vm(e),e}throw Ts=n,ir}}function bs(e){try{var n=e._init;return n(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Ts=s,ir):s}}var Ts=null;function gm(){if(Ts===null)throw Error(a(459));var e=Ts;return Ts=null,e}function vm(e){if(e===ir||e===Cl)throw Error(a(483))}var ar=null,ho=0;function Ul(e){var n=ho;return ho+=1,ar===null&&(ar=[]),mm(ar,e,n)}function po(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Ll(e,n){throw n.$$typeof===v?Error(a(525)):(e=Object.prototype.toString.call(n),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function _m(e){function n(Q,Y){if(e){var at=Q.deletions;at===null?(Q.deletions=[Y],Q.flags|=16):at.push(Y)}}function s(Q,Y){if(!e)return null;for(;Y!==null;)n(Q,Y),Y=Y.sibling;return null}function o(Q){for(var Y=new Map;Q!==null;)Q.key!==null?Y.set(Q.key,Q):Y.set(Q.index,Q),Q=Q.sibling;return Y}function u(Q,Y){return Q=na(Q,Y),Q.index=0,Q.sibling=null,Q}function h(Q,Y,at){return Q.index=at,e?(at=Q.alternate,at!==null?(at=at.index,at<Y?(Q.flags|=67108866,Y):at):(Q.flags|=67108866,Y)):(Q.flags|=1048576,Y)}function y(Q){return e&&Q.alternate===null&&(Q.flags|=67108866),Q}function U(Q,Y,at,St){return Y===null||Y.tag!==6?(Y=Pu(at,Q.mode,St),Y.return=Q,Y):(Y=u(Y,at),Y.return=Q,Y)}function V(Q,Y,at,St){var jt=at.type;return jt===w?_t(Q,Y,at.props.children,St,at.key):Y!==null&&(Y.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===b&&bs(jt)===Y.type)?(Y=u(Y,at.props),po(Y,at),Y.return=Q,Y):(Y=bl(at.type,at.key,at.props,null,Q.mode,St),po(Y,at),Y.return=Q,Y)}function rt(Q,Y,at,St){return Y===null||Y.tag!==4||Y.stateNode.containerInfo!==at.containerInfo||Y.stateNode.implementation!==at.implementation?(Y=zu(at,Q.mode,St),Y.return=Q,Y):(Y=u(Y,at.children||[]),Y.return=Q,Y)}function _t(Q,Y,at,St,jt){return Y===null||Y.tag!==7?(Y=xs(at,Q.mode,St,jt),Y.return=Q,Y):(Y=u(Y,at),Y.return=Q,Y)}function yt(Q,Y,at){if(typeof Y=="string"&&Y!==""||typeof Y=="number"||typeof Y=="bigint")return Y=Pu(""+Y,Q.mode,at),Y.return=Q,Y;if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case x:return at=bl(Y.type,Y.key,Y.props,null,Q.mode,at),po(at,Y),at.return=Q,at;case E:return Y=zu(Y,Q.mode,at),Y.return=Q,Y;case b:return Y=bs(Y),yt(Q,Y,at)}if($(Y)||G(Y))return Y=xs(Y,Q.mode,at,null),Y.return=Q,Y;if(typeof Y.then=="function")return yt(Q,Ul(Y),at);if(Y.$$typeof===P)return yt(Q,Rl(Q,Y),at);Ll(Q,Y)}return null}function ct(Q,Y,at,St){var jt=Y!==null?Y.key:null;if(typeof at=="string"&&at!==""||typeof at=="number"||typeof at=="bigint")return jt!==null?null:U(Q,Y,""+at,St);if(typeof at=="object"&&at!==null){switch(at.$$typeof){case x:return at.key===jt?V(Q,Y,at,St):null;case E:return at.key===jt?rt(Q,Y,at,St):null;case b:return at=bs(at),ct(Q,Y,at,St)}if($(at)||G(at))return jt!==null?null:_t(Q,Y,at,St,null);if(typeof at.then=="function")return ct(Q,Y,Ul(at),St);if(at.$$typeof===P)return ct(Q,Y,Rl(Q,at),St);Ll(Q,at)}return null}function ht(Q,Y,at,St,jt){if(typeof St=="string"&&St!==""||typeof St=="number"||typeof St=="bigint")return Q=Q.get(at)||null,U(Y,Q,""+St,jt);if(typeof St=="object"&&St!==null){switch(St.$$typeof){case x:return Q=Q.get(St.key===null?at:St.key)||null,V(Y,Q,St,jt);case E:return Q=Q.get(St.key===null?at:St.key)||null,rt(Y,Q,St,jt);case b:return St=bs(St),ht(Q,Y,at,St,jt)}if($(St)||G(St))return Q=Q.get(at)||null,_t(Y,Q,St,jt,null);if(typeof St.then=="function")return ht(Q,Y,at,Ul(St),jt);if(St.$$typeof===P)return ht(Q,Y,at,Rl(Y,St),jt);Ll(Y,St)}return null}function qt(Q,Y,at,St){for(var jt=null,we=null,Yt=Y,ue=Y=0,ye=null;Yt!==null&&ue<at.length;ue++){Yt.index>ue?(ye=Yt,Yt=null):ye=Yt.sibling;var Ce=ct(Q,Yt,at[ue],St);if(Ce===null){Yt===null&&(Yt=ye);break}e&&Yt&&Ce.alternate===null&&n(Q,Yt),Y=h(Ce,Y,ue),we===null?jt=Ce:we.sibling=Ce,we=Ce,Yt=ye}if(ue===at.length)return s(Q,Yt),Me&&ia(Q,ue),jt;if(Yt===null){for(;ue<at.length;ue++)Yt=yt(Q,at[ue],St),Yt!==null&&(Y=h(Yt,Y,ue),we===null?jt=Yt:we.sibling=Yt,we=Yt);return Me&&ia(Q,ue),jt}for(Yt=o(Yt);ue<at.length;ue++)ye=ht(Yt,Q,ue,at[ue],St),ye!==null&&(e&&ye.alternate!==null&&Yt.delete(ye.key===null?ue:ye.key),Y=h(ye,Y,ue),we===null?jt=ye:we.sibling=ye,we=ye);return e&&Yt.forEach(function(es){return n(Q,es)}),Me&&ia(Q,ue),jt}function $t(Q,Y,at,St){if(at==null)throw Error(a(151));for(var jt=null,we=null,Yt=Y,ue=Y=0,ye=null,Ce=at.next();Yt!==null&&!Ce.done;ue++,Ce=at.next()){Yt.index>ue?(ye=Yt,Yt=null):ye=Yt.sibling;var es=ct(Q,Yt,Ce.value,St);if(es===null){Yt===null&&(Yt=ye);break}e&&Yt&&es.alternate===null&&n(Q,Yt),Y=h(es,Y,ue),we===null?jt=es:we.sibling=es,we=es,Yt=ye}if(Ce.done)return s(Q,Yt),Me&&ia(Q,ue),jt;if(Yt===null){for(;!Ce.done;ue++,Ce=at.next())Ce=yt(Q,Ce.value,St),Ce!==null&&(Y=h(Ce,Y,ue),we===null?jt=Ce:we.sibling=Ce,we=Ce);return Me&&ia(Q,ue),jt}for(Yt=o(Yt);!Ce.done;ue++,Ce=at.next())Ce=ht(Yt,Q,ue,Ce.value,St),Ce!==null&&(e&&Ce.alternate!==null&&Yt.delete(Ce.key===null?ue:Ce.key),Y=h(Ce,Y,ue),we===null?jt=Ce:we.sibling=Ce,we=Ce);return e&&Yt.forEach(function(_y){return n(Q,_y)}),Me&&ia(Q,ue),jt}function ke(Q,Y,at,St){if(typeof at=="object"&&at!==null&&at.type===w&&at.key===null&&(at=at.props.children),typeof at=="object"&&at!==null){switch(at.$$typeof){case x:t:{for(var jt=at.key;Y!==null;){if(Y.key===jt){if(jt=at.type,jt===w){if(Y.tag===7){s(Q,Y.sibling),St=u(Y,at.props.children),St.return=Q,Q=St;break t}}else if(Y.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===b&&bs(jt)===Y.type){s(Q,Y.sibling),St=u(Y,at.props),po(St,at),St.return=Q,Q=St;break t}s(Q,Y);break}else n(Q,Y);Y=Y.sibling}at.type===w?(St=xs(at.props.children,Q.mode,St,at.key),St.return=Q,Q=St):(St=bl(at.type,at.key,at.props,null,Q.mode,St),po(St,at),St.return=Q,Q=St)}return y(Q);case E:t:{for(jt=at.key;Y!==null;){if(Y.key===jt)if(Y.tag===4&&Y.stateNode.containerInfo===at.containerInfo&&Y.stateNode.implementation===at.implementation){s(Q,Y.sibling),St=u(Y,at.children||[]),St.return=Q,Q=St;break t}else{s(Q,Y);break}else n(Q,Y);Y=Y.sibling}St=zu(at,Q.mode,St),St.return=Q,Q=St}return y(Q);case b:return at=bs(at),ke(Q,Y,at,St)}if($(at))return qt(Q,Y,at,St);if(G(at)){if(jt=G(at),typeof jt!="function")throw Error(a(150));return at=jt.call(at),$t(Q,Y,at,St)}if(typeof at.then=="function")return ke(Q,Y,Ul(at),St);if(at.$$typeof===P)return ke(Q,Y,Rl(Q,at),St);Ll(Q,at)}return typeof at=="string"&&at!==""||typeof at=="number"||typeof at=="bigint"?(at=""+at,Y!==null&&Y.tag===6?(s(Q,Y.sibling),St=u(Y,at),St.return=Q,Q=St):(s(Q,Y),St=Pu(at,Q.mode,St),St.return=Q,Q=St),y(Q)):s(Q,Y)}return function(Q,Y,at,St){try{ho=0;var jt=ke(Q,Y,at,St);return ar=null,jt}catch(Yt){if(Yt===ir||Yt===Cl)throw Yt;var we=ci(29,Yt,null,Q.mode);return we.lanes=St,we.return=Q,we}finally{}}}var As=_m(!0),xm=_m(!1),Ia=!1;function Zu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ku(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Fa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ha(e,n,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=El(e),nm(e,null,s),n}return Ml(e,o,n,s),El(e)}function mo(e,n,s){if(n=n.updateQueue,n!==null&&(n=n.shared,(s&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,s|=o,n.lanes=s,Zn(e,s)}}function Qu(e,n){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var u=null,h=null;if(s=s.firstBaseUpdate,s!==null){do{var y={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};h===null?u=h=y:h=h.next=y,s=s.next}while(s!==null);h===null?u=h=n:h=h.next=n}else u=h=n;s={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=n:e.next=n,s.lastBaseUpdate=n}var Ju=!1;function go(){if(Ju){var e=nr;if(e!==null)throw e}}function vo(e,n,s,o){Ju=!1;var u=e.updateQueue;Ia=!1;var h=u.firstBaseUpdate,y=u.lastBaseUpdate,U=u.shared.pending;if(U!==null){u.shared.pending=null;var V=U,rt=V.next;V.next=null,y===null?h=rt:y.next=rt,y=V;var _t=e.alternate;_t!==null&&(_t=_t.updateQueue,U=_t.lastBaseUpdate,U!==y&&(U===null?_t.firstBaseUpdate=rt:U.next=rt,_t.lastBaseUpdate=V))}if(h!==null){var yt=u.baseState;y=0,_t=rt=V=null,U=h;do{var ct=U.lane&-536870913,ht=ct!==U.lane;if(ht?(Se&ct)===ct:(o&ct)===ct){ct!==0&&ct===er&&(Ju=!0),_t!==null&&(_t=_t.next={lane:0,tag:U.tag,payload:U.payload,callback:null,next:null});t:{var qt=e,$t=U;ct=n;var ke=s;switch($t.tag){case 1:if(qt=$t.payload,typeof qt=="function"){yt=qt.call(ke,yt,ct);break t}yt=qt;break t;case 3:qt.flags=qt.flags&-65537|128;case 0:if(qt=$t.payload,ct=typeof qt=="function"?qt.call(ke,yt,ct):qt,ct==null)break t;yt=_({},yt,ct);break t;case 2:Ia=!0}}ct=U.callback,ct!==null&&(e.flags|=64,ht&&(e.flags|=8192),ht=u.callbacks,ht===null?u.callbacks=[ct]:ht.push(ct))}else ht={lane:ct,tag:U.tag,payload:U.payload,callback:U.callback,next:null},_t===null?(rt=_t=ht,V=yt):_t=_t.next=ht,y|=ct;if(U=U.next,U===null){if(U=u.shared.pending,U===null)break;ht=U,U=ht.next,ht.next=null,u.lastBaseUpdate=ht,u.shared.pending=null}}while(!0);_t===null&&(V=yt),u.baseState=V,u.firstBaseUpdate=rt,u.lastBaseUpdate=_t,h===null&&(u.shared.lanes=0),Wa|=y,e.lanes=y,e.memoizedState=yt}}function Sm(e,n){if(typeof e!="function")throw Error(a(191,e));e.call(n)}function ym(e,n){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Sm(s[e],n)}var sr=z(null),Nl=z(0);function Mm(e,n){e=pa,gt(Nl,e),gt(sr,n),pa=e|n.baseLanes}function ju(){gt(Nl,pa),gt(sr,sr.current)}function $u(){pa=Nl.current,tt(sr),tt(Nl)}var ui=z(null),Ti=null;function Ga(e){var n=e.alternate;gt(on,on.current&1),gt(ui,e),Ti===null&&(n===null||sr.current!==null||n.memoizedState!==null)&&(Ti=e)}function tf(e){gt(on,on.current),gt(ui,e),Ti===null&&(Ti=e)}function Em(e){e.tag===22?(gt(on,on.current),gt(ui,e),Ti===null&&(Ti=e)):Va()}function Va(){gt(on,on.current),gt(ui,ui.current)}function fi(e){tt(ui),Ti===e&&(Ti=null),tt(on)}var on=z(0);function Ol(e){for(var n=e;n!==null;){if(n.tag===13){var s=n.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||oh(s)||lh(s)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ra=0,ce=null,Ge=null,dn=null,Pl=!1,rr=!1,Rs=!1,zl=0,_o=0,or=null,lS=0;function sn(){throw Error(a(321))}function ef(e,n){if(n===null)return!1;for(var s=0;s<n.length&&s<e.length;s++)if(!li(e[s],n[s]))return!1;return!0}function nf(e,n,s,o,u,h){return ra=h,ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,B.H=e===null||e.memoizedState===null?r0:_f,Rs=!1,h=s(o,u),Rs=!1,rr&&(h=Tm(n,s,o,u)),bm(e),h}function bm(e){B.H=yo;var n=Ge!==null&&Ge.next!==null;if(ra=0,dn=Ge=ce=null,Pl=!1,_o=0,or=null,n)throw Error(a(300));e===null||pn||(e=e.dependencies,e!==null&&Al(e)&&(pn=!0))}function Tm(e,n,s,o){ce=e;var u=0;do{if(rr&&(or=null),_o=0,rr=!1,25<=u)throw Error(a(301));if(u+=1,dn=Ge=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}B.H=o0,h=n(s,o)}while(rr);return h}function cS(){var e=B.H,n=e.useState()[0];return n=typeof n.then=="function"?xo(n):n,e=e.useState()[0],(Ge!==null?Ge.memoizedState:null)!==e&&(ce.flags|=1024),n}function af(){var e=zl!==0;return zl=0,e}function sf(e,n,s){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~s}function rf(e){if(Pl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Pl=!1}ra=0,dn=Ge=ce=null,rr=!1,_o=zl=0,or=null}function Xn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dn===null?ce.memoizedState=dn=e:dn=dn.next=e,dn}function ln(){if(Ge===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Ge.next;var n=dn===null?ce.memoizedState:dn.next;if(n!==null)dn=n,Ge=e;else{if(e===null)throw ce.alternate===null?Error(a(467)):Error(a(310));Ge=e,e={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},dn===null?ce.memoizedState=dn=e:dn=dn.next=e}return dn}function Bl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xo(e){var n=_o;return _o+=1,or===null&&(or=[]),e=mm(or,e,n),n=ce,(dn===null?n.memoizedState:dn.next)===null&&(n=n.alternate,B.H=n===null||n.memoizedState===null?r0:_f),e}function Il(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xo(e);if(e.$$typeof===P)return Ln(e)}throw Error(a(438,String(e)))}function of(e){var n=null,s=ce.updateQueue;if(s!==null&&(n=s.memoCache),n==null){var o=ce.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),s===null&&(s=Bl(),ce.updateQueue=s),s.memoCache=n,s=n.data[n.index],s===void 0)for(s=n.data[n.index]=Array(e),o=0;o<e;o++)s[o]=F;return n.index++,s}function oa(e,n){return typeof n=="function"?n(e):n}function Fl(e){var n=ln();return lf(n,Ge,e)}function lf(e,n,s){var o=e.queue;if(o===null)throw Error(a(311));o.lastRenderedReducer=s;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var y=u.next;u.next=h.next,h.next=y}n.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{n=u.next;var U=y=null,V=null,rt=n,_t=!1;do{var yt=rt.lane&-536870913;if(yt!==rt.lane?(Se&yt)===yt:(ra&yt)===yt){var ct=rt.revertLane;if(ct===0)V!==null&&(V=V.next={lane:0,revertLane:0,gesture:null,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null}),yt===er&&(_t=!0);else if((ra&ct)===ct){rt=rt.next,ct===er&&(_t=!0);continue}else yt={lane:0,revertLane:rt.revertLane,gesture:null,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null},V===null?(U=V=yt,y=h):V=V.next=yt,ce.lanes|=ct,Wa|=ct;yt=rt.action,Rs&&s(h,yt),h=rt.hasEagerState?rt.eagerState:s(h,yt)}else ct={lane:yt,revertLane:rt.revertLane,gesture:rt.gesture,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null},V===null?(U=V=ct,y=h):V=V.next=ct,ce.lanes|=yt,Wa|=yt;rt=rt.next}while(rt!==null&&rt!==n);if(V===null?y=h:V.next=U,!li(h,e.memoizedState)&&(pn=!0,_t&&(s=nr,s!==null)))throw s;e.memoizedState=h,e.baseState=y,e.baseQueue=V,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function cf(e){var n=ln(),s=n.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var o=s.dispatch,u=s.pending,h=n.memoizedState;if(u!==null){s.pending=null;var y=u=u.next;do h=e(h,y.action),y=y.next;while(y!==u);li(h,n.memoizedState)||(pn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),s.lastRenderedState=h}return[h,o]}function Am(e,n,s){var o=ce,u=ln(),h=Me;if(h){if(s===void 0)throw Error(a(407));s=s()}else s=n();var y=!li((Ge||u).memoizedState,s);if(y&&(u.memoizedState=s,pn=!0),u=u.queue,hf(Cm.bind(null,o,u,e),[e]),u.getSnapshot!==n||y||dn!==null&&dn.memoizedState.tag&1){if(o.flags|=2048,lr(9,{destroy:void 0},wm.bind(null,o,u,s,n),null),Ye===null)throw Error(a(349));h||(ra&127)!==0||Rm(o,n,s)}return s}function Rm(e,n,s){e.flags|=16384,e={getSnapshot:n,value:s},n=ce.updateQueue,n===null?(n=Bl(),ce.updateQueue=n,n.stores=[e]):(s=n.stores,s===null?n.stores=[e]:s.push(e))}function wm(e,n,s,o){n.value=s,n.getSnapshot=o,Dm(n)&&Um(e)}function Cm(e,n,s){return s(function(){Dm(n)&&Um(e)})}function Dm(e){var n=e.getSnapshot;e=e.value;try{var s=n();return!li(e,s)}catch{return!0}}function Um(e){var n=_s(e,2);n!==null&&ei(n,e,2)}function uf(e){var n=Xn();if(typeof e=="function"){var s=e;if(e=s(),Rs){At(!0);try{s()}finally{At(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:e},n}function Lm(e,n,s,o){return e.baseState=s,lf(e,Ge,typeof o=="function"?o:oa)}function uS(e,n,s,o,u){if(Vl(e))throw Error(a(485));if(e=n.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};B.T!==null?s(!0):h.isTransition=!1,o(h),s=n.pending,s===null?(h.next=n.pending=h,Nm(n,h)):(h.next=s.next,n.pending=s.next=h)}}function Nm(e,n){var s=n.action,o=n.payload,u=e.state;if(n.isTransition){var h=B.T,y={};B.T=y;try{var U=s(u,o),V=B.S;V!==null&&V(y,U),Om(e,n,U)}catch(rt){ff(e,n,rt)}finally{h!==null&&y.types!==null&&(h.types=y.types),B.T=h}}else try{h=s(u,o),Om(e,n,h)}catch(rt){ff(e,n,rt)}}function Om(e,n,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){Pm(e,n,o)},function(o){return ff(e,n,o)}):Pm(e,n,s)}function Pm(e,n,s){n.status="fulfilled",n.value=s,zm(n),e.state=s,n=e.pending,n!==null&&(s=n.next,s===n?e.pending=null:(s=s.next,n.next=s,Nm(e,s)))}function ff(e,n,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=s,zm(n),n=n.next;while(n!==o)}e.action=null}function zm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Bm(e,n){return n}function Im(e,n){if(Me){var s=Ye.formState;if(s!==null){t:{var o=ce;if(Me){if(Qe){e:{for(var u=Qe,h=bi;u.nodeType!==8;){if(!h){u=null;break e}if(u=Ai(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){Qe=Ai(u.nextSibling),o=u.data==="F!";break t}}za(o)}o=!1}o&&(n=s[0])}}return s=Xn(),s.memoizedState=s.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bm,lastRenderedState:n},s.queue=o,s=i0.bind(null,ce,o),o.dispatch=s,o=uf(!1),h=vf.bind(null,ce,!1,o.queue),o=Xn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,s=uS.bind(null,ce,u,h,s),u.dispatch=s,o.memoizedState=e,[n,s,!1]}function Fm(e){var n=ln();return Hm(n,Ge,e)}function Hm(e,n,s){if(n=lf(e,n,Bm)[0],e=Fl(oa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=xo(n)}catch(y){throw y===ir?Cl:y}else o=n;n=ln();var u=n.queue,h=u.dispatch;return s!==n.memoizedState&&(ce.flags|=2048,lr(9,{destroy:void 0},fS.bind(null,u,s),null)),[o,h,e]}function fS(e,n){e.action=n}function Gm(e){var n=ln(),s=Ge;if(s!==null)return Hm(n,s,e);ln(),n=n.memoizedState,s=ln();var o=s.queue.dispatch;return s.memoizedState=e,[n,o,!1]}function lr(e,n,s,o){return e={tag:e,create:s,deps:o,inst:n,next:null},n=ce.updateQueue,n===null&&(n=Bl(),ce.updateQueue=n),s=n.lastEffect,s===null?n.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,n.lastEffect=e),e}function Vm(){return ln().memoizedState}function Hl(e,n,s,o){var u=Xn();ce.flags|=e,u.memoizedState=lr(1|n,{destroy:void 0},s,o===void 0?null:o)}function Gl(e,n,s,o){var u=ln();o=o===void 0?null:o;var h=u.memoizedState.inst;Ge!==null&&o!==null&&ef(o,Ge.memoizedState.deps)?u.memoizedState=lr(n,h,s,o):(ce.flags|=e,u.memoizedState=lr(1|n,h,s,o))}function km(e,n){Hl(8390656,8,e,n)}function hf(e,n){Gl(2048,8,e,n)}function hS(e){ce.flags|=4;var n=ce.updateQueue;if(n===null)n=Bl(),ce.updateQueue=n,n.events=[e];else{var s=n.events;s===null?n.events=[e]:s.push(e)}}function Xm(e){var n=ln().memoizedState;return hS({ref:n,nextImpl:e}),function(){if((Le&2)!==0)throw Error(a(440));return n.impl.apply(void 0,arguments)}}function Wm(e,n){return Gl(4,2,e,n)}function qm(e,n){return Gl(4,4,e,n)}function Ym(e,n){if(typeof n=="function"){e=e();var s=n(e);return function(){typeof s=="function"?s():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Zm(e,n,s){s=s!=null?s.concat([e]):null,Gl(4,4,Ym.bind(null,n,e),s)}function df(){}function Km(e,n){var s=ln();n=n===void 0?null:n;var o=s.memoizedState;return n!==null&&ef(n,o[1])?o[0]:(s.memoizedState=[e,n],e)}function Qm(e,n){var s=ln();n=n===void 0?null:n;var o=s.memoizedState;if(n!==null&&ef(n,o[1]))return o[0];if(o=e(),Rs){At(!0);try{e()}finally{At(!1)}}return s.memoizedState=[o,n],o}function pf(e,n,s){return s===void 0||(ra&1073741824)!==0&&(Se&261930)===0?e.memoizedState=n:(e.memoizedState=s,e=J0(),ce.lanes|=e,Wa|=e,s)}function Jm(e,n,s,o){return li(s,n)?s:sr.current!==null?(e=pf(e,s,o),li(e,n)||(pn=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(Se&261930)===0?(pn=!0,e.memoizedState=s):(e=J0(),ce.lanes|=e,Wa|=e,n)}function jm(e,n,s,o,u){var h=W.p;W.p=h!==0&&8>h?h:8;var y=B.T,U={};B.T=U,vf(e,!1,n,s);try{var V=u(),rt=B.S;if(rt!==null&&rt(U,V),V!==null&&typeof V=="object"&&typeof V.then=="function"){var _t=oS(V,o);So(e,n,_t,pi(e))}else So(e,n,o,pi(e))}catch(yt){So(e,n,{then:function(){},status:"rejected",reason:yt},pi())}finally{W.p=h,y!==null&&U.types!==null&&(y.types=U.types),B.T=y}}function dS(){}function mf(e,n,s,o){if(e.tag!==5)throw Error(a(476));var u=$m(e).queue;jm(e,u,n,ot,s===null?dS:function(){return t0(e),s(o)})}function $m(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ot,baseState:ot,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:ot},next:null};var s={};return n.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:s},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function t0(e){var n=$m(e);n.next===null&&(n=e.alternate.memoizedState),So(e,n.next.queue,{},pi())}function gf(){return Ln(Bo)}function e0(){return ln().memoizedState}function n0(){return ln().memoizedState}function pS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var s=pi();e=Fa(s);var o=Ha(n,e,s);o!==null&&(ei(o,n,s),mo(o,n,s)),n={cache:Xu()},e.payload=n;return}n=n.return}}function mS(e,n,s){var o=pi();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Vl(e)?a0(n,s):(s=Nu(e,n,s,o),s!==null&&(ei(s,e,o),s0(s,n,o)))}function i0(e,n,s){var o=pi();So(e,n,s,o)}function So(e,n,s,o){var u={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Vl(e))a0(n,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var y=n.lastRenderedState,U=h(y,s);if(u.hasEagerState=!0,u.eagerState=U,li(U,y))return Ml(e,n,u,0),Ye===null&&yl(),!1}catch{}finally{}if(s=Nu(e,n,u,o),s!==null)return ei(s,e,o),s0(s,n,o),!0}return!1}function vf(e,n,s,o){if(o={lane:2,revertLane:Kf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Vl(e)){if(n)throw Error(a(479))}else n=Nu(e,s,o,2),n!==null&&ei(n,e,2)}function Vl(e){var n=e.alternate;return e===ce||n!==null&&n===ce}function a0(e,n){rr=Pl=!0;var s=e.pending;s===null?n.next=n:(n.next=s.next,s.next=n),e.pending=n}function s0(e,n,s){if((s&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,s|=o,n.lanes=s,Zn(e,s)}}var yo={readContext:Ln,use:Il,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useLayoutEffect:sn,useInsertionEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useSyncExternalStore:sn,useId:sn,useHostTransitionStatus:sn,useFormState:sn,useActionState:sn,useOptimistic:sn,useMemoCache:sn,useCacheRefresh:sn};yo.useEffectEvent=sn;var r0={readContext:Ln,use:Il,useCallback:function(e,n){return Xn().memoizedState=[e,n===void 0?null:n],e},useContext:Ln,useEffect:km,useImperativeHandle:function(e,n,s){s=s!=null?s.concat([e]):null,Hl(4194308,4,Ym.bind(null,n,e),s)},useLayoutEffect:function(e,n){return Hl(4194308,4,e,n)},useInsertionEffect:function(e,n){Hl(4,2,e,n)},useMemo:function(e,n){var s=Xn();n=n===void 0?null:n;var o=e();if(Rs){At(!0);try{e()}finally{At(!1)}}return s.memoizedState=[o,n],o},useReducer:function(e,n,s){var o=Xn();if(s!==void 0){var u=s(n);if(Rs){At(!0);try{s(n)}finally{At(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=mS.bind(null,ce,e),[o.memoizedState,e]},useRef:function(e){var n=Xn();return e={current:e},n.memoizedState=e},useState:function(e){e=uf(e);var n=e.queue,s=i0.bind(null,ce,n);return n.dispatch=s,[e.memoizedState,s]},useDebugValue:df,useDeferredValue:function(e,n){var s=Xn();return pf(s,e,n)},useTransition:function(){var e=uf(!1);return e=jm.bind(null,ce,e.queue,!0,!1),Xn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,s){var o=ce,u=Xn();if(Me){if(s===void 0)throw Error(a(407));s=s()}else{if(s=n(),Ye===null)throw Error(a(349));(Se&127)!==0||Rm(o,n,s)}u.memoizedState=s;var h={value:s,getSnapshot:n};return u.queue=h,km(Cm.bind(null,o,h,e),[e]),o.flags|=2048,lr(9,{destroy:void 0},wm.bind(null,o,h,s,n),null),s},useId:function(){var e=Xn(),n=Ye.identifierPrefix;if(Me){var s=ki,o=Vi;s=(o&~(1<<32-Ht(o)-1)).toString(32)+s,n="_"+n+"R_"+s,s=zl++,0<s&&(n+="H"+s.toString(32)),n+="_"}else s=lS++,n="_"+n+"r_"+s.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:gf,useFormState:Im,useActionState:Im,useOptimistic:function(e){var n=Xn();n.memoizedState=n.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=s,n=vf.bind(null,ce,!0,s),s.dispatch=n,[e,n]},useMemoCache:of,useCacheRefresh:function(){return Xn().memoizedState=pS.bind(null,ce)},useEffectEvent:function(e){var n=Xn(),s={impl:e};return n.memoizedState=s,function(){if((Le&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},_f={readContext:Ln,use:Il,useCallback:Km,useContext:Ln,useEffect:hf,useImperativeHandle:Zm,useInsertionEffect:Wm,useLayoutEffect:qm,useMemo:Qm,useReducer:Fl,useRef:Vm,useState:function(){return Fl(oa)},useDebugValue:df,useDeferredValue:function(e,n){var s=ln();return Jm(s,Ge.memoizedState,e,n)},useTransition:function(){var e=Fl(oa)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:xo(e),n]},useSyncExternalStore:Am,useId:e0,useHostTransitionStatus:gf,useFormState:Fm,useActionState:Fm,useOptimistic:function(e,n){var s=ln();return Lm(s,Ge,e,n)},useMemoCache:of,useCacheRefresh:n0};_f.useEffectEvent=Xm;var o0={readContext:Ln,use:Il,useCallback:Km,useContext:Ln,useEffect:hf,useImperativeHandle:Zm,useInsertionEffect:Wm,useLayoutEffect:qm,useMemo:Qm,useReducer:cf,useRef:Vm,useState:function(){return cf(oa)},useDebugValue:df,useDeferredValue:function(e,n){var s=ln();return Ge===null?pf(s,e,n):Jm(s,Ge.memoizedState,e,n)},useTransition:function(){var e=cf(oa)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:xo(e),n]},useSyncExternalStore:Am,useId:e0,useHostTransitionStatus:gf,useFormState:Gm,useActionState:Gm,useOptimistic:function(e,n){var s=ln();return Ge!==null?Lm(s,Ge,e,n):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:of,useCacheRefresh:n0};o0.useEffectEvent=Xm;function xf(e,n,s,o){n=e.memoizedState,s=s(o,n),s=s==null?n:_({},n,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Sf={enqueueSetState:function(e,n,s){e=e._reactInternals;var o=pi(),u=Fa(o);u.payload=n,s!=null&&(u.callback=s),n=Ha(e,u,o),n!==null&&(ei(n,e,o),mo(n,e,o))},enqueueReplaceState:function(e,n,s){e=e._reactInternals;var o=pi(),u=Fa(o);u.tag=1,u.payload=n,s!=null&&(u.callback=s),n=Ha(e,u,o),n!==null&&(ei(n,e,o),mo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var s=pi(),o=Fa(s);o.tag=2,n!=null&&(o.callback=n),n=Ha(e,o,s),n!==null&&(ei(n,e,s),mo(n,e,s))}};function l0(e,n,s,o,u,h,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,y):n.prototype&&n.prototype.isPureReactComponent?!ro(s,o)||!ro(u,h):!0}function c0(e,n,s,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(s,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(s,o),n.state!==e&&Sf.enqueueReplaceState(n,n.state,null)}function ws(e,n){var s=n;if("ref"in n){s={};for(var o in n)o!=="ref"&&(s[o]=n[o])}if(e=e.defaultProps){s===n&&(s=_({},s));for(var u in e)s[u]===void 0&&(s[u]=e[u])}return s}function u0(e){Sl(e)}function f0(e){console.error(e)}function h0(e){Sl(e)}function kl(e,n){try{var s=e.onUncaughtError;s(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function d0(e,n,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function yf(e,n,s){return s=Fa(s),s.tag=3,s.payload={element:null},s.callback=function(){kl(e,n)},s}function p0(e){return e=Fa(e),e.tag=3,e}function m0(e,n,s,o){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){d0(n,s,o)}}var y=s.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){d0(n,s,o),typeof u!="function"&&(qa===null?qa=new Set([this]):qa.add(this));var U=o.stack;this.componentDidCatch(o.value,{componentStack:U!==null?U:""})})}function gS(e,n,s,o,u){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=s.alternate,n!==null&&tr(n,s,u,!0),s=ui.current,s!==null){switch(s.tag){case 31:case 13:return Ti===null?ec():s.alternate===null&&rn===0&&(rn=3),s.flags&=-257,s.flags|=65536,s.lanes=u,o===Dl?s.flags|=16384:(n=s.updateQueue,n===null?s.updateQueue=new Set([o]):n.add(o),qf(e,o,u)),!1;case 22:return s.flags|=65536,o===Dl?s.flags|=16384:(n=s.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=n):(s=n.retryQueue,s===null?n.retryQueue=new Set([o]):s.add(o)),qf(e,o,u)),!1}throw Error(a(435,s.tag))}return qf(e,o,u),ec(),!1}if(Me)return n=ui.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Fu&&(e=Error(a(422),{cause:o}),co(yi(e,s)))):(o!==Fu&&(n=Error(a(423),{cause:o}),co(yi(n,s))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=yi(o,s),u=yf(e.stateNode,o,u),Qu(e,u),rn!==4&&(rn=2)),!1;var h=Error(a(520),{cause:o});if(h=yi(h,s),Co===null?Co=[h]:Co.push(h),rn!==4&&(rn=2),n===null)return!0;o=yi(o,s),s=n;do{switch(s.tag){case 3:return s.flags|=65536,e=u&-u,s.lanes|=e,e=yf(s.stateNode,o,e),Qu(s,e),!1;case 1:if(n=s.type,h=s.stateNode,(s.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(qa===null||!qa.has(h))))return s.flags|=65536,u&=-u,s.lanes|=u,u=p0(u),m0(u,e,s,o),Qu(s,u),!1}s=s.return}while(s!==null);return!1}var Mf=Error(a(461)),pn=!1;function Nn(e,n,s,o){n.child=e===null?xm(n,null,s,o):As(n,e.child,s,o)}function g0(e,n,s,o,u){s=s.render;var h=n.ref;if("ref"in o){var y={};for(var U in o)U!=="ref"&&(y[U]=o[U])}else y=o;return Ms(n),o=nf(e,n,s,y,h,u),U=af(),e!==null&&!pn?(sf(e,n,u),la(e,n,u)):(Me&&U&&Bu(n),n.flags|=1,Nn(e,n,o,u),n.child)}function v0(e,n,s,o,u){if(e===null){var h=s.type;return typeof h=="function"&&!Ou(h)&&h.defaultProps===void 0&&s.compare===null?(n.tag=15,n.type=h,_0(e,n,h,o,u)):(e=bl(s.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!Df(e,u)){var y=h.memoizedProps;if(s=s.compare,s=s!==null?s:ro,s(y,o)&&e.ref===n.ref)return la(e,n,u)}return n.flags|=1,e=na(h,o),e.ref=n.ref,e.return=n,n.child=e}function _0(e,n,s,o,u){if(e!==null){var h=e.memoizedProps;if(ro(h,o)&&e.ref===n.ref)if(pn=!1,n.pendingProps=o=h,Df(e,u))(e.flags&131072)!==0&&(pn=!0);else return n.lanes=e.lanes,la(e,n,u)}return Ef(e,n,s,o,u)}function x0(e,n,s,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|s:s,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,n.child=null;return S0(e,n,h,s,o)}if((s&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&wl(n,h!==null?h.cachePool:null),h!==null?Mm(n,h):ju(),Em(n);else return o=n.lanes=536870912,S0(e,n,h!==null?h.baseLanes|s:s,s,o)}else h!==null?(wl(n,h.cachePool),Mm(n,h),Va(),n.memoizedState=null):(e!==null&&wl(n,null),ju(),Va());return Nn(e,n,u,s),n.child}function Mo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function S0(e,n,s,o,u){var h=qu();return h=h===null?null:{parent:hn._currentValue,pool:h},n.memoizedState={baseLanes:s,cachePool:h},e!==null&&wl(n,null),ju(),Em(n),e!==null&&tr(e,n,o,!0),n.childLanes=u,null}function Xl(e,n){return n=ql({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function y0(e,n,s){return As(n,e.child,null,s),e=Xl(n,n.pendingProps),e.flags|=2,fi(n),n.memoizedState=null,e}function vS(e,n,s){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Me){if(o.mode==="hidden")return e=Xl(n,o),n.lanes=536870912,Mo(null,e);if(tf(n),(e=Qe)?(e=Ng(e,bi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Oa!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},s=am(e),s.return=n,n.child=s,Un=n,Qe=null)):e=null,e===null)throw za(n);return n.lanes=536870912,null}return Xl(n,o)}var h=e.memoizedState;if(h!==null){var y=h.dehydrated;if(tf(n),u)if(n.flags&256)n.flags&=-257,n=y0(e,n,s);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(a(558));else if(pn||tr(e,n,s,!1),u=(s&e.childLanes)!==0,pn||u){if(o=Ye,o!==null&&(y=ri(o,s),y!==0&&y!==h.retryLane))throw h.retryLane=y,_s(e,y),ei(o,e,y),Mf;ec(),n=y0(e,n,s)}else e=h.treeContext,Qe=Ai(y.nextSibling),Un=n,Me=!0,Pa=null,bi=!1,e!==null&&om(n,e),n=Xl(n,o),n.flags|=4096;return n}return e=na(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Wl(e,n){var s=n.ref;if(s===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(n.flags|=4194816)}}function Ef(e,n,s,o,u){return Ms(n),s=nf(e,n,s,o,void 0,u),o=af(),e!==null&&!pn?(sf(e,n,u),la(e,n,u)):(Me&&o&&Bu(n),n.flags|=1,Nn(e,n,s,u),n.child)}function M0(e,n,s,o,u,h){return Ms(n),n.updateQueue=null,s=Tm(n,o,s,u),bm(e),o=af(),e!==null&&!pn?(sf(e,n,h),la(e,n,h)):(Me&&o&&Bu(n),n.flags|=1,Nn(e,n,s,h),n.child)}function E0(e,n,s,o,u){if(Ms(n),n.stateNode===null){var h=Qs,y=s.contextType;typeof y=="object"&&y!==null&&(h=Ln(y)),h=new s(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Sf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},Zu(n),y=s.contextType,h.context=typeof y=="object"&&y!==null?Ln(y):Qs,h.state=n.memoizedState,y=s.getDerivedStateFromProps,typeof y=="function"&&(xf(n,s,y,o),h.state=n.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&Sf.enqueueReplaceState(h,h.state,null),vo(n,o,h,u),go(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){h=n.stateNode;var U=n.memoizedProps,V=ws(s,U);h.props=V;var rt=h.context,_t=s.contextType;y=Qs,typeof _t=="object"&&_t!==null&&(y=Ln(_t));var yt=s.getDerivedStateFromProps;_t=typeof yt=="function"||typeof h.getSnapshotBeforeUpdate=="function",U=n.pendingProps!==U,_t||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(U||rt!==y)&&c0(n,h,o,y),Ia=!1;var ct=n.memoizedState;h.state=ct,vo(n,o,h,u),go(),rt=n.memoizedState,U||ct!==rt||Ia?(typeof yt=="function"&&(xf(n,s,yt,o),rt=n.memoizedState),(V=Ia||l0(n,s,V,o,ct,rt,y))?(_t||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=rt),h.props=o,h.state=rt,h.context=y,o=V):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,Ku(e,n),y=n.memoizedProps,_t=ws(s,y),h.props=_t,yt=n.pendingProps,ct=h.context,rt=s.contextType,V=Qs,typeof rt=="object"&&rt!==null&&(V=Ln(rt)),U=s.getDerivedStateFromProps,(rt=typeof U=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==yt||ct!==V)&&c0(n,h,o,V),Ia=!1,ct=n.memoizedState,h.state=ct,vo(n,o,h,u),go();var ht=n.memoizedState;y!==yt||ct!==ht||Ia||e!==null&&e.dependencies!==null&&Al(e.dependencies)?(typeof U=="function"&&(xf(n,s,U,o),ht=n.memoizedState),(_t=Ia||l0(n,s,_t,o,ct,ht,V)||e!==null&&e.dependencies!==null&&Al(e.dependencies))?(rt||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,ht,V),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,ht,V)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ht),h.props=o,h.state=ht,h.context=V,o=_t):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(n.flags|=1024),o=!1)}return h=o,Wl(e,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&o?(n.child=As(n,e.child,null,u),n.child=As(n,null,s,u)):Nn(e,n,s,u),n.memoizedState=h.state,e=n.child):e=la(e,n,u),e}function b0(e,n,s,o){return Ss(),n.flags|=256,Nn(e,n,s,o),n.child}var bf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Tf(e){return{baseLanes:e,cachePool:dm()}}function Af(e,n,s){return e=e!==null?e.childLanes&~s:0,n&&(e|=di),e}function T0(e,n,s){var o=n.pendingProps,u=!1,h=(n.flags&128)!==0,y;if((y=h)||(y=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,e===null){if(Me){if(u?Ga(n):Va(),(e=Qe)?(e=Ng(e,bi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Oa!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},s=am(e),s.return=n,n.child=s,Un=n,Qe=null)):e=null,e===null)throw za(n);return lh(e)?n.lanes=32:n.lanes=536870912,null}var U=o.children;return o=o.fallback,u?(Va(),u=n.mode,U=ql({mode:"hidden",children:U},u),o=xs(o,u,s,null),U.return=n,o.return=n,U.sibling=o,n.child=U,o=n.child,o.memoizedState=Tf(s),o.childLanes=Af(e,y,s),n.memoizedState=bf,Mo(null,o)):(Ga(n),Rf(n,U))}var V=e.memoizedState;if(V!==null&&(U=V.dehydrated,U!==null)){if(h)n.flags&256?(Ga(n),n.flags&=-257,n=wf(e,n,s)):n.memoizedState!==null?(Va(),n.child=e.child,n.flags|=128,n=null):(Va(),U=o.fallback,u=n.mode,o=ql({mode:"visible",children:o.children},u),U=xs(U,u,s,null),U.flags|=2,o.return=n,U.return=n,o.sibling=U,n.child=o,As(n,e.child,null,s),o=n.child,o.memoizedState=Tf(s),o.childLanes=Af(e,y,s),n.memoizedState=bf,n=Mo(null,o));else if(Ga(n),lh(U)){if(y=U.nextSibling&&U.nextSibling.dataset,y)var rt=y.dgst;y=rt,o=Error(a(419)),o.stack="",o.digest=y,co({value:o,source:null,stack:null}),n=wf(e,n,s)}else if(pn||tr(e,n,s,!1),y=(s&e.childLanes)!==0,pn||y){if(y=Ye,y!==null&&(o=ri(y,s),o!==0&&o!==V.retryLane))throw V.retryLane=o,_s(e,o),ei(y,e,o),Mf;oh(U)||ec(),n=wf(e,n,s)}else oh(U)?(n.flags|=192,n.child=e.child,n=null):(e=V.treeContext,Qe=Ai(U.nextSibling),Un=n,Me=!0,Pa=null,bi=!1,e!==null&&om(n,e),n=Rf(n,o.children),n.flags|=4096);return n}return u?(Va(),U=o.fallback,u=n.mode,V=e.child,rt=V.sibling,o=na(V,{mode:"hidden",children:o.children}),o.subtreeFlags=V.subtreeFlags&65011712,rt!==null?U=na(rt,U):(U=xs(U,u,s,null),U.flags|=2),U.return=n,o.return=n,o.sibling=U,n.child=o,Mo(null,o),o=n.child,U=e.child.memoizedState,U===null?U=Tf(s):(u=U.cachePool,u!==null?(V=hn._currentValue,u=u.parent!==V?{parent:V,pool:V}:u):u=dm(),U={baseLanes:U.baseLanes|s,cachePool:u}),o.memoizedState=U,o.childLanes=Af(e,y,s),n.memoizedState=bf,Mo(e.child,o)):(Ga(n),s=e.child,e=s.sibling,s=na(s,{mode:"visible",children:o.children}),s.return=n,s.sibling=null,e!==null&&(y=n.deletions,y===null?(n.deletions=[e],n.flags|=16):y.push(e)),n.child=s,n.memoizedState=null,s)}function Rf(e,n){return n=ql({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function ql(e,n){return e=ci(22,e,null,n),e.lanes=0,e}function wf(e,n,s){return As(n,e.child,null,s),e=Rf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function A0(e,n,s){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Vu(e.return,n,s)}function Cf(e,n,s,o,u,h){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:u,treeForkCount:h}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=s,y.tailMode=u,y.treeForkCount=h)}function R0(e,n,s){var o=n.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var y=on.current,U=(y&2)!==0;if(U?(y=y&1|2,n.flags|=128):y&=1,gt(on,y),Nn(e,n,o,s),o=Me?lo:0,!U&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&A0(e,s,n);else if(e.tag===19)A0(e,s,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(s=n.child,u=null;s!==null;)e=s.alternate,e!==null&&Ol(e)===null&&(u=s),s=s.sibling;s=u,s===null?(u=n.child,n.child=null):(u=s.sibling,s.sibling=null),Cf(n,!1,u,s,h,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Ol(e)===null){n.child=u;break}e=u.sibling,u.sibling=s,s=u,u=e}Cf(n,!0,s,null,h,o);break;case"together":Cf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function la(e,n,s){if(e!==null&&(n.dependencies=e.dependencies),Wa|=n.lanes,(s&n.childLanes)===0)if(e!==null){if(tr(e,n,s,!1),(s&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(a(153));if(n.child!==null){for(e=n.child,s=na(e,e.pendingProps),n.child=s,s.return=n;e.sibling!==null;)e=e.sibling,s=s.sibling=na(e,e.pendingProps),s.return=n;s.sibling=null}return n.child}function Df(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Al(e)))}function _S(e,n,s){switch(n.tag){case 3:vt(n,n.stateNode.containerInfo),Ba(n,hn,e.memoizedState.cache),Ss();break;case 27:case 5:te(n);break;case 4:vt(n,n.stateNode.containerInfo);break;case 10:Ba(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,tf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Ga(n),n.flags|=128,null):(s&n.child.childLanes)!==0?T0(e,n,s):(Ga(n),e=la(e,n,s),e!==null?e.sibling:null);Ga(n);break;case 19:var u=(e.flags&128)!==0;if(o=(s&n.childLanes)!==0,o||(tr(e,n,s,!1),o=(s&n.childLanes)!==0),u){if(o)return R0(e,n,s);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),gt(on,on.current),o)break;return null;case 22:return n.lanes=0,x0(e,n,s,n.pendingProps);case 24:Ba(n,hn,e.memoizedState.cache)}return la(e,n,s)}function w0(e,n,s){if(e!==null)if(e.memoizedProps!==n.pendingProps)pn=!0;else{if(!Df(e,s)&&(n.flags&128)===0)return pn=!1,_S(e,n,s);pn=(e.flags&131072)!==0}else pn=!1,Me&&(n.flags&1048576)!==0&&rm(n,lo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=bs(n.elementType),n.type=e,typeof e=="function")Ou(e)?(o=ws(e,o),n.tag=1,n=E0(null,n,e,o,s)):(n.tag=0,n=Ef(null,n,e,o,s));else{if(e!=null){var u=e.$$typeof;if(u===A){n.tag=11,n=g0(null,n,e,o,s);break t}else if(u===D){n.tag=14,n=v0(null,n,e,o,s);break t}}throw n=X(e)||e,Error(a(306,n,""))}}return n;case 0:return Ef(e,n,n.type,n.pendingProps,s);case 1:return o=n.type,u=ws(o,n.pendingProps),E0(e,n,o,u,s);case 3:t:{if(vt(n,n.stateNode.containerInfo),e===null)throw Error(a(387));o=n.pendingProps;var h=n.memoizedState;u=h.element,Ku(e,n),vo(n,o,null,s);var y=n.memoizedState;if(o=y.cache,Ba(n,hn,o),o!==h.cache&&ku(n,[hn],s,!0),go(),o=y.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=b0(e,n,o,s);break t}else if(o!==u){u=yi(Error(a(424)),n),co(u),n=b0(e,n,o,s);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Qe=Ai(e.firstChild),Un=n,Me=!0,Pa=null,bi=!0,s=xm(n,null,o,s),n.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Ss(),o===u){n=la(e,n,s);break t}Nn(e,n,o,s)}n=n.child}return n;case 26:return Wl(e,n),e===null?(s=Fg(n.type,null,n.pendingProps,null))?n.memoizedState=s:Me||(s=n.type,e=n.pendingProps,o=lc(kt.current).createElement(s),o[cn]=n,o[Dn]=e,On(o,s,e),un(o),n.stateNode=o):n.memoizedState=Fg(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return te(n),e===null&&Me&&(o=n.stateNode=zg(n.type,n.pendingProps,kt.current),Un=n,bi=!0,u=Qe,Qa(n.type)?(ch=u,Qe=Ai(o.firstChild)):Qe=u),Nn(e,n,n.pendingProps.children,s),Wl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Me&&((u=o=Qe)&&(o=ZS(o,n.type,n.pendingProps,bi),o!==null?(n.stateNode=o,Un=n,Qe=Ai(o.firstChild),bi=!1,u=!0):u=!1),u||za(n)),te(n),u=n.type,h=n.pendingProps,y=e!==null?e.memoizedProps:null,o=h.children,ah(u,h)?o=null:y!==null&&ah(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=nf(e,n,cS,null,null,s),Bo._currentValue=u),Wl(e,n),Nn(e,n,o,s),n.child;case 6:return e===null&&Me&&((e=s=Qe)&&(s=KS(s,n.pendingProps,bi),s!==null?(n.stateNode=s,Un=n,Qe=null,e=!0):e=!1),e||za(n)),null;case 13:return T0(e,n,s);case 4:return vt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=As(n,null,o,s):Nn(e,n,o,s),n.child;case 11:return g0(e,n,n.type,n.pendingProps,s);case 7:return Nn(e,n,n.pendingProps,s),n.child;case 8:return Nn(e,n,n.pendingProps.children,s),n.child;case 12:return Nn(e,n,n.pendingProps.children,s),n.child;case 10:return o=n.pendingProps,Ba(n,n.type,o.value),Nn(e,n,o.children,s),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Ms(n),u=Ln(u),o=o(u),n.flags|=1,Nn(e,n,o,s),n.child;case 14:return v0(e,n,n.type,n.pendingProps,s);case 15:return _0(e,n,n.type,n.pendingProps,s);case 19:return R0(e,n,s);case 31:return vS(e,n,s);case 22:return x0(e,n,s,n.pendingProps);case 24:return Ms(n),o=Ln(hn),e===null?(u=qu(),u===null&&(u=Ye,h=Xu(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=s),u=h),n.memoizedState={parent:o,cache:u},Zu(n),Ba(n,hn,u)):((e.lanes&s)!==0&&(Ku(e,n),vo(n,null,null,s),go()),u=e.memoizedState,h=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ba(n,hn,o)):(o=h.cache,Ba(n,hn,o),o!==u.cache&&ku(n,[hn],s,!0))),Nn(e,n,n.pendingProps.children,s),n.child;case 29:throw n.pendingProps}throw Error(a(156,n.tag))}function ca(e){e.flags|=4}function Uf(e,n,s,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(eg())e.flags|=8192;else throw Ts=Dl,Yu}else e.flags&=-16777217}function C0(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Xg(n))if(eg())e.flags|=8192;else throw Ts=Dl,Yu}function Yl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Mt():536870912,e.lanes|=n,hr|=n)}function Eo(e,n){if(!Me)switch(e.tailMode){case"hidden":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Je(e){var n=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(n)for(var u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=s,n}function xS(e,n,s){var o=n.pendingProps;switch(Iu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Je(n),null;case 1:return Je(n),null;case 3:return s=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),sa(hn),Tt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&($s(n)?ca(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Hu())),Je(n),null;case 26:var u=n.type,h=n.memoizedState;return e===null?(ca(n),h!==null?(Je(n),C0(n,h)):(Je(n),Uf(n,u,null,o,s))):h?h!==e.memoizedState?(ca(n),Je(n),C0(n,h)):(Je(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&ca(n),Je(n),Uf(n,u,e,o,s)),null;case 27:if(Ft(n),s=kt.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ca(n);else{if(!o){if(n.stateNode===null)throw Error(a(166));return Je(n),null}e=Et.current,$s(n)?lm(n):(e=zg(u,o,s),n.stateNode=e,ca(n))}return Je(n),null;case 5:if(Ft(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ca(n);else{if(!o){if(n.stateNode===null)throw Error(a(166));return Je(n),null}if(h=Et.current,$s(n))lm(n);else{var y=lc(kt.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}h[cn]=n,h[Dn]=o;t:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break t;for(;y.sibling===null;){if(y.return===null||y.return===n)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=h;t:switch(On(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ca(n)}}return Je(n),Uf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,s),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&ca(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(a(166));if(e=kt.current,$s(n)){if(e=n.stateNode,s=n.memoizedProps,o=null,u=Un,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[cn]=n,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||Tg(e.nodeValue,s)),e||za(n,!0)}else e=lc(e).createTextNode(o),e[cn]=n,n.stateNode=e}return Je(n),null;case 31:if(s=n.memoizedState,e===null||e.memoizedState!==null){if(o=$s(n),s!==null){if(e===null){if(!o)throw Error(a(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[cn]=n}else Ss(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Je(n),e=!1}else s=Hu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return n.flags&256?(fi(n),n):(fi(n),null);if((n.flags&128)!==0)throw Error(a(558))}return Je(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=$s(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(a(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(a(317));u[cn]=n}else Ss(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Je(n),u=!1}else u=Hu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(fi(n),n):(fi(n),null)}return fi(n),(n.flags&128)!==0?(n.lanes=s,n):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),s!==e&&s&&(n.child.flags|=8192),Yl(n,n.updateQueue),Je(n),null);case 4:return Tt(),e===null&&$f(n.stateNode.containerInfo),Je(n),null;case 10:return sa(n.type),Je(n),null;case 19:if(tt(on),o=n.memoizedState,o===null)return Je(n),null;if(u=(n.flags&128)!==0,h=o.rendering,h===null)if(u)Eo(o,!1);else{if(rn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=Ol(e),h!==null){for(n.flags|=128,Eo(o,!1),e=h.updateQueue,n.updateQueue=e,Yl(n,e),n.subtreeFlags=0,e=s,s=n.child;s!==null;)im(s,e),s=s.sibling;return gt(on,on.current&1|2),Me&&ia(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&Oe()>jl&&(n.flags|=128,u=!0,Eo(o,!1),n.lanes=4194304)}else{if(!u)if(e=Ol(h),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Yl(n,e),Eo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Me)return Je(n),null}else 2*Oe()-o.renderingStartTime>jl&&s!==536870912&&(n.flags|=128,u=!0,Eo(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(e=o.last,e!==null?e.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Oe(),e.sibling=null,s=on.current,gt(on,u?s&1|2:s&1),Me&&ia(n,o.treeForkCount),e):(Je(n),null);case 22:case 23:return fi(n),$u(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(s&536870912)!==0&&(n.flags&128)===0&&(Je(n),n.subtreeFlags&6&&(n.flags|=8192)):Je(n),s=n.updateQueue,s!==null&&Yl(n,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==s&&(n.flags|=2048),e!==null&&tt(Es),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),sa(hn),Je(n),null;case 25:return null;case 30:return null}throw Error(a(156,n.tag))}function SS(e,n){switch(Iu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return sa(hn),Tt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Ft(n),null;case 31:if(n.memoizedState!==null){if(fi(n),n.alternate===null)throw Error(a(340));Ss()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(fi(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(a(340));Ss()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return tt(on),null;case 4:return Tt(),null;case 10:return sa(n.type),null;case 22:case 23:return fi(n),$u(),e!==null&&tt(Es),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return sa(hn),null;case 25:return null;default:return null}}function D0(e,n){switch(Iu(n),n.tag){case 3:sa(hn),Tt();break;case 26:case 27:case 5:Ft(n);break;case 4:Tt();break;case 31:n.memoizedState!==null&&fi(n);break;case 13:fi(n);break;case 19:tt(on);break;case 10:sa(n.type);break;case 22:case 23:fi(n),$u(),e!==null&&tt(Es);break;case 24:sa(hn)}}function bo(e,n){try{var s=n.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var u=o.next;s=u;do{if((s.tag&e)===e){o=void 0;var h=s.create,y=s.inst;o=h(),y.destroy=o}s=s.next}while(s!==u)}}catch(U){ze(n,n.return,U)}}function ka(e,n,s){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var y=o.inst,U=y.destroy;if(U!==void 0){y.destroy=void 0,u=n;var V=s,rt=U;try{rt()}catch(_t){ze(u,V,_t)}}}o=o.next}while(o!==h)}}catch(_t){ze(n,n.return,_t)}}function U0(e){var n=e.updateQueue;if(n!==null){var s=e.stateNode;try{ym(n,s)}catch(o){ze(e,e.return,o)}}}function L0(e,n,s){s.props=ws(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){ze(e,n,o)}}function To(e,n){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(u){ze(e,n,u)}}function Xi(e,n){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(u){ze(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){ze(e,n,u)}else s.current=null}function N0(e){var n=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(u){ze(e,e.return,u)}}function Lf(e,n,s){try{var o=e.stateNode;VS(o,e.type,s,n),o[Dn]=n}catch(u){ze(e,e.return,u)}}function O0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Qa(e.type)||e.tag===4}function Nf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||O0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Qa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Of(e,n,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,n):(n=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,n.appendChild(e),s=s._reactRootContainer,s!=null||n.onclick!==null||(n.onclick=xi));else if(o!==4&&(o===27&&Qa(e.type)&&(s=e.stateNode,n=null),e=e.child,e!==null))for(Of(e,n,s),e=e.sibling;e!==null;)Of(e,n,s),e=e.sibling}function Zl(e,n,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?s.insertBefore(e,n):s.appendChild(e);else if(o!==4&&(o===27&&Qa(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(Zl(e,n,s),e=e.sibling;e!==null;)Zl(e,n,s),e=e.sibling}function P0(e){var n=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);On(n,o,s),n[cn]=e,n[Dn]=s}catch(h){ze(e,e.return,h)}}var ua=!1,mn=!1,Pf=!1,z0=typeof WeakSet=="function"?WeakSet:Set,Rn=null;function yS(e,n){if(e=e.containerInfo,nh=mc,e=Zp(e),Ru(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{s.nodeType,h.nodeType}catch{s=null;break t}var y=0,U=-1,V=-1,rt=0,_t=0,yt=e,ct=null;e:for(;;){for(var ht;yt!==s||u!==0&&yt.nodeType!==3||(U=y+u),yt!==h||o!==0&&yt.nodeType!==3||(V=y+o),yt.nodeType===3&&(y+=yt.nodeValue.length),(ht=yt.firstChild)!==null;)ct=yt,yt=ht;for(;;){if(yt===e)break e;if(ct===s&&++rt===u&&(U=y),ct===h&&++_t===o&&(V=y),(ht=yt.nextSibling)!==null)break;yt=ct,ct=yt.parentNode}yt=ht}s=U===-1||V===-1?null:{start:U,end:V}}else s=null}s=s||{start:0,end:0}}else s=null;for(ih={focusedElem:e,selectionRange:s},mc=!1,Rn=n;Rn!==null;)if(n=Rn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Rn=e;else for(;Rn!==null;){switch(n=Rn,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)u=e[s],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,s=n,u=h.memoizedProps,h=h.memoizedState,o=s.stateNode;try{var qt=ws(s.type,u);e=o.getSnapshotBeforeUpdate(qt,h),o.__reactInternalSnapshotBeforeUpdate=e}catch($t){ze(s,s.return,$t)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,s=e.nodeType,s===9)rh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":rh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=n.sibling,e!==null){e.return=n.return,Rn=e;break}Rn=n.return}}function B0(e,n,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:ha(e,s),o&4&&bo(5,s);break;case 1:if(ha(e,s),o&4)if(e=s.stateNode,n===null)try{e.componentDidMount()}catch(y){ze(s,s.return,y)}else{var u=ws(s.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(y){ze(s,s.return,y)}}o&64&&U0(s),o&512&&To(s,s.return);break;case 3:if(ha(e,s),o&64&&(e=s.updateQueue,e!==null)){if(n=null,s.child!==null)switch(s.child.tag){case 27:case 5:n=s.child.stateNode;break;case 1:n=s.child.stateNode}try{ym(e,n)}catch(y){ze(s,s.return,y)}}break;case 27:n===null&&o&4&&P0(s);case 26:case 5:ha(e,s),n===null&&o&4&&N0(s),o&512&&To(s,s.return);break;case 12:ha(e,s);break;case 31:ha(e,s),o&4&&H0(e,s);break;case 13:ha(e,s),o&4&&G0(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=DS.bind(null,s),QS(e,s))));break;case 22:if(o=s.memoizedState!==null||ua,!o){n=n!==null&&n.memoizedState!==null||mn,u=ua;var h=mn;ua=o,(mn=n)&&!h?da(e,s,(s.subtreeFlags&8772)!==0):ha(e,s),ua=u,mn=h}break;case 30:break;default:ha(e,s)}}function I0(e){var n=e.alternate;n!==null&&(e.alternate=null,I0(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Da(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,Jn=!1;function fa(e,n,s){for(s=s.child;s!==null;)F0(e,n,s),s=s.sibling}function F0(e,n,s){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(pt,s)}catch{}switch(s.tag){case 26:mn||Xi(s,n),fa(e,n,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:mn||Xi(s,n);var o=$e,u=Jn;Qa(s.type)&&($e=s.stateNode,Jn=!1),fa(e,n,s),Oo(s.stateNode),$e=o,Jn=u;break;case 5:mn||Xi(s,n);case 6:if(o=$e,u=Jn,$e=null,fa(e,n,s),$e=o,Jn=u,$e!==null)if(Jn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(s.stateNode)}catch(h){ze(s,n,h)}else try{$e.removeChild(s.stateNode)}catch(h){ze(s,n,h)}break;case 18:$e!==null&&(Jn?(e=$e,Ug(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Sr(e)):Ug($e,s.stateNode));break;case 4:o=$e,u=Jn,$e=s.stateNode.containerInfo,Jn=!0,fa(e,n,s),$e=o,Jn=u;break;case 0:case 11:case 14:case 15:ka(2,s,n),mn||ka(4,s,n),fa(e,n,s);break;case 1:mn||(Xi(s,n),o=s.stateNode,typeof o.componentWillUnmount=="function"&&L0(s,n,o)),fa(e,n,s);break;case 21:fa(e,n,s);break;case 22:mn=(o=mn)||s.memoizedState!==null,fa(e,n,s),mn=o;break;default:fa(e,n,s)}}function H0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Sr(e)}catch(s){ze(n,n.return,s)}}}function G0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Sr(e)}catch(s){ze(n,n.return,s)}}function MS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new z0),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new z0),n;default:throw Error(a(435,e.tag))}}function Kl(e,n){var s=MS(e);n.forEach(function(o){if(!s.has(o)){s.add(o);var u=US.bind(null,e,o);o.then(u,u)}})}function jn(e,n){var s=n.deletions;if(s!==null)for(var o=0;o<s.length;o++){var u=s[o],h=e,y=n,U=y;t:for(;U!==null;){switch(U.tag){case 27:if(Qa(U.type)){$e=U.stateNode,Jn=!1;break t}break;case 5:$e=U.stateNode,Jn=!1;break t;case 3:case 4:$e=U.stateNode.containerInfo,Jn=!0;break t}U=U.return}if($e===null)throw Error(a(160));F0(h,y,u),$e=null,Jn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)V0(n,e),n=n.sibling}var Ni=null;function V0(e,n){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:jn(n,e),$n(e),o&4&&(ka(3,e,e.return),bo(3,e),ka(5,e,e.return));break;case 1:jn(n,e),$n(e),o&512&&(mn||s===null||Xi(s,s.return)),o&64&&ua&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var u=Ni;if(jn(n,e),$n(e),o&512&&(mn||s===null||Xi(s,s.return)),o&4){var h=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[Ca]||h[cn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),On(h,o,s),h[cn]=e,un(h),o=h;break t;case"link":var y=Vg("link","href",u).get(o+(s.href||""));if(y){for(var U=0;U<y.length;U++)if(h=y[U],h.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&h.getAttribute("rel")===(s.rel==null?null:s.rel)&&h.getAttribute("title")===(s.title==null?null:s.title)&&h.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){y.splice(U,1);break e}}h=u.createElement(o),On(h,o,s),u.head.appendChild(h);break;case"meta":if(y=Vg("meta","content",u).get(o+(s.content||""))){for(U=0;U<y.length;U++)if(h=y[U],h.getAttribute("content")===(s.content==null?null:""+s.content)&&h.getAttribute("name")===(s.name==null?null:s.name)&&h.getAttribute("property")===(s.property==null?null:s.property)&&h.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&h.getAttribute("charset")===(s.charSet==null?null:s.charSet)){y.splice(U,1);break e}}h=u.createElement(o),On(h,o,s),u.head.appendChild(h);break;default:throw Error(a(468,o))}h[cn]=e,un(h),o=h}e.stateNode=o}else kg(u,e.type,e.stateNode);else e.stateNode=Gg(u,o,e.memoizedProps);else h!==o?(h===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):h.count--,o===null?kg(u,e.type,e.stateNode):Gg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Lf(e,e.memoizedProps,s.memoizedProps)}break;case 27:jn(n,e),$n(e),o&512&&(mn||s===null||Xi(s,s.return)),s!==null&&o&4&&Lf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(jn(n,e),$n(e),o&512&&(mn||s===null||Xi(s,s.return)),e.flags&32){u=e.stateNode;try{kn(u,"")}catch(qt){ze(e,e.return,qt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Lf(e,u,s!==null?s.memoizedProps:u)),o&1024&&(Pf=!0);break;case 6:if(jn(n,e),$n(e),o&4){if(e.stateNode===null)throw Error(a(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(qt){ze(e,e.return,qt)}}break;case 3:if(fc=null,u=Ni,Ni=cc(n.containerInfo),jn(n,e),Ni=u,$n(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{Sr(n.containerInfo)}catch(qt){ze(e,e.return,qt)}Pf&&(Pf=!1,k0(e));break;case 4:o=Ni,Ni=cc(e.stateNode.containerInfo),jn(n,e),$n(e),Ni=o;break;case 12:jn(n,e),$n(e);break;case 31:jn(n,e),$n(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 13:jn(n,e),$n(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Jl=Oe()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 22:u=e.memoizedState!==null;var V=s!==null&&s.memoizedState!==null,rt=ua,_t=mn;if(ua=rt||u,mn=_t||V,jn(n,e),mn=_t,ua=rt,$n(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(s===null||V||ua||mn||Cs(e)),s=null,n=e;;){if(n.tag===5||n.tag===26){if(s===null){V=s=n;try{if(h=V.stateNode,u)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{U=V.stateNode;var yt=V.memoizedProps.style,ct=yt!=null&&yt.hasOwnProperty("display")?yt.display:null;U.style.display=ct==null||typeof ct=="boolean"?"":(""+ct).trim()}}catch(qt){ze(V,V.return,qt)}}}else if(n.tag===6){if(s===null){V=n;try{V.stateNode.nodeValue=u?"":V.memoizedProps}catch(qt){ze(V,V.return,qt)}}}else if(n.tag===18){if(s===null){V=n;try{var ht=V.stateNode;u?Lg(ht,!0):Lg(V.stateNode,!1)}catch(qt){ze(V,V.return,qt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;s===n&&(s=null),n=n.return}s===n&&(s=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,Kl(e,s))));break;case 19:jn(n,e),$n(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 30:break;case 21:break;default:jn(n,e),$n(e)}}function $n(e){var n=e.flags;if(n&2){try{for(var s,o=e.return;o!==null;){if(O0(o)){s=o;break}o=o.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var u=s.stateNode,h=Nf(e);Zl(e,h,u);break;case 5:var y=s.stateNode;s.flags&32&&(kn(y,""),s.flags&=-33);var U=Nf(e);Zl(e,U,y);break;case 3:case 4:var V=s.stateNode.containerInfo,rt=Nf(e);Of(e,rt,V);break;default:throw Error(a(161))}}catch(_t){ze(e,e.return,_t)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function k0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;k0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ha(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)B0(e,n.alternate,n),n=n.sibling}function Cs(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:ka(4,n,n.return),Cs(n);break;case 1:Xi(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&L0(n,n.return,s),Cs(n);break;case 27:Oo(n.stateNode);case 26:case 5:Xi(n,n.return),Cs(n);break;case 22:n.memoizedState===null&&Cs(n);break;case 30:Cs(n);break;default:Cs(n)}e=e.sibling}}function da(e,n,s){for(s=s&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,h=n,y=h.flags;switch(h.tag){case 0:case 11:case 15:da(u,h,s),bo(4,h);break;case 1:if(da(u,h,s),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(rt){ze(o,o.return,rt)}if(o=h,u=o.updateQueue,u!==null){var U=o.stateNode;try{var V=u.shared.hiddenCallbacks;if(V!==null)for(u.shared.hiddenCallbacks=null,u=0;u<V.length;u++)Sm(V[u],U)}catch(rt){ze(o,o.return,rt)}}s&&y&64&&U0(h),To(h,h.return);break;case 27:P0(h);case 26:case 5:da(u,h,s),s&&o===null&&y&4&&N0(h),To(h,h.return);break;case 12:da(u,h,s);break;case 31:da(u,h,s),s&&y&4&&H0(u,h);break;case 13:da(u,h,s),s&&y&4&&G0(u,h);break;case 22:h.memoizedState===null&&da(u,h,s),To(h,h.return);break;case 30:break;default:da(u,h,s)}n=n.sibling}}function zf(e,n){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&uo(s))}function Bf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&uo(e))}function Oi(e,n,s,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)X0(e,n,s,o),n=n.sibling}function X0(e,n,s,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Oi(e,n,s,o),u&2048&&bo(9,n);break;case 1:Oi(e,n,s,o);break;case 3:Oi(e,n,s,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&uo(e)));break;case 12:if(u&2048){Oi(e,n,s,o),e=n.stateNode;try{var h=n.memoizedProps,y=h.id,U=h.onPostCommit;typeof U=="function"&&U(y,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(V){ze(n,n.return,V)}}else Oi(e,n,s,o);break;case 31:Oi(e,n,s,o);break;case 13:Oi(e,n,s,o);break;case 23:break;case 22:h=n.stateNode,y=n.alternate,n.memoizedState!==null?h._visibility&2?Oi(e,n,s,o):Ao(e,n):h._visibility&2?Oi(e,n,s,o):(h._visibility|=2,cr(e,n,s,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&zf(y,n);break;case 24:Oi(e,n,s,o),u&2048&&Bf(n.alternate,n);break;default:Oi(e,n,s,o)}}function cr(e,n,s,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,y=n,U=s,V=o,rt=y.flags;switch(y.tag){case 0:case 11:case 15:cr(h,y,U,V,u),bo(8,y);break;case 23:break;case 22:var _t=y.stateNode;y.memoizedState!==null?_t._visibility&2?cr(h,y,U,V,u):Ao(h,y):(_t._visibility|=2,cr(h,y,U,V,u)),u&&rt&2048&&zf(y.alternate,y);break;case 24:cr(h,y,U,V,u),u&&rt&2048&&Bf(y.alternate,y);break;default:cr(h,y,U,V,u)}n=n.sibling}}function Ao(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var s=e,o=n,u=o.flags;switch(o.tag){case 22:Ao(s,o),u&2048&&zf(o.alternate,o);break;case 24:Ao(s,o),u&2048&&Bf(o.alternate,o);break;default:Ao(s,o)}n=n.sibling}}var Ro=8192;function ur(e,n,s){if(e.subtreeFlags&Ro)for(e=e.child;e!==null;)W0(e,n,s),e=e.sibling}function W0(e,n,s){switch(e.tag){case 26:ur(e,n,s),e.flags&Ro&&e.memoizedState!==null&&ly(s,Ni,e.memoizedState,e.memoizedProps);break;case 5:ur(e,n,s);break;case 3:case 4:var o=Ni;Ni=cc(e.stateNode.containerInfo),ur(e,n,s),Ni=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Ro,Ro=16777216,ur(e,n,s),Ro=o):ur(e,n,s));break;default:ur(e,n,s)}}function q0(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function wo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var s=0;s<n.length;s++){var o=n[s];Rn=o,Z0(o,e)}q0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Y0(e),e=e.sibling}function Y0(e){switch(e.tag){case 0:case 11:case 15:wo(e),e.flags&2048&&ka(9,e,e.return);break;case 3:wo(e);break;case 12:wo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Ql(e)):wo(e);break;default:wo(e)}}function Ql(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var s=0;s<n.length;s++){var o=n[s];Rn=o,Z0(o,e)}q0(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:ka(8,n,n.return),Ql(n);break;case 22:s=n.stateNode,s._visibility&2&&(s._visibility&=-3,Ql(n));break;default:Ql(n)}e=e.sibling}}function Z0(e,n){for(;Rn!==null;){var s=Rn;switch(s.tag){case 0:case 11:case 15:ka(8,s,n);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:uo(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,Rn=o;else t:for(s=e;Rn!==null;){o=Rn;var u=o.sibling,h=o.return;if(I0(o),o===s){Rn=null;break t}if(u!==null){u.return=h,Rn=u;break t}Rn=h}}}var ES={getCacheForType:function(e){var n=Ln(hn),s=n.data.get(e);return s===void 0&&(s=e(),n.data.set(e,s)),s},cacheSignal:function(){return Ln(hn).controller.signal}},bS=typeof WeakMap=="function"?WeakMap:Map,Le=0,Ye=null,ve=null,Se=0,Pe=0,hi=null,Xa=!1,fr=!1,If=!1,pa=0,rn=0,Wa=0,Ds=0,Ff=0,di=0,hr=0,Co=null,ti=null,Hf=!1,Jl=0,K0=0,jl=1/0,$l=null,qa=null,yn=0,Ya=null,dr=null,ma=0,Gf=0,Vf=null,Q0=null,Do=0,kf=null;function pi(){return(Le&2)!==0&&Se!==0?Se&-Se:B.T!==null?Kf():Jr()}function J0(){if(di===0)if((Se&536870912)===0||Me){var e=ie;ie<<=1,(ie&3932160)===0&&(ie=262144),di=e}else di=536870912;return e=ui.current,e!==null&&(e.flags|=32),di}function ei(e,n,s){(e===Ye&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)&&(pr(e,0),Za(e,Se,di,!1)),Xt(e,s),((Le&2)===0||e!==Ye)&&(e===Ye&&((Le&2)===0&&(Ds|=s),rn===4&&Za(e,Se,di,!1)),Wi(e))}function j0(e,n,s){if((Le&6)!==0)throw Error(a(327));var o=!s&&(n&127)===0&&(n&e.expiredLanes)===0||wt(e,n),u=o?RS(e,n):Wf(e,n,!0),h=o;do{if(u===0){fr&&!o&&Za(e,n,0,!1);break}else{if(s=e.current.alternate,h&&!TS(s)){u=Wf(e,n,!1),h=!1;continue}if(u===2){if(h=n,e.errorRecoveryDisabledLanes&h)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;t:{var U=e;u=Co;var V=U.current.memoizedState.isDehydrated;if(V&&(pr(U,y).flags|=256),y=Wf(U,y,!1),y!==2){if(If&&!V){U.errorRecoveryDisabledLanes|=h,Ds|=h,u=4;break t}h=ti,ti=u,h!==null&&(ti===null?ti=h:ti.push.apply(ti,h))}u=y}if(h=!1,u!==2)continue}}if(u===1){pr(e,0),Za(e,n,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(a(345));case 4:if((n&4194048)!==n)break;case 6:Za(o,n,di,!Xa);break t;case 2:ti=null;break;case 3:case 5:break;default:throw Error(a(329))}if((n&62914560)===n&&(u=Jl+300-Oe(),10<u)){if(Za(o,n,di,!Xa),xt(o,0,!0)!==0)break t;ma=n,o.timeoutHandle=Cg($0.bind(null,o,s,ti,$l,Hf,n,di,Ds,hr,Xa,h,"Throttled",-0,0),u);break t}$0(o,s,ti,$l,Hf,n,di,Ds,hr,Xa,h,null,-0,0)}}break}while(!0);Wi(e)}function $0(e,n,s,o,u,h,y,U,V,rt,_t,yt,ct,ht){if(e.timeoutHandle=-1,yt=n.subtreeFlags,yt&8192||(yt&16785408)===16785408){yt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:xi},W0(n,h,yt);var qt=(h&62914560)===h?Jl-Oe():(h&4194048)===h?K0-Oe():0;if(qt=cy(yt,qt),qt!==null){ma=h,e.cancelPendingCommit=qt(og.bind(null,e,n,h,s,o,u,y,U,V,_t,yt,null,ct,ht)),Za(e,h,y,!rt);return}}og(e,n,h,s,o,u,y,U,V)}function TS(e){for(var n=e;;){var s=n.tag;if((s===0||s===11||s===15)&&n.flags&16384&&(s=n.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var u=s[o],h=u.getSnapshot;u=u.value;try{if(!li(h(),u))return!1}catch{return!1}}if(s=n.child,n.subtreeFlags&16384&&s!==null)s.return=n,n=s;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Za(e,n,s,o){n&=~Ff,n&=~Ds,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var h=31-Ht(u),y=1<<h;o[h]=-1,u&=~y}s!==0&&be(e,s,n)}function tc(){return(Le&6)===0?(Uo(0),!1):!0}function Xf(){if(ve!==null){if(Pe===0)var e=ve.return;else e=ve,aa=ys=null,rf(e),ar=null,ho=0,e=ve;for(;e!==null;)D0(e.alternate,e),e=e.return;ve=null}}function pr(e,n){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,WS(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ma=0,Xf(),Ye=e,ve=s=na(e.current,null),Se=n,Pe=0,hi=null,Xa=!1,fr=wt(e,n),If=!1,hr=di=Ff=Ds=Wa=rn=0,ti=Co=null,Hf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Ht(o),h=1<<u;n|=e[u],o&=~h}return pa=n,yl(),s}function tg(e,n){ce=null,B.H=yo,n===ir||n===Cl?(n=gm(),Pe=3):n===Yu?(n=gm(),Pe=4):Pe=n===Mf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,hi=n,ve===null&&(rn=1,kl(e,yi(n,e.current)))}function eg(){var e=ui.current;return e===null?!0:(Se&4194048)===Se?Ti===null:(Se&62914560)===Se||(Se&536870912)!==0?e===Ti:!1}function ng(){var e=B.H;return B.H=yo,e===null?yo:e}function ig(){var e=B.A;return B.A=ES,e}function ec(){rn=4,Xa||(Se&4194048)!==Se&&ui.current!==null||(fr=!0),(Wa&134217727)===0&&(Ds&134217727)===0||Ye===null||Za(Ye,Se,di,!1)}function Wf(e,n,s){var o=Le;Le|=2;var u=ng(),h=ig();(Ye!==e||Se!==n)&&($l=null,pr(e,n)),n=!1;var y=rn;t:do try{if(Pe!==0&&ve!==null){var U=ve,V=hi;switch(Pe){case 8:Xf(),y=6;break t;case 3:case 2:case 9:case 6:ui.current===null&&(n=!0);var rt=Pe;if(Pe=0,hi=null,mr(e,U,V,rt),s&&fr){y=0;break t}break;default:rt=Pe,Pe=0,hi=null,mr(e,U,V,rt)}}AS(),y=rn;break}catch(_t){tg(e,_t)}while(!0);return n&&e.shellSuspendCounter++,aa=ys=null,Le=o,B.H=u,B.A=h,ve===null&&(Ye=null,Se=0,yl()),y}function AS(){for(;ve!==null;)ag(ve)}function RS(e,n){var s=Le;Le|=2;var o=ng(),u=ig();Ye!==e||Se!==n?($l=null,jl=Oe()+500,pr(e,n)):fr=wt(e,n);t:do try{if(Pe!==0&&ve!==null){n=ve;var h=hi;e:switch(Pe){case 1:Pe=0,hi=null,mr(e,n,h,1);break;case 2:case 9:if(pm(h)){Pe=0,hi=null,sg(n);break}n=function(){Pe!==2&&Pe!==9||Ye!==e||(Pe=7),Wi(e)},h.then(n,n);break t;case 3:Pe=7;break t;case 4:Pe=5;break t;case 7:pm(h)?(Pe=0,hi=null,sg(n)):(Pe=0,hi=null,mr(e,n,h,7));break;case 5:var y=null;switch(ve.tag){case 26:y=ve.memoizedState;case 5:case 27:var U=ve;if(y?Xg(y):U.stateNode.complete){Pe=0,hi=null;var V=U.sibling;if(V!==null)ve=V;else{var rt=U.return;rt!==null?(ve=rt,nc(rt)):ve=null}break e}}Pe=0,hi=null,mr(e,n,h,5);break;case 6:Pe=0,hi=null,mr(e,n,h,6);break;case 8:Xf(),rn=6;break t;default:throw Error(a(462))}}wS();break}catch(_t){tg(e,_t)}while(!0);return aa=ys=null,B.H=o,B.A=u,Le=s,ve!==null?0:(Ye=null,Se=0,yl(),rn)}function wS(){for(;ve!==null&&!an();)ag(ve)}function ag(e){var n=w0(e.alternate,e,pa);e.memoizedProps=e.pendingProps,n===null?nc(e):ve=n}function sg(e){var n=e,s=n.alternate;switch(n.tag){case 15:case 0:n=M0(s,n,n.pendingProps,n.type,void 0,Se);break;case 11:n=M0(s,n,n.pendingProps,n.type.render,n.ref,Se);break;case 5:rf(n);default:D0(s,n),n=ve=im(n,pa),n=w0(s,n,pa)}e.memoizedProps=e.pendingProps,n===null?nc(e):ve=n}function mr(e,n,s,o){aa=ys=null,rf(n),ar=null,ho=0;var u=n.return;try{if(gS(e,u,n,s,Se)){rn=1,kl(e,yi(s,e.current)),ve=null;return}}catch(h){if(u!==null)throw ve=u,h;rn=1,kl(e,yi(s,e.current)),ve=null;return}n.flags&32768?(Me||o===1?e=!0:fr||(Se&536870912)!==0?e=!1:(Xa=e=!0,(o===2||o===9||o===3||o===6)&&(o=ui.current,o!==null&&o.tag===13&&(o.flags|=16384))),rg(n,e)):nc(n)}function nc(e){var n=e;do{if((n.flags&32768)!==0){rg(n,Xa);return}e=n.return;var s=xS(n.alternate,n,pa);if(s!==null){ve=s;return}if(n=n.sibling,n!==null){ve=n;return}ve=n=e}while(n!==null);rn===0&&(rn=5)}function rg(e,n){do{var s=SS(e.alternate,e);if(s!==null){s.flags&=32767,ve=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!n&&(e=e.sibling,e!==null)){ve=e;return}ve=e=s}while(e!==null);rn=6,ve=null}function og(e,n,s,o,u,h,y,U,V){e.cancelPendingCommit=null;do ic();while(yn!==0);if((Le&6)!==0)throw Error(a(327));if(n!==null){if(n===e.current)throw Error(a(177));if(h=n.lanes|n.childLanes,h|=Lu,Fe(e,s,h,y,U,V),e===Ye&&(ve=Ye=null,Se=0),dr=n,Ya=e,ma=s,Gf=h,Vf=u,Q0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,LS(j,function(){return hg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,u=W.p,W.p=2,y=Le,Le|=4;try{yS(e,n,s)}finally{Le=y,W.p=u,B.T=o}}yn=1,lg(),cg(),ug()}}function lg(){if(yn===1){yn=0;var e=Ya,n=dr,s=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||s){s=B.T,B.T=null;var o=W.p;W.p=2;var u=Le;Le|=4;try{V0(n,e);var h=ih,y=Zp(e.containerInfo),U=h.focusedElem,V=h.selectionRange;if(y!==U&&U&&U.ownerDocument&&Yp(U.ownerDocument.documentElement,U)){if(V!==null&&Ru(U)){var rt=V.start,_t=V.end;if(_t===void 0&&(_t=rt),"selectionStart"in U)U.selectionStart=rt,U.selectionEnd=Math.min(_t,U.value.length);else{var yt=U.ownerDocument||document,ct=yt&&yt.defaultView||window;if(ct.getSelection){var ht=ct.getSelection(),qt=U.textContent.length,$t=Math.min(V.start,qt),ke=V.end===void 0?$t:Math.min(V.end,qt);!ht.extend&&$t>ke&&(y=ke,ke=$t,$t=y);var Q=qp(U,$t),Y=qp(U,ke);if(Q&&Y&&(ht.rangeCount!==1||ht.anchorNode!==Q.node||ht.anchorOffset!==Q.offset||ht.focusNode!==Y.node||ht.focusOffset!==Y.offset)){var at=yt.createRange();at.setStart(Q.node,Q.offset),ht.removeAllRanges(),$t>ke?(ht.addRange(at),ht.extend(Y.node,Y.offset)):(at.setEnd(Y.node,Y.offset),ht.addRange(at))}}}}for(yt=[],ht=U;ht=ht.parentNode;)ht.nodeType===1&&yt.push({element:ht,left:ht.scrollLeft,top:ht.scrollTop});for(typeof U.focus=="function"&&U.focus(),U=0;U<yt.length;U++){var St=yt[U];St.element.scrollLeft=St.left,St.element.scrollTop=St.top}}mc=!!nh,ih=nh=null}finally{Le=u,W.p=o,B.T=s}}e.current=n,yn=2}}function cg(){if(yn===2){yn=0;var e=Ya,n=dr,s=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||s){s=B.T,B.T=null;var o=W.p;W.p=2;var u=Le;Le|=4;try{B0(e,n.alternate,n)}finally{Le=u,W.p=o,B.T=s}}yn=3}}function ug(){if(yn===4||yn===3){yn=0,K();var e=Ya,n=dr,s=ma,o=Q0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?yn=5:(yn=0,dr=Ya=null,fg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(qa=null),Qr(s),n=n.stateNode,mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(pt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=B.T,u=W.p,W.p=2,B.T=null;try{for(var h=e.onRecoverableError,y=0;y<o.length;y++){var U=o[y];h(U.value,{componentStack:U.stack})}}finally{B.T=n,W.p=u}}(ma&3)!==0&&ic(),Wi(e),u=e.pendingLanes,(s&261930)!==0&&(u&42)!==0?e===kf?Do++:(Do=0,kf=e):Do=0,Uo(0)}}function fg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,uo(n)))}function ic(){return lg(),cg(),ug(),hg()}function hg(){if(yn!==5)return!1;var e=Ya,n=Gf;Gf=0;var s=Qr(ma),o=B.T,u=W.p;try{W.p=32>s?32:s,B.T=null,s=Vf,Vf=null;var h=Ya,y=ma;if(yn=0,dr=Ya=null,ma=0,(Le&6)!==0)throw Error(a(331));var U=Le;if(Le|=4,Y0(h.current),X0(h,h.current,y,s),Le=U,Uo(0,!1),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(pt,h)}catch{}return!0}finally{W.p=u,B.T=o,fg(e,n)}}function dg(e,n,s){n=yi(s,n),n=yf(e.stateNode,n,2),e=Ha(e,n,2),e!==null&&(Xt(e,2),Wi(e))}function ze(e,n,s){if(e.tag===3)dg(e,e,s);else for(;n!==null;){if(n.tag===3){dg(n,e,s);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(qa===null||!qa.has(o))){e=yi(s,e),s=p0(2),o=Ha(n,s,2),o!==null&&(m0(s,o,n,e),Xt(o,2),Wi(o));break}}n=n.return}}function qf(e,n,s){var o=e.pingCache;if(o===null){o=e.pingCache=new bS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(s)||(If=!0,u.add(s),e=CS.bind(null,e,n,s),n.then(e,e))}function CS(e,n,s){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Ye===e&&(Se&s)===s&&(rn===4||rn===3&&(Se&62914560)===Se&&300>Oe()-Jl?(Le&2)===0&&pr(e,0):Ff|=s,hr===Se&&(hr=0)),Wi(e)}function pg(e,n){n===0&&(n=Mt()),e=_s(e,n),e!==null&&(Xt(e,n),Wi(e))}function DS(e){var n=e.memoizedState,s=0;n!==null&&(s=n.retryLane),pg(e,s)}function US(e,n){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(s=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(a(314))}o!==null&&o.delete(n),pg(e,s)}function LS(e,n){return An(e,n)}var ac=null,gr=null,Yf=!1,sc=!1,Zf=!1,Ka=0;function Wi(e){e!==gr&&e.next===null&&(gr===null?ac=gr=e:gr=gr.next=e),sc=!0,Yf||(Yf=!0,OS())}function Uo(e,n){if(!Zf&&sc){Zf=!0;do for(var s=!1,o=ac;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var y=o.suspendedLanes,U=o.pingedLanes;h=(1<<31-Ht(42|e)+1)-1,h&=u&~(y&~U),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(s=!0,_g(o,h))}else h=Se,h=xt(o,o===Ye?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||wt(o,h)||(s=!0,_g(o,h));o=o.next}while(s);Zf=!1}}function NS(){mg()}function mg(){sc=Yf=!1;var e=0;Ka!==0&&XS()&&(e=Ka);for(var n=Oe(),s=null,o=ac;o!==null;){var u=o.next,h=gg(o,n);h===0?(o.next=null,s===null?ac=u:s.next=u,u===null&&(gr=s)):(s=o,(e!==0||(h&3)!==0)&&(sc=!0)),o=u}yn!==0&&yn!==5||Uo(e),Ka!==0&&(Ka=0)}function gg(e,n){for(var s=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var y=31-Ht(h),U=1<<y,V=u[y];V===-1?((U&s)===0||(U&o)!==0)&&(u[y]=zt(U,n)):V<=n&&(e.expiredLanes|=U),h&=~U}if(n=Ye,s=Se,s=xt(e,e===n?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===n&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&We(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||wt(e,s)){if(n=s&-s,n===e.callbackPriority)return n;switch(o!==null&&We(o),Qr(s)){case 2:case 8:s=T;break;case 32:s=j;break;case 268435456:s=dt;break;default:s=j}return o=vg.bind(null,e),s=An(s,o),e.callbackPriority=n,e.callbackNode=s,n}return o!==null&&o!==null&&We(o),e.callbackPriority=2,e.callbackNode=null,2}function vg(e,n){if(yn!==0&&yn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(ic()&&e.callbackNode!==s)return null;var o=Se;return o=xt(e,e===Ye?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(j0(e,o,n),gg(e,Oe()),e.callbackNode!=null&&e.callbackNode===s?vg.bind(null,e):null)}function _g(e,n){if(ic())return null;j0(e,n,!0)}function OS(){qS(function(){(Le&6)!==0?An(I,NS):mg()})}function Kf(){if(Ka===0){var e=er;e===0&&(e=Jt,Jt<<=1,(Jt&261888)===0&&(Jt=256)),Ka=e}return Ka}function xg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ui(""+e)}function Sg(e,n){var s=n.ownerDocument.createElement("input");return s.name=n.name,s.value=n.value,e.id&&s.setAttribute("form",e.id),n.parentNode.insertBefore(s,n),e=new FormData(e),s.parentNode.removeChild(s),e}function PS(e,n,s,o,u){if(n==="submit"&&s&&s.stateNode===u){var h=xg((u[Dn]||null).action),y=o.submitter;y&&(n=(n=y[Dn]||null)?xg(n.formAction):y.getAttribute("formAction"),n!==null&&(h=n,y=null));var U=new vl("action","action",null,o,u);e.push({event:U,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ka!==0){var V=y?Sg(u,y):new FormData(u);mf(s,{pending:!0,data:V,method:u.method,action:h},null,V)}}else typeof h=="function"&&(U.preventDefault(),V=y?Sg(u,y):new FormData(u),mf(s,{pending:!0,data:V,method:u.method,action:h},h,V))},currentTarget:u}]})}}for(var Qf=0;Qf<Uu.length;Qf++){var Jf=Uu[Qf],zS=Jf.toLowerCase(),BS=Jf[0].toUpperCase()+Jf.slice(1);Li(zS,"on"+BS)}Li(Jp,"onAnimationEnd"),Li(jp,"onAnimationIteration"),Li($p,"onAnimationStart"),Li("dblclick","onDoubleClick"),Li("focusin","onFocus"),Li("focusout","onBlur"),Li($x,"onTransitionRun"),Li(tS,"onTransitionStart"),Li(eS,"onTransitionCancel"),Li(tm,"onTransitionEnd"),q("onMouseEnter",["mouseout","mouseover"]),q("onMouseLeave",["mouseout","mouseover"]),q("onPointerEnter",["pointerout","pointerover"]),q("onPointerLeave",["pointerout","pointerover"]),R("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),R("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),R("onBeforeInput",["compositionend","keypress","textInput","paste"]),R("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Lo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),IS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Lo));function yg(e,n){n=(n&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],u=o.event;o=o.listeners;t:{var h=void 0;if(n)for(var y=o.length-1;0<=y;y--){var U=o[y],V=U.instance,rt=U.currentTarget;if(U=U.listener,V!==h&&u.isPropagationStopped())break t;h=U,u.currentTarget=rt;try{h(u)}catch(_t){Sl(_t)}u.currentTarget=null,h=V}else for(y=0;y<o.length;y++){if(U=o[y],V=U.instance,rt=U.currentTarget,U=U.listener,V!==h&&u.isPropagationStopped())break t;h=U,u.currentTarget=rt;try{h(u)}catch(_t){Sl(_t)}u.currentTarget=null,h=V}}}}function _e(e,n){var s=n[hs];s===void 0&&(s=n[hs]=new Set);var o=e+"__bubble";s.has(o)||(Mg(n,e,2,!1),s.add(o))}function jf(e,n,s){var o=0;n&&(o|=4),Mg(s,e,o,n)}var rc="_reactListening"+Math.random().toString(36).slice(2);function $f(e){if(!e[rc]){e[rc]=!0,dl.forEach(function(s){s!=="selectionchange"&&(IS.has(s)||jf(s,!1,e),jf(s,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[rc]||(n[rc]=!0,jf("selectionchange",!1,n))}}function Mg(e,n,s,o){switch(Jg(n)){case 2:var u=hy;break;case 8:u=dy;break;default:u=ph}s=u.bind(null,n,s,e),u=void 0,!_u||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,s,{capture:!0,passive:u}):e.addEventListener(n,s,!0):u!==void 0?e.addEventListener(n,s,{passive:u}):e.addEventListener(n,s,!1)}function th(e,n,s,o,u){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var U=o.stateNode.containerInfo;if(U===u)break;if(y===4)for(y=o.return;y!==null;){var V=y.tag;if((V===3||V===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;U!==null;){if(y=$i(U),y===null)return;if(V=y.tag,V===5||V===6||V===26||V===27){o=h=y;continue t}U=U.parentNode}}o=o.return}Rp(function(){var rt=h,_t=gu(s),yt=[];t:{var ct=em.get(e);if(ct!==void 0){var ht=vl,qt=e;switch(e){case"keypress":if(ml(s)===0)break t;case"keydown":case"keyup":ht=Ux;break;case"focusin":qt="focus",ht=Mu;break;case"focusout":qt="blur",ht=Mu;break;case"beforeblur":case"afterblur":ht=Mu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ht=Dp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ht=xx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ht=Ox;break;case Jp:case jp:case $p:ht=Mx;break;case tm:ht=zx;break;case"scroll":case"scrollend":ht=vx;break;case"wheel":ht=Ix;break;case"copy":case"cut":case"paste":ht=bx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ht=Lp;break;case"toggle":case"beforetoggle":ht=Hx}var $t=(n&4)!==0,ke=!$t&&(e==="scroll"||e==="scrollend"),Q=$t?ct!==null?ct+"Capture":null:ct;$t=[];for(var Y=rt,at;Y!==null;){var St=Y;if(at=St.stateNode,St=St.tag,St!==5&&St!==26&&St!==27||at===null||Q===null||(St=$r(Y,Q),St!=null&&$t.push(No(Y,St,at))),ke)break;Y=Y.return}0<$t.length&&(ct=new ht(ct,qt,null,s,_t),yt.push({event:ct,listeners:$t}))}}if((n&7)===0){t:{if(ct=e==="mouseover"||e==="pointerover",ht=e==="mouseout"||e==="pointerout",ct&&s!==mu&&(qt=s.relatedTarget||s.fromElement)&&($i(qt)||qt[Kn]))break t;if((ht||ct)&&(ct=_t.window===_t?_t:(ct=_t.ownerDocument)?ct.defaultView||ct.parentWindow:window,ht?(qt=s.relatedTarget||s.toElement,ht=rt,qt=qt?$i(qt):null,qt!==null&&(ke=c(qt),$t=qt.tag,qt!==ke||$t!==5&&$t!==27&&$t!==6)&&(qt=null)):(ht=null,qt=rt),ht!==qt)){if($t=Dp,St="onMouseLeave",Q="onMouseEnter",Y="mouse",(e==="pointerout"||e==="pointerover")&&($t=Lp,St="onPointerLeave",Q="onPointerEnter",Y="pointer"),ke=ht==null?ct:ps(ht),at=qt==null?ct:ps(qt),ct=new $t(St,Y+"leave",ht,s,_t),ct.target=ke,ct.relatedTarget=at,St=null,$i(_t)===rt&&($t=new $t(Q,Y+"enter",qt,s,_t),$t.target=at,$t.relatedTarget=ke,St=$t),ke=St,ht&&qt)e:{for($t=FS,Q=ht,Y=qt,at=0,St=Q;St;St=$t(St))at++;St=0;for(var jt=Y;jt;jt=$t(jt))St++;for(;0<at-St;)Q=$t(Q),at--;for(;0<St-at;)Y=$t(Y),St--;for(;at--;){if(Q===Y||Y!==null&&Q===Y.alternate){$t=Q;break e}Q=$t(Q),Y=$t(Y)}$t=null}else $t=null;ht!==null&&Eg(yt,ct,ht,$t,!1),qt!==null&&ke!==null&&Eg(yt,ke,qt,$t,!0)}}t:{if(ct=rt?ps(rt):window,ht=ct.nodeName&&ct.nodeName.toLowerCase(),ht==="select"||ht==="input"&&ct.type==="file")var we=Hp;else if(Ip(ct))if(Gp)we=Qx;else{we=Zx;var Yt=Yx}else ht=ct.nodeName,!ht||ht.toLowerCase()!=="input"||ct.type!=="checkbox"&&ct.type!=="radio"?rt&&_i(rt.elementType)&&(we=Hp):we=Kx;if(we&&(we=we(e,rt))){Fp(yt,we,s,_t);break t}Yt&&Yt(e,ct,rt),e==="focusout"&&rt&&ct.type==="number"&&rt.memoizedProps.value!=null&&Sn(ct,"number",ct.value)}switch(Yt=rt?ps(rt):window,e){case"focusin":(Ip(Yt)||Yt.contentEditable==="true")&&(Ys=Yt,wu=rt,oo=null);break;case"focusout":oo=wu=Ys=null;break;case"mousedown":Cu=!0;break;case"contextmenu":case"mouseup":case"dragend":Cu=!1,Kp(yt,s,_t);break;case"selectionchange":if(jx)break;case"keydown":case"keyup":Kp(yt,s,_t)}var ue;if(bu)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else qs?zp(e,s)&&(ye="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(ye="onCompositionStart");ye&&(Np&&s.locale!=="ko"&&(qs||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&qs&&(ue=wp()):(Na=_t,xu="value"in Na?Na.value:Na.textContent,qs=!0)),Yt=oc(rt,ye),0<Yt.length&&(ye=new Up(ye,e,null,s,_t),yt.push({event:ye,listeners:Yt}),ue?ye.data=ue:(ue=Bp(s),ue!==null&&(ye.data=ue)))),(ue=Vx?kx(e,s):Xx(e,s))&&(ye=oc(rt,"onBeforeInput"),0<ye.length&&(Yt=new Up("onBeforeInput","beforeinput",null,s,_t),yt.push({event:Yt,listeners:ye}),Yt.data=ue)),PS(yt,e,rt,s,_t)}yg(yt,n)})}function No(e,n,s){return{instance:e,listener:n,currentTarget:s}}function oc(e,n){for(var s=n+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=$r(e,s),u!=null&&o.unshift(No(e,u,h)),u=$r(e,n),u!=null&&o.push(No(e,u,h))),e.tag===3)return o;e=e.return}return[]}function FS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Eg(e,n,s,o,u){for(var h=n._reactName,y=[];s!==null&&s!==o;){var U=s,V=U.alternate,rt=U.stateNode;if(U=U.tag,V!==null&&V===o)break;U!==5&&U!==26&&U!==27||rt===null||(V=rt,u?(rt=$r(s,h),rt!=null&&y.unshift(No(s,rt,V))):u||(rt=$r(s,h),rt!=null&&y.push(No(s,rt,V)))),s=s.return}y.length!==0&&e.push({event:n,listeners:y})}var HS=/\r\n?/g,GS=/\u0000|\uFFFD/g;function bg(e){return(typeof e=="string"?e:""+e).replace(HS,`
`).replace(GS,"")}function Tg(e,n){return n=bg(n),bg(e)===n}function Ve(e,n,s,o,u,h){switch(s){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||kn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&kn(e,""+o);break;case"className":Ut(e,"class",o);break;case"tabIndex":Ut(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ut(e,s,o);break;case"style":je(e,o,h);break;case"data":if(n!=="object"){Ut(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=Ui(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(s==="formAction"?(n!=="input"&&Ve(e,n,"name",u.name,u,null),Ve(e,n,"formEncType",u.formEncType,u,null),Ve(e,n,"formMethod",u.formMethod,u,null),Ve(e,n,"formTarget",u.formTarget,u,null)):(Ve(e,n,"encType",u.encType,u,null),Ve(e,n,"method",u.method,u,null),Ve(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=Ui(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=xi);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=Ui(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":_e("beforetoggle",e),_e("toggle",e),Gt(e,"popover",o);break;case"xlinkActuate":Bt(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Bt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Bt(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Bt(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Bt(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Bt(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Gt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=He.get(s)||s,Gt(e,s,o))}}function eh(e,n,s,o,u,h){switch(s){case"style":je(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof o=="string"?kn(e,o):(typeof o=="number"||typeof o=="bigint")&&kn(e,""+o);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"onClick":o!=null&&(e.onclick=xi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!jr.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),n=s.slice(2,u?s.length-7:void 0),h=e[Dn]||null,h=h!=null?h[s]:null,typeof h=="function"&&e.removeEventListener(n,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(n,o,u);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):Gt(e,s,o)}}}function On(e,n,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",e),_e("load",e);var o=!1,u=!1,h;for(h in s)if(s.hasOwnProperty(h)){var y=s[h];if(y!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,n));default:Ve(e,n,h,y,s,null)}}u&&Ve(e,n,"srcSet",s.srcSet,s,null),o&&Ve(e,n,"src",s.src,s,null);return;case"input":_e("invalid",e);var U=h=y=u=null,V=null,rt=null;for(o in s)if(s.hasOwnProperty(o)){var _t=s[o];if(_t!=null)switch(o){case"name":u=_t;break;case"type":y=_t;break;case"checked":V=_t;break;case"defaultChecked":rt=_t;break;case"value":h=_t;break;case"defaultValue":U=_t;break;case"children":case"dangerouslySetInnerHTML":if(_t!=null)throw Error(a(137,n));break;default:Ve(e,n,o,_t,s,null)}}Vt(e,h,U,V,rt,y,u,!1);return;case"select":_e("invalid",e),o=y=h=null;for(u in s)if(s.hasOwnProperty(u)&&(U=s[u],U!=null))switch(u){case"value":h=U;break;case"defaultValue":y=U;break;case"multiple":o=U;default:Ve(e,n,u,U,s,null)}n=h,s=y,e.multiple=!!o,n!=null?he(e,!!o,n,!1):s!=null&&he(e,!!o,s,!0);return;case"textarea":_e("invalid",e),h=u=o=null;for(y in s)if(s.hasOwnProperty(y)&&(U=s[y],U!=null))switch(y){case"value":o=U;break;case"defaultValue":u=U;break;case"children":h=U;break;case"dangerouslySetInnerHTML":if(U!=null)throw Error(a(91));break;default:Ve(e,n,y,U,s,null)}oi(e,o,u,h);return;case"option":for(V in s)if(s.hasOwnProperty(V)&&(o=s[V],o!=null))switch(V){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Ve(e,n,V,o,s,null)}return;case"dialog":_e("beforetoggle",e),_e("toggle",e),_e("cancel",e),_e("close",e);break;case"iframe":case"object":_e("load",e);break;case"video":case"audio":for(o=0;o<Lo.length;o++)_e(Lo[o],e);break;case"image":_e("error",e),_e("load",e);break;case"details":_e("toggle",e);break;case"embed":case"source":case"link":_e("error",e),_e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(rt in s)if(s.hasOwnProperty(rt)&&(o=s[rt],o!=null))switch(rt){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,n));default:Ve(e,n,rt,o,s,null)}return;default:if(_i(n)){for(_t in s)s.hasOwnProperty(_t)&&(o=s[_t],o!==void 0&&eh(e,n,_t,o,s,void 0));return}}for(U in s)s.hasOwnProperty(U)&&(o=s[U],o!=null&&Ve(e,n,U,o,s,null))}function VS(e,n,s,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,y=null,U=null,V=null,rt=null,_t=null;for(ht in s){var yt=s[ht];if(s.hasOwnProperty(ht)&&yt!=null)switch(ht){case"checked":break;case"value":break;case"defaultValue":V=yt;default:o.hasOwnProperty(ht)||Ve(e,n,ht,null,o,yt)}}for(var ct in o){var ht=o[ct];if(yt=s[ct],o.hasOwnProperty(ct)&&(ht!=null||yt!=null))switch(ct){case"type":h=ht;break;case"name":u=ht;break;case"checked":rt=ht;break;case"defaultChecked":_t=ht;break;case"value":y=ht;break;case"defaultValue":U=ht;break;case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(a(137,n));break;default:ht!==yt&&Ve(e,n,ct,ht,o,yt)}}fn(e,y,U,V,rt,_t,h,u);return;case"select":ht=y=U=ct=null;for(h in s)if(V=s[h],s.hasOwnProperty(h)&&V!=null)switch(h){case"value":break;case"multiple":ht=V;default:o.hasOwnProperty(h)||Ve(e,n,h,null,o,V)}for(u in o)if(h=o[u],V=s[u],o.hasOwnProperty(u)&&(h!=null||V!=null))switch(u){case"value":ct=h;break;case"defaultValue":U=h;break;case"multiple":y=h;default:h!==V&&Ve(e,n,u,h,o,V)}n=U,s=y,o=ht,ct!=null?he(e,!!s,ct,!1):!!o!=!!s&&(n!=null?he(e,!!s,n,!0):he(e,!!s,s?[]:"",!1));return;case"textarea":ht=ct=null;for(U in s)if(u=s[U],s.hasOwnProperty(U)&&u!=null&&!o.hasOwnProperty(U))switch(U){case"value":break;case"children":break;default:Ve(e,n,U,null,o,u)}for(y in o)if(u=o[y],h=s[y],o.hasOwnProperty(y)&&(u!=null||h!=null))switch(y){case"value":ct=u;break;case"defaultValue":ht=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(a(91));break;default:u!==h&&Ve(e,n,y,u,o,h)}Vn(e,ct,ht);return;case"option":for(var qt in s)if(ct=s[qt],s.hasOwnProperty(qt)&&ct!=null&&!o.hasOwnProperty(qt))switch(qt){case"selected":e.selected=!1;break;default:Ve(e,n,qt,null,o,ct)}for(V in o)if(ct=o[V],ht=s[V],o.hasOwnProperty(V)&&ct!==ht&&(ct!=null||ht!=null))switch(V){case"selected":e.selected=ct&&typeof ct!="function"&&typeof ct!="symbol";break;default:Ve(e,n,V,ct,o,ht)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var $t in s)ct=s[$t],s.hasOwnProperty($t)&&ct!=null&&!o.hasOwnProperty($t)&&Ve(e,n,$t,null,o,ct);for(rt in o)if(ct=o[rt],ht=s[rt],o.hasOwnProperty(rt)&&ct!==ht&&(ct!=null||ht!=null))switch(rt){case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(a(137,n));break;default:Ve(e,n,rt,ct,o,ht)}return;default:if(_i(n)){for(var ke in s)ct=s[ke],s.hasOwnProperty(ke)&&ct!==void 0&&!o.hasOwnProperty(ke)&&eh(e,n,ke,void 0,o,ct);for(_t in o)ct=o[_t],ht=s[_t],!o.hasOwnProperty(_t)||ct===ht||ct===void 0&&ht===void 0||eh(e,n,_t,ct,o,ht);return}}for(var Q in s)ct=s[Q],s.hasOwnProperty(Q)&&ct!=null&&!o.hasOwnProperty(Q)&&Ve(e,n,Q,null,o,ct);for(yt in o)ct=o[yt],ht=s[yt],!o.hasOwnProperty(yt)||ct===ht||ct==null&&ht==null||Ve(e,n,yt,ct,o,ht)}function Ag(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function kS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var u=s[o],h=u.transferSize,y=u.initiatorType,U=u.duration;if(h&&U&&Ag(y)){for(y=0,U=u.responseEnd,o+=1;o<s.length;o++){var V=s[o],rt=V.startTime;if(rt>U)break;var _t=V.transferSize,yt=V.initiatorType;_t&&Ag(yt)&&(V=V.responseEnd,y+=_t*(V<U?1:(U-rt)/(V-rt)))}if(--o,n+=8*(h+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var nh=null,ih=null;function lc(e){return e.nodeType===9?e:e.ownerDocument}function Rg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function wg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function ah(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var sh=null;function XS(){var e=window.event;return e&&e.type==="popstate"?e===sh?!1:(sh=e,!0):(sh=null,!1)}var Cg=typeof setTimeout=="function"?setTimeout:void 0,WS=typeof clearTimeout=="function"?clearTimeout:void 0,Dg=typeof Promise=="function"?Promise:void 0,qS=typeof queueMicrotask=="function"?queueMicrotask:typeof Dg<"u"?function(e){return Dg.resolve(null).then(e).catch(YS)}:Cg;function YS(e){setTimeout(function(){throw e})}function Qa(e){return e==="head"}function Ug(e,n){var s=n,o=0;do{var u=s.nextSibling;if(e.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(u),Sr(n);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")Oo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Oo(s);for(var h=s.firstChild;h;){var y=h.nextSibling,U=h.nodeName;h[Ca]||U==="SCRIPT"||U==="STYLE"||U==="LINK"&&h.rel.toLowerCase()==="stylesheet"||s.removeChild(h),h=y}}else s==="body"&&Oo(e.ownerDocument.body);s=u}while(s);Sr(n)}function Lg(e,n){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?n?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(n?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function rh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var s=n;switch(n=n.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":rh(s),Da(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function ZS(e,n,s,o){for(;e.nodeType===1;){var u=s;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Ca])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Ai(e.nextSibling),e===null)break}return null}function KS(e,n,s){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Ai(e.nextSibling),e===null))return null;return e}function Ng(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ai(e.nextSibling),e===null))return null;return e}function oh(e){return e.data==="$?"||e.data==="$~"}function lh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function QS(e,n){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||s.readyState!=="loading")n();else{var o=function(){n(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Ai(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var ch=null;function Og(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(n===0)return Ai(e.nextSibling);n--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||n++}e=e.nextSibling}return null}function Pg(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(n===0)return e;n--}else s!=="/$"&&s!=="/&"||n++}e=e.previousSibling}return null}function zg(e,n,s){switch(n=lc(s),e){case"html":if(e=n.documentElement,!e)throw Error(a(452));return e;case"head":if(e=n.head,!e)throw Error(a(453));return e;case"body":if(e=n.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Oo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Da(e)}var Ri=new Map,Bg=new Set;function cc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ga=W.d;W.d={f:JS,r:jS,D:$S,C:ty,L:ey,m:ny,X:ay,S:iy,M:sy};function JS(){var e=ga.f(),n=tc();return e||n}function jS(e){var n=ta(e);n!==null&&n.tag===5&&n.type==="form"?t0(n):ga.r(e)}var vr=typeof document>"u"?null:document;function Ig(e,n,s){var o=vr;if(o&&typeof n=="string"&&n){var u=fe(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),Bg.has(u)||(Bg.add(u),e={rel:e,crossOrigin:s,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),On(n,"link",e),un(n),o.head.appendChild(n)))}}function $S(e){ga.D(e),Ig("dns-prefetch",e,null)}function ty(e,n){ga.C(e,n),Ig("preconnect",e,n)}function ey(e,n,s){ga.L(e,n,s);var o=vr;if(o&&e&&n){var u='link[rel="preload"][as="'+fe(n)+'"]';n==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+fe(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+fe(s.imageSizes)+'"]')):u+='[href="'+fe(e)+'"]';var h=u;switch(n){case"style":h=_r(e);break;case"script":h=xr(e)}Ri.has(h)||(e=_({rel:"preload",href:n==="image"&&s&&s.imageSrcSet?void 0:e,as:n},s),Ri.set(h,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Po(h))||n==="script"&&o.querySelector(zo(h))||(n=o.createElement("link"),On(n,"link",e),un(n),o.head.appendChild(n)))}}function ny(e,n){ga.m(e,n);var s=vr;if(s&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+fe(o)+'"][href="'+fe(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=xr(e)}if(!Ri.has(h)&&(e=_({rel:"modulepreload",href:e},n),Ri.set(h,e),s.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(zo(h)))return}o=s.createElement("link"),On(o,"link",e),un(o),s.head.appendChild(o)}}}function iy(e,n,s){ga.S(e,n,s);var o=vr;if(o&&e){var u=Ua(o).hoistableStyles,h=_r(e);n=n||"default";var y=u.get(h);if(!y){var U={loading:0,preload:null};if(y=o.querySelector(Po(h)))U.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},s),(s=Ri.get(h))&&uh(e,s);var V=y=o.createElement("link");un(V),On(V,"link",e),V._p=new Promise(function(rt,_t){V.onload=rt,V.onerror=_t}),V.addEventListener("load",function(){U.loading|=1}),V.addEventListener("error",function(){U.loading|=2}),U.loading|=4,uc(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:U},u.set(h,y)}}}function ay(e,n){ga.X(e,n);var s=vr;if(s&&e){var o=Ua(s).hoistableScripts,u=xr(e),h=o.get(u);h||(h=s.querySelector(zo(u)),h||(e=_({src:e,async:!0},n),(n=Ri.get(u))&&fh(e,n),h=s.createElement("script"),un(h),On(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function sy(e,n){ga.M(e,n);var s=vr;if(s&&e){var o=Ua(s).hoistableScripts,u=xr(e),h=o.get(u);h||(h=s.querySelector(zo(u)),h||(e=_({src:e,async:!0,type:"module"},n),(n=Ri.get(u))&&fh(e,n),h=s.createElement("script"),un(h),On(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Fg(e,n,s,o){var u=(u=kt.current)?cc(u):null;if(!u)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(n=_r(s.href),s=Ua(u).hoistableStyles,o=s.get(n),o||(o={type:"style",instance:null,count:0,state:null},s.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=_r(s.href);var h=Ua(u).hoistableStyles,y=h.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,y),(h=u.querySelector(Po(e)))&&!h._p&&(y.instance=h,y.state.loading=5),Ri.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ri.set(e,s),h||ry(u,e,s,y.state))),n&&o===null)throw Error(a(528,""));return y}if(n&&o!==null)throw Error(a(529,""));return null;case"script":return n=s.async,s=s.src,typeof s=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=xr(s),s=Ua(u).hoistableScripts,o=s.get(n),o||(o={type:"script",instance:null,count:0,state:null},s.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function _r(e){return'href="'+fe(e)+'"'}function Po(e){return'link[rel="stylesheet"]['+e+"]"}function Hg(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function ry(e,n,s,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),On(n,"link",s),un(n),e.head.appendChild(n))}function xr(e){return'[src="'+fe(e)+'"]'}function zo(e){return"script[async]"+e}function Gg(e,n,s){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+fe(s.href)+'"]');if(o)return n.instance=o,un(o),o;var u=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),un(o),On(o,"style",u),uc(o,s.precedence,e),n.instance=o;case"stylesheet":u=_r(s.href);var h=e.querySelector(Po(u));if(h)return n.state.loading|=4,n.instance=h,un(h),h;o=Hg(s),(u=Ri.get(u))&&uh(o,u),h=(e.ownerDocument||e).createElement("link"),un(h);var y=h;return y._p=new Promise(function(U,V){y.onload=U,y.onerror=V}),On(h,"link",o),n.state.loading|=4,uc(h,s.precedence,e),n.instance=h;case"script":return h=xr(s.src),(u=e.querySelector(zo(h)))?(n.instance=u,un(u),u):(o=s,(u=Ri.get(h))&&(o=_({},s),fh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),un(u),On(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(a(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,uc(o,s.precedence,e));return n.instance}function uc(e,n,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,y=0;y<o.length;y++){var U=o[y];if(U.dataset.precedence===n)h=U;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=s.nodeType===9?s.head:s,n.insertBefore(e,n.firstChild))}function uh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function fh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var fc=null;function Vg(e,n,s){if(fc===null){var o=new Map,u=fc=new Map;u.set(s,o)}else u=fc,o=u.get(s),o||(o=new Map,u.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),u=0;u<s.length;u++){var h=s[u];if(!(h[Ca]||h[cn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(n)||"";y=e+y;var U=o.get(y);U?U.push(h):o.set(y,[h])}}return o}function kg(e,n,s){e=e.ownerDocument||e,e.head.insertBefore(s,n==="title"?e.querySelector("head > title"):null)}function oy(e,n,s){if(s===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Xg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function ly(e,n,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var u=_r(o.href),h=n.querySelector(Po(u));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=hc.bind(e),n.then(e,e)),s.state.loading|=4,s.instance=h,un(h);return}h=n.ownerDocument||n,o=Hg(o),(u=Ri.get(u))&&uh(o,u),h=h.createElement("link"),un(h);var y=h;y._p=new Promise(function(U,V){y.onload=U,y.onerror=V}),On(h,"link",o),s.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,n),(n=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=hc.bind(e),n.addEventListener("load",s),n.addEventListener("error",s))}}var hh=0;function cy(e,n){return e.stylesheets&&e.count===0&&pc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&pc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&hh===0&&(hh=62500*kS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&pc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>hh?50:800)+n);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function hc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)pc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var dc=null;function pc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,dc=new Map,n.forEach(uy,e),dc=null,hc.call(e))}function uy(e,n){if(!(n.state.loading&4)){var s=dc.get(e);if(s)var o=s.get(null);else{s=new Map,dc.set(e,s);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var y=u[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(s.set(y.dataset.precedence,y),o=y)}o&&s.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),h=s.get(y)||o,h===o&&s.set(null,u),s.set(y,u),this.count++,o=hc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Bo={$$typeof:P,Provider:null,Consumer:null,_currentValue:ot,_currentValue2:ot,_threadCount:0};function fy(e,n,s,o,u,h,y,U,V){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Zt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zt(0),this.hiddenUpdates=Zt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=V,this.incompleteTransitions=new Map}function Wg(e,n,s,o,u,h,y,U,V,rt,_t,yt){return e=new fy(e,n,s,y,V,rt,_t,yt,U),n=1,h===!0&&(n|=24),h=ci(3,null,null,n),e.current=h,h.stateNode=e,n=Xu(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:s,cache:n},Zu(h),e}function qg(e){return e?(e=Qs,e):Qs}function Yg(e,n,s,o,u,h){u=qg(u),o.context===null?o.context=u:o.pendingContext=u,o=Fa(n),o.payload={element:s},h=h===void 0?null:h,h!==null&&(o.callback=h),s=Ha(e,o,n),s!==null&&(ei(s,e,n),mo(s,e,n))}function Zg(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<n?s:n}}function dh(e,n){Zg(e,n),(e=e.alternate)&&Zg(e,n)}function Kg(e){if(e.tag===13||e.tag===31){var n=_s(e,67108864);n!==null&&ei(n,e,67108864),dh(e,67108864)}}function Qg(e){if(e.tag===13||e.tag===31){var n=pi();n=Kr(n);var s=_s(e,n);s!==null&&ei(s,e,n),dh(e,n)}}var mc=!0;function hy(e,n,s,o){var u=B.T;B.T=null;var h=W.p;try{W.p=2,ph(e,n,s,o)}finally{W.p=h,B.T=u}}function dy(e,n,s,o){var u=B.T;B.T=null;var h=W.p;try{W.p=8,ph(e,n,s,o)}finally{W.p=h,B.T=u}}function ph(e,n,s,o){if(mc){var u=mh(o);if(u===null)th(e,n,o,gc,s),jg(e,o);else if(my(u,e,n,s,o))o.stopPropagation();else if(jg(e,o),n&4&&-1<py.indexOf(e)){for(;u!==null;){var h=ta(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=Rt(h.pendingLanes);if(y!==0){var U=h;for(U.pendingLanes|=2,U.entangledLanes|=2;y;){var V=1<<31-Ht(y);U.entanglements[1]|=V,y&=~V}Wi(h),(Le&6)===0&&(jl=Oe()+500,Uo(0))}}break;case 31:case 13:U=_s(h,2),U!==null&&ei(U,h,2),tc(),dh(h,2)}if(h=mh(o),h===null&&th(e,n,o,gc,s),h===u)break;u=h}u!==null&&o.stopPropagation()}else th(e,n,o,null,s)}}function mh(e){return e=gu(e),gh(e)}var gc=null;function gh(e){if(gc=null,e=$i(e),e!==null){var n=c(e);if(n===null)e=null;else{var s=n.tag;if(s===13){if(e=f(n),e!==null)return e;e=null}else if(s===31){if(e=d(n),e!==null)return e;e=null}else if(s===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return gc=e,null}function Jg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(De()){case I:return 2;case T:return 8;case j:case lt:return 32;case dt:return 268435456;default:return 32}default:return 32}}var vh=!1,Ja=null,ja=null,$a=null,Io=new Map,Fo=new Map,ts=[],py="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function jg(e,n){switch(e){case"focusin":case"focusout":Ja=null;break;case"dragenter":case"dragleave":ja=null;break;case"mouseover":case"mouseout":$a=null;break;case"pointerover":case"pointerout":Io.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fo.delete(n.pointerId)}}function Ho(e,n,s,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:s,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},n!==null&&(n=ta(n),n!==null&&Kg(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function my(e,n,s,o,u){switch(n){case"focusin":return Ja=Ho(Ja,e,n,s,o,u),!0;case"dragenter":return ja=Ho(ja,e,n,s,o,u),!0;case"mouseover":return $a=Ho($a,e,n,s,o,u),!0;case"pointerover":var h=u.pointerId;return Io.set(h,Ho(Io.get(h)||null,e,n,s,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Fo.set(h,Ho(Fo.get(h)||null,e,n,s,o,u)),!0}return!1}function $g(e){var n=$i(e.target);if(n!==null){var s=c(n);if(s!==null){if(n=s.tag,n===13){if(n=f(s),n!==null){e.blockedOn=n,ks(e.priority,function(){Qg(s)});return}}else if(n===31){if(n=d(s),n!==null){e.blockedOn=n,ks(e.priority,function(){Qg(s)});return}}else if(n===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var s=mh(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);mu=o,s.target.dispatchEvent(o),mu=null}else return n=ta(s),n!==null&&Kg(n),e.blockedOn=s,!1;n.shift()}return!0}function tv(e,n,s){vc(e)&&s.delete(n)}function gy(){vh=!1,Ja!==null&&vc(Ja)&&(Ja=null),ja!==null&&vc(ja)&&(ja=null),$a!==null&&vc($a)&&($a=null),Io.forEach(tv),Fo.forEach(tv)}function _c(e,n){e.blockedOn===n&&(e.blockedOn=null,vh||(vh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,gy)))}var xc=null;function ev(e){xc!==e&&(xc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){xc===e&&(xc=null);for(var n=0;n<e.length;n+=3){var s=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(gh(o||s)===null)continue;break}var h=ta(s);h!==null&&(e.splice(n,3),n-=3,mf(h,{pending:!0,data:u,method:s.method,action:o},o,u))}}))}function Sr(e){function n(V){return _c(V,e)}Ja!==null&&_c(Ja,e),ja!==null&&_c(ja,e),$a!==null&&_c($a,e),Io.forEach(n),Fo.forEach(n);for(var s=0;s<ts.length;s++){var o=ts[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ts.length&&(s=ts[0],s.blockedOn===null);)$g(s),s.blockedOn===null&&ts.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var u=s[o],h=s[o+1],y=u[Dn]||null;if(typeof h=="function")y||ev(s);else if(y){var U=null;if(h&&h.hasAttribute("formAction")){if(u=h,y=h[Dn]||null)U=y.formAction;else if(gh(u)!==null)continue}else U=y.action;typeof U=="function"?s[o+1]=U:(s.splice(o,3),o-=3),ev(s)}}}function nv(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function _h(e){this._internalRoot=e}Sc.prototype.render=_h.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(a(409));var s=n.current,o=pi();Yg(s,o,e,n,null,null)},Sc.prototype.unmount=_h.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Yg(e.current,2,null,e,null,null),tc(),n[Kn]=null}};function Sc(e){this._internalRoot=e}Sc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Jr();e={blockedOn:null,target:e,priority:n};for(var s=0;s<ts.length&&n!==0&&n<ts[s].priority;s++);ts.splice(s,0,e),s===0&&$g(e)}};var iv=t.version;if(iv!=="19.2.7")throw Error(a(527,iv,"19.2.7"));W.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=p(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var vy={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yc.isDisabled&&yc.supportsFiber)try{pt=yc.inject(vy),mt=yc}catch{}}return Vo.createRoot=function(e,n){if(!l(e))throw Error(a(299));var s=!1,o="",u=u0,h=f0,y=h0;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=Wg(e,1,!1,null,null,s,o,null,u,h,y,nv),e[Kn]=n.current,$f(e),new _h(n)},Vo.hydrateRoot=function(e,n,s){if(!l(e))throw Error(a(299));var o=!1,u="",h=u0,y=f0,U=h0,V=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(h=s.onUncaughtError),s.onCaughtError!==void 0&&(y=s.onCaughtError),s.onRecoverableError!==void 0&&(U=s.onRecoverableError),s.formState!==void 0&&(V=s.formState)),n=Wg(e,1,!0,n,s??null,o,u,V,h,y,U,nv),n.context=qg(null),s=n.current,o=pi(),o=Kr(o),u=Fa(o),u.callback=null,Ha(s,u,o),s=o,n.current.lanes=s,Xt(n,s),Wi(n),e[Kn]=n.current,$f(e),new Sc(n)},Vo.version="19.2.7",Vo}var pv;function Ly(){if(pv)return yh.exports;pv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),yh.exports=Uy(),yh.exports}var Ny=Ly();function Oy(r){const[t,i]=Mn.useState(!1);return Mn.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),l=()=>i(r&&!document.hidden&&!a.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(l);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),a.addEventListener("change",l),document.addEventListener("visibilitychange",l),l(),()=>{c.disconnect(),a.removeEventListener("change",l),document.removeEventListener("visibilitychange",l)}},[r]),t}function Py(r,t,i,a){Mn.useEffect(()=>{const l=t.current,c=i.current;if(!a||!l||!c)return;const f=l.closest("[data-scene-surface]")??l;let d=null;const m=_=>{if(!d||_.pointerId!==d.id)return;const v=Math.max(1,Math.min(f.clientWidth,f.clientHeight));r.drag(c,(_.clientX-d.x)/v,(_.clientY-d.y)/v)},p=_=>{!d||_&&_.pointerId!==d.id||(d=null,delete l.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p))},g=_=>{if(d||!_.isPrimary||_.button!==0)return;const v=_.target instanceof Element?_.target:null;!v||!(l.contains(v)||v.hasAttribute("data-scene-drag"))||(_.pointerType==="mouse"&&_.preventDefault(),d={id:_.pointerId,x:_.clientX,y:_.clientY},l.dataset.look="drag",window.addEventListener("pointermove",m),window.addEventListener("pointerup",p),window.addEventListener("pointercancel",p))};return f.addEventListener("pointerdown",g),()=>{f.removeEventListener("pointerdown",g),p()}},[a,r,t,i])}class zy{constructor(t){this.options=t,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null}acquire(t){return window.clearTimeout(this.disposeTimer),this.holders.push(t),this.ensureEngine(),this.attachTop(),t.onStatus(this.status),()=>this.release(t)}setRunning(t,i){t.running=i,this.top===t&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(t){}drag(t,i,a){var l,c;this.top===t&&((c=(l=this.engine)==null?void 0:l.drag)==null||c.call(l,i,a))}releaseDrag(t){var i,a;this.top===t&&((a=(i=this.engine)==null?void 0:i.releaseDrag)==null||a.call(i))}release(t){var i,a;if(this.holders=this.holders.filter(l=>l!==t),this.holders.length){this.attachTop();return}(i=this.engine)==null||i.stop(),this.observe(null),(a=this.canvas)==null||a.remove(),this.disposeTimer=window.setTimeout(()=>this.teardown(),5e3)}setStatus(t){this.status=t;for(const i of this.holders)i.onStatus(t)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const t=document.createElement("canvas");t.className=this.options.canvasClass,t.setAttribute("aria-hidden","true"),this.canvas=t;try{this.engine=this.options.create(t,()=>this.fail())}catch{this.fail();return}const i=this.engine;this.setStatus("loading"),this.configure(i),this.resize(),i.init().then(()=>{this.engine===i&&(i.renderFrame(0),this.setStatus("ready"),this.applyRunning())}).catch(()=>this.fail())}attachTop(){var i,a;const t=this.top;!t||!this.canvas||((a=(i=this.engine)==null?void 0:i.releaseDrag)==null||a.call(i),this.canvas.parentElement!==t.mount&&t.mount.appendChild(this.canvas),this.observe(t.mount),this.resize(),this.applyRunning())}observe(t){var i;this.observed!==t&&((i=this.observer)==null||i.disconnect(),this.observed=t,t&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(t)))}resize(){var l,c;const t=(l=this.top)==null?void 0:l.mount;if(!t||!this.engine)return;const i=t.clientWidth||window.innerWidth,a=t.clientHeight||window.innerHeight;this.engine.setSize(i,a,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var t;!this.engine||this.status!=="ready"||((t=this.top)!=null&&t.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}teardown(){var t,i;window.clearTimeout(this.disposeTimer),this.observe(null),(t=this.engine)==null||t.dispose(),this.engine=null,(i=this.canvas)==null||i.remove(),this.canvas=null,this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jd="186",By=0,mv=1,Iy=2,Yc=1,D_=2,Ko=3,ls=0,Hn=1,Ii=2,Ta=0,Jo=1,Fr=2,gv=3,vv=4,Fy=5,Pr=100,Hy=101,Gy=102,Vy=103,ky=104,Xy=200,Wy=201,qy=202,Yy=203,U_=204,L_=205,Zy=206,Ky=207,Qy=208,Jy=209,jy=210,$y=211,tM=212,eM=213,nM=214,od=0,ld=1,cd=2,nl=3,ud=4,fd=5,hd=6,dd=7,N_=0,iM=1,aM=2,Ji=0,O_=1,P_=2,z_=3,jd=4,B_=5,I_=6,F_=7,H_=300,Hs=301,kr=302,Th=303,Ah=304,ru=306,$c=1e3,ba=1001,pd=1002,Pn=1003,sM=1004,Mc=1005,Fn=1006,Rh=1007,Bs=1008,Yn=1009,G_=1010,V_=1011,il=1012,$d=1013,ji=1014,Ki=1015,si=1016,tp=1017,ep=1018,al=1020,k_=35902,X_=35899,W_=1021,q_=1022,Ci=1023,Ra=1026,Is=1027,Y_=1028,np=1029,Gs=1030,ip=1031,ap=1033,Zc=33776,Kc=33777,Qc=33778,Jc=33779,md=35840,gd=35841,vd=35842,_d=35843,xd=36196,Sd=37492,yd=37496,Md=37488,Ed=37489,tu=37490,bd=37491,Td=37808,Ad=37809,Rd=37810,wd=37811,Cd=37812,Dd=37813,Ud=37814,Ld=37815,Nd=37816,Od=37817,Pd=37818,zd=37819,Bd=37820,Id=37821,Fd=36492,Hd=36494,Gd=36495,Vd=36283,kd=36284,eu=36285,Xd=36286,rM=3200,Wd=0,oM=1,Ea="",ni="srgb",nu="srgb-linear",iu="linear",Be="srgb",wh=7680,lM=519,cM=512,uM=513,fM=514,sp=515,hM=516,dM=517,rp=518,pM=519,mM=35044,_v="300 es",Qi=2e3,sl=2001;function gM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function au(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function vM(){const r=au("canvas");return r.style.display="block",r}const xv={};function Sv(...r){const t="THREE."+r.shift();console.log(t,...r)}function Z_(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ne(...r){r=Z_(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...r)}}function Ae(...r){r=Z_(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...r)}}function Hr(...r){const t=r.join(" ");t in xv||(xv[t]=!0,ne(...r))}function _M(r,t,i){return new Promise(function(a,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:a()}}setTimeout(c,i)})}const xM={[od]:ld,[cd]:hd,[ud]:dd,[nl]:fd,[ld]:od,[hd]:cd,[dd]:ud,[fd]:nl};class Vs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(i)===-1&&a[t].push(i)}hasEventListener(t,i){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(i)!==-1}removeEventListener(t,i){const a=this._listeners;if(a===void 0)return;const l=a[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const a=i[t.type];if(a!==void 0){t.target=this;const l=a.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let yv=1234567;const jo=Math.PI/180,rl=180/Math.PI;function qr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[i&63|128]+Bn[i>>8&255]+"-"+Bn[i>>16&255]+Bn[i>>24&255]+Bn[a&255]+Bn[a>>8&255]+Bn[a>>16&255]+Bn[a>>24&255]).toLowerCase()}function me(r,t,i){return Math.max(t,Math.min(i,r))}function op(r,t){return(r%t+t)%t}function SM(r,t,i,a,l){return a+(r-t)*(l-a)/(i-t)}function yM(r,t,i){return r!==t?(i-r)/(t-r):0}function $o(r,t,i){return(1-i)*r+i*t}function MM(r,t,i,a){return $o(r,t,1-Math.exp(-i*a))}function EM(r,t=1){return t-Math.abs(op(r,t*2)-t)}function bM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*(3-2*r))}function TM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*r*(r*(r*6-15)+10))}function AM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function RM(r,t){return r+Math.random()*(t-r)}function wM(r){return r*(.5-Math.random())}function CM(r){r!==void 0&&(yv=r);let t=yv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function DM(r){return r*jo}function UM(r){return r*rl}function LM(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function NM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function OM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function PM(r,t,i,a,l){const c=Math.cos,f=Math.sin,d=c(i/2),m=f(i/2),p=c((t+a)/2),g=f((t+a)/2),_=c((t-a)/2),v=f((t-a)/2),x=c((a-t)/2),E=f((a-t)/2);switch(l){case"XYX":r.set(d*g,m*_,m*v,d*p);break;case"YZY":r.set(m*v,d*g,m*_,d*p);break;case"ZXZ":r.set(m*_,m*v,d*g,d*p);break;case"XZX":r.set(d*g,m*E,m*x,d*p);break;case"YXY":r.set(m*x,d*g,m*E,d*p);break;case"ZYZ":r.set(m*E,m*x,d*g,d*p);break;default:ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function zr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Wn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ch={DEG2RAD:jo,RAD2DEG:rl,generateUUID:qr,clamp:me,euclideanModulo:op,mapLinear:SM,inverseLerp:yM,lerp:$o,damp:MM,pingpong:EM,smoothstep:bM,smootherstep:TM,randInt:AM,randFloat:RM,randFloatSpread:wM,seededRandom:CM,degToRad:DM,radToDeg:UM,isPowerOfTwo:LM,ceilPowerOfTwo:NM,floorPowerOfTwo:OM,setQuaternionFromProperEuler:PM,normalize:Wn,denormalize:zr},yp=class yp{constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,a=this.y,l=t.elements;return this.x=l[0]*i+l[3]*a+l[6],this.y=l[1]*i+l[4]*a+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this}clampLength(t,i){const a=this.length();return this.divideScalar(a||1).multiplyScalar(me(a,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const a=this.dot(t)/i;return Math.acos(me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,a=this.y-t.y;return i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,a){return this.x=t.x+(i.x-t.x)*a,this.y=t.y+(i.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const a=Math.cos(i),l=Math.sin(i),c=this.x-t.x,f=this.y-t.y;return this.x=c*a-f*l+t.x,this.y=c*l+f*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};yp.prototype.isVector2=!0;let Qt=yp;class fs{constructor(t=0,i=0,a=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=a,this._w=l}static slerpFlat(t,i,a,l,c,f,d){let m=a[l+0],p=a[l+1],g=a[l+2],_=a[l+3],v=c[f+0],x=c[f+1],E=c[f+2],w=c[f+3];if(_!==w||m!==v||p!==x||g!==E){let M=m*v+p*x+g*E+_*w;M<0&&(v=-v,x=-x,E=-E,w=-w,M=-M);let S=1-d;if(M<.9995){const L=Math.acos(M),P=Math.sin(L);S=Math.sin(S*L)/P,d=Math.sin(d*L)/P,m=m*S+v*d,p=p*S+x*d,g=g*S+E*d,_=_*S+w*d}else{m=m*S+v*d,p=p*S+x*d,g=g*S+E*d,_=_*S+w*d;const L=1/Math.sqrt(m*m+p*p+g*g+_*_);m*=L,p*=L,g*=L,_*=L}}t[i]=m,t[i+1]=p,t[i+2]=g,t[i+3]=_}static multiplyQuaternionsFlat(t,i,a,l,c,f){const d=a[l],m=a[l+1],p=a[l+2],g=a[l+3],_=c[f],v=c[f+1],x=c[f+2],E=c[f+3];return t[i]=d*E+g*_+m*x-p*v,t[i+1]=m*E+g*v+p*_-d*x,t[i+2]=p*E+g*x+d*v-m*_,t[i+3]=g*E-d*_-m*v-p*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,a,l){return this._x=t,this._y=i,this._z=a,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const a=t._x,l=t._y,c=t._z,f=t._order,d=Math.cos,m=Math.sin,p=d(a/2),g=d(l/2),_=d(c/2),v=m(a/2),x=m(l/2),E=m(c/2);switch(f){case"XYZ":this._x=v*g*_+p*x*E,this._y=p*x*_-v*g*E,this._z=p*g*E+v*x*_,this._w=p*g*_-v*x*E;break;case"YXZ":this._x=v*g*_+p*x*E,this._y=p*x*_-v*g*E,this._z=p*g*E-v*x*_,this._w=p*g*_+v*x*E;break;case"ZXY":this._x=v*g*_-p*x*E,this._y=p*x*_+v*g*E,this._z=p*g*E+v*x*_,this._w=p*g*_-v*x*E;break;case"ZYX":this._x=v*g*_-p*x*E,this._y=p*x*_+v*g*E,this._z=p*g*E-v*x*_,this._w=p*g*_+v*x*E;break;case"YZX":this._x=v*g*_+p*x*E,this._y=p*x*_+v*g*E,this._z=p*g*E-v*x*_,this._w=p*g*_-v*x*E;break;case"XZY":this._x=v*g*_-p*x*E,this._y=p*x*_-v*g*E,this._z=p*g*E+v*x*_,this._w=p*g*_+v*x*E;break;default:ne("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const a=i/2,l=Math.sin(a);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,a=i[0],l=i[4],c=i[8],f=i[1],d=i[5],m=i[9],p=i[2],g=i[6],_=i[10],v=a+d+_;if(v>0){const x=.5/Math.sqrt(v+1);this._w=.25/x,this._x=(g-m)*x,this._y=(c-p)*x,this._z=(f-l)*x}else if(a>d&&a>_){const x=2*Math.sqrt(1+a-d-_);this._w=(g-m)/x,this._x=.25*x,this._y=(l+f)/x,this._z=(c+p)/x}else if(d>_){const x=2*Math.sqrt(1+d-a-_);this._w=(c-p)/x,this._x=(l+f)/x,this._y=.25*x,this._z=(m+g)/x}else{const x=2*Math.sqrt(1+_-a-d);this._w=(f-l)/x,this._x=(c+p)/x,this._y=(m+g)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let a=t.dot(i)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,i){const a=this.angleTo(t);if(a===0)return this;const l=Math.min(1,i/a);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const a=t._x,l=t._y,c=t._z,f=t._w,d=i._x,m=i._y,p=i._z,g=i._w;return this._x=a*g+f*d+l*p-c*m,this._y=l*g+f*m+c*d-a*p,this._z=c*g+f*p+a*m-l*d,this._w=f*g-a*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,i){let a=t._x,l=t._y,c=t._z,f=t._w,d=this.dot(t);d<0&&(a=-a,l=-l,c=-c,f=-f,d=-d);let m=1-i;if(d<.9995){const p=Math.acos(d),g=Math.sin(p);m=Math.sin(m*p)/g,i=Math.sin(i*p)/g,this._x=this._x*m+a*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+a*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(t,i,a){return this.copy(t).slerp(i,a)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),a=Math.random(),l=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Mp=class Mp{constructor(t=0,i=0,a=0){this.x=t,this.y=i,this.z=a}set(t,i,a){return a===void 0&&(a=this.z),this.x=t,this.y=i,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(Mv.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(Mv.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*a+c[6]*l,this.y=c[1]*i+c[4]*a+c[7]*l,this.z=c[2]*i+c[5]*a+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,a=this.y,l=this.z,c=t.elements,f=1/(c[3]*i+c[7]*a+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*a+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*a+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*a+c[10]*l+c[14])*f,this}applyQuaternion(t){const i=this.x,a=this.y,l=this.z,c=t.x,f=t.y,d=t.z,m=t.w,p=2*(f*l-d*a),g=2*(d*i-c*l),_=2*(c*a-f*i);return this.x=i+m*p+f*_-d*g,this.y=a+m*g+d*p-c*_,this.z=l+m*_+c*g-f*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*a+c[8]*l,this.y=c[1]*i+c[5]*a+c[9]*l,this.z=c[2]*i+c[6]*a+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this.z=me(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this.z=me(this.z,t,i),this}clampLength(t,i){const a=this.length();return this.divideScalar(a||1).multiplyScalar(me(a,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,a){return this.x=t.x+(i.x-t.x)*a,this.y=t.y+(i.y-t.y)*a,this.z=t.z+(i.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const a=t.x,l=t.y,c=t.z,f=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*f-a*m,this.z=a*d-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const a=t.dot(this)/i;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Dh.copy(this).projectOnVector(t),this.sub(Dh)}reflect(t){return this.sub(Dh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const a=this.dot(t)/i;return Math.acos(me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,a=this.y-t.y,l=this.z-t.z;return i*i+a*a+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,a){const l=Math.sin(i)*t;return this.x=l*Math.sin(a),this.y=Math.cos(i)*t,this.z=l*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,a){return this.x=t*Math.sin(i),this.y=a,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=a,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,a=Math.sqrt(1-i*i);return this.x=a*Math.cos(t),this.y=i,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Mp.prototype.isVector3=!0;let H=Mp;const Dh=new H,Mv=new fs,Ep=class Ep{constructor(t,i,a,l,c,f,d,m,p){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,a,l,c,f,d,m,p)}set(t,i,a,l,c,f,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=i,g[4]=c,g[5]=m,g[6]=a,g[7]=f,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,a=t.elements;return i[0]=a[0],i[1]=a[1],i[2]=a[2],i[3]=a[3],i[4]=a[4],i[5]=a[5],i[6]=a[6],i[7]=a[7],i[8]=a[8],this}extractBasis(t,i,a){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const a=t.elements,l=i.elements,c=this.elements,f=a[0],d=a[3],m=a[6],p=a[1],g=a[4],_=a[7],v=a[2],x=a[5],E=a[8],w=l[0],M=l[3],S=l[6],L=l[1],P=l[4],A=l[7],O=l[2],N=l[5],D=l[8];return c[0]=f*w+d*L+m*O,c[3]=f*M+d*P+m*N,c[6]=f*S+d*A+m*D,c[1]=p*w+g*L+_*O,c[4]=p*M+g*P+_*N,c[7]=p*S+g*A+_*D,c[2]=v*w+x*L+E*O,c[5]=v*M+x*P+E*N,c[8]=v*S+x*A+E*D,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return i*f*g-i*d*p-a*c*g+a*d*m+l*c*p-l*f*m}invert(){const t=this.elements,i=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=g*f-d*p,v=d*m-g*c,x=p*c-f*m,E=i*_+a*v+l*x;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/E;return t[0]=_*w,t[1]=(l*p-g*a)*w,t[2]=(d*a-l*f)*w,t[3]=v*w,t[4]=(g*i-l*m)*w,t[5]=(l*c-d*i)*w,t[6]=x*w,t[7]=(a*m-p*i)*w,t[8]=(f*i-a*c)*w,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,a,l,c,f,d){const m=Math.cos(c),p=Math.sin(c);return this.set(a*m,a*p,-a*(m*f+p*d)+f+t,-l*p,l*m,-l*(-p*f+m*d)+d+i,0,0,1),this}scale(t,i){return Hr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Uh.makeScale(t,i)),this}rotate(t){return Hr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Uh.makeRotation(-t)),this}translate(t,i){return Hr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Uh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),a=Math.sin(t);return this.set(i,-a,0,a,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,a=t.elements;for(let l=0;l<9;l++)if(i[l]!==a[l])return!1;return!0}fromArray(t,i=0){for(let a=0;a<9;a++)this.elements[a]=t[a+i];return this}toArray(t=[],i=0){const a=this.elements;return t[i]=a[0],t[i+1]=a[1],t[i+2]=a[2],t[i+3]=a[3],t[i+4]=a[4],t[i+5]=a[5],t[i+6]=a[6],t[i+7]=a[7],t[i+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ep.prototype.isMatrix3=!0;let re=Ep;const Uh=new re,Ev=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bv=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zM(){const r={enabled:!0,workingColorSpace:nu,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Be&&(l.r=Aa(l.r),l.g=Aa(l.g),l.b=Aa(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Be&&(l.r=Gr(l.r),l.g=Gr(l.g),l.b=Gr(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ea?iu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Hr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Hr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[nu]:{primaries:t,whitePoint:a,transfer:iu,toXYZ:Ev,fromXYZ:bv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ni},outputColorSpaceConfig:{drawingBufferColorSpace:ni}},[ni]:{primaries:t,whitePoint:a,transfer:Be,toXYZ:Ev,fromXYZ:bv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ni}}}),r}const Ee=zM();function Aa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let yr;class BM{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{yr===void 0&&(yr=au("canvas")),yr.width=t.width,yr.height=t.height;const l=yr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),a=yr}return a.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=au("canvas");i.width=t.width,i.height=t.height;const a=i.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const l=a.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Aa(c[f]/255)*255;return a.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let a=0;a<i.length;a++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[a]=Math.floor(Aa(i[a]/255)*255):i[a]=Aa(i[a]);return{data:i,width:t.width,height:t.height}}else return ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let IM=0;class lp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:IM++}),this.uuid=qr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,d=l.length;f<d;f++)l[f].isDataTexture?c.push(Lh(l[f].image)):c.push(Lh(l[f]))}else c=Lh(l);a.url=c}return i||(t.images[this.uuid]=a),a}}function Lh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?BM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ne("Texture: Unable to serialize Texture."),{})}let FM=0;const Nh=new H;class Gn extends Vs{constructor(t=Gn.DEFAULT_IMAGE,i=Gn.DEFAULT_MAPPING,a=ba,l=ba,c=Fn,f=Bs,d=Ci,m=Yn,p=Gn.DEFAULT_ANISOTROPY,g=Ea){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:FM++}),this.uuid=qr(),this.name="",this.source=new lp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=a,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Qt(0,0),this.repeat=new Qt(1,1),this.center=new Qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nh).x}get height(){return this.source.getSize(Nh).y}get depth(){return this.source.getSize(Nh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const a=t[i];if(a===void 0){ne(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ne(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&a&&l.isVector2&&a.isVector2||l&&a&&l.isVector3&&a.isVector3||l&&a&&l.isMatrix3&&a.isMatrix3?l.copy(a):this[i]=a}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),i||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==H_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $c:t.x=t.x-Math.floor(t.x);break;case ba:t.x=t.x<0?0:1;break;case pd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $c:t.y=t.y-Math.floor(t.y);break;case ba:t.y=t.y<0?0:1;break;case pd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=H_;Gn.DEFAULT_ANISOTROPY=1;const bp=class bp{constructor(t=0,i=0,a=0,l=1){this.x=t,this.y=i,this.z=a,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,a,l){return this.x=t,this.y=i,this.z=a,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,a=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*i+f[4]*a+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*a+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*a+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*a+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,a,l,c;const m=t.elements,p=m[0],g=m[4],_=m[8],v=m[1],x=m[5],E=m[9],w=m[2],M=m[6],S=m[10];if(Math.abs(g-v)<.01&&Math.abs(_-w)<.01&&Math.abs(E-M)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+w)<.1&&Math.abs(E+M)<.1&&Math.abs(p+x+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const P=(p+1)/2,A=(x+1)/2,O=(S+1)/2,N=(g+v)/4,D=(_+w)/4,b=(E+M)/4;return P>A&&P>O?P<.01?(a=0,l=.707106781,c=.707106781):(a=Math.sqrt(P),l=N/a,c=D/a):A>O?A<.01?(a=.707106781,l=0,c=.707106781):(l=Math.sqrt(A),a=N/l,c=b/l):O<.01?(a=.707106781,l=.707106781,c=0):(c=Math.sqrt(O),a=D/c,l=b/c),this.set(a,l,c,i),this}let L=Math.sqrt((M-E)*(M-E)+(_-w)*(_-w)+(v-g)*(v-g));return Math.abs(L)<.001&&(L=1),this.x=(M-E)/L,this.y=(_-w)/L,this.z=(v-g)/L,this.w=Math.acos((p+x+S-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this.z=me(this.z,t.z,i.z),this.w=me(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this.z=me(this.z,t,i),this.w=me(this.w,t,i),this}clampLength(t,i){const a=this.length();return this.divideScalar(a||1).multiplyScalar(me(a,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,a){return this.x=t.x+(i.x-t.x)*a,this.y=t.y+(i.y-t.y)*a,this.z=t.z+(i.z-t.z)*a,this.w=t.w+(i.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};bp.prototype.isVector4=!0;let Ze=bp;class HM extends Vs{constructor(t=1,i=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=a.depth,this.scissor=new Ze(0,0,t,i),this.scissorTest=!1,this.viewport=new Ze(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:a.depth},c=new Gn(l),f=a.count;for(let d=0;d<f;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,a=1){if(this.width!==t||this.height!==i||this.depth!==a){this.width=t,this.height=i,this.depth=a;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=a,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,a=t.textures.length;i<a;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new lp(l)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const i=t.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Di extends HM{constructor(t=1,i=1,a={}){super(t,i,a),this.isWebGLRenderTarget=!0}}class K_ extends Gn{constructor(t=null,i=1,a=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:a,depth:l},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=ba,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class GM extends Gn{constructor(t=null,i=1,a=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:a,depth:l},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=ba,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const su=class su{constructor(t,i,a,l,c,f,d,m,p,g,_,v,x,E,w,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,a,l,c,f,d,m,p,g,_,v,x,E,w,M)}set(t,i,a,l,c,f,d,m,p,g,_,v,x,E,w,M){const S=this.elements;return S[0]=t,S[4]=i,S[8]=a,S[12]=l,S[1]=c,S[5]=f,S[9]=d,S[13]=m,S[2]=p,S[6]=g,S[10]=_,S[14]=v,S[3]=x,S[7]=E,S[11]=w,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new su().fromArray(this.elements)}copy(t){const i=this.elements,a=t.elements;return i[0]=a[0],i[1]=a[1],i[2]=a[2],i[3]=a[3],i[4]=a[4],i[5]=a[5],i[6]=a[6],i[7]=a[7],i[8]=a[8],i[9]=a[9],i[10]=a[10],i[11]=a[11],i[12]=a[12],i[13]=a[13],i[14]=a[14],i[15]=a[15],this}copyPosition(t){const i=this.elements,a=t.elements;return i[12]=a[12],i[13]=a[13],i[14]=a[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,a){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,i,a){return this.set(t.x,i.x,a.x,0,t.y,i.y,a.y,0,t.z,i.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,a=t.elements,l=1/Mr.setFromMatrixColumn(t,0).length(),c=1/Mr.setFromMatrixColumn(t,1).length(),f=1/Mr.setFromMatrixColumn(t,2).length();return i[0]=a[0]*l,i[1]=a[1]*l,i[2]=a[2]*l,i[3]=0,i[4]=a[4]*c,i[5]=a[5]*c,i[6]=a[6]*c,i[7]=0,i[8]=a[8]*f,i[9]=a[9]*f,i[10]=a[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,a=t.x,l=t.y,c=t.z,f=Math.cos(a),d=Math.sin(a),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const v=f*g,x=f*_,E=d*g,w=d*_;i[0]=m*g,i[4]=-m*_,i[8]=p,i[1]=x+E*p,i[5]=v-w*p,i[9]=-d*m,i[2]=w-v*p,i[6]=E+x*p,i[10]=f*m}else if(t.order==="YXZ"){const v=m*g,x=m*_,E=p*g,w=p*_;i[0]=v+w*d,i[4]=E*d-x,i[8]=f*p,i[1]=f*_,i[5]=f*g,i[9]=-d,i[2]=x*d-E,i[6]=w+v*d,i[10]=f*m}else if(t.order==="ZXY"){const v=m*g,x=m*_,E=p*g,w=p*_;i[0]=v-w*d,i[4]=-f*_,i[8]=E+x*d,i[1]=x+E*d,i[5]=f*g,i[9]=w-v*d,i[2]=-f*p,i[6]=d,i[10]=f*m}else if(t.order==="ZYX"){const v=f*g,x=f*_,E=d*g,w=d*_;i[0]=m*g,i[4]=E*p-x,i[8]=v*p+w,i[1]=m*_,i[5]=w*p+v,i[9]=x*p-E,i[2]=-p,i[6]=d*m,i[10]=f*m}else if(t.order==="YZX"){const v=f*m,x=f*p,E=d*m,w=d*p;i[0]=m*g,i[4]=w-v*_,i[8]=E*_+x,i[1]=_,i[5]=f*g,i[9]=-d*g,i[2]=-p*g,i[6]=x*_+E,i[10]=v-w*_}else if(t.order==="XZY"){const v=f*m,x=f*p,E=d*m,w=d*p;i[0]=m*g,i[4]=-_,i[8]=p*g,i[1]=v*_+w,i[5]=f*g,i[9]=x*_-E,i[2]=E*_-x,i[6]=d*g,i[10]=w*_+v}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(VM,t,kM)}lookAt(t,i,a){const l=this.elements;return mi.subVectors(t,i),mi.lengthSq()===0&&(mi.z=1),mi.normalize(),ns.crossVectors(a,mi),ns.lengthSq()===0&&(Math.abs(a.z)===1?mi.x+=1e-4:mi.z+=1e-4,mi.normalize(),ns.crossVectors(a,mi)),ns.normalize(),Ec.crossVectors(mi,ns),l[0]=ns.x,l[4]=Ec.x,l[8]=mi.x,l[1]=ns.y,l[5]=Ec.y,l[9]=mi.y,l[2]=ns.z,l[6]=Ec.z,l[10]=mi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const a=t.elements,l=i.elements,c=this.elements,f=a[0],d=a[4],m=a[8],p=a[12],g=a[1],_=a[5],v=a[9],x=a[13],E=a[2],w=a[6],M=a[10],S=a[14],L=a[3],P=a[7],A=a[11],O=a[15],N=l[0],D=l[4],b=l[8],C=l[12],F=l[1],k=l[5],G=l[9],J=l[13],X=l[2],$=l[6],B=l[10],W=l[14],ot=l[3],et=l[7],ft=l[11],z=l[15];return c[0]=f*N+d*F+m*X+p*ot,c[4]=f*D+d*k+m*$+p*et,c[8]=f*b+d*G+m*B+p*ft,c[12]=f*C+d*J+m*W+p*z,c[1]=g*N+_*F+v*X+x*ot,c[5]=g*D+_*k+v*$+x*et,c[9]=g*b+_*G+v*B+x*ft,c[13]=g*C+_*J+v*W+x*z,c[2]=E*N+w*F+M*X+S*ot,c[6]=E*D+w*k+M*$+S*et,c[10]=E*b+w*G+M*B+S*ft,c[14]=E*C+w*J+M*W+S*z,c[3]=L*N+P*F+A*X+O*ot,c[7]=L*D+P*k+A*$+O*et,c[11]=L*b+P*G+A*B+O*ft,c[15]=L*C+P*J+A*W+O*z,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],a=t[4],l=t[8],c=t[12],f=t[1],d=t[5],m=t[9],p=t[13],g=t[2],_=t[6],v=t[10],x=t[14],E=t[3],w=t[7],M=t[11],S=t[15],L=m*x-p*v,P=d*x-p*_,A=d*v-m*_,O=f*x-p*g,N=f*v-m*g,D=f*_-d*g;return i*(w*L-M*P+S*A)-a*(E*L-M*O+S*N)+l*(E*P-w*O+S*D)-c*(E*A-w*N+M*D)}determinantAffine(){const t=this.elements,i=t[0],a=t[4],l=t[8],c=t[1],f=t[5],d=t[9],m=t[2],p=t[6],g=t[10];return i*(f*g-d*p)-a*(c*g-d*m)+l*(c*p-f*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,a){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=a),this}invert(){const t=this.elements,i=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=t[9],v=t[10],x=t[11],E=t[12],w=t[13],M=t[14],S=t[15],L=i*d-a*f,P=i*m-l*f,A=i*p-c*f,O=a*m-l*d,N=a*p-c*d,D=l*p-c*m,b=g*w-_*E,C=g*M-v*E,F=g*S-x*E,k=_*M-v*w,G=_*S-x*w,J=v*S-x*M,X=L*J-P*G+A*k+O*F-N*C+D*b;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/X;return t[0]=(d*J-m*G+p*k)*$,t[1]=(l*G-a*J-c*k)*$,t[2]=(w*D-M*N+S*O)*$,t[3]=(v*N-_*D-x*O)*$,t[4]=(m*F-f*J-p*C)*$,t[5]=(i*J-l*F+c*C)*$,t[6]=(M*A-E*D-S*P)*$,t[7]=(g*D-v*A+x*P)*$,t[8]=(f*G-d*F+p*b)*$,t[9]=(a*F-i*G-c*b)*$,t[10]=(E*N-w*A+S*L)*$,t[11]=(_*A-g*N-x*L)*$,t[12]=(d*C-f*k-m*b)*$,t[13]=(i*k-a*C+l*b)*$,t[14]=(w*P-E*O-M*L)*$,t[15]=(g*O-_*P+v*L)*$,this}scale(t){const i=this.elements,a=t.x,l=t.y,c=t.z;return i[0]*=a,i[4]*=l,i[8]*=c,i[1]*=a,i[5]*=l,i[9]*=c,i[2]*=a,i[6]*=l,i[10]*=c,i[3]*=a,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,a,l))}makeTranslation(t,i,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,a,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,i,-a,0,0,a,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),a=Math.sin(t);return this.set(i,0,a,0,0,1,0,0,-a,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),a=Math.sin(t);return this.set(i,-a,0,0,a,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const a=Math.cos(i),l=Math.sin(i),c=1-a,f=t.x,d=t.y,m=t.z,p=c*f,g=c*d;return this.set(p*f+a,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+a,g*m-l*f,0,p*m-l*d,g*m+l*f,c*m*m+a,0,0,0,0,1),this}makeScale(t,i,a){return this.set(t,0,0,0,0,i,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,i,a,l,c,f){return this.set(1,a,c,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,a){const l=this.elements,c=i._x,f=i._y,d=i._z,m=i._w,p=c+c,g=f+f,_=d+d,v=c*p,x=c*g,E=c*_,w=f*g,M=f*_,S=d*_,L=m*p,P=m*g,A=m*_,O=a.x,N=a.y,D=a.z;return l[0]=(1-(w+S))*O,l[1]=(x+A)*O,l[2]=(E-P)*O,l[3]=0,l[4]=(x-A)*N,l[5]=(1-(v+S))*N,l[6]=(M+L)*N,l[7]=0,l[8]=(E+P)*D,l[9]=(M-L)*D,l[10]=(1-(v+w))*D,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,a){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),i.identity(),this;let f=Mr.set(l[0],l[1],l[2]).length();const d=Mr.set(l[4],l[5],l[6]).length(),m=Mr.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Pi.copy(this);const p=1/f,g=1/d,_=1/m;return Pi.elements[0]*=p,Pi.elements[1]*=p,Pi.elements[2]*=p,Pi.elements[4]*=g,Pi.elements[5]*=g,Pi.elements[6]*=g,Pi.elements[8]*=_,Pi.elements[9]*=_,Pi.elements[10]*=_,i.setFromRotationMatrix(Pi),a.x=f,a.y=d,a.z=m,this}makePerspective(t,i,a,l,c,f,d=Qi,m=!1){const p=this.elements,g=2*c/(i-t),_=2*c/(a-l),v=(i+t)/(i-t),x=(a+l)/(a-l);let E,w;if(m)E=c/(f-c),w=f*c/(f-c);else if(d===Qi)E=-(f+c)/(f-c),w=-2*f*c/(f-c);else if(d===sl)E=-f/(f-c),w=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=_,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=w,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,i,a,l,c,f,d=Qi,m=!1){const p=this.elements,g=2/(i-t),_=2/(a-l),v=-(i+t)/(i-t),x=-(a+l)/(a-l);let E,w;if(m)E=1/(f-c),w=f/(f-c);else if(d===Qi)E=-2/(f-c),w=-(f+c)/(f-c);else if(d===sl)E=-1/(f-c),w=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=0,p[12]=v,p[1]=0,p[5]=_,p[9]=0,p[13]=x,p[2]=0,p[6]=0,p[10]=E,p[14]=w,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const i=this.elements,a=t.elements;for(let l=0;l<16;l++)if(i[l]!==a[l])return!1;return!0}fromArray(t,i=0){for(let a=0;a<16;a++)this.elements[a]=t[a+i];return this}toArray(t=[],i=0){const a=this.elements;return t[i]=a[0],t[i+1]=a[1],t[i+2]=a[2],t[i+3]=a[3],t[i+4]=a[4],t[i+5]=a[5],t[i+6]=a[6],t[i+7]=a[7],t[i+8]=a[8],t[i+9]=a[9],t[i+10]=a[10],t[i+11]=a[11],t[i+12]=a[12],t[i+13]=a[13],t[i+14]=a[14],t[i+15]=a[15],t}};su.prototype.isMatrix4=!0;let Ie=su;const Mr=new H,Pi=new Ie,VM=new H(0,0,0),kM=new H(1,1,1),ns=new H,Ec=new H,mi=new H,Tv=new Ie,Av=new fs;class cs{constructor(t=0,i=0,a=0,l=cs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=a,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,a,l=this._order){return this._x=t,this._y=i,this._z=a,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,a=!0){const l=t.elements,c=l[0],f=l[4],d=l[8],m=l[1],p=l[5],g=l[9],_=l[2],v=l[6],x=l[10];switch(i){case"XYZ":this._y=Math.asin(me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,x),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(v,p),this._z=0);break;case"YXZ":this._x=Math.asin(-me(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,x),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(me(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,x),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-me(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,x));break;case"XZY":this._z=Math.asin(-me(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(v,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,x),this._y=0);break;default:ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,a){return Tv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Tv,i,a)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Av.setFromEuler(this),this.setFromQuaternion(Av,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cs.DEFAULT_ORDER="XYZ";class cp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let XM=0;const Rv=new H,Er=new fs,va=new Ie,bc=new H,ko=new H,WM=new H,qM=new fs,wv=new H(1,0,0),Cv=new H(0,1,0),Dv=new H(0,0,1),Uv={type:"added"},YM={type:"removed"},br={type:"childadded",child:null},Oh={type:"childremoved",child:null};class Cn extends Vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:XM++}),this.uuid=qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Cn.DEFAULT_UP.clone();const t=new H,i=new cs,a=new fs,l=new H(1,1,1);function c(){a.setFromEuler(i,!1)}function f(){i.setFromQuaternion(a,void 0,!1)}i._onChange(c),a._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Ie},normalMatrix:{value:new re}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=Cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Er.setFromAxisAngle(t,i),this.quaternion.multiply(Er),this}rotateOnWorldAxis(t,i){return Er.setFromAxisAngle(t,i),this.quaternion.premultiply(Er),this}rotateX(t){return this.rotateOnAxis(wv,t)}rotateY(t){return this.rotateOnAxis(Cv,t)}rotateZ(t){return this.rotateOnAxis(Dv,t)}translateOnAxis(t,i){return Rv.copy(t).applyQuaternion(this.quaternion),this.position.add(Rv.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(wv,t)}translateY(t){return this.translateOnAxis(Cv,t)}translateZ(t){return this.translateOnAxis(Dv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(va.copy(this.matrixWorld).invert())}lookAt(t,i,a){t.isVector3?bc.copy(t):bc.set(t,i,a);const l=this.parent;this.updateWorldMatrix(!0,!1),ko.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?va.lookAt(ko,bc,this.up):va.lookAt(bc,ko,this.up),this.quaternion.setFromRotationMatrix(va),l&&(va.extractRotation(l.matrixWorld),Er.setFromRotationMatrix(va),this.quaternion.premultiply(Er.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ae("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Uv),br.child=t,this.dispatchEvent(br),br.child=null):Ae("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(YM),Oh.child=t,this.dispatchEvent(Oh),Oh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),va.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),va.multiply(t.parent.matrixWorld)),t.applyMatrix4(va),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Uv),br.child=t,this.dispatchEvent(br),br.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let a=0,l=this.children.length;a<l;a++){const f=this.children[a].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,a=[]){this[t]===i&&a.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,i,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,t,WM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,qM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const i=this.children;for(let a=0,l=i.length;a<l;a++)i[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let a=0,l=i.length;a<l;a++)i[a].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,a=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*a-c[8]*l,c[13]+=a-c[1]*i-c[5]*a-c[9]*l,c[14]+=l-c[2]*i-c[6]*a-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let a=0,l=i.length;a<l;a++)i[a].updateMatrixWorld(t)}updateWorldMatrix(t,i,a=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),i===!0){const c=this.children;for(let f=0,d=c.length;f<d;f++)c[f].updateWorldMatrix(!1,!0,a)}}toJSON(t){const i=t===void 0||typeof t=="string",a={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const _=m[p];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(i){const d=f(t.geometries),m=f(t.materials),p=f(t.textures),g=f(t.images),_=f(t.shapes),v=f(t.skeletons),x=f(t.animations),E=f(t.nodes);d.length>0&&(a.geometries=d),m.length>0&&(a.materials=m),p.length>0&&(a.textures=p),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),v.length>0&&(a.skeletons=v),x.length>0&&(a.animations=x),E.length>0&&(a.nodes=E)}return a.object=l,a;function f(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let a=0;a<t.children.length;a++){const l=t.children[a];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Cn.DEFAULT_UP=new H(0,1,0);Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class os extends Cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ZM={type:"move"};class Ph{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new os,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new os,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new os,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const a of t.hand.values())this._getHandJoint(i,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,a){let l=null,c=null,f=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){f=!0;for(const w of t.hand.values()){const M=i.getJointPose(w,a),S=this._getHandJoint(p,w);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],v=g.position.distanceTo(_.position),x=.02,E=.005;p.inputState.pinching&&v>x+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&v<=x-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));d!==null&&(l=i.getPose(t.targetRaySpace,a),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(ZM)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const a=new os;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[i.jointName]=a,t.add(a)}return t.joints[i.jointName]}}const Q_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},Tc={h:0,s:0,l:0};function zh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class ee{constructor(t,i,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,a)}set(t,i,a){if(i===void 0&&a===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=ni){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ee.colorSpaceToWorking(this,i),this}setRGB(t,i,a,l=Ee.workingColorSpace){return this.r=t,this.g=i,this.b=a,Ee.colorSpaceToWorking(this,l),this}setHSL(t,i,a,l=Ee.workingColorSpace){if(t=op(t,1),i=me(i,0,1),a=me(a,0,1),i===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+i):a+i-a*i,f=2*a-c;this.r=zh(f,c,t+1/3),this.g=zh(f,c,t),this.b=zh(f,c,t-1/3)}return Ee.colorSpaceToWorking(this,l),this}setStyle(t,i=ni){function a(c){c!==void 0&&parseFloat(c)<1&&ne("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],d=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ne("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);ne("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=ni){const a=Q_[t.toLowerCase()];return a!==void 0?this.setHex(a,i):ne("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Aa(t.r),this.g=Aa(t.g),this.b=Aa(t.b),this}copyLinearToSRGB(t){return this.r=Gr(t.r),this.g=Gr(t.g),this.b=Gr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ni){return Ee.workingToColorSpace(In.copy(this),t),Math.round(me(In.r*255,0,255))*65536+Math.round(me(In.g*255,0,255))*256+Math.round(me(In.b*255,0,255))}getHexString(t=ni){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ee.workingColorSpace){Ee.workingToColorSpace(In.copy(this),i);const a=In.r,l=In.g,c=In.b,f=Math.max(a,l,c),d=Math.min(a,l,c);let m,p;const g=(d+f)/2;if(d===f)m=0,p=0;else{const _=f-d;switch(p=g<=.5?_/(f+d):_/(2-f-d),f){case a:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-a)/_+2;break;case c:m=(a-l)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,i=Ee.workingColorSpace){return Ee.workingToColorSpace(In.copy(this),i),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=ni){Ee.workingToColorSpace(In.copy(this),t);const i=In.r,a=In.g,l=In.b;return t!==ni?`color(${t} ${i.toFixed(3)} ${a.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(a*255)},${Math.round(l*255)})`}offsetHSL(t,i,a){return this.getHSL(is),this.setHSL(is.h+t,is.s+i,is.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,a){return this.r=t.r+(i.r-t.r)*a,this.g=t.g+(i.g-t.g)*a,this.b=t.b+(i.b-t.b)*a,this}lerpHSL(t,i){this.getHSL(is),t.getHSL(Tc);const a=$o(is.h,Tc.h,i),l=$o(is.s,Tc.s,i),c=$o(is.l,Tc.l,i);return this.setHSL(a,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,a=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*a+c[6]*l,this.g=c[1]*i+c[4]*a+c[7]*l,this.b=c[2]*i+c[5]*a+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new ee;ee.NAMES=Q_;class up{constructor(t,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new ee(t),this.density=i}clone(){return new up(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class KM extends Cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cs,this.environmentIntensity=1,this.environmentRotation=new cs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const zi=new H,_a=new H,Bh=new H,xa=new H,Tr=new H,Ar=new H,Lv=new H,Ih=new H,Fh=new H,Hh=new H,Gh=new Ze,Vh=new Ze,kh=new Ze;class Fi{constructor(t=new H,i=new H,a=new H){this.a=t,this.b=i,this.c=a}static getNormal(t,i,a,l){l.subVectors(a,i),zi.subVectors(t,i),l.cross(zi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,a,l,c){zi.subVectors(l,i),_a.subVectors(a,i),Bh.subVectors(t,i);const f=zi.dot(zi),d=zi.dot(_a),m=zi.dot(Bh),p=_a.dot(_a),g=_a.dot(Bh),_=f*p-d*d;if(_===0)return c.set(0,0,0),null;const v=1/_,x=(p*m-d*g)*v,E=(f*g-d*m)*v;return c.set(1-x-E,E,x)}static containsPoint(t,i,a,l){return this.getBarycoord(t,i,a,l,xa)===null?!1:xa.x>=0&&xa.y>=0&&xa.x+xa.y<=1}static getInterpolation(t,i,a,l,c,f,d,m){return this.getBarycoord(t,i,a,l,xa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,xa.x),m.addScaledVector(f,xa.y),m.addScaledVector(d,xa.z),m)}static getInterpolatedAttribute(t,i,a,l,c,f){return Gh.setScalar(0),Vh.setScalar(0),kh.setScalar(0),Gh.fromBufferAttribute(t,i),Vh.fromBufferAttribute(t,a),kh.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Gh,c.x),f.addScaledVector(Vh,c.y),f.addScaledVector(kh,c.z),f}static isFrontFacing(t,i,a,l){return zi.subVectors(a,i),_a.subVectors(t,i),zi.cross(_a).dot(l)<0}set(t,i,a){return this.a.copy(t),this.b.copy(i),this.c.copy(a),this}setFromPointsAndIndices(t,i,a,l){return this.a.copy(t[i]),this.b.copy(t[a]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,a,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zi.subVectors(this.c,this.b),_a.subVectors(this.a,this.b),zi.cross(_a).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Fi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Fi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,a,l,c){return Fi.getInterpolation(t,this.a,this.b,this.c,i,a,l,c)}containsPoint(t){return Fi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Fi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const a=this.a,l=this.b,c=this.c;let f,d;Tr.subVectors(l,a),Ar.subVectors(c,a),Ih.subVectors(t,a);const m=Tr.dot(Ih),p=Ar.dot(Ih);if(m<=0&&p<=0)return i.copy(a);Fh.subVectors(t,l);const g=Tr.dot(Fh),_=Ar.dot(Fh);if(g>=0&&_<=g)return i.copy(l);const v=m*_-g*p;if(v<=0&&m>=0&&g<=0)return f=m/(m-g),i.copy(a).addScaledVector(Tr,f);Hh.subVectors(t,c);const x=Tr.dot(Hh),E=Ar.dot(Hh);if(E>=0&&x<=E)return i.copy(c);const w=x*p-m*E;if(w<=0&&p>=0&&E<=0)return d=p/(p-E),i.copy(a).addScaledVector(Ar,d);const M=g*E-x*_;if(M<=0&&_-g>=0&&x-E>=0)return Lv.subVectors(c,l),d=(_-g)/(_-g+(x-E)),i.copy(l).addScaledVector(Lv,d);const S=1/(M+w+v);return f=w*S,d=v*S,i.copy(a).addScaledVector(Tr,f).addScaledVector(Ar,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class ll{constructor(t=new H(1/0,1/0,1/0),i=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,a=t.length;i<a;i+=3)this.expandByPoint(Bi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,a=t.count;i<a;i++)this.expandByPoint(Bi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,a=t.length;i<a;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const a=Bi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,d=c.count;f<d;f++)t.isMesh===!0?t.getVertexPosition(f,Bi):Bi.fromBufferAttribute(c,f),Bi.applyMatrix4(t.matrixWorld),this.expandByPoint(Bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ac.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Ac.copy(a.boundingBox)),Ac.applyMatrix4(t.matrixWorld),this.union(Ac)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bi),Bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,a;return t.normal.x>0?(i=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),i<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xo),Rc.subVectors(this.max,Xo),Rr.subVectors(t.a,Xo),wr.subVectors(t.b,Xo),Cr.subVectors(t.c,Xo),as.subVectors(wr,Rr),ss.subVectors(Cr,wr),Us.subVectors(Rr,Cr);let i=[0,-as.z,as.y,0,-ss.z,ss.y,0,-Us.z,Us.y,as.z,0,-as.x,ss.z,0,-ss.x,Us.z,0,-Us.x,-as.y,as.x,0,-ss.y,ss.x,0,-Us.y,Us.x,0];return!Xh(i,Rr,wr,Cr,Rc)||(i=[1,0,0,0,1,0,0,0,1],!Xh(i,Rr,wr,Cr,Rc))?!1:(wc.crossVectors(as,ss),i=[wc.x,wc.y,wc.z],Xh(i,Rr,wr,Cr,Rc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Sa=[new H,new H,new H,new H,new H,new H,new H,new H],Bi=new H,Ac=new ll,Rr=new H,wr=new H,Cr=new H,as=new H,ss=new H,Us=new H,Xo=new H,Rc=new H,wc=new H,Ls=new H;function Xh(r,t,i,a,l){for(let c=0,f=r.length-3;c<=f;c+=3){Ls.fromArray(r,c);const d=l.x*Math.abs(Ls.x)+l.y*Math.abs(Ls.y)+l.z*Math.abs(Ls.z),m=t.dot(Ls),p=i.dot(Ls),g=a.dot(Ls);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const gn=new H,Cc=new Qt;let QM=0;class ii extends Vs{constructor(t,i,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:QM++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=a,this.usage=mM,this.updateRanges=[],this.gpuType=Ki,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,a){t*=this.itemSize,a*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[a+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,a=this.count;i<a;i++)Cc.fromBufferAttribute(this,i),Cc.applyMatrix3(t),this.setXY(i,Cc.x,Cc.y);else if(this.itemSize===3)for(let i=0,a=this.count;i<a;i++)gn.fromBufferAttribute(this,i),gn.applyMatrix3(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}applyMatrix4(t){for(let i=0,a=this.count;i<a;i++)gn.fromBufferAttribute(this,i),gn.applyMatrix4(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}applyNormalMatrix(t){for(let i=0,a=this.count;i<a;i++)gn.fromBufferAttribute(this,i),gn.applyNormalMatrix(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}transformDirection(t){for(let i=0,a=this.count;i<a;i++)gn.fromBufferAttribute(this,i),gn.transformDirection(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let a=this.array[t*this.itemSize+i];return this.normalized&&(a=zr(a,this.array)),a}setComponent(t,i,a){return this.normalized&&(a=Wn(a,this.array)),this.array[t*this.itemSize+i]=a,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=zr(i,this.array)),i}setX(t,i){return this.normalized&&(i=Wn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=zr(i,this.array)),i}setY(t,i){return this.normalized&&(i=Wn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=zr(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Wn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=zr(i,this.array)),i}setW(t,i){return this.normalized&&(i=Wn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,a){return t*=this.itemSize,this.normalized&&(i=Wn(i,this.array),a=Wn(a,this.array)),this.array[t+0]=i,this.array[t+1]=a,this}setXYZ(t,i,a,l){return t*=this.itemSize,this.normalized&&(i=Wn(i,this.array),a=Wn(a,this.array),l=Wn(l,this.array)),this.array[t+0]=i,this.array[t+1]=a,this.array[t+2]=l,this}setXYZW(t,i,a,l,c){return t*=this.itemSize,this.normalized&&(i=Wn(i,this.array),a=Wn(a,this.array),l=Wn(l,this.array),c=Wn(c,this.array)),this.array[t+0]=i,this.array[t+1]=a,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class J_ extends ii{constructor(t,i,a){super(new Uint16Array(t),i,a)}}class j_ extends ii{constructor(t,i,a){super(new Uint32Array(t),i,a)}}class Re extends ii{constructor(t,i,a){super(new Float32Array(t),i,a)}}const JM=new ll,Wo=new H,Wh=new H;class ou{constructor(t=new H,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const a=this.center;i!==void 0?a.copy(i):JM.setFromPoints(t).getCenter(a);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const a=this.center.distanceToSquared(t);return i.copy(t),a>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Wo.subVectors(t,this.center);const i=Wo.lengthSq();if(i>this.radius*this.radius){const a=Math.sqrt(i),l=(a-this.radius)*.5;this.center.addScaledVector(Wo,l/a),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Wo.copy(t.center).add(Wh)),this.expandByPoint(Wo.copy(t.center).sub(Wh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let jM=0;const wi=new Ie,qh=new Cn,Dr=new H,gi=new ll,qo=new ll,wn=new H;class xn extends Vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jM++}),this.uuid=qr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gM(t)?j_:J_)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,a=0){this.groups.push({start:t,count:i,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new re().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return wi.makeRotationFromQuaternion(t),this.applyMatrix4(wi),this}rotateX(t){return wi.makeRotationX(t),this.applyMatrix4(wi),this}rotateY(t){return wi.makeRotationY(t),this.applyMatrix4(wi),this}rotateZ(t){return wi.makeRotationZ(t),this.applyMatrix4(wi),this}translate(t,i,a){return wi.makeTranslation(t,i,a),this.applyMatrix4(wi),this}scale(t,i,a){return wi.makeScale(t,i,a),this.applyMatrix4(wi),this}lookAt(t){return qh.lookAt(t),qh.updateMatrix(),this.applyMatrix4(qh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Dr).negate(),this.translate(Dr.x,Dr.y,Dr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const a=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];a.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Re(a,3))}else{const a=Math.min(t.length,i.count);for(let l=0;l<a;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ll);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let a=0,l=i.length;a<l;a++){const c=i[a];gi.setFromBufferAttribute(c),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,gi.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,gi.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(gi.min),this.boundingBox.expandByPoint(gi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ae('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ou);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){const a=this.boundingSphere.center;if(gi.setFromBufferAttribute(t),i)for(let c=0,f=i.length;c<f;c++){const d=i[c];qo.setFromBufferAttribute(d),this.morphTargetsRelative?(wn.addVectors(gi.min,qo.min),gi.expandByPoint(wn),wn.addVectors(gi.max,qo.max),gi.expandByPoint(wn)):(gi.expandByPoint(qo.min),gi.expandByPoint(qo.max))}gi.getCenter(a);let l=0;for(let c=0,f=t.count;c<f;c++)wn.fromBufferAttribute(t,c),l=Math.max(l,a.distanceToSquared(wn));if(i)for(let c=0,f=i.length;c<f;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)wn.fromBufferAttribute(d,p),m&&(Dr.fromBufferAttribute(t,p),wn.add(Dr)),l=Math.max(l,a.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ae('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ae("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=i.position,l=i.normal,c=i.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==a.count)&&(f=new ii(new Float32Array(4*a.count),4),this.setAttribute("tangent",f));const d=[],m=[];for(let b=0;b<a.count;b++)d[b]=new H,m[b]=new H;const p=new H,g=new H,_=new H,v=new Qt,x=new Qt,E=new Qt,w=new H,M=new H;function S(b,C,F){p.fromBufferAttribute(a,b),g.fromBufferAttribute(a,C),_.fromBufferAttribute(a,F),v.fromBufferAttribute(c,b),x.fromBufferAttribute(c,C),E.fromBufferAttribute(c,F),g.sub(p),_.sub(p),x.sub(v),E.sub(v);const k=1/(x.x*E.y-E.x*x.y);isFinite(k)&&(w.copy(g).multiplyScalar(E.y).addScaledVector(_,-x.y).multiplyScalar(k),M.copy(_).multiplyScalar(x.x).addScaledVector(g,-E.x).multiplyScalar(k),d[b].add(w),d[C].add(w),d[F].add(w),m[b].add(M),m[C].add(M),m[F].add(M))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let b=0,C=L.length;b<C;++b){const F=L[b],k=F.start,G=F.count;for(let J=k,X=k+G;J<X;J+=3)S(t.getX(J+0),t.getX(J+1),t.getX(J+2))}const P=new H,A=new H,O=new H,N=new H;function D(b){O.fromBufferAttribute(l,b),N.copy(O);const C=d[b];P.copy(C),P.sub(O.multiplyScalar(O.dot(C))).normalize(),A.crossVectors(N,C);const k=A.dot(m[b])<0?-1:1;f.setXYZW(b,P.x,P.y,P.z,k)}for(let b=0,C=L.length;b<C;++b){const F=L[b],k=F.start,G=F.count;for(let J=k,X=k+G;J<X;J+=3)D(t.getX(J+0)),D(t.getX(J+1)),D(t.getX(J+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==i.count)a=new ii(new Float32Array(i.count*3),3),this.setAttribute("normal",a);else for(let v=0,x=a.count;v<x;v++)a.setXYZ(v,0,0,0);const l=new H,c=new H,f=new H,d=new H,m=new H,p=new H,g=new H,_=new H;if(t)for(let v=0,x=t.count;v<x;v+=3){const E=t.getX(v+0),w=t.getX(v+1),M=t.getX(v+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,w),f.fromBufferAttribute(i,M),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),d.fromBufferAttribute(a,E),m.fromBufferAttribute(a,w),p.fromBufferAttribute(a,M),d.add(g),m.add(g),p.add(g),a.setXYZ(E,d.x,d.y,d.z),a.setXYZ(w,m.x,m.y,m.z),a.setXYZ(M,p.x,p.y,p.z)}else for(let v=0,x=i.count;v<x;v+=3)l.fromBufferAttribute(i,v+0),c.fromBufferAttribute(i,v+1),f.fromBufferAttribute(i,v+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),a.setXYZ(v+0,g.x,g.y,g.z),a.setXYZ(v+1,g.x,g.y,g.z),a.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,a=t.count;i<a;i++)wn.fromBufferAttribute(t,i),wn.normalize(),t.setXYZ(i,wn.x,wn.y,wn.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,_=d.normalized,v=new p.constructor(m.length*g);let x=0,E=0;for(let w=0,M=m.length;w<M;w++){d.isInterleavedBufferAttribute?x=m[w]*d.data.stride+d.offset:x=m[w]*g;for(let S=0;S<g;S++)v[E++]=p[x++]}return new ii(v,g,_)}if(this.index===null)return ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new xn,a=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,a);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,_=p.length;g<_;g++){const v=p[g],x=t(v,a);m.push(x)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,m=f.length;d<m;d++){const p=f[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const a=this.attributes;for(const m in a){const p=a[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let _=0,v=p.length;_<v;_++){const x=p[_];g.push(x.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere=d.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const c=t.morphAttributes;for(const p in c){const g=[],_=c[p];for(let v=0,x=_.length;v<x;v++)g.push(_[v].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let p=0,g=f.length;p<g;p++){const _=f[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yh=new H,$M=new H,t1=new re;class Ma{constructor(t=new H(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,a,l){return this.normal.set(t,i,a),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,a){const l=Yh.subVectors(a,i).cross($M.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,a=!0){const l=t.delta(Yh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const f=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(f<0||f>1)?null:i.copy(t.start).addScaledVector(l,f)}intersectsLine(t){const i=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return i<0&&a>0||a<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const a=i||t1.getNormalMatrix(t),l=this.coplanarPoint(Yh).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let e1=0;class Yr extends Vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:e1++}),this.uuid=qr(),this.name="",this.type="Material",this.blending=Jo,this.side=ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=U_,this.blendDst=L_,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=nl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wh,this.stencilZFail=wh,this.stencilZPass=wh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const a=t[i];if(a===void 0){ne(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ne(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(a):l&&l.isVector2&&a&&a.isVector2||l&&l.isEuler&&a&&a.isEuler||l&&l.isVector3&&a&&a.isVector3?l.copy(a):this[i]=a}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function l(c){const f=[];for(const d in c){const m=c[d];delete m.metadata,f.push(m)}return f}if(i){const c=l(t.textures),f=l(t.images);c.length>0&&(a.textures=c),f.length>0&&(a.images=f)}return a}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new Ma().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Qt().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Qt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let a=null;if(i!==null){const l=i.length;a=new Array(l);for(let c=0;c!==l;++c)a[c]=i[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ya=new H,Zh=new H,Dc=new H,Uc=new H;class fp{constructor(t=new H,i=new H(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ya)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const a=i.dot(this.direction);return a<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=ya.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(ya.copy(this.origin).addScaledVector(this.direction,i),ya.distanceToSquared(t))}distanceSqToSegment(t,i,a,l){Zh.copy(t).add(i).multiplyScalar(.5),Dc.copy(i).sub(t).normalize(),Uc.copy(this.origin).sub(Zh);const c=t.distanceTo(i)*.5,f=-this.direction.dot(Dc),d=Uc.dot(this.direction),m=-Uc.dot(Dc),p=Uc.lengthSq(),g=Math.abs(1-f*f);let _,v,x,E;if(g>0)if(_=f*m-d,v=f*d-m,E=c*g,_>=0)if(v>=-E)if(v<=E){const w=1/g;_*=w,v*=w,x=_*(_+f*v+2*d)+v*(f*_+v+2*m)+p}else v=c,_=Math.max(0,-(f*v+d)),x=-_*_+v*(v+2*m)+p;else v=-c,_=Math.max(0,-(f*v+d)),x=-_*_+v*(v+2*m)+p;else v<=-E?(_=Math.max(0,-(-f*c+d)),v=_>0?-c:Math.min(Math.max(-c,-m),c),x=-_*_+v*(v+2*m)+p):v<=E?(_=0,v=Math.min(Math.max(-c,-m),c),x=v*(v+2*m)+p):(_=Math.max(0,-(f*c+d)),v=_>0?c:Math.min(Math.max(-c,-m),c),x=-_*_+v*(v+2*m)+p);else v=f>0?-c:c,_=Math.max(0,-(f*v+d)),x=-_*_+v*(v+2*m)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Zh).addScaledVector(Dc,v),x}intersectSphere(t,i){if(t.radius<0)return null;ya.subVectors(t.center,this.origin);const a=ya.dot(this.direction),l=ya.dot(ya)-a*a,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),d=a-f,m=a+f;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/i;return a>=0?a:null}intersectPlane(t,i){const a=this.distanceToPlane(t);return a===null?null:this.at(a,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let a,l,c,f,d,m;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return p>=0?(a=(t.min.x-v.x)*p,l=(t.max.x-v.x)*p):(a=(t.max.x-v.x)*p,l=(t.min.x-v.x)*p),g>=0?(c=(t.min.y-v.y)*g,f=(t.max.y-v.y)*g):(c=(t.max.y-v.y)*g,f=(t.min.y-v.y)*g),a>f||c>l||((c>a||isNaN(a))&&(a=c),(f<l||isNaN(l))&&(l=f),_>=0?(d=(t.min.z-v.z)*_,m=(t.max.z-v.z)*_):(d=(t.max.z-v.z)*_,m=(t.min.z-v.z)*_),a>m||d>l)||((d>a||a!==a)&&(a=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(a>=0?a:l,i)}intersectsBox(t){return this.intersectBox(t,ya)!==null}intersectTriangle(t,i,a,l,c){const f=this.origin,d=this.direction,m=d.x,p=d.y,g=d.z,_=t.x-f.x,v=t.y-f.y,x=t.z-f.z,E=i.x-f.x,w=i.y-f.y,M=i.z-f.z,S=a.x-f.x,L=a.y-f.y,P=a.z-f.z,A=Math.abs(m),O=Math.abs(p),N=Math.abs(g);let D,b,C,F,k,G,J,X,$,B,W,ot;if(A>=O&&A>=N?(C=m,G=_,$=E,ot=S,m>=0?(D=p,b=g,F=v,k=x,J=w,X=M,B=L,W=P):(D=g,b=p,F=x,k=v,J=M,X=w,B=P,W=L)):O>=N?(C=p,G=v,$=w,ot=L,p>=0?(D=g,b=m,F=x,k=_,J=M,X=E,B=P,W=S):(D=m,b=g,F=_,k=x,J=E,X=M,B=S,W=P)):(C=g,G=x,$=M,ot=P,g>=0?(D=m,b=p,F=_,k=v,J=E,X=w,B=S,W=L):(D=p,b=m,F=v,k=_,J=w,X=E,B=L,W=S)),C===0)return null;const et=D/C,ft=b/C,z=1/C,tt=F-et*G,gt=k-ft*G,Et=J-et*$,Lt=X-ft*$,kt=B-et*ot,st=W-ft*ot,vt=kt*Lt-st*Et,Tt=tt*st-gt*kt,te=Et*gt-Lt*tt;if(l){if(vt<0||Tt<0||te<0)return null}else if((vt<0||Tt<0||te<0)&&(vt>0||Tt>0||te>0))return null;const Ft=vt+Tt+te;if(Ft===0)return null;const le=z*(vt*G+Tt*$+te*ot);return(Ft>0?le<0:le>0)?null:this.at(le/Ft,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $_ extends Yr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cs,this.combine=N_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Nv=new Ie,Ns=new fp,Lc=new ou,Ov=new H,Nc=new H,Oc=new H,Pc=new H,Kh=new H,zc=new H,Pv=new H,Bc=new H;class tn extends Cn{constructor(t=new xn,i=new $_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,a=Object.keys(i);if(a.length>0){const l=i[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const a=this.geometry,l=a.attributes.position,c=a.morphAttributes.position,f=a.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){zc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],_=c[m];g!==0&&(Kh.fromBufferAttribute(_,t),f?zc.addScaledVector(Kh,g):zc.addScaledVector(Kh.sub(i),g))}i.add(zc)}return i}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const a=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Lc.copy(a.boundingSphere),Lc.applyMatrix4(c),Ns.copy(t.ray).recast(t.near),!(Lc.containsPoint(Ns.origin)===!1&&(Ns.intersectSphere(Lc,Ov)===null||Ns.origin.distanceToSquared(Ov)>(t.far-t.near)**2))&&(Nv.copy(c).invert(),Ns.copy(t.ray).applyMatrix4(Nv),!(a.boundingBox!==null&&Ns.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,i,Ns)))}_computeIntersections(t,i,a){let l;const c=this.geometry,f=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,v=c.groups,x=c.drawRange;if(d!==null)if(Array.isArray(f))for(let E=0,w=v.length;E<w;E++){const M=v[E],S=f[M.materialIndex],L=Math.max(M.start,x.start),P=Math.min(d.count,Math.min(M.start+M.count,x.start+x.count));for(let A=L,O=P;A<O;A+=3){const N=d.getX(A),D=d.getX(A+1),b=d.getX(A+2);l=Ic(this,S,t,a,p,g,_,N,D,b),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,x.start),w=Math.min(d.count,x.start+x.count);for(let M=E,S=w;M<S;M+=3){const L=d.getX(M),P=d.getX(M+1),A=d.getX(M+2);l=Ic(this,f,t,a,p,g,_,L,P,A),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let E=0,w=v.length;E<w;E++){const M=v[E],S=f[M.materialIndex],L=Math.max(M.start,x.start),P=Math.min(m.count,Math.min(M.start+M.count,x.start+x.count));for(let A=L,O=P;A<O;A+=3){const N=A,D=A+1,b=A+2;l=Ic(this,S,t,a,p,g,_,N,D,b),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,x.start),w=Math.min(m.count,x.start+x.count);for(let M=E,S=w;M<S;M+=3){const L=M,P=M+1,A=M+2;l=Ic(this,f,t,a,p,g,_,L,P,A),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function n1(r,t,i,a,l,c,f,d){let m;if(t.side===Hn?m=a.intersectTriangle(f,c,l,!0,d):m=a.intersectTriangle(l,c,f,t.side===ls,d),m===null)return null;Bc.copy(d),Bc.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(Bc);return p<i.near||p>i.far?null:{distance:p,point:Bc.clone(),object:r}}function Ic(r,t,i,a,l,c,f,d,m,p){r.getVertexPosition(d,Nc),r.getVertexPosition(m,Oc),r.getVertexPosition(p,Pc);const g=n1(r,t,i,a,Nc,Oc,Pc,Pv);if(g){const _=new H;Fi.getBarycoord(Pv,Nc,Oc,Pc,_),l&&(g.uv=Fi.getInterpolatedAttribute(l,d,m,p,_,new Qt)),c&&(g.uv1=Fi.getInterpolatedAttribute(c,d,m,p,_,new Qt)),f&&(g.normal=Fi.getInterpolatedAttribute(f,d,m,p,_,new H),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const v={a:d,b:m,c:p,normal:new H,materialIndex:0};Fi.getNormal(Nc,Oc,Pc,v.normal),g.face=v,g.barycoord=_}return g}class i1 extends Gn{constructor(t=null,i=1,a=1,l,c,f,d,m,p=Pn,g=Pn,_,v){super(null,f,d,m,p,g,l,c,_,v),this.isDataTexture=!0,this.image={data:t,width:i,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Os=new ou,a1=new Qt(.5,.5),Fc=new H;class hp{constructor(t=new Ma,i=new Ma,a=new Ma,l=new Ma,c=new Ma,f=new Ma){this.planes=[t,i,a,l,c,f]}set(t,i,a,l,c,f){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(a),d[3].copy(l),d[4].copy(c),d[5].copy(f),this}copy(t){const i=this.planes;for(let a=0;a<6;a++)i[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,i=Qi,a=!1){const l=this.planes,c=t.elements,f=c[0],d=c[1],m=c[2],p=c[3],g=c[4],_=c[5],v=c[6],x=c[7],E=c[8],w=c[9],M=c[10],S=c[11],L=c[12],P=c[13],A=c[14],O=c[15];if(l[0].setComponents(p-f,x-g,S-E,O-L).normalize(),l[1].setComponents(p+f,x+g,S+E,O+L).normalize(),l[2].setComponents(p+d,x+_,S+w,O+P).normalize(),l[3].setComponents(p-d,x-_,S-w,O-P).normalize(),a)l[4].setComponents(m,v,M,A).normalize(),l[5].setComponents(p-m,x-v,S-M,O-A).normalize();else if(l[4].setComponents(p-m,x-v,S-M,O-A).normalize(),i===Qi)l[5].setComponents(p+m,x+v,S+M,O+A).normalize();else if(i===sl)l[5].setComponents(m,v,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Os.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(t){Os.center.set(0,0,0);const i=a1.distanceTo(t.center);return Os.radius=.7071067811865476+i,Os.applyMatrix4(t.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(t){const i=this.planes,a=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(a)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let a=0;a<6;a++){const l=i[a];if(Fc.x=l.normal.x>0?t.max.x:t.min.x,Fc.y=l.normal.y>0?t.max.y:t.min.y,Fc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Fc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let a=0;a<6;a++)if(i[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class s1 extends Yr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const zv=new Ie,qd=new fp,Hc=new ou,Gc=new H;class tx extends Cn{constructor(t=new xn,i=new s1){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const a=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Hc.copy(a.boundingSphere),Hc.applyMatrix4(l),Hc.radius+=c,t.ray.intersectsSphere(Hc)===!1)return;zv.copy(l).invert(),qd.copy(t.ray).applyMatrix4(zv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=a.index,_=a.attributes.position;if(p!==null){const v=Math.max(0,f.start),x=Math.min(p.count,f.start+f.count);for(let E=v,w=x;E<w;E++){const M=p.getX(E);Gc.fromBufferAttribute(_,M),Bv(Gc,M,m,l,t,i,this)}}else{const v=Math.max(0,f.start),x=Math.min(_.count,f.start+f.count);for(let E=v,w=x;E<w;E++)Gc.fromBufferAttribute(_,E),Bv(Gc,E,m,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,a=Object.keys(i);if(a.length>0){const l=i[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Bv(r,t,i,a,l,c,f){const d=qd.distanceSqToPoint(r);if(d<i){const m=new H;qd.closestPointToPoint(r,m),m.applyMatrix4(a);const p=l.ray.origin.distanceTo(m);if(p<l.near||p>l.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class ex extends Gn{constructor(t=[],i=Hs,a,l,c,f,d,m,p,g){super(t,i,a,l,c,f,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class r1 extends Gn{constructor(t,i,a,l,c,f,d,m,p){super(t,i,a,l,c,f,d,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ol extends Gn{constructor(t,i,a=ji,l,c,f,d=Pn,m=Pn,p,g=Ra,_=1){if(g!==Ra&&g!==Is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:t,height:i,depth:_};super(v,l,c,f,d,m,g,a,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new lp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return i.compareFunction=this.compareFunction,i}}class o1 extends ol{constructor(t,i=ji,a=Hs,l,c,f=Pn,d=Pn,m,p=Ra){const g={width:t,height:t,depth:1},_=[g,g,g,g,g,g];super(t,t,i,a,l,c,f,d,m,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class nx extends Gn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class cl extends xn{constructor(t=1,i=1,a=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:a,widthSegments:l,heightSegments:c,depthSegments:f};const d=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],g=[],_=[];let v=0,x=0;E("z","y","x",-1,-1,a,i,t,f,c,0),E("z","y","x",1,-1,a,i,-t,f,c,1),E("x","z","y",1,1,t,a,i,l,f,2),E("x","z","y",1,-1,t,a,-i,l,f,3),E("x","y","z",1,-1,t,i,a,l,c,4),E("x","y","z",-1,-1,t,i,-a,l,c,5),this.setIndex(m),this.setAttribute("position",new Re(p,3)),this.setAttribute("normal",new Re(g,3)),this.setAttribute("uv",new Re(_,2));function E(w,M,S,L,P,A,O,N,D,b,C){const F=A/D,k=O/b,G=A/2,J=O/2,X=N/2,$=D+1,B=b+1;let W=0,ot=0;const et=new H;for(let ft=0;ft<B;ft++){const z=ft*k-J;for(let tt=0;tt<$;tt++){const gt=tt*F-G;et[w]=gt*L,et[M]=z*P,et[S]=X,p.push(et.x,et.y,et.z),et[w]=0,et[M]=0,et[S]=N>0?1:-1,g.push(et.x,et.y,et.z),_.push(tt/D),_.push(1-ft/b),W+=1}}for(let ft=0;ft<b;ft++)for(let z=0;z<D;z++){const tt=v+z+$*ft,gt=v+z+$*(ft+1),Et=v+(z+1)+$*(ft+1),Lt=v+(z+1)+$*ft;m.push(tt,gt,Lt),m.push(gt,Et,Lt),ot+=6}d.addGroup(x,ot,C),x+=ot,v+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class dp extends xn{constructor(t=1,i=32,a=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:a,thetaLength:l},i=Math.max(3,i);const c=[],f=[],d=[],m=[],p=new H,g=new Qt;f.push(0,0,0),d.push(0,0,1),m.push(.5,.5);for(let _=0,v=3;_<=i;_++,v+=3){const x=a+_/i*l;p.x=t*Math.cos(x),p.y=t*Math.sin(x),f.push(p.x,p.y,p.z),d.push(0,0,1),g.x=(f[v]/t+1)/2,g.y=(f[v+1]/t+1)/2,m.push(g.x,g.y)}for(let _=1;_<=i;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new Re(f,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dp(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class pp extends xn{constructor(t=[],i=[],a=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:i,radius:a,detail:l};const c=[],f=[];d(l),p(a),g(),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(c.slice(),3)),this.setAttribute("uv",new Re(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function d(L){const P=new H,A=new H,O=new H;for(let N=0;N<i.length;N+=3)x(i[N+0],P),x(i[N+1],A),x(i[N+2],O),m(P,A,O,L)}function m(L,P,A,O){const N=O+1,D=[];for(let b=0;b<=N;b++){D[b]=[];const C=L.clone().lerp(A,b/N),F=P.clone().lerp(A,b/N),k=N-b;for(let G=0;G<=k;G++)G===0&&b===N?D[b][G]=C:D[b][G]=C.clone().lerp(F,G/k)}for(let b=0;b<N;b++)for(let C=0;C<2*(N-b)-1;C++){const F=Math.floor(C/2);C%2===0?(v(D[b][F+1]),v(D[b+1][F]),v(D[b][F])):(v(D[b][F+1]),v(D[b+1][F+1]),v(D[b+1][F]))}}function p(L){const P=new H;for(let A=0;A<c.length;A+=3)P.x=c[A+0],P.y=c[A+1],P.z=c[A+2],P.normalize().multiplyScalar(L),c[A+0]=P.x,c[A+1]=P.y,c[A+2]=P.z}function g(){const L=new H;for(let P=0;P<c.length;P+=3){L.x=c[P+0],L.y=c[P+1],L.z=c[P+2];const A=M(L)/2/Math.PI+.5,O=S(L)/Math.PI+.5;f.push(A,1-O)}E(),_()}function _(){for(let L=0;L<f.length;L+=6){const P=f[L+0],A=f[L+2],O=f[L+4],N=Math.max(P,A,O),D=Math.min(P,A,O);N>.9&&D<.1&&(P<.2&&(f[L+0]+=1),A<.2&&(f[L+2]+=1),O<.2&&(f[L+4]+=1))}}function v(L){c.push(L.x,L.y,L.z)}function x(L,P){const A=L*3;P.x=t[A+0],P.y=t[A+1],P.z=t[A+2]}function E(){const L=new H,P=new H,A=new H,O=new H,N=new Qt,D=new Qt,b=new Qt;for(let C=0,F=0;C<c.length;C+=9,F+=6){L.set(c[C+0],c[C+1],c[C+2]),P.set(c[C+3],c[C+4],c[C+5]),A.set(c[C+6],c[C+7],c[C+8]),N.set(f[F+0],f[F+1]),D.set(f[F+2],f[F+3]),b.set(f[F+4],f[F+5]),O.copy(L).add(P).add(A).divideScalar(3);const k=M(O);w(N,F+0,L,k),w(D,F+2,P,k),w(b,F+4,A,k)}}function w(L,P,A,O){O<0&&L.x===1&&(f[P]=L.x-1),A.x===0&&A.z===0&&(f[P]=O/2/Math.PI+.5)}function M(L){return Math.atan2(L.z,-L.x)}function S(L){return Math.atan2(-L.y,Math.sqrt(L.x*L.x+L.z*L.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pp(t.vertices,t.indices,t.radius,t.detail)}}class wa{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ne("Curve: .getPoint() not implemented.")}getPointAt(t,i){const a=this.getUtoTmapping(t);return this.getPoint(a,i)}getPoints(t=5){const i=[];for(let a=0;a<=t;a++)i.push(this.getPoint(a/t));return i}getSpacedPoints(t=5){const i=[];for(let a=0;a<=t;a++)i.push(this.getPointAt(a/t));return i}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const i=[];let a,l=this.getPoint(0),c=0;i.push(0);for(let f=1;f<=t;f++)a=this.getPoint(f/t),c+=a.distanceTo(l),i.push(c),l=a;return this.cacheArcLengths=i,i}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,i=null){const a=this.getLengths();let l=0;const c=a.length;let f;i?f=i:f=t*a[c-1];let d=0,m=c-1,p;for(;d<=m;)if(l=Math.floor(d+(m-d)/2),p=a[l]-f,p<0)d=l+1;else if(p>0)m=l-1;else{m=l;break}if(l=m,a[l]===f)return l/(c-1);const g=a[l],v=a[l+1]-g,x=(f-g)/v;return(l+x)/(c-1)}getTangent(t,i){let l=t-1e-4,c=t+1e-4;l<0&&(l=0),c>1&&(c=1);const f=this.getPoint(l),d=this.getPoint(c),m=i||(f.isVector2?new Qt:new H);return m.copy(d).sub(f).normalize(),m}getTangentAt(t,i){const a=this.getUtoTmapping(t);return this.getTangent(a,i)}computeFrenetFrames(t,i=!1){const a=new H,l=[],c=[],f=[],d=new H,m=new Ie;for(let x=0;x<=t;x++){const E=x/t;l[x]=this.getTangentAt(E,new H)}c[0]=new H,f[0]=new H;let p=Number.MAX_VALUE;const g=Math.abs(l[0].x),_=Math.abs(l[0].y),v=Math.abs(l[0].z);g<=p&&(p=g,a.set(1,0,0)),_<=p&&(p=_,a.set(0,1,0)),v<=p&&a.set(0,0,1),d.crossVectors(l[0],a).normalize(),c[0].crossVectors(l[0],d),f[0].crossVectors(l[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),f[x]=f[x-1].clone(),d.crossVectors(l[x-1],l[x]),d.length()>Number.EPSILON){d.normalize();const E=Math.acos(me(l[x-1].dot(l[x]),-1,1));c[x].applyMatrix4(m.makeRotationAxis(d,E))}f[x].crossVectors(l[x],c[x])}if(i===!0){let x=Math.acos(me(c[0].dot(c[t]),-1,1));x/=t,l[0].dot(d.crossVectors(c[0],c[t]))>0&&(x=-x);for(let E=1;E<=t;E++)c[E].applyMatrix4(m.makeRotationAxis(l[E],x*E)),f[E].crossVectors(l[E],c[E])}return{tangents:l,normals:c,binormals:f}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ix extends wa{constructor(t=0,i=0,a=1,l=1,c=0,f=Math.PI*2,d=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=i,this.xRadius=a,this.yRadius=l,this.aStartAngle=c,this.aEndAngle=f,this.aClockwise=d,this.aRotation=m}getPoint(t,i=new Qt){const a=i,l=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const f=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=l;for(;c>l;)c-=l;c<Number.EPSILON&&(f?c=0:c=l),this.aClockwise===!0&&!f&&(c===l?c=-l:c=c-l);const d=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(d),p=this.aY+this.yRadius*Math.sin(d);if(this.aRotation!==0){const g=Math.cos(this.aRotation),_=Math.sin(this.aRotation),v=m-this.aX,x=p-this.aY;m=v*g-x*_+this.aX,p=v*_+x*g+this.aY}return a.set(m,p)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class l1 extends ix{constructor(t,i,a,l,c,f){super(t,i,a,a,l,c,f),this.isArcCurve=!0,this.type="ArcCurve"}}function mp(){let r=0,t=0,i=0,a=0;function l(c,f,d,m){r=c,t=d,i=-3*c+3*f-2*d-m,a=2*c-2*f+d+m}return{initCatmullRom:function(c,f,d,m,p){l(f,d,p*(d-c),p*(m-f))},initNonuniformCatmullRom:function(c,f,d,m,p,g,_){let v=(f-c)/p-(d-c)/(p+g)+(d-f)/g,x=(d-f)/g-(m-f)/(g+_)+(m-d)/_;v*=g,x*=g,l(f,d,v,x)},calc:function(c){const f=c*c,d=f*c;return r+t*c+i*f+a*d}}}const Iv=new H,Fv=new H,Qh=new mp,Jh=new mp,jh=new mp;class ul extends wa{constructor(t=[],i=!1,a="centripetal",l=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=i,this.curveType=a,this.tension=l}getPoint(t,i=new H){const a=i,l=this.points,c=l.length,f=(c-(this.closed?0:1))*t;let d=Math.floor(f),m=f-d;this.closed?d+=d>0?0:(Math.floor(Math.abs(d)/c)+1)*c:m===0&&d===c-1&&(d=c-2,m=1);let p,g;this.closed||d>0?p=l[(d-1)%c]:(Fv.subVectors(l[0],l[1]).add(l[0]),p=Fv);const _=l[d%c],v=l[(d+1)%c];if(this.closed||d+2<c?g=l[(d+2)%c]:(Iv.subVectors(l[c-1],l[c-2]).add(l[c-1]),g=Iv),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let E=Math.pow(p.distanceToSquared(_),x),w=Math.pow(_.distanceToSquared(v),x),M=Math.pow(v.distanceToSquared(g),x);w<1e-4&&(w=1),E<1e-4&&(E=w),M<1e-4&&(M=w),Qh.initNonuniformCatmullRom(p.x,_.x,v.x,g.x,E,w,M),Jh.initNonuniformCatmullRom(p.y,_.y,v.y,g.y,E,w,M),jh.initNonuniformCatmullRom(p.z,_.z,v.z,g.z,E,w,M)}else this.curveType==="catmullrom"&&(Qh.initCatmullRom(p.x,_.x,v.x,g.x,this.tension),Jh.initCatmullRom(p.y,_.y,v.y,g.y,this.tension),jh.initCatmullRom(p.z,_.z,v.z,g.z,this.tension));return a.set(Qh.calc(m),Jh.calc(m),jh.calc(m)),a}copy(t){super.copy(t),this.points=[];for(let i=0,a=t.points.length;i<a;i++){const l=t.points[i];this.points.push(l.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let i=0,a=this.points.length;i<a;i++){const l=this.points[i];t.points.push(l.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let i=0,a=t.points.length;i<a;i++){const l=t.points[i];this.points.push(new H().fromArray(l))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Hv(r,t,i,a,l){const c=(a-t)*.5,f=(l-i)*.5,d=r*r,m=r*d;return(2*i-2*a+c+f)*m+(-3*i+3*a-2*c-f)*d+c*r+i}function c1(r,t){const i=1-r;return i*i*t}function u1(r,t){return 2*(1-r)*r*t}function f1(r,t){return r*r*t}function tl(r,t,i,a){return c1(r,t)+u1(r,i)+f1(r,a)}function h1(r,t){const i=1-r;return i*i*i*t}function d1(r,t){const i=1-r;return 3*i*i*r*t}function p1(r,t){return 3*(1-r)*r*r*t}function m1(r,t){return r*r*r*t}function el(r,t,i,a,l){return h1(r,t)+d1(r,i)+p1(r,a)+m1(r,l)}class g1 extends wa{constructor(t=new Qt,i=new Qt,a=new Qt,l=new Qt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=i,this.v2=a,this.v3=l}getPoint(t,i=new Qt){const a=i,l=this.v0,c=this.v1,f=this.v2,d=this.v3;return a.set(el(t,l.x,c.x,f.x,d.x),el(t,l.y,c.y,f.y,d.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class v1 extends wa{constructor(t=new H,i=new H,a=new H,l=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=i,this.v2=a,this.v3=l}getPoint(t,i=new H){const a=i,l=this.v0,c=this.v1,f=this.v2,d=this.v3;return a.set(el(t,l.x,c.x,f.x,d.x),el(t,l.y,c.y,f.y,d.y),el(t,l.z,c.z,f.z,d.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class _1 extends wa{constructor(t=new Qt,i=new Qt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=i}getPoint(t,i=new Qt){const a=i;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,i){return this.getPoint(t,i)}getTangent(t,i=new Qt){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,i){return this.getTangent(t,i)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class x1 extends wa{constructor(t=new H,i=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=i}getPoint(t,i=new H){const a=i;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,i){return this.getPoint(t,i)}getTangent(t,i=new H){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,i){return this.getTangent(t,i)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class S1 extends wa{constructor(t=new Qt,i=new Qt,a=new Qt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=i,this.v2=a}getPoint(t,i=new Qt){const a=i,l=this.v0,c=this.v1,f=this.v2;return a.set(tl(t,l.x,c.x,f.x),tl(t,l.y,c.y,f.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ax extends wa{constructor(t=new H,i=new H,a=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=i,this.v2=a}getPoint(t,i=new H){const a=i,l=this.v0,c=this.v1,f=this.v2;return a.set(tl(t,l.x,c.x,f.x),tl(t,l.y,c.y,f.y),tl(t,l.z,c.z,f.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class y1 extends wa{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,i=new Qt){const a=i,l=this.points,c=(l.length-1)*t,f=Math.floor(c),d=c-f,m=l[f===0?f:f-1],p=l[f],g=l[f>l.length-2?l.length-1:f+1],_=l[f>l.length-3?l.length-1:f+2];return a.set(Hv(d,m.x,p.x,g.x,_.x),Hv(d,m.y,p.y,g.y,_.y)),a}copy(t){super.copy(t),this.points=[];for(let i=0,a=t.points.length;i<a;i++){const l=t.points[i];this.points.push(l.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let i=0,a=this.points.length;i<a;i++){const l=this.points[i];t.points.push(l.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let i=0,a=t.points.length;i<a;i++){const l=t.points[i];this.points.push(new Qt().fromArray(l))}return this}}var M1=Object.freeze({__proto__:null,ArcCurve:l1,CatmullRomCurve3:ul,CubicBezierCurve:g1,CubicBezierCurve3:v1,EllipseCurve:ix,LineCurve:_1,LineCurve3:x1,QuadraticBezierCurve:S1,QuadraticBezierCurve3:ax,SplineCurve:y1});class gp extends pp{constructor(t=1,i=0){const a=(1+Math.sqrt(5))/2,l=[-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,i),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new gp(t.radius,t.detail)}}class lu extends xn{constructor(t=1,i=1,a=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:a,heightSegments:l};const c=t/2,f=i/2,d=Math.floor(a),m=Math.floor(l),p=d+1,g=m+1,_=t/d,v=i/m,x=[],E=[],w=[],M=[];for(let S=0;S<g;S++){const L=S*v-f;for(let P=0;P<p;P++){const A=P*_-c;E.push(A,-L,0),w.push(0,0,1),M.push(P/d),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let L=0;L<d;L++){const P=L+p*S,A=L+p*(S+1),O=L+1+p*(S+1),N=L+1+p*S;x.push(P,A,N),x.push(A,O,N)}this.setIndex(x),this.setAttribute("position",new Re(E,3)),this.setAttribute("normal",new Re(w,3)),this.setAttribute("uv",new Re(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lu(t.width,t.height,t.widthSegments,t.heightSegments)}}class vp extends xn{constructor(t=.5,i=1,a=32,l=1,c=0,f=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:i,thetaSegments:a,phiSegments:l,thetaStart:c,thetaLength:f},a=Math.max(3,a),l=Math.max(1,l);const d=[],m=[],p=[],g=[];let _=t;const v=(i-t)/l,x=new H,E=new Qt;for(let w=0;w<=l;w++){for(let M=0;M<=a;M++){const S=c+M/a*f;x.x=_*Math.cos(S),x.y=_*Math.sin(S),m.push(x.x,x.y,x.z),p.push(0,0,1),E.x=(x.x/i+1)/2,E.y=(x.y/i+1)/2,g.push(E.x,E.y)}_+=v}for(let w=0;w<l;w++){const M=w*(a+1);for(let S=0;S<a;S++){const L=S+M,P=L,A=L+a+1,O=L+a+2,N=L+1;d.push(P,A,N),d.push(A,O,N)}}this.setIndex(d),this.setAttribute("position",new Re(m,3)),this.setAttribute("normal",new Re(p,3)),this.setAttribute("uv",new Re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vp(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Br extends xn{constructor(t=1,i=32,a=16,l=0,c=Math.PI*2,f=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:a,phiStart:l,phiLength:c,thetaStart:f,thetaLength:d},i=Math.max(3,Math.floor(i)),a=Math.max(2,Math.floor(a));const m=Math.min(f+d,Math.PI);let p=0;const g=[],_=new H,v=new H,x=[],E=[],w=[],M=[];for(let S=0;S<=a;S++){const L=[],P=S/a,A=f+P*d,O=t*Math.cos(A),N=Math.sqrt(t*t-O*O);let D=0;S===0&&f===0?D=.5/i:S===a&&m===Math.PI&&(D=-.5/i);for(let b=0;b<=i;b++){const C=b/i,F=l+C*c;_.x=-N*Math.cos(F),_.y=O,_.z=N*Math.sin(F),E.push(_.x,_.y,_.z),v.copy(_).normalize(),w.push(v.x,v.y,v.z),M.push(C+D,1-P),L.push(p++)}g.push(L)}for(let S=0;S<a;S++)for(let L=0;L<i;L++){const P=g[S][L+1],A=g[S][L],O=g[S+1][L],N=g[S+1][L+1];(S!==0||f>0)&&x.push(P,A,N),(S!==a-1||m<Math.PI)&&x.push(A,O,N)}this.setIndex(x),this.setAttribute("position",new Re(E,3)),this.setAttribute("normal",new Re(w,3)),this.setAttribute("uv",new Re(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Br(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class _p extends xn{constructor(t=new ax(new H(-1,-1,0),new H(-1,1,0),new H(1,1,0)),i=64,a=1,l=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:i,radius:a,radialSegments:l,closed:c};const f=t.computeFrenetFrames(i,c);this.tangents=f.tangents,this.normals=f.normals,this.binormals=f.binormals;const d=new H,m=new H,p=new Qt;let g=new H;const _=[],v=[],x=[],E=[];w(),this.setIndex(E),this.setAttribute("position",new Re(_,3)),this.setAttribute("normal",new Re(v,3)),this.setAttribute("uv",new Re(x,2));function w(){for(let P=0;P<i;P++)M(P);M(c===!1?i:0),L(),S()}function M(P){g=t.getPointAt(P/i,g);const A=f.normals[P],O=f.binormals[P];for(let N=0;N<=l;N++){const D=N/l*Math.PI*2,b=Math.sin(D),C=-Math.cos(D);m.x=C*A.x+b*O.x,m.y=C*A.y+b*O.y,m.z=C*A.z+b*O.z,m.normalize(),v.push(m.x,m.y,m.z),d.x=g.x+a*m.x,d.y=g.y+a*m.y,d.z=g.z+a*m.z,_.push(d.x,d.y,d.z)}}function S(){for(let P=1;P<=i;P++)for(let A=1;A<=l;A++){const O=(l+1)*(P-1)+(A-1),N=(l+1)*P+(A-1),D=(l+1)*P+A,b=(l+1)*(P-1)+A;E.push(O,N,b),E.push(N,D,b)}}function L(){for(let P=0;P<=i;P++)for(let A=0;A<=l;A++)p.x=P/i,p.y=A/l,x.push(p.x,p.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new _p(new M1[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Xr(r){const t={};for(const i in r){t[i]={};for(const a in r[i]){const l=r[i][a];if(Gv(l))l.isRenderTargetTexture?(ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][a]=null):t[i][a]=l.clone();else if(Array.isArray(l))if(Gv(l[0])){const c=[];for(let f=0,d=l.length;f<d;f++)c[f]=l[f].clone();t[i][a]=c}else t[i][a]=l.slice();else t[i][a]=l}}return t}function qn(r){const t={};for(let i=0;i<r.length;i++){const a=Xr(r[i]);for(const l in a)t[l]=a[l]}return t}function Gv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function E1(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function sx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ee.workingColorSpace}const rx={clone:Xr,merge:qn};var b1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,T1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Yr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=b1,this.fragmentShader=T1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xr(t.uniforms),this.uniformsGroups=E1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const a={};for(const l in this.extensions)this.extensions[l]===!0&&(a[l]=!0);return Object.keys(a).length>0&&(i.extensions=a),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const a in t.uniforms){const l=t.uniforms[a];switch(this.uniforms[a]={},l.type){case"t":this.uniforms[a].value=i[l.value]||null;break;case"c":this.uniforms[a].value=new ee().setHex(l.value);break;case"v2":this.uniforms[a].value=new Qt().fromArray(l.value);break;case"v3":this.uniforms[a].value=new H().fromArray(l.value);break;case"v4":this.uniforms[a].value=new Ze().fromArray(l.value);break;case"m3":this.uniforms[a].value=new re().fromArray(l.value);break;case"m4":this.uniforms[a].value=new Ie().fromArray(l.value);break;default:this.uniforms[a].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class A1 extends _n{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class zs extends Yr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wd,this.normalScale=new Qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class R1 extends zs{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Qt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(i){this.ior=(1+.4*i)/(1-.4*i)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class w1 extends Yr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class C1 extends Yr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class cu extends Cn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=i}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}class D1 extends cu{constructor(t,i,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}toJSON(t){const i=super.toJSON(t);return i.object.groundColor=this.groundColor.getHex(),i}}const $h=new Ie,Vv=new H,kv=new H;class ox{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Qt(512,512),this.mapType=Yn,this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hp,this._frameExtents=new Qt(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera;Vv.setFromMatrixPosition(t.matrixWorld),i.position.copy(Vv),kv.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(kv),i.updateMatrixWorld(),this._updateMatrix(i,this.matrix,this._frustum)}_updateMatrix(t,i,a,l){$h.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix($h,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,f=l?l.z/c.x:1,d=l?l.w/c.y:1,m=l?l.x/c.x:0,p=l?l.y/c.y:0;t.coordinateSystem===sl||t.reversedDepth?i.set(.5*f,0,0,.5*f+m,0,.5*d,0,.5*d+p,0,0,1,0,0,0,0,1):i.set(.5*f,0,0,.5*f+m,0,.5*d,0,.5*d+p,0,0,.5,.5,0,0,0,1),i.multiply($h)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Vc=new H,kc=new fs,qi=new H;class lx extends Cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=Qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Vc,kc,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vc,kc,qi.set(1,1,1)).invert()}updateWorldMatrix(t,i,a=!1){super.updateWorldMatrix(t,i,a),this.matrixWorld.decompose(Vc,kc,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vc,kc,qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const rs=new H,Xv=new Qt,Wv=new Qt;class vi extends lx{constructor(t=50,i=1,a=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=rl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(jo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rl*2*Math.atan(Math.tan(jo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,a){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rs.x,rs.y).multiplyScalar(-t/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(rs.x,rs.y).multiplyScalar(-t/rs.z)}getViewSize(t,i){return this.getViewBounds(t,Xv,Wv),i.subVectors(Wv,Xv)}setViewOffset(t,i,a,l,c,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(jo*.5*this.fov)/this.zoom,a=2*i,l=this.aspect*a,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*a/p,l*=f.width/m,a*=f.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class U1 extends ox{constructor(){super(new vi(90,1,.5,500)),this.isPointLightShadow=!0}}class qv extends cu{constructor(t,i,a=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=l,this.shadow=new U1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class xp extends lx{constructor(t=-1,i=1,a=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=a,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,a,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=a-t,f=a+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class L1 extends ox{constructor(){super(new xp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yv extends cu{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.shadow=new L1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}const Ur=-90,Lr=1;class N1 extends Cn{constructor(t,i,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new vi(Ur,Lr,t,i);l.layers=this.layers,this.add(l);const c=new vi(Ur,Lr,t,i);c.layers=this.layers,this.add(c);const f=new vi(Ur,Lr,t,i);f.layers=this.layers,this.add(f);const d=new vi(Ur,Lr,t,i);d.layers=this.layers,this.add(d);const m=new vi(Ur,Lr,t,i);m.layers=this.layers,this.add(m);const p=new vi(Ur,Lr,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[a,l,c,f,d,m]=i;for(const p of i)this.remove(p);if(t===Qi)a.up.set(0,1,0),a.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===sl)a.up.set(0,-1,0),a.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,d,m,p,g]=this.children,_=t.getRenderTarget(),v=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const w=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(a,0,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(a,1,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,f),t.setRenderTarget(a,2,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),t.setRenderTarget(a,3,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(a,4,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),a.texture.generateMipmaps=w,t.setRenderTarget(a,5,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,g),t.setRenderTarget(_,v,x),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class O1 extends vi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Zv=new Ie;class P1{constructor(t,i,a=0,l=1/0){this.ray=new fp(t,i),this.near=a,this.far=l,this.camera=null,this.layers=new cp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,i.projectionMatrix.elements[14]).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):Ae("Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return Zv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zv),this}intersectObject(t,i=!0,a=[]){return Yd(t,this,a,i),a.sort(Kv),a}intersectObjects(t,i=!0,a=[]){for(let l=0,c=t.length;l<c;l++)Yd(t[l],this,a,i);return a.sort(Kv),a}}function Kv(r,t){return r.distance-t.distance}function Yd(r,t,i,a){let l=!0;if(r.layers.test(t.layers)&&r.raycast(t,i)===!1&&(l=!1),l===!0&&a===!0){const c=r.children;for(let f=0,d=c.length;f<d;f++)Yd(c[f],t,i,!0)}}const Tp=class Tp{constructor(t,i,a,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,a,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let a=0;a<4;a++)this.elements[a]=t[a+i];return this}set(t,i,a,l){const c=this.elements;return c[0]=t,c[2]=i,c[1]=a,c[3]=l,this}};Tp.prototype.isMatrix2=!0;let Qv=Tp;function Jv(r,t,i,a){const l=z1(a);switch(i){case W_:return r*t;case Y_:return r*t/l.components*l.byteLength;case np:return r*t/l.components*l.byteLength;case Gs:return r*t*2/l.components*l.byteLength;case ip:return r*t*2/l.components*l.byteLength;case q_:return r*t*3/l.components*l.byteLength;case Ci:return r*t*4/l.components*l.byteLength;case ap:return r*t*4/l.components*l.byteLength;case Zc:case Kc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Qc:case Jc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case gd:case _d:return Math.max(r,16)*Math.max(t,8)/4;case md:case vd:return Math.max(r,8)*Math.max(t,8)/2;case xd:case Sd:case Md:case Ed:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case yd:case tu:case bd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Td:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ad:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Rd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case wd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Cd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Dd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Ud:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Ld:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Nd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Od:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Pd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case zd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Bd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Id:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Fd:case Hd:case Gd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Vd:case kd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case eu:case Xd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function z1(r){switch(r){case Yn:case G_:return{byteLength:1,components:1};case il:case V_:case si:return{byteLength:2,components:1};case tp:case ep:return{byteLength:2,components:4};case ji:case $d:case Ki:return{byteLength:4,components:1};case k_:case X_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jd}}));typeof window<"u"&&(window.__THREE__?ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jd);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function cx(){let r=null,t=!1,i=null,a=null;function l(c,f){a=r.requestAnimationFrame(l),i(c,f)}return{start:function(){t!==!0&&i!==null&&r!==null&&(a=r.requestAnimationFrame(l),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function B1(r){const t=new WeakMap;function i(d,m){const p=d.array,g=d.usage,_=p.byteLength,v=r.createBuffer();r.bindBuffer(m,v),r.bufferData(m,p,g),d.onUploadCallback();let x;if(p instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)x=r.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)x=r.SHORT;else if(p instanceof Uint32Array)x=r.UNSIGNED_INT;else if(p instanceof Int32Array)x=r.INT;else if(p instanceof Int8Array)x=r.BYTE;else if(p instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:v,type:x,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function a(d,m,p){const g=m.array,_=m.updateRanges;if(r.bindBuffer(p,d),_.length===0)r.bufferSubData(p,0,g);else{_.sort((x,E)=>x.start-E.start);let v=0;for(let x=1;x<_.length;x++){const E=_[v],w=_[x];w.start<=E.start+E.count+1?E.count=Math.max(E.count,w.start+w.count-E.start):(++v,_[v]=w)}_.length=v+1;for(let x=0,E=_.length;x<E;x++){const w=_[x];r.bufferSubData(p,w.start*g.BYTES_PER_ELEMENT,g,w.start,w.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function f(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:f}}var I1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,F1=`#ifdef USE_ALPHAHASH
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
#endif`,H1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,G1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,V1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,k1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,X1=`#ifdef USE_AOMAP
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
#endif`,W1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,q1=`#ifdef USE_BATCHING
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
#endif`,Y1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Z1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,K1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Q1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,J1=`#ifdef USE_IRIDESCENCE
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
#endif`,j1=`#ifdef USE_BUMPMAP
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
#endif`,$1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,iE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,aE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,sE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,rE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,oE=`#define PI 3.141592653589793
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
} // validated`,lE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cE=`vec3 transformedNormal = objectNormal;
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
#endif`,uE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pE="gl_FragColor = linearToOutputTexel( gl_FragColor );",mE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gE=`#ifdef USE_ENVMAP
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
#endif`,vE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_E=`#ifdef USE_ENVMAP
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
#endif`,xE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,SE=`#ifdef USE_ENVMAP
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
#endif`,yE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ME=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,EE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,TE=`#ifdef USE_GRADIENTMAP
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
}`,AE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,RE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,DE=`#ifdef USE_ENVMAP
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
#endif`,UE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,NE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,OE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,PE=`PhysicalMaterial material;
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
#endif`,zE=`uniform sampler2D dfgLUT;
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
}`,BE=`
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
#endif`,IE=`#if defined( RE_IndirectDiffuse )
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
#endif`,FE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,HE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,GE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,VE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,WE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,YE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ZE=`#if defined( USE_POINTS_UV )
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
#endif`,KE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,QE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,JE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$E=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tb=`#ifdef USE_MORPHTARGETS
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
#endif`,eb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ib=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ab=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ob=`#ifdef USE_NORMALMAP
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
#endif`,lb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ub=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,db=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_b=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Eb=`float getShadowMask() {
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
}`,bb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tb=`#ifdef USE_SKINNING
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
#endif`,Ab=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rb=`#ifdef USE_SKINNING
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
#endif`,wb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Db=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ub=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lb=`#ifdef USE_TRANSMISSION
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
#endif`,Nb=`#ifdef USE_TRANSMISSION
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
#endif`,Ob=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ib=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fb=`uniform sampler2D t2D;
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
}`,Hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Vb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xb=`#include <common>
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
}`,Wb=`#if DEPTH_PACKING == 3200
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
}`,qb=`#define DISTANCE
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
}`,Yb=`#define DISTANCE
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
}`,Zb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qb=`uniform float scale;
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
}`,Jb=`uniform vec3 diffuse;
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
}`,jb=`#include <common>
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
}`,$b=`uniform vec3 diffuse;
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
}`,tT=`#define LAMBERT
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
}`,eT=`#define LAMBERT
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
}`,nT=`#define MATCAP
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
}`,iT=`#define MATCAP
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
}`,aT=`#define NORMAL
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
}`,sT=`#define NORMAL
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
}`,rT=`#define PHONG
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
}`,oT=`#define PHONG
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
}`,lT=`#define STANDARD
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
}`,cT=`#define STANDARD
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
}`,uT=`#define TOON
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
}`,fT=`#define TOON
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
}`,hT=`uniform float size;
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
}`,dT=`uniform vec3 diffuse;
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
}`,pT=`#include <common>
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
}`,mT=`uniform vec3 color;
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
}`,gT=`uniform float rotation;
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
}`,vT=`uniform vec3 diffuse;
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
}`,de={alphahash_fragment:I1,alphahash_pars_fragment:F1,alphamap_fragment:H1,alphamap_pars_fragment:G1,alphatest_fragment:V1,alphatest_pars_fragment:k1,aomap_fragment:X1,aomap_pars_fragment:W1,batching_pars_vertex:q1,batching_vertex:Y1,begin_vertex:Z1,beginnormal_vertex:K1,bsdfs:Q1,iridescence_fragment:J1,bumpmap_pars_fragment:j1,clipping_planes_fragment:$1,clipping_planes_pars_fragment:tE,clipping_planes_pars_vertex:eE,clipping_planes_vertex:nE,color_fragment:iE,color_pars_fragment:aE,color_pars_vertex:sE,color_vertex:rE,common:oE,cube_uv_reflection_fragment:lE,defaultnormal_vertex:cE,displacementmap_pars_vertex:uE,displacementmap_vertex:fE,emissivemap_fragment:hE,emissivemap_pars_fragment:dE,colorspace_fragment:pE,colorspace_pars_fragment:mE,envmap_fragment:gE,envmap_common_pars_fragment:vE,envmap_pars_fragment:_E,envmap_pars_vertex:xE,envmap_physical_pars_fragment:DE,envmap_vertex:SE,fog_vertex:yE,fog_pars_vertex:ME,fog_fragment:EE,fog_pars_fragment:bE,gradientmap_pars_fragment:TE,lightmap_pars_fragment:AE,lights_lambert_fragment:RE,lights_lambert_pars_fragment:wE,lights_pars_begin:CE,lights_toon_fragment:UE,lights_toon_pars_fragment:LE,lights_phong_fragment:NE,lights_phong_pars_fragment:OE,lights_physical_fragment:PE,lights_physical_pars_fragment:zE,lights_fragment_begin:BE,lights_fragment_maps:IE,lights_fragment_end:FE,lightprobes_pars_fragment:HE,logdepthbuf_fragment:GE,logdepthbuf_pars_fragment:VE,logdepthbuf_pars_vertex:kE,logdepthbuf_vertex:XE,map_fragment:WE,map_pars_fragment:qE,map_particle_fragment:YE,map_particle_pars_fragment:ZE,metalnessmap_fragment:KE,metalnessmap_pars_fragment:QE,morphinstance_vertex:JE,morphcolor_vertex:jE,morphnormal_vertex:$E,morphtarget_pars_vertex:tb,morphtarget_vertex:eb,normal_fragment_begin:nb,normal_fragment_maps:ib,normal_pars_fragment:ab,normal_pars_vertex:sb,normal_vertex:rb,normalmap_pars_fragment:ob,clearcoat_normal_fragment_begin:lb,clearcoat_normal_fragment_maps:cb,clearcoat_pars_fragment:ub,iridescence_pars_fragment:fb,opaque_fragment:hb,packing:db,premultiplied_alpha_fragment:pb,project_vertex:mb,dithering_fragment:gb,dithering_pars_fragment:vb,roughnessmap_fragment:_b,roughnessmap_pars_fragment:xb,shadowmap_pars_fragment:Sb,shadowmap_pars_vertex:yb,shadowmap_vertex:Mb,shadowmask_pars_fragment:Eb,skinbase_vertex:bb,skinning_pars_vertex:Tb,skinning_vertex:Ab,skinnormal_vertex:Rb,specularmap_fragment:wb,specularmap_pars_fragment:Cb,tonemapping_fragment:Db,tonemapping_pars_fragment:Ub,transmission_fragment:Lb,transmission_pars_fragment:Nb,uv_pars_fragment:Ob,uv_pars_vertex:Pb,uv_vertex:zb,worldpos_vertex:Bb,background_vert:Ib,background_frag:Fb,backgroundCube_vert:Hb,backgroundCube_frag:Gb,cube_vert:Vb,cube_frag:kb,depth_vert:Xb,depth_frag:Wb,distance_vert:qb,distance_frag:Yb,equirect_vert:Zb,equirect_frag:Kb,linedashed_vert:Qb,linedashed_frag:Jb,meshbasic_vert:jb,meshbasic_frag:$b,meshlambert_vert:tT,meshlambert_frag:eT,meshmatcap_vert:nT,meshmatcap_frag:iT,meshnormal_vert:aT,meshnormal_frag:sT,meshphong_vert:rT,meshphong_frag:oT,meshphysical_vert:lT,meshphysical_frag:cT,meshtoon_vert:uT,meshtoon_frag:fT,points_vert:hT,points_frag:dT,shadow_vert:pT,shadow_frag:mT,sprite_vert:gT,sprite_frag:vT},Pt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new Qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},Zi={basic:{uniforms:qn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:qn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:qn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:qn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:qn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:qn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:qn([Pt.points,Pt.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:qn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:qn([Pt.common,Pt.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:qn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:qn([Pt.sprite,Pt.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distance:{uniforms:qn([Pt.common,Pt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distance_vert,fragmentShader:de.distance_frag},shadow:{uniforms:qn([Pt.lights,Pt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};Zi.physical={uniforms:qn([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new Qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new Qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new Qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const Xc={r:0,b:0,g:0},_T=new Ie,ux=new re;ux.set(-1,0,0,0,1,0,0,0,1);function xT(r,t,i,a,l,c){const f=new ee(0);let d=l===!0?0:1,m,p,g=null,_=0,v=null;function x(L){let P=L.isScene===!0?L.background:null;if(P&&P.isTexture){const A=L.backgroundBlurriness>0;P=t.get(P,A)}return P}function E(L){let P=!1;const A=x(L);A===null?M(f,d):A&&A.isColor&&(M(A,1),P=!0);const O=r.xr.getEnvironmentBlendMode();O==="additive"?i.buffers.color.setClear(0,0,0,1,c):O==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||P)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function w(L,P){const A=x(P);A&&(A.isCubeTexture||A.mapping===ru)?(p===void 0&&(p=new tn(new cl(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Xr(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(O,N,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=A,p.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(_T.makeRotationFromEuler(P.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(ux),p.material.toneMapped=Ee.getTransfer(A.colorSpace)!==Be,(g!==A||_!==A.version||v!==r.toneMapping)&&(p.material.needsUpdate=!0,g=A,_=A.version,v=r.toneMapping),p.layers.enableAll(),L.unshift(p,p.geometry,p.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new tn(new lu(2,2),new _n({name:"BackgroundMaterial",uniforms:Xr(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:ls,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,m.material.toneMapped=Ee.getTransfer(A.colorSpace)!==Be,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||_!==A.version||v!==r.toneMapping)&&(m.material.needsUpdate=!0,g=A,_=A.version,v=r.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function M(L,P){L.getRGB(Xc,sx(r)),i.buffers.color.setClear(Xc.r,Xc.g,Xc.b,P,c)}function S(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(L,P=1){f.set(L),d=P,M(f,d)},getClearAlpha:function(){return d},setClearAlpha:function(L){d=L,M(f,d)},render:E,addToRenderList:w,dispose:S}}function ST(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},l=v(null);let c=l,f=!1;function d(k,G,J,X,$){let B=!1;const W=_(k,X,J,G);c!==W&&(c=W,p(c.object)),B=x(k,X,J,$),B&&E(k,X,J,$),$!==null&&t.update($,r.ELEMENT_ARRAY_BUFFER),(B||f)&&(f=!1,A(k,G,J,X),$!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function m(){return r.createVertexArray()}function p(k){return r.bindVertexArray(k)}function g(k){return r.deleteVertexArray(k)}function _(k,G,J,X){const $=X.wireframe===!0;let B=a[G.id];B===void 0&&(B={},a[G.id]=B);const W=k.isInstancedMesh===!0?k.id:0;let ot=B[W];ot===void 0&&(ot={},B[W]=ot);let et=ot[J.id];et===void 0&&(et={},ot[J.id]=et);let ft=et[$];return ft===void 0&&(ft=v(m()),et[$]=ft),ft}function v(k){const G=[],J=[],X=[];for(let $=0;$<i;$++)G[$]=0,J[$]=0,X[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:J,attributeDivisors:X,object:k,attributes:{},index:null}}function x(k,G,J,X){const $=c.attributes,B=G.attributes;let W=0;const ot=J.getAttributes();for(const et in ot)if(ot[et].location>=0){const z=$[et];let tt=B[et];if(tt===void 0&&(et==="instanceMatrix"&&k.instanceMatrix&&(tt=k.instanceMatrix),et==="instanceColor"&&k.instanceColor&&(tt=k.instanceColor)),z===void 0||z.attribute!==tt||tt&&z.data!==tt.data)return!0;W++}return c.attributesNum!==W||c.index!==X}function E(k,G,J,X){const $={},B=G.attributes;let W=0;const ot=J.getAttributes();for(const et in ot)if(ot[et].location>=0){let z=B[et];z===void 0&&(et==="instanceMatrix"&&k.instanceMatrix&&(z=k.instanceMatrix),et==="instanceColor"&&k.instanceColor&&(z=k.instanceColor));const tt={};tt.attribute=z,z&&z.data&&(tt.data=z.data),$[et]=tt,W++}c.attributes=$,c.attributesNum=W,c.index=X}function w(){const k=c.newAttributes;for(let G=0,J=k.length;G<J;G++)k[G]=0}function M(k){S(k,0)}function S(k,G){const J=c.newAttributes,X=c.enabledAttributes,$=c.attributeDivisors;J[k]=1,X[k]===0&&(r.enableVertexAttribArray(k),X[k]=1),$[k]!==G&&(r.vertexAttribDivisor(k,G),$[k]=G)}function L(){const k=c.newAttributes,G=c.enabledAttributes;for(let J=0,X=G.length;J<X;J++)G[J]!==k[J]&&(r.disableVertexAttribArray(J),G[J]=0)}function P(k,G,J,X,$,B,W){W===!0?r.vertexAttribIPointer(k,G,J,$,B):r.vertexAttribPointer(k,G,J,X,$,B)}function A(k,G,J,X){w();const $=X.attributes,B=J.getAttributes(),W=G.defaultAttributeValues;for(const ot in B){const et=B[ot];if(et.location>=0){let ft=$[ot];if(ft===void 0&&(ot==="instanceMatrix"&&k.instanceMatrix&&(ft=k.instanceMatrix),ot==="instanceColor"&&k.instanceColor&&(ft=k.instanceColor)),ft!==void 0){const z=ft.normalized,tt=ft.itemSize,gt=t.get(ft);if(gt===void 0)continue;const Et=gt.buffer,Lt=gt.type,kt=gt.bytesPerElement,st=Lt===r.INT||Lt===r.UNSIGNED_INT||ft.gpuType===$d;if(ft.isInterleavedBufferAttribute){const vt=ft.data,Tt=vt.stride,te=ft.offset;if(vt.isInstancedInterleavedBuffer){for(let Ft=0;Ft<et.locationSize;Ft++)S(et.location+Ft,vt.meshPerAttribute);k.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let Ft=0;Ft<et.locationSize;Ft++)M(et.location+Ft);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let Ft=0;Ft<et.locationSize;Ft++)P(et.location+Ft,tt/et.locationSize,Lt,z,Tt*kt,(te+tt/et.locationSize*Ft)*kt,st)}else{if(ft.isInstancedBufferAttribute){for(let vt=0;vt<et.locationSize;vt++)S(et.location+vt,ft.meshPerAttribute);k.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let vt=0;vt<et.locationSize;vt++)M(et.location+vt);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let vt=0;vt<et.locationSize;vt++)P(et.location+vt,tt/et.locationSize,Lt,z,tt*kt,tt/et.locationSize*vt*kt,st)}}else if(W!==void 0){const z=W[ot];if(z!==void 0)switch(z.length){case 2:r.vertexAttrib2fv(et.location,z);break;case 3:r.vertexAttrib3fv(et.location,z);break;case 4:r.vertexAttrib4fv(et.location,z);break;default:r.vertexAttrib1fv(et.location,z)}}}}L()}function O(){C();for(const k in a){const G=a[k];for(const J in G){const X=G[J];for(const $ in X){const B=X[$];for(const W in B)g(B[W].object),delete B[W];delete X[$]}}delete a[k]}}function N(k){if(a[k.id]===void 0)return;const G=a[k.id];for(const J in G){const X=G[J];for(const $ in X){const B=X[$];for(const W in B)g(B[W].object),delete B[W];delete X[$]}}delete a[k.id]}function D(k){for(const G in a){const J=a[G];for(const X in J){const $=J[X];if($[k.id]===void 0)continue;const B=$[k.id];for(const W in B)g(B[W].object),delete B[W];delete $[k.id]}}}function b(k){for(const G in a){const J=a[G],X=k.isInstancedMesh===!0?k.id:0,$=J[X];if($!==void 0){for(const B in $){const W=$[B];for(const ot in W)g(W[ot].object),delete W[ot];delete $[B]}delete J[X],Object.keys(J).length===0&&delete a[G]}}}function C(){F(),f=!0,c!==l&&(c=l,p(c.object))}function F(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:C,resetDefaultState:F,dispose:O,releaseStatesOfGeometry:N,releaseStatesOfObject:b,releaseStatesOfProgram:D,initAttributes:w,enableAttribute:M,disableUnusedAttributes:L}}function yT(r,t,i){let a;function l(m){a=m}function c(m,p){r.drawArrays(a,m,p),i.update(p,a,1)}function f(m,p,g){g!==0&&(r.drawArraysInstanced(a,m,p,g),i.update(p,a,g))}function d(m,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,p,0,g);let v=0;for(let x=0;x<g;x++)v+=p[x];i.update(v,a,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=d}function MT(r,t,i,a){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(D){return!(D!==Ci&&a.convert(D)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(D){const b=D===si&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==Yn&&D!==Ki&&!b&&a.convert(D)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(D){if(D==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=m(p);g!==p&&(ne("WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=i.logarithmicDepthBuffer===!0,v=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&v===!1&&ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),L=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),P=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),O=r.getParameter(r.MAX_SAMPLES),N=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:x,maxVertexTextures:E,maxTextureSize:w,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:L,maxVaryings:P,maxFragmentUniforms:A,maxSamples:O,samples:N}}function ET(r){const t=this;let i=null,a=0,l=!1,c=!1;const f=new Ma,d=new re,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const x=_.length!==0||v||a!==0||l;return l=v,a=_.length,x},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,v){i=g(_,v,0)},this.setState=function(_,v,x){const E=_.clippingPlanes,w=_.clipIntersection,M=_.clipShadows,S=r.get(_);if(!l||E===null||E.length===0||c&&!M)c?g(null):p();else{const L=c?0:a,P=L*4;let A=S.clippingState||null;m.value=A,A=g(E,v,P,x);for(let O=0;O!==P;++O)A[O]=i[O];S.clippingState=A,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=L}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(_,v,x,E){const w=_!==null?_.length:0;let M=null;if(w!==0){if(M=m.value,E!==!0||M===null){const S=x+w*4,L=v.matrixWorldInverse;d.getNormalMatrix(L),(M===null||M.length<S)&&(M=new Float32Array(S));for(let P=0,A=x;P!==w;++P,A+=4)f.copy(_[P]).applyMatrix4(L,d),f.normal.toArray(M,A),M[A+3]=f.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,M}}const Ir=4,bT=6,TT=20,AT=256,Yo=new xp,jv=new ee;let td=null,ed=0,nd=0,id=!1;const RT=new H,Ps=new H;class $v{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,a=.1,l=100,c={}){const{size:f=256,position:d=RT}=c;td=this._renderer.getRenderTarget(),ed=this._renderer.getActiveCubeFace(),nd=this._renderer.getActiveMipmapLevel(),id=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,a,l,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=n_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=e_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(td,ed,nd),this._renderer.xr.enabled=id,t.scissorTest=!1,Nr(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Hs||t.mapping===kr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),td=this._renderer.getRenderTarget(),ed=this._renderer.getActiveCubeFace(),nd=this._renderer.getActiveMipmapLevel(),id=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=i||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,a={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:si,format:Ci,colorSpace:nu,depthBuffer:!1},l=t_(t,i,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=t_(t,i,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=wT(c)),this._blurMaterial=DT(c,t,i),this._ggxMaterial=CT(c,t,i)}return l}_compileMaterial(t){const i=new tn(new xn,t);this._renderer.compile(i,Yo)}_sceneToCubeUV(t,i,a,l,c){const m=new vi(90,1,i,a),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,x=_.toneMapping;_.getClearColor(jv),_.toneMapping=Ji,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new tn(new cl,new $_({name:"PMREM.Background",side:Hn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,M=w.material;let S=!1;const L=t.background;L?L.isColor&&(M.color.copy(L),t.background=null,S=!0):(M.color.copy(jv),S=!0);for(let P=0;P<6;P++){const A=P%3;A===0?(m.up.set(0,p[P],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+g[P],c.y,c.z)):A===1?(m.up.set(0,0,p[P]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+g[P],c.z)):(m.up.set(0,p[P],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+g[P]));const O=this._cubeSize;Nr(l,A*O,P>2?O:0,O,O),_.setRenderTarget(l),S&&_.render(w,m),_.render(t,m)}_.toneMapping=x,_.autoClear=v,t.background=L}_textureToCubeUV(t,i){const a=this._renderer,l=t.mapping===Hs||t.mapping===kr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=n_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=e_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;Nr(i,0,0,3*m,2*m),a.setRenderTarget(i),a.render(f,Yo)}_applyPMREM(t){const i=this._renderer,a=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=a}_applyGGXFilter(t,i,a){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,d=this._lodMeshes[a];d.material=f;const m=f.uniforms,p=a/(this._lodMeshes.length-1),g=i/(this._lodMeshes.length-1),_=Math.sqrt(p*p-g*g),v=p*1.25,x=_*v,{_lodMax:E}=this,w=this._sizeLods[a],M=3*w*(a>E-Ir?a-E+Ir:0),S=4*(this._cubeSize-w);m.envMap.value=t.texture,m.roughness.value=x,m.mipInt.value=E-i,Nr(c,M,S,3*w,2*w),l.setRenderTarget(c),l.render(d,Yo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-a,Nr(t,M,S,3*w,2*w),l.setRenderTarget(t),l.render(d,Yo)}_blur(t,i,a,l){const c=this._pingPongRenderTarget,f=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(t,c,i,a,f),this._blurPass(c,t,a,a,f)}_blurPass(t,i,a,l,c){const f=this._renderer,d=this._blurMaterial,m=this._lodMeshes[l];m.material=d;const p=d.uniforms;p.envMap.value=t.texture,p.sigma.value=c,p.mipInt.value=this._lodMax-a;const g=this._sizeLods[l],_=3*g*(l>this._lodMax-Ir?l-this._lodMax+Ir:0),v=4*(this._cubeSize-g);Nr(i,_,v,3*g,2*g),f.setRenderTarget(i),f.render(m,Yo)}}function wT(r){const t=[],i=[];let a=r;const l=r-Ir+1+bT;for(let c=0;c<l;c++){const f=Math.pow(2,a);t.push(f);const d=1/(f-2),m=-d,p=1+d,g=[m,m,p,m,p,p,m,m,p,p,m,p],_=6,v=6,x=3,E=new Float32Array(x*v*_),w=new Float32Array(x*v*_);for(let S=0;S<_;S++){const L=S%3*2/3-1,P=S>2?0:-1,A=[L,P,0,L+2/3,P,0,L+2/3,P+1,0,L,P,0,L+2/3,P+1,0,L,P+1,0];E.set(A,x*v*S);for(let O=0;O<v;O++){const N=g[O*2]*2-1,D=g[O*2+1]*2-1;S===0?Ps.set(1,D,N):S===1?Ps.set(-N,1,-D):S===2?Ps.set(-N,D,1):S===3?Ps.set(-1,D,-N):S===4?Ps.set(-N,-1,D):Ps.set(N,D,-1),Ps.toArray(w,(S*v+O)*x)}}const M=new xn;M.setAttribute("position",new ii(E,x)),M.setAttribute("outputDirection",new ii(w,x)),i.push(new tn(M,null)),a>Ir&&a--}return{lodMeshes:i,sizeLods:t}}function t_(r,t,i){const a=new Di(r,t,i);return a.texture.mapping=ru,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Nr(r,t,i,a,l){r.viewport.set(t,i,a,l),r.scissor.set(t,i,a,l)}function CT(r,t,i){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:AT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:uu(),fragmentShader:`

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
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function DT(r,t,i){return new _n({name:"SphericalGaussianBlur",defines:{SAMPLES:TT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:uu(),fragmentShader:`

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
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function e_(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uu(),fragmentShader:`

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
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function n_(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function uu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class fx extends Di{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},l=[a,a,a,a,a,a];this.texture=new ex(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new cl(5,5,5),c=new _n({name:"CubemapFromEquirect",uniforms:Xr(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Hn,blending:Ta});c.uniforms.tEquirect.value=i;const f=new tn(l,c),d=i.minFilter;return i.minFilter===Bs&&(i.minFilter=Fn),new N1(1,10,this).update(t,f),i.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(t,i=!0,a=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,a,l);t.setRenderTarget(c)}}function UT(r){let t=new WeakMap,i=new WeakMap,a=null;function l(v,x=!1){return v==null?null:x?f(v):c(v)}function c(v){if(v&&v.isTexture){const x=v.mapping;if(x===Th||x===Ah)if(t.has(v)){const E=t.get(v).texture;return d(E,v.mapping)}else{const E=v.image;if(E&&E.height>0){const w=new fx(E.height);return w.fromEquirectangularTexture(r,v),t.set(v,w),v.addEventListener("dispose",p),d(w.texture,v.mapping)}else return null}}return v}function f(v){if(v&&v.isTexture){const x=v.mapping,E=x===Th||x===Ah,w=x===Hs||x===kr;if(E||w){let M=i.get(v);const S=M!==void 0?M.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==S)return a===null&&(a=new $v(r)),M=E?a.fromEquirectangular(v,M):a.fromCubemap(v,M),M.texture.pmremVersion=v.pmremVersion,i.set(v,M),M.texture;if(M!==void 0)return M.texture;{const L=v.image;return E&&L&&L.height>0||w&&L&&m(L)?(a===null&&(a=new $v(r)),M=E?a.fromEquirectangular(v):a.fromCubemap(v),M.texture.pmremVersion=v.pmremVersion,i.set(v,M),v.addEventListener("dispose",g),M.texture):null}}}return v}function d(v,x){return x===Th?v.mapping=Hs:x===Ah&&(v.mapping=kr),v}function m(v){let x=0;const E=6;for(let w=0;w<E;w++)v[w]!==void 0&&x++;return x===E}function p(v){const x=v.target;x.removeEventListener("dispose",p);const E=t.get(x);E!==void 0&&(t.delete(x),E.dispose())}function g(v){const x=v.target;x.removeEventListener("dispose",g);const E=i.get(x);E!==void 0&&(i.delete(x),E.dispose())}function _(){t=new WeakMap,i=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:l,dispose:_}}function LT(r){const t={};function i(a){if(t[a]!==void 0)return t[a];const l=r.getExtension(a);return t[a]=l,l}return{has:function(a){return i(a)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(a){const l=i(a);return l===null&&Hr("WebGLRenderer: "+a+" extension not supported."),l}}}function NT(r,t,i,a){const l={},c=new WeakMap;function f(_){const v=_.target;v.index!==null&&t.remove(v.index);for(const E in v.attributes)t.remove(v.attributes[E]);v.removeEventListener("dispose",f),delete l[v.id];const x=c.get(v);x&&(t.remove(x),c.delete(v)),a.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,i.memory.geometries--}function d(_,v){return l[v.id]===!0||(v.addEventListener("dispose",f),l[v.id]=!0,i.memory.geometries++),v}function m(_){const v=_.attributes;for(const x in v)t.update(v[x],r.ARRAY_BUFFER)}function p(_){const v=[],x=_.index,E=_.attributes.position;let w=0;if(E===void 0)return;if(x!==null){const L=x.array;w=x.version;for(let P=0,A=L.length;P<A;P+=3){const O=L[P+0],N=L[P+1],D=L[P+2];v.push(O,N,N,D,D,O)}}else{const L=E.array;w=E.version;for(let P=0,A=L.length/3-1;P<A;P+=3){const O=P+0,N=P+1,D=P+2;v.push(O,N,N,D,D,O)}}const M=new(E.count>=65535?j_:J_)(v,1);M.version=w;const S=c.get(_);S&&t.remove(S),c.set(_,M)}function g(_){const v=c.get(_);if(v){const x=_.index;x!==null&&v.version<x.version&&p(_)}else p(_);return c.get(_)}return{get:d,update:m,getWireframeAttribute:g}}function OT(r,t,i){let a;function l(_){a=_}let c,f;function d(_){c=_.type,f=_.bytesPerElement}function m(_,v){r.drawElements(a,v,c,_*f),i.update(v,a,1)}function p(_,v,x){x!==0&&(r.drawElementsInstanced(a,v,c,_*f,x),i.update(v,a,x))}function g(_,v,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,v,0,c,_,0,x);let w=0;for(let M=0;M<x;M++)w+=v[M];i.update(w,a,1)}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g}function PT(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,f,d){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=d*(c/3);break;case r.LINES:i.lines+=d*(c/2);break;case r.LINE_STRIP:i.lines+=d*(c-1);break;case r.LINE_LOOP:i.lines+=d*c;break;case r.POINTS:i.points+=d*c;break;default:Ae("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:a}}function zT(r,t,i){const a=new WeakMap,l=new Ze;function c(f,d,m){const p=f.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let v=a.get(d);if(v===void 0||v.count!==_){let C=function(){D.dispose(),a.delete(d),d.removeEventListener("dispose",C)};v!==void 0&&v.texture.dispose();const x=d.morphAttributes.position!==void 0,E=d.morphAttributes.normal!==void 0,w=d.morphAttributes.color!==void 0,M=d.morphAttributes.position||[],S=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let P=0;x===!0&&(P=1),E===!0&&(P=2),w===!0&&(P=3);let A=d.attributes.position.count*P,O=1;A>t.maxTextureSize&&(O=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const N=new Float32Array(A*O*4*_),D=new K_(N,A,O,_);D.type=Ki,D.needsUpdate=!0;const b=P*4;for(let F=0;F<_;F++){const k=M[F],G=S[F],J=L[F],X=A*O*4*F;for(let $=0;$<k.count;$++){const B=$*b;x===!0&&(l.fromBufferAttribute(k,$),N[X+B+0]=l.x,N[X+B+1]=l.y,N[X+B+2]=l.z,N[X+B+3]=0),E===!0&&(l.fromBufferAttribute(G,$),N[X+B+4]=l.x,N[X+B+5]=l.y,N[X+B+6]=l.z,N[X+B+7]=0),w===!0&&(l.fromBufferAttribute(J,$),N[X+B+8]=l.x,N[X+B+9]=l.y,N[X+B+10]=l.z,N[X+B+11]=J.itemSize===4?l.w:1)}}v={count:_,texture:D,size:new Qt(A,O)},a.set(d,v),d.addEventListener("dispose",C)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let x=0;for(let w=0;w<p.length;w++)x+=p[w];const E=d.morphTargetsRelative?1:1-x;m.getUniforms().setValue(r,"morphTargetBaseInfluence",E),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",v.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:c}}function BT(r,t,i,a,l){let c=new WeakMap;function f(p){const g=l.render.frame,_=p.geometry,v=t.get(p,_);if(c.get(v)!==g&&(t.update(v),c.set(v,g)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==g&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,g))),p.isSkinnedMesh){const x=p.skeleton;c.get(x)!==g&&(x.update(),c.set(x,g))}return v}function d(){c=new WeakMap}function m(p){const g=p.target;g.removeEventListener("dispose",m),a.releaseStatesOfObject(g),i.remove(g.instanceMatrix),g.instanceColor!==null&&i.remove(g.instanceColor)}return{update:f,dispose:d}}const IT={[O_]:"LINEAR_TONE_MAPPING",[P_]:"REINHARD_TONE_MAPPING",[z_]:"CINEON_TONE_MAPPING",[jd]:"ACES_FILMIC_TONE_MAPPING",[I_]:"AGX_TONE_MAPPING",[F_]:"NEUTRAL_TONE_MAPPING",[B_]:"CUSTOM_TONE_MAPPING"};function FT(r,t,i,a,l,c){const f=new Di(t,i,{type:r,depthBuffer:l,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let d=null,m=null;const p=new xn;p.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new Re([0,2,0,0,2,0],2));const g=new A1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new tn(p,g),v=new xp(-1,1,1,-1,0,1);let x=null,E=null,w=!1,M,S=null,L=[],P=!1;this.setSize=function(A,O){f.setSize(A,O),d!==null&&d.setSize(A,O),m!==null&&m.setSize(A,O);for(let N=0;N<L.length;N++){const D=L[N];D.setSize&&D.setSize(A,O)}},this.setEffects=function(A){L=A,P=L.length>0&&L[0].isRenderPass===!0;const O=f.width,N=f.height;L.length>0&&d===null&&(d=new Di(O,N,{type:si,depthBuffer:!1,stencilBuffer:!1}),m=new Di(O,N,{type:si,depthBuffer:!1,stencilBuffer:!1}));for(let D=0;D<L.length;D++){const b=L[D];b.setSize&&b.setSize(O,N)}},this.begin=function(A,O){if(w||A.toneMapping===Ji&&L.length===0)return!1;if(S=O,O!==null){const N=O.width,D=O.height;(f.width!==N||f.height!==D)&&this.setSize(N,D)}return P===!1&&A.setRenderTarget(f),M=A.toneMapping,A.toneMapping=Ji,!0},this.hasRenderPass=function(){return P},this.end=function(A,O){A.toneMapping=M,w=!0;let N=f,D=d;for(let b=0;b<L.length;b++){const C=L[b];C.enabled!==!1&&(C.render(A,D,N,O),C.needsSwap!==!1&&(N=D,D=D===d?m:d))}if(x!==A.outputColorSpace||E!==A.toneMapping){x=A.outputColorSpace,E=A.toneMapping,g.defines={},Ee.getTransfer(x)===Be&&(g.defines.SRGB_TRANSFER="");const b=IT[E];b&&(g.defines[b]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=N.texture,A.setRenderTarget(S),A.render(_,v),S=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){f.dispose(),d!==null&&d.dispose(),m!==null&&m.dispose(),p.dispose(),g.dispose()}}const hx=new Gn,Zd=new ol(1,1),dx=new K_,px=new GM,mx=new ex,i_=[],a_=[],s_=new Float32Array(16),r_=new Float32Array(9),o_=new Float32Array(4);function Zr(r,t,i){const a=r[0];if(a<=0||a>0)return r;const l=t*i;let c=i_[l];if(c===void 0&&(c=new Float32Array(l),i_[l]=c),t!==0){a.toArray(c,0);for(let f=1,d=0;f!==t;++f)d+=i,r[f].toArray(c,d)}return c}function bn(r,t){if(r.length!==t.length)return!1;for(let i=0,a=r.length;i<a;i++)if(r[i]!==t[i])return!1;return!0}function Tn(r,t){for(let i=0,a=t.length;i<a;i++)r[i]=t[i]}function fu(r,t){let i=a_[t];i===void 0&&(i=new Int32Array(t),a_[t]=i);for(let a=0;a!==t;++a)i[a]=r.allocateTextureUnit();return i}function HT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function GT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bn(i,t))return;r.uniform2fv(this.addr,t),Tn(i,t)}}function VT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(bn(i,t))return;r.uniform3fv(this.addr,t),Tn(i,t)}}function kT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bn(i,t))return;r.uniform4fv(this.addr,t),Tn(i,t)}}function XT(r,t){const i=this.cache,a=t.elements;if(a===void 0){if(bn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),Tn(i,t)}else{if(bn(i,a))return;o_.set(a),r.uniformMatrix2fv(this.addr,!1,o_),Tn(i,a)}}function WT(r,t){const i=this.cache,a=t.elements;if(a===void 0){if(bn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),Tn(i,t)}else{if(bn(i,a))return;r_.set(a),r.uniformMatrix3fv(this.addr,!1,r_),Tn(i,a)}}function qT(r,t){const i=this.cache,a=t.elements;if(a===void 0){if(bn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),Tn(i,t)}else{if(bn(i,a))return;s_.set(a),r.uniformMatrix4fv(this.addr,!1,s_),Tn(i,a)}}function YT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function ZT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bn(i,t))return;r.uniform2iv(this.addr,t),Tn(i,t)}}function KT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(bn(i,t))return;r.uniform3iv(this.addr,t),Tn(i,t)}}function QT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bn(i,t))return;r.uniform4iv(this.addr,t),Tn(i,t)}}function JT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function jT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bn(i,t))return;r.uniform2uiv(this.addr,t),Tn(i,t)}}function $T(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(bn(i,t))return;r.uniform3uiv(this.addr,t),Tn(i,t)}}function tA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bn(i,t))return;r.uniform4uiv(this.addr,t),Tn(i,t)}}function eA(r,t,i){const a=this.cache,l=i.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Zd.compareFunction=i.isReversedDepthBuffer()?rp:sp,c=Zd):c=hx,i.setTexture2D(t||c,l)}function nA(r,t,i){const a=this.cache,l=i.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),i.setTexture3D(t||px,l)}function iA(r,t,i){const a=this.cache,l=i.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),i.setTextureCube(t||mx,l)}function aA(r,t,i){const a=this.cache,l=i.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),i.setTexture2DArray(t||dx,l)}function sA(r){switch(r){case 5126:return HT;case 35664:return GT;case 35665:return VT;case 35666:return kT;case 35674:return XT;case 35675:return WT;case 35676:return qT;case 5124:case 35670:return YT;case 35667:case 35671:return ZT;case 35668:case 35672:return KT;case 35669:case 35673:return QT;case 5125:return JT;case 36294:return jT;case 36295:return $T;case 36296:return tA;case 35678:case 36198:case 36298:case 36306:case 35682:return eA;case 35679:case 36299:case 36307:return nA;case 35680:case 36300:case 36308:case 36293:return iA;case 36289:case 36303:case 36311:case 36292:return aA}}function rA(r,t){r.uniform1fv(this.addr,t)}function oA(r,t){const i=Zr(t,this.size,2);r.uniform2fv(this.addr,i)}function lA(r,t){const i=Zr(t,this.size,3);r.uniform3fv(this.addr,i)}function cA(r,t){const i=Zr(t,this.size,4);r.uniform4fv(this.addr,i)}function uA(r,t){const i=Zr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function fA(r,t){const i=Zr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function hA(r,t){const i=Zr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function dA(r,t){r.uniform1iv(this.addr,t)}function pA(r,t){r.uniform2iv(this.addr,t)}function mA(r,t){r.uniform3iv(this.addr,t)}function gA(r,t){r.uniform4iv(this.addr,t)}function vA(r,t){r.uniform1uiv(this.addr,t)}function _A(r,t){r.uniform2uiv(this.addr,t)}function xA(r,t){r.uniform3uiv(this.addr,t)}function SA(r,t){r.uniform4uiv(this.addr,t)}function yA(r,t,i){const a=this.cache,l=t.length,c=fu(i,l);bn(a,c)||(r.uniform1iv(this.addr,c),Tn(a,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=Zd:f=hx;for(let d=0;d!==l;++d)i.setTexture2D(t[d]||f,c[d])}function MA(r,t,i){const a=this.cache,l=t.length,c=fu(i,l);bn(a,c)||(r.uniform1iv(this.addr,c),Tn(a,c));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||px,c[f])}function EA(r,t,i){const a=this.cache,l=t.length,c=fu(i,l);bn(a,c)||(r.uniform1iv(this.addr,c),Tn(a,c));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||mx,c[f])}function bA(r,t,i){const a=this.cache,l=t.length,c=fu(i,l);bn(a,c)||(r.uniform1iv(this.addr,c),Tn(a,c));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||dx,c[f])}function TA(r){switch(r){case 5126:return rA;case 35664:return oA;case 35665:return lA;case 35666:return cA;case 35674:return uA;case 35675:return fA;case 35676:return hA;case 5124:case 35670:return dA;case 35667:case 35671:return pA;case 35668:case 35672:return mA;case 35669:case 35673:return gA;case 5125:return vA;case 36294:return _A;case 36295:return xA;case 36296:return SA;case 35678:case 36198:case 36298:case 36306:case 35682:return yA;case 35679:case 36299:case 36307:return MA;case 35680:case 36300:case 36308:case 36293:return EA;case 36289:case 36303:case 36311:case 36292:return bA}}class AA{constructor(t,i,a){this.id=t,this.addr=a,this.cache=[],this.type=i.type,this.setValue=sA(i.type)}}class RA{constructor(t,i,a){this.id=t,this.addr=a,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=TA(i.type)}}class wA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,a){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const d=l[c];d.setValue(t,i[d.id],a)}}}const ad=/(\w+)(\])?(\[|\.)?/g;function l_(r,t){r.seq.push(t),r.map[t.id]=t}function CA(r,t,i){const a=r.name,l=a.length;for(ad.lastIndex=0;;){const c=ad.exec(a),f=ad.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&f+2===l){l_(i,p===void 0?new AA(d,r,t):new RA(d,r,t));break}else{let _=i.map[d];_===void 0&&(_=new wA(d),l_(i,_)),i=_}}}class jc{constructor(t,i){this.seq=[],this.map={};const a=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let f=0;f<a;++f){const d=t.getActiveUniform(i,f),m=t.getUniformLocation(i,d.name);CA(d,m,this)}const l=[],c=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,a,l){const c=this.map[i];c!==void 0&&c.setValue(t,a,l)}setOptional(t,i,a){const l=i[a];l!==void 0&&this.setValue(t,a,l)}static upload(t,i,a,l){for(let c=0,f=i.length;c!==f;++c){const d=i[c],m=a[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const a=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in i&&a.push(f)}return a}}function c_(r,t,i){const a=r.createShader(t);return r.shaderSource(a,i),r.compileShader(a),a}const DA=37297;let UA=0;function LA(r,t){const i=r.split(`
`),a=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let f=l;f<c;f++){const d=f+1;a.push(`${d===t?">":" "} ${d}: ${i[f]}`)}return a.join(`
`)}const u_=new re;function NA(r){Ee._getMatrix(u_,Ee.workingColorSpace,r);const t=`mat3( ${u_.elements.map(i=>i.toFixed(4))} )`;switch(Ee.getTransfer(r)){case iu:return[t,"LinearTransferOETF"];case Be:return[t,"sRGBTransferOETF"];default:return ne("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function f_(r,t,i){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const d=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+LA(r.getShaderSource(t),d)}else return c}function OA(r,t){const i=NA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const PA={[O_]:"Linear",[P_]:"Reinhard",[z_]:"Cineon",[jd]:"ACESFilmic",[I_]:"AgX",[F_]:"Neutral",[B_]:"Custom"};function zA(r,t){const i=PA[t];return i===void 0?(ne("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Wc=new H;function BA(){Ee.getLuminanceCoefficients(Wc);const r=Wc.x.toFixed(4),t=Wc.y.toFixed(4),i=Wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function IA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qo).join(`
`)}function FA(r){const t=[];for(const i in r){const a=r[i];a!==!1&&t.push("#define "+i+" "+a)}return t.join(`
`)}function HA(r,t){const i={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<a;l++){const c=r.getActiveAttrib(t,l),f=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),i[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:d}}return i}function Qo(r){return r!==""}function h_(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function d_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const GA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kd(r){return r.replace(GA,kA)}const VA=new Map;function kA(r,t){let i=de[t];if(i===void 0){const a=VA.get(t);if(a!==void 0)i=de[a],ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Kd(i)}const XA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function p_(r){return r.replace(XA,WA)}function WA(r,t,i,a){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function m_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const qA={[Yc]:"SHADOWMAP_TYPE_PCF",[Ko]:"SHADOWMAP_TYPE_VSM"};function YA(r){return qA[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const ZA={[Hs]:"ENVMAP_TYPE_CUBE",[kr]:"ENVMAP_TYPE_CUBE",[ru]:"ENVMAP_TYPE_CUBE_UV"};function KA(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":ZA[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const QA={[kr]:"ENVMAP_MODE_REFRACTION"};function JA(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":QA[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const jA={[N_]:"ENVMAP_BLENDING_MULTIPLY",[iM]:"ENVMAP_BLENDING_MIX",[aM]:"ENVMAP_BLENDING_ADD"};function $A(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":jA[r.combine]||"ENVMAP_BLENDING_NONE"}function t3(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:a,maxMip:i}}function e3(r,t,i,a){const l=r.getContext(),c=i.defines;let f=i.vertexShader,d=i.fragmentShader;const m=YA(i),p=KA(i),g=JA(i),_=$A(i),v=t3(i),x=IA(i),E=FA(c),w=l.createProgram();let M,S,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Qo).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Qo).join(`
`),S.length>0&&(S+=`
`)):(M=[m_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qo).join(`
`),S=[m_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ji?"#define TONE_MAPPING":"",i.toneMapping!==Ji?de.tonemapping_pars_fragment:"",i.toneMapping!==Ji?zA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,OA("linearToOutputTexel",i.outputColorSpace),BA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Qo).join(`
`)),f=Kd(f),f=h_(f,i),f=d_(f,i),d=Kd(d),d=h_(d,i),d=d_(d,i),f=p_(f),d=p_(d),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",i.glslVersion===_v?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===_v?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const P=L+M+f,A=L+S+d,O=c_(l,l.VERTEX_SHADER,P),N=c_(l,l.FRAGMENT_SHADER,A);l.attachShader(w,O),l.attachShader(w,N),i.index0AttributeName!==void 0?l.bindAttribLocation(w,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(w,0,"position"),l.linkProgram(w);function D(k){if(r.debug.checkShaderErrors){const G=l.getProgramInfoLog(w)||"",J=l.getShaderInfoLog(O)||"",X=l.getShaderInfoLog(N)||"",$=G.trim(),B=J.trim(),W=X.trim();let ot=!0,et=!0;if(l.getProgramParameter(w,l.LINK_STATUS)===!1)if(ot=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,w,O,N);else{const ft=f_(l,O,"vertex"),z=f_(l,N,"fragment");Ae("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(w,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+$+`
`+ft+`
`+z)}else $!==""?ne("WebGLProgram: Program Info Log:",$):(B===""||W==="")&&(et=!1);et&&(k.diagnostics={runnable:ot,programLog:$,vertexShader:{log:B,prefix:M},fragmentShader:{log:W,prefix:S}})}l.deleteShader(O),l.deleteShader(N),b=new jc(l,w),C=HA(l,w)}let b;this.getUniforms=function(){return b===void 0&&D(this),b};let C;this.getAttributes=function(){return C===void 0&&D(this),C};let F=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=l.getProgramParameter(w,DA)),F},this.destroy=function(){a.releaseStatesOfProgram(this),l.deleteProgram(w),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=UA++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=O,this.fragmentShader=N,this}let n3=0;class i3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,a){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const a of i)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let a=i.get(t);return a===void 0&&(a=new Set,i.set(t,a)),a}_getShaderStage(t){const i=this.shaderCache;let a=i.get(t);return a===void 0&&(a=new a3(t),i.set(t,a)),a}}class a3{constructor(t){this.id=n3++,this.code=t,this.usedTimes=0}}function s3(r){return r===Gs||r===tu||r===eu}function r3(r,t,i,a,l,c){const f=new cp,d=new i3,m=new Set,p=[],g=new Map,_=a.logarithmicDepthBuffer;let v=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(b){return m.add(b),b===0?"uv":`uv${b}`}function w(b,C,F,k,G,J){const X=k.fog,$=G.geometry,B=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?k.environment:null,W=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ot=t.get(b.envMap||B,W),et=ot&&ot.mapping===ru?ot.image.height:null,ft=x[b.type];b.precision!==null&&(v=a.getMaxPrecision(b.precision),v!==b.precision&&ne("WebGLProgram.getParameters:",b.precision,"not supported, using",v,"instead."));const z=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,tt=z!==void 0?z.length:0;let gt=0;$.morphAttributes.position!==void 0&&(gt=1),$.morphAttributes.normal!==void 0&&(gt=2),$.morphAttributes.color!==void 0&&(gt=3);let Et,Lt,kt,st;if(ft){const Fe=Zi[ft];Et=Fe.vertexShader,Lt=Fe.fragmentShader}else{Et=b.vertexShader,Lt=b.fragmentShader;const Fe=d.getVertexShaderStage(b),be=d.getFragmentShaderStage(b);d.update(b,Fe,be),kt=Fe.id,st=be.id}const vt=r.getRenderTarget(),Tt=r.state.buffers.depth.getReversed(),te=G.isInstancedMesh===!0,Ft=G.isBatchedMesh===!0,le=!!b.map,en=!!b.matcap,ae=!!ot,xe=!!b.aoMap,Ne=!!b.lightMap,ge=!!b.bumpMap&&b.wireframe===!1,Xe=!!b.normalMap,nn=!!b.displacementMap,An=!!b.emissiveMap,We=!!b.metalnessMap,an=!!b.roughnessMap,K=b.anisotropy>0,Oe=b.clearcoat>0,De=b.dispersion>0,I=b.retroreflectivity>0,T=b.iridescence>0,j=b.sheen>0,lt=b.transmission>0,dt=K&&!!b.anisotropyMap,bt=Oe&&!!b.clearcoatMap,Ct=Oe&&!!b.clearcoatNormalMap,pt=Oe&&!!b.clearcoatRoughnessMap,mt=T&&!!b.iridescenceMap,At=T&&!!b.iridescenceThicknessMap,Ht=j&&!!b.sheenColorMap,Nt=j&&!!b.sheenRoughnessMap,Dt=!!b.specularMap,Kt=!!b.specularColorMap,Jt=!!b.specularIntensityMap,ie=lt&&!!b.transmissionMap,Z=lt&&!!b.thicknessMap,Rt=!!b.gradientMap,xt=!!b.alphaMap,wt=b.alphaTest>0,zt=!!b.alphaHash,Mt=!!b.extensions;let Zt=Ji;b.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(Zt=r.toneMapping);const Xt={shaderID:ft,shaderType:b.type,shaderName:b.name,vertexShader:Et,fragmentShader:Lt,defines:b.defines,customVertexShaderID:kt,customFragmentShaderID:st,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:v,batching:Ft,batchingColor:Ft&&G._colorsTexture!==null,instancing:te,instancingColor:te&&G.instanceColor!==null,instancingMorph:te&&G.morphTexture!==null,outputColorSpace:vt===null?r.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Ee.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:le,matcap:en,envMap:ae,envMapMode:ae&&ot.mapping,envMapCubeUVHeight:et,aoMap:xe,lightMap:Ne,bumpMap:ge,normalMap:Xe,displacementMap:nn,emissiveMap:An,normalMapObjectSpace:Xe&&b.normalMapType===oM,normalMapTangentSpace:Xe&&b.normalMapType===Wd,packedNormalMap:Xe&&b.normalMapType===Wd&&s3(b.normalMap.format),metalnessMap:We,roughnessMap:an,anisotropy:K,anisotropyMap:dt,clearcoat:Oe,clearcoatMap:bt,clearcoatNormalMap:Ct,clearcoatRoughnessMap:pt,dispersion:De,retroreflection:I,iridescence:T,iridescenceMap:mt,iridescenceThicknessMap:At,sheen:j,sheenColorMap:Ht,sheenRoughnessMap:Nt,specularMap:Dt,specularColorMap:Kt,specularIntensityMap:Jt,transmission:lt,transmissionMap:ie,thicknessMap:Z,gradientMap:Rt,opaque:b.transparent===!1&&b.blending===Jo&&b.alphaToCoverage===!1,alphaMap:xt,alphaTest:wt,alphaHash:zt,combine:b.combine,mapUv:le&&E(b.map.channel),aoMapUv:xe&&E(b.aoMap.channel),lightMapUv:Ne&&E(b.lightMap.channel),bumpMapUv:ge&&E(b.bumpMap.channel),normalMapUv:Xe&&E(b.normalMap.channel),displacementMapUv:nn&&E(b.displacementMap.channel),emissiveMapUv:An&&E(b.emissiveMap.channel),metalnessMapUv:We&&E(b.metalnessMap.channel),roughnessMapUv:an&&E(b.roughnessMap.channel),anisotropyMapUv:dt&&E(b.anisotropyMap.channel),clearcoatMapUv:bt&&E(b.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&E(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&E(b.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&E(b.iridescenceMap.channel),iridescenceThicknessMapUv:At&&E(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&E(b.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&E(b.sheenRoughnessMap.channel),specularMapUv:Dt&&E(b.specularMap.channel),specularColorMapUv:Kt&&E(b.specularColorMap.channel),specularIntensityMapUv:Jt&&E(b.specularIntensityMap.channel),transmissionMapUv:ie&&E(b.transmissionMap.channel),thicknessMapUv:Z&&E(b.thicknessMap.channel),alphaMapUv:xt&&E(b.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Xe||K),vertexNormals:!!$.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!$.attributes.uv&&(le||xt),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||$.attributes.normal===void 0&&Xe===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Tt,skinning:G.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:gt,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Zt,decodeVideoTexture:le&&b.map.isVideoTexture===!0&&Ee.getTransfer(b.map.colorSpace)===Be,decodeVideoTextureEmissive:An&&b.emissiveMap.isVideoTexture===!0&&Ee.getTransfer(b.emissiveMap.colorSpace)===Be,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ii,flipSided:b.side===Hn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Mt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&b.extensions.multiDraw===!0||Ft)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Xt.vertexUv1s=m.has(1),Xt.vertexUv2s=m.has(2),Xt.vertexUv3s=m.has(3),m.clear(),Xt}function M(b){const C=[];if(b.shaderID?C.push(b.shaderID):(C.push(b.customVertexShaderID),C.push(b.customFragmentShaderID)),b.defines!==void 0)for(const F in b.defines)C.push(F),C.push(b.defines[F]);return b.isRawShaderMaterial===!1&&(S(C,b),L(C,b),C.push(r.outputColorSpace)),C.push(b.customProgramCacheKey),C.join()}function S(b,C){b.push(C.precision),b.push(C.outputColorSpace),b.push(C.envMapMode),b.push(C.envMapCubeUVHeight),b.push(C.mapUv),b.push(C.alphaMapUv),b.push(C.lightMapUv),b.push(C.aoMapUv),b.push(C.bumpMapUv),b.push(C.normalMapUv),b.push(C.displacementMapUv),b.push(C.emissiveMapUv),b.push(C.metalnessMapUv),b.push(C.roughnessMapUv),b.push(C.anisotropyMapUv),b.push(C.clearcoatMapUv),b.push(C.clearcoatNormalMapUv),b.push(C.clearcoatRoughnessMapUv),b.push(C.iridescenceMapUv),b.push(C.iridescenceThicknessMapUv),b.push(C.sheenColorMapUv),b.push(C.sheenRoughnessMapUv),b.push(C.specularMapUv),b.push(C.specularColorMapUv),b.push(C.specularIntensityMapUv),b.push(C.transmissionMapUv),b.push(C.thicknessMapUv),b.push(C.combine),b.push(C.fogExp2),b.push(C.sizeAttenuation),b.push(C.morphTargetsCount),b.push(C.morphAttributeCount),b.push(C.numSunLights),b.push(C.numDirLights),b.push(C.numPointLights),b.push(C.numSpotLights),b.push(C.numSpotLightMaps),b.push(C.numHemiLights),b.push(C.numRectAreaLights),b.push(C.numSunLightShadows),b.push(C.numDirLightShadows),b.push(C.numPointLightShadows),b.push(C.numSpotLightShadows),b.push(C.numSpotLightShadowsWithMaps),b.push(C.numLightProbes),b.push(C.shadowMapType),b.push(C.toneMapping),b.push(C.numClippingPlanes),b.push(C.numClipIntersection),b.push(C.depthPacking)}function L(b,C){f.disableAll(),C.instancing&&f.enable(0),C.instancingColor&&f.enable(1),C.instancingMorph&&f.enable(2),C.matcap&&f.enable(3),C.envMap&&f.enable(4),C.normalMapObjectSpace&&f.enable(5),C.normalMapTangentSpace&&f.enable(6),C.clearcoat&&f.enable(7),C.iridescence&&f.enable(8),C.alphaTest&&f.enable(9),C.vertexColors&&f.enable(10),C.vertexAlphas&&f.enable(11),C.vertexUv1s&&f.enable(12),C.vertexUv2s&&f.enable(13),C.vertexUv3s&&f.enable(14),C.vertexTangents&&f.enable(15),C.anisotropy&&f.enable(16),C.alphaHash&&f.enable(17),C.batching&&f.enable(18),C.dispersion&&f.enable(19),C.retroreflection&&f.enable(24),C.batchingColor&&f.enable(20),C.gradientMap&&f.enable(21),C.packedNormalMap&&f.enable(22),C.vertexNormals&&f.enable(23),b.push(f.mask),f.disableAll(),C.fog&&f.enable(0),C.useFog&&f.enable(1),C.flatShading&&f.enable(2),C.logarithmicDepthBuffer&&f.enable(3),C.reversedDepthBuffer&&f.enable(4),C.skinning&&f.enable(5),C.morphTargets&&f.enable(6),C.morphNormals&&f.enable(7),C.morphColors&&f.enable(8),C.premultipliedAlpha&&f.enable(9),C.shadowMapEnabled&&f.enable(10),C.doubleSided&&f.enable(11),C.flipSided&&f.enable(12),C.useDepthPacking&&f.enable(13),C.dithering&&f.enable(14),C.transmission&&f.enable(15),C.sheen&&f.enable(16),C.opaque&&f.enable(17),C.pointsUvs&&f.enable(18),C.decodeVideoTexture&&f.enable(19),C.decodeVideoTextureEmissive&&f.enable(20),C.alphaToCoverage&&f.enable(21),C.numLightProbeGrids>0&&f.enable(22),C.hasPositionAttribute&&f.enable(23),b.push(f.mask)}function P(b){const C=x[b.type];let F;if(C){const k=Zi[C];F=rx.clone(k.uniforms)}else F=b.uniforms;return F}function A(b,C){let F=g.get(C);return F!==void 0?++F.usedTimes:(F=new e3(r,C,b,l),p.push(F),g.set(C,F)),F}function O(b){if(--b.usedTimes===0){const C=p.indexOf(b);p[C]=p[p.length-1],p.pop(),g.delete(b.cacheKey),b.destroy()}}function N(b){d.remove(b)}function D(){d.dispose()}return{getParameters:w,getProgramCacheKey:M,getUniforms:P,acquireProgram:A,releaseProgram:O,releaseShaderCache:N,programs:p,dispose:D}}function o3(){let r=new WeakMap;function t(f){return r.has(f)}function i(f){let d=r.get(f);return d===void 0&&(d={},r.set(f,d)),d}function a(f){r.delete(f)}function l(f,d,m){r.get(f)[d]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:a,update:l,dispose:c}}function l3(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function g_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function v_(){const r=[];let t=0;const i=[],a=[],l=[];function c(){t=0,i.length=0,a.length=0,l.length=0}function f(v){let x=0;return v.isInstancedMesh&&(x+=2),v.isSkinnedMesh&&(x+=1),x}function d(v,x,E,w,M,S){let L=r[t];return L===void 0?(L={id:v.id,object:v,geometry:x,material:E,materialVariant:f(v),groupOrder:w,renderOrder:v.renderOrder,z:M,group:S},r[t]=L):(L.id=v.id,L.object=v,L.geometry=x,L.material=E,L.materialVariant=f(v),L.groupOrder=w,L.renderOrder=v.renderOrder,L.z=M,L.group=S),t++,L}function m(v,x,E,w,M,S,L){L.reversedDepth===!0&&(M=-M);const P=d(v,x,E,w,M,S);E.transmission>0?a.push(P):E.transparent===!0?l.push(P):i.push(P)}function p(v,x,E,w,M,S){const L=d(v,x,E,w,M,S);E.transmission>0?a.unshift(L):E.transparent===!0?l.unshift(L):i.unshift(L)}function g(v,x){i.length>1&&i.sort(v||l3),a.length>1&&a.sort(x||g_),l.length>1&&l.sort(x||g_)}function _(){for(let v=t,x=r.length;v<x;v++){const E=r[v];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:i,transmissive:a,transparent:l,init:c,push:m,unshift:p,finish:_,sort:g}}function c3(){let r=new WeakMap;function t(a,l){const c=r.get(a);let f;return c===void 0?(f=new v_,r.set(a,[f])):l>=c.length?(f=new v_,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:t,dispose:i}}function u3(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new H,color:new ee};break;case"SpotLight":i={position:new H,direction:new H,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new H,color:new ee,distance:0,decay:0};break;case"HemisphereLight":i={direction:new H,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":i={color:new ee,position:new H,halfWidth:new H,halfHeight:new H};break}return r[t.id]=i,i}}}function f3(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let h3=0;function d3(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function p3(r){const t=new u3,i=f3(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new H);const l=new H,c=new Ie,f=new Ie;function d(p){let g=0,_=0,v=0;for(let G=0;G<9;G++)a.probe[G].set(0,0,0);let x=0,E=0,w=0,M=0,S=0,L=0,P=0,A=0,O=0,N=0,D=0,b=0,C=0,F=0;p.sort(d3);for(let G=0,J=p.length;G<J;G++){const X=p[G],$=X.color,B=X.intensity,W=X.distance;let ot=null;if(X.shadow&&X.shadow.map&&(X.shadow.map.texture.format===Gs?ot=X.shadow.map.texture:ot=X.shadow.map.depthTexture||X.shadow.map.texture),X.isAmbientLight)g+=$.r*B,_+=$.g*B,v+=$.b*B;else if(X.isLightProbe){for(let et=0;et<9;et++)a.probe[et].addScaledVector(X.sh.coefficients[et],B);F++}else if(X.isSunLight){const et=t.get(X);if(et.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){const ft=X.shadow,z=i.get(X);z.shadowIntensity=ft.intensity,z.shadowBias=ft.bias,z.shadowNormalBias=ft.normalBias,z.shadowRadius=ft.radius,z.shadowMapSize.copy(ft.mapSize).multiply(ft.getFrameExtents()),a.sunShadow[E]=z,a.sunShadowMap[E]=ot;const tt=ft.getViewportCount();for(let gt=0;gt<tt;gt++)a.sunShadowMatrix[w+gt]=ft.getMatrix(gt),a.sunShadowCascade[w+gt]=ft._cascadeData[gt];w+=tt,E++}a.sun[x]=et,x++}else if(X.isDirectionalLight){const et=t.get(X);if(et.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){const ft=X.shadow,z=i.get(X);z.shadowIntensity=ft.intensity,z.shadowBias=ft.bias,z.shadowNormalBias=ft.normalBias,z.shadowRadius=ft.radius,z.shadowMapSize=ft.mapSize,a.directionalShadow[M]=z,a.directionalShadowMap[M]=ot,a.directionalShadowMatrix[M]=X.shadow.matrix,O++}a.directional[M]=et,M++}else if(X.isSpotLight){const et=t.get(X);et.position.setFromMatrixPosition(X.matrixWorld),et.color.copy($).multiplyScalar(B),et.distance=W,et.coneCos=Math.cos(X.angle),et.penumbraCos=Math.cos(X.angle*(1-X.penumbra)),et.decay=X.decay,a.spot[L]=et;const ft=X.shadow;if(X.map&&(a.spotLightMap[b]=X.map,b++,ft.updateMatrices(X),X.castShadow&&C++),a.spotLightMatrix[L]=ft.matrix,X.castShadow){const z=i.get(X);z.shadowIntensity=ft.intensity,z.shadowBias=ft.bias,z.shadowNormalBias=ft.normalBias,z.shadowRadius=ft.radius,z.shadowMapSize=ft.mapSize,a.spotShadow[L]=z,a.spotShadowMap[L]=ot,D++}L++}else if(X.isRectAreaLight){const et=t.get(X);et.color.copy($).multiplyScalar(B),et.halfWidth.set(X.width*.5,0,0),et.halfHeight.set(0,X.height*.5,0),a.rectArea[P]=et,P++}else if(X.isPointLight){const et=t.get(X);if(et.color.copy(X.color).multiplyScalar(X.intensity),et.distance=X.distance,et.decay=X.decay,X.castShadow){const ft=X.shadow,z=i.get(X);z.shadowIntensity=ft.intensity,z.shadowBias=ft.bias,z.shadowNormalBias=ft.normalBias,z.shadowRadius=ft.radius,z.shadowMapSize=ft.mapSize,z.shadowCameraNear=ft.camera.near,z.shadowCameraFar=ft.camera.far,a.pointShadow[S]=z,a.pointShadowMap[S]=ot,a.pointShadowMatrix[S]=X.shadow.matrix,N++}a.point[S]=et,S++}else if(X.isHemisphereLight){const et=t.get(X);et.skyColor.copy(X.color).multiplyScalar(B),et.groundColor.copy(X.groundColor).multiplyScalar(B),a.hemi[A]=et,A++}}P>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Pt.LTC_FLOAT_1,a.rectAreaLTC2=Pt.LTC_FLOAT_2):(a.rectAreaLTC1=Pt.LTC_HALF_1,a.rectAreaLTC2=Pt.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=v;const k=a.hash;(k.sunLength!==x||k.directionalLength!==M||k.pointLength!==S||k.spotLength!==L||k.rectAreaLength!==P||k.hemiLength!==A||k.numSunShadows!==E||k.numDirectionalShadows!==O||k.numPointShadows!==N||k.numSpotShadows!==D||k.numSpotMaps!==b||k.numLightProbes!==F)&&(a.sun.length=x,a.directional.length=M,a.spot.length=L,a.rectArea.length=P,a.point.length=S,a.hemi.length=A,a.sunShadow.length=E,a.sunShadowMap.length=E,a.sunShadowMatrix.length=w,a.sunShadowCascade.length=w,a.directionalShadow.length=O,a.directionalShadowMap.length=O,a.directionalShadowMatrix.length=O,a.pointShadow.length=N,a.pointShadowMap.length=N,a.pointShadowMatrix.length=N,a.spotShadow.length=D,a.spotShadowMap.length=D,a.spotLightMatrix.length=D+b-C,a.spotLightMap.length=b,a.numSpotLightShadowsWithMaps=C,a.numLightProbes=F,k.sunLength=x,k.directionalLength=M,k.pointLength=S,k.spotLength=L,k.rectAreaLength=P,k.hemiLength=A,k.numSunShadows=E,k.numDirectionalShadows=O,k.numPointShadows=N,k.numSpotShadows=D,k.numSpotMaps=b,k.numLightProbes=F,a.version=h3++)}function m(p,g){let _=0,v=0,x=0,E=0,w=0,M=0;const S=g.matrixWorldInverse;for(let L=0,P=p.length;L<P;L++){const A=p[L];if(A.isSunLight){const O=a.sun[_];O.direction.setFromMatrixPosition(A.matrixWorld),O.direction.transformDirection(S),_++}else if(A.isDirectionalLight){const O=a.directional[v];O.direction.setFromMatrixPosition(A.matrixWorld),l.setFromMatrixPosition(A.target.matrixWorld),O.direction.sub(l),O.direction.transformDirection(S),v++}else if(A.isSpotLight){const O=a.spot[E];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),O.direction.setFromMatrixPosition(A.matrixWorld),l.setFromMatrixPosition(A.target.matrixWorld),O.direction.sub(l),O.direction.transformDirection(S),E++}else if(A.isRectAreaLight){const O=a.rectArea[w];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),f.identity(),c.copy(A.matrixWorld),c.premultiply(S),f.extractRotation(c),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),O.halfWidth.applyMatrix4(f),O.halfHeight.applyMatrix4(f),w++}else if(A.isPointLight){const O=a.point[x];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const O=a.hemi[M];O.direction.setFromMatrixPosition(A.matrixWorld),O.direction.transformDirection(S),M++}}}return{setup:d,setupView:m,state:a}}function __(r){const t=new p3(r),i=[],a=[],l=[];function c(v){_.camera=v,i.length=0,a.length=0,l.length=0}function f(v){i.push(v)}function d(v){a.push(v)}function m(v){l.push(v)}function p(){t.setup(i)}function g(v){t.setupView(i,v)}const _={lightsArray:i,shadowsArray:a,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:p,setupLightsView:g,pushLight:f,pushShadow:d,pushLightProbeGrid:m}}function m3(r){let t=new WeakMap;function i(l,c=0){const f=t.get(l);let d;return f===void 0?(d=new __(r),t.set(l,[d])):c>=f.length?(d=new __(r),f.push(d)):d=f[c],d}function a(){t=new WeakMap}return{get:i,dispose:a}}const g3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v3=`uniform sampler2D shadow_pass;
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
}`,_3=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],x3=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],x_=new Ie,Zo=new H,sd=new H;function S3(r,t,i){let a=new hp;const l=new Qt,c=new Qt,f=new Ze,d=new w1,m=new C1,p={},g=i.maxTextureSize,_={[ls]:Hn,[Hn]:ls,[Ii]:Ii},v=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qt},radius:{value:4}},vertexShader:g3,fragmentShader:v3}),x=v.clone();x.defines.HORIZONTAL_PASS=1;const E=new xn;E.setAttribute("position",new ii(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new tn(E,v),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yc;let S=this.type;this.render=function(N,D,b){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||N.length===0)return;this.type===D_&&(ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Yc);const C=r.getRenderTarget(),F=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),G=r.state;G.setBlending(Ta),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const J=S!==this.type;J&&D.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach($=>$.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,$=N.length;X<$;X++){const B=N[X],W=B.shadow;if(W===void 0){ne("WebGLShadowMap:",B,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;l.copy(W.mapSize);const ot=W.getFrameExtents();l.multiply(ot),c.copy(W.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/ot.x),l.x=c.x*ot.x,W.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/ot.y),l.y=c.y*ot.y,W.mapSize.y=c.y));const et=r.state.buffers.depth.getReversed();if(W.camera._reversedDepth=et,W.map===null||J===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Ko){if(B.isPointLight){ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Di(l.x,l.y,{format:Gs,type:si,minFilter:Fn,magFilter:Fn,generateMipmaps:!1}),W.map.texture.name=B.name+".shadowMap",W.map.depthTexture=new ol(l.x,l.y,Ki),W.map.depthTexture.name=B.name+".shadowMapDepth",W.map.depthTexture.format=Ra,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Pn,W.map.depthTexture.magFilter=Pn}else B.isPointLight?(W.map=new fx(l.x),W.map.depthTexture=new o1(l.x,ji)):(W.map=new Di(l.x,l.y),W.map.depthTexture=new ol(l.x,l.y,ji)),W.map.depthTexture.name=B.name+".shadowMap",W.map.depthTexture.format=Ra,this.type===Yc?(W.map.depthTexture.compareFunction=et?rp:sp,W.map.depthTexture.minFilter=Fn,W.map.depthTexture.magFilter=Fn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Pn,W.map.depthTexture.magFilter=Pn);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==l.x||W.map.height!==l.y)&&W.map.setSize(l.x,l.y);const ft=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();B.isPointLight!==!0&&W.updateMatrices(B,b);for(let z=0;z<ft;z++){const tt=W.getCamera(z);if(B.isPointLight){const gt=W.camera,Et=W.matrix,Lt=B.distance||gt.far;Lt!==gt.far&&(gt.far=Lt,gt.updateProjectionMatrix()),Zo.setFromMatrixPosition(B.matrixWorld),gt.position.copy(Zo),sd.copy(gt.position),sd.add(_3[z]),gt.up.copy(x3[z]),gt.lookAt(sd),gt.updateMatrixWorld(),Et.makeTranslation(-Zo.x,-Zo.y,-Zo.z),x_.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),W._frustum.setFromProjectionMatrix(x_,gt.coordinateSystem,gt.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)r.setRenderTarget(W.map,z),r.clear();else{z===0&&(r.setRenderTarget(W.map),r.clear());const gt=W.getViewport(z);f.set(c.x*gt.x,c.y*gt.y,c.x*gt.z,c.y*gt.w),G.viewport(f)}a=W.getFrustum(z),A(D,b,tt,B,this.type)}W.isPointLightShadow!==!0&&this.type===Ko&&L(W,b),W.needsUpdate=!1}S=this.type,M.needsUpdate=!1,r.setRenderTarget(C,F,k)};function L(N,D){const b=t.update(w);v.defines.VSM_SAMPLES!==N.blurSamples&&(v.defines.VSM_SAMPLES=N.blurSamples,x.defines.VSM_SAMPLES=N.blurSamples,v.needsUpdate=!0,x.needsUpdate=!0),N.mapPass===null?N.mapPass=new Di(l.x,l.y,{format:Gs,type:si}):(N.mapPass.width!==N.map.width||N.mapPass.height!==N.map.height)&&N.mapPass.setSize(N.map.width,N.map.height),v.uniforms.shadow_pass.value=N.map.depthTexture,v.uniforms.resolution.value.set(N.map.width,N.map.height),v.uniforms.radius.value=N.radius,r.setRenderTarget(N.mapPass),r.clear(),r.renderBufferDirect(D,null,b,v,w,null),x.uniforms.shadow_pass.value=N.mapPass.texture,x.uniforms.resolution.value.set(N.map.width,N.map.height),x.uniforms.radius.value=N.radius,r.setRenderTarget(N.map),r.clear(),r.renderBufferDirect(D,null,b,x,w,null)}function P(N,D,b,C){let F=null;const k=b.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(k!==void 0)F=k;else if(F=b.isPointLight===!0?m:d,r.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const G=F.uuid,J=D.uuid;let X=p[G];X===void 0&&(X={},p[G]=X);let $=X[J];$===void 0&&($=F.clone(),X[J]=$,D.addEventListener("dispose",O)),F=$}if(F.visible=D.visible,F.wireframe=D.wireframe,C===Ko?F.side=D.shadowSide!==null?D.shadowSide:D.side:F.side=D.shadowSide!==null?D.shadowSide:_[D.side],F.alphaMap=D.alphaMap,F.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,F.map=D.map,F.clipShadows=D.clipShadows,F.clippingPlanes=D.clippingPlanes,F.clipIntersection=D.clipIntersection,F.displacementMap=D.displacementMap,F.displacementScale=D.displacementScale,F.displacementBias=D.displacementBias,F.wireframeLinewidth=D.wireframeLinewidth,F.linewidth=D.linewidth,b.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const G=r.properties.get(F);G.light=b}return F}function A(N,D,b,C,F){if(N.visible===!1)return;if(N.layers.test(D.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&F===Ko)&&(!N.frustumCulled||N.intersectsFrustum(a))){N.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,N.matrixWorld);const J=t.update(N),X=N.material;if(Array.isArray(X)){const $=J.groups;for(let B=0,W=$.length;B<W;B++){const ot=$[B],et=X[ot.materialIndex];if(et&&et.visible){const ft=P(N,et,C,F);N.onBeforeShadow(r,N,D,b,J,ft,ot),r.renderBufferDirect(b,null,J,ft,N,ot),N.onAfterShadow(r,N,D,b,J,ft,ot)}}}else if(X.visible){const $=P(N,X,C,F);N.onBeforeShadow(r,N,D,b,J,$,null),r.renderBufferDirect(b,null,J,$,N,null),N.onAfterShadow(r,N,D,b,J,$,null)}}const G=N.children;for(let J=0,X=G.length;J<X;J++)A(G[J],D,b,C,F)}function O(N){N.target.removeEventListener("dispose",O);for(const b in p){const C=p[b],F=N.target.uuid;F in C&&(C[F].dispose(),delete C[F])}}}function y3(r,t){function i(){let Z=!1;const Rt=new Ze;let xt=null;const wt=new Ze(0,0,0,0);return{setMask:function(zt){xt!==zt&&!Z&&(r.colorMask(zt,zt,zt,zt),xt=zt)},setLocked:function(zt){Z=zt},setClear:function(zt,Mt,Zt,Xt,Fe){Fe===!0&&(zt*=Xt,Mt*=Xt,Zt*=Xt),Rt.set(zt,Mt,Zt,Xt),wt.equals(Rt)===!1&&(r.clearColor(zt,Mt,Zt,Xt),wt.copy(Rt))},reset:function(){Z=!1,xt=null,wt.set(-1,0,0,0)}}}function a(){let Z=!1,Rt=!1,xt=null,wt=null,zt=null;return{setReversed:function(Mt){if(Rt!==Mt){const Zt=t.get("EXT_clip_control");Mt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT),Rt=Mt;const Xt=zt;zt=null,this.setClear(Xt)}},getReversed:function(){return Rt},setTest:function(Mt){Mt?vt(r.DEPTH_TEST):Tt(r.DEPTH_TEST)},setMask:function(Mt){xt!==Mt&&!Z&&(r.depthMask(Mt),xt=Mt)},setFunc:function(Mt){if(Rt&&(Mt=xM[Mt]),wt!==Mt){switch(Mt){case od:r.depthFunc(r.NEVER);break;case ld:r.depthFunc(r.ALWAYS);break;case cd:r.depthFunc(r.LESS);break;case nl:r.depthFunc(r.LEQUAL);break;case ud:r.depthFunc(r.EQUAL);break;case fd:r.depthFunc(r.GEQUAL);break;case hd:r.depthFunc(r.GREATER);break;case dd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}wt=Mt}},setLocked:function(Mt){Z=Mt},setClear:function(Mt){zt!==Mt&&(zt=Mt,Rt&&(Mt=1-Mt),r.clearDepth(Mt))},reset:function(){Z=!1,xt=null,wt=null,zt=null,Rt=!1}}}function l(){let Z=!1,Rt=null,xt=null,wt=null,zt=null,Mt=null,Zt=null,Xt=null,Fe=null;return{setTest:function(be){Z||(be?vt(r.STENCIL_TEST):Tt(r.STENCIL_TEST))},setMask:function(be){Rt!==be&&!Z&&(r.stencilMask(be),Rt=be)},setFunc:function(be,Zn,ri){(xt!==be||wt!==Zn||zt!==ri)&&(r.stencilFunc(be,Zn,ri),xt=be,wt=Zn,zt=ri)},setOp:function(be,Zn,ri){(Mt!==be||Zt!==Zn||Xt!==ri)&&(r.stencilOp(be,Zn,ri),Mt=be,Zt=Zn,Xt=ri)},setLocked:function(be){Z=be},setClear:function(be){Fe!==be&&(r.clearStencil(be),Fe=be)},reset:function(){Z=!1,Rt=null,xt=null,wt=null,zt=null,Mt=null,Zt=null,Xt=null,Fe=null}}}const c=new i,f=new a,d=new l,m=new WeakMap,p=new WeakMap;let g={},_={},v={},x=new WeakMap,E=[],w=null,M=!1,S=null,L=null,P=null,A=null,O=null,N=null,D=null,b=new ee(0,0,0),C=0,F=!1,k=null,G=null,J=null,X=null,$=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ot=0;const et=r.getParameter(r.VERSION);et.indexOf("WebGL")!==-1?(ot=parseFloat(/^WebGL (\d)/.exec(et)[1]),W=ot>=1):et.indexOf("OpenGL ES")!==-1&&(ot=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),W=ot>=2);let ft=null,z={};const tt=r.getParameter(r.SCISSOR_BOX),gt=r.getParameter(r.VIEWPORT),Et=new Ze().fromArray(tt),Lt=new Ze().fromArray(gt);function kt(Z,Rt,xt,wt){const zt=new Uint8Array(4),Mt=r.createTexture();r.bindTexture(Z,Mt),r.texParameteri(Z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Zt=0;Zt<xt;Zt++)Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,wt,0,r.RGBA,r.UNSIGNED_BYTE,zt):r.texImage2D(Rt+Zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,zt);return Mt}const st={};st[r.TEXTURE_2D]=kt(r.TEXTURE_2D,r.TEXTURE_2D,1),st[r.TEXTURE_CUBE_MAP]=kt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[r.TEXTURE_2D_ARRAY]=kt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),st[r.TEXTURE_3D]=kt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),vt(r.DEPTH_TEST),f.setFunc(nl),ge(!1),Xe(mv),vt(r.CULL_FACE),xe(Ta);function vt(Z){g[Z]!==!0&&(r.enable(Z),g[Z]=!0)}function Tt(Z){g[Z]!==!1&&(r.disable(Z),g[Z]=!1)}function te(Z,Rt){return v[Z]!==Rt?(r.bindFramebuffer(Z,Rt),v[Z]=Rt,Z===r.DRAW_FRAMEBUFFER&&(v[r.FRAMEBUFFER]=Rt),Z===r.FRAMEBUFFER&&(v[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function Ft(Z,Rt){let xt=E,wt=!1;if(Z){xt=x.get(Rt),xt===void 0&&(xt=[],x.set(Rt,xt));const zt=Z.textures;if(xt.length!==zt.length||xt[0]!==r.COLOR_ATTACHMENT0){for(let Mt=0,Zt=zt.length;Mt<Zt;Mt++)xt[Mt]=r.COLOR_ATTACHMENT0+Mt;xt.length=zt.length,wt=!0}}else xt[0]!==r.BACK&&(xt[0]=r.BACK,wt=!0);wt&&r.drawBuffers(xt)}function le(Z){return w!==Z?(r.useProgram(Z),w=Z,!0):!1}const en={[Pr]:r.FUNC_ADD,[Hy]:r.FUNC_SUBTRACT,[Gy]:r.FUNC_REVERSE_SUBTRACT};en[Vy]=r.MIN,en[ky]=r.MAX;const ae={[Xy]:r.ZERO,[Wy]:r.ONE,[qy]:r.SRC_COLOR,[U_]:r.SRC_ALPHA,[jy]:r.SRC_ALPHA_SATURATE,[Qy]:r.DST_COLOR,[Zy]:r.DST_ALPHA,[Yy]:r.ONE_MINUS_SRC_COLOR,[L_]:r.ONE_MINUS_SRC_ALPHA,[Jy]:r.ONE_MINUS_DST_COLOR,[Ky]:r.ONE_MINUS_DST_ALPHA,[$y]:r.CONSTANT_COLOR,[tM]:r.ONE_MINUS_CONSTANT_COLOR,[eM]:r.CONSTANT_ALPHA,[nM]:r.ONE_MINUS_CONSTANT_ALPHA};function xe(Z,Rt,xt,wt,zt,Mt,Zt,Xt,Fe,be){if(Z===Ta){M===!0&&(Tt(r.BLEND),M=!1);return}if(M===!1&&(vt(r.BLEND),M=!0),Z!==Fy){if(Z!==S||be!==F){if((L!==Pr||O!==Pr)&&(r.blendEquation(r.FUNC_ADD),L=Pr,O=Pr),be)switch(Z){case Jo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fr:r.blendFunc(r.ONE,r.ONE);break;case gv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case vv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ae("WebGLState: Invalid blending: ",Z);break}else switch(Z){case Jo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case gv:Ae("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vv:Ae("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ae("WebGLState: Invalid blending: ",Z);break}P=null,A=null,N=null,D=null,b.set(0,0,0),C=0,S=Z,F=be}return}zt=zt||Rt,Mt=Mt||xt,Zt=Zt||wt,(Rt!==L||zt!==O)&&(r.blendEquationSeparate(en[Rt],en[zt]),L=Rt,O=zt),(xt!==P||wt!==A||Mt!==N||Zt!==D)&&(r.blendFuncSeparate(ae[xt],ae[wt],ae[Mt],ae[Zt]),P=xt,A=wt,N=Mt,D=Zt),(Xt.equals(b)===!1||Fe!==C)&&(r.blendColor(Xt.r,Xt.g,Xt.b,Fe),b.copy(Xt),C=Fe),S=Z,F=!1}function Ne(Z,Rt){Z.side===Ii?Tt(r.CULL_FACE):vt(r.CULL_FACE);let xt=Z.side===Hn;Rt&&(xt=!xt),ge(xt),Z.blending===Jo&&Z.transparent===!1?xe(Ta):xe(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),f.setFunc(Z.depthFunc),f.setTest(Z.depthTest),f.setMask(Z.depthWrite),c.setMask(Z.colorWrite);const wt=Z.stencilWrite;d.setTest(wt),wt&&(d.setMask(Z.stencilWriteMask),d.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),d.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),An(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?vt(r.SAMPLE_ALPHA_TO_COVERAGE):Tt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ge(Z){k!==Z&&(Z?r.frontFace(r.CW):r.frontFace(r.CCW),k=Z)}function Xe(Z){Z!==By?(vt(r.CULL_FACE),Z!==G&&(Z===mv?r.cullFace(r.BACK):Z===Iy?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Tt(r.CULL_FACE),G=Z}function nn(Z){Z!==J&&(W&&r.lineWidth(Z),J=Z)}function An(Z,Rt,xt){Z?(vt(r.POLYGON_OFFSET_FILL),(X!==Rt||$!==xt)&&(X=Rt,$=xt,f.getReversed()&&(Rt=-Rt),r.polygonOffset(Rt,xt))):Tt(r.POLYGON_OFFSET_FILL)}function We(Z){Z?vt(r.SCISSOR_TEST):Tt(r.SCISSOR_TEST)}function an(Z){Z===void 0&&(Z=r.TEXTURE0+B-1),ft!==Z&&(r.activeTexture(Z),ft=Z)}function K(Z,Rt,xt){xt===void 0&&(ft===null?xt=r.TEXTURE0+B-1:xt=ft);let wt=z[xt];wt===void 0&&(wt={type:void 0,texture:void 0},z[xt]=wt),(wt.type!==Z||wt.texture!==Rt)&&(ft!==xt&&(r.activeTexture(xt),ft=xt),r.bindTexture(Z,Rt||st[Z]),wt.type=Z,wt.texture=Rt)}function Oe(){const Z=z[ft];Z!==void 0&&Z.type!==void 0&&(r.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function De(){try{r.compressedTexImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function I(){try{r.compressedTexImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function T(){try{r.texSubImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function j(){try{r.texSubImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function lt(){try{r.compressedTexSubImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function dt(){try{r.compressedTexSubImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function bt(){try{r.texStorage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function Ct(){try{r.texStorage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function pt(){try{r.texImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function mt(){try{r.texImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function At(Z){return _[Z]!==void 0?_[Z]:r.getParameter(Z)}function Ht(Z,Rt){_[Z]!==Rt&&(r.pixelStorei(Z,Rt),_[Z]=Rt)}function Nt(Z){Et.equals(Z)===!1&&(r.scissor(Z.x,Z.y,Z.z,Z.w),Et.copy(Z))}function Dt(Z){Lt.equals(Z)===!1&&(r.viewport(Z.x,Z.y,Z.z,Z.w),Lt.copy(Z))}function Kt(Z,Rt){let xt=p.get(Rt);xt===void 0&&(xt=new WeakMap,p.set(Rt,xt));let wt=xt.get(Z);wt===void 0&&(wt=r.getUniformBlockIndex(Rt,Z.name),xt.set(Z,wt))}function Jt(Z,Rt){const wt=p.get(Rt).get(Z);m.get(Rt)!==wt&&(r.uniformBlockBinding(Rt,wt,Z.__bindingPointIndex),m.set(Rt,wt))}function ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),g={},_={},ft=null,z={},v={},x=new WeakMap,E=[],w=null,M=!1,S=null,L=null,P=null,A=null,O=null,N=null,D=null,b=new ee(0,0,0),C=0,F=!1,k=null,G=null,J=null,X=null,$=null,Et.set(0,0,r.canvas.width,r.canvas.height),Lt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:vt,disable:Tt,bindFramebuffer:te,drawBuffers:Ft,useProgram:le,setBlending:xe,setMaterial:Ne,setFlipSided:ge,setCullFace:Xe,setLineWidth:nn,setPolygonOffset:An,setScissorTest:We,activeTexture:an,bindTexture:K,unbindTexture:Oe,compressedTexImage2D:De,compressedTexImage3D:I,texImage2D:pt,texImage3D:mt,pixelStorei:Ht,getParameter:At,updateUBOMapping:Kt,uniformBlockBinding:Jt,texStorage2D:bt,texStorage3D:Ct,texSubImage2D:T,texSubImage3D:j,compressedTexSubImage2D:lt,compressedTexSubImage3D:dt,scissor:Nt,viewport:Dt,reset:ie}}function M3(r,t,i,a,l,c,f){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Qt,g=new WeakMap,_=new Set;let v;const x=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(I,T){return E?new OffscreenCanvas(I,T):au("canvas")}function M(I,T,j){let lt=1;const dt=De(I);if((dt.width>j||dt.height>j)&&(lt=j/Math.max(dt.width,dt.height)),lt<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const bt=Math.floor(lt*dt.width),Ct=Math.floor(lt*dt.height);v===void 0&&(v=w(bt,Ct));const pt=T?w(bt,Ct):v;return pt.width=bt,pt.height=Ct,pt.getContext("2d").drawImage(I,0,0,bt,Ct),ne("WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+bt+"x"+Ct+")."),pt}else return"data"in I&&ne("WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),I;return I}function S(I){return I.generateMipmaps}function L(I){r.generateMipmap(I)}function P(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(I,T,j,lt,dt,bt=!1){if(I!==null){if(r[I]!==void 0)return r[I];ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Ct;lt&&(Ct=t.get("EXT_texture_norm16"),Ct||ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pt=T;if(T===r.RED&&(j===r.FLOAT&&(pt=r.R32F),j===r.HALF_FLOAT&&(pt=r.R16F),j===r.UNSIGNED_BYTE&&(pt=r.R8),j===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.R16_EXT),j===r.SHORT&&Ct&&(pt=Ct.R16_SNORM_EXT)),T===r.RED_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.R8UI),j===r.UNSIGNED_SHORT&&(pt=r.R16UI),j===r.UNSIGNED_INT&&(pt=r.R32UI),j===r.BYTE&&(pt=r.R8I),j===r.SHORT&&(pt=r.R16I),j===r.INT&&(pt=r.R32I)),T===r.RG&&(j===r.FLOAT&&(pt=r.RG32F),j===r.HALF_FLOAT&&(pt=r.RG16F),j===r.UNSIGNED_BYTE&&(pt=r.RG8),j===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RG16_EXT),j===r.SHORT&&Ct&&(pt=Ct.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RG8UI),j===r.UNSIGNED_SHORT&&(pt=r.RG16UI),j===r.UNSIGNED_INT&&(pt=r.RG32UI),j===r.BYTE&&(pt=r.RG8I),j===r.SHORT&&(pt=r.RG16I),j===r.INT&&(pt=r.RG32I)),T===r.RGB_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RGB8UI),j===r.UNSIGNED_SHORT&&(pt=r.RGB16UI),j===r.UNSIGNED_INT&&(pt=r.RGB32UI),j===r.BYTE&&(pt=r.RGB8I),j===r.SHORT&&(pt=r.RGB16I),j===r.INT&&(pt=r.RGB32I)),T===r.RGBA_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RGBA8UI),j===r.UNSIGNED_SHORT&&(pt=r.RGBA16UI),j===r.UNSIGNED_INT&&(pt=r.RGBA32UI),j===r.BYTE&&(pt=r.RGBA8I),j===r.SHORT&&(pt=r.RGBA16I),j===r.INT&&(pt=r.RGBA32I)),T===r.RGB&&(j===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RGB16_EXT),j===r.SHORT&&Ct&&(pt=Ct.RGB16_SNORM_EXT),j===r.UNSIGNED_INT_5_9_9_9_REV&&(pt=r.RGB9_E5),j===r.UNSIGNED_INT_10F_11F_11F_REV&&(pt=r.R11F_G11F_B10F)),T===r.RGBA){const mt=bt?iu:Ee.getTransfer(dt);j===r.FLOAT&&(pt=r.RGBA32F),j===r.HALF_FLOAT&&(pt=r.RGBA16F),j===r.UNSIGNED_BYTE&&(pt=mt===Be?r.SRGB8_ALPHA8:r.RGBA8),j===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RGBA16_EXT),j===r.SHORT&&Ct&&(pt=Ct.RGBA16_SNORM_EXT),j===r.UNSIGNED_SHORT_4_4_4_4&&(pt=r.RGBA4),j===r.UNSIGNED_SHORT_5_5_5_1&&(pt=r.RGB5_A1)}return(pt===r.R16F||pt===r.R32F||pt===r.RG16F||pt===r.RG32F||pt===r.RGBA16F||pt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),pt}function O(I,T){let j;return I?T===null||T===ji||T===al?j=r.DEPTH24_STENCIL8:T===Ki?j=r.DEPTH32F_STENCIL8:T===il&&(j=r.DEPTH24_STENCIL8,ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ji||T===al?j=r.DEPTH_COMPONENT24:T===Ki?j=r.DEPTH_COMPONENT32F:T===il&&(j=r.DEPTH_COMPONENT16),j}function N(I,T){return S(I)===!0||I.isFramebufferTexture&&I.minFilter!==Pn&&I.minFilter!==Fn?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function D(I){const T=I.target;T.removeEventListener("dispose",D),C(T),T.isVideoTexture&&g.delete(T),T.isHTMLTexture&&_.delete(T)}function b(I){const T=I.target;T.removeEventListener("dispose",b),k(T)}function C(I){const T=a.get(I);if(T.__webglInit===void 0)return;const j=I.source,lt=x.get(j);if(lt){const dt=lt[T.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&F(I),Object.keys(lt).length===0&&x.delete(j)}a.remove(I)}function F(I){const T=a.get(I);r.deleteTexture(T.__webglTexture);const j=I.source,lt=x.get(j);delete lt[T.__cacheKey],f.memory.textures--}function k(I){const T=a.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),a.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(T.__webglFramebuffer[lt]))for(let dt=0;dt<T.__webglFramebuffer[lt].length;dt++)r.deleteFramebuffer(T.__webglFramebuffer[lt][dt]);else r.deleteFramebuffer(T.__webglFramebuffer[lt]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[lt])}else{if(Array.isArray(T.__webglFramebuffer))for(let lt=0;lt<T.__webglFramebuffer.length;lt++)r.deleteFramebuffer(T.__webglFramebuffer[lt]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let lt=0;lt<T.__webglColorRenderbuffer.length;lt++)T.__webglColorRenderbuffer[lt]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[lt]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const j=I.textures;for(let lt=0,dt=j.length;lt<dt;lt++){const bt=a.get(j[lt]);bt.__webglTexture&&(r.deleteTexture(bt.__webglTexture),f.memory.textures--),a.remove(j[lt])}a.remove(I)}let G=0;function J(){G=0}function X(){return G}function $(I){G=I}function B(){const I=G;return I>=l.maxTextures&&ne("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+l.maxTextures),G+=1,I}function W(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function ot(I,T){const j=a.get(I);if(I.isVideoTexture&&K(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&j.__version!==I.version){const lt=I.image;if(lt===null)ne("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(j,I,T);return}}else I.isExternalTexture&&(j.__webglTexture=I.sourceTexture?I.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,j.__webglTexture,r.TEXTURE0+T)}function et(I,T){const j=a.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&j.__version!==I.version){Tt(j,I,T);return}else I.isExternalTexture&&(j.__webglTexture=I.sourceTexture?I.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,j.__webglTexture,r.TEXTURE0+T)}function ft(I,T){const j=a.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&j.__version!==I.version){Tt(j,I,T);return}i.bindTexture(r.TEXTURE_3D,j.__webglTexture,r.TEXTURE0+T)}function z(I,T){const j=a.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&j.__version!==I.version){te(j,I,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture,r.TEXTURE0+T)}const tt={[$c]:r.REPEAT,[ba]:r.CLAMP_TO_EDGE,[pd]:r.MIRRORED_REPEAT},gt={[Pn]:r.NEAREST,[sM]:r.NEAREST_MIPMAP_NEAREST,[Mc]:r.NEAREST_MIPMAP_LINEAR,[Fn]:r.LINEAR,[Rh]:r.LINEAR_MIPMAP_NEAREST,[Bs]:r.LINEAR_MIPMAP_LINEAR},Et={[cM]:r.NEVER,[pM]:r.ALWAYS,[uM]:r.LESS,[sp]:r.LEQUAL,[fM]:r.EQUAL,[rp]:r.GEQUAL,[hM]:r.GREATER,[dM]:r.NOTEQUAL};function Lt(I,T){if(T.type===Ki&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Fn||T.magFilter===Rh||T.magFilter===Mc||T.magFilter===Bs||T.minFilter===Fn||T.minFilter===Rh||T.minFilter===Mc||T.minFilter===Bs)&&ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,tt[T.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,tt[T.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,tt[T.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,gt[T.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,gt[T.minFilter]),T.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,Et[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Pn||T.minFilter!==Mc&&T.minFilter!==Bs||T.type===Ki&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||a.get(T).__currentAnisotropy){const j=t.get("EXT_texture_filter_anisotropic");r.texParameterf(I,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),a.get(T).__currentAnisotropy=T.anisotropy}}}function kt(I,T){let j=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",D));const lt=T.source;let dt=x.get(lt);dt===void 0&&(dt={},x.set(lt,dt));const bt=W(T);if(bt!==I.__cacheKey){dt[bt]===void 0&&(dt[bt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,j=!0),dt[bt].usedTimes++;const Ct=dt[I.__cacheKey];Ct!==void 0&&(dt[I.__cacheKey].usedTimes--,Ct.usedTimes===0&&F(T)),I.__cacheKey=bt,I.__webglTexture=dt[bt].texture}return j}function st(I,T,j){return Math.floor(Math.floor(I/j)/T)}function vt(I,T,j,lt){const bt=I.updateRanges;if(bt.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,j,lt,T.data);else{bt.sort((Ht,Nt)=>Ht.start-Nt.start);let Ct=0;for(let Ht=1;Ht<bt.length;Ht++){const Nt=bt[Ct],Dt=bt[Ht],Kt=Nt.start+Nt.count,Jt=st(Dt.start,T.width,4),ie=st(Nt.start,T.width,4);Dt.start<=Kt+1&&Jt===ie&&st(Dt.start+Dt.count-1,T.width,4)===Jt?Nt.count=Math.max(Nt.count,Dt.start+Dt.count-Nt.start):(++Ct,bt[Ct]=Dt)}bt.length=Ct+1;const pt=i.getParameter(r.UNPACK_ROW_LENGTH),mt=i.getParameter(r.UNPACK_SKIP_PIXELS),At=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let Ht=0,Nt=bt.length;Ht<Nt;Ht++){const Dt=bt[Ht],Kt=Math.floor(Dt.start/4),Jt=Math.ceil(Dt.count/4),ie=Kt%T.width,Z=Math.floor(Kt/T.width),Rt=Jt,xt=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,ie),i.pixelStorei(r.UNPACK_SKIP_ROWS,Z),i.texSubImage2D(r.TEXTURE_2D,0,ie,Z,Rt,xt,j,lt,T.data)}I.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,pt),i.pixelStorei(r.UNPACK_SKIP_PIXELS,mt),i.pixelStorei(r.UNPACK_SKIP_ROWS,At)}}function Tt(I,T,j){let lt=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(lt=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(lt=r.TEXTURE_3D);const dt=kt(I,T),bt=T.source;i.bindTexture(lt,I.__webglTexture,r.TEXTURE0+j);const Ct=a.get(bt);if(bt.version!==Ct.__version||dt===!0){if(i.activeTexture(r.TEXTURE0+j),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const xt=Ee.getPrimaries(Ee.workingColorSpace),wt=T.colorSpace===Ea?null:Ee.getPrimaries(T.colorSpace),zt=T.colorSpace===Ea||xt===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt)}i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let mt=M(T.image,!1,l.maxTextureSize);mt=Oe(T,mt);const At=c.convert(T.format,T.colorSpace),Ht=c.convert(T.type);let Nt=A(T.internalFormat,At,Ht,T.normalized,T.colorSpace,T.isVideoTexture);Lt(lt,T);let Dt;const Kt=T.mipmaps,Jt=T.isVideoTexture!==!0,ie=Ct.__version===void 0||dt===!0,Z=bt.dataReady,Rt=N(T,mt);if(T.isDepthTexture)Nt=O(T.format===Is,T.type),ie&&(Jt?i.texStorage2D(r.TEXTURE_2D,1,Nt,mt.width,mt.height):i.texImage2D(r.TEXTURE_2D,0,Nt,mt.width,mt.height,0,At,Ht,null));else if(T.isDataTexture)if(Kt.length>0){Jt&&ie&&i.texStorage2D(r.TEXTURE_2D,Rt,Nt,Kt[0].width,Kt[0].height);for(let xt=0,wt=Kt.length;xt<wt;xt++)Dt=Kt[xt],Jt?Z&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Ht,Dt.data):i.texImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,At,Ht,Dt.data);T.generateMipmaps=!1}else Jt?(ie&&i.texStorage2D(r.TEXTURE_2D,Rt,Nt,mt.width,mt.height),Z&&vt(T,mt,At,Ht)):i.texImage2D(r.TEXTURE_2D,0,Nt,mt.width,mt.height,0,At,Ht,mt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Jt&&ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Nt,Kt[0].width,Kt[0].height,mt.depth);for(let xt=0,wt=Kt.length;xt<wt;xt++)if(Dt=Kt[xt],T.format!==Ci)if(At!==null)if(Jt){if(Z)if(T.layerUpdates.size>0){const zt=Jv(Dt.width,Dt.height,T.format,T.type);for(const Mt of T.layerUpdates){const Zt=Dt.data.subarray(Mt*zt/Dt.data.BYTES_PER_ELEMENT,(Mt+1)*zt/Dt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,Mt,Dt.width,Dt.height,1,At,Zt)}}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Dt.width,Dt.height,mt.depth,At,Dt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,xt,Nt,Dt.width,Dt.height,mt.depth,0,Dt.data,0,0);else ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?Z&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Dt.width,Dt.height,mt.depth,At,Ht,Dt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,xt,Nt,Dt.width,Dt.height,mt.depth,0,At,Ht,Dt.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{Jt&&ie&&i.texStorage2D(r.TEXTURE_2D,Rt,Nt,Kt[0].width,Kt[0].height);for(let xt=0,wt=Kt.length;xt<wt;xt++)Dt=Kt[xt],T.format!==Ci?At!==null?Jt?Z&&i.compressedTexSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Dt.data):i.compressedTexImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,Dt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?Z&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Ht,Dt.data):i.texImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(T.isDataArrayTexture)if(Jt){if(ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Nt,mt.width,mt.height,mt.depth),Z)if(T.layerUpdates.size>0){const xt=Jv(mt.width,mt.height,T.format,T.type);for(const wt of T.layerUpdates){const zt=mt.data.subarray(wt*xt/mt.data.BYTES_PER_ELEMENT,(wt+1)*xt/mt.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,wt,mt.width,mt.height,1,At,Ht,zt)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,At,Ht,mt.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Nt,mt.width,mt.height,mt.depth,0,At,Ht,mt.data);else if(T.isData3DTexture)Jt?(ie&&i.texStorage3D(r.TEXTURE_3D,Rt,Nt,mt.width,mt.height,mt.depth),Z&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,At,Ht,mt.data)):i.texImage3D(r.TEXTURE_3D,0,Nt,mt.width,mt.height,mt.depth,0,At,Ht,mt.data);else if(T.isFramebufferTexture){if(ie)if(Jt)i.texStorage2D(r.TEXTURE_2D,Rt,Nt,mt.width,mt.height);else{let xt=mt.width,wt=mt.height;for(let zt=0;zt<Rt;zt++)i.texImage2D(r.TEXTURE_2D,zt,Nt,xt,wt,0,At,Ht,null),xt>>=1,wt>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const xt=r.canvas;if(xt.hasAttribute("layoutsubtree")||xt.setAttribute("layoutsubtree","true"),mt.parentNode!==xt){xt.appendChild(mt),_.add(T),xt.onpaint=wt=>{const zt=wt.changedElements;for(const Mt of _)zt.includes(Mt.image)&&(Mt.needsUpdate=!0)},xt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,mt);else{const zt=r.RGBA,Mt=r.RGBA,Zt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,zt,Mt,Zt,mt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Kt.length>0){if(Jt&&ie){const xt=De(Kt[0]);i.texStorage2D(r.TEXTURE_2D,Rt,Nt,xt.width,xt.height)}for(let xt=0,wt=Kt.length;xt<wt;xt++)Dt=Kt[xt],Jt?Z&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,At,Ht,Dt):i.texImage2D(r.TEXTURE_2D,xt,Nt,At,Ht,Dt);T.generateMipmaps=!1}else if(Jt){if(ie){const xt=De(mt);i.texStorage2D(r.TEXTURE_2D,Rt,Nt,xt.width,xt.height)}Z&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Ht,mt)}else i.texImage2D(r.TEXTURE_2D,0,Nt,At,Ht,mt);S(T)&&L(lt),Ct.__version=bt.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function te(I,T,j){if(T.image.length!==6)return;const lt=kt(I,T),dt=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+j);const bt=a.get(dt);if(dt.version!==bt.__version||lt===!0){i.activeTexture(r.TEXTURE0+j);const Ct=Ee.getPrimaries(Ee.workingColorSpace),pt=T.colorSpace===Ea?null:Ee.getPrimaries(T.colorSpace),mt=T.colorSpace===Ea||Ct===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const At=T.isCompressedTexture||T.image[0].isCompressedTexture,Ht=T.image[0]&&T.image[0].isDataTexture,Nt=[];for(let Mt=0;Mt<6;Mt++)!At&&!Ht?Nt[Mt]=M(T.image[Mt],!0,l.maxCubemapSize):Nt[Mt]=Ht?T.image[Mt].image:T.image[Mt],Nt[Mt]=Oe(T,Nt[Mt]);const Dt=Nt[0],Kt=c.convert(T.format,T.colorSpace),Jt=c.convert(T.type),ie=A(T.internalFormat,Kt,Jt,T.normalized,T.colorSpace),Z=T.isVideoTexture!==!0,Rt=bt.__version===void 0||lt===!0,xt=dt.dataReady;let wt=N(T,Dt);Lt(r.TEXTURE_CUBE_MAP,T);let zt;if(At){Z&&Rt&&i.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ie,Dt.width,Dt.height);for(let Mt=0;Mt<6;Mt++){zt=Nt[Mt].mipmaps;for(let Zt=0;Zt<zt.length;Zt++){const Xt=zt[Zt];T.format!==Ci?Kt!==null?Z?xt&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt,0,0,Xt.width,Xt.height,Kt,Xt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt,ie,Xt.width,Xt.height,0,Xt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt,0,0,Xt.width,Xt.height,Kt,Jt,Xt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt,ie,Xt.width,Xt.height,0,Kt,Jt,Xt.data)}}}else{if(zt=T.mipmaps,Z&&Rt){zt.length>0&&wt++;const Mt=De(Nt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ie,Mt.width,Mt.height)}for(let Mt=0;Mt<6;Mt++)if(Ht){Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Nt[Mt].width,Nt[Mt].height,Kt,Jt,Nt[Mt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ie,Nt[Mt].width,Nt[Mt].height,0,Kt,Jt,Nt[Mt].data);for(let Zt=0;Zt<zt.length;Zt++){const Fe=zt[Zt].image[Mt].image;Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt+1,0,0,Fe.width,Fe.height,Kt,Jt,Fe.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt+1,ie,Fe.width,Fe.height,0,Kt,Jt,Fe.data)}}else{Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Kt,Jt,Nt[Mt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ie,Kt,Jt,Nt[Mt]);for(let Zt=0;Zt<zt.length;Zt++){const Xt=zt[Zt];Z?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt+1,0,0,Kt,Jt,Xt.image[Mt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Zt+1,ie,Kt,Jt,Xt.image[Mt])}}}S(T)&&L(r.TEXTURE_CUBE_MAP),bt.__version=dt.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function Ft(I,T,j,lt,dt,bt){const Ct=c.convert(j.format,j.colorSpace),pt=c.convert(j.type),mt=A(j.internalFormat,Ct,pt,j.normalized,j.colorSpace),At=a.get(T),Ht=a.get(j);if(Ht.__renderTarget=T,!At.__hasExternalTextures){const Nt=Math.max(1,T.width>>bt),Dt=Math.max(1,T.height>>bt);dt===r.TEXTURE_3D||dt===r.TEXTURE_2D_ARRAY?i.texImage3D(dt,bt,mt,Nt,Dt,T.depth,0,Ct,pt,null):i.texImage2D(dt,bt,mt,Nt,Dt,0,Ct,pt,null)}i.bindFramebuffer(r.FRAMEBUFFER,I),an(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,lt,dt,Ht.__webglTexture,0,We(T)):(dt===r.TEXTURE_2D||dt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,lt,dt,Ht.__webglTexture,bt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function le(I,T,j){if(r.bindRenderbuffer(r.RENDERBUFFER,I),T.depthBuffer){const lt=T.depthTexture,dt=lt&&lt.isDepthTexture?lt.type:null,bt=O(T.stencilBuffer,dt),Ct=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;an(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(T),bt,T.width,T.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(T),bt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,bt,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ct,r.RENDERBUFFER,I)}else{const lt=T.textures;for(let dt=0;dt<lt.length;dt++){const bt=lt[dt],Ct=c.convert(bt.format,bt.colorSpace),pt=c.convert(bt.type),mt=A(bt.internalFormat,Ct,pt,bt.normalized,bt.colorSpace);an(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(T),mt,T.width,T.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(T),mt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,mt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function en(I,T,j){const lt=T.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const dt=a.get(T.depthTexture);if(dt.__renderTarget=T,(!dt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),lt){if(dt.__webglInit===void 0&&(dt.__webglInit=!0,T.depthTexture.addEventListener("dispose",D)),dt.__webglTexture===void 0){dt.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T.depthTexture);const At=c.convert(T.depthTexture.format),Ht=c.convert(T.depthTexture.type);let Nt;T.depthTexture.format===Ra?Nt=r.DEPTH_COMPONENT24:T.depthTexture.format===Is&&(Nt=r.DEPTH24_STENCIL8);for(let Dt=0;Dt<6;Dt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,Nt,T.width,T.height,0,At,Ht,null)}}else ot(T.depthTexture,0);const bt=dt.__webglTexture,Ct=We(T),pt=lt?r.TEXTURE_CUBE_MAP_POSITIVE_X+j:r.TEXTURE_2D,mt=T.depthTexture.format===Is?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===Ra)an(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,pt,bt,0,Ct):r.framebufferTexture2D(r.FRAMEBUFFER,mt,pt,bt,0);else if(T.depthTexture.format===Is)an(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,pt,bt,0,Ct):r.framebufferTexture2D(r.FRAMEBUFFER,mt,pt,bt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(I){const T=a.get(I),j=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const lt=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),lt){const dt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,lt.removeEventListener("dispose",dt)};lt.addEventListener("dispose",dt),T.__depthDisposeCallback=dt}T.__boundDepthTexture=lt}if(I.depthTexture&&!T.__autoAllocateDepthBuffer)if(j)for(let lt=0;lt<6;lt++)en(T.__webglFramebuffer[lt],I,lt);else{const lt=I.texture.mipmaps;lt&&lt.length>0?en(T.__webglFramebuffer[0],I,0):en(T.__webglFramebuffer,I,0)}else if(j){T.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[lt]),T.__webglDepthbuffer[lt]===void 0)T.__webglDepthbuffer[lt]=r.createRenderbuffer(),le(T.__webglDepthbuffer[lt],I,!1);else{const dt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=T.__webglDepthbuffer[lt];r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,bt)}}else{const lt=I.texture.mipmaps;if(lt&&lt.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),le(T.__webglDepthbuffer,I,!1);else{const dt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,bt)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(I,T,j){const lt=a.get(I);T!==void 0&&Ft(lt.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),j!==void 0&&ae(I)}function Ne(I){const T=I.texture,j=a.get(I),lt=a.get(T);I.addEventListener("dispose",b);const dt=I.textures,bt=I.isWebGLCubeRenderTarget===!0,Ct=dt.length>1;if(Ct||(lt.__webglTexture===void 0&&(lt.__webglTexture=r.createTexture()),lt.__version=T.version,f.memory.textures++),bt){j.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(T.mipmaps&&T.mipmaps.length>0){j.__webglFramebuffer[pt]=[];for(let mt=0;mt<T.mipmaps.length;mt++)j.__webglFramebuffer[pt][mt]=r.createFramebuffer()}else j.__webglFramebuffer[pt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){j.__webglFramebuffer=[];for(let pt=0;pt<T.mipmaps.length;pt++)j.__webglFramebuffer[pt]=r.createFramebuffer()}else j.__webglFramebuffer=r.createFramebuffer();if(Ct)for(let pt=0,mt=dt.length;pt<mt;pt++){const At=a.get(dt[pt]);At.__webglTexture===void 0&&(At.__webglTexture=r.createTexture(),f.memory.textures++)}if(I.samples>0&&an(I)===!1){j.__webglMultisampledFramebuffer=r.createFramebuffer(),j.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let pt=0;pt<dt.length;pt++){const mt=dt[pt];j.__webglColorRenderbuffer[pt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,j.__webglColorRenderbuffer[pt]);const At=c.convert(mt.format,mt.colorSpace),Ht=c.convert(mt.type),Nt=A(mt.internalFormat,At,Ht,mt.normalized,mt.colorSpace,I.isXRRenderTarget===!0),Dt=We(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,Dt,Nt,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.RENDERBUFFER,j.__webglColorRenderbuffer[pt])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(j.__webglDepthRenderbuffer=r.createRenderbuffer(),le(j.__webglDepthRenderbuffer,I,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(bt){i.bindTexture(r.TEXTURE_CUBE_MAP,lt.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T);for(let pt=0;pt<6;pt++)if(T.mipmaps&&T.mipmaps.length>0)for(let mt=0;mt<T.mipmaps.length;mt++)Ft(j.__webglFramebuffer[pt][mt],I,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,mt);else Ft(j.__webglFramebuffer[pt],I,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);S(T)&&L(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Ct){for(let pt=0,mt=dt.length;pt<mt;pt++){const At=dt[pt],Ht=a.get(At);let Nt=r.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Nt=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Nt,Ht.__webglTexture),Lt(Nt,At),Ft(j.__webglFramebuffer,I,At,r.COLOR_ATTACHMENT0+pt,Nt,0),S(At)&&L(Nt)}i.unbindTexture()}else{let pt=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(pt=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(pt,lt.__webglTexture),Lt(pt,T),T.mipmaps&&T.mipmaps.length>0)for(let mt=0;mt<T.mipmaps.length;mt++)Ft(j.__webglFramebuffer[mt],I,T,r.COLOR_ATTACHMENT0,pt,mt);else Ft(j.__webglFramebuffer,I,T,r.COLOR_ATTACHMENT0,pt,0);S(T)&&L(pt),i.unbindTexture()}I.depthBuffer&&ae(I)}function ge(I){const T=I.textures;for(let j=0,lt=T.length;j<lt;j++){const dt=T[j];if(S(dt)){const bt=P(I),Ct=a.get(dt).__webglTexture;i.bindTexture(bt,Ct),L(bt),i.unbindTexture()}}}const Xe=[],nn=[];function An(I){if(I.samples>0){if(an(I)===!1){const T=I.textures,j=I.width,lt=I.height;let dt=r.COLOR_BUFFER_BIT;const bt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=a.get(I),pt=T.length>1;if(pt)for(let At=0;At<T.length;At++)i.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const mt=I.texture.mipmaps;mt&&mt.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let At=0;At<T.length;At++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(dt|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(dt|=r.STENCIL_BUFFER_BIT)),pt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const Ht=a.get(T[At]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ht,0)}r.blitFramebuffer(0,0,j,lt,0,0,j,lt,dt,r.NEAREST),m===!0&&(Xe.length=0,nn.length=0,Xe.push(r.COLOR_ATTACHMENT0+At),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(Xe.push(bt),nn.push(bt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,nn)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Xe))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let At=0;At<T.length;At++){i.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const Ht=a.get(T[At]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,Ht,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&m){const T=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function We(I){return Math.min(l.maxSamples,I.samples)}function an(I){const T=a.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function K(I){const T=f.render.frame;g.get(I)!==T&&(g.set(I,T),I.update())}function Oe(I,T){const j=I.colorSpace,lt=I.format,dt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||j!==nu&&j!==Ea&&(Ee.getTransfer(j)===Be?(lt!==Ci||dt!==Yn)&&ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ae("WebGLTextures: Unsupported texture color space:",j)),T}function De(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(p.width=I.naturalWidth||I.width,p.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(p.width=I.displayWidth,p.height=I.displayHeight):(p.width=I.width,p.height=I.height),p}this.allocateTextureUnit=B,this.resetTextureUnits=J,this.getTextureUnits=X,this.setTextureUnits=$,this.setTexture2D=ot,this.setTexture2DArray=et,this.setTexture3D=ft,this.setTextureCube=z,this.rebindTextures=xe,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=An,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Ft,this.useMultisampledRTT=an,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function E3(r,t){function i(a,l=Ea){let c;const f=Ee.getTransfer(l);if(a===Yn)return r.UNSIGNED_BYTE;if(a===tp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===ep)return r.UNSIGNED_SHORT_5_5_5_1;if(a===k_)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===X_)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===G_)return r.BYTE;if(a===V_)return r.SHORT;if(a===il)return r.UNSIGNED_SHORT;if(a===$d)return r.INT;if(a===ji)return r.UNSIGNED_INT;if(a===Ki)return r.FLOAT;if(a===si)return r.HALF_FLOAT;if(a===W_)return r.ALPHA;if(a===q_)return r.RGB;if(a===Ci)return r.RGBA;if(a===Ra)return r.DEPTH_COMPONENT;if(a===Is)return r.DEPTH_STENCIL;if(a===Y_)return r.RED;if(a===np)return r.RED_INTEGER;if(a===Gs)return r.RG;if(a===ip)return r.RG_INTEGER;if(a===ap)return r.RGBA_INTEGER;if(a===Zc||a===Kc||a===Qc||a===Jc)if(f===Be)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===Zc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===Kc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===Qc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===Zc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===Kc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===Qc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Jc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===md||a===gd||a===vd||a===_d)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===md)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===gd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===vd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===_d)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===xd||a===Sd||a===yd||a===Md||a===Ed||a===tu||a===bd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===xd||a===Sd)return f===Be?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===yd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===Md)return c.COMPRESSED_R11_EAC;if(a===Ed)return c.COMPRESSED_SIGNED_R11_EAC;if(a===tu)return c.COMPRESSED_RG11_EAC;if(a===bd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===Td||a===Ad||a===Rd||a===wd||a===Cd||a===Dd||a===Ud||a===Ld||a===Nd||a===Od||a===Pd||a===zd||a===Bd||a===Id)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Td)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Ad)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Rd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===wd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Cd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Dd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Ud)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Ld)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Nd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===Od)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Pd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===zd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Bd)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Id)return f===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===Fd||a===Hd||a===Gd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===Fd)return f===Be?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Hd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===Gd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Vd||a===kd||a===eu||a===Xd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===Vd)return c.COMPRESSED_RED_RGTC1_EXT;if(a===kd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===eu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===Xd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===al?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:i}}const b3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T3=`
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

}`;class A3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const a=new nx(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,a=new _n({vertexShader:b3,fragmentShader:T3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new tn(new lu(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class R3 extends Vs{constructor(t,i){super();const a=this;let l=null,c=1,f=null,d="local-floor",m=1,p=null,g=null,_=null,v=null,x=null,E=null;const w=typeof XRWebGLBinding<"u",M=new A3,S={},L=i.getContextAttributes();let P=null,A=null;const O=[],N=[],D=new Qt;let b=null,C=null;const F=new vi;F.viewport=new Ze;const k=new vi;k.viewport=new Ze;const G=[F,k],J=new O1;let X=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let vt=O[st];return vt===void 0&&(vt=new Ph,O[st]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(st){let vt=O[st];return vt===void 0&&(vt=new Ph,O[st]=vt),vt.getGripSpace()},this.getHand=function(st){let vt=O[st];return vt===void 0&&(vt=new Ph,O[st]=vt),vt.getHandSpace()};function B(st){const vt=N.indexOf(st.inputSource);if(vt===-1)return;const Tt=O[vt];Tt!==void 0&&(Tt.update(st.inputSource,st.frame,p||f),Tt.dispatchEvent({type:st.type,data:st.inputSource}))}function W(){l.removeEventListener("select",B),l.removeEventListener("selectstart",B),l.removeEventListener("selectend",B),l.removeEventListener("squeeze",B),l.removeEventListener("squeezestart",B),l.removeEventListener("squeezeend",B),l.removeEventListener("end",W),l.removeEventListener("inputsourceschange",ot);for(let st=0;st<O.length;st++){const vt=N[st];vt!==null&&(N[st]=null,O[st].disconnect(vt))}X=null,$=null,M.reset();for(const st in S)delete S[st];if(t.setRenderTarget(P),x=null,v=null,_=null,l=null,A=null,kt.stop(),a.isPresenting=!1,t.setPixelRatio(b),t.setSize(D.width,D.height,!1),C!==null){const st=C.camera;st.fov=C.fov,st.zoom=C.zoom,st.updateProjectionMatrix(),C=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){c=st,a.isPresenting===!0&&ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){d=st,a.isPresenting===!0&&ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(st){p=st},this.getBaseLayer=function(){return v!==null?v:x},this.getBinding=function(){return _===null&&w&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(st){if(l=st,l!==null){if(P=t.getRenderTarget(),l.addEventListener("select",B),l.addEventListener("selectstart",B),l.addEventListener("selectend",B),l.addEventListener("squeeze",B),l.addEventListener("squeezestart",B),l.addEventListener("squeezeend",B),l.addEventListener("end",W),l.addEventListener("inputsourceschange",ot),L.xrCompatible!==!0&&await i.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(D),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,te=null,Ft=null;L.depth&&(Ft=L.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Tt=L.stencil?Is:Ra,te=L.stencil?al:ji);const le={colorFormat:i.RGBA8,depthFormat:Ft,scaleFactor:c};_=this.getBinding(),v=_.createProjectionLayer(le),l.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),A=new Di(v.textureWidth,v.textureHeight,{format:Ci,type:Yn,depthTexture:new ol(v.textureWidth,v.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:L.stencil,colorSpace:t.outputColorSpace,samples:L.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const Tt={antialias:L.antialias,alpha:!0,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(l,i,Tt),l.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new Di(x.framebufferWidth,x.framebufferHeight,{format:Ci,type:Yn,colorSpace:t.outputColorSpace,stencilBuffer:L.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(d),kt.setContext(l),kt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function ot(st){for(let vt=0;vt<st.removed.length;vt++){const Tt=st.removed[vt],te=N.indexOf(Tt);te>=0&&(N[te]=null,O[te].disconnect(Tt))}for(let vt=0;vt<st.added.length;vt++){const Tt=st.added[vt];let te=N.indexOf(Tt);if(te===-1){for(let le=0;le<O.length;le++)if(le>=N.length){N.push(Tt),te=le;break}else if(N[le]===null){N[le]=Tt,te=le;break}if(te===-1)break}const Ft=O[te];Ft&&Ft.connect(Tt)}}const et=new H,ft=new H;function z(st,vt,Tt){et.setFromMatrixPosition(vt.matrixWorld),ft.setFromMatrixPosition(Tt.matrixWorld);const te=et.distanceTo(ft),Ft=vt.projectionMatrix.elements,le=Tt.projectionMatrix.elements,en=Ft[14]/(Ft[10]-1),ae=Ft[14]/(Ft[10]+1),xe=(Ft[9]+1)/Ft[5],Ne=(Ft[9]-1)/Ft[5],ge=(Ft[8]-1)/Ft[0],Xe=(le[8]+1)/le[0],nn=en*ge,An=en*Xe,We=te/(-ge+Xe),an=We*-ge;if(vt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(an),st.translateZ(We),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),Ft[10]===-1)st.projectionMatrix.copy(vt.projectionMatrix),st.projectionMatrixInverse.copy(vt.projectionMatrixInverse);else{const K=en+We,Oe=ae+We,De=nn-an,I=An+(te-an),T=xe*ae/Oe*K,j=Ne*ae/Oe*K;st.projectionMatrix.makePerspective(De,I,T,j,K,Oe),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function tt(st,vt){vt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(vt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(l===null)return;let vt=st.near,Tt=st.far;M.texture!==null&&(M.depthNear>0&&(vt=M.depthNear),M.depthFar>0&&(Tt=M.depthFar)),J.near=k.near=F.near=vt,J.far=k.far=F.far=Tt,(X!==J.near||$!==J.far)&&(l.updateRenderState({depthNear:J.near,depthFar:J.far}),X=J.near,$=J.far),J.layers.mask=st.layers.mask|6,F.layers.mask=J.layers.mask&-5,k.layers.mask=J.layers.mask&-3;const te=st.parent,Ft=J.cameras;tt(J,te);for(let le=0;le<Ft.length;le++)tt(Ft[le],te);Ft.length===2?z(J,F,k):J.projectionMatrix.copy(F.projectionMatrix),C===null&&st.isPerspectiveCamera&&(C={camera:st,fov:st.fov,zoom:st.zoom}),gt(st,J,te)};function gt(st,vt,Tt){Tt===null?st.matrix.copy(vt.matrixWorld):(st.matrix.copy(Tt.matrixWorld),st.matrix.invert(),st.matrix.multiply(vt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(vt.projectionMatrix),st.projectionMatrixInverse.copy(vt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=rl*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return J},this.getFoveation=function(){if(!(v===null&&x===null))return m},this.setFoveation=function(st){m=st,v!==null&&(v.fixedFoveation=st),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=st)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(J)},this.getCameraTexture=function(st){return S[st]};let Et=null;function Lt(st,vt){if(g=vt.getViewerPose(p||f),E=vt,g!==null){const Tt=g.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let te=!1;Tt.length!==J.cameras.length&&(J.cameras.length=0,te=!0);for(let ae=0;ae<Tt.length;ae++){const xe=Tt[ae];let Ne=null;if(x!==null)Ne=x.getViewport(xe);else{const Xe=_.getViewSubImage(v,xe);Ne=Xe.viewport,ae===0&&(t.setRenderTargetTextures(A,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(A))}let ge=G[ae];ge===void 0&&(ge=new vi,ge.layers.enable(ae),ge.viewport=new Ze,G[ae]=ge),ge.matrix.fromArray(xe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(xe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),ae===0&&(J.matrix.copy(ge.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale)),te===!0&&J.cameras.push(ge)}const Ft=l.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&w){_=a.getBinding();const ae=_.getDepthInformation(Tt[0]);ae&&ae.isValid&&ae.texture&&M.init(ae,l.renderState)}if(Ft&&Ft.includes("camera-access")&&w){t.state.unbindTexture(),_=a.getBinding();for(let ae=0;ae<Tt.length;ae++){const xe=Tt[ae].camera;if(xe){let Ne=S[xe];Ne||(Ne=new nx,S[xe]=Ne);const ge=_.getCameraImage(xe);Ne.sourceTexture=ge}}}}for(let Tt=0;Tt<O.length;Tt++){const te=N[Tt],Ft=O[Tt];te!==null&&Ft!==void 0&&Ft.update(te,vt,p||f)}Et&&Et(st,vt),vt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:vt}),E=null}const kt=new cx;kt.setAnimationLoop(Lt),this.setAnimationLoop=function(st){Et=st},this.dispose=function(){}}}const w3=new Ie,gx=new re;gx.set(-1,0,0,0,1,0,0,0,1);function C3(r,t){function i(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function a(M,S){S.color.getRGB(M.fogColor.value,sx(r)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function l(M,S,L,P,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),_(M,S)):S.isMeshPhongMaterial?(c(M,S),g(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),v(M,S),S.isMeshPhysicalMaterial&&x(M,S,A)):S.isMeshMatcapMaterial?(c(M,S),E(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),w(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(f(M,S),S.isLineDashedMaterial&&d(M,S)):S.isPointsMaterial?m(M,S,L,P):S.isSpriteMaterial?p(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,i(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Hn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,i(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Hn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,i(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,i(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const L=t.get(S),P=L.envMap,A=L.envMapRotation;P&&(M.envMap.value=P,M.envMapRotation.value.setFromMatrix4(w3.makeRotationFromEuler(A)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(gx),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,M.aoMapTransform))}function f(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform))}function d(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,L,P){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*L,M.scale.value=P*.5,S.map&&(M.map.value=S.map,i(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function p(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function g(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function _(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function v(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,L){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Hn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=L.texture,M.transmissionSamplerSize.value.set(L.width,L.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,M.specularIntensityMapTransform))}function E(M,S){S.matcap&&(M.matcap.value=S.matcap)}function w(M,S){const L=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(L.matrixWorld),M.nearDistance.value=L.shadow.camera.near,M.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:l}}function D3(r,t,i,a){let l={},c={},f=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,O){const N=O.program;a.uniformBlockBinding(A,N)}function p(A,O){let N=l[A.id];N===void 0&&(M(A),N=g(A),l[A.id]=N,A.addEventListener("dispose",L));const D=O.program;a.updateUBOMapping(A,D);const b=t.render.frame;c[A.id]!==b&&(v(A),c[A.id]=b)}function g(A){const O=_();A.__bindingPointIndex=O;const N=r.createBuffer(),D=A.__size,b=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,N),r.bufferData(r.UNIFORM_BUFFER,D,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,O,N),N}function _(){for(let A=0;A<d;A++)if(f.indexOf(A)===-1)return f.push(A),A;return Ae("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(A){const O=l[A.id],N=A.uniforms,D=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,O);for(let b=0,C=N.length;b<C;b++){const F=N[b];if(Array.isArray(F))for(let k=0,G=F.length;k<G;k++)x(F[k],b,k,D);else x(F,b,0,D)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,O,N,D){if(w(A,O,N,D)===!0){const b=A.__offset,C=A.value;if(Array.isArray(C)){let F=0;for(let k=0;k<C.length;k++){const G=C[k],J=S(G);E(G,A.__data,F),typeof G!="number"&&typeof G!="boolean"&&!G.isMatrix3&&!ArrayBuffer.isView(G)&&(F+=J.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(C,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,b,A.__data)}}function E(A,O,N){typeof A=="number"||typeof A=="boolean"?O[0]=A:A.isMatrix3?(O[0]=A.elements[0],O[1]=A.elements[1],O[2]=A.elements[2],O[3]=0,O[4]=A.elements[3],O[5]=A.elements[4],O[6]=A.elements[5],O[7]=0,O[8]=A.elements[6],O[9]=A.elements[7],O[10]=A.elements[8],O[11]=0):ArrayBuffer.isView(A)?O.set(new A.constructor(A.buffer,A.byteOffset,O.length)):A.toArray(O,N)}function w(A,O,N,D){const b=A.value,C=O+"_"+N;if(D[C]===void 0)return typeof b=="number"||typeof b=="boolean"?D[C]=b:ArrayBuffer.isView(b)?D[C]=b.slice():D[C]=b.clone(),!0;{const F=D[C];if(typeof b=="number"||typeof b=="boolean"){if(F!==b)return D[C]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(F.equals(b)===!1)return F.copy(b),!0}}return!1}function M(A){const O=A.uniforms;let N=0;const D=16;for(let C=0,F=O.length;C<F;C++){const k=Array.isArray(O[C])?O[C]:[O[C]];for(let G=0,J=k.length;G<J;G++){const X=k[G],$=Array.isArray(X.value)?X.value:[X.value];for(let B=0,W=$.length;B<W;B++){const ot=$[B],et=S(ot),ft=N%D,z=ft%et.boundary,tt=ft+z;N+=z,tt!==0&&D-tt<et.storage&&(N+=D-tt),X.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=N,N+=et.storage}}}const b=N%D;return b>0&&(N+=D-b),A.__size=N,A.__cache={},this}function S(A){const O={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(O.boundary=4,O.storage=4):A.isVector2?(O.boundary=8,O.storage=8):A.isVector3||A.isColor?(O.boundary=16,O.storage=12):A.isVector4?(O.boundary=16,O.storage=16):A.isMatrix3?(O.boundary=48,O.storage=48):A.isMatrix4?(O.boundary=64,O.storage=64):A.isTexture?ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(O.boundary=16,O.storage=A.byteLength):ne("WebGLRenderer: Unsupported uniform value type.",A),O}function L(A){const O=A.target;O.removeEventListener("dispose",L);const N=f.indexOf(O.__bindingPointIndex);f.splice(N,1),r.deleteBuffer(l[O.id]),delete l[O.id],delete c[O.id]}function P(){for(const A in l)r.deleteBuffer(l[A]);f=[],l={},c={}}return{bind:m,update:p,dispose:P}}const U3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Yi=null;function L3(){return Yi===null&&(Yi=new i1(U3,16,16,Gs,si),Yi.name="DFG_LUT",Yi.minFilter=Fn,Yi.magFilter=Fn,Yi.wrapS=ba,Yi.wrapT=ba,Yi.generateMipmaps=!1,Yi.needsUpdate=!0),Yi}class N3{constructor(t={}){const{canvas:i=vM(),context:a=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1,outputBufferType:x=Yn}=t;this.isWebGLRenderer=!0;let E;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=a.getContextAttributes().alpha}else E=f;const w=x,M=new Set([ap,ip,np]),S=new Set([Yn,ji,il,al,tp,ep]),L=new Uint32Array(4),P=new Int32Array(4),A=new H;let O=null,N=null;const D=[],b=[];let C=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let k=!1,G=null,J=null,X=null,$=null;this._outputColorSpace=ni;let B=0,W=0,ot=null,et=-1,ft=null;const z=new Ze,tt=new Ze;let gt=null;const Et=new ee(0);let Lt=0,kt=i.width,st=i.height,vt=1,Tt=null,te=null;const Ft=new Ze(0,0,kt,st),le=new Ze(0,0,kt,st);let en=!1;const ae=new hp;let xe=!1,Ne=!1;const ge=new Ie,Xe=new H,nn=new Ze,An={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function an(){return ot===null?vt:1}let K=a;function Oe(R,q){return i.getContext(R,q)}let De,I,T,j,lt,dt,bt,Ct,pt,mt,At,Ht,Nt,Dt,Kt,Jt,ie,Z,Rt,xt,wt,zt,Mt;try{const R={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Jd}`),i.addEventListener("webglcontextlost",Fe,!1),i.addEventListener("webglcontextrestored",be,!1),i.addEventListener("webglcontextcreationerror",Zn,!1),K===null){const q="webgl2";if(K=Oe(q,R),K===null)throw Oe(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Zt()}catch(R){throw i.removeEventListener("webglcontextlost",Fe,!1),i.removeEventListener("webglcontextrestored",be,!1),i.removeEventListener("webglcontextcreationerror",Zn,!1),Ae("WebGLRenderer: "+R.message),R}function Zt(){De=new LT(K),De.init(),wt=new E3(K,De),I=new MT(K,De,t,wt),T=new y3(K,De),I.reversedDepthBuffer&&v&&T.buffers.depth.setReversed(!0),J=K.createFramebuffer(),X=K.createFramebuffer(),$=K.createFramebuffer(),j=new PT(K),lt=new o3,dt=new M3(K,De,T,lt,I,wt,j),bt=new UT(F),Ct=new B1(K),zt=new ST(K,Ct),pt=new NT(K,Ct,j,zt),mt=new BT(K,pt,Ct,zt,j),Z=new zT(K,I,dt),Kt=new ET(lt),At=new r3(F,bt,De,I,zt,Kt),Ht=new C3(F,lt),Nt=new c3,Dt=new m3(De),ie=new xT(F,bt,T,mt,E,m),Jt=new S3(F,mt,I),Mt=new D3(K,j,I,T),Rt=new yT(K,De,j),xt=new OT(K,De,j),j.programs=At.programs,F.capabilities=I,F.extensions=De,F.properties=lt,F.renderLists=Nt,F.shadowMap=Jt,F.state=T,F.info=j}w!==Yn&&(C=new FT(w,i.width,i.height,d,l,c));const Xt=new R3(F,K);this.xr=Xt,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const R=De.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=De.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(R){R!==void 0&&(vt=R,this.setSize(kt,st,!1))},this.getSize=function(R){return R.set(kt,st)},this.setSize=function(R,q,ut=!0){if(Xt.isPresenting){ne("WebGLRenderer: Can't change size while VR device is presenting.");return}kt=R,st=q,i.width=Math.floor(R*vt),i.height=Math.floor(q*vt),ut===!0&&(i.style.width=R+"px",i.style.height=q+"px"),C!==null&&C.setSize(i.width,i.height),this.setViewport(0,0,R,q)},this.getDrawingBufferSize=function(R){return R.set(kt*vt,st*vt).floor()},this.setDrawingBufferSize=function(R,q,ut){kt=R,st=q,vt=ut,i.width=Math.floor(R*ut),i.height=Math.floor(q*ut),this.setViewport(0,0,R,q)},this.setEffects=function(R){if(w===Yn){Ae("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let q=0;q<R.length;q++)if(R[q].isOutputPass===!0){ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(z)},this.getViewport=function(R){return R.copy(Ft)},this.setViewport=function(R,q,ut,nt){R.isVector4?Ft.set(R.x,R.y,R.z,R.w):Ft.set(R,q,ut,nt),T.viewport(z.copy(Ft).multiplyScalar(vt).round())},this.getScissor=function(R){return R.copy(le)},this.setScissor=function(R,q,ut,nt){R.isVector4?le.set(R.x,R.y,R.z,R.w):le.set(R,q,ut,nt),T.scissor(tt.copy(le).multiplyScalar(vt).round())},this.getScissorTest=function(){return en},this.setScissorTest=function(R){T.setScissorTest(en=R)},this.setOpaqueSort=function(R){Tt=R},this.setTransparentSort=function(R){te=R},this.getClearColor=function(R){return R.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,ut=!0){let nt=0;if(R){let it=!1;if(ot!==null){const Ot=ot.texture.format;it=M.has(Ot)}if(it){const Ot=ot.texture.type,Gt=S.has(Ot),Ut=ie.getClearColor(),Bt=ie.getClearAlpha(),It=Ut.r,oe=Ut.g,pe=Ut.b;Gt?(L[0]=It,L[1]=oe,L[2]=pe,L[3]=Bt,K.clearBufferuiv(K.COLOR,0,L)):(P[0]=It,P[1]=oe,P[2]=pe,P[3]=Bt,K.clearBufferiv(K.COLOR,0,P))}else nt|=K.COLOR_BUFFER_BIT}q&&(nt|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ut&&(nt|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),nt!==0&&K.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),G=R},this.dispose=function(){i.removeEventListener("webglcontextlost",Fe,!1),i.removeEventListener("webglcontextrestored",be,!1),i.removeEventListener("webglcontextcreationerror",Zn,!1),ie.dispose(),Nt.dispose(),Dt.dispose(),lt.dispose(),bt.dispose(),mt.dispose(),zt.dispose(),Mt.dispose(),At.dispose(),Xt.dispose(),Xt.removeEventListener("sessionstart",cn),Xt.removeEventListener("sessionend",Dn),Kn.stop()};function Fe(R){R.preventDefault(),Sv("WebGLRenderer: Context Lost."),k=!0}function be(){Sv("WebGLRenderer: Context Restored."),k=!1;const R=j.autoReset,q=Jt.enabled,ut=Jt.autoUpdate,nt=Jt.needsUpdate,it=Jt.type;Zt(),j.autoReset=R,Jt.enabled=q,Jt.autoUpdate=ut,Jt.needsUpdate=nt,Jt.type=it}function Zn(R){Ae("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ri(R){const q=R.target;q.removeEventListener("dispose",ri),Kr(q)}function Kr(R){Qr(R),lt.remove(R)}function Qr(R){const q=lt.get(R).programs;q!==void 0&&(q.forEach(function(ut){At.releaseProgram(ut)}),R.isShaderMaterial&&At.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,ut,nt,it,Ot){q===null&&(q=An);const Gt=it.isMesh&&it.matrixWorld.determinantAffine()<0,Ut=Ua(R,q,ut,nt,it);T.setMaterial(nt,Gt);let Bt=ut.index,It=1;if(nt.wireframe===!0){if(Bt=pt.getWireframeAttribute(ut),Bt===void 0)return;It=2}const oe=ut.drawRange,pe=ut.attributes.position;let Wt=oe.start*It,Te=(oe.start+oe.count)*It;Ot!==null&&(Wt=Math.max(Wt,Ot.start*It),Te=Math.min(Te,(Ot.start+Ot.count)*It)),Bt!==null?(Wt=Math.max(Wt,0),Te=Math.min(Te,Bt.count)):pe!=null&&(Wt=Math.max(Wt,0),Te=Math.min(Te,pe.count));const Ke=Te-Wt;if(Ke<0||Ke===1/0)return;zt.setup(it,nt,Ut,ut,Bt);let qe,fe=Rt;if(Bt!==null&&(qe=Ct.get(Bt),fe=xt,fe.setIndex(qe)),it.isMesh)nt.wireframe===!0?(T.setLineWidth(nt.wireframeLinewidth*an()),fe.setMode(K.LINES)):fe.setMode(K.TRIANGLES);else if(it.isLine){let fn=nt.linewidth;fn===void 0&&(fn=1),T.setLineWidth(fn*an()),it.isLineSegments?fe.setMode(K.LINES):it.isLineLoop?fe.setMode(K.LINE_LOOP):fe.setMode(K.LINE_STRIP)}else it.isPoints?fe.setMode(K.POINTS):it.isSprite&&fe.setMode(K.TRIANGLES);if(it.isBatchedMesh)if(De.get("WEBGL_multi_draw"))fe.renderMultiDraw(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount);else{const fn=it._multiDrawStarts,Vt=it._multiDrawCounts,Sn=it._multiDrawCount,he=Bt?Ct.get(Bt).bytesPerElement:1,Vn=lt.get(nt).currentProgram.getUniforms();for(let oi=0;oi<Sn;oi++)Vn.setValue(K,"_gl_DrawID",oi),fe.render(fn[oi]/he,Vt[oi])}else if(it.isInstancedMesh)fe.renderInstances(Wt,Ke,it.count);else if(ut.isInstancedBufferGeometry){const fn=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,Vt=Math.min(ut.instanceCount,fn);fe.renderInstances(Wt,Ke,Vt)}else fe.render(Wt,Ke)};function Jr(R,q,ut,nt){G!==null&&R.isNodeMaterial&&G.setObject(nt,R),xe===!0&&Kt.setState(R,ut,!1),R.transparent===!0&&R.side===Ii&&R.forceSinglePass===!1?(R.side=Hn,R.needsUpdate=!0,Da(R,q,nt),R.side=ls,R.needsUpdate=!0,Da(R,q,nt),R.side=Ii):Da(R,q,nt)}this.compile=function(R,q,ut=null){ut===null&&(ut=R),G!==null&&G.renderStart(R,q,ut),N=Dt.get(ut),N.init(q),b.push(N),ut.traverseVisible(function(it){it.isLight&&it.layers.test(q.layers)&&(N.pushLight(it),it.castShadow&&N.pushShadow(it))}),R!==ut&&R.traverseVisible(function(it){it.isLight&&it.layers.test(q.layers)&&(N.pushLight(it),it.castShadow&&N.pushShadow(it))}),N.setupLights(),G!==null&&G.updateLights(N.state.lightsArray),Ne=this.localClippingEnabled,xe=Kt.init(this.clippingPlanes,Ne),xe===!0&&Kt.setGlobalState(this.clippingPlanes,q),G!==null&&Jt.render(N.state.shadowsArray,ut,q);const nt=new Set;return R.traverse(function(it){if(!(it.isMesh||it.isPoints||it.isLine||it.isSprite))return;const Ot=it.material;if(Ot)if(Array.isArray(Ot))for(let Gt=0;Gt<Ot.length;Gt++){const Ut=Ot[Gt];Jr(Ut,ut,q,it),nt.add(Ut)}else Jr(Ot,ut,q,it),nt.add(Ot)}),N=b.pop(),G!==null&&G.renderEnd(),nt},this.compileAsync=function(R,q,ut=null){const nt=this.compile(R,q,ut);return new Promise(it=>{function Ot(){if(nt.forEach(function(Gt){const Bt=lt.get(Gt).currentProgram;(Bt===void 0||Bt.isReady())&&nt.delete(Gt)}),nt.size===0){it(R);return}setTimeout(Ot,10)}De.get("KHR_parallel_shader_compile")!==null?Ot():setTimeout(Ot,10)})};let ks=null;function Hi(R){ks&&ks(R)}function cn(){Kn.stop()}function Dn(){Kn.start()}const Kn=new cx;Kn.setAnimationLoop(Hi),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(R){ks=R,Xt.setAnimationLoop(R),R===null?Kn.stop():Kn.start()},Xt.addEventListener("sessionstart",cn),Xt.addEventListener("sessionend",Dn),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0){Ae("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;G!==null&&G.renderStart(R,q);const ut=Xt.enabled===!0&&Xt.isPresenting===!0,nt=C!==null&&(ot===null||ut)&&C.begin(F,ot);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Xt.enabled===!0&&Xt.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Xt.cameraAutoUpdate===!0&&Xt.updateCamera(q),q=Xt.getCamera()),R.isScene===!0&&R.onBeforeRender(F,R,q,ot),N=Dt.get(R,b.length),N.init(q),N.state.textureUnits=dt.getTextureUnits(),b.push(N),ge.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),ae.setFromProjectionMatrix(ge,Qi,q.reversedDepth),Ne=this.localClippingEnabled,xe=Kt.init(this.clippingPlanes,Ne),O=Nt.get(R,D.length),O.init(),D.push(O),Xt.enabled===!0&&Xt.isPresenting===!0){const Gt=F.xr.getDepthSensingMesh();Gt!==null&&hs(Gt,q,-1/0,F.sortObjects)}hs(R,q,0,F.sortObjects),O.finish(),G!==null&&G.updateLights(N.state.lightsArray),F.sortObjects===!0&&O.sort(Tt,te),We=Xt.enabled===!1||Xt.isPresenting===!1||Xt.hasDepthSensing()===!1,We&&ie.addToRenderList(O,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&Kt.beginShadows();const it=N.state.shadowsArray;if(Jt.render(it,R,q),xe===!0&&Kt.endShadows(),(nt&&C.hasRenderPass())===!1){const Gt=O.opaque,Ut=O.transmissive;if(N.setupLights(),q.isArrayCamera){const Bt=q.cameras;if(Ut.length>0)for(let It=0,oe=Bt.length;It<oe;It++){const pe=Bt[It];hl(Gt,Ut,R,pe)}We&&ie.render(R);for(let It=0,oe=Bt.length;It<oe;It++){const pe=Bt[It];fl(O,R,pe,pe.viewport)}}else Ut.length>0&&hl(Gt,Ut,R,q),We&&ie.render(R),fl(O,R,q)}ot!==null&&W===0&&(dt.updateMultisampleRenderTarget(ot),dt.updateRenderTargetMipmap(ot)),nt&&C.end(F),R.isScene===!0&&R.onAfterRender(F,R,q),zt.resetDefaultState(),et=-1,ft=null,b.pop(),b.length>0?(N=b[b.length-1],dt.setTextureUnits(N.state.textureUnits),xe===!0&&Kt.setGlobalState(F.clippingPlanes,N.state.camera)):N=null,D.pop(),D.length>0?O=D[D.length-1]:O=null,G!==null&&G.renderEnd()};function hs(R,q,ut,nt){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)ut=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLightProbeGrid)N.pushLightProbeGrid(R);else if(R.isLight)N.pushLight(R),R.castShadow&&N.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(ae)){nt&&nn.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ge);const Gt=mt.update(R),Ut=R.material;Ut.visible&&O.push(R,Gt,Ut,ut,nn.z,null,q)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(ae))){const Gt=mt.update(R),Ut=R.material;if(nt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),nn.copy(R.boundingSphere.center)):(Gt.boundingSphere===null&&Gt.computeBoundingSphere(),nn.copy(Gt.boundingSphere.center)),nn.applyMatrix4(R.matrixWorld).applyMatrix4(ge)),Array.isArray(Ut)){const Bt=Gt.groups;for(let It=0,oe=Bt.length;It<oe;It++){const pe=Bt[It],Wt=Ut[pe.materialIndex];Wt&&Wt.visible&&O.push(R,Gt,Wt,ut,nn.z,pe,q)}}else Ut.visible&&O.push(R,Gt,Ut,ut,nn.z,null,q)}}const Ot=R.children;for(let Gt=0,Ut=Ot.length;Gt<Ut;Gt++)hs(Ot[Gt],q,ut,nt)}function fl(R,q,ut,nt){const{opaque:it,transmissive:Ot,transparent:Gt}=R;N.setupLightsView(ut),xe===!0&&Kt.setGlobalState(F.clippingPlanes,ut),nt&&T.viewport(z.copy(nt)),it.length>0&&ds(it,q,ut),Ot.length>0&&ds(Ot,q,ut),Gt.length>0&&ds(Gt,q,ut),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function hl(R,q,ut,nt){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[nt.id]===void 0){const Wt=De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[nt.id]=new Di(1,1,{generateMipmaps:!0,type:Wt?si:Yn,minFilter:Bs,samples:Math.max(4,I.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ee.workingColorSpace})}const Ot=N.state.transmissionRenderTarget[nt.id],Gt=nt.viewport||z;Ot.setSize(Gt.z*F.transmissionResolutionScale,Gt.w*F.transmissionResolutionScale);const Ut=F.getRenderTarget(),Bt=F.getActiveCubeFace(),It=F.getActiveMipmapLevel();F.setRenderTarget(Ot),F.getClearColor(Et),Lt=F.getClearAlpha(),Lt<1&&F.setClearColor(16777215,.5),F.clear(),We&&ie.render(ut);const oe=F.toneMapping;F.toneMapping=Ji;const pe=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),N.setupLightsView(nt),xe===!0&&Kt.setGlobalState(F.clippingPlanes,nt),ds(R,ut,nt),dt.updateMultisampleRenderTarget(Ot),dt.updateRenderTargetMipmap(Ot),De.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Te=0,Ke=q.length;Te<Ke;Te++){const qe=q[Te],{object:fe,geometry:fn,material:Vt,group:Sn}=qe;if(Vt.side===Ii&&fe.layers.test(nt.layers)){const he=Vt.side;Vt.side=Hn,Vt.needsUpdate=!0,Ca(fe,ut,nt,fn,Vt,Sn),Vt.side=he,Vt.needsUpdate=!0,Wt=!0}}Wt===!0&&(dt.updateMultisampleRenderTarget(Ot),dt.updateRenderTargetMipmap(Ot))}F.setRenderTarget(Ut,Bt,It),F.setClearColor(Et,Lt),pe!==void 0&&(nt.viewport=pe),F.toneMapping=oe}function ds(R,q,ut){const nt=q.isScene===!0?q.overrideMaterial:null;for(let it=0,Ot=R.length;it<Ot;it++){const Gt=R[it],{object:Ut,geometry:Bt,group:It}=Gt;let oe=Gt.material;oe.allowOverride===!0&&nt!==null&&(oe=nt),Ut.layers.test(ut.layers)&&Ca(Ut,q,ut,Bt,oe,It)}}function Ca(R,q,ut,nt,it,Ot){G!==null&&it.isNodeMaterial&&G.setObject(R,it),R.onBeforeRender(F,q,ut,nt,it,Ot),R.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),it.onBeforeRender(F,q,ut,nt,R,Ot),it.transparent===!0&&it.side===Ii&&it.forceSinglePass===!1?(it.side=Hn,it.needsUpdate=!0,F.renderBufferDirect(ut,q,nt,it,R,Ot),it.side=ls,it.needsUpdate=!0,F.renderBufferDirect(ut,q,nt,it,R,Ot),it.side=Ii):F.renderBufferDirect(ut,q,nt,it,R,Ot),R.onAfterRender(F,q,ut,nt,it,Ot)}function Da(R,q,ut){q.isScene!==!0&&(q=An);const nt=lt.get(R),it=N.state.lights,Ot=N.state.shadowsArray,Gt=it.state.version,Ut=At.getParameters(R,it.state,Ot,q,ut,N.state.lightProbeGridArray),Bt=At.getProgramCacheKey(Ut);let It=nt.programs;nt.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?q.environment:null,nt.fog=q.fog;const oe=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;nt.envMap=bt.get(R.envMap||nt.environment,oe),nt.envMapRotation=nt.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,It===void 0&&(R.addEventListener("dispose",ri),It=new Map,nt.programs=It);let pe=It.get(Bt);if(pe!==void 0){if(nt.currentProgram===pe&&nt.lightsStateVersion===Gt)return ta(R,Ut),pe}else Ut.uniforms=At.getUniforms(R),G!==null&&R.isNodeMaterial&&G.build(R,ut,Ut),R.onBeforeCompile(Ut,F),pe=At.acquireProgram(Ut,Bt),It.set(Bt,pe),nt.uniforms=Ut.uniforms;const Wt=nt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Wt.clippingPlanes=Kt.uniform),ta(R,Ut),nt.needsLights=dl(R),nt.lightsStateVersion=Gt,nt.needsLights&&(Wt.ambientLightColor.value=it.state.ambient,Wt.lightProbe.value=it.state.probe,Wt.sunLights.value=it.state.sun,Wt.sunLightShadows.value=it.state.sunShadow,Wt.directionalLights.value=it.state.directional,Wt.directionalLightShadows.value=it.state.directionalShadow,Wt.spotLights.value=it.state.spot,Wt.spotLightShadows.value=it.state.spotShadow,Wt.rectAreaLights.value=it.state.rectArea,Wt.ltc_1.value=it.state.rectAreaLTC1,Wt.ltc_2.value=it.state.rectAreaLTC2,Wt.pointLights.value=it.state.point,Wt.pointLightShadows.value=it.state.pointShadow,Wt.hemisphereLights.value=it.state.hemi,Wt.sunShadowMatrix.value=it.state.sunShadowMatrix,Wt.sunShadowCascade.value=it.state.sunShadowCascade,Wt.directionalShadowMatrix.value=it.state.directionalShadowMatrix,Wt.spotLightMatrix.value=it.state.spotLightMatrix,Wt.spotLightMap.value=it.state.spotLightMap,Wt.pointShadowMatrix.value=it.state.pointShadowMatrix),nt.lightProbeGrid=N.state.lightProbeGridArray.length>0,nt.currentProgram=pe,nt.uniformsList=null,pe}function $i(R){if(R.uniformsList===null){const q=R.currentProgram.getUniforms();R.uniformsList=jc.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function ta(R,q){const ut=lt.get(R);ut.outputColorSpace=q.outputColorSpace,ut.batching=q.batching,ut.batchingColor=q.batchingColor,ut.instancing=q.instancing,ut.instancingColor=q.instancingColor,ut.instancingMorph=q.instancingMorph,ut.skinning=q.skinning,ut.morphTargets=q.morphTargets,ut.morphNormals=q.morphNormals,ut.morphColors=q.morphColors,ut.morphTargetsCount=q.morphTargetsCount,ut.numClippingPlanes=q.numClippingPlanes,ut.numIntersection=q.numClipIntersection,ut.vertexAlphas=q.vertexAlphas,ut.vertexTangents=q.vertexTangents,ut.toneMapping=q.toneMapping}function ps(R,q){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;A.setFromMatrixPosition(q.matrixWorld);for(let ut=0,nt=R.length;ut<nt;ut++){const it=R[ut];if(it.texture!==null&&it.boundingBox.containsPoint(A))return it}return null}function Ua(R,q,ut,nt,it){q.isScene!==!0&&(q=An),dt.resetTextureUnits();const Ot=q.fog,Gt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial?q.environment:null,Ut=ot===null?F.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Ee.workingColorSpace,Bt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial&&!nt.envMap||nt.isMeshPhongMaterial&&!nt.envMap,It=bt.get(nt.envMap||Gt,Bt),oe=nt.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pe=!!ut.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Wt=!!ut.morphAttributes.position,Te=!!ut.morphAttributes.normal,Ke=!!ut.morphAttributes.color;let qe=Ji;nt.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(qe=F.toneMapping);const fe=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,fn=fe!==void 0?fe.length:0,Vt=lt.get(nt),Sn=N.state.lights;if(xe===!0&&(Ne===!0||R!==ft)){const He=R===ft&&nt.id===et;Kt.setState(nt,R,He)}let he=!1;nt.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==Sn.state.version||Vt.outputColorSpace!==Ut||it.isBatchedMesh&&Vt.batching===!1||!it.isBatchedMesh&&Vt.batching===!0||it.isBatchedMesh&&Vt.batchingColor===!0&&it._colorsTexture===null||it.isBatchedMesh&&Vt.batchingColor===!1&&it._colorsTexture!==null||it.isInstancedMesh&&Vt.instancing===!1||!it.isInstancedMesh&&Vt.instancing===!0||it.isSkinnedMesh&&Vt.skinning===!1||!it.isSkinnedMesh&&Vt.skinning===!0||it.isInstancedMesh&&Vt.instancingColor===!0&&it.instanceColor===null||it.isInstancedMesh&&Vt.instancingColor===!1&&it.instanceColor!==null||it.isInstancedMesh&&Vt.instancingMorph===!0&&it.morphTexture===null||it.isInstancedMesh&&Vt.instancingMorph===!1&&it.morphTexture!==null||Vt.envMap!==It||nt.fog===!0&&Vt.fog!==Ot||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==Kt.numPlanes||Vt.numIntersection!==Kt.numIntersection)||Vt.vertexAlphas!==oe||Vt.vertexTangents!==pe||Vt.morphTargets!==Wt||Vt.morphNormals!==Te||Vt.morphColors!==Ke||Vt.toneMapping!==qe||Vt.morphTargetsCount!==fn||!!Vt.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,Vt.__version=nt.version);let Vn=Vt.currentProgram;he===!0&&(Vn=Da(nt,q,it),G&&nt.isNodeMaterial&&G.onUpdateProgram(nt,Vn,Vt));let oi=!1,kn=!1,La=!1;const Ue=Vn.getUniforms(),je=Vt.uniforms;if(T.useProgram(Vn.program)&&(oi=!0,kn=!0,La=!0),nt.id!==et&&(et=nt.id,kn=!0),Vt.needsLights){const He=ps(N.state.lightProbeGridArray,it);Vt.lightProbeGrid!==He&&(Vt.lightProbeGrid=He,kn=!0)}if(oi||ft!==R){T.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Ue.setValue(K,"projectionMatrix",R.projectionMatrix),Ue.setValue(K,"viewMatrix",R.matrixWorldInverse);const Gi=Ue.map.cameraPosition;Gi!==void 0&&Gi.setValue(K,Xe.setFromMatrixPosition(R.matrixWorld)),I.logarithmicDepthBuffer&&Ue.setValue(K,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Ue.setValue(K,"isOrthographic",R.isOrthographicCamera===!0),ft!==R&&(ft=R,kn=!0,La=!0)}if(Vt.needsLights&&(Sn.state.sunShadowMap.length>0&&Ue.setValue(K,"sunShadowMap",Sn.state.sunShadowMap,dt),Sn.state.directionalShadowMap.length>0&&Ue.setValue(K,"directionalShadowMap",Sn.state.directionalShadowMap,dt),Sn.state.spotShadowMap.length>0&&Ue.setValue(K,"spotShadowMap",Sn.state.spotShadowMap,dt),Sn.state.pointShadowMap.length>0&&Ue.setValue(K,"pointShadowMap",Sn.state.pointShadowMap,dt)),it.isSkinnedMesh){Ue.setOptional(K,it,"bindMatrix"),Ue.setOptional(K,it,"bindMatrixInverse");const He=it.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),Ue.setValue(K,"boneTexture",He.boneTexture,dt))}it.isBatchedMesh&&(Ue.setOptional(K,it,"batchingTexture"),Ue.setValue(K,"batchingTexture",it._matricesTexture,dt),Ue.setOptional(K,it,"batchingIdTexture"),Ue.setValue(K,"batchingIdTexture",it._indirectTexture,dt),Ue.setOptional(K,it,"batchingColorTexture"),it._colorsTexture!==null&&Ue.setValue(K,"batchingColorTexture",it._colorsTexture,dt));const _i=ut.morphAttributes;if((_i.position!==void 0||_i.normal!==void 0||_i.color!==void 0)&&Z.update(it,ut,Vn),(kn||Vt.receiveShadow!==it.receiveShadow)&&(Vt.receiveShadow=it.receiveShadow,Ue.setValue(K,"receiveShadow",it.receiveShadow)),(nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial)&&nt.envMap===null&&q.environment!==null&&(je.envMapIntensity.value=q.environmentIntensity),je.dfgLUT!==void 0&&(je.dfgLUT.value=L3()),kn){if(Ue.setValue(K,"toneMappingExposure",F.toneMappingExposure),Vt.needsLights&&un(je,La),Ot&&nt.fog===!0&&Ht.refreshFogUniforms(je,Ot),Ht.refreshMaterialUniforms(je,nt,vt,st,N.state.transmissionRenderTarget[R.id]),Vt.needsLights&&Vt.lightProbeGrid){const He=Vt.lightProbeGrid;je.probesSH.value=He.texture,je.probesMin.value.copy(He.boundingBox.min),je.probesMax.value.copy(He.boundingBox.max),je.probesResolution.value.copy(He.resolution)}jc.upload(K,$i(Vt),je,dt)}if(nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(jc.upload(K,$i(Vt),je,dt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Ue.setValue(K,"center",it.center),Ue.setValue(K,"modelViewMatrix",it.modelViewMatrix),Ue.setValue(K,"normalMatrix",it.normalMatrix),Ue.setValue(K,"modelMatrix",it.matrixWorld),nt.uniformsGroups!==void 0){const He=nt.uniformsGroups;for(let Gi=0,Ui=He.length;Gi<Ui;Gi++){const xi=He[Gi];Mt.update(xi,Vn),Mt.bind(xi,Vn)}}return Vn}function un(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.sunLights.needsUpdate=q,R.sunLightShadows.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function dl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ot},this.setRenderTargetTextures=function(R,q,ut){const nt=lt.get(R);nt.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),lt.get(R.texture).__webglTexture=q,lt.get(R.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:ut,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,q){const ut=lt.get(R);ut.__webglFramebuffer=q,ut.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(R,q=0,ut=0){ot=R,B=q,W=ut;let nt=null,it=!1,Ot=!1;if(R){const Ut=lt.get(R);if(Ut.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(K.FRAMEBUFFER,Ut.__webglFramebuffer),z.copy(R.viewport),tt.copy(R.scissor),gt=R.scissorTest,T.viewport(z),T.scissor(tt),T.setScissorTest(gt),et=-1;return}else if(Ut.__webglFramebuffer===void 0)dt.setupRenderTarget(R);else if(Ut.__hasExternalTextures)dt.rebindTextures(R,lt.get(R.texture).__webglTexture,lt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const oe=R.depthTexture;if(Ut.__boundDepthTexture!==oe){if(oe!==null&&lt.has(oe)&&(R.width!==oe.image.width||R.height!==oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");dt.setupDepthRenderbuffer(R)}}const Bt=R.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(Ot=!0);const It=lt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(It[q])?nt=It[q][ut]:nt=It[q],it=!0):R.samples>0&&dt.useMultisampledRTT(R)===!1?nt=lt.get(R).__webglMultisampledFramebuffer:Array.isArray(It)?nt=It[ut]:nt=It,z.copy(R.viewport),tt.copy(R.scissor),gt=R.scissorTest}else z.copy(Ft).multiplyScalar(vt).floor(),tt.copy(le).multiplyScalar(vt).floor(),gt=en;if(ut!==0&&(nt=J),T.bindFramebuffer(K.FRAMEBUFFER,nt)&&T.drawBuffers(R,nt),T.viewport(z),T.scissor(tt),T.setScissorTest(gt),it){const Ut=lt.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ut.__webglTexture,ut)}else if(Ot){const Ut=q;for(let Bt=0;Bt<R.textures.length;Bt++){const It=lt.get(R.textures[Bt]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+Bt,It.__webglTexture,ut,Ut)}}else if(R!==null&&ut!==0){const Ut=lt.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Ut.__webglTexture,ut)}et=-1};function jr(R){const q=lt.get(R);return(q.__readFormat!==R.format||q.__readType!==R.type)&&(q.__readFormat=R.format,q.__readType=R.type,q.__formatReadable=I.textureFormatReadable(R.format),q.__typeReadable=I.textureTypeReadable(R.type)),q}this.readRenderTargetPixels=function(R,q,ut,nt,it,Ot,Gt,Ut=0){if(!(R&&R.isWebGLRenderTarget)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=lt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Gt!==void 0&&(Bt=Bt[Gt]),Bt){T.bindFramebuffer(K.FRAMEBUFFER,Bt);try{const It=R.textures[Ut],oe=It.format,pe=It.type;R.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ut);const Wt=jr(It);if(Wt.__formatReadable===!1){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Wt.__typeReadable===!1){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=R.width-nt&&ut>=0&&ut<=R.height-it&&K.readPixels(q,ut,nt,it,wt.convert(oe),wt.convert(pe),Ot)}finally{const It=ot!==null?lt.get(ot).__webglFramebuffer:null;T.bindFramebuffer(K.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(R,q,ut,nt,it,Ot,Gt,Ut=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=lt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Gt!==void 0&&(Bt=Bt[Gt]),Bt)if(q>=0&&q<=R.width-nt&&ut>=0&&ut<=R.height-it){T.bindFramebuffer(K.FRAMEBUFFER,Bt);const It=R.textures[Ut],oe=It.format,pe=It.type;R.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ut);const Wt=jr(It);if(Wt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Wt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,Te),K.bufferData(K.PIXEL_PACK_BUFFER,Ot.byteLength,K.STREAM_READ),K.readPixels(q,ut,nt,it,wt.convert(oe),wt.convert(pe),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);const Ke=ot!==null?lt.get(ot).__webglFramebuffer:null;T.bindFramebuffer(K.FRAMEBUFFER,Ke);const qe=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await _M(K,qe,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,Te),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,Ot),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(Te),K.deleteSync(qe),Ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,q=null,ut=0){const nt=Math.pow(2,-ut),it=Math.floor(R.image.width*nt),Ot=Math.floor(R.image.height*nt),Gt=q!==null?q.x:0,Ut=q!==null?q.y:0;dt.setTexture2D(R,0),K.copyTexSubImage2D(K.TEXTURE_2D,ut,0,0,Gt,Ut,it,Ot),T.unbindTexture()},this.copyTextureToTexture=function(R,q,ut=null,nt=null,it=0,Ot=0){let Gt,Ut,Bt,It,oe,pe,Wt,Te,Ke;const qe=R.isCompressedTexture?R.mipmaps[Ot]:R.image;if(ut!==null)Gt=ut.max.x-ut.min.x,Ut=ut.max.y-ut.min.y,Bt=ut.isBox3?ut.max.z-ut.min.z:1,It=ut.min.x,oe=ut.min.y,pe=ut.isBox3?ut.min.z:0;else{const je=Math.pow(2,-it);Gt=Math.floor(qe.width*je),Ut=Math.floor(qe.height*je),R.isDataArrayTexture?Bt=qe.depth:R.isData3DTexture?Bt=Math.floor(qe.depth*je):Bt=1,It=0,oe=0,pe=0}nt!==null?(Wt=nt.x,Te=nt.y,Ke=nt.z):(Wt=0,Te=0,Ke=0);const fe=wt.convert(q.format),fn=wt.convert(q.type);let Vt;q.isData3DTexture?(dt.setTexture3D(q,0),Vt=K.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(dt.setTexture2DArray(q,0),Vt=K.TEXTURE_2D_ARRAY):(dt.setTexture2D(q,0),Vt=K.TEXTURE_2D),T.activeTexture(K.TEXTURE0),T.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,q.flipY),T.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),T.pixelStorei(K.UNPACK_ALIGNMENT,q.unpackAlignment);const Sn=T.getParameter(K.UNPACK_ROW_LENGTH),he=T.getParameter(K.UNPACK_IMAGE_HEIGHT),Vn=T.getParameter(K.UNPACK_SKIP_PIXELS),oi=T.getParameter(K.UNPACK_SKIP_ROWS),kn=T.getParameter(K.UNPACK_SKIP_IMAGES);T.pixelStorei(K.UNPACK_ROW_LENGTH,qe.width),T.pixelStorei(K.UNPACK_IMAGE_HEIGHT,qe.height),T.pixelStorei(K.UNPACK_SKIP_PIXELS,It),T.pixelStorei(K.UNPACK_SKIP_ROWS,oe),T.pixelStorei(K.UNPACK_SKIP_IMAGES,pe);const La=R.isDataArrayTexture||R.isData3DTexture,Ue=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){const je=lt.get(R),_i=lt.get(q),He=lt.get(je.__renderTarget),Gi=lt.get(_i.__renderTarget);T.bindFramebuffer(K.READ_FRAMEBUFFER,He.__webglFramebuffer),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,Gi.__webglFramebuffer);for(let Ui=0;Ui<Bt;Ui++)La&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,lt.get(R).__webglTexture,it,pe+Ui),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,lt.get(q).__webglTexture,Ot,Ke+Ui)),K.blitFramebuffer(It,oe,Gt,Ut,Wt,Te,Gt,Ut,K.DEPTH_BUFFER_BIT,K.NEAREST);T.bindFramebuffer(K.READ_FRAMEBUFFER,null),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(it!==0||R.isRenderTargetTexture||lt.has(R)){const je=lt.get(R),_i=lt.get(q);T.bindFramebuffer(K.READ_FRAMEBUFFER,X),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,$);for(let He=0;He<Bt;He++)La?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,je.__webglTexture,it,pe+He):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,je.__webglTexture,it),Ue?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,_i.__webglTexture,Ot,Ke+He):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,_i.__webglTexture,Ot),it!==0?K.blitFramebuffer(It,oe,Gt,Ut,Wt,Te,Gt,Ut,K.COLOR_BUFFER_BIT,K.NEAREST):Ue?K.copyTexSubImage3D(Vt,Ot,Wt,Te,Ke+He,It,oe,Gt,Ut):K.copyTexSubImage2D(Vt,Ot,Wt,Te,It,oe,Gt,Ut);T.bindFramebuffer(K.READ_FRAMEBUFFER,null),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else Ue?R.isDataTexture||R.isData3DTexture?K.texSubImage3D(Vt,Ot,Wt,Te,Ke,Gt,Ut,Bt,fe,fn,qe.data):q.isCompressedArrayTexture?K.compressedTexSubImage3D(Vt,Ot,Wt,Te,Ke,Gt,Ut,Bt,fe,qe.data):K.texSubImage3D(Vt,Ot,Wt,Te,Ke,Gt,Ut,Bt,fe,fn,qe):R.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,Ot,Wt,Te,Gt,Ut,fe,fn,qe.data):R.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,Ot,Wt,Te,qe.width,qe.height,fe,qe.data):K.texSubImage2D(K.TEXTURE_2D,Ot,Wt,Te,Gt,Ut,fe,fn,qe);T.pixelStorei(K.UNPACK_ROW_LENGTH,Sn),T.pixelStorei(K.UNPACK_IMAGE_HEIGHT,he),T.pixelStorei(K.UNPACK_SKIP_PIXELS,Vn),T.pixelStorei(K.UNPACK_SKIP_ROWS,oi),T.pixelStorei(K.UNPACK_SKIP_IMAGES,kn),Ot===0&&q.generateMipmaps&&K.generateMipmap(Vt),T.unbindTexture()},this.initRenderTarget=function(R){lt.get(R).__webglFramebuffer===void 0&&dt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?dt.setTextureCube(R,0):R.isData3DTexture?dt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?dt.setTexture2DArray(R,0):dt.setTexture2D(R,0),T.unbindTexture()},this.resetState=function(){B=0,W=0,ot=null,T.reset(),zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Ee._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ee._getUnpackColorSpace()}}const O3={follow:.09,settle:.45},S_=2.2;function P3(r,t,i){const a=l=>Number.isFinite(l)?l:0;return{yaw:i.yaw*Math.tanh(a(r)*S_),pitch:-i.pitch*Math.tanh(a(t)*S_)}}function y_(r,t,i,a,l){const c=2/a,f=c*l,d=1/(1+f+.48*f*f+.235*f*f*f),m=r-t,p=(i+c*m)*l,g=t+(m+p)*d;return t-r>0==g>t?[t,0]:[g,(i-c*p)*d]}class z3{constructor(t,i=O3){this.limit=t,this.feel=i,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(t,i){const a=P3(t,i,this.limit);this.targetYaw=a.yaw,this.targetPitch=a.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(t){if(!(t>0))return;const i=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=y_(this.yaw,this.targetYaw,this.yawVelocity,i,t),[this.pitch,this.pitchVelocity]=y_(this.pitch,this.targetPitch,this.pitchVelocity,i,t)}}const hu=`
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
`,M_=`
  varying vec3 vDirection;
  void main() {
    vDirection = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,B3=`
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
`,I3=`
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
`,du="normalize(vec3(-.78, .40, .28))",E_=`
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
`,F3=`
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
`,H3=`
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
`,G3=`
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  void main() {
    vPosition = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,V3=`
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
`,k3=`
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
`,X3=`
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
`;function W3(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function q3(){const r=new os;r.name="cosmic-sky";const t=[],i=[],a={value:0};function l(C){return t.push(C),C}function c(C){return i.push(C),C}const f=new tn(l(new Br(230,48,32)),c(new _n({uniforms:{uTime:a},vertexShader:M_,fragmentShader:B3,side:Hn,depthWrite:!1})));f.name="distant-nebula-shell",f.renderOrder=-100,r.add(f);const d=new tn(l(new Br(205,32,24)),c(new _n({uniforms:{uTime:a},vertexShader:M_,fragmentShader:I3,side:Hn,transparent:!0,depthWrite:!1,blending:Fr})));d.name="near-nebula-filaments",d.renderOrder=-90,r.add(d);const m=W3(482092),p=2600,g=new Float32Array(p*3),_=new Float32Array(p),v=new Float32Array(p),x=new Float32Array(p*3);for(let C=0;C<p;C+=1){const F=m()*2-1,k=m()*Math.PI*2,G=Math.sqrt(1-F*F),J=175+m()*20;g.set([G*Math.cos(k)*J,F*J,G*Math.sin(k)*J],C*3);const X=m();_[C]=X>.984?3.7:.75+Math.pow(X,3)*1.85,v[C]=m()*Math.PI*2;const $=m(),B=.35+X*.65;x.set([($>.82?1:.66+$*.25)*B,(.76+$*.14)*B,($>.82?.68:1)*B],C*3)}const E=l(new xn);E.setAttribute("position",new ii(g,3)),E.setAttribute("aSize",new ii(_,1)),E.setAttribute("aPhase",new ii(v,1)),E.setAttribute("aColor",new ii(x,3));const w=new tx(E,c(new _n({uniforms:{uTime:a},vertexShader:k3,fragmentShader:X3,transparent:!0,depthWrite:!1,blending:Fr})));w.name="fine-distant-stars",w.renderOrder=-70,r.add(w);const M=new H(19,24,-78),S=l(new Br(16.8,96,64)),L=new tn(S,c(new _n({uniforms:{uTime:a,uCompanion:{value:0}},vertexShader:qc,fragmentShader:E_})));L.name="aurelia-gas-giant",L.position.copy(M),L.rotation.set(.16,-.4,-.27),r.add(L);const P=new tn(S,c(new _n({vertexShader:qc,fragmentShader:F3,transparent:!0,depthWrite:!1})));P.name="aurelia-high-cloud-deck",P.position.copy(M),P.rotation.copy(L.rotation),P.scale.setScalar(1.0035),P.renderOrder=-45,r.add(P);const A=new tn(S,c(new _n({vertexShader:qc,fragmentShader:H3,transparent:!0,depthWrite:!1,blending:Fr})));A.name="aurelia-thin-atmosphere",A.position.copy(M),A.scale.setScalar(1.013),A.renderOrder=-40,r.add(A);const O=M.clone(),N=new tn(l(new vp(20.3,30.6,192,1)),c(new _n({uniforms:{uPlanetPosition:{value:O}},vertexShader:G3,fragmentShader:V3,transparent:!0,side:Ii,depthWrite:!1})));N.name="aurelia-dust-rings",N.position.copy(M),N.rotation.set(1.48,.4,0),N.renderOrder=-35,r.add(N);const D=new tn(l(new Br(4.1,48,32)),c(new _n({uniforms:{uTime:a,uCompanion:{value:1}},vertexShader:qc,fragmentShader:E_})));D.name="distant-companion-moon",D.position.set(-34,20,-113),D.rotation.set(.4,.3,.1),r.add(D);let b=!1;return{group:r,update(C){b||(a.value=C,L.rotation.y=-.4+C*32e-5,P.rotation.y=-.4+C*54e-5,L.getWorldPosition(O))},getShadowState(){const C=L.getWorldPosition(new H);return{planetWorldCenter:C.toArray(),uniformWorldCenter:O.toArray(),centerError:C.distanceTo(O)}},dispose(){if(!b){b=!0;for(const C of t)C.dispose();for(const C of i)C.dispose();r.clear()}}}}class pu extends tn{constructor(t,i={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,l=i.color!==void 0?new ee(i.color):new ee(8355711),c=i.textureWidth||512,f=i.textureHeight||512,d=i.clipBias||0,m=i.shader||pu.ReflectorShader,p=i.multisample!==void 0?i.multisample:4,g=new Ma,_=new H,v=new H,x=new H,E=new Ie,w=new H(0,0,-1),M=new Ze,S=new H,L=new H,P=new Ze,A=new Ie,O=new Di(c,f,{samples:p,type:si}),N=new _n({name:m.name!==void 0?m.name:"unspecified",uniforms:rx.clone(m.uniforms),fragmentShader:m.fragmentShader,vertexShader:m.vertexShader});N.uniforms.tDiffuse.value=O.texture,N.uniforms.color.value=l,N.uniforms.textureMatrix.value=A,this.material=N,this.onBeforeRender=function(D,b,C){const F=this.getReflectionCamera(C);if(v.setFromMatrixPosition(a.matrixWorld),x.setFromMatrixPosition(C.matrixWorld),E.extractRotation(a.matrixWorld),_.set(0,0,1),_.applyMatrix4(E),S.subVectors(v,x),S.dot(_)>0===!0&&this.forceUpdate===!1)return;S.reflect(_).negate(),S.add(v),E.extractRotation(C.matrixWorld),w.set(0,0,-1),w.applyMatrix4(E),w.add(x),L.subVectors(v,w),L.reflect(_).negate(),L.add(v),F.position.copy(S),F.up.set(0,1,0),F.up.applyMatrix4(E),F.up.reflect(_),F.lookAt(L),F.far=C.far,F.updateMatrixWorld(),F.projectionMatrix.copy(C.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(F.projectionMatrix),A.multiply(F.matrixWorldInverse),A.multiply(a.matrixWorld),g.setFromNormalAndCoplanarPoint(_,v),g.applyMatrix4(F.matrixWorldInverse),M.set(g.normal.x,g.normal.y,g.normal.z,g.constant);const G=F.projectionMatrix;F.isOrthographicCamera?(P.x=(Math.sign(M.x)+G.elements[8])/G.elements[0],P.y=(Math.sign(M.y)+G.elements[9])/G.elements[5],P.z=-C.far,P.w=1):(P.x=(Math.sign(M.x)+G.elements[8])/G.elements[0],P.y=(Math.sign(M.y)+G.elements[9])/G.elements[5],P.z=-1,P.w=(1+G.elements[10])/G.elements[14]),M.multiplyScalar(2/M.dot(P)),G.elements[2]=M.x,G.elements[6]=M.y,F.isOrthographicCamera?(G.elements[10]=M.z-d,G.elements[14]=M.w-1):(G.elements[10]=M.z+1-d,G.elements[14]=M.w),a.visible=!1;const J=D.getRenderTarget(),X=D.xr.enabled,$=D.shadowMap.autoUpdate;D.xr.enabled=!1,D.shadowMap.autoUpdate=!1,D.setRenderTarget(O),D.state.buffers.depth.setMask(!0),D.autoClear===!1&&D.clear(),D.render(b,F),D.xr.enabled=X,D.shadowMap.autoUpdate=$,D.setRenderTarget(J);const B=C.viewport;B!==void 0&&D.state.viewport(B),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return O},this.dispose=function(){O.dispose(),a.material.dispose()},this.getReflectionCamera=function(D){let b=this._reflectionCameras.get(D);return b===void 0&&(b=D.clone(),this._reflectionCameras.set(D,b)),b}}}pu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function Y3(r,t=!1){const i=r[0].index!==null,a=new Set(Object.keys(r[0].attributes)),l=new Set(Object.keys(r[0].morphAttributes)),c={},f={},d=r[0].morphTargetsRelative,m=new xn;let p=0;for(let g=0;g<r.length;++g){const _=r[g];let v=0;if(i!==(_.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in _.attributes){if(!a.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;c[x]===void 0&&(c[x]=[]),c[x].push(_.attributes[x]),v++}if(v!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". Make sure all geometries have the same number of attributes."),null;if(d!==_.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in _.morphAttributes){if(!l.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+".  .morphAttributes must be consistent throughout all geometries."),null;f[x]===void 0&&(f[x]=[]),f[x].push(_.morphAttributes[x])}if(t){let x;if(i)x=_.index.count;else if(_.attributes.position!==void 0)x=_.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". The geometry must have either an index or a position attribute"),null;m.addGroup(p,x,g),p+=x}}if(i){let g=0;const _=[];for(let v=0;v<r.length;++v){const x=r[v].index;for(let E=0;E<x.count;++E)_.push(x.getX(E)+g);g+=r[v].attributes.position.count}m.setIndex(_)}for(const g in c){const _=b_(c[g]);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" attribute."),null;m.setAttribute(g,_)}for(const g in f){const _=f[g][0].length;if(_!==0){m.morphAttributes=m.morphAttributes||{},m.morphAttributes[g]=[];for(let v=0;v<_;++v){const x=[];for(let w=0;w<f[g].length;++w)x.push(f[g][w][v]);const E=b_(x);if(!E)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" morphAttribute."),null;m.morphAttributes[g].push(E)}}}return m}function b_(r){let t,i,a,l=-1,c=0;for(let p=0;p<r.length;++p){const g=r[p];if(t===void 0&&(t=g.array.constructor),t!==g.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(i===void 0&&(i=g.itemSize),i!==g.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(a===void 0&&(a=g.normalized),a!==g.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(l===-1&&(l=g.gpuType),l!==g.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;c+=g.count*i}const f=new t(c),d=new ii(f,i,a);let m=0;for(let p=0;p<r.length;++p){const g=r[p];if(g.isInterleavedBufferAttribute){const _=m/i;for(let v=0,x=g.count;v<x;v++)for(let E=0;E<i;E++){const w=g.getComponent(v,E);d.setComponent(v+_,E,w)}}else f.set(g.array,m);m+=g.count*i}return l!==void 0&&(d.gpuType=l),d}function Z3(r,t=1e-4){t=Math.max(t,Number.EPSILON);const i={},a=r.getIndex(),l=r.getAttribute("position"),c=a?a.count:l.count;let f=0;const d=Object.keys(r.attributes),m={},p={},g=[],_=["getX","getY","getZ","getW"],v=["setX","setY","setZ","setW"];for(let L=0,P=d.length;L<P;L++){const A=d[L],O=r.attributes[A];m[A]=new O.constructor(new O.array.constructor(O.count*O.itemSize),O.itemSize,O.normalized);const N=r.morphAttributes[A];N&&(p[A]||(p[A]=[]),N.forEach((D,b)=>{const C=new D.array.constructor(D.count*D.itemSize);p[A][b]=new D.constructor(C,D.itemSize,D.normalized)}))}const x=t*.5,E=Math.log10(1/t),w=Math.pow(10,E),M=x*w;for(let L=0;L<c;L++){const P=a?a.getX(L):L;let A="";for(let O=0,N=d.length;O<N;O++){const D=d[O],b=r.getAttribute(D),C=b.itemSize;for(let F=0;F<C;F++)A+=`${Math.trunc(b[_[F]](P)*w+M)},`}if(A in i)g.push(i[A]);else{for(let O=0,N=d.length;O<N;O++){const D=d[O],b=r.getAttribute(D),C=r.morphAttributes[D],F=b.itemSize,k=m[D],G=p[D];for(let J=0;J<F;J++){const X=_[J],$=v[J];if(k[$](f,b[X](P)),C)for(let B=0,W=C.length;B<W;B++)G[B][$](f,C[B][X](P))}}i[A]=f,g.push(f),f++}}const S=r.clone();for(const L in r.attributes){const P=m[L];if(S.setAttribute(L,new P.constructor(P.array.slice(0,f*P.itemSize),P.itemSize,P.normalized)),L in p)for(let A=0;A<p[L].length;A++){const O=p[L][A];S.morphAttributes[L][A]=new O.constructor(O.array.slice(0,f*O.itemSize),O.itemSize,O.normalized)}}return S.setIndex(g),S}const En=new H(0,1,0),ai=Math.PI*2;function K3(r){let t=r|0;return()=>{t+=1831565813;let i=Math.imul(t^t>>>15,t|1);return i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296}}function Wr(r,t=!1){return new ee().setHSL(.345+r()*.065,.53+r()*.18,(t?.19:.1)+r()*.085)}class Vr{constructor(){this.positions=[],this.colors=[],this.uvs=[],this.leafData=[],this.indices=[]}vertex(t,i,a,l,c,f,d){const m=this.positions.length/3;return this.positions.push(t.x,t.y,t.z),this.colors.push(l.r,l.g,l.b),this.uvs.push(i,a),this.leafData.push(c,f,d,0),m}append(t,i){const a=this.positions.length/3,l=new H;for(let c=0;c<t.positions.length;c+=3)l.fromArray(t.positions,c).applyMatrix4(i),this.positions.push(l.x,l.y,l.z);for(const c of t.colors)this.colors.push(c);for(const c of t.uvs)this.uvs.push(c);for(const c of t.leafData)this.leafData.push(c);for(const c of t.indices)this.indices.push(c+a)}geometry(){var i;const t=new xn;return t.setAttribute("position",new Re(this.positions,3)),t.setAttribute("color",new Re(this.colors,3)),t.setAttribute("uv",new Re(this.uvs,2)),t.setAttribute("aBotany",new Re(this.leafData,4)),t.setIndex(this.indices),t.computeVertexNormals(),t.computeBoundingBox(),t.computeBoundingSphere(),(i=t.boundingBox)==null||i.expandByScalar(.06),t.boundingSphere&&(t.boundingSphere.radius+=.06),t}}function us(r,t){const i=t.family??0,a=i===1||i===2?10:i===3?12:18,l=i===2?2:i===1?4:6,c=t.direction.clone().normalize(),f=new H().crossVectors(c,t.surfaceNormal??En);f.lengthSq()<1e-4&&f.set(1,0,0),f.normalize();const d=new H().crossVectors(f,c).normalize();t.roll&&(f.applyAxisAngle(c,t.roll),d.applyAxisAngle(c,t.roll));const m=r.positions.length/3,p=new H;for(let g=0;g<=a;g++){const _=g/a;let v=Math.max(.004,Math.pow(Math.sin(Math.PI*_),i===0?.58:i===3?.65:.72));i===2&&(v=Math.max(.004,(.83+.17*Math.sin(Math.PI*_))*Math.pow(1-_,.72))),i===1&&(v*=1+Math.sin(_*Math.PI*15)*.055);const x=(t.arch??.12)*Math.sin(_*Math.PI)+(t.droop??-.09)*_*_;for(let E=0;E<=l;E++){const w=E/l*2-1,M=1+w*.07*Math.sin(_*Math.PI+t.phase),S=(t.cup??-.055)*Math.pow(Math.abs(w),1.45)*Math.sin(Math.PI*_),L=(t.twist??.035)*w*Math.sin(Math.PI*_)*_;p.copy(t.root).addScaledVector(c,t.length*_).addScaledVector(f,w*t.width*.5*v*M).addScaledVector(d,t.length*(x+S+L));const P=Math.max(0,t.root.y)*.2+_*_*.72;r.vertex(p,(w+1)*.5,_,t.color,t.phase,i,P)}}for(let g=0;g<a;g++)for(let _=0;_<l;_++){const v=m+g*(l+1)+_,x=v+l+1;r.indices.push(v,v+1,x,v+1,x+1,x)}}function Fs(r,t,i,a,l=0,c=12){const f=new ul(t),d=f.computeFrenetFrames(c,!1),m=5,p=r.positions.length/3,g=new H;for(let _=0;_<=c;_++){const v=_/c,x=f.getPointAt(v),E=i*(1-.68*v);for(let w=0;w<=m;w++){const M=w/m*ai;g.copy(x).addScaledVector(d.normals[_],Math.cos(M)*E).addScaledVector(d.binormals[_],Math.sin(M)*E),r.vertex(g,w/m,v,a,l,4,Math.max(0,g.y)*.2)}}for(let _=0;_<c;_++)for(let v=0;v<m;v++){const x=p+_*(m+1)+v,E=x+m+1;r.indices.push(x,x+1,E,x+1,E+1,E)}}function T_(r,t,i,a,l){const d=r.positions.length/3;for(let m=0;m<=5;m++){const p=m/5*Math.PI;for(let g=0;g<=8;g++){const _=g/8*ai,v=new H(t.x+Math.cos(_)*Math.sin(p)*i,t.y+Math.cos(p)*i*.68,t.z+Math.sin(_)*Math.sin(p)*i);r.vertex(v,g/8,m/5,a,l,4,t.y*.2)}}for(let m=0;m<5;m++)for(let p=0;p<8;p++){const g=d+m*9+p,_=g+8+1;r.indices.push(g,g+1,_,g+1,_+1,_)}}function Q3(r,t,i){const a=new ee("#355937"),l=i()*ai;for(let c=0;c<3;c++){const f=l+c*2.39996,d=new H(Math.sin(f),0,Math.cos(f)),m=[.94,.72,.57][c],p=d.clone().multiplyScalar(.1+c*.025),g=d.clone().multiplyScalar(.07+c*.027),_=p.clone().add(g).addScaledVector(En,m),v=i()*ai;Fs(t,[p,p.clone().addScaledVector(En,m*.43),_],.013,a,v);for(let x=0;x<8;x++){const E=.13+x*.113,w=l+x*2.39996+c*1.73,M=new H(Math.sin(w),0,Math.cos(w)),S=p.clone().addScaledVector(En,m*E).addScaledVector(g,E),L=.055+(1-E)*.075,P=S.clone().addScaledVector(M,L).addScaledVector(En,.065+E*.035);Fs(t,[S,S.clone().lerp(P,.6).addScaledVector(En,.018),P],.0045,a,v,5);const A=(.51+i()*.12)*(1-x*.042)*(c===2?.86:1);us(r,{root:P,direction:M.clone().addScaledVector(En,.28+x*.073),length:A,width:A*(.6+i()*.16),color:Wr(i,x>5),phase:v,arch:.11+i()*.08,droop:-.16-i()*.15,cup:-.075-i()*.025,twist:(i()-.5)*.19,roll:(i()-.5)*.34})}}for(let c=0;c<6;c++){const f=l+c*2.39996,d=new H(Math.sin(f),0,Math.cos(f)),m=d.clone().multiplyScalar(.035),p=d.clone().multiplyScalar(.13).addScaledVector(En,.16+i()*.085),g=i()*ai;Fs(t,[m,m.clone().lerp(p,.55).addScaledVector(En,.02),p],.006,a,g,8);const _=.56+i()*.1;us(r,{root:p,direction:d.clone().addScaledVector(En,.32+i()*.2),length:_,width:_*(.65+i()*.09),color:Wr(i),phase:g,arch:.14,droop:-.31,cup:-.085,twist:(i()-.5)*.18,roll:(i()-.5)*.27})}}function J3(r,t,i){const a=new ee("#3b6035"),l=i()*ai;for(let c=0;c<11;c++){const f=l+c*2.39996+i()*.18,d=new H(Math.sin(f),0,Math.cos(f)),m=new H(Math.cos(f),0,-Math.sin(f)),p=.7+i()*.32,g=c<3,_=g?.69:1.01,v=g?1:.72+i()*.14,x=i()*ai,w=[d.clone().multiplyScalar(.015+i()*.045),d.clone().multiplyScalar(.12*p).addScaledVector(En,.27*p),d.clone().multiplyScalar(_*.53*p).addScaledVector(En,v*p),d.clone().multiplyScalar(_*p).addScaledVector(En,(g?.91:.41+i()*.2)*p)],M=new ul(w);Fs(t,w,.0065,a,x,20);for(let S=0;S<14;S++){const L=.15+S*.0615,P=Math.pow(Math.sin(Math.PI*(.18+S/14*.8)),.73);for(const A of[-1,1]){const O=A===1?.011:0,N=M.getPoint(Math.min(.985,L+O)),D=M.getTangent(L).normalize(),b=new H().crossVectors(m,D).normalize();b.y<0&&b.negate();const C=(.285+i()*.045)*P*p;us(r,{root:N,direction:m.clone().multiplyScalar(A).addScaledVector(D,.29+S*.013).addScaledVector(En,.045),length:C,width:C*(.36+i()*.09),color:Wr(i,g&&S>10),phase:x,family:1,arch:.08,droop:-.09,cup:-.036,twist:A*.035,roll:A*(.035+i()*.1),surfaceNormal:b})}}us(r,{root:M.getPoint(.93),direction:M.getTangent(.96),length:.12*p,width:.038*p,color:Wr(i,!0),phase:x,family:1})}}function j3(r,t,i){for(let a=0;a<38;a++){const l=i()*ai,c=Math.sqrt(i())*.15,f=new H(Math.sin(l),0,Math.cos(l)),d=f.clone().multiplyScalar(c),m=.4+i()*.47;us(r,{root:d,direction:f.clone().multiplyScalar(.08+i()*.27).addScaledVector(En,1),length:m,width:.012+i()*.026,color:Wr(i,a%6===0),phase:i()*ai,family:2,arch:-.06,droop:-.22-i()*.23,cup:-.024,twist:(i()-.5)*.08,roll:(i()-.5)*.7})}for(let a=0;a<4;a++){const l=i()*ai,c=new H(Math.sin(l)*.15,.6+i()*.28,Math.cos(l)*.15);Fs(t,[new H,c.clone().multiplyScalar(.55).add(new H(0,.045,0)),c],.0018,new ee("#787b42"),l);for(let f=0;f<5;f++){const d=c.clone().addScaledVector(En,-f*.025);us(r,{root:d,direction:new H(Math.sin(l+f*2.4)*.35,1,Math.cos(l+f*2.4)*.35),length:.042,width:.009,color:new ee("#8e9060"),phase:l,family:2,arch:.015,droop:0})}}}function $3(r,t,i,a){const l=new ee("#527f55"),c=new ee("#dbbe69"),f=a()*ai;for(let d=0;d<5;d++){const m=f+d*2.4,p=new H(Math.sin(m),0,Math.cos(m)),g=p.clone().multiplyScalar(.055+a()*.08),_=.58+a()*.44,v=g.clone().addScaledVector(p,.06+a()*.1).addScaledVector(En,_),x=a()*ai,E=[g,g.clone().lerp(v,.5).addScaledVector(p,-.035),v],w=new ul(E);Fs(t,E,.0045,l,x,16);for(let M=0;M<3;M++){const S=m+M*2.2,L=new H(Math.sin(S),.45,Math.cos(S));us(r,{root:w.getPoint(.22+M*.19),direction:L,length:.22-M*.025,width:.055,color:Wr(a,M===2),phase:x,arch:.09,droop:-.12,twist:.055})}for(let M=0;M<6;M++){const S=m+M/6*ai,L=new H(Math.sin(S),.1+a()*.08,Math.cos(S)),P=new ee().setHSL(.73+a()*.035,.14+a()*.12,.71+a()*.14);us(r,{root:v.clone().addScaledVector(L,.004),direction:L,length:.105+a()*.025,width:.073+a()*.012,color:P,phase:x,family:3,arch:.13,droop:.05,cup:.075,twist:(a()-.5)*.06})}T_(i,v.clone().addScaledVector(En,.012),.022,c,x);for(let M=0;M<7;M++){const S=M/7*ai+m,L=v.clone().add(new H(Math.sin(S)*.023,.035+a()*.016,Math.cos(S)*.023));Fs(t,[v,L.clone().lerp(v,.4),L],.0011,c,x,3),T_(i,L,.0045,c,x)}}}function t2(r,t){const i=new Vr,a=new Vr,l=new Vr,c=K3(t);return r==="fern"?J3(i,a,c):r==="grass"?j3(i,a,c):r==="blossom"?$3(i,a,l,c):Q3(i,a,c),[i,a,l]}const e2=`
  attribute vec4 aBotany;
  uniform float uBotanyTime;
  uniform vec4 uBotanyPulse;
  varying vec2 vBotanyUv;
  varying vec4 vBotanyData;
  varying float vBotanyTouch;
`,n2=`
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
`,i2=`
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
`;function a2(r,t){const i=new R1({color:16777215,vertexColors:!0,roughness:t==="leaf"?.66:.78,metalness:0,specularIntensity:t==="leaf"?.3:.45,side:t==="leaf"?Ii:ls});return i.name=`Cosmic garden ${t}`,i.onBeforeCompile=a=>{Object.assign(a.uniforms,r),a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
${e2}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${n2}`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
${i2}`),t==="leaf"&&(a.fragmentShader=a.fragmentShader.replace("#include <color_fragment>",`
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
      `))},i.customProgramCacheKey=()=>`cosmic-botany-v2-${t}`,i}function s2(r,t){const i=new os;i.name=t,i.userData.botanical=!0;const a=[new Vr,new Vr,new Vr];for(const g of r){const _=t2(g.kind,g.seed),v=g.scale??1,x=new Ie().compose(new H(g.x??0,0,g.z??0),new fs().setFromAxisAngle(En,g.rotation??0),new H(v,v,v));_.forEach((E,w)=>a[w].append(E,x))}const l={uBotanyTime:{value:0},uBotanyPulse:{value:new Ze(0,0,0,-1)}},c=[],f=[],d=[],m=["leaf","stem","pollen"];a.forEach((g,_)=>{if(!g.indices.length)return;const v=g.geometry(),x=a2(l,m[_]),E=new tn(v,x);E.name=`${t} ${m[_]}`,E.userData.botanical=!0,E.userData.plantKind=r.length===1?r[0].kind:"garden",E.userData.label=t,E.receiveShadow=!0,E.castShadow=!1,i.add(E),c.push(x),f.push(v),_===0&&d.push(E)});let p=!1;return{group:i,interactables:d,update(g,_){p||(l.uBotanyTime.value=Number.isFinite(g)?g:0,_&&_.age>=0&&_.age<7?l.uBotanyPulse.value.set(_.position.x,_.position.y,_.position.z,_.age):l.uBotanyPulse.value.w=-1)},dispose(){p||(p=!0,f.forEach(g=>g.dispose()),c.forEach(g=>g.dispose()),i.clear(),d.length=0)}}}function r2(r,t=1){return s2([{kind:r,seed:t}],{fern:"Jade fern",broadleaf:"Verdant leaves",grass:"Silvergrass",blossom:"Moon blossoms"}[r])}function Sp(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function o2(){const r=document.createElement("canvas");r.width=r.height=512;const t=r.getContext("2d"),i=t.createImageData(512,512),a=Sp(4204),l=(d,m)=>{const p=Math.sin(d*127.1+m*311.7)*43758.5453;return p-Math.floor(p)},c=(d,m)=>{const p=Math.floor(d),g=Math.floor(m),_=d-p,v=m-g,x=_*_*(3-2*_),E=v*v*(3-2*v);return Ch.lerp(Ch.lerp(l(p,g),l(p+1,g),x),Ch.lerp(l(p,g+1),l(p+1,g+1),x),E)};for(let d=0;d<512;d++)for(let m=0;m<512;m++){const p=c(m*.012,d*.012)*.55+c(m*.037,d*.037)*.28+c(m*.115,d*.115)*.17,g=Math.pow(a(),15)*22,_=(a()-.5)*17,v=142+p*72+_-g,x=(d*512+m)*4;i.data[x]=v*.97,i.data[x+1]=v,i.data[x+2]=v*.99,i.data[x+3]=255}t.putImageData(i,0,0),t.strokeStyle="rgba(63,68,65,.19)",t.lineWidth=.65;for(let d=0;d<72;d++){let m=a()*512,p=a()*512;t.beginPath(),t.moveTo(m,p);for(let g=0;g<5;g++)m+=a()*30-10,p+=a()*35,t.lineTo(m,p);t.stroke()}const f=new r1(r);return f.colorSpace=ni,f.wrapS=f.wrapT=$c,f.repeat.set(2,2),f.anisotropy=8,f}function l2(r,t=6){const i=new gp(1,t);i.deleteAttribute("normal");const a=Z3(i,1e-4);i.dispose();const l=a.attributes.position;for(let c=0;c<l.count;c++){const f=l.getX(c),d=l.getY(c),m=l.getZ(c),p=1+Math.sin(f*6.9+r)*.07+Math.sin(m*8.3+d*5.7+r)*.06+Math.sin(f*19.1+m*13.6)*.018;l.setXYZ(c,f*p,d*p,m*p)}return a.computeVertexNormals(),a}function c2(r){const t=[],i=[],a=[];for(let d=0;d<=14;d++){const m=d/14,p=-.15-m*4,g=3.1*Math.pow(1-m,.52)+.08;for(let _=0;_<=40;_++){const v=_/40*Math.PI*2,x=1+Math.sin(m*38+r)*.08+Math.sin(v*7+r+m*4)*.1+Math.cos(v*11-m*2)*.045,E=g*x;if(t.push(Math.cos(v)*E,p+Math.sin(v*5+r)*.14*(1-m),Math.sin(v)*E*.75),i.push(_/40,d/14),d<14&&_<40){const w=d*41+_,M=w+40+1;a.push(w,w+1,M,M,w+1,M+1)}}}const f=new xn;return f.setAttribute("position",new Re(t,3)),f.setAttribute("uv",new Re(i,2)),f.setIndex(a),f.computeVertexNormals(),f}function u2(){const r=new os;r.name="cosmic-living-terrace";const t=o2(),i=new zs({color:"#bbb8ab",map:t,bumpMap:t,bumpScale:.022,roughness:.82}),a=new zs({color:"#747e7d",map:t,bumpMap:t,bumpScale:.018,roughness:.29,metalness:.12}),l=new zs({color:"#646d78",map:t,bumpMap:t,bumpScale:.033,roughness:.86}),c=new zs({color:"#48674d",map:t,bumpMap:t,bumpScale:.033,roughness:.98}),f=new zs({color:"#c9b88f",roughness:.5,metalness:.35}),d=[i,a,l,c,f],m=[],p=[],g=[],_=[],v=Sp(81102),x=Array.from({length:6},(D,b)=>{const C=l2(31+b);return m.push(C),C}),E=(D,b,C,F=i,k=0)=>{const G=new tn(x[k%6],F);return G.position.set(b[0],b[1],b[2]),G.scale.set(C[0],C[1],C[2]),G.rotation.y=k*.71,G.castShadow=!0,G.receiveShadow=!0,G.userData.cosmicStone=!0,D.add(G),G},w=(D,b,C,F,k,G,J)=>{const X=r2(b,J);return X.group.position.set(C,F,k),X.group.scale.setScalar(G),X.group.rotation.y=J*.79,D.add(X.group),D===r&&(X.group.userData.nearPosition={x:C,z:k}),p.push(X),g.push(...X.interactables),X};E(r,[0,-1.75,2.6],[8.5,1.25,8.6],l,1),E(r,[0,-.78,3.9],[7.9,.48,5.5],i,3);for(let D=0;D<32;D++){const b=D/32*Math.PI*2,C=1+(v()-.5)*.08;E(r,[Math.cos(b)*3.12*C,-.44+v()*.1,-.85+Math.sin(b)*3.52*C],[.65+v()*.3,.34,.66+v()*.2],D%3===0?a:i,D)}E(r,[0,-.66,-.85],[2.9,.17,3.25],a,2);for(let D=0;D<42;D++){const b=v()*Math.PI*2,C=Math.sqrt(v())*2.5;E(r,[Math.cos(b)*C,-.4,-.85+Math.sin(b)*C*1.1],[.09+v()*.14,.025+v()*.025,.07+v()*.15],a,D)}[["broadleaf",-3.5,-.22,2.5,1.65],["fern",-2.55,-.18,3.9,1.2],["fern",-4,-.25,.1,1.8],["broadleaf",3.55,-.18,1,1.75],["fern",2.6,-.2,3.5,1.35],["grass",4.5,-.08,2.8,1.7],["blossom",-2.9,-.05,-2.5,1.15],["blossom",3.3,-.14,-2,1.25],["fern",-4.8,-.2,-2.7,1.5],["broadleaf",4.5,-.18,-3.8,1.35],["grass",-3.3,-.16,-4,1.1],["grass",2.7,-.1,-4.2,1]].forEach(([D,b,C,F,k],G)=>w(r,D,b,C,F,k,120+G)),w(r,"fern",-3.55,-.13,1.3,1.1,192),w(r,"broadleaf",3.3,-.14,3.45,1.5,193),w(r,"fern",4,-.1,-.6,1.5,194),w(r,"grass",-4,-.1,3.25,1,195),E(r,[-3.6,-.14,3.4],[1.6,.48,1.3],i,2),E(r,[3.75,-.28,4.15],[1.3,.34,1.5],i,4);for(let D=0;D<26;D++){const b=v()*Math.PI*2;E(r,[Math.cos(b)*(3.7+v()),-.14,-.85+Math.sin(b)*4.1],[.35+v()*.4,.08+v()*.09,.3+v()*.45],c,D)}const S=(D,b,C,F,k)=>{const G=new os;G.position.set(D,b,C),G.scale.setScalar(F),r.add(G);const J=c2(k);m.push(J);const X=new tn(J,l);X.castShadow=!0,X.receiveShadow=!0,G.add(X);for(let B=0;B<7;B++){const W=B/7*Math.PI*2;E(G,[Math.cos(W)*2.1,-.48,Math.sin(W)*1.5],[1.22,.6,.85],i,k+B)}E(G,[0,-.02,0],[2.88,.12,2.07],c,k+3),w(G,"broadleaf",-.9,.12,-.4,2,k+2),w(G,"fern",-1.35,.06,.3,1.25,k+15),w(G,"broadleaf",.45,.1,.45,1.15,k+18),w(G,"grass",1.85,.08,-.5,1.6,k+17),w(G,"fern",1.2,.13,.1,1.45,k+5),w(G,"grass",-1.8,.04,.3,1.1,k+4),w(G,"blossom",.7,.13,-.8,1.6,k+8);const $=new zs({color:"#6c7261",roughness:.85});d.push($);for(let B=0;B<5;B++){const W=B*1.42+k,ot=Math.cos(W)*2.3,et=Math.sin(W)*1.7,ft=new ul([new H(ot,.08,et),new H(ot*1.03,-.8,et*1.05),new H(ot*.86,-2.1-B*.14,et),new H(ot*.78+.2,-2.9-B*.2,et)]),z=new _p(ft,22,.026,5,!1);m.push(z);const tt=new tn(z,$);G.add(tt),B%2===0&&w(G,"fern",ot*.9,-1.1,et,.36,k+B+40)}return _.push({object:G,x:D,y:b,phase:k}),G};S(-10,2.6,-20,1.45,31).rotation.y=.5,S(9.8,.75,-16,1.15,45),S(-1.6,.55,-36,1,61),S(18,4.4,-43,1.9,76).rotation.z=-.08,S(-18,-1.4,-44,1.45,94),S(5,7.4,-57,.8,112);for(let D=0;D<7;D++)E(r,[-4.9-D*.65,-.35+D*.2,-6-D*1.35],[.88-D*.055,.25,.65],i,3+D);const L=new dp(1,96);m.push(L);const P=new pu(L,{textureWidth:1024,textureHeight:1024,clipBias:.003,multisample:0,shader:{name:"CosmicGardenWater",uniforms:{tDiffuse:{value:null},textureMatrix:{value:new Ie},color:{value:new ee},uTime:{value:0},uPulse:{value:new H},uAge:{value:20}},vertexShader:`uniform mat4 textureMatrix;varying vec4 vReflection;varying vec3 vWorld;varying vec2 vUv;
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
      }`}});P.name="cosmic-reflecting-pool",P.rotation.x=-Math.PI/2,P.position.set(0,-.265,-.85),P.scale.set(2.83,3.18,1),P.material.transparent=!0,P.renderOrder=2,r.add(P),g.push(P);const A=P.material.uniforms,O=[r,..._.map(D=>D.object)];for(const D of O){const b=new Map;for(const C of[...D.children])if(C instanceof tn&&C.userData.cosmicStone){const F=C.material,k=b.get(F)??[];k.push(C),b.set(F,k)}for(const[C,F]of b){const k=F.map(J=>(J.updateMatrix(),J.geometry.clone().applyMatrix4(J.matrix))),G=Y3(k);if(k.forEach(J=>J.dispose()),G){m.push(G);const J=new tn(G,C);J.castShadow=!0,J.receiveShadow=!0,D.add(J),F.forEach(X=>D.remove(X))}}}let N=!1;return{group:r,interactables:g,water:P,update(D,b){N||(p.forEach(C=>C.update(D,b)),_.forEach(({object:C,y:F,phase:k})=>{C.position.y=F+Math.sin(D*.065+k)*.055}),A.uTime.value=D,A.uAge.value=(b==null?void 0:b.age)??20,b&&A.uPulse.value.copy(b.position))},setAspect(D){const b=D<.8;for(const C of p){const F=C.group.userData.nearPosition;F&&(C.group.position.x=F.x*(b?.4:1))}for(const C of _)C.object.position.x=C.x*(b?.58:1)},dispose(){N||(N=!0,p.forEach(D=>D.dispose()),m.forEach(D=>D.dispose()),d.forEach(D=>D.dispose()),t.dispose(),P.dispose(),r.clear())}}}function f2(r){return{float:r.getExtension("EXT_color_buffer_float")!==null,halfFloat:r.getExtension("EXT_color_buffer_half_float")!==null}}function h2(r,t="auto"){return t!=="byte"&&(r.float||r.halfFloat)?si:Yn}function A_(r,t){const i=r.getRenderTarget(),a=r.getActiveCubeFace(),l=r.getActiveMipmapLevel(),c=r.getContext();try{r.setRenderTarget(t,0,0);const f=c.checkFramebufferStatus(c.FRAMEBUFFER),d=f===c.FRAMEBUFFER_COMPLETE?c.getFramebufferAttachmentParameter(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE):null;return{status:f,complete:f===c.FRAMEBUFFER_COMPLETE,componentType:d}}finally{r.setRenderTarget(i,a,l)}}function d2(r,t,i="auto"){const a=f2(r.getContext()),l=[];let c=i==="byte"?"forced-byte-validation":a.float||a.halfFloat?"supported-half-float":"no-color-buffer-extension";const f=m=>{t.texture.type=m,t.texture.format=Ci,t.texture.internalFormat=m===si?"RGBA16F":"RGBA8",t.texture.colorSpace=Ea,t.samples=0};f(h2(a,i));const d=()=>{let m=A_(r,t);if(l.push({format:t.texture.internalFormat,...m}),!m.complete&&t.texture.type===si&&(t.dispose(),f(Yn),c="half-float-framebuffer-incomplete",m=A_(r,t),l.push({format:t.texture.internalFormat,...m})),!m.complete)throw new Error(`Cosmic reflection framebuffer incomplete: 0x${m.status.toString(16)}`)};return d(),{setSize(m){t.width===m&&t.height===m||(t.setSize(m,m),d())},getDiagnostics(){const m=l[l.length-1];return{mode:i,support:{...a},reason:c,format:t.texture.internalFormat,type:t.texture.type,width:t.width,height:t.height,framebufferComplete:m.complete,framebufferStatus:m.status,componentType:m.componentType,attempts:l.map(p=>({...p}))}}}}function p2(){return{quality:1,slowFor:0,fastFor:0,reflectionSize:1024}}function m2(r,t){let{quality:i,slowFor:a,fastFor:l,reflectionSize:c}=r;return t>.034&&t<.5?(a+=t,l=0):t>0&&t<.022&&(l+=t,a=Math.max(0,a-t)),a>8&&i>.8&&(i=.8,a=0,c=768),l>24&&i<1&&(i=1,l=0,c=1024),{quality:i,slowFor:a,fastFor:l,reflectionSize:c}}function g2(r,t,i,a=1){const l=Math.max(1,r*t);return Math.min(Math.max(.5,i),2,Math.sqrt(36e5/l))*a}class R_{constructor(t){this.options=t,this.scene=new KM,this.camera=new vi(52,1,.1,300),this.sky=null,this.garden=null,this.lightSeeds=null,this.seedLocations=[],this.pointUniforms=null,this.pulseLight=new qv("#accfd0",0,4,2),this.pulse=null,this.pulseCount=0,this.lastPulse=-10,this.time=0,this.frame=0,this.running=!1,this.disposed=!1,this.ready=!1,this.raf=0,this.lastFrame=0,this.width=1,this.height=1,this.dpr=1,this.qualityState=p2(),this.reflection=null,this.ray=new P1,this.look=new z3({yaw:.105,pitch:.06},{follow:.7,settle:3.2}),this.originalQuaternion=new fs,this.tick=i=>{var c;if(!this.running||this.disposed)return;const a=this.lastFrame?(i-this.lastFrame)/1e3:0;this.lastFrame=i,this.renderFrame(a);const l=this.qualityState.quality;this.qualityState=m2(this.qualityState,a),this.qualityState.quality!==l&&((c=this.reflection)==null||c.setSize(this.qualityState.reflectionSize),this.setSize(this.width,this.height,this.dpr)),this.raf=requestAnimationFrame(this.tick)},this.renderer=new N3({canvas:t.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=ni,this.renderer.toneMapping=jd,this.renderer.toneMappingExposure=1.12,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=D_,this.renderer.shadowMap.autoUpdate=!1,this.renderer.setClearColor("#101a2b"),this.camera.position.set(0,1.65,5.8),this.camera.lookAt(0,2,-20),this.originalQuaternion.copy(this.camera.quaternion),this.onLost=i=>{i.preventDefault(),this.disposed||this.options.onContextLost()},t.canvas.addEventListener("webglcontextlost",this.onLost),t.canvas.dataset.renderer="three-webgl2"}static isSupported(){return typeof window<"u"&&typeof WebGL2RenderingContext<"u"}async init(){if(this.disposed)return;this.sky=q3(),this.garden=u2(),this.reflection=d2(this.renderer,this.garden.water.getRenderTarget(),this.options.reflectionMode),this.scene.add(this.sky.group,this.garden.group),this.garden.setAspect(this.width/this.height),this.sky.group.rotation.y=this.width/this.height<.8?.18:0;const t=new D1("#b9d6e1","#394147",2.05);this.scene.add(t),this.scene.fog=new up("#344b5b",.009);const i=new Yv("#ffddb0",3.5);i.position.set(-7,12,8),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),i.shadow.camera.left=-14,i.shadow.camera.right=14,i.shadow.camera.top=15,i.shadow.camera.bottom=-14,i.shadow.camera.near=.5,i.shadow.camera.far=60,i.shadow.normalBias=.06,i.shadow.bias=-2e-4,this.scene.add(i);const a=new Yv("#88d9e8",1.8);a.position.set(6,5,-12),this.scene.add(a);const l=new qv("#e7c896",20,10,2);l.position.set(-3,2.8,.3),this.scene.add(l,this.pulseLight),this.buildSeeds(),this.scene.updateMatrixWorld(!0),this.renderer.shadowMap.needsUpdate=!0,await this.renderer.compileAsync(this.scene,this.camera),!this.disposed&&(this.ready=!0,this.renderFrame(0))}buildSeeds(){const t=Sp(312),i=[],a=[],l=[];for(let d=0;d<70;d++){const m=new H((t()-.5)*13,.45+t()*5,2-t()*19);this.seedLocations.push(m),i.push(m.x,m.y,m.z),a.push(t()*Math.PI*2),l.push(13+t()*17)}this.seedLocations[0].set(.65,1.15,-1.2),i.splice(0,3,.65,1.15,-1.2);const c=new xn;c.setAttribute("position",new Re(i,3)),c.setAttribute("aPhase",new Re(a,1)),c.setAttribute("aSize",new Re(l,1)),this.pointUniforms={uTime:{value:0},uDpr:{value:1},uPulse:{value:new H(0,0,0)},uAge:{value:20}};const f=new _n({uniforms:this.pointUniforms,transparent:!0,depthWrite:!1,blending:Fr,vertexShader:`attribute float aPhase;attribute float aSize;uniform float uTime;uniform float uDpr;uniform vec3 uPulse;uniform float uAge;varying float vGlow;
      void main(){vec3 p=position;p.x+=sin(uTime*.07+aPhase)*.1;p.y+=sin(uTime*.11+aPhase)*.065;
      float influence=exp(-distance(p,uPulse)*1.4)*sin(clamp(uAge/8.,0.,1.)*3.14159);
      vGlow=.45+influence*.4;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(aSize*uDpr*4./-mv.z,2.,21.*uDpr);gl_Position=projectionMatrix*mv;}`,fragmentShader:`varying float vGlow;void main(){float d=length(gl_PointCoord-.5);float a=(exp(-d*d*40.)*.8+exp(-d*d*9.)*.16)*(1.-smoothstep(.3,.5,d));gl_FragColor=vec4(vec3(.61,.85,.82),a*vGlow);#include <tonemapping_fragment>
#include <colorspace_fragment>}`.replace(";#include",`;
#include`)});this.lightSeeds=new tx(c,f),this.lightSeeds.name="cosmic-near-light-seeds",this.scene.add(this.lightSeeds)}setSize(t,i,a){var l;this.disposed||(this.width=Math.max(1,t),this.height=Math.max(1,i),this.dpr=a,this.renderer.setPixelRatio(g2(this.width,this.height,a,this.qualityState.quality)),this.renderer.setSize(this.width,this.height,!1),this.camera.aspect=this.width/this.height,(l=this.garden)==null||l.setAspect(this.camera.aspect),this.sky&&(this.sky.group.rotation.y=this.camera.aspect<.8?.18:0),this.renderer.shadowMap.needsUpdate=!0,this.camera.fov=this.camera.aspect<.8?63:52,this.camera.position.set(0,1.65,5.8),this.camera.lookAt(this.camera.aspect<.8?1:0,this.camera.aspect<.8?3.4:2,-20),this.originalQuaternion.copy(this.camera.quaternion),this.camera.updateProjectionMatrix(),this.pointUniforms&&(this.pointUniforms.uDpr.value=this.renderer.getPixelRatio()),this.options.canvas.dataset.dpr=this.renderer.getPixelRatio().toFixed(3))}renderFrame(t){var f,d,m,p,g;if(this.disposed||!this.ready)return;const i=Math.min(Math.max(t,0),.05);this.time+=i,this.frame++,this.look.update(i),this.camera.quaternion.copy(this.originalQuaternion),this.camera.rotateY(this.look.yaw),this.camera.rotateX(this.look.pitch),this.pulse&&(this.pulse.age+=i);const a=this.pulse?Math.sin(Math.min(1,this.pulse.age/8)*Math.PI):0;this.pulseLight.intensity=a*.5,this.pulse&&this.pulse.age>=8&&(this.pulse=null),(f=this.sky)==null||f.update(this.time),(d=this.garden)==null||d.update(this.time,this.pulse),this.pointUniforms&&(this.pointUniforms.uTime.value=this.time,this.pointUniforms.uAge.value=((m=this.pulse)==null?void 0:m.age)??20,this.pulse&&this.pointUniforms.uPulse.value.copy(this.pulse.position)),this.renderer.render(this.scene,this.camera);const l=this.options.canvas.dataset;l.frame=String(this.frame),l.time=this.time.toFixed(4),l.yaw=this.look.yaw.toFixed(5),l.pitch=this.look.pitch.toFixed(5),l.pulses=String(this.pulseCount),l.drawCalls=String(this.renderer.info.render.calls),l.triangles=String(this.renderer.info.render.triangles),l.ringShadowError=String(((p=this.sky)==null?void 0:p.getShadowState().centerError)??-1);const c=(g=this.reflection)==null?void 0:g.getDiagnostics();l.reflectionFormat=(c==null?void 0:c.format)??"uninitialized",l.reflectionComplete=String((c==null?void 0:c.framebufferComplete)??!1),l.reflectionSize=String((c==null?void 0:c.width)??0),l.quality=String(this.qualityState.quality)}start(){this.running||this.disposed||!this.ready||(this.running=!0,this.lastFrame=0,this.options.canvas.dataset.running="true",this.raf=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.raf),this.raf=0,this.lastFrame=0,this.look.release(),this.options.canvas.dataset.running="false"}drag(t,i){this.running&&this.look.drag(t,i)}releaseDrag(){this.look.release()}getDiagnostics(){var t,i;return{reflection:((t=this.reflection)==null?void 0:t.getDiagnostics())??null,shadow:((i=this.sky)==null?void 0:i.getShadowState())??null,quality:{...this.qualityState}}}touch(t,i){if(!this.running||!this.garden||this.time-this.lastPulse<1.2)return null;this.ray.setFromCamera(new Qt(t,i),this.camera);const a=this.ray.intersectObjects(this.garden.interactables,!1).find(c=>c.distance<18);if(a)return this.emitPulse(a.point,a.object===this.garden.water?"water":"plant");const l=this.seedLocations.find(c=>this.ray.ray.distanceToPoint(c)<.4&&this.ray.ray.direction.dot(c.clone().sub(this.camera.position))>0);return l?this.emitPulse(l,"light"):null}touchNearest(){return this.running?this.emitPulse(this.seedLocations[0],"light"):null}soundEvent(){this.running&&this.time-this.lastPulse>12&&this.emitPulse(this.seedLocations[0],"light")}emitPulse(t,i){return this.time-this.lastPulse<1.2?null:(this.lastPulse=this.time,this.pulse={position:t.clone(),age:0},this.pulseCount++,this.pulseLight.position.copy(t).add(new H(0,.2,0)),{kind:i,position:[t.x,t.y,t.z],strength:.35})}dispose(){var t,i;this.disposed||(this.stop(),this.disposed=!0,this.ready=!1,this.options.canvas.removeEventListener("webglcontextlost",this.onLost),(t=this.garden)==null||t.dispose(),(i=this.sky)==null||i.dispose(),this.garden=null,this.sky=null,this.reflection=null,this.lightSeeds&&(this.lightSeeds.geometry.dispose(),this.lightSeeds.material.dispose(),this.lightSeeds=null),this.scene.traverse(a=>{var l;a instanceof cu&&"shadow"in a&&((l=a.shadow)==null||l.dispose())}),this.scene.clear(),this.renderer.renderLists.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.options.canvas.dataset.disposed="true")}}class v2 extends zy{constructor(){super({canvasClass:"cosmic-world-canvas",isSupported:()=>R_.isSupported(),create:(t,i)=>new R_({canvas:t,onContextLost:i})})}touch(t,i,a){var l;return this.top===t&&t.running?((l=this.engine)==null?void 0:l.touch(i,a))??null:null}touchNearest(t){var i;return this.top===t&&t.running?((i=this.engine)==null?void 0:i.touchNearest())??null:null}soundEvent(t){var i;this.top===t&&t.running&&((i=this.engine)==null||i.soundEvent())}}const Or=new v2;function w_({active:r,onInteract:t,subscribeEvents:i}){const a=Mn.useRef(null),l=Mn.useRef(null),c=Mn.useRef(null),f=Mn.useRef(t);f.current=t;const[d,m]=Mn.useState("loading"),[p,g]=Mn.useState(!0),_=Oy(r&&p);Mn.useEffect(()=>{const x=a.current;if(!x||typeof IntersectionObserver>"u")return;const E=new IntersectionObserver(w=>g(w.some(M=>M.isIntersecting)),{threshold:0});return E.observe(x),()=>E.disconnect()},[]),Mn.useEffect(()=>{if(!l.current)return;const x={mount:l.current,running:!1,onStatus:m};c.current=x;const E=Or.acquire(x);return()=>{c.current=null,E()}},[]),Mn.useEffect(()=>{c.current&&Or.setRunning(c.current,_)},[_,d]),Py(Or,a,c,_),Mn.useEffect(()=>{const x=a.current;if(!x||!_)return;let E=null;const w=P=>{P.isPrimary&&P.button===0&&P.target instanceof HTMLCanvasElement&&(E={x:P.clientX,y:P.clientY,id:P.pointerId,moved:!1})},M=P=>{E&&P.pointerId===E.id&&Math.hypot(P.clientX-E.x,P.clientY-E.y)>8&&(E.moved=!0)},S=P=>{var D;const A=E;if(!A||A.id!==P.pointerId||(E=null,A.moved||Math.hypot(P.clientX-A.x,P.clientY-A.y)>8||!c.current))return;const O=x.getBoundingClientRect(),N=Or.touch(c.current,(P.clientX-O.left)/O.width*2-1,1-(P.clientY-O.top)/O.height*2);N&&((D=f.current)==null||D.call(f,N))},L=()=>{E=null};return x.addEventListener("pointerdown",w),window.addEventListener("pointermove",M),window.addEventListener("pointerup",S),window.addEventListener("pointercancel",L),()=>{x.removeEventListener("pointerdown",w),window.removeEventListener("pointermove",M),window.removeEventListener("pointerup",S),window.removeEventListener("pointercancel",L)}},[_]),Mn.useEffect(()=>{if(!(!_||!i))return i(x=>{(x==="bowl"||x==="chimes")&&c.current&&Or.soundEvent(c.current)})},[_,i]);const v=()=>{var E;if(!c.current)return;const x=Or.touchNearest(c.current);x&&((E=f.current)==null||E.call(f,x))};return vn.jsxs("div",{ref:a,className:"cosmic-world","data-state":d,"data-motion":_?"running":"paused","aria-label":"우주 공중정원 — 잎과 물, 행성이 있는 고요한 공간",children:[vn.jsx("div",{className:"cosmic-world-fallback","aria-hidden":"true"}),vn.jsx("div",{className:"cosmic-world-mount",ref:l}),d==="ready"&&_?vn.jsx("button",{className:"cosmic-world-access",onPointerDownCapture:x=>x.stopPropagation(),onClick:v,children:"가까운 빛에 손길 보내기"}):null,d==="loading"?vn.jsx("span",{className:"cosmic-world-status",role:"status",children:"공중정원을 준비하고 있어요"}):null,d==="failed"?vn.jsx("span",{className:"cosmic-world-status",role:"status",children:"이 환경에서는 공중정원의 3D 화면을 표시할 수 없어요."}):null]})}const rd=new Set;function _2(){const[r,t]=Mn.useState(!new URLSearchParams(location.search).has("still")),[i,a]=Mn.useState(!0),[l,c]=Mn.useState(!1),[f,d]=Mn.useState(0),m=new URLSearchParams(location.search).has("clean");return vn.jsxs("main",{children:[vn.jsx("section",{className:"garden-stage","data-scene-surface":!0,children:i&&vn.jsx(w_,{active:r,onInteract:()=>d(p=>p+1),subscribeEvents:p=>(rd.add(p),()=>{rd.delete(p)})})}),l&&vn.jsx("section",{className:"garden-second","data-scene-surface":!0,children:vn.jsx(w_,{active:r})}),!m&&vn.jsxs("nav",{"aria-label":"Validation controls",children:[vn.jsx("span",{children:"공중정원 · 우주 명상"}),vn.jsx("button",{onClick:()=>t(p=>!p),children:r?"Pause":"Resume"}),vn.jsx("button",{onClick:()=>{a(p=>!p),c(!1)},children:i?"Unmount":"Mount"}),vn.jsx("button",{onClick:()=>c(p=>!p),children:"Second holder"}),vn.jsx("button",{onClick:()=>rd.forEach(p=>p("bowl")),children:"Bowl event"}),vn.jsx("output",{"data-testid":"interaction-count",children:f})]})]})}const C_=new URLSearchParams(location.search).get("compatibility");C_?yy(async()=>{const{mountCompatibilityHarness:r}=await import("./cosmic-compatibility-Cohr30Z8.mjs");return{mountCompatibilityHarness:r}},[],import.meta.url).then(({mountCompatibilityHarness:r})=>r(document.getElementById("root"),C_==="byte"?"byte":"auto")):Ny.createRoot(document.getElementById("root")).render(vn.jsx(Ay.StrictMode,{children:vn.jsx(_2,{})}));export{R_ as C,Bs as L,Yn as U,N3 as W,fx as a,Di as b,A_ as i,d2 as p};
