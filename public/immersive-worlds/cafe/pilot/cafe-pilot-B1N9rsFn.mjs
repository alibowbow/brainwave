(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function By(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Ih={exports:{}},qo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sv;function Fy(){if(Sv)return qo;Sv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var h in o)h!=="key"&&(c[h]=o[h])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return qo.Fragment=t,qo.jsx=n,qo.jsxs=n,qo}var yv;function Hy(){return yv||(yv=1,Ih.exports=Fy()),Ih.exports}var fn=Hy(),zh={exports:{}},me={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mv;function Gy(){if(Mv)return me;Mv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function x(R){return R===null||typeof R!="object"?null:(R=v&&R[v]||R["@@iterator"],typeof R=="function"?R:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,M={};function S(R,J,rt){this.props=R,this.context=J,this.refs=M,this.updater=rt||b}S.prototype.isReactComponent={},S.prototype.setState=function(R,J){if(typeof R!="object"&&typeof R!="function"&&R!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,R,J,"setState")},S.prototype.forceUpdate=function(R){this.updater.enqueueForceUpdate(this,R,"forceUpdate")};function I(){}I.prototype=S.prototype;function z(R,J,rt){this.props=R,this.context=J,this.refs=M,this.updater=rt||b}var A=z.prototype=new I;A.constructor=z,D(A,S.prototype),A.isPureReactComponent=!0;var O=Array.isArray;function w(){}var N={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function L(R,J,rt){var xt=rt.ref;return{$$typeof:r,type:R,key:J,ref:xt!==void 0?xt:null,props:rt}}function H(R,J){return L(R.type,J,R.props)}function W(R){return typeof R=="object"&&R!==null&&R.$$typeof===r}function Y(R){var J={"=":"=0",":":"=2"};return"$"+R.replace(/[=:]/g,function(rt){return J[rt]})}var j=/\/+/g;function F(R,J){return typeof R=="object"&&R!==null&&R.key!=null?Y(""+R.key):J.toString(36)}function q(R){switch(R.status){case"fulfilled":return R.value;case"rejected":throw R.reason;default:switch(typeof R.status=="string"?R.then(w,w):(R.status="pending",R.then(function(J){R.status==="pending"&&(R.status="fulfilled",R.value=J)},function(J){R.status==="pending"&&(R.status="rejected",R.reason=J)})),R.status){case"fulfilled":return R.value;case"rejected":throw R.reason}}throw R}function B(R,J,rt,xt,Lt){var Pt=typeof R;(Pt==="undefined"||Pt==="boolean")&&(R=null);var nt=!1;if(R===null)nt=!0;else switch(Pt){case"bigint":case"string":case"number":nt=!0;break;case"object":switch(R.$$typeof){case r:case t:nt=!0;break;case g:return nt=R._init,B(nt(R._payload),J,rt,xt,Lt)}}if(nt)return Lt=Lt(R),nt=xt===""?"."+F(R,0):xt,O(Lt)?(rt="",nt!=null&&(rt=nt.replace(j,"$&/")+"/"),B(Lt,J,rt,"",function(ee){return ee})):Lt!=null&&(W(Lt)&&(Lt=H(Lt,rt+(Lt.key==null||R&&R.key===Lt.key?"":(""+Lt.key).replace(j,"$&/")+"/")+nt)),J.push(Lt)),1;nt=0;var dt=xt===""?".":xt+":";if(O(R))for(var wt=0;wt<R.length;wt++)xt=R[wt],Pt=dt+F(xt,wt),nt+=B(xt,J,rt,Pt,Lt);else if(wt=x(R),typeof wt=="function")for(R=wt.call(R),wt=0;!(xt=R.next()).done;)xt=xt.value,Pt=dt+F(xt,wt++),nt+=B(xt,J,rt,Pt,Lt);else if(Pt==="object"){if(typeof R.then=="function")return B(q(R),J,rt,xt,Lt);throw J=String(R),Error("Objects are not valid as a React child (found: "+(J==="[object Object]"?"object with keys {"+Object.keys(R).join(", ")+"}":J)+"). If you meant to render a collection of children, use an array instead.")}return nt}function P(R,J,rt){if(R==null)return R;var xt=[],Lt=0;return B(R,xt,"","",function(Pt){return J.call(rt,Pt,Lt++)}),xt}function k(R){if(R._status===-1){var J=R._result;J=J(),J.then(function(rt){(R._status===0||R._status===-1)&&(R._status=1,R._result=rt)},function(rt){(R._status===0||R._status===-1)&&(R._status=2,R._result=rt)}),R._status===-1&&(R._status=0,R._result=J)}if(R._status===1)return R._result.default;throw R._result}var V=typeof reportError=="function"?reportError:function(R){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var J=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof R=="object"&&R!==null&&typeof R.message=="string"?String(R.message):String(R),error:R});if(!window.dispatchEvent(J))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",R);return}console.error(R)},X={map:P,forEach:function(R,J,rt){P(R,function(){J.apply(this,arguments)},rt)},count:function(R){var J=0;return P(R,function(){J++}),J},toArray:function(R){return P(R,function(J){return J})||[]},only:function(R){if(!W(R))throw Error("React.Children.only expected to receive a single React element child.");return R}};return me.Activity=_,me.Children=X,me.Component=S,me.Fragment=n,me.Profiler=o,me.PureComponent=z,me.StrictMode=a,me.Suspense=m,me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=N,me.__COMPILER_RUNTIME={__proto__:null,c:function(R){return N.H.useMemoCache(R)}},me.cache=function(R){return function(){return R.apply(null,arguments)}},me.cacheSignal=function(){return null},me.cloneElement=function(R,J,rt){if(R==null)throw Error("The argument must be a React element, but you passed "+R+".");var xt=D({},R.props),Lt=R.key;if(J!=null)for(Pt in J.key!==void 0&&(Lt=""+J.key),J)!E.call(J,Pt)||Pt==="key"||Pt==="__self"||Pt==="__source"||Pt==="ref"&&J.ref===void 0||(xt[Pt]=J[Pt]);var Pt=arguments.length-2;if(Pt===1)xt.children=rt;else if(1<Pt){for(var nt=Array(Pt),dt=0;dt<Pt;dt++)nt[dt]=arguments[dt+2];xt.children=nt}return L(R.type,Lt,xt)},me.createContext=function(R){return R={$$typeof:u,_currentValue:R,_currentValue2:R,_threadCount:0,Provider:null,Consumer:null},R.Provider=R,R.Consumer={$$typeof:c,_context:R},R},me.createElement=function(R,J,rt){var xt,Lt={},Pt=null;if(J!=null)for(xt in J.key!==void 0&&(Pt=""+J.key),J)E.call(J,xt)&&xt!=="key"&&xt!=="__self"&&xt!=="__source"&&(Lt[xt]=J[xt]);var nt=arguments.length-2;if(nt===1)Lt.children=rt;else if(1<nt){for(var dt=Array(nt),wt=0;wt<nt;wt++)dt[wt]=arguments[wt+2];Lt.children=dt}if(R&&R.defaultProps)for(xt in nt=R.defaultProps,nt)Lt[xt]===void 0&&(Lt[xt]=nt[xt]);return L(R,Pt,Lt)},me.createRef=function(){return{current:null}},me.forwardRef=function(R){return{$$typeof:h,render:R}},me.isValidElement=W,me.lazy=function(R){return{$$typeof:g,_payload:{_status:-1,_result:R},_init:k}},me.memo=function(R,J){return{$$typeof:p,type:R,compare:J===void 0?null:J}},me.startTransition=function(R){var J=N.T,rt={};N.T=rt;try{var xt=R(),Lt=N.S;Lt!==null&&Lt(rt,xt),typeof xt=="object"&&xt!==null&&typeof xt.then=="function"&&xt.then(w,V)}catch(Pt){V(Pt)}finally{J!==null&&rt.types!==null&&(J.types=rt.types),N.T=J}},me.unstable_useCacheRefresh=function(){return N.H.useCacheRefresh()},me.use=function(R){return N.H.use(R)},me.useActionState=function(R,J,rt){return N.H.useActionState(R,J,rt)},me.useCallback=function(R,J){return N.H.useCallback(R,J)},me.useContext=function(R){return N.H.useContext(R)},me.useDebugValue=function(){},me.useDeferredValue=function(R,J){return N.H.useDeferredValue(R,J)},me.useEffect=function(R,J){return N.H.useEffect(R,J)},me.useEffectEvent=function(R){return N.H.useEffectEvent(R)},me.useId=function(){return N.H.useId()},me.useImperativeHandle=function(R,J,rt){return N.H.useImperativeHandle(R,J,rt)},me.useInsertionEffect=function(R,J){return N.H.useInsertionEffect(R,J)},me.useLayoutEffect=function(R,J){return N.H.useLayoutEffect(R,J)},me.useMemo=function(R,J){return N.H.useMemo(R,J)},me.useOptimistic=function(R,J){return N.H.useOptimistic(R,J)},me.useReducer=function(R,J,rt){return N.H.useReducer(R,J,rt)},me.useRef=function(R){return N.H.useRef(R)},me.useState=function(R){return N.H.useState(R)},me.useSyncExternalStore=function(R,J,rt){return N.H.useSyncExternalStore(R,J,rt)},me.useTransition=function(){return N.H.useTransition()},me.version="19.2.7",me}var Ev;function hp(){return Ev||(Ev=1,zh.exports=Gy()),zh.exports}var qn=hp();const Vy=By(qn);var Bh={exports:{}},Yo={},Fh={exports:{}},Hh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bv;function ky(){return bv||(bv=1,(function(r){function t(B,P){var k=B.length;B.push(P);t:for(;0<k;){var V=k-1>>>1,X=B[V];if(0<o(X,P))B[V]=P,B[k]=X,k=V;else break t}}function n(B){return B.length===0?null:B[0]}function a(B){if(B.length===0)return null;var P=B[0],k=B.pop();if(k!==P){B[0]=k;t:for(var V=0,X=B.length,R=X>>>1;V<R;){var J=2*(V+1)-1,rt=B[J],xt=J+1,Lt=B[xt];if(0>o(rt,k))xt<X&&0>o(Lt,rt)?(B[V]=Lt,B[xt]=k,V=xt):(B[V]=rt,B[J]=k,V=J);else if(xt<X&&0>o(Lt,k))B[V]=Lt,B[xt]=k,V=xt;else break t}}return P}function o(B,P){var k=B.sortIndex-P.sortIndex;return k!==0?k:B.id-P.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,h=u.now();r.unstable_now=function(){return u.now()-h}}var m=[],p=[],g=1,_=null,v=3,x=!1,b=!1,D=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function A(B){for(var P=n(p);P!==null;){if(P.callback===null)a(p);else if(P.startTime<=B)a(p),P.sortIndex=P.expirationTime,t(m,P);else break;P=n(p)}}function O(B){if(D=!1,A(B),!b)if(n(m)!==null)b=!0,w||(w=!0,Y());else{var P=n(p);P!==null&&q(O,P.startTime-B)}}var w=!1,N=-1,E=5,L=-1;function H(){return M?!0:!(r.unstable_now()-L<E)}function W(){if(M=!1,w){var B=r.unstable_now();L=B;var P=!0;try{t:{b=!1,D&&(D=!1,I(N),N=-1),x=!0;var k=v;try{e:{for(A(B),_=n(m);_!==null&&!(_.expirationTime>B&&H());){var V=_.callback;if(typeof V=="function"){_.callback=null,v=_.priorityLevel;var X=V(_.expirationTime<=B);if(B=r.unstable_now(),typeof X=="function"){_.callback=X,A(B),P=!0;break e}_===n(m)&&a(m),A(B)}else a(m);_=n(m)}if(_!==null)P=!0;else{var R=n(p);R!==null&&q(O,R.startTime-B),P=!1}}break t}finally{_=null,v=k,x=!1}P=void 0}}finally{P?Y():w=!1}}}var Y;if(typeof z=="function")Y=function(){z(W)};else if(typeof MessageChannel<"u"){var j=new MessageChannel,F=j.port2;j.port1.onmessage=W,Y=function(){F.postMessage(null)}}else Y=function(){S(W,0)};function q(B,P){N=S(function(){B(r.unstable_now())},P)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return v},r.unstable_next=function(B){switch(v){case 1:case 2:case 3:var P=3;break;default:P=v}var k=v;v=P;try{return B()}finally{v=k}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(B,P){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var k=v;v=B;try{return P()}finally{v=k}},r.unstable_scheduleCallback=function(B,P,k){var V=r.unstable_now();switch(typeof k=="object"&&k!==null?(k=k.delay,k=typeof k=="number"&&0<k?V+k:V):k=V,B){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=k+X,B={id:g++,callback:P,priorityLevel:B,startTime:k,expirationTime:X,sortIndex:-1},k>V?(B.sortIndex=k,t(p,B),n(m)===null&&B===n(p)&&(D?(I(N),N=-1):D=!0,q(O,k-V))):(B.sortIndex=X,t(m,B),b||x||(b=!0,w||(w=!0,Y()))),B},r.unstable_shouldYield=H,r.unstable_wrapCallback=function(B){var P=v;return function(){var k=v;v=P;try{return B.apply(this,arguments)}finally{v=k}}}})(Hh)),Hh}var Tv;function Xy(){return Tv||(Tv=1,Fh.exports=ky()),Fh.exports}var Gh={exports:{}},In={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Av;function Wy(){if(Av)return In;Av=1;var r=hp();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:m,containerInfo:p,implementation:g}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,In.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},In.flushSync=function(m){var p=u.T,g=a.p;try{if(u.T=null,a.p=2,m)return m()}finally{u.T=p,a.p=g,a.d.f()}},In.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(m,p))},In.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},In.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,_=h(g,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,x=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?a.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:x}):g==="script"&&a.d.X(m,{crossOrigin:_,integrity:v,fetchPriority:x,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},In.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=h(p.as,p.crossOrigin);a.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(m)},In.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=h(g,p.crossOrigin);a.d.L(m,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},In.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=h(p.as,p.crossOrigin);a.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(m)},In.requestFormReset=function(m){a.d.r(m)},In.unstable_batchedUpdates=function(m,p){return m(p)},In.useFormState=function(m,p,g){return u.H.useFormState(m,p,g)},In.useFormStatus=function(){return u.H.useHostTransitionStatus()},In.version="19.2.7",In}var wv;function qy(){if(wv)return Gh.exports;wv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Gh.exports=Wy(),Gh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rv;function Yy(){if(Rv)return Yo;Rv=1;var r=Xy(),t=hp(),n=qy();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function u(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(a(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,l=i;;){var f=s.return;if(f===null)break;var d=f.alternate;if(d===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===d.child){for(d=f.child;d;){if(d===s)return m(f),e;if(d===l)return m(f),i;d=d.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=d;else{for(var y=!1,U=f.child;U;){if(U===s){y=!0,s=f,l=d;break}if(U===l){y=!0,l=f,s=d;break}U=U.sibling}if(!y){for(U=d.child;U;){if(U===s){y=!0,s=d,l=f;break}if(U===l){y=!0,l=d,s=f;break}U=U.sibling}if(!y)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),z=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),w=Symbol.for("react.suspense_list"),N=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),H=Symbol.for("react.memo_cache_sentinel"),W=Symbol.iterator;function Y(e){return e===null||typeof e!="object"?null:(e=W&&e[W]||e["@@iterator"],typeof e=="function"?e:null)}var j=Symbol.for("react.client.reference");function F(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===j?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case D:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case O:return"Suspense";case w:return"SuspenseList";case L:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case z:return e.displayName||"Context";case I:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case N:return i=e.displayName||null,i!==null?i:F(e.type)||"Memo";case E:i=e._payload,e=e._init;try{return F(e(i))}catch{}}return null}var q=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k={pending:!1,data:null,method:null,action:null},V=[],X=-1;function R(e){return{current:e}}function J(e){0>X||(e.current=V[X],V[X]=null,X--)}function rt(e,i){X++,V[X]=e.current,e.current=i}var xt=R(null),Lt=R(null),Pt=R(null),nt=R(null);function dt(e,i){switch(rt(Pt,i),rt(Lt,e),rt(xt,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?kg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=kg(i),e=Xg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}J(xt),rt(xt,e)}function wt(){J(xt),J(Lt),J(Pt)}function ee(e){e.memoizedState!==null&&rt(nt,e);var i=xt.current,s=Xg(i,e.type);i!==s&&(rt(Lt,e),rt(xt,s))}function Bt(e){Lt.current===e&&(J(xt),J(Lt)),nt.current===e&&(J(nt),Vo._currentValue=k)}var ie,ue;function mt(e){if(ie===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);ie=i&&i[1]||"",ue=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ie+e+ue}var Ct=!1;function Nt(e,i){if(!e||Ct)return"";Ct=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var At=function(){throw Error()};if(Object.defineProperty(At.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(At,[])}catch(gt){var ht=gt}Reflect.construct(e,[],At)}else{try{At.call()}catch(gt){ht=gt}e.call(At.prototype)}}else{try{throw Error()}catch(gt){ht=gt}(At=e())&&typeof At.catch=="function"&&At.catch(function(){})}}catch(gt){if(gt&&ht&&typeof gt.stack=="string")return[gt.stack,ht.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=l.DetermineComponentFrameRoot(),y=d[0],U=d[1];if(y&&U){var K=y.split(`
`),ft=U.split(`
`);for(f=l=0;l<K.length&&!K[l].includes("DetermineComponentFrameRoot");)l++;for(;f<ft.length&&!ft[f].includes("DetermineComponentFrameRoot");)f++;if(l===K.length||f===ft.length)for(l=K.length-1,f=ft.length-1;1<=l&&0<=f&&K[l]!==ft[f];)f--;for(;1<=l&&0<=f;l--,f--)if(K[l]!==ft[f]){if(l!==1||f!==1)do if(l--,f--,0>f||K[l]!==ft[f]){var Et=`
`+K[l].replace(" at new "," at ");return e.displayName&&Et.includes("<anonymous>")&&(Et=Et.replace("<anonymous>",e.displayName)),Et}while(1<=l&&0<=f);break}}}finally{Ct=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?mt(s):""}function Dt(e,i){switch(e.tag){case 26:case 27:case 5:return mt(e.type);case 16:return mt("Lazy");case 13:return e.child!==i&&i!==null?mt("Suspense Fallback"):mt("Suspense");case 19:return mt("SuspenseList");case 0:case 15:return Nt(e.type,!1);case 11:return Nt(e.type.render,!1);case 1:return Nt(e.type,!0);case 31:return mt("Activity");default:return""}}function It(e){try{var i="",s=null;do i+=Dt(e,s),s=e,e=e.return;while(e);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var ae=Object.prototype.hasOwnProperty,jt=r.unstable_scheduleCallback,ce=r.unstable_cancelCallback,he=r.unstable_shouldYield,Q=r.unstable_requestPaint,pe=r.unstable_now,Se=r.unstable_getCurrentPriorityLevel,G=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,it=r.unstable_NormalPriority,ct=r.unstable_LowPriority,St=r.unstable_IdlePriority,Ot=r.log,Ft=r.unstable_setDisableYieldValue,vt=null,yt=null;function at(e){if(typeof Ot=="function"&&Ft(e),yt&&typeof yt.setStrictMode=="function")try{yt.setStrictMode(vt,e)}catch{}}var _t=Math.clz32?Math.clz32:Vt,Tt=Math.log,Rt=Math.LN2;function Vt(e){return e>>>=0,e===0?32:31-(Tt(e)/Rt|0)|0}var qt=256,re=262144,$=4194304;function Ht(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Mt(e,i,s){var l=e.pendingLanes;if(l===0)return 0;var f=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var U=l&134217727;return U!==0?(l=U&~d,l!==0?f=Ht(l):(y&=U,y!==0?f=Ht(y):s||(s=U&~e,s!==0&&(f=Ht(s))))):(U=l&~d,U!==0?f=Ht(U):y!==0?f=Ht(y):s||(s=l&~e,s!==0&&(f=Ht(s)))),f===0?0:i!==0&&i!==f&&(i&d)===0&&(d=f&-f,s=i&-i,d>=s||d===32&&(s&4194048)!==0)?i:f}function Gt(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Yt(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ut(){var e=$;return $<<=1,($&62914560)===0&&($=4194304),e}function oe(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function $t(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function We(e,i,s,l,f,d){var y=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var U=e.entanglements,K=e.expirationTimes,ft=e.hiddenUpdates;for(s=y&~s;0<s;){var Et=31-_t(s),At=1<<Et;U[Et]=0,K[Et]=-1;var ht=ft[Et];if(ht!==null)for(ft[Et]=null,Et=0;Et<ht.length;Et++){var gt=ht[Et];gt!==null&&(gt.lane&=-536870913)}s&=~At}l!==0&&Pe(e,l,0),d!==0&&f===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~i))}function Pe(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-_t(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|s&261930}function Kn(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var l=31-_t(s),f=1<<l;f&i|e[l]&i&&(e[l]|=i),s&=~f}}function ai(e,i){var s=i&-i;return s=(s&42)!==0?1:to(s),(s&(e.suspendedLanes|i))!==0?0:s}function to(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function eo(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function no(){var e=P.p;return e!==0?e:(e=window.event,e===void 0?32:dv(e.type))}function Zs(e,i){var s=P.p;try{return P.p=e,i()}finally{P.p=s}}var Xi=Math.random().toString(36).slice(2),dn="__reactFiber$"+Xi,Cn="__reactProps$"+Xi,Jn="__reactContainer$"+Xi,ds="__reactEvents$"+Xi,bl="__reactListeners$"+Xi,Tl="__reactHandles$"+Xi,ps="__reactResources$"+Xi,Oa="__reactMarker$"+Xi;function Pa(e){delete e[dn],delete e[Cn],delete e[ds],delete e[bl],delete e[Tl]}function aa(e){var i=e[dn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Jn]||s[dn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=Qg(e);e!==null;){if(s=e[dn])return s;e=Qg(e)}return i}e=s,s=e.parentNode}return null}function sa(e){if(e=e[dn]||e[Jn]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function ms(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Ia(e){var i=e[ps];return i||(i=e[ps]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function pn(e){e[Oa]=!0}var Al=new Set,io={};function C(e,i){tt(e,i),tt(e+"Capture",i)}function tt(e,i){for(io[e]=i,e=0;e<i.length;e++)Al.add(i[e])}var pt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ot={},lt={};function Xt(e){return ae.call(lt,e)?!0:ae.call(ot,e)?!1:pt.test(e)?lt[e]=!0:(ot[e]=!0,!1)}function Jt(e,i,s){if(Xt(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function kt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function Zt(e,i,s,l){if(l===null)e.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+l)}}function Kt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function _e(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ae(e,i,s){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,d=l.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return f.call(this)},set:function(y){s=""+y,d.call(this,y)}}),Object.defineProperty(e,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(y){s=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function te(e){if(!e._valueTracker){var i=_e(e)?"checked":"value";e._valueTracker=Ae(e,i,""+e[i])}}function Ie(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return e&&(l=_e(e)?e.checked?"true":"false":e.value),e=l,e!==s?(i.setValue(e),!0):!1}function $e(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Je=/[\n"\\]/g;function Me(e){return e.replace(Je,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function mn(e,i,s,l,f,d,y,U){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Kt(i)):e.value!==""+Kt(i)&&(e.value=""+Kt(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?yn(e,y,Kt(i)):s!=null?yn(e,y,Kt(s)):l!=null&&e.removeAttribute("value"),f==null&&d!=null&&(e.defaultChecked=!!d),f!=null&&(e.checked=f&&typeof f!="function"&&typeof f!="symbol"),U!=null&&typeof U!="function"&&typeof U!="symbol"&&typeof U!="boolean"?e.name=""+Kt(U):e.removeAttribute("name")}function Qt(e,i,s,l,f,d,y,U){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),i!=null||s!=null){if(!(d!=="submit"&&d!=="reset"||i!=null)){te(e);return}s=s!=null?""+Kt(s):"",i=i!=null?""+Kt(i):s,U||i===e.value||(e.value=i),e.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=U?e.checked:!!l,e.defaultChecked=!!l,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),te(e)}function yn(e,i,s){i==="number"&&$e(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function Ee(e,i,s,l){if(e=e.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<e.length;s++)f=i.hasOwnProperty("$"+e[s].value),e[s].selected!==f&&(e[s].selected=f),f&&l&&(e[s].defaultSelected=!0)}else{for(s=""+Kt(s),i=null,f=0;f<e.length;f++){if(e[f].value===s){e[f].selected=!0,l&&(e[f].defaultSelected=!0);return}i!==null||e[f].disabled||(i=e[f])}i!==null&&(i.selected=!0)}}function Gn(e,i,s){if(i!=null&&(i=""+Kt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Kt(s):""}function si(e,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(q(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Kt(i),e.defaultValue=s,l=e.textContent,l===s&&l!==""&&l!==null&&(e.value=l),te(e)}function Vn(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var za=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Fe(e,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,s):typeof s!="number"||s===0||za.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function an(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&Fe(e,f,l)}else for(var d in i)i.hasOwnProperty(d)&&Fe(e,d,i[d])}function xi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qe=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Wi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Li(e){return Wi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Si(){}var Lu=null;function Nu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ks=null,Js=null;function Vp(e){var i=sa(e);if(i&&(e=i.stateNode)){var s=e[Cn]||null;t:switch(e=i.stateNode,i.type){case"input":if(mn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+Me(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==e&&l.form===e.form){var f=l[Cn]||null;if(!f)throw Error(a(90));mn(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===e.form&&Ie(l)}break t;case"textarea":Gn(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&Ee(e,!!s.multiple,i,!1)}}}var Ou=!1;function kp(e,i,s){if(Ou)return e(i,s);Ou=!0;try{var l=e(i);return l}finally{if(Ou=!1,(Ks!==null||Js!==null)&&(dc(),Ks&&(i=Ks,e=Js,Js=Ks=null,Vp(i),e)))for(i=0;i<e.length;i++)Vp(e[i])}}function ao(e,i){var s=e.stateNode;if(s===null)return null;var l=s[Cn]||null;if(l===null)return null;s=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var ra=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Pu=!1;if(ra)try{var so={};Object.defineProperty(so,"passive",{get:function(){Pu=!0}}),window.addEventListener("test",so,so),window.removeEventListener("test",so,so)}catch{Pu=!1}var Ba=null,Iu=null,wl=null;function Xp(){if(wl)return wl;var e,i=Iu,s=i.length,l,f="value"in Ba?Ba.value:Ba.textContent,d=f.length;for(e=0;e<s&&i[e]===f[e];e++);var y=s-e;for(l=1;l<=y&&i[s-l]===f[d-l];l++);return wl=f.slice(e,1<l?1-l:void 0)}function Rl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Cl(){return!0}function Wp(){return!1}function Qn(e){function i(s,l,f,d,y){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var U in e)e.hasOwnProperty(U)&&(s=e[U],this[U]=s?s(d):d[U]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Cl:Wp,this.isPropagationStopped=Wp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Cl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Cl)},persist:function(){},isPersistent:Cl}),i}var gs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Dl=Qn(gs),ro=_({},gs,{view:0,detail:0}),Ix=Qn(ro),zu,Bu,oo,Ul=_({},ro,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==oo&&(oo&&e.type==="mousemove"?(zu=e.screenX-oo.screenX,Bu=e.screenY-oo.screenY):Bu=zu=0,oo=e),zu)},movementY:function(e){return"movementY"in e?e.movementY:Bu}}),qp=Qn(Ul),zx=_({},Ul,{dataTransfer:0}),Bx=Qn(zx),Fx=_({},ro,{relatedTarget:0}),Fu=Qn(Fx),Hx=_({},gs,{animationName:0,elapsedTime:0,pseudoElement:0}),Gx=Qn(Hx),Vx=_({},gs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),kx=Qn(Vx),Xx=_({},gs,{data:0}),Yp=Qn(Xx),Wx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Yx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Zx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Yx[e])?!!i[e]:!1}function Hu(){return Zx}var Kx=_({},ro,{key:function(e){if(e.key){var i=Wx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Rl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?qx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hu,charCode:function(e){return e.type==="keypress"?Rl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Rl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Jx=Qn(Kx),Qx=_({},Ul,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zp=Qn(Qx),jx=_({},ro,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hu}),$x=Qn(jx),tS=_({},gs,{propertyName:0,elapsedTime:0,pseudoElement:0}),eS=Qn(tS),nS=_({},Ul,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),iS=Qn(nS),aS=_({},gs,{newState:0,oldState:0}),sS=Qn(aS),rS=[9,13,27,32],Gu=ra&&"CompositionEvent"in window,lo=null;ra&&"documentMode"in document&&(lo=document.documentMode);var oS=ra&&"TextEvent"in window&&!lo,Kp=ra&&(!Gu||lo&&8<lo&&11>=lo),Jp=" ",Qp=!1;function jp(e,i){switch(e){case"keyup":return rS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $p(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Qs=!1;function lS(e,i){switch(e){case"compositionend":return $p(i);case"keypress":return i.which!==32?null:(Qp=!0,Jp);case"textInput":return e=i.data,e===Jp&&Qp?null:e;default:return null}}function cS(e,i){if(Qs)return e==="compositionend"||!Gu&&jp(e,i)?(e=Xp(),wl=Iu=Ba=null,Qs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Kp&&i.locale!=="ko"?null:i.data;default:return null}}var uS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function tm(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!uS[e.type]:i==="textarea"}function em(e,i,s,l){Ks?Js?Js.push(l):Js=[l]:Ks=l,i=Sc(i,"onChange"),0<i.length&&(s=new Dl("onChange","change",null,s,l),e.push({event:s,listeners:i}))}var co=null,uo=null;function fS(e){zg(e,0)}function Ll(e){var i=ms(e);if(Ie(i))return e}function nm(e,i){if(e==="change")return i}var im=!1;if(ra){var Vu;if(ra){var ku="oninput"in document;if(!ku){var am=document.createElement("div");am.setAttribute("oninput","return;"),ku=typeof am.oninput=="function"}Vu=ku}else Vu=!1;im=Vu&&(!document.documentMode||9<document.documentMode)}function sm(){co&&(co.detachEvent("onpropertychange",rm),uo=co=null)}function rm(e){if(e.propertyName==="value"&&Ll(uo)){var i=[];em(i,uo,e,Nu(e)),kp(fS,i)}}function hS(e,i,s){e==="focusin"?(sm(),co=i,uo=s,co.attachEvent("onpropertychange",rm)):e==="focusout"&&sm()}function dS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ll(uo)}function pS(e,i){if(e==="click")return Ll(i)}function mS(e,i){if(e==="input"||e==="change")return Ll(i)}function gS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ri=typeof Object.is=="function"?Object.is:gS;function fo(e,i){if(ri(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!ae.call(i,f)||!ri(e[f],i[f]))return!1}return!0}function om(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function lm(e,i){var s=om(e);e=0;for(var l;s;){if(s.nodeType===3){if(l=e+s.textContent.length,e<=i&&l>=i)return{node:s,offset:i-e};e=l}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=om(s)}}function cm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?cm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function um(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=$e(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=$e(e.document)}return i}function Xu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var vS=ra&&"documentMode"in document&&11>=document.documentMode,js=null,Wu=null,ho=null,qu=!1;function fm(e,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;qu||js==null||js!==$e(l)||(l=js,"selectionStart"in l&&Xu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),ho&&fo(ho,l)||(ho=l,l=Sc(Wu,"onSelect"),0<l.length&&(i=new Dl("onSelect","select",null,i,s),e.push({event:i,listeners:l}),i.target=js)))}function vs(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var $s={animationend:vs("Animation","AnimationEnd"),animationiteration:vs("Animation","AnimationIteration"),animationstart:vs("Animation","AnimationStart"),transitionrun:vs("Transition","TransitionRun"),transitionstart:vs("Transition","TransitionStart"),transitioncancel:vs("Transition","TransitionCancel"),transitionend:vs("Transition","TransitionEnd")},Yu={},hm={};ra&&(hm=document.createElement("div").style,"AnimationEvent"in window||(delete $s.animationend.animation,delete $s.animationiteration.animation,delete $s.animationstart.animation),"TransitionEvent"in window||delete $s.transitionend.transition);function _s(e){if(Yu[e])return Yu[e];if(!$s[e])return e;var i=$s[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in hm)return Yu[e]=i[s];return e}var dm=_s("animationend"),pm=_s("animationiteration"),mm=_s("animationstart"),_S=_s("transitionrun"),xS=_s("transitionstart"),SS=_s("transitioncancel"),gm=_s("transitionend"),vm=new Map,Zu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Zu.push("scrollEnd");function Ni(e,i){vm.set(e,i),C(i,[e])}var Nl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},yi=[],tr=0,Ku=0;function Ol(){for(var e=tr,i=Ku=tr=0;i<e;){var s=yi[i];yi[i++]=null;var l=yi[i];yi[i++]=null;var f=yi[i];yi[i++]=null;var d=yi[i];if(yi[i++]=null,l!==null&&f!==null){var y=l.pending;y===null?f.next=f:(f.next=y.next,y.next=f),l.pending=f}d!==0&&_m(s,f,d)}}function Pl(e,i,s,l){yi[tr++]=e,yi[tr++]=i,yi[tr++]=s,yi[tr++]=l,Ku|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Ju(e,i,s,l){return Pl(e,i,s,l),Il(e)}function xs(e,i){return Pl(e,null,null,i),Il(e)}function _m(e,i,s){e.lanes|=s;var l=e.alternate;l!==null&&(l.lanes|=s);for(var f=!1,d=e.return;d!==null;)d.childLanes|=s,l=d.alternate,l!==null&&(l.childLanes|=s),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(f=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,f&&i!==null&&(f=31-_t(s),e=d.hiddenUpdates,l=e[f],l===null?e[f]=[i]:l.push(i),i.lane=s|536870912),d):null}function Il(e){if(50<Po)throw Po=0,rh=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var er={};function yS(e,i,s,l){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function oi(e,i,s,l){return new yS(e,i,s,l)}function Qu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function oa(e,i){var s=e.alternate;return s===null?(s=oi(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function xm(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function zl(e,i,s,l,f,d){var y=0;if(l=e,typeof e=="function")Qu(e)&&(y=1);else if(typeof e=="string")y=Ay(e,s,xt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case L:return e=oi(31,s,i,f),e.elementType=L,e.lanes=d,e;case D:return Ss(s.children,f,d,i);case M:y=8,f|=24;break;case S:return e=oi(12,s,i,f|2),e.elementType=S,e.lanes=d,e;case O:return e=oi(13,s,i,f),e.elementType=O,e.lanes=d,e;case w:return e=oi(19,s,i,f),e.elementType=w,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case z:y=10;break t;case I:y=9;break t;case A:y=11;break t;case N:y=14;break t;case E:y=16,l=null;break t}y=29,s=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=oi(y,s,i,f),i.elementType=e,i.type=l,i.lanes=d,i}function Ss(e,i,s,l){return e=oi(7,e,l,i),e.lanes=s,e}function ju(e,i,s){return e=oi(6,e,null,i),e.lanes=s,e}function Sm(e){var i=oi(18,null,null,0);return i.stateNode=e,i}function $u(e,i,s){return i=oi(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var ym=new WeakMap;function Mi(e,i){if(typeof e=="object"&&e!==null){var s=ym.get(e);return s!==void 0?s:(i={value:e,source:i,stack:It(i)},ym.set(e,i),i)}return{value:e,source:i,stack:It(i)}}var nr=[],ir=0,Bl=null,po=0,Ei=[],bi=0,Fa=null,qi=1,Yi="";function la(e,i){nr[ir++]=po,nr[ir++]=Bl,Bl=e,po=i}function Mm(e,i,s){Ei[bi++]=qi,Ei[bi++]=Yi,Ei[bi++]=Fa,Fa=e;var l=qi;e=Yi;var f=32-_t(l)-1;l&=~(1<<f),s+=1;var d=32-_t(i)+f;if(30<d){var y=f-f%5;d=(l&(1<<y)-1).toString(32),l>>=y,f-=y,qi=1<<32-_t(i)+f|s<<f|l,Yi=d+e}else qi=1<<d|s<<f|l,Yi=e}function tf(e){e.return!==null&&(la(e,1),Mm(e,1,0))}function ef(e){for(;e===Bl;)Bl=nr[--ir],nr[ir]=null,po=nr[--ir],nr[ir]=null;for(;e===Fa;)Fa=Ei[--bi],Ei[bi]=null,Yi=Ei[--bi],Ei[bi]=null,qi=Ei[--bi],Ei[bi]=null}function Em(e,i){Ei[bi++]=qi,Ei[bi++]=Yi,Ei[bi++]=Fa,qi=i.id,Yi=i.overflow,Fa=e}var Dn=null,tn=null,Ue=!1,Ha=null,Ti=!1,nf=Error(a(519));function Ga(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw mo(Mi(i,e)),nf}function bm(e){var i=e.stateNode,s=e.type,l=e.memoizedProps;switch(i[dn]=e,i[Cn]=l,s){case"dialog":Re("cancel",i),Re("close",i);break;case"iframe":case"object":case"embed":Re("load",i);break;case"video":case"audio":for(s=0;s<zo.length;s++)Re(zo[s],i);break;case"source":Re("error",i);break;case"img":case"image":case"link":Re("error",i),Re("load",i);break;case"details":Re("toggle",i);break;case"input":Re("invalid",i),Qt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":Re("invalid",i);break;case"textarea":Re("invalid",i),si(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||Gg(i.textContent,s)?(l.popover!=null&&(Re("beforetoggle",i),Re("toggle",i)),l.onScroll!=null&&Re("scroll",i),l.onScrollEnd!=null&&Re("scrollend",i),l.onClick!=null&&(i.onclick=Si),i=!0):i=!1,i||Ga(e,!0)}function Tm(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:Ti=!1;return;case 27:case 3:Ti=!0;return;default:Dn=Dn.return}}function ar(e){if(e!==Dn)return!1;if(!Ue)return Tm(e),Ue=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||yh(e.type,e.memoizedProps)),s=!s),s&&tn&&Ga(e),Tm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));tn=Jg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));tn=Jg(e)}else i===27?(i=tn,es(e.type)?(e=Ah,Ah=null,tn=e):tn=i):tn=Dn?wi(e.stateNode.nextSibling):null;return!0}function ys(){tn=Dn=null,Ue=!1}function af(){var e=Ha;return e!==null&&(ei===null?ei=e:ei.push.apply(ei,e),Ha=null),e}function mo(e){Ha===null?Ha=[e]:Ha.push(e)}var sf=R(null),Ms=null,ca=null;function Va(e,i,s){rt(sf,i._currentValue),i._currentValue=s}function ua(e){e._currentValue=sf.current,J(sf)}function rf(e,i,s){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===s)break;e=e.return}}function of(e,i,s,l){var f=e.child;for(f!==null&&(f.return=e);f!==null;){var d=f.dependencies;if(d!==null){var y=f.child;d=d.firstContext;t:for(;d!==null;){var U=d;d=f;for(var K=0;K<i.length;K++)if(U.context===i[K]){d.lanes|=s,U=d.alternate,U!==null&&(U.lanes|=s),rf(d.return,s,e),l||(y=null);break t}d=U.next}}else if(f.tag===18){if(y=f.return,y===null)throw Error(a(341));y.lanes|=s,d=y.alternate,d!==null&&(d.lanes|=s),rf(y,s,e),y=null}else y=f.child;if(y!==null)y.return=f;else for(y=f;y!==null;){if(y===e){y=null;break}if(f=y.sibling,f!==null){f.return=y.return,y=f;break}y=y.return}f=y}}function sr(e,i,s,l){e=null;for(var f=i,d=!1;f!==null;){if(!d){if((f.flags&524288)!==0)d=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var y=f.alternate;if(y===null)throw Error(a(387));if(y=y.memoizedProps,y!==null){var U=f.type;ri(f.pendingProps.value,y.value)||(e!==null?e.push(U):e=[U])}}else if(f===nt.current){if(y=f.alternate,y===null)throw Error(a(387));y.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(e!==null?e.push(Vo):e=[Vo])}f=f.return}e!==null&&of(i,e,s,l),i.flags|=262144}function Fl(e){for(e=e.firstContext;e!==null;){if(!ri(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Es(e){Ms=e,ca=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return Am(Ms,e)}function Hl(e,i){return Ms===null&&Es(e),Am(e,i)}function Am(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ca===null){if(e===null)throw Error(a(308));ca=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ca=ca.next=i;return s}var MS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},ES=r.unstable_scheduleCallback,bS=r.unstable_NormalPriority,gn={$$typeof:z,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function lf(){return{controller:new MS,data:new Map,refCount:0}}function go(e){e.refCount--,e.refCount===0&&ES(bS,function(){e.controller.abort()})}var vo=null,cf=0,rr=0,or=null;function TS(e,i){if(vo===null){var s=vo=[];cf=0,rr=hh(),or={status:"pending",value:void 0,then:function(l){s.push(l)}}}return cf++,i.then(wm,wm),i}function wm(){if(--cf===0&&vo!==null){or!==null&&(or.status="fulfilled");var e=vo;vo=null,rr=0,or=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function AS(e,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var Rm=B.S;B.S=function(e,i){fg=pe(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&TS(e,i),Rm!==null&&Rm(e,i)};var bs=R(null);function uf(){var e=bs.current;return e!==null?e:Qe.pooledCache}function Gl(e,i){i===null?rt(bs,bs.current):rt(bs,i.pool)}function Cm(){var e=uf();return e===null?null:{parent:gn._currentValue,pool:e}}var lr=Error(a(460)),ff=Error(a(474)),Vl=Error(a(542)),kl={then:function(){}};function Dm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Um(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Si,Si),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Nm(e),e;default:if(typeof i.status=="string")i.then(Si,Si);else{if(e=Qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Nm(e),e}throw As=i,lr}}function Ts(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(As=s,lr):s}}var As=null;function Lm(){if(As===null)throw Error(a(459));var e=As;return As=null,e}function Nm(e){if(e===lr||e===Vl)throw Error(a(483))}var cr=null,_o=0;function Xl(e){var i=_o;return _o+=1,cr===null&&(cr=[]),Um(cr,e,i)}function xo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Wl(e,i){throw i.$$typeof===v?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Om(e){function i(st,et){if(e){var ut=st.deletions;ut===null?(st.deletions=[et],st.flags|=16):ut.push(et)}}function s(st,et){if(!e)return null;for(;et!==null;)i(st,et),et=et.sibling;return null}function l(st){for(var et=new Map;st!==null;)st.key!==null?et.set(st.key,st):et.set(st.index,st),st=st.sibling;return et}function f(st,et){return st=oa(st,et),st.index=0,st.sibling=null,st}function d(st,et,ut){return st.index=ut,e?(ut=st.alternate,ut!==null?(ut=ut.index,ut<et?(st.flags|=67108866,et):ut):(st.flags|=67108866,et)):(st.flags|=1048576,et)}function y(st){return e&&st.alternate===null&&(st.flags|=67108866),st}function U(st,et,ut,bt){return et===null||et.tag!==6?(et=ju(ut,st.mode,bt),et.return=st,et):(et=f(et,ut),et.return=st,et)}function K(st,et,ut,bt){var le=ut.type;return le===D?Et(st,et,ut.props.children,bt,ut.key):et!==null&&(et.elementType===le||typeof le=="object"&&le!==null&&le.$$typeof===E&&Ts(le)===et.type)?(et=f(et,ut.props),xo(et,ut),et.return=st,et):(et=zl(ut.type,ut.key,ut.props,null,st.mode,bt),xo(et,ut),et.return=st,et)}function ft(st,et,ut,bt){return et===null||et.tag!==4||et.stateNode.containerInfo!==ut.containerInfo||et.stateNode.implementation!==ut.implementation?(et=$u(ut,st.mode,bt),et.return=st,et):(et=f(et,ut.children||[]),et.return=st,et)}function Et(st,et,ut,bt,le){return et===null||et.tag!==7?(et=Ss(ut,st.mode,bt,le),et.return=st,et):(et=f(et,ut),et.return=st,et)}function At(st,et,ut){if(typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint")return et=ju(""+et,st.mode,ut),et.return=st,et;if(typeof et=="object"&&et!==null){switch(et.$$typeof){case x:return ut=zl(et.type,et.key,et.props,null,st.mode,ut),xo(ut,et),ut.return=st,ut;case b:return et=$u(et,st.mode,ut),et.return=st,et;case E:return et=Ts(et),At(st,et,ut)}if(q(et)||Y(et))return et=Ss(et,st.mode,ut,null),et.return=st,et;if(typeof et.then=="function")return At(st,Xl(et),ut);if(et.$$typeof===z)return At(st,Hl(st,et),ut);Wl(st,et)}return null}function ht(st,et,ut,bt){var le=et!==null?et.key:null;if(typeof ut=="string"&&ut!==""||typeof ut=="number"||typeof ut=="bigint")return le!==null?null:U(st,et,""+ut,bt);if(typeof ut=="object"&&ut!==null){switch(ut.$$typeof){case x:return ut.key===le?K(st,et,ut,bt):null;case b:return ut.key===le?ft(st,et,ut,bt):null;case E:return ut=Ts(ut),ht(st,et,ut,bt)}if(q(ut)||Y(ut))return le!==null?null:Et(st,et,ut,bt,null);if(typeof ut.then=="function")return ht(st,et,Xl(ut),bt);if(ut.$$typeof===z)return ht(st,et,Hl(st,ut),bt);Wl(st,ut)}return null}function gt(st,et,ut,bt,le){if(typeof bt=="string"&&bt!==""||typeof bt=="number"||typeof bt=="bigint")return st=st.get(ut)||null,U(et,st,""+bt,le);if(typeof bt=="object"&&bt!==null){switch(bt.$$typeof){case x:return st=st.get(bt.key===null?ut:bt.key)||null,K(et,st,bt,le);case b:return st=st.get(bt.key===null?ut:bt.key)||null,ft(et,st,bt,le);case E:return bt=Ts(bt),gt(st,et,ut,bt,le)}if(q(bt)||Y(bt))return st=st.get(ut)||null,Et(et,st,bt,le,null);if(typeof bt.then=="function")return gt(st,et,ut,Xl(bt),le);if(bt.$$typeof===z)return gt(st,et,ut,Hl(et,bt),le);Wl(et,bt)}return null}function ne(st,et,ut,bt){for(var le=null,ze=null,se=et,ye=et=0,De=null;se!==null&&ye<ut.length;ye++){se.index>ye?(De=se,se=null):De=se.sibling;var Be=ht(st,se,ut[ye],bt);if(Be===null){se===null&&(se=De);break}e&&se&&Be.alternate===null&&i(st,se),et=d(Be,et,ye),ze===null?le=Be:ze.sibling=Be,ze=Be,se=De}if(ye===ut.length)return s(st,se),Ue&&la(st,ye),le;if(se===null){for(;ye<ut.length;ye++)se=At(st,ut[ye],bt),se!==null&&(et=d(se,et,ye),ze===null?le=se:ze.sibling=se,ze=se);return Ue&&la(st,ye),le}for(se=l(se);ye<ut.length;ye++)De=gt(se,st,ye,ut[ye],bt),De!==null&&(e&&De.alternate!==null&&se.delete(De.key===null?ye:De.key),et=d(De,et,ye),ze===null?le=De:ze.sibling=De,ze=De);return e&&se.forEach(function(rs){return i(st,rs)}),Ue&&la(st,ye),le}function fe(st,et,ut,bt){if(ut==null)throw Error(a(151));for(var le=null,ze=null,se=et,ye=et=0,De=null,Be=ut.next();se!==null&&!Be.done;ye++,Be=ut.next()){se.index>ye?(De=se,se=null):De=se.sibling;var rs=ht(st,se,Be.value,bt);if(rs===null){se===null&&(se=De);break}e&&se&&rs.alternate===null&&i(st,se),et=d(rs,et,ye),ze===null?le=rs:ze.sibling=rs,ze=rs,se=De}if(Be.done)return s(st,se),Ue&&la(st,ye),le;if(se===null){for(;!Be.done;ye++,Be=ut.next())Be=At(st,Be.value,bt),Be!==null&&(et=d(Be,et,ye),ze===null?le=Be:ze.sibling=Be,ze=Be);return Ue&&la(st,ye),le}for(se=l(se);!Be.done;ye++,Be=ut.next())Be=gt(se,st,ye,Be.value,bt),Be!==null&&(e&&Be.alternate!==null&&se.delete(Be.key===null?ye:Be.key),et=d(Be,et,ye),ze===null?le=Be:ze.sibling=Be,ze=Be);return e&&se.forEach(function(zy){return i(st,zy)}),Ue&&la(st,ye),le}function Ke(st,et,ut,bt){if(typeof ut=="object"&&ut!==null&&ut.type===D&&ut.key===null&&(ut=ut.props.children),typeof ut=="object"&&ut!==null){switch(ut.$$typeof){case x:t:{for(var le=ut.key;et!==null;){if(et.key===le){if(le=ut.type,le===D){if(et.tag===7){s(st,et.sibling),bt=f(et,ut.props.children),bt.return=st,st=bt;break t}}else if(et.elementType===le||typeof le=="object"&&le!==null&&le.$$typeof===E&&Ts(le)===et.type){s(st,et.sibling),bt=f(et,ut.props),xo(bt,ut),bt.return=st,st=bt;break t}s(st,et);break}else i(st,et);et=et.sibling}ut.type===D?(bt=Ss(ut.props.children,st.mode,bt,ut.key),bt.return=st,st=bt):(bt=zl(ut.type,ut.key,ut.props,null,st.mode,bt),xo(bt,ut),bt.return=st,st=bt)}return y(st);case b:t:{for(le=ut.key;et!==null;){if(et.key===le)if(et.tag===4&&et.stateNode.containerInfo===ut.containerInfo&&et.stateNode.implementation===ut.implementation){s(st,et.sibling),bt=f(et,ut.children||[]),bt.return=st,st=bt;break t}else{s(st,et);break}else i(st,et);et=et.sibling}bt=$u(ut,st.mode,bt),bt.return=st,st=bt}return y(st);case E:return ut=Ts(ut),Ke(st,et,ut,bt)}if(q(ut))return ne(st,et,ut,bt);if(Y(ut)){if(le=Y(ut),typeof le!="function")throw Error(a(150));return ut=le.call(ut),fe(st,et,ut,bt)}if(typeof ut.then=="function")return Ke(st,et,Xl(ut),bt);if(ut.$$typeof===z)return Ke(st,et,Hl(st,ut),bt);Wl(st,ut)}return typeof ut=="string"&&ut!==""||typeof ut=="number"||typeof ut=="bigint"?(ut=""+ut,et!==null&&et.tag===6?(s(st,et.sibling),bt=f(et,ut),bt.return=st,st=bt):(s(st,et),bt=ju(ut,st.mode,bt),bt.return=st,st=bt),y(st)):s(st,et)}return function(st,et,ut,bt){try{_o=0;var le=Ke(st,et,ut,bt);return cr=null,le}catch(se){if(se===lr||se===Vl)throw se;var ze=oi(29,se,null,st.mode);return ze.lanes=bt,ze.return=st,ze}finally{}}}var ws=Om(!0),Pm=Om(!1),ka=!1;function hf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function df(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Xa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Wa(e,i,s){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(He&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=Il(e),_m(e,null,s),i}return Pl(e,l,i,s),Il(e)}function So(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,Kn(e,s)}}function pf(e,i){var s=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,d=null;if(s=s.firstBaseUpdate,s!==null){do{var y={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};d===null?f=d=y:d=d.next=y,s=s.next}while(s!==null);d===null?f=d=i:d=d.next=i}else f=d=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:d,shared:l.shared,callbacks:l.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var mf=!1;function yo(){if(mf){var e=or;if(e!==null)throw e}}function Mo(e,i,s,l){mf=!1;var f=e.updateQueue;ka=!1;var d=f.firstBaseUpdate,y=f.lastBaseUpdate,U=f.shared.pending;if(U!==null){f.shared.pending=null;var K=U,ft=K.next;K.next=null,y===null?d=ft:y.next=ft,y=K;var Et=e.alternate;Et!==null&&(Et=Et.updateQueue,U=Et.lastBaseUpdate,U!==y&&(U===null?Et.firstBaseUpdate=ft:U.next=ft,Et.lastBaseUpdate=K))}if(d!==null){var At=f.baseState;y=0,Et=ft=K=null,U=d;do{var ht=U.lane&-536870913,gt=ht!==U.lane;if(gt?(Ce&ht)===ht:(l&ht)===ht){ht!==0&&ht===rr&&(mf=!0),Et!==null&&(Et=Et.next={lane:0,tag:U.tag,payload:U.payload,callback:null,next:null});t:{var ne=e,fe=U;ht=i;var Ke=s;switch(fe.tag){case 1:if(ne=fe.payload,typeof ne=="function"){At=ne.call(Ke,At,ht);break t}At=ne;break t;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=fe.payload,ht=typeof ne=="function"?ne.call(Ke,At,ht):ne,ht==null)break t;At=_({},At,ht);break t;case 2:ka=!0}}ht=U.callback,ht!==null&&(e.flags|=64,gt&&(e.flags|=8192),gt=f.callbacks,gt===null?f.callbacks=[ht]:gt.push(ht))}else gt={lane:ht,tag:U.tag,payload:U.payload,callback:U.callback,next:null},Et===null?(ft=Et=gt,K=At):Et=Et.next=gt,y|=ht;if(U=U.next,U===null){if(U=f.shared.pending,U===null)break;gt=U,U=gt.next,gt.next=null,f.lastBaseUpdate=gt,f.shared.pending=null}}while(!0);Et===null&&(K=At),f.baseState=K,f.firstBaseUpdate=ft,f.lastBaseUpdate=Et,d===null&&(f.shared.lanes=0),Ja|=y,e.lanes=y,e.memoizedState=At}}function Im(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function zm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Im(s[e],i)}var ur=R(null),ql=R(0);function Bm(e,i){e=xa,rt(ql,e),rt(ur,i),xa=e|i.baseLanes}function gf(){rt(ql,xa),rt(ur,ur.current)}function vf(){xa=ql.current,J(ur),J(ql)}var li=R(null),Ai=null;function qa(e){var i=e.alternate;rt(cn,cn.current&1),rt(li,e),Ai===null&&(i===null||ur.current!==null||i.memoizedState!==null)&&(Ai=e)}function _f(e){rt(cn,cn.current),rt(li,e),Ai===null&&(Ai=e)}function Fm(e){e.tag===22?(rt(cn,cn.current),rt(li,e),Ai===null&&(Ai=e)):Ya()}function Ya(){rt(cn,cn.current),rt(li,li.current)}function ci(e){J(li),Ai===e&&(Ai=null),J(cn)}var cn=R(0);function Yl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||bh(s)||Th(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var fa=0,xe=null,Ye=null,vn=null,Zl=!1,fr=!1,Rs=!1,Kl=0,Eo=0,hr=null,wS=0;function on(){throw Error(a(321))}function xf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!ri(e[s],i[s]))return!1;return!0}function Sf(e,i,s,l,f,d){return fa=d,xe=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,B.H=e===null||e.memoizedState===null?M0:Pf,Rs=!1,d=s(l,f),Rs=!1,fr&&(d=Gm(i,s,l,f)),Hm(e),d}function Hm(e){B.H=Ao;var i=Ye!==null&&Ye.next!==null;if(fa=0,vn=Ye=xe=null,Zl=!1,Eo=0,hr=null,i)throw Error(a(300));e===null||_n||(e=e.dependencies,e!==null&&Fl(e)&&(_n=!0))}function Gm(e,i,s,l){xe=e;var f=0;do{if(fr&&(hr=null),Eo=0,fr=!1,25<=f)throw Error(a(301));if(f+=1,vn=Ye=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}B.H=E0,d=i(s,l)}while(fr);return d}function RS(){var e=B.H,i=e.useState()[0];return i=typeof i.then=="function"?bo(i):i,e=e.useState()[0],(Ye!==null?Ye.memoizedState:null)!==e&&(xe.flags|=1024),i}function yf(){var e=Kl!==0;return Kl=0,e}function Mf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function Ef(e){if(Zl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Zl=!1}fa=0,vn=Ye=xe=null,fr=!1,Eo=Kl=0,hr=null}function kn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return vn===null?xe.memoizedState=vn=e:vn=vn.next=e,vn}function un(){if(Ye===null){var e=xe.alternate;e=e!==null?e.memoizedState:null}else e=Ye.next;var i=vn===null?xe.memoizedState:vn.next;if(i!==null)vn=i,Ye=e;else{if(e===null)throw xe.alternate===null?Error(a(467)):Error(a(310));Ye=e,e={memoizedState:Ye.memoizedState,baseState:Ye.baseState,baseQueue:Ye.baseQueue,queue:Ye.queue,next:null},vn===null?xe.memoizedState=vn=e:vn=vn.next=e}return vn}function Jl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function bo(e){var i=Eo;return Eo+=1,hr===null&&(hr=[]),e=Um(hr,e,i),i=xe,(vn===null?i.memoizedState:vn.next)===null&&(i=i.alternate,B.H=i===null||i.memoizedState===null?M0:Pf),e}function Ql(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return bo(e);if(e.$$typeof===z)return Un(e)}throw Error(a(438,String(e)))}function bf(e){var i=null,s=xe.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=xe.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Jl(),xe.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),l=0;l<e;l++)s[l]=H;return i.index++,s}function ha(e,i){return typeof i=="function"?i(e):i}function jl(e){var i=un();return Tf(i,Ye,e)}function Tf(e,i,s){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=e.baseQueue,d=l.pending;if(d!==null){if(f!==null){var y=f.next;f.next=d.next,d.next=y}i.baseQueue=f=d,l.pending=null}if(d=e.baseState,f===null)e.memoizedState=d;else{i=f.next;var U=y=null,K=null,ft=i,Et=!1;do{var At=ft.lane&-536870913;if(At!==ft.lane?(Ce&At)===At:(fa&At)===At){var ht=ft.revertLane;if(ht===0)K!==null&&(K=K.next={lane:0,revertLane:0,gesture:null,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null}),At===rr&&(Et=!0);else if((fa&ht)===ht){ft=ft.next,ht===rr&&(Et=!0);continue}else At={lane:0,revertLane:ft.revertLane,gesture:null,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null},K===null?(U=K=At,y=d):K=K.next=At,xe.lanes|=ht,Ja|=ht;At=ft.action,Rs&&s(d,At),d=ft.hasEagerState?ft.eagerState:s(d,At)}else ht={lane:At,revertLane:ft.revertLane,gesture:ft.gesture,action:ft.action,hasEagerState:ft.hasEagerState,eagerState:ft.eagerState,next:null},K===null?(U=K=ht,y=d):K=K.next=ht,xe.lanes|=At,Ja|=At;ft=ft.next}while(ft!==null&&ft!==i);if(K===null?y=d:K.next=U,!ri(d,e.memoizedState)&&(_n=!0,Et&&(s=or,s!==null)))throw s;e.memoizedState=d,e.baseState=y,e.baseQueue=K,l.lastRenderedState=d}return f===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Af(e){var i=un(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var l=s.dispatch,f=s.pending,d=i.memoizedState;if(f!==null){s.pending=null;var y=f=f.next;do d=e(d,y.action),y=y.next;while(y!==f);ri(d,i.memoizedState)||(_n=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),s.lastRenderedState=d}return[d,l]}function Vm(e,i,s){var l=xe,f=un(),d=Ue;if(d){if(s===void 0)throw Error(a(407));s=s()}else s=i();var y=!ri((Ye||f).memoizedState,s);if(y&&(f.memoizedState=s,_n=!0),f=f.queue,Cf(Wm.bind(null,l,f,e),[e]),f.getSnapshot!==i||y||vn!==null&&vn.memoizedState.tag&1){if(l.flags|=2048,dr(9,{destroy:void 0},Xm.bind(null,l,f,s,i),null),Qe===null)throw Error(a(349));d||(fa&127)!==0||km(l,i,s)}return s}function km(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=xe.updateQueue,i===null?(i=Jl(),xe.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Xm(e,i,s,l){i.value=s,i.getSnapshot=l,qm(i)&&Ym(e)}function Wm(e,i,s){return s(function(){qm(i)&&Ym(e)})}function qm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!ri(e,s)}catch{return!0}}function Ym(e){var i=xs(e,2);i!==null&&ni(i,e,2)}function wf(e){var i=kn();if(typeof e=="function"){var s=e;if(e=s(),Rs){at(!0);try{s()}finally{at(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:e},i}function Zm(e,i,s,l){return e.baseState=s,Tf(e,Ye,typeof l=="function"?l:ha)}function CS(e,i,s,l,f){if(ec(e))throw Error(a(485));if(e=i.action,e!==null){var d={payload:f,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};B.T!==null?s(!0):d.isTransition=!1,l(d),s=i.pending,s===null?(d.next=i.pending=d,Km(i,d)):(d.next=s.next,i.pending=s.next=d)}}function Km(e,i){var s=i.action,l=i.payload,f=e.state;if(i.isTransition){var d=B.T,y={};B.T=y;try{var U=s(f,l),K=B.S;K!==null&&K(y,U),Jm(e,i,U)}catch(ft){Rf(e,i,ft)}finally{d!==null&&y.types!==null&&(d.types=y.types),B.T=d}}else try{d=s(f,l),Jm(e,i,d)}catch(ft){Rf(e,i,ft)}}function Jm(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){Qm(e,i,l)},function(l){return Rf(e,i,l)}):Qm(e,i,s)}function Qm(e,i,s){i.status="fulfilled",i.value=s,jm(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Km(e,s)))}function Rf(e,i,s){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,jm(i),i=i.next;while(i!==l)}e.action=null}function jm(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function $m(e,i){return i}function t0(e,i){if(Ue){var s=Qe.formState;if(s!==null){t:{var l=xe;if(Ue){if(tn){e:{for(var f=tn,d=Ti;f.nodeType!==8;){if(!d){f=null;break e}if(f=wi(f.nextSibling),f===null){f=null;break e}}d=f.data,f=d==="F!"||d==="F"?f:null}if(f){tn=wi(f.nextSibling),l=f.data==="F!";break t}}Ga(l)}l=!1}l&&(i=s[0])}}return s=kn(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$m,lastRenderedState:i},s.queue=l,s=x0.bind(null,xe,l),l.dispatch=s,l=wf(!1),d=Of.bind(null,xe,!1,l.queue),l=kn(),f={state:i,dispatch:null,action:e,pending:null},l.queue=f,s=CS.bind(null,xe,f,d,s),f.dispatch=s,l.memoizedState=e,[i,s,!1]}function e0(e){var i=un();return n0(i,Ye,e)}function n0(e,i,s){if(i=Tf(e,i,$m)[0],e=jl(ha)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=bo(i)}catch(y){throw y===lr?Vl:y}else l=i;i=un();var f=i.queue,d=f.dispatch;return s!==i.memoizedState&&(xe.flags|=2048,dr(9,{destroy:void 0},DS.bind(null,f,s),null)),[l,d,e]}function DS(e,i){e.action=i}function i0(e){var i=un(),s=Ye;if(s!==null)return n0(i,s,e);un(),i=i.memoizedState,s=un();var l=s.queue.dispatch;return s.memoizedState=e,[i,l,!1]}function dr(e,i,s,l){return e={tag:e,create:s,deps:l,inst:i,next:null},i=xe.updateQueue,i===null&&(i=Jl(),xe.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(l=s.next,s.next=e,e.next=l,i.lastEffect=e),e}function a0(){return un().memoizedState}function $l(e,i,s,l){var f=kn();xe.flags|=e,f.memoizedState=dr(1|i,{destroy:void 0},s,l===void 0?null:l)}function tc(e,i,s,l){var f=un();l=l===void 0?null:l;var d=f.memoizedState.inst;Ye!==null&&l!==null&&xf(l,Ye.memoizedState.deps)?f.memoizedState=dr(i,d,s,l):(xe.flags|=e,f.memoizedState=dr(1|i,d,s,l))}function s0(e,i){$l(8390656,8,e,i)}function Cf(e,i){tc(2048,8,e,i)}function US(e){xe.flags|=4;var i=xe.updateQueue;if(i===null)i=Jl(),xe.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function r0(e){var i=un().memoizedState;return US({ref:i,nextImpl:e}),function(){if((He&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function o0(e,i){return tc(4,2,e,i)}function l0(e,i){return tc(4,4,e,i)}function c0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function u0(e,i,s){s=s!=null?s.concat([e]):null,tc(4,4,c0.bind(null,i,e),s)}function Df(){}function f0(e,i){var s=un();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&xf(i,l[1])?l[0]:(s.memoizedState=[e,i],e)}function h0(e,i){var s=un();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&xf(i,l[1]))return l[0];if(l=e(),Rs){at(!0);try{e()}finally{at(!1)}}return s.memoizedState=[l,i],l}function Uf(e,i,s){return s===void 0||(fa&1073741824)!==0&&(Ce&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=dg(),xe.lanes|=e,Ja|=e,s)}function d0(e,i,s,l){return ri(s,i)?s:ur.current!==null?(e=Uf(e,s,l),ri(e,i)||(_n=!0),e):(fa&42)===0||(fa&1073741824)!==0&&(Ce&261930)===0?(_n=!0,e.memoizedState=s):(e=dg(),xe.lanes|=e,Ja|=e,i)}function p0(e,i,s,l,f){var d=P.p;P.p=d!==0&&8>d?d:8;var y=B.T,U={};B.T=U,Of(e,!1,i,s);try{var K=f(),ft=B.S;if(ft!==null&&ft(U,K),K!==null&&typeof K=="object"&&typeof K.then=="function"){var Et=AS(K,l);To(e,i,Et,hi(e))}else To(e,i,l,hi(e))}catch(At){To(e,i,{then:function(){},status:"rejected",reason:At},hi())}finally{P.p=d,y!==null&&U.types!==null&&(y.types=U.types),B.T=y}}function LS(){}function Lf(e,i,s,l){if(e.tag!==5)throw Error(a(476));var f=m0(e).queue;p0(e,f,i,k,s===null?LS:function(){return g0(e),s(l)})}function m0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:k,baseState:k,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:k},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function g0(e){var i=m0(e);i.next===null&&(i=e.alternate.memoizedState),To(e,i.next.queue,{},hi())}function Nf(){return Un(Vo)}function v0(){return un().memoizedState}function _0(){return un().memoizedState}function NS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=hi();e=Xa(s);var l=Wa(i,e,s);l!==null&&(ni(l,i,s),So(l,i,s)),i={cache:lf()},e.payload=i;return}i=i.return}}function OS(e,i,s){var l=hi();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},ec(e)?S0(i,s):(s=Ju(e,i,s,l),s!==null&&(ni(s,e,l),y0(s,i,l)))}function x0(e,i,s){var l=hi();To(e,i,s,l)}function To(e,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(ec(e))S0(i,f);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var y=i.lastRenderedState,U=d(y,s);if(f.hasEagerState=!0,f.eagerState=U,ri(U,y))return Pl(e,i,f,0),Qe===null&&Ol(),!1}catch{}finally{}if(s=Ju(e,i,f,l),s!==null)return ni(s,e,l),y0(s,i,l),!0}return!1}function Of(e,i,s,l){if(l={lane:2,revertLane:hh(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},ec(e)){if(i)throw Error(a(479))}else i=Ju(e,s,l,2),i!==null&&ni(i,e,2)}function ec(e){var i=e.alternate;return e===xe||i!==null&&i===xe}function S0(e,i){fr=Zl=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function y0(e,i,s){if((s&4194048)!==0){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,Kn(e,s)}}var Ao={readContext:Un,use:Ql,useCallback:on,useContext:on,useEffect:on,useImperativeHandle:on,useLayoutEffect:on,useInsertionEffect:on,useMemo:on,useReducer:on,useRef:on,useState:on,useDebugValue:on,useDeferredValue:on,useTransition:on,useSyncExternalStore:on,useId:on,useHostTransitionStatus:on,useFormState:on,useActionState:on,useOptimistic:on,useMemoCache:on,useCacheRefresh:on};Ao.useEffectEvent=on;var M0={readContext:Un,use:Ql,useCallback:function(e,i){return kn().memoizedState=[e,i===void 0?null:i],e},useContext:Un,useEffect:s0,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,$l(4194308,4,c0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return $l(4194308,4,e,i)},useInsertionEffect:function(e,i){$l(4,2,e,i)},useMemo:function(e,i){var s=kn();i=i===void 0?null:i;var l=e();if(Rs){at(!0);try{e()}finally{at(!1)}}return s.memoizedState=[l,i],l},useReducer:function(e,i,s){var l=kn();if(s!==void 0){var f=s(i);if(Rs){at(!0);try{s(i)}finally{at(!1)}}}else f=i;return l.memoizedState=l.baseState=f,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:f},l.queue=e,e=e.dispatch=OS.bind(null,xe,e),[l.memoizedState,e]},useRef:function(e){var i=kn();return e={current:e},i.memoizedState=e},useState:function(e){e=wf(e);var i=e.queue,s=x0.bind(null,xe,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:Df,useDeferredValue:function(e,i){var s=kn();return Uf(s,e,i)},useTransition:function(){var e=wf(!1);return e=p0.bind(null,xe,e.queue,!0,!1),kn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var l=xe,f=kn();if(Ue){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Qe===null)throw Error(a(349));(Ce&127)!==0||km(l,i,s)}f.memoizedState=s;var d={value:s,getSnapshot:i};return f.queue=d,s0(Wm.bind(null,l,d,e),[e]),l.flags|=2048,dr(9,{destroy:void 0},Xm.bind(null,l,d,s,i),null),s},useId:function(){var e=kn(),i=Qe.identifierPrefix;if(Ue){var s=Yi,l=qi;s=(l&~(1<<32-_t(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Kl++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=wS++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Nf,useFormState:t0,useActionState:t0,useOptimistic:function(e){var i=kn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Of.bind(null,xe,!0,s),s.dispatch=i,[e,i]},useMemoCache:bf,useCacheRefresh:function(){return kn().memoizedState=NS.bind(null,xe)},useEffectEvent:function(e){var i=kn(),s={impl:e};return i.memoizedState=s,function(){if((He&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Pf={readContext:Un,use:Ql,useCallback:f0,useContext:Un,useEffect:Cf,useImperativeHandle:u0,useInsertionEffect:o0,useLayoutEffect:l0,useMemo:h0,useReducer:jl,useRef:a0,useState:function(){return jl(ha)},useDebugValue:Df,useDeferredValue:function(e,i){var s=un();return d0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=jl(ha)[0],i=un().memoizedState;return[typeof e=="boolean"?e:bo(e),i]},useSyncExternalStore:Vm,useId:v0,useHostTransitionStatus:Nf,useFormState:e0,useActionState:e0,useOptimistic:function(e,i){var s=un();return Zm(s,Ye,e,i)},useMemoCache:bf,useCacheRefresh:_0};Pf.useEffectEvent=r0;var E0={readContext:Un,use:Ql,useCallback:f0,useContext:Un,useEffect:Cf,useImperativeHandle:u0,useInsertionEffect:o0,useLayoutEffect:l0,useMemo:h0,useReducer:Af,useRef:a0,useState:function(){return Af(ha)},useDebugValue:Df,useDeferredValue:function(e,i){var s=un();return Ye===null?Uf(s,e,i):d0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=Af(ha)[0],i=un().memoizedState;return[typeof e=="boolean"?e:bo(e),i]},useSyncExternalStore:Vm,useId:v0,useHostTransitionStatus:Nf,useFormState:i0,useActionState:i0,useOptimistic:function(e,i){var s=un();return Ye!==null?Zm(s,Ye,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:bf,useCacheRefresh:_0};E0.useEffectEvent=r0;function If(e,i,s,l){i=e.memoizedState,s=s(l,i),s=s==null?i:_({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var zf={enqueueSetState:function(e,i,s){e=e._reactInternals;var l=hi(),f=Xa(l);f.payload=i,s!=null&&(f.callback=s),i=Wa(e,f,l),i!==null&&(ni(i,e,l),So(i,e,l))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var l=hi(),f=Xa(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=Wa(e,f,l),i!==null&&(ni(i,e,l),So(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=hi(),l=Xa(s);l.tag=2,i!=null&&(l.callback=i),i=Wa(e,l,s),i!==null&&(ni(i,e,s),So(i,e,s))}};function b0(e,i,s,l,f,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,d,y):i.prototype&&i.prototype.isPureReactComponent?!fo(s,l)||!fo(f,d):!0}function T0(e,i,s,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==e&&zf.enqueueReplaceState(i,i.state,null)}function Cs(e,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(e=e.defaultProps){s===i&&(s=_({},s));for(var f in e)s[f]===void 0&&(s[f]=e[f])}return s}function A0(e){Nl(e)}function w0(e){console.error(e)}function R0(e){Nl(e)}function nc(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function C0(e,i,s){try{var l=e.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Bf(e,i,s){return s=Xa(s),s.tag=3,s.payload={element:null},s.callback=function(){nc(e,i)},s}function D0(e){return e=Xa(e),e.tag=3,e}function U0(e,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var d=l.value;e.payload=function(){return f(d)},e.callback=function(){C0(i,s,l)}}var y=s.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){C0(i,s,l),typeof f!="function"&&(Qa===null?Qa=new Set([this]):Qa.add(this));var U=l.stack;this.componentDidCatch(l.value,{componentStack:U!==null?U:""})})}function PS(e,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&sr(i,s,f,!0),s=li.current,s!==null){switch(s.tag){case 31:case 13:return Ai===null?pc():s.alternate===null&&ln===0&&(ln=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===kl?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),ch(e,l,f)),!1;case 22:return s.flags|=65536,l===kl?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),ch(e,l,f)),!1}throw Error(a(435,s.tag))}return ch(e,l,f),pc(),!1}if(Ue)return i=li.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==nf&&(e=Error(a(422),{cause:l}),mo(Mi(e,s)))):(l!==nf&&(i=Error(a(423),{cause:l}),mo(Mi(i,s))),e=e.current.alternate,e.flags|=65536,f&=-f,e.lanes|=f,l=Mi(l,s),f=Bf(e.stateNode,l,f),pf(e,f),ln!==4&&(ln=2)),!1;var d=Error(a(520),{cause:l});if(d=Mi(d,s),Oo===null?Oo=[d]:Oo.push(d),ln!==4&&(ln=2),i===null)return!0;l=Mi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=f&-f,s.lanes|=e,e=Bf(s.stateNode,l,e),pf(s,e),!1;case 1:if(i=s.type,d=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Qa===null||!Qa.has(d))))return s.flags|=65536,f&=-f,s.lanes|=f,f=D0(f),U0(f,e,s,l),pf(s,f),!1}s=s.return}while(s!==null);return!1}var Ff=Error(a(461)),_n=!1;function Ln(e,i,s,l){i.child=e===null?Pm(i,null,s,l):ws(i,e.child,s,l)}function L0(e,i,s,l,f){s=s.render;var d=i.ref;if("ref"in l){var y={};for(var U in l)U!=="ref"&&(y[U]=l[U])}else y=l;return Es(i),l=Sf(e,i,s,y,d,f),U=yf(),e!==null&&!_n?(Mf(e,i,f),da(e,i,f)):(Ue&&U&&tf(i),i.flags|=1,Ln(e,i,l,f),i.child)}function N0(e,i,s,l,f){if(e===null){var d=s.type;return typeof d=="function"&&!Qu(d)&&d.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=d,O0(e,i,d,l,f)):(e=zl(s.type,null,l,i,i.mode,f),e.ref=i.ref,e.return=i,i.child=e)}if(d=e.child,!Yf(e,f)){var y=d.memoizedProps;if(s=s.compare,s=s!==null?s:fo,s(y,l)&&e.ref===i.ref)return da(e,i,f)}return i.flags|=1,e=oa(d,l),e.ref=i.ref,e.return=i,i.child=e}function O0(e,i,s,l,f){if(e!==null){var d=e.memoizedProps;if(fo(d,l)&&e.ref===i.ref)if(_n=!1,i.pendingProps=l=d,Yf(e,f))(e.flags&131072)!==0&&(_n=!0);else return i.lanes=e.lanes,da(e,i,f)}return Hf(e,i,s,l,f)}function P0(e,i,s,l){var f=l.children,d=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(d=d!==null?d.baseLanes|s:s,e!==null){for(l=i.child=e.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~d}else l=0,i.child=null;return I0(e,i,d,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Gl(i,d!==null?d.cachePool:null),d!==null?Bm(i,d):gf(),Fm(i);else return l=i.lanes=536870912,I0(e,i,d!==null?d.baseLanes|s:s,s,l)}else d!==null?(Gl(i,d.cachePool),Bm(i,d),Ya(),i.memoizedState=null):(e!==null&&Gl(i,null),gf(),Ya());return Ln(e,i,f,s),i.child}function wo(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function I0(e,i,s,l,f){var d=uf();return d=d===null?null:{parent:gn._currentValue,pool:d},i.memoizedState={baseLanes:s,cachePool:d},e!==null&&Gl(i,null),gf(),Fm(i),e!==null&&sr(e,i,l,!0),i.childLanes=f,null}function ic(e,i){return i=sc({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function z0(e,i,s){return ws(i,e.child,null,s),e=ic(i,i.pendingProps),e.flags|=2,ci(i),i.memoizedState=null,e}function IS(e,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ue){if(l.mode==="hidden")return e=ic(i,l),i.lanes=536870912,wo(null,e);if(_f(i),(e=tn)?(e=Kg(e,Ti),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Fa!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},s=Sm(e),s.return=i,i.child=s,Dn=i,tn=null)):e=null,e===null)throw Ga(i);return i.lanes=536870912,null}return ic(i,l)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(_f(i),f)if(i.flags&256)i.flags&=-257,i=z0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(_n||sr(e,i,s,!1),f=(s&e.childLanes)!==0,_n||f){if(l=Qe,l!==null&&(y=ai(l,s),y!==0&&y!==d.retryLane))throw d.retryLane=y,xs(e,y),ni(l,e,y),Ff;pc(),i=z0(e,i,s)}else e=d.treeContext,tn=wi(y.nextSibling),Dn=i,Ue=!0,Ha=null,Ti=!1,e!==null&&Em(i,e),i=ic(i,l),i.flags|=4096;return i}return e=oa(e.child,{mode:l.mode,children:l.children}),e.ref=i.ref,i.child=e,e.return=i,e}function ac(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function Hf(e,i,s,l,f){return Es(i),s=Sf(e,i,s,l,void 0,f),l=yf(),e!==null&&!_n?(Mf(e,i,f),da(e,i,f)):(Ue&&l&&tf(i),i.flags|=1,Ln(e,i,s,f),i.child)}function B0(e,i,s,l,f,d){return Es(i),i.updateQueue=null,s=Gm(i,l,s,f),Hm(e),l=yf(),e!==null&&!_n?(Mf(e,i,d),da(e,i,d)):(Ue&&l&&tf(i),i.flags|=1,Ln(e,i,s,d),i.child)}function F0(e,i,s,l,f){if(Es(i),i.stateNode===null){var d=er,y=s.contextType;typeof y=="object"&&y!==null&&(d=Un(y)),d=new s(l,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=zf,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=l,d.state=i.memoizedState,d.refs={},hf(i),y=s.contextType,d.context=typeof y=="object"&&y!==null?Un(y):er,d.state=i.memoizedState,y=s.getDerivedStateFromProps,typeof y=="function"&&(If(i,s,y,l),d.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&zf.enqueueReplaceState(d,d.state,null),Mo(i,l,d,f),yo(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){d=i.stateNode;var U=i.memoizedProps,K=Cs(s,U);d.props=K;var ft=d.context,Et=s.contextType;y=er,typeof Et=="object"&&Et!==null&&(y=Un(Et));var At=s.getDerivedStateFromProps;Et=typeof At=="function"||typeof d.getSnapshotBeforeUpdate=="function",U=i.pendingProps!==U,Et||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(U||ft!==y)&&T0(i,d,l,y),ka=!1;var ht=i.memoizedState;d.state=ht,Mo(i,l,d,f),yo(),ft=i.memoizedState,U||ht!==ft||ka?(typeof At=="function"&&(If(i,s,At,l),ft=i.memoizedState),(K=ka||b0(i,s,K,l,ht,ft,y))?(Et||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=ft),d.props=l,d.state=ft,d.context=y,l=K):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{d=i.stateNode,df(e,i),y=i.memoizedProps,Et=Cs(s,y),d.props=Et,At=i.pendingProps,ht=d.context,ft=s.contextType,K=er,typeof ft=="object"&&ft!==null&&(K=Un(ft)),U=s.getDerivedStateFromProps,(ft=typeof U=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==At||ht!==K)&&T0(i,d,l,K),ka=!1,ht=i.memoizedState,d.state=ht,Mo(i,l,d,f),yo();var gt=i.memoizedState;y!==At||ht!==gt||ka||e!==null&&e.dependencies!==null&&Fl(e.dependencies)?(typeof U=="function"&&(If(i,s,U,l),gt=i.memoizedState),(Et=ka||b0(i,s,Et,l,ht,gt,K)||e!==null&&e.dependencies!==null&&Fl(e.dependencies))?(ft||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(l,gt,K),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(l,gt,K)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&ht===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ht===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=gt),d.props=l,d.state=gt,d.context=K,l=Et):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&ht===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ht===e.memoizedState||(i.flags|=1024),l=!1)}return d=l,ac(e,i),l=(i.flags&128)!==0,d||l?(d=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,e!==null&&l?(i.child=ws(i,e.child,null,f),i.child=ws(i,null,s,f)):Ln(e,i,s,f),i.memoizedState=d.state,e=i.child):e=da(e,i,f),e}function H0(e,i,s,l){return ys(),i.flags|=256,Ln(e,i,s,l),i.child}var Gf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Vf(e){return{baseLanes:e,cachePool:Cm()}}function kf(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=fi),e}function G0(e,i,s){var l=i.pendingProps,f=!1,d=(i.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(cn.current&2)!==0),y&&(f=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ue){if(f?qa(i):Ya(),(e=tn)?(e=Kg(e,Ti),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Fa!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},s=Sm(e),s.return=i,i.child=s,Dn=i,tn=null)):e=null,e===null)throw Ga(i);return Th(e)?i.lanes=32:i.lanes=536870912,null}var U=l.children;return l=l.fallback,f?(Ya(),f=i.mode,U=sc({mode:"hidden",children:U},f),l=Ss(l,f,s,null),U.return=i,l.return=i,U.sibling=l,i.child=U,l=i.child,l.memoizedState=Vf(s),l.childLanes=kf(e,y,s),i.memoizedState=Gf,wo(null,l)):(qa(i),Xf(i,U))}var K=e.memoizedState;if(K!==null&&(U=K.dehydrated,U!==null)){if(d)i.flags&256?(qa(i),i.flags&=-257,i=Wf(e,i,s)):i.memoizedState!==null?(Ya(),i.child=e.child,i.flags|=128,i=null):(Ya(),U=l.fallback,f=i.mode,l=sc({mode:"visible",children:l.children},f),U=Ss(U,f,s,null),U.flags|=2,l.return=i,U.return=i,l.sibling=U,i.child=l,ws(i,e.child,null,s),l=i.child,l.memoizedState=Vf(s),l.childLanes=kf(e,y,s),i.memoizedState=Gf,i=wo(null,l));else if(qa(i),Th(U)){if(y=U.nextSibling&&U.nextSibling.dataset,y)var ft=y.dgst;y=ft,l=Error(a(419)),l.stack="",l.digest=y,mo({value:l,source:null,stack:null}),i=Wf(e,i,s)}else if(_n||sr(e,i,s,!1),y=(s&e.childLanes)!==0,_n||y){if(y=Qe,y!==null&&(l=ai(y,s),l!==0&&l!==K.retryLane))throw K.retryLane=l,xs(e,l),ni(y,e,l),Ff;bh(U)||pc(),i=Wf(e,i,s)}else bh(U)?(i.flags|=192,i.child=e.child,i=null):(e=K.treeContext,tn=wi(U.nextSibling),Dn=i,Ue=!0,Ha=null,Ti=!1,e!==null&&Em(i,e),i=Xf(i,l.children),i.flags|=4096);return i}return f?(Ya(),U=l.fallback,f=i.mode,K=e.child,ft=K.sibling,l=oa(K,{mode:"hidden",children:l.children}),l.subtreeFlags=K.subtreeFlags&65011712,ft!==null?U=oa(ft,U):(U=Ss(U,f,s,null),U.flags|=2),U.return=i,l.return=i,l.sibling=U,i.child=l,wo(null,l),l=i.child,U=e.child.memoizedState,U===null?U=Vf(s):(f=U.cachePool,f!==null?(K=gn._currentValue,f=f.parent!==K?{parent:K,pool:K}:f):f=Cm(),U={baseLanes:U.baseLanes|s,cachePool:f}),l.memoizedState=U,l.childLanes=kf(e,y,s),i.memoizedState=Gf,wo(e.child,l)):(qa(i),s=e.child,e=s.sibling,s=oa(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=s,i.memoizedState=null,s)}function Xf(e,i){return i=sc({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function sc(e,i){return e=oi(22,e,null,i),e.lanes=0,e}function Wf(e,i,s){return ws(i,e.child,null,s),e=Xf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function V0(e,i,s){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),rf(e.return,i,s)}function qf(e,i,s,l,f,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:d}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=l,y.tail=s,y.tailMode=f,y.treeForkCount=d)}function k0(e,i,s){var l=i.pendingProps,f=l.revealOrder,d=l.tail;l=l.children;var y=cn.current,U=(y&2)!==0;if(U?(y=y&1|2,i.flags|=128):y&=1,rt(cn,y),Ln(e,i,l,s),l=Ue?po:0,!U&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&V0(e,s,i);else if(e.tag===19)V0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)e=s.alternate,e!==null&&Yl(e)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),qf(i,!1,f,s,d,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(e=f.alternate,e!==null&&Yl(e)===null){i.child=f;break}e=f.sibling,f.sibling=s,s=f,f=e}qf(i,!0,s,null,d,l);break;case"together":qf(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function da(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),Ja|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(sr(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=oa(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=oa(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Yf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Fl(e)))}function zS(e,i,s){switch(i.tag){case 3:dt(i,i.stateNode.containerInfo),Va(i,gn,e.memoizedState.cache),ys();break;case 27:case 5:ee(i);break;case 4:dt(i,i.stateNode.containerInfo);break;case 10:Va(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,_f(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(qa(i),i.flags|=128,null):(s&i.child.childLanes)!==0?G0(e,i,s):(qa(i),e=da(e,i,s),e!==null?e.sibling:null);qa(i);break;case 19:var f=(e.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(sr(e,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return k0(e,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),rt(cn,cn.current),l)break;return null;case 22:return i.lanes=0,P0(e,i,s,i.pendingProps);case 24:Va(i,gn,e.memoizedState.cache)}return da(e,i,s)}function X0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)_n=!0;else{if(!Yf(e,s)&&(i.flags&128)===0)return _n=!1,zS(e,i,s);_n=(e.flags&131072)!==0}else _n=!1,Ue&&(i.flags&1048576)!==0&&Mm(i,po,i.index);switch(i.lanes=0,i.tag){case 16:t:{var l=i.pendingProps;if(e=Ts(i.elementType),i.type=e,typeof e=="function")Qu(e)?(l=Cs(e,l),i.tag=1,i=F0(null,i,e,l,s)):(i.tag=0,i=Hf(null,i,e,l,s));else{if(e!=null){var f=e.$$typeof;if(f===A){i.tag=11,i=L0(null,i,e,l,s);break t}else if(f===N){i.tag=14,i=N0(null,i,e,l,s);break t}}throw i=F(e)||e,Error(a(306,i,""))}}return i;case 0:return Hf(e,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=Cs(l,i.pendingProps),F0(e,i,l,f,s);case 3:t:{if(dt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));l=i.pendingProps;var d=i.memoizedState;f=d.element,df(e,i),Mo(i,l,null,s);var y=i.memoizedState;if(l=y.cache,Va(i,gn,l),l!==d.cache&&of(i,[gn],s,!0),yo(),l=y.element,d.isDehydrated)if(d={element:l,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){i=H0(e,i,l,s);break t}else if(l!==f){f=Mi(Error(a(424)),i),mo(f),i=H0(e,i,l,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(tn=wi(e.firstChild),Dn=i,Ue=!0,Ha=null,Ti=!0,s=Pm(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(ys(),l===f){i=da(e,i,s);break t}Ln(e,i,l,s)}i=i.child}return i;case 26:return ac(e,i),e===null?(s=ev(i.type,null,i.pendingProps,null))?i.memoizedState=s:Ue||(s=i.type,e=i.pendingProps,l=yc(Pt.current).createElement(s),l[dn]=i,l[Cn]=e,Nn(l,s,e),pn(l),i.stateNode=l):i.memoizedState=ev(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return ee(i),e===null&&Ue&&(l=i.stateNode=jg(i.type,i.pendingProps,Pt.current),Dn=i,Ti=!0,f=tn,es(i.type)?(Ah=f,tn=wi(l.firstChild)):tn=f),Ln(e,i,i.pendingProps.children,s),ac(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ue&&((f=l=tn)&&(l=dy(l,i.type,i.pendingProps,Ti),l!==null?(i.stateNode=l,Dn=i,tn=wi(l.firstChild),Ti=!1,f=!0):f=!1),f||Ga(i)),ee(i),f=i.type,d=i.pendingProps,y=e!==null?e.memoizedProps:null,l=d.children,yh(f,d)?l=null:y!==null&&yh(f,y)&&(i.flags|=32),i.memoizedState!==null&&(f=Sf(e,i,RS,null,null,s),Vo._currentValue=f),ac(e,i),Ln(e,i,l,s),i.child;case 6:return e===null&&Ue&&((e=s=tn)&&(s=py(s,i.pendingProps,Ti),s!==null?(i.stateNode=s,Dn=i,tn=null,e=!0):e=!1),e||Ga(i)),null;case 13:return G0(e,i,s);case 4:return dt(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=ws(i,null,l,s):Ln(e,i,l,s),i.child;case 11:return L0(e,i,i.type,i.pendingProps,s);case 7:return Ln(e,i,i.pendingProps,s),i.child;case 8:return Ln(e,i,i.pendingProps.children,s),i.child;case 12:return Ln(e,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Va(i,i.type,l.value),Ln(e,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,Es(i),f=Un(f),l=l(f),i.flags|=1,Ln(e,i,l,s),i.child;case 14:return N0(e,i,i.type,i.pendingProps,s);case 15:return O0(e,i,i.type,i.pendingProps,s);case 19:return k0(e,i,s);case 31:return IS(e,i,s);case 22:return P0(e,i,s,i.pendingProps);case 24:return Es(i),l=Un(gn),e===null?(f=uf(),f===null&&(f=Qe,d=lf(),f.pooledCache=d,d.refCount++,d!==null&&(f.pooledCacheLanes|=s),f=d),i.memoizedState={parent:l,cache:f},hf(i),Va(i,gn,f)):((e.lanes&s)!==0&&(df(e,i),Mo(i,null,null,s),yo()),f=e.memoizedState,d=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),Va(i,gn,l)):(l=d.cache,Va(i,gn,l),l!==f.cache&&of(i,[gn],s,!0))),Ln(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function pa(e){e.flags|=4}function Zf(e,i,s,l,f){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(f&335544128)===f)if(e.stateNode.complete)e.flags|=8192;else if(vg())e.flags|=8192;else throw As=kl,ff}else e.flags&=-16777217}function W0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!rv(i))if(vg())e.flags|=8192;else throw As=kl,ff}function rc(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Ut():536870912,e.lanes|=i,vr|=i)}function Ro(e,i){if(!Ue)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function en(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,l=0;if(i)for(var f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=l,e.childLanes=s,i}function BS(e,i,s){var l=i.pendingProps;switch(ef(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return en(i),null;case 1:return en(i),null;case 3:return s=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),ua(gn),wt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ar(i)?pa(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,af())),en(i),null;case 26:var f=i.type,d=i.memoizedState;return e===null?(pa(i),d!==null?(en(i),W0(i,d)):(en(i),Zf(i,f,null,l,s))):d?d!==e.memoizedState?(pa(i),en(i),W0(i,d)):(en(i),i.flags&=-16777217):(e=e.memoizedProps,e!==l&&pa(i),en(i),Zf(i,f,e,l,s)),null;case 27:if(Bt(i),s=Pt.current,f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&pa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return en(i),null}e=xt.current,ar(i)?bm(i):(e=jg(f,l,s),i.stateNode=e,pa(i))}return en(i),null;case 5:if(Bt(i),f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&pa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return en(i),null}if(d=xt.current,ar(i))bm(i);else{var y=yc(Pt.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof l.is=="string"?y.createElement("select",{is:l.is}):y.createElement("select"),l.multiple?d.multiple=!0:l.size&&(d.size=l.size);break;default:d=typeof l.is=="string"?y.createElement(f,{is:l.is}):y.createElement(f)}}d[dn]=i,d[Cn]=l;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=d;t:switch(Nn(d,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&pa(i)}}return en(i),Zf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&pa(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=Pt.current,ar(i)){if(e=i.stateNode,s=i.memoizedProps,l=null,f=Dn,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}e[dn]=i,e=!!(e.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||Gg(e.nodeValue,s)),e||Ga(i,!0)}else e=yc(e).createTextNode(l),e[dn]=i,i.stateNode=e}return en(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(l=ar(i),s!==null){if(e===null){if(!l)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[dn]=i}else ys(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;en(i),e=!1}else s=af(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(ci(i),i):(ci(i),null);if((i.flags&128)!==0)throw Error(a(558))}return en(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(f=ar(i),l!==null&&l.dehydrated!==null){if(e===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[dn]=i}else ys(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;en(i),f=!1}else f=af(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(ci(i),i):(ci(i),null)}return ci(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,e=e!==null&&e.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),d=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(d=l.memoizedState.cachePool.pool),d!==f&&(l.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),rc(i,i.updateQueue),en(i),null);case 4:return wt(),e===null&&gh(i.stateNode.containerInfo),en(i),null;case 10:return ua(i.type),en(i),null;case 19:if(J(cn),l=i.memoizedState,l===null)return en(i),null;if(f=(i.flags&128)!==0,d=l.rendering,d===null)if(f)Ro(l,!1);else{if(ln!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(d=Yl(e),d!==null){for(i.flags|=128,Ro(l,!1),e=d.updateQueue,i.updateQueue=e,rc(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)xm(s,e),s=s.sibling;return rt(cn,cn.current&1|2),Ue&&la(i,l.treeForkCount),i.child}e=e.sibling}l.tail!==null&&pe()>fc&&(i.flags|=128,f=!0,Ro(l,!1),i.lanes=4194304)}else{if(!f)if(e=Yl(d),e!==null){if(i.flags|=128,f=!0,e=e.updateQueue,i.updateQueue=e,rc(i,e),Ro(l,!0),l.tail===null&&l.tailMode==="hidden"&&!d.alternate&&!Ue)return en(i),null}else 2*pe()-l.renderingStartTime>fc&&s!==536870912&&(i.flags|=128,f=!0,Ro(l,!1),i.lanes=4194304);l.isBackwards?(d.sibling=i.child,i.child=d):(e=l.last,e!==null?e.sibling=d:i.child=d,l.last=d)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=pe(),e.sibling=null,s=cn.current,rt(cn,f?s&1|2:s&1),Ue&&la(i,l.treeForkCount),e):(en(i),null);case 22:case 23:return ci(i),vf(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(en(i),i.subtreeFlags&6&&(i.flags|=8192)):en(i),s=i.updateQueue,s!==null&&rc(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),e!==null&&J(bs),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),ua(gn),en(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function FS(e,i){switch(ef(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return ua(gn),wt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Bt(i),null;case 31:if(i.memoizedState!==null){if(ci(i),i.alternate===null)throw Error(a(340));ys()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(ci(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));ys()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return J(cn),null;case 4:return wt(),null;case 10:return ua(i.type),null;case 22:case 23:return ci(i),vf(),e!==null&&J(bs),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return ua(gn),null;case 25:return null;default:return null}}function q0(e,i){switch(ef(i),i.tag){case 3:ua(gn),wt();break;case 26:case 27:case 5:Bt(i);break;case 4:wt();break;case 31:i.memoizedState!==null&&ci(i);break;case 13:ci(i);break;case 19:J(cn);break;case 10:ua(i.type);break;case 22:case 23:ci(i),vf(),e!==null&&J(bs);break;case 24:ua(gn)}}function Co(e,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&e)===e){l=void 0;var d=s.create,y=s.inst;l=d(),y.destroy=l}s=s.next}while(s!==f)}}catch(U){ke(i,i.return,U)}}function Za(e,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var d=f.next;l=d;do{if((l.tag&e)===e){var y=l.inst,U=y.destroy;if(U!==void 0){y.destroy=void 0,f=i;var K=s,ft=U;try{ft()}catch(Et){ke(f,K,Et)}}}l=l.next}while(l!==d)}}catch(Et){ke(i,i.return,Et)}}function Y0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{zm(i,s)}catch(l){ke(e,e.return,l)}}}function Z0(e,i,s){s.props=Cs(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(l){ke(e,i,l)}}function Do(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof s=="function"?e.refCleanup=s(l):s.current=l}}catch(f){ke(e,i,f)}}function Zi(e,i){var s=e.ref,l=e.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){ke(e,i,f)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){ke(e,i,f)}else s.current=null}function K0(e){var i=e.type,s=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break t;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){ke(e,e.return,f)}}function Kf(e,i,s){try{var l=e.stateNode;oy(l,e.type,s,i),l[Cn]=i}catch(f){ke(e,e.return,f)}}function J0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&es(e.type)||e.tag===4}function Jf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||J0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&es(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Qf(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Si));else if(l!==4&&(l===27&&es(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(Qf(e,i,s),e=e.sibling;e!==null;)Qf(e,i,s),e=e.sibling}function oc(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(l!==4&&(l===27&&es(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(oc(e,i,s),e=e.sibling;e!==null;)oc(e,i,s),e=e.sibling}function Q0(e){var i=e.stateNode,s=e.memoizedProps;try{for(var l=e.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);Nn(i,l,s),i[dn]=e,i[Cn]=s}catch(d){ke(e,e.return,d)}}var ma=!1,xn=!1,jf=!1,j0=typeof WeakSet=="function"?WeakSet:Set,An=null;function HS(e,i){if(e=e.containerInfo,xh=Rc,e=um(e),Xu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,d=l.focusNode;l=l.focusOffset;try{s.nodeType,d.nodeType}catch{s=null;break t}var y=0,U=-1,K=-1,ft=0,Et=0,At=e,ht=null;e:for(;;){for(var gt;At!==s||f!==0&&At.nodeType!==3||(U=y+f),At!==d||l!==0&&At.nodeType!==3||(K=y+l),At.nodeType===3&&(y+=At.nodeValue.length),(gt=At.firstChild)!==null;)ht=At,At=gt;for(;;){if(At===e)break e;if(ht===s&&++ft===f&&(U=y),ht===d&&++Et===l&&(K=y),(gt=At.nextSibling)!==null)break;At=ht,ht=At.parentNode}At=gt}s=U===-1||K===-1?null:{start:U,end:K}}else s=null}s=s||{start:0,end:0}}else s=null;for(Sh={focusedElem:e,selectionRange:s},Rc=!1,An=i;An!==null;)if(i=An,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,An=e;else for(;An!==null;){switch(i=An,d=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)f=e[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,s=i,f=d.memoizedProps,d=d.memoizedState,l=s.stateNode;try{var ne=Cs(s.type,f);e=l.getSnapshotBeforeUpdate(ne,d),l.__reactInternalSnapshotBeforeUpdate=e}catch(fe){ke(s,s.return,fe)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)Eh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Eh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,An=e;break}An=i.return}}function $0(e,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:va(e,s),l&4&&Co(5,s);break;case 1:if(va(e,s),l&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(y){ke(s,s.return,y)}else{var f=Cs(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(f,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){ke(s,s.return,y)}}l&64&&Y0(s),l&512&&Do(s,s.return);break;case 3:if(va(e,s),l&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{zm(e,i)}catch(y){ke(s,s.return,y)}}break;case 27:i===null&&l&4&&Q0(s);case 26:case 5:va(e,s),i===null&&l&4&&K0(s),l&512&&Do(s,s.return);break;case 12:va(e,s);break;case 31:va(e,s),l&4&&ng(e,s);break;case 13:va(e,s),l&4&&ig(e,s),l&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=KS.bind(null,s),my(e,s))));break;case 22:if(l=s.memoizedState!==null||ma,!l){i=i!==null&&i.memoizedState!==null||xn,f=ma;var d=xn;ma=l,(xn=i)&&!d?_a(e,s,(s.subtreeFlags&8772)!==0):va(e,s),ma=f,xn=d}break;case 30:break;default:va(e,s)}}function tg(e){var i=e.alternate;i!==null&&(e.alternate=null,tg(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&Pa(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var sn=null,jn=!1;function ga(e,i,s){for(s=s.child;s!==null;)eg(e,i,s),s=s.sibling}function eg(e,i,s){if(yt&&typeof yt.onCommitFiberUnmount=="function")try{yt.onCommitFiberUnmount(vt,s)}catch{}switch(s.tag){case 26:xn||Zi(s,i),ga(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:xn||Zi(s,i);var l=sn,f=jn;es(s.type)&&(sn=s.stateNode,jn=!1),ga(e,i,s),Fo(s.stateNode),sn=l,jn=f;break;case 5:xn||Zi(s,i);case 6:if(l=sn,f=jn,sn=null,ga(e,i,s),sn=l,jn=f,sn!==null)if(jn)try{(sn.nodeType===9?sn.body:sn.nodeName==="HTML"?sn.ownerDocument.body:sn).removeChild(s.stateNode)}catch(d){ke(s,i,d)}else try{sn.removeChild(s.stateNode)}catch(d){ke(s,i,d)}break;case 18:sn!==null&&(jn?(e=sn,Yg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Tr(e)):Yg(sn,s.stateNode));break;case 4:l=sn,f=jn,sn=s.stateNode.containerInfo,jn=!0,ga(e,i,s),sn=l,jn=f;break;case 0:case 11:case 14:case 15:Za(2,s,i),xn||Za(4,s,i),ga(e,i,s);break;case 1:xn||(Zi(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&Z0(s,i,l)),ga(e,i,s);break;case 21:ga(e,i,s);break;case 22:xn=(l=xn)||s.memoizedState!==null,ga(e,i,s),xn=l;break;default:ga(e,i,s)}}function ng(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Tr(e)}catch(s){ke(i,i.return,s)}}}function ig(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Tr(e)}catch(s){ke(i,i.return,s)}}function GS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new j0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new j0),i;default:throw Error(a(435,e.tag))}}function lc(e,i){var s=GS(e);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=JS.bind(null,e,l);l.then(f,f)}})}function $n(e,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],d=e,y=i,U=y;t:for(;U!==null;){switch(U.tag){case 27:if(es(U.type)){sn=U.stateNode,jn=!1;break t}break;case 5:sn=U.stateNode,jn=!1;break t;case 3:case 4:sn=U.stateNode.containerInfo,jn=!0;break t}U=U.return}if(sn===null)throw Error(a(160));eg(d,y,f),sn=null,jn=!1,d=f.alternate,d!==null&&(d.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)ag(i,e),i=i.sibling}var Oi=null;function ag(e,i){var s=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:$n(i,e),ti(e),l&4&&(Za(3,e,e.return),Co(3,e),Za(5,e,e.return));break;case 1:$n(i,e),ti(e),l&512&&(xn||s===null||Zi(s,s.return)),l&64&&ma&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=Oi;if($n(i,e),ti(e),l&512&&(xn||s===null||Zi(s,s.return)),l&4){var d=s!==null?s.memoizedState:null;if(l=e.memoizedState,s===null)if(l===null)if(e.stateNode===null){t:{l=e.type,s=e.memoizedProps,f=f.ownerDocument||f;e:switch(l){case"title":d=f.getElementsByTagName("title")[0],(!d||d[Oa]||d[dn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=f.createElement(l),f.head.insertBefore(d,f.querySelector("head > title"))),Nn(d,l,s),d[dn]=e,pn(d),l=d;break t;case"link":var y=av("link","href",f).get(l+(s.href||""));if(y){for(var U=0;U<y.length;U++)if(d=y[U],d.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&d.getAttribute("rel")===(s.rel==null?null:s.rel)&&d.getAttribute("title")===(s.title==null?null:s.title)&&d.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){y.splice(U,1);break e}}d=f.createElement(l),Nn(d,l,s),f.head.appendChild(d);break;case"meta":if(y=av("meta","content",f).get(l+(s.content||""))){for(U=0;U<y.length;U++)if(d=y[U],d.getAttribute("content")===(s.content==null?null:""+s.content)&&d.getAttribute("name")===(s.name==null?null:s.name)&&d.getAttribute("property")===(s.property==null?null:s.property)&&d.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&d.getAttribute("charset")===(s.charSet==null?null:s.charSet)){y.splice(U,1);break e}}d=f.createElement(l),Nn(d,l,s),f.head.appendChild(d);break;default:throw Error(a(468,l))}d[dn]=e,pn(d),l=d}e.stateNode=l}else sv(f,e.type,e.stateNode);else e.stateNode=iv(f,l,e.memoizedProps);else d!==l?(d===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):d.count--,l===null?sv(f,e.type,e.stateNode):iv(f,l,e.memoizedProps)):l===null&&e.stateNode!==null&&Kf(e,e.memoizedProps,s.memoizedProps)}break;case 27:$n(i,e),ti(e),l&512&&(xn||s===null||Zi(s,s.return)),s!==null&&l&4&&Kf(e,e.memoizedProps,s.memoizedProps);break;case 5:if($n(i,e),ti(e),l&512&&(xn||s===null||Zi(s,s.return)),e.flags&32){f=e.stateNode;try{Vn(f,"")}catch(ne){ke(e,e.return,ne)}}l&4&&e.stateNode!=null&&(f=e.memoizedProps,Kf(e,f,s!==null?s.memoizedProps:f)),l&1024&&(jf=!0);break;case 6:if($n(i,e),ti(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,s=e.stateNode;try{s.nodeValue=l}catch(ne){ke(e,e.return,ne)}}break;case 3:if(bc=null,f=Oi,Oi=Mc(i.containerInfo),$n(i,e),Oi=f,ti(e),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Tr(i.containerInfo)}catch(ne){ke(e,e.return,ne)}jf&&(jf=!1,sg(e));break;case 4:l=Oi,Oi=Mc(e.stateNode.containerInfo),$n(i,e),ti(e),Oi=l;break;case 12:$n(i,e),ti(e);break;case 31:$n(i,e),ti(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,lc(e,l)));break;case 13:$n(i,e),ti(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(uc=pe()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,lc(e,l)));break;case 22:f=e.memoizedState!==null;var K=s!==null&&s.memoizedState!==null,ft=ma,Et=xn;if(ma=ft||f,xn=Et||K,$n(i,e),xn=Et,ma=ft,ti(e),l&8192)t:for(i=e.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||K||ma||xn||Ds(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){K=s=i;try{if(d=K.stateNode,f)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{U=K.stateNode;var At=K.memoizedProps.style,ht=At!=null&&At.hasOwnProperty("display")?At.display:null;U.style.display=ht==null||typeof ht=="boolean"?"":(""+ht).trim()}}catch(ne){ke(K,K.return,ne)}}}else if(i.tag===6){if(s===null){K=i;try{K.stateNode.nodeValue=f?"":K.memoizedProps}catch(ne){ke(K,K.return,ne)}}}else if(i.tag===18){if(s===null){K=i;try{var gt=K.stateNode;f?Zg(gt,!0):Zg(K.stateNode,!1)}catch(ne){ke(K,K.return,ne)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,lc(e,s))));break;case 19:$n(i,e),ti(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,lc(e,l)));break;case 30:break;case 21:break;default:$n(i,e),ti(e)}}function ti(e){var i=e.flags;if(i&2){try{for(var s,l=e.return;l!==null;){if(J0(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,d=Jf(e);oc(e,d,f);break;case 5:var y=s.stateNode;s.flags&32&&(Vn(y,""),s.flags&=-33);var U=Jf(e);oc(e,U,y);break;case 3:case 4:var K=s.stateNode.containerInfo,ft=Jf(e);Qf(e,ft,K);break;default:throw Error(a(161))}}catch(Et){ke(e,e.return,Et)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function sg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;sg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function va(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)$0(e,i.alternate,i),i=i.sibling}function Ds(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Za(4,i,i.return),Ds(i);break;case 1:Zi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&Z0(i,i.return,s),Ds(i);break;case 27:Fo(i.stateNode);case 26:case 5:Zi(i,i.return),Ds(i);break;case 22:i.memoizedState===null&&Ds(i);break;case 30:Ds(i);break;default:Ds(i)}e=e.sibling}}function _a(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=e,d=i,y=d.flags;switch(d.tag){case 0:case 11:case 15:_a(f,d,s),Co(4,d);break;case 1:if(_a(f,d,s),l=d,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(ft){ke(l,l.return,ft)}if(l=d,f=l.updateQueue,f!==null){var U=l.stateNode;try{var K=f.shared.hiddenCallbacks;if(K!==null)for(f.shared.hiddenCallbacks=null,f=0;f<K.length;f++)Im(K[f],U)}catch(ft){ke(l,l.return,ft)}}s&&y&64&&Y0(d),Do(d,d.return);break;case 27:Q0(d);case 26:case 5:_a(f,d,s),s&&l===null&&y&4&&K0(d),Do(d,d.return);break;case 12:_a(f,d,s);break;case 31:_a(f,d,s),s&&y&4&&ng(f,d);break;case 13:_a(f,d,s),s&&y&4&&ig(f,d);break;case 22:d.memoizedState===null&&_a(f,d,s),Do(d,d.return);break;case 30:break;default:_a(f,d,s)}i=i.sibling}}function $f(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&go(s))}function th(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&go(e))}function Pi(e,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)rg(e,i,s,l),i=i.sibling}function rg(e,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Pi(e,i,s,l),f&2048&&Co(9,i);break;case 1:Pi(e,i,s,l);break;case 3:Pi(e,i,s,l),f&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&go(e)));break;case 12:if(f&2048){Pi(e,i,s,l),e=i.stateNode;try{var d=i.memoizedProps,y=d.id,U=d.onPostCommit;typeof U=="function"&&U(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(K){ke(i,i.return,K)}}else Pi(e,i,s,l);break;case 31:Pi(e,i,s,l);break;case 13:Pi(e,i,s,l);break;case 23:break;case 22:d=i.stateNode,y=i.alternate,i.memoizedState!==null?d._visibility&2?Pi(e,i,s,l):Uo(e,i):d._visibility&2?Pi(e,i,s,l):(d._visibility|=2,pr(e,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&$f(y,i);break;case 24:Pi(e,i,s,l),f&2048&&th(i.alternate,i);break;default:Pi(e,i,s,l)}}function pr(e,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var d=e,y=i,U=s,K=l,ft=y.flags;switch(y.tag){case 0:case 11:case 15:pr(d,y,U,K,f),Co(8,y);break;case 23:break;case 22:var Et=y.stateNode;y.memoizedState!==null?Et._visibility&2?pr(d,y,U,K,f):Uo(d,y):(Et._visibility|=2,pr(d,y,U,K,f)),f&&ft&2048&&$f(y.alternate,y);break;case 24:pr(d,y,U,K,f),f&&ft&2048&&th(y.alternate,y);break;default:pr(d,y,U,K,f)}i=i.sibling}}function Uo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,l=i,f=l.flags;switch(l.tag){case 22:Uo(s,l),f&2048&&$f(l.alternate,l);break;case 24:Uo(s,l),f&2048&&th(l.alternate,l);break;default:Uo(s,l)}i=i.sibling}}var Lo=8192;function mr(e,i,s){if(e.subtreeFlags&Lo)for(e=e.child;e!==null;)og(e,i,s),e=e.sibling}function og(e,i,s){switch(e.tag){case 26:mr(e,i,s),e.flags&Lo&&e.memoizedState!==null&&wy(s,Oi,e.memoizedState,e.memoizedProps);break;case 5:mr(e,i,s);break;case 3:case 4:var l=Oi;Oi=Mc(e.stateNode.containerInfo),mr(e,i,s),Oi=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=Lo,Lo=16777216,mr(e,i,s),Lo=l):mr(e,i,s));break;default:mr(e,i,s)}}function lg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function No(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];An=l,ug(l,e)}lg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)cg(e),e=e.sibling}function cg(e){switch(e.tag){case 0:case 11:case 15:No(e),e.flags&2048&&Za(9,e,e.return);break;case 3:No(e);break;case 12:No(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,cc(e)):No(e);break;default:No(e)}}function cc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];An=l,ug(l,e)}lg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Za(8,i,i.return),cc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,cc(i));break;default:cc(i)}e=e.sibling}}function ug(e,i){for(;An!==null;){var s=An;switch(s.tag){case 0:case 11:case 15:Za(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:go(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,An=l;else t:for(s=e;An!==null;){l=An;var f=l.sibling,d=l.return;if(tg(l),l===s){An=null;break t}if(f!==null){f.return=d,An=f;break t}An=d}}}var VS={getCacheForType:function(e){var i=Un(gn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Un(gn).controller.signal}},kS=typeof WeakMap=="function"?WeakMap:Map,He=0,Qe=null,we=null,Ce=0,Ve=0,ui=null,Ka=!1,gr=!1,eh=!1,xa=0,ln=0,Ja=0,Us=0,nh=0,fi=0,vr=0,Oo=null,ei=null,ih=!1,uc=0,fg=0,fc=1/0,hc=null,Qa=null,Mn=0,ja=null,_r=null,Sa=0,ah=0,sh=null,hg=null,Po=0,rh=null;function hi(){return(He&2)!==0&&Ce!==0?Ce&-Ce:B.T!==null?hh():no()}function dg(){if(fi===0)if((Ce&536870912)===0||Ue){var e=re;re<<=1,(re&3932160)===0&&(re=262144),fi=e}else fi=536870912;return e=li.current,e!==null&&(e.flags|=32),fi}function ni(e,i,s){(e===Qe&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)&&(xr(e,0),$a(e,Ce,fi,!1)),$t(e,s),((He&2)===0||e!==Qe)&&(e===Qe&&((He&2)===0&&(Us|=s),ln===4&&$a(e,Ce,fi,!1)),Ki(e))}function pg(e,i,s){if((He&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&e.expiredLanes)===0||Gt(e,i),f=l?qS(e,i):lh(e,i,!0),d=l;do{if(f===0){gr&&!l&&$a(e,i,0,!1);break}else{if(s=e.current.alternate,d&&!XS(s)){f=lh(e,i,!1),d=!1;continue}if(f===2){if(d=i,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var U=e;f=Oo;var K=U.current.memoizedState.isDehydrated;if(K&&(xr(U,y).flags|=256),y=lh(U,y,!1),y!==2){if(eh&&!K){U.errorRecoveryDisabledLanes|=d,Us|=d,f=4;break t}d=ei,ei=f,d!==null&&(ei===null?ei=d:ei.push.apply(ei,d))}f=y}if(d=!1,f!==2)continue}}if(f===1){xr(e,0),$a(e,i,0,!0);break}t:{switch(l=e,d=f,d){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:$a(l,i,fi,!Ka);break t;case 2:ei=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=uc+300-pe(),10<f)){if($a(l,i,fi,!Ka),Mt(l,0,!0)!==0)break t;Sa=i,l.timeoutHandle=Wg(mg.bind(null,l,s,ei,hc,ih,i,fi,Us,vr,Ka,d,"Throttled",-0,0),f);break t}mg(l,s,ei,hc,ih,i,fi,Us,vr,Ka,d,null,-0,0)}}break}while(!0);Ki(e)}function mg(e,i,s,l,f,d,y,U,K,ft,Et,At,ht,gt){if(e.timeoutHandle=-1,At=i.subtreeFlags,At&8192||(At&16785408)===16785408){At={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Si},og(i,d,At);var ne=(d&62914560)===d?uc-pe():(d&4194048)===d?fg-pe():0;if(ne=Ry(At,ne),ne!==null){Sa=d,e.cancelPendingCommit=ne(Eg.bind(null,e,i,d,s,l,f,y,U,K,Et,At,null,ht,gt)),$a(e,d,y,!ft);return}}Eg(e,i,d,s,l,f,y,U,K)}function XS(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],d=f.getSnapshot;f=f.value;try{if(!ri(d(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function $a(e,i,s,l){i&=~nh,i&=~Us,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var f=i;0<f;){var d=31-_t(f),y=1<<d;l[d]=-1,f&=~y}s!==0&&Pe(e,s,i)}function dc(){return(He&6)===0?(Io(0),!1):!0}function oh(){if(we!==null){if(Ve===0)var e=we.return;else e=we,ca=Ms=null,Ef(e),cr=null,_o=0,e=we;for(;e!==null;)q0(e.alternate,e),e=e.return;we=null}}function xr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,uy(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),Sa=0,oh(),Qe=e,we=s=oa(e.current,null),Ce=i,Ve=0,ui=null,Ka=!1,gr=Gt(e,i),eh=!1,vr=fi=nh=Us=Ja=ln=0,ei=Oo=null,ih=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var f=31-_t(l),d=1<<f;i|=e[f],l&=~d}return xa=i,Ol(),s}function gg(e,i){xe=null,B.H=Ao,i===lr||i===Vl?(i=Lm(),Ve=3):i===ff?(i=Lm(),Ve=4):Ve=i===Ff?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ui=i,we===null&&(ln=1,nc(e,Mi(i,e.current)))}function vg(){var e=li.current;return e===null?!0:(Ce&4194048)===Ce?Ai===null:(Ce&62914560)===Ce||(Ce&536870912)!==0?e===Ai:!1}function _g(){var e=B.H;return B.H=Ao,e===null?Ao:e}function xg(){var e=B.A;return B.A=VS,e}function pc(){ln=4,Ka||(Ce&4194048)!==Ce&&li.current!==null||(gr=!0),(Ja&134217727)===0&&(Us&134217727)===0||Qe===null||$a(Qe,Ce,fi,!1)}function lh(e,i,s){var l=He;He|=2;var f=_g(),d=xg();(Qe!==e||Ce!==i)&&(hc=null,xr(e,i)),i=!1;var y=ln;t:do try{if(Ve!==0&&we!==null){var U=we,K=ui;switch(Ve){case 8:oh(),y=6;break t;case 3:case 2:case 9:case 6:li.current===null&&(i=!0);var ft=Ve;if(Ve=0,ui=null,Sr(e,U,K,ft),s&&gr){y=0;break t}break;default:ft=Ve,Ve=0,ui=null,Sr(e,U,K,ft)}}WS(),y=ln;break}catch(Et){gg(e,Et)}while(!0);return i&&e.shellSuspendCounter++,ca=Ms=null,He=l,B.H=f,B.A=d,we===null&&(Qe=null,Ce=0,Ol()),y}function WS(){for(;we!==null;)Sg(we)}function qS(e,i){var s=He;He|=2;var l=_g(),f=xg();Qe!==e||Ce!==i?(hc=null,fc=pe()+500,xr(e,i)):gr=Gt(e,i);t:do try{if(Ve!==0&&we!==null){i=we;var d=ui;e:switch(Ve){case 1:Ve=0,ui=null,Sr(e,i,d,1);break;case 2:case 9:if(Dm(d)){Ve=0,ui=null,yg(i);break}i=function(){Ve!==2&&Ve!==9||Qe!==e||(Ve=7),Ki(e)},d.then(i,i);break t;case 3:Ve=7;break t;case 4:Ve=5;break t;case 7:Dm(d)?(Ve=0,ui=null,yg(i)):(Ve=0,ui=null,Sr(e,i,d,7));break;case 5:var y=null;switch(we.tag){case 26:y=we.memoizedState;case 5:case 27:var U=we;if(y?rv(y):U.stateNode.complete){Ve=0,ui=null;var K=U.sibling;if(K!==null)we=K;else{var ft=U.return;ft!==null?(we=ft,mc(ft)):we=null}break e}}Ve=0,ui=null,Sr(e,i,d,5);break;case 6:Ve=0,ui=null,Sr(e,i,d,6);break;case 8:oh(),ln=6;break t;default:throw Error(a(462))}}YS();break}catch(Et){gg(e,Et)}while(!0);return ca=Ms=null,B.H=l,B.A=f,He=s,we!==null?0:(Qe=null,Ce=0,Ol(),ln)}function YS(){for(;we!==null&&!he();)Sg(we)}function Sg(e){var i=X0(e.alternate,e,xa);e.memoizedProps=e.pendingProps,i===null?mc(e):we=i}function yg(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=B0(s,i,i.pendingProps,i.type,void 0,Ce);break;case 11:i=B0(s,i,i.pendingProps,i.type.render,i.ref,Ce);break;case 5:Ef(i);default:q0(s,i),i=we=xm(i,xa),i=X0(s,i,xa)}e.memoizedProps=e.pendingProps,i===null?mc(e):we=i}function Sr(e,i,s,l){ca=Ms=null,Ef(i),cr=null,_o=0;var f=i.return;try{if(PS(e,f,i,s,Ce)){ln=1,nc(e,Mi(s,e.current)),we=null;return}}catch(d){if(f!==null)throw we=f,d;ln=1,nc(e,Mi(s,e.current)),we=null;return}i.flags&32768?(Ue||l===1?e=!0:gr||(Ce&536870912)!==0?e=!1:(Ka=e=!0,(l===2||l===9||l===3||l===6)&&(l=li.current,l!==null&&l.tag===13&&(l.flags|=16384))),Mg(i,e)):mc(i)}function mc(e){var i=e;do{if((i.flags&32768)!==0){Mg(i,Ka);return}e=i.return;var s=BS(i.alternate,i,xa);if(s!==null){we=s;return}if(i=i.sibling,i!==null){we=i;return}we=i=e}while(i!==null);ln===0&&(ln=5)}function Mg(e,i){do{var s=FS(e.alternate,e);if(s!==null){s.flags&=32767,we=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){we=e;return}we=e=s}while(e!==null);ln=6,we=null}function Eg(e,i,s,l,f,d,y,U,K){e.cancelPendingCommit=null;do gc();while(Mn!==0);if((He&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(d=i.lanes|i.childLanes,d|=Ku,We(e,s,d,y,U,K),e===Qe&&(we=Qe=null,Ce=0),_r=i,ja=e,Sa=s,ah=d,sh=f,hg=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,QS(it,function(){return Rg(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=B.T,B.T=null,f=P.p,P.p=2,y=He,He|=4;try{HS(e,i,s)}finally{He=y,P.p=f,B.T=l}}Mn=1,bg(),Tg(),Ag()}}function bg(){if(Mn===1){Mn=0;var e=ja,i=_r,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=B.T,B.T=null;var l=P.p;P.p=2;var f=He;He|=4;try{ag(i,e);var d=Sh,y=um(e.containerInfo),U=d.focusedElem,K=d.selectionRange;if(y!==U&&U&&U.ownerDocument&&cm(U.ownerDocument.documentElement,U)){if(K!==null&&Xu(U)){var ft=K.start,Et=K.end;if(Et===void 0&&(Et=ft),"selectionStart"in U)U.selectionStart=ft,U.selectionEnd=Math.min(Et,U.value.length);else{var At=U.ownerDocument||document,ht=At&&At.defaultView||window;if(ht.getSelection){var gt=ht.getSelection(),ne=U.textContent.length,fe=Math.min(K.start,ne),Ke=K.end===void 0?fe:Math.min(K.end,ne);!gt.extend&&fe>Ke&&(y=Ke,Ke=fe,fe=y);var st=lm(U,fe),et=lm(U,Ke);if(st&&et&&(gt.rangeCount!==1||gt.anchorNode!==st.node||gt.anchorOffset!==st.offset||gt.focusNode!==et.node||gt.focusOffset!==et.offset)){var ut=At.createRange();ut.setStart(st.node,st.offset),gt.removeAllRanges(),fe>Ke?(gt.addRange(ut),gt.extend(et.node,et.offset)):(ut.setEnd(et.node,et.offset),gt.addRange(ut))}}}}for(At=[],gt=U;gt=gt.parentNode;)gt.nodeType===1&&At.push({element:gt,left:gt.scrollLeft,top:gt.scrollTop});for(typeof U.focus=="function"&&U.focus(),U=0;U<At.length;U++){var bt=At[U];bt.element.scrollLeft=bt.left,bt.element.scrollTop=bt.top}}Rc=!!xh,Sh=xh=null}finally{He=f,P.p=l,B.T=s}}e.current=i,Mn=2}}function Tg(){if(Mn===2){Mn=0;var e=ja,i=_r,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=B.T,B.T=null;var l=P.p;P.p=2;var f=He;He|=4;try{$0(e,i.alternate,i)}finally{He=f,P.p=l,B.T=s}}Mn=3}}function Ag(){if(Mn===4||Mn===3){Mn=0,Q();var e=ja,i=_r,s=Sa,l=hg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?Mn=5:(Mn=0,_r=ja=null,wg(e,e.pendingLanes));var f=e.pendingLanes;if(f===0&&(Qa=null),eo(s),i=i.stateNode,yt&&typeof yt.onCommitFiberRoot=="function")try{yt.onCommitFiberRoot(vt,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=B.T,f=P.p,P.p=2,B.T=null;try{for(var d=e.onRecoverableError,y=0;y<l.length;y++){var U=l[y];d(U.value,{componentStack:U.stack})}}finally{B.T=i,P.p=f}}(Sa&3)!==0&&gc(),Ki(e),f=e.pendingLanes,(s&261930)!==0&&(f&42)!==0?e===rh?Po++:(Po=0,rh=e):Po=0,Io(0)}}function wg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,go(i)))}function gc(){return bg(),Tg(),Ag(),Rg()}function Rg(){if(Mn!==5)return!1;var e=ja,i=ah;ah=0;var s=eo(Sa),l=B.T,f=P.p;try{P.p=32>s?32:s,B.T=null,s=sh,sh=null;var d=ja,y=Sa;if(Mn=0,_r=ja=null,Sa=0,(He&6)!==0)throw Error(a(331));var U=He;if(He|=4,cg(d.current),rg(d,d.current,y,s),He=U,Io(0,!1),yt&&typeof yt.onPostCommitFiberRoot=="function")try{yt.onPostCommitFiberRoot(vt,d)}catch{}return!0}finally{P.p=f,B.T=l,wg(e,i)}}function Cg(e,i,s){i=Mi(s,i),i=Bf(e.stateNode,i,2),e=Wa(e,i,2),e!==null&&($t(e,2),Ki(e))}function ke(e,i,s){if(e.tag===3)Cg(e,e,s);else for(;i!==null;){if(i.tag===3){Cg(i,e,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Qa===null||!Qa.has(l))){e=Mi(s,e),s=D0(2),l=Wa(i,s,2),l!==null&&(U0(s,l,i,e),$t(l,2),Ki(l));break}}i=i.return}}function ch(e,i,s){var l=e.pingCache;if(l===null){l=e.pingCache=new kS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(eh=!0,f.add(s),e=ZS.bind(null,e,i,s),i.then(e,e))}function ZS(e,i,s){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Qe===e&&(Ce&s)===s&&(ln===4||ln===3&&(Ce&62914560)===Ce&&300>pe()-uc?(He&2)===0&&xr(e,0):nh|=s,vr===Ce&&(vr=0)),Ki(e)}function Dg(e,i){i===0&&(i=Ut()),e=xs(e,i),e!==null&&($t(e,i),Ki(e))}function KS(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),Dg(e,s)}function JS(e,i){var s=0;switch(e.tag){case 31:case 13:var l=e.stateNode,f=e.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),Dg(e,s)}function QS(e,i){return jt(e,i)}var vc=null,yr=null,uh=!1,_c=!1,fh=!1,ts=0;function Ki(e){e!==yr&&e.next===null&&(yr===null?vc=yr=e:yr=yr.next=e),_c=!0,uh||(uh=!0,$S())}function Io(e,i){if(!fh&&_c){fh=!0;do for(var s=!1,l=vc;l!==null;){if(e!==0){var f=l.pendingLanes;if(f===0)var d=0;else{var y=l.suspendedLanes,U=l.pingedLanes;d=(1<<31-_t(42|e)+1)-1,d&=f&~(y&~U),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(s=!0,Og(l,d))}else d=Ce,d=Mt(l,l===Qe?d:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(d&3)===0||Gt(l,d)||(s=!0,Og(l,d));l=l.next}while(s);fh=!1}}function jS(){Ug()}function Ug(){_c=uh=!1;var e=0;ts!==0&&cy()&&(e=ts);for(var i=pe(),s=null,l=vc;l!==null;){var f=l.next,d=Lg(l,i);d===0?(l.next=null,s===null?vc=f:s.next=f,f===null&&(yr=s)):(s=l,(e!==0||(d&3)!==0)&&(_c=!0)),l=f}Mn!==0&&Mn!==5||Io(e),ts!==0&&(ts=0)}function Lg(e,i){for(var s=e.suspendedLanes,l=e.pingedLanes,f=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-_t(d),U=1<<y,K=f[y];K===-1?((U&s)===0||(U&l)!==0)&&(f[y]=Yt(U,i)):K<=i&&(e.expiredLanes|=U),d&=~U}if(i=Qe,s=Ce,s=Mt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,s===0||e===i&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&ce(l),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||Gt(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(l!==null&&ce(l),eo(s)){case 2:case 8:s=T;break;case 32:s=it;break;case 268435456:s=St;break;default:s=it}return l=Ng.bind(null,e),s=jt(s,l),e.callbackPriority=i,e.callbackNode=s,i}return l!==null&&l!==null&&ce(l),e.callbackPriority=2,e.callbackNode=null,2}function Ng(e,i){if(Mn!==0&&Mn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(gc()&&e.callbackNode!==s)return null;var l=Ce;return l=Mt(e,e===Qe?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(pg(e,l,i),Lg(e,pe()),e.callbackNode!=null&&e.callbackNode===s?Ng.bind(null,e):null)}function Og(e,i){if(gc())return null;pg(e,i,!0)}function $S(){fy(function(){(He&6)!==0?jt(G,jS):Ug()})}function hh(){if(ts===0){var e=rr;e===0&&(e=qt,qt<<=1,(qt&261888)===0&&(qt=256)),ts=e}return ts}function Pg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Li(""+e)}function Ig(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function ty(e,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var d=Pg((f[Cn]||null).action),y=l.submitter;y&&(i=(i=y[Cn]||null)?Pg(i.formAction):y.getAttribute("formAction"),i!==null&&(d=i,y=null));var U=new Dl("action","action",null,l,f);e.push({event:U,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ts!==0){var K=y?Ig(f,y):new FormData(f);Lf(s,{pending:!0,data:K,method:f.method,action:d},null,K)}}else typeof d=="function"&&(U.preventDefault(),K=y?Ig(f,y):new FormData(f),Lf(s,{pending:!0,data:K,method:f.method,action:d},d,K))},currentTarget:f}]})}}for(var dh=0;dh<Zu.length;dh++){var ph=Zu[dh],ey=ph.toLowerCase(),ny=ph[0].toUpperCase()+ph.slice(1);Ni(ey,"on"+ny)}Ni(dm,"onAnimationEnd"),Ni(pm,"onAnimationIteration"),Ni(mm,"onAnimationStart"),Ni("dblclick","onDoubleClick"),Ni("focusin","onFocus"),Ni("focusout","onBlur"),Ni(_S,"onTransitionRun"),Ni(xS,"onTransitionStart"),Ni(SS,"onTransitionCancel"),Ni(gm,"onTransitionEnd"),tt("onMouseEnter",["mouseout","mouseover"]),tt("onMouseLeave",["mouseout","mouseover"]),tt("onPointerEnter",["pointerout","pointerover"]),tt("onPointerLeave",["pointerout","pointerover"]),C("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),C("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),C("onBeforeInput",["compositionend","keypress","textInput","paste"]),C("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),iy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zo));function zg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var l=e[s],f=l.event;l=l.listeners;t:{var d=void 0;if(i)for(var y=l.length-1;0<=y;y--){var U=l[y],K=U.instance,ft=U.currentTarget;if(U=U.listener,K!==d&&f.isPropagationStopped())break t;d=U,f.currentTarget=ft;try{d(f)}catch(Et){Nl(Et)}f.currentTarget=null,d=K}else for(y=0;y<l.length;y++){if(U=l[y],K=U.instance,ft=U.currentTarget,U=U.listener,K!==d&&f.isPropagationStopped())break t;d=U,f.currentTarget=ft;try{d(f)}catch(Et){Nl(Et)}f.currentTarget=null,d=K}}}}function Re(e,i){var s=i[ds];s===void 0&&(s=i[ds]=new Set);var l=e+"__bubble";s.has(l)||(Bg(i,e,2,!1),s.add(l))}function mh(e,i,s){var l=0;i&&(l|=4),Bg(s,e,l,i)}var xc="_reactListening"+Math.random().toString(36).slice(2);function gh(e){if(!e[xc]){e[xc]=!0,Al.forEach(function(s){s!=="selectionchange"&&(iy.has(s)||mh(s,!1,e),mh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[xc]||(i[xc]=!0,mh("selectionchange",!1,i))}}function Bg(e,i,s,l){switch(dv(i)){case 2:var f=Uy;break;case 8:f=Ly;break;default:f=Uh}s=f.bind(null,i,s,e),f=void 0,!Pu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?e.addEventListener(i,s,{capture:!0,passive:f}):e.addEventListener(i,s,!0):f!==void 0?e.addEventListener(i,s,{passive:f}):e.addEventListener(i,s,!1)}function vh(e,i,s,l,f){var d=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var y=l.tag;if(y===3||y===4){var U=l.stateNode.containerInfo;if(U===f)break;if(y===4)for(y=l.return;y!==null;){var K=y.tag;if((K===3||K===4)&&y.stateNode.containerInfo===f)return;y=y.return}for(;U!==null;){if(y=aa(U),y===null)return;if(K=y.tag,K===5||K===6||K===26||K===27){l=d=y;continue t}U=U.parentNode}}l=l.return}kp(function(){var ft=d,Et=Nu(s),At=[];t:{var ht=vm.get(e);if(ht!==void 0){var gt=Dl,ne=e;switch(e){case"keypress":if(Rl(s)===0)break t;case"keydown":case"keyup":gt=Jx;break;case"focusin":ne="focus",gt=Fu;break;case"focusout":ne="blur",gt=Fu;break;case"beforeblur":case"afterblur":gt=Fu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":gt=qp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":gt=Bx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":gt=$x;break;case dm:case pm:case mm:gt=Gx;break;case gm:gt=eS;break;case"scroll":case"scrollend":gt=Ix;break;case"wheel":gt=iS;break;case"copy":case"cut":case"paste":gt=kx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":gt=Zp;break;case"toggle":case"beforetoggle":gt=sS}var fe=(i&4)!==0,Ke=!fe&&(e==="scroll"||e==="scrollend"),st=fe?ht!==null?ht+"Capture":null:ht;fe=[];for(var et=ft,ut;et!==null;){var bt=et;if(ut=bt.stateNode,bt=bt.tag,bt!==5&&bt!==26&&bt!==27||ut===null||st===null||(bt=ao(et,st),bt!=null&&fe.push(Bo(et,bt,ut))),Ke)break;et=et.return}0<fe.length&&(ht=new gt(ht,ne,null,s,Et),At.push({event:ht,listeners:fe}))}}if((i&7)===0){t:{if(ht=e==="mouseover"||e==="pointerover",gt=e==="mouseout"||e==="pointerout",ht&&s!==Lu&&(ne=s.relatedTarget||s.fromElement)&&(aa(ne)||ne[Jn]))break t;if((gt||ht)&&(ht=Et.window===Et?Et:(ht=Et.ownerDocument)?ht.defaultView||ht.parentWindow:window,gt?(ne=s.relatedTarget||s.toElement,gt=ft,ne=ne?aa(ne):null,ne!==null&&(Ke=c(ne),fe=ne.tag,ne!==Ke||fe!==5&&fe!==27&&fe!==6)&&(ne=null)):(gt=null,ne=ft),gt!==ne)){if(fe=qp,bt="onMouseLeave",st="onMouseEnter",et="mouse",(e==="pointerout"||e==="pointerover")&&(fe=Zp,bt="onPointerLeave",st="onPointerEnter",et="pointer"),Ke=gt==null?ht:ms(gt),ut=ne==null?ht:ms(ne),ht=new fe(bt,et+"leave",gt,s,Et),ht.target=Ke,ht.relatedTarget=ut,bt=null,aa(Et)===ft&&(fe=new fe(st,et+"enter",ne,s,Et),fe.target=ut,fe.relatedTarget=Ke,bt=fe),Ke=bt,gt&&ne)e:{for(fe=ay,st=gt,et=ne,ut=0,bt=st;bt;bt=fe(bt))ut++;bt=0;for(var le=et;le;le=fe(le))bt++;for(;0<ut-bt;)st=fe(st),ut--;for(;0<bt-ut;)et=fe(et),bt--;for(;ut--;){if(st===et||et!==null&&st===et.alternate){fe=st;break e}st=fe(st),et=fe(et)}fe=null}else fe=null;gt!==null&&Fg(At,ht,gt,fe,!1),ne!==null&&Ke!==null&&Fg(At,Ke,ne,fe,!0)}}t:{if(ht=ft?ms(ft):window,gt=ht.nodeName&&ht.nodeName.toLowerCase(),gt==="select"||gt==="input"&&ht.type==="file")var ze=nm;else if(tm(ht))if(im)ze=mS;else{ze=dS;var se=hS}else gt=ht.nodeName,!gt||gt.toLowerCase()!=="input"||ht.type!=="checkbox"&&ht.type!=="radio"?ft&&xi(ft.elementType)&&(ze=nm):ze=pS;if(ze&&(ze=ze(e,ft))){em(At,ze,s,Et);break t}se&&se(e,ht,ft),e==="focusout"&&ft&&ht.type==="number"&&ft.memoizedProps.value!=null&&yn(ht,"number",ht.value)}switch(se=ft?ms(ft):window,e){case"focusin":(tm(se)||se.contentEditable==="true")&&(js=se,Wu=ft,ho=null);break;case"focusout":ho=Wu=js=null;break;case"mousedown":qu=!0;break;case"contextmenu":case"mouseup":case"dragend":qu=!1,fm(At,s,Et);break;case"selectionchange":if(vS)break;case"keydown":case"keyup":fm(At,s,Et)}var ye;if(Gu)t:{switch(e){case"compositionstart":var De="onCompositionStart";break t;case"compositionend":De="onCompositionEnd";break t;case"compositionupdate":De="onCompositionUpdate";break t}De=void 0}else Qs?jp(e,s)&&(De="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(De="onCompositionStart");De&&(Kp&&s.locale!=="ko"&&(Qs||De!=="onCompositionStart"?De==="onCompositionEnd"&&Qs&&(ye=Xp()):(Ba=Et,Iu="value"in Ba?Ba.value:Ba.textContent,Qs=!0)),se=Sc(ft,De),0<se.length&&(De=new Yp(De,e,null,s,Et),At.push({event:De,listeners:se}),ye?De.data=ye:(ye=$p(s),ye!==null&&(De.data=ye)))),(ye=oS?lS(e,s):cS(e,s))&&(De=Sc(ft,"onBeforeInput"),0<De.length&&(se=new Yp("onBeforeInput","beforeinput",null,s,Et),At.push({event:se,listeners:De}),se.data=ye)),ty(At,e,ft,s,Et)}zg(At,i)})}function Bo(e,i,s){return{instance:e,listener:i,currentTarget:s}}function Sc(e,i){for(var s=i+"Capture",l=[];e!==null;){var f=e,d=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||d===null||(f=ao(e,s),f!=null&&l.unshift(Bo(e,f,d)),f=ao(e,i),f!=null&&l.push(Bo(e,f,d))),e.tag===3)return l;e=e.return}return[]}function ay(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Fg(e,i,s,l,f){for(var d=i._reactName,y=[];s!==null&&s!==l;){var U=s,K=U.alternate,ft=U.stateNode;if(U=U.tag,K!==null&&K===l)break;U!==5&&U!==26&&U!==27||ft===null||(K=ft,f?(ft=ao(s,d),ft!=null&&y.unshift(Bo(s,ft,K))):f||(ft=ao(s,d),ft!=null&&y.push(Bo(s,ft,K)))),s=s.return}y.length!==0&&e.push({event:i,listeners:y})}var sy=/\r\n?/g,ry=/\u0000|\uFFFD/g;function Hg(e){return(typeof e=="string"?e:""+e).replace(sy,`
`).replace(ry,"")}function Gg(e,i){return i=Hg(i),Hg(e)===i}function Ze(e,i,s,l,f,d){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Vn(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Vn(e,""+l);break;case"className":kt(e,"class",l);break;case"tabIndex":kt(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":kt(e,s,l);break;case"style":an(e,l,d);break;case"data":if(i!=="object"){kt(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Li(""+l),e.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(s==="formAction"?(i!=="input"&&Ze(e,i,"name",f.name,f,null),Ze(e,i,"formEncType",f.formEncType,f,null),Ze(e,i,"formMethod",f.formMethod,f,null),Ze(e,i,"formTarget",f.formTarget,f,null)):(Ze(e,i,"encType",f.encType,f,null),Ze(e,i,"method",f.method,f,null),Ze(e,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Li(""+l),e.setAttribute(s,l);break;case"onClick":l!=null&&(e.onclick=Si);break;case"onScroll":l!=null&&Re("scroll",e);break;case"onScrollEnd":l!=null&&Re("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}s=Li(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""+l):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":l===!0?e.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,l):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(s,l):e.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(s):e.setAttribute(s,l);break;case"popover":Re("beforetoggle",e),Re("toggle",e),Jt(e,"popover",l);break;case"xlinkActuate":Zt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Zt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Zt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Zt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Zt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Zt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Zt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Jt(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=qe.get(s)||s,Jt(e,s,l))}}function _h(e,i,s,l,f,d){switch(s){case"style":an(e,l,d);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof l=="string"?Vn(e,l):(typeof l=="number"||typeof l=="bigint")&&Vn(e,""+l);break;case"onScroll":l!=null&&Re("scroll",e);break;case"onScrollEnd":l!=null&&Re("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Si);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!io.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),d=e[Cn]||null,d=d!=null?d[s]:null,typeof d=="function"&&e.removeEventListener(i,d,f),typeof l=="function")){typeof d!="function"&&d!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,l,f);break t}s in e?e[s]=l:l===!0?e.setAttribute(s,""):Jt(e,s,l)}}}function Nn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Re("error",e),Re("load",e);var l=!1,f=!1,d;for(d in s)if(s.hasOwnProperty(d)){var y=s[d];if(y!=null)switch(d){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,d,y,s,null)}}f&&Ze(e,i,"srcSet",s.srcSet,s,null),l&&Ze(e,i,"src",s.src,s,null);return;case"input":Re("invalid",e);var U=d=y=f=null,K=null,ft=null;for(l in s)if(s.hasOwnProperty(l)){var Et=s[l];if(Et!=null)switch(l){case"name":f=Et;break;case"type":y=Et;break;case"checked":K=Et;break;case"defaultChecked":ft=Et;break;case"value":d=Et;break;case"defaultValue":U=Et;break;case"children":case"dangerouslySetInnerHTML":if(Et!=null)throw Error(a(137,i));break;default:Ze(e,i,l,Et,s,null)}}Qt(e,d,U,K,ft,y,f,!1);return;case"select":Re("invalid",e),l=y=d=null;for(f in s)if(s.hasOwnProperty(f)&&(U=s[f],U!=null))switch(f){case"value":d=U;break;case"defaultValue":y=U;break;case"multiple":l=U;default:Ze(e,i,f,U,s,null)}i=d,s=y,e.multiple=!!l,i!=null?Ee(e,!!l,i,!1):s!=null&&Ee(e,!!l,s,!0);return;case"textarea":Re("invalid",e),d=f=l=null;for(y in s)if(s.hasOwnProperty(y)&&(U=s[y],U!=null))switch(y){case"value":l=U;break;case"defaultValue":f=U;break;case"children":d=U;break;case"dangerouslySetInnerHTML":if(U!=null)throw Error(a(91));break;default:Ze(e,i,y,U,s,null)}si(e,l,f,d);return;case"option":for(K in s)if(s.hasOwnProperty(K)&&(l=s[K],l!=null))switch(K){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Ze(e,i,K,l,s,null)}return;case"dialog":Re("beforetoggle",e),Re("toggle",e),Re("cancel",e),Re("close",e);break;case"iframe":case"object":Re("load",e);break;case"video":case"audio":for(l=0;l<zo.length;l++)Re(zo[l],e);break;case"image":Re("error",e),Re("load",e);break;case"details":Re("toggle",e);break;case"embed":case"source":case"link":Re("error",e),Re("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ft in s)if(s.hasOwnProperty(ft)&&(l=s[ft],l!=null))switch(ft){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,ft,l,s,null)}return;default:if(xi(i)){for(Et in s)s.hasOwnProperty(Et)&&(l=s[Et],l!==void 0&&_h(e,i,Et,l,s,void 0));return}}for(U in s)s.hasOwnProperty(U)&&(l=s[U],l!=null&&Ze(e,i,U,l,s,null))}function oy(e,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,d=null,y=null,U=null,K=null,ft=null,Et=null;for(gt in s){var At=s[gt];if(s.hasOwnProperty(gt)&&At!=null)switch(gt){case"checked":break;case"value":break;case"defaultValue":K=At;default:l.hasOwnProperty(gt)||Ze(e,i,gt,null,l,At)}}for(var ht in l){var gt=l[ht];if(At=s[ht],l.hasOwnProperty(ht)&&(gt!=null||At!=null))switch(ht){case"type":d=gt;break;case"name":f=gt;break;case"checked":ft=gt;break;case"defaultChecked":Et=gt;break;case"value":y=gt;break;case"defaultValue":U=gt;break;case"children":case"dangerouslySetInnerHTML":if(gt!=null)throw Error(a(137,i));break;default:gt!==At&&Ze(e,i,ht,gt,l,At)}}mn(e,y,U,K,ft,Et,d,f);return;case"select":gt=y=U=ht=null;for(d in s)if(K=s[d],s.hasOwnProperty(d)&&K!=null)switch(d){case"value":break;case"multiple":gt=K;default:l.hasOwnProperty(d)||Ze(e,i,d,null,l,K)}for(f in l)if(d=l[f],K=s[f],l.hasOwnProperty(f)&&(d!=null||K!=null))switch(f){case"value":ht=d;break;case"defaultValue":U=d;break;case"multiple":y=d;default:d!==K&&Ze(e,i,f,d,l,K)}i=U,s=y,l=gt,ht!=null?Ee(e,!!s,ht,!1):!!l!=!!s&&(i!=null?Ee(e,!!s,i,!0):Ee(e,!!s,s?[]:"",!1));return;case"textarea":gt=ht=null;for(U in s)if(f=s[U],s.hasOwnProperty(U)&&f!=null&&!l.hasOwnProperty(U))switch(U){case"value":break;case"children":break;default:Ze(e,i,U,null,l,f)}for(y in l)if(f=l[y],d=s[y],l.hasOwnProperty(y)&&(f!=null||d!=null))switch(y){case"value":ht=f;break;case"defaultValue":gt=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==d&&Ze(e,i,y,f,l,d)}Gn(e,ht,gt);return;case"option":for(var ne in s)if(ht=s[ne],s.hasOwnProperty(ne)&&ht!=null&&!l.hasOwnProperty(ne))switch(ne){case"selected":e.selected=!1;break;default:Ze(e,i,ne,null,l,ht)}for(K in l)if(ht=l[K],gt=s[K],l.hasOwnProperty(K)&&ht!==gt&&(ht!=null||gt!=null))switch(K){case"selected":e.selected=ht&&typeof ht!="function"&&typeof ht!="symbol";break;default:Ze(e,i,K,ht,l,gt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var fe in s)ht=s[fe],s.hasOwnProperty(fe)&&ht!=null&&!l.hasOwnProperty(fe)&&Ze(e,i,fe,null,l,ht);for(ft in l)if(ht=l[ft],gt=s[ft],l.hasOwnProperty(ft)&&ht!==gt&&(ht!=null||gt!=null))switch(ft){case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(a(137,i));break;default:Ze(e,i,ft,ht,l,gt)}return;default:if(xi(i)){for(var Ke in s)ht=s[Ke],s.hasOwnProperty(Ke)&&ht!==void 0&&!l.hasOwnProperty(Ke)&&_h(e,i,Ke,void 0,l,ht);for(Et in l)ht=l[Et],gt=s[Et],!l.hasOwnProperty(Et)||ht===gt||ht===void 0&&gt===void 0||_h(e,i,Et,ht,l,gt);return}}for(var st in s)ht=s[st],s.hasOwnProperty(st)&&ht!=null&&!l.hasOwnProperty(st)&&Ze(e,i,st,null,l,ht);for(At in l)ht=l[At],gt=s[At],!l.hasOwnProperty(At)||ht===gt||ht==null&&gt==null||Ze(e,i,At,ht,l,gt)}function Vg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ly(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],d=f.transferSize,y=f.initiatorType,U=f.duration;if(d&&U&&Vg(y)){for(y=0,U=f.responseEnd,l+=1;l<s.length;l++){var K=s[l],ft=K.startTime;if(ft>U)break;var Et=K.transferSize,At=K.initiatorType;Et&&Vg(At)&&(K=K.responseEnd,y+=Et*(K<U?1:(U-ft)/(K-ft)))}if(--l,i+=8*(d+y)/(f.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var xh=null,Sh=null;function yc(e){return e.nodeType===9?e:e.ownerDocument}function kg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Xg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function yh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Mh=null;function cy(){var e=window.event;return e&&e.type==="popstate"?e===Mh?!1:(Mh=e,!0):(Mh=null,!1)}var Wg=typeof setTimeout=="function"?setTimeout:void 0,uy=typeof clearTimeout=="function"?clearTimeout:void 0,qg=typeof Promise=="function"?Promise:void 0,fy=typeof queueMicrotask=="function"?queueMicrotask:typeof qg<"u"?function(e){return qg.resolve(null).then(e).catch(hy)}:Wg;function hy(e){setTimeout(function(){throw e})}function es(e){return e==="head"}function Yg(e,i){var s=i,l=0;do{var f=s.nextSibling;if(e.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){e.removeChild(f),Tr(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")Fo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Fo(s);for(var d=s.firstChild;d;){var y=d.nextSibling,U=d.nodeName;d[Oa]||U==="SCRIPT"||U==="STYLE"||U==="LINK"&&d.rel.toLowerCase()==="stylesheet"||s.removeChild(d),d=y}}else s==="body"&&Fo(e.ownerDocument.body);s=f}while(s);Tr(i)}function Zg(e,i){var s=e;e=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=l}while(s)}function Eh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Eh(s),Pa(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function dy(e,i,s,l){for(;e.nodeType===1;){var f=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Oa])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==f.rel||e.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||e.getAttribute("title")!==(f.title==null?null:f.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(f.src==null?null:f.src)||e.getAttribute("type")!==(f.type==null?null:f.type)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var d=f.name==null?null:""+f.name;if(f.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=wi(e.nextSibling),e===null)break}return null}function py(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=wi(e.nextSibling),e===null))return null;return e}function Kg(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=wi(e.nextSibling),e===null))return null;return e}function bh(e){return e.data==="$?"||e.data==="$~"}function Th(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function my(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function wi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Ah=null;function Jg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return wi(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function Qg(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function jg(e,i,s){switch(i=yc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Fo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);Pa(e)}var Ri=new Map,$g=new Set;function Mc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ya=P.d;P.d={f:gy,r:vy,D:_y,C:xy,L:Sy,m:yy,X:Ey,S:My,M:by};function gy(){var e=ya.f(),i=dc();return e||i}function vy(e){var i=sa(e);i!==null&&i.tag===5&&i.type==="form"?g0(i):ya.r(e)}var Mr=typeof document>"u"?null:document;function tv(e,i,s){var l=Mr;if(l&&typeof i=="string"&&i){var f=Me(i);f='link[rel="'+e+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),$g.has(f)||($g.add(f),e={rel:e,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),Nn(i,"link",e),pn(i),l.head.appendChild(i)))}}function _y(e){ya.D(e),tv("dns-prefetch",e,null)}function xy(e,i){ya.C(e,i),tv("preconnect",e,i)}function Sy(e,i,s){ya.L(e,i,s);var l=Mr;if(l&&e&&i){var f='link[rel="preload"][as="'+Me(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+Me(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+Me(s.imageSizes)+'"]')):f+='[href="'+Me(e)+'"]';var d=f;switch(i){case"style":d=Er(e);break;case"script":d=br(e)}Ri.has(d)||(e=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Ri.set(d,e),l.querySelector(f)!==null||i==="style"&&l.querySelector(Ho(d))||i==="script"&&l.querySelector(Go(d))||(i=l.createElement("link"),Nn(i,"link",e),pn(i),l.head.appendChild(i)))}}function yy(e,i){ya.m(e,i);var s=Mr;if(s&&e){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+Me(l)+'"][href="'+Me(e)+'"]',d=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=br(e)}if(!Ri.has(d)&&(e=_({rel:"modulepreload",href:e},i),Ri.set(d,e),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Go(d)))return}l=s.createElement("link"),Nn(l,"link",e),pn(l),s.head.appendChild(l)}}}function My(e,i,s){ya.S(e,i,s);var l=Mr;if(l&&e){var f=Ia(l).hoistableStyles,d=Er(e);i=i||"default";var y=f.get(d);if(!y){var U={loading:0,preload:null};if(y=l.querySelector(Ho(d)))U.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Ri.get(d))&&wh(e,s);var K=y=l.createElement("link");pn(K),Nn(K,"link",e),K._p=new Promise(function(ft,Et){K.onload=ft,K.onerror=Et}),K.addEventListener("load",function(){U.loading|=1}),K.addEventListener("error",function(){U.loading|=2}),U.loading|=4,Ec(y,i,l)}y={type:"stylesheet",instance:y,count:1,state:U},f.set(d,y)}}}function Ey(e,i){ya.X(e,i);var s=Mr;if(s&&e){var l=Ia(s).hoistableScripts,f=br(e),d=l.get(f);d||(d=s.querySelector(Go(f)),d||(e=_({src:e,async:!0},i),(i=Ri.get(f))&&Rh(e,i),d=s.createElement("script"),pn(d),Nn(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(f,d))}}function by(e,i){ya.M(e,i);var s=Mr;if(s&&e){var l=Ia(s).hoistableScripts,f=br(e),d=l.get(f);d||(d=s.querySelector(Go(f)),d||(e=_({src:e,async:!0,type:"module"},i),(i=Ri.get(f))&&Rh(e,i),d=s.createElement("script"),pn(d),Nn(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(f,d))}}function ev(e,i,s,l){var f=(f=Pt.current)?Mc(f):null;if(!f)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Er(s.href),s=Ia(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Er(s.href);var d=Ia(f).hoistableStyles,y=d.get(e);if(y||(f=f.ownerDocument||f,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=f.querySelector(Ho(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Ri.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ri.set(e,s),d||Ty(f,e,s,y.state))),i&&l===null)throw Error(a(528,""));return y}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=br(s),s=Ia(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Er(e){return'href="'+Me(e)+'"'}function Ho(e){return'link[rel="stylesheet"]['+e+"]"}function nv(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function Ty(e,i,s,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Nn(i,"link",s),pn(i),e.head.appendChild(i))}function br(e){return'[src="'+Me(e)+'"]'}function Go(e){return"script[async]"+e}function iv(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+Me(s.href)+'"]');if(l)return i.instance=l,pn(l),l;var f=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),pn(l),Nn(l,"style",f),Ec(l,s.precedence,e),i.instance=l;case"stylesheet":f=Er(s.href);var d=e.querySelector(Ho(f));if(d)return i.state.loading|=4,i.instance=d,pn(d),d;l=nv(s),(f=Ri.get(f))&&wh(l,f),d=(e.ownerDocument||e).createElement("link"),pn(d);var y=d;return y._p=new Promise(function(U,K){y.onload=U,y.onerror=K}),Nn(d,"link",l),i.state.loading|=4,Ec(d,s.precedence,e),i.instance=d;case"script":return d=br(s.src),(f=e.querySelector(Go(d)))?(i.instance=f,pn(f),f):(l=s,(f=Ri.get(d))&&(l=_({},s),Rh(l,f)),e=e.ownerDocument||e,f=e.createElement("script"),pn(f),Nn(f,"link",l),e.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Ec(l,s.precedence,e));return i.instance}function Ec(e,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,d=f,y=0;y<l.length;y++){var U=l[y];if(U.dataset.precedence===i)d=U;else if(d!==f)break}d?d.parentNode.insertBefore(e,d.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function wh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Rh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var bc=null;function av(e,i,s){if(bc===null){var l=new Map,f=bc=new Map;f.set(s,l)}else f=bc,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(e))return l;for(l.set(e,null),s=s.getElementsByTagName(e),f=0;f<s.length;f++){var d=s[f];if(!(d[Oa]||d[dn]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(i)||"";y=e+y;var U=l.get(y);U?U.push(d):l.set(y,[d])}}return l}function sv(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function Ay(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function rv(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function wy(e,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=Er(l.href),d=i.querySelector(Ho(f));if(d){i=d._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=Tc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=d,pn(d);return}d=i.ownerDocument||i,l=nv(l),(f=Ri.get(f))&&wh(l,f),d=d.createElement("link"),pn(d);var y=d;y._p=new Promise(function(U,K){y.onload=U,y.onerror=K}),Nn(d,"link",l),s.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=Tc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Ch=0;function Ry(e,i){return e.stylesheets&&e.count===0&&wc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var l=setTimeout(function(){if(e.stylesheets&&wc(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+i);0<e.imgBytes&&Ch===0&&(Ch=62500*ly());var f=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&wc(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Ch?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function Tc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)wc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ac=null;function wc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ac=new Map,i.forEach(Cy,e),Ac=null,Tc.call(e))}function Cy(e,i){if(!(i.state.loading&4)){var s=Ac.get(e);if(s)var l=s.get(null);else{s=new Map,Ac.set(e,s);for(var f=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<f.length;d++){var y=f[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(s.set(y.dataset.precedence,y),l=y)}l&&s.set(null,l)}f=i.instance,y=f.getAttribute("data-precedence"),d=s.get(y)||l,d===l&&s.set(null,f),s.set(y,f),this.count++,l=Tc.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),d?d.parentNode.insertBefore(f,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(f,e.firstChild)),i.state.loading|=4}}var Vo={$$typeof:z,Provider:null,Consumer:null,_currentValue:k,_currentValue2:k,_threadCount:0};function Dy(e,i,s,l,f,d,y,U,K){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=oe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=oe(0),this.hiddenUpdates=oe(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=K,this.incompleteTransitions=new Map}function ov(e,i,s,l,f,d,y,U,K,ft,Et,At){return e=new Dy(e,i,s,y,K,ft,Et,At,U),i=1,d===!0&&(i|=24),d=oi(3,null,null,i),e.current=d,d.stateNode=e,i=lf(),i.refCount++,e.pooledCache=i,i.refCount++,d.memoizedState={element:l,isDehydrated:s,cache:i},hf(d),e}function lv(e){return e?(e=er,e):er}function cv(e,i,s,l,f,d){f=lv(f),l.context===null?l.context=f:l.pendingContext=f,l=Xa(i),l.payload={element:s},d=d===void 0?null:d,d!==null&&(l.callback=d),s=Wa(e,l,i),s!==null&&(ni(s,e,i),So(s,e,i))}function uv(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function Dh(e,i){uv(e,i),(e=e.alternate)&&uv(e,i)}function fv(e){if(e.tag===13||e.tag===31){var i=xs(e,67108864);i!==null&&ni(i,e,67108864),Dh(e,67108864)}}function hv(e){if(e.tag===13||e.tag===31){var i=hi();i=to(i);var s=xs(e,i);s!==null&&ni(s,e,i),Dh(e,i)}}var Rc=!0;function Uy(e,i,s,l){var f=B.T;B.T=null;var d=P.p;try{P.p=2,Uh(e,i,s,l)}finally{P.p=d,B.T=f}}function Ly(e,i,s,l){var f=B.T;B.T=null;var d=P.p;try{P.p=8,Uh(e,i,s,l)}finally{P.p=d,B.T=f}}function Uh(e,i,s,l){if(Rc){var f=Lh(l);if(f===null)vh(e,i,l,Cc,s),pv(e,l);else if(Oy(f,e,i,s,l))l.stopPropagation();else if(pv(e,l),i&4&&-1<Ny.indexOf(e)){for(;f!==null;){var d=sa(f);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=Ht(d.pendingLanes);if(y!==0){var U=d;for(U.pendingLanes|=2,U.entangledLanes|=2;y;){var K=1<<31-_t(y);U.entanglements[1]|=K,y&=~K}Ki(d),(He&6)===0&&(fc=pe()+500,Io(0))}}break;case 31:case 13:U=xs(d,2),U!==null&&ni(U,d,2),dc(),Dh(d,2)}if(d=Lh(l),d===null&&vh(e,i,l,Cc,s),d===f)break;f=d}f!==null&&l.stopPropagation()}else vh(e,i,l,null,s)}}function Lh(e){return e=Nu(e),Nh(e)}var Cc=null;function Nh(e){if(Cc=null,e=aa(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=u(i),e!==null)return e;e=null}else if(s===31){if(e=h(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Cc=e,null}function dv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Se()){case G:return 2;case T:return 8;case it:case ct:return 32;case St:return 268435456;default:return 32}default:return 32}}var Oh=!1,ns=null,is=null,as=null,ko=new Map,Xo=new Map,ss=[],Ny="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function pv(e,i){switch(e){case"focusin":case"focusout":ns=null;break;case"dragenter":case"dragleave":is=null;break;case"mouseover":case"mouseout":as=null;break;case"pointerover":case"pointerout":ko.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xo.delete(i.pointerId)}}function Wo(e,i,s,l,f,d){return e===null||e.nativeEvent!==d?(e={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:d,targetContainers:[f]},i!==null&&(i=sa(i),i!==null&&fv(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),e)}function Oy(e,i,s,l,f){switch(i){case"focusin":return ns=Wo(ns,e,i,s,l,f),!0;case"dragenter":return is=Wo(is,e,i,s,l,f),!0;case"mouseover":return as=Wo(as,e,i,s,l,f),!0;case"pointerover":var d=f.pointerId;return ko.set(d,Wo(ko.get(d)||null,e,i,s,l,f)),!0;case"gotpointercapture":return d=f.pointerId,Xo.set(d,Wo(Xo.get(d)||null,e,i,s,l,f)),!0}return!1}function mv(e){var i=aa(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){e.blockedOn=i,Zs(e.priority,function(){hv(s)});return}}else if(i===31){if(i=h(s),i!==null){e.blockedOn=i,Zs(e.priority,function(){hv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Lh(e.nativeEvent);if(s===null){s=e.nativeEvent;var l=new s.constructor(s.type,s);Lu=l,s.target.dispatchEvent(l),Lu=null}else return i=sa(s),i!==null&&fv(i),e.blockedOn=s,!1;i.shift()}return!0}function gv(e,i,s){Dc(e)&&s.delete(i)}function Py(){Oh=!1,ns!==null&&Dc(ns)&&(ns=null),is!==null&&Dc(is)&&(is=null),as!==null&&Dc(as)&&(as=null),ko.forEach(gv),Xo.forEach(gv)}function Uc(e,i){e.blockedOn===i&&(e.blockedOn=null,Oh||(Oh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Py)))}var Lc=null;function vv(e){Lc!==e&&(Lc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Lc===e&&(Lc=null);for(var i=0;i<e.length;i+=3){var s=e[i],l=e[i+1],f=e[i+2];if(typeof l!="function"){if(Nh(l||s)===null)continue;break}var d=sa(s);d!==null&&(e.splice(i,3),i-=3,Lf(d,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function Tr(e){function i(K){return Uc(K,e)}ns!==null&&Uc(ns,e),is!==null&&Uc(is,e),as!==null&&Uc(as,e),ko.forEach(i),Xo.forEach(i);for(var s=0;s<ss.length;s++){var l=ss[s];l.blockedOn===e&&(l.blockedOn=null)}for(;0<ss.length&&(s=ss[0],s.blockedOn===null);)mv(s),s.blockedOn===null&&ss.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],d=s[l+1],y=f[Cn]||null;if(typeof d=="function")y||vv(s);else if(y){var U=null;if(d&&d.hasAttribute("formAction")){if(f=d,y=d[Cn]||null)U=y.formAction;else if(Nh(f)!==null)continue}else U=y.action;typeof U=="function"?s[l+1]=U:(s.splice(l,3),l-=3),vv(s)}}}function _v(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return f=y})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function Ph(e){this._internalRoot=e}Nc.prototype.render=Ph.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=hi();cv(s,l,e,i,null,null)},Nc.prototype.unmount=Ph.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;cv(e.current,2,null,e,null,null),dc(),i[Jn]=null}};function Nc(e){this._internalRoot=e}Nc.prototype.unstable_scheduleHydration=function(e){if(e){var i=no();e={blockedOn:null,target:e,priority:i};for(var s=0;s<ss.length&&i!==0&&i<ss[s].priority;s++);ss.splice(s,0,e),s===0&&mv(e)}};var xv=t.version;if(xv!=="19.2.7")throw Error(a(527,xv,"19.2.7"));P.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=p(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var Iy={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Oc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Oc.isDisabled&&Oc.supportsFiber)try{vt=Oc.inject(Iy),yt=Oc}catch{}}return Yo.createRoot=function(e,i){if(!o(e))throw Error(a(299));var s=!1,l="",f=A0,d=w0,y=R0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=ov(e,1,!1,null,null,s,l,null,f,d,y,_v),e[Jn]=i.current,gh(e),new Ph(i)},Yo.hydrateRoot=function(e,i,s){if(!o(e))throw Error(a(299));var l=!1,f="",d=A0,y=w0,U=R0,K=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(d=s.onUncaughtError),s.onCaughtError!==void 0&&(y=s.onCaughtError),s.onRecoverableError!==void 0&&(U=s.onRecoverableError),s.formState!==void 0&&(K=s.formState)),i=ov(e,1,!0,i,s??null,l,f,K,d,y,U,_v),i.context=lv(null),s=i.current,l=hi(),l=to(l),f=Xa(l),f.callback=null,Wa(s,f,l),s=l,i.current.lanes=s,$t(i,s),Ki(i),e[Jn]=i.current,gh(e),new Nc(i)},Yo.version="19.2.7",Yo}var Cv;function Zy(){if(Cv)return Bh.exports;Cv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Bh.exports=Yy(),Bh.exports}var Ky=Zy();function Jy(r){const[t,n]=qn.useState(!1);return qn.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>n(r&&!document.hidden&&!a.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(o);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),a.addEventListener("change",o),document.addEventListener("visibilitychange",o),o(),()=>{c.disconnect(),a.removeEventListener("change",o),document.removeEventListener("visibilitychange",o)}},[r]),t}function Qy(r,t,n,a){qn.useEffect(()=>{const o=t.current,c=n.current;if(!a||!o||!c)return;const u=o.closest("[data-scene-surface]")??o;let h=null;const m=_=>{if(!h||_.pointerId!==h.id)return;const v=Math.max(1,Math.min(u.clientWidth,u.clientHeight));r.drag(c,(_.clientX-h.x)/v,(_.clientY-h.y)/v)},p=_=>{!h||_&&_.pointerId!==h.id||(h=null,delete o.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p))},g=_=>{if(h||!_.isPrimary||_.button!==0)return;const v=_.target instanceof Element?_.target:null;!v||!(o.contains(v)||v.hasAttribute("data-scene-drag"))||(_.pointerType==="mouse"&&_.preventDefault(),h={id:_.pointerId,x:_.clientX,y:_.clientY},o.dataset.look="drag",window.addEventListener("pointermove",m),window.addEventListener("pointerup",p),window.addEventListener("pointercancel",p))};return u.addEventListener("pointerdown",g),()=>{u.removeEventListener("pointerdown",g),p()}},[a,r,t,n])}class jy{constructor(t){this.options=t,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null}acquire(t){return window.clearTimeout(this.disposeTimer),this.holders.push(t),this.ensureEngine(),this.attachTop(),t.onStatus(this.status),()=>this.release(t)}setRunning(t,n){t.running=n,this.top===t&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(t){}drag(t,n,a){var o,c;this.top===t&&((c=(o=this.engine)==null?void 0:o.drag)==null||c.call(o,n,a))}releaseDrag(t){var n,a;this.top===t&&((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n))}release(t){var n,a;if(this.holders=this.holders.filter(o=>o!==t),this.holders.length){this.attachTop();return}(n=this.engine)==null||n.stop(),this.observe(null),(a=this.canvas)==null||a.remove(),this.disposeTimer=window.setTimeout(()=>this.teardown(),5e3)}setStatus(t){this.status=t;for(const n of this.holders)n.onStatus(t)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const t=document.createElement("canvas");t.className=this.options.canvasClass,t.setAttribute("aria-hidden","true"),this.canvas=t;try{this.engine=this.options.create(t,()=>this.fail())}catch{this.fail();return}const n=this.engine;this.setStatus("loading"),this.configure(n),this.resize(),n.init().then(()=>{this.engine===n&&(n.renderFrame(0),this.setStatus("ready"),this.applyRunning())}).catch(()=>this.fail())}attachTop(){var n,a;const t=this.top;!t||!this.canvas||((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n),this.canvas.parentElement!==t.mount&&t.mount.appendChild(this.canvas),this.observe(t.mount),this.resize(),this.applyRunning())}observe(t){var n;this.observed!==t&&((n=this.observer)==null||n.disconnect(),this.observed=t,t&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(t)))}resize(){var o,c;const t=(o=this.top)==null?void 0:o.mount;if(!t||!this.engine)return;const n=t.clientWidth||window.innerWidth,a=t.clientHeight||window.innerHeight;this.engine.setSize(n,a,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var t;!this.engine||this.status!=="ready"||((t=this.top)!=null&&t.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}teardown(){var t,n;window.clearTimeout(this.disposeTimer),this.observe(null),(t=this.engine)==null||t.dispose(),this.engine=null,(n=this.canvas)==null||n.remove(),this.canvas=null,this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const dp="186",$y=0,Dv=1,tM=2,lu=1,V_=2,nl=3,Hs=0,Zn=1,mi=2,Ua=0,sl=1,mu=2,Uv=3,Lv=4,eM=5,Gr=100,nM=101,iM=102,aM=103,sM=104,rM=200,oM=201,lM=202,cM=203,k_=204,X_=205,uM=206,fM=207,hM=208,dM=209,pM=210,mM=211,gM=212,vM=213,_M=214,Md=0,Ed=1,bd=2,ul=3,Td=4,Ad=5,wd=6,Rd=7,pp=0,xM=1,SM=2,ta=0,W_=1,q_=2,Y_=3,mp=4,Z_=5,K_=6,J_=7,Q_=300,Gs=301,Yr=302,Vh=303,kh=304,Au=306,fl=1e3,Da=1001,Cd=1002,Pn=1003,yM=1004,Pc=1005,Fn=1006,Xh=1007,zs=1008,gi=1009,j_=1010,$_=1011,hl=1012,gp=1013,ea=1014,Hi=1015,Di=1016,vp=1017,_p=1018,dl=1020,tx=35902,ex=35899,nx=1021,ix=1022,Gi=1023,Na=1026,Bs=1027,xp=1028,Sp=1029,Vs=1030,yp=1031,Mp=1033,cu=33776,uu=33777,fu=33778,hu=33779,Dd=35840,Ud=35841,Ld=35842,Nd=35843,Od=36196,Pd=37492,Id=37496,zd=37488,Bd=37489,gu=37490,Fd=37491,Hd=37808,Gd=37809,Vd=37810,kd=37811,Xd=37812,Wd=37813,qd=37814,Yd=37815,Zd=37816,Kd=37817,Jd=37818,Qd=37819,jd=37820,$d=37821,tp=36492,ep=36494,np=36495,ip=36283,ap=36284,vu=36285,sp=36286,MM=3200,_u=0,EM=1,Ca="",Yn="srgb",xu="srgb-linear",Su="linear",Xe="srgb",Wh=7680,bM=519,TM=512,AM=513,wM=514,Ep=515,RM=516,CM=517,bp=518,DM=519,UM=35044,Nv="300 es",$i=2e3,pl=2001;function LM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function yu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function NM(){const r=yu("canvas");return r.style.display="block",r}const Ov={};function Pv(...r){const t="THREE."+r.shift();console.log(t,...r)}function ax(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function de(...r){r=ax(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...r)}}function Ne(...r){r=ax(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...r)}}function Wr(...r){const t=r.join(" ");t in Ov||(Ov[t]=!0,de(...r))}function OM(r,t,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const PM={[Md]:Ed,[bd]:wd,[Td]:Rd,[ul]:Ad,[Ed]:Md,[wd]:bd,[Rd]:Td,[Ad]:ul};class Xs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const o=a[t];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,t);t.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Iv=1234567;const rl=Math.PI/180,Zr=180/Math.PI;function Ws(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]+"-"+zn[t&255]+zn[t>>8&255]+"-"+zn[t>>16&15|64]+zn[t>>24&255]+"-"+zn[n&63|128]+zn[n>>8&255]+"-"+zn[n>>16&255]+zn[n>>24&255]+zn[a&255]+zn[a>>8&255]+zn[a>>16&255]+zn[a>>24&255]).toLowerCase()}function Te(r,t,n){return Math.max(t,Math.min(n,r))}function Tp(r,t){return(r%t+t)%t}function IM(r,t,n,a,o){return a+(r-t)*(o-a)/(n-t)}function zM(r,t,n){return r!==t?(n-r)/(t-r):0}function ol(r,t,n){return(1-n)*r+n*t}function BM(r,t,n,a){return ol(r,t,1-Math.exp(-n*a))}function FM(r,t=1){return t-Math.abs(Tp(r,t*2)-t)}function HM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function GM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function VM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function kM(r,t){return r+Math.random()*(t-r)}function XM(r){return r*(.5-Math.random())}function WM(r){r!==void 0&&(Iv=r);let t=Iv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function qM(r){return r*rl}function YM(r){return r*Zr}function ZM(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function KM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function JM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function QM(r,t,n,a,o){const c=Math.cos,u=Math.sin,h=c(n/2),m=u(n/2),p=c((t+a)/2),g=u((t+a)/2),_=c((t-a)/2),v=u((t-a)/2),x=c((a-t)/2),b=u((a-t)/2);switch(o){case"XYX":r.set(h*g,m*_,m*v,h*p);break;case"YZY":r.set(m*v,h*g,m*_,h*p);break;case"ZXZ":r.set(m*_,m*v,h*g,h*p);break;case"XZX":r.set(h*g,m*b,m*x,h*p);break;case"YXY":r.set(m*x,h*g,m*b,h*p);break;case"ZYZ":r.set(m*b,m*x,h*g,h*p);break;default:de("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Vr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ma={DEG2RAD:rl,RAD2DEG:Zr,generateUUID:Ws,clamp:Te,euclideanModulo:Tp,mapLinear:IM,inverseLerp:zM,lerp:ol,damp:BM,pingpong:FM,smoothstep:HM,smootherstep:GM,randInt:VM,randFloat:kM,randFloatSpread:XM,seededRandom:WM,degToRad:qM,radToDeg:YM,isPowerOfTwo:ZM,ceilPowerOfTwo:KM,floorPowerOfTwo:JM,setQuaternionFromProperEuler:QM,normalize:Xn,denormalize:Vr},zp=class zp{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Te(this.x,t.x,n.x),this.y=Te(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Te(this.x,t,n),this.y=Te(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Te(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(Te(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-t.x,u=this.y-t.y;return this.x=c*a-u*o+t.x,this.y=c*o+u*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};zp.prototype.isVector2=!0;let zt=zp;class qs{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,c,u,h){let m=a[o+0],p=a[o+1],g=a[o+2],_=a[o+3],v=c[u+0],x=c[u+1],b=c[u+2],D=c[u+3];if(_!==D||m!==v||p!==x||g!==b){let M=m*v+p*x+g*b+_*D;M<0&&(v=-v,x=-x,b=-b,D=-D,M=-M);let S=1-h;if(M<.9995){const I=Math.acos(M),z=Math.sin(I);S=Math.sin(S*I)/z,h=Math.sin(h*I)/z,m=m*S+v*h,p=p*S+x*h,g=g*S+b*h,_=_*S+D*h}else{m=m*S+v*h,p=p*S+x*h,g=g*S+b*h,_=_*S+D*h;const I=1/Math.sqrt(m*m+p*p+g*g+_*_);m*=I,p*=I,g*=I,_*=I}}t[n]=m,t[n+1]=p,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,o,c,u){const h=a[o],m=a[o+1],p=a[o+2],g=a[o+3],_=c[u],v=c[u+1],x=c[u+2],b=c[u+3];return t[n]=h*b+g*_+m*x-p*v,t[n+1]=m*b+g*v+p*_-h*x,t[n+2]=p*b+g*x+h*v-m*_,t[n+3]=g*b-h*_-m*v-p*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,c=t._z,u=t._order,h=Math.cos,m=Math.sin,p=h(a/2),g=h(o/2),_=h(c/2),v=m(a/2),x=m(o/2),b=m(c/2);switch(u){case"XYZ":this._x=v*g*_+p*x*b,this._y=p*x*_-v*g*b,this._z=p*g*b+v*x*_,this._w=p*g*_-v*x*b;break;case"YXZ":this._x=v*g*_+p*x*b,this._y=p*x*_-v*g*b,this._z=p*g*b-v*x*_,this._w=p*g*_+v*x*b;break;case"ZXY":this._x=v*g*_-p*x*b,this._y=p*x*_+v*g*b,this._z=p*g*b+v*x*_,this._w=p*g*_-v*x*b;break;case"ZYX":this._x=v*g*_-p*x*b,this._y=p*x*_+v*g*b,this._z=p*g*b-v*x*_,this._w=p*g*_+v*x*b;break;case"YZX":this._x=v*g*_+p*x*b,this._y=p*x*_+v*g*b,this._z=p*g*b-v*x*_,this._w=p*g*_-v*x*b;break;case"XZY":this._x=v*g*_-p*x*b,this._y=p*x*_-v*g*b,this._z=p*g*b+v*x*_,this._w=p*g*_+v*x*b;break;default:de("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],c=n[8],u=n[1],h=n[5],m=n[9],p=n[2],g=n[6],_=n[10],v=a+h+_;if(v>0){const x=.5/Math.sqrt(v+1);this._w=.25/x,this._x=(g-m)*x,this._y=(c-p)*x,this._z=(u-o)*x}else if(a>h&&a>_){const x=2*Math.sqrt(1+a-h-_);this._w=(g-m)/x,this._x=.25*x,this._y=(o+u)/x,this._z=(c+p)/x}else if(h>_){const x=2*Math.sqrt(1+h-a-_);this._w=(c-p)/x,this._x=(o+u)/x,this._y=.25*x,this._z=(m+g)/x}else{const x=2*Math.sqrt(1+_-a-h);this._w=(u-o)/x,this._x=(c+p)/x,this._y=(m+g)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,c=t._z,u=t._w,h=n._x,m=n._y,p=n._z,g=n._w;return this._x=a*g+u*h+o*p-c*m,this._y=o*g+u*m+c*h-a*p,this._z=c*g+u*p+a*m-o*h,this._w=u*g-a*h-o*m-c*p,this._onChangeCallback(),this}slerp(t,n){let a=t._x,o=t._y,c=t._z,u=t._w,h=this.dot(t);h<0&&(a=-a,o=-o,c=-c,u=-u,h=-h);let m=1-n;if(h<.9995){const p=Math.acos(h),g=Math.sin(p);m=Math.sin(m*p)/g,n=Math.sin(n*p)/g,this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this._onChangeCallback()}else this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Bp=class Bp{constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(zv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(zv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=t.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,c=t.x,u=t.y,h=t.z,m=t.w,p=2*(u*o-h*a),g=2*(h*n-c*o),_=2*(c*a-u*n);return this.x=n+m*p+u*_-h*g,this.y=a+m*g+h*p-c*_,this.z=o+m*_+c*g-u*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Te(this.x,t.x,n.x),this.y=Te(this.y,t.y,n.y),this.z=Te(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Te(this.x,t,n),this.y=Te(this.y,t,n),this.z=Te(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Te(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,c=t.z,u=n.x,h=n.y,m=n.z;return this.x=o*m-c*h,this.y=c*u-a*m,this.z=a*h-o*u,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return qh.copy(this).projectOnVector(t),this.sub(qh)}reflect(t){return this.sub(qh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(Te(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Bp.prototype.isVector3=!0;let Z=Bp;const qh=new Z,zv=new qs,Fp=class Fp{constructor(t,n,a,o,c,u,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,h,m,p)}set(t,n,a,o,c,u,h,m,p){const g=this.elements;return g[0]=t,g[1]=o,g[2]=h,g[3]=n,g[4]=c,g[5]=m,g[6]=a,g[7]=u,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],h=a[3],m=a[6],p=a[1],g=a[4],_=a[7],v=a[2],x=a[5],b=a[8],D=o[0],M=o[3],S=o[6],I=o[1],z=o[4],A=o[7],O=o[2],w=o[5],N=o[8];return c[0]=u*D+h*I+m*O,c[3]=u*M+h*z+m*w,c[6]=u*S+h*A+m*N,c[1]=p*D+g*I+_*O,c[4]=p*M+g*z+_*w,c[7]=p*S+g*A+_*N,c[2]=v*D+x*I+b*O,c[5]=v*M+x*z+b*w,c[8]=v*S+x*A+b*N,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],p=t[7],g=t[8];return n*u*g-n*h*p-a*c*g+a*h*m+o*c*p-o*u*m}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],p=t[7],g=t[8],_=g*u-h*p,v=h*m-g*c,x=p*c-u*m,b=n*_+a*v+o*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/b;return t[0]=_*D,t[1]=(o*p-g*a)*D,t[2]=(h*a-o*u)*D,t[3]=v*D,t[4]=(g*n-o*m)*D,t[5]=(o*c-h*n)*D,t[6]=x*D,t[7]=(a*m-p*n)*D,t[8]=(u*n-a*c)*D,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,c,u,h){const m=Math.cos(c),p=Math.sin(c);return this.set(a*m,a*p,-a*(m*u+p*h)+u+t,-o*p,o*m,-o*(-p*u+m*h)+h+n,0,0,1),this}scale(t,n){return Wr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Yh.makeScale(t,n)),this}rotate(t){return Wr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Yh.makeRotation(-t)),this}translate(t,n){return Wr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Yh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Fp.prototype.isMatrix3=!0;let ge=Fp;const Yh=new ge,Bv=new ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fv=new ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jM(){const r={enabled:!0,workingColorSpace:xu,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===Xe&&(o.r=La(o.r),o.g=La(o.g),o.b=La(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Xe&&(o.r=qr(o.r),o.g=qr(o.g),o.b=qr(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Ca?Su:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return Wr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return Wr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[xu]:{primaries:t,whitePoint:a,transfer:Su,toXYZ:Bv,fromXYZ:Fv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Yn},outputColorSpaceConfig:{drawingBufferColorSpace:Yn}},[Yn]:{primaries:t,whitePoint:a,transfer:Xe,toXYZ:Bv,fromXYZ:Fv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Yn}}}),r}const Le=jM();function La(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function qr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ar;class $M{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Ar===void 0&&(Ar=yu("canvas")),Ar.width=t.width,Ar.height=t.height;const o=Ar.getContext("2d");t instanceof ImageData?o.putImageData(t,0,0):o.drawImage(t,0,0,t.width,t.height),a=Ar}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=yu("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=La(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(La(n[a]/255)*255):n[a]=La(n[a]);return{data:n,width:t.width,height:t.height}}else return de("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let t1=0;class Ap{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:t1++}),this.uuid=Ws(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,h=o.length;u<h;u++)o[u].isDataTexture?c.push(Zh(o[u].image)):c.push(Zh(o[u]))}else c=Zh(o);a.url=c}return n||(t.images[this.uuid]=a),a}}function Zh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?$M.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(de("Texture: Unable to serialize Texture."),{})}let e1=0;const Kh=new Z;class Hn extends Xs{constructor(t=Hn.DEFAULT_IMAGE,n=Hn.DEFAULT_MAPPING,a=Da,o=Da,c=Fn,u=zs,h=Gi,m=gi,p=Hn.DEFAULT_ANISOTROPY,g=Ca){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:e1++}),this.uuid=Ws(),this.name="",this.source=new Ap(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kh).x}get height(){return this.source.getSize(Kh).y}get depth(){return this.source.getSize(Kh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){de(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){de(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Q_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fl:t.x=t.x-Math.floor(t.x);break;case Da:t.x=t.x<0?0:1;break;case Cd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fl:t.y=t.y-Math.floor(t.y);break;case Da:t.y=t.y<0?0:1;break;case Cd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Hn.DEFAULT_IMAGE=null;Hn.DEFAULT_MAPPING=Q_;Hn.DEFAULT_ANISOTROPY=1;const Hp=class Hp{constructor(t=0,n=0,a=0,o=1){this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=this.w,u=t.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,c;const m=t.elements,p=m[0],g=m[4],_=m[8],v=m[1],x=m[5],b=m[9],D=m[2],M=m[6],S=m[10];if(Math.abs(g-v)<.01&&Math.abs(_-D)<.01&&Math.abs(b-M)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+D)<.1&&Math.abs(b+M)<.1&&Math.abs(p+x+S-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const z=(p+1)/2,A=(x+1)/2,O=(S+1)/2,w=(g+v)/4,N=(_+D)/4,E=(b+M)/4;return z>A&&z>O?z<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(z),o=w/a,c=N/a):A>O?A<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(A),a=w/o,c=E/o):O<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(O),a=N/c,o=E/c),this.set(a,o,c,n),this}let I=Math.sqrt((M-b)*(M-b)+(_-D)*(_-D)+(v-g)*(v-g));return Math.abs(I)<.001&&(I=1),this.x=(M-b)/I,this.y=(_-D)/I,this.z=(v-g)/I,this.w=Math.acos((p+x+S-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Te(this.x,t.x,n.x),this.y=Te(this.y,t.y,n.y),this.z=Te(this.z,t.z,n.z),this.w=Te(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Te(this.x,t,n),this.y=Te(this.y,t,n),this.z=Te(this.z,t,n),this.w=Te(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Te(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Hp.prototype.isVector4=!0;let nn=Hp;class n1 extends Xs{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new nn(0,0,t,n),this.scissorTest=!1,this.viewport=new nn(0,0,t,n),this.textures=[];const o={width:t,height:n,depth:a.depth},c=new Hn(o),u=a.count;for(let h=0;h<u;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},t.textures[n].image);this.textures[n].source=new Ap(o)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends n1{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class sx extends Hn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class i1 extends Hn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Tu=class Tu{constructor(t,n,a,o,c,u,h,m,p,g,_,v,x,b,D,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,h,m,p,g,_,v,x,b,D,M)}set(t,n,a,o,c,u,h,m,p,g,_,v,x,b,D,M){const S=this.elements;return S[0]=t,S[4]=n,S[8]=a,S[12]=o,S[1]=c,S[5]=u,S[9]=h,S[13]=m,S[2]=p,S[6]=g,S[10]=_,S[14]=v,S[3]=x,S[7]=b,S[11]=D,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Tu().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,o=1/wr.setFromMatrixColumn(t,0).length(),c=1/wr.setFromMatrixColumn(t,1).length(),u=1/wr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,c=t.z,u=Math.cos(a),h=Math.sin(a),m=Math.cos(o),p=Math.sin(o),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const v=u*g,x=u*_,b=h*g,D=h*_;n[0]=m*g,n[4]=-m*_,n[8]=p,n[1]=x+b*p,n[5]=v-D*p,n[9]=-h*m,n[2]=D-v*p,n[6]=b+x*p,n[10]=u*m}else if(t.order==="YXZ"){const v=m*g,x=m*_,b=p*g,D=p*_;n[0]=v+D*h,n[4]=b*h-x,n[8]=u*p,n[1]=u*_,n[5]=u*g,n[9]=-h,n[2]=x*h-b,n[6]=D+v*h,n[10]=u*m}else if(t.order==="ZXY"){const v=m*g,x=m*_,b=p*g,D=p*_;n[0]=v-D*h,n[4]=-u*_,n[8]=b+x*h,n[1]=x+b*h,n[5]=u*g,n[9]=D-v*h,n[2]=-u*p,n[6]=h,n[10]=u*m}else if(t.order==="ZYX"){const v=u*g,x=u*_,b=h*g,D=h*_;n[0]=m*g,n[4]=b*p-x,n[8]=v*p+D,n[1]=m*_,n[5]=D*p+v,n[9]=x*p-b,n[2]=-p,n[6]=h*m,n[10]=u*m}else if(t.order==="YZX"){const v=u*m,x=u*p,b=h*m,D=h*p;n[0]=m*g,n[4]=D-v*_,n[8]=b*_+x,n[1]=_,n[5]=u*g,n[9]=-h*g,n[2]=-p*g,n[6]=x*_+b,n[10]=v-D*_}else if(t.order==="XZY"){const v=u*m,x=u*p,b=h*m,D=h*p;n[0]=m*g,n[4]=-_,n[8]=p*g,n[1]=v*_+D,n[5]=u*g,n[9]=x*_-b,n[2]=b*_-x,n[6]=h*g,n[10]=D*_+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(a1,t,s1)}lookAt(t,n,a){const o=this.elements;return di.subVectors(t,n),di.lengthSq()===0&&(di.z=1),di.normalize(),os.crossVectors(a,di),os.lengthSq()===0&&(Math.abs(a.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),os.crossVectors(a,di)),os.normalize(),Ic.crossVectors(di,os),o[0]=os.x,o[4]=Ic.x,o[8]=di.x,o[1]=os.y,o[5]=Ic.y,o[9]=di.y,o[2]=os.z,o[6]=Ic.z,o[10]=di.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],h=a[4],m=a[8],p=a[12],g=a[1],_=a[5],v=a[9],x=a[13],b=a[2],D=a[6],M=a[10],S=a[14],I=a[3],z=a[7],A=a[11],O=a[15],w=o[0],N=o[4],E=o[8],L=o[12],H=o[1],W=o[5],Y=o[9],j=o[13],F=o[2],q=o[6],B=o[10],P=o[14],k=o[3],V=o[7],X=o[11],R=o[15];return c[0]=u*w+h*H+m*F+p*k,c[4]=u*N+h*W+m*q+p*V,c[8]=u*E+h*Y+m*B+p*X,c[12]=u*L+h*j+m*P+p*R,c[1]=g*w+_*H+v*F+x*k,c[5]=g*N+_*W+v*q+x*V,c[9]=g*E+_*Y+v*B+x*X,c[13]=g*L+_*j+v*P+x*R,c[2]=b*w+D*H+M*F+S*k,c[6]=b*N+D*W+M*q+S*V,c[10]=b*E+D*Y+M*B+S*X,c[14]=b*L+D*j+M*P+S*R,c[3]=I*w+z*H+A*F+O*k,c[7]=I*N+z*W+A*q+O*V,c[11]=I*E+z*Y+A*B+O*X,c[15]=I*L+z*j+A*P+O*R,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[12],u=t[1],h=t[5],m=t[9],p=t[13],g=t[2],_=t[6],v=t[10],x=t[14],b=t[3],D=t[7],M=t[11],S=t[15],I=m*x-p*v,z=h*x-p*_,A=h*v-m*_,O=u*x-p*g,w=u*v-m*g,N=u*_-h*g;return n*(D*I-M*z+S*A)-a*(b*I-M*O+S*w)+o*(b*z-D*O+S*N)-c*(b*A-D*w+M*N)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[1],u=t[5],h=t[9],m=t[2],p=t[6],g=t[10];return n*(u*g-h*p)-a*(c*g-h*m)+o*(c*p-u*m)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],p=t[7],g=t[8],_=t[9],v=t[10],x=t[11],b=t[12],D=t[13],M=t[14],S=t[15],I=n*h-a*u,z=n*m-o*u,A=n*p-c*u,O=a*m-o*h,w=a*p-c*h,N=o*p-c*m,E=g*D-_*b,L=g*M-v*b,H=g*S-x*b,W=_*M-v*D,Y=_*S-x*D,j=v*S-x*M,F=I*j-z*Y+A*W+O*H-w*L+N*E;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const q=1/F;return t[0]=(h*j-m*Y+p*W)*q,t[1]=(o*Y-a*j-c*W)*q,t[2]=(D*N-M*w+S*O)*q,t[3]=(v*w-_*N-x*O)*q,t[4]=(m*H-u*j-p*L)*q,t[5]=(n*j-o*H+c*L)*q,t[6]=(M*A-b*N-S*z)*q,t[7]=(g*N-v*A+x*z)*q,t[8]=(u*Y-h*H+p*E)*q,t[9]=(a*H-n*Y-c*E)*q,t[10]=(b*w-D*A+S*I)*q,t[11]=(_*A-g*w-x*I)*q,t[12]=(h*L-u*W-m*E)*q,t[13]=(n*W-a*L+o*E)*q,t[14]=(D*z-b*O-M*I)*q,t[15]=(g*O-_*z+v*I)*q,this}scale(t){const n=this.elements,a=t.x,o=t.y,c=t.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=t.x,h=t.y,m=t.z,p=c*u,g=c*h;return this.set(p*u+a,p*h-o*m,p*m+o*h,0,p*h+o*m,g*h+a,g*m-o*u,0,p*m-o*h,g*m+o*u,c*m*m+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,c,u){return this.set(1,a,c,0,t,1,u,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,c=n._x,u=n._y,h=n._z,m=n._w,p=c+c,g=u+u,_=h+h,v=c*p,x=c*g,b=c*_,D=u*g,M=u*_,S=h*_,I=m*p,z=m*g,A=m*_,O=a.x,w=a.y,N=a.z;return o[0]=(1-(D+S))*O,o[1]=(x+A)*O,o[2]=(b-z)*O,o[3]=0,o[4]=(x-A)*w,o[5]=(1-(v+S))*w,o[6]=(M+I)*w,o[7]=0,o[8]=(b+z)*N,o[9]=(M-I)*N,o[10]=(1-(v+D))*N,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;t.x=o[12],t.y=o[13],t.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=wr.set(o[0],o[1],o[2]).length();const h=wr.set(o[4],o[5],o[6]).length(),m=wr.set(o[8],o[9],o[10]).length();c<0&&(u=-u),Ii.copy(this);const p=1/u,g=1/h,_=1/m;return Ii.elements[0]*=p,Ii.elements[1]*=p,Ii.elements[2]*=p,Ii.elements[4]*=g,Ii.elements[5]*=g,Ii.elements[6]*=g,Ii.elements[8]*=_,Ii.elements[9]*=_,Ii.elements[10]*=_,n.setFromRotationMatrix(Ii),a.x=u,a.y=h,a.z=m,this}makePerspective(t,n,a,o,c,u,h=$i,m=!1){const p=this.elements,g=2*c/(n-t),_=2*c/(a-o),v=(n+t)/(n-t),x=(a+o)/(a-o);let b,D;if(m)b=c/(u-c),D=u*c/(u-c);else if(h===$i)b=-(u+c)/(u-c),D=-2*u*c/(u-c);else if(h===pl)b=-u/(u-c),D=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=g,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=_,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=b,p[14]=D,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,o,c,u,h=$i,m=!1){const p=this.elements,g=2/(n-t),_=2/(a-o),v=-(n+t)/(n-t),x=-(a+o)/(a-o);let b,D;if(m)b=1/(u-c),D=u/(u-c);else if(h===$i)b=-2/(u-c),D=-(u+c)/(u-c);else if(h===pl)b=-1/(u-c),D=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=g,p[4]=0,p[8]=0,p[12]=v,p[1]=0,p[5]=_,p[9]=0,p[13]=x,p[2]=0,p[6]=0,p[10]=b,p[14]=D,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}};Tu.prototype.isMatrix4=!0;let Ge=Tu;const wr=new Z,Ii=new Ge,a1=new Z(0,0,0),s1=new Z(1,1,1),os=new Z,Ic=new Z,di=new Z,Hv=new Ge,Gv=new qs;class na{constructor(t=0,n=0,a=0,o=na.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,c=o[0],u=o[4],h=o[8],m=o[1],p=o[5],g=o[9],_=o[2],v=o[6],x=o[10];switch(n){case"XYZ":this._y=Math.asin(Te(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,x),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(v,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,x),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(Te(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,x),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Te(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(Te(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,x));break;case"XZY":this._z=Math.asin(-Te(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(v,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-g,x),this._y=0);break;default:de("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return Hv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Hv,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Gv.setFromEuler(this),this.setFromQuaternion(Gv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}na.DEFAULT_ORDER="XYZ";class wp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let r1=0;const Vv=new Z,Rr=new qs,Ea=new Ge,zc=new Z,Zo=new Z,o1=new Z,l1=new qs,kv=new Z(1,0,0),Xv=new Z(0,1,0),Wv=new Z(0,0,1),qv={type:"added"},c1={type:"removed"},Cr={type:"childadded",child:null},Jh={type:"childremoved",child:null};class hn extends Xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:r1++}),this.uuid=Ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hn.DEFAULT_UP.clone();const t=new Z,n=new na,a=new qs,o=new Z(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ge},normalMatrix:{value:new ge}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=hn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Rr.setFromAxisAngle(t,n),this.quaternion.multiply(Rr),this}rotateOnWorldAxis(t,n){return Rr.setFromAxisAngle(t,n),this.quaternion.premultiply(Rr),this}rotateX(t){return this.rotateOnAxis(kv,t)}rotateY(t){return this.rotateOnAxis(Xv,t)}rotateZ(t){return this.rotateOnAxis(Wv,t)}translateOnAxis(t,n){return Vv.copy(t).applyQuaternion(this.quaternion),this.position.add(Vv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(kv,t)}translateY(t){return this.translateOnAxis(Xv,t)}translateZ(t){return this.translateOnAxis(Wv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ea.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?zc.copy(t):zc.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),Zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ea.lookAt(Zo,zc,this.up):Ea.lookAt(zc,Zo,this.up),this.quaternion.setFromRotationMatrix(Ea),o&&(Ea.extractRotation(o.matrixWorld),Rr.setFromRotationMatrix(Ea),this.quaternion.premultiply(Rr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(qv),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(c1),Jh.child=t,this.dispatchEvent(Jh),Jh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ea.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ea.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ea),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(qv),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(t,n);if(u!==void 0)return u}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,t,o1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,l1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,o=t.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const o=this.parent;if(t===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,h=c.length;u<h;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const _=m[p];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(t.materials,this.material[m]));o.material=h}else o.material=c(t.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];o.animations.push(c(t.animations,m))}}if(n){const h=u(t.geometries),m=u(t.materials),p=u(t.textures),g=u(t.images),_=u(t.shapes),v=u(t.skeletons),x=u(t.animations),b=u(t.nodes);h.length>0&&(a.geometries=h),m.length>0&&(a.materials=m),p.length>0&&(a.textures=p),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),v.length>0&&(a.skeletons=v),x.length>0&&(a.animations=x),b.length>0&&(a.nodes=b)}return a.object=o,a;function u(h){const m=[];for(const p in h){const g=h[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}hn.DEFAULT_UP=new Z(0,1,0);hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class On extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const u1={type:"move"};class Qh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new On,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new On,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new On,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,c=null,u=null;const h=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){u=!0;for(const D of t.hand.values()){const M=n.getJointPose(D,a),S=this._getHandJoint(p,D);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],v=g.position.distanceTo(_.position),x=.02,b=.005;p.inputState.pinching&&v>x+b?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&v<=x-b&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));h!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(u1)))}return h!==null&&(h.visible=o!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new On;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const rx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ls={h:0,s:0,l:0},Bc={h:0,s:0,l:0};function jh(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class ve{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Yn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Le.colorSpaceToWorking(this,n),this}setRGB(t,n,a,o=Le.workingColorSpace){return this.r=t,this.g=n,this.b=a,Le.colorSpaceToWorking(this,o),this}setHSL(t,n,a,o=Le.workingColorSpace){if(t=Tp(t,1),n=Te(n,0,1),a=Te(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=jh(u,c,t+1/3),this.g=jh(u,c,t),this.b=jh(u,c,t-1/3)}return Le.colorSpaceToWorking(this,o),this}setStyle(t,n=Yn){function a(c){c!==void 0&&parseFloat(c)<1&&de("Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const u=o[1],h=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:de("Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);de("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Yn){const a=rx[t.toLowerCase()];return a!==void 0?this.setHex(a,n):de("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=La(t.r),this.g=La(t.g),this.b=La(t.b),this}copyLinearToSRGB(t){return this.r=qr(t.r),this.g=qr(t.g),this.b=qr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Yn){return Le.workingToColorSpace(Bn.copy(this),t),Math.round(Te(Bn.r*255,0,255))*65536+Math.round(Te(Bn.g*255,0,255))*256+Math.round(Te(Bn.b*255,0,255))}getHexString(t=Yn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Le.workingColorSpace){Le.workingToColorSpace(Bn.copy(this),n);const a=Bn.r,o=Bn.g,c=Bn.b,u=Math.max(a,o,c),h=Math.min(a,o,c);let m,p;const g=(h+u)/2;if(h===u)m=0,p=0;else{const _=u-h;switch(p=g<=.5?_/(u+h):_/(2-u-h),u){case a:m=(o-c)/_+(o<c?6:0);break;case o:m=(c-a)/_+2;break;case c:m=(a-o)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,n=Le.workingColorSpace){return Le.workingToColorSpace(Bn.copy(this),n),t.r=Bn.r,t.g=Bn.g,t.b=Bn.b,t}getStyle(t=Yn){Le.workingToColorSpace(Bn.copy(this),t);const n=Bn.r,a=Bn.g,o=Bn.b;return t!==Yn?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(ls),this.setHSL(ls.h+t,ls.s+n,ls.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(ls),t.getHSL(Bc);const a=ol(ls.h,Bc.h,n),o=ol(ls.s,Bc.s,n),c=ol(ls.l,Bc.l,n);return this.setHSL(a,o,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new ve;ve.NAMES=rx;class Rp{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new ve(t),this.density=n}clone(){return new Rp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ox extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new na,this.environmentIntensity=1,this.environmentRotation=new na,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const zi=new Z,ba=new Z,$h=new Z,Ta=new Z,Dr=new Z,Ur=new Z,Yv=new Z,td=new Z,ed=new Z,nd=new Z,id=new nn,ad=new nn,sd=new nn;class Fi{constructor(t=new Z,n=new Z,a=new Z){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),zi.subVectors(t,n),o.cross(zi);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(t,n,a,o,c){zi.subVectors(o,n),ba.subVectors(a,n),$h.subVectors(t,n);const u=zi.dot(zi),h=zi.dot(ba),m=zi.dot($h),p=ba.dot(ba),g=ba.dot($h),_=u*p-h*h;if(_===0)return c.set(0,0,0),null;const v=1/_,x=(p*m-h*g)*v,b=(u*g-h*m)*v;return c.set(1-x-b,b,x)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,Ta)===null?!1:Ta.x>=0&&Ta.y>=0&&Ta.x+Ta.y<=1}static getInterpolation(t,n,a,o,c,u,h,m){return this.getBarycoord(t,n,a,o,Ta)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Ta.x),m.addScaledVector(u,Ta.y),m.addScaledVector(h,Ta.z),m)}static getInterpolatedAttribute(t,n,a,o,c,u){return id.setScalar(0),ad.setScalar(0),sd.setScalar(0),id.fromBufferAttribute(t,n),ad.fromBufferAttribute(t,a),sd.fromBufferAttribute(t,o),u.setScalar(0),u.addScaledVector(id,c.x),u.addScaledVector(ad,c.y),u.addScaledVector(sd,c.z),u}static isFrontFacing(t,n,a,o){return zi.subVectors(a,n),ba.subVectors(t,n),zi.cross(ba).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zi.subVectors(this.c,this.b),ba.subVectors(this.a,this.b),zi.cross(ba).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Fi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Fi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,c){return Fi.getInterpolation(t,this.a,this.b,this.c,n,a,o,c)}containsPoint(t){return Fi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Fi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,c=this.c;let u,h;Dr.subVectors(o,a),Ur.subVectors(c,a),td.subVectors(t,a);const m=Dr.dot(td),p=Ur.dot(td);if(m<=0&&p<=0)return n.copy(a);ed.subVectors(t,o);const g=Dr.dot(ed),_=Ur.dot(ed);if(g>=0&&_<=g)return n.copy(o);const v=m*_-g*p;if(v<=0&&m>=0&&g<=0)return u=m/(m-g),n.copy(a).addScaledVector(Dr,u);nd.subVectors(t,c);const x=Dr.dot(nd),b=Ur.dot(nd);if(b>=0&&x<=b)return n.copy(c);const D=x*p-m*b;if(D<=0&&p>=0&&b<=0)return h=p/(p-b),n.copy(a).addScaledVector(Ur,h);const M=g*b-x*_;if(M<=0&&_-g>=0&&x-b>=0)return Yv.subVectors(c,o),h=(_-g)/(_-g+(x-b)),n.copy(o).addScaledVector(Yv,h);const S=1/(M+D+v);return u=D*S,h=v*S,n.copy(a).addScaledVector(Dr,u).addScaledVector(Ur,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ys{constructor(t=new Z(1/0,1/0,1/0),n=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Bi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Bi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Bi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let u=0,h=c.count;u<h;u++)t.isMesh===!0?t.getVertexPosition(u,Bi):Bi.fromBufferAttribute(c,u),Bi.applyMatrix4(t.matrixWorld),this.expandByPoint(Bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Fc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Fc.copy(a.boundingBox)),Fc.applyMatrix4(t.matrixWorld),this.union(Fc)}const o=t.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bi),Bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ko),Hc.subVectors(this.max,Ko),Lr.subVectors(t.a,Ko),Nr.subVectors(t.b,Ko),Or.subVectors(t.c,Ko),cs.subVectors(Nr,Lr),us.subVectors(Or,Nr),Ls.subVectors(Lr,Or);let n=[0,-cs.z,cs.y,0,-us.z,us.y,0,-Ls.z,Ls.y,cs.z,0,-cs.x,us.z,0,-us.x,Ls.z,0,-Ls.x,-cs.y,cs.x,0,-us.y,us.x,0,-Ls.y,Ls.x,0];return!rd(n,Lr,Nr,Or,Hc)||(n=[1,0,0,0,1,0,0,0,1],!rd(n,Lr,Nr,Or,Hc))?!1:(Gc.crossVectors(cs,us),n=[Gc.x,Gc.y,Gc.z],rd(n,Lr,Nr,Or,Hc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Aa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Aa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Aa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Aa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Aa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Aa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Aa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Aa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Aa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Aa=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],Bi=new Z,Fc=new Ys,Lr=new Z,Nr=new Z,Or=new Z,cs=new Z,us=new Z,Ls=new Z,Ko=new Z,Hc=new Z,Gc=new Z,Ns=new Z;function rd(r,t,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){Ns.fromArray(r,c);const h=o.x*Math.abs(Ns.x)+o.y*Math.abs(Ns.y)+o.z*Math.abs(Ns.z),m=t.dot(Ns),p=n.dot(Ns),g=a.dot(Ns);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>h)return!1}return!0}const Sn=new Z,Vc=new zt;let f1=0;class Vi extends Xs{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:f1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=UM,this.updateRanges=[],this.gpuType=Hi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Vc.fromBufferAttribute(this,n),Vc.applyMatrix3(t),this.setXY(n,Vc.x,Vc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)Sn.fromBufferAttribute(this,n),Sn.applyMatrix3(t),this.setXYZ(n,Sn.x,Sn.y,Sn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)Sn.fromBufferAttribute(this,n),Sn.applyMatrix4(t),this.setXYZ(n,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)Sn.fromBufferAttribute(this,n),Sn.applyNormalMatrix(t),this.setXYZ(n,Sn.x,Sn.y,Sn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)Sn.fromBufferAttribute(this,n),Sn.transformDirection(t),this.setXYZ(n,Sn.x,Sn.y,Sn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=Vr(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=Xn(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Vr(n,this.array)),n}setX(t,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Vr(n,this.array)),n}setY(t,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Vr(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Vr(n,this.array)),n}setW(t,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=Xn(n,this.array),a=Xn(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=Xn(n,this.array),a=Xn(a,this.array),o=Xn(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t*=this.itemSize,this.normalized&&(n=Xn(n,this.array),a=Xn(a,this.array),o=Xn(o,this.array),c=Xn(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class lx extends Vi{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class cx extends Vi{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class Oe extends Vi{constructor(t,n,a){super(new Float32Array(t),n,a)}}const h1=new Ys,Jo=new Z,od=new Z;class yl{constructor(t=new Z,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):h1.setFromPoints(t).getCenter(a);let o=0;for(let c=0,u=t.length;c<u;c++)o=Math.max(o,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Jo.subVectors(t,this.center);const n=Jo.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(Jo,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(od.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Jo.copy(t.center).add(od)),this.expandByPoint(Jo.copy(t.center).sub(od))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let d1=0;const Ci=new Ge,ld=new hn,Pr=new Z,pi=new Ys,Qo=new Ys,wn=new Z;class Tn extends Xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:d1++}),this.uuid=Ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(LM(t)?cx:lx)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new ge().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ci.makeRotationFromQuaternion(t),this.applyMatrix4(Ci),this}rotateX(t){return Ci.makeRotationX(t),this.applyMatrix4(Ci),this}rotateY(t){return Ci.makeRotationY(t),this.applyMatrix4(Ci),this}rotateZ(t){return Ci.makeRotationZ(t),this.applyMatrix4(Ci),this}translate(t,n,a){return Ci.makeTranslation(t,n,a),this.applyMatrix4(Ci),this}scale(t,n,a){return Ci.makeScale(t,n,a),this.applyMatrix4(Ci),this}lookAt(t){return ld.lookAt(t),ld.updateMatrix(),this.applyMatrix4(ld.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=t.length;o<c;o++){const u=t[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Oe(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const c=t[o];n.setXYZ(o,c.x,c.y,c.z||0)}t.length>n.count&&de("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ys);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];pi.setFromBufferAttribute(c),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,pi.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,pi.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(pi.min),this.boundingBox.expandByPoint(pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(t){const a=this.boundingSphere.center;if(pi.setFromBufferAttribute(t),n)for(let c=0,u=n.length;c<u;c++){const h=n[c];Qo.setFromBufferAttribute(h),this.morphTargetsRelative?(wn.addVectors(pi.min,Qo.min),pi.expandByPoint(wn),wn.addVectors(pi.max,Qo.max),pi.expandByPoint(wn)):(pi.expandByPoint(Qo.min),pi.expandByPoint(Qo.max))}pi.getCenter(a);let o=0;for(let c=0,u=t.count;c<u;c++)wn.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(wn));if(n)for(let c=0,u=n.length;c<u;c++){const h=n[c],m=this.morphTargetsRelative;for(let p=0,g=h.count;p<g;p++)wn.fromBufferAttribute(h,p),m&&(Pr.fromBufferAttribute(t,p),wn.add(Pr)),o=Math.max(o,a.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new Vi(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const h=[],m=[];for(let E=0;E<a.count;E++)h[E]=new Z,m[E]=new Z;const p=new Z,g=new Z,_=new Z,v=new zt,x=new zt,b=new zt,D=new Z,M=new Z;function S(E,L,H){p.fromBufferAttribute(a,E),g.fromBufferAttribute(a,L),_.fromBufferAttribute(a,H),v.fromBufferAttribute(c,E),x.fromBufferAttribute(c,L),b.fromBufferAttribute(c,H),g.sub(p),_.sub(p),x.sub(v),b.sub(v);const W=1/(x.x*b.y-b.x*x.y);isFinite(W)&&(D.copy(g).multiplyScalar(b.y).addScaledVector(_,-x.y).multiplyScalar(W),M.copy(_).multiplyScalar(x.x).addScaledVector(g,-b.x).multiplyScalar(W),h[E].add(D),h[L].add(D),h[H].add(D),m[E].add(M),m[L].add(M),m[H].add(M))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let E=0,L=I.length;E<L;++E){const H=I[E],W=H.start,Y=H.count;for(let j=W,F=W+Y;j<F;j+=3)S(t.getX(j+0),t.getX(j+1),t.getX(j+2))}const z=new Z,A=new Z,O=new Z,w=new Z;function N(E){O.fromBufferAttribute(o,E),w.copy(O);const L=h[E];z.copy(L),z.sub(O.multiplyScalar(O.dot(L))).normalize(),A.crossVectors(w,L);const W=A.dot(m[E])<0?-1:1;u.setXYZW(E,z.x,z.y,z.z,W)}for(let E=0,L=I.length;E<L;++E){const H=I[E],W=H.start,Y=H.count;for(let j=W,F=W+Y;j<F;j+=3)N(t.getX(j+0)),N(t.getX(j+1)),N(t.getX(j+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new Vi(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let v=0,x=a.count;v<x;v++)a.setXYZ(v,0,0,0);const o=new Z,c=new Z,u=new Z,h=new Z,m=new Z,p=new Z,g=new Z,_=new Z;if(t)for(let v=0,x=t.count;v<x;v+=3){const b=t.getX(v+0),D=t.getX(v+1),M=t.getX(v+2);o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,M),g.subVectors(u,c),_.subVectors(o,c),g.cross(_),h.fromBufferAttribute(a,b),m.fromBufferAttribute(a,D),p.fromBufferAttribute(a,M),h.add(g),m.add(g),p.add(g),a.setXYZ(b,h.x,h.y,h.z),a.setXYZ(D,m.x,m.y,m.z),a.setXYZ(M,p.x,p.y,p.z)}else for(let v=0,x=n.count;v<x;v+=3)o.fromBufferAttribute(n,v+0),c.fromBufferAttribute(n,v+1),u.fromBufferAttribute(n,v+2),g.subVectors(u,c),_.subVectors(o,c),g.cross(_),a.setXYZ(v+0,g.x,g.y,g.z),a.setXYZ(v+1,g.x,g.y,g.z),a.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)wn.fromBufferAttribute(t,n),wn.normalize(),t.setXYZ(n,wn.x,wn.y,wn.z)}toNonIndexed(){function t(h,m){const p=h.array,g=h.itemSize,_=h.normalized,v=new p.constructor(m.length*g);let x=0,b=0;for(let D=0,M=m.length;D<M;D++){h.isInterleavedBufferAttribute?x=m[D]*h.data.stride+h.offset:x=m[D]*g;for(let S=0;S<g;S++)v[b++]=p[x++]}return new Vi(v,g,_)}if(this.index===null)return de("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Tn,a=this.index.array,o=this.attributes;for(const h in o){const m=o[h],p=t(m,a);n.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let g=0,_=p.length;g<_;g++){const v=p[g],x=t(v,a);m.push(x)}n.morphAttributes[h]=m}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let h=0,m=u.length;h<m;h++){const p=u[h];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const p=a[m];t.data.attributes[m]=p.toJSON(t.data)}const o={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let _=0,v=p.length;_<v;_++){const x=p[_];g.push(x.toJSON(t.data))}g.length>0&&(o[m]=g,c=!0)}c&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(t.data.groups=JSON.parse(JSON.stringify(u)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere=h.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const o=t.attributes;for(const p in o){const g=o[p];this.setAttribute(p,g.clone(n))}const c=t.morphAttributes;for(const p in c){const g=[],_=c[p];for(let v=0,x=_.length;v<x;v++)g.push(_[v].clone(n));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const u=t.groups;for(let p=0,g=u.length;p<g;p++){const _=u[p];this.addGroup(_.start,_.count,_.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cd=new Z,p1=new Z,m1=new ge;class Ra{constructor(t=new Z(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=cd.subVectors(a,n).cross(p1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const o=t.delta(cd),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(t.start).addScaledVector(o,u)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||m1.getNormalMatrix(t),o=this.coplanarPoint(cd).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let g1=0;class jr extends Xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=Ws(),this.name="",this.type="Material",this.blending=sl,this.side=Hs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=k_,this.blendDst=X_,this.blendEquation=Gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ve(0,0,0),this.blendAlpha=0,this.depthFunc=ul,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wh,this.stencilZFail=Wh,this.stencilZPass=Wh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){de(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){de(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const h in c){const m=c[h];delete m.metadata,u.push(m)}return u}if(n){const c=o(t.textures),u=o(t.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ve().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new Ra().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new zt().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new zt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const wa=new Z,ud=new Z,kc=new Z,Xc=new Z;class ux{constructor(t=new Z,n=new Z(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wa)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=wa.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(wa.copy(this.origin).addScaledVector(this.direction,n),wa.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){ud.copy(t).add(n).multiplyScalar(.5),kc.copy(n).sub(t).normalize(),Xc.copy(this.origin).sub(ud);const c=t.distanceTo(n)*.5,u=-this.direction.dot(kc),h=Xc.dot(this.direction),m=-Xc.dot(kc),p=Xc.lengthSq(),g=Math.abs(1-u*u);let _,v,x,b;if(g>0)if(_=u*m-h,v=u*h-m,b=c*g,_>=0)if(v>=-b)if(v<=b){const D=1/g;_*=D,v*=D,x=_*(_+u*v+2*h)+v*(u*_+v+2*m)+p}else v=c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*m)+p;else v=-c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*m)+p;else v<=-b?(_=Math.max(0,-(-u*c+h)),v=_>0?-c:Math.min(Math.max(-c,-m),c),x=-_*_+v*(v+2*m)+p):v<=b?(_=0,v=Math.min(Math.max(-c,-m),c),x=v*(v+2*m)+p):(_=Math.max(0,-(u*c+h)),v=_>0?c:Math.min(Math.max(-c,-m),c),x=-_*_+v*(v+2*m)+p);else v=u>0?-c:c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*m)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(ud).addScaledVector(kc,v),x}intersectSphere(t,n){if(t.radius<0)return null;wa.subVectors(t.center,this.origin);const a=wa.dot(this.direction),o=wa.dot(wa)-a*a,c=t.radius*t.radius;if(o>c)return null;const u=Math.sqrt(c-o),h=a-u,m=a+u;return m<0?null:h<0?this.at(m,n):this.at(h,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,c,u,h,m;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return p>=0?(a=(t.min.x-v.x)*p,o=(t.max.x-v.x)*p):(a=(t.max.x-v.x)*p,o=(t.min.x-v.x)*p),g>=0?(c=(t.min.y-v.y)*g,u=(t.max.y-v.y)*g):(c=(t.max.y-v.y)*g,u=(t.min.y-v.y)*g),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),_>=0?(h=(t.min.z-v.z)*_,m=(t.max.z-v.z)*_):(h=(t.max.z-v.z)*_,m=(t.min.z-v.z)*_),a>m||h>o)||((h>a||a!==a)&&(a=h),(m<o||o!==o)&&(o=m),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,wa)!==null}intersectTriangle(t,n,a,o,c){const u=this.origin,h=this.direction,m=h.x,p=h.y,g=h.z,_=t.x-u.x,v=t.y-u.y,x=t.z-u.z,b=n.x-u.x,D=n.y-u.y,M=n.z-u.z,S=a.x-u.x,I=a.y-u.y,z=a.z-u.z,A=Math.abs(m),O=Math.abs(p),w=Math.abs(g);let N,E,L,H,W,Y,j,F,q,B,P,k;if(A>=O&&A>=w?(L=m,Y=_,q=b,k=S,m>=0?(N=p,E=g,H=v,W=x,j=D,F=M,B=I,P=z):(N=g,E=p,H=x,W=v,j=M,F=D,B=z,P=I)):O>=w?(L=p,Y=v,q=D,k=I,p>=0?(N=g,E=m,H=x,W=_,j=M,F=b,B=z,P=S):(N=m,E=g,H=_,W=x,j=b,F=M,B=S,P=z)):(L=g,Y=x,q=M,k=z,g>=0?(N=m,E=p,H=_,W=v,j=b,F=D,B=S,P=I):(N=p,E=m,H=v,W=_,j=D,F=b,B=I,P=S)),L===0)return null;const V=N/L,X=E/L,R=1/L,J=H-V*Y,rt=W-X*Y,xt=j-V*q,Lt=F-X*q,Pt=B-V*k,nt=P-X*k,dt=Pt*Lt-nt*xt,wt=J*nt-rt*Pt,ee=xt*rt-Lt*J;if(o){if(dt<0||wt<0||ee<0)return null}else if((dt<0||wt<0||ee<0)&&(dt>0||wt>0||ee>0))return null;const Bt=dt+wt+ee;if(Bt===0)return null;const ie=R*(dt*Y+wt*q+ee*k);return(Bt>0?ie<0:ie>0)?null:this.at(ie/Bt,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ml extends jr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new na,this.combine=pp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Zv=new Ge,Os=new ux,Wc=new yl,Kv=new Z,qc=new Z,Yc=new Z,Zc=new Z,fd=new Z,Kc=new Z,Jv=new Z,Jc=new Z;class je extends hn{constructor(t=new Tn,n=new ml){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const h=this.morphTargetInfluences;if(c&&h){Kc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=h[m],_=c[m];g!==0&&(fd.fromBufferAttribute(_,t),u?Kc.addScaledVector(fd,g):Kc.addScaledVector(fd.sub(n),g))}n.add(Kc)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Wc.copy(a.boundingSphere),Wc.applyMatrix4(c),Os.copy(t.ray).recast(t.near),!(Wc.containsPoint(Os.origin)===!1&&(Os.intersectSphere(Wc,Kv)===null||Os.origin.distanceToSquared(Kv)>(t.far-t.near)**2))&&(Zv.copy(c).invert(),Os.copy(t.ray).applyMatrix4(Zv),!(a.boundingBox!==null&&Os.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Os)))}_computeIntersections(t,n,a){let o;const c=this.geometry,u=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,v=c.groups,x=c.drawRange;if(h!==null)if(Array.isArray(u))for(let b=0,D=v.length;b<D;b++){const M=v[b],S=u[M.materialIndex],I=Math.max(M.start,x.start),z=Math.min(h.count,Math.min(M.start+M.count,x.start+x.count));for(let A=I,O=z;A<O;A+=3){const w=h.getX(A),N=h.getX(A+1),E=h.getX(A+2);o=Qc(this,S,t,a,p,g,_,w,N,E),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),D=Math.min(h.count,x.start+x.count);for(let M=b,S=D;M<S;M+=3){const I=h.getX(M),z=h.getX(M+1),A=h.getX(M+2);o=Qc(this,u,t,a,p,g,_,I,z,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(u))for(let b=0,D=v.length;b<D;b++){const M=v[b],S=u[M.materialIndex],I=Math.max(M.start,x.start),z=Math.min(m.count,Math.min(M.start+M.count,x.start+x.count));for(let A=I,O=z;A<O;A+=3){const w=A,N=A+1,E=A+2;o=Qc(this,S,t,a,p,g,_,w,N,E),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),D=Math.min(m.count,x.start+x.count);for(let M=b,S=D;M<S;M+=3){const I=M,z=M+1,A=M+2;o=Qc(this,u,t,a,p,g,_,I,z,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}}}function v1(r,t,n,a,o,c,u,h){let m;if(t.side===Zn?m=a.intersectTriangle(u,c,o,!0,h):m=a.intersectTriangle(o,c,u,t.side===Hs,h),m===null)return null;Jc.copy(h),Jc.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(Jc);return p<n.near||p>n.far?null:{distance:p,point:Jc.clone(),object:r}}function Qc(r,t,n,a,o,c,u,h,m,p){r.getVertexPosition(h,qc),r.getVertexPosition(m,Yc),r.getVertexPosition(p,Zc);const g=v1(r,t,n,a,qc,Yc,Zc,Jv);if(g){const _=new Z;Fi.getBarycoord(Jv,qc,Yc,Zc,_),o&&(g.uv=Fi.getInterpolatedAttribute(o,h,m,p,_,new zt)),c&&(g.uv1=Fi.getInterpolatedAttribute(c,h,m,p,_,new zt)),u&&(g.normal=Fi.getInterpolatedAttribute(u,h,m,p,_,new Z),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const v={a:h,b:m,c:p,normal:new Z,materialIndex:0};Fi.getNormal(qc,Yc,Zc,v.normal),g.face=v,g.barycoord=_}return g}class fx extends Hn{constructor(t=null,n=1,a=1,o,c,u,h,m,p=Pn,g=Pn,_,v){super(null,u,h,m,p,g,o,c,_,v),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qv extends Vi{constructor(t,n,a,o=1){super(t,n,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ir=new Ge,jv=new Ge,jc=[],$v=new Ys,_1=new Ge,jo=new je,$o=new yl;class Cp extends je{constructor(t,n,a){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new Qv(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<a;o++)this.setMatrixAt(o,_1)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Ys),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Ir),$v.copy(t.boundingBox).applyMatrix4(Ir),this.boundingBox.union($v)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new yl),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Ir),$o.copy(t.boundingSphere).applyMatrix4(Ir),this.boundingSphere.union($o)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){return n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const a=n.morphTargetInfluences,o=this.morphTexture.source.data.data,c=a.length+1,u=t*c+1;for(let h=0;h<a.length;h++)a[h]=o[u+h]}raycast(t,n){const a=this.matrixWorld,o=this.count;if(jo.geometry=this.geometry,jo.material=this.material,jo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$o.copy(this.boundingSphere),$o.applyMatrix4(a),t.ray.intersectsSphere($o)!==!1))for(let c=0;c<o;c++){this.getMatrixAt(c,Ir),jv.multiplyMatrices(a,Ir),jo.matrixWorld=jv,jo.raycast(t,jc);for(let u=0,h=jc.length;u<h;u++){const m=jc[u];m.instanceId=c,m.object=this,n.push(m)}jc.length=0}}setColorAt(t,n){return this.instanceColor===null&&(this.instanceColor=new Qv(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,n){return n.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,n){const a=n.morphTargetInfluences,o=a.length+1;this.morphTexture===null&&(this.morphTexture=new fx(new Float32Array(o*this.count),o,this.count,xp,Hi));const c=this.morphTexture.source.data.data;let u=0;for(let p=0;p<a.length;p++)u+=a[p];const h=this.geometry.morphTargetsRelative?1:1-u,m=o*t;return c[m]=h,c.set(a,m+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ps=new yl,x1=new zt(.5,.5),$c=new Z;class Dp{constructor(t=new Ra,n=new Ra,a=new Ra,o=new Ra,c=new Ra,u=new Ra){this.planes=[t,n,a,o,c,u]}set(t,n,a,o,c,u){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(a),h[3].copy(o),h[4].copy(c),h[5].copy(u),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=$i,a=!1){const o=this.planes,c=t.elements,u=c[0],h=c[1],m=c[2],p=c[3],g=c[4],_=c[5],v=c[6],x=c[7],b=c[8],D=c[9],M=c[10],S=c[11],I=c[12],z=c[13],A=c[14],O=c[15];if(o[0].setComponents(p-u,x-g,S-b,O-I).normalize(),o[1].setComponents(p+u,x+g,S+b,O+I).normalize(),o[2].setComponents(p+h,x+_,S+D,O+z).normalize(),o[3].setComponents(p-h,x-_,S-D,O-z).normalize(),a)o[4].setComponents(m,v,M,A).normalize(),o[5].setComponents(p-m,x-v,S-M,O-A).normalize();else if(o[4].setComponents(p-m,x-v,S-M,O-A).normalize(),n===$i)o[5].setComponents(p+m,x+v,S+M,O+A).normalize();else if(n===pl)o[5].setComponents(m,v,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ps)}intersectsSprite(t){Ps.center.set(0,0,0);const n=x1.distanceTo(t.center);return Ps.radius=.7071067811865476+n,Ps.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if($c.x=o.normal.x>0?t.max.x:t.min.x,$c.y=o.normal.y>0?t.max.y:t.min.y,$c.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint($c)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hx extends Hn{constructor(t=[],n=Gs,a,o,c,u,h,m,p,g){super(t,n,a,o,c,u,h,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Up extends Hn{constructor(t,n,a,o,c,u,h,m,p){super(t,n,a,o,c,u,h,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gl extends Hn{constructor(t,n,a=ea,o,c,u,h=Pn,m=Pn,p,g=Na,_=1){if(g!==Na&&g!==Bs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:t,height:n,depth:_};super(v,o,c,u,h,m,g,a,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ap(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}}class S1 extends gl{constructor(t,n=ea,a=Gs,o,c,u=Pn,h=Pn,m,p=Na){const g={width:t,height:t,depth:1},_=[g,g,g,g,g,g];super(t,t,n,a,o,c,u,h,m,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class dx extends Hn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ki extends Tn{constructor(t=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const h=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const m=[],p=[],g=[],_=[];let v=0,x=0;b("z","y","x",-1,-1,a,n,t,u,c,0),b("z","y","x",1,-1,a,n,-t,u,c,1),b("x","z","y",1,1,t,a,n,o,u,2),b("x","z","y",1,-1,t,a,-n,o,u,3),b("x","y","z",1,-1,t,n,a,o,c,4),b("x","y","z",-1,-1,t,n,-a,o,c,5),this.setIndex(m),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(g,3)),this.setAttribute("uv",new Oe(_,2));function b(D,M,S,I,z,A,O,w,N,E,L){const H=A/N,W=O/E,Y=A/2,j=O/2,F=w/2,q=N+1,B=E+1;let P=0,k=0;const V=new Z;for(let X=0;X<B;X++){const R=X*W-j;for(let J=0;J<q;J++){const rt=J*H-Y;V[D]=rt*I,V[M]=R*z,V[S]=F,p.push(V.x,V.y,V.z),V[D]=0,V[M]=0,V[S]=w>0?1:-1,g.push(V.x,V.y,V.z),_.push(J/N),_.push(1-X/E),P+=1}}for(let X=0;X<E;X++)for(let R=0;R<N;R++){const J=v+R+q*X,rt=v+R+q*(X+1),xt=v+(R+1)+q*(X+1),Lt=v+(R+1)+q*X;m.push(J,rt,Lt),m.push(rt,xt,Lt),k+=6}h.addGroup(x,k,L),x+=k,v+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Mu extends Tn{constructor(t=1,n=1,a=4,o=8,c=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:n,capSegments:a,radialSegments:o,heightSegments:c},n=Math.max(0,n),a=Math.max(1,Math.floor(a)),o=Math.max(3,Math.floor(o)),c=Math.max(1,Math.floor(c));const u=[],h=[],m=[],p=[],g=n/2,_=Math.PI/2*t,v=n,x=2*_+v,b=a*2+c,D=o+1,M=new Z,S=new Z;for(let I=0;I<=b;I++){let z=0,A=0,O=0,w=0;if(I<=a){const L=I/a,H=L*Math.PI/2;A=-g-t*Math.cos(H),O=t*Math.sin(H),w=-t*Math.cos(H),z=L*_}else if(I<=a+c){const L=(I-a)/c;A=-g+L*n,O=t,w=0,z=_+L*v}else{const L=(I-a-c)/a,H=L*Math.PI/2;A=g+t*Math.sin(H),O=t*Math.cos(H),w=t*Math.sin(H),z=_+v+L*_}const N=Math.max(0,Math.min(1,z/x));let E=0;I===0?E=.5/o:I===b&&(E=-.5/o);for(let L=0;L<=o;L++){const H=L/o,W=H*Math.PI*2,Y=Math.sin(W),j=Math.cos(W);S.x=-O*j,S.y=A,S.z=O*Y,h.push(S.x,S.y,S.z),M.set(-O*j,w,O*Y),M.normalize(),m.push(M.x,M.y,M.z),p.push(H+E,N)}if(I>0){const L=(I-1)*D;for(let H=0;H<o;H++){const W=L+H,Y=L+H+1,j=I*D+H,F=I*D+H+1;u.push(W,Y,j),u.push(Y,F,j)}}}this.setIndex(u),this.setAttribute("position",new Oe(h,3)),this.setAttribute("normal",new Oe(m,3)),this.setAttribute("uv",new Oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mu(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class wu extends Tn{constructor(t=1,n=32,a=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:a,thetaLength:o},n=Math.max(3,n);const c=[],u=[],h=[],m=[],p=new Z,g=new zt;u.push(0,0,0),h.push(0,0,1),m.push(.5,.5);for(let _=0,v=3;_<=n;_++,v+=3){const x=a+_/n*o;p.x=t*Math.cos(x),p.y=t*Math.sin(x),u.push(p.x,p.y,p.z),h.push(0,0,1),g.x=(u[v]/t+1)/2,g.y=(u[v+1]/t+1)/2,m.push(g.x,g.y)}for(let _=1;_<=n;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(h,3)),this.setAttribute("uv",new Oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class hs extends Tn{constructor(t=1,n=1,a=1,o=32,c=1,u=!1,h=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:o,heightSegments:c,openEnded:u,thetaStart:h,thetaLength:m};const p=this;o=Math.floor(o),c=Math.floor(c);const g=[],_=[],v=[],x=[];let b=0;const D=[],M=a/2;let S=0;I(),u===!1&&(t>0&&z(!0),n>0&&z(!1)),this.setIndex(g),this.setAttribute("position",new Oe(_,3)),this.setAttribute("normal",new Oe(v,3)),this.setAttribute("uv",new Oe(x,2));function I(){const A=new Z,O=new Z;let w=0;const N=(n-t)/a;for(let E=0;E<=c;E++){const L=[],H=E/c,W=H*(n-t)+t;for(let Y=0;Y<=o;Y++){const j=Y/o,F=j*m+h,q=Math.sin(F),B=Math.cos(F);O.x=W*q,O.y=-H*a+M,O.z=W*B,_.push(O.x,O.y,O.z),A.set(q,N,B).normalize(),v.push(A.x,A.y,A.z),x.push(j,1-H),L.push(b++)}D.push(L)}for(let E=0;E<o;E++)for(let L=0;L<c;L++){const H=D[L][E],W=D[L+1][E],Y=D[L+1][E+1],j=D[L][E+1];(t>0||L!==0)&&(g.push(H,W,j),w+=3),(n>0||L!==c-1)&&(g.push(W,Y,j),w+=3)}p.addGroup(S,w,0),S+=w}function z(A){const O=b,w=new zt,N=new Z;let E=0;const L=A===!0?t:n,H=A===!0?1:-1;for(let Y=1;Y<=o;Y++)_.push(0,M*H,0),v.push(0,H,0),x.push(.5,.5),b++;const W=b;for(let Y=0;Y<=o;Y++){const F=Y/o*m+h,q=Math.cos(F),B=Math.sin(F);N.x=L*B,N.y=M*H,N.z=L*q,_.push(N.x,N.y,N.z),v.push(0,H,0),w.x=q*.5+.5,w.y=B*.5*H+.5,x.push(w.x,w.y),b++}for(let Y=0;Y<o;Y++){const j=O+Y,F=W+Y;A===!0?g.push(F,F+1,j):g.push(F+1,F,j),E+=3}p.addGroup(S,E,A===!0?1:2),S+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ia{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){de("Curve: .getPoint() not implemented.")}getPointAt(t,n){const a=this.getUtoTmapping(t);return this.getPoint(a,n)}getPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return n}getSpacedPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPointAt(a/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),c=0;n.push(0);for(let u=1;u<=t;u++)a=this.getPoint(u/t),c+=a.distanceTo(o),n.push(c),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const a=this.getLengths();let o=0;const c=a.length;let u;n?u=n:u=t*a[c-1];let h=0,m=c-1,p;for(;h<=m;)if(o=Math.floor(h+(m-h)/2),p=a[o]-u,p<0)h=o+1;else if(p>0)m=o-1;else{m=o;break}if(o=m,a[o]===u)return o/(c-1);const g=a[o],v=a[o+1]-g,x=(u-g)/v;return(o+x)/(c-1)}getTangent(t,n){let o=t-1e-4,c=t+1e-4;o<0&&(o=0),c>1&&(c=1);const u=this.getPoint(o),h=this.getPoint(c),m=n||(u.isVector2?new zt:new Z);return m.copy(h).sub(u).normalize(),m}getTangentAt(t,n){const a=this.getUtoTmapping(t);return this.getTangent(a,n)}computeFrenetFrames(t,n=!1){const a=new Z,o=[],c=[],u=[],h=new Z,m=new Ge;for(let x=0;x<=t;x++){const b=x/t;o[x]=this.getTangentAt(b,new Z)}c[0]=new Z,u[0]=new Z;let p=Number.MAX_VALUE;const g=Math.abs(o[0].x),_=Math.abs(o[0].y),v=Math.abs(o[0].z);g<=p&&(p=g,a.set(1,0,0)),_<=p&&(p=_,a.set(0,1,0)),v<=p&&a.set(0,0,1),h.crossVectors(o[0],a).normalize(),c[0].crossVectors(o[0],h),u[0].crossVectors(o[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),u[x]=u[x-1].clone(),h.crossVectors(o[x-1],o[x]),h.length()>Number.EPSILON){h.normalize();const b=Math.acos(Te(o[x-1].dot(o[x]),-1,1));c[x].applyMatrix4(m.makeRotationAxis(h,b))}u[x].crossVectors(o[x],c[x])}if(n===!0){let x=Math.acos(Te(c[0].dot(c[t]),-1,1));x/=t,o[0].dot(h.crossVectors(c[0],c[t]))>0&&(x=-x);for(let b=1;b<=t;b++)c[b].applyMatrix4(m.makeRotationAxis(o[b],x*b)),u[b].crossVectors(o[b],c[b])}return{tangents:o,normals:c,binormals:u}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Lp extends ia{constructor(t=0,n=0,a=1,o=1,c=0,u=Math.PI*2,h=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=c,this.aEndAngle=u,this.aClockwise=h,this.aRotation=m}getPoint(t,n=new zt){const a=n,o=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const u=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=o;for(;c>o;)c-=o;c<Number.EPSILON&&(u?c=0:c=o),this.aClockwise===!0&&!u&&(c===o?c=-o:c=c-o);const h=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(h),p=this.aY+this.yRadius*Math.sin(h);if(this.aRotation!==0){const g=Math.cos(this.aRotation),_=Math.sin(this.aRotation),v=m-this.aX,x=p-this.aY;m=v*g-x*_+this.aX,p=v*_+x*g+this.aY}return a.set(m,p)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class y1 extends Lp{constructor(t,n,a,o,c,u){super(t,n,a,a,o,c,u),this.isArcCurve=!0,this.type="ArcCurve"}}function Np(){let r=0,t=0,n=0,a=0;function o(c,u,h,m){r=c,t=h,n=-3*c+3*u-2*h-m,a=2*c-2*u+h+m}return{initCatmullRom:function(c,u,h,m,p){o(u,h,p*(h-c),p*(m-u))},initNonuniformCatmullRom:function(c,u,h,m,p,g,_){let v=(u-c)/p-(h-c)/(p+g)+(h-u)/g,x=(h-u)/g-(m-u)/(g+_)+(m-h)/_;v*=g,x*=g,o(u,h,v,x)},calc:function(c){const u=c*c,h=u*c;return r+t*c+n*u+a*h}}}const t_=new Z,e_=new Z,hd=new Np,dd=new Np,pd=new Np;class vl extends ia{constructor(t=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=a,this.tension=o}getPoint(t,n=new Z){const a=n,o=this.points,c=o.length,u=(c-(this.closed?0:1))*t;let h=Math.floor(u),m=u-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/c)+1)*c:m===0&&h===c-1&&(h=c-2,m=1);let p,g;this.closed||h>0?p=o[(h-1)%c]:(e_.subVectors(o[0],o[1]).add(o[0]),p=e_);const _=o[h%c],v=o[(h+1)%c];if(this.closed||h+2<c?g=o[(h+2)%c]:(t_.subVectors(o[c-1],o[c-2]).add(o[c-1]),g=t_),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let b=Math.pow(p.distanceToSquared(_),x),D=Math.pow(_.distanceToSquared(v),x),M=Math.pow(v.distanceToSquared(g),x);D<1e-4&&(D=1),b<1e-4&&(b=D),M<1e-4&&(M=D),hd.initNonuniformCatmullRom(p.x,_.x,v.x,g.x,b,D,M),dd.initNonuniformCatmullRom(p.y,_.y,v.y,g.y,b,D,M),pd.initNonuniformCatmullRom(p.z,_.z,v.z,g.z,b,D,M)}else this.curveType==="catmullrom"&&(hd.initCatmullRom(p.x,_.x,v.x,g.x,this.tension),dd.initCatmullRom(p.y,_.y,v.y,g.y,this.tension),pd.initCatmullRom(p.z,_.z,v.z,g.z,this.tension));return a.set(hd.calc(m),dd.calc(m),pd.calc(m)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new Z().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function n_(r,t,n,a,o){const c=(a-t)*.5,u=(o-n)*.5,h=r*r,m=r*h;return(2*n-2*a+c+u)*m+(-3*n+3*a-2*c-u)*h+c*r+n}function M1(r,t){const n=1-r;return n*n*t}function E1(r,t){return 2*(1-r)*r*t}function b1(r,t){return r*r*t}function ll(r,t,n,a){return M1(r,t)+E1(r,n)+b1(r,a)}function T1(r,t){const n=1-r;return n*n*n*t}function A1(r,t){const n=1-r;return 3*n*n*r*t}function w1(r,t){return 3*(1-r)*r*r*t}function R1(r,t){return r*r*r*t}function cl(r,t,n,a,o){return T1(r,t)+A1(r,n)+w1(r,a)+R1(r,o)}class px extends ia{constructor(t=new zt,n=new zt,a=new zt,o=new zt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new zt){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(cl(t,o.x,c.x,u.x,h.x),cl(t,o.y,c.y,u.y,h.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class C1 extends ia{constructor(t=new Z,n=new Z,a=new Z,o=new Z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new Z){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(cl(t,o.x,c.x,u.x,h.x),cl(t,o.y,c.y,u.y,h.y),cl(t,o.z,c.z,u.z,h.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class mx extends ia{constructor(t=new zt,n=new zt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new zt){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new zt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class D1 extends ia{constructor(t=new Z,n=new Z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new Z){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Z){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gx extends ia{constructor(t=new zt,n=new zt,a=new zt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new zt){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(ll(t,o.x,c.x,u.x),ll(t,o.y,c.y,u.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class vx extends ia{constructor(t=new Z,n=new Z,a=new Z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new Z){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(ll(t,o.x,c.x,u.x),ll(t,o.y,c.y,u.y),ll(t,o.z,c.z,u.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _x extends ia{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new zt){const a=n,o=this.points,c=(o.length-1)*t,u=Math.floor(c),h=c-u,m=o[u===0?u:u-1],p=o[u],g=o[u>o.length-2?o.length-1:u+1],_=o[u>o.length-3?o.length-1:u+2];return a.set(n_(h,m.x,p.x,g.x,_.x),n_(h,m.y,p.y,g.y,_.y)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new zt().fromArray(o))}return this}}var Eu=Object.freeze({__proto__:null,ArcCurve:y1,CatmullRomCurve3:vl,CubicBezierCurve:px,CubicBezierCurve3:C1,EllipseCurve:Lp,LineCurve:mx,LineCurve3:D1,QuadraticBezierCurve:gx,QuadraticBezierCurve3:vx,SplineCurve:_x});class U1 extends ia{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const a=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Eu[a](n,t))}return this}getPoint(t,n){const a=t*this.getLength(),o=this.getCurveLengths();let c=0;for(;c<o.length;){if(o[c]>=a){const u=o[c]-a,h=this.curves[c],m=h.getLength(),p=m===0?0:1-u/m;return h.getPointAt(p,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let a;for(let o=0,c=this.curves;o<c.length;o++){const u=c[o],h=u.isEllipseCurve?t*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?t*u.points.length:t,m=u.getPoints(h);for(let p=0;p<m.length;p++){const g=m[p];a&&a.equals(g)||(n.push(g),a=g)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(new Eu[o.type]().fromJSON(o))}return this}}class i_ extends U1{constructor(t){super(),this.type="Path",this.currentPoint=new zt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,a=t.length;n<a;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const a=new mx(this.currentPoint.clone(),new zt(t,n));return this.curves.push(a),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,a,o){const c=new gx(this.currentPoint.clone(),new zt(t,n),new zt(a,o));return this.curves.push(c),this.currentPoint.set(a,o),this}bezierCurveTo(t,n,a,o,c,u){const h=new px(this.currentPoint.clone(),new zt(t,n),new zt(a,o),new zt(c,u));return this.curves.push(h),this.currentPoint.set(c,u),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),a=new _x(n);return this.curves.push(a),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,a,o,c,u){const h=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(t+h,n+m,a,o,c,u),this}absarc(t,n,a,o,c,u){return this.absellipse(t,n,a,a,o,c,u),this}ellipse(t,n,a,o,c,u,h,m){const p=this.currentPoint.x,g=this.currentPoint.y;return this.absellipse(t+p,n+g,a,o,c,u,h,m),this}absellipse(t,n,a,o,c,u,h,m){const p=new Lp(t,n,a,o,c,u,h,m);if(this.curves.length>0){const _=p.getPoint(0);_.equals(this.currentPoint)||this.lineTo(_.x,_.y)}this.curves.push(p);const g=p.getPoint(1);return this.currentPoint.copy(g),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class xx extends i_{constructor(t){super(t),this.uuid=Ws(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(new i_().fromJSON(o))}return this}}function L1(r,t,n=2){const a=t&&t.length,o=a?t[0]*n:r.length;let c=Sx(r,0,o,n,!0);const u=[];if(!c||c.next===c.prev)return u;let h,m,p;if(a&&(c=z1(r,t,c,n)),r.length>80*n){h=r[0],m=r[1];let g=h,_=m;for(let v=n;v<o;v+=n){const x=r[v],b=r[v+1];x<h&&(h=x),b<m&&(m=b),x>g&&(g=x),b>_&&(_=b)}p=Math.max(g-h,_-m),p=p!==0?32767/p:0}return _l(c,u,n,h,m,p,0),u}function Sx(r,t,n,a,o){let c;if(o===Z1(r,t,n,a)>0)for(let u=t;u<n;u+=a)c=a_(u/a|0,r[u],r[u+1],c);else for(let u=n-a;u>=t;u-=a)c=a_(u/a|0,r[u],r[u+1],c);return c&&Kr(c,c.next)&&(Sl(c),c=c.next),c}function ks(r,t){if(!r)return r;t||(t=r);let n=r,a;do if(a=!1,!n.steiner&&(Kr(n,n.next)||rn(n.prev,n,n.next)===0)){if(Sl(n),n=t=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==t);return t}function _l(r,t,n,a,o,c,u){if(!r)return;!u&&c&&V1(r,a,o,c);let h=r;for(;r.prev!==r.next;){const m=r.prev,p=r.next;if(c?O1(r,a,o,c):N1(r)){t.push(m.i,r.i,p.i),Sl(r),r=p.next,h=p.next;continue}if(r=p,r===h){u?u===1?(r=P1(ks(r),t),_l(r,t,n,a,o,c,2)):u===2&&I1(r,t,n,a,o,c):_l(ks(r),t,n,a,o,c,1);break}}}function N1(r){const t=r.prev,n=r,a=r.next;if(rn(t,n,a)>=0)return!1;const o=t.x,c=n.x,u=a.x,h=t.y,m=n.y,p=a.y,g=Math.min(o,c,u),_=Math.min(h,m,p),v=Math.max(o,c,u),x=Math.max(h,m,p);let b=a.next;for(;b!==t;){if(b.x>=g&&b.x<=v&&b.y>=_&&b.y<=x&&il(o,h,c,m,u,p,b.x,b.y)&&rn(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function O1(r,t,n,a){const o=r.prev,c=r,u=r.next;if(rn(o,c,u)>=0)return!1;const h=o.x,m=c.x,p=u.x,g=o.y,_=c.y,v=u.y,x=Math.min(h,m,p),b=Math.min(g,_,v),D=Math.max(h,m,p),M=Math.max(g,_,v),S=rp(x,b,t,n,a),I=rp(D,M,t,n,a);let z=r.prevZ,A=r.nextZ;for(;z&&z.z>=S&&A&&A.z<=I;){if(z.x>=x&&z.x<=D&&z.y>=b&&z.y<=M&&z!==o&&z!==u&&il(h,g,m,_,p,v,z.x,z.y)&&rn(z.prev,z,z.next)>=0||(z=z.prevZ,A.x>=x&&A.x<=D&&A.y>=b&&A.y<=M&&A!==o&&A!==u&&il(h,g,m,_,p,v,A.x,A.y)&&rn(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;z&&z.z>=S;){if(z.x>=x&&z.x<=D&&z.y>=b&&z.y<=M&&z!==o&&z!==u&&il(h,g,m,_,p,v,z.x,z.y)&&rn(z.prev,z,z.next)>=0)return!1;z=z.prevZ}for(;A&&A.z<=I;){if(A.x>=x&&A.x<=D&&A.y>=b&&A.y<=M&&A!==o&&A!==u&&il(h,g,m,_,p,v,A.x,A.y)&&rn(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function P1(r,t){let n=r;do{const a=n.prev,o=n.next.next;!Kr(a,o)&&Mx(a,n,n.next,o)&&xl(a,o)&&xl(o,a)&&(t.push(a.i,n.i,o.i),Sl(n),Sl(n.next),n=r=o),n=n.next}while(n!==r);return ks(n)}function I1(r,t,n,a,o,c){let u=r;do{let h=u.next.next;for(;h!==u.prev;){if(u.i!==h.i&&W1(u,h)){let m=Ex(u,h);u=ks(u,u.next),m=ks(m,m.next),_l(u,t,n,a,o,c,0),_l(m,t,n,a,o,c,0);return}h=h.next}u=u.next}while(u!==r)}function z1(r,t,n,a){const o=[];for(let c=0,u=t.length;c<u;c++){const h=t[c]*a,m=c<u-1?t[c+1]*a:r.length,p=Sx(r,h,m,a,!1);p===p.next&&(p.steiner=!0),o.push(X1(p))}o.sort(B1);for(let c=0;c<o.length;c++)n=F1(o[c],n);return n}function B1(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const a=(r.next.y-r.y)/(r.next.x-r.x),o=(t.next.y-t.y)/(t.next.x-t.x);n=a-o}return n}function F1(r,t){const n=H1(r,t);if(!n)return t;const a=Ex(n,r);return ks(a,a.next),ks(n,n.next)}function H1(r,t){let n=t;const a=r.x,o=r.y;let c=-1/0,u;if(Kr(r,n))return n;do{if(Kr(r,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const _=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(_<=a&&_>c&&(c=_,u=n.x<n.next.x?n:n.next,_===a))return u}n=n.next}while(n!==t);if(!u)return null;const h=u,m=u.x,p=u.y;let g=1/0;n=u;do{if(a>=n.x&&n.x>=m&&a!==n.x&&yx(o<p?a:c,o,m,p,o<p?c:a,o,n.x,n.y)){const _=Math.abs(o-n.y)/(a-n.x);xl(n,r)&&(_<g||_===g&&(n.x>u.x||n.x===u.x&&G1(u,n)))&&(u=n,g=_)}n=n.next}while(n!==h);return u}function G1(r,t){return rn(r.prev,r,t.prev)<0&&rn(t.next,r,r.next)<0}function V1(r,t,n,a){let o=r;do o.z===0&&(o.z=rp(o.x,o.y,t,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==r);o.prevZ.nextZ=null,o.prevZ=null,k1(o)}function k1(r){let t,n=1;do{let a=r,o;r=null;let c=null;for(t=0;a;){t++;let u=a,h=0;for(let p=0;p<n&&(h++,u=u.nextZ,!!u);p++);let m=n;for(;h>0||m>0&&u;)h!==0&&(m===0||!u||a.z<=u.z)?(o=a,a=a.nextZ,h--):(o=u,u=u.nextZ,m--),c?c.nextZ=o:r=o,o.prevZ=c,c=o;a=u}c.nextZ=null,n*=2}while(t>1);return r}function rp(r,t,n,a,o){return r=(r-n)*o|0,t=(t-a)*o|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function X1(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function yx(r,t,n,a,o,c,u,h){return(o-u)*(t-h)>=(r-u)*(c-h)&&(r-u)*(a-h)>=(n-u)*(t-h)&&(n-u)*(c-h)>=(o-u)*(a-h)}function il(r,t,n,a,o,c,u,h){return!(r===u&&t===h)&&yx(r,t,n,a,o,c,u,h)}function W1(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!q1(r,t)&&(xl(r,t)&&xl(t,r)&&Y1(r,t)&&(rn(r.prev,r,t.prev)||rn(r,t.prev,t))||Kr(r,t)&&rn(r.prev,r,r.next)>0&&rn(t.prev,t,t.next)>0)}function rn(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function Kr(r,t){return r.x===t.x&&r.y===t.y}function Mx(r,t,n,a){const o=eu(rn(r,t,n)),c=eu(rn(r,t,a)),u=eu(rn(n,a,r)),h=eu(rn(n,a,t));return!!(o!==c&&u!==h||o===0&&tu(r,n,t)||c===0&&tu(r,a,t)||u===0&&tu(n,r,a)||h===0&&tu(n,t,a))}function tu(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function eu(r){return r>0?1:r<0?-1:0}function q1(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&Mx(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function xl(r,t){return rn(r.prev,r,r.next)<0?rn(r,t,r.next)>=0&&rn(r,r.prev,t)>=0:rn(r,t,r.prev)<0||rn(r,r.next,t)<0}function Y1(r,t){let n=r,a=!1;const o=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&o<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==r);return a}function Ex(r,t){const n=op(r.i,r.x,r.y),a=op(t.i,t.x,t.y),o=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=o,o.prev=n,a.next=n,n.prev=a,c.next=a,a.prev=c,a}function a_(r,t,n,a){const o=op(r,t,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function Sl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function op(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Z1(r,t,n,a){let o=0;for(let c=t,u=n-a;c<n;c+=a)o+=(r[u]-r[c])*(r[c+1]+r[u+1]),u=c;return o}class K1{static triangulate(t,n,a=2){return L1(t,n,a)}}class kr{static area(t){const n=t.length;let a=0;for(let o=n-1,c=0;c<n;o=c++)a+=t[o].x*t[c].y-t[c].x*t[o].y;return a*.5}static isClockWise(t){return kr.area(t)<0}static triangulateShape(t,n){const a=[],o=[],c=[];s_(t),r_(a,t);let u=t.length;n.forEach(s_);for(let m=0;m<n.length;m++)o.push(u),u+=n[m].length,r_(a,n[m]);const h=K1.triangulate(a,o);for(let m=0;m<h.length;m+=3)c.push(h.slice(m,m+3));return c}}function s_(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function r_(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class Op extends Tn{constructor(t=new xx([new zt(.5,.5),new zt(-.5,.5),new zt(-.5,-.5),new zt(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];const a=this,o=[],c=[];for(let h=0,m=t.length;h<m;h++){const p=t[h];u(p)}this.setAttribute("position",new Oe(o,3)),this.setAttribute("uv",new Oe(c,2)),this.computeVertexNormals();function u(h){const m=[],p=n.curveSegments!==void 0?n.curveSegments:12,g=n.steps!==void 0?n.steps:1,_=n.depth!==void 0?n.depth:1;let v=n.bevelEnabled!==void 0?n.bevelEnabled:!0,x=n.bevelThickness!==void 0?n.bevelThickness:.2,b=n.bevelSize!==void 0?n.bevelSize:x-.1,D=n.bevelOffset!==void 0?n.bevelOffset:0,M=n.bevelSegments!==void 0?n.bevelSegments:3;const S=n.extrudePath,I=n.UVGenerator!==void 0?n.UVGenerator:J1;let z,A=!1,O,w,N,E;if(S){z=S.getSpacedPoints(g),A=!0,v=!1;const mt=S.isCatmullRomCurve3?S.closed:!1;O=S.computeFrenetFrames(g,mt),w=new Z,N=new Z,E=new Z}v||(M=0,x=0,b=0,D=0);const L=h.extractPoints(p);let H=L.shape;const W=L.holes;if(!kr.isClockWise(H)){H=H.reverse();for(let mt=0,Ct=W.length;mt<Ct;mt++){const Nt=W[mt];kr.isClockWise(Nt)&&(W[mt]=Nt.reverse())}}function j(mt){const Nt=10000000000000001e-36;let Dt=mt[0];for(let It=1;It<=mt.length;It++){const ae=It%mt.length,jt=mt[ae],ce=jt.x-Dt.x,he=jt.y-Dt.y,Q=ce*ce+he*he,pe=Math.max(Math.abs(jt.x),Math.abs(jt.y),Math.abs(Dt.x),Math.abs(Dt.y)),Se=Nt*pe*pe;if(Q<=Se){mt.splice(ae,1),It--;continue}Dt=jt}}j(H),W.forEach(j);const F=W.length,q=H;for(let mt=0;mt<F;mt++){const Ct=W[mt];H=H.concat(Ct)}function B(mt,Ct,Nt){return Ct||Ne("ExtrudeGeometry: vec does not exist"),mt.clone().addScaledVector(Ct,Nt)}const P=H.length;function k(mt,Ct,Nt){let Dt,It,ae;const jt=mt.x-Ct.x,ce=mt.y-Ct.y,he=Nt.x-mt.x,Q=Nt.y-mt.y,pe=jt*jt+ce*ce,Se=jt*Q-ce*he;if(Math.abs(Se)>Number.EPSILON){const G=Math.sqrt(pe),T=Math.sqrt(he*he+Q*Q),it=Ct.x-ce/G,ct=Ct.y+jt/G,St=Nt.x-Q/T,Ot=Nt.y+he/T,Ft=((St-it)*Q-(Ot-ct)*he)/(jt*Q-ce*he);Dt=it+jt*Ft-mt.x,It=ct+ce*Ft-mt.y;const vt=Dt*Dt+It*It;if(vt<=2)return new zt(Dt,It);ae=Math.sqrt(vt/2)}else{let G=!1;jt>Number.EPSILON?he>Number.EPSILON&&(G=!0):jt<-Number.EPSILON?he<-Number.EPSILON&&(G=!0):Math.sign(ce)===Math.sign(Q)&&(G=!0),G?(Dt=-ce,It=jt,ae=Math.sqrt(pe)):(Dt=jt,It=ce,ae=Math.sqrt(pe/2))}return new zt(Dt/ae,It/ae)}const V=[];for(let mt=0,Ct=q.length,Nt=Ct-1,Dt=mt+1;mt<Ct;mt++,Nt++,Dt++)Nt===Ct&&(Nt=0),Dt===Ct&&(Dt=0),V[mt]=k(q[mt],q[Nt],q[Dt]);const X=[];let R,J=V.concat();for(let mt=0,Ct=F;mt<Ct;mt++){const Nt=W[mt];R=[];for(let Dt=0,It=Nt.length,ae=It-1,jt=Dt+1;Dt<It;Dt++,ae++,jt++)ae===It&&(ae=0),jt===It&&(jt=0),R[Dt]=k(Nt[Dt],Nt[ae],Nt[jt]);X.push(R),J=J.concat(R)}let rt;if(M===0)rt=kr.triangulateShape(q,W);else{const mt=[],Ct=[];for(let Nt=0;Nt<M;Nt++){const Dt=Nt/M,It=x*Math.cos(Dt*Math.PI/2),ae=b*Math.sin(Dt*Math.PI/2)+D;for(let jt=0,ce=q.length;jt<ce;jt++){const he=B(q[jt],V[jt],ae);wt(he.x,he.y,-It),Dt===0&&mt.push(he)}for(let jt=0,ce=F;jt<ce;jt++){const he=W[jt];R=X[jt];const Q=[];for(let pe=0,Se=he.length;pe<Se;pe++){const G=B(he[pe],R[pe],ae);wt(G.x,G.y,-It),Dt===0&&Q.push(G)}Dt===0&&Ct.push(Q)}}rt=kr.triangulateShape(mt,Ct)}const xt=rt.length,Lt=b+D;for(let mt=0;mt<P;mt++){const Ct=v?B(H[mt],J[mt],Lt):H[mt];A?(N.copy(O.normals[0]).multiplyScalar(Ct.x),w.copy(O.binormals[0]).multiplyScalar(Ct.y),E.copy(z[0]).add(N).add(w),wt(E.x,E.y,E.z)):wt(Ct.x,Ct.y,0)}for(let mt=1;mt<=g;mt++)for(let Ct=0;Ct<P;Ct++){const Nt=v?B(H[Ct],J[Ct],Lt):H[Ct];A?(N.copy(O.normals[mt]).multiplyScalar(Nt.x),w.copy(O.binormals[mt]).multiplyScalar(Nt.y),E.copy(z[mt]).add(N).add(w),wt(E.x,E.y,E.z)):wt(Nt.x,Nt.y,_/g*mt)}for(let mt=M-1;mt>=0;mt--){const Ct=mt/M,Nt=x*Math.cos(Ct*Math.PI/2),Dt=b*Math.sin(Ct*Math.PI/2)+D;for(let It=0,ae=q.length;It<ae;It++){const jt=B(q[It],V[It],Dt);wt(jt.x,jt.y,_+Nt)}for(let It=0,ae=W.length;It<ae;It++){const jt=W[It];R=X[It];for(let ce=0,he=jt.length;ce<he;ce++){const Q=B(jt[ce],R[ce],Dt);A?wt(Q.x,Q.y+z[g-1].y,z[g-1].x+Nt):wt(Q.x,Q.y,_+Nt)}}}Pt(),nt();function Pt(){const mt=o.length/3;if(v){let Ct=0,Nt=P*Ct;for(let Dt=0;Dt<xt;Dt++){const It=rt[Dt];ee(It[2]+Nt,It[1]+Nt,It[0]+Nt)}Ct=g+M*2,Nt=P*Ct;for(let Dt=0;Dt<xt;Dt++){const It=rt[Dt];ee(It[0]+Nt,It[1]+Nt,It[2]+Nt)}}else{for(let Ct=0;Ct<xt;Ct++){const Nt=rt[Ct];ee(Nt[2],Nt[1],Nt[0])}for(let Ct=0;Ct<xt;Ct++){const Nt=rt[Ct];ee(Nt[0]+P*g,Nt[1]+P*g,Nt[2]+P*g)}}a.addGroup(mt,o.length/3-mt,0)}function nt(){const mt=o.length/3;let Ct=0;dt(q,Ct),Ct+=q.length;for(let Nt=0,Dt=W.length;Nt<Dt;Nt++){const It=W[Nt];dt(It,Ct),Ct+=It.length}a.addGroup(mt,o.length/3-mt,1)}function dt(mt,Ct){let Nt=mt.length;for(;--Nt>=0;){const Dt=Nt;let It=Nt-1;It<0&&(It=mt.length-1);for(let ae=0,jt=g+M*2;ae<jt;ae++){const ce=P*ae,he=P*(ae+1),Q=Ct+Dt+ce,pe=Ct+It+ce,Se=Ct+It+he,G=Ct+Dt+he;Bt(Q,pe,Se,G)}}}function wt(mt,Ct,Nt){m.push(mt),m.push(Ct),m.push(Nt)}function ee(mt,Ct,Nt){ie(mt),ie(Ct),ie(Nt);const Dt=o.length/3,It=I.generateTopUV(a,o,Dt-3,Dt-2,Dt-1);ue(It[0]),ue(It[1]),ue(It[2])}function Bt(mt,Ct,Nt,Dt){ie(mt),ie(Ct),ie(Dt),ie(Ct),ie(Nt),ie(Dt);const It=o.length/3,ae=I.generateSideWallUV(a,o,It-6,It-3,It-2,It-1);ue(ae[0]),ue(ae[1]),ue(ae[3]),ue(ae[1]),ue(ae[2]),ue(ae[3])}function ie(mt){o.push(m[mt*3+0]),o.push(m[mt*3+1]),o.push(m[mt*3+2])}function ue(mt){c.push(mt.x),c.push(mt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes,a=this.parameters.options;return Q1(n,a,t)}static fromJSON(t,n){const a=[];for(let c=0,u=t.shapes.length;c<u;c++){const h=n[t.shapes[c]];a.push(h)}const o=t.options.extrudePath;return o!==void 0&&(t.options.extrudePath=new Eu[o.type]().fromJSON(o)),new Op(a,t.options)}}const J1={generateTopUV:function(r,t,n,a,o){const c=t[n*3],u=t[n*3+1],h=t[a*3],m=t[a*3+1],p=t[o*3],g=t[o*3+1];return[new zt(c,u),new zt(h,m),new zt(p,g)]},generateSideWallUV:function(r,t,n,a,o,c){const u=t[n*3],h=t[n*3+1],m=t[n*3+2],p=t[a*3],g=t[a*3+1],_=t[a*3+2],v=t[o*3],x=t[o*3+1],b=t[o*3+2],D=t[c*3],M=t[c*3+1],S=t[c*3+2];return Math.abs(h-g)<Math.abs(u-p)?[new zt(u,1-m),new zt(p,1-_),new zt(v,1-b),new zt(D,1-S)]:[new zt(h,1-m),new zt(g,1-_),new zt(x,1-b),new zt(M,1-S)]}};function Q1(r,t,n){if(n.shapes=[],Array.isArray(r))for(let a=0,o=r.length;a<o;a++){const c=r[a];n.shapes.push(c.uuid)}else n.shapes.push(r.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}class Ml extends Tn{constructor(t=[new zt(0,-.5),new zt(.5,0),new zt(0,.5)],n=12,a=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:n,phiStart:a,phiLength:o},n=Math.floor(n),o=Te(o,0,Math.PI*2);const c=[],u=[],h=[],m=[],p=[],g=1/n,_=new Z,v=new zt,x=new Z,b=new Z,D=new Z;let M=0,S=0;for(let I=0;I<=t.length-1;I++)switch(I){case 0:M=t[I+1].x-t[I].x,S=t[I+1].y-t[I].y,x.x=S*1,x.y=-M,x.z=S*0,D.copy(x),x.normalize(),m.push(x.x,x.y,x.z);break;case t.length-1:m.push(D.x,D.y,D.z);break;default:M=t[I+1].x-t[I].x,S=t[I+1].y-t[I].y,x.x=S*1,x.y=-M,x.z=S*0,b.copy(x),x.x+=D.x,x.y+=D.y,x.z+=D.z,x.normalize(),m.push(x.x,x.y,x.z),D.copy(b)}for(let I=0;I<=n;I++){const z=a+I*g*o,A=Math.sin(z),O=Math.cos(z);for(let w=0;w<=t.length-1;w++){_.x=t[w].x*A,_.y=t[w].y,_.z=t[w].x*O,u.push(_.x,_.y,_.z),v.x=I/n,v.y=w/(t.length-1),h.push(v.x,v.y);const N=m[3*w+0]*A,E=m[3*w+1],L=m[3*w+0]*O;p.push(N,E,L)}}for(let I=0;I<n;I++)for(let z=0;z<t.length-1;z++){const A=z+I*t.length,O=A,w=A+t.length,N=A+t.length+1,E=A+1;c.push(O,w,E),c.push(N,E,w)}this.setIndex(c),this.setAttribute("position",new Oe(u,3)),this.setAttribute("uv",new Oe(h,2)),this.setAttribute("normal",new Oe(p,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ml(t.points,t.segments,t.phiStart,t.phiLength)}}class vi extends Tn{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const c=t/2,u=n/2,h=Math.floor(a),m=Math.floor(o),p=h+1,g=m+1,_=t/h,v=n/m,x=[],b=[],D=[],M=[];for(let S=0;S<g;S++){const I=S*v-u;for(let z=0;z<p;z++){const A=z*_-c;b.push(A,-I,0),D.push(0,0,1),M.push(z/h),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let I=0;I<h;I++){const z=I+p*S,A=I+p*(S+1),O=I+1+p*(S+1),w=I+1+p*S;x.push(z,A,w),x.push(A,O,w)}this.setIndex(x),this.setAttribute("position",new Oe(b,3)),this.setAttribute("normal",new Oe(D,3)),this.setAttribute("uv",new Oe(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ru extends Tn{constructor(t=1,n=32,a=16,o=0,c=Math.PI*2,u=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:o,phiLength:c,thetaStart:u,thetaLength:h},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const m=Math.min(u+h,Math.PI);let p=0;const g=[],_=new Z,v=new Z,x=[],b=[],D=[],M=[];for(let S=0;S<=a;S++){const I=[],z=S/a,A=u+z*h,O=t*Math.cos(A),w=Math.sqrt(t*t-O*O);let N=0;S===0&&u===0?N=.5/n:S===a&&m===Math.PI&&(N=-.5/n);for(let E=0;E<=n;E++){const L=E/n,H=o+L*c;_.x=-w*Math.cos(H),_.y=O,_.z=w*Math.sin(H),b.push(_.x,_.y,_.z),v.copy(_).normalize(),D.push(v.x,v.y,v.z),M.push(L+N,1-z),I.push(p++)}g.push(I)}for(let S=0;S<a;S++)for(let I=0;I<n;I++){const z=g[S][I+1],A=g[S][I],O=g[S+1][I],w=g[S+1][I+1];(S!==0||u>0)&&x.push(z,A,w),(S!==a-1||m<Math.PI)&&x.push(A,O,w)}this.setIndex(x),this.setAttribute("position",new Oe(b,3)),this.setAttribute("normal",new Oe(D,3)),this.setAttribute("uv",new Oe(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ru(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Fs extends Tn{constructor(t=1,n=.4,a=12,o=48,c=Math.PI*2,u=0,h=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:a,tubularSegments:o,arc:c,thetaStart:u,thetaLength:h},a=Math.floor(a),o=Math.floor(o);const m=[],p=[],g=[],_=[],v=new Z,x=new Z,b=new Z;for(let D=0;D<=a;D++){const M=u+D/a*h;for(let S=0;S<=o;S++){const I=S/o*c;x.x=(t+n*Math.cos(M))*Math.cos(I),x.y=(t+n*Math.cos(M))*Math.sin(I),x.z=n*Math.sin(M),p.push(x.x,x.y,x.z),v.x=t*Math.cos(I),v.y=t*Math.sin(I),b.subVectors(x,v).normalize(),g.push(b.x,b.y,b.z),_.push(S/o),_.push(D/a)}}for(let D=1;D<=a;D++)for(let M=1;M<=o;M++){const S=(o+1)*D+M-1,I=(o+1)*(D-1)+M-1,z=(o+1)*(D-1)+M,A=(o+1)*D+M;m.push(S,I,A),m.push(I,z,A)}this.setIndex(m),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(g,3)),this.setAttribute("uv",new Oe(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class Jr extends Tn{constructor(t=new vx(new Z(-1,-1,0),new Z(-1,1,0),new Z(1,1,0)),n=64,a=1,o=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:a,radialSegments:o,closed:c};const u=t.computeFrenetFrames(n,c);this.tangents=u.tangents,this.normals=u.normals,this.binormals=u.binormals;const h=new Z,m=new Z,p=new zt;let g=new Z;const _=[],v=[],x=[],b=[];D(),this.setIndex(b),this.setAttribute("position",new Oe(_,3)),this.setAttribute("normal",new Oe(v,3)),this.setAttribute("uv",new Oe(x,2));function D(){for(let z=0;z<n;z++)M(z);M(c===!1?n:0),I(),S()}function M(z){g=t.getPointAt(z/n,g);const A=u.normals[z],O=u.binormals[z];for(let w=0;w<=o;w++){const N=w/o*Math.PI*2,E=Math.sin(N),L=-Math.cos(N);m.x=L*A.x+E*O.x,m.y=L*A.y+E*O.y,m.z=L*A.z+E*O.z,m.normalize(),v.push(m.x,m.y,m.z),h.x=g.x+a*m.x,h.y=g.y+a*m.y,h.z=g.z+a*m.z,_.push(h.x,h.y,h.z)}}function S(){for(let z=1;z<=n;z++)for(let A=1;A<=o;A++){const O=(o+1)*(z-1)+(A-1),w=(o+1)*z+(A-1),N=(o+1)*z+A,E=(o+1)*(z-1)+A;b.push(O,w,E),b.push(w,N,E)}}function I(){for(let z=0;z<=n;z++)for(let A=0;A<=o;A++)p.x=z/n,p.y=A/o,x.push(p.x,p.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Jr(new Eu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Qr(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const o=r[n][a];if(o_(o))o.isRenderTargetTexture?(de("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone();else if(Array.isArray(o))if(o_(o[0])){const c=[];for(let u=0,h=o.length;u<h;u++)c[u]=o[u].clone();t[n][a]=c}else t[n][a]=o.slice();else t[n][a]=o}}return t}function Wn(r){const t={};for(let n=0;n<r.length;n++){const a=Qr(r[n]);for(const o in a)t[o]=a[o]}return t}function o_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function j1(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function bx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Le.workingColorSpace}const Tx={clone:Qr,merge:Wn};var $1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ui extends jr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$1,this.fragmentShader=tE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qr(t.uniforms),this.uniformsGroups=j1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(t).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const o=t.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new ve().setHex(o.value);break;case"v2":this.uniforms[a].value=new zt().fromArray(o.value);break;case"v3":this.uniforms[a].value=new Z().fromArray(o.value);break;case"v4":this.uniforms[a].value=new nn().fromArray(o.value);break;case"m3":this.uniforms[a].value=new ge().fromArray(o.value);break;case"m4":this.uniforms[a].value=new Ge().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class eE extends Ui{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Rn extends jr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_u,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new na,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class du extends Rn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new zt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Te(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class nE extends jr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_u,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new na,this.combine=pp,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class iE extends jr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=MM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class aE extends jr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class El extends hn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ve(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class sE extends El{constructor(t,n,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ve(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const md=new Ge,l_=new Z,c_=new Z;class Pp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.mapType=gi,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dp,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new nn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera;l_.setFromMatrixPosition(t.matrixWorld),n.position.copy(l_),c_.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(c_),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,a,o){md.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix(md,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,u=o?o.z/c.x:1,h=o?o.w/c.y:1,m=o?o.x/c.x:0,p=o?o.y/c.y:0;t.coordinateSystem===pl||t.reversedDepth?n.set(.5*u,0,0,.5*u+m,0,.5*h,0,.5*h+p,0,0,1,0,0,0,0,1):n.set(.5*u,0,0,.5*u+m,0,.5*h,0,.5*h+p,0,0,.5,.5,0,0,0,1),n.multiply(md)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const nu=new Z,iu=new qs,Ji=new Z;class Ax extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=$i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(nu,iu,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nu,iu,Ji.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(nu,iu,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nu,iu,Ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const fs=new Z,u_=new zt,f_=new zt;class ii extends Ax{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Zr*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(rl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zr*2*Math.atan(Math.tan(rl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){fs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fs.x,fs.y).multiplyScalar(-t/fs.z),fs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(fs.x,fs.y).multiplyScalar(-t/fs.z)}getViewSize(t,n){return this.getViewBounds(t,u_,f_),n.subVectors(f_,u_)}setViewOffset(t,n,a,o,c,u){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(rl*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,p=u.fullHeight;c+=u.offsetX*o/m,n-=u.offsetY*a/p,o*=u.width/m,a*=u.height/p}const h=this.filmOffset;h!==0&&(c+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class rE extends Pp{constructor(){super(new ii(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const n=this.camera,a=Zr*2*t.angle*this.focus,o=this.mapSize.width/this.mapSize.height*this.aspect,c=t.distance||n.far;(a!==n.fov||o!==n.aspect||c!==n.far)&&(n.fov=a,n.aspect=o,n.far=c,n.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class h_ extends El{constructor(t,n,a=0,o=Math.PI/3,c=0,u=2){super(t,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.distance=a,this.angle=o,this.penumbra=c,this.decay=u,this.map=null,this.shadow=new rE}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.angle=this.angle,n.object.decay=this.decay,n.object.penumbra=this.penumbra,n.object.target=this.target.uuid,this.map&&this.map.isTexture&&(n.object.map=this.map.toJSON(t).uuid),n.object.shadow=this.shadow.toJSON(),n}}class oE extends Pp{constructor(){super(new ii(90,1,.5,500)),this.isPointLightShadow=!0}}class bu extends El{constructor(t,n,a=0,o=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=o,this.shadow=new oE}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class Ip extends Ax{constructor(t=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-t,u=a+t,h=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,u=c+p*this.view.width,h-=g*this.view.offsetY,m=h-g*this.view.height}this.projectionMatrix.makeOrthographic(c,u,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class lE extends Pp{constructor(){super(new Ip(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class cE extends El{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.shadow=new lE}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const zr=-90,Br=1;class uE extends hn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ii(zr,Br,t,n);o.layers=this.layers,this.add(o);const c=new ii(zr,Br,t,n);c.layers=this.layers,this.add(c);const u=new ii(zr,Br,t,n);u.layers=this.layers,this.add(u);const h=new ii(zr,Br,t,n);h.layers=this.layers,this.add(h);const m=new ii(zr,Br,t,n);m.layers=this.layers,this.add(m);const p=new ii(zr,Br,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,h,m]=n;for(const p of n)this.remove(p);if(t===$i)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===pl)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,u,h,m,p,g]=this.children,_=t.getRenderTarget(),v=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const D=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(a,0,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,1,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(a,2,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(a,3,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,m),t.setRenderTarget(a,4,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,p),a.texture.generateMipmaps=D,t.setRenderTarget(a,5,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,g),t.setRenderTarget(_,v,x),t.xr.enabled=b,a.texture.needsPMREMUpdate=!0}}class fE extends ii{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const d_=new Ge;class hE{constructor(t,n,a=0,o=1/0){this.ray=new ux(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new wp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Ne("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return d_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(d_),this}intersectObject(t,n=!0,a=[]){return lp(t,this,a,n),a.sort(p_),a}intersectObjects(t,n=!0,a=[]){for(let o=0,c=t.length;o<c;o++)lp(t[o],this,a,n);return a.sort(p_),a}}function p_(r,t){return r.distance-t.distance}function lp(r,t,n,a){let o=!0;if(r.layers.test(t.layers)&&r.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,h=c.length;u<h;u++)lp(c[u],t,n,!0)}}const Gp=class Gp{constructor(t,n,a,o){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,o){const c=this.elements;return c[0]=t,c[2]=n,c[1]=a,c[3]=o,this}};Gp.prototype.isMatrix2=!0;let m_=Gp;function g_(r,t,n,a){const o=dE(a);switch(n){case nx:return r*t;case xp:return r*t/o.components*o.byteLength;case Sp:return r*t/o.components*o.byteLength;case Vs:return r*t*2/o.components*o.byteLength;case yp:return r*t*2/o.components*o.byteLength;case ix:return r*t*3/o.components*o.byteLength;case Gi:return r*t*4/o.components*o.byteLength;case Mp:return r*t*4/o.components*o.byteLength;case cu:case uu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case fu:case hu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ud:case Nd:return Math.max(r,16)*Math.max(t,8)/4;case Dd:case Ld:return Math.max(r,8)*Math.max(t,8)/2;case Od:case Pd:case zd:case Bd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Id:case gu:case Fd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Hd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Gd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Vd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case kd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Xd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Wd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case qd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Yd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Zd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Kd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Jd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Qd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case jd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case $d:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case tp:case ep:case np:return Math.ceil(r/4)*Math.ceil(t/4)*16;case ip:case ap:return Math.ceil(r/4)*Math.ceil(t/4)*8;case vu:case sp:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function dE(r){switch(r){case gi:case j_:return{byteLength:1,components:1};case hl:case $_:case Di:return{byteLength:2,components:1};case vp:case _p:return{byteLength:2,components:4};case ea:case gp:case Hi:return{byteLength:4,components:1};case tx:case ex:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dp}}));typeof window<"u"&&(window.__THREE__?de("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wx(){let r=null,t=!1,n=null,a=null;function o(c,u){a=r.requestAnimationFrame(o),n(c,u)}return{start:function(){t!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function pE(r){const t=new WeakMap;function n(h,m){const p=h.array,g=h.usage,_=p.byteLength,v=r.createBuffer();r.bindBuffer(m,v),r.bufferData(m,p,g),h.onUploadCallback();let x;if(p instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)x=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)x=r.SHORT;else if(p instanceof Uint32Array)x=r.UNSIGNED_INT;else if(p instanceof Int32Array)x=r.INT;else if(p instanceof Int8Array)x=r.BYTE;else if(p instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:v,type:x,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:_}}function a(h,m,p){const g=m.array,_=m.updateRanges;if(r.bindBuffer(p,h),_.length===0)r.bufferSubData(p,0,g);else{_.sort((x,b)=>x.start-b.start);let v=0;for(let x=1;x<_.length;x++){const b=_[v],D=_[x];D.start<=b.start+b.count+1?b.count=Math.max(b.count,D.start+D.count-b.start):(++v,_[v]=D)}_.length=v+1;for(let x=0,b=_.length;x<b;x++){const D=_[x];r.bufferSubData(p,D.start*g.BYTES_PER_ELEMENT,g,D.start,D.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=t.get(h);m&&(r.deleteBuffer(m.buffer),t.delete(h))}function u(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=t.get(h);(!g||g.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=t.get(h);if(p===void 0)t.set(h,n(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,h,m),p.version=h.version}}return{get:o,remove:c,update:u}}var mE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gE=`#ifdef USE_ALPHAHASH
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
#endif`,vE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_E=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,SE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yE=`#ifdef USE_AOMAP
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
#endif`,ME=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,EE=`#ifdef USE_BATCHING
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
#endif`,bE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,TE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,AE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,RE=`#ifdef USE_IRIDESCENCE
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
#endif`,CE=`#ifdef USE_BUMPMAP
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
#endif`,DE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,UE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,LE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,NE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,OE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,PE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,IE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,BE=`#define PI 3.141592653589793
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
} // validated`,FE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,HE=`vec3 transformedNormal = objectNormal;
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
#endif`,GE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,VE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,WE="gl_FragColor = linearToOutputTexel( gl_FragColor );",qE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,YE=`#ifdef USE_ENVMAP
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
#endif`,ZE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,KE=`#ifdef USE_ENVMAP
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
#endif`,JE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,QE=`#ifdef USE_ENVMAP
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
#endif`,jE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$E=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,eb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nb=`#ifdef USE_GRADIENTMAP
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
}`,ib=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ab=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ob=`#ifdef USE_ENVMAP
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
#endif`,lb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ub=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hb=`PhysicalMaterial material;
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
#endif`,db=`uniform sampler2D dfgLUT;
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
}`,pb=`
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
#endif`,mb=`#if defined( RE_IndirectDiffuse )
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
#endif`,gb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,_b=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Eb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tb=`#if defined( USE_POINTS_UV )
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
#endif`,Ab=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Db=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ub=`#ifdef USE_MORPHTARGETS
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
#endif`,Lb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ob=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ib=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bb=`#ifdef USE_NORMALMAP
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
#endif`,Fb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$b=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tT=`float getShadowMask() {
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
}`,eT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nT=`#ifdef USE_SKINNING
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
#endif`,iT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,aT=`#ifdef USE_SKINNING
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
#endif`,sT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cT=`#ifdef USE_TRANSMISSION
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
#endif`,uT=`#ifdef USE_TRANSMISSION
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
#endif`,fT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gT=`uniform sampler2D t2D;
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
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_T=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ST=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yT=`#include <common>
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
}`,MT=`#if DEPTH_PACKING == 3200
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
}`,ET=`#define DISTANCE
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
}`,bT=`#define DISTANCE
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
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,AT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wT=`uniform float scale;
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
}`,RT=`uniform vec3 diffuse;
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
}`,CT=`#include <common>
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
}`,DT=`uniform vec3 diffuse;
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
}`,UT=`#define LAMBERT
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
}`,LT=`#define LAMBERT
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
}`,NT=`#define MATCAP
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
}`,OT=`#define MATCAP
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
}`,PT=`#define NORMAL
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
}`,IT=`#define NORMAL
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
}`,zT=`#define PHONG
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
}`,BT=`#define PHONG
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
}`,FT=`#define STANDARD
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
}`,HT=`#define STANDARD
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
}`,GT=`#define TOON
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
}`,VT=`#define TOON
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
}`,kT=`uniform float size;
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
}`,XT=`uniform vec3 diffuse;
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
}`,WT=`#include <common>
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
}`,qT=`uniform vec3 color;
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
}`,YT=`uniform float rotation;
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
}`,ZT=`uniform vec3 diffuse;
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
}`,be={alphahash_fragment:mE,alphahash_pars_fragment:gE,alphamap_fragment:vE,alphamap_pars_fragment:_E,alphatest_fragment:xE,alphatest_pars_fragment:SE,aomap_fragment:yE,aomap_pars_fragment:ME,batching_pars_vertex:EE,batching_vertex:bE,begin_vertex:TE,beginnormal_vertex:AE,bsdfs:wE,iridescence_fragment:RE,bumpmap_pars_fragment:CE,clipping_planes_fragment:DE,clipping_planes_pars_fragment:UE,clipping_planes_pars_vertex:LE,clipping_planes_vertex:NE,color_fragment:OE,color_pars_fragment:PE,color_pars_vertex:IE,color_vertex:zE,common:BE,cube_uv_reflection_fragment:FE,defaultnormal_vertex:HE,displacementmap_pars_vertex:GE,displacementmap_vertex:VE,emissivemap_fragment:kE,emissivemap_pars_fragment:XE,colorspace_fragment:WE,colorspace_pars_fragment:qE,envmap_fragment:YE,envmap_common_pars_fragment:ZE,envmap_pars_fragment:KE,envmap_pars_vertex:JE,envmap_physical_pars_fragment:ob,envmap_vertex:QE,fog_vertex:jE,fog_pars_vertex:$E,fog_fragment:tb,fog_pars_fragment:eb,gradientmap_pars_fragment:nb,lightmap_pars_fragment:ib,lights_lambert_fragment:ab,lights_lambert_pars_fragment:sb,lights_pars_begin:rb,lights_toon_fragment:lb,lights_toon_pars_fragment:cb,lights_phong_fragment:ub,lights_phong_pars_fragment:fb,lights_physical_fragment:hb,lights_physical_pars_fragment:db,lights_fragment_begin:pb,lights_fragment_maps:mb,lights_fragment_end:gb,lightprobes_pars_fragment:vb,logdepthbuf_fragment:_b,logdepthbuf_pars_fragment:xb,logdepthbuf_pars_vertex:Sb,logdepthbuf_vertex:yb,map_fragment:Mb,map_pars_fragment:Eb,map_particle_fragment:bb,map_particle_pars_fragment:Tb,metalnessmap_fragment:Ab,metalnessmap_pars_fragment:wb,morphinstance_vertex:Rb,morphcolor_vertex:Cb,morphnormal_vertex:Db,morphtarget_pars_vertex:Ub,morphtarget_vertex:Lb,normal_fragment_begin:Nb,normal_fragment_maps:Ob,normal_pars_fragment:Pb,normal_pars_vertex:Ib,normal_vertex:zb,normalmap_pars_fragment:Bb,clearcoat_normal_fragment_begin:Fb,clearcoat_normal_fragment_maps:Hb,clearcoat_pars_fragment:Gb,iridescence_pars_fragment:Vb,opaque_fragment:kb,packing:Xb,premultiplied_alpha_fragment:Wb,project_vertex:qb,dithering_fragment:Yb,dithering_pars_fragment:Zb,roughnessmap_fragment:Kb,roughnessmap_pars_fragment:Jb,shadowmap_pars_fragment:Qb,shadowmap_pars_vertex:jb,shadowmap_vertex:$b,shadowmask_pars_fragment:tT,skinbase_vertex:eT,skinning_pars_vertex:nT,skinning_vertex:iT,skinnormal_vertex:aT,specularmap_fragment:sT,specularmap_pars_fragment:rT,tonemapping_fragment:oT,tonemapping_pars_fragment:lT,transmission_fragment:cT,transmission_pars_fragment:uT,uv_pars_fragment:fT,uv_pars_vertex:hT,uv_vertex:dT,worldpos_vertex:pT,background_vert:mT,background_frag:gT,backgroundCube_vert:vT,backgroundCube_frag:_T,cube_vert:xT,cube_frag:ST,depth_vert:yT,depth_frag:MT,distance_vert:ET,distance_frag:bT,equirect_vert:TT,equirect_frag:AT,linedashed_vert:wT,linedashed_frag:RT,meshbasic_vert:CT,meshbasic_frag:DT,meshlambert_vert:UT,meshlambert_frag:LT,meshmatcap_vert:NT,meshmatcap_frag:OT,meshnormal_vert:PT,meshnormal_frag:IT,meshphong_vert:zT,meshphong_frag:BT,meshphysical_vert:FT,meshphysical_frag:HT,meshtoon_vert:GT,meshtoon_frag:VT,points_vert:kT,points_frag:XT,shadow_vert:WT,shadow_frag:qT,sprite_vert:YT,sprite_frag:ZT},Wt={common:{diffuse:{value:new ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ge}},envmap:{envMap:{value:null},envMapRotation:{value:new ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ge},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Z},probesMax:{value:new Z},probesResolution:{value:new Z}},points:{diffuse:{value:new ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0},uvTransform:{value:new ge}},sprite:{diffuse:{value:new ve(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}}},ji={basic:{uniforms:Wn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.fog]),vertexShader:be.meshbasic_vert,fragmentShader:be.meshbasic_frag},lambert:{uniforms:Wn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new ve(0)},envMapIntensity:{value:1}}]),vertexShader:be.meshlambert_vert,fragmentShader:be.meshlambert_frag},phong:{uniforms:Wn([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new ve(0)},specular:{value:new ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:be.meshphong_vert,fragmentShader:be.meshphong_frag},standard:{uniforms:Wn([Wt.common,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.roughnessmap,Wt.metalnessmap,Wt.fog,Wt.lights,{emissive:{value:new ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:be.meshphysical_vert,fragmentShader:be.meshphysical_frag},toon:{uniforms:Wn([Wt.common,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.gradientmap,Wt.fog,Wt.lights,{emissive:{value:new ve(0)}}]),vertexShader:be.meshtoon_vert,fragmentShader:be.meshtoon_frag},matcap:{uniforms:Wn([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,{matcap:{value:null}}]),vertexShader:be.meshmatcap_vert,fragmentShader:be.meshmatcap_frag},points:{uniforms:Wn([Wt.points,Wt.fog]),vertexShader:be.points_vert,fragmentShader:be.points_frag},dashed:{uniforms:Wn([Wt.common,Wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:be.linedashed_vert,fragmentShader:be.linedashed_frag},depth:{uniforms:Wn([Wt.common,Wt.displacementmap]),vertexShader:be.depth_vert,fragmentShader:be.depth_frag},normal:{uniforms:Wn([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,{opacity:{value:1}}]),vertexShader:be.meshnormal_vert,fragmentShader:be.meshnormal_frag},sprite:{uniforms:Wn([Wt.sprite,Wt.fog]),vertexShader:be.sprite_vert,fragmentShader:be.sprite_frag},background:{uniforms:{uvTransform:{value:new ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:be.background_vert,fragmentShader:be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ge}},vertexShader:be.backgroundCube_vert,fragmentShader:be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:be.cube_vert,fragmentShader:be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:be.equirect_vert,fragmentShader:be.equirect_frag},distance:{uniforms:Wn([Wt.common,Wt.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:be.distance_vert,fragmentShader:be.distance_frag},shadow:{uniforms:Wn([Wt.lights,Wt.fog,{color:{value:new ve(0)},opacity:{value:1}}]),vertexShader:be.shadow_vert,fragmentShader:be.shadow_frag}};ji.physical={uniforms:Wn([ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ge},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ge},sheen:{value:0},sheenColor:{value:new ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ge},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ge},attenuationDistance:{value:0},attenuationColor:{value:new ve(0)},specularColor:{value:new ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ge},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ge}}]),vertexShader:be.meshphysical_vert,fragmentShader:be.meshphysical_frag};const au={r:0,b:0,g:0},KT=new Ge,Rx=new ge;Rx.set(-1,0,0,0,1,0,0,0,1);function JT(r,t,n,a,o,c){const u=new ve(0);let h=o===!0?0:1,m,p,g=null,_=0,v=null;function x(I){let z=I.isScene===!0?I.background:null;if(z&&z.isTexture){const A=I.backgroundBlurriness>0;z=t.get(z,A)}return z}function b(I){let z=!1;const A=x(I);A===null?M(u,h):A&&A.isColor&&(M(A,1),z=!0);const O=r.xr.getEnvironmentBlendMode();O==="additive"?n.buffers.color.setClear(0,0,0,1,c):O==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||z)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function D(I,z){const A=x(z);A&&(A.isCubeTexture||A.mapping===Au)?(p===void 0&&(p=new je(new ki(1,1,1),new Ui({name:"BackgroundCubeMaterial",uniforms:Qr(ji.backgroundCube.uniforms),vertexShader:ji.backgroundCube.vertexShader,fragmentShader:ji.backgroundCube.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(O,w,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=A,p.material.uniforms.backgroundBlurriness.value=z.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(KT.makeRotationFromEuler(z.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(Rx),p.material.toneMapped=Le.getTransfer(A.colorSpace)!==Xe,(g!==A||_!==A.version||v!==r.toneMapping)&&(p.material.needsUpdate=!0,g=A,_=A.version,v=r.toneMapping),p.layers.enableAll(),I.unshift(p,p.geometry,p.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new je(new vi(2,2),new Ui({name:"BackgroundMaterial",uniforms:Qr(ji.background.uniforms),vertexShader:ji.background.vertexShader,fragmentShader:ji.background.fragmentShader,side:Hs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=z.backgroundIntensity,m.material.toneMapped=Le.getTransfer(A.colorSpace)!==Xe,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||_!==A.version||v!==r.toneMapping)&&(m.material.needsUpdate=!0,g=A,_=A.version,v=r.toneMapping),m.layers.enableAll(),I.unshift(m,m.geometry,m.material,0,0,null))}function M(I,z){I.getRGB(au,bx(r)),n.buffers.color.setClear(au.r,au.g,au.b,z,c)}function S(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(I,z=1){u.set(I),h=z,M(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(I){h=I,M(u,h)},render:b,addToRenderList:D,dispose:S}}function QT(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=v(null);let c=o,u=!1;function h(W,Y,j,F,q){let B=!1;const P=_(W,F,j,Y);c!==P&&(c=P,p(c.object)),B=x(W,F,j,q),B&&b(W,F,j,q),q!==null&&t.update(q,r.ELEMENT_ARRAY_BUFFER),(B||u)&&(u=!1,A(W,Y,j,F),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function m(){return r.createVertexArray()}function p(W){return r.bindVertexArray(W)}function g(W){return r.deleteVertexArray(W)}function _(W,Y,j,F){const q=F.wireframe===!0;let B=a[Y.id];B===void 0&&(B={},a[Y.id]=B);const P=W.isInstancedMesh===!0?W.id:0;let k=B[P];k===void 0&&(k={},B[P]=k);let V=k[j.id];V===void 0&&(V={},k[j.id]=V);let X=V[q];return X===void 0&&(X=v(m()),V[q]=X),X}function v(W){const Y=[],j=[],F=[];for(let q=0;q<n;q++)Y[q]=0,j[q]=0,F[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:j,attributeDivisors:F,object:W,attributes:{},index:null}}function x(W,Y,j,F){const q=c.attributes,B=Y.attributes;let P=0;const k=j.getAttributes();for(const V in k)if(k[V].location>=0){const R=q[V];let J=B[V];if(J===void 0&&(V==="instanceMatrix"&&W.instanceMatrix&&(J=W.instanceMatrix),V==="instanceColor"&&W.instanceColor&&(J=W.instanceColor)),R===void 0||R.attribute!==J||J&&R.data!==J.data)return!0;P++}return c.attributesNum!==P||c.index!==F}function b(W,Y,j,F){const q={},B=Y.attributes;let P=0;const k=j.getAttributes();for(const V in k)if(k[V].location>=0){let R=B[V];R===void 0&&(V==="instanceMatrix"&&W.instanceMatrix&&(R=W.instanceMatrix),V==="instanceColor"&&W.instanceColor&&(R=W.instanceColor));const J={};J.attribute=R,R&&R.data&&(J.data=R.data),q[V]=J,P++}c.attributes=q,c.attributesNum=P,c.index=F}function D(){const W=c.newAttributes;for(let Y=0,j=W.length;Y<j;Y++)W[Y]=0}function M(W){S(W,0)}function S(W,Y){const j=c.newAttributes,F=c.enabledAttributes,q=c.attributeDivisors;j[W]=1,F[W]===0&&(r.enableVertexAttribArray(W),F[W]=1),q[W]!==Y&&(r.vertexAttribDivisor(W,Y),q[W]=Y)}function I(){const W=c.newAttributes,Y=c.enabledAttributes;for(let j=0,F=Y.length;j<F;j++)Y[j]!==W[j]&&(r.disableVertexAttribArray(j),Y[j]=0)}function z(W,Y,j,F,q,B,P){P===!0?r.vertexAttribIPointer(W,Y,j,q,B):r.vertexAttribPointer(W,Y,j,F,q,B)}function A(W,Y,j,F){D();const q=F.attributes,B=j.getAttributes(),P=Y.defaultAttributeValues;for(const k in B){const V=B[k];if(V.location>=0){let X=q[k];if(X===void 0&&(k==="instanceMatrix"&&W.instanceMatrix&&(X=W.instanceMatrix),k==="instanceColor"&&W.instanceColor&&(X=W.instanceColor)),X!==void 0){const R=X.normalized,J=X.itemSize,rt=t.get(X);if(rt===void 0)continue;const xt=rt.buffer,Lt=rt.type,Pt=rt.bytesPerElement,nt=Lt===r.INT||Lt===r.UNSIGNED_INT||X.gpuType===gp;if(X.isInterleavedBufferAttribute){const dt=X.data,wt=dt.stride,ee=X.offset;if(dt.isInstancedInterleavedBuffer){for(let Bt=0;Bt<V.locationSize;Bt++)S(V.location+Bt,dt.meshPerAttribute);W.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Bt=0;Bt<V.locationSize;Bt++)M(V.location+Bt);r.bindBuffer(r.ARRAY_BUFFER,xt);for(let Bt=0;Bt<V.locationSize;Bt++)z(V.location+Bt,J/V.locationSize,Lt,R,wt*Pt,(ee+J/V.locationSize*Bt)*Pt,nt)}else{if(X.isInstancedBufferAttribute){for(let dt=0;dt<V.locationSize;dt++)S(V.location+dt,X.meshPerAttribute);W.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let dt=0;dt<V.locationSize;dt++)M(V.location+dt);r.bindBuffer(r.ARRAY_BUFFER,xt);for(let dt=0;dt<V.locationSize;dt++)z(V.location+dt,J/V.locationSize,Lt,R,J*Pt,J/V.locationSize*dt*Pt,nt)}}else if(P!==void 0){const R=P[k];if(R!==void 0)switch(R.length){case 2:r.vertexAttrib2fv(V.location,R);break;case 3:r.vertexAttrib3fv(V.location,R);break;case 4:r.vertexAttrib4fv(V.location,R);break;default:r.vertexAttrib1fv(V.location,R)}}}}I()}function O(){L();for(const W in a){const Y=a[W];for(const j in Y){const F=Y[j];for(const q in F){const B=F[q];for(const P in B)g(B[P].object),delete B[P];delete F[q]}}delete a[W]}}function w(W){if(a[W.id]===void 0)return;const Y=a[W.id];for(const j in Y){const F=Y[j];for(const q in F){const B=F[q];for(const P in B)g(B[P].object),delete B[P];delete F[q]}}delete a[W.id]}function N(W){for(const Y in a){const j=a[Y];for(const F in j){const q=j[F];if(q[W.id]===void 0)continue;const B=q[W.id];for(const P in B)g(B[P].object),delete B[P];delete q[W.id]}}}function E(W){for(const Y in a){const j=a[Y],F=W.isInstancedMesh===!0?W.id:0,q=j[F];if(q!==void 0){for(const B in q){const P=q[B];for(const k in P)g(P[k].object),delete P[k];delete q[B]}delete j[F],Object.keys(j).length===0&&delete a[Y]}}}function L(){H(),u=!0,c!==o&&(c=o,p(c.object))}function H(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:L,resetDefaultState:H,dispose:O,releaseStatesOfGeometry:w,releaseStatesOfObject:E,releaseStatesOfProgram:N,initAttributes:D,enableAttribute:M,disableUnusedAttributes:I}}function jT(r,t,n){let a;function o(m){a=m}function c(m,p){r.drawArrays(a,m,p),n.update(p,a,1)}function u(m,p,g){g!==0&&(r.drawArraysInstanced(a,m,p,g),n.update(p,a,g))}function h(m,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,p,0,g);let v=0;for(let x=0;x<g;x++)v+=p[x];n.update(v,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function $T(r,t,n,a){let o;function c(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const N=t.get("EXT_texture_filter_anisotropic");o=r.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(N){return!(N!==Gi&&a.convert(N)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(N){const E=N===Di&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(N!==gi&&N!==Hi&&!E&&a.convert(N)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(N){if(N==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const g=m(p);g!==p&&(de("WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=n.logarithmicDepthBuffer===!0,v=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&v===!1&&de("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),I=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),z=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),O=r.getParameter(r.MAX_SAMPLES),w=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:x,maxVertexTextures:b,maxTextureSize:D,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:I,maxVaryings:z,maxFragmentUniforms:A,maxSamples:O,samples:w}}function tA(r){const t=this;let n=null,a=0,o=!1,c=!1;const u=new Ra,h=new ge,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const x=_.length!==0||v||a!==0||o;return o=v,a=_.length,x},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,v){n=g(_,v,0)},this.setState=function(_,v,x){const b=_.clippingPlanes,D=_.clipIntersection,M=_.clipShadows,S=r.get(_);if(!o||b===null||b.length===0||c&&!M)c?g(null):p();else{const I=c?0:a,z=I*4;let A=S.clippingState||null;m.value=A,A=g(b,v,z,x);for(let O=0;O!==z;++O)A[O]=n[O];S.clippingState=A,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=I}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(_,v,x,b){const D=_!==null?_.length:0;let M=null;if(D!==0){if(M=m.value,b!==!0||M===null){const S=x+D*4,I=v.matrixWorldInverse;h.getNormalMatrix(I),(M===null||M.length<S)&&(M=new Float32Array(S));for(let z=0,A=x;z!==D;++z,A+=4)u.copy(_[z]).applyMatrix4(I,h),u.normal.toArray(M,A),M[A+3]=u.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=D,t.numIntersection=0,M}}const Xr=4,eA=6,nA=20,iA=256,tl=new Ip,v_=new ve;let gd=null,vd=0,_d=0,xd=!1;const aA=new Z,Is=new Z;class cp{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,o=100,c={}){const{size:u=256,position:h=aA}=c;gd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),_d=this._renderer.getActiveMipmapLevel(),xd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,a,o,m,h),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=S_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=x_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(gd,vd,_d),this._renderer.xr.enabled=xd,t.scissorTest=!1,Fr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Gs||t.mapping===Yr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),_d=this._renderer.getActiveMipmapLevel(),xd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:Di,format:Gi,colorSpace:xu,depthBuffer:!1},o=__(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=__(t,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=sA(c)),this._blurMaterial=oA(c,t,n),this._ggxMaterial=rA(c,t,n)}return o}_compileMaterial(t){const n=new je(new Tn,t);this._renderer.compile(n,tl)}_sceneToCubeUV(t,n,a,o,c){const m=new ii(90,1,n,a),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,x=_.toneMapping;_.getClearColor(v_),_.toneMapping=ta,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new je(new ki,new ml({name:"PMREM.Background",side:Zn,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,M=D.material;let S=!1;const I=t.background;I?I.isColor&&(M.color.copy(I),t.background=null,S=!0):(M.color.copy(v_),S=!0);for(let z=0;z<6;z++){const A=z%3;A===0?(m.up.set(0,p[z],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+g[z],c.y,c.z)):A===1?(m.up.set(0,0,p[z]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+g[z],c.z)):(m.up.set(0,p[z],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+g[z]));const O=this._cubeSize;Fr(o,A*O,z>2?O:0,O,O),_.setRenderTarget(o),S&&_.render(D,m),_.render(t,m)}_.toneMapping=x,_.autoClear=v,t.background=I}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===Gs||t.mapping===Yr;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=S_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=x_());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const h=c.uniforms;h.envMap.value=t;const m=this._cubeSize;Fr(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(u,tl)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=a}_applyGGXFilter(t,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,h=this._lodMeshes[a];h.material=u;const m=u.uniforms,p=a/(this._lodMeshes.length-1),g=n/(this._lodMeshes.length-1),_=Math.sqrt(p*p-g*g),v=p*1.25,x=_*v,{_lodMax:b}=this,D=this._sizeLods[a],M=3*D*(a>b-Xr?a-b+Xr:0),S=4*(this._cubeSize-D);m.envMap.value=t.texture,m.roughness.value=x,m.mipInt.value=b-n,Fr(c,M,S,3*D,2*D),o.setRenderTarget(c),o.render(h,tl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=b-a,Fr(t,M,S,3*D,2*D),o.setRenderTarget(t),o.render(h,tl)}_blur(t,n,a,o){const c=this._pingPongRenderTarget,u=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(t,c,n,a,u),this._blurPass(c,t,a,a,u)}_blurPass(t,n,a,o,c){const u=this._renderer,h=this._blurMaterial,m=this._lodMeshes[o];m.material=h;const p=h.uniforms;p.envMap.value=t.texture,p.sigma.value=c,p.mipInt.value=this._lodMax-a;const g=this._sizeLods[o],_=3*g*(o>this._lodMax-Xr?o-this._lodMax+Xr:0),v=4*(this._cubeSize-g);Fr(n,_,v,3*g,2*g),u.setRenderTarget(n),u.render(m,tl)}}function sA(r){const t=[],n=[];let a=r;const o=r-Xr+1+eA;for(let c=0;c<o;c++){const u=Math.pow(2,a);t.push(u);const h=1/(u-2),m=-h,p=1+h,g=[m,m,p,m,p,p,m,m,p,p,m,p],_=6,v=6,x=3,b=new Float32Array(x*v*_),D=new Float32Array(x*v*_);for(let S=0;S<_;S++){const I=S%3*2/3-1,z=S>2?0:-1,A=[I,z,0,I+2/3,z,0,I+2/3,z+1,0,I,z,0,I+2/3,z+1,0,I,z+1,0];b.set(A,x*v*S);for(let O=0;O<v;O++){const w=g[O*2]*2-1,N=g[O*2+1]*2-1;S===0?Is.set(1,N,w):S===1?Is.set(-w,1,-N):S===2?Is.set(-w,N,1):S===3?Is.set(-1,N,-w):S===4?Is.set(-w,-1,N):Is.set(w,N,-1),Is.toArray(D,(S*v+O)*x)}}const M=new Tn;M.setAttribute("position",new Vi(b,x)),M.setAttribute("outputDirection",new Vi(D,x)),n.push(new je(M,null)),a>Xr&&a--}return{lodMeshes:n,sizeLods:t}}function __(r,t,n){const a=new _i(r,t,n);return a.texture.mapping=Au,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Fr(r,t,n,a,o){r.viewport.set(t,n,a,o),r.scissor.set(t,n,a,o)}function rA(r,t,n){return new Ui({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:iA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Cu(),fragmentShader:`

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
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function oA(r,t,n){return new Ui({name:"SphericalGaussianBlur",defines:{SAMPLES:nA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Cu(),fragmentShader:`

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
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function x_(){return new Ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cu(),fragmentShader:`

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
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function S_(){return new Ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function Cu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Cx extends _i{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new hx(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new ki(5,5,5),c=new Ui({name:"CubemapFromEquirect",uniforms:Qr(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Zn,blending:Ua});c.uniforms.tEquirect.value=n;const u=new je(o,c),h=n.minFilter;return n.minFilter===zs&&(n.minFilter=Fn),new uE(1,10,this).update(t,u),n.minFilter=h,u.geometry.dispose(),u.material.dispose(),this}clear(t,n=!0,a=!0,o=!0){const c=t.getRenderTarget();for(let u=0;u<6;u++)t.setRenderTarget(this,u),t.clear(n,a,o);t.setRenderTarget(c)}}function lA(r){let t=new WeakMap,n=new WeakMap,a=null;function o(v,x=!1){return v==null?null:x?u(v):c(v)}function c(v){if(v&&v.isTexture){const x=v.mapping;if(x===Vh||x===kh)if(t.has(v)){const b=t.get(v).texture;return h(b,v.mapping)}else{const b=v.image;if(b&&b.height>0){const D=new Cx(b.height);return D.fromEquirectangularTexture(r,v),t.set(v,D),v.addEventListener("dispose",p),h(D.texture,v.mapping)}else return null}}return v}function u(v){if(v&&v.isTexture){const x=v.mapping,b=x===Vh||x===kh,D=x===Gs||x===Yr;if(b||D){let M=n.get(v);const S=M!==void 0?M.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==S)return a===null&&(a=new cp(r)),M=b?a.fromEquirectangular(v,M):a.fromCubemap(v,M),M.texture.pmremVersion=v.pmremVersion,n.set(v,M),M.texture;if(M!==void 0)return M.texture;{const I=v.image;return b&&I&&I.height>0||D&&I&&m(I)?(a===null&&(a=new cp(r)),M=b?a.fromEquirectangular(v):a.fromCubemap(v),M.texture.pmremVersion=v.pmremVersion,n.set(v,M),v.addEventListener("dispose",g),M.texture):null}}}return v}function h(v,x){return x===Vh?v.mapping=Gs:x===kh&&(v.mapping=Yr),v}function m(v){let x=0;const b=6;for(let D=0;D<b;D++)v[D]!==void 0&&x++;return x===b}function p(v){const x=v.target;x.removeEventListener("dispose",p);const b=t.get(x);b!==void 0&&(t.delete(x),b.dispose())}function g(v){const x=v.target;x.removeEventListener("dispose",g);const b=n.get(x);b!==void 0&&(n.delete(x),b.dispose())}function _(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function cA(r){const t={};function n(a){if(t[a]!==void 0)return t[a];const o=r.getExtension(a);return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&Wr("WebGLRenderer: "+a+" extension not supported."),o}}}function uA(r,t,n,a){const o={},c=new WeakMap;function u(_){const v=_.target;v.index!==null&&t.remove(v.index);for(const b in v.attributes)t.remove(v.attributes[b]);v.removeEventListener("dispose",u),delete o[v.id];const x=c.get(v);x&&(t.remove(x),c.delete(v)),a.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function h(_,v){return o[v.id]===!0||(v.addEventListener("dispose",u),o[v.id]=!0,n.memory.geometries++),v}function m(_){const v=_.attributes;for(const x in v)t.update(v[x],r.ARRAY_BUFFER)}function p(_){const v=[],x=_.index,b=_.attributes.position;let D=0;if(b===void 0)return;if(x!==null){const I=x.array;D=x.version;for(let z=0,A=I.length;z<A;z+=3){const O=I[z+0],w=I[z+1],N=I[z+2];v.push(O,w,w,N,N,O)}}else{const I=b.array;D=b.version;for(let z=0,A=I.length/3-1;z<A;z+=3){const O=z+0,w=z+1,N=z+2;v.push(O,w,w,N,N,O)}}const M=new(b.count>=65535?cx:lx)(v,1);M.version=D;const S=c.get(_);S&&t.remove(S),c.set(_,M)}function g(_){const v=c.get(_);if(v){const x=_.index;x!==null&&v.version<x.version&&p(_)}else p(_);return c.get(_)}return{get:h,update:m,getWireframeAttribute:g}}function fA(r,t,n){let a;function o(_){a=_}let c,u;function h(_){c=_.type,u=_.bytesPerElement}function m(_,v){r.drawElements(a,v,c,_*u),n.update(v,a,1)}function p(_,v,x){x!==0&&(r.drawElementsInstanced(a,v,c,_*u,x),n.update(v,a,x))}function g(_,v,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,v,0,c,_,0,x);let D=0;for(let M=0;M<x;M++)D+=v[M];n.update(D,a,1)}this.setMode=o,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=g}function hA(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,h){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:Ne("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function dA(r,t,n){const a=new WeakMap,o=new nn;function c(u,h,m){const p=u.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let v=a.get(h);if(v===void 0||v.count!==_){let L=function(){N.dispose(),a.delete(h),h.removeEventListener("dispose",L)};v!==void 0&&v.texture.dispose();const x=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,D=h.morphAttributes.color!==void 0,M=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],I=h.morphAttributes.color||[];let z=0;x===!0&&(z=1),b===!0&&(z=2),D===!0&&(z=3);let A=h.attributes.position.count*z,O=1;A>t.maxTextureSize&&(O=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const w=new Float32Array(A*O*4*_),N=new sx(w,A,O,_);N.type=Hi,N.needsUpdate=!0;const E=z*4;for(let H=0;H<_;H++){const W=M[H],Y=S[H],j=I[H],F=A*O*4*H;for(let q=0;q<W.count;q++){const B=q*E;x===!0&&(o.fromBufferAttribute(W,q),w[F+B+0]=o.x,w[F+B+1]=o.y,w[F+B+2]=o.z,w[F+B+3]=0),b===!0&&(o.fromBufferAttribute(Y,q),w[F+B+4]=o.x,w[F+B+5]=o.y,w[F+B+6]=o.z,w[F+B+7]=0),D===!0&&(o.fromBufferAttribute(j,q),w[F+B+8]=o.x,w[F+B+9]=o.y,w[F+B+10]=o.z,w[F+B+11]=j.itemSize===4?o.w:1)}}v={count:_,texture:N,size:new zt(A,O)},a.set(h,v),h.addEventListener("dispose",L)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let x=0;for(let D=0;D<p.length;D++)x+=p[D];const b=h.morphTargetsRelative?1:1-x;m.getUniforms().setValue(r,"morphTargetBaseInfluence",b),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",v.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:c}}function pA(r,t,n,a,o){let c=new WeakMap;function u(p){const g=o.render.frame,_=p.geometry,v=t.get(p,_);if(c.get(v)!==g&&(t.update(v),c.set(v,g)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==g&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,g))),p.isSkinnedMesh){const x=p.skeleton;c.get(x)!==g&&(x.update(),c.set(x,g))}return v}function h(){c=new WeakMap}function m(p){const g=p.target;g.removeEventListener("dispose",m),a.releaseStatesOfObject(g),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:u,dispose:h}}const mA={[W_]:"LINEAR_TONE_MAPPING",[q_]:"REINHARD_TONE_MAPPING",[Y_]:"CINEON_TONE_MAPPING",[mp]:"ACES_FILMIC_TONE_MAPPING",[K_]:"AGX_TONE_MAPPING",[J_]:"NEUTRAL_TONE_MAPPING",[Z_]:"CUSTOM_TONE_MAPPING"};function gA(r,t,n,a,o,c){const u=new _i(t,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,m=null;const p=new Tn;p.setAttribute("position",new Oe([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new Oe([0,2,0,0,2,0],2));const g=new eE({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new je(p,g),v=new Ip(-1,1,1,-1,0,1);let x=null,b=null,D=!1,M,S=null,I=[],z=!1;this.setSize=function(A,O){u.setSize(A,O),h!==null&&h.setSize(A,O),m!==null&&m.setSize(A,O);for(let w=0;w<I.length;w++){const N=I[w];N.setSize&&N.setSize(A,O)}},this.setEffects=function(A){I=A,z=I.length>0&&I[0].isRenderPass===!0;const O=u.width,w=u.height;I.length>0&&h===null&&(h=new _i(O,w,{type:Di,depthBuffer:!1,stencilBuffer:!1}),m=new _i(O,w,{type:Di,depthBuffer:!1,stencilBuffer:!1}));for(let N=0;N<I.length;N++){const E=I[N];E.setSize&&E.setSize(O,w)}},this.begin=function(A,O){if(D||A.toneMapping===ta&&I.length===0)return!1;if(S=O,O!==null){const w=O.width,N=O.height;(u.width!==w||u.height!==N)&&this.setSize(w,N)}return z===!1&&A.setRenderTarget(u),M=A.toneMapping,A.toneMapping=ta,!0},this.hasRenderPass=function(){return z},this.end=function(A,O){A.toneMapping=M,D=!0;let w=u,N=h;for(let E=0;E<I.length;E++){const L=I[E];L.enabled!==!1&&(L.render(A,N,w,O),L.needsSwap!==!1&&(w=N,N=N===h?m:h))}if(x!==A.outputColorSpace||b!==A.toneMapping){x=A.outputColorSpace,b=A.toneMapping,g.defines={},Le.getTransfer(x)===Xe&&(g.defines.SRGB_TRANSFER="");const E=mA[b];E&&(g.defines[E]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=w.texture,A.setRenderTarget(S),A.render(_,v),S=null,D=!1},this.isCompositing=function(){return D},this.dispose=function(){u.dispose(),h!==null&&h.dispose(),m!==null&&m.dispose(),p.dispose(),g.dispose()}}const Dx=new Hn,up=new gl(1,1),Ux=new sx,Lx=new i1,Nx=new hx,y_=[],M_=[],E_=new Float32Array(16),b_=new Float32Array(9),T_=new Float32Array(4);function $r(r,t,n){const a=r[0];if(a<=0||a>0)return r;const o=t*n;let c=y_[o];if(c===void 0&&(c=new Float32Array(o),y_[o]=c),t!==0){a.toArray(c,0);for(let u=1,h=0;u!==t;++u)h+=n,r[u].toArray(c,h)}return c}function En(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function bn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Du(r,t){let n=M_[t];n===void 0&&(n=new Int32Array(t),M_[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function vA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function _A(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2fv(this.addr,t),bn(n,t)}}function xA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(En(n,t))return;r.uniform3fv(this.addr,t),bn(n,t)}}function SA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4fv(this.addr,t),bn(n,t)}}function yA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;T_.set(a),r.uniformMatrix2fv(this.addr,!1,T_),bn(n,a)}}function MA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;b_.set(a),r.uniformMatrix3fv(this.addr,!1,b_),bn(n,a)}}function EA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;E_.set(a),r.uniformMatrix4fv(this.addr,!1,E_),bn(n,a)}}function bA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function TA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2iv(this.addr,t),bn(n,t)}}function AA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(En(n,t))return;r.uniform3iv(this.addr,t),bn(n,t)}}function wA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4iv(this.addr,t),bn(n,t)}}function RA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function CA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2uiv(this.addr,t),bn(n,t)}}function DA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(En(n,t))return;r.uniform3uiv(this.addr,t),bn(n,t)}}function UA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4uiv(this.addr,t),bn(n,t)}}function LA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(up.compareFunction=n.isReversedDepthBuffer()?bp:Ep,c=up):c=Dx,n.setTexture2D(t||c,o)}function NA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||Lx,o)}function OA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||Nx,o)}function PA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||Ux,o)}function IA(r){switch(r){case 5126:return vA;case 35664:return _A;case 35665:return xA;case 35666:return SA;case 35674:return yA;case 35675:return MA;case 35676:return EA;case 5124:case 35670:return bA;case 35667:case 35671:return TA;case 35668:case 35672:return AA;case 35669:case 35673:return wA;case 5125:return RA;case 36294:return CA;case 36295:return DA;case 36296:return UA;case 35678:case 36198:case 36298:case 36306:case 35682:return LA;case 35679:case 36299:case 36307:return NA;case 35680:case 36300:case 36308:case 36293:return OA;case 36289:case 36303:case 36311:case 36292:return PA}}function zA(r,t){r.uniform1fv(this.addr,t)}function BA(r,t){const n=$r(t,this.size,2);r.uniform2fv(this.addr,n)}function FA(r,t){const n=$r(t,this.size,3);r.uniform3fv(this.addr,n)}function HA(r,t){const n=$r(t,this.size,4);r.uniform4fv(this.addr,n)}function GA(r,t){const n=$r(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function VA(r,t){const n=$r(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function kA(r,t){const n=$r(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function XA(r,t){r.uniform1iv(this.addr,t)}function WA(r,t){r.uniform2iv(this.addr,t)}function qA(r,t){r.uniform3iv(this.addr,t)}function YA(r,t){r.uniform4iv(this.addr,t)}function ZA(r,t){r.uniform1uiv(this.addr,t)}function KA(r,t){r.uniform2uiv(this.addr,t)}function JA(r,t){r.uniform3uiv(this.addr,t)}function QA(r,t){r.uniform4uiv(this.addr,t)}function jA(r,t,n){const a=this.cache,o=t.length,c=Du(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=up:u=Dx;for(let h=0;h!==o;++h)n.setTexture2D(t[h]||u,c[h])}function $A(r,t,n){const a=this.cache,o=t.length,c=Du(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTexture3D(t[u]||Lx,c[u])}function t2(r,t,n){const a=this.cache,o=t.length,c=Du(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTextureCube(t[u]||Nx,c[u])}function e2(r,t,n){const a=this.cache,o=t.length,c=Du(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(t[u]||Ux,c[u])}function n2(r){switch(r){case 5126:return zA;case 35664:return BA;case 35665:return FA;case 35666:return HA;case 35674:return GA;case 35675:return VA;case 35676:return kA;case 5124:case 35670:return XA;case 35667:case 35671:return WA;case 35668:case 35672:return qA;case 35669:case 35673:return YA;case 5125:return ZA;case 36294:return KA;case 36295:return JA;case 36296:return QA;case 35678:case 36198:case 36298:case 36306:case 35682:return jA;case 35679:case 36299:case 36307:return $A;case 35680:case 36300:case 36308:case 36293:return t2;case 36289:case 36303:case 36311:case 36292:return e2}}class i2{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=IA(n.type)}}class a2{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=n2(n.type)}}class s2{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const h=o[c];h.setValue(t,n[h.id],a)}}}const Sd=/(\w+)(\])?(\[|\.)?/g;function A_(r,t){r.seq.push(t),r.map[t.id]=t}function r2(r,t,n){const a=r.name,o=a.length;for(Sd.lastIndex=0;;){const c=Sd.exec(a),u=Sd.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&u+2===o){A_(n,p===void 0?new i2(h,r,t):new a2(h,r,t));break}else{let _=n.map[h];_===void 0&&(_=new s2(h),A_(n,_)),n=_}}}class pu{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const h=t.getActiveUniform(n,u),m=t.getUniformLocation(n,h.name);r2(h,m,this)}const o=[],c=[];for(const u of this.seq)u.type===t.SAMPLER_2D_SHADOW||u.type===t.SAMPLER_CUBE_SHADOW||u.type===t.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(t,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let c=0,u=n.length;c!==u;++c){const h=n[c],m=a[h.id];m.needsUpdate!==!1&&h.setValue(t,m.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,c=t.length;o!==c;++o){const u=t[o];u.id in n&&a.push(u)}return a}}function w_(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const o2=37297;let l2=0;function c2(r,t){const n=r.split(`
`),a=[],o=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let u=o;u<c;u++){const h=u+1;a.push(`${h===t?">":" "} ${h}: ${n[u]}`)}return a.join(`
`)}const R_=new ge;function u2(r){Le._getMatrix(R_,Le.workingColorSpace,r);const t=`mat3( ${R_.elements.map(n=>n.toFixed(4))} )`;switch(Le.getTransfer(r)){case Su:return[t,"LinearTransferOETF"];case Xe:return[t,"sRGBTransferOETF"];default:return de("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function C_(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const h=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+c2(r.getShaderSource(t),h)}else return c}function f2(r,t){const n=u2(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const h2={[W_]:"Linear",[q_]:"Reinhard",[Y_]:"Cineon",[mp]:"ACESFilmic",[K_]:"AgX",[J_]:"Neutral",[Z_]:"Custom"};function d2(r,t){const n=h2[t];return n===void 0?(de("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const su=new Z;function p2(){Le.getLuminanceCoefficients(su);const r=su.x.toFixed(4),t=su.y.toFixed(4),n=su.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m2(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function g2(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function v2(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(t,o),u=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[u]={type:c.type,location:r.getAttribLocation(t,u),locationSize:h}}return n}function al(r){return r!==""}function D_(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function U_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _2=/^[ \t]*#include +<([\w\d./]+)>/gm;function fp(r){return r.replace(_2,S2)}const x2=new Map;function S2(r,t){let n=be[t];if(n===void 0){const a=x2.get(t);if(a!==void 0)n=be[a],de('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return fp(n)}const y2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function L_(r){return r.replace(y2,M2)}function M2(r,t,n,a){let o="";for(let c=parseInt(t);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function N_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const E2={[lu]:"SHADOWMAP_TYPE_PCF",[nl]:"SHADOWMAP_TYPE_VSM"};function b2(r){return E2[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const T2={[Gs]:"ENVMAP_TYPE_CUBE",[Yr]:"ENVMAP_TYPE_CUBE",[Au]:"ENVMAP_TYPE_CUBE_UV"};function A2(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":T2[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const w2={[Yr]:"ENVMAP_MODE_REFRACTION"};function R2(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":w2[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const C2={[pp]:"ENVMAP_BLENDING_MULTIPLY",[xM]:"ENVMAP_BLENDING_MIX",[SM]:"ENVMAP_BLENDING_ADD"};function D2(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":C2[r.combine]||"ENVMAP_BLENDING_NONE"}function U2(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function L2(r,t,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,h=n.fragmentShader;const m=b2(n),p=A2(n),g=R2(n),_=D2(n),v=U2(n),x=m2(n),b=g2(c),D=o.createProgram();let M,S,I=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(al).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(al).join(`
`),S.length>0&&(S+=`
`)):(M=[N_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),S=[N_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ta?"#define TONE_MAPPING":"",n.toneMapping!==ta?be.tonemapping_pars_fragment:"",n.toneMapping!==ta?d2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",be.colorspace_pars_fragment,f2("linearToOutputTexel",n.outputColorSpace),p2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(al).join(`
`)),u=fp(u),u=D_(u,n),u=U_(u,n),h=fp(h),h=D_(h,n),h=U_(h,n),u=L_(u),h=L_(h),n.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",n.glslVersion===Nv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Nv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const z=I+M+u,A=I+S+h,O=w_(o,o.VERTEX_SHADER,z),w=w_(o,o.FRAGMENT_SHADER,A);o.attachShader(D,O),o.attachShader(D,w),n.index0AttributeName!==void 0?o.bindAttribLocation(D,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(D,0,"position"),o.linkProgram(D);function N(W){if(r.debug.checkShaderErrors){const Y=o.getProgramInfoLog(D)||"",j=o.getShaderInfoLog(O)||"",F=o.getShaderInfoLog(w)||"",q=Y.trim(),B=j.trim(),P=F.trim();let k=!0,V=!0;if(o.getProgramParameter(D,o.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,D,O,w);else{const X=C_(o,O,"vertex"),R=C_(o,w,"fragment");Ne("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(D,o.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+q+`
`+X+`
`+R)}else q!==""?de("WebGLProgram: Program Info Log:",q):(B===""||P==="")&&(V=!1);V&&(W.diagnostics={runnable:k,programLog:q,vertexShader:{log:B,prefix:M},fragmentShader:{log:P,prefix:S}})}o.deleteShader(O),o.deleteShader(w),E=new pu(o,D),L=v2(o,D)}let E;this.getUniforms=function(){return E===void 0&&N(this),E};let L;this.getAttributes=function(){return L===void 0&&N(this),L};let H=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=o.getProgramParameter(D,o2)),H},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(D),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=l2++,this.cacheKey=t,this.usedTimes=1,this.program=D,this.vertexShader=O,this.fragmentShader=w,this}let N2=0;class O2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new P2(t),n.set(t,a)),a}}class P2{constructor(t){this.id=N2++,this.code=t,this.usedTimes=0}}function I2(r){return r===Vs||r===gu||r===vu}function z2(r,t,n,a,o,c){const u=new wp,h=new O2,m=new Set,p=[],g=new Map,_=a.logarithmicDepthBuffer;let v=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(E){return m.add(E),E===0?"uv":`uv${E}`}function D(E,L,H,W,Y,j){const F=W.fog,q=Y.geometry,B=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?W.environment:null,P=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,k=t.get(E.envMap||B,P),V=k&&k.mapping===Au?k.image.height:null,X=x[E.type];E.precision!==null&&(v=a.getMaxPrecision(E.precision),v!==E.precision&&de("WebGLProgram.getParameters:",E.precision,"not supported, using",v,"instead."));const R=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,J=R!==void 0?R.length:0;let rt=0;q.morphAttributes.position!==void 0&&(rt=1),q.morphAttributes.normal!==void 0&&(rt=2),q.morphAttributes.color!==void 0&&(rt=3);let xt,Lt,Pt,nt;if(X){const We=ji[X];xt=We.vertexShader,Lt=We.fragmentShader}else{xt=E.vertexShader,Lt=E.fragmentShader;const We=h.getVertexShaderStage(E),Pe=h.getFragmentShaderStage(E);h.update(E,We,Pe),Pt=We.id,nt=Pe.id}const dt=r.getRenderTarget(),wt=r.state.buffers.depth.getReversed(),ee=Y.isInstancedMesh===!0,Bt=Y.isBatchedMesh===!0,ie=!!E.map,ue=!!E.matcap,mt=!!k,Ct=!!E.aoMap,Nt=!!E.lightMap,Dt=!!E.bumpMap&&E.wireframe===!1,It=!!E.normalMap,ae=!!E.displacementMap,jt=!!E.emissiveMap,ce=!!E.metalnessMap,he=!!E.roughnessMap,Q=E.anisotropy>0,pe=E.clearcoat>0,Se=E.dispersion>0,G=E.retroreflectivity>0,T=E.iridescence>0,it=E.sheen>0,ct=E.transmission>0,St=Q&&!!E.anisotropyMap,Ot=pe&&!!E.clearcoatMap,Ft=pe&&!!E.clearcoatNormalMap,vt=pe&&!!E.clearcoatRoughnessMap,yt=T&&!!E.iridescenceMap,at=T&&!!E.iridescenceThicknessMap,_t=it&&!!E.sheenColorMap,Tt=it&&!!E.sheenRoughnessMap,Rt=!!E.specularMap,Vt=!!E.specularColorMap,qt=!!E.specularIntensityMap,re=ct&&!!E.transmissionMap,$=ct&&!!E.thicknessMap,Ht=!!E.gradientMap,Mt=!!E.alphaMap,Gt=E.alphaTest>0,Yt=!!E.alphaHash,Ut=!!E.extensions;let oe=ta;E.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(oe=r.toneMapping);const $t={shaderID:X,shaderType:E.type,shaderName:E.name,vertexShader:xt,fragmentShader:Lt,defines:E.defines,customVertexShaderID:Pt,customFragmentShaderID:nt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:v,batching:Bt,batchingColor:Bt&&Y._colorsTexture!==null,instancing:ee,instancingColor:ee&&Y.instanceColor!==null,instancingMorph:ee&&Y.morphTexture!==null,outputColorSpace:dt===null?r.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Le.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:ie,matcap:ue,envMap:mt,envMapMode:mt&&k.mapping,envMapCubeUVHeight:V,aoMap:Ct,lightMap:Nt,bumpMap:Dt,normalMap:It,displacementMap:ae,emissiveMap:jt,normalMapObjectSpace:It&&E.normalMapType===EM,normalMapTangentSpace:It&&E.normalMapType===_u,packedNormalMap:It&&E.normalMapType===_u&&I2(E.normalMap.format),metalnessMap:ce,roughnessMap:he,anisotropy:Q,anisotropyMap:St,clearcoat:pe,clearcoatMap:Ot,clearcoatNormalMap:Ft,clearcoatRoughnessMap:vt,dispersion:Se,retroreflection:G,iridescence:T,iridescenceMap:yt,iridescenceThicknessMap:at,sheen:it,sheenColorMap:_t,sheenRoughnessMap:Tt,specularMap:Rt,specularColorMap:Vt,specularIntensityMap:qt,transmission:ct,transmissionMap:re,thicknessMap:$,gradientMap:Ht,opaque:E.transparent===!1&&E.blending===sl&&E.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Gt,alphaHash:Yt,combine:E.combine,mapUv:ie&&b(E.map.channel),aoMapUv:Ct&&b(E.aoMap.channel),lightMapUv:Nt&&b(E.lightMap.channel),bumpMapUv:Dt&&b(E.bumpMap.channel),normalMapUv:It&&b(E.normalMap.channel),displacementMapUv:ae&&b(E.displacementMap.channel),emissiveMapUv:jt&&b(E.emissiveMap.channel),metalnessMapUv:ce&&b(E.metalnessMap.channel),roughnessMapUv:he&&b(E.roughnessMap.channel),anisotropyMapUv:St&&b(E.anisotropyMap.channel),clearcoatMapUv:Ot&&b(E.clearcoatMap.channel),clearcoatNormalMapUv:Ft&&b(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&b(E.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&b(E.iridescenceMap.channel),iridescenceThicknessMapUv:at&&b(E.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&b(E.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&b(E.sheenRoughnessMap.channel),specularMapUv:Rt&&b(E.specularMap.channel),specularColorMapUv:Vt&&b(E.specularColorMap.channel),specularIntensityMapUv:qt&&b(E.specularIntensityMap.channel),transmissionMapUv:re&&b(E.transmissionMap.channel),thicknessMapUv:$&&b(E.thicknessMap.channel),alphaMapUv:Mt&&b(E.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(It||Q),vertexNormals:!!q.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!q.attributes.uv&&(ie||Mt),fog:!!F,useFog:E.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||q.attributes.normal===void 0&&It===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:wt,skinning:Y.isSkinnedMesh===!0,hasPositionAttribute:q.attributes.position!==void 0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:rt,numSunLights:L.sun.length,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numSunLightShadows:L.sunShadowMap.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:j.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:oe,decodeVideoTexture:ie&&E.map.isVideoTexture===!0&&Le.getTransfer(E.map.colorSpace)===Xe,decodeVideoTextureEmissive:jt&&E.emissiveMap.isVideoTexture===!0&&Le.getTransfer(E.emissiveMap.colorSpace)===Xe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===mi,flipSided:E.side===Zn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ut&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&E.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return $t.vertexUv1s=m.has(1),$t.vertexUv2s=m.has(2),$t.vertexUv3s=m.has(3),m.clear(),$t}function M(E){const L=[];if(E.shaderID?L.push(E.shaderID):(L.push(E.customVertexShaderID),L.push(E.customFragmentShaderID)),E.defines!==void 0)for(const H in E.defines)L.push(H),L.push(E.defines[H]);return E.isRawShaderMaterial===!1&&(S(L,E),I(L,E),L.push(r.outputColorSpace)),L.push(E.customProgramCacheKey),L.join()}function S(E,L){E.push(L.precision),E.push(L.outputColorSpace),E.push(L.envMapMode),E.push(L.envMapCubeUVHeight),E.push(L.mapUv),E.push(L.alphaMapUv),E.push(L.lightMapUv),E.push(L.aoMapUv),E.push(L.bumpMapUv),E.push(L.normalMapUv),E.push(L.displacementMapUv),E.push(L.emissiveMapUv),E.push(L.metalnessMapUv),E.push(L.roughnessMapUv),E.push(L.anisotropyMapUv),E.push(L.clearcoatMapUv),E.push(L.clearcoatNormalMapUv),E.push(L.clearcoatRoughnessMapUv),E.push(L.iridescenceMapUv),E.push(L.iridescenceThicknessMapUv),E.push(L.sheenColorMapUv),E.push(L.sheenRoughnessMapUv),E.push(L.specularMapUv),E.push(L.specularColorMapUv),E.push(L.specularIntensityMapUv),E.push(L.transmissionMapUv),E.push(L.thicknessMapUv),E.push(L.combine),E.push(L.fogExp2),E.push(L.sizeAttenuation),E.push(L.morphTargetsCount),E.push(L.morphAttributeCount),E.push(L.numSunLights),E.push(L.numDirLights),E.push(L.numPointLights),E.push(L.numSpotLights),E.push(L.numSpotLightMaps),E.push(L.numHemiLights),E.push(L.numRectAreaLights),E.push(L.numSunLightShadows),E.push(L.numDirLightShadows),E.push(L.numPointLightShadows),E.push(L.numSpotLightShadows),E.push(L.numSpotLightShadowsWithMaps),E.push(L.numLightProbes),E.push(L.shadowMapType),E.push(L.toneMapping),E.push(L.numClippingPlanes),E.push(L.numClipIntersection),E.push(L.depthPacking)}function I(E,L){u.disableAll(),L.instancing&&u.enable(0),L.instancingColor&&u.enable(1),L.instancingMorph&&u.enable(2),L.matcap&&u.enable(3),L.envMap&&u.enable(4),L.normalMapObjectSpace&&u.enable(5),L.normalMapTangentSpace&&u.enable(6),L.clearcoat&&u.enable(7),L.iridescence&&u.enable(8),L.alphaTest&&u.enable(9),L.vertexColors&&u.enable(10),L.vertexAlphas&&u.enable(11),L.vertexUv1s&&u.enable(12),L.vertexUv2s&&u.enable(13),L.vertexUv3s&&u.enable(14),L.vertexTangents&&u.enable(15),L.anisotropy&&u.enable(16),L.alphaHash&&u.enable(17),L.batching&&u.enable(18),L.dispersion&&u.enable(19),L.retroreflection&&u.enable(24),L.batchingColor&&u.enable(20),L.gradientMap&&u.enable(21),L.packedNormalMap&&u.enable(22),L.vertexNormals&&u.enable(23),E.push(u.mask),u.disableAll(),L.fog&&u.enable(0),L.useFog&&u.enable(1),L.flatShading&&u.enable(2),L.logarithmicDepthBuffer&&u.enable(3),L.reversedDepthBuffer&&u.enable(4),L.skinning&&u.enable(5),L.morphTargets&&u.enable(6),L.morphNormals&&u.enable(7),L.morphColors&&u.enable(8),L.premultipliedAlpha&&u.enable(9),L.shadowMapEnabled&&u.enable(10),L.doubleSided&&u.enable(11),L.flipSided&&u.enable(12),L.useDepthPacking&&u.enable(13),L.dithering&&u.enable(14),L.transmission&&u.enable(15),L.sheen&&u.enable(16),L.opaque&&u.enable(17),L.pointsUvs&&u.enable(18),L.decodeVideoTexture&&u.enable(19),L.decodeVideoTextureEmissive&&u.enable(20),L.alphaToCoverage&&u.enable(21),L.numLightProbeGrids>0&&u.enable(22),L.hasPositionAttribute&&u.enable(23),E.push(u.mask)}function z(E){const L=x[E.type];let H;if(L){const W=ji[L];H=Tx.clone(W.uniforms)}else H=E.uniforms;return H}function A(E,L){let H=g.get(L);return H!==void 0?++H.usedTimes:(H=new L2(r,L,E,o),p.push(H),g.set(L,H)),H}function O(E){if(--E.usedTimes===0){const L=p.indexOf(E);p[L]=p[p.length-1],p.pop(),g.delete(E.cacheKey),E.destroy()}}function w(E){h.remove(E)}function N(){h.dispose()}return{getParameters:D,getProgramCacheKey:M,getUniforms:z,acquireProgram:A,releaseProgram:O,releaseShaderCache:w,programs:p,dispose:N}}function B2(){let r=new WeakMap;function t(u){return r.has(u)}function n(u){let h=r.get(u);return h===void 0&&(h={},r.set(u,h)),h}function a(u){r.delete(u)}function o(u,h,m){r.get(u)[h]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:c}}function F2(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function O_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function P_(){const r=[];let t=0;const n=[],a=[],o=[];function c(){t=0,n.length=0,a.length=0,o.length=0}function u(v){let x=0;return v.isInstancedMesh&&(x+=2),v.isSkinnedMesh&&(x+=1),x}function h(v,x,b,D,M,S){let I=r[t];return I===void 0?(I={id:v.id,object:v,geometry:x,material:b,materialVariant:u(v),groupOrder:D,renderOrder:v.renderOrder,z:M,group:S},r[t]=I):(I.id=v.id,I.object=v,I.geometry=x,I.material=b,I.materialVariant=u(v),I.groupOrder=D,I.renderOrder=v.renderOrder,I.z=M,I.group=S),t++,I}function m(v,x,b,D,M,S,I){I.reversedDepth===!0&&(M=-M);const z=h(v,x,b,D,M,S);b.transmission>0?a.push(z):b.transparent===!0?o.push(z):n.push(z)}function p(v,x,b,D,M,S){const I=h(v,x,b,D,M,S);b.transmission>0?a.unshift(I):b.transparent===!0?o.unshift(I):n.unshift(I)}function g(v,x){n.length>1&&n.sort(v||F2),a.length>1&&a.sort(x||O_),o.length>1&&o.sort(x||O_)}function _(){for(let v=t,x=r.length;v<x;v++){const b=r[v];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:m,unshift:p,finish:_,sort:g}}function H2(){let r=new WeakMap;function t(a,o){const c=r.get(a);let u;return c===void 0?(u=new P_,r.set(a,[u])):o>=c.length?(u=new P_,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:t,dispose:n}}function G2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new Z,color:new ve};break;case"SpotLight":n={position:new Z,direction:new Z,color:new ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Z,color:new ve,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Z,skyColor:new ve,groundColor:new ve};break;case"RectAreaLight":n={color:new ve,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return r[t.id]=n,n}}}function V2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let k2=0;function X2(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function W2(r){const t=new G2,n=V2(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new Z);const o=new Z,c=new Ge,u=new Ge;function h(p){let g=0,_=0,v=0;for(let Y=0;Y<9;Y++)a.probe[Y].set(0,0,0);let x=0,b=0,D=0,M=0,S=0,I=0,z=0,A=0,O=0,w=0,N=0,E=0,L=0,H=0;p.sort(X2);for(let Y=0,j=p.length;Y<j;Y++){const F=p[Y],q=F.color,B=F.intensity,P=F.distance;let k=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===Vs?k=F.shadow.map.texture:k=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)g+=q.r*B,_+=q.g*B,v+=q.b*B;else if(F.isLightProbe){for(let V=0;V<9;V++)a.probe[V].addScaledVector(F.sh.coefficients[V],B);H++}else if(F.isSunLight){const V=t.get(F);if(V.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const X=F.shadow,R=n.get(F);R.shadowIntensity=X.intensity,R.shadowBias=X.bias,R.shadowNormalBias=X.normalBias,R.shadowRadius=X.radius,R.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),a.sunShadow[b]=R,a.sunShadowMap[b]=k;const J=X.getViewportCount();for(let rt=0;rt<J;rt++)a.sunShadowMatrix[D+rt]=X.getMatrix(rt),a.sunShadowCascade[D+rt]=X._cascadeData[rt];D+=J,b++}a.sun[x]=V,x++}else if(F.isDirectionalLight){const V=t.get(F);if(V.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const X=F.shadow,R=n.get(F);R.shadowIntensity=X.intensity,R.shadowBias=X.bias,R.shadowNormalBias=X.normalBias,R.shadowRadius=X.radius,R.shadowMapSize=X.mapSize,a.directionalShadow[M]=R,a.directionalShadowMap[M]=k,a.directionalShadowMatrix[M]=F.shadow.matrix,O++}a.directional[M]=V,M++}else if(F.isSpotLight){const V=t.get(F);V.position.setFromMatrixPosition(F.matrixWorld),V.color.copy(q).multiplyScalar(B),V.distance=P,V.coneCos=Math.cos(F.angle),V.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),V.decay=F.decay,a.spot[I]=V;const X=F.shadow;if(F.map&&(a.spotLightMap[E]=F.map,E++,X.updateMatrices(F),F.castShadow&&L++),a.spotLightMatrix[I]=X.matrix,F.castShadow){const R=n.get(F);R.shadowIntensity=X.intensity,R.shadowBias=X.bias,R.shadowNormalBias=X.normalBias,R.shadowRadius=X.radius,R.shadowMapSize=X.mapSize,a.spotShadow[I]=R,a.spotShadowMap[I]=k,N++}I++}else if(F.isRectAreaLight){const V=t.get(F);V.color.copy(q).multiplyScalar(B),V.halfWidth.set(F.width*.5,0,0),V.halfHeight.set(0,F.height*.5,0),a.rectArea[z]=V,z++}else if(F.isPointLight){const V=t.get(F);if(V.color.copy(F.color).multiplyScalar(F.intensity),V.distance=F.distance,V.decay=F.decay,F.castShadow){const X=F.shadow,R=n.get(F);R.shadowIntensity=X.intensity,R.shadowBias=X.bias,R.shadowNormalBias=X.normalBias,R.shadowRadius=X.radius,R.shadowMapSize=X.mapSize,R.shadowCameraNear=X.camera.near,R.shadowCameraFar=X.camera.far,a.pointShadow[S]=R,a.pointShadowMap[S]=k,a.pointShadowMatrix[S]=F.shadow.matrix,w++}a.point[S]=V,S++}else if(F.isHemisphereLight){const V=t.get(F);V.skyColor.copy(F.color).multiplyScalar(B),V.groundColor.copy(F.groundColor).multiplyScalar(B),a.hemi[A]=V,A++}}z>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Wt.LTC_FLOAT_1,a.rectAreaLTC2=Wt.LTC_FLOAT_2):(a.rectAreaLTC1=Wt.LTC_HALF_1,a.rectAreaLTC2=Wt.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=v;const W=a.hash;(W.sunLength!==x||W.directionalLength!==M||W.pointLength!==S||W.spotLength!==I||W.rectAreaLength!==z||W.hemiLength!==A||W.numSunShadows!==b||W.numDirectionalShadows!==O||W.numPointShadows!==w||W.numSpotShadows!==N||W.numSpotMaps!==E||W.numLightProbes!==H)&&(a.sun.length=x,a.directional.length=M,a.spot.length=I,a.rectArea.length=z,a.point.length=S,a.hemi.length=A,a.sunShadow.length=b,a.sunShadowMap.length=b,a.sunShadowMatrix.length=D,a.sunShadowCascade.length=D,a.directionalShadow.length=O,a.directionalShadowMap.length=O,a.directionalShadowMatrix.length=O,a.pointShadow.length=w,a.pointShadowMap.length=w,a.pointShadowMatrix.length=w,a.spotShadow.length=N,a.spotShadowMap.length=N,a.spotLightMatrix.length=N+E-L,a.spotLightMap.length=E,a.numSpotLightShadowsWithMaps=L,a.numLightProbes=H,W.sunLength=x,W.directionalLength=M,W.pointLength=S,W.spotLength=I,W.rectAreaLength=z,W.hemiLength=A,W.numSunShadows=b,W.numDirectionalShadows=O,W.numPointShadows=w,W.numSpotShadows=N,W.numSpotMaps=E,W.numLightProbes=H,a.version=k2++)}function m(p,g){let _=0,v=0,x=0,b=0,D=0,M=0;const S=g.matrixWorldInverse;for(let I=0,z=p.length;I<z;I++){const A=p[I];if(A.isSunLight){const O=a.sun[_];O.direction.setFromMatrixPosition(A.matrixWorld),O.direction.transformDirection(S),_++}else if(A.isDirectionalLight){const O=a.directional[v];O.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),O.direction.sub(o),O.direction.transformDirection(S),v++}else if(A.isSpotLight){const O=a.spot[b];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),O.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),O.direction.sub(o),O.direction.transformDirection(S),b++}else if(A.isRectAreaLight){const O=a.rectArea[D];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),u.identity(),c.copy(A.matrixWorld),c.premultiply(S),u.extractRotation(c),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),O.halfWidth.applyMatrix4(u),O.halfHeight.applyMatrix4(u),D++}else if(A.isPointLight){const O=a.point[x];O.position.setFromMatrixPosition(A.matrixWorld),O.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const O=a.hemi[M];O.direction.setFromMatrixPosition(A.matrixWorld),O.direction.transformDirection(S),M++}}}return{setup:h,setupView:m,state:a}}function I_(r){const t=new W2(r),n=[],a=[],o=[];function c(v){_.camera=v,n.length=0,a.length=0,o.length=0}function u(v){n.push(v)}function h(v){a.push(v)}function m(v){o.push(v)}function p(){t.setup(n)}function g(v){t.setupView(n,v)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:p,setupLightsView:g,pushLight:u,pushShadow:h,pushLightProbeGrid:m}}function q2(r){let t=new WeakMap;function n(o,c=0){const u=t.get(o);let h;return u===void 0?(h=new I_(r),t.set(o,[h])):c>=u.length?(h=new I_(r),u.push(h)):h=u[c],h}function a(){t=new WeakMap}return{get:n,dispose:a}}const Y2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z2=`uniform sampler2D shadow_pass;
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
}`,K2=[new Z(1,0,0),new Z(-1,0,0),new Z(0,1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1)],J2=[new Z(0,-1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1),new Z(0,-1,0),new Z(0,-1,0)],z_=new Ge,el=new Z,yd=new Z;function Q2(r,t,n){let a=new Dp;const o=new zt,c=new zt,u=new nn,h=new iE,m=new aE,p={},g=n.maxTextureSize,_={[Hs]:Zn,[Zn]:Hs,[mi]:mi},v=new Ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:Y2,fragmentShader:Z2}),x=v.clone();x.defines.HORIZONTAL_PASS=1;const b=new Tn;b.setAttribute("position",new Vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new je(b,v),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lu;let S=this.type;this.render=function(w,N,E){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||w.length===0)return;this.type===V_&&(de("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=lu);const L=r.getRenderTarget(),H=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),Y=r.state;Y.setBlending(Ua),Y.buffers.depth.getReversed()===!0?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const j=S!==this.type;j&&N.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(q=>q.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,q=w.length;F<q;F++){const B=w[F],P=B.shadow;if(P===void 0){de("WebGLShadowMap:",B,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;o.copy(P.mapSize);const k=P.getFrameExtents();o.multiply(k),c.copy(P.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(c.x=Math.floor(g/k.x),o.x=c.x*k.x,P.mapSize.x=c.x),o.y>g&&(c.y=Math.floor(g/k.y),o.y=c.y*k.y,P.mapSize.y=c.y));const V=r.state.buffers.depth.getReversed();if(P.camera._reversedDepth=V,P.map===null||j===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===nl){if(B.isPointLight){de("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new _i(o.x,o.y,{format:Vs,type:Di,minFilter:Fn,magFilter:Fn,generateMipmaps:!1}),P.map.texture.name=B.name+".shadowMap",P.map.depthTexture=new gl(o.x,o.y,Hi),P.map.depthTexture.name=B.name+".shadowMapDepth",P.map.depthTexture.format=Na,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Pn,P.map.depthTexture.magFilter=Pn}else B.isPointLight?(P.map=new Cx(o.x),P.map.depthTexture=new S1(o.x,ea)):(P.map=new _i(o.x,o.y),P.map.depthTexture=new gl(o.x,o.y,ea)),P.map.depthTexture.name=B.name+".shadowMap",P.map.depthTexture.format=Na,this.type===lu?(P.map.depthTexture.compareFunction=V?bp:Ep,P.map.depthTexture.minFilter=Fn,P.map.depthTexture.magFilter=Fn):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Pn,P.map.depthTexture.magFilter=Pn);P.camera.updateProjectionMatrix()}P.map.isWebGLCubeRenderTarget!==!0&&(P.map.width!==o.x||P.map.height!==o.y)&&P.map.setSize(o.x,o.y);const X=P.map.isWebGLCubeRenderTarget?6:P.getViewportCount();B.isPointLight!==!0&&P.updateMatrices(B,E);for(let R=0;R<X;R++){const J=P.getCamera(R);if(B.isPointLight){const rt=P.camera,xt=P.matrix,Lt=B.distance||rt.far;Lt!==rt.far&&(rt.far=Lt,rt.updateProjectionMatrix()),el.setFromMatrixPosition(B.matrixWorld),rt.position.copy(el),yd.copy(rt.position),yd.add(K2[R]),rt.up.copy(J2[R]),rt.lookAt(yd),rt.updateMatrixWorld(),xt.makeTranslation(-el.x,-el.y,-el.z),z_.multiplyMatrices(rt.projectionMatrix,rt.matrixWorldInverse),P._frustum.setFromProjectionMatrix(z_,rt.coordinateSystem,rt.reversedDepth)}if(P.map.isWebGLCubeRenderTarget)r.setRenderTarget(P.map,R),r.clear();else{R===0&&(r.setRenderTarget(P.map),r.clear());const rt=P.getViewport(R);u.set(c.x*rt.x,c.y*rt.y,c.x*rt.z,c.y*rt.w),Y.viewport(u)}a=P.getFrustum(R),A(N,E,J,B,this.type)}P.isPointLightShadow!==!0&&this.type===nl&&I(P,E),P.needsUpdate=!1}S=this.type,M.needsUpdate=!1,r.setRenderTarget(L,H,W)};function I(w,N){const E=t.update(D);v.defines.VSM_SAMPLES!==w.blurSamples&&(v.defines.VSM_SAMPLES=w.blurSamples,x.defines.VSM_SAMPLES=w.blurSamples,v.needsUpdate=!0,x.needsUpdate=!0),w.mapPass===null?w.mapPass=new _i(o.x,o.y,{format:Vs,type:Di}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),v.uniforms.shadow_pass.value=w.map.depthTexture,v.uniforms.resolution.value.set(w.map.width,w.map.height),v.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(N,null,E,v,D,null),x.uniforms.shadow_pass.value=w.mapPass.texture,x.uniforms.resolution.value.set(w.map.width,w.map.height),x.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(N,null,E,x,D,null)}function z(w,N,E,L){let H=null;const W=E.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(W!==void 0)H=W;else if(H=E.isPointLight===!0?m:h,r.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const Y=H.uuid,j=N.uuid;let F=p[Y];F===void 0&&(F={},p[Y]=F);let q=F[j];q===void 0&&(q=H.clone(),F[j]=q,N.addEventListener("dispose",O)),H=q}if(H.visible=N.visible,H.wireframe=N.wireframe,L===nl?H.side=N.shadowSide!==null?N.shadowSide:N.side:H.side=N.shadowSide!==null?N.shadowSide:_[N.side],H.alphaMap=N.alphaMap,H.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,H.map=N.map,H.clipShadows=N.clipShadows,H.clippingPlanes=N.clippingPlanes,H.clipIntersection=N.clipIntersection,H.displacementMap=N.displacementMap,H.displacementScale=N.displacementScale,H.displacementBias=N.displacementBias,H.wireframeLinewidth=N.wireframeLinewidth,H.linewidth=N.linewidth,E.isPointLight===!0&&H.isMeshDistanceMaterial===!0){const Y=r.properties.get(H);Y.light=E}return H}function A(w,N,E,L,H){if(w.visible===!1)return;if(w.layers.test(N.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&H===nl)&&(!w.frustumCulled||w.intersectsFrustum(a))){w.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,w.matrixWorld);const j=t.update(w),F=w.material;if(Array.isArray(F)){const q=j.groups;for(let B=0,P=q.length;B<P;B++){const k=q[B],V=F[k.materialIndex];if(V&&V.visible){const X=z(w,V,L,H);w.onBeforeShadow(r,w,N,E,j,X,k),r.renderBufferDirect(E,null,j,X,w,k),w.onAfterShadow(r,w,N,E,j,X,k)}}}else if(F.visible){const q=z(w,F,L,H);w.onBeforeShadow(r,w,N,E,j,q,null),r.renderBufferDirect(E,null,j,q,w,null),w.onAfterShadow(r,w,N,E,j,q,null)}}const Y=w.children;for(let j=0,F=Y.length;j<F;j++)A(Y[j],N,E,L,H)}function O(w){w.target.removeEventListener("dispose",O);for(const E in p){const L=p[E],H=w.target.uuid;H in L&&(L[H].dispose(),delete L[H])}}}function j2(r,t){function n(){let $=!1;const Ht=new nn;let Mt=null;const Gt=new nn(0,0,0,0);return{setMask:function(Yt){Mt!==Yt&&!$&&(r.colorMask(Yt,Yt,Yt,Yt),Mt=Yt)},setLocked:function(Yt){$=Yt},setClear:function(Yt,Ut,oe,$t,We){We===!0&&(Yt*=$t,Ut*=$t,oe*=$t),Ht.set(Yt,Ut,oe,$t),Gt.equals(Ht)===!1&&(r.clearColor(Yt,Ut,oe,$t),Gt.copy(Ht))},reset:function(){$=!1,Mt=null,Gt.set(-1,0,0,0)}}}function a(){let $=!1,Ht=!1,Mt=null,Gt=null,Yt=null;return{setReversed:function(Ut){if(Ht!==Ut){const oe=t.get("EXT_clip_control");Ut?oe.clipControlEXT(oe.LOWER_LEFT_EXT,oe.ZERO_TO_ONE_EXT):oe.clipControlEXT(oe.LOWER_LEFT_EXT,oe.NEGATIVE_ONE_TO_ONE_EXT),Ht=Ut;const $t=Yt;Yt=null,this.setClear($t)}},getReversed:function(){return Ht},setTest:function(Ut){Ut?dt(r.DEPTH_TEST):wt(r.DEPTH_TEST)},setMask:function(Ut){Mt!==Ut&&!$&&(r.depthMask(Ut),Mt=Ut)},setFunc:function(Ut){if(Ht&&(Ut=PM[Ut]),Gt!==Ut){switch(Ut){case Md:r.depthFunc(r.NEVER);break;case Ed:r.depthFunc(r.ALWAYS);break;case bd:r.depthFunc(r.LESS);break;case ul:r.depthFunc(r.LEQUAL);break;case Td:r.depthFunc(r.EQUAL);break;case Ad:r.depthFunc(r.GEQUAL);break;case wd:r.depthFunc(r.GREATER);break;case Rd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Gt=Ut}},setLocked:function(Ut){$=Ut},setClear:function(Ut){Yt!==Ut&&(Yt=Ut,Ht&&(Ut=1-Ut),r.clearDepth(Ut))},reset:function(){$=!1,Mt=null,Gt=null,Yt=null,Ht=!1}}}function o(){let $=!1,Ht=null,Mt=null,Gt=null,Yt=null,Ut=null,oe=null,$t=null,We=null;return{setTest:function(Pe){$||(Pe?dt(r.STENCIL_TEST):wt(r.STENCIL_TEST))},setMask:function(Pe){Ht!==Pe&&!$&&(r.stencilMask(Pe),Ht=Pe)},setFunc:function(Pe,Kn,ai){(Mt!==Pe||Gt!==Kn||Yt!==ai)&&(r.stencilFunc(Pe,Kn,ai),Mt=Pe,Gt=Kn,Yt=ai)},setOp:function(Pe,Kn,ai){(Ut!==Pe||oe!==Kn||$t!==ai)&&(r.stencilOp(Pe,Kn,ai),Ut=Pe,oe=Kn,$t=ai)},setLocked:function(Pe){$=Pe},setClear:function(Pe){We!==Pe&&(r.clearStencil(Pe),We=Pe)},reset:function(){$=!1,Ht=null,Mt=null,Gt=null,Yt=null,Ut=null,oe=null,$t=null,We=null}}}const c=new n,u=new a,h=new o,m=new WeakMap,p=new WeakMap;let g={},_={},v={},x=new WeakMap,b=[],D=null,M=!1,S=null,I=null,z=null,A=null,O=null,w=null,N=null,E=new ve(0,0,0),L=0,H=!1,W=null,Y=null,j=null,F=null,q=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,k=0;const V=r.getParameter(r.VERSION);V.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(V)[1]),P=k>=1):V.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),P=k>=2);let X=null,R={};const J=r.getParameter(r.SCISSOR_BOX),rt=r.getParameter(r.VIEWPORT),xt=new nn().fromArray(J),Lt=new nn().fromArray(rt);function Pt($,Ht,Mt,Gt){const Yt=new Uint8Array(4),Ut=r.createTexture();r.bindTexture($,Ut),r.texParameteri($,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri($,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let oe=0;oe<Mt;oe++)$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?r.texImage3D(Ht,0,r.RGBA,1,1,Gt,0,r.RGBA,r.UNSIGNED_BYTE,Yt):r.texImage2D(Ht+oe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Yt);return Ut}const nt={};nt[r.TEXTURE_2D]=Pt(r.TEXTURE_2D,r.TEXTURE_2D,1),nt[r.TEXTURE_CUBE_MAP]=Pt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[r.TEXTURE_2D_ARRAY]=Pt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),nt[r.TEXTURE_3D]=Pt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),h.setClear(0),dt(r.DEPTH_TEST),u.setFunc(ul),Dt(!1),It(Dv),dt(r.CULL_FACE),Ct(Ua);function dt($){g[$]!==!0&&(r.enable($),g[$]=!0)}function wt($){g[$]!==!1&&(r.disable($),g[$]=!1)}function ee($,Ht){return v[$]!==Ht?(r.bindFramebuffer($,Ht),v[$]=Ht,$===r.DRAW_FRAMEBUFFER&&(v[r.FRAMEBUFFER]=Ht),$===r.FRAMEBUFFER&&(v[r.DRAW_FRAMEBUFFER]=Ht),!0):!1}function Bt($,Ht){let Mt=b,Gt=!1;if($){Mt=x.get(Ht),Mt===void 0&&(Mt=[],x.set(Ht,Mt));const Yt=$.textures;if(Mt.length!==Yt.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let Ut=0,oe=Yt.length;Ut<oe;Ut++)Mt[Ut]=r.COLOR_ATTACHMENT0+Ut;Mt.length=Yt.length,Gt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Gt=!0);Gt&&r.drawBuffers(Mt)}function ie($){return D!==$?(r.useProgram($),D=$,!0):!1}const ue={[Gr]:r.FUNC_ADD,[nM]:r.FUNC_SUBTRACT,[iM]:r.FUNC_REVERSE_SUBTRACT};ue[aM]=r.MIN,ue[sM]=r.MAX;const mt={[rM]:r.ZERO,[oM]:r.ONE,[lM]:r.SRC_COLOR,[k_]:r.SRC_ALPHA,[pM]:r.SRC_ALPHA_SATURATE,[hM]:r.DST_COLOR,[uM]:r.DST_ALPHA,[cM]:r.ONE_MINUS_SRC_COLOR,[X_]:r.ONE_MINUS_SRC_ALPHA,[dM]:r.ONE_MINUS_DST_COLOR,[fM]:r.ONE_MINUS_DST_ALPHA,[mM]:r.CONSTANT_COLOR,[gM]:r.ONE_MINUS_CONSTANT_COLOR,[vM]:r.CONSTANT_ALPHA,[_M]:r.ONE_MINUS_CONSTANT_ALPHA};function Ct($,Ht,Mt,Gt,Yt,Ut,oe,$t,We,Pe){if($===Ua){M===!0&&(wt(r.BLEND),M=!1);return}if(M===!1&&(dt(r.BLEND),M=!0),$!==eM){if($!==S||Pe!==H){if((I!==Gr||O!==Gr)&&(r.blendEquation(r.FUNC_ADD),I=Gr,O=Gr),Pe)switch($){case sl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mu:r.blendFunc(r.ONE,r.ONE);break;case Uv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Lv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ne("WebGLState: Invalid blending: ",$);break}else switch($){case sl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Uv:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lv:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",$);break}z=null,A=null,w=null,N=null,E.set(0,0,0),L=0,S=$,H=Pe}return}Yt=Yt||Ht,Ut=Ut||Mt,oe=oe||Gt,(Ht!==I||Yt!==O)&&(r.blendEquationSeparate(ue[Ht],ue[Yt]),I=Ht,O=Yt),(Mt!==z||Gt!==A||Ut!==w||oe!==N)&&(r.blendFuncSeparate(mt[Mt],mt[Gt],mt[Ut],mt[oe]),z=Mt,A=Gt,w=Ut,N=oe),($t.equals(E)===!1||We!==L)&&(r.blendColor($t.r,$t.g,$t.b,We),E.copy($t),L=We),S=$,H=!1}function Nt($,Ht){$.side===mi?wt(r.CULL_FACE):dt(r.CULL_FACE);let Mt=$.side===Zn;Ht&&(Mt=!Mt),Dt(Mt),$.blending===sl&&$.transparent===!1?Ct(Ua):Ct($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),u.setFunc($.depthFunc),u.setTest($.depthTest),u.setMask($.depthWrite),c.setMask($.colorWrite);const Gt=$.stencilWrite;h.setTest(Gt),Gt&&(h.setMask($.stencilWriteMask),h.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),h.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),jt($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?dt(r.SAMPLE_ALPHA_TO_COVERAGE):wt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Dt($){W!==$&&($?r.frontFace(r.CW):r.frontFace(r.CCW),W=$)}function It($){$!==$y?(dt(r.CULL_FACE),$!==Y&&($===Dv?r.cullFace(r.BACK):$===tM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):wt(r.CULL_FACE),Y=$}function ae($){$!==j&&(P&&r.lineWidth($),j=$)}function jt($,Ht,Mt){$?(dt(r.POLYGON_OFFSET_FILL),(F!==Ht||q!==Mt)&&(F=Ht,q=Mt,u.getReversed()&&(Ht=-Ht),r.polygonOffset(Ht,Mt))):wt(r.POLYGON_OFFSET_FILL)}function ce($){$?dt(r.SCISSOR_TEST):wt(r.SCISSOR_TEST)}function he($){$===void 0&&($=r.TEXTURE0+B-1),X!==$&&(r.activeTexture($),X=$)}function Q($,Ht,Mt){Mt===void 0&&(X===null?Mt=r.TEXTURE0+B-1:Mt=X);let Gt=R[Mt];Gt===void 0&&(Gt={type:void 0,texture:void 0},R[Mt]=Gt),(Gt.type!==$||Gt.texture!==Ht)&&(X!==Mt&&(r.activeTexture(Mt),X=Mt),r.bindTexture($,Ht||nt[$]),Gt.type=$,Gt.texture=Ht)}function pe(){const $=R[X];$!==void 0&&$.type!==void 0&&(r.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function Se(){try{r.compressedTexImage2D(...arguments)}catch($){Ne("WebGLState:",$)}}function G(){try{r.compressedTexImage3D(...arguments)}catch($){Ne("WebGLState:",$)}}function T(){try{r.texSubImage2D(...arguments)}catch($){Ne("WebGLState:",$)}}function it(){try{r.texSubImage3D(...arguments)}catch($){Ne("WebGLState:",$)}}function ct(){try{r.compressedTexSubImage2D(...arguments)}catch($){Ne("WebGLState:",$)}}function St(){try{r.compressedTexSubImage3D(...arguments)}catch($){Ne("WebGLState:",$)}}function Ot(){try{r.texStorage2D(...arguments)}catch($){Ne("WebGLState:",$)}}function Ft(){try{r.texStorage3D(...arguments)}catch($){Ne("WebGLState:",$)}}function vt(){try{r.texImage2D(...arguments)}catch($){Ne("WebGLState:",$)}}function yt(){try{r.texImage3D(...arguments)}catch($){Ne("WebGLState:",$)}}function at($){return _[$]!==void 0?_[$]:r.getParameter($)}function _t($,Ht){_[$]!==Ht&&(r.pixelStorei($,Ht),_[$]=Ht)}function Tt($){xt.equals($)===!1&&(r.scissor($.x,$.y,$.z,$.w),xt.copy($))}function Rt($){Lt.equals($)===!1&&(r.viewport($.x,$.y,$.z,$.w),Lt.copy($))}function Vt($,Ht){let Mt=p.get(Ht);Mt===void 0&&(Mt=new WeakMap,p.set(Ht,Mt));let Gt=Mt.get($);Gt===void 0&&(Gt=r.getUniformBlockIndex(Ht,$.name),Mt.set($,Gt))}function qt($,Ht){const Gt=p.get(Ht).get($);m.get(Ht)!==Gt&&(r.uniformBlockBinding(Ht,Gt,$.__bindingPointIndex),m.set(Ht,Gt))}function re(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),g={},_={},X=null,R={},v={},x=new WeakMap,b=[],D=null,M=!1,S=null,I=null,z=null,A=null,O=null,w=null,N=null,E=new ve(0,0,0),L=0,H=!1,W=null,Y=null,j=null,F=null,q=null,xt.set(0,0,r.canvas.width,r.canvas.height),Lt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),h.reset()}return{buffers:{color:c,depth:u,stencil:h},enable:dt,disable:wt,bindFramebuffer:ee,drawBuffers:Bt,useProgram:ie,setBlending:Ct,setMaterial:Nt,setFlipSided:Dt,setCullFace:It,setLineWidth:ae,setPolygonOffset:jt,setScissorTest:ce,activeTexture:he,bindTexture:Q,unbindTexture:pe,compressedTexImage2D:Se,compressedTexImage3D:G,texImage2D:vt,texImage3D:yt,pixelStorei:_t,getParameter:at,updateUBOMapping:Vt,uniformBlockBinding:qt,texStorage2D:Ot,texStorage3D:Ft,texSubImage2D:T,texSubImage3D:it,compressedTexSubImage2D:ct,compressedTexSubImage3D:St,scissor:Tt,viewport:Rt,reset:re}}function $2(r,t,n,a,o,c,u){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new zt,g=new WeakMap,_=new Set;let v;const x=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(G,T){return b?new OffscreenCanvas(G,T):yu("canvas")}function M(G,T,it){let ct=1;const St=Se(G);if((St.width>it||St.height>it)&&(ct=it/Math.max(St.width,St.height)),ct<1)if(typeof HTMLImageElement<"u"&&G instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&G instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&G instanceof ImageBitmap||typeof VideoFrame<"u"&&G instanceof VideoFrame){const Ot=Math.floor(ct*St.width),Ft=Math.floor(ct*St.height);v===void 0&&(v=D(Ot,Ft));const vt=T?D(Ot,Ft):v;return vt.width=Ot,vt.height=Ft,vt.getContext("2d").drawImage(G,0,0,Ot,Ft),de("WebGLRenderer: Texture has been resized from ("+St.width+"x"+St.height+") to ("+Ot+"x"+Ft+")."),vt}else return"data"in G&&de("WebGLRenderer: Image in DataTexture is too big ("+St.width+"x"+St.height+")."),G;return G}function S(G){return G.generateMipmaps}function I(G){r.generateMipmap(G)}function z(G){return G.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:G.isWebGL3DRenderTarget?r.TEXTURE_3D:G.isWebGLArrayRenderTarget||G.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(G,T,it,ct,St,Ot=!1){if(G!==null){if(r[G]!==void 0)return r[G];de("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+G+"'")}let Ft;ct&&(Ft=t.get("EXT_texture_norm16"),Ft||de("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let vt=T;if(T===r.RED&&(it===r.FLOAT&&(vt=r.R32F),it===r.HALF_FLOAT&&(vt=r.R16F),it===r.UNSIGNED_BYTE&&(vt=r.R8),it===r.UNSIGNED_SHORT&&Ft&&(vt=Ft.R16_EXT),it===r.SHORT&&Ft&&(vt=Ft.R16_SNORM_EXT)),T===r.RED_INTEGER&&(it===r.UNSIGNED_BYTE&&(vt=r.R8UI),it===r.UNSIGNED_SHORT&&(vt=r.R16UI),it===r.UNSIGNED_INT&&(vt=r.R32UI),it===r.BYTE&&(vt=r.R8I),it===r.SHORT&&(vt=r.R16I),it===r.INT&&(vt=r.R32I)),T===r.RG&&(it===r.FLOAT&&(vt=r.RG32F),it===r.HALF_FLOAT&&(vt=r.RG16F),it===r.UNSIGNED_BYTE&&(vt=r.RG8),it===r.UNSIGNED_SHORT&&Ft&&(vt=Ft.RG16_EXT),it===r.SHORT&&Ft&&(vt=Ft.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(it===r.UNSIGNED_BYTE&&(vt=r.RG8UI),it===r.UNSIGNED_SHORT&&(vt=r.RG16UI),it===r.UNSIGNED_INT&&(vt=r.RG32UI),it===r.BYTE&&(vt=r.RG8I),it===r.SHORT&&(vt=r.RG16I),it===r.INT&&(vt=r.RG32I)),T===r.RGB_INTEGER&&(it===r.UNSIGNED_BYTE&&(vt=r.RGB8UI),it===r.UNSIGNED_SHORT&&(vt=r.RGB16UI),it===r.UNSIGNED_INT&&(vt=r.RGB32UI),it===r.BYTE&&(vt=r.RGB8I),it===r.SHORT&&(vt=r.RGB16I),it===r.INT&&(vt=r.RGB32I)),T===r.RGBA_INTEGER&&(it===r.UNSIGNED_BYTE&&(vt=r.RGBA8UI),it===r.UNSIGNED_SHORT&&(vt=r.RGBA16UI),it===r.UNSIGNED_INT&&(vt=r.RGBA32UI),it===r.BYTE&&(vt=r.RGBA8I),it===r.SHORT&&(vt=r.RGBA16I),it===r.INT&&(vt=r.RGBA32I)),T===r.RGB&&(it===r.UNSIGNED_SHORT&&Ft&&(vt=Ft.RGB16_EXT),it===r.SHORT&&Ft&&(vt=Ft.RGB16_SNORM_EXT),it===r.UNSIGNED_INT_5_9_9_9_REV&&(vt=r.RGB9_E5),it===r.UNSIGNED_INT_10F_11F_11F_REV&&(vt=r.R11F_G11F_B10F)),T===r.RGBA){const yt=Ot?Su:Le.getTransfer(St);it===r.FLOAT&&(vt=r.RGBA32F),it===r.HALF_FLOAT&&(vt=r.RGBA16F),it===r.UNSIGNED_BYTE&&(vt=yt===Xe?r.SRGB8_ALPHA8:r.RGBA8),it===r.UNSIGNED_SHORT&&Ft&&(vt=Ft.RGBA16_EXT),it===r.SHORT&&Ft&&(vt=Ft.RGBA16_SNORM_EXT),it===r.UNSIGNED_SHORT_4_4_4_4&&(vt=r.RGBA4),it===r.UNSIGNED_SHORT_5_5_5_1&&(vt=r.RGB5_A1)}return(vt===r.R16F||vt===r.R32F||vt===r.RG16F||vt===r.RG32F||vt===r.RGBA16F||vt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),vt}function O(G,T){let it;return G?T===null||T===ea||T===dl?it=r.DEPTH24_STENCIL8:T===Hi?it=r.DEPTH32F_STENCIL8:T===hl&&(it=r.DEPTH24_STENCIL8,de("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ea||T===dl?it=r.DEPTH_COMPONENT24:T===Hi?it=r.DEPTH_COMPONENT32F:T===hl&&(it=r.DEPTH_COMPONENT16),it}function w(G,T){return S(G)===!0||G.isFramebufferTexture&&G.minFilter!==Pn&&G.minFilter!==Fn?Math.log2(Math.max(T.width,T.height))+1:G.mipmaps!==void 0&&G.mipmaps.length>0?G.mipmaps.length:G.isCompressedTexture&&Array.isArray(G.image)?T.mipmaps.length:1}function N(G){const T=G.target;T.removeEventListener("dispose",N),L(T),T.isVideoTexture&&g.delete(T),T.isHTMLTexture&&_.delete(T)}function E(G){const T=G.target;T.removeEventListener("dispose",E),W(T)}function L(G){const T=a.get(G);if(T.__webglInit===void 0)return;const it=G.source,ct=x.get(it);if(ct){const St=ct[T.__cacheKey];St.usedTimes--,St.usedTimes===0&&H(G),Object.keys(ct).length===0&&x.delete(it)}a.remove(G)}function H(G){const T=a.get(G);r.deleteTexture(T.__webglTexture);const it=G.source,ct=x.get(it);delete ct[T.__cacheKey],u.memory.textures--}function W(G){const T=a.get(G);if(G.depthTexture&&(G.depthTexture.dispose(),a.remove(G.depthTexture)),G.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(T.__webglFramebuffer[ct]))for(let St=0;St<T.__webglFramebuffer[ct].length;St++)r.deleteFramebuffer(T.__webglFramebuffer[ct][St]);else r.deleteFramebuffer(T.__webglFramebuffer[ct]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ct])}else{if(Array.isArray(T.__webglFramebuffer))for(let ct=0;ct<T.__webglFramebuffer.length;ct++)r.deleteFramebuffer(T.__webglFramebuffer[ct]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ct=0;ct<T.__webglColorRenderbuffer.length;ct++)T.__webglColorRenderbuffer[ct]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ct]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const it=G.textures;for(let ct=0,St=it.length;ct<St;ct++){const Ot=a.get(it[ct]);Ot.__webglTexture&&(r.deleteTexture(Ot.__webglTexture),u.memory.textures--),a.remove(it[ct])}a.remove(G)}let Y=0;function j(){Y=0}function F(){return Y}function q(G){Y=G}function B(){const G=Y;return G>=o.maxTextures&&de("WebGLTextures: Trying to use "+(G+1)+" texture units while this GPU supports only "+o.maxTextures),Y+=1,G}function P(G){const T=[];return T.push(G.wrapS),T.push(G.wrapT),T.push(G.wrapR||0),T.push(G.magFilter),T.push(G.minFilter),T.push(G.anisotropy),T.push(G.internalFormat),T.push(G.format),T.push(G.type),T.push(G.generateMipmaps),T.push(G.premultiplyAlpha),T.push(G.flipY),T.push(G.unpackAlignment),T.push(G.colorSpace),T.join()}function k(G,T){const it=a.get(G);if(G.isVideoTexture&&Q(G),G.isRenderTargetTexture===!1&&G.isExternalTexture!==!0&&G.version>0&&it.__version!==G.version){const ct=G.image;if(ct===null)de("WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)de("WebGLRenderer: Texture marked for update but image is incomplete");else{wt(it,G,T);return}}else G.isExternalTexture&&(it.__webglTexture=G.sourceTexture?G.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,it.__webglTexture,r.TEXTURE0+T)}function V(G,T){const it=a.get(G);if(G.isRenderTargetTexture===!1&&G.version>0&&it.__version!==G.version){wt(it,G,T);return}else G.isExternalTexture&&(it.__webglTexture=G.sourceTexture?G.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,it.__webglTexture,r.TEXTURE0+T)}function X(G,T){const it=a.get(G);if(G.isRenderTargetTexture===!1&&G.version>0&&it.__version!==G.version){wt(it,G,T);return}n.bindTexture(r.TEXTURE_3D,it.__webglTexture,r.TEXTURE0+T)}function R(G,T){const it=a.get(G);if(G.isCubeDepthTexture!==!0&&G.version>0&&it.__version!==G.version){ee(it,G,T);return}n.bindTexture(r.TEXTURE_CUBE_MAP,it.__webglTexture,r.TEXTURE0+T)}const J={[fl]:r.REPEAT,[Da]:r.CLAMP_TO_EDGE,[Cd]:r.MIRRORED_REPEAT},rt={[Pn]:r.NEAREST,[yM]:r.NEAREST_MIPMAP_NEAREST,[Pc]:r.NEAREST_MIPMAP_LINEAR,[Fn]:r.LINEAR,[Xh]:r.LINEAR_MIPMAP_NEAREST,[zs]:r.LINEAR_MIPMAP_LINEAR},xt={[TM]:r.NEVER,[DM]:r.ALWAYS,[AM]:r.LESS,[Ep]:r.LEQUAL,[wM]:r.EQUAL,[bp]:r.GEQUAL,[RM]:r.GREATER,[CM]:r.NOTEQUAL};function Lt(G,T){if(T.type===Hi&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Fn||T.magFilter===Xh||T.magFilter===Pc||T.magFilter===zs||T.minFilter===Fn||T.minFilter===Xh||T.minFilter===Pc||T.minFilter===zs)&&de("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(G,r.TEXTURE_WRAP_S,J[T.wrapS]),r.texParameteri(G,r.TEXTURE_WRAP_T,J[T.wrapT]),(G===r.TEXTURE_3D||G===r.TEXTURE_2D_ARRAY)&&r.texParameteri(G,r.TEXTURE_WRAP_R,J[T.wrapR]),r.texParameteri(G,r.TEXTURE_MAG_FILTER,rt[T.magFilter]),r.texParameteri(G,r.TEXTURE_MIN_FILTER,rt[T.minFilter]),T.compareFunction&&(r.texParameteri(G,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(G,r.TEXTURE_COMPARE_FUNC,xt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Pn||T.minFilter!==Pc&&T.minFilter!==zs||T.type===Hi&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||a.get(T).__currentAnisotropy){const it=t.get("EXT_texture_filter_anisotropic");r.texParameterf(G,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,o.getMaxAnisotropy())),a.get(T).__currentAnisotropy=T.anisotropy}}}function Pt(G,T){let it=!1;G.__webglInit===void 0&&(G.__webglInit=!0,T.addEventListener("dispose",N));const ct=T.source;let St=x.get(ct);St===void 0&&(St={},x.set(ct,St));const Ot=P(T);if(Ot!==G.__cacheKey){St[Ot]===void 0&&(St[Ot]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,it=!0),St[Ot].usedTimes++;const Ft=St[G.__cacheKey];Ft!==void 0&&(St[G.__cacheKey].usedTimes--,Ft.usedTimes===0&&H(T)),G.__cacheKey=Ot,G.__webglTexture=St[Ot].texture}return it}function nt(G,T,it){return Math.floor(Math.floor(G/it)/T)}function dt(G,T,it,ct){const Ot=G.updateRanges;if(Ot.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,it,ct,T.data);else{Ot.sort((_t,Tt)=>_t.start-Tt.start);let Ft=0;for(let _t=1;_t<Ot.length;_t++){const Tt=Ot[Ft],Rt=Ot[_t],Vt=Tt.start+Tt.count,qt=nt(Rt.start,T.width,4),re=nt(Tt.start,T.width,4);Rt.start<=Vt+1&&qt===re&&nt(Rt.start+Rt.count-1,T.width,4)===qt?Tt.count=Math.max(Tt.count,Rt.start+Rt.count-Tt.start):(++Ft,Ot[Ft]=Rt)}Ot.length=Ft+1;const vt=n.getParameter(r.UNPACK_ROW_LENGTH),yt=n.getParameter(r.UNPACK_SKIP_PIXELS),at=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let _t=0,Tt=Ot.length;_t<Tt;_t++){const Rt=Ot[_t],Vt=Math.floor(Rt.start/4),qt=Math.ceil(Rt.count/4),re=Vt%T.width,$=Math.floor(Vt/T.width),Ht=qt,Mt=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,re),n.pixelStorei(r.UNPACK_SKIP_ROWS,$),n.texSubImage2D(r.TEXTURE_2D,0,re,$,Ht,Mt,it,ct,T.data)}G.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,vt),n.pixelStorei(r.UNPACK_SKIP_PIXELS,yt),n.pixelStorei(r.UNPACK_SKIP_ROWS,at)}}function wt(G,T,it){let ct=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ct=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ct=r.TEXTURE_3D);const St=Pt(G,T),Ot=T.source;n.bindTexture(ct,G.__webglTexture,r.TEXTURE0+it);const Ft=a.get(Ot);if(Ot.version!==Ft.__version||St===!0){if(n.activeTexture(r.TEXTURE0+it),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const Mt=Le.getPrimaries(Le.workingColorSpace),Gt=T.colorSpace===Ca?null:Le.getPrimaries(T.colorSpace),Yt=T.colorSpace===Ca||Mt===Gt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt)}n.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let yt=M(T.image,!1,o.maxTextureSize);yt=pe(T,yt);const at=c.convert(T.format,T.colorSpace),_t=c.convert(T.type);let Tt=A(T.internalFormat,at,_t,T.normalized,T.colorSpace,T.isVideoTexture);Lt(ct,T);let Rt;const Vt=T.mipmaps,qt=T.isVideoTexture!==!0,re=Ft.__version===void 0||St===!0,$=Ot.dataReady,Ht=w(T,yt);if(T.isDepthTexture)Tt=O(T.format===Bs,T.type),re&&(qt?n.texStorage2D(r.TEXTURE_2D,1,Tt,yt.width,yt.height):n.texImage2D(r.TEXTURE_2D,0,Tt,yt.width,yt.height,0,at,_t,null));else if(T.isDataTexture)if(Vt.length>0){qt&&re&&n.texStorage2D(r.TEXTURE_2D,Ht,Tt,Vt[0].width,Vt[0].height);for(let Mt=0,Gt=Vt.length;Mt<Gt;Mt++)Rt=Vt[Mt],qt?$&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Rt.width,Rt.height,at,_t,Rt.data):n.texImage2D(r.TEXTURE_2D,Mt,Tt,Rt.width,Rt.height,0,at,_t,Rt.data);T.generateMipmaps=!1}else qt?(re&&n.texStorage2D(r.TEXTURE_2D,Ht,Tt,yt.width,yt.height),$&&dt(T,yt,at,_t)):n.texImage2D(r.TEXTURE_2D,0,Tt,yt.width,yt.height,0,at,_t,yt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){qt&&re&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ht,Tt,Vt[0].width,Vt[0].height,yt.depth);for(let Mt=0,Gt=Vt.length;Mt<Gt;Mt++)if(Rt=Vt[Mt],T.format!==Gi)if(at!==null)if(qt){if($)if(T.layerUpdates.size>0){const Yt=g_(Rt.width,Rt.height,T.format,T.type);for(const Ut of T.layerUpdates){const oe=Rt.data.subarray(Ut*Yt/Rt.data.BYTES_PER_ELEMENT,(Ut+1)*Yt/Rt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,Ut,Rt.width,Rt.height,1,at,oe)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Rt.width,Rt.height,yt.depth,at,Rt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Mt,Tt,Rt.width,Rt.height,yt.depth,0,Rt.data,0,0);else de("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?$&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Rt.width,Rt.height,yt.depth,at,_t,Rt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,Mt,Tt,Rt.width,Rt.height,yt.depth,0,at,_t,Rt.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{qt&&re&&n.texStorage2D(r.TEXTURE_2D,Ht,Tt,Vt[0].width,Vt[0].height);for(let Mt=0,Gt=Vt.length;Mt<Gt;Mt++)Rt=Vt[Mt],T.format!==Gi?at!==null?qt?$&&n.compressedTexSubImage2D(r.TEXTURE_2D,Mt,0,0,Rt.width,Rt.height,at,Rt.data):n.compressedTexImage2D(r.TEXTURE_2D,Mt,Tt,Rt.width,Rt.height,0,Rt.data):de("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?$&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Rt.width,Rt.height,at,_t,Rt.data):n.texImage2D(r.TEXTURE_2D,Mt,Tt,Rt.width,Rt.height,0,at,_t,Rt.data)}else if(T.isDataArrayTexture)if(qt){if(re&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ht,Tt,yt.width,yt.height,yt.depth),$)if(T.layerUpdates.size>0){const Mt=g_(yt.width,yt.height,T.format,T.type);for(const Gt of T.layerUpdates){const Yt=yt.data.subarray(Gt*Mt/yt.data.BYTES_PER_ELEMENT,(Gt+1)*Mt/yt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Gt,yt.width,yt.height,1,at,_t,Yt)}T.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,yt.width,yt.height,yt.depth,at,_t,yt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Tt,yt.width,yt.height,yt.depth,0,at,_t,yt.data);else if(T.isData3DTexture)qt?(re&&n.texStorage3D(r.TEXTURE_3D,Ht,Tt,yt.width,yt.height,yt.depth),$&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,yt.width,yt.height,yt.depth,at,_t,yt.data)):n.texImage3D(r.TEXTURE_3D,0,Tt,yt.width,yt.height,yt.depth,0,at,_t,yt.data);else if(T.isFramebufferTexture){if(re)if(qt)n.texStorage2D(r.TEXTURE_2D,Ht,Tt,yt.width,yt.height);else{let Mt=yt.width,Gt=yt.height;for(let Yt=0;Yt<Ht;Yt++)n.texImage2D(r.TEXTURE_2D,Yt,Tt,Mt,Gt,0,at,_t,null),Mt>>=1,Gt>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const Mt=r.canvas;if(Mt.hasAttribute("layoutsubtree")||Mt.setAttribute("layoutsubtree","true"),yt.parentNode!==Mt){Mt.appendChild(yt),_.add(T),Mt.onpaint=Gt=>{const Yt=Gt.changedElements;for(const Ut of _)Yt.includes(Ut.image)&&(Ut.needsUpdate=!0)},Mt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,yt);else{const Yt=r.RGBA,Ut=r.RGBA,oe=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Yt,Ut,oe,yt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Vt.length>0){if(qt&&re){const Mt=Se(Vt[0]);n.texStorage2D(r.TEXTURE_2D,Ht,Tt,Mt.width,Mt.height)}for(let Mt=0,Gt=Vt.length;Mt<Gt;Mt++)Rt=Vt[Mt],qt?$&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,at,_t,Rt):n.texImage2D(r.TEXTURE_2D,Mt,Tt,at,_t,Rt);T.generateMipmaps=!1}else if(qt){if(re){const Mt=Se(yt);n.texStorage2D(r.TEXTURE_2D,Ht,Tt,Mt.width,Mt.height)}$&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,at,_t,yt)}else n.texImage2D(r.TEXTURE_2D,0,Tt,at,_t,yt);S(T)&&I(ct),Ft.__version=Ot.version,T.onUpdate&&T.onUpdate(T)}G.__version=T.version}function ee(G,T,it){if(T.image.length!==6)return;const ct=Pt(G,T),St=T.source;n.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+it);const Ot=a.get(St);if(St.version!==Ot.__version||ct===!0){n.activeTexture(r.TEXTURE0+it);const Ft=Le.getPrimaries(Le.workingColorSpace),vt=T.colorSpace===Ca?null:Le.getPrimaries(T.colorSpace),yt=T.colorSpace===Ca||Ft===vt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const at=T.isCompressedTexture||T.image[0].isCompressedTexture,_t=T.image[0]&&T.image[0].isDataTexture,Tt=[];for(let Ut=0;Ut<6;Ut++)!at&&!_t?Tt[Ut]=M(T.image[Ut],!0,o.maxCubemapSize):Tt[Ut]=_t?T.image[Ut].image:T.image[Ut],Tt[Ut]=pe(T,Tt[Ut]);const Rt=Tt[0],Vt=c.convert(T.format,T.colorSpace),qt=c.convert(T.type),re=A(T.internalFormat,Vt,qt,T.normalized,T.colorSpace),$=T.isVideoTexture!==!0,Ht=Ot.__version===void 0||ct===!0,Mt=St.dataReady;let Gt=w(T,Rt);Lt(r.TEXTURE_CUBE_MAP,T);let Yt;if(at){$&&Ht&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Gt,re,Rt.width,Rt.height);for(let Ut=0;Ut<6;Ut++){Yt=Tt[Ut].mipmaps;for(let oe=0;oe<Yt.length;oe++){const $t=Yt[oe];T.format!==Gi?Vt!==null?$?Mt&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe,0,0,$t.width,$t.height,Vt,$t.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe,re,$t.width,$t.height,0,$t.data):de("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe,0,0,$t.width,$t.height,Vt,qt,$t.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe,re,$t.width,$t.height,0,Vt,qt,$t.data)}}}else{if(Yt=T.mipmaps,$&&Ht){Yt.length>0&&Gt++;const Ut=Se(Tt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Gt,re,Ut.width,Ut.height)}for(let Ut=0;Ut<6;Ut++)if(_t){$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,0,0,Tt[Ut].width,Tt[Ut].height,Vt,qt,Tt[Ut].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,re,Tt[Ut].width,Tt[Ut].height,0,Vt,qt,Tt[Ut].data);for(let oe=0;oe<Yt.length;oe++){const We=Yt[oe].image[Ut].image;$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe+1,0,0,We.width,We.height,Vt,qt,We.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe+1,re,We.width,We.height,0,Vt,qt,We.data)}}else{$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,0,0,Vt,qt,Tt[Ut]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,re,Vt,qt,Tt[Ut]);for(let oe=0;oe<Yt.length;oe++){const $t=Yt[oe];$?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe+1,0,0,Vt,qt,$t.image[Ut]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,oe+1,re,Vt,qt,$t.image[Ut])}}}S(T)&&I(r.TEXTURE_CUBE_MAP),Ot.__version=St.version,T.onUpdate&&T.onUpdate(T)}G.__version=T.version}function Bt(G,T,it,ct,St,Ot){const Ft=c.convert(it.format,it.colorSpace),vt=c.convert(it.type),yt=A(it.internalFormat,Ft,vt,it.normalized,it.colorSpace),at=a.get(T),_t=a.get(it);if(_t.__renderTarget=T,!at.__hasExternalTextures){const Tt=Math.max(1,T.width>>Ot),Rt=Math.max(1,T.height>>Ot);St===r.TEXTURE_3D||St===r.TEXTURE_2D_ARRAY?n.texImage3D(St,Ot,yt,Tt,Rt,T.depth,0,Ft,vt,null):n.texImage2D(St,Ot,yt,Tt,Rt,0,Ft,vt,null)}n.bindFramebuffer(r.FRAMEBUFFER,G),he(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ct,St,_t.__webglTexture,0,ce(T)):(St===r.TEXTURE_2D||St>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&St<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ct,St,_t.__webglTexture,Ot),n.bindFramebuffer(r.FRAMEBUFFER,null)}function ie(G,T,it){if(r.bindRenderbuffer(r.RENDERBUFFER,G),T.depthBuffer){const ct=T.depthTexture,St=ct&&ct.isDepthTexture?ct.type:null,Ot=O(T.stencilBuffer,St),Ft=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;he(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ce(T),Ot,T.width,T.height):it?r.renderbufferStorageMultisample(r.RENDERBUFFER,ce(T),Ot,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ot,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ft,r.RENDERBUFFER,G)}else{const ct=T.textures;for(let St=0;St<ct.length;St++){const Ot=ct[St],Ft=c.convert(Ot.format,Ot.colorSpace),vt=c.convert(Ot.type),yt=A(Ot.internalFormat,Ft,vt,Ot.normalized,Ot.colorSpace);he(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ce(T),yt,T.width,T.height):it?r.renderbufferStorageMultisample(r.RENDERBUFFER,ce(T),yt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,yt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ue(G,T,it){const ct=T.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,G),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const St=a.get(T.depthTexture);if(St.__renderTarget=T,(!St.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ct){if(St.__webglInit===void 0&&(St.__webglInit=!0,T.depthTexture.addEventListener("dispose",N)),St.__webglTexture===void 0){St.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,St.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T.depthTexture);const at=c.convert(T.depthTexture.format),_t=c.convert(T.depthTexture.type);let Tt;T.depthTexture.format===Na?Tt=r.DEPTH_COMPONENT24:T.depthTexture.format===Bs&&(Tt=r.DEPTH24_STENCIL8);for(let Rt=0;Rt<6;Rt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,0,Tt,T.width,T.height,0,at,_t,null)}}else k(T.depthTexture,0);const Ot=St.__webglTexture,Ft=ce(T),vt=ct?r.TEXTURE_CUBE_MAP_POSITIVE_X+it:r.TEXTURE_2D,yt=T.depthTexture.format===Bs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===Na)he(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,yt,vt,Ot,0,Ft):r.framebufferTexture2D(r.FRAMEBUFFER,yt,vt,Ot,0);else if(T.depthTexture.format===Bs)he(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,yt,vt,Ot,0,Ft):r.framebufferTexture2D(r.FRAMEBUFFER,yt,vt,Ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function mt(G){const T=a.get(G),it=G.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==G.depthTexture){const ct=G.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ct){const St=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ct.removeEventListener("dispose",St)};ct.addEventListener("dispose",St),T.__depthDisposeCallback=St}T.__boundDepthTexture=ct}if(G.depthTexture&&!T.__autoAllocateDepthBuffer)if(it)for(let ct=0;ct<6;ct++)ue(T.__webglFramebuffer[ct],G,ct);else{const ct=G.texture.mipmaps;ct&&ct.length>0?ue(T.__webglFramebuffer[0],G,0):ue(T.__webglFramebuffer,G,0)}else if(it){T.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ct]),T.__webglDepthbuffer[ct]===void 0)T.__webglDepthbuffer[ct]=r.createRenderbuffer(),ie(T.__webglDepthbuffer[ct],G,!1);else{const St=G.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ot=T.__webglDepthbuffer[ct];r.bindRenderbuffer(r.RENDERBUFFER,Ot),r.framebufferRenderbuffer(r.FRAMEBUFFER,St,r.RENDERBUFFER,Ot)}}else{const ct=G.texture.mipmaps;if(ct&&ct.length>0?n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),ie(T.__webglDepthbuffer,G,!1);else{const St=G.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ot=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ot),r.framebufferRenderbuffer(r.FRAMEBUFFER,St,r.RENDERBUFFER,Ot)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ct(G,T,it){const ct=a.get(G);T!==void 0&&Bt(ct.__webglFramebuffer,G,G.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),it!==void 0&&mt(G)}function Nt(G){const T=G.texture,it=a.get(G),ct=a.get(T);G.addEventListener("dispose",E);const St=G.textures,Ot=G.isWebGLCubeRenderTarget===!0,Ft=St.length>1;if(Ft||(ct.__webglTexture===void 0&&(ct.__webglTexture=r.createTexture()),ct.__version=T.version,u.memory.textures++),Ot){it.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(T.mipmaps&&T.mipmaps.length>0){it.__webglFramebuffer[vt]=[];for(let yt=0;yt<T.mipmaps.length;yt++)it.__webglFramebuffer[vt][yt]=r.createFramebuffer()}else it.__webglFramebuffer[vt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){it.__webglFramebuffer=[];for(let vt=0;vt<T.mipmaps.length;vt++)it.__webglFramebuffer[vt]=r.createFramebuffer()}else it.__webglFramebuffer=r.createFramebuffer();if(Ft)for(let vt=0,yt=St.length;vt<yt;vt++){const at=a.get(St[vt]);at.__webglTexture===void 0&&(at.__webglTexture=r.createTexture(),u.memory.textures++)}if(G.samples>0&&he(G)===!1){it.__webglMultisampledFramebuffer=r.createFramebuffer(),it.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let vt=0;vt<St.length;vt++){const yt=St[vt];it.__webglColorRenderbuffer[vt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,it.__webglColorRenderbuffer[vt]);const at=c.convert(yt.format,yt.colorSpace),_t=c.convert(yt.type),Tt=A(yt.internalFormat,at,_t,yt.normalized,yt.colorSpace,G.isXRRenderTarget===!0),Rt=ce(G);r.renderbufferStorageMultisample(r.RENDERBUFFER,Rt,Tt,G.width,G.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+vt,r.RENDERBUFFER,it.__webglColorRenderbuffer[vt])}r.bindRenderbuffer(r.RENDERBUFFER,null),G.depthBuffer&&(it.__webglDepthRenderbuffer=r.createRenderbuffer(),ie(it.__webglDepthRenderbuffer,G,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ot){n.bindTexture(r.TEXTURE_CUBE_MAP,ct.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T);for(let vt=0;vt<6;vt++)if(T.mipmaps&&T.mipmaps.length>0)for(let yt=0;yt<T.mipmaps.length;yt++)Bt(it.__webglFramebuffer[vt][yt],G,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,yt);else Bt(it.__webglFramebuffer[vt],G,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);S(T)&&I(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ft){for(let vt=0,yt=St.length;vt<yt;vt++){const at=St[vt],_t=a.get(at);let Tt=r.TEXTURE_2D;(G.isWebGL3DRenderTarget||G.isWebGLArrayRenderTarget)&&(Tt=G.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Tt,_t.__webglTexture),Lt(Tt,at),Bt(it.__webglFramebuffer,G,at,r.COLOR_ATTACHMENT0+vt,Tt,0),S(at)&&I(Tt)}n.unbindTexture()}else{let vt=r.TEXTURE_2D;if((G.isWebGL3DRenderTarget||G.isWebGLArrayRenderTarget)&&(vt=G.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(vt,ct.__webglTexture),Lt(vt,T),T.mipmaps&&T.mipmaps.length>0)for(let yt=0;yt<T.mipmaps.length;yt++)Bt(it.__webglFramebuffer[yt],G,T,r.COLOR_ATTACHMENT0,vt,yt);else Bt(it.__webglFramebuffer,G,T,r.COLOR_ATTACHMENT0,vt,0);S(T)&&I(vt),n.unbindTexture()}G.depthBuffer&&mt(G)}function Dt(G){const T=G.textures;for(let it=0,ct=T.length;it<ct;it++){const St=T[it];if(S(St)){const Ot=z(G),Ft=a.get(St).__webglTexture;n.bindTexture(Ot,Ft),I(Ot),n.unbindTexture()}}}const It=[],ae=[];function jt(G){if(G.samples>0){if(he(G)===!1){const T=G.textures,it=G.width,ct=G.height;let St=r.COLOR_BUFFER_BIT;const Ot=G.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ft=a.get(G),vt=T.length>1;if(vt)for(let at=0;at<T.length;at++)n.bindFramebuffer(r.FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+at,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Ft.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+at,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Ft.__webglMultisampledFramebuffer);const yt=G.texture.mipmaps;yt&&yt.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ft.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ft.__webglFramebuffer);for(let at=0;at<T.length;at++){if(G.resolveDepthBuffer&&(G.depthBuffer&&(St|=r.DEPTH_BUFFER_BIT),G.stencilBuffer&&G.resolveStencilBuffer&&(St|=r.STENCIL_BUFFER_BIT)),vt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ft.__webglColorRenderbuffer[at]);const _t=a.get(T[at]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,_t,0)}r.blitFramebuffer(0,0,it,ct,0,0,it,ct,St,r.NEAREST),m===!0&&(It.length=0,ae.length=0,It.push(r.COLOR_ATTACHMENT0+at),G.depthBuffer&&G.storeMultisampledDepthBuffer===!1&&(It.push(Ot),ae.push(Ot),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ae)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,It))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),vt)for(let at=0;at<T.length;at++){n.bindFramebuffer(r.FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+at,r.RENDERBUFFER,Ft.__webglColorRenderbuffer[at]);const _t=a.get(T[at]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Ft.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+at,r.TEXTURE_2D,_t,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ft.__webglMultisampledFramebuffer)}else if(G.depthBuffer&&G.storeMultisampledDepthBuffer===!1&&m){const T=G.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function ce(G){return Math.min(o.maxSamples,G.samples)}function he(G){const T=a.get(G);return G.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Q(G){const T=u.render.frame;g.get(G)!==T&&(g.set(G,T),G.update())}function pe(G,T){const it=G.colorSpace,ct=G.format,St=G.type;return G.isCompressedTexture===!0||G.isVideoTexture===!0||it!==xu&&it!==Ca&&(Le.getTransfer(it)===Xe?(ct!==Gi||St!==gi)&&de("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",it)),T}function Se(G){return typeof HTMLImageElement<"u"&&G instanceof HTMLImageElement?(p.width=G.naturalWidth||G.width,p.height=G.naturalHeight||G.height):typeof VideoFrame<"u"&&G instanceof VideoFrame?(p.width=G.displayWidth,p.height=G.displayHeight):(p.width=G.width,p.height=G.height),p}this.allocateTextureUnit=B,this.resetTextureUnits=j,this.getTextureUnits=F,this.setTextureUnits=q,this.setTexture2D=k,this.setTexture2DArray=V,this.setTexture3D=X,this.setTextureCube=R,this.rebindTextures=Ct,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=Dt,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=Bt,this.useMultisampledRTT=he,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function t3(r,t){function n(a,o=Ca){let c;const u=Le.getTransfer(o);if(a===gi)return r.UNSIGNED_BYTE;if(a===vp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===_p)return r.UNSIGNED_SHORT_5_5_5_1;if(a===tx)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===ex)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===j_)return r.BYTE;if(a===$_)return r.SHORT;if(a===hl)return r.UNSIGNED_SHORT;if(a===gp)return r.INT;if(a===ea)return r.UNSIGNED_INT;if(a===Hi)return r.FLOAT;if(a===Di)return r.HALF_FLOAT;if(a===nx)return r.ALPHA;if(a===ix)return r.RGB;if(a===Gi)return r.RGBA;if(a===Na)return r.DEPTH_COMPONENT;if(a===Bs)return r.DEPTH_STENCIL;if(a===xp)return r.RED;if(a===Sp)return r.RED_INTEGER;if(a===Vs)return r.RG;if(a===yp)return r.RG_INTEGER;if(a===Mp)return r.RGBA_INTEGER;if(a===cu||a===uu||a===fu||a===hu)if(u===Xe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===cu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===uu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===fu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===hu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===cu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===uu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===fu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===hu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Dd||a===Ud||a===Ld||a===Nd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Dd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Ud)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Ld)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Nd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Od||a===Pd||a===Id||a===zd||a===Bd||a===gu||a===Fd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Od||a===Pd)return u===Xe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Id)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===zd)return c.COMPRESSED_R11_EAC;if(a===Bd)return c.COMPRESSED_SIGNED_R11_EAC;if(a===gu)return c.COMPRESSED_RG11_EAC;if(a===Fd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===Hd||a===Gd||a===Vd||a===kd||a===Xd||a===Wd||a===qd||a===Yd||a===Zd||a===Kd||a===Jd||a===Qd||a===jd||a===$d)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Hd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Gd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Vd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===kd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Xd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Wd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Yd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Zd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===Kd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Jd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===jd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===$d)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===tp||a===ep||a===np)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===tp)return u===Xe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===ep)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===np)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===ip||a===ap||a===vu||a===sp)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===ip)return c.COMPRESSED_RED_RGTC1_EXT;if(a===ap)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===vu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===sp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===dl?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const e3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,n3=`
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

}`;class i3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new dx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Ui({vertexShader:e3,fragmentShader:n3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new je(new vi(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class a3 extends Xs{constructor(t,n){super();const a=this;let o=null,c=1,u=null,h="local-floor",m=1,p=null,g=null,_=null,v=null,x=null,b=null;const D=typeof XRWebGLBinding<"u",M=new i3,S={},I=n.getContextAttributes();let z=null,A=null;const O=[],w=[],N=new zt;let E=null,L=null;const H=new ii;H.viewport=new nn;const W=new ii;W.viewport=new nn;const Y=[H,W],j=new fE;let F=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let dt=O[nt];return dt===void 0&&(dt=new Qh,O[nt]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(nt){let dt=O[nt];return dt===void 0&&(dt=new Qh,O[nt]=dt),dt.getGripSpace()},this.getHand=function(nt){let dt=O[nt];return dt===void 0&&(dt=new Qh,O[nt]=dt),dt.getHandSpace()};function B(nt){const dt=w.indexOf(nt.inputSource);if(dt===-1)return;const wt=O[dt];wt!==void 0&&(wt.update(nt.inputSource,nt.frame,p||u),wt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function P(){o.removeEventListener("select",B),o.removeEventListener("selectstart",B),o.removeEventListener("selectend",B),o.removeEventListener("squeeze",B),o.removeEventListener("squeezestart",B),o.removeEventListener("squeezeend",B),o.removeEventListener("end",P),o.removeEventListener("inputsourceschange",k);for(let nt=0;nt<O.length;nt++){const dt=w[nt];dt!==null&&(w[nt]=null,O[nt].disconnect(dt))}F=null,q=null,M.reset();for(const nt in S)delete S[nt];if(t.setRenderTarget(z),x=null,v=null,_=null,o=null,A=null,Pt.stop(),a.isPresenting=!1,t.setPixelRatio(E),t.setSize(N.width,N.height,!1),L!==null){const nt=L.camera;nt.fov=L.fov,nt.zoom=L.zoom,nt.updateProjectionMatrix(),L=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){c=nt,a.isPresenting===!0&&de("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){h=nt,a.isPresenting===!0&&de("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(nt){p=nt},this.getBaseLayer=function(){return v!==null?v:x},this.getBinding=function(){return _===null&&D&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return b},this.getSession=function(){return o},this.setSession=async function(nt){if(o=nt,o!==null){if(z=t.getRenderTarget(),o.addEventListener("select",B),o.addEventListener("selectstart",B),o.addEventListener("selectend",B),o.addEventListener("squeeze",B),o.addEventListener("squeezestart",B),o.addEventListener("squeezeend",B),o.addEventListener("end",P),o.addEventListener("inputsourceschange",k),I.xrCompatible!==!0&&await n.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(N),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,ee=null,Bt=null;I.depth&&(Bt=I.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,wt=I.stencil?Bs:Na,ee=I.stencil?dl:ea);const ie={colorFormat:n.RGBA8,depthFormat:Bt,scaleFactor:c};_=this.getBinding(),v=_.createProjectionLayer(ie),o.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),A=new _i(v.textureWidth,v.textureHeight,{format:Gi,type:gi,depthTexture:new gl(v.textureWidth,v.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:I.stencil,colorSpace:t.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const wt={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(o,n,wt),o.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new _i(x.framebufferWidth,x.framebufferHeight,{format:Gi,type:gi,colorSpace:t.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),p=null,u=await o.requestReferenceSpace(h),Pt.setContext(o),Pt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function k(nt){for(let dt=0;dt<nt.removed.length;dt++){const wt=nt.removed[dt],ee=w.indexOf(wt);ee>=0&&(w[ee]=null,O[ee].disconnect(wt))}for(let dt=0;dt<nt.added.length;dt++){const wt=nt.added[dt];let ee=w.indexOf(wt);if(ee===-1){for(let ie=0;ie<O.length;ie++)if(ie>=w.length){w.push(wt),ee=ie;break}else if(w[ie]===null){w[ie]=wt,ee=ie;break}if(ee===-1)break}const Bt=O[ee];Bt&&Bt.connect(wt)}}const V=new Z,X=new Z;function R(nt,dt,wt){V.setFromMatrixPosition(dt.matrixWorld),X.setFromMatrixPosition(wt.matrixWorld);const ee=V.distanceTo(X),Bt=dt.projectionMatrix.elements,ie=wt.projectionMatrix.elements,ue=Bt[14]/(Bt[10]-1),mt=Bt[14]/(Bt[10]+1),Ct=(Bt[9]+1)/Bt[5],Nt=(Bt[9]-1)/Bt[5],Dt=(Bt[8]-1)/Bt[0],It=(ie[8]+1)/ie[0],ae=ue*Dt,jt=ue*It,ce=ee/(-Dt+It),he=ce*-Dt;if(dt.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(he),nt.translateZ(ce),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),Bt[10]===-1)nt.projectionMatrix.copy(dt.projectionMatrix),nt.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{const Q=ue+ce,pe=mt+ce,Se=ae-he,G=jt+(ee-he),T=Ct*mt/pe*Q,it=Nt*mt/pe*Q;nt.projectionMatrix.makePerspective(Se,G,T,it,Q,pe),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function J(nt,dt){dt===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(dt.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(o===null)return;let dt=nt.near,wt=nt.far;M.texture!==null&&(M.depthNear>0&&(dt=M.depthNear),M.depthFar>0&&(wt=M.depthFar)),j.near=W.near=H.near=dt,j.far=W.far=H.far=wt,(F!==j.near||q!==j.far)&&(o.updateRenderState({depthNear:j.near,depthFar:j.far}),F=j.near,q=j.far),j.layers.mask=nt.layers.mask|6,H.layers.mask=j.layers.mask&-5,W.layers.mask=j.layers.mask&-3;const ee=nt.parent,Bt=j.cameras;J(j,ee);for(let ie=0;ie<Bt.length;ie++)J(Bt[ie],ee);Bt.length===2?R(j,H,W):j.projectionMatrix.copy(H.projectionMatrix),L===null&&nt.isPerspectiveCamera&&(L={camera:nt,fov:nt.fov,zoom:nt.zoom}),rt(nt,j,ee)};function rt(nt,dt,wt){wt===null?nt.matrix.copy(dt.matrixWorld):(nt.matrix.copy(wt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(dt.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(dt.projectionMatrix),nt.projectionMatrixInverse.copy(dt.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Zr*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(v===null&&x===null))return m},this.setFoveation=function(nt){m=nt,v!==null&&(v.fixedFoveation=nt),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=nt)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(j)},this.getCameraTexture=function(nt){return S[nt]};let xt=null;function Lt(nt,dt){if(g=dt.getViewerPose(p||u),b=dt,g!==null){const wt=g.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let ee=!1;wt.length!==j.cameras.length&&(j.cameras.length=0,ee=!0);for(let mt=0;mt<wt.length;mt++){const Ct=wt[mt];let Nt=null;if(x!==null)Nt=x.getViewport(Ct);else{const It=_.getViewSubImage(v,Ct);Nt=It.viewport,mt===0&&(t.setRenderTargetTextures(A,It.colorTexture,It.depthStencilTexture),t.setRenderTarget(A))}let Dt=Y[mt];Dt===void 0&&(Dt=new ii,Dt.layers.enable(mt),Dt.viewport=new nn,Y[mt]=Dt),Dt.matrix.fromArray(Ct.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(Ct.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),mt===0&&(j.matrix.copy(Dt.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),ee===!0&&j.cameras.push(Dt)}const Bt=o.enabledFeatures;if(Bt&&Bt.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&D){_=a.getBinding();const mt=_.getDepthInformation(wt[0]);mt&&mt.isValid&&mt.texture&&M.init(mt,o.renderState)}if(Bt&&Bt.includes("camera-access")&&D){t.state.unbindTexture(),_=a.getBinding();for(let mt=0;mt<wt.length;mt++){const Ct=wt[mt].camera;if(Ct){let Nt=S[Ct];Nt||(Nt=new dx,S[Ct]=Nt);const Dt=_.getCameraImage(Ct);Nt.sourceTexture=Dt}}}}for(let wt=0;wt<O.length;wt++){const ee=w[wt],Bt=O[wt];ee!==null&&Bt!==void 0&&Bt.update(ee,dt,p||u)}xt&&xt(nt,dt),dt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:dt}),b=null}const Pt=new wx;Pt.setAnimationLoop(Lt),this.setAnimationLoop=function(nt){xt=nt},this.dispose=function(){}}}const s3=new Ge,Ox=new ge;Ox.set(-1,0,0,0,1,0,0,0,1);function r3(r,t){function n(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function a(M,S){S.color.getRGB(M.fogColor.value,bx(r)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function o(M,S,I,z,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),_(M,S)):S.isMeshPhongMaterial?(c(M,S),g(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),v(M,S),S.isMeshPhysicalMaterial&&x(M,S,A)):S.isMeshMatcapMaterial?(c(M,S),b(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),D(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(u(M,S),S.isLineDashedMaterial&&h(M,S)):S.isPointsMaterial?m(M,S,I,z):S.isSpriteMaterial?p(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,n(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Zn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,n(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Zn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,n(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,n(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,n(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const I=t.get(S),z=I.envMap,A=I.envMapRotation;z&&(M.envMap.value=z,M.envMapRotation.value.setFromMatrix4(s3.makeRotationFromEuler(A)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(Ox),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,n(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,n(S.aoMap,M.aoMapTransform))}function u(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform))}function h(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,I,z){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*I,M.scale.value=z*.5,S.map&&(M.map.value=S.map,n(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function p(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function g(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function _(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function v(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,n(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,n(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,I){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,n(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,n(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,n(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,n(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,n(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Zn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,n(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,n(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=I.texture,M.transmissionSamplerSize.value.set(I.width,I.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,n(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,n(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,n(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,n(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,n(S.specularIntensityMap,M.specularIntensityMapTransform))}function b(M,S){S.matcap&&(M.matcap.value=S.matcap)}function D(M,S){const I=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(I.matrixWorld),M.nearDistance.value=I.shadow.camera.near,M.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function o3(r,t,n,a){let o={},c={},u=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,O){const w=O.program;a.uniformBlockBinding(A,w)}function p(A,O){let w=o[A.id];w===void 0&&(M(A),w=g(A),o[A.id]=w,A.addEventListener("dispose",I));const N=O.program;a.updateUBOMapping(A,N);const E=t.render.frame;c[A.id]!==E&&(v(A),c[A.id]=E)}function g(A){const O=_();A.__bindingPointIndex=O;const w=r.createBuffer(),N=A.__size,E=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,N,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,O,w),w}function _(){for(let A=0;A<h;A++)if(u.indexOf(A)===-1)return u.push(A),A;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(A){const O=o[A.id],w=A.uniforms,N=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,O);for(let E=0,L=w.length;E<L;E++){const H=w[E];if(Array.isArray(H))for(let W=0,Y=H.length;W<Y;W++)x(H[W],E,W,N);else x(H,E,0,N)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,O,w,N){if(D(A,O,w,N)===!0){const E=A.__offset,L=A.value;if(Array.isArray(L)){let H=0;for(let W=0;W<L.length;W++){const Y=L[W],j=S(Y);b(Y,A.__data,H),typeof Y!="number"&&typeof Y!="boolean"&&!Y.isMatrix3&&!ArrayBuffer.isView(Y)&&(H+=j.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(L,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,E,A.__data)}}function b(A,O,w){typeof A=="number"||typeof A=="boolean"?O[0]=A:A.isMatrix3?(O[0]=A.elements[0],O[1]=A.elements[1],O[2]=A.elements[2],O[3]=0,O[4]=A.elements[3],O[5]=A.elements[4],O[6]=A.elements[5],O[7]=0,O[8]=A.elements[6],O[9]=A.elements[7],O[10]=A.elements[8],O[11]=0):ArrayBuffer.isView(A)?O.set(new A.constructor(A.buffer,A.byteOffset,O.length)):A.toArray(O,w)}function D(A,O,w,N){const E=A.value,L=O+"_"+w;if(N[L]===void 0)return typeof E=="number"||typeof E=="boolean"?N[L]=E:ArrayBuffer.isView(E)?N[L]=E.slice():N[L]=E.clone(),!0;{const H=N[L];if(typeof E=="number"||typeof E=="boolean"){if(H!==E)return N[L]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(H.equals(E)===!1)return H.copy(E),!0}}return!1}function M(A){const O=A.uniforms;let w=0;const N=16;for(let L=0,H=O.length;L<H;L++){const W=Array.isArray(O[L])?O[L]:[O[L]];for(let Y=0,j=W.length;Y<j;Y++){const F=W[Y],q=Array.isArray(F.value)?F.value:[F.value];for(let B=0,P=q.length;B<P;B++){const k=q[B],V=S(k),X=w%N,R=X%V.boundary,J=X+R;w+=R,J!==0&&N-J<V.storage&&(w+=N-J),F.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=w,w+=V.storage}}}const E=w%N;return E>0&&(w+=N-E),A.__size=w,A.__cache={},this}function S(A){const O={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(O.boundary=4,O.storage=4):A.isVector2?(O.boundary=8,O.storage=8):A.isVector3||A.isColor?(O.boundary=16,O.storage=12):A.isVector4?(O.boundary=16,O.storage=16):A.isMatrix3?(O.boundary=48,O.storage=48):A.isMatrix4?(O.boundary=64,O.storage=64):A.isTexture?de("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(O.boundary=16,O.storage=A.byteLength):de("WebGLRenderer: Unsupported uniform value type.",A),O}function I(A){const O=A.target;O.removeEventListener("dispose",I);const w=u.indexOf(O.__bindingPointIndex);u.splice(w,1),r.deleteBuffer(o[O.id]),delete o[O.id],delete c[O.id]}function z(){for(const A in o)r.deleteBuffer(o[A]);u=[],o={},c={}}return{bind:m,update:p,dispose:z}}const l3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qi=null;function c3(){return Qi===null&&(Qi=new fx(l3,16,16,Vs,Di),Qi.name="DFG_LUT",Qi.minFilter=Fn,Qi.magFilter=Fn,Qi.wrapS=Da,Qi.wrapT=Da,Qi.generateMipmaps=!1,Qi.needsUpdate=!0),Qi}class u3{constructor(t={}){const{canvas:n=NM(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1,outputBufferType:x=gi}=t;this.isWebGLRenderer=!0;let b;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=a.getContextAttributes().alpha}else b=u;const D=x,M=new Set([Mp,yp,Sp]),S=new Set([gi,ea,hl,dl,vp,_p]),I=new Uint32Array(4),z=new Int32Array(4),A=new Z;let O=null,w=null;const N=[],E=[];let L=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ta,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const H=this;let W=!1,Y=null,j=null,F=null,q=null;this._outputColorSpace=Yn;let B=0,P=0,k=null,V=-1,X=null;const R=new nn,J=new nn;let rt=null;const xt=new ve(0);let Lt=0,Pt=n.width,nt=n.height,dt=1,wt=null,ee=null;const Bt=new nn(0,0,Pt,nt),ie=new nn(0,0,Pt,nt);let ue=!1;const mt=new Dp;let Ct=!1,Nt=!1;const Dt=new Ge,It=new Z,ae=new nn,jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function he(){return k===null?dt:1}let Q=a;function pe(C,tt){return n.getContext(C,tt)}let Se,G,T,it,ct,St,Ot,Ft,vt,yt,at,_t,Tt,Rt,Vt,qt,re,$,Ht,Mt,Gt,Yt,Ut;try{const C={alpha:!0,depth:o,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${dp}`),n.addEventListener("webglcontextlost",We,!1),n.addEventListener("webglcontextrestored",Pe,!1),n.addEventListener("webglcontextcreationerror",Kn,!1),Q===null){const tt="webgl2";if(Q=pe(tt,C),Q===null)throw pe(tt)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}oe()}catch(C){throw n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Pe,!1),n.removeEventListener("webglcontextcreationerror",Kn,!1),Ne("WebGLRenderer: "+C.message),C}function oe(){Se=new cA(Q),Se.init(),Gt=new t3(Q,Se),G=new $T(Q,Se,t,Gt),T=new j2(Q,Se),G.reversedDepthBuffer&&v&&T.buffers.depth.setReversed(!0),j=Q.createFramebuffer(),F=Q.createFramebuffer(),q=Q.createFramebuffer(),it=new hA(Q),ct=new B2,St=new $2(Q,Se,T,ct,G,Gt,it),Ot=new lA(H),Ft=new pE(Q),Yt=new QT(Q,Ft),vt=new uA(Q,Ft,it,Yt),yt=new pA(Q,vt,Ft,Yt,it),$=new dA(Q,G,St),Vt=new tA(ct),at=new z2(H,Ot,Se,G,Yt,Vt),_t=new r3(H,ct),Tt=new H2,Rt=new q2(Se),re=new JT(H,Ot,T,yt,b,m),qt=new Q2(H,yt,G),Ut=new o3(Q,it,G,T),Ht=new jT(Q,Se,it),Mt=new fA(Q,Se,it),it.programs=at.programs,H.capabilities=G,H.extensions=Se,H.properties=ct,H.renderLists=Tt,H.shadowMap=qt,H.state=T,H.info=it}D!==gi&&(L=new gA(D,n.width,n.height,h,o,c));const $t=new a3(H,Q);this.xr=$t,this.getContext=function(){return Q},this.getContextAttributes=function(){return Q.getContextAttributes()},this.forceContextLoss=function(){const C=Se.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Se.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return dt},this.setPixelRatio=function(C){C!==void 0&&(dt=C,this.setSize(Pt,nt,!1))},this.getSize=function(C){return C.set(Pt,nt)},this.setSize=function(C,tt,pt=!0){if($t.isPresenting){de("WebGLRenderer: Can't change size while VR device is presenting.");return}Pt=C,nt=tt,n.width=Math.floor(C*dt),n.height=Math.floor(tt*dt),pt===!0&&(n.style.width=C+"px",n.style.height=tt+"px"),L!==null&&L.setSize(n.width,n.height),this.setViewport(0,0,C,tt)},this.getDrawingBufferSize=function(C){return C.set(Pt*dt,nt*dt).floor()},this.setDrawingBufferSize=function(C,tt,pt){Pt=C,nt=tt,dt=pt,n.width=Math.floor(C*pt),n.height=Math.floor(tt*pt),this.setViewport(0,0,C,tt)},this.setEffects=function(C){if(D===gi){Ne("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let tt=0;tt<C.length;tt++)if(C[tt].isOutputPass===!0){de("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(R)},this.getViewport=function(C){return C.copy(Bt)},this.setViewport=function(C,tt,pt,ot){C.isVector4?Bt.set(C.x,C.y,C.z,C.w):Bt.set(C,tt,pt,ot),T.viewport(R.copy(Bt).multiplyScalar(dt).round())},this.getScissor=function(C){return C.copy(ie)},this.setScissor=function(C,tt,pt,ot){C.isVector4?ie.set(C.x,C.y,C.z,C.w):ie.set(C,tt,pt,ot),T.scissor(J.copy(ie).multiplyScalar(dt).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(C){T.setScissorTest(ue=C)},this.setOpaqueSort=function(C){wt=C},this.setTransparentSort=function(C){ee=C},this.getClearColor=function(C){return C.copy(re.getClearColor())},this.setClearColor=function(){re.setClearColor(...arguments)},this.getClearAlpha=function(){return re.getClearAlpha()},this.setClearAlpha=function(){re.setClearAlpha(...arguments)},this.clear=function(C=!0,tt=!0,pt=!0){let ot=0;if(C){let lt=!1;if(k!==null){const Xt=k.texture.format;lt=M.has(Xt)}if(lt){const Xt=k.texture.type,Jt=S.has(Xt),kt=re.getClearColor(),Zt=re.getClearAlpha(),Kt=kt.r,_e=kt.g,Ae=kt.b;Jt?(I[0]=Kt,I[1]=_e,I[2]=Ae,I[3]=Zt,Q.clearBufferuiv(Q.COLOR,0,I)):(z[0]=Kt,z[1]=_e,z[2]=Ae,z[3]=Zt,Q.clearBufferiv(Q.COLOR,0,z))}else ot|=Q.COLOR_BUFFER_BIT}tt&&(ot|=Q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),pt&&(ot|=Q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ot!==0&&Q.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),Y=C},this.dispose=function(){n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Pe,!1),n.removeEventListener("webglcontextcreationerror",Kn,!1),re.dispose(),Tt.dispose(),Rt.dispose(),ct.dispose(),Ot.dispose(),yt.dispose(),Yt.dispose(),Ut.dispose(),at.dispose(),$t.dispose(),$t.removeEventListener("sessionstart",dn),$t.removeEventListener("sessionend",Cn),Jn.stop()};function We(C){C.preventDefault(),Pv("WebGLRenderer: Context Lost."),W=!0}function Pe(){Pv("WebGLRenderer: Context Restored."),W=!1;const C=it.autoReset,tt=qt.enabled,pt=qt.autoUpdate,ot=qt.needsUpdate,lt=qt.type;oe(),it.autoReset=C,qt.enabled=tt,qt.autoUpdate=pt,qt.needsUpdate=ot,qt.type=lt}function Kn(C){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ai(C){const tt=C.target;tt.removeEventListener("dispose",ai),to(tt)}function to(C){eo(C),ct.remove(C)}function eo(C){const tt=ct.get(C).programs;tt!==void 0&&(tt.forEach(function(pt){at.releaseProgram(pt)}),C.isShaderMaterial&&at.releaseShaderCache(C))}this.renderBufferDirect=function(C,tt,pt,ot,lt,Xt){tt===null&&(tt=jt);const Jt=lt.isMesh&&lt.matrixWorld.determinantAffine()<0,kt=Ia(C,tt,pt,ot,lt);T.setMaterial(ot,Jt);let Zt=pt.index,Kt=1;if(ot.wireframe===!0){if(Zt=vt.getWireframeAttribute(pt),Zt===void 0)return;Kt=2}const _e=pt.drawRange,Ae=pt.attributes.position;let te=_e.start*Kt,Ie=(_e.start+_e.count)*Kt;Xt!==null&&(te=Math.max(te,Xt.start*Kt),Ie=Math.min(Ie,(Xt.start+Xt.count)*Kt)),Zt!==null?(te=Math.max(te,0),Ie=Math.min(Ie,Zt.count)):Ae!=null&&(te=Math.max(te,0),Ie=Math.min(Ie,Ae.count));const $e=Ie-te;if($e<0||$e===1/0)return;Yt.setup(lt,ot,kt,pt,Zt);let Je,Me=Ht;if(Zt!==null&&(Je=Ft.get(Zt),Me=Mt,Me.setIndex(Je)),lt.isMesh)ot.wireframe===!0?(T.setLineWidth(ot.wireframeLinewidth*he()),Me.setMode(Q.LINES)):Me.setMode(Q.TRIANGLES);else if(lt.isLine){let mn=ot.linewidth;mn===void 0&&(mn=1),T.setLineWidth(mn*he()),lt.isLineSegments?Me.setMode(Q.LINES):lt.isLineLoop?Me.setMode(Q.LINE_LOOP):Me.setMode(Q.LINE_STRIP)}else lt.isPoints?Me.setMode(Q.POINTS):lt.isSprite&&Me.setMode(Q.TRIANGLES);if(lt.isBatchedMesh)if(Se.get("WEBGL_multi_draw"))Me.renderMultiDraw(lt._multiDrawStarts,lt._multiDrawCounts,lt._multiDrawCount);else{const mn=lt._multiDrawStarts,Qt=lt._multiDrawCounts,yn=lt._multiDrawCount,Ee=Zt?Ft.get(Zt).bytesPerElement:1,Gn=ct.get(ot).currentProgram.getUniforms();for(let si=0;si<yn;si++)Gn.setValue(Q,"_gl_DrawID",si),Me.render(mn[si]/Ee,Qt[si])}else if(lt.isInstancedMesh)Me.renderInstances(te,$e,lt.count);else if(pt.isInstancedBufferGeometry){const mn=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,Qt=Math.min(pt.instanceCount,mn);Me.renderInstances(te,$e,Qt)}else Me.render(te,$e)};function no(C,tt,pt,ot){Y!==null&&C.isNodeMaterial&&Y.setObject(ot,C),Ct===!0&&Vt.setState(C,pt,!1),C.transparent===!0&&C.side===mi&&C.forceSinglePass===!1?(C.side=Zn,C.needsUpdate=!0,Pa(C,tt,ot),C.side=Hs,C.needsUpdate=!0,Pa(C,tt,ot),C.side=mi):Pa(C,tt,ot)}this.compile=function(C,tt,pt=null){pt===null&&(pt=C),Y!==null&&Y.renderStart(C,tt,pt),w=Rt.get(pt),w.init(tt),E.push(w),pt.traverseVisible(function(lt){lt.isLight&&lt.layers.test(tt.layers)&&(w.pushLight(lt),lt.castShadow&&w.pushShadow(lt))}),C!==pt&&C.traverseVisible(function(lt){lt.isLight&&lt.layers.test(tt.layers)&&(w.pushLight(lt),lt.castShadow&&w.pushShadow(lt))}),w.setupLights(),Y!==null&&Y.updateLights(w.state.lightsArray),Nt=this.localClippingEnabled,Ct=Vt.init(this.clippingPlanes,Nt),Ct===!0&&Vt.setGlobalState(this.clippingPlanes,tt),Y!==null&&qt.render(w.state.shadowsArray,pt,tt);const ot=new Set;return C.traverse(function(lt){if(!(lt.isMesh||lt.isPoints||lt.isLine||lt.isSprite))return;const Xt=lt.material;if(Xt)if(Array.isArray(Xt))for(let Jt=0;Jt<Xt.length;Jt++){const kt=Xt[Jt];no(kt,pt,tt,lt),ot.add(kt)}else no(Xt,pt,tt,lt),ot.add(Xt)}),w=E.pop(),Y!==null&&Y.renderEnd(),ot},this.compileAsync=function(C,tt,pt=null){const ot=this.compile(C,tt,pt);return new Promise(lt=>{function Xt(){if(ot.forEach(function(Jt){const Zt=ct.get(Jt).currentProgram;(Zt===void 0||Zt.isReady())&&ot.delete(Jt)}),ot.size===0){lt(C);return}setTimeout(Xt,10)}Se.get("KHR_parallel_shader_compile")!==null?Xt():setTimeout(Xt,10)})};let Zs=null;function Xi(C){Zs&&Zs(C)}function dn(){Jn.stop()}function Cn(){Jn.start()}const Jn=new wx;Jn.setAnimationLoop(Xi),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(C){Zs=C,$t.setAnimationLoop(C),C===null?Jn.stop():Jn.start()},$t.addEventListener("sessionstart",dn),$t.addEventListener("sessionend",Cn),this.render=function(C,tt){if(tt!==void 0&&tt.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;Y!==null&&Y.renderStart(C,tt);const pt=$t.enabled===!0&&$t.isPresenting===!0,ot=L!==null&&(k===null||pt)&&L.begin(H,k);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),tt.parent===null&&tt.matrixWorldAutoUpdate===!0&&tt.updateMatrixWorld(),$t.enabled===!0&&$t.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&($t.cameraAutoUpdate===!0&&$t.updateCamera(tt),tt=$t.getCamera()),C.isScene===!0&&C.onBeforeRender(H,C,tt,k),w=Rt.get(C,E.length),w.init(tt),w.state.textureUnits=St.getTextureUnits(),E.push(w),Dt.multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse),mt.setFromProjectionMatrix(Dt,$i,tt.reversedDepth),Nt=this.localClippingEnabled,Ct=Vt.init(this.clippingPlanes,Nt),O=Tt.get(C,N.length),O.init(),N.push(O),$t.enabled===!0&&$t.isPresenting===!0){const Jt=H.xr.getDepthSensingMesh();Jt!==null&&ds(Jt,tt,-1/0,H.sortObjects)}ds(C,tt,0,H.sortObjects),O.finish(),Y!==null&&Y.updateLights(w.state.lightsArray),H.sortObjects===!0&&O.sort(wt,ee),ce=$t.enabled===!1||$t.isPresenting===!1||$t.hasDepthSensing()===!1,ce&&re.addToRenderList(O,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ct===!0&&Vt.beginShadows();const lt=w.state.shadowsArray;if(qt.render(lt,C,tt),Ct===!0&&Vt.endShadows(),(ot&&L.hasRenderPass())===!1){const Jt=O.opaque,kt=O.transmissive;if(w.setupLights(),tt.isArrayCamera){const Zt=tt.cameras;if(kt.length>0)for(let Kt=0,_e=Zt.length;Kt<_e;Kt++){const Ae=Zt[Kt];Tl(Jt,kt,C,Ae)}ce&&re.render(C);for(let Kt=0,_e=Zt.length;Kt<_e;Kt++){const Ae=Zt[Kt];bl(O,C,Ae,Ae.viewport)}}else kt.length>0&&Tl(Jt,kt,C,tt),ce&&re.render(C),bl(O,C,tt)}k!==null&&P===0&&(St.updateMultisampleRenderTarget(k),St.updateRenderTargetMipmap(k)),ot&&L.end(H),C.isScene===!0&&C.onAfterRender(H,C,tt),Yt.resetDefaultState(),V=-1,X=null,E.pop(),E.length>0?(w=E[E.length-1],St.setTextureUnits(w.state.textureUnits),Ct===!0&&Vt.setGlobalState(H.clippingPlanes,w.state.camera)):w=null,N.pop(),N.length>0?O=N[N.length-1]:O=null,Y!==null&&Y.renderEnd()};function ds(C,tt,pt,ot){if(C.visible===!1)return;if(C.layers.test(tt.layers)){if(C.isGroup)pt=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(tt);else if(C.isLightProbeGrid)w.pushLightProbeGrid(C);else if(C.isLight)w.pushLight(C),C.castShadow&&w.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(mt)){ot&&ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Dt);const Jt=yt.update(C),kt=C.material;kt.visible&&O.push(C,Jt,kt,pt,ae.z,null,tt)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(mt))){const Jt=yt.update(C),kt=C.material;if(ot&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ae.copy(C.boundingSphere.center)):(Jt.boundingSphere===null&&Jt.computeBoundingSphere(),ae.copy(Jt.boundingSphere.center)),ae.applyMatrix4(C.matrixWorld).applyMatrix4(Dt)),Array.isArray(kt)){const Zt=Jt.groups;for(let Kt=0,_e=Zt.length;Kt<_e;Kt++){const Ae=Zt[Kt],te=kt[Ae.materialIndex];te&&te.visible&&O.push(C,Jt,te,pt,ae.z,Ae,tt)}}else kt.visible&&O.push(C,Jt,kt,pt,ae.z,null,tt)}}const Xt=C.children;for(let Jt=0,kt=Xt.length;Jt<kt;Jt++)ds(Xt[Jt],tt,pt,ot)}function bl(C,tt,pt,ot){const{opaque:lt,transmissive:Xt,transparent:Jt}=C;w.setupLightsView(pt),Ct===!0&&Vt.setGlobalState(H.clippingPlanes,pt),ot&&T.viewport(R.copy(ot)),lt.length>0&&ps(lt,tt,pt),Xt.length>0&&ps(Xt,tt,pt),Jt.length>0&&ps(Jt,tt,pt),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function Tl(C,tt,pt,ot){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[ot.id]===void 0){const te=Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[ot.id]=new _i(1,1,{generateMipmaps:!0,type:te?Di:gi,minFilter:zs,samples:Math.max(4,G.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Le.workingColorSpace})}const Xt=w.state.transmissionRenderTarget[ot.id],Jt=ot.viewport||R;Xt.setSize(Jt.z*H.transmissionResolutionScale,Jt.w*H.transmissionResolutionScale);const kt=H.getRenderTarget(),Zt=H.getActiveCubeFace(),Kt=H.getActiveMipmapLevel();H.setRenderTarget(Xt),H.getClearColor(xt),Lt=H.getClearAlpha(),Lt<1&&H.setClearColor(16777215,.5),H.clear(),ce&&re.render(pt);const _e=H.toneMapping;H.toneMapping=ta;const Ae=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),w.setupLightsView(ot),Ct===!0&&Vt.setGlobalState(H.clippingPlanes,ot),ps(C,pt,ot),St.updateMultisampleRenderTarget(Xt),St.updateRenderTargetMipmap(Xt),Se.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let Ie=0,$e=tt.length;Ie<$e;Ie++){const Je=tt[Ie],{object:Me,geometry:mn,material:Qt,group:yn}=Je;if(Qt.side===mi&&Me.layers.test(ot.layers)){const Ee=Qt.side;Qt.side=Zn,Qt.needsUpdate=!0,Oa(Me,pt,ot,mn,Qt,yn),Qt.side=Ee,Qt.needsUpdate=!0,te=!0}}te===!0&&(St.updateMultisampleRenderTarget(Xt),St.updateRenderTargetMipmap(Xt))}H.setRenderTarget(kt,Zt,Kt),H.setClearColor(xt,Lt),Ae!==void 0&&(ot.viewport=Ae),H.toneMapping=_e}function ps(C,tt,pt){const ot=tt.isScene===!0?tt.overrideMaterial:null;for(let lt=0,Xt=C.length;lt<Xt;lt++){const Jt=C[lt],{object:kt,geometry:Zt,group:Kt}=Jt;let _e=Jt.material;_e.allowOverride===!0&&ot!==null&&(_e=ot),kt.layers.test(pt.layers)&&Oa(kt,tt,pt,Zt,_e,Kt)}}function Oa(C,tt,pt,ot,lt,Xt){Y!==null&&lt.isNodeMaterial&&Y.setObject(C,lt),C.onBeforeRender(H,tt,pt,ot,lt,Xt),C.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),lt.onBeforeRender(H,tt,pt,ot,C,Xt),lt.transparent===!0&&lt.side===mi&&lt.forceSinglePass===!1?(lt.side=Zn,lt.needsUpdate=!0,H.renderBufferDirect(pt,tt,ot,lt,C,Xt),lt.side=Hs,lt.needsUpdate=!0,H.renderBufferDirect(pt,tt,ot,lt,C,Xt),lt.side=mi):H.renderBufferDirect(pt,tt,ot,lt,C,Xt),C.onAfterRender(H,tt,pt,ot,lt,Xt)}function Pa(C,tt,pt){tt.isScene!==!0&&(tt=jt);const ot=ct.get(C),lt=w.state.lights,Xt=w.state.shadowsArray,Jt=lt.state.version,kt=at.getParameters(C,lt.state,Xt,tt,pt,w.state.lightProbeGridArray),Zt=at.getProgramCacheKey(kt);let Kt=ot.programs;ot.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?tt.environment:null,ot.fog=tt.fog;const _e=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ot.envMap=Ot.get(C.envMap||ot.environment,_e),ot.envMapRotation=ot.environment!==null&&C.envMap===null?tt.environmentRotation:C.envMapRotation,Kt===void 0&&(C.addEventListener("dispose",ai),Kt=new Map,ot.programs=Kt);let Ae=Kt.get(Zt);if(Ae!==void 0){if(ot.currentProgram===Ae&&ot.lightsStateVersion===Jt)return sa(C,kt),Ae}else kt.uniforms=at.getUniforms(C),Y!==null&&C.isNodeMaterial&&Y.build(C,pt,kt),C.onBeforeCompile(kt,H),Ae=at.acquireProgram(kt,Zt),Kt.set(Zt,Ae),ot.uniforms=kt.uniforms;const te=ot.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(te.clippingPlanes=Vt.uniform),sa(C,kt),ot.needsLights=Al(C),ot.lightsStateVersion=Jt,ot.needsLights&&(te.ambientLightColor.value=lt.state.ambient,te.lightProbe.value=lt.state.probe,te.sunLights.value=lt.state.sun,te.sunLightShadows.value=lt.state.sunShadow,te.directionalLights.value=lt.state.directional,te.directionalLightShadows.value=lt.state.directionalShadow,te.spotLights.value=lt.state.spot,te.spotLightShadows.value=lt.state.spotShadow,te.rectAreaLights.value=lt.state.rectArea,te.ltc_1.value=lt.state.rectAreaLTC1,te.ltc_2.value=lt.state.rectAreaLTC2,te.pointLights.value=lt.state.point,te.pointLightShadows.value=lt.state.pointShadow,te.hemisphereLights.value=lt.state.hemi,te.sunShadowMatrix.value=lt.state.sunShadowMatrix,te.sunShadowCascade.value=lt.state.sunShadowCascade,te.directionalShadowMatrix.value=lt.state.directionalShadowMatrix,te.spotLightMatrix.value=lt.state.spotLightMatrix,te.spotLightMap.value=lt.state.spotLightMap,te.pointShadowMatrix.value=lt.state.pointShadowMatrix),ot.lightProbeGrid=w.state.lightProbeGridArray.length>0,ot.currentProgram=Ae,ot.uniformsList=null,Ae}function aa(C){if(C.uniformsList===null){const tt=C.currentProgram.getUniforms();C.uniformsList=pu.seqWithValue(tt.seq,C.uniforms)}return C.uniformsList}function sa(C,tt){const pt=ct.get(C);pt.outputColorSpace=tt.outputColorSpace,pt.batching=tt.batching,pt.batchingColor=tt.batchingColor,pt.instancing=tt.instancing,pt.instancingColor=tt.instancingColor,pt.instancingMorph=tt.instancingMorph,pt.skinning=tt.skinning,pt.morphTargets=tt.morphTargets,pt.morphNormals=tt.morphNormals,pt.morphColors=tt.morphColors,pt.morphTargetsCount=tt.morphTargetsCount,pt.numClippingPlanes=tt.numClippingPlanes,pt.numIntersection=tt.numClipIntersection,pt.vertexAlphas=tt.vertexAlphas,pt.vertexTangents=tt.vertexTangents,pt.toneMapping=tt.toneMapping}function ms(C,tt){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;A.setFromMatrixPosition(tt.matrixWorld);for(let pt=0,ot=C.length;pt<ot;pt++){const lt=C[pt];if(lt.texture!==null&&lt.boundingBox.containsPoint(A))return lt}return null}function Ia(C,tt,pt,ot,lt){tt.isScene!==!0&&(tt=jt),St.resetTextureUnits();const Xt=tt.fog,Jt=ot.isMeshStandardMaterial||ot.isMeshLambertMaterial||ot.isMeshPhongMaterial?tt.environment:null,kt=k===null?H.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Le.workingColorSpace,Zt=ot.isMeshStandardMaterial||ot.isMeshLambertMaterial&&!ot.envMap||ot.isMeshPhongMaterial&&!ot.envMap,Kt=Ot.get(ot.envMap||Jt,Zt),_e=ot.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,Ae=!!pt.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),te=!!pt.morphAttributes.position,Ie=!!pt.morphAttributes.normal,$e=!!pt.morphAttributes.color;let Je=ta;ot.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Je=H.toneMapping);const Me=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,mn=Me!==void 0?Me.length:0,Qt=ct.get(ot),yn=w.state.lights;if(Ct===!0&&(Nt===!0||C!==X)){const qe=C===X&&ot.id===V;Vt.setState(ot,C,qe)}let Ee=!1;ot.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==yn.state.version||Qt.outputColorSpace!==kt||lt.isBatchedMesh&&Qt.batching===!1||!lt.isBatchedMesh&&Qt.batching===!0||lt.isBatchedMesh&&Qt.batchingColor===!0&&lt._colorsTexture===null||lt.isBatchedMesh&&Qt.batchingColor===!1&&lt._colorsTexture!==null||lt.isInstancedMesh&&Qt.instancing===!1||!lt.isInstancedMesh&&Qt.instancing===!0||lt.isSkinnedMesh&&Qt.skinning===!1||!lt.isSkinnedMesh&&Qt.skinning===!0||lt.isInstancedMesh&&Qt.instancingColor===!0&&lt.instanceColor===null||lt.isInstancedMesh&&Qt.instancingColor===!1&&lt.instanceColor!==null||lt.isInstancedMesh&&Qt.instancingMorph===!0&&lt.morphTexture===null||lt.isInstancedMesh&&Qt.instancingMorph===!1&&lt.morphTexture!==null||Qt.envMap!==Kt||ot.fog===!0&&Qt.fog!==Xt||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==Vt.numPlanes||Qt.numIntersection!==Vt.numIntersection)||Qt.vertexAlphas!==_e||Qt.vertexTangents!==Ae||Qt.morphTargets!==te||Qt.morphNormals!==Ie||Qt.morphColors!==$e||Qt.toneMapping!==Je||Qt.morphTargetsCount!==mn||!!Qt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Ee=!0):(Ee=!0,Qt.__version=ot.version);let Gn=Qt.currentProgram;Ee===!0&&(Gn=Pa(ot,tt,lt),Y&&ot.isNodeMaterial&&Y.onUpdateProgram(ot,Gn,Qt));let si=!1,Vn=!1,za=!1;const Fe=Gn.getUniforms(),an=Qt.uniforms;if(T.useProgram(Gn.program)&&(si=!0,Vn=!0,za=!0),ot.id!==V&&(V=ot.id,Vn=!0),Qt.needsLights){const qe=ms(w.state.lightProbeGridArray,lt);Qt.lightProbeGrid!==qe&&(Qt.lightProbeGrid=qe,Vn=!0)}if(si||X!==C){T.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Fe.setValue(Q,"projectionMatrix",C.projectionMatrix),Fe.setValue(Q,"viewMatrix",C.matrixWorldInverse);const Wi=Fe.map.cameraPosition;Wi!==void 0&&Wi.setValue(Q,It.setFromMatrixPosition(C.matrixWorld)),G.logarithmicDepthBuffer&&Fe.setValue(Q,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Fe.setValue(Q,"isOrthographic",C.isOrthographicCamera===!0),X!==C&&(X=C,Vn=!0,za=!0)}if(Qt.needsLights&&(yn.state.sunShadowMap.length>0&&Fe.setValue(Q,"sunShadowMap",yn.state.sunShadowMap,St),yn.state.directionalShadowMap.length>0&&Fe.setValue(Q,"directionalShadowMap",yn.state.directionalShadowMap,St),yn.state.spotShadowMap.length>0&&Fe.setValue(Q,"spotShadowMap",yn.state.spotShadowMap,St),yn.state.pointShadowMap.length>0&&Fe.setValue(Q,"pointShadowMap",yn.state.pointShadowMap,St)),lt.isSkinnedMesh){Fe.setOptional(Q,lt,"bindMatrix"),Fe.setOptional(Q,lt,"bindMatrixInverse");const qe=lt.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),Fe.setValue(Q,"boneTexture",qe.boneTexture,St))}lt.isBatchedMesh&&(Fe.setOptional(Q,lt,"batchingTexture"),Fe.setValue(Q,"batchingTexture",lt._matricesTexture,St),Fe.setOptional(Q,lt,"batchingIdTexture"),Fe.setValue(Q,"batchingIdTexture",lt._indirectTexture,St),Fe.setOptional(Q,lt,"batchingColorTexture"),lt._colorsTexture!==null&&Fe.setValue(Q,"batchingColorTexture",lt._colorsTexture,St));const xi=pt.morphAttributes;if((xi.position!==void 0||xi.normal!==void 0||xi.color!==void 0)&&$.update(lt,pt,Gn),(Vn||Qt.receiveShadow!==lt.receiveShadow)&&(Qt.receiveShadow=lt.receiveShadow,Fe.setValue(Q,"receiveShadow",lt.receiveShadow)),(ot.isMeshStandardMaterial||ot.isMeshLambertMaterial||ot.isMeshPhongMaterial)&&ot.envMap===null&&tt.environment!==null&&(an.envMapIntensity.value=tt.environmentIntensity),an.dfgLUT!==void 0&&(an.dfgLUT.value=c3()),Vn){if(Fe.setValue(Q,"toneMappingExposure",H.toneMappingExposure),Qt.needsLights&&pn(an,za),Xt&&ot.fog===!0&&_t.refreshFogUniforms(an,Xt),_t.refreshMaterialUniforms(an,ot,dt,nt,w.state.transmissionRenderTarget[C.id]),Qt.needsLights&&Qt.lightProbeGrid){const qe=Qt.lightProbeGrid;an.probesSH.value=qe.texture,an.probesMin.value.copy(qe.boundingBox.min),an.probesMax.value.copy(qe.boundingBox.max),an.probesResolution.value.copy(qe.resolution)}pu.upload(Q,aa(Qt),an,St)}if(ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(pu.upload(Q,aa(Qt),an,St),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Fe.setValue(Q,"center",lt.center),Fe.setValue(Q,"modelViewMatrix",lt.modelViewMatrix),Fe.setValue(Q,"normalMatrix",lt.normalMatrix),Fe.setValue(Q,"modelMatrix",lt.matrixWorld),ot.uniformsGroups!==void 0){const qe=ot.uniformsGroups;for(let Wi=0,Li=qe.length;Wi<Li;Wi++){const Si=qe[Wi];Ut.update(Si,Gn),Ut.bind(Si,Gn)}}return Gn}function pn(C,tt){C.ambientLightColor.needsUpdate=tt,C.lightProbe.needsUpdate=tt,C.sunLights.needsUpdate=tt,C.sunLightShadows.needsUpdate=tt,C.directionalLights.needsUpdate=tt,C.directionalLightShadows.needsUpdate=tt,C.pointLights.needsUpdate=tt,C.pointLightShadows.needsUpdate=tt,C.spotLights.needsUpdate=tt,C.spotLightShadows.needsUpdate=tt,C.rectAreaLights.needsUpdate=tt,C.hemisphereLights.needsUpdate=tt}function Al(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(C,tt,pt){const ot=ct.get(C);ot.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ot.__autoAllocateDepthBuffer===!1&&(ot.__useRenderToTexture=!1),ct.get(C.texture).__webglTexture=tt,ct.get(C.depthTexture).__webglTexture=ot.__autoAllocateDepthBuffer?void 0:pt,ot.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,tt){const pt=ct.get(C);pt.__webglFramebuffer=tt,pt.__useDefaultFramebuffer=tt===void 0},this.setRenderTarget=function(C,tt=0,pt=0){k=C,B=tt,P=pt;let ot=null,lt=!1,Xt=!1;if(C){const kt=ct.get(C);if(kt.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(Q.FRAMEBUFFER,kt.__webglFramebuffer),R.copy(C.viewport),J.copy(C.scissor),rt=C.scissorTest,T.viewport(R),T.scissor(J),T.setScissorTest(rt),V=-1;return}else if(kt.__webglFramebuffer===void 0)St.setupRenderTarget(C);else if(kt.__hasExternalTextures)St.rebindTextures(C,ct.get(C.texture).__webglTexture,ct.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const _e=C.depthTexture;if(kt.__boundDepthTexture!==_e){if(_e!==null&&ct.has(_e)&&(C.width!==_e.image.width||C.height!==_e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");St.setupDepthRenderbuffer(C)}}const Zt=C.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Xt=!0);const Kt=ct.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Kt[tt])?ot=Kt[tt][pt]:ot=Kt[tt],lt=!0):C.samples>0&&St.useMultisampledRTT(C)===!1?ot=ct.get(C).__webglMultisampledFramebuffer:Array.isArray(Kt)?ot=Kt[pt]:ot=Kt,R.copy(C.viewport),J.copy(C.scissor),rt=C.scissorTest}else R.copy(Bt).multiplyScalar(dt).floor(),J.copy(ie).multiplyScalar(dt).floor(),rt=ue;if(pt!==0&&(ot=j),T.bindFramebuffer(Q.FRAMEBUFFER,ot)&&T.drawBuffers(C,ot),T.viewport(R),T.scissor(J),T.setScissorTest(rt),lt){const kt=ct.get(C.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_CUBE_MAP_POSITIVE_X+tt,kt.__webglTexture,pt)}else if(Xt){const kt=tt;for(let Zt=0;Zt<C.textures.length;Zt++){const Kt=ct.get(C.textures[Zt]);Q.framebufferTextureLayer(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0+Zt,Kt.__webglTexture,pt,kt)}}else if(C!==null&&pt!==0){const kt=ct.get(C.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,kt.__webglTexture,pt)}V=-1};function io(C){const tt=ct.get(C);return(tt.__readFormat!==C.format||tt.__readType!==C.type)&&(tt.__readFormat=C.format,tt.__readType=C.type,tt.__formatReadable=G.textureFormatReadable(C.format),tt.__typeReadable=G.textureTypeReadable(C.type)),tt}this.readRenderTargetPixels=function(C,tt,pt,ot,lt,Xt,Jt,kt=0){if(!(C&&C.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Zt=ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Jt!==void 0&&(Zt=Zt[Jt]),Zt){T.bindFramebuffer(Q.FRAMEBUFFER,Zt);try{const Kt=C.textures[kt],_e=Kt.format,Ae=Kt.type;C.textures.length>1&&Q.readBuffer(Q.COLOR_ATTACHMENT0+kt);const te=io(Kt);if(te.__formatReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(te.__typeReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}tt>=0&&tt<=C.width-ot&&pt>=0&&pt<=C.height-lt&&Q.readPixels(tt,pt,ot,lt,Gt.convert(_e),Gt.convert(Ae),Xt)}finally{const Kt=k!==null?ct.get(k).__webglFramebuffer:null;T.bindFramebuffer(Q.FRAMEBUFFER,Kt)}}},this.readRenderTargetPixelsAsync=async function(C,tt,pt,ot,lt,Xt,Jt,kt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Zt=ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Jt!==void 0&&(Zt=Zt[Jt]),Zt)if(tt>=0&&tt<=C.width-ot&&pt>=0&&pt<=C.height-lt){T.bindFramebuffer(Q.FRAMEBUFFER,Zt);const Kt=C.textures[kt],_e=Kt.format,Ae=Kt.type;C.textures.length>1&&Q.readBuffer(Q.COLOR_ATTACHMENT0+kt);const te=io(Kt);if(te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=Q.createBuffer();Q.bindBuffer(Q.PIXEL_PACK_BUFFER,Ie),Q.bufferData(Q.PIXEL_PACK_BUFFER,Xt.byteLength,Q.STREAM_READ),Q.readPixels(tt,pt,ot,lt,Gt.convert(_e),Gt.convert(Ae),0),Q.bindBuffer(Q.PIXEL_PACK_BUFFER,null);const $e=k!==null?ct.get(k).__webglFramebuffer:null;T.bindFramebuffer(Q.FRAMEBUFFER,$e);const Je=Q.fenceSync(Q.SYNC_GPU_COMMANDS_COMPLETE,0);return Q.flush(),await OM(Q,Je,4),Q.bindBuffer(Q.PIXEL_PACK_BUFFER,Ie),Q.getBufferSubData(Q.PIXEL_PACK_BUFFER,0,Xt),Q.bindBuffer(Q.PIXEL_PACK_BUFFER,null),Q.deleteBuffer(Ie),Q.deleteSync(Je),Xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,tt=null,pt=0){const ot=Math.pow(2,-pt),lt=Math.floor(C.image.width*ot),Xt=Math.floor(C.image.height*ot),Jt=tt!==null?tt.x:0,kt=tt!==null?tt.y:0;St.setTexture2D(C,0),Q.copyTexSubImage2D(Q.TEXTURE_2D,pt,0,0,Jt,kt,lt,Xt),T.unbindTexture()},this.copyTextureToTexture=function(C,tt,pt=null,ot=null,lt=0,Xt=0){let Jt,kt,Zt,Kt,_e,Ae,te,Ie,$e;const Je=C.isCompressedTexture?C.mipmaps[Xt]:C.image;if(pt!==null)Jt=pt.max.x-pt.min.x,kt=pt.max.y-pt.min.y,Zt=pt.isBox3?pt.max.z-pt.min.z:1,Kt=pt.min.x,_e=pt.min.y,Ae=pt.isBox3?pt.min.z:0;else{const an=Math.pow(2,-lt);Jt=Math.floor(Je.width*an),kt=Math.floor(Je.height*an),C.isDataArrayTexture?Zt=Je.depth:C.isData3DTexture?Zt=Math.floor(Je.depth*an):Zt=1,Kt=0,_e=0,Ae=0}ot!==null?(te=ot.x,Ie=ot.y,$e=ot.z):(te=0,Ie=0,$e=0);const Me=Gt.convert(tt.format),mn=Gt.convert(tt.type);let Qt;tt.isData3DTexture?(St.setTexture3D(tt,0),Qt=Q.TEXTURE_3D):tt.isDataArrayTexture||tt.isCompressedArrayTexture?(St.setTexture2DArray(tt,0),Qt=Q.TEXTURE_2D_ARRAY):(St.setTexture2D(tt,0),Qt=Q.TEXTURE_2D),T.activeTexture(Q.TEXTURE0),T.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,tt.flipY),T.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,tt.premultiplyAlpha),T.pixelStorei(Q.UNPACK_ALIGNMENT,tt.unpackAlignment);const yn=T.getParameter(Q.UNPACK_ROW_LENGTH),Ee=T.getParameter(Q.UNPACK_IMAGE_HEIGHT),Gn=T.getParameter(Q.UNPACK_SKIP_PIXELS),si=T.getParameter(Q.UNPACK_SKIP_ROWS),Vn=T.getParameter(Q.UNPACK_SKIP_IMAGES);T.pixelStorei(Q.UNPACK_ROW_LENGTH,Je.width),T.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Je.height),T.pixelStorei(Q.UNPACK_SKIP_PIXELS,Kt),T.pixelStorei(Q.UNPACK_SKIP_ROWS,_e),T.pixelStorei(Q.UNPACK_SKIP_IMAGES,Ae);const za=C.isDataArrayTexture||C.isData3DTexture,Fe=tt.isDataArrayTexture||tt.isData3DTexture;if(C.isDepthTexture){const an=ct.get(C),xi=ct.get(tt),qe=ct.get(an.__renderTarget),Wi=ct.get(xi.__renderTarget);T.bindFramebuffer(Q.READ_FRAMEBUFFER,qe.__webglFramebuffer),T.bindFramebuffer(Q.DRAW_FRAMEBUFFER,Wi.__webglFramebuffer);for(let Li=0;Li<Zt;Li++)za&&(Q.framebufferTextureLayer(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,ct.get(C).__webglTexture,lt,Ae+Li),Q.framebufferTextureLayer(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,ct.get(tt).__webglTexture,Xt,$e+Li)),Q.blitFramebuffer(Kt,_e,Jt,kt,te,Ie,Jt,kt,Q.DEPTH_BUFFER_BIT,Q.NEAREST);T.bindFramebuffer(Q.READ_FRAMEBUFFER,null),T.bindFramebuffer(Q.DRAW_FRAMEBUFFER,null)}else if(lt!==0||C.isRenderTargetTexture||ct.has(C)){const an=ct.get(C),xi=ct.get(tt);T.bindFramebuffer(Q.READ_FRAMEBUFFER,F),T.bindFramebuffer(Q.DRAW_FRAMEBUFFER,q);for(let qe=0;qe<Zt;qe++)za?Q.framebufferTextureLayer(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,an.__webglTexture,lt,Ae+qe):Q.framebufferTexture2D(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,an.__webglTexture,lt),Fe?Q.framebufferTextureLayer(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,xi.__webglTexture,Xt,$e+qe):Q.framebufferTexture2D(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,xi.__webglTexture,Xt),lt!==0?Q.blitFramebuffer(Kt,_e,Jt,kt,te,Ie,Jt,kt,Q.COLOR_BUFFER_BIT,Q.NEAREST):Fe?Q.copyTexSubImage3D(Qt,Xt,te,Ie,$e+qe,Kt,_e,Jt,kt):Q.copyTexSubImage2D(Qt,Xt,te,Ie,Kt,_e,Jt,kt);T.bindFramebuffer(Q.READ_FRAMEBUFFER,null),T.bindFramebuffer(Q.DRAW_FRAMEBUFFER,null)}else Fe?C.isDataTexture||C.isData3DTexture?Q.texSubImage3D(Qt,Xt,te,Ie,$e,Jt,kt,Zt,Me,mn,Je.data):tt.isCompressedArrayTexture?Q.compressedTexSubImage3D(Qt,Xt,te,Ie,$e,Jt,kt,Zt,Me,Je.data):Q.texSubImage3D(Qt,Xt,te,Ie,$e,Jt,kt,Zt,Me,mn,Je):C.isDataTexture?Q.texSubImage2D(Q.TEXTURE_2D,Xt,te,Ie,Jt,kt,Me,mn,Je.data):C.isCompressedTexture?Q.compressedTexSubImage2D(Q.TEXTURE_2D,Xt,te,Ie,Je.width,Je.height,Me,Je.data):Q.texSubImage2D(Q.TEXTURE_2D,Xt,te,Ie,Jt,kt,Me,mn,Je);T.pixelStorei(Q.UNPACK_ROW_LENGTH,yn),T.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Ee),T.pixelStorei(Q.UNPACK_SKIP_PIXELS,Gn),T.pixelStorei(Q.UNPACK_SKIP_ROWS,si),T.pixelStorei(Q.UNPACK_SKIP_IMAGES,Vn),Xt===0&&tt.generateMipmaps&&Q.generateMipmap(Qt),T.unbindTexture()},this.initRenderTarget=function(C){ct.get(C).__webglFramebuffer===void 0&&St.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?St.setTextureCube(C,0):C.isData3DTexture?St.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?St.setTexture2DArray(C,0):St.setTexture2D(C,0),T.unbindTexture()},this.resetState=function(){B=0,P=0,k=null,T.reset(),Yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Le._getDrawingBufferColorSpace(t),n.unpackColorSpace=Le._getUnpackColorSpace()}}class Uu extends je{constructor(t,n={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,o=n.color!==void 0?new ve(n.color):new ve(8355711),c=n.textureWidth||512,u=n.textureHeight||512,h=n.clipBias||0,m=n.shader||Uu.ReflectorShader,p=n.multisample!==void 0?n.multisample:4,g=new Ra,_=new Z,v=new Z,x=new Z,b=new Ge,D=new Z(0,0,-1),M=new nn,S=new Z,I=new Z,z=new nn,A=new Ge,O=new _i(c,u,{samples:p,type:Di}),w=new Ui({name:m.name!==void 0?m.name:"unspecified",uniforms:Tx.clone(m.uniforms),fragmentShader:m.fragmentShader,vertexShader:m.vertexShader});w.uniforms.tDiffuse.value=O.texture,w.uniforms.color.value=o,w.uniforms.textureMatrix.value=A,this.material=w,this.onBeforeRender=function(N,E,L){const H=this.getReflectionCamera(L);if(v.setFromMatrixPosition(a.matrixWorld),x.setFromMatrixPosition(L.matrixWorld),b.extractRotation(a.matrixWorld),_.set(0,0,1),_.applyMatrix4(b),S.subVectors(v,x),S.dot(_)>0===!0&&this.forceUpdate===!1)return;S.reflect(_).negate(),S.add(v),b.extractRotation(L.matrixWorld),D.set(0,0,-1),D.applyMatrix4(b),D.add(x),I.subVectors(v,D),I.reflect(_).negate(),I.add(v),H.position.copy(S),H.up.set(0,1,0),H.up.applyMatrix4(b),H.up.reflect(_),H.lookAt(I),H.far=L.far,H.updateMatrixWorld(),H.projectionMatrix.copy(L.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(H.projectionMatrix),A.multiply(H.matrixWorldInverse),A.multiply(a.matrixWorld),g.setFromNormalAndCoplanarPoint(_,v),g.applyMatrix4(H.matrixWorldInverse),M.set(g.normal.x,g.normal.y,g.normal.z,g.constant);const Y=H.projectionMatrix;H.isOrthographicCamera?(z.x=(Math.sign(M.x)+Y.elements[8])/Y.elements[0],z.y=(Math.sign(M.y)+Y.elements[9])/Y.elements[5],z.z=-L.far,z.w=1):(z.x=(Math.sign(M.x)+Y.elements[8])/Y.elements[0],z.y=(Math.sign(M.y)+Y.elements[9])/Y.elements[5],z.z=-1,z.w=(1+Y.elements[10])/Y.elements[14]),M.multiplyScalar(2/M.dot(z)),Y.elements[2]=M.x,Y.elements[6]=M.y,H.isOrthographicCamera?(Y.elements[10]=M.z-h,Y.elements[14]=M.w-1):(Y.elements[10]=M.z+1-h,Y.elements[14]=M.w),a.visible=!1;const j=N.getRenderTarget(),F=N.xr.enabled,q=N.shadowMap.autoUpdate;N.xr.enabled=!1,N.shadowMap.autoUpdate=!1,N.setRenderTarget(O),N.state.buffers.depth.setMask(!0),N.autoClear===!1&&N.clear(),N.render(E,H),N.xr.enabled=F,N.shadowMap.autoUpdate=q,N.setRenderTarget(j);const B=L.viewport;B!==void 0&&N.state.viewport(B),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return O},this.dispose=function(){O.dispose(),a.material.dispose()},this.getReflectionCamera=function(N){let E=this._reflectionCameras.get(N);return E===void 0&&(E=N.clone(),this._reflectionCameras.set(N,E)),E}}}Uu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};class f3 extends ox{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new ki;t.deleteAttribute("uv");const n=new Rn({side:Zn}),a=new Rn,o=new bu(16777215,900,28,2);o.position.set(.418,16.199,.3),this.add(o);const c=new je(t,n);c.position.set(-.757,13.219,.717),c.scale.set(31.713,28.305,28.591),this.add(c);const u=new Cp(t,a,6),h=new hn;h.position.set(-10.906,2.009,1.846),h.rotation.set(0,-.195,0),h.scale.set(2.328,7.905,4.651),h.updateMatrix(),u.setMatrixAt(0,h.matrix),h.position.set(-5.607,-.754,-.758),h.rotation.set(0,.994,0),h.scale.set(1.97,1.534,3.955),h.updateMatrix(),u.setMatrixAt(1,h.matrix),h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),h.updateMatrix(),u.setMatrixAt(2,h.matrix),h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),h.updateMatrix(),u.setMatrixAt(3,h.matrix),h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),h.updateMatrix(),u.setMatrixAt(4,h.matrix),h.position.set(-2.193,-.369,-5.547),h.rotation.set(0,.516,0),h.scale.set(3.875,3.487,2.986),h.updateMatrix(),u.setMatrixAt(5,h.matrix),this.add(u);const m=new je(t,Hr(50));m.position.set(-16.116,14.37,8.208),m.scale.set(.1,2.428,2.739),this.add(m);const p=new je(t,Hr(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new je(t,Hr(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const _=new je(t,Hr(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const v=new je(t,Hr(20));v.position.set(3.235,11.486,-12.541),v.scale.set(2.5,2,.1),this.add(v);const x=new je(t,Hr(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const t=new Set;this.traverse(n=>{n.isMesh&&(t.add(n.geometry),t.add(n.material))});for(const n of t)n.dispose()}}function Hr(r){return new nE({color:0,emissive:16777215,emissiveIntensity:r})}const h3={follow:.09,settle:.45},B_=2.2;function d3(r,t,n){const a=o=>Number.isFinite(o)?o:0;return{yaw:n.yaw*Math.tanh(a(r)*B_),pitch:-n.pitch*Math.tanh(a(t)*B_)}}function F_(r,t,n,a,o){const c=2/a,u=c*o,h=1/(1+u+.48*u*u+.235*u*u*u),m=r-t,p=(n+c*m)*o,g=t+(m+p)*h;return t-r>0==g>t?[t,0]:[g,(n-c*p)*h]}class p3{constructor(t,n=h3){this.limit=t,this.feel=n,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(t,n){const a=d3(t,n,this.limit);this.targetYaw=a.yaw,this.targetPitch=a.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(t){if(!(t>0))return;const n=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=F_(this.yaw,this.targetYaw,this.yawVelocity,n,t),[this.pitch,this.pitchVelocity]=F_(this.pitch,this.targetPitch,this.pitchVelocity,n,t)}}function Px(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function m3(r){const t=Px(r),n=128,a=Float32Array.from({length:n*n},t);return(o,c)=>{const u=Math.floor(o),h=Math.floor(c),m=o-u,p=c-h,g=m*m*(3-2*m),_=p*p*(3-2*p),v=a[(h&127)*n+(u&127)],x=a[(h&127)*n+(u+1&127)],b=a[(h+1&127)*n+(u&127)],D=a[(h+1&127)*n+(u+1&127)];return v+(x-v)*g+(b-v)*_+(v-x-b+D)*g*_}}function ru(r){return Math.max(0,Math.min(255,Math.round(r)))}function g3(){const r=[],t=m3(36092),n=Px(110640),a=(w,N,E)=>{const L=Array.from({length:3},()=>{const j=document.createElement("canvas");return j.width=w,j.height=N,j}),H=L.map(j=>{const F=j.getContext("2d");if(!F)throw new Error("Cafe surface canvas unavailable");return F}),W=H.map(j=>j.createImageData(w,N));for(let j=0;j<N;j++)for(let F=0;F<w;F++){const[q,B,P,k,V]=E(F/w,j/N),X=(j*w+F)*4;W[0].data[X]=ru(q),W[0].data[X+1]=ru(B),W[0].data[X+2]=ru(P),W[0].data[X+3]=255;for(let R=1;R<3;R++){const J=ru((R===1?k:V)*255);W[R].data[X]=J,W[R].data[X+1]=J,W[R].data[X+2]=J,W[R].data[X+3]=255}}const Y=L.map((j,F)=>{H[F].putImageData(W[F],0,0);const q=new Up(j);return q.colorSpace=F===0?Yn:Ca,q.wrapS=q.wrapT=fl,q.anisotropy=8,q.name=`cafe-local-surface-${r.length}`,r.push(q),q});return{map:Y[0],bumpMap:Y[1],roughnessMap:Y[2]}},o=a(1024,1024,(w,N)=>{const E=t(w*1.7+17,N*23+39)-.5,L=(t(w*2.8,N*7)-.5)*.019+(t(w*9,N*3+71)-.5)*.0025,H=(w-.72)*3.1,W=(N-.38)*9.5,Y=Math.sqrt(H*H+W*W+.008),j=Math.exp(-(H*H*8+W*W*3)),F=N+L+j*(Y*.023-W*.018),q=F*46+t(w*.9+31,F*13)*5,B=Math.pow(Math.sin(q*Math.PI*2)*.5+.5,13)*(.22+t(w*9+53,F*51)*.78),P=t(w*7.5,F*390)-.5,k=t(w*31+11,F*478+27)-.5,V=Math.pow(Math.max(0,(t(w*67+41,F*360)-.7)/.3),1.6),X=Math.pow(Math.max(0,(t(w*13+87,F*102+13)-.73)/.27),1.4),R=t(w*2.2+67,F*69+23)-.5,J=E*25+R*12+P*13+k*4-B*10-V*28+X*16,rt=Math.exp(-Y*Y*35)*8;return[147+J-rt,134+J*.94-rt*.9,116+J*.84-rt*.75,.51+P*.1+k*.025-B*.045-V*.2+X*.025,.69+E*.08+P*.075+V*.12-X*.03]}),c=a(512,512,(w,N)=>{const E=t(w*7,N*7)*.6+t(w*28,N*28)*.4-.5,L=n()-.5,H=E*11+L*3;return[190+H,181+H,158+H,.5+E*.12+L*.18,.9+E*.09]}),u=a(512,512,(w,N)=>{const E=w*104+t(w*10,N*8)*.24,L=N*104+t(w*8,N*10)*.24,H=(Math.floor(E)+Math.floor(L))%2,W=Math.pow(Math.sin(E*Math.PI),2),Y=Math.pow(Math.sin(L*Math.PI),2),j=H?W*.7+Y*.3:Y*.7+W*.3,F=n()-.5,q=t(w*14,N*14)-.5,B=t(w*3+21,N*93)*.5+t(w*93,N*3+43)*.5-.5,P=(j-.5)*25+q*8+B*13+F*5;return[152+P,154+P,142+P*.92,.19+j*.62+F*.07+B*.06,.95]}),h=a(512,256,(w,N)=>{const E=t(w*20,N*10)-.5,L=Math.pow(Math.max(0,(t(w*146+3,N*81+16)-.79)/.21),.85)*24,H=n()>.997?15:0,W=E*3-L-H;return[233+W,230+W,219+W*.92,.5+E*.026-L*7e-4,.67+E*.14+L*.0014]}),m=a(256,256,(w,N)=>{const E=t(w*90,N*90),L=t(w*12,N*12)-.5,H=(E-.5)*12+L*9;return[99+H,66+H*.75,44+H*.55,.2+E*.55,.67+E*.23]}),p=a(512,512,(w,N)=>{const E=n(),L=t(w*5,N*7),H=t(w*170,N*170),W=Math.min(1,Math.max(0,(L-.26)*2.1)),Y=H*13+E*5-W*7;return[43+Y,48+Y,49+Y,.43+H*(1-W)*.23+E*.04,.14+(1-W)*.55]}),g=new Rn({...o,roughness:1,bumpScale:.0045,envMapIntensity:.62});g.name="Cafe natural satin oak";const _=new Rn({...o,color:8485746,roughness:1,bumpScale:.004,envMapIntensity:.55});_.name="Cafe dark stained oak";const v=new Rn({...c,roughness:1,bumpScale:.014});v.name="Cafe limewashed plaster";const x=new Rn({...u,roughness:1,bumpScale:.004,envMapIntensity:.45});x.name="Cafe woven linen";const b=new du({...h,roughness:.53,bumpScale:.001,clearcoat:.32,clearcoatRoughness:.26});b.name="Cafe speckled stoneware";const D=new Rn({color:11702865,metalness:.82,roughness:.29});D.name="Cafe brushed brass";const M=new du({color:2692361,roughness:.15,metalness:.03,clearcoat:1,clearcoatRoughness:.06});M.name="Cafe fresh coffee";const S=new Rn({...m,roughness:.82,bumpScale:.006});S.name="Cafe cognac leather";const I=new du({...p,roughness:.85,bumpScale:.012,clearcoat:.8,clearcoatRoughness:.1});I.name="Cafe rain-wet pavement";const z=new Rn({color:4154947,roughness:.73,side:mi});z.name="Cafe deep green foliage";const A=new Set([g,_,v,x,b,D,M,S,I,z]);let O=!1;return{oak:g,darkWood:_,plaster:v,fabric:x,ceramic:b,brass:D,coffee:M,leather:S,pavement:I,foliage:z,textures:r,dispose(){if(!O){O=!0;for(const w of A)w.dispose();for(const w of new Set(r))w.dispose()}}}}function v3(r,t=1){const n=new On;n.name="Cafe lanceolate plant",n.scale.setScalar(t);let a=437921;const o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296),c=(p,g,_=n)=>{const v=new je(p,g);return v.castShadow=!0,v.receiveShadow=!0,_.add(v),v},u=[[0,.018],[.126,.018],[.138,.026],[.144,.052],[.163,.14],[.183,.26],[.193,.334],[.196,.35],[.193,.359],[.181,.359],[.178,.345],[.166,.285],[0,.285]].map(([p,g])=>new zt(p,g)),h=c(new Ml(u,64),r.ceramic);h.name="Hollow stoneware plant pot";const m=c(new wu(.173,40),r.darkWood);m.rotation.x=-Math.PI/2,m.position.y=.327,m.name="Recessed pot soil";for(let p=0;p<18;p++){const g=Math.floor(p/6),_=new On;_.name=`Curved pointed leaf ${p+1}`,_.rotation.y=p*2.399963+(o()-.5)*.31,n.add(_);const v=.065+o()*.036,x=.61+g*.115+o()*.045,b=.42-g*.046+o()*.072,D=.15+g*.04+o()*.07,M=.15-g*.04+o()*.04,S=.082+o()*.025-g*.009,I=(o()-.5)*.25,z=(o()-.5)*.035,A=j=>new Z(v+b*j,x+Math.sin(j*Math.PI*.88)*D-M*j*j,Math.sin(j*Math.PI)*z),O=new vl([new Z(v*.25,.324,0),new Z(v*.4,.45+g*.045,.002),new Z(v*.74,x-.05,0),A(0)]);c(new Jr(O,10,.0042-g*4e-4,5,!1),r.foliage,_);const w=[],N=[],E=[],L=16,H=6;for(let j=0;j<=L;j++){const F=j/L,q=A(F),B=Math.pow(Math.sin(F*Math.PI),.83)*(1.13-.48*F);for(let P=0;P<=H;P++){const k=P/H*2-1,V=S*B*k,X=Math.sin(F*Math.PI*7+p)*.0018*k*k*B,R=(1-Math.abs(k))*.018*Math.sin(F*Math.PI),J=-k*k*.017*B,rt=V*I*(F-.2);if(w.push(q.x,q.y+R+J+rt+X,q.z+V),N.push(F,P/H),j<L&&P<H){const xt=j*(H+1)+P,Lt=xt+H+1;E.push(xt,xt+1,Lt,xt+1,Lt+1,Lt)}}}const W=new Tn;W.setAttribute("position",new Oe(w,3)),W.setAttribute("uv",new Oe(N,2)),W.setIndex(E),W.computeVertexNormals(),c(W,r.foliage,_);const Y=Array.from({length:13},(j,F)=>{const q=F/12*.96,B=A(q);return B.y+=Math.sin(q*Math.PI)*.018+5e-4,B});c(new Jr(new vl(Y),16,.0014,4,!1),r.foliage,_)}return n}function _3(r){const t=new On;t.name="Asymmetrical cafe service shelves";const n=[],a=[],o=(F,q=.86,B=0)=>{const P=new Rn({color:F,roughness:q,metalness:B});return n.push(P),P},c=F=>{const q=r.ceramic.clone();return q instanceof Rn&&(q.color.set(F),q.roughness=.56,q instanceof du&&(q.clearcoat=.3,q.clearcoatRoughness=.34)),n.push(q),q},u=c("#8d9781"),h=c("#c6bda7"),m=c("#806750"),p=o("#374441"),g=o("#b4a180",.98),_=o("#77604f",.96),v=o("#9d9785",1),x=o("#826b4c",.98),b=r.foliage.clone();b instanceof Rn&&b.color.set("#3b5140"),b.side=mi,n.push(b);const D=new Rn({color:"#ba9670",emissive:"#e9b574",emissiveIntensity:.38,roughness:.75});n.push(D);const M=(F,q,B,P,k,V=t)=>{const X=new je(F,q);return X.position.set(B,P,k),X.castShadow=X.receiveShadow=!0,V.add(X),X},S=(F,q,B,P,k,V,X,R)=>M(new ki(P,k,V),X,F,q,B,R),I=(F,q,B,P,k,V,X,R)=>M(new hs(P,k,V,32),X,F,q,B,R),z=(F,q,B,P,k,V)=>M(new Ml(F.map(([X,R])=>new zt(X,R)),40),q,B,P,k,V);for(const[F,q,B]of[[4.25,2.64,5.2],[3.98,1.96,4.52]]){S(F,q,-8.73,B,.066,.44,r.oak);const P=S(F,q-.038,-8.61,B-.24,.009,.015,D);P.castShadow=!1;for(const k of[-1,1])S(F+k*(B/2-.42),q-.13,-8.88,.034,.23,.06,r.darkWood)}const A=(F,q,B,P,k,V)=>{const X=new On;X.position.set(F,q,B),X.rotation.y=V,X.scale.setScalar(P/.4),t.add(X);const R=z([[0,.008],[.083,.008],[.101,.033],[.124,.135],[.118,.235],[.083,.33],[.083,.388],[.093,.398],[.084,.402],[.072,.385],[.074,.331],[.108,.235],[.11,.132],[.09,.035],[0,.035]],k,0,0,0,X),J=R.geometry.attributes.position;for(let xt=0;xt<J.count;xt++){const Lt=J.getY(xt),Pt=J.getX(xt),nt=J.getZ(xt),dt=Math.max(0,(Lt-.33)/.072),wt=Math.pow(Math.max(0,-nt/Math.hypot(Pt,nt||1e-4)),8);J.setXYZ(xt,Pt,Lt+dt*wt*.019,nt-dt*wt*.039)}R.geometry.computeVertexNormals();const rt=new vl([new Z(.09,.312,0),new Z(.17,.311,0),new Z(.184,.237,0),new Z(.162,.151,0),new Z(.119,.132,0)]);M(new Jr(rt,20,.015,8,!1),k,0,0,0,X)};A(2.12,2.681,-8.72,.39,u,-.38),A(2.47,2.681,-8.69,.27,h,.18),A(4.43,2.001,-8.72,.32,m,-.6);const O=(F,q,B,P,k)=>{z([[0,0],[.111,0],[.139,.015],[.149,.026],[.139,.037],[.093,.025],[0,.025]],k,F,q,B);for(let V=0;V<P;V++){const X=new On;X.position.set(F+Math.sin(V*2)*.009,q+.027+V*.077,B+Math.cos(V*2)*.006),X.rotation.y=-.2+V*.27,t.add(X),z([[0,0],[.054,0],[.069,.012],[.087,.1],[.084,.116],[.075,.116],[.077,.098],[.057,.022],[0,.022]],k,0,0,0,X),M(new Fs(.033,.009,8,20,Math.PI*1.65),k,.088,.062,0,X).rotation.z=-.825*Math.PI}};O(2.27,2.003,-8.62,2,h),O(2.66,2.003,-8.75,3,u);const w=(F,q,B,P,k,V)=>{const X=new On;X.position.set(F,q,B),X.rotation.y=V,t.add(X);const R=S(0,P/2,0,.21,P,.135,k,X),J=R.geometry.attributes.position;for(let rt=0;rt<J.count;rt++)J.getY(rt)>0&&(J.setX(rt,J.getX(rt)*.84),J.setZ(rt,J.getZ(rt)*.29));R.geometry.computeVertexNormals(),S(0,P-.014,.003,.19,.032,.027,_,X)};w(3.76,2.681,-8.77,.31,g,-.13),w(3.98,2.681,-8.68,.255,p,.09);for(const[F,q,B,P]of[[0,.46,.045,v],[1,.4,.058,_],[2,.43,.031,p]]){const k=S(5.4+F*.011,2.68+[.0225,.074,.119][F],-8.72,q,B,.28,P);k.rotation.y=[.04,-.07,.03][F]}z([[0,0],[.095,0],[.114,.023],[.12,.13],[.116,.3],[.095,.323],[.095,.343],[.084,.343],[.085,.32],[.103,.298],[.105,.03],[0,.03]],m,5.6,2.818,-8.66),I(5.6,3.175,-8.66,.09,.093,.026,x);const N=new On;N.position.set(5.62,2.001,-8.78),N.rotation.x=-.095,N.rotation.y=-.08,t.add(N),S(0,.18,0,.35,.36,.027,r.darkWood,N),S(0,.18,.018,.307,.317,.008,g,N);const E=M(new wu(.066,28),_,-.035,.194,.024,N);E.scale.y=1.25,S(.061,.154,.025,.057,.1,.004,p,N),z([[0,0],[.087,0],[.123,.176],[.128,.195],[.118,.204],[.109,.182],[.075,.023],[0,.023]],h,6.33,2.681,-8.7),I(6.33,2.877,-8.7,.108,.108,.009,p);const L=new vl([new Z(6.33,2.885,-8.69),new Z(6.39,2.98,-8.49),new Z(6.43,2.79,-8.42),new Z(6.41,2.55,-8.43),new Z(6.49,2.27,-8.47)]);M(new Jr(L,32,.005,5,!1),b,0,0,0);const H=new vi(1,1,6,10),W=H.attributes.position;for(let F=0;F<W.count;F++){const q=W.getY(F)+.5,B=Math.pow(Math.sin(q*Math.PI),.72),P=W.getX(F);W.setXYZ(F,P*B,q,.11*Math.sin(q*Math.PI)-.065*Math.abs(P)*2)}H.computeVertexNormals();const Y=new Cp(H,b,14),j=new hn;for(let F=0;F<Y.count;F++){const q=.04+F/Y.count*.91;j.position.copy(L.getPoint(q)),j.rotation.set(.22+Math.sin(F*1.9)*.3,(F%2?-1:1)*.5,(F%2?-1:1)*(1.1+q*1.2)),j.scale.set(.083+F%3*.015,.123+F%4*.016,.13),j.updateMatrix(),Y.setMatrixAt(F,j.matrix)}return Y.castShadow=Y.receiveShadow=!0,t.add(Y),t.userData.provenance="Original procedural shelf geometry; no external assets.",{group:t,materials:n,textures:a}}function x3(r,t=!1){const n=r[0].index!==null,a=new Set(Object.keys(r[0].attributes)),o=new Set(Object.keys(r[0].morphAttributes)),c={},u={},h=r[0].morphTargetsRelative,m=new Tn;let p=0;for(let g=0;g<r.length;++g){const _=r[g];let v=0;if(n!==(_.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in _.attributes){if(!a.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;c[x]===void 0&&(c[x]=[]),c[x].push(_.attributes[x]),v++}if(v!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". Make sure all geometries have the same number of attributes."),null;if(h!==_.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in _.morphAttributes){if(!o.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+".  .morphAttributes must be consistent throughout all geometries."),null;u[x]===void 0&&(u[x]=[]),u[x].push(_.morphAttributes[x])}if(t){let x;if(n)x=_.index.count;else if(_.attributes.position!==void 0)x=_.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". The geometry must have either an index or a position attribute"),null;m.addGroup(p,x,g),p+=x}}if(n){let g=0;const _=[];for(let v=0;v<r.length;++v){const x=r[v].index;for(let b=0;b<x.count;++b)_.push(x.getX(b)+g);g+=r[v].attributes.position.count}m.setIndex(_)}for(const g in c){const _=H_(c[g]);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" attribute."),null;m.setAttribute(g,_)}for(const g in u){const _=u[g][0].length;if(_!==0){m.morphAttributes=m.morphAttributes||{},m.morphAttributes[g]=[];for(let v=0;v<_;++v){const x=[];for(let D=0;D<u[g].length;++D)x.push(u[g][D][v]);const b=H_(x);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" morphAttribute."),null;m.morphAttributes[g].push(b)}}}return m}function H_(r){let t,n,a,o=-1,c=0;for(let p=0;p<r.length;++p){const g=r[p];if(t===void 0&&(t=g.array.constructor),t!==g.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=g.itemSize),n!==g.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(a===void 0&&(a=g.normalized),a!==g.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(o===-1&&(o=g.gpuType),o!==g.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;c+=g.count*n}const u=new t(c),h=new Vi(u,n,a);let m=0;for(let p=0;p<r.length;++p){const g=r[p];if(g.isInterleavedBufferAttribute){const _=m/n;for(let v=0,x=g.count;v<x;v++)for(let b=0;b<n;b++){const D=g.getComponent(v,b);h.setComponent(v+_,b,D)}}else u.set(g.array,m);m+=g.count*n}return o!==void 0&&(h.gpuType=o),h}function S3(r){const t=new On;t.name="Cafe rain-wet evening street";const n=[],a=[];let o=914035;const c=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296),u=(P,k=.85,V,X=0)=>{const R=new Rn({color:P,roughness:k,emissive:V??"#000000",emissiveIntensity:X});return n.push(R),R},h=(P,k,V)=>{const X=document.createElement("canvas");X.width=P,X.height=k;const R=X.getContext("2d");if(!R)throw new Error("Cafe exterior surface canvas unavailable");V(R);const J=new Up(X);return J.colorSpace=Yn,a.push(J),J},m=h(256,512,P=>{P.fillStyle="#b6b9b8",P.fillRect(0,0,256,512);for(let k=0;k<95;k++){const V=c()*256,X=c()*512,R=8+c()*100,J=P.createRadialGradient(V,X,0,V,X,R);J.addColorStop(0,c()>.45?"#77868b13":"#e1d5bf12"),J.addColorStop(1,"#00000000"),P.fillStyle=J,P.fillRect(V-R,X-R,R*2,R*2)}for(let k=0;k<9e3;k++)P.fillStyle=c()>.5?"#f0eee80b":"#2033420a",P.fillRect(c()*256,c()*512,1,1)});m.wrapS=m.wrapT=fl,m.anisotropy=4;const p=["#354650","#4b5052","#465860","#3e4d57","#5b5954","#354955"].map(P=>{const k=u(P);return k.map=m,k}),g=u("#576065",.78),_=u("#6f7778",.7),v=u("#25333b",.96),x=u("#303d43",.6),b=u("#647071",.8),D=u("#26353e",.84),M=u("#283d49",.29,"#597b89",.075),S=u("#192b36",.24),I=[u("#736a55",.39,"#d4b482",.34),u("#9b8662",.42,"#efd2a0",.65),u("#71674f",.36,"#bd9f71",.2),u("#a58a61",.42,"#f0c688",.9)],z=[u("#978e7d",.94),u("#776f60",.96),u("#617076",.98)],A=[u("#46544f"),u("#555054"),u("#544d42")],O=u("#f1d3a3",.3,"#ffd9a0",2.4),w=new Map,N=(P,k,V,X,R,J=0,rt=0,xt=0)=>{const Lt=new Ge().compose(new Z(V,X,R),new qs().setFromEuler(new na(J,rt,xt)),new Z(1,1,1));P.applyMatrix4(Lt);const Pt=w.get(k)??[];Pt.push(P),w.set(k,Pt)},E=(P,k,V,X,R,J,rt)=>N(new ki(X,R,J),rt,P,k,V),L=(P,k,V,X,R,J,rt)=>N(new hs(X,R,J,14),rt,P,k,V);E(-7,-.064,-15,32,.08,23,r.pavement),E(-10.9,-.064,-2.65,23,.08,2.2,r.pavement),E(-10.9,.026,-2.55,23,.1,1.85,g),E(-10.9,.064,-3.51,23,.17,.14,_),E(-7,.025,-15.8,32,.12,1.38,g),E(-7,.08,-15.07,32,.19,.13,_);for(let P=-22;P<.6;P+=1.32)E(P,.078,-2.55,.014,.004,1.78,v);for(let P=-22;P<9;P+=1.57)E(P,.087,-15.8,.013,.004,1.31,v);E(-10.9,.078,-2.6,23,.004,.012,v),E(-7,-.017,-4.12,32,.012,.035,v);for(let P=0;P<4;P++){const k=-10.5+P*4.6;E(k,-.012,-4.24,.57,.024,.34,x);for(let V=0;V<6;V++)E(k-.23+V*.09,.002,-4.24,.014,.013,.31,_)}const H=h(128,128,P=>{const k=P.createRadialGradient(64,64,0,64,64,64);k.addColorStop(0,"#ffffff88"),k.addColorStop(.065,"#fffffff0"),k.addColorStop(.19,"#ffffff28"),k.addColorStop(.55,"#ffffff06"),k.addColorStop(1,"#ffffff00"),P.fillStyle=k,P.fillRect(0,0,128,128)}),W=new ml({color:"#ffe0b5",map:H,transparent:!0,opacity:.25,depthWrite:!1,blending:mu});n.push(W);const Y=(P,k,V,X)=>{const R=new je(new vi(X,X),W);R.position.set(P,k,V),R.name="Soft atmospheric lamp halo",t.add(R)},j=h(256,1024,P=>{const k=P.createImageData(256,1024);let V=.5;for(let X=0;X<1024;X++){X%(4+Math.floor(c()*9))===0&&(V=c());const R=X/1023,J=Math.sin(Math.PI*R)**.55,rt=.5+.085*Math.sin(R*31)+.034*Math.sin(R*103),xt=.05+.22*R;for(let Lt=0;Lt<256;Lt++){const Pt=(Lt/255-rt)/xt,nt=Math.exp(-Pt*Pt*3.4)*J*(.13+V*.64)*(1-R*.6),dt=(X*256+Lt)*4;k.data[dt]=k.data[dt+1]=k.data[dt+2]=255,k.data[dt+3]=Math.round(nt*255)}}P.putImageData(k,0,0)}),F=["#eac58d","#b2c5ca","#c6b391"].map(P=>{const k=new ml({map:j,color:P,transparent:!0,opacity:.68,depthWrite:!1,blending:mu});return n.push(k),k}),q=(P,k,V,X,R=0,J=1)=>{const rt=new vi(V,X),xt=rt.getAttribute("uv"),Lt=rt.getAttribute("position");for(let nt=0;nt<Lt.count;nt++)Lt.setX(nt,Lt.getX(nt)+(1-xt.getY(nt))*(-.5-P)*.45);if(c()>.5)for(let nt=0;nt<xt.count;nt++)xt.setX(nt,1-xt.getX(nt));const Pt=new je(rt,F[R]);Pt.position.set(P,-.018+J*.001,k),Pt.rotation.x=-Math.PI/2,Pt.rotation.z=(c()-.5)*.025,Pt.name="Broken wet-street light reflection",t.add(Pt)},B=[{x:-16.3,z:-19.2,w:4.5,h:9.7,rows:4,bays:3,style:0},{x:-11.8,z:-17.6,w:4.2,h:7.1,rows:3,bays:2,style:1},{x:-7.5,z:-18.4,w:4.3,h:9.1,rows:4,bays:2,style:2},{x:-3.1,z:-16.95,w:4.35,h:6.55,rows:2,bays:3,style:3},{x:1.25,z:-18,w:4.1,h:8.35,rows:3,bays:2,style:4},{x:5.55,z:-20.1,w:4.4,h:10.4,rows:4,bays:3,style:5}];for(const P of B){const{x:k,z:V,w:X,h:R,rows:J,bays:rt,style:xt}=P;E(k,R/2,V-.65,X,R,1.3,p[xt]),E(k,R+.025,V-.08,X+.14,.16,1.65,D),E(k,2.5,V+.055,X+.05,.09,.2,b),E(k-X/2+.11,R/2,V+.025,.16,R,.09,b),E(k+X/2-.1,R/2,V+.025,.13,R,.09,x);const Pt=(R-.73-3.15)/Math.max(1,J-1);for(let wt=0;wt<J;wt++)for(let ee=0;ee<rt;ee++){if(xt===2&&wt===2&&ee===0||xt===5&&wt===1&&ee===2)continue;const Bt=k+(ee-(rt-1)/2)*(X/(rt+.34)),ie=3.15+wt*Pt+(xt===3&&ee===2?.22:0),ue=rt===3?.72+c()*.16:1.03+c()*.22,mt=Math.min(Pt*.67,.91+c()*.35);E(Bt,ie,V+.045,ue+.16,mt+.18,.09,x);const Ct=c(),Nt=Ct<.46?S:Ct<.62?M:I[Math.floor(c()*I.length)];if(E(Bt,ie,V+.101,ue,mt,.012,Nt),E(Bt,ie-mt/2-.055,V+.13,ue+.21,.08,.27,b),(ee%2===0||xt%2===0)&&E(Bt+(c()-.5)*.09,ie,V+.15,.026,mt,.035,x),(wt+xt)%3===0&&E(Bt,ie+mt*.21,V+.151,ue,.024,.036,x),Ct>.4&&c()>.34){const Dt=z[(ee+wt+xt)%z.length],It=ue*(.17+c()*.18),ae=c()>.5?1:-1;E(Bt+ae*(ue-It)*.5,ie,V+.119,It,mt*.98,.016,Dt);for(let jt=0;jt<3;jt++)E(Bt+ae*(ue-It)*.5-It*.3+jt*It*.3,ie,V+.139,.012,mt*.97,.01,x)}if(Ct<.18){E(Bt,ie+mt*.28,V+.134,ue,mt*.43,.014,z[2]);for(let Dt=0;Dt<4;Dt++)E(Bt,ie+mt*.1+Dt*mt*.09,V+.15,ue,.009,.01,x)}}const nt=1.71+xt%2*.16,dt=k+X*.28;E(k-X*.1,1.2,V+.053,X*.6,nt,.08,x),E(k-X*.1,1.2,V+.105,X*.54,nt-.13,.024,xt===1||xt===4?M:I[xt%4]),E(k-X*.1,1.2,V+.15,.042,nt-.1,.07,x),E(dt,1.13,V+.08,.72,2.07,.12,x),E(dt,1.18,V+.153,.56,1.68,.02,xt%2?S:I[0]),E(dt+.18,.94,V+.18,.018,.18,.025,r.brass),E(k-.1,2.38,V+.16,X*.86,.25,.14,A[xt%3]),N(new ki(X*.89,.048,.67),A[xt%3],k-.1,2.19,V+.39,.15),E(k-.1,2.11,V+.71,X*.89,.13,.037,A[xt%3]);for(let wt=0;wt<3;wt++)E(k-X*.31+wt*.41,.63+wt%2*.11,V+.145,.18+c()*.1,.34+c()*.2,.05,z[(wt+xt)%3]);xt!==1&&xt!==5&&(q(k-.15,-11.95,1.8+c()*.6,8.6+c()*1.1,xt===4?1:0),Y(k-X*.18,1.72,V+.2,1))}E(-20.9,4.7,-25.1,6.3,9.4,1.8,p[3]),E(-13.8,6.9,-27.2,3,13.8,2,p[0]);for(const[P,k,V]of[[-21.5,4.3,-24.17],[-20,6.4,-24.17],[-13.2,7.3,-26.16]])E(P,k,V,.4,.64,.02,I[2]);for(const[P,k]of[[-5.75,-8.6,3.65],[-12.4,-13.9,3.92]].entries()){const[V,X,R]=k;L(V,R/2,X,.027,.058,R,x),L(V,.12,X,.09,.13,.24,x),N(new hs(.028,.028,.52,12),x,V+.25,R-.09,X,0,0,Math.PI/2),N(new Ru(.085,16,10),O,V+.46,R-.17,X),L(V+.46,R-.095,X,.085,.155,.075,D);const J=new bu("#f1c893",P===0?12:9,5.6,2);J.position.set(V+.46,R-.19,X),t.add(J),Y(V+.46,R-.17,X+.13,P===0?1.3:1.12),q(V+.46,X+2.3,.75,4.8,P===0?0:2)}for(const[P,k]of w){const V=x3(k,!1);if(k.forEach(R=>R.dispose()),!V)throw new Error("Cafe exterior batch geometry mismatch");const X=new je(V,P);X.castShadow=!1,X.receiveShadow=!1,X.name="Batched cafe street architecture",t.add(X)}return{group:t,materials:n,textures:a}}function y3(){const r=new ox;r.background=new ve("#263846"),r.fog=new Rp("#263846",.021);const t=g3();t.oak.color.set("#ffffff"),t.plaster.color.set("#b6ac95");const n=[],a=[],o=[],c=t.oak.clone();c.color.set("#a6a098"),a.push(c);const u=(at,_t=.8,Tt=0)=>{const Rt=new Rn({color:at,roughness:_t,metalness:Tt});return a.push(Rt),Rt},h=new Rn({color:"#fff4d6",emissive:"#ffc580",emissiveIntensity:2});a.push(h);const m=(at,_t,Tt,Rt,Vt,qt=r)=>{const re=new je(at,_t);return re.position.set(Tt,Rt,Vt),re.castShadow=!0,re.receiveShadow=!0,qt.add(re),re},p=(at,_t,Tt,Rt,Vt,qt,re,$)=>m(new ki(Rt,Vt,qt),re,at,_t,Tt,$),g=(at,_t,Tt,Rt,Vt,qt,re,$)=>m(new hs(Rt,Vt,qt,48),re,at,_t,Tt,$),_=(at,_t,Tt,Rt,Vt,qt)=>m(new Ru(Rt,24,16),Vt,at,_t,Tt,qt),v=(at,_t,Tt,Rt,Vt=r)=>{const qt=m(new hs(Tt,Tt,at.distanceTo(_t),12),Rt,0,0,0,Vt);return qt.position.copy(at).add(_t).multiplyScalar(.5),qt.quaternion.setFromUnitVectors(new Z(0,1,0),_t.clone().sub(at).normalize()),qt};p(-2.2,-.1,3.2,6,.2,9.5,t.darkWood),p(4,-.1,-3.2,6.5,.2,12,t.darkWood);for(let at=0;at<12;at++)p(-4.9+at*.5,.008,3.2,.483,.024,9.5,c);for(let at=0;at<13;at++)p(1+at*.5,.008,-3.2,.483,.024,12,c);p(4,2,-9,6.5,4,.18,t.plaster),p(7.2,2,-2,.2,4,14,t.plaster);const x=u("#202c33",.97);m(new ki(.16,4,7.5),[t.darkWood,x,x,x,t.darkWood,x],.82,2,-5.3),p(-2.2,4.15,3.2,6,.16,9.5,t.plaster),p(4,4.15,-3.2,6.5,.16,12,t.plaster),p(-5.3,2,1,.25,4,6,t.plaster);const b=-2.15,D=-1.55,M=5.7,S=3.5,I=2.14;p(b,.19,D,M+.24,.4,.21,t.plaster),p(b,.42,D+.1,M+.44,.13,.48,t.oak);for(const at of[-5.06,-2.25,.74])p(at,2.15,D+.03,.105,3.7,.17,t.darkWood),p(at+.058,2.15,D+.125,.018,3.7,.018,t.brass);p(b,3.95,D,M+.3,.15,.2,t.darkWood),p(b,3.18,D+.04,M,.065,.14,t.darkWood),p(-3.9,.45,1.6,1.25,.28,4,t.darkWood),p(-3.8,.67,1.6,1.2,.2,4,t.fabric),p(-4.45,1.15,1.6,.19,1.02,4.05,t.fabric);for(let at=-.2;at<3.6;at+=.58)p(-4.337,1.15,at,.012,.79,.016,t.darkWood),_(-4.315,1.2,at+.28,.022,t.brass);const z=new On;r.add(z),z.position.set(-.85,.79,1.12);const A=new xx,O=2.75,w=1.45,N=.12;A.moveTo(-O/2+N,-w/2),A.lineTo(O/2-N,-w/2),A.quadraticCurveTo(O/2,-w/2,O/2,-w/2+N),A.lineTo(O/2,w/2-N),A.quadraticCurveTo(O/2,w/2,O/2-N,w/2),A.lineTo(-O/2+N,w/2),A.quadraticCurveTo(-O/2,w/2,-O/2,w/2-N),A.lineTo(-O/2,-w/2+N),A.quadraticCurveTo(-O/2,-w/2,-O/2+N,-w/2);const E=m(new Op(A,{depth:.065,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:3,steps:1}),t.oak,0,0,0,z);E.rotation.x=-Math.PI/2;const L=E.geometry.getAttribute("uv");for(let at=0;at<L.count;at++)L.setXY(at,L.getX(at)/O+.5,L.getY(at)/w+.5);L.needsUpdate=!0;for(const at of[-1,1])for(const _t of[-.43,.43])p(at,-.43,_t,.065,.8,.065,t.darkWood,z);const H=document.createElement("canvas");H.width=H.height=128;const W=H.getContext("2d"),Y=W.createRadialGradient(64,64,8,64,64,64);Y.addColorStop(0,"rgba(0,0,0,.26)"),Y.addColorStop(.6,"rgba(0,0,0,.14)"),Y.addColorStop(1,"rgba(0,0,0,0)"),W.fillStyle=Y,W.fillRect(0,0,128,128);const j=new Up(H);o.push(j);const F=new ml({map:j,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});a.push(F);const q=m(new vi(.68,.68),F,-.64,.875,1.45);q.rotation.x=-Math.PI/2,q.castShadow=!1;const B=m(new vi(.45,.45),F,-1.15,.875,.56);B.rotation.x=-Math.PI/2,B.castShadow=!1;const P=new On;P.position.set(-.64,.895,1.45),r.add(P);const k=[[0,.008],[.087,.008],[.112,.018],[.14,.13],[.151,.228],[.153,.249],[.148,.256],[.14,.249],[.137,.22],[.129,.115],[.098,.035],[0,.035]].map(([at,_t])=>new zt(at,_t)),V=m(new Ml(k,96),t.ceramic,0,0,0,P),X=V.geometry.getAttribute("uv"),R=V.geometry.getAttribute("position");for(let at=0;at<X.count;at++)X.setY(at,R.getY(at)/.256);X.needsUpdate=!0;const J=m(new Fs(.085,.021,20,48,Math.PI*1.72),t.ceramic,.16,.139,0,P);J.rotation.z=-Math.PI*.86;const rt=g(-.64,.89,1.45,.235,.21,.025,t.ceramic),xt=m(new Fs(.145,.007,12,72),t.ceramic,0,.246,0,P);xt.rotation.x=Math.PI/2,g(0,.224,0,.136,.136,.002,t.coffee,P);const Lt=u("#be9561",.42),Pt=m(new Fs(.129,.0025,8,96),Lt,0,.226,0,P);Pt.rotation.x=Math.PI/2;for(const at of[V,J,rt,xt])at.userData.interaction="cup",n.push(at);const nt=new vi(.4,.49,24,24),dt=nt.getAttribute("position");for(let at=0;at<dt.count;at++){const _t=dt.getX(at),Tt=dt.getY(at);dt.setZ(at,.008+.004*Math.sin(_t*25+Tt*8)+.015*Math.pow(Math.abs(_t)/.2,6))}nt.computeVertexNormals(),m(nt,t.fabric,.1,.871,1.28).rotation.set(-Math.PI/2,0,-.13),_(.12,.886,1.34,.041,t.brass).scale.set(.65,.15,1.3),v(new Z(.12,.888,1.36),new Z(.11,.888,1.6),.008,t.brass);const Bt=u("#d8cdb3",.96),ie=p(-1.61,.8795,1.29,.43,.013,.33,Bt);ie.rotation.y=.12;for(let at=0;at<6;at++)p(-1.61,.887,1.2+at*.031,.25-at%3*.04,.001,.003,t.darkWood);const ue=new On;ue.position.set(-1.15,.8725,.56),r.add(ue),g(0,.018,0,.15,.17,.035,t.brass,ue),g(0,.26,0,.017,.022,.48,t.brass,ue);const mt=new Rn({color:"#edcc94",roughness:.85,side:mi,emissive:"#edac55",emissiveIntensity:.24});a.push(mt);const Ct=m(new hs(.15,.29,.36,96,1,!0),mt,0,.56,0,ue);for(let at=0;at<64;at++){const _t=at/64*Math.PI*2;v(new Z(Math.cos(_t)*.289,.38,Math.sin(_t)*.289),new Z(Math.cos(_t)*.15,.74,Math.sin(_t)*.15),.0021,mt,ue)}for(const[at,_t]of[[.38,.29],[.74,.15]]){const Tt=m(new Fs(_t,.007,8,72),t.brass,0,at,0,ue);Tt.rotation.x=Math.PI/2}_(0,.43,0,.048,h,ue);const Nt=new bu("#ffcf91",2.6,4.2,2);Nt.position.set(-1.15,1.3025,.56),r.add(Nt);const Dt=new h_("#ffe0af",7,5,1.18,.95,2);Dt.position.set(-1.15,1.3525,.56),Dt.target.position.set(-.48,.83,1.65),Dt.castShadow=!0,Dt.shadow.mapSize.set(2048,2048),Dt.shadow.radius=4,Dt.shadow.bias=-.001,Dt.shadow.normalBias=.018,r.add(Dt,Dt.target),Ct.userData.interaction="lamp",n.push(Ct),p(4,.56,-7.35,5.2,1.12,1,t.darkWood),p(4,1.15,-7.35,5.4,.14,1.12,t.oak);for(let at=1.65;at<6.5;at+=.14)p(at,.61,-6.833,.037,1,.025,t.oak);const It=u("#64666a",.26,.82);p(4.7,1.46,-7.32,1.12,.48,.54,It),p(4.7,1.56,-7.015,.87,.19,.02,t.darkWood);for(const at of[4.45,4.91])g(at,1.345,-6.98,.038,.038,.17,t.brass),v(new Z(at,1.34,-7),new Z(at,1.32,-6.76),.021,t.darkWood);const ae=_3(t);r.add(ae.group),a.push(...ae.materials),o.push(...ae.textures);const jt=(at,_t,Tt=2.9)=>{g(at,3.54,_t,.012,.012,1.2,t.darkWood),g(at,Tt,_t,.14,.42,.22,t.darkWood),g(at,Tt-.115,_t,.38,.38,.012,h);const Rt=new h_("#ffdda6",13,8,.88,1,2);Rt.position.set(at,Tt-.18,_t),Rt.target.position.set(at,0,_t),r.add(Rt,Rt.target)};jt(2.15,-1.4),jt(3.6,-4.5),jt(5.6,-6.8);const ce=new sE("#c3d0d9","#534c44",.21);r.add(ce);const he=new bu("#ffe6c7",4.5,13,2);he.position.set(3,3,0),r.add(he);const Q=new cE("#9cbfd8",.34);Q.position.set(-5,5,-6),r.add(Q);const pe=u("#242c2e",.94),Se=u("#34302c",.97),G=u("#20282b",.96),T=u("#65594e",.96),it=u("#222524",1),ct=(at,_t,Tt)=>{const Rt=new On;Rt.position.set(at,0,_t),Rt.rotation.y=Tt,r.add(Rt),p(0,.46,0,.52,.1,.5,t.fabric,Rt),p(0,.78,.23,.53,.56,.08,t.darkWood,Rt);for(const Vt of[-.22,.22])for(const qt of[-.2,.2])p(Vt,.24,qt,.032,.48,.032,t.darkWood,Rt);return Rt},St=(at,_t,Tt,Rt)=>{const Vt=ct(at,_t,Tt);Vt.scale.setScalar(.88);const qt=Rt?Se:pe,re=m(new Mu(.2,.32,8,24),qt,0,.92,0,Vt);re.scale.set(1,.95,.65),re.rotation.x=-.16,g(0,1.22,-.075,.042,.049,.085,T,Vt);const $=_(0,1.345,-.1,.11,T,Vt);$.scale.set(.78,1.14,.85),$.rotation.x=.18,_(0,1.38,-.075,.113,it,Vt).scale.set(.81,.96,.86),Rt&&_(.04,1.385,.022,.049,it,Vt).scale.set(1,1.1,.9);for(const Mt of[-1,1]){const Gt=m(new Mu(.055,.25,6,16),qt,Mt*.18,.92,-.12,Vt);Gt.rotation.x=-.65,v(new Z(Mt*.17,.78,-.24),new Z(Mt*.09,.77,-.39),.043,qt,Vt),v(new Z(Mt*.105,.46,-.05),new Z(Mt*.105,.1,-.27),.055,G,Vt)}return Vt};for(const[at,_t,Tt]of[[0,2.3,-5.6],[1,4.85,-6.1]]){const Rt=m(new vi(2.4,2.2),F,_t,.026,Tt);Rt.rotation.x=-Math.PI/2,Rt.castShadow=!1,g(_t,.72,Tt,.49,.49,.055,t.oak),g(_t,.36,Tt,.044,.06,.7,t.darkWood),g(_t,.04,Tt,.23,.23,.05,t.darkWood),ct(_t-.69,Tt,-Math.PI/2).scale.setScalar(.88),St(_t+.66,Tt-.1,Math.PI/2+(at?.22:-.14),at),g(_t-.1,.79,Tt,.05,.04,.1,t.ceramic),p(_t+.12,.755,Tt+.02,.2,.008,.26,Bt)}for(const[at,_t,Tt]of[[1.3,-3.25,1.35],[5.1,-4.75,1.12],[.9,-1.6,.56],[6.6,-7.9,1.3]]){const Rt=v3(t,Tt);Rt.position.set(at,0,_t),r.add(Rt)}const Ot=S3(t);r.add(Ot.group),a.push(...Ot.materials),o.push(...Ot.textures);const Ft={time:{value:0},pulse:{value:0}},vt=new Ui({transparent:!0,depthWrite:!1,side:mi,uniforms:Ft,vertexShader:"varying vec2 vUv; uniform float time; void main(){vUv=uv;vec3 p=position;p.x+=sin(uv.y*8.0-time*.75)*.033*uv.y+sin(uv.y*17.0+time*.3)*.015;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}",fragmentShader:"varying vec2 vUv;uniform float time;uniform float pulse;void main(){float center=.5+.10*sin(vUv.y*13.-time*.35);float w=.10+vUv.y*.22;float a=exp(-pow((vUv.x-center)/w,2.)*3.);a*=smoothstep(0.,.16,vUv.y)*(1.-smoothstep(.45,1.,vUv.y));a*=.12+.035*sin(vUv.y*28.-time*.9);gl_FragColor=vec4(.92,.88,.80,a*(1.+pulse*.35));}"});a.push(vt);const yt=new On;yt.position.set(-.64,1.11,1.45),r.add(yt);for(let at=0;at<3;at++){const _t=m(new vi(.31,.69,12,36),vt,(at-1)*.045,.345,0,yt);_t.rotation.y=at*Math.PI/3,_t.castShadow=!1,_t.receiveShadow=!1}return{scene:r,m:t,cup:P,saucer:rt,steam:yt,lamp:ue,key:Dt,cupContact:q,lampContact:B,lampLight:Nt,shadeMat:mt,steamUniforms:Ft,interactables:n,glass:{x:b,y:I,z:D,w:M,h:S},dispose(){const at=new Set;r.traverse(_t=>{_t instanceof je&&at.add(_t.geometry),_t instanceof Cp&&_t.dispose()}),at.forEach(_t=>_t.dispose()),a.forEach(_t=>_t.dispose()),o.forEach(_t=>_t.dispose()),r.traverse(_t=>{var Tt;_t instanceof El&&"shadow"in _t&&((Tt=_t.shadow)==null||Tt.dispose())}),t.dispose()}}}class M3{constructor(t,n){this.canvas=t,this.onContextLost=n,this.camera=new ii(45,1,.04,80),this.world=y3(),this.look=new p3({yaw:.052,pitch:.027},{follow:.2,settle:1.35}),this.raycaster=new hE,this.target=new _i(1,1,{type:Di,depthBuffer:!0}),this.raf=0,this.last=0,this.ready=!1,this.disposed=!1,this.time=0,this.width=1,this.height=1,this.ratio=1,this.wipeAge=99,this.cupPulse=0,this.lampLevel=1,this.lampTarget=1,this.frames=0,this.lost=u=>{u.preventDefault(),this.onContextLost()},this.renderer=new u3({canvas:t,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=Yn,this.renderer.toneMapping=mp,this.renderer.toneMappingExposure=1.02,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=V_,this.renderer.shadowMap.autoUpdate=!1;const a=new f3,o=new cp(this.renderer);this.environment=o.fromScene(a,.035),this.world.scene.environment=this.environment.texture,this.world.scene.environmentIntensity=.27,a.dispose(),o.dispose();const c=this.world.glass;this.glass=new Uu(new vi(c.w,c.h),{textureWidth:512,textureHeight:512,multisample:0,clipBias:.003,shader:{name:"CafeRainGlass",uniforms:{color:{value:new ve("#e5eced")},tDiffuse:{value:null},textureMatrix:{value:new Ge},sceneColor:{value:null},resolution:{value:new zt(1,1)},time:{value:0},wipe:{value:new zt(-2,-2)},wipeAge:{value:99}},vertexShader:"varying vec2 vUv;varying vec4 vReflect;uniform mat4 textureMatrix;void main(){vUv=uv;vReflect=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`uniform sampler2D tDiffuse,sceneColor;uniform vec2 resolution,wipe;uniform float time,wipeAge;varying vec2 vUv;varying vec4 vReflect;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      vec4 drops(vec2 uv,vec2 grid,float speed){vec2 p=uv*grid;vec2 id=floor(p);float h=hash(vec2(id.x,2.));p.y+=time*speed*(.3+h);id=floor(p);vec2 q=fract(p)-.5;h=hash(id);q.x-=(h-.5)*.62;q.y-=(hash(id+7.)-.5)*.44;float r=.075+.11*hash(id+8.);vec2 n=q/vec2(r,r*(1.05+speed*3.));float d=length(n);float body=1.-smoothstep(.72,1.,d);float keep=step(.55,h);float trail=exp(-abs(q.x)*230.)*smoothstep(.02,.08,q.y)*(1.-smoothstep(.08,.5,q.y))*step(.01,speed)*.15;float rim=smoothstep(.66,.84,d)*(1.-smoothstep(.84,1.05,d))*keep;return vec4(n*body*.006*keep,(body+trail)*keep,rim);}
      vec3 blurred(vec2 uv,float radius){vec2 px=radius/resolution;vec3 c=texture2D(sceneColor,uv).rgb*.24;c+=texture2D(sceneColor,uv+vec2(px.x,0)).rgb*.12;c+=texture2D(sceneColor,uv-vec2(px.x,0)).rgb*.12;c+=texture2D(sceneColor,uv+vec2(0,px.y)).rgb*.12;c+=texture2D(sceneColor,uv-vec2(0,px.y)).rgb*.12;c+=texture2D(sceneColor,uv+px*.7).rgb*.07;c+=texture2D(sceneColor,uv-px*.7).rgb*.07;c+=texture2D(sceneColor,uv+vec2(-px.x,px.y)*.7).rgb*.07;c+=texture2D(sceneColor,uv+vec2(px.x,-px.y)*.7).rgb*.07;return c;}
      void main(){vec4 a=drops(vUv,vec2(81.,47.),0.);vec4 b=drops(vUv+vec2(.12,.34),vec2(29.,18.),.095);vec4 beads=drops(vUv+.37,vec2(137.,83.),0.);vec2 shift=a.xy+b.xy+beads.xy*.24;vec2 screen=gl_FragCoord.xy/resolution;float water=clamp(a.z+b.z+beads.z*.3,0.,1.);float edge=pow(abs(vUv.x-.5)*2.,3.)*.065+pow(1.-vUv.y,4.)*.065;vec2 wipeDelta=(vUv-wipe)*vec2(1.8,1.);float clearPatch=exp(-dot(wipeDelta,wipeDelta)/.016)*exp(-wipeAge*.075);float fog=edge*(1.-clearPatch);vec3 outside=blurred(clamp(screen+shift,vec2(.01),vec2(.99)),mix(3.4,1.,water)+fog*26.);vec2 mirror=vReflect.xy/vReflect.w+shift*.3;vec3 inside=texture2D(tDiffuse,mirror).rgb;vec3 c=mix(outside,inside,.035+edge*.15);c=mix(c,vec3(.17,.22,.25),fog);c*=1.-(a.w+b.w)*.12;c+=vec3(.58,.66,.69)*max(0.,-shift.y)*7.;c+=vec3(.7,.78,.81)*pow(max(0.,shift.y)*150.,3.)*.055;gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>}`}}),this.glass.material.uniforms.sceneColor.value=this.target.texture,this.glass.position.set(c.x,c.y,c.z),this.world.scene.add(this.glass),this.glass.userData.interaction="window",this.world.interactables.push(this.glass),t.addEventListener("webglcontextlost",this.lost),t.dataset.engine="three-webgl2",t.dataset.lifecycle="created"}async init(){this.disposed||(this.ready=!0,this.setSize(this.width,this.height,this.ratio),this.renderer.shadowMap.needsUpdate=!0,this.renderFrame(0),this.canvas.dataset.lifecycle="ready")}setSize(t,n,a){this.width=Math.max(1,t),this.height=Math.max(1,n),this.ratio=Math.min(2,Math.max(1,a)),this.renderer.setPixelRatio(this.ratio),this.renderer.setSize(this.width,this.height,!1),this.target.setSize(Math.round(this.width*this.ratio),Math.round(this.height*this.ratio)),this.glass.getRenderTarget().setSize(Math.round(this.width*this.ratio*.65),Math.round(this.height*this.ratio*.65)),this.glass.material.uniforms.resolution.value.set(this.width*this.ratio,this.height*this.ratio),this.camera.aspect=this.width/this.height,this.renderer.shadowMap.needsUpdate=!0,this.camera.fov=43+7*(1-Ma.smoothstep(this.camera.aspect,.48,1.35)),this.camera.updateProjectionMatrix()}renderFrame(t){if(!this.ready||this.disposed)return;const n=Math.min(.05,Math.max(0,t));this.time+=n,this.wipeAge+=n,this.look.update(n),this.cupPulse=Math.max(0,this.cupPulse-n*.4),this.lampLevel+=(this.lampTarget-this.lampLevel)*(1-Math.exp(-n*1.2)),this.world.steamUniforms.time.value=this.time,this.world.steamUniforms.pulse.value=this.cupPulse,this.world.cup.rotation.z=Math.sin(this.time*3)*this.cupPulse*.006,this.world.lampLight.intensity=2.6*this.lampLevel,this.world.shadeMat.emissiveIntensity=.24*this.lampLevel,this.glass.material.uniforms.time.value=this.time,this.glass.material.uniforms.wipeAge.value=this.wipeAge;const a=1-Ma.smoothstep(this.camera.aspect,.48,1.35);this.camera.position.set(Ma.lerp(.1,-.7,a),Ma.lerp(1.53,1.44,a),Ma.lerp(3.5,3.12,a));const o=new Z(Ma.lerp(-.4,-1.35,a),1.3,-1.7);this.world.cup.position.x=this.world.saucer.position.x=this.world.steam.position.x=this.world.cupContact.position.x=Ma.lerp(-.64,-.93,a),this.world.lamp.position.x=this.world.lampLight.position.x=this.world.key.position.x=this.world.lampContact.position.x=Ma.lerp(-1.15,-1.29,a),this.world.key.target.position.x=this.world.cup.position.x+.16,this.world.lamp.scale.setScalar(Ma.lerp(1,.8,a)),this.camera.lookAt(o),this.camera.rotateY(this.look.yaw),this.camera.rotateX(this.look.pitch),this.camera.updateMatrixWorld(),this.glass.visible=!1,this.renderer.setRenderTarget(this.target),this.renderer.render(this.world.scene,this.camera),this.glass.visible=!0,this.renderer.setRenderTarget(null),this.renderer.render(this.world.scene,this.camera),this.frames++,this.canvas.dataset.frames=String(this.frames),this.canvas.dataset.time=this.time.toFixed(4),this.canvas.dataset.yaw=this.look.yaw.toFixed(5),this.canvas.dataset.cupPulse=this.cupPulse.toFixed(3),this.canvas.dataset.lamp=this.lampLevel.toFixed(3),this.canvas.dataset.wipeAge=this.wipeAge.toFixed(3),this.canvas.dataset.drawCalls=String(this.renderer.info.render.calls),this.canvas.dataset.triangles=String(this.renderer.info.render.triangles)}start(){if(this.raf||!this.ready||this.disposed)return;this.last=performance.now(),this.canvas.dataset.running="true";const t=n=>{this.disposed||(this.renderFrame((n-this.last)/1e3),this.last=n,this.raf=requestAnimationFrame(t))};this.raf=requestAnimationFrame(t)}stop(){cancelAnimationFrame(this.raf),this.raf=0,this.canvas.dataset.running="false"}drag(t,n){this.look.drag(t,n)}releaseDrag(){this.look.release()}interact(t,n){this.raycaster.setFromCamera(new zt(t*2-1,1-n*2),this.camera);const a=this.raycaster.intersectObjects(this.world.interactables,!1)[0],o=a==null?void 0:a.object.userData.interaction;return o==="window"&&a.uv&&(this.glass.material.uniforms.wipe.value.copy(a.uv),this.wipeAge=0),o==="cup"&&(this.cupPulse=1),o==="lamp"&&(this.lampTarget=this.lampTarget>.9?.78:1),o??null}dispose(){this.disposed||(this.stop(),this.disposed=!0,this.canvas.removeEventListener("webglcontextlost",this.lost),this.glass.dispose(),this.target.dispose(),this.environment.dispose(),this.world.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.dataset.lifecycle="disposed")}}class E3 extends jy{constructor(){super({canvasClass:"cafe-world-canvas",isSupported:()=>{var t;try{const n=document.createElement("canvas").getContext("webgl2"),a=!!(n!=null&&n.getExtension("EXT_color_buffer_float"));return(t=n==null?void 0:n.getExtension("WEBGL_lose_context"))==null||t.loseContext(),a}catch{return!1}},create:(t,n)=>new M3(t,n)})}interact(t,n,a){var o;return this.top===t&&t.running&&this.status==="ready"?((o=this.engine)==null?void 0:o.interact(n,a))??null:null}}const ou=new E3;function G_({active:r,onInteraction:t}){const n=qn.useRef(null),a=qn.useRef(null),o=qn.useRef(null),[c,u]=qn.useState("loading"),h=Jy(r);return qn.useEffect(()=>{if(!a.current)return;const m={mount:a.current,running:!1,onStatus:u};o.current=m;const p=ou.acquire(m);return()=>{o.current=null,p()}},[]),qn.useEffect(()=>{o.current&&ou.setRunning(o.current,h)},[h,c]),Qy(ou,n,o,h),qn.useEffect(()=>{const m=n.current;if(!m||!h)return;let p=null;const g=b=>{b.isPrimary&&b.button===0&&(p={x:b.clientX,y:b.clientY,id:b.pointerId,time:performance.now(),distance:0})},_=b=>{p&&p.id===b.pointerId&&(p.distance=Math.max(p.distance,Math.hypot(b.clientX-p.x,b.clientY-p.y)))},v=b=>{const D=p;if(p=null,!D||D.id!==b.pointerId||D.distance>8||Math.hypot(b.clientX-D.x,b.clientY-D.y)>8||performance.now()-D.time>600||!o.current)return;const M=m.getBoundingClientRect(),S=ou.interact(o.current,(b.clientX-M.left)/M.width,(b.clientY-M.top)/M.height);S&&(t==null||t(S))},x=()=>{p=null};return m.addEventListener("pointerdown",g),window.addEventListener("pointermove",_),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",x),()=>{m.removeEventListener("pointerdown",g),window.removeEventListener("pointermove",_),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",x)}},[h,t]),fn.jsxs("div",{ref:n,className:"cafe-world","data-state":c,"data-motion":h?"running":"paused",role:"img","aria-label":"비 오는 저녁, 따뜻한 조명과 커피가 있는 카페 창가. 멀리 손님들이 조용히 앉아 있습니다.",children:[fn.jsx("div",{ref:a,className:"cafe-world-mount"}),c!=="ready"&&fn.jsx("span",{className:"cafe-world-status",role:"status",children:c==="failed"?"이 기기에서 카페 3D 화면을 표시할 수 없습니다.":"카페 창가를 준비하고 있어요"})]})}function b3(){const[r,t]=qn.useState(!new URLSearchParams(location.search).has("paused")),[n,a]=qn.useState(!1),[o,c]=qn.useState(!0),[u,h]=qn.useState("");return fn.jsxs(fn.Fragment,{children:[fn.jsx("main",{"data-scene-surface":!0,style:{position:"absolute",inset:0},children:o&&fn.jsx(G_,{active:r,onInteraction:h})}),n&&o&&fn.jsx("section",{id:"fullscreen","data-scene-surface":!0,"aria-label":"몰입 화면",children:fn.jsx(G_,{active:r,onInteraction:h})}),fn.jsxs("div",{className:"label",children:[fn.jsx("small",{children:"RAINY EVENING · WINDOW SEAT"}),fn.jsx("h1",{children:"Café focus"}),fn.jsx("span",{children:"40 min"})]}),fn.jsxs("nav",{children:[fn.jsx("button",{onClick:()=>t(m=>!m),children:r?"Pause":"Resume"}),fn.jsx("button",{onClick:()=>a(m=>!m),children:n?"Exit fullscreen":"Fullscreen holder"}),fn.jsx("button",{onClick:()=>c(m=>!m),children:o?"Unmount":"Mount"}),fn.jsx("button",{onClick:()=>document.documentElement.classList.toggle("reduce-motion"),children:"Reduced motion"}),fn.jsx("output",{"data-interaction":!0,children:u})]})]})}Ky.createRoot(document.getElementById("root")).render(fn.jsx(Vy.StrictMode,{children:fn.jsx(b3,{})}));
