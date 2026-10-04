(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function Ny(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Ch={exports:{}},ko={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gv;function Oy(){if(gv)return ko;gv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var h in o)h!=="key"&&(c[h]=o[h])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return ko.Fragment=t,ko.jsx=n,ko.jsxs=n,ko}var vv;function Py(){return vv||(vv=1,Ch.exports=Oy()),Ch.exports}var fn=Py(),Dh={exports:{}},me={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _v;function Iy(){if(_v)return me;_v=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function x(U){return U===null||typeof U!="object"?null:(U=g&&U[g]||U["@@iterator"],typeof U=="function"?U:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,M={};function S(U,j,dt){this.props=U,this.context=j,this.refs=M,this.updater=dt||T}S.prototype.isReactComponent={},S.prototype.setState=function(U,j){if(typeof U!="object"&&typeof U!="function"&&U!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,U,j,"setState")},S.prototype.forceUpdate=function(U){this.updater.enqueueForceUpdate(this,U,"forceUpdate")};function O(){}O.prototype=S.prototype;function I(U,j,dt){this.props=U,this.context=j,this.refs=M,this.updater=dt||T}var A=I.prototype=new O;A.constructor=I,D(A,S.prototype),A.isPureReactComponent=!0;var P=Array.isArray;function R(){}var L={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function N(U,j,dt){var Rt=dt.ref;return{$$typeof:r,type:U,key:j,ref:Rt!==void 0?Rt:null,props:dt}}function F(U,j){return N(U.type,j,U.props)}function H(U){return typeof U=="object"&&U!==null&&U.$$typeof===r}function q(U){var j={"=":"=0",":":"=2"};return"$"+U.replace(/[=:]/g,function(dt){return j[dt]})}var K=/\/+/g;function G(U,j){return typeof U=="object"&&U!==null&&U.key!=null?q(""+U.key):j.toString(36)}function J(U){switch(U.status){case"fulfilled":return U.value;case"rejected":throw U.reason;default:switch(typeof U.status=="string"?U.then(R,R):(U.status="pending",U.then(function(j){U.status==="pending"&&(U.status="fulfilled",U.value=j)},function(j){U.status==="pending"&&(U.status="rejected",U.reason=j)})),U.status){case"fulfilled":return U.value;case"rejected":throw U.reason}}throw U}function B(U,j,dt,Rt,Pt){var qt=typeof U;(qt==="undefined"||qt==="boolean")&&(U=null);var at=!1;if(U===null)at=!0;else switch(qt){case"bigint":case"string":case"number":at=!0;break;case"object":switch(U.$$typeof){case r:case t:at=!0;break;case v:return at=U._init,B(at(U._payload),j,dt,Rt,Pt)}}if(at)return Pt=Pt(U),at=Rt===""?"."+G(U,0):Rt,P(Pt)?(dt="",at!=null&&(dt=at.replace(K,"$&/")+"/"),B(Pt,j,dt,"",function(ie){return ie})):Pt!=null&&(H(Pt)&&(Pt=F(Pt,dt+(Pt.key==null||U&&U.key===Pt.key?"":(""+Pt.key).replace(K,"$&/")+"/")+at)),j.push(Pt)),1;at=0;var gt=Rt===""?".":Rt+":";if(P(U))for(var Dt=0;Dt<U.length;Dt++)Rt=U[Dt],qt=gt+G(Rt,Dt),at+=B(Rt,j,dt,qt,Pt);else if(Dt=x(U),typeof Dt=="function")for(U=Dt.call(U),Dt=0;!(Rt=U.next()).done;)Rt=Rt.value,qt=gt+G(Rt,Dt++),at+=B(Rt,j,dt,qt,Pt);else if(qt==="object"){if(typeof U.then=="function")return B(J(U),j,dt,Rt,Pt);throw j=String(U),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(U).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return at}function X(U,j,dt){if(U==null)return U;var Rt=[],Pt=0;return B(U,Rt,"","",function(qt){return j.call(dt,qt,Pt++)}),Rt}function nt(U){if(U._status===-1){var j=U._result;j=j(),j.then(function(dt){(U._status===0||U._status===-1)&&(U._status=1,U._result=dt)},function(dt){(U._status===0||U._status===-1)&&(U._status=2,U._result=dt)}),U._status===-1&&(U._status=0,U._result=j)}if(U._status===1)return U._result.default;throw U._result}var it=typeof reportError=="function"?reportError:function(U){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof U=="object"&&U!==null&&typeof U.message=="string"?String(U.message):String(U),error:U});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",U);return}console.error(U)},ot={map:X,forEach:function(U,j,dt){X(U,function(){j.apply(this,arguments)},dt)},count:function(U){var j=0;return X(U,function(){j++}),j},toArray:function(U){return X(U,function(j){return j})||[]},only:function(U){if(!H(U))throw Error("React.Children.only expected to receive a single React element child.");return U}};return me.Activity=_,me.Children=ot,me.Component=S,me.Fragment=n,me.Profiler=o,me.PureComponent=I,me.StrictMode=a,me.Suspense=m,me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=L,me.__COMPILER_RUNTIME={__proto__:null,c:function(U){return L.H.useMemoCache(U)}},me.cache=function(U){return function(){return U.apply(null,arguments)}},me.cacheSignal=function(){return null},me.cloneElement=function(U,j,dt){if(U==null)throw Error("The argument must be a React element, but you passed "+U+".");var Rt=D({},U.props),Pt=U.key;if(j!=null)for(qt in j.key!==void 0&&(Pt=""+j.key),j)!E.call(j,qt)||qt==="key"||qt==="__self"||qt==="__source"||qt==="ref"&&j.ref===void 0||(Rt[qt]=j[qt]);var qt=arguments.length-2;if(qt===1)Rt.children=dt;else if(1<qt){for(var at=Array(qt),gt=0;gt<qt;gt++)at[gt]=arguments[gt+2];Rt.children=at}return N(U.type,Pt,Rt)},me.createContext=function(U){return U={$$typeof:u,_currentValue:U,_currentValue2:U,_threadCount:0,Provider:null,Consumer:null},U.Provider=U,U.Consumer={$$typeof:c,_context:U},U},me.createElement=function(U,j,dt){var Rt,Pt={},qt=null;if(j!=null)for(Rt in j.key!==void 0&&(qt=""+j.key),j)E.call(j,Rt)&&Rt!=="key"&&Rt!=="__self"&&Rt!=="__source"&&(Pt[Rt]=j[Rt]);var at=arguments.length-2;if(at===1)Pt.children=dt;else if(1<at){for(var gt=Array(at),Dt=0;Dt<at;Dt++)gt[Dt]=arguments[Dt+2];Pt.children=gt}if(U&&U.defaultProps)for(Rt in at=U.defaultProps,at)Pt[Rt]===void 0&&(Pt[Rt]=at[Rt]);return N(U,qt,Pt)},me.createRef=function(){return{current:null}},me.forwardRef=function(U){return{$$typeof:h,render:U}},me.isValidElement=H,me.lazy=function(U){return{$$typeof:v,_payload:{_status:-1,_result:U},_init:nt}},me.memo=function(U,j){return{$$typeof:p,type:U,compare:j===void 0?null:j}},me.startTransition=function(U){var j=L.T,dt={};L.T=dt;try{var Rt=U(),Pt=L.S;Pt!==null&&Pt(dt,Rt),typeof Rt=="object"&&Rt!==null&&typeof Rt.then=="function"&&Rt.then(R,it)}catch(qt){it(qt)}finally{j!==null&&dt.types!==null&&(j.types=dt.types),L.T=j}},me.unstable_useCacheRefresh=function(){return L.H.useCacheRefresh()},me.use=function(U){return L.H.use(U)},me.useActionState=function(U,j,dt){return L.H.useActionState(U,j,dt)},me.useCallback=function(U,j){return L.H.useCallback(U,j)},me.useContext=function(U){return L.H.useContext(U)},me.useDebugValue=function(){},me.useDeferredValue=function(U,j){return L.H.useDeferredValue(U,j)},me.useEffect=function(U,j){return L.H.useEffect(U,j)},me.useEffectEvent=function(U){return L.H.useEffectEvent(U)},me.useId=function(){return L.H.useId()},me.useImperativeHandle=function(U,j,dt){return L.H.useImperativeHandle(U,j,dt)},me.useInsertionEffect=function(U,j){return L.H.useInsertionEffect(U,j)},me.useLayoutEffect=function(U,j){return L.H.useLayoutEffect(U,j)},me.useMemo=function(U,j){return L.H.useMemo(U,j)},me.useOptimistic=function(U,j){return L.H.useOptimistic(U,j)},me.useReducer=function(U,j,dt){return L.H.useReducer(U,j,dt)},me.useRef=function(U){return L.H.useRef(U)},me.useState=function(U){return L.H.useState(U)},me.useSyncExternalStore=function(U,j,dt){return L.H.useSyncExternalStore(U,j,dt)},me.useTransition=function(){return L.H.useTransition()},me.version="19.2.7",me}var xv;function op(){return xv||(xv=1,Dh.exports=Iy()),Dh.exports}var Xn=op();const zy=Ny(Xn);var Uh={exports:{}},Xo={},Lh={exports:{}},Nh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sv;function By(){return Sv||(Sv=1,(function(r){function t(B,X){var nt=B.length;B.push(X);t:for(;0<nt;){var it=nt-1>>>1,ot=B[it];if(0<o(ot,X))B[it]=X,B[nt]=ot,nt=it;else break t}}function n(B){return B.length===0?null:B[0]}function a(B){if(B.length===0)return null;var X=B[0],nt=B.pop();if(nt!==X){B[0]=nt;t:for(var it=0,ot=B.length,U=ot>>>1;it<U;){var j=2*(it+1)-1,dt=B[j],Rt=j+1,Pt=B[Rt];if(0>o(dt,nt))Rt<ot&&0>o(Pt,dt)?(B[it]=Pt,B[Rt]=nt,it=Rt):(B[it]=dt,B[j]=nt,it=j);else if(Rt<ot&&0>o(Pt,nt))B[it]=Pt,B[Rt]=nt,it=Rt;else break t}}return X}function o(B,X){var nt=B.sortIndex-X.sortIndex;return nt!==0?nt:B.id-X.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,h=u.now();r.unstable_now=function(){return u.now()-h}}var m=[],p=[],v=1,_=null,g=3,x=!1,T=!1,D=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,O=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function A(B){for(var X=n(p);X!==null;){if(X.callback===null)a(p);else if(X.startTime<=B)a(p),X.sortIndex=X.expirationTime,t(m,X);else break;X=n(p)}}function P(B){if(D=!1,A(B),!T)if(n(m)!==null)T=!0,R||(R=!0,q());else{var X=n(p);X!==null&&J(P,X.startTime-B)}}var R=!1,L=-1,E=5,N=-1;function F(){return M?!0:!(r.unstable_now()-N<E)}function H(){if(M=!1,R){var B=r.unstable_now();N=B;var X=!0;try{t:{T=!1,D&&(D=!1,O(L),L=-1),x=!0;var nt=g;try{e:{for(A(B),_=n(m);_!==null&&!(_.expirationTime>B&&F());){var it=_.callback;if(typeof it=="function"){_.callback=null,g=_.priorityLevel;var ot=it(_.expirationTime<=B);if(B=r.unstable_now(),typeof ot=="function"){_.callback=ot,A(B),X=!0;break e}_===n(m)&&a(m),A(B)}else a(m);_=n(m)}if(_!==null)X=!0;else{var U=n(p);U!==null&&J(P,U.startTime-B),X=!1}}break t}finally{_=null,g=nt,x=!1}X=void 0}}finally{X?q():R=!1}}}var q;if(typeof I=="function")q=function(){I(H)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,G=K.port2;K.port1.onmessage=H,q=function(){G.postMessage(null)}}else q=function(){S(H,0)};function J(B,X){L=S(function(){B(r.unstable_now())},X)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(B){switch(g){case 1:case 2:case 3:var X=3;break;default:X=g}var nt=g;g=X;try{return B()}finally{g=nt}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(B,X){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var nt=g;g=B;try{return X()}finally{g=nt}},r.unstable_scheduleCallback=function(B,X,nt){var it=r.unstable_now();switch(typeof nt=="object"&&nt!==null?(nt=nt.delay,nt=typeof nt=="number"&&0<nt?it+nt:it):nt=it,B){case 1:var ot=-1;break;case 2:ot=250;break;case 5:ot=1073741823;break;case 4:ot=1e4;break;default:ot=5e3}return ot=nt+ot,B={id:v++,callback:X,priorityLevel:B,startTime:nt,expirationTime:ot,sortIndex:-1},nt>it?(B.sortIndex=nt,t(p,B),n(m)===null&&B===n(p)&&(D?(O(L),L=-1):D=!0,J(P,nt-it))):(B.sortIndex=ot,t(m,B),T||x||(T=!0,R||(R=!0,q()))),B},r.unstable_shouldYield=F,r.unstable_wrapCallback=function(B){var X=g;return function(){var nt=g;g=X;try{return B.apply(this,arguments)}finally{g=nt}}}})(Nh)),Nh}var yv;function Fy(){return yv||(yv=1,Lh.exports=By()),Lh.exports}var Oh={exports:{}},On={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mv;function Hy(){if(Mv)return On;Mv=1;var r=op();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,p,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:m,containerInfo:p,implementation:v}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return On.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,On.createPortal=function(m,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,v)},On.flushSync=function(m){var p=u.T,v=a.p;try{if(u.T=null,a.p=2,m)return m()}finally{u.T=p,a.p=v,a.d.f()}},On.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(m,p))},On.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},On.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var v=p.as,_=h(v,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,x=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?a.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:x}):v==="script"&&a.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:x,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},On.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=h(p.as,p.crossOrigin);a.d.M(m,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(m)},On.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,_=h(v,p.crossOrigin);a.d.L(m,v,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},On.preloadModule=function(m,p){if(typeof m=="string")if(p){var v=h(p.as,p.crossOrigin);a.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(m)},On.requestFormReset=function(m){a.d.r(m)},On.unstable_batchedUpdates=function(m,p){return m(p)},On.useFormState=function(m,p,v){return u.H.useFormState(m,p,v)},On.useFormStatus=function(){return u.H.useHostTransitionStatus()},On.version="19.2.7",On}var Ev;function Gy(){if(Ev)return Oh.exports;Ev=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Oh.exports=Hy(),Oh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bv;function Vy(){if(bv)return Xo;bv=1;var r=Fy(),t=op(),n=Gy();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function u(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(a(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,l=i;;){var f=s.return;if(f===null)break;var d=f.alternate;if(d===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===d.child){for(d=f.child;d;){if(d===s)return m(f),e;if(d===l)return m(f),i;d=d.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=d;else{for(var y=!1,C=f.child;C;){if(C===s){y=!0,s=f,l=d;break}if(C===l){y=!0,l=f,s=d;break}C=C.sibling}if(!y){for(C=d.child;C;){if(C===s){y=!0,s=d,l=f;break}if(C===l){y=!0,l=d,s=f;break}C=C.sibling}if(!y)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function v(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=v(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),O=Symbol.for("react.consumer"),I=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),R=Symbol.for("react.suspense_list"),L=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),N=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function q(e){return e===null||typeof e!="object"?null:(e=H&&e[H]||e["@@iterator"],typeof e=="function"?e:null)}var K=Symbol.for("react.client.reference");function G(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===K?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case D:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case P:return"Suspense";case R:return"SuspenseList";case N:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case T:return"Portal";case I:return e.displayName||"Context";case O:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case L:return i=e.displayName||null,i!==null?i:G(e.type)||"Memo";case E:i=e._payload,e=e._init;try{return G(e(i))}catch{}}return null}var J=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nt={pending:!1,data:null,method:null,action:null},it=[],ot=-1;function U(e){return{current:e}}function j(e){0>ot||(e.current=it[ot],it[ot]=null,ot--)}function dt(e,i){ot++,it[ot]=e.current,e.current=i}var Rt=U(null),Pt=U(null),qt=U(null),at=U(null);function gt(e,i){switch(dt(qt,i),dt(Pt,e),dt(Rt,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Fg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Fg(i),e=Hg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}j(Rt),dt(Rt,e)}function Dt(){j(Rt),j(Pt),j(qt)}function ie(e){e.memoizedState!==null&&dt(at,e);var i=Rt.current,s=Hg(i,e.type);i!==s&&(dt(Pt,e),dt(Rt,s))}function kt(e){Pt.current===e&&(j(Rt),j(Pt)),at.current===e&&(j(at),Fo._currentValue=nt)}var ue,Le;function yt(e){if(ue===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);ue=i&&i[1]||"",Le=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ue+e+Le}var wt=!1;function Ut(e,i){if(!e||wt)return"";wt=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var bt=function(){throw Error()};if(Object.defineProperty(bt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(bt,[])}catch(pt){var ft=pt}Reflect.construct(e,[],bt)}else{try{bt.call()}catch(pt){ft=pt}e.call(bt.prototype)}}else{try{throw Error()}catch(pt){ft=pt}(bt=e())&&typeof bt.catch=="function"&&bt.catch(function(){})}}catch(pt){if(pt&&ft&&typeof pt.stack=="string")return[pt.stack,ft.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=l.DetermineComponentFrameRoot(),y=d[0],C=d[1];if(y&&C){var k=y.split(`
`),ct=C.split(`
`);for(f=l=0;l<k.length&&!k[l].includes("DetermineComponentFrameRoot");)l++;for(;f<ct.length&&!ct[f].includes("DetermineComponentFrameRoot");)f++;if(l===k.length||f===ct.length)for(l=k.length-1,f=ct.length-1;1<=l&&0<=f&&k[l]!==ct[f];)f--;for(;1<=l&&0<=f;l--,f--)if(k[l]!==ct[f]){if(l!==1||f!==1)do if(l--,f--,0>f||k[l]!==ct[f]){var St=`
`+k[l].replace(" at new "," at ");return e.displayName&&St.includes("<anonymous>")&&(St=St.replace("<anonymous>",e.displayName)),St}while(1<=l&&0<=f);break}}}finally{wt=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?yt(s):""}function Lt(e,i){switch(e.tag){case 26:case 27:case 5:return yt(e.type);case 16:return yt("Lazy");case 13:return e.child!==i&&i!==null?yt("Suspense Fallback"):yt("Suspense");case 19:return yt("SuspenseList");case 0:case 15:return Ut(e.type,!1);case 11:return Ut(e.type.render,!1);case 1:return Ut(e.type,!0);case 31:return yt("Activity");default:return""}}function $(e){try{var i="",s=null;do i+=Lt(e,s),s=e,e=e.return;while(e);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var xt=Object.prototype.hasOwnProperty,At=r.unstable_scheduleCallback,Ct=r.unstable_cancelCallback,$t=r.unstable_shouldYield,V=r.unstable_requestPaint,oe=r.unstable_now,le=r.unstable_getCurrentPriorityLevel,z=r.unstable_ImmediatePriority,b=r.unstable_UserBlockingPriority,tt=r.unstable_NormalPriority,ut=r.unstable_LowPriority,vt=r.unstable_IdlePriority,Nt=r.log,Bt=r.unstable_setDisableYieldValue,mt=null,_t=null;function It(e){if(typeof Nt=="function"&&Bt(e),_t&&typeof _t.setStrictMode=="function")try{_t.setStrictMode(mt,e)}catch{}}var Jt=Math.clz32?Math.clz32:re,Vt=Math.log,Ht=Math.LN2;function re(e){return e>>>=0,e===0?32:31-(Vt(e)/Ht|0)|0}var ce=256,pe=262144,Q=4194304;function zt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Mt(e,i,s){var l=e.pendingLanes;if(l===0)return 0;var f=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var C=l&134217727;return C!==0?(l=C&~d,l!==0?f=zt(l):(y&=C,y!==0?f=zt(y):s||(s=C&~e,s!==0&&(f=zt(s))))):(C=l&~d,C!==0?f=zt(C):y!==0?f=zt(y):s||(s=l&~e,s!==0&&(f=zt(s)))),f===0?0:i!==0&&i!==f&&(i&d)===0&&(d=f&-f,s=i&-i,d>=s||d===32&&(s&4194048)!==0)?i:f}function Ft(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Yt(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Tt(){var e=Q;return Q<<=1,(Q&62914560)===0&&(Q=4194304),e}function se(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function te(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function We(e,i,s,l,f,d){var y=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var C=e.entanglements,k=e.expirationTimes,ct=e.hiddenUpdates;for(s=y&~s;0<s;){var St=31-Jt(s),bt=1<<St;C[St]=0,k[St]=-1;var ft=ct[St];if(ft!==null)for(ct[St]=null,St=0;St<ft.length;St++){var pt=ft[St];pt!==null&&(pt.lane&=-536870913)}s&=~bt}l!==0&&Oe(e,l,0),d!==0&&f===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~i))}function Oe(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-Jt(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|s&261930}function qn(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var l=31-Jt(s),f=1<<l;f&i|e[l]&i&&(e[l]|=i),s&=~f}}function ii(e,i){var s=i&-i;return s=(s&42)!==0?1:Qr(s),(s&(e.suspendedLanes|i))!==0?0:s}function Qr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function jr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function $r(){var e=X.p;return e!==0?e:(e=window.event,e===void 0?32:cv(e.type))}function Xs(e,i){var s=X.p;try{return X.p=e,i()}finally{X.p=s}}var Gi=Math.random().toString(36).slice(2),hn="__reactFiber$"+Gi,wn="__reactProps$"+Gi,Yn="__reactContainer$"+Gi,cs="__reactEvents$"+Gi,Sl="__reactListeners$"+Gi,yl="__reactHandles$"+Gi,us="__reactResources$"+Gi,Ua="__reactMarker$"+Gi;function La(e){delete e[hn],delete e[wn],delete e[cs],delete e[Sl],delete e[yl]}function ea(e){var i=e[hn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Yn]||s[hn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=Yg(e);e!==null;){if(s=e[hn])return s;e=Yg(e)}return i}e=s,s=e.parentNode}return null}function na(e){if(e=e[hn]||e[Yn]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function fs(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Na(e){var i=e[us];return i||(i=e[us]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function dn(e){e[Ua]=!0}var Ml=new Set,to={};function w(e,i){Y(e,i),Y(e+"Capture",i)}function Y(e,i){for(to[e]=i,e=0;e<i.length;e++)Ml.add(i[e])}var ht=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),st={},rt={};function Xt(e){return xt.call(rt,e)?!0:xt.call(st,e)?!1:ht.test(e)?rt[e]=!0:(st[e]=!0,!1)}function Qt(e,i,s){if(Xt(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Gt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function Zt(e,i,s,l){if(l===null)e.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+l)}}function Kt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function _e(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Te(e,i,s){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,d=l.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return f.call(this)},set:function(y){s=""+y,d.call(this,y)}}),Object.defineProperty(e,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(y){s=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function ee(e){if(!e._valueTracker){var i=_e(e)?"checked":"value";e._valueTracker=Te(e,i,""+e[i])}}function Pe(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return e&&(l=_e(e)?e.checked?"true":"false":e.value),e=l,e!==s?(i.setValue(e),!0):!1}function je(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Je=/[\n"\\]/g;function ye(e){return e.replace(Je,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function pn(e,i,s,l,f,d,y,C){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Kt(i)):e.value!==""+Kt(i)&&(e.value=""+Kt(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?yn(e,y,Kt(i)):s!=null?yn(e,y,Kt(s)):l!=null&&e.removeAttribute("value"),f==null&&d!=null&&(e.defaultChecked=!!d),f!=null&&(e.checked=f&&typeof f!="function"&&typeof f!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?e.name=""+Kt(C):e.removeAttribute("name")}function jt(e,i,s,l,f,d,y,C){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),i!=null||s!=null){if(!(d!=="submit"&&d!=="reset"||i!=null)){ee(e);return}s=s!=null?""+Kt(s):"",i=i!=null?""+Kt(i):s,C||i===e.value||(e.value=i),e.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=C?e.checked:!!l,e.defaultChecked=!!l,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),ee(e)}function yn(e,i,s){i==="number"&&je(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function Me(e,i,s,l){if(e=e.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<e.length;s++)f=i.hasOwnProperty("$"+e[s].value),e[s].selected!==f&&(e[s].selected=f),f&&l&&(e[s].defaultSelected=!0)}else{for(s=""+Kt(s),i=null,f=0;f<e.length;f++){if(e[f].value===s){e[f].selected=!0,l&&(e[f].defaultSelected=!0);return}i!==null||e[f].disabled||(i=e[f])}i!==null&&(i.selected=!0)}}function Fn(e,i,s){if(i!=null&&(i=""+Kt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Kt(s):""}function ai(e,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(J(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Kt(i),e.defaultValue=s,l=e.textContent,l===s&&l!==""&&l!==null&&(e.value=l),ee(e)}function Hn(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var Oa=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Be(e,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,s):typeof s!="number"||s===0||Oa.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function nn(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&Be(e,f,l)}else for(var d in i)i.hasOwnProperty(d)&&Be(e,d,i[d])}function gi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qe=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Vi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Di(e){return Vi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function vi(){}var Tu=null;function Au(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ws=null,qs=null;function Bp(e){var i=na(e);if(i&&(e=i.stateNode)){var s=e[wn]||null;t:switch(e=i.stateNode,i.type){case"input":if(pn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+ye(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==e&&l.form===e.form){var f=l[wn]||null;if(!f)throw Error(a(90));pn(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===e.form&&Pe(l)}break t;case"textarea":Fn(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&Me(e,!!s.multiple,i,!1)}}}var wu=!1;function Fp(e,i,s){if(wu)return e(i,s);wu=!0;try{var l=e(i);return l}finally{if(wu=!1,(Ws!==null||qs!==null)&&(cc(),Ws&&(i=Ws,e=qs,qs=Ws=null,Bp(i),e)))for(i=0;i<e.length;i++)Bp(e[i])}}function eo(e,i){var s=e.stateNode;if(s===null)return null;var l=s[wn]||null;if(l===null)return null;s=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var ia=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ru=!1;if(ia)try{var no={};Object.defineProperty(no,"passive",{get:function(){Ru=!0}}),window.addEventListener("test",no,no),window.removeEventListener("test",no,no)}catch{Ru=!1}var Pa=null,Cu=null,El=null;function Hp(){if(El)return El;var e,i=Cu,s=i.length,l,f="value"in Pa?Pa.value:Pa.textContent,d=f.length;for(e=0;e<s&&i[e]===f[e];e++);var y=s-e;for(l=1;l<=y&&i[s-l]===f[d-l];l++);return El=f.slice(e,1<l?1-l:void 0)}function bl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Tl(){return!0}function Gp(){return!1}function Zn(e){function i(s,l,f,d,y){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var C in e)e.hasOwnProperty(C)&&(s=e[C],this[C]=s?s(d):d[C]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Tl:Gp,this.isPropagationStopped=Gp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Tl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Tl)},persist:function(){},isPersistent:Tl}),i}var hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Al=Zn(hs),io=_({},hs,{view:0,detail:0}),Ux=Zn(io),Du,Uu,ao,wl=_({},io,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ao&&(ao&&e.type==="mousemove"?(Du=e.screenX-ao.screenX,Uu=e.screenY-ao.screenY):Uu=Du=0,ao=e),Du)},movementY:function(e){return"movementY"in e?e.movementY:Uu}}),Vp=Zn(wl),Lx=_({},wl,{dataTransfer:0}),Nx=Zn(Lx),Ox=_({},io,{relatedTarget:0}),Lu=Zn(Ox),Px=_({},hs,{animationName:0,elapsedTime:0,pseudoElement:0}),Ix=Zn(Px),zx=_({},hs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Bx=Zn(zx),Fx=_({},hs,{data:0}),kp=Zn(Fx),Hx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Vx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Vx[e])?!!i[e]:!1}function Nu(){return kx}var Xx=_({},io,{key:function(e){if(e.key){var i=Hx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=bl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nu,charCode:function(e){return e.type==="keypress"?bl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?bl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Wx=Zn(Xx),qx=_({},wl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xp=Zn(qx),Yx=_({},io,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nu}),Zx=Zn(Yx),Kx=_({},hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Jx=Zn(Kx),Qx=_({},wl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),jx=Zn(Qx),$x=_({},hs,{newState:0,oldState:0}),tS=Zn($x),eS=[9,13,27,32],Ou=ia&&"CompositionEvent"in window,so=null;ia&&"documentMode"in document&&(so=document.documentMode);var nS=ia&&"TextEvent"in window&&!so,Wp=ia&&(!Ou||so&&8<so&&11>=so),qp=" ",Yp=!1;function Zp(e,i){switch(e){case"keyup":return eS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Kp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ys=!1;function iS(e,i){switch(e){case"compositionend":return Kp(i);case"keypress":return i.which!==32?null:(Yp=!0,qp);case"textInput":return e=i.data,e===qp&&Yp?null:e;default:return null}}function aS(e,i){if(Ys)return e==="compositionend"||!Ou&&Zp(e,i)?(e=Hp(),El=Cu=Pa=null,Ys=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Wp&&i.locale!=="ko"?null:i.data;default:return null}}var sS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!sS[e.type]:i==="textarea"}function Qp(e,i,s,l){Ws?qs?qs.push(l):qs=[l]:Ws=l,i=gc(i,"onChange"),0<i.length&&(s=new Al("onChange","change",null,s,l),e.push({event:s,listeners:i}))}var ro=null,oo=null;function rS(e){Ng(e,0)}function Rl(e){var i=fs(e);if(Pe(i))return e}function jp(e,i){if(e==="change")return i}var $p=!1;if(ia){var Pu;if(ia){var Iu="oninput"in document;if(!Iu){var tm=document.createElement("div");tm.setAttribute("oninput","return;"),Iu=typeof tm.oninput=="function"}Pu=Iu}else Pu=!1;$p=Pu&&(!document.documentMode||9<document.documentMode)}function em(){ro&&(ro.detachEvent("onpropertychange",nm),oo=ro=null)}function nm(e){if(e.propertyName==="value"&&Rl(oo)){var i=[];Qp(i,oo,e,Au(e)),Fp(rS,i)}}function oS(e,i,s){e==="focusin"?(em(),ro=i,oo=s,ro.attachEvent("onpropertychange",nm)):e==="focusout"&&em()}function lS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Rl(oo)}function cS(e,i){if(e==="click")return Rl(i)}function uS(e,i){if(e==="input"||e==="change")return Rl(i)}function fS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var si=typeof Object.is=="function"?Object.is:fS;function lo(e,i){if(si(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!xt.call(i,f)||!si(e[f],i[f]))return!1}return!0}function im(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function am(e,i){var s=im(e);e=0;for(var l;s;){if(s.nodeType===3){if(l=e+s.textContent.length,e<=i&&l>=i)return{node:s,offset:i-e};e=l}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=im(s)}}function sm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?sm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function rm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=je(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=je(e.document)}return i}function zu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var hS=ia&&"documentMode"in document&&11>=document.documentMode,Zs=null,Bu=null,co=null,Fu=!1;function om(e,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Fu||Zs==null||Zs!==je(l)||(l=Zs,"selectionStart"in l&&zu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),co&&lo(co,l)||(co=l,l=gc(Bu,"onSelect"),0<l.length&&(i=new Al("onSelect","select",null,i,s),e.push({event:i,listeners:l}),i.target=Zs)))}function ds(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var Ks={animationend:ds("Animation","AnimationEnd"),animationiteration:ds("Animation","AnimationIteration"),animationstart:ds("Animation","AnimationStart"),transitionrun:ds("Transition","TransitionRun"),transitionstart:ds("Transition","TransitionStart"),transitioncancel:ds("Transition","TransitionCancel"),transitionend:ds("Transition","TransitionEnd")},Hu={},lm={};ia&&(lm=document.createElement("div").style,"AnimationEvent"in window||(delete Ks.animationend.animation,delete Ks.animationiteration.animation,delete Ks.animationstart.animation),"TransitionEvent"in window||delete Ks.transitionend.transition);function ps(e){if(Hu[e])return Hu[e];if(!Ks[e])return e;var i=Ks[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in lm)return Hu[e]=i[s];return e}var cm=ps("animationend"),um=ps("animationiteration"),fm=ps("animationstart"),dS=ps("transitionrun"),pS=ps("transitionstart"),mS=ps("transitioncancel"),hm=ps("transitionend"),dm=new Map,Gu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Gu.push("scrollEnd");function Ui(e,i){dm.set(e,i),w(i,[e])}var Cl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},_i=[],Js=0,Vu=0;function Dl(){for(var e=Js,i=Vu=Js=0;i<e;){var s=_i[i];_i[i++]=null;var l=_i[i];_i[i++]=null;var f=_i[i];_i[i++]=null;var d=_i[i];if(_i[i++]=null,l!==null&&f!==null){var y=l.pending;y===null?f.next=f:(f.next=y.next,y.next=f),l.pending=f}d!==0&&pm(s,f,d)}}function Ul(e,i,s,l){_i[Js++]=e,_i[Js++]=i,_i[Js++]=s,_i[Js++]=l,Vu|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function ku(e,i,s,l){return Ul(e,i,s,l),Ll(e)}function ms(e,i){return Ul(e,null,null,i),Ll(e)}function pm(e,i,s){e.lanes|=s;var l=e.alternate;l!==null&&(l.lanes|=s);for(var f=!1,d=e.return;d!==null;)d.childLanes|=s,l=d.alternate,l!==null&&(l.childLanes|=s),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(f=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,f&&i!==null&&(f=31-Jt(s),e=d.hiddenUpdates,l=e[f],l===null?e[f]=[i]:l.push(i),i.lane=s|536870912),d):null}function Ll(e){if(50<Lo)throw Lo=0,$f=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var Qs={};function gS(e,i,s,l){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(e,i,s,l){return new gS(e,i,s,l)}function Xu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function aa(e,i){var s=e.alternate;return s===null?(s=ri(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function mm(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Nl(e,i,s,l,f,d){var y=0;if(l=e,typeof e=="function")Xu(e)&&(y=1);else if(typeof e=="string")y=yy(e,s,Rt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case N:return e=ri(31,s,i,f),e.elementType=N,e.lanes=d,e;case D:return gs(s.children,f,d,i);case M:y=8,f|=24;break;case S:return e=ri(12,s,i,f|2),e.elementType=S,e.lanes=d,e;case P:return e=ri(13,s,i,f),e.elementType=P,e.lanes=d,e;case R:return e=ri(19,s,i,f),e.elementType=R,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case I:y=10;break t;case O:y=9;break t;case A:y=11;break t;case L:y=14;break t;case E:y=16,l=null;break t}y=29,s=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=ri(y,s,i,f),i.elementType=e,i.type=l,i.lanes=d,i}function gs(e,i,s,l){return e=ri(7,e,l,i),e.lanes=s,e}function Wu(e,i,s){return e=ri(6,e,null,i),e.lanes=s,e}function gm(e){var i=ri(18,null,null,0);return i.stateNode=e,i}function qu(e,i,s){return i=ri(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var vm=new WeakMap;function xi(e,i){if(typeof e=="object"&&e!==null){var s=vm.get(e);return s!==void 0?s:(i={value:e,source:i,stack:$(i)},vm.set(e,i),i)}return{value:e,source:i,stack:$(i)}}var js=[],$s=0,Ol=null,uo=0,Si=[],yi=0,Ia=null,ki=1,Xi="";function sa(e,i){js[$s++]=uo,js[$s++]=Ol,Ol=e,uo=i}function _m(e,i,s){Si[yi++]=ki,Si[yi++]=Xi,Si[yi++]=Ia,Ia=e;var l=ki;e=Xi;var f=32-Jt(l)-1;l&=~(1<<f),s+=1;var d=32-Jt(i)+f;if(30<d){var y=f-f%5;d=(l&(1<<y)-1).toString(32),l>>=y,f-=y,ki=1<<32-Jt(i)+f|s<<f|l,Xi=d+e}else ki=1<<d|s<<f|l,Xi=e}function Yu(e){e.return!==null&&(sa(e,1),_m(e,1,0))}function Zu(e){for(;e===Ol;)Ol=js[--$s],js[$s]=null,uo=js[--$s],js[$s]=null;for(;e===Ia;)Ia=Si[--yi],Si[yi]=null,Xi=Si[--yi],Si[yi]=null,ki=Si[--yi],Si[yi]=null}function xm(e,i){Si[yi++]=ki,Si[yi++]=Xi,Si[yi++]=Ia,ki=i.id,Xi=i.overflow,Ia=e}var Rn=null,$e=null,De=!1,za=null,Mi=!1,Ku=Error(a(519));function Ba(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw fo(xi(i,e)),Ku}function Sm(e){var i=e.stateNode,s=e.type,l=e.memoizedProps;switch(i[hn]=e,i[wn]=l,s){case"dialog":we("cancel",i),we("close",i);break;case"iframe":case"object":case"embed":we("load",i);break;case"video":case"audio":for(s=0;s<Oo.length;s++)we(Oo[s],i);break;case"source":we("error",i);break;case"img":case"image":case"link":we("error",i),we("load",i);break;case"details":we("toggle",i);break;case"input":we("invalid",i),jt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":we("invalid",i);break;case"textarea":we("invalid",i),ai(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||zg(i.textContent,s)?(l.popover!=null&&(we("beforetoggle",i),we("toggle",i)),l.onScroll!=null&&we("scroll",i),l.onScrollEnd!=null&&we("scrollend",i),l.onClick!=null&&(i.onclick=vi),i=!0):i=!1,i||Ba(e,!0)}function ym(e){for(Rn=e.return;Rn;)switch(Rn.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:Rn=Rn.return}}function tr(e){if(e!==Rn)return!1;if(!De)return ym(e),De=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||ph(e.type,e.memoizedProps)),s=!s),s&&$e&&Ba(e),ym(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));$e=qg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));$e=qg(e)}else i===27?(i=$e,ja(e.type)?(e=xh,xh=null,$e=e):$e=i):$e=Rn?bi(e.stateNode.nextSibling):null;return!0}function vs(){$e=Rn=null,De=!1}function Ju(){var e=za;return e!==null&&(jn===null?jn=e:jn.push.apply(jn,e),za=null),e}function fo(e){za===null?za=[e]:za.push(e)}var Qu=U(null),_s=null,ra=null;function Fa(e,i,s){dt(Qu,i._currentValue),i._currentValue=s}function oa(e){e._currentValue=Qu.current,j(Qu)}function ju(e,i,s){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===s)break;e=e.return}}function $u(e,i,s,l){var f=e.child;for(f!==null&&(f.return=e);f!==null;){var d=f.dependencies;if(d!==null){var y=f.child;d=d.firstContext;t:for(;d!==null;){var C=d;d=f;for(var k=0;k<i.length;k++)if(C.context===i[k]){d.lanes|=s,C=d.alternate,C!==null&&(C.lanes|=s),ju(d.return,s,e),l||(y=null);break t}d=C.next}}else if(f.tag===18){if(y=f.return,y===null)throw Error(a(341));y.lanes|=s,d=y.alternate,d!==null&&(d.lanes|=s),ju(y,s,e),y=null}else y=f.child;if(y!==null)y.return=f;else for(y=f;y!==null;){if(y===e){y=null;break}if(f=y.sibling,f!==null){f.return=y.return,y=f;break}y=y.return}f=y}}function er(e,i,s,l){e=null;for(var f=i,d=!1;f!==null;){if(!d){if((f.flags&524288)!==0)d=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var y=f.alternate;if(y===null)throw Error(a(387));if(y=y.memoizedProps,y!==null){var C=f.type;si(f.pendingProps.value,y.value)||(e!==null?e.push(C):e=[C])}}else if(f===at.current){if(y=f.alternate,y===null)throw Error(a(387));y.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(e!==null?e.push(Fo):e=[Fo])}f=f.return}e!==null&&$u(i,e,s,l),i.flags|=262144}function Pl(e){for(e=e.firstContext;e!==null;){if(!si(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function xs(e){_s=e,ra=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Cn(e){return Mm(_s,e)}function Il(e,i){return _s===null&&xs(e),Mm(e,i)}function Mm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ra===null){if(e===null)throw Error(a(308));ra=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ra=ra.next=i;return s}var vS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},_S=r.unstable_scheduleCallback,xS=r.unstable_NormalPriority,mn={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function tf(){return{controller:new vS,data:new Map,refCount:0}}function ho(e){e.refCount--,e.refCount===0&&_S(xS,function(){e.controller.abort()})}var po=null,ef=0,nr=0,ir=null;function SS(e,i){if(po===null){var s=po=[];ef=0,nr=sh(),ir={status:"pending",value:void 0,then:function(l){s.push(l)}}}return ef++,i.then(Em,Em),i}function Em(){if(--ef===0&&po!==null){ir!==null&&(ir.status="fulfilled");var e=po;po=null,nr=0,ir=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function yS(e,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var bm=B.S;B.S=function(e,i){og=oe(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&SS(e,i),bm!==null&&bm(e,i)};var Ss=U(null);function nf(){var e=Ss.current;return e!==null?e:Qe.pooledCache}function zl(e,i){i===null?dt(Ss,Ss.current):dt(Ss,i.pool)}function Tm(){var e=nf();return e===null?null:{parent:mn._currentValue,pool:e}}var ar=Error(a(460)),af=Error(a(474)),Bl=Error(a(542)),Fl={then:function(){}};function Am(e){return e=e.status,e==="fulfilled"||e==="rejected"}function wm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(vi,vi),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Cm(e),e;default:if(typeof i.status=="string")i.then(vi,vi);else{if(e=Qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Cm(e),e}throw Ms=i,ar}}function ys(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Ms=s,ar):s}}var Ms=null;function Rm(){if(Ms===null)throw Error(a(459));var e=Ms;return Ms=null,e}function Cm(e){if(e===ar||e===Bl)throw Error(a(483))}var sr=null,mo=0;function Hl(e){var i=mo;return mo+=1,sr===null&&(sr=[]),wm(sr,e,i)}function go(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Gl(e,i){throw i.$$typeof===g?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Dm(e){function i(et,Z){if(e){var lt=et.deletions;lt===null?(et.deletions=[Z],et.flags|=16):lt.push(Z)}}function s(et,Z){if(!e)return null;for(;Z!==null;)i(et,Z),Z=Z.sibling;return null}function l(et){for(var Z=new Map;et!==null;)et.key!==null?Z.set(et.key,et):Z.set(et.index,et),et=et.sibling;return Z}function f(et,Z){return et=aa(et,Z),et.index=0,et.sibling=null,et}function d(et,Z,lt){return et.index=lt,e?(lt=et.alternate,lt!==null?(lt=lt.index,lt<Z?(et.flags|=67108866,Z):lt):(et.flags|=67108866,Z)):(et.flags|=1048576,Z)}function y(et){return e&&et.alternate===null&&(et.flags|=67108866),et}function C(et,Z,lt,Et){return Z===null||Z.tag!==6?(Z=Wu(lt,et.mode,Et),Z.return=et,Z):(Z=f(Z,lt),Z.return=et,Z)}function k(et,Z,lt,Et){var fe=lt.type;return fe===D?St(et,Z,lt.props.children,Et,lt.key):Z!==null&&(Z.elementType===fe||typeof fe=="object"&&fe!==null&&fe.$$typeof===E&&ys(fe)===Z.type)?(Z=f(Z,lt.props),go(Z,lt),Z.return=et,Z):(Z=Nl(lt.type,lt.key,lt.props,null,et.mode,Et),go(Z,lt),Z.return=et,Z)}function ct(et,Z,lt,Et){return Z===null||Z.tag!==4||Z.stateNode.containerInfo!==lt.containerInfo||Z.stateNode.implementation!==lt.implementation?(Z=qu(lt,et.mode,Et),Z.return=et,Z):(Z=f(Z,lt.children||[]),Z.return=et,Z)}function St(et,Z,lt,Et,fe){return Z===null||Z.tag!==7?(Z=gs(lt,et.mode,Et,fe),Z.return=et,Z):(Z=f(Z,lt),Z.return=et,Z)}function bt(et,Z,lt){if(typeof Z=="string"&&Z!==""||typeof Z=="number"||typeof Z=="bigint")return Z=Wu(""+Z,et.mode,lt),Z.return=et,Z;if(typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case x:return lt=Nl(Z.type,Z.key,Z.props,null,et.mode,lt),go(lt,Z),lt.return=et,lt;case T:return Z=qu(Z,et.mode,lt),Z.return=et,Z;case E:return Z=ys(Z),bt(et,Z,lt)}if(J(Z)||q(Z))return Z=gs(Z,et.mode,lt,null),Z.return=et,Z;if(typeof Z.then=="function")return bt(et,Hl(Z),lt);if(Z.$$typeof===I)return bt(et,Il(et,Z),lt);Gl(et,Z)}return null}function ft(et,Z,lt,Et){var fe=Z!==null?Z.key:null;if(typeof lt=="string"&&lt!==""||typeof lt=="number"||typeof lt=="bigint")return fe!==null?null:C(et,Z,""+lt,Et);if(typeof lt=="object"&&lt!==null){switch(lt.$$typeof){case x:return lt.key===fe?k(et,Z,lt,Et):null;case T:return lt.key===fe?ct(et,Z,lt,Et):null;case E:return lt=ys(lt),ft(et,Z,lt,Et)}if(J(lt)||q(lt))return fe!==null?null:St(et,Z,lt,Et,null);if(typeof lt.then=="function")return ft(et,Z,Hl(lt),Et);if(lt.$$typeof===I)return ft(et,Z,Il(et,lt),Et);Gl(et,lt)}return null}function pt(et,Z,lt,Et,fe){if(typeof Et=="string"&&Et!==""||typeof Et=="number"||typeof Et=="bigint")return et=et.get(lt)||null,C(Z,et,""+Et,fe);if(typeof Et=="object"&&Et!==null){switch(Et.$$typeof){case x:return et=et.get(Et.key===null?lt:Et.key)||null,k(Z,et,Et,fe);case T:return et=et.get(Et.key===null?lt:Et.key)||null,ct(Z,et,Et,fe);case E:return Et=ys(Et),pt(et,Z,lt,Et,fe)}if(J(Et)||q(Et))return et=et.get(lt)||null,St(Z,et,Et,fe,null);if(typeof Et.then=="function")return pt(et,Z,lt,Hl(Et),fe);if(Et.$$typeof===I)return pt(et,Z,lt,Il(Z,Et),fe);Gl(Z,Et)}return null}function ne(et,Z,lt,Et){for(var fe=null,Ie=null,ae=Z,Se=Z=0,Ce=null;ae!==null&&Se<lt.length;Se++){ae.index>Se?(Ce=ae,ae=null):Ce=ae.sibling;var ze=ft(et,ae,lt[Se],Et);if(ze===null){ae===null&&(ae=Ce);break}e&&ae&&ze.alternate===null&&i(et,ae),Z=d(ze,Z,Se),Ie===null?fe=ze:Ie.sibling=ze,Ie=ze,ae=Ce}if(Se===lt.length)return s(et,ae),De&&sa(et,Se),fe;if(ae===null){for(;Se<lt.length;Se++)ae=bt(et,lt[Se],Et),ae!==null&&(Z=d(ae,Z,Se),Ie===null?fe=ae:Ie.sibling=ae,Ie=ae);return De&&sa(et,Se),fe}for(ae=l(ae);Se<lt.length;Se++)Ce=pt(ae,et,Se,lt[Se],Et),Ce!==null&&(e&&Ce.alternate!==null&&ae.delete(Ce.key===null?Se:Ce.key),Z=d(Ce,Z,Se),Ie===null?fe=Ce:Ie.sibling=Ce,Ie=Ce);return e&&ae.forEach(function(is){return i(et,is)}),De&&sa(et,Se),fe}function he(et,Z,lt,Et){if(lt==null)throw Error(a(151));for(var fe=null,Ie=null,ae=Z,Se=Z=0,Ce=null,ze=lt.next();ae!==null&&!ze.done;Se++,ze=lt.next()){ae.index>Se?(Ce=ae,ae=null):Ce=ae.sibling;var is=ft(et,ae,ze.value,Et);if(is===null){ae===null&&(ae=Ce);break}e&&ae&&is.alternate===null&&i(et,ae),Z=d(is,Z,Se),Ie===null?fe=is:Ie.sibling=is,Ie=is,ae=Ce}if(ze.done)return s(et,ae),De&&sa(et,Se),fe;if(ae===null){for(;!ze.done;Se++,ze=lt.next())ze=bt(et,ze.value,Et),ze!==null&&(Z=d(ze,Z,Se),Ie===null?fe=ze:Ie.sibling=ze,Ie=ze);return De&&sa(et,Se),fe}for(ae=l(ae);!ze.done;Se++,ze=lt.next())ze=pt(ae,et,Se,ze.value,Et),ze!==null&&(e&&ze.alternate!==null&&ae.delete(ze.key===null?Se:ze.key),Z=d(ze,Z,Se),Ie===null?fe=ze:Ie.sibling=ze,Ie=ze);return e&&ae.forEach(function(Ly){return i(et,Ly)}),De&&sa(et,Se),fe}function Ke(et,Z,lt,Et){if(typeof lt=="object"&&lt!==null&&lt.type===D&&lt.key===null&&(lt=lt.props.children),typeof lt=="object"&&lt!==null){switch(lt.$$typeof){case x:t:{for(var fe=lt.key;Z!==null;){if(Z.key===fe){if(fe=lt.type,fe===D){if(Z.tag===7){s(et,Z.sibling),Et=f(Z,lt.props.children),Et.return=et,et=Et;break t}}else if(Z.elementType===fe||typeof fe=="object"&&fe!==null&&fe.$$typeof===E&&ys(fe)===Z.type){s(et,Z.sibling),Et=f(Z,lt.props),go(Et,lt),Et.return=et,et=Et;break t}s(et,Z);break}else i(et,Z);Z=Z.sibling}lt.type===D?(Et=gs(lt.props.children,et.mode,Et,lt.key),Et.return=et,et=Et):(Et=Nl(lt.type,lt.key,lt.props,null,et.mode,Et),go(Et,lt),Et.return=et,et=Et)}return y(et);case T:t:{for(fe=lt.key;Z!==null;){if(Z.key===fe)if(Z.tag===4&&Z.stateNode.containerInfo===lt.containerInfo&&Z.stateNode.implementation===lt.implementation){s(et,Z.sibling),Et=f(Z,lt.children||[]),Et.return=et,et=Et;break t}else{s(et,Z);break}else i(et,Z);Z=Z.sibling}Et=qu(lt,et.mode,Et),Et.return=et,et=Et}return y(et);case E:return lt=ys(lt),Ke(et,Z,lt,Et)}if(J(lt))return ne(et,Z,lt,Et);if(q(lt)){if(fe=q(lt),typeof fe!="function")throw Error(a(150));return lt=fe.call(lt),he(et,Z,lt,Et)}if(typeof lt.then=="function")return Ke(et,Z,Hl(lt),Et);if(lt.$$typeof===I)return Ke(et,Z,Il(et,lt),Et);Gl(et,lt)}return typeof lt=="string"&&lt!==""||typeof lt=="number"||typeof lt=="bigint"?(lt=""+lt,Z!==null&&Z.tag===6?(s(et,Z.sibling),Et=f(Z,lt),Et.return=et,et=Et):(s(et,Z),Et=Wu(lt,et.mode,Et),Et.return=et,et=Et),y(et)):s(et,Z)}return function(et,Z,lt,Et){try{mo=0;var fe=Ke(et,Z,lt,Et);return sr=null,fe}catch(ae){if(ae===ar||ae===Bl)throw ae;var Ie=ri(29,ae,null,et.mode);return Ie.lanes=Et,Ie.return=et,Ie}finally{}}}var Es=Dm(!0),Um=Dm(!1),Ha=!1;function sf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function rf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ga(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Va(e,i,s){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(Fe&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=Ll(e),pm(e,null,s),i}return Ul(e,l,i,s),Ll(e)}function vo(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,qn(e,s)}}function of(e,i){var s=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,d=null;if(s=s.firstBaseUpdate,s!==null){do{var y={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};d===null?f=d=y:d=d.next=y,s=s.next}while(s!==null);d===null?f=d=i:d=d.next=i}else f=d=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:d,shared:l.shared,callbacks:l.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var lf=!1;function _o(){if(lf){var e=ir;if(e!==null)throw e}}function xo(e,i,s,l){lf=!1;var f=e.updateQueue;Ha=!1;var d=f.firstBaseUpdate,y=f.lastBaseUpdate,C=f.shared.pending;if(C!==null){f.shared.pending=null;var k=C,ct=k.next;k.next=null,y===null?d=ct:y.next=ct,y=k;var St=e.alternate;St!==null&&(St=St.updateQueue,C=St.lastBaseUpdate,C!==y&&(C===null?St.firstBaseUpdate=ct:C.next=ct,St.lastBaseUpdate=k))}if(d!==null){var bt=f.baseState;y=0,St=ct=k=null,C=d;do{var ft=C.lane&-536870913,pt=ft!==C.lane;if(pt?(Re&ft)===ft:(l&ft)===ft){ft!==0&&ft===nr&&(lf=!0),St!==null&&(St=St.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});t:{var ne=e,he=C;ft=i;var Ke=s;switch(he.tag){case 1:if(ne=he.payload,typeof ne=="function"){bt=ne.call(Ke,bt,ft);break t}bt=ne;break t;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=he.payload,ft=typeof ne=="function"?ne.call(Ke,bt,ft):ne,ft==null)break t;bt=_({},bt,ft);break t;case 2:Ha=!0}}ft=C.callback,ft!==null&&(e.flags|=64,pt&&(e.flags|=8192),pt=f.callbacks,pt===null?f.callbacks=[ft]:pt.push(ft))}else pt={lane:ft,tag:C.tag,payload:C.payload,callback:C.callback,next:null},St===null?(ct=St=pt,k=bt):St=St.next=pt,y|=ft;if(C=C.next,C===null){if(C=f.shared.pending,C===null)break;pt=C,C=pt.next,pt.next=null,f.lastBaseUpdate=pt,f.shared.pending=null}}while(!0);St===null&&(k=bt),f.baseState=k,f.firstBaseUpdate=ct,f.lastBaseUpdate=St,d===null&&(f.shared.lanes=0),Ya|=y,e.lanes=y,e.memoizedState=bt}}function Lm(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function Nm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Lm(s[e],i)}var rr=U(null),Vl=U(0);function Om(e,i){e=ga,dt(Vl,e),dt(rr,i),ga=e|i.baseLanes}function cf(){dt(Vl,ga),dt(rr,rr.current)}function uf(){ga=Vl.current,j(rr),j(Vl)}var oi=U(null),Ei=null;function ka(e){var i=e.alternate;dt(cn,cn.current&1),dt(oi,e),Ei===null&&(i===null||rr.current!==null||i.memoizedState!==null)&&(Ei=e)}function ff(e){dt(cn,cn.current),dt(oi,e),Ei===null&&(Ei=e)}function Pm(e){e.tag===22?(dt(cn,cn.current),dt(oi,e),Ei===null&&(Ei=e)):Xa()}function Xa(){dt(cn,cn.current),dt(oi,oi.current)}function li(e){j(oi),Ei===e&&(Ei=null),j(cn)}var cn=U(0);function kl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||vh(s)||_h(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var la=0,xe=null,Ye=null,gn=null,Xl=!1,or=!1,bs=!1,Wl=0,So=0,lr=null,MS=0;function rn(){throw Error(a(321))}function hf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!si(e[s],i[s]))return!1;return!0}function df(e,i,s,l,f,d){return la=d,xe=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,B.H=e===null||e.memoizedState===null?_0:Rf,bs=!1,d=s(l,f),bs=!1,or&&(d=zm(i,s,l,f)),Im(e),d}function Im(e){B.H=Eo;var i=Ye!==null&&Ye.next!==null;if(la=0,gn=Ye=xe=null,Xl=!1,So=0,lr=null,i)throw Error(a(300));e===null||vn||(e=e.dependencies,e!==null&&Pl(e)&&(vn=!0))}function zm(e,i,s,l){xe=e;var f=0;do{if(or&&(lr=null),So=0,or=!1,25<=f)throw Error(a(301));if(f+=1,gn=Ye=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}B.H=x0,d=i(s,l)}while(or);return d}function ES(){var e=B.H,i=e.useState()[0];return i=typeof i.then=="function"?yo(i):i,e=e.useState()[0],(Ye!==null?Ye.memoizedState:null)!==e&&(xe.flags|=1024),i}function pf(){var e=Wl!==0;return Wl=0,e}function mf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function gf(e){if(Xl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Xl=!1}la=0,gn=Ye=xe=null,or=!1,So=Wl=0,lr=null}function Gn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gn===null?xe.memoizedState=gn=e:gn=gn.next=e,gn}function un(){if(Ye===null){var e=xe.alternate;e=e!==null?e.memoizedState:null}else e=Ye.next;var i=gn===null?xe.memoizedState:gn.next;if(i!==null)gn=i,Ye=e;else{if(e===null)throw xe.alternate===null?Error(a(467)):Error(a(310));Ye=e,e={memoizedState:Ye.memoizedState,baseState:Ye.baseState,baseQueue:Ye.baseQueue,queue:Ye.queue,next:null},gn===null?xe.memoizedState=gn=e:gn=gn.next=e}return gn}function ql(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function yo(e){var i=So;return So+=1,lr===null&&(lr=[]),e=wm(lr,e,i),i=xe,(gn===null?i.memoizedState:gn.next)===null&&(i=i.alternate,B.H=i===null||i.memoizedState===null?_0:Rf),e}function Yl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return yo(e);if(e.$$typeof===I)return Cn(e)}throw Error(a(438,String(e)))}function vf(e){var i=null,s=xe.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=xe.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=ql(),xe.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),l=0;l<e;l++)s[l]=F;return i.index++,s}function ca(e,i){return typeof i=="function"?i(e):i}function Zl(e){var i=un();return _f(i,Ye,e)}function _f(e,i,s){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=e.baseQueue,d=l.pending;if(d!==null){if(f!==null){var y=f.next;f.next=d.next,d.next=y}i.baseQueue=f=d,l.pending=null}if(d=e.baseState,f===null)e.memoizedState=d;else{i=f.next;var C=y=null,k=null,ct=i,St=!1;do{var bt=ct.lane&-536870913;if(bt!==ct.lane?(Re&bt)===bt:(la&bt)===bt){var ft=ct.revertLane;if(ft===0)k!==null&&(k=k.next={lane:0,revertLane:0,gesture:null,action:ct.action,hasEagerState:ct.hasEagerState,eagerState:ct.eagerState,next:null}),bt===nr&&(St=!0);else if((la&ft)===ft){ct=ct.next,ft===nr&&(St=!0);continue}else bt={lane:0,revertLane:ct.revertLane,gesture:null,action:ct.action,hasEagerState:ct.hasEagerState,eagerState:ct.eagerState,next:null},k===null?(C=k=bt,y=d):k=k.next=bt,xe.lanes|=ft,Ya|=ft;bt=ct.action,bs&&s(d,bt),d=ct.hasEagerState?ct.eagerState:s(d,bt)}else ft={lane:bt,revertLane:ct.revertLane,gesture:ct.gesture,action:ct.action,hasEagerState:ct.hasEagerState,eagerState:ct.eagerState,next:null},k===null?(C=k=ft,y=d):k=k.next=ft,xe.lanes|=bt,Ya|=bt;ct=ct.next}while(ct!==null&&ct!==i);if(k===null?y=d:k.next=C,!si(d,e.memoizedState)&&(vn=!0,St&&(s=ir,s!==null)))throw s;e.memoizedState=d,e.baseState=y,e.baseQueue=k,l.lastRenderedState=d}return f===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function xf(e){var i=un(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var l=s.dispatch,f=s.pending,d=i.memoizedState;if(f!==null){s.pending=null;var y=f=f.next;do d=e(d,y.action),y=y.next;while(y!==f);si(d,i.memoizedState)||(vn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),s.lastRenderedState=d}return[d,l]}function Bm(e,i,s){var l=xe,f=un(),d=De;if(d){if(s===void 0)throw Error(a(407));s=s()}else s=i();var y=!si((Ye||f).memoizedState,s);if(y&&(f.memoizedState=s,vn=!0),f=f.queue,Mf(Gm.bind(null,l,f,e),[e]),f.getSnapshot!==i||y||gn!==null&&gn.memoizedState.tag&1){if(l.flags|=2048,cr(9,{destroy:void 0},Hm.bind(null,l,f,s,i),null),Qe===null)throw Error(a(349));d||(la&127)!==0||Fm(l,i,s)}return s}function Fm(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=xe.updateQueue,i===null?(i=ql(),xe.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Hm(e,i,s,l){i.value=s,i.getSnapshot=l,Vm(i)&&km(e)}function Gm(e,i,s){return s(function(){Vm(i)&&km(e)})}function Vm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!si(e,s)}catch{return!0}}function km(e){var i=ms(e,2);i!==null&&$n(i,e,2)}function Sf(e){var i=Gn();if(typeof e=="function"){var s=e;if(e=s(),bs){It(!0);try{s()}finally{It(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:e},i}function Xm(e,i,s,l){return e.baseState=s,_f(e,Ye,typeof l=="function"?l:ca)}function bS(e,i,s,l,f){if(Ql(e))throw Error(a(485));if(e=i.action,e!==null){var d={payload:f,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};B.T!==null?s(!0):d.isTransition=!1,l(d),s=i.pending,s===null?(d.next=i.pending=d,Wm(i,d)):(d.next=s.next,i.pending=s.next=d)}}function Wm(e,i){var s=i.action,l=i.payload,f=e.state;if(i.isTransition){var d=B.T,y={};B.T=y;try{var C=s(f,l),k=B.S;k!==null&&k(y,C),qm(e,i,C)}catch(ct){yf(e,i,ct)}finally{d!==null&&y.types!==null&&(d.types=y.types),B.T=d}}else try{d=s(f,l),qm(e,i,d)}catch(ct){yf(e,i,ct)}}function qm(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){Ym(e,i,l)},function(l){return yf(e,i,l)}):Ym(e,i,s)}function Ym(e,i,s){i.status="fulfilled",i.value=s,Zm(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Wm(e,s)))}function yf(e,i,s){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,Zm(i),i=i.next;while(i!==l)}e.action=null}function Zm(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Km(e,i){return i}function Jm(e,i){if(De){var s=Qe.formState;if(s!==null){t:{var l=xe;if(De){if($e){e:{for(var f=$e,d=Mi;f.nodeType!==8;){if(!d){f=null;break e}if(f=bi(f.nextSibling),f===null){f=null;break e}}d=f.data,f=d==="F!"||d==="F"?f:null}if(f){$e=bi(f.nextSibling),l=f.data==="F!";break t}}Ba(l)}l=!1}l&&(i=s[0])}}return s=Gn(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Km,lastRenderedState:i},s.queue=l,s=m0.bind(null,xe,l),l.dispatch=s,l=Sf(!1),d=wf.bind(null,xe,!1,l.queue),l=Gn(),f={state:i,dispatch:null,action:e,pending:null},l.queue=f,s=bS.bind(null,xe,f,d,s),f.dispatch=s,l.memoizedState=e,[i,s,!1]}function Qm(e){var i=un();return jm(i,Ye,e)}function jm(e,i,s){if(i=_f(e,i,Km)[0],e=Zl(ca)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=yo(i)}catch(y){throw y===ar?Bl:y}else l=i;i=un();var f=i.queue,d=f.dispatch;return s!==i.memoizedState&&(xe.flags|=2048,cr(9,{destroy:void 0},TS.bind(null,f,s),null)),[l,d,e]}function TS(e,i){e.action=i}function $m(e){var i=un(),s=Ye;if(s!==null)return jm(i,s,e);un(),i=i.memoizedState,s=un();var l=s.queue.dispatch;return s.memoizedState=e,[i,l,!1]}function cr(e,i,s,l){return e={tag:e,create:s,deps:l,inst:i,next:null},i=xe.updateQueue,i===null&&(i=ql(),xe.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(l=s.next,s.next=e,e.next=l,i.lastEffect=e),e}function t0(){return un().memoizedState}function Kl(e,i,s,l){var f=Gn();xe.flags|=e,f.memoizedState=cr(1|i,{destroy:void 0},s,l===void 0?null:l)}function Jl(e,i,s,l){var f=un();l=l===void 0?null:l;var d=f.memoizedState.inst;Ye!==null&&l!==null&&hf(l,Ye.memoizedState.deps)?f.memoizedState=cr(i,d,s,l):(xe.flags|=e,f.memoizedState=cr(1|i,d,s,l))}function e0(e,i){Kl(8390656,8,e,i)}function Mf(e,i){Jl(2048,8,e,i)}function AS(e){xe.flags|=4;var i=xe.updateQueue;if(i===null)i=ql(),xe.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function n0(e){var i=un().memoizedState;return AS({ref:i,nextImpl:e}),function(){if((Fe&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function i0(e,i){return Jl(4,2,e,i)}function a0(e,i){return Jl(4,4,e,i)}function s0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function r0(e,i,s){s=s!=null?s.concat([e]):null,Jl(4,4,s0.bind(null,i,e),s)}function Ef(){}function o0(e,i){var s=un();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&hf(i,l[1])?l[0]:(s.memoizedState=[e,i],e)}function l0(e,i){var s=un();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&hf(i,l[1]))return l[0];if(l=e(),bs){It(!0);try{e()}finally{It(!1)}}return s.memoizedState=[l,i],l}function bf(e,i,s){return s===void 0||(la&1073741824)!==0&&(Re&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=cg(),xe.lanes|=e,Ya|=e,s)}function c0(e,i,s,l){return si(s,i)?s:rr.current!==null?(e=bf(e,s,l),si(e,i)||(vn=!0),e):(la&42)===0||(la&1073741824)!==0&&(Re&261930)===0?(vn=!0,e.memoizedState=s):(e=cg(),xe.lanes|=e,Ya|=e,i)}function u0(e,i,s,l,f){var d=X.p;X.p=d!==0&&8>d?d:8;var y=B.T,C={};B.T=C,wf(e,!1,i,s);try{var k=f(),ct=B.S;if(ct!==null&&ct(C,k),k!==null&&typeof k=="object"&&typeof k.then=="function"){var St=yS(k,l);Mo(e,i,St,fi(e))}else Mo(e,i,l,fi(e))}catch(bt){Mo(e,i,{then:function(){},status:"rejected",reason:bt},fi())}finally{X.p=d,y!==null&&C.types!==null&&(y.types=C.types),B.T=y}}function wS(){}function Tf(e,i,s,l){if(e.tag!==5)throw Error(a(476));var f=f0(e).queue;u0(e,f,i,nt,s===null?wS:function(){return h0(e),s(l)})}function f0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:nt,baseState:nt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:nt},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function h0(e){var i=f0(e);i.next===null&&(i=e.alternate.memoizedState),Mo(e,i.next.queue,{},fi())}function Af(){return Cn(Fo)}function d0(){return un().memoizedState}function p0(){return un().memoizedState}function RS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=fi();e=Ga(s);var l=Va(i,e,s);l!==null&&($n(l,i,s),vo(l,i,s)),i={cache:tf()},e.payload=i;return}i=i.return}}function CS(e,i,s){var l=fi();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Ql(e)?g0(i,s):(s=ku(e,i,s,l),s!==null&&($n(s,e,l),v0(s,i,l)))}function m0(e,i,s){var l=fi();Mo(e,i,s,l)}function Mo(e,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Ql(e))g0(i,f);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var y=i.lastRenderedState,C=d(y,s);if(f.hasEagerState=!0,f.eagerState=C,si(C,y))return Ul(e,i,f,0),Qe===null&&Dl(),!1}catch{}finally{}if(s=ku(e,i,f,l),s!==null)return $n(s,e,l),v0(s,i,l),!0}return!1}function wf(e,i,s,l){if(l={lane:2,revertLane:sh(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Ql(e)){if(i)throw Error(a(479))}else i=ku(e,s,l,2),i!==null&&$n(i,e,2)}function Ql(e){var i=e.alternate;return e===xe||i!==null&&i===xe}function g0(e,i){or=Xl=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function v0(e,i,s){if((s&4194048)!==0){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,qn(e,s)}}var Eo={readContext:Cn,use:Yl,useCallback:rn,useContext:rn,useEffect:rn,useImperativeHandle:rn,useLayoutEffect:rn,useInsertionEffect:rn,useMemo:rn,useReducer:rn,useRef:rn,useState:rn,useDebugValue:rn,useDeferredValue:rn,useTransition:rn,useSyncExternalStore:rn,useId:rn,useHostTransitionStatus:rn,useFormState:rn,useActionState:rn,useOptimistic:rn,useMemoCache:rn,useCacheRefresh:rn};Eo.useEffectEvent=rn;var _0={readContext:Cn,use:Yl,useCallback:function(e,i){return Gn().memoizedState=[e,i===void 0?null:i],e},useContext:Cn,useEffect:e0,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,Kl(4194308,4,s0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return Kl(4194308,4,e,i)},useInsertionEffect:function(e,i){Kl(4,2,e,i)},useMemo:function(e,i){var s=Gn();i=i===void 0?null:i;var l=e();if(bs){It(!0);try{e()}finally{It(!1)}}return s.memoizedState=[l,i],l},useReducer:function(e,i,s){var l=Gn();if(s!==void 0){var f=s(i);if(bs){It(!0);try{s(i)}finally{It(!1)}}}else f=i;return l.memoizedState=l.baseState=f,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:f},l.queue=e,e=e.dispatch=CS.bind(null,xe,e),[l.memoizedState,e]},useRef:function(e){var i=Gn();return e={current:e},i.memoizedState=e},useState:function(e){e=Sf(e);var i=e.queue,s=m0.bind(null,xe,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:Ef,useDeferredValue:function(e,i){var s=Gn();return bf(s,e,i)},useTransition:function(){var e=Sf(!1);return e=u0.bind(null,xe,e.queue,!0,!1),Gn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var l=xe,f=Gn();if(De){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Qe===null)throw Error(a(349));(Re&127)!==0||Fm(l,i,s)}f.memoizedState=s;var d={value:s,getSnapshot:i};return f.queue=d,e0(Gm.bind(null,l,d,e),[e]),l.flags|=2048,cr(9,{destroy:void 0},Hm.bind(null,l,d,s,i),null),s},useId:function(){var e=Gn(),i=Qe.identifierPrefix;if(De){var s=Xi,l=ki;s=(l&~(1<<32-Jt(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Wl++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=MS++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Af,useFormState:Jm,useActionState:Jm,useOptimistic:function(e){var i=Gn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=wf.bind(null,xe,!0,s),s.dispatch=i,[e,i]},useMemoCache:vf,useCacheRefresh:function(){return Gn().memoizedState=RS.bind(null,xe)},useEffectEvent:function(e){var i=Gn(),s={impl:e};return i.memoizedState=s,function(){if((Fe&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Rf={readContext:Cn,use:Yl,useCallback:o0,useContext:Cn,useEffect:Mf,useImperativeHandle:r0,useInsertionEffect:i0,useLayoutEffect:a0,useMemo:l0,useReducer:Zl,useRef:t0,useState:function(){return Zl(ca)},useDebugValue:Ef,useDeferredValue:function(e,i){var s=un();return c0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=Zl(ca)[0],i=un().memoizedState;return[typeof e=="boolean"?e:yo(e),i]},useSyncExternalStore:Bm,useId:d0,useHostTransitionStatus:Af,useFormState:Qm,useActionState:Qm,useOptimistic:function(e,i){var s=un();return Xm(s,Ye,e,i)},useMemoCache:vf,useCacheRefresh:p0};Rf.useEffectEvent=n0;var x0={readContext:Cn,use:Yl,useCallback:o0,useContext:Cn,useEffect:Mf,useImperativeHandle:r0,useInsertionEffect:i0,useLayoutEffect:a0,useMemo:l0,useReducer:xf,useRef:t0,useState:function(){return xf(ca)},useDebugValue:Ef,useDeferredValue:function(e,i){var s=un();return Ye===null?bf(s,e,i):c0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=xf(ca)[0],i=un().memoizedState;return[typeof e=="boolean"?e:yo(e),i]},useSyncExternalStore:Bm,useId:d0,useHostTransitionStatus:Af,useFormState:$m,useActionState:$m,useOptimistic:function(e,i){var s=un();return Ye!==null?Xm(s,Ye,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:vf,useCacheRefresh:p0};x0.useEffectEvent=n0;function Cf(e,i,s,l){i=e.memoizedState,s=s(l,i),s=s==null?i:_({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Df={enqueueSetState:function(e,i,s){e=e._reactInternals;var l=fi(),f=Ga(l);f.payload=i,s!=null&&(f.callback=s),i=Va(e,f,l),i!==null&&($n(i,e,l),vo(i,e,l))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var l=fi(),f=Ga(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=Va(e,f,l),i!==null&&($n(i,e,l),vo(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=fi(),l=Ga(s);l.tag=2,i!=null&&(l.callback=i),i=Va(e,l,s),i!==null&&($n(i,e,s),vo(i,e,s))}};function S0(e,i,s,l,f,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,d,y):i.prototype&&i.prototype.isPureReactComponent?!lo(s,l)||!lo(f,d):!0}function y0(e,i,s,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==e&&Df.enqueueReplaceState(i,i.state,null)}function Ts(e,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(e=e.defaultProps){s===i&&(s=_({},s));for(var f in e)s[f]===void 0&&(s[f]=e[f])}return s}function M0(e){Cl(e)}function E0(e){console.error(e)}function b0(e){Cl(e)}function jl(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function T0(e,i,s){try{var l=e.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Uf(e,i,s){return s=Ga(s),s.tag=3,s.payload={element:null},s.callback=function(){jl(e,i)},s}function A0(e){return e=Ga(e),e.tag=3,e}function w0(e,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var d=l.value;e.payload=function(){return f(d)},e.callback=function(){T0(i,s,l)}}var y=s.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){T0(i,s,l),typeof f!="function"&&(Za===null?Za=new Set([this]):Za.add(this));var C=l.stack;this.componentDidCatch(l.value,{componentStack:C!==null?C:""})})}function DS(e,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&er(i,s,f,!0),s=oi.current,s!==null){switch(s.tag){case 31:case 13:return Ei===null?uc():s.alternate===null&&on===0&&(on=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===Fl?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),nh(e,l,f)),!1;case 22:return s.flags|=65536,l===Fl?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),nh(e,l,f)),!1}throw Error(a(435,s.tag))}return nh(e,l,f),uc(),!1}if(De)return i=oi.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==Ku&&(e=Error(a(422),{cause:l}),fo(xi(e,s)))):(l!==Ku&&(i=Error(a(423),{cause:l}),fo(xi(i,s))),e=e.current.alternate,e.flags|=65536,f&=-f,e.lanes|=f,l=xi(l,s),f=Uf(e.stateNode,l,f),of(e,f),on!==4&&(on=2)),!1;var d=Error(a(520),{cause:l});if(d=xi(d,s),Uo===null?Uo=[d]:Uo.push(d),on!==4&&(on=2),i===null)return!0;l=xi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=f&-f,s.lanes|=e,e=Uf(s.stateNode,l,e),of(s,e),!1;case 1:if(i=s.type,d=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Za===null||!Za.has(d))))return s.flags|=65536,f&=-f,s.lanes|=f,f=A0(f),w0(f,e,s,l),of(s,f),!1}s=s.return}while(s!==null);return!1}var Lf=Error(a(461)),vn=!1;function Dn(e,i,s,l){i.child=e===null?Um(i,null,s,l):Es(i,e.child,s,l)}function R0(e,i,s,l,f){s=s.render;var d=i.ref;if("ref"in l){var y={};for(var C in l)C!=="ref"&&(y[C]=l[C])}else y=l;return xs(i),l=df(e,i,s,y,d,f),C=pf(),e!==null&&!vn?(mf(e,i,f),ua(e,i,f)):(De&&C&&Yu(i),i.flags|=1,Dn(e,i,l,f),i.child)}function C0(e,i,s,l,f){if(e===null){var d=s.type;return typeof d=="function"&&!Xu(d)&&d.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=d,D0(e,i,d,l,f)):(e=Nl(s.type,null,l,i,i.mode,f),e.ref=i.ref,e.return=i,i.child=e)}if(d=e.child,!Hf(e,f)){var y=d.memoizedProps;if(s=s.compare,s=s!==null?s:lo,s(y,l)&&e.ref===i.ref)return ua(e,i,f)}return i.flags|=1,e=aa(d,l),e.ref=i.ref,e.return=i,i.child=e}function D0(e,i,s,l,f){if(e!==null){var d=e.memoizedProps;if(lo(d,l)&&e.ref===i.ref)if(vn=!1,i.pendingProps=l=d,Hf(e,f))(e.flags&131072)!==0&&(vn=!0);else return i.lanes=e.lanes,ua(e,i,f)}return Nf(e,i,s,l,f)}function U0(e,i,s,l){var f=l.children,d=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(d=d!==null?d.baseLanes|s:s,e!==null){for(l=i.child=e.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~d}else l=0,i.child=null;return L0(e,i,d,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&zl(i,d!==null?d.cachePool:null),d!==null?Om(i,d):cf(),Pm(i);else return l=i.lanes=536870912,L0(e,i,d!==null?d.baseLanes|s:s,s,l)}else d!==null?(zl(i,d.cachePool),Om(i,d),Xa(),i.memoizedState=null):(e!==null&&zl(i,null),cf(),Xa());return Dn(e,i,f,s),i.child}function bo(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function L0(e,i,s,l,f){var d=nf();return d=d===null?null:{parent:mn._currentValue,pool:d},i.memoizedState={baseLanes:s,cachePool:d},e!==null&&zl(i,null),cf(),Pm(i),e!==null&&er(e,i,l,!0),i.childLanes=f,null}function $l(e,i){return i=ec({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function N0(e,i,s){return Es(i,e.child,null,s),e=$l(i,i.pendingProps),e.flags|=2,li(i),i.memoizedState=null,e}function US(e,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(De){if(l.mode==="hidden")return e=$l(i,l),i.lanes=536870912,bo(null,e);if(ff(i),(e=$e)?(e=Wg(e,Mi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ia!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},s=gm(e),s.return=i,i.child=s,Rn=i,$e=null)):e=null,e===null)throw Ba(i);return i.lanes=536870912,null}return $l(i,l)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(ff(i),f)if(i.flags&256)i.flags&=-257,i=N0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(vn||er(e,i,s,!1),f=(s&e.childLanes)!==0,vn||f){if(l=Qe,l!==null&&(y=ii(l,s),y!==0&&y!==d.retryLane))throw d.retryLane=y,ms(e,y),$n(l,e,y),Lf;uc(),i=N0(e,i,s)}else e=d.treeContext,$e=bi(y.nextSibling),Rn=i,De=!0,za=null,Mi=!1,e!==null&&xm(i,e),i=$l(i,l),i.flags|=4096;return i}return e=aa(e.child,{mode:l.mode,children:l.children}),e.ref=i.ref,i.child=e,e.return=i,e}function tc(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function Nf(e,i,s,l,f){return xs(i),s=df(e,i,s,l,void 0,f),l=pf(),e!==null&&!vn?(mf(e,i,f),ua(e,i,f)):(De&&l&&Yu(i),i.flags|=1,Dn(e,i,s,f),i.child)}function O0(e,i,s,l,f,d){return xs(i),i.updateQueue=null,s=zm(i,l,s,f),Im(e),l=pf(),e!==null&&!vn?(mf(e,i,d),ua(e,i,d)):(De&&l&&Yu(i),i.flags|=1,Dn(e,i,s,d),i.child)}function P0(e,i,s,l,f){if(xs(i),i.stateNode===null){var d=Qs,y=s.contextType;typeof y=="object"&&y!==null&&(d=Cn(y)),d=new s(l,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Df,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=l,d.state=i.memoizedState,d.refs={},sf(i),y=s.contextType,d.context=typeof y=="object"&&y!==null?Cn(y):Qs,d.state=i.memoizedState,y=s.getDerivedStateFromProps,typeof y=="function"&&(Cf(i,s,y,l),d.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Df.enqueueReplaceState(d,d.state,null),xo(i,l,d,f),_o(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){d=i.stateNode;var C=i.memoizedProps,k=Ts(s,C);d.props=k;var ct=d.context,St=s.contextType;y=Qs,typeof St=="object"&&St!==null&&(y=Cn(St));var bt=s.getDerivedStateFromProps;St=typeof bt=="function"||typeof d.getSnapshotBeforeUpdate=="function",C=i.pendingProps!==C,St||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(C||ct!==y)&&y0(i,d,l,y),Ha=!1;var ft=i.memoizedState;d.state=ft,xo(i,l,d,f),_o(),ct=i.memoizedState,C||ft!==ct||Ha?(typeof bt=="function"&&(Cf(i,s,bt,l),ct=i.memoizedState),(k=Ha||S0(i,s,k,l,ft,ct,y))?(St||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=ct),d.props=l,d.state=ct,d.context=y,l=k):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{d=i.stateNode,rf(e,i),y=i.memoizedProps,St=Ts(s,y),d.props=St,bt=i.pendingProps,ft=d.context,ct=s.contextType,k=Qs,typeof ct=="object"&&ct!==null&&(k=Cn(ct)),C=s.getDerivedStateFromProps,(ct=typeof C=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==bt||ft!==k)&&y0(i,d,l,k),Ha=!1,ft=i.memoizedState,d.state=ft,xo(i,l,d,f),_o();var pt=i.memoizedState;y!==bt||ft!==pt||Ha||e!==null&&e.dependencies!==null&&Pl(e.dependencies)?(typeof C=="function"&&(Cf(i,s,C,l),pt=i.memoizedState),(St=Ha||S0(i,s,St,l,ft,pt,k)||e!==null&&e.dependencies!==null&&Pl(e.dependencies))?(ct||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(l,pt,k),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(l,pt,k)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&ft===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ft===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=pt),d.props=l,d.state=pt,d.context=k,l=St):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&ft===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ft===e.memoizedState||(i.flags|=1024),l=!1)}return d=l,tc(e,i),l=(i.flags&128)!==0,d||l?(d=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,e!==null&&l?(i.child=Es(i,e.child,null,f),i.child=Es(i,null,s,f)):Dn(e,i,s,f),i.memoizedState=d.state,e=i.child):e=ua(e,i,f),e}function I0(e,i,s,l){return vs(),i.flags|=256,Dn(e,i,s,l),i.child}var Of={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Pf(e){return{baseLanes:e,cachePool:Tm()}}function If(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=ui),e}function z0(e,i,s){var l=i.pendingProps,f=!1,d=(i.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(cn.current&2)!==0),y&&(f=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(De){if(f?ka(i):Xa(),(e=$e)?(e=Wg(e,Mi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ia!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},s=gm(e),s.return=i,i.child=s,Rn=i,$e=null)):e=null,e===null)throw Ba(i);return _h(e)?i.lanes=32:i.lanes=536870912,null}var C=l.children;return l=l.fallback,f?(Xa(),f=i.mode,C=ec({mode:"hidden",children:C},f),l=gs(l,f,s,null),C.return=i,l.return=i,C.sibling=l,i.child=C,l=i.child,l.memoizedState=Pf(s),l.childLanes=If(e,y,s),i.memoizedState=Of,bo(null,l)):(ka(i),zf(i,C))}var k=e.memoizedState;if(k!==null&&(C=k.dehydrated,C!==null)){if(d)i.flags&256?(ka(i),i.flags&=-257,i=Bf(e,i,s)):i.memoizedState!==null?(Xa(),i.child=e.child,i.flags|=128,i=null):(Xa(),C=l.fallback,f=i.mode,l=ec({mode:"visible",children:l.children},f),C=gs(C,f,s,null),C.flags|=2,l.return=i,C.return=i,l.sibling=C,i.child=l,Es(i,e.child,null,s),l=i.child,l.memoizedState=Pf(s),l.childLanes=If(e,y,s),i.memoizedState=Of,i=bo(null,l));else if(ka(i),_h(C)){if(y=C.nextSibling&&C.nextSibling.dataset,y)var ct=y.dgst;y=ct,l=Error(a(419)),l.stack="",l.digest=y,fo({value:l,source:null,stack:null}),i=Bf(e,i,s)}else if(vn||er(e,i,s,!1),y=(s&e.childLanes)!==0,vn||y){if(y=Qe,y!==null&&(l=ii(y,s),l!==0&&l!==k.retryLane))throw k.retryLane=l,ms(e,l),$n(y,e,l),Lf;vh(C)||uc(),i=Bf(e,i,s)}else vh(C)?(i.flags|=192,i.child=e.child,i=null):(e=k.treeContext,$e=bi(C.nextSibling),Rn=i,De=!0,za=null,Mi=!1,e!==null&&xm(i,e),i=zf(i,l.children),i.flags|=4096);return i}return f?(Xa(),C=l.fallback,f=i.mode,k=e.child,ct=k.sibling,l=aa(k,{mode:"hidden",children:l.children}),l.subtreeFlags=k.subtreeFlags&65011712,ct!==null?C=aa(ct,C):(C=gs(C,f,s,null),C.flags|=2),C.return=i,l.return=i,l.sibling=C,i.child=l,bo(null,l),l=i.child,C=e.child.memoizedState,C===null?C=Pf(s):(f=C.cachePool,f!==null?(k=mn._currentValue,f=f.parent!==k?{parent:k,pool:k}:f):f=Tm(),C={baseLanes:C.baseLanes|s,cachePool:f}),l.memoizedState=C,l.childLanes=If(e,y,s),i.memoizedState=Of,bo(e.child,l)):(ka(i),s=e.child,e=s.sibling,s=aa(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=s,i.memoizedState=null,s)}function zf(e,i){return i=ec({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function ec(e,i){return e=ri(22,e,null,i),e.lanes=0,e}function Bf(e,i,s){return Es(i,e.child,null,s),e=zf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function B0(e,i,s){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),ju(e.return,i,s)}function Ff(e,i,s,l,f,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:d}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=l,y.tail=s,y.tailMode=f,y.treeForkCount=d)}function F0(e,i,s){var l=i.pendingProps,f=l.revealOrder,d=l.tail;l=l.children;var y=cn.current,C=(y&2)!==0;if(C?(y=y&1|2,i.flags|=128):y&=1,dt(cn,y),Dn(e,i,l,s),l=De?uo:0,!C&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&B0(e,s,i);else if(e.tag===19)B0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)e=s.alternate,e!==null&&kl(e)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),Ff(i,!1,f,s,d,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(e=f.alternate,e!==null&&kl(e)===null){i.child=f;break}e=f.sibling,f.sibling=s,s=f,f=e}Ff(i,!0,s,null,d,l);break;case"together":Ff(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function ua(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),Ya|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(er(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=aa(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=aa(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Hf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Pl(e)))}function LS(e,i,s){switch(i.tag){case 3:gt(i,i.stateNode.containerInfo),Fa(i,mn,e.memoizedState.cache),vs();break;case 27:case 5:ie(i);break;case 4:gt(i,i.stateNode.containerInfo);break;case 10:Fa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,ff(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(ka(i),i.flags|=128,null):(s&i.child.childLanes)!==0?z0(e,i,s):(ka(i),e=ua(e,i,s),e!==null?e.sibling:null);ka(i);break;case 19:var f=(e.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(er(e,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return F0(e,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),dt(cn,cn.current),l)break;return null;case 22:return i.lanes=0,U0(e,i,s,i.pendingProps);case 24:Fa(i,mn,e.memoizedState.cache)}return ua(e,i,s)}function H0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)vn=!0;else{if(!Hf(e,s)&&(i.flags&128)===0)return vn=!1,LS(e,i,s);vn=(e.flags&131072)!==0}else vn=!1,De&&(i.flags&1048576)!==0&&_m(i,uo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var l=i.pendingProps;if(e=ys(i.elementType),i.type=e,typeof e=="function")Xu(e)?(l=Ts(e,l),i.tag=1,i=P0(null,i,e,l,s)):(i.tag=0,i=Nf(null,i,e,l,s));else{if(e!=null){var f=e.$$typeof;if(f===A){i.tag=11,i=R0(null,i,e,l,s);break t}else if(f===L){i.tag=14,i=C0(null,i,e,l,s);break t}}throw i=G(e)||e,Error(a(306,i,""))}}return i;case 0:return Nf(e,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=Ts(l,i.pendingProps),P0(e,i,l,f,s);case 3:t:{if(gt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));l=i.pendingProps;var d=i.memoizedState;f=d.element,rf(e,i),xo(i,l,null,s);var y=i.memoizedState;if(l=y.cache,Fa(i,mn,l),l!==d.cache&&$u(i,[mn],s,!0),_o(),l=y.element,d.isDehydrated)if(d={element:l,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){i=I0(e,i,l,s);break t}else if(l!==f){f=xi(Error(a(424)),i),fo(f),i=I0(e,i,l,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for($e=bi(e.firstChild),Rn=i,De=!0,za=null,Mi=!0,s=Um(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(vs(),l===f){i=ua(e,i,s);break t}Dn(e,i,l,s)}i=i.child}return i;case 26:return tc(e,i),e===null?(s=Qg(i.type,null,i.pendingProps,null))?i.memoizedState=s:De||(s=i.type,e=i.pendingProps,l=vc(qt.current).createElement(s),l[hn]=i,l[wn]=e,Un(l,s,e),dn(l),i.stateNode=l):i.memoizedState=Qg(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return ie(i),e===null&&De&&(l=i.stateNode=Zg(i.type,i.pendingProps,qt.current),Rn=i,Mi=!0,f=$e,ja(i.type)?(xh=f,$e=bi(l.firstChild)):$e=f),Dn(e,i,i.pendingProps.children,s),tc(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&De&&((f=l=$e)&&(l=ly(l,i.type,i.pendingProps,Mi),l!==null?(i.stateNode=l,Rn=i,$e=bi(l.firstChild),Mi=!1,f=!0):f=!1),f||Ba(i)),ie(i),f=i.type,d=i.pendingProps,y=e!==null?e.memoizedProps:null,l=d.children,ph(f,d)?l=null:y!==null&&ph(f,y)&&(i.flags|=32),i.memoizedState!==null&&(f=df(e,i,ES,null,null,s),Fo._currentValue=f),tc(e,i),Dn(e,i,l,s),i.child;case 6:return e===null&&De&&((e=s=$e)&&(s=cy(s,i.pendingProps,Mi),s!==null?(i.stateNode=s,Rn=i,$e=null,e=!0):e=!1),e||Ba(i)),null;case 13:return z0(e,i,s);case 4:return gt(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=Es(i,null,l,s):Dn(e,i,l,s),i.child;case 11:return R0(e,i,i.type,i.pendingProps,s);case 7:return Dn(e,i,i.pendingProps,s),i.child;case 8:return Dn(e,i,i.pendingProps.children,s),i.child;case 12:return Dn(e,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Fa(i,i.type,l.value),Dn(e,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,xs(i),f=Cn(f),l=l(f),i.flags|=1,Dn(e,i,l,s),i.child;case 14:return C0(e,i,i.type,i.pendingProps,s);case 15:return D0(e,i,i.type,i.pendingProps,s);case 19:return F0(e,i,s);case 31:return US(e,i,s);case 22:return U0(e,i,s,i.pendingProps);case 24:return xs(i),l=Cn(mn),e===null?(f=nf(),f===null&&(f=Qe,d=tf(),f.pooledCache=d,d.refCount++,d!==null&&(f.pooledCacheLanes|=s),f=d),i.memoizedState={parent:l,cache:f},sf(i),Fa(i,mn,f)):((e.lanes&s)!==0&&(rf(e,i),xo(i,null,null,s),_o()),f=e.memoizedState,d=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),Fa(i,mn,l)):(l=d.cache,Fa(i,mn,l),l!==f.cache&&$u(i,[mn],s,!0))),Dn(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function fa(e){e.flags|=4}function Gf(e,i,s,l,f){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(f&335544128)===f)if(e.stateNode.complete)e.flags|=8192;else if(dg())e.flags|=8192;else throw Ms=Fl,af}else e.flags&=-16777217}function G0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!nv(i))if(dg())e.flags|=8192;else throw Ms=Fl,af}function nc(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Tt():536870912,e.lanes|=i,dr|=i)}function To(e,i){if(!De)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function tn(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,l=0;if(i)for(var f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=l,e.childLanes=s,i}function NS(e,i,s){var l=i.pendingProps;switch(Zu(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tn(i),null;case 1:return tn(i),null;case 3:return s=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),oa(mn),Dt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(tr(i)?fa(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Ju())),tn(i),null;case 26:var f=i.type,d=i.memoizedState;return e===null?(fa(i),d!==null?(tn(i),G0(i,d)):(tn(i),Gf(i,f,null,l,s))):d?d!==e.memoizedState?(fa(i),tn(i),G0(i,d)):(tn(i),i.flags&=-16777217):(e=e.memoizedProps,e!==l&&fa(i),tn(i),Gf(i,f,e,l,s)),null;case 27:if(kt(i),s=qt.current,f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&fa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return tn(i),null}e=Rt.current,tr(i)?Sm(i):(e=Zg(f,l,s),i.stateNode=e,fa(i))}return tn(i),null;case 5:if(kt(i),f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&fa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return tn(i),null}if(d=Rt.current,tr(i))Sm(i);else{var y=vc(qt.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof l.is=="string"?y.createElement("select",{is:l.is}):y.createElement("select"),l.multiple?d.multiple=!0:l.size&&(d.size=l.size);break;default:d=typeof l.is=="string"?y.createElement(f,{is:l.is}):y.createElement(f)}}d[hn]=i,d[wn]=l;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=d;t:switch(Un(d,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&fa(i)}}return tn(i),Gf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&fa(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=qt.current,tr(i)){if(e=i.stateNode,s=i.memoizedProps,l=null,f=Rn,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}e[hn]=i,e=!!(e.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||zg(e.nodeValue,s)),e||Ba(i,!0)}else e=vc(e).createTextNode(l),e[hn]=i,i.stateNode=e}return tn(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(l=tr(i),s!==null){if(e===null){if(!l)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[hn]=i}else vs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;tn(i),e=!1}else s=Ju(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(li(i),i):(li(i),null);if((i.flags&128)!==0)throw Error(a(558))}return tn(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(f=tr(i),l!==null&&l.dehydrated!==null){if(e===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[hn]=i}else vs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;tn(i),f=!1}else f=Ju(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(li(i),i):(li(i),null)}return li(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,e=e!==null&&e.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),d=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(d=l.memoizedState.cachePool.pool),d!==f&&(l.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),nc(i,i.updateQueue),tn(i),null);case 4:return Dt(),e===null&&ch(i.stateNode.containerInfo),tn(i),null;case 10:return oa(i.type),tn(i),null;case 19:if(j(cn),l=i.memoizedState,l===null)return tn(i),null;if(f=(i.flags&128)!==0,d=l.rendering,d===null)if(f)To(l,!1);else{if(on!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(d=kl(e),d!==null){for(i.flags|=128,To(l,!1),e=d.updateQueue,i.updateQueue=e,nc(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)mm(s,e),s=s.sibling;return dt(cn,cn.current&1|2),De&&sa(i,l.treeForkCount),i.child}e=e.sibling}l.tail!==null&&oe()>oc&&(i.flags|=128,f=!0,To(l,!1),i.lanes=4194304)}else{if(!f)if(e=kl(d),e!==null){if(i.flags|=128,f=!0,e=e.updateQueue,i.updateQueue=e,nc(i,e),To(l,!0),l.tail===null&&l.tailMode==="hidden"&&!d.alternate&&!De)return tn(i),null}else 2*oe()-l.renderingStartTime>oc&&s!==536870912&&(i.flags|=128,f=!0,To(l,!1),i.lanes=4194304);l.isBackwards?(d.sibling=i.child,i.child=d):(e=l.last,e!==null?e.sibling=d:i.child=d,l.last=d)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=oe(),e.sibling=null,s=cn.current,dt(cn,f?s&1|2:s&1),De&&sa(i,l.treeForkCount),e):(tn(i),null);case 22:case 23:return li(i),uf(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(tn(i),i.subtreeFlags&6&&(i.flags|=8192)):tn(i),s=i.updateQueue,s!==null&&nc(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),e!==null&&j(Ss),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),oa(mn),tn(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function OS(e,i){switch(Zu(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return oa(mn),Dt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return kt(i),null;case 31:if(i.memoizedState!==null){if(li(i),i.alternate===null)throw Error(a(340));vs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(li(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));vs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return j(cn),null;case 4:return Dt(),null;case 10:return oa(i.type),null;case 22:case 23:return li(i),uf(),e!==null&&j(Ss),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return oa(mn),null;case 25:return null;default:return null}}function V0(e,i){switch(Zu(i),i.tag){case 3:oa(mn),Dt();break;case 26:case 27:case 5:kt(i);break;case 4:Dt();break;case 31:i.memoizedState!==null&&li(i);break;case 13:li(i);break;case 19:j(cn);break;case 10:oa(i.type);break;case 22:case 23:li(i),uf(),e!==null&&j(Ss);break;case 24:oa(mn)}}function Ao(e,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&e)===e){l=void 0;var d=s.create,y=s.inst;l=d(),y.destroy=l}s=s.next}while(s!==f)}}catch(C){ke(i,i.return,C)}}function Wa(e,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var d=f.next;l=d;do{if((l.tag&e)===e){var y=l.inst,C=y.destroy;if(C!==void 0){y.destroy=void 0,f=i;var k=s,ct=C;try{ct()}catch(St){ke(f,k,St)}}}l=l.next}while(l!==d)}}catch(St){ke(i,i.return,St)}}function k0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{Nm(i,s)}catch(l){ke(e,e.return,l)}}}function X0(e,i,s){s.props=Ts(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(l){ke(e,i,l)}}function wo(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof s=="function"?e.refCleanup=s(l):s.current=l}}catch(f){ke(e,i,f)}}function Wi(e,i){var s=e.ref,l=e.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){ke(e,i,f)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){ke(e,i,f)}else s.current=null}function W0(e){var i=e.type,s=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break t;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){ke(e,e.return,f)}}function Vf(e,i,s){try{var l=e.stateNode;ny(l,e.type,s,i),l[wn]=i}catch(f){ke(e,e.return,f)}}function q0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ja(e.type)||e.tag===4}function kf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||q0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ja(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xf(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=vi));else if(l!==4&&(l===27&&ja(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(Xf(e,i,s),e=e.sibling;e!==null;)Xf(e,i,s),e=e.sibling}function ic(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(l!==4&&(l===27&&ja(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(ic(e,i,s),e=e.sibling;e!==null;)ic(e,i,s),e=e.sibling}function Y0(e){var i=e.stateNode,s=e.memoizedProps;try{for(var l=e.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);Un(i,l,s),i[hn]=e,i[wn]=s}catch(d){ke(e,e.return,d)}}var ha=!1,_n=!1,Wf=!1,Z0=typeof WeakSet=="function"?WeakSet:Set,Tn=null;function PS(e,i){if(e=e.containerInfo,hh=bc,e=rm(e),zu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,d=l.focusNode;l=l.focusOffset;try{s.nodeType,d.nodeType}catch{s=null;break t}var y=0,C=-1,k=-1,ct=0,St=0,bt=e,ft=null;e:for(;;){for(var pt;bt!==s||f!==0&&bt.nodeType!==3||(C=y+f),bt!==d||l!==0&&bt.nodeType!==3||(k=y+l),bt.nodeType===3&&(y+=bt.nodeValue.length),(pt=bt.firstChild)!==null;)ft=bt,bt=pt;for(;;){if(bt===e)break e;if(ft===s&&++ct===f&&(C=y),ft===d&&++St===l&&(k=y),(pt=bt.nextSibling)!==null)break;bt=ft,ft=bt.parentNode}bt=pt}s=C===-1||k===-1?null:{start:C,end:k}}else s=null}s=s||{start:0,end:0}}else s=null;for(dh={focusedElem:e,selectionRange:s},bc=!1,Tn=i;Tn!==null;)if(i=Tn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Tn=e;else for(;Tn!==null;){switch(i=Tn,d=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)f=e[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,s=i,f=d.memoizedProps,d=d.memoizedState,l=s.stateNode;try{var ne=Ts(s.type,f);e=l.getSnapshotBeforeUpdate(ne,d),l.__reactInternalSnapshotBeforeUpdate=e}catch(he){ke(s,s.return,he)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)gh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":gh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Tn=e;break}Tn=i.return}}function K0(e,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:pa(e,s),l&4&&Ao(5,s);break;case 1:if(pa(e,s),l&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(y){ke(s,s.return,y)}else{var f=Ts(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(f,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){ke(s,s.return,y)}}l&64&&k0(s),l&512&&wo(s,s.return);break;case 3:if(pa(e,s),l&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{Nm(e,i)}catch(y){ke(s,s.return,y)}}break;case 27:i===null&&l&4&&Y0(s);case 26:case 5:pa(e,s),i===null&&l&4&&W0(s),l&512&&wo(s,s.return);break;case 12:pa(e,s);break;case 31:pa(e,s),l&4&&j0(e,s);break;case 13:pa(e,s),l&4&&$0(e,s),l&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=XS.bind(null,s),uy(e,s))));break;case 22:if(l=s.memoizedState!==null||ha,!l){i=i!==null&&i.memoizedState!==null||_n,f=ha;var d=_n;ha=l,(_n=i)&&!d?ma(e,s,(s.subtreeFlags&8772)!==0):pa(e,s),ha=f,_n=d}break;case 30:break;default:pa(e,s)}}function J0(e){var i=e.alternate;i!==null&&(e.alternate=null,J0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&La(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var an=null,Kn=!1;function da(e,i,s){for(s=s.child;s!==null;)Q0(e,i,s),s=s.sibling}function Q0(e,i,s){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(mt,s)}catch{}switch(s.tag){case 26:_n||Wi(s,i),da(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:_n||Wi(s,i);var l=an,f=Kn;ja(s.type)&&(an=s.stateNode,Kn=!1),da(e,i,s),Io(s.stateNode),an=l,Kn=f;break;case 5:_n||Wi(s,i);case 6:if(l=an,f=Kn,an=null,da(e,i,s),an=l,Kn=f,an!==null)if(Kn)try{(an.nodeType===9?an.body:an.nodeName==="HTML"?an.ownerDocument.body:an).removeChild(s.stateNode)}catch(d){ke(s,i,d)}else try{an.removeChild(s.stateNode)}catch(d){ke(s,i,d)}break;case 18:an!==null&&(Kn?(e=an,kg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),yr(e)):kg(an,s.stateNode));break;case 4:l=an,f=Kn,an=s.stateNode.containerInfo,Kn=!0,da(e,i,s),an=l,Kn=f;break;case 0:case 11:case 14:case 15:Wa(2,s,i),_n||Wa(4,s,i),da(e,i,s);break;case 1:_n||(Wi(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&X0(s,i,l)),da(e,i,s);break;case 21:da(e,i,s);break;case 22:_n=(l=_n)||s.memoizedState!==null,da(e,i,s),_n=l;break;default:da(e,i,s)}}function j0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{yr(e)}catch(s){ke(i,i.return,s)}}}function $0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{yr(e)}catch(s){ke(i,i.return,s)}}function IS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new Z0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new Z0),i;default:throw Error(a(435,e.tag))}}function ac(e,i){var s=IS(e);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=WS.bind(null,e,l);l.then(f,f)}})}function Jn(e,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],d=e,y=i,C=y;t:for(;C!==null;){switch(C.tag){case 27:if(ja(C.type)){an=C.stateNode,Kn=!1;break t}break;case 5:an=C.stateNode,Kn=!1;break t;case 3:case 4:an=C.stateNode.containerInfo,Kn=!0;break t}C=C.return}if(an===null)throw Error(a(160));Q0(d,y,f),an=null,Kn=!1,d=f.alternate,d!==null&&(d.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)tg(i,e),i=i.sibling}var Li=null;function tg(e,i){var s=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(i,e),Qn(e),l&4&&(Wa(3,e,e.return),Ao(3,e),Wa(5,e,e.return));break;case 1:Jn(i,e),Qn(e),l&512&&(_n||s===null||Wi(s,s.return)),l&64&&ha&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=Li;if(Jn(i,e),Qn(e),l&512&&(_n||s===null||Wi(s,s.return)),l&4){var d=s!==null?s.memoizedState:null;if(l=e.memoizedState,s===null)if(l===null)if(e.stateNode===null){t:{l=e.type,s=e.memoizedProps,f=f.ownerDocument||f;e:switch(l){case"title":d=f.getElementsByTagName("title")[0],(!d||d[Ua]||d[hn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=f.createElement(l),f.head.insertBefore(d,f.querySelector("head > title"))),Un(d,l,s),d[hn]=e,dn(d),l=d;break t;case"link":var y=tv("link","href",f).get(l+(s.href||""));if(y){for(var C=0;C<y.length;C++)if(d=y[C],d.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&d.getAttribute("rel")===(s.rel==null?null:s.rel)&&d.getAttribute("title")===(s.title==null?null:s.title)&&d.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){y.splice(C,1);break e}}d=f.createElement(l),Un(d,l,s),f.head.appendChild(d);break;case"meta":if(y=tv("meta","content",f).get(l+(s.content||""))){for(C=0;C<y.length;C++)if(d=y[C],d.getAttribute("content")===(s.content==null?null:""+s.content)&&d.getAttribute("name")===(s.name==null?null:s.name)&&d.getAttribute("property")===(s.property==null?null:s.property)&&d.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&d.getAttribute("charset")===(s.charSet==null?null:s.charSet)){y.splice(C,1);break e}}d=f.createElement(l),Un(d,l,s),f.head.appendChild(d);break;default:throw Error(a(468,l))}d[hn]=e,dn(d),l=d}e.stateNode=l}else ev(f,e.type,e.stateNode);else e.stateNode=$g(f,l,e.memoizedProps);else d!==l?(d===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):d.count--,l===null?ev(f,e.type,e.stateNode):$g(f,l,e.memoizedProps)):l===null&&e.stateNode!==null&&Vf(e,e.memoizedProps,s.memoizedProps)}break;case 27:Jn(i,e),Qn(e),l&512&&(_n||s===null||Wi(s,s.return)),s!==null&&l&4&&Vf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Jn(i,e),Qn(e),l&512&&(_n||s===null||Wi(s,s.return)),e.flags&32){f=e.stateNode;try{Hn(f,"")}catch(ne){ke(e,e.return,ne)}}l&4&&e.stateNode!=null&&(f=e.memoizedProps,Vf(e,f,s!==null?s.memoizedProps:f)),l&1024&&(Wf=!0);break;case 6:if(Jn(i,e),Qn(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,s=e.stateNode;try{s.nodeValue=l}catch(ne){ke(e,e.return,ne)}}break;case 3:if(Sc=null,f=Li,Li=_c(i.containerInfo),Jn(i,e),Li=f,Qn(e),l&4&&s!==null&&s.memoizedState.isDehydrated)try{yr(i.containerInfo)}catch(ne){ke(e,e.return,ne)}Wf&&(Wf=!1,eg(e));break;case 4:l=Li,Li=_c(e.stateNode.containerInfo),Jn(i,e),Qn(e),Li=l;break;case 12:Jn(i,e),Qn(e);break;case 31:Jn(i,e),Qn(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ac(e,l)));break;case 13:Jn(i,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(rc=oe()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ac(e,l)));break;case 22:f=e.memoizedState!==null;var k=s!==null&&s.memoizedState!==null,ct=ha,St=_n;if(ha=ct||f,_n=St||k,Jn(i,e),_n=St,ha=ct,Qn(e),l&8192)t:for(i=e.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||k||ha||_n||As(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){k=s=i;try{if(d=k.stateNode,f)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{C=k.stateNode;var bt=k.memoizedProps.style,ft=bt!=null&&bt.hasOwnProperty("display")?bt.display:null;C.style.display=ft==null||typeof ft=="boolean"?"":(""+ft).trim()}}catch(ne){ke(k,k.return,ne)}}}else if(i.tag===6){if(s===null){k=i;try{k.stateNode.nodeValue=f?"":k.memoizedProps}catch(ne){ke(k,k.return,ne)}}}else if(i.tag===18){if(s===null){k=i;try{var pt=k.stateNode;f?Xg(pt,!0):Xg(k.stateNode,!1)}catch(ne){ke(k,k.return,ne)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,ac(e,s))));break;case 19:Jn(i,e),Qn(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ac(e,l)));break;case 30:break;case 21:break;default:Jn(i,e),Qn(e)}}function Qn(e){var i=e.flags;if(i&2){try{for(var s,l=e.return;l!==null;){if(q0(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,d=kf(e);ic(e,d,f);break;case 5:var y=s.stateNode;s.flags&32&&(Hn(y,""),s.flags&=-33);var C=kf(e);ic(e,C,y);break;case 3:case 4:var k=s.stateNode.containerInfo,ct=kf(e);Xf(e,ct,k);break;default:throw Error(a(161))}}catch(St){ke(e,e.return,St)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function eg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;eg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function pa(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)K0(e,i.alternate,i),i=i.sibling}function As(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Wa(4,i,i.return),As(i);break;case 1:Wi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&X0(i,i.return,s),As(i);break;case 27:Io(i.stateNode);case 26:case 5:Wi(i,i.return),As(i);break;case 22:i.memoizedState===null&&As(i);break;case 30:As(i);break;default:As(i)}e=e.sibling}}function ma(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=e,d=i,y=d.flags;switch(d.tag){case 0:case 11:case 15:ma(f,d,s),Ao(4,d);break;case 1:if(ma(f,d,s),l=d,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(ct){ke(l,l.return,ct)}if(l=d,f=l.updateQueue,f!==null){var C=l.stateNode;try{var k=f.shared.hiddenCallbacks;if(k!==null)for(f.shared.hiddenCallbacks=null,f=0;f<k.length;f++)Lm(k[f],C)}catch(ct){ke(l,l.return,ct)}}s&&y&64&&k0(d),wo(d,d.return);break;case 27:Y0(d);case 26:case 5:ma(f,d,s),s&&l===null&&y&4&&W0(d),wo(d,d.return);break;case 12:ma(f,d,s);break;case 31:ma(f,d,s),s&&y&4&&j0(f,d);break;case 13:ma(f,d,s),s&&y&4&&$0(f,d);break;case 22:d.memoizedState===null&&ma(f,d,s),wo(d,d.return);break;case 30:break;default:ma(f,d,s)}i=i.sibling}}function qf(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&ho(s))}function Yf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&ho(e))}function Ni(e,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)ng(e,i,s,l),i=i.sibling}function ng(e,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Ni(e,i,s,l),f&2048&&Ao(9,i);break;case 1:Ni(e,i,s,l);break;case 3:Ni(e,i,s,l),f&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&ho(e)));break;case 12:if(f&2048){Ni(e,i,s,l),e=i.stateNode;try{var d=i.memoizedProps,y=d.id,C=d.onPostCommit;typeof C=="function"&&C(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(k){ke(i,i.return,k)}}else Ni(e,i,s,l);break;case 31:Ni(e,i,s,l);break;case 13:Ni(e,i,s,l);break;case 23:break;case 22:d=i.stateNode,y=i.alternate,i.memoizedState!==null?d._visibility&2?Ni(e,i,s,l):Ro(e,i):d._visibility&2?Ni(e,i,s,l):(d._visibility|=2,ur(e,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&qf(y,i);break;case 24:Ni(e,i,s,l),f&2048&&Yf(i.alternate,i);break;default:Ni(e,i,s,l)}}function ur(e,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var d=e,y=i,C=s,k=l,ct=y.flags;switch(y.tag){case 0:case 11:case 15:ur(d,y,C,k,f),Ao(8,y);break;case 23:break;case 22:var St=y.stateNode;y.memoizedState!==null?St._visibility&2?ur(d,y,C,k,f):Ro(d,y):(St._visibility|=2,ur(d,y,C,k,f)),f&&ct&2048&&qf(y.alternate,y);break;case 24:ur(d,y,C,k,f),f&&ct&2048&&Yf(y.alternate,y);break;default:ur(d,y,C,k,f)}i=i.sibling}}function Ro(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,l=i,f=l.flags;switch(l.tag){case 22:Ro(s,l),f&2048&&qf(l.alternate,l);break;case 24:Ro(s,l),f&2048&&Yf(l.alternate,l);break;default:Ro(s,l)}i=i.sibling}}var Co=8192;function fr(e,i,s){if(e.subtreeFlags&Co)for(e=e.child;e!==null;)ig(e,i,s),e=e.sibling}function ig(e,i,s){switch(e.tag){case 26:fr(e,i,s),e.flags&Co&&e.memoizedState!==null&&My(s,Li,e.memoizedState,e.memoizedProps);break;case 5:fr(e,i,s);break;case 3:case 4:var l=Li;Li=_c(e.stateNode.containerInfo),fr(e,i,s),Li=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=Co,Co=16777216,fr(e,i,s),Co=l):fr(e,i,s));break;default:fr(e,i,s)}}function ag(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Do(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Tn=l,rg(l,e)}ag(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)sg(e),e=e.sibling}function sg(e){switch(e.tag){case 0:case 11:case 15:Do(e),e.flags&2048&&Wa(9,e,e.return);break;case 3:Do(e);break;case 12:Do(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,sc(e)):Do(e);break;default:Do(e)}}function sc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Tn=l,rg(l,e)}ag(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Wa(8,i,i.return),sc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,sc(i));break;default:sc(i)}e=e.sibling}}function rg(e,i){for(;Tn!==null;){var s=Tn;switch(s.tag){case 0:case 11:case 15:Wa(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:ho(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,Tn=l;else t:for(s=e;Tn!==null;){l=Tn;var f=l.sibling,d=l.return;if(J0(l),l===s){Tn=null;break t}if(f!==null){f.return=d,Tn=f;break t}Tn=d}}}var zS={getCacheForType:function(e){var i=Cn(mn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Cn(mn).controller.signal}},BS=typeof WeakMap=="function"?WeakMap:Map,Fe=0,Qe=null,Ae=null,Re=0,Ve=0,ci=null,qa=!1,hr=!1,Zf=!1,ga=0,on=0,Ya=0,ws=0,Kf=0,ui=0,dr=0,Uo=null,jn=null,Jf=!1,rc=0,og=0,oc=1/0,lc=null,Za=null,Mn=0,Ka=null,pr=null,va=0,Qf=0,jf=null,lg=null,Lo=0,$f=null;function fi(){return(Fe&2)!==0&&Re!==0?Re&-Re:B.T!==null?sh():$r()}function cg(){if(ui===0)if((Re&536870912)===0||De){var e=pe;pe<<=1,(pe&3932160)===0&&(pe=262144),ui=e}else ui=536870912;return e=oi.current,e!==null&&(e.flags|=32),ui}function $n(e,i,s){(e===Qe&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)&&(mr(e,0),Ja(e,Re,ui,!1)),te(e,s),((Fe&2)===0||e!==Qe)&&(e===Qe&&((Fe&2)===0&&(ws|=s),on===4&&Ja(e,Re,ui,!1)),qi(e))}function ug(e,i,s){if((Fe&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&e.expiredLanes)===0||Ft(e,i),f=l?GS(e,i):eh(e,i,!0),d=l;do{if(f===0){hr&&!l&&Ja(e,i,0,!1);break}else{if(s=e.current.alternate,d&&!FS(s)){f=eh(e,i,!1),d=!1;continue}if(f===2){if(d=i,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var C=e;f=Uo;var k=C.current.memoizedState.isDehydrated;if(k&&(mr(C,y).flags|=256),y=eh(C,y,!1),y!==2){if(Zf&&!k){C.errorRecoveryDisabledLanes|=d,ws|=d,f=4;break t}d=jn,jn=f,d!==null&&(jn===null?jn=d:jn.push.apply(jn,d))}f=y}if(d=!1,f!==2)continue}}if(f===1){mr(e,0),Ja(e,i,0,!0);break}t:{switch(l=e,d=f,d){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:Ja(l,i,ui,!qa);break t;case 2:jn=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=rc+300-oe(),10<f)){if(Ja(l,i,ui,!qa),Mt(l,0,!0)!==0)break t;va=i,l.timeoutHandle=Gg(fg.bind(null,l,s,jn,lc,Jf,i,ui,ws,dr,qa,d,"Throttled",-0,0),f);break t}fg(l,s,jn,lc,Jf,i,ui,ws,dr,qa,d,null,-0,0)}}break}while(!0);qi(e)}function fg(e,i,s,l,f,d,y,C,k,ct,St,bt,ft,pt){if(e.timeoutHandle=-1,bt=i.subtreeFlags,bt&8192||(bt&16785408)===16785408){bt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:vi},ig(i,d,bt);var ne=(d&62914560)===d?rc-oe():(d&4194048)===d?og-oe():0;if(ne=Ey(bt,ne),ne!==null){va=d,e.cancelPendingCommit=ne(xg.bind(null,e,i,d,s,l,f,y,C,k,St,bt,null,ft,pt)),Ja(e,d,y,!ct);return}}xg(e,i,d,s,l,f,y,C,k)}function FS(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],d=f.getSnapshot;f=f.value;try{if(!si(d(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Ja(e,i,s,l){i&=~Kf,i&=~ws,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var f=i;0<f;){var d=31-Jt(f),y=1<<d;l[d]=-1,f&=~y}s!==0&&Oe(e,s,i)}function cc(){return(Fe&6)===0?(No(0),!1):!0}function th(){if(Ae!==null){if(Ve===0)var e=Ae.return;else e=Ae,ra=_s=null,gf(e),sr=null,mo=0,e=Ae;for(;e!==null;)V0(e.alternate,e),e=e.return;Ae=null}}function mr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,sy(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),va=0,th(),Qe=e,Ae=s=aa(e.current,null),Re=i,Ve=0,ci=null,qa=!1,hr=Ft(e,i),Zf=!1,dr=ui=Kf=ws=Ya=on=0,jn=Uo=null,Jf=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var f=31-Jt(l),d=1<<f;i|=e[f],l&=~d}return ga=i,Dl(),s}function hg(e,i){xe=null,B.H=Eo,i===ar||i===Bl?(i=Rm(),Ve=3):i===af?(i=Rm(),Ve=4):Ve=i===Lf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ci=i,Ae===null&&(on=1,jl(e,xi(i,e.current)))}function dg(){var e=oi.current;return e===null?!0:(Re&4194048)===Re?Ei===null:(Re&62914560)===Re||(Re&536870912)!==0?e===Ei:!1}function pg(){var e=B.H;return B.H=Eo,e===null?Eo:e}function mg(){var e=B.A;return B.A=zS,e}function uc(){on=4,qa||(Re&4194048)!==Re&&oi.current!==null||(hr=!0),(Ya&134217727)===0&&(ws&134217727)===0||Qe===null||Ja(Qe,Re,ui,!1)}function eh(e,i,s){var l=Fe;Fe|=2;var f=pg(),d=mg();(Qe!==e||Re!==i)&&(lc=null,mr(e,i)),i=!1;var y=on;t:do try{if(Ve!==0&&Ae!==null){var C=Ae,k=ci;switch(Ve){case 8:th(),y=6;break t;case 3:case 2:case 9:case 6:oi.current===null&&(i=!0);var ct=Ve;if(Ve=0,ci=null,gr(e,C,k,ct),s&&hr){y=0;break t}break;default:ct=Ve,Ve=0,ci=null,gr(e,C,k,ct)}}HS(),y=on;break}catch(St){hg(e,St)}while(!0);return i&&e.shellSuspendCounter++,ra=_s=null,Fe=l,B.H=f,B.A=d,Ae===null&&(Qe=null,Re=0,Dl()),y}function HS(){for(;Ae!==null;)gg(Ae)}function GS(e,i){var s=Fe;Fe|=2;var l=pg(),f=mg();Qe!==e||Re!==i?(lc=null,oc=oe()+500,mr(e,i)):hr=Ft(e,i);t:do try{if(Ve!==0&&Ae!==null){i=Ae;var d=ci;e:switch(Ve){case 1:Ve=0,ci=null,gr(e,i,d,1);break;case 2:case 9:if(Am(d)){Ve=0,ci=null,vg(i);break}i=function(){Ve!==2&&Ve!==9||Qe!==e||(Ve=7),qi(e)},d.then(i,i);break t;case 3:Ve=7;break t;case 4:Ve=5;break t;case 7:Am(d)?(Ve=0,ci=null,vg(i)):(Ve=0,ci=null,gr(e,i,d,7));break;case 5:var y=null;switch(Ae.tag){case 26:y=Ae.memoizedState;case 5:case 27:var C=Ae;if(y?nv(y):C.stateNode.complete){Ve=0,ci=null;var k=C.sibling;if(k!==null)Ae=k;else{var ct=C.return;ct!==null?(Ae=ct,fc(ct)):Ae=null}break e}}Ve=0,ci=null,gr(e,i,d,5);break;case 6:Ve=0,ci=null,gr(e,i,d,6);break;case 8:th(),on=6;break t;default:throw Error(a(462))}}VS();break}catch(St){hg(e,St)}while(!0);return ra=_s=null,B.H=l,B.A=f,Fe=s,Ae!==null?0:(Qe=null,Re=0,Dl(),on)}function VS(){for(;Ae!==null&&!$t();)gg(Ae)}function gg(e){var i=H0(e.alternate,e,ga);e.memoizedProps=e.pendingProps,i===null?fc(e):Ae=i}function vg(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=O0(s,i,i.pendingProps,i.type,void 0,Re);break;case 11:i=O0(s,i,i.pendingProps,i.type.render,i.ref,Re);break;case 5:gf(i);default:V0(s,i),i=Ae=mm(i,ga),i=H0(s,i,ga)}e.memoizedProps=e.pendingProps,i===null?fc(e):Ae=i}function gr(e,i,s,l){ra=_s=null,gf(i),sr=null,mo=0;var f=i.return;try{if(DS(e,f,i,s,Re)){on=1,jl(e,xi(s,e.current)),Ae=null;return}}catch(d){if(f!==null)throw Ae=f,d;on=1,jl(e,xi(s,e.current)),Ae=null;return}i.flags&32768?(De||l===1?e=!0:hr||(Re&536870912)!==0?e=!1:(qa=e=!0,(l===2||l===9||l===3||l===6)&&(l=oi.current,l!==null&&l.tag===13&&(l.flags|=16384))),_g(i,e)):fc(i)}function fc(e){var i=e;do{if((i.flags&32768)!==0){_g(i,qa);return}e=i.return;var s=NS(i.alternate,i,ga);if(s!==null){Ae=s;return}if(i=i.sibling,i!==null){Ae=i;return}Ae=i=e}while(i!==null);on===0&&(on=5)}function _g(e,i){do{var s=OS(e.alternate,e);if(s!==null){s.flags&=32767,Ae=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){Ae=e;return}Ae=e=s}while(e!==null);on=6,Ae=null}function xg(e,i,s,l,f,d,y,C,k){e.cancelPendingCommit=null;do hc();while(Mn!==0);if((Fe&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(d=i.lanes|i.childLanes,d|=Vu,We(e,s,d,y,C,k),e===Qe&&(Ae=Qe=null,Re=0),pr=i,Ka=e,va=s,Qf=d,jf=f,lg=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,qS(tt,function(){return bg(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=B.T,B.T=null,f=X.p,X.p=2,y=Fe,Fe|=4;try{PS(e,i,s)}finally{Fe=y,X.p=f,B.T=l}}Mn=1,Sg(),yg(),Mg()}}function Sg(){if(Mn===1){Mn=0;var e=Ka,i=pr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=B.T,B.T=null;var l=X.p;X.p=2;var f=Fe;Fe|=4;try{tg(i,e);var d=dh,y=rm(e.containerInfo),C=d.focusedElem,k=d.selectionRange;if(y!==C&&C&&C.ownerDocument&&sm(C.ownerDocument.documentElement,C)){if(k!==null&&zu(C)){var ct=k.start,St=k.end;if(St===void 0&&(St=ct),"selectionStart"in C)C.selectionStart=ct,C.selectionEnd=Math.min(St,C.value.length);else{var bt=C.ownerDocument||document,ft=bt&&bt.defaultView||window;if(ft.getSelection){var pt=ft.getSelection(),ne=C.textContent.length,he=Math.min(k.start,ne),Ke=k.end===void 0?he:Math.min(k.end,ne);!pt.extend&&he>Ke&&(y=Ke,Ke=he,he=y);var et=am(C,he),Z=am(C,Ke);if(et&&Z&&(pt.rangeCount!==1||pt.anchorNode!==et.node||pt.anchorOffset!==et.offset||pt.focusNode!==Z.node||pt.focusOffset!==Z.offset)){var lt=bt.createRange();lt.setStart(et.node,et.offset),pt.removeAllRanges(),he>Ke?(pt.addRange(lt),pt.extend(Z.node,Z.offset)):(lt.setEnd(Z.node,Z.offset),pt.addRange(lt))}}}}for(bt=[],pt=C;pt=pt.parentNode;)pt.nodeType===1&&bt.push({element:pt,left:pt.scrollLeft,top:pt.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<bt.length;C++){var Et=bt[C];Et.element.scrollLeft=Et.left,Et.element.scrollTop=Et.top}}bc=!!hh,dh=hh=null}finally{Fe=f,X.p=l,B.T=s}}e.current=i,Mn=2}}function yg(){if(Mn===2){Mn=0;var e=Ka,i=pr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=B.T,B.T=null;var l=X.p;X.p=2;var f=Fe;Fe|=4;try{K0(e,i.alternate,i)}finally{Fe=f,X.p=l,B.T=s}}Mn=3}}function Mg(){if(Mn===4||Mn===3){Mn=0,V();var e=Ka,i=pr,s=va,l=lg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?Mn=5:(Mn=0,pr=Ka=null,Eg(e,e.pendingLanes));var f=e.pendingLanes;if(f===0&&(Za=null),jr(s),i=i.stateNode,_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(mt,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=B.T,f=X.p,X.p=2,B.T=null;try{for(var d=e.onRecoverableError,y=0;y<l.length;y++){var C=l[y];d(C.value,{componentStack:C.stack})}}finally{B.T=i,X.p=f}}(va&3)!==0&&hc(),qi(e),f=e.pendingLanes,(s&261930)!==0&&(f&42)!==0?e===$f?Lo++:(Lo=0,$f=e):Lo=0,No(0)}}function Eg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,ho(i)))}function hc(){return Sg(),yg(),Mg(),bg()}function bg(){if(Mn!==5)return!1;var e=Ka,i=Qf;Qf=0;var s=jr(va),l=B.T,f=X.p;try{X.p=32>s?32:s,B.T=null,s=jf,jf=null;var d=Ka,y=va;if(Mn=0,pr=Ka=null,va=0,(Fe&6)!==0)throw Error(a(331));var C=Fe;if(Fe|=4,sg(d.current),ng(d,d.current,y,s),Fe=C,No(0,!1),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(mt,d)}catch{}return!0}finally{X.p=f,B.T=l,Eg(e,i)}}function Tg(e,i,s){i=xi(s,i),i=Uf(e.stateNode,i,2),e=Va(e,i,2),e!==null&&(te(e,2),qi(e))}function ke(e,i,s){if(e.tag===3)Tg(e,e,s);else for(;i!==null;){if(i.tag===3){Tg(i,e,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Za===null||!Za.has(l))){e=xi(s,e),s=A0(2),l=Va(i,s,2),l!==null&&(w0(s,l,i,e),te(l,2),qi(l));break}}i=i.return}}function nh(e,i,s){var l=e.pingCache;if(l===null){l=e.pingCache=new BS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(Zf=!0,f.add(s),e=kS.bind(null,e,i,s),i.then(e,e))}function kS(e,i,s){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Qe===e&&(Re&s)===s&&(on===4||on===3&&(Re&62914560)===Re&&300>oe()-rc?(Fe&2)===0&&mr(e,0):Kf|=s,dr===Re&&(dr=0)),qi(e)}function Ag(e,i){i===0&&(i=Tt()),e=ms(e,i),e!==null&&(te(e,i),qi(e))}function XS(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),Ag(e,s)}function WS(e,i){var s=0;switch(e.tag){case 31:case 13:var l=e.stateNode,f=e.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),Ag(e,s)}function qS(e,i){return At(e,i)}var dc=null,vr=null,ih=!1,pc=!1,ah=!1,Qa=0;function qi(e){e!==vr&&e.next===null&&(vr===null?dc=vr=e:vr=vr.next=e),pc=!0,ih||(ih=!0,ZS())}function No(e,i){if(!ah&&pc){ah=!0;do for(var s=!1,l=dc;l!==null;){if(e!==0){var f=l.pendingLanes;if(f===0)var d=0;else{var y=l.suspendedLanes,C=l.pingedLanes;d=(1<<31-Jt(42|e)+1)-1,d&=f&~(y&~C),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(s=!0,Dg(l,d))}else d=Re,d=Mt(l,l===Qe?d:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(d&3)===0||Ft(l,d)||(s=!0,Dg(l,d));l=l.next}while(s);ah=!1}}function YS(){wg()}function wg(){pc=ih=!1;var e=0;Qa!==0&&ay()&&(e=Qa);for(var i=oe(),s=null,l=dc;l!==null;){var f=l.next,d=Rg(l,i);d===0?(l.next=null,s===null?dc=f:s.next=f,f===null&&(vr=s)):(s=l,(e!==0||(d&3)!==0)&&(pc=!0)),l=f}Mn!==0&&Mn!==5||No(e),Qa!==0&&(Qa=0)}function Rg(e,i){for(var s=e.suspendedLanes,l=e.pingedLanes,f=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-Jt(d),C=1<<y,k=f[y];k===-1?((C&s)===0||(C&l)!==0)&&(f[y]=Yt(C,i)):k<=i&&(e.expiredLanes|=C),d&=~C}if(i=Qe,s=Re,s=Mt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,s===0||e===i&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Ct(l),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||Ft(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(l!==null&&Ct(l),jr(s)){case 2:case 8:s=b;break;case 32:s=tt;break;case 268435456:s=vt;break;default:s=tt}return l=Cg.bind(null,e),s=At(s,l),e.callbackPriority=i,e.callbackNode=s,i}return l!==null&&l!==null&&Ct(l),e.callbackPriority=2,e.callbackNode=null,2}function Cg(e,i){if(Mn!==0&&Mn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(hc()&&e.callbackNode!==s)return null;var l=Re;return l=Mt(e,e===Qe?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(ug(e,l,i),Rg(e,oe()),e.callbackNode!=null&&e.callbackNode===s?Cg.bind(null,e):null)}function Dg(e,i){if(hc())return null;ug(e,i,!0)}function ZS(){ry(function(){(Fe&6)!==0?At(z,YS):wg()})}function sh(){if(Qa===0){var e=nr;e===0&&(e=ce,ce<<=1,(ce&261888)===0&&(ce=256)),Qa=e}return Qa}function Ug(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Di(""+e)}function Lg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function KS(e,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var d=Ug((f[wn]||null).action),y=l.submitter;y&&(i=(i=y[wn]||null)?Ug(i.formAction):y.getAttribute("formAction"),i!==null&&(d=i,y=null));var C=new Al("action","action",null,l,f);e.push({event:C,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Qa!==0){var k=y?Lg(f,y):new FormData(f);Tf(s,{pending:!0,data:k,method:f.method,action:d},null,k)}}else typeof d=="function"&&(C.preventDefault(),k=y?Lg(f,y):new FormData(f),Tf(s,{pending:!0,data:k,method:f.method,action:d},d,k))},currentTarget:f}]})}}for(var rh=0;rh<Gu.length;rh++){var oh=Gu[rh],JS=oh.toLowerCase(),QS=oh[0].toUpperCase()+oh.slice(1);Ui(JS,"on"+QS)}Ui(cm,"onAnimationEnd"),Ui(um,"onAnimationIteration"),Ui(fm,"onAnimationStart"),Ui("dblclick","onDoubleClick"),Ui("focusin","onFocus"),Ui("focusout","onBlur"),Ui(dS,"onTransitionRun"),Ui(pS,"onTransitionStart"),Ui(mS,"onTransitionCancel"),Ui(hm,"onTransitionEnd"),Y("onMouseEnter",["mouseout","mouseover"]),Y("onMouseLeave",["mouseout","mouseover"]),Y("onPointerEnter",["pointerout","pointerover"]),Y("onPointerLeave",["pointerout","pointerover"]),w("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),w("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),w("onBeforeInput",["compositionend","keypress","textInput","paste"]),w("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Oo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Oo));function Ng(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var l=e[s],f=l.event;l=l.listeners;t:{var d=void 0;if(i)for(var y=l.length-1;0<=y;y--){var C=l[y],k=C.instance,ct=C.currentTarget;if(C=C.listener,k!==d&&f.isPropagationStopped())break t;d=C,f.currentTarget=ct;try{d(f)}catch(St){Cl(St)}f.currentTarget=null,d=k}else for(y=0;y<l.length;y++){if(C=l[y],k=C.instance,ct=C.currentTarget,C=C.listener,k!==d&&f.isPropagationStopped())break t;d=C,f.currentTarget=ct;try{d(f)}catch(St){Cl(St)}f.currentTarget=null,d=k}}}}function we(e,i){var s=i[cs];s===void 0&&(s=i[cs]=new Set);var l=e+"__bubble";s.has(l)||(Og(i,e,2,!1),s.add(l))}function lh(e,i,s){var l=0;i&&(l|=4),Og(s,e,l,i)}var mc="_reactListening"+Math.random().toString(36).slice(2);function ch(e){if(!e[mc]){e[mc]=!0,Ml.forEach(function(s){s!=="selectionchange"&&(jS.has(s)||lh(s,!1,e),lh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[mc]||(i[mc]=!0,lh("selectionchange",!1,i))}}function Og(e,i,s,l){switch(cv(i)){case 2:var f=Ay;break;case 8:f=wy;break;default:f=bh}s=f.bind(null,i,s,e),f=void 0,!Ru||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?e.addEventListener(i,s,{capture:!0,passive:f}):e.addEventListener(i,s,!0):f!==void 0?e.addEventListener(i,s,{passive:f}):e.addEventListener(i,s,!1)}function uh(e,i,s,l,f){var d=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var y=l.tag;if(y===3||y===4){var C=l.stateNode.containerInfo;if(C===f)break;if(y===4)for(y=l.return;y!==null;){var k=y.tag;if((k===3||k===4)&&y.stateNode.containerInfo===f)return;y=y.return}for(;C!==null;){if(y=ea(C),y===null)return;if(k=y.tag,k===5||k===6||k===26||k===27){l=d=y;continue t}C=C.parentNode}}l=l.return}Fp(function(){var ct=d,St=Au(s),bt=[];t:{var ft=dm.get(e);if(ft!==void 0){var pt=Al,ne=e;switch(e){case"keypress":if(bl(s)===0)break t;case"keydown":case"keyup":pt=Wx;break;case"focusin":ne="focus",pt=Lu;break;case"focusout":ne="blur",pt=Lu;break;case"beforeblur":case"afterblur":pt=Lu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":pt=Vp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":pt=Nx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":pt=Zx;break;case cm:case um:case fm:pt=Ix;break;case hm:pt=Jx;break;case"scroll":case"scrollend":pt=Ux;break;case"wheel":pt=jx;break;case"copy":case"cut":case"paste":pt=Bx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":pt=Xp;break;case"toggle":case"beforetoggle":pt=tS}var he=(i&4)!==0,Ke=!he&&(e==="scroll"||e==="scrollend"),et=he?ft!==null?ft+"Capture":null:ft;he=[];for(var Z=ct,lt;Z!==null;){var Et=Z;if(lt=Et.stateNode,Et=Et.tag,Et!==5&&Et!==26&&Et!==27||lt===null||et===null||(Et=eo(Z,et),Et!=null&&he.push(Po(Z,Et,lt))),Ke)break;Z=Z.return}0<he.length&&(ft=new pt(ft,ne,null,s,St),bt.push({event:ft,listeners:he}))}}if((i&7)===0){t:{if(ft=e==="mouseover"||e==="pointerover",pt=e==="mouseout"||e==="pointerout",ft&&s!==Tu&&(ne=s.relatedTarget||s.fromElement)&&(ea(ne)||ne[Yn]))break t;if((pt||ft)&&(ft=St.window===St?St:(ft=St.ownerDocument)?ft.defaultView||ft.parentWindow:window,pt?(ne=s.relatedTarget||s.toElement,pt=ct,ne=ne?ea(ne):null,ne!==null&&(Ke=c(ne),he=ne.tag,ne!==Ke||he!==5&&he!==27&&he!==6)&&(ne=null)):(pt=null,ne=ct),pt!==ne)){if(he=Vp,Et="onMouseLeave",et="onMouseEnter",Z="mouse",(e==="pointerout"||e==="pointerover")&&(he=Xp,Et="onPointerLeave",et="onPointerEnter",Z="pointer"),Ke=pt==null?ft:fs(pt),lt=ne==null?ft:fs(ne),ft=new he(Et,Z+"leave",pt,s,St),ft.target=Ke,ft.relatedTarget=lt,Et=null,ea(St)===ct&&(he=new he(et,Z+"enter",ne,s,St),he.target=lt,he.relatedTarget=Ke,Et=he),Ke=Et,pt&&ne)e:{for(he=$S,et=pt,Z=ne,lt=0,Et=et;Et;Et=he(Et))lt++;Et=0;for(var fe=Z;fe;fe=he(fe))Et++;for(;0<lt-Et;)et=he(et),lt--;for(;0<Et-lt;)Z=he(Z),Et--;for(;lt--;){if(et===Z||Z!==null&&et===Z.alternate){he=et;break e}et=he(et),Z=he(Z)}he=null}else he=null;pt!==null&&Pg(bt,ft,pt,he,!1),ne!==null&&Ke!==null&&Pg(bt,Ke,ne,he,!0)}}t:{if(ft=ct?fs(ct):window,pt=ft.nodeName&&ft.nodeName.toLowerCase(),pt==="select"||pt==="input"&&ft.type==="file")var Ie=jp;else if(Jp(ft))if($p)Ie=uS;else{Ie=lS;var ae=oS}else pt=ft.nodeName,!pt||pt.toLowerCase()!=="input"||ft.type!=="checkbox"&&ft.type!=="radio"?ct&&gi(ct.elementType)&&(Ie=jp):Ie=cS;if(Ie&&(Ie=Ie(e,ct))){Qp(bt,Ie,s,St);break t}ae&&ae(e,ft,ct),e==="focusout"&&ct&&ft.type==="number"&&ct.memoizedProps.value!=null&&yn(ft,"number",ft.value)}switch(ae=ct?fs(ct):window,e){case"focusin":(Jp(ae)||ae.contentEditable==="true")&&(Zs=ae,Bu=ct,co=null);break;case"focusout":co=Bu=Zs=null;break;case"mousedown":Fu=!0;break;case"contextmenu":case"mouseup":case"dragend":Fu=!1,om(bt,s,St);break;case"selectionchange":if(hS)break;case"keydown":case"keyup":om(bt,s,St)}var Se;if(Ou)t:{switch(e){case"compositionstart":var Ce="onCompositionStart";break t;case"compositionend":Ce="onCompositionEnd";break t;case"compositionupdate":Ce="onCompositionUpdate";break t}Ce=void 0}else Ys?Zp(e,s)&&(Ce="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(Ce="onCompositionStart");Ce&&(Wp&&s.locale!=="ko"&&(Ys||Ce!=="onCompositionStart"?Ce==="onCompositionEnd"&&Ys&&(Se=Hp()):(Pa=St,Cu="value"in Pa?Pa.value:Pa.textContent,Ys=!0)),ae=gc(ct,Ce),0<ae.length&&(Ce=new kp(Ce,e,null,s,St),bt.push({event:Ce,listeners:ae}),Se?Ce.data=Se:(Se=Kp(s),Se!==null&&(Ce.data=Se)))),(Se=nS?iS(e,s):aS(e,s))&&(Ce=gc(ct,"onBeforeInput"),0<Ce.length&&(ae=new kp("onBeforeInput","beforeinput",null,s,St),bt.push({event:ae,listeners:Ce}),ae.data=Se)),KS(bt,e,ct,s,St)}Ng(bt,i)})}function Po(e,i,s){return{instance:e,listener:i,currentTarget:s}}function gc(e,i){for(var s=i+"Capture",l=[];e!==null;){var f=e,d=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||d===null||(f=eo(e,s),f!=null&&l.unshift(Po(e,f,d)),f=eo(e,i),f!=null&&l.push(Po(e,f,d))),e.tag===3)return l;e=e.return}return[]}function $S(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Pg(e,i,s,l,f){for(var d=i._reactName,y=[];s!==null&&s!==l;){var C=s,k=C.alternate,ct=C.stateNode;if(C=C.tag,k!==null&&k===l)break;C!==5&&C!==26&&C!==27||ct===null||(k=ct,f?(ct=eo(s,d),ct!=null&&y.unshift(Po(s,ct,k))):f||(ct=eo(s,d),ct!=null&&y.push(Po(s,ct,k)))),s=s.return}y.length!==0&&e.push({event:i,listeners:y})}var ty=/\r\n?/g,ey=/\u0000|\uFFFD/g;function Ig(e){return(typeof e=="string"?e:""+e).replace(ty,`
`).replace(ey,"")}function zg(e,i){return i=Ig(i),Ig(e)===i}function Ze(e,i,s,l,f,d){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Hn(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Hn(e,""+l);break;case"className":Gt(e,"class",l);break;case"tabIndex":Gt(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Gt(e,s,l);break;case"style":nn(e,l,d);break;case"data":if(i!=="object"){Gt(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Di(""+l),e.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(s==="formAction"?(i!=="input"&&Ze(e,i,"name",f.name,f,null),Ze(e,i,"formEncType",f.formEncType,f,null),Ze(e,i,"formMethod",f.formMethod,f,null),Ze(e,i,"formTarget",f.formTarget,f,null)):(Ze(e,i,"encType",f.encType,f,null),Ze(e,i,"method",f.method,f,null),Ze(e,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Di(""+l),e.setAttribute(s,l);break;case"onClick":l!=null&&(e.onclick=vi);break;case"onScroll":l!=null&&we("scroll",e);break;case"onScrollEnd":l!=null&&we("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}s=Di(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""+l):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":l===!0?e.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,l):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(s,l):e.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(s):e.setAttribute(s,l);break;case"popover":we("beforetoggle",e),we("toggle",e),Qt(e,"popover",l);break;case"xlinkActuate":Zt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Zt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Zt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Zt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Zt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Zt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Qt(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=qe.get(s)||s,Qt(e,s,l))}}function fh(e,i,s,l,f,d){switch(s){case"style":nn(e,l,d);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof l=="string"?Hn(e,l):(typeof l=="number"||typeof l=="bigint")&&Hn(e,""+l);break;case"onScroll":l!=null&&we("scroll",e);break;case"onScrollEnd":l!=null&&we("scrollend",e);break;case"onClick":l!=null&&(e.onclick=vi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!to.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),d=e[wn]||null,d=d!=null?d[s]:null,typeof d=="function"&&e.removeEventListener(i,d,f),typeof l=="function")){typeof d!="function"&&d!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,l,f);break t}s in e?e[s]=l:l===!0?e.setAttribute(s,""):Qt(e,s,l)}}}function Un(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":we("error",e),we("load",e);var l=!1,f=!1,d;for(d in s)if(s.hasOwnProperty(d)){var y=s[d];if(y!=null)switch(d){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,d,y,s,null)}}f&&Ze(e,i,"srcSet",s.srcSet,s,null),l&&Ze(e,i,"src",s.src,s,null);return;case"input":we("invalid",e);var C=d=y=f=null,k=null,ct=null;for(l in s)if(s.hasOwnProperty(l)){var St=s[l];if(St!=null)switch(l){case"name":f=St;break;case"type":y=St;break;case"checked":k=St;break;case"defaultChecked":ct=St;break;case"value":d=St;break;case"defaultValue":C=St;break;case"children":case"dangerouslySetInnerHTML":if(St!=null)throw Error(a(137,i));break;default:Ze(e,i,l,St,s,null)}}jt(e,d,C,k,ct,y,f,!1);return;case"select":we("invalid",e),l=y=d=null;for(f in s)if(s.hasOwnProperty(f)&&(C=s[f],C!=null))switch(f){case"value":d=C;break;case"defaultValue":y=C;break;case"multiple":l=C;default:Ze(e,i,f,C,s,null)}i=d,s=y,e.multiple=!!l,i!=null?Me(e,!!l,i,!1):s!=null&&Me(e,!!l,s,!0);return;case"textarea":we("invalid",e),d=f=l=null;for(y in s)if(s.hasOwnProperty(y)&&(C=s[y],C!=null))switch(y){case"value":l=C;break;case"defaultValue":f=C;break;case"children":d=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(a(91));break;default:Ze(e,i,y,C,s,null)}ai(e,l,f,d);return;case"option":for(k in s)if(s.hasOwnProperty(k)&&(l=s[k],l!=null))switch(k){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Ze(e,i,k,l,s,null)}return;case"dialog":we("beforetoggle",e),we("toggle",e),we("cancel",e),we("close",e);break;case"iframe":case"object":we("load",e);break;case"video":case"audio":for(l=0;l<Oo.length;l++)we(Oo[l],e);break;case"image":we("error",e),we("load",e);break;case"details":we("toggle",e);break;case"embed":case"source":case"link":we("error",e),we("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ct in s)if(s.hasOwnProperty(ct)&&(l=s[ct],l!=null))switch(ct){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,ct,l,s,null)}return;default:if(gi(i)){for(St in s)s.hasOwnProperty(St)&&(l=s[St],l!==void 0&&fh(e,i,St,l,s,void 0));return}}for(C in s)s.hasOwnProperty(C)&&(l=s[C],l!=null&&Ze(e,i,C,l,s,null))}function ny(e,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,d=null,y=null,C=null,k=null,ct=null,St=null;for(pt in s){var bt=s[pt];if(s.hasOwnProperty(pt)&&bt!=null)switch(pt){case"checked":break;case"value":break;case"defaultValue":k=bt;default:l.hasOwnProperty(pt)||Ze(e,i,pt,null,l,bt)}}for(var ft in l){var pt=l[ft];if(bt=s[ft],l.hasOwnProperty(ft)&&(pt!=null||bt!=null))switch(ft){case"type":d=pt;break;case"name":f=pt;break;case"checked":ct=pt;break;case"defaultChecked":St=pt;break;case"value":y=pt;break;case"defaultValue":C=pt;break;case"children":case"dangerouslySetInnerHTML":if(pt!=null)throw Error(a(137,i));break;default:pt!==bt&&Ze(e,i,ft,pt,l,bt)}}pn(e,y,C,k,ct,St,d,f);return;case"select":pt=y=C=ft=null;for(d in s)if(k=s[d],s.hasOwnProperty(d)&&k!=null)switch(d){case"value":break;case"multiple":pt=k;default:l.hasOwnProperty(d)||Ze(e,i,d,null,l,k)}for(f in l)if(d=l[f],k=s[f],l.hasOwnProperty(f)&&(d!=null||k!=null))switch(f){case"value":ft=d;break;case"defaultValue":C=d;break;case"multiple":y=d;default:d!==k&&Ze(e,i,f,d,l,k)}i=C,s=y,l=pt,ft!=null?Me(e,!!s,ft,!1):!!l!=!!s&&(i!=null?Me(e,!!s,i,!0):Me(e,!!s,s?[]:"",!1));return;case"textarea":pt=ft=null;for(C in s)if(f=s[C],s.hasOwnProperty(C)&&f!=null&&!l.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:Ze(e,i,C,null,l,f)}for(y in l)if(f=l[y],d=s[y],l.hasOwnProperty(y)&&(f!=null||d!=null))switch(y){case"value":ft=f;break;case"defaultValue":pt=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==d&&Ze(e,i,y,f,l,d)}Fn(e,ft,pt);return;case"option":for(var ne in s)if(ft=s[ne],s.hasOwnProperty(ne)&&ft!=null&&!l.hasOwnProperty(ne))switch(ne){case"selected":e.selected=!1;break;default:Ze(e,i,ne,null,l,ft)}for(k in l)if(ft=l[k],pt=s[k],l.hasOwnProperty(k)&&ft!==pt&&(ft!=null||pt!=null))switch(k){case"selected":e.selected=ft&&typeof ft!="function"&&typeof ft!="symbol";break;default:Ze(e,i,k,ft,l,pt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var he in s)ft=s[he],s.hasOwnProperty(he)&&ft!=null&&!l.hasOwnProperty(he)&&Ze(e,i,he,null,l,ft);for(ct in l)if(ft=l[ct],pt=s[ct],l.hasOwnProperty(ct)&&ft!==pt&&(ft!=null||pt!=null))switch(ct){case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(a(137,i));break;default:Ze(e,i,ct,ft,l,pt)}return;default:if(gi(i)){for(var Ke in s)ft=s[Ke],s.hasOwnProperty(Ke)&&ft!==void 0&&!l.hasOwnProperty(Ke)&&fh(e,i,Ke,void 0,l,ft);for(St in l)ft=l[St],pt=s[St],!l.hasOwnProperty(St)||ft===pt||ft===void 0&&pt===void 0||fh(e,i,St,ft,l,pt);return}}for(var et in s)ft=s[et],s.hasOwnProperty(et)&&ft!=null&&!l.hasOwnProperty(et)&&Ze(e,i,et,null,l,ft);for(bt in l)ft=l[bt],pt=s[bt],!l.hasOwnProperty(bt)||ft===pt||ft==null&&pt==null||Ze(e,i,bt,ft,l,pt)}function Bg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function iy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],d=f.transferSize,y=f.initiatorType,C=f.duration;if(d&&C&&Bg(y)){for(y=0,C=f.responseEnd,l+=1;l<s.length;l++){var k=s[l],ct=k.startTime;if(ct>C)break;var St=k.transferSize,bt=k.initiatorType;St&&Bg(bt)&&(k=k.responseEnd,y+=St*(k<C?1:(C-ct)/(k-ct)))}if(--l,i+=8*(d+y)/(f.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var hh=null,dh=null;function vc(e){return e.nodeType===9?e:e.ownerDocument}function Fg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Hg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function ph(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var mh=null;function ay(){var e=window.event;return e&&e.type==="popstate"?e===mh?!1:(mh=e,!0):(mh=null,!1)}var Gg=typeof setTimeout=="function"?setTimeout:void 0,sy=typeof clearTimeout=="function"?clearTimeout:void 0,Vg=typeof Promise=="function"?Promise:void 0,ry=typeof queueMicrotask=="function"?queueMicrotask:typeof Vg<"u"?function(e){return Vg.resolve(null).then(e).catch(oy)}:Gg;function oy(e){setTimeout(function(){throw e})}function ja(e){return e==="head"}function kg(e,i){var s=i,l=0;do{var f=s.nextSibling;if(e.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){e.removeChild(f),yr(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")Io(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Io(s);for(var d=s.firstChild;d;){var y=d.nextSibling,C=d.nodeName;d[Ua]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&d.rel.toLowerCase()==="stylesheet"||s.removeChild(d),d=y}}else s==="body"&&Io(e.ownerDocument.body);s=f}while(s);yr(i)}function Xg(e,i){var s=e;e=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=l}while(s)}function gh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":gh(s),La(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function ly(e,i,s,l){for(;e.nodeType===1;){var f=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Ua])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==f.rel||e.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||e.getAttribute("title")!==(f.title==null?null:f.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(f.src==null?null:f.src)||e.getAttribute("type")!==(f.type==null?null:f.type)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var d=f.name==null?null:""+f.name;if(f.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=bi(e.nextSibling),e===null)break}return null}function cy(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=bi(e.nextSibling),e===null))return null;return e}function Wg(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=bi(e.nextSibling),e===null))return null;return e}function vh(e){return e.data==="$?"||e.data==="$~"}function _h(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function uy(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function bi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var xh=null;function qg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return bi(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function Yg(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function Zg(e,i,s){switch(i=vc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Io(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);La(e)}var Ti=new Map,Kg=new Set;function _c(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _a=X.d;X.d={f:fy,r:hy,D:dy,C:py,L:my,m:gy,X:_y,S:vy,M:xy};function fy(){var e=_a.f(),i=cc();return e||i}function hy(e){var i=na(e);i!==null&&i.tag===5&&i.type==="form"?h0(i):_a.r(e)}var _r=typeof document>"u"?null:document;function Jg(e,i,s){var l=_r;if(l&&typeof i=="string"&&i){var f=ye(i);f='link[rel="'+e+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),Kg.has(f)||(Kg.add(f),e={rel:e,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),Un(i,"link",e),dn(i),l.head.appendChild(i)))}}function dy(e){_a.D(e),Jg("dns-prefetch",e,null)}function py(e,i){_a.C(e,i),Jg("preconnect",e,i)}function my(e,i,s){_a.L(e,i,s);var l=_r;if(l&&e&&i){var f='link[rel="preload"][as="'+ye(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+ye(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+ye(s.imageSizes)+'"]')):f+='[href="'+ye(e)+'"]';var d=f;switch(i){case"style":d=xr(e);break;case"script":d=Sr(e)}Ti.has(d)||(e=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Ti.set(d,e),l.querySelector(f)!==null||i==="style"&&l.querySelector(zo(d))||i==="script"&&l.querySelector(Bo(d))||(i=l.createElement("link"),Un(i,"link",e),dn(i),l.head.appendChild(i)))}}function gy(e,i){_a.m(e,i);var s=_r;if(s&&e){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+ye(l)+'"][href="'+ye(e)+'"]',d=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Sr(e)}if(!Ti.has(d)&&(e=_({rel:"modulepreload",href:e},i),Ti.set(d,e),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Bo(d)))return}l=s.createElement("link"),Un(l,"link",e),dn(l),s.head.appendChild(l)}}}function vy(e,i,s){_a.S(e,i,s);var l=_r;if(l&&e){var f=Na(l).hoistableStyles,d=xr(e);i=i||"default";var y=f.get(d);if(!y){var C={loading:0,preload:null};if(y=l.querySelector(zo(d)))C.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Ti.get(d))&&Sh(e,s);var k=y=l.createElement("link");dn(k),Un(k,"link",e),k._p=new Promise(function(ct,St){k.onload=ct,k.onerror=St}),k.addEventListener("load",function(){C.loading|=1}),k.addEventListener("error",function(){C.loading|=2}),C.loading|=4,xc(y,i,l)}y={type:"stylesheet",instance:y,count:1,state:C},f.set(d,y)}}}function _y(e,i){_a.X(e,i);var s=_r;if(s&&e){var l=Na(s).hoistableScripts,f=Sr(e),d=l.get(f);d||(d=s.querySelector(Bo(f)),d||(e=_({src:e,async:!0},i),(i=Ti.get(f))&&yh(e,i),d=s.createElement("script"),dn(d),Un(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(f,d))}}function xy(e,i){_a.M(e,i);var s=_r;if(s&&e){var l=Na(s).hoistableScripts,f=Sr(e),d=l.get(f);d||(d=s.querySelector(Bo(f)),d||(e=_({src:e,async:!0,type:"module"},i),(i=Ti.get(f))&&yh(e,i),d=s.createElement("script"),dn(d),Un(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(f,d))}}function Qg(e,i,s,l){var f=(f=qt.current)?_c(f):null;if(!f)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=xr(s.href),s=Na(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=xr(s.href);var d=Na(f).hoistableStyles,y=d.get(e);if(y||(f=f.ownerDocument||f,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=f.querySelector(zo(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Ti.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ti.set(e,s),d||Sy(f,e,s,y.state))),i&&l===null)throw Error(a(528,""));return y}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Sr(s),s=Na(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function xr(e){return'href="'+ye(e)+'"'}function zo(e){return'link[rel="stylesheet"]['+e+"]"}function jg(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function Sy(e,i,s,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Un(i,"link",s),dn(i),e.head.appendChild(i))}function Sr(e){return'[src="'+ye(e)+'"]'}function Bo(e){return"script[async]"+e}function $g(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+ye(s.href)+'"]');if(l)return i.instance=l,dn(l),l;var f=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),dn(l),Un(l,"style",f),xc(l,s.precedence,e),i.instance=l;case"stylesheet":f=xr(s.href);var d=e.querySelector(zo(f));if(d)return i.state.loading|=4,i.instance=d,dn(d),d;l=jg(s),(f=Ti.get(f))&&Sh(l,f),d=(e.ownerDocument||e).createElement("link"),dn(d);var y=d;return y._p=new Promise(function(C,k){y.onload=C,y.onerror=k}),Un(d,"link",l),i.state.loading|=4,xc(d,s.precedence,e),i.instance=d;case"script":return d=Sr(s.src),(f=e.querySelector(Bo(d)))?(i.instance=f,dn(f),f):(l=s,(f=Ti.get(d))&&(l=_({},s),yh(l,f)),e=e.ownerDocument||e,f=e.createElement("script"),dn(f),Un(f,"link",l),e.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,xc(l,s.precedence,e));return i.instance}function xc(e,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,d=f,y=0;y<l.length;y++){var C=l[y];if(C.dataset.precedence===i)d=C;else if(d!==f)break}d?d.parentNode.insertBefore(e,d.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function Sh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function yh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Sc=null;function tv(e,i,s){if(Sc===null){var l=new Map,f=Sc=new Map;f.set(s,l)}else f=Sc,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(e))return l;for(l.set(e,null),s=s.getElementsByTagName(e),f=0;f<s.length;f++){var d=s[f];if(!(d[Ua]||d[hn]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(i)||"";y=e+y;var C=l.get(y);C?C.push(d):l.set(y,[d])}}return l}function ev(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function yy(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function nv(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function My(e,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=xr(l.href),d=i.querySelector(zo(f));if(d){i=d._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=yc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=d,dn(d);return}d=i.ownerDocument||i,l=jg(l),(f=Ti.get(f))&&Sh(l,f),d=d.createElement("link"),dn(d);var y=d;y._p=new Promise(function(C,k){y.onload=C,y.onerror=k}),Un(d,"link",l),s.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=yc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Mh=0;function Ey(e,i){return e.stylesheets&&e.count===0&&Ec(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var l=setTimeout(function(){if(e.stylesheets&&Ec(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+i);0<e.imgBytes&&Mh===0&&(Mh=62500*iy());var f=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Ec(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Mh?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function yc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ec(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Mc=null;function Ec(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Mc=new Map,i.forEach(by,e),Mc=null,yc.call(e))}function by(e,i){if(!(i.state.loading&4)){var s=Mc.get(e);if(s)var l=s.get(null);else{s=new Map,Mc.set(e,s);for(var f=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<f.length;d++){var y=f[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(s.set(y.dataset.precedence,y),l=y)}l&&s.set(null,l)}f=i.instance,y=f.getAttribute("data-precedence"),d=s.get(y)||l,d===l&&s.set(null,f),s.set(y,f),this.count++,l=yc.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),d?d.parentNode.insertBefore(f,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(f,e.firstChild)),i.state.loading|=4}}var Fo={$$typeof:I,Provider:null,Consumer:null,_currentValue:nt,_currentValue2:nt,_threadCount:0};function Ty(e,i,s,l,f,d,y,C,k){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=se(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=se(0),this.hiddenUpdates=se(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=k,this.incompleteTransitions=new Map}function iv(e,i,s,l,f,d,y,C,k,ct,St,bt){return e=new Ty(e,i,s,y,k,ct,St,bt,C),i=1,d===!0&&(i|=24),d=ri(3,null,null,i),e.current=d,d.stateNode=e,i=tf(),i.refCount++,e.pooledCache=i,i.refCount++,d.memoizedState={element:l,isDehydrated:s,cache:i},sf(d),e}function av(e){return e?(e=Qs,e):Qs}function sv(e,i,s,l,f,d){f=av(f),l.context===null?l.context=f:l.pendingContext=f,l=Ga(i),l.payload={element:s},d=d===void 0?null:d,d!==null&&(l.callback=d),s=Va(e,l,i),s!==null&&($n(s,e,i),vo(s,e,i))}function rv(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function Eh(e,i){rv(e,i),(e=e.alternate)&&rv(e,i)}function ov(e){if(e.tag===13||e.tag===31){var i=ms(e,67108864);i!==null&&$n(i,e,67108864),Eh(e,67108864)}}function lv(e){if(e.tag===13||e.tag===31){var i=fi();i=Qr(i);var s=ms(e,i);s!==null&&$n(s,e,i),Eh(e,i)}}var bc=!0;function Ay(e,i,s,l){var f=B.T;B.T=null;var d=X.p;try{X.p=2,bh(e,i,s,l)}finally{X.p=d,B.T=f}}function wy(e,i,s,l){var f=B.T;B.T=null;var d=X.p;try{X.p=8,bh(e,i,s,l)}finally{X.p=d,B.T=f}}function bh(e,i,s,l){if(bc){var f=Th(l);if(f===null)uh(e,i,l,Tc,s),uv(e,l);else if(Cy(f,e,i,s,l))l.stopPropagation();else if(uv(e,l),i&4&&-1<Ry.indexOf(e)){for(;f!==null;){var d=na(f);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=zt(d.pendingLanes);if(y!==0){var C=d;for(C.pendingLanes|=2,C.entangledLanes|=2;y;){var k=1<<31-Jt(y);C.entanglements[1]|=k,y&=~k}qi(d),(Fe&6)===0&&(oc=oe()+500,No(0))}}break;case 31:case 13:C=ms(d,2),C!==null&&$n(C,d,2),cc(),Eh(d,2)}if(d=Th(l),d===null&&uh(e,i,l,Tc,s),d===f)break;f=d}f!==null&&l.stopPropagation()}else uh(e,i,l,null,s)}}function Th(e){return e=Au(e),Ah(e)}var Tc=null;function Ah(e){if(Tc=null,e=ea(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=u(i),e!==null)return e;e=null}else if(s===31){if(e=h(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Tc=e,null}function cv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(le()){case z:return 2;case b:return 8;case tt:case ut:return 32;case vt:return 268435456;default:return 32}default:return 32}}var wh=!1,$a=null,ts=null,es=null,Ho=new Map,Go=new Map,ns=[],Ry="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function uv(e,i){switch(e){case"focusin":case"focusout":$a=null;break;case"dragenter":case"dragleave":ts=null;break;case"mouseover":case"mouseout":es=null;break;case"pointerover":case"pointerout":Ho.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Go.delete(i.pointerId)}}function Vo(e,i,s,l,f,d){return e===null||e.nativeEvent!==d?(e={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:d,targetContainers:[f]},i!==null&&(i=na(i),i!==null&&ov(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),e)}function Cy(e,i,s,l,f){switch(i){case"focusin":return $a=Vo($a,e,i,s,l,f),!0;case"dragenter":return ts=Vo(ts,e,i,s,l,f),!0;case"mouseover":return es=Vo(es,e,i,s,l,f),!0;case"pointerover":var d=f.pointerId;return Ho.set(d,Vo(Ho.get(d)||null,e,i,s,l,f)),!0;case"gotpointercapture":return d=f.pointerId,Go.set(d,Vo(Go.get(d)||null,e,i,s,l,f)),!0}return!1}function fv(e){var i=ea(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){e.blockedOn=i,Xs(e.priority,function(){lv(s)});return}}else if(i===31){if(i=h(s),i!==null){e.blockedOn=i,Xs(e.priority,function(){lv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ac(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Th(e.nativeEvent);if(s===null){s=e.nativeEvent;var l=new s.constructor(s.type,s);Tu=l,s.target.dispatchEvent(l),Tu=null}else return i=na(s),i!==null&&ov(i),e.blockedOn=s,!1;i.shift()}return!0}function hv(e,i,s){Ac(e)&&s.delete(i)}function Dy(){wh=!1,$a!==null&&Ac($a)&&($a=null),ts!==null&&Ac(ts)&&(ts=null),es!==null&&Ac(es)&&(es=null),Ho.forEach(hv),Go.forEach(hv)}function wc(e,i){e.blockedOn===i&&(e.blockedOn=null,wh||(wh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Dy)))}var Rc=null;function dv(e){Rc!==e&&(Rc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Rc===e&&(Rc=null);for(var i=0;i<e.length;i+=3){var s=e[i],l=e[i+1],f=e[i+2];if(typeof l!="function"){if(Ah(l||s)===null)continue;break}var d=na(s);d!==null&&(e.splice(i,3),i-=3,Tf(d,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function yr(e){function i(k){return wc(k,e)}$a!==null&&wc($a,e),ts!==null&&wc(ts,e),es!==null&&wc(es,e),Ho.forEach(i),Go.forEach(i);for(var s=0;s<ns.length;s++){var l=ns[s];l.blockedOn===e&&(l.blockedOn=null)}for(;0<ns.length&&(s=ns[0],s.blockedOn===null);)fv(s),s.blockedOn===null&&ns.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],d=s[l+1],y=f[wn]||null;if(typeof d=="function")y||dv(s);else if(y){var C=null;if(d&&d.hasAttribute("formAction")){if(f=d,y=d[wn]||null)C=y.formAction;else if(Ah(f)!==null)continue}else C=y.action;typeof C=="function"?s[l+1]=C:(s.splice(l,3),l-=3),dv(s)}}}function pv(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return f=y})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function Rh(e){this._internalRoot=e}Cc.prototype.render=Rh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=fi();sv(s,l,e,i,null,null)},Cc.prototype.unmount=Rh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;sv(e.current,2,null,e,null,null),cc(),i[Yn]=null}};function Cc(e){this._internalRoot=e}Cc.prototype.unstable_scheduleHydration=function(e){if(e){var i=$r();e={blockedOn:null,target:e,priority:i};for(var s=0;s<ns.length&&i!==0&&i<ns[s].priority;s++);ns.splice(s,0,e),s===0&&fv(e)}};var mv=t.version;if(mv!=="19.2.7")throw Error(a(527,mv,"19.2.7"));X.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=p(i),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var Uy={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Dc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Dc.isDisabled&&Dc.supportsFiber)try{mt=Dc.inject(Uy),_t=Dc}catch{}}return Xo.createRoot=function(e,i){if(!o(e))throw Error(a(299));var s=!1,l="",f=M0,d=E0,y=b0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=iv(e,1,!1,null,null,s,l,null,f,d,y,pv),e[Yn]=i.current,ch(e),new Rh(i)},Xo.hydrateRoot=function(e,i,s){if(!o(e))throw Error(a(299));var l=!1,f="",d=M0,y=E0,C=b0,k=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(d=s.onUncaughtError),s.onCaughtError!==void 0&&(y=s.onCaughtError),s.onRecoverableError!==void 0&&(C=s.onRecoverableError),s.formState!==void 0&&(k=s.formState)),i=iv(e,1,!0,i,s??null,l,f,k,d,y,C,pv),i.context=av(null),s=i.current,l=fi(),l=Qr(l),f=Ga(l),f.callback=null,Va(s,f,l),s=l,i.current.lanes=s,te(i,s),qi(i),e[Yn]=i.current,ch(e),new Cc(i)},Xo.version="19.2.7",Xo}var Tv;function ky(){if(Tv)return Uh.exports;Tv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Uh.exports=Vy(),Uh.exports}var Xy=ky();function Wy(r){const[t,n]=Xn.useState(!1);return Xn.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>n(r&&!document.hidden&&!a.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(o);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),a.addEventListener("change",o),document.addEventListener("visibilitychange",o),o(),()=>{c.disconnect(),a.removeEventListener("change",o),document.removeEventListener("visibilitychange",o)}},[r]),t}function qy(r,t,n,a){Xn.useEffect(()=>{const o=t.current,c=n.current;if(!a||!o||!c)return;const u=o.closest("[data-scene-surface]")??o;let h=null;const m=_=>{if(!h||_.pointerId!==h.id)return;const g=Math.max(1,Math.min(u.clientWidth,u.clientHeight));r.drag(c,(_.clientX-h.x)/g,(_.clientY-h.y)/g)},p=_=>{!h||_&&_.pointerId!==h.id||(h=null,delete o.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p))},v=_=>{if(h||!_.isPrimary||_.button!==0)return;const g=_.target instanceof Element?_.target:null;!g||!(o.contains(g)||g.hasAttribute("data-scene-drag"))||(_.pointerType==="mouse"&&_.preventDefault(),h={id:_.pointerId,x:_.clientX,y:_.clientY},o.dataset.look="drag",window.addEventListener("pointermove",m),window.addEventListener("pointerup",p),window.addEventListener("pointercancel",p))};return u.addEventListener("pointerdown",v),()=>{u.removeEventListener("pointerdown",v),p()}},[a,r,t,n])}class Yy{constructor(t){this.options=t,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null}acquire(t){return window.clearTimeout(this.disposeTimer),this.holders.push(t),this.ensureEngine(),this.attachTop(),t.onStatus(this.status),()=>this.release(t)}setRunning(t,n){t.running=n,this.top===t&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(t){}drag(t,n,a){var o,c;this.top===t&&((c=(o=this.engine)==null?void 0:o.drag)==null||c.call(o,n,a))}releaseDrag(t){var n,a;this.top===t&&((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n))}release(t){var n,a;if(this.holders=this.holders.filter(o=>o!==t),this.holders.length){this.attachTop();return}(n=this.engine)==null||n.stop(),this.observe(null),(a=this.canvas)==null||a.remove(),this.disposeTimer=window.setTimeout(()=>this.teardown(),5e3)}setStatus(t){this.status=t;for(const n of this.holders)n.onStatus(t)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const t=document.createElement("canvas");t.className=this.options.canvasClass,t.setAttribute("aria-hidden","true"),this.canvas=t;try{this.engine=this.options.create(t,()=>this.fail())}catch{this.fail();return}const n=this.engine;this.setStatus("loading"),this.configure(n),this.resize(),n.init().then(()=>{this.engine===n&&(n.renderFrame(0),this.setStatus("ready"),this.applyRunning())}).catch(()=>this.fail())}attachTop(){var n,a;const t=this.top;!t||!this.canvas||((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n),this.canvas.parentElement!==t.mount&&t.mount.appendChild(this.canvas),this.observe(t.mount),this.resize(),this.applyRunning())}observe(t){var n;this.observed!==t&&((n=this.observer)==null||n.disconnect(),this.observed=t,t&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(t)))}resize(){var o,c;const t=(o=this.top)==null?void 0:o.mount;if(!t||!this.engine)return;const n=t.clientWidth||window.innerWidth,a=t.clientHeight||window.innerHeight;this.engine.setSize(n,a,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var t;!this.engine||this.status!=="ready"||((t=this.top)!=null&&t.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}teardown(){var t,n;window.clearTimeout(this.disposeTimer),this.observe(null),(t=this.engine)==null||t.dispose(),this.engine=null,(n=this.canvas)==null||n.remove(),this.canvas=null,this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lp="186",Zy=0,Av=1,Ky=2,au=1,z_=2,tl=3,Ps=0,Wn=1,wi=2,wa=0,al=1,wv=2,Rv=3,Cv=4,Jy=5,zr=100,Qy=101,jy=102,$y=103,tM=104,eM=200,nM=201,iM=202,aM=203,B_=204,F_=205,sM=206,rM=207,oM=208,lM=209,cM=210,uM=211,fM=212,hM=213,dM=214,gd=0,vd=1,_d=2,ul=3,xd=4,Sd=5,yd=6,Md=7,cp=0,pM=1,mM=2,Qi=0,H_=1,G_=2,V_=3,up=4,k_=5,X_=6,W_=7,q_=300,Is=301,Xr=302,Ph=303,Ih=304,Su=306,uu=1e3,Aa=1001,Ed=1002,Ln=1003,gM=1004,Uc=1005,zn=1006,zh=1007,Ns=1008,pi=1009,Y_=1010,Z_=1011,fl=1012,fp=1013,$i=1014,Fi=1015,Ri=1016,hp=1017,dp=1018,hl=1020,K_=35902,J_=35899,Q_=1021,j_=1022,Hi=1023,Ca=1026,Os=1027,pp=1028,mp=1029,zs=1030,gp=1031,vp=1033,su=33776,ru=33777,ou=33778,lu=33779,bd=35840,Td=35841,Ad=35842,wd=35843,Rd=36196,Cd=37492,Dd=37496,Ud=37488,Ld=37489,fu=37490,Nd=37491,Od=37808,Pd=37809,Id=37810,zd=37811,Bd=37812,Fd=37813,Hd=37814,Gd=37815,Vd=37816,kd=37817,Xd=37818,Wd=37819,qd=37820,Yd=37821,Zd=36492,Kd=36494,Jd=36495,Qd=36283,jd=36284,hu=36285,$d=36286,vM=3200,du=0,_M=1,Ta="",ti="srgb",pu="srgb-linear",mu="linear",Xe="srgb",Bh=7680,xM=519,SM=512,yM=513,MM=514,_p=515,EM=516,bM=517,xp=518,TM=519,AM=35044,Dv="300 es",Ji=2e3,dl=2001;function wM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function gu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function RM(){const r=gu("canvas");return r.style.display="block",r}const Uv={};function Lv(...r){const t="THREE."+r.shift();console.log(t,...r)}function $_(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function de(...r){r=$_(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...r)}}function Ne(...r){r=$_(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...r)}}function Vr(...r){const t=r.join(" ");t in Uv||(Uv[t]=!0,de(...r))}function CM(r,t,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const DM={[gd]:vd,[_d]:yd,[xd]:Md,[ul]:Sd,[vd]:gd,[yd]:_d,[Md]:xd,[Sd]:ul};class Hs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const o=a[t];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,t);t.target=null}}}const Pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nv=1234567;const sl=Math.PI/180,Wr=180/Math.PI;function Gs(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Pn[r&255]+Pn[r>>8&255]+Pn[r>>16&255]+Pn[r>>24&255]+"-"+Pn[t&255]+Pn[t>>8&255]+"-"+Pn[t>>16&15|64]+Pn[t>>24&255]+"-"+Pn[n&63|128]+Pn[n>>8&255]+"-"+Pn[n>>16&255]+Pn[n>>24&255]+Pn[a&255]+Pn[a>>8&255]+Pn[a>>16&255]+Pn[a>>24&255]).toLowerCase()}function be(r,t,n){return Math.max(t,Math.min(n,r))}function Sp(r,t){return(r%t+t)%t}function UM(r,t,n,a,o){return a+(r-t)*(o-a)/(n-t)}function LM(r,t,n){return r!==t?(n-r)/(t-r):0}function rl(r,t,n){return(1-n)*r+n*t}function NM(r,t,n,a){return rl(r,t,1-Math.exp(-n*a))}function OM(r,t=1){return t-Math.abs(Sp(r,t*2)-t)}function PM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function IM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function zM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function BM(r,t){return r+Math.random()*(t-r)}function FM(r){return r*(.5-Math.random())}function HM(r){r!==void 0&&(Nv=r);let t=Nv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function GM(r){return r*sl}function VM(r){return r*Wr}function kM(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function XM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function WM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function qM(r,t,n,a,o){const c=Math.cos,u=Math.sin,h=c(n/2),m=u(n/2),p=c((t+a)/2),v=u((t+a)/2),_=c((t-a)/2),g=u((t-a)/2),x=c((a-t)/2),T=u((a-t)/2);switch(o){case"XYX":r.set(h*v,m*_,m*g,h*p);break;case"YZY":r.set(m*g,h*v,m*_,h*p);break;case"ZXZ":r.set(m*_,m*g,h*v,h*p);break;case"XZX":r.set(h*v,m*T,m*x,h*p);break;case"YXY":r.set(m*x,h*v,m*T,h*p);break;case"ZYZ":r.set(m*T,m*x,h*v,h*p);break;default:de("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Br(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Vn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Wo={DEG2RAD:sl,RAD2DEG:Wr,generateUUID:Gs,clamp:be,euclideanModulo:Sp,mapLinear:UM,inverseLerp:LM,lerp:rl,damp:NM,pingpong:OM,smoothstep:PM,smootherstep:IM,randInt:zM,randFloat:BM,randFloatSpread:FM,seededRandom:HM,degToRad:GM,radToDeg:VM,isPowerOfTwo:kM,ceilPowerOfTwo:XM,floorPowerOfTwo:WM,setQuaternionFromProperEuler:qM,normalize:Vn,denormalize:Br},Np=class Np{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=be(this.x,t.x,n.x),this.y=be(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=be(this.x,t,n),this.y=be(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(be(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(be(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-t.x,u=this.y-t.y;return this.x=c*a-u*o+t.x,this.y=c*o+u*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Np.prototype.isVector2=!0;let Ot=Np;class Zr{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,c,u,h){let m=a[o+0],p=a[o+1],v=a[o+2],_=a[o+3],g=c[u+0],x=c[u+1],T=c[u+2],D=c[u+3];if(_!==D||m!==g||p!==x||v!==T){let M=m*g+p*x+v*T+_*D;M<0&&(g=-g,x=-x,T=-T,D=-D,M=-M);let S=1-h;if(M<.9995){const O=Math.acos(M),I=Math.sin(O);S=Math.sin(S*O)/I,h=Math.sin(h*O)/I,m=m*S+g*h,p=p*S+x*h,v=v*S+T*h,_=_*S+D*h}else{m=m*S+g*h,p=p*S+x*h,v=v*S+T*h,_=_*S+D*h;const O=1/Math.sqrt(m*m+p*p+v*v+_*_);m*=O,p*=O,v*=O,_*=O}}t[n]=m,t[n+1]=p,t[n+2]=v,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,o,c,u){const h=a[o],m=a[o+1],p=a[o+2],v=a[o+3],_=c[u],g=c[u+1],x=c[u+2],T=c[u+3];return t[n]=h*T+v*_+m*x-p*g,t[n+1]=m*T+v*g+p*_-h*x,t[n+2]=p*T+v*x+h*g-m*_,t[n+3]=v*T-h*_-m*g-p*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,c=t._z,u=t._order,h=Math.cos,m=Math.sin,p=h(a/2),v=h(o/2),_=h(c/2),g=m(a/2),x=m(o/2),T=m(c/2);switch(u){case"XYZ":this._x=g*v*_+p*x*T,this._y=p*x*_-g*v*T,this._z=p*v*T+g*x*_,this._w=p*v*_-g*x*T;break;case"YXZ":this._x=g*v*_+p*x*T,this._y=p*x*_-g*v*T,this._z=p*v*T-g*x*_,this._w=p*v*_+g*x*T;break;case"ZXY":this._x=g*v*_-p*x*T,this._y=p*x*_+g*v*T,this._z=p*v*T+g*x*_,this._w=p*v*_-g*x*T;break;case"ZYX":this._x=g*v*_-p*x*T,this._y=p*x*_+g*v*T,this._z=p*v*T-g*x*_,this._w=p*v*_+g*x*T;break;case"YZX":this._x=g*v*_+p*x*T,this._y=p*x*_+g*v*T,this._z=p*v*T-g*x*_,this._w=p*v*_-g*x*T;break;case"XZY":this._x=g*v*_-p*x*T,this._y=p*x*_-g*v*T,this._z=p*v*T+g*x*_,this._w=p*v*_+g*x*T;break;default:de("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],c=n[8],u=n[1],h=n[5],m=n[9],p=n[2],v=n[6],_=n[10],g=a+h+_;if(g>0){const x=.5/Math.sqrt(g+1);this._w=.25/x,this._x=(v-m)*x,this._y=(c-p)*x,this._z=(u-o)*x}else if(a>h&&a>_){const x=2*Math.sqrt(1+a-h-_);this._w=(v-m)/x,this._x=.25*x,this._y=(o+u)/x,this._z=(c+p)/x}else if(h>_){const x=2*Math.sqrt(1+h-a-_);this._w=(c-p)/x,this._x=(o+u)/x,this._y=.25*x,this._z=(m+v)/x}else{const x=2*Math.sqrt(1+_-a-h);this._w=(u-o)/x,this._x=(c+p)/x,this._y=(m+v)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,c=t._z,u=t._w,h=n._x,m=n._y,p=n._z,v=n._w;return this._x=a*v+u*h+o*p-c*m,this._y=o*v+u*m+c*h-a*p,this._z=c*v+u*p+a*m-o*h,this._w=u*v-a*h-o*m-c*p,this._onChangeCallback(),this}slerp(t,n){let a=t._x,o=t._y,c=t._z,u=t._w,h=this.dot(t);h<0&&(a=-a,o=-o,c=-c,u=-u,h=-h);let m=1-n;if(h<.9995){const p=Math.acos(h),v=Math.sin(p);m=Math.sin(m*p)/v,n=Math.sin(n*p)/v,this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this._onChangeCallback()}else this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Op=class Op{constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Ov.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Ov.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=t.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,c=t.x,u=t.y,h=t.z,m=t.w,p=2*(u*o-h*a),v=2*(h*n-c*o),_=2*(c*a-u*n);return this.x=n+m*p+u*_-h*v,this.y=a+m*v+h*p-c*_,this.z=o+m*_+c*v-u*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=be(this.x,t.x,n.x),this.y=be(this.y,t.y,n.y),this.z=be(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=be(this.x,t,n),this.y=be(this.y,t,n),this.z=be(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(be(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,c=t.z,u=n.x,h=n.y,m=n.z;return this.x=o*m-c*h,this.y=c*u-a*m,this.z=a*h-o*u,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Fh.copy(this).projectOnVector(t),this.sub(Fh)}reflect(t){return this.sub(Fh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(be(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Op.prototype.isVector3=!0;let W=Op;const Fh=new W,Ov=new Zr,Pp=class Pp{constructor(t,n,a,o,c,u,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,h,m,p)}set(t,n,a,o,c,u,h,m,p){const v=this.elements;return v[0]=t,v[1]=o,v[2]=h,v[3]=n,v[4]=c,v[5]=m,v[6]=a,v[7]=u,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],h=a[3],m=a[6],p=a[1],v=a[4],_=a[7],g=a[2],x=a[5],T=a[8],D=o[0],M=o[3],S=o[6],O=o[1],I=o[4],A=o[7],P=o[2],R=o[5],L=o[8];return c[0]=u*D+h*O+m*P,c[3]=u*M+h*I+m*R,c[6]=u*S+h*A+m*L,c[1]=p*D+v*O+_*P,c[4]=p*M+v*I+_*R,c[7]=p*S+v*A+_*L,c[2]=g*D+x*O+T*P,c[5]=g*M+x*I+T*R,c[8]=g*S+x*A+T*L,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],p=t[7],v=t[8];return n*u*v-n*h*p-a*c*v+a*h*m+o*c*p-o*u*m}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],p=t[7],v=t[8],_=v*u-h*p,g=h*m-v*c,x=p*c-u*m,T=n*_+a*g+o*x;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/T;return t[0]=_*D,t[1]=(o*p-v*a)*D,t[2]=(h*a-o*u)*D,t[3]=g*D,t[4]=(v*n-o*m)*D,t[5]=(o*c-h*n)*D,t[6]=x*D,t[7]=(a*m-p*n)*D,t[8]=(u*n-a*c)*D,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,c,u,h){const m=Math.cos(c),p=Math.sin(c);return this.set(a*m,a*p,-a*(m*u+p*h)+u+t,-o*p,o*m,-o*(-p*u+m*h)+h+n,0,0,1),this}scale(t,n){return Vr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hh.makeScale(t,n)),this}rotate(t){return Vr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hh.makeRotation(-t)),this}translate(t,n){return Vr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Pp.prototype.isMatrix3=!0;let ge=Pp;const Hh=new ge,Pv=new ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Iv=new ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function YM(){const r={enabled:!0,workingColorSpace:pu,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===Xe&&(o.r=Ra(o.r),o.g=Ra(o.g),o.b=Ra(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Xe&&(o.r=kr(o.r),o.g=kr(o.g),o.b=kr(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Ta?mu:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return Vr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return Vr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[pu]:{primaries:t,whitePoint:a,transfer:mu,toXYZ:Pv,fromXYZ:Iv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:t,whitePoint:a,transfer:Xe,toXYZ:Pv,fromXYZ:Iv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}}),r}const Ue=YM();function Ra(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function kr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Mr;class ZM{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Mr===void 0&&(Mr=gu("canvas")),Mr.width=t.width,Mr.height=t.height;const o=Mr.getContext("2d");t instanceof ImageData?o.putImageData(t,0,0):o.drawImage(t,0,0,t.width,t.height),a=Mr}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=gu("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=Ra(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Ra(n[a]/255)*255):n[a]=Ra(n[a]);return{data:n,width:t.width,height:t.height}}else return de("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let KM=0;class yp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:KM++}),this.uuid=Gs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,h=o.length;u<h;u++)o[u].isDataTexture?c.push(Gh(o[u].image)):c.push(Gh(o[u]))}else c=Gh(o);a.url=c}return n||(t.images[this.uuid]=a),a}}function Gh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ZM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(de("Texture: Unable to serialize Texture."),{})}let JM=0;const Vh=new W;class Bn extends Hs{constructor(t=Bn.DEFAULT_IMAGE,n=Bn.DEFAULT_MAPPING,a=Aa,o=Aa,c=zn,u=Ns,h=Hi,m=pi,p=Bn.DEFAULT_ANISOTROPY,v=Ta){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:JM++}),this.uuid=Gs(),this.name="",this.source=new yp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Vh).x}get height(){return this.source.getSize(Vh).y}get depth(){return this.source.getSize(Vh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){de(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){de(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==q_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case uu:t.x=t.x-Math.floor(t.x);break;case Aa:t.x=t.x<0?0:1;break;case Ed:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case uu:t.y=t.y-Math.floor(t.y);break;case Aa:t.y=t.y<0?0:1;break;case Ed:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=q_;Bn.DEFAULT_ANISOTROPY=1;const Ip=class Ip{constructor(t=0,n=0,a=0,o=1){this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=this.w,u=t.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,c;const m=t.elements,p=m[0],v=m[4],_=m[8],g=m[1],x=m[5],T=m[9],D=m[2],M=m[6],S=m[10];if(Math.abs(v-g)<.01&&Math.abs(_-D)<.01&&Math.abs(T-M)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+D)<.1&&Math.abs(T+M)<.1&&Math.abs(p+x+S-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const I=(p+1)/2,A=(x+1)/2,P=(S+1)/2,R=(v+g)/4,L=(_+D)/4,E=(T+M)/4;return I>A&&I>P?I<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(I),o=R/a,c=L/a):A>P?A<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(A),a=R/o,c=E/o):P<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(P),a=L/c,o=E/c),this.set(a,o,c,n),this}let O=Math.sqrt((M-T)*(M-T)+(_-D)*(_-D)+(g-v)*(g-v));return Math.abs(O)<.001&&(O=1),this.x=(M-T)/O,this.y=(_-D)/O,this.z=(g-v)/O,this.w=Math.acos((p+x+S-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=be(this.x,t.x,n.x),this.y=be(this.y,t.y,n.y),this.z=be(this.z,t.z,n.z),this.w=be(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=be(this.x,t,n),this.y=be(this.y,t,n),this.z=be(this.z,t,n),this.w=be(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(be(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ip.prototype.isVector4=!0;let en=Ip;class QM extends Hs{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new en(0,0,t,n),this.scissorTest=!1,this.viewport=new en(0,0,t,n),this.textures=[];const o={width:t,height:n,depth:a.depth},c=new Bn(o),u=a.count;for(let h=0;h<u;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:zn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},t.textures[n].image);this.textures[n].source=new yp(o)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends QM{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class tx extends Bn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Aa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class jM extends Bn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Aa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const xu=class xu{constructor(t,n,a,o,c,u,h,m,p,v,_,g,x,T,D,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,h,m,p,v,_,g,x,T,D,M)}set(t,n,a,o,c,u,h,m,p,v,_,g,x,T,D,M){const S=this.elements;return S[0]=t,S[4]=n,S[8]=a,S[12]=o,S[1]=c,S[5]=u,S[9]=h,S[13]=m,S[2]=p,S[6]=v,S[10]=_,S[14]=g,S[3]=x,S[7]=T,S[11]=D,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xu().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,o=1/Er.setFromMatrixColumn(t,0).length(),c=1/Er.setFromMatrixColumn(t,1).length(),u=1/Er.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,c=t.z,u=Math.cos(a),h=Math.sin(a),m=Math.cos(o),p=Math.sin(o),v=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const g=u*v,x=u*_,T=h*v,D=h*_;n[0]=m*v,n[4]=-m*_,n[8]=p,n[1]=x+T*p,n[5]=g-D*p,n[9]=-h*m,n[2]=D-g*p,n[6]=T+x*p,n[10]=u*m}else if(t.order==="YXZ"){const g=m*v,x=m*_,T=p*v,D=p*_;n[0]=g+D*h,n[4]=T*h-x,n[8]=u*p,n[1]=u*_,n[5]=u*v,n[9]=-h,n[2]=x*h-T,n[6]=D+g*h,n[10]=u*m}else if(t.order==="ZXY"){const g=m*v,x=m*_,T=p*v,D=p*_;n[0]=g-D*h,n[4]=-u*_,n[8]=T+x*h,n[1]=x+T*h,n[5]=u*v,n[9]=D-g*h,n[2]=-u*p,n[6]=h,n[10]=u*m}else if(t.order==="ZYX"){const g=u*v,x=u*_,T=h*v,D=h*_;n[0]=m*v,n[4]=T*p-x,n[8]=g*p+D,n[1]=m*_,n[5]=D*p+g,n[9]=x*p-T,n[2]=-p,n[6]=h*m,n[10]=u*m}else if(t.order==="YZX"){const g=u*m,x=u*p,T=h*m,D=h*p;n[0]=m*v,n[4]=D-g*_,n[8]=T*_+x,n[1]=_,n[5]=u*v,n[9]=-h*v,n[2]=-p*v,n[6]=x*_+T,n[10]=g-D*_}else if(t.order==="XZY"){const g=u*m,x=u*p,T=h*m,D=h*p;n[0]=m*v,n[4]=-_,n[8]=p*v,n[1]=g*_+D,n[5]=u*v,n[9]=x*_-T,n[2]=T*_-x,n[6]=h*v,n[10]=D*_+g}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose($M,t,t1)}lookAt(t,n,a){const o=this.elements;return hi.subVectors(t,n),hi.lengthSq()===0&&(hi.z=1),hi.normalize(),as.crossVectors(a,hi),as.lengthSq()===0&&(Math.abs(a.z)===1?hi.x+=1e-4:hi.z+=1e-4,hi.normalize(),as.crossVectors(a,hi)),as.normalize(),Lc.crossVectors(hi,as),o[0]=as.x,o[4]=Lc.x,o[8]=hi.x,o[1]=as.y,o[5]=Lc.y,o[9]=hi.y,o[2]=as.z,o[6]=Lc.z,o[10]=hi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],h=a[4],m=a[8],p=a[12],v=a[1],_=a[5],g=a[9],x=a[13],T=a[2],D=a[6],M=a[10],S=a[14],O=a[3],I=a[7],A=a[11],P=a[15],R=o[0],L=o[4],E=o[8],N=o[12],F=o[1],H=o[5],q=o[9],K=o[13],G=o[2],J=o[6],B=o[10],X=o[14],nt=o[3],it=o[7],ot=o[11],U=o[15];return c[0]=u*R+h*F+m*G+p*nt,c[4]=u*L+h*H+m*J+p*it,c[8]=u*E+h*q+m*B+p*ot,c[12]=u*N+h*K+m*X+p*U,c[1]=v*R+_*F+g*G+x*nt,c[5]=v*L+_*H+g*J+x*it,c[9]=v*E+_*q+g*B+x*ot,c[13]=v*N+_*K+g*X+x*U,c[2]=T*R+D*F+M*G+S*nt,c[6]=T*L+D*H+M*J+S*it,c[10]=T*E+D*q+M*B+S*ot,c[14]=T*N+D*K+M*X+S*U,c[3]=O*R+I*F+A*G+P*nt,c[7]=O*L+I*H+A*J+P*it,c[11]=O*E+I*q+A*B+P*ot,c[15]=O*N+I*K+A*X+P*U,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[12],u=t[1],h=t[5],m=t[9],p=t[13],v=t[2],_=t[6],g=t[10],x=t[14],T=t[3],D=t[7],M=t[11],S=t[15],O=m*x-p*g,I=h*x-p*_,A=h*g-m*_,P=u*x-p*v,R=u*g-m*v,L=u*_-h*v;return n*(D*O-M*I+S*A)-a*(T*O-M*P+S*R)+o*(T*I-D*P+S*L)-c*(T*A-D*R+M*L)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[1],u=t[5],h=t[9],m=t[2],p=t[6],v=t[10];return n*(u*v-h*p)-a*(c*v-h*m)+o*(c*p-u*m)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],p=t[7],v=t[8],_=t[9],g=t[10],x=t[11],T=t[12],D=t[13],M=t[14],S=t[15],O=n*h-a*u,I=n*m-o*u,A=n*p-c*u,P=a*m-o*h,R=a*p-c*h,L=o*p-c*m,E=v*D-_*T,N=v*M-g*T,F=v*S-x*T,H=_*M-g*D,q=_*S-x*D,K=g*S-x*M,G=O*K-I*q+A*H+P*F-R*N+L*E;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const J=1/G;return t[0]=(h*K-m*q+p*H)*J,t[1]=(o*q-a*K-c*H)*J,t[2]=(D*L-M*R+S*P)*J,t[3]=(g*R-_*L-x*P)*J,t[4]=(m*F-u*K-p*N)*J,t[5]=(n*K-o*F+c*N)*J,t[6]=(M*A-T*L-S*I)*J,t[7]=(v*L-g*A+x*I)*J,t[8]=(u*q-h*F+p*E)*J,t[9]=(a*F-n*q-c*E)*J,t[10]=(T*R-D*A+S*O)*J,t[11]=(_*A-v*R-x*O)*J,t[12]=(h*N-u*H-m*E)*J,t[13]=(n*H-a*N+o*E)*J,t[14]=(D*I-T*P-M*O)*J,t[15]=(v*P-_*I+g*O)*J,this}scale(t){const n=this.elements,a=t.x,o=t.y,c=t.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=t.x,h=t.y,m=t.z,p=c*u,v=c*h;return this.set(p*u+a,p*h-o*m,p*m+o*h,0,p*h+o*m,v*h+a,v*m-o*u,0,p*m-o*h,v*m+o*u,c*m*m+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,c,u){return this.set(1,a,c,0,t,1,u,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,c=n._x,u=n._y,h=n._z,m=n._w,p=c+c,v=u+u,_=h+h,g=c*p,x=c*v,T=c*_,D=u*v,M=u*_,S=h*_,O=m*p,I=m*v,A=m*_,P=a.x,R=a.y,L=a.z;return o[0]=(1-(D+S))*P,o[1]=(x+A)*P,o[2]=(T-I)*P,o[3]=0,o[4]=(x-A)*R,o[5]=(1-(g+S))*R,o[6]=(M+O)*R,o[7]=0,o[8]=(T+I)*L,o[9]=(M-O)*L,o[10]=(1-(g+D))*L,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;t.x=o[12],t.y=o[13],t.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=Er.set(o[0],o[1],o[2]).length();const h=Er.set(o[4],o[5],o[6]).length(),m=Er.set(o[8],o[9],o[10]).length();c<0&&(u=-u),Oi.copy(this);const p=1/u,v=1/h,_=1/m;return Oi.elements[0]*=p,Oi.elements[1]*=p,Oi.elements[2]*=p,Oi.elements[4]*=v,Oi.elements[5]*=v,Oi.elements[6]*=v,Oi.elements[8]*=_,Oi.elements[9]*=_,Oi.elements[10]*=_,n.setFromRotationMatrix(Oi),a.x=u,a.y=h,a.z=m,this}makePerspective(t,n,a,o,c,u,h=Ji,m=!1){const p=this.elements,v=2*c/(n-t),_=2*c/(a-o),g=(n+t)/(n-t),x=(a+o)/(a-o);let T,D;if(m)T=c/(u-c),D=u*c/(u-c);else if(h===Ji)T=-(u+c)/(u-c),D=-2*u*c/(u-c);else if(h===dl)T=-u/(u-c),D=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=v,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=_,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=T,p[14]=D,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,o,c,u,h=Ji,m=!1){const p=this.elements,v=2/(n-t),_=2/(a-o),g=-(n+t)/(n-t),x=-(a+o)/(a-o);let T,D;if(m)T=1/(u-c),D=u/(u-c);else if(h===Ji)T=-2/(u-c),D=-(u+c)/(u-c);else if(h===dl)T=-1/(u-c),D=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=v,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=_,p[9]=0,p[13]=x,p[2]=0,p[6]=0,p[10]=T,p[14]=D,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}};xu.prototype.isMatrix4=!0;let Ge=xu;const Er=new W,Oi=new Ge,$M=new W(0,0,0),t1=new W(1,1,1),as=new W,Lc=new W,hi=new W,zv=new Ge,Bv=new Zr;class Da{constructor(t=0,n=0,a=0,o=Da.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,c=o[0],u=o[4],h=o[8],m=o[1],p=o[5],v=o[9],_=o[2],g=o[6],x=o[10];switch(n){case"XYZ":this._y=Math.asin(be(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,x),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-be(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(h,x),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(be(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,x),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-be(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(be(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,x));break;case"XZY":this._z=Math.asin(-be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-v,x),this._y=0);break;default:de("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return zv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zv,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Bv.setFromEuler(this),this.setFromQuaternion(Bv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Da.DEFAULT_ORDER="XYZ";class Mp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let e1=0;const Fv=new W,br=new Zr,xa=new Ge,Nc=new W,qo=new W,n1=new W,i1=new Zr,Hv=new W(1,0,0),Gv=new W(0,1,0),Vv=new W(0,0,1),kv={type:"added"},a1={type:"removed"},Tr={type:"childadded",child:null},kh={type:"childremoved",child:null};class Sn extends Hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:e1++}),this.uuid=Gs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Sn.DEFAULT_UP.clone();const t=new W,n=new Da,a=new Zr,o=new W(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ge},normalMatrix:{value:new ge}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=Sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return br.setFromAxisAngle(t,n),this.quaternion.multiply(br),this}rotateOnWorldAxis(t,n){return br.setFromAxisAngle(t,n),this.quaternion.premultiply(br),this}rotateX(t){return this.rotateOnAxis(Hv,t)}rotateY(t){return this.rotateOnAxis(Gv,t)}rotateZ(t){return this.rotateOnAxis(Vv,t)}translateOnAxis(t,n){return Fv.copy(t).applyQuaternion(this.quaternion),this.position.add(Fv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Hv,t)}translateY(t){return this.translateOnAxis(Gv,t)}translateZ(t){return this.translateOnAxis(Vv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Nc.copy(t):Nc.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(qo,Nc,this.up):xa.lookAt(Nc,qo,this.up),this.quaternion.setFromRotationMatrix(xa),o&&(xa.extractRotation(o.matrixWorld),br.setFromRotationMatrix(xa),this.quaternion.premultiply(br.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(kv),Tr.child=t,this.dispatchEvent(Tr),Tr.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(a1),kh.child=t,this.dispatchEvent(kh),kh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xa.multiply(t.parent.matrixWorld)),t.applyMatrix4(xa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(kv),Tr.child=t,this.dispatchEvent(Tr),Tr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(t,n);if(u!==void 0)return u}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,t,n1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,i1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,o=t.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const o=this.parent;if(t===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,h=c.length;u<h;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const _=m[p];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(t.materials,this.material[m]));o.material=h}else o.material=c(t.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];o.animations.push(c(t.animations,m))}}if(n){const h=u(t.geometries),m=u(t.materials),p=u(t.textures),v=u(t.images),_=u(t.shapes),g=u(t.skeletons),x=u(t.animations),T=u(t.nodes);h.length>0&&(a.geometries=h),m.length>0&&(a.materials=m),p.length>0&&(a.textures=p),v.length>0&&(a.images=v),_.length>0&&(a.shapes=_),g.length>0&&(a.skeletons=g),x.length>0&&(a.animations=x),T.length>0&&(a.nodes=T)}return a.object=o,a;function u(h){const m=[];for(const p in h){const v=h[p];delete v.metadata,m.push(v)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Sn.DEFAULT_UP=new W(0,1,0);Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class zi extends Sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const s1={type:"move"};class Xh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,c=null,u=null;const h=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){u=!0;for(const D of t.hand.values()){const M=n.getJointPose(D,a),S=this._getHandJoint(p,D);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const v=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],g=v.position.distanceTo(_.position),x=.02,T=.005;p.inputState.pinching&&g>x+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&g<=x-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));h!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(s1)))}return h!==null&&(h.visible=o!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new zi;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const ex={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},Oc={h:0,s:0,l:0};function Wh(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class ve{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.colorSpaceToWorking(this,n),this}setRGB(t,n,a,o=Ue.workingColorSpace){return this.r=t,this.g=n,this.b=a,Ue.colorSpaceToWorking(this,o),this}setHSL(t,n,a,o=Ue.workingColorSpace){if(t=Sp(t,1),n=be(n,0,1),a=be(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=Wh(u,c,t+1/3),this.g=Wh(u,c,t),this.b=Wh(u,c,t-1/3)}return Ue.colorSpaceToWorking(this,o),this}setStyle(t,n=ti){function a(c){c!==void 0&&parseFloat(c)<1&&de("Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const u=o[1],h=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:de("Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);de("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ti){const a=ex[t.toLowerCase()];return a!==void 0?this.setHex(a,n):de("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ra(t.r),this.g=Ra(t.g),this.b=Ra(t.b),this}copyLinearToSRGB(t){return this.r=kr(t.r),this.g=kr(t.g),this.b=kr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ti){return Ue.workingToColorSpace(In.copy(this),t),Math.round(be(In.r*255,0,255))*65536+Math.round(be(In.g*255,0,255))*256+Math.round(be(In.b*255,0,255))}getHexString(t=ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ue.workingColorSpace){Ue.workingToColorSpace(In.copy(this),n);const a=In.r,o=In.g,c=In.b,u=Math.max(a,o,c),h=Math.min(a,o,c);let m,p;const v=(h+u)/2;if(h===u)m=0,p=0;else{const _=u-h;switch(p=v<=.5?_/(u+h):_/(2-u-h),u){case a:m=(o-c)/_+(o<c?6:0);break;case o:m=(c-a)/_+2;break;case c:m=(a-o)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=v,t}getRGB(t,n=Ue.workingColorSpace){return Ue.workingToColorSpace(In.copy(this),n),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=ti){Ue.workingToColorSpace(In.copy(this),t);const n=In.r,a=In.g,o=In.b;return t!==ti?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(ss),this.setHSL(ss.h+t,ss.s+n,ss.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(ss),t.getHSL(Oc);const a=rl(ss.h,Oc.h,n),o=rl(ss.s,Oc.s,n),c=rl(ss.l,Oc.l,n);return this.setHSL(a,o,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new ve;ve.NAMES=ex;class Ep{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new ve(t),this.density=n}clone(){return new Ep(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class nx extends Sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Da,this.environmentIntensity=1,this.environmentRotation=new Da,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Pi=new W,Sa=new W,qh=new W,ya=new W,Ar=new W,wr=new W,Xv=new W,Yh=new W,Zh=new W,Kh=new W,Jh=new en,Qh=new en,jh=new en;class Bi{constructor(t=new W,n=new W,a=new W){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),Pi.subVectors(t,n),o.cross(Pi);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(t,n,a,o,c){Pi.subVectors(o,n),Sa.subVectors(a,n),qh.subVectors(t,n);const u=Pi.dot(Pi),h=Pi.dot(Sa),m=Pi.dot(qh),p=Sa.dot(Sa),v=Sa.dot(qh),_=u*p-h*h;if(_===0)return c.set(0,0,0),null;const g=1/_,x=(p*m-h*v)*g,T=(u*v-h*m)*g;return c.set(1-x-T,T,x)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(t,n,a,o,c,u,h,m){return this.getBarycoord(t,n,a,o,ya)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ya.x),m.addScaledVector(u,ya.y),m.addScaledVector(h,ya.z),m)}static getInterpolatedAttribute(t,n,a,o,c,u){return Jh.setScalar(0),Qh.setScalar(0),jh.setScalar(0),Jh.fromBufferAttribute(t,n),Qh.fromBufferAttribute(t,a),jh.fromBufferAttribute(t,o),u.setScalar(0),u.addScaledVector(Jh,c.x),u.addScaledVector(Qh,c.y),u.addScaledVector(jh,c.z),u}static isFrontFacing(t,n,a,o){return Pi.subVectors(a,n),Sa.subVectors(t,n),Pi.cross(Sa).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pi.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),Pi.cross(Sa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Bi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,c){return Bi.getInterpolation(t,this.a,this.b,this.c,n,a,o,c)}containsPoint(t){return Bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,c=this.c;let u,h;Ar.subVectors(o,a),wr.subVectors(c,a),Yh.subVectors(t,a);const m=Ar.dot(Yh),p=wr.dot(Yh);if(m<=0&&p<=0)return n.copy(a);Zh.subVectors(t,o);const v=Ar.dot(Zh),_=wr.dot(Zh);if(v>=0&&_<=v)return n.copy(o);const g=m*_-v*p;if(g<=0&&m>=0&&v<=0)return u=m/(m-v),n.copy(a).addScaledVector(Ar,u);Kh.subVectors(t,c);const x=Ar.dot(Kh),T=wr.dot(Kh);if(T>=0&&x<=T)return n.copy(c);const D=x*p-m*T;if(D<=0&&p>=0&&T<=0)return h=p/(p-T),n.copy(a).addScaledVector(wr,h);const M=v*T-x*_;if(M<=0&&_-v>=0&&x-T>=0)return Xv.subVectors(c,o),h=(_-v)/(_-v+(x-T)),n.copy(o).addScaledVector(Xv,h);const S=1/(M+D+g);return u=D*S,h=g*S,n.copy(a).addScaledVector(Ar,u).addScaledVector(wr,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Vs{constructor(t=new W(1/0,1/0,1/0),n=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Ii.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Ii.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Ii.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let u=0,h=c.count;u<h;u++)t.isMesh===!0?t.getVertexPosition(u,Ii):Ii.fromBufferAttribute(c,u),Ii.applyMatrix4(t.matrixWorld),this.expandByPoint(Ii);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Pc.copy(a.boundingBox)),Pc.applyMatrix4(t.matrixWorld),this.union(Pc)}const o=t.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ii),Ii.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Yo),Ic.subVectors(this.max,Yo),Rr.subVectors(t.a,Yo),Cr.subVectors(t.b,Yo),Dr.subVectors(t.c,Yo),rs.subVectors(Cr,Rr),os.subVectors(Dr,Cr),Rs.subVectors(Rr,Dr);let n=[0,-rs.z,rs.y,0,-os.z,os.y,0,-Rs.z,Rs.y,rs.z,0,-rs.x,os.z,0,-os.x,Rs.z,0,-Rs.x,-rs.y,rs.x,0,-os.y,os.x,0,-Rs.y,Rs.x,0];return!$h(n,Rr,Cr,Dr,Ic)||(n=[1,0,0,0,1,0,0,0,1],!$h(n,Rr,Cr,Dr,Ic))?!1:(zc.crossVectors(rs,os),n=[zc.x,zc.y,zc.z],$h(n,Rr,Cr,Dr,Ic))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ii).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ii).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ma),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ma=[new W,new W,new W,new W,new W,new W,new W,new W],Ii=new W,Pc=new Vs,Rr=new W,Cr=new W,Dr=new W,rs=new W,os=new W,Rs=new W,Yo=new W,Ic=new W,zc=new W,Cs=new W;function $h(r,t,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){Cs.fromArray(r,c);const h=o.x*Math.abs(Cs.x)+o.y*Math.abs(Cs.y)+o.z*Math.abs(Cs.z),m=t.dot(Cs),p=n.dot(Cs),v=a.dot(Cs);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>h)return!1}return!0}const xn=new W,Bc=new Ot;let r1=0;class ji extends Hs{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:r1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=AM,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Bc.fromBufferAttribute(this,n),Bc.applyMatrix3(t),this.setXY(n,Bc.x,Bc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)xn.fromBufferAttribute(this,n),xn.applyMatrix3(t),this.setXYZ(n,xn.x,xn.y,xn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)xn.fromBufferAttribute(this,n),xn.applyMatrix4(t),this.setXYZ(n,xn.x,xn.y,xn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)xn.fromBufferAttribute(this,n),xn.applyNormalMatrix(t),this.setXYZ(n,xn.x,xn.y,xn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)xn.fromBufferAttribute(this,n),xn.transformDirection(t),this.setXYZ(n,xn.x,xn.y,xn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=Br(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=Vn(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Br(n,this.array)),n}setX(t,n){return this.normalized&&(n=Vn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Br(n,this.array)),n}setY(t,n){return this.normalized&&(n=Vn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Br(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Vn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Br(n,this.array)),n}setW(t,n){return this.normalized&&(n=Vn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=Vn(n,this.array),a=Vn(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=Vn(n,this.array),a=Vn(a,this.array),o=Vn(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t*=this.itemSize,this.normalized&&(n=Vn(n,this.array),a=Vn(a,this.array),o=Vn(o,this.array),c=Vn(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class ix extends ji{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class ax extends ji{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class He extends ji{constructor(t,n,a){super(new Float32Array(t),n,a)}}const o1=new Vs,Zo=new W,td=new W;class _l{constructor(t=new W,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):o1.setFromPoints(t).getCenter(a);let o=0;for(let c=0,u=t.length;c<u;c++)o=Math.max(o,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zo.subVectors(t,this.center);const n=Zo.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(Zo,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(td.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zo.copy(t.center).add(td)),this.expandByPoint(Zo.copy(t.center).sub(td))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let l1=0;const Ai=new Ge,ed=new Sn,Ur=new W,di=new Vs,Ko=new Vs,An=new W;class Nn extends Hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:l1++}),this.uuid=Gs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wM(t)?ax:ix)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new ge().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ai.makeRotationFromQuaternion(t),this.applyMatrix4(Ai),this}rotateX(t){return Ai.makeRotationX(t),this.applyMatrix4(Ai),this}rotateY(t){return Ai.makeRotationY(t),this.applyMatrix4(Ai),this}rotateZ(t){return Ai.makeRotationZ(t),this.applyMatrix4(Ai),this}translate(t,n,a){return Ai.makeTranslation(t,n,a),this.applyMatrix4(Ai),this}scale(t,n,a){return Ai.makeScale(t,n,a),this.applyMatrix4(Ai),this}lookAt(t){return ed.lookAt(t),ed.updateMatrix(),this.applyMatrix4(ed.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ur).negate(),this.translate(Ur.x,Ur.y,Ur.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=t.length;o<c;o++){const u=t[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new He(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const c=t[o];n.setXYZ(o,c.x,c.y,c.z||0)}t.length>n.count&&de("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vs);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];di.setFromBufferAttribute(c),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _l);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(t){const a=this.boundingSphere.center;if(di.setFromBufferAttribute(t),n)for(let c=0,u=n.length;c<u;c++){const h=n[c];Ko.setFromBufferAttribute(h),this.morphTargetsRelative?(An.addVectors(di.min,Ko.min),di.expandByPoint(An),An.addVectors(di.max,Ko.max),di.expandByPoint(An)):(di.expandByPoint(Ko.min),di.expandByPoint(Ko.max))}di.getCenter(a);let o=0;for(let c=0,u=t.count;c<u;c++)An.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(An));if(n)for(let c=0,u=n.length;c<u;c++){const h=n[c],m=this.morphTargetsRelative;for(let p=0,v=h.count;p<v;p++)An.fromBufferAttribute(h,p),m&&(Ur.fromBufferAttribute(t,p),An.add(Ur)),o=Math.max(o,a.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new ji(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const h=[],m=[];for(let E=0;E<a.count;E++)h[E]=new W,m[E]=new W;const p=new W,v=new W,_=new W,g=new Ot,x=new Ot,T=new Ot,D=new W,M=new W;function S(E,N,F){p.fromBufferAttribute(a,E),v.fromBufferAttribute(a,N),_.fromBufferAttribute(a,F),g.fromBufferAttribute(c,E),x.fromBufferAttribute(c,N),T.fromBufferAttribute(c,F),v.sub(p),_.sub(p),x.sub(g),T.sub(g);const H=1/(x.x*T.y-T.x*x.y);isFinite(H)&&(D.copy(v).multiplyScalar(T.y).addScaledVector(_,-x.y).multiplyScalar(H),M.copy(_).multiplyScalar(x.x).addScaledVector(v,-T.x).multiplyScalar(H),h[E].add(D),h[N].add(D),h[F].add(D),m[E].add(M),m[N].add(M),m[F].add(M))}let O=this.groups;O.length===0&&(O=[{start:0,count:t.count}]);for(let E=0,N=O.length;E<N;++E){const F=O[E],H=F.start,q=F.count;for(let K=H,G=H+q;K<G;K+=3)S(t.getX(K+0),t.getX(K+1),t.getX(K+2))}const I=new W,A=new W,P=new W,R=new W;function L(E){P.fromBufferAttribute(o,E),R.copy(P);const N=h[E];I.copy(N),I.sub(P.multiplyScalar(P.dot(N))).normalize(),A.crossVectors(R,N);const H=A.dot(m[E])<0?-1:1;u.setXYZW(E,I.x,I.y,I.z,H)}for(let E=0,N=O.length;E<N;++E){const F=O[E],H=F.start,q=F.count;for(let K=H,G=H+q;K<G;K+=3)L(t.getX(K+0)),L(t.getX(K+1)),L(t.getX(K+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new ji(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let g=0,x=a.count;g<x;g++)a.setXYZ(g,0,0,0);const o=new W,c=new W,u=new W,h=new W,m=new W,p=new W,v=new W,_=new W;if(t)for(let g=0,x=t.count;g<x;g+=3){const T=t.getX(g+0),D=t.getX(g+1),M=t.getX(g+2);o.fromBufferAttribute(n,T),c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,M),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),h.fromBufferAttribute(a,T),m.fromBufferAttribute(a,D),p.fromBufferAttribute(a,M),h.add(v),m.add(v),p.add(v),a.setXYZ(T,h.x,h.y,h.z),a.setXYZ(D,m.x,m.y,m.z),a.setXYZ(M,p.x,p.y,p.z)}else for(let g=0,x=n.count;g<x;g+=3)o.fromBufferAttribute(n,g+0),c.fromBufferAttribute(n,g+1),u.fromBufferAttribute(n,g+2),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),a.setXYZ(g+0,v.x,v.y,v.z),a.setXYZ(g+1,v.x,v.y,v.z),a.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)An.fromBufferAttribute(t,n),An.normalize(),t.setXYZ(n,An.x,An.y,An.z)}toNonIndexed(){function t(h,m){const p=h.array,v=h.itemSize,_=h.normalized,g=new p.constructor(m.length*v);let x=0,T=0;for(let D=0,M=m.length;D<M;D++){h.isInterleavedBufferAttribute?x=m[D]*h.data.stride+h.offset:x=m[D]*v;for(let S=0;S<v;S++)g[T++]=p[x++]}return new ji(g,v,_)}if(this.index===null)return de("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Nn,a=this.index.array,o=this.attributes;for(const h in o){const m=o[h],p=t(m,a);n.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let v=0,_=p.length;v<_;v++){const g=p[v],x=t(g,a);m.push(x)}n.morphAttributes[h]=m}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let h=0,m=u.length;h<m;h++){const p=u[h];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const p=a[m];t.data.attributes[m]=p.toJSON(t.data)}const o={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let _=0,g=p.length;_<g;_++){const x=p[_];v.push(x.toJSON(t.data))}v.length>0&&(o[m]=v,c=!0)}c&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(t.data.groups=JSON.parse(JSON.stringify(u)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere=h.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const o=t.attributes;for(const p in o){const v=o[p];this.setAttribute(p,v.clone(n))}const c=t.morphAttributes;for(const p in c){const v=[],_=c[p];for(let g=0,x=_.length;g<x;g++)v.push(_[g].clone(n));this.morphAttributes[p]=v}this.morphTargetsRelative=t.morphTargetsRelative;const u=t.groups;for(let p=0,v=u.length;p<v;p++){const _=u[p];this.addGroup(_.start,_.count,_.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nd=new W,c1=new W,u1=new ge;class ba{constructor(t=new W(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=nd.subVectors(a,n).cross(c1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const o=t.delta(nd),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(t.start).addScaledVector(o,u)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||u1.getNormalMatrix(t),o=this.coplanarPoint(nd).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let f1=0;class Kr extends Hs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:f1++}),this.uuid=Gs(),this.name="",this.type="Material",this.blending=al,this.side=Ps,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=B_,this.blendDst=F_,this.blendEquation=zr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ve(0,0,0),this.blendAlpha=0,this.depthFunc=ul,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bh,this.stencilZFail=Bh,this.stencilZPass=Bh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){de(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){de(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const h in c){const m=c[h];delete m.metadata,u.push(m)}return u}if(n){const c=o(t.textures),u=o(t.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ve().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new ba().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Ot().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ea=new W,id=new W,Fc=new W,Hc=new W;class sx{constructor(t=new W,n=new W(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ea)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Ea.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ea.copy(this.origin).addScaledVector(this.direction,n),Ea.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){id.copy(t).add(n).multiplyScalar(.5),Fc.copy(n).sub(t).normalize(),Hc.copy(this.origin).sub(id);const c=t.distanceTo(n)*.5,u=-this.direction.dot(Fc),h=Hc.dot(this.direction),m=-Hc.dot(Fc),p=Hc.lengthSq(),v=Math.abs(1-u*u);let _,g,x,T;if(v>0)if(_=u*m-h,g=u*h-m,T=c*v,_>=0)if(g>=-T)if(g<=T){const D=1/v;_*=D,g*=D,x=_*(_+u*g+2*h)+g*(u*_+g+2*m)+p}else g=c,_=Math.max(0,-(u*g+h)),x=-_*_+g*(g+2*m)+p;else g=-c,_=Math.max(0,-(u*g+h)),x=-_*_+g*(g+2*m)+p;else g<=-T?(_=Math.max(0,-(-u*c+h)),g=_>0?-c:Math.min(Math.max(-c,-m),c),x=-_*_+g*(g+2*m)+p):g<=T?(_=0,g=Math.min(Math.max(-c,-m),c),x=g*(g+2*m)+p):(_=Math.max(0,-(u*c+h)),g=_>0?c:Math.min(Math.max(-c,-m),c),x=-_*_+g*(g+2*m)+p);else g=u>0?-c:c,_=Math.max(0,-(u*g+h)),x=-_*_+g*(g+2*m)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(id).addScaledVector(Fc,g),x}intersectSphere(t,n){if(t.radius<0)return null;Ea.subVectors(t.center,this.origin);const a=Ea.dot(this.direction),o=Ea.dot(Ea)-a*a,c=t.radius*t.radius;if(o>c)return null;const u=Math.sqrt(c-o),h=a-u,m=a+u;return m<0?null:h<0?this.at(m,n):this.at(h,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,c,u,h,m;const p=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return p>=0?(a=(t.min.x-g.x)*p,o=(t.max.x-g.x)*p):(a=(t.max.x-g.x)*p,o=(t.min.x-g.x)*p),v>=0?(c=(t.min.y-g.y)*v,u=(t.max.y-g.y)*v):(c=(t.max.y-g.y)*v,u=(t.min.y-g.y)*v),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),_>=0?(h=(t.min.z-g.z)*_,m=(t.max.z-g.z)*_):(h=(t.max.z-g.z)*_,m=(t.min.z-g.z)*_),a>m||h>o)||((h>a||a!==a)&&(a=h),(m<o||o!==o)&&(o=m),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,Ea)!==null}intersectTriangle(t,n,a,o,c){const u=this.origin,h=this.direction,m=h.x,p=h.y,v=h.z,_=t.x-u.x,g=t.y-u.y,x=t.z-u.z,T=n.x-u.x,D=n.y-u.y,M=n.z-u.z,S=a.x-u.x,O=a.y-u.y,I=a.z-u.z,A=Math.abs(m),P=Math.abs(p),R=Math.abs(v);let L,E,N,F,H,q,K,G,J,B,X,nt;if(A>=P&&A>=R?(N=m,q=_,J=T,nt=S,m>=0?(L=p,E=v,F=g,H=x,K=D,G=M,B=O,X=I):(L=v,E=p,F=x,H=g,K=M,G=D,B=I,X=O)):P>=R?(N=p,q=g,J=D,nt=O,p>=0?(L=v,E=m,F=x,H=_,K=M,G=T,B=I,X=S):(L=m,E=v,F=_,H=x,K=T,G=M,B=S,X=I)):(N=v,q=x,J=M,nt=I,v>=0?(L=m,E=p,F=_,H=g,K=T,G=D,B=S,X=O):(L=p,E=m,F=g,H=_,K=D,G=T,B=O,X=S)),N===0)return null;const it=L/N,ot=E/N,U=1/N,j=F-it*q,dt=H-ot*q,Rt=K-it*J,Pt=G-ot*J,qt=B-it*nt,at=X-ot*nt,gt=qt*Pt-at*Rt,Dt=j*at-dt*qt,ie=Rt*dt-Pt*j;if(o){if(gt<0||Dt<0||ie<0)return null}else if((gt<0||Dt<0||ie<0)&&(gt>0||Dt>0||ie>0))return null;const kt=gt+Dt+ie;if(kt===0)return null;const ue=U*(gt*q+Dt*J+ie*nt);return(kt>0?ue<0:ue>0)?null:this.at(ue/kt,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bp extends Kr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Da,this.combine=cp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Wv=new Ge,Ds=new sx,Gc=new _l,qv=new W,Vc=new W,kc=new W,Xc=new W,ad=new W,Wc=new W,Yv=new W,qc=new W;class ln extends Sn{constructor(t=new Nn,n=new bp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const h=this.morphTargetInfluences;if(c&&h){Wc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const v=h[m],_=c[m];v!==0&&(ad.fromBufferAttribute(_,t),u?Wc.addScaledVector(ad,v):Wc.addScaledVector(ad.sub(n),v))}n.add(Wc)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Gc.copy(a.boundingSphere),Gc.applyMatrix4(c),Ds.copy(t.ray).recast(t.near),!(Gc.containsPoint(Ds.origin)===!1&&(Ds.intersectSphere(Gc,qv)===null||Ds.origin.distanceToSquared(qv)>(t.far-t.near)**2))&&(Wv.copy(c).invert(),Ds.copy(t.ray).applyMatrix4(Wv),!(a.boundingBox!==null&&Ds.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ds)))}_computeIntersections(t,n,a){let o;const c=this.geometry,u=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,x=c.drawRange;if(h!==null)if(Array.isArray(u))for(let T=0,D=g.length;T<D;T++){const M=g[T],S=u[M.materialIndex],O=Math.max(M.start,x.start),I=Math.min(h.count,Math.min(M.start+M.count,x.start+x.count));for(let A=O,P=I;A<P;A+=3){const R=h.getX(A),L=h.getX(A+1),E=h.getX(A+2);o=Yc(this,S,t,a,p,v,_,R,L,E),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const T=Math.max(0,x.start),D=Math.min(h.count,x.start+x.count);for(let M=T,S=D;M<S;M+=3){const O=h.getX(M),I=h.getX(M+1),A=h.getX(M+2);o=Yc(this,u,t,a,p,v,_,O,I,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(u))for(let T=0,D=g.length;T<D;T++){const M=g[T],S=u[M.materialIndex],O=Math.max(M.start,x.start),I=Math.min(m.count,Math.min(M.start+M.count,x.start+x.count));for(let A=O,P=I;A<P;A+=3){const R=A,L=A+1,E=A+2;o=Yc(this,S,t,a,p,v,_,R,L,E),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const T=Math.max(0,x.start),D=Math.min(m.count,x.start+x.count);for(let M=T,S=D;M<S;M+=3){const O=M,I=M+1,A=M+2;o=Yc(this,u,t,a,p,v,_,O,I,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}}}function h1(r,t,n,a,o,c,u,h){let m;if(t.side===Wn?m=a.intersectTriangle(u,c,o,!0,h):m=a.intersectTriangle(o,c,u,t.side===Ps,h),m===null)return null;qc.copy(h),qc.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(qc);return p<n.near||p>n.far?null:{distance:p,point:qc.clone(),object:r}}function Yc(r,t,n,a,o,c,u,h,m,p){r.getVertexPosition(h,Vc),r.getVertexPosition(m,kc),r.getVertexPosition(p,Xc);const v=h1(r,t,n,a,Vc,kc,Xc,Yv);if(v){const _=new W;Bi.getBarycoord(Yv,Vc,kc,Xc,_),o&&(v.uv=Bi.getInterpolatedAttribute(o,h,m,p,_,new Ot)),c&&(v.uv1=Bi.getInterpolatedAttribute(c,h,m,p,_,new Ot)),u&&(v.normal=Bi.getInterpolatedAttribute(u,h,m,p,_,new W),v.normal.dot(a.direction)>0&&v.normal.multiplyScalar(-1));const g={a:h,b:m,c:p,normal:new W,materialIndex:0};Bi.getNormal(Vc,kc,Xc,g.normal),v.face=g,v.barycoord=_}return v}class rx extends Bn{constructor(t=null,n=1,a=1,o,c,u,h,m,p=Ln,v=Ln,_,g){super(null,u,h,m,p,v,o,c,_,g),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zv extends ji{constructor(t,n,a,o=1){super(t,n,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Lr=new Ge,Kv=new Ge,Zc=[],Jv=new Vs,d1=new Ge,Jo=new ln,Qo=new _l;class p1 extends ln{constructor(t,n,a){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new Zv(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<a;o++)this.setMatrixAt(o,d1)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Vs),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Lr),Jv.copy(t.boundingBox).applyMatrix4(Lr),this.boundingBox.union(Jv)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new _l),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Lr),Qo.copy(t.boundingSphere).applyMatrix4(Lr),this.boundingSphere.union(Qo)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){return n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const a=n.morphTargetInfluences,o=this.morphTexture.source.data.data,c=a.length+1,u=t*c+1;for(let h=0;h<a.length;h++)a[h]=o[u+h]}raycast(t,n){const a=this.matrixWorld,o=this.count;if(Jo.geometry=this.geometry,Jo.material=this.material,Jo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qo.copy(this.boundingSphere),Qo.applyMatrix4(a),t.ray.intersectsSphere(Qo)!==!1))for(let c=0;c<o;c++){this.getMatrixAt(c,Lr),Kv.multiplyMatrices(a,Lr),Jo.matrixWorld=Kv,Jo.raycast(t,Zc);for(let u=0,h=Zc.length;u<h;u++){const m=Zc[u];m.instanceId=c,m.object=this,n.push(m)}Zc.length=0}}setColorAt(t,n){return this.instanceColor===null&&(this.instanceColor=new Zv(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,n){return n.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,n){const a=n.morphTargetInfluences,o=a.length+1;this.morphTexture===null&&(this.morphTexture=new rx(new Float32Array(o*this.count),o,this.count,pp,Fi));const c=this.morphTexture.source.data.data;let u=0;for(let p=0;p<a.length;p++)u+=a[p];const h=this.geometry.morphTargetsRelative?1:1-u,m=o*t;return c[m]=h,c.set(a,m+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Us=new _l,m1=new Ot(.5,.5),Kc=new W;class Tp{constructor(t=new ba,n=new ba,a=new ba,o=new ba,c=new ba,u=new ba){this.planes=[t,n,a,o,c,u]}set(t,n,a,o,c,u){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(a),h[3].copy(o),h[4].copy(c),h[5].copy(u),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=Ji,a=!1){const o=this.planes,c=t.elements,u=c[0],h=c[1],m=c[2],p=c[3],v=c[4],_=c[5],g=c[6],x=c[7],T=c[8],D=c[9],M=c[10],S=c[11],O=c[12],I=c[13],A=c[14],P=c[15];if(o[0].setComponents(p-u,x-v,S-T,P-O).normalize(),o[1].setComponents(p+u,x+v,S+T,P+O).normalize(),o[2].setComponents(p+h,x+_,S+D,P+I).normalize(),o[3].setComponents(p-h,x-_,S-D,P-I).normalize(),a)o[4].setComponents(m,g,M,A).normalize(),o[5].setComponents(p-m,x-g,S-M,P-A).normalize();else if(o[4].setComponents(p-m,x-g,S-M,P-A).normalize(),n===Ji)o[5].setComponents(p+m,x+g,S+M,P+A).normalize();else if(n===dl)o[5].setComponents(m,g,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Us.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Us)}intersectsSprite(t){Us.center.set(0,0,0);const n=m1.distanceTo(t.center);return Us.radius=.7071067811865476+n,Us.applyMatrix4(t.matrixWorld),this.intersectsSphere(Us)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(Kc.x=o.normal.x>0?t.max.x:t.min.x,Kc.y=o.normal.y>0?t.max.y:t.min.y,Kc.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(Kc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ox extends Bn{constructor(t=[],n=Is,a,o,c,u,h,m,p,v){super(t,n,a,o,c,u,h,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class g1 extends Bn{constructor(t,n,a,o,c,u,h,m,p){super(t,n,a,o,c,u,h,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class pl extends Bn{constructor(t,n,a=$i,o,c,u,h=Ln,m=Ln,p,v=Ca,_=1){if(v!==Ca&&v!==Os)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:n,depth:_};super(g,o,c,u,h,m,v,a,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new yp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}}class v1 extends pl{constructor(t,n=$i,a=Is,o,c,u=Ln,h=Ln,m,p=Ca){const v={width:t,height:t,depth:1},_=[v,v,v,v,v,v];super(t,t,n,a,o,c,u,h,m,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class lx extends Bn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ks extends Nn{constructor(t=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const h=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const m=[],p=[],v=[],_=[];let g=0,x=0;T("z","y","x",-1,-1,a,n,t,u,c,0),T("z","y","x",1,-1,a,n,-t,u,c,1),T("x","z","y",1,1,t,a,n,o,u,2),T("x","z","y",1,-1,t,a,-n,o,u,3),T("x","y","z",1,-1,t,n,a,o,c,4),T("x","y","z",-1,-1,t,n,-a,o,c,5),this.setIndex(m),this.setAttribute("position",new He(p,3)),this.setAttribute("normal",new He(v,3)),this.setAttribute("uv",new He(_,2));function T(D,M,S,O,I,A,P,R,L,E,N){const F=A/L,H=P/E,q=A/2,K=P/2,G=R/2,J=L+1,B=E+1;let X=0,nt=0;const it=new W;for(let ot=0;ot<B;ot++){const U=ot*H-K;for(let j=0;j<J;j++){const dt=j*F-q;it[D]=dt*O,it[M]=U*I,it[S]=G,p.push(it.x,it.y,it.z),it[D]=0,it[M]=0,it[S]=R>0?1:-1,v.push(it.x,it.y,it.z),_.push(j/L),_.push(1-ot/E),X+=1}}for(let ot=0;ot<E;ot++)for(let U=0;U<L;U++){const j=g+U+J*ot,dt=g+U+J*(ot+1),Rt=g+(U+1)+J*(ot+1),Pt=g+(U+1)+J*ot;m.push(j,dt,Pt),m.push(dt,Rt,Pt),nt+=6}h.addGroup(x,nt,N),x+=nt,g+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ks(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Ap extends Nn{constructor(t=1,n=32,a=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:a,thetaLength:o},n=Math.max(3,n);const c=[],u=[],h=[],m=[],p=new W,v=new Ot;u.push(0,0,0),h.push(0,0,1),m.push(.5,.5);for(let _=0,g=3;_<=n;_++,g+=3){const x=a+_/n*o;p.x=t*Math.cos(x),p.y=t*Math.sin(x),u.push(p.x,p.y,p.z),h.push(0,0,1),v.x=(u[g]/t+1)/2,v.y=(u[g+1]/t+1)/2,m.push(v.x,v.y)}for(let _=1;_<=n;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new He(u,3)),this.setAttribute("normal",new He(h,3)),this.setAttribute("uv",new He(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ap(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ol extends Nn{constructor(t=1,n=1,a=1,o=32,c=1,u=!1,h=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:o,heightSegments:c,openEnded:u,thetaStart:h,thetaLength:m};const p=this;o=Math.floor(o),c=Math.floor(c);const v=[],_=[],g=[],x=[];let T=0;const D=[],M=a/2;let S=0;O(),u===!1&&(t>0&&I(!0),n>0&&I(!1)),this.setIndex(v),this.setAttribute("position",new He(_,3)),this.setAttribute("normal",new He(g,3)),this.setAttribute("uv",new He(x,2));function O(){const A=new W,P=new W;let R=0;const L=(n-t)/a;for(let E=0;E<=c;E++){const N=[],F=E/c,H=F*(n-t)+t;for(let q=0;q<=o;q++){const K=q/o,G=K*m+h,J=Math.sin(G),B=Math.cos(G);P.x=H*J,P.y=-F*a+M,P.z=H*B,_.push(P.x,P.y,P.z),A.set(J,L,B).normalize(),g.push(A.x,A.y,A.z),x.push(K,1-F),N.push(T++)}D.push(N)}for(let E=0;E<o;E++)for(let N=0;N<c;N++){const F=D[N][E],H=D[N+1][E],q=D[N+1][E+1],K=D[N][E+1];(t>0||N!==0)&&(v.push(F,H,K),R+=3),(n>0||N!==c-1)&&(v.push(H,q,K),R+=3)}p.addGroup(S,R,0),S+=R}function I(A){const P=T,R=new Ot,L=new W;let E=0;const N=A===!0?t:n,F=A===!0?1:-1;for(let q=1;q<=o;q++)_.push(0,M*F,0),g.push(0,F,0),x.push(.5,.5),T++;const H=T;for(let q=0;q<=o;q++){const G=q/o*m+h,J=Math.cos(G),B=Math.sin(G);L.x=N*B,L.y=M*F,L.z=N*J,_.push(L.x,L.y,L.z),g.push(0,F,0),R.x=J*.5+.5,R.y=B*.5*F+.5,x.push(R.x,R.y),T++}for(let q=0;q<o;q++){const K=P+q,G=H+q;A===!0?v.push(G,G+1,K):v.push(G+1,G,K),E+=3}p.addGroup(S,E,A===!0?1:2),S+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ol(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ta{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){de("Curve: .getPoint() not implemented.")}getPointAt(t,n){const a=this.getUtoTmapping(t);return this.getPoint(a,n)}getPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return n}getSpacedPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPointAt(a/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),c=0;n.push(0);for(let u=1;u<=t;u++)a=this.getPoint(u/t),c+=a.distanceTo(o),n.push(c),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const a=this.getLengths();let o=0;const c=a.length;let u;n?u=n:u=t*a[c-1];let h=0,m=c-1,p;for(;h<=m;)if(o=Math.floor(h+(m-h)/2),p=a[o]-u,p<0)h=o+1;else if(p>0)m=o-1;else{m=o;break}if(o=m,a[o]===u)return o/(c-1);const v=a[o],g=a[o+1]-v,x=(u-v)/g;return(o+x)/(c-1)}getTangent(t,n){let o=t-1e-4,c=t+1e-4;o<0&&(o=0),c>1&&(c=1);const u=this.getPoint(o),h=this.getPoint(c),m=n||(u.isVector2?new Ot:new W);return m.copy(h).sub(u).normalize(),m}getTangentAt(t,n){const a=this.getUtoTmapping(t);return this.getTangent(a,n)}computeFrenetFrames(t,n=!1){const a=new W,o=[],c=[],u=[],h=new W,m=new Ge;for(let x=0;x<=t;x++){const T=x/t;o[x]=this.getTangentAt(T,new W)}c[0]=new W,u[0]=new W;let p=Number.MAX_VALUE;const v=Math.abs(o[0].x),_=Math.abs(o[0].y),g=Math.abs(o[0].z);v<=p&&(p=v,a.set(1,0,0)),_<=p&&(p=_,a.set(0,1,0)),g<=p&&a.set(0,0,1),h.crossVectors(o[0],a).normalize(),c[0].crossVectors(o[0],h),u[0].crossVectors(o[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),u[x]=u[x-1].clone(),h.crossVectors(o[x-1],o[x]),h.length()>Number.EPSILON){h.normalize();const T=Math.acos(be(o[x-1].dot(o[x]),-1,1));c[x].applyMatrix4(m.makeRotationAxis(h,T))}u[x].crossVectors(o[x],c[x])}if(n===!0){let x=Math.acos(be(c[0].dot(c[t]),-1,1));x/=t,o[0].dot(h.crossVectors(c[0],c[t]))>0&&(x=-x);for(let T=1;T<=t;T++)c[T].applyMatrix4(m.makeRotationAxis(o[T],x*T)),u[T].crossVectors(o[T],c[T])}return{tangents:o,normals:c,binormals:u}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class wp extends ta{constructor(t=0,n=0,a=1,o=1,c=0,u=Math.PI*2,h=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=c,this.aEndAngle=u,this.aClockwise=h,this.aRotation=m}getPoint(t,n=new Ot){const a=n,o=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const u=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=o;for(;c>o;)c-=o;c<Number.EPSILON&&(u?c=0:c=o),this.aClockwise===!0&&!u&&(c===o?c=-o:c=c-o);const h=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(h),p=this.aY+this.yRadius*Math.sin(h);if(this.aRotation!==0){const v=Math.cos(this.aRotation),_=Math.sin(this.aRotation),g=m-this.aX,x=p-this.aY;m=g*v-x*_+this.aX,p=g*_+x*v+this.aY}return a.set(m,p)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class _1 extends wp{constructor(t,n,a,o,c,u){super(t,n,a,a,o,c,u),this.isArcCurve=!0,this.type="ArcCurve"}}function Rp(){let r=0,t=0,n=0,a=0;function o(c,u,h,m){r=c,t=h,n=-3*c+3*u-2*h-m,a=2*c-2*u+h+m}return{initCatmullRom:function(c,u,h,m,p){o(u,h,p*(h-c),p*(m-u))},initNonuniformCatmullRom:function(c,u,h,m,p,v,_){let g=(u-c)/p-(h-c)/(p+v)+(h-u)/v,x=(h-u)/v-(m-u)/(v+_)+(m-h)/_;g*=v,x*=v,o(u,h,g,x)},calc:function(c){const u=c*c,h=u*c;return r+t*c+n*u+a*h}}}const Qv=new W,jv=new W,sd=new Rp,rd=new Rp,od=new Rp;class tp extends ta{constructor(t=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=a,this.tension=o}getPoint(t,n=new W){const a=n,o=this.points,c=o.length,u=(c-(this.closed?0:1))*t;let h=Math.floor(u),m=u-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/c)+1)*c:m===0&&h===c-1&&(h=c-2,m=1);let p,v;this.closed||h>0?p=o[(h-1)%c]:(jv.subVectors(o[0],o[1]).add(o[0]),p=jv);const _=o[h%c],g=o[(h+1)%c];if(this.closed||h+2<c?v=o[(h+2)%c]:(Qv.subVectors(o[c-1],o[c-2]).add(o[c-1]),v=Qv),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let T=Math.pow(p.distanceToSquared(_),x),D=Math.pow(_.distanceToSquared(g),x),M=Math.pow(g.distanceToSquared(v),x);D<1e-4&&(D=1),T<1e-4&&(T=D),M<1e-4&&(M=D),sd.initNonuniformCatmullRom(p.x,_.x,g.x,v.x,T,D,M),rd.initNonuniformCatmullRom(p.y,_.y,g.y,v.y,T,D,M),od.initNonuniformCatmullRom(p.z,_.z,g.z,v.z,T,D,M)}else this.curveType==="catmullrom"&&(sd.initCatmullRom(p.x,_.x,g.x,v.x,this.tension),rd.initCatmullRom(p.y,_.y,g.y,v.y,this.tension),od.initCatmullRom(p.z,_.z,g.z,v.z,this.tension));return a.set(sd.calc(m),rd.calc(m),od.calc(m)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new W().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function $v(r,t,n,a,o){const c=(a-t)*.5,u=(o-n)*.5,h=r*r,m=r*h;return(2*n-2*a+c+u)*m+(-3*n+3*a-2*c-u)*h+c*r+n}function x1(r,t){const n=1-r;return n*n*t}function S1(r,t){return 2*(1-r)*r*t}function y1(r,t){return r*r*t}function ll(r,t,n,a){return x1(r,t)+S1(r,n)+y1(r,a)}function M1(r,t){const n=1-r;return n*n*n*t}function E1(r,t){const n=1-r;return 3*n*n*r*t}function b1(r,t){return 3*(1-r)*r*r*t}function T1(r,t){return r*r*r*t}function cl(r,t,n,a,o){return M1(r,t)+E1(r,n)+b1(r,a)+T1(r,o)}class cx extends ta{constructor(t=new Ot,n=new Ot,a=new Ot,o=new Ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new Ot){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(cl(t,o.x,c.x,u.x,h.x),cl(t,o.y,c.y,u.y,h.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class A1 extends ta{constructor(t=new W,n=new W,a=new W,o=new W){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new W){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(cl(t,o.x,c.x,u.x,h.x),cl(t,o.y,c.y,u.y,h.y),cl(t,o.z,c.z,u.z,h.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ux extends ta{constructor(t=new Ot,n=new Ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Ot){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Ot){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class w1 extends ta{constructor(t=new W,n=new W){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new W){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new W){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class fx extends ta{constructor(t=new Ot,n=new Ot,a=new Ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new Ot){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(ll(t,o.x,c.x,u.x),ll(t,o.y,c.y,u.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hx extends ta{constructor(t=new W,n=new W,a=new W){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new W){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(ll(t,o.x,c.x,u.x),ll(t,o.y,c.y,u.y),ll(t,o.z,c.z,u.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dx extends ta{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Ot){const a=n,o=this.points,c=(o.length-1)*t,u=Math.floor(c),h=c-u,m=o[u===0?u:u-1],p=o[u],v=o[u>o.length-2?o.length-1:u+1],_=o[u>o.length-3?o.length-1:u+2];return a.set($v(h,m.x,p.x,v.x,_.x),$v(h,m.y,p.y,v.y,_.y)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new Ot().fromArray(o))}return this}}var vu=Object.freeze({__proto__:null,ArcCurve:_1,CatmullRomCurve3:tp,CubicBezierCurve:cx,CubicBezierCurve3:A1,EllipseCurve:wp,LineCurve:ux,LineCurve3:w1,QuadraticBezierCurve:fx,QuadraticBezierCurve3:hx,SplineCurve:dx});class R1 extends ta{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const a=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new vu[a](n,t))}return this}getPoint(t,n){const a=t*this.getLength(),o=this.getCurveLengths();let c=0;for(;c<o.length;){if(o[c]>=a){const u=o[c]-a,h=this.curves[c],m=h.getLength(),p=m===0?0:1-u/m;return h.getPointAt(p,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let a;for(let o=0,c=this.curves;o<c.length;o++){const u=c[o],h=u.isEllipseCurve?t*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?t*u.points.length:t,m=u.getPoints(h);for(let p=0;p<m.length;p++){const v=m[p];a&&a.equals(v)||(n.push(v),a=v)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(new vu[o.type]().fromJSON(o))}return this}}class t_ extends R1{constructor(t){super(),this.type="Path",this.currentPoint=new Ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,a=t.length;n<a;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const a=new ux(this.currentPoint.clone(),new Ot(t,n));return this.curves.push(a),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,a,o){const c=new fx(this.currentPoint.clone(),new Ot(t,n),new Ot(a,o));return this.curves.push(c),this.currentPoint.set(a,o),this}bezierCurveTo(t,n,a,o,c,u){const h=new cx(this.currentPoint.clone(),new Ot(t,n),new Ot(a,o),new Ot(c,u));return this.curves.push(h),this.currentPoint.set(c,u),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),a=new dx(n);return this.curves.push(a),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,a,o,c,u){const h=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(t+h,n+m,a,o,c,u),this}absarc(t,n,a,o,c,u){return this.absellipse(t,n,a,a,o,c,u),this}ellipse(t,n,a,o,c,u,h,m){const p=this.currentPoint.x,v=this.currentPoint.y;return this.absellipse(t+p,n+v,a,o,c,u,h,m),this}absellipse(t,n,a,o,c,u,h,m){const p=new wp(t,n,a,o,c,u,h,m);if(this.curves.length>0){const _=p.getPoint(0);_.equals(this.currentPoint)||this.lineTo(_.x,_.y)}this.curves.push(p);const v=p.getPoint(1);return this.currentPoint.copy(v),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class px extends t_{constructor(t){super(t),this.uuid=Gs(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(new t_().fromJSON(o))}return this}}function C1(r,t,n=2){const a=t&&t.length,o=a?t[0]*n:r.length;let c=mx(r,0,o,n,!0);const u=[];if(!c||c.next===c.prev)return u;let h,m,p;if(a&&(c=O1(r,t,c,n)),r.length>80*n){h=r[0],m=r[1];let v=h,_=m;for(let g=n;g<o;g+=n){const x=r[g],T=r[g+1];x<h&&(h=x),T<m&&(m=T),x>v&&(v=x),T>_&&(_=T)}p=Math.max(v-h,_-m),p=p!==0?32767/p:0}return ml(c,u,n,h,m,p,0),u}function mx(r,t,n,a,o){let c;if(o===W1(r,t,n,a)>0)for(let u=t;u<n;u+=a)c=e_(u/a|0,r[u],r[u+1],c);else for(let u=n-a;u>=t;u-=a)c=e_(u/a|0,r[u],r[u+1],c);return c&&qr(c,c.next)&&(vl(c),c=c.next),c}function Bs(r,t){if(!r)return r;t||(t=r);let n=r,a;do if(a=!1,!n.steiner&&(qr(n,n.next)||sn(n.prev,n,n.next)===0)){if(vl(n),n=t=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==t);return t}function ml(r,t,n,a,o,c,u){if(!r)return;!u&&c&&F1(r,a,o,c);let h=r;for(;r.prev!==r.next;){const m=r.prev,p=r.next;if(c?U1(r,a,o,c):D1(r)){t.push(m.i,r.i,p.i),vl(r),r=p.next,h=p.next;continue}if(r=p,r===h){u?u===1?(r=L1(Bs(r),t),ml(r,t,n,a,o,c,2)):u===2&&N1(r,t,n,a,o,c):ml(Bs(r),t,n,a,o,c,1);break}}}function D1(r){const t=r.prev,n=r,a=r.next;if(sn(t,n,a)>=0)return!1;const o=t.x,c=n.x,u=a.x,h=t.y,m=n.y,p=a.y,v=Math.min(o,c,u),_=Math.min(h,m,p),g=Math.max(o,c,u),x=Math.max(h,m,p);let T=a.next;for(;T!==t;){if(T.x>=v&&T.x<=g&&T.y>=_&&T.y<=x&&el(o,h,c,m,u,p,T.x,T.y)&&sn(T.prev,T,T.next)>=0)return!1;T=T.next}return!0}function U1(r,t,n,a){const o=r.prev,c=r,u=r.next;if(sn(o,c,u)>=0)return!1;const h=o.x,m=c.x,p=u.x,v=o.y,_=c.y,g=u.y,x=Math.min(h,m,p),T=Math.min(v,_,g),D=Math.max(h,m,p),M=Math.max(v,_,g),S=ep(x,T,t,n,a),O=ep(D,M,t,n,a);let I=r.prevZ,A=r.nextZ;for(;I&&I.z>=S&&A&&A.z<=O;){if(I.x>=x&&I.x<=D&&I.y>=T&&I.y<=M&&I!==o&&I!==u&&el(h,v,m,_,p,g,I.x,I.y)&&sn(I.prev,I,I.next)>=0||(I=I.prevZ,A.x>=x&&A.x<=D&&A.y>=T&&A.y<=M&&A!==o&&A!==u&&el(h,v,m,_,p,g,A.x,A.y)&&sn(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;I&&I.z>=S;){if(I.x>=x&&I.x<=D&&I.y>=T&&I.y<=M&&I!==o&&I!==u&&el(h,v,m,_,p,g,I.x,I.y)&&sn(I.prev,I,I.next)>=0)return!1;I=I.prevZ}for(;A&&A.z<=O;){if(A.x>=x&&A.x<=D&&A.y>=T&&A.y<=M&&A!==o&&A!==u&&el(h,v,m,_,p,g,A.x,A.y)&&sn(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function L1(r,t){let n=r;do{const a=n.prev,o=n.next.next;!qr(a,o)&&vx(a,n,n.next,o)&&gl(a,o)&&gl(o,a)&&(t.push(a.i,n.i,o.i),vl(n),vl(n.next),n=r=o),n=n.next}while(n!==r);return Bs(n)}function N1(r,t,n,a,o,c){let u=r;do{let h=u.next.next;for(;h!==u.prev;){if(u.i!==h.i&&V1(u,h)){let m=_x(u,h);u=Bs(u,u.next),m=Bs(m,m.next),ml(u,t,n,a,o,c,0),ml(m,t,n,a,o,c,0);return}h=h.next}u=u.next}while(u!==r)}function O1(r,t,n,a){const o=[];for(let c=0,u=t.length;c<u;c++){const h=t[c]*a,m=c<u-1?t[c+1]*a:r.length,p=mx(r,h,m,a,!1);p===p.next&&(p.steiner=!0),o.push(G1(p))}o.sort(P1);for(let c=0;c<o.length;c++)n=I1(o[c],n);return n}function P1(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const a=(r.next.y-r.y)/(r.next.x-r.x),o=(t.next.y-t.y)/(t.next.x-t.x);n=a-o}return n}function I1(r,t){const n=z1(r,t);if(!n)return t;const a=_x(n,r);return Bs(a,a.next),Bs(n,n.next)}function z1(r,t){let n=t;const a=r.x,o=r.y;let c=-1/0,u;if(qr(r,n))return n;do{if(qr(r,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const _=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(_<=a&&_>c&&(c=_,u=n.x<n.next.x?n:n.next,_===a))return u}n=n.next}while(n!==t);if(!u)return null;const h=u,m=u.x,p=u.y;let v=1/0;n=u;do{if(a>=n.x&&n.x>=m&&a!==n.x&&gx(o<p?a:c,o,m,p,o<p?c:a,o,n.x,n.y)){const _=Math.abs(o-n.y)/(a-n.x);gl(n,r)&&(_<v||_===v&&(n.x>u.x||n.x===u.x&&B1(u,n)))&&(u=n,v=_)}n=n.next}while(n!==h);return u}function B1(r,t){return sn(r.prev,r,t.prev)<0&&sn(t.next,r,r.next)<0}function F1(r,t,n,a){let o=r;do o.z===0&&(o.z=ep(o.x,o.y,t,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==r);o.prevZ.nextZ=null,o.prevZ=null,H1(o)}function H1(r){let t,n=1;do{let a=r,o;r=null;let c=null;for(t=0;a;){t++;let u=a,h=0;for(let p=0;p<n&&(h++,u=u.nextZ,!!u);p++);let m=n;for(;h>0||m>0&&u;)h!==0&&(m===0||!u||a.z<=u.z)?(o=a,a=a.nextZ,h--):(o=u,u=u.nextZ,m--),c?c.nextZ=o:r=o,o.prevZ=c,c=o;a=u}c.nextZ=null,n*=2}while(t>1);return r}function ep(r,t,n,a,o){return r=(r-n)*o|0,t=(t-a)*o|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function G1(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function gx(r,t,n,a,o,c,u,h){return(o-u)*(t-h)>=(r-u)*(c-h)&&(r-u)*(a-h)>=(n-u)*(t-h)&&(n-u)*(c-h)>=(o-u)*(a-h)}function el(r,t,n,a,o,c,u,h){return!(r===u&&t===h)&&gx(r,t,n,a,o,c,u,h)}function V1(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!k1(r,t)&&(gl(r,t)&&gl(t,r)&&X1(r,t)&&(sn(r.prev,r,t.prev)||sn(r,t.prev,t))||qr(r,t)&&sn(r.prev,r,r.next)>0&&sn(t.prev,t,t.next)>0)}function sn(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function qr(r,t){return r.x===t.x&&r.y===t.y}function vx(r,t,n,a){const o=Qc(sn(r,t,n)),c=Qc(sn(r,t,a)),u=Qc(sn(n,a,r)),h=Qc(sn(n,a,t));return!!(o!==c&&u!==h||o===0&&Jc(r,n,t)||c===0&&Jc(r,a,t)||u===0&&Jc(n,r,a)||h===0&&Jc(n,t,a))}function Jc(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function Qc(r){return r>0?1:r<0?-1:0}function k1(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&vx(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function gl(r,t){return sn(r.prev,r,r.next)<0?sn(r,t,r.next)>=0&&sn(r,r.prev,t)>=0:sn(r,t,r.prev)<0||sn(r,r.next,t)<0}function X1(r,t){let n=r,a=!1;const o=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&o<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==r);return a}function _x(r,t){const n=np(r.i,r.x,r.y),a=np(t.i,t.x,t.y),o=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=o,o.prev=n,a.next=n,n.prev=a,c.next=a,a.prev=c,a}function e_(r,t,n,a){const o=np(r,t,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function vl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function np(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function W1(r,t,n,a){let o=0;for(let c=t,u=n-a;c<n;c+=a)o+=(r[u]-r[c])*(r[c+1]+r[u+1]),u=c;return o}class q1{static triangulate(t,n,a=2){return C1(t,n,a)}}class Fr{static area(t){const n=t.length;let a=0;for(let o=n-1,c=0;c<n;o=c++)a+=t[o].x*t[c].y-t[c].x*t[o].y;return a*.5}static isClockWise(t){return Fr.area(t)<0}static triangulateShape(t,n){const a=[],o=[],c=[];n_(t),i_(a,t);let u=t.length;n.forEach(n_);for(let m=0;m<n.length;m++)o.push(u),u+=n[m].length,i_(a,n[m]);const h=q1.triangulate(a,o);for(let m=0;m<h.length;m+=3)c.push(h.slice(m,m+3));return c}}function n_(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function i_(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class Cp extends Nn{constructor(t=new px([new Ot(.5,.5),new Ot(-.5,.5),new Ot(-.5,-.5),new Ot(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];const a=this,o=[],c=[];for(let h=0,m=t.length;h<m;h++){const p=t[h];u(p)}this.setAttribute("position",new He(o,3)),this.setAttribute("uv",new He(c,2)),this.computeVertexNormals();function u(h){const m=[],p=n.curveSegments!==void 0?n.curveSegments:12,v=n.steps!==void 0?n.steps:1,_=n.depth!==void 0?n.depth:1;let g=n.bevelEnabled!==void 0?n.bevelEnabled:!0,x=n.bevelThickness!==void 0?n.bevelThickness:.2,T=n.bevelSize!==void 0?n.bevelSize:x-.1,D=n.bevelOffset!==void 0?n.bevelOffset:0,M=n.bevelSegments!==void 0?n.bevelSegments:3;const S=n.extrudePath,O=n.UVGenerator!==void 0?n.UVGenerator:Y1;let I,A=!1,P,R,L,E;if(S){I=S.getSpacedPoints(v),A=!0,g=!1;const yt=S.isCatmullRomCurve3?S.closed:!1;P=S.computeFrenetFrames(v,yt),R=new W,L=new W,E=new W}g||(M=0,x=0,T=0,D=0);const N=h.extractPoints(p);let F=N.shape;const H=N.holes;if(!Fr.isClockWise(F)){F=F.reverse();for(let yt=0,wt=H.length;yt<wt;yt++){const Ut=H[yt];Fr.isClockWise(Ut)&&(H[yt]=Ut.reverse())}}function K(yt){const Ut=10000000000000001e-36;let Lt=yt[0];for(let $=1;$<=yt.length;$++){const xt=$%yt.length,At=yt[xt],Ct=At.x-Lt.x,$t=At.y-Lt.y,V=Ct*Ct+$t*$t,oe=Math.max(Math.abs(At.x),Math.abs(At.y),Math.abs(Lt.x),Math.abs(Lt.y)),le=Ut*oe*oe;if(V<=le){yt.splice(xt,1),$--;continue}Lt=At}}K(F),H.forEach(K);const G=H.length,J=F;for(let yt=0;yt<G;yt++){const wt=H[yt];F=F.concat(wt)}function B(yt,wt,Ut){return wt||Ne("ExtrudeGeometry: vec does not exist"),yt.clone().addScaledVector(wt,Ut)}const X=F.length;function nt(yt,wt,Ut){let Lt,$,xt;const At=yt.x-wt.x,Ct=yt.y-wt.y,$t=Ut.x-yt.x,V=Ut.y-yt.y,oe=At*At+Ct*Ct,le=At*V-Ct*$t;if(Math.abs(le)>Number.EPSILON){const z=Math.sqrt(oe),b=Math.sqrt($t*$t+V*V),tt=wt.x-Ct/z,ut=wt.y+At/z,vt=Ut.x-V/b,Nt=Ut.y+$t/b,Bt=((vt-tt)*V-(Nt-ut)*$t)/(At*V-Ct*$t);Lt=tt+At*Bt-yt.x,$=ut+Ct*Bt-yt.y;const mt=Lt*Lt+$*$;if(mt<=2)return new Ot(Lt,$);xt=Math.sqrt(mt/2)}else{let z=!1;At>Number.EPSILON?$t>Number.EPSILON&&(z=!0):At<-Number.EPSILON?$t<-Number.EPSILON&&(z=!0):Math.sign(Ct)===Math.sign(V)&&(z=!0),z?(Lt=-Ct,$=At,xt=Math.sqrt(oe)):(Lt=At,$=Ct,xt=Math.sqrt(oe/2))}return new Ot(Lt/xt,$/xt)}const it=[];for(let yt=0,wt=J.length,Ut=wt-1,Lt=yt+1;yt<wt;yt++,Ut++,Lt++)Ut===wt&&(Ut=0),Lt===wt&&(Lt=0),it[yt]=nt(J[yt],J[Ut],J[Lt]);const ot=[];let U,j=it.concat();for(let yt=0,wt=G;yt<wt;yt++){const Ut=H[yt];U=[];for(let Lt=0,$=Ut.length,xt=$-1,At=Lt+1;Lt<$;Lt++,xt++,At++)xt===$&&(xt=0),At===$&&(At=0),U[Lt]=nt(Ut[Lt],Ut[xt],Ut[At]);ot.push(U),j=j.concat(U)}let dt;if(M===0)dt=Fr.triangulateShape(J,H);else{const yt=[],wt=[];for(let Ut=0;Ut<M;Ut++){const Lt=Ut/M,$=x*Math.cos(Lt*Math.PI/2),xt=T*Math.sin(Lt*Math.PI/2)+D;for(let At=0,Ct=J.length;At<Ct;At++){const $t=B(J[At],it[At],xt);Dt($t.x,$t.y,-$),Lt===0&&yt.push($t)}for(let At=0,Ct=G;At<Ct;At++){const $t=H[At];U=ot[At];const V=[];for(let oe=0,le=$t.length;oe<le;oe++){const z=B($t[oe],U[oe],xt);Dt(z.x,z.y,-$),Lt===0&&V.push(z)}Lt===0&&wt.push(V)}}dt=Fr.triangulateShape(yt,wt)}const Rt=dt.length,Pt=T+D;for(let yt=0;yt<X;yt++){const wt=g?B(F[yt],j[yt],Pt):F[yt];A?(L.copy(P.normals[0]).multiplyScalar(wt.x),R.copy(P.binormals[0]).multiplyScalar(wt.y),E.copy(I[0]).add(L).add(R),Dt(E.x,E.y,E.z)):Dt(wt.x,wt.y,0)}for(let yt=1;yt<=v;yt++)for(let wt=0;wt<X;wt++){const Ut=g?B(F[wt],j[wt],Pt):F[wt];A?(L.copy(P.normals[yt]).multiplyScalar(Ut.x),R.copy(P.binormals[yt]).multiplyScalar(Ut.y),E.copy(I[yt]).add(L).add(R),Dt(E.x,E.y,E.z)):Dt(Ut.x,Ut.y,_/v*yt)}for(let yt=M-1;yt>=0;yt--){const wt=yt/M,Ut=x*Math.cos(wt*Math.PI/2),Lt=T*Math.sin(wt*Math.PI/2)+D;for(let $=0,xt=J.length;$<xt;$++){const At=B(J[$],it[$],Lt);Dt(At.x,At.y,_+Ut)}for(let $=0,xt=H.length;$<xt;$++){const At=H[$];U=ot[$];for(let Ct=0,$t=At.length;Ct<$t;Ct++){const V=B(At[Ct],U[Ct],Lt);A?Dt(V.x,V.y+I[v-1].y,I[v-1].x+Ut):Dt(V.x,V.y,_+Ut)}}}qt(),at();function qt(){const yt=o.length/3;if(g){let wt=0,Ut=X*wt;for(let Lt=0;Lt<Rt;Lt++){const $=dt[Lt];ie($[2]+Ut,$[1]+Ut,$[0]+Ut)}wt=v+M*2,Ut=X*wt;for(let Lt=0;Lt<Rt;Lt++){const $=dt[Lt];ie($[0]+Ut,$[1]+Ut,$[2]+Ut)}}else{for(let wt=0;wt<Rt;wt++){const Ut=dt[wt];ie(Ut[2],Ut[1],Ut[0])}for(let wt=0;wt<Rt;wt++){const Ut=dt[wt];ie(Ut[0]+X*v,Ut[1]+X*v,Ut[2]+X*v)}}a.addGroup(yt,o.length/3-yt,0)}function at(){const yt=o.length/3;let wt=0;gt(J,wt),wt+=J.length;for(let Ut=0,Lt=H.length;Ut<Lt;Ut++){const $=H[Ut];gt($,wt),wt+=$.length}a.addGroup(yt,o.length/3-yt,1)}function gt(yt,wt){let Ut=yt.length;for(;--Ut>=0;){const Lt=Ut;let $=Ut-1;$<0&&($=yt.length-1);for(let xt=0,At=v+M*2;xt<At;xt++){const Ct=X*xt,$t=X*(xt+1),V=wt+Lt+Ct,oe=wt+$+Ct,le=wt+$+$t,z=wt+Lt+$t;kt(V,oe,le,z)}}}function Dt(yt,wt,Ut){m.push(yt),m.push(wt),m.push(Ut)}function ie(yt,wt,Ut){ue(yt),ue(wt),ue(Ut);const Lt=o.length/3,$=O.generateTopUV(a,o,Lt-3,Lt-2,Lt-1);Le($[0]),Le($[1]),Le($[2])}function kt(yt,wt,Ut,Lt){ue(yt),ue(wt),ue(Lt),ue(wt),ue(Ut),ue(Lt);const $=o.length/3,xt=O.generateSideWallUV(a,o,$-6,$-3,$-2,$-1);Le(xt[0]),Le(xt[1]),Le(xt[3]),Le(xt[1]),Le(xt[2]),Le(xt[3])}function ue(yt){o.push(m[yt*3+0]),o.push(m[yt*3+1]),o.push(m[yt*3+2])}function Le(yt){c.push(yt.x),c.push(yt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes,a=this.parameters.options;return Z1(n,a,t)}static fromJSON(t,n){const a=[];for(let c=0,u=t.shapes.length;c<u;c++){const h=n[t.shapes[c]];a.push(h)}const o=t.options.extrudePath;return o!==void 0&&(t.options.extrudePath=new vu[o.type]().fromJSON(o)),new Cp(a,t.options)}}const Y1={generateTopUV:function(r,t,n,a,o){const c=t[n*3],u=t[n*3+1],h=t[a*3],m=t[a*3+1],p=t[o*3],v=t[o*3+1];return[new Ot(c,u),new Ot(h,m),new Ot(p,v)]},generateSideWallUV:function(r,t,n,a,o,c){const u=t[n*3],h=t[n*3+1],m=t[n*3+2],p=t[a*3],v=t[a*3+1],_=t[a*3+2],g=t[o*3],x=t[o*3+1],T=t[o*3+2],D=t[c*3],M=t[c*3+1],S=t[c*3+2];return Math.abs(h-v)<Math.abs(u-p)?[new Ot(u,1-m),new Ot(p,1-_),new Ot(g,1-T),new Ot(D,1-S)]:[new Ot(h,1-m),new Ot(v,1-_),new Ot(x,1-T),new Ot(M,1-S)]}};function Z1(r,t,n){if(n.shapes=[],Array.isArray(r))for(let a=0,o=r.length;a<o;a++){const c=r[a];n.shapes.push(c.uuid)}else n.shapes.push(r.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}class yu extends Nn{constructor(t=[new Ot(0,-.5),new Ot(.5,0),new Ot(0,.5)],n=12,a=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:n,phiStart:a,phiLength:o},n=Math.floor(n),o=be(o,0,Math.PI*2);const c=[],u=[],h=[],m=[],p=[],v=1/n,_=new W,g=new Ot,x=new W,T=new W,D=new W;let M=0,S=0;for(let O=0;O<=t.length-1;O++)switch(O){case 0:M=t[O+1].x-t[O].x,S=t[O+1].y-t[O].y,x.x=S*1,x.y=-M,x.z=S*0,D.copy(x),x.normalize(),m.push(x.x,x.y,x.z);break;case t.length-1:m.push(D.x,D.y,D.z);break;default:M=t[O+1].x-t[O].x,S=t[O+1].y-t[O].y,x.x=S*1,x.y=-M,x.z=S*0,T.copy(x),x.x+=D.x,x.y+=D.y,x.z+=D.z,x.normalize(),m.push(x.x,x.y,x.z),D.copy(T)}for(let O=0;O<=n;O++){const I=a+O*v*o,A=Math.sin(I),P=Math.cos(I);for(let R=0;R<=t.length-1;R++){_.x=t[R].x*A,_.y=t[R].y,_.z=t[R].x*P,u.push(_.x,_.y,_.z),g.x=O/n,g.y=R/(t.length-1),h.push(g.x,g.y);const L=m[3*R+0]*A,E=m[3*R+1],N=m[3*R+0]*P;p.push(L,E,N)}}for(let O=0;O<n;O++)for(let I=0;I<t.length-1;I++){const A=I+O*t.length,P=A,R=A+t.length,L=A+t.length+1,E=A+1;c.push(P,R,E),c.push(L,E,R)}this.setIndex(c),this.setAttribute("position",new He(u,3)),this.setAttribute("uv",new He(h,2)),this.setAttribute("normal",new He(p,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yu(t.points,t.segments,t.phiStart,t.phiLength)}}class Fs extends Nn{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const c=t/2,u=n/2,h=Math.floor(a),m=Math.floor(o),p=h+1,v=m+1,_=t/h,g=n/m,x=[],T=[],D=[],M=[];for(let S=0;S<v;S++){const O=S*g-u;for(let I=0;I<p;I++){const A=I*_-c;T.push(A,-O,0),D.push(0,0,1),M.push(I/h),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let O=0;O<h;O++){const I=O+p*S,A=O+p*(S+1),P=O+1+p*(S+1),R=O+1+p*S;x.push(I,A,R),x.push(A,P,R)}this.setIndex(x),this.setAttribute("position",new He(T,3)),this.setAttribute("normal",new He(D,3)),this.setAttribute("uv",new He(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Dp extends Nn{constructor(t=1,n=32,a=16,o=0,c=Math.PI*2,u=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:o,phiLength:c,thetaStart:u,thetaLength:h},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const m=Math.min(u+h,Math.PI);let p=0;const v=[],_=new W,g=new W,x=[],T=[],D=[],M=[];for(let S=0;S<=a;S++){const O=[],I=S/a,A=u+I*h,P=t*Math.cos(A),R=Math.sqrt(t*t-P*P);let L=0;S===0&&u===0?L=.5/n:S===a&&m===Math.PI&&(L=-.5/n);for(let E=0;E<=n;E++){const N=E/n,F=o+N*c;_.x=-R*Math.cos(F),_.y=P,_.z=R*Math.sin(F),T.push(_.x,_.y,_.z),g.copy(_).normalize(),D.push(g.x,g.y,g.z),M.push(N+L,1-I),O.push(p++)}v.push(O)}for(let S=0;S<a;S++)for(let O=0;O<n;O++){const I=v[S][O+1],A=v[S][O],P=v[S+1][O],R=v[S+1][O+1];(S!==0||u>0)&&x.push(I,A,R),(S!==a-1||m<Math.PI)&&x.push(A,P,R)}this.setIndex(x),this.setAttribute("position",new He(T,3)),this.setAttribute("normal",new He(D,3)),this.setAttribute("uv",new He(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dp(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Hr extends Nn{constructor(t=1,n=.4,a=12,o=48,c=Math.PI*2,u=0,h=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:a,tubularSegments:o,arc:c,thetaStart:u,thetaLength:h},a=Math.floor(a),o=Math.floor(o);const m=[],p=[],v=[],_=[],g=new W,x=new W,T=new W;for(let D=0;D<=a;D++){const M=u+D/a*h;for(let S=0;S<=o;S++){const O=S/o*c;x.x=(t+n*Math.cos(M))*Math.cos(O),x.y=(t+n*Math.cos(M))*Math.sin(O),x.z=n*Math.sin(M),p.push(x.x,x.y,x.z),g.x=t*Math.cos(O),g.y=t*Math.sin(O),T.subVectors(x,g).normalize(),v.push(T.x,T.y,T.z),_.push(S/o),_.push(D/a)}}for(let D=1;D<=a;D++)for(let M=1;M<=o;M++){const S=(o+1)*D+M-1,O=(o+1)*(D-1)+M-1,I=(o+1)*(D-1)+M,A=(o+1)*D+M;m.push(S,O,A),m.push(O,I,A)}this.setIndex(m),this.setAttribute("position",new He(p,3)),this.setAttribute("normal",new He(v,3)),this.setAttribute("uv",new He(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class _u extends Nn{constructor(t=new hx(new W(-1,-1,0),new W(-1,1,0),new W(1,1,0)),n=64,a=1,o=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:a,radialSegments:o,closed:c};const u=t.computeFrenetFrames(n,c);this.tangents=u.tangents,this.normals=u.normals,this.binormals=u.binormals;const h=new W,m=new W,p=new Ot;let v=new W;const _=[],g=[],x=[],T=[];D(),this.setIndex(T),this.setAttribute("position",new He(_,3)),this.setAttribute("normal",new He(g,3)),this.setAttribute("uv",new He(x,2));function D(){for(let I=0;I<n;I++)M(I);M(c===!1?n:0),O(),S()}function M(I){v=t.getPointAt(I/n,v);const A=u.normals[I],P=u.binormals[I];for(let R=0;R<=o;R++){const L=R/o*Math.PI*2,E=Math.sin(L),N=-Math.cos(L);m.x=N*A.x+E*P.x,m.y=N*A.y+E*P.y,m.z=N*A.z+E*P.z,m.normalize(),g.push(m.x,m.y,m.z),h.x=v.x+a*m.x,h.y=v.y+a*m.y,h.z=v.z+a*m.z,_.push(h.x,h.y,h.z)}}function S(){for(let I=1;I<=n;I++)for(let A=1;A<=o;A++){const P=(o+1)*(I-1)+(A-1),R=(o+1)*I+(A-1),L=(o+1)*I+A,E=(o+1)*(I-1)+A;T.push(P,R,E),T.push(R,L,E)}}function O(){for(let I=0;I<=n;I++)for(let A=0;A<=o;A++)p.x=I/n,p.y=A/o,x.push(p.x,p.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new _u(new vu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Yr(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const o=r[n][a];if(a_(o))o.isRenderTargetTexture?(de("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone();else if(Array.isArray(o))if(a_(o[0])){const c=[];for(let u=0,h=o.length;u<h;u++)c[u]=o[u].clone();t[n][a]=c}else t[n][a]=o.slice();else t[n][a]=o}}return t}function kn(r){const t={};for(let n=0;n<r.length;n++){const a=Yr(r[n]);for(const o in a)t[o]=a[o]}return t}function a_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function K1(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function xx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const Sx={clone:Yr,merge:kn};var J1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Q1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends Kr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=J1,this.fragmentShader=Q1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Yr(t.uniforms),this.uniformsGroups=K1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(t).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const o=t.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new ve().setHex(o.value);break;case"v2":this.uniforms[a].value=new Ot().fromArray(o.value);break;case"v3":this.uniforms[a].value=new W().fromArray(o.value);break;case"v4":this.uniforms[a].value=new en().fromArray(o.value);break;case"m3":this.uniforms[a].value=new ge().fromArray(o.value);break;case"m4":this.uniforms[a].value=new Ge().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class j1 extends Ci{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ei extends Kr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=du,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Da,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ld extends ei{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return be(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class $1 extends Kr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=du,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Da,this.combine=cp,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class tE extends Kr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class eE extends Kr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class xl extends Sn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ve(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class nE extends xl{constructor(t,n,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ve(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const cd=new Ge,s_=new W,r_=new W;class Up{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tp,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new en(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera;s_.setFromMatrixPosition(t.matrixWorld),n.position.copy(s_),r_.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(r_),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,a,o){cd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix(cd,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,u=o?o.z/c.x:1,h=o?o.w/c.y:1,m=o?o.x/c.x:0,p=o?o.y/c.y:0;t.coordinateSystem===dl||t.reversedDepth?n.set(.5*u,0,0,.5*u+m,0,.5*h,0,.5*h+p,0,0,1,0,0,0,0,1):n.set(.5*u,0,0,.5*u+m,0,.5*h,0,.5*h+p,0,0,.5,.5,0,0,0,1),n.multiply(cd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const jc=new W,$c=new Zr,Yi=new W;class yx extends Sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=Ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(jc,$c,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jc,$c,Yi.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(jc,$c,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jc,$c,Yi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ls=new W,o_=new Ot,l_=new Ot;class ni extends yx{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Wr*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(sl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wr*2*Math.atan(Math.tan(sl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-t/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(ls.x,ls.y).multiplyScalar(-t/ls.z)}getViewSize(t,n){return this.getViewBounds(t,o_,l_),n.subVectors(l_,o_)}setViewOffset(t,n,a,o,c,u){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(sl*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,p=u.fullHeight;c+=u.offsetX*o/m,n-=u.offsetY*a/p,o*=u.width/m,a*=u.height/p}const h=this.filmOffset;h!==0&&(c+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class iE extends Up{constructor(){super(new ni(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const n=this.camera,a=Wr*2*t.angle*this.focus,o=this.mapSize.width/this.mapSize.height*this.aspect,c=t.distance||n.far;(a!==n.fov||o!==n.aspect||c!==n.far)&&(n.fov=a,n.aspect=o,n.far=c,n.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class aE extends xl{constructor(t,n,a=0,o=Math.PI/3,c=0,u=2){super(t,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.target=new Sn,this.distance=a,this.angle=o,this.penumbra=c,this.decay=u,this.map=null,this.shadow=new iE}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.angle=this.angle,n.object.decay=this.decay,n.object.penumbra=this.penumbra,n.object.target=this.target.uuid,this.map&&this.map.isTexture&&(n.object.map=this.map.toJSON(t).uuid),n.object.shadow=this.shadow.toJSON(),n}}class sE extends Up{constructor(){super(new ni(90,1,.5,500)),this.isPointLightShadow=!0}}class nl extends xl{constructor(t,n,a=0,o=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=o,this.shadow=new sE}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class Lp extends yx{constructor(t=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-t,u=a+t,h=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,u=c+p*this.view.width,h-=v*this.view.offsetY,m=h-v*this.view.height}this.projectionMatrix.makeOrthographic(c,u,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class rE extends Up{constructor(){super(new Lp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oE extends xl{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.target=new Sn,this.shadow=new rE}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const Nr=-90,Or=1;class lE extends Sn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ni(Nr,Or,t,n);o.layers=this.layers,this.add(o);const c=new ni(Nr,Or,t,n);c.layers=this.layers,this.add(c);const u=new ni(Nr,Or,t,n);u.layers=this.layers,this.add(u);const h=new ni(Nr,Or,t,n);h.layers=this.layers,this.add(h);const m=new ni(Nr,Or,t,n);m.layers=this.layers,this.add(m);const p=new ni(Nr,Or,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,h,m]=n;for(const p of n)this.remove(p);if(t===Ji)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===dl)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,u,h,m,p,v]=this.children,_=t.getRenderTarget(),g=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),T=t.xr.enabled;t.xr.enabled=!1;const D=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(a,0,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,1,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(a,2,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(a,3,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,m),t.setRenderTarget(a,4,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,p),a.texture.generateMipmaps=D,t.setRenderTarget(a,5,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,v),t.setRenderTarget(_,g,x),t.xr.enabled=T,a.texture.needsPMREMUpdate=!0}}class cE extends ni{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const c_=new Ge;class uE{constructor(t,n,a=0,o=1/0){this.ray=new sx(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new Mp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Ne("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return c_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(c_),this}intersectObject(t,n=!0,a=[]){return ip(t,this,a,n),a.sort(u_),a}intersectObjects(t,n=!0,a=[]){for(let o=0,c=t.length;o<c;o++)ip(t[o],this,a,n);return a.sort(u_),a}}function u_(r,t){return r.distance-t.distance}function ip(r,t,n,a){let o=!0;if(r.layers.test(t.layers)&&r.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,h=c.length;u<h;u++)ip(c[u],t,n,!0)}}const zp=class zp{constructor(t,n,a,o){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,o){const c=this.elements;return c[0]=t,c[2]=n,c[1]=a,c[3]=o,this}};zp.prototype.isMatrix2=!0;let f_=zp;function h_(r,t,n,a){const o=fE(a);switch(n){case Q_:return r*t;case pp:return r*t/o.components*o.byteLength;case mp:return r*t/o.components*o.byteLength;case zs:return r*t*2/o.components*o.byteLength;case gp:return r*t*2/o.components*o.byteLength;case j_:return r*t*3/o.components*o.byteLength;case Hi:return r*t*4/o.components*o.byteLength;case vp:return r*t*4/o.components*o.byteLength;case su:case ru:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ou:case lu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Td:case wd:return Math.max(r,16)*Math.max(t,8)/4;case bd:case Ad:return Math.max(r,8)*Math.max(t,8)/2;case Rd:case Cd:case Ud:case Ld:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Dd:case fu:case Nd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Od:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Pd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Id:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case zd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Bd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Fd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Gd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Vd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case kd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Xd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Wd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case qd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Yd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Zd:case Kd:case Jd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Qd:case jd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case hu:case $d:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function fE(r){switch(r){case pi:case Y_:return{byteLength:1,components:1};case fl:case Z_:case Ri:return{byteLength:2,components:1};case hp:case dp:return{byteLength:2,components:4};case $i:case fp:case Fi:return{byteLength:4,components:1};case K_:case J_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lp}}));typeof window<"u"&&(window.__THREE__?de("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Mx(){let r=null,t=!1,n=null,a=null;function o(c,u){a=r.requestAnimationFrame(o),n(c,u)}return{start:function(){t!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function hE(r){const t=new WeakMap;function n(h,m){const p=h.array,v=h.usage,_=p.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,p,v),h.onUploadCallback();let x;if(p instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)x=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)x=r.SHORT;else if(p instanceof Uint32Array)x=r.UNSIGNED_INT;else if(p instanceof Int32Array)x=r.INT;else if(p instanceof Int8Array)x=r.BYTE;else if(p instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:x,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:_}}function a(h,m,p){const v=m.array,_=m.updateRanges;if(r.bindBuffer(p,h),_.length===0)r.bufferSubData(p,0,v);else{_.sort((x,T)=>x.start-T.start);let g=0;for(let x=1;x<_.length;x++){const T=_[g],D=_[x];D.start<=T.start+T.count+1?T.count=Math.max(T.count,D.start+D.count-T.start):(++g,_[g]=D)}_.length=g+1;for(let x=0,T=_.length;x<T;x++){const D=_[x];r.bufferSubData(p,D.start*v.BYTES_PER_ELEMENT,v,D.start,D.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=t.get(h);m&&(r.deleteBuffer(m.buffer),t.delete(h))}function u(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const v=t.get(h);(!v||v.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=t.get(h);if(p===void 0)t.set(h,n(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,h,m),p.version=h.version}}return{get:o,remove:c,update:u}}var dE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pE=`#ifdef USE_ALPHAHASH
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
#endif`,mE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_E=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xE=`#ifdef USE_AOMAP
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
#endif`,SE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yE=`#ifdef USE_BATCHING
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
#endif`,ME=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,EE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,TE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,AE=`#ifdef USE_IRIDESCENCE
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
#endif`,wE=`#ifdef USE_BUMPMAP
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
#endif`,RE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,CE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,DE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,UE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,LE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,NE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,OE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,PE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,IE=`#define PI 3.141592653589793
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
} // validated`,zE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,BE=`vec3 transformedNormal = objectNormal;
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
#endif`,FE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,HE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,GE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,VE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kE="gl_FragColor = linearToOutputTexel( gl_FragColor );",XE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,WE=`#ifdef USE_ENVMAP
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
#endif`,qE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,YE=`#ifdef USE_ENVMAP
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
#endif`,ZE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,KE=`#ifdef USE_ENVMAP
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
#endif`,JE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,QE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$E=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tb=`#ifdef USE_GRADIENTMAP
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
}`,eb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ib=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ab=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,sb=`#ifdef USE_ENVMAP
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
#endif`,rb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ob=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ub=`PhysicalMaterial material;
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
#endif`,fb=`uniform sampler2D dfgLUT;
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
}`,hb=`
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
#endif`,db=`#if defined( RE_IndirectDiffuse )
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
#endif`,pb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,gb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_b=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Eb=`#if defined( USE_POINTS_UV )
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
#endif`,bb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ab=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cb=`#ifdef USE_MORPHTARGETS
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
#endif`,Db=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ub=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Nb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ob=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ib=`#ifdef USE_NORMALMAP
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
#endif`,zb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jb=`float getShadowMask() {
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
}`,$b=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tT=`#ifdef USE_SKINNING
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
#endif`,eT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nT=`#ifdef USE_SKINNING
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
#endif`,iT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,aT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,oT=`#ifdef USE_TRANSMISSION
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
#endif`,lT=`#ifdef USE_TRANSMISSION
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
#endif`,cT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pT=`uniform sampler2D t2D;
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
}`,mT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_T=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xT=`#include <common>
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
}`,ST=`#if DEPTH_PACKING == 3200
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
}`,yT=`#define DISTANCE
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
}`,MT=`#define DISTANCE
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
}`,ET=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TT=`uniform float scale;
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
}`,AT=`uniform vec3 diffuse;
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
}`,wT=`#include <common>
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
}`,RT=`uniform vec3 diffuse;
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
}`,CT=`#define LAMBERT
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
}`,DT=`#define LAMBERT
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
}`,UT=`#define MATCAP
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
}`,LT=`#define MATCAP
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
}`,NT=`#define NORMAL
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
}`,OT=`#define NORMAL
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
}`,PT=`#define PHONG
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
}`,IT=`#define PHONG
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
}`,zT=`#define STANDARD
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
}`,BT=`#define STANDARD
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
}`,FT=`#define TOON
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
}`,HT=`#define TOON
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
}`,GT=`uniform float size;
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
}`,VT=`uniform vec3 diffuse;
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
}`,kT=`#include <common>
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
}`,XT=`uniform vec3 color;
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
}`,WT=`uniform float rotation;
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
}`,qT=`uniform vec3 diffuse;
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
}`,Ee={alphahash_fragment:dE,alphahash_pars_fragment:pE,alphamap_fragment:mE,alphamap_pars_fragment:gE,alphatest_fragment:vE,alphatest_pars_fragment:_E,aomap_fragment:xE,aomap_pars_fragment:SE,batching_pars_vertex:yE,batching_vertex:ME,begin_vertex:EE,beginnormal_vertex:bE,bsdfs:TE,iridescence_fragment:AE,bumpmap_pars_fragment:wE,clipping_planes_fragment:RE,clipping_planes_pars_fragment:CE,clipping_planes_pars_vertex:DE,clipping_planes_vertex:UE,color_fragment:LE,color_pars_fragment:NE,color_pars_vertex:OE,color_vertex:PE,common:IE,cube_uv_reflection_fragment:zE,defaultnormal_vertex:BE,displacementmap_pars_vertex:FE,displacementmap_vertex:HE,emissivemap_fragment:GE,emissivemap_pars_fragment:VE,colorspace_fragment:kE,colorspace_pars_fragment:XE,envmap_fragment:WE,envmap_common_pars_fragment:qE,envmap_pars_fragment:YE,envmap_pars_vertex:ZE,envmap_physical_pars_fragment:sb,envmap_vertex:KE,fog_vertex:JE,fog_pars_vertex:QE,fog_fragment:jE,fog_pars_fragment:$E,gradientmap_pars_fragment:tb,lightmap_pars_fragment:eb,lights_lambert_fragment:nb,lights_lambert_pars_fragment:ib,lights_pars_begin:ab,lights_toon_fragment:rb,lights_toon_pars_fragment:ob,lights_phong_fragment:lb,lights_phong_pars_fragment:cb,lights_physical_fragment:ub,lights_physical_pars_fragment:fb,lights_fragment_begin:hb,lights_fragment_maps:db,lights_fragment_end:pb,lightprobes_pars_fragment:mb,logdepthbuf_fragment:gb,logdepthbuf_pars_fragment:vb,logdepthbuf_pars_vertex:_b,logdepthbuf_vertex:xb,map_fragment:Sb,map_pars_fragment:yb,map_particle_fragment:Mb,map_particle_pars_fragment:Eb,metalnessmap_fragment:bb,metalnessmap_pars_fragment:Tb,morphinstance_vertex:Ab,morphcolor_vertex:wb,morphnormal_vertex:Rb,morphtarget_pars_vertex:Cb,morphtarget_vertex:Db,normal_fragment_begin:Ub,normal_fragment_maps:Lb,normal_pars_fragment:Nb,normal_pars_vertex:Ob,normal_vertex:Pb,normalmap_pars_fragment:Ib,clearcoat_normal_fragment_begin:zb,clearcoat_normal_fragment_maps:Bb,clearcoat_pars_fragment:Fb,iridescence_pars_fragment:Hb,opaque_fragment:Gb,packing:Vb,premultiplied_alpha_fragment:kb,project_vertex:Xb,dithering_fragment:Wb,dithering_pars_fragment:qb,roughnessmap_fragment:Yb,roughnessmap_pars_fragment:Zb,shadowmap_pars_fragment:Kb,shadowmap_pars_vertex:Jb,shadowmap_vertex:Qb,shadowmask_pars_fragment:jb,skinbase_vertex:$b,skinning_pars_vertex:tT,skinning_vertex:eT,skinnormal_vertex:nT,specularmap_fragment:iT,specularmap_pars_fragment:aT,tonemapping_fragment:sT,tonemapping_pars_fragment:rT,transmission_fragment:oT,transmission_pars_fragment:lT,uv_pars_fragment:cT,uv_pars_vertex:uT,uv_vertex:fT,worldpos_vertex:hT,background_vert:dT,background_frag:pT,backgroundCube_vert:mT,backgroundCube_frag:gT,cube_vert:vT,cube_frag:_T,depth_vert:xT,depth_frag:ST,distance_vert:yT,distance_frag:MT,equirect_vert:ET,equirect_frag:bT,linedashed_vert:TT,linedashed_frag:AT,meshbasic_vert:wT,meshbasic_frag:RT,meshlambert_vert:CT,meshlambert_frag:DT,meshmatcap_vert:UT,meshmatcap_frag:LT,meshnormal_vert:NT,meshnormal_frag:OT,meshphong_vert:PT,meshphong_frag:IT,meshphysical_vert:zT,meshphysical_frag:BT,meshtoon_vert:FT,meshtoon_frag:HT,points_vert:GT,points_frag:VT,shadow_vert:kT,shadow_frag:XT,sprite_vert:WT,sprite_frag:qT},Wt={common:{diffuse:{value:new ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ge}},envmap:{envMap:{value:null},envMapRotation:{value:new ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ge},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0},uvTransform:{value:new ge}},sprite:{diffuse:{value:new ve(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}}},Ki={basic:{uniforms:kn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.fog]),vertexShader:Ee.meshbasic_vert,fragmentShader:Ee.meshbasic_frag},lambert:{uniforms:kn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new ve(0)},envMapIntensity:{value:1}}]),vertexShader:Ee.meshlambert_vert,fragmentShader:Ee.meshlambert_frag},phong:{uniforms:kn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new ve(0)},specular:{value:new ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ee.meshphong_vert,fragmentShader:Ee.meshphong_frag},standard:{uniforms:kn([Wt.common,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.roughnessmap,Wt.metalnessmap,Wt.fog,Wt.lights,{emissive:{value:new ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ee.meshphysical_vert,fragmentShader:Ee.meshphysical_frag},toon:{uniforms:kn([Wt.common,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.gradientmap,Wt.fog,Wt.lights,{emissive:{value:new ve(0)}}]),vertexShader:Ee.meshtoon_vert,fragmentShader:Ee.meshtoon_frag},matcap:{uniforms:kn([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,{matcap:{value:null}}]),vertexShader:Ee.meshmatcap_vert,fragmentShader:Ee.meshmatcap_frag},points:{uniforms:kn([Wt.points,Wt.fog]),vertexShader:Ee.points_vert,fragmentShader:Ee.points_frag},dashed:{uniforms:kn([Wt.common,Wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ee.linedashed_vert,fragmentShader:Ee.linedashed_frag},depth:{uniforms:kn([Wt.common,Wt.displacementmap]),vertexShader:Ee.depth_vert,fragmentShader:Ee.depth_frag},normal:{uniforms:kn([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,{opacity:{value:1}}]),vertexShader:Ee.meshnormal_vert,fragmentShader:Ee.meshnormal_frag},sprite:{uniforms:kn([Wt.sprite,Wt.fog]),vertexShader:Ee.sprite_vert,fragmentShader:Ee.sprite_frag},background:{uniforms:{uvTransform:{value:new ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ee.background_vert,fragmentShader:Ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ge}},vertexShader:Ee.backgroundCube_vert,fragmentShader:Ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ee.cube_vert,fragmentShader:Ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ee.equirect_vert,fragmentShader:Ee.equirect_frag},distance:{uniforms:kn([Wt.common,Wt.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ee.distance_vert,fragmentShader:Ee.distance_frag},shadow:{uniforms:kn([Wt.lights,Wt.fog,{color:{value:new ve(0)},opacity:{value:1}}]),vertexShader:Ee.shadow_vert,fragmentShader:Ee.shadow_frag}};Ki.physical={uniforms:kn([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ge},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ge},sheen:{value:0},sheenColor:{value:new ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ge},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ge},attenuationDistance:{value:0},attenuationColor:{value:new ve(0)},specularColor:{value:new ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ge},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ge}}]),vertexShader:Ee.meshphysical_vert,fragmentShader:Ee.meshphysical_frag};const tu={r:0,b:0,g:0},YT=new Ge,Ex=new ge;Ex.set(-1,0,0,0,1,0,0,0,1);function ZT(r,t,n,a,o,c){const u=new ve(0);let h=o===!0?0:1,m,p,v=null,_=0,g=null;function x(O){let I=O.isScene===!0?O.background:null;if(I&&I.isTexture){const A=O.backgroundBlurriness>0;I=t.get(I,A)}return I}function T(O){let I=!1;const A=x(O);A===null?M(u,h):A&&A.isColor&&(M(A,1),I=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,c):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||I)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function D(O,I){const A=x(I);A&&(A.isCubeTexture||A.mapping===Su)?(p===void 0&&(p=new ln(new ks(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:Yr(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(P,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=A,p.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(YT.makeRotationFromEuler(I.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(Ex),p.material.toneMapped=Ue.getTransfer(A.colorSpace)!==Xe,(v!==A||_!==A.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,v=A,_=A.version,g=r.toneMapping),p.layers.enableAll(),O.unshift(p,p.geometry,p.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new ln(new Fs(2,2),new Ci({name:"BackgroundMaterial",uniforms:Yr(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:Ps,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,m.material.toneMapped=Ue.getTransfer(A.colorSpace)!==Xe,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(v!==A||_!==A.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,v=A,_=A.version,g=r.toneMapping),m.layers.enableAll(),O.unshift(m,m.geometry,m.material,0,0,null))}function M(O,I){O.getRGB(tu,xx(r)),n.buffers.color.setClear(tu.r,tu.g,tu.b,I,c)}function S(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(O,I=1){u.set(O),h=I,M(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(O){h=O,M(u,h)},render:T,addToRenderList:D,dispose:S}}function KT(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=g(null);let c=o,u=!1;function h(H,q,K,G,J){let B=!1;const X=_(H,G,K,q);c!==X&&(c=X,p(c.object)),B=x(H,G,K,J),B&&T(H,G,K,J),J!==null&&t.update(J,r.ELEMENT_ARRAY_BUFFER),(B||u)&&(u=!1,A(H,q,K,G),J!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function m(){return r.createVertexArray()}function p(H){return r.bindVertexArray(H)}function v(H){return r.deleteVertexArray(H)}function _(H,q,K,G){const J=G.wireframe===!0;let B=a[q.id];B===void 0&&(B={},a[q.id]=B);const X=H.isInstancedMesh===!0?H.id:0;let nt=B[X];nt===void 0&&(nt={},B[X]=nt);let it=nt[K.id];it===void 0&&(it={},nt[K.id]=it);let ot=it[J];return ot===void 0&&(ot=g(m()),it[J]=ot),ot}function g(H){const q=[],K=[],G=[];for(let J=0;J<n;J++)q[J]=0,K[J]=0,G[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:K,attributeDivisors:G,object:H,attributes:{},index:null}}function x(H,q,K,G){const J=c.attributes,B=q.attributes;let X=0;const nt=K.getAttributes();for(const it in nt)if(nt[it].location>=0){const U=J[it];let j=B[it];if(j===void 0&&(it==="instanceMatrix"&&H.instanceMatrix&&(j=H.instanceMatrix),it==="instanceColor"&&H.instanceColor&&(j=H.instanceColor)),U===void 0||U.attribute!==j||j&&U.data!==j.data)return!0;X++}return c.attributesNum!==X||c.index!==G}function T(H,q,K,G){const J={},B=q.attributes;let X=0;const nt=K.getAttributes();for(const it in nt)if(nt[it].location>=0){let U=B[it];U===void 0&&(it==="instanceMatrix"&&H.instanceMatrix&&(U=H.instanceMatrix),it==="instanceColor"&&H.instanceColor&&(U=H.instanceColor));const j={};j.attribute=U,U&&U.data&&(j.data=U.data),J[it]=j,X++}c.attributes=J,c.attributesNum=X,c.index=G}function D(){const H=c.newAttributes;for(let q=0,K=H.length;q<K;q++)H[q]=0}function M(H){S(H,0)}function S(H,q){const K=c.newAttributes,G=c.enabledAttributes,J=c.attributeDivisors;K[H]=1,G[H]===0&&(r.enableVertexAttribArray(H),G[H]=1),J[H]!==q&&(r.vertexAttribDivisor(H,q),J[H]=q)}function O(){const H=c.newAttributes,q=c.enabledAttributes;for(let K=0,G=q.length;K<G;K++)q[K]!==H[K]&&(r.disableVertexAttribArray(K),q[K]=0)}function I(H,q,K,G,J,B,X){X===!0?r.vertexAttribIPointer(H,q,K,J,B):r.vertexAttribPointer(H,q,K,G,J,B)}function A(H,q,K,G){D();const J=G.attributes,B=K.getAttributes(),X=q.defaultAttributeValues;for(const nt in B){const it=B[nt];if(it.location>=0){let ot=J[nt];if(ot===void 0&&(nt==="instanceMatrix"&&H.instanceMatrix&&(ot=H.instanceMatrix),nt==="instanceColor"&&H.instanceColor&&(ot=H.instanceColor)),ot!==void 0){const U=ot.normalized,j=ot.itemSize,dt=t.get(ot);if(dt===void 0)continue;const Rt=dt.buffer,Pt=dt.type,qt=dt.bytesPerElement,at=Pt===r.INT||Pt===r.UNSIGNED_INT||ot.gpuType===fp;if(ot.isInterleavedBufferAttribute){const gt=ot.data,Dt=gt.stride,ie=ot.offset;if(gt.isInstancedInterleavedBuffer){for(let kt=0;kt<it.locationSize;kt++)S(it.location+kt,gt.meshPerAttribute);H.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let kt=0;kt<it.locationSize;kt++)M(it.location+kt);r.bindBuffer(r.ARRAY_BUFFER,Rt);for(let kt=0;kt<it.locationSize;kt++)I(it.location+kt,j/it.locationSize,Pt,U,Dt*qt,(ie+j/it.locationSize*kt)*qt,at)}else{if(ot.isInstancedBufferAttribute){for(let gt=0;gt<it.locationSize;gt++)S(it.location+gt,ot.meshPerAttribute);H.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let gt=0;gt<it.locationSize;gt++)M(it.location+gt);r.bindBuffer(r.ARRAY_BUFFER,Rt);for(let gt=0;gt<it.locationSize;gt++)I(it.location+gt,j/it.locationSize,Pt,U,j*qt,j/it.locationSize*gt*qt,at)}}else if(X!==void 0){const U=X[nt];if(U!==void 0)switch(U.length){case 2:r.vertexAttrib2fv(it.location,U);break;case 3:r.vertexAttrib3fv(it.location,U);break;case 4:r.vertexAttrib4fv(it.location,U);break;default:r.vertexAttrib1fv(it.location,U)}}}}O()}function P(){N();for(const H in a){const q=a[H];for(const K in q){const G=q[K];for(const J in G){const B=G[J];for(const X in B)v(B[X].object),delete B[X];delete G[J]}}delete a[H]}}function R(H){if(a[H.id]===void 0)return;const q=a[H.id];for(const K in q){const G=q[K];for(const J in G){const B=G[J];for(const X in B)v(B[X].object),delete B[X];delete G[J]}}delete a[H.id]}function L(H){for(const q in a){const K=a[q];for(const G in K){const J=K[G];if(J[H.id]===void 0)continue;const B=J[H.id];for(const X in B)v(B[X].object),delete B[X];delete J[H.id]}}}function E(H){for(const q in a){const K=a[q],G=H.isInstancedMesh===!0?H.id:0,J=K[G];if(J!==void 0){for(const B in J){const X=J[B];for(const nt in X)v(X[nt].object),delete X[nt];delete J[B]}delete K[G],Object.keys(K).length===0&&delete a[q]}}}function N(){F(),u=!0,c!==o&&(c=o,p(c.object))}function F(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:N,resetDefaultState:F,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfObject:E,releaseStatesOfProgram:L,initAttributes:D,enableAttribute:M,disableUnusedAttributes:O}}function JT(r,t,n){let a;function o(m){a=m}function c(m,p){r.drawArrays(a,m,p),n.update(p,a,1)}function u(m,p,v){v!==0&&(r.drawArraysInstanced(a,m,p,v),n.update(p,a,v))}function h(m,p,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,p,0,v);let g=0;for(let x=0;x<v;x++)g+=p[x];n.update(g,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function QT(r,t,n,a){let o;function c(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");o=r.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(L){return!(L!==Hi&&a.convert(L)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(L){const E=L===Ri&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==pi&&L!==Fi&&!E&&a.convert(L)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(L){if(L==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const v=m(p);v!==p&&(de("WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const _=n.logarithmicDepthBuffer===!0,g=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&g===!1&&de("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),O=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),I=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),P=r.getParameter(r.MAX_SAMPLES),R=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:x,maxVertexTextures:T,maxTextureSize:D,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:O,maxVaryings:I,maxFragmentUniforms:A,maxSamples:P,samples:R}}function jT(r){const t=this;let n=null,a=0,o=!1,c=!1;const u=new ba,h=new ge,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const x=_.length!==0||g||a!==0||o;return o=g,a=_.length,x},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){n=v(_,g,0)},this.setState=function(_,g,x){const T=_.clippingPlanes,D=_.clipIntersection,M=_.clipShadows,S=r.get(_);if(!o||T===null||T.length===0||c&&!M)c?v(null):p();else{const O=c?0:a,I=O*4;let A=S.clippingState||null;m.value=A,A=v(T,g,I,x);for(let P=0;P!==I;++P)A[P]=n[P];S.clippingState=A,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=O}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function v(_,g,x,T){const D=_!==null?_.length:0;let M=null;if(D!==0){if(M=m.value,T!==!0||M===null){const S=x+D*4,O=g.matrixWorldInverse;h.getNormalMatrix(O),(M===null||M.length<S)&&(M=new Float32Array(S));for(let I=0,A=x;I!==D;++I,A+=4)u.copy(_[I]).applyMatrix4(O,h),u.normal.toArray(M,A),M[A+3]=u.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=D,t.numIntersection=0,M}}const Gr=4,$T=6,tA=20,eA=256,jo=new Lp,d_=new ve;let ud=null,fd=0,hd=0,dd=!1;const nA=new W,Ls=new W;class ap{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,o=100,c={}){const{size:u=256,position:h=nA}=c;ud=this._renderer.getRenderTarget(),fd=this._renderer.getActiveCubeFace(),hd=this._renderer.getActiveMipmapLevel(),dd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,a,o,m,h),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=g_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=m_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ud,fd,hd),this._renderer.xr.enabled=dd,t.scissorTest=!1,Pr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Is||t.mapping===Xr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ud=this._renderer.getRenderTarget(),fd=this._renderer.getActiveCubeFace(),hd=this._renderer.getActiveMipmapLevel(),dd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:zn,minFilter:zn,generateMipmaps:!1,type:Ri,format:Hi,colorSpace:pu,depthBuffer:!1},o=p_(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=p_(t,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=iA(c)),this._blurMaterial=sA(c,t,n),this._ggxMaterial=aA(c,t,n)}return o}_compileMaterial(t){const n=new ln(new Nn,t);this._renderer.compile(n,jo)}_sceneToCubeUV(t,n,a,o,c){const m=new ni(90,1,n,a),p=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,x=_.toneMapping;_.getClearColor(d_),_.toneMapping=Qi,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ln(new ks,new bp({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,M=D.material;let S=!1;const O=t.background;O?O.isColor&&(M.color.copy(O),t.background=null,S=!0):(M.color.copy(d_),S=!0);for(let I=0;I<6;I++){const A=I%3;A===0?(m.up.set(0,p[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[I],c.y,c.z)):A===1?(m.up.set(0,0,p[I]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[I],c.z)):(m.up.set(0,p[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[I]));const P=this._cubeSize;Pr(o,A*P,I>2?P:0,P,P),_.setRenderTarget(o),S&&_.render(D,m),_.render(t,m)}_.toneMapping=x,_.autoClear=g,t.background=O}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===Is||t.mapping===Xr;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=g_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=m_());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const h=c.uniforms;h.envMap.value=t;const m=this._cubeSize;Pr(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(u,jo)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=a}_applyGGXFilter(t,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,h=this._lodMeshes[a];h.material=u;const m=u.uniforms,p=a/(this._lodMeshes.length-1),v=n/(this._lodMeshes.length-1),_=Math.sqrt(p*p-v*v),g=p*1.25,x=_*g,{_lodMax:T}=this,D=this._sizeLods[a],M=3*D*(a>T-Gr?a-T+Gr:0),S=4*(this._cubeSize-D);m.envMap.value=t.texture,m.roughness.value=x,m.mipInt.value=T-n,Pr(c,M,S,3*D,2*D),o.setRenderTarget(c),o.render(h,jo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=T-a,Pr(t,M,S,3*D,2*D),o.setRenderTarget(t),o.render(h,jo)}_blur(t,n,a,o){const c=this._pingPongRenderTarget,u=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(t,c,n,a,u),this._blurPass(c,t,a,a,u)}_blurPass(t,n,a,o,c){const u=this._renderer,h=this._blurMaterial,m=this._lodMeshes[o];m.material=h;const p=h.uniforms;p.envMap.value=t.texture,p.sigma.value=c,p.mipInt.value=this._lodMax-a;const v=this._sizeLods[o],_=3*v*(o>this._lodMax-Gr?o-this._lodMax+Gr:0),g=4*(this._cubeSize-v);Pr(n,_,g,3*v,2*v),u.setRenderTarget(n),u.render(m,jo)}}function iA(r){const t=[],n=[];let a=r;const o=r-Gr+1+$T;for(let c=0;c<o;c++){const u=Math.pow(2,a);t.push(u);const h=1/(u-2),m=-h,p=1+h,v=[m,m,p,m,p,p,m,m,p,p,m,p],_=6,g=6,x=3,T=new Float32Array(x*g*_),D=new Float32Array(x*g*_);for(let S=0;S<_;S++){const O=S%3*2/3-1,I=S>2?0:-1,A=[O,I,0,O+2/3,I,0,O+2/3,I+1,0,O,I,0,O+2/3,I+1,0,O,I+1,0];T.set(A,x*g*S);for(let P=0;P<g;P++){const R=v[P*2]*2-1,L=v[P*2+1]*2-1;S===0?Ls.set(1,L,R):S===1?Ls.set(-R,1,-L):S===2?Ls.set(-R,L,1):S===3?Ls.set(-1,L,-R):S===4?Ls.set(-R,-1,L):Ls.set(R,L,-1),Ls.toArray(D,(S*g+P)*x)}}const M=new Nn;M.setAttribute("position",new ji(T,x)),M.setAttribute("outputDirection",new ji(D,x)),n.push(new ln(M,null)),a>Gr&&a--}return{lodMeshes:n,sizeLods:t}}function p_(r,t,n){const a=new mi(r,t,n);return a.texture.mapping=Su,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Pr(r,t,n,a,o){r.viewport.set(t,n,a,o),r.scissor.set(t,n,a,o)}function aA(r,t,n){return new Ci({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Mu(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function sA(r,t,n){return new Ci({name:"SphericalGaussianBlur",defines:{SAMPLES:tA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Mu(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function m_(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mu(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function g_(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wa,depthTest:!1,depthWrite:!1})}function Mu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class bx extends mi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new ox(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new ks(5,5,5),c=new Ci({name:"CubemapFromEquirect",uniforms:Yr(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Wn,blending:wa});c.uniforms.tEquirect.value=n;const u=new ln(o,c),h=n.minFilter;return n.minFilter===Ns&&(n.minFilter=zn),new lE(1,10,this).update(t,u),n.minFilter=h,u.geometry.dispose(),u.material.dispose(),this}clear(t,n=!0,a=!0,o=!0){const c=t.getRenderTarget();for(let u=0;u<6;u++)t.setRenderTarget(this,u),t.clear(n,a,o);t.setRenderTarget(c)}}function rA(r){let t=new WeakMap,n=new WeakMap,a=null;function o(g,x=!1){return g==null?null:x?u(g):c(g)}function c(g){if(g&&g.isTexture){const x=g.mapping;if(x===Ph||x===Ih)if(t.has(g)){const T=t.get(g).texture;return h(T,g.mapping)}else{const T=g.image;if(T&&T.height>0){const D=new bx(T.height);return D.fromEquirectangularTexture(r,g),t.set(g,D),g.addEventListener("dispose",p),h(D.texture,g.mapping)}else return null}}return g}function u(g){if(g&&g.isTexture){const x=g.mapping,T=x===Ph||x===Ih,D=x===Is||x===Xr;if(T||D){let M=n.get(g);const S=M!==void 0?M.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return a===null&&(a=new ap(r)),M=T?a.fromEquirectangular(g,M):a.fromCubemap(g,M),M.texture.pmremVersion=g.pmremVersion,n.set(g,M),M.texture;if(M!==void 0)return M.texture;{const O=g.image;return T&&O&&O.height>0||D&&O&&m(O)?(a===null&&(a=new ap(r)),M=T?a.fromEquirectangular(g):a.fromCubemap(g),M.texture.pmremVersion=g.pmremVersion,n.set(g,M),g.addEventListener("dispose",v),M.texture):null}}}return g}function h(g,x){return x===Ph?g.mapping=Is:x===Ih&&(g.mapping=Xr),g}function m(g){let x=0;const T=6;for(let D=0;D<T;D++)g[D]!==void 0&&x++;return x===T}function p(g){const x=g.target;x.removeEventListener("dispose",p);const T=t.get(x);T!==void 0&&(t.delete(x),T.dispose())}function v(g){const x=g.target;x.removeEventListener("dispose",v);const T=n.get(x);T!==void 0&&(n.delete(x),T.dispose())}function _(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function oA(r){const t={};function n(a){if(t[a]!==void 0)return t[a];const o=r.getExtension(a);return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&Vr("WebGLRenderer: "+a+" extension not supported."),o}}}function lA(r,t,n,a){const o={},c=new WeakMap;function u(_){const g=_.target;g.index!==null&&t.remove(g.index);for(const T in g.attributes)t.remove(g.attributes[T]);g.removeEventListener("dispose",u),delete o[g.id];const x=c.get(g);x&&(t.remove(x),c.delete(g)),a.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function h(_,g){return o[g.id]===!0||(g.addEventListener("dispose",u),o[g.id]=!0,n.memory.geometries++),g}function m(_){const g=_.attributes;for(const x in g)t.update(g[x],r.ARRAY_BUFFER)}function p(_){const g=[],x=_.index,T=_.attributes.position;let D=0;if(T===void 0)return;if(x!==null){const O=x.array;D=x.version;for(let I=0,A=O.length;I<A;I+=3){const P=O[I+0],R=O[I+1],L=O[I+2];g.push(P,R,R,L,L,P)}}else{const O=T.array;D=T.version;for(let I=0,A=O.length/3-1;I<A;I+=3){const P=I+0,R=I+1,L=I+2;g.push(P,R,R,L,L,P)}}const M=new(T.count>=65535?ax:ix)(g,1);M.version=D;const S=c.get(_);S&&t.remove(S),c.set(_,M)}function v(_){const g=c.get(_);if(g){const x=_.index;x!==null&&g.version<x.version&&p(_)}else p(_);return c.get(_)}return{get:h,update:m,getWireframeAttribute:v}}function cA(r,t,n){let a;function o(_){a=_}let c,u;function h(_){c=_.type,u=_.bytesPerElement}function m(_,g){r.drawElements(a,g,c,_*u),n.update(g,a,1)}function p(_,g,x){x!==0&&(r.drawElementsInstanced(a,g,c,_*u,x),n.update(g,a,x))}function v(_,g,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,g,0,c,_,0,x);let D=0;for(let M=0;M<x;M++)D+=g[M];n.update(D,a,1)}this.setMode=o,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=v}function uA(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,h){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:Ne("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function fA(r,t,n){const a=new WeakMap,o=new en;function c(u,h,m){const p=u.morphTargetInfluences,v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=v!==void 0?v.length:0;let g=a.get(h);if(g===void 0||g.count!==_){let N=function(){L.dispose(),a.delete(h),h.removeEventListener("dispose",N)};g!==void 0&&g.texture.dispose();const x=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,D=h.morphAttributes.color!==void 0,M=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],O=h.morphAttributes.color||[];let I=0;x===!0&&(I=1),T===!0&&(I=2),D===!0&&(I=3);let A=h.attributes.position.count*I,P=1;A>t.maxTextureSize&&(P=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const R=new Float32Array(A*P*4*_),L=new tx(R,A,P,_);L.type=Fi,L.needsUpdate=!0;const E=I*4;for(let F=0;F<_;F++){const H=M[F],q=S[F],K=O[F],G=A*P*4*F;for(let J=0;J<H.count;J++){const B=J*E;x===!0&&(o.fromBufferAttribute(H,J),R[G+B+0]=o.x,R[G+B+1]=o.y,R[G+B+2]=o.z,R[G+B+3]=0),T===!0&&(o.fromBufferAttribute(q,J),R[G+B+4]=o.x,R[G+B+5]=o.y,R[G+B+6]=o.z,R[G+B+7]=0),D===!0&&(o.fromBufferAttribute(K,J),R[G+B+8]=o.x,R[G+B+9]=o.y,R[G+B+10]=o.z,R[G+B+11]=K.itemSize===4?o.w:1)}}g={count:_,texture:L,size:new Ot(A,P)},a.set(h,g),h.addEventListener("dispose",N)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let x=0;for(let D=0;D<p.length;D++)x+=p[D];const T=h.morphTargetsRelative?1:1-x;m.getUniforms().setValue(r,"morphTargetBaseInfluence",T),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function hA(r,t,n,a,o){let c=new WeakMap;function u(p){const v=o.render.frame,_=p.geometry,g=t.get(p,_);if(c.get(g)!==v&&(t.update(g),c.set(g,v)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==v&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,v))),p.isSkinnedMesh){const x=p.skeleton;c.get(x)!==v&&(x.update(),c.set(x,v))}return g}function h(){c=new WeakMap}function m(p){const v=p.target;v.removeEventListener("dispose",m),a.releaseStatesOfObject(v),n.remove(v.instanceMatrix),v.instanceColor!==null&&n.remove(v.instanceColor)}return{update:u,dispose:h}}const dA={[H_]:"LINEAR_TONE_MAPPING",[G_]:"REINHARD_TONE_MAPPING",[V_]:"CINEON_TONE_MAPPING",[up]:"ACES_FILMIC_TONE_MAPPING",[X_]:"AGX_TONE_MAPPING",[W_]:"NEUTRAL_TONE_MAPPING",[k_]:"CUSTOM_TONE_MAPPING"};function pA(r,t,n,a,o,c){const u=new mi(t,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,m=null;const p=new Nn;p.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new He([0,2,0,0,2,0],2));const v=new j1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new ln(p,v),g=new Lp(-1,1,1,-1,0,1);let x=null,T=null,D=!1,M,S=null,O=[],I=!1;this.setSize=function(A,P){u.setSize(A,P),h!==null&&h.setSize(A,P),m!==null&&m.setSize(A,P);for(let R=0;R<O.length;R++){const L=O[R];L.setSize&&L.setSize(A,P)}},this.setEffects=function(A){O=A,I=O.length>0&&O[0].isRenderPass===!0;const P=u.width,R=u.height;O.length>0&&h===null&&(h=new mi(P,R,{type:Ri,depthBuffer:!1,stencilBuffer:!1}),m=new mi(P,R,{type:Ri,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<O.length;L++){const E=O[L];E.setSize&&E.setSize(P,R)}},this.begin=function(A,P){if(D||A.toneMapping===Qi&&O.length===0)return!1;if(S=P,P!==null){const R=P.width,L=P.height;(u.width!==R||u.height!==L)&&this.setSize(R,L)}return I===!1&&A.setRenderTarget(u),M=A.toneMapping,A.toneMapping=Qi,!0},this.hasRenderPass=function(){return I},this.end=function(A,P){A.toneMapping=M,D=!0;let R=u,L=h;for(let E=0;E<O.length;E++){const N=O[E];N.enabled!==!1&&(N.render(A,L,R,P),N.needsSwap!==!1&&(R=L,L=L===h?m:h))}if(x!==A.outputColorSpace||T!==A.toneMapping){x=A.outputColorSpace,T=A.toneMapping,v.defines={},Ue.getTransfer(x)===Xe&&(v.defines.SRGB_TRANSFER="");const E=dA[T];E&&(v.defines[E]=""),v.needsUpdate=!0}v.uniforms.tDiffuse.value=R.texture,A.setRenderTarget(S),A.render(_,g),S=null,D=!1},this.isCompositing=function(){return D},this.dispose=function(){u.dispose(),h!==null&&h.dispose(),m!==null&&m.dispose(),p.dispose(),v.dispose()}}const Tx=new Bn,sp=new pl(1,1),Ax=new tx,wx=new jM,Rx=new ox,v_=[],__=[],x_=new Float32Array(16),S_=new Float32Array(9),y_=new Float32Array(4);function Jr(r,t,n){const a=r[0];if(a<=0||a>0)return r;const o=t*n;let c=v_[o];if(c===void 0&&(c=new Float32Array(o),v_[o]=c),t!==0){a.toArray(c,0);for(let u=1,h=0;u!==t;++u)h+=n,r[u].toArray(c,h)}return c}function En(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function bn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Eu(r,t){let n=__[t];n===void 0&&(n=new Int32Array(t),__[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function mA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function gA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2fv(this.addr,t),bn(n,t)}}function vA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(En(n,t))return;r.uniform3fv(this.addr,t),bn(n,t)}}function _A(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4fv(this.addr,t),bn(n,t)}}function xA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;y_.set(a),r.uniformMatrix2fv(this.addr,!1,y_),bn(n,a)}}function SA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;S_.set(a),r.uniformMatrix3fv(this.addr,!1,S_),bn(n,a)}}function yA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;x_.set(a),r.uniformMatrix4fv(this.addr,!1,x_),bn(n,a)}}function MA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function EA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2iv(this.addr,t),bn(n,t)}}function bA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(En(n,t))return;r.uniform3iv(this.addr,t),bn(n,t)}}function TA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4iv(this.addr,t),bn(n,t)}}function AA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function wA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2uiv(this.addr,t),bn(n,t)}}function RA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(En(n,t))return;r.uniform3uiv(this.addr,t),bn(n,t)}}function CA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4uiv(this.addr,t),bn(n,t)}}function DA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(sp.compareFunction=n.isReversedDepthBuffer()?xp:_p,c=sp):c=Tx,n.setTexture2D(t||c,o)}function UA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||wx,o)}function LA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||Rx,o)}function NA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||Ax,o)}function OA(r){switch(r){case 5126:return mA;case 35664:return gA;case 35665:return vA;case 35666:return _A;case 35674:return xA;case 35675:return SA;case 35676:return yA;case 5124:case 35670:return MA;case 35667:case 35671:return EA;case 35668:case 35672:return bA;case 35669:case 35673:return TA;case 5125:return AA;case 36294:return wA;case 36295:return RA;case 36296:return CA;case 35678:case 36198:case 36298:case 36306:case 35682:return DA;case 35679:case 36299:case 36307:return UA;case 35680:case 36300:case 36308:case 36293:return LA;case 36289:case 36303:case 36311:case 36292:return NA}}function PA(r,t){r.uniform1fv(this.addr,t)}function IA(r,t){const n=Jr(t,this.size,2);r.uniform2fv(this.addr,n)}function zA(r,t){const n=Jr(t,this.size,3);r.uniform3fv(this.addr,n)}function BA(r,t){const n=Jr(t,this.size,4);r.uniform4fv(this.addr,n)}function FA(r,t){const n=Jr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function HA(r,t){const n=Jr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function GA(r,t){const n=Jr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function VA(r,t){r.uniform1iv(this.addr,t)}function kA(r,t){r.uniform2iv(this.addr,t)}function XA(r,t){r.uniform3iv(this.addr,t)}function WA(r,t){r.uniform4iv(this.addr,t)}function qA(r,t){r.uniform1uiv(this.addr,t)}function YA(r,t){r.uniform2uiv(this.addr,t)}function ZA(r,t){r.uniform3uiv(this.addr,t)}function KA(r,t){r.uniform4uiv(this.addr,t)}function JA(r,t,n){const a=this.cache,o=t.length,c=Eu(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=sp:u=Tx;for(let h=0;h!==o;++h)n.setTexture2D(t[h]||u,c[h])}function QA(r,t,n){const a=this.cache,o=t.length,c=Eu(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTexture3D(t[u]||wx,c[u])}function jA(r,t,n){const a=this.cache,o=t.length,c=Eu(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTextureCube(t[u]||Rx,c[u])}function $A(r,t,n){const a=this.cache,o=t.length,c=Eu(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(t[u]||Ax,c[u])}function t2(r){switch(r){case 5126:return PA;case 35664:return IA;case 35665:return zA;case 35666:return BA;case 35674:return FA;case 35675:return HA;case 35676:return GA;case 5124:case 35670:return VA;case 35667:case 35671:return kA;case 35668:case 35672:return XA;case 35669:case 35673:return WA;case 5125:return qA;case 36294:return YA;case 36295:return ZA;case 36296:return KA;case 35678:case 36198:case 36298:case 36306:case 35682:return JA;case 35679:case 36299:case 36307:return QA;case 35680:case 36300:case 36308:case 36293:return jA;case 36289:case 36303:case 36311:case 36292:return $A}}class e2{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=OA(n.type)}}class n2{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=t2(n.type)}}class i2{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const h=o[c];h.setValue(t,n[h.id],a)}}}const pd=/(\w+)(\])?(\[|\.)?/g;function M_(r,t){r.seq.push(t),r.map[t.id]=t}function a2(r,t,n){const a=r.name,o=a.length;for(pd.lastIndex=0;;){const c=pd.exec(a),u=pd.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&u+2===o){M_(n,p===void 0?new e2(h,r,t):new n2(h,r,t));break}else{let _=n.map[h];_===void 0&&(_=new i2(h),M_(n,_)),n=_}}}class cu{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const h=t.getActiveUniform(n,u),m=t.getUniformLocation(n,h.name);a2(h,m,this)}const o=[],c=[];for(const u of this.seq)u.type===t.SAMPLER_2D_SHADOW||u.type===t.SAMPLER_CUBE_SHADOW||u.type===t.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(t,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let c=0,u=n.length;c!==u;++c){const h=n[c],m=a[h.id];m.needsUpdate!==!1&&h.setValue(t,m.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,c=t.length;o!==c;++o){const u=t[o];u.id in n&&a.push(u)}return a}}function E_(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const s2=37297;let r2=0;function o2(r,t){const n=r.split(`
`),a=[],o=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let u=o;u<c;u++){const h=u+1;a.push(`${h===t?">":" "} ${h}: ${n[u]}`)}return a.join(`
`)}const b_=new ge;function l2(r){Ue._getMatrix(b_,Ue.workingColorSpace,r);const t=`mat3( ${b_.elements.map(n=>n.toFixed(4))} )`;switch(Ue.getTransfer(r)){case mu:return[t,"LinearTransferOETF"];case Xe:return[t,"sRGBTransferOETF"];default:return de("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function T_(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const h=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+o2(r.getShaderSource(t),h)}else return c}function c2(r,t){const n=l2(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const u2={[H_]:"Linear",[G_]:"Reinhard",[V_]:"Cineon",[up]:"ACESFilmic",[X_]:"AgX",[W_]:"Neutral",[k_]:"Custom"};function f2(r,t){const n=u2[t];return n===void 0?(de("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const eu=new W;function h2(){Ue.getLuminanceCoefficients(eu);const r=eu.x.toFixed(4),t=eu.y.toFixed(4),n=eu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function d2(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(il).join(`
`)}function p2(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function m2(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(t,o),u=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[u]={type:c.type,location:r.getAttribLocation(t,u),locationSize:h}}return n}function il(r){return r!==""}function A_(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function w_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const g2=/^[ \t]*#include +<([\w\d./]+)>/gm;function rp(r){return r.replace(g2,_2)}const v2=new Map;function _2(r,t){let n=Ee[t];if(n===void 0){const a=v2.get(t);if(a!==void 0)n=Ee[a],de('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return rp(n)}const x2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function R_(r){return r.replace(x2,S2)}function S2(r,t,n,a){let o="";for(let c=parseInt(t);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function C_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const y2={[au]:"SHADOWMAP_TYPE_PCF",[tl]:"SHADOWMAP_TYPE_VSM"};function M2(r){return y2[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const E2={[Is]:"ENVMAP_TYPE_CUBE",[Xr]:"ENVMAP_TYPE_CUBE",[Su]:"ENVMAP_TYPE_CUBE_UV"};function b2(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":E2[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const T2={[Xr]:"ENVMAP_MODE_REFRACTION"};function A2(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":T2[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const w2={[cp]:"ENVMAP_BLENDING_MULTIPLY",[pM]:"ENVMAP_BLENDING_MIX",[mM]:"ENVMAP_BLENDING_ADD"};function R2(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":w2[r.combine]||"ENVMAP_BLENDING_NONE"}function C2(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function D2(r,t,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,h=n.fragmentShader;const m=M2(n),p=b2(n),v=A2(n),_=R2(n),g=C2(n),x=d2(n),T=p2(c),D=o.createProgram();let M,S,O=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,T].filter(il).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,T].filter(il).join(`
`),S.length>0&&(S+=`
`)):(M=[C_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,T,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(il).join(`
`),S=[C_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,T,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+v:"",n.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Qi?"#define TONE_MAPPING":"",n.toneMapping!==Qi?Ee.tonemapping_pars_fragment:"",n.toneMapping!==Qi?f2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ee.colorspace_pars_fragment,c2("linearToOutputTexel",n.outputColorSpace),h2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(il).join(`
`)),u=rp(u),u=A_(u,n),u=w_(u,n),h=rp(h),h=A_(h,n),h=w_(h,n),u=R_(u),h=R_(h),n.isRawShaderMaterial!==!0&&(O=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",n.glslVersion===Dv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Dv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const I=O+M+u,A=O+S+h,P=E_(o,o.VERTEX_SHADER,I),R=E_(o,o.FRAGMENT_SHADER,A);o.attachShader(D,P),o.attachShader(D,R),n.index0AttributeName!==void 0?o.bindAttribLocation(D,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(D,0,"position"),o.linkProgram(D);function L(H){if(r.debug.checkShaderErrors){const q=o.getProgramInfoLog(D)||"",K=o.getShaderInfoLog(P)||"",G=o.getShaderInfoLog(R)||"",J=q.trim(),B=K.trim(),X=G.trim();let nt=!0,it=!0;if(o.getProgramParameter(D,o.LINK_STATUS)===!1)if(nt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,D,P,R);else{const ot=T_(o,P,"vertex"),U=T_(o,R,"fragment");Ne("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(D,o.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+J+`
`+ot+`
`+U)}else J!==""?de("WebGLProgram: Program Info Log:",J):(B===""||X==="")&&(it=!1);it&&(H.diagnostics={runnable:nt,programLog:J,vertexShader:{log:B,prefix:M},fragmentShader:{log:X,prefix:S}})}o.deleteShader(P),o.deleteShader(R),E=new cu(o,D),N=m2(o,D)}let E;this.getUniforms=function(){return E===void 0&&L(this),E};let N;this.getAttributes=function(){return N===void 0&&L(this),N};let F=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=o.getProgramParameter(D,s2)),F},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(D),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=r2++,this.cacheKey=t,this.usedTimes=1,this.program=D,this.vertexShader=P,this.fragmentShader=R,this}let U2=0;class L2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new N2(t),n.set(t,a)),a}}class N2{constructor(t){this.id=U2++,this.code=t,this.usedTimes=0}}function O2(r){return r===zs||r===fu||r===hu}function P2(r,t,n,a,o,c){const u=new Mp,h=new L2,m=new Set,p=[],v=new Map,_=a.logarithmicDepthBuffer;let g=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(E){return m.add(E),E===0?"uv":`uv${E}`}function D(E,N,F,H,q,K){const G=H.fog,J=q.geometry,B=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?H.environment:null,X=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,nt=t.get(E.envMap||B,X),it=nt&&nt.mapping===Su?nt.image.height:null,ot=x[E.type];E.precision!==null&&(g=a.getMaxPrecision(E.precision),g!==E.precision&&de("WebGLProgram.getParameters:",E.precision,"not supported, using",g,"instead."));const U=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,j=U!==void 0?U.length:0;let dt=0;J.morphAttributes.position!==void 0&&(dt=1),J.morphAttributes.normal!==void 0&&(dt=2),J.morphAttributes.color!==void 0&&(dt=3);let Rt,Pt,qt,at;if(ot){const We=Ki[ot];Rt=We.vertexShader,Pt=We.fragmentShader}else{Rt=E.vertexShader,Pt=E.fragmentShader;const We=h.getVertexShaderStage(E),Oe=h.getFragmentShaderStage(E);h.update(E,We,Oe),qt=We.id,at=Oe.id}const gt=r.getRenderTarget(),Dt=r.state.buffers.depth.getReversed(),ie=q.isInstancedMesh===!0,kt=q.isBatchedMesh===!0,ue=!!E.map,Le=!!E.matcap,yt=!!nt,wt=!!E.aoMap,Ut=!!E.lightMap,Lt=!!E.bumpMap&&E.wireframe===!1,$=!!E.normalMap,xt=!!E.displacementMap,At=!!E.emissiveMap,Ct=!!E.metalnessMap,$t=!!E.roughnessMap,V=E.anisotropy>0,oe=E.clearcoat>0,le=E.dispersion>0,z=E.retroreflectivity>0,b=E.iridescence>0,tt=E.sheen>0,ut=E.transmission>0,vt=V&&!!E.anisotropyMap,Nt=oe&&!!E.clearcoatMap,Bt=oe&&!!E.clearcoatNormalMap,mt=oe&&!!E.clearcoatRoughnessMap,_t=b&&!!E.iridescenceMap,It=b&&!!E.iridescenceThicknessMap,Jt=tt&&!!E.sheenColorMap,Vt=tt&&!!E.sheenRoughnessMap,Ht=!!E.specularMap,re=!!E.specularColorMap,ce=!!E.specularIntensityMap,pe=ut&&!!E.transmissionMap,Q=ut&&!!E.thicknessMap,zt=!!E.gradientMap,Mt=!!E.alphaMap,Ft=E.alphaTest>0,Yt=!!E.alphaHash,Tt=!!E.extensions;let se=Qi;E.toneMapped&&(gt===null||gt.isXRRenderTarget===!0)&&(se=r.toneMapping);const te={shaderID:ot,shaderType:E.type,shaderName:E.name,vertexShader:Rt,fragmentShader:Pt,defines:E.defines,customVertexShaderID:qt,customFragmentShaderID:at,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:g,batching:kt,batchingColor:kt&&q._colorsTexture!==null,instancing:ie,instancingColor:ie&&q.instanceColor!==null,instancingMorph:ie&&q.morphTexture!==null,outputColorSpace:gt===null?r.outputColorSpace:gt.isXRRenderTarget===!0?gt.texture.colorSpace:Ue.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:ue,matcap:Le,envMap:yt,envMapMode:yt&&nt.mapping,envMapCubeUVHeight:it,aoMap:wt,lightMap:Ut,bumpMap:Lt,normalMap:$,displacementMap:xt,emissiveMap:At,normalMapObjectSpace:$&&E.normalMapType===_M,normalMapTangentSpace:$&&E.normalMapType===du,packedNormalMap:$&&E.normalMapType===du&&O2(E.normalMap.format),metalnessMap:Ct,roughnessMap:$t,anisotropy:V,anisotropyMap:vt,clearcoat:oe,clearcoatMap:Nt,clearcoatNormalMap:Bt,clearcoatRoughnessMap:mt,dispersion:le,retroreflection:z,iridescence:b,iridescenceMap:_t,iridescenceThicknessMap:It,sheen:tt,sheenColorMap:Jt,sheenRoughnessMap:Vt,specularMap:Ht,specularColorMap:re,specularIntensityMap:ce,transmission:ut,transmissionMap:pe,thicknessMap:Q,gradientMap:zt,opaque:E.transparent===!1&&E.blending===al&&E.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Ft,alphaHash:Yt,combine:E.combine,mapUv:ue&&T(E.map.channel),aoMapUv:wt&&T(E.aoMap.channel),lightMapUv:Ut&&T(E.lightMap.channel),bumpMapUv:Lt&&T(E.bumpMap.channel),normalMapUv:$&&T(E.normalMap.channel),displacementMapUv:xt&&T(E.displacementMap.channel),emissiveMapUv:At&&T(E.emissiveMap.channel),metalnessMapUv:Ct&&T(E.metalnessMap.channel),roughnessMapUv:$t&&T(E.roughnessMap.channel),anisotropyMapUv:vt&&T(E.anisotropyMap.channel),clearcoatMapUv:Nt&&T(E.clearcoatMap.channel),clearcoatNormalMapUv:Bt&&T(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&T(E.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&T(E.iridescenceMap.channel),iridescenceThicknessMapUv:It&&T(E.iridescenceThicknessMap.channel),sheenColorMapUv:Jt&&T(E.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&T(E.sheenRoughnessMap.channel),specularMapUv:Ht&&T(E.specularMap.channel),specularColorMapUv:re&&T(E.specularColorMap.channel),specularIntensityMapUv:ce&&T(E.specularIntensityMap.channel),transmissionMapUv:pe&&T(E.transmissionMap.channel),thicknessMapUv:Q&&T(E.thicknessMap.channel),alphaMapUv:Mt&&T(E.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&($||V),vertexNormals:!!J.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!J.attributes.uv&&(ue||Mt),fog:!!G,useFog:E.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||J.attributes.normal===void 0&&$===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Dt,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:J.attributes.position!==void 0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:dt,numSunLights:N.sun.length,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numSunLightShadows:N.sunShadowMap.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:K.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:se,decodeVideoTexture:ue&&E.map.isVideoTexture===!0&&Ue.getTransfer(E.map.colorSpace)===Xe,decodeVideoTextureEmissive:At&&E.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(E.emissiveMap.colorSpace)===Xe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===wi,flipSided:E.side===Wn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Tt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Tt&&E.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return te.vertexUv1s=m.has(1),te.vertexUv2s=m.has(2),te.vertexUv3s=m.has(3),m.clear(),te}function M(E){const N=[];if(E.shaderID?N.push(E.shaderID):(N.push(E.customVertexShaderID),N.push(E.customFragmentShaderID)),E.defines!==void 0)for(const F in E.defines)N.push(F),N.push(E.defines[F]);return E.isRawShaderMaterial===!1&&(S(N,E),O(N,E),N.push(r.outputColorSpace)),N.push(E.customProgramCacheKey),N.join()}function S(E,N){E.push(N.precision),E.push(N.outputColorSpace),E.push(N.envMapMode),E.push(N.envMapCubeUVHeight),E.push(N.mapUv),E.push(N.alphaMapUv),E.push(N.lightMapUv),E.push(N.aoMapUv),E.push(N.bumpMapUv),E.push(N.normalMapUv),E.push(N.displacementMapUv),E.push(N.emissiveMapUv),E.push(N.metalnessMapUv),E.push(N.roughnessMapUv),E.push(N.anisotropyMapUv),E.push(N.clearcoatMapUv),E.push(N.clearcoatNormalMapUv),E.push(N.clearcoatRoughnessMapUv),E.push(N.iridescenceMapUv),E.push(N.iridescenceThicknessMapUv),E.push(N.sheenColorMapUv),E.push(N.sheenRoughnessMapUv),E.push(N.specularMapUv),E.push(N.specularColorMapUv),E.push(N.specularIntensityMapUv),E.push(N.transmissionMapUv),E.push(N.thicknessMapUv),E.push(N.combine),E.push(N.fogExp2),E.push(N.sizeAttenuation),E.push(N.morphTargetsCount),E.push(N.morphAttributeCount),E.push(N.numSunLights),E.push(N.numDirLights),E.push(N.numPointLights),E.push(N.numSpotLights),E.push(N.numSpotLightMaps),E.push(N.numHemiLights),E.push(N.numRectAreaLights),E.push(N.numSunLightShadows),E.push(N.numDirLightShadows),E.push(N.numPointLightShadows),E.push(N.numSpotLightShadows),E.push(N.numSpotLightShadowsWithMaps),E.push(N.numLightProbes),E.push(N.shadowMapType),E.push(N.toneMapping),E.push(N.numClippingPlanes),E.push(N.numClipIntersection),E.push(N.depthPacking)}function O(E,N){u.disableAll(),N.instancing&&u.enable(0),N.instancingColor&&u.enable(1),N.instancingMorph&&u.enable(2),N.matcap&&u.enable(3),N.envMap&&u.enable(4),N.normalMapObjectSpace&&u.enable(5),N.normalMapTangentSpace&&u.enable(6),N.clearcoat&&u.enable(7),N.iridescence&&u.enable(8),N.alphaTest&&u.enable(9),N.vertexColors&&u.enable(10),N.vertexAlphas&&u.enable(11),N.vertexUv1s&&u.enable(12),N.vertexUv2s&&u.enable(13),N.vertexUv3s&&u.enable(14),N.vertexTangents&&u.enable(15),N.anisotropy&&u.enable(16),N.alphaHash&&u.enable(17),N.batching&&u.enable(18),N.dispersion&&u.enable(19),N.retroreflection&&u.enable(24),N.batchingColor&&u.enable(20),N.gradientMap&&u.enable(21),N.packedNormalMap&&u.enable(22),N.vertexNormals&&u.enable(23),E.push(u.mask),u.disableAll(),N.fog&&u.enable(0),N.useFog&&u.enable(1),N.flatShading&&u.enable(2),N.logarithmicDepthBuffer&&u.enable(3),N.reversedDepthBuffer&&u.enable(4),N.skinning&&u.enable(5),N.morphTargets&&u.enable(6),N.morphNormals&&u.enable(7),N.morphColors&&u.enable(8),N.premultipliedAlpha&&u.enable(9),N.shadowMapEnabled&&u.enable(10),N.doubleSided&&u.enable(11),N.flipSided&&u.enable(12),N.useDepthPacking&&u.enable(13),N.dithering&&u.enable(14),N.transmission&&u.enable(15),N.sheen&&u.enable(16),N.opaque&&u.enable(17),N.pointsUvs&&u.enable(18),N.decodeVideoTexture&&u.enable(19),N.decodeVideoTextureEmissive&&u.enable(20),N.alphaToCoverage&&u.enable(21),N.numLightProbeGrids>0&&u.enable(22),N.hasPositionAttribute&&u.enable(23),E.push(u.mask)}function I(E){const N=x[E.type];let F;if(N){const H=Ki[N];F=Sx.clone(H.uniforms)}else F=E.uniforms;return F}function A(E,N){let F=v.get(N);return F!==void 0?++F.usedTimes:(F=new D2(r,N,E,o),p.push(F),v.set(N,F)),F}function P(E){if(--E.usedTimes===0){const N=p.indexOf(E);p[N]=p[p.length-1],p.pop(),v.delete(E.cacheKey),E.destroy()}}function R(E){h.remove(E)}function L(){h.dispose()}return{getParameters:D,getProgramCacheKey:M,getUniforms:I,acquireProgram:A,releaseProgram:P,releaseShaderCache:R,programs:p,dispose:L}}function I2(){let r=new WeakMap;function t(u){return r.has(u)}function n(u){let h=r.get(u);return h===void 0&&(h={},r.set(u,h)),h}function a(u){r.delete(u)}function o(u,h,m){r.get(u)[h]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:c}}function z2(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function D_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function U_(){const r=[];let t=0;const n=[],a=[],o=[];function c(){t=0,n.length=0,a.length=0,o.length=0}function u(g){let x=0;return g.isInstancedMesh&&(x+=2),g.isSkinnedMesh&&(x+=1),x}function h(g,x,T,D,M,S){let O=r[t];return O===void 0?(O={id:g.id,object:g,geometry:x,material:T,materialVariant:u(g),groupOrder:D,renderOrder:g.renderOrder,z:M,group:S},r[t]=O):(O.id=g.id,O.object=g,O.geometry=x,O.material=T,O.materialVariant=u(g),O.groupOrder=D,O.renderOrder=g.renderOrder,O.z=M,O.group=S),t++,O}function m(g,x,T,D,M,S,O){O.reversedDepth===!0&&(M=-M);const I=h(g,x,T,D,M,S);T.transmission>0?a.push(I):T.transparent===!0?o.push(I):n.push(I)}function p(g,x,T,D,M,S){const O=h(g,x,T,D,M,S);T.transmission>0?a.unshift(O):T.transparent===!0?o.unshift(O):n.unshift(O)}function v(g,x){n.length>1&&n.sort(g||z2),a.length>1&&a.sort(x||D_),o.length>1&&o.sort(x||D_)}function _(){for(let g=t,x=r.length;g<x;g++){const T=r[g];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:m,unshift:p,finish:_,sort:v}}function B2(){let r=new WeakMap;function t(a,o){const c=r.get(a);let u;return c===void 0?(u=new U_,r.set(a,[u])):o>=c.length?(u=new U_,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:t,dispose:n}}function F2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new W,color:new ve};break;case"SpotLight":n={position:new W,direction:new W,color:new ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new W,color:new ve,distance:0,decay:0};break;case"HemisphereLight":n={direction:new W,skyColor:new ve,groundColor:new ve};break;case"RectAreaLight":n={color:new ve,position:new W,halfWidth:new W,halfHeight:new W};break}return r[t.id]=n,n}}}function H2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let G2=0;function V2(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function k2(r){const t=new F2,n=H2(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new W);const o=new W,c=new Ge,u=new Ge;function h(p){let v=0,_=0,g=0;for(let q=0;q<9;q++)a.probe[q].set(0,0,0);let x=0,T=0,D=0,M=0,S=0,O=0,I=0,A=0,P=0,R=0,L=0,E=0,N=0,F=0;p.sort(V2);for(let q=0,K=p.length;q<K;q++){const G=p[q],J=G.color,B=G.intensity,X=G.distance;let nt=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===zs?nt=G.shadow.map.texture:nt=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)v+=J.r*B,_+=J.g*B,g+=J.b*B;else if(G.isLightProbe){for(let it=0;it<9;it++)a.probe[it].addScaledVector(G.sh.coefficients[it],B);F++}else if(G.isSunLight){const it=t.get(G);if(it.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const ot=G.shadow,U=n.get(G);U.shadowIntensity=ot.intensity,U.shadowBias=ot.bias,U.shadowNormalBias=ot.normalBias,U.shadowRadius=ot.radius,U.shadowMapSize.copy(ot.mapSize).multiply(ot.getFrameExtents()),a.sunShadow[T]=U,a.sunShadowMap[T]=nt;const j=ot.getViewportCount();for(let dt=0;dt<j;dt++)a.sunShadowMatrix[D+dt]=ot.getMatrix(dt),a.sunShadowCascade[D+dt]=ot._cascadeData[dt];D+=j,T++}a.sun[x]=it,x++}else if(G.isDirectionalLight){const it=t.get(G);if(it.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const ot=G.shadow,U=n.get(G);U.shadowIntensity=ot.intensity,U.shadowBias=ot.bias,U.shadowNormalBias=ot.normalBias,U.shadowRadius=ot.radius,U.shadowMapSize=ot.mapSize,a.directionalShadow[M]=U,a.directionalShadowMap[M]=nt,a.directionalShadowMatrix[M]=G.shadow.matrix,P++}a.directional[M]=it,M++}else if(G.isSpotLight){const it=t.get(G);it.position.setFromMatrixPosition(G.matrixWorld),it.color.copy(J).multiplyScalar(B),it.distance=X,it.coneCos=Math.cos(G.angle),it.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),it.decay=G.decay,a.spot[O]=it;const ot=G.shadow;if(G.map&&(a.spotLightMap[E]=G.map,E++,ot.updateMatrices(G),G.castShadow&&N++),a.spotLightMatrix[O]=ot.matrix,G.castShadow){const U=n.get(G);U.shadowIntensity=ot.intensity,U.shadowBias=ot.bias,U.shadowNormalBias=ot.normalBias,U.shadowRadius=ot.radius,U.shadowMapSize=ot.mapSize,a.spotShadow[O]=U,a.spotShadowMap[O]=nt,L++}O++}else if(G.isRectAreaLight){const it=t.get(G);it.color.copy(J).multiplyScalar(B),it.halfWidth.set(G.width*.5,0,0),it.halfHeight.set(0,G.height*.5,0),a.rectArea[I]=it,I++}else if(G.isPointLight){const it=t.get(G);if(it.color.copy(G.color).multiplyScalar(G.intensity),it.distance=G.distance,it.decay=G.decay,G.castShadow){const ot=G.shadow,U=n.get(G);U.shadowIntensity=ot.intensity,U.shadowBias=ot.bias,U.shadowNormalBias=ot.normalBias,U.shadowRadius=ot.radius,U.shadowMapSize=ot.mapSize,U.shadowCameraNear=ot.camera.near,U.shadowCameraFar=ot.camera.far,a.pointShadow[S]=U,a.pointShadowMap[S]=nt,a.pointShadowMatrix[S]=G.shadow.matrix,R++}a.point[S]=it,S++}else if(G.isHemisphereLight){const it=t.get(G);it.skyColor.copy(G.color).multiplyScalar(B),it.groundColor.copy(G.groundColor).multiplyScalar(B),a.hemi[A]=it,A++}}I>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Wt.LTC_FLOAT_1,a.rectAreaLTC2=Wt.LTC_FLOAT_2):(a.rectAreaLTC1=Wt.LTC_HALF_1,a.rectAreaLTC2=Wt.LTC_HALF_2)),a.ambient[0]=v,a.ambient[1]=_,a.ambient[2]=g;const H=a.hash;(H.sunLength!==x||H.directionalLength!==M||H.pointLength!==S||H.spotLength!==O||H.rectAreaLength!==I||H.hemiLength!==A||H.numSunShadows!==T||H.numDirectionalShadows!==P||H.numPointShadows!==R||H.numSpotShadows!==L||H.numSpotMaps!==E||H.numLightProbes!==F)&&(a.sun.length=x,a.directional.length=M,a.spot.length=O,a.rectArea.length=I,a.point.length=S,a.hemi.length=A,a.sunShadow.length=T,a.sunShadowMap.length=T,a.sunShadowMatrix.length=D,a.sunShadowCascade.length=D,a.directionalShadow.length=P,a.directionalShadowMap.length=P,a.directionalShadowMatrix.length=P,a.pointShadow.length=R,a.pointShadowMap.length=R,a.pointShadowMatrix.length=R,a.spotShadow.length=L,a.spotShadowMap.length=L,a.spotLightMatrix.length=L+E-N,a.spotLightMap.length=E,a.numSpotLightShadowsWithMaps=N,a.numLightProbes=F,H.sunLength=x,H.directionalLength=M,H.pointLength=S,H.spotLength=O,H.rectAreaLength=I,H.hemiLength=A,H.numSunShadows=T,H.numDirectionalShadows=P,H.numPointShadows=R,H.numSpotShadows=L,H.numSpotMaps=E,H.numLightProbes=F,a.version=G2++)}function m(p,v){let _=0,g=0,x=0,T=0,D=0,M=0;const S=v.matrixWorldInverse;for(let O=0,I=p.length;O<I;O++){const A=p[O];if(A.isSunLight){const P=a.sun[_];P.direction.setFromMatrixPosition(A.matrixWorld),P.direction.transformDirection(S),_++}else if(A.isDirectionalLight){const P=a.directional[g];P.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),P.direction.sub(o),P.direction.transformDirection(S),g++}else if(A.isSpotLight){const P=a.spot[T];P.position.setFromMatrixPosition(A.matrixWorld),P.position.applyMatrix4(S),P.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),P.direction.sub(o),P.direction.transformDirection(S),T++}else if(A.isRectAreaLight){const P=a.rectArea[D];P.position.setFromMatrixPosition(A.matrixWorld),P.position.applyMatrix4(S),u.identity(),c.copy(A.matrixWorld),c.premultiply(S),u.extractRotation(c),P.halfWidth.set(A.width*.5,0,0),P.halfHeight.set(0,A.height*.5,0),P.halfWidth.applyMatrix4(u),P.halfHeight.applyMatrix4(u),D++}else if(A.isPointLight){const P=a.point[x];P.position.setFromMatrixPosition(A.matrixWorld),P.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const P=a.hemi[M];P.direction.setFromMatrixPosition(A.matrixWorld),P.direction.transformDirection(S),M++}}}return{setup:h,setupView:m,state:a}}function L_(r){const t=new k2(r),n=[],a=[],o=[];function c(g){_.camera=g,n.length=0,a.length=0,o.length=0}function u(g){n.push(g)}function h(g){a.push(g)}function m(g){o.push(g)}function p(){t.setup(n)}function v(g){t.setupView(n,g)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:p,setupLightsView:v,pushLight:u,pushShadow:h,pushLightProbeGrid:m}}function X2(r){let t=new WeakMap;function n(o,c=0){const u=t.get(o);let h;return u===void 0?(h=new L_(r),t.set(o,[h])):c>=u.length?(h=new L_(r),u.push(h)):h=u[c],h}function a(){t=new WeakMap}return{get:n,dispose:a}}const W2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q2=`uniform sampler2D shadow_pass;
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
}`,Y2=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Z2=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],N_=new Ge,$o=new W,md=new W;function K2(r,t,n){let a=new Tp;const o=new Ot,c=new Ot,u=new en,h=new tE,m=new eE,p={},v=n.maxTextureSize,_={[Ps]:Wn,[Wn]:Ps,[wi]:wi},g=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:W2,fragmentShader:q2}),x=g.clone();x.defines.HORIZONTAL_PASS=1;const T=new Nn;T.setAttribute("position",new ji(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new ln(T,g),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=au;let S=this.type;this.render=function(R,L,E){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||R.length===0)return;this.type===z_&&(de("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=au);const N=r.getRenderTarget(),F=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),q=r.state;q.setBlending(wa),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const K=S!==this.type;K&&L.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(J=>J.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,J=R.length;G<J;G++){const B=R[G],X=B.shadow;if(X===void 0){de("WebGLShadowMap:",B,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;o.copy(X.mapSize);const nt=X.getFrameExtents();o.multiply(nt),c.copy(X.mapSize),(o.x>v||o.y>v)&&(o.x>v&&(c.x=Math.floor(v/nt.x),o.x=c.x*nt.x,X.mapSize.x=c.x),o.y>v&&(c.y=Math.floor(v/nt.y),o.y=c.y*nt.y,X.mapSize.y=c.y));const it=r.state.buffers.depth.getReversed();if(X.camera._reversedDepth=it,X.map===null||K===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===tl){if(B.isPointLight){de("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new mi(o.x,o.y,{format:zs,type:Ri,minFilter:zn,magFilter:zn,generateMipmaps:!1}),X.map.texture.name=B.name+".shadowMap",X.map.depthTexture=new pl(o.x,o.y,Fi),X.map.depthTexture.name=B.name+".shadowMapDepth",X.map.depthTexture.format=Ca,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Ln,X.map.depthTexture.magFilter=Ln}else B.isPointLight?(X.map=new bx(o.x),X.map.depthTexture=new v1(o.x,$i)):(X.map=new mi(o.x,o.y),X.map.depthTexture=new pl(o.x,o.y,$i)),X.map.depthTexture.name=B.name+".shadowMap",X.map.depthTexture.format=Ca,this.type===au?(X.map.depthTexture.compareFunction=it?xp:_p,X.map.depthTexture.minFilter=zn,X.map.depthTexture.magFilter=zn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Ln,X.map.depthTexture.magFilter=Ln);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==o.x||X.map.height!==o.y)&&X.map.setSize(o.x,o.y);const ot=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();B.isPointLight!==!0&&X.updateMatrices(B,E);for(let U=0;U<ot;U++){const j=X.getCamera(U);if(B.isPointLight){const dt=X.camera,Rt=X.matrix,Pt=B.distance||dt.far;Pt!==dt.far&&(dt.far=Pt,dt.updateProjectionMatrix()),$o.setFromMatrixPosition(B.matrixWorld),dt.position.copy($o),md.copy(dt.position),md.add(Y2[U]),dt.up.copy(Z2[U]),dt.lookAt(md),dt.updateMatrixWorld(),Rt.makeTranslation(-$o.x,-$o.y,-$o.z),N_.multiplyMatrices(dt.projectionMatrix,dt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(N_,dt.coordinateSystem,dt.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)r.setRenderTarget(X.map,U),r.clear();else{U===0&&(r.setRenderTarget(X.map),r.clear());const dt=X.getViewport(U);u.set(c.x*dt.x,c.y*dt.y,c.x*dt.z,c.y*dt.w),q.viewport(u)}a=X.getFrustum(U),A(L,E,j,B,this.type)}X.isPointLightShadow!==!0&&this.type===tl&&O(X,E),X.needsUpdate=!1}S=this.type,M.needsUpdate=!1,r.setRenderTarget(N,F,H)};function O(R,L){const E=t.update(D);g.defines.VSM_SAMPLES!==R.blurSamples&&(g.defines.VSM_SAMPLES=R.blurSamples,x.defines.VSM_SAMPLES=R.blurSamples,g.needsUpdate=!0,x.needsUpdate=!0),R.mapPass===null?R.mapPass=new mi(o.x,o.y,{format:zs,type:Ri}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),g.uniforms.shadow_pass.value=R.map.depthTexture,g.uniforms.resolution.value.set(R.map.width,R.map.height),g.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(L,null,E,g,D,null),x.uniforms.shadow_pass.value=R.mapPass.texture,x.uniforms.resolution.value.set(R.map.width,R.map.height),x.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(L,null,E,x,D,null)}function I(R,L,E,N){let F=null;const H=E.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(H!==void 0)F=H;else if(F=E.isPointLight===!0?m:h,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const q=F.uuid,K=L.uuid;let G=p[q];G===void 0&&(G={},p[q]=G);let J=G[K];J===void 0&&(J=F.clone(),G[K]=J,L.addEventListener("dispose",P)),F=J}if(F.visible=L.visible,F.wireframe=L.wireframe,N===tl?F.side=L.shadowSide!==null?L.shadowSide:L.side:F.side=L.shadowSide!==null?L.shadowSide:_[L.side],F.alphaMap=L.alphaMap,F.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,F.map=L.map,F.clipShadows=L.clipShadows,F.clippingPlanes=L.clippingPlanes,F.clipIntersection=L.clipIntersection,F.displacementMap=L.displacementMap,F.displacementScale=L.displacementScale,F.displacementBias=L.displacementBias,F.wireframeLinewidth=L.wireframeLinewidth,F.linewidth=L.linewidth,E.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const q=r.properties.get(F);q.light=E}return F}function A(R,L,E,N,F){if(R.visible===!1)return;if(R.layers.test(L.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&F===tl)&&(!R.frustumCulled||R.intersectsFrustum(a))){R.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,R.matrixWorld);const K=t.update(R),G=R.material;if(Array.isArray(G)){const J=K.groups;for(let B=0,X=J.length;B<X;B++){const nt=J[B],it=G[nt.materialIndex];if(it&&it.visible){const ot=I(R,it,N,F);R.onBeforeShadow(r,R,L,E,K,ot,nt),r.renderBufferDirect(E,null,K,ot,R,nt),R.onAfterShadow(r,R,L,E,K,ot,nt)}}}else if(G.visible){const J=I(R,G,N,F);R.onBeforeShadow(r,R,L,E,K,J,null),r.renderBufferDirect(E,null,K,J,R,null),R.onAfterShadow(r,R,L,E,K,J,null)}}const q=R.children;for(let K=0,G=q.length;K<G;K++)A(q[K],L,E,N,F)}function P(R){R.target.removeEventListener("dispose",P);for(const E in p){const N=p[E],F=R.target.uuid;F in N&&(N[F].dispose(),delete N[F])}}}function J2(r,t){function n(){let Q=!1;const zt=new en;let Mt=null;const Ft=new en(0,0,0,0);return{setMask:function(Yt){Mt!==Yt&&!Q&&(r.colorMask(Yt,Yt,Yt,Yt),Mt=Yt)},setLocked:function(Yt){Q=Yt},setClear:function(Yt,Tt,se,te,We){We===!0&&(Yt*=te,Tt*=te,se*=te),zt.set(Yt,Tt,se,te),Ft.equals(zt)===!1&&(r.clearColor(Yt,Tt,se,te),Ft.copy(zt))},reset:function(){Q=!1,Mt=null,Ft.set(-1,0,0,0)}}}function a(){let Q=!1,zt=!1,Mt=null,Ft=null,Yt=null;return{setReversed:function(Tt){if(zt!==Tt){const se=t.get("EXT_clip_control");Tt?se.clipControlEXT(se.LOWER_LEFT_EXT,se.ZERO_TO_ONE_EXT):se.clipControlEXT(se.LOWER_LEFT_EXT,se.NEGATIVE_ONE_TO_ONE_EXT),zt=Tt;const te=Yt;Yt=null,this.setClear(te)}},getReversed:function(){return zt},setTest:function(Tt){Tt?gt(r.DEPTH_TEST):Dt(r.DEPTH_TEST)},setMask:function(Tt){Mt!==Tt&&!Q&&(r.depthMask(Tt),Mt=Tt)},setFunc:function(Tt){if(zt&&(Tt=DM[Tt]),Ft!==Tt){switch(Tt){case gd:r.depthFunc(r.NEVER);break;case vd:r.depthFunc(r.ALWAYS);break;case _d:r.depthFunc(r.LESS);break;case ul:r.depthFunc(r.LEQUAL);break;case xd:r.depthFunc(r.EQUAL);break;case Sd:r.depthFunc(r.GEQUAL);break;case yd:r.depthFunc(r.GREATER);break;case Md:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ft=Tt}},setLocked:function(Tt){Q=Tt},setClear:function(Tt){Yt!==Tt&&(Yt=Tt,zt&&(Tt=1-Tt),r.clearDepth(Tt))},reset:function(){Q=!1,Mt=null,Ft=null,Yt=null,zt=!1}}}function o(){let Q=!1,zt=null,Mt=null,Ft=null,Yt=null,Tt=null,se=null,te=null,We=null;return{setTest:function(Oe){Q||(Oe?gt(r.STENCIL_TEST):Dt(r.STENCIL_TEST))},setMask:function(Oe){zt!==Oe&&!Q&&(r.stencilMask(Oe),zt=Oe)},setFunc:function(Oe,qn,ii){(Mt!==Oe||Ft!==qn||Yt!==ii)&&(r.stencilFunc(Oe,qn,ii),Mt=Oe,Ft=qn,Yt=ii)},setOp:function(Oe,qn,ii){(Tt!==Oe||se!==qn||te!==ii)&&(r.stencilOp(Oe,qn,ii),Tt=Oe,se=qn,te=ii)},setLocked:function(Oe){Q=Oe},setClear:function(Oe){We!==Oe&&(r.clearStencil(Oe),We=Oe)},reset:function(){Q=!1,zt=null,Mt=null,Ft=null,Yt=null,Tt=null,se=null,te=null,We=null}}}const c=new n,u=new a,h=new o,m=new WeakMap,p=new WeakMap;let v={},_={},g={},x=new WeakMap,T=[],D=null,M=!1,S=null,O=null,I=null,A=null,P=null,R=null,L=null,E=new ve(0,0,0),N=0,F=!1,H=null,q=null,K=null,G=null,J=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,nt=0;const it=r.getParameter(r.VERSION);it.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(it)[1]),X=nt>=1):it.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),X=nt>=2);let ot=null,U={};const j=r.getParameter(r.SCISSOR_BOX),dt=r.getParameter(r.VIEWPORT),Rt=new en().fromArray(j),Pt=new en().fromArray(dt);function qt(Q,zt,Mt,Ft){const Yt=new Uint8Array(4),Tt=r.createTexture();r.bindTexture(Q,Tt),r.texParameteri(Q,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Q,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let se=0;se<Mt;se++)Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?r.texImage3D(zt,0,r.RGBA,1,1,Ft,0,r.RGBA,r.UNSIGNED_BYTE,Yt):r.texImage2D(zt+se,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Yt);return Tt}const at={};at[r.TEXTURE_2D]=qt(r.TEXTURE_2D,r.TEXTURE_2D,1),at[r.TEXTURE_CUBE_MAP]=qt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[r.TEXTURE_2D_ARRAY]=qt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),at[r.TEXTURE_3D]=qt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),h.setClear(0),gt(r.DEPTH_TEST),u.setFunc(ul),Lt(!1),$(Av),gt(r.CULL_FACE),wt(wa);function gt(Q){v[Q]!==!0&&(r.enable(Q),v[Q]=!0)}function Dt(Q){v[Q]!==!1&&(r.disable(Q),v[Q]=!1)}function ie(Q,zt){return g[Q]!==zt?(r.bindFramebuffer(Q,zt),g[Q]=zt,Q===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=zt),Q===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=zt),!0):!1}function kt(Q,zt){let Mt=T,Ft=!1;if(Q){Mt=x.get(zt),Mt===void 0&&(Mt=[],x.set(zt,Mt));const Yt=Q.textures;if(Mt.length!==Yt.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let Tt=0,se=Yt.length;Tt<se;Tt++)Mt[Tt]=r.COLOR_ATTACHMENT0+Tt;Mt.length=Yt.length,Ft=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Ft=!0);Ft&&r.drawBuffers(Mt)}function ue(Q){return D!==Q?(r.useProgram(Q),D=Q,!0):!1}const Le={[zr]:r.FUNC_ADD,[Qy]:r.FUNC_SUBTRACT,[jy]:r.FUNC_REVERSE_SUBTRACT};Le[$y]=r.MIN,Le[tM]=r.MAX;const yt={[eM]:r.ZERO,[nM]:r.ONE,[iM]:r.SRC_COLOR,[B_]:r.SRC_ALPHA,[cM]:r.SRC_ALPHA_SATURATE,[oM]:r.DST_COLOR,[sM]:r.DST_ALPHA,[aM]:r.ONE_MINUS_SRC_COLOR,[F_]:r.ONE_MINUS_SRC_ALPHA,[lM]:r.ONE_MINUS_DST_COLOR,[rM]:r.ONE_MINUS_DST_ALPHA,[uM]:r.CONSTANT_COLOR,[fM]:r.ONE_MINUS_CONSTANT_COLOR,[hM]:r.CONSTANT_ALPHA,[dM]:r.ONE_MINUS_CONSTANT_ALPHA};function wt(Q,zt,Mt,Ft,Yt,Tt,se,te,We,Oe){if(Q===wa){M===!0&&(Dt(r.BLEND),M=!1);return}if(M===!1&&(gt(r.BLEND),M=!0),Q!==Jy){if(Q!==S||Oe!==F){if((O!==zr||P!==zr)&&(r.blendEquation(r.FUNC_ADD),O=zr,P=zr),Oe)switch(Q){case al:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wv:r.blendFunc(r.ONE,r.ONE);break;case Rv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Cv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ne("WebGLState: Invalid blending: ",Q);break}else switch(Q){case al:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wv:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Rv:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cv:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",Q);break}I=null,A=null,R=null,L=null,E.set(0,0,0),N=0,S=Q,F=Oe}return}Yt=Yt||zt,Tt=Tt||Mt,se=se||Ft,(zt!==O||Yt!==P)&&(r.blendEquationSeparate(Le[zt],Le[Yt]),O=zt,P=Yt),(Mt!==I||Ft!==A||Tt!==R||se!==L)&&(r.blendFuncSeparate(yt[Mt],yt[Ft],yt[Tt],yt[se]),I=Mt,A=Ft,R=Tt,L=se),(te.equals(E)===!1||We!==N)&&(r.blendColor(te.r,te.g,te.b,We),E.copy(te),N=We),S=Q,F=!1}function Ut(Q,zt){Q.side===wi?Dt(r.CULL_FACE):gt(r.CULL_FACE);let Mt=Q.side===Wn;zt&&(Mt=!Mt),Lt(Mt),Q.blending===al&&Q.transparent===!1?wt(wa):wt(Q.blending,Q.blendEquation,Q.blendSrc,Q.blendDst,Q.blendEquationAlpha,Q.blendSrcAlpha,Q.blendDstAlpha,Q.blendColor,Q.blendAlpha,Q.premultipliedAlpha),u.setFunc(Q.depthFunc),u.setTest(Q.depthTest),u.setMask(Q.depthWrite),c.setMask(Q.colorWrite);const Ft=Q.stencilWrite;h.setTest(Ft),Ft&&(h.setMask(Q.stencilWriteMask),h.setFunc(Q.stencilFunc,Q.stencilRef,Q.stencilFuncMask),h.setOp(Q.stencilFail,Q.stencilZFail,Q.stencilZPass)),At(Q.polygonOffset,Q.polygonOffsetFactor,Q.polygonOffsetUnits),Q.alphaToCoverage===!0?gt(r.SAMPLE_ALPHA_TO_COVERAGE):Dt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(Q){H!==Q&&(Q?r.frontFace(r.CW):r.frontFace(r.CCW),H=Q)}function $(Q){Q!==Zy?(gt(r.CULL_FACE),Q!==q&&(Q===Av?r.cullFace(r.BACK):Q===Ky?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Dt(r.CULL_FACE),q=Q}function xt(Q){Q!==K&&(X&&r.lineWidth(Q),K=Q)}function At(Q,zt,Mt){Q?(gt(r.POLYGON_OFFSET_FILL),(G!==zt||J!==Mt)&&(G=zt,J=Mt,u.getReversed()&&(zt=-zt),r.polygonOffset(zt,Mt))):Dt(r.POLYGON_OFFSET_FILL)}function Ct(Q){Q?gt(r.SCISSOR_TEST):Dt(r.SCISSOR_TEST)}function $t(Q){Q===void 0&&(Q=r.TEXTURE0+B-1),ot!==Q&&(r.activeTexture(Q),ot=Q)}function V(Q,zt,Mt){Mt===void 0&&(ot===null?Mt=r.TEXTURE0+B-1:Mt=ot);let Ft=U[Mt];Ft===void 0&&(Ft={type:void 0,texture:void 0},U[Mt]=Ft),(Ft.type!==Q||Ft.texture!==zt)&&(ot!==Mt&&(r.activeTexture(Mt),ot=Mt),r.bindTexture(Q,zt||at[Q]),Ft.type=Q,Ft.texture=zt)}function oe(){const Q=U[ot];Q!==void 0&&Q.type!==void 0&&(r.bindTexture(Q.type,null),Q.type=void 0,Q.texture=void 0)}function le(){try{r.compressedTexImage2D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function z(){try{r.compressedTexImage3D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function b(){try{r.texSubImage2D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function tt(){try{r.texSubImage3D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function ut(){try{r.compressedTexSubImage2D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function vt(){try{r.compressedTexSubImage3D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function Nt(){try{r.texStorage2D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function Bt(){try{r.texStorage3D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function mt(){try{r.texImage2D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function _t(){try{r.texImage3D(...arguments)}catch(Q){Ne("WebGLState:",Q)}}function It(Q){return _[Q]!==void 0?_[Q]:r.getParameter(Q)}function Jt(Q,zt){_[Q]!==zt&&(r.pixelStorei(Q,zt),_[Q]=zt)}function Vt(Q){Rt.equals(Q)===!1&&(r.scissor(Q.x,Q.y,Q.z,Q.w),Rt.copy(Q))}function Ht(Q){Pt.equals(Q)===!1&&(r.viewport(Q.x,Q.y,Q.z,Q.w),Pt.copy(Q))}function re(Q,zt){let Mt=p.get(zt);Mt===void 0&&(Mt=new WeakMap,p.set(zt,Mt));let Ft=Mt.get(Q);Ft===void 0&&(Ft=r.getUniformBlockIndex(zt,Q.name),Mt.set(Q,Ft))}function ce(Q,zt){const Ft=p.get(zt).get(Q);m.get(zt)!==Ft&&(r.uniformBlockBinding(zt,Ft,Q.__bindingPointIndex),m.set(zt,Ft))}function pe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},ot=null,U={},g={},x=new WeakMap,T=[],D=null,M=!1,S=null,O=null,I=null,A=null,P=null,R=null,L=null,E=new ve(0,0,0),N=0,F=!1,H=null,q=null,K=null,G=null,J=null,Rt.set(0,0,r.canvas.width,r.canvas.height),Pt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),h.reset()}return{buffers:{color:c,depth:u,stencil:h},enable:gt,disable:Dt,bindFramebuffer:ie,drawBuffers:kt,useProgram:ue,setBlending:wt,setMaterial:Ut,setFlipSided:Lt,setCullFace:$,setLineWidth:xt,setPolygonOffset:At,setScissorTest:Ct,activeTexture:$t,bindTexture:V,unbindTexture:oe,compressedTexImage2D:le,compressedTexImage3D:z,texImage2D:mt,texImage3D:_t,pixelStorei:Jt,getParameter:It,updateUBOMapping:re,uniformBlockBinding:ce,texStorage2D:Nt,texStorage3D:Bt,texSubImage2D:b,texSubImage3D:tt,compressedTexSubImage2D:ut,compressedTexSubImage3D:vt,scissor:Vt,viewport:Ht,reset:pe}}function Q2(r,t,n,a,o,c,u){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ot,v=new WeakMap,_=new Set;let g;const x=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(z,b){return T?new OffscreenCanvas(z,b):gu("canvas")}function M(z,b,tt){let ut=1;const vt=le(z);if((vt.width>tt||vt.height>tt)&&(ut=tt/Math.max(vt.width,vt.height)),ut<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const Nt=Math.floor(ut*vt.width),Bt=Math.floor(ut*vt.height);g===void 0&&(g=D(Nt,Bt));const mt=b?D(Nt,Bt):g;return mt.width=Nt,mt.height=Bt,mt.getContext("2d").drawImage(z,0,0,Nt,Bt),de("WebGLRenderer: Texture has been resized from ("+vt.width+"x"+vt.height+") to ("+Nt+"x"+Bt+")."),mt}else return"data"in z&&de("WebGLRenderer: Image in DataTexture is too big ("+vt.width+"x"+vt.height+")."),z;return z}function S(z){return z.generateMipmaps}function O(z){r.generateMipmap(z)}function I(z){return z.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?r.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(z,b,tt,ut,vt,Nt=!1){if(z!==null){if(r[z]!==void 0)return r[z];de("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let Bt;ut&&(Bt=t.get("EXT_texture_norm16"),Bt||de("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let mt=b;if(b===r.RED&&(tt===r.FLOAT&&(mt=r.R32F),tt===r.HALF_FLOAT&&(mt=r.R16F),tt===r.UNSIGNED_BYTE&&(mt=r.R8),tt===r.UNSIGNED_SHORT&&Bt&&(mt=Bt.R16_EXT),tt===r.SHORT&&Bt&&(mt=Bt.R16_SNORM_EXT)),b===r.RED_INTEGER&&(tt===r.UNSIGNED_BYTE&&(mt=r.R8UI),tt===r.UNSIGNED_SHORT&&(mt=r.R16UI),tt===r.UNSIGNED_INT&&(mt=r.R32UI),tt===r.BYTE&&(mt=r.R8I),tt===r.SHORT&&(mt=r.R16I),tt===r.INT&&(mt=r.R32I)),b===r.RG&&(tt===r.FLOAT&&(mt=r.RG32F),tt===r.HALF_FLOAT&&(mt=r.RG16F),tt===r.UNSIGNED_BYTE&&(mt=r.RG8),tt===r.UNSIGNED_SHORT&&Bt&&(mt=Bt.RG16_EXT),tt===r.SHORT&&Bt&&(mt=Bt.RG16_SNORM_EXT)),b===r.RG_INTEGER&&(tt===r.UNSIGNED_BYTE&&(mt=r.RG8UI),tt===r.UNSIGNED_SHORT&&(mt=r.RG16UI),tt===r.UNSIGNED_INT&&(mt=r.RG32UI),tt===r.BYTE&&(mt=r.RG8I),tt===r.SHORT&&(mt=r.RG16I),tt===r.INT&&(mt=r.RG32I)),b===r.RGB_INTEGER&&(tt===r.UNSIGNED_BYTE&&(mt=r.RGB8UI),tt===r.UNSIGNED_SHORT&&(mt=r.RGB16UI),tt===r.UNSIGNED_INT&&(mt=r.RGB32UI),tt===r.BYTE&&(mt=r.RGB8I),tt===r.SHORT&&(mt=r.RGB16I),tt===r.INT&&(mt=r.RGB32I)),b===r.RGBA_INTEGER&&(tt===r.UNSIGNED_BYTE&&(mt=r.RGBA8UI),tt===r.UNSIGNED_SHORT&&(mt=r.RGBA16UI),tt===r.UNSIGNED_INT&&(mt=r.RGBA32UI),tt===r.BYTE&&(mt=r.RGBA8I),tt===r.SHORT&&(mt=r.RGBA16I),tt===r.INT&&(mt=r.RGBA32I)),b===r.RGB&&(tt===r.UNSIGNED_SHORT&&Bt&&(mt=Bt.RGB16_EXT),tt===r.SHORT&&Bt&&(mt=Bt.RGB16_SNORM_EXT),tt===r.UNSIGNED_INT_5_9_9_9_REV&&(mt=r.RGB9_E5),tt===r.UNSIGNED_INT_10F_11F_11F_REV&&(mt=r.R11F_G11F_B10F)),b===r.RGBA){const _t=Nt?mu:Ue.getTransfer(vt);tt===r.FLOAT&&(mt=r.RGBA32F),tt===r.HALF_FLOAT&&(mt=r.RGBA16F),tt===r.UNSIGNED_BYTE&&(mt=_t===Xe?r.SRGB8_ALPHA8:r.RGBA8),tt===r.UNSIGNED_SHORT&&Bt&&(mt=Bt.RGBA16_EXT),tt===r.SHORT&&Bt&&(mt=Bt.RGBA16_SNORM_EXT),tt===r.UNSIGNED_SHORT_4_4_4_4&&(mt=r.RGBA4),tt===r.UNSIGNED_SHORT_5_5_5_1&&(mt=r.RGB5_A1)}return(mt===r.R16F||mt===r.R32F||mt===r.RG16F||mt===r.RG32F||mt===r.RGBA16F||mt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),mt}function P(z,b){let tt;return z?b===null||b===$i||b===hl?tt=r.DEPTH24_STENCIL8:b===Fi?tt=r.DEPTH32F_STENCIL8:b===fl&&(tt=r.DEPTH24_STENCIL8,de("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===$i||b===hl?tt=r.DEPTH_COMPONENT24:b===Fi?tt=r.DEPTH_COMPONENT32F:b===fl&&(tt=r.DEPTH_COMPONENT16),tt}function R(z,b){return S(z)===!0||z.isFramebufferTexture&&z.minFilter!==Ln&&z.minFilter!==zn?Math.log2(Math.max(b.width,b.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?b.mipmaps.length:1}function L(z){const b=z.target;b.removeEventListener("dispose",L),N(b),b.isVideoTexture&&v.delete(b),b.isHTMLTexture&&_.delete(b)}function E(z){const b=z.target;b.removeEventListener("dispose",E),H(b)}function N(z){const b=a.get(z);if(b.__webglInit===void 0)return;const tt=z.source,ut=x.get(tt);if(ut){const vt=ut[b.__cacheKey];vt.usedTimes--,vt.usedTimes===0&&F(z),Object.keys(ut).length===0&&x.delete(tt)}a.remove(z)}function F(z){const b=a.get(z);r.deleteTexture(b.__webglTexture);const tt=z.source,ut=x.get(tt);delete ut[b.__cacheKey],u.memory.textures--}function H(z){const b=a.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),a.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let ut=0;ut<6;ut++){if(Array.isArray(b.__webglFramebuffer[ut]))for(let vt=0;vt<b.__webglFramebuffer[ut].length;vt++)r.deleteFramebuffer(b.__webglFramebuffer[ut][vt]);else r.deleteFramebuffer(b.__webglFramebuffer[ut]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[ut])}else{if(Array.isArray(b.__webglFramebuffer))for(let ut=0;ut<b.__webglFramebuffer.length;ut++)r.deleteFramebuffer(b.__webglFramebuffer[ut]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ut=0;ut<b.__webglColorRenderbuffer.length;ut++)b.__webglColorRenderbuffer[ut]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[ut]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const tt=z.textures;for(let ut=0,vt=tt.length;ut<vt;ut++){const Nt=a.get(tt[ut]);Nt.__webglTexture&&(r.deleteTexture(Nt.__webglTexture),u.memory.textures--),a.remove(tt[ut])}a.remove(z)}let q=0;function K(){q=0}function G(){return q}function J(z){q=z}function B(){const z=q;return z>=o.maxTextures&&de("WebGLTextures: Trying to use "+(z+1)+" texture units while this GPU supports only "+o.maxTextures),q+=1,z}function X(z){const b=[];return b.push(z.wrapS),b.push(z.wrapT),b.push(z.wrapR||0),b.push(z.magFilter),b.push(z.minFilter),b.push(z.anisotropy),b.push(z.internalFormat),b.push(z.format),b.push(z.type),b.push(z.generateMipmaps),b.push(z.premultiplyAlpha),b.push(z.flipY),b.push(z.unpackAlignment),b.push(z.colorSpace),b.join()}function nt(z,b){const tt=a.get(z);if(z.isVideoTexture&&V(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&tt.__version!==z.version){const ut=z.image;if(ut===null)de("WebGLRenderer: Texture marked for update but no image data found.");else if(ut.complete===!1)de("WebGLRenderer: Texture marked for update but image is incomplete");else{Dt(tt,z,b);return}}else z.isExternalTexture&&(tt.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,tt.__webglTexture,r.TEXTURE0+b)}function it(z,b){const tt=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&tt.__version!==z.version){Dt(tt,z,b);return}else z.isExternalTexture&&(tt.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,tt.__webglTexture,r.TEXTURE0+b)}function ot(z,b){const tt=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&tt.__version!==z.version){Dt(tt,z,b);return}n.bindTexture(r.TEXTURE_3D,tt.__webglTexture,r.TEXTURE0+b)}function U(z,b){const tt=a.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&tt.__version!==z.version){ie(tt,z,b);return}n.bindTexture(r.TEXTURE_CUBE_MAP,tt.__webglTexture,r.TEXTURE0+b)}const j={[uu]:r.REPEAT,[Aa]:r.CLAMP_TO_EDGE,[Ed]:r.MIRRORED_REPEAT},dt={[Ln]:r.NEAREST,[gM]:r.NEAREST_MIPMAP_NEAREST,[Uc]:r.NEAREST_MIPMAP_LINEAR,[zn]:r.LINEAR,[zh]:r.LINEAR_MIPMAP_NEAREST,[Ns]:r.LINEAR_MIPMAP_LINEAR},Rt={[SM]:r.NEVER,[TM]:r.ALWAYS,[yM]:r.LESS,[_p]:r.LEQUAL,[MM]:r.EQUAL,[xp]:r.GEQUAL,[EM]:r.GREATER,[bM]:r.NOTEQUAL};function Pt(z,b){if(b.type===Fi&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===zn||b.magFilter===zh||b.magFilter===Uc||b.magFilter===Ns||b.minFilter===zn||b.minFilter===zh||b.minFilter===Uc||b.minFilter===Ns)&&de("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(z,r.TEXTURE_WRAP_S,j[b.wrapS]),r.texParameteri(z,r.TEXTURE_WRAP_T,j[b.wrapT]),(z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY)&&r.texParameteri(z,r.TEXTURE_WRAP_R,j[b.wrapR]),r.texParameteri(z,r.TEXTURE_MAG_FILTER,dt[b.magFilter]),r.texParameteri(z,r.TEXTURE_MIN_FILTER,dt[b.minFilter]),b.compareFunction&&(r.texParameteri(z,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(z,r.TEXTURE_COMPARE_FUNC,Rt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ln||b.minFilter!==Uc&&b.minFilter!==Ns||b.type===Fi&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||a.get(b).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");r.texParameterf(z,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,o.getMaxAnisotropy())),a.get(b).__currentAnisotropy=b.anisotropy}}}function qt(z,b){let tt=!1;z.__webglInit===void 0&&(z.__webglInit=!0,b.addEventListener("dispose",L));const ut=b.source;let vt=x.get(ut);vt===void 0&&(vt={},x.set(ut,vt));const Nt=X(b);if(Nt!==z.__cacheKey){vt[Nt]===void 0&&(vt[Nt]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,tt=!0),vt[Nt].usedTimes++;const Bt=vt[z.__cacheKey];Bt!==void 0&&(vt[z.__cacheKey].usedTimes--,Bt.usedTimes===0&&F(b)),z.__cacheKey=Nt,z.__webglTexture=vt[Nt].texture}return tt}function at(z,b,tt){return Math.floor(Math.floor(z/tt)/b)}function gt(z,b,tt,ut){const Nt=z.updateRanges;if(Nt.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,b.width,b.height,tt,ut,b.data);else{Nt.sort((Jt,Vt)=>Jt.start-Vt.start);let Bt=0;for(let Jt=1;Jt<Nt.length;Jt++){const Vt=Nt[Bt],Ht=Nt[Jt],re=Vt.start+Vt.count,ce=at(Ht.start,b.width,4),pe=at(Vt.start,b.width,4);Ht.start<=re+1&&ce===pe&&at(Ht.start+Ht.count-1,b.width,4)===ce?Vt.count=Math.max(Vt.count,Ht.start+Ht.count-Vt.start):(++Bt,Nt[Bt]=Ht)}Nt.length=Bt+1;const mt=n.getParameter(r.UNPACK_ROW_LENGTH),_t=n.getParameter(r.UNPACK_SKIP_PIXELS),It=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,b.width);for(let Jt=0,Vt=Nt.length;Jt<Vt;Jt++){const Ht=Nt[Jt],re=Math.floor(Ht.start/4),ce=Math.ceil(Ht.count/4),pe=re%b.width,Q=Math.floor(re/b.width),zt=ce,Mt=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,pe),n.pixelStorei(r.UNPACK_SKIP_ROWS,Q),n.texSubImage2D(r.TEXTURE_2D,0,pe,Q,zt,Mt,tt,ut,b.data)}z.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,mt),n.pixelStorei(r.UNPACK_SKIP_PIXELS,_t),n.pixelStorei(r.UNPACK_SKIP_ROWS,It)}}function Dt(z,b,tt){let ut=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ut=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ut=r.TEXTURE_3D);const vt=qt(z,b),Nt=b.source;n.bindTexture(ut,z.__webglTexture,r.TEXTURE0+tt);const Bt=a.get(Nt);if(Nt.version!==Bt.__version||vt===!0){if(n.activeTexture(r.TEXTURE0+tt),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const Mt=Ue.getPrimaries(Ue.workingColorSpace),Ft=b.colorSpace===Ta?null:Ue.getPrimaries(b.colorSpace),Yt=b.colorSpace===Ta||Mt===Ft?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt)}n.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment);let _t=M(b.image,!1,o.maxTextureSize);_t=oe(b,_t);const It=c.convert(b.format,b.colorSpace),Jt=c.convert(b.type);let Vt=A(b.internalFormat,It,Jt,b.normalized,b.colorSpace,b.isVideoTexture);Pt(ut,b);let Ht;const re=b.mipmaps,ce=b.isVideoTexture!==!0,pe=Bt.__version===void 0||vt===!0,Q=Nt.dataReady,zt=R(b,_t);if(b.isDepthTexture)Vt=P(b.format===Os,b.type),pe&&(ce?n.texStorage2D(r.TEXTURE_2D,1,Vt,_t.width,_t.height):n.texImage2D(r.TEXTURE_2D,0,Vt,_t.width,_t.height,0,It,Jt,null));else if(b.isDataTexture)if(re.length>0){ce&&pe&&n.texStorage2D(r.TEXTURE_2D,zt,Vt,re[0].width,re[0].height);for(let Mt=0,Ft=re.length;Mt<Ft;Mt++)Ht=re[Mt],ce?Q&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Ht.width,Ht.height,It,Jt,Ht.data):n.texImage2D(r.TEXTURE_2D,Mt,Vt,Ht.width,Ht.height,0,It,Jt,Ht.data);b.generateMipmaps=!1}else ce?(pe&&n.texStorage2D(r.TEXTURE_2D,zt,Vt,_t.width,_t.height),Q&&gt(b,_t,It,Jt)):n.texImage2D(r.TEXTURE_2D,0,Vt,_t.width,_t.height,0,It,Jt,_t.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ce&&pe&&n.texStorage3D(r.TEXTURE_2D_ARRAY,zt,Vt,re[0].width,re[0].height,_t.depth);for(let Mt=0,Ft=re.length;Mt<Ft;Mt++)if(Ht=re[Mt],b.format!==Hi)if(It!==null)if(ce){if(Q)if(b.layerUpdates.size>0){const Yt=h_(Ht.width,Ht.height,b.format,b.type);for(const Tt of b.layerUpdates){const se=Ht.data.subarray(Tt*Yt/Ht.data.BYTES_PER_ELEMENT,(Tt+1)*Yt/Ht.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,Tt,Ht.width,Ht.height,1,It,se)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Ht.width,Ht.height,_t.depth,It,Ht.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Mt,Vt,Ht.width,Ht.height,_t.depth,0,Ht.data,0,0);else de("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ce?Q&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Ht.width,Ht.height,_t.depth,It,Jt,Ht.data):n.texImage3D(r.TEXTURE_2D_ARRAY,Mt,Vt,Ht.width,Ht.height,_t.depth,0,It,Jt,Ht.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{ce&&pe&&n.texStorage2D(r.TEXTURE_2D,zt,Vt,re[0].width,re[0].height);for(let Mt=0,Ft=re.length;Mt<Ft;Mt++)Ht=re[Mt],b.format!==Hi?It!==null?ce?Q&&n.compressedTexSubImage2D(r.TEXTURE_2D,Mt,0,0,Ht.width,Ht.height,It,Ht.data):n.compressedTexImage2D(r.TEXTURE_2D,Mt,Vt,Ht.width,Ht.height,0,Ht.data):de("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?Q&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Ht.width,Ht.height,It,Jt,Ht.data):n.texImage2D(r.TEXTURE_2D,Mt,Vt,Ht.width,Ht.height,0,It,Jt,Ht.data)}else if(b.isDataArrayTexture)if(ce){if(pe&&n.texStorage3D(r.TEXTURE_2D_ARRAY,zt,Vt,_t.width,_t.height,_t.depth),Q)if(b.layerUpdates.size>0){const Mt=h_(_t.width,_t.height,b.format,b.type);for(const Ft of b.layerUpdates){const Yt=_t.data.subarray(Ft*Mt/_t.data.BYTES_PER_ELEMENT,(Ft+1)*Mt/_t.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ft,_t.width,_t.height,1,It,Jt,Yt)}b.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,It,Jt,_t.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Vt,_t.width,_t.height,_t.depth,0,It,Jt,_t.data);else if(b.isData3DTexture)ce?(pe&&n.texStorage3D(r.TEXTURE_3D,zt,Vt,_t.width,_t.height,_t.depth),Q&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,It,Jt,_t.data)):n.texImage3D(r.TEXTURE_3D,0,Vt,_t.width,_t.height,_t.depth,0,It,Jt,_t.data);else if(b.isFramebufferTexture){if(pe)if(ce)n.texStorage2D(r.TEXTURE_2D,zt,Vt,_t.width,_t.height);else{let Mt=_t.width,Ft=_t.height;for(let Yt=0;Yt<zt;Yt++)n.texImage2D(r.TEXTURE_2D,Yt,Vt,Mt,Ft,0,It,Jt,null),Mt>>=1,Ft>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in r){const Mt=r.canvas;if(Mt.hasAttribute("layoutsubtree")||Mt.setAttribute("layoutsubtree","true"),_t.parentNode!==Mt){Mt.appendChild(_t),_.add(b),Mt.onpaint=Ft=>{const Yt=Ft.changedElements;for(const Tt of _)Yt.includes(Tt.image)&&(Tt.needsUpdate=!0)},Mt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,_t);else{const Yt=r.RGBA,Tt=r.RGBA,se=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Yt,Tt,se,_t)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(re.length>0){if(ce&&pe){const Mt=le(re[0]);n.texStorage2D(r.TEXTURE_2D,zt,Vt,Mt.width,Mt.height)}for(let Mt=0,Ft=re.length;Mt<Ft;Mt++)Ht=re[Mt],ce?Q&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,It,Jt,Ht):n.texImage2D(r.TEXTURE_2D,Mt,Vt,It,Jt,Ht);b.generateMipmaps=!1}else if(ce){if(pe){const Mt=le(_t);n.texStorage2D(r.TEXTURE_2D,zt,Vt,Mt.width,Mt.height)}Q&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,It,Jt,_t)}else n.texImage2D(r.TEXTURE_2D,0,Vt,It,Jt,_t);S(b)&&O(ut),Bt.__version=Nt.version,b.onUpdate&&b.onUpdate(b)}z.__version=b.version}function ie(z,b,tt){if(b.image.length!==6)return;const ut=qt(z,b),vt=b.source;n.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+tt);const Nt=a.get(vt);if(vt.version!==Nt.__version||ut===!0){n.activeTexture(r.TEXTURE0+tt);const Bt=Ue.getPrimaries(Ue.workingColorSpace),mt=b.colorSpace===Ta?null:Ue.getPrimaries(b.colorSpace),_t=b.colorSpace===Ta||Bt===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const It=b.isCompressedTexture||b.image[0].isCompressedTexture,Jt=b.image[0]&&b.image[0].isDataTexture,Vt=[];for(let Tt=0;Tt<6;Tt++)!It&&!Jt?Vt[Tt]=M(b.image[Tt],!0,o.maxCubemapSize):Vt[Tt]=Jt?b.image[Tt].image:b.image[Tt],Vt[Tt]=oe(b,Vt[Tt]);const Ht=Vt[0],re=c.convert(b.format,b.colorSpace),ce=c.convert(b.type),pe=A(b.internalFormat,re,ce,b.normalized,b.colorSpace),Q=b.isVideoTexture!==!0,zt=Nt.__version===void 0||ut===!0,Mt=vt.dataReady;let Ft=R(b,Ht);Pt(r.TEXTURE_CUBE_MAP,b);let Yt;if(It){Q&&zt&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Ft,pe,Ht.width,Ht.height);for(let Tt=0;Tt<6;Tt++){Yt=Vt[Tt].mipmaps;for(let se=0;se<Yt.length;se++){const te=Yt[se];b.format!==Hi?re!==null?Q?Mt&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,se,0,0,te.width,te.height,re,te.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,se,pe,te.width,te.height,0,te.data):de("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Q?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,se,0,0,te.width,te.height,re,ce,te.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,se,pe,te.width,te.height,0,re,ce,te.data)}}}else{if(Yt=b.mipmaps,Q&&zt){Yt.length>0&&Ft++;const Tt=le(Vt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Ft,pe,Tt.width,Tt.height)}for(let Tt=0;Tt<6;Tt++)if(Jt){Q?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,Vt[Tt].width,Vt[Tt].height,re,ce,Vt[Tt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,pe,Vt[Tt].width,Vt[Tt].height,0,re,ce,Vt[Tt].data);for(let se=0;se<Yt.length;se++){const We=Yt[se].image[Tt].image;Q?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,se+1,0,0,We.width,We.height,re,ce,We.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,se+1,pe,We.width,We.height,0,re,ce,We.data)}}else{Q?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,re,ce,Vt[Tt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,pe,re,ce,Vt[Tt]);for(let se=0;se<Yt.length;se++){const te=Yt[se];Q?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,se+1,0,0,re,ce,te.image[Tt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,se+1,pe,re,ce,te.image[Tt])}}}S(b)&&O(r.TEXTURE_CUBE_MAP),Nt.__version=vt.version,b.onUpdate&&b.onUpdate(b)}z.__version=b.version}function kt(z,b,tt,ut,vt,Nt){const Bt=c.convert(tt.format,tt.colorSpace),mt=c.convert(tt.type),_t=A(tt.internalFormat,Bt,mt,tt.normalized,tt.colorSpace),It=a.get(b),Jt=a.get(tt);if(Jt.__renderTarget=b,!It.__hasExternalTextures){const Vt=Math.max(1,b.width>>Nt),Ht=Math.max(1,b.height>>Nt);vt===r.TEXTURE_3D||vt===r.TEXTURE_2D_ARRAY?n.texImage3D(vt,Nt,_t,Vt,Ht,b.depth,0,Bt,mt,null):n.texImage2D(vt,Nt,_t,Vt,Ht,0,Bt,mt,null)}n.bindFramebuffer(r.FRAMEBUFFER,z),$t(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ut,vt,Jt.__webglTexture,0,Ct(b)):(vt===r.TEXTURE_2D||vt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&vt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ut,vt,Jt.__webglTexture,Nt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function ue(z,b,tt){if(r.bindRenderbuffer(r.RENDERBUFFER,z),b.depthBuffer){const ut=b.depthTexture,vt=ut&&ut.isDepthTexture?ut.type:null,Nt=P(b.stencilBuffer,vt),Bt=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;$t(b)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ct(b),Nt,b.width,b.height):tt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct(b),Nt,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Nt,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Bt,r.RENDERBUFFER,z)}else{const ut=b.textures;for(let vt=0;vt<ut.length;vt++){const Nt=ut[vt],Bt=c.convert(Nt.format,Nt.colorSpace),mt=c.convert(Nt.type),_t=A(Nt.internalFormat,Bt,mt,Nt.normalized,Nt.colorSpace);$t(b)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ct(b),_t,b.width,b.height):tt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct(b),_t,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,_t,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Le(z,b,tt){const ut=b.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,z),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const vt=a.get(b.depthTexture);if(vt.__renderTarget=b,(!vt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ut){if(vt.__webglInit===void 0&&(vt.__webglInit=!0,b.depthTexture.addEventListener("dispose",L)),vt.__webglTexture===void 0){vt.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,vt.__webglTexture),Pt(r.TEXTURE_CUBE_MAP,b.depthTexture);const It=c.convert(b.depthTexture.format),Jt=c.convert(b.depthTexture.type);let Vt;b.depthTexture.format===Ca?Vt=r.DEPTH_COMPONENT24:b.depthTexture.format===Os&&(Vt=r.DEPTH24_STENCIL8);for(let Ht=0;Ht<6;Ht++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ht,0,Vt,b.width,b.height,0,It,Jt,null)}}else nt(b.depthTexture,0);const Nt=vt.__webglTexture,Bt=Ct(b),mt=ut?r.TEXTURE_CUBE_MAP_POSITIVE_X+tt:r.TEXTURE_2D,_t=b.depthTexture.format===Os?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(b.depthTexture.format===Ca)$t(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_t,mt,Nt,0,Bt):r.framebufferTexture2D(r.FRAMEBUFFER,_t,mt,Nt,0);else if(b.depthTexture.format===Os)$t(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_t,mt,Nt,0,Bt):r.framebufferTexture2D(r.FRAMEBUFFER,_t,mt,Nt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function yt(z){const b=a.get(z),tt=z.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==z.depthTexture){const ut=z.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ut){const vt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ut.removeEventListener("dispose",vt)};ut.addEventListener("dispose",vt),b.__depthDisposeCallback=vt}b.__boundDepthTexture=ut}if(z.depthTexture&&!b.__autoAllocateDepthBuffer)if(tt)for(let ut=0;ut<6;ut++)Le(b.__webglFramebuffer[ut],z,ut);else{const ut=z.texture.mipmaps;ut&&ut.length>0?Le(b.__webglFramebuffer[0],z,0):Le(b.__webglFramebuffer,z,0)}else if(tt){b.__webglDepthbuffer=[];for(let ut=0;ut<6;ut++)if(n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[ut]),b.__webglDepthbuffer[ut]===void 0)b.__webglDepthbuffer[ut]=r.createRenderbuffer(),ue(b.__webglDepthbuffer[ut],z,!1);else{const vt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Nt=b.__webglDepthbuffer[ut];r.bindRenderbuffer(r.RENDERBUFFER,Nt),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,Nt)}}else{const ut=z.texture.mipmaps;if(ut&&ut.length>0?n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),ue(b.__webglDepthbuffer,z,!1);else{const vt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Nt=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Nt),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,Nt)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function wt(z,b,tt){const ut=a.get(z);b!==void 0&&kt(ut.__webglFramebuffer,z,z.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),tt!==void 0&&yt(z)}function Ut(z){const b=z.texture,tt=a.get(z),ut=a.get(b);z.addEventListener("dispose",E);const vt=z.textures,Nt=z.isWebGLCubeRenderTarget===!0,Bt=vt.length>1;if(Bt||(ut.__webglTexture===void 0&&(ut.__webglTexture=r.createTexture()),ut.__version=b.version,u.memory.textures++),Nt){tt.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(b.mipmaps&&b.mipmaps.length>0){tt.__webglFramebuffer[mt]=[];for(let _t=0;_t<b.mipmaps.length;_t++)tt.__webglFramebuffer[mt][_t]=r.createFramebuffer()}else tt.__webglFramebuffer[mt]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){tt.__webglFramebuffer=[];for(let mt=0;mt<b.mipmaps.length;mt++)tt.__webglFramebuffer[mt]=r.createFramebuffer()}else tt.__webglFramebuffer=r.createFramebuffer();if(Bt)for(let mt=0,_t=vt.length;mt<_t;mt++){const It=a.get(vt[mt]);It.__webglTexture===void 0&&(It.__webglTexture=r.createTexture(),u.memory.textures++)}if(z.samples>0&&$t(z)===!1){tt.__webglMultisampledFramebuffer=r.createFramebuffer(),tt.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let mt=0;mt<vt.length;mt++){const _t=vt[mt];tt.__webglColorRenderbuffer[mt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,tt.__webglColorRenderbuffer[mt]);const It=c.convert(_t.format,_t.colorSpace),Jt=c.convert(_t.type),Vt=A(_t.internalFormat,It,Jt,_t.normalized,_t.colorSpace,z.isXRRenderTarget===!0),Ht=Ct(z);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht,Vt,z.width,z.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,tt.__webglColorRenderbuffer[mt])}r.bindRenderbuffer(r.RENDERBUFFER,null),z.depthBuffer&&(tt.__webglDepthRenderbuffer=r.createRenderbuffer(),ue(tt.__webglDepthRenderbuffer,z,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Nt){n.bindTexture(r.TEXTURE_CUBE_MAP,ut.__webglTexture),Pt(r.TEXTURE_CUBE_MAP,b);for(let mt=0;mt<6;mt++)if(b.mipmaps&&b.mipmaps.length>0)for(let _t=0;_t<b.mipmaps.length;_t++)kt(tt.__webglFramebuffer[mt][_t],z,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,_t);else kt(tt.__webglFramebuffer[mt],z,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);S(b)&&O(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Bt){for(let mt=0,_t=vt.length;mt<_t;mt++){const It=vt[mt],Jt=a.get(It);let Vt=r.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Vt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Vt,Jt.__webglTexture),Pt(Vt,It),kt(tt.__webglFramebuffer,z,It,r.COLOR_ATTACHMENT0+mt,Vt,0),S(It)&&O(Vt)}n.unbindTexture()}else{let mt=r.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(mt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(mt,ut.__webglTexture),Pt(mt,b),b.mipmaps&&b.mipmaps.length>0)for(let _t=0;_t<b.mipmaps.length;_t++)kt(tt.__webglFramebuffer[_t],z,b,r.COLOR_ATTACHMENT0,mt,_t);else kt(tt.__webglFramebuffer,z,b,r.COLOR_ATTACHMENT0,mt,0);S(b)&&O(mt),n.unbindTexture()}z.depthBuffer&&yt(z)}function Lt(z){const b=z.textures;for(let tt=0,ut=b.length;tt<ut;tt++){const vt=b[tt];if(S(vt)){const Nt=I(z),Bt=a.get(vt).__webglTexture;n.bindTexture(Nt,Bt),O(Nt),n.unbindTexture()}}}const $=[],xt=[];function At(z){if(z.samples>0){if($t(z)===!1){const b=z.textures,tt=z.width,ut=z.height;let vt=r.COLOR_BUFFER_BIT;const Nt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Bt=a.get(z),mt=b.length>1;if(mt)for(let It=0;It<b.length;It++)n.bindFramebuffer(r.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer);const _t=z.texture.mipmaps;_t&&_t.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Bt.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Bt.__webglFramebuffer);for(let It=0;It<b.length;It++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(vt|=r.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(vt|=r.STENCIL_BUFFER_BIT)),mt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Bt.__webglColorRenderbuffer[It]);const Jt=a.get(b[It]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Jt,0)}r.blitFramebuffer(0,0,tt,ut,0,0,tt,ut,vt,r.NEAREST),m===!0&&($.length=0,xt.length=0,$.push(r.COLOR_ATTACHMENT0+It),z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&($.push(Nt),xt.push(Nt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,xt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,$))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),mt)for(let It=0;It<b.length;It++){n.bindFramebuffer(r.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.RENDERBUFFER,Bt.__webglColorRenderbuffer[It]);const Jt=a.get(b[It]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.TEXTURE_2D,Jt,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&m){const b=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function Ct(z){return Math.min(o.maxSamples,z.samples)}function $t(z){const b=a.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function V(z){const b=u.render.frame;v.get(z)!==b&&(v.set(z,b),z.update())}function oe(z,b){const tt=z.colorSpace,ut=z.format,vt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||tt!==pu&&tt!==Ta&&(Ue.getTransfer(tt)===Xe?(ut!==Hi||vt!==pi)&&de("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",tt)),b}function le(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(p.width=z.naturalWidth||z.width,p.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(p.width=z.displayWidth,p.height=z.displayHeight):(p.width=z.width,p.height=z.height),p}this.allocateTextureUnit=B,this.resetTextureUnits=K,this.getTextureUnits=G,this.setTextureUnits=J,this.setTexture2D=nt,this.setTexture2DArray=it,this.setTexture3D=ot,this.setTextureCube=U,this.rebindTextures=wt,this.setupRenderTarget=Ut,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=yt,this.setupFrameBufferTexture=kt,this.useMultisampledRTT=$t,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function j2(r,t){function n(a,o=Ta){let c;const u=Ue.getTransfer(o);if(a===pi)return r.UNSIGNED_BYTE;if(a===hp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===dp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===K_)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===J_)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===Y_)return r.BYTE;if(a===Z_)return r.SHORT;if(a===fl)return r.UNSIGNED_SHORT;if(a===fp)return r.INT;if(a===$i)return r.UNSIGNED_INT;if(a===Fi)return r.FLOAT;if(a===Ri)return r.HALF_FLOAT;if(a===Q_)return r.ALPHA;if(a===j_)return r.RGB;if(a===Hi)return r.RGBA;if(a===Ca)return r.DEPTH_COMPONENT;if(a===Os)return r.DEPTH_STENCIL;if(a===pp)return r.RED;if(a===mp)return r.RED_INTEGER;if(a===zs)return r.RG;if(a===gp)return r.RG_INTEGER;if(a===vp)return r.RGBA_INTEGER;if(a===su||a===ru||a===ou||a===lu)if(u===Xe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===su)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===ru)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===ou)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===lu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===su)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===ru)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===ou)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===lu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===bd||a===Td||a===Ad||a===wd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===bd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Td)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Ad)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===wd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Rd||a===Cd||a===Dd||a===Ud||a===Ld||a===fu||a===Nd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Rd||a===Cd)return u===Xe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Dd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===Ud)return c.COMPRESSED_R11_EAC;if(a===Ld)return c.COMPRESSED_SIGNED_R11_EAC;if(a===fu)return c.COMPRESSED_RG11_EAC;if(a===Nd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===Od||a===Pd||a===Id||a===zd||a===Bd||a===Fd||a===Hd||a===Gd||a===Vd||a===kd||a===Xd||a===Wd||a===qd||a===Yd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Od)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Pd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Id)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===zd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Bd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Fd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Hd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Gd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Vd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===kd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Xd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Wd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Yd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===Zd||a===Kd||a===Jd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===Zd)return u===Xe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Kd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===Jd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Qd||a===jd||a===hu||a===$d)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===Qd)return c.COMPRESSED_RED_RGTC1_EXT;if(a===jd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===hu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===$d)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===hl?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const $2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t3=`
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

}`;class e3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new lx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Ci({vertexShader:$2,fragmentShader:t3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ln(new Fs(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class n3 extends Hs{constructor(t,n){super();const a=this;let o=null,c=1,u=null,h="local-floor",m=1,p=null,v=null,_=null,g=null,x=null,T=null;const D=typeof XRWebGLBinding<"u",M=new e3,S={},O=n.getContextAttributes();let I=null,A=null;const P=[],R=[],L=new Ot;let E=null,N=null;const F=new ni;F.viewport=new en;const H=new ni;H.viewport=new en;const q=[F,H],K=new cE;let G=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let gt=P[at];return gt===void 0&&(gt=new Xh,P[at]=gt),gt.getTargetRaySpace()},this.getControllerGrip=function(at){let gt=P[at];return gt===void 0&&(gt=new Xh,P[at]=gt),gt.getGripSpace()},this.getHand=function(at){let gt=P[at];return gt===void 0&&(gt=new Xh,P[at]=gt),gt.getHandSpace()};function B(at){const gt=R.indexOf(at.inputSource);if(gt===-1)return;const Dt=P[gt];Dt!==void 0&&(Dt.update(at.inputSource,at.frame,p||u),Dt.dispatchEvent({type:at.type,data:at.inputSource}))}function X(){o.removeEventListener("select",B),o.removeEventListener("selectstart",B),o.removeEventListener("selectend",B),o.removeEventListener("squeeze",B),o.removeEventListener("squeezestart",B),o.removeEventListener("squeezeend",B),o.removeEventListener("end",X),o.removeEventListener("inputsourceschange",nt);for(let at=0;at<P.length;at++){const gt=R[at];gt!==null&&(R[at]=null,P[at].disconnect(gt))}G=null,J=null,M.reset();for(const at in S)delete S[at];if(t.setRenderTarget(I),x=null,g=null,_=null,o=null,A=null,qt.stop(),a.isPresenting=!1,t.setPixelRatio(E),t.setSize(L.width,L.height,!1),N!==null){const at=N.camera;at.fov=N.fov,at.zoom=N.zoom,at.updateProjectionMatrix(),N=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){c=at,a.isPresenting===!0&&de("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){h=at,a.isPresenting===!0&&de("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(at){p=at},this.getBaseLayer=function(){return g!==null?g:x},this.getBinding=function(){return _===null&&D&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return T},this.getSession=function(){return o},this.setSession=async function(at){if(o=at,o!==null){if(I=t.getRenderTarget(),o.addEventListener("select",B),o.addEventListener("selectstart",B),o.addEventListener("selectend",B),o.addEventListener("squeeze",B),o.addEventListener("squeezestart",B),o.addEventListener("squeezeend",B),o.addEventListener("end",X),o.addEventListener("inputsourceschange",nt),O.xrCompatible!==!0&&await n.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(L),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let Dt=null,ie=null,kt=null;O.depth&&(kt=O.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Dt=O.stencil?Os:Ca,ie=O.stencil?hl:$i);const ue={colorFormat:n.RGBA8,depthFormat:kt,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(ue),o.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),A=new mi(g.textureWidth,g.textureHeight,{format:Hi,type:pi,depthTexture:new pl(g.textureWidth,g.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,Dt),stencilBuffer:O.stencil,colorSpace:t.outputColorSpace,samples:O.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const Dt={antialias:O.antialias,alpha:!0,depth:O.depth,stencil:O.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(o,n,Dt),o.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new mi(x.framebufferWidth,x.framebufferHeight,{format:Hi,type:pi,colorSpace:t.outputColorSpace,stencilBuffer:O.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),p=null,u=await o.requestReferenceSpace(h),qt.setContext(o),qt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function nt(at){for(let gt=0;gt<at.removed.length;gt++){const Dt=at.removed[gt],ie=R.indexOf(Dt);ie>=0&&(R[ie]=null,P[ie].disconnect(Dt))}for(let gt=0;gt<at.added.length;gt++){const Dt=at.added[gt];let ie=R.indexOf(Dt);if(ie===-1){for(let ue=0;ue<P.length;ue++)if(ue>=R.length){R.push(Dt),ie=ue;break}else if(R[ue]===null){R[ue]=Dt,ie=ue;break}if(ie===-1)break}const kt=P[ie];kt&&kt.connect(Dt)}}const it=new W,ot=new W;function U(at,gt,Dt){it.setFromMatrixPosition(gt.matrixWorld),ot.setFromMatrixPosition(Dt.matrixWorld);const ie=it.distanceTo(ot),kt=gt.projectionMatrix.elements,ue=Dt.projectionMatrix.elements,Le=kt[14]/(kt[10]-1),yt=kt[14]/(kt[10]+1),wt=(kt[9]+1)/kt[5],Ut=(kt[9]-1)/kt[5],Lt=(kt[8]-1)/kt[0],$=(ue[8]+1)/ue[0],xt=Le*Lt,At=Le*$,Ct=ie/(-Lt+$),$t=Ct*-Lt;if(gt.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX($t),at.translateZ(Ct),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),kt[10]===-1)at.projectionMatrix.copy(gt.projectionMatrix),at.projectionMatrixInverse.copy(gt.projectionMatrixInverse);else{const V=Le+Ct,oe=yt+Ct,le=xt-$t,z=At+(ie-$t),b=wt*yt/oe*V,tt=Ut*yt/oe*V;at.projectionMatrix.makePerspective(le,z,b,tt,V,oe),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function j(at,gt){gt===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(gt.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(o===null)return;let gt=at.near,Dt=at.far;M.texture!==null&&(M.depthNear>0&&(gt=M.depthNear),M.depthFar>0&&(Dt=M.depthFar)),K.near=H.near=F.near=gt,K.far=H.far=F.far=Dt,(G!==K.near||J!==K.far)&&(o.updateRenderState({depthNear:K.near,depthFar:K.far}),G=K.near,J=K.far),K.layers.mask=at.layers.mask|6,F.layers.mask=K.layers.mask&-5,H.layers.mask=K.layers.mask&-3;const ie=at.parent,kt=K.cameras;j(K,ie);for(let ue=0;ue<kt.length;ue++)j(kt[ue],ie);kt.length===2?U(K,F,H):K.projectionMatrix.copy(F.projectionMatrix),N===null&&at.isPerspectiveCamera&&(N={camera:at,fov:at.fov,zoom:at.zoom}),dt(at,K,ie)};function dt(at,gt,Dt){Dt===null?at.matrix.copy(gt.matrixWorld):(at.matrix.copy(Dt.matrixWorld),at.matrix.invert(),at.matrix.multiply(gt.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(gt.projectionMatrix),at.projectionMatrixInverse.copy(gt.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=Wr*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return K},this.getFoveation=function(){if(!(g===null&&x===null))return m},this.setFoveation=function(at){m=at,g!==null&&(g.fixedFoveation=at),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=at)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(K)},this.getCameraTexture=function(at){return S[at]};let Rt=null;function Pt(at,gt){if(v=gt.getViewerPose(p||u),T=gt,v!==null){const Dt=v.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let ie=!1;Dt.length!==K.cameras.length&&(K.cameras.length=0,ie=!0);for(let yt=0;yt<Dt.length;yt++){const wt=Dt[yt];let Ut=null;if(x!==null)Ut=x.getViewport(wt);else{const $=_.getViewSubImage(g,wt);Ut=$.viewport,yt===0&&(t.setRenderTargetTextures(A,$.colorTexture,$.depthStencilTexture),t.setRenderTarget(A))}let Lt=q[yt];Lt===void 0&&(Lt=new ni,Lt.layers.enable(yt),Lt.viewport=new en,q[yt]=Lt),Lt.matrix.fromArray(wt.transform.matrix),Lt.matrix.decompose(Lt.position,Lt.quaternion,Lt.scale),Lt.projectionMatrix.fromArray(wt.projectionMatrix),Lt.projectionMatrixInverse.copy(Lt.projectionMatrix).invert(),Lt.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),yt===0&&(K.matrix.copy(Lt.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale)),ie===!0&&K.cameras.push(Lt)}const kt=o.enabledFeatures;if(kt&&kt.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&D){_=a.getBinding();const yt=_.getDepthInformation(Dt[0]);yt&&yt.isValid&&yt.texture&&M.init(yt,o.renderState)}if(kt&&kt.includes("camera-access")&&D){t.state.unbindTexture(),_=a.getBinding();for(let yt=0;yt<Dt.length;yt++){const wt=Dt[yt].camera;if(wt){let Ut=S[wt];Ut||(Ut=new lx,S[wt]=Ut);const Lt=_.getCameraImage(wt);Ut.sourceTexture=Lt}}}}for(let Dt=0;Dt<P.length;Dt++){const ie=R[Dt],kt=P[Dt];ie!==null&&kt!==void 0&&kt.update(ie,gt,p||u)}Rt&&Rt(at,gt),gt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:gt}),T=null}const qt=new Mx;qt.setAnimationLoop(Pt),this.setAnimationLoop=function(at){Rt=at},this.dispose=function(){}}}const i3=new Ge,Cx=new ge;Cx.set(-1,0,0,0,1,0,0,0,1);function a3(r,t){function n(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function a(M,S){S.color.getRGB(M.fogColor.value,xx(r)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function o(M,S,O,I,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),_(M,S)):S.isMeshPhongMaterial?(c(M,S),v(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),g(M,S),S.isMeshPhysicalMaterial&&x(M,S,A)):S.isMeshMatcapMaterial?(c(M,S),T(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),D(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(u(M,S),S.isLineDashedMaterial&&h(M,S)):S.isPointsMaterial?m(M,S,O,I):S.isSpriteMaterial?p(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,n(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Wn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,n(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Wn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,n(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,n(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,n(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const O=t.get(S),I=O.envMap,A=O.envMapRotation;I&&(M.envMap.value=I,M.envMapRotation.value.setFromMatrix4(i3.makeRotationFromEuler(A)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(Cx),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,n(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,n(S.aoMap,M.aoMapTransform))}function u(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform))}function h(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,O,I){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*O,M.scale.value=I*.5,S.map&&(M.map.value=S.map,n(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function p(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function v(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function _(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function g(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,n(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,n(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,O){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,n(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,n(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,n(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,n(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,n(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Wn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,n(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,n(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=O.texture,M.transmissionSamplerSize.value.set(O.width,O.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,n(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,n(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,n(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,n(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,n(S.specularIntensityMap,M.specularIntensityMapTransform))}function T(M,S){S.matcap&&(M.matcap.value=S.matcap)}function D(M,S){const O=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(O.matrixWorld),M.nearDistance.value=O.shadow.camera.near,M.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function s3(r,t,n,a){let o={},c={},u=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,P){const R=P.program;a.uniformBlockBinding(A,R)}function p(A,P){let R=o[A.id];R===void 0&&(M(A),R=v(A),o[A.id]=R,A.addEventListener("dispose",O));const L=P.program;a.updateUBOMapping(A,L);const E=t.render.frame;c[A.id]!==E&&(g(A),c[A.id]=E)}function v(A){const P=_();A.__bindingPointIndex=P;const R=r.createBuffer(),L=A.__size,E=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,R),r.bufferData(r.UNIFORM_BUFFER,L,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,P,R),R}function _(){for(let A=0;A<h;A++)if(u.indexOf(A)===-1)return u.push(A),A;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(A){const P=o[A.id],R=A.uniforms,L=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,P);for(let E=0,N=R.length;E<N;E++){const F=R[E];if(Array.isArray(F))for(let H=0,q=F.length;H<q;H++)x(F[H],E,H,L);else x(F,E,0,L)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,P,R,L){if(D(A,P,R,L)===!0){const E=A.__offset,N=A.value;if(Array.isArray(N)){let F=0;for(let H=0;H<N.length;H++){const q=N[H],K=S(q);T(q,A.__data,F),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(F+=K.storage/Float32Array.BYTES_PER_ELEMENT)}}else T(N,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,E,A.__data)}}function T(A,P,R){typeof A=="number"||typeof A=="boolean"?P[0]=A:A.isMatrix3?(P[0]=A.elements[0],P[1]=A.elements[1],P[2]=A.elements[2],P[3]=0,P[4]=A.elements[3],P[5]=A.elements[4],P[6]=A.elements[5],P[7]=0,P[8]=A.elements[6],P[9]=A.elements[7],P[10]=A.elements[8],P[11]=0):ArrayBuffer.isView(A)?P.set(new A.constructor(A.buffer,A.byteOffset,P.length)):A.toArray(P,R)}function D(A,P,R,L){const E=A.value,N=P+"_"+R;if(L[N]===void 0)return typeof E=="number"||typeof E=="boolean"?L[N]=E:ArrayBuffer.isView(E)?L[N]=E.slice():L[N]=E.clone(),!0;{const F=L[N];if(typeof E=="number"||typeof E=="boolean"){if(F!==E)return L[N]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(F.equals(E)===!1)return F.copy(E),!0}}return!1}function M(A){const P=A.uniforms;let R=0;const L=16;for(let N=0,F=P.length;N<F;N++){const H=Array.isArray(P[N])?P[N]:[P[N]];for(let q=0,K=H.length;q<K;q++){const G=H[q],J=Array.isArray(G.value)?G.value:[G.value];for(let B=0,X=J.length;B<X;B++){const nt=J[B],it=S(nt),ot=R%L,U=ot%it.boundary,j=ot+U;R+=U,j!==0&&L-j<it.storage&&(R+=L-j),G.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=R,R+=it.storage}}}const E=R%L;return E>0&&(R+=L-E),A.__size=R,A.__cache={},this}function S(A){const P={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(P.boundary=4,P.storage=4):A.isVector2?(P.boundary=8,P.storage=8):A.isVector3||A.isColor?(P.boundary=16,P.storage=12):A.isVector4?(P.boundary=16,P.storage=16):A.isMatrix3?(P.boundary=48,P.storage=48):A.isMatrix4?(P.boundary=64,P.storage=64):A.isTexture?de("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(P.boundary=16,P.storage=A.byteLength):de("WebGLRenderer: Unsupported uniform value type.",A),P}function O(A){const P=A.target;P.removeEventListener("dispose",O);const R=u.indexOf(P.__bindingPointIndex);u.splice(R,1),r.deleteBuffer(o[P.id]),delete o[P.id],delete c[P.id]}function I(){for(const A in o)r.deleteBuffer(o[A]);u=[],o={},c={}}return{bind:m,update:p,dispose:I}}const r3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Zi=null;function o3(){return Zi===null&&(Zi=new rx(r3,16,16,zs,Ri),Zi.name="DFG_LUT",Zi.minFilter=zn,Zi.magFilter=zn,Zi.wrapS=Aa,Zi.wrapT=Aa,Zi.generateMipmaps=!1,Zi.needsUpdate=!0),Zi}class l3{constructor(t={}){const{canvas:n=RM(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:x=pi}=t;this.isWebGLRenderer=!0;let T;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=a.getContextAttributes().alpha}else T=u;const D=x,M=new Set([vp,gp,mp]),S=new Set([pi,$i,fl,hl,hp,dp]),O=new Uint32Array(4),I=new Int32Array(4),A=new W;let P=null,R=null;const L=[],E=[];let N=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let H=!1,q=null,K=null,G=null,J=null;this._outputColorSpace=ti;let B=0,X=0,nt=null,it=-1,ot=null;const U=new en,j=new en;let dt=null;const Rt=new ve(0);let Pt=0,qt=n.width,at=n.height,gt=1,Dt=null,ie=null;const kt=new en(0,0,qt,at),ue=new en(0,0,qt,at);let Le=!1;const yt=new Tp;let wt=!1,Ut=!1;const Lt=new Ge,$=new W,xt=new en,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ct=!1;function $t(){return nt===null?gt:1}let V=a;function oe(w,Y){return n.getContext(w,Y)}let le,z,b,tt,ut,vt,Nt,Bt,mt,_t,It,Jt,Vt,Ht,re,ce,pe,Q,zt,Mt,Ft,Yt,Tt;try{const w={alpha:!0,depth:o,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${lp}`),n.addEventListener("webglcontextlost",We,!1),n.addEventListener("webglcontextrestored",Oe,!1),n.addEventListener("webglcontextcreationerror",qn,!1),V===null){const Y="webgl2";if(V=oe(Y,w),V===null)throw oe(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}se()}catch(w){throw n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Oe,!1),n.removeEventListener("webglcontextcreationerror",qn,!1),Ne("WebGLRenderer: "+w.message),w}function se(){le=new oA(V),le.init(),Ft=new j2(V,le),z=new QT(V,le,t,Ft),b=new J2(V,le),z.reversedDepthBuffer&&g&&b.buffers.depth.setReversed(!0),K=V.createFramebuffer(),G=V.createFramebuffer(),J=V.createFramebuffer(),tt=new uA(V),ut=new I2,vt=new Q2(V,le,b,ut,z,Ft,tt),Nt=new rA(F),Bt=new hE(V),Yt=new KT(V,Bt),mt=new lA(V,Bt,tt,Yt),_t=new hA(V,mt,Bt,Yt,tt),Q=new fA(V,z,vt),re=new jT(ut),It=new P2(F,Nt,le,z,Yt,re),Jt=new a3(F,ut),Vt=new B2,Ht=new X2(le),pe=new ZT(F,Nt,b,_t,T,m),ce=new K2(F,_t,z),Tt=new s3(V,tt,z,b),zt=new JT(V,le,tt),Mt=new cA(V,le,tt),tt.programs=It.programs,F.capabilities=z,F.extensions=le,F.properties=ut,F.renderLists=Vt,F.shadowMap=ce,F.state=b,F.info=tt}D!==pi&&(N=new pA(D,n.width,n.height,h,o,c));const te=new n3(F,V);this.xr=te,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const w=le.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=le.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return gt},this.setPixelRatio=function(w){w!==void 0&&(gt=w,this.setSize(qt,at,!1))},this.getSize=function(w){return w.set(qt,at)},this.setSize=function(w,Y,ht=!0){if(te.isPresenting){de("WebGLRenderer: Can't change size while VR device is presenting.");return}qt=w,at=Y,n.width=Math.floor(w*gt),n.height=Math.floor(Y*gt),ht===!0&&(n.style.width=w+"px",n.style.height=Y+"px"),N!==null&&N.setSize(n.width,n.height),this.setViewport(0,0,w,Y)},this.getDrawingBufferSize=function(w){return w.set(qt*gt,at*gt).floor()},this.setDrawingBufferSize=function(w,Y,ht){qt=w,at=Y,gt=ht,n.width=Math.floor(w*ht),n.height=Math.floor(Y*ht),this.setViewport(0,0,w,Y)},this.setEffects=function(w){if(D===pi){Ne("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let Y=0;Y<w.length;Y++)if(w[Y].isOutputPass===!0){de("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(U)},this.getViewport=function(w){return w.copy(kt)},this.setViewport=function(w,Y,ht,st){w.isVector4?kt.set(w.x,w.y,w.z,w.w):kt.set(w,Y,ht,st),b.viewport(U.copy(kt).multiplyScalar(gt).round())},this.getScissor=function(w){return w.copy(ue)},this.setScissor=function(w,Y,ht,st){w.isVector4?ue.set(w.x,w.y,w.z,w.w):ue.set(w,Y,ht,st),b.scissor(j.copy(ue).multiplyScalar(gt).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(w){b.setScissorTest(Le=w)},this.setOpaqueSort=function(w){Dt=w},this.setTransparentSort=function(w){ie=w},this.getClearColor=function(w){return w.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor(...arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha(...arguments)},this.clear=function(w=!0,Y=!0,ht=!0){let st=0;if(w){let rt=!1;if(nt!==null){const Xt=nt.texture.format;rt=M.has(Xt)}if(rt){const Xt=nt.texture.type,Qt=S.has(Xt),Gt=pe.getClearColor(),Zt=pe.getClearAlpha(),Kt=Gt.r,_e=Gt.g,Te=Gt.b;Qt?(O[0]=Kt,O[1]=_e,O[2]=Te,O[3]=Zt,V.clearBufferuiv(V.COLOR,0,O)):(I[0]=Kt,I[1]=_e,I[2]=Te,I[3]=Zt,V.clearBufferiv(V.COLOR,0,I))}else st|=V.COLOR_BUFFER_BIT}Y&&(st|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ht&&(st|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),st!==0&&V.clear(st)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),q=w},this.dispose=function(){n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Oe,!1),n.removeEventListener("webglcontextcreationerror",qn,!1),pe.dispose(),Vt.dispose(),Ht.dispose(),ut.dispose(),Nt.dispose(),_t.dispose(),Yt.dispose(),Tt.dispose(),It.dispose(),te.dispose(),te.removeEventListener("sessionstart",hn),te.removeEventListener("sessionend",wn),Yn.stop()};function We(w){w.preventDefault(),Lv("WebGLRenderer: Context Lost."),H=!0}function Oe(){Lv("WebGLRenderer: Context Restored."),H=!1;const w=tt.autoReset,Y=ce.enabled,ht=ce.autoUpdate,st=ce.needsUpdate,rt=ce.type;se(),tt.autoReset=w,ce.enabled=Y,ce.autoUpdate=ht,ce.needsUpdate=st,ce.type=rt}function qn(w){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ii(w){const Y=w.target;Y.removeEventListener("dispose",ii),Qr(Y)}function Qr(w){jr(w),ut.remove(w)}function jr(w){const Y=ut.get(w).programs;Y!==void 0&&(Y.forEach(function(ht){It.releaseProgram(ht)}),w.isShaderMaterial&&It.releaseShaderCache(w))}this.renderBufferDirect=function(w,Y,ht,st,rt,Xt){Y===null&&(Y=At);const Qt=rt.isMesh&&rt.matrixWorld.determinantAffine()<0,Gt=Na(w,Y,ht,st,rt);b.setMaterial(st,Qt);let Zt=ht.index,Kt=1;if(st.wireframe===!0){if(Zt=mt.getWireframeAttribute(ht),Zt===void 0)return;Kt=2}const _e=ht.drawRange,Te=ht.attributes.position;let ee=_e.start*Kt,Pe=(_e.start+_e.count)*Kt;Xt!==null&&(ee=Math.max(ee,Xt.start*Kt),Pe=Math.min(Pe,(Xt.start+Xt.count)*Kt)),Zt!==null?(ee=Math.max(ee,0),Pe=Math.min(Pe,Zt.count)):Te!=null&&(ee=Math.max(ee,0),Pe=Math.min(Pe,Te.count));const je=Pe-ee;if(je<0||je===1/0)return;Yt.setup(rt,st,Gt,ht,Zt);let Je,ye=zt;if(Zt!==null&&(Je=Bt.get(Zt),ye=Mt,ye.setIndex(Je)),rt.isMesh)st.wireframe===!0?(b.setLineWidth(st.wireframeLinewidth*$t()),ye.setMode(V.LINES)):ye.setMode(V.TRIANGLES);else if(rt.isLine){let pn=st.linewidth;pn===void 0&&(pn=1),b.setLineWidth(pn*$t()),rt.isLineSegments?ye.setMode(V.LINES):rt.isLineLoop?ye.setMode(V.LINE_LOOP):ye.setMode(V.LINE_STRIP)}else rt.isPoints?ye.setMode(V.POINTS):rt.isSprite&&ye.setMode(V.TRIANGLES);if(rt.isBatchedMesh)if(le.get("WEBGL_multi_draw"))ye.renderMultiDraw(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount);else{const pn=rt._multiDrawStarts,jt=rt._multiDrawCounts,yn=rt._multiDrawCount,Me=Zt?Bt.get(Zt).bytesPerElement:1,Fn=ut.get(st).currentProgram.getUniforms();for(let ai=0;ai<yn;ai++)Fn.setValue(V,"_gl_DrawID",ai),ye.render(pn[ai]/Me,jt[ai])}else if(rt.isInstancedMesh)ye.renderInstances(ee,je,rt.count);else if(ht.isInstancedBufferGeometry){const pn=ht._maxInstanceCount!==void 0?ht._maxInstanceCount:1/0,jt=Math.min(ht.instanceCount,pn);ye.renderInstances(ee,je,jt)}else ye.render(ee,je)};function $r(w,Y,ht,st){q!==null&&w.isNodeMaterial&&q.setObject(st,w),wt===!0&&re.setState(w,ht,!1),w.transparent===!0&&w.side===wi&&w.forceSinglePass===!1?(w.side=Wn,w.needsUpdate=!0,La(w,Y,st),w.side=Ps,w.needsUpdate=!0,La(w,Y,st),w.side=wi):La(w,Y,st)}this.compile=function(w,Y,ht=null){ht===null&&(ht=w),q!==null&&q.renderStart(w,Y,ht),R=Ht.get(ht),R.init(Y),E.push(R),ht.traverseVisible(function(rt){rt.isLight&&rt.layers.test(Y.layers)&&(R.pushLight(rt),rt.castShadow&&R.pushShadow(rt))}),w!==ht&&w.traverseVisible(function(rt){rt.isLight&&rt.layers.test(Y.layers)&&(R.pushLight(rt),rt.castShadow&&R.pushShadow(rt))}),R.setupLights(),q!==null&&q.updateLights(R.state.lightsArray),Ut=this.localClippingEnabled,wt=re.init(this.clippingPlanes,Ut),wt===!0&&re.setGlobalState(this.clippingPlanes,Y),q!==null&&ce.render(R.state.shadowsArray,ht,Y);const st=new Set;return w.traverse(function(rt){if(!(rt.isMesh||rt.isPoints||rt.isLine||rt.isSprite))return;const Xt=rt.material;if(Xt)if(Array.isArray(Xt))for(let Qt=0;Qt<Xt.length;Qt++){const Gt=Xt[Qt];$r(Gt,ht,Y,rt),st.add(Gt)}else $r(Xt,ht,Y,rt),st.add(Xt)}),R=E.pop(),q!==null&&q.renderEnd(),st},this.compileAsync=function(w,Y,ht=null){const st=this.compile(w,Y,ht);return new Promise(rt=>{function Xt(){if(st.forEach(function(Qt){const Zt=ut.get(Qt).currentProgram;(Zt===void 0||Zt.isReady())&&st.delete(Qt)}),st.size===0){rt(w);return}setTimeout(Xt,10)}le.get("KHR_parallel_shader_compile")!==null?Xt():setTimeout(Xt,10)})};let Xs=null;function Gi(w){Xs&&Xs(w)}function hn(){Yn.stop()}function wn(){Yn.start()}const Yn=new Mx;Yn.setAnimationLoop(Gi),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(w){Xs=w,te.setAnimationLoop(w),w===null?Yn.stop():Yn.start()},te.addEventListener("sessionstart",hn),te.addEventListener("sessionend",wn),this.render=function(w,Y){if(Y!==void 0&&Y.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;q!==null&&q.renderStart(w,Y);const ht=te.enabled===!0&&te.isPresenting===!0,st=N!==null&&(nt===null||ht)&&N.begin(F,nt);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(te.cameraAutoUpdate===!0&&te.updateCamera(Y),Y=te.getCamera()),w.isScene===!0&&w.onBeforeRender(F,w,Y,nt),R=Ht.get(w,E.length),R.init(Y),R.state.textureUnits=vt.getTextureUnits(),E.push(R),Lt.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),yt.setFromProjectionMatrix(Lt,Ji,Y.reversedDepth),Ut=this.localClippingEnabled,wt=re.init(this.clippingPlanes,Ut),P=Vt.get(w,L.length),P.init(),L.push(P),te.enabled===!0&&te.isPresenting===!0){const Qt=F.xr.getDepthSensingMesh();Qt!==null&&cs(Qt,Y,-1/0,F.sortObjects)}cs(w,Y,0,F.sortObjects),P.finish(),q!==null&&q.updateLights(R.state.lightsArray),F.sortObjects===!0&&P.sort(Dt,ie),Ct=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ct&&pe.addToRenderList(P,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),wt===!0&&re.beginShadows();const rt=R.state.shadowsArray;if(ce.render(rt,w,Y),wt===!0&&re.endShadows(),(st&&N.hasRenderPass())===!1){const Qt=P.opaque,Gt=P.transmissive;if(R.setupLights(),Y.isArrayCamera){const Zt=Y.cameras;if(Gt.length>0)for(let Kt=0,_e=Zt.length;Kt<_e;Kt++){const Te=Zt[Kt];yl(Qt,Gt,w,Te)}Ct&&pe.render(w);for(let Kt=0,_e=Zt.length;Kt<_e;Kt++){const Te=Zt[Kt];Sl(P,w,Te,Te.viewport)}}else Gt.length>0&&yl(Qt,Gt,w,Y),Ct&&pe.render(w),Sl(P,w,Y)}nt!==null&&X===0&&(vt.updateMultisampleRenderTarget(nt),vt.updateRenderTargetMipmap(nt)),st&&N.end(F),w.isScene===!0&&w.onAfterRender(F,w,Y),Yt.resetDefaultState(),it=-1,ot=null,E.pop(),E.length>0?(R=E[E.length-1],vt.setTextureUnits(R.state.textureUnits),wt===!0&&re.setGlobalState(F.clippingPlanes,R.state.camera)):R=null,L.pop(),L.length>0?P=L[L.length-1]:P=null,q!==null&&q.renderEnd()};function cs(w,Y,ht,st){if(w.visible===!1)return;if(w.layers.test(Y.layers)){if(w.isGroup)ht=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(Y);else if(w.isLightProbeGrid)R.pushLightProbeGrid(w);else if(w.isLight)R.pushLight(w),w.castShadow&&R.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(yt)){st&&xt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Lt);const Qt=_t.update(w),Gt=w.material;Gt.visible&&P.push(w,Qt,Gt,ht,xt.z,null,Y)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(yt))){const Qt=_t.update(w),Gt=w.material;if(st&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),xt.copy(w.boundingSphere.center)):(Qt.boundingSphere===null&&Qt.computeBoundingSphere(),xt.copy(Qt.boundingSphere.center)),xt.applyMatrix4(w.matrixWorld).applyMatrix4(Lt)),Array.isArray(Gt)){const Zt=Qt.groups;for(let Kt=0,_e=Zt.length;Kt<_e;Kt++){const Te=Zt[Kt],ee=Gt[Te.materialIndex];ee&&ee.visible&&P.push(w,Qt,ee,ht,xt.z,Te,Y)}}else Gt.visible&&P.push(w,Qt,Gt,ht,xt.z,null,Y)}}const Xt=w.children;for(let Qt=0,Gt=Xt.length;Qt<Gt;Qt++)cs(Xt[Qt],Y,ht,st)}function Sl(w,Y,ht,st){const{opaque:rt,transmissive:Xt,transparent:Qt}=w;R.setupLightsView(ht),wt===!0&&re.setGlobalState(F.clippingPlanes,ht),st&&b.viewport(U.copy(st)),rt.length>0&&us(rt,Y,ht),Xt.length>0&&us(Xt,Y,ht),Qt.length>0&&us(Qt,Y,ht),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function yl(w,Y,ht,st){if((ht.isScene===!0?ht.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[st.id]===void 0){const ee=le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[st.id]=new mi(1,1,{generateMipmaps:!0,type:ee?Ri:pi,minFilter:Ns,samples:Math.max(4,z.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ue.workingColorSpace})}const Xt=R.state.transmissionRenderTarget[st.id],Qt=st.viewport||U;Xt.setSize(Qt.z*F.transmissionResolutionScale,Qt.w*F.transmissionResolutionScale);const Gt=F.getRenderTarget(),Zt=F.getActiveCubeFace(),Kt=F.getActiveMipmapLevel();F.setRenderTarget(Xt),F.getClearColor(Rt),Pt=F.getClearAlpha(),Pt<1&&F.setClearColor(16777215,.5),F.clear(),Ct&&pe.render(ht);const _e=F.toneMapping;F.toneMapping=Qi;const Te=st.viewport;if(st.viewport!==void 0&&(st.viewport=void 0),R.setupLightsView(st),wt===!0&&re.setGlobalState(F.clippingPlanes,st),us(w,ht,st),vt.updateMultisampleRenderTarget(Xt),vt.updateRenderTargetMipmap(Xt),le.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let Pe=0,je=Y.length;Pe<je;Pe++){const Je=Y[Pe],{object:ye,geometry:pn,material:jt,group:yn}=Je;if(jt.side===wi&&ye.layers.test(st.layers)){const Me=jt.side;jt.side=Wn,jt.needsUpdate=!0,Ua(ye,ht,st,pn,jt,yn),jt.side=Me,jt.needsUpdate=!0,ee=!0}}ee===!0&&(vt.updateMultisampleRenderTarget(Xt),vt.updateRenderTargetMipmap(Xt))}F.setRenderTarget(Gt,Zt,Kt),F.setClearColor(Rt,Pt),Te!==void 0&&(st.viewport=Te),F.toneMapping=_e}function us(w,Y,ht){const st=Y.isScene===!0?Y.overrideMaterial:null;for(let rt=0,Xt=w.length;rt<Xt;rt++){const Qt=w[rt],{object:Gt,geometry:Zt,group:Kt}=Qt;let _e=Qt.material;_e.allowOverride===!0&&st!==null&&(_e=st),Gt.layers.test(ht.layers)&&Ua(Gt,Y,ht,Zt,_e,Kt)}}function Ua(w,Y,ht,st,rt,Xt){q!==null&&rt.isNodeMaterial&&q.setObject(w,rt),w.onBeforeRender(F,Y,ht,st,rt,Xt),w.modelViewMatrix.multiplyMatrices(ht.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),rt.onBeforeRender(F,Y,ht,st,w,Xt),rt.transparent===!0&&rt.side===wi&&rt.forceSinglePass===!1?(rt.side=Wn,rt.needsUpdate=!0,F.renderBufferDirect(ht,Y,st,rt,w,Xt),rt.side=Ps,rt.needsUpdate=!0,F.renderBufferDirect(ht,Y,st,rt,w,Xt),rt.side=wi):F.renderBufferDirect(ht,Y,st,rt,w,Xt),w.onAfterRender(F,Y,ht,st,rt,Xt)}function La(w,Y,ht){Y.isScene!==!0&&(Y=At);const st=ut.get(w),rt=R.state.lights,Xt=R.state.shadowsArray,Qt=rt.state.version,Gt=It.getParameters(w,rt.state,Xt,Y,ht,R.state.lightProbeGridArray),Zt=It.getProgramCacheKey(Gt);let Kt=st.programs;st.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?Y.environment:null,st.fog=Y.fog;const _e=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;st.envMap=Nt.get(w.envMap||st.environment,_e),st.envMapRotation=st.environment!==null&&w.envMap===null?Y.environmentRotation:w.envMapRotation,Kt===void 0&&(w.addEventListener("dispose",ii),Kt=new Map,st.programs=Kt);let Te=Kt.get(Zt);if(Te!==void 0){if(st.currentProgram===Te&&st.lightsStateVersion===Qt)return na(w,Gt),Te}else Gt.uniforms=It.getUniforms(w),q!==null&&w.isNodeMaterial&&q.build(w,ht,Gt),w.onBeforeCompile(Gt,F),Te=It.acquireProgram(Gt,Zt),Kt.set(Zt,Te),st.uniforms=Gt.uniforms;const ee=st.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(ee.clippingPlanes=re.uniform),na(w,Gt),st.needsLights=Ml(w),st.lightsStateVersion=Qt,st.needsLights&&(ee.ambientLightColor.value=rt.state.ambient,ee.lightProbe.value=rt.state.probe,ee.sunLights.value=rt.state.sun,ee.sunLightShadows.value=rt.state.sunShadow,ee.directionalLights.value=rt.state.directional,ee.directionalLightShadows.value=rt.state.directionalShadow,ee.spotLights.value=rt.state.spot,ee.spotLightShadows.value=rt.state.spotShadow,ee.rectAreaLights.value=rt.state.rectArea,ee.ltc_1.value=rt.state.rectAreaLTC1,ee.ltc_2.value=rt.state.rectAreaLTC2,ee.pointLights.value=rt.state.point,ee.pointLightShadows.value=rt.state.pointShadow,ee.hemisphereLights.value=rt.state.hemi,ee.sunShadowMatrix.value=rt.state.sunShadowMatrix,ee.sunShadowCascade.value=rt.state.sunShadowCascade,ee.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,ee.spotLightMatrix.value=rt.state.spotLightMatrix,ee.spotLightMap.value=rt.state.spotLightMap,ee.pointShadowMatrix.value=rt.state.pointShadowMatrix),st.lightProbeGrid=R.state.lightProbeGridArray.length>0,st.currentProgram=Te,st.uniformsList=null,Te}function ea(w){if(w.uniformsList===null){const Y=w.currentProgram.getUniforms();w.uniformsList=cu.seqWithValue(Y.seq,w.uniforms)}return w.uniformsList}function na(w,Y){const ht=ut.get(w);ht.outputColorSpace=Y.outputColorSpace,ht.batching=Y.batching,ht.batchingColor=Y.batchingColor,ht.instancing=Y.instancing,ht.instancingColor=Y.instancingColor,ht.instancingMorph=Y.instancingMorph,ht.skinning=Y.skinning,ht.morphTargets=Y.morphTargets,ht.morphNormals=Y.morphNormals,ht.morphColors=Y.morphColors,ht.morphTargetsCount=Y.morphTargetsCount,ht.numClippingPlanes=Y.numClippingPlanes,ht.numIntersection=Y.numClipIntersection,ht.vertexAlphas=Y.vertexAlphas,ht.vertexTangents=Y.vertexTangents,ht.toneMapping=Y.toneMapping}function fs(w,Y){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;A.setFromMatrixPosition(Y.matrixWorld);for(let ht=0,st=w.length;ht<st;ht++){const rt=w[ht];if(rt.texture!==null&&rt.boundingBox.containsPoint(A))return rt}return null}function Na(w,Y,ht,st,rt){Y.isScene!==!0&&(Y=At),vt.resetTextureUnits();const Xt=Y.fog,Qt=st.isMeshStandardMaterial||st.isMeshLambertMaterial||st.isMeshPhongMaterial?Y.environment:null,Gt=nt===null?F.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Ue.workingColorSpace,Zt=st.isMeshStandardMaterial||st.isMeshLambertMaterial&&!st.envMap||st.isMeshPhongMaterial&&!st.envMap,Kt=Nt.get(st.envMap||Qt,Zt),_e=st.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,Te=!!ht.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),ee=!!ht.morphAttributes.position,Pe=!!ht.morphAttributes.normal,je=!!ht.morphAttributes.color;let Je=Qi;st.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Je=F.toneMapping);const ye=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,pn=ye!==void 0?ye.length:0,jt=ut.get(st),yn=R.state.lights;if(wt===!0&&(Ut===!0||w!==ot)){const qe=w===ot&&st.id===it;re.setState(st,w,qe)}let Me=!1;st.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==yn.state.version||jt.outputColorSpace!==Gt||rt.isBatchedMesh&&jt.batching===!1||!rt.isBatchedMesh&&jt.batching===!0||rt.isBatchedMesh&&jt.batchingColor===!0&&rt._colorsTexture===null||rt.isBatchedMesh&&jt.batchingColor===!1&&rt._colorsTexture!==null||rt.isInstancedMesh&&jt.instancing===!1||!rt.isInstancedMesh&&jt.instancing===!0||rt.isSkinnedMesh&&jt.skinning===!1||!rt.isSkinnedMesh&&jt.skinning===!0||rt.isInstancedMesh&&jt.instancingColor===!0&&rt.instanceColor===null||rt.isInstancedMesh&&jt.instancingColor===!1&&rt.instanceColor!==null||rt.isInstancedMesh&&jt.instancingMorph===!0&&rt.morphTexture===null||rt.isInstancedMesh&&jt.instancingMorph===!1&&rt.morphTexture!==null||jt.envMap!==Kt||st.fog===!0&&jt.fog!==Xt||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==re.numPlanes||jt.numIntersection!==re.numIntersection)||jt.vertexAlphas!==_e||jt.vertexTangents!==Te||jt.morphTargets!==ee||jt.morphNormals!==Pe||jt.morphColors!==je||jt.toneMapping!==Je||jt.morphTargetsCount!==pn||!!jt.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(Me=!0):(Me=!0,jt.__version=st.version);let Fn=jt.currentProgram;Me===!0&&(Fn=La(st,Y,rt),q&&st.isNodeMaterial&&q.onUpdateProgram(st,Fn,jt));let ai=!1,Hn=!1,Oa=!1;const Be=Fn.getUniforms(),nn=jt.uniforms;if(b.useProgram(Fn.program)&&(ai=!0,Hn=!0,Oa=!0),st.id!==it&&(it=st.id,Hn=!0),jt.needsLights){const qe=fs(R.state.lightProbeGridArray,rt);jt.lightProbeGrid!==qe&&(jt.lightProbeGrid=qe,Hn=!0)}if(ai||ot!==w){b.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Be.setValue(V,"projectionMatrix",w.projectionMatrix),Be.setValue(V,"viewMatrix",w.matrixWorldInverse);const Vi=Be.map.cameraPosition;Vi!==void 0&&Vi.setValue(V,$.setFromMatrixPosition(w.matrixWorld)),z.logarithmicDepthBuffer&&Be.setValue(V,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&Be.setValue(V,"isOrthographic",w.isOrthographicCamera===!0),ot!==w&&(ot=w,Hn=!0,Oa=!0)}if(jt.needsLights&&(yn.state.sunShadowMap.length>0&&Be.setValue(V,"sunShadowMap",yn.state.sunShadowMap,vt),yn.state.directionalShadowMap.length>0&&Be.setValue(V,"directionalShadowMap",yn.state.directionalShadowMap,vt),yn.state.spotShadowMap.length>0&&Be.setValue(V,"spotShadowMap",yn.state.spotShadowMap,vt),yn.state.pointShadowMap.length>0&&Be.setValue(V,"pointShadowMap",yn.state.pointShadowMap,vt)),rt.isSkinnedMesh){Be.setOptional(V,rt,"bindMatrix"),Be.setOptional(V,rt,"bindMatrixInverse");const qe=rt.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),Be.setValue(V,"boneTexture",qe.boneTexture,vt))}rt.isBatchedMesh&&(Be.setOptional(V,rt,"batchingTexture"),Be.setValue(V,"batchingTexture",rt._matricesTexture,vt),Be.setOptional(V,rt,"batchingIdTexture"),Be.setValue(V,"batchingIdTexture",rt._indirectTexture,vt),Be.setOptional(V,rt,"batchingColorTexture"),rt._colorsTexture!==null&&Be.setValue(V,"batchingColorTexture",rt._colorsTexture,vt));const gi=ht.morphAttributes;if((gi.position!==void 0||gi.normal!==void 0||gi.color!==void 0)&&Q.update(rt,ht,Fn),(Hn||jt.receiveShadow!==rt.receiveShadow)&&(jt.receiveShadow=rt.receiveShadow,Be.setValue(V,"receiveShadow",rt.receiveShadow)),(st.isMeshStandardMaterial||st.isMeshLambertMaterial||st.isMeshPhongMaterial)&&st.envMap===null&&Y.environment!==null&&(nn.envMapIntensity.value=Y.environmentIntensity),nn.dfgLUT!==void 0&&(nn.dfgLUT.value=o3()),Hn){if(Be.setValue(V,"toneMappingExposure",F.toneMappingExposure),jt.needsLights&&dn(nn,Oa),Xt&&st.fog===!0&&Jt.refreshFogUniforms(nn,Xt),Jt.refreshMaterialUniforms(nn,st,gt,at,R.state.transmissionRenderTarget[w.id]),jt.needsLights&&jt.lightProbeGrid){const qe=jt.lightProbeGrid;nn.probesSH.value=qe.texture,nn.probesMin.value.copy(qe.boundingBox.min),nn.probesMax.value.copy(qe.boundingBox.max),nn.probesResolution.value.copy(qe.resolution)}cu.upload(V,ea(jt),nn,vt)}if(st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(cu.upload(V,ea(jt),nn,vt),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&Be.setValue(V,"center",rt.center),Be.setValue(V,"modelViewMatrix",rt.modelViewMatrix),Be.setValue(V,"normalMatrix",rt.normalMatrix),Be.setValue(V,"modelMatrix",rt.matrixWorld),st.uniformsGroups!==void 0){const qe=st.uniformsGroups;for(let Vi=0,Di=qe.length;Vi<Di;Vi++){const vi=qe[Vi];Tt.update(vi,Fn),Tt.bind(vi,Fn)}}return Fn}function dn(w,Y){w.ambientLightColor.needsUpdate=Y,w.lightProbe.needsUpdate=Y,w.sunLights.needsUpdate=Y,w.sunLightShadows.needsUpdate=Y,w.directionalLights.needsUpdate=Y,w.directionalLightShadows.needsUpdate=Y,w.pointLights.needsUpdate=Y,w.pointLightShadows.needsUpdate=Y,w.spotLights.needsUpdate=Y,w.spotLightShadows.needsUpdate=Y,w.rectAreaLights.needsUpdate=Y,w.hemisphereLights.needsUpdate=Y}function Ml(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(w,Y,ht){const st=ut.get(w);st.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,st.__autoAllocateDepthBuffer===!1&&(st.__useRenderToTexture=!1),ut.get(w.texture).__webglTexture=Y,ut.get(w.depthTexture).__webglTexture=st.__autoAllocateDepthBuffer?void 0:ht,st.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,Y){const ht=ut.get(w);ht.__webglFramebuffer=Y,ht.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(w,Y=0,ht=0){nt=w,B=Y,X=ht;let st=null,rt=!1,Xt=!1;if(w){const Gt=ut.get(w);if(Gt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(V.FRAMEBUFFER,Gt.__webglFramebuffer),U.copy(w.viewport),j.copy(w.scissor),dt=w.scissorTest,b.viewport(U),b.scissor(j),b.setScissorTest(dt),it=-1;return}else if(Gt.__webglFramebuffer===void 0)vt.setupRenderTarget(w);else if(Gt.__hasExternalTextures)vt.rebindTextures(w,ut.get(w.texture).__webglTexture,ut.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const _e=w.depthTexture;if(Gt.__boundDepthTexture!==_e){if(_e!==null&&ut.has(_e)&&(w.width!==_e.image.width||w.height!==_e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");vt.setupDepthRenderbuffer(w)}}const Zt=w.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Xt=!0);const Kt=ut.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Kt[Y])?st=Kt[Y][ht]:st=Kt[Y],rt=!0):w.samples>0&&vt.useMultisampledRTT(w)===!1?st=ut.get(w).__webglMultisampledFramebuffer:Array.isArray(Kt)?st=Kt[ht]:st=Kt,U.copy(w.viewport),j.copy(w.scissor),dt=w.scissorTest}else U.copy(kt).multiplyScalar(gt).floor(),j.copy(ue).multiplyScalar(gt).floor(),dt=Le;if(ht!==0&&(st=K),b.bindFramebuffer(V.FRAMEBUFFER,st)&&b.drawBuffers(w,st),b.viewport(U),b.scissor(j),b.setScissorTest(dt),rt){const Gt=ut.get(w.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Gt.__webglTexture,ht)}else if(Xt){const Gt=Y;for(let Zt=0;Zt<w.textures.length;Zt++){const Kt=ut.get(w.textures[Zt]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+Zt,Kt.__webglTexture,ht,Gt)}}else if(w!==null&&ht!==0){const Gt=ut.get(w.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Gt.__webglTexture,ht)}it=-1};function to(w){const Y=ut.get(w);return(Y.__readFormat!==w.format||Y.__readType!==w.type)&&(Y.__readFormat=w.format,Y.__readType=w.type,Y.__formatReadable=z.textureFormatReadable(w.format),Y.__typeReadable=z.textureTypeReadable(w.type)),Y}this.readRenderTargetPixels=function(w,Y,ht,st,rt,Xt,Qt,Gt=0){if(!(w&&w.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Zt=ut.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Qt!==void 0&&(Zt=Zt[Qt]),Zt){b.bindFramebuffer(V.FRAMEBUFFER,Zt);try{const Kt=w.textures[Gt],_e=Kt.format,Te=Kt.type;w.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Gt);const ee=to(Kt);if(ee.__formatReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ee.__typeReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=w.width-st&&ht>=0&&ht<=w.height-rt&&V.readPixels(Y,ht,st,rt,Ft.convert(_e),Ft.convert(Te),Xt)}finally{const Kt=nt!==null?ut.get(nt).__webglFramebuffer:null;b.bindFramebuffer(V.FRAMEBUFFER,Kt)}}},this.readRenderTargetPixelsAsync=async function(w,Y,ht,st,rt,Xt,Qt,Gt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Zt=ut.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Qt!==void 0&&(Zt=Zt[Qt]),Zt)if(Y>=0&&Y<=w.width-st&&ht>=0&&ht<=w.height-rt){b.bindFramebuffer(V.FRAMEBUFFER,Zt);const Kt=w.textures[Gt],_e=Kt.format,Te=Kt.type;w.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Gt);const ee=to(Kt);if(ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pe=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,Pe),V.bufferData(V.PIXEL_PACK_BUFFER,Xt.byteLength,V.STREAM_READ),V.readPixels(Y,ht,st,rt,Ft.convert(_e),Ft.convert(Te),0),V.bindBuffer(V.PIXEL_PACK_BUFFER,null);const je=nt!==null?ut.get(nt).__webglFramebuffer:null;b.bindFramebuffer(V.FRAMEBUFFER,je);const Je=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await CM(V,Je,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,Pe),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Xt),V.bindBuffer(V.PIXEL_PACK_BUFFER,null),V.deleteBuffer(Pe),V.deleteSync(Je),Xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,Y=null,ht=0){const st=Math.pow(2,-ht),rt=Math.floor(w.image.width*st),Xt=Math.floor(w.image.height*st),Qt=Y!==null?Y.x:0,Gt=Y!==null?Y.y:0;vt.setTexture2D(w,0),V.copyTexSubImage2D(V.TEXTURE_2D,ht,0,0,Qt,Gt,rt,Xt),b.unbindTexture()},this.copyTextureToTexture=function(w,Y,ht=null,st=null,rt=0,Xt=0){let Qt,Gt,Zt,Kt,_e,Te,ee,Pe,je;const Je=w.isCompressedTexture?w.mipmaps[Xt]:w.image;if(ht!==null)Qt=ht.max.x-ht.min.x,Gt=ht.max.y-ht.min.y,Zt=ht.isBox3?ht.max.z-ht.min.z:1,Kt=ht.min.x,_e=ht.min.y,Te=ht.isBox3?ht.min.z:0;else{const nn=Math.pow(2,-rt);Qt=Math.floor(Je.width*nn),Gt=Math.floor(Je.height*nn),w.isDataArrayTexture?Zt=Je.depth:w.isData3DTexture?Zt=Math.floor(Je.depth*nn):Zt=1,Kt=0,_e=0,Te=0}st!==null?(ee=st.x,Pe=st.y,je=st.z):(ee=0,Pe=0,je=0);const ye=Ft.convert(Y.format),pn=Ft.convert(Y.type);let jt;Y.isData3DTexture?(vt.setTexture3D(Y,0),jt=V.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(vt.setTexture2DArray(Y,0),jt=V.TEXTURE_2D_ARRAY):(vt.setTexture2D(Y,0),jt=V.TEXTURE_2D),b.activeTexture(V.TEXTURE0),b.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,Y.flipY),b.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),b.pixelStorei(V.UNPACK_ALIGNMENT,Y.unpackAlignment);const yn=b.getParameter(V.UNPACK_ROW_LENGTH),Me=b.getParameter(V.UNPACK_IMAGE_HEIGHT),Fn=b.getParameter(V.UNPACK_SKIP_PIXELS),ai=b.getParameter(V.UNPACK_SKIP_ROWS),Hn=b.getParameter(V.UNPACK_SKIP_IMAGES);b.pixelStorei(V.UNPACK_ROW_LENGTH,Je.width),b.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Je.height),b.pixelStorei(V.UNPACK_SKIP_PIXELS,Kt),b.pixelStorei(V.UNPACK_SKIP_ROWS,_e),b.pixelStorei(V.UNPACK_SKIP_IMAGES,Te);const Oa=w.isDataArrayTexture||w.isData3DTexture,Be=Y.isDataArrayTexture||Y.isData3DTexture;if(w.isDepthTexture){const nn=ut.get(w),gi=ut.get(Y),qe=ut.get(nn.__renderTarget),Vi=ut.get(gi.__renderTarget);b.bindFramebuffer(V.READ_FRAMEBUFFER,qe.__webglFramebuffer),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let Di=0;Di<Zt;Di++)Oa&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ut.get(w).__webglTexture,rt,Te+Di),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ut.get(Y).__webglTexture,Xt,je+Di)),V.blitFramebuffer(Kt,_e,Qt,Gt,ee,Pe,Qt,Gt,V.DEPTH_BUFFER_BIT,V.NEAREST);b.bindFramebuffer(V.READ_FRAMEBUFFER,null),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(rt!==0||w.isRenderTargetTexture||ut.has(w)){const nn=ut.get(w),gi=ut.get(Y);b.bindFramebuffer(V.READ_FRAMEBUFFER,G),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,J);for(let qe=0;qe<Zt;qe++)Oa?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,nn.__webglTexture,rt,Te+qe):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,nn.__webglTexture,rt),Be?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,gi.__webglTexture,Xt,je+qe):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,gi.__webglTexture,Xt),rt!==0?V.blitFramebuffer(Kt,_e,Qt,Gt,ee,Pe,Qt,Gt,V.COLOR_BUFFER_BIT,V.NEAREST):Be?V.copyTexSubImage3D(jt,Xt,ee,Pe,je+qe,Kt,_e,Qt,Gt):V.copyTexSubImage2D(jt,Xt,ee,Pe,Kt,_e,Qt,Gt);b.bindFramebuffer(V.READ_FRAMEBUFFER,null),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Be?w.isDataTexture||w.isData3DTexture?V.texSubImage3D(jt,Xt,ee,Pe,je,Qt,Gt,Zt,ye,pn,Je.data):Y.isCompressedArrayTexture?V.compressedTexSubImage3D(jt,Xt,ee,Pe,je,Qt,Gt,Zt,ye,Je.data):V.texSubImage3D(jt,Xt,ee,Pe,je,Qt,Gt,Zt,ye,pn,Je):w.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Xt,ee,Pe,Qt,Gt,ye,pn,Je.data):w.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Xt,ee,Pe,Je.width,Je.height,ye,Je.data):V.texSubImage2D(V.TEXTURE_2D,Xt,ee,Pe,Qt,Gt,ye,pn,Je);b.pixelStorei(V.UNPACK_ROW_LENGTH,yn),b.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Me),b.pixelStorei(V.UNPACK_SKIP_PIXELS,Fn),b.pixelStorei(V.UNPACK_SKIP_ROWS,ai),b.pixelStorei(V.UNPACK_SKIP_IMAGES,Hn),Xt===0&&Y.generateMipmaps&&V.generateMipmap(jt),b.unbindTexture()},this.initRenderTarget=function(w){ut.get(w).__webglFramebuffer===void 0&&vt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?vt.setTextureCube(w,0):w.isData3DTexture?vt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?vt.setTexture2DArray(w,0):vt.setTexture2D(w,0),b.unbindTexture()},this.resetState=function(){B=0,X=0,nt=null,b.reset(),Yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ue._getUnpackColorSpace()}}class bu extends ln{constructor(t,n={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,o=n.color!==void 0?new ve(n.color):new ve(8355711),c=n.textureWidth||512,u=n.textureHeight||512,h=n.clipBias||0,m=n.shader||bu.ReflectorShader,p=n.multisample!==void 0?n.multisample:4,v=new ba,_=new W,g=new W,x=new W,T=new Ge,D=new W(0,0,-1),M=new en,S=new W,O=new W,I=new en,A=new Ge,P=new mi(c,u,{samples:p,type:Ri}),R=new Ci({name:m.name!==void 0?m.name:"unspecified",uniforms:Sx.clone(m.uniforms),fragmentShader:m.fragmentShader,vertexShader:m.vertexShader});R.uniforms.tDiffuse.value=P.texture,R.uniforms.color.value=o,R.uniforms.textureMatrix.value=A,this.material=R,this.onBeforeRender=function(L,E,N){const F=this.getReflectionCamera(N);if(g.setFromMatrixPosition(a.matrixWorld),x.setFromMatrixPosition(N.matrixWorld),T.extractRotation(a.matrixWorld),_.set(0,0,1),_.applyMatrix4(T),S.subVectors(g,x),S.dot(_)>0===!0&&this.forceUpdate===!1)return;S.reflect(_).negate(),S.add(g),T.extractRotation(N.matrixWorld),D.set(0,0,-1),D.applyMatrix4(T),D.add(x),O.subVectors(g,D),O.reflect(_).negate(),O.add(g),F.position.copy(S),F.up.set(0,1,0),F.up.applyMatrix4(T),F.up.reflect(_),F.lookAt(O),F.far=N.far,F.updateMatrixWorld(),F.projectionMatrix.copy(N.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(F.projectionMatrix),A.multiply(F.matrixWorldInverse),A.multiply(a.matrixWorld),v.setFromNormalAndCoplanarPoint(_,g),v.applyMatrix4(F.matrixWorldInverse),M.set(v.normal.x,v.normal.y,v.normal.z,v.constant);const q=F.projectionMatrix;F.isOrthographicCamera?(I.x=(Math.sign(M.x)+q.elements[8])/q.elements[0],I.y=(Math.sign(M.y)+q.elements[9])/q.elements[5],I.z=-N.far,I.w=1):(I.x=(Math.sign(M.x)+q.elements[8])/q.elements[0],I.y=(Math.sign(M.y)+q.elements[9])/q.elements[5],I.z=-1,I.w=(1+q.elements[10])/q.elements[14]),M.multiplyScalar(2/M.dot(I)),q.elements[2]=M.x,q.elements[6]=M.y,F.isOrthographicCamera?(q.elements[10]=M.z-h,q.elements[14]=M.w-1):(q.elements[10]=M.z+1-h,q.elements[14]=M.w),a.visible=!1;const K=L.getRenderTarget(),G=L.xr.enabled,J=L.shadowMap.autoUpdate;L.xr.enabled=!1,L.shadowMap.autoUpdate=!1,L.setRenderTarget(P),L.state.buffers.depth.setMask(!0),L.autoClear===!1&&L.clear(),L.render(E,F),L.xr.enabled=G,L.shadowMap.autoUpdate=J,L.setRenderTarget(K);const B=N.viewport;B!==void 0&&L.state.viewport(B),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return P},this.dispose=function(){P.dispose(),a.material.dispose()},this.getReflectionCamera=function(L){let E=this._reflectionCameras.get(L);return E===void 0&&(E=L.clone(),this._reflectionCameras.set(L,E)),E}}}bu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};class c3 extends nx{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new ks;t.deleteAttribute("uv");const n=new ei({side:Wn}),a=new ei,o=new nl(16777215,900,28,2);o.position.set(.418,16.199,.3),this.add(o);const c=new ln(t,n);c.position.set(-.757,13.219,.717),c.scale.set(31.713,28.305,28.591),this.add(c);const u=new p1(t,a,6),h=new Sn;h.position.set(-10.906,2.009,1.846),h.rotation.set(0,-.195,0),h.scale.set(2.328,7.905,4.651),h.updateMatrix(),u.setMatrixAt(0,h.matrix),h.position.set(-5.607,-.754,-.758),h.rotation.set(0,.994,0),h.scale.set(1.97,1.534,3.955),h.updateMatrix(),u.setMatrixAt(1,h.matrix),h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),h.updateMatrix(),u.setMatrixAt(2,h.matrix),h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),h.updateMatrix(),u.setMatrixAt(3,h.matrix),h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),h.updateMatrix(),u.setMatrixAt(4,h.matrix),h.position.set(-2.193,-.369,-5.547),h.rotation.set(0,.516,0),h.scale.set(3.875,3.487,2.986),h.updateMatrix(),u.setMatrixAt(5,h.matrix),this.add(u);const m=new ln(t,Ir(50));m.position.set(-16.116,14.37,8.208),m.scale.set(.1,2.428,2.739),this.add(m);const p=new ln(t,Ir(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const v=new ln(t,Ir(17));v.position.set(14.904,12.198,-1.832),v.scale.set(.15,4.265,6.331),this.add(v);const _=new ln(t,Ir(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const g=new ln(t,Ir(20));g.position.set(3.235,11.486,-12.541),g.scale.set(2.5,2,.1),this.add(g);const x=new ln(t,Ir(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const t=new Set;this.traverse(n=>{n.isMesh&&(t.add(n.geometry),t.add(n.material))});for(const n of t)n.dispose()}}function Ir(r){return new $1({color:0,emissive:16777215,emissiveIntensity:r})}const u3={follow:.09,settle:.45},O_=2.2;function f3(r,t,n){const a=o=>Number.isFinite(o)?o:0;return{yaw:n.yaw*Math.tanh(a(r)*O_),pitch:-n.pitch*Math.tanh(a(t)*O_)}}function P_(r,t,n,a,o){const c=2/a,u=c*o,h=1/(1+u+.48*u*u+.235*u*u*u),m=r-t,p=(n+c*m)*o,v=t+(m+p)*h;return t-r>0==v>t?[t,0]:[v,(n-c*p)*h]}class h3{constructor(t,n=u3){this.limit=t,this.feel=n,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(t,n){const a=f3(t,n,this.limit);this.targetYaw=a.yaw,this.targetPitch=a.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(t){if(!(t>0))return;const n=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=P_(this.yaw,this.targetYaw,this.yawVelocity,n,t),[this.pitch,this.pitchVelocity]=P_(this.pitch,this.targetPitch,this.pitchVelocity,n,t)}}function Dx(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function d3(r){const t=Dx(r),n=128,a=Float32Array.from({length:n*n},t);return(o,c)=>{const u=Math.floor(o),h=Math.floor(c),m=o-u,p=c-h,v=m*m*(3-2*m),_=p*p*(3-2*p),g=a[(h&127)*n+(u&127)],x=a[(h&127)*n+(u+1&127)],T=a[(h+1&127)*n+(u&127)],D=a[(h+1&127)*n+(u+1&127)];return g+(x-g)*v+(T-g)*_+(g-x-T+D)*v*_}}function nu(r){return Math.max(0,Math.min(255,Math.round(r)))}function p3(){const r=[],t=d3(36092),n=Dx(110640),a=(R,L,E)=>{const N=Array.from({length:3},()=>{const K=document.createElement("canvas");return K.width=R,K.height=L,K}),F=N.map(K=>{const G=K.getContext("2d");if(!G)throw new Error("Cafe surface canvas unavailable");return G}),H=F.map(K=>K.createImageData(R,L));for(let K=0;K<L;K++)for(let G=0;G<R;G++){const[J,B,X,nt,it]=E(G/R,K/L),ot=(K*R+G)*4;H[0].data[ot]=nu(J),H[0].data[ot+1]=nu(B),H[0].data[ot+2]=nu(X),H[0].data[ot+3]=255;for(let U=1;U<3;U++){const j=nu((U===1?nt:it)*255);H[U].data[ot]=j,H[U].data[ot+1]=j,H[U].data[ot+2]=j,H[U].data[ot+3]=255}}const q=N.map((K,G)=>{F[G].putImageData(H[G],0,0);const J=new g1(K);return J.colorSpace=G===0?ti:Ta,J.wrapS=J.wrapT=uu,J.anisotropy=8,J.name=`cafe-local-surface-${r.length}`,r.push(J),J});return{map:q[0],bumpMap:q[1],roughnessMap:q[2]}},o=a(1024,512,(R,L)=>{const E=t(R*4,L*18),N=t(R*7,L*5)*1.4+t(R*2,L*16)*2.4,F=(R-.68)*2.8,H=(L-.43)*8,q=Math.sqrt(F*F+H*H+.004),K=Math.exp(-(F*F*8+H*H*2.4)),G=L*112+N+K*(q*9-H*2.5),J=Math.sin(G*Math.PI*2)*.5+.5,B=Math.pow(J,11)*(.3+t(R*12,L*31)*.7),X=t(R*23,L*500)-.5,nt=Math.max(0,t(R*100,L*720)-.78)*4.5,it=t(R*3,L*72)-.5,ot=(E-.5)*23+X*12+it*14-B*16-nt*15,U=Math.exp(-q*q*30)*18;return[165+ot-U,123+ot*.8-U,81+ot*.59-U*.75,.49+X*.13-B*.09-nt*.14,.47+X*.09+B*.08+nt*.1]}),c=a(512,512,(R,L)=>{const E=t(R*7,L*7)*.6+t(R*28,L*28)*.4-.5,N=n()-.5,F=E*11+N*3;return[190+F,181+F,158+F,.5+E*.12+N*.18,.9+E*.09]}),u=a(512,512,(R,L)=>{const E=R*150+t(R*10,L*8)*.2,N=L*150+t(R*8,L*10)*.2,F=(Math.floor(E)+Math.floor(N))%2,H=Math.pow(Math.sin(E*Math.PI),2),q=Math.pow(Math.sin(N*Math.PI),2),K=F?H*.7+q*.3:q*.7+H*.3,G=n()-.5,J=t(R*14,L*14)-.5,B=K*14+J*9+G*6;return[146+B,139+B,112+B*.8,.2+K*.6+G*.14,.95]}),h=a(512,256,(R,L)=>{const E=t(R*20,L*10)-.5,N=n(),F=N>.988?(N-.988)*3400:0,H=E*8-F;return[233+H,225+H,205+H*.9,.5+E*.025-F*8e-4,.58+E*.13]}),m=a(256,256,(R,L)=>{const E=t(R*90,L*90),N=t(R*12,L*12)-.5,F=(E-.5)*12+N*9;return[99+F,66+F*.75,44+F*.55,.2+E*.55,.67+E*.23]}),p=a(512,512,(R,L)=>{const E=n(),N=t(R*5,L*7),F=t(R*170,L*170),H=Math.min(1,Math.max(0,(N-.26)*2.1)),q=F*13+E*5-H*7;return[43+q,48+q,49+q,.43+F*(1-H)*.23+E*.04,.14+(1-H)*.55]}),v=new ei({...o,roughness:.9,bumpScale:.009});v.name="Cafe oiled oak";const _=new ei({...o,color:7430483,roughness:1,bumpScale:.007});_.name="Cafe dark stained oak";const g=new ei({...c,roughness:1,bumpScale:.014});g.name="Cafe limewashed plaster";const x=new ei({...u,roughness:1,bumpScale:.005});x.name="Cafe woven linen";const T=new ld({...h,roughness:.38,bumpScale:.0015,clearcoat:.9,clearcoatRoughness:.16});T.name="Cafe speckled stoneware";const D=new ei({color:11702865,metalness:.82,roughness:.29});D.name="Cafe brushed brass";const M=new ld({color:2692361,roughness:.15,metalness:.03,clearcoat:1,clearcoatRoughness:.06});M.name="Cafe fresh coffee";const S=new ei({...m,roughness:.82,bumpScale:.006});S.name="Cafe cognac leather";const O=new ld({...p,roughness:.85,bumpScale:.012,clearcoat:.8,clearcoatRoughness:.1});O.name="Cafe rain-wet pavement";const I=new ei({color:4154947,roughness:.73,side:wi});I.name="Cafe deep green foliage";const A=new Set([v,_,g,x,T,D,M,S,O,I]);let P=!1;return{oak:v,darkWood:_,plaster:g,fabric:x,ceramic:T,brass:D,coffee:M,leather:S,pavement:O,foliage:I,textures:r,dispose(){if(!P){P=!0;for(const R of A)R.dispose();for(const R of new Set(r))R.dispose()}}}}function m3(r,t=1){const n=new zi;n.name="Cafe lanceolate plant",n.scale.setScalar(t);let a=437921;const o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296),c=(p,v,_=n)=>{const g=new ln(p,v);return g.castShadow=!0,g.receiveShadow=!0,_.add(g),g},u=[[0,.018],[.126,.018],[.138,.026],[.144,.052],[.163,.14],[.183,.26],[.193,.334],[.196,.35],[.193,.359],[.181,.359],[.178,.345],[.166,.285],[0,.285]].map(([p,v])=>new Ot(p,v)),h=c(new yu(u,64),r.ceramic);h.name="Hollow stoneware plant pot";const m=c(new Ap(.173,40),r.darkWood);m.rotation.x=-Math.PI/2,m.position.y=.327,m.name="Recessed pot soil";for(let p=0;p<18;p++){const v=Math.floor(p/6),_=new zi;_.name=`Curved pointed leaf ${p+1}`,_.rotation.y=p*2.399963+(o()-.5)*.31,n.add(_);const g=.065+o()*.036,x=.61+v*.115+o()*.045,T=.42-v*.046+o()*.072,D=.15+v*.04+o()*.07,M=.15-v*.04+o()*.04,S=.082+o()*.025-v*.009,O=(o()-.5)*.25,I=(o()-.5)*.035,A=K=>new W(g+T*K,x+Math.sin(K*Math.PI*.88)*D-M*K*K,Math.sin(K*Math.PI)*I),P=new tp([new W(g*.25,.324,0),new W(g*.4,.45+v*.045,.002),new W(g*.74,x-.05,0),A(0)]);c(new _u(P,10,.0042-v*4e-4,5,!1),r.foliage,_);const R=[],L=[],E=[],N=16,F=6;for(let K=0;K<=N;K++){const G=K/N,J=A(G),B=Math.pow(Math.sin(G*Math.PI),.83)*(1.13-.48*G);for(let X=0;X<=F;X++){const nt=X/F*2-1,it=S*B*nt,ot=Math.sin(G*Math.PI*7+p)*.0018*nt*nt*B,U=(1-Math.abs(nt))*.018*Math.sin(G*Math.PI),j=-nt*nt*.017*B,dt=it*O*(G-.2);if(R.push(J.x,J.y+U+j+dt+ot,J.z+it),L.push(G,X/F),K<N&&X<F){const Rt=K*(F+1)+X,Pt=Rt+F+1;E.push(Rt,Rt+1,Pt,Rt+1,Pt+1,Pt)}}}const H=new Nn;H.setAttribute("position",new He(R,3)),H.setAttribute("uv",new He(L,2)),H.setIndex(E),H.computeVertexNormals(),c(H,r.foliage,_);const q=Array.from({length:13},(K,G)=>{const J=G/12*.96,B=A(J);return B.y+=Math.sin(J*Math.PI)*.018+5e-4,B});c(new _u(new tp(q),16,.0014,4,!1),r.foliage,_)}return n}function g3(){const r=new nx;r.background=new ve("#263846"),r.fog=new Ep("#263846",.021);const t=p3();t.oak.color.set("#b99171"),t.plaster.color.set("#b6ac95");const n=[],a=[],o=($,xt=.8,At=0)=>{const Ct=new ei({color:$,roughness:xt,metalness:At});return a.push(Ct),Ct},c=new ei({color:"#fff4d6",emissive:"#ffc580",emissiveIntensity:2});a.push(c);const u=($,xt,At,Ct,$t,V=r)=>{const oe=new ln($,xt);return oe.position.set(At,Ct,$t),oe.castShadow=!0,oe.receiveShadow=!0,V.add(oe),oe},h=($,xt,At,Ct,$t,V,oe,le)=>u(new ks(Ct,$t,V),oe,$,xt,At,le),m=($,xt,At,Ct,$t,V,oe,le)=>u(new ol(Ct,$t,V,48),oe,$,xt,At,le),p=($,xt,At,Ct,$t,V)=>u(new Dp(Ct,24,16),$t,$,xt,At,V),v=($,xt,At,Ct,$t=r)=>{const V=u(new ol(At,At,$.distanceTo(xt),12),Ct,0,0,0,$t);return V.position.copy($).add(xt).multiplyScalar(.5),V.quaternion.setFromUnitVectors(new W(0,1,0),xt.clone().sub($).normalize()),V};h(-2.2,-.1,3.2,6,.2,9.5,t.darkWood),h(4,-.1,-3.2,6.5,.2,12,t.darkWood);for(let $=0;$<12;$++)h(-4.9+$*.5,.008,3.2,.483,.024,9.5,t.oak);for(let $=0;$<13;$++)h(1+$*.5,.008,-3.2,.483,.024,12,t.oak);h(4,2,-9,8,4,.18,t.plaster),h(7.2,2,-2,.2,4,14,t.plaster),h(.82,2,-5.3,.16,4,7.5,t.darkWood),h(-2.2,4.15,3.2,6,.16,9.5,t.plaster),h(4,4.15,-3.2,6.5,.16,12,t.plaster),h(-5.3,2,1,.25,4,6,t.plaster);const _=-2.15,g=-1.55,x=5.7,T=3.5,D=2.14;h(_,.19,g,x+.24,.4,.21,t.plaster),h(_,.42,g+.1,x+.44,.13,.48,t.oak);for(const $ of[-5.06,-2.25,.74])h($,2.15,g+.03,.105,3.7,.17,t.darkWood),h($+.058,2.15,g+.125,.018,3.7,.018,t.brass);h(_,3.95,g,x+.3,.15,.2,t.darkWood),h(_,3.18,g+.04,x,.065,.14,t.darkWood),h(-3.9,.45,1.6,1.25,.28,4,t.darkWood),h(-3.8,.67,1.6,1.2,.2,4,t.fabric),h(-4.45,1.15,1.6,.19,1.02,4.05,t.fabric);for(let $=-.2;$<3.6;$+=.58)h(-4.337,1.15,$,.012,.79,.016,t.darkWood),p(-4.315,1.2,$+.28,.022,t.brass);const M=new zi;r.add(M),M.position.set(-.85,.79,1.12);const S=new px,O=2.75,I=1.45,A=.12;S.moveTo(-O/2+A,-I/2),S.lineTo(O/2-A,-I/2),S.quadraticCurveTo(O/2,-I/2,O/2,-I/2+A),S.lineTo(O/2,I/2-A),S.quadraticCurveTo(O/2,I/2,O/2-A,I/2),S.lineTo(-O/2+A,I/2),S.quadraticCurveTo(-O/2,I/2,-O/2,I/2-A),S.lineTo(-O/2,-I/2+A),S.quadraticCurveTo(-O/2,-I/2,-O/2+A,-I/2);const P=u(new Cp(S,{depth:.065,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:3,steps:1}),t.oak,0,0,0,M);P.rotation.x=-Math.PI/2;for(const $ of[-1,1])for(const xt of[-.43,.43])h($,-.43,xt,.065,.8,.065,t.darkWood,M);const R=new zi;R.position.set(-.64,.905,1.45),r.add(R);const L=[[0,.008],[.087,.008],[.112,.018],[.14,.13],[.151,.228],[.153,.249],[.148,.256],[.14,.249],[.137,.22],[.129,.115],[.098,.035],[0,.035]].map(([$,xt])=>new Ot($,xt)),E=u(new yu(L,96),t.ceramic,0,0,0,R),N=u(new Hr(.085,.021,20,48,Math.PI*1.72),t.ceramic,.16,.139,0,R);N.rotation.z=-Math.PI*.86;const F=m(-.64,.89,1.45,.235,.21,.025,t.ceramic),H=u(new Hr(.145,.007,12,72),t.ceramic,0,.246,0,R);H.rotation.x=Math.PI/2,m(0,.224,0,.136,.136,.002,t.coffee,R);const q=o("#be9561",.42),K=u(new Hr(.129,.0025,8,96),q,0,.226,0,R);K.rotation.x=Math.PI/2;for(const $ of[E,N,F,H])$.userData.interaction="cup",n.push($);const G=h(.1,.898,1.28,.36,.014,.49,t.fabric);G.rotation.y=-.13,p(.12,.923,1.34,.041,t.brass).scale.set(.65,.15,1.3),v(new W(.12,.92,1.36),new W(.11,.92,1.6),.008,t.brass);const B=o("#d8cdb3",.96),X=h(-1.61,.902,1.29,.43,.013,.33,B);X.rotation.y=.12;for(let $=0;$<6;$++)h(-1.61,.91,1.2+$*.031,.25-$%3*.04,.001,.003,t.darkWood);const nt=new zi;nt.position.set(-1.15,.9,.56),r.add(nt),m(0,.018,0,.15,.17,.035,t.brass,nt),m(0,.26,0,.017,.022,.48,t.brass,nt);const it=new ei({color:"#edcc94",roughness:.85,side:wi,emissive:"#edac55",emissiveIntensity:.24});a.push(it);const ot=u(new ol(.15,.29,.36,96,1,!0),it,0,.56,0,nt);for(let $=0;$<64;$++){const xt=$/64*Math.PI*2;v(new W(Math.cos(xt)*.289,.38,Math.sin(xt)*.289),new W(Math.cos(xt)*.15,.74,Math.sin(xt)*.15),.0025,t.fabric,nt)}for(const[$,xt]of[[.38,.29],[.74,.15]]){const At=u(new Hr(xt,.007,8,72),t.brass,0,$,0,nt);At.rotation.x=Math.PI/2}p(0,.43,0,.048,c,nt);const U=new nl("#ffcf91",3.8,5,2);U.position.set(-1.15,1.33,.56),r.add(U);const j=new aE("#ffdbab",14,9,1.1,.8,2);j.position.set(-1.15,2.5,1.1),j.target.position.set(-.75,.72,1.2),j.castShadow=!0,j.shadow.mapSize.set(1024,1024),j.shadow.bias=-.001,j.shadow.normalBias=.018,r.add(j,j.target),ot.userData.interaction="lamp",n.push(ot),h(4,.56,-7.35,5.2,1.12,1,t.darkWood),h(4,1.15,-7.35,5.4,.14,1.12,t.oak);for(let $=1.65;$<6.5;$+=.14)h($,.61,-6.833,.037,1,.025,t.oak);const dt=o("#64666a",.26,.82);h(4.7,1.46,-7.32,1.12,.48,.54,dt),h(4.7,1.56,-7.015,.87,.19,.02,t.darkWood);for(const $ of[4.45,4.91])m($,1.345,-6.98,.038,.038,.17,t.brass),v(new W($,1.34,-7),new W($,1.32,-6.76),.021,t.darkWood);for(const $ of[1.96,2.64]){h(4.25,$,-8.73,5.2,.07,.49,t.oak);for(let xt=0;xt<9;xt++){const At=2.1+xt*.52;if(xt%3===0)m(At,$+.19,-8.7,.115,.115,.3,t.ceramic);else for(let Ct=0;Ct<3;Ct++)m(At,$+.05+Ct*.053,-8.65,.078,.058,.05,t.ceramic)}}const Rt=($,xt,At=2.9)=>{m($,3.54,xt,.012,.012,1.2,t.darkWood),m($,At,xt,.14,.42,.22,t.darkWood),m($,At-.115,xt,.38,.38,.012,c);const Ct=new nl("#ffd6a0",12,7,2);Ct.position.set($,At-.25,xt),r.add(Ct)};Rt(2.15,-1.4),Rt(3.6,-4.5),Rt(5.6,-6.8);const Pt=new nE("#9cbbd0","#897564",.38);r.add(Pt);const qt=new nl("#ffe1b8",14,15,2);qt.position.set(3,3,0),r.add(qt);const at=new oE("#9cbfd8",.28);at.position.set(-5,5,-6),r.add(at);const gt=o("#4a5554"),Dt=o("#242c30"),ie=o("#ae8972"),kt=o("#332a28"),ue=($,xt,At)=>{const Ct=new zi;Ct.position.set($,0,xt),Ct.rotation.y=At,r.add(Ct),h(0,.49,0,.56,.12,.56,t.fabric,Ct),h(0,.9,.24,.55,.72,.1,t.fabric,Ct);for(const $t of[-.23,.23])for(const V of[-.22,.22])h($t,.25,V,.035,.5,.035,t.darkWood,Ct);return Ct},Le=($,xt,At)=>{const Ct=ue($,xt,At),$t=p(0,1.02,0,.29,gt,Ct);$t.scale.set(.74,1.2,.6),$t.rotation.x=-.1,m(0,1.33,-.03,.056,.065,.13,ie,Ct),p(0,1.47,-.05,.14,ie,Ct).scale.set(.86,1.16,.92),p(0,1.45,-.179,.027,ie,Ct);for(const le of[-1,1])p(le*.119,1.46,-.03,.03,ie,Ct).scale.set(.4,1,.75);p(0,1.53,-.018,.144,kt,Ct).scale.set(.88,.85,.93);for(const le of[-1,1])v(new W(le*.16,1.1,-.02),new W(le*.21,.9,-.26),.067,gt,Ct),v(new W(le*.21,.9,-.26),new W(le*.12,.91,-.46),.048,gt,Ct),p(le*.12,.91,-.47,.048,ie,Ct),v(new W(le*.12,.6,-.1),new W(le*.13,.43,-.35),.085,Dt,Ct),v(new W(le*.13,.43,-.35),new W(le*.13,.09,-.35),.055,Dt,Ct),p(le*.13,.065,-.4,.095,t.darkWood,Ct).scale.set(.7,.6,1.4)};for(const[$,xt]of[[1.45,-3.9],[4.15,-5.5]])m($,.79,xt,.64,.64,.065,t.oak),m($,.4,xt,.055,.07,.76,t.darkWood),m($,.04,xt,.3,.3,.05,t.darkWood),ue($-.94,xt,-Math.PI/2),Le($+.93,xt,Math.PI/2),m($-.15,.87,xt,.07,.05,.13,t.ceramic),h($+.1,.835,xt+.1,.28,.015,.33,B);for(const[$,xt,At]of[[.9,-1.5,.86],[6.6,-7.9,1.3]]){const Ct=m3(t,At);Ct.position.set($,0,xt),r.add(Ct)}h(-4,-.035,-12,26,.05,22,t.pavement);const yt=[o("#25343e"),o("#394048"),o("#283e48")];for(let $=0;$<6;$++){const xt=-12+$*3.6;h(xt,3.7,-18,3.48,7.4,1.4,yt[$%3]);for(let At=0;At<3;At++)for(let Ct=0;Ct<2;Ct++){const $t=xt-.85+Ct*1.7,V=1.65+At*1.8;h($t,V,-17.26,1.04,1.24,.09,t.darkWood);const oe=new ei({color:At===0?"#75624f":"#3c4344",emissive:At===0?"#f1b36b":"#b4a484",emissiveIntensity:At===0?1.05:.18,roughness:.28});a.push(oe),h($t,V,-17.2,.92,1.1,.025,oe),h($t,V,-17.16,.035,1.1,.03,t.darkWood)}h(xt,.9,-17.08,2.8,.08,.4,t.darkWood);for(let At=0;At<24;At++){const Ct=new bp({color:$%2?"#acac87":"#d2a376",transparent:!0,opacity:.018+.07*(1-At/24),depthWrite:!1});a.push(Ct);const $t=u(new Fs(.32+Math.sin(At*8.7+$)*.15,.075),Ct,xt+Math.sin(At*2.1)*.24,.005,-16.2+At*.28);$t.rotation.x=-Math.PI/2}}for(const[$,xt]of[[-3.8,-9.2],[-8,-12.6]]){m($,1.75,xt,.036,.05,3.5,t.darkWood),v(new W($,3.5,xt),new W($+.36,3.5,xt),.035,t.darkWood),p($+.36,3.44,xt,.12,c);const At=new nl("#f5c18a",18,7,2);At.position.set($+.36,3.37,xt),r.add(At)}const wt={time:{value:0},pulse:{value:0}},Ut=new Ci({transparent:!0,depthWrite:!1,side:wi,uniforms:wt,vertexShader:"varying vec2 vUv; uniform float time; void main(){vUv=uv;vec3 p=position;p.x+=sin(uv.y*8.0-time*.75)*.033*uv.y+sin(uv.y*17.0+time*.3)*.015;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}",fragmentShader:"varying vec2 vUv;uniform float time;uniform float pulse;void main(){float center=.5+.10*sin(vUv.y*13.-time*.35);float w=.10+vUv.y*.22;float a=exp(-pow((vUv.x-center)/w,2.)*3.);a*=smoothstep(0.,.16,vUv.y)*(1.-smoothstep(.45,1.,vUv.y));a*=.12+.035*sin(vUv.y*28.-time*.9);gl_FragColor=vec4(.92,.88,.80,a*(1.+pulse*.35));}"});a.push(Ut);const Lt=new zi;Lt.position.set(-.64,1.12,1.45),r.add(Lt);for(let $=0;$<3;$++){const xt=u(new Fs(.31,.69,12,36),Ut,($-1)*.045,.345,0,Lt);xt.rotation.y=$*Math.PI/3,xt.castShadow=!1,xt.receiveShadow=!1}return{scene:r,m:t,cup:R,lampLight:U,shadeMat:it,steamUniforms:wt,interactables:n,glass:{x:_,y:D,z:g,w:x,h:T},dispose(){const $=new Set;r.traverse(xt=>{xt instanceof ln&&$.add(xt.geometry)}),$.forEach(xt=>xt.dispose()),a.forEach(xt=>xt.dispose()),r.traverse(xt=>{var At;xt instanceof xl&&"shadow"in xt&&((At=xt.shadow)==null||At.dispose())}),t.dispose()}}}class v3{constructor(t,n){this.canvas=t,this.onContextLost=n,this.camera=new ni(45,1,.04,80),this.world=g3(),this.look=new h3({yaw:.052,pitch:.027},{follow:.2,settle:1.35}),this.raycaster=new uE,this.target=new mi(1,1,{type:Ri,depthBuffer:!0}),this.raf=0,this.last=0,this.ready=!1,this.disposed=!1,this.time=0,this.width=1,this.height=1,this.ratio=1,this.wipeAge=99,this.cupPulse=0,this.lampLevel=1,this.lampTarget=1,this.frames=0,this.lost=u=>{u.preventDefault(),this.onContextLost()},this.renderer=new l3({canvas:t,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=ti,this.renderer.toneMapping=up,this.renderer.toneMappingExposure=1.02,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=z_,this.renderer.shadowMap.autoUpdate=!1;const a=new c3,o=new ap(this.renderer);this.environment=o.fromScene(a,.035),this.world.scene.environment=this.environment.texture,this.world.scene.environmentIntensity=.22,a.dispose(),o.dispose();const c=this.world.glass;this.glass=new bu(new Fs(c.w,c.h),{textureWidth:512,textureHeight:512,multisample:0,clipBias:.003,shader:{name:"CafeRainGlass",uniforms:{color:{value:new ve("#e5eced")},tDiffuse:{value:null},textureMatrix:{value:new Ge},sceneColor:{value:null},resolution:{value:new Ot(1,1)},time:{value:0},wipe:{value:new Ot(-2,-2)},wipeAge:{value:99}},vertexShader:"varying vec2 vUv;varying vec4 vReflect;uniform mat4 textureMatrix;void main(){vUv=uv;vReflect=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`uniform sampler2D tDiffuse,sceneColor;uniform vec2 resolution,wipe;uniform float time,wipeAge;varying vec2 vUv;varying vec4 vReflect;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      vec4 drops(vec2 uv,vec2 grid,float speed){vec2 p=uv*grid;vec2 id=floor(p);float h=hash(vec2(id.x,2.));p.y+=time*speed*(.3+h);id=floor(p);vec2 q=fract(p)-.5;h=hash(id);q.x-=(h-.5)*.62;q.y-=(hash(id+7.)-.5)*.44;float r=.075+.11*hash(id+8.);vec2 n=q/vec2(r,r*(1.05+speed*3.));float d=length(n);float body=1.-smoothstep(.72,1.,d);float keep=step(.55,h);float trail=exp(-abs(q.x)*230.)*smoothstep(.02,.08,q.y)*(1.-smoothstep(.08,.5,q.y))*step(.01,speed)*.15;float rim=smoothstep(.66,.84,d)*(1.-smoothstep(.84,1.05,d))*keep;return vec4(n*body*.006*keep,(body+trail)*keep,rim);}
      vec3 blurred(vec2 uv,float radius){vec2 px=radius/resolution;vec3 c=texture2D(sceneColor,uv).rgb*.24;c+=texture2D(sceneColor,uv+vec2(px.x,0)).rgb*.12;c+=texture2D(sceneColor,uv-vec2(px.x,0)).rgb*.12;c+=texture2D(sceneColor,uv+vec2(0,px.y)).rgb*.12;c+=texture2D(sceneColor,uv-vec2(0,px.y)).rgb*.12;c+=texture2D(sceneColor,uv+px*.7).rgb*.07;c+=texture2D(sceneColor,uv-px*.7).rgb*.07;c+=texture2D(sceneColor,uv+vec2(-px.x,px.y)*.7).rgb*.07;c+=texture2D(sceneColor,uv+vec2(px.x,-px.y)*.7).rgb*.07;return c;}
      void main(){vec4 a=drops(vUv,vec2(81.,47.),0.);vec4 b=drops(vUv+vec2(.12,.34),vec2(29.,18.),.095);vec4 beads=drops(vUv+.37,vec2(137.,83.),0.);vec2 shift=a.xy+b.xy+beads.xy*.24;vec2 screen=gl_FragCoord.xy/resolution;float water=clamp(a.z+b.z+beads.z*.3,0.,1.);float edge=pow(abs(vUv.x-.5)*2.,3.)*.065+pow(1.-vUv.y,4.)*.065;vec2 wipeDelta=(vUv-wipe)*vec2(1.8,1.);float clearPatch=exp(-dot(wipeDelta,wipeDelta)/.016)*exp(-wipeAge*.075);float fog=edge*(1.-clearPatch);vec3 outside=blurred(clamp(screen+shift,vec2(.01),vec2(.99)),mix(3.4,1.,water)+fog*26.);vec2 mirror=vReflect.xy/vReflect.w+shift*.3;vec3 inside=texture2D(tDiffuse,mirror).rgb;vec3 c=mix(outside,inside,.055+edge*.2);c=mix(c,vec3(.17,.22,.25),fog);c*=1.-(a.w+b.w)*.12;c+=vec3(.58,.66,.69)*max(0.,-shift.y)*7.;c+=vec3(.7,.78,.81)*pow(max(0.,shift.y)*150.,3.)*.055;gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>}`}}),this.glass.material.uniforms.sceneColor.value=this.target.texture,this.glass.position.set(c.x,c.y,c.z),this.world.scene.add(this.glass),this.glass.userData.interaction="window",this.world.interactables.push(this.glass),t.addEventListener("webglcontextlost",this.lost),t.dataset.engine="three-webgl2",t.dataset.lifecycle="created"}async init(){this.disposed||(this.ready=!0,this.setSize(this.width,this.height,this.ratio),this.renderer.shadowMap.needsUpdate=!0,this.renderFrame(0),this.canvas.dataset.lifecycle="ready")}setSize(t,n,a){this.width=Math.max(1,t),this.height=Math.max(1,n),this.ratio=Math.min(2,Math.max(1,a)),this.renderer.setPixelRatio(this.ratio),this.renderer.setSize(this.width,this.height,!1),this.target.setSize(Math.round(this.width*this.ratio),Math.round(this.height*this.ratio)),this.glass.getRenderTarget().setSize(Math.round(this.width*this.ratio*.65),Math.round(this.height*this.ratio*.65)),this.glass.material.uniforms.resolution.value.set(this.width*this.ratio,this.height*this.ratio),this.camera.aspect=this.width/this.height,this.camera.fov=45+23*(1-Wo.smoothstep(this.camera.aspect,.48,1.35)),this.camera.updateProjectionMatrix()}renderFrame(t){if(!this.ready||this.disposed)return;const n=Math.min(.05,Math.max(0,t));this.time+=n,this.wipeAge+=n,this.look.update(n),this.cupPulse=Math.max(0,this.cupPulse-n*.4),this.lampLevel+=(this.lampTarget-this.lampLevel)*(1-Math.exp(-n*1.2)),this.world.steamUniforms.time.value=this.time,this.world.steamUniforms.pulse.value=this.cupPulse,this.world.cup.rotation.z=Math.sin(this.time*3)*this.cupPulse*.006,this.world.lampLight.intensity=3.8*this.lampLevel,this.world.shadeMat.emissiveIntensity=.24*this.lampLevel,this.glass.material.uniforms.time.value=this.time,this.glass.material.uniforms.wipeAge.value=this.wipeAge;const a=1-Wo.smoothstep(this.camera.aspect,.48,1.35);this.camera.position.set(Wo.lerp(.2,-1.6,a),1.67,Wo.lerp(4.3,5,a));const o=new W(Wo.lerp(-.08,.18,a),1.45,-1.7);this.camera.lookAt(o),this.camera.rotateY(this.look.yaw),this.camera.rotateX(this.look.pitch),this.camera.updateMatrixWorld(),this.glass.visible=!1,this.renderer.setRenderTarget(this.target),this.renderer.render(this.world.scene,this.camera),this.glass.visible=!0,this.renderer.setRenderTarget(null),this.renderer.render(this.world.scene,this.camera),this.frames++,this.canvas.dataset.frames=String(this.frames),this.canvas.dataset.time=this.time.toFixed(4),this.canvas.dataset.yaw=this.look.yaw.toFixed(5),this.canvas.dataset.cupPulse=this.cupPulse.toFixed(3),this.canvas.dataset.lamp=this.lampLevel.toFixed(3),this.canvas.dataset.wipeAge=this.wipeAge.toFixed(3),this.canvas.dataset.drawCalls=String(this.renderer.info.render.calls),this.canvas.dataset.triangles=String(this.renderer.info.render.triangles)}start(){if(this.raf||!this.ready||this.disposed)return;this.last=performance.now(),this.canvas.dataset.running="true";const t=n=>{this.disposed||(this.renderFrame((n-this.last)/1e3),this.last=n,this.raf=requestAnimationFrame(t))};this.raf=requestAnimationFrame(t)}stop(){cancelAnimationFrame(this.raf),this.raf=0,this.canvas.dataset.running="false"}drag(t,n){this.look.drag(t,n)}releaseDrag(){this.look.release()}interact(t,n){this.raycaster.setFromCamera(new Ot(t*2-1,1-n*2),this.camera);const a=this.raycaster.intersectObjects(this.world.interactables,!1)[0],o=a==null?void 0:a.object.userData.interaction;return o==="window"&&a.uv&&(this.glass.material.uniforms.wipe.value.copy(a.uv),this.wipeAge=0),o==="cup"&&(this.cupPulse=1),o==="lamp"&&(this.lampTarget=this.lampTarget>.9?.78:1),o??null}dispose(){this.disposed||(this.stop(),this.disposed=!0,this.canvas.removeEventListener("webglcontextlost",this.lost),this.glass.dispose(),this.target.dispose(),this.environment.dispose(),this.world.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.dataset.lifecycle="disposed")}}class _3 extends Yy{constructor(){super({canvasClass:"cafe-world-canvas",isSupported:()=>{var t;try{const n=document.createElement("canvas").getContext("webgl2"),a=!!(n!=null&&n.getExtension("EXT_color_buffer_float"));return(t=n==null?void 0:n.getExtension("WEBGL_lose_context"))==null||t.loseContext(),a}catch{return!1}},create:(t,n)=>new v3(t,n)})}interact(t,n,a){var o;return this.top===t&&t.running&&this.status==="ready"?((o=this.engine)==null?void 0:o.interact(n,a))??null:null}}const iu=new _3;function I_({active:r,onInteraction:t}){const n=Xn.useRef(null),a=Xn.useRef(null),o=Xn.useRef(null),[c,u]=Xn.useState("loading"),h=Wy(r);return Xn.useEffect(()=>{if(!a.current)return;const m={mount:a.current,running:!1,onStatus:u};o.current=m;const p=iu.acquire(m);return()=>{o.current=null,p()}},[]),Xn.useEffect(()=>{o.current&&iu.setRunning(o.current,h)},[h,c]),qy(iu,n,o,h),Xn.useEffect(()=>{const m=n.current;if(!m||!h)return;let p=null;const v=x=>{x.isPrimary&&x.button===0&&(p={x:x.clientX,y:x.clientY,id:x.pointerId,time:performance.now()})},_=x=>{const T=p;if(p=null,!T||T.id!==x.pointerId||Math.hypot(x.clientX-T.x,x.clientY-T.y)>8||performance.now()-T.time>600||!o.current)return;const D=m.getBoundingClientRect(),M=iu.interact(o.current,(x.clientX-D.left)/D.width,(x.clientY-D.top)/D.height);M&&(t==null||t(M))},g=()=>{p=null};return m.addEventListener("pointerdown",v),window.addEventListener("pointerup",_),window.addEventListener("pointercancel",g),()=>{m.removeEventListener("pointerdown",v),window.removeEventListener("pointerup",_),window.removeEventListener("pointercancel",g)}},[h,t]),fn.jsxs("div",{ref:n,className:"cafe-world","data-state":c,"data-motion":h?"running":"paused",role:"img","aria-label":"비 오는 저녁, 따뜻한 조명과 커피가 있는 카페 창가. 멀리 손님들이 조용히 앉아 있습니다.",children:[fn.jsx("div",{ref:a,className:"cafe-world-mount"}),c!=="ready"&&fn.jsx("span",{className:"cafe-world-status",role:"status",children:c==="failed"?"이 기기에서 카페 3D 화면을 표시할 수 없습니다.":"카페 창가를 준비하고 있어요"})]})}function x3(){const[r,t]=Xn.useState(!new URLSearchParams(location.search).has("paused")),[n,a]=Xn.useState(!1),[o,c]=Xn.useState(!0),[u,h]=Xn.useState("");return fn.jsxs(fn.Fragment,{children:[fn.jsx("main",{"data-scene-surface":!0,style:{position:"absolute",inset:0},children:o&&fn.jsx(I_,{active:r,onInteraction:h})}),n&&o&&fn.jsx("section",{id:"fullscreen","data-scene-surface":!0,"aria-label":"몰입 화면",children:fn.jsx(I_,{active:r,onInteraction:h})}),fn.jsxs("div",{className:"label",children:[fn.jsx("small",{children:"RAINY EVENING · WINDOW SEAT"}),fn.jsx("h1",{children:"카페 집중"}),fn.jsx("span",{children:"40 min"})]}),fn.jsxs("nav",{children:[fn.jsx("button",{onClick:()=>t(m=>!m),children:r?"Pause":"Resume"}),fn.jsx("button",{onClick:()=>a(m=>!m),children:n?"Exit fullscreen":"Fullscreen holder"}),fn.jsx("button",{onClick:()=>c(m=>!m),children:o?"Unmount":"Mount"}),fn.jsx("button",{onClick:()=>document.documentElement.classList.toggle("reduce-motion"),children:"Reduced motion"}),fn.jsx("output",{"data-interaction":!0,children:u})]})]})}Xy.createRoot(document.getElementById("root")).render(fn.jsx(zy.StrictMode,{children:fn.jsx(x3,{})}));
