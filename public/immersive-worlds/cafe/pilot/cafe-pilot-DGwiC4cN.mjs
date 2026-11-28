(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function b1(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var ed={exports:{}},ml={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yv;function E1(){if(Yv)return ml;Yv=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var h in o)h!=="key"&&(c[h]=o[h])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return ml.Fragment=e,ml.jsx=n,ml.jsxs=n,ml}var Zv;function w1(){return Zv||(Zv=1,ed.exports=E1()),ed.exports}var En=w1(),td={exports:{}},bt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kv;function T1(){if(Kv)return bt;Kv=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function x(N){return N===null||typeof N!="object"?null:(N=v&&N[v]||N["@@iterator"],typeof N=="function"?N:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,S={};function y(N,Q,ue){this.props=N,this.context=Q,this.refs=S,this.updater=ue||b}y.prototype.isReactComponent={},y.prototype.setState=function(N,Q){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,Q,"setState")},y.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function C(){}C.prototype=y.prototype;function z(N,Q,ue){this.props=N,this.context=Q,this.refs=S,this.updater=ue||b}var T=z.prototype=new C;T.constructor=z,A(T,y.prototype),T.isPureReactComponent=!0;var F=Array.isArray;function U(){}var O={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function L(N,Q,ue){var Ue=ue.ref;return{$$typeof:r,type:N,key:Q,ref:Ue!==void 0?Ue:null,props:ue}}function H(N,Q){return L(N.type,Q,N.props)}function G(N){return typeof N=="object"&&N!==null&&N.$$typeof===r}function X(N){var Q={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(ue){return Q[ue]})}var K=/\/+/g;function B(N,Q){return typeof N=="object"&&N!==null&&N.key!=null?X(""+N.key):Q.toString(36)}function W(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(U,U):(N.status="pending",N.then(function(Q){N.status==="pending"&&(N.status="fulfilled",N.value=Q)},function(Q){N.status==="pending"&&(N.status="rejected",N.reason=Q)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function P(N,Q,ue,Ue,Fe){var Ke=typeof N;(Ke==="undefined"||Ke==="boolean")&&(N=null);var re=!1;if(N===null)re=!0;else switch(Ke){case"bigint":case"string":case"number":re=!0;break;case"object":switch(N.$$typeof){case r:case e:re=!0;break;case g:return re=N._init,P(re(N._payload),Q,ue,Ue,Fe)}}if(re)return Fe=Fe(N),re=Ue===""?"."+B(N,0):Ue,F(Fe)?(ue="",re!=null&&(ue=re.replace(K,"$&/")+"/"),P(Fe,Q,ue,"",function(ve){return ve})):Fe!=null&&(G(Fe)&&(Fe=H(Fe,ue+(Fe.key==null||N&&N.key===Fe.key?"":(""+Fe.key).replace(K,"$&/")+"/")+re)),Q.push(Fe)),1;re=0;var ye=Ue===""?".":Ue+":";if(F(N))for(var oe=0;oe<N.length;oe++)Ue=N[oe],Ke=ye+B(Ue,oe),re+=P(Ue,Q,ue,Ke,Fe);else if(oe=x(N),typeof oe=="function")for(N=oe.call(N),oe=0;!(Ue=N.next()).done;)Ue=Ue.value,Ke=ye+B(Ue,oe++),re+=P(Ue,Q,ue,Ke,Fe);else if(Ke==="object"){if(typeof N.then=="function")return P(W(N),Q,ue,Ue,Fe);throw Q=String(N),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return re}function k(N,Q,ue){if(N==null)return N;var Ue=[],Fe=0;return P(N,Ue,"","",function(Ke){return Q.call(ue,Ke,Fe++)}),Ue}function ne(N){if(N._status===-1){var Q=N._result;Q=Q(),Q.then(function(ue){(N._status===0||N._status===-1)&&(N._status=1,N._result=ue)},function(ue){(N._status===0||N._status===-1)&&(N._status=2,N._result=ue)}),N._status===-1&&(N._status=0,N._result=Q)}if(N._status===1)return N._result.default;throw N._result}var J=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},ee={map:k,forEach:function(N,Q,ue){k(N,function(){Q.apply(this,arguments)},ue)},count:function(N){var Q=0;return k(N,function(){Q++}),Q},toArray:function(N){return k(N,function(Q){return Q})||[]},only:function(N){if(!G(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return bt.Activity=_,bt.Children=ee,bt.Component=y,bt.Fragment=n,bt.Profiler=o,bt.PureComponent=z,bt.StrictMode=a,bt.Suspense=d,bt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,bt.__COMPILER_RUNTIME={__proto__:null,c:function(N){return O.H.useMemoCache(N)}},bt.cache=function(N){return function(){return N.apply(null,arguments)}},bt.cacheSignal=function(){return null},bt.cloneElement=function(N,Q,ue){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var Ue=A({},N.props),Fe=N.key;if(Q!=null)for(Ke in Q.key!==void 0&&(Fe=""+Q.key),Q)!E.call(Q,Ke)||Ke==="key"||Ke==="__self"||Ke==="__source"||Ke==="ref"&&Q.ref===void 0||(Ue[Ke]=Q[Ke]);var Ke=arguments.length-2;if(Ke===1)Ue.children=ue;else if(1<Ke){for(var re=Array(Ke),ye=0;ye<Ke;ye++)re[ye]=arguments[ye+2];Ue.children=re}return L(N.type,Fe,Ue)},bt.createContext=function(N){return N={$$typeof:u,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:c,_context:N},N},bt.createElement=function(N,Q,ue){var Ue,Fe={},Ke=null;if(Q!=null)for(Ue in Q.key!==void 0&&(Ke=""+Q.key),Q)E.call(Q,Ue)&&Ue!=="key"&&Ue!=="__self"&&Ue!=="__source"&&(Fe[Ue]=Q[Ue]);var re=arguments.length-2;if(re===1)Fe.children=ue;else if(1<re){for(var ye=Array(re),oe=0;oe<re;oe++)ye[oe]=arguments[oe+2];Fe.children=ye}if(N&&N.defaultProps)for(Ue in re=N.defaultProps,re)Fe[Ue]===void 0&&(Fe[Ue]=re[Ue]);return L(N,Ke,Fe)},bt.createRef=function(){return{current:null}},bt.forwardRef=function(N){return{$$typeof:h,render:N}},bt.isValidElement=G,bt.lazy=function(N){return{$$typeof:g,_payload:{_status:-1,_result:N},_init:ne}},bt.memo=function(N,Q){return{$$typeof:p,type:N,compare:Q===void 0?null:Q}},bt.startTransition=function(N){var Q=O.T,ue={};O.T=ue;try{var Ue=N(),Fe=O.S;Fe!==null&&Fe(ue,Ue),typeof Ue=="object"&&Ue!==null&&typeof Ue.then=="function"&&Ue.then(U,J)}catch(Ke){J(Ke)}finally{Q!==null&&ue.types!==null&&(Q.types=ue.types),O.T=Q}},bt.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},bt.use=function(N){return O.H.use(N)},bt.useActionState=function(N,Q,ue){return O.H.useActionState(N,Q,ue)},bt.useCallback=function(N,Q){return O.H.useCallback(N,Q)},bt.useContext=function(N){return O.H.useContext(N)},bt.useDebugValue=function(){},bt.useDeferredValue=function(N,Q){return O.H.useDeferredValue(N,Q)},bt.useEffect=function(N,Q){return O.H.useEffect(N,Q)},bt.useEffectEvent=function(N){return O.H.useEffectEvent(N)},bt.useId=function(){return O.H.useId()},bt.useImperativeHandle=function(N,Q,ue){return O.H.useImperativeHandle(N,Q,ue)},bt.useInsertionEffect=function(N,Q){return O.H.useInsertionEffect(N,Q)},bt.useLayoutEffect=function(N,Q){return O.H.useLayoutEffect(N,Q)},bt.useMemo=function(N,Q){return O.H.useMemo(N,Q)},bt.useOptimistic=function(N,Q){return O.H.useOptimistic(N,Q)},bt.useReducer=function(N,Q,ue){return O.H.useReducer(N,Q,ue)},bt.useRef=function(N){return O.H.useRef(N)},bt.useState=function(N){return O.H.useState(N)},bt.useSyncExternalStore=function(N,Q,ue){return O.H.useSyncExternalStore(N,Q,ue)},bt.useTransition=function(){return O.H.useTransition()},bt.version="19.2.7",bt}var Qv;function Bp(){return Qv||(Qv=1,td.exports=T1()),td.exports}var fi=Bp();const A1=b1(fi);var nd={exports:{}},gl={},id={exports:{}},ad={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jv;function R1(){return Jv||(Jv=1,(function(r){function e(P,k){var ne=P.length;P.push(k);e:for(;0<ne;){var J=ne-1>>>1,ee=P[J];if(0<o(ee,k))P[J]=k,P[ne]=ee,ne=J;else break e}}function n(P){return P.length===0?null:P[0]}function a(P){if(P.length===0)return null;var k=P[0],ne=P.pop();if(ne!==k){P[0]=ne;e:for(var J=0,ee=P.length,N=ee>>>1;J<N;){var Q=2*(J+1)-1,ue=P[Q],Ue=Q+1,Fe=P[Ue];if(0>o(ue,ne))Ue<ee&&0>o(Fe,ue)?(P[J]=Fe,P[Ue]=ne,J=Ue):(P[J]=ue,P[Q]=ne,J=Q);else if(Ue<ee&&0>o(Fe,ne))P[J]=Fe,P[Ue]=ne,J=Ue;else break e}}return k}function o(P,k){var ne=P.sortIndex-k.sortIndex;return ne!==0?ne:P.id-k.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,h=u.now();r.unstable_now=function(){return u.now()-h}}var d=[],p=[],g=1,_=null,v=3,x=!1,b=!1,A=!1,S=!1,y=typeof setTimeout=="function"?setTimeout:null,C=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function T(P){for(var k=n(p);k!==null;){if(k.callback===null)a(p);else if(k.startTime<=P)a(p),k.sortIndex=k.expirationTime,e(d,k);else break;k=n(p)}}function F(P){if(A=!1,T(P),!b)if(n(d)!==null)b=!0,U||(U=!0,X());else{var k=n(p);k!==null&&W(F,k.startTime-P)}}var U=!1,O=-1,E=5,L=-1;function H(){return S?!0:!(r.unstable_now()-L<E)}function G(){if(S=!1,U){var P=r.unstable_now();L=P;var k=!0;try{e:{b=!1,A&&(A=!1,C(O),O=-1),x=!0;var ne=v;try{t:{for(T(P),_=n(d);_!==null&&!(_.expirationTime>P&&H());){var J=_.callback;if(typeof J=="function"){_.callback=null,v=_.priorityLevel;var ee=J(_.expirationTime<=P);if(P=r.unstable_now(),typeof ee=="function"){_.callback=ee,T(P),k=!0;break t}_===n(d)&&a(d),T(P)}else a(d);_=n(d)}if(_!==null)k=!0;else{var N=n(p);N!==null&&W(F,N.startTime-P),k=!1}}break e}finally{_=null,v=ne,x=!1}k=void 0}}finally{k?X():U=!1}}}var X;if(typeof z=="function")X=function(){z(G)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,B=K.port2;K.port1.onmessage=G,X=function(){B.postMessage(null)}}else X=function(){y(G,0)};function W(P,k){O=y(function(){P(r.unstable_now())},k)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(P){P.callback=null},r.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<P?Math.floor(1e3/P):5},r.unstable_getCurrentPriorityLevel=function(){return v},r.unstable_next=function(P){switch(v){case 1:case 2:case 3:var k=3;break;default:k=v}var ne=v;v=k;try{return P()}finally{v=ne}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(P,k){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var ne=v;v=P;try{return k()}finally{v=ne}},r.unstable_scheduleCallback=function(P,k,ne){var J=r.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?J+ne:J):ne=J,P){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=ne+ee,P={id:g++,callback:k,priorityLevel:P,startTime:ne,expirationTime:ee,sortIndex:-1},ne>J?(P.sortIndex=ne,e(p,P),n(d)===null&&P===n(p)&&(A?(C(O),O=-1):A=!0,W(F,ne-J))):(P.sortIndex=ee,e(d,P),b||x||(b=!0,U||(U=!0,X()))),P},r.unstable_shouldYield=H,r.unstable_wrapCallback=function(P){var k=v;return function(){var ne=v;v=k;try{return P.apply(this,arguments)}finally{v=ne}}}})(ad)),ad}var jv;function C1(){return jv||(jv=1,id.exports=R1()),id.exports}var sd={exports:{}},Jn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $v;function D1(){if($v)return Jn;$v=1;var r=Bp();function e(d){var p="https://react.dev/errors/"+d;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+d+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(d,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:d,containerInfo:p,implementation:g}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(d,p){if(d==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Jn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Jn.createPortal=function(d,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(d,p,null,g)},Jn.flushSync=function(d){var p=u.T,g=a.p;try{if(u.T=null,a.p=2,d)return d()}finally{u.T=p,a.p=g,a.d.f()}},Jn.preconnect=function(d,p){typeof d=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(d,p))},Jn.prefetchDNS=function(d){typeof d=="string"&&a.d.D(d)},Jn.preinit=function(d,p){if(typeof d=="string"&&p&&typeof p.as=="string"){var g=p.as,_=h(g,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,x=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?a.d.S(d,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:x}):g==="script"&&a.d.X(d,{crossOrigin:_,integrity:v,fetchPriority:x,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Jn.preinitModule=function(d,p){if(typeof d=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=h(p.as,p.crossOrigin);a.d.M(d,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(d)},Jn.preload=function(d,p){if(typeof d=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=h(g,p.crossOrigin);a.d.L(d,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Jn.preloadModule=function(d,p){if(typeof d=="string")if(p){var g=h(p.as,p.crossOrigin);a.d.m(d,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(d)},Jn.requestFormReset=function(d){a.d.r(d)},Jn.unstable_batchedUpdates=function(d,p){return d(p)},Jn.useFormState=function(d,p,g){return u.H.useFormState(d,p,g)},Jn.useFormStatus=function(){return u.H.useHostTransitionStatus()},Jn.version="19.2.7",Jn}var e_;function U1(){if(e_)return sd.exports;e_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),sd.exports=D1(),sd.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var t_;function L1(){if(t_)return gl;t_=1;var r=C1(),e=Bp(),n=U1();function a(t){var i="https://react.dev/errors/"+t;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var i=t,s=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(s=i.return),t=i.return;while(t)}return i.tag===3?s:null}function u(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function h(t){if(t.tag===31){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function d(t){if(c(t)!==t)throw Error(a(188))}function p(t){var i=t.alternate;if(!i){if(i=c(t),i===null)throw Error(a(188));return i!==t?null:t}for(var s=t,l=i;;){var f=s.return;if(f===null)break;var m=f.alternate;if(m===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===m.child){for(m=f.child;m;){if(m===s)return d(f),t;if(m===l)return d(f),i;m=m.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=m;else{for(var M=!1,D=f.child;D;){if(D===s){M=!0,s=f,l=m;break}if(D===l){M=!0,l=f,s=m;break}D=D.sibling}if(!M){for(D=m.child;D;){if(D===s){M=!0,s=m,l=f;break}if(D===l){M=!0,l=m,s=f;break}D=D.sibling}if(!M)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?t:i}function g(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t;for(t=t.child;t!==null;){if(i=g(t),i!==null)return i;t=t.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),C=Symbol.for("react.consumer"),z=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),F=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),H=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function X(t){return t===null||typeof t!="object"?null:(t=G&&t[G]||t["@@iterator"],typeof t=="function"?t:null)}var K=Symbol.for("react.client.reference");function B(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===K?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case A:return"Fragment";case y:return"Profiler";case S:return"StrictMode";case F:return"Suspense";case U:return"SuspenseList";case L:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case b:return"Portal";case z:return t.displayName||"Context";case C:return(t._context.displayName||"Context")+".Consumer";case T:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case O:return i=t.displayName||null,i!==null?i:B(t.type)||"Memo";case E:i=t._payload,t=t._init;try{return B(t(i))}catch{}}return null}var W=Array.isArray,P=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ne={pending:!1,data:null,method:null,action:null},J=[],ee=-1;function N(t){return{current:t}}function Q(t){0>ee||(t.current=J[ee],J[ee]=null,ee--)}function ue(t,i){ee++,J[ee]=t.current,t.current=i}var Ue=N(null),Fe=N(null),Ke=N(null),re=N(null);function ye(t,i){switch(ue(Ke,i),ue(Fe,t),ue(Ue,null),i.nodeType){case 9:case 11:t=(t=i.documentElement)&&(t=t.namespaceURI)?gv(t):0;break;default:if(t=i.tagName,i=i.namespaceURI)i=gv(i),t=vv(i,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Q(Ue),ue(Ue,t)}function oe(){Q(Ue),Q(Fe),Q(Ke)}function ve(t){t.memoizedState!==null&&ue(re,t);var i=Ue.current,s=vv(i,t.type);i!==s&&(ue(Fe,t),ue(Ue,s))}function me(t){Fe.current===t&&(Q(Ue),Q(Fe)),re.current===t&&(Q(re),fl._currentValue=ne)}var Ae,qe;function de(t){if(Ae===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);Ae=i&&i[1]||"",qe=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ae+t+qe}var Ee=!1;function Te(t,i){if(!t||Ee)return"";Ee=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var De=function(){throw Error()};if(Object.defineProperty(De.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(De,[])}catch(xe){var pe=xe}Reflect.construct(t,[],De)}else{try{De.call()}catch(xe){pe=xe}t.call(De.prototype)}}else{try{throw Error()}catch(xe){pe=xe}(De=t())&&typeof De.catch=="function"&&De.catch(function(){})}}catch(xe){if(xe&&pe&&typeof xe.stack=="string")return[xe.stack,pe.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var m=l.DetermineComponentFrameRoot(),M=m[0],D=m[1];if(M&&D){var q=M.split(`
`),he=D.split(`
`);for(f=l=0;l<q.length&&!q[l].includes("DetermineComponentFrameRoot");)l++;for(;f<he.length&&!he[f].includes("DetermineComponentFrameRoot");)f++;if(l===q.length||f===he.length)for(l=q.length-1,f=he.length-1;1<=l&&0<=f&&q[l]!==he[f];)f--;for(;1<=l&&0<=f;l--,f--)if(q[l]!==he[f]){if(l!==1||f!==1)do if(l--,f--,0>f||q[l]!==he[f]){var we=`
`+q[l].replace(" at new "," at ");return t.displayName&&we.includes("<anonymous>")&&(we=we.replace("<anonymous>",t.displayName)),we}while(1<=l&&0<=f);break}}}finally{Ee=!1,Error.prepareStackTrace=s}return(s=t?t.displayName||t.name:"")?de(s):""}function Ne(t,i){switch(t.tag){case 26:case 27:case 5:return de(t.type);case 16:return de("Lazy");case 13:return t.child!==i&&i!==null?de("Suspense Fallback"):de("Suspense");case 19:return de("SuspenseList");case 0:case 15:return Te(t.type,!1);case 11:return Te(t.type.render,!1);case 1:return Te(t.type,!0);case 31:return de("Activity");default:return""}}function Oe(t){try{var i="",s=null;do i+=Ne(t,s),s=t,t=t.return;while(t);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var at=Object.prototype.hasOwnProperty,Be=r.unstable_scheduleCallback,pt=r.unstable_cancelCallback,rt=r.unstable_shouldYield,Z=r.unstable_requestPaint,mt=r.unstable_now,Mt=r.unstable_getCurrentPriorityLevel,I=r.unstable_ImmediatePriority,w=r.unstable_UserBlockingPriority,te=r.unstable_NormalPriority,ce=r.unstable_LowPriority,_e=r.unstable_IdlePriority,ze=r.log,Ve=r.unstable_setDisableYieldValue,ge=null,Se=null;function Ie(t){if(typeof ze=="function"&&Ve(t),Se&&typeof Se.setStrictMode=="function")try{Se.setStrictMode(ge,t)}catch{}}var Je=Math.clz32?Math.clz32:ft,Ze=Math.log,Xe=Math.LN2;function ft(t){return t>>>=0,t===0?32:31-(Ze(t)/Xe|0)|0}var nt=256,xt=262144,$=4194304;function Ge(t){var i=t&42;if(i!==0)return i;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Me(t,i,s){var l=t.pendingLanes;if(l===0)return 0;var f=0,m=t.suspendedLanes,M=t.pingedLanes;t=t.warmLanes;var D=l&134217727;return D!==0?(l=D&~m,l!==0?f=Ge(l):(M&=D,M!==0?f=Ge(M):s||(s=D&~t,s!==0&&(f=Ge(s))))):(D=l&~m,D!==0?f=Ge(D):M!==0?f=Ge(M):s||(s=l&~t,s!==0&&(f=Ge(s)))),f===0?0:i!==0&&i!==f&&(i&m)===0&&(m=f&-f,s=i&-i,m>=s||m===32&&(s&4194048)!==0)?i:f}function He(t,i){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&i)===0}function Qe(t,i){switch(t){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Le(){var t=$;return $<<=1,($&62914560)===0&&($=4194304),t}function lt(t){for(var i=[],s=0;31>s;s++)i.push(t);return i}function it(t,i){t.pendingLanes|=i,i!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Qt(t,i,s,l,f,m){var M=t.pendingLanes;t.pendingLanes=s,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=s,t.entangledLanes&=s,t.errorRecoveryDisabledLanes&=s,t.shellSuspendCounter=0;var D=t.entanglements,q=t.expirationTimes,he=t.hiddenUpdates;for(s=M&~s;0<s;){var we=31-Je(s),De=1<<we;D[we]=0,q[we]=-1;var pe=he[we];if(pe!==null)for(he[we]=null,we=0;we<pe.length;we++){var xe=pe[we];xe!==null&&(xe.lane&=-536870913)}s&=~De}l!==0&&Pt(t,l,0),m!==0&&f===0&&t.tag!==0&&(t.suspendedLanes|=m&~(M&~i))}function Pt(t,i,s){t.pendingLanes|=i,t.suspendedLanes&=~i;var l=31-Je(i);t.entangledLanes|=i,t.entanglements[l]=t.entanglements[l]|1073741824|s&261930}function Vn(t,i){var s=t.entangledLanes|=i;for(t=t.entanglements;s;){var l=31-Je(s),f=1<<l;f&i|t[l]&i&&(t[l]|=i),s&=~f}}function kn(t,i){var s=i&-i;return s=(s&42)!==0?1:ss(s),(s&(t.suspendedLanes|i))!==0?0:s}function ss(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Aa(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function si(){var t=k.p;return t!==0?t:(t=window.event,t===void 0?32:Hv(t.type))}function la(t,i){var s=k.p;try{return k.p=t,i()}finally{k.p=s}}var Mi=Math.random().toString(36).slice(2),gn="__reactFiber$"+Mi,Ln="__reactProps$"+Mi,Qn="__reactContainer$"+Mi,Fi="__reactEvents$"+Mi,Sr="__reactListeners$"+Mi,Ra="__reactHandles$"+Mi,ca="__reactResources$"+Mi,ua="__reactMarker$"+Mi;function fa(t){delete t[gn],delete t[Ln],delete t[Fi],delete t[Sr],delete t[Ra]}function Ce(t){var i=t[gn];if(i)return i;for(var s=t.parentNode;s;){if(i=s[Qn]||s[gn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(t=Ev(t);t!==null;){if(s=t[gn])return s;t=Ev(t)}return i}t=s,s=t.parentNode}return null}function be(t){if(t=t[gn]||t[Qn]){var i=t.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return t}return null}function ct(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t.stateNode;throw Error(a(33))}function dt(t){var i=t[ca];return i||(i=t[ca]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function gt(t){t[ua]=!0}var Gt=new Set,Xt={};function R(t,i){Y(t,i),Y(t+"Capture",i)}function Y(t,i){for(Xt[t]=i,t=0;t<i.length;t++)Gt.add(i[t])}var le=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ae={},se={};function ke(t){return at.call(se,t)?!0:at.call(ae,t)?!1:le.test(t)?se[t]=!0:(ae[t]=!0,!1)}function $e(t,i,s){if(ke(i))if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":t.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(i);return}}t.setAttribute(i,""+s)}}function Ye(t,i,s){if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(i);return}t.setAttribute(i,""+s)}}function et(t,i,s,l){if(l===null)t.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(s);return}t.setAttributeNS(i,s,""+l)}}function We(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function yt(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ut(t,i,s){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,i);if(!t.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,m=l.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return f.call(this)},set:function(M){s=""+M,m.call(this,M)}}),Object.defineProperty(t,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(M){s=""+M},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function ot(t){if(!t._valueTracker){var i=yt(t)?"checked":"value";t._valueTracker=Ut(t,i,""+t[i])}}function Vt(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return t&&(l=yt(t)?t.checked?"true":"false":t.value),t=l,t!==s?(i.setValue(t),!0):!1}function cn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var on=/[\n"\\]/g;function Rt(t){return t.replace(on,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Tn(t,i,s,l,f,m,M,D){t.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?t.type=M:t.removeAttribute("type"),i!=null?M==="number"?(i===0&&t.value===""||t.value!=i)&&(t.value=""+We(i)):t.value!==""+We(i)&&(t.value=""+We(i)):M!=="submit"&&M!=="reset"||t.removeAttribute("value"),i!=null?Nn(t,M,We(i)):s!=null?Nn(t,M,We(s)):l!=null&&t.removeAttribute("value"),f==null&&m!=null&&(t.defaultChecked=!!m),f!=null&&(t.checked=f&&typeof f!="function"&&typeof f!="symbol"),D!=null&&typeof D!="function"&&typeof D!="symbol"&&typeof D!="boolean"?t.name=""+We(D):t.removeAttribute("name")}function st(t,i,s,l,f,m,M,D){if(m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(t.type=m),i!=null||s!=null){if(!(m!=="submit"&&m!=="reset"||i!=null)){ot(t);return}s=s!=null?""+We(s):"",i=i!=null?""+We(i):s,D||i===t.value||(t.value=i),t.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=D?t.checked:!!l,t.defaultChecked=!!l,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(t.name=M),ot(t)}function Nn(t,i,s){i==="number"&&cn(t.ownerDocument)===t||t.defaultValue===""+s||(t.defaultValue=""+s)}function Ct(t,i,s,l){if(t=t.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<t.length;s++)f=i.hasOwnProperty("$"+t[s].value),t[s].selected!==f&&(t[s].selected=f),f&&l&&(t[s].defaultSelected=!0)}else{for(s=""+We(s),i=null,f=0;f<t.length;f++){if(t[f].value===s){t[f].selected=!0,l&&(t[f].defaultSelected=!0);return}i!==null||t[f].disabled||(i=t[f])}i!==null&&(i.selected=!0)}}function ri(t,i,s){if(i!=null&&(i=""+We(i),i!==t.value&&(t.value=i),s==null)){t.defaultValue!==i&&(t.defaultValue=i);return}t.defaultValue=s!=null?""+We(s):""}function bi(t,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(W(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=We(i),t.defaultValue=s,l=t.textContent,l===s&&l!==""&&l!==null&&(t.value=l),ot(t)}function oi(t,i){if(i){var s=t.firstChild;if(s&&s===t.lastChild&&s.nodeType===3){s.nodeValue=i;return}}t.textContent=i}var rs=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Zt(t,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="":l?t.setProperty(i,s):typeof s!="number"||s===0||rs.has(i)?i==="float"?t.cssFloat=s:t[i]=(""+s).trim():t[i]=s+"px"}function dn(t,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(t=t.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&Zt(t,f,l)}else for(var m in i)i.hasOwnProperty(m)&&Zt(t,m,i[m])}function Bi(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var tn=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ha=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ji(t){return ha.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ii(){}var Qu=null;function Ju(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Mr=null,br=null;function m0(t){var i=be(t);if(i&&(t=i.stateNode)){var s=t[Ln]||null;e:switch(t=i.stateNode,i.type){case"input":if(Tn(t,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=t;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+Rt(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==t&&l.form===t.form){var f=l[Ln]||null;if(!f)throw Error(a(90));Tn(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===t.form&&Vt(l)}break e;case"textarea":ri(t,s.value,s.defaultValue);break e;case"select":i=s.value,i!=null&&Ct(t,!!s.multiple,i,!1)}}}var ju=!1;function g0(t,i,s){if(ju)return t(i,s);ju=!0;try{var l=t(i);return l}finally{if(ju=!1,(Mr!==null||br!==null)&&(zc(),Mr&&(i=Mr,t=br,br=Mr=null,m0(i),t)))for(i=0;i<t.length;i++)m0(t[i])}}function Ro(t,i){var s=t.stateNode;if(s===null)return null;var l=s[Ln]||null;if(l===null)return null;s=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var Ca=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$u=!1;if(Ca)try{var Co={};Object.defineProperty(Co,"passive",{get:function(){$u=!0}}),window.addEventListener("test",Co,Co),window.removeEventListener("test",Co,Co)}catch{$u=!1}var os=null,ef=null,Ql=null;function v0(){if(Ql)return Ql;var t,i=ef,s=i.length,l,f="value"in os?os.value:os.textContent,m=f.length;for(t=0;t<s&&i[t]===f[t];t++);var M=s-t;for(l=1;l<=M&&i[s-l]===f[m-l];l++);return Ql=f.slice(t,1<l?1-l:void 0)}function Jl(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function jl(){return!0}function _0(){return!1}function pi(t){function i(s,l,f,m,M){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=m,this.target=M,this.currentTarget=null;for(var D in t)t.hasOwnProperty(D)&&(s=t[D],this[D]=s?s(m):m[D]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?jl:_0,this.isPropagationStopped=_0,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=jl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=jl)},persist:function(){},isPersistent:jl}),i}var Is={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$l=pi(Is),Do=_({},Is,{view:0,detail:0}),Sy=pi(Do),tf,nf,Uo,ec=_({},Do,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Uo&&(Uo&&t.type==="mousemove"?(tf=t.screenX-Uo.screenX,nf=t.screenY-Uo.screenY):nf=tf=0,Uo=t),tf)},movementY:function(t){return"movementY"in t?t.movementY:nf}}),x0=pi(ec),My=_({},ec,{dataTransfer:0}),by=pi(My),Ey=_({},Do,{relatedTarget:0}),af=pi(Ey),wy=_({},Is,{animationName:0,elapsedTime:0,pseudoElement:0}),Ty=pi(wy),Ay=_({},Is,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Ry=pi(Ay),Cy=_({},Is,{data:0}),y0=pi(Cy),Dy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Uy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ly={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ny(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Ly[t])?!!i[t]:!1}function sf(){return Ny}var Py=_({},Do,{key:function(t){if(t.key){var i=Dy[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=Jl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Uy[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sf,charCode:function(t){return t.type==="keypress"?Jl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Jl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Oy=pi(Py),zy=_({},ec,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),S0=pi(zy),Fy=_({},Do,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sf}),By=pi(Fy),Iy=_({},Is,{propertyName:0,elapsedTime:0,pseudoElement:0}),Hy=pi(Iy),Gy=_({},ec,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Vy=pi(Gy),ky=_({},Is,{newState:0,oldState:0}),Wy=pi(ky),Xy=[9,13,27,32],rf=Ca&&"CompositionEvent"in window,Lo=null;Ca&&"documentMode"in document&&(Lo=document.documentMode);var qy=Ca&&"TextEvent"in window&&!Lo,M0=Ca&&(!rf||Lo&&8<Lo&&11>=Lo),b0=" ",E0=!1;function w0(t,i){switch(t){case"keyup":return Xy.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function T0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Er=!1;function Yy(t,i){switch(t){case"compositionend":return T0(i);case"keypress":return i.which!==32?null:(E0=!0,b0);case"textInput":return t=i.data,t===b0&&E0?null:t;default:return null}}function Zy(t,i){if(Er)return t==="compositionend"||!rf&&w0(t,i)?(t=v0(),Ql=ef=os=null,Er=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return M0&&i.locale!=="ko"?null:i.data;default:return null}}var Ky={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function A0(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Ky[t.type]:i==="textarea"}function R0(t,i,s,l){Mr?br?br.push(l):br=[l]:Mr=l,i=kc(i,"onChange"),0<i.length&&(s=new $l("onChange","change",null,s,l),t.push({event:s,listeners:i}))}var No=null,Po=null;function Qy(t){uv(t,0)}function tc(t){var i=ct(t);if(Vt(i))return t}function C0(t,i){if(t==="change")return i}var D0=!1;if(Ca){var of;if(Ca){var lf="oninput"in document;if(!lf){var U0=document.createElement("div");U0.setAttribute("oninput","return;"),lf=typeof U0.oninput=="function"}of=lf}else of=!1;D0=of&&(!document.documentMode||9<document.documentMode)}function L0(){No&&(No.detachEvent("onpropertychange",N0),Po=No=null)}function N0(t){if(t.propertyName==="value"&&tc(Po)){var i=[];R0(i,Po,t,Ju(t)),g0(Qy,i)}}function Jy(t,i,s){t==="focusin"?(L0(),No=i,Po=s,No.attachEvent("onpropertychange",N0)):t==="focusout"&&L0()}function jy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return tc(Po)}function $y(t,i){if(t==="click")return tc(i)}function eS(t,i){if(t==="input"||t==="change")return tc(i)}function tS(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var Ei=typeof Object.is=="function"?Object.is:tS;function Oo(t,i){if(Ei(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var s=Object.keys(t),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!at.call(i,f)||!Ei(t[f],i[f]))return!1}return!0}function P0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function O0(t,i){var s=P0(t);t=0;for(var l;s;){if(s.nodeType===3){if(l=t+s.textContent.length,t<=i&&l>=i)return{node:s,offset:i-t};t=l}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=P0(s)}}function z0(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?z0(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function F0(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var i=cn(t.document);i instanceof t.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)t=i.contentWindow;else break;i=cn(t.document)}return i}function cf(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}var nS=Ca&&"documentMode"in document&&11>=document.documentMode,wr=null,uf=null,zo=null,ff=!1;function B0(t,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;ff||wr==null||wr!==cn(l)||(l=wr,"selectionStart"in l&&cf(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),zo&&Oo(zo,l)||(zo=l,l=kc(uf,"onSelect"),0<l.length&&(i=new $l("onSelect","select",null,i,s),t.push({event:i,listeners:l}),i.target=wr)))}function Hs(t,i){var s={};return s[t.toLowerCase()]=i.toLowerCase(),s["Webkit"+t]="webkit"+i,s["Moz"+t]="moz"+i,s}var Tr={animationend:Hs("Animation","AnimationEnd"),animationiteration:Hs("Animation","AnimationIteration"),animationstart:Hs("Animation","AnimationStart"),transitionrun:Hs("Transition","TransitionRun"),transitionstart:Hs("Transition","TransitionStart"),transitioncancel:Hs("Transition","TransitionCancel"),transitionend:Hs("Transition","TransitionEnd")},hf={},I0={};Ca&&(I0=document.createElement("div").style,"AnimationEvent"in window||(delete Tr.animationend.animation,delete Tr.animationiteration.animation,delete Tr.animationstart.animation),"TransitionEvent"in window||delete Tr.transitionend.transition);function Gs(t){if(hf[t])return hf[t];if(!Tr[t])return t;var i=Tr[t],s;for(s in i)if(i.hasOwnProperty(s)&&s in I0)return hf[t]=i[s];return t}var H0=Gs("animationend"),G0=Gs("animationiteration"),V0=Gs("animationstart"),iS=Gs("transitionrun"),aS=Gs("transitionstart"),sS=Gs("transitioncancel"),k0=Gs("transitionend"),W0=new Map,df="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");df.push("scrollEnd");function ji(t,i){W0.set(t,i),R(i,[t])}var nc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Hi=[],Ar=0,pf=0;function ic(){for(var t=Ar,i=pf=Ar=0;i<t;){var s=Hi[i];Hi[i++]=null;var l=Hi[i];Hi[i++]=null;var f=Hi[i];Hi[i++]=null;var m=Hi[i];if(Hi[i++]=null,l!==null&&f!==null){var M=l.pending;M===null?f.next=f:(f.next=M.next,M.next=f),l.pending=f}m!==0&&X0(s,f,m)}}function ac(t,i,s,l){Hi[Ar++]=t,Hi[Ar++]=i,Hi[Ar++]=s,Hi[Ar++]=l,pf|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function mf(t,i,s,l){return ac(t,i,s,l),sc(t)}function Vs(t,i){return ac(t,null,null,i),sc(t)}function X0(t,i,s){t.lanes|=s;var l=t.alternate;l!==null&&(l.lanes|=s);for(var f=!1,m=t.return;m!==null;)m.childLanes|=s,l=m.alternate,l!==null&&(l.childLanes|=s),m.tag===22&&(t=m.stateNode,t===null||t._visibility&1||(f=!0)),t=m,m=m.return;return t.tag===3?(m=t.stateNode,f&&i!==null&&(f=31-Je(s),t=m.hiddenUpdates,l=t[f],l===null?t[f]=[i]:l.push(i),i.lane=s|536870912),m):null}function sc(t){if(50<al)throw al=0,Eh=null,Error(a(185));for(var i=t.return;i!==null;)t=i,i=t.return;return t.tag===3?t.stateNode:null}var Rr={};function rS(t,i,s,l){this.tag=t,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function wi(t,i,s,l){return new rS(t,i,s,l)}function gf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Da(t,i){var s=t.alternate;return s===null?(s=wi(t.tag,i,t.key,t.mode),s.elementType=t.elementType,s.type=t.type,s.stateNode=t.stateNode,s.alternate=t,t.alternate=s):(s.pendingProps=i,s.type=t.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=t.flags&65011712,s.childLanes=t.childLanes,s.lanes=t.lanes,s.child=t.child,s.memoizedProps=t.memoizedProps,s.memoizedState=t.memoizedState,s.updateQueue=t.updateQueue,i=t.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=t.sibling,s.index=t.index,s.ref=t.ref,s.refCleanup=t.refCleanup,s}function q0(t,i){t.flags&=65011714;var s=t.alternate;return s===null?(t.childLanes=0,t.lanes=i,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=s.childLanes,t.lanes=s.lanes,t.child=s.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=s.memoizedProps,t.memoizedState=s.memoizedState,t.updateQueue=s.updateQueue,t.type=s.type,i=s.dependencies,t.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),t}function rc(t,i,s,l,f,m){var M=0;if(l=t,typeof t=="function")gf(t)&&(M=1);else if(typeof t=="string")M=f1(t,s,Ue.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case L:return t=wi(31,s,i,f),t.elementType=L,t.lanes=m,t;case A:return ks(s.children,f,m,i);case S:M=8,f|=24;break;case y:return t=wi(12,s,i,f|2),t.elementType=y,t.lanes=m,t;case F:return t=wi(13,s,i,f),t.elementType=F,t.lanes=m,t;case U:return t=wi(19,s,i,f),t.elementType=U,t.lanes=m,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case z:M=10;break e;case C:M=9;break e;case T:M=11;break e;case O:M=14;break e;case E:M=16,l=null;break e}M=29,s=Error(a(130,t===null?"null":typeof t,"")),l=null}return i=wi(M,s,i,f),i.elementType=t,i.type=l,i.lanes=m,i}function ks(t,i,s,l){return t=wi(7,t,l,i),t.lanes=s,t}function vf(t,i,s){return t=wi(6,t,null,i),t.lanes=s,t}function Y0(t){var i=wi(18,null,null,0);return i.stateNode=t,i}function _f(t,i,s){return i=wi(4,t.children!==null?t.children:[],t.key,i),i.lanes=s,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}var Z0=new WeakMap;function Gi(t,i){if(typeof t=="object"&&t!==null){var s=Z0.get(t);return s!==void 0?s:(i={value:t,source:i,stack:Oe(i)},Z0.set(t,i),i)}return{value:t,source:i,stack:Oe(i)}}var Cr=[],Dr=0,oc=null,Fo=0,Vi=[],ki=0,ls=null,da=1,pa="";function Ua(t,i){Cr[Dr++]=Fo,Cr[Dr++]=oc,oc=t,Fo=i}function K0(t,i,s){Vi[ki++]=da,Vi[ki++]=pa,Vi[ki++]=ls,ls=t;var l=da;t=pa;var f=32-Je(l)-1;l&=~(1<<f),s+=1;var m=32-Je(i)+f;if(30<m){var M=f-f%5;m=(l&(1<<M)-1).toString(32),l>>=M,f-=M,da=1<<32-Je(i)+f|s<<f|l,pa=m+t}else da=1<<m|s<<f|l,pa=t}function xf(t){t.return!==null&&(Ua(t,1),K0(t,1,0))}function yf(t){for(;t===oc;)oc=Cr[--Dr],Cr[Dr]=null,Fo=Cr[--Dr],Cr[Dr]=null;for(;t===ls;)ls=Vi[--ki],Vi[ki]=null,pa=Vi[--ki],Vi[ki]=null,da=Vi[--ki],Vi[ki]=null}function Q0(t,i){Vi[ki++]=da,Vi[ki++]=pa,Vi[ki++]=ls,da=i.id,pa=i.overflow,ls=t}var Wn=null,un=null,Bt=!1,cs=null,Wi=!1,Sf=Error(a(519));function us(t){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Bo(Gi(i,t)),Sf}function J0(t){var i=t.stateNode,s=t.type,l=t.memoizedProps;switch(i[gn]=t,i[Ln]=l,s){case"dialog":Nt("cancel",i),Nt("close",i);break;case"iframe":case"object":case"embed":Nt("load",i);break;case"video":case"audio":for(s=0;s<rl.length;s++)Nt(rl[s],i);break;case"source":Nt("error",i);break;case"img":case"image":case"link":Nt("error",i),Nt("load",i);break;case"details":Nt("toggle",i);break;case"input":Nt("invalid",i),st(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":Nt("invalid",i);break;case"textarea":Nt("invalid",i),bi(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||pv(i.textContent,s)?(l.popover!=null&&(Nt("beforetoggle",i),Nt("toggle",i)),l.onScroll!=null&&Nt("scroll",i),l.onScrollEnd!=null&&Nt("scrollend",i),l.onClick!=null&&(i.onclick=Ii),i=!0):i=!1,i||us(t,!0)}function j0(t){for(Wn=t.return;Wn;)switch(Wn.tag){case 5:case 31:case 13:Wi=!1;return;case 27:case 3:Wi=!0;return;default:Wn=Wn.return}}function Ur(t){if(t!==Wn)return!1;if(!Bt)return j0(t),Bt=!0,!1;var i=t.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=t.type,s=!(s!=="form"&&s!=="button")||Ih(t.type,t.memoizedProps)),s=!s),s&&un&&us(t),j0(t),i===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(317));un=bv(t)}else if(i===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(317));un=bv(t)}else i===27?(i=un,Es(t.type)?(t=Wh,Wh=null,un=t):un=i):un=Wn?qi(t.stateNode.nextSibling):null;return!0}function Ws(){un=Wn=null,Bt=!1}function Mf(){var t=cs;return t!==null&&(_i===null?_i=t:_i.push.apply(_i,t),cs=null),t}function Bo(t){cs===null?cs=[t]:cs.push(t)}var bf=N(null),Xs=null,La=null;function fs(t,i,s){ue(bf,i._currentValue),i._currentValue=s}function Na(t){t._currentValue=bf.current,Q(bf)}function Ef(t,i,s){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===s)break;t=t.return}}function wf(t,i,s,l){var f=t.child;for(f!==null&&(f.return=t);f!==null;){var m=f.dependencies;if(m!==null){var M=f.child;m=m.firstContext;e:for(;m!==null;){var D=m;m=f;for(var q=0;q<i.length;q++)if(D.context===i[q]){m.lanes|=s,D=m.alternate,D!==null&&(D.lanes|=s),Ef(m.return,s,t),l||(M=null);break e}m=D.next}}else if(f.tag===18){if(M=f.return,M===null)throw Error(a(341));M.lanes|=s,m=M.alternate,m!==null&&(m.lanes|=s),Ef(M,s,t),M=null}else M=f.child;if(M!==null)M.return=f;else for(M=f;M!==null;){if(M===t){M=null;break}if(f=M.sibling,f!==null){f.return=M.return,M=f;break}M=M.return}f=M}}function Lr(t,i,s,l){t=null;for(var f=i,m=!1;f!==null;){if(!m){if((f.flags&524288)!==0)m=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var M=f.alternate;if(M===null)throw Error(a(387));if(M=M.memoizedProps,M!==null){var D=f.type;Ei(f.pendingProps.value,M.value)||(t!==null?t.push(D):t=[D])}}else if(f===re.current){if(M=f.alternate,M===null)throw Error(a(387));M.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(t!==null?t.push(fl):t=[fl])}f=f.return}t!==null&&wf(i,t,s,l),i.flags|=262144}function lc(t){for(t=t.firstContext;t!==null;){if(!Ei(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function qs(t){Xs=t,La=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Xn(t){return $0(Xs,t)}function cc(t,i){return Xs===null&&qs(t),$0(t,i)}function $0(t,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},La===null){if(t===null)throw Error(a(308));La=i,t.dependencies={lanes:0,firstContext:i},t.flags|=524288}else La=La.next=i;return s}var oS=typeof AbortController<"u"?AbortController:function(){var t=[],i=this.signal={aborted:!1,addEventListener:function(s,l){t.push(l)}};this.abort=function(){i.aborted=!0,t.forEach(function(s){return s()})}},lS=r.unstable_scheduleCallback,cS=r.unstable_NormalPriority,An={$$typeof:z,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Tf(){return{controller:new oS,data:new Map,refCount:0}}function Io(t){t.refCount--,t.refCount===0&&lS(cS,function(){t.controller.abort()})}var Ho=null,Af=0,Nr=0,Pr=null;function uS(t,i){if(Ho===null){var s=Ho=[];Af=0,Nr=Dh(),Pr={status:"pending",value:void 0,then:function(l){s.push(l)}}}return Af++,i.then(em,em),i}function em(){if(--Af===0&&Ho!==null){Pr!==null&&(Pr.status="fulfilled");var t=Ho;Ho=null,Nr=0,Pr=null;for(var i=0;i<t.length;i++)(0,t[i])()}}function fS(t,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return t.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var tm=P.S;P.S=function(t,i){Bg=mt(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&uS(t,i),tm!==null&&tm(t,i)};var Ys=N(null);function Rf(){var t=Ys.current;return t!==null?t:ln.pooledCache}function uc(t,i){i===null?ue(Ys,Ys.current):ue(Ys,i.pool)}function nm(){var t=Rf();return t===null?null:{parent:An._currentValue,pool:t}}var Or=Error(a(460)),Cf=Error(a(474)),fc=Error(a(542)),hc={then:function(){}};function im(t){return t=t.status,t==="fulfilled"||t==="rejected"}function am(t,i,s){switch(s=t[s],s===void 0?t.push(i):s!==i&&(i.then(Ii,Ii),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,rm(t),t;default:if(typeof i.status=="string")i.then(Ii,Ii);else{if(t=ln,t!==null&&100<t.shellSuspendCounter)throw Error(a(482));t=i,t.status="pending",t.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,rm(t),t}throw Ks=i,Or}}function Zs(t){try{var i=t._init;return i(t._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Ks=s,Or):s}}var Ks=null;function sm(){if(Ks===null)throw Error(a(459));var t=Ks;return Ks=null,t}function rm(t){if(t===Or||t===fc)throw Error(a(483))}var zr=null,Go=0;function dc(t){var i=Go;return Go+=1,zr===null&&(zr=[]),am(zr,t,i)}function Vo(t,i){i=i.props.ref,t.ref=i!==void 0?i:null}function pc(t,i){throw i.$$typeof===v?Error(a(525)):(t=Object.prototype.toString.call(i),Error(a(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t)))}function om(t){function i(ie,j){if(t){var fe=ie.deletions;fe===null?(ie.deletions=[j],ie.flags|=16):fe.push(j)}}function s(ie,j){if(!t)return null;for(;j!==null;)i(ie,j),j=j.sibling;return null}function l(ie){for(var j=new Map;ie!==null;)ie.key!==null?j.set(ie.key,ie):j.set(ie.index,ie),ie=ie.sibling;return j}function f(ie,j){return ie=Da(ie,j),ie.index=0,ie.sibling=null,ie}function m(ie,j,fe){return ie.index=fe,t?(fe=ie.alternate,fe!==null?(fe=fe.index,fe<j?(ie.flags|=67108866,j):fe):(ie.flags|=67108866,j)):(ie.flags|=1048576,j)}function M(ie){return t&&ie.alternate===null&&(ie.flags|=67108866),ie}function D(ie,j,fe,Re){return j===null||j.tag!==6?(j=vf(fe,ie.mode,Re),j.return=ie,j):(j=f(j,fe),j.return=ie,j)}function q(ie,j,fe,Re){var vt=fe.type;return vt===A?we(ie,j,fe.props.children,Re,fe.key):j!==null&&(j.elementType===vt||typeof vt=="object"&&vt!==null&&vt.$$typeof===E&&Zs(vt)===j.type)?(j=f(j,fe.props),Vo(j,fe),j.return=ie,j):(j=rc(fe.type,fe.key,fe.props,null,ie.mode,Re),Vo(j,fe),j.return=ie,j)}function he(ie,j,fe,Re){return j===null||j.tag!==4||j.stateNode.containerInfo!==fe.containerInfo||j.stateNode.implementation!==fe.implementation?(j=_f(fe,ie.mode,Re),j.return=ie,j):(j=f(j,fe.children||[]),j.return=ie,j)}function we(ie,j,fe,Re,vt){return j===null||j.tag!==7?(j=ks(fe,ie.mode,Re,vt),j.return=ie,j):(j=f(j,fe),j.return=ie,j)}function De(ie,j,fe){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=vf(""+j,ie.mode,fe),j.return=ie,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case x:return fe=rc(j.type,j.key,j.props,null,ie.mode,fe),Vo(fe,j),fe.return=ie,fe;case b:return j=_f(j,ie.mode,fe),j.return=ie,j;case E:return j=Zs(j),De(ie,j,fe)}if(W(j)||X(j))return j=ks(j,ie.mode,fe,null),j.return=ie,j;if(typeof j.then=="function")return De(ie,dc(j),fe);if(j.$$typeof===z)return De(ie,cc(ie,j),fe);pc(ie,j)}return null}function pe(ie,j,fe,Re){var vt=j!==null?j.key:null;if(typeof fe=="string"&&fe!==""||typeof fe=="number"||typeof fe=="bigint")return vt!==null?null:D(ie,j,""+fe,Re);if(typeof fe=="object"&&fe!==null){switch(fe.$$typeof){case x:return fe.key===vt?q(ie,j,fe,Re):null;case b:return fe.key===vt?he(ie,j,fe,Re):null;case E:return fe=Zs(fe),pe(ie,j,fe,Re)}if(W(fe)||X(fe))return vt!==null?null:we(ie,j,fe,Re,null);if(typeof fe.then=="function")return pe(ie,j,dc(fe),Re);if(fe.$$typeof===z)return pe(ie,j,cc(ie,fe),Re);pc(ie,fe)}return null}function xe(ie,j,fe,Re,vt){if(typeof Re=="string"&&Re!==""||typeof Re=="number"||typeof Re=="bigint")return ie=ie.get(fe)||null,D(j,ie,""+Re,vt);if(typeof Re=="object"&&Re!==null){switch(Re.$$typeof){case x:return ie=ie.get(Re.key===null?fe:Re.key)||null,q(j,ie,Re,vt);case b:return ie=ie.get(Re.key===null?fe:Re.key)||null,he(j,ie,Re,vt);case E:return Re=Zs(Re),xe(ie,j,fe,Re,vt)}if(W(Re)||X(Re))return ie=ie.get(fe)||null,we(j,ie,Re,vt,null);if(typeof Re.then=="function")return xe(ie,j,fe,dc(Re),vt);if(Re.$$typeof===z)return xe(ie,j,fe,cc(j,Re),vt);pc(j,Re)}return null}function ut(ie,j,fe,Re){for(var vt=null,qt=null,ht=j,Tt=j=0,zt=null;ht!==null&&Tt<fe.length;Tt++){ht.index>Tt?(zt=ht,ht=null):zt=ht.sibling;var Yt=pe(ie,ht,fe[Tt],Re);if(Yt===null){ht===null&&(ht=zt);break}t&&ht&&Yt.alternate===null&&i(ie,ht),j=m(Yt,j,Tt),qt===null?vt=Yt:qt.sibling=Yt,qt=Yt,ht=zt}if(Tt===fe.length)return s(ie,ht),Bt&&Ua(ie,Tt),vt;if(ht===null){for(;Tt<fe.length;Tt++)ht=De(ie,fe[Tt],Re),ht!==null&&(j=m(ht,j,Tt),qt===null?vt=ht:qt.sibling=ht,qt=ht);return Bt&&Ua(ie,Tt),vt}for(ht=l(ht);Tt<fe.length;Tt++)zt=xe(ht,ie,Tt,fe[Tt],Re),zt!==null&&(t&&zt.alternate!==null&&ht.delete(zt.key===null?Tt:zt.key),j=m(zt,j,Tt),qt===null?vt=zt:qt.sibling=zt,qt=zt);return t&&ht.forEach(function(Cs){return i(ie,Cs)}),Bt&&Ua(ie,Tt),vt}function _t(ie,j,fe,Re){if(fe==null)throw Error(a(151));for(var vt=null,qt=null,ht=j,Tt=j=0,zt=null,Yt=fe.next();ht!==null&&!Yt.done;Tt++,Yt=fe.next()){ht.index>Tt?(zt=ht,ht=null):zt=ht.sibling;var Cs=pe(ie,ht,Yt.value,Re);if(Cs===null){ht===null&&(ht=zt);break}t&&ht&&Cs.alternate===null&&i(ie,ht),j=m(Cs,j,Tt),qt===null?vt=Cs:qt.sibling=Cs,qt=Cs,ht=zt}if(Yt.done)return s(ie,ht),Bt&&Ua(ie,Tt),vt;if(ht===null){for(;!Yt.done;Tt++,Yt=fe.next())Yt=De(ie,Yt.value,Re),Yt!==null&&(j=m(Yt,j,Tt),qt===null?vt=Yt:qt.sibling=Yt,qt=Yt);return Bt&&Ua(ie,Tt),vt}for(ht=l(ht);!Yt.done;Tt++,Yt=fe.next())Yt=xe(ht,ie,Tt,Yt.value,Re),Yt!==null&&(t&&Yt.alternate!==null&&ht.delete(Yt.key===null?Tt:Yt.key),j=m(Yt,j,Tt),qt===null?vt=Yt:qt.sibling=Yt,qt=Yt);return t&&ht.forEach(function(M1){return i(ie,M1)}),Bt&&Ua(ie,Tt),vt}function sn(ie,j,fe,Re){if(typeof fe=="object"&&fe!==null&&fe.type===A&&fe.key===null&&(fe=fe.props.children),typeof fe=="object"&&fe!==null){switch(fe.$$typeof){case x:e:{for(var vt=fe.key;j!==null;){if(j.key===vt){if(vt=fe.type,vt===A){if(j.tag===7){s(ie,j.sibling),Re=f(j,fe.props.children),Re.return=ie,ie=Re;break e}}else if(j.elementType===vt||typeof vt=="object"&&vt!==null&&vt.$$typeof===E&&Zs(vt)===j.type){s(ie,j.sibling),Re=f(j,fe.props),Vo(Re,fe),Re.return=ie,ie=Re;break e}s(ie,j);break}else i(ie,j);j=j.sibling}fe.type===A?(Re=ks(fe.props.children,ie.mode,Re,fe.key),Re.return=ie,ie=Re):(Re=rc(fe.type,fe.key,fe.props,null,ie.mode,Re),Vo(Re,fe),Re.return=ie,ie=Re)}return M(ie);case b:e:{for(vt=fe.key;j!==null;){if(j.key===vt)if(j.tag===4&&j.stateNode.containerInfo===fe.containerInfo&&j.stateNode.implementation===fe.implementation){s(ie,j.sibling),Re=f(j,fe.children||[]),Re.return=ie,ie=Re;break e}else{s(ie,j);break}else i(ie,j);j=j.sibling}Re=_f(fe,ie.mode,Re),Re.return=ie,ie=Re}return M(ie);case E:return fe=Zs(fe),sn(ie,j,fe,Re)}if(W(fe))return ut(ie,j,fe,Re);if(X(fe)){if(vt=X(fe),typeof vt!="function")throw Error(a(150));return fe=vt.call(fe),_t(ie,j,fe,Re)}if(typeof fe.then=="function")return sn(ie,j,dc(fe),Re);if(fe.$$typeof===z)return sn(ie,j,cc(ie,fe),Re);pc(ie,fe)}return typeof fe=="string"&&fe!==""||typeof fe=="number"||typeof fe=="bigint"?(fe=""+fe,j!==null&&j.tag===6?(s(ie,j.sibling),Re=f(j,fe),Re.return=ie,ie=Re):(s(ie,j),Re=vf(fe,ie.mode,Re),Re.return=ie,ie=Re),M(ie)):s(ie,j)}return function(ie,j,fe,Re){try{Go=0;var vt=sn(ie,j,fe,Re);return zr=null,vt}catch(ht){if(ht===Or||ht===fc)throw ht;var qt=wi(29,ht,null,ie.mode);return qt.lanes=Re,qt.return=ie,qt}finally{}}}var Qs=om(!0),lm=om(!1),hs=!1;function Df(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Uf(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ds(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ps(t,i,s){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Kt&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=sc(t),X0(t,null,s),i}return ac(t,l,i,s),sc(t)}function ko(t,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,Vn(t,s)}}function Lf(t,i){var s=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,m=null;if(s=s.firstBaseUpdate,s!==null){do{var M={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};m===null?f=m=M:m=m.next=M,s=s.next}while(s!==null);m===null?f=m=i:m=m.next=i}else f=m=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:m,shared:l.shared,callbacks:l.callbacks},t.updateQueue=s;return}t=s.lastBaseUpdate,t===null?s.firstBaseUpdate=i:t.next=i,s.lastBaseUpdate=i}var Nf=!1;function Wo(){if(Nf){var t=Pr;if(t!==null)throw t}}function Xo(t,i,s,l){Nf=!1;var f=t.updateQueue;hs=!1;var m=f.firstBaseUpdate,M=f.lastBaseUpdate,D=f.shared.pending;if(D!==null){f.shared.pending=null;var q=D,he=q.next;q.next=null,M===null?m=he:M.next=he,M=q;var we=t.alternate;we!==null&&(we=we.updateQueue,D=we.lastBaseUpdate,D!==M&&(D===null?we.firstBaseUpdate=he:D.next=he,we.lastBaseUpdate=q))}if(m!==null){var De=f.baseState;M=0,we=he=q=null,D=m;do{var pe=D.lane&-536870913,xe=pe!==D.lane;if(xe?(Ot&pe)===pe:(l&pe)===pe){pe!==0&&pe===Nr&&(Nf=!0),we!==null&&(we=we.next={lane:0,tag:D.tag,payload:D.payload,callback:null,next:null});e:{var ut=t,_t=D;pe=i;var sn=s;switch(_t.tag){case 1:if(ut=_t.payload,typeof ut=="function"){De=ut.call(sn,De,pe);break e}De=ut;break e;case 3:ut.flags=ut.flags&-65537|128;case 0:if(ut=_t.payload,pe=typeof ut=="function"?ut.call(sn,De,pe):ut,pe==null)break e;De=_({},De,pe);break e;case 2:hs=!0}}pe=D.callback,pe!==null&&(t.flags|=64,xe&&(t.flags|=8192),xe=f.callbacks,xe===null?f.callbacks=[pe]:xe.push(pe))}else xe={lane:pe,tag:D.tag,payload:D.payload,callback:D.callback,next:null},we===null?(he=we=xe,q=De):we=we.next=xe,M|=pe;if(D=D.next,D===null){if(D=f.shared.pending,D===null)break;xe=D,D=xe.next,xe.next=null,f.lastBaseUpdate=xe,f.shared.pending=null}}while(!0);we===null&&(q=De),f.baseState=q,f.firstBaseUpdate=he,f.lastBaseUpdate=we,m===null&&(f.shared.lanes=0),xs|=M,t.lanes=M,t.memoizedState=De}}function cm(t,i){if(typeof t!="function")throw Error(a(191,t));t.call(i)}function um(t,i){var s=t.callbacks;if(s!==null)for(t.callbacks=null,t=0;t<s.length;t++)cm(s[t],i)}var Fr=N(null),mc=N(0);function fm(t,i){t=Va,ue(mc,t),ue(Fr,i),Va=t|i.baseLanes}function Pf(){ue(mc,Va),ue(Fr,Fr.current)}function Of(){Va=mc.current,Q(Fr),Q(mc)}var Ti=N(null),Xi=null;function ms(t){var i=t.alternate;ue(Sn,Sn.current&1),ue(Ti,t),Xi===null&&(i===null||Fr.current!==null||i.memoizedState!==null)&&(Xi=t)}function zf(t){ue(Sn,Sn.current),ue(Ti,t),Xi===null&&(Xi=t)}function hm(t){t.tag===22?(ue(Sn,Sn.current),ue(Ti,t),Xi===null&&(Xi=t)):gs()}function gs(){ue(Sn,Sn.current),ue(Ti,Ti.current)}function Ai(t){Q(Ti),Xi===t&&(Xi=null),Q(Sn)}var Sn=N(0);function gc(t){for(var i=t;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||Vh(s)||kh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Pa=0,wt=null,nn=null,Rn=null,vc=!1,Br=!1,Js=!1,_c=0,qo=0,Ir=null,hS=0;function _n(){throw Error(a(321))}function Ff(t,i){if(i===null)return!1;for(var s=0;s<i.length&&s<t.length;s++)if(!Ei(t[s],i[s]))return!1;return!0}function Bf(t,i,s,l,f,m){return Pa=m,wt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,P.H=t===null||t.memoizedState===null?Km:$f,Js=!1,m=s(l,f),Js=!1,Br&&(m=pm(i,s,l,f)),dm(t),m}function dm(t){P.H=Ko;var i=nn!==null&&nn.next!==null;if(Pa=0,Rn=nn=wt=null,vc=!1,qo=0,Ir=null,i)throw Error(a(300));t===null||Cn||(t=t.dependencies,t!==null&&lc(t)&&(Cn=!0))}function pm(t,i,s,l){wt=t;var f=0;do{if(Br&&(Ir=null),qo=0,Br=!1,25<=f)throw Error(a(301));if(f+=1,Rn=nn=null,t.updateQueue!=null){var m=t.updateQueue;m.lastEffect=null,m.events=null,m.stores=null,m.memoCache!=null&&(m.memoCache.index=0)}P.H=Qm,m=i(s,l)}while(Br);return m}function dS(){var t=P.H,i=t.useState()[0];return i=typeof i.then=="function"?Yo(i):i,t=t.useState()[0],(nn!==null?nn.memoizedState:null)!==t&&(wt.flags|=1024),i}function If(){var t=_c!==0;return _c=0,t}function Hf(t,i,s){i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~s}function Gf(t){if(vc){for(t=t.memoizedState;t!==null;){var i=t.queue;i!==null&&(i.pending=null),t=t.next}vc=!1}Pa=0,Rn=nn=wt=null,Br=!1,qo=_c=0,Ir=null}function li(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Rn===null?wt.memoizedState=Rn=t:Rn=Rn.next=t,Rn}function Mn(){if(nn===null){var t=wt.alternate;t=t!==null?t.memoizedState:null}else t=nn.next;var i=Rn===null?wt.memoizedState:Rn.next;if(i!==null)Rn=i,nn=t;else{if(t===null)throw wt.alternate===null?Error(a(467)):Error(a(310));nn=t,t={memoizedState:nn.memoizedState,baseState:nn.baseState,baseQueue:nn.baseQueue,queue:nn.queue,next:null},Rn===null?wt.memoizedState=Rn=t:Rn=Rn.next=t}return Rn}function xc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Yo(t){var i=qo;return qo+=1,Ir===null&&(Ir=[]),t=am(Ir,t,i),i=wt,(Rn===null?i.memoizedState:Rn.next)===null&&(i=i.alternate,P.H=i===null||i.memoizedState===null?Km:$f),t}function yc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Yo(t);if(t.$$typeof===z)return Xn(t)}throw Error(a(438,String(t)))}function Vf(t){var i=null,s=wt.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=wt.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=xc(),wt.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(t),l=0;l<t;l++)s[l]=H;return i.index++,s}function Oa(t,i){return typeof i=="function"?i(t):i}function Sc(t){var i=Mn();return kf(i,nn,t)}function kf(t,i,s){var l=t.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=t.baseQueue,m=l.pending;if(m!==null){if(f!==null){var M=f.next;f.next=m.next,m.next=M}i.baseQueue=f=m,l.pending=null}if(m=t.baseState,f===null)t.memoizedState=m;else{i=f.next;var D=M=null,q=null,he=i,we=!1;do{var De=he.lane&-536870913;if(De!==he.lane?(Ot&De)===De:(Pa&De)===De){var pe=he.revertLane;if(pe===0)q!==null&&(q=q.next={lane:0,revertLane:0,gesture:null,action:he.action,hasEagerState:he.hasEagerState,eagerState:he.eagerState,next:null}),De===Nr&&(we=!0);else if((Pa&pe)===pe){he=he.next,pe===Nr&&(we=!0);continue}else De={lane:0,revertLane:he.revertLane,gesture:null,action:he.action,hasEagerState:he.hasEagerState,eagerState:he.eagerState,next:null},q===null?(D=q=De,M=m):q=q.next=De,wt.lanes|=pe,xs|=pe;De=he.action,Js&&s(m,De),m=he.hasEagerState?he.eagerState:s(m,De)}else pe={lane:De,revertLane:he.revertLane,gesture:he.gesture,action:he.action,hasEagerState:he.hasEagerState,eagerState:he.eagerState,next:null},q===null?(D=q=pe,M=m):q=q.next=pe,wt.lanes|=De,xs|=De;he=he.next}while(he!==null&&he!==i);if(q===null?M=m:q.next=D,!Ei(m,t.memoizedState)&&(Cn=!0,we&&(s=Pr,s!==null)))throw s;t.memoizedState=m,t.baseState=M,t.baseQueue=q,l.lastRenderedState=m}return f===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Wf(t){var i=Mn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=t;var l=s.dispatch,f=s.pending,m=i.memoizedState;if(f!==null){s.pending=null;var M=f=f.next;do m=t(m,M.action),M=M.next;while(M!==f);Ei(m,i.memoizedState)||(Cn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),s.lastRenderedState=m}return[m,l]}function mm(t,i,s){var l=wt,f=Mn(),m=Bt;if(m){if(s===void 0)throw Error(a(407));s=s()}else s=i();var M=!Ei((nn||f).memoizedState,s);if(M&&(f.memoizedState=s,Cn=!0),f=f.queue,Yf(_m.bind(null,l,f,t),[t]),f.getSnapshot!==i||M||Rn!==null&&Rn.memoizedState.tag&1){if(l.flags|=2048,Hr(9,{destroy:void 0},vm.bind(null,l,f,s,i),null),ln===null)throw Error(a(349));m||(Pa&127)!==0||gm(l,i,s)}return s}function gm(t,i,s){t.flags|=16384,t={getSnapshot:i,value:s},i=wt.updateQueue,i===null?(i=xc(),wt.updateQueue=i,i.stores=[t]):(s=i.stores,s===null?i.stores=[t]:s.push(t))}function vm(t,i,s,l){i.value=s,i.getSnapshot=l,xm(i)&&ym(t)}function _m(t,i,s){return s(function(){xm(i)&&ym(t)})}function xm(t){var i=t.getSnapshot;t=t.value;try{var s=i();return!Ei(t,s)}catch{return!0}}function ym(t){var i=Vs(t,2);i!==null&&xi(i,t,2)}function Xf(t){var i=li();if(typeof t=="function"){var s=t;if(t=s(),Js){Ie(!0);try{s()}finally{Ie(!1)}}}return i.memoizedState=i.baseState=t,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Oa,lastRenderedState:t},i}function Sm(t,i,s,l){return t.baseState=s,kf(t,nn,typeof l=="function"?l:Oa)}function pS(t,i,s,l,f){if(Ec(t))throw Error(a(485));if(t=i.action,t!==null){var m={payload:f,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){m.listeners.push(M)}};P.T!==null?s(!0):m.isTransition=!1,l(m),s=i.pending,s===null?(m.next=i.pending=m,Mm(i,m)):(m.next=s.next,i.pending=s.next=m)}}function Mm(t,i){var s=i.action,l=i.payload,f=t.state;if(i.isTransition){var m=P.T,M={};P.T=M;try{var D=s(f,l),q=P.S;q!==null&&q(M,D),bm(t,i,D)}catch(he){qf(t,i,he)}finally{m!==null&&M.types!==null&&(m.types=M.types),P.T=m}}else try{m=s(f,l),bm(t,i,m)}catch(he){qf(t,i,he)}}function bm(t,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){Em(t,i,l)},function(l){return qf(t,i,l)}):Em(t,i,s)}function Em(t,i,s){i.status="fulfilled",i.value=s,wm(i),t.state=s,i=t.pending,i!==null&&(s=i.next,s===i?t.pending=null:(s=s.next,i.next=s,Mm(t,s)))}function qf(t,i,s){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,wm(i),i=i.next;while(i!==l)}t.action=null}function wm(t){t=t.listeners;for(var i=0;i<t.length;i++)(0,t[i])()}function Tm(t,i){return i}function Am(t,i){if(Bt){var s=ln.formState;if(s!==null){e:{var l=wt;if(Bt){if(un){t:{for(var f=un,m=Wi;f.nodeType!==8;){if(!m){f=null;break t}if(f=qi(f.nextSibling),f===null){f=null;break t}}m=f.data,f=m==="F!"||m==="F"?f:null}if(f){un=qi(f.nextSibling),l=f.data==="F!";break e}}us(l)}l=!1}l&&(i=s[0])}}return s=li(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Tm,lastRenderedState:i},s.queue=l,s=qm.bind(null,wt,l),l.dispatch=s,l=Xf(!1),m=jf.bind(null,wt,!1,l.queue),l=li(),f={state:i,dispatch:null,action:t,pending:null},l.queue=f,s=pS.bind(null,wt,f,m,s),f.dispatch=s,l.memoizedState=t,[i,s,!1]}function Rm(t){var i=Mn();return Cm(i,nn,t)}function Cm(t,i,s){if(i=kf(t,i,Tm)[0],t=Sc(Oa)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=Yo(i)}catch(M){throw M===Or?fc:M}else l=i;i=Mn();var f=i.queue,m=f.dispatch;return s!==i.memoizedState&&(wt.flags|=2048,Hr(9,{destroy:void 0},mS.bind(null,f,s),null)),[l,m,t]}function mS(t,i){t.action=i}function Dm(t){var i=Mn(),s=nn;if(s!==null)return Cm(i,s,t);Mn(),i=i.memoizedState,s=Mn();var l=s.queue.dispatch;return s.memoizedState=t,[i,l,!1]}function Hr(t,i,s,l){return t={tag:t,create:s,deps:l,inst:i,next:null},i=wt.updateQueue,i===null&&(i=xc(),wt.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=t.next=t:(l=s.next,s.next=t,t.next=l,i.lastEffect=t),t}function Um(){return Mn().memoizedState}function Mc(t,i,s,l){var f=li();wt.flags|=t,f.memoizedState=Hr(1|i,{destroy:void 0},s,l===void 0?null:l)}function bc(t,i,s,l){var f=Mn();l=l===void 0?null:l;var m=f.memoizedState.inst;nn!==null&&l!==null&&Ff(l,nn.memoizedState.deps)?f.memoizedState=Hr(i,m,s,l):(wt.flags|=t,f.memoizedState=Hr(1|i,m,s,l))}function Lm(t,i){Mc(8390656,8,t,i)}function Yf(t,i){bc(2048,8,t,i)}function gS(t){wt.flags|=4;var i=wt.updateQueue;if(i===null)i=xc(),wt.updateQueue=i,i.events=[t];else{var s=i.events;s===null?i.events=[t]:s.push(t)}}function Nm(t){var i=Mn().memoizedState;return gS({ref:i,nextImpl:t}),function(){if((Kt&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function Pm(t,i){return bc(4,2,t,i)}function Om(t,i){return bc(4,4,t,i)}function zm(t,i){if(typeof i=="function"){t=t();var s=i(t);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function Fm(t,i,s){s=s!=null?s.concat([t]):null,bc(4,4,zm.bind(null,i,t),s)}function Zf(){}function Bm(t,i){var s=Mn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&Ff(i,l[1])?l[0]:(s.memoizedState=[t,i],t)}function Im(t,i){var s=Mn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&Ff(i,l[1]))return l[0];if(l=t(),Js){Ie(!0);try{t()}finally{Ie(!1)}}return s.memoizedState=[l,i],l}function Kf(t,i,s){return s===void 0||(Pa&1073741824)!==0&&(Ot&261930)===0?t.memoizedState=i:(t.memoizedState=s,t=Hg(),wt.lanes|=t,xs|=t,s)}function Hm(t,i,s,l){return Ei(s,i)?s:Fr.current!==null?(t=Kf(t,s,l),Ei(t,i)||(Cn=!0),t):(Pa&42)===0||(Pa&1073741824)!==0&&(Ot&261930)===0?(Cn=!0,t.memoizedState=s):(t=Hg(),wt.lanes|=t,xs|=t,i)}function Gm(t,i,s,l,f){var m=k.p;k.p=m!==0&&8>m?m:8;var M=P.T,D={};P.T=D,jf(t,!1,i,s);try{var q=f(),he=P.S;if(he!==null&&he(D,q),q!==null&&typeof q=="object"&&typeof q.then=="function"){var we=fS(q,l);Zo(t,i,we,Di(t))}else Zo(t,i,l,Di(t))}catch(De){Zo(t,i,{then:function(){},status:"rejected",reason:De},Di())}finally{k.p=m,M!==null&&D.types!==null&&(M.types=D.types),P.T=M}}function vS(){}function Qf(t,i,s,l){if(t.tag!==5)throw Error(a(476));var f=Vm(t).queue;Gm(t,f,i,ne,s===null?vS:function(){return km(t),s(l)})}function Vm(t){var i=t.memoizedState;if(i!==null)return i;i={memoizedState:ne,baseState:ne,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Oa,lastRenderedState:ne},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Oa,lastRenderedState:s},next:null},t.memoizedState=i,t=t.alternate,t!==null&&(t.memoizedState=i),i}function km(t){var i=Vm(t);i.next===null&&(i=t.alternate.memoizedState),Zo(t,i.next.queue,{},Di())}function Jf(){return Xn(fl)}function Wm(){return Mn().memoizedState}function Xm(){return Mn().memoizedState}function _S(t){for(var i=t.return;i!==null;){switch(i.tag){case 24:case 3:var s=Di();t=ds(s);var l=ps(i,t,s);l!==null&&(xi(l,i,s),ko(l,i,s)),i={cache:Tf()},t.payload=i;return}i=i.return}}function xS(t,i,s){var l=Di();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Ec(t)?Ym(i,s):(s=mf(t,i,s,l),s!==null&&(xi(s,t,l),Zm(s,i,l)))}function qm(t,i,s){var l=Di();Zo(t,i,s,l)}function Zo(t,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Ec(t))Ym(i,f);else{var m=t.alternate;if(t.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var M=i.lastRenderedState,D=m(M,s);if(f.hasEagerState=!0,f.eagerState=D,Ei(D,M))return ac(t,i,f,0),ln===null&&ic(),!1}catch{}finally{}if(s=mf(t,i,f,l),s!==null)return xi(s,t,l),Zm(s,i,l),!0}return!1}function jf(t,i,s,l){if(l={lane:2,revertLane:Dh(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Ec(t)){if(i)throw Error(a(479))}else i=mf(t,s,l,2),i!==null&&xi(i,t,2)}function Ec(t){var i=t.alternate;return t===wt||i!==null&&i===wt}function Ym(t,i){Br=vc=!0;var s=t.pending;s===null?i.next=i:(i.next=s.next,s.next=i),t.pending=i}function Zm(t,i,s){if((s&4194048)!==0){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,Vn(t,s)}}var Ko={readContext:Xn,use:yc,useCallback:_n,useContext:_n,useEffect:_n,useImperativeHandle:_n,useLayoutEffect:_n,useInsertionEffect:_n,useMemo:_n,useReducer:_n,useRef:_n,useState:_n,useDebugValue:_n,useDeferredValue:_n,useTransition:_n,useSyncExternalStore:_n,useId:_n,useHostTransitionStatus:_n,useFormState:_n,useActionState:_n,useOptimistic:_n,useMemoCache:_n,useCacheRefresh:_n};Ko.useEffectEvent=_n;var Km={readContext:Xn,use:yc,useCallback:function(t,i){return li().memoizedState=[t,i===void 0?null:i],t},useContext:Xn,useEffect:Lm,useImperativeHandle:function(t,i,s){s=s!=null?s.concat([t]):null,Mc(4194308,4,zm.bind(null,i,t),s)},useLayoutEffect:function(t,i){return Mc(4194308,4,t,i)},useInsertionEffect:function(t,i){Mc(4,2,t,i)},useMemo:function(t,i){var s=li();i=i===void 0?null:i;var l=t();if(Js){Ie(!0);try{t()}finally{Ie(!1)}}return s.memoizedState=[l,i],l},useReducer:function(t,i,s){var l=li();if(s!==void 0){var f=s(i);if(Js){Ie(!0);try{s(i)}finally{Ie(!1)}}}else f=i;return l.memoizedState=l.baseState=f,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:f},l.queue=t,t=t.dispatch=xS.bind(null,wt,t),[l.memoizedState,t]},useRef:function(t){var i=li();return t={current:t},i.memoizedState=t},useState:function(t){t=Xf(t);var i=t.queue,s=qm.bind(null,wt,i);return i.dispatch=s,[t.memoizedState,s]},useDebugValue:Zf,useDeferredValue:function(t,i){var s=li();return Kf(s,t,i)},useTransition:function(){var t=Xf(!1);return t=Gm.bind(null,wt,t.queue,!0,!1),li().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,i,s){var l=wt,f=li();if(Bt){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),ln===null)throw Error(a(349));(Ot&127)!==0||gm(l,i,s)}f.memoizedState=s;var m={value:s,getSnapshot:i};return f.queue=m,Lm(_m.bind(null,l,m,t),[t]),l.flags|=2048,Hr(9,{destroy:void 0},vm.bind(null,l,m,s,i),null),s},useId:function(){var t=li(),i=ln.identifierPrefix;if(Bt){var s=pa,l=da;s=(l&~(1<<32-Je(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=_c++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=hS++,i="_"+i+"r_"+s.toString(32)+"_";return t.memoizedState=i},useHostTransitionStatus:Jf,useFormState:Am,useActionState:Am,useOptimistic:function(t){var i=li();i.memoizedState=i.baseState=t;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=jf.bind(null,wt,!0,s),s.dispatch=i,[t,i]},useMemoCache:Vf,useCacheRefresh:function(){return li().memoizedState=_S.bind(null,wt)},useEffectEvent:function(t){var i=li(),s={impl:t};return i.memoizedState=s,function(){if((Kt&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},$f={readContext:Xn,use:yc,useCallback:Bm,useContext:Xn,useEffect:Yf,useImperativeHandle:Fm,useInsertionEffect:Pm,useLayoutEffect:Om,useMemo:Im,useReducer:Sc,useRef:Um,useState:function(){return Sc(Oa)},useDebugValue:Zf,useDeferredValue:function(t,i){var s=Mn();return Hm(s,nn.memoizedState,t,i)},useTransition:function(){var t=Sc(Oa)[0],i=Mn().memoizedState;return[typeof t=="boolean"?t:Yo(t),i]},useSyncExternalStore:mm,useId:Wm,useHostTransitionStatus:Jf,useFormState:Rm,useActionState:Rm,useOptimistic:function(t,i){var s=Mn();return Sm(s,nn,t,i)},useMemoCache:Vf,useCacheRefresh:Xm};$f.useEffectEvent=Nm;var Qm={readContext:Xn,use:yc,useCallback:Bm,useContext:Xn,useEffect:Yf,useImperativeHandle:Fm,useInsertionEffect:Pm,useLayoutEffect:Om,useMemo:Im,useReducer:Wf,useRef:Um,useState:function(){return Wf(Oa)},useDebugValue:Zf,useDeferredValue:function(t,i){var s=Mn();return nn===null?Kf(s,t,i):Hm(s,nn.memoizedState,t,i)},useTransition:function(){var t=Wf(Oa)[0],i=Mn().memoizedState;return[typeof t=="boolean"?t:Yo(t),i]},useSyncExternalStore:mm,useId:Wm,useHostTransitionStatus:Jf,useFormState:Dm,useActionState:Dm,useOptimistic:function(t,i){var s=Mn();return nn!==null?Sm(s,nn,t,i):(s.baseState=t,[t,s.queue.dispatch])},useMemoCache:Vf,useCacheRefresh:Xm};Qm.useEffectEvent=Nm;function eh(t,i,s,l){i=t.memoizedState,s=s(l,i),s=s==null?i:_({},i,s),t.memoizedState=s,t.lanes===0&&(t.updateQueue.baseState=s)}var th={enqueueSetState:function(t,i,s){t=t._reactInternals;var l=Di(),f=ds(l);f.payload=i,s!=null&&(f.callback=s),i=ps(t,f,l),i!==null&&(xi(i,t,l),ko(i,t,l))},enqueueReplaceState:function(t,i,s){t=t._reactInternals;var l=Di(),f=ds(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=ps(t,f,l),i!==null&&(xi(i,t,l),ko(i,t,l))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var s=Di(),l=ds(s);l.tag=2,i!=null&&(l.callback=i),i=ps(t,l,s),i!==null&&(xi(i,t,s),ko(i,t,s))}};function Jm(t,i,s,l,f,m,M){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,m,M):i.prototype&&i.prototype.isPureReactComponent?!Oo(s,l)||!Oo(f,m):!0}function jm(t,i,s,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==t&&th.enqueueReplaceState(i,i.state,null)}function js(t,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(t=t.defaultProps){s===i&&(s=_({},s));for(var f in t)s[f]===void 0&&(s[f]=t[f])}return s}function $m(t){nc(t)}function eg(t){console.error(t)}function tg(t){nc(t)}function wc(t,i){try{var s=t.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function ng(t,i,s){try{var l=t.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function nh(t,i,s){return s=ds(s),s.tag=3,s.payload={element:null},s.callback=function(){wc(t,i)},s}function ig(t){return t=ds(t),t.tag=3,t}function ag(t,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var m=l.value;t.payload=function(){return f(m)},t.callback=function(){ng(i,s,l)}}var M=s.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(t.callback=function(){ng(i,s,l),typeof f!="function"&&(ys===null?ys=new Set([this]):ys.add(this));var D=l.stack;this.componentDidCatch(l.value,{componentStack:D!==null?D:""})})}function yS(t,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&Lr(i,s,f,!0),s=Ti.current,s!==null){switch(s.tag){case 31:case 13:return Xi===null?Fc():s.alternate===null&&xn===0&&(xn=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===hc?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),Ah(t,l,f)),!1;case 22:return s.flags|=65536,l===hc?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),Ah(t,l,f)),!1}throw Error(a(435,s.tag))}return Ah(t,l,f),Fc(),!1}if(Bt)return i=Ti.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==Sf&&(t=Error(a(422),{cause:l}),Bo(Gi(t,s)))):(l!==Sf&&(i=Error(a(423),{cause:l}),Bo(Gi(i,s))),t=t.current.alternate,t.flags|=65536,f&=-f,t.lanes|=f,l=Gi(l,s),f=nh(t.stateNode,l,f),Lf(t,f),xn!==4&&(xn=2)),!1;var m=Error(a(520),{cause:l});if(m=Gi(m,s),il===null?il=[m]:il.push(m),xn!==4&&(xn=2),i===null)return!0;l=Gi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,t=f&-f,s.lanes|=t,t=nh(s.stateNode,l,t),Lf(s,t),!1;case 1:if(i=s.type,m=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(ys===null||!ys.has(m))))return s.flags|=65536,f&=-f,s.lanes|=f,f=ig(f),ag(f,t,s,l),Lf(s,f),!1}s=s.return}while(s!==null);return!1}var ih=Error(a(461)),Cn=!1;function qn(t,i,s,l){i.child=t===null?lm(i,null,s,l):Qs(i,t.child,s,l)}function sg(t,i,s,l,f){s=s.render;var m=i.ref;if("ref"in l){var M={};for(var D in l)D!=="ref"&&(M[D]=l[D])}else M=l;return qs(i),l=Bf(t,i,s,M,m,f),D=If(),t!==null&&!Cn?(Hf(t,i,f),za(t,i,f)):(Bt&&D&&xf(i),i.flags|=1,qn(t,i,l,f),i.child)}function rg(t,i,s,l,f){if(t===null){var m=s.type;return typeof m=="function"&&!gf(m)&&m.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=m,og(t,i,m,l,f)):(t=rc(s.type,null,l,i,i.mode,f),t.ref=i.ref,t.return=i,i.child=t)}if(m=t.child,!fh(t,f)){var M=m.memoizedProps;if(s=s.compare,s=s!==null?s:Oo,s(M,l)&&t.ref===i.ref)return za(t,i,f)}return i.flags|=1,t=Da(m,l),t.ref=i.ref,t.return=i,i.child=t}function og(t,i,s,l,f){if(t!==null){var m=t.memoizedProps;if(Oo(m,l)&&t.ref===i.ref)if(Cn=!1,i.pendingProps=l=m,fh(t,f))(t.flags&131072)!==0&&(Cn=!0);else return i.lanes=t.lanes,za(t,i,f)}return ah(t,i,s,l,f)}function lg(t,i,s,l){var f=l.children,m=t!==null?t.memoizedState:null;if(t===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(m=m!==null?m.baseLanes|s:s,t!==null){for(l=i.child=t.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~m}else l=0,i.child=null;return cg(t,i,m,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},t!==null&&uc(i,m!==null?m.cachePool:null),m!==null?fm(i,m):Pf(),hm(i);else return l=i.lanes=536870912,cg(t,i,m!==null?m.baseLanes|s:s,s,l)}else m!==null?(uc(i,m.cachePool),fm(i,m),gs(),i.memoizedState=null):(t!==null&&uc(i,null),Pf(),gs());return qn(t,i,f,s),i.child}function Qo(t,i){return t!==null&&t.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function cg(t,i,s,l,f){var m=Rf();return m=m===null?null:{parent:An._currentValue,pool:m},i.memoizedState={baseLanes:s,cachePool:m},t!==null&&uc(i,null),Pf(),hm(i),t!==null&&Lr(t,i,l,!0),i.childLanes=f,null}function Tc(t,i){return i=Rc({mode:i.mode,children:i.children},t.mode),i.ref=t.ref,t.child=i,i.return=t,i}function ug(t,i,s){return Qs(i,t.child,null,s),t=Tc(i,i.pendingProps),t.flags|=2,Ai(i),i.memoizedState=null,t}function SS(t,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,t===null){if(Bt){if(l.mode==="hidden")return t=Tc(i,l),i.lanes=536870912,Qo(null,t);if(zf(i),(t=un)?(t=Mv(t,Wi),t=t!==null&&t.data==="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:ls!==null?{id:da,overflow:pa}:null,retryLane:536870912,hydrationErrors:null},s=Y0(t),s.return=i,i.child=s,Wn=i,un=null)):t=null,t===null)throw us(i);return i.lanes=536870912,null}return Tc(i,l)}var m=t.memoizedState;if(m!==null){var M=m.dehydrated;if(zf(i),f)if(i.flags&256)i.flags&=-257,i=ug(t,i,s);else if(i.memoizedState!==null)i.child=t.child,i.flags|=128,i=null;else throw Error(a(558));else if(Cn||Lr(t,i,s,!1),f=(s&t.childLanes)!==0,Cn||f){if(l=ln,l!==null&&(M=kn(l,s),M!==0&&M!==m.retryLane))throw m.retryLane=M,Vs(t,M),xi(l,t,M),ih;Fc(),i=ug(t,i,s)}else t=m.treeContext,un=qi(M.nextSibling),Wn=i,Bt=!0,cs=null,Wi=!1,t!==null&&Q0(i,t),i=Tc(i,l),i.flags|=4096;return i}return t=Da(t.child,{mode:l.mode,children:l.children}),t.ref=i.ref,i.child=t,t.return=i,t}function Ac(t,i){var s=i.ref;if(s===null)t!==null&&t.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(t===null||t.ref!==s)&&(i.flags|=4194816)}}function ah(t,i,s,l,f){return qs(i),s=Bf(t,i,s,l,void 0,f),l=If(),t!==null&&!Cn?(Hf(t,i,f),za(t,i,f)):(Bt&&l&&xf(i),i.flags|=1,qn(t,i,s,f),i.child)}function fg(t,i,s,l,f,m){return qs(i),i.updateQueue=null,s=pm(i,l,s,f),dm(t),l=If(),t!==null&&!Cn?(Hf(t,i,m),za(t,i,m)):(Bt&&l&&xf(i),i.flags|=1,qn(t,i,s,m),i.child)}function hg(t,i,s,l,f){if(qs(i),i.stateNode===null){var m=Rr,M=s.contextType;typeof M=="object"&&M!==null&&(m=Xn(M)),m=new s(l,m),i.memoizedState=m.state!==null&&m.state!==void 0?m.state:null,m.updater=th,i.stateNode=m,m._reactInternals=i,m=i.stateNode,m.props=l,m.state=i.memoizedState,m.refs={},Df(i),M=s.contextType,m.context=typeof M=="object"&&M!==null?Xn(M):Rr,m.state=i.memoizedState,M=s.getDerivedStateFromProps,typeof M=="function"&&(eh(i,s,M,l),m.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(M=m.state,typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount(),M!==m.state&&th.enqueueReplaceState(m,m.state,null),Xo(i,l,m,f),Wo(),m.state=i.memoizedState),typeof m.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(t===null){m=i.stateNode;var D=i.memoizedProps,q=js(s,D);m.props=q;var he=m.context,we=s.contextType;M=Rr,typeof we=="object"&&we!==null&&(M=Xn(we));var De=s.getDerivedStateFromProps;we=typeof De=="function"||typeof m.getSnapshotBeforeUpdate=="function",D=i.pendingProps!==D,we||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(D||he!==M)&&jm(i,m,l,M),hs=!1;var pe=i.memoizedState;m.state=pe,Xo(i,l,m,f),Wo(),he=i.memoizedState,D||pe!==he||hs?(typeof De=="function"&&(eh(i,s,De,l),he=i.memoizedState),(q=hs||Jm(i,s,q,l,pe,he,M))?(we||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount()),typeof m.componentDidMount=="function"&&(i.flags|=4194308)):(typeof m.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=he),m.props=l,m.state=he,m.context=M,l=q):(typeof m.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{m=i.stateNode,Uf(t,i),M=i.memoizedProps,we=js(s,M),m.props=we,De=i.pendingProps,pe=m.context,he=s.contextType,q=Rr,typeof he=="object"&&he!==null&&(q=Xn(he)),D=s.getDerivedStateFromProps,(he=typeof D=="function"||typeof m.getSnapshotBeforeUpdate=="function")||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(M!==De||pe!==q)&&jm(i,m,l,q),hs=!1,pe=i.memoizedState,m.state=pe,Xo(i,l,m,f),Wo();var xe=i.memoizedState;M!==De||pe!==xe||hs||t!==null&&t.dependencies!==null&&lc(t.dependencies)?(typeof D=="function"&&(eh(i,s,D,l),xe=i.memoizedState),(we=hs||Jm(i,s,we,l,pe,xe,q)||t!==null&&t.dependencies!==null&&lc(t.dependencies))?(he||typeof m.UNSAFE_componentWillUpdate!="function"&&typeof m.componentWillUpdate!="function"||(typeof m.componentWillUpdate=="function"&&m.componentWillUpdate(l,xe,q),typeof m.UNSAFE_componentWillUpdate=="function"&&m.UNSAFE_componentWillUpdate(l,xe,q)),typeof m.componentDidUpdate=="function"&&(i.flags|=4),typeof m.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof m.componentDidUpdate!="function"||M===t.memoizedProps&&pe===t.memoizedState||(i.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||M===t.memoizedProps&&pe===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=xe),m.props=l,m.state=xe,m.context=q,l=we):(typeof m.componentDidUpdate!="function"||M===t.memoizedProps&&pe===t.memoizedState||(i.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||M===t.memoizedProps&&pe===t.memoizedState||(i.flags|=1024),l=!1)}return m=l,Ac(t,i),l=(i.flags&128)!==0,m||l?(m=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:m.render(),i.flags|=1,t!==null&&l?(i.child=Qs(i,t.child,null,f),i.child=Qs(i,null,s,f)):qn(t,i,s,f),i.memoizedState=m.state,t=i.child):t=za(t,i,f),t}function dg(t,i,s,l){return Ws(),i.flags|=256,qn(t,i,s,l),i.child}var sh={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function rh(t){return{baseLanes:t,cachePool:nm()}}function oh(t,i,s){return t=t!==null?t.childLanes&~s:0,i&&(t|=Ci),t}function pg(t,i,s){var l=i.pendingProps,f=!1,m=(i.flags&128)!==0,M;if((M=m)||(M=t!==null&&t.memoizedState===null?!1:(Sn.current&2)!==0),M&&(f=!0,i.flags&=-129),M=(i.flags&32)!==0,i.flags&=-33,t===null){if(Bt){if(f?ms(i):gs(),(t=un)?(t=Mv(t,Wi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:ls!==null?{id:da,overflow:pa}:null,retryLane:536870912,hydrationErrors:null},s=Y0(t),s.return=i,i.child=s,Wn=i,un=null)):t=null,t===null)throw us(i);return kh(t)?i.lanes=32:i.lanes=536870912,null}var D=l.children;return l=l.fallback,f?(gs(),f=i.mode,D=Rc({mode:"hidden",children:D},f),l=ks(l,f,s,null),D.return=i,l.return=i,D.sibling=l,i.child=D,l=i.child,l.memoizedState=rh(s),l.childLanes=oh(t,M,s),i.memoizedState=sh,Qo(null,l)):(ms(i),lh(i,D))}var q=t.memoizedState;if(q!==null&&(D=q.dehydrated,D!==null)){if(m)i.flags&256?(ms(i),i.flags&=-257,i=ch(t,i,s)):i.memoizedState!==null?(gs(),i.child=t.child,i.flags|=128,i=null):(gs(),D=l.fallback,f=i.mode,l=Rc({mode:"visible",children:l.children},f),D=ks(D,f,s,null),D.flags|=2,l.return=i,D.return=i,l.sibling=D,i.child=l,Qs(i,t.child,null,s),l=i.child,l.memoizedState=rh(s),l.childLanes=oh(t,M,s),i.memoizedState=sh,i=Qo(null,l));else if(ms(i),kh(D)){if(M=D.nextSibling&&D.nextSibling.dataset,M)var he=M.dgst;M=he,l=Error(a(419)),l.stack="",l.digest=M,Bo({value:l,source:null,stack:null}),i=ch(t,i,s)}else if(Cn||Lr(t,i,s,!1),M=(s&t.childLanes)!==0,Cn||M){if(M=ln,M!==null&&(l=kn(M,s),l!==0&&l!==q.retryLane))throw q.retryLane=l,Vs(t,l),xi(M,t,l),ih;Vh(D)||Fc(),i=ch(t,i,s)}else Vh(D)?(i.flags|=192,i.child=t.child,i=null):(t=q.treeContext,un=qi(D.nextSibling),Wn=i,Bt=!0,cs=null,Wi=!1,t!==null&&Q0(i,t),i=lh(i,l.children),i.flags|=4096);return i}return f?(gs(),D=l.fallback,f=i.mode,q=t.child,he=q.sibling,l=Da(q,{mode:"hidden",children:l.children}),l.subtreeFlags=q.subtreeFlags&65011712,he!==null?D=Da(he,D):(D=ks(D,f,s,null),D.flags|=2),D.return=i,l.return=i,l.sibling=D,i.child=l,Qo(null,l),l=i.child,D=t.child.memoizedState,D===null?D=rh(s):(f=D.cachePool,f!==null?(q=An._currentValue,f=f.parent!==q?{parent:q,pool:q}:f):f=nm(),D={baseLanes:D.baseLanes|s,cachePool:f}),l.memoizedState=D,l.childLanes=oh(t,M,s),i.memoizedState=sh,Qo(t.child,l)):(ms(i),s=t.child,t=s.sibling,s=Da(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,t!==null&&(M=i.deletions,M===null?(i.deletions=[t],i.flags|=16):M.push(t)),i.child=s,i.memoizedState=null,s)}function lh(t,i){return i=Rc({mode:"visible",children:i},t.mode),i.return=t,t.child=i}function Rc(t,i){return t=wi(22,t,null,i),t.lanes=0,t}function ch(t,i,s){return Qs(i,t.child,null,s),t=lh(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function mg(t,i,s){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),Ef(t.return,i,s)}function uh(t,i,s,l,f,m){var M=t.memoizedState;M===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:m}:(M.isBackwards=i,M.rendering=null,M.renderingStartTime=0,M.last=l,M.tail=s,M.tailMode=f,M.treeForkCount=m)}function gg(t,i,s){var l=i.pendingProps,f=l.revealOrder,m=l.tail;l=l.children;var M=Sn.current,D=(M&2)!==0;if(D?(M=M&1|2,i.flags|=128):M&=1,ue(Sn,M),qn(t,i,l,s),l=Bt?Fo:0,!D&&t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&mg(t,s,i);else if(t.tag===19)mg(t,s,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)t=s.alternate,t!==null&&gc(t)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),uh(i,!1,f,s,m,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(t=f.alternate,t!==null&&gc(t)===null){i.child=f;break}t=f.sibling,f.sibling=s,s=f,f=t}uh(i,!0,s,null,m,l);break;case"together":uh(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function za(t,i,s){if(t!==null&&(i.dependencies=t.dependencies),xs|=i.lanes,(s&i.childLanes)===0)if(t!==null){if(Lr(t,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(t!==null&&i.child!==t.child)throw Error(a(153));if(i.child!==null){for(t=i.child,s=Da(t,t.pendingProps),i.child=s,s.return=i;t.sibling!==null;)t=t.sibling,s=s.sibling=Da(t,t.pendingProps),s.return=i;s.sibling=null}return i.child}function fh(t,i){return(t.lanes&i)!==0?!0:(t=t.dependencies,!!(t!==null&&lc(t)))}function MS(t,i,s){switch(i.tag){case 3:ye(i,i.stateNode.containerInfo),fs(i,An,t.memoizedState.cache),Ws();break;case 27:case 5:ve(i);break;case 4:ye(i,i.stateNode.containerInfo);break;case 10:fs(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,zf(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(ms(i),i.flags|=128,null):(s&i.child.childLanes)!==0?pg(t,i,s):(ms(i),t=za(t,i,s),t!==null?t.sibling:null);ms(i);break;case 19:var f=(t.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(Lr(t,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return gg(t,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),ue(Sn,Sn.current),l)break;return null;case 22:return i.lanes=0,lg(t,i,s,i.pendingProps);case 24:fs(i,An,t.memoizedState.cache)}return za(t,i,s)}function vg(t,i,s){if(t!==null)if(t.memoizedProps!==i.pendingProps)Cn=!0;else{if(!fh(t,s)&&(i.flags&128)===0)return Cn=!1,MS(t,i,s);Cn=(t.flags&131072)!==0}else Cn=!1,Bt&&(i.flags&1048576)!==0&&K0(i,Fo,i.index);switch(i.lanes=0,i.tag){case 16:e:{var l=i.pendingProps;if(t=Zs(i.elementType),i.type=t,typeof t=="function")gf(t)?(l=js(t,l),i.tag=1,i=hg(null,i,t,l,s)):(i.tag=0,i=ah(null,i,t,l,s));else{if(t!=null){var f=t.$$typeof;if(f===T){i.tag=11,i=sg(null,i,t,l,s);break e}else if(f===O){i.tag=14,i=rg(null,i,t,l,s);break e}}throw i=B(t)||t,Error(a(306,i,""))}}return i;case 0:return ah(t,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=js(l,i.pendingProps),hg(t,i,l,f,s);case 3:e:{if(ye(i,i.stateNode.containerInfo),t===null)throw Error(a(387));l=i.pendingProps;var m=i.memoizedState;f=m.element,Uf(t,i),Xo(i,l,null,s);var M=i.memoizedState;if(l=M.cache,fs(i,An,l),l!==m.cache&&wf(i,[An],s,!0),Wo(),l=M.element,m.isDehydrated)if(m={element:l,isDehydrated:!1,cache:M.cache},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){i=dg(t,i,l,s);break e}else if(l!==f){f=Gi(Error(a(424)),i),Bo(f),i=dg(t,i,l,s);break e}else{switch(t=i.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(un=qi(t.firstChild),Wn=i,Bt=!0,cs=null,Wi=!0,s=lm(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Ws(),l===f){i=za(t,i,s);break e}qn(t,i,l,s)}i=i.child}return i;case 26:return Ac(t,i),t===null?(s=Rv(i.type,null,i.pendingProps,null))?i.memoizedState=s:Bt||(s=i.type,t=i.pendingProps,l=Wc(Ke.current).createElement(s),l[gn]=i,l[Ln]=t,Yn(l,s,t),gt(l),i.stateNode=l):i.memoizedState=Rv(i.type,t.memoizedProps,i.pendingProps,t.memoizedState),null;case 27:return ve(i),t===null&&Bt&&(l=i.stateNode=wv(i.type,i.pendingProps,Ke.current),Wn=i,Wi=!0,f=un,Es(i.type)?(Wh=f,un=qi(l.firstChild)):un=f),qn(t,i,i.pendingProps.children,s),Ac(t,i),t===null&&(i.flags|=4194304),i.child;case 5:return t===null&&Bt&&((f=l=un)&&(l=jS(l,i.type,i.pendingProps,Wi),l!==null?(i.stateNode=l,Wn=i,un=qi(l.firstChild),Wi=!1,f=!0):f=!1),f||us(i)),ve(i),f=i.type,m=i.pendingProps,M=t!==null?t.memoizedProps:null,l=m.children,Ih(f,m)?l=null:M!==null&&Ih(f,M)&&(i.flags|=32),i.memoizedState!==null&&(f=Bf(t,i,dS,null,null,s),fl._currentValue=f),Ac(t,i),qn(t,i,l,s),i.child;case 6:return t===null&&Bt&&((t=s=un)&&(s=$S(s,i.pendingProps,Wi),s!==null?(i.stateNode=s,Wn=i,un=null,t=!0):t=!1),t||us(i)),null;case 13:return pg(t,i,s);case 4:return ye(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=Qs(i,null,l,s):qn(t,i,l,s),i.child;case 11:return sg(t,i,i.type,i.pendingProps,s);case 7:return qn(t,i,i.pendingProps,s),i.child;case 8:return qn(t,i,i.pendingProps.children,s),i.child;case 12:return qn(t,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,fs(i,i.type,l.value),qn(t,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,qs(i),f=Xn(f),l=l(f),i.flags|=1,qn(t,i,l,s),i.child;case 14:return rg(t,i,i.type,i.pendingProps,s);case 15:return og(t,i,i.type,i.pendingProps,s);case 19:return gg(t,i,s);case 31:return SS(t,i,s);case 22:return lg(t,i,s,i.pendingProps);case 24:return qs(i),l=Xn(An),t===null?(f=Rf(),f===null&&(f=ln,m=Tf(),f.pooledCache=m,m.refCount++,m!==null&&(f.pooledCacheLanes|=s),f=m),i.memoizedState={parent:l,cache:f},Df(i),fs(i,An,f)):((t.lanes&s)!==0&&(Uf(t,i),Xo(i,null,null,s),Wo()),f=t.memoizedState,m=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),fs(i,An,l)):(l=m.cache,fs(i,An,l),l!==f.cache&&wf(i,[An],s,!0))),qn(t,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function Fa(t){t.flags|=4}function hh(t,i,s,l,f){if((i=(t.mode&32)!==0)&&(i=!1),i){if(t.flags|=16777216,(f&335544128)===f)if(t.stateNode.complete)t.flags|=8192;else if(Wg())t.flags|=8192;else throw Ks=hc,Cf}else t.flags&=-16777217}function _g(t,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Nv(i))if(Wg())t.flags|=8192;else throw Ks=hc,Cf}function Cc(t,i){i!==null&&(t.flags|=4),t.flags&16384&&(i=t.tag!==22?Le():536870912,t.lanes|=i,Wr|=i)}function Jo(t,i){if(!Bt)switch(t.tailMode){case"hidden":i=t.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?t.tail=null:s.sibling=null;break;case"collapsed":s=t.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function fn(t){var i=t.alternate!==null&&t.alternate.child===t.child,s=0,l=0;if(i)for(var f=t.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=l,t.childLanes=s,i}function bS(t,i,s){var l=i.pendingProps;switch(yf(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return fn(i),null;case 1:return fn(i),null;case 3:return s=i.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),Na(An),oe(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(t===null||t.child===null)&&(Ur(i)?Fa(i):t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Mf())),fn(i),null;case 26:var f=i.type,m=i.memoizedState;return t===null?(Fa(i),m!==null?(fn(i),_g(i,m)):(fn(i),hh(i,f,null,l,s))):m?m!==t.memoizedState?(Fa(i),fn(i),_g(i,m)):(fn(i),i.flags&=-16777217):(t=t.memoizedProps,t!==l&&Fa(i),fn(i),hh(i,f,t,l,s)),null;case 27:if(me(i),s=Ke.current,f=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&Fa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return fn(i),null}t=Ue.current,Ur(i)?J0(i):(t=wv(f,l,s),i.stateNode=t,Fa(i))}return fn(i),null;case 5:if(me(i),f=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&Fa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return fn(i),null}if(m=Ue.current,Ur(i))J0(i);else{var M=Wc(Ke.current);switch(m){case 1:m=M.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:m=M.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":m=M.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":m=M.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":m=M.createElement("div"),m.innerHTML="<script><\/script>",m=m.removeChild(m.firstChild);break;case"select":m=typeof l.is=="string"?M.createElement("select",{is:l.is}):M.createElement("select"),l.multiple?m.multiple=!0:l.size&&(m.size=l.size);break;default:m=typeof l.is=="string"?M.createElement(f,{is:l.is}):M.createElement(f)}}m[gn]=i,m[Ln]=l;e:for(M=i.child;M!==null;){if(M.tag===5||M.tag===6)m.appendChild(M.stateNode);else if(M.tag!==4&&M.tag!==27&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===i)break e;for(;M.sibling===null;){if(M.return===null||M.return===i)break e;M=M.return}M.sibling.return=M.return,M=M.sibling}i.stateNode=m;e:switch(Yn(m,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&Fa(i)}}return fn(i),hh(i,i.type,t===null?null:t.memoizedProps,i.pendingProps,s),null;case 6:if(t&&i.stateNode!=null)t.memoizedProps!==l&&Fa(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(t=Ke.current,Ur(i)){if(t=i.stateNode,s=i.memoizedProps,l=null,f=Wn,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}t[gn]=i,t=!!(t.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||pv(t.nodeValue,s)),t||us(i,!0)}else t=Wc(t).createTextNode(l),t[gn]=i,i.stateNode=t}return fn(i),null;case 31:if(s=i.memoizedState,t===null||t.memoizedState!==null){if(l=Ur(i),s!==null){if(t===null){if(!l)throw Error(a(318));if(t=i.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(557));t[gn]=i}else Ws(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;fn(i),t=!1}else s=Mf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=s),t=!0;if(!t)return i.flags&256?(Ai(i),i):(Ai(i),null);if((i.flags&128)!==0)throw Error(a(558))}return fn(i),null;case 13:if(l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(f=Ur(i),l!==null&&l.dehydrated!==null){if(t===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[gn]=i}else Ws(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;fn(i),f=!1}else f=Mf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(Ai(i),i):(Ai(i),null)}return Ai(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,t=t!==null&&t.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),m=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(m=l.memoizedState.cachePool.pool),m!==f&&(l.flags|=2048)),s!==t&&s&&(i.child.flags|=8192),Cc(i,i.updateQueue),fn(i),null);case 4:return oe(),t===null&&Ph(i.stateNode.containerInfo),fn(i),null;case 10:return Na(i.type),fn(i),null;case 19:if(Q(Sn),l=i.memoizedState,l===null)return fn(i),null;if(f=(i.flags&128)!==0,m=l.rendering,m===null)if(f)Jo(l,!1);else{if(xn!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(m=gc(t),m!==null){for(i.flags|=128,Jo(l,!1),t=m.updateQueue,i.updateQueue=t,Cc(i,t),i.subtreeFlags=0,t=s,s=i.child;s!==null;)q0(s,t),s=s.sibling;return ue(Sn,Sn.current&1|2),Bt&&Ua(i,l.treeForkCount),i.child}t=t.sibling}l.tail!==null&&mt()>Pc&&(i.flags|=128,f=!0,Jo(l,!1),i.lanes=4194304)}else{if(!f)if(t=gc(m),t!==null){if(i.flags|=128,f=!0,t=t.updateQueue,i.updateQueue=t,Cc(i,t),Jo(l,!0),l.tail===null&&l.tailMode==="hidden"&&!m.alternate&&!Bt)return fn(i),null}else 2*mt()-l.renderingStartTime>Pc&&s!==536870912&&(i.flags|=128,f=!0,Jo(l,!1),i.lanes=4194304);l.isBackwards?(m.sibling=i.child,i.child=m):(t=l.last,t!==null?t.sibling=m:i.child=m,l.last=m)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=mt(),t.sibling=null,s=Sn.current,ue(Sn,f?s&1|2:s&1),Bt&&Ua(i,l.treeForkCount),t):(fn(i),null);case 22:case 23:return Ai(i),Of(),l=i.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(fn(i),i.subtreeFlags&6&&(i.flags|=8192)):fn(i),s=i.updateQueue,s!==null&&Cc(i,s.retryQueue),s=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),t!==null&&Q(Ys),null;case 24:return s=null,t!==null&&(s=t.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),Na(An),fn(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function ES(t,i){switch(yf(i),i.tag){case 1:return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return Na(An),oe(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 26:case 27:case 5:return me(i),null;case 31:if(i.memoizedState!==null){if(Ai(i),i.alternate===null)throw Error(a(340));Ws()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 13:if(Ai(i),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(a(340));Ws()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Q(Sn),null;case 4:return oe(),null;case 10:return Na(i.type),null;case 22:case 23:return Ai(i),Of(),t!==null&&Q(Ys),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 24:return Na(An),null;case 25:return null;default:return null}}function xg(t,i){switch(yf(i),i.tag){case 3:Na(An),oe();break;case 26:case 27:case 5:me(i);break;case 4:oe();break;case 31:i.memoizedState!==null&&Ai(i);break;case 13:Ai(i);break;case 19:Q(Sn);break;case 10:Na(i.type);break;case 22:case 23:Ai(i),Of(),t!==null&&Q(Ys);break;case 24:Na(An)}}function jo(t,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&t)===t){l=void 0;var m=s.create,M=s.inst;l=m(),M.destroy=l}s=s.next}while(s!==f)}}catch(D){$t(i,i.return,D)}}function vs(t,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var m=f.next;l=m;do{if((l.tag&t)===t){var M=l.inst,D=M.destroy;if(D!==void 0){M.destroy=void 0,f=i;var q=s,he=D;try{he()}catch(we){$t(f,q,we)}}}l=l.next}while(l!==m)}}catch(we){$t(i,i.return,we)}}function yg(t){var i=t.updateQueue;if(i!==null){var s=t.stateNode;try{um(i,s)}catch(l){$t(t,t.return,l)}}}function Sg(t,i,s){s.props=js(t.type,t.memoizedProps),s.state=t.memoizedState;try{s.componentWillUnmount()}catch(l){$t(t,i,l)}}function $o(t,i){try{var s=t.ref;if(s!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof s=="function"?t.refCleanup=s(l):s.current=l}}catch(f){$t(t,i,f)}}function ma(t,i){var s=t.ref,l=t.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){$t(t,i,f)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){$t(t,i,f)}else s.current=null}function Mg(t){var i=t.type,s=t.memoizedProps,l=t.stateNode;try{e:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break e;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){$t(t,t.return,f)}}function dh(t,i,s){try{var l=t.stateNode;qS(l,t.type,s,i),l[Ln]=i}catch(f){$t(t,t.return,f)}}function bg(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Es(t.type)||t.tag===4}function ph(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||bg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Es(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function mh(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(t,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(t),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Ii));else if(l!==4&&(l===27&&Es(t.type)&&(s=t.stateNode,i=null),t=t.child,t!==null))for(mh(t,i,s),t=t.sibling;t!==null;)mh(t,i,s),t=t.sibling}function Dc(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?s.insertBefore(t,i):s.appendChild(t);else if(l!==4&&(l===27&&Es(t.type)&&(s=t.stateNode),t=t.child,t!==null))for(Dc(t,i,s),t=t.sibling;t!==null;)Dc(t,i,s),t=t.sibling}function Eg(t){var i=t.stateNode,s=t.memoizedProps;try{for(var l=t.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);Yn(i,l,s),i[gn]=t,i[Ln]=s}catch(m){$t(t,t.return,m)}}var Ba=!1,Dn=!1,gh=!1,wg=typeof WeakSet=="function"?WeakSet:Set,In=null;function wS(t,i){if(t=t.containerInfo,Fh=Jc,t=F0(t),cf(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else e:{s=(s=t.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,m=l.focusNode;l=l.focusOffset;try{s.nodeType,m.nodeType}catch{s=null;break e}var M=0,D=-1,q=-1,he=0,we=0,De=t,pe=null;t:for(;;){for(var xe;De!==s||f!==0&&De.nodeType!==3||(D=M+f),De!==m||l!==0&&De.nodeType!==3||(q=M+l),De.nodeType===3&&(M+=De.nodeValue.length),(xe=De.firstChild)!==null;)pe=De,De=xe;for(;;){if(De===t)break t;if(pe===s&&++he===f&&(D=M),pe===m&&++we===l&&(q=M),(xe=De.nextSibling)!==null)break;De=pe,pe=De.parentNode}De=xe}s=D===-1||q===-1?null:{start:D,end:q}}else s=null}s=s||{start:0,end:0}}else s=null;for(Bh={focusedElem:t,selectionRange:s},Jc=!1,In=i;In!==null;)if(i=In,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,In=t;else for(;In!==null;){switch(i=In,m=i.alternate,t=i.flags,i.tag){case 0:if((t&4)!==0&&(t=i.updateQueue,t=t!==null?t.events:null,t!==null))for(s=0;s<t.length;s++)f=t[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&m!==null){t=void 0,s=i,f=m.memoizedProps,m=m.memoizedState,l=s.stateNode;try{var ut=js(s.type,f);t=l.getSnapshotBeforeUpdate(ut,m),l.__reactInternalSnapshotBeforeUpdate=t}catch(_t){$t(s,s.return,_t)}}break;case 3:if((t&1024)!==0){if(t=i.stateNode.containerInfo,s=t.nodeType,s===9)Gh(t);else if(s===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Gh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(a(163))}if(t=i.sibling,t!==null){t.return=i.return,In=t;break}In=i.return}}function Tg(t,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:Ha(t,s),l&4&&jo(5,s);break;case 1:if(Ha(t,s),l&4)if(t=s.stateNode,i===null)try{t.componentDidMount()}catch(M){$t(s,s.return,M)}else{var f=js(s.type,i.memoizedProps);i=i.memoizedState;try{t.componentDidUpdate(f,i,t.__reactInternalSnapshotBeforeUpdate)}catch(M){$t(s,s.return,M)}}l&64&&yg(s),l&512&&$o(s,s.return);break;case 3:if(Ha(t,s),l&64&&(t=s.updateQueue,t!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{um(t,i)}catch(M){$t(s,s.return,M)}}break;case 27:i===null&&l&4&&Eg(s);case 26:case 5:Ha(t,s),i===null&&l&4&&Mg(s),l&512&&$o(s,s.return);break;case 12:Ha(t,s);break;case 31:Ha(t,s),l&4&&Cg(t,s);break;case 13:Ha(t,s),l&4&&Dg(t,s),l&64&&(t=s.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(s=PS.bind(null,s),e1(t,s))));break;case 22:if(l=s.memoizedState!==null||Ba,!l){i=i!==null&&i.memoizedState!==null||Dn,f=Ba;var m=Dn;Ba=l,(Dn=i)&&!m?Ga(t,s,(s.subtreeFlags&8772)!==0):Ha(t,s),Ba=f,Dn=m}break;case 30:break;default:Ha(t,s)}}function Ag(t){var i=t.alternate;i!==null&&(t.alternate=null,Ag(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&fa(i)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var pn=null,mi=!1;function Ia(t,i,s){for(s=s.child;s!==null;)Rg(t,i,s),s=s.sibling}function Rg(t,i,s){if(Se&&typeof Se.onCommitFiberUnmount=="function")try{Se.onCommitFiberUnmount(ge,s)}catch{}switch(s.tag){case 26:Dn||ma(s,i),Ia(t,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:Dn||ma(s,i);var l=pn,f=mi;Es(s.type)&&(pn=s.stateNode,mi=!1),Ia(t,i,s),ll(s.stateNode),pn=l,mi=f;break;case 5:Dn||ma(s,i);case 6:if(l=pn,f=mi,pn=null,Ia(t,i,s),pn=l,mi=f,pn!==null)if(mi)try{(pn.nodeType===9?pn.body:pn.nodeName==="HTML"?pn.ownerDocument.body:pn).removeChild(s.stateNode)}catch(m){$t(s,i,m)}else try{pn.removeChild(s.stateNode)}catch(m){$t(s,i,m)}break;case 18:pn!==null&&(mi?(t=pn,yv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,s.stateNode),jr(t)):yv(pn,s.stateNode));break;case 4:l=pn,f=mi,pn=s.stateNode.containerInfo,mi=!0,Ia(t,i,s),pn=l,mi=f;break;case 0:case 11:case 14:case 15:vs(2,s,i),Dn||vs(4,s,i),Ia(t,i,s);break;case 1:Dn||(ma(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&Sg(s,i,l)),Ia(t,i,s);break;case 21:Ia(t,i,s);break;case 22:Dn=(l=Dn)||s.memoizedState!==null,Ia(t,i,s),Dn=l;break;default:Ia(t,i,s)}}function Cg(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{jr(t)}catch(s){$t(i,i.return,s)}}}function Dg(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{jr(t)}catch(s){$t(i,i.return,s)}}function TS(t){switch(t.tag){case 31:case 13:case 19:var i=t.stateNode;return i===null&&(i=t.stateNode=new wg),i;case 22:return t=t.stateNode,i=t._retryCache,i===null&&(i=t._retryCache=new wg),i;default:throw Error(a(435,t.tag))}}function Uc(t,i){var s=TS(t);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=OS.bind(null,t,l);l.then(f,f)}})}function gi(t,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],m=t,M=i,D=M;e:for(;D!==null;){switch(D.tag){case 27:if(Es(D.type)){pn=D.stateNode,mi=!1;break e}break;case 5:pn=D.stateNode,mi=!1;break e;case 3:case 4:pn=D.stateNode.containerInfo,mi=!0;break e}D=D.return}if(pn===null)throw Error(a(160));Rg(m,M,f),pn=null,mi=!1,m=f.alternate,m!==null&&(m.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)Ug(i,t),i=i.sibling}var $i=null;function Ug(t,i){var s=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:gi(i,t),vi(t),l&4&&(vs(3,t,t.return),jo(3,t),vs(5,t,t.return));break;case 1:gi(i,t),vi(t),l&512&&(Dn||s===null||ma(s,s.return)),l&64&&Ba&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(s=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=$i;if(gi(i,t),vi(t),l&512&&(Dn||s===null||ma(s,s.return)),l&4){var m=s!==null?s.memoizedState:null;if(l=t.memoizedState,s===null)if(l===null)if(t.stateNode===null){e:{l=t.type,s=t.memoizedProps,f=f.ownerDocument||f;t:switch(l){case"title":m=f.getElementsByTagName("title")[0],(!m||m[ua]||m[gn]||m.namespaceURI==="http://www.w3.org/2000/svg"||m.hasAttribute("itemprop"))&&(m=f.createElement(l),f.head.insertBefore(m,f.querySelector("head > title"))),Yn(m,l,s),m[gn]=t,gt(m),l=m;break e;case"link":var M=Uv("link","href",f).get(l+(s.href||""));if(M){for(var D=0;D<M.length;D++)if(m=M[D],m.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&m.getAttribute("rel")===(s.rel==null?null:s.rel)&&m.getAttribute("title")===(s.title==null?null:s.title)&&m.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){M.splice(D,1);break t}}m=f.createElement(l),Yn(m,l,s),f.head.appendChild(m);break;case"meta":if(M=Uv("meta","content",f).get(l+(s.content||""))){for(D=0;D<M.length;D++)if(m=M[D],m.getAttribute("content")===(s.content==null?null:""+s.content)&&m.getAttribute("name")===(s.name==null?null:s.name)&&m.getAttribute("property")===(s.property==null?null:s.property)&&m.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&m.getAttribute("charset")===(s.charSet==null?null:s.charSet)){M.splice(D,1);break t}}m=f.createElement(l),Yn(m,l,s),f.head.appendChild(m);break;default:throw Error(a(468,l))}m[gn]=t,gt(m),l=m}t.stateNode=l}else Lv(f,t.type,t.stateNode);else t.stateNode=Dv(f,l,t.memoizedProps);else m!==l?(m===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):m.count--,l===null?Lv(f,t.type,t.stateNode):Dv(f,l,t.memoizedProps)):l===null&&t.stateNode!==null&&dh(t,t.memoizedProps,s.memoizedProps)}break;case 27:gi(i,t),vi(t),l&512&&(Dn||s===null||ma(s,s.return)),s!==null&&l&4&&dh(t,t.memoizedProps,s.memoizedProps);break;case 5:if(gi(i,t),vi(t),l&512&&(Dn||s===null||ma(s,s.return)),t.flags&32){f=t.stateNode;try{oi(f,"")}catch(ut){$t(t,t.return,ut)}}l&4&&t.stateNode!=null&&(f=t.memoizedProps,dh(t,f,s!==null?s.memoizedProps:f)),l&1024&&(gh=!0);break;case 6:if(gi(i,t),vi(t),l&4){if(t.stateNode===null)throw Error(a(162));l=t.memoizedProps,s=t.stateNode;try{s.nodeValue=l}catch(ut){$t(t,t.return,ut)}}break;case 3:if(Yc=null,f=$i,$i=Xc(i.containerInfo),gi(i,t),$i=f,vi(t),l&4&&s!==null&&s.memoizedState.isDehydrated)try{jr(i.containerInfo)}catch(ut){$t(t,t.return,ut)}gh&&(gh=!1,Lg(t));break;case 4:l=$i,$i=Xc(t.stateNode.containerInfo),gi(i,t),vi(t),$i=l;break;case 12:gi(i,t),vi(t);break;case 31:gi(i,t),vi(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Uc(t,l)));break;case 13:gi(i,t),vi(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Nc=mt()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Uc(t,l)));break;case 22:f=t.memoizedState!==null;var q=s!==null&&s.memoizedState!==null,he=Ba,we=Dn;if(Ba=he||f,Dn=we||q,gi(i,t),Dn=we,Ba=he,vi(t),l&8192)e:for(i=t.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||q||Ba||Dn||$s(t)),s=null,i=t;;){if(i.tag===5||i.tag===26){if(s===null){q=s=i;try{if(m=q.stateNode,f)M=m.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{D=q.stateNode;var De=q.memoizedProps.style,pe=De!=null&&De.hasOwnProperty("display")?De.display:null;D.style.display=pe==null||typeof pe=="boolean"?"":(""+pe).trim()}}catch(ut){$t(q,q.return,ut)}}}else if(i.tag===6){if(s===null){q=i;try{q.stateNode.nodeValue=f?"":q.memoizedProps}catch(ut){$t(q,q.return,ut)}}}else if(i.tag===18){if(s===null){q=i;try{var xe=q.stateNode;f?Sv(xe,!0):Sv(q.stateNode,!1)}catch(ut){$t(q,q.return,ut)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===t)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break e;for(;i.sibling===null;){if(i.return===null||i.return===t)break e;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=t.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,Uc(t,s))));break;case 19:gi(i,t),vi(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Uc(t,l)));break;case 30:break;case 21:break;default:gi(i,t),vi(t)}}function vi(t){var i=t.flags;if(i&2){try{for(var s,l=t.return;l!==null;){if(bg(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,m=ph(t);Dc(t,m,f);break;case 5:var M=s.stateNode;s.flags&32&&(oi(M,""),s.flags&=-33);var D=ph(t);Dc(t,D,M);break;case 3:case 4:var q=s.stateNode.containerInfo,he=ph(t);mh(t,he,q);break;default:throw Error(a(161))}}catch(we){$t(t,t.return,we)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function Lg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var i=t;Lg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),t=t.sibling}}function Ha(t,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)Tg(t,i.alternate,i),i=i.sibling}function $s(t){for(t=t.child;t!==null;){var i=t;switch(i.tag){case 0:case 11:case 14:case 15:vs(4,i,i.return),$s(i);break;case 1:ma(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&Sg(i,i.return,s),$s(i);break;case 27:ll(i.stateNode);case 26:case 5:ma(i,i.return),$s(i);break;case 22:i.memoizedState===null&&$s(i);break;case 30:$s(i);break;default:$s(i)}t=t.sibling}}function Ga(t,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=t,m=i,M=m.flags;switch(m.tag){case 0:case 11:case 15:Ga(f,m,s),jo(4,m);break;case 1:if(Ga(f,m,s),l=m,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(he){$t(l,l.return,he)}if(l=m,f=l.updateQueue,f!==null){var D=l.stateNode;try{var q=f.shared.hiddenCallbacks;if(q!==null)for(f.shared.hiddenCallbacks=null,f=0;f<q.length;f++)cm(q[f],D)}catch(he){$t(l,l.return,he)}}s&&M&64&&yg(m),$o(m,m.return);break;case 27:Eg(m);case 26:case 5:Ga(f,m,s),s&&l===null&&M&4&&Mg(m),$o(m,m.return);break;case 12:Ga(f,m,s);break;case 31:Ga(f,m,s),s&&M&4&&Cg(f,m);break;case 13:Ga(f,m,s),s&&M&4&&Dg(f,m);break;case 22:m.memoizedState===null&&Ga(f,m,s),$o(m,m.return);break;case 30:break;default:Ga(f,m,s)}i=i.sibling}}function vh(t,i){var s=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),t=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(t=i.memoizedState.cachePool.pool),t!==s&&(t!=null&&t.refCount++,s!=null&&Io(s))}function _h(t,i){t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&Io(t))}function ea(t,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)Ng(t,i,s,l),i=i.sibling}function Ng(t,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:ea(t,i,s,l),f&2048&&jo(9,i);break;case 1:ea(t,i,s,l);break;case 3:ea(t,i,s,l),f&2048&&(t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&Io(t)));break;case 12:if(f&2048){ea(t,i,s,l),t=i.stateNode;try{var m=i.memoizedProps,M=m.id,D=m.onPostCommit;typeof D=="function"&&D(M,i.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(q){$t(i,i.return,q)}}else ea(t,i,s,l);break;case 31:ea(t,i,s,l);break;case 13:ea(t,i,s,l);break;case 23:break;case 22:m=i.stateNode,M=i.alternate,i.memoizedState!==null?m._visibility&2?ea(t,i,s,l):el(t,i):m._visibility&2?ea(t,i,s,l):(m._visibility|=2,Gr(t,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&vh(M,i);break;case 24:ea(t,i,s,l),f&2048&&_h(i.alternate,i);break;default:ea(t,i,s,l)}}function Gr(t,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var m=t,M=i,D=s,q=l,he=M.flags;switch(M.tag){case 0:case 11:case 15:Gr(m,M,D,q,f),jo(8,M);break;case 23:break;case 22:var we=M.stateNode;M.memoizedState!==null?we._visibility&2?Gr(m,M,D,q,f):el(m,M):(we._visibility|=2,Gr(m,M,D,q,f)),f&&he&2048&&vh(M.alternate,M);break;case 24:Gr(m,M,D,q,f),f&&he&2048&&_h(M.alternate,M);break;default:Gr(m,M,D,q,f)}i=i.sibling}}function el(t,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=t,l=i,f=l.flags;switch(l.tag){case 22:el(s,l),f&2048&&vh(l.alternate,l);break;case 24:el(s,l),f&2048&&_h(l.alternate,l);break;default:el(s,l)}i=i.sibling}}var tl=8192;function Vr(t,i,s){if(t.subtreeFlags&tl)for(t=t.child;t!==null;)Pg(t,i,s),t=t.sibling}function Pg(t,i,s){switch(t.tag){case 26:Vr(t,i,s),t.flags&tl&&t.memoizedState!==null&&h1(s,$i,t.memoizedState,t.memoizedProps);break;case 5:Vr(t,i,s);break;case 3:case 4:var l=$i;$i=Xc(t.stateNode.containerInfo),Vr(t,i,s),$i=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=tl,tl=16777216,Vr(t,i,s),tl=l):Vr(t,i,s));break;default:Vr(t,i,s)}}function Og(t){var i=t.alternate;if(i!==null&&(t=i.child,t!==null)){i.child=null;do i=t.sibling,t.sibling=null,t=i;while(t!==null)}}function nl(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];In=l,Fg(l,t)}Og(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)zg(t),t=t.sibling}function zg(t){switch(t.tag){case 0:case 11:case 15:nl(t),t.flags&2048&&vs(9,t,t.return);break;case 3:nl(t);break;case 12:nl(t);break;case 22:var i=t.stateNode;t.memoizedState!==null&&i._visibility&2&&(t.return===null||t.return.tag!==13)?(i._visibility&=-3,Lc(t)):nl(t);break;default:nl(t)}}function Lc(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];In=l,Fg(l,t)}Og(t)}for(t=t.child;t!==null;){switch(i=t,i.tag){case 0:case 11:case 15:vs(8,i,i.return),Lc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,Lc(i));break;default:Lc(i)}t=t.sibling}}function Fg(t,i){for(;In!==null;){var s=In;switch(s.tag){case 0:case 11:case 15:vs(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:Io(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,In=l;else e:for(s=t;In!==null;){l=In;var f=l.sibling,m=l.return;if(Ag(l),l===s){In=null;break e}if(f!==null){f.return=m,In=f;break e}In=m}}}var AS={getCacheForType:function(t){var i=Xn(An),s=i.data.get(t);return s===void 0&&(s=t(),i.data.set(t,s)),s},cacheSignal:function(){return Xn(An).controller.signal}},RS=typeof WeakMap=="function"?WeakMap:Map,Kt=0,ln=null,Lt=null,Ot=0,jt=0,Ri=null,_s=!1,kr=!1,xh=!1,Va=0,xn=0,xs=0,er=0,yh=0,Ci=0,Wr=0,il=null,_i=null,Sh=!1,Nc=0,Bg=0,Pc=1/0,Oc=null,ys=null,Pn=0,Ss=null,Xr=null,ka=0,Mh=0,bh=null,Ig=null,al=0,Eh=null;function Di(){return(Kt&2)!==0&&Ot!==0?Ot&-Ot:P.T!==null?Dh():si()}function Hg(){if(Ci===0)if((Ot&536870912)===0||Bt){var t=xt;xt<<=1,(xt&3932160)===0&&(xt=262144),Ci=t}else Ci=536870912;return t=Ti.current,t!==null&&(t.flags|=32),Ci}function xi(t,i,s){(t===ln&&(jt===2||jt===9)||t.cancelPendingCommit!==null)&&(qr(t,0),Ms(t,Ot,Ci,!1)),it(t,s),((Kt&2)===0||t!==ln)&&(t===ln&&((Kt&2)===0&&(er|=s),xn===4&&Ms(t,Ot,Ci,!1)),ga(t))}function Gg(t,i,s){if((Kt&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&t.expiredLanes)===0||He(t,i),f=l?US(t,i):Th(t,i,!0),m=l;do{if(f===0){kr&&!l&&Ms(t,i,0,!1);break}else{if(s=t.current.alternate,m&&!CS(s)){f=Th(t,i,!1),m=!1;continue}if(f===2){if(m=i,t.errorRecoveryDisabledLanes&m)var M=0;else M=t.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){i=M;e:{var D=t;f=il;var q=D.current.memoizedState.isDehydrated;if(q&&(qr(D,M).flags|=256),M=Th(D,M,!1),M!==2){if(xh&&!q){D.errorRecoveryDisabledLanes|=m,er|=m,f=4;break e}m=_i,_i=f,m!==null&&(_i===null?_i=m:_i.push.apply(_i,m))}f=M}if(m=!1,f!==2)continue}}if(f===1){qr(t,0),Ms(t,i,0,!0);break}e:{switch(l=t,m=f,m){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:Ms(l,i,Ci,!_s);break e;case 2:_i=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=Nc+300-mt(),10<f)){if(Ms(l,i,Ci,!_s),Me(l,0,!0)!==0)break e;ka=i,l.timeoutHandle=_v(Vg.bind(null,l,s,_i,Oc,Sh,i,Ci,er,Wr,_s,m,"Throttled",-0,0),f);break e}Vg(l,s,_i,Oc,Sh,i,Ci,er,Wr,_s,m,null,-0,0)}}break}while(!0);ga(t)}function Vg(t,i,s,l,f,m,M,D,q,he,we,De,pe,xe){if(t.timeoutHandle=-1,De=i.subtreeFlags,De&8192||(De&16785408)===16785408){De={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ii},Pg(i,m,De);var ut=(m&62914560)===m?Nc-mt():(m&4194048)===m?Bg-mt():0;if(ut=d1(De,ut),ut!==null){ka=m,t.cancelPendingCommit=ut(Qg.bind(null,t,i,m,s,l,f,M,D,q,we,De,null,pe,xe)),Ms(t,m,M,!he);return}}Qg(t,i,m,s,l,f,M,D,q)}function CS(t){for(var i=t;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],m=f.getSnapshot;f=f.value;try{if(!Ei(m(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Ms(t,i,s,l){i&=~yh,i&=~er,t.suspendedLanes|=i,t.pingedLanes&=~i,l&&(t.warmLanes|=i),l=t.expirationTimes;for(var f=i;0<f;){var m=31-Je(f),M=1<<m;l[m]=-1,f&=~M}s!==0&&Pt(t,s,i)}function zc(){return(Kt&6)===0?(sl(0),!1):!0}function wh(){if(Lt!==null){if(jt===0)var t=Lt.return;else t=Lt,La=Xs=null,Gf(t),zr=null,Go=0,t=Lt;for(;t!==null;)xg(t.alternate,t),t=t.return;Lt=null}}function qr(t,i){var s=t.timeoutHandle;s!==-1&&(t.timeoutHandle=-1,KS(s)),s=t.cancelPendingCommit,s!==null&&(t.cancelPendingCommit=null,s()),ka=0,wh(),ln=t,Lt=s=Da(t.current,null),Ot=i,jt=0,Ri=null,_s=!1,kr=He(t,i),xh=!1,Wr=Ci=yh=er=xs=xn=0,_i=il=null,Sh=!1,(i&8)!==0&&(i|=i&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=i;0<l;){var f=31-Je(l),m=1<<f;i|=t[f],l&=~m}return Va=i,ic(),s}function kg(t,i){wt=null,P.H=Ko,i===Or||i===fc?(i=sm(),jt=3):i===Cf?(i=sm(),jt=4):jt=i===ih?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,Ri=i,Lt===null&&(xn=1,wc(t,Gi(i,t.current)))}function Wg(){var t=Ti.current;return t===null?!0:(Ot&4194048)===Ot?Xi===null:(Ot&62914560)===Ot||(Ot&536870912)!==0?t===Xi:!1}function Xg(){var t=P.H;return P.H=Ko,t===null?Ko:t}function qg(){var t=P.A;return P.A=AS,t}function Fc(){xn=4,_s||(Ot&4194048)!==Ot&&Ti.current!==null||(kr=!0),(xs&134217727)===0&&(er&134217727)===0||ln===null||Ms(ln,Ot,Ci,!1)}function Th(t,i,s){var l=Kt;Kt|=2;var f=Xg(),m=qg();(ln!==t||Ot!==i)&&(Oc=null,qr(t,i)),i=!1;var M=xn;e:do try{if(jt!==0&&Lt!==null){var D=Lt,q=Ri;switch(jt){case 8:wh(),M=6;break e;case 3:case 2:case 9:case 6:Ti.current===null&&(i=!0);var he=jt;if(jt=0,Ri=null,Yr(t,D,q,he),s&&kr){M=0;break e}break;default:he=jt,jt=0,Ri=null,Yr(t,D,q,he)}}DS(),M=xn;break}catch(we){kg(t,we)}while(!0);return i&&t.shellSuspendCounter++,La=Xs=null,Kt=l,P.H=f,P.A=m,Lt===null&&(ln=null,Ot=0,ic()),M}function DS(){for(;Lt!==null;)Yg(Lt)}function US(t,i){var s=Kt;Kt|=2;var l=Xg(),f=qg();ln!==t||Ot!==i?(Oc=null,Pc=mt()+500,qr(t,i)):kr=He(t,i);e:do try{if(jt!==0&&Lt!==null){i=Lt;var m=Ri;t:switch(jt){case 1:jt=0,Ri=null,Yr(t,i,m,1);break;case 2:case 9:if(im(m)){jt=0,Ri=null,Zg(i);break}i=function(){jt!==2&&jt!==9||ln!==t||(jt=7),ga(t)},m.then(i,i);break e;case 3:jt=7;break e;case 4:jt=5;break e;case 7:im(m)?(jt=0,Ri=null,Zg(i)):(jt=0,Ri=null,Yr(t,i,m,7));break;case 5:var M=null;switch(Lt.tag){case 26:M=Lt.memoizedState;case 5:case 27:var D=Lt;if(M?Nv(M):D.stateNode.complete){jt=0,Ri=null;var q=D.sibling;if(q!==null)Lt=q;else{var he=D.return;he!==null?(Lt=he,Bc(he)):Lt=null}break t}}jt=0,Ri=null,Yr(t,i,m,5);break;case 6:jt=0,Ri=null,Yr(t,i,m,6);break;case 8:wh(),xn=6;break e;default:throw Error(a(462))}}LS();break}catch(we){kg(t,we)}while(!0);return La=Xs=null,P.H=l,P.A=f,Kt=s,Lt!==null?0:(ln=null,Ot=0,ic(),xn)}function LS(){for(;Lt!==null&&!rt();)Yg(Lt)}function Yg(t){var i=vg(t.alternate,t,Va);t.memoizedProps=t.pendingProps,i===null?Bc(t):Lt=i}function Zg(t){var i=t,s=i.alternate;switch(i.tag){case 15:case 0:i=fg(s,i,i.pendingProps,i.type,void 0,Ot);break;case 11:i=fg(s,i,i.pendingProps,i.type.render,i.ref,Ot);break;case 5:Gf(i);default:xg(s,i),i=Lt=q0(i,Va),i=vg(s,i,Va)}t.memoizedProps=t.pendingProps,i===null?Bc(t):Lt=i}function Yr(t,i,s,l){La=Xs=null,Gf(i),zr=null,Go=0;var f=i.return;try{if(yS(t,f,i,s,Ot)){xn=1,wc(t,Gi(s,t.current)),Lt=null;return}}catch(m){if(f!==null)throw Lt=f,m;xn=1,wc(t,Gi(s,t.current)),Lt=null;return}i.flags&32768?(Bt||l===1?t=!0:kr||(Ot&536870912)!==0?t=!1:(_s=t=!0,(l===2||l===9||l===3||l===6)&&(l=Ti.current,l!==null&&l.tag===13&&(l.flags|=16384))),Kg(i,t)):Bc(i)}function Bc(t){var i=t;do{if((i.flags&32768)!==0){Kg(i,_s);return}t=i.return;var s=bS(i.alternate,i,Va);if(s!==null){Lt=s;return}if(i=i.sibling,i!==null){Lt=i;return}Lt=i=t}while(i!==null);xn===0&&(xn=5)}function Kg(t,i){do{var s=ES(t.alternate,t);if(s!==null){s.flags&=32767,Lt=s;return}if(s=t.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(t=t.sibling,t!==null)){Lt=t;return}Lt=t=s}while(t!==null);xn=6,Lt=null}function Qg(t,i,s,l,f,m,M,D,q){t.cancelPendingCommit=null;do Ic();while(Pn!==0);if((Kt&6)!==0)throw Error(a(327));if(i!==null){if(i===t.current)throw Error(a(177));if(m=i.lanes|i.childLanes,m|=pf,Qt(t,s,m,M,D,q),t===ln&&(Lt=ln=null,Ot=0),Xr=i,Ss=t,ka=s,Mh=m,bh=f,Ig=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,zS(te,function(){return tv(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=P.T,P.T=null,f=k.p,k.p=2,M=Kt,Kt|=4;try{wS(t,i,s)}finally{Kt=M,k.p=f,P.T=l}}Pn=1,Jg(),jg(),$g()}}function Jg(){if(Pn===1){Pn=0;var t=Ss,i=Xr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=P.T,P.T=null;var l=k.p;k.p=2;var f=Kt;Kt|=4;try{Ug(i,t);var m=Bh,M=F0(t.containerInfo),D=m.focusedElem,q=m.selectionRange;if(M!==D&&D&&D.ownerDocument&&z0(D.ownerDocument.documentElement,D)){if(q!==null&&cf(D)){var he=q.start,we=q.end;if(we===void 0&&(we=he),"selectionStart"in D)D.selectionStart=he,D.selectionEnd=Math.min(we,D.value.length);else{var De=D.ownerDocument||document,pe=De&&De.defaultView||window;if(pe.getSelection){var xe=pe.getSelection(),ut=D.textContent.length,_t=Math.min(q.start,ut),sn=q.end===void 0?_t:Math.min(q.end,ut);!xe.extend&&_t>sn&&(M=sn,sn=_t,_t=M);var ie=O0(D,_t),j=O0(D,sn);if(ie&&j&&(xe.rangeCount!==1||xe.anchorNode!==ie.node||xe.anchorOffset!==ie.offset||xe.focusNode!==j.node||xe.focusOffset!==j.offset)){var fe=De.createRange();fe.setStart(ie.node,ie.offset),xe.removeAllRanges(),_t>sn?(xe.addRange(fe),xe.extend(j.node,j.offset)):(fe.setEnd(j.node,j.offset),xe.addRange(fe))}}}}for(De=[],xe=D;xe=xe.parentNode;)xe.nodeType===1&&De.push({element:xe,left:xe.scrollLeft,top:xe.scrollTop});for(typeof D.focus=="function"&&D.focus(),D=0;D<De.length;D++){var Re=De[D];Re.element.scrollLeft=Re.left,Re.element.scrollTop=Re.top}}Jc=!!Fh,Bh=Fh=null}finally{Kt=f,k.p=l,P.T=s}}t.current=i,Pn=2}}function jg(){if(Pn===2){Pn=0;var t=Ss,i=Xr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=P.T,P.T=null;var l=k.p;k.p=2;var f=Kt;Kt|=4;try{Tg(t,i.alternate,i)}finally{Kt=f,k.p=l,P.T=s}}Pn=3}}function $g(){if(Pn===4||Pn===3){Pn=0,Z();var t=Ss,i=Xr,s=ka,l=Ig;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?Pn=5:(Pn=0,Xr=Ss=null,ev(t,t.pendingLanes));var f=t.pendingLanes;if(f===0&&(ys=null),Aa(s),i=i.stateNode,Se&&typeof Se.onCommitFiberRoot=="function")try{Se.onCommitFiberRoot(ge,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=P.T,f=k.p,k.p=2,P.T=null;try{for(var m=t.onRecoverableError,M=0;M<l.length;M++){var D=l[M];m(D.value,{componentStack:D.stack})}}finally{P.T=i,k.p=f}}(ka&3)!==0&&Ic(),ga(t),f=t.pendingLanes,(s&261930)!==0&&(f&42)!==0?t===Eh?al++:(al=0,Eh=t):al=0,sl(0)}}function ev(t,i){(t.pooledCacheLanes&=i)===0&&(i=t.pooledCache,i!=null&&(t.pooledCache=null,Io(i)))}function Ic(){return Jg(),jg(),$g(),tv()}function tv(){if(Pn!==5)return!1;var t=Ss,i=Mh;Mh=0;var s=Aa(ka),l=P.T,f=k.p;try{k.p=32>s?32:s,P.T=null,s=bh,bh=null;var m=Ss,M=ka;if(Pn=0,Xr=Ss=null,ka=0,(Kt&6)!==0)throw Error(a(331));var D=Kt;if(Kt|=4,zg(m.current),Ng(m,m.current,M,s),Kt=D,sl(0,!1),Se&&typeof Se.onPostCommitFiberRoot=="function")try{Se.onPostCommitFiberRoot(ge,m)}catch{}return!0}finally{k.p=f,P.T=l,ev(t,i)}}function nv(t,i,s){i=Gi(s,i),i=nh(t.stateNode,i,2),t=ps(t,i,2),t!==null&&(it(t,2),ga(t))}function $t(t,i,s){if(t.tag===3)nv(t,t,s);else for(;i!==null;){if(i.tag===3){nv(i,t,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ys===null||!ys.has(l))){t=Gi(s,t),s=ig(2),l=ps(i,s,2),l!==null&&(ag(s,l,i,t),it(l,2),ga(l));break}}i=i.return}}function Ah(t,i,s){var l=t.pingCache;if(l===null){l=t.pingCache=new RS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(xh=!0,f.add(s),t=NS.bind(null,t,i,s),i.then(t,t))}function NS(t,i,s){var l=t.pingCache;l!==null&&l.delete(i),t.pingedLanes|=t.suspendedLanes&s,t.warmLanes&=~s,ln===t&&(Ot&s)===s&&(xn===4||xn===3&&(Ot&62914560)===Ot&&300>mt()-Nc?(Kt&2)===0&&qr(t,0):yh|=s,Wr===Ot&&(Wr=0)),ga(t)}function iv(t,i){i===0&&(i=Le()),t=Vs(t,i),t!==null&&(it(t,i),ga(t))}function PS(t){var i=t.memoizedState,s=0;i!==null&&(s=i.retryLane),iv(t,s)}function OS(t,i){var s=0;switch(t.tag){case 31:case 13:var l=t.stateNode,f=t.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),iv(t,s)}function zS(t,i){return Be(t,i)}var Hc=null,Zr=null,Rh=!1,Gc=!1,Ch=!1,bs=0;function ga(t){t!==Zr&&t.next===null&&(Zr===null?Hc=Zr=t:Zr=Zr.next=t),Gc=!0,Rh||(Rh=!0,BS())}function sl(t,i){if(!Ch&&Gc){Ch=!0;do for(var s=!1,l=Hc;l!==null;){if(t!==0){var f=l.pendingLanes;if(f===0)var m=0;else{var M=l.suspendedLanes,D=l.pingedLanes;m=(1<<31-Je(42|t)+1)-1,m&=f&~(M&~D),m=m&201326741?m&201326741|1:m?m|2:0}m!==0&&(s=!0,ov(l,m))}else m=Ot,m=Me(l,l===ln?m:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(m&3)===0||He(l,m)||(s=!0,ov(l,m));l=l.next}while(s);Ch=!1}}function FS(){av()}function av(){Gc=Rh=!1;var t=0;bs!==0&&ZS()&&(t=bs);for(var i=mt(),s=null,l=Hc;l!==null;){var f=l.next,m=sv(l,i);m===0?(l.next=null,s===null?Hc=f:s.next=f,f===null&&(Zr=s)):(s=l,(t!==0||(m&3)!==0)&&(Gc=!0)),l=f}Pn!==0&&Pn!==5||sl(t),bs!==0&&(bs=0)}function sv(t,i){for(var s=t.suspendedLanes,l=t.pingedLanes,f=t.expirationTimes,m=t.pendingLanes&-62914561;0<m;){var M=31-Je(m),D=1<<M,q=f[M];q===-1?((D&s)===0||(D&l)!==0)&&(f[M]=Qe(D,i)):q<=i&&(t.expiredLanes|=D),m&=~D}if(i=ln,s=Ot,s=Me(t,t===i?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,s===0||t===i&&(jt===2||jt===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&pt(l),t.callbackNode=null,t.callbackPriority=0;if((s&3)===0||He(t,s)){if(i=s&-s,i===t.callbackPriority)return i;switch(l!==null&&pt(l),Aa(s)){case 2:case 8:s=w;break;case 32:s=te;break;case 268435456:s=_e;break;default:s=te}return l=rv.bind(null,t),s=Be(s,l),t.callbackPriority=i,t.callbackNode=s,i}return l!==null&&l!==null&&pt(l),t.callbackPriority=2,t.callbackNode=null,2}function rv(t,i){if(Pn!==0&&Pn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var s=t.callbackNode;if(Ic()&&t.callbackNode!==s)return null;var l=Ot;return l=Me(t,t===ln?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(Gg(t,l,i),sv(t,mt()),t.callbackNode!=null&&t.callbackNode===s?rv.bind(null,t):null)}function ov(t,i){if(Ic())return null;Gg(t,i,!0)}function BS(){QS(function(){(Kt&6)!==0?Be(I,FS):av()})}function Dh(){if(bs===0){var t=Nr;t===0&&(t=nt,nt<<=1,(nt&261888)===0&&(nt=256)),bs=t}return bs}function lv(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ji(""+t)}function cv(t,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,t.id&&s.setAttribute("form",t.id),i.parentNode.insertBefore(s,i),t=new FormData(t),s.parentNode.removeChild(s),t}function IS(t,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var m=lv((f[Ln]||null).action),M=l.submitter;M&&(i=(i=M[Ln]||null)?lv(i.formAction):M.getAttribute("formAction"),i!==null&&(m=i,M=null));var D=new $l("action","action",null,l,f);t.push({event:D,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(bs!==0){var q=M?cv(f,M):new FormData(f);Qf(s,{pending:!0,data:q,method:f.method,action:m},null,q)}}else typeof m=="function"&&(D.preventDefault(),q=M?cv(f,M):new FormData(f),Qf(s,{pending:!0,data:q,method:f.method,action:m},m,q))},currentTarget:f}]})}}for(var Uh=0;Uh<df.length;Uh++){var Lh=df[Uh],HS=Lh.toLowerCase(),GS=Lh[0].toUpperCase()+Lh.slice(1);ji(HS,"on"+GS)}ji(H0,"onAnimationEnd"),ji(G0,"onAnimationIteration"),ji(V0,"onAnimationStart"),ji("dblclick","onDoubleClick"),ji("focusin","onFocus"),ji("focusout","onBlur"),ji(iS,"onTransitionRun"),ji(aS,"onTransitionStart"),ji(sS,"onTransitionCancel"),ji(k0,"onTransitionEnd"),Y("onMouseEnter",["mouseout","mouseover"]),Y("onMouseLeave",["mouseout","mouseover"]),Y("onPointerEnter",["pointerout","pointerover"]),Y("onPointerLeave",["pointerout","pointerover"]),R("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),R("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),R("onBeforeInput",["compositionend","keypress","textInput","paste"]),R("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var rl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),VS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(rl));function uv(t,i){i=(i&4)!==0;for(var s=0;s<t.length;s++){var l=t[s],f=l.event;l=l.listeners;e:{var m=void 0;if(i)for(var M=l.length-1;0<=M;M--){var D=l[M],q=D.instance,he=D.currentTarget;if(D=D.listener,q!==m&&f.isPropagationStopped())break e;m=D,f.currentTarget=he;try{m(f)}catch(we){nc(we)}f.currentTarget=null,m=q}else for(M=0;M<l.length;M++){if(D=l[M],q=D.instance,he=D.currentTarget,D=D.listener,q!==m&&f.isPropagationStopped())break e;m=D,f.currentTarget=he;try{m(f)}catch(we){nc(we)}f.currentTarget=null,m=q}}}}function Nt(t,i){var s=i[Fi];s===void 0&&(s=i[Fi]=new Set);var l=t+"__bubble";s.has(l)||(fv(i,t,2,!1),s.add(l))}function Nh(t,i,s){var l=0;i&&(l|=4),fv(s,t,l,i)}var Vc="_reactListening"+Math.random().toString(36).slice(2);function Ph(t){if(!t[Vc]){t[Vc]=!0,Gt.forEach(function(s){s!=="selectionchange"&&(VS.has(s)||Nh(s,!1,t),Nh(s,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[Vc]||(i[Vc]=!0,Nh("selectionchange",!1,i))}}function fv(t,i,s,l){switch(Hv(i)){case 2:var f=g1;break;case 8:f=v1;break;default:f=Kh}s=f.bind(null,i,s,t),f=void 0,!$u||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?t.addEventListener(i,s,{capture:!0,passive:f}):t.addEventListener(i,s,!0):f!==void 0?t.addEventListener(i,s,{passive:f}):t.addEventListener(i,s,!1)}function Oh(t,i,s,l,f){var m=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var M=l.tag;if(M===3||M===4){var D=l.stateNode.containerInfo;if(D===f)break;if(M===4)for(M=l.return;M!==null;){var q=M.tag;if((q===3||q===4)&&M.stateNode.containerInfo===f)return;M=M.return}for(;D!==null;){if(M=Ce(D),M===null)return;if(q=M.tag,q===5||q===6||q===26||q===27){l=m=M;continue e}D=D.parentNode}}l=l.return}g0(function(){var he=m,we=Ju(s),De=[];e:{var pe=W0.get(t);if(pe!==void 0){var xe=$l,ut=t;switch(t){case"keypress":if(Jl(s)===0)break e;case"keydown":case"keyup":xe=Oy;break;case"focusin":ut="focus",xe=af;break;case"focusout":ut="blur",xe=af;break;case"beforeblur":case"afterblur":xe=af;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":xe=x0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":xe=by;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":xe=By;break;case H0:case G0:case V0:xe=Ty;break;case k0:xe=Hy;break;case"scroll":case"scrollend":xe=Sy;break;case"wheel":xe=Vy;break;case"copy":case"cut":case"paste":xe=Ry;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":xe=S0;break;case"toggle":case"beforetoggle":xe=Wy}var _t=(i&4)!==0,sn=!_t&&(t==="scroll"||t==="scrollend"),ie=_t?pe!==null?pe+"Capture":null:pe;_t=[];for(var j=he,fe;j!==null;){var Re=j;if(fe=Re.stateNode,Re=Re.tag,Re!==5&&Re!==26&&Re!==27||fe===null||ie===null||(Re=Ro(j,ie),Re!=null&&_t.push(ol(j,Re,fe))),sn)break;j=j.return}0<_t.length&&(pe=new xe(pe,ut,null,s,we),De.push({event:pe,listeners:_t}))}}if((i&7)===0){e:{if(pe=t==="mouseover"||t==="pointerover",xe=t==="mouseout"||t==="pointerout",pe&&s!==Qu&&(ut=s.relatedTarget||s.fromElement)&&(Ce(ut)||ut[Qn]))break e;if((xe||pe)&&(pe=we.window===we?we:(pe=we.ownerDocument)?pe.defaultView||pe.parentWindow:window,xe?(ut=s.relatedTarget||s.toElement,xe=he,ut=ut?Ce(ut):null,ut!==null&&(sn=c(ut),_t=ut.tag,ut!==sn||_t!==5&&_t!==27&&_t!==6)&&(ut=null)):(xe=null,ut=he),xe!==ut)){if(_t=x0,Re="onMouseLeave",ie="onMouseEnter",j="mouse",(t==="pointerout"||t==="pointerover")&&(_t=S0,Re="onPointerLeave",ie="onPointerEnter",j="pointer"),sn=xe==null?pe:ct(xe),fe=ut==null?pe:ct(ut),pe=new _t(Re,j+"leave",xe,s,we),pe.target=sn,pe.relatedTarget=fe,Re=null,Ce(we)===he&&(_t=new _t(ie,j+"enter",ut,s,we),_t.target=fe,_t.relatedTarget=sn,Re=_t),sn=Re,xe&&ut)t:{for(_t=kS,ie=xe,j=ut,fe=0,Re=ie;Re;Re=_t(Re))fe++;Re=0;for(var vt=j;vt;vt=_t(vt))Re++;for(;0<fe-Re;)ie=_t(ie),fe--;for(;0<Re-fe;)j=_t(j),Re--;for(;fe--;){if(ie===j||j!==null&&ie===j.alternate){_t=ie;break t}ie=_t(ie),j=_t(j)}_t=null}else _t=null;xe!==null&&hv(De,pe,xe,_t,!1),ut!==null&&sn!==null&&hv(De,sn,ut,_t,!0)}}e:{if(pe=he?ct(he):window,xe=pe.nodeName&&pe.nodeName.toLowerCase(),xe==="select"||xe==="input"&&pe.type==="file")var qt=C0;else if(A0(pe))if(D0)qt=eS;else{qt=jy;var ht=Jy}else xe=pe.nodeName,!xe||xe.toLowerCase()!=="input"||pe.type!=="checkbox"&&pe.type!=="radio"?he&&Bi(he.elementType)&&(qt=C0):qt=$y;if(qt&&(qt=qt(t,he))){R0(De,qt,s,we);break e}ht&&ht(t,pe,he),t==="focusout"&&he&&pe.type==="number"&&he.memoizedProps.value!=null&&Nn(pe,"number",pe.value)}switch(ht=he?ct(he):window,t){case"focusin":(A0(ht)||ht.contentEditable==="true")&&(wr=ht,uf=he,zo=null);break;case"focusout":zo=uf=wr=null;break;case"mousedown":ff=!0;break;case"contextmenu":case"mouseup":case"dragend":ff=!1,B0(De,s,we);break;case"selectionchange":if(nS)break;case"keydown":case"keyup":B0(De,s,we)}var Tt;if(rf)e:{switch(t){case"compositionstart":var zt="onCompositionStart";break e;case"compositionend":zt="onCompositionEnd";break e;case"compositionupdate":zt="onCompositionUpdate";break e}zt=void 0}else Er?w0(t,s)&&(zt="onCompositionEnd"):t==="keydown"&&s.keyCode===229&&(zt="onCompositionStart");zt&&(M0&&s.locale!=="ko"&&(Er||zt!=="onCompositionStart"?zt==="onCompositionEnd"&&Er&&(Tt=v0()):(os=we,ef="value"in os?os.value:os.textContent,Er=!0)),ht=kc(he,zt),0<ht.length&&(zt=new y0(zt,t,null,s,we),De.push({event:zt,listeners:ht}),Tt?zt.data=Tt:(Tt=T0(s),Tt!==null&&(zt.data=Tt)))),(Tt=qy?Yy(t,s):Zy(t,s))&&(zt=kc(he,"onBeforeInput"),0<zt.length&&(ht=new y0("onBeforeInput","beforeinput",null,s,we),De.push({event:ht,listeners:zt}),ht.data=Tt)),IS(De,t,he,s,we)}uv(De,i)})}function ol(t,i,s){return{instance:t,listener:i,currentTarget:s}}function kc(t,i){for(var s=i+"Capture",l=[];t!==null;){var f=t,m=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||m===null||(f=Ro(t,s),f!=null&&l.unshift(ol(t,f,m)),f=Ro(t,i),f!=null&&l.push(ol(t,f,m))),t.tag===3)return l;t=t.return}return[]}function kS(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function hv(t,i,s,l,f){for(var m=i._reactName,M=[];s!==null&&s!==l;){var D=s,q=D.alternate,he=D.stateNode;if(D=D.tag,q!==null&&q===l)break;D!==5&&D!==26&&D!==27||he===null||(q=he,f?(he=Ro(s,m),he!=null&&M.unshift(ol(s,he,q))):f||(he=Ro(s,m),he!=null&&M.push(ol(s,he,q)))),s=s.return}M.length!==0&&t.push({event:i,listeners:M})}var WS=/\r\n?/g,XS=/\u0000|\uFFFD/g;function dv(t){return(typeof t=="string"?t:""+t).replace(WS,`
`).replace(XS,"")}function pv(t,i){return i=dv(i),dv(t)===i}function an(t,i,s,l,f,m){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||oi(t,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&oi(t,""+l);break;case"className":Ye(t,"class",l);break;case"tabIndex":Ye(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Ye(t,s,l);break;case"style":dn(t,l,m);break;case"data":if(i!=="object"){Ye(t,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){t.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=Ji(""+l),t.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof m=="function"&&(s==="formAction"?(i!=="input"&&an(t,i,"name",f.name,f,null),an(t,i,"formEncType",f.formEncType,f,null),an(t,i,"formMethod",f.formMethod,f,null),an(t,i,"formTarget",f.formTarget,f,null)):(an(t,i,"encType",f.encType,f,null),an(t,i,"method",f.method,f,null),an(t,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=Ji(""+l),t.setAttribute(s,l);break;case"onClick":l!=null&&(t.onclick=Ii);break;case"onScroll":l!=null&&Nt("scroll",t);break;case"onScrollEnd":l!=null&&Nt("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));t.innerHTML=s}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}s=Ji(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""+l):t.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""):t.removeAttribute(s);break;case"capture":case"download":l===!0?t.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,l):t.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(s,l):t.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(s):t.setAttribute(s,l);break;case"popover":Nt("beforetoggle",t),Nt("toggle",t),$e(t,"popover",l);break;case"xlinkActuate":et(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":et(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":et(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":et(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":et(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":et(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":et(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":et(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":et(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":$e(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=tn.get(s)||s,$e(t,s,l))}}function zh(t,i,s,l,f,m){switch(s){case"style":dn(t,l,m);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));t.innerHTML=s}}break;case"children":typeof l=="string"?oi(t,l):(typeof l=="number"||typeof l=="bigint")&&oi(t,""+l);break;case"onScroll":l!=null&&Nt("scroll",t);break;case"onScrollEnd":l!=null&&Nt("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Ii);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Xt.hasOwnProperty(s))e:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),m=t[Ln]||null,m=m!=null?m[s]:null,typeof m=="function"&&t.removeEventListener(i,m,f),typeof l=="function")){typeof m!="function"&&m!==null&&(s in t?t[s]=null:t.hasAttribute(s)&&t.removeAttribute(s)),t.addEventListener(i,l,f);break e}s in t?t[s]=l:l===!0?t.setAttribute(s,""):$e(t,s,l)}}}function Yn(t,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Nt("error",t),Nt("load",t);var l=!1,f=!1,m;for(m in s)if(s.hasOwnProperty(m)){var M=s[m];if(M!=null)switch(m){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:an(t,i,m,M,s,null)}}f&&an(t,i,"srcSet",s.srcSet,s,null),l&&an(t,i,"src",s.src,s,null);return;case"input":Nt("invalid",t);var D=m=M=f=null,q=null,he=null;for(l in s)if(s.hasOwnProperty(l)){var we=s[l];if(we!=null)switch(l){case"name":f=we;break;case"type":M=we;break;case"checked":q=we;break;case"defaultChecked":he=we;break;case"value":m=we;break;case"defaultValue":D=we;break;case"children":case"dangerouslySetInnerHTML":if(we!=null)throw Error(a(137,i));break;default:an(t,i,l,we,s,null)}}st(t,m,D,q,he,M,f,!1);return;case"select":Nt("invalid",t),l=M=m=null;for(f in s)if(s.hasOwnProperty(f)&&(D=s[f],D!=null))switch(f){case"value":m=D;break;case"defaultValue":M=D;break;case"multiple":l=D;default:an(t,i,f,D,s,null)}i=m,s=M,t.multiple=!!l,i!=null?Ct(t,!!l,i,!1):s!=null&&Ct(t,!!l,s,!0);return;case"textarea":Nt("invalid",t),m=f=l=null;for(M in s)if(s.hasOwnProperty(M)&&(D=s[M],D!=null))switch(M){case"value":l=D;break;case"defaultValue":f=D;break;case"children":m=D;break;case"dangerouslySetInnerHTML":if(D!=null)throw Error(a(91));break;default:an(t,i,M,D,s,null)}bi(t,l,f,m);return;case"option":for(q in s)if(s.hasOwnProperty(q)&&(l=s[q],l!=null))switch(q){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:an(t,i,q,l,s,null)}return;case"dialog":Nt("beforetoggle",t),Nt("toggle",t),Nt("cancel",t),Nt("close",t);break;case"iframe":case"object":Nt("load",t);break;case"video":case"audio":for(l=0;l<rl.length;l++)Nt(rl[l],t);break;case"image":Nt("error",t),Nt("load",t);break;case"details":Nt("toggle",t);break;case"embed":case"source":case"link":Nt("error",t),Nt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(he in s)if(s.hasOwnProperty(he)&&(l=s[he],l!=null))switch(he){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:an(t,i,he,l,s,null)}return;default:if(Bi(i)){for(we in s)s.hasOwnProperty(we)&&(l=s[we],l!==void 0&&zh(t,i,we,l,s,void 0));return}}for(D in s)s.hasOwnProperty(D)&&(l=s[D],l!=null&&an(t,i,D,l,s,null))}function qS(t,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,m=null,M=null,D=null,q=null,he=null,we=null;for(xe in s){var De=s[xe];if(s.hasOwnProperty(xe)&&De!=null)switch(xe){case"checked":break;case"value":break;case"defaultValue":q=De;default:l.hasOwnProperty(xe)||an(t,i,xe,null,l,De)}}for(var pe in l){var xe=l[pe];if(De=s[pe],l.hasOwnProperty(pe)&&(xe!=null||De!=null))switch(pe){case"type":m=xe;break;case"name":f=xe;break;case"checked":he=xe;break;case"defaultChecked":we=xe;break;case"value":M=xe;break;case"defaultValue":D=xe;break;case"children":case"dangerouslySetInnerHTML":if(xe!=null)throw Error(a(137,i));break;default:xe!==De&&an(t,i,pe,xe,l,De)}}Tn(t,M,D,q,he,we,m,f);return;case"select":xe=M=D=pe=null;for(m in s)if(q=s[m],s.hasOwnProperty(m)&&q!=null)switch(m){case"value":break;case"multiple":xe=q;default:l.hasOwnProperty(m)||an(t,i,m,null,l,q)}for(f in l)if(m=l[f],q=s[f],l.hasOwnProperty(f)&&(m!=null||q!=null))switch(f){case"value":pe=m;break;case"defaultValue":D=m;break;case"multiple":M=m;default:m!==q&&an(t,i,f,m,l,q)}i=D,s=M,l=xe,pe!=null?Ct(t,!!s,pe,!1):!!l!=!!s&&(i!=null?Ct(t,!!s,i,!0):Ct(t,!!s,s?[]:"",!1));return;case"textarea":xe=pe=null;for(D in s)if(f=s[D],s.hasOwnProperty(D)&&f!=null&&!l.hasOwnProperty(D))switch(D){case"value":break;case"children":break;default:an(t,i,D,null,l,f)}for(M in l)if(f=l[M],m=s[M],l.hasOwnProperty(M)&&(f!=null||m!=null))switch(M){case"value":pe=f;break;case"defaultValue":xe=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==m&&an(t,i,M,f,l,m)}ri(t,pe,xe);return;case"option":for(var ut in s)if(pe=s[ut],s.hasOwnProperty(ut)&&pe!=null&&!l.hasOwnProperty(ut))switch(ut){case"selected":t.selected=!1;break;default:an(t,i,ut,null,l,pe)}for(q in l)if(pe=l[q],xe=s[q],l.hasOwnProperty(q)&&pe!==xe&&(pe!=null||xe!=null))switch(q){case"selected":t.selected=pe&&typeof pe!="function"&&typeof pe!="symbol";break;default:an(t,i,q,pe,l,xe)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _t in s)pe=s[_t],s.hasOwnProperty(_t)&&pe!=null&&!l.hasOwnProperty(_t)&&an(t,i,_t,null,l,pe);for(he in l)if(pe=l[he],xe=s[he],l.hasOwnProperty(he)&&pe!==xe&&(pe!=null||xe!=null))switch(he){case"children":case"dangerouslySetInnerHTML":if(pe!=null)throw Error(a(137,i));break;default:an(t,i,he,pe,l,xe)}return;default:if(Bi(i)){for(var sn in s)pe=s[sn],s.hasOwnProperty(sn)&&pe!==void 0&&!l.hasOwnProperty(sn)&&zh(t,i,sn,void 0,l,pe);for(we in l)pe=l[we],xe=s[we],!l.hasOwnProperty(we)||pe===xe||pe===void 0&&xe===void 0||zh(t,i,we,pe,l,xe);return}}for(var ie in s)pe=s[ie],s.hasOwnProperty(ie)&&pe!=null&&!l.hasOwnProperty(ie)&&an(t,i,ie,null,l,pe);for(De in l)pe=l[De],xe=s[De],!l.hasOwnProperty(De)||pe===xe||pe==null&&xe==null||an(t,i,De,pe,l,xe)}function mv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function YS(){if(typeof performance.getEntriesByType=="function"){for(var t=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],m=f.transferSize,M=f.initiatorType,D=f.duration;if(m&&D&&mv(M)){for(M=0,D=f.responseEnd,l+=1;l<s.length;l++){var q=s[l],he=q.startTime;if(he>D)break;var we=q.transferSize,De=q.initiatorType;we&&mv(De)&&(q=q.responseEnd,M+=we*(q<D?1:(D-he)/(q-he)))}if(--l,i+=8*(m+M)/(f.duration/1e3),t++,10<t)break}}if(0<t)return i/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Fh=null,Bh=null;function Wc(t){return t.nodeType===9?t:t.ownerDocument}function gv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function vv(t,i){if(t===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&i==="foreignObject"?0:t}function Ih(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Hh=null;function ZS(){var t=window.event;return t&&t.type==="popstate"?t===Hh?!1:(Hh=t,!0):(Hh=null,!1)}var _v=typeof setTimeout=="function"?setTimeout:void 0,KS=typeof clearTimeout=="function"?clearTimeout:void 0,xv=typeof Promise=="function"?Promise:void 0,QS=typeof queueMicrotask=="function"?queueMicrotask:typeof xv<"u"?function(t){return xv.resolve(null).then(t).catch(JS)}:_v;function JS(t){setTimeout(function(){throw t})}function Es(t){return t==="head"}function yv(t,i){var s=i,l=0;do{var f=s.nextSibling;if(t.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){t.removeChild(f),jr(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")ll(t.ownerDocument.documentElement);else if(s==="head"){s=t.ownerDocument.head,ll(s);for(var m=s.firstChild;m;){var M=m.nextSibling,D=m.nodeName;m[ua]||D==="SCRIPT"||D==="STYLE"||D==="LINK"&&m.rel.toLowerCase()==="stylesheet"||s.removeChild(m),m=M}}else s==="body"&&ll(t.ownerDocument.body);s=f}while(s);jr(i)}function Sv(t,i){var s=t;t=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(t===0)break;t--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||t++;s=l}while(s)}function Gh(t){var i=t.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Gh(s),fa(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}t.removeChild(s)}}function jS(t,i,s,l){for(;t.nodeType===1;){var f=s;if(t.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[ua])switch(i){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(m=t.getAttribute("rel"),m==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(m!==f.rel||t.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||t.getAttribute("title")!==(f.title==null?null:f.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(m=t.getAttribute("src"),(m!==(f.src==null?null:f.src)||t.getAttribute("type")!==(f.type==null?null:f.type)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&m&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(i==="input"&&t.type==="hidden"){var m=f.name==null?null:""+f.name;if(f.type==="hidden"&&t.getAttribute("name")===m)return t}else return t;if(t=qi(t.nextSibling),t===null)break}return null}function $S(t,i,s){if(i==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!s||(t=qi(t.nextSibling),t===null))return null;return t}function Mv(t,i){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!i||(t=qi(t.nextSibling),t===null))return null;return t}function Vh(t){return t.data==="$?"||t.data==="$~"}function kh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function e1(t,i){var s=t.ownerDocument;if(t.data==="$~")t._reactRetry=i;else if(t.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function qi(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return t}var Wh=null;function bv(t){t=t.nextSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="/$"||s==="/&"){if(i===0)return qi(t.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}t=t.nextSibling}return null}function Ev(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return t;i--}else s!=="/$"&&s!=="/&"||i++}t=t.previousSibling}return null}function wv(t,i,s){switch(i=Wc(s),t){case"html":if(t=i.documentElement,!t)throw Error(a(452));return t;case"head":if(t=i.head,!t)throw Error(a(453));return t;case"body":if(t=i.body,!t)throw Error(a(454));return t;default:throw Error(a(451))}}function ll(t){for(var i=t.attributes;i.length;)t.removeAttributeNode(i[0]);fa(t)}var Yi=new Map,Tv=new Set;function Xc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Wa=k.d;k.d={f:t1,r:n1,D:i1,C:a1,L:s1,m:r1,X:l1,S:o1,M:c1};function t1(){var t=Wa.f(),i=zc();return t||i}function n1(t){var i=be(t);i!==null&&i.tag===5&&i.type==="form"?km(i):Wa.r(t)}var Kr=typeof document>"u"?null:document;function Av(t,i,s){var l=Kr;if(l&&typeof i=="string"&&i){var f=Rt(i);f='link[rel="'+t+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),Tv.has(f)||(Tv.add(f),t={rel:t,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),Yn(i,"link",t),gt(i),l.head.appendChild(i)))}}function i1(t){Wa.D(t),Av("dns-prefetch",t,null)}function a1(t,i){Wa.C(t,i),Av("preconnect",t,i)}function s1(t,i,s){Wa.L(t,i,s);var l=Kr;if(l&&t&&i){var f='link[rel="preload"][as="'+Rt(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+Rt(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+Rt(s.imageSizes)+'"]')):f+='[href="'+Rt(t)+'"]';var m=f;switch(i){case"style":m=Qr(t);break;case"script":m=Jr(t)}Yi.has(m)||(t=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:t,as:i},s),Yi.set(m,t),l.querySelector(f)!==null||i==="style"&&l.querySelector(cl(m))||i==="script"&&l.querySelector(ul(m))||(i=l.createElement("link"),Yn(i,"link",t),gt(i),l.head.appendChild(i)))}}function r1(t,i){Wa.m(t,i);var s=Kr;if(s&&t){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+Rt(l)+'"][href="'+Rt(t)+'"]',m=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":m=Jr(t)}if(!Yi.has(m)&&(t=_({rel:"modulepreload",href:t},i),Yi.set(m,t),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(ul(m)))return}l=s.createElement("link"),Yn(l,"link",t),gt(l),s.head.appendChild(l)}}}function o1(t,i,s){Wa.S(t,i,s);var l=Kr;if(l&&t){var f=dt(l).hoistableStyles,m=Qr(t);i=i||"default";var M=f.get(m);if(!M){var D={loading:0,preload:null};if(M=l.querySelector(cl(m)))D.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":i},s),(s=Yi.get(m))&&Xh(t,s);var q=M=l.createElement("link");gt(q),Yn(q,"link",t),q._p=new Promise(function(he,we){q.onload=he,q.onerror=we}),q.addEventListener("load",function(){D.loading|=1}),q.addEventListener("error",function(){D.loading|=2}),D.loading|=4,qc(M,i,l)}M={type:"stylesheet",instance:M,count:1,state:D},f.set(m,M)}}}function l1(t,i){Wa.X(t,i);var s=Kr;if(s&&t){var l=dt(s).hoistableScripts,f=Jr(t),m=l.get(f);m||(m=s.querySelector(ul(f)),m||(t=_({src:t,async:!0},i),(i=Yi.get(f))&&qh(t,i),m=s.createElement("script"),gt(m),Yn(m,"link",t),s.head.appendChild(m)),m={type:"script",instance:m,count:1,state:null},l.set(f,m))}}function c1(t,i){Wa.M(t,i);var s=Kr;if(s&&t){var l=dt(s).hoistableScripts,f=Jr(t),m=l.get(f);m||(m=s.querySelector(ul(f)),m||(t=_({src:t,async:!0,type:"module"},i),(i=Yi.get(f))&&qh(t,i),m=s.createElement("script"),gt(m),Yn(m,"link",t),s.head.appendChild(m)),m={type:"script",instance:m,count:1,state:null},l.set(f,m))}}function Rv(t,i,s,l){var f=(f=Ke.current)?Xc(f):null;if(!f)throw Error(a(446));switch(t){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Qr(s.href),s=dt(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){t=Qr(s.href);var m=dt(f).hoistableStyles,M=m.get(t);if(M||(f=f.ownerDocument||f,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},m.set(t,M),(m=f.querySelector(cl(t)))&&!m._p&&(M.instance=m,M.state.loading=5),Yi.has(t)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Yi.set(t,s),m||u1(f,t,s,M.state))),i&&l===null)throw Error(a(528,""));return M}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Jr(s),s=dt(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,t))}}function Qr(t){return'href="'+Rt(t)+'"'}function cl(t){return'link[rel="stylesheet"]['+t+"]"}function Cv(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function u1(t,i,s,l){t.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=t.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Yn(i,"link",s),gt(i),t.head.appendChild(i))}function Jr(t){return'[src="'+Rt(t)+'"]'}function ul(t){return"script[async]"+t}function Dv(t,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=t.querySelector('style[data-href~="'+Rt(s.href)+'"]');if(l)return i.instance=l,gt(l),l;var f=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),gt(l),Yn(l,"style",f),qc(l,s.precedence,t),i.instance=l;case"stylesheet":f=Qr(s.href);var m=t.querySelector(cl(f));if(m)return i.state.loading|=4,i.instance=m,gt(m),m;l=Cv(s),(f=Yi.get(f))&&Xh(l,f),m=(t.ownerDocument||t).createElement("link"),gt(m);var M=m;return M._p=new Promise(function(D,q){M.onload=D,M.onerror=q}),Yn(m,"link",l),i.state.loading|=4,qc(m,s.precedence,t),i.instance=m;case"script":return m=Jr(s.src),(f=t.querySelector(ul(m)))?(i.instance=f,gt(f),f):(l=s,(f=Yi.get(m))&&(l=_({},s),qh(l,f)),t=t.ownerDocument||t,f=t.createElement("script"),gt(f),Yn(f,"link",l),t.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,qc(l,s.precedence,t));return i.instance}function qc(t,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,m=f,M=0;M<l.length;M++){var D=l[M];if(D.dataset.precedence===i)m=D;else if(m!==f)break}m?m.parentNode.insertBefore(t,m.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(t,i.firstChild))}function Xh(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.title==null&&(t.title=i.title)}function qh(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.integrity==null&&(t.integrity=i.integrity)}var Yc=null;function Uv(t,i,s){if(Yc===null){var l=new Map,f=Yc=new Map;f.set(s,l)}else f=Yc,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(t))return l;for(l.set(t,null),s=s.getElementsByTagName(t),f=0;f<s.length;f++){var m=s[f];if(!(m[ua]||m[gn]||t==="link"&&m.getAttribute("rel")==="stylesheet")&&m.namespaceURI!=="http://www.w3.org/2000/svg"){var M=m.getAttribute(i)||"";M=t+M;var D=l.get(M);D?D.push(m):l.set(M,[m])}}return l}function Lv(t,i,s){t=t.ownerDocument||t,t.head.insertBefore(s,i==="title"?t.querySelector("head > title"):null)}function f1(t,i,s){if(s===1||i.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return t=i.disabled,typeof i.precedence=="string"&&t==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Nv(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function h1(t,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=Qr(l.href),m=i.querySelector(cl(f));if(m){i=m._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(t.count++,t=Zc.bind(t),i.then(t,t)),s.state.loading|=4,s.instance=m,gt(m);return}m=i.ownerDocument||i,l=Cv(l),(f=Yi.get(f))&&Xh(l,f),m=m.createElement("link"),gt(m);var M=m;M._p=new Promise(function(D,q){M.onload=D,M.onerror=q}),Yn(m,"link",l),s.instance=m}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(t.count++,s=Zc.bind(t),i.addEventListener("load",s),i.addEventListener("error",s))}}var Yh=0;function d1(t,i){return t.stylesheets&&t.count===0&&Qc(t,t.stylesheets),0<t.count||0<t.imgCount?function(s){var l=setTimeout(function(){if(t.stylesheets&&Qc(t,t.stylesheets),t.unsuspend){var m=t.unsuspend;t.unsuspend=null,m()}},6e4+i);0<t.imgBytes&&Yh===0&&(Yh=62500*YS());var f=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Qc(t,t.stylesheets),t.unsuspend)){var m=t.unsuspend;t.unsuspend=null,m()}},(t.imgBytes>Yh?50:800)+i);return t.unsuspend=s,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function Zc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Qc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Kc=null;function Qc(t,i){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Kc=new Map,i.forEach(p1,t),Kc=null,Zc.call(t))}function p1(t,i){if(!(i.state.loading&4)){var s=Kc.get(t);if(s)var l=s.get(null);else{s=new Map,Kc.set(t,s);for(var f=t.querySelectorAll("link[data-precedence],style[data-precedence]"),m=0;m<f.length;m++){var M=f[m];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(s.set(M.dataset.precedence,M),l=M)}l&&s.set(null,l)}f=i.instance,M=f.getAttribute("data-precedence"),m=s.get(M)||l,m===l&&s.set(null,f),s.set(M,f),this.count++,l=Zc.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),m?m.parentNode.insertBefore(f,m.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(f,t.firstChild)),i.state.loading|=4}}var fl={$$typeof:z,Provider:null,Consumer:null,_currentValue:ne,_currentValue2:ne,_threadCount:0};function m1(t,i,s,l,f,m,M,D,q){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=lt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=lt(0),this.hiddenUpdates=lt(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=m,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=q,this.incompleteTransitions=new Map}function Pv(t,i,s,l,f,m,M,D,q,he,we,De){return t=new m1(t,i,s,M,q,he,we,De,D),i=1,m===!0&&(i|=24),m=wi(3,null,null,i),t.current=m,m.stateNode=t,i=Tf(),i.refCount++,t.pooledCache=i,i.refCount++,m.memoizedState={element:l,isDehydrated:s,cache:i},Df(m),t}function Ov(t){return t?(t=Rr,t):Rr}function zv(t,i,s,l,f,m){f=Ov(f),l.context===null?l.context=f:l.pendingContext=f,l=ds(i),l.payload={element:s},m=m===void 0?null:m,m!==null&&(l.callback=m),s=ps(t,l,i),s!==null&&(xi(s,t,i),ko(s,t,i))}function Fv(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var s=t.retryLane;t.retryLane=s!==0&&s<i?s:i}}function Zh(t,i){Fv(t,i),(t=t.alternate)&&Fv(t,i)}function Bv(t){if(t.tag===13||t.tag===31){var i=Vs(t,67108864);i!==null&&xi(i,t,67108864),Zh(t,67108864)}}function Iv(t){if(t.tag===13||t.tag===31){var i=Di();i=ss(i);var s=Vs(t,i);s!==null&&xi(s,t,i),Zh(t,i)}}var Jc=!0;function g1(t,i,s,l){var f=P.T;P.T=null;var m=k.p;try{k.p=2,Kh(t,i,s,l)}finally{k.p=m,P.T=f}}function v1(t,i,s,l){var f=P.T;P.T=null;var m=k.p;try{k.p=8,Kh(t,i,s,l)}finally{k.p=m,P.T=f}}function Kh(t,i,s,l){if(Jc){var f=Qh(l);if(f===null)Oh(t,i,l,jc,s),Gv(t,l);else if(x1(f,t,i,s,l))l.stopPropagation();else if(Gv(t,l),i&4&&-1<_1.indexOf(t)){for(;f!==null;){var m=be(f);if(m!==null)switch(m.tag){case 3:if(m=m.stateNode,m.current.memoizedState.isDehydrated){var M=Ge(m.pendingLanes);if(M!==0){var D=m;for(D.pendingLanes|=2,D.entangledLanes|=2;M;){var q=1<<31-Je(M);D.entanglements[1]|=q,M&=~q}ga(m),(Kt&6)===0&&(Pc=mt()+500,sl(0))}}break;case 31:case 13:D=Vs(m,2),D!==null&&xi(D,m,2),zc(),Zh(m,2)}if(m=Qh(l),m===null&&Oh(t,i,l,jc,s),m===f)break;f=m}f!==null&&l.stopPropagation()}else Oh(t,i,l,null,s)}}function Qh(t){return t=Ju(t),Jh(t)}var jc=null;function Jh(t){if(jc=null,t=Ce(t),t!==null){var i=c(t);if(i===null)t=null;else{var s=i.tag;if(s===13){if(t=u(i),t!==null)return t;t=null}else if(s===31){if(t=h(i),t!==null)return t;t=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null)}}return jc=t,null}function Hv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case I:return 2;case w:return 8;case te:case ce:return 32;case _e:return 268435456;default:return 32}default:return 32}}var jh=!1,ws=null,Ts=null,As=null,hl=new Map,dl=new Map,Rs=[],_1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Gv(t,i){switch(t){case"focusin":case"focusout":ws=null;break;case"dragenter":case"dragleave":Ts=null;break;case"mouseover":case"mouseout":As=null;break;case"pointerover":case"pointerout":hl.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":dl.delete(i.pointerId)}}function pl(t,i,s,l,f,m){return t===null||t.nativeEvent!==m?(t={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:m,targetContainers:[f]},i!==null&&(i=be(i),i!==null&&Bv(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),t)}function x1(t,i,s,l,f){switch(i){case"focusin":return ws=pl(ws,t,i,s,l,f),!0;case"dragenter":return Ts=pl(Ts,t,i,s,l,f),!0;case"mouseover":return As=pl(As,t,i,s,l,f),!0;case"pointerover":var m=f.pointerId;return hl.set(m,pl(hl.get(m)||null,t,i,s,l,f)),!0;case"gotpointercapture":return m=f.pointerId,dl.set(m,pl(dl.get(m)||null,t,i,s,l,f)),!0}return!1}function Vv(t){var i=Ce(t.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){t.blockedOn=i,la(t.priority,function(){Iv(s)});return}}else if(i===31){if(i=h(s),i!==null){t.blockedOn=i,la(t.priority,function(){Iv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){t.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}t.blockedOn=null}function $c(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var s=Qh(t.nativeEvent);if(s===null){s=t.nativeEvent;var l=new s.constructor(s.type,s);Qu=l,s.target.dispatchEvent(l),Qu=null}else return i=be(s),i!==null&&Bv(i),t.blockedOn=s,!1;i.shift()}return!0}function kv(t,i,s){$c(t)&&s.delete(i)}function y1(){jh=!1,ws!==null&&$c(ws)&&(ws=null),Ts!==null&&$c(Ts)&&(Ts=null),As!==null&&$c(As)&&(As=null),hl.forEach(kv),dl.forEach(kv)}function eu(t,i){t.blockedOn===i&&(t.blockedOn=null,jh||(jh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,y1)))}var tu=null;function Wv(t){tu!==t&&(tu=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){tu===t&&(tu=null);for(var i=0;i<t.length;i+=3){var s=t[i],l=t[i+1],f=t[i+2];if(typeof l!="function"){if(Jh(l||s)===null)continue;break}var m=be(s);m!==null&&(t.splice(i,3),i-=3,Qf(m,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function jr(t){function i(q){return eu(q,t)}ws!==null&&eu(ws,t),Ts!==null&&eu(Ts,t),As!==null&&eu(As,t),hl.forEach(i),dl.forEach(i);for(var s=0;s<Rs.length;s++){var l=Rs[s];l.blockedOn===t&&(l.blockedOn=null)}for(;0<Rs.length&&(s=Rs[0],s.blockedOn===null);)Vv(s),s.blockedOn===null&&Rs.shift();if(s=(t.ownerDocument||t).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],m=s[l+1],M=f[Ln]||null;if(typeof m=="function")M||Wv(s);else if(M){var D=null;if(m&&m.hasAttribute("formAction")){if(f=m,M=m[Ln]||null)D=M.formAction;else if(Jh(f)!==null)continue}else D=M.action;typeof D=="function"?s[l+1]=D:(s.splice(l,3),l-=3),Wv(s)}}}function Xv(){function t(m){m.canIntercept&&m.info==="react-transition"&&m.intercept({handler:function(){return new Promise(function(M){return f=M})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var m=navigation.currentEntry;m&&m.url!=null&&navigation.navigate(m.url,{state:m.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function $h(t){this._internalRoot=t}nu.prototype.render=$h.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=Di();zv(s,l,t,i,null,null)},nu.prototype.unmount=$h.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;zv(t.current,2,null,t,null,null),zc(),i[Qn]=null}};function nu(t){this._internalRoot=t}nu.prototype.unstable_scheduleHydration=function(t){if(t){var i=si();t={blockedOn:null,target:t,priority:i};for(var s=0;s<Rs.length&&i!==0&&i<Rs[s].priority;s++);Rs.splice(s,0,t),s===0&&Vv(t)}};var qv=e.version;if(qv!=="19.2.7")throw Error(a(527,qv,"19.2.7"));k.findDOMNode=function(t){var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(a(188)):(t=Object.keys(t).join(","),Error(a(268,t)));return t=p(i),t=t!==null?g(t):null,t=t===null?null:t.stateNode,t};var S1={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var iu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!iu.isDisabled&&iu.supportsFiber)try{ge=iu.inject(S1),Se=iu}catch{}}return gl.createRoot=function(t,i){if(!o(t))throw Error(a(299));var s=!1,l="",f=$m,m=eg,M=tg;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(m=i.onCaughtError),i.onRecoverableError!==void 0&&(M=i.onRecoverableError)),i=Pv(t,1,!1,null,null,s,l,null,f,m,M,Xv),t[Qn]=i.current,Ph(t),new $h(i)},gl.hydrateRoot=function(t,i,s){if(!o(t))throw Error(a(299));var l=!1,f="",m=$m,M=eg,D=tg,q=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(m=s.onUncaughtError),s.onCaughtError!==void 0&&(M=s.onCaughtError),s.onRecoverableError!==void 0&&(D=s.onRecoverableError),s.formState!==void 0&&(q=s.formState)),i=Pv(t,1,!0,i,s??null,l,f,q,m,M,D,Xv),i.context=Ov(null),s=i.current,l=Di(),l=ss(l),f=ds(l),f.callback=null,ps(s,f,l),s=l,i.current.lanes=s,it(i,s),ga(i),t[Qn]=i.current,Ph(t),new nu(i)},gl.version="19.2.7",gl}var n_;function N1(){if(n_)return nd.exports;n_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),nd.exports=L1(),nd.exports}var P1=N1();function O1(r){const[e,n]=fi.useState(!1);return fi.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>n(r&&!document.hidden&&!a.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(o);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),a.addEventListener("change",o),document.addEventListener("visibilitychange",o),o(),()=>{c.disconnect(),a.removeEventListener("change",o),document.removeEventListener("visibilitychange",o)}},[r]),e}function z1(r,e,n,a){fi.useEffect(()=>{var _;const o=e.current,c=n.current;if(!a||!o||!c)return;const u=((_=o.parentElement)==null?void 0:_.closest("[data-scene-surface]"))??o.closest("[data-scene-surface]")??o;let h=null;const d=v=>{if(!h||v.pointerId!==h.id)return;const x=Math.max(1,Math.min(u.clientWidth,u.clientHeight));r.drag(c,(v.clientX-h.x)/x,(v.clientY-h.y)/x)},p=v=>{!h||v&&v.pointerId!==h.id||(h=null,delete o.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",d),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p))},g=v=>{if(h||!v.isPrimary||v.button!==0)return;const x=v.target instanceof Element?v.target:null;!x||!(o.contains(x)||x.hasAttribute("data-scene-drag"))||(v.pointerType==="mouse"&&v.preventDefault(),h={id:v.pointerId,x:v.clientX,y:v.clientY},o.dataset.look="drag",window.addEventListener("pointermove",d),window.addEventListener("pointerup",p),window.addEventListener("pointercancel",p))};return u.addEventListener("pointerdown",g),()=>{u.removeEventListener("pointerdown",g),p()}},[a,r,e,n])}class F1{constructor(e){this.options=e,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null,this.disposalEvidence=new WeakMap}acquire(e){return window.clearTimeout(this.disposeTimer),this.holders.push(e),this.ensureEngine(),this.attachTop(),e.onStatus(this.status),()=>this.release(e)}setRunning(e,n){e.running=n,this.top===e&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(e){}drag(e,n,a){var o,c;this.top===e&&((c=(o=this.engine)==null?void 0:o.drag)==null||c.call(o,n,a))}releaseDrag(e){var n,a;this.top===e&&((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n))}release(e){var a,o;if(this.holders=this.holders.filter(c=>c!==e),this.holders.length){this.attachTop();return}(a=this.engine)==null||a.stop(),this.observe(null),(o=this.canvas)==null||o.remove();const n=this.options.disposeDelayMs??5e3;n<=0?this.teardown():this.disposeTimer=window.setTimeout(()=>this.teardown(),n)}setStatus(e){this.status=e;for(const n of this.holders)n.onStatus(e)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const e=document.createElement("canvas");e.className=this.options.canvasClass,e.setAttribute("aria-hidden","true"),this.canvas=e;let n;try{n=this.options.create(e,()=>{this.canvas===e&&this.fail()})}catch{this.canvas===e&&this.fail();return}if(this.canvas!==e){this.disposeEngine(n,e);return}this.engine=n;try{this.setStatus("loading"),this.configure(n),this.resize(),n.init().then(()=>{this.engine===n&&(n.renderFrame(0),this.engine===n&&(this.setStatus("ready"),this.applyRunning()))}).catch(()=>{this.engine===n&&this.fail()})}catch{this.engine===n&&this.fail()}}attachTop(){var n,a;const e=this.top;!e||!this.canvas||((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n),this.canvas.parentElement!==e.mount&&e.mount.appendChild(this.canvas),this.observe(e.mount),this.resize(),this.applyRunning())}observe(e){var n;this.observed!==e&&((n=this.observer)==null||n.disconnect(),this.observed=e,e&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(e)))}resize(){var o,c;const e=(o=this.top)==null?void 0:o.mount;if(!e||!this.engine)return;const n=e.clientWidth||window.innerWidth,a=e.clientHeight||window.innerHeight;this.engine.setSize(n,a,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var e;!this.engine||this.status!=="ready"||((e=this.top)!=null&&e.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}disposeEngine(e,n){const a=this.disposalEvidence.get(e)??{attempts:0,returned:0,phase:"attempting",attemptedAtMs:0,diagnosticsStatus:"absent"};this.disposalEvidence.set(e,a);const o=()=>{try{n&&(n.dataset.liveSceneDisposal=JSON.stringify(a))}catch{}};a.attempts++,a.attemptedAtMs=performance.now(),a.phase="attempting",a.diagnosticsStatus="absent",delete a.diagnostics,delete a.error,delete a.diagnosticsError,o();try{e.dispose()}catch(c){throw a.phase="threw",a.error=!0,a.threwAtMs=performance.now(),o(),c}a.returned++,a.returnedAtMs=performance.now(),a.phase="returned",o();try{const c=e.diagnostics;if(typeof c=="function"){const u=JSON.stringify(c.call(e));if(typeof u!="string")throw new Error("Diagnostics are not JSON data");a.diagnostics=JSON.parse(u),a.diagnosticsStatus="captured"}}catch{a.diagnosticsStatus="failed",a.diagnosticsError=!0}o()}teardown(){window.clearTimeout(this.disposeTimer),this.observe(null);const e=this.engine,n=this.canvas;this.engine=null,this.canvas=null,n==null||n.remove(),e&&this.disposeEngine(e,n),this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ip="186",B1=0,i_=1,I1=2,Cl=1,H1=2,Tl=3,zs=0,Gn=1,di=2,ns=0,Dl=1,Fl=2,a_=3,s_=4,G1=5,po=100,V1=101,k1=102,W1=103,X1=104,q1=200,Y1=201,Z1=202,K1=203,Ex=204,wx=205,Q1=206,J1=207,j1=208,$1=209,eM=210,tM=211,nM=212,iM=213,aM=214,Xd=0,qd=1,Yd=2,Bl=3,Zd=4,Kd=5,Qd=6,Jd=7,Tx=0,sM=1,rM=2,Ma=0,Ax=1,Rx=2,Cx=3,Hp=4,Dx=5,Ux=6,Lx=7,Nx=300,hr=301,So=302,rd=303,od=304,ql=306,zu=1e3,Ni=1001,jd=1002,Zn=1003,oM=1004,au=1005,mn=1006,ld=1007,ya=1008,wn=1009,Px=1010,Ox=1011,Il=1012,Gp=1013,zi=1014,Pi=1015,yn=1016,Vp=1017,kp=1018,Hl=1020,zx=35902,Fx=35899,Bx=1021,Ix=1022,Oi=1023,Ea=1026,cr=1027,Wp=1028,Xp=1029,dr=1030,qp=1031,Yp=1033,Du=33776,Uu=33777,Lu=33778,Nu=33779,$d=35840,ep=35841,tp=35842,np=35843,ip=36196,ap=37492,sp=37496,rp=37488,op=37489,Fu=37490,lp=37491,cp=37808,up=37809,fp=37810,hp=37811,dp=37812,pp=37813,mp=37814,gp=37815,vp=37816,_p=37817,xp=37818,yp=37819,Sp=37820,Mp=37821,bp=36492,Ep=36494,wp=36495,Tp=36283,Ap=36284,Bu=36285,Rp=36286,lM=3200,Cp=0,cM=1,ja="",yi="srgb",Mo="srgb-linear",Iu="linear",en="srgb",cd=7680,uM=519,fM=512,hM=513,dM=514,Wu=515,pM=516,mM=517,Zp=518,gM=519,vM=35044,r_="300 es",Sa=2e3,Gl=2001;function _M(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Hu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function xM(){const r=Hu("canvas");return r.style.display="block",r}const o_={};function l_(...r){const e="THREE."+r.shift();console.log(e,...r)}function Hx(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function St(...r){r=Hx(r);const e="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...r)}}function It(...r){r=Hx(r);const e="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...r)}}function xo(...r){const e=r.join(" ");e in o_||(o_[e]=!0,St(...r))}function yM(r,e,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const SM={[Xd]:qd,[Yd]:Qd,[Zd]:Jd,[Bl]:Kd,[qd]:Xd,[Qd]:Yd,[Jd]:Zd,[Kd]:Bl};class gr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(n)===-1&&a[e].push(n)}hasEventListener(e,n){const a=this._listeners;return a===void 0?!1:a[e]!==void 0&&a[e].indexOf(n)!==-1}removeEventListener(e,n){const a=this._listeners;if(a===void 0)return;const o=a[e];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const a=n[e.type];if(a!==void 0){e.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,e);e.target=null}}}const jn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let c_=1234567;const Ul=Math.PI/180,bo=180/Math.PI;function vr(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(jn[r&255]+jn[r>>8&255]+jn[r>>16&255]+jn[r>>24&255]+"-"+jn[e&255]+jn[e>>8&255]+"-"+jn[e>>16&15|64]+jn[e>>24&255]+"-"+jn[n&63|128]+jn[n>>8&255]+"-"+jn[n>>16&255]+jn[n>>24&255]+jn[a&255]+jn[a>>8&255]+jn[a>>16&255]+jn[a>>24&255]).toLowerCase()}function At(r,e,n){return Math.max(e,Math.min(n,r))}function Kp(r,e){return(r%e+e)%e}function MM(r,e,n,a,o){return a+(r-e)*(o-a)/(n-e)}function bM(r,e,n){return r!==e?(n-r)/(e-r):0}function Ll(r,e,n){return(1-n)*r+n*e}function EM(r,e,n,a){return Ll(r,e,1-Math.exp(-n*a))}function wM(r,e=1){return e-Math.abs(Kp(r,e*2)-e)}function TM(r,e,n){return r<=e?0:r>=n?1:(r=(r-e)/(n-e),r*r*(3-2*r))}function AM(r,e,n){return r<=e?0:r>=n?1:(r=(r-e)/(n-e),r*r*r*(r*(r*6-15)+10))}function RM(r,e){return r+Math.floor(Math.random()*(e-r+1))}function CM(r,e){return r+Math.random()*(e-r)}function DM(r){return r*(.5-Math.random())}function UM(r){r!==void 0&&(c_=r);let e=c_+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function LM(r){return r*Ul}function NM(r){return r*bo}function PM(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function OM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function zM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function FM(r,e,n,a,o){const c=Math.cos,u=Math.sin,h=c(n/2),d=u(n/2),p=c((e+a)/2),g=u((e+a)/2),_=c((e-a)/2),v=u((e-a)/2),x=c((a-e)/2),b=u((a-e)/2);switch(o){case"XYX":r.set(h*g,d*_,d*v,h*p);break;case"YZY":r.set(d*v,h*g,d*_,h*p);break;case"ZXZ":r.set(d*_,d*v,h*g,h*p);break;case"XZX":r.set(h*g,d*b,d*x,h*p);break;case"YXY":r.set(d*x,h*g,d*b,h*p);break;case"ZYZ":r.set(d*b,d*x,h*g,h*p);break;default:St("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function mo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ci(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Gx={DEG2RAD:Ul,RAD2DEG:bo,generateUUID:vr,clamp:At,euclideanModulo:Kp,mapLinear:MM,inverseLerp:bM,lerp:Ll,damp:EM,pingpong:wM,smoothstep:TM,smootherstep:AM,randInt:RM,randFloat:CM,randFloatSpread:DM,seededRandom:UM,degToRad:LM,radToDeg:NM,isPowerOfTwo:PM,ceilPowerOfTwo:OM,floorPowerOfTwo:zM,setQuaternionFromProperEuler:FM,normalize:ci,denormalize:mo},u0=class u0{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,a=this.y,o=e.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=At(this.x,e.x,n.x),this.y=At(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=At(this.x,e,n),this.y=At(this.y,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(At(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(e)/n;return Math.acos(At(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,a=this.y-e.y;return n*n+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-e.x,u=this.y-e.y;return this.x=c*a-u*o+e.x,this.y=c*o+u*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};u0.prototype.isVector2=!0;let Pe=u0;class _r{constructor(e=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=a,this._w=o}static slerpFlat(e,n,a,o,c,u,h){let d=a[o+0],p=a[o+1],g=a[o+2],_=a[o+3],v=c[u+0],x=c[u+1],b=c[u+2],A=c[u+3];if(_!==A||d!==v||p!==x||g!==b){let S=d*v+p*x+g*b+_*A;S<0&&(v=-v,x=-x,b=-b,A=-A,S=-S);let y=1-h;if(S<.9995){const C=Math.acos(S),z=Math.sin(C);y=Math.sin(y*C)/z,h=Math.sin(h*C)/z,d=d*y+v*h,p=p*y+x*h,g=g*y+b*h,_=_*y+A*h}else{d=d*y+v*h,p=p*y+x*h,g=g*y+b*h,_=_*y+A*h;const C=1/Math.sqrt(d*d+p*p+g*g+_*_);d*=C,p*=C,g*=C,_*=C}}e[n]=d,e[n+1]=p,e[n+2]=g,e[n+3]=_}static multiplyQuaternionsFlat(e,n,a,o,c,u){const h=a[o],d=a[o+1],p=a[o+2],g=a[o+3],_=c[u],v=c[u+1],x=c[u+2],b=c[u+3];return e[n]=h*b+g*_+d*x-p*v,e[n+1]=d*b+g*v+p*_-h*x,e[n+2]=p*b+g*x+h*v-d*_,e[n+3]=g*b-h*_-d*v-p*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,a,o){return this._x=e,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const a=e._x,o=e._y,c=e._z,u=e._order,h=Math.cos,d=Math.sin,p=h(a/2),g=h(o/2),_=h(c/2),v=d(a/2),x=d(o/2),b=d(c/2);switch(u){case"XYZ":this._x=v*g*_+p*x*b,this._y=p*x*_-v*g*b,this._z=p*g*b+v*x*_,this._w=p*g*_-v*x*b;break;case"YXZ":this._x=v*g*_+p*x*b,this._y=p*x*_-v*g*b,this._z=p*g*b-v*x*_,this._w=p*g*_+v*x*b;break;case"ZXY":this._x=v*g*_-p*x*b,this._y=p*x*_+v*g*b,this._z=p*g*b+v*x*_,this._w=p*g*_-v*x*b;break;case"ZYX":this._x=v*g*_-p*x*b,this._y=p*x*_+v*g*b,this._z=p*g*b-v*x*_,this._w=p*g*_+v*x*b;break;case"YZX":this._x=v*g*_+p*x*b,this._y=p*x*_+v*g*b,this._z=p*g*b-v*x*_,this._w=p*g*_-v*x*b;break;case"XZY":this._x=v*g*_-p*x*b,this._y=p*x*_-v*g*b,this._z=p*g*b+v*x*_,this._w=p*g*_+v*x*b;break;default:St("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const a=n/2,o=Math.sin(a);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,a=n[0],o=n[4],c=n[8],u=n[1],h=n[5],d=n[9],p=n[2],g=n[6],_=n[10],v=a+h+_;if(v>0){const x=.5/Math.sqrt(v+1);this._w=.25/x,this._x=(g-d)*x,this._y=(c-p)*x,this._z=(u-o)*x}else if(a>h&&a>_){const x=2*Math.sqrt(1+a-h-_);this._w=(g-d)/x,this._x=.25*x,this._y=(o+u)/x,this._z=(c+p)/x}else if(h>_){const x=2*Math.sqrt(1+h-a-_);this._w=(c-p)/x,this._x=(o+u)/x,this._y=.25*x,this._z=(d+g)/x}else{const x=2*Math.sqrt(1+_-a-h);this._w=(u-o)/x,this._x=(c+p)/x,this._y=(d+g)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let a=e.dot(n)+1;return a<1e-8?(a=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=a):(this._x=0,this._y=-e.z,this._z=e.y,this._w=a)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=a),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,n){const a=this.angleTo(e);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const a=e._x,o=e._y,c=e._z,u=e._w,h=n._x,d=n._y,p=n._z,g=n._w;return this._x=a*g+u*h+o*p-c*d,this._y=o*g+u*d+c*h-a*p,this._z=c*g+u*p+a*d-o*h,this._w=u*g-a*h-o*d-c*p,this._onChangeCallback(),this}slerp(e,n){let a=e._x,o=e._y,c=e._z,u=e._w,h=this.dot(e);h<0&&(a=-a,o=-o,c=-c,u=-u,h=-h);let d=1-n;if(h<.9995){const p=Math.acos(h),g=Math.sin(p);d=Math.sin(d*p)/g,n=Math.sin(n*p)/g,this._x=this._x*d+a*n,this._y=this._y*d+o*n,this._z=this._z*d+c*n,this._w=this._w*d+u*n,this._onChangeCallback()}else this._x=this._x*d+a*n,this._y=this._y*d+o*n,this._z=this._z*d+c*n,this._w=this._w*d+u*n,this.normalize();return this}slerpQuaternions(e,n,a){return this.copy(e).slerp(n,a)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(e),o*Math.cos(e),c*Math.sin(n),c*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const f0=class f0{constructor(e=0,n=0,a=0){this.x=e,this.y=n,this.z=a}set(e,n,a){return a===void 0&&(a=this.z),this.x=e,this.y=n,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(u_.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(u_.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,a=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,a=this.y,o=this.z,c=e.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(e){const n=this.x,a=this.y,o=this.z,c=e.x,u=e.y,h=e.z,d=e.w,p=2*(u*o-h*a),g=2*(h*n-c*o),_=2*(c*a-u*n);return this.x=n+d*p+u*_-h*g,this.y=a+d*g+h*p-c*_,this.z=o+d*_+c*g-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,a=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=At(this.x,e.x,n.x),this.y=At(this.y,e.y,n.y),this.z=At(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=At(this.x,e,n),this.y=At(this.y,e,n),this.z=At(this.z,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(At(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this.z=e.z+(n.z-e.z)*a,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const a=e.x,o=e.y,c=e.z,u=n.x,h=n.y,d=n.z;return this.x=o*d-c*h,this.y=c*u-a*d,this.z=a*h-o*u,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const a=e.dot(this)/n;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return ud.copy(this).projectOnVector(e),this.sub(ud)}reflect(e){return this.sub(ud.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(e)/n;return Math.acos(At(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,a=this.y-e.y,o=this.z-e.z;return n*n+a*a+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,a){const o=Math.sin(n)*e;return this.x=o*Math.sin(a),this.y=Math.cos(n)*e,this.z=o*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,a){return this.x=e*Math.sin(n),this.y=a,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(e),this.y=n,this.z=a*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};f0.prototype.isVector3=!0;let V=f0;const ud=new V,u_=new _r,h0=class h0{constructor(e,n,a,o,c,u,h,d,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,a,o,c,u,h,d,p)}set(e,n,a,o,c,u,h,d,p){const g=this.elements;return g[0]=e,g[1]=o,g[2]=h,g[3]=n,g[4]=c,g[5]=d,g[6]=a,g[7]=u,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,a=e.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(e,n,a){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const a=e.elements,o=n.elements,c=this.elements,u=a[0],h=a[3],d=a[6],p=a[1],g=a[4],_=a[7],v=a[2],x=a[5],b=a[8],A=o[0],S=o[3],y=o[6],C=o[1],z=o[4],T=o[7],F=o[2],U=o[5],O=o[8];return c[0]=u*A+h*C+d*F,c[3]=u*S+h*z+d*U,c[6]=u*y+h*T+d*O,c[1]=p*A+g*C+_*F,c[4]=p*S+g*z+_*U,c[7]=p*y+g*T+_*O,c[2]=v*A+x*C+b*F,c[5]=v*S+x*z+b*U,c[8]=v*y+x*T+b*O,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],h=e[5],d=e[6],p=e[7],g=e[8];return n*u*g-n*h*p-a*c*g+a*h*d+o*c*p-o*u*d}invert(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],h=e[5],d=e[6],p=e[7],g=e[8],_=g*u-h*p,v=h*d-g*c,x=p*c-u*d,b=n*_+a*v+o*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/b;return e[0]=_*A,e[1]=(o*p-g*a)*A,e[2]=(h*a-o*u)*A,e[3]=v*A,e[4]=(g*n-o*d)*A,e[5]=(o*c-h*n)*A,e[6]=x*A,e[7]=(a*d-p*n)*A,e[8]=(u*n-a*c)*A,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,a,o,c,u,h){const d=Math.cos(c),p=Math.sin(c);return this.set(a*d,a*p,-a*(d*u+p*h)+u+e,-o*p,o*d,-o*(-p*u+d*h)+h+n,0,0,1),this}scale(e,n){return xo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fd.makeScale(e,n)),this}rotate(e){return xo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fd.makeRotation(-e)),this}translate(e,n){return xo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,a=e.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(e,n=0){for(let a=0;a<9;a++)this.elements[a]=e[a+n];return this}toArray(e=[],n=0){const a=this.elements;return e[n]=a[0],e[n+1]=a[1],e[n+2]=a[2],e[n+3]=a[3],e[n+4]=a[4],e[n+5]=a[5],e[n+6]=a[6],e[n+7]=a[7],e[n+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}};h0.prototype.isMatrix3=!0;let Et=h0;const fd=new Et,f_=new Et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),h_=new Et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function BM(){const r={enabled:!0,workingColorSpace:Mo,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===en&&(o.r=is(o.r),o.g=is(o.g),o.b=is(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===en&&(o.r=yo(o.r),o.g=yo(o.g),o.b=yo(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===ja?Iu:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return xo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return xo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[Mo]:{primaries:e,whitePoint:a,transfer:Iu,toXYZ:f_,fromXYZ:h_,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:yi},outputColorSpaceConfig:{drawingBufferColorSpace:yi}},[yi]:{primaries:e,whitePoint:a,transfer:en,toXYZ:f_,fromXYZ:h_,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:yi}}}),r}const Ht=BM();function is(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function yo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let $r;class IM{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let a;if(e instanceof HTMLCanvasElement)a=e;else{$r===void 0&&($r=Hu("canvas")),$r.width=e.width,$r.height=e.height;const o=$r.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),a=$r}return a.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Hu("canvas");n.width=e.width,n.height=e.height;const a=n.getContext("2d");a.drawImage(e,0,0,e.width,e.height);const o=a.getImageData(0,0,e.width,e.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=is(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(e.data){const n=e.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(is(n[a]/255)*255):n[a]=is(n[a]);return{data:n,width:e.width,height:e.height}}else return St("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let HM=0;class Qp{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:HM++}),this.uuid=vr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,h=o.length;u<h;u++)o[u].isDataTexture?c.push(hd(o[u].image)):c.push(hd(o[u]))}else c=hd(o);a.url=c}return n||(e.images[this.uuid]=a),a}}function hd(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?IM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(St("Texture: Unable to serialize Texture."),{})}let GM=0;const dd=new V;class ii extends gr{constructor(e=ii.DEFAULT_IMAGE,n=ii.DEFAULT_MAPPING,a=Ni,o=Ni,c=mn,u=ya,h=Oi,d=wn,p=ii.DEFAULT_ANISOTROPY,g=ja){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:GM++}),this.uuid=vr(),this.name="",this.source=new Qp(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=d,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(dd).x}get height(){return this.source.getSize(dd).y}get depth(){return this.source.getSize(dd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const a=e[n];if(a===void 0){St(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){St(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zu:e.x=e.x-Math.floor(e.x);break;case Ni:e.x=e.x<0?0:1;break;case jd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zu:e.y=e.y-Math.floor(e.y);break;case Ni:e.y=e.y<0?0:1;break;case jd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}ii.DEFAULT_IMAGE=null;ii.DEFAULT_MAPPING=Nx;ii.DEFAULT_ANISOTROPY=1;const d0=class d0{constructor(e=0,n=0,a=0,o=1){this.x=e,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,a,o){return this.x=e,this.y=n,this.z=a,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,a=this.y,o=this.z,c=this.w,u=e.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,a,o,c;const d=e.elements,p=d[0],g=d[4],_=d[8],v=d[1],x=d[5],b=d[9],A=d[2],S=d[6],y=d[10];if(Math.abs(g-v)<.01&&Math.abs(_-A)<.01&&Math.abs(b-S)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+A)<.1&&Math.abs(b+S)<.1&&Math.abs(p+x+y-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const z=(p+1)/2,T=(x+1)/2,F=(y+1)/2,U=(g+v)/4,O=(_+A)/4,E=(b+S)/4;return z>T&&z>F?z<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(z),o=U/a,c=O/a):T>F?T<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(T),a=U/o,c=E/o):F<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(F),a=O/c,o=E/c),this.set(a,o,c,n),this}let C=Math.sqrt((S-b)*(S-b)+(_-A)*(_-A)+(v-g)*(v-g));return Math.abs(C)<.001&&(C=1),this.x=(S-b)/C,this.y=(_-A)/C,this.z=(v-g)/C,this.w=Math.acos((p+x+y-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=At(this.x,e.x,n.x),this.y=At(this.y,e.y,n.y),this.z=At(this.z,e.z,n.z),this.w=At(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=At(this.x,e,n),this.y=At(this.y,e,n),this.z=At(this.z,e,n),this.w=At(this.w,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(At(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this.z=e.z+(n.z-e.z)*a,this.w=e.w+(n.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};d0.prototype.isVector4=!0;let Jt=d0;class VM extends gr{constructor(e=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=a.depth,this.scissor=new Jt(0,0,e,n),this.scissorTest=!1,this.viewport=new Jt(0,0,e,n),this.textures=[];const o={width:e,height:n,depth:a.depth},c=new ii(o),u=a.count;for(let h=0;h<u;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,a=1){if(this.width!==e||this.height!==n||this.depth!==a){this.width=e,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=e,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,a=e.textures.length;n<a;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},e.textures[n].image);this.textures[n].source=new Qp(o)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const n=e.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kn extends VM{constructor(e=1,n=1,a={}){super(e,n,a),this.isWebGLRenderTarget=!0}}class Vx extends ii{constructor(e=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:a,depth:o},this.magFilter=Zn,this.minFilter=Zn,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class kM extends ii{constructor(e=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:a,depth:o},this.magFilter=Zn,this.minFilter=Zn,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const ku=class ku{constructor(e,n,a,o,c,u,h,d,p,g,_,v,x,b,A,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,a,o,c,u,h,d,p,g,_,v,x,b,A,S)}set(e,n,a,o,c,u,h,d,p,g,_,v,x,b,A,S){const y=this.elements;return y[0]=e,y[4]=n,y[8]=a,y[12]=o,y[1]=c,y[5]=u,y[9]=h,y[13]=d,y[2]=p,y[6]=g,y[10]=_,y[14]=v,y[3]=x,y[7]=b,y[11]=A,y[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ku().fromArray(this.elements)}copy(e){const n=this.elements,a=e.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(e){const n=this.elements,a=e.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,a){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(e,n,a){return this.set(e.x,n.x,a.x,0,e.y,n.y,a.y,0,e.z,n.z,a.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,a=e.elements,o=1/eo.setFromMatrixColumn(e,0).length(),c=1/eo.setFromMatrixColumn(e,1).length(),u=1/eo.setFromMatrixColumn(e,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,a=e.x,o=e.y,c=e.z,u=Math.cos(a),h=Math.sin(a),d=Math.cos(o),p=Math.sin(o),g=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const v=u*g,x=u*_,b=h*g,A=h*_;n[0]=d*g,n[4]=-d*_,n[8]=p,n[1]=x+b*p,n[5]=v-A*p,n[9]=-h*d,n[2]=A-v*p,n[6]=b+x*p,n[10]=u*d}else if(e.order==="YXZ"){const v=d*g,x=d*_,b=p*g,A=p*_;n[0]=v+A*h,n[4]=b*h-x,n[8]=u*p,n[1]=u*_,n[5]=u*g,n[9]=-h,n[2]=x*h-b,n[6]=A+v*h,n[10]=u*d}else if(e.order==="ZXY"){const v=d*g,x=d*_,b=p*g,A=p*_;n[0]=v-A*h,n[4]=-u*_,n[8]=b+x*h,n[1]=x+b*h,n[5]=u*g,n[9]=A-v*h,n[2]=-u*p,n[6]=h,n[10]=u*d}else if(e.order==="ZYX"){const v=u*g,x=u*_,b=h*g,A=h*_;n[0]=d*g,n[4]=b*p-x,n[8]=v*p+A,n[1]=d*_,n[5]=A*p+v,n[9]=x*p-b,n[2]=-p,n[6]=h*d,n[10]=u*d}else if(e.order==="YZX"){const v=u*d,x=u*p,b=h*d,A=h*p;n[0]=d*g,n[4]=A-v*_,n[8]=b*_+x,n[1]=_,n[5]=u*g,n[9]=-h*g,n[2]=-p*g,n[6]=x*_+b,n[10]=v-A*_}else if(e.order==="XZY"){const v=u*d,x=u*p,b=h*d,A=h*p;n[0]=d*g,n[4]=-_,n[8]=p*g,n[1]=v*_+A,n[5]=u*g,n[9]=x*_-b,n[2]=b*_-x,n[6]=h*g,n[10]=A*_+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(WM,e,XM)}lookAt(e,n,a){const o=this.elements;return Ui.subVectors(e,n),Ui.lengthSq()===0&&(Ui.z=1),Ui.normalize(),Ds.crossVectors(a,Ui),Ds.lengthSq()===0&&(Math.abs(a.z)===1?Ui.x+=1e-4:Ui.z+=1e-4,Ui.normalize(),Ds.crossVectors(a,Ui)),Ds.normalize(),su.crossVectors(Ui,Ds),o[0]=Ds.x,o[4]=su.x,o[8]=Ui.x,o[1]=Ds.y,o[5]=su.y,o[9]=Ui.y,o[2]=Ds.z,o[6]=su.z,o[10]=Ui.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const a=e.elements,o=n.elements,c=this.elements,u=a[0],h=a[4],d=a[8],p=a[12],g=a[1],_=a[5],v=a[9],x=a[13],b=a[2],A=a[6],S=a[10],y=a[14],C=a[3],z=a[7],T=a[11],F=a[15],U=o[0],O=o[4],E=o[8],L=o[12],H=o[1],G=o[5],X=o[9],K=o[13],B=o[2],W=o[6],P=o[10],k=o[14],ne=o[3],J=o[7],ee=o[11],N=o[15];return c[0]=u*U+h*H+d*B+p*ne,c[4]=u*O+h*G+d*W+p*J,c[8]=u*E+h*X+d*P+p*ee,c[12]=u*L+h*K+d*k+p*N,c[1]=g*U+_*H+v*B+x*ne,c[5]=g*O+_*G+v*W+x*J,c[9]=g*E+_*X+v*P+x*ee,c[13]=g*L+_*K+v*k+x*N,c[2]=b*U+A*H+S*B+y*ne,c[6]=b*O+A*G+S*W+y*J,c[10]=b*E+A*X+S*P+y*ee,c[14]=b*L+A*K+S*k+y*N,c[3]=C*U+z*H+T*B+F*ne,c[7]=C*O+z*G+T*W+F*J,c[11]=C*E+z*X+T*P+F*ee,c[15]=C*L+z*K+T*k+F*N,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],a=e[4],o=e[8],c=e[12],u=e[1],h=e[5],d=e[9],p=e[13],g=e[2],_=e[6],v=e[10],x=e[14],b=e[3],A=e[7],S=e[11],y=e[15],C=d*x-p*v,z=h*x-p*_,T=h*v-d*_,F=u*x-p*g,U=u*v-d*g,O=u*_-h*g;return n*(A*C-S*z+y*T)-a*(b*C-S*F+y*U)+o*(b*z-A*F+y*O)-c*(b*T-A*U+S*O)}determinantAffine(){const e=this.elements,n=e[0],a=e[4],o=e[8],c=e[1],u=e[5],h=e[9],d=e[2],p=e[6],g=e[10];return n*(u*g-h*p)-a*(c*g-h*d)+o*(c*p-u*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,a){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=n,o[14]=a),this}invert(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],h=e[5],d=e[6],p=e[7],g=e[8],_=e[9],v=e[10],x=e[11],b=e[12],A=e[13],S=e[14],y=e[15],C=n*h-a*u,z=n*d-o*u,T=n*p-c*u,F=a*d-o*h,U=a*p-c*h,O=o*p-c*d,E=g*A-_*b,L=g*S-v*b,H=g*y-x*b,G=_*S-v*A,X=_*y-x*A,K=v*y-x*S,B=C*K-z*X+T*G+F*H-U*L+O*E;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const W=1/B;return e[0]=(h*K-d*X+p*G)*W,e[1]=(o*X-a*K-c*G)*W,e[2]=(A*O-S*U+y*F)*W,e[3]=(v*U-_*O-x*F)*W,e[4]=(d*H-u*K-p*L)*W,e[5]=(n*K-o*H+c*L)*W,e[6]=(S*T-b*O-y*z)*W,e[7]=(g*O-v*T+x*z)*W,e[8]=(u*X-h*H+p*E)*W,e[9]=(a*H-n*X-c*E)*W,e[10]=(b*U-A*T+y*C)*W,e[11]=(_*T-g*U-x*C)*W,e[12]=(h*L-u*G-d*E)*W,e[13]=(n*G-a*L+o*E)*W,e[14]=(A*z-b*F-S*C)*W,e[15]=(g*F-_*z+v*C)*W,this}scale(e){const n=this.elements,a=e.x,o=e.y,c=e.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(e,n,a){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=e.x,h=e.y,d=e.z,p=c*u,g=c*h;return this.set(p*u+a,p*h-o*d,p*d+o*h,0,p*h+o*d,g*h+a,g*d-o*u,0,p*d-o*h,g*d+o*u,c*d*d+a,0,0,0,0,1),this}makeScale(e,n,a){return this.set(e,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,n,a,o,c,u){return this.set(1,a,c,0,e,1,u,0,n,o,1,0,0,0,0,1),this}compose(e,n,a){const o=this.elements,c=n._x,u=n._y,h=n._z,d=n._w,p=c+c,g=u+u,_=h+h,v=c*p,x=c*g,b=c*_,A=u*g,S=u*_,y=h*_,C=d*p,z=d*g,T=d*_,F=a.x,U=a.y,O=a.z;return o[0]=(1-(A+y))*F,o[1]=(x+T)*F,o[2]=(b-z)*F,o[3]=0,o[4]=(x-T)*U,o[5]=(1-(v+y))*U,o[6]=(S+C)*U,o[7]=0,o[8]=(b+z)*O,o[9]=(S-C)*O,o[10]=(1-(v+A))*O,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,n,a){const o=this.elements;e.x=o[12],e.y=o[13],e.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=eo.set(o[0],o[1],o[2]).length();const h=eo.set(o[4],o[5],o[6]).length(),d=eo.set(o[8],o[9],o[10]).length();c<0&&(u=-u),ta.copy(this);const p=1/u,g=1/h,_=1/d;return ta.elements[0]*=p,ta.elements[1]*=p,ta.elements[2]*=p,ta.elements[4]*=g,ta.elements[5]*=g,ta.elements[6]*=g,ta.elements[8]*=_,ta.elements[9]*=_,ta.elements[10]*=_,n.setFromRotationMatrix(ta),a.x=u,a.y=h,a.z=d,this}makePerspective(e,n,a,o,c,u,h=Sa,d=!1){const p=this.elements,g=2*c/(n-e),_=2*c/(a-o),v=(n+e)/(n-e),x=(a+o)/(a-o);let b,A;if(d)b=c/(u-c),A=u*c/(u-c);else if(h===Sa)b=-(u+c)/(u-c),A=-2*u*c/(u-c);else if(h===Gl)b=-u/(u-c),A=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=g,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=_,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=b,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,n,a,o,c,u,h=Sa,d=!1){const p=this.elements,g=2/(n-e),_=2/(a-o),v=-(n+e)/(n-e),x=-(a+o)/(a-o);let b,A;if(d)b=1/(u-c),A=u/(u-c);else if(h===Sa)b=-2/(u-c),A=-(u+c)/(u-c);else if(h===Gl)b=-1/(u-c),A=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=g,p[4]=0,p[8]=0,p[12]=v,p[1]=0,p[5]=_,p[9]=0,p[13]=x,p[2]=0,p[6]=0,p[10]=b,p[14]=A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const n=this.elements,a=e.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(e,n=0){for(let a=0;a<16;a++)this.elements[a]=e[a+n];return this}toArray(e=[],n=0){const a=this.elements;return e[n]=a[0],e[n+1]=a[1],e[n+2]=a[2],e[n+3]=a[3],e[n+4]=a[4],e[n+5]=a[5],e[n+6]=a[6],e[n+7]=a[7],e[n+8]=a[8],e[n+9]=a[9],e[n+10]=a[10],e[n+11]=a[11],e[n+12]=a[12],e[n+13]=a[13],e[n+14]=a[14],e[n+15]=a[15],e}};ku.prototype.isMatrix4=!0;let Ft=ku;const eo=new V,ta=new Ft,WM=new V(0,0,0),XM=new V(1,1,1),Ds=new V,su=new V,Ui=new V,d_=new Ft,p_=new _r;class as{constructor(e=0,n=0,a=0,o=as.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,a,o=this._order){return this._x=e,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,a=!0){const o=e.elements,c=o[0],u=o[4],h=o[8],d=o[1],p=o[5],g=o[9],_=o[2],v=o[6],x=o[10];switch(n){case"XYZ":this._y=Math.asin(At(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,x),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(v,p),this._z=0);break;case"YXZ":this._x=Math.asin(-At(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,x),this._z=Math.atan2(d,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(At(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,x),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(d,c));break;case"ZYX":this._y=Math.asin(-At(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,x),this._z=Math.atan2(d,c)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(At(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,x));break;case"XZY":this._z=Math.asin(-At(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(v,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-g,x),this._y=0);break;default:St("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,a){return d_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(d_,n,a)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return p_.setFromEuler(this),this.setFromQuaternion(p_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}as.DEFAULT_ORDER="XYZ";class Jp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qM=0;const m_=new V,to=new _r,Xa=new Ft,ru=new V,vl=new V,YM=new V,ZM=new _r,g_=new V(1,0,0),v_=new V(0,1,0),__=new V(0,0,1),x_={type:"added"},KM={type:"removed"},no={type:"childadded",child:null},pd={type:"childremoved",child:null};class On extends gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qM++}),this.uuid=vr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=On.DEFAULT_UP.clone();const e=new V,n=new as,a=new _r,o=new V(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ft},normalMatrix:{value:new Et}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=On.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return to.setFromAxisAngle(e,n),this.quaternion.multiply(to),this}rotateOnWorldAxis(e,n){return to.setFromAxisAngle(e,n),this.quaternion.premultiply(to),this}rotateX(e){return this.rotateOnAxis(g_,e)}rotateY(e){return this.rotateOnAxis(v_,e)}rotateZ(e){return this.rotateOnAxis(__,e)}translateOnAxis(e,n){return m_.copy(e).applyQuaternion(this.quaternion),this.position.add(m_.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(g_,e)}translateY(e){return this.translateOnAxis(v_,e)}translateZ(e){return this.translateOnAxis(__,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xa.copy(this.matrixWorld).invert())}lookAt(e,n,a){e.isVector3?ru.copy(e):ru.set(e,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),vl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xa.lookAt(vl,ru,this.up):Xa.lookAt(ru,vl,this.up),this.quaternion.setFromRotationMatrix(Xa),o&&(Xa.extractRotation(o.matrixWorld),to.setFromRotationMatrix(Xa),this.quaternion.premultiply(to.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(It("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(x_),no.child=e,this.dispatchEvent(no),no.child=null):It("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(KM),pd.child=e,this.dispatchEvent(pd),pd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xa.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(x_),no.child=e,this.dispatchEvent(no),no.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(e,n);if(u!==void 0)return u}}getObjectsByProperty(e,n,a=[]){this[e]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(e,n,a);return a}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vl,e,YM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vl,ZM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,a=e.y,o=e.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(e)}updateWorldMatrix(e,n,a=!1){const o=this.parent;if(e===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,h=c.length;u<h;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(e){const n=e===void 0||typeof e=="string",a={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(h,d){return h[d.uuid]===void 0&&(h[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const d=h.shapes;if(Array.isArray(d))for(let p=0,g=d.length;p<g;p++){const _=d[p];c(e.shapes,_)}else c(e.shapes,d)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let d=0,p=this.material.length;d<p;d++)h.push(c(e.materials,this.material[d]));o.material=h}else o.material=c(e.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const d=this.animations[h];o.animations.push(c(e.animations,d))}}if(n){const h=u(e.geometries),d=u(e.materials),p=u(e.textures),g=u(e.images),_=u(e.shapes),v=u(e.skeletons),x=u(e.animations),b=u(e.nodes);h.length>0&&(a.geometries=h),d.length>0&&(a.materials=d),p.length>0&&(a.textures=p),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),v.length>0&&(a.skeletons=v),x.length>0&&(a.animations=x),b.length>0&&(a.nodes=b)}return a.object=o,a;function u(h){const d=[];for(const p in h){const g=h[p];delete g.metadata,d.push(g)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let a=0;a<e.children.length;a++){const o=e.children[a];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}On.DEFAULT_UP=new V(0,1,0);On.DEFAULT_MATRIX_AUTO_UPDATE=!0;On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class hn extends On{constructor(){super(),this.isGroup=!0,this.type="Group"}}const QM={type:"move"};class md{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const a of e.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,a){let o=null,c=null,u=null;const h=this._targetRay,d=this._grip,p=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const A of e.hand.values()){const S=n.getJointPose(A,a),y=this._getHandJoint(p,A);S!==null&&(y.matrix.fromArray(S.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=S.radius),y.visible=S!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],v=g.position.distanceTo(_.position),x=.02,b=.005;p.inputState.pinching&&v>x+b?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&v<=x-b&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(c=n.getPose(e.gripSpace,a),c!==null&&(d.matrix.fromArray(c.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,c.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(c.linearVelocity)):d.hasLinearVelocity=!1,c.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(c.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(o=n.getPose(e.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(QM)))}return h!==null&&(h.visible=o!==null),d!==null&&(d.visible=c!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const a=new hn;a.matrixAutoUpdate=!1,a.visible=!1,e.joints[n.jointName]=a,e.add(a)}return e.joints[n.jointName]}}const kx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Us={h:0,s:0,l:0},ou={h:0,s:0,l:0};function gd(r,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(e-r)*6*n:n<1/2?e:n<2/3?r+(e-r)*6*(2/3-n):r}class tt{constructor(e,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,a)}set(e,n,a){if(n===void 0&&a===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,n,a);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=yi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ht.colorSpaceToWorking(this,n),this}setRGB(e,n,a,o=Ht.workingColorSpace){return this.r=e,this.g=n,this.b=a,Ht.colorSpaceToWorking(this,o),this}setHSL(e,n,a,o=Ht.workingColorSpace){if(e=Kp(e,1),n=At(n,0,1),a=At(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=gd(u,c,e+1/3),this.g=gd(u,c,e),this.b=gd(u,c,e-1/3)}return Ht.colorSpaceToWorking(this,o),this}setStyle(e,n=yi){function a(c){c!==void 0&&parseFloat(c)<1&&St("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const u=o[1],h=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:St("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);St("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=yi){const a=kx[e.toLowerCase()];return a!==void 0?this.setHex(a,n):St("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=is(e.r),this.g=is(e.g),this.b=is(e.b),this}copyLinearToSRGB(e){return this.r=yo(e.r),this.g=yo(e.g),this.b=yo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yi){return Ht.workingToColorSpace($n.copy(this),e),Math.round(At($n.r*255,0,255))*65536+Math.round(At($n.g*255,0,255))*256+Math.round(At($n.b*255,0,255))}getHexString(e=yi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ht.workingColorSpace){Ht.workingToColorSpace($n.copy(this),n);const a=$n.r,o=$n.g,c=$n.b,u=Math.max(a,o,c),h=Math.min(a,o,c);let d,p;const g=(h+u)/2;if(h===u)d=0,p=0;else{const _=u-h;switch(p=g<=.5?_/(u+h):_/(2-u-h),u){case a:d=(o-c)/_+(o<c?6:0);break;case o:d=(c-a)/_+2;break;case c:d=(a-o)/_+4;break}d/=6}return e.h=d,e.s=p,e.l=g,e}getRGB(e,n=Ht.workingColorSpace){return Ht.workingToColorSpace($n.copy(this),n),e.r=$n.r,e.g=$n.g,e.b=$n.b,e}getStyle(e=yi){Ht.workingToColorSpace($n.copy(this),e);const n=$n.r,a=$n.g,o=$n.b;return e!==yi?`color(${e} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(e,n,a){return this.getHSL(Us),this.setHSL(Us.h+e,Us.s+n,Us.l+a)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,a){return this.r=e.r+(n.r-e.r)*a,this.g=e.g+(n.g-e.g)*a,this.b=e.b+(n.b-e.b)*a,this}lerpHSL(e,n){this.getHSL(Us),e.getHSL(ou);const a=Ll(Us.h,ou.h,n),o=Ll(Us.s,ou.s,n),c=Ll(Us.l,ou.l,n);return this.setHSL(a,o,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,a=this.g,o=this.b,c=e.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $n=new tt;tt.NAMES=kx;class Dp extends On{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new as,this.environmentIntensity=1,this.environmentRotation=new as,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const na=new V,qa=new V,vd=new V,Ya=new V,io=new V,ao=new V,y_=new V,_d=new V,xd=new V,yd=new V,Sd=new Jt,Md=new Jt,bd=new Jt;class ra{constructor(e=new V,n=new V,a=new V){this.a=e,this.b=n,this.c=a}static getNormal(e,n,a,o){o.subVectors(a,n),na.subVectors(e,n),o.cross(na);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(e,n,a,o,c){na.subVectors(o,n),qa.subVectors(a,n),vd.subVectors(e,n);const u=na.dot(na),h=na.dot(qa),d=na.dot(vd),p=qa.dot(qa),g=qa.dot(vd),_=u*p-h*h;if(_===0)return c.set(0,0,0),null;const v=1/_,x=(p*d-h*g)*v,b=(u*g-h*d)*v;return c.set(1-x-b,b,x)}static containsPoint(e,n,a,o){return this.getBarycoord(e,n,a,o,Ya)===null?!1:Ya.x>=0&&Ya.y>=0&&Ya.x+Ya.y<=1}static getInterpolation(e,n,a,o,c,u,h,d){return this.getBarycoord(e,n,a,o,Ya)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(c,Ya.x),d.addScaledVector(u,Ya.y),d.addScaledVector(h,Ya.z),d)}static getInterpolatedAttribute(e,n,a,o,c,u){return Sd.setScalar(0),Md.setScalar(0),bd.setScalar(0),Sd.fromBufferAttribute(e,n),Md.fromBufferAttribute(e,a),bd.fromBufferAttribute(e,o),u.setScalar(0),u.addScaledVector(Sd,c.x),u.addScaledVector(Md,c.y),u.addScaledVector(bd,c.z),u}static isFrontFacing(e,n,a,o){return na.subVectors(a,n),qa.subVectors(e,n),na.cross(qa).dot(o)<0}set(e,n,a){return this.a.copy(e),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(e,n,a,o){return this.a.copy(e[n]),this.b.copy(e[a]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,n,a,o){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,a),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return na.subVectors(this.c,this.b),qa.subVectors(this.a,this.b),na.cross(qa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ra.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ra.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,a,o,c){return ra.getInterpolation(e,this.a,this.b,this.c,n,a,o,c)}containsPoint(e){return ra.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ra.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const a=this.a,o=this.b,c=this.c;let u,h;io.subVectors(o,a),ao.subVectors(c,a),_d.subVectors(e,a);const d=io.dot(_d),p=ao.dot(_d);if(d<=0&&p<=0)return n.copy(a);xd.subVectors(e,o);const g=io.dot(xd),_=ao.dot(xd);if(g>=0&&_<=g)return n.copy(o);const v=d*_-g*p;if(v<=0&&d>=0&&g<=0)return u=d/(d-g),n.copy(a).addScaledVector(io,u);yd.subVectors(e,c);const x=io.dot(yd),b=ao.dot(yd);if(b>=0&&x<=b)return n.copy(c);const A=x*p-d*b;if(A<=0&&p>=0&&b<=0)return h=p/(p-b),n.copy(a).addScaledVector(ao,h);const S=g*b-x*_;if(S<=0&&_-g>=0&&x-b>=0)return y_.subVectors(c,o),h=(_-g)/(_-g+(x-b)),n.copy(o).addScaledVector(y_,h);const y=1/(S+A+v);return u=A*y,h=v*y,n.copy(a).addScaledVector(io,u).addScaledVector(ao,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class xr{constructor(e=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,a=e.length;n<a;n+=3)this.expandByPoint(ia.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,a=e.count;n<a;n++)this.expandByPoint(ia.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,a=e.length;n<a;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const a=ia.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const a=e.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let u=0,h=c.count;u<h;u++)e.isMesh===!0?e.getVertexPosition(u,ia):ia.fromBufferAttribute(c,u),ia.applyMatrix4(e.matrixWorld),this.expandByPoint(ia);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),lu.copy(e.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),lu.copy(a.boundingBox)),lu.applyMatrix4(e.matrixWorld),this.union(lu)}const o=e.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ia),ia.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,a;return e.normal.x>0?(n=e.normal.x*this.min.x,a=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,a=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,a+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,a+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,a+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,a+=e.normal.z*this.min.z),n<=-e.constant&&a>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_l),cu.subVectors(this.max,_l),so.subVectors(e.a,_l),ro.subVectors(e.b,_l),oo.subVectors(e.c,_l),Ls.subVectors(ro,so),Ns.subVectors(oo,ro),tr.subVectors(so,oo);let n=[0,-Ls.z,Ls.y,0,-Ns.z,Ns.y,0,-tr.z,tr.y,Ls.z,0,-Ls.x,Ns.z,0,-Ns.x,tr.z,0,-tr.x,-Ls.y,Ls.x,0,-Ns.y,Ns.x,0,-tr.y,tr.x,0];return!Ed(n,so,ro,oo,cu)||(n=[1,0,0,0,1,0,0,0,1],!Ed(n,so,ro,oo,cu))?!1:(uu.crossVectors(Ls,Ns),n=[uu.x,uu.y,uu.z],Ed(n,so,ro,oo,cu))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ia).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ia).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Za[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Za[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Za[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Za[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Za[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Za[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Za[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Za[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Za),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Za=[new V,new V,new V,new V,new V,new V,new V,new V],ia=new V,lu=new xr,so=new V,ro=new V,oo=new V,Ls=new V,Ns=new V,tr=new V,_l=new V,cu=new V,uu=new V,nr=new V;function Ed(r,e,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){nr.fromArray(r,c);const h=o.x*Math.abs(nr.x)+o.y*Math.abs(nr.y)+o.z*Math.abs(nr.z),d=e.dot(nr),p=n.dot(nr),g=a.dot(nr);if(Math.max(-Math.max(d,p,g),Math.min(d,p,g))>h)return!1}return!0}const $a=JM();function JM(){const r=new ArrayBuffer(4),e=new Float32Array(r),n=new Uint32Array(r),a=new Uint32Array(512),o=new Uint32Array(512);for(let d=0;d<256;++d){const p=d-127;p<-27?(a[d]=0,a[d|256]=32768,o[d]=24,o[d|256]=24):p<-14?(a[d]=1024>>-p-14,a[d|256]=1024>>-p-14|32768,o[d]=-p-1,o[d|256]=-p-1):p<=15?(a[d]=p+15<<10,a[d|256]=p+15<<10|32768,o[d]=13,o[d|256]=13):p<128?(a[d]=31744,a[d|256]=64512,o[d]=24,o[d|256]=24):(a[d]=31744,a[d|256]=64512,o[d]=13,o[d|256]=13)}const c=new Uint32Array(2048),u=new Uint32Array(64),h=new Uint32Array(64);for(let d=1;d<1024;++d){let p=d<<13,g=0;for(;(p&8388608)===0;)p<<=1,g-=8388608;p&=-8388609,g+=947912704,c[d]=p|g}for(let d=1024;d<2048;++d)c[d]=939524096+(d-1024<<13);for(let d=1;d<31;++d)u[d]=d<<23;u[31]=1199570944,u[32]=2147483648;for(let d=33;d<63;++d)u[d]=2147483648+(d-32<<23);u[63]=3347054592;for(let d=1;d<64;++d)d!==32&&(h[d]=1024);return{floatView:e,uint32View:n,baseTable:a,shiftTable:o,mantissaTable:c,exponentTable:u,offsetTable:h}}function jM(r){Math.abs(r)>65504&&St("DataUtils.toHalfFloat(): Value out of range."),r=At(r,-65504,65504),$a.floatView[0]=r;const e=$a.uint32View[0],n=e>>23&511;return $a.baseTable[n]+((e&8388607)>>$a.shiftTable[n])}function $M(r){const e=r>>10;return $a.uint32View[0]=$a.mantissaTable[$a.offsetTable[e]+(r&1023)]+$a.exponentTable[e],$a.floatView[0]}class fu{static toHalfFloat(e){return jM(e)}static fromHalfFloat(e){return $M(e)}}const Un=new V,hu=new Pe;let eb=0;class oa extends gr{constructor(e,n,a=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:eb++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=a,this.usage=vM,this.updateRanges=[],this.gpuType=Pi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,a){e*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[e+o]=n.array[a+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)hu.fromBufferAttribute(this,n),hu.applyMatrix3(e),this.setXY(n,hu.x,hu.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)Un.fromBufferAttribute(this,n),Un.applyMatrix3(e),this.setXYZ(n,Un.x,Un.y,Un.z);return this}applyMatrix4(e){for(let n=0,a=this.count;n<a;n++)Un.fromBufferAttribute(this,n),Un.applyMatrix4(e),this.setXYZ(n,Un.x,Un.y,Un.z);return this}applyNormalMatrix(e){for(let n=0,a=this.count;n<a;n++)Un.fromBufferAttribute(this,n),Un.applyNormalMatrix(e),this.setXYZ(n,Un.x,Un.y,Un.z);return this}transformDirection(e){for(let n=0,a=this.count;n<a;n++)Un.fromBufferAttribute(this,n),Un.transformDirection(e),this.setXYZ(n,Un.x,Un.y,Un.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let a=this.array[e*this.itemSize+n];return this.normalized&&(a=mo(a,this.array)),a}setComponent(e,n,a){return this.normalized&&(a=ci(a,this.array)),this.array[e*this.itemSize+n]=a,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=mo(n,this.array)),n}setX(e,n){return this.normalized&&(n=ci(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=mo(n,this.array)),n}setY(e,n){return this.normalized&&(n=ci(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=mo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=ci(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=mo(n,this.array)),n}setW(e,n){return this.normalized&&(n=ci(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,a){return e*=this.itemSize,this.normalized&&(n=ci(n,this.array),a=ci(a,this.array)),this.array[e+0]=n,this.array[e+1]=a,this}setXYZ(e,n,a,o){return e*=this.itemSize,this.normalized&&(n=ci(n,this.array),a=ci(a,this.array),o=ci(o,this.array)),this.array[e+0]=n,this.array[e+1]=a,this.array[e+2]=o,this}setXYZW(e,n,a,o,c){return e*=this.itemSize,this.normalized&&(n=ci(n,this.array),a=ci(a,this.array),o=ci(o,this.array),c=ci(c,this.array)),this.array[e+0]=n,this.array[e+1]=a,this.array[e+2]=o,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Wx extends oa{constructor(e,n,a){super(new Uint16Array(e),n,a)}}class Xx extends oa{constructor(e,n,a){super(new Uint32Array(e),n,a)}}class Wt extends oa{constructor(e,n,a){super(new Float32Array(e),n,a)}}const tb=new xr,xl=new V,wd=new V;class Yl{constructor(e=new V,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const a=this.center;n!==void 0?a.copy(n):tb.setFromPoints(e).getCenter(a);let o=0;for(let c=0,u=e.length;c<u;c++)o=Math.max(o,a.distanceToSquared(e[c]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const a=this.center.distanceToSquared(e);return n.copy(e),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xl.subVectors(e,this.center);const n=xl.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(xl,o/a),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xl.copy(e.center).add(wd)),this.expandByPoint(xl.copy(e.center).sub(wd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let nb=0;const Zi=new Ft,Td=new On,lo=new V,Li=new xr,yl=new xr,Hn=new V;class Bn extends gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nb++}),this.uuid=vr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_M(e)?Xx:Wx)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,a=0){this.groups.push({start:e,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new Et().getNormalMatrix(e);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zi.makeRotationFromQuaternion(e),this.applyMatrix4(Zi),this}rotateX(e){return Zi.makeRotationX(e),this.applyMatrix4(Zi),this}rotateY(e){return Zi.makeRotationY(e),this.applyMatrix4(Zi),this}rotateZ(e){return Zi.makeRotationZ(e),this.applyMatrix4(Zi),this}translate(e,n,a){return Zi.makeTranslation(e,n,a),this.applyMatrix4(Zi),this}scale(e,n,a){return Zi.makeScale(e,n,a),this.applyMatrix4(Zi),this}lookAt(e){return Td.lookAt(e),Td.updateMatrix(),this.applyMatrix4(Td.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(lo).negate(),this.translate(lo.x,lo.y,lo.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=e.length;o<c;o++){const u=e[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Wt(a,3))}else{const a=Math.min(e.length,n.count);for(let o=0;o<a;o++){const c=e[o];n.setXYZ(o,c.x,c.y,c.z||0)}e.length>n.count&&St("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){It("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];Li.setFromBufferAttribute(c),this.morphTargetsRelative?(Hn.addVectors(this.boundingBox.min,Li.min),this.boundingBox.expandByPoint(Hn),Hn.addVectors(this.boundingBox.max,Li.max),this.boundingBox.expandByPoint(Hn)):(this.boundingBox.expandByPoint(Li.min),this.boundingBox.expandByPoint(Li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&It('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yl);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){It("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const a=this.boundingSphere.center;if(Li.setFromBufferAttribute(e),n)for(let c=0,u=n.length;c<u;c++){const h=n[c];yl.setFromBufferAttribute(h),this.morphTargetsRelative?(Hn.addVectors(Li.min,yl.min),Li.expandByPoint(Hn),Hn.addVectors(Li.max,yl.max),Li.expandByPoint(Hn)):(Li.expandByPoint(yl.min),Li.expandByPoint(yl.max))}Li.getCenter(a);let o=0;for(let c=0,u=e.count;c<u;c++)Hn.fromBufferAttribute(e,c),o=Math.max(o,a.distanceToSquared(Hn));if(n)for(let c=0,u=n.length;c<u;c++){const h=n[c],d=this.morphTargetsRelative;for(let p=0,g=h.count;p<g;p++)Hn.fromBufferAttribute(h,p),d&&(lo.fromBufferAttribute(e,p),Hn.add(lo)),o=Math.max(o,a.distanceToSquared(Hn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&It('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){It("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new oa(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const h=[],d=[];for(let E=0;E<a.count;E++)h[E]=new V,d[E]=new V;const p=new V,g=new V,_=new V,v=new Pe,x=new Pe,b=new Pe,A=new V,S=new V;function y(E,L,H){p.fromBufferAttribute(a,E),g.fromBufferAttribute(a,L),_.fromBufferAttribute(a,H),v.fromBufferAttribute(c,E),x.fromBufferAttribute(c,L),b.fromBufferAttribute(c,H),g.sub(p),_.sub(p),x.sub(v),b.sub(v);const G=1/(x.x*b.y-b.x*x.y);isFinite(G)&&(A.copy(g).multiplyScalar(b.y).addScaledVector(_,-x.y).multiplyScalar(G),S.copy(_).multiplyScalar(x.x).addScaledVector(g,-b.x).multiplyScalar(G),h[E].add(A),h[L].add(A),h[H].add(A),d[E].add(S),d[L].add(S),d[H].add(S))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let E=0,L=C.length;E<L;++E){const H=C[E],G=H.start,X=H.count;for(let K=G,B=G+X;K<B;K+=3)y(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const z=new V,T=new V,F=new V,U=new V;function O(E){F.fromBufferAttribute(o,E),U.copy(F);const L=h[E];z.copy(L),z.sub(F.multiplyScalar(F.dot(L))).normalize(),T.crossVectors(U,L);const G=T.dot(d[E])<0?-1:1;u.setXYZW(E,z.x,z.y,z.z,G)}for(let E=0,L=C.length;E<L;++E){const H=C[E],G=H.start,X=H.count;for(let K=G,B=G+X;K<B;K+=3)O(e.getX(K+0)),O(e.getX(K+1)),O(e.getX(K+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new oa(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let v=0,x=a.count;v<x;v++)a.setXYZ(v,0,0,0);const o=new V,c=new V,u=new V,h=new V,d=new V,p=new V,g=new V,_=new V;if(e)for(let v=0,x=e.count;v<x;v+=3){const b=e.getX(v+0),A=e.getX(v+1),S=e.getX(v+2);o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,A),u.fromBufferAttribute(n,S),g.subVectors(u,c),_.subVectors(o,c),g.cross(_),h.fromBufferAttribute(a,b),d.fromBufferAttribute(a,A),p.fromBufferAttribute(a,S),h.add(g),d.add(g),p.add(g),a.setXYZ(b,h.x,h.y,h.z),a.setXYZ(A,d.x,d.y,d.z),a.setXYZ(S,p.x,p.y,p.z)}else for(let v=0,x=n.count;v<x;v+=3)o.fromBufferAttribute(n,v+0),c.fromBufferAttribute(n,v+1),u.fromBufferAttribute(n,v+2),g.subVectors(u,c),_.subVectors(o,c),g.cross(_),a.setXYZ(v+0,g.x,g.y,g.z),a.setXYZ(v+1,g.x,g.y,g.z),a.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,a=e.count;n<a;n++)Hn.fromBufferAttribute(e,n),Hn.normalize(),e.setXYZ(n,Hn.x,Hn.y,Hn.z)}toNonIndexed(){function e(h,d){const p=h.array,g=h.itemSize,_=h.normalized,v=new p.constructor(d.length*g);let x=0,b=0;for(let A=0,S=d.length;A<S;A++){h.isInterleavedBufferAttribute?x=d[A]*h.data.stride+h.offset:x=d[A]*g;for(let y=0;y<g;y++)v[b++]=p[x++]}return new oa(v,g,_)}if(this.index===null)return St("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Bn,a=this.index.array,o=this.attributes;for(const h in o){const d=o[h],p=e(d,a);n.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const d=[],p=c[h];for(let g=0,_=p.length;g<_;g++){const v=p[g],x=e(v,a);d.push(x)}n.morphAttributes[h]=d}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let h=0,d=u.length;h<d;h++){const p=u[h];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const d=this.parameters;for(const p in d)d[p]!==void 0&&(e[p]=d[p]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const d in a){const p=a[d];e.data.attributes[d]=p.toJSON(e.data)}const o={};let c=!1;for(const d in this.morphAttributes){const p=this.morphAttributes[d],g=[];for(let _=0,v=p.length;_<v;_++){const x=p[_];g.push(x.toJSON(e.data))}g.length>0&&(o[d]=g,c=!0)}c&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const a=e.index;a!==null&&this.setIndex(a.clone());const o=e.attributes;for(const p in o){const g=o[p];this.setAttribute(p,g.clone(n))}const c=e.morphAttributes;for(const p in c){const g=[],_=c[p];for(let v=0,x=_.length;v<x;v++)g.push(_[v].clone(n));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,g=u.length;p<g;p++){const _=u[p];this.addGroup(_.start,_.count,_.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ad=new V,ib=new V,ab=new Et;class Ja{constructor(e=new V(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,a,o){return this.normal.set(e,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,a){const o=Ad.subVectors(a,n).cross(ib.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,a=!0){const o=e.delta(Ad),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(e.start).addScaledVector(o,u)}intersectsLine(e){const n=this.distanceToPoint(e.start),a=this.distanceToPoint(e.end);return n<0&&a>0||a<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const a=n||ab.getNormalMatrix(e),o=this.coplanarPoint(Ad).applyMatrix4(e),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let sb=0;class Zl extends gr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sb++}),this.uuid=vr(),this.name="",this.type="Material",this.blending=Dl,this.side=zs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ex,this.blendDst=wx,this.blendEquation=po,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=Bl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cd,this.stencilZFail=cd,this.stencilZPass=cd,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const a=e[n];if(a===void 0){St(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){St(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(e).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(e).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(e).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(e).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(e).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const h in c){const d=c[h];delete d.metadata,u.push(d)}return u}if(n){const c=o(e.textures),u=o(e.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(a=>new Ja().fromJSON(a))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let a=e.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Pe().fromArray(a)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ka=new V,Rd=new V,du=new V,pu=new V;class qx{constructor(e=new V,n=new V(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ka)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ka.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ka.copy(this.origin).addScaledVector(this.direction,n),Ka.distanceToSquared(e))}distanceSqToSegment(e,n,a,o){Rd.copy(e).add(n).multiplyScalar(.5),du.copy(n).sub(e).normalize(),pu.copy(this.origin).sub(Rd);const c=e.distanceTo(n)*.5,u=-this.direction.dot(du),h=pu.dot(this.direction),d=-pu.dot(du),p=pu.lengthSq(),g=Math.abs(1-u*u);let _,v,x,b;if(g>0)if(_=u*d-h,v=u*h-d,b=c*g,_>=0)if(v>=-b)if(v<=b){const A=1/g;_*=A,v*=A,x=_*(_+u*v+2*h)+v*(u*_+v+2*d)+p}else v=c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*d)+p;else v=-c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*d)+p;else v<=-b?(_=Math.max(0,-(-u*c+h)),v=_>0?-c:Math.min(Math.max(-c,-d),c),x=-_*_+v*(v+2*d)+p):v<=b?(_=0,v=Math.min(Math.max(-c,-d),c),x=v*(v+2*d)+p):(_=Math.max(0,-(u*c+h)),v=_>0?c:Math.min(Math.max(-c,-d),c),x=-_*_+v*(v+2*d)+p);else v=u>0?-c:c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*d)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(Rd).addScaledVector(du,v),x}intersectSphere(e,n){if(e.radius<0)return null;Ka.subVectors(e.center,this.origin);const a=Ka.dot(this.direction),o=Ka.dot(Ka)-a*a,c=e.radius*e.radius;if(o>c)return null;const u=Math.sqrt(c-o),h=a-u,d=a+u;return d<0?null:h<0?this.at(d,n):this.at(h,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(e.normal)+e.constant)/n;return a>=0?a:null}intersectPlane(e,n){const a=this.distanceToPlane(e);return a===null?null:this.at(a,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let a,o,c,u,h,d;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return p>=0?(a=(e.min.x-v.x)*p,o=(e.max.x-v.x)*p):(a=(e.max.x-v.x)*p,o=(e.min.x-v.x)*p),g>=0?(c=(e.min.y-v.y)*g,u=(e.max.y-v.y)*g):(c=(e.max.y-v.y)*g,u=(e.min.y-v.y)*g),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),_>=0?(h=(e.min.z-v.z)*_,d=(e.max.z-v.z)*_):(h=(e.max.z-v.z)*_,d=(e.min.z-v.z)*_),a>d||h>o)||((h>a||a!==a)&&(a=h),(d<o||o!==o)&&(o=d),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(e){return this.intersectBox(e,Ka)!==null}intersectTriangle(e,n,a,o,c){const u=this.origin,h=this.direction,d=h.x,p=h.y,g=h.z,_=e.x-u.x,v=e.y-u.y,x=e.z-u.z,b=n.x-u.x,A=n.y-u.y,S=n.z-u.z,y=a.x-u.x,C=a.y-u.y,z=a.z-u.z,T=Math.abs(d),F=Math.abs(p),U=Math.abs(g);let O,E,L,H,G,X,K,B,W,P,k,ne;if(T>=F&&T>=U?(L=d,X=_,W=b,ne=y,d>=0?(O=p,E=g,H=v,G=x,K=A,B=S,P=C,k=z):(O=g,E=p,H=x,G=v,K=S,B=A,P=z,k=C)):F>=U?(L=p,X=v,W=A,ne=C,p>=0?(O=g,E=d,H=x,G=_,K=S,B=b,P=z,k=y):(O=d,E=g,H=_,G=x,K=b,B=S,P=y,k=z)):(L=g,X=x,W=S,ne=z,g>=0?(O=d,E=p,H=_,G=v,K=b,B=A,P=y,k=C):(O=p,E=d,H=v,G=_,K=A,B=b,P=C,k=y)),L===0)return null;const J=O/L,ee=E/L,N=1/L,Q=H-J*X,ue=G-ee*X,Ue=K-J*W,Fe=B-ee*W,Ke=P-J*ne,re=k-ee*ne,ye=Ke*Fe-re*Ue,oe=Q*re-ue*Ke,ve=Ue*ue-Fe*Q;if(o){if(ye<0||oe<0||ve<0)return null}else if((ye<0||oe<0||ve<0)&&(ye>0||oe>0||ve>0))return null;const me=ye+oe+ve;if(me===0)return null;const Ae=N*(ye*X+oe*W+ve*ne);return(me>0?Ae<0:Ae>0)?null:this.at(Ae/me,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class hi extends Zl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new as,this.combine=Tx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const S_=new Ft,ir=new qx,mu=new Yl,M_=new V,gu=new V,vu=new V,_u=new V,Cd=new V,xu=new V,b_=new V,yu=new V;class rn extends On{constructor(e=new Bn,n=new hi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,e);const h=this.morphTargetInfluences;if(c&&h){xu.set(0,0,0);for(let d=0,p=c.length;d<p;d++){const g=h[d],_=c[d];g!==0&&(Cd.fromBufferAttribute(_,e),u?xu.addScaledVector(Cd,g):xu.addScaledVector(Cd.sub(n),g))}n.add(xu)}return n}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),mu.copy(a.boundingSphere),mu.applyMatrix4(c),ir.copy(e.ray).recast(e.near),!(mu.containsPoint(ir.origin)===!1&&(ir.intersectSphere(mu,M_)===null||ir.origin.distanceToSquared(M_)>(e.far-e.near)**2))&&(S_.copy(c).invert(),ir.copy(e.ray).applyMatrix4(S_),!(a.boundingBox!==null&&ir.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(e,n,ir)))}_computeIntersections(e,n,a){let o;const c=this.geometry,u=this.material,h=c.index,d=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,v=c.groups,x=c.drawRange;if(h!==null)if(Array.isArray(u))for(let b=0,A=v.length;b<A;b++){const S=v[b],y=u[S.materialIndex],C=Math.max(S.start,x.start),z=Math.min(h.count,Math.min(S.start+S.count,x.start+x.count));for(let T=C,F=z;T<F;T+=3){const U=h.getX(T),O=h.getX(T+1),E=h.getX(T+2);o=Su(this,y,e,a,p,g,_,U,O,E),o&&(o.faceIndex=Math.floor(T/3),o.face.materialIndex=S.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),A=Math.min(h.count,x.start+x.count);for(let S=b,y=A;S<y;S+=3){const C=h.getX(S),z=h.getX(S+1),T=h.getX(S+2);o=Su(this,u,e,a,p,g,_,C,z,T),o&&(o.faceIndex=Math.floor(S/3),n.push(o))}}else if(d!==void 0)if(Array.isArray(u))for(let b=0,A=v.length;b<A;b++){const S=v[b],y=u[S.materialIndex],C=Math.max(S.start,x.start),z=Math.min(d.count,Math.min(S.start+S.count,x.start+x.count));for(let T=C,F=z;T<F;T+=3){const U=T,O=T+1,E=T+2;o=Su(this,y,e,a,p,g,_,U,O,E),o&&(o.faceIndex=Math.floor(T/3),o.face.materialIndex=S.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),A=Math.min(d.count,x.start+x.count);for(let S=b,y=A;S<y;S+=3){const C=S,z=S+1,T=S+2;o=Su(this,u,e,a,p,g,_,C,z,T),o&&(o.faceIndex=Math.floor(S/3),n.push(o))}}}}function rb(r,e,n,a,o,c,u,h){let d;if(e.side===Gn?d=a.intersectTriangle(u,c,o,!0,h):d=a.intersectTriangle(o,c,u,e.side===zs,h),d===null)return null;yu.copy(h),yu.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(yu);return p<n.near||p>n.far?null:{distance:p,point:yu.clone(),object:r}}function Su(r,e,n,a,o,c,u,h,d,p){r.getVertexPosition(h,gu),r.getVertexPosition(d,vu),r.getVertexPosition(p,_u);const g=rb(r,e,n,a,gu,vu,_u,b_);if(g){const _=new V;ra.getBarycoord(b_,gu,vu,_u,_),o&&(g.uv=ra.getInterpolatedAttribute(o,h,d,p,_,new Pe)),c&&(g.uv1=ra.getInterpolatedAttribute(c,h,d,p,_,new Pe)),u&&(g.normal=ra.getInterpolatedAttribute(u,h,d,p,_,new V),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const v={a:h,b:d,c:p,normal:new V,materialIndex:0};ra.getNormal(gu,vu,_u,v.normal),g.face=v,g.barycoord=_}return g}class Gu extends ii{constructor(e=null,n=1,a=1,o,c,u,h,d,p=Zn,g=Zn,_,v){super(null,u,h,d,p,g,o,c,_,v),this.isDataTexture=!0,this.image={data:e,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class E_ extends oa{constructor(e,n,a,o=1){super(e,n,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const co=new Ft,w_=new Ft,Mu=[],T_=new xr,ob=new Ft,Sl=new rn,Ml=new Yl;class Yx extends rn{constructor(e,n,a){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new E_(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<a;o++)this.setMatrixAt(o,ob)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new xr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,co),T_.copy(e.boundingBox).applyMatrix4(co),this.boundingBox.union(T_)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yl),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,co),Ml.copy(e.boundingSphere).applyMatrix4(co),this.boundingSphere.union(Ml)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const a=n.morphTargetInfluences,o=this.morphTexture.source.data.data,c=a.length+1,u=e*c+1;for(let h=0;h<a.length;h++)a[h]=o[u+h]}raycast(e,n){const a=this.matrixWorld,o=this.count;if(Sl.geometry=this.geometry,Sl.material=this.material,Sl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ml.copy(this.boundingSphere),Ml.applyMatrix4(a),e.ray.intersectsSphere(Ml)!==!1))for(let c=0;c<o;c++){this.getMatrixAt(c,co),w_.multiplyMatrices(a,co),Sl.matrixWorld=w_,Sl.raycast(e,Mu);for(let u=0,h=Mu.length;u<h;u++){const d=Mu[u];d.instanceId=c,d.object=this,n.push(d)}Mu.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new E_(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const a=n.morphTargetInfluences,o=a.length+1;this.morphTexture===null&&(this.morphTexture=new Gu(new Float32Array(o*this.count),o,this.count,Wp,Pi));const c=this.morphTexture.source.data.data;let u=0;for(let p=0;p<a.length;p++)u+=a[p];const h=this.geometry.morphTargetsRelative?1:1-u,d=o*e;return c[d]=h,c.set(a,d+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ar=new Yl,lb=new Pe(.5,.5),bu=new V;class jp{constructor(e=new Ja,n=new Ja,a=new Ja,o=new Ja,c=new Ja,u=new Ja){this.planes=[e,n,a,o,c,u]}set(e,n,a,o,c,u){const h=this.planes;return h[0].copy(e),h[1].copy(n),h[2].copy(a),h[3].copy(o),h[4].copy(c),h[5].copy(u),this}copy(e){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(e.planes[a]);return this}setFromProjectionMatrix(e,n=Sa,a=!1){const o=this.planes,c=e.elements,u=c[0],h=c[1],d=c[2],p=c[3],g=c[4],_=c[5],v=c[6],x=c[7],b=c[8],A=c[9],S=c[10],y=c[11],C=c[12],z=c[13],T=c[14],F=c[15];if(o[0].setComponents(p-u,x-g,y-b,F-C).normalize(),o[1].setComponents(p+u,x+g,y+b,F+C).normalize(),o[2].setComponents(p+h,x+_,y+A,F+z).normalize(),o[3].setComponents(p-h,x-_,y-A,F-z).normalize(),a)o[4].setComponents(d,v,S,T).normalize(),o[5].setComponents(p-d,x-v,y-S,F-T).normalize();else if(o[4].setComponents(p-d,x-v,y-S,F-T).normalize(),n===Sa)o[5].setComponents(p+d,x+v,y+S,F+T).normalize();else if(n===Gl)o[5].setComponents(d,v,S,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ar)}intersectsSprite(e){ar.center.set(0,0,0);const n=lb.distanceTo(e.center);return ar.radius=.7071067811865476+n,ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(ar)}intersectsSphere(e){const n=this.planes,a=e.center,o=-e.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(e){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(bu.x=o.normal.x>0?e.max.x:e.min.x,bu.y=o.normal.y>0?e.max.y:e.min.y,bu.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(bu)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zx extends ii{constructor(e=[],n=hr,a,o,c,u,h,d,p,g){super(e,n,a,o,c,u,h,d,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Kx extends ii{constructor(e,n,a,o,c,u,h,d,p){super(e,n,a,o,c,u,h,d,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fs extends ii{constructor(e,n,a=zi,o,c,u,h=Zn,d=Zn,p,g=Ea,_=1){if(g!==Ea&&g!==cr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:e,height:n,depth:_};super(v,o,c,u,h,d,g,a,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return n.compareFunction=this.compareFunction,n}}class cb extends Fs{constructor(e,n=zi,a=hr,o,c,u=Zn,h=Zn,d,p=Ea){const g={width:e,height:e,depth:1},_=[g,g,g,g,g,g];super(e,e,n,a,o,c,u,h,d,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Qx extends ii{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ti extends Bn{constructor(e=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const h=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const d=[],p=[],g=[],_=[];let v=0,x=0;b("z","y","x",-1,-1,a,n,e,u,c,0),b("z","y","x",1,-1,a,n,-e,u,c,1),b("x","z","y",1,1,e,a,n,o,u,2),b("x","z","y",1,-1,e,a,-n,o,u,3),b("x","y","z",1,-1,e,n,a,o,c,4),b("x","y","z",-1,-1,e,n,-a,o,c,5),this.setIndex(d),this.setAttribute("position",new Wt(p,3)),this.setAttribute("normal",new Wt(g,3)),this.setAttribute("uv",new Wt(_,2));function b(A,S,y,C,z,T,F,U,O,E,L){const H=T/O,G=F/E,X=T/2,K=F/2,B=U/2,W=O+1,P=E+1;let k=0,ne=0;const J=new V;for(let ee=0;ee<P;ee++){const N=ee*G-K;for(let Q=0;Q<W;Q++){const ue=Q*H-X;J[A]=ue*C,J[S]=N*z,J[y]=B,p.push(J.x,J.y,J.z),J[A]=0,J[S]=0,J[y]=U>0?1:-1,g.push(J.x,J.y,J.z),_.push(Q/O),_.push(1-ee/E),k+=1}}for(let ee=0;ee<E;ee++)for(let N=0;N<O;N++){const Q=v+N+W*ee,ue=v+N+W*(ee+1),Ue=v+(N+1)+W*(ee+1),Fe=v+(N+1)+W*ee;d.push(Q,ue,Fe),d.push(ue,Ue,Fe),ne+=6}h.addGroup(x,ne,L),x+=ne,v+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ti(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yr extends Bn{constructor(e=1,n=32,a=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:a,thetaLength:o},n=Math.max(3,n);const c=[],u=[],h=[],d=[],p=new V,g=new Pe;u.push(0,0,0),h.push(0,0,1),d.push(.5,.5);for(let _=0,v=3;_<=n;_++,v+=3){const x=a+_/n*o;p.x=e*Math.cos(x),p.y=e*Math.sin(x),u.push(p.x,p.y,p.z),h.push(0,0,1),g.x=(u[v]/e+1)/2,g.y=(u[v+1]/e+1)/2,d.push(g.x,g.y)}for(let _=1;_<=n;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new Wt(u,3)),this.setAttribute("normal",new Wt(h,3)),this.setAttribute("uv",new Wt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class es extends Bn{constructor(e=1,n=1,a=1,o=32,c=1,u=!1,h=0,d=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:a,radialSegments:o,heightSegments:c,openEnded:u,thetaStart:h,thetaLength:d};const p=this;o=Math.floor(o),c=Math.floor(c);const g=[],_=[],v=[],x=[];let b=0;const A=[],S=a/2;let y=0;C(),u===!1&&(e>0&&z(!0),n>0&&z(!1)),this.setIndex(g),this.setAttribute("position",new Wt(_,3)),this.setAttribute("normal",new Wt(v,3)),this.setAttribute("uv",new Wt(x,2));function C(){const T=new V,F=new V;let U=0;const O=(n-e)/a;for(let E=0;E<=c;E++){const L=[],H=E/c,G=H*(n-e)+e;for(let X=0;X<=o;X++){const K=X/o,B=K*d+h,W=Math.sin(B),P=Math.cos(B);F.x=G*W,F.y=-H*a+S,F.z=G*P,_.push(F.x,F.y,F.z),T.set(W,O,P).normalize(),v.push(T.x,T.y,T.z),x.push(K,1-H),L.push(b++)}A.push(L)}for(let E=0;E<o;E++)for(let L=0;L<c;L++){const H=A[L][E],G=A[L+1][E],X=A[L+1][E+1],K=A[L][E+1];(e>0||L!==0)&&(g.push(H,G,K),U+=3),(n>0||L!==c-1)&&(g.push(G,X,K),U+=3)}p.addGroup(y,U,0),y+=U}function z(T){const F=b,U=new Pe,O=new V;let E=0;const L=T===!0?e:n,H=T===!0?1:-1;for(let X=1;X<=o;X++)_.push(0,S*H,0),v.push(0,H,0),x.push(.5,.5),b++;const G=b;for(let X=0;X<=o;X++){const B=X/o*d+h,W=Math.cos(B),P=Math.sin(B);O.x=L*P,O.y=S*H,O.z=L*W,_.push(O.x,O.y,O.z),v.push(0,H,0),U.x=W*.5+.5,U.y=P*.5*H+.5,x.push(U.x,U.y),b++}for(let X=0;X<o;X++){const K=F+X,B=G+X;T===!0?g.push(B,B+1,K):g.push(B+1,B,K),E+=3}p.addGroup(y,E,T===!0?1:2),y+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new es(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ta{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){St("Curve: .getPoint() not implemented.")}getPointAt(e,n){const a=this.getUtoTmapping(e);return this.getPoint(a,n)}getPoints(e=5){const n=[];for(let a=0;a<=e;a++)n.push(this.getPoint(a/e));return n}getSpacedPoints(e=5){const n=[];for(let a=0;a<=e;a++)n.push(this.getPointAt(a/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),c=0;n.push(0);for(let u=1;u<=e;u++)a=this.getPoint(u/e),c+=a.distanceTo(o),n.push(c),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const a=this.getLengths();let o=0;const c=a.length;let u;n?u=n:u=e*a[c-1];let h=0,d=c-1,p;for(;h<=d;)if(o=Math.floor(h+(d-h)/2),p=a[o]-u,p<0)h=o+1;else if(p>0)d=o-1;else{d=o;break}if(o=d,a[o]===u)return o/(c-1);const g=a[o],v=a[o+1]-g,x=(u-g)/v;return(o+x)/(c-1)}getTangent(e,n){let o=e-1e-4,c=e+1e-4;o<0&&(o=0),c>1&&(c=1);const u=this.getPoint(o),h=this.getPoint(c),d=n||(u.isVector2?new Pe:new V);return d.copy(h).sub(u).normalize(),d}getTangentAt(e,n){const a=this.getUtoTmapping(e);return this.getTangent(a,n)}computeFrenetFrames(e,n=!1){const a=new V,o=[],c=[],u=[],h=new V,d=new Ft;for(let x=0;x<=e;x++){const b=x/e;o[x]=this.getTangentAt(b,new V)}c[0]=new V,u[0]=new V;let p=Number.MAX_VALUE;const g=Math.abs(o[0].x),_=Math.abs(o[0].y),v=Math.abs(o[0].z);g<=p&&(p=g,a.set(1,0,0)),_<=p&&(p=_,a.set(0,1,0)),v<=p&&a.set(0,0,1),h.crossVectors(o[0],a).normalize(),c[0].crossVectors(o[0],h),u[0].crossVectors(o[0],c[0]);for(let x=1;x<=e;x++){if(c[x]=c[x-1].clone(),u[x]=u[x-1].clone(),h.crossVectors(o[x-1],o[x]),h.length()>Number.EPSILON){h.normalize();const b=Math.acos(At(o[x-1].dot(o[x]),-1,1));c[x].applyMatrix4(d.makeRotationAxis(h,b))}u[x].crossVectors(o[x],c[x])}if(n===!0){let x=Math.acos(At(c[0].dot(c[e]),-1,1));x/=e,o[0].dot(h.crossVectors(c[0],c[e]))>0&&(x=-x);for(let b=1;b<=e;b++)c[b].applyMatrix4(d.makeRotationAxis(o[b],x*b)),u[b].crossVectors(o[b],c[b])}return{tangents:o,normals:c,binormals:u}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class $p extends Ta{constructor(e=0,n=0,a=1,o=1,c=0,u=Math.PI*2,h=!1,d=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=c,this.aEndAngle=u,this.aClockwise=h,this.aRotation=d}getPoint(e,n=new Pe){const a=n,o=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const u=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=o;for(;c>o;)c-=o;c<Number.EPSILON&&(u?c=0:c=o),this.aClockwise===!0&&!u&&(c===o?c=-o:c=c-o);const h=this.aStartAngle+e*c;let d=this.aX+this.xRadius*Math.cos(h),p=this.aY+this.yRadius*Math.sin(h);if(this.aRotation!==0){const g=Math.cos(this.aRotation),_=Math.sin(this.aRotation),v=d-this.aX,x=p-this.aY;d=v*g-x*_+this.aX,p=v*_+x*g+this.aY}return a.set(d,p)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ub extends $p{constructor(e,n,a,o,c,u){super(e,n,a,a,o,c,u),this.isArcCurve=!0,this.type="ArcCurve"}}function e0(){let r=0,e=0,n=0,a=0;function o(c,u,h,d){r=c,e=h,n=-3*c+3*u-2*h-d,a=2*c-2*u+h+d}return{initCatmullRom:function(c,u,h,d,p){o(u,h,p*(h-c),p*(d-u))},initNonuniformCatmullRom:function(c,u,h,d,p,g,_){let v=(u-c)/p-(h-c)/(p+g)+(h-u)/g,x=(h-u)/g-(d-u)/(g+_)+(d-h)/_;v*=g,x*=g,o(u,h,v,x)},calc:function(c){const u=c*c,h=u*c;return r+e*c+n*u+a*h}}}const A_=new V,R_=new V,Dd=new e0,Ud=new e0,Ld=new e0;class pr extends Ta{constructor(e=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=a,this.tension=o}getPoint(e,n=new V){const a=n,o=this.points,c=o.length,u=(c-(this.closed?0:1))*e;let h=Math.floor(u),d=u-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/c)+1)*c:d===0&&h===c-1&&(h=c-2,d=1);let p,g;this.closed||h>0?p=o[(h-1)%c]:(R_.subVectors(o[0],o[1]).add(o[0]),p=R_);const _=o[h%c],v=o[(h+1)%c];if(this.closed||h+2<c?g=o[(h+2)%c]:(A_.subVectors(o[c-1],o[c-2]).add(o[c-1]),g=A_),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let b=Math.pow(p.distanceToSquared(_),x),A=Math.pow(_.distanceToSquared(v),x),S=Math.pow(v.distanceToSquared(g),x);A<1e-4&&(A=1),b<1e-4&&(b=A),S<1e-4&&(S=A),Dd.initNonuniformCatmullRom(p.x,_.x,v.x,g.x,b,A,S),Ud.initNonuniformCatmullRom(p.y,_.y,v.y,g.y,b,A,S),Ld.initNonuniformCatmullRom(p.z,_.z,v.z,g.z,b,A,S)}else this.curveType==="catmullrom"&&(Dd.initCatmullRom(p.x,_.x,v.x,g.x,this.tension),Ud.initCatmullRom(p.y,_.y,v.y,g.y,this.tension),Ld.initCatmullRom(p.z,_.z,v.z,g.z,this.tension));return a.set(Dd.calc(d),Ud.calc(d),Ld.calc(d)),a}copy(e){super.copy(e),this.points=[];for(let n=0,a=e.points.length;n<a;n++){const o=e.points[n];this.points.push(o.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];e.points.push(o.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,a=e.points.length;n<a;n++){const o=e.points[n];this.points.push(new V().fromArray(o))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function C_(r,e,n,a,o){const c=(a-e)*.5,u=(o-n)*.5,h=r*r,d=r*h;return(2*n-2*a+c+u)*d+(-3*n+3*a-2*c-u)*h+c*r+n}function fb(r,e){const n=1-r;return n*n*e}function hb(r,e){return 2*(1-r)*r*e}function db(r,e){return r*r*e}function Nl(r,e,n,a){return fb(r,e)+hb(r,n)+db(r,a)}function pb(r,e){const n=1-r;return n*n*n*e}function mb(r,e){const n=1-r;return 3*n*n*r*e}function gb(r,e){return 3*(1-r)*r*r*e}function vb(r,e){return r*r*r*e}function Pl(r,e,n,a,o){return pb(r,e)+mb(r,n)+gb(r,a)+vb(r,o)}class Jx extends Ta{constructor(e=new Pe,n=new Pe,a=new Pe,o=new Pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=a,this.v3=o}getPoint(e,n=new Pe){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(Pl(e,o.x,c.x,u.x,h.x),Pl(e,o.y,c.y,u.y,h.y)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class _b extends Ta{constructor(e=new V,n=new V,a=new V,o=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=a,this.v3=o}getPoint(e,n=new V){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(Pl(e,o.x,c.x,u.x,h.x),Pl(e,o.y,c.y,u.y,h.y),Pl(e,o.z,c.z,u.z,h.z)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class jx extends Ta{constructor(e=new Pe,n=new Pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new Pe){const a=n;return e===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(e).add(this.v1)),a}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new Pe){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xb extends Ta{constructor(e=new V,n=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new V){const a=n;return e===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(e).add(this.v1)),a}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new V){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $x extends Ta{constructor(e=new Pe,n=new Pe,a=new Pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=a}getPoint(e,n=new Pe){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(Nl(e,o.x,c.x,u.x),Nl(e,o.y,c.y,u.y)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ey extends Ta{constructor(e=new V,n=new V,a=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=a}getPoint(e,n=new V){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(Nl(e,o.x,c.x,u.x),Nl(e,o.y,c.y,u.y),Nl(e,o.z,c.z,u.z)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ty extends Ta{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new Pe){const a=n,o=this.points,c=(o.length-1)*e,u=Math.floor(c),h=c-u,d=o[u===0?u:u-1],p=o[u],g=o[u>o.length-2?o.length-1:u+1],_=o[u>o.length-3?o.length-1:u+2];return a.set(C_(h,d.x,p.x,g.x,_.x),C_(h,d.y,p.y,g.y,_.y)),a}copy(e){super.copy(e),this.points=[];for(let n=0,a=e.points.length;n<a;n++){const o=e.points[n];this.points.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];e.points.push(o.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,a=e.points.length;n<a;n++){const o=e.points[n];this.points.push(new Pe().fromArray(o))}return this}}var Vu=Object.freeze({__proto__:null,ArcCurve:ub,CatmullRomCurve3:pr,CubicBezierCurve:Jx,CubicBezierCurve3:_b,EllipseCurve:$p,LineCurve:jx,LineCurve3:xb,QuadraticBezierCurve:$x,QuadraticBezierCurve3:ey,SplineCurve:ty});class yb extends Ta{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const a=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Vu[a](n,e))}return this}getPoint(e,n){const a=e*this.getLength(),o=this.getCurveLengths();let c=0;for(;c<o.length;){if(o[c]>=a){const u=o[c]-a,h=this.curves[c],d=h.getLength(),p=d===0?0:1-u/d;return h.getPointAt(p,n)}c++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let a=0;a<=e;a++)n.push(this.getPoint(a/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let a;for(let o=0,c=this.curves;o<c.length;o++){const u=c[o],h=u.isEllipseCurve?e*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?e*u.points.length:e,d=u.getPoints(h);for(let p=0;p<d.length;p++){const g=d[p];a&&a.equals(g)||(n.push(g),a=g)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,a=e.curves.length;n<a;n++){const o=e.curves[n];this.curves.push(o.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];e.curves.push(o.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,a=e.curves.length;n<a;n++){const o=e.curves[n];this.curves.push(new Vu[o.type]().fromJSON(o))}return this}}class D_ extends yb{constructor(e){super(),this.type="Path",this.currentPoint=new Pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,a=e.length;n<a;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const a=new jx(this.currentPoint.clone(),new Pe(e,n));return this.curves.push(a),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,a,o){const c=new $x(this.currentPoint.clone(),new Pe(e,n),new Pe(a,o));return this.curves.push(c),this.currentPoint.set(a,o),this}bezierCurveTo(e,n,a,o,c,u){const h=new Jx(this.currentPoint.clone(),new Pe(e,n),new Pe(a,o),new Pe(c,u));return this.curves.push(h),this.currentPoint.set(c,u),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),a=new ty(n);return this.curves.push(a),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,a,o,c,u){const h=this.currentPoint.x,d=this.currentPoint.y;return this.absarc(e+h,n+d,a,o,c,u),this}absarc(e,n,a,o,c,u){return this.absellipse(e,n,a,a,o,c,u),this}ellipse(e,n,a,o,c,u,h,d){const p=this.currentPoint.x,g=this.currentPoint.y;return this.absellipse(e+p,n+g,a,o,c,u,h,d),this}absellipse(e,n,a,o,c,u,h,d){const p=new $p(e,n,a,o,c,u,h,d);if(this.curves.length>0){const _=p.getPoint(0);_.equals(this.currentPoint)||this.lineTo(_.x,_.y)}this.curves.push(p);const g=p.getPoint(1);return this.currentPoint.copy(g),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ny extends D_{constructor(e){super(e),this.uuid=vr(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,a=e.holes.length;n<a;n++){const o=e.holes[n];this.holes.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];e.holes.push(o.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,a=e.holes.length;n<a;n++){const o=e.holes[n];this.holes.push(new D_().fromJSON(o))}return this}}function Sb(r,e,n=2){const a=e&&e.length,o=a?e[0]*n:r.length;let c=iy(r,0,o,n,!0);const u=[];if(!c||c.next===c.prev)return u;let h,d,p;if(a&&(c=Tb(r,e,c,n)),r.length>80*n){h=r[0],d=r[1];let g=h,_=d;for(let v=n;v<o;v+=n){const x=r[v],b=r[v+1];x<h&&(h=x),b<d&&(d=b),x>g&&(g=x),b>_&&(_=b)}p=Math.max(g-h,_-d),p=p!==0?32767/p:0}return Vl(c,u,n,h,d,p,0),u}function iy(r,e,n,a,o){let c;if(o===Fb(r,e,n,a)>0)for(let u=e;u<n;u+=a)c=U_(u/a|0,r[u],r[u+1],c);else for(let u=n-a;u>=e;u-=a)c=U_(u/a|0,r[u],r[u+1],c);return c&&Eo(c,c.next)&&(Wl(c),c=c.next),c}function mr(r,e){if(!r)return r;e||(e=r);let n=r,a;do if(a=!1,!n.steiner&&(Eo(n,n.next)||vn(n.prev,n,n.next)===0)){if(Wl(n),n=e=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==e);return e}function Vl(r,e,n,a,o,c,u){if(!r)return;!u&&c&&Ub(r,a,o,c);let h=r;for(;r.prev!==r.next;){const d=r.prev,p=r.next;if(c?bb(r,a,o,c):Mb(r)){e.push(d.i,r.i,p.i),Wl(r),r=p.next,h=p.next;continue}if(r=p,r===h){u?u===1?(r=Eb(mr(r),e),Vl(r,e,n,a,o,c,2)):u===2&&wb(r,e,n,a,o,c):Vl(mr(r),e,n,a,o,c,1);break}}}function Mb(r){const e=r.prev,n=r,a=r.next;if(vn(e,n,a)>=0)return!1;const o=e.x,c=n.x,u=a.x,h=e.y,d=n.y,p=a.y,g=Math.min(o,c,u),_=Math.min(h,d,p),v=Math.max(o,c,u),x=Math.max(h,d,p);let b=a.next;for(;b!==e;){if(b.x>=g&&b.x<=v&&b.y>=_&&b.y<=x&&Al(o,h,c,d,u,p,b.x,b.y)&&vn(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function bb(r,e,n,a){const o=r.prev,c=r,u=r.next;if(vn(o,c,u)>=0)return!1;const h=o.x,d=c.x,p=u.x,g=o.y,_=c.y,v=u.y,x=Math.min(h,d,p),b=Math.min(g,_,v),A=Math.max(h,d,p),S=Math.max(g,_,v),y=Up(x,b,e,n,a),C=Up(A,S,e,n,a);let z=r.prevZ,T=r.nextZ;for(;z&&z.z>=y&&T&&T.z<=C;){if(z.x>=x&&z.x<=A&&z.y>=b&&z.y<=S&&z!==o&&z!==u&&Al(h,g,d,_,p,v,z.x,z.y)&&vn(z.prev,z,z.next)>=0||(z=z.prevZ,T.x>=x&&T.x<=A&&T.y>=b&&T.y<=S&&T!==o&&T!==u&&Al(h,g,d,_,p,v,T.x,T.y)&&vn(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;z&&z.z>=y;){if(z.x>=x&&z.x<=A&&z.y>=b&&z.y<=S&&z!==o&&z!==u&&Al(h,g,d,_,p,v,z.x,z.y)&&vn(z.prev,z,z.next)>=0)return!1;z=z.prevZ}for(;T&&T.z<=C;){if(T.x>=x&&T.x<=A&&T.y>=b&&T.y<=S&&T!==o&&T!==u&&Al(h,g,d,_,p,v,T.x,T.y)&&vn(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function Eb(r,e){let n=r;do{const a=n.prev,o=n.next.next;!Eo(a,o)&&sy(a,n,n.next,o)&&kl(a,o)&&kl(o,a)&&(e.push(a.i,n.i,o.i),Wl(n),Wl(n.next),n=r=o),n=n.next}while(n!==r);return mr(n)}function wb(r,e,n,a,o,c){let u=r;do{let h=u.next.next;for(;h!==u.prev;){if(u.i!==h.i&&Pb(u,h)){let d=ry(u,h);u=mr(u,u.next),d=mr(d,d.next),Vl(u,e,n,a,o,c,0),Vl(d,e,n,a,o,c,0);return}h=h.next}u=u.next}while(u!==r)}function Tb(r,e,n,a){const o=[];for(let c=0,u=e.length;c<u;c++){const h=e[c]*a,d=c<u-1?e[c+1]*a:r.length,p=iy(r,h,d,a,!1);p===p.next&&(p.steiner=!0),o.push(Nb(p))}o.sort(Ab);for(let c=0;c<o.length;c++)n=Rb(o[c],n);return n}function Ab(r,e){let n=r.x-e.x;if(n===0&&(n=r.y-e.y,n===0)){const a=(r.next.y-r.y)/(r.next.x-r.x),o=(e.next.y-e.y)/(e.next.x-e.x);n=a-o}return n}function Rb(r,e){const n=Cb(r,e);if(!n)return e;const a=ry(n,r);return mr(a,a.next),mr(n,n.next)}function Cb(r,e){let n=e;const a=r.x,o=r.y;let c=-1/0,u;if(Eo(r,n))return n;do{if(Eo(r,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const _=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(_<=a&&_>c&&(c=_,u=n.x<n.next.x?n:n.next,_===a))return u}n=n.next}while(n!==e);if(!u)return null;const h=u,d=u.x,p=u.y;let g=1/0;n=u;do{if(a>=n.x&&n.x>=d&&a!==n.x&&ay(o<p?a:c,o,d,p,o<p?c:a,o,n.x,n.y)){const _=Math.abs(o-n.y)/(a-n.x);kl(n,r)&&(_<g||_===g&&(n.x>u.x||n.x===u.x&&Db(u,n)))&&(u=n,g=_)}n=n.next}while(n!==h);return u}function Db(r,e){return vn(r.prev,r,e.prev)<0&&vn(e.next,r,r.next)<0}function Ub(r,e,n,a){let o=r;do o.z===0&&(o.z=Up(o.x,o.y,e,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==r);o.prevZ.nextZ=null,o.prevZ=null,Lb(o)}function Lb(r){let e,n=1;do{let a=r,o;r=null;let c=null;for(e=0;a;){e++;let u=a,h=0;for(let p=0;p<n&&(h++,u=u.nextZ,!!u);p++);let d=n;for(;h>0||d>0&&u;)h!==0&&(d===0||!u||a.z<=u.z)?(o=a,a=a.nextZ,h--):(o=u,u=u.nextZ,d--),c?c.nextZ=o:r=o,o.prevZ=c,c=o;a=u}c.nextZ=null,n*=2}while(e>1);return r}function Up(r,e,n,a,o){return r=(r-n)*o|0,e=(e-a)*o|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Nb(r){let e=r,n=r;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==r);return n}function ay(r,e,n,a,o,c,u,h){return(o-u)*(e-h)>=(r-u)*(c-h)&&(r-u)*(a-h)>=(n-u)*(e-h)&&(n-u)*(c-h)>=(o-u)*(a-h)}function Al(r,e,n,a,o,c,u,h){return!(r===u&&e===h)&&ay(r,e,n,a,o,c,u,h)}function Pb(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Ob(r,e)&&(kl(r,e)&&kl(e,r)&&zb(r,e)&&(vn(r.prev,r,e.prev)||vn(r,e.prev,e))||Eo(r,e)&&vn(r.prev,r,r.next)>0&&vn(e.prev,e,e.next)>0)}function vn(r,e,n){return(e.y-r.y)*(n.x-e.x)-(e.x-r.x)*(n.y-e.y)}function Eo(r,e){return r.x===e.x&&r.y===e.y}function sy(r,e,n,a){const o=wu(vn(r,e,n)),c=wu(vn(r,e,a)),u=wu(vn(n,a,r)),h=wu(vn(n,a,e));return!!(o!==c&&u!==h||o===0&&Eu(r,n,e)||c===0&&Eu(r,a,e)||u===0&&Eu(n,r,a)||h===0&&Eu(n,e,a))}function Eu(r,e,n){return e.x<=Math.max(r.x,n.x)&&e.x>=Math.min(r.x,n.x)&&e.y<=Math.max(r.y,n.y)&&e.y>=Math.min(r.y,n.y)}function wu(r){return r>0?1:r<0?-1:0}function Ob(r,e){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==e.i&&n.next.i!==e.i&&sy(n,n.next,r,e))return!0;n=n.next}while(n!==r);return!1}function kl(r,e){return vn(r.prev,r,r.next)<0?vn(r,e,r.next)>=0&&vn(r,r.prev,e)>=0:vn(r,e,r.prev)<0||vn(r,r.next,e)<0}function zb(r,e){let n=r,a=!1;const o=(r.x+e.x)/2,c=(r.y+e.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&o<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==r);return a}function ry(r,e){const n=Lp(r.i,r.x,r.y),a=Lp(e.i,e.x,e.y),o=r.next,c=e.prev;return r.next=e,e.prev=r,n.next=o,o.prev=n,a.next=n,n.prev=a,c.next=a,a.prev=c,a}function U_(r,e,n,a){const o=Lp(r,e,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function Wl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Lp(r,e,n){return{i:r,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Fb(r,e,n,a){let o=0;for(let c=e,u=n-a;c<n;c+=a)o+=(r[u]-r[c])*(r[c+1]+r[u+1]),u=c;return o}class Bb{static triangulate(e,n,a=2){return Sb(e,n,a)}}class vo{static area(e){const n=e.length;let a=0;for(let o=n-1,c=0;c<n;o=c++)a+=e[o].x*e[c].y-e[c].x*e[o].y;return a*.5}static isClockWise(e){return vo.area(e)<0}static triangulateShape(e,n){const a=[],o=[],c=[];L_(e),N_(a,e);let u=e.length;n.forEach(L_);for(let d=0;d<n.length;d++)o.push(u),u+=n[d].length,N_(a,n[d]);const h=Bb.triangulate(a,o);for(let d=0;d<h.length;d+=3)c.push(h.slice(d,d+3));return c}}function L_(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function N_(r,e){for(let n=0;n<e.length;n++)r.push(e[n].x),r.push(e[n].y)}class t0 extends Bn{constructor(e=new ny([new Pe(.5,.5),new Pe(-.5,.5),new Pe(-.5,-.5),new Pe(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];const a=this,o=[],c=[];for(let h=0,d=e.length;h<d;h++){const p=e[h];u(p)}this.setAttribute("position",new Wt(o,3)),this.setAttribute("uv",new Wt(c,2)),this.computeVertexNormals();function u(h){const d=[],p=n.curveSegments!==void 0?n.curveSegments:12,g=n.steps!==void 0?n.steps:1,_=n.depth!==void 0?n.depth:1;let v=n.bevelEnabled!==void 0?n.bevelEnabled:!0,x=n.bevelThickness!==void 0?n.bevelThickness:.2,b=n.bevelSize!==void 0?n.bevelSize:x-.1,A=n.bevelOffset!==void 0?n.bevelOffset:0,S=n.bevelSegments!==void 0?n.bevelSegments:3;const y=n.extrudePath,C=n.UVGenerator!==void 0?n.UVGenerator:Ib;let z,T=!1,F,U,O,E;if(y){z=y.getSpacedPoints(g),T=!0,v=!1;const de=y.isCatmullRomCurve3?y.closed:!1;F=y.computeFrenetFrames(g,de),U=new V,O=new V,E=new V}v||(S=0,x=0,b=0,A=0);const L=h.extractPoints(p);let H=L.shape;const G=L.holes;if(!vo.isClockWise(H)){H=H.reverse();for(let de=0,Ee=G.length;de<Ee;de++){const Te=G[de];vo.isClockWise(Te)&&(G[de]=Te.reverse())}}function K(de){const Te=10000000000000001e-36;let Ne=de[0];for(let Oe=1;Oe<=de.length;Oe++){const at=Oe%de.length,Be=de[at],pt=Be.x-Ne.x,rt=Be.y-Ne.y,Z=pt*pt+rt*rt,mt=Math.max(Math.abs(Be.x),Math.abs(Be.y),Math.abs(Ne.x),Math.abs(Ne.y)),Mt=Te*mt*mt;if(Z<=Mt){de.splice(at,1),Oe--;continue}Ne=Be}}K(H),G.forEach(K);const B=G.length,W=H;for(let de=0;de<B;de++){const Ee=G[de];H=H.concat(Ee)}function P(de,Ee,Te){return Ee||It("ExtrudeGeometry: vec does not exist"),de.clone().addScaledVector(Ee,Te)}const k=H.length;function ne(de,Ee,Te){let Ne,Oe,at;const Be=de.x-Ee.x,pt=de.y-Ee.y,rt=Te.x-de.x,Z=Te.y-de.y,mt=Be*Be+pt*pt,Mt=Be*Z-pt*rt;if(Math.abs(Mt)>Number.EPSILON){const I=Math.sqrt(mt),w=Math.sqrt(rt*rt+Z*Z),te=Ee.x-pt/I,ce=Ee.y+Be/I,_e=Te.x-Z/w,ze=Te.y+rt/w,Ve=((_e-te)*Z-(ze-ce)*rt)/(Be*Z-pt*rt);Ne=te+Be*Ve-de.x,Oe=ce+pt*Ve-de.y;const ge=Ne*Ne+Oe*Oe;if(ge<=2)return new Pe(Ne,Oe);at=Math.sqrt(ge/2)}else{let I=!1;Be>Number.EPSILON?rt>Number.EPSILON&&(I=!0):Be<-Number.EPSILON?rt<-Number.EPSILON&&(I=!0):Math.sign(pt)===Math.sign(Z)&&(I=!0),I?(Ne=-pt,Oe=Be,at=Math.sqrt(mt)):(Ne=Be,Oe=pt,at=Math.sqrt(mt/2))}return new Pe(Ne/at,Oe/at)}const J=[];for(let de=0,Ee=W.length,Te=Ee-1,Ne=de+1;de<Ee;de++,Te++,Ne++)Te===Ee&&(Te=0),Ne===Ee&&(Ne=0),J[de]=ne(W[de],W[Te],W[Ne]);const ee=[];let N,Q=J.concat();for(let de=0,Ee=B;de<Ee;de++){const Te=G[de];N=[];for(let Ne=0,Oe=Te.length,at=Oe-1,Be=Ne+1;Ne<Oe;Ne++,at++,Be++)at===Oe&&(at=0),Be===Oe&&(Be=0),N[Ne]=ne(Te[Ne],Te[at],Te[Be]);ee.push(N),Q=Q.concat(N)}let ue;if(S===0)ue=vo.triangulateShape(W,G);else{const de=[],Ee=[];for(let Te=0;Te<S;Te++){const Ne=Te/S,Oe=x*Math.cos(Ne*Math.PI/2),at=b*Math.sin(Ne*Math.PI/2)+A;for(let Be=0,pt=W.length;Be<pt;Be++){const rt=P(W[Be],J[Be],at);oe(rt.x,rt.y,-Oe),Ne===0&&de.push(rt)}for(let Be=0,pt=B;Be<pt;Be++){const rt=G[Be];N=ee[Be];const Z=[];for(let mt=0,Mt=rt.length;mt<Mt;mt++){const I=P(rt[mt],N[mt],at);oe(I.x,I.y,-Oe),Ne===0&&Z.push(I)}Ne===0&&Ee.push(Z)}}ue=vo.triangulateShape(de,Ee)}const Ue=ue.length,Fe=b+A;for(let de=0;de<k;de++){const Ee=v?P(H[de],Q[de],Fe):H[de];T?(O.copy(F.normals[0]).multiplyScalar(Ee.x),U.copy(F.binormals[0]).multiplyScalar(Ee.y),E.copy(z[0]).add(O).add(U),oe(E.x,E.y,E.z)):oe(Ee.x,Ee.y,0)}for(let de=1;de<=g;de++)for(let Ee=0;Ee<k;Ee++){const Te=v?P(H[Ee],Q[Ee],Fe):H[Ee];T?(O.copy(F.normals[de]).multiplyScalar(Te.x),U.copy(F.binormals[de]).multiplyScalar(Te.y),E.copy(z[de]).add(O).add(U),oe(E.x,E.y,E.z)):oe(Te.x,Te.y,_/g*de)}for(let de=S-1;de>=0;de--){const Ee=de/S,Te=x*Math.cos(Ee*Math.PI/2),Ne=b*Math.sin(Ee*Math.PI/2)+A;for(let Oe=0,at=W.length;Oe<at;Oe++){const Be=P(W[Oe],J[Oe],Ne);oe(Be.x,Be.y,_+Te)}for(let Oe=0,at=G.length;Oe<at;Oe++){const Be=G[Oe];N=ee[Oe];for(let pt=0,rt=Be.length;pt<rt;pt++){const Z=P(Be[pt],N[pt],Ne);T?oe(Z.x,Z.y+z[g-1].y,z[g-1].x+Te):oe(Z.x,Z.y,_+Te)}}}Ke(),re();function Ke(){const de=o.length/3;if(v){let Ee=0,Te=k*Ee;for(let Ne=0;Ne<Ue;Ne++){const Oe=ue[Ne];ve(Oe[2]+Te,Oe[1]+Te,Oe[0]+Te)}Ee=g+S*2,Te=k*Ee;for(let Ne=0;Ne<Ue;Ne++){const Oe=ue[Ne];ve(Oe[0]+Te,Oe[1]+Te,Oe[2]+Te)}}else{for(let Ee=0;Ee<Ue;Ee++){const Te=ue[Ee];ve(Te[2],Te[1],Te[0])}for(let Ee=0;Ee<Ue;Ee++){const Te=ue[Ee];ve(Te[0]+k*g,Te[1]+k*g,Te[2]+k*g)}}a.addGroup(de,o.length/3-de,0)}function re(){const de=o.length/3;let Ee=0;ye(W,Ee),Ee+=W.length;for(let Te=0,Ne=G.length;Te<Ne;Te++){const Oe=G[Te];ye(Oe,Ee),Ee+=Oe.length}a.addGroup(de,o.length/3-de,1)}function ye(de,Ee){let Te=de.length;for(;--Te>=0;){const Ne=Te;let Oe=Te-1;Oe<0&&(Oe=de.length-1);for(let at=0,Be=g+S*2;at<Be;at++){const pt=k*at,rt=k*(at+1),Z=Ee+Ne+pt,mt=Ee+Oe+pt,Mt=Ee+Oe+rt,I=Ee+Ne+rt;me(Z,mt,Mt,I)}}}function oe(de,Ee,Te){d.push(de),d.push(Ee),d.push(Te)}function ve(de,Ee,Te){Ae(de),Ae(Ee),Ae(Te);const Ne=o.length/3,Oe=C.generateTopUV(a,o,Ne-3,Ne-2,Ne-1);qe(Oe[0]),qe(Oe[1]),qe(Oe[2])}function me(de,Ee,Te,Ne){Ae(de),Ae(Ee),Ae(Ne),Ae(Ee),Ae(Te),Ae(Ne);const Oe=o.length/3,at=C.generateSideWallUV(a,o,Oe-6,Oe-3,Oe-2,Oe-1);qe(at[0]),qe(at[1]),qe(at[3]),qe(at[1]),qe(at[2]),qe(at[3])}function Ae(de){o.push(d[de*3+0]),o.push(d[de*3+1]),o.push(d[de*3+2])}function qe(de){c.push(de.x),c.push(de.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes,a=this.parameters.options;return Hb(n,a,e)}static fromJSON(e,n){const a=[];for(let c=0,u=e.shapes.length;c<u;c++){const h=n[e.shapes[c]];a.push(h)}const o=e.options.extrudePath;return o!==void 0&&(e.options.extrudePath=new Vu[o.type]().fromJSON(o)),new t0(a,e.options)}}const Ib={generateTopUV:function(r,e,n,a,o){const c=e[n*3],u=e[n*3+1],h=e[a*3],d=e[a*3+1],p=e[o*3],g=e[o*3+1];return[new Pe(c,u),new Pe(h,d),new Pe(p,g)]},generateSideWallUV:function(r,e,n,a,o,c){const u=e[n*3],h=e[n*3+1],d=e[n*3+2],p=e[a*3],g=e[a*3+1],_=e[a*3+2],v=e[o*3],x=e[o*3+1],b=e[o*3+2],A=e[c*3],S=e[c*3+1],y=e[c*3+2];return Math.abs(h-g)<Math.abs(u-p)?[new Pe(u,1-d),new Pe(p,1-_),new Pe(v,1-b),new Pe(A,1-y)]:[new Pe(h,1-d),new Pe(g,1-_),new Pe(x,1-b),new Pe(S,1-y)]}};function Hb(r,e,n){if(n.shapes=[],Array.isArray(r))for(let a=0,o=r.length;a<o;a++){const c=r[a];n.shapes.push(c.uuid)}else n.shapes.push(r.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}class fr extends Bn{constructor(e=[new Pe(0,-.5),new Pe(.5,0),new Pe(0,.5)],n=12,a=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:a,phiLength:o},n=Math.floor(n),o=At(o,0,Math.PI*2);const c=[],u=[],h=[],d=[],p=[],g=1/n,_=new V,v=new Pe,x=new V,b=new V,A=new V;let S=0,y=0;for(let C=0;C<=e.length-1;C++)switch(C){case 0:S=e[C+1].x-e[C].x,y=e[C+1].y-e[C].y,x.x=y*1,x.y=-S,x.z=y*0,A.copy(x),x.normalize(),d.push(x.x,x.y,x.z);break;case e.length-1:d.push(A.x,A.y,A.z);break;default:S=e[C+1].x-e[C].x,y=e[C+1].y-e[C].y,x.x=y*1,x.y=-S,x.z=y*0,b.copy(x),x.x+=A.x,x.y+=A.y,x.z+=A.z,x.normalize(),d.push(x.x,x.y,x.z),A.copy(b)}for(let C=0;C<=n;C++){const z=a+C*g*o,T=Math.sin(z),F=Math.cos(z);for(let U=0;U<=e.length-1;U++){_.x=e[U].x*T,_.y=e[U].y,_.z=e[U].x*F,u.push(_.x,_.y,_.z),v.x=C/n,v.y=U/(e.length-1),h.push(v.x,v.y);const O=d[3*U+0]*T,E=d[3*U+1],L=d[3*U+0]*F;p.push(O,E,L)}}for(let C=0;C<n;C++)for(let z=0;z<e.length-1;z++){const T=z+C*e.length,F=T,U=T+e.length,O=T+e.length+1,E=T+1;c.push(F,U,E),c.push(O,E,U)}this.setIndex(c),this.setAttribute("position",new Wt(u,3)),this.setAttribute("uv",new Wt(h,2)),this.setAttribute("normal",new Wt(p,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fr(e.points,e.segments,e.phiStart,e.phiLength)}}class ei extends Bn{constructor(e=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:a,heightSegments:o};const c=e/2,u=n/2,h=Math.floor(a),d=Math.floor(o),p=h+1,g=d+1,_=e/h,v=n/d,x=[],b=[],A=[],S=[];for(let y=0;y<g;y++){const C=y*v-u;for(let z=0;z<p;z++){const T=z*_-c;b.push(T,-C,0),A.push(0,0,1),S.push(z/h),S.push(1-y/d)}}for(let y=0;y<d;y++)for(let C=0;C<h;C++){const z=C+p*y,T=C+p*(y+1),F=C+1+p*(y+1),U=C+1+p*y;x.push(z,T,U),x.push(T,F,U)}this.setIndex(x),this.setAttribute("position",new Wt(b,3)),this.setAttribute("normal",new Wt(A,3)),this.setAttribute("uv",new Wt(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ei(e.width,e.height,e.widthSegments,e.heightSegments)}}class ba extends Bn{constructor(e=1,n=32,a=16,o=0,c=Math.PI*2,u=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:a,phiStart:o,phiLength:c,thetaStart:u,thetaLength:h},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const d=Math.min(u+h,Math.PI);let p=0;const g=[],_=new V,v=new V,x=[],b=[],A=[],S=[];for(let y=0;y<=a;y++){const C=[],z=y/a,T=u+z*h,F=e*Math.cos(T),U=Math.sqrt(e*e-F*F);let O=0;y===0&&u===0?O=.5/n:y===a&&d===Math.PI&&(O=-.5/n);for(let E=0;E<=n;E++){const L=E/n,H=o+L*c;_.x=-U*Math.cos(H),_.y=F,_.z=U*Math.sin(H),b.push(_.x,_.y,_.z),v.copy(_).normalize(),A.push(v.x,v.y,v.z),S.push(L+O,1-z),C.push(p++)}g.push(C)}for(let y=0;y<a;y++)for(let C=0;C<n;C++){const z=g[y][C+1],T=g[y][C],F=g[y+1][C],U=g[y+1][C+1];(y!==0||u>0)&&x.push(z,T,U),(y!==a-1||d<Math.PI)&&x.push(T,F,U)}this.setIndex(x),this.setAttribute("position",new Wt(b,3)),this.setAttribute("normal",new Wt(A,3)),this.setAttribute("uv",new Wt(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ba(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ur extends Bn{constructor(e=1,n=.4,a=12,o=48,c=Math.PI*2,u=0,h=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:a,tubularSegments:o,arc:c,thetaStart:u,thetaLength:h},a=Math.floor(a),o=Math.floor(o);const d=[],p=[],g=[],_=[],v=new V,x=new V,b=new V;for(let A=0;A<=a;A++){const S=u+A/a*h;for(let y=0;y<=o;y++){const C=y/o*c;x.x=(e+n*Math.cos(S))*Math.cos(C),x.y=(e+n*Math.cos(S))*Math.sin(C),x.z=n*Math.sin(S),p.push(x.x,x.y,x.z),v.x=e*Math.cos(C),v.y=e*Math.sin(C),b.subVectors(x,v).normalize(),g.push(b.x,b.y,b.z),_.push(y/o),_.push(A/a)}}for(let A=1;A<=a;A++)for(let S=1;S<=o;S++){const y=(o+1)*A+S-1,C=(o+1)*(A-1)+S-1,z=(o+1)*(A-1)+S,T=(o+1)*A+S;d.push(y,C,T),d.push(C,z,T)}this.setIndex(d),this.setAttribute("position",new Wt(p,3)),this.setAttribute("normal",new Wt(g,3)),this.setAttribute("uv",new Wt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ur(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}class Bs extends Bn{constructor(e=new ey(new V(-1,-1,0),new V(-1,1,0),new V(1,1,0)),n=64,a=1,o=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:n,radius:a,radialSegments:o,closed:c};const u=e.computeFrenetFrames(n,c);this.tangents=u.tangents,this.normals=u.normals,this.binormals=u.binormals;const h=new V,d=new V,p=new Pe;let g=new V;const _=[],v=[],x=[],b=[];A(),this.setIndex(b),this.setAttribute("position",new Wt(_,3)),this.setAttribute("normal",new Wt(v,3)),this.setAttribute("uv",new Wt(x,2));function A(){for(let z=0;z<n;z++)S(z);S(c===!1?n:0),C(),y()}function S(z){g=e.getPointAt(z/n,g);const T=u.normals[z],F=u.binormals[z];for(let U=0;U<=o;U++){const O=U/o*Math.PI*2,E=Math.sin(O),L=-Math.cos(O);d.x=L*T.x+E*F.x,d.y=L*T.y+E*F.y,d.z=L*T.z+E*F.z,d.normalize(),v.push(d.x,d.y,d.z),h.x=g.x+a*d.x,h.y=g.y+a*d.y,h.z=g.z+a*d.z,_.push(h.x,h.y,h.z)}}function y(){for(let z=1;z<=n;z++)for(let T=1;T<=o;T++){const F=(o+1)*(z-1)+(T-1),U=(o+1)*z+(T-1),O=(o+1)*z+T,E=(o+1)*(z-1)+T;b.push(F,U,E),b.push(U,O,E)}}function C(){for(let z=0;z<=n;z++)for(let T=0;T<=o;T++)p.x=z/n,p.y=T/o,x.push(p.x,p.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Bs(new Vu[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function wo(r){const e={};for(const n in r){e[n]={};for(const a in r[n]){const o=r[n][a];if(P_(o))o.isRenderTargetTexture?(St("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][a]=null):e[n][a]=o.clone();else if(Array.isArray(o))if(P_(o[0])){const c=[];for(let u=0,h=o.length;u<h;u++)c[u]=o[u].clone();e[n][a]=c}else e[n][a]=o.slice();else e[n][a]=o}}return e}function ui(r){const e={};for(let n=0;n<r.length;n++){const a=wo(r[n]);for(const o in a)e[o]=a[o]}return e}function P_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Gb(r){const e=[];for(let n=0;n<r.length;n++)e.push(r[n].clone());return e}function oy(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ht.workingColorSpace}const ly={clone:wo,merge:ui};var Vb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends Zl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vb,this.fragmentShader=kb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wo(e.uniforms),this.uniformsGroups=Gb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const a in e.uniforms){const o=e.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new tt().setHex(o.value);break;case"v2":this.uniforms[a].value=new Pe().fromArray(o.value);break;case"v3":this.uniforms[a].value=new V().fromArray(o.value);break;case"v4":this.uniforms[a].value=new Jt().fromArray(o.value);break;case"m3":this.uniforms[a].value=new Et().fromArray(o.value);break;case"m4":this.uniforms[a].value=new Ft().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const a in e.extensions)this.extensions[a]=e.extensions[a];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Wb extends ai{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ni extends Zl{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cp,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new as,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wa extends ni{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return At(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new tt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new tt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new tt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Xb extends Zl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qb extends Zl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const O_={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(z_(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!z_(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function z_(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Yb{constructor(e,n,a){const o=this;let c=!1,u=0,h=0,d;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=a,this._abortController=null,this.itemStart=function(g){h++,c===!1&&o.onStart!==void 0&&o.onStart(g,u,h),c=!0},this.itemEnd=function(g){u++,o.onProgress!==void 0&&o.onProgress(g,u,h),u===h&&(c=!1,o.onLoad!==void 0&&o.onLoad())},this.itemError=function(g){o.onError!==void 0&&o.onError(g)},this.resolveURL=function(g){return g=g.normalize("NFC"),d?d(g):g},this.setURLModifier=function(g){return d=g,this},this.addHandler=function(g,_){return p.push(g,_),this},this.removeHandler=function(g){const _=p.indexOf(g);return _!==-1&&p.splice(_,2),this},this.getHandler=function(g){for(let _=0,v=p.length;_<v;_+=2){const x=p[_],b=p[_+1];if(x.global&&(x.lastIndex=0),x.test(g))return b}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Zb=new Yb;class n0{constructor(e){this.manager=e!==void 0?e:Zb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,n){const a=this;return new Promise(function(o,c){a.load(e,o,n,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}n0.DEFAULT_MATERIAL_NAME="__DEFAULT";const Qa={};class Kb extends Error{constructor(e,n){super(e),this.response=n}}class Qb extends n0{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,n,a,o){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=O_.get(`file:${e}`);if(c!==void 0){this.manager.itemStart(e),setTimeout(()=>{n&&n(c),this.manager.itemEnd(e)},0);return}if(Qa[e]!==void 0){Qa[e].push({onLoad:n,onProgress:a,onError:o});return}Qa[e]=[],Qa[e].push({onLoad:n,onProgress:a,onError:o});const u=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),h=this.mimeType,d=this.responseType;fetch(u).then(p=>{if(p.status===200||p.status===0){if(p.status===0&&St("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||p.body===void 0||p.body.getReader===void 0)return p;const g=Qa[e],_=p.body.getReader(),v=p.headers.get("X-File-Size")||p.headers.get("Content-Length"),x=v?parseInt(v):0,b=x!==0;let A=0;const S=new ReadableStream({start(y){C();function C(){_.read().then(({done:z,value:T})=>{if(z)y.close();else{A+=T.byteLength;const F=new ProgressEvent("progress",{lengthComputable:b,loaded:A,total:x});for(let U=0,O=g.length;U<O;U++){const E=g[U];E.onProgress&&E.onProgress(F)}y.enqueue(T),C()}},z=>{y.error(z)})}}});return new Response(S)}else throw new Kb(`fetch for "${p.url}" responded with ${p.status}: ${p.statusText}`,p)}).then(p=>{switch(d){case"arraybuffer":return p.arrayBuffer();case"blob":return p.blob();case"document":return p.text().then(g=>new DOMParser().parseFromString(g,h));case"json":return p.json();default:if(h==="")return p.text();{const _=/charset="?([^;"\s]*)"?/i.exec(h),v=_&&_[1]?_[1].toLowerCase():void 0,x=new TextDecoder(v);return p.arrayBuffer().then(b=>x.decode(b))}}}).then(p=>{O_.add(`file:${e}`,p);const g=Qa[e];delete Qa[e];for(let _=0,v=g.length;_<v;_++){const x=g[_];x.onLoad&&x.onLoad(p)}}).catch(p=>{const g=Qa[e];if(g===void 0)throw this.manager.itemError(e),p;delete Qa[e];for(let _=0,v=g.length;_<v;_++){const x=g[_];x.onError&&x.onError(p)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Jb extends n0{constructor(e){super(e)}load(e,n,a,o){const c=this,u=new Gu,h=new Qb(this.manager);return h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setPath(this.path),h.setWithCredentials(c.withCredentials),h.load(e,function(d){let p;try{p=c.parse(d)}catch(g){o!==void 0?o(g):It(g);return}c._applyTexData(u,p),n&&n(u,p)},a,o),u}createDataTexture(e){const n=new Gu;return this._applyTexData(n,this.parse(e)),n}_applyTexData(e,n){n.image!==void 0?e.image=n.image:n.data!==void 0&&(e.image.width=n.width,e.image.height=n.height,e.image.data=n.data),e.wrapS=n.wrapS!==void 0?n.wrapS:Ni,e.wrapT=n.wrapT!==void 0?n.wrapT:Ni,e.magFilter=n.magFilter!==void 0?n.magFilter:mn,e.minFilter=n.minFilter!==void 0?n.minFilter:mn,e.anisotropy=n.anisotropy!==void 0?n.anisotropy:1,n.colorSpace!==void 0&&(e.colorSpace=n.colorSpace),n.flipY!==void 0&&(e.flipY=n.flipY),n.format!==void 0&&(e.format=n.format),n.type!==void 0&&(e.type=n.type),n.mipmaps!==void 0&&(e.mipmaps=n.mipmaps,e.minFilter=ya),n.mipmapCount===1&&(e.minFilter=mn),n.generateMipmaps!==void 0&&(e.generateMipmaps=n.generateMipmaps),e.needsUpdate=!0}}class Xu extends On{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=n}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Nd=new Ft,F_=new V,B_=new V;class i0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new Ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jp,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera;F_.setFromMatrixPosition(e.matrixWorld),n.position.copy(F_),B_.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(B_),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(e,n,a,o){Nd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),a.setFromProjectionMatrix(Nd,e.coordinateSystem,e.reversedDepth);const c=this._frameExtents,u=o?o.z/c.x:1,h=o?o.w/c.y:1,d=o?o.x/c.x:0,p=o?o.y/c.y:0;e.coordinateSystem===Gl||e.reversedDepth?n.set(.5*u,0,0,.5*u+d,0,.5*h,0,.5*h+p,0,0,1,0,0,0,0,1):n.set(.5*u,0,0,.5*u+d,0,.5*h,0,.5*h+p,0,0,.5,.5,0,0,0,1),n.multiply(Nd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Tu=new V,Au=new _r,va=new V;class cy extends On{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=Sa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tu,Au,va),va.x===1&&va.y===1&&va.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tu,Au,va.set(1,1,1)).invert()}updateWorldMatrix(e,n,a=!1){super.updateWorldMatrix(e,n,a),this.matrixWorld.decompose(Tu,Au,va),va.x===1&&va.y===1&&va.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tu,Au,va.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ps=new V,I_=new Pe,H_=new Pe;class Si extends cy{constructor(e=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=bo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ul*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bo*2*Math.atan(Math.tan(Ul*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,a){Ps.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ps.x,Ps.y).multiplyScalar(-e/Ps.z),Ps.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(Ps.x,Ps.y).multiplyScalar(-e/Ps.z)}getViewSize(e,n){return this.getViewBounds(e,I_,H_),n.subVectors(H_,I_)}setViewOffset(e,n,a,o,c,u){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Ul*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const d=u.fullWidth,p=u.fullHeight;c+=u.offsetX*o/d,n-=u.offsetY*a/p,o*=u.width/d,a*=u.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class jb extends i0{constructor(){super(new Si(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const n=this.camera,a=bo*2*e.angle*this.focus,o=this.mapSize.width/this.mapSize.height*this.aspect,c=e.distance||n.far;(a!==n.fov||o!==n.aspect||c!==n.far)&&(n.fov=a,n.aspect=o,n.far=c,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class Pd extends Xu{constructor(e,n,a=0,o=Math.PI/3,c=0,u=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.target=new On,this.distance=a,this.angle=o,this.penumbra=c,this.decay=u,this.map=null,this.shadow=new jb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.angle=this.angle,n.object.decay=this.decay,n.object.penumbra=this.penumbra,n.object.target=this.target.uuid,this.map&&this.map.isTexture&&(n.object.map=this.map.toJSON(e).uuid),n.object.shadow=this.shadow.toJSON(),n}}class $b extends i0{constructor(){super(new Si(90,1,.5,500)),this.isPointLightShadow=!0}}class Pu extends Xu{constructor(e,n,a=0,o=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=o,this.shadow=new $b}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class qu extends cy{constructor(e=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-e,u=a+e,h=o+n,d=o-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,u=c+p*this.view.width,h-=g*this.view.offsetY,d=h-g*this.view.height}this.projectionMatrix.makeOrthographic(c,u,h,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class e2 extends i0{constructor(){super(new qu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class t2 extends Xu{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.target=new On,this.shadow=new e2}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const uo=-90,fo=1;class n2 extends On{constructor(e,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Si(uo,fo,e,n);o.layers=this.layers,this.add(o);const c=new Si(uo,fo,e,n);c.layers=this.layers,this.add(c);const u=new Si(uo,fo,e,n);u.layers=this.layers,this.add(u);const h=new Si(uo,fo,e,n);h.layers=this.layers,this.add(h);const d=new Si(uo,fo,e,n);d.layers=this.layers,this.add(d);const p=new Si(uo,fo,e,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,h,d]=n;for(const p of n)this.remove(p);if(e===Sa)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===Gl)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of n)this.add(p),p.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,u,h,d,p,g]=this.children,_=e.getRenderTarget(),v=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const A=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let S=!1;e.isWebGLRenderer===!0?S=e.state.buffers.depth.getReversed():S=e.reversedDepthBuffer,e.setRenderTarget(a,0,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(a,1,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(a,2,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(a,3,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),e.setRenderTarget(a,4,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(n,p),a.texture.generateMipmaps=A,e.setRenderTarget(a,5,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(n,g),e.setRenderTarget(_,v,x),e.xr.enabled=b,a.texture.needsPMREMUpdate=!0}}class i2 extends Si{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const G_=new Ft;class a2{constructor(e,n,a=0,o=1/0){this.ray=new qx(e,n),this.near=a,this.far=o,this.camera=null,this.layers=new Jp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):It("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return G_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(G_),this}intersectObject(e,n=!0,a=[]){return Np(e,this,a,n),a.sort(V_),a}intersectObjects(e,n=!0,a=[]){for(let o=0,c=e.length;o<c;o++)Np(e[o],this,a,n);return a.sort(V_),a}}function V_(r,e){return r.distance-e.distance}function Np(r,e,n,a){let o=!0;if(r.layers.test(e.layers)&&r.raycast(e,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,h=c.length;u<h;u++)Np(c[u],e,n,!0)}}const p0=class p0{constructor(e,n,a,o){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let a=0;a<4;a++)this.elements[a]=e[a+n];return this}set(e,n,a,o){const c=this.elements;return c[0]=e,c[2]=n,c[1]=a,c[3]=o,this}};p0.prototype.isMatrix2=!0;let k_=p0;function W_(r,e,n,a){const o=s2(a);switch(n){case Bx:return r*e;case Wp:return r*e/o.components*o.byteLength;case Xp:return r*e/o.components*o.byteLength;case dr:return r*e*2/o.components*o.byteLength;case qp:return r*e*2/o.components*o.byteLength;case Ix:return r*e*3/o.components*o.byteLength;case Oi:return r*e*4/o.components*o.byteLength;case Yp:return r*e*4/o.components*o.byteLength;case Du:case Uu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Lu:case Nu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ep:case np:return Math.max(r,16)*Math.max(e,8)/4;case $d:case tp:return Math.max(r,8)*Math.max(e,8)/2;case ip:case ap:case rp:case op:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case sp:case Fu:case lp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case cp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case up:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case fp:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case hp:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case dp:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case pp:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case mp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case gp:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case vp:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case _p:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case xp:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case yp:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Sp:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Mp:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case bp:case Ep:case wp:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Tp:case Ap:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Bu:case Rp:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function s2(r){switch(r){case wn:case Px:return{byteLength:1,components:1};case Il:case Ox:case yn:return{byteLength:2,components:1};case Vp:case kp:return{byteLength:2,components:4};case zi:case Gp:case Pi:return{byteLength:4,components:1};case zx:case Fx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ip}}));typeof window<"u"&&(window.__THREE__?St("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ip);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function uy(){let r=null,e=!1,n=null,a=null;function o(c,u){a=r.requestAnimationFrame(o),n(c,u)}return{start:function(){e!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function r2(r){const e=new WeakMap;function n(h,d){const p=h.array,g=h.usage,_=p.byteLength,v=r.createBuffer();r.bindBuffer(d,v),r.bufferData(d,p,g),h.onUploadCallback();let x;if(p instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)x=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)x=r.SHORT;else if(p instanceof Uint32Array)x=r.UNSIGNED_INT;else if(p instanceof Int32Array)x=r.INT;else if(p instanceof Int8Array)x=r.BYTE;else if(p instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:v,type:x,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:_}}function a(h,d,p){const g=d.array,_=d.updateRanges;if(r.bindBuffer(p,h),_.length===0)r.bufferSubData(p,0,g);else{_.sort((x,b)=>x.start-b.start);let v=0;for(let x=1;x<_.length;x++){const b=_[v],A=_[x];A.start<=b.start+b.count+1?b.count=Math.max(b.count,A.start+A.count-b.start):(++v,_[v]=A)}_.length=v+1;for(let x=0,b=_.length;x<b;x++){const A=_[x];r.bufferSubData(p,A.start*g.BYTES_PER_ELEMENT,g,A.start,A.count)}d.clearUpdateRanges()}d.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const d=e.get(h);d&&(r.deleteBuffer(d.buffer),e.delete(h))}function u(h,d){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=e.get(h);(!g||g.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,n(h,d));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,h,d),p.version=h.version}}return{get:o,remove:c,update:u}}var o2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,l2=`#ifdef USE_ALPHAHASH
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
#endif`,c2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,u2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,h2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,d2=`#ifdef USE_AOMAP
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
#endif`,p2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,m2=`#ifdef USE_BATCHING
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
#endif`,g2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,v2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,x2=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,y2=`#ifdef USE_IRIDESCENCE
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
#endif`,S2=`#ifdef USE_BUMPMAP
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
#endif`,M2=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,b2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,E2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,w2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,T2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,A2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,R2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,C2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,D2=`#define PI 3.141592653589793
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
} // validated`,U2=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,L2=`vec3 transformedNormal = objectNormal;
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
#endif`,N2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,O2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,z2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,F2="gl_FragColor = linearToOutputTexel( gl_FragColor );",B2=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,I2=`#ifdef USE_ENVMAP
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
#endif`,H2=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,G2=`#ifdef USE_ENVMAP
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
#endif`,V2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k2=`#ifdef USE_ENVMAP
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
#endif`,W2=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,X2=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,q2=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Y2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Z2=`#ifdef USE_GRADIENTMAP
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
}`,K2=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Q2=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,j2=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,$2=`#ifdef USE_ENVMAP
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
#endif`,eE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,iE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aE=`PhysicalMaterial material;
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
#endif`,sE=`uniform sampler2D dfgLUT;
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
}`,rE=`
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
#endif`,oE=`#if defined( RE_IndirectDiffuse )
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
#endif`,lE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,uE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vE=`#if defined( USE_POINTS_UV )
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
#endif`,_E=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,SE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ME=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bE=`#ifdef USE_MORPHTARGETS
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
#endif`,EE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,TE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,AE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,DE=`#ifdef USE_NORMALMAP
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
#endif`,UE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,LE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,NE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,PE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,OE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,FE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,BE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,IE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,HE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,GE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,VE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,WE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,XE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qE=`float getShadowMask() {
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
}`,YE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ZE=`#ifdef USE_SKINNING
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
#endif`,KE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,QE=`#ifdef USE_SKINNING
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
#endif`,JE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$E=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ew=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tw=`#ifdef USE_TRANSMISSION
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
#endif`,nw=`#ifdef USE_TRANSMISSION
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
#endif`,iw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ow=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lw=`uniform sampler2D t2D;
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
}`,cw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,fw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dw=`#include <common>
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
}`,pw=`#if DEPTH_PACKING == 3200
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
}`,mw=`#define DISTANCE
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
}`,gw=`#define DISTANCE
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
}`,vw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_w=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xw=`uniform float scale;
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
}`,yw=`uniform vec3 diffuse;
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
}`,Sw=`#include <common>
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
}`,Mw=`uniform vec3 diffuse;
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
}`,bw=`#define LAMBERT
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
}`,Ew=`#define LAMBERT
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
}`,ww=`#define MATCAP
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
}`,Tw=`#define MATCAP
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
}`,Aw=`#define NORMAL
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
}`,Rw=`#define NORMAL
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
}`,Cw=`#define PHONG
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
}`,Dw=`#define PHONG
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
}`,Uw=`#define STANDARD
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
}`,Lw=`#define STANDARD
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
}`,Nw=`#define TOON
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
}`,Pw=`#define TOON
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
}`,Ow=`uniform float size;
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
}`,zw=`uniform vec3 diffuse;
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
}`,Fw=`#include <common>
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
}`,Bw=`uniform vec3 color;
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
}`,Iw=`uniform float rotation;
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
}`,Hw=`uniform vec3 diffuse;
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
}`,Dt={alphahash_fragment:o2,alphahash_pars_fragment:l2,alphamap_fragment:c2,alphamap_pars_fragment:u2,alphatest_fragment:f2,alphatest_pars_fragment:h2,aomap_fragment:d2,aomap_pars_fragment:p2,batching_pars_vertex:m2,batching_vertex:g2,begin_vertex:v2,beginnormal_vertex:_2,bsdfs:x2,iridescence_fragment:y2,bumpmap_pars_fragment:S2,clipping_planes_fragment:M2,clipping_planes_pars_fragment:b2,clipping_planes_pars_vertex:E2,clipping_planes_vertex:w2,color_fragment:T2,color_pars_fragment:A2,color_pars_vertex:R2,color_vertex:C2,common:D2,cube_uv_reflection_fragment:U2,defaultnormal_vertex:L2,displacementmap_pars_vertex:N2,displacementmap_vertex:P2,emissivemap_fragment:O2,emissivemap_pars_fragment:z2,colorspace_fragment:F2,colorspace_pars_fragment:B2,envmap_fragment:I2,envmap_common_pars_fragment:H2,envmap_pars_fragment:G2,envmap_pars_vertex:V2,envmap_physical_pars_fragment:$2,envmap_vertex:k2,fog_vertex:W2,fog_pars_vertex:X2,fog_fragment:q2,fog_pars_fragment:Y2,gradientmap_pars_fragment:Z2,lightmap_pars_fragment:K2,lights_lambert_fragment:Q2,lights_lambert_pars_fragment:J2,lights_pars_begin:j2,lights_toon_fragment:eE,lights_toon_pars_fragment:tE,lights_phong_fragment:nE,lights_phong_pars_fragment:iE,lights_physical_fragment:aE,lights_physical_pars_fragment:sE,lights_fragment_begin:rE,lights_fragment_maps:oE,lights_fragment_end:lE,lightprobes_pars_fragment:cE,logdepthbuf_fragment:uE,logdepthbuf_pars_fragment:fE,logdepthbuf_pars_vertex:hE,logdepthbuf_vertex:dE,map_fragment:pE,map_pars_fragment:mE,map_particle_fragment:gE,map_particle_pars_fragment:vE,metalnessmap_fragment:_E,metalnessmap_pars_fragment:xE,morphinstance_vertex:yE,morphcolor_vertex:SE,morphnormal_vertex:ME,morphtarget_pars_vertex:bE,morphtarget_vertex:EE,normal_fragment_begin:wE,normal_fragment_maps:TE,normal_pars_fragment:AE,normal_pars_vertex:RE,normal_vertex:CE,normalmap_pars_fragment:DE,clearcoat_normal_fragment_begin:UE,clearcoat_normal_fragment_maps:LE,clearcoat_pars_fragment:NE,iridescence_pars_fragment:PE,opaque_fragment:OE,packing:zE,premultiplied_alpha_fragment:FE,project_vertex:BE,dithering_fragment:IE,dithering_pars_fragment:HE,roughnessmap_fragment:GE,roughnessmap_pars_fragment:VE,shadowmap_pars_fragment:kE,shadowmap_pars_vertex:WE,shadowmap_vertex:XE,shadowmask_pars_fragment:qE,skinbase_vertex:YE,skinning_pars_vertex:ZE,skinning_vertex:KE,skinnormal_vertex:QE,specularmap_fragment:JE,specularmap_pars_fragment:jE,tonemapping_fragment:$E,tonemapping_pars_fragment:ew,transmission_fragment:tw,transmission_pars_fragment:nw,uv_pars_fragment:iw,uv_pars_vertex:aw,uv_vertex:sw,worldpos_vertex:rw,background_vert:ow,background_frag:lw,backgroundCube_vert:cw,backgroundCube_frag:uw,cube_vert:fw,cube_frag:hw,depth_vert:dw,depth_frag:pw,distance_vert:mw,distance_frag:gw,equirect_vert:vw,equirect_frag:_w,linedashed_vert:xw,linedashed_frag:yw,meshbasic_vert:Sw,meshbasic_frag:Mw,meshlambert_vert:bw,meshlambert_frag:Ew,meshmatcap_vert:ww,meshmatcap_frag:Tw,meshnormal_vert:Aw,meshnormal_frag:Rw,meshphong_vert:Cw,meshphong_frag:Dw,meshphysical_vert:Uw,meshphysical_frag:Lw,meshtoon_vert:Nw,meshtoon_frag:Pw,points_vert:Ow,points_frag:zw,shadow_vert:Fw,shadow_frag:Bw,sprite_vert:Iw,sprite_frag:Hw},je={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Et}},envmap:{envMap:{value:null},envMapRotation:{value:new Et},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Et},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0},uvTransform:{value:new Et}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}}},xa={basic:{uniforms:ui([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:ui([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:ui([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:ui([je.common,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.roughnessmap,je.metalnessmap,je.fog,je.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:ui([je.common,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.gradientmap,je.fog,je.lights,{emissive:{value:new tt(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:ui([je.common,je.bumpmap,je.normalmap,je.displacementmap,je.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:ui([je.points,je.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:ui([je.common,je.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:ui([je.common,je.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:ui([je.common,je.bumpmap,je.normalmap,je.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:ui([je.sprite,je.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Et}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distance:{uniforms:ui([je.common,je.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distance_vert,fragmentShader:Dt.distance_frag},shadow:{uniforms:ui([je.lights,je.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};xa.physical={uniforms:ui([xa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Et},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Et},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Et},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Et},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Et},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Et},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Et}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};const Ru={r:0,b:0,g:0},Gw=new Ft,fy=new Et;fy.set(-1,0,0,0,1,0,0,0,1);function Vw(r,e,n,a,o,c){const u=new tt(0);let h=o===!0?0:1,d,p,g=null,_=0,v=null;function x(C){let z=C.isScene===!0?C.background:null;if(z&&z.isTexture){const T=C.backgroundBlurriness>0;z=e.get(z,T)}return z}function b(C){let z=!1;const T=x(C);T===null?S(u,h):T&&T.isColor&&(S(T,1),z=!0);const F=r.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,c):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||z)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function A(C,z){const T=x(z);T&&(T.isCubeTexture||T.mapping===ql)?(p===void 0&&(p=new rn(new ti(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:wo(xa.backgroundCube.uniforms),vertexShader:xa.backgroundCube.vertexShader,fragmentShader:xa.backgroundCube.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(F,U,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=T,p.material.uniforms.backgroundBlurriness.value=z.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(Gw.makeRotationFromEuler(z.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(fy),p.material.toneMapped=Ht.getTransfer(T.colorSpace)!==en,(g!==T||_!==T.version||v!==r.toneMapping)&&(p.material.needsUpdate=!0,g=T,_=T.version,v=r.toneMapping),p.layers.enableAll(),C.unshift(p,p.geometry,p.material,0,0,null)):T&&T.isTexture&&(d===void 0&&(d=new rn(new ei(2,2),new ai({name:"BackgroundMaterial",uniforms:wo(xa.background.uniforms),vertexShader:xa.background.vertexShader,fragmentShader:xa.background.fragmentShader,side:zs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(d)),d.material.uniforms.t2D.value=T,d.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,d.material.toneMapped=Ht.getTransfer(T.colorSpace)!==en,T.matrixAutoUpdate===!0&&T.updateMatrix(),d.material.uniforms.uvTransform.value.copy(T.matrix),(g!==T||_!==T.version||v!==r.toneMapping)&&(d.material.needsUpdate=!0,g=T,_=T.version,v=r.toneMapping),d.layers.enableAll(),C.unshift(d,d.geometry,d.material,0,0,null))}function S(C,z){C.getRGB(Ru,oy(r)),n.buffers.color.setClear(Ru.r,Ru.g,Ru.b,z,c)}function y(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return u},setClearColor:function(C,z=1){u.set(C),h=z,S(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(C){h=C,S(u,h)},render:b,addToRenderList:A,dispose:y}}function kw(r,e){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=v(null);let c=o,u=!1;function h(G,X,K,B,W){let P=!1;const k=_(G,B,K,X);c!==k&&(c=k,p(c.object)),P=x(G,B,K,W),P&&b(G,B,K,W),W!==null&&e.update(W,r.ELEMENT_ARRAY_BUFFER),(P||u)&&(u=!1,T(G,X,K,B),W!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function d(){return r.createVertexArray()}function p(G){return r.bindVertexArray(G)}function g(G){return r.deleteVertexArray(G)}function _(G,X,K,B){const W=B.wireframe===!0;let P=a[X.id];P===void 0&&(P={},a[X.id]=P);const k=G.isInstancedMesh===!0?G.id:0;let ne=P[k];ne===void 0&&(ne={},P[k]=ne);let J=ne[K.id];J===void 0&&(J={},ne[K.id]=J);let ee=J[W];return ee===void 0&&(ee=v(d()),J[W]=ee),ee}function v(G){const X=[],K=[],B=[];for(let W=0;W<n;W++)X[W]=0,K[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:K,attributeDivisors:B,object:G,attributes:{},index:null}}function x(G,X,K,B){const W=c.attributes,P=X.attributes;let k=0;const ne=K.getAttributes();for(const J in ne)if(ne[J].location>=0){const N=W[J];let Q=P[J];if(Q===void 0&&(J==="instanceMatrix"&&G.instanceMatrix&&(Q=G.instanceMatrix),J==="instanceColor"&&G.instanceColor&&(Q=G.instanceColor)),N===void 0||N.attribute!==Q||Q&&N.data!==Q.data)return!0;k++}return c.attributesNum!==k||c.index!==B}function b(G,X,K,B){const W={},P=X.attributes;let k=0;const ne=K.getAttributes();for(const J in ne)if(ne[J].location>=0){let N=P[J];N===void 0&&(J==="instanceMatrix"&&G.instanceMatrix&&(N=G.instanceMatrix),J==="instanceColor"&&G.instanceColor&&(N=G.instanceColor));const Q={};Q.attribute=N,N&&N.data&&(Q.data=N.data),W[J]=Q,k++}c.attributes=W,c.attributesNum=k,c.index=B}function A(){const G=c.newAttributes;for(let X=0,K=G.length;X<K;X++)G[X]=0}function S(G){y(G,0)}function y(G,X){const K=c.newAttributes,B=c.enabledAttributes,W=c.attributeDivisors;K[G]=1,B[G]===0&&(r.enableVertexAttribArray(G),B[G]=1),W[G]!==X&&(r.vertexAttribDivisor(G,X),W[G]=X)}function C(){const G=c.newAttributes,X=c.enabledAttributes;for(let K=0,B=X.length;K<B;K++)X[K]!==G[K]&&(r.disableVertexAttribArray(K),X[K]=0)}function z(G,X,K,B,W,P,k){k===!0?r.vertexAttribIPointer(G,X,K,W,P):r.vertexAttribPointer(G,X,K,B,W,P)}function T(G,X,K,B){A();const W=B.attributes,P=K.getAttributes(),k=X.defaultAttributeValues;for(const ne in P){const J=P[ne];if(J.location>=0){let ee=W[ne];if(ee===void 0&&(ne==="instanceMatrix"&&G.instanceMatrix&&(ee=G.instanceMatrix),ne==="instanceColor"&&G.instanceColor&&(ee=G.instanceColor)),ee!==void 0){const N=ee.normalized,Q=ee.itemSize,ue=e.get(ee);if(ue===void 0)continue;const Ue=ue.buffer,Fe=ue.type,Ke=ue.bytesPerElement,re=Fe===r.INT||Fe===r.UNSIGNED_INT||ee.gpuType===Gp;if(ee.isInterleavedBufferAttribute){const ye=ee.data,oe=ye.stride,ve=ee.offset;if(ye.isInstancedInterleavedBuffer){for(let me=0;me<J.locationSize;me++)y(J.location+me,ye.meshPerAttribute);G.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let me=0;me<J.locationSize;me++)S(J.location+me);r.bindBuffer(r.ARRAY_BUFFER,Ue);for(let me=0;me<J.locationSize;me++)z(J.location+me,Q/J.locationSize,Fe,N,oe*Ke,(ve+Q/J.locationSize*me)*Ke,re)}else{if(ee.isInstancedBufferAttribute){for(let ye=0;ye<J.locationSize;ye++)y(J.location+ye,ee.meshPerAttribute);G.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ye=0;ye<J.locationSize;ye++)S(J.location+ye);r.bindBuffer(r.ARRAY_BUFFER,Ue);for(let ye=0;ye<J.locationSize;ye++)z(J.location+ye,Q/J.locationSize,Fe,N,Q*Ke,Q/J.locationSize*ye*Ke,re)}}else if(k!==void 0){const N=k[ne];if(N!==void 0)switch(N.length){case 2:r.vertexAttrib2fv(J.location,N);break;case 3:r.vertexAttrib3fv(J.location,N);break;case 4:r.vertexAttrib4fv(J.location,N);break;default:r.vertexAttrib1fv(J.location,N)}}}}C()}function F(){L();for(const G in a){const X=a[G];for(const K in X){const B=X[K];for(const W in B){const P=B[W];for(const k in P)g(P[k].object),delete P[k];delete B[W]}}delete a[G]}}function U(G){if(a[G.id]===void 0)return;const X=a[G.id];for(const K in X){const B=X[K];for(const W in B){const P=B[W];for(const k in P)g(P[k].object),delete P[k];delete B[W]}}delete a[G.id]}function O(G){for(const X in a){const K=a[X];for(const B in K){const W=K[B];if(W[G.id]===void 0)continue;const P=W[G.id];for(const k in P)g(P[k].object),delete P[k];delete W[G.id]}}}function E(G){for(const X in a){const K=a[X],B=G.isInstancedMesh===!0?G.id:0,W=K[B];if(W!==void 0){for(const P in W){const k=W[P];for(const ne in k)g(k[ne].object),delete k[ne];delete W[P]}delete K[B],Object.keys(K).length===0&&delete a[X]}}}function L(){H(),u=!0,c!==o&&(c=o,p(c.object))}function H(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:L,resetDefaultState:H,dispose:F,releaseStatesOfGeometry:U,releaseStatesOfObject:E,releaseStatesOfProgram:O,initAttributes:A,enableAttribute:S,disableUnusedAttributes:C}}function Ww(r,e,n){let a;function o(d){a=d}function c(d,p){r.drawArrays(a,d,p),n.update(p,a,1)}function u(d,p,g){g!==0&&(r.drawArraysInstanced(a,d,p,g),n.update(p,a,g))}function h(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,d,0,p,0,g);let v=0;for(let x=0;x<g;x++)v+=p[x];n.update(v,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function Xw(r,e,n,a){let o;function c(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");o=r.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(O){return!(O!==Oi&&a.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(O){const E=O===yn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==wn&&O!==Pi&&!E&&a.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function d(O){if(O==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const g=d(p);g!==p&&(St("WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=n.logarithmicDepthBuffer===!0,v=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&v===!1&&St("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),y=r.getParameter(r.MAX_VERTEX_ATTRIBS),C=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),z=r.getParameter(r.MAX_VARYING_VECTORS),T=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),F=r.getParameter(r.MAX_SAMPLES),U=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:d,textureFormatReadable:u,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:x,maxVertexTextures:b,maxTextureSize:A,maxCubemapSize:S,maxAttributes:y,maxVertexUniforms:C,maxVaryings:z,maxFragmentUniforms:T,maxSamples:F,samples:U}}function qw(r){const e=this;let n=null,a=0,o=!1,c=!1;const u=new Ja,h=new Et,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const x=_.length!==0||v||a!==0||o;return o=v,a=_.length,x},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,v){n=g(_,v,0)},this.setState=function(_,v,x){const b=_.clippingPlanes,A=_.clipIntersection,S=_.clipShadows,y=r.get(_);if(!o||b===null||b.length===0||c&&!S)c?g(null):p();else{const C=c?0:a,z=C*4;let T=y.clippingState||null;d.value=T,T=g(b,v,z,x);for(let F=0;F!==z;++F)T[F]=n[F];y.clippingState=T,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=C}};function p(){d.value!==n&&(d.value=n,d.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0}function g(_,v,x,b){const A=_!==null?_.length:0;let S=null;if(A!==0){if(S=d.value,b!==!0||S===null){const y=x+A*4,C=v.matrixWorldInverse;h.getNormalMatrix(C),(S===null||S.length<y)&&(S=new Float32Array(y));for(let z=0,T=x;z!==A;++z,T+=4)u.copy(_[z]).applyMatrix4(C,h),u.normal.toArray(S,T),S[T+3]=u.constant}d.value=S,d.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,S}}const _o=4,Yw=6,Zw=20,Kw=256,bl=new qu,X_=new tt;let Od=null,zd=0,Fd=0,Bd=!1;const Qw=new V,sr=new V;class Pp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,a=.1,o=100,c={}){const{size:u=256,position:h=Qw}=c;Od=this._renderer.getRenderTarget(),zd=this._renderer.getActiveCubeFace(),Fd=this._renderer.getActiveMipmapLevel(),Bd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,a,o,d,h),n>0&&this._blur(d,0,0,n),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Z_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Y_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Od,zd,Fd),this._renderer.xr.enabled=Bd,e.scissorTest=!1,ho(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===hr||e.mapping===So?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Od=this._renderer.getRenderTarget(),zd=this._renderer.getActiveCubeFace(),Fd=this._renderer.getActiveMipmapLevel(),Bd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(e,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:yn,format:Oi,colorSpace:Mo,depthBuffer:!1},o=q_(e,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=q_(e,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Jw(c)),this._blurMaterial=$w(c,e,n),this._ggxMaterial=jw(c,e,n)}return o}_compileMaterial(e){const n=new rn(new Bn,e);this._renderer.compile(n,bl)}_sceneToCubeUV(e,n,a,o,c){const d=new Si(90,1,n,a),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,x=_.toneMapping;_.getClearColor(X_),_.toneMapping=Ma,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new rn(new ti,new hi({name:"PMREM.Background",side:Gn,depthWrite:!1,depthTest:!1})));const A=this._backgroundBox,S=A.material;let y=!1;const C=e.background;C?C.isColor&&(S.color.copy(C),e.background=null,y=!0):(S.color.copy(X_),y=!0);for(let z=0;z<6;z++){const T=z%3;T===0?(d.up.set(0,p[z],0),d.position.set(c.x,c.y,c.z),d.lookAt(c.x+g[z],c.y,c.z)):T===1?(d.up.set(0,0,p[z]),d.position.set(c.x,c.y,c.z),d.lookAt(c.x,c.y+g[z],c.z)):(d.up.set(0,p[z],0),d.position.set(c.x,c.y,c.z),d.lookAt(c.x,c.y,c.z+g[z]));const F=this._cubeSize;ho(o,T*F,z>2?F:0,F,F),_.setRenderTarget(o),y&&_.render(A,d),_.render(e,d)}_.toneMapping=x,_.autoClear=v,e.background=C}_textureToCubeUV(e,n){const a=this._renderer,o=e.mapping===hr||e.mapping===So;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Z_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Y_());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const h=c.uniforms;h.envMap.value=e;const d=this._cubeSize;ho(n,0,0,3*d,2*d),a.setRenderTarget(n),a.render(u,bl)}_applyPMREM(e){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(e,c-1,c);n.autoClear=a}_applyGGXFilter(e,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,h=this._lodMeshes[a];h.material=u;const d=u.uniforms,p=a/(this._lodMeshes.length-1),g=n/(this._lodMeshes.length-1),_=Math.sqrt(p*p-g*g),v=p*1.25,x=_*v,{_lodMax:b}=this,A=this._sizeLods[a],S=3*A*(a>b-_o?a-b+_o:0),y=4*(this._cubeSize-A);d.envMap.value=e.texture,d.roughness.value=x,d.mipInt.value=b-n,ho(c,S,y,3*A,2*A),o.setRenderTarget(c),o.render(h,bl),d.envMap.value=c.texture,d.roughness.value=0,d.mipInt.value=b-a,ho(e,S,y,3*A,2*A),o.setRenderTarget(e),o.render(h,bl)}_blur(e,n,a,o){const c=this._pingPongRenderTarget,u=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(e,c,n,a,u),this._blurPass(c,e,a,a,u)}_blurPass(e,n,a,o,c){const u=this._renderer,h=this._blurMaterial,d=this._lodMeshes[o];d.material=h;const p=h.uniforms;p.envMap.value=e.texture,p.sigma.value=c,p.mipInt.value=this._lodMax-a;const g=this._sizeLods[o],_=3*g*(o>this._lodMax-_o?o-this._lodMax+_o:0),v=4*(this._cubeSize-g);ho(n,_,v,3*g,2*g),u.setRenderTarget(n),u.render(d,bl)}}function Jw(r){const e=[],n=[];let a=r;const o=r-_o+1+Yw;for(let c=0;c<o;c++){const u=Math.pow(2,a);e.push(u);const h=1/(u-2),d=-h,p=1+h,g=[d,d,p,d,p,p,d,d,p,p,d,p],_=6,v=6,x=3,b=new Float32Array(x*v*_),A=new Float32Array(x*v*_);for(let y=0;y<_;y++){const C=y%3*2/3-1,z=y>2?0:-1,T=[C,z,0,C+2/3,z,0,C+2/3,z+1,0,C,z,0,C+2/3,z+1,0,C,z+1,0];b.set(T,x*v*y);for(let F=0;F<v;F++){const U=g[F*2]*2-1,O=g[F*2+1]*2-1;y===0?sr.set(1,O,U):y===1?sr.set(-U,1,-O):y===2?sr.set(-U,O,1):y===3?sr.set(-1,O,-U):y===4?sr.set(-U,-1,O):sr.set(U,O,-1),sr.toArray(A,(y*v+F)*x)}}const S=new Bn;S.setAttribute("position",new oa(b,x)),S.setAttribute("outputDirection",new oa(A,x)),n.push(new rn(S,null)),a>_o&&a--}return{lodMeshes:n,sizeLods:e}}function q_(r,e,n){const a=new Kn(r,e,n);return a.texture.mapping=ql,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function ho(r,e,n,a,o){r.viewport.set(e,n,a,o),r.scissor.set(e,n,a,o)}function jw(r,e,n){return new ai({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Kw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yu(),fragmentShader:`

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
		`,blending:ns,depthTest:!1,depthWrite:!1})}function $w(r,e,n){return new ai({name:"SphericalGaussianBlur",defines:{SAMPLES:Zw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Yu(),fragmentShader:`

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
		`,blending:ns,depthTest:!1,depthWrite:!1})}function Y_(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yu(),fragmentShader:`

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
		`,blending:ns,depthTest:!1,depthWrite:!1})}function Z_(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ns,depthTest:!1,depthWrite:!1})}function Yu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class a0 extends Kn{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const a={width:e,height:e,depth:1},o=[a,a,a,a,a,a];this.texture=new Zx(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new ti(5,5,5),c=new ai({name:"CubemapFromEquirect",uniforms:wo(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Gn,blending:ns});c.uniforms.tEquirect.value=n;const u=new rn(o,c),h=n.minFilter;return n.minFilter===ya&&(n.minFilter=mn),new n2(1,10,this).update(e,u),n.minFilter=h,u.geometry.dispose(),u.material.dispose(),this}clear(e,n=!0,a=!0,o=!0){const c=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(n,a,o);e.setRenderTarget(c)}}function eT(r){let e=new WeakMap,n=new WeakMap,a=null;function o(v,x=!1){return v==null?null:x?u(v):c(v)}function c(v){if(v&&v.isTexture){const x=v.mapping;if(x===rd||x===od)if(e.has(v)){const b=e.get(v).texture;return h(b,v.mapping)}else{const b=v.image;if(b&&b.height>0){const A=new a0(b.height);return A.fromEquirectangularTexture(r,v),e.set(v,A),v.addEventListener("dispose",p),h(A.texture,v.mapping)}else return null}}return v}function u(v){if(v&&v.isTexture){const x=v.mapping,b=x===rd||x===od,A=x===hr||x===So;if(b||A){let S=n.get(v);const y=S!==void 0?S.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==y)return a===null&&(a=new Pp(r)),S=b?a.fromEquirectangular(v,S):a.fromCubemap(v,S),S.texture.pmremVersion=v.pmremVersion,n.set(v,S),S.texture;if(S!==void 0)return S.texture;{const C=v.image;return b&&C&&C.height>0||A&&C&&d(C)?(a===null&&(a=new Pp(r)),S=b?a.fromEquirectangular(v):a.fromCubemap(v),S.texture.pmremVersion=v.pmremVersion,n.set(v,S),v.addEventListener("dispose",g),S.texture):null}}}return v}function h(v,x){return x===rd?v.mapping=hr:x===od&&(v.mapping=So),v}function d(v){let x=0;const b=6;for(let A=0;A<b;A++)v[A]!==void 0&&x++;return x===b}function p(v){const x=v.target;x.removeEventListener("dispose",p);const b=e.get(x);b!==void 0&&(e.delete(x),b.dispose())}function g(v){const x=v.target;x.removeEventListener("dispose",g);const b=n.get(x);b!==void 0&&(n.delete(x),b.dispose())}function _(){e=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function tT(r){const e={};function n(a){if(e[a]!==void 0)return e[a];const o=r.getExtension(a);return e[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&xo("WebGLRenderer: "+a+" extension not supported."),o}}}function nT(r,e,n,a){const o={},c=new WeakMap;function u(_){const v=_.target;v.index!==null&&e.remove(v.index);for(const b in v.attributes)e.remove(v.attributes[b]);v.removeEventListener("dispose",u),delete o[v.id];const x=c.get(v);x&&(e.remove(x),c.delete(v)),a.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function h(_,v){return o[v.id]===!0||(v.addEventListener("dispose",u),o[v.id]=!0,n.memory.geometries++),v}function d(_){const v=_.attributes;for(const x in v)e.update(v[x],r.ARRAY_BUFFER)}function p(_){const v=[],x=_.index,b=_.attributes.position;let A=0;if(b===void 0)return;if(x!==null){const C=x.array;A=x.version;for(let z=0,T=C.length;z<T;z+=3){const F=C[z+0],U=C[z+1],O=C[z+2];v.push(F,U,U,O,O,F)}}else{const C=b.array;A=b.version;for(let z=0,T=C.length/3-1;z<T;z+=3){const F=z+0,U=z+1,O=z+2;v.push(F,U,U,O,O,F)}}const S=new(b.count>=65535?Xx:Wx)(v,1);S.version=A;const y=c.get(_);y&&e.remove(y),c.set(_,S)}function g(_){const v=c.get(_);if(v){const x=_.index;x!==null&&v.version<x.version&&p(_)}else p(_);return c.get(_)}return{get:h,update:d,getWireframeAttribute:g}}function iT(r,e,n){let a;function o(_){a=_}let c,u;function h(_){c=_.type,u=_.bytesPerElement}function d(_,v){r.drawElements(a,v,c,_*u),n.update(v,a,1)}function p(_,v,x){x!==0&&(r.drawElementsInstanced(a,v,c,_*u,x),n.update(v,a,x))}function g(_,v,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,v,0,c,_,0,x);let A=0;for(let S=0;S<x;S++)A+=v[S];n.update(A,a,1)}this.setMode=o,this.setIndex=h,this.render=d,this.renderInstances=p,this.renderMultiDraw=g}function aT(r){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,h){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:It("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:o,update:a}}function sT(r,e,n){const a=new WeakMap,o=new Jt;function c(u,h,d){const p=u.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let v=a.get(h);if(v===void 0||v.count!==_){let L=function(){O.dispose(),a.delete(h),h.removeEventListener("dispose",L)};v!==void 0&&v.texture.dispose();const x=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,A=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],y=h.morphAttributes.normal||[],C=h.morphAttributes.color||[];let z=0;x===!0&&(z=1),b===!0&&(z=2),A===!0&&(z=3);let T=h.attributes.position.count*z,F=1;T>e.maxTextureSize&&(F=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const U=new Float32Array(T*F*4*_),O=new Vx(U,T,F,_);O.type=Pi,O.needsUpdate=!0;const E=z*4;for(let H=0;H<_;H++){const G=S[H],X=y[H],K=C[H],B=T*F*4*H;for(let W=0;W<G.count;W++){const P=W*E;x===!0&&(o.fromBufferAttribute(G,W),U[B+P+0]=o.x,U[B+P+1]=o.y,U[B+P+2]=o.z,U[B+P+3]=0),b===!0&&(o.fromBufferAttribute(X,W),U[B+P+4]=o.x,U[B+P+5]=o.y,U[B+P+6]=o.z,U[B+P+7]=0),A===!0&&(o.fromBufferAttribute(K,W),U[B+P+8]=o.x,U[B+P+9]=o.y,U[B+P+10]=o.z,U[B+P+11]=K.itemSize===4?o.w:1)}}v={count:_,texture:O,size:new Pe(T,F)},a.set(h,v),h.addEventListener("dispose",L)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)d.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let x=0;for(let A=0;A<p.length;A++)x+=p[A];const b=h.morphTargetsRelative?1:1-x;d.getUniforms().setValue(r,"morphTargetBaseInfluence",b),d.getUniforms().setValue(r,"morphTargetInfluences",p)}d.getUniforms().setValue(r,"morphTargetsTexture",v.texture,n),d.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:c}}function rT(r,e,n,a,o){let c=new WeakMap;function u(p){const g=o.render.frame,_=p.geometry,v=e.get(p,_);if(c.get(v)!==g&&(e.update(v),c.set(v,g)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),c.get(p)!==g&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,g))),p.isSkinnedMesh){const x=p.skeleton;c.get(x)!==g&&(x.update(),c.set(x,g))}return v}function h(){c=new WeakMap}function d(p){const g=p.target;g.removeEventListener("dispose",d),a.releaseStatesOfObject(g),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:u,dispose:h}}const oT={[Ax]:"LINEAR_TONE_MAPPING",[Rx]:"REINHARD_TONE_MAPPING",[Cx]:"CINEON_TONE_MAPPING",[Hp]:"ACES_FILMIC_TONE_MAPPING",[Ux]:"AGX_TONE_MAPPING",[Lx]:"NEUTRAL_TONE_MAPPING",[Dx]:"CUSTOM_TONE_MAPPING"};function lT(r,e,n,a,o,c){const u=new Kn(e,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,d=null;const p=new Bn;p.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new Wt([0,2,0,0,2,0],2));const g=new Wb({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new rn(p,g),v=new qu(-1,1,1,-1,0,1);let x=null,b=null,A=!1,S,y=null,C=[],z=!1;this.setSize=function(T,F){u.setSize(T,F),h!==null&&h.setSize(T,F),d!==null&&d.setSize(T,F);for(let U=0;U<C.length;U++){const O=C[U];O.setSize&&O.setSize(T,F)}},this.setEffects=function(T){C=T,z=C.length>0&&C[0].isRenderPass===!0;const F=u.width,U=u.height;C.length>0&&h===null&&(h=new Kn(F,U,{type:yn,depthBuffer:!1,stencilBuffer:!1}),d=new Kn(F,U,{type:yn,depthBuffer:!1,stencilBuffer:!1}));for(let O=0;O<C.length;O++){const E=C[O];E.setSize&&E.setSize(F,U)}},this.begin=function(T,F){if(A||T.toneMapping===Ma&&C.length===0)return!1;if(y=F,F!==null){const U=F.width,O=F.height;(u.width!==U||u.height!==O)&&this.setSize(U,O)}return z===!1&&T.setRenderTarget(u),S=T.toneMapping,T.toneMapping=Ma,!0},this.hasRenderPass=function(){return z},this.end=function(T,F){T.toneMapping=S,A=!0;let U=u,O=h;for(let E=0;E<C.length;E++){const L=C[E];L.enabled!==!1&&(L.render(T,O,U,F),L.needsSwap!==!1&&(U=O,O=O===h?d:h))}if(x!==T.outputColorSpace||b!==T.toneMapping){x=T.outputColorSpace,b=T.toneMapping,g.defines={},Ht.getTransfer(x)===en&&(g.defines.SRGB_TRANSFER="");const E=oT[b];E&&(g.defines[E]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=U.texture,T.setRenderTarget(y),T.render(_,v),y=null,A=!1},this.isCompositing=function(){return A},this.dispose=function(){u.dispose(),h!==null&&h.dispose(),d!==null&&d.dispose(),p.dispose(),g.dispose()}}const hy=new ii,Op=new Fs(1,1),dy=new Vx,py=new kM,my=new Zx,K_=[],Q_=[],J_=new Float32Array(16),j_=new Float32Array(9),$_=new Float32Array(4);function To(r,e,n){const a=r[0];if(a<=0||a>0)return r;const o=e*n;let c=K_[o];if(c===void 0&&(c=new Float32Array(o),K_[o]=c),e!==0){a.toArray(c,0);for(let u=1,h=0;u!==e;++u)h+=n,r[u].toArray(c,h)}return c}function zn(r,e){if(r.length!==e.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==e[n])return!1;return!0}function Fn(r,e){for(let n=0,a=e.length;n<a;n++)r[n]=e[n]}function Zu(r,e){let n=Q_[e];n===void 0&&(n=new Int32Array(e),Q_[e]=n);for(let a=0;a!==e;++a)n[a]=r.allocateTextureUnit();return n}function cT(r,e){const n=this.cache;n[0]!==e&&(r.uniform1f(this.addr,e),n[0]=e)}function uT(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zn(n,e))return;r.uniform2fv(this.addr,e),Fn(n,e)}}function fT(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(zn(n,e))return;r.uniform3fv(this.addr,e),Fn(n,e)}}function hT(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zn(n,e))return;r.uniform4fv(this.addr,e),Fn(n,e)}}function dT(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(zn(n,e))return;r.uniformMatrix2fv(this.addr,!1,e),Fn(n,e)}else{if(zn(n,a))return;$_.set(a),r.uniformMatrix2fv(this.addr,!1,$_),Fn(n,a)}}function pT(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(zn(n,e))return;r.uniformMatrix3fv(this.addr,!1,e),Fn(n,e)}else{if(zn(n,a))return;j_.set(a),r.uniformMatrix3fv(this.addr,!1,j_),Fn(n,a)}}function mT(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(zn(n,e))return;r.uniformMatrix4fv(this.addr,!1,e),Fn(n,e)}else{if(zn(n,a))return;J_.set(a),r.uniformMatrix4fv(this.addr,!1,J_),Fn(n,a)}}function gT(r,e){const n=this.cache;n[0]!==e&&(r.uniform1i(this.addr,e),n[0]=e)}function vT(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zn(n,e))return;r.uniform2iv(this.addr,e),Fn(n,e)}}function _T(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zn(n,e))return;r.uniform3iv(this.addr,e),Fn(n,e)}}function xT(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zn(n,e))return;r.uniform4iv(this.addr,e),Fn(n,e)}}function yT(r,e){const n=this.cache;n[0]!==e&&(r.uniform1ui(this.addr,e),n[0]=e)}function ST(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zn(n,e))return;r.uniform2uiv(this.addr,e),Fn(n,e)}}function MT(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zn(n,e))return;r.uniform3uiv(this.addr,e),Fn(n,e)}}function bT(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zn(n,e))return;r.uniform4uiv(this.addr,e),Fn(n,e)}}function ET(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(Op.compareFunction=n.isReversedDepthBuffer()?Zp:Wu,c=Op):c=hy,n.setTexture2D(e||c,o)}function wT(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(e||py,o)}function TT(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(e||my,o)}function AT(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(e||dy,o)}function RT(r){switch(r){case 5126:return cT;case 35664:return uT;case 35665:return fT;case 35666:return hT;case 35674:return dT;case 35675:return pT;case 35676:return mT;case 5124:case 35670:return gT;case 35667:case 35671:return vT;case 35668:case 35672:return _T;case 35669:case 35673:return xT;case 5125:return yT;case 36294:return ST;case 36295:return MT;case 36296:return bT;case 35678:case 36198:case 36298:case 36306:case 35682:return ET;case 35679:case 36299:case 36307:return wT;case 35680:case 36300:case 36308:case 36293:return TT;case 36289:case 36303:case 36311:case 36292:return AT}}function CT(r,e){r.uniform1fv(this.addr,e)}function DT(r,e){const n=To(e,this.size,2);r.uniform2fv(this.addr,n)}function UT(r,e){const n=To(e,this.size,3);r.uniform3fv(this.addr,n)}function LT(r,e){const n=To(e,this.size,4);r.uniform4fv(this.addr,n)}function NT(r,e){const n=To(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function PT(r,e){const n=To(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function OT(r,e){const n=To(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function zT(r,e){r.uniform1iv(this.addr,e)}function FT(r,e){r.uniform2iv(this.addr,e)}function BT(r,e){r.uniform3iv(this.addr,e)}function IT(r,e){r.uniform4iv(this.addr,e)}function HT(r,e){r.uniform1uiv(this.addr,e)}function GT(r,e){r.uniform2uiv(this.addr,e)}function VT(r,e){r.uniform3uiv(this.addr,e)}function kT(r,e){r.uniform4uiv(this.addr,e)}function WT(r,e,n){const a=this.cache,o=e.length,c=Zu(n,o);zn(a,c)||(r.uniform1iv(this.addr,c),Fn(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=Op:u=hy;for(let h=0;h!==o;++h)n.setTexture2D(e[h]||u,c[h])}function XT(r,e,n){const a=this.cache,o=e.length,c=Zu(n,o);zn(a,c)||(r.uniform1iv(this.addr,c),Fn(a,c));for(let u=0;u!==o;++u)n.setTexture3D(e[u]||py,c[u])}function qT(r,e,n){const a=this.cache,o=e.length,c=Zu(n,o);zn(a,c)||(r.uniform1iv(this.addr,c),Fn(a,c));for(let u=0;u!==o;++u)n.setTextureCube(e[u]||my,c[u])}function YT(r,e,n){const a=this.cache,o=e.length,c=Zu(n,o);zn(a,c)||(r.uniform1iv(this.addr,c),Fn(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(e[u]||dy,c[u])}function ZT(r){switch(r){case 5126:return CT;case 35664:return DT;case 35665:return UT;case 35666:return LT;case 35674:return NT;case 35675:return PT;case 35676:return OT;case 5124:case 35670:return zT;case 35667:case 35671:return FT;case 35668:case 35672:return BT;case 35669:case 35673:return IT;case 5125:return HT;case 36294:return GT;case 36295:return VT;case 36296:return kT;case 35678:case 36198:case 36298:case 36306:case 35682:return WT;case 35679:case 36299:case 36307:return XT;case 35680:case 36300:case 36308:case 36293:return qT;case 36289:case 36303:case 36311:case 36292:return YT}}class KT{constructor(e,n,a){this.id=e,this.addr=a,this.cache=[],this.type=n.type,this.setValue=RT(n.type)}}class QT{constructor(e,n,a){this.id=e,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=ZT(n.type)}}class JT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const h=o[c];h.setValue(e,n[h.id],a)}}}const Id=/(\w+)(\])?(\[|\.)?/g;function ex(r,e){r.seq.push(e),r.map[e.id]=e}function jT(r,e,n){const a=r.name,o=a.length;for(Id.lastIndex=0;;){const c=Id.exec(a),u=Id.lastIndex;let h=c[1];const d=c[2]==="]",p=c[3];if(d&&(h=h|0),p===void 0||p==="["&&u+2===o){ex(n,p===void 0?new KT(h,r,e):new QT(h,r,e));break}else{let _=n.map[h];_===void 0&&(_=new JT(h),ex(n,_)),n=_}}}class Ou{constructor(e,n){this.seq=[],this.map={};const a=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const h=e.getActiveUniform(n,u),d=e.getUniformLocation(n,h.name);jT(h,d,this)}const o=[],c=[];for(const u of this.seq)u.type===e.SAMPLER_2D_SHADOW||u.type===e.SAMPLER_CUBE_SHADOW||u.type===e.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(e,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(e,a,o)}setOptional(e,n,a){const o=n[a];o!==void 0&&this.setValue(e,a,o)}static upload(e,n,a,o){for(let c=0,u=n.length;c!==u;++c){const h=n[c],d=a[h.id];d.needsUpdate!==!1&&h.setValue(e,d.value,o)}}static seqWithValue(e,n){const a=[];for(let o=0,c=e.length;o!==c;++o){const u=e[o];u.id in n&&a.push(u)}return a}}function tx(r,e,n){const a=r.createShader(e);return r.shaderSource(a,n),r.compileShader(a),a}const $T=37297;let e3=0;function t3(r,e){const n=r.split(`
`),a=[],o=Math.max(e-6,0),c=Math.min(e+6,n.length);for(let u=o;u<c;u++){const h=u+1;a.push(`${h===e?">":" "} ${h}: ${n[u]}`)}return a.join(`
`)}const nx=new Et;function n3(r){Ht._getMatrix(nx,Ht.workingColorSpace,r);const e=`mat3( ${nx.elements.map(n=>n.toFixed(4))} )`;switch(Ht.getTransfer(r)){case Iu:return[e,"LinearTransferOETF"];case en:return[e,"sRGBTransferOETF"];default:return St("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function ix(r,e,n){const a=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const h=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+t3(r.getShaderSource(e),h)}else return c}function i3(r,e){const n=n3(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const a3={[Ax]:"Linear",[Rx]:"Reinhard",[Cx]:"Cineon",[Hp]:"ACESFilmic",[Ux]:"AgX",[Lx]:"Neutral",[Dx]:"Custom"};function s3(r,e){const n=a3[e];return n===void 0?(St("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Cu=new V;function r3(){Ht.getLuminanceCoefficients(Cu);const r=Cu.x.toFixed(4),e=Cu.y.toFixed(4),n=Cu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function o3(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rl).join(`
`)}function l3(r){const e=[];for(const n in r){const a=r[n];a!==!1&&e.push("#define "+n+" "+a)}return e.join(`
`)}function c3(r,e){const n={},a=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(e,o),u=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[u]={type:c.type,location:r.getAttribLocation(e,u),locationSize:h}}return n}function Rl(r){return r!==""}function ax(r,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sx(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const u3=/^[ \t]*#include +<([\w\d./]+)>/gm;function zp(r){return r.replace(u3,h3)}const f3=new Map;function h3(r,e){let n=Dt[e];if(n===void 0){const a=f3.get(e);if(a!==void 0)n=Dt[a],St('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return zp(n)}const d3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rx(r){return r.replace(d3,p3)}function p3(r,e,n,a){let o="";for(let c=parseInt(e);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function ox(r){let e=`precision ${r.precision} float;
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
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const m3={[Cl]:"SHADOWMAP_TYPE_PCF",[Tl]:"SHADOWMAP_TYPE_VSM"};function g3(r){return m3[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const v3={[hr]:"ENVMAP_TYPE_CUBE",[So]:"ENVMAP_TYPE_CUBE",[ql]:"ENVMAP_TYPE_CUBE_UV"};function _3(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":v3[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const x3={[So]:"ENVMAP_MODE_REFRACTION"};function y3(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":x3[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const S3={[Tx]:"ENVMAP_BLENDING_MULTIPLY",[sM]:"ENVMAP_BLENDING_MIX",[rM]:"ENVMAP_BLENDING_ADD"};function M3(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":S3[r.combine]||"ENVMAP_BLENDING_NONE"}function b3(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,a=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function E3(r,e,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,h=n.fragmentShader;const d=g3(n),p=_3(n),g=y3(n),_=M3(n),v=b3(n),x=o3(n),b=l3(c),A=o.createProgram();let S,y,C=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(Rl).join(`
`),S.length>0&&(S+=`
`),y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(Rl).join(`
`),y.length>0&&(y+=`
`)):(S=[ox(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+d:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rl).join(`
`),y=[ox(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+d:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ma?"#define TONE_MAPPING":"",n.toneMapping!==Ma?Dt.tonemapping_pars_fragment:"",n.toneMapping!==Ma?s3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,i3("linearToOutputTexel",n.outputColorSpace),r3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Rl).join(`
`)),u=zp(u),u=ax(u,n),u=sx(u,n),h=zp(h),h=ax(h,n),h=sx(h,n),u=rx(u),h=rx(h),n.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,S=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,y=["#define varying in",n.glslVersion===r_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===r_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const z=C+S+u,T=C+y+h,F=tx(o,o.VERTEX_SHADER,z),U=tx(o,o.FRAGMENT_SHADER,T);o.attachShader(A,F),o.attachShader(A,U),n.index0AttributeName!==void 0?o.bindAttribLocation(A,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(A,0,"position"),o.linkProgram(A);function O(G){if(r.debug.checkShaderErrors){const X=o.getProgramInfoLog(A)||"",K=o.getShaderInfoLog(F)||"",B=o.getShaderInfoLog(U)||"",W=X.trim(),P=K.trim(),k=B.trim();let ne=!0,J=!0;if(o.getProgramParameter(A,o.LINK_STATUS)===!1)if(ne=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,A,F,U);else{const ee=ix(o,F,"vertex"),N=ix(o,U,"fragment");It("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(A,o.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+W+`
`+ee+`
`+N)}else W!==""?St("WebGLProgram: Program Info Log:",W):(P===""||k==="")&&(J=!1);J&&(G.diagnostics={runnable:ne,programLog:W,vertexShader:{log:P,prefix:S},fragmentShader:{log:k,prefix:y}})}o.deleteShader(F),o.deleteShader(U),E=new Ou(o,A),L=c3(o,A)}let E;this.getUniforms=function(){return E===void 0&&O(this),E};let L;this.getAttributes=function(){return L===void 0&&O(this),L};let H=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=o.getProgramParameter(A,$T)),H},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(A),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=e3++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=F,this.fragmentShader=U,this}let w3=0;class T3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,a){const o=this._getShaderCacheForMaterial(e);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let a=n.get(e);return a===void 0&&(a=new Set,n.set(e,a)),a}_getShaderStage(e){const n=this.shaderCache;let a=n.get(e);return a===void 0&&(a=new A3(e),n.set(e,a)),a}}class A3{constructor(e){this.id=w3++,this.code=e,this.usedTimes=0}}function R3(r){return r===dr||r===Fu||r===Bu}function C3(r,e,n,a,o,c){const u=new Jp,h=new T3,d=new Set,p=[],g=new Map,_=a.logarithmicDepthBuffer;let v=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(E){return d.add(E),E===0?"uv":`uv${E}`}function A(E,L,H,G,X,K){const B=G.fog,W=X.geometry,P=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?G.environment:null,k=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,ne=e.get(E.envMap||P,k),J=ne&&ne.mapping===ql?ne.image.height:null,ee=x[E.type];E.precision!==null&&(v=a.getMaxPrecision(E.precision),v!==E.precision&&St("WebGLProgram.getParameters:",E.precision,"not supported, using",v,"instead."));const N=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Q=N!==void 0?N.length:0;let ue=0;W.morphAttributes.position!==void 0&&(ue=1),W.morphAttributes.normal!==void 0&&(ue=2),W.morphAttributes.color!==void 0&&(ue=3);let Ue,Fe,Ke,re;if(ee){const Qt=xa[ee];Ue=Qt.vertexShader,Fe=Qt.fragmentShader}else{Ue=E.vertexShader,Fe=E.fragmentShader;const Qt=h.getVertexShaderStage(E),Pt=h.getFragmentShaderStage(E);h.update(E,Qt,Pt),Ke=Qt.id,re=Pt.id}const ye=r.getRenderTarget(),oe=r.state.buffers.depth.getReversed(),ve=X.isInstancedMesh===!0,me=X.isBatchedMesh===!0,Ae=!!E.map,qe=!!E.matcap,de=!!ne,Ee=!!E.aoMap,Te=!!E.lightMap,Ne=!!E.bumpMap&&E.wireframe===!1,Oe=!!E.normalMap,at=!!E.displacementMap,Be=!!E.emissiveMap,pt=!!E.metalnessMap,rt=!!E.roughnessMap,Z=E.anisotropy>0,mt=E.clearcoat>0,Mt=E.dispersion>0,I=E.retroreflectivity>0,w=E.iridescence>0,te=E.sheen>0,ce=E.transmission>0,_e=Z&&!!E.anisotropyMap,ze=mt&&!!E.clearcoatMap,Ve=mt&&!!E.clearcoatNormalMap,ge=mt&&!!E.clearcoatRoughnessMap,Se=w&&!!E.iridescenceMap,Ie=w&&!!E.iridescenceThicknessMap,Je=te&&!!E.sheenColorMap,Ze=te&&!!E.sheenRoughnessMap,Xe=!!E.specularMap,ft=!!E.specularColorMap,nt=!!E.specularIntensityMap,xt=ce&&!!E.transmissionMap,$=ce&&!!E.thicknessMap,Ge=!!E.gradientMap,Me=!!E.alphaMap,He=E.alphaTest>0,Qe=!!E.alphaHash,Le=!!E.extensions;let lt=Ma;E.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(lt=r.toneMapping);const it={shaderID:ee,shaderType:E.type,shaderName:E.name,vertexShader:Ue,fragmentShader:Fe,defines:E.defines,customVertexShaderID:Ke,customFragmentShaderID:re,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:v,batching:me,batchingColor:me&&X._colorsTexture!==null,instancing:ve,instancingColor:ve&&X.instanceColor!==null,instancingMorph:ve&&X.morphTexture!==null,outputColorSpace:ye===null?r.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:Ht.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:Ae,matcap:qe,envMap:de,envMapMode:de&&ne.mapping,envMapCubeUVHeight:J,aoMap:Ee,lightMap:Te,bumpMap:Ne,normalMap:Oe,displacementMap:at,emissiveMap:Be,normalMapObjectSpace:Oe&&E.normalMapType===cM,normalMapTangentSpace:Oe&&E.normalMapType===Cp,packedNormalMap:Oe&&E.normalMapType===Cp&&R3(E.normalMap.format),metalnessMap:pt,roughnessMap:rt,anisotropy:Z,anisotropyMap:_e,clearcoat:mt,clearcoatMap:ze,clearcoatNormalMap:Ve,clearcoatRoughnessMap:ge,dispersion:Mt,retroreflection:I,iridescence:w,iridescenceMap:Se,iridescenceThicknessMap:Ie,sheen:te,sheenColorMap:Je,sheenRoughnessMap:Ze,specularMap:Xe,specularColorMap:ft,specularIntensityMap:nt,transmission:ce,transmissionMap:xt,thicknessMap:$,gradientMap:Ge,opaque:E.transparent===!1&&E.blending===Dl&&E.alphaToCoverage===!1,alphaMap:Me,alphaTest:He,alphaHash:Qe,combine:E.combine,mapUv:Ae&&b(E.map.channel),aoMapUv:Ee&&b(E.aoMap.channel),lightMapUv:Te&&b(E.lightMap.channel),bumpMapUv:Ne&&b(E.bumpMap.channel),normalMapUv:Oe&&b(E.normalMap.channel),displacementMapUv:at&&b(E.displacementMap.channel),emissiveMapUv:Be&&b(E.emissiveMap.channel),metalnessMapUv:pt&&b(E.metalnessMap.channel),roughnessMapUv:rt&&b(E.roughnessMap.channel),anisotropyMapUv:_e&&b(E.anisotropyMap.channel),clearcoatMapUv:ze&&b(E.clearcoatMap.channel),clearcoatNormalMapUv:Ve&&b(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&b(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&b(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&b(E.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&b(E.sheenColorMap.channel),sheenRoughnessMapUv:Ze&&b(E.sheenRoughnessMap.channel),specularMapUv:Xe&&b(E.specularMap.channel),specularColorMapUv:ft&&b(E.specularColorMap.channel),specularIntensityMapUv:nt&&b(E.specularIntensityMap.channel),transmissionMapUv:xt&&b(E.transmissionMap.channel),thicknessMapUv:$&&b(E.thicknessMap.channel),alphaMapUv:Me&&b(E.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Oe||Z),vertexNormals:!!W.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!W.attributes.uv&&(Ae||Me),fog:!!B,useFog:E.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||W.attributes.normal===void 0&&Oe===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:oe,skinning:X.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ue,numSunLights:L.sun.length,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numSunLightShadows:L.sunShadowMap.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:K.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:lt,decodeVideoTexture:Ae&&E.map.isVideoTexture===!0&&Ht.getTransfer(E.map.colorSpace)===en,decodeVideoTextureEmissive:Be&&E.emissiveMap.isVideoTexture===!0&&Ht.getTransfer(E.emissiveMap.colorSpace)===en,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===di,flipSided:E.side===Gn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Le&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&E.extensions.multiDraw===!0||me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return it.vertexUv1s=d.has(1),it.vertexUv2s=d.has(2),it.vertexUv3s=d.has(3),d.clear(),it}function S(E){const L=[];if(E.shaderID?L.push(E.shaderID):(L.push(E.customVertexShaderID),L.push(E.customFragmentShaderID)),E.defines!==void 0)for(const H in E.defines)L.push(H),L.push(E.defines[H]);return E.isRawShaderMaterial===!1&&(y(L,E),C(L,E),L.push(r.outputColorSpace)),L.push(E.customProgramCacheKey),L.join()}function y(E,L){E.push(L.precision),E.push(L.outputColorSpace),E.push(L.envMapMode),E.push(L.envMapCubeUVHeight),E.push(L.mapUv),E.push(L.alphaMapUv),E.push(L.lightMapUv),E.push(L.aoMapUv),E.push(L.bumpMapUv),E.push(L.normalMapUv),E.push(L.displacementMapUv),E.push(L.emissiveMapUv),E.push(L.metalnessMapUv),E.push(L.roughnessMapUv),E.push(L.anisotropyMapUv),E.push(L.clearcoatMapUv),E.push(L.clearcoatNormalMapUv),E.push(L.clearcoatRoughnessMapUv),E.push(L.iridescenceMapUv),E.push(L.iridescenceThicknessMapUv),E.push(L.sheenColorMapUv),E.push(L.sheenRoughnessMapUv),E.push(L.specularMapUv),E.push(L.specularColorMapUv),E.push(L.specularIntensityMapUv),E.push(L.transmissionMapUv),E.push(L.thicknessMapUv),E.push(L.combine),E.push(L.fogExp2),E.push(L.sizeAttenuation),E.push(L.morphTargetsCount),E.push(L.morphAttributeCount),E.push(L.numSunLights),E.push(L.numDirLights),E.push(L.numPointLights),E.push(L.numSpotLights),E.push(L.numSpotLightMaps),E.push(L.numHemiLights),E.push(L.numRectAreaLights),E.push(L.numSunLightShadows),E.push(L.numDirLightShadows),E.push(L.numPointLightShadows),E.push(L.numSpotLightShadows),E.push(L.numSpotLightShadowsWithMaps),E.push(L.numLightProbes),E.push(L.shadowMapType),E.push(L.toneMapping),E.push(L.numClippingPlanes),E.push(L.numClipIntersection),E.push(L.depthPacking)}function C(E,L){u.disableAll(),L.instancing&&u.enable(0),L.instancingColor&&u.enable(1),L.instancingMorph&&u.enable(2),L.matcap&&u.enable(3),L.envMap&&u.enable(4),L.normalMapObjectSpace&&u.enable(5),L.normalMapTangentSpace&&u.enable(6),L.clearcoat&&u.enable(7),L.iridescence&&u.enable(8),L.alphaTest&&u.enable(9),L.vertexColors&&u.enable(10),L.vertexAlphas&&u.enable(11),L.vertexUv1s&&u.enable(12),L.vertexUv2s&&u.enable(13),L.vertexUv3s&&u.enable(14),L.vertexTangents&&u.enable(15),L.anisotropy&&u.enable(16),L.alphaHash&&u.enable(17),L.batching&&u.enable(18),L.dispersion&&u.enable(19),L.retroreflection&&u.enable(24),L.batchingColor&&u.enable(20),L.gradientMap&&u.enable(21),L.packedNormalMap&&u.enable(22),L.vertexNormals&&u.enable(23),E.push(u.mask),u.disableAll(),L.fog&&u.enable(0),L.useFog&&u.enable(1),L.flatShading&&u.enable(2),L.logarithmicDepthBuffer&&u.enable(3),L.reversedDepthBuffer&&u.enable(4),L.skinning&&u.enable(5),L.morphTargets&&u.enable(6),L.morphNormals&&u.enable(7),L.morphColors&&u.enable(8),L.premultipliedAlpha&&u.enable(9),L.shadowMapEnabled&&u.enable(10),L.doubleSided&&u.enable(11),L.flipSided&&u.enable(12),L.useDepthPacking&&u.enable(13),L.dithering&&u.enable(14),L.transmission&&u.enable(15),L.sheen&&u.enable(16),L.opaque&&u.enable(17),L.pointsUvs&&u.enable(18),L.decodeVideoTexture&&u.enable(19),L.decodeVideoTextureEmissive&&u.enable(20),L.alphaToCoverage&&u.enable(21),L.numLightProbeGrids>0&&u.enable(22),L.hasPositionAttribute&&u.enable(23),E.push(u.mask)}function z(E){const L=x[E.type];let H;if(L){const G=xa[L];H=ly.clone(G.uniforms)}else H=E.uniforms;return H}function T(E,L){let H=g.get(L);return H!==void 0?++H.usedTimes:(H=new E3(r,L,E,o),p.push(H),g.set(L,H)),H}function F(E){if(--E.usedTimes===0){const L=p.indexOf(E);p[L]=p[p.length-1],p.pop(),g.delete(E.cacheKey),E.destroy()}}function U(E){h.remove(E)}function O(){h.dispose()}return{getParameters:A,getProgramCacheKey:S,getUniforms:z,acquireProgram:T,releaseProgram:F,releaseShaderCache:U,programs:p,dispose:O}}function D3(){let r=new WeakMap;function e(u){return r.has(u)}function n(u){let h=r.get(u);return h===void 0&&(h={},r.set(u,h)),h}function a(u){r.delete(u)}function o(u,h,d){r.get(u)[h]=d}function c(){r=new WeakMap}return{has:e,get:n,remove:a,update:o,dispose:c}}function U3(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function lx(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function cx(){const r=[];let e=0;const n=[],a=[],o=[];function c(){e=0,n.length=0,a.length=0,o.length=0}function u(v){let x=0;return v.isInstancedMesh&&(x+=2),v.isSkinnedMesh&&(x+=1),x}function h(v,x,b,A,S,y){let C=r[e];return C===void 0?(C={id:v.id,object:v,geometry:x,material:b,materialVariant:u(v),groupOrder:A,renderOrder:v.renderOrder,z:S,group:y},r[e]=C):(C.id=v.id,C.object=v,C.geometry=x,C.material=b,C.materialVariant=u(v),C.groupOrder=A,C.renderOrder=v.renderOrder,C.z=S,C.group=y),e++,C}function d(v,x,b,A,S,y,C){C.reversedDepth===!0&&(S=-S);const z=h(v,x,b,A,S,y);b.transmission>0?a.push(z):b.transparent===!0?o.push(z):n.push(z)}function p(v,x,b,A,S,y){const C=h(v,x,b,A,S,y);b.transmission>0?a.unshift(C):b.transparent===!0?o.unshift(C):n.unshift(C)}function g(v,x){n.length>1&&n.sort(v||U3),a.length>1&&a.sort(x||lx),o.length>1&&o.sort(x||lx)}function _(){for(let v=e,x=r.length;v<x;v++){const b=r[v];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:d,unshift:p,finish:_,sort:g}}function L3(){let r=new WeakMap;function e(a,o){const c=r.get(a);let u;return c===void 0?(u=new cx,r.set(a,[u])):o>=c.length?(u=new cx,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:e,dispose:n}}function N3(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={direction:new V,color:new tt};break;case"SpotLight":n={position:new V,direction:new V,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new tt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":n={color:new tt,position:new V,halfWidth:new V,halfHeight:new V};break}return r[e.id]=n,n}}}function P3(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=n,n}}}let O3=0;function z3(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function F3(r){const e=new N3,n=P3(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new V);const o=new V,c=new Ft,u=new Ft;function h(p){let g=0,_=0,v=0;for(let X=0;X<9;X++)a.probe[X].set(0,0,0);let x=0,b=0,A=0,S=0,y=0,C=0,z=0,T=0,F=0,U=0,O=0,E=0,L=0,H=0;p.sort(z3);for(let X=0,K=p.length;X<K;X++){const B=p[X],W=B.color,P=B.intensity,k=B.distance;let ne=null;if(B.shadow&&B.shadow.map&&(B.shadow.map.texture.format===dr?ne=B.shadow.map.texture:ne=B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)g+=W.r*P,_+=W.g*P,v+=W.b*P;else if(B.isLightProbe){for(let J=0;J<9;J++)a.probe[J].addScaledVector(B.sh.coefficients[J],P);H++}else if(B.isSunLight){const J=e.get(B);if(J.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const ee=B.shadow,N=n.get(B);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),a.sunShadow[b]=N,a.sunShadowMap[b]=ne;const Q=ee.getViewportCount();for(let ue=0;ue<Q;ue++)a.sunShadowMatrix[A+ue]=ee.getMatrix(ue),a.sunShadowCascade[A+ue]=ee._cascadeData[ue];A+=Q,b++}a.sun[x]=J,x++}else if(B.isDirectionalLight){const J=e.get(B);if(J.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const ee=B.shadow,N=n.get(B);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,a.directionalShadow[S]=N,a.directionalShadowMap[S]=ne,a.directionalShadowMatrix[S]=B.shadow.matrix,F++}a.directional[S]=J,S++}else if(B.isSpotLight){const J=e.get(B);J.position.setFromMatrixPosition(B.matrixWorld),J.color.copy(W).multiplyScalar(P),J.distance=k,J.coneCos=Math.cos(B.angle),J.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),J.decay=B.decay,a.spot[C]=J;const ee=B.shadow;if(B.map&&(a.spotLightMap[E]=B.map,E++,ee.updateMatrices(B),B.castShadow&&L++),a.spotLightMatrix[C]=ee.matrix,B.castShadow){const N=n.get(B);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,a.spotShadow[C]=N,a.spotShadowMap[C]=ne,O++}C++}else if(B.isRectAreaLight){const J=e.get(B);J.color.copy(W).multiplyScalar(P),J.halfWidth.set(B.width*.5,0,0),J.halfHeight.set(0,B.height*.5,0),a.rectArea[z]=J,z++}else if(B.isPointLight){const J=e.get(B);if(J.color.copy(B.color).multiplyScalar(B.intensity),J.distance=B.distance,J.decay=B.decay,B.castShadow){const ee=B.shadow,N=n.get(B);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,N.shadowCameraNear=ee.camera.near,N.shadowCameraFar=ee.camera.far,a.pointShadow[y]=N,a.pointShadowMap[y]=ne,a.pointShadowMatrix[y]=B.shadow.matrix,U++}a.point[y]=J,y++}else if(B.isHemisphereLight){const J=e.get(B);J.skyColor.copy(B.color).multiplyScalar(P),J.groundColor.copy(B.groundColor).multiplyScalar(P),a.hemi[T]=J,T++}}z>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=je.LTC_FLOAT_1,a.rectAreaLTC2=je.LTC_FLOAT_2):(a.rectAreaLTC1=je.LTC_HALF_1,a.rectAreaLTC2=je.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=v;const G=a.hash;(G.sunLength!==x||G.directionalLength!==S||G.pointLength!==y||G.spotLength!==C||G.rectAreaLength!==z||G.hemiLength!==T||G.numSunShadows!==b||G.numDirectionalShadows!==F||G.numPointShadows!==U||G.numSpotShadows!==O||G.numSpotMaps!==E||G.numLightProbes!==H)&&(a.sun.length=x,a.directional.length=S,a.spot.length=C,a.rectArea.length=z,a.point.length=y,a.hemi.length=T,a.sunShadow.length=b,a.sunShadowMap.length=b,a.sunShadowMatrix.length=A,a.sunShadowCascade.length=A,a.directionalShadow.length=F,a.directionalShadowMap.length=F,a.directionalShadowMatrix.length=F,a.pointShadow.length=U,a.pointShadowMap.length=U,a.pointShadowMatrix.length=U,a.spotShadow.length=O,a.spotShadowMap.length=O,a.spotLightMatrix.length=O+E-L,a.spotLightMap.length=E,a.numSpotLightShadowsWithMaps=L,a.numLightProbes=H,G.sunLength=x,G.directionalLength=S,G.pointLength=y,G.spotLength=C,G.rectAreaLength=z,G.hemiLength=T,G.numSunShadows=b,G.numDirectionalShadows=F,G.numPointShadows=U,G.numSpotShadows=O,G.numSpotMaps=E,G.numLightProbes=H,a.version=O3++)}function d(p,g){let _=0,v=0,x=0,b=0,A=0,S=0;const y=g.matrixWorldInverse;for(let C=0,z=p.length;C<z;C++){const T=p[C];if(T.isSunLight){const F=a.sun[_];F.direction.setFromMatrixPosition(T.matrixWorld),F.direction.transformDirection(y),_++}else if(T.isDirectionalLight){const F=a.directional[v];F.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),F.direction.sub(o),F.direction.transformDirection(y),v++}else if(T.isSpotLight){const F=a.spot[b];F.position.setFromMatrixPosition(T.matrixWorld),F.position.applyMatrix4(y),F.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),F.direction.sub(o),F.direction.transformDirection(y),b++}else if(T.isRectAreaLight){const F=a.rectArea[A];F.position.setFromMatrixPosition(T.matrixWorld),F.position.applyMatrix4(y),u.identity(),c.copy(T.matrixWorld),c.premultiply(y),u.extractRotation(c),F.halfWidth.set(T.width*.5,0,0),F.halfHeight.set(0,T.height*.5,0),F.halfWidth.applyMatrix4(u),F.halfHeight.applyMatrix4(u),A++}else if(T.isPointLight){const F=a.point[x];F.position.setFromMatrixPosition(T.matrixWorld),F.position.applyMatrix4(y),x++}else if(T.isHemisphereLight){const F=a.hemi[S];F.direction.setFromMatrixPosition(T.matrixWorld),F.direction.transformDirection(y),S++}}}return{setup:h,setupView:d,state:a}}function ux(r){const e=new F3(r),n=[],a=[],o=[];function c(v){_.camera=v,n.length=0,a.length=0,o.length=0}function u(v){n.push(v)}function h(v){a.push(v)}function d(v){o.push(v)}function p(){e.setup(n)}function g(v){e.setupView(n,v)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:p,setupLightsView:g,pushLight:u,pushShadow:h,pushLightProbeGrid:d}}function B3(r){let e=new WeakMap;function n(o,c=0){const u=e.get(o);let h;return u===void 0?(h=new ux(r),e.set(o,[h])):c>=u.length?(h=new ux(r),u.push(h)):h=u[c],h}function a(){e=new WeakMap}return{get:n,dispose:a}}const I3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,H3=`uniform sampler2D shadow_pass;
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
}`,G3=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],V3=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],fx=new Ft,El=new V,Hd=new V;function k3(r,e,n){let a=new jp;const o=new Pe,c=new Pe,u=new Jt,h=new Xb,d=new qb,p={},g=n.maxTextureSize,_={[zs]:Gn,[Gn]:zs,[di]:di},v=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:I3,fragmentShader:H3}),x=v.clone();x.defines.HORIZONTAL_PASS=1;const b=new Bn;b.setAttribute("position",new oa(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new rn(b,v),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cl;let y=this.type;this.render=function(U,O,E){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||U.length===0)return;this.type===H1&&(St("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Cl);const L=r.getRenderTarget(),H=r.getActiveCubeFace(),G=r.getActiveMipmapLevel(),X=r.state;X.setBlending(ns),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const K=y!==this.type;K&&O.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(W=>W.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,W=U.length;B<W;B++){const P=U[B],k=P.shadow;if(k===void 0){St("WebGLShadowMap:",P,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;o.copy(k.mapSize);const ne=k.getFrameExtents();o.multiply(ne),c.copy(k.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(c.x=Math.floor(g/ne.x),o.x=c.x*ne.x,k.mapSize.x=c.x),o.y>g&&(c.y=Math.floor(g/ne.y),o.y=c.y*ne.y,k.mapSize.y=c.y));const J=r.state.buffers.depth.getReversed();if(k.camera._reversedDepth=J,k.map===null||K===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Tl){if(P.isPointLight){St("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Kn(o.x,o.y,{format:dr,type:yn,minFilter:mn,magFilter:mn,generateMipmaps:!1}),k.map.texture.name=P.name+".shadowMap",k.map.depthTexture=new Fs(o.x,o.y,Pi),k.map.depthTexture.name=P.name+".shadowMapDepth",k.map.depthTexture.format=Ea,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Zn,k.map.depthTexture.magFilter=Zn}else P.isPointLight?(k.map=new a0(o.x),k.map.depthTexture=new cb(o.x,zi)):(k.map=new Kn(o.x,o.y),k.map.depthTexture=new Fs(o.x,o.y,zi)),k.map.depthTexture.name=P.name+".shadowMap",k.map.depthTexture.format=Ea,this.type===Cl?(k.map.depthTexture.compareFunction=J?Zp:Wu,k.map.depthTexture.minFilter=mn,k.map.depthTexture.magFilter=mn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Zn,k.map.depthTexture.magFilter=Zn);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==o.x||k.map.height!==o.y)&&k.map.setSize(o.x,o.y);const ee=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();P.isPointLight!==!0&&k.updateMatrices(P,E);for(let N=0;N<ee;N++){const Q=k.getCamera(N);if(P.isPointLight){const ue=k.camera,Ue=k.matrix,Fe=P.distance||ue.far;Fe!==ue.far&&(ue.far=Fe,ue.updateProjectionMatrix()),El.setFromMatrixPosition(P.matrixWorld),ue.position.copy(El),Hd.copy(ue.position),Hd.add(G3[N]),ue.up.copy(V3[N]),ue.lookAt(Hd),ue.updateMatrixWorld(),Ue.makeTranslation(-El.x,-El.y,-El.z),fx.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),k._frustum.setFromProjectionMatrix(fx,ue.coordinateSystem,ue.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)r.setRenderTarget(k.map,N),r.clear();else{N===0&&(r.setRenderTarget(k.map),r.clear());const ue=k.getViewport(N);u.set(c.x*ue.x,c.y*ue.y,c.x*ue.z,c.y*ue.w),X.viewport(u)}a=k.getFrustum(N),T(O,E,Q,P,this.type)}k.isPointLightShadow!==!0&&this.type===Tl&&C(k,E),k.needsUpdate=!1}y=this.type,S.needsUpdate=!1,r.setRenderTarget(L,H,G)};function C(U,O){const E=e.update(A);v.defines.VSM_SAMPLES!==U.blurSamples&&(v.defines.VSM_SAMPLES=U.blurSamples,x.defines.VSM_SAMPLES=U.blurSamples,v.needsUpdate=!0,x.needsUpdate=!0),U.mapPass===null?U.mapPass=new Kn(o.x,o.y,{format:dr,type:yn}):(U.mapPass.width!==U.map.width||U.mapPass.height!==U.map.height)&&U.mapPass.setSize(U.map.width,U.map.height),v.uniforms.shadow_pass.value=U.map.depthTexture,v.uniforms.resolution.value.set(U.map.width,U.map.height),v.uniforms.radius.value=U.radius,r.setRenderTarget(U.mapPass),r.clear(),r.renderBufferDirect(O,null,E,v,A,null),x.uniforms.shadow_pass.value=U.mapPass.texture,x.uniforms.resolution.value.set(U.map.width,U.map.height),x.uniforms.radius.value=U.radius,r.setRenderTarget(U.map),r.clear(),r.renderBufferDirect(O,null,E,x,A,null)}function z(U,O,E,L){let H=null;const G=E.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(G!==void 0)H=G;else if(H=E.isPointLight===!0?d:h,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){const X=H.uuid,K=O.uuid;let B=p[X];B===void 0&&(B={},p[X]=B);let W=B[K];W===void 0&&(W=H.clone(),B[K]=W,O.addEventListener("dispose",F)),H=W}if(H.visible=O.visible,H.wireframe=O.wireframe,L===Tl?H.side=O.shadowSide!==null?O.shadowSide:O.side:H.side=O.shadowSide!==null?O.shadowSide:_[O.side],H.alphaMap=O.alphaMap,H.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,H.map=O.map,H.clipShadows=O.clipShadows,H.clippingPlanes=O.clippingPlanes,H.clipIntersection=O.clipIntersection,H.displacementMap=O.displacementMap,H.displacementScale=O.displacementScale,H.displacementBias=O.displacementBias,H.wireframeLinewidth=O.wireframeLinewidth,H.linewidth=O.linewidth,E.isPointLight===!0&&H.isMeshDistanceMaterial===!0){const X=r.properties.get(H);X.light=E}return H}function T(U,O,E,L,H){if(U.visible===!1)return;if(U.layers.test(O.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&H===Tl)&&(!U.frustumCulled||U.intersectsFrustum(a))){U.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,U.matrixWorld);const K=e.update(U),B=U.material;if(Array.isArray(B)){const W=K.groups;for(let P=0,k=W.length;P<k;P++){const ne=W[P],J=B[ne.materialIndex];if(J&&J.visible){const ee=z(U,J,L,H);U.onBeforeShadow(r,U,O,E,K,ee,ne),r.renderBufferDirect(E,null,K,ee,U,ne),U.onAfterShadow(r,U,O,E,K,ee,ne)}}}else if(B.visible){const W=z(U,B,L,H);U.onBeforeShadow(r,U,O,E,K,W,null),r.renderBufferDirect(E,null,K,W,U,null),U.onAfterShadow(r,U,O,E,K,W,null)}}const X=U.children;for(let K=0,B=X.length;K<B;K++)T(X[K],O,E,L,H)}function F(U){U.target.removeEventListener("dispose",F);for(const E in p){const L=p[E],H=U.target.uuid;H in L&&(L[H].dispose(),delete L[H])}}}function W3(r,e){function n(){let $=!1;const Ge=new Jt;let Me=null;const He=new Jt(0,0,0,0);return{setMask:function(Qe){Me!==Qe&&!$&&(r.colorMask(Qe,Qe,Qe,Qe),Me=Qe)},setLocked:function(Qe){$=Qe},setClear:function(Qe,Le,lt,it,Qt){Qt===!0&&(Qe*=it,Le*=it,lt*=it),Ge.set(Qe,Le,lt,it),He.equals(Ge)===!1&&(r.clearColor(Qe,Le,lt,it),He.copy(Ge))},reset:function(){$=!1,Me=null,He.set(-1,0,0,0)}}}function a(){let $=!1,Ge=!1,Me=null,He=null,Qe=null;return{setReversed:function(Le){if(Ge!==Le){const lt=e.get("EXT_clip_control");Le?lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.ZERO_TO_ONE_EXT):lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.NEGATIVE_ONE_TO_ONE_EXT),Ge=Le;const it=Qe;Qe=null,this.setClear(it)}},getReversed:function(){return Ge},setTest:function(Le){Le?ye(r.DEPTH_TEST):oe(r.DEPTH_TEST)},setMask:function(Le){Me!==Le&&!$&&(r.depthMask(Le),Me=Le)},setFunc:function(Le){if(Ge&&(Le=SM[Le]),He!==Le){switch(Le){case Xd:r.depthFunc(r.NEVER);break;case qd:r.depthFunc(r.ALWAYS);break;case Yd:r.depthFunc(r.LESS);break;case Bl:r.depthFunc(r.LEQUAL);break;case Zd:r.depthFunc(r.EQUAL);break;case Kd:r.depthFunc(r.GEQUAL);break;case Qd:r.depthFunc(r.GREATER);break;case Jd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}He=Le}},setLocked:function(Le){$=Le},setClear:function(Le){Qe!==Le&&(Qe=Le,Ge&&(Le=1-Le),r.clearDepth(Le))},reset:function(){$=!1,Me=null,He=null,Qe=null,Ge=!1}}}function o(){let $=!1,Ge=null,Me=null,He=null,Qe=null,Le=null,lt=null,it=null,Qt=null;return{setTest:function(Pt){$||(Pt?ye(r.STENCIL_TEST):oe(r.STENCIL_TEST))},setMask:function(Pt){Ge!==Pt&&!$&&(r.stencilMask(Pt),Ge=Pt)},setFunc:function(Pt,Vn,kn){(Me!==Pt||He!==Vn||Qe!==kn)&&(r.stencilFunc(Pt,Vn,kn),Me=Pt,He=Vn,Qe=kn)},setOp:function(Pt,Vn,kn){(Le!==Pt||lt!==Vn||it!==kn)&&(r.stencilOp(Pt,Vn,kn),Le=Pt,lt=Vn,it=kn)},setLocked:function(Pt){$=Pt},setClear:function(Pt){Qt!==Pt&&(r.clearStencil(Pt),Qt=Pt)},reset:function(){$=!1,Ge=null,Me=null,He=null,Qe=null,Le=null,lt=null,it=null,Qt=null}}}const c=new n,u=new a,h=new o,d=new WeakMap,p=new WeakMap;let g={},_={},v={},x=new WeakMap,b=[],A=null,S=!1,y=null,C=null,z=null,T=null,F=null,U=null,O=null,E=new tt(0,0,0),L=0,H=!1,G=null,X=null,K=null,B=null,W=null;const P=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,ne=0;const J=r.getParameter(r.VERSION);J.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(J)[1]),k=ne>=1):J.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),k=ne>=2);let ee=null,N={};const Q=r.getParameter(r.SCISSOR_BOX),ue=r.getParameter(r.VIEWPORT),Ue=new Jt().fromArray(Q),Fe=new Jt().fromArray(ue);function Ke($,Ge,Me,He){const Qe=new Uint8Array(4),Le=r.createTexture();r.bindTexture($,Le),r.texParameteri($,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri($,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let lt=0;lt<Me;lt++)$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?r.texImage3D(Ge,0,r.RGBA,1,1,He,0,r.RGBA,r.UNSIGNED_BYTE,Qe):r.texImage2D(Ge+lt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Qe);return Le}const re={};re[r.TEXTURE_2D]=Ke(r.TEXTURE_2D,r.TEXTURE_2D,1),re[r.TEXTURE_CUBE_MAP]=Ke(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[r.TEXTURE_2D_ARRAY]=Ke(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),re[r.TEXTURE_3D]=Ke(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),h.setClear(0),ye(r.DEPTH_TEST),u.setFunc(Bl),Ne(!1),Oe(i_),ye(r.CULL_FACE),Ee(ns);function ye($){g[$]!==!0&&(r.enable($),g[$]=!0)}function oe($){g[$]!==!1&&(r.disable($),g[$]=!1)}function ve($,Ge){return v[$]!==Ge?(r.bindFramebuffer($,Ge),v[$]=Ge,$===r.DRAW_FRAMEBUFFER&&(v[r.FRAMEBUFFER]=Ge),$===r.FRAMEBUFFER&&(v[r.DRAW_FRAMEBUFFER]=Ge),!0):!1}function me($,Ge){let Me=b,He=!1;if($){Me=x.get(Ge),Me===void 0&&(Me=[],x.set(Ge,Me));const Qe=$.textures;if(Me.length!==Qe.length||Me[0]!==r.COLOR_ATTACHMENT0){for(let Le=0,lt=Qe.length;Le<lt;Le++)Me[Le]=r.COLOR_ATTACHMENT0+Le;Me.length=Qe.length,He=!0}}else Me[0]!==r.BACK&&(Me[0]=r.BACK,He=!0);He&&r.drawBuffers(Me)}function Ae($){return A!==$?(r.useProgram($),A=$,!0):!1}const qe={[po]:r.FUNC_ADD,[V1]:r.FUNC_SUBTRACT,[k1]:r.FUNC_REVERSE_SUBTRACT};qe[W1]=r.MIN,qe[X1]=r.MAX;const de={[q1]:r.ZERO,[Y1]:r.ONE,[Z1]:r.SRC_COLOR,[Ex]:r.SRC_ALPHA,[eM]:r.SRC_ALPHA_SATURATE,[j1]:r.DST_COLOR,[Q1]:r.DST_ALPHA,[K1]:r.ONE_MINUS_SRC_COLOR,[wx]:r.ONE_MINUS_SRC_ALPHA,[$1]:r.ONE_MINUS_DST_COLOR,[J1]:r.ONE_MINUS_DST_ALPHA,[tM]:r.CONSTANT_COLOR,[nM]:r.ONE_MINUS_CONSTANT_COLOR,[iM]:r.CONSTANT_ALPHA,[aM]:r.ONE_MINUS_CONSTANT_ALPHA};function Ee($,Ge,Me,He,Qe,Le,lt,it,Qt,Pt){if($===ns){S===!0&&(oe(r.BLEND),S=!1);return}if(S===!1&&(ye(r.BLEND),S=!0),$!==G1){if($!==y||Pt!==H){if((C!==po||F!==po)&&(r.blendEquation(r.FUNC_ADD),C=po,F=po),Pt)switch($){case Dl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fl:r.blendFunc(r.ONE,r.ONE);break;case a_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case s_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:It("WebGLState: Invalid blending: ",$);break}else switch($){case Dl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case a_:It("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case s_:It("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:It("WebGLState: Invalid blending: ",$);break}z=null,T=null,U=null,O=null,E.set(0,0,0),L=0,y=$,H=Pt}return}Qe=Qe||Ge,Le=Le||Me,lt=lt||He,(Ge!==C||Qe!==F)&&(r.blendEquationSeparate(qe[Ge],qe[Qe]),C=Ge,F=Qe),(Me!==z||He!==T||Le!==U||lt!==O)&&(r.blendFuncSeparate(de[Me],de[He],de[Le],de[lt]),z=Me,T=He,U=Le,O=lt),(it.equals(E)===!1||Qt!==L)&&(r.blendColor(it.r,it.g,it.b,Qt),E.copy(it),L=Qt),y=$,H=!1}function Te($,Ge){$.side===di?oe(r.CULL_FACE):ye(r.CULL_FACE);let Me=$.side===Gn;Ge&&(Me=!Me),Ne(Me),$.blending===Dl&&$.transparent===!1?Ee(ns):Ee($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),u.setFunc($.depthFunc),u.setTest($.depthTest),u.setMask($.depthWrite),c.setMask($.colorWrite);const He=$.stencilWrite;h.setTest(He),He&&(h.setMask($.stencilWriteMask),h.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),h.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),Be($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?ye(r.SAMPLE_ALPHA_TO_COVERAGE):oe(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ne($){G!==$&&($?r.frontFace(r.CW):r.frontFace(r.CCW),G=$)}function Oe($){$!==B1?(ye(r.CULL_FACE),$!==X&&($===i_?r.cullFace(r.BACK):$===I1?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):oe(r.CULL_FACE),X=$}function at($){$!==K&&(k&&r.lineWidth($),K=$)}function Be($,Ge,Me){$?(ye(r.POLYGON_OFFSET_FILL),(B!==Ge||W!==Me)&&(B=Ge,W=Me,u.getReversed()&&(Ge=-Ge),r.polygonOffset(Ge,Me))):oe(r.POLYGON_OFFSET_FILL)}function pt($){$?ye(r.SCISSOR_TEST):oe(r.SCISSOR_TEST)}function rt($){$===void 0&&($=r.TEXTURE0+P-1),ee!==$&&(r.activeTexture($),ee=$)}function Z($,Ge,Me){Me===void 0&&(ee===null?Me=r.TEXTURE0+P-1:Me=ee);let He=N[Me];He===void 0&&(He={type:void 0,texture:void 0},N[Me]=He),(He.type!==$||He.texture!==Ge)&&(ee!==Me&&(r.activeTexture(Me),ee=Me),r.bindTexture($,Ge||re[$]),He.type=$,He.texture=Ge)}function mt(){const $=N[ee];$!==void 0&&$.type!==void 0&&(r.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function Mt(){try{r.compressedTexImage2D(...arguments)}catch($){It("WebGLState:",$)}}function I(){try{r.compressedTexImage3D(...arguments)}catch($){It("WebGLState:",$)}}function w(){try{r.texSubImage2D(...arguments)}catch($){It("WebGLState:",$)}}function te(){try{r.texSubImage3D(...arguments)}catch($){It("WebGLState:",$)}}function ce(){try{r.compressedTexSubImage2D(...arguments)}catch($){It("WebGLState:",$)}}function _e(){try{r.compressedTexSubImage3D(...arguments)}catch($){It("WebGLState:",$)}}function ze(){try{r.texStorage2D(...arguments)}catch($){It("WebGLState:",$)}}function Ve(){try{r.texStorage3D(...arguments)}catch($){It("WebGLState:",$)}}function ge(){try{r.texImage2D(...arguments)}catch($){It("WebGLState:",$)}}function Se(){try{r.texImage3D(...arguments)}catch($){It("WebGLState:",$)}}function Ie($){return _[$]!==void 0?_[$]:r.getParameter($)}function Je($,Ge){_[$]!==Ge&&(r.pixelStorei($,Ge),_[$]=Ge)}function Ze($){Ue.equals($)===!1&&(r.scissor($.x,$.y,$.z,$.w),Ue.copy($))}function Xe($){Fe.equals($)===!1&&(r.viewport($.x,$.y,$.z,$.w),Fe.copy($))}function ft($,Ge){let Me=p.get(Ge);Me===void 0&&(Me=new WeakMap,p.set(Ge,Me));let He=Me.get($);He===void 0&&(He=r.getUniformBlockIndex(Ge,$.name),Me.set($,He))}function nt($,Ge){const He=p.get(Ge).get($);d.get(Ge)!==He&&(r.uniformBlockBinding(Ge,He,$.__bindingPointIndex),d.set(Ge,He))}function xt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),g={},_={},ee=null,N={},v={},x=new WeakMap,b=[],A=null,S=!1,y=null,C=null,z=null,T=null,F=null,U=null,O=null,E=new tt(0,0,0),L=0,H=!1,G=null,X=null,K=null,B=null,W=null,Ue.set(0,0,r.canvas.width,r.canvas.height),Fe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),h.reset()}return{buffers:{color:c,depth:u,stencil:h},enable:ye,disable:oe,bindFramebuffer:ve,drawBuffers:me,useProgram:Ae,setBlending:Ee,setMaterial:Te,setFlipSided:Ne,setCullFace:Oe,setLineWidth:at,setPolygonOffset:Be,setScissorTest:pt,activeTexture:rt,bindTexture:Z,unbindTexture:mt,compressedTexImage2D:Mt,compressedTexImage3D:I,texImage2D:ge,texImage3D:Se,pixelStorei:Je,getParameter:Ie,updateUBOMapping:ft,uniformBlockBinding:nt,texStorage2D:ze,texStorage3D:Ve,texSubImage2D:w,texSubImage3D:te,compressedTexSubImage2D:ce,compressedTexSubImage3D:_e,scissor:Ze,viewport:Xe,reset:xt}}function X3(r,e,n,a,o,c,u){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Pe,g=new WeakMap,_=new Set;let v;const x=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(I,w){return b?new OffscreenCanvas(I,w):Hu("canvas")}function S(I,w,te){let ce=1;const _e=Mt(I);if((_e.width>te||_e.height>te)&&(ce=te/Math.max(_e.width,_e.height)),ce<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const ze=Math.floor(ce*_e.width),Ve=Math.floor(ce*_e.height);v===void 0&&(v=A(ze,Ve));const ge=w?A(ze,Ve):v;return ge.width=ze,ge.height=Ve,ge.getContext("2d").drawImage(I,0,0,ze,Ve),St("WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+ze+"x"+Ve+")."),ge}else return"data"in I&&St("WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),I;return I}function y(I){return I.generateMipmaps}function C(I){r.generateMipmap(I)}function z(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function T(I,w,te,ce,_e,ze=!1){if(I!==null){if(r[I]!==void 0)return r[I];St("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Ve;ce&&(Ve=e.get("EXT_texture_norm16"),Ve||St("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ge=w;if(w===r.RED&&(te===r.FLOAT&&(ge=r.R32F),te===r.HALF_FLOAT&&(ge=r.R16F),te===r.UNSIGNED_BYTE&&(ge=r.R8),te===r.UNSIGNED_SHORT&&Ve&&(ge=Ve.R16_EXT),te===r.SHORT&&Ve&&(ge=Ve.R16_SNORM_EXT)),w===r.RED_INTEGER&&(te===r.UNSIGNED_BYTE&&(ge=r.R8UI),te===r.UNSIGNED_SHORT&&(ge=r.R16UI),te===r.UNSIGNED_INT&&(ge=r.R32UI),te===r.BYTE&&(ge=r.R8I),te===r.SHORT&&(ge=r.R16I),te===r.INT&&(ge=r.R32I)),w===r.RG&&(te===r.FLOAT&&(ge=r.RG32F),te===r.HALF_FLOAT&&(ge=r.RG16F),te===r.UNSIGNED_BYTE&&(ge=r.RG8),te===r.UNSIGNED_SHORT&&Ve&&(ge=Ve.RG16_EXT),te===r.SHORT&&Ve&&(ge=Ve.RG16_SNORM_EXT)),w===r.RG_INTEGER&&(te===r.UNSIGNED_BYTE&&(ge=r.RG8UI),te===r.UNSIGNED_SHORT&&(ge=r.RG16UI),te===r.UNSIGNED_INT&&(ge=r.RG32UI),te===r.BYTE&&(ge=r.RG8I),te===r.SHORT&&(ge=r.RG16I),te===r.INT&&(ge=r.RG32I)),w===r.RGB_INTEGER&&(te===r.UNSIGNED_BYTE&&(ge=r.RGB8UI),te===r.UNSIGNED_SHORT&&(ge=r.RGB16UI),te===r.UNSIGNED_INT&&(ge=r.RGB32UI),te===r.BYTE&&(ge=r.RGB8I),te===r.SHORT&&(ge=r.RGB16I),te===r.INT&&(ge=r.RGB32I)),w===r.RGBA_INTEGER&&(te===r.UNSIGNED_BYTE&&(ge=r.RGBA8UI),te===r.UNSIGNED_SHORT&&(ge=r.RGBA16UI),te===r.UNSIGNED_INT&&(ge=r.RGBA32UI),te===r.BYTE&&(ge=r.RGBA8I),te===r.SHORT&&(ge=r.RGBA16I),te===r.INT&&(ge=r.RGBA32I)),w===r.RGB&&(te===r.UNSIGNED_SHORT&&Ve&&(ge=Ve.RGB16_EXT),te===r.SHORT&&Ve&&(ge=Ve.RGB16_SNORM_EXT),te===r.UNSIGNED_INT_5_9_9_9_REV&&(ge=r.RGB9_E5),te===r.UNSIGNED_INT_10F_11F_11F_REV&&(ge=r.R11F_G11F_B10F)),w===r.RGBA){const Se=ze?Iu:Ht.getTransfer(_e);te===r.FLOAT&&(ge=r.RGBA32F),te===r.HALF_FLOAT&&(ge=r.RGBA16F),te===r.UNSIGNED_BYTE&&(ge=Se===en?r.SRGB8_ALPHA8:r.RGBA8),te===r.UNSIGNED_SHORT&&Ve&&(ge=Ve.RGBA16_EXT),te===r.SHORT&&Ve&&(ge=Ve.RGBA16_SNORM_EXT),te===r.UNSIGNED_SHORT_4_4_4_4&&(ge=r.RGBA4),te===r.UNSIGNED_SHORT_5_5_5_1&&(ge=r.RGB5_A1)}return(ge===r.R16F||ge===r.R32F||ge===r.RG16F||ge===r.RG32F||ge===r.RGBA16F||ge===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function F(I,w){let te;return I?w===null||w===zi||w===Hl?te=r.DEPTH24_STENCIL8:w===Pi?te=r.DEPTH32F_STENCIL8:w===Il&&(te=r.DEPTH24_STENCIL8,St("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===zi||w===Hl?te=r.DEPTH_COMPONENT24:w===Pi?te=r.DEPTH_COMPONENT32F:w===Il&&(te=r.DEPTH_COMPONENT16),te}function U(I,w){return y(I)===!0||I.isFramebufferTexture&&I.minFilter!==Zn&&I.minFilter!==mn?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function O(I){const w=I.target;w.removeEventListener("dispose",O),L(w),w.isVideoTexture&&g.delete(w),w.isHTMLTexture&&_.delete(w)}function E(I){const w=I.target;w.removeEventListener("dispose",E),G(w)}function L(I){const w=a.get(I);if(w.__webglInit===void 0)return;const te=I.source,ce=x.get(te);if(ce){const _e=ce[w.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&H(I),Object.keys(ce).length===0&&x.delete(te)}a.remove(I)}function H(I){const w=a.get(I);r.deleteTexture(w.__webglTexture);const te=I.source,ce=x.get(te);delete ce[w.__cacheKey],u.memory.textures--}function G(I){const w=a.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),a.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(w.__webglFramebuffer[ce]))for(let _e=0;_e<w.__webglFramebuffer[ce].length;_e++)r.deleteFramebuffer(w.__webglFramebuffer[ce][_e]);else r.deleteFramebuffer(w.__webglFramebuffer[ce]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[ce])}else{if(Array.isArray(w.__webglFramebuffer))for(let ce=0;ce<w.__webglFramebuffer.length;ce++)r.deleteFramebuffer(w.__webglFramebuffer[ce]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ce=0;ce<w.__webglColorRenderbuffer.length;ce++)w.__webglColorRenderbuffer[ce]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[ce]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const te=I.textures;for(let ce=0,_e=te.length;ce<_e;ce++){const ze=a.get(te[ce]);ze.__webglTexture&&(r.deleteTexture(ze.__webglTexture),u.memory.textures--),a.remove(te[ce])}a.remove(I)}let X=0;function K(){X=0}function B(){return X}function W(I){X=I}function P(){const I=X;return I>=o.maxTextures&&St("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+o.maxTextures),X+=1,I}function k(I){const w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function ne(I,w){const te=a.get(I);if(I.isVideoTexture&&Z(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&te.__version!==I.version){const ce=I.image;if(ce===null)St("WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)St("WebGLRenderer: Texture marked for update but image is incomplete");else{oe(te,I,w);return}}else I.isExternalTexture&&(te.__webglTexture=I.sourceTexture?I.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,te.__webglTexture,r.TEXTURE0+w)}function J(I,w){const te=a.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&te.__version!==I.version){oe(te,I,w);return}else I.isExternalTexture&&(te.__webglTexture=I.sourceTexture?I.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,te.__webglTexture,r.TEXTURE0+w)}function ee(I,w){const te=a.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&te.__version!==I.version){oe(te,I,w);return}n.bindTexture(r.TEXTURE_3D,te.__webglTexture,r.TEXTURE0+w)}function N(I,w){const te=a.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&te.__version!==I.version){ve(te,I,w);return}n.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture,r.TEXTURE0+w)}const Q={[zu]:r.REPEAT,[Ni]:r.CLAMP_TO_EDGE,[jd]:r.MIRRORED_REPEAT},ue={[Zn]:r.NEAREST,[oM]:r.NEAREST_MIPMAP_NEAREST,[au]:r.NEAREST_MIPMAP_LINEAR,[mn]:r.LINEAR,[ld]:r.LINEAR_MIPMAP_NEAREST,[ya]:r.LINEAR_MIPMAP_LINEAR},Ue={[fM]:r.NEVER,[gM]:r.ALWAYS,[hM]:r.LESS,[Wu]:r.LEQUAL,[dM]:r.EQUAL,[Zp]:r.GEQUAL,[pM]:r.GREATER,[mM]:r.NOTEQUAL};function Fe(I,w){if(w.type===Pi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===mn||w.magFilter===ld||w.magFilter===au||w.magFilter===ya||w.minFilter===mn||w.minFilter===ld||w.minFilter===au||w.minFilter===ya)&&St("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,Q[w.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,Q[w.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,Q[w.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,ue[w.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,ue[w.minFilter]),w.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,Ue[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Zn||w.minFilter!==au&&w.minFilter!==ya||w.type===Pi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||a.get(w).__currentAnisotropy){const te=e.get("EXT_texture_filter_anisotropic");r.texParameterf(I,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,o.getMaxAnisotropy())),a.get(w).__currentAnisotropy=w.anisotropy}}}function Ke(I,w){let te=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",O));const ce=w.source;let _e=x.get(ce);_e===void 0&&(_e={},x.set(ce,_e));const ze=k(w);if(ze!==I.__cacheKey){_e[ze]===void 0&&(_e[ze]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,te=!0),_e[ze].usedTimes++;const Ve=_e[I.__cacheKey];Ve!==void 0&&(_e[I.__cacheKey].usedTimes--,Ve.usedTimes===0&&H(w)),I.__cacheKey=ze,I.__webglTexture=_e[ze].texture}return te}function re(I,w,te){return Math.floor(Math.floor(I/te)/w)}function ye(I,w,te,ce){const ze=I.updateRanges;if(ze.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,w.width,w.height,te,ce,w.data);else{ze.sort((Je,Ze)=>Je.start-Ze.start);let Ve=0;for(let Je=1;Je<ze.length;Je++){const Ze=ze[Ve],Xe=ze[Je],ft=Ze.start+Ze.count,nt=re(Xe.start,w.width,4),xt=re(Ze.start,w.width,4);Xe.start<=ft+1&&nt===xt&&re(Xe.start+Xe.count-1,w.width,4)===nt?Ze.count=Math.max(Ze.count,Xe.start+Xe.count-Ze.start):(++Ve,ze[Ve]=Xe)}ze.length=Ve+1;const ge=n.getParameter(r.UNPACK_ROW_LENGTH),Se=n.getParameter(r.UNPACK_SKIP_PIXELS),Ie=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,w.width);for(let Je=0,Ze=ze.length;Je<Ze;Je++){const Xe=ze[Je],ft=Math.floor(Xe.start/4),nt=Math.ceil(Xe.count/4),xt=ft%w.width,$=Math.floor(ft/w.width),Ge=nt,Me=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,xt),n.pixelStorei(r.UNPACK_SKIP_ROWS,$),n.texSubImage2D(r.TEXTURE_2D,0,xt,$,Ge,Me,te,ce,w.data)}I.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,ge),n.pixelStorei(r.UNPACK_SKIP_PIXELS,Se),n.pixelStorei(r.UNPACK_SKIP_ROWS,Ie)}}function oe(I,w,te){let ce=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ce=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ce=r.TEXTURE_3D);const _e=Ke(I,w),ze=w.source;n.bindTexture(ce,I.__webglTexture,r.TEXTURE0+te);const Ve=a.get(ze);if(ze.version!==Ve.__version||_e===!0){if(n.activeTexture(r.TEXTURE0+te),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const Me=Ht.getPrimaries(Ht.workingColorSpace),He=w.colorSpace===ja?null:Ht.getPrimaries(w.colorSpace),Qe=w.colorSpace===ja||Me===He?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe)}n.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment);let Se=S(w.image,!1,o.maxTextureSize);Se=mt(w,Se);const Ie=c.convert(w.format,w.colorSpace),Je=c.convert(w.type);let Ze=T(w.internalFormat,Ie,Je,w.normalized,w.colorSpace,w.isVideoTexture);Fe(ce,w);let Xe;const ft=w.mipmaps,nt=w.isVideoTexture!==!0,xt=Ve.__version===void 0||_e===!0,$=ze.dataReady,Ge=U(w,Se);if(w.isDepthTexture)Ze=F(w.format===cr,w.type),xt&&(nt?n.texStorage2D(r.TEXTURE_2D,1,Ze,Se.width,Se.height):n.texImage2D(r.TEXTURE_2D,0,Ze,Se.width,Se.height,0,Ie,Je,null));else if(w.isDataTexture)if(ft.length>0){nt&&xt&&n.texStorage2D(r.TEXTURE_2D,Ge,Ze,ft[0].width,ft[0].height);for(let Me=0,He=ft.length;Me<He;Me++)Xe=ft[Me],nt?$&&n.texSubImage2D(r.TEXTURE_2D,Me,0,0,Xe.width,Xe.height,Ie,Je,Xe.data):n.texImage2D(r.TEXTURE_2D,Me,Ze,Xe.width,Xe.height,0,Ie,Je,Xe.data);w.generateMipmaps=!1}else nt?(xt&&n.texStorage2D(r.TEXTURE_2D,Ge,Ze,Se.width,Se.height),$&&ye(w,Se,Ie,Je)):n.texImage2D(r.TEXTURE_2D,0,Ze,Se.width,Se.height,0,Ie,Je,Se.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){nt&&xt&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ge,Ze,ft[0].width,ft[0].height,Se.depth);for(let Me=0,He=ft.length;Me<He;Me++)if(Xe=ft[Me],w.format!==Oi)if(Ie!==null)if(nt){if($)if(w.layerUpdates.size>0){const Qe=W_(Xe.width,Xe.height,w.format,w.type);for(const Le of w.layerUpdates){const lt=Xe.data.subarray(Le*Qe/Xe.data.BYTES_PER_ELEMENT,(Le+1)*Qe/Xe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,Le,Xe.width,Xe.height,1,Ie,lt)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,0,Xe.width,Xe.height,Se.depth,Ie,Xe.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Me,Ze,Xe.width,Xe.height,Se.depth,0,Xe.data,0,0);else St("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else nt?$&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,0,Xe.width,Xe.height,Se.depth,Ie,Je,Xe.data):n.texImage3D(r.TEXTURE_2D_ARRAY,Me,Ze,Xe.width,Xe.height,Se.depth,0,Ie,Je,Xe.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{nt&&xt&&n.texStorage2D(r.TEXTURE_2D,Ge,Ze,ft[0].width,ft[0].height);for(let Me=0,He=ft.length;Me<He;Me++)Xe=ft[Me],w.format!==Oi?Ie!==null?nt?$&&n.compressedTexSubImage2D(r.TEXTURE_2D,Me,0,0,Xe.width,Xe.height,Ie,Xe.data):n.compressedTexImage2D(r.TEXTURE_2D,Me,Ze,Xe.width,Xe.height,0,Xe.data):St("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?$&&n.texSubImage2D(r.TEXTURE_2D,Me,0,0,Xe.width,Xe.height,Ie,Je,Xe.data):n.texImage2D(r.TEXTURE_2D,Me,Ze,Xe.width,Xe.height,0,Ie,Je,Xe.data)}else if(w.isDataArrayTexture)if(nt){if(xt&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ge,Ze,Se.width,Se.height,Se.depth),$)if(w.layerUpdates.size>0){const Me=W_(Se.width,Se.height,w.format,w.type);for(const He of w.layerUpdates){const Qe=Se.data.subarray(He*Me/Se.data.BYTES_PER_ELEMENT,(He+1)*Me/Se.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,He,Se.width,Se.height,1,Ie,Je,Qe)}w.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Se.width,Se.height,Se.depth,Ie,Je,Se.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Ze,Se.width,Se.height,Se.depth,0,Ie,Je,Se.data);else if(w.isData3DTexture)nt?(xt&&n.texStorage3D(r.TEXTURE_3D,Ge,Ze,Se.width,Se.height,Se.depth),$&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Se.width,Se.height,Se.depth,Ie,Je,Se.data)):n.texImage3D(r.TEXTURE_3D,0,Ze,Se.width,Se.height,Se.depth,0,Ie,Je,Se.data);else if(w.isFramebufferTexture){if(xt)if(nt)n.texStorage2D(r.TEXTURE_2D,Ge,Ze,Se.width,Se.height);else{let Me=Se.width,He=Se.height;for(let Qe=0;Qe<Ge;Qe++)n.texImage2D(r.TEXTURE_2D,Qe,Ze,Me,He,0,Ie,Je,null),Me>>=1,He>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in r){const Me=r.canvas;if(Me.hasAttribute("layoutsubtree")||Me.setAttribute("layoutsubtree","true"),Se.parentNode!==Me){Me.appendChild(Se),_.add(w),Me.onpaint=He=>{const Qe=He.changedElements;for(const Le of _)Qe.includes(Le.image)&&(Le.needsUpdate=!0)},Me.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,Se);else{const Qe=r.RGBA,Le=r.RGBA,lt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Qe,Le,lt,Se)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(ft.length>0){if(nt&&xt){const Me=Mt(ft[0]);n.texStorage2D(r.TEXTURE_2D,Ge,Ze,Me.width,Me.height)}for(let Me=0,He=ft.length;Me<He;Me++)Xe=ft[Me],nt?$&&n.texSubImage2D(r.TEXTURE_2D,Me,0,0,Ie,Je,Xe):n.texImage2D(r.TEXTURE_2D,Me,Ze,Ie,Je,Xe);w.generateMipmaps=!1}else if(nt){if(xt){const Me=Mt(Se);n.texStorage2D(r.TEXTURE_2D,Ge,Ze,Me.width,Me.height)}$&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Ie,Je,Se)}else n.texImage2D(r.TEXTURE_2D,0,Ze,Ie,Je,Se);y(w)&&C(ce),Ve.__version=ze.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function ve(I,w,te){if(w.image.length!==6)return;const ce=Ke(I,w),_e=w.source;n.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+te);const ze=a.get(_e);if(_e.version!==ze.__version||ce===!0){n.activeTexture(r.TEXTURE0+te);const Ve=Ht.getPrimaries(Ht.workingColorSpace),ge=w.colorSpace===ja?null:Ht.getPrimaries(w.colorSpace),Se=w.colorSpace===ja||Ve===ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Ie=w.isCompressedTexture||w.image[0].isCompressedTexture,Je=w.image[0]&&w.image[0].isDataTexture,Ze=[];for(let Le=0;Le<6;Le++)!Ie&&!Je?Ze[Le]=S(w.image[Le],!0,o.maxCubemapSize):Ze[Le]=Je?w.image[Le].image:w.image[Le],Ze[Le]=mt(w,Ze[Le]);const Xe=Ze[0],ft=c.convert(w.format,w.colorSpace),nt=c.convert(w.type),xt=T(w.internalFormat,ft,nt,w.normalized,w.colorSpace),$=w.isVideoTexture!==!0,Ge=ze.__version===void 0||ce===!0,Me=_e.dataReady;let He=U(w,Xe);Fe(r.TEXTURE_CUBE_MAP,w);let Qe;if(Ie){$&&Ge&&n.texStorage2D(r.TEXTURE_CUBE_MAP,He,xt,Xe.width,Xe.height);for(let Le=0;Le<6;Le++){Qe=Ze[Le].mipmaps;for(let lt=0;lt<Qe.length;lt++){const it=Qe[lt];w.format!==Oi?ft!==null?$?Me&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,lt,0,0,it.width,it.height,ft,it.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,lt,xt,it.width,it.height,0,it.data):St("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,lt,0,0,it.width,it.height,ft,nt,it.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,lt,xt,it.width,it.height,0,ft,nt,it.data)}}}else{if(Qe=w.mipmaps,$&&Ge){Qe.length>0&&He++;const Le=Mt(Ze[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,He,xt,Le.width,Le.height)}for(let Le=0;Le<6;Le++)if(Je){$?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,Ze[Le].width,Ze[Le].height,ft,nt,Ze[Le].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,xt,Ze[Le].width,Ze[Le].height,0,ft,nt,Ze[Le].data);for(let lt=0;lt<Qe.length;lt++){const Qt=Qe[lt].image[Le].image;$?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,lt+1,0,0,Qt.width,Qt.height,ft,nt,Qt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,lt+1,xt,Qt.width,Qt.height,0,ft,nt,Qt.data)}}else{$?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,ft,nt,Ze[Le]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,xt,ft,nt,Ze[Le]);for(let lt=0;lt<Qe.length;lt++){const it=Qe[lt];$?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,lt+1,0,0,ft,nt,it.image[Le]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,lt+1,xt,ft,nt,it.image[Le])}}}y(w)&&C(r.TEXTURE_CUBE_MAP),ze.__version=_e.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function me(I,w,te,ce,_e,ze){const Ve=c.convert(te.format,te.colorSpace),ge=c.convert(te.type),Se=T(te.internalFormat,Ve,ge,te.normalized,te.colorSpace),Ie=a.get(w),Je=a.get(te);if(Je.__renderTarget=w,!Ie.__hasExternalTextures){const Ze=Math.max(1,w.width>>ze),Xe=Math.max(1,w.height>>ze);_e===r.TEXTURE_3D||_e===r.TEXTURE_2D_ARRAY?n.texImage3D(_e,ze,Se,Ze,Xe,w.depth,0,Ve,ge,null):n.texImage2D(_e,ze,Se,Ze,Xe,0,Ve,ge,null)}n.bindFramebuffer(r.FRAMEBUFFER,I),rt(w)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ce,_e,Je.__webglTexture,0,pt(w)):(_e===r.TEXTURE_2D||_e>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ce,_e,Je.__webglTexture,ze),n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ae(I,w,te){if(r.bindRenderbuffer(r.RENDERBUFFER,I),w.depthBuffer){const ce=w.depthTexture,_e=ce&&ce.isDepthTexture?ce.type:null,ze=F(w.stencilBuffer,_e),Ve=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;rt(w)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,pt(w),ze,w.width,w.height):te?r.renderbufferStorageMultisample(r.RENDERBUFFER,pt(w),ze,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,ze,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ve,r.RENDERBUFFER,I)}else{const ce=w.textures;for(let _e=0;_e<ce.length;_e++){const ze=ce[_e],Ve=c.convert(ze.format,ze.colorSpace),ge=c.convert(ze.type),Se=T(ze.internalFormat,Ve,ge,ze.normalized,ze.colorSpace);rt(w)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,pt(w),Se,w.width,w.height):te?r.renderbufferStorageMultisample(r.RENDERBUFFER,pt(w),Se,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,Se,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function qe(I,w,te){const ce=w.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const _e=a.get(w.depthTexture);if(_e.__renderTarget=w,(!_e.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ce){if(_e.__webglInit===void 0&&(_e.__webglInit=!0,w.depthTexture.addEventListener("dispose",O)),_e.__webglTexture===void 0){_e.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,_e.__webglTexture),Fe(r.TEXTURE_CUBE_MAP,w.depthTexture);const Ie=c.convert(w.depthTexture.format),Je=c.convert(w.depthTexture.type);let Ze;w.depthTexture.format===Ea?Ze=r.DEPTH_COMPONENT24:w.depthTexture.format===cr&&(Ze=r.DEPTH24_STENCIL8);for(let Xe=0;Xe<6;Xe++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Xe,0,Ze,w.width,w.height,0,Ie,Je,null)}}else ne(w.depthTexture,0);const ze=_e.__webglTexture,Ve=pt(w),ge=ce?r.TEXTURE_CUBE_MAP_POSITIVE_X+te:r.TEXTURE_2D,Se=w.depthTexture.format===cr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(w.depthTexture.format===Ea)rt(w)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Se,ge,ze,0,Ve):r.framebufferTexture2D(r.FRAMEBUFFER,Se,ge,ze,0);else if(w.depthTexture.format===cr)rt(w)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Se,ge,ze,0,Ve):r.framebufferTexture2D(r.FRAMEBUFFER,Se,ge,ze,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function de(I){const w=a.get(I),te=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){const ce=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ce){const _e=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ce.removeEventListener("dispose",_e)};ce.addEventListener("dispose",_e),w.__depthDisposeCallback=_e}w.__boundDepthTexture=ce}if(I.depthTexture&&!w.__autoAllocateDepthBuffer)if(te)for(let ce=0;ce<6;ce++)qe(w.__webglFramebuffer[ce],I,ce);else{const ce=I.texture.mipmaps;ce&&ce.length>0?qe(w.__webglFramebuffer[0],I,0):qe(w.__webglFramebuffer,I,0)}else if(te){w.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(n.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[ce]),w.__webglDepthbuffer[ce]===void 0)w.__webglDepthbuffer[ce]=r.createRenderbuffer(),Ae(w.__webglDepthbuffer[ce],I,!1);else{const _e=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ze=w.__webglDepthbuffer[ce];r.bindRenderbuffer(r.RENDERBUFFER,ze),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,ze)}}else{const ce=I.texture.mipmaps;if(ce&&ce.length>0?n.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),Ae(w.__webglDepthbuffer,I,!1);else{const _e=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ze=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ze),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,ze)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ee(I,w,te){const ce=a.get(I);w!==void 0&&me(ce.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),te!==void 0&&de(I)}function Te(I){const w=I.texture,te=a.get(I),ce=a.get(w);I.addEventListener("dispose",E);const _e=I.textures,ze=I.isWebGLCubeRenderTarget===!0,Ve=_e.length>1;if(Ve||(ce.__webglTexture===void 0&&(ce.__webglTexture=r.createTexture()),ce.__version=w.version,u.memory.textures++),ze){te.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(w.mipmaps&&w.mipmaps.length>0){te.__webglFramebuffer[ge]=[];for(let Se=0;Se<w.mipmaps.length;Se++)te.__webglFramebuffer[ge][Se]=r.createFramebuffer()}else te.__webglFramebuffer[ge]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){te.__webglFramebuffer=[];for(let ge=0;ge<w.mipmaps.length;ge++)te.__webglFramebuffer[ge]=r.createFramebuffer()}else te.__webglFramebuffer=r.createFramebuffer();if(Ve)for(let ge=0,Se=_e.length;ge<Se;ge++){const Ie=a.get(_e[ge]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=r.createTexture(),u.memory.textures++)}if(I.samples>0&&rt(I)===!1){te.__webglMultisampledFramebuffer=r.createFramebuffer(),te.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let ge=0;ge<_e.length;ge++){const Se=_e[ge];te.__webglColorRenderbuffer[ge]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,te.__webglColorRenderbuffer[ge]);const Ie=c.convert(Se.format,Se.colorSpace),Je=c.convert(Se.type),Ze=T(Se.internalFormat,Ie,Je,Se.normalized,Se.colorSpace,I.isXRRenderTarget===!0),Xe=pt(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,Xe,Ze,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.RENDERBUFFER,te.__webglColorRenderbuffer[ge])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(te.__webglDepthRenderbuffer=r.createRenderbuffer(),Ae(te.__webglDepthRenderbuffer,I,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ze){n.bindTexture(r.TEXTURE_CUBE_MAP,ce.__webglTexture),Fe(r.TEXTURE_CUBE_MAP,w);for(let ge=0;ge<6;ge++)if(w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)me(te.__webglFramebuffer[ge][Se],I,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Se);else me(te.__webglFramebuffer[ge],I,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);y(w)&&C(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ve){for(let ge=0,Se=_e.length;ge<Se;ge++){const Ie=_e[ge],Je=a.get(Ie);let Ze=r.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ze=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Ze,Je.__webglTexture),Fe(Ze,Ie),me(te.__webglFramebuffer,I,Ie,r.COLOR_ATTACHMENT0+ge,Ze,0),y(Ie)&&C(Ze)}n.unbindTexture()}else{let ge=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ge=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(ge,ce.__webglTexture),Fe(ge,w),w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)me(te.__webglFramebuffer[Se],I,w,r.COLOR_ATTACHMENT0,ge,Se);else me(te.__webglFramebuffer,I,w,r.COLOR_ATTACHMENT0,ge,0);y(w)&&C(ge),n.unbindTexture()}I.depthBuffer&&de(I)}function Ne(I){const w=I.textures;for(let te=0,ce=w.length;te<ce;te++){const _e=w[te];if(y(_e)){const ze=z(I),Ve=a.get(_e).__webglTexture;n.bindTexture(ze,Ve),C(ze),n.unbindTexture()}}}const Oe=[],at=[];function Be(I){if(I.samples>0){if(rt(I)===!1){const w=I.textures,te=I.width,ce=I.height;let _e=r.COLOR_BUFFER_BIT;const ze=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ve=a.get(I),ge=w.length>1;if(ge)for(let Ie=0;Ie<w.length;Ie++)n.bindFramebuffer(r.FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Ve.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Ve.__webglMultisampledFramebuffer);const Se=I.texture.mipmaps;Se&&Se.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ve.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ve.__webglFramebuffer);for(let Ie=0;Ie<w.length;Ie++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(_e|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(_e|=r.STENCIL_BUFFER_BIT)),ge){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ve.__webglColorRenderbuffer[Ie]);const Je=a.get(w[Ie]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Je,0)}r.blitFramebuffer(0,0,te,ce,0,0,te,ce,_e,r.NEAREST),d===!0&&(Oe.length=0,at.length=0,Oe.push(r.COLOR_ATTACHMENT0+Ie),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(Oe.push(ze),at.push(ze),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,at)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Oe))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ge)for(let Ie=0;Ie<w.length;Ie++){n.bindFramebuffer(r.FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,Ve.__webglColorRenderbuffer[Ie]);const Je=a.get(w[Ie]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Ve.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,Je,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ve.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&d){const w=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function pt(I){return Math.min(o.maxSamples,I.samples)}function rt(I){const w=a.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Z(I){const w=u.render.frame;g.get(I)!==w&&(g.set(I,w),I.update())}function mt(I,w){const te=I.colorSpace,ce=I.format,_e=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||te!==Mo&&te!==ja&&(Ht.getTransfer(te)===en?(ce!==Oi||_e!==wn)&&St("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):It("WebGLTextures: Unsupported texture color space:",te)),w}function Mt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(p.width=I.naturalWidth||I.width,p.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(p.width=I.displayWidth,p.height=I.displayHeight):(p.width=I.width,p.height=I.height),p}this.allocateTextureUnit=P,this.resetTextureUnits=K,this.getTextureUnits=B,this.setTextureUnits=W,this.setTexture2D=ne,this.setTexture2DArray=J,this.setTexture3D=ee,this.setTextureCube=N,this.rebindTextures=Ee,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ne,this.updateMultisampleRenderTarget=Be,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=me,this.useMultisampledRTT=rt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function q3(r,e){function n(a,o=ja){let c;const u=Ht.getTransfer(o);if(a===wn)return r.UNSIGNED_BYTE;if(a===Vp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===kp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===zx)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===Fx)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===Px)return r.BYTE;if(a===Ox)return r.SHORT;if(a===Il)return r.UNSIGNED_SHORT;if(a===Gp)return r.INT;if(a===zi)return r.UNSIGNED_INT;if(a===Pi)return r.FLOAT;if(a===yn)return r.HALF_FLOAT;if(a===Bx)return r.ALPHA;if(a===Ix)return r.RGB;if(a===Oi)return r.RGBA;if(a===Ea)return r.DEPTH_COMPONENT;if(a===cr)return r.DEPTH_STENCIL;if(a===Wp)return r.RED;if(a===Xp)return r.RED_INTEGER;if(a===dr)return r.RG;if(a===qp)return r.RG_INTEGER;if(a===Yp)return r.RGBA_INTEGER;if(a===Du||a===Uu||a===Lu||a===Nu)if(u===en)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===Du)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===Uu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===Lu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Nu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===Du)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===Uu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===Lu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Nu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===$d||a===ep||a===tp||a===np)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===$d)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===ep)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===tp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===np)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===ip||a===ap||a===sp||a===rp||a===op||a===Fu||a===lp)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(a===ip||a===ap)return u===en?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===sp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===rp)return c.COMPRESSED_R11_EAC;if(a===op)return c.COMPRESSED_SIGNED_R11_EAC;if(a===Fu)return c.COMPRESSED_RG11_EAC;if(a===lp)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===cp||a===up||a===fp||a===hp||a===dp||a===pp||a===mp||a===gp||a===vp||a===_p||a===xp||a===yp||a===Sp||a===Mp)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(a===cp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===up)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===fp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===hp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===dp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===pp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===mp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===gp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===vp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===_p)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===xp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===yp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Sp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Mp)return u===en?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===bp||a===Ep||a===wp)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(a===bp)return u===en?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Ep)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===wp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Tp||a===Ap||a===Bu||a===Rp)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(a===Tp)return c.COMPRESSED_RED_RGTC1_EXT;if(a===Ap)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Bu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===Rp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Hl?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const Y3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Z3=`
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

}`;class K3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const a=new Qx(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,a=new ai({vertexShader:Y3,fragmentShader:Z3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new rn(new ei(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Q3 extends gr{constructor(e,n){super();const a=this;let o=null,c=1,u=null,h="local-floor",d=1,p=null,g=null,_=null,v=null,x=null,b=null;const A=typeof XRWebGLBinding<"u",S=new K3,y={},C=n.getContextAttributes();let z=null,T=null;const F=[],U=[],O=new Pe;let E=null,L=null;const H=new Si;H.viewport=new Jt;const G=new Si;G.viewport=new Jt;const X=[H,G],K=new i2;let B=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let ye=F[re];return ye===void 0&&(ye=new md,F[re]=ye),ye.getTargetRaySpace()},this.getControllerGrip=function(re){let ye=F[re];return ye===void 0&&(ye=new md,F[re]=ye),ye.getGripSpace()},this.getHand=function(re){let ye=F[re];return ye===void 0&&(ye=new md,F[re]=ye),ye.getHandSpace()};function P(re){const ye=U.indexOf(re.inputSource);if(ye===-1)return;const oe=F[ye];oe!==void 0&&(oe.update(re.inputSource,re.frame,p||u),oe.dispatchEvent({type:re.type,data:re.inputSource}))}function k(){o.removeEventListener("select",P),o.removeEventListener("selectstart",P),o.removeEventListener("selectend",P),o.removeEventListener("squeeze",P),o.removeEventListener("squeezestart",P),o.removeEventListener("squeezeend",P),o.removeEventListener("end",k),o.removeEventListener("inputsourceschange",ne);for(let re=0;re<F.length;re++){const ye=U[re];ye!==null&&(U[re]=null,F[re].disconnect(ye))}B=null,W=null,S.reset();for(const re in y)delete y[re];if(e.setRenderTarget(z),x=null,v=null,_=null,o=null,T=null,Ke.stop(),a.isPresenting=!1,e.setPixelRatio(E),e.setSize(O.width,O.height,!1),L!==null){const re=L.camera;re.fov=L.fov,re.zoom=L.zoom,re.updateProjectionMatrix(),L=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){c=re,a.isPresenting===!0&&St("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){h=re,a.isPresenting===!0&&St("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(re){p=re},this.getBaseLayer=function(){return v!==null?v:x},this.getBinding=function(){return _===null&&A&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return b},this.getSession=function(){return o},this.setSession=async function(re){if(o=re,o!==null){if(z=e.getRenderTarget(),o.addEventListener("select",P),o.addEventListener("selectstart",P),o.addEventListener("selectend",P),o.addEventListener("squeeze",P),o.addEventListener("squeezestart",P),o.addEventListener("squeezeend",P),o.addEventListener("end",k),o.addEventListener("inputsourceschange",ne),C.xrCompatible!==!0&&await n.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(O),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,ve=null,me=null;C.depth&&(me=C.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,oe=C.stencil?cr:Ea,ve=C.stencil?Hl:zi);const Ae={colorFormat:n.RGBA8,depthFormat:me,scaleFactor:c};_=this.getBinding(),v=_.createProjectionLayer(Ae),o.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),T=new Kn(v.textureWidth,v.textureHeight,{format:Oi,type:wn,depthTexture:new Fs(v.textureWidth,v.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const oe={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(o,n,oe),o.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),T=new Kn(x.framebufferWidth,x.framebufferHeight,{format:Oi,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(d),p=null,u=await o.requestReferenceSpace(h),Ke.setContext(o),Ke.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function ne(re){for(let ye=0;ye<re.removed.length;ye++){const oe=re.removed[ye],ve=U.indexOf(oe);ve>=0&&(U[ve]=null,F[ve].disconnect(oe))}for(let ye=0;ye<re.added.length;ye++){const oe=re.added[ye];let ve=U.indexOf(oe);if(ve===-1){for(let Ae=0;Ae<F.length;Ae++)if(Ae>=U.length){U.push(oe),ve=Ae;break}else if(U[Ae]===null){U[Ae]=oe,ve=Ae;break}if(ve===-1)break}const me=F[ve];me&&me.connect(oe)}}const J=new V,ee=new V;function N(re,ye,oe){J.setFromMatrixPosition(ye.matrixWorld),ee.setFromMatrixPosition(oe.matrixWorld);const ve=J.distanceTo(ee),me=ye.projectionMatrix.elements,Ae=oe.projectionMatrix.elements,qe=me[14]/(me[10]-1),de=me[14]/(me[10]+1),Ee=(me[9]+1)/me[5],Te=(me[9]-1)/me[5],Ne=(me[8]-1)/me[0],Oe=(Ae[8]+1)/Ae[0],at=qe*Ne,Be=qe*Oe,pt=ve/(-Ne+Oe),rt=pt*-Ne;if(ye.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(rt),re.translateZ(pt),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),me[10]===-1)re.projectionMatrix.copy(ye.projectionMatrix),re.projectionMatrixInverse.copy(ye.projectionMatrixInverse);else{const Z=qe+pt,mt=de+pt,Mt=at-rt,I=Be+(ve-rt),w=Ee*de/mt*Z,te=Te*de/mt*Z;re.projectionMatrix.makePerspective(Mt,I,w,te,Z,mt),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function Q(re,ye){ye===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(ye.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(o===null)return;let ye=re.near,oe=re.far;S.texture!==null&&(S.depthNear>0&&(ye=S.depthNear),S.depthFar>0&&(oe=S.depthFar)),K.near=G.near=H.near=ye,K.far=G.far=H.far=oe,(B!==K.near||W!==K.far)&&(o.updateRenderState({depthNear:K.near,depthFar:K.far}),B=K.near,W=K.far),K.layers.mask=re.layers.mask|6,H.layers.mask=K.layers.mask&-5,G.layers.mask=K.layers.mask&-3;const ve=re.parent,me=K.cameras;Q(K,ve);for(let Ae=0;Ae<me.length;Ae++)Q(me[Ae],ve);me.length===2?N(K,H,G):K.projectionMatrix.copy(H.projectionMatrix),L===null&&re.isPerspectiveCamera&&(L={camera:re,fov:re.fov,zoom:re.zoom}),ue(re,K,ve)};function ue(re,ye,oe){oe===null?re.matrix.copy(ye.matrixWorld):(re.matrix.copy(oe.matrixWorld),re.matrix.invert(),re.matrix.multiply(ye.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(ye.projectionMatrix),re.projectionMatrixInverse.copy(ye.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=bo*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return K},this.getFoveation=function(){if(!(v===null&&x===null))return d},this.setFoveation=function(re){d=re,v!==null&&(v.fixedFoveation=re),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=re)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(K)},this.getCameraTexture=function(re){return y[re]};let Ue=null;function Fe(re,ye){if(g=ye.getViewerPose(p||u),b=ye,g!==null){const oe=g.views;x!==null&&(e.setRenderTargetFramebuffer(T,x.framebuffer),e.setRenderTarget(T));let ve=!1;oe.length!==K.cameras.length&&(K.cameras.length=0,ve=!0);for(let de=0;de<oe.length;de++){const Ee=oe[de];let Te=null;if(x!==null)Te=x.getViewport(Ee);else{const Oe=_.getViewSubImage(v,Ee);Te=Oe.viewport,de===0&&(e.setRenderTargetTextures(T,Oe.colorTexture,Oe.depthStencilTexture),e.setRenderTarget(T))}let Ne=X[de];Ne===void 0&&(Ne=new Si,Ne.layers.enable(de),Ne.viewport=new Jt,X[de]=Ne),Ne.matrix.fromArray(Ee.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(Ee.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Te.x,Te.y,Te.width,Te.height),de===0&&(K.matrix.copy(Ne.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale)),ve===!0&&K.cameras.push(Ne)}const me=o.enabledFeatures;if(me&&me.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&A){_=a.getBinding();const de=_.getDepthInformation(oe[0]);de&&de.isValid&&de.texture&&S.init(de,o.renderState)}if(me&&me.includes("camera-access")&&A){e.state.unbindTexture(),_=a.getBinding();for(let de=0;de<oe.length;de++){const Ee=oe[de].camera;if(Ee){let Te=y[Ee];Te||(Te=new Qx,y[Ee]=Te);const Ne=_.getCameraImage(Ee);Te.sourceTexture=Ne}}}}for(let oe=0;oe<F.length;oe++){const ve=U[oe],me=F[oe];ve!==null&&me!==void 0&&me.update(ve,ye,p||u)}Ue&&Ue(re,ye),ye.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:ye}),b=null}const Ke=new uy;Ke.setAnimationLoop(Fe),this.setAnimationLoop=function(re){Ue=re},this.dispose=function(){}}}const J3=new Ft,gy=new Et;gy.set(-1,0,0,0,1,0,0,0,1);function j3(r,e){function n(S,y){S.matrixAutoUpdate===!0&&S.updateMatrix(),y.value.copy(S.matrix)}function a(S,y){y.color.getRGB(S.fogColor.value,oy(r)),y.isFog?(S.fogNear.value=y.near,S.fogFar.value=y.far):y.isFogExp2&&(S.fogDensity.value=y.density)}function o(S,y,C,z,T){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?c(S,y):y.isMeshLambertMaterial?(c(S,y),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(c(S,y),_(S,y)):y.isMeshPhongMaterial?(c(S,y),g(S,y),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(c(S,y),v(S,y),y.isMeshPhysicalMaterial&&x(S,y,T)):y.isMeshMatcapMaterial?(c(S,y),b(S,y)):y.isMeshDepthMaterial?c(S,y):y.isMeshDistanceMaterial?(c(S,y),A(S,y)):y.isMeshNormalMaterial?c(S,y):y.isLineBasicMaterial?(u(S,y),y.isLineDashedMaterial&&h(S,y)):y.isPointsMaterial?d(S,y,C,z):y.isSpriteMaterial?p(S,y):y.isShadowMaterial?(S.color.value.copy(y.color),S.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(S,y){S.opacity.value=y.opacity,y.color&&S.diffuse.value.copy(y.color),y.emissive&&S.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(S.map.value=y.map,n(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,n(y.alphaMap,S.alphaMapTransform)),y.bumpMap&&(S.bumpMap.value=y.bumpMap,n(y.bumpMap,S.bumpMapTransform),S.bumpScale.value=y.bumpScale,y.side===Gn&&(S.bumpScale.value*=-1)),y.normalMap&&(S.normalMap.value=y.normalMap,n(y.normalMap,S.normalMapTransform),S.normalScale.value.copy(y.normalScale),y.side===Gn&&S.normalScale.value.negate()),y.displacementMap&&(S.displacementMap.value=y.displacementMap,n(y.displacementMap,S.displacementMapTransform),S.displacementScale.value=y.displacementScale,S.displacementBias.value=y.displacementBias),y.emissiveMap&&(S.emissiveMap.value=y.emissiveMap,n(y.emissiveMap,S.emissiveMapTransform)),y.specularMap&&(S.specularMap.value=y.specularMap,n(y.specularMap,S.specularMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest);const C=e.get(y),z=C.envMap,T=C.envMapRotation;z&&(S.envMap.value=z,S.envMapRotation.value.setFromMatrix4(J3.makeRotationFromEuler(T)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(gy),S.reflectivity.value=y.reflectivity,S.ior.value=y.ior,S.refractionRatio.value=y.refractionRatio),y.lightMap&&(S.lightMap.value=y.lightMap,S.lightMapIntensity.value=y.lightMapIntensity,n(y.lightMap,S.lightMapTransform)),y.aoMap&&(S.aoMap.value=y.aoMap,S.aoMapIntensity.value=y.aoMapIntensity,n(y.aoMap,S.aoMapTransform))}function u(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,y.map&&(S.map.value=y.map,n(y.map,S.mapTransform))}function h(S,y){S.dashSize.value=y.dashSize,S.totalSize.value=y.dashSize+y.gapSize,S.scale.value=y.scale}function d(S,y,C,z){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.size.value=y.size*C,S.scale.value=z*.5,y.map&&(S.map.value=y.map,n(y.map,S.uvTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,n(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function p(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.rotation.value=y.rotation,y.map&&(S.map.value=y.map,n(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,n(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function g(S,y){S.specular.value.copy(y.specular),S.shininess.value=Math.max(y.shininess,1e-4)}function _(S,y){y.gradientMap&&(S.gradientMap.value=y.gradientMap)}function v(S,y){S.metalness.value=y.metalness,y.metalnessMap&&(S.metalnessMap.value=y.metalnessMap,n(y.metalnessMap,S.metalnessMapTransform)),S.roughness.value=y.roughness,y.roughnessMap&&(S.roughnessMap.value=y.roughnessMap,n(y.roughnessMap,S.roughnessMapTransform)),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)}function x(S,y,C){S.ior.value=y.ior,y.sheen>0&&(S.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),S.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(S.sheenColorMap.value=y.sheenColorMap,n(y.sheenColorMap,S.sheenColorMapTransform)),y.sheenRoughnessMap&&(S.sheenRoughnessMap.value=y.sheenRoughnessMap,n(y.sheenRoughnessMap,S.sheenRoughnessMapTransform))),y.clearcoat>0&&(S.clearcoat.value=y.clearcoat,S.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(S.clearcoatMap.value=y.clearcoatMap,n(y.clearcoatMap,S.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,n(y.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(S.clearcoatNormalMap.value=y.clearcoatNormalMap,n(y.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===Gn&&S.clearcoatNormalScale.value.negate())),y.dispersion>0&&(S.dispersion.value=y.dispersion),y.retroreflectivity>0&&(S.retroreflectivity.value=y.retroreflectivity),y.iridescence>0&&(S.iridescence.value=y.iridescence,S.iridescenceIOR.value=y.iridescenceIOR,S.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(S.iridescenceMap.value=y.iridescenceMap,n(y.iridescenceMap,S.iridescenceMapTransform)),y.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=y.iridescenceThicknessMap,n(y.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),y.transmission>0&&(S.transmission.value=y.transmission,S.transmissionSamplerMap.value=C.texture,S.transmissionSamplerSize.value.set(C.width,C.height),y.transmissionMap&&(S.transmissionMap.value=y.transmissionMap,n(y.transmissionMap,S.transmissionMapTransform)),S.thickness.value=y.thickness,y.thicknessMap&&(S.thicknessMap.value=y.thicknessMap,n(y.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=y.attenuationDistance,S.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(S.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(S.anisotropyMap.value=y.anisotropyMap,n(y.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=y.specularIntensity,S.specularColor.value.copy(y.specularColor),y.specularColorMap&&(S.specularColorMap.value=y.specularColorMap,n(y.specularColorMap,S.specularColorMapTransform)),y.specularIntensityMap&&(S.specularIntensityMap.value=y.specularIntensityMap,n(y.specularIntensityMap,S.specularIntensityMapTransform))}function b(S,y){y.matcap&&(S.matcap.value=y.matcap)}function A(S,y){const C=e.get(y).light;S.referencePosition.value.setFromMatrixPosition(C.matrixWorld),S.nearDistance.value=C.shadow.camera.near,S.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function $3(r,e,n,a){let o={},c={},u=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function d(T,F){const U=F.program;a.uniformBlockBinding(T,U)}function p(T,F){let U=o[T.id];U===void 0&&(S(T),U=g(T),o[T.id]=U,T.addEventListener("dispose",C));const O=F.program;a.updateUBOMapping(T,O);const E=e.render.frame;c[T.id]!==E&&(v(T),c[T.id]=E)}function g(T){const F=_();T.__bindingPointIndex=F;const U=r.createBuffer(),O=T.__size,E=T.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,O,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,F,U),U}function _(){for(let T=0;T<h;T++)if(u.indexOf(T)===-1)return u.push(T),T;return It("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(T){const F=o[T.id],U=T.uniforms,O=T.__cache;r.bindBuffer(r.UNIFORM_BUFFER,F);for(let E=0,L=U.length;E<L;E++){const H=U[E];if(Array.isArray(H))for(let G=0,X=H.length;G<X;G++)x(H[G],E,G,O);else x(H,E,0,O)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(T,F,U,O){if(A(T,F,U,O)===!0){const E=T.__offset,L=T.value;if(Array.isArray(L)){let H=0;for(let G=0;G<L.length;G++){const X=L[G],K=y(X);b(X,T.__data,H),typeof X!="number"&&typeof X!="boolean"&&!X.isMatrix3&&!ArrayBuffer.isView(X)&&(H+=K.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(L,T.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,E,T.__data)}}function b(T,F,U){typeof T=="number"||typeof T=="boolean"?F[0]=T:T.isMatrix3?(F[0]=T.elements[0],F[1]=T.elements[1],F[2]=T.elements[2],F[3]=0,F[4]=T.elements[3],F[5]=T.elements[4],F[6]=T.elements[5],F[7]=0,F[8]=T.elements[6],F[9]=T.elements[7],F[10]=T.elements[8],F[11]=0):ArrayBuffer.isView(T)?F.set(new T.constructor(T.buffer,T.byteOffset,F.length)):T.toArray(F,U)}function A(T,F,U,O){const E=T.value,L=F+"_"+U;if(O[L]===void 0)return typeof E=="number"||typeof E=="boolean"?O[L]=E:ArrayBuffer.isView(E)?O[L]=E.slice():O[L]=E.clone(),!0;{const H=O[L];if(typeof E=="number"||typeof E=="boolean"){if(H!==E)return O[L]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(H.equals(E)===!1)return H.copy(E),!0}}return!1}function S(T){const F=T.uniforms;let U=0;const O=16;for(let L=0,H=F.length;L<H;L++){const G=Array.isArray(F[L])?F[L]:[F[L]];for(let X=0,K=G.length;X<K;X++){const B=G[X],W=Array.isArray(B.value)?B.value:[B.value];for(let P=0,k=W.length;P<k;P++){const ne=W[P],J=y(ne),ee=U%O,N=ee%J.boundary,Q=ee+N;U+=N,Q!==0&&O-Q<J.storage&&(U+=O-Q),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=U,U+=J.storage}}}const E=U%O;return E>0&&(U+=O-E),T.__size=U,T.__cache={},this}function y(T){const F={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(F.boundary=4,F.storage=4):T.isVector2?(F.boundary=8,F.storage=8):T.isVector3||T.isColor?(F.boundary=16,F.storage=12):T.isVector4?(F.boundary=16,F.storage=16):T.isMatrix3?(F.boundary=48,F.storage=48):T.isMatrix4?(F.boundary=64,F.storage=64):T.isTexture?St("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(T)?(F.boundary=16,F.storage=T.byteLength):St("WebGLRenderer: Unsupported uniform value type.",T),F}function C(T){const F=T.target;F.removeEventListener("dispose",C);const U=u.indexOf(F.__bindingPointIndex);u.splice(U,1),r.deleteBuffer(o[F.id]),delete o[F.id],delete c[F.id]}function z(){for(const T in o)r.deleteBuffer(o[T]);u=[],o={},c={}}return{bind:d,update:p,dispose:z}}const eA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _a=null;function tA(){return _a===null&&(_a=new Gu(eA,16,16,dr,yn),_a.name="DFG_LUT",_a.minFilter=mn,_a.magFilter=mn,_a.wrapS=Ni,_a.wrapT=Ni,_a.generateMipmaps=!1,_a.needsUpdate=!0),_a}class nA{constructor(e={}){const{canvas:n=xM(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:h=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1,outputBufferType:x=wn}=e;this.isWebGLRenderer=!0;let b;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=a.getContextAttributes().alpha}else b=u;const A=x,S=new Set([Yp,qp,Xp]),y=new Set([wn,zi,Il,Hl,Vp,kp]),C=new Uint32Array(4),z=new Int32Array(4),T=new V;let F=null,U=null;const O=[],E=[];let L=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ma,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const H=this;let G=!1,X=null,K=null,B=null,W=null;this._outputColorSpace=yi;let P=0,k=0,ne=null,J=-1,ee=null;const N=new Jt,Q=new Jt;let ue=null;const Ue=new tt(0);let Fe=0,Ke=n.width,re=n.height,ye=1,oe=null,ve=null;const me=new Jt(0,0,Ke,re),Ae=new Jt(0,0,Ke,re);let qe=!1;const de=new jp;let Ee=!1,Te=!1;const Ne=new Ft,Oe=new V,at=new Jt,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function rt(){return ne===null?ye:1}let Z=a;function mt(R,Y){return n.getContext(R,Y)}let Mt,I,w,te,ce,_e,ze,Ve,ge,Se,Ie,Je,Ze,Xe,ft,nt,xt,$,Ge,Me,He,Qe,Le;try{const R={alpha:!0,depth:o,stencil:c,antialias:h,premultipliedAlpha:d,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Ip}`),n.addEventListener("webglcontextlost",Qt,!1),n.addEventListener("webglcontextrestored",Pt,!1),n.addEventListener("webglcontextcreationerror",Vn,!1),Z===null){const Y="webgl2";if(Z=mt(Y,R),Z===null)throw mt(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}lt()}catch(R){throw n.removeEventListener("webglcontextlost",Qt,!1),n.removeEventListener("webglcontextrestored",Pt,!1),n.removeEventListener("webglcontextcreationerror",Vn,!1),It("WebGLRenderer: "+R.message),R}function lt(){Mt=new tT(Z),Mt.init(),He=new q3(Z,Mt),I=new Xw(Z,Mt,e,He),w=new W3(Z,Mt),I.reversedDepthBuffer&&v&&w.buffers.depth.setReversed(!0),K=Z.createFramebuffer(),B=Z.createFramebuffer(),W=Z.createFramebuffer(),te=new aT(Z),ce=new D3,_e=new X3(Z,Mt,w,ce,I,He,te),ze=new eT(H),Ve=new r2(Z),Qe=new kw(Z,Ve),ge=new nT(Z,Ve,te,Qe),Se=new rT(Z,ge,Ve,Qe,te),$=new sT(Z,I,_e),ft=new qw(ce),Ie=new C3(H,ze,Mt,I,Qe,ft),Je=new j3(H,ce),Ze=new L3,Xe=new B3(Mt),xt=new Vw(H,ze,w,Se,b,d),nt=new k3(H,Se,I),Le=new $3(Z,te,I,w),Ge=new Ww(Z,Mt,te),Me=new iT(Z,Mt,te),te.programs=Ie.programs,H.capabilities=I,H.extensions=Mt,H.properties=ce,H.renderLists=Ze,H.shadowMap=nt,H.state=w,H.info=te}A!==wn&&(L=new lT(A,n.width,n.height,h,o,c));const it=new Q3(H,Z);this.xr=it,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){const R=Mt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Mt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(R){R!==void 0&&(ye=R,this.setSize(Ke,re,!1))},this.getSize=function(R){return R.set(Ke,re)},this.setSize=function(R,Y,le=!0){if(it.isPresenting){St("WebGLRenderer: Can't change size while VR device is presenting.");return}Ke=R,re=Y,n.width=Math.floor(R*ye),n.height=Math.floor(Y*ye),le===!0&&(n.style.width=R+"px",n.style.height=Y+"px"),L!==null&&L.setSize(n.width,n.height),this.setViewport(0,0,R,Y)},this.getDrawingBufferSize=function(R){return R.set(Ke*ye,re*ye).floor()},this.setDrawingBufferSize=function(R,Y,le){Ke=R,re=Y,ye=le,n.width=Math.floor(R*le),n.height=Math.floor(Y*le),this.setViewport(0,0,R,Y)},this.setEffects=function(R){if(A===wn){It("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let Y=0;Y<R.length;Y++)if(R[Y].isOutputPass===!0){St("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(N)},this.getViewport=function(R){return R.copy(me)},this.setViewport=function(R,Y,le,ae){R.isVector4?me.set(R.x,R.y,R.z,R.w):me.set(R,Y,le,ae),w.viewport(N.copy(me).multiplyScalar(ye).round())},this.getScissor=function(R){return R.copy(Ae)},this.setScissor=function(R,Y,le,ae){R.isVector4?Ae.set(R.x,R.y,R.z,R.w):Ae.set(R,Y,le,ae),w.scissor(Q.copy(Ae).multiplyScalar(ye).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(R){w.setScissorTest(qe=R)},this.setOpaqueSort=function(R){oe=R},this.setTransparentSort=function(R){ve=R},this.getClearColor=function(R){return R.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(R=!0,Y=!0,le=!0){let ae=0;if(R){let se=!1;if(ne!==null){const ke=ne.texture.format;se=S.has(ke)}if(se){const ke=ne.texture.type,$e=y.has(ke),Ye=xt.getClearColor(),et=xt.getClearAlpha(),We=Ye.r,yt=Ye.g,Ut=Ye.b;$e?(C[0]=We,C[1]=yt,C[2]=Ut,C[3]=et,Z.clearBufferuiv(Z.COLOR,0,C)):(z[0]=We,z[1]=yt,z[2]=Ut,z[3]=et,Z.clearBufferiv(Z.COLOR,0,z))}else ae|=Z.COLOR_BUFFER_BIT}Y&&(ae|=Z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),le&&(ae|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ae!==0&&Z.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),X=R},this.dispose=function(){n.removeEventListener("webglcontextlost",Qt,!1),n.removeEventListener("webglcontextrestored",Pt,!1),n.removeEventListener("webglcontextcreationerror",Vn,!1),xt.dispose(),Ze.dispose(),Xe.dispose(),ce.dispose(),ze.dispose(),Se.dispose(),Qe.dispose(),Le.dispose(),Ie.dispose(),it.dispose(),it.removeEventListener("sessionstart",gn),it.removeEventListener("sessionend",Ln),Qn.stop()};function Qt(R){R.preventDefault(),l_("WebGLRenderer: Context Lost."),G=!0}function Pt(){l_("WebGLRenderer: Context Restored."),G=!1;const R=te.autoReset,Y=nt.enabled,le=nt.autoUpdate,ae=nt.needsUpdate,se=nt.type;lt(),te.autoReset=R,nt.enabled=Y,nt.autoUpdate=le,nt.needsUpdate=ae,nt.type=se}function Vn(R){It("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function kn(R){const Y=R.target;Y.removeEventListener("dispose",kn),ss(Y)}function ss(R){Aa(R),ce.remove(R)}function Aa(R){const Y=ce.get(R).programs;Y!==void 0&&(Y.forEach(function(le){Ie.releaseProgram(le)}),R.isShaderMaterial&&Ie.releaseShaderCache(R))}this.renderBufferDirect=function(R,Y,le,ae,se,ke){Y===null&&(Y=Be);const $e=se.isMesh&&se.matrixWorld.determinantAffine()<0,Ye=dt(R,Y,le,ae,se);w.setMaterial(ae,$e);let et=le.index,We=1;if(ae.wireframe===!0){if(et=ge.getWireframeAttribute(le),et===void 0)return;We=2}const yt=le.drawRange,Ut=le.attributes.position;let ot=yt.start*We,Vt=(yt.start+yt.count)*We;ke!==null&&(ot=Math.max(ot,ke.start*We),Vt=Math.min(Vt,(ke.start+ke.count)*We)),et!==null?(ot=Math.max(ot,0),Vt=Math.min(Vt,et.count)):Ut!=null&&(ot=Math.max(ot,0),Vt=Math.min(Vt,Ut.count));const cn=Vt-ot;if(cn<0||cn===1/0)return;Qe.setup(se,ae,Ye,le,et);let on,Rt=Ge;if(et!==null&&(on=Ve.get(et),Rt=Me,Rt.setIndex(on)),se.isMesh)ae.wireframe===!0?(w.setLineWidth(ae.wireframeLinewidth*rt()),Rt.setMode(Z.LINES)):Rt.setMode(Z.TRIANGLES);else if(se.isLine){let Tn=ae.linewidth;Tn===void 0&&(Tn=1),w.setLineWidth(Tn*rt()),se.isLineSegments?Rt.setMode(Z.LINES):se.isLineLoop?Rt.setMode(Z.LINE_LOOP):Rt.setMode(Z.LINE_STRIP)}else se.isPoints?Rt.setMode(Z.POINTS):se.isSprite&&Rt.setMode(Z.TRIANGLES);if(se.isBatchedMesh)if(Mt.get("WEBGL_multi_draw"))Rt.renderMultiDraw(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount);else{const Tn=se._multiDrawStarts,st=se._multiDrawCounts,Nn=se._multiDrawCount,Ct=et?Ve.get(et).bytesPerElement:1,ri=ce.get(ae).currentProgram.getUniforms();for(let bi=0;bi<Nn;bi++)ri.setValue(Z,"_gl_DrawID",bi),Rt.render(Tn[bi]/Ct,st[bi])}else if(se.isInstancedMesh)Rt.renderInstances(ot,cn,se.count);else if(le.isInstancedBufferGeometry){const Tn=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,st=Math.min(le.instanceCount,Tn);Rt.renderInstances(ot,cn,st)}else Rt.render(ot,cn)};function si(R,Y,le,ae){X!==null&&R.isNodeMaterial&&X.setObject(ae,R),Ee===!0&&ft.setState(R,le,!1),R.transparent===!0&&R.side===di&&R.forceSinglePass===!1?(R.side=Gn,R.needsUpdate=!0,fa(R,Y,ae),R.side=zs,R.needsUpdate=!0,fa(R,Y,ae),R.side=di):fa(R,Y,ae)}this.compile=function(R,Y,le=null){le===null&&(le=R),X!==null&&X.renderStart(R,Y,le),U=Xe.get(le),U.init(Y),E.push(U),le.traverseVisible(function(se){se.isLight&&se.layers.test(Y.layers)&&(U.pushLight(se),se.castShadow&&U.pushShadow(se))}),R!==le&&R.traverseVisible(function(se){se.isLight&&se.layers.test(Y.layers)&&(U.pushLight(se),se.castShadow&&U.pushShadow(se))}),U.setupLights(),X!==null&&X.updateLights(U.state.lightsArray),Te=this.localClippingEnabled,Ee=ft.init(this.clippingPlanes,Te),Ee===!0&&ft.setGlobalState(this.clippingPlanes,Y),X!==null&&nt.render(U.state.shadowsArray,le,Y);const ae=new Set;return R.traverse(function(se){if(!(se.isMesh||se.isPoints||se.isLine||se.isSprite))return;const ke=se.material;if(ke)if(Array.isArray(ke))for(let $e=0;$e<ke.length;$e++){const Ye=ke[$e];si(Ye,le,Y,se),ae.add(Ye)}else si(ke,le,Y,se),ae.add(ke)}),U=E.pop(),X!==null&&X.renderEnd(),ae},this.compileAsync=function(R,Y,le=null){const ae=this.compile(R,Y,le);return new Promise(se=>{function ke(){if(ae.forEach(function($e){const et=ce.get($e).currentProgram;(et===void 0||et.isReady())&&ae.delete($e)}),ae.size===0){se(R);return}setTimeout(ke,10)}Mt.get("KHR_parallel_shader_compile")!==null?ke():setTimeout(ke,10)})};let la=null;function Mi(R){la&&la(R)}function gn(){Qn.stop()}function Ln(){Qn.start()}const Qn=new uy;Qn.setAnimationLoop(Mi),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(R){la=R,it.setAnimationLoop(R),R===null?Qn.stop():Qn.start()},it.addEventListener("sessionstart",gn),it.addEventListener("sessionend",Ln),this.render=function(R,Y){if(Y!==void 0&&Y.isCamera!==!0){It("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;X!==null&&X.renderStart(R,Y);const le=it.enabled===!0&&it.isPresenting===!0,ae=L!==null&&(ne===null||le)&&L.begin(H,ne);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(Y),Y=it.getCamera()),R.isScene===!0&&R.onBeforeRender(H,R,Y,ne),U=Xe.get(R,E.length),U.init(Y),U.state.textureUnits=_e.getTextureUnits(),E.push(U),Ne.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),de.setFromProjectionMatrix(Ne,Sa,Y.reversedDepth),Te=this.localClippingEnabled,Ee=ft.init(this.clippingPlanes,Te),F=Ze.get(R,O.length),F.init(),O.push(F),it.enabled===!0&&it.isPresenting===!0){const $e=H.xr.getDepthSensingMesh();$e!==null&&Fi($e,Y,-1/0,H.sortObjects)}Fi(R,Y,0,H.sortObjects),F.finish(),X!==null&&X.updateLights(U.state.lightsArray),H.sortObjects===!0&&F.sort(oe,ve),pt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,pt&&xt.addToRenderList(F,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&ft.beginShadows();const se=U.state.shadowsArray;if(nt.render(se,R,Y),Ee===!0&&ft.endShadows(),(ae&&L.hasRenderPass())===!1){const $e=F.opaque,Ye=F.transmissive;if(U.setupLights(),Y.isArrayCamera){const et=Y.cameras;if(Ye.length>0)for(let We=0,yt=et.length;We<yt;We++){const Ut=et[We];Ra($e,Ye,R,Ut)}pt&&xt.render(R);for(let We=0,yt=et.length;We<yt;We++){const Ut=et[We];Sr(F,R,Ut,Ut.viewport)}}else Ye.length>0&&Ra($e,Ye,R,Y),pt&&xt.render(R),Sr(F,R,Y)}ne!==null&&k===0&&(_e.updateMultisampleRenderTarget(ne),_e.updateRenderTargetMipmap(ne)),ae&&L.end(H),R.isScene===!0&&R.onAfterRender(H,R,Y),Qe.resetDefaultState(),J=-1,ee=null,E.pop(),E.length>0?(U=E[E.length-1],_e.setTextureUnits(U.state.textureUnits),Ee===!0&&ft.setGlobalState(H.clippingPlanes,U.state.camera)):U=null,O.pop(),O.length>0?F=O[O.length-1]:F=null,X!==null&&X.renderEnd()};function Fi(R,Y,le,ae){if(R.visible===!1)return;if(R.layers.test(Y.layers)){if(R.isGroup)le=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Y);else if(R.isLightProbeGrid)U.pushLightProbeGrid(R);else if(R.isLight)U.pushLight(R),R.castShadow&&U.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(de)){ae&&at.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ne);const $e=Se.update(R),Ye=R.material;Ye.visible&&F.push(R,$e,Ye,le,at.z,null,Y)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(de))){const $e=Se.update(R),Ye=R.material;if(ae&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),at.copy(R.boundingSphere.center)):($e.boundingSphere===null&&$e.computeBoundingSphere(),at.copy($e.boundingSphere.center)),at.applyMatrix4(R.matrixWorld).applyMatrix4(Ne)),Array.isArray(Ye)){const et=$e.groups;for(let We=0,yt=et.length;We<yt;We++){const Ut=et[We],ot=Ye[Ut.materialIndex];ot&&ot.visible&&F.push(R,$e,ot,le,at.z,Ut,Y)}}else Ye.visible&&F.push(R,$e,Ye,le,at.z,null,Y)}}const ke=R.children;for(let $e=0,Ye=ke.length;$e<Ye;$e++)Fi(ke[$e],Y,le,ae)}function Sr(R,Y,le,ae){const{opaque:se,transmissive:ke,transparent:$e}=R;U.setupLightsView(le),Ee===!0&&ft.setGlobalState(H.clippingPlanes,le),ae&&w.viewport(N.copy(ae)),se.length>0&&ca(se,Y,le),ke.length>0&&ca(ke,Y,le),$e.length>0&&ca($e,Y,le),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Ra(R,Y,le,ae){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;if(U.state.transmissionRenderTarget[ae.id]===void 0){const ot=Mt.has("EXT_color_buffer_half_float")||Mt.has("EXT_color_buffer_float");U.state.transmissionRenderTarget[ae.id]=new Kn(1,1,{generateMipmaps:!0,type:ot?yn:wn,minFilter:ya,samples:Math.max(4,I.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ht.workingColorSpace})}const ke=U.state.transmissionRenderTarget[ae.id],$e=ae.viewport||N;ke.setSize($e.z*H.transmissionResolutionScale,$e.w*H.transmissionResolutionScale);const Ye=H.getRenderTarget(),et=H.getActiveCubeFace(),We=H.getActiveMipmapLevel();H.setRenderTarget(ke),H.getClearColor(Ue),Fe=H.getClearAlpha(),Fe<1&&H.setClearColor(16777215,.5),H.clear(),pt&&xt.render(le);const yt=H.toneMapping;H.toneMapping=Ma;const Ut=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),U.setupLightsView(ae),Ee===!0&&ft.setGlobalState(H.clippingPlanes,ae),ca(R,le,ae),_e.updateMultisampleRenderTarget(ke),_e.updateRenderTargetMipmap(ke),Mt.has("WEBGL_multisampled_render_to_texture")===!1){let ot=!1;for(let Vt=0,cn=Y.length;Vt<cn;Vt++){const on=Y[Vt],{object:Rt,geometry:Tn,material:st,group:Nn}=on;if(st.side===di&&Rt.layers.test(ae.layers)){const Ct=st.side;st.side=Gn,st.needsUpdate=!0,ua(Rt,le,ae,Tn,st,Nn),st.side=Ct,st.needsUpdate=!0,ot=!0}}ot===!0&&(_e.updateMultisampleRenderTarget(ke),_e.updateRenderTargetMipmap(ke))}H.setRenderTarget(Ye,et,We),H.setClearColor(Ue,Fe),Ut!==void 0&&(ae.viewport=Ut),H.toneMapping=yt}function ca(R,Y,le){const ae=Y.isScene===!0?Y.overrideMaterial:null;for(let se=0,ke=R.length;se<ke;se++){const $e=R[se],{object:Ye,geometry:et,group:We}=$e;let yt=$e.material;yt.allowOverride===!0&&ae!==null&&(yt=ae),Ye.layers.test(le.layers)&&ua(Ye,Y,le,et,yt,We)}}function ua(R,Y,le,ae,se,ke){X!==null&&se.isNodeMaterial&&X.setObject(R,se),R.onBeforeRender(H,Y,le,ae,se,ke),R.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),se.onBeforeRender(H,Y,le,ae,R,ke),se.transparent===!0&&se.side===di&&se.forceSinglePass===!1?(se.side=Gn,se.needsUpdate=!0,H.renderBufferDirect(le,Y,ae,se,R,ke),se.side=zs,se.needsUpdate=!0,H.renderBufferDirect(le,Y,ae,se,R,ke),se.side=di):H.renderBufferDirect(le,Y,ae,se,R,ke),R.onAfterRender(H,Y,le,ae,se,ke)}function fa(R,Y,le){Y.isScene!==!0&&(Y=Be);const ae=ce.get(R),se=U.state.lights,ke=U.state.shadowsArray,$e=se.state.version,Ye=Ie.getParameters(R,se.state,ke,Y,le,U.state.lightProbeGridArray),et=Ie.getProgramCacheKey(Ye);let We=ae.programs;ae.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?Y.environment:null,ae.fog=Y.fog;const yt=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ae.envMap=ze.get(R.envMap||ae.environment,yt),ae.envMapRotation=ae.environment!==null&&R.envMap===null?Y.environmentRotation:R.envMapRotation,We===void 0&&(R.addEventListener("dispose",kn),We=new Map,ae.programs=We);let Ut=We.get(et);if(Ut!==void 0){if(ae.currentProgram===Ut&&ae.lightsStateVersion===$e)return be(R,Ye),Ut}else Ye.uniforms=Ie.getUniforms(R),X!==null&&R.isNodeMaterial&&X.build(R,le,Ye),R.onBeforeCompile(Ye,H),Ut=Ie.acquireProgram(Ye,et),We.set(et,Ut),ae.uniforms=Ye.uniforms;const ot=ae.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(ot.clippingPlanes=ft.uniform),be(R,Ye),ae.needsLights=Gt(R),ae.lightsStateVersion=$e,ae.needsLights&&(ot.ambientLightColor.value=se.state.ambient,ot.lightProbe.value=se.state.probe,ot.sunLights.value=se.state.sun,ot.sunLightShadows.value=se.state.sunShadow,ot.directionalLights.value=se.state.directional,ot.directionalLightShadows.value=se.state.directionalShadow,ot.spotLights.value=se.state.spot,ot.spotLightShadows.value=se.state.spotShadow,ot.rectAreaLights.value=se.state.rectArea,ot.ltc_1.value=se.state.rectAreaLTC1,ot.ltc_2.value=se.state.rectAreaLTC2,ot.pointLights.value=se.state.point,ot.pointLightShadows.value=se.state.pointShadow,ot.hemisphereLights.value=se.state.hemi,ot.sunShadowMatrix.value=se.state.sunShadowMatrix,ot.sunShadowCascade.value=se.state.sunShadowCascade,ot.directionalShadowMatrix.value=se.state.directionalShadowMatrix,ot.spotLightMatrix.value=se.state.spotLightMatrix,ot.spotLightMap.value=se.state.spotLightMap,ot.pointShadowMatrix.value=se.state.pointShadowMatrix),ae.lightProbeGrid=U.state.lightProbeGridArray.length>0,ae.currentProgram=Ut,ae.uniformsList=null,Ut}function Ce(R){if(R.uniformsList===null){const Y=R.currentProgram.getUniforms();R.uniformsList=Ou.seqWithValue(Y.seq,R.uniforms)}return R.uniformsList}function be(R,Y){const le=ce.get(R);le.outputColorSpace=Y.outputColorSpace,le.batching=Y.batching,le.batchingColor=Y.batchingColor,le.instancing=Y.instancing,le.instancingColor=Y.instancingColor,le.instancingMorph=Y.instancingMorph,le.skinning=Y.skinning,le.morphTargets=Y.morphTargets,le.morphNormals=Y.morphNormals,le.morphColors=Y.morphColors,le.morphTargetsCount=Y.morphTargetsCount,le.numClippingPlanes=Y.numClippingPlanes,le.numIntersection=Y.numClipIntersection,le.vertexAlphas=Y.vertexAlphas,le.vertexTangents=Y.vertexTangents,le.toneMapping=Y.toneMapping}function ct(R,Y){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;T.setFromMatrixPosition(Y.matrixWorld);for(let le=0,ae=R.length;le<ae;le++){const se=R[le];if(se.texture!==null&&se.boundingBox.containsPoint(T))return se}return null}function dt(R,Y,le,ae,se){Y.isScene!==!0&&(Y=Be),_e.resetTextureUnits();const ke=Y.fog,$e=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial?Y.environment:null,Ye=ne===null?H.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ht.workingColorSpace,et=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial&&!ae.envMap||ae.isMeshPhongMaterial&&!ae.envMap,We=ze.get(ae.envMap||$e,et),yt=ae.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,Ut=!!le.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),ot=!!le.morphAttributes.position,Vt=!!le.morphAttributes.normal,cn=!!le.morphAttributes.color;let on=Ma;ae.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(on=H.toneMapping);const Rt=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,Tn=Rt!==void 0?Rt.length:0,st=ce.get(ae),Nn=U.state.lights;if(Ee===!0&&(Te===!0||R!==ee)){const tn=R===ee&&ae.id===J;ft.setState(ae,R,tn)}let Ct=!1;ae.version===st.__version?(st.needsLights&&st.lightsStateVersion!==Nn.state.version||st.outputColorSpace!==Ye||se.isBatchedMesh&&st.batching===!1||!se.isBatchedMesh&&st.batching===!0||se.isBatchedMesh&&st.batchingColor===!0&&se._colorsTexture===null||se.isBatchedMesh&&st.batchingColor===!1&&se._colorsTexture!==null||se.isInstancedMesh&&st.instancing===!1||!se.isInstancedMesh&&st.instancing===!0||se.isSkinnedMesh&&st.skinning===!1||!se.isSkinnedMesh&&st.skinning===!0||se.isInstancedMesh&&st.instancingColor===!0&&se.instanceColor===null||se.isInstancedMesh&&st.instancingColor===!1&&se.instanceColor!==null||se.isInstancedMesh&&st.instancingMorph===!0&&se.morphTexture===null||se.isInstancedMesh&&st.instancingMorph===!1&&se.morphTexture!==null||st.envMap!==We||ae.fog===!0&&st.fog!==ke||st.numClippingPlanes!==void 0&&(st.numClippingPlanes!==ft.numPlanes||st.numIntersection!==ft.numIntersection)||st.vertexAlphas!==yt||st.vertexTangents!==Ut||st.morphTargets!==ot||st.morphNormals!==Vt||st.morphColors!==cn||st.toneMapping!==on||st.morphTargetsCount!==Tn||!!st.lightProbeGrid!=U.state.lightProbeGridArray.length>0)&&(Ct=!0):(Ct=!0,st.__version=ae.version);let ri=st.currentProgram;Ct===!0&&(ri=fa(ae,Y,se),X&&ae.isNodeMaterial&&X.onUpdateProgram(ae,ri,st));let bi=!1,oi=!1,rs=!1;const Zt=ri.getUniforms(),dn=st.uniforms;if(w.useProgram(ri.program)&&(bi=!0,oi=!0,rs=!0),ae.id!==J&&(J=ae.id,oi=!0),st.needsLights){const tn=ct(U.state.lightProbeGridArray,se);st.lightProbeGrid!==tn&&(st.lightProbeGrid=tn,oi=!0)}if(bi||ee!==R){w.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Zt.setValue(Z,"projectionMatrix",R.projectionMatrix),Zt.setValue(Z,"viewMatrix",R.matrixWorldInverse);const ha=Zt.map.cameraPosition;ha!==void 0&&ha.setValue(Z,Oe.setFromMatrixPosition(R.matrixWorld)),I.logarithmicDepthBuffer&&Zt.setValue(Z,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&Zt.setValue(Z,"isOrthographic",R.isOrthographicCamera===!0),ee!==R&&(ee=R,oi=!0,rs=!0)}if(st.needsLights&&(Nn.state.sunShadowMap.length>0&&Zt.setValue(Z,"sunShadowMap",Nn.state.sunShadowMap,_e),Nn.state.directionalShadowMap.length>0&&Zt.setValue(Z,"directionalShadowMap",Nn.state.directionalShadowMap,_e),Nn.state.spotShadowMap.length>0&&Zt.setValue(Z,"spotShadowMap",Nn.state.spotShadowMap,_e),Nn.state.pointShadowMap.length>0&&Zt.setValue(Z,"pointShadowMap",Nn.state.pointShadowMap,_e)),se.isSkinnedMesh){Zt.setOptional(Z,se,"bindMatrix"),Zt.setOptional(Z,se,"bindMatrixInverse");const tn=se.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),Zt.setValue(Z,"boneTexture",tn.boneTexture,_e))}se.isBatchedMesh&&(Zt.setOptional(Z,se,"batchingTexture"),Zt.setValue(Z,"batchingTexture",se._matricesTexture,_e),Zt.setOptional(Z,se,"batchingIdTexture"),Zt.setValue(Z,"batchingIdTexture",se._indirectTexture,_e),Zt.setOptional(Z,se,"batchingColorTexture"),se._colorsTexture!==null&&Zt.setValue(Z,"batchingColorTexture",se._colorsTexture,_e));const Bi=le.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&$.update(se,le,ri),(oi||st.receiveShadow!==se.receiveShadow)&&(st.receiveShadow=se.receiveShadow,Zt.setValue(Z,"receiveShadow",se.receiveShadow)),(ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial)&&ae.envMap===null&&Y.environment!==null&&(dn.envMapIntensity.value=Y.environmentIntensity),dn.dfgLUT!==void 0&&(dn.dfgLUT.value=tA()),oi){if(Zt.setValue(Z,"toneMappingExposure",H.toneMappingExposure),st.needsLights&&gt(dn,rs),ke&&ae.fog===!0&&Je.refreshFogUniforms(dn,ke),Je.refreshMaterialUniforms(dn,ae,ye,re,U.state.transmissionRenderTarget[R.id]),st.needsLights&&st.lightProbeGrid){const tn=st.lightProbeGrid;dn.probesSH.value=tn.texture,dn.probesMin.value.copy(tn.boundingBox.min),dn.probesMax.value.copy(tn.boundingBox.max),dn.probesResolution.value.copy(tn.resolution)}Ou.upload(Z,Ce(st),dn,_e)}if(ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(Ou.upload(Z,Ce(st),dn,_e),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&Zt.setValue(Z,"center",se.center),Zt.setValue(Z,"modelViewMatrix",se.modelViewMatrix),Zt.setValue(Z,"normalMatrix",se.normalMatrix),Zt.setValue(Z,"modelMatrix",se.matrixWorld),ae.uniformsGroups!==void 0){const tn=ae.uniformsGroups;for(let ha=0,Ji=tn.length;ha<Ji;ha++){const Ii=tn[ha];Le.update(Ii,ri),Le.bind(Ii,ri)}}return ri}function gt(R,Y){R.ambientLightColor.needsUpdate=Y,R.lightProbe.needsUpdate=Y,R.sunLights.needsUpdate=Y,R.sunLightShadows.needsUpdate=Y,R.directionalLights.needsUpdate=Y,R.directionalLightShadows.needsUpdate=Y,R.pointLights.needsUpdate=Y,R.pointLightShadows.needsUpdate=Y,R.spotLights.needsUpdate=Y,R.spotLightShadows.needsUpdate=Y,R.rectAreaLights.needsUpdate=Y,R.hemisphereLights.needsUpdate=Y}function Gt(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(R,Y,le){const ae=ce.get(R);ae.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),ce.get(R.texture).__webglTexture=Y,ce.get(R.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:le,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,Y){const le=ce.get(R);le.__webglFramebuffer=Y,le.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(R,Y=0,le=0){ne=R,P=Y,k=le;let ae=null,se=!1,ke=!1;if(R){const Ye=ce.get(R);if(Ye.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(Z.FRAMEBUFFER,Ye.__webglFramebuffer),N.copy(R.viewport),Q.copy(R.scissor),ue=R.scissorTest,w.viewport(N),w.scissor(Q),w.setScissorTest(ue),J=-1;return}else if(Ye.__webglFramebuffer===void 0)_e.setupRenderTarget(R);else if(Ye.__hasExternalTextures)_e.rebindTextures(R,ce.get(R.texture).__webglTexture,ce.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const yt=R.depthTexture;if(Ye.__boundDepthTexture!==yt){if(yt!==null&&ce.has(yt)&&(R.width!==yt.image.width||R.height!==yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");_e.setupDepthRenderbuffer(R)}}const et=R.texture;(et.isData3DTexture||et.isDataArrayTexture||et.isCompressedArrayTexture)&&(ke=!0);const We=ce.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(We[Y])?ae=We[Y][le]:ae=We[Y],se=!0):R.samples>0&&_e.useMultisampledRTT(R)===!1?ae=ce.get(R).__webglMultisampledFramebuffer:Array.isArray(We)?ae=We[le]:ae=We,N.copy(R.viewport),Q.copy(R.scissor),ue=R.scissorTest}else N.copy(me).multiplyScalar(ye).floor(),Q.copy(Ae).multiplyScalar(ye).floor(),ue=qe;if(le!==0&&(ae=K),w.bindFramebuffer(Z.FRAMEBUFFER,ae)&&w.drawBuffers(R,ae),w.viewport(N),w.scissor(Q),w.setScissorTest(ue),se){const Ye=ce.get(R.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ye.__webglTexture,le)}else if(ke){const Ye=Y;for(let et=0;et<R.textures.length;et++){const We=ce.get(R.textures[et]);Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0+et,We.__webglTexture,le,Ye)}}else if(R!==null&&le!==0){const Ye=ce.get(R.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,Ye.__webglTexture,le)}J=-1};function Xt(R){const Y=ce.get(R);return(Y.__readFormat!==R.format||Y.__readType!==R.type)&&(Y.__readFormat=R.format,Y.__readType=R.type,Y.__formatReadable=I.textureFormatReadable(R.format),Y.__typeReadable=I.textureTypeReadable(R.type)),Y}this.readRenderTargetPixels=function(R,Y,le,ae,se,ke,$e,Ye=0){if(!(R&&R.isWebGLRenderTarget)){It("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let et=ce.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&$e!==void 0&&(et=et[$e]),et){w.bindFramebuffer(Z.FRAMEBUFFER,et);try{const We=R.textures[Ye],yt=We.format,Ut=We.type;R.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+Ye);const ot=Xt(We);if(ot.__formatReadable===!1){It("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ot.__typeReadable===!1){It("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=R.width-ae&&le>=0&&le<=R.height-se&&Z.readPixels(Y,le,ae,se,He.convert(yt),He.convert(Ut),ke)}finally{const We=ne!==null?ce.get(ne).__webglFramebuffer:null;w.bindFramebuffer(Z.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(R,Y,le,ae,se,ke,$e,Ye=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let et=ce.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&$e!==void 0&&(et=et[$e]),et)if(Y>=0&&Y<=R.width-ae&&le>=0&&le<=R.height-se){w.bindFramebuffer(Z.FRAMEBUFFER,et);const We=R.textures[Ye],yt=We.format,Ut=We.type;R.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+Ye);const ot=Xt(We);if(ot.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ot.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Vt=Z.createBuffer();Z.bindBuffer(Z.PIXEL_PACK_BUFFER,Vt),Z.bufferData(Z.PIXEL_PACK_BUFFER,ke.byteLength,Z.STREAM_READ),Z.readPixels(Y,le,ae,se,He.convert(yt),He.convert(Ut),0),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,null);const cn=ne!==null?ce.get(ne).__webglFramebuffer:null;w.bindFramebuffer(Z.FRAMEBUFFER,cn);const on=Z.fenceSync(Z.SYNC_GPU_COMMANDS_COMPLETE,0);return Z.flush(),await yM(Z,on,4),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,Vt),Z.getBufferSubData(Z.PIXEL_PACK_BUFFER,0,ke),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,null),Z.deleteBuffer(Vt),Z.deleteSync(on),ke}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,Y=null,le=0){const ae=Math.pow(2,-le),se=Math.floor(R.image.width*ae),ke=Math.floor(R.image.height*ae),$e=Y!==null?Y.x:0,Ye=Y!==null?Y.y:0;_e.setTexture2D(R,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,le,0,0,$e,Ye,se,ke),w.unbindTexture()},this.copyTextureToTexture=function(R,Y,le=null,ae=null,se=0,ke=0){let $e,Ye,et,We,yt,Ut,ot,Vt,cn;const on=R.isCompressedTexture?R.mipmaps[ke]:R.image;if(le!==null)$e=le.max.x-le.min.x,Ye=le.max.y-le.min.y,et=le.isBox3?le.max.z-le.min.z:1,We=le.min.x,yt=le.min.y,Ut=le.isBox3?le.min.z:0;else{const dn=Math.pow(2,-se);$e=Math.floor(on.width*dn),Ye=Math.floor(on.height*dn),R.isDataArrayTexture?et=on.depth:R.isData3DTexture?et=Math.floor(on.depth*dn):et=1,We=0,yt=0,Ut=0}ae!==null?(ot=ae.x,Vt=ae.y,cn=ae.z):(ot=0,Vt=0,cn=0);const Rt=He.convert(Y.format),Tn=He.convert(Y.type);let st;Y.isData3DTexture?(_e.setTexture3D(Y,0),st=Z.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(_e.setTexture2DArray(Y,0),st=Z.TEXTURE_2D_ARRAY):(_e.setTexture2D(Y,0),st=Z.TEXTURE_2D),w.activeTexture(Z.TEXTURE0),w.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,Y.flipY),w.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),w.pixelStorei(Z.UNPACK_ALIGNMENT,Y.unpackAlignment);const Nn=w.getParameter(Z.UNPACK_ROW_LENGTH),Ct=w.getParameter(Z.UNPACK_IMAGE_HEIGHT),ri=w.getParameter(Z.UNPACK_SKIP_PIXELS),bi=w.getParameter(Z.UNPACK_SKIP_ROWS),oi=w.getParameter(Z.UNPACK_SKIP_IMAGES);w.pixelStorei(Z.UNPACK_ROW_LENGTH,on.width),w.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,on.height),w.pixelStorei(Z.UNPACK_SKIP_PIXELS,We),w.pixelStorei(Z.UNPACK_SKIP_ROWS,yt),w.pixelStorei(Z.UNPACK_SKIP_IMAGES,Ut);const rs=R.isDataArrayTexture||R.isData3DTexture,Zt=Y.isDataArrayTexture||Y.isData3DTexture;if(R.isDepthTexture){const dn=ce.get(R),Bi=ce.get(Y),tn=ce.get(dn.__renderTarget),ha=ce.get(Bi.__renderTarget);w.bindFramebuffer(Z.READ_FRAMEBUFFER,tn.__webglFramebuffer),w.bindFramebuffer(Z.DRAW_FRAMEBUFFER,ha.__webglFramebuffer);for(let Ji=0;Ji<et;Ji++)rs&&(Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,ce.get(R).__webglTexture,se,Ut+Ji),Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,ce.get(Y).__webglTexture,ke,cn+Ji)),Z.blitFramebuffer(We,yt,$e,Ye,ot,Vt,$e,Ye,Z.DEPTH_BUFFER_BIT,Z.NEAREST);w.bindFramebuffer(Z.READ_FRAMEBUFFER,null),w.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else if(se!==0||R.isRenderTargetTexture||ce.has(R)){const dn=ce.get(R),Bi=ce.get(Y);w.bindFramebuffer(Z.READ_FRAMEBUFFER,B),w.bindFramebuffer(Z.DRAW_FRAMEBUFFER,W);for(let tn=0;tn<et;tn++)rs?Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,dn.__webglTexture,se,Ut+tn):Z.framebufferTexture2D(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,dn.__webglTexture,se),Zt?Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Bi.__webglTexture,ke,cn+tn):Z.framebufferTexture2D(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,Bi.__webglTexture,ke),se!==0?Z.blitFramebuffer(We,yt,$e,Ye,ot,Vt,$e,Ye,Z.COLOR_BUFFER_BIT,Z.NEAREST):Zt?Z.copyTexSubImage3D(st,ke,ot,Vt,cn+tn,We,yt,$e,Ye):Z.copyTexSubImage2D(st,ke,ot,Vt,We,yt,$e,Ye);w.bindFramebuffer(Z.READ_FRAMEBUFFER,null),w.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else Zt?R.isDataTexture||R.isData3DTexture?Z.texSubImage3D(st,ke,ot,Vt,cn,$e,Ye,et,Rt,Tn,on.data):Y.isCompressedArrayTexture?Z.compressedTexSubImage3D(st,ke,ot,Vt,cn,$e,Ye,et,Rt,on.data):Z.texSubImage3D(st,ke,ot,Vt,cn,$e,Ye,et,Rt,Tn,on):R.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,ke,ot,Vt,$e,Ye,Rt,Tn,on.data):R.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,ke,ot,Vt,on.width,on.height,Rt,on.data):Z.texSubImage2D(Z.TEXTURE_2D,ke,ot,Vt,$e,Ye,Rt,Tn,on);w.pixelStorei(Z.UNPACK_ROW_LENGTH,Nn),w.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,Ct),w.pixelStorei(Z.UNPACK_SKIP_PIXELS,ri),w.pixelStorei(Z.UNPACK_SKIP_ROWS,bi),w.pixelStorei(Z.UNPACK_SKIP_IMAGES,oi),ke===0&&Y.generateMipmaps&&Z.generateMipmap(st),w.unbindTexture()},this.initRenderTarget=function(R){ce.get(R).__webglFramebuffer===void 0&&_e.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?_e.setTextureCube(R,0):R.isData3DTexture?_e.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?_e.setTexture2DArray(R,0):_e.setTexture2D(R,0),w.unbindTexture()},this.resetState=function(){P=0,k=0,ne=null,w.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Ht._getDrawingBufferColorSpace(e),n.unpackColorSpace=Ht._getUnpackColorSpace()}}class Ku extends rn{constructor(e,n={}){super(e),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,o=n.color!==void 0?new tt(n.color):new tt(8355711),c=n.textureWidth||512,u=n.textureHeight||512,h=n.clipBias||0,d=n.shader||Ku.ReflectorShader,p=n.multisample!==void 0?n.multisample:4,g=new Ja,_=new V,v=new V,x=new V,b=new Ft,A=new V(0,0,-1),S=new Jt,y=new V,C=new V,z=new Jt,T=new Ft,F=new Kn(c,u,{samples:p,type:yn}),U=new ai({name:d.name!==void 0?d.name:"unspecified",uniforms:ly.clone(d.uniforms),fragmentShader:d.fragmentShader,vertexShader:d.vertexShader});U.uniforms.tDiffuse.value=F.texture,U.uniforms.color.value=o,U.uniforms.textureMatrix.value=T,this.material=U,this.onBeforeRender=function(O,E,L){const H=this.getReflectionCamera(L);if(v.setFromMatrixPosition(a.matrixWorld),x.setFromMatrixPosition(L.matrixWorld),b.extractRotation(a.matrixWorld),_.set(0,0,1),_.applyMatrix4(b),y.subVectors(v,x),y.dot(_)>0===!0&&this.forceUpdate===!1)return;y.reflect(_).negate(),y.add(v),b.extractRotation(L.matrixWorld),A.set(0,0,-1),A.applyMatrix4(b),A.add(x),C.subVectors(v,A),C.reflect(_).negate(),C.add(v),H.position.copy(y),H.up.set(0,1,0),H.up.applyMatrix4(b),H.up.reflect(_),H.lookAt(C),H.far=L.far,H.updateMatrixWorld(),H.projectionMatrix.copy(L.projectionMatrix),T.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),T.multiply(H.projectionMatrix),T.multiply(H.matrixWorldInverse),T.multiply(a.matrixWorld),g.setFromNormalAndCoplanarPoint(_,v),g.applyMatrix4(H.matrixWorldInverse),S.set(g.normal.x,g.normal.y,g.normal.z,g.constant);const X=H.projectionMatrix;H.isOrthographicCamera?(z.x=(Math.sign(S.x)+X.elements[8])/X.elements[0],z.y=(Math.sign(S.y)+X.elements[9])/X.elements[5],z.z=-L.far,z.w=1):(z.x=(Math.sign(S.x)+X.elements[8])/X.elements[0],z.y=(Math.sign(S.y)+X.elements[9])/X.elements[5],z.z=-1,z.w=(1+X.elements[10])/X.elements[14]),S.multiplyScalar(2/S.dot(z)),X.elements[2]=S.x,X.elements[6]=S.y,H.isOrthographicCamera?(X.elements[10]=S.z-h,X.elements[14]=S.w-1):(X.elements[10]=S.z+1-h,X.elements[14]=S.w),a.visible=!1;const K=O.getRenderTarget(),B=O.xr.enabled,W=O.shadowMap.autoUpdate;O.xr.enabled=!1,O.shadowMap.autoUpdate=!1,O.setRenderTarget(F),O.state.buffers.depth.setMask(!0),O.autoClear===!1&&O.clear(),O.render(E,H),O.xr.enabled=B,O.shadowMap.autoUpdate=W,O.setRenderTarget(K);const P=L.viewport;P!==void 0&&O.state.viewport(P),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return F},this.dispose=function(){F.dispose(),a.material.dispose()},this.getReflectionCamera=function(O){let E=this._reflectionCameras.get(O);return E===void 0&&(E=O.clone(),this._reflectionCameras.set(O,E)),E}}}Ku.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};const vy=`
uvec3 bwPcg3(uvec3 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return v;
}
vec3 bwHash3(vec3 cell) { return vec3(bwPcg3(uvec3(ivec3(cell) + 4096))) * (1.0 / 4294967295.0); }
float bwHash1(vec3 cell) { return bwHash3(cell).x; }
vec3 bwGrad(vec3 cell) { return bwHash3(cell) * 2.0 - 1.0; }
/** Gradient noise in roughly [-1, 1]. */
float bwNoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(bwGrad(i), f);
  float b = dot(bwGrad(i + vec3(1, 0, 0)), f - vec3(1, 0, 0));
  float c = dot(bwGrad(i + vec3(0, 1, 0)), f - vec3(0, 1, 0));
  float d = dot(bwGrad(i + vec3(1, 1, 0)), f - vec3(1, 1, 0));
  float e = dot(bwGrad(i + vec3(0, 0, 1)), f - vec3(0, 0, 1));
  float g = dot(bwGrad(i + vec3(1, 0, 1)), f - vec3(1, 0, 1));
  float h = dot(bwGrad(i + vec3(0, 1, 1)), f - vec3(0, 1, 1));
  float k = dot(bwGrad(i + vec3(1, 1, 1)), f - vec3(1, 1, 1));
  return mix(mix(mix(a, b, u.x), mix(c, d, u.x), u.y), mix(mix(e, g, u.x), mix(h, k, u.x), u.y), u.z) * 1.6;
}
/** Value noise in [0, 1]; cheaper, used for masks. */
float bwValue(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(bwHash1(i), bwHash1(i + vec3(1, 0, 0)), u.x), mix(bwHash1(i + vec3(0, 1, 0)), bwHash1(i + vec3(1, 1, 0)), u.x), u.y),
             mix(mix(bwHash1(i + vec3(0, 0, 1)), bwHash1(i + vec3(1, 0, 1)), u.x), mix(bwHash1(i + vec3(0, 1, 1)), bwHash1(i + vec3(1, 1, 1)), u.x), u.y), u.z);
}
const mat3 BW_ROT = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);
float bwFbm3(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 3; i++) { s += a * bwNoise(p); p = BW_ROT * p * 2.03; a *= 0.5; } return s; }
float bwFbm5(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * bwNoise(p); p = BW_ROT * p * 2.03; a *= 0.5; } return s; }
/** Sharp-crested ridges in [0, 1] for cracks, veins and erosion lines. */
float bwRidged(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { float n = 1.0 - abs(bwNoise(p)); s += a * n * n; p = BW_ROT * p * 2.07; a *= 0.5; } return s; }
`,Ao=`
float bwLuma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
vec3 bwLinearToSrgb(vec3 c) {
  c = max(c, 0.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
/** Interleaved gradient noise (screen space), stable under small blurs. */
float bwIgn(vec2 pixel) { return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715)))); }
`,Kl=`
uniform sampler2D tDepth;
uniform mat4 uProjection;
uniform mat4 uInverseProjection;
// Half-resolution passes put their pixel centres exactly on full-resolution
// texel boundaries, where a nearest depth fetch may pick either row depending on
// rounding. That shows up as fixed horizontal stripes on steep surfaces. Snap to
// one texel centre with a small bias so the choice is always the same.
vec2 bwDepthUv(vec2 uv) {
  vec2 size = vec2(textureSize(tDepth, 0));
  return (floor(uv * size - 0.25) + 0.5) / size;
}
vec3 bwViewPosition(vec2 uv) {
  uv = bwDepthUv(uv);
  float depth = texture2D(tDepth, uv).x;
  vec4 clip = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec4 view = uInverseProjection * clip;
  return view.xyz / view.w;
}
float bwRawDepth(vec2 uv) { return texture2D(tDepth, bwDepthUv(uv)).x; }
`,s0=`
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,rr=(r,e,n={})=>new ai({vertexShader:s0,fragmentShader:r,uniforms:e,depthTest:!1,depthWrite:!1,toneMapped:!1,...n});class _y{constructor(){this.camera=new qu(-1,1,1,-1,0,1);const e=new Bn;e.setAttribute("position",new Wt([-1,-1,0,3,-1,0,-1,3,0],3)),this.mesh=new rn(e),this.mesh.frustumCulled=!1}render(e,n,a){this.mesh.material=n,e.setRenderTarget(a),e.render(this.mesh,this.camera)}dispose(){this.mesh.geometry.dispose()}}function Os(r,e,n={}){const a=Math.max(1,Math.round(r)),o=Math.max(1,Math.round(e)),c=n.filter??mn;return new Kn(a,o,{type:n.type??yn,format:Oi,samples:n.samples??0,depthBuffer:!!n.depthTexture,stencilBuffer:!1,generateMipmaps:!1,minFilter:c,magFilter:c,wrapS:Ni,wrapT:Ni,colorSpace:ja,depthTexture:n.depthTexture?new Fs(a,o,zi):null})}function hx(r){var e;r&&((e=r.depthTexture)==null||e.dispose(),r.dispose())}function iA(r,e,n=6){const a=[];let o=Math.max(1,Math.floor(r/2)),c=Math.max(1,Math.floor(e/2));for(;a.length<n&&Math.min(o,c)>=8;)a.push([o,c]),o=Math.floor(o/2),c=Math.floor(c/2);return a.length||a.push([Math.max(1,o),Math.max(1,c)]),a}const dx=(r,e)=>Math.max(0,Math.min(e,r>1.3?2:4)),aA={exposure:1.12,bloomStrength:.05,bloomThreshold:0,aoStrength:.85,aoRadius:.6,saturation:1,contrast:1.04,shadowTint:[1,1,1],highlightTint:[1,1,1],vignette:.3,grain:.025},sA=`
${Ao}
${Kl}
uniform mat4 uCameraWorld;
uniform vec2 uResolution;
uniform float uTime;
uniform float uFrame;
varying vec2 vUv;
/** World-space eye ray through this pixel and the distance to the first surface. */
void bwSceneRay(vec2 uv, out vec3 origin, out vec3 direction, out float surface) {
  vec3 view = bwViewPosition(uv);
  vec3 world = (uCameraWorld * vec4(view, 1.0)).xyz;
  origin = uCameraWorld[3].xyz;
  direction = normalize(world - origin);
  surface = bwRawDepth(uv) >= 0.99999 ? 1e4 : length(world - origin);
}
/** Henyey-Greenstein phase function. */
float bwPhase(float cosTheta, float g) {
  float g2 = g * g;
  return (1.0 - g2) / (12.5663706 * pow(max(1.0 + g2 - 2.0 * g * cosTheta, 1e-4), 1.5));
}
`,rA=`
${Ao}
${Kl}
uniform vec2 uResolution;
uniform float uRadius;
uniform float uIntensity;
varying vec2 vUv;
const int SAMPLES = 14;
void main() {
  if (bwRawDepth(vUv) >= 0.99999) { gl_FragColor = vec4(1.0); return; }
  vec2 texel = 1.0 / uResolution;
  vec3 p = bwViewPosition(vUv);
  vec3 pr = bwViewPosition(vUv + vec2(texel.x, 0.0)), pl = bwViewPosition(vUv - vec2(texel.x, 0.0));
  vec3 pu = bwViewPosition(vUv + vec2(0.0, texel.y)), pd = bwViewPosition(vUv - vec2(0.0, texel.y));
  // Pick the smoother neighbour on each axis so silhouettes do not smear normals.
  vec3 dx = abs(pr.z - p.z) < abs(p.z - pl.z) ? pr - p : p - pl;
  vec3 dy = abs(pu.z - p.z) < abs(p.z - pd.z) ? pu - p : p - pd;
  vec3 n = normalize(cross(dx, dy));
  float pixels = min(uRadius * uProjection[1][1] * 0.5 * uResolution.y / -p.z, 90.0);
  if (pixels < 1.0) { gl_FragColor = vec4(1.0); return; }
  // 4x4 ordered rotations: the 4x4 blur below sees each of the 16 exactly once,
  // so the sampling pattern cancels instead of leaving row or diagonal stripes.
  vec2 cell = mod(floor(gl_FragCoord.xy), 4.0);
  vec2 fine = mod(cell, 2.0), coarse = floor(cell * 0.5);
  float bayer = 4.0 * mod(fine.x * 2.0 + fine.y * 3.0, 4.0) + mod(coarse.x * 2.0 + coarse.y * 3.0, 4.0);
  float angle = (bayer + 0.5) * (6.2831853 / 16.0);
  float r2 = uRadius * uRadius;
  float sum = 0.0;
  for (int i = 0; i < SAMPLES; i++) {
    float t = (float(i) + 0.5) / float(SAMPLES);
    float a = angle + float(i) * 2.3999632;
    vec2 uv = vUv + vec2(cos(a), sin(a)) * (t * pixels) * texel;
    vec3 v = bwViewPosition(uv) - p;
    float vv = dot(v, v);
    float f = max(r2 - vv, 0.0);
    sum += f * f * f * max((dot(v, n) + p.z * 0.002) / (vv + 0.01), 0.0);
  }
  float ao = max(0.0, 1.0 - sum * uIntensity * 5.0 / (float(SAMPLES) * r2 * r2 * r2));
  gl_FragColor = vec4(ao, ao, ao, 1.0);
}
`,oA=`
${Kl}
uniform sampler2D tAo;
uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  float zc = bwViewPosition(vUv).z;
  // Compare neighbours with the centre plane, not the centre depth: surfaces seen
  // at a grazing angle change depth quickly between rows and would otherwise keep
  // only their horizontal neighbours, leaving horizontal stripes.
  float zr = bwViewPosition(vUv + vec2(uTexel.x, 0.0)).z, zl = bwViewPosition(vUv - vec2(uTexel.x, 0.0)).z;
  float zu = bwViewPosition(vUv + vec2(0.0, uTexel.y)).z, zd = bwViewPosition(vUv - vec2(0.0, uTexel.y)).z;
  float gx = abs(zr - zc) < abs(zc - zl) ? zr - zc : zc - zl;
  float gy = abs(zu - zc) < abs(zc - zd) ? zu - zc : zc - zd;
  float tolerance = 0.03 * abs(zc) + 1e-3;
  float sum = 0.0, weight = 0.0;
  for (int x = -2; x < 2; x++) for (int y = -2; y < 2; y++) {
    vec2 offset = vec2(float(x), float(y));
    vec2 uv = vUv + offset * uTexel;
    float expected = zc + gx * offset.x + gy * offset.y;
    float w = exp(-abs(bwViewPosition(uv).z - expected) / tolerance);
    sum += texture2D(tAo, uv).r * w; weight += w;
  }
  float ao = sum / max(weight, 1e-4);
  gl_FragColor = vec4(ao, ao, ao, 1.0);
}
`,lA=`
${Kl}
uniform sampler2D tSource;
uniform vec2 uStep;
varying vec2 vUv;
void main() {
  float zc = bwViewPosition(vUv).z;
  vec4 sum = vec4(0.0); float weight = 0.0;
  for (int i = -3; i <= 3; i++) {
    vec2 uv = vUv + uStep * float(i);
    float w = exp(-float(i * i) / 5.12) * exp(-abs(bwViewPosition(uv).z - zc) / (0.05 * abs(zc) + 1e-3));
    sum += texture2D(tSource, uv) * w; weight += w;
  }
  gl_FragColor = sum / max(weight, 1e-4);
}
`,cA=`
${Ao}
${Kl}
uniform sampler2D tScene;
uniform sampler2D tAo;
uniform sampler2D tVolume;
uniform vec2 uVolumeSize;
uniform float uAoStrength;
uniform float uUseAo;
uniform float uUseVolume;
varying vec2 vUv;
vec4 volumeTap(vec2 cell, vec2 f, vec2 o, float zc, inout float wsum) {
  vec2 uv = (cell + o + 0.5) / uVolumeSize;
  float bilinear = (o.x > 0.5 ? f.x : 1.0 - f.x) * (o.y > 0.5 ? f.y : 1.0 - f.y);
  float w = bilinear / (1e-3 + abs(bwViewPosition(uv).z - zc) / max(abs(zc), 1e-3));
  wsum += w;
  return texture2D(tVolume, uv) * w;
}
void main() {
  vec3 color = texture2D(tScene, vUv).rgb;
  if (uUseAo > 0.5) {
    float ao = texture2D(tAo, vUv).r;
    // Keep direct highlights: occlusion belongs mostly to ambient light.
    float mask = 1.0 - smoothstep(1.2, 6.0, bwLuma(color));
    color *= mix(1.0, ao, uAoStrength * mask);
  }
  if (uUseVolume > 0.5) {
    float zc = bwViewPosition(vUv).z;
    vec2 coord = vUv * uVolumeSize - 0.5;
    vec2 cell = floor(coord), f = coord - cell;
    float wsum = 0.0;
    vec4 v = volumeTap(cell, f, vec2(0, 0), zc, wsum) + volumeTap(cell, f, vec2(1, 0), zc, wsum)
           + volumeTap(cell, f, vec2(0, 1), zc, wsum) + volumeTap(cell, f, vec2(1, 1), zc, wsum);
    v /= max(wsum, 1e-5);
    color = color * clamp(v.a, 0.0, 1.0) + v.rgb;
  }
  gl_FragColor = vec4(color, 1.0);
}
`,uA=`
${Ao}
uniform sampler2D tSource;
uniform vec2 uTexel;
uniform float uFirst;
uniform float uThreshold;
varying vec2 vUv;
vec3 tap(vec2 o) { return texture2D(tSource, vUv + o * uTexel).rgb; }
float karis(vec3 c) { return 1.0 / (1.0 + bwLuma(c)); }
void main() {
  vec3 a = tap(vec2(-2, 2)), b = tap(vec2(0, 2)), c = tap(vec2(2, 2));
  vec3 d = tap(vec2(-2, 0)), e = tap(vec2(0, 0)), f = tap(vec2(2, 0));
  vec3 g = tap(vec2(-2, -2)), h = tap(vec2(0, -2)), i = tap(vec2(2, -2));
  vec3 j = tap(vec2(-1, 1)), k = tap(vec2(1, 1)), l = tap(vec2(-1, -1)), m = tap(vec2(1, -1));
  vec3 result;
  if (uFirst > 0.5) {
    // Karis average on the first level removes fireflies from tiny highlights.
    vec3 g0 = (a + b + d + e) * 0.25, g1 = (b + c + e + f) * 0.25, g2 = (d + e + g + h) * 0.25, g3 = (e + f + h + i) * 0.25, g4 = (j + k + l + m) * 0.25;
    float w0 = karis(g0) * 0.125, w1 = karis(g1) * 0.125, w2 = karis(g2) * 0.125, w3 = karis(g3) * 0.125, w4 = karis(g4) * 0.5;
    result = (g0 * w0 + g1 * w1 + g2 * w2 + g3 * w3 + g4 * w4) / (w0 + w1 + w2 + w3 + w4);
    if (uThreshold > 0.0) {
      float lum = bwLuma(result);
      float soft = clamp(lum - uThreshold * 0.5, 0.0, uThreshold);
      soft = soft * soft / (2.0 * uThreshold + 1e-4);
      result *= max(soft, lum - uThreshold) / max(lum, 1e-4);
    }
  } else {
    result = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  }
  gl_FragColor = vec4(max(result, 0.0), 1.0);
}
`,fA=`
uniform sampler2D tSource;
uniform vec2 uTexel;
varying vec2 vUv;
vec3 tap(vec2 o) { return texture2D(tSource, vUv + o * uTexel).rgb; }
void main() {
  vec3 sum = tap(vec2(0)) * 4.0;
  sum += (tap(vec2(-1, 0)) + tap(vec2(1, 0)) + tap(vec2(0, -1)) + tap(vec2(0, 1))) * 2.0;
  sum += tap(vec2(-1, -1)) + tap(vec2(1, -1)) + tap(vec2(-1, 1)) + tap(vec2(1, 1));
  gl_FragColor = vec4(sum / 16.0, 1.0);
}
`,hA=`
${Ao}
uniform sampler2D tLit;
uniform sampler2D tBloom;
uniform float uBloomStrength;
uniform float uBloomLevels;
uniform float uExposure;
uniform float uSaturation;
uniform float uContrast;
uniform vec3 uShadowTint;
uniform vec3 uHighlightTint;
uniform float uVignette;
uniform float uGrain;
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;
vec3 filmic(vec3 c) {
  // Fitted ACES RRT+ODT (sRGB primaries), as used by three.js ACESFilmicToneMapping.
  const mat3 inM = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777);
  const mat3 outM = mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602);
  c = inM * c;
  vec3 a = c * (c + 0.0245786) - 0.000090537;
  vec3 b = c * (0.983729 * c + 0.4329510) + 0.238081;
  return clamp(outM * (a / b), 0.0, 1.0);
}
void main() {
  vec3 hdr = texture2D(tLit, vUv).rgb;
  vec3 bloom = texture2D(tBloom, vUv).rgb / uBloomLevels;
  hdr = mix(hdr, bloom, uBloomStrength);
  vec3 c = filmic(hdr * uExposure / 0.6);
  vec3 s = bwLinearToSrgb(c);
  float lum = bwLuma(s);
  s = mix(vec3(lum), s, uSaturation);
  s = (s - 0.5) * uContrast + 0.5;
  s *= mix(uShadowTint, uHighlightTint, smoothstep(0.05, 0.75, lum));
  vec2 centred = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  float vignette = pow(clamp(1.0 - dot(centred, centred) * 0.55, 0.0, 1.0), 1.8);
  s *= mix(1.0, vignette, uVignette);
  // Grain weighted toward the shadows, then triangular dither against banding.
  vec2 pixel = gl_FragCoord.xy;
  float grain = fract(sin(dot(pixel + fract(uTime * 7.31) * 113.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  s += grain * uGrain * (1.0 - 0.6 * lum);
  s += (bwIgn(pixel + uTime * 61.0) + bwIgn(pixel.yx + 17.0) - 1.0) / 255.0;
  gl_FragColor = vec4(clamp(s, 0.0, 1.0), 1.0);
}
`,or=(r,e,n)=>{const a=r.uniforms[e];a?a.value=n:r.uniforms[e]={value:n}};function dA(r){const e=r.getContext();return typeof(e==null?void 0:e.getExtension)!="function"||typeof e.checkFramebufferStatus!="function"?!1:!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float"))}class r0{constructor(e,n,a){this.renderer=e,this.volume=a,this.pass=new _y,this.sceneTarget=null,this.litTarget=null,this.aoTarget=null,this.aoBlurTarget=null,this.volumeTarget=null,this.mips=[],this.width=1,this.height=1,this.frame=0,this.disposed=!1,this.volumeSize=new Pe(1,1),this.cameraUniforms={tDepth:{value:null},uProjection:{value:new Ft},uInverseProjection:{value:new Ft}},this.ao=rr(rA,{...this.cameraUniforms,uResolution:{value:new Pe},uRadius:{value:.6},uIntensity:{value:1}}),this.aoBlur=rr(oA,{...this.cameraUniforms,tAo:{value:null},uTexel:{value:new Pe}}),this.volumeBlurTarget=null,this.volumeBlur=rr(lA,{...this.cameraUniforms,tSource:{value:null},uStep:{value:new Pe}}),this.combine=rr(cA,{...this.cameraUniforms,tScene:{value:null},tAo:{value:null},tVolume:{value:null},uVolumeSize:{value:new Pe(1,1)},uAoStrength:{value:0},uUseAo:{value:0},uUseVolume:{value:0}}),this.downsample=rr(uA,{tSource:{value:null},uTexel:{value:new Pe},uFirst:{value:0},uThreshold:{value:0}}),this.upsample=rr(fA,{tSource:{value:null},uTexel:{value:new Pe}},{blending:Fl,transparent:!0}),this.composite=rr(hA,{tLit:{value:null},tBloom:{value:null},uBloomStrength:{value:0},uBloomLevels:{value:1},uExposure:{value:1},uSaturation:{value:1},uContrast:{value:1},uShadowTint:{value:new V(1,1,1)},uHighlightTint:{value:new V(1,1,1)},uVignette:{value:0},uGrain:{value:0},uTime:{value:0},uResolution:{value:new Pe(1,1)}}),this.settings={...aA,...n};const o=e.getContext();this.maxSamples=Number(o.getParameter(o.MAX_SAMPLES))||0,this.report={type:"half-float",msaa:0,ao:this.settings.aoStrength>0,volume:!!a,bloomLevels:0}}static create(e,n={}){if(!dA(e))return null;const a=new r0(e,n.settings,null);return a.probe()?(n.volume&&(a.volume=n.volume(),a.report.volume=!0),a):(a.dispose(),null)}probe(){const e=this.renderer.getContext(),n=this.renderer.getRenderTarget();for(const a of[dx(1,this.maxSamples),0]){const o=Os(4,4,{samples:a,depthTexture:!0});try{if(this.renderer.setRenderTarget(o),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE)return a||(this.maxSamples=0),!0}finally{this.renderer.setRenderTarget(n),hx(o)}}return!1}setSize(e,n,a){if(this.disposed)return;const o=Math.max(1,Math.round(e*a)),c=Math.max(1,Math.round(n*a));if(o===this.width&&c===this.height&&this.sceneTarget)return;this.width=o,this.height=c,this.releaseTargets();const u=dx(a,this.maxSamples);this.sceneTarget=Os(o,c,{samples:u,depthTexture:!0});const h=[Math.max(1,Math.floor(o/2)),Math.max(1,Math.floor(c/2))];this.settings.aoStrength>0&&(this.aoTarget=Os(...h,{type:wn}),this.aoBlurTarget=Os(...h,{type:wn})),this.volume&&(this.volumeTarget=Os(...h),this.volumeBlurTarget=Os(...h)),(this.aoTarget||this.volumeTarget)&&(this.litTarget=Os(o,c)),this.mips=iA(o,c).map(([d,p])=>Os(d,p)),this.report={type:"half-float",msaa:u,ao:!!this.aoTarget,volume:!!this.volumeTarget,bloomLevels:this.mips.length}}render(e,n,a){var h,d,p,g;if(this.disposed||!this.sceneTarget){this.renderer.render(e,n);return}const o=this.renderer,c=o.autoClear,u=o.info.autoReset;o.info.reset(),o.info.autoReset=!1;try{o.autoClear=!0,o.setRenderTarget(this.sceneTarget),o.render(e,n),o.autoClear=!1,this.frame++;const _=this.settings,v=this.sceneTarget.depthTexture;if(this.cameraUniforms.tDepth.value=v,this.cameraUniforms.uProjection.value.copy(n.projectionMatrix),this.cameraUniforms.uInverseProjection.value.copy(n.projectionMatrixInverse),this.aoTarget&&this.aoBlurTarget&&(this.ao.uniforms.uResolution.value.set(this.aoTarget.width,this.aoTarget.height),this.ao.uniforms.uRadius.value=_.aoRadius,this.ao.uniforms.uIntensity.value=_.aoRadius,this.pass.render(o,this.ao,this.aoTarget),this.aoBlur.uniforms.tAo.value=this.aoTarget.texture,this.aoBlur.uniforms.uTexel.value.set(1/this.aoTarget.width,1/this.aoTarget.height),this.pass.render(o,this.aoBlur,this.aoBlurTarget)),this.volume&&this.volumeTarget){const C=this.volume.material;if(or(C,"tDepth",v),or(C,"uProjection",this.cameraUniforms.uProjection.value),or(C,"uInverseProjection",this.cameraUniforms.uInverseProjection.value),or(C,"uCameraWorld",n.matrixWorld),or(C,"uResolution",this.volumeSize.set(this.volumeTarget.width,this.volumeTarget.height)),or(C,"uTime",a),or(C,"uFrame",this.frame),(d=(h=this.volume).update)==null||d.call(h,a,n),this.pass.render(o,C,this.volumeTarget),this.volumeBlurTarget){const z=this.volumeBlur.uniforms;z.tSource.value=this.volumeTarget.texture,z.uStep.value.set(1/this.volumeTarget.width,0),this.pass.render(o,this.volumeBlur,this.volumeBlurTarget),z.tSource.value=this.volumeBlurTarget.texture,z.uStep.value.set(0,1/this.volumeTarget.height),this.pass.render(o,this.volumeBlur,this.volumeTarget)}}let x=this.sceneTarget.texture;if(this.litTarget){const C=this.combine.uniforms;C.tScene.value=this.sceneTarget.texture,C.tAo.value=((p=this.aoBlurTarget)==null?void 0:p.texture)??null,C.uUseAo.value=this.aoBlurTarget?1:0,C.uAoStrength.value=_.aoStrength,C.tVolume.value=((g=this.volumeTarget)==null?void 0:g.texture)??null,C.uUseVolume.value=this.volumeTarget?1:0,this.volumeTarget&&C.uVolumeSize.value.set(this.volumeTarget.width,this.volumeTarget.height),this.pass.render(o,this.combine,this.litTarget),x=this.litTarget.texture}let b=x,A=this.width,S=this.height;this.mips.forEach((C,z)=>{const T=this.downsample.uniforms;T.tSource.value=b,T.uTexel.value.set(1/A,1/S),T.uFirst.value=z===0?1:0,T.uThreshold.value=_.bloomThreshold,this.pass.render(o,this.downsample,C),b=C.texture,A=C.width,S=C.height});for(let C=this.mips.length-2;C>=0;C--){const z=this.mips[C+1];this.upsample.uniforms.tSource.value=z.texture,this.upsample.uniforms.uTexel.value.set(1/z.width,1/z.height),this.pass.render(o,this.upsample,this.mips[C])}const y=this.composite.uniforms;y.tLit.value=x,y.tBloom.value=this.mips[0].texture,y.uBloomLevels.value=this.mips.length,y.uBloomStrength.value=_.bloomStrength,y.uExposure.value=_.exposure,y.uSaturation.value=_.saturation,y.uContrast.value=_.contrast,y.uShadowTint.value.set(..._.shadowTint),y.uHighlightTint.value.set(..._.highlightTint),y.uVignette.value=_.vignette,y.uGrain.value=_.grain,y.uTime.value=a,y.uResolution.value.set(this.width,this.height),this.pass.render(o,this.composite,null)}finally{o.autoClear=c,o.info.autoReset=u,o.setRenderTarget(null)}}releaseTargets(){[this.sceneTarget,this.litTarget,this.aoTarget,this.aoBlurTarget,this.volumeTarget,this.volumeBlurTarget,...this.mips].forEach(hx),this.sceneTarget=this.litTarget=this.aoTarget=this.aoBlurTarget=this.volumeTarget=this.volumeBlurTarget=null,this.mips=[]}dispose(){var e;this.disposed||(this.disposed=!0,this.releaseTargets(),[this.ao,this.aoBlur,this.volumeBlur,this.combine,this.downsample,this.upsample,this.composite].forEach(n=>n.dispose()),(e=this.volume)==null||e.material.dispose(),this.volume=null,this.pass.dispose())}}class pA extends Jb{constructor(e){super(e),this.type=yn}parse(e){const u=function(E,L){switch(E){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(L||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(L||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(L||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(L||""))}},_=function(E,L,H){L=L||1024;let X=E.pos,K=-1,B=0,W="",P=String.fromCharCode.apply(null,new Uint16Array(E.subarray(X,X+128)));for(;0>(K=P.indexOf(`
`))&&B<L&&X<E.byteLength;)W+=P,B+=P.length,X+=128,P=String.fromCharCode.apply(null,new Uint16Array(E.subarray(X,X+128)));return-1<K?(E.pos+=B+K+1,W+P.slice(0,K)):!1},v=function(E){const L=/^#\?(\S+)/,H=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,G=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,X=/^\s*FORMAT=(\S+)\s*$/,K=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,B={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let W,P;for((E.pos>=E.byteLength||!(W=_(E)))&&u(1,"no header found"),(P=W.match(L))||u(3,"bad initial token"),B.valid|=1,B.programtype=P[1],B.string+=W+`
`;W=_(E),W!==!1;){if(B.string+=W+`
`,W.charAt(0)==="#"){B.comments+=W+`
`;continue}if((P=W.match(H))&&(B.gamma=parseFloat(P[1])),(P=W.match(G))&&(B.exposure=parseFloat(P[1])),(P=W.match(X))&&(B.valid|=2,B.format=P[1]),(P=W.match(K))&&(B.valid|=4,B.height=parseInt(P[1],10),B.width=parseInt(P[2],10)),B.valid&2&&B.valid&4)break}return B.valid&2||u(3,"missing format specifier"),B.valid&4||u(3,"missing image size specifier"),B},x=function(E,L,H){const G=L;if(G<8||G>32767||E[0]!==2||E[1]!==2||E[2]&128)return new Uint8Array(E);G!==(E[2]<<8|E[3])&&u(3,"wrong scanline width");const X=new Uint8Array(4*L*H);X.length||u(4,"unable to allocate buffer space");let K=0,B=0;const W=4*G,P=new Uint8Array(4),k=new Uint8Array(W);let ne=H;for(;ne>0&&B<E.byteLength;){B+4>E.byteLength&&u(1),P[0]=E[B++],P[1]=E[B++],P[2]=E[B++],P[3]=E[B++],(P[0]!=2||P[1]!=2||(P[2]<<8|P[3])!=G)&&u(3,"bad rgbe scanline format");let J=0,ee;for(;J<W&&B<E.byteLength;){ee=E[B++];const Q=ee>128;if(Q&&(ee-=128),(ee===0||J+ee>W)&&u(3,"bad scanline data"),Q){const ue=E[B++];for(let Ue=0;Ue<ee;Ue++)k[J++]=ue}else k.set(E.subarray(B,B+ee),J),J+=ee,B+=ee}const N=G;for(let Q=0;Q<N;Q++){let ue=0;X[K]=k[Q+ue],ue+=G,X[K+1]=k[Q+ue],ue+=G,X[K+2]=k[Q+ue],ue+=G,X[K+3]=k[Q+ue],K+=4}ne--}return X},b=function(E,L,H,G){const X=E[L+3],K=Math.pow(2,X-128)/255;H[G+0]=E[L+0]*K,H[G+1]=E[L+1]*K,H[G+2]=E[L+2]*K,H[G+3]=1},A=function(E,L,H,G){const X=E[L+3],K=Math.pow(2,X-128)/255;H[G+0]=fu.toHalfFloat(Math.min(E[L+0]*K,65504)),H[G+1]=fu.toHalfFloat(Math.min(E[L+1]*K,65504)),H[G+2]=fu.toHalfFloat(Math.min(E[L+2]*K,65504)),H[G+3]=fu.toHalfFloat(1)},S=new Uint8Array(e);S.pos=0;const y=v(S),C=y.width,z=y.height,T=x(S.subarray(S.pos),C,z);let F,U,O;switch(this.type){case Pi:O=T.length/4;const E=new Float32Array(O*4);for(let H=0;H<O;H++)b(T,H*4,E,H*4);F=E,U=Pi;break;case yn:O=T.length/4;const L=new Uint16Array(O*4);for(let H=0;H<O;H++)A(T,H*4,L,H*4);F=L,U=yn;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:C,height:z,data:F,header:y.string,gamma:y.gamma,exposure:y.exposure,type:U,colorSpace:Mo,minFilter:mn,magFilter:mn,generateMipmaps:!1,flipY:!0}}setDataType(e){return this.type=e,this}}async function mA(){const r=await new pA().setDataType(yn).loadAsync("/immersive-worlds/cafe/room-environment.hdr");return r.mapping=ql,r.internalFormat="RGBA16F",r.colorSpace=Mo,r.flipY=!1,r.generateMipmaps=!1,r.minFilter=r.magFilter=mn,r.needsUpdate=!0,r}function o0(r){return{target:r.getRenderTarget(),face:r.getActiveCubeFace(),mip:r.getActiveMipmapLevel()}}function l0(r,e){(r.getRenderTarget()!==e.target||r.getActiveCubeFace()!==e.face||r.getActiveMipmapLevel()!==e.mip)&&r.setRenderTarget(e.target,e.face,e.mip)}function Fp(r,e){const n=o0(r);try{return e()}finally{l0(r,n)}}function c0(r,e,n){return Fp(r,()=>{var c;r.setRenderTarget(e);const a=r.getContext(),o=a.checkFramebufferStatus(a.FRAMEBUFFER);return{label:n,width:e.width,height:e.height,type:e.texture.type,format:e.texture.format,internalFormat:e.texture.internalFormat,samples:e.samples,depthTextureType:((c=e.depthTexture)==null?void 0:c.type)??null,status:o,complete:o===a.FRAMEBUFFER_COMPLETE}})}function Gd(r,e,n){const a=c0(r,e,n);if(!a.complete)throw new Error(`Cafe ${n} framebuffer incomplete: 0x${a.status.toString(16)}`);return a}function go(r,e){return r.texture.type=e,r.texture.format=Oi,r.texture.internalFormat=e===yn?"RGBA16F":"RGBA8",r.samples=0,r}function gA(r,e="auto"){const n=r.getContext(),a={colorBufferFloat:!!n.getExtension("EXT_color_buffer_float"),colorBufferHalfFloat:!!n.getExtension("EXT_color_buffer_half_float")},o=[],c=e==="auto"&&(a.colorBufferFloat||a.colorBufferHalfFloat)?[yn,wn]:[wn];for(const u of c){const h=go(new Kn(4,4,{depthBuffer:!0}),u);try{const d=c0(r,h,"capability-probe");if(o.push(d),d.complete)return{type:u,preference:e,extensions:a,probes:o}}finally{h.dispose()}}throw new Error("Cafe requires a complete RGBA8 framebuffer")}function vA(r){const e=r.onBeforeRender;r.onBeforeRender=function(n,...a){const o=o0(n),c=n.xr.enabled,u=n.shadowMap.autoUpdate,h=r.visible;try{return e.call(this,n,...a)}finally{r.visible=h,n.xr.enabled=c,n.shadowMap.autoUpdate=u,l0(n,o)}}}const _A={follow:.09,settle:.45},px=2.2;function xA(r,e,n){const a=o=>Number.isFinite(o)?o:0;return{yaw:n.yaw*Math.tanh(a(r)*px),pitch:-n.pitch*Math.tanh(a(e)*px)}}function mx(r,e,n,a,o){const c=2/a,u=c*o,h=1/(1+u+.48*u*u+.235*u*u*u),d=r-e,p=(n+c*d)*o,g=e+(d+p)*h;return e-r>0==g>e?[e,0]:[g,(n-c*p)*h]}class yA{constructor(e,n=_A){this.limit=e,this.feel=n,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(e,n){const a=xA(e,n,this.limit);this.targetYaw=a.yaw,this.targetPitch=a.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(e){if(!(e>0))return;const n=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=mx(this.yaw,this.targetYaw,this.yawVelocity,n,e),[this.pitch,this.pitchVelocity]=mx(this.pitch,this.targetPitch,this.pitchVelocity,n,e)}}const wl=new V;function Ki(r,e,n,a,o,c){const u=2*Math.PI*o/4,h=Math.max(c-2*o,0),d=Math.PI/4;wl.copy(e),wl[a]=0,wl.normalize();const p=.5*u/(u+h),g=1-wl.angleTo(r)/d;return Math.sign(wl[n])===1?g*p:h/(u+h)+p+p*(1-g)}class lr extends ti{constructor(e=1,n=1,a=1,o=2,c=.1){const u=o*2+1;if(c=Math.min(e/2,n/2,a/2,c),super(1,1,1,u,u,u),this.type="RoundedBoxGeometry",this.parameters={width:e,height:n,depth:a,segments:o,radius:c},u===1)return;const h=this.toNonIndexed();this.index=null,this.attributes.position=h.attributes.position,this.attributes.normal=h.attributes.normal,this.attributes.uv=h.attributes.uv;const d=new V,p=new V,g=new V(e,n,a).divideScalar(2).subScalar(c),_=this.attributes.position.array,v=this.attributes.normal.array,x=this.attributes.uv.array,b=_.length/6,A=new V,S=.5/u;for(let y=0,C=0;y<_.length;y+=3,C+=2)switch(d.fromArray(_,y),p.copy(d),p.x-=Math.sign(p.x)*S,p.y-=Math.sign(p.y)*S,p.z-=Math.sign(p.z)*S,p.normalize(),_[y+0]=g.x*Math.sign(d.x)+p.x*c,_[y+1]=g.y*Math.sign(d.y)+p.y*c,_[y+2]=g.z*Math.sign(d.z)+p.z*c,v[y+0]=p.x,v[y+1]=p.y,v[y+2]=p.z,Math.floor(y/b)){case 0:A.set(1,0,0),x[C+0]=Ki(A,p,"z","y",c,a),x[C+1]=1-Ki(A,p,"y","z",c,n);break;case 1:A.set(-1,0,0),x[C+0]=1-Ki(A,p,"z","y",c,a),x[C+1]=1-Ki(A,p,"y","z",c,n);break;case 2:A.set(0,1,0),x[C+0]=1-Ki(A,p,"x","z",c,e),x[C+1]=Ki(A,p,"z","x",c,a);break;case 3:A.set(0,-1,0),x[C+0]=1-Ki(A,p,"x","z",c,e),x[C+1]=1-Ki(A,p,"z","x",c,a);break;case 4:A.set(0,0,1),x[C+0]=1-Ki(A,p,"x","y",c,e),x[C+1]=1-Ki(A,p,"y","x",c,n);break;case 5:A.set(0,0,-1),x[C+0]=Ki(A,p,"x","y",c,e),x[C+1]=1-Ki(A,p,"y","x",c,n);break}}static fromJSON(e){return new lr(e.width,e.height,e.depth,e.segments,e.radius)}}const SA=`
vec3 bwSurfaceBump(vec3 viewPosition, vec3 n, float height, float faceDir) {
  vec3 dpdx = dFdx(viewPosition), dpdy = dFdy(viewPosition);
  float dhdx = dFdx(height), dhdy = dFdy(height);
  vec3 r1 = cross(dpdy, n), r2 = cross(n, dpdx);
  float det = dot(dpdx, r1) * faceDir;
  vec3 grad = sign(det) * (dhdx * r1 + dhdy * r2);
  return normalize(abs(det) * n - grad);
}
/** 0 where a pattern of the given screen-space frequency would alias, 1 where it resolves. */
float bwResolve(float frequencyPerPixel) { return 1.0 - smoothstep(0.2, 0.6, frequencyPerPixel); }
`;function Qi(r,e){const n=r.onBeforeCompile;r.onBeforeCompile=(o,c)=>{n.call(r,o,c),Object.assign(o.uniforms,e.uniforms??{});const u=e.localAttribute?"vSurface = surfaceLocal; vSurfaceNormal = normalize(surfaceLocalNormal);":e.objectSpace?"vSurface = transformed; vSurfaceNormal = normalize(objectNormal);":`#ifdef USE_INSTANCING
mat4 surfaceModel = modelMatrix * instanceMatrix;
#else
mat4 surfaceModel = modelMatrix;
#endif
vSurface = (surfaceModel * vec4(transformed, 1.0)).xyz; vSurfaceNormal = normalize(mat3(surfaceModel) * objectNormal);`;o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vSurface;
varying vec3 vSurfaceNormal;
varying vec3 vSurfaceWorld;
varying vec2 vSurfaceUv;
${e.localAttribute?`attribute vec3 surfaceLocal;
attribute vec3 surfaceLocalNormal;`:""}`).replace("#include <uv_vertex>",`#include <uv_vertex>
vSurfaceUv = uv;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
#ifdef USE_INSTANCING
vSurfaceWorld = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
#else
vSurfaceWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
#endif
${u}`),o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vSurface;
varying vec3 vSurfaceNormal;
varying vec3 vSurfaceWorld;
varying vec2 vSurfaceUv;
${vy}
${SA}
${e.fragmentHeader??""}`).replace("#include <color_fragment>",`#include <color_fragment>
float surfaceHeight = 0.0;
${e.color??""}
${e.height?`surfaceHeight = ${e.height};`:""}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
${e.roughness??""}`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${e.height?"normal = bwSurfaceBump(-vViewPosition, normal, surfaceHeight, faceDirection);":""}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
${e.emissive??""}`).replace("#include <lights_physical_fragment>",`#include <lights_physical_fragment>
${e.lights??""}`)};const a=r.customProgramCacheKey.bind(r);return r.customProgramCacheKey=()=>`${a()}|bw-surface-v1|${e.key}`,r}const Xl=r=>{const e=new tt(r);return`vec3(${e.r.toFixed(4)}, ${e.g.toFixed(4)}, ${e.b.toFixed(4)})`},kt=r=>r.toFixed(5);function MA(r,e,n={}){const a={scale:1,bump:1,stains:.5,floorY:-1e3,...e},o=new ni({color:r,roughness:.9,metalness:0,...n}),c=a.soot;return Qi(o,{key:`plaster|${a.key}`,color:`
vec3 plP = vSurface * ${kt(a.scale)};
float plBroad = bwFbm3(plP * 0.55 + 7.1);
float plTrowel = bwNoise(vec3(plP.x * 1.6 + plP.y * 0.7, plP.y * 2.1 - plP.z * 0.4, plP.z * 1.6 + plP.x * 0.3) + 2.3);
float plFineFreq = length(fwidth(plP)) * 34.0;
float plFine = bwNoise(plP * 34.0) * bwResolve(plFineFreq);
float plStain = smoothstep(0.15, 0.75, bwFbm3(vec3(plP.x * 0.4, plP.y * 0.18, plP.z * 0.4) + 3.0)) * ${kt(a.stains)};
vec3 plColor = diffuseColor.rgb * (0.92 + 0.08 * plBroad + 0.04 * plTrowel + 0.025 * plFine);
plColor *= 1.0 - 0.1 * plStain;
plColor *= mix(0.78, 1.0, smoothstep(0.0, 0.55, vSurface.y - ${kt(a.floorY)} + 0.08 * plBroad));
${c?`{
  vec3 sd = (vSurface - ${Xl(new tt(c.centre.x,c.centre.y,c.centre.z))});
  float sootMask = exp(-dot(sd.xz, sd.xz) / ${kt(c.radius*c.radius)}) * smoothstep(-0.4, 0.6, sd.y) * (0.75 + 0.25 * plBroad);
  plColor *= 1.0 - ${kt(c.amount)} * sootMask;
}`:""}
diffuseColor.rgb = plColor;`,height:`(plTrowel * 0.0011 + plBroad * 0.0016 + plFine * 0.00008) * ${kt(a.bump)}`,roughness:"roughnessFactor = clamp(roughnessFactor * (0.94 + 0.08 * plTrowel) - 0.05 * plStain, 0.3, 1.0);"})}function xy(r,e,n={}){const a={speckle:.5,pool:r,scale:1,...e},o=new wa({color:r,roughness:.32,metalness:0,clearcoat:.8,clearcoatRoughness:.12,...n});return Qi(o,{key:`glaze|${a.key}`,objectSpace:!0,color:`
vec3 glP = vSurface * ${kt(a.scale)};
float glFlow = bwFbm3(vec3(glP.x * 9.0, glP.y * 3.0, glP.z * 9.0));
float glSpeck = step(0.86 - 0.12 * ${kt(a.speckle)}, bwValue(glP * 160.0)) * bwResolve(length(fwidth(glP)) * 160.0);
vec3 glColor = mix(diffuseColor.rgb, ${Xl(a.pool)}, smoothstep(-0.2, 0.5, glFlow) * 0.55);
glColor *= 0.94 + 0.08 * bwNoise(glP * 40.0);
glColor = mix(glColor, glColor * 0.32, glSpeck);
diffuseColor.rgb = glColor;`,height:"glFlow * 0.0004",roughness:"roughnessFactor = clamp(roughnessFactor + 0.06 * glFlow, 0.05, 1.0);"})}const gx={x:"zyx",y:"xzy",z:"xyz"};function bA(r,e){const n={axis:"z",scale:1,rings:28,figure:.65,pores:.4,wear:.15,bump:1,seed:0,...e},a=n.planks,o=n.latewood?Xl(n.latewood):"diffuseColor.rgb * vec3(0.52, 0.43, 0.36)",c=n.seed*17.31;return Qi(r,{key:`wood|${n.key}`,objectSpace:n.objectSpace||n.localFrame,localAttribute:n.localFrame,color:`
vec3 wdQ = (vSurface * ${kt(n.scale)}).${gx[n.axis]} + vec3(${kt(c*.37)}, ${kt(c*.11)}, ${kt(c)});
float wdBoard = 0.5, wdSeam = 1.0;
${a?`{
  float wdW = ${kt(a.width)}, wdL = ${kt(a.length)};
  float wdCol = floor(wdQ.x / wdW);
  float wdShift = bwHash1(vec3(wdCol, 3.0, 7.0)) * wdL;
  float wdSeg = floor((wdQ.z + wdShift) / wdL);
  wdBoard = bwHash1(vec3(wdCol, wdSeg, 11.0));
  float wdU = (wdQ.x / wdW - wdCol) * wdW;
  float wdV = fract((wdQ.z + wdShift) / wdL) * wdL;
  float wdEdge = min(min(wdU, wdW - wdU), min(wdV, wdL - wdV));
  float wdBevel = ${kt(a.bevel??.004)};
  // A filtered seam: never thinner than a pixel, so distant boards do not crawl.
  float wdPix = max(length(fwidth(wdQ.xz)), 1e-5);
  wdSeam = smoothstep(0.0, max(wdBevel, wdPix * 1.5), wdEdge);
  // Seams fade as they shrink below a few pixels, leaving only the board tone.
  wdSeam = mix(1.0, wdSeam, 1.0 - 0.6 * smoothstep(wdBevel * 1.2, wdBevel * 5.0, wdPix));
  wdQ += vec3(wdBoard * 3.7, wdBoard * 1.9, wdBoard * 11.0);
}`:""}
float wdWarp = bwFbm3(vec3(wdQ.xy * 2.4, wdQ.z * 0.32));
vec2 wdPith = ${n.pith?`vec2(${kt(n.pith[0])}, ${kt(n.pith[1])}) + vec2(${kt(c*.37)}, ${kt(c*.11)})`:"vec2(0.31 + 0.25 * wdBoard, -0.27 + 0.1 * wdBoard)"};
float wdR = length(wdQ.xy - wdPith) + wdWarp * 0.05 + bwNoise(vec3(wdQ.xy * 7.0, wdQ.z * 0.9)) * 0.005;
float wdRings = wdR * ${kt(n.rings)};
float wdF = fract(wdRings);
float wdLate = smoothstep(0.42, 0.8, wdF) * (1.0 - smoothstep(0.88, 1.0, wdF));
wdLate = mix(0.32, wdLate, bwResolve(fwidth(wdRings) * 1.6));
float wdStreak = bwNoise(vec3(wdQ.xy * 150.0, wdQ.z * 2.2)) * bwResolve(length(fwidth(wdQ.xy)) * 150.0);
float wdPore = smoothstep(0.62, 0.95, bwValue(vec3(wdQ.xy * 380.0, wdQ.z * 12.0))) * bwResolve(length(fwidth(wdQ)) * 380.0) * ${kt(n.pores)};
float wdTone = 0.9 + ${kt((a==null?void 0:a.tone)??.28)} * (wdBoard - 0.5) + 0.12 * bwFbm3(vec3(wdQ.xy * 0.9, wdQ.z * 0.15) + 1.3);
vec3 wdColor = mix(diffuseColor.rgb * 1.16, ${o}, wdLate * ${kt(n.figure)}) * wdTone * (0.94 + 0.08 * wdStreak);
wdColor *= 1.0 - 0.4 * wdPore;
wdColor *= mix(0.55, 1.0, wdSeam);
float wdWear = smoothstep(0.3, 0.85, bwFbm3(vSurface * 1.1 + 4.0)) * ${kt(n.wear)};
wdColor = mix(wdColor, wdColor * 1.08 + 0.01, wdWear * 0.6);
float wdBark = 0.0, wdBarkH = 0.0;
${n.bark?`{
  vec3 wdN = normalize(vSurfaceNormal).${gx[n.axis]};
  vec2 wdRad = wdQ.xy - wdPith;
  float wdOut = dot(normalize(wdN.xy + 1e-5), normalize(wdRad + 1e-5));
  wdBark = smoothstep(0.82, 0.95, wdOut) * (1.0 - smoothstep(0.35, 0.6, abs(wdN.z)));
  float wdFissure = bwRidged(vec3(wdQ.xy * 26.0, wdQ.z * 4.5));
  wdBarkH = wdFissure * 0.006;
  wdColor = mix(wdColor, ${Xl(n.bark)} * (0.45 + 0.75 * wdFissure), wdBark);
}`:""}
diffuseColor.rgb = wdColor;`,height:`mix((-wdLate * 0.00022 + wdStreak * 0.00007 - wdPore * 0.0001 - (1.0 - wdSeam) * 0.0012) * ${kt(n.bump)}, wdBarkH, wdBark)`,roughness:"roughnessFactor = mix(clamp(roughnessFactor * (0.9 + 0.22 * wdLate) + 0.22 * wdPore + 0.3 * wdWear + (1.0 - wdSeam) * 0.25, 0.04, 1.0), 0.95, wdBark);",lights:`#ifdef USE_CLEARCOAT
material.clearcoat *= wdSeam * (1.0 - 0.75 * wdWear);
material.clearcoatRoughness = clamp(material.clearcoatRoughness + 0.25 * wdWear, 0.0, 1.0);
#endif`})}function Vd(r,e,n={}){const{varnish:a=0,roughness:o=.62,...c}=e,u=a>0?new wa({color:r,roughness:o,metalness:0,clearcoat:a,clearcoatRoughness:.16,...n}):new ni({color:r,roughness:o,metalness:0,...n});return bA(u,c)}function EA(r,e){const n={weave:"plain",threads:[180,180],heather:.5,threadContrast:.5,fuzz:.3,depth:5e-4,...e},a=n.weave==="knit"?`
  // Columns of V stitches: each half-column leans the other way, rows offset.
  vec2 fbK = vec2(fbT.x * 2.0, fbT.y);
  float fbHalf = fract(fbK.x) - 0.5;
  float fbLean = fract(fbK.y + (mod(floor(fbK.x), 2.0) < 0.5 ? fbHalf : -fbHalf) * 0.9);
  float fbH0 = sin(3.14159 * clamp(abs(fbHalf) * 2.0, 0.0, 1.0)) * 0.25 + 0.75 * sin(3.14159 * fbLean);
  float fbId = bwHash1(vec3(floor(fbK.x), floor(fbK.y + 0.5), 5.0));`:n.weave==="velvet"?`
  float fbH0 = 0.5 + 0.5 * bwNoise(vec3(fbT * 1.0, 2.0));
  float fbId = bwHash1(vec3(floor(fbT * 0.5), 9.0));`:`
  vec2 fbCell = floor(fbT), fbF = fract(fbT);
  float fbOver = ${n.weave==="twill"?"step(1.5, mod(fbCell.x + fbCell.y, 4.0))":"mod(fbCell.x + fbCell.y, 2.0)"};
  float fbWarp = sin(fbF.x * 3.14159) * (0.62 + 0.38 * sin(fbF.y * 3.14159));
  float fbWeft = sin(fbF.y * 3.14159) * (0.62 + 0.38 * sin(fbF.x * 3.14159));
  float fbH0 = mix(fbWeft, fbWarp, fbOver);
  float fbId = mix(bwHash1(vec3(fbCell.y, 1.0, 0.0)), bwHash1(vec3(fbCell.x, 2.0, 0.0)), fbOver);`;return Qi(r,{key:`fabric|${n.key}`,fragmentHeader:n.patternHeader,color:`
vec2 fbUv = vSurfaceUv;
vec2 fbT = fbUv * vec2(${kt(n.threads[0])}, ${kt(n.threads[1])});
vec2 fbFw = fwidth(fbT);
float fbAa = bwResolve(max(fbFw.x, fbFw.y));
${a}
float fbH = mix(0.5, fbH0, fbAa);
float fbThread = mix(0.5, fbId, fbAa);
float fbFuzz = bwNoise(vec3(fbT * 2.7, 4.0)) * bwResolve(max(fbFw.x, fbFw.y) * 2.7);
float fbHeather = bwFbm3(vec3(fbUv * 5.0, 1.7)) + 0.5 * bwNoise(vec3(fbUv * 23.0, 3.1));
vec3 fbBase = diffuseColor.rgb;
${n.pattern??""}
vec3 fbColor = fbBase * (1.0 + ${kt(n.heather)} * 0.16 * fbHeather);
fbColor *= 1.0 + ${kt(n.threadContrast)} * 0.22 * (fbThread - 0.5);
// Thread crowns catch light; valleys between threads stay shaded.
fbColor *= 0.82 + 0.3 * fbH + ${kt(n.fuzz)} * 0.08 * fbFuzz;
diffuseColor.rgb = fbColor;`,height:`((fbH - 0.5) + ${kt(n.fuzz)} * 0.3 * fbFuzz) * ${kt(n.depth)} * mix(0.25, 1.0, fbAa)`,roughness:"roughnessFactor = clamp(roughnessFactor + 0.06 * (0.5 - fbH), 0.3, 1.0);"})}function vx(r,e,n={}){const{sheen:a=0,sheenColor:o,roughness:c=.92,...u}=e,h=a>0?new wa({color:r,roughness:c,metalness:0,sheen:a,sheenRoughness:.55,sheenColor:o??new tt(r).lerp(new tt("#ffffff"),.35),...n}):new ni({color:r,roughness:c,metalness:0,...n});return EA(h,u)}function wA(r,e,n=.3){const a=new wa({color:r,metalness:1,roughness:n});return Qi(a,{key:`brass|${e}`,color:`
float brStreak = bwNoise(vec3(vSurface.xz * vec2(4.0, 4.0), vSurface.y * 380.0)) * bwResolve(length(fwidth(vSurface)) * 380.0);
float brTarnish = smoothstep(0.1, 0.8, bwFbm3(vSurface * 6.0 + 2.0));
diffuseColor.rgb *= (0.93 + 0.07 * brStreak) * mix(1.0, 0.72, brTarnish * 0.55);`,roughness:"roughnessFactor = clamp(roughnessFactor + 0.08 * brStreak + 0.18 * brTarnish, 0.08, 1.0);"})}function TA(r,e,n){const a=new ni({color:r,roughness:.88});return Qi(a,{key:`brick|${n}`,color:`
// Course along y; the brick run follows whichever horizontal axis the wall faces.
vec3 bkN = abs(normalize(vSurfaceNormal));
vec2 bkP = vec2(bkN.x > bkN.z ? vSurface.z : vSurface.x, vSurface.y);
vec2 bkSize = vec2(0.215, 0.075);
float bkRow = floor(bkP.y / bkSize.y);
float bkX = bkP.x / bkSize.x + 0.5 * mod(bkRow, 2.0) + 0.13 * bwHash1(vec3(bkRow, 3.0, 1.0));
vec2 bkCell = vec2(floor(bkX), bkRow);
vec2 bkF = vec2(fract(bkX) * bkSize.x, fract(bkP.y / bkSize.y) * bkSize.y);
float bkJoint = 0.0095;
float bkEdge = min(min(bkF.x, bkSize.x - bkF.x), min(bkF.y, bkSize.y - bkF.y));
float bkChip = bwNoise(vec3(bkP * 60.0, 1.0)) * 0.004;
float bkPix = max(length(fwidth(bkP)), 1e-5);
float bkBody = smoothstep(bkJoint, bkJoint + max(0.004, bkPix * 1.5), bkEdge + bkChip);
float bkId = bwHash1(vec3(bkCell, 5.0));
float bkBurn = bwFbm3(vec3(bkP * 7.0, bkId * 10.0));
vec3 bkColor = diffuseColor.rgb * (0.72 + 0.5 * bkId) * (0.9 + 0.18 * bkBurn);
bkColor = mix(bkColor, bkColor * vec3(0.78, 0.7, 0.66), smoothstep(0.55, 0.95, bwHash1(vec3(bkCell, 9.0))) * 0.6);
float bkSoot = smoothstep(0.2, 0.9, bwFbm3(vec3(bkP * 0.6, 4.0)));
bkColor *= 1.0 - 0.25 * bkSoot;
vec3 bkMortar = ${Xl(e)} * (0.85 + 0.2 * bwNoise(vec3(bkP * 90.0, 2.0)));
diffuseColor.rgb = mix(bkMortar, bkColor, bkBody);`,height:"(bkBody * 0.006 + bkBurn * 0.0006 * bkBody) ",roughness:"roughnessFactor = clamp(mix(0.97, roughnessFactor - 0.08 * bkBurn, bkBody), 0.4, 1.0);"})}function AA(r){const e={value:0},n=new wa({color:"#2a2d30",roughness:.5,clearcoat:1,clearcoatRoughness:.06});return Qi(n,{key:`wet-street|${r}`,uniforms:{uRainTime:e},fragmentHeader:"uniform float uRainTime;",color:`
vec2 wsP = vSurfaceWorld.xz;
float wsPuddle = smoothstep(0.02, 0.32, bwFbm3(vec3(wsP * 0.32, 1.7)) + 0.12 * bwNoise(vec3(wsP * 2.1, 3.0)));
float wsAgg = bwValue(vec3(wsP * 140.0, 0.0)) * bwResolve(length(fwidth(wsP)) * 140.0);
float wsRipple = bwNoise(vec3(wsP * 9.0, uRainTime * 0.9));
vec3 wsColor = diffuseColor.rgb * (0.86 + 0.28 * wsAgg) * mix(1.0, 0.55, wsPuddle);
diffuseColor.rgb = wsColor;`,height:"(wsAgg * 0.0012 * (1.0 - wsPuddle) + wsRipple * 0.00025 * wsPuddle)",roughness:"roughnessFactor = mix(clamp(roughnessFactor + 0.3 * wsAgg, 0.2, 1.0), 0.05 + 0.04 * abs(wsRipple), wsPuddle);",lights:`#ifdef USE_CLEARCOAT
material.clearcoat *= mix(0.35, 1.0, wsPuddle);
#endif`}),n.userData.rainTime=e,n}function RA(r){const e=new wa({color:"#4a2812",roughness:.2,clearcoat:.8,clearcoatRoughness:.08});return Qi(e,{key:`coffee|${r}`,objectSpace:!0,color:`
vec2 cfP = vSurface.xz / ${kt(.0715)};
float cfR = length(cfP);
float cfSwirl = bwFbm3(vec3(cfP * 3.0, 2.0));
// Heart: two lobes and a point, drawn toward the handle side, with a pulled stem.
vec2 cfH = vec2(cfP.x * 1.15, cfP.y + 0.08);
float cfHeart = length(vec2(abs(cfH.x) - 0.2, cfH.y + 0.05 - 0.55 * abs(cfH.x))) - 0.32;
float cfStem = abs(cfP.x + 0.02 * sin(cfP.y * 9.0)) - 0.025 * (1.0 - smoothstep(-0.2, 0.7, cfP.y));
float cfFoam = 1.0 - smoothstep(-0.04, 0.07, min(cfHeart + 0.05 * cfSwirl, max(cfStem, cfP.y - 0.75)));
float cfRim = smoothstep(0.78, 1.0, cfR);
vec3 cfCrema = mix(vec3(0.34, 0.18, 0.075), vec3(0.2, 0.1, 0.04), cfRim) * (0.9 + 0.2 * cfSwirl);
vec3 cfColor = mix(cfCrema, vec3(0.8, 0.68, 0.52) * (0.92 + 0.1 * cfSwirl), cfFoam * (1.0 - cfRim) * 0.92);
cfColor *= 0.94 + 0.1 * bwNoise(vec3(cfP * 70.0, 1.0)) * bwResolve(length(fwidth(cfP)) * 70.0);
diffuseColor.rgb = cfColor;`,roughness:"roughnessFactor = clamp(roughnessFactor + 0.4 * cfFoam, 0.05, 1.0);"})}function CA(r,e){const n=new wa({color:r,roughness:.5,clearcoat:.55,clearcoatRoughness:.16});return Qi(n,{key:`slab-oak|${e}`,color:`
float soX = vSurfaceWorld.x, soZ = vSurfaceWorld.z;
float soBoard = floor((soZ + 7.0) / 0.31);
float soH = bwHash1(vec3(soBoard, 7.0, 3.0));
float soCentre = (soBoard + 0.5) * 0.31 - 7.0 + (soH - 0.5) * 0.14 + 0.025 * sin(soX * 1.3 + soH * 6.0);
float soDepth = 0.02 + 0.05 * fract(soH * 7.3) + 0.028 * sin(soX * (0.7 + 0.4 * soH) + soH * 4.0);
float soWarp = bwFbm3(vec3(soX * 0.8, soZ * 3.0, soH * 5.0)) * 0.01 + bwNoise(vec3(soX * 5.0, soZ * 26.0, 1.0)) * 0.0016;
float soR = sqrt((soZ - soCentre) * (soZ - soCentre) + soDepth * soDepth) + soWarp;
float soRings = soR * (95.0 + 45.0 * soH);
float soF = fract(soRings);
float soLate = smoothstep(0.5, 0.82, soF) * (1.0 - smoothstep(0.86, 1.0, soF));
soLate = mix(0.32, soLate, bwResolve(fwidth(soRings) * 1.5));
float soZf = fwidth(soZ);
float soFibre = bwNoise(vec3(soX * 7.0, soZ * 480.0, 2.0)) * bwResolve(soZf * 480.0);
float soPore = smoothstep(0.62, 0.95, bwValue(vec3(soX * 45.0, soZ * 820.0, 5.0))) * bwResolve(soZf * 820.0);
float soRay = smoothstep(0.8, 0.98, bwValue(vec3(soX * 14.0, soZ * 160.0, 9.0))) * bwResolve(soZf * 160.0);
float soTone = 0.9 + 0.18 * (soH - 0.5) + 0.1 * bwFbm3(vec3(soX * 0.6, soZ * 1.4, 3.0));
vec3 soColor = diffuseColor.rgb * soTone;
soColor = mix(soColor, soColor * vec3(0.6, 0.5, 0.42), soLate * 0.78);
soColor *= (0.96 + 0.07 * soFibre) * (1.0 - 0.22 * soPore) * (1.0 + 0.08 * soRay);
float soWear = smoothstep(0.35, 0.85, bwFbm3(vec3(soX * 1.6, soZ * 1.6, 8.0)));
diffuseColor.rgb = soColor;`,height:"(-soPore * 0.00006 + soFibre * 0.000015)",roughness:"roughnessFactor = clamp(roughnessFactor + 0.12 * soPore + 0.06 * soLate + 0.12 * soWear, 0.05, 1.0);",lights:`#ifdef USE_CLEARCOAT
material.clearcoatRoughness = clamp(material.clearcoatRoughness + 0.14 * soWear, 0.0, 1.0);
#endif`})}function DA(){const r=CA("#8f6a44","cafe-oak");r.name="Cafe varnished oak";const e=Vd("#4a3222",{key:"cafe-dark-x",axis:"x",rings:130,figure:.5,pores:.35,wear:.12,varnish:.45,roughness:.5},{clearcoatRoughness:.22});e.name="Cafe stained walnut (horizontal grain)";const n=Vd("#4a3222",{key:"cafe-dark-y",axis:"y",rings:130,figure:.5,pores:.35,wear:.12,varnish:.45,roughness:.5},{clearcoatRoughness:.22});n.name="Cafe stained walnut (vertical grain)";const a=Vd("#6a4a33",{key:"cafe-floor",axis:"z",rings:110,figure:.55,pores:.4,wear:.35,varnish:.4,roughness:.48,planks:{width:.165,length:1.9,bevel:.0035,tone:.34}},{clearcoatRoughness:.2});a.name="Cafe varnished floor boards";const o=MA("#9c8468",{key:"cafe-plaster",floorY:0,stains:.45,bump:1.1});o.name="Cafe warm lime plaster";const c=TA("#8a4f37","#a59886","cafe-brick");c.name="Cafe exposed brick";const u=vx("#b8ab92",{key:"cafe-linen",weave:"plain",threads:[420,420],heather:.55,threadContrast:.5,fuzz:.45,depth:4e-4,sheen:.4,roughness:.9});u.name="Cafe woven linen";const h=vx("#2c473c",{key:"cafe-velvet",weave:"velvet",threads:[260,260],heather:.7,fuzz:.55,depth:5e-4,sheen:1,sheenColor:"#9cc2ac",roughness:.85});h.name="Cafe green cotton velvet";const d=xy("#e6ddcb",{key:"cafe-cup",speckle:.45,pool:"#c4a983"},{roughness:.28,clearcoat:.9,clearcoatRoughness:.07});d.name="Cafe speckled stoneware";const p=new ni({color:"#8d725a",roughness:.95});p.name="Cafe unglazed foot ring";const g=wA("#c79b5c","cafe-brass",.3);g.name="Cafe brushed brass";const _=new wa({color:"#d6d8da",metalness:1,roughness:.16});_.name="Cafe espresso chrome";const v=RA("cafe-coffee");v.name="Cafe fresh coffee",v.envMapIntensity=.35;const x=new ni({color:"#5e3a24",roughness:.7});x.name="Cafe cognac leather";const b=AA("cafe-street");b.name="Cafe rain-wet street";const A=new ni({color:"#33573a",roughness:.62,side:di});A.name="Cafe deep green foliage";const S=new ni({color:"#2a1f17",roughness:1});S.name="Cafe potting soil";const y=new Set([r,e,n,a,o,c,u,h,d,p,g,_,v,x,b,A,S]),C=[];let z=!1;return{oak:r,darkWood:e,darkWoodV:n,floor:a,plaster:o,brick:c,fabric:u,velvet:h,ceramic:d,clay:p,brass:g,chrome:_,coffee:v,leather:x,pavement:b,foliage:A,soil:S,textures:C,dispose(){if(!z){z=!0;for(const T of y)T.dispose();for(const T of new Set(C))T.dispose()}}}}function _x(r){const e=r.getAttribute("position"),n=r.getAttribute("normal"),a=r.getAttribute("uv");if(!e||!n||!a)return r;for(let o=0;o<e.count;o++){const c=Math.abs(n.getX(o)),u=Math.abs(n.getY(o)),h=Math.abs(n.getZ(o)),d=e.getX(o),p=e.getY(o),g=e.getZ(o);c>=u&&c>=h?a.setXY(o,g,p):u>=h?a.setXY(o,d,g):a.setXY(o,d,p)}return a.needsUpdate=!0,r}function UA(r,e=1){const n=new hn;n.name="Cafe lanceolate plant",n.scale.setScalar(e);let a=437921;const o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296),c=(p,g,_=n)=>{const v=new rn(p,g);return v.castShadow=!0,v.receiveShadow=!0,_.add(v),v},u=[[0,.018],[.126,.018],[.138,.026],[.144,.052],[.163,.14],[.183,.26],[.193,.334],[.196,.35],[.193,.359],[.181,.359],[.178,.345],[.166,.285],[0,.285]].map(([p,g])=>new Pe(p,g)),h=c(new fr(u,64),r.ceramic);h.name="Hollow stoneware plant pot";const d=c(new yr(.173,40),r.darkWood);d.rotation.x=-Math.PI/2,d.position.y=.327,d.name="Recessed pot soil";for(let p=0;p<18;p++){const g=Math.floor(p/6),_=new hn;_.name=`Curved pointed leaf ${p+1}`,_.rotation.y=p*2.399963+(o()-.5)*.31,n.add(_);const v=.065+o()*.036,x=.61+g*.115+o()*.045,b=.42-g*.046+o()*.072,A=.15+g*.04+o()*.07,S=.15-g*.04+o()*.04,y=.082+o()*.025-g*.009,C=(o()-.5)*.25,z=(o()-.5)*.035,T=K=>new V(v+b*K,x+Math.sin(K*Math.PI*.88)*A-S*K*K,Math.sin(K*Math.PI)*z),F=new pr([new V(v*.25,.324,0),new V(v*.4,.45+g*.045,.002),new V(v*.74,x-.05,0),T(0)]);c(new Bs(F,10,.0042-g*4e-4,5,!1),r.foliage,_);const U=[],O=[],E=[],L=16,H=6;for(let K=0;K<=L;K++){const B=K/L,W=T(B),P=Math.pow(Math.sin(B*Math.PI),.83)*(1.13-.48*B);for(let k=0;k<=H;k++){const ne=k/H*2-1,J=y*P*ne,ee=Math.sin(B*Math.PI*7+p)*.0018*ne*ne*P,N=(1-Math.abs(ne))*.018*Math.sin(B*Math.PI),Q=-ne*ne*.017*P,ue=J*C*(B-.2);if(U.push(W.x,W.y+N+Q+ue+ee,W.z+J),O.push(B,k/H),K<L&&k<H){const Ue=K*(H+1)+k,Fe=Ue+H+1;E.push(Ue,Ue+1,Fe,Ue+1,Fe+1,Fe)}}}const G=new Bn;G.setAttribute("position",new Wt(U,3)),G.setAttribute("uv",new Wt(O,2)),G.setIndex(E),G.computeVertexNormals(),c(G,r.foliage,_);const X=Array.from({length:13},(K,B)=>{const W=B/12*.96,P=T(W);return P.y+=Math.sin(W*Math.PI)*.018+5e-4,P});c(new Bs(new pr(X),16,.0014,4,!1),r.foliage,_)}return n}function LA(r){const e=new hn;e.name="Asymmetrical cafe service shelves";const n=[],a=[],o=(B,W=.86,P=0)=>{const k=new ni({color:B,roughness:W,metalness:P});return n.push(k),k},c=(B,W,P)=>{const k=xy(B,{key:`cafe-shelf-${P}`,speckle:.55,pool:W},{roughness:.34,clearcoat:.7,clearcoatRoughness:.14});return n.push(k),k},u=c("#7d8a76","#4f5d52","celadon"),h=c("#cfc5ae","#a8957a","cream"),d=c("#7a5a40","#3f2a1c","umber"),p=o("#374441"),g=o("#b4a180",.98),_=o("#77604f",.96),v=o("#9d9785",1),x=o("#826b4c",.98),b=r.foliage.clone();b instanceof ni&&b.color.set("#3b5140"),b.side=di,n.push(b);const A=new ni({color:"#ba9670",emissive:"#ffc27e",emissiveIntensity:2,roughness:.75});n.push(A);const S=(B,W,P,k,ne,J=e)=>{const ee=new rn(B,W);return ee.position.set(P,k,ne),ee.castShadow=ee.receiveShadow=!0,J.add(ee),ee},y=(B,W,P,k,ne,J,ee,N)=>S(new ti(k,ne,J),ee,B,W,P,N),C=(B,W,P,k,ne,J,ee,N)=>S(new es(k,ne,J,32),ee,B,W,P,N),z=(B,W,P,k,ne,J)=>S(new fr(B.map(([ee,N])=>new Pe(ee,N)),40),W,P,k,ne,J);for(const[B,W,P]of[[4.25,2.64,5.2],[3.98,1.96,4.52]]){y(B,W,-8.73,P,.066,.44,r.oak);const k=y(B,W-.038,-8.61,P-.24,.009,.015,A);k.castShadow=!1;for(const ne of[-1,1])y(B+ne*(P/2-.42),W-.13,-8.88,.034,.23,.06,r.darkWood)}const T=(B,W,P,k,ne,J)=>{const ee=new hn;ee.position.set(B,W,P),ee.rotation.y=J,ee.scale.setScalar(k/.4),e.add(ee);const N=z([[0,.008],[.083,.008],[.101,.033],[.124,.135],[.118,.235],[.083,.33],[.083,.388],[.093,.398],[.084,.402],[.072,.385],[.074,.331],[.108,.235],[.11,.132],[.09,.035],[0,.035]],ne,0,0,0,ee),Q=N.geometry.attributes.position;for(let Ue=0;Ue<Q.count;Ue++){const Fe=Q.getY(Ue),Ke=Q.getX(Ue),re=Q.getZ(Ue),ye=Math.max(0,(Fe-.33)/.072),oe=Math.pow(Math.max(0,-re/Math.hypot(Ke,re||1e-4)),8);Q.setXYZ(Ue,Ke,Fe+ye*oe*.019,re-ye*oe*.039)}N.geometry.computeVertexNormals();const ue=new pr([new V(.09,.312,0),new V(.17,.311,0),new V(.184,.237,0),new V(.162,.151,0),new V(.119,.132,0)]);S(new Bs(ue,20,.015,8,!1),ne,0,0,0,ee)};T(2.12,2.681,-8.72,.39,u,-.38),T(2.47,2.681,-8.69,.27,h,.18),T(4.43,2.001,-8.72,.32,d,-.6);const F=(B,W,P,k,ne)=>{z([[0,0],[.111,0],[.139,.015],[.149,.026],[.139,.037],[.093,.025],[0,.025]],ne,B,W,P);for(let J=0;J<k;J++){const ee=new hn;ee.position.set(B+Math.sin(J*2)*.009,W+.027+J*.077,P+Math.cos(J*2)*.006),ee.rotation.y=-.2+J*.27,e.add(ee),z([[0,0],[.054,0],[.069,.012],[.087,.1],[.084,.116],[.075,.116],[.077,.098],[.057,.022],[0,.022]],ne,0,0,0,ee),S(new ur(.033,.009,8,20,Math.PI*1.65),ne,.088,.062,0,ee).rotation.z=-.825*Math.PI}};F(2.27,2.003,-8.62,2,h),F(2.66,2.003,-8.75,3,u);const U=(B,W,P,k,ne,J)=>{const ee=new hn;ee.position.set(B,W,P),ee.rotation.y=J,e.add(ee);const N=y(0,k/2,0,.21,k,.135,ne,ee),Q=N.geometry.attributes.position;for(let ue=0;ue<Q.count;ue++)Q.getY(ue)>0&&(Q.setX(ue,Q.getX(ue)*.84),Q.setZ(ue,Q.getZ(ue)*.29));N.geometry.computeVertexNormals(),y(0,k-.014,.003,.19,.032,.027,_,ee)};U(3.76,2.681,-8.77,.31,g,-.13),U(3.98,2.681,-8.68,.255,p,.09);for(const[B,W,P,k]of[[0,.46,.045,v],[1,.4,.058,_],[2,.43,.031,p]]){const ne=y(5.4+B*.011,2.68+[.0225,.074,.119][B],-8.72,W,P,.28,k);ne.rotation.y=[.04,-.07,.03][B]}z([[0,0],[.095,0],[.114,.023],[.12,.13],[.116,.3],[.095,.323],[.095,.343],[.084,.343],[.085,.32],[.103,.298],[.105,.03],[0,.03]],d,5.6,2.818,-8.66),C(5.6,3.175,-8.66,.09,.093,.026,x);const O=new hn;O.position.set(5.62,2.001,-8.78),O.rotation.x=-.095,O.rotation.y=-.08,e.add(O),y(0,.18,0,.35,.36,.027,r.darkWood,O),y(0,.18,.018,.307,.317,.008,g,O);const E=S(new yr(.066,28),_,-.035,.194,.024,O);E.scale.y=1.25,y(.061,.154,.025,.057,.1,.004,p,O),z([[0,0],[.087,0],[.123,.176],[.128,.195],[.118,.204],[.109,.182],[.075,.023],[0,.023]],h,6.33,2.681,-8.7),C(6.33,2.877,-8.7,.108,.108,.009,p);const L=new pr([new V(6.33,2.885,-8.69),new V(6.39,2.98,-8.49),new V(6.43,2.79,-8.42),new V(6.41,2.55,-8.43),new V(6.49,2.27,-8.47)]);S(new Bs(L,32,.005,5,!1),b,0,0,0);const H=new ei(1,1,6,10),G=H.attributes.position;for(let B=0;B<G.count;B++){const W=G.getY(B)+.5,P=Math.pow(Math.sin(W*Math.PI),.72),k=G.getX(B);G.setXYZ(B,k*P,W,.11*Math.sin(W*Math.PI)-.065*Math.abs(k)*2)}H.computeVertexNormals();const X=new Yx(H,b,14),K=new On;for(let B=0;B<X.count;B++){const W=.04+B/X.count*.91;K.position.copy(L.getPoint(W)),K.rotation.set(.22+Math.sin(B*1.9)*.3,(B%2?-1:1)*.5,(B%2?-1:1)*(1.1+W*1.2)),K.scale.set(.083+B%3*.015,.123+B%4*.016,.13),K.updateMatrix(),X.setMatrixAt(B,K.matrix)}return X.castShadow=X.receiveShadow=!0,e.add(X),e.userData.provenance="Original procedural shelf geometry; no external assets.",{group:e,materials:n,textures:a}}function NA(r,e=!1){const n=r[0].index!==null,a=new Set(Object.keys(r[0].attributes)),o=new Set(Object.keys(r[0].morphAttributes)),c={},u={},h=r[0].morphTargetsRelative,d=new Bn;let p=0;for(let g=0;g<r.length;++g){const _=r[g];let v=0;if(n!==(_.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in _.attributes){if(!a.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;c[x]===void 0&&(c[x]=[]),c[x].push(_.attributes[x]),v++}if(v!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". Make sure all geometries have the same number of attributes."),null;if(h!==_.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in _.morphAttributes){if(!o.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+".  .morphAttributes must be consistent throughout all geometries."),null;u[x]===void 0&&(u[x]=[]),u[x].push(_.morphAttributes[x])}if(e){let x;if(n)x=_.index.count;else if(_.attributes.position!==void 0)x=_.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". The geometry must have either an index or a position attribute"),null;d.addGroup(p,x,g),p+=x}}if(n){let g=0;const _=[];for(let v=0;v<r.length;++v){const x=r[v].index;for(let b=0;b<x.count;++b)_.push(x.getX(b)+g);g+=r[v].attributes.position.count}d.setIndex(_)}for(const g in c){const _=xx(c[g]);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" attribute."),null;d.setAttribute(g,_)}for(const g in u){const _=u[g][0].length;if(_!==0){d.morphAttributes=d.morphAttributes||{},d.morphAttributes[g]=[];for(let v=0;v<_;++v){const x=[];for(let A=0;A<u[g].length;++A)x.push(u[g][A][v]);const b=xx(x);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" morphAttribute."),null;d.morphAttributes[g].push(b)}}}return d}function xx(r){let e,n,a,o=-1,c=0;for(let p=0;p<r.length;++p){const g=r[p];if(e===void 0&&(e=g.array.constructor),e!==g.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=g.itemSize),n!==g.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(a===void 0&&(a=g.normalized),a!==g.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(o===-1&&(o=g.gpuType),o!==g.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;c+=g.count*n}const u=new e(c),h=new oa(u,n,a);let d=0;for(let p=0;p<r.length;++p){const g=r[p];if(g.isInterleavedBufferAttribute){const _=d/n;for(let v=0,x=g.count;v<x;v++)for(let b=0;b<n;b++){const A=g.getComponent(v,b);h.setComponent(v+_,b,A)}}else u.set(g.array,d);d+=g.count*n}return o!==void 0&&(h.gpuType=o),h}function PA(r){const e=new hn;e.name="Cafe rain-wet evening street";const n=[],a=[],o=[],c=[];let u=914035;const h=()=>(u=Math.imul(u,1664525)+1013904223>>>0,u/4294967296),d=(oe,ve=.85,me,Ae=0)=>{const qe=new ni({color:oe,roughness:ve,emissive:me??"#000000",emissiveIntensity:Ae});return n.push(qe),o.push(qe),qe},p=(oe,ve,me)=>{const Ae=document.createElement("canvas");Ae.width=oe,Ae.height=ve;const qe=Ae.getContext("2d");if(!qe)throw new Error("Cafe exterior surface canvas unavailable");me(qe);const de=new Kx(Ae);return de.colorSpace=yi,a.push(de),de},g=p(256,512,oe=>{oe.fillStyle="#b6b9b8",oe.fillRect(0,0,256,512);for(let ve=0;ve<95;ve++){const me=h()*256,Ae=h()*512,qe=8+h()*100,de=oe.createRadialGradient(me,Ae,0,me,Ae,qe);de.addColorStop(0,h()>.45?"#77868b13":"#e1d5bf12"),de.addColorStop(1,"#00000000"),oe.fillStyle=de,oe.fillRect(me-qe,Ae-qe,qe*2,qe*2)}for(let ve=0;ve<9e3;ve++)oe.fillStyle=h()>.5?"#f0eee80b":"#2033420a",oe.fillRect(h()*256,h()*512,1,1)});g.wrapS=g.wrapT=zu,g.anisotropy=4;const _=["#2c3a44","#3d4245","#36464f","#323f49","#4a4743","#2d3d47"].map(oe=>{const ve=d(oe,.9);return ve.map=g,ve}),v=d("#4a5257",.55),x=d("#5c6466",.5),b=d("#1d262c",.96),A=d("#252f35",.55),S=d("#4f5a5c",.75),y=d("#1c272e",.84),C=d("#1d2f3a",.12,"#5d86a3",.22),z=d("#121e26",.1),T=[d("#3c342a",.3,"#ffc78a",.9),d("#4a3d2d",.3,"#ffd29c",1.6),d("#3a3226",.3,"#f2b77a",.55),d("#4f402e",.3,"#ffcb8a",2.2)],F=[d("#4a3b2a",.25,"#ffcf92",2.8),d("#3d3326",.25,"#ffd9a6",2)],U=[d("#978e7d",.94,"#ffc890",.15),d("#776f60",.96,"#ffbf80",.09),d("#617076",.98)],O=[d("#2f3a36"),d("#3b373a"),d("#3a342d")],E=new hi({color:new tt(1,.78,.5).multiplyScalar(28)});n.push(E);const L=new Map,H=(oe,ve,me,Ae,qe,de=0,Ee=0,Te=0)=>{const Ne=new Ft().compose(new V(me,Ae,qe),new _r().setFromEuler(new as(de,Ee,Te)),new V(1,1,1));oe.applyMatrix4(Ne);const Oe=L.get(ve)??[];Oe.push(oe),L.set(ve,Oe)},G=(oe,ve,me,Ae,qe,de,Ee)=>H(new ti(Ae,qe,de),Ee,oe,ve,me),X=(oe,ve,me,Ae,qe,de,Ee)=>H(new es(Ae,qe,de,14),Ee,oe,ve,me),K=new ai({name:"CafeBlueHourSky",side:Gn,depthWrite:!1,uniforms:{},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec3 vDir;
void main(){
  float y = vDir.y;
  // Blue hour: the sky still glows after sunset, brightest just above the rooftops.
  vec3 top = vec3(0.012, 0.03, 0.09), mid = vec3(0.04, 0.075, 0.165), low = vec3(0.095, 0.11, 0.155);
  vec3 c = mix(mid, top, smoothstep(0.3, 0.95, y));
  c = mix(low, c, smoothstep(0.0, 0.26, y));
  // Thin, slow cloud deck lit from below by the city.
  float band = sin(vDir.x * 9.0 + y * 31.0) * sin(vDir.x * 23.0 - y * 13.0);
  c += vec3(0.006, 0.007, 0.01) * smoothstep(0.2, 0.9, band) * smoothstep(0.05, 0.3, y) * (1.0 - smoothstep(0.4, 0.8, y));
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`});n.push(K);const B=new rn(new ba(70,32,16),K);B.position.set(-3,0,-10),B.name="Blue-hour sky dome",e.add(B),G(-7,-.064,-15,32,.08,23,r.pavement),G(-10.9,-.064,-2.65,23,.08,2.2,r.pavement),G(-10.9,.026,-2.55,23,.1,1.85,v),G(-10.9,.064,-3.51,23,.17,.14,x),G(-7,.025,-15.8,32,.12,1.38,v),G(-7,.08,-15.07,32,.19,.13,x);for(let oe=-22;oe<.6;oe+=1.32)G(oe,.078,-2.55,.014,.004,1.78,b);for(let oe=-22;oe<9;oe+=1.57)G(oe,.087,-15.8,.013,.004,1.31,b);G(-7,-.017,-4.12,32,.012,.035,b);for(let oe=0;oe<4;oe++){const ve=-10.5+oe*4.6;G(ve,-.012,-4.24,.57,.024,.34,A);for(let me=0;me<6;me++)G(ve-.23+me*.09,.002,-4.24,.014,.013,.31,x)}const W=p(128,128,oe=>{const ve=oe.createRadialGradient(64,64,0,64,64,64);ve.addColorStop(0,"#ffffffff"),ve.addColorStop(.12,"#ffffff70"),ve.addColorStop(.4,"#ffffff16"),ve.addColorStop(1,"#ffffff00"),oe.fillStyle=ve,oe.fillRect(0,0,128,128)}),P=new hi({color:new tt("#ffd6a0").multiplyScalar(.7),map:W,transparent:!0,opacity:.5,depthWrite:!1,blending:Fl});n.push(P);const k=(oe,ve,me,Ae)=>{const qe=new rn(new ei(Ae,Ae*.7),P);qe.position.set(oe,ve,me),qe.name="Shop window light spill",e.add(qe)},ne=p(256,1024,oe=>{const ve=oe.createImageData(256,1024);let me=.5;for(let Ae=0;Ae<1024;Ae++){Ae%(4+Math.floor(h()*9))===0&&(me=h());const qe=Ae/1023,de=Math.sin(Math.PI*qe)**.55,Ee=.5+.085*Math.sin(qe*31)+.034*Math.sin(qe*103),Te=.05+.22*qe;for(let Ne=0;Ne<256;Ne++){const Oe=(Ne/255-Ee)/Te,at=Math.exp(-Oe*Oe*3.4)*de*(.13+me*.64)*(1-qe*.6),Be=(Ae*256+Ne)*4;ve.data[Be]=ve.data[Be+1]=ve.data[Be+2]=255,ve.data[Be+3]=Math.round(at*255)}}oe.putImageData(ve,0,0)}),J=[["#ffcf96",6.5],["#9fb8c8",2],["#ffc58a",5]].map(([oe,ve])=>{const me=new hi({map:ne,color:new tt(oe).multiplyScalar(ve),transparent:!0,opacity:.8,depthWrite:!1,blending:Fl});return n.push(me),me}),ee=(oe,ve,me,Ae,qe=0,de=1)=>{const Ee=new ei(me,Ae),Te=Ee.getAttribute("uv"),Ne=Ee.getAttribute("position"),Oe=(.6-oe)*Ae/(1.45-(ve-Ae/2));for(let Be=0;Be<Ne.count;Be++)Ne.setX(Be,Ne.getX(Be)+(1-Te.getY(Be))*Oe);if(h()>.5)for(let Be=0;Be<Te.count;Be++)Te.setX(Be,1-Te.getX(Be));const at=new rn(Ee,J[qe]);at.position.set(oe,-.018+de*.001,ve),at.rotation.x=-Math.PI/2,at.rotation.z=(h()-.5)*.025,at.name="Broken wet-street light reflection",e.add(at)},N=[{x:-16.3,z:-19.2,w:4.5,h:9.7,rows:4,bays:3,style:0},{x:-11.8,z:-17.6,w:4.2,h:7.1,rows:3,bays:2,style:1},{x:-7.5,z:-18.4,w:4.3,h:9.1,rows:4,bays:2,style:2},{x:-3.1,z:-16.95,w:4.35,h:6.55,rows:2,bays:3,style:3},{x:1.25,z:-18,w:4.1,h:8.35,rows:3,bays:2,style:4},{x:5.55,z:-20.1,w:4.4,h:10.4,rows:4,bays:3,style:5}];for(const oe of N){const{x:ve,z:me,w:Ae,h:qe,rows:de,bays:Ee,style:Te}=oe;G(ve,qe/2,me-.65,Ae,qe,1.3,_[Te]),G(ve,qe+.025,me-.08,Ae+.14,.16,1.65,y),G(ve,2.5,me+.055,Ae+.05,.09,.2,S),G(ve-Ae/2+.11,qe/2,me+.025,.16,qe,.09,S),G(ve+Ae/2-.1,qe/2,me+.025,.13,qe,.09,A);const Oe=(qe-.73-3.15)/Math.max(1,de-1);for(let rt=0;rt<de;rt++)for(let Z=0;Z<Ee;Z++){if(Te===2&&rt===2&&Z===0||Te===5&&rt===1&&Z===2)continue;const mt=ve+(Z-(Ee-1)/2)*(Ae/(Ee+.34)),Mt=3.15+rt*Oe+(Te===3&&Z===2?.22:0),I=Ee===3?.72+h()*.16:1.03+h()*.22,w=Math.min(Oe*.67,.91+h()*.35);G(mt,Mt,me+.045,I+.16,w+.18,.09,A);const te=h(),ce=te<.5?z:te<.64?C:T[Math.floor(h()*T.length)];if(G(mt,Mt,me+.101,I,w,.012,ce),G(mt,Mt-w/2-.055,me+.13,I+.21,.08,.27,S),(Z%2===0||Te%2===0)&&G(mt+(h()-.5)*.09,Mt,me+.15,.026,w,.035,A),(rt+Te)%3===0&&G(mt,Mt+w*.21,me+.151,I,.024,.036,A),te>.4&&h()>.34){const _e=U[(Z+rt+Te)%U.length],ze=I*(.17+h()*.18),Ve=h()>.5?1:-1;G(mt+Ve*(I-ze)*.5,Mt,me+.119,ze,w*.98,.016,_e)}te<.18&&G(mt,Mt+w*.28,me+.134,I,w*.43,.014,U[2])}const at=1.71+Te%2*.16,Be=ve+Ae*.28,pt=Te!==1&&Te!==5;G(ve-Ae*.1,1.2,me+.053,Ae*.6,at,.08,A),G(ve-Ae*.1,1.2,me+.105,Ae*.54,at-.13,.024,pt?F[Te%2]:C),G(ve-Ae*.1,1.2,me+.15,.042,at-.1,.07,A),G(Be,1.13,me+.08,.72,2.07,.12,A),G(Be,1.18,me+.153,.56,1.68,.02,Te%2?z:T[2]),G(Be+.18,.94,me+.18,.018,.18,.025,r.brass),G(ve-.1,2.38,me+.16,Ae*.86,.25,.14,O[Te%3]),H(new ti(Ae*.89,.048,.67),O[Te%3],ve-.1,2.19,me+.39,.15),G(ve-.1,2.11,me+.71,Ae*.89,.13,.037,O[Te%3]);for(let rt=0;rt<3;rt++)G(ve-Ae*.31+rt*.41,.63+rt%2*.11,me+.145,.18+h()*.1,.34+h()*.2,.05,U[(rt+Te)%3]);if(pt){for(let rt=0;rt<4;rt++)h();k(ve-Ae*.1,1.2,me+.25,Ae*.75)}}const Q=new hi({color:new tt(1,.74,.45).multiplyScalar(6)});n.push(Q);for(const[oe,ve,me]of[[-7.6,-18.4+.74,3.9],[-3.2,-16.95+.74,3.9],[5.45,-20.1+.74,4]])for(let qe=0;qe<11;qe++){const de=qe/10,Ee=Math.sin(de*Math.PI)*.22+Math.sin(de*Math.PI*2)*.02;H(new ba(.05,10,6),Q,oe-me/2+de*me,2.02-Ee,ve)}const ue=d("#1f2a33",.2,"#9fc0e0",.9);for(const[oe,ve,me]of[[-14.9,5.4,-19.1],[-10.9,6.7,-17.5],[2,4.9,-17.9],[6.5,7.6,-20]])G(oe,ve,me+.11,.5,.75,.012,ue);const Ue=d("#161b20",.22),Fe=new hi({color:new tt(1,.08,.04).multiplyScalar(2.4)}),Ke=new hi({color:new tt(.2,1,.55).multiplyScalar(3)});n.push(Fe,Ke);for(const[oe,ve]of[[-9.6,-13.6],[-1.9,-13.7]]){H(new ti(4.1,.62,1.75),Ue,oe,.52,ve),H(new ti(2.2,.5,1.6),Ue,oe-.25,1.06,ve);for(const me of[-1,1])H(new ti(.04,.07,.2),Fe,oe+2.05,.66,ve+me*.68)}X(.9,1.55,-14.95,.05,.05,3.1,A),G(.9,2.85,-14.85,.3,.62,.2,A),H(new yr(.085,16),Ke,.9,2.68,-14.74),G(-20.9,4.7,-25.1,6.3,9.4,1.8,_[3]),G(-13.8,6.9,-27.2,3,13.8,2,_[0]);for(const[oe,ve,me]of[[-21.5,4.3,-24.17],[-20,6.4,-24.17],[-13.2,7.3,-26.16]])G(oe,ve,me,.4,.64,.02,T[2]);const re=[[-8.1,-8.6,3.65,!0],[-12.4,-13.9,3.92,!0],[-1.2,-14.6,3.9,!1],[4.6,-14.9,3.9,!1],[-18.6,-14.4,3.9,!1],[-8.9,-4.25,3.7,!1]];for(const[oe,[ve,me,Ae,qe]]of re.entries()){X(ve,Ae/2,me,.027,.058,Ae,A),X(ve,.12,me,.09,.13,.24,A),H(new es(.028,.028,.52,12),A,ve+.25,Ae-.09,me,0,0,Math.PI/2),H(new ba(.075,16,10),E,ve+.46,Ae-.17,me),X(ve+.46,Ae-.095,me,.085,.155,.075,y);const de=new V(ve+.46,Ae-.19,me);if(qe){const Ee=new Pu("#ffc98c",oe===0?14:11,9,2);Ee.position.copy(de),e.add(Ee)}c.push({position:de,color:new tt("#ffc890"),strength:oe===5?.02:.032}),ee(ve+.46,me+2.3,.75,4.8+(me<-12?3:0),oe%2?2:0,1)}for(const[oe,ve]of L){const me=NA(ve,!1);if(ve.forEach(qe=>qe.dispose()),!me)throw new Error("Cafe exterior batch geometry mismatch");const Ae=new rn(me,oe);Ae.castShadow=!1,Ae.receiveShadow=!1,Ae.name="Batched cafe street architecture",e.add(Ae)}const ye=[...o,r.pavement];return{group:e,materials:n,textures:a,lamps:c,setEnvironment(oe){for(const ve of ye)ve.envMap=oe,ve.envMapIntensity=oe?ve===r.pavement?.25:1:.6,ve.needsUpdate=!0}}}const yx={x:-2.15,y:2.14,z:-1.55,w:5.7,h:3.5},sa=.775;function yy(r){const e=Gx.lerp;return{camera:new V(e(.62,.66,r),e(1.36,1.42,r),e(1.45,1.5,r)),aim:new V(e(-.03,.72,r),e(1.52,1.5,r),-1.6),fov:e(52,60,r),cup:new V(e(-.12,.46,r),sa,e(-.36,-.34,r)),lamp:new V(e(-.55,.25,r),sa,e(-.92,-.98,r)),lampScale:e(1.2,1.1,r),book:new V(e(.3,.52,r),sa,e(-.42,-.66,r))}}function OA(){const r=new Dp;r.background=new tt(.012,.018,.03);const e=DA(),n=[],a=[],o=[],c=[],u=(Ce,be=.8,ct=0)=>{const dt=new ni({color:Ce,roughness:be,metalness:ct});return a.push(dt),dt},h=Ce=>{const be=new wa(Ce);return a.push(be),be},d=(Ce,be,ct,dt,gt,Gt=r)=>{const Xt=new rn(Ce,be);return Xt.position.set(ct,dt,gt),Xt.castShadow=!0,Xt.receiveShadow=!0,Gt.add(Xt),Xt},p=(Ce,be,ct,dt,gt,Gt,Xt,R)=>d(new ti(dt,gt,Gt),Xt,Ce,be,ct,R),g=(Ce,be,ct,dt,gt,Gt,Xt,R=.008,Y)=>d(new lr(dt,gt,Gt,3,Math.min(R,dt/2.1,gt/2.1,Gt/2.1)),Xt,Ce,be,ct,Y),_=(Ce,be,ct,dt,gt,Gt,Xt)=>d(new fr(Ce.map(([R,Y])=>new Pe(R,Y)),ct),be,dt,gt,Gt,Xt),v=(Ce,be,ct,dt,gt,Gt,Xt,R,Y=48)=>d(new es(dt,gt,Gt,Y),Xt,Ce,be,ct,R),x=(Ce,be,ct,dt,gt,Gt)=>d(new ba(dt,24,16),gt,Ce,be,ct,Gt),b=(Ce,be,ct,dt=r,gt=32)=>d(new Bs(new pr(Ce),gt,be,10,!1),ct,0,0,0,dt),A=(Ce,be)=>new tt(Ce).multiplyScalar(be);g(-2.2,-.1,3.2,6,.2,9.5,e.floor,.002),g(4,-.1,-3.2,6.5,.2,12,e.floor,.002),p(4,2,-9.05,6.5,4.1,.18,e.brick),p(7.2,2,-2,.2,4,14,e.plaster);const S=u("#151c21",.95);d(new ti(.16,4,7.5),[e.plaster,S,S,S,e.plaster,S],.82,2,-5.3),p(-2.2,4.15,3.2,6,.16,9.5,e.plaster),p(4,4.15,-3.2,6.5,.16,12,e.plaster),p(-5.3,2,1,.25,4,6,e.plaster),g(7.08,.55,-3,.05,1.1,11.6,e.darkWoodV,.006),g(7.04,1.12,-3,.09,.05,11.6,e.darkWood,.01);for(const Ce of[-1.4,-4.2,-7])g(4,3.95,Ce,6.5,.26,.22,e.darkWood,.015);const y=yx,C=y.y-y.h/2;g(y.x,C/2,y.z+.02,y.w+.24,C,.2,e.darkWood,.01),g(y.x,C+.015,y.z+.16,y.w+.36,.045,.34,e.oak,.012);for(const Ce of[-5.06,-2.25,.74]){g(Ce,y.y+.01,y.z+.04,.11,y.h+.2,.16,e.darkWoodV,.012);for(const be of[-1,1])g(Ce+be*.062,y.y,y.z+.02,.012,y.h,.022,e.brass,.004)}g(y.x,y.y+y.h/2+.07,y.z+.03,y.w+.3,.16,.2,e.darkWood,.012),g(y.x,3.18,y.z+.05,y.w,.07,.13,e.darkWood,.01),((Ce,be,ct,dt)=>{const Gt=new ei(be,3.42,64,40),Xt=Gt.getAttribute("position");for(let le=0;le<Xt.count;le++){const ae=Xt.getX(le)/be+.5,se=Xt.getY(le)/3.42+.5,ke=Math.sin(ae*Math.PI*2*ct+dt)*(.032+.018*Math.sin(ae*7+dt))+Math.sin(ae*Math.PI*2*ct*2.1+dt*2)*.008,$e=1+(1-se)*.18;Xt.setXYZ(le,Xt.getX(le)*$e,Xt.getY(le),ke*(.7+.3*(1-se))+(1-se)*(1-se)*.03)}Gt.computeVertexNormals();const R=Gt.getAttribute("uv");for(let le=0;le<R.count;le++)R.setXY(le,R.getX(le)*be*1.3,R.getY(le)*3.42);const Y=d(Gt,e.fabric,Ce,y.y+.05,y.z+.17);return Y.castShadow=!1,Y})(-2.48,.5,3.5,1.2);const T=d(new es(.014,.014,y.w+.5,24),e.brass,y.x,y.y+y.h/2-.02,y.z+.2);T.rotation.z=Math.PI/2;for(const Ce of[y.x-y.w/2-.22,y.x+y.w/2+.22])x(Ce,y.y+y.h/2-.02,y.z+.2,.024,e.brass);const F=new hn;r.add(F),F.position.set(-.5,sa-.042,-.675);const U=new ny,O=2.4,E=1.25,L=.07;U.moveTo(-O/2+L,-E/2),U.lineTo(O/2-L,-E/2),U.quadraticCurveTo(O/2,-E/2,O/2,-E/2+L),U.lineTo(O/2,E/2-L),U.quadraticCurveTo(O/2,E/2,O/2-L,E/2),U.lineTo(-O/2+L,E/2),U.quadraticCurveTo(-O/2,E/2,-O/2,E/2-L),U.lineTo(-O/2,-E/2+L),U.quadraticCurveTo(-O/2,-E/2,-O/2+L,-E/2);const H=d(new t0(U,{depth:.03,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:5,steps:1,curveSegments:18}),e.oak,0,0,0,F);H.rotation.x=-Math.PI/2,g(0,-.05,0,O-.12,.07,E-.14,e.darkWood,.01,F);for(const Ce of[-O/2+.14,O/2-.14])for(const be of[-E/2+.12,E/2-.12])_([[0,0],[.026,0],[.03,.05],[.022,.3],[.02,.62],[.028,.7],[.028,.72],[0,.72]],e.darkWoodV,24,Ce,-.75,be,F);const G=document.createElement("canvas");G.width=G.height=128;const X=G.getContext("2d"),K=X.createRadialGradient(64,64,4,64,64,64);K.addColorStop(0,"rgba(0,0,0,.5)"),K.addColorStop(.45,"rgba(0,0,0,.2)"),K.addColorStop(1,"rgba(0,0,0,0)"),X.fillStyle=K,X.fillRect(0,0,128,128);const B=new Kx(G);o.push(B);const W=new hi({map:B,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2});a.push(W);const P=Ce=>{const be=d(new ei(Ce,Ce),W,0,sa+.001,0);return be.rotation.x=-Math.PI/2,be.castShadow=!1,be.receiveShadow=!1,be},k=P(.3),ne=P(.32),J=new hn;r.add(J);const ee=_([[0,0],[.045,0],[.05,.004],[.056,.006],[.06,.008],[.085,.012],[.1,.019],[.106,.022],[.104,.025],[.098,.022],[.084,.016],[.062,.013],[.04,.014],[0,.014]],e.ceramic,128,0,0,0,J),N=_([[.04,0],[.046,0],[.046,.004],[.04,.004]],e.clay,64,0,0,0,J);N.castShadow=!1;const Q=new hn;Q.position.y=.014,J.add(Q);const ue=[[0,0],[.03,0],[.034,.002],[.035,.007],[.042,.012],[.055,.028],[.066,.05],[.074,.072],[.078,.088],[.079,.094]],Ue=[[.0755,.0945],[.0745,.088],[.07,.07],[.06,.045],[.045,.022],[.025,.013],[0,.012]],Fe=_([...ue,[.0785,.0962],[.077,.0964],...Ue],e.ceramic,128,0,0,0,Q),Ke=_([[.029,-5e-4],[.035,-5e-4],[.035,.003],[.029,.003]],e.clay,64,0,0,0,Q);Ke.castShadow=!1;const re=new yr(.0715,96);re.rotateX(-Math.PI/2);const ye=d(re,e.coffee,0,.079,0,Q);ye.castShadow=!1;const oe=new pr([new V(.066,.074,0),new V(.098,.081,0),new V(.115,.06,0),new V(.106,.035,0),new V(.08,.026,0),new V(.058,.03,0)]),ve=d(new Bs(oe,48,.0085,16,!1),e.ceramic,0,0,0,Q);ve.scale.z=1.25,Q.rotation.y=.5;const me=h({color:"#d9d6cf",metalness:1,roughness:.2}),Ae=new hn;Ae.position.set(.058,.022,.062),Ae.rotation.set(0,-.95,0),J.add(Ae);const qe=d(new ba(.015,32,12,0,Math.PI*2,Math.PI*.6,Math.PI*.4),me,0,.012,0,Ae);qe.scale.set(1,.5,1.5),qe.castShadow=!1;const de=b([new V(0,.006,.021),new V(0,.009,.045),new V(0,.015,.075),new V(0,.017,.098)],.0028,me,Ae,20);de.scale.x=1.6,de.castShadow=!1;for(const Ce of[Fe,ve,ee])Ce.userData.interaction="cup",n.push(Ce);const Ee=h({color:"#f1ece2",roughness:.85,sheen:.5,sheenColor:new tt("#ffffff")});for(const[Ce,be,ct]of[[-.135,.055,.3],[-.118,.085,-.5]]){const dt=d(new lr(.017,.016,.017,2,.003),Ee,Ce,.008,be,J);dt.rotation.y=ct}const Te=d(new lr(.11,.006,.022,2,.0025),h({color:"#b98d5a",roughness:.9}),-.16,.003,-.03,J);Te.rotation.y=1.1;const Ne=h({color:"#e7dfcd",roughness:.92,sheen:.3,sheenColor:new tt("#ffffff")});Qi(Ne,{key:"cafe-notebook-ink",objectSpace:!0,color:`
vec2 nbP = vSurface.xy;
float nbPage = floor(vSurfaceWorld.x * 7.0 + vSurfaceWorld.z * 7.0);
float nbRow = floor((nbP.y + 0.1) / 0.0105);
float nbF = fract((nbP.y + 0.1) / 0.0105);
float nbArea = step(-0.066, nbP.x) * step(nbP.x, 0.068) * step(-0.092, nbP.y) * step(nbP.y, 0.088);
float nbRule = (1.0 - smoothstep(0.0, 0.07, abs(nbF - 0.06))) * nbArea;
float nbEnd = 0.068 - 0.08 * bwHash1(vec3(nbRow, nbPage, 4.0)) * step(0.55, bwHash1(vec3(nbRow, nbPage, 8.0)));
float nbRows = mix(18.0, 9.0, step(0.5, bwHash1(vec3(nbPage, 1.0, 2.0))));
float nbWord = step(0.3, bwValue(vec3(nbP.x * 75.0, nbRow * 3.1 + nbPage, 2.0)));
float nbBase = 0.42 + 0.16 * sin(nbP.x * 2100.0 + nbRow * 7.0) + 0.08 * sin(nbP.x * 640.0 + nbRow * 3.0 + nbPage);
float nbInk = (1.0 - smoothstep(0.1, 0.2, abs(nbF - nbBase))) * nbWord * step(nbP.x, nbEnd) * step(nbRow, nbRows) * nbArea;
float nbSharp = bwResolve(length(fwidth(nbP)) / 0.0016);
vec3 nbColor = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.72, 0.8, 0.95), nbRule * 0.45);
diffuseColor.rgb = mix(nbColor, vec3(0.1, 0.12, 0.22), nbInk * mix(0.3, 0.92, nbSharp));`});const Oe=new hn;r.add(Oe),g(0,.006,0,.34,.012,.24,u("#2f3b3a",.7),.004,Oe);for(const Ce of[-1,1]){const be=new ei(.162,.225,24,4),ct=be.getAttribute("position");for(let gt=0;gt<ct.count;gt++){const Gt=ct.getX(gt)*Ce;ct.setZ(gt,.012*Math.sin(Math.min(1,(Gt+.081)/.162)*Math.PI*.5)*(1-Math.pow((Gt+.081)/.162,3)*.5))}be.computeVertexNormals();const dt=d(be,Ne,Ce*.083,.0145,0,Oe);dt.rotation.x=-Math.PI/2,dt.castShadow=!1}const at=d(new es(.0042,.0042,.17,6),u("#a3713d",.55),.1,.019,.07,Oe);at.rotation.set(0,0,Math.PI/2),at.rotation.y=.4;const Be=new hn;r.add(Be),_([[0,0],[.082,0],[.088,.004],[.086,.012],[.07,.018],[.05,.026],[.034,.036],[.022,.05],[.016,.064],[.013,.07],[0,.07]],e.brass,96,0,0,0,Be);const pt=v(0,.2,0,.0075,.0085,.27,e.brass,Be,24);pt.castShadow=!1;const rt=d(new ur(.0095,.003,10,32),e.brass,0,.19,0,Be);rt.rotation.x=Math.PI/2,rt.castShadow=!1;const Z=v(0,.352,0,.016,.018,.045,h({color:"#5a4a35",metalness:1,roughness:.4}),Be,32);Z.castShadow=!1;const mt=new hi({color:A("#ffd2a0",30)});a.push(mt);const Mt=x(0,.392,0,.026,mt,Be);Mt.castShadow=!1;const I=.2,w=.31,te=new fr([new Pe(.165,0),new Pe(.15,.05),new Pe(.133,.1),new Pe(.117,.15),new Pe(.1,I)],240),ce=te.getAttribute("position");for(let Ce=0;Ce<ce.count;Ce++){const be=ce.getX(Ce),ct=ce.getZ(Ce),dt=Math.atan2(ct,be),gt=1+.012*Math.abs(Math.sin(dt*24));ce.setX(Ce,be*gt),ce.setZ(Ce,ct*gt)}te.computeVertexNormals();const _e=new wa({color:"#e7d6b6",roughness:.9,side:di,emissive:"#ffb366",emissiveIntensity:1.6,sheen:.4,sheenColor:new tt("#fff2dc")});Qi(_e,{key:"cafe-lamp-shade",objectSpace:!0,color:`
float shA = atan(vSurface.z, vSurface.x);
float shPleat = abs(sin(shA * 24.0));
float shY = clamp(vSurface.y / ${I.toFixed(3)}, 0.0, 1.0);
float shWeave = bwNoise(vec3(shA * 300.0, vSurface.y * 900.0, 1.0)) * bwResolve(length(fwidth(vSurface)) * 900.0);
diffuseColor.rgb *= 0.9 + 0.1 * shPleat + 0.05 * shWeave;`,emissive:`
float shInside = gl_FrontFacing ? 1.0 : 2.0;
totalEmissiveRadiance *= shInside * (0.55 + 0.75 * (1.0 - shY)) * (0.85 + 0.3 * shPleat) * (0.94 + 0.12 * shWeave);`}),a.push(_e);const ze=d(te,_e,0,w,0,Be);for(const[Ce,be]of[[w,.168],[w+I,.102]]){const ct=d(new ur(be,.0028,8,96),e.brass,0,Ce,0,Be);ct.rotation.x=Math.PI/2,ct.castShadow=!1}for(let Ce=0;Ce<3;Ce++){const be=Ce/3*Math.PI*2,ct=b([new V(0,.412,0),new V(Math.cos(be)*.1,w+I,Math.sin(be)*.1)],.0016,e.brass,Be,4);ct.castShadow=!1}ze.userData.interaction="lamp",n.push(ze);const Ve="#ffc58a",ge=new Pd(Ve,5.2,0,1.12,.75,2);ge.castShadow=!0,ge.shadow.radius=3.5,ge.shadow.bias=-6e-4,ge.shadow.normalBias=.012,ge.shadow.camera.near=.05,ge.shadow.camera.far=6,r.add(ge,ge.target);const Se=new Pu("#ffb978",.9,4,2);r.add(Se);const Ie=new Pu("#ffa062",.35,1.6,2);r.add(Ie);const Je={time:{value:0},pulse:{value:0},light:{value:new tt(1.4,.9,.5)},ambient:{value:new tt(.03,.03,.035)}},Ze=new ai({transparent:!0,depthWrite:!1,premultipliedAlpha:!0,side:di,uniforms:{...Je,seed:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; vec4 centre = modelViewMatrix * vec4(0.0, position.y, 0.0, 1.0); centre.x += position.x; gl_Position = projectionMatrix * centre; }",fragmentShader:`${vy}
uniform float time; uniform float pulse; uniform float seed; uniform vec3 light; uniform vec3 ambient;
varying vec2 vUv;
void main(){
  float y = vUv.y;
  float t = time * 0.32;
  float sway = (0.08 * sin(y * 3.4 - time * 0.45 + seed) + 0.04 * sin(y * 7.0 - time * 0.8 + seed * 2.0)) * y;
  float x = (vUv.x - 0.5 - sway) / (0.05 + 0.26 * y);
  vec3 q = vec3(x * 0.9, y * 3.2 - t, seed + time * 0.04);
  vec3 warp = vec3(bwNoise(q * 1.4 + vec3(0.0, 0.0, 1.7)), bwNoise(q * 1.4 + vec3(5.2, 1.3, 2.8)), 0.0);
  float n = bwFbm3(q * vec3(1.8, 1.2, 1.0) + warp * 1.1);
  float column = exp(-x * x * 2.2);
  float wisps = smoothstep(0.0, 0.5, n * 0.9 + column * 0.6 - 0.32);
  float density = wisps * column * smoothstep(0.0, 0.08, y) * (1.0 - smoothstep(0.25, 0.8, y));
  density *= 0.17 * (1.0 + pulse * 0.6);
  vec3 c = ambient + light * (0.7 + 0.5 * n);
  gl_FragColor = vec4(c * density, density);
}`});a.push(Ze);const Xe=new hn;r.add(Xe);for(let Ce=0;Ce<3;Ce++){const be=Ce?Ze.clone():Ze;Ce&&(be.uniforms={...Je,seed:{value:Ce*3.7}},a.push(be));const ct=d(new ei(.2,.36,1,1),be,(Ce-1)*.012,.19,(Ce-1)*.01,Xe);ct.castShadow=!1,ct.receiveShadow=!1,ct.renderOrder=2+Ce}g(3.9,.53,-7.45,5.2,1.06,.9,e.darkWoodV,.012),g(3.9,1.085,-7.42,5.4,.05,1.02,e.oak,.012);const ft=h({color:"#6e2219",roughness:.32,clearcoat:1,clearcoatRoughness:.08}),nt=new hn;nt.position.set(2.85,1.11,-7.55),r.add(nt),g(0,.035,.02,.86,.07,.56,e.chrome,.02,nt),g(0,.29,-.02,.8,.44,.48,ft,.05,nt),g(0,.2,.225,.8,.08,.04,e.chrome,.015,nt),g(0,.525,-.02,.82,.03,.5,e.chrome,.012,nt);for(const Ce of[-.25,.21]){const be=v(0,.575,Ce,.007,.007,.8,e.chrome,nt,10);be.rotation.z=Math.PI/2,be.castShadow=!1}for(const Ce of[-.2,.2])v(Ce,.15,.27,.042,.036,.07,e.chrome,nt,32),v(Ce,.105,.29,.038,.033,.035,e.chrome,nt,32),b([new V(Ce,.105,.31),new V(Ce,.1,.4),new V(Ce,.095,.5)],.013,e.darkWood,nt,8);for(const[Ce,be]of[[-.26,.02],[-.12,-.04],[.04,.03],[.2,-.05],[.3,.06]])_([[0,0],[.028,0],[.034,.05],[.036,.066],[0,.066]],e.ceramic,24,Ce,.54,be,nt).castShadow=!1;b([new V(.4,.36,.12),new V(.45,.33,.2),new V(.46,.2,.24),new V(.45,.1,.24)],.006,e.chrome,nt,16).castShadow=!1;const xt=v(0,.4,.225,.055,.055,.012,h({color:"#efe6d2",roughness:.3,clearcoat:1,clearcoatRoughness:.05}),nt,32);xt.rotation.x=Math.PI/2,xt.castShadow=!1;const $=d(new ur(.056,.006,8,32),e.brass,0,.4,.232,nt);$.castShadow=!1;const Ge=new hi({color:A("#ffae5c",14)});a.push(Ge),x(.3,.4,.225,.009,Ge,nt).castShadow=!1,_([[0,0],[.09,0],[.095,.02],[.07,.05],[.065,.26],[.075,.3],[0,.3]],e.chrome,48,3.55,1.11,-7.6),_([[.03,0],[.05,.01],[.1,.16],[.1,.18],[0,.18]],h({color:"#3b2a1f",roughness:.15,transmission:0,opacity:.9,transparent:!0}),48,3.55,1.41,-7.6);const Me=new ni({color:"#1d2420",roughness:.95,emissive:"#fff1dc",emissiveIntensity:0});Qi(Me,{key:"cafe-chalk-menu",objectSpace:!0,color:`
vec2 chP = vSurface.xy;
float chRow = floor((chP.y + 0.33) / 0.062);
float chF = fract((chP.y + 0.33) / 0.062);
float chCol = step(0.0, chP.x);
float chArea = step(-0.5, chP.x) * step(chP.x, 0.5) * step(-0.3, chP.y) * step(chP.y, 0.22);
float chEnd = mix(-0.08, 0.42, chCol) - 0.18 * bwHash1(vec3(chRow, chCol, 3.0));
float chStart = mix(-0.46, 0.04, chCol);
float chWord = step(0.28, bwValue(vec3(chP.x * 22.0, chRow * 2.7 + chCol * 5.0, 1.0)));
float chBase = 0.45 + 0.1 * sin(chP.x * 260.0 + chRow * 5.0);
float chalk = (1.0 - smoothstep(0.08, 0.2, abs(chF - chBase))) * chWord * step(chStart, chP.x) * step(chP.x, chEnd) * chArea;
float chTitle = (1.0 - smoothstep(0.0, 0.025, abs(chP.y - 0.27))) * step(abs(chP.x), 0.22) * step(0.25, bwValue(vec3(chP.x * 14.0, 9.0, 1.0)));
float chDust = 0.04 * smoothstep(0.3, 0.9, bwFbm3(vec3(chP * 6.0, 2.0)));
diffuseColor.rgb = mix(diffuseColor.rgb + chDust, vec3(0.86, 0.84, 0.78), clamp(chalk + chTitle, 0.0, 1.0) * 0.85);`,emissive:"totalEmissiveRadiance += diffuseColor.rgb * (0.12 + 0.55 * smoothstep(-0.45, 0.33, chP.y)) * vec3(1.0, 0.9, 0.76);"}),a.push(Me);const He=new hn;He.position.set(3.25,3.28,-8.86),r.add(He),g(0,0,0,1.16,.76,.04,e.darkWood,.01,He),d(new ei(1.06,.66),Me,0,0,.022,He).castShadow=!1;const Qe=new hi({color:A("#ffd9a8",9)});a.push(Qe),v(0,.44,.12,.018,.018,.5,e.brass,He,16).rotation.z=Math.PI/2;const Le=d(new ti(.46,.006,.02),Qe,0,.425,.12,He);Le.castShadow=!1;const lt=new Pd("#ffcf98",22,0,.78,.85,2);lt.position.set(3.3,3.98,-7.7),lt.target.position.set(3.3,2.5,-8.95),r.add(lt,lt.target);const it=LA(e);it.group.position.z=-.1,r.add(it.group),a.push(...it.materials),o.push(...it.textures);const Qt=h({color:"#1f2a26",roughness:.35,metalness:.6,clearcoat:.6,clearcoatRoughness:.2}),Pt=new ni({color:"#f1e6d2",roughness:.6,emissive:"#ffc690",emissiveIntensity:1.4,side:Gn});a.push(Pt);const Vn=new hi({color:A("#ffd5a4",36)});a.push(Vn);const kn=[],ss=[],Aa=(Ce,be,ct,dt,gt)=>{b([new V(Ce,4.07,be),new V(Ce,ct+.2,be)],.004,e.darkWood,r,4).castShadow=!1,v(Ce,4.05,be,.05,.05,.03,e.brass,r,24);const Gt=[[.255,0],[.24,.02],[.15,.1],[.08,.19],[.05,.23],[.02,.24]];_(Gt,Qt,64,Ce,ct-.02,be).castShadow=!0,_(Gt.map(([Y,le])=>[Y*.97,le-.006]),Pt,64,Ce,ct-.02,be).castShadow=!1;const Xt=x(Ce,ct+.04,be,.04,Vn);Xt.castShadow=!1;const R=new Pd("#ffc98e",gt,0,.78,.85,2);R.position.set(Ce,ct+.02,be),R.target.position.set(Ce,0,be),dt&&(R.castShadow=!0,R.shadow.radius=6,R.shadow.bias=-8e-4,R.shadow.normalBias=.02,R.shadow.camera.near=.1,R.shadow.camera.far=6),r.add(R,R.target),kn.push(R),ss.push(new V(Ce,ct+.04,be))};Aa(1.6,-4,2.08,!0,17),Aa(3,-5.55,2.12,!0,15),Aa(2.95,-7.15,2.45,!1,6);const si={coatA:h({color:"#2c3438",roughness:.92,sheen:.6,sheenColor:new tt("#6d7a80")}),coatB:h({color:"#5b4436",roughness:.95,sheen:.7,sheenColor:new tt("#a08670")}),knit:h({color:"#8c8170",roughness:.97,sheen:.8,sheenColor:new tt("#d2c6b1")}),skin:h({color:"#9a7a62",roughness:.6,sheen:.3,sheenColor:new tt("#e0a88a")}),hair:h({color:"#1d1714",roughness:.55,sheen:.5,sheenColor:new tt("#5a4a3c")})},la=(Ce,be,ct)=>{const dt=new hn;dt.position.set(Ce,0,be),dt.rotation.y=ct,r.add(dt),g(0,.45,0,.44,.06,.42,e.velvet,.02,dt),g(0,.78,.2,.44,.5,.04,e.darkWoodV,.012,dt);for(const gt of[-.19,.19])for(const Gt of[-.17,.17])_([[0,0],[.016,0],[.019,.4],[.013,.42],[0,.42]],e.darkWoodV,12,gt,0,Gt,dt);return dt},Mi=(Ce,be,ct,dt,gt)=>{const Gt=la(Ce,be,ct),Xt=new hn;Xt.position.y=.48,Gt.add(Xt);const R=dt?si.coatB:si.coatA,Y=new hn;Y.rotation.x=-.12,Xt.add(Y);const le=new fr([[0,0],[.16,0],[.175,.06],[.165,.2],[.17,.32],[.19,.4],[.18,.45],[.12,.5],[.06,.52],[0,.52]].map(([We,yt])=>new Pe(We,yt)),48);le.scale(1,1,.62),d(le,R,0,0,0,Y);const ae=d(new ur(.065,.028,12,32),dt?si.knit:R,0,.51,0,Y);ae.rotation.x=Math.PI/2,ae.scale.set(1,.8,1);const se=v(0,.55,-.01,.04,.045,.08,si.skin,Y,24);se.castShadow=!1;const ke=new hn;ke.position.set(0,.64,-.015),Y.add(ke),x(0,0,0,.095,si.skin,ke).scale.set(.84,1.06,.96);const Ye=d(new ba(.101,32,20,0,Math.PI*2,0,Math.PI*(dt?.7:.55)),si.hair,0,.008,.012,ke);Ye.scale.set(.86,1.05,.98),Ye.rotation.x=-.35,dt&&x(0,.06,.07,.042,si.hair,ke).scale.set(1,.9,.9),x(0,-.02,-.085,.014,si.skin,ke);for(const We of[-1,1])b([new V(We*.16,.42,0),new V(We*.2,.28,-.06),new V(We*.16,.2,-.2),new V(We*.08,.23,-.34)],.045,R,Y,20),x(We*.06,.235,-.36,.032,si.skin,Y).scale.set(1,.6,1.3);const et=.05+.04*dt;return c.push(We=>{const yt=Math.sin(We*(1.05+.1*dt)+gt);Y.scale.set(1+yt*.006,1+yt*.01,1+yt*.008),ke.rotation.y=.22*Math.sin(We*.045+gt)+.06*Math.sin(We*.13+gt*2),ke.rotation.x=et+.05*Math.sin(We*.07+gt*1.7)}),Gt},gn=(Ce,be)=>{_([[0,0],[.2,0],[.21,.02],[.06,.05],[.03,.1],[.028,.68],[.06,.71],[0,.71]],e.darkWoodV,32,Ce,0,be);const ct=new es(.42,.42,.035,64),dt=d(ct,e.oak,Ce,.728,be);dt.castShadow=!0;const gt=d(new ei(1.8,1.8),W,Ce,.004,be);gt.rotation.x=-Math.PI/2,gt.castShadow=!1};gn(1.6,-4),Mi(2.18,-3.95,Math.PI/2+.18,0,0),la(1.03,-4.05,-Math.PI/2-.1),_([[0,0],[.03,0],[.04,.07],[.036,.08],[0,.08]],e.ceramic,32,1.53,.746,-3.95),g(1.77,.75,-4.07,.2,.012,.26,Ne,.003),gn(3,-5.55),Mi(3.55,-5.8,Math.PI/2+.55,1,2.3),la(2.5,-5.4,-Math.PI/2+.25),_([[0,0],[.03,0],[.04,.07],[.036,.08],[0,.08]],e.ceramic,32,2.91,.746,-5.53);const Ln=_x(new lr(1,.2,4,4,.05));d(Ln,e.velvet,-3.85,.55,1.6);const Qn=_x(new lr(.18,.9,4,4,.06));d(Qn,e.velvet,-4.4,1.05,1.6),g(-3.9,.23,1.6,1.1,.46,4.05,e.darkWoodV,.01);for(const[Ce,be,ct]of[[3.25,-7.2,.9],[4.6,-3.6,1.1],[6.6,-7.9,1.3],[-1.05,-1.22,.55]]){const dt=UA({...e,darkWood:e.soil},ct);dt.position.set(Ce,Ce<0?sa:0,be),r.add(dt)}const Fi=PA(e);r.add(Fi.group),a.push(...Fi.materials),o.push(...Fi.textures);const Sr=e.pavement.userData.rainTime,Ra=new t2("#7f9fc4",.05);Ra.position.set(-3,3.5,-6),r.add(Ra,Ra.target),Ra.target.position.set(0,.8,0);const ca=new Pu("#ffb070",2.4,6,2);ca.position.set(1.4,1.9,2.6),r.add(ca);const ua=[ge,...kn.filter(Ce=>Ce.castShadow)],fa=Ce=>{const be=yy(Ce);J.position.copy(be.cup),Xe.position.set(be.cup.x,sa+.1,be.cup.z),k.position.set(be.cup.x,sa+.001,be.cup.z),Be.position.copy(be.lamp),Be.scale.setScalar(be.lampScale),ne.position.set(be.lamp.x,sa+.001,be.lamp.z),Oe.position.copy(be.book),Oe.rotation.y=-.3-.25*Ce;const ct=be.lamp.y+.392*be.lampScale;return ge.position.set(be.lamp.x,ct,be.lamp.z),ge.target.position.set(be.cup.x*.55+be.lamp.x*.45,sa,be.cup.z*.6+be.lamp.z*.4),Se.position.set(be.lamp.x,ct+.06,be.lamp.z),Ie.position.set(be.cup.x-.05,sa+.05,be.cup.z+.26),be};return{scene:r,m:e,cup:J,saucer:ee,steam:Xe,lamp:Be,key:ge,cupContact:k,lampContact:ne,lampLight:Se,bounce:Ie,shadeMat:_e,bulbMaterial:mt,steamUniforms:Je,interactables:n,glass:{...yx},exterior:Fi,pendantPositions:ss,pendantLights:kn,shadowCasters:ua,arrange:fa,update(Ce){Sr.value=Ce;for(const be of c)be(Ce)},dispose(){const Ce=new Set;r.traverse(be=>{be instanceof rn&&Ce.add(be.geometry),be instanceof Yx&&be.dispose()}),Ce.forEach(be=>be.dispose()),a.forEach(be=>be.dispose()),o.forEach(be=>be.dispose()),r.traverse(be=>{var ct;be instanceof Xu&&"shadow"in be&&((ct=be.shadow)==null||ct.dispose())}),e.dispose()}}}const Ol=6,zA=`
uniform mat4 uInverseProjection;
uniform mat4 uCameraWorld;
vec3 cafeWorldAt(vec2 uv, float depth) {
  vec4 clip = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec4 view = uInverseProjection * clip;
  view /= view.w;
  return (uCameraWorld * view).xyz;
}
`,FA=`
${Ao}
${zA}
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform vec2 uSourceSize;
uniform float uGlassZ;
uniform float uFocus;
uniform float uMaxRadius;
uniform vec3 uHaze;
uniform float uHazeDensity;
uniform float uHighlightBoost;
uniform float uTime;
uniform vec4 uLamps[${Ol}];
uniform vec3 uLampColors[${Ol}];
uniform float uHalo;
uniform mat4 uViewProjection;
uniform float uWet;
varying vec2 vUv;
const int TAPS = 28;
bool cafeOutside(vec3 p, float depth) { return depth >= 0.99999 || p.z < uGlassZ - 0.015; }
float cafeHash(vec2 p) { p = fract(p * vec2(127.1, 311.7)); p += dot(p, p + 19.19); return fract(p.x * p.y); }
float cafeValue(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(cafeHash(i), cafeHash(i + vec2(1, 0)), f.x), mix(cafeHash(i + vec2(0, 1)), cafeHash(i + vec2(1, 1)), f.x), f.y);
}
// Wet street: the paving is the plane y = 0, so it mirrors the street through
// that plane. The mirrored eye ray is walked to the facade it meets with a few
// fixed-point steps on the refraction depth, then the image there is read from
// a soft mip and stretched vertically, as rain-roughened water stretches every
// shop light into a streak. Returns radiance before Fresnel and wetness.
vec3 cafeStreetMirror(vec3 eye, vec3 ray, out float valid, out vec3 street) {
  street = eye + ray * (-eye.y / ray.y);
  vec3 rd = vec3(ray.x, -ray.y, ray.z);
  float tr = 14.0;
  vec2 ruv = vUv;
  float dq = 1.0;
  vec3 q = street;
  for (int k = 0; k < 3; k++) {
    vec4 clip = uViewProjection * vec4(street + rd * tr, 1.0);
    ruv = clip.xy / clip.w * 0.5 + 0.5;
    dq = texture2D(tDepth, clamp(ruv, vec2(0.0), vec2(1.0))).x;
    q = cafeWorldAt(ruv, dq);
    tr = dq >= 0.99999 ? 60.0 : clamp((q.z - street.z) / min(rd.z, -1e-3), 0.3, 60.0);
  }
  // Only what lies outside can be mirrored; the frame edge fades the image out.
  valid = (cafeOutside(q, dq) ? 1.0 : 0.0) * smoothstep(0.0, 0.03, ruv.x) * smoothstep(1.0, 0.97, ruv.x) * smoothstep(1.0, 0.92, ruv.y) * step(0.0, ruv.y);
  float ripple = (cafeValue(street.xz * vec2(3.0, 0.7) + uTime * vec2(0.0, 0.9)) - 0.5) * 0.004;
  vec3 mirrored = vec3(0.0);
  for (int k = 0; k < 5; k++) {
    vec2 o = vec2(ripple, (float(k) - 2.0) * 7.0 / uSourceSize.y);
    mirrored += textureLod(tColor, clamp(ruv + o, vec2(0.001), vec2(0.999)), 2.0).rgb;
  }
  mirrored *= 0.2;
  // Air between the paving and what it mirrors.
  float travel = tr + max(length(street - eye) - (uGlassZ - eye.z) / min(ray.z, -1e-3), 0.0);
  return mix(mirrored, uHaze, (1.0 - exp(-uHazeDensity * travel)) * (dq >= 0.99999 ? 0.0 : 1.0));
}
float cafeCoc(float dist) { return clamp(1.0 - uFocus / max(dist, 1e-3), 0.0, 1.0); }
void main() {
  vec3 eye = uCameraWorld[3].xyz;
  float d0 = texture2D(tDepth, vUv).x;
  vec3 p0 = cafeWorldAt(vUv, d0);
  bool out0 = cafeOutside(p0, d0);
  vec3 ray = normalize(p0 - eye);
  float far0 = d0 >= 0.99999 ? 80.0 : length(p0 - eye);
  // Interior pixels hide the street; use the widest blur so the glass beside them stays soft.
  float radius = out0 ? max(cafeCoc(far0) * uMaxRadius, 1.0) : uMaxRadius;
  float glassT = (uGlassZ - eye.z) / min(ray.z, -1e-3);
  float spin = bwIgn(gl_FragCoord.xy) * 6.2831853;
  // Read a pre-filtered mip matched to the tap spacing, so a bulb of one or two
  // pixels still spreads into a smooth disc instead of a speckle.
  float lod = clamp(log2(radius * 1.25 / sqrt(float(TAPS))), 0.0, 4.0);
  vec3 sum = vec3(0.0);
  float weight = 0.0;
  float streetWeight = 0.0;
  for (int i = 0; i < TAPS; i++) {
    float t = (float(i) + 0.5) / float(TAPS);
    float a = spin + float(i) * 2.3999632;
    float r = sqrt(t) * radius;
    vec2 uv = vUv + vec2(cos(a), sin(a)) * r / uSourceSize;
    float d = texture2D(tDepth, uv).x;
    vec3 p = cafeWorldAt(uv, d);
    if (!cafeOutside(p, d)) continue;
    float dist = d >= 0.99999 ? 80.0 : length(p - eye);
    // Scatter-as-gather: a tap only spreads as far as its own blur circle.
    float reach = cafeCoc(dist) * uMaxRadius + 1.5;
    float w = clamp(reach - r + 1.0, 0.0, 1.0);
    vec3 c = textureLod(tColor, uv, lod).rgb;
    // Aerial haze on the stretch beyond the glass, thinning with height.
    float travel = max(dist - glassT, 0.0);
    float haze = (1.0 - exp(-uHazeDensity * travel)) * mix(1.0, 0.75, smoothstep(2.0, 14.0, p.y));
    c = mix(c, uHaze, d >= 0.99999 || dist > 55.0 ? 0.0 : haze);
    // Bright sources dominate a real lens's defocus; favour them slightly.
    w *= 1.0 + uHighlightBoost * smoothstep(0.35, 2.0, bwLuma(c));
    sum += c * w;
    weight += w;
    streetWeight += w * step(p.y, 0.16) * step(dist, 55.0);
  }
  vec3 color = weight > 1e-4 ? sum / weight : uHaze;
  // The share of this disc that is paving receives the mirrored street.
  float street = weight > 1e-4 ? streetWeight / weight : 0.0;
  if (street > 0.002 && ray.y < -0.004 && uWet > 0.0) {
    float valid; vec3 s;
    vec3 mirrored = cafeStreetMirror(eye, ray, valid, s);
    // Water Fresnel (Schlick, n = 1.33) at the grazing street angle; puddles mirror more.
    float fresnel = 0.02 + 0.98 * pow(1.0 - clamp(-ray.y, 0.0, 1.0), 5.0);
    float puddle = smoothstep(0.3, 0.75, cafeValue(s.xz * 0.45) * 0.7 + cafeValue(s.xz * 1.9 + 7.0) * 0.3);
    color += mirrored * fresnel * mix(0.4, 1.0, puddle) * uWet * valid * street;
  }
  // Closed-form single scattering from each lamp along the ray beyond the glass:
  // integral of 1 / (h^2 + (t - b)^2) dt = (atan((t1 - b) / h) - atan((t0 - b) / h)) / h.
  float t0 = glassT, t1 = out0 ? far0 : glassT + 25.0;
  vec3 halo = vec3(0.0);
  for (int i = 0; i < ${Ol}; i++) {
    vec4 lamp = uLamps[i];
    if (lamp.w <= 0.0) continue;
    vec3 rel = lamp.xyz - eye;
    float b = dot(rel, ray);
    float h = sqrt(max(dot(rel, rel) - b * b, 0.0)) + 0.06;
    float integral = (atan((t1 - b) / h) - atan((t0 - b) / h)) / h;
    // Falling rain is lit where it crosses the light: soft, slow vertical streaks.
    vec3 hit = eye + ray * clamp(b, t0, t1);
    float streak = 0.75 + 0.5 * smoothstep(0.55, 0.95, fract(hit.x * 23.0 + 0.37 * sin(hit.x * 3.1)) * fract(hit.y * 0.9 + uTime * 0.55 + hit.x * 7.0));
    halo += uLampColors[i] * lamp.w * integral * streak;
  }
  gl_FragColor = vec4(color + halo * uHalo, 1.0);
}
`;function BA(r){const e=Array.from({length:Ol},(a,o)=>{const c=r.lamps[o];return c?new Jt(c.position.x,c.position.y,c.position.z,c.strength):new Jt(0,0,0,0)}),n=Array.from({length:Ol},(a,o)=>{var c;return((c=r.lamps[o])==null?void 0:c.color.clone())??new tt(0,0,0)});return new ai({name:"CafeExteriorBokeh",vertexShader:s0,fragmentShader:FA,depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{tColor:{value:null},tDepth:{value:null},uInverseProjection:{value:new Ft},uCameraWorld:{value:new Ft},uSourceSize:{value:new Pe(1,1)},uGlassZ:{value:r.glassZ},uFocus:{value:3.4},uMaxRadius:{value:20},uHaze:{value:new tt(.026,.04,.075)},uHazeDensity:{value:.035},uHighlightBoost:{value:.35},uTime:{value:0},uLamps:{value:e},uLampColors:{value:n},uHalo:{value:1},uViewProjection:{value:new Ft},uWet:{value:1}}})}const IA=`
uniform mat4 textureMatrix;
varying vec2 vUv;
varying vec4 vReflect;
varying vec3 vWorld;
void main() {
  vUv = uv;
  vReflect = textureMatrix * vec4(position, 1.0);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,HA=`
uniform vec3 color;
uniform sampler2D tDiffuse;
uniform sampler2D tSharp;
uniform sampler2D tSharpDepth;
uniform sampler2D tBokeh;
uniform vec2 resolution;
uniform vec2 glassSize;
uniform vec2 wipe;
uniform float wipeAge;
uniform float time;
uniform vec3 lampPosition;
uniform vec3 lampGlow;
uniform vec3 roomGlow;
uniform float reflectionStrength;
varying vec2 vUv;
varying vec4 vReflect;
varying vec3 vWorld;

float cgHash(vec2 p) { p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
vec2 cgHash2(vec2 p) { float n = cgHash(p); return vec2(n, cgHash(p + n + 17.1)); }
float cgValue(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(cgHash(i), cgHash(i + vec2(1, 0)), f.x), mix(cgHash(i + vec2(0, 1)), cgHash(i + vec2(1, 1)), f.x), f.y);
}

// One sparse layer of resting drops. xy: lens slope (cap normal), z: coverage, w: rim.
vec4 cgBeads(vec2 p, float cell, float rMin, float rMax, float density, float seed) {
  vec2 g = p / cell, id = floor(g), f = fract(g) - 0.5;
  float h = cgHash(id + seed);
  if (h > density) return vec4(0.0);
  float r = mix(rMin, rMax, pow(cgHash(id * 1.31 + seed + 4.7), 2.2)) / cell;
  // Rain keeps arriving: each bead lands on its own slow cycle and slowly shrinks
  // as it spreads and evaporates. Periods of half a minute or more, never in step.
  if (seed > 2.0) {
    float life = fract(time * (0.018 + 0.02 * cgHash(id + seed + 2.0)) + cgHash(id + seed + 5.0));
    r *= smoothstep(0.0, 0.02, life) * (1.0 - 0.4 * life);
    if (r <= 0.0) return vec4(0.0);
  }
  vec2 centre = (cgHash2(id * 1.73 + seed) - 0.5) * (1.0 - 2.0 * r);
  vec2 d = f - centre;
  // Gravity flattens the crown and gathers water at the foot of each bead.
  d.y *= d.y > 0.0 ? 1.18 : 0.94;
  float q = length(d) / r;
  if (q >= 1.0) return vec4(0.0);
  float cover = 1.0 - smoothstep(0.82, 1.0, q);
  vec2 slope = d / r / sqrt(max(1.0 - q * q, 0.08));
  return vec4(slope, cover, smoothstep(0.6, 0.95, q) * cover);
}

// Slow runners: one drop per column segment, sliding in a stick-slip rhythm,
// trailing a narrowing wet path with beads left behind. z: drop, w: trail.
vec4 cgRunners(vec2 p, float column, float seed) {
  float col = floor(p.x / column);
  float hc = cgHash(vec2(col, seed));
  if (hc > 0.42) return vec4(0.0);
  float speed = 0.012 + 0.02 * cgHash(vec2(col, seed + 3.0));
  float phase = hc * 61.0;
  float tt = time * 0.85 + phase;
  float travel = speed * tt + 0.011 * sin(tt * 0.9 + hc * 9.0) + 0.006 * sin(tt * 2.3 + hc * 4.0);
  float period = 0.7 + 1.1 * cgHash(vec2(col, seed + 7.0));
  float s = (p.y + travel) / period;
  float seg = floor(s);
  float hs = cgHash(vec2(col, seg + seed * 3.1));
  if (hs > 0.6) return vec4(0.0);
  float wander = 0.004 * sin(p.y * 31.0 + hc * 12.0) + 0.0025 * sin(p.y * 77.0 + hs * 5.0);
  float x0 = (col + 0.5 + (hc - 0.5) * 0.5) * column + wander;
  float dy = (fract(s) - 0.5) * period;
  float r = 0.0062 + 0.0045 * hs;
  vec2 d = vec2(p.x - x0, dy * (dy < 0.0 ? 0.78 : 1.12));
  float q = length(d) / r;
  float drop = 1.0 - smoothstep(0.82, 1.0, q);
  vec2 slope = drop > 0.0 ? d / r / sqrt(max(1.0 - q * q, 0.08)) : vec2(0.0);
  float len = 0.12 + 0.35 * hs;
  float above = dy / len;
  float width = r * 0.32 * (1.0 - above);
  float trail = above > 0.04 && above < 1.0 ? (1.0 - smoothstep(width * 0.5, width, abs(p.x - x0))) : 0.0;
  // Beads stranded along the trail, shrinking with age.
  float bead = 0.0;
  if (above > 0.0 && above < 1.0) {
    float k = dy / 0.016;
    vec2 bd = vec2(p.x - x0 - 0.0015 * sin(floor(k) * 5.0), (fract(k) - 0.5) * 0.016);
    float br = r * 0.42 * (1.0 - above) * step(0.35, cgHash(vec2(col, floor(k) + seg)));
    float bq = length(bd) / max(br, 1e-4);
    float cover = 1.0 - smoothstep(0.75, 1.0, bq);
    if (cover > 0.0 && br > 1e-4) { slope += bd / br * 0.8 * cover; bead = cover; }
  }
  return vec4(slope, max(drop, bead), trail * (1.0 - drop));
}

vec3 cgBokeh(vec2 uv) { return texture2D(tBokeh, clamp(uv, vec2(0.002), vec2(0.998))).rgb; }

void main() {
  vec2 p = vUv * glassSize;
  vec2 px = 1.0 / resolution;
  vec2 screen = gl_FragCoord.xy * px;
  // Rain on the outside face.
  vec4 micro = cgBeads(p, 0.011, 0.0012, 0.0034, 0.7, 1.0);
  vec4 small = cgBeads(p + 0.37, 0.026, 0.0028, 0.0068, 0.55, 7.0);
  vec4 large = cgBeads(p + vec2(0.13, 0.61), 0.06, 0.0055, 0.0115, 0.38, 13.0);
  vec4 runA = cgRunners(p, 0.085, 3.0);
  vec4 runB = cgRunners(p + vec2(0.041, 0.9), 0.13, 11.0);
  vec4 lens = large; lens = small.z > lens.z ? small : lens; lens = runA.z > lens.z ? vec4(runA.xy, runA.z, 0.0) : lens; lens = runB.z > lens.z ? vec4(runB.xy, runB.z, 0.0) : lens;
  float drop = clamp(lens.z, 0.0, 1.0);
  float trail = max(runA.w, runB.w);
  // Background: the defocused street, nudged by the micro beads and wet trails.
  vec2 nudge = micro.xy * micro.z * 1.5 * px + vec2(trail * 0.0012, 0.0);
  vec3 outside = cgBokeh(screen + nudge);
  outside = mix(outside, outside * 0.92 + 0.012, micro.z * 0.5);
  // Inside a drop: a strongly magnified, inverted and sharp image of the street.
  // Rays that would land on the room (the lamp, the table) fall back to bokeh.
  float dropPx = 0.012 * resolution.y;
  vec2 refractUv = screen - lens.xy * dropPx * px * 1.6;
  float ownDepth = gl_FragCoord.z;
  float hitDepth = texture2D(tSharpDepth, refractUv).x;
  vec3 sharp = textureLod(tSharp, clamp(refractUv, vec2(0.002), vec2(0.998)), 0.0).rgb;
  vec3 seen = hitDepth > ownDepth ? sharp : cgBokeh(refractUv);
  // Water also scatters a little of the defocused glow it sits on.
  vec3 dropColor = mix(seen, cgBokeh(screen), 0.45) * 1.06 * (1.0 - lens.w * 0.3);
  // Light from above gathers at the lower inside edge of every bead.
  float foot = smoothstep(0.2, 0.9, -lens.y) * smoothstep(0.35, 0.9, length(lens.xy));
  dropColor += (cgBokeh(screen + vec2(0.0, 0.035)) * 1.6 + vec3(0.02, 0.03, 0.045)) * foot;
  vec3 c = mix(outside, dropColor, drop);
  c = mix(c, c * 1.05 + 0.004, trail * 0.6);
  // Planar reflection of the room, Fresnel weighted and rippled by the drops.
  vec2 mirror = vReflect.xy / vReflect.w + (lens.xy * drop + micro.xy * micro.z * 0.3) * 0.004;
  vec3 room = texture2D(tDiffuse, mirror).rgb;
  vec3 viewDir = normalize(cameraPosition - vWorld);
  float fresnel = 0.035 + 0.6 * pow(1.0 - clamp(viewDir.z, 0.0, 1.0), 5.0);
  // Glints: the table lamp caught on bead crowns.
  vec3 toLamp = normalize(lampPosition - vWorld);
  vec3 n = normalize(vec3(-lens.xy * 0.55, 1.0));
  float glint = pow(max(dot(n, normalize(toLamp + viewDir)), 0.0), 220.0) * drop;
  // Condensation on the inside face: a faint film, heavier along the sill and frame.
  float edge = pow(abs(vUv.x - 0.5) * 2.0, 6.0) * 0.4 + pow(1.0 - vUv.y, 10.0) * 0.8 + pow(vUv.y, 9.0) * 0.25;
  float mottle = cgValue(p * 9.0) * 0.6 + cgValue(p * 31.0) * 0.4;
  vec2 wipeDelta = (vUv - wipe) * vec2(glassSize.x / glassSize.y, 1.0);
  float cleared = exp(-dot(wipeDelta, wipeDelta) / 0.0045) * exp(-wipeAge * 0.075);
  float fog = clamp((0.05 + edge) * (0.65 + 0.7 * mottle), 0.0, 0.85) * (1.0 - cleared);
  fog *= 1.0 - trail * 0.4;
  vec3 frosted = (cgBokeh(screen + vec2(0.018, 0.0)) + cgBokeh(screen - vec2(0.018, 0.0)) + cgBokeh(screen + vec2(0.0, 0.02)) + cgBokeh(screen - vec2(0.0, 0.02))) * 0.25;
  float lampDistance = length(lampPosition - vWorld);
  vec3 scatter = roomGlow + lampGlow / (1.0 + lampDistance * lampDistance * 9.0);
  c = mix(c, frosted * 0.9 + scatter, fog);
  c = c * (1.0 - fresnel) + room * fresnel * reflectionStrength + lampGlow * glint * 0.4 * (1.0 - fog);
  gl_FragColor = vec4(c * color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function GA(r){return{name:"CafeRainGlass",uniforms:{color:{value:new tt(1,1,1)},tDiffuse:{value:null},textureMatrix:{value:new Ft},tSharp:{value:null},tSharpDepth:{value:null},tBokeh:{value:null},resolution:{value:new Pe(1,1)},glassSize:{value:r.clone()},time:{value:0},wipe:{value:new Pe(-2,-2)},wipeAge:{value:99},lampPosition:{value:new V},lampGlow:{value:new tt(0,0,0)},roomGlow:{value:new tt(.002,.003,.005)},reflectionStrength:{value:.4}},vertexShader:IA,fragmentShader:HA}}const VA=`
${sA}
uniform sampler2D tColor;
uniform vec4 uGlass;       // x0, x1, y0, y1 of the window opening
uniform float uGlassZ;
uniform float uFocus;
uniform float uMaxRadius;  // pixels at this pass's resolution
uniform vec3 uAir;         // warm air light per metre
uniform float uAirDensity;
uniform vec4 uLights[4];
uniform vec3 uLightColors[4];
const int TAPS = 20;
bool cdvOnGlass(vec3 p) { return abs(p.z - uGlassZ) < 0.04 && p.x > uGlass.x && p.x < uGlass.y && p.y > uGlass.z && p.y < uGlass.w; }
float cdvCoc(float dist) { return clamp((1.0 - uFocus / max(dist, 1e-3)) * 1.25 - 0.2, 0.0, 1.0); }
void main() {
  vec3 origin, dir; float surface;
  bwSceneRay(vUv, origin, dir, surface);
  vec3 hit = origin + dir * min(surface, 60.0);
  if (cdvOnGlass(hit)) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }
  float far = min(surface, 40.0);
  // Faint warm air: slight veiling with distance, plus light caught around each lamp.
  float transmit = exp(-uAirDensity * far);
  vec3 inscatter = uAir * (1.0 - transmit);
  for (int i = 0; i < 4; i++) {
    vec4 l = uLights[i];
    if (l.w <= 0.0) continue;
    vec3 rel = l.xyz - origin;
    float b = dot(rel, dir);
    float h = sqrt(max(dot(rel, rel) - b * b, 0.0)) + 0.08;
    inscatter += uLightColors[i] * l.w * (atan((far - b) / h) - atan(-b / h)) / h;
  }
  float coc = cdvCoc(surface);
  if (coc <= 0.001) { gl_FragColor = vec4(inscatter, transmit); return; }
  float radius = coc * uMaxRadius;
  vec2 texel = 1.0 / uResolution;
  float spin = bwIgn(gl_FragCoord.xy + uFrame * 7.0) * 6.2831853;
  vec3 sum = vec3(0.0); float weight = 0.0;
  for (int i = 0; i < TAPS; i++) {
    float t = (float(i) + 0.5) / float(TAPS);
    float a = spin + float(i) * 2.3999632;
    float r = sqrt(t) * radius;
    vec2 uv = vUv + vec2(cos(a), sin(a)) * r * texel;
    vec3 o2, d2; float s2;
    bwSceneRay(uv, o2, d2, s2);
    if (cdvOnGlass(o2 + d2 * min(s2, 60.0))) continue;
    float reach = cdvCoc(s2) * uMaxRadius + 1.0;
    float w = clamp(reach - r + 1.0, 0.0, 1.0);
    sum += texture2D(tColor, uv).rgb * w;
    weight += w;
  }
  if (weight < 1e-3) { gl_FragColor = vec4(inscatter, transmit); return; }
  vec3 blurred = sum / weight;
  // The radius carries the depth; the blend only fades in the first few pixels.
  float blend = clamp(coc * 4.0, 0.0, 1.0);
  gl_FragColor = vec4(blurred * blend * transmit + inscatter, (1.0 - blend) * transmit);
}
`;function kA(r){const e=r.glass,n=Array.from({length:4},(c,u)=>{const h=r.lights[u];return h?new Jt(h.position.x,h.position.y,h.position.z,h.strength):new Jt}),a=Array.from({length:4},(c,u)=>{var h;return((h=r.lights[u])==null?void 0:h.color.clone())??new tt(0,0,0)}),o=new ai({name:"CafeDepthVolume",vertexShader:s0,fragmentShader:VA,depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{tColor:{value:r.color},uGlass:{value:new Jt(e.x-e.w/2,e.x+e.w/2,e.y-e.h/2,e.y+e.h/2)},uGlassZ:{value:e.z},uFocus:{value:3.6},uMaxRadius:{value:7},uAir:{value:new tt(.006,.0045,.003)},uAirDensity:{value:.01},uLights:{value:n},uLightColors:{value:a}}});return{material:o,uniforms:o.uniforms,update(c,u){var d;const h=(d=o.uniforms.uResolution)==null?void 0:d.value;h&&(o.uniforms.uMaxRadius.value=Math.max(2,h.y*.006))}}}const zl=(r,e=zs)=>new hi({color:r,side:e,toneMapped:!1}),bn=(r,e,n)=>new tt(r,e,n);function Sx(r){r.traverse(e=>{e instanceof rn&&(e.geometry.dispose(),e.material.dispose())})}function WA(r,e,n,a){const o=new ba(r,32,16),c=[],u=o.getAttribute("position"),h=new tt;for(let d=0;d<u.count;d++){const p=u.getY(d)/r;p>=0?h.copy(n).lerp(e,Math.pow(p,.6)):h.copy(n).lerp(a,Math.min(1,-p*4)),c.push(h.r,h.g,h.b)}return o.setAttribute("color",new Wt(c,3)),new rn(o,new hi({vertexColors:!0,side:Gn,toneMapped:!1}))}function aa(r,e,n,a,o,c,u,h){const d=new rn(new ei(n,a),zl(e,di));return d.position.set(o,c,u),d.lookAt(h),r.add(d),d}function kd(r,e,n,a,o,c){const u=new rn(new ba(n,12,8),zl(e));return u.position.set(a,o,c),r.add(u),u}function XA(r,e){const n=new Pp(r),a=new V(-.6,1.15,-.4);let o=null,c=null;try{const h=new Dp,d=new rn(new ti(14,4.2,18),zl(bn(.022,.015,.01),Gn));d.position.set(1.5,2.1,-1.5),h.add(d);const p=new rn(new ei(14,18),zl(bn(.02,.012,.007),di));p.rotation.x=-Math.PI/2,p.position.set(1.5,.01,-1.5),h.add(p);const g=e.glass;aa(h,bn(.035,.055,.1),g.w,g.h*.55,g.x,g.y+g.h*.22,g.z-.05,new V(g.x,g.y+g.h*.22,5)),aa(h,bn(.03,.038,.055),g.w,g.h*.45,g.x,g.y-g.h*.27,g.z-.06,new V(g.x,g.y-g.h*.27,5));for(const[v,x,b]of[[-4.2,1.3,.5],[-3.1,2.1,.28],[-1.9,1.1,.6],[-.8,1.9,.3],[.2,1.25,.45],[-2.6,2.7,.25]])aa(h,bn(1.6,1.1,.6),b,b*.7,v,x,g.z-.04,new V(v,x,5));kd(h,bn(1.1,.72,.4),.1,e.lamp.x,e.lamp.y,e.lamp.z);for(const v of e.pendants){const x=new rn(new yr(.22,20),zl(bn(14,10,6)));x.position.copy(v),x.rotation.x=Math.PI/2,h.add(x)}aa(h,bn(1.2,.75,.38),5,.06,4.2,1.95,-8.6,new V(4.2,1.95,0)),kd(h,bn(3.2,2,1),.18,1.4,1.9,2.8),aa(h,bn(.05,.032,.02),6,2.5,.5,1.4,4.5,new V(.5,1.4,0)),aa(h,bn(1.2,.75,.38),5,.06,4.2,2.6,-8.6,new V(4.2,2.6,0)),o=n.fromScene(h,.04,.05,40,{size:128,position:a}),Sx(h);const _=new Dp;_.add(WA(60,bn(.03,.065,.16),bn(.12,.15,.23),bn(.008,.01,.013))),aa(_,bn(.012,.016,.022),40,10,-5,5,-18,new V(-5,5,0));for(let v=0;v<26;v++){const x=-22+v*7.3%30,b=3.2+v*3.7%6.5;aa(_,v%3?bn(1.3,.85,.45):bn(.25,.32,.4),.9,1.1,x,b,-17.8,new V(x,b,0))}aa(_,bn(2.2,1.4,.7),4.5,1.6,-7,1.2,-17.7,new V(-7,1.2,0)),aa(_,bn(1.8,1.15,.6),4,1.6,1.5,1.2,-17.7,new V(1.5,1.2,0)),aa(_,bn(.28,.18,.09),6,3.4,-2.1,2.1,-1.4,new V(-2.1,2.1,-20));for(const[v,x]of[[-5.3,-8.6],[-11.9,-13.9],[2.4,-14.2]])kd(_,bn(40,28,15),.12,v,3.5,x);c=n.fromScene(_,.03,.05,80,{size:128,position:new V(-3,.4,-8)}),Sx(_)}catch(h){throw o==null||o.dispose(),c==null||c.dispose(),h}finally{n.dispose()}const u={room:o,street:c};return{...u,dispose(){u.room.dispose(),u.street.dispose()}}}const Mx={exposure:1.44,bloomStrength:.07,bloomThreshold:0,aoStrength:.9,aoRadius:.32,saturation:1.04,contrast:1.06,shadowTint:[.95,.98,1.06],highlightTint:[1.08,1,.88],vignette:.38,grain:.03},qA=5.2,YA=1.35,ZA=.22,KA=1.15,QA=new tt("#ffd2a0").multiplyScalar(30),Wd=new tt("#ffc58a");class JA{constructor(e,n,a="auto",o="auto"){this.canvas=e,this.onContextLost=n,this.postPreference=o,this.camera=new Si(45,1,.04,90),this.world=OA(),this.look=new yA({yaw:.052,pitch:.027},{follow:.2,settle:1.35}),this.raycaster=new a2,this.pass=new _y,this.targetChecks=[],this.shadowTargets=[],this.targetFallbackReason=null,this.environment=null,this.probes=null,this.post=null,this.volume=null,this.shot=yy(0),this.raf=0,this.last=0,this.ready=!1,this.disposed=!1,this.time=0,this.width=1,this.height=1,this.ratio=1,this.wipeAge=99,this.cupPulse=0,this.lampLevel=1,this.lampTarget=1,this.frames=0,this.lost=h=>{h.preventDefault(),this.onContextLost()},this.renderer=new nA({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=yi,this.renderer.toneMapping=Hp,this.renderer.toneMappingExposure=Mx.exposure,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Cl,this.renderer.shadowMap.autoUpdate=!1;try{this.capability=gA(this.renderer,a)}catch(h){throw this.world.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),h}this.target=go(new Kn(1,1,{depthBuffer:!0}),this.capability.type),this.target.depthTexture=new Fs(1,1,zi),this.target.texture.generateMipmaps=!0,this.target.texture.minFilter=ya,this.bokeh=go(new Kn(1,1,{depthBuffer:!1}),this.capability.type),this.bokehMaterial=BA({glassZ:this.world.glass.z,lamps:this.world.exterior.lamps}),this.bokehMaterial.uniforms.tColor.value=this.target.texture,this.bokehMaterial.uniforms.tDepth.value=this.target.depthTexture,this.bokehMaterial.uniforms.uHighlightBoost.value=this.capability.type===yn?.35:2.2;const c=this.world.glass;this.glass=new Ku(new ei(c.w,c.h),{color:16777215,textureWidth:512,textureHeight:512,multisample:0,clipBias:.003,shader:GA(new Pe(c.w,c.h))}),go(this.glass.getRenderTarget(),this.capability.type),vA(this.glass);const u=this.glassUniforms;u.tSharp.value=this.target.texture,u.tSharpDepth.value=this.target.depthTexture,u.tBokeh.value=this.bokeh.texture,this.glass.position.set(c.x,c.y,c.z),this.world.scene.add(this.glass),this.glass.userData.interaction="window",this.world.interactables.push(this.glass),e.addEventListener("webglcontextlost",this.lost),e.dataset.engine="three-webgl2",e.dataset.lifecycle="created"}get glassUniforms(){return this.glass.material.uniforms}async init(){var n;if(this.disposed)return;if(this.capability.type===yn)try{this.probes=Fp(this.renderer,()=>XA(this.renderer,{glass:this.world.glass,lamp:new V(this.shot.lamp.x,this.shot.lamp.y+.39,this.shot.lamp.z),pendants:this.world.pendantPositions}))}catch{this.probes=null}if(this.probes)this.world.scene.environment=this.probes.room.texture,this.world.scene.environmentIntensity=1,this.world.exterior.setEnvironment(this.probes.street.texture);else{let a;try{a=await mA()}catch(o){if(this.disposed)return;throw o}if(this.disposed){a.dispose();return}this.environment=a,this.world.scene.environment=a,this.world.scene.environmentIntensity=.16}if(this.disposed){(n=this.probes)==null||n.dispose(),this.probes=null;return}const e=this.renderer.capabilities.maxTextureSize;if(this.world.shadowCasters.forEach((a,o)=>{const c=Math.min(o?1024:2048,e),u=a.shadow;u.mapSize.set(c,c);const h=go(new Kn(c,c),wn);h.depthTexture=new Fs(c,c,zi),h.depthTexture.format=Ea,h.depthTexture.compareFunction=Wu,h.depthTexture.minFilter=h.depthTexture.magFilter=mn,u.map=h,this.shadowTargets.push({label:o?`pcf-shadow-${o}`:"pcf-shadow",target:h})}),this.postPreference!=="off"&&this.capability.type===yn){const a=[...this.world.pendantPositions.map(o=>({position:o,color:new tt("#ffc98e"),strength:.0016})),{position:new V,color:Wd.clone(),strength:9e-4}];this.post=r0.create(this.renderer,{settings:Mx,volume:()=>this.volume=kA({color:this.target.texture,glass:this.world.glass,lights:a})})}this.ready=!0,this.setSize(this.width,this.height,this.ratio),this.renderer.shadowMap.needsUpdate=!0,this.renderFrame(0),this.canvas.dataset.lifecycle="ready"}setSize(e,n,a){var d,p;this.width=Math.max(1,e),this.height=Math.max(1,n),this.ratio=Math.min(2,Math.max(1,a)),this.renderer.setPixelRatio(this.ratio),this.renderer.setSize(this.width,this.height,!1);const o=Math.round(this.width*this.ratio),c=Math.round(this.height*this.ratio);this.target.setSize(o,c),this.bokeh.setSize(Math.max(1,Math.round(o/2)),Math.max(1,Math.round(c/2))),this.glass.getRenderTarget().setSize(Math.round(o*.65),Math.round(c*.65)),this.glassUniforms.resolution.value.set(o,c);const u=this.bokehMaterial.uniforms;u.uSourceSize.value.set(o,c),u.uMaxRadius.value=Math.max(4,c*.015),this.camera.aspect=this.width/this.height,this.renderer.shadowMap.needsUpdate=!0;const h=1-Gx.smoothstep(this.camera.aspect,.48,1.35);if(this.shot=this.world.arrange(h),this.camera.fov=this.shot.fov,this.camera.updateProjectionMatrix(),this.ready){const g=[[this.target,"refraction"],[this.bokeh,"bokeh"],[this.glass.getRenderTarget(),"reflection"]],_=g.map(([b,A])=>c0(this.renderer,b,A));if(this.capability.type===yn&&_.some(b=>!b.complete)){this.targetFallbackReason="HalfFloat framebuffer incomplete at scene dimensions",this.capability.type=wn;for(const[b]of g)b.dispose(),go(b,wn);(d=this.post)==null||d.dispose(),this.post=null,this.volume=null,this.bokehMaterial.uniforms.uHighlightBoost.value=2.2}(p=this.post)==null||p.setSize(this.width,this.height,this.ratio),this.targetChecks=[...g.map(([b,A])=>Gd(this.renderer,b,A)),...this.shadowTargets.map(({target:b,label:A})=>Gd(this.renderer,b,A))];const v=this.probes?this.probes.room.texture:this.environment,x=v.image;this.canvas.dataset.targets=JSON.stringify({capability:this.capability,fallbackReason:this.targetFallbackReason,targets:this.targetChecks,environment:{kind:this.probes?"cafe-probe":"baked-cubeuv",type:v.type,internalFormat:v.internalFormat,mapping:v.mapping,width:x.width,height:x.height,runtimePmrem:!!this.probes}}),this.canvas.dataset.post=this.post?JSON.stringify(this.post.report):"direct"}}renderFrame(e){if(!this.ready||this.disposed)return;const n=Math.min(.05,Math.max(0,e));this.time+=n,this.wipeAge+=n,this.look.update(n),this.cupPulse=Math.max(0,this.cupPulse-n*.4),this.lampLevel+=(this.lampTarget-this.lampLevel)*(1-Math.exp(-n*1.2));const a=this.world,o=this.lampLevel;a.update(this.time),a.steamUniforms.time.value=this.time,a.steamUniforms.pulse.value=this.cupPulse,a.steamUniforms.light.value.copy(Wd).multiplyScalar(1.5*o),a.cup.rotation.z=Math.sin(this.time*3)*this.cupPulse*.012,a.key.intensity=qA*o,a.lampLight.intensity=YA*o,a.bounce.intensity=ZA*o,a.shadeMat.emissiveIntensity=KA*o,a.bulbMaterial.color.copy(QA).multiplyScalar(o);const c=this.glassUniforms;c.time.value=this.time,c.wipeAge.value=this.wipeAge,c.lampPosition.value.copy(a.key.position),c.lampGlow.value.copy(Wd).multiplyScalar(.28*o),this.volume&&this.volume.uniforms.uLights.value[a.pendantPositions.length].set(a.key.position.x,a.key.position.y+.02,a.key.position.z,9e-4*o),this.camera.position.copy(this.shot.camera),this.camera.lookAt(this.shot.aim),this.camera.rotateY(this.look.yaw),this.camera.rotateX(this.look.pitch),this.camera.updateMatrixWorld();const u=this.bokehMaterial.uniforms;u.uInverseProjection.value.copy(this.camera.projectionMatrixInverse),u.uCameraWorld.value.copy(this.camera.matrixWorld),u.uTime.value=this.time,u.uViewProjection.value.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),Fp(this.renderer,()=>{try{this.glass.visible=!1,this.renderer.setRenderTarget(this.target),this.renderer.render(a.scene,this.camera),this.pass.render(this.renderer,this.bokehMaterial,this.bokeh),this.glass.visible=!0,this.post?this.post.render(a.scene,this.camera,this.time):(this.renderer.setRenderTarget(null),this.renderer.render(a.scene,this.camera))}finally{this.glass.visible=!0}}),this.frames++,this.canvas.dataset.frames=String(this.frames),this.canvas.dataset.time=this.time.toFixed(4),this.canvas.dataset.yaw=this.look.yaw.toFixed(5),this.canvas.dataset.cupPulse=this.cupPulse.toFixed(3),this.canvas.dataset.lamp=this.lampLevel.toFixed(3),this.canvas.dataset.wipeAge=this.wipeAge.toFixed(3),this.canvas.dataset.drawCalls=String(this.renderer.info.render.calls),this.canvas.dataset.triangles=String(this.renderer.info.render.triangles)}start(){if(this.raf||!this.ready||this.disposed)return;this.last=performance.now(),this.canvas.dataset.running="true";const e=n=>{this.disposed||(this.renderFrame((n-this.last)/1e3),this.last=n,this.raf=requestAnimationFrame(e))};this.raf=requestAnimationFrame(e)}stop(){cancelAnimationFrame(this.raf),this.raf=0,this.canvas.dataset.running="false"}drag(e,n){this.look.drag(e,n)}releaseDrag(){this.look.release()}interact(e,n){this.raycaster.setFromCamera(new Pe(e*2-1,1-n*2),this.camera);const a=this.raycaster.intersectObjects(this.world.interactables,!1)[0],o=a==null?void 0:a.object.userData.interaction;return o==="window"&&a.uv&&(this.glassUniforms.wipe.value.copy(a.uv),this.wipeAge=0),o==="cup"&&(this.cupPulse=1),o==="lamp"&&(this.lampTarget=this.lampTarget>.9?.78:1),o??null}interactionPointsForQA(){const e=(c,u)=>{var _;const h=u.clone().project(this.camera),d=(h.x+1)/2,p=(1-h.y)/2,g=new Pe;for(let v=0;v<=24;v++)for(let x=0,b=Math.max(1,v*8);x<b;x++){const A=x/b*Math.PI*2,S=d+Math.cos(A)*v*.012,y=p+Math.sin(A)*v*.012;if(!(S<.03||S>.97||y<.03||y>.97)&&(this.raycaster.setFromCamera(g.set(S*2-1,1-y*2),this.camera),((_=this.raycaster.intersectObjects(this.world.interactables,!1)[0])==null?void 0:_.object.userData.interaction)===c))return{x:S,y}}return{x:d,y:p}},n=this.shot,a=this.world.glass,o=n.lampScale;return{cup:e("cup",new V(n.cup.x,n.cup.y+.07,n.cup.z+.04)),lamp:e("lamp",new V(n.lamp.x,n.lamp.y+.43*o,n.lamp.z+.12*o)),window:e("window",new V((n.cup.x+n.lamp.x)/2+.25,1.25,a.z))}}advanceForQA(e){if(this.raf||!this.ready)throw new Error("Advancing time requires a ready paused scene");const n=Math.max(0,Math.min(600,e));return this.time+=n,this.wipeAge+=n,this.renderFrame(0),{time:this.time}}verifyTargetStateForQA(){if(this.raf||!this.ready)throw new Error("Target-state check requires a ready paused scene");const e=o0(this.renderer),n=new a0(16,{type:wn,depthBuffer:!1,generateMipmaps:!0,minFilter:ya}),a=()=>this.renderer.getRenderTarget()===n&&this.renderer.getActiveCubeFace()===4&&this.renderer.getActiveMipmapLevel()===1;try{this.renderer.setRenderTarget(n,4,1);const o=this.renderer.getContext();if(o.checkFramebufferStatus(o.FRAMEBUFFER)!==o.FRAMEBUFFER_COMPLETE)throw new Error("QA cube mip framebuffer incomplete");Gd(this.renderer,this.target,"state-probe");const c=a();this.renderer.render(this.world.scene,this.camera);const u=a();this.renderFrame(0);const h=a();return{face:4,mip:1,probeRestored:c,reflectorRestored:u,frameRestored:h,glError:o.getError()}}finally{l0(this.renderer,e),n.dispose()}}dispose(){var e,n,a,o;this.disposed||(this.stop(),this.disposed=!0,this.canvas.removeEventListener("webglcontextlost",this.lost),(e=this.post)==null||e.dispose(),this.post=null,this.volume=null,this.pass.dispose(),this.bokehMaterial.dispose(),this.bokeh.dispose(),this.glass.dispose(),(n=this.target.depthTexture)==null||n.dispose(),this.target.dispose(),(a=this.environment)==null||a.dispose(),(o=this.probes)==null||o.dispose(),this.probes=null,this.world.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.dataset.lifecycle="disposed")}}class jA extends F1{constructor(){super({canvasClass:"cafe-world-canvas",isSupported:()=>{var e;try{const n=document.createElement("canvas").getContext("webgl2"),a=!!n;return(e=n==null?void 0:n.getExtension("WEBGL_lose_context"))==null||e.loseContext(),a}catch{return!1}},create:(e,n)=>new JA(e,n,this.targetPreference,this.postPreference)}),this.targetPreference="auto",this.postPreference="auto"}setTargetPreferenceForQA(e){if(this.engine)throw new Error("Choose target policy before creating the cafe engine");this.targetPreference=e}setPostPreferenceForQA(e){if(this.engine)throw new Error("Choose post policy before creating the cafe engine");this.postPreference=e}verifyTargetStateForQA(){var e;return(e=this.engine)==null?void 0:e.verifyTargetStateForQA()}interactionPointsForQA(){var e;return(e=this.engine)==null?void 0:e.interactionPointsForQA()}advanceForQA(e){var n;return(n=this.engine)==null?void 0:n.advanceForQA(e)}interact(e,n,a){var o;return this.top===e&&e.running&&this.status==="ready"?((o=this.engine)==null?void 0:o.interact(n,a))??null:null}}const ts=new jA;function bx({active:r,onInteraction:e}){const n=fi.useRef(null),a=fi.useRef(null),o=fi.useRef(null),[c,u]=fi.useState("loading"),h=O1(r);return fi.useEffect(()=>{if(!a.current)return;const d={mount:a.current,running:!1,onStatus:u};o.current=d;const p=ts.acquire(d);return()=>{o.current=null,p()}},[]),fi.useEffect(()=>{o.current&&ts.setRunning(o.current,h)},[h,c]),z1(ts,n,o,h),fi.useEffect(()=>{const d=n.current;if(!d||!h)return;let p=null;const g=b=>{b.isPrimary&&b.button===0&&(p={x:b.clientX,y:b.clientY,id:b.pointerId,time:performance.now(),distance:0})},_=b=>{p&&p.id===b.pointerId&&(p.distance=Math.max(p.distance,Math.hypot(b.clientX-p.x,b.clientY-p.y)))},v=b=>{const A=p;if(p=null,!A||A.id!==b.pointerId||A.distance>8||Math.hypot(b.clientX-A.x,b.clientY-A.y)>8||performance.now()-A.time>600||!o.current)return;const S=d.getBoundingClientRect(),y=ts.interact(o.current,(b.clientX-S.left)/S.width,(b.clientY-S.top)/S.height);y&&(e==null||e(y))},x=()=>{p=null};return d.addEventListener("pointerdown",g),window.addEventListener("pointermove",_),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",x),()=>{d.removeEventListener("pointerdown",g),window.removeEventListener("pointermove",_),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",x)}},[h,e]),En.jsxs("div",{ref:n,className:"cafe-world","data-state":c,"data-motion":h?"running":"paused",role:"img","aria-label":"비 오는 저녁, 따뜻한 조명과 커피가 있는 카페 창가. 멀리 손님들이 조용히 앉아 있습니다.",children:[En.jsx("div",{ref:a,className:"cafe-world-mount"}),c!=="ready"&&En.jsx("span",{className:"cafe-world-status",role:"status",children:c==="failed"?"이 기기에서 카페 3D 화면을 표시할 수 없습니다.":"카페 창가를 준비하고 있어요"})]})}const $A=new URLSearchParams(location.search).get("targets")==="byte"?"byte":"auto";ts.setTargetPreferenceForQA($A);ts.setPostPreferenceForQA(new URLSearchParams(location.search).get("post")==="off"?"off":"auto");Object.assign(window,{cafeQA:{verifyTargetState:()=>ts.verifyTargetStateForQA(),interactionPoints:()=>ts.interactionPointsForQA(),advance:r=>ts.advanceForQA(r)}});function eR(){const[r,e]=fi.useState(!new URLSearchParams(location.search).has("paused")),[n,a]=fi.useState(!1),[o,c]=fi.useState(!0),[u,h]=fi.useState("");return En.jsxs(En.Fragment,{children:[En.jsx("main",{"data-scene-surface":!0,style:{position:"absolute",inset:0},children:o&&En.jsx(bx,{active:r,onInteraction:h})}),n&&o&&En.jsx("section",{id:"fullscreen","data-scene-surface":!0,"aria-label":"몰입 화면",children:En.jsx(bx,{active:r,onInteraction:h})}),En.jsxs("div",{className:"label",children:[En.jsx("small",{children:"RAINY EVENING · WINDOW SEAT"}),En.jsx("h1",{children:"Café focus"}),En.jsx("span",{children:"40 min"})]}),En.jsxs("nav",{children:[En.jsx("button",{onClick:()=>e(d=>!d),children:r?"Pause":"Resume"}),En.jsx("button",{onClick:()=>a(d=>!d),children:n?"Exit fullscreen":"Fullscreen holder"}),En.jsx("button",{onClick:()=>c(d=>!d),children:o?"Unmount":"Mount"}),En.jsx("button",{onClick:()=>document.documentElement.classList.toggle("reduce-motion"),children:"Reduced motion"}),En.jsx("output",{"data-interaction":!0,children:u})]})]})}P1.createRoot(document.getElementById("root")).render(En.jsx(A1.StrictMode,{children:En.jsx(eR,{})}));
