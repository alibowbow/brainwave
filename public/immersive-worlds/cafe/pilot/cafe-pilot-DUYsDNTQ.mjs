(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function Yy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Gh={exports:{}},Ko={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wv;function Zy(){if(wv)return Ko;wv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var p in o)p!=="key"&&(c[p]=o[p])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return Ko.Fragment=t,Ko.jsx=n,Ko.jsxs=n,Ko}var Rv;function Ky(){return Rv||(Rv=1,Gh.exports=Zy()),Gh.exports}var fn=Ky(),Vh={exports:{}},me={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cv;function Jy(){if(Cv)return me;Cv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),_=Symbol.iterator;function x(R){return R===null||typeof R!="object"?null:(R=_&&R[_]||R["@@iterator"],typeof R=="function"?R:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},U=Object.assign,M={};function S(R,K,it){this.props=R,this.context=K,this.refs=M,this.updater=it||b}S.prototype.isReactComponent={},S.prototype.setState=function(R,K){if(typeof R!="object"&&typeof R!="function"&&R!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,R,K,"setState")},S.prototype.forceUpdate=function(R){this.updater.enqueueForceUpdate(this,R,"forceUpdate")};function z(){}z.prototype=S.prototype;function H(R,K,it){this.props=R,this.context=K,this.refs=M,this.updater=it||b}var A=H.prototype=new z;A.constructor=H,U(A,S.prototype),A.isPureReactComponent=!0;var O=Array.isArray;function w(){}var L={H:null,A:null,T:null,S:null},y=Object.prototype.hasOwnProperty;function D(R,K,it){var mt=it.ref;return{$$typeof:r,type:R,key:K,ref:mt!==void 0?mt:null,props:it}}function B(R,K){return D(R.type,K,R.props)}function V(R){return typeof R=="object"&&R!==null&&R.$$typeof===r}function q(R){var K={"=":"=0",":":"=2"};return"$"+R.replace(/[=:]/g,function(it){return K[it]})}var Z=/\/+/g;function I(R,K){return typeof R=="object"&&R!==null&&R.key!=null?q(""+R.key):K.toString(36)}function X(R){switch(R.status){case"fulfilled":return R.value;case"rejected":throw R.reason;default:switch(typeof R.status=="string"?R.then(w,w):(R.status="pending",R.then(function(K){R.status==="pending"&&(R.status="fulfilled",R.value=K)},function(K){R.status==="pending"&&(R.status="rejected",R.reason=K)})),R.status){case"fulfilled":return R.value;case"rejected":throw R.reason}}throw R}function P(R,K,it,mt,Lt){var Pt=typeof R;(Pt==="undefined"||Pt==="boolean")&&(R=null);var nt=!1;if(R===null)nt=!0;else switch(Pt){case"bigint":case"string":case"number":nt=!0;break;case"object":switch(R.$$typeof){case r:case t:nt=!0;break;case g:return nt=R._init,P(nt(R._payload),K,it,mt,Lt)}}if(nt)return Lt=Lt(R),nt=mt===""?"."+I(R,0):mt,O(Lt)?(it="",nt!=null&&(it=nt.replace(Z,"$&/")+"/"),P(Lt,K,it,"",function(ee){return ee})):Lt!=null&&(V(Lt)&&(Lt=B(Lt,it+(Lt.key==null||R&&R.key===Lt.key?"":(""+Lt.key).replace(Z,"$&/")+"/")+nt)),K.push(Lt)),1;nt=0;var dt=mt===""?".":mt+":";if(O(R))for(var wt=0;wt<R.length;wt++)mt=R[wt],Pt=dt+I(mt,wt),nt+=P(mt,K,it,Pt,Lt);else if(wt=x(R),typeof wt=="function")for(R=wt.call(R),wt=0;!(mt=R.next()).done;)mt=mt.value,Pt=dt+I(mt,wt++),nt+=P(mt,K,it,Pt,Lt);else if(Pt==="object"){if(typeof R.then=="function")return P(X(R),K,it,mt,Lt);throw K=String(R),Error("Objects are not valid as a React child (found: "+(K==="[object Object]"?"object with keys {"+Object.keys(R).join(", ")+"}":K)+"). If you meant to render a collection of children, use an array instead.")}return nt}function F(R,K,it){if(R==null)return R;var mt=[],Lt=0;return P(R,mt,"","",function(Pt){return K.call(it,Pt,Lt++)}),mt}function Y(R){if(R._status===-1){var K=R._result;K=K(),K.then(function(it){(R._status===0||R._status===-1)&&(R._status=1,R._result=it)},function(it){(R._status===0||R._status===-1)&&(R._status=2,R._result=it)}),R._status===-1&&(R._status=0,R._result=K)}if(R._status===1)return R._result.default;throw R._result}var k=typeof reportError=="function"?reportError:function(R){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var K=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof R=="object"&&R!==null&&typeof R.message=="string"?String(R.message):String(R),error:R});if(!window.dispatchEvent(K))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",R);return}console.error(R)},W={map:F,forEach:function(R,K,it){F(R,function(){K.apply(this,arguments)},it)},count:function(R){var K=0;return F(R,function(){K++}),K},toArray:function(R){return F(R,function(K){return K})||[]},only:function(R){if(!V(R))throw Error("React.Children.only expected to receive a single React element child.");return R}};return me.Activity=v,me.Children=W,me.Component=S,me.Fragment=n,me.Profiler=o,me.PureComponent=H,me.StrictMode=a,me.Suspense=d,me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=L,me.__COMPILER_RUNTIME={__proto__:null,c:function(R){return L.H.useMemoCache(R)}},me.cache=function(R){return function(){return R.apply(null,arguments)}},me.cacheSignal=function(){return null},me.cloneElement=function(R,K,it){if(R==null)throw Error("The argument must be a React element, but you passed "+R+".");var mt=U({},R.props),Lt=R.key;if(K!=null)for(Pt in K.key!==void 0&&(Lt=""+K.key),K)!y.call(K,Pt)||Pt==="key"||Pt==="__self"||Pt==="__source"||Pt==="ref"&&K.ref===void 0||(mt[Pt]=K[Pt]);var Pt=arguments.length-2;if(Pt===1)mt.children=it;else if(1<Pt){for(var nt=Array(Pt),dt=0;dt<Pt;dt++)nt[dt]=arguments[dt+2];mt.children=nt}return D(R.type,Lt,mt)},me.createContext=function(R){return R={$$typeof:u,_currentValue:R,_currentValue2:R,_threadCount:0,Provider:null,Consumer:null},R.Provider=R,R.Consumer={$$typeof:c,_context:R},R},me.createElement=function(R,K,it){var mt,Lt={},Pt=null;if(K!=null)for(mt in K.key!==void 0&&(Pt=""+K.key),K)y.call(K,mt)&&mt!=="key"&&mt!=="__self"&&mt!=="__source"&&(Lt[mt]=K[mt]);var nt=arguments.length-2;if(nt===1)Lt.children=it;else if(1<nt){for(var dt=Array(nt),wt=0;wt<nt;wt++)dt[wt]=arguments[wt+2];Lt.children=dt}if(R&&R.defaultProps)for(mt in nt=R.defaultProps,nt)Lt[mt]===void 0&&(Lt[mt]=nt[mt]);return D(R,Pt,Lt)},me.createRef=function(){return{current:null}},me.forwardRef=function(R){return{$$typeof:p,render:R}},me.isValidElement=V,me.lazy=function(R){return{$$typeof:g,_payload:{_status:-1,_result:R},_init:Y}},me.memo=function(R,K){return{$$typeof:h,type:R,compare:K===void 0?null:K}},me.startTransition=function(R){var K=L.T,it={};L.T=it;try{var mt=R(),Lt=L.S;Lt!==null&&Lt(it,mt),typeof mt=="object"&&mt!==null&&typeof mt.then=="function"&&mt.then(w,k)}catch(Pt){k(Pt)}finally{K!==null&&it.types!==null&&(K.types=it.types),L.T=K}},me.unstable_useCacheRefresh=function(){return L.H.useCacheRefresh()},me.use=function(R){return L.H.use(R)},me.useActionState=function(R,K,it){return L.H.useActionState(R,K,it)},me.useCallback=function(R,K){return L.H.useCallback(R,K)},me.useContext=function(R){return L.H.useContext(R)},me.useDebugValue=function(){},me.useDeferredValue=function(R,K){return L.H.useDeferredValue(R,K)},me.useEffect=function(R,K){return L.H.useEffect(R,K)},me.useEffectEvent=function(R){return L.H.useEffectEvent(R)},me.useId=function(){return L.H.useId()},me.useImperativeHandle=function(R,K,it){return L.H.useImperativeHandle(R,K,it)},me.useInsertionEffect=function(R,K){return L.H.useInsertionEffect(R,K)},me.useLayoutEffect=function(R,K){return L.H.useLayoutEffect(R,K)},me.useMemo=function(R,K){return L.H.useMemo(R,K)},me.useOptimistic=function(R,K){return L.H.useOptimistic(R,K)},me.useReducer=function(R,K,it){return L.H.useReducer(R,K,it)},me.useRef=function(R){return L.H.useRef(R)},me.useState=function(R){return L.H.useState(R)},me.useSyncExternalStore=function(R,K,it){return L.H.useSyncExternalStore(R,K,it)},me.useTransition=function(){return L.H.useTransition()},me.version="19.2.7",me}var Dv;function _p(){return Dv||(Dv=1,Vh.exports=Jy()),Vh.exports}var Zn=_p();const Qy=Yy(Zn);var kh={exports:{}},Jo={},Xh={exports:{}},Wh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uv;function jy(){return Uv||(Uv=1,(function(r){function t(P,F){var Y=P.length;P.push(F);t:for(;0<Y;){var k=Y-1>>>1,W=P[k];if(0<o(W,F))P[k]=F,P[Y]=W,Y=k;else break t}}function n(P){return P.length===0?null:P[0]}function a(P){if(P.length===0)return null;var F=P[0],Y=P.pop();if(Y!==F){P[0]=Y;t:for(var k=0,W=P.length,R=W>>>1;k<R;){var K=2*(k+1)-1,it=P[K],mt=K+1,Lt=P[mt];if(0>o(it,Y))mt<W&&0>o(Lt,it)?(P[k]=Lt,P[mt]=Y,k=mt):(P[k]=it,P[K]=Y,k=K);else if(mt<W&&0>o(Lt,Y))P[k]=Lt,P[mt]=Y,k=mt;else break t}}return F}function o(P,F){var Y=P.sortIndex-F.sortIndex;return Y!==0?Y:P.id-F.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,p=u.now();r.unstable_now=function(){return u.now()-p}}var d=[],h=[],g=1,v=null,_=3,x=!1,b=!1,U=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,z=typeof clearTimeout=="function"?clearTimeout:null,H=typeof setImmediate<"u"?setImmediate:null;function A(P){for(var F=n(h);F!==null;){if(F.callback===null)a(h);else if(F.startTime<=P)a(h),F.sortIndex=F.expirationTime,t(d,F);else break;F=n(h)}}function O(P){if(U=!1,A(P),!b)if(n(d)!==null)b=!0,w||(w=!0,q());else{var F=n(h);F!==null&&X(O,F.startTime-P)}}var w=!1,L=-1,y=5,D=-1;function B(){return M?!0:!(r.unstable_now()-D<y)}function V(){if(M=!1,w){var P=r.unstable_now();D=P;var F=!0;try{t:{b=!1,U&&(U=!1,z(L),L=-1),x=!0;var Y=_;try{e:{for(A(P),v=n(d);v!==null&&!(v.expirationTime>P&&B());){var k=v.callback;if(typeof k=="function"){v.callback=null,_=v.priorityLevel;var W=k(v.expirationTime<=P);if(P=r.unstable_now(),typeof W=="function"){v.callback=W,A(P),F=!0;break e}v===n(d)&&a(d),A(P)}else a(d);v=n(d)}if(v!==null)F=!0;else{var R=n(h);R!==null&&X(O,R.startTime-P),F=!1}}break t}finally{v=null,_=Y,x=!1}F=void 0}}finally{F?q():w=!1}}}var q;if(typeof H=="function")q=function(){H(V)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,I=Z.port2;Z.port1.onmessage=V,q=function(){I.postMessage(null)}}else q=function(){S(V,0)};function X(P,F){L=S(function(){P(r.unstable_now())},F)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(P){P.callback=null},r.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<P?Math.floor(1e3/P):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_next=function(P){switch(_){case 1:case 2:case 3:var F=3;break;default:F=_}var Y=_;_=F;try{return P()}finally{_=Y}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(P,F){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var Y=_;_=P;try{return F()}finally{_=Y}},r.unstable_scheduleCallback=function(P,F,Y){var k=r.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?k+Y:k):Y=k,P){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=Y+W,P={id:g++,callback:F,priorityLevel:P,startTime:Y,expirationTime:W,sortIndex:-1},Y>k?(P.sortIndex=Y,t(h,P),n(d)===null&&P===n(h)&&(U?(z(L),L=-1):U=!0,X(O,Y-k))):(P.sortIndex=W,t(d,P),b||x||(b=!0,w||(w=!0,q()))),P},r.unstable_shouldYield=B,r.unstable_wrapCallback=function(P){var F=_;return function(){var Y=_;_=F;try{return P.apply(this,arguments)}finally{_=Y}}}})(Wh)),Wh}var Lv;function $y(){return Lv||(Lv=1,Xh.exports=jy()),Xh.exports}var qh={exports:{}},zn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nv;function tM(){if(Nv)return zn;Nv=1;var r=_p();function t(d){var h="https://react.dev/errors/"+d;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)h+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+d+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(d,h,g){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:v==null?null:""+v,children:d,containerInfo:h,implementation:g}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(d,h){if(d==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,zn.createPortal=function(d,h){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(t(299));return c(d,h,null,g)},zn.flushSync=function(d){var h=u.T,g=a.p;try{if(u.T=null,a.p=2,d)return d()}finally{u.T=h,a.p=g,a.d.f()}},zn.preconnect=function(d,h){typeof d=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,a.d.C(d,h))},zn.prefetchDNS=function(d){typeof d=="string"&&a.d.D(d)},zn.preinit=function(d,h){if(typeof d=="string"&&h&&typeof h.as=="string"){var g=h.as,v=p(g,h.crossOrigin),_=typeof h.integrity=="string"?h.integrity:void 0,x=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;g==="style"?a.d.S(d,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:v,integrity:_,fetchPriority:x}):g==="script"&&a.d.X(d,{crossOrigin:v,integrity:_,fetchPriority:x,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},zn.preinitModule=function(d,h){if(typeof d=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var g=p(h.as,h.crossOrigin);a.d.M(d,{crossOrigin:g,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&a.d.M(d)},zn.preload=function(d,h){if(typeof d=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var g=h.as,v=p(g,h.crossOrigin);a.d.L(d,g,{crossOrigin:v,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},zn.preloadModule=function(d,h){if(typeof d=="string")if(h){var g=p(h.as,h.crossOrigin);a.d.m(d,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:g,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else a.d.m(d)},zn.requestFormReset=function(d){a.d.r(d)},zn.unstable_batchedUpdates=function(d,h){return d(h)},zn.useFormState=function(d,h,g){return u.H.useFormState(d,h,g)},zn.useFormStatus=function(){return u.H.useHostTransitionStatus()},zn.version="19.2.7",zn}var Ov;function eM(){if(Ov)return qh.exports;Ov=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),qh.exports=tM(),qh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pv;function nM(){if(Pv)return Jo;Pv=1;var r=$y(),t=_p(),n=eM();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function u(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function p(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function d(e){if(c(e)!==e)throw Error(a(188))}function h(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,l=i;;){var f=s.return;if(f===null)break;var m=f.alternate;if(m===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===m.child){for(m=f.child;m;){if(m===s)return d(f),e;if(m===l)return d(f),i;m=m.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=m;else{for(var E=!1,N=f.child;N;){if(N===s){E=!0,s=f,l=m;break}if(N===l){E=!0,l=f,s=m;break}N=N.sibling}if(!E){for(N=m.child;N;){if(N===s){E=!0,s=m,l=f;break}if(N===l){E=!0,l=m,s=f;break}N=N.sibling}if(!E)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var v=Object.assign,_=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),z=Symbol.for("react.consumer"),H=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),w=Symbol.for("react.suspense_list"),L=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),B=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function q(e){return e===null||typeof e!="object"?null:(e=V&&e[V]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Symbol.for("react.client.reference");function I(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Z?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case U:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case O:return"Suspense";case w:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case H:return e.displayName||"Context";case z:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case L:return i=e.displayName||null,i!==null?i:I(e.type)||"Memo";case y:i=e._payload,e=e._init;try{return I(e(i))}catch{}}return null}var X=Array.isArray,P=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y={pending:!1,data:null,method:null,action:null},k=[],W=-1;function R(e){return{current:e}}function K(e){0>W||(e.current=k[W],k[W]=null,W--)}function it(e,i){W++,k[W]=e.current,e.current=i}var mt=R(null),Lt=R(null),Pt=R(null),nt=R(null);function dt(e,i){switch(it(Pt,i),it(Lt,e),it(mt,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Jg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Jg(i),e=Qg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}K(mt),it(mt,e)}function wt(){K(mt),K(Lt),K(Pt)}function ee(e){e.memoizedState!==null&&it(nt,e);var i=mt.current,s=Qg(i,e.type);i!==s&&(it(Lt,e),it(mt,s))}function zt(e){Lt.current===e&&(K(mt),K(Lt)),nt.current===e&&(K(nt),Wo._currentValue=Y)}var ie,ue;function gt(e){if(ie===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);ie=i&&i[1]||"",ue=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ie+e+ue}var Ct=!1;function Nt(e,i){if(!e||Ct)return"";Ct=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var At=function(){throw Error()};if(Object.defineProperty(At.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(At,[])}catch(vt){var ht=vt}Reflect.construct(e,[],At)}else{try{At.call()}catch(vt){ht=vt}e.call(At.prototype)}}else{try{throw Error()}catch(vt){ht=vt}(At=e())&&typeof At.catch=="function"&&At.catch(function(){})}}catch(vt){if(vt&&ht&&typeof vt.stack=="string")return[vt.stack,ht.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var m=l.DetermineComponentFrameRoot(),E=m[0],N=m[1];if(E&&N){var Q=E.split(`
`),ft=N.split(`
`);for(f=l=0;l<Q.length&&!Q[l].includes("DetermineComponentFrameRoot");)l++;for(;f<ft.length&&!ft[f].includes("DetermineComponentFrameRoot");)f++;if(l===Q.length||f===ft.length)for(l=Q.length-1,f=ft.length-1;1<=l&&0<=f&&Q[l]!==ft[f];)f--;for(;1<=l&&0<=f;l--,f--)if(Q[l]!==ft[f]){if(l!==1||f!==1)do if(l--,f--,0>f||Q[l]!==ft[f]){var Et=`
`+Q[l].replace(" at new "," at ");return e.displayName&&Et.includes("<anonymous>")&&(Et=Et.replace("<anonymous>",e.displayName)),Et}while(1<=l&&0<=f);break}}}finally{Ct=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?gt(s):""}function Dt(e,i){switch(e.tag){case 26:case 27:case 5:return gt(e.type);case 16:return gt("Lazy");case 13:return e.child!==i&&i!==null?gt("Suspense Fallback"):gt("Suspense");case 19:return gt("SuspenseList");case 0:case 15:return Nt(e.type,!1);case 11:return Nt(e.type.render,!1);case 1:return Nt(e.type,!0);case 31:return gt("Activity");default:return""}}function It(e){try{var i="",s=null;do i+=Dt(e,s),s=e,e=e.return;while(e);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var ae=Object.prototype.hasOwnProperty,jt=r.unstable_scheduleCallback,ce=r.unstable_cancelCallback,de=r.unstable_shouldYield,j=r.unstable_requestPaint,pe=r.unstable_now,Se=r.unstable_getCurrentPriorityLevel,G=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,at=r.unstable_NormalPriority,ct=r.unstable_LowPriority,St=r.unstable_IdlePriority,Ot=r.log,Bt=r.unstable_setDisableYieldValue,_t=null,yt=null;function st(e){if(typeof Ot=="function"&&Bt(e),yt&&typeof yt.setStrictMode=="function")try{yt.setStrictMode(_t,e)}catch{}}var xt=Math.clz32?Math.clz32:Vt,Tt=Math.log,Rt=Math.LN2;function Vt(e){return e>>>=0,e===0?32:31-(Tt(e)/Rt|0)|0}var qt=256,re=262144,$=4194304;function Ht(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Mt(e,i,s){var l=e.pendingLanes;if(l===0)return 0;var f=0,m=e.suspendedLanes,E=e.pingedLanes;e=e.warmLanes;var N=l&134217727;return N!==0?(l=N&~m,l!==0?f=Ht(l):(E&=N,E!==0?f=Ht(E):s||(s=N&~e,s!==0&&(f=Ht(s))))):(N=l&~m,N!==0?f=Ht(N):E!==0?f=Ht(E):s||(s=l&~e,s!==0&&(f=Ht(s)))),f===0?0:i!==0&&i!==f&&(i&m)===0&&(m=f&-f,s=i&-i,m>=s||m===32&&(s&4194048)!==0)?i:f}function Gt(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Yt(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ut(){var e=$;return $<<=1,($&62914560)===0&&($=4194304),e}function oe(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function $t(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function We(e,i,s,l,f,m){var E=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var N=e.entanglements,Q=e.expirationTimes,ft=e.hiddenUpdates;for(s=E&~s;0<s;){var Et=31-xt(s),At=1<<Et;N[Et]=0,Q[Et]=-1;var ht=ft[Et];if(ht!==null)for(ft[Et]=null,Et=0;Et<ht.length;Et++){var vt=ht[Et];vt!==null&&(vt.lane&=-536870913)}s&=~At}l!==0&&Pe(e,l,0),m!==0&&f===0&&e.tag!==0&&(e.suspendedLanes|=m&~(E&~i))}function Pe(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-xt(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|s&261930}function Qn(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var l=31-xt(s),f=1<<l;f&i|e[l]&i&&(e[l]|=i),s&=~f}}function oi(e,i){var s=i&-i;return s=(s&42)!==0?1:io(s),(s&(e.suspendedLanes|i))!==0?0:s}function io(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ao(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function so(){var e=F.p;return e!==0?e:(e=window.event,e===void 0?32:Sv(e.type))}function Js(e,i){var s=F.p;try{return F.p=e,i()}finally{F.p=s}}var Wi=Math.random().toString(36).slice(2),hn="__reactFiber$"+Wi,Un="__reactProps$"+Wi,jn="__reactContainer$"+Wi,gs="__reactEvents$"+Wi,Dl="__reactListeners$"+Wi,Ul="__reactHandles$"+Wi,vs="__reactResources$"+Wi,Fa="__reactMarker$"+Wi;function za(e){delete e[hn],delete e[Un],delete e[gs],delete e[Dl],delete e[Ul]}function sa(e){var i=e[hn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[jn]||s[hn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=av(e);e!==null;){if(s=e[hn])return s;e=av(e)}return i}e=s,s=e.parentNode}return null}function ra(e){if(e=e[hn]||e[jn]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function _s(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Ba(e){var i=e[vs];return i||(i=e[vs]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function dn(e){e[Fa]=!0}var Ll=new Set,ro={};function C(e,i){tt(e,i),tt(e+"Capture",i)}function tt(e,i){for(ro[e]=i,e=0;e<i.length;e++)Ll.add(i[e])}var pt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ot={},lt={};function Xt(e){return ae.call(lt,e)?!0:ae.call(ot,e)?!1:pt.test(e)?lt[e]=!0:(ot[e]=!0,!1)}function Jt(e,i,s){if(Xt(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function kt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function Zt(e,i,s,l){if(l===null)e.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+l)}}function Kt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ve(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ae(e,i,s){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,m=l.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return f.call(this)},set:function(E){s=""+E,m.call(this,E)}}),Object.defineProperty(e,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(E){s=""+E},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function te(e){if(!e._valueTracker){var i=ve(e)?"checked":"value";e._valueTracker=Ae(e,i,""+e[i])}}function Ie(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return e&&(l=ve(e)?e.checked?"true":"false":e.value),e=l,e!==s?(i.setValue(e),!0):!1}function je(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Je=/[\n"\\]/g;function Ee(e){return e.replace(Je,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function pn(e,i,s,l,f,m,E,N){e.name="",E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?e.type=E:e.removeAttribute("type"),i!=null?E==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Kt(i)):e.value!==""+Kt(i)&&(e.value=""+Kt(i)):E!=="submit"&&E!=="reset"||e.removeAttribute("value"),i!=null?yn(e,E,Kt(i)):s!=null?yn(e,E,Kt(s)):l!=null&&e.removeAttribute("value"),f==null&&m!=null&&(e.defaultChecked=!!m),f!=null&&(e.checked=f&&typeof f!="function"&&typeof f!="symbol"),N!=null&&typeof N!="function"&&typeof N!="symbol"&&typeof N!="boolean"?e.name=""+Kt(N):e.removeAttribute("name")}function Qt(e,i,s,l,f,m,E,N){if(m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.type=m),i!=null||s!=null){if(!(m!=="submit"&&m!=="reset"||i!=null)){te(e);return}s=s!=null?""+Kt(s):"",i=i!=null?""+Kt(i):s,N||i===e.value||(e.value=i),e.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=N?e.checked:!!l,e.defaultChecked=!!l,E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"&&(e.name=E),te(e)}function yn(e,i,s){i==="number"&&je(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function be(e,i,s,l){if(e=e.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<e.length;s++)f=i.hasOwnProperty("$"+e[s].value),e[s].selected!==f&&(e[s].selected=f),f&&l&&(e[s].defaultSelected=!0)}else{for(s=""+Kt(s),i=null,f=0;f<e.length;f++){if(e[f].value===s){e[f].selected=!0,l&&(e[f].defaultSelected=!0);return}i!==null||e[f].disabled||(i=e[f])}i!==null&&(i.selected=!0)}}function kn(e,i,s){if(i!=null&&(i=""+Kt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Kt(s):""}function li(e,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(X(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Kt(i),e.defaultValue=s,l=e.textContent,l===s&&l!==""&&l!==null&&(e.value=l),te(e)}function Xn(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var Ha=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Be(e,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,s):typeof s!="number"||s===0||Ha.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function nn(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&Be(e,f,l)}else for(var m in i)i.hasOwnProperty(m)&&Be(e,m,i[m])}function yi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qe=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),qi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Oi(e){return qi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Mi(){}var Fu=null;function zu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Qs=null,js=null;function Kp(e){var i=ra(e);if(i&&(e=i.stateNode)){var s=e[Un]||null;t:switch(e=i.stateNode,i.type){case"input":if(pn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+Ee(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==e&&l.form===e.form){var f=l[Un]||null;if(!f)throw Error(a(90));pn(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===e.form&&Ie(l)}break t;case"textarea":kn(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&be(e,!!s.multiple,i,!1)}}}var Bu=!1;function Jp(e,i,s){if(Bu)return e(i,s);Bu=!0;try{var l=e(i);return l}finally{if(Bu=!1,(Qs!==null||js!==null)&&(xc(),Qs&&(i=Qs,e=js,js=Qs=null,Kp(i),e)))for(i=0;i<e.length;i++)Kp(e[i])}}function oo(e,i){var s=e.stateNode;if(s===null)return null;var l=s[Un]||null;if(l===null)return null;s=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var oa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Hu=!1;if(oa)try{var lo={};Object.defineProperty(lo,"passive",{get:function(){Hu=!0}}),window.addEventListener("test",lo,lo),window.removeEventListener("test",lo,lo)}catch{Hu=!1}var Ga=null,Gu=null,Nl=null;function Qp(){if(Nl)return Nl;var e,i=Gu,s=i.length,l,f="value"in Ga?Ga.value:Ga.textContent,m=f.length;for(e=0;e<s&&i[e]===f[e];e++);var E=s-e;for(l=1;l<=E&&i[s-l]===f[m-l];l++);return Nl=f.slice(e,1<l?1-l:void 0)}function Ol(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Pl(){return!0}function jp(){return!1}function $n(e){function i(s,l,f,m,E){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=m,this.target=E,this.currentTarget=null;for(var N in e)e.hasOwnProperty(N)&&(s=e[N],this[N]=s?s(m):m[N]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Pl:jp,this.isPropagationStopped=jp,this}return v(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Pl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Pl)},persist:function(){},isPersistent:Pl}),i}var xs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=$n(xs),co=v({},xs,{view:0,detail:0}),Wx=$n(co),Vu,ku,uo,Fl=v({},co,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==uo&&(uo&&e.type==="mousemove"?(Vu=e.screenX-uo.screenX,ku=e.screenY-uo.screenY):ku=Vu=0,uo=e),Vu)},movementY:function(e){return"movementY"in e?e.movementY:ku}}),$p=$n(Fl),qx=v({},Fl,{dataTransfer:0}),Yx=$n(qx),Zx=v({},co,{relatedTarget:0}),Xu=$n(Zx),Kx=v({},xs,{animationName:0,elapsedTime:0,pseudoElement:0}),Jx=$n(Kx),Qx=v({},xs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jx=$n(Qx),$x=v({},xs,{data:0}),tm=$n($x),tS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},eS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function iS(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=nS[e])?!!i[e]:!1}function Wu(){return iS}var aS=v({},co,{key:function(e){if(e.key){var i=tS[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Ol(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?eS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wu,charCode:function(e){return e.type==="keypress"?Ol(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ol(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),sS=$n(aS),rS=v({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),em=$n(rS),oS=v({},co,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wu}),lS=$n(oS),cS=v({},xs,{propertyName:0,elapsedTime:0,pseudoElement:0}),uS=$n(cS),fS=v({},Fl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),hS=$n(fS),dS=v({},xs,{newState:0,oldState:0}),pS=$n(dS),mS=[9,13,27,32],qu=oa&&"CompositionEvent"in window,fo=null;oa&&"documentMode"in document&&(fo=document.documentMode);var gS=oa&&"TextEvent"in window&&!fo,nm=oa&&(!qu||fo&&8<fo&&11>=fo),im=" ",am=!1;function sm(e,i){switch(e){case"keyup":return mS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function rm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var $s=!1;function vS(e,i){switch(e){case"compositionend":return rm(i);case"keypress":return i.which!==32?null:(am=!0,im);case"textInput":return e=i.data,e===im&&am?null:e;default:return null}}function _S(e,i){if($s)return e==="compositionend"||!qu&&sm(e,i)?(e=Qp(),Nl=Gu=Ga=null,$s=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return nm&&i.locale!=="ko"?null:i.data;default:return null}}var xS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function om(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!xS[e.type]:i==="textarea"}function lm(e,i,s,l){Qs?js?js.push(l):js=[l]:Qs=l,i=Ac(i,"onChange"),0<i.length&&(s=new Il("onChange","change",null,s,l),e.push({event:s,listeners:i}))}var ho=null,po=null;function SS(e){Xg(e,0)}function zl(e){var i=_s(e);if(Ie(i))return e}function cm(e,i){if(e==="change")return i}var um=!1;if(oa){var Yu;if(oa){var Zu="oninput"in document;if(!Zu){var fm=document.createElement("div");fm.setAttribute("oninput","return;"),Zu=typeof fm.oninput=="function"}Yu=Zu}else Yu=!1;um=Yu&&(!document.documentMode||9<document.documentMode)}function hm(){ho&&(ho.detachEvent("onpropertychange",dm),po=ho=null)}function dm(e){if(e.propertyName==="value"&&zl(po)){var i=[];lm(i,po,e,zu(e)),Jp(SS,i)}}function yS(e,i,s){e==="focusin"?(hm(),ho=i,po=s,ho.attachEvent("onpropertychange",dm)):e==="focusout"&&hm()}function MS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return zl(po)}function ES(e,i){if(e==="click")return zl(i)}function bS(e,i){if(e==="input"||e==="change")return zl(i)}function TS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ci=typeof Object.is=="function"?Object.is:TS;function mo(e,i){if(ci(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!ae.call(i,f)||!ci(e[f],i[f]))return!1}return!0}function pm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function mm(e,i){var s=pm(e);e=0;for(var l;s;){if(s.nodeType===3){if(l=e+s.textContent.length,e<=i&&l>=i)return{node:s,offset:i-e};e=l}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=pm(s)}}function gm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?gm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function vm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=je(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=je(e.document)}return i}function Ku(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var AS=oa&&"documentMode"in document&&11>=document.documentMode,tr=null,Ju=null,go=null,Qu=!1;function _m(e,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Qu||tr==null||tr!==je(l)||(l=tr,"selectionStart"in l&&Ku(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),go&&mo(go,l)||(go=l,l=Ac(Ju,"onSelect"),0<l.length&&(i=new Il("onSelect","select",null,i,s),e.push({event:i,listeners:l}),i.target=tr)))}function Ss(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var er={animationend:Ss("Animation","AnimationEnd"),animationiteration:Ss("Animation","AnimationIteration"),animationstart:Ss("Animation","AnimationStart"),transitionrun:Ss("Transition","TransitionRun"),transitionstart:Ss("Transition","TransitionStart"),transitioncancel:Ss("Transition","TransitionCancel"),transitionend:Ss("Transition","TransitionEnd")},ju={},xm={};oa&&(xm=document.createElement("div").style,"AnimationEvent"in window||(delete er.animationend.animation,delete er.animationiteration.animation,delete er.animationstart.animation),"TransitionEvent"in window||delete er.transitionend.transition);function ys(e){if(ju[e])return ju[e];if(!er[e])return e;var i=er[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in xm)return ju[e]=i[s];return e}var Sm=ys("animationend"),ym=ys("animationiteration"),Mm=ys("animationstart"),wS=ys("transitionrun"),RS=ys("transitionstart"),CS=ys("transitioncancel"),Em=ys("transitionend"),bm=new Map,$u="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");$u.push("scrollEnd");function Pi(e,i){bm.set(e,i),C(i,[e])}var Bl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ei=[],nr=0,tf=0;function Hl(){for(var e=nr,i=tf=nr=0;i<e;){var s=Ei[i];Ei[i++]=null;var l=Ei[i];Ei[i++]=null;var f=Ei[i];Ei[i++]=null;var m=Ei[i];if(Ei[i++]=null,l!==null&&f!==null){var E=l.pending;E===null?f.next=f:(f.next=E.next,E.next=f),l.pending=f}m!==0&&Tm(s,f,m)}}function Gl(e,i,s,l){Ei[nr++]=e,Ei[nr++]=i,Ei[nr++]=s,Ei[nr++]=l,tf|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function ef(e,i,s,l){return Gl(e,i,s,l),Vl(e)}function Ms(e,i){return Gl(e,null,null,i),Vl(e)}function Tm(e,i,s){e.lanes|=s;var l=e.alternate;l!==null&&(l.lanes|=s);for(var f=!1,m=e.return;m!==null;)m.childLanes|=s,l=m.alternate,l!==null&&(l.childLanes|=s),m.tag===22&&(e=m.stateNode,e===null||e._visibility&1||(f=!0)),e=m,m=m.return;return e.tag===3?(m=e.stateNode,f&&i!==null&&(f=31-xt(s),e=m.hiddenUpdates,l=e[f],l===null?e[f]=[i]:l.push(i),i.lane=s|536870912),m):null}function Vl(e){if(50<zo)throw zo=0,fh=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var ir={};function DS(e,i,s,l){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ui(e,i,s,l){return new DS(e,i,s,l)}function nf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function la(e,i){var s=e.alternate;return s===null?(s=ui(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function Am(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function kl(e,i,s,l,f,m){var E=0;if(l=e,typeof e=="function")nf(e)&&(E=1);else if(typeof e=="string")E=Py(e,s,mt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=ui(31,s,i,f),e.elementType=D,e.lanes=m,e;case U:return Es(s.children,f,m,i);case M:E=8,f|=24;break;case S:return e=ui(12,s,i,f|2),e.elementType=S,e.lanes=m,e;case O:return e=ui(13,s,i,f),e.elementType=O,e.lanes=m,e;case w:return e=ui(19,s,i,f),e.elementType=w,e.lanes=m,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case H:E=10;break t;case z:E=9;break t;case A:E=11;break t;case L:E=14;break t;case y:E=16,l=null;break t}E=29,s=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=ui(E,s,i,f),i.elementType=e,i.type=l,i.lanes=m,i}function Es(e,i,s,l){return e=ui(7,e,l,i),e.lanes=s,e}function af(e,i,s){return e=ui(6,e,null,i),e.lanes=s,e}function wm(e){var i=ui(18,null,null,0);return i.stateNode=e,i}function sf(e,i,s){return i=ui(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var Rm=new WeakMap;function bi(e,i){if(typeof e=="object"&&e!==null){var s=Rm.get(e);return s!==void 0?s:(i={value:e,source:i,stack:It(i)},Rm.set(e,i),i)}return{value:e,source:i,stack:It(i)}}var ar=[],sr=0,Xl=null,vo=0,Ti=[],Ai=0,Va=null,Yi=1,Zi="";function ca(e,i){ar[sr++]=vo,ar[sr++]=Xl,Xl=e,vo=i}function Cm(e,i,s){Ti[Ai++]=Yi,Ti[Ai++]=Zi,Ti[Ai++]=Va,Va=e;var l=Yi;e=Zi;var f=32-xt(l)-1;l&=~(1<<f),s+=1;var m=32-xt(i)+f;if(30<m){var E=f-f%5;m=(l&(1<<E)-1).toString(32),l>>=E,f-=E,Yi=1<<32-xt(i)+f|s<<f|l,Zi=m+e}else Yi=1<<m|s<<f|l,Zi=e}function rf(e){e.return!==null&&(ca(e,1),Cm(e,1,0))}function of(e){for(;e===Xl;)Xl=ar[--sr],ar[sr]=null,vo=ar[--sr],ar[sr]=null;for(;e===Va;)Va=Ti[--Ai],Ti[Ai]=null,Zi=Ti[--Ai],Ti[Ai]=null,Yi=Ti[--Ai],Ti[Ai]=null}function Dm(e,i){Ti[Ai++]=Yi,Ti[Ai++]=Zi,Ti[Ai++]=Va,Yi=i.id,Zi=i.overflow,Va=e}var Ln=null,$e=null,Ue=!1,ka=null,wi=!1,lf=Error(a(519));function Xa(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw _o(bi(i,e)),lf}function Um(e){var i=e.stateNode,s=e.type,l=e.memoizedProps;switch(i[hn]=e,i[Un]=l,s){case"dialog":Re("cancel",i),Re("close",i);break;case"iframe":case"object":case"embed":Re("load",i);break;case"video":case"audio":for(s=0;s<Ho.length;s++)Re(Ho[s],i);break;case"source":Re("error",i);break;case"img":case"image":case"link":Re("error",i),Re("load",i);break;case"details":Re("toggle",i);break;case"input":Re("invalid",i),Qt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":Re("invalid",i);break;case"textarea":Re("invalid",i),li(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||Zg(i.textContent,s)?(l.popover!=null&&(Re("beforetoggle",i),Re("toggle",i)),l.onScroll!=null&&Re("scroll",i),l.onScrollEnd!=null&&Re("scrollend",i),l.onClick!=null&&(i.onclick=Mi),i=!0):i=!1,i||Xa(e,!0)}function Lm(e){for(Ln=e.return;Ln;)switch(Ln.tag){case 5:case 31:case 13:wi=!1;return;case 27:case 3:wi=!0;return;default:Ln=Ln.return}}function rr(e){if(e!==Ln)return!1;if(!Ue)return Lm(e),Ue=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||Ah(e.type,e.memoizedProps)),s=!s),s&&$e&&Xa(e),Lm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));$e=iv(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));$e=iv(e)}else i===27?(i=$e,as(e.type)?(e=Uh,Uh=null,$e=e):$e=i):$e=Ln?Ci(e.stateNode.nextSibling):null;return!0}function bs(){$e=Ln=null,Ue=!1}function cf(){var e=ka;return e!==null&&(ii===null?ii=e:ii.push.apply(ii,e),ka=null),e}function _o(e){ka===null?ka=[e]:ka.push(e)}var uf=R(null),Ts=null,ua=null;function Wa(e,i,s){it(uf,i._currentValue),i._currentValue=s}function fa(e){e._currentValue=uf.current,K(uf)}function ff(e,i,s){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===s)break;e=e.return}}function hf(e,i,s,l){var f=e.child;for(f!==null&&(f.return=e);f!==null;){var m=f.dependencies;if(m!==null){var E=f.child;m=m.firstContext;t:for(;m!==null;){var N=m;m=f;for(var Q=0;Q<i.length;Q++)if(N.context===i[Q]){m.lanes|=s,N=m.alternate,N!==null&&(N.lanes|=s),ff(m.return,s,e),l||(E=null);break t}m=N.next}}else if(f.tag===18){if(E=f.return,E===null)throw Error(a(341));E.lanes|=s,m=E.alternate,m!==null&&(m.lanes|=s),ff(E,s,e),E=null}else E=f.child;if(E!==null)E.return=f;else for(E=f;E!==null;){if(E===e){E=null;break}if(f=E.sibling,f!==null){f.return=E.return,E=f;break}E=E.return}f=E}}function or(e,i,s,l){e=null;for(var f=i,m=!1;f!==null;){if(!m){if((f.flags&524288)!==0)m=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var E=f.alternate;if(E===null)throw Error(a(387));if(E=E.memoizedProps,E!==null){var N=f.type;ci(f.pendingProps.value,E.value)||(e!==null?e.push(N):e=[N])}}else if(f===nt.current){if(E=f.alternate,E===null)throw Error(a(387));E.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(e!==null?e.push(Wo):e=[Wo])}f=f.return}e!==null&&hf(i,e,s,l),i.flags|=262144}function Wl(e){for(e=e.firstContext;e!==null;){if(!ci(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function As(e){Ts=e,ua=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Nn(e){return Nm(Ts,e)}function ql(e,i){return Ts===null&&As(e),Nm(e,i)}function Nm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ua===null){if(e===null)throw Error(a(308));ua=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ua=ua.next=i;return s}var US=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},LS=r.unstable_scheduleCallback,NS=r.unstable_NormalPriority,mn={$$typeof:H,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function df(){return{controller:new US,data:new Map,refCount:0}}function xo(e){e.refCount--,e.refCount===0&&LS(NS,function(){e.controller.abort()})}var So=null,pf=0,lr=0,cr=null;function OS(e,i){if(So===null){var s=So=[];pf=0,lr=vh(),cr={status:"pending",value:void 0,then:function(l){s.push(l)}}}return pf++,i.then(Om,Om),i}function Om(){if(--pf===0&&So!==null){cr!==null&&(cr.status="fulfilled");var e=So;So=null,lr=0,cr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function PS(e,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var Pm=P.S;P.S=function(e,i){_g=pe(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&OS(e,i),Pm!==null&&Pm(e,i)};var ws=R(null);function mf(){var e=ws.current;return e!==null?e:Qe.pooledCache}function Yl(e,i){i===null?it(ws,ws.current):it(ws,i.pool)}function Im(){var e=mf();return e===null?null:{parent:mn._currentValue,pool:e}}var ur=Error(a(460)),gf=Error(a(474)),Zl=Error(a(542)),Kl={then:function(){}};function Fm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function zm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Mi,Mi),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Hm(e),e;default:if(typeof i.status=="string")i.then(Mi,Mi);else{if(e=Qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Hm(e),e}throw Cs=i,ur}}function Rs(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Cs=s,ur):s}}var Cs=null;function Bm(){if(Cs===null)throw Error(a(459));var e=Cs;return Cs=null,e}function Hm(e){if(e===ur||e===Zl)throw Error(a(483))}var fr=null,yo=0;function Jl(e){var i=yo;return yo+=1,fr===null&&(fr=[]),zm(fr,e,i)}function Mo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Ql(e,i){throw i.$$typeof===_?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Gm(e){function i(rt,et){if(e){var ut=rt.deletions;ut===null?(rt.deletions=[et],rt.flags|=16):ut.push(et)}}function s(rt,et){if(!e)return null;for(;et!==null;)i(rt,et),et=et.sibling;return null}function l(rt){for(var et=new Map;rt!==null;)rt.key!==null?et.set(rt.key,rt):et.set(rt.index,rt),rt=rt.sibling;return et}function f(rt,et){return rt=la(rt,et),rt.index=0,rt.sibling=null,rt}function m(rt,et,ut){return rt.index=ut,e?(ut=rt.alternate,ut!==null?(ut=ut.index,ut<et?(rt.flags|=67108866,et):ut):(rt.flags|=67108866,et)):(rt.flags|=1048576,et)}function E(rt){return e&&rt.alternate===null&&(rt.flags|=67108866),rt}function N(rt,et,ut,bt){return et===null||et.tag!==6?(et=af(ut,rt.mode,bt),et.return=rt,et):(et=f(et,ut),et.return=rt,et)}function Q(rt,et,ut,bt){var le=ut.type;return le===U?Et(rt,et,ut.props.children,bt,ut.key):et!==null&&(et.elementType===le||typeof le=="object"&&le!==null&&le.$$typeof===y&&Rs(le)===et.type)?(et=f(et,ut.props),Mo(et,ut),et.return=rt,et):(et=kl(ut.type,ut.key,ut.props,null,rt.mode,bt),Mo(et,ut),et.return=rt,et)}function ft(rt,et,ut,bt){return et===null||et.tag!==4||et.stateNode.containerInfo!==ut.containerInfo||et.stateNode.implementation!==ut.implementation?(et=sf(ut,rt.mode,bt),et.return=rt,et):(et=f(et,ut.children||[]),et.return=rt,et)}function Et(rt,et,ut,bt,le){return et===null||et.tag!==7?(et=Es(ut,rt.mode,bt,le),et.return=rt,et):(et=f(et,ut),et.return=rt,et)}function At(rt,et,ut){if(typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint")return et=af(""+et,rt.mode,ut),et.return=rt,et;if(typeof et=="object"&&et!==null){switch(et.$$typeof){case x:return ut=kl(et.type,et.key,et.props,null,rt.mode,ut),Mo(ut,et),ut.return=rt,ut;case b:return et=sf(et,rt.mode,ut),et.return=rt,et;case y:return et=Rs(et),At(rt,et,ut)}if(X(et)||q(et))return et=Es(et,rt.mode,ut,null),et.return=rt,et;if(typeof et.then=="function")return At(rt,Jl(et),ut);if(et.$$typeof===H)return At(rt,ql(rt,et),ut);Ql(rt,et)}return null}function ht(rt,et,ut,bt){var le=et!==null?et.key:null;if(typeof ut=="string"&&ut!==""||typeof ut=="number"||typeof ut=="bigint")return le!==null?null:N(rt,et,""+ut,bt);if(typeof ut=="object"&&ut!==null){switch(ut.$$typeof){case x:return ut.key===le?Q(rt,et,ut,bt):null;case b:return ut.key===le?ft(rt,et,ut,bt):null;case y:return ut=Rs(ut),ht(rt,et,ut,bt)}if(X(ut)||q(ut))return le!==null?null:Et(rt,et,ut,bt,null);if(typeof ut.then=="function")return ht(rt,et,Jl(ut),bt);if(ut.$$typeof===H)return ht(rt,et,ql(rt,ut),bt);Ql(rt,ut)}return null}function vt(rt,et,ut,bt,le){if(typeof bt=="string"&&bt!==""||typeof bt=="number"||typeof bt=="bigint")return rt=rt.get(ut)||null,N(et,rt,""+bt,le);if(typeof bt=="object"&&bt!==null){switch(bt.$$typeof){case x:return rt=rt.get(bt.key===null?ut:bt.key)||null,Q(et,rt,bt,le);case b:return rt=rt.get(bt.key===null?ut:bt.key)||null,ft(et,rt,bt,le);case y:return bt=Rs(bt),vt(rt,et,ut,bt,le)}if(X(bt)||q(bt))return rt=rt.get(ut)||null,Et(et,rt,bt,le,null);if(typeof bt.then=="function")return vt(rt,et,ut,Jl(bt),le);if(bt.$$typeof===H)return vt(rt,et,ut,ql(et,bt),le);Ql(et,bt)}return null}function ne(rt,et,ut,bt){for(var le=null,Fe=null,se=et,ye=et=0,De=null;se!==null&&ye<ut.length;ye++){se.index>ye?(De=se,se=null):De=se.sibling;var ze=ht(rt,se,ut[ye],bt);if(ze===null){se===null&&(se=De);break}e&&se&&ze.alternate===null&&i(rt,se),et=m(ze,et,ye),Fe===null?le=ze:Fe.sibling=ze,Fe=ze,se=De}if(ye===ut.length)return s(rt,se),Ue&&ca(rt,ye),le;if(se===null){for(;ye<ut.length;ye++)se=At(rt,ut[ye],bt),se!==null&&(et=m(se,et,ye),Fe===null?le=se:Fe.sibling=se,Fe=se);return Ue&&ca(rt,ye),le}for(se=l(se);ye<ut.length;ye++)De=vt(se,rt,ye,ut[ye],bt),De!==null&&(e&&De.alternate!==null&&se.delete(De.key===null?ye:De.key),et=m(De,et,ye),Fe===null?le=De:Fe.sibling=De,Fe=De);return e&&se.forEach(function(cs){return i(rt,cs)}),Ue&&ca(rt,ye),le}function fe(rt,et,ut,bt){if(ut==null)throw Error(a(151));for(var le=null,Fe=null,se=et,ye=et=0,De=null,ze=ut.next();se!==null&&!ze.done;ye++,ze=ut.next()){se.index>ye?(De=se,se=null):De=se.sibling;var cs=ht(rt,se,ze.value,bt);if(cs===null){se===null&&(se=De);break}e&&se&&cs.alternate===null&&i(rt,se),et=m(cs,et,ye),Fe===null?le=cs:Fe.sibling=cs,Fe=cs,se=De}if(ze.done)return s(rt,se),Ue&&ca(rt,ye),le;if(se===null){for(;!ze.done;ye++,ze=ut.next())ze=At(rt,ze.value,bt),ze!==null&&(et=m(ze,et,ye),Fe===null?le=ze:Fe.sibling=ze,Fe=ze);return Ue&&ca(rt,ye),le}for(se=l(se);!ze.done;ye++,ze=ut.next())ze=vt(se,rt,ye,ze.value,bt),ze!==null&&(e&&ze.alternate!==null&&se.delete(ze.key===null?ye:ze.key),et=m(ze,et,ye),Fe===null?le=ze:Fe.sibling=ze,Fe=ze);return e&&se.forEach(function(qy){return i(rt,qy)}),Ue&&ca(rt,ye),le}function Ke(rt,et,ut,bt){if(typeof ut=="object"&&ut!==null&&ut.type===U&&ut.key===null&&(ut=ut.props.children),typeof ut=="object"&&ut!==null){switch(ut.$$typeof){case x:t:{for(var le=ut.key;et!==null;){if(et.key===le){if(le=ut.type,le===U){if(et.tag===7){s(rt,et.sibling),bt=f(et,ut.props.children),bt.return=rt,rt=bt;break t}}else if(et.elementType===le||typeof le=="object"&&le!==null&&le.$$typeof===y&&Rs(le)===et.type){s(rt,et.sibling),bt=f(et,ut.props),Mo(bt,ut),bt.return=rt,rt=bt;break t}s(rt,et);break}else i(rt,et);et=et.sibling}ut.type===U?(bt=Es(ut.props.children,rt.mode,bt,ut.key),bt.return=rt,rt=bt):(bt=kl(ut.type,ut.key,ut.props,null,rt.mode,bt),Mo(bt,ut),bt.return=rt,rt=bt)}return E(rt);case b:t:{for(le=ut.key;et!==null;){if(et.key===le)if(et.tag===4&&et.stateNode.containerInfo===ut.containerInfo&&et.stateNode.implementation===ut.implementation){s(rt,et.sibling),bt=f(et,ut.children||[]),bt.return=rt,rt=bt;break t}else{s(rt,et);break}else i(rt,et);et=et.sibling}bt=sf(ut,rt.mode,bt),bt.return=rt,rt=bt}return E(rt);case y:return ut=Rs(ut),Ke(rt,et,ut,bt)}if(X(ut))return ne(rt,et,ut,bt);if(q(ut)){if(le=q(ut),typeof le!="function")throw Error(a(150));return ut=le.call(ut),fe(rt,et,ut,bt)}if(typeof ut.then=="function")return Ke(rt,et,Jl(ut),bt);if(ut.$$typeof===H)return Ke(rt,et,ql(rt,ut),bt);Ql(rt,ut)}return typeof ut=="string"&&ut!==""||typeof ut=="number"||typeof ut=="bigint"?(ut=""+ut,et!==null&&et.tag===6?(s(rt,et.sibling),bt=f(et,ut),bt.return=rt,rt=bt):(s(rt,et),bt=af(ut,rt.mode,bt),bt.return=rt,rt=bt),E(rt)):s(rt,et)}return function(rt,et,ut,bt){try{yo=0;var le=Ke(rt,et,ut,bt);return fr=null,le}catch(se){if(se===ur||se===Zl)throw se;var Fe=ui(29,se,null,rt.mode);return Fe.lanes=bt,Fe.return=rt,Fe}finally{}}}var Ds=Gm(!0),Vm=Gm(!1),qa=!1;function vf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function _f(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ya(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Za(e,i,s){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(He&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=Vl(e),Tm(e,null,s),i}return Gl(e,l,i,s),Vl(e)}function Eo(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,Qn(e,s)}}function xf(e,i){var s=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,m=null;if(s=s.firstBaseUpdate,s!==null){do{var E={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};m===null?f=m=E:m=m.next=E,s=s.next}while(s!==null);m===null?f=m=i:m=m.next=i}else f=m=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:m,shared:l.shared,callbacks:l.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var Sf=!1;function bo(){if(Sf){var e=cr;if(e!==null)throw e}}function To(e,i,s,l){Sf=!1;var f=e.updateQueue;qa=!1;var m=f.firstBaseUpdate,E=f.lastBaseUpdate,N=f.shared.pending;if(N!==null){f.shared.pending=null;var Q=N,ft=Q.next;Q.next=null,E===null?m=ft:E.next=ft,E=Q;var Et=e.alternate;Et!==null&&(Et=Et.updateQueue,N=Et.lastBaseUpdate,N!==E&&(N===null?Et.firstBaseUpdate=ft:N.next=ft,Et.lastBaseUpdate=Q))}if(m!==null){var At=f.baseState;E=0,Et=ft=Q=null,N=m;do{var ht=N.lane&-536870913,vt=ht!==N.lane;if(vt?(Ce&ht)===ht:(l&ht)===ht){ht!==0&&ht===lr&&(Sf=!0),Et!==null&&(Et=Et.next={lane:0,tag:N.tag,payload:N.payload,callback:null,next:null});t:{var ne=e,fe=N;ht=i;var Ke=s;switch(fe.tag){case 1:if(ne=fe.payload,typeof ne=="function"){At=ne.call(Ke,At,ht);break t}At=ne;break t;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=fe.payload,ht=typeof ne=="function"?ne.call(Ke,At,ht):ne,ht==null)break t;At=v({},At,ht);break t;case 2:qa=!0}}ht=N.callback,ht!==null&&(e.flags|=64,vt&&(e.flags|=8192),vt=f.callbacks,vt===null?f.callbacks=[ht]:vt.push(ht))}else vt={lane:ht,tag:N.tag,payload:N.payload,callback:N.callback,next:null},Et===null?(ft=Et=vt,Q=At):Et=Et.next=vt,E|=ht;if(N=N.next,N===null){if(N=f.shared.pending,N===null)break;vt=N,N=vt.next,vt.next=null,f.lastBaseUpdate=vt,f.shared.pending=null}}while(!0);Et===null&&(Q=At),f.baseState=Q,f.firstBaseUpdate=ft,f.lastBaseUpdate=Et,m===null&&(f.shared.lanes=0),$a|=E,e.lanes=E,e.memoizedState=At}}function km(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function Xm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)km(s[e],i)}var hr=R(null),jl=R(0);function Wm(e,i){e=Sa,it(jl,e),it(hr,i),Sa=e|i.baseLanes}function yf(){it(jl,Sa),it(hr,hr.current)}function Mf(){Sa=jl.current,K(hr),K(jl)}var fi=R(null),Ri=null;function Ka(e){var i=e.alternate;it(cn,cn.current&1),it(fi,e),Ri===null&&(i===null||hr.current!==null||i.memoizedState!==null)&&(Ri=e)}function Ef(e){it(cn,cn.current),it(fi,e),Ri===null&&(Ri=e)}function qm(e){e.tag===22?(it(cn,cn.current),it(fi,e),Ri===null&&(Ri=e)):Ja()}function Ja(){it(cn,cn.current),it(fi,fi.current)}function hi(e){K(fi),Ri===e&&(Ri=null),K(cn)}var cn=R(0);function $l(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||Ch(s)||Dh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ha=0,_e=null,Ye=null,gn=null,tc=!1,dr=!1,Us=!1,ec=0,Ao=0,pr=null,IS=0;function on(){throw Error(a(321))}function bf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!ci(e[s],i[s]))return!1;return!0}function Tf(e,i,s,l,f,m){return ha=m,_e=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,P.H=e===null||e.memoizedState===null?C0:Hf,Us=!1,m=s(l,f),Us=!1,dr&&(m=Zm(i,s,l,f)),Ym(e),m}function Ym(e){P.H=Co;var i=Ye!==null&&Ye.next!==null;if(ha=0,gn=Ye=_e=null,tc=!1,Ao=0,pr=null,i)throw Error(a(300));e===null||vn||(e=e.dependencies,e!==null&&Wl(e)&&(vn=!0))}function Zm(e,i,s,l){_e=e;var f=0;do{if(dr&&(pr=null),Ao=0,dr=!1,25<=f)throw Error(a(301));if(f+=1,gn=Ye=null,e.updateQueue!=null){var m=e.updateQueue;m.lastEffect=null,m.events=null,m.stores=null,m.memoCache!=null&&(m.memoCache.index=0)}P.H=D0,m=i(s,l)}while(dr);return m}function FS(){var e=P.H,i=e.useState()[0];return i=typeof i.then=="function"?wo(i):i,e=e.useState()[0],(Ye!==null?Ye.memoizedState:null)!==e&&(_e.flags|=1024),i}function Af(){var e=ec!==0;return ec=0,e}function wf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function Rf(e){if(tc){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}tc=!1}ha=0,gn=Ye=_e=null,dr=!1,Ao=ec=0,pr=null}function Wn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gn===null?_e.memoizedState=gn=e:gn=gn.next=e,gn}function un(){if(Ye===null){var e=_e.alternate;e=e!==null?e.memoizedState:null}else e=Ye.next;var i=gn===null?_e.memoizedState:gn.next;if(i!==null)gn=i,Ye=e;else{if(e===null)throw _e.alternate===null?Error(a(467)):Error(a(310));Ye=e,e={memoizedState:Ye.memoizedState,baseState:Ye.baseState,baseQueue:Ye.baseQueue,queue:Ye.queue,next:null},gn===null?_e.memoizedState=gn=e:gn=gn.next=e}return gn}function nc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function wo(e){var i=Ao;return Ao+=1,pr===null&&(pr=[]),e=zm(pr,e,i),i=_e,(gn===null?i.memoizedState:gn.next)===null&&(i=i.alternate,P.H=i===null||i.memoizedState===null?C0:Hf),e}function ic(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return wo(e);if(e.$$typeof===H)return Nn(e)}throw Error(a(438,String(e)))}function Cf(e){var i=null,s=_e.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=_e.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=nc(),_e.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),l=0;l<e;l++)s[l]=B;return i.index++,s}function da(e,i){return typeof i=="function"?i(e):i}function ac(e){var i=un();return Df(i,Ye,e)}function Df(e,i,s){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=e.baseQueue,m=l.pending;if(m!==null){if(f!==null){var E=f.next;f.next=m.next,m.next=E}i.baseQueue=f=m,l.pending=null}if(m=e.baseState,f===null)e.memoizedState=m;else{i=f.next;var N=E=null,Q=null,ft=i,Et=!1;do{var At=ft.lane&-536870913;if(At!==ft.lane?(Ce&At)===At:(ha&At)===At){var ht=ft.revertLane;if(ht===0)Q!==null&&(Q=Q.next={lane:0,revertLane:0,gesture:null,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null}),At===lr&&(Et=!0);else if((ha&ht)===ht){ft=ft.next,ht===lr&&(Et=!0);continue}else At={lane:0,revertLane:ft.revertLane,gesture:null,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null},Q===null?(N=Q=At,E=m):Q=Q.next=At,_e.lanes|=ht,$a|=ht;At=ft.action,Us&&s(m,At),m=ft.hasEagerState?ft.eagerState:s(m,At)}else ht={lane:At,revertLane:ft.revertLane,gesture:ft.gesture,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null},Q===null?(N=Q=ht,E=m):Q=Q.next=ht,_e.lanes|=At,$a|=At;ft=ft.next}while(ft!==null&&ft!==i);if(Q===null?E=m:Q.next=N,!ci(m,e.memoizedState)&&(vn=!0,Et&&(s=cr,s!==null)))throw s;e.memoizedState=m,e.baseState=E,e.baseQueue=Q,l.lastRenderedState=m}return f===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Uf(e){var i=un(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var l=s.dispatch,f=s.pending,m=i.memoizedState;if(f!==null){s.pending=null;var E=f=f.next;do m=e(m,E.action),E=E.next;while(E!==f);ci(m,i.memoizedState)||(vn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),s.lastRenderedState=m}return[m,l]}function Km(e,i,s){var l=_e,f=un(),m=Ue;if(m){if(s===void 0)throw Error(a(407));s=s()}else s=i();var E=!ci((Ye||f).memoizedState,s);if(E&&(f.memoizedState=s,vn=!0),f=f.queue,Of(jm.bind(null,l,f,e),[e]),f.getSnapshot!==i||E||gn!==null&&gn.memoizedState.tag&1){if(l.flags|=2048,mr(9,{destroy:void 0},Qm.bind(null,l,f,s,i),null),Qe===null)throw Error(a(349));m||(ha&127)!==0||Jm(l,i,s)}return s}function Jm(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=_e.updateQueue,i===null?(i=nc(),_e.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Qm(e,i,s,l){i.value=s,i.getSnapshot=l,$m(i)&&t0(e)}function jm(e,i,s){return s(function(){$m(i)&&t0(e)})}function $m(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!ci(e,s)}catch{return!0}}function t0(e){var i=Ms(e,2);i!==null&&ai(i,e,2)}function Lf(e){var i=Wn();if(typeof e=="function"){var s=e;if(e=s(),Us){st(!0);try{s()}finally{st(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:e},i}function e0(e,i,s,l){return e.baseState=s,Df(e,Ye,typeof l=="function"?l:da)}function zS(e,i,s,l,f){if(oc(e))throw Error(a(485));if(e=i.action,e!==null){var m={payload:f,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(E){m.listeners.push(E)}};P.T!==null?s(!0):m.isTransition=!1,l(m),s=i.pending,s===null?(m.next=i.pending=m,n0(i,m)):(m.next=s.next,i.pending=s.next=m)}}function n0(e,i){var s=i.action,l=i.payload,f=e.state;if(i.isTransition){var m=P.T,E={};P.T=E;try{var N=s(f,l),Q=P.S;Q!==null&&Q(E,N),i0(e,i,N)}catch(ft){Nf(e,i,ft)}finally{m!==null&&E.types!==null&&(m.types=E.types),P.T=m}}else try{m=s(f,l),i0(e,i,m)}catch(ft){Nf(e,i,ft)}}function i0(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){a0(e,i,l)},function(l){return Nf(e,i,l)}):a0(e,i,s)}function a0(e,i,s){i.status="fulfilled",i.value=s,s0(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,n0(e,s)))}function Nf(e,i,s){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,s0(i),i=i.next;while(i!==l)}e.action=null}function s0(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function r0(e,i){return i}function o0(e,i){if(Ue){var s=Qe.formState;if(s!==null){t:{var l=_e;if(Ue){if($e){e:{for(var f=$e,m=wi;f.nodeType!==8;){if(!m){f=null;break e}if(f=Ci(f.nextSibling),f===null){f=null;break e}}m=f.data,f=m==="F!"||m==="F"?f:null}if(f){$e=Ci(f.nextSibling),l=f.data==="F!";break t}}Xa(l)}l=!1}l&&(i=s[0])}}return s=Wn(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:r0,lastRenderedState:i},s.queue=l,s=A0.bind(null,_e,l),l.dispatch=s,l=Lf(!1),m=Bf.bind(null,_e,!1,l.queue),l=Wn(),f={state:i,dispatch:null,action:e,pending:null},l.queue=f,s=zS.bind(null,_e,f,m,s),f.dispatch=s,l.memoizedState=e,[i,s,!1]}function l0(e){var i=un();return c0(i,Ye,e)}function c0(e,i,s){if(i=Df(e,i,r0)[0],e=ac(da)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=wo(i)}catch(E){throw E===ur?Zl:E}else l=i;i=un();var f=i.queue,m=f.dispatch;return s!==i.memoizedState&&(_e.flags|=2048,mr(9,{destroy:void 0},BS.bind(null,f,s),null)),[l,m,e]}function BS(e,i){e.action=i}function u0(e){var i=un(),s=Ye;if(s!==null)return c0(i,s,e);un(),i=i.memoizedState,s=un();var l=s.queue.dispatch;return s.memoizedState=e,[i,l,!1]}function mr(e,i,s,l){return e={tag:e,create:s,deps:l,inst:i,next:null},i=_e.updateQueue,i===null&&(i=nc(),_e.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(l=s.next,s.next=e,e.next=l,i.lastEffect=e),e}function f0(){return un().memoizedState}function sc(e,i,s,l){var f=Wn();_e.flags|=e,f.memoizedState=mr(1|i,{destroy:void 0},s,l===void 0?null:l)}function rc(e,i,s,l){var f=un();l=l===void 0?null:l;var m=f.memoizedState.inst;Ye!==null&&l!==null&&bf(l,Ye.memoizedState.deps)?f.memoizedState=mr(i,m,s,l):(_e.flags|=e,f.memoizedState=mr(1|i,m,s,l))}function h0(e,i){sc(8390656,8,e,i)}function Of(e,i){rc(2048,8,e,i)}function HS(e){_e.flags|=4;var i=_e.updateQueue;if(i===null)i=nc(),_e.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function d0(e){var i=un().memoizedState;return HS({ref:i,nextImpl:e}),function(){if((He&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function p0(e,i){return rc(4,2,e,i)}function m0(e,i){return rc(4,4,e,i)}function g0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function v0(e,i,s){s=s!=null?s.concat([e]):null,rc(4,4,g0.bind(null,i,e),s)}function Pf(){}function _0(e,i){var s=un();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&bf(i,l[1])?l[0]:(s.memoizedState=[e,i],e)}function x0(e,i){var s=un();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&bf(i,l[1]))return l[0];if(l=e(),Us){st(!0);try{e()}finally{st(!1)}}return s.memoizedState=[l,i],l}function If(e,i,s){return s===void 0||(ha&1073741824)!==0&&(Ce&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=Sg(),_e.lanes|=e,$a|=e,s)}function S0(e,i,s,l){return ci(s,i)?s:hr.current!==null?(e=If(e,s,l),ci(e,i)||(vn=!0),e):(ha&42)===0||(ha&1073741824)!==0&&(Ce&261930)===0?(vn=!0,e.memoizedState=s):(e=Sg(),_e.lanes|=e,$a|=e,i)}function y0(e,i,s,l,f){var m=F.p;F.p=m!==0&&8>m?m:8;var E=P.T,N={};P.T=N,Bf(e,!1,i,s);try{var Q=f(),ft=P.S;if(ft!==null&&ft(N,Q),Q!==null&&typeof Q=="object"&&typeof Q.then=="function"){var Et=PS(Q,l);Ro(e,i,Et,mi(e))}else Ro(e,i,l,mi(e))}catch(At){Ro(e,i,{then:function(){},status:"rejected",reason:At},mi())}finally{F.p=m,E!==null&&N.types!==null&&(E.types=N.types),P.T=E}}function GS(){}function Ff(e,i,s,l){if(e.tag!==5)throw Error(a(476));var f=M0(e).queue;y0(e,f,i,Y,s===null?GS:function(){return E0(e),s(l)})}function M0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:Y,baseState:Y,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:Y},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function E0(e){var i=M0(e);i.next===null&&(i=e.alternate.memoizedState),Ro(e,i.next.queue,{},mi())}function zf(){return Nn(Wo)}function b0(){return un().memoizedState}function T0(){return un().memoizedState}function VS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=mi();e=Ya(s);var l=Za(i,e,s);l!==null&&(ai(l,i,s),Eo(l,i,s)),i={cache:df()},e.payload=i;return}i=i.return}}function kS(e,i,s){var l=mi();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},oc(e)?w0(i,s):(s=ef(e,i,s,l),s!==null&&(ai(s,e,l),R0(s,i,l)))}function A0(e,i,s){var l=mi();Ro(e,i,s,l)}function Ro(e,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(oc(e))w0(i,f);else{var m=e.alternate;if(e.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var E=i.lastRenderedState,N=m(E,s);if(f.hasEagerState=!0,f.eagerState=N,ci(N,E))return Gl(e,i,f,0),Qe===null&&Hl(),!1}catch{}finally{}if(s=ef(e,i,f,l),s!==null)return ai(s,e,l),R0(s,i,l),!0}return!1}function Bf(e,i,s,l){if(l={lane:2,revertLane:vh(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},oc(e)){if(i)throw Error(a(479))}else i=ef(e,s,l,2),i!==null&&ai(i,e,2)}function oc(e){var i=e.alternate;return e===_e||i!==null&&i===_e}function w0(e,i){dr=tc=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function R0(e,i,s){if((s&4194048)!==0){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,Qn(e,s)}}var Co={readContext:Nn,use:ic,useCallback:on,useContext:on,useEffect:on,useImperativeHandle:on,useLayoutEffect:on,useInsertionEffect:on,useMemo:on,useReducer:on,useRef:on,useState:on,useDebugValue:on,useDeferredValue:on,useTransition:on,useSyncExternalStore:on,useId:on,useHostTransitionStatus:on,useFormState:on,useActionState:on,useOptimistic:on,useMemoCache:on,useCacheRefresh:on};Co.useEffectEvent=on;var C0={readContext:Nn,use:ic,useCallback:function(e,i){return Wn().memoizedState=[e,i===void 0?null:i],e},useContext:Nn,useEffect:h0,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,sc(4194308,4,g0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return sc(4194308,4,e,i)},useInsertionEffect:function(e,i){sc(4,2,e,i)},useMemo:function(e,i){var s=Wn();i=i===void 0?null:i;var l=e();if(Us){st(!0);try{e()}finally{st(!1)}}return s.memoizedState=[l,i],l},useReducer:function(e,i,s){var l=Wn();if(s!==void 0){var f=s(i);if(Us){st(!0);try{s(i)}finally{st(!1)}}}else f=i;return l.memoizedState=l.baseState=f,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:f},l.queue=e,e=e.dispatch=kS.bind(null,_e,e),[l.memoizedState,e]},useRef:function(e){var i=Wn();return e={current:e},i.memoizedState=e},useState:function(e){e=Lf(e);var i=e.queue,s=A0.bind(null,_e,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:Pf,useDeferredValue:function(e,i){var s=Wn();return If(s,e,i)},useTransition:function(){var e=Lf(!1);return e=y0.bind(null,_e,e.queue,!0,!1),Wn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var l=_e,f=Wn();if(Ue){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Qe===null)throw Error(a(349));(Ce&127)!==0||Jm(l,i,s)}f.memoizedState=s;var m={value:s,getSnapshot:i};return f.queue=m,h0(jm.bind(null,l,m,e),[e]),l.flags|=2048,mr(9,{destroy:void 0},Qm.bind(null,l,m,s,i),null),s},useId:function(){var e=Wn(),i=Qe.identifierPrefix;if(Ue){var s=Zi,l=Yi;s=(l&~(1<<32-xt(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=ec++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=IS++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:zf,useFormState:o0,useActionState:o0,useOptimistic:function(e){var i=Wn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Bf.bind(null,_e,!0,s),s.dispatch=i,[e,i]},useMemoCache:Cf,useCacheRefresh:function(){return Wn().memoizedState=VS.bind(null,_e)},useEffectEvent:function(e){var i=Wn(),s={impl:e};return i.memoizedState=s,function(){if((He&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Hf={readContext:Nn,use:ic,useCallback:_0,useContext:Nn,useEffect:Of,useImperativeHandle:v0,useInsertionEffect:p0,useLayoutEffect:m0,useMemo:x0,useReducer:ac,useRef:f0,useState:function(){return ac(da)},useDebugValue:Pf,useDeferredValue:function(e,i){var s=un();return S0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=ac(da)[0],i=un().memoizedState;return[typeof e=="boolean"?e:wo(e),i]},useSyncExternalStore:Km,useId:b0,useHostTransitionStatus:zf,useFormState:l0,useActionState:l0,useOptimistic:function(e,i){var s=un();return e0(s,Ye,e,i)},useMemoCache:Cf,useCacheRefresh:T0};Hf.useEffectEvent=d0;var D0={readContext:Nn,use:ic,useCallback:_0,useContext:Nn,useEffect:Of,useImperativeHandle:v0,useInsertionEffect:p0,useLayoutEffect:m0,useMemo:x0,useReducer:Uf,useRef:f0,useState:function(){return Uf(da)},useDebugValue:Pf,useDeferredValue:function(e,i){var s=un();return Ye===null?If(s,e,i):S0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=Uf(da)[0],i=un().memoizedState;return[typeof e=="boolean"?e:wo(e),i]},useSyncExternalStore:Km,useId:b0,useHostTransitionStatus:zf,useFormState:u0,useActionState:u0,useOptimistic:function(e,i){var s=un();return Ye!==null?e0(s,Ye,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:Cf,useCacheRefresh:T0};D0.useEffectEvent=d0;function Gf(e,i,s,l){i=e.memoizedState,s=s(l,i),s=s==null?i:v({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Vf={enqueueSetState:function(e,i,s){e=e._reactInternals;var l=mi(),f=Ya(l);f.payload=i,s!=null&&(f.callback=s),i=Za(e,f,l),i!==null&&(ai(i,e,l),Eo(i,e,l))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var l=mi(),f=Ya(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=Za(e,f,l),i!==null&&(ai(i,e,l),Eo(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=mi(),l=Ya(s);l.tag=2,i!=null&&(l.callback=i),i=Za(e,l,s),i!==null&&(ai(i,e,s),Eo(i,e,s))}};function U0(e,i,s,l,f,m,E){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,m,E):i.prototype&&i.prototype.isPureReactComponent?!mo(s,l)||!mo(f,m):!0}function L0(e,i,s,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==e&&Vf.enqueueReplaceState(i,i.state,null)}function Ls(e,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(e=e.defaultProps){s===i&&(s=v({},s));for(var f in e)s[f]===void 0&&(s[f]=e[f])}return s}function N0(e){Bl(e)}function O0(e){console.error(e)}function P0(e){Bl(e)}function lc(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function I0(e,i,s){try{var l=e.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function kf(e,i,s){return s=Ya(s),s.tag=3,s.payload={element:null},s.callback=function(){lc(e,i)},s}function F0(e){return e=Ya(e),e.tag=3,e}function z0(e,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var m=l.value;e.payload=function(){return f(m)},e.callback=function(){I0(i,s,l)}}var E=s.stateNode;E!==null&&typeof E.componentDidCatch=="function"&&(e.callback=function(){I0(i,s,l),typeof f!="function"&&(ts===null?ts=new Set([this]):ts.add(this));var N=l.stack;this.componentDidCatch(l.value,{componentStack:N!==null?N:""})})}function XS(e,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&or(i,s,f,!0),s=fi.current,s!==null){switch(s.tag){case 31:case 13:return Ri===null?Sc():s.alternate===null&&ln===0&&(ln=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===Kl?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),ph(e,l,f)),!1;case 22:return s.flags|=65536,l===Kl?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),ph(e,l,f)),!1}throw Error(a(435,s.tag))}return ph(e,l,f),Sc(),!1}if(Ue)return i=fi.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==lf&&(e=Error(a(422),{cause:l}),_o(bi(e,s)))):(l!==lf&&(i=Error(a(423),{cause:l}),_o(bi(i,s))),e=e.current.alternate,e.flags|=65536,f&=-f,e.lanes|=f,l=bi(l,s),f=kf(e.stateNode,l,f),xf(e,f),ln!==4&&(ln=2)),!1;var m=Error(a(520),{cause:l});if(m=bi(m,s),Fo===null?Fo=[m]:Fo.push(m),ln!==4&&(ln=2),i===null)return!0;l=bi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=f&-f,s.lanes|=e,e=kf(s.stateNode,l,e),xf(s,e),!1;case 1:if(i=s.type,m=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(ts===null||!ts.has(m))))return s.flags|=65536,f&=-f,s.lanes|=f,f=F0(f),z0(f,e,s,l),xf(s,f),!1}s=s.return}while(s!==null);return!1}var Xf=Error(a(461)),vn=!1;function On(e,i,s,l){i.child=e===null?Vm(i,null,s,l):Ds(i,e.child,s,l)}function B0(e,i,s,l,f){s=s.render;var m=i.ref;if("ref"in l){var E={};for(var N in l)N!=="ref"&&(E[N]=l[N])}else E=l;return As(i),l=Tf(e,i,s,E,m,f),N=Af(),e!==null&&!vn?(wf(e,i,f),pa(e,i,f)):(Ue&&N&&rf(i),i.flags|=1,On(e,i,l,f),i.child)}function H0(e,i,s,l,f){if(e===null){var m=s.type;return typeof m=="function"&&!nf(m)&&m.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=m,G0(e,i,m,l,f)):(e=kl(s.type,null,l,i,i.mode,f),e.ref=i.ref,e.return=i,i.child=e)}if(m=e.child,!jf(e,f)){var E=m.memoizedProps;if(s=s.compare,s=s!==null?s:mo,s(E,l)&&e.ref===i.ref)return pa(e,i,f)}return i.flags|=1,e=la(m,l),e.ref=i.ref,e.return=i,i.child=e}function G0(e,i,s,l,f){if(e!==null){var m=e.memoizedProps;if(mo(m,l)&&e.ref===i.ref)if(vn=!1,i.pendingProps=l=m,jf(e,f))(e.flags&131072)!==0&&(vn=!0);else return i.lanes=e.lanes,pa(e,i,f)}return Wf(e,i,s,l,f)}function V0(e,i,s,l){var f=l.children,m=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(m=m!==null?m.baseLanes|s:s,e!==null){for(l=i.child=e.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~m}else l=0,i.child=null;return k0(e,i,m,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Yl(i,m!==null?m.cachePool:null),m!==null?Wm(i,m):yf(),qm(i);else return l=i.lanes=536870912,k0(e,i,m!==null?m.baseLanes|s:s,s,l)}else m!==null?(Yl(i,m.cachePool),Wm(i,m),Ja(),i.memoizedState=null):(e!==null&&Yl(i,null),yf(),Ja());return On(e,i,f,s),i.child}function Do(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function k0(e,i,s,l,f){var m=mf();return m=m===null?null:{parent:mn._currentValue,pool:m},i.memoizedState={baseLanes:s,cachePool:m},e!==null&&Yl(i,null),yf(),qm(i),e!==null&&or(e,i,l,!0),i.childLanes=f,null}function cc(e,i){return i=fc({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function X0(e,i,s){return Ds(i,e.child,null,s),e=cc(i,i.pendingProps),e.flags|=2,hi(i),i.memoizedState=null,e}function WS(e,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ue){if(l.mode==="hidden")return e=cc(i,l),i.lanes=536870912,Do(null,e);if(Ef(i),(e=$e)?(e=nv(e,wi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Va!==null?{id:Yi,overflow:Zi}:null,retryLane:536870912,hydrationErrors:null},s=wm(e),s.return=i,i.child=s,Ln=i,$e=null)):e=null,e===null)throw Xa(i);return i.lanes=536870912,null}return cc(i,l)}var m=e.memoizedState;if(m!==null){var E=m.dehydrated;if(Ef(i),f)if(i.flags&256)i.flags&=-257,i=X0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(vn||or(e,i,s,!1),f=(s&e.childLanes)!==0,vn||f){if(l=Qe,l!==null&&(E=oi(l,s),E!==0&&E!==m.retryLane))throw m.retryLane=E,Ms(e,E),ai(l,e,E),Xf;Sc(),i=X0(e,i,s)}else e=m.treeContext,$e=Ci(E.nextSibling),Ln=i,Ue=!0,ka=null,wi=!1,e!==null&&Dm(i,e),i=cc(i,l),i.flags|=4096;return i}return e=la(e.child,{mode:l.mode,children:l.children}),e.ref=i.ref,i.child=e,e.return=i,e}function uc(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function Wf(e,i,s,l,f){return As(i),s=Tf(e,i,s,l,void 0,f),l=Af(),e!==null&&!vn?(wf(e,i,f),pa(e,i,f)):(Ue&&l&&rf(i),i.flags|=1,On(e,i,s,f),i.child)}function W0(e,i,s,l,f,m){return As(i),i.updateQueue=null,s=Zm(i,l,s,f),Ym(e),l=Af(),e!==null&&!vn?(wf(e,i,m),pa(e,i,m)):(Ue&&l&&rf(i),i.flags|=1,On(e,i,s,m),i.child)}function q0(e,i,s,l,f){if(As(i),i.stateNode===null){var m=ir,E=s.contextType;typeof E=="object"&&E!==null&&(m=Nn(E)),m=new s(l,m),i.memoizedState=m.state!==null&&m.state!==void 0?m.state:null,m.updater=Vf,i.stateNode=m,m._reactInternals=i,m=i.stateNode,m.props=l,m.state=i.memoizedState,m.refs={},vf(i),E=s.contextType,m.context=typeof E=="object"&&E!==null?Nn(E):ir,m.state=i.memoizedState,E=s.getDerivedStateFromProps,typeof E=="function"&&(Gf(i,s,E,l),m.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(E=m.state,typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount(),E!==m.state&&Vf.enqueueReplaceState(m,m.state,null),To(i,l,m,f),bo(),m.state=i.memoizedState),typeof m.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){m=i.stateNode;var N=i.memoizedProps,Q=Ls(s,N);m.props=Q;var ft=m.context,Et=s.contextType;E=ir,typeof Et=="object"&&Et!==null&&(E=Nn(Et));var At=s.getDerivedStateFromProps;Et=typeof At=="function"||typeof m.getSnapshotBeforeUpdate=="function",N=i.pendingProps!==N,Et||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(N||ft!==E)&&L0(i,m,l,E),qa=!1;var ht=i.memoizedState;m.state=ht,To(i,l,m,f),bo(),ft=i.memoizedState,N||ht!==ft||qa?(typeof At=="function"&&(Gf(i,s,At,l),ft=i.memoizedState),(Q=qa||U0(i,s,Q,l,ht,ft,E))?(Et||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount()),typeof m.componentDidMount=="function"&&(i.flags|=4194308)):(typeof m.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=ft),m.props=l,m.state=ft,m.context=E,l=Q):(typeof m.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{m=i.stateNode,_f(e,i),E=i.memoizedProps,Et=Ls(s,E),m.props=Et,At=i.pendingProps,ht=m.context,ft=s.contextType,Q=ir,typeof ft=="object"&&ft!==null&&(Q=Nn(ft)),N=s.getDerivedStateFromProps,(ft=typeof N=="function"||typeof m.getSnapshotBeforeUpdate=="function")||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(E!==At||ht!==Q)&&L0(i,m,l,Q),qa=!1,ht=i.memoizedState,m.state=ht,To(i,l,m,f),bo();var vt=i.memoizedState;E!==At||ht!==vt||qa||e!==null&&e.dependencies!==null&&Wl(e.dependencies)?(typeof N=="function"&&(Gf(i,s,N,l),vt=i.memoizedState),(Et=qa||U0(i,s,Et,l,ht,vt,Q)||e!==null&&e.dependencies!==null&&Wl(e.dependencies))?(ft||typeof m.UNSAFE_componentWillUpdate!="function"&&typeof m.componentWillUpdate!="function"||(typeof m.componentWillUpdate=="function"&&m.componentWillUpdate(l,vt,Q),typeof m.UNSAFE_componentWillUpdate=="function"&&m.UNSAFE_componentWillUpdate(l,vt,Q)),typeof m.componentDidUpdate=="function"&&(i.flags|=4),typeof m.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof m.componentDidUpdate!="function"||E===e.memoizedProps&&ht===e.memoizedState||(i.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||E===e.memoizedProps&&ht===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=vt),m.props=l,m.state=vt,m.context=Q,l=Et):(typeof m.componentDidUpdate!="function"||E===e.memoizedProps&&ht===e.memoizedState||(i.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||E===e.memoizedProps&&ht===e.memoizedState||(i.flags|=1024),l=!1)}return m=l,uc(e,i),l=(i.flags&128)!==0,m||l?(m=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:m.render(),i.flags|=1,e!==null&&l?(i.child=Ds(i,e.child,null,f),i.child=Ds(i,null,s,f)):On(e,i,s,f),i.memoizedState=m.state,e=i.child):e=pa(e,i,f),e}function Y0(e,i,s,l){return bs(),i.flags|=256,On(e,i,s,l),i.child}var qf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yf(e){return{baseLanes:e,cachePool:Im()}}function Zf(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=pi),e}function Z0(e,i,s){var l=i.pendingProps,f=!1,m=(i.flags&128)!==0,E;if((E=m)||(E=e!==null&&e.memoizedState===null?!1:(cn.current&2)!==0),E&&(f=!0,i.flags&=-129),E=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ue){if(f?Ka(i):Ja(),(e=$e)?(e=nv(e,wi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Va!==null?{id:Yi,overflow:Zi}:null,retryLane:536870912,hydrationErrors:null},s=wm(e),s.return=i,i.child=s,Ln=i,$e=null)):e=null,e===null)throw Xa(i);return Dh(e)?i.lanes=32:i.lanes=536870912,null}var N=l.children;return l=l.fallback,f?(Ja(),f=i.mode,N=fc({mode:"hidden",children:N},f),l=Es(l,f,s,null),N.return=i,l.return=i,N.sibling=l,i.child=N,l=i.child,l.memoizedState=Yf(s),l.childLanes=Zf(e,E,s),i.memoizedState=qf,Do(null,l)):(Ka(i),Kf(i,N))}var Q=e.memoizedState;if(Q!==null&&(N=Q.dehydrated,N!==null)){if(m)i.flags&256?(Ka(i),i.flags&=-257,i=Jf(e,i,s)):i.memoizedState!==null?(Ja(),i.child=e.child,i.flags|=128,i=null):(Ja(),N=l.fallback,f=i.mode,l=fc({mode:"visible",children:l.children},f),N=Es(N,f,s,null),N.flags|=2,l.return=i,N.return=i,l.sibling=N,i.child=l,Ds(i,e.child,null,s),l=i.child,l.memoizedState=Yf(s),l.childLanes=Zf(e,E,s),i.memoizedState=qf,i=Do(null,l));else if(Ka(i),Dh(N)){if(E=N.nextSibling&&N.nextSibling.dataset,E)var ft=E.dgst;E=ft,l=Error(a(419)),l.stack="",l.digest=E,_o({value:l,source:null,stack:null}),i=Jf(e,i,s)}else if(vn||or(e,i,s,!1),E=(s&e.childLanes)!==0,vn||E){if(E=Qe,E!==null&&(l=oi(E,s),l!==0&&l!==Q.retryLane))throw Q.retryLane=l,Ms(e,l),ai(E,e,l),Xf;Ch(N)||Sc(),i=Jf(e,i,s)}else Ch(N)?(i.flags|=192,i.child=e.child,i=null):(e=Q.treeContext,$e=Ci(N.nextSibling),Ln=i,Ue=!0,ka=null,wi=!1,e!==null&&Dm(i,e),i=Kf(i,l.children),i.flags|=4096);return i}return f?(Ja(),N=l.fallback,f=i.mode,Q=e.child,ft=Q.sibling,l=la(Q,{mode:"hidden",children:l.children}),l.subtreeFlags=Q.subtreeFlags&65011712,ft!==null?N=la(ft,N):(N=Es(N,f,s,null),N.flags|=2),N.return=i,l.return=i,l.sibling=N,i.child=l,Do(null,l),l=i.child,N=e.child.memoizedState,N===null?N=Yf(s):(f=N.cachePool,f!==null?(Q=mn._currentValue,f=f.parent!==Q?{parent:Q,pool:Q}:f):f=Im(),N={baseLanes:N.baseLanes|s,cachePool:f}),l.memoizedState=N,l.childLanes=Zf(e,E,s),i.memoizedState=qf,Do(e.child,l)):(Ka(i),s=e.child,e=s.sibling,s=la(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,e!==null&&(E=i.deletions,E===null?(i.deletions=[e],i.flags|=16):E.push(e)),i.child=s,i.memoizedState=null,s)}function Kf(e,i){return i=fc({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function fc(e,i){return e=ui(22,e,null,i),e.lanes=0,e}function Jf(e,i,s){return Ds(i,e.child,null,s),e=Kf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function K0(e,i,s){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),ff(e.return,i,s)}function Qf(e,i,s,l,f,m){var E=e.memoizedState;E===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:m}:(E.isBackwards=i,E.rendering=null,E.renderingStartTime=0,E.last=l,E.tail=s,E.tailMode=f,E.treeForkCount=m)}function J0(e,i,s){var l=i.pendingProps,f=l.revealOrder,m=l.tail;l=l.children;var E=cn.current,N=(E&2)!==0;if(N?(E=E&1|2,i.flags|=128):E&=1,it(cn,E),On(e,i,l,s),l=Ue?vo:0,!N&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&K0(e,s,i);else if(e.tag===19)K0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)e=s.alternate,e!==null&&$l(e)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),Qf(i,!1,f,s,m,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(e=f.alternate,e!==null&&$l(e)===null){i.child=f;break}e=f.sibling,f.sibling=s,s=f,f=e}Qf(i,!0,s,null,m,l);break;case"together":Qf(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function pa(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),$a|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(or(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=la(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=la(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function jf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Wl(e)))}function qS(e,i,s){switch(i.tag){case 3:dt(i,i.stateNode.containerInfo),Wa(i,mn,e.memoizedState.cache),bs();break;case 27:case 5:ee(i);break;case 4:dt(i,i.stateNode.containerInfo);break;case 10:Wa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,Ef(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(Ka(i),i.flags|=128,null):(s&i.child.childLanes)!==0?Z0(e,i,s):(Ka(i),e=pa(e,i,s),e!==null?e.sibling:null);Ka(i);break;case 19:var f=(e.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(or(e,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return J0(e,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),it(cn,cn.current),l)break;return null;case 22:return i.lanes=0,V0(e,i,s,i.pendingProps);case 24:Wa(i,mn,e.memoizedState.cache)}return pa(e,i,s)}function Q0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)vn=!0;else{if(!jf(e,s)&&(i.flags&128)===0)return vn=!1,qS(e,i,s);vn=(e.flags&131072)!==0}else vn=!1,Ue&&(i.flags&1048576)!==0&&Cm(i,vo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var l=i.pendingProps;if(e=Rs(i.elementType),i.type=e,typeof e=="function")nf(e)?(l=Ls(e,l),i.tag=1,i=q0(null,i,e,l,s)):(i.tag=0,i=Wf(null,i,e,l,s));else{if(e!=null){var f=e.$$typeof;if(f===A){i.tag=11,i=B0(null,i,e,l,s);break t}else if(f===L){i.tag=14,i=H0(null,i,e,l,s);break t}}throw i=I(e)||e,Error(a(306,i,""))}}return i;case 0:return Wf(e,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=Ls(l,i.pendingProps),q0(e,i,l,f,s);case 3:t:{if(dt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));l=i.pendingProps;var m=i.memoizedState;f=m.element,_f(e,i),To(i,l,null,s);var E=i.memoizedState;if(l=E.cache,Wa(i,mn,l),l!==m.cache&&hf(i,[mn],s,!0),bo(),l=E.element,m.isDehydrated)if(m={element:l,isDehydrated:!1,cache:E.cache},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){i=Y0(e,i,l,s);break t}else if(l!==f){f=bi(Error(a(424)),i),_o(f),i=Y0(e,i,l,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for($e=Ci(e.firstChild),Ln=i,Ue=!0,ka=null,wi=!0,s=Vm(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(bs(),l===f){i=pa(e,i,s);break t}On(e,i,l,s)}i=i.child}return i;case 26:return uc(e,i),e===null?(s=lv(i.type,null,i.pendingProps,null))?i.memoizedState=s:Ue||(s=i.type,e=i.pendingProps,l=wc(Pt.current).createElement(s),l[hn]=i,l[Un]=e,Pn(l,s,e),dn(l),i.stateNode=l):i.memoizedState=lv(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return ee(i),e===null&&Ue&&(l=i.stateNode=sv(i.type,i.pendingProps,Pt.current),Ln=i,wi=!0,f=$e,as(i.type)?(Uh=f,$e=Ci(l.firstChild)):$e=f),On(e,i,i.pendingProps.children,s),uc(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ue&&((f=l=$e)&&(l=My(l,i.type,i.pendingProps,wi),l!==null?(i.stateNode=l,Ln=i,$e=Ci(l.firstChild),wi=!1,f=!0):f=!1),f||Xa(i)),ee(i),f=i.type,m=i.pendingProps,E=e!==null?e.memoizedProps:null,l=m.children,Ah(f,m)?l=null:E!==null&&Ah(f,E)&&(i.flags|=32),i.memoizedState!==null&&(f=Tf(e,i,FS,null,null,s),Wo._currentValue=f),uc(e,i),On(e,i,l,s),i.child;case 6:return e===null&&Ue&&((e=s=$e)&&(s=Ey(s,i.pendingProps,wi),s!==null?(i.stateNode=s,Ln=i,$e=null,e=!0):e=!1),e||Xa(i)),null;case 13:return Z0(e,i,s);case 4:return dt(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=Ds(i,null,l,s):On(e,i,l,s),i.child;case 11:return B0(e,i,i.type,i.pendingProps,s);case 7:return On(e,i,i.pendingProps,s),i.child;case 8:return On(e,i,i.pendingProps.children,s),i.child;case 12:return On(e,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Wa(i,i.type,l.value),On(e,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,As(i),f=Nn(f),l=l(f),i.flags|=1,On(e,i,l,s),i.child;case 14:return H0(e,i,i.type,i.pendingProps,s);case 15:return G0(e,i,i.type,i.pendingProps,s);case 19:return J0(e,i,s);case 31:return WS(e,i,s);case 22:return V0(e,i,s,i.pendingProps);case 24:return As(i),l=Nn(mn),e===null?(f=mf(),f===null&&(f=Qe,m=df(),f.pooledCache=m,m.refCount++,m!==null&&(f.pooledCacheLanes|=s),f=m),i.memoizedState={parent:l,cache:f},vf(i),Wa(i,mn,f)):((e.lanes&s)!==0&&(_f(e,i),To(i,null,null,s),bo()),f=e.memoizedState,m=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),Wa(i,mn,l)):(l=m.cache,Wa(i,mn,l),l!==f.cache&&hf(i,[mn],s,!0))),On(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function ma(e){e.flags|=4}function $f(e,i,s,l,f){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(f&335544128)===f)if(e.stateNode.complete)e.flags|=8192;else if(bg())e.flags|=8192;else throw Cs=Kl,gf}else e.flags&=-16777217}function j0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!dv(i))if(bg())e.flags|=8192;else throw Cs=Kl,gf}function hc(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Ut():536870912,e.lanes|=i,xr|=i)}function Uo(e,i){if(!Ue)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function tn(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,l=0;if(i)for(var f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=l,e.childLanes=s,i}function YS(e,i,s){var l=i.pendingProps;switch(of(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tn(i),null;case 1:return tn(i),null;case 3:return s=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),fa(mn),wt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(rr(i)?ma(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,cf())),tn(i),null;case 26:var f=i.type,m=i.memoizedState;return e===null?(ma(i),m!==null?(tn(i),j0(i,m)):(tn(i),$f(i,f,null,l,s))):m?m!==e.memoizedState?(ma(i),tn(i),j0(i,m)):(tn(i),i.flags&=-16777217):(e=e.memoizedProps,e!==l&&ma(i),tn(i),$f(i,f,e,l,s)),null;case 27:if(zt(i),s=Pt.current,f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&ma(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return tn(i),null}e=mt.current,rr(i)?Um(i):(e=sv(f,l,s),i.stateNode=e,ma(i))}return tn(i),null;case 5:if(zt(i),f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&ma(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return tn(i),null}if(m=mt.current,rr(i))Um(i);else{var E=wc(Pt.current);switch(m){case 1:m=E.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:m=E.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":m=E.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":m=E.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":m=E.createElement("div"),m.innerHTML="<script><\/script>",m=m.removeChild(m.firstChild);break;case"select":m=typeof l.is=="string"?E.createElement("select",{is:l.is}):E.createElement("select"),l.multiple?m.multiple=!0:l.size&&(m.size=l.size);break;default:m=typeof l.is=="string"?E.createElement(f,{is:l.is}):E.createElement(f)}}m[hn]=i,m[Un]=l;t:for(E=i.child;E!==null;){if(E.tag===5||E.tag===6)m.appendChild(E.stateNode);else if(E.tag!==4&&E.tag!==27&&E.child!==null){E.child.return=E,E=E.child;continue}if(E===i)break t;for(;E.sibling===null;){if(E.return===null||E.return===i)break t;E=E.return}E.sibling.return=E.return,E=E.sibling}i.stateNode=m;t:switch(Pn(m,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&ma(i)}}return tn(i),$f(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&ma(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=Pt.current,rr(i)){if(e=i.stateNode,s=i.memoizedProps,l=null,f=Ln,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}e[hn]=i,e=!!(e.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||Zg(e.nodeValue,s)),e||Xa(i,!0)}else e=wc(e).createTextNode(l),e[hn]=i,i.stateNode=e}return tn(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(l=rr(i),s!==null){if(e===null){if(!l)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[hn]=i}else bs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;tn(i),e=!1}else s=cf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(hi(i),i):(hi(i),null);if((i.flags&128)!==0)throw Error(a(558))}return tn(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(f=rr(i),l!==null&&l.dehydrated!==null){if(e===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[hn]=i}else bs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;tn(i),f=!1}else f=cf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(hi(i),i):(hi(i),null)}return hi(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,e=e!==null&&e.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),m=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(m=l.memoizedState.cachePool.pool),m!==f&&(l.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),hc(i,i.updateQueue),tn(i),null);case 4:return wt(),e===null&&yh(i.stateNode.containerInfo),tn(i),null;case 10:return fa(i.type),tn(i),null;case 19:if(K(cn),l=i.memoizedState,l===null)return tn(i),null;if(f=(i.flags&128)!==0,m=l.rendering,m===null)if(f)Uo(l,!1);else{if(ln!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(m=$l(e),m!==null){for(i.flags|=128,Uo(l,!1),e=m.updateQueue,i.updateQueue=e,hc(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)Am(s,e),s=s.sibling;return it(cn,cn.current&1|2),Ue&&ca(i,l.treeForkCount),i.child}e=e.sibling}l.tail!==null&&pe()>vc&&(i.flags|=128,f=!0,Uo(l,!1),i.lanes=4194304)}else{if(!f)if(e=$l(m),e!==null){if(i.flags|=128,f=!0,e=e.updateQueue,i.updateQueue=e,hc(i,e),Uo(l,!0),l.tail===null&&l.tailMode==="hidden"&&!m.alternate&&!Ue)return tn(i),null}else 2*pe()-l.renderingStartTime>vc&&s!==536870912&&(i.flags|=128,f=!0,Uo(l,!1),i.lanes=4194304);l.isBackwards?(m.sibling=i.child,i.child=m):(e=l.last,e!==null?e.sibling=m:i.child=m,l.last=m)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=pe(),e.sibling=null,s=cn.current,it(cn,f?s&1|2:s&1),Ue&&ca(i,l.treeForkCount),e):(tn(i),null);case 22:case 23:return hi(i),Mf(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(tn(i),i.subtreeFlags&6&&(i.flags|=8192)):tn(i),s=i.updateQueue,s!==null&&hc(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),e!==null&&K(ws),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),fa(mn),tn(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function ZS(e,i){switch(of(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return fa(mn),wt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return zt(i),null;case 31:if(i.memoizedState!==null){if(hi(i),i.alternate===null)throw Error(a(340));bs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(hi(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));bs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return K(cn),null;case 4:return wt(),null;case 10:return fa(i.type),null;case 22:case 23:return hi(i),Mf(),e!==null&&K(ws),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return fa(mn),null;case 25:return null;default:return null}}function $0(e,i){switch(of(i),i.tag){case 3:fa(mn),wt();break;case 26:case 27:case 5:zt(i);break;case 4:wt();break;case 31:i.memoizedState!==null&&hi(i);break;case 13:hi(i);break;case 19:K(cn);break;case 10:fa(i.type);break;case 22:case 23:hi(i),Mf(),e!==null&&K(ws);break;case 24:fa(mn)}}function Lo(e,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&e)===e){l=void 0;var m=s.create,E=s.inst;l=m(),E.destroy=l}s=s.next}while(s!==f)}}catch(N){ke(i,i.return,N)}}function Qa(e,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var m=f.next;l=m;do{if((l.tag&e)===e){var E=l.inst,N=E.destroy;if(N!==void 0){E.destroy=void 0,f=i;var Q=s,ft=N;try{ft()}catch(Et){ke(f,Q,Et)}}}l=l.next}while(l!==m)}}catch(Et){ke(i,i.return,Et)}}function tg(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{Xm(i,s)}catch(l){ke(e,e.return,l)}}}function eg(e,i,s){s.props=Ls(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(l){ke(e,i,l)}}function No(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof s=="function"?e.refCleanup=s(l):s.current=l}}catch(f){ke(e,i,f)}}function Ki(e,i){var s=e.ref,l=e.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){ke(e,i,f)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){ke(e,i,f)}else s.current=null}function ng(e){var i=e.type,s=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break t;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){ke(e,e.return,f)}}function th(e,i,s){try{var l=e.stateNode;gy(l,e.type,s,i),l[Un]=i}catch(f){ke(e,e.return,f)}}function ig(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&as(e.type)||e.tag===4}function eh(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||ig(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&as(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function nh(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Mi));else if(l!==4&&(l===27&&as(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(nh(e,i,s),e=e.sibling;e!==null;)nh(e,i,s),e=e.sibling}function dc(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(l!==4&&(l===27&&as(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(dc(e,i,s),e=e.sibling;e!==null;)dc(e,i,s),e=e.sibling}function ag(e){var i=e.stateNode,s=e.memoizedProps;try{for(var l=e.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);Pn(i,l,s),i[hn]=e,i[Un]=s}catch(m){ke(e,e.return,m)}}var ga=!1,_n=!1,ih=!1,sg=typeof WeakSet=="function"?WeakSet:Set,Rn=null;function KS(e,i){if(e=e.containerInfo,bh=Oc,e=vm(e),Ku(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,m=l.focusNode;l=l.focusOffset;try{s.nodeType,m.nodeType}catch{s=null;break t}var E=0,N=-1,Q=-1,ft=0,Et=0,At=e,ht=null;e:for(;;){for(var vt;At!==s||f!==0&&At.nodeType!==3||(N=E+f),At!==m||l!==0&&At.nodeType!==3||(Q=E+l),At.nodeType===3&&(E+=At.nodeValue.length),(vt=At.firstChild)!==null;)ht=At,At=vt;for(;;){if(At===e)break e;if(ht===s&&++ft===f&&(N=E),ht===m&&++Et===l&&(Q=E),(vt=At.nextSibling)!==null)break;At=ht,ht=At.parentNode}At=vt}s=N===-1||Q===-1?null:{start:N,end:Q}}else s=null}s=s||{start:0,end:0}}else s=null;for(Th={focusedElem:e,selectionRange:s},Oc=!1,Rn=i;Rn!==null;)if(i=Rn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Rn=e;else for(;Rn!==null;){switch(i=Rn,m=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)f=e[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&m!==null){e=void 0,s=i,f=m.memoizedProps,m=m.memoizedState,l=s.stateNode;try{var ne=Ls(s.type,f);e=l.getSnapshotBeforeUpdate(ne,m),l.__reactInternalSnapshotBeforeUpdate=e}catch(fe){ke(s,s.return,fe)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)Rh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Rh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Rn=e;break}Rn=i.return}}function rg(e,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:_a(e,s),l&4&&Lo(5,s);break;case 1:if(_a(e,s),l&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(E){ke(s,s.return,E)}else{var f=Ls(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(f,i,e.__reactInternalSnapshotBeforeUpdate)}catch(E){ke(s,s.return,E)}}l&64&&tg(s),l&512&&No(s,s.return);break;case 3:if(_a(e,s),l&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{Xm(e,i)}catch(E){ke(s,s.return,E)}}break;case 27:i===null&&l&4&&ag(s);case 26:case 5:_a(e,s),i===null&&l&4&&ng(s),l&512&&No(s,s.return);break;case 12:_a(e,s);break;case 31:_a(e,s),l&4&&cg(e,s);break;case 13:_a(e,s),l&4&&ug(e,s),l&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=ay.bind(null,s),by(e,s))));break;case 22:if(l=s.memoizedState!==null||ga,!l){i=i!==null&&i.memoizedState!==null||_n,f=ga;var m=_n;ga=l,(_n=i)&&!m?xa(e,s,(s.subtreeFlags&8772)!==0):_a(e,s),ga=f,_n=m}break;case 30:break;default:_a(e,s)}}function og(e){var i=e.alternate;i!==null&&(e.alternate=null,og(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&za(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var an=null,ti=!1;function va(e,i,s){for(s=s.child;s!==null;)lg(e,i,s),s=s.sibling}function lg(e,i,s){if(yt&&typeof yt.onCommitFiberUnmount=="function")try{yt.onCommitFiberUnmount(_t,s)}catch{}switch(s.tag){case 26:_n||Ki(s,i),va(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:_n||Ki(s,i);var l=an,f=ti;as(s.type)&&(an=s.stateNode,ti=!1),va(e,i,s),Vo(s.stateNode),an=l,ti=f;break;case 5:_n||Ki(s,i);case 6:if(l=an,f=ti,an=null,va(e,i,s),an=l,ti=f,an!==null)if(ti)try{(an.nodeType===9?an.body:an.nodeName==="HTML"?an.ownerDocument.body:an).removeChild(s.stateNode)}catch(m){ke(s,i,m)}else try{an.removeChild(s.stateNode)}catch(m){ke(s,i,m)}break;case 18:an!==null&&(ti?(e=an,tv(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),wr(e)):tv(an,s.stateNode));break;case 4:l=an,f=ti,an=s.stateNode.containerInfo,ti=!0,va(e,i,s),an=l,ti=f;break;case 0:case 11:case 14:case 15:Qa(2,s,i),_n||Qa(4,s,i),va(e,i,s);break;case 1:_n||(Ki(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&eg(s,i,l)),va(e,i,s);break;case 21:va(e,i,s);break;case 22:_n=(l=_n)||s.memoizedState!==null,va(e,i,s),_n=l;break;default:va(e,i,s)}}function cg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{wr(e)}catch(s){ke(i,i.return,s)}}}function ug(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{wr(e)}catch(s){ke(i,i.return,s)}}function JS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new sg),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new sg),i;default:throw Error(a(435,e.tag))}}function pc(e,i){var s=JS(e);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=sy.bind(null,e,l);l.then(f,f)}})}function ei(e,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],m=e,E=i,N=E;t:for(;N!==null;){switch(N.tag){case 27:if(as(N.type)){an=N.stateNode,ti=!1;break t}break;case 5:an=N.stateNode,ti=!1;break t;case 3:case 4:an=N.stateNode.containerInfo,ti=!0;break t}N=N.return}if(an===null)throw Error(a(160));lg(m,E,f),an=null,ti=!1,m=f.alternate,m!==null&&(m.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)fg(i,e),i=i.sibling}var Ii=null;function fg(e,i){var s=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ei(i,e),ni(e),l&4&&(Qa(3,e,e.return),Lo(3,e),Qa(5,e,e.return));break;case 1:ei(i,e),ni(e),l&512&&(_n||s===null||Ki(s,s.return)),l&64&&ga&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=Ii;if(ei(i,e),ni(e),l&512&&(_n||s===null||Ki(s,s.return)),l&4){var m=s!==null?s.memoizedState:null;if(l=e.memoizedState,s===null)if(l===null)if(e.stateNode===null){t:{l=e.type,s=e.memoizedProps,f=f.ownerDocument||f;e:switch(l){case"title":m=f.getElementsByTagName("title")[0],(!m||m[Fa]||m[hn]||m.namespaceURI==="http://www.w3.org/2000/svg"||m.hasAttribute("itemprop"))&&(m=f.createElement(l),f.head.insertBefore(m,f.querySelector("head > title"))),Pn(m,l,s),m[hn]=e,dn(m),l=m;break t;case"link":var E=fv("link","href",f).get(l+(s.href||""));if(E){for(var N=0;N<E.length;N++)if(m=E[N],m.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&m.getAttribute("rel")===(s.rel==null?null:s.rel)&&m.getAttribute("title")===(s.title==null?null:s.title)&&m.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){E.splice(N,1);break e}}m=f.createElement(l),Pn(m,l,s),f.head.appendChild(m);break;case"meta":if(E=fv("meta","content",f).get(l+(s.content||""))){for(N=0;N<E.length;N++)if(m=E[N],m.getAttribute("content")===(s.content==null?null:""+s.content)&&m.getAttribute("name")===(s.name==null?null:s.name)&&m.getAttribute("property")===(s.property==null?null:s.property)&&m.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&m.getAttribute("charset")===(s.charSet==null?null:s.charSet)){E.splice(N,1);break e}}m=f.createElement(l),Pn(m,l,s),f.head.appendChild(m);break;default:throw Error(a(468,l))}m[hn]=e,dn(m),l=m}e.stateNode=l}else hv(f,e.type,e.stateNode);else e.stateNode=uv(f,l,e.memoizedProps);else m!==l?(m===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):m.count--,l===null?hv(f,e.type,e.stateNode):uv(f,l,e.memoizedProps)):l===null&&e.stateNode!==null&&th(e,e.memoizedProps,s.memoizedProps)}break;case 27:ei(i,e),ni(e),l&512&&(_n||s===null||Ki(s,s.return)),s!==null&&l&4&&th(e,e.memoizedProps,s.memoizedProps);break;case 5:if(ei(i,e),ni(e),l&512&&(_n||s===null||Ki(s,s.return)),e.flags&32){f=e.stateNode;try{Xn(f,"")}catch(ne){ke(e,e.return,ne)}}l&4&&e.stateNode!=null&&(f=e.memoizedProps,th(e,f,s!==null?s.memoizedProps:f)),l&1024&&(ih=!0);break;case 6:if(ei(i,e),ni(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,s=e.stateNode;try{s.nodeValue=l}catch(ne){ke(e,e.return,ne)}}break;case 3:if(Dc=null,f=Ii,Ii=Rc(i.containerInfo),ei(i,e),Ii=f,ni(e),l&4&&s!==null&&s.memoizedState.isDehydrated)try{wr(i.containerInfo)}catch(ne){ke(e,e.return,ne)}ih&&(ih=!1,hg(e));break;case 4:l=Ii,Ii=Rc(e.stateNode.containerInfo),ei(i,e),ni(e),Ii=l;break;case 12:ei(i,e),ni(e);break;case 31:ei(i,e),ni(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,pc(e,l)));break;case 13:ei(i,e),ni(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(gc=pe()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,pc(e,l)));break;case 22:f=e.memoizedState!==null;var Q=s!==null&&s.memoizedState!==null,ft=ga,Et=_n;if(ga=ft||f,_n=Et||Q,ei(i,e),_n=Et,ga=ft,ni(e),l&8192)t:for(i=e.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||Q||ga||_n||Ns(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){Q=s=i;try{if(m=Q.stateNode,f)E=m.style,typeof E.setProperty=="function"?E.setProperty("display","none","important"):E.display="none";else{N=Q.stateNode;var At=Q.memoizedProps.style,ht=At!=null&&At.hasOwnProperty("display")?At.display:null;N.style.display=ht==null||typeof ht=="boolean"?"":(""+ht).trim()}}catch(ne){ke(Q,Q.return,ne)}}}else if(i.tag===6){if(s===null){Q=i;try{Q.stateNode.nodeValue=f?"":Q.memoizedProps}catch(ne){ke(Q,Q.return,ne)}}}else if(i.tag===18){if(s===null){Q=i;try{var vt=Q.stateNode;f?ev(vt,!0):ev(Q.stateNode,!1)}catch(ne){ke(Q,Q.return,ne)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,pc(e,s))));break;case 19:ei(i,e),ni(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,pc(e,l)));break;case 30:break;case 21:break;default:ei(i,e),ni(e)}}function ni(e){var i=e.flags;if(i&2){try{for(var s,l=e.return;l!==null;){if(ig(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,m=eh(e);dc(e,m,f);break;case 5:var E=s.stateNode;s.flags&32&&(Xn(E,""),s.flags&=-33);var N=eh(e);dc(e,N,E);break;case 3:case 4:var Q=s.stateNode.containerInfo,ft=eh(e);nh(e,ft,Q);break;default:throw Error(a(161))}}catch(Et){ke(e,e.return,Et)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function hg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;hg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function _a(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)rg(e,i.alternate,i),i=i.sibling}function Ns(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Qa(4,i,i.return),Ns(i);break;case 1:Ki(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&eg(i,i.return,s),Ns(i);break;case 27:Vo(i.stateNode);case 26:case 5:Ki(i,i.return),Ns(i);break;case 22:i.memoizedState===null&&Ns(i);break;case 30:Ns(i);break;default:Ns(i)}e=e.sibling}}function xa(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=e,m=i,E=m.flags;switch(m.tag){case 0:case 11:case 15:xa(f,m,s),Lo(4,m);break;case 1:if(xa(f,m,s),l=m,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(ft){ke(l,l.return,ft)}if(l=m,f=l.updateQueue,f!==null){var N=l.stateNode;try{var Q=f.shared.hiddenCallbacks;if(Q!==null)for(f.shared.hiddenCallbacks=null,f=0;f<Q.length;f++)km(Q[f],N)}catch(ft){ke(l,l.return,ft)}}s&&E&64&&tg(m),No(m,m.return);break;case 27:ag(m);case 26:case 5:xa(f,m,s),s&&l===null&&E&4&&ng(m),No(m,m.return);break;case 12:xa(f,m,s);break;case 31:xa(f,m,s),s&&E&4&&cg(f,m);break;case 13:xa(f,m,s),s&&E&4&&ug(f,m);break;case 22:m.memoizedState===null&&xa(f,m,s),No(m,m.return);break;case 30:break;default:xa(f,m,s)}i=i.sibling}}function ah(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&xo(s))}function sh(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&xo(e))}function Fi(e,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)dg(e,i,s,l),i=i.sibling}function dg(e,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Fi(e,i,s,l),f&2048&&Lo(9,i);break;case 1:Fi(e,i,s,l);break;case 3:Fi(e,i,s,l),f&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&xo(e)));break;case 12:if(f&2048){Fi(e,i,s,l),e=i.stateNode;try{var m=i.memoizedProps,E=m.id,N=m.onPostCommit;typeof N=="function"&&N(E,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(Q){ke(i,i.return,Q)}}else Fi(e,i,s,l);break;case 31:Fi(e,i,s,l);break;case 13:Fi(e,i,s,l);break;case 23:break;case 22:m=i.stateNode,E=i.alternate,i.memoizedState!==null?m._visibility&2?Fi(e,i,s,l):Oo(e,i):m._visibility&2?Fi(e,i,s,l):(m._visibility|=2,gr(e,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&ah(E,i);break;case 24:Fi(e,i,s,l),f&2048&&sh(i.alternate,i);break;default:Fi(e,i,s,l)}}function gr(e,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var m=e,E=i,N=s,Q=l,ft=E.flags;switch(E.tag){case 0:case 11:case 15:gr(m,E,N,Q,f),Lo(8,E);break;case 23:break;case 22:var Et=E.stateNode;E.memoizedState!==null?Et._visibility&2?gr(m,E,N,Q,f):Oo(m,E):(Et._visibility|=2,gr(m,E,N,Q,f)),f&&ft&2048&&ah(E.alternate,E);break;case 24:gr(m,E,N,Q,f),f&&ft&2048&&sh(E.alternate,E);break;default:gr(m,E,N,Q,f)}i=i.sibling}}function Oo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,l=i,f=l.flags;switch(l.tag){case 22:Oo(s,l),f&2048&&ah(l.alternate,l);break;case 24:Oo(s,l),f&2048&&sh(l.alternate,l);break;default:Oo(s,l)}i=i.sibling}}var Po=8192;function vr(e,i,s){if(e.subtreeFlags&Po)for(e=e.child;e!==null;)pg(e,i,s),e=e.sibling}function pg(e,i,s){switch(e.tag){case 26:vr(e,i,s),e.flags&Po&&e.memoizedState!==null&&Iy(s,Ii,e.memoizedState,e.memoizedProps);break;case 5:vr(e,i,s);break;case 3:case 4:var l=Ii;Ii=Rc(e.stateNode.containerInfo),vr(e,i,s),Ii=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=Po,Po=16777216,vr(e,i,s),Po=l):vr(e,i,s));break;default:vr(e,i,s)}}function mg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Io(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Rn=l,vg(l,e)}mg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)gg(e),e=e.sibling}function gg(e){switch(e.tag){case 0:case 11:case 15:Io(e),e.flags&2048&&Qa(9,e,e.return);break;case 3:Io(e);break;case 12:Io(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,mc(e)):Io(e);break;default:Io(e)}}function mc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Rn=l,vg(l,e)}mg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Qa(8,i,i.return),mc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,mc(i));break;default:mc(i)}e=e.sibling}}function vg(e,i){for(;Rn!==null;){var s=Rn;switch(s.tag){case 0:case 11:case 15:Qa(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:xo(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,Rn=l;else t:for(s=e;Rn!==null;){l=Rn;var f=l.sibling,m=l.return;if(og(l),l===s){Rn=null;break t}if(f!==null){f.return=m,Rn=f;break t}Rn=m}}}var QS={getCacheForType:function(e){var i=Nn(mn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Nn(mn).controller.signal}},jS=typeof WeakMap=="function"?WeakMap:Map,He=0,Qe=null,we=null,Ce=0,Ve=0,di=null,ja=!1,_r=!1,rh=!1,Sa=0,ln=0,$a=0,Os=0,oh=0,pi=0,xr=0,Fo=null,ii=null,lh=!1,gc=0,_g=0,vc=1/0,_c=null,ts=null,Mn=0,es=null,Sr=null,ya=0,ch=0,uh=null,xg=null,zo=0,fh=null;function mi(){return(He&2)!==0&&Ce!==0?Ce&-Ce:P.T!==null?vh():so()}function Sg(){if(pi===0)if((Ce&536870912)===0||Ue){var e=re;re<<=1,(re&3932160)===0&&(re=262144),pi=e}else pi=536870912;return e=fi.current,e!==null&&(e.flags|=32),pi}function ai(e,i,s){(e===Qe&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)&&(yr(e,0),ns(e,Ce,pi,!1)),$t(e,s),((He&2)===0||e!==Qe)&&(e===Qe&&((He&2)===0&&(Os|=s),ln===4&&ns(e,Ce,pi,!1)),Ji(e))}function yg(e,i,s){if((He&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&e.expiredLanes)===0||Gt(e,i),f=l?ey(e,i):dh(e,i,!0),m=l;do{if(f===0){_r&&!l&&ns(e,i,0,!1);break}else{if(s=e.current.alternate,m&&!$S(s)){f=dh(e,i,!1),m=!1;continue}if(f===2){if(m=i,e.errorRecoveryDisabledLanes&m)var E=0;else E=e.pendingLanes&-536870913,E=E!==0?E:E&536870912?536870912:0;if(E!==0){i=E;t:{var N=e;f=Fo;var Q=N.current.memoizedState.isDehydrated;if(Q&&(yr(N,E).flags|=256),E=dh(N,E,!1),E!==2){if(rh&&!Q){N.errorRecoveryDisabledLanes|=m,Os|=m,f=4;break t}m=ii,ii=f,m!==null&&(ii===null?ii=m:ii.push.apply(ii,m))}f=E}if(m=!1,f!==2)continue}}if(f===1){yr(e,0),ns(e,i,0,!0);break}t:{switch(l=e,m=f,m){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:ns(l,i,pi,!ja);break t;case 2:ii=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=gc+300-pe(),10<f)){if(ns(l,i,pi,!ja),Mt(l,0,!0)!==0)break t;ya=i,l.timeoutHandle=jg(Mg.bind(null,l,s,ii,_c,lh,i,pi,Os,xr,ja,m,"Throttled",-0,0),f);break t}Mg(l,s,ii,_c,lh,i,pi,Os,xr,ja,m,null,-0,0)}}break}while(!0);Ji(e)}function Mg(e,i,s,l,f,m,E,N,Q,ft,Et,At,ht,vt){if(e.timeoutHandle=-1,At=i.subtreeFlags,At&8192||(At&16785408)===16785408){At={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Mi},pg(i,m,At);var ne=(m&62914560)===m?gc-pe():(m&4194048)===m?_g-pe():0;if(ne=Fy(At,ne),ne!==null){ya=m,e.cancelPendingCommit=ne(Dg.bind(null,e,i,m,s,l,f,E,N,Q,Et,At,null,ht,vt)),ns(e,m,E,!ft);return}}Dg(e,i,m,s,l,f,E,N,Q)}function $S(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],m=f.getSnapshot;f=f.value;try{if(!ci(m(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ns(e,i,s,l){i&=~oh,i&=~Os,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var f=i;0<f;){var m=31-xt(f),E=1<<m;l[m]=-1,f&=~E}s!==0&&Pe(e,s,i)}function xc(){return(He&6)===0?(Bo(0),!1):!0}function hh(){if(we!==null){if(Ve===0)var e=we.return;else e=we,ua=Ts=null,Rf(e),fr=null,yo=0,e=we;for(;e!==null;)$0(e.alternate,e),e=e.return;we=null}}function yr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,xy(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ya=0,hh(),Qe=e,we=s=la(e.current,null),Ce=i,Ve=0,di=null,ja=!1,_r=Gt(e,i),rh=!1,xr=pi=oh=Os=$a=ln=0,ii=Fo=null,lh=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var f=31-xt(l),m=1<<f;i|=e[f],l&=~m}return Sa=i,Hl(),s}function Eg(e,i){_e=null,P.H=Co,i===ur||i===Zl?(i=Bm(),Ve=3):i===gf?(i=Bm(),Ve=4):Ve=i===Xf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,di=i,we===null&&(ln=1,lc(e,bi(i,e.current)))}function bg(){var e=fi.current;return e===null?!0:(Ce&4194048)===Ce?Ri===null:(Ce&62914560)===Ce||(Ce&536870912)!==0?e===Ri:!1}function Tg(){var e=P.H;return P.H=Co,e===null?Co:e}function Ag(){var e=P.A;return P.A=QS,e}function Sc(){ln=4,ja||(Ce&4194048)!==Ce&&fi.current!==null||(_r=!0),($a&134217727)===0&&(Os&134217727)===0||Qe===null||ns(Qe,Ce,pi,!1)}function dh(e,i,s){var l=He;He|=2;var f=Tg(),m=Ag();(Qe!==e||Ce!==i)&&(_c=null,yr(e,i)),i=!1;var E=ln;t:do try{if(Ve!==0&&we!==null){var N=we,Q=di;switch(Ve){case 8:hh(),E=6;break t;case 3:case 2:case 9:case 6:fi.current===null&&(i=!0);var ft=Ve;if(Ve=0,di=null,Mr(e,N,Q,ft),s&&_r){E=0;break t}break;default:ft=Ve,Ve=0,di=null,Mr(e,N,Q,ft)}}ty(),E=ln;break}catch(Et){Eg(e,Et)}while(!0);return i&&e.shellSuspendCounter++,ua=Ts=null,He=l,P.H=f,P.A=m,we===null&&(Qe=null,Ce=0,Hl()),E}function ty(){for(;we!==null;)wg(we)}function ey(e,i){var s=He;He|=2;var l=Tg(),f=Ag();Qe!==e||Ce!==i?(_c=null,vc=pe()+500,yr(e,i)):_r=Gt(e,i);t:do try{if(Ve!==0&&we!==null){i=we;var m=di;e:switch(Ve){case 1:Ve=0,di=null,Mr(e,i,m,1);break;case 2:case 9:if(Fm(m)){Ve=0,di=null,Rg(i);break}i=function(){Ve!==2&&Ve!==9||Qe!==e||(Ve=7),Ji(e)},m.then(i,i);break t;case 3:Ve=7;break t;case 4:Ve=5;break t;case 7:Fm(m)?(Ve=0,di=null,Rg(i)):(Ve=0,di=null,Mr(e,i,m,7));break;case 5:var E=null;switch(we.tag){case 26:E=we.memoizedState;case 5:case 27:var N=we;if(E?dv(E):N.stateNode.complete){Ve=0,di=null;var Q=N.sibling;if(Q!==null)we=Q;else{var ft=N.return;ft!==null?(we=ft,yc(ft)):we=null}break e}}Ve=0,di=null,Mr(e,i,m,5);break;case 6:Ve=0,di=null,Mr(e,i,m,6);break;case 8:hh(),ln=6;break t;default:throw Error(a(462))}}ny();break}catch(Et){Eg(e,Et)}while(!0);return ua=Ts=null,P.H=l,P.A=f,He=s,we!==null?0:(Qe=null,Ce=0,Hl(),ln)}function ny(){for(;we!==null&&!de();)wg(we)}function wg(e){var i=Q0(e.alternate,e,Sa);e.memoizedProps=e.pendingProps,i===null?yc(e):we=i}function Rg(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=W0(s,i,i.pendingProps,i.type,void 0,Ce);break;case 11:i=W0(s,i,i.pendingProps,i.type.render,i.ref,Ce);break;case 5:Rf(i);default:$0(s,i),i=we=Am(i,Sa),i=Q0(s,i,Sa)}e.memoizedProps=e.pendingProps,i===null?yc(e):we=i}function Mr(e,i,s,l){ua=Ts=null,Rf(i),fr=null,yo=0;var f=i.return;try{if(XS(e,f,i,s,Ce)){ln=1,lc(e,bi(s,e.current)),we=null;return}}catch(m){if(f!==null)throw we=f,m;ln=1,lc(e,bi(s,e.current)),we=null;return}i.flags&32768?(Ue||l===1?e=!0:_r||(Ce&536870912)!==0?e=!1:(ja=e=!0,(l===2||l===9||l===3||l===6)&&(l=fi.current,l!==null&&l.tag===13&&(l.flags|=16384))),Cg(i,e)):yc(i)}function yc(e){var i=e;do{if((i.flags&32768)!==0){Cg(i,ja);return}e=i.return;var s=YS(i.alternate,i,Sa);if(s!==null){we=s;return}if(i=i.sibling,i!==null){we=i;return}we=i=e}while(i!==null);ln===0&&(ln=5)}function Cg(e,i){do{var s=ZS(e.alternate,e);if(s!==null){s.flags&=32767,we=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){we=e;return}we=e=s}while(e!==null);ln=6,we=null}function Dg(e,i,s,l,f,m,E,N,Q){e.cancelPendingCommit=null;do Mc();while(Mn!==0);if((He&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(m=i.lanes|i.childLanes,m|=tf,We(e,s,m,E,N,Q),e===Qe&&(we=Qe=null,Ce=0),Sr=i,es=e,ya=s,ch=m,uh=f,xg=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,ry(at,function(){return Pg(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=P.T,P.T=null,f=F.p,F.p=2,E=He,He|=4;try{KS(e,i,s)}finally{He=E,F.p=f,P.T=l}}Mn=1,Ug(),Lg(),Ng()}}function Ug(){if(Mn===1){Mn=0;var e=es,i=Sr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=P.T,P.T=null;var l=F.p;F.p=2;var f=He;He|=4;try{fg(i,e);var m=Th,E=vm(e.containerInfo),N=m.focusedElem,Q=m.selectionRange;if(E!==N&&N&&N.ownerDocument&&gm(N.ownerDocument.documentElement,N)){if(Q!==null&&Ku(N)){var ft=Q.start,Et=Q.end;if(Et===void 0&&(Et=ft),"selectionStart"in N)N.selectionStart=ft,N.selectionEnd=Math.min(Et,N.value.length);else{var At=N.ownerDocument||document,ht=At&&At.defaultView||window;if(ht.getSelection){var vt=ht.getSelection(),ne=N.textContent.length,fe=Math.min(Q.start,ne),Ke=Q.end===void 0?fe:Math.min(Q.end,ne);!vt.extend&&fe>Ke&&(E=Ke,Ke=fe,fe=E);var rt=mm(N,fe),et=mm(N,Ke);if(rt&&et&&(vt.rangeCount!==1||vt.anchorNode!==rt.node||vt.anchorOffset!==rt.offset||vt.focusNode!==et.node||vt.focusOffset!==et.offset)){var ut=At.createRange();ut.setStart(rt.node,rt.offset),vt.removeAllRanges(),fe>Ke?(vt.addRange(ut),vt.extend(et.node,et.offset)):(ut.setEnd(et.node,et.offset),vt.addRange(ut))}}}}for(At=[],vt=N;vt=vt.parentNode;)vt.nodeType===1&&At.push({element:vt,left:vt.scrollLeft,top:vt.scrollTop});for(typeof N.focus=="function"&&N.focus(),N=0;N<At.length;N++){var bt=At[N];bt.element.scrollLeft=bt.left,bt.element.scrollTop=bt.top}}Oc=!!bh,Th=bh=null}finally{He=f,F.p=l,P.T=s}}e.current=i,Mn=2}}function Lg(){if(Mn===2){Mn=0;var e=es,i=Sr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=P.T,P.T=null;var l=F.p;F.p=2;var f=He;He|=4;try{rg(e,i.alternate,i)}finally{He=f,F.p=l,P.T=s}}Mn=3}}function Ng(){if(Mn===4||Mn===3){Mn=0,j();var e=es,i=Sr,s=ya,l=xg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?Mn=5:(Mn=0,Sr=es=null,Og(e,e.pendingLanes));var f=e.pendingLanes;if(f===0&&(ts=null),ao(s),i=i.stateNode,yt&&typeof yt.onCommitFiberRoot=="function")try{yt.onCommitFiberRoot(_t,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=P.T,f=F.p,F.p=2,P.T=null;try{for(var m=e.onRecoverableError,E=0;E<l.length;E++){var N=l[E];m(N.value,{componentStack:N.stack})}}finally{P.T=i,F.p=f}}(ya&3)!==0&&Mc(),Ji(e),f=e.pendingLanes,(s&261930)!==0&&(f&42)!==0?e===fh?zo++:(zo=0,fh=e):zo=0,Bo(0)}}function Og(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,xo(i)))}function Mc(){return Ug(),Lg(),Ng(),Pg()}function Pg(){if(Mn!==5)return!1;var e=es,i=ch;ch=0;var s=ao(ya),l=P.T,f=F.p;try{F.p=32>s?32:s,P.T=null,s=uh,uh=null;var m=es,E=ya;if(Mn=0,Sr=es=null,ya=0,(He&6)!==0)throw Error(a(331));var N=He;if(He|=4,gg(m.current),dg(m,m.current,E,s),He=N,Bo(0,!1),yt&&typeof yt.onPostCommitFiberRoot=="function")try{yt.onPostCommitFiberRoot(_t,m)}catch{}return!0}finally{F.p=f,P.T=l,Og(e,i)}}function Ig(e,i,s){i=bi(s,i),i=kf(e.stateNode,i,2),e=Za(e,i,2),e!==null&&($t(e,2),Ji(e))}function ke(e,i,s){if(e.tag===3)Ig(e,e,s);else for(;i!==null;){if(i.tag===3){Ig(i,e,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ts===null||!ts.has(l))){e=bi(s,e),s=F0(2),l=Za(i,s,2),l!==null&&(z0(s,l,i,e),$t(l,2),Ji(l));break}}i=i.return}}function ph(e,i,s){var l=e.pingCache;if(l===null){l=e.pingCache=new jS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(rh=!0,f.add(s),e=iy.bind(null,e,i,s),i.then(e,e))}function iy(e,i,s){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Qe===e&&(Ce&s)===s&&(ln===4||ln===3&&(Ce&62914560)===Ce&&300>pe()-gc?(He&2)===0&&yr(e,0):oh|=s,xr===Ce&&(xr=0)),Ji(e)}function Fg(e,i){i===0&&(i=Ut()),e=Ms(e,i),e!==null&&($t(e,i),Ji(e))}function ay(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),Fg(e,s)}function sy(e,i){var s=0;switch(e.tag){case 31:case 13:var l=e.stateNode,f=e.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),Fg(e,s)}function ry(e,i){return jt(e,i)}var Ec=null,Er=null,mh=!1,bc=!1,gh=!1,is=0;function Ji(e){e!==Er&&e.next===null&&(Er===null?Ec=Er=e:Er=Er.next=e),bc=!0,mh||(mh=!0,ly())}function Bo(e,i){if(!gh&&bc){gh=!0;do for(var s=!1,l=Ec;l!==null;){if(e!==0){var f=l.pendingLanes;if(f===0)var m=0;else{var E=l.suspendedLanes,N=l.pingedLanes;m=(1<<31-xt(42|e)+1)-1,m&=f&~(E&~N),m=m&201326741?m&201326741|1:m?m|2:0}m!==0&&(s=!0,Gg(l,m))}else m=Ce,m=Mt(l,l===Qe?m:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(m&3)===0||Gt(l,m)||(s=!0,Gg(l,m));l=l.next}while(s);gh=!1}}function oy(){zg()}function zg(){bc=mh=!1;var e=0;is!==0&&_y()&&(e=is);for(var i=pe(),s=null,l=Ec;l!==null;){var f=l.next,m=Bg(l,i);m===0?(l.next=null,s===null?Ec=f:s.next=f,f===null&&(Er=s)):(s=l,(e!==0||(m&3)!==0)&&(bc=!0)),l=f}Mn!==0&&Mn!==5||Bo(e),is!==0&&(is=0)}function Bg(e,i){for(var s=e.suspendedLanes,l=e.pingedLanes,f=e.expirationTimes,m=e.pendingLanes&-62914561;0<m;){var E=31-xt(m),N=1<<E,Q=f[E];Q===-1?((N&s)===0||(N&l)!==0)&&(f[E]=Yt(N,i)):Q<=i&&(e.expiredLanes|=N),m&=~N}if(i=Qe,s=Ce,s=Mt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,s===0||e===i&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&ce(l),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||Gt(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(l!==null&&ce(l),ao(s)){case 2:case 8:s=T;break;case 32:s=at;break;case 268435456:s=St;break;default:s=at}return l=Hg.bind(null,e),s=jt(s,l),e.callbackPriority=i,e.callbackNode=s,i}return l!==null&&l!==null&&ce(l),e.callbackPriority=2,e.callbackNode=null,2}function Hg(e,i){if(Mn!==0&&Mn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(Mc()&&e.callbackNode!==s)return null;var l=Ce;return l=Mt(e,e===Qe?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(yg(e,l,i),Bg(e,pe()),e.callbackNode!=null&&e.callbackNode===s?Hg.bind(null,e):null)}function Gg(e,i){if(Mc())return null;yg(e,i,!0)}function ly(){Sy(function(){(He&6)!==0?jt(G,oy):zg()})}function vh(){if(is===0){var e=lr;e===0&&(e=qt,qt<<=1,(qt&261888)===0&&(qt=256)),is=e}return is}function Vg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Oi(""+e)}function kg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function cy(e,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var m=Vg((f[Un]||null).action),E=l.submitter;E&&(i=(i=E[Un]||null)?Vg(i.formAction):E.getAttribute("formAction"),i!==null&&(m=i,E=null));var N=new Il("action","action",null,l,f);e.push({event:N,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(is!==0){var Q=E?kg(f,E):new FormData(f);Ff(s,{pending:!0,data:Q,method:f.method,action:m},null,Q)}}else typeof m=="function"&&(N.preventDefault(),Q=E?kg(f,E):new FormData(f),Ff(s,{pending:!0,data:Q,method:f.method,action:m},m,Q))},currentTarget:f}]})}}for(var _h=0;_h<$u.length;_h++){var xh=$u[_h],uy=xh.toLowerCase(),fy=xh[0].toUpperCase()+xh.slice(1);Pi(uy,"on"+fy)}Pi(Sm,"onAnimationEnd"),Pi(ym,"onAnimationIteration"),Pi(Mm,"onAnimationStart"),Pi("dblclick","onDoubleClick"),Pi("focusin","onFocus"),Pi("focusout","onBlur"),Pi(wS,"onTransitionRun"),Pi(RS,"onTransitionStart"),Pi(CS,"onTransitionCancel"),Pi(Em,"onTransitionEnd"),tt("onMouseEnter",["mouseout","mouseover"]),tt("onMouseLeave",["mouseout","mouseover"]),tt("onPointerEnter",["pointerout","pointerover"]),tt("onPointerLeave",["pointerout","pointerover"]),C("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),C("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),C("onBeforeInput",["compositionend","keypress","textInput","paste"]),C("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ho));function Xg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var l=e[s],f=l.event;l=l.listeners;t:{var m=void 0;if(i)for(var E=l.length-1;0<=E;E--){var N=l[E],Q=N.instance,ft=N.currentTarget;if(N=N.listener,Q!==m&&f.isPropagationStopped())break t;m=N,f.currentTarget=ft;try{m(f)}catch(Et){Bl(Et)}f.currentTarget=null,m=Q}else for(E=0;E<l.length;E++){if(N=l[E],Q=N.instance,ft=N.currentTarget,N=N.listener,Q!==m&&f.isPropagationStopped())break t;m=N,f.currentTarget=ft;try{m(f)}catch(Et){Bl(Et)}f.currentTarget=null,m=Q}}}}function Re(e,i){var s=i[gs];s===void 0&&(s=i[gs]=new Set);var l=e+"__bubble";s.has(l)||(Wg(i,e,2,!1),s.add(l))}function Sh(e,i,s){var l=0;i&&(l|=4),Wg(s,e,l,i)}var Tc="_reactListening"+Math.random().toString(36).slice(2);function yh(e){if(!e[Tc]){e[Tc]=!0,Ll.forEach(function(s){s!=="selectionchange"&&(hy.has(s)||Sh(s,!1,e),Sh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[Tc]||(i[Tc]=!0,Sh("selectionchange",!1,i))}}function Wg(e,i,s,l){switch(Sv(i)){case 2:var f=Hy;break;case 8:f=Gy;break;default:f=Ih}s=f.bind(null,i,s,e),f=void 0,!Hu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?e.addEventListener(i,s,{capture:!0,passive:f}):e.addEventListener(i,s,!0):f!==void 0?e.addEventListener(i,s,{passive:f}):e.addEventListener(i,s,!1)}function Mh(e,i,s,l,f){var m=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var E=l.tag;if(E===3||E===4){var N=l.stateNode.containerInfo;if(N===f)break;if(E===4)for(E=l.return;E!==null;){var Q=E.tag;if((Q===3||Q===4)&&E.stateNode.containerInfo===f)return;E=E.return}for(;N!==null;){if(E=sa(N),E===null)return;if(Q=E.tag,Q===5||Q===6||Q===26||Q===27){l=m=E;continue t}N=N.parentNode}}l=l.return}Jp(function(){var ft=m,Et=zu(s),At=[];t:{var ht=bm.get(e);if(ht!==void 0){var vt=Il,ne=e;switch(e){case"keypress":if(Ol(s)===0)break t;case"keydown":case"keyup":vt=sS;break;case"focusin":ne="focus",vt=Xu;break;case"focusout":ne="blur",vt=Xu;break;case"beforeblur":case"afterblur":vt=Xu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":vt=$p;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":vt=Yx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":vt=lS;break;case Sm:case ym:case Mm:vt=Jx;break;case Em:vt=uS;break;case"scroll":case"scrollend":vt=Wx;break;case"wheel":vt=hS;break;case"copy":case"cut":case"paste":vt=jx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":vt=em;break;case"toggle":case"beforetoggle":vt=pS}var fe=(i&4)!==0,Ke=!fe&&(e==="scroll"||e==="scrollend"),rt=fe?ht!==null?ht+"Capture":null:ht;fe=[];for(var et=ft,ut;et!==null;){var bt=et;if(ut=bt.stateNode,bt=bt.tag,bt!==5&&bt!==26&&bt!==27||ut===null||rt===null||(bt=oo(et,rt),bt!=null&&fe.push(Go(et,bt,ut))),Ke)break;et=et.return}0<fe.length&&(ht=new vt(ht,ne,null,s,Et),At.push({event:ht,listeners:fe}))}}if((i&7)===0){t:{if(ht=e==="mouseover"||e==="pointerover",vt=e==="mouseout"||e==="pointerout",ht&&s!==Fu&&(ne=s.relatedTarget||s.fromElement)&&(sa(ne)||ne[jn]))break t;if((vt||ht)&&(ht=Et.window===Et?Et:(ht=Et.ownerDocument)?ht.defaultView||ht.parentWindow:window,vt?(ne=s.relatedTarget||s.toElement,vt=ft,ne=ne?sa(ne):null,ne!==null&&(Ke=c(ne),fe=ne.tag,ne!==Ke||fe!==5&&fe!==27&&fe!==6)&&(ne=null)):(vt=null,ne=ft),vt!==ne)){if(fe=$p,bt="onMouseLeave",rt="onMouseEnter",et="mouse",(e==="pointerout"||e==="pointerover")&&(fe=em,bt="onPointerLeave",rt="onPointerEnter",et="pointer"),Ke=vt==null?ht:_s(vt),ut=ne==null?ht:_s(ne),ht=new fe(bt,et+"leave",vt,s,Et),ht.target=Ke,ht.relatedTarget=ut,bt=null,sa(Et)===ft&&(fe=new fe(rt,et+"enter",ne,s,Et),fe.target=ut,fe.relatedTarget=Ke,bt=fe),Ke=bt,vt&&ne)e:{for(fe=dy,rt=vt,et=ne,ut=0,bt=rt;bt;bt=fe(bt))ut++;bt=0;for(var le=et;le;le=fe(le))bt++;for(;0<ut-bt;)rt=fe(rt),ut--;for(;0<bt-ut;)et=fe(et),bt--;for(;ut--;){if(rt===et||et!==null&&rt===et.alternate){fe=rt;break e}rt=fe(rt),et=fe(et)}fe=null}else fe=null;vt!==null&&qg(At,ht,vt,fe,!1),ne!==null&&Ke!==null&&qg(At,Ke,ne,fe,!0)}}t:{if(ht=ft?_s(ft):window,vt=ht.nodeName&&ht.nodeName.toLowerCase(),vt==="select"||vt==="input"&&ht.type==="file")var Fe=cm;else if(om(ht))if(um)Fe=bS;else{Fe=MS;var se=yS}else vt=ht.nodeName,!vt||vt.toLowerCase()!=="input"||ht.type!=="checkbox"&&ht.type!=="radio"?ft&&yi(ft.elementType)&&(Fe=cm):Fe=ES;if(Fe&&(Fe=Fe(e,ft))){lm(At,Fe,s,Et);break t}se&&se(e,ht,ft),e==="focusout"&&ft&&ht.type==="number"&&ft.memoizedProps.value!=null&&yn(ht,"number",ht.value)}switch(se=ft?_s(ft):window,e){case"focusin":(om(se)||se.contentEditable==="true")&&(tr=se,Ju=ft,go=null);break;case"focusout":go=Ju=tr=null;break;case"mousedown":Qu=!0;break;case"contextmenu":case"mouseup":case"dragend":Qu=!1,_m(At,s,Et);break;case"selectionchange":if(AS)break;case"keydown":case"keyup":_m(At,s,Et)}var ye;if(qu)t:{switch(e){case"compositionstart":var De="onCompositionStart";break t;case"compositionend":De="onCompositionEnd";break t;case"compositionupdate":De="onCompositionUpdate";break t}De=void 0}else $s?sm(e,s)&&(De="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(De="onCompositionStart");De&&(nm&&s.locale!=="ko"&&($s||De!=="onCompositionStart"?De==="onCompositionEnd"&&$s&&(ye=Qp()):(Ga=Et,Gu="value"in Ga?Ga.value:Ga.textContent,$s=!0)),se=Ac(ft,De),0<se.length&&(De=new tm(De,e,null,s,Et),At.push({event:De,listeners:se}),ye?De.data=ye:(ye=rm(s),ye!==null&&(De.data=ye)))),(ye=gS?vS(e,s):_S(e,s))&&(De=Ac(ft,"onBeforeInput"),0<De.length&&(se=new tm("onBeforeInput","beforeinput",null,s,Et),At.push({event:se,listeners:De}),se.data=ye)),cy(At,e,ft,s,Et)}Xg(At,i)})}function Go(e,i,s){return{instance:e,listener:i,currentTarget:s}}function Ac(e,i){for(var s=i+"Capture",l=[];e!==null;){var f=e,m=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||m===null||(f=oo(e,s),f!=null&&l.unshift(Go(e,f,m)),f=oo(e,i),f!=null&&l.push(Go(e,f,m))),e.tag===3)return l;e=e.return}return[]}function dy(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function qg(e,i,s,l,f){for(var m=i._reactName,E=[];s!==null&&s!==l;){var N=s,Q=N.alternate,ft=N.stateNode;if(N=N.tag,Q!==null&&Q===l)break;N!==5&&N!==26&&N!==27||ft===null||(Q=ft,f?(ft=oo(s,m),ft!=null&&E.unshift(Go(s,ft,Q))):f||(ft=oo(s,m),ft!=null&&E.push(Go(s,ft,Q)))),s=s.return}E.length!==0&&e.push({event:i,listeners:E})}var py=/\r\n?/g,my=/\u0000|\uFFFD/g;function Yg(e){return(typeof e=="string"?e:""+e).replace(py,`
`).replace(my,"")}function Zg(e,i){return i=Yg(i),Yg(e)===i}function Ze(e,i,s,l,f,m){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Xn(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Xn(e,""+l);break;case"className":kt(e,"class",l);break;case"tabIndex":kt(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":kt(e,s,l);break;case"style":nn(e,l,m);break;case"data":if(i!=="object"){kt(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Oi(""+l),e.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof m=="function"&&(s==="formAction"?(i!=="input"&&Ze(e,i,"name",f.name,f,null),Ze(e,i,"formEncType",f.formEncType,f,null),Ze(e,i,"formMethod",f.formMethod,f,null),Ze(e,i,"formTarget",f.formTarget,f,null)):(Ze(e,i,"encType",f.encType,f,null),Ze(e,i,"method",f.method,f,null),Ze(e,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Oi(""+l),e.setAttribute(s,l);break;case"onClick":l!=null&&(e.onclick=Mi);break;case"onScroll":l!=null&&Re("scroll",e);break;case"onScrollEnd":l!=null&&Re("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}s=Oi(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""+l):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":l===!0?e.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,l):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(s,l):e.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(s):e.setAttribute(s,l);break;case"popover":Re("beforetoggle",e),Re("toggle",e),Jt(e,"popover",l);break;case"xlinkActuate":Zt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Zt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Zt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Zt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Zt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Zt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Jt(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=qe.get(s)||s,Jt(e,s,l))}}function Eh(e,i,s,l,f,m){switch(s){case"style":nn(e,l,m);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof l=="string"?Xn(e,l):(typeof l=="number"||typeof l=="bigint")&&Xn(e,""+l);break;case"onScroll":l!=null&&Re("scroll",e);break;case"onScrollEnd":l!=null&&Re("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Mi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ro.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),m=e[Un]||null,m=m!=null?m[s]:null,typeof m=="function"&&e.removeEventListener(i,m,f),typeof l=="function")){typeof m!="function"&&m!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,l,f);break t}s in e?e[s]=l:l===!0?e.setAttribute(s,""):Jt(e,s,l)}}}function Pn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Re("error",e),Re("load",e);var l=!1,f=!1,m;for(m in s)if(s.hasOwnProperty(m)){var E=s[m];if(E!=null)switch(m){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,m,E,s,null)}}f&&Ze(e,i,"srcSet",s.srcSet,s,null),l&&Ze(e,i,"src",s.src,s,null);return;case"input":Re("invalid",e);var N=m=E=f=null,Q=null,ft=null;for(l in s)if(s.hasOwnProperty(l)){var Et=s[l];if(Et!=null)switch(l){case"name":f=Et;break;case"type":E=Et;break;case"checked":Q=Et;break;case"defaultChecked":ft=Et;break;case"value":m=Et;break;case"defaultValue":N=Et;break;case"children":case"dangerouslySetInnerHTML":if(Et!=null)throw Error(a(137,i));break;default:Ze(e,i,l,Et,s,null)}}Qt(e,m,N,Q,ft,E,f,!1);return;case"select":Re("invalid",e),l=E=m=null;for(f in s)if(s.hasOwnProperty(f)&&(N=s[f],N!=null))switch(f){case"value":m=N;break;case"defaultValue":E=N;break;case"multiple":l=N;default:Ze(e,i,f,N,s,null)}i=m,s=E,e.multiple=!!l,i!=null?be(e,!!l,i,!1):s!=null&&be(e,!!l,s,!0);return;case"textarea":Re("invalid",e),m=f=l=null;for(E in s)if(s.hasOwnProperty(E)&&(N=s[E],N!=null))switch(E){case"value":l=N;break;case"defaultValue":f=N;break;case"children":m=N;break;case"dangerouslySetInnerHTML":if(N!=null)throw Error(a(91));break;default:Ze(e,i,E,N,s,null)}li(e,l,f,m);return;case"option":for(Q in s)if(s.hasOwnProperty(Q)&&(l=s[Q],l!=null))switch(Q){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Ze(e,i,Q,l,s,null)}return;case"dialog":Re("beforetoggle",e),Re("toggle",e),Re("cancel",e),Re("close",e);break;case"iframe":case"object":Re("load",e);break;case"video":case"audio":for(l=0;l<Ho.length;l++)Re(Ho[l],e);break;case"image":Re("error",e),Re("load",e);break;case"details":Re("toggle",e);break;case"embed":case"source":case"link":Re("error",e),Re("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ft in s)if(s.hasOwnProperty(ft)&&(l=s[ft],l!=null))switch(ft){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,ft,l,s,null)}return;default:if(yi(i)){for(Et in s)s.hasOwnProperty(Et)&&(l=s[Et],l!==void 0&&Eh(e,i,Et,l,s,void 0));return}}for(N in s)s.hasOwnProperty(N)&&(l=s[N],l!=null&&Ze(e,i,N,l,s,null))}function gy(e,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,m=null,E=null,N=null,Q=null,ft=null,Et=null;for(vt in s){var At=s[vt];if(s.hasOwnProperty(vt)&&At!=null)switch(vt){case"checked":break;case"value":break;case"defaultValue":Q=At;default:l.hasOwnProperty(vt)||Ze(e,i,vt,null,l,At)}}for(var ht in l){var vt=l[ht];if(At=s[ht],l.hasOwnProperty(ht)&&(vt!=null||At!=null))switch(ht){case"type":m=vt;break;case"name":f=vt;break;case"checked":ft=vt;break;case"defaultChecked":Et=vt;break;case"value":E=vt;break;case"defaultValue":N=vt;break;case"children":case"dangerouslySetInnerHTML":if(vt!=null)throw Error(a(137,i));break;default:vt!==At&&Ze(e,i,ht,vt,l,At)}}pn(e,E,N,Q,ft,Et,m,f);return;case"select":vt=E=N=ht=null;for(m in s)if(Q=s[m],s.hasOwnProperty(m)&&Q!=null)switch(m){case"value":break;case"multiple":vt=Q;default:l.hasOwnProperty(m)||Ze(e,i,m,null,l,Q)}for(f in l)if(m=l[f],Q=s[f],l.hasOwnProperty(f)&&(m!=null||Q!=null))switch(f){case"value":ht=m;break;case"defaultValue":N=m;break;case"multiple":E=m;default:m!==Q&&Ze(e,i,f,m,l,Q)}i=N,s=E,l=vt,ht!=null?be(e,!!s,ht,!1):!!l!=!!s&&(i!=null?be(e,!!s,i,!0):be(e,!!s,s?[]:"",!1));return;case"textarea":vt=ht=null;for(N in s)if(f=s[N],s.hasOwnProperty(N)&&f!=null&&!l.hasOwnProperty(N))switch(N){case"value":break;case"children":break;default:Ze(e,i,N,null,l,f)}for(E in l)if(f=l[E],m=s[E],l.hasOwnProperty(E)&&(f!=null||m!=null))switch(E){case"value":ht=f;break;case"defaultValue":vt=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==m&&Ze(e,i,E,f,l,m)}kn(e,ht,vt);return;case"option":for(var ne in s)if(ht=s[ne],s.hasOwnProperty(ne)&&ht!=null&&!l.hasOwnProperty(ne))switch(ne){case"selected":e.selected=!1;break;default:Ze(e,i,ne,null,l,ht)}for(Q in l)if(ht=l[Q],vt=s[Q],l.hasOwnProperty(Q)&&ht!==vt&&(ht!=null||vt!=null))switch(Q){case"selected":e.selected=ht&&typeof ht!="function"&&typeof ht!="symbol";break;default:Ze(e,i,Q,ht,l,vt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var fe in s)ht=s[fe],s.hasOwnProperty(fe)&&ht!=null&&!l.hasOwnProperty(fe)&&Ze(e,i,fe,null,l,ht);for(ft in l)if(ht=l[ft],vt=s[ft],l.hasOwnProperty(ft)&&ht!==vt&&(ht!=null||vt!=null))switch(ft){case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(a(137,i));break;default:Ze(e,i,ft,ht,l,vt)}return;default:if(yi(i)){for(var Ke in s)ht=s[Ke],s.hasOwnProperty(Ke)&&ht!==void 0&&!l.hasOwnProperty(Ke)&&Eh(e,i,Ke,void 0,l,ht);for(Et in l)ht=l[Et],vt=s[Et],!l.hasOwnProperty(Et)||ht===vt||ht===void 0&&vt===void 0||Eh(e,i,Et,ht,l,vt);return}}for(var rt in s)ht=s[rt],s.hasOwnProperty(rt)&&ht!=null&&!l.hasOwnProperty(rt)&&Ze(e,i,rt,null,l,ht);for(At in l)ht=l[At],vt=s[At],!l.hasOwnProperty(At)||ht===vt||ht==null&&vt==null||Ze(e,i,At,ht,l,vt)}function Kg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function vy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],m=f.transferSize,E=f.initiatorType,N=f.duration;if(m&&N&&Kg(E)){for(E=0,N=f.responseEnd,l+=1;l<s.length;l++){var Q=s[l],ft=Q.startTime;if(ft>N)break;var Et=Q.transferSize,At=Q.initiatorType;Et&&Kg(At)&&(Q=Q.responseEnd,E+=Et*(Q<N?1:(N-ft)/(Q-ft)))}if(--l,i+=8*(m+E)/(f.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var bh=null,Th=null;function wc(e){return e.nodeType===9?e:e.ownerDocument}function Jg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Qg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function Ah(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var wh=null;function _y(){var e=window.event;return e&&e.type==="popstate"?e===wh?!1:(wh=e,!0):(wh=null,!1)}var jg=typeof setTimeout=="function"?setTimeout:void 0,xy=typeof clearTimeout=="function"?clearTimeout:void 0,$g=typeof Promise=="function"?Promise:void 0,Sy=typeof queueMicrotask=="function"?queueMicrotask:typeof $g<"u"?function(e){return $g.resolve(null).then(e).catch(yy)}:jg;function yy(e){setTimeout(function(){throw e})}function as(e){return e==="head"}function tv(e,i){var s=i,l=0;do{var f=s.nextSibling;if(e.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){e.removeChild(f),wr(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")Vo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Vo(s);for(var m=s.firstChild;m;){var E=m.nextSibling,N=m.nodeName;m[Fa]||N==="SCRIPT"||N==="STYLE"||N==="LINK"&&m.rel.toLowerCase()==="stylesheet"||s.removeChild(m),m=E}}else s==="body"&&Vo(e.ownerDocument.body);s=f}while(s);wr(i)}function ev(e,i){var s=e;e=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=l}while(s)}function Rh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Rh(s),za(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function My(e,i,s,l){for(;e.nodeType===1;){var f=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Fa])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(m=e.getAttribute("rel"),m==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(m!==f.rel||e.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||e.getAttribute("title")!==(f.title==null?null:f.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(m=e.getAttribute("src"),(m!==(f.src==null?null:f.src)||e.getAttribute("type")!==(f.type==null?null:f.type)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&m&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var m=f.name==null?null:""+f.name;if(f.type==="hidden"&&e.getAttribute("name")===m)return e}else return e;if(e=Ci(e.nextSibling),e===null)break}return null}function Ey(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Ci(e.nextSibling),e===null))return null;return e}function nv(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Ci(e.nextSibling),e===null))return null;return e}function Ch(e){return e.data==="$?"||e.data==="$~"}function Dh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function by(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Ci(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Uh=null;function iv(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return Ci(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function av(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function sv(e,i,s){switch(i=wc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Vo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);za(e)}var Di=new Map,rv=new Set;function Rc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ma=F.d;F.d={f:Ty,r:Ay,D:wy,C:Ry,L:Cy,m:Dy,X:Ly,S:Uy,M:Ny};function Ty(){var e=Ma.f(),i=xc();return e||i}function Ay(e){var i=ra(e);i!==null&&i.tag===5&&i.type==="form"?E0(i):Ma.r(e)}var br=typeof document>"u"?null:document;function ov(e,i,s){var l=br;if(l&&typeof i=="string"&&i){var f=Ee(i);f='link[rel="'+e+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),rv.has(f)||(rv.add(f),e={rel:e,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),Pn(i,"link",e),dn(i),l.head.appendChild(i)))}}function wy(e){Ma.D(e),ov("dns-prefetch",e,null)}function Ry(e,i){Ma.C(e,i),ov("preconnect",e,i)}function Cy(e,i,s){Ma.L(e,i,s);var l=br;if(l&&e&&i){var f='link[rel="preload"][as="'+Ee(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+Ee(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+Ee(s.imageSizes)+'"]')):f+='[href="'+Ee(e)+'"]';var m=f;switch(i){case"style":m=Tr(e);break;case"script":m=Ar(e)}Di.has(m)||(e=v({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Di.set(m,e),l.querySelector(f)!==null||i==="style"&&l.querySelector(ko(m))||i==="script"&&l.querySelector(Xo(m))||(i=l.createElement("link"),Pn(i,"link",e),dn(i),l.head.appendChild(i)))}}function Dy(e,i){Ma.m(e,i);var s=br;if(s&&e){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+Ee(l)+'"][href="'+Ee(e)+'"]',m=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":m=Ar(e)}if(!Di.has(m)&&(e=v({rel:"modulepreload",href:e},i),Di.set(m,e),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Xo(m)))return}l=s.createElement("link"),Pn(l,"link",e),dn(l),s.head.appendChild(l)}}}function Uy(e,i,s){Ma.S(e,i,s);var l=br;if(l&&e){var f=Ba(l).hoistableStyles,m=Tr(e);i=i||"default";var E=f.get(m);if(!E){var N={loading:0,preload:null};if(E=l.querySelector(ko(m)))N.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Di.get(m))&&Lh(e,s);var Q=E=l.createElement("link");dn(Q),Pn(Q,"link",e),Q._p=new Promise(function(ft,Et){Q.onload=ft,Q.onerror=Et}),Q.addEventListener("load",function(){N.loading|=1}),Q.addEventListener("error",function(){N.loading|=2}),N.loading|=4,Cc(E,i,l)}E={type:"stylesheet",instance:E,count:1,state:N},f.set(m,E)}}}function Ly(e,i){Ma.X(e,i);var s=br;if(s&&e){var l=Ba(s).hoistableScripts,f=Ar(e),m=l.get(f);m||(m=s.querySelector(Xo(f)),m||(e=v({src:e,async:!0},i),(i=Di.get(f))&&Nh(e,i),m=s.createElement("script"),dn(m),Pn(m,"link",e),s.head.appendChild(m)),m={type:"script",instance:m,count:1,state:null},l.set(f,m))}}function Ny(e,i){Ma.M(e,i);var s=br;if(s&&e){var l=Ba(s).hoistableScripts,f=Ar(e),m=l.get(f);m||(m=s.querySelector(Xo(f)),m||(e=v({src:e,async:!0,type:"module"},i),(i=Di.get(f))&&Nh(e,i),m=s.createElement("script"),dn(m),Pn(m,"link",e),s.head.appendChild(m)),m={type:"script",instance:m,count:1,state:null},l.set(f,m))}}function lv(e,i,s,l){var f=(f=Pt.current)?Rc(f):null;if(!f)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Tr(s.href),s=Ba(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Tr(s.href);var m=Ba(f).hoistableStyles,E=m.get(e);if(E||(f=f.ownerDocument||f,E={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},m.set(e,E),(m=f.querySelector(ko(e)))&&!m._p&&(E.instance=m,E.state.loading=5),Di.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Di.set(e,s),m||Oy(f,e,s,E.state))),i&&l===null)throw Error(a(528,""));return E}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Ar(s),s=Ba(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Tr(e){return'href="'+Ee(e)+'"'}function ko(e){return'link[rel="stylesheet"]['+e+"]"}function cv(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function Oy(e,i,s,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Pn(i,"link",s),dn(i),e.head.appendChild(i))}function Ar(e){return'[src="'+Ee(e)+'"]'}function Xo(e){return"script[async]"+e}function uv(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+Ee(s.href)+'"]');if(l)return i.instance=l,dn(l),l;var f=v({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),dn(l),Pn(l,"style",f),Cc(l,s.precedence,e),i.instance=l;case"stylesheet":f=Tr(s.href);var m=e.querySelector(ko(f));if(m)return i.state.loading|=4,i.instance=m,dn(m),m;l=cv(s),(f=Di.get(f))&&Lh(l,f),m=(e.ownerDocument||e).createElement("link"),dn(m);var E=m;return E._p=new Promise(function(N,Q){E.onload=N,E.onerror=Q}),Pn(m,"link",l),i.state.loading|=4,Cc(m,s.precedence,e),i.instance=m;case"script":return m=Ar(s.src),(f=e.querySelector(Xo(m)))?(i.instance=f,dn(f),f):(l=s,(f=Di.get(m))&&(l=v({},s),Nh(l,f)),e=e.ownerDocument||e,f=e.createElement("script"),dn(f),Pn(f,"link",l),e.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Cc(l,s.precedence,e));return i.instance}function Cc(e,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,m=f,E=0;E<l.length;E++){var N=l[E];if(N.dataset.precedence===i)m=N;else if(m!==f)break}m?m.parentNode.insertBefore(e,m.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function Lh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Nh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Dc=null;function fv(e,i,s){if(Dc===null){var l=new Map,f=Dc=new Map;f.set(s,l)}else f=Dc,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(e))return l;for(l.set(e,null),s=s.getElementsByTagName(e),f=0;f<s.length;f++){var m=s[f];if(!(m[Fa]||m[hn]||e==="link"&&m.getAttribute("rel")==="stylesheet")&&m.namespaceURI!=="http://www.w3.org/2000/svg"){var E=m.getAttribute(i)||"";E=e+E;var N=l.get(E);N?N.push(m):l.set(E,[m])}}return l}function hv(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function Py(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function dv(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Iy(e,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=Tr(l.href),m=i.querySelector(ko(f));if(m){i=m._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=Uc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=m,dn(m);return}m=i.ownerDocument||i,l=cv(l),(f=Di.get(f))&&Lh(l,f),m=m.createElement("link"),dn(m);var E=m;E._p=new Promise(function(N,Q){E.onload=N,E.onerror=Q}),Pn(m,"link",l),s.instance=m}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=Uc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Oh=0;function Fy(e,i){return e.stylesheets&&e.count===0&&Nc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var l=setTimeout(function(){if(e.stylesheets&&Nc(e,e.stylesheets),e.unsuspend){var m=e.unsuspend;e.unsuspend=null,m()}},6e4+i);0<e.imgBytes&&Oh===0&&(Oh=62500*vy());var f=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Nc(e,e.stylesheets),e.unsuspend)){var m=e.unsuspend;e.unsuspend=null,m()}},(e.imgBytes>Oh?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function Uc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Nc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Lc=null;function Nc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Lc=new Map,i.forEach(zy,e),Lc=null,Uc.call(e))}function zy(e,i){if(!(i.state.loading&4)){var s=Lc.get(e);if(s)var l=s.get(null);else{s=new Map,Lc.set(e,s);for(var f=e.querySelectorAll("link[data-precedence],style[data-precedence]"),m=0;m<f.length;m++){var E=f[m];(E.nodeName==="LINK"||E.getAttribute("media")!=="not all")&&(s.set(E.dataset.precedence,E),l=E)}l&&s.set(null,l)}f=i.instance,E=f.getAttribute("data-precedence"),m=s.get(E)||l,m===l&&s.set(null,f),s.set(E,f),this.count++,l=Uc.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),m?m.parentNode.insertBefore(f,m.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(f,e.firstChild)),i.state.loading|=4}}var Wo={$$typeof:H,Provider:null,Consumer:null,_currentValue:Y,_currentValue2:Y,_threadCount:0};function By(e,i,s,l,f,m,E,N,Q){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=oe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=oe(0),this.hiddenUpdates=oe(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=m,this.onRecoverableError=E,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=Q,this.incompleteTransitions=new Map}function pv(e,i,s,l,f,m,E,N,Q,ft,Et,At){return e=new By(e,i,s,E,Q,ft,Et,At,N),i=1,m===!0&&(i|=24),m=ui(3,null,null,i),e.current=m,m.stateNode=e,i=df(),i.refCount++,e.pooledCache=i,i.refCount++,m.memoizedState={element:l,isDehydrated:s,cache:i},vf(m),e}function mv(e){return e?(e=ir,e):ir}function gv(e,i,s,l,f,m){f=mv(f),l.context===null?l.context=f:l.pendingContext=f,l=Ya(i),l.payload={element:s},m=m===void 0?null:m,m!==null&&(l.callback=m),s=Za(e,l,i),s!==null&&(ai(s,e,i),Eo(s,e,i))}function vv(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function Ph(e,i){vv(e,i),(e=e.alternate)&&vv(e,i)}function _v(e){if(e.tag===13||e.tag===31){var i=Ms(e,67108864);i!==null&&ai(i,e,67108864),Ph(e,67108864)}}function xv(e){if(e.tag===13||e.tag===31){var i=mi();i=io(i);var s=Ms(e,i);s!==null&&ai(s,e,i),Ph(e,i)}}var Oc=!0;function Hy(e,i,s,l){var f=P.T;P.T=null;var m=F.p;try{F.p=2,Ih(e,i,s,l)}finally{F.p=m,P.T=f}}function Gy(e,i,s,l){var f=P.T;P.T=null;var m=F.p;try{F.p=8,Ih(e,i,s,l)}finally{F.p=m,P.T=f}}function Ih(e,i,s,l){if(Oc){var f=Fh(l);if(f===null)Mh(e,i,l,Pc,s),yv(e,l);else if(ky(f,e,i,s,l))l.stopPropagation();else if(yv(e,l),i&4&&-1<Vy.indexOf(e)){for(;f!==null;){var m=ra(f);if(m!==null)switch(m.tag){case 3:if(m=m.stateNode,m.current.memoizedState.isDehydrated){var E=Ht(m.pendingLanes);if(E!==0){var N=m;for(N.pendingLanes|=2,N.entangledLanes|=2;E;){var Q=1<<31-xt(E);N.entanglements[1]|=Q,E&=~Q}Ji(m),(He&6)===0&&(vc=pe()+500,Bo(0))}}break;case 31:case 13:N=Ms(m,2),N!==null&&ai(N,m,2),xc(),Ph(m,2)}if(m=Fh(l),m===null&&Mh(e,i,l,Pc,s),m===f)break;f=m}f!==null&&l.stopPropagation()}else Mh(e,i,l,null,s)}}function Fh(e){return e=zu(e),zh(e)}var Pc=null;function zh(e){if(Pc=null,e=sa(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=u(i),e!==null)return e;e=null}else if(s===31){if(e=p(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Pc=e,null}function Sv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Se()){case G:return 2;case T:return 8;case at:case ct:return 32;case St:return 268435456;default:return 32}default:return 32}}var Bh=!1,ss=null,rs=null,os=null,qo=new Map,Yo=new Map,ls=[],Vy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function yv(e,i){switch(e){case"focusin":case"focusout":ss=null;break;case"dragenter":case"dragleave":rs=null;break;case"mouseover":case"mouseout":os=null;break;case"pointerover":case"pointerout":qo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yo.delete(i.pointerId)}}function Zo(e,i,s,l,f,m){return e===null||e.nativeEvent!==m?(e={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:m,targetContainers:[f]},i!==null&&(i=ra(i),i!==null&&_v(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),e)}function ky(e,i,s,l,f){switch(i){case"focusin":return ss=Zo(ss,e,i,s,l,f),!0;case"dragenter":return rs=Zo(rs,e,i,s,l,f),!0;case"mouseover":return os=Zo(os,e,i,s,l,f),!0;case"pointerover":var m=f.pointerId;return qo.set(m,Zo(qo.get(m)||null,e,i,s,l,f)),!0;case"gotpointercapture":return m=f.pointerId,Yo.set(m,Zo(Yo.get(m)||null,e,i,s,l,f)),!0}return!1}function Mv(e){var i=sa(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){e.blockedOn=i,Js(e.priority,function(){xv(s)});return}}else if(i===31){if(i=p(s),i!==null){e.blockedOn=i,Js(e.priority,function(){xv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ic(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Fh(e.nativeEvent);if(s===null){s=e.nativeEvent;var l=new s.constructor(s.type,s);Fu=l,s.target.dispatchEvent(l),Fu=null}else return i=ra(s),i!==null&&_v(i),e.blockedOn=s,!1;i.shift()}return!0}function Ev(e,i,s){Ic(e)&&s.delete(i)}function Xy(){Bh=!1,ss!==null&&Ic(ss)&&(ss=null),rs!==null&&Ic(rs)&&(rs=null),os!==null&&Ic(os)&&(os=null),qo.forEach(Ev),Yo.forEach(Ev)}function Fc(e,i){e.blockedOn===i&&(e.blockedOn=null,Bh||(Bh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Xy)))}var zc=null;function bv(e){zc!==e&&(zc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){zc===e&&(zc=null);for(var i=0;i<e.length;i+=3){var s=e[i],l=e[i+1],f=e[i+2];if(typeof l!="function"){if(zh(l||s)===null)continue;break}var m=ra(s);m!==null&&(e.splice(i,3),i-=3,Ff(m,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function wr(e){function i(Q){return Fc(Q,e)}ss!==null&&Fc(ss,e),rs!==null&&Fc(rs,e),os!==null&&Fc(os,e),qo.forEach(i),Yo.forEach(i);for(var s=0;s<ls.length;s++){var l=ls[s];l.blockedOn===e&&(l.blockedOn=null)}for(;0<ls.length&&(s=ls[0],s.blockedOn===null);)Mv(s),s.blockedOn===null&&ls.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],m=s[l+1],E=f[Un]||null;if(typeof m=="function")E||bv(s);else if(E){var N=null;if(m&&m.hasAttribute("formAction")){if(f=m,E=m[Un]||null)N=E.formAction;else if(zh(f)!==null)continue}else N=E.action;typeof N=="function"?s[l+1]=N:(s.splice(l,3),l-=3),bv(s)}}}function Tv(){function e(m){m.canIntercept&&m.info==="react-transition"&&m.intercept({handler:function(){return new Promise(function(E){return f=E})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var m=navigation.currentEntry;m&&m.url!=null&&navigation.navigate(m.url,{state:m.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function Hh(e){this._internalRoot=e}Bc.prototype.render=Hh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=mi();gv(s,l,e,i,null,null)},Bc.prototype.unmount=Hh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;gv(e.current,2,null,e,null,null),xc(),i[jn]=null}};function Bc(e){this._internalRoot=e}Bc.prototype.unstable_scheduleHydration=function(e){if(e){var i=so();e={blockedOn:null,target:e,priority:i};for(var s=0;s<ls.length&&i!==0&&i<ls[s].priority;s++);ls.splice(s,0,e),s===0&&Mv(e)}};var Av=t.version;if(Av!=="19.2.7")throw Error(a(527,Av,"19.2.7"));F.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=h(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var Wy={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Hc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Hc.isDisabled&&Hc.supportsFiber)try{_t=Hc.inject(Wy),yt=Hc}catch{}}return Jo.createRoot=function(e,i){if(!o(e))throw Error(a(299));var s=!1,l="",f=N0,m=O0,E=P0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(m=i.onCaughtError),i.onRecoverableError!==void 0&&(E=i.onRecoverableError)),i=pv(e,1,!1,null,null,s,l,null,f,m,E,Tv),e[jn]=i.current,yh(e),new Hh(i)},Jo.hydrateRoot=function(e,i,s){if(!o(e))throw Error(a(299));var l=!1,f="",m=N0,E=O0,N=P0,Q=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(m=s.onUncaughtError),s.onCaughtError!==void 0&&(E=s.onCaughtError),s.onRecoverableError!==void 0&&(N=s.onRecoverableError),s.formState!==void 0&&(Q=s.formState)),i=pv(e,1,!0,i,s??null,l,f,Q,m,E,N,Tv),i.context=mv(null),s=i.current,l=mi(),l=io(l),f=Ya(l),f.callback=null,Za(s,f,l),s=l,i.current.lanes=s,$t(i,s),Ji(i),e[jn]=i.current,yh(e),new Bc(i)},Jo.version="19.2.7",Jo}var Iv;function iM(){if(Iv)return kh.exports;Iv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),kh.exports=nM(),kh.exports}var aM=iM();function sM(r){const[t,n]=Zn.useState(!1);return Zn.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>n(r&&!document.hidden&&!a.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(o);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),a.addEventListener("change",o),document.addEventListener("visibilitychange",o),o(),()=>{c.disconnect(),a.removeEventListener("change",o),document.removeEventListener("visibilitychange",o)}},[r]),t}function rM(r,t,n,a){Zn.useEffect(()=>{const o=t.current,c=n.current;if(!a||!o||!c)return;const u=o.closest("[data-scene-surface]")??o;let p=null;const d=v=>{if(!p||v.pointerId!==p.id)return;const _=Math.max(1,Math.min(u.clientWidth,u.clientHeight));r.drag(c,(v.clientX-p.x)/_,(v.clientY-p.y)/_)},h=v=>{!p||v&&v.pointerId!==p.id||(p=null,delete o.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",d),window.removeEventListener("pointerup",h),window.removeEventListener("pointercancel",h))},g=v=>{if(p||!v.isPrimary||v.button!==0)return;const _=v.target instanceof Element?v.target:null;!_||!(o.contains(_)||_.hasAttribute("data-scene-drag"))||(v.pointerType==="mouse"&&v.preventDefault(),p={id:v.pointerId,x:v.clientX,y:v.clientY},o.dataset.look="drag",window.addEventListener("pointermove",d),window.addEventListener("pointerup",h),window.addEventListener("pointercancel",h))};return u.addEventListener("pointerdown",g),()=>{u.removeEventListener("pointerdown",g),h()}},[a,r,t,n])}class oM{constructor(t){this.options=t,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null}acquire(t){return window.clearTimeout(this.disposeTimer),this.holders.push(t),this.ensureEngine(),this.attachTop(),t.onStatus(this.status),()=>this.release(t)}setRunning(t,n){t.running=n,this.top===t&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(t){}drag(t,n,a){var o,c;this.top===t&&((c=(o=this.engine)==null?void 0:o.drag)==null||c.call(o,n,a))}releaseDrag(t){var n,a;this.top===t&&((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n))}release(t){var n,a;if(this.holders=this.holders.filter(o=>o!==t),this.holders.length){this.attachTop();return}(n=this.engine)==null||n.stop(),this.observe(null),(a=this.canvas)==null||a.remove(),this.disposeTimer=window.setTimeout(()=>this.teardown(),5e3)}setStatus(t){this.status=t;for(const n of this.holders)n.onStatus(t)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const t=document.createElement("canvas");t.className=this.options.canvasClass,t.setAttribute("aria-hidden","true"),this.canvas=t;try{this.engine=this.options.create(t,()=>this.fail())}catch{this.fail();return}const n=this.engine;this.setStatus("loading"),this.configure(n),this.resize(),n.init().then(()=>{this.engine===n&&(n.renderFrame(0),this.setStatus("ready"),this.applyRunning())}).catch(()=>this.fail())}attachTop(){var n,a;const t=this.top;!t||!this.canvas||((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n),this.canvas.parentElement!==t.mount&&t.mount.appendChild(this.canvas),this.observe(t.mount),this.resize(),this.applyRunning())}observe(t){var n;this.observed!==t&&((n=this.observer)==null||n.disconnect(),this.observed=t,t&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(t)))}resize(){var o,c;const t=(o=this.top)==null?void 0:o.mount;if(!t||!this.engine)return;const n=t.clientWidth||window.innerWidth,a=t.clientHeight||window.innerHeight;this.engine.setSize(n,a,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var t;!this.engine||this.status!=="ready"||((t=this.top)!=null&&t.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}teardown(){var t,n;window.clearTimeout(this.disposeTimer),this.observe(null),(t=this.engine)==null||t.dispose(),this.engine=null,(n=this.canvas)==null||n.remove(),this.canvas=null,this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xp="186",lM=0,Fv=1,cM=2,cl=1,uM=2,sl=3,Vs=0,ri=1,_i=2,Oa=0,ul=1,yu=2,zv=3,Bv=4,fM=5,Vr=100,hM=101,dM=102,pM=103,mM=104,gM=200,vM=201,_M=202,xM=203,j_=204,$_=205,SM=206,yM=207,MM=208,EM=209,bM=210,TM=211,AM=212,wM=213,RM=214,wd=0,Rd=1,Cd=2,ml=3,Dd=4,Ud=5,Ld=6,Nd=7,tx=0,CM=1,DM=2,ea=0,ex=1,nx=2,ix=3,Sp=4,ax=5,sx=6,rx=7,ox=300,ks=301,Kr=302,Yh=303,Zh=304,Tl=306,gl=1e3,Vi=1001,Od=1002,Fn=1003,UM=1004,Gc=1005,rn=1006,Kh=1007,Na=1008,En=1009,lx=1010,cx=1011,vl=1012,yp=1013,Xi=1014,Si=1015,Dn=1016,Mp=1017,Ep=1018,_l=1020,ux=35902,fx=35899,hx=1021,dx=1022,Li=1023,na=1026,Hs=1027,bp=1028,Tp=1029,Xs=1030,Ap=1031,wp=1033,mu=33776,gu=33777,vu=33778,_u=33779,Pd=35840,Id=35841,Fd=35842,zd=35843,Bd=36196,Hd=37492,Gd=37496,Vd=37488,kd=37489,Mu=37490,Xd=37491,Wd=37808,qd=37809,Yd=37810,Zd=37811,Kd=37812,Jd=37813,Qd=37814,jd=37815,$d=37816,tp=37817,ep=37818,np=37819,ip=37820,ap=37821,sp=36492,rp=36494,op=36495,lp=36283,cp=36284,Eu=36285,up=36286,LM=3200,fp=0,NM=1,Ua="",Kn="srgb",Jr="srgb-linear",bu="linear",Xe="srgb",Jh=7680,OM=519,PM=512,IM=513,FM=514,Uu=515,zM=516,BM=517,Rp=518,HM=519,GM=35044,Hv="300 es",ta=2e3,xl=2001;function VM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Tu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function kM(){const r=Tu("canvas");return r.style.display="block",r}const Gv={};function Vv(...r){const t="THREE."+r.shift();console.log(t,...r)}function px(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function he(...r){r=px(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...r)}}function Le(...r){r=px(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...r)}}function Yr(...r){const t=r.join(" ");t in Gv||(Gv[t]=!0,he(...r))}function XM(r,t,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const WM={[wd]:Rd,[Cd]:Ld,[Dd]:Nd,[ml]:Ud,[Rd]:wd,[Ld]:Cd,[Nd]:Dd,[Ud]:ml};class qs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const o=a[t];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kv=1234567;const fl=Math.PI/180,Qr=180/Math.PI;function Ys(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[n&63|128]+Bn[n>>8&255]+"-"+Bn[n>>16&255]+Bn[n>>24&255]+Bn[a&255]+Bn[a>>8&255]+Bn[a>>16&255]+Bn[a>>24&255]).toLowerCase()}function Me(r,t,n){return Math.max(t,Math.min(n,r))}function Cp(r,t){return(r%t+t)%t}function qM(r,t,n,a,o){return a+(r-t)*(o-a)/(n-t)}function YM(r,t,n){return r!==t?(n-r)/(t-r):0}function hl(r,t,n){return(1-n)*r+n*t}function ZM(r,t,n,a){return hl(r,t,1-Math.exp(-n*a))}function KM(r,t=1){return t-Math.abs(Cp(r,t*2)-t)}function JM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function QM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function jM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function $M(r,t){return r+Math.random()*(t-r)}function t1(r){return r*(.5-Math.random())}function e1(r){r!==void 0&&(kv=r);let t=kv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function n1(r){return r*fl}function i1(r){return r*Qr}function a1(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function s1(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function r1(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function o1(r,t,n,a,o){const c=Math.cos,u=Math.sin,p=c(n/2),d=u(n/2),h=c((t+a)/2),g=u((t+a)/2),v=c((t-a)/2),_=u((t-a)/2),x=c((a-t)/2),b=u((a-t)/2);switch(o){case"XYX":r.set(p*g,d*v,d*_,p*h);break;case"YZY":r.set(d*_,p*g,d*v,p*h);break;case"ZXZ":r.set(d*v,d*_,p*g,p*h);break;case"XZX":r.set(p*g,d*b,d*x,p*h);break;case"YXY":r.set(d*x,p*g,d*b,p*h);break;case"ZYZ":r.set(d*b,d*x,p*g,p*h);break;default:he("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function kr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function qn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ea={DEG2RAD:fl,RAD2DEG:Qr,generateUUID:Ys,clamp:Me,euclideanModulo:Cp,mapLinear:qM,inverseLerp:YM,lerp:hl,damp:ZM,pingpong:KM,smoothstep:JM,smootherstep:QM,randInt:jM,randFloat:$M,randFloatSpread:t1,seededRandom:e1,degToRad:n1,radToDeg:i1,isPowerOfTwo:a1,ceilPowerOfTwo:s1,floorPowerOfTwo:r1,setQuaternionFromProperEuler:o1,normalize:qn,denormalize:kr},Xp=class Xp{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(Me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-t.x,u=this.y-t.y;return this.x=c*a-u*o+t.x,this.y=c*o+u*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Xp.prototype.isVector2=!0;let Ft=Xp;class Zs{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,c,u,p){let d=a[o+0],h=a[o+1],g=a[o+2],v=a[o+3],_=c[u+0],x=c[u+1],b=c[u+2],U=c[u+3];if(v!==U||d!==_||h!==x||g!==b){let M=d*_+h*x+g*b+v*U;M<0&&(_=-_,x=-x,b=-b,U=-U,M=-M);let S=1-p;if(M<.9995){const z=Math.acos(M),H=Math.sin(z);S=Math.sin(S*z)/H,p=Math.sin(p*z)/H,d=d*S+_*p,h=h*S+x*p,g=g*S+b*p,v=v*S+U*p}else{d=d*S+_*p,h=h*S+x*p,g=g*S+b*p,v=v*S+U*p;const z=1/Math.sqrt(d*d+h*h+g*g+v*v);d*=z,h*=z,g*=z,v*=z}}t[n]=d,t[n+1]=h,t[n+2]=g,t[n+3]=v}static multiplyQuaternionsFlat(t,n,a,o,c,u){const p=a[o],d=a[o+1],h=a[o+2],g=a[o+3],v=c[u],_=c[u+1],x=c[u+2],b=c[u+3];return t[n]=p*b+g*v+d*x-h*_,t[n+1]=d*b+g*_+h*v-p*x,t[n+2]=h*b+g*x+p*_-d*v,t[n+3]=g*b-p*v-d*_-h*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,c=t._z,u=t._order,p=Math.cos,d=Math.sin,h=p(a/2),g=p(o/2),v=p(c/2),_=d(a/2),x=d(o/2),b=d(c/2);switch(u){case"XYZ":this._x=_*g*v+h*x*b,this._y=h*x*v-_*g*b,this._z=h*g*b+_*x*v,this._w=h*g*v-_*x*b;break;case"YXZ":this._x=_*g*v+h*x*b,this._y=h*x*v-_*g*b,this._z=h*g*b-_*x*v,this._w=h*g*v+_*x*b;break;case"ZXY":this._x=_*g*v-h*x*b,this._y=h*x*v+_*g*b,this._z=h*g*b+_*x*v,this._w=h*g*v-_*x*b;break;case"ZYX":this._x=_*g*v-h*x*b,this._y=h*x*v+_*g*b,this._z=h*g*b-_*x*v,this._w=h*g*v+_*x*b;break;case"YZX":this._x=_*g*v+h*x*b,this._y=h*x*v+_*g*b,this._z=h*g*b-_*x*v,this._w=h*g*v-_*x*b;break;case"XZY":this._x=_*g*v-h*x*b,this._y=h*x*v-_*g*b,this._z=h*g*b+_*x*v,this._w=h*g*v+_*x*b;break;default:he("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],c=n[8],u=n[1],p=n[5],d=n[9],h=n[2],g=n[6],v=n[10],_=a+p+v;if(_>0){const x=.5/Math.sqrt(_+1);this._w=.25/x,this._x=(g-d)*x,this._y=(c-h)*x,this._z=(u-o)*x}else if(a>p&&a>v){const x=2*Math.sqrt(1+a-p-v);this._w=(g-d)/x,this._x=.25*x,this._y=(o+u)/x,this._z=(c+h)/x}else if(p>v){const x=2*Math.sqrt(1+p-a-v);this._w=(c-h)/x,this._x=(o+u)/x,this._y=.25*x,this._z=(d+g)/x}else{const x=2*Math.sqrt(1+v-a-p);this._w=(u-o)/x,this._x=(c+h)/x,this._y=(d+g)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,c=t._z,u=t._w,p=n._x,d=n._y,h=n._z,g=n._w;return this._x=a*g+u*p+o*h-c*d,this._y=o*g+u*d+c*p-a*h,this._z=c*g+u*h+a*d-o*p,this._w=u*g-a*p-o*d-c*h,this._onChangeCallback(),this}slerp(t,n){let a=t._x,o=t._y,c=t._z,u=t._w,p=this.dot(t);p<0&&(a=-a,o=-o,c=-c,u=-u,p=-p);let d=1-n;if(p<.9995){const h=Math.acos(p),g=Math.sin(h);d=Math.sin(d*h)/g,n=Math.sin(n*h)/g,this._x=this._x*d+a*n,this._y=this._y*d+o*n,this._z=this._z*d+c*n,this._w=this._w*d+u*n,this._onChangeCallback()}else this._x=this._x*d+a*n,this._y=this._y*d+o*n,this._z=this._z*d+c*n,this._w=this._w*d+u*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Wp=class Wp{constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Xv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Xv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=t.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,c=t.x,u=t.y,p=t.z,d=t.w,h=2*(u*o-p*a),g=2*(p*n-c*o),v=2*(c*a-u*n);return this.x=n+d*h+u*v-p*g,this.y=a+d*g+p*h-c*v,this.z=o+d*v+c*g-u*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this.z=Me(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this.z=Me(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,c=t.z,u=n.x,p=n.y,d=n.z;return this.x=o*d-c*p,this.y=c*u-a*d,this.z=a*p-o*u,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Qh.copy(this).projectOnVector(t),this.sub(Qh)}reflect(t){return this.sub(Qh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(Me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Wp.prototype.isVector3=!0;let J=Wp;const Qh=new J,Xv=new Zs,qp=class qp{constructor(t,n,a,o,c,u,p,d,h){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,p,d,h)}set(t,n,a,o,c,u,p,d,h){const g=this.elements;return g[0]=t,g[1]=o,g[2]=p,g[3]=n,g[4]=c,g[5]=d,g[6]=a,g[7]=u,g[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],p=a[3],d=a[6],h=a[1],g=a[4],v=a[7],_=a[2],x=a[5],b=a[8],U=o[0],M=o[3],S=o[6],z=o[1],H=o[4],A=o[7],O=o[2],w=o[5],L=o[8];return c[0]=u*U+p*z+d*O,c[3]=u*M+p*H+d*w,c[6]=u*S+p*A+d*L,c[1]=h*U+g*z+v*O,c[4]=h*M+g*H+v*w,c[7]=h*S+g*A+v*L,c[2]=_*U+x*z+b*O,c[5]=_*M+x*H+b*w,c[8]=_*S+x*A+b*L,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],p=t[5],d=t[6],h=t[7],g=t[8];return n*u*g-n*p*h-a*c*g+a*p*d+o*c*h-o*u*d}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],p=t[5],d=t[6],h=t[7],g=t[8],v=g*u-p*h,_=p*d-g*c,x=h*c-u*d,b=n*v+a*_+o*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const U=1/b;return t[0]=v*U,t[1]=(o*h-g*a)*U,t[2]=(p*a-o*u)*U,t[3]=_*U,t[4]=(g*n-o*d)*U,t[5]=(o*c-p*n)*U,t[6]=x*U,t[7]=(a*d-h*n)*U,t[8]=(u*n-a*c)*U,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,c,u,p){const d=Math.cos(c),h=Math.sin(c);return this.set(a*d,a*h,-a*(d*u+h*p)+u+t,-o*h,o*d,-o*(-h*u+d*p)+p+n,0,0,1),this}scale(t,n){return Yr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(jh.makeScale(t,n)),this}rotate(t){return Yr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(jh.makeRotation(-t)),this}translate(t,n){return Yr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(jh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};qp.prototype.isMatrix3=!0;let ge=qp;const jh=new ge,Wv=new ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qv=new ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function l1(){const r={enabled:!0,workingColorSpace:Jr,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===Xe&&(o.r=Pa(o.r),o.g=Pa(o.g),o.b=Pa(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Xe&&(o.r=Zr(o.r),o.g=Zr(o.g),o.b=Zr(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Ua?bu:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return Yr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return Yr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[Jr]:{primaries:t,whitePoint:a,transfer:bu,toXYZ:Wv,fromXYZ:qv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Kn},outputColorSpaceConfig:{drawingBufferColorSpace:Kn}},[Kn]:{primaries:t,whitePoint:a,transfer:Xe,toXYZ:Wv,fromXYZ:qv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Kn}}}),r}const Ne=l1();function Pa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Zr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Rr;class c1{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Rr===void 0&&(Rr=Tu("canvas")),Rr.width=t.width,Rr.height=t.height;const o=Rr.getContext("2d");t instanceof ImageData?o.putImageData(t,0,0):o.drawImage(t,0,0,t.width,t.height),a=Rr}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Tu("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=Pa(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Pa(n[a]/255)*255):n[a]=Pa(n[a]);return{data:n,width:t.width,height:t.height}}else return he("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let u1=0;class Dp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:u1++}),this.uuid=Ys(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,p=o.length;u<p;u++)o[u].isDataTexture?c.push($h(o[u].image)):c.push($h(o[u]))}else c=$h(o);a.url=c}return n||(t.images[this.uuid]=a),a}}function $h(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?c1.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(he("Texture: Unable to serialize Texture."),{})}let f1=0;const td=new J;class Vn extends qs{constructor(t=Vn.DEFAULT_IMAGE,n=Vn.DEFAULT_MAPPING,a=Vi,o=Vi,c=rn,u=Na,p=Li,d=En,h=Vn.DEFAULT_ANISOTROPY,g=Ua){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:f1++}),this.uuid=Ys(),this.name="",this.source=new Dp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=h,this.format=p,this.internalFormat=null,this.type=d,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(td).x}get height(){return this.source.getSize(td).y}get depth(){return this.source.getSize(td).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){he(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){he(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ox)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gl:t.x=t.x-Math.floor(t.x);break;case Vi:t.x=t.x<0?0:1;break;case Od:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gl:t.y=t.y-Math.floor(t.y);break;case Vi:t.y=t.y<0?0:1;break;case Od:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=ox;Vn.DEFAULT_ANISOTROPY=1;const Yp=class Yp{constructor(t=0,n=0,a=0,o=1){this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=this.w,u=t.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,c;const d=t.elements,h=d[0],g=d[4],v=d[8],_=d[1],x=d[5],b=d[9],U=d[2],M=d[6],S=d[10];if(Math.abs(g-_)<.01&&Math.abs(v-U)<.01&&Math.abs(b-M)<.01){if(Math.abs(g+_)<.1&&Math.abs(v+U)<.1&&Math.abs(b+M)<.1&&Math.abs(h+x+S-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const H=(h+1)/2,A=(x+1)/2,O=(S+1)/2,w=(g+_)/4,L=(v+U)/4,y=(b+M)/4;return H>A&&H>O?H<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(H),o=w/a,c=L/a):A>O?A<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(A),a=w/o,c=y/o):O<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(O),a=L/c,o=y/c),this.set(a,o,c,n),this}let z=Math.sqrt((M-b)*(M-b)+(v-U)*(v-U)+(_-g)*(_-g));return Math.abs(z)<.001&&(z=1),this.x=(M-b)/z,this.y=(v-U)/z,this.z=(_-g)/z,this.w=Math.acos((h+x+S-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this.z=Me(this.z,t.z,n.z),this.w=Me(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this.z=Me(this.z,t,n),this.w=Me(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Yp.prototype.isVector4=!0;let en=Yp;class h1 extends qs{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new en(0,0,t,n),this.scissorTest=!1,this.viewport=new en(0,0,t,n),this.textures=[];const o={width:t,height:n,depth:a.depth},c=new Vn(o),u=a.count;for(let p=0;p<u;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},t.textures[n].image);this.textures[n].source=new Dp(o)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends h1{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class mx extends Vn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class d1 extends Vn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Du=class Du{constructor(t,n,a,o,c,u,p,d,h,g,v,_,x,b,U,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,p,d,h,g,v,_,x,b,U,M)}set(t,n,a,o,c,u,p,d,h,g,v,_,x,b,U,M){const S=this.elements;return S[0]=t,S[4]=n,S[8]=a,S[12]=o,S[1]=c,S[5]=u,S[9]=p,S[13]=d,S[2]=h,S[6]=g,S[10]=v,S[14]=_,S[3]=x,S[7]=b,S[11]=U,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Du().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,o=1/Cr.setFromMatrixColumn(t,0).length(),c=1/Cr.setFromMatrixColumn(t,1).length(),u=1/Cr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,c=t.z,u=Math.cos(a),p=Math.sin(a),d=Math.cos(o),h=Math.sin(o),g=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const _=u*g,x=u*v,b=p*g,U=p*v;n[0]=d*g,n[4]=-d*v,n[8]=h,n[1]=x+b*h,n[5]=_-U*h,n[9]=-p*d,n[2]=U-_*h,n[6]=b+x*h,n[10]=u*d}else if(t.order==="YXZ"){const _=d*g,x=d*v,b=h*g,U=h*v;n[0]=_+U*p,n[4]=b*p-x,n[8]=u*h,n[1]=u*v,n[5]=u*g,n[9]=-p,n[2]=x*p-b,n[6]=U+_*p,n[10]=u*d}else if(t.order==="ZXY"){const _=d*g,x=d*v,b=h*g,U=h*v;n[0]=_-U*p,n[4]=-u*v,n[8]=b+x*p,n[1]=x+b*p,n[5]=u*g,n[9]=U-_*p,n[2]=-u*h,n[6]=p,n[10]=u*d}else if(t.order==="ZYX"){const _=u*g,x=u*v,b=p*g,U=p*v;n[0]=d*g,n[4]=b*h-x,n[8]=_*h+U,n[1]=d*v,n[5]=U*h+_,n[9]=x*h-b,n[2]=-h,n[6]=p*d,n[10]=u*d}else if(t.order==="YZX"){const _=u*d,x=u*h,b=p*d,U=p*h;n[0]=d*g,n[4]=U-_*v,n[8]=b*v+x,n[1]=v,n[5]=u*g,n[9]=-p*g,n[2]=-h*g,n[6]=x*v+b,n[10]=_-U*v}else if(t.order==="XZY"){const _=u*d,x=u*h,b=p*d,U=p*h;n[0]=d*g,n[4]=-v,n[8]=h*g,n[1]=_*v+U,n[5]=u*g,n[9]=x*v-b,n[2]=b*v-x,n[6]=p*g,n[10]=U*v+_}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(p1,t,m1)}lookAt(t,n,a){const o=this.elements;return gi.subVectors(t,n),gi.lengthSq()===0&&(gi.z=1),gi.normalize(),us.crossVectors(a,gi),us.lengthSq()===0&&(Math.abs(a.z)===1?gi.x+=1e-4:gi.z+=1e-4,gi.normalize(),us.crossVectors(a,gi)),us.normalize(),Vc.crossVectors(gi,us),o[0]=us.x,o[4]=Vc.x,o[8]=gi.x,o[1]=us.y,o[5]=Vc.y,o[9]=gi.y,o[2]=us.z,o[6]=Vc.z,o[10]=gi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],p=a[4],d=a[8],h=a[12],g=a[1],v=a[5],_=a[9],x=a[13],b=a[2],U=a[6],M=a[10],S=a[14],z=a[3],H=a[7],A=a[11],O=a[15],w=o[0],L=o[4],y=o[8],D=o[12],B=o[1],V=o[5],q=o[9],Z=o[13],I=o[2],X=o[6],P=o[10],F=o[14],Y=o[3],k=o[7],W=o[11],R=o[15];return c[0]=u*w+p*B+d*I+h*Y,c[4]=u*L+p*V+d*X+h*k,c[8]=u*y+p*q+d*P+h*W,c[12]=u*D+p*Z+d*F+h*R,c[1]=g*w+v*B+_*I+x*Y,c[5]=g*L+v*V+_*X+x*k,c[9]=g*y+v*q+_*P+x*W,c[13]=g*D+v*Z+_*F+x*R,c[2]=b*w+U*B+M*I+S*Y,c[6]=b*L+U*V+M*X+S*k,c[10]=b*y+U*q+M*P+S*W,c[14]=b*D+U*Z+M*F+S*R,c[3]=z*w+H*B+A*I+O*Y,c[7]=z*L+H*V+A*X+O*k,c[11]=z*y+H*q+A*P+O*W,c[15]=z*D+H*Z+A*F+O*R,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[12],u=t[1],p=t[5],d=t[9],h=t[13],g=t[2],v=t[6],_=t[10],x=t[14],b=t[3],U=t[7],M=t[11],S=t[15],z=d*x-h*_,H=p*x-h*v,A=p*_-d*v,O=u*x-h*g,w=u*_-d*g,L=u*v-p*g;return n*(U*z-M*H+S*A)-a*(b*z-M*O+S*w)+o*(b*H-U*O+S*L)-c*(b*A-U*w+M*L)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[1],u=t[5],p=t[9],d=t[2],h=t[6],g=t[10];return n*(u*g-p*h)-a*(c*g-p*d)+o*(c*h-u*d)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],p=t[5],d=t[6],h=t[7],g=t[8],v=t[9],_=t[10],x=t[11],b=t[12],U=t[13],M=t[14],S=t[15],z=n*p-a*u,H=n*d-o*u,A=n*h-c*u,O=a*d-o*p,w=a*h-c*p,L=o*h-c*d,y=g*U-v*b,D=g*M-_*b,B=g*S-x*b,V=v*M-_*U,q=v*S-x*U,Z=_*S-x*M,I=z*Z-H*q+A*V+O*B-w*D+L*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const X=1/I;return t[0]=(p*Z-d*q+h*V)*X,t[1]=(o*q-a*Z-c*V)*X,t[2]=(U*L-M*w+S*O)*X,t[3]=(_*w-v*L-x*O)*X,t[4]=(d*B-u*Z-h*D)*X,t[5]=(n*Z-o*B+c*D)*X,t[6]=(M*A-b*L-S*H)*X,t[7]=(g*L-_*A+x*H)*X,t[8]=(u*q-p*B+h*y)*X,t[9]=(a*B-n*q-c*y)*X,t[10]=(b*w-U*A+S*z)*X,t[11]=(v*A-g*w-x*z)*X,t[12]=(p*D-u*V-d*y)*X,t[13]=(n*V-a*D+o*y)*X,t[14]=(U*H-b*O-M*z)*X,t[15]=(g*O-v*H+_*z)*X,this}scale(t){const n=this.elements,a=t.x,o=t.y,c=t.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=t.x,p=t.y,d=t.z,h=c*u,g=c*p;return this.set(h*u+a,h*p-o*d,h*d+o*p,0,h*p+o*d,g*p+a,g*d-o*u,0,h*d-o*p,g*d+o*u,c*d*d+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,c,u){return this.set(1,a,c,0,t,1,u,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,c=n._x,u=n._y,p=n._z,d=n._w,h=c+c,g=u+u,v=p+p,_=c*h,x=c*g,b=c*v,U=u*g,M=u*v,S=p*v,z=d*h,H=d*g,A=d*v,O=a.x,w=a.y,L=a.z;return o[0]=(1-(U+S))*O,o[1]=(x+A)*O,o[2]=(b-H)*O,o[3]=0,o[4]=(x-A)*w,o[5]=(1-(_+S))*w,o[6]=(M+z)*w,o[7]=0,o[8]=(b+H)*L,o[9]=(M-z)*L,o[10]=(1-(_+U))*L,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;t.x=o[12],t.y=o[13],t.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=Cr.set(o[0],o[1],o[2]).length();const p=Cr.set(o[4],o[5],o[6]).length(),d=Cr.set(o[8],o[9],o[10]).length();c<0&&(u=-u),zi.copy(this);const h=1/u,g=1/p,v=1/d;return zi.elements[0]*=h,zi.elements[1]*=h,zi.elements[2]*=h,zi.elements[4]*=g,zi.elements[5]*=g,zi.elements[6]*=g,zi.elements[8]*=v,zi.elements[9]*=v,zi.elements[10]*=v,n.setFromRotationMatrix(zi),a.x=u,a.y=p,a.z=d,this}makePerspective(t,n,a,o,c,u,p=ta,d=!1){const h=this.elements,g=2*c/(n-t),v=2*c/(a-o),_=(n+t)/(n-t),x=(a+o)/(a-o);let b,U;if(d)b=c/(u-c),U=u*c/(u-c);else if(p===ta)b=-(u+c)/(u-c),U=-2*u*c/(u-c);else if(p===xl)b=-u/(u-c),U=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return h[0]=g,h[4]=0,h[8]=_,h[12]=0,h[1]=0,h[5]=v,h[9]=x,h[13]=0,h[2]=0,h[6]=0,h[10]=b,h[14]=U,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,n,a,o,c,u,p=ta,d=!1){const h=this.elements,g=2/(n-t),v=2/(a-o),_=-(n+t)/(n-t),x=-(a+o)/(a-o);let b,U;if(d)b=1/(u-c),U=u/(u-c);else if(p===ta)b=-2/(u-c),U=-(u+c)/(u-c);else if(p===xl)b=-1/(u-c),U=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return h[0]=g,h[4]=0,h[8]=0,h[12]=_,h[1]=0,h[5]=v,h[9]=0,h[13]=x,h[2]=0,h[6]=0,h[10]=b,h[14]=U,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}};Du.prototype.isMatrix4=!0;let Ge=Du;const Cr=new J,zi=new Ge,p1=new J(0,0,0),m1=new J(1,1,1),us=new J,Vc=new J,gi=new J,Yv=new Ge,Zv=new Zs;class Ia{constructor(t=0,n=0,a=0,o=Ia.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,c=o[0],u=o[4],p=o[8],d=o[1],h=o[5],g=o[9],v=o[2],_=o[6],x=o[10];switch(n){case"XYZ":this._y=Math.asin(Me(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,x),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(_,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(p,x),this._z=Math.atan2(d,h)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(Me(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-v,x),this._z=Math.atan2(-u,h)):(this._y=0,this._z=Math.atan2(d,c));break;case"ZYX":this._y=Math.asin(-Me(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(_,x),this._z=Math.atan2(d,c)):(this._x=0,this._z=Math.atan2(-u,h));break;case"YZX":this._z=Math.asin(Me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,h),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(p,x));break;case"XZY":this._z=Math.asin(-Me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(_,h),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-g,x),this._y=0);break;default:he("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return Yv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yv,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Zv.setFromEuler(this),this.setFromQuaternion(Zv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ia.DEFAULT_ORDER="XYZ";class Up{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let g1=0;const Kv=new J,Dr=new Zs,ba=new Ge,kc=new J,Qo=new J,v1=new J,_1=new Zs,Jv=new J(1,0,0),Qv=new J(0,1,0),jv=new J(0,0,1),$v={type:"added"},x1={type:"removed"},Ur={type:"childadded",child:null},ed={type:"childremoved",child:null};class Sn extends qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=Ys(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Sn.DEFAULT_UP.clone();const t=new J,n=new Ia,a=new Zs,o=new J(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ge},normalMatrix:{value:new ge}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=Sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Up,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Dr.setFromAxisAngle(t,n),this.quaternion.multiply(Dr),this}rotateOnWorldAxis(t,n){return Dr.setFromAxisAngle(t,n),this.quaternion.premultiply(Dr),this}rotateX(t){return this.rotateOnAxis(Jv,t)}rotateY(t){return this.rotateOnAxis(Qv,t)}rotateZ(t){return this.rotateOnAxis(jv,t)}translateOnAxis(t,n){return Kv.copy(t).applyQuaternion(this.quaternion),this.position.add(Kv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Jv,t)}translateY(t){return this.translateOnAxis(Qv,t)}translateZ(t){return this.translateOnAxis(jv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ba.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?kc.copy(t):kc.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),Qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ba.lookAt(Qo,kc,this.up):ba.lookAt(kc,Qo,this.up),this.quaternion.setFromRotationMatrix(ba),o&&(ba.extractRotation(o.matrixWorld),Dr.setFromRotationMatrix(ba),this.quaternion.premultiply(Dr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Le("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($v),Ur.child=t,this.dispatchEvent(Ur),Ur.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(x1),ed.child=t,this.dispatchEvent(ed),ed.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ba.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ba.multiply(t.parent.matrixWorld)),t.applyMatrix4(ba),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($v),Ur.child=t,this.dispatchEvent(Ur),Ur.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(t,n);if(u!==void 0)return u}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,t,v1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,_1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,o=t.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const o=this.parent;if(t===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,p=c.length;u<p;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(p=>({...p})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(p,d){return p[d.uuid]===void 0&&(p[d.uuid]=d.toJSON(t)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const d=p.shapes;if(Array.isArray(d))for(let h=0,g=d.length;h<g;h++){const v=d[h];c(t.shapes,v)}else c(t.shapes,d)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let d=0,h=this.material.length;d<h;d++)p.push(c(t.materials,this.material[d]));o.material=p}else o.material=c(t.materials,this.material);if(this.children.length>0){o.children=[];for(let p=0;p<this.children.length;p++)o.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let p=0;p<this.animations.length;p++){const d=this.animations[p];o.animations.push(c(t.animations,d))}}if(n){const p=u(t.geometries),d=u(t.materials),h=u(t.textures),g=u(t.images),v=u(t.shapes),_=u(t.skeletons),x=u(t.animations),b=u(t.nodes);p.length>0&&(a.geometries=p),d.length>0&&(a.materials=d),h.length>0&&(a.textures=h),g.length>0&&(a.images=g),v.length>0&&(a.shapes=v),_.length>0&&(a.skeletons=_),x.length>0&&(a.animations=x),b.length>0&&(a.nodes=b)}return a.object=o,a;function u(p){const d=[];for(const h in p){const g=p[h];delete g.metadata,d.push(g)}return d}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Sn.DEFAULT_UP=new J(0,1,0);Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class In extends Sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const S1={type:"move"};class nd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new In,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new In,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new In,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,c=null,u=null;const p=this._targetRay,d=this._grip,h=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(h&&t.hand){u=!0;for(const U of t.hand.values()){const M=n.getJointPose(U,a),S=this._getHandJoint(h,U);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const g=h.joints["index-finger-tip"],v=h.joints["thumb-tip"],_=g.position.distanceTo(v.position),x=.02,b=.005;h.inputState.pinching&&_>x+b?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&_<=x-b&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else d!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(d.matrix.fromArray(c.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,c.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(c.linearVelocity)):d.hasLinearVelocity=!1,c.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(c.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:t,target:this})));p!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(p.matrix.fromArray(o.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,o.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(o.linearVelocity)):p.hasLinearVelocity=!1,o.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(o.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(S1)))}return p!==null&&(p.visible=o!==null),d!==null&&(d.visible=c!==null),h!==null&&(h.visible=u!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new In;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const gx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fs={h:0,s:0,l:0},Xc={h:0,s:0,l:0};function id(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class xe{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Kn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ne.colorSpaceToWorking(this,n),this}setRGB(t,n,a,o=Ne.workingColorSpace){return this.r=t,this.g=n,this.b=a,Ne.colorSpaceToWorking(this,o),this}setHSL(t,n,a,o=Ne.workingColorSpace){if(t=Cp(t,1),n=Me(n,0,1),a=Me(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=id(u,c,t+1/3),this.g=id(u,c,t),this.b=id(u,c,t-1/3)}return Ne.colorSpaceToWorking(this,o),this}setStyle(t,n=Kn){function a(c){c!==void 0&&parseFloat(c)<1&&he("Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const u=o[1],p=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:he("Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);he("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Kn){const a=gx[t.toLowerCase()];return a!==void 0?this.setHex(a,n):he("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pa(t.r),this.g=Pa(t.g),this.b=Pa(t.b),this}copyLinearToSRGB(t){return this.r=Zr(t.r),this.g=Zr(t.g),this.b=Zr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Kn){return Ne.workingToColorSpace(Hn.copy(this),t),Math.round(Me(Hn.r*255,0,255))*65536+Math.round(Me(Hn.g*255,0,255))*256+Math.round(Me(Hn.b*255,0,255))}getHexString(t=Kn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ne.workingColorSpace){Ne.workingToColorSpace(Hn.copy(this),n);const a=Hn.r,o=Hn.g,c=Hn.b,u=Math.max(a,o,c),p=Math.min(a,o,c);let d,h;const g=(p+u)/2;if(p===u)d=0,h=0;else{const v=u-p;switch(h=g<=.5?v/(u+p):v/(2-u-p),u){case a:d=(o-c)/v+(o<c?6:0);break;case o:d=(c-a)/v+2;break;case c:d=(a-o)/v+4;break}d/=6}return t.h=d,t.s=h,t.l=g,t}getRGB(t,n=Ne.workingColorSpace){return Ne.workingToColorSpace(Hn.copy(this),n),t.r=Hn.r,t.g=Hn.g,t.b=Hn.b,t}getStyle(t=Kn){Ne.workingToColorSpace(Hn.copy(this),t);const n=Hn.r,a=Hn.g,o=Hn.b;return t!==Kn?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(fs),this.setHSL(fs.h+t,fs.s+n,fs.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(fs),t.getHSL(Xc);const a=hl(fs.h,Xc.h,n),o=hl(fs.s,Xc.s,n),c=hl(fs.l,Xc.l,n);return this.setHSL(a,o,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Hn=new xe;xe.NAMES=gx;class Lp{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new xe(t),this.density=n}clone(){return new Lp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class y1 extends Sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ia,this.environmentIntensity=1,this.environmentRotation=new Ia,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Bi=new J,Ta=new J,ad=new J,Aa=new J,Lr=new J,Nr=new J,t_=new J,sd=new J,rd=new J,od=new J,ld=new en,cd=new en,ud=new en;class Gi{constructor(t=new J,n=new J,a=new J){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),Bi.subVectors(t,n),o.cross(Bi);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(t,n,a,o,c){Bi.subVectors(o,n),Ta.subVectors(a,n),ad.subVectors(t,n);const u=Bi.dot(Bi),p=Bi.dot(Ta),d=Bi.dot(ad),h=Ta.dot(Ta),g=Ta.dot(ad),v=u*h-p*p;if(v===0)return c.set(0,0,0),null;const _=1/v,x=(h*d-p*g)*_,b=(u*g-p*d)*_;return c.set(1-x-b,b,x)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,Aa)===null?!1:Aa.x>=0&&Aa.y>=0&&Aa.x+Aa.y<=1}static getInterpolation(t,n,a,o,c,u,p,d){return this.getBarycoord(t,n,a,o,Aa)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(c,Aa.x),d.addScaledVector(u,Aa.y),d.addScaledVector(p,Aa.z),d)}static getInterpolatedAttribute(t,n,a,o,c,u){return ld.setScalar(0),cd.setScalar(0),ud.setScalar(0),ld.fromBufferAttribute(t,n),cd.fromBufferAttribute(t,a),ud.fromBufferAttribute(t,o),u.setScalar(0),u.addScaledVector(ld,c.x),u.addScaledVector(cd,c.y),u.addScaledVector(ud,c.z),u}static isFrontFacing(t,n,a,o){return Bi.subVectors(a,n),Ta.subVectors(t,n),Bi.cross(Ta).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Bi.subVectors(this.c,this.b),Ta.subVectors(this.a,this.b),Bi.cross(Ta).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Gi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Gi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,c){return Gi.getInterpolation(t,this.a,this.b,this.c,n,a,o,c)}containsPoint(t){return Gi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Gi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,c=this.c;let u,p;Lr.subVectors(o,a),Nr.subVectors(c,a),sd.subVectors(t,a);const d=Lr.dot(sd),h=Nr.dot(sd);if(d<=0&&h<=0)return n.copy(a);rd.subVectors(t,o);const g=Lr.dot(rd),v=Nr.dot(rd);if(g>=0&&v<=g)return n.copy(o);const _=d*v-g*h;if(_<=0&&d>=0&&g<=0)return u=d/(d-g),n.copy(a).addScaledVector(Lr,u);od.subVectors(t,c);const x=Lr.dot(od),b=Nr.dot(od);if(b>=0&&x<=b)return n.copy(c);const U=x*h-d*b;if(U<=0&&h>=0&&b<=0)return p=h/(h-b),n.copy(a).addScaledVector(Nr,p);const M=g*b-x*v;if(M<=0&&v-g>=0&&x-b>=0)return t_.subVectors(c,o),p=(v-g)/(v-g+(x-b)),n.copy(o).addScaledVector(t_,p);const S=1/(M+U+_);return u=U*S,p=_*S,n.copy(a).addScaledVector(Lr,u).addScaledVector(Nr,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ks{constructor(t=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Hi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Hi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Hi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let u=0,p=c.count;u<p;u++)t.isMesh===!0?t.getVertexPosition(u,Hi):Hi.fromBufferAttribute(c,u),Hi.applyMatrix4(t.matrixWorld),this.expandByPoint(Hi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Wc.copy(a.boundingBox)),Wc.applyMatrix4(t.matrixWorld),this.union(Wc)}const o=t.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Hi),Hi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(jo),qc.subVectors(this.max,jo),Or.subVectors(t.a,jo),Pr.subVectors(t.b,jo),Ir.subVectors(t.c,jo),hs.subVectors(Pr,Or),ds.subVectors(Ir,Pr),Ps.subVectors(Or,Ir);let n=[0,-hs.z,hs.y,0,-ds.z,ds.y,0,-Ps.z,Ps.y,hs.z,0,-hs.x,ds.z,0,-ds.x,Ps.z,0,-Ps.x,-hs.y,hs.x,0,-ds.y,ds.x,0,-Ps.y,Ps.x,0];return!fd(n,Or,Pr,Ir,qc)||(n=[1,0,0,0,1,0,0,0,1],!fd(n,Or,Pr,Ir,qc))?!1:(Yc.crossVectors(hs,ds),n=[Yc.x,Yc.y,Yc.z],fd(n,Or,Pr,Ir,qc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Hi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Hi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const wa=[new J,new J,new J,new J,new J,new J,new J,new J],Hi=new J,Wc=new Ks,Or=new J,Pr=new J,Ir=new J,hs=new J,ds=new J,Ps=new J,jo=new J,qc=new J,Yc=new J,Is=new J;function fd(r,t,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){Is.fromArray(r,c);const p=o.x*Math.abs(Is.x)+o.y*Math.abs(Is.y)+o.z*Math.abs(Is.z),d=t.dot(Is),h=n.dot(Is),g=a.dot(Is);if(Math.max(-Math.max(d,h,g),Math.min(d,h,g))>p)return!1}return!0}const La=M1();function M1(){const r=new ArrayBuffer(4),t=new Float32Array(r),n=new Uint32Array(r),a=new Uint32Array(512),o=new Uint32Array(512);for(let d=0;d<256;++d){const h=d-127;h<-27?(a[d]=0,a[d|256]=32768,o[d]=24,o[d|256]=24):h<-14?(a[d]=1024>>-h-14,a[d|256]=1024>>-h-14|32768,o[d]=-h-1,o[d|256]=-h-1):h<=15?(a[d]=h+15<<10,a[d|256]=h+15<<10|32768,o[d]=13,o[d|256]=13):h<128?(a[d]=31744,a[d|256]=64512,o[d]=24,o[d|256]=24):(a[d]=31744,a[d|256]=64512,o[d]=13,o[d|256]=13)}const c=new Uint32Array(2048),u=new Uint32Array(64),p=new Uint32Array(64);for(let d=1;d<1024;++d){let h=d<<13,g=0;for(;(h&8388608)===0;)h<<=1,g-=8388608;h&=-8388609,g+=947912704,c[d]=h|g}for(let d=1024;d<2048;++d)c[d]=939524096+(d-1024<<13);for(let d=1;d<31;++d)u[d]=d<<23;u[31]=1199570944,u[32]=2147483648;for(let d=33;d<63;++d)u[d]=2147483648+(d-32<<23);u[63]=3347054592;for(let d=1;d<64;++d)d!==32&&(p[d]=1024);return{floatView:t,uint32View:n,baseTable:a,shiftTable:o,mantissaTable:c,exponentTable:u,offsetTable:p}}function E1(r){Math.abs(r)>65504&&he("DataUtils.toHalfFloat(): Value out of range."),r=Me(r,-65504,65504),La.floatView[0]=r;const t=La.uint32View[0],n=t>>23&511;return La.baseTable[n]+((t&8388607)>>La.shiftTable[n])}function b1(r){const t=r>>10;return La.uint32View[0]=La.mantissaTable[La.offsetTable[t]+(r&1023)]+La.exponentTable[t],La.floatView[0]}class Zc{static toHalfFloat(t){return E1(t)}static fromHalfFloat(t){return b1(t)}}const xn=new J,Kc=new Ft;let T1=0;class ki extends qs{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:T1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=GM,this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Kc.fromBufferAttribute(this,n),Kc.applyMatrix3(t),this.setXY(n,Kc.x,Kc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)xn.fromBufferAttribute(this,n),xn.applyMatrix3(t),this.setXYZ(n,xn.x,xn.y,xn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)xn.fromBufferAttribute(this,n),xn.applyMatrix4(t),this.setXYZ(n,xn.x,xn.y,xn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)xn.fromBufferAttribute(this,n),xn.applyNormalMatrix(t),this.setXYZ(n,xn.x,xn.y,xn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)xn.fromBufferAttribute(this,n),xn.transformDirection(t),this.setXYZ(n,xn.x,xn.y,xn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=kr(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=qn(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=kr(n,this.array)),n}setX(t,n){return this.normalized&&(n=qn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=kr(n,this.array)),n}setY(t,n){return this.normalized&&(n=qn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=kr(n,this.array)),n}setZ(t,n){return this.normalized&&(n=qn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=kr(n,this.array)),n}setW(t,n){return this.normalized&&(n=qn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=qn(n,this.array),a=qn(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=qn(n,this.array),a=qn(a,this.array),o=qn(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t*=this.itemSize,this.normalized&&(n=qn(n,this.array),a=qn(a,this.array),o=qn(o,this.array),c=qn(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class vx extends ki{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class _x extends ki{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class Oe extends ki{constructor(t,n,a){super(new Float32Array(t),n,a)}}const A1=new Ks,$o=new J,hd=new J;class Al{constructor(t=new J,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):A1.setFromPoints(t).getCenter(a);let o=0;for(let c=0,u=t.length;c<u;c++)o=Math.max(o,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$o.subVectors(t,this.center);const n=$o.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector($o,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($o.copy(t.center).add(hd)),this.expandByPoint($o.copy(t.center).sub(hd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let w1=0;const Ui=new Ge,dd=new Sn,Fr=new J,vi=new Ks,tl=new Ks,Cn=new J;class wn extends qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:w1++}),this.uuid=Ys(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(VM(t)?_x:vx)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new ge().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ui.makeRotationFromQuaternion(t),this.applyMatrix4(Ui),this}rotateX(t){return Ui.makeRotationX(t),this.applyMatrix4(Ui),this}rotateY(t){return Ui.makeRotationY(t),this.applyMatrix4(Ui),this}rotateZ(t){return Ui.makeRotationZ(t),this.applyMatrix4(Ui),this}translate(t,n,a){return Ui.makeTranslation(t,n,a),this.applyMatrix4(Ui),this}scale(t,n,a){return Ui.makeScale(t,n,a),this.applyMatrix4(Ui),this}lookAt(t){return dd.lookAt(t),dd.updateMatrix(),this.applyMatrix4(dd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fr).negate(),this.translate(Fr.x,Fr.y,Fr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=t.length;o<c;o++){const u=t[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Oe(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const c=t[o];n.setXYZ(o,c.x,c.y,c.z||0)}t.length>n.count&&he("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ks);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];vi.setFromBufferAttribute(c),this.morphTargetsRelative?(Cn.addVectors(this.boundingBox.min,vi.min),this.boundingBox.expandByPoint(Cn),Cn.addVectors(this.boundingBox.max,vi.max),this.boundingBox.expandByPoint(Cn)):(this.boundingBox.expandByPoint(vi.min),this.boundingBox.expandByPoint(vi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Al);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const a=this.boundingSphere.center;if(vi.setFromBufferAttribute(t),n)for(let c=0,u=n.length;c<u;c++){const p=n[c];tl.setFromBufferAttribute(p),this.morphTargetsRelative?(Cn.addVectors(vi.min,tl.min),vi.expandByPoint(Cn),Cn.addVectors(vi.max,tl.max),vi.expandByPoint(Cn)):(vi.expandByPoint(tl.min),vi.expandByPoint(tl.max))}vi.getCenter(a);let o=0;for(let c=0,u=t.count;c<u;c++)Cn.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(Cn));if(n)for(let c=0,u=n.length;c<u;c++){const p=n[c],d=this.morphTargetsRelative;for(let h=0,g=p.count;h<g;h++)Cn.fromBufferAttribute(p,h),d&&(Fr.fromBufferAttribute(t,h),Cn.add(Fr)),o=Math.max(o,a.distanceToSquared(Cn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new ki(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const p=[],d=[];for(let y=0;y<a.count;y++)p[y]=new J,d[y]=new J;const h=new J,g=new J,v=new J,_=new Ft,x=new Ft,b=new Ft,U=new J,M=new J;function S(y,D,B){h.fromBufferAttribute(a,y),g.fromBufferAttribute(a,D),v.fromBufferAttribute(a,B),_.fromBufferAttribute(c,y),x.fromBufferAttribute(c,D),b.fromBufferAttribute(c,B),g.sub(h),v.sub(h),x.sub(_),b.sub(_);const V=1/(x.x*b.y-b.x*x.y);isFinite(V)&&(U.copy(g).multiplyScalar(b.y).addScaledVector(v,-x.y).multiplyScalar(V),M.copy(v).multiplyScalar(x.x).addScaledVector(g,-b.x).multiplyScalar(V),p[y].add(U),p[D].add(U),p[B].add(U),d[y].add(M),d[D].add(M),d[B].add(M))}let z=this.groups;z.length===0&&(z=[{start:0,count:t.count}]);for(let y=0,D=z.length;y<D;++y){const B=z[y],V=B.start,q=B.count;for(let Z=V,I=V+q;Z<I;Z+=3)S(t.getX(Z+0),t.getX(Z+1),t.getX(Z+2))}const H=new J,A=new J,O=new J,w=new J;function L(y){O.fromBufferAttribute(o,y),w.copy(O);const D=p[y];H.copy(D),H.sub(O.multiplyScalar(O.dot(D))).normalize(),A.crossVectors(w,D);const V=A.dot(d[y])<0?-1:1;u.setXYZW(y,H.x,H.y,H.z,V)}for(let y=0,D=z.length;y<D;++y){const B=z[y],V=B.start,q=B.count;for(let Z=V,I=V+q;Z<I;Z+=3)L(t.getX(Z+0)),L(t.getX(Z+1)),L(t.getX(Z+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new ki(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let _=0,x=a.count;_<x;_++)a.setXYZ(_,0,0,0);const o=new J,c=new J,u=new J,p=new J,d=new J,h=new J,g=new J,v=new J;if(t)for(let _=0,x=t.count;_<x;_+=3){const b=t.getX(_+0),U=t.getX(_+1),M=t.getX(_+2);o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,U),u.fromBufferAttribute(n,M),g.subVectors(u,c),v.subVectors(o,c),g.cross(v),p.fromBufferAttribute(a,b),d.fromBufferAttribute(a,U),h.fromBufferAttribute(a,M),p.add(g),d.add(g),h.add(g),a.setXYZ(b,p.x,p.y,p.z),a.setXYZ(U,d.x,d.y,d.z),a.setXYZ(M,h.x,h.y,h.z)}else for(let _=0,x=n.count;_<x;_+=3)o.fromBufferAttribute(n,_+0),c.fromBufferAttribute(n,_+1),u.fromBufferAttribute(n,_+2),g.subVectors(u,c),v.subVectors(o,c),g.cross(v),a.setXYZ(_+0,g.x,g.y,g.z),a.setXYZ(_+1,g.x,g.y,g.z),a.setXYZ(_+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)Cn.fromBufferAttribute(t,n),Cn.normalize(),t.setXYZ(n,Cn.x,Cn.y,Cn.z)}toNonIndexed(){function t(p,d){const h=p.array,g=p.itemSize,v=p.normalized,_=new h.constructor(d.length*g);let x=0,b=0;for(let U=0,M=d.length;U<M;U++){p.isInterleavedBufferAttribute?x=d[U]*p.data.stride+p.offset:x=d[U]*g;for(let S=0;S<g;S++)_[b++]=h[x++]}return new ki(_,g,v)}if(this.index===null)return he("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new wn,a=this.index.array,o=this.attributes;for(const p in o){const d=o[p],h=t(d,a);n.setAttribute(p,h)}const c=this.morphAttributes;for(const p in c){const d=[],h=c[p];for(let g=0,v=h.length;g<v;g++){const _=h[g],x=t(_,a);d.push(x)}n.morphAttributes[p]=d}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let p=0,d=u.length;p<d;p++){const h=u[p];n.addGroup(h.start,h.count,h.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const d=this.parameters;for(const h in d)d[h]!==void 0&&(t[h]=d[h]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const d in a){const h=a[d];t.data.attributes[d]=h.toJSON(t.data)}const o={};let c=!1;for(const d in this.morphAttributes){const h=this.morphAttributes[d],g=[];for(let v=0,_=h.length;v<_;v++){const x=h[v];g.push(x.toJSON(t.data))}g.length>0&&(o[d]=g,c=!0)}c&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(t.data.groups=JSON.parse(JSON.stringify(u)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const o=t.attributes;for(const h in o){const g=o[h];this.setAttribute(h,g.clone(n))}const c=t.morphAttributes;for(const h in c){const g=[],v=c[h];for(let _=0,x=v.length;_<x;_++)g.push(v[_].clone(n));this.morphAttributes[h]=g}this.morphTargetsRelative=t.morphTargetsRelative;const u=t.groups;for(let h=0,g=u.length;h<g;h++){const v=u[h];this.addGroup(v.start,v.count,v.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const d=t.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pd=new J,R1=new J,C1=new ge;class Da{constructor(t=new J(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=pd.subVectors(a,n).cross(R1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const o=t.delta(pd),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(t.start).addScaledVector(o,u)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||C1.getNormalMatrix(t),o=this.coplanarPoint(pd).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let D1=0;class wl extends qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:D1++}),this.uuid=Ys(),this.name="",this.type="Material",this.blending=ul,this.side=Vs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=j_,this.blendDst=$_,this.blendEquation=Vr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=ml,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=OM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jh,this.stencilZFail=Jh,this.stencilZPass=Jh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){he(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){he(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const p in c){const d=c[p];delete d.metadata,u.push(d)}return u}if(n){const c=o(t.textures),u=o(t.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new xe().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new Da().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Ft().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ft().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ra=new J,md=new J,Jc=new J,Qc=new J;class xx{constructor(t=new J,n=new J(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ra)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Ra.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ra.copy(this.origin).addScaledVector(this.direction,n),Ra.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){md.copy(t).add(n).multiplyScalar(.5),Jc.copy(n).sub(t).normalize(),Qc.copy(this.origin).sub(md);const c=t.distanceTo(n)*.5,u=-this.direction.dot(Jc),p=Qc.dot(this.direction),d=-Qc.dot(Jc),h=Qc.lengthSq(),g=Math.abs(1-u*u);let v,_,x,b;if(g>0)if(v=u*d-p,_=u*p-d,b=c*g,v>=0)if(_>=-b)if(_<=b){const U=1/g;v*=U,_*=U,x=v*(v+u*_+2*p)+_*(u*v+_+2*d)+h}else _=c,v=Math.max(0,-(u*_+p)),x=-v*v+_*(_+2*d)+h;else _=-c,v=Math.max(0,-(u*_+p)),x=-v*v+_*(_+2*d)+h;else _<=-b?(v=Math.max(0,-(-u*c+p)),_=v>0?-c:Math.min(Math.max(-c,-d),c),x=-v*v+_*(_+2*d)+h):_<=b?(v=0,_=Math.min(Math.max(-c,-d),c),x=_*(_+2*d)+h):(v=Math.max(0,-(u*c+p)),_=v>0?c:Math.min(Math.max(-c,-d),c),x=-v*v+_*(_+2*d)+h);else _=u>0?-c:c,v=Math.max(0,-(u*_+p)),x=-v*v+_*(_+2*d)+h;return a&&a.copy(this.origin).addScaledVector(this.direction,v),o&&o.copy(md).addScaledVector(Jc,_),x}intersectSphere(t,n){if(t.radius<0)return null;Ra.subVectors(t.center,this.origin);const a=Ra.dot(this.direction),o=Ra.dot(Ra)-a*a,c=t.radius*t.radius;if(o>c)return null;const u=Math.sqrt(c-o),p=a-u,d=a+u;return d<0?null:p<0?this.at(d,n):this.at(p,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,c,u,p,d;const h=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,_=this.origin;return h>=0?(a=(t.min.x-_.x)*h,o=(t.max.x-_.x)*h):(a=(t.max.x-_.x)*h,o=(t.min.x-_.x)*h),g>=0?(c=(t.min.y-_.y)*g,u=(t.max.y-_.y)*g):(c=(t.max.y-_.y)*g,u=(t.min.y-_.y)*g),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),v>=0?(p=(t.min.z-_.z)*v,d=(t.max.z-_.z)*v):(p=(t.max.z-_.z)*v,d=(t.min.z-_.z)*v),a>d||p>o)||((p>a||a!==a)&&(a=p),(d<o||o!==o)&&(o=d),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,Ra)!==null}intersectTriangle(t,n,a,o,c){const u=this.origin,p=this.direction,d=p.x,h=p.y,g=p.z,v=t.x-u.x,_=t.y-u.y,x=t.z-u.z,b=n.x-u.x,U=n.y-u.y,M=n.z-u.z,S=a.x-u.x,z=a.y-u.y,H=a.z-u.z,A=Math.abs(d),O=Math.abs(h),w=Math.abs(g);let L,y,D,B,V,q,Z,I,X,P,F,Y;if(A>=O&&A>=w?(D=d,q=v,X=b,Y=S,d>=0?(L=h,y=g,B=_,V=x,Z=U,I=M,P=z,F=H):(L=g,y=h,B=x,V=_,Z=M,I=U,P=H,F=z)):O>=w?(D=h,q=_,X=U,Y=z,h>=0?(L=g,y=d,B=x,V=v,Z=M,I=b,P=H,F=S):(L=d,y=g,B=v,V=x,Z=b,I=M,P=S,F=H)):(D=g,q=x,X=M,Y=H,g>=0?(L=d,y=h,B=v,V=_,Z=b,I=U,P=S,F=z):(L=h,y=d,B=_,V=v,Z=U,I=b,P=z,F=S)),D===0)return null;const k=L/D,W=y/D,R=1/D,K=B-k*q,it=V-W*q,mt=Z-k*X,Lt=I-W*X,Pt=P-k*Y,nt=F-W*Y,dt=Pt*Lt-nt*mt,wt=K*nt-it*Pt,ee=mt*it-Lt*K;if(o){if(dt<0||wt<0||ee<0)return null}else if((dt<0||wt<0||ee<0)&&(dt>0||wt>0||ee>0))return null;const zt=dt+wt+ee;if(zt===0)return null;const ie=R*(dt*q+wt*X+ee*Y);return(zt>0?ie<0:ie>0)?null:this.at(ie/zt,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Sl extends wl{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ia,this.combine=tx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const e_=new Ge,Fs=new xx,jc=new Al,n_=new J,$c=new J,tu=new J,eu=new J,gd=new J,nu=new J,i_=new J,iu=new J;class bn extends Sn{constructor(t=new wn,n=new Sl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const p=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const p=this.morphTargetInfluences;if(c&&p){nu.set(0,0,0);for(let d=0,h=c.length;d<h;d++){const g=p[d],v=c[d];g!==0&&(gd.fromBufferAttribute(v,t),u?nu.addScaledVector(gd,g):nu.addScaledVector(gd.sub(n),g))}n.add(nu)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),jc.copy(a.boundingSphere),jc.applyMatrix4(c),Fs.copy(t.ray).recast(t.near),!(jc.containsPoint(Fs.origin)===!1&&(Fs.intersectSphere(jc,n_)===null||Fs.origin.distanceToSquared(n_)>(t.far-t.near)**2))&&(e_.copy(c).invert(),Fs.copy(t.ray).applyMatrix4(e_),!(a.boundingBox!==null&&Fs.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Fs)))}_computeIntersections(t,n,a){let o;const c=this.geometry,u=this.material,p=c.index,d=c.attributes.position,h=c.attributes.uv,g=c.attributes.uv1,v=c.attributes.normal,_=c.groups,x=c.drawRange;if(p!==null)if(Array.isArray(u))for(let b=0,U=_.length;b<U;b++){const M=_[b],S=u[M.materialIndex],z=Math.max(M.start,x.start),H=Math.min(p.count,Math.min(M.start+M.count,x.start+x.count));for(let A=z,O=H;A<O;A+=3){const w=p.getX(A),L=p.getX(A+1),y=p.getX(A+2);o=au(this,S,t,a,h,g,v,w,L,y),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),U=Math.min(p.count,x.start+x.count);for(let M=b,S=U;M<S;M+=3){const z=p.getX(M),H=p.getX(M+1),A=p.getX(M+2);o=au(this,u,t,a,h,g,v,z,H,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}else if(d!==void 0)if(Array.isArray(u))for(let b=0,U=_.length;b<U;b++){const M=_[b],S=u[M.materialIndex],z=Math.max(M.start,x.start),H=Math.min(d.count,Math.min(M.start+M.count,x.start+x.count));for(let A=z,O=H;A<O;A+=3){const w=A,L=A+1,y=A+2;o=au(this,S,t,a,h,g,v,w,L,y),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),U=Math.min(d.count,x.start+x.count);for(let M=b,S=U;M<S;M+=3){const z=M,H=M+1,A=M+2;o=au(this,u,t,a,h,g,v,z,H,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}}}function U1(r,t,n,a,o,c,u,p){let d;if(t.side===ri?d=a.intersectTriangle(u,c,o,!0,p):d=a.intersectTriangle(o,c,u,t.side===Vs,p),d===null)return null;iu.copy(p),iu.applyMatrix4(r.matrixWorld);const h=n.ray.origin.distanceTo(iu);return h<n.near||h>n.far?null:{distance:h,point:iu.clone(),object:r}}function au(r,t,n,a,o,c,u,p,d,h){r.getVertexPosition(p,$c),r.getVertexPosition(d,tu),r.getVertexPosition(h,eu);const g=U1(r,t,n,a,$c,tu,eu,i_);if(g){const v=new J;Gi.getBarycoord(i_,$c,tu,eu,v),o&&(g.uv=Gi.getInterpolatedAttribute(o,p,d,h,v,new Ft)),c&&(g.uv1=Gi.getInterpolatedAttribute(c,p,d,h,v,new Ft)),u&&(g.normal=Gi.getInterpolatedAttribute(u,p,d,h,v,new J),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const _={a:p,b:d,c:h,normal:new J,materialIndex:0};Gi.getNormal($c,tu,eu,_.normal),g.face=_,g.barycoord=v}return g}class Au extends Vn{constructor(t=null,n=1,a=1,o,c,u,p,d,h=Fn,g=Fn,v,_){super(null,u,p,d,h,g,o,c,v,_),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class a_ extends ki{constructor(t,n,a,o=1){super(t,n,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const zr=new Ge,s_=new Ge,su=[],r_=new Ks,L1=new Ge,el=new bn,nl=new Al;class Sx extends bn{constructor(t,n,a){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new a_(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<a;o++)this.setMatrixAt(o,L1)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Ks),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,zr),r_.copy(t.boundingBox).applyMatrix4(zr),this.boundingBox.union(r_)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Al),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,zr),nl.copy(t.boundingSphere).applyMatrix4(zr),this.boundingSphere.union(nl)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){return n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const a=n.morphTargetInfluences,o=this.morphTexture.source.data.data,c=a.length+1,u=t*c+1;for(let p=0;p<a.length;p++)a[p]=o[u+p]}raycast(t,n){const a=this.matrixWorld,o=this.count;if(el.geometry=this.geometry,el.material=this.material,el.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nl.copy(this.boundingSphere),nl.applyMatrix4(a),t.ray.intersectsSphere(nl)!==!1))for(let c=0;c<o;c++){this.getMatrixAt(c,zr),s_.multiplyMatrices(a,zr),el.matrixWorld=s_,el.raycast(t,su);for(let u=0,p=su.length;u<p;u++){const d=su[u];d.instanceId=c,d.object=this,n.push(d)}su.length=0}}setColorAt(t,n){return this.instanceColor===null&&(this.instanceColor=new a_(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,n){return n.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,n){const a=n.morphTargetInfluences,o=a.length+1;this.morphTexture===null&&(this.morphTexture=new Au(new Float32Array(o*this.count),o,this.count,bp,Si));const c=this.morphTexture.source.data.data;let u=0;for(let h=0;h<a.length;h++)u+=a[h];const p=this.geometry.morphTargetsRelative?1:1-u,d=o*t;return c[d]=p,c.set(a,d+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const zs=new Al,N1=new Ft(.5,.5),ru=new J;class Np{constructor(t=new Da,n=new Da,a=new Da,o=new Da,c=new Da,u=new Da){this.planes=[t,n,a,o,c,u]}set(t,n,a,o,c,u){const p=this.planes;return p[0].copy(t),p[1].copy(n),p[2].copy(a),p[3].copy(o),p[4].copy(c),p[5].copy(u),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=ta,a=!1){const o=this.planes,c=t.elements,u=c[0],p=c[1],d=c[2],h=c[3],g=c[4],v=c[5],_=c[6],x=c[7],b=c[8],U=c[9],M=c[10],S=c[11],z=c[12],H=c[13],A=c[14],O=c[15];if(o[0].setComponents(h-u,x-g,S-b,O-z).normalize(),o[1].setComponents(h+u,x+g,S+b,O+z).normalize(),o[2].setComponents(h+p,x+v,S+U,O+H).normalize(),o[3].setComponents(h-p,x-v,S-U,O-H).normalize(),a)o[4].setComponents(d,_,M,A).normalize(),o[5].setComponents(h-d,x-_,S-M,O-A).normalize();else if(o[4].setComponents(h-d,x-_,S-M,O-A).normalize(),n===ta)o[5].setComponents(h+d,x+_,S+M,O+A).normalize();else if(n===xl)o[5].setComponents(d,_,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zs)}intersectsSprite(t){zs.center.set(0,0,0);const n=N1.distanceTo(t.center);return zs.radius=.7071067811865476+n,zs.applyMatrix4(t.matrixWorld),this.intersectsSphere(zs)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(ru.x=o.normal.x>0?t.max.x:t.min.x,ru.y=o.normal.y>0?t.max.y:t.min.y,ru.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(ru)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yx extends Vn{constructor(t=[],n=ks,a,o,c,u,p,d,h,g){super(t,n,a,o,c,u,p,d,h,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Op extends Vn{constructor(t,n,a,o,c,u,p,d,h){super(t,n,a,o,c,u,p,d,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class jr extends Vn{constructor(t,n,a=Xi,o,c,u,p=Fn,d=Fn,h,g=na,v=1){if(g!==na&&g!==Hs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const _={width:t,height:n,depth:v};super(_,o,c,u,p,d,g,a,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Dp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}}class O1 extends jr{constructor(t,n=Xi,a=ks,o,c,u=Fn,p=Fn,d,h=na){const g={width:t,height:t,depth:1},v=[g,g,g,g,g,g];super(t,t,n,a,o,c,u,p,d,h),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Mx extends Vn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ia extends wn{constructor(t=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const p=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const d=[],h=[],g=[],v=[];let _=0,x=0;b("z","y","x",-1,-1,a,n,t,u,c,0),b("z","y","x",1,-1,a,n,-t,u,c,1),b("x","z","y",1,1,t,a,n,o,u,2),b("x","z","y",1,-1,t,a,-n,o,u,3),b("x","y","z",1,-1,t,n,a,o,c,4),b("x","y","z",-1,-1,t,n,-a,o,c,5),this.setIndex(d),this.setAttribute("position",new Oe(h,3)),this.setAttribute("normal",new Oe(g,3)),this.setAttribute("uv",new Oe(v,2));function b(U,M,S,z,H,A,O,w,L,y,D){const B=A/L,V=O/y,q=A/2,Z=O/2,I=w/2,X=L+1,P=y+1;let F=0,Y=0;const k=new J;for(let W=0;W<P;W++){const R=W*V-Z;for(let K=0;K<X;K++){const it=K*B-q;k[U]=it*z,k[M]=R*H,k[S]=I,h.push(k.x,k.y,k.z),k[U]=0,k[M]=0,k[S]=w>0?1:-1,g.push(k.x,k.y,k.z),v.push(K/L),v.push(1-W/y),F+=1}}for(let W=0;W<y;W++)for(let R=0;R<L;R++){const K=_+R+X*W,it=_+R+X*(W+1),mt=_+(R+1)+X*(W+1),Lt=_+(R+1)+X*W;d.push(K,it,Lt),d.push(it,mt,Lt),Y+=6}p.addGroup(x,Y,D),x+=Y,_+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ia(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class wu extends wn{constructor(t=1,n=1,a=4,o=8,c=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:n,capSegments:a,radialSegments:o,heightSegments:c},n=Math.max(0,n),a=Math.max(1,Math.floor(a)),o=Math.max(3,Math.floor(o)),c=Math.max(1,Math.floor(c));const u=[],p=[],d=[],h=[],g=n/2,v=Math.PI/2*t,_=n,x=2*v+_,b=a*2+c,U=o+1,M=new J,S=new J;for(let z=0;z<=b;z++){let H=0,A=0,O=0,w=0;if(z<=a){const D=z/a,B=D*Math.PI/2;A=-g-t*Math.cos(B),O=t*Math.sin(B),w=-t*Math.cos(B),H=D*v}else if(z<=a+c){const D=(z-a)/c;A=-g+D*n,O=t,w=0,H=v+D*_}else{const D=(z-a-c)/a,B=D*Math.PI/2;A=g+t*Math.sin(B),O=t*Math.cos(B),w=t*Math.sin(B),H=v+_+D*v}const L=Math.max(0,Math.min(1,H/x));let y=0;z===0?y=.5/o:z===b&&(y=-.5/o);for(let D=0;D<=o;D++){const B=D/o,V=B*Math.PI*2,q=Math.sin(V),Z=Math.cos(V);S.x=-O*Z,S.y=A,S.z=O*q,p.push(S.x,S.y,S.z),M.set(-O*Z,w,O*q),M.normalize(),d.push(M.x,M.y,M.z),h.push(B+y,L)}if(z>0){const D=(z-1)*U;for(let B=0;B<o;B++){const V=D+B,q=D+B+1,Z=z*U+B,I=z*U+B+1;u.push(V,q,Z),u.push(q,I,Z)}}}this.setIndex(u),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(d,3)),this.setAttribute("uv",new Oe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wu(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Lu extends wn{constructor(t=1,n=32,a=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:a,thetaLength:o},n=Math.max(3,n);const c=[],u=[],p=[],d=[],h=new J,g=new Ft;u.push(0,0,0),p.push(0,0,1),d.push(.5,.5);for(let v=0,_=3;v<=n;v++,_+=3){const x=a+v/n*o;h.x=t*Math.cos(x),h.y=t*Math.sin(x),u.push(h.x,h.y,h.z),p.push(0,0,1),g.x=(u[_]/t+1)/2,g.y=(u[_+1]/t+1)/2,d.push(g.x,g.y)}for(let v=1;v<=n;v++)c.push(v,v+1,0);this.setIndex(c),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(p,3)),this.setAttribute("uv",new Oe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ms extends wn{constructor(t=1,n=1,a=1,o=32,c=1,u=!1,p=0,d=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:o,heightSegments:c,openEnded:u,thetaStart:p,thetaLength:d};const h=this;o=Math.floor(o),c=Math.floor(c);const g=[],v=[],_=[],x=[];let b=0;const U=[],M=a/2;let S=0;z(),u===!1&&(t>0&&H(!0),n>0&&H(!1)),this.setIndex(g),this.setAttribute("position",new Oe(v,3)),this.setAttribute("normal",new Oe(_,3)),this.setAttribute("uv",new Oe(x,2));function z(){const A=new J,O=new J;let w=0;const L=(n-t)/a;for(let y=0;y<=c;y++){const D=[],B=y/c,V=B*(n-t)+t;for(let q=0;q<=o;q++){const Z=q/o,I=Z*d+p,X=Math.sin(I),P=Math.cos(I);O.x=V*X,O.y=-B*a+M,O.z=V*P,v.push(O.x,O.y,O.z),A.set(X,L,P).normalize(),_.push(A.x,A.y,A.z),x.push(Z,1-B),D.push(b++)}U.push(D)}for(let y=0;y<o;y++)for(let D=0;D<c;D++){const B=U[D][y],V=U[D+1][y],q=U[D+1][y+1],Z=U[D][y+1];(t>0||D!==0)&&(g.push(B,V,Z),w+=3),(n>0||D!==c-1)&&(g.push(V,q,Z),w+=3)}h.addGroup(S,w,0),S+=w}function H(A){const O=b,w=new Ft,L=new J;let y=0;const D=A===!0?t:n,B=A===!0?1:-1;for(let q=1;q<=o;q++)v.push(0,M*B,0),_.push(0,B,0),x.push(.5,.5),b++;const V=b;for(let q=0;q<=o;q++){const I=q/o*d+p,X=Math.cos(I),P=Math.sin(I);L.x=D*P,L.y=M*B,L.z=D*X,v.push(L.x,L.y,L.z),_.push(0,B,0),w.x=X*.5+.5,w.y=P*.5*B+.5,x.push(w.x,w.y),b++}for(let q=0;q<o;q++){const Z=O+q,I=V+q;A===!0?g.push(I,I+1,Z):g.push(I+1,I,Z),y+=3}h.addGroup(S,y,A===!0?1:2),S+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ms(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class aa{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){he("Curve: .getPoint() not implemented.")}getPointAt(t,n){const a=this.getUtoTmapping(t);return this.getPoint(a,n)}getPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return n}getSpacedPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPointAt(a/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),c=0;n.push(0);for(let u=1;u<=t;u++)a=this.getPoint(u/t),c+=a.distanceTo(o),n.push(c),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const a=this.getLengths();let o=0;const c=a.length;let u;n?u=n:u=t*a[c-1];let p=0,d=c-1,h;for(;p<=d;)if(o=Math.floor(p+(d-p)/2),h=a[o]-u,h<0)p=o+1;else if(h>0)d=o-1;else{d=o;break}if(o=d,a[o]===u)return o/(c-1);const g=a[o],_=a[o+1]-g,x=(u-g)/_;return(o+x)/(c-1)}getTangent(t,n){let o=t-1e-4,c=t+1e-4;o<0&&(o=0),c>1&&(c=1);const u=this.getPoint(o),p=this.getPoint(c),d=n||(u.isVector2?new Ft:new J);return d.copy(p).sub(u).normalize(),d}getTangentAt(t,n){const a=this.getUtoTmapping(t);return this.getTangent(a,n)}computeFrenetFrames(t,n=!1){const a=new J,o=[],c=[],u=[],p=new J,d=new Ge;for(let x=0;x<=t;x++){const b=x/t;o[x]=this.getTangentAt(b,new J)}c[0]=new J,u[0]=new J;let h=Number.MAX_VALUE;const g=Math.abs(o[0].x),v=Math.abs(o[0].y),_=Math.abs(o[0].z);g<=h&&(h=g,a.set(1,0,0)),v<=h&&(h=v,a.set(0,1,0)),_<=h&&a.set(0,0,1),p.crossVectors(o[0],a).normalize(),c[0].crossVectors(o[0],p),u[0].crossVectors(o[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),u[x]=u[x-1].clone(),p.crossVectors(o[x-1],o[x]),p.length()>Number.EPSILON){p.normalize();const b=Math.acos(Me(o[x-1].dot(o[x]),-1,1));c[x].applyMatrix4(d.makeRotationAxis(p,b))}u[x].crossVectors(o[x],c[x])}if(n===!0){let x=Math.acos(Me(c[0].dot(c[t]),-1,1));x/=t,o[0].dot(p.crossVectors(c[0],c[t]))>0&&(x=-x);for(let b=1;b<=t;b++)c[b].applyMatrix4(d.makeRotationAxis(o[b],x*b)),u[b].crossVectors(o[b],c[b])}return{tangents:o,normals:c,binormals:u}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Pp extends aa{constructor(t=0,n=0,a=1,o=1,c=0,u=Math.PI*2,p=!1,d=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=c,this.aEndAngle=u,this.aClockwise=p,this.aRotation=d}getPoint(t,n=new Ft){const a=n,o=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const u=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=o;for(;c>o;)c-=o;c<Number.EPSILON&&(u?c=0:c=o),this.aClockwise===!0&&!u&&(c===o?c=-o:c=c-o);const p=this.aStartAngle+t*c;let d=this.aX+this.xRadius*Math.cos(p),h=this.aY+this.yRadius*Math.sin(p);if(this.aRotation!==0){const g=Math.cos(this.aRotation),v=Math.sin(this.aRotation),_=d-this.aX,x=h-this.aY;d=_*g-x*v+this.aX,h=_*v+x*g+this.aY}return a.set(d,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class P1 extends Pp{constructor(t,n,a,o,c,u){super(t,n,a,a,o,c,u),this.isArcCurve=!0,this.type="ArcCurve"}}function Ip(){let r=0,t=0,n=0,a=0;function o(c,u,p,d){r=c,t=p,n=-3*c+3*u-2*p-d,a=2*c-2*u+p+d}return{initCatmullRom:function(c,u,p,d,h){o(u,p,h*(p-c),h*(d-u))},initNonuniformCatmullRom:function(c,u,p,d,h,g,v){let _=(u-c)/h-(p-c)/(h+g)+(p-u)/g,x=(p-u)/g-(d-u)/(g+v)+(d-p)/v;_*=g,x*=g,o(u,p,_,x)},calc:function(c){const u=c*c,p=u*c;return r+t*c+n*u+a*p}}}const o_=new J,l_=new J,vd=new Ip,_d=new Ip,xd=new Ip;class yl extends aa{constructor(t=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=a,this.tension=o}getPoint(t,n=new J){const a=n,o=this.points,c=o.length,u=(c-(this.closed?0:1))*t;let p=Math.floor(u),d=u-p;this.closed?p+=p>0?0:(Math.floor(Math.abs(p)/c)+1)*c:d===0&&p===c-1&&(p=c-2,d=1);let h,g;this.closed||p>0?h=o[(p-1)%c]:(l_.subVectors(o[0],o[1]).add(o[0]),h=l_);const v=o[p%c],_=o[(p+1)%c];if(this.closed||p+2<c?g=o[(p+2)%c]:(o_.subVectors(o[c-1],o[c-2]).add(o[c-1]),g=o_),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let b=Math.pow(h.distanceToSquared(v),x),U=Math.pow(v.distanceToSquared(_),x),M=Math.pow(_.distanceToSquared(g),x);U<1e-4&&(U=1),b<1e-4&&(b=U),M<1e-4&&(M=U),vd.initNonuniformCatmullRom(h.x,v.x,_.x,g.x,b,U,M),_d.initNonuniformCatmullRom(h.y,v.y,_.y,g.y,b,U,M),xd.initNonuniformCatmullRom(h.z,v.z,_.z,g.z,b,U,M)}else this.curveType==="catmullrom"&&(vd.initCatmullRom(h.x,v.x,_.x,g.x,this.tension),_d.initCatmullRom(h.y,v.y,_.y,g.y,this.tension),xd.initCatmullRom(h.z,v.z,_.z,g.z,this.tension));return a.set(vd.calc(d),_d.calc(d),xd.calc(d)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new J().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function c_(r,t,n,a,o){const c=(a-t)*.5,u=(o-n)*.5,p=r*r,d=r*p;return(2*n-2*a+c+u)*d+(-3*n+3*a-2*c-u)*p+c*r+n}function I1(r,t){const n=1-r;return n*n*t}function F1(r,t){return 2*(1-r)*r*t}function z1(r,t){return r*r*t}function dl(r,t,n,a){return I1(r,t)+F1(r,n)+z1(r,a)}function B1(r,t){const n=1-r;return n*n*n*t}function H1(r,t){const n=1-r;return 3*n*n*r*t}function G1(r,t){return 3*(1-r)*r*r*t}function V1(r,t){return r*r*r*t}function pl(r,t,n,a,o){return B1(r,t)+H1(r,n)+G1(r,a)+V1(r,o)}class Ex extends aa{constructor(t=new Ft,n=new Ft,a=new Ft,o=new Ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new Ft){const a=n,o=this.v0,c=this.v1,u=this.v2,p=this.v3;return a.set(pl(t,o.x,c.x,u.x,p.x),pl(t,o.y,c.y,u.y,p.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class k1 extends aa{constructor(t=new J,n=new J,a=new J,o=new J){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new J){const a=n,o=this.v0,c=this.v1,u=this.v2,p=this.v3;return a.set(pl(t,o.x,c.x,u.x,p.x),pl(t,o.y,c.y,u.y,p.y),pl(t,o.z,c.z,u.z,p.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class bx extends aa{constructor(t=new Ft,n=new Ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Ft){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Ft){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class X1 extends aa{constructor(t=new J,n=new J){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new J){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new J){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Tx extends aa{constructor(t=new Ft,n=new Ft,a=new Ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new Ft){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(dl(t,o.x,c.x,u.x),dl(t,o.y,c.y,u.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ax extends aa{constructor(t=new J,n=new J,a=new J){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new J){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(dl(t,o.x,c.x,u.x),dl(t,o.y,c.y,u.y),dl(t,o.z,c.z,u.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wx extends aa{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Ft){const a=n,o=this.points,c=(o.length-1)*t,u=Math.floor(c),p=c-u,d=o[u===0?u:u-1],h=o[u],g=o[u>o.length-2?o.length-1:u+1],v=o[u>o.length-3?o.length-1:u+2];return a.set(c_(p,d.x,h.x,g.x,v.x),c_(p,d.y,h.y,g.y,v.y)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new Ft().fromArray(o))}return this}}var Ru=Object.freeze({__proto__:null,ArcCurve:P1,CatmullRomCurve3:yl,CubicBezierCurve:Ex,CubicBezierCurve3:k1,EllipseCurve:Pp,LineCurve:bx,LineCurve3:X1,QuadraticBezierCurve:Tx,QuadraticBezierCurve3:Ax,SplineCurve:wx});class W1 extends aa{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const a=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ru[a](n,t))}return this}getPoint(t,n){const a=t*this.getLength(),o=this.getCurveLengths();let c=0;for(;c<o.length;){if(o[c]>=a){const u=o[c]-a,p=this.curves[c],d=p.getLength(),h=d===0?0:1-u/d;return p.getPointAt(h,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let a;for(let o=0,c=this.curves;o<c.length;o++){const u=c[o],p=u.isEllipseCurve?t*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?t*u.points.length:t,d=u.getPoints(p);for(let h=0;h<d.length;h++){const g=d[h];a&&a.equals(g)||(n.push(g),a=g)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(new Ru[o.type]().fromJSON(o))}return this}}class u_ extends W1{constructor(t){super(),this.type="Path",this.currentPoint=new Ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,a=t.length;n<a;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const a=new bx(this.currentPoint.clone(),new Ft(t,n));return this.curves.push(a),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,a,o){const c=new Tx(this.currentPoint.clone(),new Ft(t,n),new Ft(a,o));return this.curves.push(c),this.currentPoint.set(a,o),this}bezierCurveTo(t,n,a,o,c,u){const p=new Ex(this.currentPoint.clone(),new Ft(t,n),new Ft(a,o),new Ft(c,u));return this.curves.push(p),this.currentPoint.set(c,u),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),a=new wx(n);return this.curves.push(a),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,a,o,c,u){const p=this.currentPoint.x,d=this.currentPoint.y;return this.absarc(t+p,n+d,a,o,c,u),this}absarc(t,n,a,o,c,u){return this.absellipse(t,n,a,a,o,c,u),this}ellipse(t,n,a,o,c,u,p,d){const h=this.currentPoint.x,g=this.currentPoint.y;return this.absellipse(t+h,n+g,a,o,c,u,p,d),this}absellipse(t,n,a,o,c,u,p,d){const h=new Pp(t,n,a,o,c,u,p,d);if(this.curves.length>0){const v=h.getPoint(0);v.equals(this.currentPoint)||this.lineTo(v.x,v.y)}this.curves.push(h);const g=h.getPoint(1);return this.currentPoint.copy(g),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Rx extends u_{constructor(t){super(t),this.uuid=Ys(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(new u_().fromJSON(o))}return this}}function q1(r,t,n=2){const a=t&&t.length,o=a?t[0]*n:r.length;let c=Cx(r,0,o,n,!0);const u=[];if(!c||c.next===c.prev)return u;let p,d,h;if(a&&(c=Q1(r,t,c,n)),r.length>80*n){p=r[0],d=r[1];let g=p,v=d;for(let _=n;_<o;_+=n){const x=r[_],b=r[_+1];x<p&&(p=x),b<d&&(d=b),x>g&&(g=x),b>v&&(v=b)}h=Math.max(g-p,v-d),h=h!==0?32767/h:0}return Ml(c,u,n,p,d,h,0),u}function Cx(r,t,n,a,o){let c;if(o===lE(r,t,n,a)>0)for(let u=t;u<n;u+=a)c=f_(u/a|0,r[u],r[u+1],c);else for(let u=n-a;u>=t;u-=a)c=f_(u/a|0,r[u],r[u+1],c);return c&&$r(c,c.next)&&(bl(c),c=c.next),c}function Ws(r,t){if(!r)return r;t||(t=r);let n=r,a;do if(a=!1,!n.steiner&&($r(n,n.next)||sn(n.prev,n,n.next)===0)){if(bl(n),n=t=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==t);return t}function Ml(r,t,n,a,o,c,u){if(!r)return;!u&&c&&nE(r,a,o,c);let p=r;for(;r.prev!==r.next;){const d=r.prev,h=r.next;if(c?Z1(r,a,o,c):Y1(r)){t.push(d.i,r.i,h.i),bl(r),r=h.next,p=h.next;continue}if(r=h,r===p){u?u===1?(r=K1(Ws(r),t),Ml(r,t,n,a,o,c,2)):u===2&&J1(r,t,n,a,o,c):Ml(Ws(r),t,n,a,o,c,1);break}}}function Y1(r){const t=r.prev,n=r,a=r.next;if(sn(t,n,a)>=0)return!1;const o=t.x,c=n.x,u=a.x,p=t.y,d=n.y,h=a.y,g=Math.min(o,c,u),v=Math.min(p,d,h),_=Math.max(o,c,u),x=Math.max(p,d,h);let b=a.next;for(;b!==t;){if(b.x>=g&&b.x<=_&&b.y>=v&&b.y<=x&&rl(o,p,c,d,u,h,b.x,b.y)&&sn(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function Z1(r,t,n,a){const o=r.prev,c=r,u=r.next;if(sn(o,c,u)>=0)return!1;const p=o.x,d=c.x,h=u.x,g=o.y,v=c.y,_=u.y,x=Math.min(p,d,h),b=Math.min(g,v,_),U=Math.max(p,d,h),M=Math.max(g,v,_),S=hp(x,b,t,n,a),z=hp(U,M,t,n,a);let H=r.prevZ,A=r.nextZ;for(;H&&H.z>=S&&A&&A.z<=z;){if(H.x>=x&&H.x<=U&&H.y>=b&&H.y<=M&&H!==o&&H!==u&&rl(p,g,d,v,h,_,H.x,H.y)&&sn(H.prev,H,H.next)>=0||(H=H.prevZ,A.x>=x&&A.x<=U&&A.y>=b&&A.y<=M&&A!==o&&A!==u&&rl(p,g,d,v,h,_,A.x,A.y)&&sn(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;H&&H.z>=S;){if(H.x>=x&&H.x<=U&&H.y>=b&&H.y<=M&&H!==o&&H!==u&&rl(p,g,d,v,h,_,H.x,H.y)&&sn(H.prev,H,H.next)>=0)return!1;H=H.prevZ}for(;A&&A.z<=z;){if(A.x>=x&&A.x<=U&&A.y>=b&&A.y<=M&&A!==o&&A!==u&&rl(p,g,d,v,h,_,A.x,A.y)&&sn(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function K1(r,t){let n=r;do{const a=n.prev,o=n.next.next;!$r(a,o)&&Ux(a,n,n.next,o)&&El(a,o)&&El(o,a)&&(t.push(a.i,n.i,o.i),bl(n),bl(n.next),n=r=o),n=n.next}while(n!==r);return Ws(n)}function J1(r,t,n,a,o,c){let u=r;do{let p=u.next.next;for(;p!==u.prev;){if(u.i!==p.i&&sE(u,p)){let d=Lx(u,p);u=Ws(u,u.next),d=Ws(d,d.next),Ml(u,t,n,a,o,c,0),Ml(d,t,n,a,o,c,0);return}p=p.next}u=u.next}while(u!==r)}function Q1(r,t,n,a){const o=[];for(let c=0,u=t.length;c<u;c++){const p=t[c]*a,d=c<u-1?t[c+1]*a:r.length,h=Cx(r,p,d,a,!1);h===h.next&&(h.steiner=!0),o.push(aE(h))}o.sort(j1);for(let c=0;c<o.length;c++)n=$1(o[c],n);return n}function j1(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const a=(r.next.y-r.y)/(r.next.x-r.x),o=(t.next.y-t.y)/(t.next.x-t.x);n=a-o}return n}function $1(r,t){const n=tE(r,t);if(!n)return t;const a=Lx(n,r);return Ws(a,a.next),Ws(n,n.next)}function tE(r,t){let n=t;const a=r.x,o=r.y;let c=-1/0,u;if($r(r,n))return n;do{if($r(r,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const v=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(v<=a&&v>c&&(c=v,u=n.x<n.next.x?n:n.next,v===a))return u}n=n.next}while(n!==t);if(!u)return null;const p=u,d=u.x,h=u.y;let g=1/0;n=u;do{if(a>=n.x&&n.x>=d&&a!==n.x&&Dx(o<h?a:c,o,d,h,o<h?c:a,o,n.x,n.y)){const v=Math.abs(o-n.y)/(a-n.x);El(n,r)&&(v<g||v===g&&(n.x>u.x||n.x===u.x&&eE(u,n)))&&(u=n,g=v)}n=n.next}while(n!==p);return u}function eE(r,t){return sn(r.prev,r,t.prev)<0&&sn(t.next,r,r.next)<0}function nE(r,t,n,a){let o=r;do o.z===0&&(o.z=hp(o.x,o.y,t,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==r);o.prevZ.nextZ=null,o.prevZ=null,iE(o)}function iE(r){let t,n=1;do{let a=r,o;r=null;let c=null;for(t=0;a;){t++;let u=a,p=0;for(let h=0;h<n&&(p++,u=u.nextZ,!!u);h++);let d=n;for(;p>0||d>0&&u;)p!==0&&(d===0||!u||a.z<=u.z)?(o=a,a=a.nextZ,p--):(o=u,u=u.nextZ,d--),c?c.nextZ=o:r=o,o.prevZ=c,c=o;a=u}c.nextZ=null,n*=2}while(t>1);return r}function hp(r,t,n,a,o){return r=(r-n)*o|0,t=(t-a)*o|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function aE(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function Dx(r,t,n,a,o,c,u,p){return(o-u)*(t-p)>=(r-u)*(c-p)&&(r-u)*(a-p)>=(n-u)*(t-p)&&(n-u)*(c-p)>=(o-u)*(a-p)}function rl(r,t,n,a,o,c,u,p){return!(r===u&&t===p)&&Dx(r,t,n,a,o,c,u,p)}function sE(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!rE(r,t)&&(El(r,t)&&El(t,r)&&oE(r,t)&&(sn(r.prev,r,t.prev)||sn(r,t.prev,t))||$r(r,t)&&sn(r.prev,r,r.next)>0&&sn(t.prev,t,t.next)>0)}function sn(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function $r(r,t){return r.x===t.x&&r.y===t.y}function Ux(r,t,n,a){const o=lu(sn(r,t,n)),c=lu(sn(r,t,a)),u=lu(sn(n,a,r)),p=lu(sn(n,a,t));return!!(o!==c&&u!==p||o===0&&ou(r,n,t)||c===0&&ou(r,a,t)||u===0&&ou(n,r,a)||p===0&&ou(n,t,a))}function ou(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function lu(r){return r>0?1:r<0?-1:0}function rE(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&Ux(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function El(r,t){return sn(r.prev,r,r.next)<0?sn(r,t,r.next)>=0&&sn(r,r.prev,t)>=0:sn(r,t,r.prev)<0||sn(r,r.next,t)<0}function oE(r,t){let n=r,a=!1;const o=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&o<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==r);return a}function Lx(r,t){const n=dp(r.i,r.x,r.y),a=dp(t.i,t.x,t.y),o=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=o,o.prev=n,a.next=n,n.prev=a,c.next=a,a.prev=c,a}function f_(r,t,n,a){const o=dp(r,t,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function bl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function dp(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function lE(r,t,n,a){let o=0;for(let c=t,u=n-a;c<n;c+=a)o+=(r[u]-r[c])*(r[c+1]+r[u+1]),u=c;return o}class cE{static triangulate(t,n,a=2){return q1(t,n,a)}}class Xr{static area(t){const n=t.length;let a=0;for(let o=n-1,c=0;c<n;o=c++)a+=t[o].x*t[c].y-t[c].x*t[o].y;return a*.5}static isClockWise(t){return Xr.area(t)<0}static triangulateShape(t,n){const a=[],o=[],c=[];h_(t),d_(a,t);let u=t.length;n.forEach(h_);for(let d=0;d<n.length;d++)o.push(u),u+=n[d].length,d_(a,n[d]);const p=cE.triangulate(a,o);for(let d=0;d<p.length;d+=3)c.push(p.slice(d,d+3));return c}}function h_(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function d_(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class Fp extends wn{constructor(t=new Rx([new Ft(.5,.5),new Ft(-.5,.5),new Ft(-.5,-.5),new Ft(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];const a=this,o=[],c=[];for(let p=0,d=t.length;p<d;p++){const h=t[p];u(h)}this.setAttribute("position",new Oe(o,3)),this.setAttribute("uv",new Oe(c,2)),this.computeVertexNormals();function u(p){const d=[],h=n.curveSegments!==void 0?n.curveSegments:12,g=n.steps!==void 0?n.steps:1,v=n.depth!==void 0?n.depth:1;let _=n.bevelEnabled!==void 0?n.bevelEnabled:!0,x=n.bevelThickness!==void 0?n.bevelThickness:.2,b=n.bevelSize!==void 0?n.bevelSize:x-.1,U=n.bevelOffset!==void 0?n.bevelOffset:0,M=n.bevelSegments!==void 0?n.bevelSegments:3;const S=n.extrudePath,z=n.UVGenerator!==void 0?n.UVGenerator:uE;let H,A=!1,O,w,L,y;if(S){H=S.getSpacedPoints(g),A=!0,_=!1;const gt=S.isCatmullRomCurve3?S.closed:!1;O=S.computeFrenetFrames(g,gt),w=new J,L=new J,y=new J}_||(M=0,x=0,b=0,U=0);const D=p.extractPoints(h);let B=D.shape;const V=D.holes;if(!Xr.isClockWise(B)){B=B.reverse();for(let gt=0,Ct=V.length;gt<Ct;gt++){const Nt=V[gt];Xr.isClockWise(Nt)&&(V[gt]=Nt.reverse())}}function Z(gt){const Nt=10000000000000001e-36;let Dt=gt[0];for(let It=1;It<=gt.length;It++){const ae=It%gt.length,jt=gt[ae],ce=jt.x-Dt.x,de=jt.y-Dt.y,j=ce*ce+de*de,pe=Math.max(Math.abs(jt.x),Math.abs(jt.y),Math.abs(Dt.x),Math.abs(Dt.y)),Se=Nt*pe*pe;if(j<=Se){gt.splice(ae,1),It--;continue}Dt=jt}}Z(B),V.forEach(Z);const I=V.length,X=B;for(let gt=0;gt<I;gt++){const Ct=V[gt];B=B.concat(Ct)}function P(gt,Ct,Nt){return Ct||Le("ExtrudeGeometry: vec does not exist"),gt.clone().addScaledVector(Ct,Nt)}const F=B.length;function Y(gt,Ct,Nt){let Dt,It,ae;const jt=gt.x-Ct.x,ce=gt.y-Ct.y,de=Nt.x-gt.x,j=Nt.y-gt.y,pe=jt*jt+ce*ce,Se=jt*j-ce*de;if(Math.abs(Se)>Number.EPSILON){const G=Math.sqrt(pe),T=Math.sqrt(de*de+j*j),at=Ct.x-ce/G,ct=Ct.y+jt/G,St=Nt.x-j/T,Ot=Nt.y+de/T,Bt=((St-at)*j-(Ot-ct)*de)/(jt*j-ce*de);Dt=at+jt*Bt-gt.x,It=ct+ce*Bt-gt.y;const _t=Dt*Dt+It*It;if(_t<=2)return new Ft(Dt,It);ae=Math.sqrt(_t/2)}else{let G=!1;jt>Number.EPSILON?de>Number.EPSILON&&(G=!0):jt<-Number.EPSILON?de<-Number.EPSILON&&(G=!0):Math.sign(ce)===Math.sign(j)&&(G=!0),G?(Dt=-ce,It=jt,ae=Math.sqrt(pe)):(Dt=jt,It=ce,ae=Math.sqrt(pe/2))}return new Ft(Dt/ae,It/ae)}const k=[];for(let gt=0,Ct=X.length,Nt=Ct-1,Dt=gt+1;gt<Ct;gt++,Nt++,Dt++)Nt===Ct&&(Nt=0),Dt===Ct&&(Dt=0),k[gt]=Y(X[gt],X[Nt],X[Dt]);const W=[];let R,K=k.concat();for(let gt=0,Ct=I;gt<Ct;gt++){const Nt=V[gt];R=[];for(let Dt=0,It=Nt.length,ae=It-1,jt=Dt+1;Dt<It;Dt++,ae++,jt++)ae===It&&(ae=0),jt===It&&(jt=0),R[Dt]=Y(Nt[Dt],Nt[ae],Nt[jt]);W.push(R),K=K.concat(R)}let it;if(M===0)it=Xr.triangulateShape(X,V);else{const gt=[],Ct=[];for(let Nt=0;Nt<M;Nt++){const Dt=Nt/M,It=x*Math.cos(Dt*Math.PI/2),ae=b*Math.sin(Dt*Math.PI/2)+U;for(let jt=0,ce=X.length;jt<ce;jt++){const de=P(X[jt],k[jt],ae);wt(de.x,de.y,-It),Dt===0&&gt.push(de)}for(let jt=0,ce=I;jt<ce;jt++){const de=V[jt];R=W[jt];const j=[];for(let pe=0,Se=de.length;pe<Se;pe++){const G=P(de[pe],R[pe],ae);wt(G.x,G.y,-It),Dt===0&&j.push(G)}Dt===0&&Ct.push(j)}}it=Xr.triangulateShape(gt,Ct)}const mt=it.length,Lt=b+U;for(let gt=0;gt<F;gt++){const Ct=_?P(B[gt],K[gt],Lt):B[gt];A?(L.copy(O.normals[0]).multiplyScalar(Ct.x),w.copy(O.binormals[0]).multiplyScalar(Ct.y),y.copy(H[0]).add(L).add(w),wt(y.x,y.y,y.z)):wt(Ct.x,Ct.y,0)}for(let gt=1;gt<=g;gt++)for(let Ct=0;Ct<F;Ct++){const Nt=_?P(B[Ct],K[Ct],Lt):B[Ct];A?(L.copy(O.normals[gt]).multiplyScalar(Nt.x),w.copy(O.binormals[gt]).multiplyScalar(Nt.y),y.copy(H[gt]).add(L).add(w),wt(y.x,y.y,y.z)):wt(Nt.x,Nt.y,v/g*gt)}for(let gt=M-1;gt>=0;gt--){const Ct=gt/M,Nt=x*Math.cos(Ct*Math.PI/2),Dt=b*Math.sin(Ct*Math.PI/2)+U;for(let It=0,ae=X.length;It<ae;It++){const jt=P(X[It],k[It],Dt);wt(jt.x,jt.y,v+Nt)}for(let It=0,ae=V.length;It<ae;It++){const jt=V[It];R=W[It];for(let ce=0,de=jt.length;ce<de;ce++){const j=P(jt[ce],R[ce],Dt);A?wt(j.x,j.y+H[g-1].y,H[g-1].x+Nt):wt(j.x,j.y,v+Nt)}}}Pt(),nt();function Pt(){const gt=o.length/3;if(_){let Ct=0,Nt=F*Ct;for(let Dt=0;Dt<mt;Dt++){const It=it[Dt];ee(It[2]+Nt,It[1]+Nt,It[0]+Nt)}Ct=g+M*2,Nt=F*Ct;for(let Dt=0;Dt<mt;Dt++){const It=it[Dt];ee(It[0]+Nt,It[1]+Nt,It[2]+Nt)}}else{for(let Ct=0;Ct<mt;Ct++){const Nt=it[Ct];ee(Nt[2],Nt[1],Nt[0])}for(let Ct=0;Ct<mt;Ct++){const Nt=it[Ct];ee(Nt[0]+F*g,Nt[1]+F*g,Nt[2]+F*g)}}a.addGroup(gt,o.length/3-gt,0)}function nt(){const gt=o.length/3;let Ct=0;dt(X,Ct),Ct+=X.length;for(let Nt=0,Dt=V.length;Nt<Dt;Nt++){const It=V[Nt];dt(It,Ct),Ct+=It.length}a.addGroup(gt,o.length/3-gt,1)}function dt(gt,Ct){let Nt=gt.length;for(;--Nt>=0;){const Dt=Nt;let It=Nt-1;It<0&&(It=gt.length-1);for(let ae=0,jt=g+M*2;ae<jt;ae++){const ce=F*ae,de=F*(ae+1),j=Ct+Dt+ce,pe=Ct+It+ce,Se=Ct+It+de,G=Ct+Dt+de;zt(j,pe,Se,G)}}}function wt(gt,Ct,Nt){d.push(gt),d.push(Ct),d.push(Nt)}function ee(gt,Ct,Nt){ie(gt),ie(Ct),ie(Nt);const Dt=o.length/3,It=z.generateTopUV(a,o,Dt-3,Dt-2,Dt-1);ue(It[0]),ue(It[1]),ue(It[2])}function zt(gt,Ct,Nt,Dt){ie(gt),ie(Ct),ie(Dt),ie(Ct),ie(Nt),ie(Dt);const It=o.length/3,ae=z.generateSideWallUV(a,o,It-6,It-3,It-2,It-1);ue(ae[0]),ue(ae[1]),ue(ae[3]),ue(ae[1]),ue(ae[2]),ue(ae[3])}function ie(gt){o.push(d[gt*3+0]),o.push(d[gt*3+1]),o.push(d[gt*3+2])}function ue(gt){c.push(gt.x),c.push(gt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes,a=this.parameters.options;return fE(n,a,t)}static fromJSON(t,n){const a=[];for(let c=0,u=t.shapes.length;c<u;c++){const p=n[t.shapes[c]];a.push(p)}const o=t.options.extrudePath;return o!==void 0&&(t.options.extrudePath=new Ru[o.type]().fromJSON(o)),new Fp(a,t.options)}}const uE={generateTopUV:function(r,t,n,a,o){const c=t[n*3],u=t[n*3+1],p=t[a*3],d=t[a*3+1],h=t[o*3],g=t[o*3+1];return[new Ft(c,u),new Ft(p,d),new Ft(h,g)]},generateSideWallUV:function(r,t,n,a,o,c){const u=t[n*3],p=t[n*3+1],d=t[n*3+2],h=t[a*3],g=t[a*3+1],v=t[a*3+2],_=t[o*3],x=t[o*3+1],b=t[o*3+2],U=t[c*3],M=t[c*3+1],S=t[c*3+2];return Math.abs(p-g)<Math.abs(u-h)?[new Ft(u,1-d),new Ft(h,1-v),new Ft(_,1-b),new Ft(U,1-S)]:[new Ft(p,1-d),new Ft(g,1-v),new Ft(x,1-b),new Ft(M,1-S)]}};function fE(r,t,n){if(n.shapes=[],Array.isArray(r))for(let a=0,o=r.length;a<o;a++){const c=r[a];n.shapes.push(c.uuid)}else n.shapes.push(r.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}class Rl extends wn{constructor(t=[new Ft(0,-.5),new Ft(.5,0),new Ft(0,.5)],n=12,a=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:n,phiStart:a,phiLength:o},n=Math.floor(n),o=Me(o,0,Math.PI*2);const c=[],u=[],p=[],d=[],h=[],g=1/n,v=new J,_=new Ft,x=new J,b=new J,U=new J;let M=0,S=0;for(let z=0;z<=t.length-1;z++)switch(z){case 0:M=t[z+1].x-t[z].x,S=t[z+1].y-t[z].y,x.x=S*1,x.y=-M,x.z=S*0,U.copy(x),x.normalize(),d.push(x.x,x.y,x.z);break;case t.length-1:d.push(U.x,U.y,U.z);break;default:M=t[z+1].x-t[z].x,S=t[z+1].y-t[z].y,x.x=S*1,x.y=-M,x.z=S*0,b.copy(x),x.x+=U.x,x.y+=U.y,x.z+=U.z,x.normalize(),d.push(x.x,x.y,x.z),U.copy(b)}for(let z=0;z<=n;z++){const H=a+z*g*o,A=Math.sin(H),O=Math.cos(H);for(let w=0;w<=t.length-1;w++){v.x=t[w].x*A,v.y=t[w].y,v.z=t[w].x*O,u.push(v.x,v.y,v.z),_.x=z/n,_.y=w/(t.length-1),p.push(_.x,_.y);const L=d[3*w+0]*A,y=d[3*w+1],D=d[3*w+0]*O;h.push(L,y,D)}}for(let z=0;z<n;z++)for(let H=0;H<t.length-1;H++){const A=H+z*t.length,O=A,w=A+t.length,L=A+t.length+1,y=A+1;c.push(O,w,y),c.push(L,y,w)}this.setIndex(c),this.setAttribute("position",new Oe(u,3)),this.setAttribute("uv",new Oe(p,2)),this.setAttribute("normal",new Oe(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rl(t.points,t.segments,t.phiStart,t.phiLength)}}class xi extends wn{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const c=t/2,u=n/2,p=Math.floor(a),d=Math.floor(o),h=p+1,g=d+1,v=t/p,_=n/d,x=[],b=[],U=[],M=[];for(let S=0;S<g;S++){const z=S*_-u;for(let H=0;H<h;H++){const A=H*v-c;b.push(A,-z,0),U.push(0,0,1),M.push(H/p),M.push(1-S/d)}}for(let S=0;S<d;S++)for(let z=0;z<p;z++){const H=z+h*S,A=z+h*(S+1),O=z+1+h*(S+1),w=z+1+h*S;x.push(H,A,w),x.push(A,O,w)}this.setIndex(x),this.setAttribute("position",new Oe(b,3)),this.setAttribute("normal",new Oe(U,3)),this.setAttribute("uv",new Oe(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Nu extends wn{constructor(t=1,n=32,a=16,o=0,c=Math.PI*2,u=0,p=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:o,phiLength:c,thetaStart:u,thetaLength:p},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const d=Math.min(u+p,Math.PI);let h=0;const g=[],v=new J,_=new J,x=[],b=[],U=[],M=[];for(let S=0;S<=a;S++){const z=[],H=S/a,A=u+H*p,O=t*Math.cos(A),w=Math.sqrt(t*t-O*O);let L=0;S===0&&u===0?L=.5/n:S===a&&d===Math.PI&&(L=-.5/n);for(let y=0;y<=n;y++){const D=y/n,B=o+D*c;v.x=-w*Math.cos(B),v.y=O,v.z=w*Math.sin(B),b.push(v.x,v.y,v.z),_.copy(v).normalize(),U.push(_.x,_.y,_.z),M.push(D+L,1-H),z.push(h++)}g.push(z)}for(let S=0;S<a;S++)for(let z=0;z<n;z++){const H=g[S][z+1],A=g[S][z],O=g[S+1][z],w=g[S+1][z+1];(S!==0||u>0)&&x.push(H,A,w),(S!==a-1||d<Math.PI)&&x.push(A,O,w)}this.setIndex(x),this.setAttribute("position",new Oe(b,3)),this.setAttribute("normal",new Oe(U,3)),this.setAttribute("uv",new Oe(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Gs extends wn{constructor(t=1,n=.4,a=12,o=48,c=Math.PI*2,u=0,p=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:a,tubularSegments:o,arc:c,thetaStart:u,thetaLength:p},a=Math.floor(a),o=Math.floor(o);const d=[],h=[],g=[],v=[],_=new J,x=new J,b=new J;for(let U=0;U<=a;U++){const M=u+U/a*p;for(let S=0;S<=o;S++){const z=S/o*c;x.x=(t+n*Math.cos(M))*Math.cos(z),x.y=(t+n*Math.cos(M))*Math.sin(z),x.z=n*Math.sin(M),h.push(x.x,x.y,x.z),_.x=t*Math.cos(z),_.y=t*Math.sin(z),b.subVectors(x,_).normalize(),g.push(b.x,b.y,b.z),v.push(S/o),v.push(U/a)}}for(let U=1;U<=a;U++)for(let M=1;M<=o;M++){const S=(o+1)*U+M-1,z=(o+1)*(U-1)+M-1,H=(o+1)*(U-1)+M,A=(o+1)*U+M;d.push(S,z,A),d.push(z,H,A)}this.setIndex(d),this.setAttribute("position",new Oe(h,3)),this.setAttribute("normal",new Oe(g,3)),this.setAttribute("uv",new Oe(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class to extends wn{constructor(t=new Ax(new J(-1,-1,0),new J(-1,1,0),new J(1,1,0)),n=64,a=1,o=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:a,radialSegments:o,closed:c};const u=t.computeFrenetFrames(n,c);this.tangents=u.tangents,this.normals=u.normals,this.binormals=u.binormals;const p=new J,d=new J,h=new Ft;let g=new J;const v=[],_=[],x=[],b=[];U(),this.setIndex(b),this.setAttribute("position",new Oe(v,3)),this.setAttribute("normal",new Oe(_,3)),this.setAttribute("uv",new Oe(x,2));function U(){for(let H=0;H<n;H++)M(H);M(c===!1?n:0),z(),S()}function M(H){g=t.getPointAt(H/n,g);const A=u.normals[H],O=u.binormals[H];for(let w=0;w<=o;w++){const L=w/o*Math.PI*2,y=Math.sin(L),D=-Math.cos(L);d.x=D*A.x+y*O.x,d.y=D*A.y+y*O.y,d.z=D*A.z+y*O.z,d.normalize(),_.push(d.x,d.y,d.z),p.x=g.x+a*d.x,p.y=g.y+a*d.y,p.z=g.z+a*d.z,v.push(p.x,p.y,p.z)}}function S(){for(let H=1;H<=n;H++)for(let A=1;A<=o;A++){const O=(o+1)*(H-1)+(A-1),w=(o+1)*H+(A-1),L=(o+1)*H+A,y=(o+1)*(H-1)+A;b.push(O,w,y),b.push(w,L,y)}}function z(){for(let H=0;H<=n;H++)for(let A=0;A<=o;A++)h.x=H/n,h.y=A/o,x.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new to(new Ru[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function eo(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const o=r[n][a];if(p_(o))o.isRenderTargetTexture?(he("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone();else if(Array.isArray(o))if(p_(o[0])){const c=[];for(let u=0,p=o.length;u<p;u++)c[u]=o[u].clone();t[n][a]=c}else t[n][a]=o.slice();else t[n][a]=o}}return t}function Yn(r){const t={};for(let n=0;n<r.length;n++){const a=eo(r[n]);for(const o in a)t[o]=a[o]}return t}function p_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function hE(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function Nx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ne.workingColorSpace}const Ox={clone:eo,merge:Yn};var dE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ni extends wl{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dE,this.fragmentShader=pE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=eo(t.uniforms),this.uniformsGroups=hE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(t).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const o=t.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new xe().setHex(o.value);break;case"v2":this.uniforms[a].value=new Ft().fromArray(o.value);break;case"v3":this.uniforms[a].value=new J().fromArray(o.value);break;case"v4":this.uniforms[a].value=new en().fromArray(o.value);break;case"m3":this.uniforms[a].value=new ge().fromArray(o.value);break;case"m4":this.uniforms[a].value=new Ge().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class mE extends Ni{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gn extends wl{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fp,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ia,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class xu extends Gn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ft(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class gE extends wl{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=LM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class vE extends wl{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const m_={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(g_(r)||(this.files[r]=t))},get:function(r){if(this.enabled!==!1&&!g_(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function g_(r){try{const t=r.slice(r.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class _E{constructor(t,n,a){const o=this;let c=!1,u=0,p=0,d;const h=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=a,this._abortController=null,this.itemStart=function(g){p++,c===!1&&o.onStart!==void 0&&o.onStart(g,u,p),c=!0},this.itemEnd=function(g){u++,o.onProgress!==void 0&&o.onProgress(g,u,p),u===p&&(c=!1,o.onLoad!==void 0&&o.onLoad())},this.itemError=function(g){o.onError!==void 0&&o.onError(g)},this.resolveURL=function(g){return g=g.normalize("NFC"),d?d(g):g},this.setURLModifier=function(g){return d=g,this},this.addHandler=function(g,v){return h.push(g,v),this},this.removeHandler=function(g){const v=h.indexOf(g);return v!==-1&&h.splice(v,2),this},this.getHandler=function(g){for(let v=0,_=h.length;v<_;v+=2){const x=h[v],b=h[v+1];if(x.global&&(x.lastIndex=0),x.test(g))return b}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const xE=new _E;class zp{constructor(t){this.manager=t!==void 0?t:xE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){const a=this;return new Promise(function(o,c){a.load(t,o,n,c)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}zp.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ca={};class SE extends Error{constructor(t,n){super(t),this.response=n}}class yE extends zp{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,n,a,o){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const c=m_.get(`file:${t}`);if(c!==void 0){this.manager.itemStart(t),setTimeout(()=>{n&&n(c),this.manager.itemEnd(t)},0);return}if(Ca[t]!==void 0){Ca[t].push({onLoad:n,onProgress:a,onError:o});return}Ca[t]=[],Ca[t].push({onLoad:n,onProgress:a,onError:o});const u=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),p=this.mimeType,d=this.responseType;fetch(u).then(h=>{if(h.status===200||h.status===0){if(h.status===0&&he("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||h.body===void 0||h.body.getReader===void 0)return h;const g=Ca[t],v=h.body.getReader(),_=h.headers.get("X-File-Size")||h.headers.get("Content-Length"),x=_?parseInt(_):0,b=x!==0;let U=0;const M=new ReadableStream({start(S){z();function z(){v.read().then(({done:H,value:A})=>{if(H)S.close();else{U+=A.byteLength;const O=new ProgressEvent("progress",{lengthComputable:b,loaded:U,total:x});for(let w=0,L=g.length;w<L;w++){const y=g[w];y.onProgress&&y.onProgress(O)}S.enqueue(A),z()}},H=>{S.error(H)})}}});return new Response(M)}else throw new SE(`fetch for "${h.url}" responded with ${h.status}: ${h.statusText}`,h)}).then(h=>{switch(d){case"arraybuffer":return h.arrayBuffer();case"blob":return h.blob();case"document":return h.text().then(g=>new DOMParser().parseFromString(g,p));case"json":return h.json();default:if(p==="")return h.text();{const v=/charset="?([^;"\s]*)"?/i.exec(p),_=v&&v[1]?v[1].toLowerCase():void 0,x=new TextDecoder(_);return h.arrayBuffer().then(b=>x.decode(b))}}}).then(h=>{m_.add(`file:${t}`,h);const g=Ca[t];delete Ca[t];for(let v=0,_=g.length;v<_;v++){const x=g[v];x.onLoad&&x.onLoad(h)}}).catch(h=>{const g=Ca[t];if(g===void 0)throw this.manager.itemError(t),h;delete Ca[t];for(let v=0,_=g.length;v<_;v++){const x=g[v];x.onError&&x.onError(h)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class ME extends zp{constructor(t){super(t)}load(t,n,a,o){const c=this,u=new Au,p=new yE(this.manager);return p.setResponseType("arraybuffer"),p.setRequestHeader(this.requestHeader),p.setPath(this.path),p.setWithCredentials(c.withCredentials),p.load(t,function(d){let h;try{h=c.parse(d)}catch(g){o!==void 0?o(g):Le(g);return}c._applyTexData(u,h),n&&n(u,h)},a,o),u}createDataTexture(t){const n=new Au;return this._applyTexData(n,this.parse(t)),n}_applyTexData(t,n){n.image!==void 0?t.image=n.image:n.data!==void 0&&(t.image.width=n.width,t.image.height=n.height,t.image.data=n.data),t.wrapS=n.wrapS!==void 0?n.wrapS:Vi,t.wrapT=n.wrapT!==void 0?n.wrapT:Vi,t.magFilter=n.magFilter!==void 0?n.magFilter:rn,t.minFilter=n.minFilter!==void 0?n.minFilter:rn,t.anisotropy=n.anisotropy!==void 0?n.anisotropy:1,n.colorSpace!==void 0&&(t.colorSpace=n.colorSpace),n.flipY!==void 0&&(t.flipY=n.flipY),n.format!==void 0&&(t.format=n.format),n.type!==void 0&&(t.type=n.type),n.mipmaps!==void 0&&(t.mipmaps=n.mipmaps,t.minFilter=Na),n.mipmapCount===1&&(t.minFilter=rn),n.generateMipmaps!==void 0&&(t.generateMipmaps=n.generateMipmaps),t.needsUpdate=!0}}class Cl extends Sn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class EE extends Cl{constructor(t,n,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const Sd=new Ge,v_=new J,__=new J;class Bp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.mapType=En,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Np,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new en(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera;v_.setFromMatrixPosition(t.matrixWorld),n.position.copy(v_),__.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(__),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,a,o){Sd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix(Sd,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,u=o?o.z/c.x:1,p=o?o.w/c.y:1,d=o?o.x/c.x:0,h=o?o.y/c.y:0;t.coordinateSystem===xl||t.reversedDepth?n.set(.5*u,0,0,.5*u+d,0,.5*p,0,.5*p+h,0,0,1,0,0,0,0,1):n.set(.5*u,0,0,.5*u+d,0,.5*p,0,.5*p+h,0,0,.5,.5,0,0,0,1),n.multiply(Sd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const cu=new J,uu=new Zs,Qi=new J;class Px extends Sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=ta,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(cu,uu,Qi),Qi.x===1&&Qi.y===1&&Qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cu,uu,Qi.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(cu,uu,Qi),Qi.x===1&&Qi.y===1&&Qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cu,uu,Qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ps=new J,x_=new Ft,S_=new Ft;class si extends Px{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Qr*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(fl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qr*2*Math.atan(Math.tan(fl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){ps.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ps.x,ps.y).multiplyScalar(-t/ps.z),ps.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(ps.x,ps.y).multiplyScalar(-t/ps.z)}getViewSize(t,n){return this.getViewBounds(t,x_,S_),n.subVectors(S_,x_)}setViewOffset(t,n,a,o,c,u){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(fl*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const d=u.fullWidth,h=u.fullHeight;c+=u.offsetX*o/d,n-=u.offsetY*a/h,o*=u.width/d,a*=u.height/h}const p=this.filmOffset;p!==0&&(c+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class bE extends Bp{constructor(){super(new si(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const n=this.camera,a=Qr*2*t.angle*this.focus,o=this.mapSize.width/this.mapSize.height*this.aspect,c=t.distance||n.far;(a!==n.fov||o!==n.aspect||c!==n.far)&&(n.fov=a,n.aspect=o,n.far=c,n.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class y_ extends Cl{constructor(t,n,a=0,o=Math.PI/3,c=0,u=2){super(t,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.target=new Sn,this.distance=a,this.angle=o,this.penumbra=c,this.decay=u,this.map=null,this.shadow=new bE}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.angle=this.angle,n.object.decay=this.decay,n.object.penumbra=this.penumbra,n.object.target=this.target.uuid,this.map&&this.map.isTexture&&(n.object.map=this.map.toJSON(t).uuid),n.object.shadow=this.shadow.toJSON(),n}}class TE extends Bp{constructor(){super(new si(90,1,.5,500)),this.isPointLightShadow=!0}}class pp extends Cl{constructor(t,n,a=0,o=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=o,this.shadow=new TE}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class Hp extends Px{constructor(t=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-t,u=a+t,p=o+n,d=o-n;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=h*this.view.offsetX,u=c+h*this.view.width,p-=g*this.view.offsetY,d=p-g*this.view.height}this.projectionMatrix.makeOrthographic(c,u,p,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class AE extends Bp{constructor(){super(new Hp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wE extends Cl{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.target=new Sn,this.shadow=new AE}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const Br=-90,Hr=1;class RE extends Sn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new si(Br,Hr,t,n);o.layers=this.layers,this.add(o);const c=new si(Br,Hr,t,n);c.layers=this.layers,this.add(c);const u=new si(Br,Hr,t,n);u.layers=this.layers,this.add(u);const p=new si(Br,Hr,t,n);p.layers=this.layers,this.add(p);const d=new si(Br,Hr,t,n);d.layers=this.layers,this.add(d);const h=new si(Br,Hr,t,n);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,p,d]=n;for(const h of n)this.remove(h);if(t===ta)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(t===xl)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of n)this.add(h),h.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,u,p,d,h,g]=this.children,v=t.getRenderTarget(),_=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const U=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(a,0,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,1,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(a,2,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,p),t.setRenderTarget(a,3,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(a,4,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),a.texture.generateMipmaps=U,t.setRenderTarget(a,5,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,g),t.setRenderTarget(v,_,x),t.xr.enabled=b,a.texture.needsPMREMUpdate=!0}}class CE extends si{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const M_=new Ge;class DE{constructor(t,n,a=0,o=1/0){this.ray=new xx(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new Up,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Le("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return M_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(M_),this}intersectObject(t,n=!0,a=[]){return mp(t,this,a,n),a.sort(E_),a}intersectObjects(t,n=!0,a=[]){for(let o=0,c=t.length;o<c;o++)mp(t[o],this,a,n);return a.sort(E_),a}}function E_(r,t){return r.distance-t.distance}function mp(r,t,n,a){let o=!0;if(r.layers.test(t.layers)&&r.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,p=c.length;u<p;u++)mp(c[u],t,n,!0)}}const Zp=class Zp{constructor(t,n,a,o){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,o){const c=this.elements;return c[0]=t,c[2]=n,c[1]=a,c[3]=o,this}};Zp.prototype.isMatrix2=!0;let b_=Zp;function T_(r,t,n,a){const o=UE(a);switch(n){case hx:return r*t;case bp:return r*t/o.components*o.byteLength;case Tp:return r*t/o.components*o.byteLength;case Xs:return r*t*2/o.components*o.byteLength;case Ap:return r*t*2/o.components*o.byteLength;case dx:return r*t*3/o.components*o.byteLength;case Li:return r*t*4/o.components*o.byteLength;case wp:return r*t*4/o.components*o.byteLength;case mu:case gu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case vu:case _u:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Id:case zd:return Math.max(r,16)*Math.max(t,8)/4;case Pd:case Fd:return Math.max(r,8)*Math.max(t,8)/2;case Bd:case Hd:case Vd:case kd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Gd:case Mu:case Xd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Wd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case qd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Yd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Zd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Kd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Jd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Qd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case jd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case $d:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case tp:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case ep:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case np:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ip:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ap:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case sp:case rp:case op:return Math.ceil(r/4)*Math.ceil(t/4)*16;case lp:case cp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Eu:case up:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function UE(r){switch(r){case En:case lx:return{byteLength:1,components:1};case vl:case cx:case Dn:return{byteLength:2,components:1};case Mp:case Ep:return{byteLength:2,components:4};case Xi:case yp:case Si:return{byteLength:4,components:1};case ux:case fx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xp}}));typeof window<"u"&&(window.__THREE__?he("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ix(){let r=null,t=!1,n=null,a=null;function o(c,u){a=r.requestAnimationFrame(o),n(c,u)}return{start:function(){t!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function LE(r){const t=new WeakMap;function n(p,d){const h=p.array,g=p.usage,v=h.byteLength,_=r.createBuffer();r.bindBuffer(d,_),r.bufferData(d,h,g),p.onUploadCallback();let x;if(h instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)x=r.HALF_FLOAT;else if(h instanceof Uint16Array)p.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=r.SHORT;else if(h instanceof Uint32Array)x=r.UNSIGNED_INT;else if(h instanceof Int32Array)x=r.INT;else if(h instanceof Int8Array)x=r.BYTE;else if(h instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:p.version,size:v}}function a(p,d,h){const g=d.array,v=d.updateRanges;if(r.bindBuffer(h,p),v.length===0)r.bufferSubData(h,0,g);else{v.sort((x,b)=>x.start-b.start);let _=0;for(let x=1;x<v.length;x++){const b=v[_],U=v[x];U.start<=b.start+b.count+1?b.count=Math.max(b.count,U.start+U.count-b.start):(++_,v[_]=U)}v.length=_+1;for(let x=0,b=v.length;x<b;x++){const U=v[x];r.bufferSubData(h,U.start*g.BYTES_PER_ELEMENT,g,U.start,U.count)}d.clearUpdateRanges()}d.onUploadCallback()}function o(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const d=t.get(p);d&&(r.deleteBuffer(d.buffer),t.delete(p))}function u(p,d){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const g=t.get(p);(!g||g.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const h=t.get(p);if(h===void 0)t.set(p,n(p,d));else if(h.version<p.version){if(h.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(h.buffer,p,d),h.version=p.version}}return{get:o,remove:c,update:u}}var NE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,OE=`#ifdef USE_ALPHAHASH
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
#endif`,PE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,IE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,BE=`#ifdef USE_AOMAP
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
#endif`,HE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,GE=`#ifdef USE_BATCHING
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
#endif`,VE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,XE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,WE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qE=`#ifdef USE_IRIDESCENCE
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
#endif`,YE=`#ifdef USE_BUMPMAP
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
#endif`,ZE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,KE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,JE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,QE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$E=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,eb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,nb=`#define PI 3.141592653589793
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
} // validated`,ib=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ab=`vec3 transformedNormal = objectNormal;
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
#endif`,sb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ob=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cb="gl_FragColor = linearToOutputTexel( gl_FragColor );",ub=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fb=`#ifdef USE_ENVMAP
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
#endif`,hb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,db=`#ifdef USE_ENVMAP
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
#endif`,pb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mb=`#ifdef USE_ENVMAP
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
#endif`,gb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_b=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sb=`#ifdef USE_GRADIENTMAP
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
}`,yb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Eb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Tb=`#ifdef USE_ENVMAP
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
#endif`,Ab=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Db=`PhysicalMaterial material;
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
#endif`,Ub=`uniform sampler2D dfgLUT;
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
}`,Lb=`
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
#endif`,Nb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ob=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ib=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kb=`#if defined( USE_POINTS_UV )
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
#endif`,Xb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kb=`#ifdef USE_MORPHTARGETS
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
#endif`,Jb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$b=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,nT=`#ifdef USE_NORMALMAP
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
#endif`,iT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,aT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,oT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_T=`float getShadowMask() {
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
}`,xT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ST=`#ifdef USE_SKINNING
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
#endif`,yT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,MT=`#ifdef USE_SKINNING
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
#endif`,ET=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,TT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wT=`#ifdef USE_TRANSMISSION
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
#endif`,RT=`#ifdef USE_TRANSMISSION
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
#endif`,CT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,DT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,UT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,LT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const NT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,OT=`uniform sampler2D t2D;
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
}`,PT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,IT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,FT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BT=`#include <common>
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
}`,HT=`#if DEPTH_PACKING == 3200
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
}`,GT=`#define DISTANCE
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
}`,VT=`#define DISTANCE
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
}`,kT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,XT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WT=`uniform float scale;
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
}`,qT=`uniform vec3 diffuse;
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
}`,YT=`#include <common>
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
}`,ZT=`uniform vec3 diffuse;
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
}`,KT=`#define LAMBERT
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
}`,JT=`#define LAMBERT
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
}`,QT=`#define MATCAP
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
}`,jT=`#define MATCAP
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
}`,$T=`#define NORMAL
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
}`,tA=`#define NORMAL
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
}`,eA=`#define PHONG
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
}`,nA=`#define PHONG
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
}`,iA=`#define STANDARD
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
}`,aA=`#define STANDARD
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
}`,sA=`#define TOON
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
}`,rA=`#define TOON
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
}`,oA=`uniform float size;
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
}`,lA=`uniform vec3 diffuse;
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
}`,cA=`#include <common>
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
}`,uA=`uniform vec3 color;
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
}`,fA=`uniform float rotation;
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
}`,hA=`uniform vec3 diffuse;
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
}`,Te={alphahash_fragment:NE,alphahash_pars_fragment:OE,alphamap_fragment:PE,alphamap_pars_fragment:IE,alphatest_fragment:FE,alphatest_pars_fragment:zE,aomap_fragment:BE,aomap_pars_fragment:HE,batching_pars_vertex:GE,batching_vertex:VE,begin_vertex:kE,beginnormal_vertex:XE,bsdfs:WE,iridescence_fragment:qE,bumpmap_pars_fragment:YE,clipping_planes_fragment:ZE,clipping_planes_pars_fragment:KE,clipping_planes_pars_vertex:JE,clipping_planes_vertex:QE,color_fragment:jE,color_pars_fragment:$E,color_pars_vertex:tb,color_vertex:eb,common:nb,cube_uv_reflection_fragment:ib,defaultnormal_vertex:ab,displacementmap_pars_vertex:sb,displacementmap_vertex:rb,emissivemap_fragment:ob,emissivemap_pars_fragment:lb,colorspace_fragment:cb,colorspace_pars_fragment:ub,envmap_fragment:fb,envmap_common_pars_fragment:hb,envmap_pars_fragment:db,envmap_pars_vertex:pb,envmap_physical_pars_fragment:Tb,envmap_vertex:mb,fog_vertex:gb,fog_pars_vertex:vb,fog_fragment:_b,fog_pars_fragment:xb,gradientmap_pars_fragment:Sb,lightmap_pars_fragment:yb,lights_lambert_fragment:Mb,lights_lambert_pars_fragment:Eb,lights_pars_begin:bb,lights_toon_fragment:Ab,lights_toon_pars_fragment:wb,lights_phong_fragment:Rb,lights_phong_pars_fragment:Cb,lights_physical_fragment:Db,lights_physical_pars_fragment:Ub,lights_fragment_begin:Lb,lights_fragment_maps:Nb,lights_fragment_end:Ob,lightprobes_pars_fragment:Pb,logdepthbuf_fragment:Ib,logdepthbuf_pars_fragment:Fb,logdepthbuf_pars_vertex:zb,logdepthbuf_vertex:Bb,map_fragment:Hb,map_pars_fragment:Gb,map_particle_fragment:Vb,map_particle_pars_fragment:kb,metalnessmap_fragment:Xb,metalnessmap_pars_fragment:Wb,morphinstance_vertex:qb,morphcolor_vertex:Yb,morphnormal_vertex:Zb,morphtarget_pars_vertex:Kb,morphtarget_vertex:Jb,normal_fragment_begin:Qb,normal_fragment_maps:jb,normal_pars_fragment:$b,normal_pars_vertex:tT,normal_vertex:eT,normalmap_pars_fragment:nT,clearcoat_normal_fragment_begin:iT,clearcoat_normal_fragment_maps:aT,clearcoat_pars_fragment:sT,iridescence_pars_fragment:rT,opaque_fragment:oT,packing:lT,premultiplied_alpha_fragment:cT,project_vertex:uT,dithering_fragment:fT,dithering_pars_fragment:hT,roughnessmap_fragment:dT,roughnessmap_pars_fragment:pT,shadowmap_pars_fragment:mT,shadowmap_pars_vertex:gT,shadowmap_vertex:vT,shadowmask_pars_fragment:_T,skinbase_vertex:xT,skinning_pars_vertex:ST,skinning_vertex:yT,skinnormal_vertex:MT,specularmap_fragment:ET,specularmap_pars_fragment:bT,tonemapping_fragment:TT,tonemapping_pars_fragment:AT,transmission_fragment:wT,transmission_pars_fragment:RT,uv_pars_fragment:CT,uv_pars_vertex:DT,uv_vertex:UT,worldpos_vertex:LT,background_vert:NT,background_frag:OT,backgroundCube_vert:PT,backgroundCube_frag:IT,cube_vert:FT,cube_frag:zT,depth_vert:BT,depth_frag:HT,distance_vert:GT,distance_frag:VT,equirect_vert:kT,equirect_frag:XT,linedashed_vert:WT,linedashed_frag:qT,meshbasic_vert:YT,meshbasic_frag:ZT,meshlambert_vert:KT,meshlambert_frag:JT,meshmatcap_vert:QT,meshmatcap_frag:jT,meshnormal_vert:$T,meshnormal_frag:tA,meshphong_vert:eA,meshphong_frag:nA,meshphysical_vert:iA,meshphysical_frag:aA,meshtoon_vert:sA,meshtoon_frag:rA,points_vert:oA,points_frag:lA,shadow_vert:cA,shadow_frag:uA,sprite_vert:fA,sprite_frag:hA},Wt={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ge}},envmap:{envMap:{value:null},envMapRotation:{value:new ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ge},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0},uvTransform:{value:new ge}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}}},$i={basic:{uniforms:Yn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.fog]),vertexShader:Te.meshbasic_vert,fragmentShader:Te.meshbasic_frag},lambert:{uniforms:Yn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new xe(0)},envMapIntensity:{value:1}}]),vertexShader:Te.meshlambert_vert,fragmentShader:Te.meshlambert_frag},phong:{uniforms:Yn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Te.meshphong_vert,fragmentShader:Te.meshphong_frag},standard:{uniforms:Yn([Wt.common,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.roughnessmap,Wt.metalnessmap,Wt.fog,Wt.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Te.meshphysical_vert,fragmentShader:Te.meshphysical_frag},toon:{uniforms:Yn([Wt.common,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.gradientmap,Wt.fog,Wt.lights,{emissive:{value:new xe(0)}}]),vertexShader:Te.meshtoon_vert,fragmentShader:Te.meshtoon_frag},matcap:{uniforms:Yn([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,{matcap:{value:null}}]),vertexShader:Te.meshmatcap_vert,fragmentShader:Te.meshmatcap_frag},points:{uniforms:Yn([Wt.points,Wt.fog]),vertexShader:Te.points_vert,fragmentShader:Te.points_frag},dashed:{uniforms:Yn([Wt.common,Wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Te.linedashed_vert,fragmentShader:Te.linedashed_frag},depth:{uniforms:Yn([Wt.common,Wt.displacementmap]),vertexShader:Te.depth_vert,fragmentShader:Te.depth_frag},normal:{uniforms:Yn([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,{opacity:{value:1}}]),vertexShader:Te.meshnormal_vert,fragmentShader:Te.meshnormal_frag},sprite:{uniforms:Yn([Wt.sprite,Wt.fog]),vertexShader:Te.sprite_vert,fragmentShader:Te.sprite_frag},background:{uniforms:{uvTransform:{value:new ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Te.background_vert,fragmentShader:Te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ge}},vertexShader:Te.backgroundCube_vert,fragmentShader:Te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Te.cube_vert,fragmentShader:Te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Te.equirect_vert,fragmentShader:Te.equirect_frag},distance:{uniforms:Yn([Wt.common,Wt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Te.distance_vert,fragmentShader:Te.distance_frag},shadow:{uniforms:Yn([Wt.lights,Wt.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Te.shadow_vert,fragmentShader:Te.shadow_frag}};$i.physical={uniforms:Yn([$i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ge},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ge},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ge},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ge},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ge},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ge}}]),vertexShader:Te.meshphysical_vert,fragmentShader:Te.meshphysical_frag};const fu={r:0,b:0,g:0},dA=new Ge,Fx=new ge;Fx.set(-1,0,0,0,1,0,0,0,1);function pA(r,t,n,a,o,c){const u=new xe(0);let p=o===!0?0:1,d,h,g=null,v=0,_=null;function x(z){let H=z.isScene===!0?z.background:null;if(H&&H.isTexture){const A=z.backgroundBlurriness>0;H=t.get(H,A)}return H}function b(z){let H=!1;const A=x(z);A===null?M(u,p):A&&A.isColor&&(M(A,1),H=!0);const O=r.xr.getEnvironmentBlendMode();O==="additive"?n.buffers.color.setClear(0,0,0,1,c):O==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||H)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function U(z,H){const A=x(H);A&&(A.isCubeTexture||A.mapping===Tl)?(h===void 0&&(h=new bn(new ia(1,1,1),new Ni({name:"BackgroundCubeMaterial",uniforms:eo($i.backgroundCube.uniforms),vertexShader:$i.backgroundCube.vertexShader,fragmentShader:$i.backgroundCube.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(O,w,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(h)),h.material.uniforms.envMap.value=A,h.material.uniforms.backgroundBlurriness.value=H.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(dA.makeRotationFromEuler(H.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(Fx),h.material.toneMapped=Ne.getTransfer(A.colorSpace)!==Xe,(g!==A||v!==A.version||_!==r.toneMapping)&&(h.material.needsUpdate=!0,g=A,v=A.version,_=r.toneMapping),h.layers.enableAll(),z.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(d===void 0&&(d=new bn(new xi(2,2),new Ni({name:"BackgroundMaterial",uniforms:eo($i.background.uniforms),vertexShader:$i.background.vertexShader,fragmentShader:$i.background.fragmentShader,side:Vs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(d)),d.material.uniforms.t2D.value=A,d.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,d.material.toneMapped=Ne.getTransfer(A.colorSpace)!==Xe,A.matrixAutoUpdate===!0&&A.updateMatrix(),d.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||v!==A.version||_!==r.toneMapping)&&(d.material.needsUpdate=!0,g=A,v=A.version,_=r.toneMapping),d.layers.enableAll(),z.unshift(d,d.geometry,d.material,0,0,null))}function M(z,H){z.getRGB(fu,Nx(r)),n.buffers.color.setClear(fu.r,fu.g,fu.b,H,c)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return u},setClearColor:function(z,H=1){u.set(z),p=H,M(u,p)},getClearAlpha:function(){return p},setClearAlpha:function(z){p=z,M(u,p)},render:b,addToRenderList:U,dispose:S}}function mA(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=_(null);let c=o,u=!1;function p(V,q,Z,I,X){let P=!1;const F=v(V,I,Z,q);c!==F&&(c=F,h(c.object)),P=x(V,I,Z,X),P&&b(V,I,Z,X),X!==null&&t.update(X,r.ELEMENT_ARRAY_BUFFER),(P||u)&&(u=!1,A(V,q,Z,I),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function d(){return r.createVertexArray()}function h(V){return r.bindVertexArray(V)}function g(V){return r.deleteVertexArray(V)}function v(V,q,Z,I){const X=I.wireframe===!0;let P=a[q.id];P===void 0&&(P={},a[q.id]=P);const F=V.isInstancedMesh===!0?V.id:0;let Y=P[F];Y===void 0&&(Y={},P[F]=Y);let k=Y[Z.id];k===void 0&&(k={},Y[Z.id]=k);let W=k[X];return W===void 0&&(W=_(d()),k[X]=W),W}function _(V){const q=[],Z=[],I=[];for(let X=0;X<n;X++)q[X]=0,Z[X]=0,I[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:Z,attributeDivisors:I,object:V,attributes:{},index:null}}function x(V,q,Z,I){const X=c.attributes,P=q.attributes;let F=0;const Y=Z.getAttributes();for(const k in Y)if(Y[k].location>=0){const R=X[k];let K=P[k];if(K===void 0&&(k==="instanceMatrix"&&V.instanceMatrix&&(K=V.instanceMatrix),k==="instanceColor"&&V.instanceColor&&(K=V.instanceColor)),R===void 0||R.attribute!==K||K&&R.data!==K.data)return!0;F++}return c.attributesNum!==F||c.index!==I}function b(V,q,Z,I){const X={},P=q.attributes;let F=0;const Y=Z.getAttributes();for(const k in Y)if(Y[k].location>=0){let R=P[k];R===void 0&&(k==="instanceMatrix"&&V.instanceMatrix&&(R=V.instanceMatrix),k==="instanceColor"&&V.instanceColor&&(R=V.instanceColor));const K={};K.attribute=R,R&&R.data&&(K.data=R.data),X[k]=K,F++}c.attributes=X,c.attributesNum=F,c.index=I}function U(){const V=c.newAttributes;for(let q=0,Z=V.length;q<Z;q++)V[q]=0}function M(V){S(V,0)}function S(V,q){const Z=c.newAttributes,I=c.enabledAttributes,X=c.attributeDivisors;Z[V]=1,I[V]===0&&(r.enableVertexAttribArray(V),I[V]=1),X[V]!==q&&(r.vertexAttribDivisor(V,q),X[V]=q)}function z(){const V=c.newAttributes,q=c.enabledAttributes;for(let Z=0,I=q.length;Z<I;Z++)q[Z]!==V[Z]&&(r.disableVertexAttribArray(Z),q[Z]=0)}function H(V,q,Z,I,X,P,F){F===!0?r.vertexAttribIPointer(V,q,Z,X,P):r.vertexAttribPointer(V,q,Z,I,X,P)}function A(V,q,Z,I){U();const X=I.attributes,P=Z.getAttributes(),F=q.defaultAttributeValues;for(const Y in P){const k=P[Y];if(k.location>=0){let W=X[Y];if(W===void 0&&(Y==="instanceMatrix"&&V.instanceMatrix&&(W=V.instanceMatrix),Y==="instanceColor"&&V.instanceColor&&(W=V.instanceColor)),W!==void 0){const R=W.normalized,K=W.itemSize,it=t.get(W);if(it===void 0)continue;const mt=it.buffer,Lt=it.type,Pt=it.bytesPerElement,nt=Lt===r.INT||Lt===r.UNSIGNED_INT||W.gpuType===yp;if(W.isInterleavedBufferAttribute){const dt=W.data,wt=dt.stride,ee=W.offset;if(dt.isInstancedInterleavedBuffer){for(let zt=0;zt<k.locationSize;zt++)S(k.location+zt,dt.meshPerAttribute);V.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let zt=0;zt<k.locationSize;zt++)M(k.location+zt);r.bindBuffer(r.ARRAY_BUFFER,mt);for(let zt=0;zt<k.locationSize;zt++)H(k.location+zt,K/k.locationSize,Lt,R,wt*Pt,(ee+K/k.locationSize*zt)*Pt,nt)}else{if(W.isInstancedBufferAttribute){for(let dt=0;dt<k.locationSize;dt++)S(k.location+dt,W.meshPerAttribute);V.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let dt=0;dt<k.locationSize;dt++)M(k.location+dt);r.bindBuffer(r.ARRAY_BUFFER,mt);for(let dt=0;dt<k.locationSize;dt++)H(k.location+dt,K/k.locationSize,Lt,R,K*Pt,K/k.locationSize*dt*Pt,nt)}}else if(F!==void 0){const R=F[Y];if(R!==void 0)switch(R.length){case 2:r.vertexAttrib2fv(k.location,R);break;case 3:r.vertexAttrib3fv(k.location,R);break;case 4:r.vertexAttrib4fv(k.location,R);break;default:r.vertexAttrib1fv(k.location,R)}}}}z()}function O(){D();for(const V in a){const q=a[V];for(const Z in q){const I=q[Z];for(const X in I){const P=I[X];for(const F in P)g(P[F].object),delete P[F];delete I[X]}}delete a[V]}}function w(V){if(a[V.id]===void 0)return;const q=a[V.id];for(const Z in q){const I=q[Z];for(const X in I){const P=I[X];for(const F in P)g(P[F].object),delete P[F];delete I[X]}}delete a[V.id]}function L(V){for(const q in a){const Z=a[q];for(const I in Z){const X=Z[I];if(X[V.id]===void 0)continue;const P=X[V.id];for(const F in P)g(P[F].object),delete P[F];delete X[V.id]}}}function y(V){for(const q in a){const Z=a[q],I=V.isInstancedMesh===!0?V.id:0,X=Z[I];if(X!==void 0){for(const P in X){const F=X[P];for(const Y in F)g(F[Y].object),delete F[Y];delete X[P]}delete Z[I],Object.keys(Z).length===0&&delete a[q]}}}function D(){B(),u=!0,c!==o&&(c=o,h(c.object))}function B(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:p,reset:D,resetDefaultState:B,dispose:O,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:L,initAttributes:U,enableAttribute:M,disableUnusedAttributes:z}}function gA(r,t,n){let a;function o(d){a=d}function c(d,h){r.drawArrays(a,d,h),n.update(h,a,1)}function u(d,h,g){g!==0&&(r.drawArraysInstanced(a,d,h,g),n.update(h,a,g))}function p(d,h,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,d,0,h,0,g);let _=0;for(let x=0;x<g;x++)_+=h[x];n.update(_,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=p}function vA(r,t,n,a){let o;function c(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");o=r.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(L){return!(L!==Li&&a.convert(L)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(L){const y=L===Dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==En&&L!==Si&&!y&&a.convert(L)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function d(L){if(L==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=n.precision!==void 0?n.precision:"highp";const g=d(h);g!==h&&(he("WebGLRenderer:",h,"not supported, using",g,"instead."),h=g);const v=n.logarithmicDepthBuffer===!0,_=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&_===!1&&he("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),U=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),z=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),H=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),O=r.getParameter(r.MAX_SAMPLES),w=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:d,textureFormatReadable:u,textureTypeReadable:p,precision:h,logarithmicDepthBuffer:v,reversedDepthBuffer:_,maxTextures:x,maxVertexTextures:b,maxTextureSize:U,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:z,maxVaryings:H,maxFragmentUniforms:A,maxSamples:O,samples:w}}function _A(r){const t=this;let n=null,a=0,o=!1,c=!1;const u=new Da,p=new ge,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(v,_){const x=v.length!==0||_||a!==0||o;return o=_,a=v.length,x},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,_){n=g(v,_,0)},this.setState=function(v,_,x){const b=v.clippingPlanes,U=v.clipIntersection,M=v.clipShadows,S=r.get(v);if(!o||b===null||b.length===0||c&&!M)c?g(null):h();else{const z=c?0:a,H=z*4;let A=S.clippingState||null;d.value=A,A=g(b,_,H,x);for(let O=0;O!==H;++O)A[O]=n[O];S.clippingState=A,this.numIntersection=U?this.numPlanes:0,this.numPlanes+=z}};function h(){d.value!==n&&(d.value=n,d.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(v,_,x,b){const U=v!==null?v.length:0;let M=null;if(U!==0){if(M=d.value,b!==!0||M===null){const S=x+U*4,z=_.matrixWorldInverse;p.getNormalMatrix(z),(M===null||M.length<S)&&(M=new Float32Array(S));for(let H=0,A=x;H!==U;++H,A+=4)u.copy(v[H]).applyMatrix4(z,p),u.normal.toArray(M,A),M[A+3]=u.constant}d.value=M,d.needsUpdate=!0}return t.numPlanes=U,t.numIntersection=0,M}}const Wr=4,xA=6,SA=20,yA=256,il=new Hp,A_=new xe;let yd=null,Md=0,Ed=0,bd=!1;const MA=new J,Bs=new J;class w_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,o=100,c={}){const{size:u=256,position:p=MA}=c;yd=this._renderer.getRenderTarget(),Md=this._renderer.getActiveCubeFace(),Ed=this._renderer.getActiveMipmapLevel(),bd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(t,a,o,d,p),n>0&&this._blur(d,0,0,n),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=D_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=C_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(yd,Md,Ed),this._renderer.xr.enabled=bd,t.scissorTest=!1,Gr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ks||t.mapping===Kr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yd=this._renderer.getRenderTarget(),Md=this._renderer.getActiveCubeFace(),Ed=this._renderer.getActiveMipmapLevel(),bd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:Dn,format:Li,colorSpace:Jr,depthBuffer:!1},o=R_(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=R_(t,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=EA(c)),this._blurMaterial=TA(c,t,n),this._ggxMaterial=bA(c,t,n)}return o}_compileMaterial(t){const n=new bn(new wn,t);this._renderer.compile(n,il)}_sceneToCubeUV(t,n,a,o,c){const d=new si(90,1,n,a),h=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],v=this._renderer,_=v.autoClear,x=v.toneMapping;v.getClearColor(A_),v.toneMapping=ea,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(o),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new bn(new ia,new Sl({name:"PMREM.Background",side:ri,depthWrite:!1,depthTest:!1})));const U=this._backgroundBox,M=U.material;let S=!1;const z=t.background;z?z.isColor&&(M.color.copy(z),t.background=null,S=!0):(M.color.copy(A_),S=!0);for(let H=0;H<6;H++){const A=H%3;A===0?(d.up.set(0,h[H],0),d.position.set(c.x,c.y,c.z),d.lookAt(c.x+g[H],c.y,c.z)):A===1?(d.up.set(0,0,h[H]),d.position.set(c.x,c.y,c.z),d.lookAt(c.x,c.y+g[H],c.z)):(d.up.set(0,h[H],0),d.position.set(c.x,c.y,c.z),d.lookAt(c.x,c.y,c.z+g[H]));const O=this._cubeSize;Gr(o,A*O,H>2?O:0,O,O),v.setRenderTarget(o),S&&v.render(U,d),v.render(t,d)}v.toneMapping=x,v.autoClear=_,t.background=z}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===ks||t.mapping===Kr;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=D_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=C_());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const p=c.uniforms;p.envMap.value=t;const d=this._cubeSize;Gr(n,0,0,3*d,2*d),a.setRenderTarget(n),a.render(u,il)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=a}_applyGGXFilter(t,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,p=this._lodMeshes[a];p.material=u;const d=u.uniforms,h=a/(this._lodMeshes.length-1),g=n/(this._lodMeshes.length-1),v=Math.sqrt(h*h-g*g),_=h*1.25,x=v*_,{_lodMax:b}=this,U=this._sizeLods[a],M=3*U*(a>b-Wr?a-b+Wr:0),S=4*(this._cubeSize-U);d.envMap.value=t.texture,d.roughness.value=x,d.mipInt.value=b-n,Gr(c,M,S,3*U,2*U),o.setRenderTarget(c),o.render(p,il),d.envMap.value=c.texture,d.roughness.value=0,d.mipInt.value=b-a,Gr(t,M,S,3*U,2*U),o.setRenderTarget(t),o.render(p,il)}_blur(t,n,a,o){const c=this._pingPongRenderTarget,u=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(t,c,n,a,u),this._blurPass(c,t,a,a,u)}_blurPass(t,n,a,o,c){const u=this._renderer,p=this._blurMaterial,d=this._lodMeshes[o];d.material=p;const h=p.uniforms;h.envMap.value=t.texture,h.sigma.value=c,h.mipInt.value=this._lodMax-a;const g=this._sizeLods[o],v=3*g*(o>this._lodMax-Wr?o-this._lodMax+Wr:0),_=4*(this._cubeSize-g);Gr(n,v,_,3*g,2*g),u.setRenderTarget(n),u.render(d,il)}}function EA(r){const t=[],n=[];let a=r;const o=r-Wr+1+xA;for(let c=0;c<o;c++){const u=Math.pow(2,a);t.push(u);const p=1/(u-2),d=-p,h=1+p,g=[d,d,h,d,h,h,d,d,h,h,d,h],v=6,_=6,x=3,b=new Float32Array(x*_*v),U=new Float32Array(x*_*v);for(let S=0;S<v;S++){const z=S%3*2/3-1,H=S>2?0:-1,A=[z,H,0,z+2/3,H,0,z+2/3,H+1,0,z,H,0,z+2/3,H+1,0,z,H+1,0];b.set(A,x*_*S);for(let O=0;O<_;O++){const w=g[O*2]*2-1,L=g[O*2+1]*2-1;S===0?Bs.set(1,L,w):S===1?Bs.set(-w,1,-L):S===2?Bs.set(-w,L,1):S===3?Bs.set(-1,L,-w):S===4?Bs.set(-w,-1,L):Bs.set(w,L,-1),Bs.toArray(U,(S*_+O)*x)}}const M=new wn;M.setAttribute("position",new ki(b,x)),M.setAttribute("outputDirection",new ki(U,x)),n.push(new bn(M,null)),a>Wr&&a--}return{lodMeshes:n,sizeLods:t}}function R_(r,t,n){const a=new Jn(r,t,n);return a.texture.mapping=Tl,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Gr(r,t,n,a,o){r.viewport.set(t,n,a,o),r.scissor.set(t,n,a,o)}function bA(r,t,n){return new Ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ou(),fragmentShader:`

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
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function TA(r,t,n){return new Ni({name:"SphericalGaussianBlur",defines:{SAMPLES:SA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ou(),fragmentShader:`

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
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function C_(){return new Ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ou(),fragmentShader:`

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
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function D_(){return new Ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ou(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function Ou(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Gp extends Jn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new yx(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new ia(5,5,5),c=new Ni({name:"CubemapFromEquirect",uniforms:eo(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:ri,blending:Oa});c.uniforms.tEquirect.value=n;const u=new bn(o,c),p=n.minFilter;return n.minFilter===Na&&(n.minFilter=rn),new RE(1,10,this).update(t,u),n.minFilter=p,u.geometry.dispose(),u.material.dispose(),this}clear(t,n=!0,a=!0,o=!0){const c=t.getRenderTarget();for(let u=0;u<6;u++)t.setRenderTarget(this,u),t.clear(n,a,o);t.setRenderTarget(c)}}function AA(r){let t=new WeakMap,n=new WeakMap,a=null;function o(_,x=!1){return _==null?null:x?u(_):c(_)}function c(_){if(_&&_.isTexture){const x=_.mapping;if(x===Yh||x===Zh)if(t.has(_)){const b=t.get(_).texture;return p(b,_.mapping)}else{const b=_.image;if(b&&b.height>0){const U=new Gp(b.height);return U.fromEquirectangularTexture(r,_),t.set(_,U),_.addEventListener("dispose",h),p(U.texture,_.mapping)}else return null}}return _}function u(_){if(_&&_.isTexture){const x=_.mapping,b=x===Yh||x===Zh,U=x===ks||x===Kr;if(b||U){let M=n.get(_);const S=M!==void 0?M.texture.pmremVersion:0;if(_.isRenderTargetTexture&&_.pmremVersion!==S)return a===null&&(a=new w_(r)),M=b?a.fromEquirectangular(_,M):a.fromCubemap(_,M),M.texture.pmremVersion=_.pmremVersion,n.set(_,M),M.texture;if(M!==void 0)return M.texture;{const z=_.image;return b&&z&&z.height>0||U&&z&&d(z)?(a===null&&(a=new w_(r)),M=b?a.fromEquirectangular(_):a.fromCubemap(_),M.texture.pmremVersion=_.pmremVersion,n.set(_,M),_.addEventListener("dispose",g),M.texture):null}}}return _}function p(_,x){return x===Yh?_.mapping=ks:x===Zh&&(_.mapping=Kr),_}function d(_){let x=0;const b=6;for(let U=0;U<b;U++)_[U]!==void 0&&x++;return x===b}function h(_){const x=_.target;x.removeEventListener("dispose",h);const b=t.get(x);b!==void 0&&(t.delete(x),b.dispose())}function g(_){const x=_.target;x.removeEventListener("dispose",g);const b=n.get(x);b!==void 0&&(n.delete(x),b.dispose())}function v(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:v}}function wA(r){const t={};function n(a){if(t[a]!==void 0)return t[a];const o=r.getExtension(a);return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&Yr("WebGLRenderer: "+a+" extension not supported."),o}}}function RA(r,t,n,a){const o={},c=new WeakMap;function u(v){const _=v.target;_.index!==null&&t.remove(_.index);for(const b in _.attributes)t.remove(_.attributes[b]);_.removeEventListener("dispose",u),delete o[_.id];const x=c.get(_);x&&(t.remove(x),c.delete(_)),a.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,n.memory.geometries--}function p(v,_){return o[_.id]===!0||(_.addEventListener("dispose",u),o[_.id]=!0,n.memory.geometries++),_}function d(v){const _=v.attributes;for(const x in _)t.update(_[x],r.ARRAY_BUFFER)}function h(v){const _=[],x=v.index,b=v.attributes.position;let U=0;if(b===void 0)return;if(x!==null){const z=x.array;U=x.version;for(let H=0,A=z.length;H<A;H+=3){const O=z[H+0],w=z[H+1],L=z[H+2];_.push(O,w,w,L,L,O)}}else{const z=b.array;U=b.version;for(let H=0,A=z.length/3-1;H<A;H+=3){const O=H+0,w=H+1,L=H+2;_.push(O,w,w,L,L,O)}}const M=new(b.count>=65535?_x:vx)(_,1);M.version=U;const S=c.get(v);S&&t.remove(S),c.set(v,M)}function g(v){const _=c.get(v);if(_){const x=v.index;x!==null&&_.version<x.version&&h(v)}else h(v);return c.get(v)}return{get:p,update:d,getWireframeAttribute:g}}function CA(r,t,n){let a;function o(v){a=v}let c,u;function p(v){c=v.type,u=v.bytesPerElement}function d(v,_){r.drawElements(a,_,c,v*u),n.update(_,a,1)}function h(v,_,x){x!==0&&(r.drawElementsInstanced(a,_,c,v*u,x),n.update(_,a,x))}function g(v,_,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,_,0,c,v,0,x);let U=0;for(let M=0;M<x;M++)U+=_[M];n.update(U,a,1)}this.setMode=o,this.setIndex=p,this.render=d,this.renderInstances=h,this.renderMultiDraw=g}function DA(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,p){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=p*(c/3);break;case r.LINES:n.lines+=p*(c/2);break;case r.LINE_STRIP:n.lines+=p*(c-1);break;case r.LINE_LOOP:n.lines+=p*c;break;case r.POINTS:n.points+=p*c;break;default:Le("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function UA(r,t,n){const a=new WeakMap,o=new en;function c(u,p,d){const h=u.morphTargetInfluences,g=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=g!==void 0?g.length:0;let _=a.get(p);if(_===void 0||_.count!==v){let D=function(){L.dispose(),a.delete(p),p.removeEventListener("dispose",D)};_!==void 0&&_.texture.dispose();const x=p.morphAttributes.position!==void 0,b=p.morphAttributes.normal!==void 0,U=p.morphAttributes.color!==void 0,M=p.morphAttributes.position||[],S=p.morphAttributes.normal||[],z=p.morphAttributes.color||[];let H=0;x===!0&&(H=1),b===!0&&(H=2),U===!0&&(H=3);let A=p.attributes.position.count*H,O=1;A>t.maxTextureSize&&(O=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const w=new Float32Array(A*O*4*v),L=new mx(w,A,O,v);L.type=Si,L.needsUpdate=!0;const y=H*4;for(let B=0;B<v;B++){const V=M[B],q=S[B],Z=z[B],I=A*O*4*B;for(let X=0;X<V.count;X++){const P=X*y;x===!0&&(o.fromBufferAttribute(V,X),w[I+P+0]=o.x,w[I+P+1]=o.y,w[I+P+2]=o.z,w[I+P+3]=0),b===!0&&(o.fromBufferAttribute(q,X),w[I+P+4]=o.x,w[I+P+5]=o.y,w[I+P+6]=o.z,w[I+P+7]=0),U===!0&&(o.fromBufferAttribute(Z,X),w[I+P+8]=o.x,w[I+P+9]=o.y,w[I+P+10]=o.z,w[I+P+11]=Z.itemSize===4?o.w:1)}}_={count:v,texture:L,size:new Ft(A,O)},a.set(p,_),p.addEventListener("dispose",D)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)d.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let x=0;for(let U=0;U<h.length;U++)x+=h[U];const b=p.morphTargetsRelative?1:1-x;d.getUniforms().setValue(r,"morphTargetBaseInfluence",b),d.getUniforms().setValue(r,"morphTargetInfluences",h)}d.getUniforms().setValue(r,"morphTargetsTexture",_.texture,n),d.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}return{update:c}}function LA(r,t,n,a,o){let c=new WeakMap;function u(h){const g=o.render.frame,v=h.geometry,_=t.get(h,v);if(c.get(_)!==g&&(t.update(_),c.set(_,g)),h.isInstancedMesh&&(h.hasEventListener("dispose",d)===!1&&h.addEventListener("dispose",d),c.get(h)!==g&&(n.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,r.ARRAY_BUFFER),c.set(h,g))),h.isSkinnedMesh){const x=h.skeleton;c.get(x)!==g&&(x.update(),c.set(x,g))}return _}function p(){c=new WeakMap}function d(h){const g=h.target;g.removeEventListener("dispose",d),a.releaseStatesOfObject(g),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:u,dispose:p}}const NA={[ex]:"LINEAR_TONE_MAPPING",[nx]:"REINHARD_TONE_MAPPING",[ix]:"CINEON_TONE_MAPPING",[Sp]:"ACES_FILMIC_TONE_MAPPING",[sx]:"AGX_TONE_MAPPING",[rx]:"NEUTRAL_TONE_MAPPING",[ax]:"CUSTOM_TONE_MAPPING"};function OA(r,t,n,a,o,c){const u=new Jn(t,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let p=null,d=null;const h=new wn;h.setAttribute("position",new Oe([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Oe([0,2,0,0,2,0],2));const g=new mE({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),v=new bn(h,g),_=new Hp(-1,1,1,-1,0,1);let x=null,b=null,U=!1,M,S=null,z=[],H=!1;this.setSize=function(A,O){u.setSize(A,O),p!==null&&p.setSize(A,O),d!==null&&d.setSize(A,O);for(let w=0;w<z.length;w++){const L=z[w];L.setSize&&L.setSize(A,O)}},this.setEffects=function(A){z=A,H=z.length>0&&z[0].isRenderPass===!0;const O=u.width,w=u.height;z.length>0&&p===null&&(p=new Jn(O,w,{type:Dn,depthBuffer:!1,stencilBuffer:!1}),d=new Jn(O,w,{type:Dn,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<z.length;L++){const y=z[L];y.setSize&&y.setSize(O,w)}},this.begin=function(A,O){if(U||A.toneMapping===ea&&z.length===0)return!1;if(S=O,O!==null){const w=O.width,L=O.height;(u.width!==w||u.height!==L)&&this.setSize(w,L)}return H===!1&&A.setRenderTarget(u),M=A.toneMapping,A.toneMapping=ea,!0},this.hasRenderPass=function(){return H},this.end=function(A,O){A.toneMapping=M,U=!0;let w=u,L=p;for(let y=0;y<z.length;y++){const D=z[y];D.enabled!==!1&&(D.render(A,L,w,O),D.needsSwap!==!1&&(w=L,L=L===p?d:p))}if(x!==A.outputColorSpace||b!==A.toneMapping){x=A.outputColorSpace,b=A.toneMapping,g.defines={},Ne.getTransfer(x)===Xe&&(g.defines.SRGB_TRANSFER="");const y=NA[b];y&&(g.defines[y]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=w.texture,A.setRenderTarget(S),A.render(v,_),S=null,U=!1},this.isCompositing=function(){return U},this.dispose=function(){u.dispose(),p!==null&&p.dispose(),d!==null&&d.dispose(),h.dispose(),g.dispose()}}const zx=new Vn,gp=new jr(1,1),Bx=new mx,Hx=new d1,Gx=new yx,U_=[],L_=[],N_=new Float32Array(16),O_=new Float32Array(9),P_=new Float32Array(4);function no(r,t,n){const a=r[0];if(a<=0||a>0)return r;const o=t*n;let c=U_[o];if(c===void 0&&(c=new Float32Array(o),U_[o]=c),t!==0){a.toArray(c,0);for(let u=1,p=0;u!==t;++u)p+=n,r[u].toArray(c,p)}return c}function Tn(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function An(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Pu(r,t){let n=L_[t];n===void 0&&(n=new Int32Array(t),L_[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function PA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function IA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tn(n,t))return;r.uniform2fv(this.addr,t),An(n,t)}}function FA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Tn(n,t))return;r.uniform3fv(this.addr,t),An(n,t)}}function zA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tn(n,t))return;r.uniform4fv(this.addr,t),An(n,t)}}function BA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Tn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),An(n,t)}else{if(Tn(n,a))return;P_.set(a),r.uniformMatrix2fv(this.addr,!1,P_),An(n,a)}}function HA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Tn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),An(n,t)}else{if(Tn(n,a))return;O_.set(a),r.uniformMatrix3fv(this.addr,!1,O_),An(n,a)}}function GA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Tn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),An(n,t)}else{if(Tn(n,a))return;N_.set(a),r.uniformMatrix4fv(this.addr,!1,N_),An(n,a)}}function VA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function kA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tn(n,t))return;r.uniform2iv(this.addr,t),An(n,t)}}function XA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Tn(n,t))return;r.uniform3iv(this.addr,t),An(n,t)}}function WA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tn(n,t))return;r.uniform4iv(this.addr,t),An(n,t)}}function qA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function YA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tn(n,t))return;r.uniform2uiv(this.addr,t),An(n,t)}}function ZA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Tn(n,t))return;r.uniform3uiv(this.addr,t),An(n,t)}}function KA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tn(n,t))return;r.uniform4uiv(this.addr,t),An(n,t)}}function JA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(gp.compareFunction=n.isReversedDepthBuffer()?Rp:Uu,c=gp):c=zx,n.setTexture2D(t||c,o)}function QA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||Hx,o)}function jA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||Gx,o)}function $A(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||Bx,o)}function t2(r){switch(r){case 5126:return PA;case 35664:return IA;case 35665:return FA;case 35666:return zA;case 35674:return BA;case 35675:return HA;case 35676:return GA;case 5124:case 35670:return VA;case 35667:case 35671:return kA;case 35668:case 35672:return XA;case 35669:case 35673:return WA;case 5125:return qA;case 36294:return YA;case 36295:return ZA;case 36296:return KA;case 35678:case 36198:case 36298:case 36306:case 35682:return JA;case 35679:case 36299:case 36307:return QA;case 35680:case 36300:case 36308:case 36293:return jA;case 36289:case 36303:case 36311:case 36292:return $A}}function e2(r,t){r.uniform1fv(this.addr,t)}function n2(r,t){const n=no(t,this.size,2);r.uniform2fv(this.addr,n)}function i2(r,t){const n=no(t,this.size,3);r.uniform3fv(this.addr,n)}function a2(r,t){const n=no(t,this.size,4);r.uniform4fv(this.addr,n)}function s2(r,t){const n=no(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function r2(r,t){const n=no(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function o2(r,t){const n=no(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function l2(r,t){r.uniform1iv(this.addr,t)}function c2(r,t){r.uniform2iv(this.addr,t)}function u2(r,t){r.uniform3iv(this.addr,t)}function f2(r,t){r.uniform4iv(this.addr,t)}function h2(r,t){r.uniform1uiv(this.addr,t)}function d2(r,t){r.uniform2uiv(this.addr,t)}function p2(r,t){r.uniform3uiv(this.addr,t)}function m2(r,t){r.uniform4uiv(this.addr,t)}function g2(r,t,n){const a=this.cache,o=t.length,c=Pu(n,o);Tn(a,c)||(r.uniform1iv(this.addr,c),An(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=gp:u=zx;for(let p=0;p!==o;++p)n.setTexture2D(t[p]||u,c[p])}function v2(r,t,n){const a=this.cache,o=t.length,c=Pu(n,o);Tn(a,c)||(r.uniform1iv(this.addr,c),An(a,c));for(let u=0;u!==o;++u)n.setTexture3D(t[u]||Hx,c[u])}function _2(r,t,n){const a=this.cache,o=t.length,c=Pu(n,o);Tn(a,c)||(r.uniform1iv(this.addr,c),An(a,c));for(let u=0;u!==o;++u)n.setTextureCube(t[u]||Gx,c[u])}function x2(r,t,n){const a=this.cache,o=t.length,c=Pu(n,o);Tn(a,c)||(r.uniform1iv(this.addr,c),An(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(t[u]||Bx,c[u])}function S2(r){switch(r){case 5126:return e2;case 35664:return n2;case 35665:return i2;case 35666:return a2;case 35674:return s2;case 35675:return r2;case 35676:return o2;case 5124:case 35670:return l2;case 35667:case 35671:return c2;case 35668:case 35672:return u2;case 35669:case 35673:return f2;case 5125:return h2;case 36294:return d2;case 36295:return p2;case 36296:return m2;case 35678:case 36198:case 36298:case 36306:case 35682:return g2;case 35679:case 36299:case 36307:return v2;case 35680:case 36300:case 36308:case 36293:return _2;case 36289:case 36303:case 36311:case 36292:return x2}}class y2{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=t2(n.type)}}class M2{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=S2(n.type)}}class E2{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const p=o[c];p.setValue(t,n[p.id],a)}}}const Td=/(\w+)(\])?(\[|\.)?/g;function I_(r,t){r.seq.push(t),r.map[t.id]=t}function b2(r,t,n){const a=r.name,o=a.length;for(Td.lastIndex=0;;){const c=Td.exec(a),u=Td.lastIndex;let p=c[1];const d=c[2]==="]",h=c[3];if(d&&(p=p|0),h===void 0||h==="["&&u+2===o){I_(n,h===void 0?new y2(p,r,t):new M2(p,r,t));break}else{let v=n.map[p];v===void 0&&(v=new E2(p),I_(n,v)),n=v}}}class Su{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const p=t.getActiveUniform(n,u),d=t.getUniformLocation(n,p.name);b2(p,d,this)}const o=[],c=[];for(const u of this.seq)u.type===t.SAMPLER_2D_SHADOW||u.type===t.SAMPLER_CUBE_SHADOW||u.type===t.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(t,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let c=0,u=n.length;c!==u;++c){const p=n[c],d=a[p.id];d.needsUpdate!==!1&&p.setValue(t,d.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,c=t.length;o!==c;++o){const u=t[o];u.id in n&&a.push(u)}return a}}function F_(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const T2=37297;let A2=0;function w2(r,t){const n=r.split(`
`),a=[],o=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let u=o;u<c;u++){const p=u+1;a.push(`${p===t?">":" "} ${p}: ${n[u]}`)}return a.join(`
`)}const z_=new ge;function R2(r){Ne._getMatrix(z_,Ne.workingColorSpace,r);const t=`mat3( ${z_.elements.map(n=>n.toFixed(4))} )`;switch(Ne.getTransfer(r)){case bu:return[t,"LinearTransferOETF"];case Xe:return[t,"sRGBTransferOETF"];default:return he("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function B_(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const p=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+w2(r.getShaderSource(t),p)}else return c}function C2(r,t){const n=R2(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const D2={[ex]:"Linear",[nx]:"Reinhard",[ix]:"Cineon",[Sp]:"ACESFilmic",[sx]:"AgX",[rx]:"Neutral",[ax]:"Custom"};function U2(r,t){const n=D2[t];return n===void 0?(he("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const hu=new J;function L2(){Ne.getLuminanceCoefficients(hu);const r=hu.x.toFixed(4),t=hu.y.toFixed(4),n=hu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function N2(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ol).join(`
`)}function O2(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function P2(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(t,o),u=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),n[u]={type:c.type,location:r.getAttribLocation(t,u),locationSize:p}}return n}function ol(r){return r!==""}function H_(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function G_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const I2=/^[ \t]*#include +<([\w\d./]+)>/gm;function vp(r){return r.replace(I2,z2)}const F2=new Map;function z2(r,t){let n=Te[t];if(n===void 0){const a=F2.get(t);if(a!==void 0)n=Te[a],he('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return vp(n)}const B2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function V_(r){return r.replace(B2,H2)}function H2(r,t,n,a){let o="";for(let c=parseInt(t);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function k_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const G2={[cl]:"SHADOWMAP_TYPE_PCF",[sl]:"SHADOWMAP_TYPE_VSM"};function V2(r){return G2[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const k2={[ks]:"ENVMAP_TYPE_CUBE",[Kr]:"ENVMAP_TYPE_CUBE",[Tl]:"ENVMAP_TYPE_CUBE_UV"};function X2(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":k2[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const W2={[Kr]:"ENVMAP_MODE_REFRACTION"};function q2(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":W2[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Y2={[tx]:"ENVMAP_BLENDING_MULTIPLY",[CM]:"ENVMAP_BLENDING_MIX",[DM]:"ENVMAP_BLENDING_ADD"};function Z2(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Y2[r.combine]||"ENVMAP_BLENDING_NONE"}function K2(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function J2(r,t,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,p=n.fragmentShader;const d=V2(n),h=X2(n),g=q2(n),v=Z2(n),_=K2(n),x=N2(n),b=O2(c),U=o.createProgram();let M,S,z=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(ol).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(ol).join(`
`),S.length>0&&(S+=`
`)):(M=[k_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+d:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ol).join(`
`),S=[k_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.envMap?"#define "+g:"",n.envMap?"#define "+v:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+d:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ea?"#define TONE_MAPPING":"",n.toneMapping!==ea?Te.tonemapping_pars_fragment:"",n.toneMapping!==ea?U2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Te.colorspace_pars_fragment,C2("linearToOutputTexel",n.outputColorSpace),L2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ol).join(`
`)),u=vp(u),u=H_(u,n),u=G_(u,n),p=vp(p),p=H_(p,n),p=G_(p,n),u=V_(u),p=V_(p),n.isRawShaderMaterial!==!0&&(z=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",n.glslVersion===Hv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Hv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const H=z+M+u,A=z+S+p,O=F_(o,o.VERTEX_SHADER,H),w=F_(o,o.FRAGMENT_SHADER,A);o.attachShader(U,O),o.attachShader(U,w),n.index0AttributeName!==void 0?o.bindAttribLocation(U,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(U,0,"position"),o.linkProgram(U);function L(V){if(r.debug.checkShaderErrors){const q=o.getProgramInfoLog(U)||"",Z=o.getShaderInfoLog(O)||"",I=o.getShaderInfoLog(w)||"",X=q.trim(),P=Z.trim(),F=I.trim();let Y=!0,k=!0;if(o.getProgramParameter(U,o.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,U,O,w);else{const W=B_(o,O,"vertex"),R=B_(o,w,"fragment");Le("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(U,o.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+X+`
`+W+`
`+R)}else X!==""?he("WebGLProgram: Program Info Log:",X):(P===""||F==="")&&(k=!1);k&&(V.diagnostics={runnable:Y,programLog:X,vertexShader:{log:P,prefix:M},fragmentShader:{log:F,prefix:S}})}o.deleteShader(O),o.deleteShader(w),y=new Su(o,U),D=P2(o,U)}let y;this.getUniforms=function(){return y===void 0&&L(this),y};let D;this.getAttributes=function(){return D===void 0&&L(this),D};let B=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=o.getProgramParameter(U,T2)),B},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(U),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=A2++,this.cacheKey=t,this.usedTimes=1,this.program=U,this.vertexShader=O,this.fragmentShader=w,this}let Q2=0;class j2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new $2(t),n.set(t,a)),a}}class $2{constructor(t){this.id=Q2++,this.code=t,this.usedTimes=0}}function t3(r){return r===Xs||r===Mu||r===Eu}function e3(r,t,n,a,o,c){const u=new Up,p=new j2,d=new Set,h=[],g=new Map,v=a.logarithmicDepthBuffer;let _=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(y){return d.add(y),y===0?"uv":`uv${y}`}function U(y,D,B,V,q,Z){const I=V.fog,X=q.geometry,P=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?V.environment:null,F=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Y=t.get(y.envMap||P,F),k=Y&&Y.mapping===Tl?Y.image.height:null,W=x[y.type];y.precision!==null&&(_=a.getMaxPrecision(y.precision),_!==y.precision&&he("WebGLProgram.getParameters:",y.precision,"not supported, using",_,"instead."));const R=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,K=R!==void 0?R.length:0;let it=0;X.morphAttributes.position!==void 0&&(it=1),X.morphAttributes.normal!==void 0&&(it=2),X.morphAttributes.color!==void 0&&(it=3);let mt,Lt,Pt,nt;if(W){const We=$i[W];mt=We.vertexShader,Lt=We.fragmentShader}else{mt=y.vertexShader,Lt=y.fragmentShader;const We=p.getVertexShaderStage(y),Pe=p.getFragmentShaderStage(y);p.update(y,We,Pe),Pt=We.id,nt=Pe.id}const dt=r.getRenderTarget(),wt=r.state.buffers.depth.getReversed(),ee=q.isInstancedMesh===!0,zt=q.isBatchedMesh===!0,ie=!!y.map,ue=!!y.matcap,gt=!!Y,Ct=!!y.aoMap,Nt=!!y.lightMap,Dt=!!y.bumpMap&&y.wireframe===!1,It=!!y.normalMap,ae=!!y.displacementMap,jt=!!y.emissiveMap,ce=!!y.metalnessMap,de=!!y.roughnessMap,j=y.anisotropy>0,pe=y.clearcoat>0,Se=y.dispersion>0,G=y.retroreflectivity>0,T=y.iridescence>0,at=y.sheen>0,ct=y.transmission>0,St=j&&!!y.anisotropyMap,Ot=pe&&!!y.clearcoatMap,Bt=pe&&!!y.clearcoatNormalMap,_t=pe&&!!y.clearcoatRoughnessMap,yt=T&&!!y.iridescenceMap,st=T&&!!y.iridescenceThicknessMap,xt=at&&!!y.sheenColorMap,Tt=at&&!!y.sheenRoughnessMap,Rt=!!y.specularMap,Vt=!!y.specularColorMap,qt=!!y.specularIntensityMap,re=ct&&!!y.transmissionMap,$=ct&&!!y.thicknessMap,Ht=!!y.gradientMap,Mt=!!y.alphaMap,Gt=y.alphaTest>0,Yt=!!y.alphaHash,Ut=!!y.extensions;let oe=ea;y.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(oe=r.toneMapping);const $t={shaderID:W,shaderType:y.type,shaderName:y.name,vertexShader:mt,fragmentShader:Lt,defines:y.defines,customVertexShaderID:Pt,customFragmentShaderID:nt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:_,batching:zt,batchingColor:zt&&q._colorsTexture!==null,instancing:ee,instancingColor:ee&&q.instanceColor!==null,instancingMorph:ee&&q.morphTexture!==null,outputColorSpace:dt===null?r.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Ne.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:ie,matcap:ue,envMap:gt,envMapMode:gt&&Y.mapping,envMapCubeUVHeight:k,aoMap:Ct,lightMap:Nt,bumpMap:Dt,normalMap:It,displacementMap:ae,emissiveMap:jt,normalMapObjectSpace:It&&y.normalMapType===NM,normalMapTangentSpace:It&&y.normalMapType===fp,packedNormalMap:It&&y.normalMapType===fp&&t3(y.normalMap.format),metalnessMap:ce,roughnessMap:de,anisotropy:j,anisotropyMap:St,clearcoat:pe,clearcoatMap:Ot,clearcoatNormalMap:Bt,clearcoatRoughnessMap:_t,dispersion:Se,retroreflection:G,iridescence:T,iridescenceMap:yt,iridescenceThicknessMap:st,sheen:at,sheenColorMap:xt,sheenRoughnessMap:Tt,specularMap:Rt,specularColorMap:Vt,specularIntensityMap:qt,transmission:ct,transmissionMap:re,thicknessMap:$,gradientMap:Ht,opaque:y.transparent===!1&&y.blending===ul&&y.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Gt,alphaHash:Yt,combine:y.combine,mapUv:ie&&b(y.map.channel),aoMapUv:Ct&&b(y.aoMap.channel),lightMapUv:Nt&&b(y.lightMap.channel),bumpMapUv:Dt&&b(y.bumpMap.channel),normalMapUv:It&&b(y.normalMap.channel),displacementMapUv:ae&&b(y.displacementMap.channel),emissiveMapUv:jt&&b(y.emissiveMap.channel),metalnessMapUv:ce&&b(y.metalnessMap.channel),roughnessMapUv:de&&b(y.roughnessMap.channel),anisotropyMapUv:St&&b(y.anisotropyMap.channel),clearcoatMapUv:Ot&&b(y.clearcoatMap.channel),clearcoatNormalMapUv:Bt&&b(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&b(y.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&b(y.iridescenceMap.channel),iridescenceThicknessMapUv:st&&b(y.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&b(y.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&b(y.sheenRoughnessMap.channel),specularMapUv:Rt&&b(y.specularMap.channel),specularColorMapUv:Vt&&b(y.specularColorMap.channel),specularIntensityMapUv:qt&&b(y.specularIntensityMap.channel),transmissionMapUv:re&&b(y.transmissionMap.channel),thicknessMapUv:$&&b(y.thicknessMap.channel),alphaMapUv:Mt&&b(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(It||j),vertexNormals:!!X.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!X.attributes.uv&&(ie||Mt),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||X.attributes.normal===void 0&&It===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:wt,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:X.attributes.position!==void 0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:it,numSunLights:D.sun.length,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numSunLightShadows:D.sunShadowMap.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:oe,decodeVideoTexture:ie&&y.map.isVideoTexture===!0&&Ne.getTransfer(y.map.colorSpace)===Xe,decodeVideoTextureEmissive:jt&&y.emissiveMap.isVideoTexture===!0&&Ne.getTransfer(y.emissiveMap.colorSpace)===Xe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===_i,flipSided:y.side===ri,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ut&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&y.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return $t.vertexUv1s=d.has(1),$t.vertexUv2s=d.has(2),$t.vertexUv3s=d.has(3),d.clear(),$t}function M(y){const D=[];if(y.shaderID?D.push(y.shaderID):(D.push(y.customVertexShaderID),D.push(y.customFragmentShaderID)),y.defines!==void 0)for(const B in y.defines)D.push(B),D.push(y.defines[B]);return y.isRawShaderMaterial===!1&&(S(D,y),z(D,y),D.push(r.outputColorSpace)),D.push(y.customProgramCacheKey),D.join()}function S(y,D){y.push(D.precision),y.push(D.outputColorSpace),y.push(D.envMapMode),y.push(D.envMapCubeUVHeight),y.push(D.mapUv),y.push(D.alphaMapUv),y.push(D.lightMapUv),y.push(D.aoMapUv),y.push(D.bumpMapUv),y.push(D.normalMapUv),y.push(D.displacementMapUv),y.push(D.emissiveMapUv),y.push(D.metalnessMapUv),y.push(D.roughnessMapUv),y.push(D.anisotropyMapUv),y.push(D.clearcoatMapUv),y.push(D.clearcoatNormalMapUv),y.push(D.clearcoatRoughnessMapUv),y.push(D.iridescenceMapUv),y.push(D.iridescenceThicknessMapUv),y.push(D.sheenColorMapUv),y.push(D.sheenRoughnessMapUv),y.push(D.specularMapUv),y.push(D.specularColorMapUv),y.push(D.specularIntensityMapUv),y.push(D.transmissionMapUv),y.push(D.thicknessMapUv),y.push(D.combine),y.push(D.fogExp2),y.push(D.sizeAttenuation),y.push(D.morphTargetsCount),y.push(D.morphAttributeCount),y.push(D.numSunLights),y.push(D.numDirLights),y.push(D.numPointLights),y.push(D.numSpotLights),y.push(D.numSpotLightMaps),y.push(D.numHemiLights),y.push(D.numRectAreaLights),y.push(D.numSunLightShadows),y.push(D.numDirLightShadows),y.push(D.numPointLightShadows),y.push(D.numSpotLightShadows),y.push(D.numSpotLightShadowsWithMaps),y.push(D.numLightProbes),y.push(D.shadowMapType),y.push(D.toneMapping),y.push(D.numClippingPlanes),y.push(D.numClipIntersection),y.push(D.depthPacking)}function z(y,D){u.disableAll(),D.instancing&&u.enable(0),D.instancingColor&&u.enable(1),D.instancingMorph&&u.enable(2),D.matcap&&u.enable(3),D.envMap&&u.enable(4),D.normalMapObjectSpace&&u.enable(5),D.normalMapTangentSpace&&u.enable(6),D.clearcoat&&u.enable(7),D.iridescence&&u.enable(8),D.alphaTest&&u.enable(9),D.vertexColors&&u.enable(10),D.vertexAlphas&&u.enable(11),D.vertexUv1s&&u.enable(12),D.vertexUv2s&&u.enable(13),D.vertexUv3s&&u.enable(14),D.vertexTangents&&u.enable(15),D.anisotropy&&u.enable(16),D.alphaHash&&u.enable(17),D.batching&&u.enable(18),D.dispersion&&u.enable(19),D.retroreflection&&u.enable(24),D.batchingColor&&u.enable(20),D.gradientMap&&u.enable(21),D.packedNormalMap&&u.enable(22),D.vertexNormals&&u.enable(23),y.push(u.mask),u.disableAll(),D.fog&&u.enable(0),D.useFog&&u.enable(1),D.flatShading&&u.enable(2),D.logarithmicDepthBuffer&&u.enable(3),D.reversedDepthBuffer&&u.enable(4),D.skinning&&u.enable(5),D.morphTargets&&u.enable(6),D.morphNormals&&u.enable(7),D.morphColors&&u.enable(8),D.premultipliedAlpha&&u.enable(9),D.shadowMapEnabled&&u.enable(10),D.doubleSided&&u.enable(11),D.flipSided&&u.enable(12),D.useDepthPacking&&u.enable(13),D.dithering&&u.enable(14),D.transmission&&u.enable(15),D.sheen&&u.enable(16),D.opaque&&u.enable(17),D.pointsUvs&&u.enable(18),D.decodeVideoTexture&&u.enable(19),D.decodeVideoTextureEmissive&&u.enable(20),D.alphaToCoverage&&u.enable(21),D.numLightProbeGrids>0&&u.enable(22),D.hasPositionAttribute&&u.enable(23),y.push(u.mask)}function H(y){const D=x[y.type];let B;if(D){const V=$i[D];B=Ox.clone(V.uniforms)}else B=y.uniforms;return B}function A(y,D){let B=g.get(D);return B!==void 0?++B.usedTimes:(B=new J2(r,D,y,o),h.push(B),g.set(D,B)),B}function O(y){if(--y.usedTimes===0){const D=h.indexOf(y);h[D]=h[h.length-1],h.pop(),g.delete(y.cacheKey),y.destroy()}}function w(y){p.remove(y)}function L(){p.dispose()}return{getParameters:U,getProgramCacheKey:M,getUniforms:H,acquireProgram:A,releaseProgram:O,releaseShaderCache:w,programs:h,dispose:L}}function n3(){let r=new WeakMap;function t(u){return r.has(u)}function n(u){let p=r.get(u);return p===void 0&&(p={},r.set(u,p)),p}function a(u){r.delete(u)}function o(u,p,d){r.get(u)[p]=d}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:c}}function i3(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function X_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function W_(){const r=[];let t=0;const n=[],a=[],o=[];function c(){t=0,n.length=0,a.length=0,o.length=0}function u(_){let x=0;return _.isInstancedMesh&&(x+=2),_.isSkinnedMesh&&(x+=1),x}function p(_,x,b,U,M,S){let z=r[t];return z===void 0?(z={id:_.id,object:_,geometry:x,material:b,materialVariant:u(_),groupOrder:U,renderOrder:_.renderOrder,z:M,group:S},r[t]=z):(z.id=_.id,z.object=_,z.geometry=x,z.material=b,z.materialVariant=u(_),z.groupOrder=U,z.renderOrder=_.renderOrder,z.z=M,z.group=S),t++,z}function d(_,x,b,U,M,S,z){z.reversedDepth===!0&&(M=-M);const H=p(_,x,b,U,M,S);b.transmission>0?a.push(H):b.transparent===!0?o.push(H):n.push(H)}function h(_,x,b,U,M,S){const z=p(_,x,b,U,M,S);b.transmission>0?a.unshift(z):b.transparent===!0?o.unshift(z):n.unshift(z)}function g(_,x){n.length>1&&n.sort(_||i3),a.length>1&&a.sort(x||X_),o.length>1&&o.sort(x||X_)}function v(){for(let _=t,x=r.length;_<x;_++){const b=r[_];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:d,unshift:h,finish:v,sort:g}}function a3(){let r=new WeakMap;function t(a,o){const c=r.get(a);let u;return c===void 0?(u=new W_,r.set(a,[u])):o>=c.length?(u=new W_,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:t,dispose:n}}function s3(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new J,color:new xe};break;case"SpotLight":n={position:new J,direction:new J,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new xe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":n={color:new xe,position:new J,halfWidth:new J,halfHeight:new J};break}return r[t.id]=n,n}}}function r3(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let o3=0;function l3(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function c3(r){const t=new s3,n=r3(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)a.probe.push(new J);const o=new J,c=new Ge,u=new Ge;function p(h){let g=0,v=0,_=0;for(let q=0;q<9;q++)a.probe[q].set(0,0,0);let x=0,b=0,U=0,M=0,S=0,z=0,H=0,A=0,O=0,w=0,L=0,y=0,D=0,B=0;h.sort(l3);for(let q=0,Z=h.length;q<Z;q++){const I=h[q],X=I.color,P=I.intensity,F=I.distance;let Y=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Xs?Y=I.shadow.map.texture:Y=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)g+=X.r*P,v+=X.g*P,_+=X.b*P;else if(I.isLightProbe){for(let k=0;k<9;k++)a.probe[k].addScaledVector(I.sh.coefficients[k],P);B++}else if(I.isSunLight){const k=t.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const W=I.shadow,R=n.get(I);R.shadowIntensity=W.intensity,R.shadowBias=W.bias,R.shadowNormalBias=W.normalBias,R.shadowRadius=W.radius,R.shadowMapSize.copy(W.mapSize).multiply(W.getFrameExtents()),a.sunShadow[b]=R,a.sunShadowMap[b]=Y;const K=W.getViewportCount();for(let it=0;it<K;it++)a.sunShadowMatrix[U+it]=W.getMatrix(it),a.sunShadowCascade[U+it]=W._cascadeData[it];U+=K,b++}a.sun[x]=k,x++}else if(I.isDirectionalLight){const k=t.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const W=I.shadow,R=n.get(I);R.shadowIntensity=W.intensity,R.shadowBias=W.bias,R.shadowNormalBias=W.normalBias,R.shadowRadius=W.radius,R.shadowMapSize=W.mapSize,a.directionalShadow[M]=R,a.directionalShadowMap[M]=Y,a.directionalShadowMatrix[M]=I.shadow.matrix,O++}a.directional[M]=k,M++}else if(I.isSpotLight){const k=t.get(I);k.position.setFromMatrixPosition(I.matrixWorld),k.color.copy(X).multiplyScalar(P),k.distance=F,k.coneCos=Math.cos(I.angle),k.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),k.decay=I.decay,a.spot[z]=k;const W=I.shadow;if(I.map&&(a.spotLightMap[y]=I.map,y++,W.updateMatrices(I),I.castShadow&&D++),a.spotLightMatrix[z]=W.matrix,I.castShadow){const R=n.get(I);R.shadowIntensity=W.intensity,R.shadowBias=W.bias,R.shadowNormalBias=W.normalBias,R.shadowRadius=W.radius,R.shadowMapSize=W.mapSize,a.spotShadow[z]=R,a.spotShadowMap[z]=Y,L++}z++}else if(I.isRectAreaLight){const k=t.get(I);k.color.copy(X).multiplyScalar(P),k.halfWidth.set(I.width*.5,0,0),k.halfHeight.set(0,I.height*.5,0),a.rectArea[H]=k,H++}else if(I.isPointLight){const k=t.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),k.distance=I.distance,k.decay=I.decay,I.castShadow){const W=I.shadow,R=n.get(I);R.shadowIntensity=W.intensity,R.shadowBias=W.bias,R.shadowNormalBias=W.normalBias,R.shadowRadius=W.radius,R.shadowMapSize=W.mapSize,R.shadowCameraNear=W.camera.near,R.shadowCameraFar=W.camera.far,a.pointShadow[S]=R,a.pointShadowMap[S]=Y,a.pointShadowMatrix[S]=I.shadow.matrix,w++}a.point[S]=k,S++}else if(I.isHemisphereLight){const k=t.get(I);k.skyColor.copy(I.color).multiplyScalar(P),k.groundColor.copy(I.groundColor).multiplyScalar(P),a.hemi[A]=k,A++}}H>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Wt.LTC_FLOAT_1,a.rectAreaLTC2=Wt.LTC_FLOAT_2):(a.rectAreaLTC1=Wt.LTC_HALF_1,a.rectAreaLTC2=Wt.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=v,a.ambient[2]=_;const V=a.hash;(V.sunLength!==x||V.directionalLength!==M||V.pointLength!==S||V.spotLength!==z||V.rectAreaLength!==H||V.hemiLength!==A||V.numSunShadows!==b||V.numDirectionalShadows!==O||V.numPointShadows!==w||V.numSpotShadows!==L||V.numSpotMaps!==y||V.numLightProbes!==B)&&(a.sun.length=x,a.directional.length=M,a.spot.length=z,a.rectArea.length=H,a.point.length=S,a.hemi.length=A,a.sunShadow.length=b,a.sunShadowMap.length=b,a.sunShadowMatrix.length=U,a.sunShadowCascade.length=U,a.directionalShadow.length=O,a.directionalShadowMap.length=O,a.directionalShadowMatrix.length=O,a.pointShadow.length=w,a.pointShadowMap.length=w,a.pointShadowMatrix.length=w,a.spotShadow.length=L,a.spotShadowMap.length=L,a.spotLightMatrix.length=L+y-D,a.spotLightMap.length=y,a.numSpotLightShadowsWithMaps=D,a.numLightProbes=B,V.sunLength=x,V.directionalLength=M,V.pointLength=S,V.spotLength=z,V.rectAreaLength=H,V.hemiLength=A,V.numSunShadows=b,V.numDirectionalShadows=O,V.numPointShadows=w,V.numSpotShadows=L,V.numSpotMaps=y,V.numLightProbes=B,a.version=o3++)}function d(h,g){let v=0,_=0,x=0,b=0,U=0,M=0;const S=g.matrixWorldInverse;for(let z=0,H=h.length;z<H;z++){const A=h[z];if(A.isSunLight){const O=a.sun[v];O.direction.setFromMatrixPosition(A.matrixWorld),O.direction.transformDirection(S),v++}else if(A.isDirectionalLight){const O=a.directional[_];O.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),O.direction.sub(o),O.direction.transformDirection(S),_++}else if(A.isSpotLight){const O=a.spot[b];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),O.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),O.direction.sub(o),O.direction.transformDirection(S),b++}else if(A.isRectAreaLight){const O=a.rectArea[U];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),u.identity(),c.copy(A.matrixWorld),c.premultiply(S),u.extractRotation(c),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),O.halfWidth.applyMatrix4(u),O.halfHeight.applyMatrix4(u),U++}else if(A.isPointLight){const O=a.point[x];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const O=a.hemi[M];O.direction.setFromMatrixPosition(A.matrixWorld),O.direction.transformDirection(S),M++}}}return{setup:p,setupView:d,state:a}}function q_(r){const t=new c3(r),n=[],a=[],o=[];function c(_){v.camera=_,n.length=0,a.length=0,o.length=0}function u(_){n.push(_)}function p(_){a.push(_)}function d(_){o.push(_)}function h(){t.setup(n)}function g(_){t.setupView(n,_)}const v={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:h,setupLightsView:g,pushLight:u,pushShadow:p,pushLightProbeGrid:d}}function u3(r){let t=new WeakMap;function n(o,c=0){const u=t.get(o);let p;return u===void 0?(p=new q_(r),t.set(o,[p])):c>=u.length?(p=new q_(r),u.push(p)):p=u[c],p}function a(){t=new WeakMap}return{get:n,dispose:a}}const f3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h3=`uniform sampler2D shadow_pass;
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
}`,d3=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],p3=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],Y_=new Ge,al=new J,Ad=new J;function m3(r,t,n){let a=new Np;const o=new Ft,c=new Ft,u=new en,p=new gE,d=new vE,h={},g=n.maxTextureSize,v={[Vs]:ri,[ri]:Vs,[_i]:_i},_=new Ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:f3,fragmentShader:h3}),x=_.clone();x.defines.HORIZONTAL_PASS=1;const b=new wn;b.setAttribute("position",new ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const U=new bn(b,_),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cl;let S=this.type;this.render=function(w,L,y){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||w.length===0)return;this.type===uM&&(he("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=cl);const D=r.getRenderTarget(),B=r.getActiveCubeFace(),V=r.getActiveMipmapLevel(),q=r.state;q.setBlending(Oa),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const Z=S!==this.type;Z&&L.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(X=>X.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,X=w.length;I<X;I++){const P=w[I],F=P.shadow;if(F===void 0){he("WebGLShadowMap:",P,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;o.copy(F.mapSize);const Y=F.getFrameExtents();o.multiply(Y),c.copy(F.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(c.x=Math.floor(g/Y.x),o.x=c.x*Y.x,F.mapSize.x=c.x),o.y>g&&(c.y=Math.floor(g/Y.y),o.y=c.y*Y.y,F.mapSize.y=c.y));const k=r.state.buffers.depth.getReversed();if(F.camera._reversedDepth=k,F.map===null||Z===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===sl){if(P.isPointLight){he("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Jn(o.x,o.y,{format:Xs,type:Dn,minFilter:rn,magFilter:rn,generateMipmaps:!1}),F.map.texture.name=P.name+".shadowMap",F.map.depthTexture=new jr(o.x,o.y,Si),F.map.depthTexture.name=P.name+".shadowMapDepth",F.map.depthTexture.format=na,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Fn,F.map.depthTexture.magFilter=Fn}else P.isPointLight?(F.map=new Gp(o.x),F.map.depthTexture=new O1(o.x,Xi)):(F.map=new Jn(o.x,o.y),F.map.depthTexture=new jr(o.x,o.y,Xi)),F.map.depthTexture.name=P.name+".shadowMap",F.map.depthTexture.format=na,this.type===cl?(F.map.depthTexture.compareFunction=k?Rp:Uu,F.map.depthTexture.minFilter=rn,F.map.depthTexture.magFilter=rn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Fn,F.map.depthTexture.magFilter=Fn);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==o.x||F.map.height!==o.y)&&F.map.setSize(o.x,o.y);const W=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();P.isPointLight!==!0&&F.updateMatrices(P,y);for(let R=0;R<W;R++){const K=F.getCamera(R);if(P.isPointLight){const it=F.camera,mt=F.matrix,Lt=P.distance||it.far;Lt!==it.far&&(it.far=Lt,it.updateProjectionMatrix()),al.setFromMatrixPosition(P.matrixWorld),it.position.copy(al),Ad.copy(it.position),Ad.add(d3[R]),it.up.copy(p3[R]),it.lookAt(Ad),it.updateMatrixWorld(),mt.makeTranslation(-al.x,-al.y,-al.z),Y_.multiplyMatrices(it.projectionMatrix,it.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Y_,it.coordinateSystem,it.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)r.setRenderTarget(F.map,R),r.clear();else{R===0&&(r.setRenderTarget(F.map),r.clear());const it=F.getViewport(R);u.set(c.x*it.x,c.y*it.y,c.x*it.z,c.y*it.w),q.viewport(u)}a=F.getFrustum(R),A(L,y,K,P,this.type)}F.isPointLightShadow!==!0&&this.type===sl&&z(F,y),F.needsUpdate=!1}S=this.type,M.needsUpdate=!1,r.setRenderTarget(D,B,V)};function z(w,L){const y=t.update(U);_.defines.VSM_SAMPLES!==w.blurSamples&&(_.defines.VSM_SAMPLES=w.blurSamples,x.defines.VSM_SAMPLES=w.blurSamples,_.needsUpdate=!0,x.needsUpdate=!0),w.mapPass===null?w.mapPass=new Jn(o.x,o.y,{format:Xs,type:Dn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),_.uniforms.shadow_pass.value=w.map.depthTexture,_.uniforms.resolution.value.set(w.map.width,w.map.height),_.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(L,null,y,_,U,null),x.uniforms.shadow_pass.value=w.mapPass.texture,x.uniforms.resolution.value.set(w.map.width,w.map.height),x.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(L,null,y,x,U,null)}function H(w,L,y,D){let B=null;const V=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(V!==void 0)B=V;else if(B=y.isPointLight===!0?d:p,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const q=B.uuid,Z=L.uuid;let I=h[q];I===void 0&&(I={},h[q]=I);let X=I[Z];X===void 0&&(X=B.clone(),I[Z]=X,L.addEventListener("dispose",O)),B=X}if(B.visible=L.visible,B.wireframe=L.wireframe,D===sl?B.side=L.shadowSide!==null?L.shadowSide:L.side:B.side=L.shadowSide!==null?L.shadowSide:v[L.side],B.alphaMap=L.alphaMap,B.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,B.map=L.map,B.clipShadows=L.clipShadows,B.clippingPlanes=L.clippingPlanes,B.clipIntersection=L.clipIntersection,B.displacementMap=L.displacementMap,B.displacementScale=L.displacementScale,B.displacementBias=L.displacementBias,B.wireframeLinewidth=L.wireframeLinewidth,B.linewidth=L.linewidth,y.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const q=r.properties.get(B);q.light=y}return B}function A(w,L,y,D,B){if(w.visible===!1)return;if(w.layers.test(L.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&B===sl)&&(!w.frustumCulled||w.intersectsFrustum(a))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const Z=t.update(w),I=w.material;if(Array.isArray(I)){const X=Z.groups;for(let P=0,F=X.length;P<F;P++){const Y=X[P],k=I[Y.materialIndex];if(k&&k.visible){const W=H(w,k,D,B);w.onBeforeShadow(r,w,L,y,Z,W,Y),r.renderBufferDirect(y,null,Z,W,w,Y),w.onAfterShadow(r,w,L,y,Z,W,Y)}}}else if(I.visible){const X=H(w,I,D,B);w.onBeforeShadow(r,w,L,y,Z,X,null),r.renderBufferDirect(y,null,Z,X,w,null),w.onAfterShadow(r,w,L,y,Z,X,null)}}const q=w.children;for(let Z=0,I=q.length;Z<I;Z++)A(q[Z],L,y,D,B)}function O(w){w.target.removeEventListener("dispose",O);for(const y in h){const D=h[y],B=w.target.uuid;B in D&&(D[B].dispose(),delete D[B])}}}function g3(r,t){function n(){let $=!1;const Ht=new en;let Mt=null;const Gt=new en(0,0,0,0);return{setMask:function(Yt){Mt!==Yt&&!$&&(r.colorMask(Yt,Yt,Yt,Yt),Mt=Yt)},setLocked:function(Yt){$=Yt},setClear:function(Yt,Ut,oe,$t,We){We===!0&&(Yt*=$t,Ut*=$t,oe*=$t),Ht.set(Yt,Ut,oe,$t),Gt.equals(Ht)===!1&&(r.clearColor(Yt,Ut,oe,$t),Gt.copy(Ht))},reset:function(){$=!1,Mt=null,Gt.set(-1,0,0,0)}}}function a(){let $=!1,Ht=!1,Mt=null,Gt=null,Yt=null;return{setReversed:function(Ut){if(Ht!==Ut){const oe=t.get("EXT_clip_control");Ut?oe.clipControlEXT(oe.LOWER_LEFT_EXT,oe.ZERO_TO_ONE_EXT):oe.clipControlEXT(oe.LOWER_LEFT_EXT,oe.NEGATIVE_ONE_TO_ONE_EXT),Ht=Ut;const $t=Yt;Yt=null,this.setClear($t)}},getReversed:function(){return Ht},setTest:function(Ut){Ut?dt(r.DEPTH_TEST):wt(r.DEPTH_TEST)},setMask:function(Ut){Mt!==Ut&&!$&&(r.depthMask(Ut),Mt=Ut)},setFunc:function(Ut){if(Ht&&(Ut=WM[Ut]),Gt!==Ut){switch(Ut){case wd:r.depthFunc(r.NEVER);break;case Rd:r.depthFunc(r.ALWAYS);break;case Cd:r.depthFunc(r.LESS);break;case ml:r.depthFunc(r.LEQUAL);break;case Dd:r.depthFunc(r.EQUAL);break;case Ud:r.depthFunc(r.GEQUAL);break;case Ld:r.depthFunc(r.GREATER);break;case Nd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Gt=Ut}},setLocked:function(Ut){$=Ut},setClear:function(Ut){Yt!==Ut&&(Yt=Ut,Ht&&(Ut=1-Ut),r.clearDepth(Ut))},reset:function(){$=!1,Mt=null,Gt=null,Yt=null,Ht=!1}}}function o(){let $=!1,Ht=null,Mt=null,Gt=null,Yt=null,Ut=null,oe=null,$t=null,We=null;return{setTest:function(Pe){$||(Pe?dt(r.STENCIL_TEST):wt(r.STENCIL_TEST))},setMask:function(Pe){Ht!==Pe&&!$&&(r.stencilMask(Pe),Ht=Pe)},setFunc:function(Pe,Qn,oi){(Mt!==Pe||Gt!==Qn||Yt!==oi)&&(r.stencilFunc(Pe,Qn,oi),Mt=Pe,Gt=Qn,Yt=oi)},setOp:function(Pe,Qn,oi){(Ut!==Pe||oe!==Qn||$t!==oi)&&(r.stencilOp(Pe,Qn,oi),Ut=Pe,oe=Qn,$t=oi)},setLocked:function(Pe){$=Pe},setClear:function(Pe){We!==Pe&&(r.clearStencil(Pe),We=Pe)},reset:function(){$=!1,Ht=null,Mt=null,Gt=null,Yt=null,Ut=null,oe=null,$t=null,We=null}}}const c=new n,u=new a,p=new o,d=new WeakMap,h=new WeakMap;let g={},v={},_={},x=new WeakMap,b=[],U=null,M=!1,S=null,z=null,H=null,A=null,O=null,w=null,L=null,y=new xe(0,0,0),D=0,B=!1,V=null,q=null,Z=null,I=null,X=null;const P=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,Y=0;const k=r.getParameter(r.VERSION);k.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(k)[1]),F=Y>=1):k.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),F=Y>=2);let W=null,R={};const K=r.getParameter(r.SCISSOR_BOX),it=r.getParameter(r.VIEWPORT),mt=new en().fromArray(K),Lt=new en().fromArray(it);function Pt($,Ht,Mt,Gt){const Yt=new Uint8Array(4),Ut=r.createTexture();r.bindTexture($,Ut),r.texParameteri($,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri($,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let oe=0;oe<Mt;oe++)$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?r.texImage3D(Ht,0,r.RGBA,1,1,Gt,0,r.RGBA,r.UNSIGNED_BYTE,Yt):r.texImage2D(Ht+oe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Yt);return Ut}const nt={};nt[r.TEXTURE_2D]=Pt(r.TEXTURE_2D,r.TEXTURE_2D,1),nt[r.TEXTURE_CUBE_MAP]=Pt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[r.TEXTURE_2D_ARRAY]=Pt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),nt[r.TEXTURE_3D]=Pt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),p.setClear(0),dt(r.DEPTH_TEST),u.setFunc(ml),Dt(!1),It(Fv),dt(r.CULL_FACE),Ct(Oa);function dt($){g[$]!==!0&&(r.enable($),g[$]=!0)}function wt($){g[$]!==!1&&(r.disable($),g[$]=!1)}function ee($,Ht){return _[$]!==Ht?(r.bindFramebuffer($,Ht),_[$]=Ht,$===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Ht),$===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Ht),!0):!1}function zt($,Ht){let Mt=b,Gt=!1;if($){Mt=x.get(Ht),Mt===void 0&&(Mt=[],x.set(Ht,Mt));const Yt=$.textures;if(Mt.length!==Yt.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let Ut=0,oe=Yt.length;Ut<oe;Ut++)Mt[Ut]=r.COLOR_ATTACHMENT0+Ut;Mt.length=Yt.length,Gt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Gt=!0);Gt&&r.drawBuffers(Mt)}function ie($){return U!==$?(r.useProgram($),U=$,!0):!1}const ue={[Vr]:r.FUNC_ADD,[hM]:r.FUNC_SUBTRACT,[dM]:r.FUNC_REVERSE_SUBTRACT};ue[pM]=r.MIN,ue[mM]=r.MAX;const gt={[gM]:r.ZERO,[vM]:r.ONE,[_M]:r.SRC_COLOR,[j_]:r.SRC_ALPHA,[bM]:r.SRC_ALPHA_SATURATE,[MM]:r.DST_COLOR,[SM]:r.DST_ALPHA,[xM]:r.ONE_MINUS_SRC_COLOR,[$_]:r.ONE_MINUS_SRC_ALPHA,[EM]:r.ONE_MINUS_DST_COLOR,[yM]:r.ONE_MINUS_DST_ALPHA,[TM]:r.CONSTANT_COLOR,[AM]:r.ONE_MINUS_CONSTANT_COLOR,[wM]:r.CONSTANT_ALPHA,[RM]:r.ONE_MINUS_CONSTANT_ALPHA};function Ct($,Ht,Mt,Gt,Yt,Ut,oe,$t,We,Pe){if($===Oa){M===!0&&(wt(r.BLEND),M=!1);return}if(M===!1&&(dt(r.BLEND),M=!0),$!==fM){if($!==S||Pe!==B){if((z!==Vr||O!==Vr)&&(r.blendEquation(r.FUNC_ADD),z=Vr,O=Vr),Pe)switch($){case ul:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yu:r.blendFunc(r.ONE,r.ONE);break;case zv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Bv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Le("WebGLState: Invalid blending: ",$);break}else switch($){case ul:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case zv:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bv:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",$);break}H=null,A=null,w=null,L=null,y.set(0,0,0),D=0,S=$,B=Pe}return}Yt=Yt||Ht,Ut=Ut||Mt,oe=oe||Gt,(Ht!==z||Yt!==O)&&(r.blendEquationSeparate(ue[Ht],ue[Yt]),z=Ht,O=Yt),(Mt!==H||Gt!==A||Ut!==w||oe!==L)&&(r.blendFuncSeparate(gt[Mt],gt[Gt],gt[Ut],gt[oe]),H=Mt,A=Gt,w=Ut,L=oe),($t.equals(y)===!1||We!==D)&&(r.blendColor($t.r,$t.g,$t.b,We),y.copy($t),D=We),S=$,B=!1}function Nt($,Ht){$.side===_i?wt(r.CULL_FACE):dt(r.CULL_FACE);let Mt=$.side===ri;Ht&&(Mt=!Mt),Dt(Mt),$.blending===ul&&$.transparent===!1?Ct(Oa):Ct($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),u.setFunc($.depthFunc),u.setTest($.depthTest),u.setMask($.depthWrite),c.setMask($.colorWrite);const Gt=$.stencilWrite;p.setTest(Gt),Gt&&(p.setMask($.stencilWriteMask),p.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),p.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),jt($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?dt(r.SAMPLE_ALPHA_TO_COVERAGE):wt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Dt($){V!==$&&($?r.frontFace(r.CW):r.frontFace(r.CCW),V=$)}function It($){$!==lM?(dt(r.CULL_FACE),$!==q&&($===Fv?r.cullFace(r.BACK):$===cM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):wt(r.CULL_FACE),q=$}function ae($){$!==Z&&(F&&r.lineWidth($),Z=$)}function jt($,Ht,Mt){$?(dt(r.POLYGON_OFFSET_FILL),(I!==Ht||X!==Mt)&&(I=Ht,X=Mt,u.getReversed()&&(Ht=-Ht),r.polygonOffset(Ht,Mt))):wt(r.POLYGON_OFFSET_FILL)}function ce($){$?dt(r.SCISSOR_TEST):wt(r.SCISSOR_TEST)}function de($){$===void 0&&($=r.TEXTURE0+P-1),W!==$&&(r.activeTexture($),W=$)}function j($,Ht,Mt){Mt===void 0&&(W===null?Mt=r.TEXTURE0+P-1:Mt=W);let Gt=R[Mt];Gt===void 0&&(Gt={type:void 0,texture:void 0},R[Mt]=Gt),(Gt.type!==$||Gt.texture!==Ht)&&(W!==Mt&&(r.activeTexture(Mt),W=Mt),r.bindTexture($,Ht||nt[$]),Gt.type=$,Gt.texture=Ht)}function pe(){const $=R[W];$!==void 0&&$.type!==void 0&&(r.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function Se(){try{r.compressedTexImage2D(...arguments)}catch($){Le("WebGLState:",$)}}function G(){try{r.compressedTexImage3D(...arguments)}catch($){Le("WebGLState:",$)}}function T(){try{r.texSubImage2D(...arguments)}catch($){Le("WebGLState:",$)}}function at(){try{r.texSubImage3D(...arguments)}catch($){Le("WebGLState:",$)}}function ct(){try{r.compressedTexSubImage2D(...arguments)}catch($){Le("WebGLState:",$)}}function St(){try{r.compressedTexSubImage3D(...arguments)}catch($){Le("WebGLState:",$)}}function Ot(){try{r.texStorage2D(...arguments)}catch($){Le("WebGLState:",$)}}function Bt(){try{r.texStorage3D(...arguments)}catch($){Le("WebGLState:",$)}}function _t(){try{r.texImage2D(...arguments)}catch($){Le("WebGLState:",$)}}function yt(){try{r.texImage3D(...arguments)}catch($){Le("WebGLState:",$)}}function st($){return v[$]!==void 0?v[$]:r.getParameter($)}function xt($,Ht){v[$]!==Ht&&(r.pixelStorei($,Ht),v[$]=Ht)}function Tt($){mt.equals($)===!1&&(r.scissor($.x,$.y,$.z,$.w),mt.copy($))}function Rt($){Lt.equals($)===!1&&(r.viewport($.x,$.y,$.z,$.w),Lt.copy($))}function Vt($,Ht){let Mt=h.get(Ht);Mt===void 0&&(Mt=new WeakMap,h.set(Ht,Mt));let Gt=Mt.get($);Gt===void 0&&(Gt=r.getUniformBlockIndex(Ht,$.name),Mt.set($,Gt))}function qt($,Ht){const Gt=h.get(Ht).get($);d.get(Ht)!==Gt&&(r.uniformBlockBinding(Ht,Gt,$.__bindingPointIndex),d.set(Ht,Gt))}function re(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),g={},v={},W=null,R={},_={},x=new WeakMap,b=[],U=null,M=!1,S=null,z=null,H=null,A=null,O=null,w=null,L=null,y=new xe(0,0,0),D=0,B=!1,V=null,q=null,Z=null,I=null,X=null,mt.set(0,0,r.canvas.width,r.canvas.height),Lt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),p.reset()}return{buffers:{color:c,depth:u,stencil:p},enable:dt,disable:wt,bindFramebuffer:ee,drawBuffers:zt,useProgram:ie,setBlending:Ct,setMaterial:Nt,setFlipSided:Dt,setCullFace:It,setLineWidth:ae,setPolygonOffset:jt,setScissorTest:ce,activeTexture:de,bindTexture:j,unbindTexture:pe,compressedTexImage2D:Se,compressedTexImage3D:G,texImage2D:_t,texImage3D:yt,pixelStorei:xt,getParameter:st,updateUBOMapping:Vt,uniformBlockBinding:qt,texStorage2D:Ot,texStorage3D:Bt,texSubImage2D:T,texSubImage3D:at,compressedTexSubImage2D:ct,compressedTexSubImage3D:St,scissor:Tt,viewport:Rt,reset:re}}function v3(r,t,n,a,o,c,u){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Ft,g=new WeakMap,v=new Set;let _;const x=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function U(G,T){return b?new OffscreenCanvas(G,T):Tu("canvas")}function M(G,T,at){let ct=1;const St=Se(G);if((St.width>at||St.height>at)&&(ct=at/Math.max(St.width,St.height)),ct<1)if(typeof HTMLImageElement<"u"&&G instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&G instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&G instanceof ImageBitmap||typeof VideoFrame<"u"&&G instanceof VideoFrame){const Ot=Math.floor(ct*St.width),Bt=Math.floor(ct*St.height);_===void 0&&(_=U(Ot,Bt));const _t=T?U(Ot,Bt):_;return _t.width=Ot,_t.height=Bt,_t.getContext("2d").drawImage(G,0,0,Ot,Bt),he("WebGLRenderer: Texture has been resized from ("+St.width+"x"+St.height+") to ("+Ot+"x"+Bt+")."),_t}else return"data"in G&&he("WebGLRenderer: Image in DataTexture is too big ("+St.width+"x"+St.height+")."),G;return G}function S(G){return G.generateMipmaps}function z(G){r.generateMipmap(G)}function H(G){return G.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:G.isWebGL3DRenderTarget?r.TEXTURE_3D:G.isWebGLArrayRenderTarget||G.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(G,T,at,ct,St,Ot=!1){if(G!==null){if(r[G]!==void 0)return r[G];he("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+G+"'")}let Bt;ct&&(Bt=t.get("EXT_texture_norm16"),Bt||he("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let _t=T;if(T===r.RED&&(at===r.FLOAT&&(_t=r.R32F),at===r.HALF_FLOAT&&(_t=r.R16F),at===r.UNSIGNED_BYTE&&(_t=r.R8),at===r.UNSIGNED_SHORT&&Bt&&(_t=Bt.R16_EXT),at===r.SHORT&&Bt&&(_t=Bt.R16_SNORM_EXT)),T===r.RED_INTEGER&&(at===r.UNSIGNED_BYTE&&(_t=r.R8UI),at===r.UNSIGNED_SHORT&&(_t=r.R16UI),at===r.UNSIGNED_INT&&(_t=r.R32UI),at===r.BYTE&&(_t=r.R8I),at===r.SHORT&&(_t=r.R16I),at===r.INT&&(_t=r.R32I)),T===r.RG&&(at===r.FLOAT&&(_t=r.RG32F),at===r.HALF_FLOAT&&(_t=r.RG16F),at===r.UNSIGNED_BYTE&&(_t=r.RG8),at===r.UNSIGNED_SHORT&&Bt&&(_t=Bt.RG16_EXT),at===r.SHORT&&Bt&&(_t=Bt.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(at===r.UNSIGNED_BYTE&&(_t=r.RG8UI),at===r.UNSIGNED_SHORT&&(_t=r.RG16UI),at===r.UNSIGNED_INT&&(_t=r.RG32UI),at===r.BYTE&&(_t=r.RG8I),at===r.SHORT&&(_t=r.RG16I),at===r.INT&&(_t=r.RG32I)),T===r.RGB_INTEGER&&(at===r.UNSIGNED_BYTE&&(_t=r.RGB8UI),at===r.UNSIGNED_SHORT&&(_t=r.RGB16UI),at===r.UNSIGNED_INT&&(_t=r.RGB32UI),at===r.BYTE&&(_t=r.RGB8I),at===r.SHORT&&(_t=r.RGB16I),at===r.INT&&(_t=r.RGB32I)),T===r.RGBA_INTEGER&&(at===r.UNSIGNED_BYTE&&(_t=r.RGBA8UI),at===r.UNSIGNED_SHORT&&(_t=r.RGBA16UI),at===r.UNSIGNED_INT&&(_t=r.RGBA32UI),at===r.BYTE&&(_t=r.RGBA8I),at===r.SHORT&&(_t=r.RGBA16I),at===r.INT&&(_t=r.RGBA32I)),T===r.RGB&&(at===r.UNSIGNED_SHORT&&Bt&&(_t=Bt.RGB16_EXT),at===r.SHORT&&Bt&&(_t=Bt.RGB16_SNORM_EXT),at===r.UNSIGNED_INT_5_9_9_9_REV&&(_t=r.RGB9_E5),at===r.UNSIGNED_INT_10F_11F_11F_REV&&(_t=r.R11F_G11F_B10F)),T===r.RGBA){const yt=Ot?bu:Ne.getTransfer(St);at===r.FLOAT&&(_t=r.RGBA32F),at===r.HALF_FLOAT&&(_t=r.RGBA16F),at===r.UNSIGNED_BYTE&&(_t=yt===Xe?r.SRGB8_ALPHA8:r.RGBA8),at===r.UNSIGNED_SHORT&&Bt&&(_t=Bt.RGBA16_EXT),at===r.SHORT&&Bt&&(_t=Bt.RGBA16_SNORM_EXT),at===r.UNSIGNED_SHORT_4_4_4_4&&(_t=r.RGBA4),at===r.UNSIGNED_SHORT_5_5_5_1&&(_t=r.RGB5_A1)}return(_t===r.R16F||_t===r.R32F||_t===r.RG16F||_t===r.RG32F||_t===r.RGBA16F||_t===r.RGBA32F)&&t.get("EXT_color_buffer_float"),_t}function O(G,T){let at;return G?T===null||T===Xi||T===_l?at=r.DEPTH24_STENCIL8:T===Si?at=r.DEPTH32F_STENCIL8:T===vl&&(at=r.DEPTH24_STENCIL8,he("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Xi||T===_l?at=r.DEPTH_COMPONENT24:T===Si?at=r.DEPTH_COMPONENT32F:T===vl&&(at=r.DEPTH_COMPONENT16),at}function w(G,T){return S(G)===!0||G.isFramebufferTexture&&G.minFilter!==Fn&&G.minFilter!==rn?Math.log2(Math.max(T.width,T.height))+1:G.mipmaps!==void 0&&G.mipmaps.length>0?G.mipmaps.length:G.isCompressedTexture&&Array.isArray(G.image)?T.mipmaps.length:1}function L(G){const T=G.target;T.removeEventListener("dispose",L),D(T),T.isVideoTexture&&g.delete(T),T.isHTMLTexture&&v.delete(T)}function y(G){const T=G.target;T.removeEventListener("dispose",y),V(T)}function D(G){const T=a.get(G);if(T.__webglInit===void 0)return;const at=G.source,ct=x.get(at);if(ct){const St=ct[T.__cacheKey];St.usedTimes--,St.usedTimes===0&&B(G),Object.keys(ct).length===0&&x.delete(at)}a.remove(G)}function B(G){const T=a.get(G);r.deleteTexture(T.__webglTexture);const at=G.source,ct=x.get(at);delete ct[T.__cacheKey],u.memory.textures--}function V(G){const T=a.get(G);if(G.depthTexture&&(G.depthTexture.dispose(),a.remove(G.depthTexture)),G.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(T.__webglFramebuffer[ct]))for(let St=0;St<T.__webglFramebuffer[ct].length;St++)r.deleteFramebuffer(T.__webglFramebuffer[ct][St]);else r.deleteFramebuffer(T.__webglFramebuffer[ct]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ct])}else{if(Array.isArray(T.__webglFramebuffer))for(let ct=0;ct<T.__webglFramebuffer.length;ct++)r.deleteFramebuffer(T.__webglFramebuffer[ct]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ct=0;ct<T.__webglColorRenderbuffer.length;ct++)T.__webglColorRenderbuffer[ct]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ct]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const at=G.textures;for(let ct=0,St=at.length;ct<St;ct++){const Ot=a.get(at[ct]);Ot.__webglTexture&&(r.deleteTexture(Ot.__webglTexture),u.memory.textures--),a.remove(at[ct])}a.remove(G)}let q=0;function Z(){q=0}function I(){return q}function X(G){q=G}function P(){const G=q;return G>=o.maxTextures&&he("WebGLTextures: Trying to use "+(G+1)+" texture units while this GPU supports only "+o.maxTextures),q+=1,G}function F(G){const T=[];return T.push(G.wrapS),T.push(G.wrapT),T.push(G.wrapR||0),T.push(G.magFilter),T.push(G.minFilter),T.push(G.anisotropy),T.push(G.internalFormat),T.push(G.format),T.push(G.type),T.push(G.generateMipmaps),T.push(G.premultiplyAlpha),T.push(G.flipY),T.push(G.unpackAlignment),T.push(G.colorSpace),T.join()}function Y(G,T){const at=a.get(G);if(G.isVideoTexture&&j(G),G.isRenderTargetTexture===!1&&G.isExternalTexture!==!0&&G.version>0&&at.__version!==G.version){const ct=G.image;if(ct===null)he("WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)he("WebGLRenderer: Texture marked for update but image is incomplete");else{wt(at,G,T);return}}else G.isExternalTexture&&(at.__webglTexture=G.sourceTexture?G.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,at.__webglTexture,r.TEXTURE0+T)}function k(G,T){const at=a.get(G);if(G.isRenderTargetTexture===!1&&G.version>0&&at.__version!==G.version){wt(at,G,T);return}else G.isExternalTexture&&(at.__webglTexture=G.sourceTexture?G.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,at.__webglTexture,r.TEXTURE0+T)}function W(G,T){const at=a.get(G);if(G.isRenderTargetTexture===!1&&G.version>0&&at.__version!==G.version){wt(at,G,T);return}n.bindTexture(r.TEXTURE_3D,at.__webglTexture,r.TEXTURE0+T)}function R(G,T){const at=a.get(G);if(G.isCubeDepthTexture!==!0&&G.version>0&&at.__version!==G.version){ee(at,G,T);return}n.bindTexture(r.TEXTURE_CUBE_MAP,at.__webglTexture,r.TEXTURE0+T)}const K={[gl]:r.REPEAT,[Vi]:r.CLAMP_TO_EDGE,[Od]:r.MIRRORED_REPEAT},it={[Fn]:r.NEAREST,[UM]:r.NEAREST_MIPMAP_NEAREST,[Gc]:r.NEAREST_MIPMAP_LINEAR,[rn]:r.LINEAR,[Kh]:r.LINEAR_MIPMAP_NEAREST,[Na]:r.LINEAR_MIPMAP_LINEAR},mt={[PM]:r.NEVER,[HM]:r.ALWAYS,[IM]:r.LESS,[Uu]:r.LEQUAL,[FM]:r.EQUAL,[Rp]:r.GEQUAL,[zM]:r.GREATER,[BM]:r.NOTEQUAL};function Lt(G,T){if(T.type===Si&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===rn||T.magFilter===Kh||T.magFilter===Gc||T.magFilter===Na||T.minFilter===rn||T.minFilter===Kh||T.minFilter===Gc||T.minFilter===Na)&&he("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(G,r.TEXTURE_WRAP_S,K[T.wrapS]),r.texParameteri(G,r.TEXTURE_WRAP_T,K[T.wrapT]),(G===r.TEXTURE_3D||G===r.TEXTURE_2D_ARRAY)&&r.texParameteri(G,r.TEXTURE_WRAP_R,K[T.wrapR]),r.texParameteri(G,r.TEXTURE_MAG_FILTER,it[T.magFilter]),r.texParameteri(G,r.TEXTURE_MIN_FILTER,it[T.minFilter]),T.compareFunction&&(r.texParameteri(G,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(G,r.TEXTURE_COMPARE_FUNC,mt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Fn||T.minFilter!==Gc&&T.minFilter!==Na||T.type===Si&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||a.get(T).__currentAnisotropy){const at=t.get("EXT_texture_filter_anisotropic");r.texParameterf(G,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,o.getMaxAnisotropy())),a.get(T).__currentAnisotropy=T.anisotropy}}}function Pt(G,T){let at=!1;G.__webglInit===void 0&&(G.__webglInit=!0,T.addEventListener("dispose",L));const ct=T.source;let St=x.get(ct);St===void 0&&(St={},x.set(ct,St));const Ot=F(T);if(Ot!==G.__cacheKey){St[Ot]===void 0&&(St[Ot]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,at=!0),St[Ot].usedTimes++;const Bt=St[G.__cacheKey];Bt!==void 0&&(St[G.__cacheKey].usedTimes--,Bt.usedTimes===0&&B(T)),G.__cacheKey=Ot,G.__webglTexture=St[Ot].texture}return at}function nt(G,T,at){return Math.floor(Math.floor(G/at)/T)}function dt(G,T,at,ct){const Ot=G.updateRanges;if(Ot.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,at,ct,T.data);else{Ot.sort((xt,Tt)=>xt.start-Tt.start);let Bt=0;for(let xt=1;xt<Ot.length;xt++){const Tt=Ot[Bt],Rt=Ot[xt],Vt=Tt.start+Tt.count,qt=nt(Rt.start,T.width,4),re=nt(Tt.start,T.width,4);Rt.start<=Vt+1&&qt===re&&nt(Rt.start+Rt.count-1,T.width,4)===qt?Tt.count=Math.max(Tt.count,Rt.start+Rt.count-Tt.start):(++Bt,Ot[Bt]=Rt)}Ot.length=Bt+1;const _t=n.getParameter(r.UNPACK_ROW_LENGTH),yt=n.getParameter(r.UNPACK_SKIP_PIXELS),st=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let xt=0,Tt=Ot.length;xt<Tt;xt++){const Rt=Ot[xt],Vt=Math.floor(Rt.start/4),qt=Math.ceil(Rt.count/4),re=Vt%T.width,$=Math.floor(Vt/T.width),Ht=qt,Mt=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,re),n.pixelStorei(r.UNPACK_SKIP_ROWS,$),n.texSubImage2D(r.TEXTURE_2D,0,re,$,Ht,Mt,at,ct,T.data)}G.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,_t),n.pixelStorei(r.UNPACK_SKIP_PIXELS,yt),n.pixelStorei(r.UNPACK_SKIP_ROWS,st)}}function wt(G,T,at){let ct=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ct=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ct=r.TEXTURE_3D);const St=Pt(G,T),Ot=T.source;n.bindTexture(ct,G.__webglTexture,r.TEXTURE0+at);const Bt=a.get(Ot);if(Ot.version!==Bt.__version||St===!0){if(n.activeTexture(r.TEXTURE0+at),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const Mt=Ne.getPrimaries(Ne.workingColorSpace),Gt=T.colorSpace===Ua?null:Ne.getPrimaries(T.colorSpace),Yt=T.colorSpace===Ua||Mt===Gt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt)}n.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let yt=M(T.image,!1,o.maxTextureSize);yt=pe(T,yt);const st=c.convert(T.format,T.colorSpace),xt=c.convert(T.type);let Tt=A(T.internalFormat,st,xt,T.normalized,T.colorSpace,T.isVideoTexture);Lt(ct,T);let Rt;const Vt=T.mipmaps,qt=T.isVideoTexture!==!0,re=Bt.__version===void 0||St===!0,$=Ot.dataReady,Ht=w(T,yt);if(T.isDepthTexture)Tt=O(T.format===Hs,T.type),re&&(qt?n.texStorage2D(r.TEXTURE_2D,1,Tt,yt.width,yt.height):n.texImage2D(r.TEXTURE_2D,0,Tt,yt.width,yt.height,0,st,xt,null));else if(T.isDataTexture)if(Vt.length>0){qt&&re&&n.texStorage2D(r.TEXTURE_2D,Ht,Tt,Vt[0].width,Vt[0].height);for(let Mt=0,Gt=Vt.length;Mt<Gt;Mt++)Rt=Vt[Mt],qt?$&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Rt.width,Rt.height,st,xt,Rt.data):n.texImage2D(r.TEXTURE_2D,Mt,Tt,Rt.width,Rt.height,0,st,xt,Rt.data);T.generateMipmaps=!1}else qt?(re&&n.texStorage2D(r.TEXTURE_2D,Ht,Tt,yt.width,yt.height),$&&dt(T,yt,st,xt)):n.texImage2D(r.TEXTURE_2D,0,Tt,yt.width,yt.height,0,st,xt,yt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){qt&&re&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ht,Tt,Vt[0].width,Vt[0].height,yt.depth);for(let Mt=0,Gt=Vt.length;Mt<Gt;Mt++)if(Rt=Vt[Mt],T.format!==Li)if(st!==null)if(qt){if($)if(T.layerUpdates.size>0){const Yt=T_(Rt.width,Rt.height,T.format,T.type);for(const Ut of T.layerUpdates){const oe=Rt.data.subarray(Ut*Yt/Rt.data.BYTES_PER_ELEMENT,(Ut+1)*Yt/Rt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,Ut,Rt.width,Rt.height,1,st,oe)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Rt.width,Rt.height,yt.depth,st,Rt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Mt,Tt,Rt.width,Rt.height,yt.depth,0,Rt.data,0,0);else he("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?$&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Rt.width,Rt.height,yt.depth,st,xt,Rt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,Mt,Tt,Rt.width,Rt.height,yt.depth,0,st,xt,Rt.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{qt&&re&&n.texStorage2D(r.TEXTURE_2D,Ht,Tt,Vt[0].width,Vt[0].height);for(let Mt=0,Gt=Vt.length;Mt<Gt;Mt++)Rt=Vt[Mt],T.format!==Li?st!==null?qt?$&&n.compressedTexSubImage2D(r.TEXTURE_2D,Mt,0,0,Rt.width,Rt.height,st,Rt.data):n.compressedTexImage2D(r.TEXTURE_2D,Mt,Tt,Rt.width,Rt.height,0,Rt.data):he("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?$&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Rt.width,Rt.height,st,xt,Rt.data):n.texImage2D(r.TEXTURE_2D,Mt,Tt,Rt.width,Rt.height,0,st,xt,Rt.data)}else if(T.isDataArrayTexture)if(qt){if(re&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ht,Tt,yt.width,yt.height,yt.depth),$)if(T.layerUpdates.size>0){const Mt=T_(yt.width,yt.height,T.format,T.type);for(const Gt of T.layerUpdates){const Yt=yt.data.subarray(Gt*Mt/yt.data.BYTES_PER_ELEMENT,(Gt+1)*Mt/yt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Gt,yt.width,yt.height,1,st,xt,Yt)}T.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,yt.width,yt.height,yt.depth,st,xt,yt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Tt,yt.width,yt.height,yt.depth,0,st,xt,yt.data);else if(T.isData3DTexture)qt?(re&&n.texStorage3D(r.TEXTURE_3D,Ht,Tt,yt.width,yt.height,yt.depth),$&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,yt.width,yt.height,yt.depth,st,xt,yt.data)):n.texImage3D(r.TEXTURE_3D,0,Tt,yt.width,yt.height,yt.depth,0,st,xt,yt.data);else if(T.isFramebufferTexture){if(re)if(qt)n.texStorage2D(r.TEXTURE_2D,Ht,Tt,yt.width,yt.height);else{let Mt=yt.width,Gt=yt.height;for(let Yt=0;Yt<Ht;Yt++)n.texImage2D(r.TEXTURE_2D,Yt,Tt,Mt,Gt,0,st,xt,null),Mt>>=1,Gt>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const Mt=r.canvas;if(Mt.hasAttribute("layoutsubtree")||Mt.setAttribute("layoutsubtree","true"),yt.parentNode!==Mt){Mt.appendChild(yt),v.add(T),Mt.onpaint=Gt=>{const Yt=Gt.changedElements;for(const Ut of v)Yt.includes(Ut.image)&&(Ut.needsUpdate=!0)},Mt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,yt);else{const Yt=r.RGBA,Ut=r.RGBA,oe=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Yt,Ut,oe,yt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Vt.length>0){if(qt&&re){const Mt=Se(Vt[0]);n.texStorage2D(r.TEXTURE_2D,Ht,Tt,Mt.width,Mt.height)}for(let Mt=0,Gt=Vt.length;Mt<Gt;Mt++)Rt=Vt[Mt],qt?$&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,st,xt,Rt):n.texImage2D(r.TEXTURE_2D,Mt,Tt,st,xt,Rt);T.generateMipmaps=!1}else if(qt){if(re){const Mt=Se(yt);n.texStorage2D(r.TEXTURE_2D,Ht,Tt,Mt.width,Mt.height)}$&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,st,xt,yt)}else n.texImage2D(r.TEXTURE_2D,0,Tt,st,xt,yt);S(T)&&z(ct),Bt.__version=Ot.version,T.onUpdate&&T.onUpdate(T)}G.__version=T.version}function ee(G,T,at){if(T.image.length!==6)return;const ct=Pt(G,T),St=T.source;n.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+at);const Ot=a.get(St);if(St.version!==Ot.__version||ct===!0){n.activeTexture(r.TEXTURE0+at);const Bt=Ne.getPrimaries(Ne.workingColorSpace),_t=T.colorSpace===Ua?null:Ne.getPrimaries(T.colorSpace),yt=T.colorSpace===Ua||Bt===_t?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const st=T.isCompressedTexture||T.image[0].isCompressedTexture,xt=T.image[0]&&T.image[0].isDataTexture,Tt=[];for(let Ut=0;Ut<6;Ut++)!st&&!xt?Tt[Ut]=M(T.image[Ut],!0,o.maxCubemapSize):Tt[Ut]=xt?T.image[Ut].image:T.image[Ut],Tt[Ut]=pe(T,Tt[Ut]);const Rt=Tt[0],Vt=c.convert(T.format,T.colorSpace),qt=c.convert(T.type),re=A(T.internalFormat,Vt,qt,T.normalized,T.colorSpace),$=T.isVideoTexture!==!0,Ht=Ot.__version===void 0||ct===!0,Mt=St.dataReady;let Gt=w(T,Rt);Lt(r.TEXTURE_CUBE_MAP,T);let Yt;if(st){$&&Ht&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Gt,re,Rt.width,Rt.height);for(let Ut=0;Ut<6;Ut++){Yt=Tt[Ut].mipmaps;for(let oe=0;oe<Yt.length;oe++){const $t=Yt[oe];T.format!==Li?Vt!==null?$?Mt&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe,0,0,$t.width,$t.height,Vt,$t.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe,re,$t.width,$t.height,0,$t.data):he("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe,0,0,$t.width,$t.height,Vt,qt,$t.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe,re,$t.width,$t.height,0,Vt,qt,$t.data)}}}else{if(Yt=T.mipmaps,$&&Ht){Yt.length>0&&Gt++;const Ut=Se(Tt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Gt,re,Ut.width,Ut.height)}for(let Ut=0;Ut<6;Ut++)if(xt){$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,0,0,Tt[Ut].width,Tt[Ut].height,Vt,qt,Tt[Ut].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,re,Tt[Ut].width,Tt[Ut].height,0,Vt,qt,Tt[Ut].data);for(let oe=0;oe<Yt.length;oe++){const We=Yt[oe].image[Ut].image;$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe+1,0,0,We.width,We.height,Vt,qt,We.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe+1,re,We.width,We.height,0,Vt,qt,We.data)}}else{$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,0,0,Vt,qt,Tt[Ut]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,re,Vt,qt,Tt[Ut]);for(let oe=0;oe<Yt.length;oe++){const $t=Yt[oe];$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe+1,0,0,Vt,qt,$t.image[Ut]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe+1,re,Vt,qt,$t.image[Ut])}}}S(T)&&z(r.TEXTURE_CUBE_MAP),Ot.__version=St.version,T.onUpdate&&T.onUpdate(T)}G.__version=T.version}function zt(G,T,at,ct,St,Ot){const Bt=c.convert(at.format,at.colorSpace),_t=c.convert(at.type),yt=A(at.internalFormat,Bt,_t,at.normalized,at.colorSpace),st=a.get(T),xt=a.get(at);if(xt.__renderTarget=T,!st.__hasExternalTextures){const Tt=Math.max(1,T.width>>Ot),Rt=Math.max(1,T.height>>Ot);St===r.TEXTURE_3D||St===r.TEXTURE_2D_ARRAY?n.texImage3D(St,Ot,yt,Tt,Rt,T.depth,0,Bt,_t,null):n.texImage2D(St,Ot,yt,Tt,Rt,0,Bt,_t,null)}n.bindFramebuffer(r.FRAMEBUFFER,G),de(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ct,St,xt.__webglTexture,0,ce(T)):(St===r.TEXTURE_2D||St>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&St<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ct,St,xt.__webglTexture,Ot),n.bindFramebuffer(r.FRAMEBUFFER,null)}function ie(G,T,at){if(r.bindRenderbuffer(r.RENDERBUFFER,G),T.depthBuffer){const ct=T.depthTexture,St=ct&&ct.isDepthTexture?ct.type:null,Ot=O(T.stencilBuffer,St),Bt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;de(T)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ce(T),Ot,T.width,T.height):at?r.renderbufferStorageMultisample(r.RENDERBUFFER,ce(T),Ot,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ot,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Bt,r.RENDERBUFFER,G)}else{const ct=T.textures;for(let St=0;St<ct.length;St++){const Ot=ct[St],Bt=c.convert(Ot.format,Ot.colorSpace),_t=c.convert(Ot.type),yt=A(Ot.internalFormat,Bt,_t,Ot.normalized,Ot.colorSpace);de(T)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ce(T),yt,T.width,T.height):at?r.renderbufferStorageMultisample(r.RENDERBUFFER,ce(T),yt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,yt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ue(G,T,at){const ct=T.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,G),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const St=a.get(T.depthTexture);if(St.__renderTarget=T,(!St.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ct){if(St.__webglInit===void 0&&(St.__webglInit=!0,T.depthTexture.addEventListener("dispose",L)),St.__webglTexture===void 0){St.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,St.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T.depthTexture);const st=c.convert(T.depthTexture.format),xt=c.convert(T.depthTexture.type);let Tt;T.depthTexture.format===na?Tt=r.DEPTH_COMPONENT24:T.depthTexture.format===Hs&&(Tt=r.DEPTH24_STENCIL8);for(let Rt=0;Rt<6;Rt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,0,Tt,T.width,T.height,0,st,xt,null)}}else Y(T.depthTexture,0);const Ot=St.__webglTexture,Bt=ce(T),_t=ct?r.TEXTURE_CUBE_MAP_POSITIVE_X+at:r.TEXTURE_2D,yt=T.depthTexture.format===Hs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===na)de(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,yt,_t,Ot,0,Bt):r.framebufferTexture2D(r.FRAMEBUFFER,yt,_t,Ot,0);else if(T.depthTexture.format===Hs)de(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,yt,_t,Ot,0,Bt):r.framebufferTexture2D(r.FRAMEBUFFER,yt,_t,Ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function gt(G){const T=a.get(G),at=G.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==G.depthTexture){const ct=G.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ct){const St=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ct.removeEventListener("dispose",St)};ct.addEventListener("dispose",St),T.__depthDisposeCallback=St}T.__boundDepthTexture=ct}if(G.depthTexture&&!T.__autoAllocateDepthBuffer)if(at)for(let ct=0;ct<6;ct++)ue(T.__webglFramebuffer[ct],G,ct);else{const ct=G.texture.mipmaps;ct&&ct.length>0?ue(T.__webglFramebuffer[0],G,0):ue(T.__webglFramebuffer,G,0)}else if(at){T.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ct]),T.__webglDepthbuffer[ct]===void 0)T.__webglDepthbuffer[ct]=r.createRenderbuffer(),ie(T.__webglDepthbuffer[ct],G,!1);else{const St=G.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ot=T.__webglDepthbuffer[ct];r.bindRenderbuffer(r.RENDERBUFFER,Ot),r.framebufferRenderbuffer(r.FRAMEBUFFER,St,r.RENDERBUFFER,Ot)}}else{const ct=G.texture.mipmaps;if(ct&&ct.length>0?n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),ie(T.__webglDepthbuffer,G,!1);else{const St=G.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ot=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ot),r.framebufferRenderbuffer(r.FRAMEBUFFER,St,r.RENDERBUFFER,Ot)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ct(G,T,at){const ct=a.get(G);T!==void 0&&zt(ct.__webglFramebuffer,G,G.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),at!==void 0&&gt(G)}function Nt(G){const T=G.texture,at=a.get(G),ct=a.get(T);G.addEventListener("dispose",y);const St=G.textures,Ot=G.isWebGLCubeRenderTarget===!0,Bt=St.length>1;if(Bt||(ct.__webglTexture===void 0&&(ct.__webglTexture=r.createTexture()),ct.__version=T.version,u.memory.textures++),Ot){at.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(T.mipmaps&&T.mipmaps.length>0){at.__webglFramebuffer[_t]=[];for(let yt=0;yt<T.mipmaps.length;yt++)at.__webglFramebuffer[_t][yt]=r.createFramebuffer()}else at.__webglFramebuffer[_t]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){at.__webglFramebuffer=[];for(let _t=0;_t<T.mipmaps.length;_t++)at.__webglFramebuffer[_t]=r.createFramebuffer()}else at.__webglFramebuffer=r.createFramebuffer();if(Bt)for(let _t=0,yt=St.length;_t<yt;_t++){const st=a.get(St[_t]);st.__webglTexture===void 0&&(st.__webglTexture=r.createTexture(),u.memory.textures++)}if(G.samples>0&&de(G)===!1){at.__webglMultisampledFramebuffer=r.createFramebuffer(),at.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,at.__webglMultisampledFramebuffer);for(let _t=0;_t<St.length;_t++){const yt=St[_t];at.__webglColorRenderbuffer[_t]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,at.__webglColorRenderbuffer[_t]);const st=c.convert(yt.format,yt.colorSpace),xt=c.convert(yt.type),Tt=A(yt.internalFormat,st,xt,yt.normalized,yt.colorSpace,G.isXRRenderTarget===!0),Rt=ce(G);r.renderbufferStorageMultisample(r.RENDERBUFFER,Rt,Tt,G.width,G.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,at.__webglColorRenderbuffer[_t])}r.bindRenderbuffer(r.RENDERBUFFER,null),G.depthBuffer&&(at.__webglDepthRenderbuffer=r.createRenderbuffer(),ie(at.__webglDepthRenderbuffer,G,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ot){n.bindTexture(r.TEXTURE_CUBE_MAP,ct.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T);for(let _t=0;_t<6;_t++)if(T.mipmaps&&T.mipmaps.length>0)for(let yt=0;yt<T.mipmaps.length;yt++)zt(at.__webglFramebuffer[_t][yt],G,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,yt);else zt(at.__webglFramebuffer[_t],G,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);S(T)&&z(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Bt){for(let _t=0,yt=St.length;_t<yt;_t++){const st=St[_t],xt=a.get(st);let Tt=r.TEXTURE_2D;(G.isWebGL3DRenderTarget||G.isWebGLArrayRenderTarget)&&(Tt=G.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Tt,xt.__webglTexture),Lt(Tt,st),zt(at.__webglFramebuffer,G,st,r.COLOR_ATTACHMENT0+_t,Tt,0),S(st)&&z(Tt)}n.unbindTexture()}else{let _t=r.TEXTURE_2D;if((G.isWebGL3DRenderTarget||G.isWebGLArrayRenderTarget)&&(_t=G.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(_t,ct.__webglTexture),Lt(_t,T),T.mipmaps&&T.mipmaps.length>0)for(let yt=0;yt<T.mipmaps.length;yt++)zt(at.__webglFramebuffer[yt],G,T,r.COLOR_ATTACHMENT0,_t,yt);else zt(at.__webglFramebuffer,G,T,r.COLOR_ATTACHMENT0,_t,0);S(T)&&z(_t),n.unbindTexture()}G.depthBuffer&&gt(G)}function Dt(G){const T=G.textures;for(let at=0,ct=T.length;at<ct;at++){const St=T[at];if(S(St)){const Ot=H(G),Bt=a.get(St).__webglTexture;n.bindTexture(Ot,Bt),z(Ot),n.unbindTexture()}}}const It=[],ae=[];function jt(G){if(G.samples>0){if(de(G)===!1){const T=G.textures,at=G.width,ct=G.height;let St=r.COLOR_BUFFER_BIT;const Ot=G.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Bt=a.get(G),_t=T.length>1;if(_t)for(let st=0;st<T.length;st++)n.bindFramebuffer(r.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+st,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+st,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer);const yt=G.texture.mipmaps;yt&&yt.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Bt.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Bt.__webglFramebuffer);for(let st=0;st<T.length;st++){if(G.resolveDepthBuffer&&(G.depthBuffer&&(St|=r.DEPTH_BUFFER_BIT),G.stencilBuffer&&G.resolveStencilBuffer&&(St|=r.STENCIL_BUFFER_BIT)),_t){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Bt.__webglColorRenderbuffer[st]);const xt=a.get(T[st]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,xt,0)}r.blitFramebuffer(0,0,at,ct,0,0,at,ct,St,r.NEAREST),d===!0&&(It.length=0,ae.length=0,It.push(r.COLOR_ATTACHMENT0+st),G.depthBuffer&&G.storeMultisampledDepthBuffer===!1&&(It.push(Ot),ae.push(Ot),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ae)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,It))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),_t)for(let st=0;st<T.length;st++){n.bindFramebuffer(r.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+st,r.RENDERBUFFER,Bt.__webglColorRenderbuffer[st]);const xt=a.get(T[st]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+st,r.TEXTURE_2D,xt,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer)}else if(G.depthBuffer&&G.storeMultisampledDepthBuffer===!1&&d){const T=G.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function ce(G){return Math.min(o.maxSamples,G.samples)}function de(G){const T=a.get(G);return G.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function j(G){const T=u.render.frame;g.get(G)!==T&&(g.set(G,T),G.update())}function pe(G,T){const at=G.colorSpace,ct=G.format,St=G.type;return G.isCompressedTexture===!0||G.isVideoTexture===!0||at!==Jr&&at!==Ua&&(Ne.getTransfer(at)===Xe?(ct!==Li||St!==En)&&he("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",at)),T}function Se(G){return typeof HTMLImageElement<"u"&&G instanceof HTMLImageElement?(h.width=G.naturalWidth||G.width,h.height=G.naturalHeight||G.height):typeof VideoFrame<"u"&&G instanceof VideoFrame?(h.width=G.displayWidth,h.height=G.displayHeight):(h.width=G.width,h.height=G.height),h}this.allocateTextureUnit=P,this.resetTextureUnits=Z,this.getTextureUnits=I,this.setTextureUnits=X,this.setTexture2D=Y,this.setTexture2DArray=k,this.setTexture3D=W,this.setTextureCube=R,this.rebindTextures=Ct,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=Dt,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=gt,this.setupFrameBufferTexture=zt,this.useMultisampledRTT=de,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function _3(r,t){function n(a,o=Ua){let c;const u=Ne.getTransfer(o);if(a===En)return r.UNSIGNED_BYTE;if(a===Mp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===Ep)return r.UNSIGNED_SHORT_5_5_5_1;if(a===ux)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===fx)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===lx)return r.BYTE;if(a===cx)return r.SHORT;if(a===vl)return r.UNSIGNED_SHORT;if(a===yp)return r.INT;if(a===Xi)return r.UNSIGNED_INT;if(a===Si)return r.FLOAT;if(a===Dn)return r.HALF_FLOAT;if(a===hx)return r.ALPHA;if(a===dx)return r.RGB;if(a===Li)return r.RGBA;if(a===na)return r.DEPTH_COMPONENT;if(a===Hs)return r.DEPTH_STENCIL;if(a===bp)return r.RED;if(a===Tp)return r.RED_INTEGER;if(a===Xs)return r.RG;if(a===Ap)return r.RG_INTEGER;if(a===wp)return r.RGBA_INTEGER;if(a===mu||a===gu||a===vu||a===_u)if(u===Xe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===mu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===gu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===vu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===_u)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===mu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===gu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===vu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===_u)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Pd||a===Id||a===Fd||a===zd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Pd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Id)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Fd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===zd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Bd||a===Hd||a===Gd||a===Vd||a===kd||a===Mu||a===Xd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Bd||a===Hd)return u===Xe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Gd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===Vd)return c.COMPRESSED_R11_EAC;if(a===kd)return c.COMPRESSED_SIGNED_R11_EAC;if(a===Mu)return c.COMPRESSED_RG11_EAC;if(a===Xd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===Wd||a===qd||a===Yd||a===Zd||a===Kd||a===Jd||a===Qd||a===jd||a===$d||a===tp||a===ep||a===np||a===ip||a===ap)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Wd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Yd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Zd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Kd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Jd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===jd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===$d)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===tp)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===ep)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===np)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===ip)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===ap)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===sp||a===rp||a===op)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===sp)return u===Xe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===rp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===op)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===lp||a===cp||a===Eu||a===up)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===lp)return c.COMPRESSED_RED_RGTC1_EXT;if(a===cp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Eu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===up)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===_l?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const x3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S3=`
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

}`;class y3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new Mx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Ni({vertexShader:x3,fragmentShader:S3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new bn(new xi(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class M3 extends qs{constructor(t,n){super();const a=this;let o=null,c=1,u=null,p="local-floor",d=1,h=null,g=null,v=null,_=null,x=null,b=null;const U=typeof XRWebGLBinding<"u",M=new y3,S={},z=n.getContextAttributes();let H=null,A=null;const O=[],w=[],L=new Ft;let y=null,D=null;const B=new si;B.viewport=new en;const V=new si;V.viewport=new en;const q=[B,V],Z=new CE;let I=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let dt=O[nt];return dt===void 0&&(dt=new nd,O[nt]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(nt){let dt=O[nt];return dt===void 0&&(dt=new nd,O[nt]=dt),dt.getGripSpace()},this.getHand=function(nt){let dt=O[nt];return dt===void 0&&(dt=new nd,O[nt]=dt),dt.getHandSpace()};function P(nt){const dt=w.indexOf(nt.inputSource);if(dt===-1)return;const wt=O[dt];wt!==void 0&&(wt.update(nt.inputSource,nt.frame,h||u),wt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function F(){o.removeEventListener("select",P),o.removeEventListener("selectstart",P),o.removeEventListener("selectend",P),o.removeEventListener("squeeze",P),o.removeEventListener("squeezestart",P),o.removeEventListener("squeezeend",P),o.removeEventListener("end",F),o.removeEventListener("inputsourceschange",Y);for(let nt=0;nt<O.length;nt++){const dt=w[nt];dt!==null&&(w[nt]=null,O[nt].disconnect(dt))}I=null,X=null,M.reset();for(const nt in S)delete S[nt];if(t.setRenderTarget(H),x=null,_=null,v=null,o=null,A=null,Pt.stop(),a.isPresenting=!1,t.setPixelRatio(y),t.setSize(L.width,L.height,!1),D!==null){const nt=D.camera;nt.fov=D.fov,nt.zoom=D.zoom,nt.updateProjectionMatrix(),D=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){c=nt,a.isPresenting===!0&&he("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){p=nt,a.isPresenting===!0&&he("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||u},this.setReferenceSpace=function(nt){h=nt},this.getBaseLayer=function(){return _!==null?_:x},this.getBinding=function(){return v===null&&U&&(v=new XRWebGLBinding(o,n)),v},this.getFrame=function(){return b},this.getSession=function(){return o},this.setSession=async function(nt){if(o=nt,o!==null){if(H=t.getRenderTarget(),o.addEventListener("select",P),o.addEventListener("selectstart",P),o.addEventListener("selectend",P),o.addEventListener("squeeze",P),o.addEventListener("squeezestart",P),o.addEventListener("squeezeend",P),o.addEventListener("end",F),o.addEventListener("inputsourceschange",Y),z.xrCompatible!==!0&&await n.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(L),U&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,ee=null,zt=null;z.depth&&(zt=z.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,wt=z.stencil?Hs:na,ee=z.stencil?_l:Xi);const ie={colorFormat:n.RGBA8,depthFormat:zt,scaleFactor:c};v=this.getBinding(),_=v.createProjectionLayer(ie),o.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),A=new Jn(_.textureWidth,_.textureHeight,{format:Li,type:En,depthTexture:new jr(_.textureWidth,_.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:z.stencil,colorSpace:t.outputColorSpace,samples:z.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1,storeMultisampledDepthBuffer:_.ignoreDepthValues===!1,storeMultisampledStencilBuffer:_.ignoreDepthValues===!1})}else{const wt={antialias:z.antialias,alpha:!0,depth:z.depth,stencil:z.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(o,n,wt),o.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new Jn(x.framebufferWidth,x.framebufferHeight,{format:Li,type:En,colorSpace:t.outputColorSpace,stencilBuffer:z.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(d),h=null,u=await o.requestReferenceSpace(p),Pt.setContext(o),Pt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function Y(nt){for(let dt=0;dt<nt.removed.length;dt++){const wt=nt.removed[dt],ee=w.indexOf(wt);ee>=0&&(w[ee]=null,O[ee].disconnect(wt))}for(let dt=0;dt<nt.added.length;dt++){const wt=nt.added[dt];let ee=w.indexOf(wt);if(ee===-1){for(let ie=0;ie<O.length;ie++)if(ie>=w.length){w.push(wt),ee=ie;break}else if(w[ie]===null){w[ie]=wt,ee=ie;break}if(ee===-1)break}const zt=O[ee];zt&&zt.connect(wt)}}const k=new J,W=new J;function R(nt,dt,wt){k.setFromMatrixPosition(dt.matrixWorld),W.setFromMatrixPosition(wt.matrixWorld);const ee=k.distanceTo(W),zt=dt.projectionMatrix.elements,ie=wt.projectionMatrix.elements,ue=zt[14]/(zt[10]-1),gt=zt[14]/(zt[10]+1),Ct=(zt[9]+1)/zt[5],Nt=(zt[9]-1)/zt[5],Dt=(zt[8]-1)/zt[0],It=(ie[8]+1)/ie[0],ae=ue*Dt,jt=ue*It,ce=ee/(-Dt+It),de=ce*-Dt;if(dt.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(de),nt.translateZ(ce),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),zt[10]===-1)nt.projectionMatrix.copy(dt.projectionMatrix),nt.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{const j=ue+ce,pe=gt+ce,Se=ae-de,G=jt+(ee-de),T=Ct*gt/pe*j,at=Nt*gt/pe*j;nt.projectionMatrix.makePerspective(Se,G,T,at,j,pe),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function K(nt,dt){dt===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(dt.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(o===null)return;let dt=nt.near,wt=nt.far;M.texture!==null&&(M.depthNear>0&&(dt=M.depthNear),M.depthFar>0&&(wt=M.depthFar)),Z.near=V.near=B.near=dt,Z.far=V.far=B.far=wt,(I!==Z.near||X!==Z.far)&&(o.updateRenderState({depthNear:Z.near,depthFar:Z.far}),I=Z.near,X=Z.far),Z.layers.mask=nt.layers.mask|6,B.layers.mask=Z.layers.mask&-5,V.layers.mask=Z.layers.mask&-3;const ee=nt.parent,zt=Z.cameras;K(Z,ee);for(let ie=0;ie<zt.length;ie++)K(zt[ie],ee);zt.length===2?R(Z,B,V):Z.projectionMatrix.copy(B.projectionMatrix),D===null&&nt.isPerspectiveCamera&&(D={camera:nt,fov:nt.fov,zoom:nt.zoom}),it(nt,Z,ee)};function it(nt,dt,wt){wt===null?nt.matrix.copy(dt.matrixWorld):(nt.matrix.copy(wt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(dt.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(dt.projectionMatrix),nt.projectionMatrixInverse.copy(dt.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Qr*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(_===null&&x===null))return d},this.setFoveation=function(nt){d=nt,_!==null&&(_.fixedFoveation=nt),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=nt)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(Z)},this.getCameraTexture=function(nt){return S[nt]};let mt=null;function Lt(nt,dt){if(g=dt.getViewerPose(h||u),b=dt,g!==null){const wt=g.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let ee=!1;wt.length!==Z.cameras.length&&(Z.cameras.length=0,ee=!0);for(let gt=0;gt<wt.length;gt++){const Ct=wt[gt];let Nt=null;if(x!==null)Nt=x.getViewport(Ct);else{const It=v.getViewSubImage(_,Ct);Nt=It.viewport,gt===0&&(t.setRenderTargetTextures(A,It.colorTexture,It.depthStencilTexture),t.setRenderTarget(A))}let Dt=q[gt];Dt===void 0&&(Dt=new si,Dt.layers.enable(gt),Dt.viewport=new en,q[gt]=Dt),Dt.matrix.fromArray(Ct.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(Ct.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),gt===0&&(Z.matrix.copy(Dt.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),ee===!0&&Z.cameras.push(Dt)}const zt=o.enabledFeatures;if(zt&&zt.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&U){v=a.getBinding();const gt=v.getDepthInformation(wt[0]);gt&&gt.isValid&&gt.texture&&M.init(gt,o.renderState)}if(zt&&zt.includes("camera-access")&&U){t.state.unbindTexture(),v=a.getBinding();for(let gt=0;gt<wt.length;gt++){const Ct=wt[gt].camera;if(Ct){let Nt=S[Ct];Nt||(Nt=new Mx,S[Ct]=Nt);const Dt=v.getCameraImage(Ct);Nt.sourceTexture=Dt}}}}for(let wt=0;wt<O.length;wt++){const ee=w[wt],zt=O[wt];ee!==null&&zt!==void 0&&zt.update(ee,dt,h||u)}mt&&mt(nt,dt),dt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:dt}),b=null}const Pt=new Ix;Pt.setAnimationLoop(Lt),this.setAnimationLoop=function(nt){mt=nt},this.dispose=function(){}}}const E3=new Ge,Vx=new ge;Vx.set(-1,0,0,0,1,0,0,0,1);function b3(r,t){function n(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function a(M,S){S.color.getRGB(M.fogColor.value,Nx(r)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function o(M,S,z,H,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),v(M,S)):S.isMeshPhongMaterial?(c(M,S),g(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),_(M,S),S.isMeshPhysicalMaterial&&x(M,S,A)):S.isMeshMatcapMaterial?(c(M,S),b(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),U(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(u(M,S),S.isLineDashedMaterial&&p(M,S)):S.isPointsMaterial?d(M,S,z,H):S.isSpriteMaterial?h(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,n(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===ri&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,n(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===ri&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,n(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,n(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,n(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const z=t.get(S),H=z.envMap,A=z.envMapRotation;H&&(M.envMap.value=H,M.envMapRotation.value.setFromMatrix4(E3.makeRotationFromEuler(A)).transpose(),H.isCubeTexture&&H.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(Vx),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,n(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,n(S.aoMap,M.aoMapTransform))}function u(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform))}function p(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function d(M,S,z,H){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*z,M.scale.value=H*.5,S.map&&(M.map.value=S.map,n(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function h(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function g(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function v(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function _(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,n(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,n(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,z){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,n(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,n(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,n(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,n(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,n(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===ri&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,n(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,n(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=z.texture,M.transmissionSamplerSize.value.set(z.width,z.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,n(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,n(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,n(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,n(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,n(S.specularIntensityMap,M.specularIntensityMapTransform))}function b(M,S){S.matcap&&(M.matcap.value=S.matcap)}function U(M,S){const z=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(z.matrixWorld),M.nearDistance.value=z.shadow.camera.near,M.farDistance.value=z.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function T3(r,t,n,a){let o={},c={},u=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function d(A,O){const w=O.program;a.uniformBlockBinding(A,w)}function h(A,O){let w=o[A.id];w===void 0&&(M(A),w=g(A),o[A.id]=w,A.addEventListener("dispose",z));const L=O.program;a.updateUBOMapping(A,L);const y=t.render.frame;c[A.id]!==y&&(_(A),c[A.id]=y)}function g(A){const O=v();A.__bindingPointIndex=O;const w=r.createBuffer(),L=A.__size,y=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,L,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,O,w),w}function v(){for(let A=0;A<p;A++)if(u.indexOf(A)===-1)return u.push(A),A;return Le("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(A){const O=o[A.id],w=A.uniforms,L=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,O);for(let y=0,D=w.length;y<D;y++){const B=w[y];if(Array.isArray(B))for(let V=0,q=B.length;V<q;V++)x(B[V],y,V,L);else x(B,y,0,L)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,O,w,L){if(U(A,O,w,L)===!0){const y=A.__offset,D=A.value;if(Array.isArray(D)){let B=0;for(let V=0;V<D.length;V++){const q=D[V],Z=S(q);b(q,A.__data,B),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(B+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(D,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,y,A.__data)}}function b(A,O,w){typeof A=="number"||typeof A=="boolean"?O[0]=A:A.isMatrix3?(O[0]=A.elements[0],O[1]=A.elements[1],O[2]=A.elements[2],O[3]=0,O[4]=A.elements[3],O[5]=A.elements[4],O[6]=A.elements[5],O[7]=0,O[8]=A.elements[6],O[9]=A.elements[7],O[10]=A.elements[8],O[11]=0):ArrayBuffer.isView(A)?O.set(new A.constructor(A.buffer,A.byteOffset,O.length)):A.toArray(O,w)}function U(A,O,w,L){const y=A.value,D=O+"_"+w;if(L[D]===void 0)return typeof y=="number"||typeof y=="boolean"?L[D]=y:ArrayBuffer.isView(y)?L[D]=y.slice():L[D]=y.clone(),!0;{const B=L[D];if(typeof y=="number"||typeof y=="boolean"){if(B!==y)return L[D]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(B.equals(y)===!1)return B.copy(y),!0}}return!1}function M(A){const O=A.uniforms;let w=0;const L=16;for(let D=0,B=O.length;D<B;D++){const V=Array.isArray(O[D])?O[D]:[O[D]];for(let q=0,Z=V.length;q<Z;q++){const I=V[q],X=Array.isArray(I.value)?I.value:[I.value];for(let P=0,F=X.length;P<F;P++){const Y=X[P],k=S(Y),W=w%L,R=W%k.boundary,K=W+R;w+=R,K!==0&&L-K<k.storage&&(w+=L-K),I.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=w,w+=k.storage}}}const y=w%L;return y>0&&(w+=L-y),A.__size=w,A.__cache={},this}function S(A){const O={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(O.boundary=4,O.storage=4):A.isVector2?(O.boundary=8,O.storage=8):A.isVector3||A.isColor?(O.boundary=16,O.storage=12):A.isVector4?(O.boundary=16,O.storage=16):A.isMatrix3?(O.boundary=48,O.storage=48):A.isMatrix4?(O.boundary=64,O.storage=64):A.isTexture?he("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(O.boundary=16,O.storage=A.byteLength):he("WebGLRenderer: Unsupported uniform value type.",A),O}function z(A){const O=A.target;O.removeEventListener("dispose",z);const w=u.indexOf(O.__bindingPointIndex);u.splice(w,1),r.deleteBuffer(o[O.id]),delete o[O.id],delete c[O.id]}function H(){for(const A in o)r.deleteBuffer(o[A]);u=[],o={},c={}}return{bind:d,update:h,dispose:H}}const A3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ji=null;function w3(){return ji===null&&(ji=new Au(A3,16,16,Xs,Dn),ji.name="DFG_LUT",ji.minFilter=rn,ji.magFilter=rn,ji.wrapS=Vi,ji.wrapT=Vi,ji.generateMipmaps=!1,ji.needsUpdate=!0),ji}class R3{constructor(t={}){const{canvas:n=kM(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:p=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:h=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:_=!1,outputBufferType:x=En}=t;this.isWebGLRenderer=!0;let b;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=a.getContextAttributes().alpha}else b=u;const U=x,M=new Set([wp,Ap,Tp]),S=new Set([En,Xi,vl,_l,Mp,Ep]),z=new Uint32Array(4),H=new Int32Array(4),A=new J;let O=null,w=null;const L=[],y=[];let D=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ea,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let V=!1,q=null,Z=null,I=null,X=null;this._outputColorSpace=Kn;let P=0,F=0,Y=null,k=-1,W=null;const R=new en,K=new en;let it=null;const mt=new xe(0);let Lt=0,Pt=n.width,nt=n.height,dt=1,wt=null,ee=null;const zt=new en(0,0,Pt,nt),ie=new en(0,0,Pt,nt);let ue=!1;const gt=new Np;let Ct=!1,Nt=!1;const Dt=new Ge,It=new J,ae=new en,jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function de(){return Y===null?dt:1}let j=a;function pe(C,tt){return n.getContext(C,tt)}let Se,G,T,at,ct,St,Ot,Bt,_t,yt,st,xt,Tt,Rt,Vt,qt,re,$,Ht,Mt,Gt,Yt,Ut;try{const C={alpha:!0,depth:o,stencil:c,antialias:p,premultipliedAlpha:d,preserveDrawingBuffer:h,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${xp}`),n.addEventListener("webglcontextlost",We,!1),n.addEventListener("webglcontextrestored",Pe,!1),n.addEventListener("webglcontextcreationerror",Qn,!1),j===null){const tt="webgl2";if(j=pe(tt,C),j===null)throw pe(tt)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}oe()}catch(C){throw n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Pe,!1),n.removeEventListener("webglcontextcreationerror",Qn,!1),Le("WebGLRenderer: "+C.message),C}function oe(){Se=new wA(j),Se.init(),Gt=new _3(j,Se),G=new vA(j,Se,t,Gt),T=new g3(j,Se),G.reversedDepthBuffer&&_&&T.buffers.depth.setReversed(!0),Z=j.createFramebuffer(),I=j.createFramebuffer(),X=j.createFramebuffer(),at=new DA(j),ct=new n3,St=new v3(j,Se,T,ct,G,Gt,at),Ot=new AA(B),Bt=new LE(j),Yt=new mA(j,Bt),_t=new RA(j,Bt,at,Yt),yt=new LA(j,_t,Bt,Yt,at),$=new UA(j,G,St),Vt=new _A(ct),st=new e3(B,Ot,Se,G,Yt,Vt),xt=new b3(B,ct),Tt=new a3,Rt=new u3(Se),re=new pA(B,Ot,T,yt,b,d),qt=new m3(B,yt,G),Ut=new T3(j,at,G,T),Ht=new gA(j,Se,at),Mt=new CA(j,Se,at),at.programs=st.programs,B.capabilities=G,B.extensions=Se,B.properties=ct,B.renderLists=Tt,B.shadowMap=qt,B.state=T,B.info=at}U!==En&&(D=new OA(U,n.width,n.height,p,o,c));const $t=new M3(B,j);this.xr=$t,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const C=Se.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Se.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return dt},this.setPixelRatio=function(C){C!==void 0&&(dt=C,this.setSize(Pt,nt,!1))},this.getSize=function(C){return C.set(Pt,nt)},this.setSize=function(C,tt,pt=!0){if($t.isPresenting){he("WebGLRenderer: Can't change size while VR device is presenting.");return}Pt=C,nt=tt,n.width=Math.floor(C*dt),n.height=Math.floor(tt*dt),pt===!0&&(n.style.width=C+"px",n.style.height=tt+"px"),D!==null&&D.setSize(n.width,n.height),this.setViewport(0,0,C,tt)},this.getDrawingBufferSize=function(C){return C.set(Pt*dt,nt*dt).floor()},this.setDrawingBufferSize=function(C,tt,pt){Pt=C,nt=tt,dt=pt,n.width=Math.floor(C*pt),n.height=Math.floor(tt*pt),this.setViewport(0,0,C,tt)},this.setEffects=function(C){if(U===En){Le("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let tt=0;tt<C.length;tt++)if(C[tt].isOutputPass===!0){he("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(R)},this.getViewport=function(C){return C.copy(zt)},this.setViewport=function(C,tt,pt,ot){C.isVector4?zt.set(C.x,C.y,C.z,C.w):zt.set(C,tt,pt,ot),T.viewport(R.copy(zt).multiplyScalar(dt).round())},this.getScissor=function(C){return C.copy(ie)},this.setScissor=function(C,tt,pt,ot){C.isVector4?ie.set(C.x,C.y,C.z,C.w):ie.set(C,tt,pt,ot),T.scissor(K.copy(ie).multiplyScalar(dt).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(C){T.setScissorTest(ue=C)},this.setOpaqueSort=function(C){wt=C},this.setTransparentSort=function(C){ee=C},this.getClearColor=function(C){return C.copy(re.getClearColor())},this.setClearColor=function(){re.setClearColor(...arguments)},this.getClearAlpha=function(){return re.getClearAlpha()},this.setClearAlpha=function(){re.setClearAlpha(...arguments)},this.clear=function(C=!0,tt=!0,pt=!0){let ot=0;if(C){let lt=!1;if(Y!==null){const Xt=Y.texture.format;lt=M.has(Xt)}if(lt){const Xt=Y.texture.type,Jt=S.has(Xt),kt=re.getClearColor(),Zt=re.getClearAlpha(),Kt=kt.r,ve=kt.g,Ae=kt.b;Jt?(z[0]=Kt,z[1]=ve,z[2]=Ae,z[3]=Zt,j.clearBufferuiv(j.COLOR,0,z)):(H[0]=Kt,H[1]=ve,H[2]=Ae,H[3]=Zt,j.clearBufferiv(j.COLOR,0,H))}else ot|=j.COLOR_BUFFER_BIT}tt&&(ot|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),pt&&(ot|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ot!==0&&j.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),q=C},this.dispose=function(){n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Pe,!1),n.removeEventListener("webglcontextcreationerror",Qn,!1),re.dispose(),Tt.dispose(),Rt.dispose(),ct.dispose(),Ot.dispose(),yt.dispose(),Yt.dispose(),Ut.dispose(),st.dispose(),$t.dispose(),$t.removeEventListener("sessionstart",hn),$t.removeEventListener("sessionend",Un),jn.stop()};function We(C){C.preventDefault(),Vv("WebGLRenderer: Context Lost."),V=!0}function Pe(){Vv("WebGLRenderer: Context Restored."),V=!1;const C=at.autoReset,tt=qt.enabled,pt=qt.autoUpdate,ot=qt.needsUpdate,lt=qt.type;oe(),at.autoReset=C,qt.enabled=tt,qt.autoUpdate=pt,qt.needsUpdate=ot,qt.type=lt}function Qn(C){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function oi(C){const tt=C.target;tt.removeEventListener("dispose",oi),io(tt)}function io(C){ao(C),ct.remove(C)}function ao(C){const tt=ct.get(C).programs;tt!==void 0&&(tt.forEach(function(pt){st.releaseProgram(pt)}),C.isShaderMaterial&&st.releaseShaderCache(C))}this.renderBufferDirect=function(C,tt,pt,ot,lt,Xt){tt===null&&(tt=jt);const Jt=lt.isMesh&&lt.matrixWorld.determinantAffine()<0,kt=Ba(C,tt,pt,ot,lt);T.setMaterial(ot,Jt);let Zt=pt.index,Kt=1;if(ot.wireframe===!0){if(Zt=_t.getWireframeAttribute(pt),Zt===void 0)return;Kt=2}const ve=pt.drawRange,Ae=pt.attributes.position;let te=ve.start*Kt,Ie=(ve.start+ve.count)*Kt;Xt!==null&&(te=Math.max(te,Xt.start*Kt),Ie=Math.min(Ie,(Xt.start+Xt.count)*Kt)),Zt!==null?(te=Math.max(te,0),Ie=Math.min(Ie,Zt.count)):Ae!=null&&(te=Math.max(te,0),Ie=Math.min(Ie,Ae.count));const je=Ie-te;if(je<0||je===1/0)return;Yt.setup(lt,ot,kt,pt,Zt);let Je,Ee=Ht;if(Zt!==null&&(Je=Bt.get(Zt),Ee=Mt,Ee.setIndex(Je)),lt.isMesh)ot.wireframe===!0?(T.setLineWidth(ot.wireframeLinewidth*de()),Ee.setMode(j.LINES)):Ee.setMode(j.TRIANGLES);else if(lt.isLine){let pn=ot.linewidth;pn===void 0&&(pn=1),T.setLineWidth(pn*de()),lt.isLineSegments?Ee.setMode(j.LINES):lt.isLineLoop?Ee.setMode(j.LINE_LOOP):Ee.setMode(j.LINE_STRIP)}else lt.isPoints?Ee.setMode(j.POINTS):lt.isSprite&&Ee.setMode(j.TRIANGLES);if(lt.isBatchedMesh)if(Se.get("WEBGL_multi_draw"))Ee.renderMultiDraw(lt._multiDrawStarts,lt._multiDrawCounts,lt._multiDrawCount);else{const pn=lt._multiDrawStarts,Qt=lt._multiDrawCounts,yn=lt._multiDrawCount,be=Zt?Bt.get(Zt).bytesPerElement:1,kn=ct.get(ot).currentProgram.getUniforms();for(let li=0;li<yn;li++)kn.setValue(j,"_gl_DrawID",li),Ee.render(pn[li]/be,Qt[li])}else if(lt.isInstancedMesh)Ee.renderInstances(te,je,lt.count);else if(pt.isInstancedBufferGeometry){const pn=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,Qt=Math.min(pt.instanceCount,pn);Ee.renderInstances(te,je,Qt)}else Ee.render(te,je)};function so(C,tt,pt,ot){q!==null&&C.isNodeMaterial&&q.setObject(ot,C),Ct===!0&&Vt.setState(C,pt,!1),C.transparent===!0&&C.side===_i&&C.forceSinglePass===!1?(C.side=ri,C.needsUpdate=!0,za(C,tt,ot),C.side=Vs,C.needsUpdate=!0,za(C,tt,ot),C.side=_i):za(C,tt,ot)}this.compile=function(C,tt,pt=null){pt===null&&(pt=C),q!==null&&q.renderStart(C,tt,pt),w=Rt.get(pt),w.init(tt),y.push(w),pt.traverseVisible(function(lt){lt.isLight&&lt.layers.test(tt.layers)&&(w.pushLight(lt),lt.castShadow&&w.pushShadow(lt))}),C!==pt&&C.traverseVisible(function(lt){lt.isLight&&lt.layers.test(tt.layers)&&(w.pushLight(lt),lt.castShadow&&w.pushShadow(lt))}),w.setupLights(),q!==null&&q.updateLights(w.state.lightsArray),Nt=this.localClippingEnabled,Ct=Vt.init(this.clippingPlanes,Nt),Ct===!0&&Vt.setGlobalState(this.clippingPlanes,tt),q!==null&&qt.render(w.state.shadowsArray,pt,tt);const ot=new Set;return C.traverse(function(lt){if(!(lt.isMesh||lt.isPoints||lt.isLine||lt.isSprite))return;const Xt=lt.material;if(Xt)if(Array.isArray(Xt))for(let Jt=0;Jt<Xt.length;Jt++){const kt=Xt[Jt];so(kt,pt,tt,lt),ot.add(kt)}else so(Xt,pt,tt,lt),ot.add(Xt)}),w=y.pop(),q!==null&&q.renderEnd(),ot},this.compileAsync=function(C,tt,pt=null){const ot=this.compile(C,tt,pt);return new Promise(lt=>{function Xt(){if(ot.forEach(function(Jt){const Zt=ct.get(Jt).currentProgram;(Zt===void 0||Zt.isReady())&&ot.delete(Jt)}),ot.size===0){lt(C);return}setTimeout(Xt,10)}Se.get("KHR_parallel_shader_compile")!==null?Xt():setTimeout(Xt,10)})};let Js=null;function Wi(C){Js&&Js(C)}function hn(){jn.stop()}function Un(){jn.start()}const jn=new Ix;jn.setAnimationLoop(Wi),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(C){Js=C,$t.setAnimationLoop(C),C===null?jn.stop():jn.start()},$t.addEventListener("sessionstart",hn),$t.addEventListener("sessionend",Un),this.render=function(C,tt){if(tt!==void 0&&tt.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;q!==null&&q.renderStart(C,tt);const pt=$t.enabled===!0&&$t.isPresenting===!0,ot=D!==null&&(Y===null||pt)&&D.begin(B,Y);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),tt.parent===null&&tt.matrixWorldAutoUpdate===!0&&tt.updateMatrixWorld(),$t.enabled===!0&&$t.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&($t.cameraAutoUpdate===!0&&$t.updateCamera(tt),tt=$t.getCamera()),C.isScene===!0&&C.onBeforeRender(B,C,tt,Y),w=Rt.get(C,y.length),w.init(tt),w.state.textureUnits=St.getTextureUnits(),y.push(w),Dt.multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse),gt.setFromProjectionMatrix(Dt,ta,tt.reversedDepth),Nt=this.localClippingEnabled,Ct=Vt.init(this.clippingPlanes,Nt),O=Tt.get(C,L.length),O.init(),L.push(O),$t.enabled===!0&&$t.isPresenting===!0){const Jt=B.xr.getDepthSensingMesh();Jt!==null&&gs(Jt,tt,-1/0,B.sortObjects)}gs(C,tt,0,B.sortObjects),O.finish(),q!==null&&q.updateLights(w.state.lightsArray),B.sortObjects===!0&&O.sort(wt,ee),ce=$t.enabled===!1||$t.isPresenting===!1||$t.hasDepthSensing()===!1,ce&&re.addToRenderList(O,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ct===!0&&Vt.beginShadows();const lt=w.state.shadowsArray;if(qt.render(lt,C,tt),Ct===!0&&Vt.endShadows(),(ot&&D.hasRenderPass())===!1){const Jt=O.opaque,kt=O.transmissive;if(w.setupLights(),tt.isArrayCamera){const Zt=tt.cameras;if(kt.length>0)for(let Kt=0,ve=Zt.length;Kt<ve;Kt++){const Ae=Zt[Kt];Ul(Jt,kt,C,Ae)}ce&&re.render(C);for(let Kt=0,ve=Zt.length;Kt<ve;Kt++){const Ae=Zt[Kt];Dl(O,C,Ae,Ae.viewport)}}else kt.length>0&&Ul(Jt,kt,C,tt),ce&&re.render(C),Dl(O,C,tt)}Y!==null&&F===0&&(St.updateMultisampleRenderTarget(Y),St.updateRenderTargetMipmap(Y)),ot&&D.end(B),C.isScene===!0&&C.onAfterRender(B,C,tt),Yt.resetDefaultState(),k=-1,W=null,y.pop(),y.length>0?(w=y[y.length-1],St.setTextureUnits(w.state.textureUnits),Ct===!0&&Vt.setGlobalState(B.clippingPlanes,w.state.camera)):w=null,L.pop(),L.length>0?O=L[L.length-1]:O=null,q!==null&&q.renderEnd()};function gs(C,tt,pt,ot){if(C.visible===!1)return;if(C.layers.test(tt.layers)){if(C.isGroup)pt=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(tt);else if(C.isLightProbeGrid)w.pushLightProbeGrid(C);else if(C.isLight)w.pushLight(C),C.castShadow&&w.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(gt)){ot&&ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Dt);const Jt=yt.update(C),kt=C.material;kt.visible&&O.push(C,Jt,kt,pt,ae.z,null,tt)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(gt))){const Jt=yt.update(C),kt=C.material;if(ot&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ae.copy(C.boundingSphere.center)):(Jt.boundingSphere===null&&Jt.computeBoundingSphere(),ae.copy(Jt.boundingSphere.center)),ae.applyMatrix4(C.matrixWorld).applyMatrix4(Dt)),Array.isArray(kt)){const Zt=Jt.groups;for(let Kt=0,ve=Zt.length;Kt<ve;Kt++){const Ae=Zt[Kt],te=kt[Ae.materialIndex];te&&te.visible&&O.push(C,Jt,te,pt,ae.z,Ae,tt)}}else kt.visible&&O.push(C,Jt,kt,pt,ae.z,null,tt)}}const Xt=C.children;for(let Jt=0,kt=Xt.length;Jt<kt;Jt++)gs(Xt[Jt],tt,pt,ot)}function Dl(C,tt,pt,ot){const{opaque:lt,transmissive:Xt,transparent:Jt}=C;w.setupLightsView(pt),Ct===!0&&Vt.setGlobalState(B.clippingPlanes,pt),ot&&T.viewport(R.copy(ot)),lt.length>0&&vs(lt,tt,pt),Xt.length>0&&vs(Xt,tt,pt),Jt.length>0&&vs(Jt,tt,pt),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function Ul(C,tt,pt,ot){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[ot.id]===void 0){const te=Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[ot.id]=new Jn(1,1,{generateMipmaps:!0,type:te?Dn:En,minFilter:Na,samples:Math.max(4,G.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ne.workingColorSpace})}const Xt=w.state.transmissionRenderTarget[ot.id],Jt=ot.viewport||R;Xt.setSize(Jt.z*B.transmissionResolutionScale,Jt.w*B.transmissionResolutionScale);const kt=B.getRenderTarget(),Zt=B.getActiveCubeFace(),Kt=B.getActiveMipmapLevel();B.setRenderTarget(Xt),B.getClearColor(mt),Lt=B.getClearAlpha(),Lt<1&&B.setClearColor(16777215,.5),B.clear(),ce&&re.render(pt);const ve=B.toneMapping;B.toneMapping=ea;const Ae=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),w.setupLightsView(ot),Ct===!0&&Vt.setGlobalState(B.clippingPlanes,ot),vs(C,pt,ot),St.updateMultisampleRenderTarget(Xt),St.updateRenderTargetMipmap(Xt),Se.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let Ie=0,je=tt.length;Ie<je;Ie++){const Je=tt[Ie],{object:Ee,geometry:pn,material:Qt,group:yn}=Je;if(Qt.side===_i&&Ee.layers.test(ot.layers)){const be=Qt.side;Qt.side=ri,Qt.needsUpdate=!0,Fa(Ee,pt,ot,pn,Qt,yn),Qt.side=be,Qt.needsUpdate=!0,te=!0}}te===!0&&(St.updateMultisampleRenderTarget(Xt),St.updateRenderTargetMipmap(Xt))}B.setRenderTarget(kt,Zt,Kt),B.setClearColor(mt,Lt),Ae!==void 0&&(ot.viewport=Ae),B.toneMapping=ve}function vs(C,tt,pt){const ot=tt.isScene===!0?tt.overrideMaterial:null;for(let lt=0,Xt=C.length;lt<Xt;lt++){const Jt=C[lt],{object:kt,geometry:Zt,group:Kt}=Jt;let ve=Jt.material;ve.allowOverride===!0&&ot!==null&&(ve=ot),kt.layers.test(pt.layers)&&Fa(kt,tt,pt,Zt,ve,Kt)}}function Fa(C,tt,pt,ot,lt,Xt){q!==null&&lt.isNodeMaterial&&q.setObject(C,lt),C.onBeforeRender(B,tt,pt,ot,lt,Xt),C.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),lt.onBeforeRender(B,tt,pt,ot,C,Xt),lt.transparent===!0&&lt.side===_i&&lt.forceSinglePass===!1?(lt.side=ri,lt.needsUpdate=!0,B.renderBufferDirect(pt,tt,ot,lt,C,Xt),lt.side=Vs,lt.needsUpdate=!0,B.renderBufferDirect(pt,tt,ot,lt,C,Xt),lt.side=_i):B.renderBufferDirect(pt,tt,ot,lt,C,Xt),C.onAfterRender(B,tt,pt,ot,lt,Xt)}function za(C,tt,pt){tt.isScene!==!0&&(tt=jt);const ot=ct.get(C),lt=w.state.lights,Xt=w.state.shadowsArray,Jt=lt.state.version,kt=st.getParameters(C,lt.state,Xt,tt,pt,w.state.lightProbeGridArray),Zt=st.getProgramCacheKey(kt);let Kt=ot.programs;ot.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?tt.environment:null,ot.fog=tt.fog;const ve=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ot.envMap=Ot.get(C.envMap||ot.environment,ve),ot.envMapRotation=ot.environment!==null&&C.envMap===null?tt.environmentRotation:C.envMapRotation,Kt===void 0&&(C.addEventListener("dispose",oi),Kt=new Map,ot.programs=Kt);let Ae=Kt.get(Zt);if(Ae!==void 0){if(ot.currentProgram===Ae&&ot.lightsStateVersion===Jt)return ra(C,kt),Ae}else kt.uniforms=st.getUniforms(C),q!==null&&C.isNodeMaterial&&q.build(C,pt,kt),C.onBeforeCompile(kt,B),Ae=st.acquireProgram(kt,Zt),Kt.set(Zt,Ae),ot.uniforms=kt.uniforms;const te=ot.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(te.clippingPlanes=Vt.uniform),ra(C,kt),ot.needsLights=Ll(C),ot.lightsStateVersion=Jt,ot.needsLights&&(te.ambientLightColor.value=lt.state.ambient,te.lightProbe.value=lt.state.probe,te.sunLights.value=lt.state.sun,te.sunLightShadows.value=lt.state.sunShadow,te.directionalLights.value=lt.state.directional,te.directionalLightShadows.value=lt.state.directionalShadow,te.spotLights.value=lt.state.spot,te.spotLightShadows.value=lt.state.spotShadow,te.rectAreaLights.value=lt.state.rectArea,te.ltc_1.value=lt.state.rectAreaLTC1,te.ltc_2.value=lt.state.rectAreaLTC2,te.pointLights.value=lt.state.point,te.pointLightShadows.value=lt.state.pointShadow,te.hemisphereLights.value=lt.state.hemi,te.sunShadowMatrix.value=lt.state.sunShadowMatrix,te.sunShadowCascade.value=lt.state.sunShadowCascade,te.directionalShadowMatrix.value=lt.state.directionalShadowMatrix,te.spotLightMatrix.value=lt.state.spotLightMatrix,te.spotLightMap.value=lt.state.spotLightMap,te.pointShadowMatrix.value=lt.state.pointShadowMatrix),ot.lightProbeGrid=w.state.lightProbeGridArray.length>0,ot.currentProgram=Ae,ot.uniformsList=null,Ae}function sa(C){if(C.uniformsList===null){const tt=C.currentProgram.getUniforms();C.uniformsList=Su.seqWithValue(tt.seq,C.uniforms)}return C.uniformsList}function ra(C,tt){const pt=ct.get(C);pt.outputColorSpace=tt.outputColorSpace,pt.batching=tt.batching,pt.batchingColor=tt.batchingColor,pt.instancing=tt.instancing,pt.instancingColor=tt.instancingColor,pt.instancingMorph=tt.instancingMorph,pt.skinning=tt.skinning,pt.morphTargets=tt.morphTargets,pt.morphNormals=tt.morphNormals,pt.morphColors=tt.morphColors,pt.morphTargetsCount=tt.morphTargetsCount,pt.numClippingPlanes=tt.numClippingPlanes,pt.numIntersection=tt.numClipIntersection,pt.vertexAlphas=tt.vertexAlphas,pt.vertexTangents=tt.vertexTangents,pt.toneMapping=tt.toneMapping}function _s(C,tt){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;A.setFromMatrixPosition(tt.matrixWorld);for(let pt=0,ot=C.length;pt<ot;pt++){const lt=C[pt];if(lt.texture!==null&&lt.boundingBox.containsPoint(A))return lt}return null}function Ba(C,tt,pt,ot,lt){tt.isScene!==!0&&(tt=jt),St.resetTextureUnits();const Xt=tt.fog,Jt=ot.isMeshStandardMaterial||ot.isMeshLambertMaterial||ot.isMeshPhongMaterial?tt.environment:null,kt=Y===null?B.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Ne.workingColorSpace,Zt=ot.isMeshStandardMaterial||ot.isMeshLambertMaterial&&!ot.envMap||ot.isMeshPhongMaterial&&!ot.envMap,Kt=Ot.get(ot.envMap||Jt,Zt),ve=ot.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,Ae=!!pt.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),te=!!pt.morphAttributes.position,Ie=!!pt.morphAttributes.normal,je=!!pt.morphAttributes.color;let Je=ea;ot.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Je=B.toneMapping);const Ee=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,pn=Ee!==void 0?Ee.length:0,Qt=ct.get(ot),yn=w.state.lights;if(Ct===!0&&(Nt===!0||C!==W)){const qe=C===W&&ot.id===k;Vt.setState(ot,C,qe)}let be=!1;ot.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==yn.state.version||Qt.outputColorSpace!==kt||lt.isBatchedMesh&&Qt.batching===!1||!lt.isBatchedMesh&&Qt.batching===!0||lt.isBatchedMesh&&Qt.batchingColor===!0&&lt._colorsTexture===null||lt.isBatchedMesh&&Qt.batchingColor===!1&&lt._colorsTexture!==null||lt.isInstancedMesh&&Qt.instancing===!1||!lt.isInstancedMesh&&Qt.instancing===!0||lt.isSkinnedMesh&&Qt.skinning===!1||!lt.isSkinnedMesh&&Qt.skinning===!0||lt.isInstancedMesh&&Qt.instancingColor===!0&&lt.instanceColor===null||lt.isInstancedMesh&&Qt.instancingColor===!1&&lt.instanceColor!==null||lt.isInstancedMesh&&Qt.instancingMorph===!0&&lt.morphTexture===null||lt.isInstancedMesh&&Qt.instancingMorph===!1&&lt.morphTexture!==null||Qt.envMap!==Kt||ot.fog===!0&&Qt.fog!==Xt||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==Vt.numPlanes||Qt.numIntersection!==Vt.numIntersection)||Qt.vertexAlphas!==ve||Qt.vertexTangents!==Ae||Qt.morphTargets!==te||Qt.morphNormals!==Ie||Qt.morphColors!==je||Qt.toneMapping!==Je||Qt.morphTargetsCount!==pn||!!Qt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(be=!0):(be=!0,Qt.__version=ot.version);let kn=Qt.currentProgram;be===!0&&(kn=za(ot,tt,lt),q&&ot.isNodeMaterial&&q.onUpdateProgram(ot,kn,Qt));let li=!1,Xn=!1,Ha=!1;const Be=kn.getUniforms(),nn=Qt.uniforms;if(T.useProgram(kn.program)&&(li=!0,Xn=!0,Ha=!0),ot.id!==k&&(k=ot.id,Xn=!0),Qt.needsLights){const qe=_s(w.state.lightProbeGridArray,lt);Qt.lightProbeGrid!==qe&&(Qt.lightProbeGrid=qe,Xn=!0)}if(li||W!==C){T.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Be.setValue(j,"projectionMatrix",C.projectionMatrix),Be.setValue(j,"viewMatrix",C.matrixWorldInverse);const qi=Be.map.cameraPosition;qi!==void 0&&qi.setValue(j,It.setFromMatrixPosition(C.matrixWorld)),G.logarithmicDepthBuffer&&Be.setValue(j,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Be.setValue(j,"isOrthographic",C.isOrthographicCamera===!0),W!==C&&(W=C,Xn=!0,Ha=!0)}if(Qt.needsLights&&(yn.state.sunShadowMap.length>0&&Be.setValue(j,"sunShadowMap",yn.state.sunShadowMap,St),yn.state.directionalShadowMap.length>0&&Be.setValue(j,"directionalShadowMap",yn.state.directionalShadowMap,St),yn.state.spotShadowMap.length>0&&Be.setValue(j,"spotShadowMap",yn.state.spotShadowMap,St),yn.state.pointShadowMap.length>0&&Be.setValue(j,"pointShadowMap",yn.state.pointShadowMap,St)),lt.isSkinnedMesh){Be.setOptional(j,lt,"bindMatrix"),Be.setOptional(j,lt,"bindMatrixInverse");const qe=lt.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),Be.setValue(j,"boneTexture",qe.boneTexture,St))}lt.isBatchedMesh&&(Be.setOptional(j,lt,"batchingTexture"),Be.setValue(j,"batchingTexture",lt._matricesTexture,St),Be.setOptional(j,lt,"batchingIdTexture"),Be.setValue(j,"batchingIdTexture",lt._indirectTexture,St),Be.setOptional(j,lt,"batchingColorTexture"),lt._colorsTexture!==null&&Be.setValue(j,"batchingColorTexture",lt._colorsTexture,St));const yi=pt.morphAttributes;if((yi.position!==void 0||yi.normal!==void 0||yi.color!==void 0)&&$.update(lt,pt,kn),(Xn||Qt.receiveShadow!==lt.receiveShadow)&&(Qt.receiveShadow=lt.receiveShadow,Be.setValue(j,"receiveShadow",lt.receiveShadow)),(ot.isMeshStandardMaterial||ot.isMeshLambertMaterial||ot.isMeshPhongMaterial)&&ot.envMap===null&&tt.environment!==null&&(nn.envMapIntensity.value=tt.environmentIntensity),nn.dfgLUT!==void 0&&(nn.dfgLUT.value=w3()),Xn){if(Be.setValue(j,"toneMappingExposure",B.toneMappingExposure),Qt.needsLights&&dn(nn,Ha),Xt&&ot.fog===!0&&xt.refreshFogUniforms(nn,Xt),xt.refreshMaterialUniforms(nn,ot,dt,nt,w.state.transmissionRenderTarget[C.id]),Qt.needsLights&&Qt.lightProbeGrid){const qe=Qt.lightProbeGrid;nn.probesSH.value=qe.texture,nn.probesMin.value.copy(qe.boundingBox.min),nn.probesMax.value.copy(qe.boundingBox.max),nn.probesResolution.value.copy(qe.resolution)}Su.upload(j,sa(Qt),nn,St)}if(ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(Su.upload(j,sa(Qt),nn,St),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Be.setValue(j,"center",lt.center),Be.setValue(j,"modelViewMatrix",lt.modelViewMatrix),Be.setValue(j,"normalMatrix",lt.normalMatrix),Be.setValue(j,"modelMatrix",lt.matrixWorld),ot.uniformsGroups!==void 0){const qe=ot.uniformsGroups;for(let qi=0,Oi=qe.length;qi<Oi;qi++){const Mi=qe[qi];Ut.update(Mi,kn),Ut.bind(Mi,kn)}}return kn}function dn(C,tt){C.ambientLightColor.needsUpdate=tt,C.lightProbe.needsUpdate=tt,C.sunLights.needsUpdate=tt,C.sunLightShadows.needsUpdate=tt,C.directionalLights.needsUpdate=tt,C.directionalLightShadows.needsUpdate=tt,C.pointLights.needsUpdate=tt,C.pointLightShadows.needsUpdate=tt,C.spotLights.needsUpdate=tt,C.spotLightShadows.needsUpdate=tt,C.rectAreaLights.needsUpdate=tt,C.hemisphereLights.needsUpdate=tt}function Ll(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(C,tt,pt){const ot=ct.get(C);ot.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ot.__autoAllocateDepthBuffer===!1&&(ot.__useRenderToTexture=!1),ct.get(C.texture).__webglTexture=tt,ct.get(C.depthTexture).__webglTexture=ot.__autoAllocateDepthBuffer?void 0:pt,ot.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,tt){const pt=ct.get(C);pt.__webglFramebuffer=tt,pt.__useDefaultFramebuffer=tt===void 0},this.setRenderTarget=function(C,tt=0,pt=0){Y=C,P=tt,F=pt;let ot=null,lt=!1,Xt=!1;if(C){const kt=ct.get(C);if(kt.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(j.FRAMEBUFFER,kt.__webglFramebuffer),R.copy(C.viewport),K.copy(C.scissor),it=C.scissorTest,T.viewport(R),T.scissor(K),T.setScissorTest(it),k=-1;return}else if(kt.__webglFramebuffer===void 0)St.setupRenderTarget(C);else if(kt.__hasExternalTextures)St.rebindTextures(C,ct.get(C.texture).__webglTexture,ct.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ve=C.depthTexture;if(kt.__boundDepthTexture!==ve){if(ve!==null&&ct.has(ve)&&(C.width!==ve.image.width||C.height!==ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");St.setupDepthRenderbuffer(C)}}const Zt=C.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Xt=!0);const Kt=ct.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Kt[tt])?ot=Kt[tt][pt]:ot=Kt[tt],lt=!0):C.samples>0&&St.useMultisampledRTT(C)===!1?ot=ct.get(C).__webglMultisampledFramebuffer:Array.isArray(Kt)?ot=Kt[pt]:ot=Kt,R.copy(C.viewport),K.copy(C.scissor),it=C.scissorTest}else R.copy(zt).multiplyScalar(dt).floor(),K.copy(ie).multiplyScalar(dt).floor(),it=ue;if(pt!==0&&(ot=Z),T.bindFramebuffer(j.FRAMEBUFFER,ot)&&T.drawBuffers(C,ot),T.viewport(R),T.scissor(K),T.setScissorTest(it),lt){const kt=ct.get(C.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+tt,kt.__webglTexture,pt)}else if(Xt){const kt=tt;for(let Zt=0;Zt<C.textures.length;Zt++){const Kt=ct.get(C.textures[Zt]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+Zt,Kt.__webglTexture,pt,kt)}}else if(C!==null&&pt!==0){const kt=ct.get(C.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,kt.__webglTexture,pt)}k=-1};function ro(C){const tt=ct.get(C);return(tt.__readFormat!==C.format||tt.__readType!==C.type)&&(tt.__readFormat=C.format,tt.__readType=C.type,tt.__formatReadable=G.textureFormatReadable(C.format),tt.__typeReadable=G.textureTypeReadable(C.type)),tt}this.readRenderTargetPixels=function(C,tt,pt,ot,lt,Xt,Jt,kt=0){if(!(C&&C.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Zt=ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Jt!==void 0&&(Zt=Zt[Jt]),Zt){T.bindFramebuffer(j.FRAMEBUFFER,Zt);try{const Kt=C.textures[kt],ve=Kt.format,Ae=Kt.type;C.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+kt);const te=ro(Kt);if(te.__formatReadable===!1){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(te.__typeReadable===!1){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}tt>=0&&tt<=C.width-ot&&pt>=0&&pt<=C.height-lt&&j.readPixels(tt,pt,ot,lt,Gt.convert(ve),Gt.convert(Ae),Xt)}finally{const Kt=Y!==null?ct.get(Y).__webglFramebuffer:null;T.bindFramebuffer(j.FRAMEBUFFER,Kt)}}},this.readRenderTargetPixelsAsync=async function(C,tt,pt,ot,lt,Xt,Jt,kt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Zt=ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Jt!==void 0&&(Zt=Zt[Jt]),Zt)if(tt>=0&&tt<=C.width-ot&&pt>=0&&pt<=C.height-lt){T.bindFramebuffer(j.FRAMEBUFFER,Zt);const Kt=C.textures[kt],ve=Kt.format,Ae=Kt.type;C.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+kt);const te=ro(Kt);if(te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,Ie),j.bufferData(j.PIXEL_PACK_BUFFER,Xt.byteLength,j.STREAM_READ),j.readPixels(tt,pt,ot,lt,Gt.convert(ve),Gt.convert(Ae),0),j.bindBuffer(j.PIXEL_PACK_BUFFER,null);const je=Y!==null?ct.get(Y).__webglFramebuffer:null;T.bindFramebuffer(j.FRAMEBUFFER,je);const Je=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await XM(j,Je,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,Ie),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,Xt),j.bindBuffer(j.PIXEL_PACK_BUFFER,null),j.deleteBuffer(Ie),j.deleteSync(Je),Xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,tt=null,pt=0){const ot=Math.pow(2,-pt),lt=Math.floor(C.image.width*ot),Xt=Math.floor(C.image.height*ot),Jt=tt!==null?tt.x:0,kt=tt!==null?tt.y:0;St.setTexture2D(C,0),j.copyTexSubImage2D(j.TEXTURE_2D,pt,0,0,Jt,kt,lt,Xt),T.unbindTexture()},this.copyTextureToTexture=function(C,tt,pt=null,ot=null,lt=0,Xt=0){let Jt,kt,Zt,Kt,ve,Ae,te,Ie,je;const Je=C.isCompressedTexture?C.mipmaps[Xt]:C.image;if(pt!==null)Jt=pt.max.x-pt.min.x,kt=pt.max.y-pt.min.y,Zt=pt.isBox3?pt.max.z-pt.min.z:1,Kt=pt.min.x,ve=pt.min.y,Ae=pt.isBox3?pt.min.z:0;else{const nn=Math.pow(2,-lt);Jt=Math.floor(Je.width*nn),kt=Math.floor(Je.height*nn),C.isDataArrayTexture?Zt=Je.depth:C.isData3DTexture?Zt=Math.floor(Je.depth*nn):Zt=1,Kt=0,ve=0,Ae=0}ot!==null?(te=ot.x,Ie=ot.y,je=ot.z):(te=0,Ie=0,je=0);const Ee=Gt.convert(tt.format),pn=Gt.convert(tt.type);let Qt;tt.isData3DTexture?(St.setTexture3D(tt,0),Qt=j.TEXTURE_3D):tt.isDataArrayTexture||tt.isCompressedArrayTexture?(St.setTexture2DArray(tt,0),Qt=j.TEXTURE_2D_ARRAY):(St.setTexture2D(tt,0),Qt=j.TEXTURE_2D),T.activeTexture(j.TEXTURE0),T.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,tt.flipY),T.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,tt.premultiplyAlpha),T.pixelStorei(j.UNPACK_ALIGNMENT,tt.unpackAlignment);const yn=T.getParameter(j.UNPACK_ROW_LENGTH),be=T.getParameter(j.UNPACK_IMAGE_HEIGHT),kn=T.getParameter(j.UNPACK_SKIP_PIXELS),li=T.getParameter(j.UNPACK_SKIP_ROWS),Xn=T.getParameter(j.UNPACK_SKIP_IMAGES);T.pixelStorei(j.UNPACK_ROW_LENGTH,Je.width),T.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Je.height),T.pixelStorei(j.UNPACK_SKIP_PIXELS,Kt),T.pixelStorei(j.UNPACK_SKIP_ROWS,ve),T.pixelStorei(j.UNPACK_SKIP_IMAGES,Ae);const Ha=C.isDataArrayTexture||C.isData3DTexture,Be=tt.isDataArrayTexture||tt.isData3DTexture;if(C.isDepthTexture){const nn=ct.get(C),yi=ct.get(tt),qe=ct.get(nn.__renderTarget),qi=ct.get(yi.__renderTarget);T.bindFramebuffer(j.READ_FRAMEBUFFER,qe.__webglFramebuffer),T.bindFramebuffer(j.DRAW_FRAMEBUFFER,qi.__webglFramebuffer);for(let Oi=0;Oi<Zt;Oi++)Ha&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,ct.get(C).__webglTexture,lt,Ae+Oi),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,ct.get(tt).__webglTexture,Xt,je+Oi)),j.blitFramebuffer(Kt,ve,Jt,kt,te,Ie,Jt,kt,j.DEPTH_BUFFER_BIT,j.NEAREST);T.bindFramebuffer(j.READ_FRAMEBUFFER,null),T.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(lt!==0||C.isRenderTargetTexture||ct.has(C)){const nn=ct.get(C),yi=ct.get(tt);T.bindFramebuffer(j.READ_FRAMEBUFFER,I),T.bindFramebuffer(j.DRAW_FRAMEBUFFER,X);for(let qe=0;qe<Zt;qe++)Ha?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,nn.__webglTexture,lt,Ae+qe):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,nn.__webglTexture,lt),Be?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,yi.__webglTexture,Xt,je+qe):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,yi.__webglTexture,Xt),lt!==0?j.blitFramebuffer(Kt,ve,Jt,kt,te,Ie,Jt,kt,j.COLOR_BUFFER_BIT,j.NEAREST):Be?j.copyTexSubImage3D(Qt,Xt,te,Ie,je+qe,Kt,ve,Jt,kt):j.copyTexSubImage2D(Qt,Xt,te,Ie,Kt,ve,Jt,kt);T.bindFramebuffer(j.READ_FRAMEBUFFER,null),T.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else Be?C.isDataTexture||C.isData3DTexture?j.texSubImage3D(Qt,Xt,te,Ie,je,Jt,kt,Zt,Ee,pn,Je.data):tt.isCompressedArrayTexture?j.compressedTexSubImage3D(Qt,Xt,te,Ie,je,Jt,kt,Zt,Ee,Je.data):j.texSubImage3D(Qt,Xt,te,Ie,je,Jt,kt,Zt,Ee,pn,Je):C.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,Xt,te,Ie,Jt,kt,Ee,pn,Je.data):C.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,Xt,te,Ie,Je.width,Je.height,Ee,Je.data):j.texSubImage2D(j.TEXTURE_2D,Xt,te,Ie,Jt,kt,Ee,pn,Je);T.pixelStorei(j.UNPACK_ROW_LENGTH,yn),T.pixelStorei(j.UNPACK_IMAGE_HEIGHT,be),T.pixelStorei(j.UNPACK_SKIP_PIXELS,kn),T.pixelStorei(j.UNPACK_SKIP_ROWS,li),T.pixelStorei(j.UNPACK_SKIP_IMAGES,Xn),Xt===0&&tt.generateMipmaps&&j.generateMipmap(Qt),T.unbindTexture()},this.initRenderTarget=function(C){ct.get(C).__webglFramebuffer===void 0&&St.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?St.setTextureCube(C,0):C.isData3DTexture?St.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?St.setTexture2DArray(C,0):St.setTexture2D(C,0),T.unbindTexture()},this.resetState=function(){P=0,F=0,Y=null,T.reset(),Yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ta}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Ne._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ne._getUnpackColorSpace()}}class Iu extends bn{constructor(t,n={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,o=n.color!==void 0?new xe(n.color):new xe(8355711),c=n.textureWidth||512,u=n.textureHeight||512,p=n.clipBias||0,d=n.shader||Iu.ReflectorShader,h=n.multisample!==void 0?n.multisample:4,g=new Da,v=new J,_=new J,x=new J,b=new Ge,U=new J(0,0,-1),M=new en,S=new J,z=new J,H=new en,A=new Ge,O=new Jn(c,u,{samples:h,type:Dn}),w=new Ni({name:d.name!==void 0?d.name:"unspecified",uniforms:Ox.clone(d.uniforms),fragmentShader:d.fragmentShader,vertexShader:d.vertexShader});w.uniforms.tDiffuse.value=O.texture,w.uniforms.color.value=o,w.uniforms.textureMatrix.value=A,this.material=w,this.onBeforeRender=function(L,y,D){const B=this.getReflectionCamera(D);if(_.setFromMatrixPosition(a.matrixWorld),x.setFromMatrixPosition(D.matrixWorld),b.extractRotation(a.matrixWorld),v.set(0,0,1),v.applyMatrix4(b),S.subVectors(_,x),S.dot(v)>0===!0&&this.forceUpdate===!1)return;S.reflect(v).negate(),S.add(_),b.extractRotation(D.matrixWorld),U.set(0,0,-1),U.applyMatrix4(b),U.add(x),z.subVectors(_,U),z.reflect(v).negate(),z.add(_),B.position.copy(S),B.up.set(0,1,0),B.up.applyMatrix4(b),B.up.reflect(v),B.lookAt(z),B.far=D.far,B.updateMatrixWorld(),B.projectionMatrix.copy(D.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(B.projectionMatrix),A.multiply(B.matrixWorldInverse),A.multiply(a.matrixWorld),g.setFromNormalAndCoplanarPoint(v,_),g.applyMatrix4(B.matrixWorldInverse),M.set(g.normal.x,g.normal.y,g.normal.z,g.constant);const q=B.projectionMatrix;B.isOrthographicCamera?(H.x=(Math.sign(M.x)+q.elements[8])/q.elements[0],H.y=(Math.sign(M.y)+q.elements[9])/q.elements[5],H.z=-D.far,H.w=1):(H.x=(Math.sign(M.x)+q.elements[8])/q.elements[0],H.y=(Math.sign(M.y)+q.elements[9])/q.elements[5],H.z=-1,H.w=(1+q.elements[10])/q.elements[14]),M.multiplyScalar(2/M.dot(H)),q.elements[2]=M.x,q.elements[6]=M.y,B.isOrthographicCamera?(q.elements[10]=M.z-p,q.elements[14]=M.w-1):(q.elements[10]=M.z+1-p,q.elements[14]=M.w),a.visible=!1;const Z=L.getRenderTarget(),I=L.xr.enabled,X=L.shadowMap.autoUpdate;L.xr.enabled=!1,L.shadowMap.autoUpdate=!1,L.setRenderTarget(O),L.state.buffers.depth.setMask(!0),L.autoClear===!1&&L.clear(),L.render(y,B),L.xr.enabled=I,L.shadowMap.autoUpdate=X,L.setRenderTarget(Z);const P=D.viewport;P!==void 0&&L.state.viewport(P),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return O},this.dispose=function(){O.dispose(),a.material.dispose()},this.getReflectionCamera=function(L){let y=this._reflectionCameras.get(L);return y===void 0&&(y=L.clone(),this._reflectionCameras.set(L,y)),y}}}Iu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};class C3 extends ME{constructor(t){super(t),this.type=Dn}parse(t){const u=function(y,D){switch(y){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(D||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(D||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(D||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(D||""))}},v=function(y,D,B){D=D||1024;let q=y.pos,Z=-1,I=0,X="",P=String.fromCharCode.apply(null,new Uint16Array(y.subarray(q,q+128)));for(;0>(Z=P.indexOf(`
`))&&I<D&&q<y.byteLength;)X+=P,I+=P.length,q+=128,P=String.fromCharCode.apply(null,new Uint16Array(y.subarray(q,q+128)));return-1<Z?(y.pos+=I+Z+1,X+P.slice(0,Z)):!1},_=function(y){const D=/^#\?(\S+)/,B=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,V=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,q=/^\s*FORMAT=(\S+)\s*$/,Z=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,I={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let X,P;for((y.pos>=y.byteLength||!(X=v(y)))&&u(1,"no header found"),(P=X.match(D))||u(3,"bad initial token"),I.valid|=1,I.programtype=P[1],I.string+=X+`
`;X=v(y),X!==!1;){if(I.string+=X+`
`,X.charAt(0)==="#"){I.comments+=X+`
`;continue}if((P=X.match(B))&&(I.gamma=parseFloat(P[1])),(P=X.match(V))&&(I.exposure=parseFloat(P[1])),(P=X.match(q))&&(I.valid|=2,I.format=P[1]),(P=X.match(Z))&&(I.valid|=4,I.height=parseInt(P[1],10),I.width=parseInt(P[2],10)),I.valid&2&&I.valid&4)break}return I.valid&2||u(3,"missing format specifier"),I.valid&4||u(3,"missing image size specifier"),I},x=function(y,D,B){const V=D;if(V<8||V>32767||y[0]!==2||y[1]!==2||y[2]&128)return new Uint8Array(y);V!==(y[2]<<8|y[3])&&u(3,"wrong scanline width");const q=new Uint8Array(4*D*B);q.length||u(4,"unable to allocate buffer space");let Z=0,I=0;const X=4*V,P=new Uint8Array(4),F=new Uint8Array(X);let Y=B;for(;Y>0&&I<y.byteLength;){I+4>y.byteLength&&u(1),P[0]=y[I++],P[1]=y[I++],P[2]=y[I++],P[3]=y[I++],(P[0]!=2||P[1]!=2||(P[2]<<8|P[3])!=V)&&u(3,"bad rgbe scanline format");let k=0,W;for(;k<X&&I<y.byteLength;){W=y[I++];const K=W>128;if(K&&(W-=128),(W===0||k+W>X)&&u(3,"bad scanline data"),K){const it=y[I++];for(let mt=0;mt<W;mt++)F[k++]=it}else F.set(y.subarray(I,I+W),k),k+=W,I+=W}const R=V;for(let K=0;K<R;K++){let it=0;q[Z]=F[K+it],it+=V,q[Z+1]=F[K+it],it+=V,q[Z+2]=F[K+it],it+=V,q[Z+3]=F[K+it],Z+=4}Y--}return q},b=function(y,D,B,V){const q=y[D+3],Z=Math.pow(2,q-128)/255;B[V+0]=y[D+0]*Z,B[V+1]=y[D+1]*Z,B[V+2]=y[D+2]*Z,B[V+3]=1},U=function(y,D,B,V){const q=y[D+3],Z=Math.pow(2,q-128)/255;B[V+0]=Zc.toHalfFloat(Math.min(y[D+0]*Z,65504)),B[V+1]=Zc.toHalfFloat(Math.min(y[D+1]*Z,65504)),B[V+2]=Zc.toHalfFloat(Math.min(y[D+2]*Z,65504)),B[V+3]=Zc.toHalfFloat(1)},M=new Uint8Array(t);M.pos=0;const S=_(M),z=S.width,H=S.height,A=x(M.subarray(M.pos),z,H);let O,w,L;switch(this.type){case Si:L=A.length/4;const y=new Float32Array(L*4);for(let B=0;B<L;B++)b(A,B*4,y,B*4);O=y,w=Si;break;case Dn:L=A.length/4;const D=new Uint16Array(L*4);for(let B=0;B<L;B++)U(A,B*4,D,B*4);O=D,w=Dn;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:z,height:H,data:O,header:S.string,gamma:S.gamma,exposure:S.exposure,type:w,colorSpace:Jr,minFilter:rn,magFilter:rn,generateMipmaps:!1,flipY:!0}}setDataType(t){return this.type=t,this}}async function D3(){const r=await new C3().setDataType(Dn).loadAsync("/immersive-worlds/cafe/room-environment.hdr");return r.mapping=Tl,r.internalFormat="RGBA16F",r.colorSpace=Jr,r.flipY=!1,r.generateMipmaps=!1,r.minFilter=r.magFilter=rn,r.needsUpdate=!0,r}function Vp(r){return{target:r.getRenderTarget(),face:r.getActiveCubeFace(),mip:r.getActiveMipmapLevel()}}function kp(r,t){(r.getRenderTarget()!==t.target||r.getActiveCubeFace()!==t.face||r.getActiveMipmapLevel()!==t.mip)&&r.setRenderTarget(t.target,t.face,t.mip)}function kx(r,t){const n=Vp(r);try{return t()}finally{kp(r,n)}}function Cu(r,t,n){return kx(r,()=>{var c;r.setRenderTarget(t);const a=r.getContext(),o=a.checkFramebufferStatus(a.FRAMEBUFFER);return{label:n,width:t.width,height:t.height,type:t.texture.type,format:t.texture.format,internalFormat:t.texture.internalFormat,samples:t.samples,depthTextureType:((c=t.depthTexture)==null?void 0:c.type)??null,status:o,complete:o===a.FRAMEBUFFER_COMPLETE}})}function du(r,t,n){const a=Cu(r,t,n);if(!a.complete)throw new Error(`Cafe ${n} framebuffer incomplete: 0x${a.status.toString(16)}`);return a}function ll(r,t){return r.texture.type=t,r.texture.format=Li,r.texture.internalFormat=t===Dn?"RGBA16F":"RGBA8",r.samples=0,r}function U3(r,t="auto"){const n=r.getContext(),a={colorBufferFloat:!!n.getExtension("EXT_color_buffer_float"),colorBufferHalfFloat:!!n.getExtension("EXT_color_buffer_half_float")},o=[],c=t==="auto"&&(a.colorBufferFloat||a.colorBufferHalfFloat)?[Dn,En]:[En];for(const u of c){const p=ll(new Jn(4,4,{depthBuffer:!0}),u);try{const d=Cu(r,p,"capability-probe");if(o.push(d),d.complete)return{type:u,preference:t,extensions:a,probes:o}}finally{p.dispose()}}throw new Error("Cafe requires a complete RGBA8 framebuffer")}function L3(r){const t=r.onBeforeRender;r.onBeforeRender=function(n,...a){const o=Vp(n),c=n.xr.enabled,u=n.shadowMap.autoUpdate,p=r.visible;try{return t.call(this,n,...a)}finally{r.visible=p,n.xr.enabled=c,n.shadowMap.autoUpdate=u,kp(n,o)}}}const N3={follow:.09,settle:.45},Z_=2.2;function O3(r,t,n){const a=o=>Number.isFinite(o)?o:0;return{yaw:n.yaw*Math.tanh(a(r)*Z_),pitch:-n.pitch*Math.tanh(a(t)*Z_)}}function K_(r,t,n,a,o){const c=2/a,u=c*o,p=1/(1+u+.48*u*u+.235*u*u*u),d=r-t,h=(n+c*d)*o,g=t+(d+h)*p;return t-r>0==g>t?[t,0]:[g,(n-c*h)*p]}class P3{constructor(t,n=N3){this.limit=t,this.feel=n,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(t,n){const a=O3(t,n,this.limit);this.targetYaw=a.yaw,this.targetPitch=a.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(t){if(!(t>0))return;const n=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=K_(this.yaw,this.targetYaw,this.yawVelocity,n,t),[this.pitch,this.pitchVelocity]=K_(this.pitch,this.targetPitch,this.pitchVelocity,n,t)}}function Xx(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function I3(r){const t=Xx(r),n=128,a=Float32Array.from({length:n*n},t);return(o,c)=>{const u=Math.floor(o),p=Math.floor(c),d=o-u,h=c-p,g=d*d*(3-2*d),v=h*h*(3-2*h),_=a[(p&127)*n+(u&127)],x=a[(p&127)*n+(u+1&127)],b=a[(p+1&127)*n+(u&127)],U=a[(p+1&127)*n+(u+1&127)];return _+(x-_)*g+(b-_)*v+(_-x-b+U)*g*v}}function pu(r){return Math.max(0,Math.min(255,Math.round(r)))}function F3(){const r=[],t=I3(36092),n=Xx(110640),a=(w,L,y)=>{const D=Array.from({length:3},()=>{const Z=document.createElement("canvas");return Z.width=w,Z.height=L,Z}),B=D.map(Z=>{const I=Z.getContext("2d");if(!I)throw new Error("Cafe surface canvas unavailable");return I}),V=B.map(Z=>Z.createImageData(w,L));for(let Z=0;Z<L;Z++)for(let I=0;I<w;I++){const[X,P,F,Y,k]=y(I/w,Z/L),W=(Z*w+I)*4;V[0].data[W]=pu(X),V[0].data[W+1]=pu(P),V[0].data[W+2]=pu(F),V[0].data[W+3]=255;for(let R=1;R<3;R++){const K=pu((R===1?Y:k)*255);V[R].data[W]=K,V[R].data[W+1]=K,V[R].data[W+2]=K,V[R].data[W+3]=255}}const q=D.map((Z,I)=>{B[I].putImageData(V[I],0,0);const X=new Op(Z);return X.colorSpace=I===0?Kn:Ua,X.wrapS=X.wrapT=gl,X.anisotropy=8,X.name=`cafe-local-surface-${r.length}`,r.push(X),X});return{map:q[0],bumpMap:q[1],roughnessMap:q[2]}},o=a(1024,1024,(w,L)=>{const y=t(w*1.7+17,L*23+39)-.5,D=(t(w*2.8,L*7)-.5)*.019+(t(w*9,L*3+71)-.5)*.0025,B=(w-.72)*3.1,V=(L-.38)*9.5,q=Math.sqrt(B*B+V*V+.008),Z=Math.exp(-(B*B*8+V*V*3)),I=L+D+Z*(q*.023-V*.018),X=I*46+t(w*.9+31,I*13)*5,P=Math.pow(Math.sin(X*Math.PI*2)*.5+.5,13)*(.22+t(w*9+53,I*51)*.78),F=t(w*7.5,I*390)-.5,Y=t(w*31+11,I*478+27)-.5,k=Math.pow(Math.max(0,(t(w*67+41,I*360)-.7)/.3),1.6),W=Math.pow(Math.max(0,(t(w*13+87,I*102+13)-.73)/.27),1.4),R=t(w*2.2+67,I*69+23)-.5,K=y*25+R*12+F*13+Y*4-P*10-k*28+W*16,it=Math.exp(-q*q*35)*8;return[147+K-it,134+K*.94-it*.9,116+K*.84-it*.75,.51+F*.1+Y*.025-P*.045-k*.2+W*.025,.69+y*.08+F*.075+k*.12-W*.03]}),c=a(512,512,(w,L)=>{const y=t(w*7,L*7)*.6+t(w*28,L*28)*.4-.5,D=n()-.5,B=y*11+D*3;return[190+B,181+B,158+B,.5+y*.12+D*.18,.9+y*.09]}),u=a(512,512,(w,L)=>{const y=w*104+t(w*10,L*8)*.24,D=L*104+t(w*8,L*10)*.24,B=(Math.floor(y)+Math.floor(D))%2,V=Math.pow(Math.sin(y*Math.PI),2),q=Math.pow(Math.sin(D*Math.PI),2),Z=B?V*.7+q*.3:q*.7+V*.3,I=n()-.5,X=t(w*14,L*14)-.5,P=t(w*3+21,L*93)*.5+t(w*93,L*3+43)*.5-.5,F=(Z-.5)*25+X*8+P*13+I*5;return[152+F,154+F,142+F*.92,.19+Z*.62+I*.07+P*.06,.95]}),p=a(512,256,(w,L)=>{const y=t(w*20,L*10)-.5,D=Math.pow(Math.max(0,(t(w*146+3,L*81+16)-.79)/.21),.85)*24,B=n()>.997?15:0,V=y*3-D-B;return[233+V,230+V,219+V*.92,.5+y*.026-D*7e-4,.67+y*.14+D*.0014]}),d=a(256,256,(w,L)=>{const y=t(w*90,L*90),D=t(w*12,L*12)-.5,B=(y-.5)*12+D*9;return[99+B,66+B*.75,44+B*.55,.2+y*.55,.67+y*.23]}),h=a(512,512,(w,L)=>{const y=n(),D=t(w*5,L*7),B=t(w*170,L*170),V=Math.min(1,Math.max(0,(D-.26)*2.1)),q=B*13+y*5-V*7;return[43+q,48+q,49+q,.43+B*(1-V)*.23+y*.04,.14+(1-V)*.55]}),g=new Gn({...o,roughness:1,bumpScale:.0045,envMapIntensity:.62});g.name="Cafe natural satin oak";const v=new Gn({...o,color:8485746,roughness:1,bumpScale:.004,envMapIntensity:.55});v.name="Cafe dark stained oak";const _=new Gn({...c,roughness:1,bumpScale:.014});_.name="Cafe limewashed plaster";const x=new Gn({...u,roughness:1,bumpScale:.004,envMapIntensity:.45});x.name="Cafe woven linen";const b=new xu({...p,roughness:.53,bumpScale:.001,clearcoat:.32,clearcoatRoughness:.26});b.name="Cafe speckled stoneware";const U=new Gn({color:11702865,metalness:.82,roughness:.29});U.name="Cafe brushed brass";const M=new xu({color:2692361,roughness:.15,metalness:.03,clearcoat:1,clearcoatRoughness:.06});M.name="Cafe fresh coffee";const S=new Gn({...d,roughness:.82,bumpScale:.006});S.name="Cafe cognac leather";const z=new xu({...h,roughness:.85,bumpScale:.012,clearcoat:.8,clearcoatRoughness:.1});z.name="Cafe rain-wet pavement";const H=new Gn({color:4154947,roughness:.73,side:_i});H.name="Cafe deep green foliage";const A=new Set([g,v,_,x,b,U,M,S,z,H]);let O=!1;return{oak:g,darkWood:v,plaster:_,fabric:x,ceramic:b,brass:U,coffee:M,leather:S,pavement:z,foliage:H,textures:r,dispose(){if(!O){O=!0;for(const w of A)w.dispose();for(const w of new Set(r))w.dispose()}}}}function z3(r,t=1){const n=new In;n.name="Cafe lanceolate plant",n.scale.setScalar(t);let a=437921;const o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296),c=(h,g,v=n)=>{const _=new bn(h,g);return _.castShadow=!0,_.receiveShadow=!0,v.add(_),_},u=[[0,.018],[.126,.018],[.138,.026],[.144,.052],[.163,.14],[.183,.26],[.193,.334],[.196,.35],[.193,.359],[.181,.359],[.178,.345],[.166,.285],[0,.285]].map(([h,g])=>new Ft(h,g)),p=c(new Rl(u,64),r.ceramic);p.name="Hollow stoneware plant pot";const d=c(new Lu(.173,40),r.darkWood);d.rotation.x=-Math.PI/2,d.position.y=.327,d.name="Recessed pot soil";for(let h=0;h<18;h++){const g=Math.floor(h/6),v=new In;v.name=`Curved pointed leaf ${h+1}`,v.rotation.y=h*2.399963+(o()-.5)*.31,n.add(v);const _=.065+o()*.036,x=.61+g*.115+o()*.045,b=.42-g*.046+o()*.072,U=.15+g*.04+o()*.07,M=.15-g*.04+o()*.04,S=.082+o()*.025-g*.009,z=(o()-.5)*.25,H=(o()-.5)*.035,A=Z=>new J(_+b*Z,x+Math.sin(Z*Math.PI*.88)*U-M*Z*Z,Math.sin(Z*Math.PI)*H),O=new yl([new J(_*.25,.324,0),new J(_*.4,.45+g*.045,.002),new J(_*.74,x-.05,0),A(0)]);c(new to(O,10,.0042-g*4e-4,5,!1),r.foliage,v);const w=[],L=[],y=[],D=16,B=6;for(let Z=0;Z<=D;Z++){const I=Z/D,X=A(I),P=Math.pow(Math.sin(I*Math.PI),.83)*(1.13-.48*I);for(let F=0;F<=B;F++){const Y=F/B*2-1,k=S*P*Y,W=Math.sin(I*Math.PI*7+h)*.0018*Y*Y*P,R=(1-Math.abs(Y))*.018*Math.sin(I*Math.PI),K=-Y*Y*.017*P,it=k*z*(I-.2);if(w.push(X.x,X.y+R+K+it+W,X.z+k),L.push(I,F/B),Z<D&&F<B){const mt=Z*(B+1)+F,Lt=mt+B+1;y.push(mt,mt+1,Lt,mt+1,Lt+1,Lt)}}}const V=new wn;V.setAttribute("position",new Oe(w,3)),V.setAttribute("uv",new Oe(L,2)),V.setIndex(y),V.computeVertexNormals(),c(V,r.foliage,v);const q=Array.from({length:13},(Z,I)=>{const X=I/12*.96,P=A(X);return P.y+=Math.sin(X*Math.PI)*.018+5e-4,P});c(new to(new yl(q),16,.0014,4,!1),r.foliage,v)}return n}function B3(r){const t=new In;t.name="Asymmetrical cafe service shelves";const n=[],a=[],o=(I,X=.86,P=0)=>{const F=new Gn({color:I,roughness:X,metalness:P});return n.push(F),F},c=I=>{const X=r.ceramic.clone();return X instanceof Gn&&(X.color.set(I),X.roughness=.56,X instanceof xu&&(X.clearcoat=.3,X.clearcoatRoughness=.34)),n.push(X),X},u=c("#8d9781"),p=c("#c6bda7"),d=c("#806750"),h=o("#374441"),g=o("#b4a180",.98),v=o("#77604f",.96),_=o("#9d9785",1),x=o("#826b4c",.98),b=r.foliage.clone();b instanceof Gn&&b.color.set("#3b5140"),b.side=_i,n.push(b);const U=new Gn({color:"#ba9670",emissive:"#e9b574",emissiveIntensity:.38,roughness:.75});n.push(U);const M=(I,X,P,F,Y,k=t)=>{const W=new bn(I,X);return W.position.set(P,F,Y),W.castShadow=W.receiveShadow=!0,k.add(W),W},S=(I,X,P,F,Y,k,W,R)=>M(new ia(F,Y,k),W,I,X,P,R),z=(I,X,P,F,Y,k,W,R)=>M(new ms(F,Y,k,32),W,I,X,P,R),H=(I,X,P,F,Y,k)=>M(new Rl(I.map(([W,R])=>new Ft(W,R)),40),X,P,F,Y,k);for(const[I,X,P]of[[4.25,2.64,5.2],[3.98,1.96,4.52]]){S(I,X,-8.73,P,.066,.44,r.oak);const F=S(I,X-.038,-8.61,P-.24,.009,.015,U);F.castShadow=!1;for(const Y of[-1,1])S(I+Y*(P/2-.42),X-.13,-8.88,.034,.23,.06,r.darkWood)}const A=(I,X,P,F,Y,k)=>{const W=new In;W.position.set(I,X,P),W.rotation.y=k,W.scale.setScalar(F/.4),t.add(W);const R=H([[0,.008],[.083,.008],[.101,.033],[.124,.135],[.118,.235],[.083,.33],[.083,.388],[.093,.398],[.084,.402],[.072,.385],[.074,.331],[.108,.235],[.11,.132],[.09,.035],[0,.035]],Y,0,0,0,W),K=R.geometry.attributes.position;for(let mt=0;mt<K.count;mt++){const Lt=K.getY(mt),Pt=K.getX(mt),nt=K.getZ(mt),dt=Math.max(0,(Lt-.33)/.072),wt=Math.pow(Math.max(0,-nt/Math.hypot(Pt,nt||1e-4)),8);K.setXYZ(mt,Pt,Lt+dt*wt*.019,nt-dt*wt*.039)}R.geometry.computeVertexNormals();const it=new yl([new J(.09,.312,0),new J(.17,.311,0),new J(.184,.237,0),new J(.162,.151,0),new J(.119,.132,0)]);M(new to(it,20,.015,8,!1),Y,0,0,0,W)};A(2.12,2.681,-8.72,.39,u,-.38),A(2.47,2.681,-8.69,.27,p,.18),A(4.43,2.001,-8.72,.32,d,-.6);const O=(I,X,P,F,Y)=>{H([[0,0],[.111,0],[.139,.015],[.149,.026],[.139,.037],[.093,.025],[0,.025]],Y,I,X,P);for(let k=0;k<F;k++){const W=new In;W.position.set(I+Math.sin(k*2)*.009,X+.027+k*.077,P+Math.cos(k*2)*.006),W.rotation.y=-.2+k*.27,t.add(W),H([[0,0],[.054,0],[.069,.012],[.087,.1],[.084,.116],[.075,.116],[.077,.098],[.057,.022],[0,.022]],Y,0,0,0,W),M(new Gs(.033,.009,8,20,Math.PI*1.65),Y,.088,.062,0,W).rotation.z=-.825*Math.PI}};O(2.27,2.003,-8.62,2,p),O(2.66,2.003,-8.75,3,u);const w=(I,X,P,F,Y,k)=>{const W=new In;W.position.set(I,X,P),W.rotation.y=k,t.add(W);const R=S(0,F/2,0,.21,F,.135,Y,W),K=R.geometry.attributes.position;for(let it=0;it<K.count;it++)K.getY(it)>0&&(K.setX(it,K.getX(it)*.84),K.setZ(it,K.getZ(it)*.29));R.geometry.computeVertexNormals(),S(0,F-.014,.003,.19,.032,.027,v,W)};w(3.76,2.681,-8.77,.31,g,-.13),w(3.98,2.681,-8.68,.255,h,.09);for(const[I,X,P,F]of[[0,.46,.045,_],[1,.4,.058,v],[2,.43,.031,h]]){const Y=S(5.4+I*.011,2.68+[.0225,.074,.119][I],-8.72,X,P,.28,F);Y.rotation.y=[.04,-.07,.03][I]}H([[0,0],[.095,0],[.114,.023],[.12,.13],[.116,.3],[.095,.323],[.095,.343],[.084,.343],[.085,.32],[.103,.298],[.105,.03],[0,.03]],d,5.6,2.818,-8.66),z(5.6,3.175,-8.66,.09,.093,.026,x);const L=new In;L.position.set(5.62,2.001,-8.78),L.rotation.x=-.095,L.rotation.y=-.08,t.add(L),S(0,.18,0,.35,.36,.027,r.darkWood,L),S(0,.18,.018,.307,.317,.008,g,L);const y=M(new Lu(.066,28),v,-.035,.194,.024,L);y.scale.y=1.25,S(.061,.154,.025,.057,.1,.004,h,L),H([[0,0],[.087,0],[.123,.176],[.128,.195],[.118,.204],[.109,.182],[.075,.023],[0,.023]],p,6.33,2.681,-8.7),z(6.33,2.877,-8.7,.108,.108,.009,h);const D=new yl([new J(6.33,2.885,-8.69),new J(6.39,2.98,-8.49),new J(6.43,2.79,-8.42),new J(6.41,2.55,-8.43),new J(6.49,2.27,-8.47)]);M(new to(D,32,.005,5,!1),b,0,0,0);const B=new xi(1,1,6,10),V=B.attributes.position;for(let I=0;I<V.count;I++){const X=V.getY(I)+.5,P=Math.pow(Math.sin(X*Math.PI),.72),F=V.getX(I);V.setXYZ(I,F*P,X,.11*Math.sin(X*Math.PI)-.065*Math.abs(F)*2)}B.computeVertexNormals();const q=new Sx(B,b,14),Z=new Sn;for(let I=0;I<q.count;I++){const X=.04+I/q.count*.91;Z.position.copy(D.getPoint(X)),Z.rotation.set(.22+Math.sin(I*1.9)*.3,(I%2?-1:1)*.5,(I%2?-1:1)*(1.1+X*1.2)),Z.scale.set(.083+I%3*.015,.123+I%4*.016,.13),Z.updateMatrix(),q.setMatrixAt(I,Z.matrix)}return q.castShadow=q.receiveShadow=!0,t.add(q),t.userData.provenance="Original procedural shelf geometry; no external assets.",{group:t,materials:n,textures:a}}function H3(r,t=!1){const n=r[0].index!==null,a=new Set(Object.keys(r[0].attributes)),o=new Set(Object.keys(r[0].morphAttributes)),c={},u={},p=r[0].morphTargetsRelative,d=new wn;let h=0;for(let g=0;g<r.length;++g){const v=r[g];let _=0;if(n!==(v.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in v.attributes){if(!a.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;c[x]===void 0&&(c[x]=[]),c[x].push(v.attributes[x]),_++}if(_!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". Make sure all geometries have the same number of attributes."),null;if(p!==v.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in v.morphAttributes){if(!o.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+".  .morphAttributes must be consistent throughout all geometries."),null;u[x]===void 0&&(u[x]=[]),u[x].push(v.morphAttributes[x])}if(t){let x;if(n)x=v.index.count;else if(v.attributes.position!==void 0)x=v.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". The geometry must have either an index or a position attribute"),null;d.addGroup(h,x,g),h+=x}}if(n){let g=0;const v=[];for(let _=0;_<r.length;++_){const x=r[_].index;for(let b=0;b<x.count;++b)v.push(x.getX(b)+g);g+=r[_].attributes.position.count}d.setIndex(v)}for(const g in c){const v=J_(c[g]);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" attribute."),null;d.setAttribute(g,v)}for(const g in u){const v=u[g][0].length;if(v!==0){d.morphAttributes=d.morphAttributes||{},d.morphAttributes[g]=[];for(let _=0;_<v;++_){const x=[];for(let U=0;U<u[g].length;++U)x.push(u[g][U][_]);const b=J_(x);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" morphAttribute."),null;d.morphAttributes[g].push(b)}}}return d}function J_(r){let t,n,a,o=-1,c=0;for(let h=0;h<r.length;++h){const g=r[h];if(t===void 0&&(t=g.array.constructor),t!==g.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=g.itemSize),n!==g.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(a===void 0&&(a=g.normalized),a!==g.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(o===-1&&(o=g.gpuType),o!==g.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;c+=g.count*n}const u=new t(c),p=new ki(u,n,a);let d=0;for(let h=0;h<r.length;++h){const g=r[h];if(g.isInterleavedBufferAttribute){const v=d/n;for(let _=0,x=g.count;_<x;_++)for(let b=0;b<n;b++){const U=g.getComponent(_,b);p.setComponent(_+v,b,U)}}else u.set(g.array,d);d+=g.count*n}return o!==void 0&&(p.gpuType=o),p}function G3(r){const t=new In;t.name="Cafe rain-wet evening street";const n=[],a=[];let o=914035;const c=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296),u=(F,Y=.85,k,W=0)=>{const R=new Gn({color:F,roughness:Y,emissive:k??"#000000",emissiveIntensity:W});return n.push(R),R},p=(F,Y,k)=>{const W=document.createElement("canvas");W.width=F,W.height=Y;const R=W.getContext("2d");if(!R)throw new Error("Cafe exterior surface canvas unavailable");k(R);const K=new Op(W);return K.colorSpace=Kn,a.push(K),K},d=p(256,512,F=>{F.fillStyle="#b6b9b8",F.fillRect(0,0,256,512);for(let Y=0;Y<95;Y++){const k=c()*256,W=c()*512,R=8+c()*100,K=F.createRadialGradient(k,W,0,k,W,R);K.addColorStop(0,c()>.45?"#77868b13":"#e1d5bf12"),K.addColorStop(1,"#00000000"),F.fillStyle=K,F.fillRect(k-R,W-R,R*2,R*2)}for(let Y=0;Y<9e3;Y++)F.fillStyle=c()>.5?"#f0eee80b":"#2033420a",F.fillRect(c()*256,c()*512,1,1)});d.wrapS=d.wrapT=gl,d.anisotropy=4;const h=["#354650","#4b5052","#465860","#3e4d57","#5b5954","#354955"].map(F=>{const Y=u(F);return Y.map=d,Y}),g=u("#576065",.78),v=u("#6f7778",.7),_=u("#25333b",.96),x=u("#303d43",.6),b=u("#647071",.8),U=u("#26353e",.84),M=u("#283d49",.29,"#597b89",.075),S=u("#192b36",.24),z=[u("#736a55",.39,"#d4b482",.34),u("#9b8662",.42,"#efd2a0",.65),u("#71674f",.36,"#bd9f71",.2),u("#a58a61",.42,"#f0c688",.9)],H=[u("#978e7d",.94),u("#776f60",.96),u("#617076",.98)],A=[u("#46544f"),u("#555054"),u("#544d42")],O=u("#f1d3a3",.3,"#ffd9a0",2.4),w=new Map,L=(F,Y,k,W,R,K=0,it=0,mt=0)=>{const Lt=new Ge().compose(new J(k,W,R),new Zs().setFromEuler(new Ia(K,it,mt)),new J(1,1,1));F.applyMatrix4(Lt);const Pt=w.get(Y)??[];Pt.push(F),w.set(Y,Pt)},y=(F,Y,k,W,R,K,it)=>L(new ia(W,R,K),it,F,Y,k),D=(F,Y,k,W,R,K,it)=>L(new ms(W,R,K,14),it,F,Y,k);y(-7,-.064,-15,32,.08,23,r.pavement),y(-10.9,-.064,-2.65,23,.08,2.2,r.pavement),y(-10.9,.026,-2.55,23,.1,1.85,g),y(-10.9,.064,-3.51,23,.17,.14,v),y(-7,.025,-15.8,32,.12,1.38,g),y(-7,.08,-15.07,32,.19,.13,v);for(let F=-22;F<.6;F+=1.32)y(F,.078,-2.55,.014,.004,1.78,_);for(let F=-22;F<9;F+=1.57)y(F,.087,-15.8,.013,.004,1.31,_);y(-10.9,.078,-2.6,23,.004,.012,_),y(-7,-.017,-4.12,32,.012,.035,_);for(let F=0;F<4;F++){const Y=-10.5+F*4.6;y(Y,-.012,-4.24,.57,.024,.34,x);for(let k=0;k<6;k++)y(Y-.23+k*.09,.002,-4.24,.014,.013,.31,v)}const B=p(128,128,F=>{const Y=F.createRadialGradient(64,64,0,64,64,64);Y.addColorStop(0,"#ffffff88"),Y.addColorStop(.065,"#fffffff0"),Y.addColorStop(.19,"#ffffff28"),Y.addColorStop(.55,"#ffffff06"),Y.addColorStop(1,"#ffffff00"),F.fillStyle=Y,F.fillRect(0,0,128,128)}),V=new Sl({color:"#ffe0b5",map:B,transparent:!0,opacity:.25,depthWrite:!1,blending:yu});n.push(V);const q=(F,Y,k,W)=>{const R=new bn(new xi(W,W),V);R.position.set(F,Y,k),R.name="Soft atmospheric lamp halo",t.add(R)},Z=p(256,1024,F=>{const Y=F.createImageData(256,1024);let k=.5;for(let W=0;W<1024;W++){W%(4+Math.floor(c()*9))===0&&(k=c());const R=W/1023,K=Math.sin(Math.PI*R)**.55,it=.5+.085*Math.sin(R*31)+.034*Math.sin(R*103),mt=.05+.22*R;for(let Lt=0;Lt<256;Lt++){const Pt=(Lt/255-it)/mt,nt=Math.exp(-Pt*Pt*3.4)*K*(.13+k*.64)*(1-R*.6),dt=(W*256+Lt)*4;Y.data[dt]=Y.data[dt+1]=Y.data[dt+2]=255,Y.data[dt+3]=Math.round(nt*255)}}F.putImageData(Y,0,0)}),I=["#eac58d","#b2c5ca","#c6b391"].map(F=>{const Y=new Sl({map:Z,color:F,transparent:!0,opacity:.68,depthWrite:!1,blending:yu});return n.push(Y),Y}),X=(F,Y,k,W,R=0,K=1)=>{const it=new xi(k,W),mt=it.getAttribute("uv"),Lt=it.getAttribute("position");for(let nt=0;nt<Lt.count;nt++)Lt.setX(nt,Lt.getX(nt)+(1-mt.getY(nt))*(-.5-F)*.45);if(c()>.5)for(let nt=0;nt<mt.count;nt++)mt.setX(nt,1-mt.getX(nt));const Pt=new bn(it,I[R]);Pt.position.set(F,-.018+K*.001,Y),Pt.rotation.x=-Math.PI/2,Pt.rotation.z=(c()-.5)*.025,Pt.name="Broken wet-street light reflection",t.add(Pt)},P=[{x:-16.3,z:-19.2,w:4.5,h:9.7,rows:4,bays:3,style:0},{x:-11.8,z:-17.6,w:4.2,h:7.1,rows:3,bays:2,style:1},{x:-7.5,z:-18.4,w:4.3,h:9.1,rows:4,bays:2,style:2},{x:-3.1,z:-16.95,w:4.35,h:6.55,rows:2,bays:3,style:3},{x:1.25,z:-18,w:4.1,h:8.35,rows:3,bays:2,style:4},{x:5.55,z:-20.1,w:4.4,h:10.4,rows:4,bays:3,style:5}];for(const F of P){const{x:Y,z:k,w:W,h:R,rows:K,bays:it,style:mt}=F;y(Y,R/2,k-.65,W,R,1.3,h[mt]),y(Y,R+.025,k-.08,W+.14,.16,1.65,U),y(Y,2.5,k+.055,W+.05,.09,.2,b),y(Y-W/2+.11,R/2,k+.025,.16,R,.09,b),y(Y+W/2-.1,R/2,k+.025,.13,R,.09,x);const Pt=(R-.73-3.15)/Math.max(1,K-1);for(let wt=0;wt<K;wt++)for(let ee=0;ee<it;ee++){if(mt===2&&wt===2&&ee===0||mt===5&&wt===1&&ee===2)continue;const zt=Y+(ee-(it-1)/2)*(W/(it+.34)),ie=3.15+wt*Pt+(mt===3&&ee===2?.22:0),ue=it===3?.72+c()*.16:1.03+c()*.22,gt=Math.min(Pt*.67,.91+c()*.35);y(zt,ie,k+.045,ue+.16,gt+.18,.09,x);const Ct=c(),Nt=Ct<.46?S:Ct<.62?M:z[Math.floor(c()*z.length)];if(y(zt,ie,k+.101,ue,gt,.012,Nt),y(zt,ie-gt/2-.055,k+.13,ue+.21,.08,.27,b),(ee%2===0||mt%2===0)&&y(zt+(c()-.5)*.09,ie,k+.15,.026,gt,.035,x),(wt+mt)%3===0&&y(zt,ie+gt*.21,k+.151,ue,.024,.036,x),Ct>.4&&c()>.34){const Dt=H[(ee+wt+mt)%H.length],It=ue*(.17+c()*.18),ae=c()>.5?1:-1;y(zt+ae*(ue-It)*.5,ie,k+.119,It,gt*.98,.016,Dt);for(let jt=0;jt<3;jt++)y(zt+ae*(ue-It)*.5-It*.3+jt*It*.3,ie,k+.139,.012,gt*.97,.01,x)}if(Ct<.18){y(zt,ie+gt*.28,k+.134,ue,gt*.43,.014,H[2]);for(let Dt=0;Dt<4;Dt++)y(zt,ie+gt*.1+Dt*gt*.09,k+.15,ue,.009,.01,x)}}const nt=1.71+mt%2*.16,dt=Y+W*.28;y(Y-W*.1,1.2,k+.053,W*.6,nt,.08,x),y(Y-W*.1,1.2,k+.105,W*.54,nt-.13,.024,mt===1||mt===4?M:z[mt%4]),y(Y-W*.1,1.2,k+.15,.042,nt-.1,.07,x),y(dt,1.13,k+.08,.72,2.07,.12,x),y(dt,1.18,k+.153,.56,1.68,.02,mt%2?S:z[0]),y(dt+.18,.94,k+.18,.018,.18,.025,r.brass),y(Y-.1,2.38,k+.16,W*.86,.25,.14,A[mt%3]),L(new ia(W*.89,.048,.67),A[mt%3],Y-.1,2.19,k+.39,.15),y(Y-.1,2.11,k+.71,W*.89,.13,.037,A[mt%3]);for(let wt=0;wt<3;wt++)y(Y-W*.31+wt*.41,.63+wt%2*.11,k+.145,.18+c()*.1,.34+c()*.2,.05,H[(wt+mt)%3]);mt!==1&&mt!==5&&(X(Y-.15,-11.95,1.8+c()*.6,8.6+c()*1.1,mt===4?1:0),q(Y-W*.18,1.72,k+.2,1))}y(-20.9,4.7,-25.1,6.3,9.4,1.8,h[3]),y(-13.8,6.9,-27.2,3,13.8,2,h[0]);for(const[F,Y,k]of[[-21.5,4.3,-24.17],[-20,6.4,-24.17],[-13.2,7.3,-26.16]])y(F,Y,k,.4,.64,.02,z[2]);for(const[F,Y]of[[-5.75,-8.6,3.65],[-12.4,-13.9,3.92]].entries()){const[k,W,R]=Y;D(k,R/2,W,.027,.058,R,x),D(k,.12,W,.09,.13,.24,x),L(new ms(.028,.028,.52,12),x,k+.25,R-.09,W,0,0,Math.PI/2),L(new Nu(.085,16,10),O,k+.46,R-.17,W),D(k+.46,R-.095,W,.085,.155,.075,U);const K=new pp("#f1c893",F===0?12:9,5.6,2);K.position.set(k+.46,R-.19,W),t.add(K),q(k+.46,R-.17,W+.13,F===0?1.3:1.12),X(k+.46,W+2.3,.75,4.8,F===0?0:2)}for(const[F,Y]of w){const k=H3(Y,!1);if(Y.forEach(R=>R.dispose()),!k)throw new Error("Cafe exterior batch geometry mismatch");const W=new bn(k,F);W.castShadow=!1,W.receiveShadow=!1,W.name="Batched cafe street architecture",t.add(W)}return{group:t,materials:n,textures:a}}function V3(){const r=new y1;r.background=new xe("#263846"),r.fog=new Lp("#263846",.021);const t=F3();t.oak.color.set("#ffffff"),t.plaster.color.set("#b6ac95");const n=[],a=[],o=[],c=t.oak.clone();c.color.set("#a6a098"),a.push(c);const u=(st,xt=.8,Tt=0)=>{const Rt=new Gn({color:st,roughness:xt,metalness:Tt});return a.push(Rt),Rt},p=new Gn({color:"#fff4d6",emissive:"#ffc580",emissiveIntensity:2});a.push(p);const d=(st,xt,Tt,Rt,Vt,qt=r)=>{const re=new bn(st,xt);return re.position.set(Tt,Rt,Vt),re.castShadow=!0,re.receiveShadow=!0,qt.add(re),re},h=(st,xt,Tt,Rt,Vt,qt,re,$)=>d(new ia(Rt,Vt,qt),re,st,xt,Tt,$),g=(st,xt,Tt,Rt,Vt,qt,re,$)=>d(new ms(Rt,Vt,qt,48),re,st,xt,Tt,$),v=(st,xt,Tt,Rt,Vt,qt)=>d(new Nu(Rt,24,16),Vt,st,xt,Tt,qt),_=(st,xt,Tt,Rt,Vt=r)=>{const qt=d(new ms(Tt,Tt,st.distanceTo(xt),12),Rt,0,0,0,Vt);return qt.position.copy(st).add(xt).multiplyScalar(.5),qt.quaternion.setFromUnitVectors(new J(0,1,0),xt.clone().sub(st).normalize()),qt};h(-2.2,-.1,3.2,6,.2,9.5,t.darkWood),h(4,-.1,-3.2,6.5,.2,12,t.darkWood);for(let st=0;st<12;st++)h(-4.9+st*.5,.008,3.2,.483,.024,9.5,c);for(let st=0;st<13;st++)h(1+st*.5,.008,-3.2,.483,.024,12,c);h(4,2,-9,6.5,4,.18,t.plaster),h(7.2,2,-2,.2,4,14,t.plaster);const x=u("#202c33",.97);d(new ia(.16,4,7.5),[t.darkWood,x,x,x,t.darkWood,x],.82,2,-5.3),h(-2.2,4.15,3.2,6,.16,9.5,t.plaster),h(4,4.15,-3.2,6.5,.16,12,t.plaster),h(-5.3,2,1,.25,4,6,t.plaster);const b=-2.15,U=-1.55,M=5.7,S=3.5,z=2.14;h(b,.19,U,M+.24,.4,.21,t.plaster),h(b,.42,U+.1,M+.44,.13,.48,t.oak);for(const st of[-5.06,-2.25,.74])h(st,2.15,U+.03,.105,3.7,.17,t.darkWood),h(st+.058,2.15,U+.125,.018,3.7,.018,t.brass);h(b,3.95,U,M+.3,.15,.2,t.darkWood),h(b,3.18,U+.04,M,.065,.14,t.darkWood),h(-3.9,.45,1.6,1.25,.28,4,t.darkWood),h(-3.8,.67,1.6,1.2,.2,4,t.fabric),h(-4.45,1.15,1.6,.19,1.02,4.05,t.fabric);for(let st=-.2;st<3.6;st+=.58)h(-4.337,1.15,st,.012,.79,.016,t.darkWood),v(-4.315,1.2,st+.28,.022,t.brass);const H=new In;r.add(H),H.position.set(-.85,.79,1.12);const A=new Rx,O=2.75,w=1.45,L=.12;A.moveTo(-O/2+L,-w/2),A.lineTo(O/2-L,-w/2),A.quadraticCurveTo(O/2,-w/2,O/2,-w/2+L),A.lineTo(O/2,w/2-L),A.quadraticCurveTo(O/2,w/2,O/2-L,w/2),A.lineTo(-O/2+L,w/2),A.quadraticCurveTo(-O/2,w/2,-O/2,w/2-L),A.lineTo(-O/2,-w/2+L),A.quadraticCurveTo(-O/2,-w/2,-O/2+L,-w/2);const y=d(new Fp(A,{depth:.065,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:3,steps:1}),t.oak,0,0,0,H);y.rotation.x=-Math.PI/2;const D=y.geometry.getAttribute("uv");for(let st=0;st<D.count;st++)D.setXY(st,D.getX(st)/O+.5,D.getY(st)/w+.5);D.needsUpdate=!0;for(const st of[-1,1])for(const xt of[-.43,.43])h(st,-.43,xt,.065,.8,.065,t.darkWood,H);const B=document.createElement("canvas");B.width=B.height=128;const V=B.getContext("2d"),q=V.createRadialGradient(64,64,8,64,64,64);q.addColorStop(0,"rgba(0,0,0,.26)"),q.addColorStop(.6,"rgba(0,0,0,.14)"),q.addColorStop(1,"rgba(0,0,0,0)"),V.fillStyle=q,V.fillRect(0,0,128,128);const Z=new Op(B);o.push(Z);const I=new Sl({map:Z,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});a.push(I);const X=d(new xi(.68,.68),I,-.64,.875,1.45);X.rotation.x=-Math.PI/2,X.castShadow=!1;const P=d(new xi(.45,.45),I,-1.15,.875,.56);P.rotation.x=-Math.PI/2,P.castShadow=!1;const F=new In;F.position.set(-.64,.895,1.45),r.add(F);const Y=[[0,.008],[.087,.008],[.112,.018],[.14,.13],[.151,.228],[.153,.249],[.148,.256],[.14,.249],[.137,.22],[.129,.115],[.098,.035],[0,.035]].map(([st,xt])=>new Ft(st,xt)),k=d(new Rl(Y,96),t.ceramic,0,0,0,F),W=k.geometry.getAttribute("uv"),R=k.geometry.getAttribute("position");for(let st=0;st<W.count;st++)W.setY(st,R.getY(st)/.256);W.needsUpdate=!0;const K=d(new Gs(.085,.021,20,48,Math.PI*1.72),t.ceramic,.16,.139,0,F);K.rotation.z=-Math.PI*.86;const it=g(-.64,.89,1.45,.235,.21,.025,t.ceramic),mt=d(new Gs(.145,.007,12,72),t.ceramic,0,.246,0,F);mt.rotation.x=Math.PI/2,g(0,.224,0,.136,.136,.002,t.coffee,F);const Lt=u("#be9561",.42),Pt=d(new Gs(.129,.0025,8,96),Lt,0,.226,0,F);Pt.rotation.x=Math.PI/2;for(const st of[k,K,it,mt])st.userData.interaction="cup",n.push(st);const nt=new xi(.4,.49,24,24),dt=nt.getAttribute("position");for(let st=0;st<dt.count;st++){const xt=dt.getX(st),Tt=dt.getY(st);dt.setZ(st,.008+.004*Math.sin(xt*25+Tt*8)+.015*Math.pow(Math.abs(xt)/.2,6))}nt.computeVertexNormals(),d(nt,t.fabric,.1,.871,1.28).rotation.set(-Math.PI/2,0,-.13),v(.12,.886,1.34,.041,t.brass).scale.set(.65,.15,1.3),_(new J(.12,.888,1.36),new J(.11,.888,1.6),.008,t.brass);const zt=u("#d8cdb3",.96),ie=h(-1.61,.8795,1.29,.43,.013,.33,zt);ie.rotation.y=.12;for(let st=0;st<6;st++)h(-1.61,.887,1.2+st*.031,.25-st%3*.04,.001,.003,t.darkWood);const ue=new In;ue.position.set(-1.15,.8725,.56),r.add(ue),g(0,.018,0,.15,.17,.035,t.brass,ue),g(0,.26,0,.017,.022,.48,t.brass,ue);const gt=new Gn({color:"#edcc94",roughness:.85,side:_i,emissive:"#edac55",emissiveIntensity:.24});a.push(gt);const Ct=d(new ms(.15,.29,.36,96,1,!0),gt,0,.56,0,ue);for(let st=0;st<64;st++){const xt=st/64*Math.PI*2;_(new J(Math.cos(xt)*.289,.38,Math.sin(xt)*.289),new J(Math.cos(xt)*.15,.74,Math.sin(xt)*.15),.0021,gt,ue)}for(const[st,xt]of[[.38,.29],[.74,.15]]){const Tt=d(new Gs(xt,.007,8,72),t.brass,0,st,0,ue);Tt.rotation.x=Math.PI/2}v(0,.43,0,.048,p,ue);const Nt=new pp("#ffcf91",2.6,4.2,2);Nt.position.set(-1.15,1.3025,.56),r.add(Nt);const Dt=new y_("#ffe0af",7,5,1.18,.95,2);Dt.position.set(-1.15,1.3525,.56),Dt.target.position.set(-.48,.83,1.65),Dt.castShadow=!0,Dt.shadow.mapSize.set(2048,2048),Dt.shadow.radius=4,Dt.shadow.bias=-.001,Dt.shadow.normalBias=.018,r.add(Dt,Dt.target),Ct.userData.interaction="lamp",n.push(Ct),h(4,.56,-7.35,5.2,1.12,1,t.darkWood),h(4,1.15,-7.35,5.4,.14,1.12,t.oak);for(let st=1.65;st<6.5;st+=.14)h(st,.61,-6.833,.037,1,.025,t.oak);const It=u("#64666a",.26,.82);h(4.7,1.46,-7.32,1.12,.48,.54,It),h(4.7,1.56,-7.015,.87,.19,.02,t.darkWood);for(const st of[4.45,4.91])g(st,1.345,-6.98,.038,.038,.17,t.brass),_(new J(st,1.34,-7),new J(st,1.32,-6.76),.021,t.darkWood);const ae=B3(t);r.add(ae.group),a.push(...ae.materials),o.push(...ae.textures);const jt=(st,xt,Tt=2.9)=>{g(st,3.54,xt,.012,.012,1.2,t.darkWood),g(st,Tt,xt,.14,.42,.22,t.darkWood),g(st,Tt-.115,xt,.38,.38,.012,p);const Rt=new y_("#ffdda6",13,8,.88,1,2);Rt.position.set(st,Tt-.18,xt),Rt.target.position.set(st,0,xt),r.add(Rt,Rt.target)};jt(2.15,-1.4),jt(3.6,-4.5),jt(5.6,-6.8);const ce=new EE("#c3d0d9","#534c44",.21);r.add(ce);const de=new pp("#ffe6c7",4.5,13,2);de.position.set(3,3,0),r.add(de);const j=new wE("#9cbfd8",.34);j.position.set(-5,5,-6),r.add(j);const pe=u("#242c2e",.94),Se=u("#34302c",.97),G=u("#20282b",.96),T=u("#65594e",.96),at=u("#222524",1),ct=(st,xt,Tt)=>{const Rt=new In;Rt.position.set(st,0,xt),Rt.rotation.y=Tt,r.add(Rt),h(0,.46,0,.52,.1,.5,t.fabric,Rt),h(0,.78,.23,.53,.56,.08,t.darkWood,Rt);for(const Vt of[-.22,.22])for(const qt of[-.2,.2])h(Vt,.24,qt,.032,.48,.032,t.darkWood,Rt);return Rt},St=(st,xt,Tt,Rt)=>{const Vt=ct(st,xt,Tt);Vt.scale.setScalar(.88);const qt=Rt?Se:pe,re=d(new wu(.2,.32,8,24),qt,0,.92,0,Vt);re.scale.set(1,.95,.65),re.rotation.x=-.16,g(0,1.22,-.075,.042,.049,.085,T,Vt);const $=v(0,1.345,-.1,.11,T,Vt);$.scale.set(.78,1.14,.85),$.rotation.x=.18,v(0,1.38,-.075,.113,at,Vt).scale.set(.81,.96,.86),Rt&&v(.04,1.385,.022,.049,at,Vt).scale.set(1,1.1,.9);for(const Mt of[-1,1]){const Gt=d(new wu(.055,.25,6,16),qt,Mt*.18,.92,-.12,Vt);Gt.rotation.x=-.65,_(new J(Mt*.17,.78,-.24),new J(Mt*.09,.77,-.39),.043,qt,Vt),_(new J(Mt*.105,.46,-.05),new J(Mt*.105,.1,-.27),.055,G,Vt)}return Vt};for(const[st,xt,Tt]of[[0,2.3,-5.6],[1,4.85,-6.1]]){const Rt=d(new xi(2.4,2.2),I,xt,.026,Tt);Rt.rotation.x=-Math.PI/2,Rt.castShadow=!1,g(xt,.72,Tt,.49,.49,.055,t.oak),g(xt,.36,Tt,.044,.06,.7,t.darkWood),g(xt,.04,Tt,.23,.23,.05,t.darkWood),ct(xt-.69,Tt,-Math.PI/2).scale.setScalar(.88),St(xt+.66,Tt-.1,Math.PI/2+(st?.22:-.14),st),g(xt-.1,.79,Tt,.05,.04,.1,t.ceramic),h(xt+.12,.755,Tt+.02,.2,.008,.26,zt)}for(const[st,xt,Tt]of[[1.3,-3.25,1.35],[5.1,-4.75,1.12],[.9,-1.6,.56],[6.6,-7.9,1.3]]){const Rt=z3(t,Tt);Rt.position.set(st,0,xt),r.add(Rt)}const Ot=G3(t);r.add(Ot.group),a.push(...Ot.materials),o.push(...Ot.textures);const Bt={time:{value:0},pulse:{value:0}},_t=new Ni({transparent:!0,depthWrite:!1,side:_i,uniforms:Bt,vertexShader:"varying vec2 vUv; uniform float time; void main(){vUv=uv;vec3 p=position;p.x+=sin(uv.y*8.0-time*.75)*.033*uv.y+sin(uv.y*17.0+time*.3)*.015;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}",fragmentShader:"varying vec2 vUv;uniform float time;uniform float pulse;void main(){float center=.5+.10*sin(vUv.y*13.-time*.35);float w=.10+vUv.y*.22;float a=exp(-pow((vUv.x-center)/w,2.)*3.);a*=smoothstep(0.,.16,vUv.y)*(1.-smoothstep(.45,1.,vUv.y));a*=.12+.035*sin(vUv.y*28.-time*.9);gl_FragColor=vec4(.92,.88,.80,a*(1.+pulse*.35));}"});a.push(_t);const yt=new In;yt.position.set(-.64,1.11,1.45),r.add(yt);for(let st=0;st<3;st++){const xt=d(new xi(.31,.69,12,36),_t,(st-1)*.045,.345,0,yt);xt.rotation.y=st*Math.PI/3,xt.castShadow=!1,xt.receiveShadow=!1}return{scene:r,m:t,cup:F,saucer:it,steam:yt,lamp:ue,key:Dt,cupContact:X,lampContact:P,lampLight:Nt,shadeMat:gt,steamUniforms:Bt,interactables:n,glass:{x:b,y:z,z:U,w:M,h:S},dispose(){const st=new Set;r.traverse(xt=>{xt instanceof bn&&st.add(xt.geometry),xt instanceof Sx&&xt.dispose()}),st.forEach(xt=>xt.dispose()),a.forEach(xt=>xt.dispose()),o.forEach(xt=>xt.dispose()),r.traverse(xt=>{var Tt;xt instanceof Cl&&"shadow"in xt&&((Tt=xt.shadow)==null||Tt.dispose())}),t.dispose()}}}class k3{constructor(t,n,a="auto"){this.canvas=t,this.onContextLost=n,this.camera=new si(45,1,.04,80),this.world=V3(),this.look=new P3({yaw:.052,pitch:.027},{follow:.2,settle:1.35}),this.raycaster=new DE,this.targetChecks=[],this.shadowTarget=null,this.targetFallbackReason=null,this.environment=null,this.raf=0,this.last=0,this.ready=!1,this.disposed=!1,this.time=0,this.width=1,this.height=1,this.ratio=1,this.wipeAge=99,this.cupPulse=0,this.lampLevel=1,this.lampTarget=1,this.frames=0,this.lost=c=>{c.preventDefault(),this.onContextLost()},this.renderer=new R3({canvas:t,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=Kn,this.renderer.toneMapping=Sp,this.renderer.toneMappingExposure=1.02,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=cl,this.renderer.shadowMap.autoUpdate=!1;try{this.capability=U3(this.renderer,a)}catch(c){throw this.world.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),c}this.target=ll(new Jn(1,1,{depthBuffer:!0}),this.capability.type);const o=this.world.glass;this.glass=new Iu(new xi(o.w,o.h),{textureWidth:512,textureHeight:512,multisample:0,clipBias:.003,shader:{name:"CafeRainGlass",uniforms:{color:{value:new xe("#e5eced")},tDiffuse:{value:null},textureMatrix:{value:new Ge},sceneColor:{value:null},resolution:{value:new Ft(1,1)},time:{value:0},wipe:{value:new Ft(-2,-2)},wipeAge:{value:99}},vertexShader:"varying vec2 vUv;varying vec4 vReflect;uniform mat4 textureMatrix;void main(){vUv=uv;vReflect=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`uniform sampler2D tDiffuse,sceneColor;uniform vec2 resolution,wipe;uniform float time,wipeAge;varying vec2 vUv;varying vec4 vReflect;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      vec4 drops(vec2 uv,vec2 grid,float speed){vec2 p=uv*grid;vec2 id=floor(p);float h=hash(vec2(id.x,2.));p.y+=time*speed*(.3+h);id=floor(p);vec2 q=fract(p)-.5;h=hash(id);q.x-=(h-.5)*.62;q.y-=(hash(id+7.)-.5)*.44;float r=.075+.11*hash(id+8.);vec2 n=q/vec2(r,r*(1.05+speed*3.));float d=length(n);float body=1.-smoothstep(.72,1.,d);float keep=step(.55,h);float trail=exp(-abs(q.x)*230.)*smoothstep(.02,.08,q.y)*(1.-smoothstep(.08,.5,q.y))*step(.01,speed)*.15;float rim=smoothstep(.66,.84,d)*(1.-smoothstep(.84,1.05,d))*keep;return vec4(n*body*.006*keep,(body+trail)*keep,rim);}
      vec3 blurred(vec2 uv,float radius){vec2 px=radius/resolution;vec3 c=texture2D(sceneColor,uv).rgb*.24;c+=texture2D(sceneColor,uv+vec2(px.x,0)).rgb*.12;c+=texture2D(sceneColor,uv-vec2(px.x,0)).rgb*.12;c+=texture2D(sceneColor,uv+vec2(0,px.y)).rgb*.12;c+=texture2D(sceneColor,uv-vec2(0,px.y)).rgb*.12;c+=texture2D(sceneColor,uv+px*.7).rgb*.07;c+=texture2D(sceneColor,uv-px*.7).rgb*.07;c+=texture2D(sceneColor,uv+vec2(-px.x,px.y)*.7).rgb*.07;c+=texture2D(sceneColor,uv+vec2(px.x,-px.y)*.7).rgb*.07;return c;}
      void main(){vec4 a=drops(vUv,vec2(81.,47.),0.);vec4 b=drops(vUv+vec2(.12,.34),vec2(29.,18.),.095);vec4 beads=drops(vUv+.37,vec2(137.,83.),0.);vec2 shift=a.xy+b.xy+beads.xy*.24;vec2 screen=gl_FragCoord.xy/resolution;float water=clamp(a.z+b.z+beads.z*.3,0.,1.);float edge=pow(abs(vUv.x-.5)*2.,3.)*.065+pow(1.-vUv.y,4.)*.065;vec2 wipeDelta=(vUv-wipe)*vec2(1.8,1.);float clearPatch=exp(-dot(wipeDelta,wipeDelta)/.016)*exp(-wipeAge*.075);float fog=edge*(1.-clearPatch);vec3 outside=blurred(clamp(screen+shift,vec2(.01),vec2(.99)),mix(3.4,1.,water)+fog*26.);vec2 mirror=vReflect.xy/vReflect.w+shift*.3;vec3 inside=texture2D(tDiffuse,mirror).rgb;vec3 c=mix(outside,inside,.035+edge*.15);c=mix(c,vec3(.17,.22,.25),fog);c*=1.-(a.w+b.w)*.12;c+=vec3(.58,.66,.69)*max(0.,-shift.y)*7.;c+=vec3(.7,.78,.81)*pow(max(0.,shift.y)*150.,3.)*.055;gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>}`}}),ll(this.glass.getRenderTarget(),this.capability.type),L3(this.glass),this.glass.material.uniforms.sceneColor.value=this.target.texture,this.glass.position.set(o.x,o.y,o.z),this.world.scene.add(this.glass),this.glass.userData.interaction="window",this.world.interactables.push(this.glass),t.addEventListener("webglcontextlost",this.lost),t.dataset.engine="three-webgl2",t.dataset.lifecycle="created"}async init(){if(this.disposed)return;let t;try{t=await D3()}catch(o){if(this.disposed)return;throw o}if(this.disposed){t.dispose();return}this.environment=t,this.world.scene.environment=t,this.world.scene.environmentIntensity=.27;const n=this.world.key.shadow,a=Math.min(2048,this.renderer.capabilities.maxTextureSize);n.mapSize.set(a,a),n.map=this.shadowTarget=ll(new Jn(a,a),En),n.map.depthTexture=new jr(a,a,Xi),n.map.depthTexture.format=na,n.map.depthTexture.compareFunction=Uu,n.map.depthTexture.minFilter=n.map.depthTexture.magFilter=rn,this.ready=!0,this.setSize(this.width,this.height,this.ratio),this.renderer.shadowMap.needsUpdate=!0,this.renderFrame(0),this.canvas.dataset.lifecycle="ready"}setSize(t,n,a){if(this.width=Math.max(1,t),this.height=Math.max(1,n),this.ratio=Math.min(2,Math.max(1,a)),this.renderer.setPixelRatio(this.ratio),this.renderer.setSize(this.width,this.height,!1),this.target.setSize(Math.round(this.width*this.ratio),Math.round(this.height*this.ratio)),this.glass.getRenderTarget().setSize(Math.round(this.width*this.ratio*.65),Math.round(this.height*this.ratio*.65)),this.glass.material.uniforms.resolution.value.set(this.width*this.ratio,this.height*this.ratio),this.camera.aspect=this.width/this.height,this.renderer.shadowMap.needsUpdate=!0,this.camera.fov=43+7*(1-Ea.smoothstep(this.camera.aspect,.48,1.35)),this.camera.updateProjectionMatrix(),this.ready){const c=[Cu(this.renderer,this.target,"refraction"),Cu(this.renderer,this.glass.getRenderTarget(),"reflection")];if(this.capability.type===Dn&&c.some(u=>!u.complete)){this.targetFallbackReason="HalfFloat framebuffer incomplete at scene dimensions",this.capability.type=En;for(const u of[this.target,this.glass.getRenderTarget()])u.dispose(),ll(u,En)}this.targetChecks=[du(this.renderer,this.target,"refraction"),du(this.renderer,this.glass.getRenderTarget(),"reflection"),du(this.renderer,this.shadowTarget,"pcf-shadow")],this.canvas.dataset.targets=JSON.stringify({capability:this.capability,fallbackReason:this.targetFallbackReason,targets:this.targetChecks,environment:{kind:"baked-cubeuv",type:this.environment.type,internalFormat:this.environment.internalFormat,mapping:this.environment.mapping,width:this.environment.image.width,height:this.environment.image.height,runtimePmrem:!1}})}}renderFrame(t){if(!this.ready||this.disposed)return;const n=Math.min(.05,Math.max(0,t));this.time+=n,this.wipeAge+=n,this.look.update(n),this.cupPulse=Math.max(0,this.cupPulse-n*.4),this.lampLevel+=(this.lampTarget-this.lampLevel)*(1-Math.exp(-n*1.2)),this.world.steamUniforms.time.value=this.time,this.world.steamUniforms.pulse.value=this.cupPulse,this.world.cup.rotation.z=Math.sin(this.time*3)*this.cupPulse*.006,this.world.lampLight.intensity=2.6*this.lampLevel,this.world.shadeMat.emissiveIntensity=.24*this.lampLevel,this.glass.material.uniforms.time.value=this.time,this.glass.material.uniforms.wipeAge.value=this.wipeAge;const a=1-Ea.smoothstep(this.camera.aspect,.48,1.35);this.camera.position.set(Ea.lerp(.1,-.7,a),Ea.lerp(1.53,1.44,a),Ea.lerp(3.5,3.12,a));const o=new J(Ea.lerp(-.4,-1.35,a),1.3,-1.7);this.world.cup.position.x=this.world.saucer.position.x=this.world.steam.position.x=this.world.cupContact.position.x=Ea.lerp(-.64,-.93,a),this.world.lamp.position.x=this.world.lampLight.position.x=this.world.key.position.x=this.world.lampContact.position.x=Ea.lerp(-1.15,-1.29,a),this.world.key.target.position.x=this.world.cup.position.x+.16,this.world.lamp.scale.setScalar(Ea.lerp(1,.8,a)),this.camera.lookAt(o),this.camera.rotateY(this.look.yaw),this.camera.rotateX(this.look.pitch),this.camera.updateMatrixWorld(),kx(this.renderer,()=>{try{this.glass.visible=!1,this.renderer.setRenderTarget(this.target),this.renderer.render(this.world.scene,this.camera),this.glass.visible=!0,this.renderer.setRenderTarget(null),this.renderer.render(this.world.scene,this.camera)}finally{this.glass.visible=!0}}),this.frames++,this.canvas.dataset.frames=String(this.frames),this.canvas.dataset.time=this.time.toFixed(4),this.canvas.dataset.yaw=this.look.yaw.toFixed(5),this.canvas.dataset.cupPulse=this.cupPulse.toFixed(3),this.canvas.dataset.lamp=this.lampLevel.toFixed(3),this.canvas.dataset.wipeAge=this.wipeAge.toFixed(3),this.canvas.dataset.drawCalls=String(this.renderer.info.render.calls),this.canvas.dataset.triangles=String(this.renderer.info.render.triangles)}start(){if(this.raf||!this.ready||this.disposed)return;this.last=performance.now(),this.canvas.dataset.running="true";const t=n=>{this.disposed||(this.renderFrame((n-this.last)/1e3),this.last=n,this.raf=requestAnimationFrame(t))};this.raf=requestAnimationFrame(t)}stop(){cancelAnimationFrame(this.raf),this.raf=0,this.canvas.dataset.running="false"}drag(t,n){this.look.drag(t,n)}releaseDrag(){this.look.release()}interact(t,n){this.raycaster.setFromCamera(new Ft(t*2-1,1-n*2),this.camera);const a=this.raycaster.intersectObjects(this.world.interactables,!1)[0],o=a==null?void 0:a.object.userData.interaction;return o==="window"&&a.uv&&(this.glass.material.uniforms.wipe.value.copy(a.uv),this.wipeAge=0),o==="cup"&&(this.cupPulse=1),o==="lamp"&&(this.lampTarget=this.lampTarget>.9?.78:1),o??null}verifyTargetStateForQA(){if(this.raf||!this.ready)throw new Error("Target-state check requires a ready paused scene");const t=Vp(this.renderer),n=new Gp(16,{type:En,depthBuffer:!1,generateMipmaps:!0,minFilter:Na}),a=()=>this.renderer.getRenderTarget()===n&&this.renderer.getActiveCubeFace()===4&&this.renderer.getActiveMipmapLevel()===1;try{this.renderer.setRenderTarget(n,4,1);const o=this.renderer.getContext();if(o.checkFramebufferStatus(o.FRAMEBUFFER)!==o.FRAMEBUFFER_COMPLETE)throw new Error("QA cube mip framebuffer incomplete");du(this.renderer,this.target,"state-probe");const c=a();this.renderer.render(this.world.scene,this.camera);const u=a();this.renderFrame(0);const p=a();return{face:4,mip:1,probeRestored:c,reflectorRestored:u,frameRestored:p,glError:o.getError()}}finally{kp(this.renderer,t),n.dispose()}}dispose(){var t;this.disposed||(this.stop(),this.disposed=!0,this.canvas.removeEventListener("webglcontextlost",this.lost),this.glass.dispose(),this.target.dispose(),(t=this.environment)==null||t.dispose(),this.world.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.dataset.lifecycle="disposed")}}class X3 extends oM{constructor(){super({canvasClass:"cafe-world-canvas",isSupported:()=>{var t;try{const n=document.createElement("canvas").getContext("webgl2"),a=!!n;return(t=n==null?void 0:n.getExtension("WEBGL_lose_context"))==null||t.loseContext(),a}catch{return!1}},create:(t,n)=>new k3(t,n,this.targetPreference)}),this.targetPreference="auto"}setTargetPreferenceForQA(t){if(this.engine)throw new Error("Choose target policy before creating the cafe engine");this.targetPreference=t}verifyTargetStateForQA(){var t;return(t=this.engine)==null?void 0:t.verifyTargetStateForQA()}interact(t,n,a){var o;return this.top===t&&t.running&&this.status==="ready"?((o=this.engine)==null?void 0:o.interact(n,a))??null:null}}const qr=new X3;function Q_({active:r,onInteraction:t}){const n=Zn.useRef(null),a=Zn.useRef(null),o=Zn.useRef(null),[c,u]=Zn.useState("loading"),p=sM(r);return Zn.useEffect(()=>{if(!a.current)return;const d={mount:a.current,running:!1,onStatus:u};o.current=d;const h=qr.acquire(d);return()=>{o.current=null,h()}},[]),Zn.useEffect(()=>{o.current&&qr.setRunning(o.current,p)},[p,c]),rM(qr,n,o,p),Zn.useEffect(()=>{const d=n.current;if(!d||!p)return;let h=null;const g=b=>{b.isPrimary&&b.button===0&&(h={x:b.clientX,y:b.clientY,id:b.pointerId,time:performance.now(),distance:0})},v=b=>{h&&h.id===b.pointerId&&(h.distance=Math.max(h.distance,Math.hypot(b.clientX-h.x,b.clientY-h.y)))},_=b=>{const U=h;if(h=null,!U||U.id!==b.pointerId||U.distance>8||Math.hypot(b.clientX-U.x,b.clientY-U.y)>8||performance.now()-U.time>600||!o.current)return;const M=d.getBoundingClientRect(),S=qr.interact(o.current,(b.clientX-M.left)/M.width,(b.clientY-M.top)/M.height);S&&(t==null||t(S))},x=()=>{h=null};return d.addEventListener("pointerdown",g),window.addEventListener("pointermove",v),window.addEventListener("pointerup",_),window.addEventListener("pointercancel",x),()=>{d.removeEventListener("pointerdown",g),window.removeEventListener("pointermove",v),window.removeEventListener("pointerup",_),window.removeEventListener("pointercancel",x)}},[p,t]),fn.jsxs("div",{ref:n,className:"cafe-world","data-state":c,"data-motion":p?"running":"paused",role:"img","aria-label":"비 오는 저녁, 따뜻한 조명과 커피가 있는 카페 창가. 멀리 손님들이 조용히 앉아 있습니다.",children:[fn.jsx("div",{ref:a,className:"cafe-world-mount"}),c!=="ready"&&fn.jsx("span",{className:"cafe-world-status",role:"status",children:c==="failed"?"이 기기에서 카페 3D 화면을 표시할 수 없습니다.":"카페 창가를 준비하고 있어요"})]})}const W3=new URLSearchParams(location.search).get("targets")==="byte"?"byte":"auto";qr.setTargetPreferenceForQA(W3);Object.assign(window,{cafeQA:{verifyTargetState:()=>qr.verifyTargetStateForQA()}});function q3(){const[r,t]=Zn.useState(!new URLSearchParams(location.search).has("paused")),[n,a]=Zn.useState(!1),[o,c]=Zn.useState(!0),[u,p]=Zn.useState("");return fn.jsxs(fn.Fragment,{children:[fn.jsx("main",{"data-scene-surface":!0,style:{position:"absolute",inset:0},children:o&&fn.jsx(Q_,{active:r,onInteraction:p})}),n&&o&&fn.jsx("section",{id:"fullscreen","data-scene-surface":!0,"aria-label":"몰입 화면",children:fn.jsx(Q_,{active:r,onInteraction:p})}),fn.jsxs("div",{className:"label",children:[fn.jsx("small",{children:"RAINY EVENING · WINDOW SEAT"}),fn.jsx("h1",{children:"Café focus"}),fn.jsx("span",{children:"40 min"})]}),fn.jsxs("nav",{children:[fn.jsx("button",{onClick:()=>t(d=>!d),children:r?"Pause":"Resume"}),fn.jsx("button",{onClick:()=>a(d=>!d),children:n?"Exit fullscreen":"Fullscreen holder"}),fn.jsx("button",{onClick:()=>c(d=>!d),children:o?"Unmount":"Mount"}),fn.jsx("button",{onClick:()=>document.documentElement.classList.toggle("reduce-motion"),children:"Reduced motion"}),fn.jsx("output",{"data-interaction":!0,children:u})]})]})}aM.createRoot(document.getElementById("root")).render(fn.jsx(Qy.StrictMode,{children:fn.jsx(q3,{})}));
