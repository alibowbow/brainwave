var Wh={exports:{}},il={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bv;function uM(){if(Bv)return il;Bv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var f in o)f!=="key"&&(c[f]=o[f])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return il.Fragment=t,il.jsx=n,il.jsxs=n,il}var Hv;function fM(){return Hv||(Hv=1,Wh.exports=uM()),Wh.exports}var be=fM(),qh={exports:{}},oe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gv;function hM(){if(Gv)return oe;Gv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function x(O){return O===null||typeof O!="object"?null:(O=g&&O[g]||O["@@iterator"],typeof O=="function"?O:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,y={};function S(O,et,j){this.props=O,this.context=et,this.refs=y,this.updater=j||b}S.prototype.isReactComponent={},S.prototype.setState=function(O,et){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,et,"setState")},S.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function C(){}C.prototype=S.prototype;function L(O,et,j){this.props=O,this.context=et,this.refs=y,this.updater=j||b}var A=L.prototype=new C;A.constructor=L,w(A,S.prototype),A.isPureReactComponent=!0;var U=Array.isArray;function N(){}var I={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function P(O,et,j){var J=j.ref;return{$$typeof:r,type:O,key:et,ref:J!==void 0?J:null,props:j}}function B(O,et){return P(O.type,et,O.props)}function W(O){return typeof O=="object"&&O!==null&&O.$$typeof===r}function G(O){var et={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(j){return et[j]})}var $=/\/+/g;function V(O,et){return typeof O=="object"&&O!==null&&O.key!=null?G(""+O.key):et.toString(36)}function tt(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(N,N):(O.status="pending",O.then(function(et){O.status==="pending"&&(O.status="fulfilled",O.value=et)},function(et){O.status==="pending"&&(O.status="rejected",O.reason=et)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function F(O,et,j,J,bt){var Dt=typeof O;(Dt==="undefined"||Dt==="boolean")&&(O=null);var at=!1;if(O===null)at=!0;else switch(Dt){case"bigint":case"string":case"number":at=!0;break;case"object":switch(O.$$typeof){case r:case t:at=!0;break;case v:return at=O._init,F(at(O._payload),et,j,J,bt)}}if(at)return bt=bt(O),at=J===""?"."+V(O,0):J,U(bt)?(j="",at!=null&&(j=at.replace($,"$&/")+"/"),F(bt,et,j,"",function(It){return It})):bt!=null&&(W(bt)&&(bt=B(bt,j+(bt.key==null||O&&O.key===bt.key?"":(""+bt.key).replace($,"$&/")+"/")+at)),et.push(bt)),1;at=0;var pt=J===""?".":J+":";if(U(O))for(var Tt=0;Tt<O.length;Tt++)J=O[Tt],Dt=pt+V(J,Tt),at+=F(J,et,j,Dt,bt);else if(Tt=x(O),typeof Tt=="function")for(O=Tt.call(O),Tt=0;!(J=O.next()).done;)J=J.value,Dt=pt+V(J,Tt++),at+=F(J,et,j,Dt,bt);else if(Dt==="object"){if(typeof O.then=="function")return F(tt(O),et,j,J,bt);throw et=String(O),Error("Objects are not valid as a React child (found: "+(et==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":et)+"). If you meant to render a collection of children, use an array instead.")}return at}function X(O,et,j){if(O==null)return O;var J=[],bt=0;return F(O,J,"","",function(Dt){return et.call(j,Dt,bt++)}),J}function q(O){if(O._status===-1){var et=O._result;et=et(),et.then(function(j){(O._status===0||O._status===-1)&&(O._status=1,O._result=j)},function(j){(O._status===0||O._status===-1)&&(O._status=2,O._result=j)}),O._status===-1&&(O._status=0,O._result=et)}if(O._status===1)return O._result.default;throw O._result}var it=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var et=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(et))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},rt={map:X,forEach:function(O,et,j){X(O,function(){et.apply(this,arguments)},j)},count:function(O){var et=0;return X(O,function(){et++}),et},toArray:function(O){return X(O,function(et){return et})||[]},only:function(O){if(!W(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return oe.Activity=_,oe.Children=rt,oe.Component=S,oe.Fragment=n,oe.Profiler=o,oe.PureComponent=L,oe.StrictMode=a,oe.Suspense=p,oe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,oe.__COMPILER_RUNTIME={__proto__:null,c:function(O){return I.H.useMemoCache(O)}},oe.cache=function(O){return function(){return O.apply(null,arguments)}},oe.cacheSignal=function(){return null},oe.cloneElement=function(O,et,j){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var J=w({},O.props),bt=O.key;if(et!=null)for(Dt in et.key!==void 0&&(bt=""+et.key),et)!T.call(et,Dt)||Dt==="key"||Dt==="__self"||Dt==="__source"||Dt==="ref"&&et.ref===void 0||(J[Dt]=et[Dt]);var Dt=arguments.length-2;if(Dt===1)J.children=j;else if(1<Dt){for(var at=Array(Dt),pt=0;pt<Dt;pt++)at[pt]=arguments[pt+2];J.children=at}return P(O.type,bt,J)},oe.createContext=function(O){return O={$$typeof:u,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:c,_context:O},O},oe.createElement=function(O,et,j){var J,bt={},Dt=null;if(et!=null)for(J in et.key!==void 0&&(Dt=""+et.key),et)T.call(et,J)&&J!=="key"&&J!=="__self"&&J!=="__source"&&(bt[J]=et[J]);var at=arguments.length-2;if(at===1)bt.children=j;else if(1<at){for(var pt=Array(at),Tt=0;Tt<at;Tt++)pt[Tt]=arguments[Tt+2];bt.children=pt}if(O&&O.defaultProps)for(J in at=O.defaultProps,at)bt[J]===void 0&&(bt[J]=at[J]);return P(O,Dt,bt)},oe.createRef=function(){return{current:null}},oe.forwardRef=function(O){return{$$typeof:f,render:O}},oe.isValidElement=W,oe.lazy=function(O){return{$$typeof:v,_payload:{_status:-1,_result:O},_init:q}},oe.memo=function(O,et){return{$$typeof:d,type:O,compare:et===void 0?null:et}},oe.startTransition=function(O){var et=I.T,j={};I.T=j;try{var J=O(),bt=I.S;bt!==null&&bt(j,J),typeof J=="object"&&J!==null&&typeof J.then=="function"&&J.then(N,it)}catch(Dt){it(Dt)}finally{et!==null&&j.types!==null&&(et.types=j.types),I.T=et}},oe.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},oe.use=function(O){return I.H.use(O)},oe.useActionState=function(O,et,j){return I.H.useActionState(O,et,j)},oe.useCallback=function(O,et){return I.H.useCallback(O,et)},oe.useContext=function(O){return I.H.useContext(O)},oe.useDebugValue=function(){},oe.useDeferredValue=function(O,et){return I.H.useDeferredValue(O,et)},oe.useEffect=function(O,et){return I.H.useEffect(O,et)},oe.useEffectEvent=function(O){return I.H.useEffectEvent(O)},oe.useId=function(){return I.H.useId()},oe.useImperativeHandle=function(O,et,j){return I.H.useImperativeHandle(O,et,j)},oe.useInsertionEffect=function(O,et){return I.H.useInsertionEffect(O,et)},oe.useLayoutEffect=function(O,et){return I.H.useLayoutEffect(O,et)},oe.useMemo=function(O,et){return I.H.useMemo(O,et)},oe.useOptimistic=function(O,et){return I.H.useOptimistic(O,et)},oe.useReducer=function(O,et,j){return I.H.useReducer(O,et,j)},oe.useRef=function(O){return I.H.useRef(O)},oe.useState=function(O){return I.H.useState(O)},oe.useSyncExternalStore=function(O,et,j){return I.H.useSyncExternalStore(O,et,j)},oe.useTransition=function(){return I.H.useTransition()},oe.version="19.2.7",oe}var Vv;function wp(){return Vv||(Vv=1,qh.exports=hM()),qh.exports}var ze=wp(),Yh={exports:{}},al={},Zh={exports:{}},Kh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kv;function dM(){return kv||(kv=1,(function(r){function t(F,X){var q=F.length;F.push(X);t:for(;0<q;){var it=q-1>>>1,rt=F[it];if(0<o(rt,X))F[it]=X,F[q]=rt,q=it;else break t}}function n(F){return F.length===0?null:F[0]}function a(F){if(F.length===0)return null;var X=F[0],q=F.pop();if(q!==X){F[0]=q;t:for(var it=0,rt=F.length,O=rt>>>1;it<O;){var et=2*(it+1)-1,j=F[et],J=et+1,bt=F[J];if(0>o(j,q))J<rt&&0>o(bt,j)?(F[it]=bt,F[J]=q,it=J):(F[it]=j,F[et]=q,it=et);else if(J<rt&&0>o(bt,q))F[it]=bt,F[J]=q,it=J;else break t}}return X}function o(F,X){var q=F.sortIndex-X.sortIndex;return q!==0?q:F.id-X.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,f=u.now();r.unstable_now=function(){return u.now()-f}}var p=[],d=[],v=1,_=null,g=3,x=!1,b=!1,w=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,C=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function A(F){for(var X=n(d);X!==null;){if(X.callback===null)a(d);else if(X.startTime<=F)a(d),X.sortIndex=X.expirationTime,t(p,X);else break;X=n(d)}}function U(F){if(w=!1,A(F),!b)if(n(p)!==null)b=!0,N||(N=!0,G());else{var X=n(d);X!==null&&tt(U,X.startTime-F)}}var N=!1,I=-1,T=5,P=-1;function B(){return y?!0:!(r.unstable_now()-P<T)}function W(){if(y=!1,N){var F=r.unstable_now();P=F;var X=!0;try{t:{b=!1,w&&(w=!1,C(I),I=-1),x=!0;var q=g;try{e:{for(A(F),_=n(p);_!==null&&!(_.expirationTime>F&&B());){var it=_.callback;if(typeof it=="function"){_.callback=null,g=_.priorityLevel;var rt=it(_.expirationTime<=F);if(F=r.unstable_now(),typeof rt=="function"){_.callback=rt,A(F),X=!0;break e}_===n(p)&&a(p),A(F)}else a(p);_=n(p)}if(_!==null)X=!0;else{var O=n(d);O!==null&&tt(U,O.startTime-F),X=!1}}break t}finally{_=null,g=q,x=!1}X=void 0}}finally{X?G():N=!1}}}var G;if(typeof L=="function")G=function(){L(W)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,V=$.port2;$.port1.onmessage=W,G=function(){V.postMessage(null)}}else G=function(){S(W,0)};function tt(F,X){I=S(function(){F(r.unstable_now())},X)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(F){F.callback=null},r.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<F?Math.floor(1e3/F):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(F){switch(g){case 1:case 2:case 3:var X=3;break;default:X=g}var q=g;g=X;try{return F()}finally{g=q}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(F,X){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var q=g;g=F;try{return X()}finally{g=q}},r.unstable_scheduleCallback=function(F,X,q){var it=r.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?it+q:it):q=it,F){case 1:var rt=-1;break;case 2:rt=250;break;case 5:rt=1073741823;break;case 4:rt=1e4;break;default:rt=5e3}return rt=q+rt,F={id:v++,callback:X,priorityLevel:F,startTime:q,expirationTime:rt,sortIndex:-1},q>it?(F.sortIndex=q,t(d,F),n(p)===null&&F===n(d)&&(w?(C(I),I=-1):w=!0,tt(U,q-it))):(F.sortIndex=rt,t(p,F),b||x||(b=!0,N||(N=!0,G()))),F},r.unstable_shouldYield=B,r.unstable_wrapCallback=function(F){var X=g;return function(){var q=g;g=X;try{return F.apply(this,arguments)}finally{g=q}}}})(Kh)),Kh}var Xv;function pM(){return Xv||(Xv=1,Zh.exports=dM()),Zh.exports}var Jh={exports:{}},Fn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wv;function mM(){if(Wv)return Fn;Wv=1;var r=wp();function t(p){var d="https://react.dev/errors/"+p;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)d+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(p,d,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:p,containerInfo:d,implementation:v}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function f(p,d){if(p==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Fn.createPortal=function(p,d){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(p,d,null,v)},Fn.flushSync=function(p){var d=u.T,v=a.p;try{if(u.T=null,a.p=2,p)return p()}finally{u.T=d,a.p=v,a.d.f()}},Fn.preconnect=function(p,d){typeof p=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,a.d.C(p,d))},Fn.prefetchDNS=function(p){typeof p=="string"&&a.d.D(p)},Fn.preinit=function(p,d){if(typeof p=="string"&&d&&typeof d.as=="string"){var v=d.as,_=f(v,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,x=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;v==="style"?a.d.S(p,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:x}):v==="script"&&a.d.X(p,{crossOrigin:_,integrity:g,fetchPriority:x,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Fn.preinitModule=function(p,d){if(typeof p=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var v=f(d.as,d.crossOrigin);a.d.M(p,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&a.d.M(p)},Fn.preload=function(p,d){if(typeof p=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var v=d.as,_=f(v,d.crossOrigin);a.d.L(p,v,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Fn.preloadModule=function(p,d){if(typeof p=="string")if(d){var v=f(d.as,d.crossOrigin);a.d.m(p,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else a.d.m(p)},Fn.requestFormReset=function(p){a.d.r(p)},Fn.unstable_batchedUpdates=function(p,d){return p(d)},Fn.useFormState=function(p,d,v){return u.H.useFormState(p,d,v)},Fn.useFormStatus=function(){return u.H.useHostTransitionStatus()},Fn.version="19.2.7",Fn}var qv;function gM(){if(qv)return Jh.exports;qv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Jh.exports=mM(),Jh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yv;function vM(){if(Yv)return al;Yv=1;var r=pM(),t=wp(),n=gM();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function u(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function f(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(a(188))}function d(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,l=i;;){var h=s.return;if(h===null)break;var m=h.alternate;if(m===null){if(l=h.return,l!==null){s=l;continue}break}if(h.child===m.child){for(m=h.child;m;){if(m===s)return p(h),e;if(m===l)return p(h),i;m=m.sibling}throw Error(a(188))}if(s.return!==l.return)s=h,l=m;else{for(var M=!1,D=h.child;D;){if(D===s){M=!0,s=h,l=m;break}if(D===l){M=!0,l=h,s=m;break}D=D.sibling}if(!M){for(D=m.child;D;){if(D===s){M=!0,s=m,l=h;break}if(D===l){M=!0,l=m,s=h;break}D=D.sibling}if(!M)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function v(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=v(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),C=Symbol.for("react.consumer"),L=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),U=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),P=Symbol.for("react.activity"),B=Symbol.for("react.memo_cache_sentinel"),W=Symbol.iterator;function G(e){return e===null||typeof e!="object"?null:(e=W&&e[W]||e["@@iterator"],typeof e=="function"?e:null)}var $=Symbol.for("react.client.reference");function V(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===$?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case S:return"Profiler";case y:return"StrictMode";case U:return"Suspense";case N:return"SuspenseList";case P:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case L:return e.displayName||"Context";case C:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case I:return i=e.displayName||null,i!==null?i:V(e.type)||"Memo";case T:i=e._payload,e=e._init;try{return V(e(i))}catch{}}return null}var tt=Array.isArray,F=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q={pending:!1,data:null,method:null,action:null},it=[],rt=-1;function O(e){return{current:e}}function et(e){0>rt||(e.current=it[rt],it[rt]=null,rt--)}function j(e,i){rt++,it[rt]=e.current,e.current=i}var J=O(null),bt=O(null),Dt=O(null),at=O(null);function pt(e,i){switch(j(Dt,i),j(bt,e),j(J,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?lv(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=lv(i),e=cv(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}et(J),j(J,e)}function Tt(){et(J),et(bt),et(Dt)}function It(e){e.memoizedState!==null&&j(at,e);var i=J.current,s=cv(i,e.type);i!==s&&(j(bt,e),j(J,s))}function At(e){bt.current===e&&(et(J),et(bt)),at.current===e&&(et(at),$o._currentValue=q)}var $t,Oe;function ne(e){if($t===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);$t=i&&i[1]||"",Oe=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+$t+e+Oe}var me=!1;function De(e,i){if(!e||me)return"";me=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var Mt=function(){throw Error()};if(Object.defineProperty(Mt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Mt,[])}catch(mt){var ht=mt}Reflect.construct(e,[],Mt)}else{try{Mt.call()}catch(mt){ht=mt}e.call(Mt.prototype)}}else{try{throw Error()}catch(mt){ht=mt}(Mt=e())&&typeof Mt.catch=="function"&&Mt.catch(function(){})}}catch(mt){if(mt&&ht&&typeof mt.stack=="string")return[mt.stack,ht.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var h=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");h&&h.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var m=l.DetermineComponentFrameRoot(),M=m[0],D=m[1];if(M&&D){var k=M.split(`
`),ut=D.split(`
`);for(h=l=0;l<k.length&&!k[l].includes("DetermineComponentFrameRoot");)l++;for(;h<ut.length&&!ut[h].includes("DetermineComponentFrameRoot");)h++;if(l===k.length||h===ut.length)for(l=k.length-1,h=ut.length-1;1<=l&&0<=h&&k[l]!==ut[h];)h--;for(;1<=l&&0<=h;l--,h--)if(k[l]!==ut[h]){if(l!==1||h!==1)do if(l--,h--,0>h||k[l]!==ut[h]){var St=`
`+k[l].replace(" at new "," at ");return e.displayName&&St.includes("<anonymous>")&&(St=St.replace("<anonymous>",e.displayName)),St}while(1<=l&&0<=h);break}}}finally{me=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?ne(s):""}function ue(e,i){switch(e.tag){case 26:case 27:case 5:return ne(e.type);case 16:return ne("Lazy");case 13:return e.child!==i&&i!==null?ne("Suspense Fallback"):ne("Suspense");case 19:return ne("SuspenseList");case 0:case 15:return De(e.type,!1);case 11:return De(e.type.render,!1);case 1:return De(e.type,!0);case 31:return ne("Activity");default:return""}}function He(e){try{var i="",s=null;do i+=ue(e,s),s=e,e=e.return;while(e);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var $e=Object.prototype.hasOwnProperty,fn=r.unstable_scheduleCallback,Re=r.unstable_cancelCallback,je=r.unstable_shouldYield,Q=r.unstable_requestPaint,Te=r.unstable_now,Ce=r.unstable_getCurrentPriorityLevel,z=r.unstable_ImmediatePriority,E=r.unstable_UserBlockingPriority,nt=r.unstable_NormalPriority,ft=r.unstable_LowPriority,gt=r.unstable_IdlePriority,Rt=r.log,Lt=r.unstable_setDisableYieldValue,vt=null,_t=null;function Ct(e){if(typeof Rt=="function"&&Lt(e),_t&&typeof _t.setStrictMode=="function")try{_t.setStrictMode(vt,e)}catch{}}var Bt=Math.clz32?Math.clz32:Wt,Ot=Math.log,Nt=Math.LN2;function Wt(e){return e>>>=0,e===0?32:31-(Ot(e)/Nt|0)|0}var jt=256,ae=262144,Y=4194304;function wt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function xt(e,i,s){var l=e.pendingLanes;if(l===0)return 0;var h=0,m=e.suspendedLanes,M=e.pingedLanes;e=e.warmLanes;var D=l&134217727;return D!==0?(l=D&~m,l!==0?h=wt(l):(M&=D,M!==0?h=wt(M):s||(s=D&~e,s!==0&&(h=wt(s))))):(D=l&~m,D!==0?h=wt(D):M!==0?h=wt(M):s||(s=l&~e,s!==0&&(h=wt(s)))),h===0?0:i!==0&&i!==h&&(i&m)===0&&(m=h&-h,s=i&-i,m>=s||m===32&&(s&4194048)!==0)?i:h}function Ut(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Ht(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Et(){var e=Y;return Y<<=1,(Y&62914560)===0&&(Y=4194304),e}function Qt(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function Yt(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function We(e,i,s,l,h,m){var M=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var D=e.entanglements,k=e.expirationTimes,ut=e.hiddenUpdates;for(s=M&~s;0<s;){var St=31-Bt(s),Mt=1<<St;D[St]=0,k[St]=-1;var ht=ut[St];if(ht!==null)for(ut[St]=null,St=0;St<ht.length;St++){var mt=ht[St];mt!==null&&(mt.lane&=-536870913)}s&=~Mt}l!==0&&Ue(e,l,0),m!==0&&h===0&&e.tag!==0&&(e.suspendedLanes|=m&~(M&~i))}function Ue(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-Bt(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|s&261930}function Zn(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var l=31-Bt(s),h=1<<l;h&i|e[l]&i&&(e[l]|=i),s&=~h}}function si(e,i){var s=i&-i;return s=(s&42)!==0?1:fo(s),(s&(e.suspendedLanes|i))!==0?0:s}function fo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ho(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function po(){var e=X.p;return e!==0?e:(e=window.event,e===void 0?32:Lv(e.type))}function tr(e,i){var s=X.p;try{return X.p=e,i()}finally{X.p=s}}var qi=Math.random().toString(36).slice(2),pn="__reactFiber$"+qi,Un="__reactProps$"+qi,Kn="__reactContainer$"+qi,Ss="__reactEvents$"+qi,Ol="__reactListeners$"+qi,Pl="__reactHandles$"+qi,ys="__reactResources$"+qi,Ia="__reactMarker$"+qi;function za(e){delete e[pn],delete e[Un],delete e[Ss],delete e[Ol],delete e[Pl]}function oa(e){var i=e[pn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Kn]||s[pn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=gv(e);e!==null;){if(s=e[pn])return s;e=gv(e)}return i}e=s,s=e.parentNode}return null}function la(e){if(e=e[pn]||e[Kn]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function Ms(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Fa(e){var i=e[ys];return i||(i=e[ys]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function mn(e){e[Ia]=!0}var Il=new Set,mo={};function R(e,i){Z(e,i),Z(e+"Capture",i)}function Z(e,i){for(mo[e]=i,e=0;e<i.length;e++)Il.add(i[e])}var dt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ot={},lt={};function zt(e){return $e.call(lt,e)?!0:$e.call(ot,e)?!1:dt.test(e)?lt[e]=!0:(ot[e]=!0,!1)}function kt(e,i,s){if(zt(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Pt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function Gt(e,i,s,l){if(l===null)e.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+l)}}function Vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function le(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function ge(e,i,s){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var h=l.get,m=l.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return h.call(this)},set:function(M){s=""+M,m.call(this,M)}}),Object.defineProperty(e,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(M){s=""+M},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Zt(e){if(!e._valueTracker){var i=le(e)?"checked":"value";e._valueTracker=ge(e,i,""+e[i])}}function Le(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return e&&(l=le(e)?e.checked?"true":"false":e.value),e=l,e!==s?(i.setValue(e),!0):!1}function tn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Je=/[\n"\\]/g;function he(e){return e.replace(Je,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function gn(e,i,s,l,h,m,M,D){e.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?e.type=M:e.removeAttribute("type"),i!=null?M==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Vt(i)):e.value!==""+Vt(i)&&(e.value=""+Vt(i)):M!=="submit"&&M!=="reset"||e.removeAttribute("value"),i!=null?bn(e,M,Vt(i)):s!=null?bn(e,M,Vt(s)):l!=null&&e.removeAttribute("value"),h==null&&m!=null&&(e.defaultChecked=!!m),h!=null&&(e.checked=h&&typeof h!="function"&&typeof h!="symbol"),D!=null&&typeof D!="function"&&typeof D!="symbol"&&typeof D!="boolean"?e.name=""+Vt(D):e.removeAttribute("name")}function Xt(e,i,s,l,h,m,M,D){if(m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.type=m),i!=null||s!=null){if(!(m!=="submit"&&m!=="reset"||i!=null)){Zt(e);return}s=s!=null?""+Vt(s):"",i=i!=null?""+Vt(i):s,D||i===e.value||(e.value=i),e.defaultValue=i}l=l??h,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=D?e.checked:!!l,e.defaultChecked=!!l,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(e.name=M),Zt(e)}function bn(e,i,s){i==="number"&&tn(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function de(e,i,s,l){if(e=e.options,i){i={};for(var h=0;h<s.length;h++)i["$"+s[h]]=!0;for(s=0;s<e.length;s++)h=i.hasOwnProperty("$"+e[s].value),e[s].selected!==h&&(e[s].selected=h),h&&l&&(e[s].defaultSelected=!0)}else{for(s=""+Vt(s),i=null,h=0;h<e.length;h++){if(e[h].value===s){e[h].selected=!0,l&&(e[h].defaultSelected=!0);return}i!==null||e[h].disabled||(i=e[h])}i!==null&&(i.selected=!0)}}function Gn(e,i,s){if(i!=null&&(i=""+Vt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Vt(s):""}function ri(e,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(tt(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Vt(i),e.defaultValue=s,l=e.textContent,l===s&&l!==""&&l!==null&&(e.value=l),Zt(e)}function Vn(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var Ba=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Fe(e,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,s):typeof s!="number"||s===0||Ba.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function sn(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var h in i)l=i[h],i.hasOwnProperty(h)&&s[h]!==l&&Fe(e,h,l)}else for(var m in i)i.hasOwnProperty(m)&&Fe(e,m,i[m])}function xi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qe=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Yi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ni(e){return Yi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Si(){}var Gu=null;function Vu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var er=null,nr=null;function om(e){var i=la(e);if(i&&(e=i.stateNode)){var s=e[Un]||null;t:switch(e=i.stateNode,i.type){case"input":if(gn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+he(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==e&&l.form===e.form){var h=l[Un]||null;if(!h)throw Error(a(90));gn(l,h.value,h.defaultValue,h.defaultValue,h.checked,h.defaultChecked,h.type,h.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===e.form&&Le(l)}break t;case"textarea":Gn(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&de(e,!!s.multiple,i,!1)}}}var ku=!1;function lm(e,i,s){if(ku)return e(i,s);ku=!0;try{var l=e(i);return l}finally{if(ku=!1,(er!==null||nr!==null)&&(bc(),er&&(i=er,e=nr,nr=er=null,om(i),e)))for(i=0;i<e.length;i++)om(e[i])}}function go(e,i){var s=e.stateNode;if(s===null)return null;var l=s[Un]||null;if(l===null)return null;s=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var ca=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xu=!1;if(ca)try{var vo={};Object.defineProperty(vo,"passive",{get:function(){Xu=!0}}),window.addEventListener("test",vo,vo),window.removeEventListener("test",vo,vo)}catch{Xu=!1}var Ha=null,Wu=null,zl=null;function cm(){if(zl)return zl;var e,i=Wu,s=i.length,l,h="value"in Ha?Ha.value:Ha.textContent,m=h.length;for(e=0;e<s&&i[e]===h[e];e++);var M=s-e;for(l=1;l<=M&&i[s-l]===h[m-l];l++);return zl=h.slice(e,1<l?1-l:void 0)}function Fl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Bl(){return!0}function um(){return!1}function Jn(e){function i(s,l,h,m,M){this._reactName=s,this._targetInst=h,this.type=l,this.nativeEvent=m,this.target=M,this.currentTarget=null;for(var D in e)e.hasOwnProperty(D)&&(s=e[D],this[D]=s?s(m):m[D]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Bl:um,this.isPropagationStopped=um,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Bl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Bl)},persist:function(){},isPersistent:Bl}),i}var bs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hl=Jn(bs),_o=_({},bs,{view:0,detail:0}),lS=Jn(_o),qu,Yu,xo,Gl=_({},_o,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ku,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xo&&(xo&&e.type==="mousemove"?(qu=e.screenX-xo.screenX,Yu=e.screenY-xo.screenY):Yu=qu=0,xo=e),qu)},movementY:function(e){return"movementY"in e?e.movementY:Yu}}),fm=Jn(Gl),cS=_({},Gl,{dataTransfer:0}),uS=Jn(cS),fS=_({},_o,{relatedTarget:0}),Zu=Jn(fS),hS=_({},bs,{animationName:0,elapsedTime:0,pseudoElement:0}),dS=Jn(hS),pS=_({},bs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),mS=Jn(pS),gS=_({},bs,{data:0}),hm=Jn(gS),vS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_S={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function SS(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=xS[e])?!!i[e]:!1}function Ku(){return SS}var yS=_({},_o,{key:function(e){if(e.key){var i=vS[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Fl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_S[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ku,charCode:function(e){return e.type==="keypress"?Fl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Fl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),MS=Jn(yS),bS=_({},Gl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),dm=Jn(bS),ES=_({},_o,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ku}),TS=Jn(ES),AS=_({},bs,{propertyName:0,elapsedTime:0,pseudoElement:0}),wS=Jn(AS),RS=_({},Gl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),CS=Jn(RS),DS=_({},bs,{newState:0,oldState:0}),US=Jn(DS),LS=[9,13,27,32],Ju=ca&&"CompositionEvent"in window,So=null;ca&&"documentMode"in document&&(So=document.documentMode);var NS=ca&&"TextEvent"in window&&!So,pm=ca&&(!Ju||So&&8<So&&11>=So),mm=" ",gm=!1;function vm(e,i){switch(e){case"keyup":return LS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _m(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ir=!1;function OS(e,i){switch(e){case"compositionend":return _m(i);case"keypress":return i.which!==32?null:(gm=!0,mm);case"textInput":return e=i.data,e===mm&&gm?null:e;default:return null}}function PS(e,i){if(ir)return e==="compositionend"||!Ju&&vm(e,i)?(e=cm(),zl=Wu=Ha=null,ir=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return pm&&i.locale!=="ko"?null:i.data;default:return null}}var IS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xm(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!IS[e.type]:i==="textarea"}function Sm(e,i,s,l){er?nr?nr.push(l):nr=[l]:er=l,i=Dc(i,"onChange"),0<i.length&&(s=new Hl("onChange","change",null,s,l),e.push({event:s,listeners:i}))}var yo=null,Mo=null;function zS(e){nv(e,0)}function Vl(e){var i=Ms(e);if(Le(i))return e}function ym(e,i){if(e==="change")return i}var Mm=!1;if(ca){var Qu;if(ca){var ju="oninput"in document;if(!ju){var bm=document.createElement("div");bm.setAttribute("oninput","return;"),ju=typeof bm.oninput=="function"}Qu=ju}else Qu=!1;Mm=Qu&&(!document.documentMode||9<document.documentMode)}function Em(){yo&&(yo.detachEvent("onpropertychange",Tm),Mo=yo=null)}function Tm(e){if(e.propertyName==="value"&&Vl(Mo)){var i=[];Sm(i,Mo,e,Vu(e)),lm(zS,i)}}function FS(e,i,s){e==="focusin"?(Em(),yo=i,Mo=s,yo.attachEvent("onpropertychange",Tm)):e==="focusout"&&Em()}function BS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Vl(Mo)}function HS(e,i){if(e==="click")return Vl(i)}function GS(e,i){if(e==="input"||e==="change")return Vl(i)}function VS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var oi=typeof Object.is=="function"?Object.is:VS;function bo(e,i){if(oi(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var h=s[l];if(!$e.call(i,h)||!oi(e[h],i[h]))return!1}return!0}function Am(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wm(e,i){var s=Am(e);e=0;for(var l;s;){if(s.nodeType===3){if(l=e+s.textContent.length,e<=i&&l>=i)return{node:s,offset:i-e};e=l}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=Am(s)}}function Rm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?Rm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Cm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=tn(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=tn(e.document)}return i}function $u(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var kS=ca&&"documentMode"in document&&11>=document.documentMode,ar=null,tf=null,Eo=null,ef=!1;function Dm(e,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;ef||ar==null||ar!==tn(l)||(l=ar,"selectionStart"in l&&$u(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Eo&&bo(Eo,l)||(Eo=l,l=Dc(tf,"onSelect"),0<l.length&&(i=new Hl("onSelect","select",null,i,s),e.push({event:i,listeners:l}),i.target=ar)))}function Es(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var sr={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionrun:Es("Transition","TransitionRun"),transitionstart:Es("Transition","TransitionStart"),transitioncancel:Es("Transition","TransitionCancel"),transitionend:Es("Transition","TransitionEnd")},nf={},Um={};ca&&(Um=document.createElement("div").style,"AnimationEvent"in window||(delete sr.animationend.animation,delete sr.animationiteration.animation,delete sr.animationstart.animation),"TransitionEvent"in window||delete sr.transitionend.transition);function Ts(e){if(nf[e])return nf[e];if(!sr[e])return e;var i=sr[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in Um)return nf[e]=i[s];return e}var Lm=Ts("animationend"),Nm=Ts("animationiteration"),Om=Ts("animationstart"),XS=Ts("transitionrun"),WS=Ts("transitionstart"),qS=Ts("transitioncancel"),Pm=Ts("transitionend"),Im=new Map,af="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");af.push("scrollEnd");function Oi(e,i){Im.set(e,i),R(i,[e])}var kl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},yi=[],rr=0,sf=0;function Xl(){for(var e=rr,i=sf=rr=0;i<e;){var s=yi[i];yi[i++]=null;var l=yi[i];yi[i++]=null;var h=yi[i];yi[i++]=null;var m=yi[i];if(yi[i++]=null,l!==null&&h!==null){var M=l.pending;M===null?h.next=h:(h.next=M.next,M.next=h),l.pending=h}m!==0&&zm(s,h,m)}}function Wl(e,i,s,l){yi[rr++]=e,yi[rr++]=i,yi[rr++]=s,yi[rr++]=l,sf|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function rf(e,i,s,l){return Wl(e,i,s,l),ql(e)}function As(e,i){return Wl(e,null,null,i),ql(e)}function zm(e,i,s){e.lanes|=s;var l=e.alternate;l!==null&&(l.lanes|=s);for(var h=!1,m=e.return;m!==null;)m.childLanes|=s,l=m.alternate,l!==null&&(l.childLanes|=s),m.tag===22&&(e=m.stateNode,e===null||e._visibility&1||(h=!0)),e=m,m=m.return;return e.tag===3?(m=e.stateNode,h&&i!==null&&(h=31-Bt(s),e=m.hiddenUpdates,l=e[h],l===null?e[h]=[i]:l.push(i),i.lane=s|536870912),m):null}function ql(e){if(50<qo)throw qo=0,mh=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var or={};function YS(e,i,s,l){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function li(e,i,s,l){return new YS(e,i,s,l)}function of(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ua(e,i){var s=e.alternate;return s===null?(s=li(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function Fm(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Yl(e,i,s,l,h,m){var M=0;if(l=e,typeof e=="function")of(e)&&(M=1);else if(typeof e=="string")M=jy(e,s,J.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case P:return e=li(31,s,i,h),e.elementType=P,e.lanes=m,e;case w:return ws(s.children,h,m,i);case y:M=8,h|=24;break;case S:return e=li(12,s,i,h|2),e.elementType=S,e.lanes=m,e;case U:return e=li(13,s,i,h),e.elementType=U,e.lanes=m,e;case N:return e=li(19,s,i,h),e.elementType=N,e.lanes=m,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case L:M=10;break t;case C:M=9;break t;case A:M=11;break t;case I:M=14;break t;case T:M=16,l=null;break t}M=29,s=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=li(M,s,i,h),i.elementType=e,i.type=l,i.lanes=m,i}function ws(e,i,s,l){return e=li(7,e,l,i),e.lanes=s,e}function lf(e,i,s){return e=li(6,e,null,i),e.lanes=s,e}function Bm(e){var i=li(18,null,null,0);return i.stateNode=e,i}function cf(e,i,s){return i=li(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var Hm=new WeakMap;function Mi(e,i){if(typeof e=="object"&&e!==null){var s=Hm.get(e);return s!==void 0?s:(i={value:e,source:i,stack:He(i)},Hm.set(e,i),i)}return{value:e,source:i,stack:He(i)}}var lr=[],cr=0,Zl=null,To=0,bi=[],Ei=0,Ga=null,Zi=1,Ki="";function fa(e,i){lr[cr++]=To,lr[cr++]=Zl,Zl=e,To=i}function Gm(e,i,s){bi[Ei++]=Zi,bi[Ei++]=Ki,bi[Ei++]=Ga,Ga=e;var l=Zi;e=Ki;var h=32-Bt(l)-1;l&=~(1<<h),s+=1;var m=32-Bt(i)+h;if(30<m){var M=h-h%5;m=(l&(1<<M)-1).toString(32),l>>=M,h-=M,Zi=1<<32-Bt(i)+h|s<<h|l,Ki=m+e}else Zi=1<<m|s<<h|l,Ki=e}function uf(e){e.return!==null&&(fa(e,1),Gm(e,1,0))}function ff(e){for(;e===Zl;)Zl=lr[--cr],lr[cr]=null,To=lr[--cr],lr[cr]=null;for(;e===Ga;)Ga=bi[--Ei],bi[Ei]=null,Ki=bi[--Ei],bi[Ei]=null,Zi=bi[--Ei],bi[Ei]=null}function Vm(e,i){bi[Ei++]=Zi,bi[Ei++]=Ki,bi[Ei++]=Ga,Zi=i.id,Ki=i.overflow,Ga=e}var Ln=null,en=null,Ae=!1,Va=null,Ti=!1,hf=Error(a(519));function ka(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ao(Mi(i,e)),hf}function km(e){var i=e.stateNode,s=e.type,l=e.memoizedProps;switch(i[pn]=e,i[Un]=l,s){case"dialog":xe("cancel",i),xe("close",i);break;case"iframe":case"object":case"embed":xe("load",i);break;case"video":case"audio":for(s=0;s<Zo.length;s++)xe(Zo[s],i);break;case"source":xe("error",i);break;case"img":case"image":case"link":xe("error",i),xe("load",i);break;case"details":xe("toggle",i);break;case"input":xe("invalid",i),Xt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":xe("invalid",i);break;case"textarea":xe("invalid",i),ri(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||rv(i.textContent,s)?(l.popover!=null&&(xe("beforetoggle",i),xe("toggle",i)),l.onScroll!=null&&xe("scroll",i),l.onScrollEnd!=null&&xe("scrollend",i),l.onClick!=null&&(i.onclick=Si),i=!0):i=!1,i||ka(e,!0)}function Xm(e){for(Ln=e.return;Ln;)switch(Ln.tag){case 5:case 31:case 13:Ti=!1;return;case 27:case 3:Ti=!0;return;default:Ln=Ln.return}}function ur(e){if(e!==Ln)return!1;if(!Ae)return Xm(e),Ae=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||Dh(e.type,e.memoizedProps)),s=!s),s&&en&&ka(e),Xm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));en=mv(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));en=mv(e)}else i===27?(i=en,is(e.type)?(e=Ph,Ph=null,en=e):en=i):en=Ln?wi(e.stateNode.nextSibling):null;return!0}function Rs(){en=Ln=null,Ae=!1}function df(){var e=Va;return e!==null&&(ti===null?ti=e:ti.push.apply(ti,e),Va=null),e}function Ao(e){Va===null?Va=[e]:Va.push(e)}var pf=O(null),Cs=null,ha=null;function Xa(e,i,s){j(pf,i._currentValue),i._currentValue=s}function da(e){e._currentValue=pf.current,et(pf)}function mf(e,i,s){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===s)break;e=e.return}}function gf(e,i,s,l){var h=e.child;for(h!==null&&(h.return=e);h!==null;){var m=h.dependencies;if(m!==null){var M=h.child;m=m.firstContext;t:for(;m!==null;){var D=m;m=h;for(var k=0;k<i.length;k++)if(D.context===i[k]){m.lanes|=s,D=m.alternate,D!==null&&(D.lanes|=s),mf(m.return,s,e),l||(M=null);break t}m=D.next}}else if(h.tag===18){if(M=h.return,M===null)throw Error(a(341));M.lanes|=s,m=M.alternate,m!==null&&(m.lanes|=s),mf(M,s,e),M=null}else M=h.child;if(M!==null)M.return=h;else for(M=h;M!==null;){if(M===e){M=null;break}if(h=M.sibling,h!==null){h.return=M.return,M=h;break}M=M.return}h=M}}function fr(e,i,s,l){e=null;for(var h=i,m=!1;h!==null;){if(!m){if((h.flags&524288)!==0)m=!0;else if((h.flags&262144)!==0)break}if(h.tag===10){var M=h.alternate;if(M===null)throw Error(a(387));if(M=M.memoizedProps,M!==null){var D=h.type;oi(h.pendingProps.value,M.value)||(e!==null?e.push(D):e=[D])}}else if(h===at.current){if(M=h.alternate,M===null)throw Error(a(387));M.memoizedState.memoizedState!==h.memoizedState.memoizedState&&(e!==null?e.push($o):e=[$o])}h=h.return}e!==null&&gf(i,e,s,l),i.flags|=262144}function Kl(e){for(e=e.firstContext;e!==null;){if(!oi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ds(e){Cs=e,ha=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Nn(e){return Wm(Cs,e)}function Jl(e,i){return Cs===null&&Ds(e),Wm(e,i)}function Wm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ha===null){if(e===null)throw Error(a(308));ha=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ha=ha.next=i;return s}var ZS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},KS=r.unstable_scheduleCallback,JS=r.unstable_NormalPriority,vn={$$typeof:L,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function vf(){return{controller:new ZS,data:new Map,refCount:0}}function wo(e){e.refCount--,e.refCount===0&&KS(JS,function(){e.controller.abort()})}var Ro=null,_f=0,hr=0,dr=null;function QS(e,i){if(Ro===null){var s=Ro=[];_f=0,hr=yh(),dr={status:"pending",value:void 0,then:function(l){s.push(l)}}}return _f++,i.then(qm,qm),i}function qm(){if(--_f===0&&Ro!==null){dr!==null&&(dr.status="fulfilled");var e=Ro;Ro=null,hr=0,dr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function jS(e,i){var s=[],l={status:"pending",value:null,reason:null,then:function(h){s.push(h)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var h=0;h<s.length;h++)(0,s[h])(i)},function(h){for(l.status="rejected",l.reason=h,h=0;h<s.length;h++)(0,s[h])(void 0)}),l}var Ym=F.S;F.S=function(e,i){Dg=Te(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&QS(e,i),Ym!==null&&Ym(e,i)};var Us=O(null);function xf(){var e=Us.current;return e!==null?e:Qe.pooledCache}function Ql(e,i){i===null?j(Us,Us.current):j(Us,i.pool)}function Zm(){var e=xf();return e===null?null:{parent:vn._currentValue,pool:e}}var pr=Error(a(460)),Sf=Error(a(474)),jl=Error(a(542)),$l={then:function(){}};function Km(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Jm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Si,Si),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,jm(e),e;default:if(typeof i.status=="string")i.then(Si,Si);else{if(e=Qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var h=i;h.status="fulfilled",h.value=l}},function(l){if(i.status==="pending"){var h=i;h.status="rejected",h.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,jm(e),e}throw Ns=i,pr}}function Ls(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Ns=s,pr):s}}var Ns=null;function Qm(){if(Ns===null)throw Error(a(459));var e=Ns;return Ns=null,e}function jm(e){if(e===pr||e===jl)throw Error(a(483))}var mr=null,Co=0;function tc(e){var i=Co;return Co+=1,mr===null&&(mr=[]),Jm(mr,e,i)}function Do(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function ec(e,i){throw i.$$typeof===g?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function $m(e){function i(st,K){if(e){var ct=st.deletions;ct===null?(st.deletions=[K],st.flags|=16):ct.push(K)}}function s(st,K){if(!e)return null;for(;K!==null;)i(st,K),K=K.sibling;return null}function l(st){for(var K=new Map;st!==null;)st.key!==null?K.set(st.key,st):K.set(st.index,st),st=st.sibling;return K}function h(st,K){return st=ua(st,K),st.index=0,st.sibling=null,st}function m(st,K,ct){return st.index=ct,e?(ct=st.alternate,ct!==null?(ct=ct.index,ct<K?(st.flags|=67108866,K):ct):(st.flags|=67108866,K)):(st.flags|=1048576,K)}function M(st){return e&&st.alternate===null&&(st.flags|=67108866),st}function D(st,K,ct,yt){return K===null||K.tag!==6?(K=lf(ct,st.mode,yt),K.return=st,K):(K=h(K,ct),K.return=st,K)}function k(st,K,ct,yt){var te=ct.type;return te===w?St(st,K,ct.props.children,yt,ct.key):K!==null&&(K.elementType===te||typeof te=="object"&&te!==null&&te.$$typeof===T&&Ls(te)===K.type)?(K=h(K,ct.props),Do(K,ct),K.return=st,K):(K=Yl(ct.type,ct.key,ct.props,null,st.mode,yt),Do(K,ct),K.return=st,K)}function ut(st,K,ct,yt){return K===null||K.tag!==4||K.stateNode.containerInfo!==ct.containerInfo||K.stateNode.implementation!==ct.implementation?(K=cf(ct,st.mode,yt),K.return=st,K):(K=h(K,ct.children||[]),K.return=st,K)}function St(st,K,ct,yt,te){return K===null||K.tag!==7?(K=ws(ct,st.mode,yt,te),K.return=st,K):(K=h(K,ct),K.return=st,K)}function Mt(st,K,ct){if(typeof K=="string"&&K!==""||typeof K=="number"||typeof K=="bigint")return K=lf(""+K,st.mode,ct),K.return=st,K;if(typeof K=="object"&&K!==null){switch(K.$$typeof){case x:return ct=Yl(K.type,K.key,K.props,null,st.mode,ct),Do(ct,K),ct.return=st,ct;case b:return K=cf(K,st.mode,ct),K.return=st,K;case T:return K=Ls(K),Mt(st,K,ct)}if(tt(K)||G(K))return K=ws(K,st.mode,ct,null),K.return=st,K;if(typeof K.then=="function")return Mt(st,tc(K),ct);if(K.$$typeof===L)return Mt(st,Jl(st,K),ct);ec(st,K)}return null}function ht(st,K,ct,yt){var te=K!==null?K.key:null;if(typeof ct=="string"&&ct!==""||typeof ct=="number"||typeof ct=="bigint")return te!==null?null:D(st,K,""+ct,yt);if(typeof ct=="object"&&ct!==null){switch(ct.$$typeof){case x:return ct.key===te?k(st,K,ct,yt):null;case b:return ct.key===te?ut(st,K,ct,yt):null;case T:return ct=Ls(ct),ht(st,K,ct,yt)}if(tt(ct)||G(ct))return te!==null?null:St(st,K,ct,yt,null);if(typeof ct.then=="function")return ht(st,K,tc(ct),yt);if(ct.$$typeof===L)return ht(st,K,Jl(st,ct),yt);ec(st,ct)}return null}function mt(st,K,ct,yt,te){if(typeof yt=="string"&&yt!==""||typeof yt=="number"||typeof yt=="bigint")return st=st.get(ct)||null,D(K,st,""+yt,te);if(typeof yt=="object"&&yt!==null){switch(yt.$$typeof){case x:return st=st.get(yt.key===null?ct:yt.key)||null,k(K,st,yt,te);case b:return st=st.get(yt.key===null?ct:yt.key)||null,ut(K,st,yt,te);case T:return yt=Ls(yt),mt(st,K,ct,yt,te)}if(tt(yt)||G(yt))return st=st.get(ct)||null,St(K,st,yt,te,null);if(typeof yt.then=="function")return mt(st,K,ct,tc(yt),te);if(yt.$$typeof===L)return mt(st,K,ct,Jl(K,yt),te);ec(K,yt)}return null}function Kt(st,K,ct,yt){for(var te=null,Pe=null,Jt=K,fe=K=0,Me=null;Jt!==null&&fe<ct.length;fe++){Jt.index>fe?(Me=Jt,Jt=null):Me=Jt.sibling;var Ie=ht(st,Jt,ct[fe],yt);if(Ie===null){Jt===null&&(Jt=Me);break}e&&Jt&&Ie.alternate===null&&i(st,Jt),K=m(Ie,K,fe),Pe===null?te=Ie:Pe.sibling=Ie,Pe=Ie,Jt=Me}if(fe===ct.length)return s(st,Jt),Ae&&fa(st,fe),te;if(Jt===null){for(;fe<ct.length;fe++)Jt=Mt(st,ct[fe],yt),Jt!==null&&(K=m(Jt,K,fe),Pe===null?te=Jt:Pe.sibling=Jt,Pe=Jt);return Ae&&fa(st,fe),te}for(Jt=l(Jt);fe<ct.length;fe++)Me=mt(Jt,st,fe,ct[fe],yt),Me!==null&&(e&&Me.alternate!==null&&Jt.delete(Me.key===null?fe:Me.key),K=m(Me,K,fe),Pe===null?te=Me:Pe.sibling=Me,Pe=Me);return e&&Jt.forEach(function(ls){return i(st,ls)}),Ae&&fa(st,fe),te}function ie(st,K,ct,yt){if(ct==null)throw Error(a(151));for(var te=null,Pe=null,Jt=K,fe=K=0,Me=null,Ie=ct.next();Jt!==null&&!Ie.done;fe++,Ie=ct.next()){Jt.index>fe?(Me=Jt,Jt=null):Me=Jt.sibling;var ls=ht(st,Jt,Ie.value,yt);if(ls===null){Jt===null&&(Jt=Me);break}e&&Jt&&ls.alternate===null&&i(st,Jt),K=m(ls,K,fe),Pe===null?te=ls:Pe.sibling=ls,Pe=ls,Jt=Me}if(Ie.done)return s(st,Jt),Ae&&fa(st,fe),te;if(Jt===null){for(;!Ie.done;fe++,Ie=ct.next())Ie=Mt(st,Ie.value,yt),Ie!==null&&(K=m(Ie,K,fe),Pe===null?te=Ie:Pe.sibling=Ie,Pe=Ie);return Ae&&fa(st,fe),te}for(Jt=l(Jt);!Ie.done;fe++,Ie=ct.next())Ie=mt(Jt,st,fe,Ie.value,yt),Ie!==null&&(e&&Ie.alternate!==null&&Jt.delete(Ie.key===null?fe:Ie.key),K=m(Ie,K,fe),Pe===null?te=Ie:Pe.sibling=Ie,Pe=Ie);return e&&Jt.forEach(function(cM){return i(st,cM)}),Ae&&fa(st,fe),te}function Ke(st,K,ct,yt){if(typeof ct=="object"&&ct!==null&&ct.type===w&&ct.key===null&&(ct=ct.props.children),typeof ct=="object"&&ct!==null){switch(ct.$$typeof){case x:t:{for(var te=ct.key;K!==null;){if(K.key===te){if(te=ct.type,te===w){if(K.tag===7){s(st,K.sibling),yt=h(K,ct.props.children),yt.return=st,st=yt;break t}}else if(K.elementType===te||typeof te=="object"&&te!==null&&te.$$typeof===T&&Ls(te)===K.type){s(st,K.sibling),yt=h(K,ct.props),Do(yt,ct),yt.return=st,st=yt;break t}s(st,K);break}else i(st,K);K=K.sibling}ct.type===w?(yt=ws(ct.props.children,st.mode,yt,ct.key),yt.return=st,st=yt):(yt=Yl(ct.type,ct.key,ct.props,null,st.mode,yt),Do(yt,ct),yt.return=st,st=yt)}return M(st);case b:t:{for(te=ct.key;K!==null;){if(K.key===te)if(K.tag===4&&K.stateNode.containerInfo===ct.containerInfo&&K.stateNode.implementation===ct.implementation){s(st,K.sibling),yt=h(K,ct.children||[]),yt.return=st,st=yt;break t}else{s(st,K);break}else i(st,K);K=K.sibling}yt=cf(ct,st.mode,yt),yt.return=st,st=yt}return M(st);case T:return ct=Ls(ct),Ke(st,K,ct,yt)}if(tt(ct))return Kt(st,K,ct,yt);if(G(ct)){if(te=G(ct),typeof te!="function")throw Error(a(150));return ct=te.call(ct),ie(st,K,ct,yt)}if(typeof ct.then=="function")return Ke(st,K,tc(ct),yt);if(ct.$$typeof===L)return Ke(st,K,Jl(st,ct),yt);ec(st,ct)}return typeof ct=="string"&&ct!==""||typeof ct=="number"||typeof ct=="bigint"?(ct=""+ct,K!==null&&K.tag===6?(s(st,K.sibling),yt=h(K,ct),yt.return=st,st=yt):(s(st,K),yt=lf(ct,st.mode,yt),yt.return=st,st=yt),M(st)):s(st,K)}return function(st,K,ct,yt){try{Co=0;var te=Ke(st,K,ct,yt);return mr=null,te}catch(Jt){if(Jt===pr||Jt===jl)throw Jt;var Pe=li(29,Jt,null,st.mode);return Pe.lanes=yt,Pe.return=st,Pe}finally{}}}var Os=$m(!0),t0=$m(!1),Wa=!1;function yf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Mf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function qa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ya(e,i,s){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(Be&2)!==0){var h=l.pending;return h===null?i.next=i:(i.next=h.next,h.next=i),l.pending=i,i=ql(e),zm(e,null,s),i}return Wl(e,l,i,s),ql(e)}function Uo(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,Zn(e,s)}}function bf(e,i){var s=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var h=null,m=null;if(s=s.firstBaseUpdate,s!==null){do{var M={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};m===null?h=m=M:m=m.next=M,s=s.next}while(s!==null);m===null?h=m=i:m=m.next=i}else h=m=i;s={baseState:l.baseState,firstBaseUpdate:h,lastBaseUpdate:m,shared:l.shared,callbacks:l.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var Ef=!1;function Lo(){if(Ef){var e=dr;if(e!==null)throw e}}function No(e,i,s,l){Ef=!1;var h=e.updateQueue;Wa=!1;var m=h.firstBaseUpdate,M=h.lastBaseUpdate,D=h.shared.pending;if(D!==null){h.shared.pending=null;var k=D,ut=k.next;k.next=null,M===null?m=ut:M.next=ut,M=k;var St=e.alternate;St!==null&&(St=St.updateQueue,D=St.lastBaseUpdate,D!==M&&(D===null?St.firstBaseUpdate=ut:D.next=ut,St.lastBaseUpdate=k))}if(m!==null){var Mt=h.baseState;M=0,St=ut=k=null,D=m;do{var ht=D.lane&-536870913,mt=ht!==D.lane;if(mt?(ye&ht)===ht:(l&ht)===ht){ht!==0&&ht===hr&&(Ef=!0),St!==null&&(St=St.next={lane:0,tag:D.tag,payload:D.payload,callback:null,next:null});t:{var Kt=e,ie=D;ht=i;var Ke=s;switch(ie.tag){case 1:if(Kt=ie.payload,typeof Kt=="function"){Mt=Kt.call(Ke,Mt,ht);break t}Mt=Kt;break t;case 3:Kt.flags=Kt.flags&-65537|128;case 0:if(Kt=ie.payload,ht=typeof Kt=="function"?Kt.call(Ke,Mt,ht):Kt,ht==null)break t;Mt=_({},Mt,ht);break t;case 2:Wa=!0}}ht=D.callback,ht!==null&&(e.flags|=64,mt&&(e.flags|=8192),mt=h.callbacks,mt===null?h.callbacks=[ht]:mt.push(ht))}else mt={lane:ht,tag:D.tag,payload:D.payload,callback:D.callback,next:null},St===null?(ut=St=mt,k=Mt):St=St.next=mt,M|=ht;if(D=D.next,D===null){if(D=h.shared.pending,D===null)break;mt=D,D=mt.next,mt.next=null,h.lastBaseUpdate=mt,h.shared.pending=null}}while(!0);St===null&&(k=Mt),h.baseState=k,h.firstBaseUpdate=ut,h.lastBaseUpdate=St,m===null&&(h.shared.lanes=0),ja|=M,e.lanes=M,e.memoizedState=Mt}}function e0(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function n0(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)e0(s[e],i)}var gr=O(null),nc=O(0);function i0(e,i){e=Ma,j(nc,e),j(gr,i),Ma=e|i.baseLanes}function Tf(){j(nc,Ma),j(gr,gr.current)}function Af(){Ma=nc.current,et(gr),et(nc)}var ci=O(null),Ai=null;function Za(e){var i=e.alternate;j(hn,hn.current&1),j(ci,e),Ai===null&&(i===null||gr.current!==null||i.memoizedState!==null)&&(Ai=e)}function wf(e){j(hn,hn.current),j(ci,e),Ai===null&&(Ai=e)}function a0(e){e.tag===22?(j(hn,hn.current),j(ci,e),Ai===null&&(Ai=e)):Ka()}function Ka(){j(hn,hn.current),j(ci,ci.current)}function ui(e){et(ci),Ai===e&&(Ai=null),et(hn)}var hn=O(0);function ic(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||Nh(s)||Oh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var pa=0,ce=null,Ye=null,_n=null,ac=!1,vr=!1,Ps=!1,sc=0,Oo=0,_r=null,$S=0;function ln(){throw Error(a(321))}function Rf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!oi(e[s],i[s]))return!1;return!0}function Cf(e,i,s,l,h,m){return pa=m,ce=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,F.H=e===null||e.memoizedState===null?G0:Xf,Ps=!1,m=s(l,h),Ps=!1,vr&&(m=r0(i,s,l,h)),s0(e),m}function s0(e){F.H=zo;var i=Ye!==null&&Ye.next!==null;if(pa=0,_n=Ye=ce=null,ac=!1,Oo=0,_r=null,i)throw Error(a(300));e===null||xn||(e=e.dependencies,e!==null&&Kl(e)&&(xn=!0))}function r0(e,i,s,l){ce=e;var h=0;do{if(vr&&(_r=null),Oo=0,vr=!1,25<=h)throw Error(a(301));if(h+=1,_n=Ye=null,e.updateQueue!=null){var m=e.updateQueue;m.lastEffect=null,m.events=null,m.stores=null,m.memoCache!=null&&(m.memoCache.index=0)}F.H=V0,m=i(s,l)}while(vr);return m}function ty(){var e=F.H,i=e.useState()[0];return i=typeof i.then=="function"?Po(i):i,e=e.useState()[0],(Ye!==null?Ye.memoizedState:null)!==e&&(ce.flags|=1024),i}function Df(){var e=sc!==0;return sc=0,e}function Uf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function Lf(e){if(ac){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}ac=!1}pa=0,_n=Ye=ce=null,vr=!1,Oo=sc=0,_r=null}function kn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _n===null?ce.memoizedState=_n=e:_n=_n.next=e,_n}function dn(){if(Ye===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Ye.next;var i=_n===null?ce.memoizedState:_n.next;if(i!==null)_n=i,Ye=e;else{if(e===null)throw ce.alternate===null?Error(a(467)):Error(a(310));Ye=e,e={memoizedState:Ye.memoizedState,baseState:Ye.baseState,baseQueue:Ye.baseQueue,queue:Ye.queue,next:null},_n===null?ce.memoizedState=_n=e:_n=_n.next=e}return _n}function rc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Po(e){var i=Oo;return Oo+=1,_r===null&&(_r=[]),e=Jm(_r,e,i),i=ce,(_n===null?i.memoizedState:_n.next)===null&&(i=i.alternate,F.H=i===null||i.memoizedState===null?G0:Xf),e}function oc(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Po(e);if(e.$$typeof===L)return Nn(e)}throw Error(a(438,String(e)))}function Nf(e){var i=null,s=ce.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=ce.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(h){return h.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=rc(),ce.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),l=0;l<e;l++)s[l]=B;return i.index++,s}function ma(e,i){return typeof i=="function"?i(e):i}function lc(e){var i=dn();return Of(i,Ye,e)}function Of(e,i,s){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var h=e.baseQueue,m=l.pending;if(m!==null){if(h!==null){var M=h.next;h.next=m.next,m.next=M}i.baseQueue=h=m,l.pending=null}if(m=e.baseState,h===null)e.memoizedState=m;else{i=h.next;var D=M=null,k=null,ut=i,St=!1;do{var Mt=ut.lane&-536870913;if(Mt!==ut.lane?(ye&Mt)===Mt:(pa&Mt)===Mt){var ht=ut.revertLane;if(ht===0)k!==null&&(k=k.next={lane:0,revertLane:0,gesture:null,action:ut.action,hasEagerState:ut.hasEagerState,eagerState:ut.eagerState,next:null}),Mt===hr&&(St=!0);else if((pa&ht)===ht){ut=ut.next,ht===hr&&(St=!0);continue}else Mt={lane:0,revertLane:ut.revertLane,gesture:null,action:ut.action,hasEagerState:ut.hasEagerState,eagerState:ut.eagerState,next:null},k===null?(D=k=Mt,M=m):k=k.next=Mt,ce.lanes|=ht,ja|=ht;Mt=ut.action,Ps&&s(m,Mt),m=ut.hasEagerState?ut.eagerState:s(m,Mt)}else ht={lane:Mt,revertLane:ut.revertLane,gesture:ut.gesture,action:ut.action,hasEagerState:ut.hasEagerState,eagerState:ut.eagerState,next:null},k===null?(D=k=ht,M=m):k=k.next=ht,ce.lanes|=Mt,ja|=Mt;ut=ut.next}while(ut!==null&&ut!==i);if(k===null?M=m:k.next=D,!oi(m,e.memoizedState)&&(xn=!0,St&&(s=dr,s!==null)))throw s;e.memoizedState=m,e.baseState=M,e.baseQueue=k,l.lastRenderedState=m}return h===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Pf(e){var i=dn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var l=s.dispatch,h=s.pending,m=i.memoizedState;if(h!==null){s.pending=null;var M=h=h.next;do m=e(m,M.action),M=M.next;while(M!==h);oi(m,i.memoizedState)||(xn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),s.lastRenderedState=m}return[m,l]}function o0(e,i,s){var l=ce,h=dn(),m=Ae;if(m){if(s===void 0)throw Error(a(407));s=s()}else s=i();var M=!oi((Ye||h).memoizedState,s);if(M&&(h.memoizedState=s,xn=!0),h=h.queue,Ff(u0.bind(null,l,h,e),[e]),h.getSnapshot!==i||M||_n!==null&&_n.memoizedState.tag&1){if(l.flags|=2048,xr(9,{destroy:void 0},c0.bind(null,l,h,s,i),null),Qe===null)throw Error(a(349));m||(pa&127)!==0||l0(l,i,s)}return s}function l0(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=ce.updateQueue,i===null?(i=rc(),ce.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function c0(e,i,s,l){i.value=s,i.getSnapshot=l,f0(i)&&h0(e)}function u0(e,i,s){return s(function(){f0(i)&&h0(e)})}function f0(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!oi(e,s)}catch{return!0}}function h0(e){var i=As(e,2);i!==null&&ei(i,e,2)}function If(e){var i=kn();if(typeof e=="function"){var s=e;if(e=s(),Ps){Ct(!0);try{s()}finally{Ct(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:e},i}function d0(e,i,s,l){return e.baseState=s,Of(e,Ye,typeof l=="function"?l:ma)}function ey(e,i,s,l,h){if(fc(e))throw Error(a(485));if(e=i.action,e!==null){var m={payload:h,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){m.listeners.push(M)}};F.T!==null?s(!0):m.isTransition=!1,l(m),s=i.pending,s===null?(m.next=i.pending=m,p0(i,m)):(m.next=s.next,i.pending=s.next=m)}}function p0(e,i){var s=i.action,l=i.payload,h=e.state;if(i.isTransition){var m=F.T,M={};F.T=M;try{var D=s(h,l),k=F.S;k!==null&&k(M,D),m0(e,i,D)}catch(ut){zf(e,i,ut)}finally{m!==null&&M.types!==null&&(m.types=M.types),F.T=m}}else try{m=s(h,l),m0(e,i,m)}catch(ut){zf(e,i,ut)}}function m0(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){g0(e,i,l)},function(l){return zf(e,i,l)}):g0(e,i,s)}function g0(e,i,s){i.status="fulfilled",i.value=s,v0(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,p0(e,s)))}function zf(e,i,s){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,v0(i),i=i.next;while(i!==l)}e.action=null}function v0(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function _0(e,i){return i}function x0(e,i){if(Ae){var s=Qe.formState;if(s!==null){t:{var l=ce;if(Ae){if(en){e:{for(var h=en,m=Ti;h.nodeType!==8;){if(!m){h=null;break e}if(h=wi(h.nextSibling),h===null){h=null;break e}}m=h.data,h=m==="F!"||m==="F"?h:null}if(h){en=wi(h.nextSibling),l=h.data==="F!";break t}}ka(l)}l=!1}l&&(i=s[0])}}return s=kn(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_0,lastRenderedState:i},s.queue=l,s=F0.bind(null,ce,l),l.dispatch=s,l=If(!1),m=kf.bind(null,ce,!1,l.queue),l=kn(),h={state:i,dispatch:null,action:e,pending:null},l.queue=h,s=ey.bind(null,ce,h,m,s),h.dispatch=s,l.memoizedState=e,[i,s,!1]}function S0(e){var i=dn();return y0(i,Ye,e)}function y0(e,i,s){if(i=Of(e,i,_0)[0],e=lc(ma)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=Po(i)}catch(M){throw M===pr?jl:M}else l=i;i=dn();var h=i.queue,m=h.dispatch;return s!==i.memoizedState&&(ce.flags|=2048,xr(9,{destroy:void 0},ny.bind(null,h,s),null)),[l,m,e]}function ny(e,i){e.action=i}function M0(e){var i=dn(),s=Ye;if(s!==null)return y0(i,s,e);dn(),i=i.memoizedState,s=dn();var l=s.queue.dispatch;return s.memoizedState=e,[i,l,!1]}function xr(e,i,s,l){return e={tag:e,create:s,deps:l,inst:i,next:null},i=ce.updateQueue,i===null&&(i=rc(),ce.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(l=s.next,s.next=e,e.next=l,i.lastEffect=e),e}function b0(){return dn().memoizedState}function cc(e,i,s,l){var h=kn();ce.flags|=e,h.memoizedState=xr(1|i,{destroy:void 0},s,l===void 0?null:l)}function uc(e,i,s,l){var h=dn();l=l===void 0?null:l;var m=h.memoizedState.inst;Ye!==null&&l!==null&&Rf(l,Ye.memoizedState.deps)?h.memoizedState=xr(i,m,s,l):(ce.flags|=e,h.memoizedState=xr(1|i,m,s,l))}function E0(e,i){cc(8390656,8,e,i)}function Ff(e,i){uc(2048,8,e,i)}function iy(e){ce.flags|=4;var i=ce.updateQueue;if(i===null)i=rc(),ce.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function T0(e){var i=dn().memoizedState;return iy({ref:i,nextImpl:e}),function(){if((Be&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function A0(e,i){return uc(4,2,e,i)}function w0(e,i){return uc(4,4,e,i)}function R0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function C0(e,i,s){s=s!=null?s.concat([e]):null,uc(4,4,R0.bind(null,i,e),s)}function Bf(){}function D0(e,i){var s=dn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&Rf(i,l[1])?l[0]:(s.memoizedState=[e,i],e)}function U0(e,i){var s=dn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&Rf(i,l[1]))return l[0];if(l=e(),Ps){Ct(!0);try{e()}finally{Ct(!1)}}return s.memoizedState=[l,i],l}function Hf(e,i,s){return s===void 0||(pa&1073741824)!==0&&(ye&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=Lg(),ce.lanes|=e,ja|=e,s)}function L0(e,i,s,l){return oi(s,i)?s:gr.current!==null?(e=Hf(e,s,l),oi(e,i)||(xn=!0),e):(pa&42)===0||(pa&1073741824)!==0&&(ye&261930)===0?(xn=!0,e.memoizedState=s):(e=Lg(),ce.lanes|=e,ja|=e,i)}function N0(e,i,s,l,h){var m=X.p;X.p=m!==0&&8>m?m:8;var M=F.T,D={};F.T=D,kf(e,!1,i,s);try{var k=h(),ut=F.S;if(ut!==null&&ut(D,k),k!==null&&typeof k=="object"&&typeof k.then=="function"){var St=jS(k,l);Io(e,i,St,di(e))}else Io(e,i,l,di(e))}catch(Mt){Io(e,i,{then:function(){},status:"rejected",reason:Mt},di())}finally{X.p=m,M!==null&&D.types!==null&&(M.types=D.types),F.T=M}}function ay(){}function Gf(e,i,s,l){if(e.tag!==5)throw Error(a(476));var h=O0(e).queue;N0(e,h,i,q,s===null?ay:function(){return P0(e),s(l)})}function O0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:q,baseState:q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:q},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function P0(e){var i=O0(e);i.next===null&&(i=e.alternate.memoizedState),Io(e,i.next.queue,{},di())}function Vf(){return Nn($o)}function I0(){return dn().memoizedState}function z0(){return dn().memoizedState}function sy(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=di();e=qa(s);var l=Ya(i,e,s);l!==null&&(ei(l,i,s),Uo(l,i,s)),i={cache:vf()},e.payload=i;return}i=i.return}}function ry(e,i,s){var l=di();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},fc(e)?B0(i,s):(s=rf(e,i,s,l),s!==null&&(ei(s,e,l),H0(s,i,l)))}function F0(e,i,s){var l=di();Io(e,i,s,l)}function Io(e,i,s,l){var h={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(fc(e))B0(i,h);else{var m=e.alternate;if(e.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var M=i.lastRenderedState,D=m(M,s);if(h.hasEagerState=!0,h.eagerState=D,oi(D,M))return Wl(e,i,h,0),Qe===null&&Xl(),!1}catch{}finally{}if(s=rf(e,i,h,l),s!==null)return ei(s,e,l),H0(s,i,l),!0}return!1}function kf(e,i,s,l){if(l={lane:2,revertLane:yh(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},fc(e)){if(i)throw Error(a(479))}else i=rf(e,s,l,2),i!==null&&ei(i,e,2)}function fc(e){var i=e.alternate;return e===ce||i!==null&&i===ce}function B0(e,i){vr=ac=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function H0(e,i,s){if((s&4194048)!==0){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,Zn(e,s)}}var zo={readContext:Nn,use:oc,useCallback:ln,useContext:ln,useEffect:ln,useImperativeHandle:ln,useLayoutEffect:ln,useInsertionEffect:ln,useMemo:ln,useReducer:ln,useRef:ln,useState:ln,useDebugValue:ln,useDeferredValue:ln,useTransition:ln,useSyncExternalStore:ln,useId:ln,useHostTransitionStatus:ln,useFormState:ln,useActionState:ln,useOptimistic:ln,useMemoCache:ln,useCacheRefresh:ln};zo.useEffectEvent=ln;var G0={readContext:Nn,use:oc,useCallback:function(e,i){return kn().memoizedState=[e,i===void 0?null:i],e},useContext:Nn,useEffect:E0,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,cc(4194308,4,R0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return cc(4194308,4,e,i)},useInsertionEffect:function(e,i){cc(4,2,e,i)},useMemo:function(e,i){var s=kn();i=i===void 0?null:i;var l=e();if(Ps){Ct(!0);try{e()}finally{Ct(!1)}}return s.memoizedState=[l,i],l},useReducer:function(e,i,s){var l=kn();if(s!==void 0){var h=s(i);if(Ps){Ct(!0);try{s(i)}finally{Ct(!1)}}}else h=i;return l.memoizedState=l.baseState=h,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:h},l.queue=e,e=e.dispatch=ry.bind(null,ce,e),[l.memoizedState,e]},useRef:function(e){var i=kn();return e={current:e},i.memoizedState=e},useState:function(e){e=If(e);var i=e.queue,s=F0.bind(null,ce,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:Bf,useDeferredValue:function(e,i){var s=kn();return Hf(s,e,i)},useTransition:function(){var e=If(!1);return e=N0.bind(null,ce,e.queue,!0,!1),kn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var l=ce,h=kn();if(Ae){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Qe===null)throw Error(a(349));(ye&127)!==0||l0(l,i,s)}h.memoizedState=s;var m={value:s,getSnapshot:i};return h.queue=m,E0(u0.bind(null,l,m,e),[e]),l.flags|=2048,xr(9,{destroy:void 0},c0.bind(null,l,m,s,i),null),s},useId:function(){var e=kn(),i=Qe.identifierPrefix;if(Ae){var s=Ki,l=Zi;s=(l&~(1<<32-Bt(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=sc++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=$S++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Vf,useFormState:x0,useActionState:x0,useOptimistic:function(e){var i=kn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=kf.bind(null,ce,!0,s),s.dispatch=i,[e,i]},useMemoCache:Nf,useCacheRefresh:function(){return kn().memoizedState=sy.bind(null,ce)},useEffectEvent:function(e){var i=kn(),s={impl:e};return i.memoizedState=s,function(){if((Be&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Xf={readContext:Nn,use:oc,useCallback:D0,useContext:Nn,useEffect:Ff,useImperativeHandle:C0,useInsertionEffect:A0,useLayoutEffect:w0,useMemo:U0,useReducer:lc,useRef:b0,useState:function(){return lc(ma)},useDebugValue:Bf,useDeferredValue:function(e,i){var s=dn();return L0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=lc(ma)[0],i=dn().memoizedState;return[typeof e=="boolean"?e:Po(e),i]},useSyncExternalStore:o0,useId:I0,useHostTransitionStatus:Vf,useFormState:S0,useActionState:S0,useOptimistic:function(e,i){var s=dn();return d0(s,Ye,e,i)},useMemoCache:Nf,useCacheRefresh:z0};Xf.useEffectEvent=T0;var V0={readContext:Nn,use:oc,useCallback:D0,useContext:Nn,useEffect:Ff,useImperativeHandle:C0,useInsertionEffect:A0,useLayoutEffect:w0,useMemo:U0,useReducer:Pf,useRef:b0,useState:function(){return Pf(ma)},useDebugValue:Bf,useDeferredValue:function(e,i){var s=dn();return Ye===null?Hf(s,e,i):L0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=Pf(ma)[0],i=dn().memoizedState;return[typeof e=="boolean"?e:Po(e),i]},useSyncExternalStore:o0,useId:I0,useHostTransitionStatus:Vf,useFormState:M0,useActionState:M0,useOptimistic:function(e,i){var s=dn();return Ye!==null?d0(s,Ye,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:Nf,useCacheRefresh:z0};V0.useEffectEvent=T0;function Wf(e,i,s,l){i=e.memoizedState,s=s(l,i),s=s==null?i:_({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var qf={enqueueSetState:function(e,i,s){e=e._reactInternals;var l=di(),h=qa(l);h.payload=i,s!=null&&(h.callback=s),i=Ya(e,h,l),i!==null&&(ei(i,e,l),Uo(i,e,l))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var l=di(),h=qa(l);h.tag=1,h.payload=i,s!=null&&(h.callback=s),i=Ya(e,h,l),i!==null&&(ei(i,e,l),Uo(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=di(),l=qa(s);l.tag=2,i!=null&&(l.callback=i),i=Ya(e,l,s),i!==null&&(ei(i,e,s),Uo(i,e,s))}};function k0(e,i,s,l,h,m,M){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,m,M):i.prototype&&i.prototype.isPureReactComponent?!bo(s,l)||!bo(h,m):!0}function X0(e,i,s,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==e&&qf.enqueueReplaceState(i,i.state,null)}function Is(e,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(e=e.defaultProps){s===i&&(s=_({},s));for(var h in e)s[h]===void 0&&(s[h]=e[h])}return s}function W0(e){kl(e)}function q0(e){console.error(e)}function Y0(e){kl(e)}function hc(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function Z0(e,i,s){try{var l=e.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(h){setTimeout(function(){throw h})}}function Yf(e,i,s){return s=qa(s),s.tag=3,s.payload={element:null},s.callback=function(){hc(e,i)},s}function K0(e){return e=qa(e),e.tag=3,e}function J0(e,i,s,l){var h=s.type.getDerivedStateFromError;if(typeof h=="function"){var m=l.value;e.payload=function(){return h(m)},e.callback=function(){Z0(i,s,l)}}var M=s.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(e.callback=function(){Z0(i,s,l),typeof h!="function"&&($a===null?$a=new Set([this]):$a.add(this));var D=l.stack;this.componentDidCatch(l.value,{componentStack:D!==null?D:""})})}function oy(e,i,s,l,h){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&fr(i,s,h,!0),s=ci.current,s!==null){switch(s.tag){case 31:case 13:return Ai===null?Ec():s.alternate===null&&cn===0&&(cn=3),s.flags&=-257,s.flags|=65536,s.lanes=h,l===$l?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),_h(e,l,h)),!1;case 22:return s.flags|=65536,l===$l?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),_h(e,l,h)),!1}throw Error(a(435,s.tag))}return _h(e,l,h),Ec(),!1}if(Ae)return i=ci.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=h,l!==hf&&(e=Error(a(422),{cause:l}),Ao(Mi(e,s)))):(l!==hf&&(i=Error(a(423),{cause:l}),Ao(Mi(i,s))),e=e.current.alternate,e.flags|=65536,h&=-h,e.lanes|=h,l=Mi(l,s),h=Yf(e.stateNode,l,h),bf(e,h),cn!==4&&(cn=2)),!1;var m=Error(a(520),{cause:l});if(m=Mi(m,s),Wo===null?Wo=[m]:Wo.push(m),cn!==4&&(cn=2),i===null)return!0;l=Mi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=h&-h,s.lanes|=e,e=Yf(s.stateNode,l,e),bf(s,e),!1;case 1:if(i=s.type,m=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&($a===null||!$a.has(m))))return s.flags|=65536,h&=-h,s.lanes|=h,h=K0(h),J0(h,e,s,l),bf(s,h),!1}s=s.return}while(s!==null);return!1}var Zf=Error(a(461)),xn=!1;function On(e,i,s,l){i.child=e===null?t0(i,null,s,l):Os(i,e.child,s,l)}function Q0(e,i,s,l,h){s=s.render;var m=i.ref;if("ref"in l){var M={};for(var D in l)D!=="ref"&&(M[D]=l[D])}else M=l;return Ds(i),l=Cf(e,i,s,M,m,h),D=Df(),e!==null&&!xn?(Uf(e,i,h),ga(e,i,h)):(Ae&&D&&uf(i),i.flags|=1,On(e,i,l,h),i.child)}function j0(e,i,s,l,h){if(e===null){var m=s.type;return typeof m=="function"&&!of(m)&&m.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=m,$0(e,i,m,l,h)):(e=Yl(s.type,null,l,i,i.mode,h),e.ref=i.ref,e.return=i,i.child=e)}if(m=e.child,!nh(e,h)){var M=m.memoizedProps;if(s=s.compare,s=s!==null?s:bo,s(M,l)&&e.ref===i.ref)return ga(e,i,h)}return i.flags|=1,e=ua(m,l),e.ref=i.ref,e.return=i,i.child=e}function $0(e,i,s,l,h){if(e!==null){var m=e.memoizedProps;if(bo(m,l)&&e.ref===i.ref)if(xn=!1,i.pendingProps=l=m,nh(e,h))(e.flags&131072)!==0&&(xn=!0);else return i.lanes=e.lanes,ga(e,i,h)}return Kf(e,i,s,l,h)}function tg(e,i,s,l){var h=l.children,m=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(m=m!==null?m.baseLanes|s:s,e!==null){for(l=i.child=e.child,h=0;l!==null;)h=h|l.lanes|l.childLanes,l=l.sibling;l=h&~m}else l=0,i.child=null;return eg(e,i,m,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ql(i,m!==null?m.cachePool:null),m!==null?i0(i,m):Tf(),a0(i);else return l=i.lanes=536870912,eg(e,i,m!==null?m.baseLanes|s:s,s,l)}else m!==null?(Ql(i,m.cachePool),i0(i,m),Ka(),i.memoizedState=null):(e!==null&&Ql(i,null),Tf(),Ka());return On(e,i,h,s),i.child}function Fo(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function eg(e,i,s,l,h){var m=xf();return m=m===null?null:{parent:vn._currentValue,pool:m},i.memoizedState={baseLanes:s,cachePool:m},e!==null&&Ql(i,null),Tf(),a0(i),e!==null&&fr(e,i,l,!0),i.childLanes=h,null}function dc(e,i){return i=mc({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function ng(e,i,s){return Os(i,e.child,null,s),e=dc(i,i.pendingProps),e.flags|=2,ui(i),i.memoizedState=null,e}function ly(e,i,s){var l=i.pendingProps,h=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ae){if(l.mode==="hidden")return e=dc(i,l),i.lanes=536870912,Fo(null,e);if(wf(i),(e=en)?(e=pv(e,Ti),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ga!==null?{id:Zi,overflow:Ki}:null,retryLane:536870912,hydrationErrors:null},s=Bm(e),s.return=i,i.child=s,Ln=i,en=null)):e=null,e===null)throw ka(i);return i.lanes=536870912,null}return dc(i,l)}var m=e.memoizedState;if(m!==null){var M=m.dehydrated;if(wf(i),h)if(i.flags&256)i.flags&=-257,i=ng(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(xn||fr(e,i,s,!1),h=(s&e.childLanes)!==0,xn||h){if(l=Qe,l!==null&&(M=si(l,s),M!==0&&M!==m.retryLane))throw m.retryLane=M,As(e,M),ei(l,e,M),Zf;Ec(),i=ng(e,i,s)}else e=m.treeContext,en=wi(M.nextSibling),Ln=i,Ae=!0,Va=null,Ti=!1,e!==null&&Vm(i,e),i=dc(i,l),i.flags|=4096;return i}return e=ua(e.child,{mode:l.mode,children:l.children}),e.ref=i.ref,i.child=e,e.return=i,e}function pc(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function Kf(e,i,s,l,h){return Ds(i),s=Cf(e,i,s,l,void 0,h),l=Df(),e!==null&&!xn?(Uf(e,i,h),ga(e,i,h)):(Ae&&l&&uf(i),i.flags|=1,On(e,i,s,h),i.child)}function ig(e,i,s,l,h,m){return Ds(i),i.updateQueue=null,s=r0(i,l,s,h),s0(e),l=Df(),e!==null&&!xn?(Uf(e,i,m),ga(e,i,m)):(Ae&&l&&uf(i),i.flags|=1,On(e,i,s,m),i.child)}function ag(e,i,s,l,h){if(Ds(i),i.stateNode===null){var m=or,M=s.contextType;typeof M=="object"&&M!==null&&(m=Nn(M)),m=new s(l,m),i.memoizedState=m.state!==null&&m.state!==void 0?m.state:null,m.updater=qf,i.stateNode=m,m._reactInternals=i,m=i.stateNode,m.props=l,m.state=i.memoizedState,m.refs={},yf(i),M=s.contextType,m.context=typeof M=="object"&&M!==null?Nn(M):or,m.state=i.memoizedState,M=s.getDerivedStateFromProps,typeof M=="function"&&(Wf(i,s,M,l),m.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(M=m.state,typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount(),M!==m.state&&qf.enqueueReplaceState(m,m.state,null),No(i,l,m,h),Lo(),m.state=i.memoizedState),typeof m.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){m=i.stateNode;var D=i.memoizedProps,k=Is(s,D);m.props=k;var ut=m.context,St=s.contextType;M=or,typeof St=="object"&&St!==null&&(M=Nn(St));var Mt=s.getDerivedStateFromProps;St=typeof Mt=="function"||typeof m.getSnapshotBeforeUpdate=="function",D=i.pendingProps!==D,St||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(D||ut!==M)&&X0(i,m,l,M),Wa=!1;var ht=i.memoizedState;m.state=ht,No(i,l,m,h),Lo(),ut=i.memoizedState,D||ht!==ut||Wa?(typeof Mt=="function"&&(Wf(i,s,Mt,l),ut=i.memoizedState),(k=Wa||k0(i,s,k,l,ht,ut,M))?(St||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount()),typeof m.componentDidMount=="function"&&(i.flags|=4194308)):(typeof m.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=ut),m.props=l,m.state=ut,m.context=M,l=k):(typeof m.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{m=i.stateNode,Mf(e,i),M=i.memoizedProps,St=Is(s,M),m.props=St,Mt=i.pendingProps,ht=m.context,ut=s.contextType,k=or,typeof ut=="object"&&ut!==null&&(k=Nn(ut)),D=s.getDerivedStateFromProps,(ut=typeof D=="function"||typeof m.getSnapshotBeforeUpdate=="function")||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(M!==Mt||ht!==k)&&X0(i,m,l,k),Wa=!1,ht=i.memoizedState,m.state=ht,No(i,l,m,h),Lo();var mt=i.memoizedState;M!==Mt||ht!==mt||Wa||e!==null&&e.dependencies!==null&&Kl(e.dependencies)?(typeof D=="function"&&(Wf(i,s,D,l),mt=i.memoizedState),(St=Wa||k0(i,s,St,l,ht,mt,k)||e!==null&&e.dependencies!==null&&Kl(e.dependencies))?(ut||typeof m.UNSAFE_componentWillUpdate!="function"&&typeof m.componentWillUpdate!="function"||(typeof m.componentWillUpdate=="function"&&m.componentWillUpdate(l,mt,k),typeof m.UNSAFE_componentWillUpdate=="function"&&m.UNSAFE_componentWillUpdate(l,mt,k)),typeof m.componentDidUpdate=="function"&&(i.flags|=4),typeof m.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof m.componentDidUpdate!="function"||M===e.memoizedProps&&ht===e.memoizedState||(i.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ht===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=mt),m.props=l,m.state=mt,m.context=k,l=St):(typeof m.componentDidUpdate!="function"||M===e.memoizedProps&&ht===e.memoizedState||(i.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ht===e.memoizedState||(i.flags|=1024),l=!1)}return m=l,pc(e,i),l=(i.flags&128)!==0,m||l?(m=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:m.render(),i.flags|=1,e!==null&&l?(i.child=Os(i,e.child,null,h),i.child=Os(i,null,s,h)):On(e,i,s,h),i.memoizedState=m.state,e=i.child):e=ga(e,i,h),e}function sg(e,i,s,l){return Rs(),i.flags|=256,On(e,i,s,l),i.child}var Jf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qf(e){return{baseLanes:e,cachePool:Zm()}}function jf(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=hi),e}function rg(e,i,s){var l=i.pendingProps,h=!1,m=(i.flags&128)!==0,M;if((M=m)||(M=e!==null&&e.memoizedState===null?!1:(hn.current&2)!==0),M&&(h=!0,i.flags&=-129),M=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ae){if(h?Za(i):Ka(),(e=en)?(e=pv(e,Ti),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ga!==null?{id:Zi,overflow:Ki}:null,retryLane:536870912,hydrationErrors:null},s=Bm(e),s.return=i,i.child=s,Ln=i,en=null)):e=null,e===null)throw ka(i);return Oh(e)?i.lanes=32:i.lanes=536870912,null}var D=l.children;return l=l.fallback,h?(Ka(),h=i.mode,D=mc({mode:"hidden",children:D},h),l=ws(l,h,s,null),D.return=i,l.return=i,D.sibling=l,i.child=D,l=i.child,l.memoizedState=Qf(s),l.childLanes=jf(e,M,s),i.memoizedState=Jf,Fo(null,l)):(Za(i),$f(i,D))}var k=e.memoizedState;if(k!==null&&(D=k.dehydrated,D!==null)){if(m)i.flags&256?(Za(i),i.flags&=-257,i=th(e,i,s)):i.memoizedState!==null?(Ka(),i.child=e.child,i.flags|=128,i=null):(Ka(),D=l.fallback,h=i.mode,l=mc({mode:"visible",children:l.children},h),D=ws(D,h,s,null),D.flags|=2,l.return=i,D.return=i,l.sibling=D,i.child=l,Os(i,e.child,null,s),l=i.child,l.memoizedState=Qf(s),l.childLanes=jf(e,M,s),i.memoizedState=Jf,i=Fo(null,l));else if(Za(i),Oh(D)){if(M=D.nextSibling&&D.nextSibling.dataset,M)var ut=M.dgst;M=ut,l=Error(a(419)),l.stack="",l.digest=M,Ao({value:l,source:null,stack:null}),i=th(e,i,s)}else if(xn||fr(e,i,s,!1),M=(s&e.childLanes)!==0,xn||M){if(M=Qe,M!==null&&(l=si(M,s),l!==0&&l!==k.retryLane))throw k.retryLane=l,As(e,l),ei(M,e,l),Zf;Nh(D)||Ec(),i=th(e,i,s)}else Nh(D)?(i.flags|=192,i.child=e.child,i=null):(e=k.treeContext,en=wi(D.nextSibling),Ln=i,Ae=!0,Va=null,Ti=!1,e!==null&&Vm(i,e),i=$f(i,l.children),i.flags|=4096);return i}return h?(Ka(),D=l.fallback,h=i.mode,k=e.child,ut=k.sibling,l=ua(k,{mode:"hidden",children:l.children}),l.subtreeFlags=k.subtreeFlags&65011712,ut!==null?D=ua(ut,D):(D=ws(D,h,s,null),D.flags|=2),D.return=i,l.return=i,l.sibling=D,i.child=l,Fo(null,l),l=i.child,D=e.child.memoizedState,D===null?D=Qf(s):(h=D.cachePool,h!==null?(k=vn._currentValue,h=h.parent!==k?{parent:k,pool:k}:h):h=Zm(),D={baseLanes:D.baseLanes|s,cachePool:h}),l.memoizedState=D,l.childLanes=jf(e,M,s),i.memoizedState=Jf,Fo(e.child,l)):(Za(i),s=e.child,e=s.sibling,s=ua(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,e!==null&&(M=i.deletions,M===null?(i.deletions=[e],i.flags|=16):M.push(e)),i.child=s,i.memoizedState=null,s)}function $f(e,i){return i=mc({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function mc(e,i){return e=li(22,e,null,i),e.lanes=0,e}function th(e,i,s){return Os(i,e.child,null,s),e=$f(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function og(e,i,s){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),mf(e.return,i,s)}function eh(e,i,s,l,h,m){var M=e.memoizedState;M===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:h,treeForkCount:m}:(M.isBackwards=i,M.rendering=null,M.renderingStartTime=0,M.last=l,M.tail=s,M.tailMode=h,M.treeForkCount=m)}function lg(e,i,s){var l=i.pendingProps,h=l.revealOrder,m=l.tail;l=l.children;var M=hn.current,D=(M&2)!==0;if(D?(M=M&1|2,i.flags|=128):M&=1,j(hn,M),On(e,i,l,s),l=Ae?To:0,!D&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&og(e,s,i);else if(e.tag===19)og(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(h){case"forwards":for(s=i.child,h=null;s!==null;)e=s.alternate,e!==null&&ic(e)===null&&(h=s),s=s.sibling;s=h,s===null?(h=i.child,i.child=null):(h=s.sibling,s.sibling=null),eh(i,!1,h,s,m,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,h=i.child,i.child=null;h!==null;){if(e=h.alternate,e!==null&&ic(e)===null){i.child=h;break}e=h.sibling,h.sibling=s,s=h,h=e}eh(i,!0,s,null,m,l);break;case"together":eh(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function ga(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),ja|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(fr(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=ua(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=ua(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function nh(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Kl(e)))}function cy(e,i,s){switch(i.tag){case 3:pt(i,i.stateNode.containerInfo),Xa(i,vn,e.memoizedState.cache),Rs();break;case 27:case 5:It(i);break;case 4:pt(i,i.stateNode.containerInfo);break;case 10:Xa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,wf(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(Za(i),i.flags|=128,null):(s&i.child.childLanes)!==0?rg(e,i,s):(Za(i),e=ga(e,i,s),e!==null?e.sibling:null);Za(i);break;case 19:var h=(e.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(fr(e,i,s,!1),l=(s&i.childLanes)!==0),h){if(l)return lg(e,i,s);i.flags|=128}if(h=i.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),j(hn,hn.current),l)break;return null;case 22:return i.lanes=0,tg(e,i,s,i.pendingProps);case 24:Xa(i,vn,e.memoizedState.cache)}return ga(e,i,s)}function cg(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)xn=!0;else{if(!nh(e,s)&&(i.flags&128)===0)return xn=!1,cy(e,i,s);xn=(e.flags&131072)!==0}else xn=!1,Ae&&(i.flags&1048576)!==0&&Gm(i,To,i.index);switch(i.lanes=0,i.tag){case 16:t:{var l=i.pendingProps;if(e=Ls(i.elementType),i.type=e,typeof e=="function")of(e)?(l=Is(e,l),i.tag=1,i=ag(null,i,e,l,s)):(i.tag=0,i=Kf(null,i,e,l,s));else{if(e!=null){var h=e.$$typeof;if(h===A){i.tag=11,i=Q0(null,i,e,l,s);break t}else if(h===I){i.tag=14,i=j0(null,i,e,l,s);break t}}throw i=V(e)||e,Error(a(306,i,""))}}return i;case 0:return Kf(e,i,i.type,i.pendingProps,s);case 1:return l=i.type,h=Is(l,i.pendingProps),ag(e,i,l,h,s);case 3:t:{if(pt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));l=i.pendingProps;var m=i.memoizedState;h=m.element,Mf(e,i),No(i,l,null,s);var M=i.memoizedState;if(l=M.cache,Xa(i,vn,l),l!==m.cache&&gf(i,[vn],s,!0),Lo(),l=M.element,m.isDehydrated)if(m={element:l,isDehydrated:!1,cache:M.cache},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){i=sg(e,i,l,s);break t}else if(l!==h){h=Mi(Error(a(424)),i),Ao(h),i=sg(e,i,l,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(en=wi(e.firstChild),Ln=i,Ae=!0,Va=null,Ti=!0,s=t0(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Rs(),l===h){i=ga(e,i,s);break t}On(e,i,l,s)}i=i.child}return i;case 26:return pc(e,i),e===null?(s=Sv(i.type,null,i.pendingProps,null))?i.memoizedState=s:Ae||(s=i.type,e=i.pendingProps,l=Uc(Dt.current).createElement(s),l[pn]=i,l[Un]=e,Pn(l,s,e),mn(l),i.stateNode=l):i.memoizedState=Sv(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return It(i),e===null&&Ae&&(l=i.stateNode=vv(i.type,i.pendingProps,Dt.current),Ln=i,Ti=!0,h=en,is(i.type)?(Ph=h,en=wi(l.firstChild)):en=h),On(e,i,i.pendingProps.children,s),pc(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ae&&((h=l=en)&&(l=By(l,i.type,i.pendingProps,Ti),l!==null?(i.stateNode=l,Ln=i,en=wi(l.firstChild),Ti=!1,h=!0):h=!1),h||ka(i)),It(i),h=i.type,m=i.pendingProps,M=e!==null?e.memoizedProps:null,l=m.children,Dh(h,m)?l=null:M!==null&&Dh(h,M)&&(i.flags|=32),i.memoizedState!==null&&(h=Cf(e,i,ty,null,null,s),$o._currentValue=h),pc(e,i),On(e,i,l,s),i.child;case 6:return e===null&&Ae&&((e=s=en)&&(s=Hy(s,i.pendingProps,Ti),s!==null?(i.stateNode=s,Ln=i,en=null,e=!0):e=!1),e||ka(i)),null;case 13:return rg(e,i,s);case 4:return pt(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=Os(i,null,l,s):On(e,i,l,s),i.child;case 11:return Q0(e,i,i.type,i.pendingProps,s);case 7:return On(e,i,i.pendingProps,s),i.child;case 8:return On(e,i,i.pendingProps.children,s),i.child;case 12:return On(e,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Xa(i,i.type,l.value),On(e,i,l.children,s),i.child;case 9:return h=i.type._context,l=i.pendingProps.children,Ds(i),h=Nn(h),l=l(h),i.flags|=1,On(e,i,l,s),i.child;case 14:return j0(e,i,i.type,i.pendingProps,s);case 15:return $0(e,i,i.type,i.pendingProps,s);case 19:return lg(e,i,s);case 31:return ly(e,i,s);case 22:return tg(e,i,s,i.pendingProps);case 24:return Ds(i),l=Nn(vn),e===null?(h=xf(),h===null&&(h=Qe,m=vf(),h.pooledCache=m,m.refCount++,m!==null&&(h.pooledCacheLanes|=s),h=m),i.memoizedState={parent:l,cache:h},yf(i),Xa(i,vn,h)):((e.lanes&s)!==0&&(Mf(e,i),No(i,null,null,s),Lo()),h=e.memoizedState,m=i.memoizedState,h.parent!==l?(h={parent:l,cache:l},i.memoizedState=h,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=h),Xa(i,vn,l)):(l=m.cache,Xa(i,vn,l),l!==h.cache&&gf(i,[vn],s,!0))),On(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function va(e){e.flags|=4}function ih(e,i,s,l,h){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(h&335544128)===h)if(e.stateNode.complete)e.flags|=8192;else if(Ig())e.flags|=8192;else throw Ns=$l,Sf}else e.flags&=-16777217}function ug(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Tv(i))if(Ig())e.flags|=8192;else throw Ns=$l,Sf}function gc(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Et():536870912,e.lanes|=i,br|=i)}function Bo(e,i){if(!Ae)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function nn(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,l=0;if(i)for(var h=e.child;h!==null;)s|=h.lanes|h.childLanes,l|=h.subtreeFlags&65011712,l|=h.flags&65011712,h.return=e,h=h.sibling;else for(h=e.child;h!==null;)s|=h.lanes|h.childLanes,l|=h.subtreeFlags,l|=h.flags,h.return=e,h=h.sibling;return e.subtreeFlags|=l,e.childLanes=s,i}function uy(e,i,s){var l=i.pendingProps;switch(ff(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return nn(i),null;case 1:return nn(i),null;case 3:return s=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),da(vn),Tt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ur(i)?va(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,df())),nn(i),null;case 26:var h=i.type,m=i.memoizedState;return e===null?(va(i),m!==null?(nn(i),ug(i,m)):(nn(i),ih(i,h,null,l,s))):m?m!==e.memoizedState?(va(i),nn(i),ug(i,m)):(nn(i),i.flags&=-16777217):(e=e.memoizedProps,e!==l&&va(i),nn(i),ih(i,h,e,l,s)),null;case 27:if(At(i),s=Dt.current,h=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&va(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return nn(i),null}e=J.current,ur(i)?km(i):(e=vv(h,l,s),i.stateNode=e,va(i))}return nn(i),null;case 5:if(At(i),h=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&va(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return nn(i),null}if(m=J.current,ur(i))km(i);else{var M=Uc(Dt.current);switch(m){case 1:m=M.createElementNS("http://www.w3.org/2000/svg",h);break;case 2:m=M.createElementNS("http://www.w3.org/1998/Math/MathML",h);break;default:switch(h){case"svg":m=M.createElementNS("http://www.w3.org/2000/svg",h);break;case"math":m=M.createElementNS("http://www.w3.org/1998/Math/MathML",h);break;case"script":m=M.createElement("div"),m.innerHTML="<script><\/script>",m=m.removeChild(m.firstChild);break;case"select":m=typeof l.is=="string"?M.createElement("select",{is:l.is}):M.createElement("select"),l.multiple?m.multiple=!0:l.size&&(m.size=l.size);break;default:m=typeof l.is=="string"?M.createElement(h,{is:l.is}):M.createElement(h)}}m[pn]=i,m[Un]=l;t:for(M=i.child;M!==null;){if(M.tag===5||M.tag===6)m.appendChild(M.stateNode);else if(M.tag!==4&&M.tag!==27&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===i)break t;for(;M.sibling===null;){if(M.return===null||M.return===i)break t;M=M.return}M.sibling.return=M.return,M=M.sibling}i.stateNode=m;t:switch(Pn(m,h,l),h){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&va(i)}}return nn(i),ih(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&va(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=Dt.current,ur(i)){if(e=i.stateNode,s=i.memoizedProps,l=null,h=Ln,h!==null)switch(h.tag){case 27:case 5:l=h.memoizedProps}e[pn]=i,e=!!(e.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||rv(e.nodeValue,s)),e||ka(i,!0)}else e=Uc(e).createTextNode(l),e[pn]=i,i.stateNode=e}return nn(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(l=ur(i),s!==null){if(e===null){if(!l)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[pn]=i}else Rs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;nn(i),e=!1}else s=df(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(ui(i),i):(ui(i),null);if((i.flags&128)!==0)throw Error(a(558))}return nn(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(h=ur(i),l!==null&&l.dehydrated!==null){if(e===null){if(!h)throw Error(a(318));if(h=i.memoizedState,h=h!==null?h.dehydrated:null,!h)throw Error(a(317));h[pn]=i}else Rs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;nn(i),h=!1}else h=df(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=h),h=!0;if(!h)return i.flags&256?(ui(i),i):(ui(i),null)}return ui(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,e=e!==null&&e.memoizedState!==null,s&&(l=i.child,h=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(h=l.alternate.memoizedState.cachePool.pool),m=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(m=l.memoizedState.cachePool.pool),m!==h&&(l.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),gc(i,i.updateQueue),nn(i),null);case 4:return Tt(),e===null&&Th(i.stateNode.containerInfo),nn(i),null;case 10:return da(i.type),nn(i),null;case 19:if(et(hn),l=i.memoizedState,l===null)return nn(i),null;if(h=(i.flags&128)!==0,m=l.rendering,m===null)if(h)Bo(l,!1);else{if(cn!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(m=ic(e),m!==null){for(i.flags|=128,Bo(l,!1),e=m.updateQueue,i.updateQueue=e,gc(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)Fm(s,e),s=s.sibling;return j(hn,hn.current&1|2),Ae&&fa(i,l.treeForkCount),i.child}e=e.sibling}l.tail!==null&&Te()>yc&&(i.flags|=128,h=!0,Bo(l,!1),i.lanes=4194304)}else{if(!h)if(e=ic(m),e!==null){if(i.flags|=128,h=!0,e=e.updateQueue,i.updateQueue=e,gc(i,e),Bo(l,!0),l.tail===null&&l.tailMode==="hidden"&&!m.alternate&&!Ae)return nn(i),null}else 2*Te()-l.renderingStartTime>yc&&s!==536870912&&(i.flags|=128,h=!0,Bo(l,!1),i.lanes=4194304);l.isBackwards?(m.sibling=i.child,i.child=m):(e=l.last,e!==null?e.sibling=m:i.child=m,l.last=m)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=Te(),e.sibling=null,s=hn.current,j(hn,h?s&1|2:s&1),Ae&&fa(i,l.treeForkCount),e):(nn(i),null);case 22:case 23:return ui(i),Af(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(nn(i),i.subtreeFlags&6&&(i.flags|=8192)):nn(i),s=i.updateQueue,s!==null&&gc(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),e!==null&&et(Us),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),da(vn),nn(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function fy(e,i){switch(ff(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return da(vn),Tt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return At(i),null;case 31:if(i.memoizedState!==null){if(ui(i),i.alternate===null)throw Error(a(340));Rs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(ui(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));Rs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return et(hn),null;case 4:return Tt(),null;case 10:return da(i.type),null;case 22:case 23:return ui(i),Af(),e!==null&&et(Us),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return da(vn),null;case 25:return null;default:return null}}function fg(e,i){switch(ff(i),i.tag){case 3:da(vn),Tt();break;case 26:case 27:case 5:At(i);break;case 4:Tt();break;case 31:i.memoizedState!==null&&ui(i);break;case 13:ui(i);break;case 19:et(hn);break;case 10:da(i.type);break;case 22:case 23:ui(i),Af(),e!==null&&et(Us);break;case 24:da(vn)}}function Ho(e,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var h=l.next;s=h;do{if((s.tag&e)===e){l=void 0;var m=s.create,M=s.inst;l=m(),M.destroy=l}s=s.next}while(s!==h)}}catch(D){ke(i,i.return,D)}}function Ja(e,i,s){try{var l=i.updateQueue,h=l!==null?l.lastEffect:null;if(h!==null){var m=h.next;l=m;do{if((l.tag&e)===e){var M=l.inst,D=M.destroy;if(D!==void 0){M.destroy=void 0,h=i;var k=s,ut=D;try{ut()}catch(St){ke(h,k,St)}}}l=l.next}while(l!==m)}}catch(St){ke(i,i.return,St)}}function hg(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{n0(i,s)}catch(l){ke(e,e.return,l)}}}function dg(e,i,s){s.props=Is(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(l){ke(e,i,l)}}function Go(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof s=="function"?e.refCleanup=s(l):s.current=l}}catch(h){ke(e,i,h)}}function Ji(e,i){var s=e.ref,l=e.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(h){ke(e,i,h)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(h){ke(e,i,h)}else s.current=null}function pg(e){var i=e.type,s=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break t;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(h){ke(e,e.return,h)}}function ah(e,i,s){try{var l=e.stateNode;Ny(l,e.type,s,i),l[Un]=i}catch(h){ke(e,e.return,h)}}function mg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&is(e.type)||e.tag===4}function sh(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||mg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&is(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function rh(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Si));else if(l!==4&&(l===27&&is(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(rh(e,i,s),e=e.sibling;e!==null;)rh(e,i,s),e=e.sibling}function vc(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(l!==4&&(l===27&&is(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(vc(e,i,s),e=e.sibling;e!==null;)vc(e,i,s),e=e.sibling}function gg(e){var i=e.stateNode,s=e.memoizedProps;try{for(var l=e.type,h=i.attributes;h.length;)i.removeAttributeNode(h[0]);Pn(i,l,s),i[pn]=e,i[Un]=s}catch(m){ke(e,e.return,m)}}var _a=!1,Sn=!1,oh=!1,vg=typeof WeakSet=="function"?WeakSet:Set,Rn=null;function hy(e,i){if(e=e.containerInfo,Rh=Fc,e=Cm(e),$u(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var h=l.anchorOffset,m=l.focusNode;l=l.focusOffset;try{s.nodeType,m.nodeType}catch{s=null;break t}var M=0,D=-1,k=-1,ut=0,St=0,Mt=e,ht=null;e:for(;;){for(var mt;Mt!==s||h!==0&&Mt.nodeType!==3||(D=M+h),Mt!==m||l!==0&&Mt.nodeType!==3||(k=M+l),Mt.nodeType===3&&(M+=Mt.nodeValue.length),(mt=Mt.firstChild)!==null;)ht=Mt,Mt=mt;for(;;){if(Mt===e)break e;if(ht===s&&++ut===h&&(D=M),ht===m&&++St===l&&(k=M),(mt=Mt.nextSibling)!==null)break;Mt=ht,ht=Mt.parentNode}Mt=mt}s=D===-1||k===-1?null:{start:D,end:k}}else s=null}s=s||{start:0,end:0}}else s=null;for(Ch={focusedElem:e,selectionRange:s},Fc=!1,Rn=i;Rn!==null;)if(i=Rn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Rn=e;else for(;Rn!==null;){switch(i=Rn,m=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)h=e[s],h.ref.impl=h.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&m!==null){e=void 0,s=i,h=m.memoizedProps,m=m.memoizedState,l=s.stateNode;try{var Kt=Is(s.type,h);e=l.getSnapshotBeforeUpdate(Kt,m),l.__reactInternalSnapshotBeforeUpdate=e}catch(ie){ke(s,s.return,ie)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)Lh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Lh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Rn=e;break}Rn=i.return}}function _g(e,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:Sa(e,s),l&4&&Ho(5,s);break;case 1:if(Sa(e,s),l&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(M){ke(s,s.return,M)}else{var h=Is(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(h,i,e.__reactInternalSnapshotBeforeUpdate)}catch(M){ke(s,s.return,M)}}l&64&&hg(s),l&512&&Go(s,s.return);break;case 3:if(Sa(e,s),l&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{n0(e,i)}catch(M){ke(s,s.return,M)}}break;case 27:i===null&&l&4&&gg(s);case 26:case 5:Sa(e,s),i===null&&l&4&&pg(s),l&512&&Go(s,s.return);break;case 12:Sa(e,s);break;case 31:Sa(e,s),l&4&&yg(e,s);break;case 13:Sa(e,s),l&4&&Mg(e,s),l&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=yy.bind(null,s),Gy(e,s))));break;case 22:if(l=s.memoizedState!==null||_a,!l){i=i!==null&&i.memoizedState!==null||Sn,h=_a;var m=Sn;_a=l,(Sn=i)&&!m?ya(e,s,(s.subtreeFlags&8772)!==0):Sa(e,s),_a=h,Sn=m}break;case 30:break;default:Sa(e,s)}}function xg(e){var i=e.alternate;i!==null&&(e.alternate=null,xg(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&za(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var rn=null,Qn=!1;function xa(e,i,s){for(s=s.child;s!==null;)Sg(e,i,s),s=s.sibling}function Sg(e,i,s){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(vt,s)}catch{}switch(s.tag){case 26:Sn||Ji(s,i),xa(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:Sn||Ji(s,i);var l=rn,h=Qn;is(s.type)&&(rn=s.stateNode,Qn=!1),xa(e,i,s),Jo(s.stateNode),rn=l,Qn=h;break;case 5:Sn||Ji(s,i);case 6:if(l=rn,h=Qn,rn=null,xa(e,i,s),rn=l,Qn=h,rn!==null)if(Qn)try{(rn.nodeType===9?rn.body:rn.nodeName==="HTML"?rn.ownerDocument.body:rn).removeChild(s.stateNode)}catch(m){ke(s,i,m)}else try{rn.removeChild(s.stateNode)}catch(m){ke(s,i,m)}break;case 18:rn!==null&&(Qn?(e=rn,hv(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Ur(e)):hv(rn,s.stateNode));break;case 4:l=rn,h=Qn,rn=s.stateNode.containerInfo,Qn=!0,xa(e,i,s),rn=l,Qn=h;break;case 0:case 11:case 14:case 15:Ja(2,s,i),Sn||Ja(4,s,i),xa(e,i,s);break;case 1:Sn||(Ji(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&dg(s,i,l)),xa(e,i,s);break;case 21:xa(e,i,s);break;case 22:Sn=(l=Sn)||s.memoizedState!==null,xa(e,i,s),Sn=l;break;default:xa(e,i,s)}}function yg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ur(e)}catch(s){ke(i,i.return,s)}}}function Mg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ur(e)}catch(s){ke(i,i.return,s)}}function dy(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new vg),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new vg),i;default:throw Error(a(435,e.tag))}}function _c(e,i){var s=dy(e);i.forEach(function(l){if(!s.has(l)){s.add(l);var h=My.bind(null,e,l);l.then(h,h)}})}function jn(e,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var h=s[l],m=e,M=i,D=M;t:for(;D!==null;){switch(D.tag){case 27:if(is(D.type)){rn=D.stateNode,Qn=!1;break t}break;case 5:rn=D.stateNode,Qn=!1;break t;case 3:case 4:rn=D.stateNode.containerInfo,Qn=!0;break t}D=D.return}if(rn===null)throw Error(a(160));Sg(m,M,h),rn=null,Qn=!1,m=h.alternate,m!==null&&(m.return=null),h.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)bg(i,e),i=i.sibling}var Pi=null;function bg(e,i){var s=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:jn(i,e),$n(e),l&4&&(Ja(3,e,e.return),Ho(3,e),Ja(5,e,e.return));break;case 1:jn(i,e),$n(e),l&512&&(Sn||s===null||Ji(s,s.return)),l&64&&_a&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var h=Pi;if(jn(i,e),$n(e),l&512&&(Sn||s===null||Ji(s,s.return)),l&4){var m=s!==null?s.memoizedState:null;if(l=e.memoizedState,s===null)if(l===null)if(e.stateNode===null){t:{l=e.type,s=e.memoizedProps,h=h.ownerDocument||h;e:switch(l){case"title":m=h.getElementsByTagName("title")[0],(!m||m[Ia]||m[pn]||m.namespaceURI==="http://www.w3.org/2000/svg"||m.hasAttribute("itemprop"))&&(m=h.createElement(l),h.head.insertBefore(m,h.querySelector("head > title"))),Pn(m,l,s),m[pn]=e,mn(m),l=m;break t;case"link":var M=bv("link","href",h).get(l+(s.href||""));if(M){for(var D=0;D<M.length;D++)if(m=M[D],m.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&m.getAttribute("rel")===(s.rel==null?null:s.rel)&&m.getAttribute("title")===(s.title==null?null:s.title)&&m.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){M.splice(D,1);break e}}m=h.createElement(l),Pn(m,l,s),h.head.appendChild(m);break;case"meta":if(M=bv("meta","content",h).get(l+(s.content||""))){for(D=0;D<M.length;D++)if(m=M[D],m.getAttribute("content")===(s.content==null?null:""+s.content)&&m.getAttribute("name")===(s.name==null?null:s.name)&&m.getAttribute("property")===(s.property==null?null:s.property)&&m.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&m.getAttribute("charset")===(s.charSet==null?null:s.charSet)){M.splice(D,1);break e}}m=h.createElement(l),Pn(m,l,s),h.head.appendChild(m);break;default:throw Error(a(468,l))}m[pn]=e,mn(m),l=m}e.stateNode=l}else Ev(h,e.type,e.stateNode);else e.stateNode=Mv(h,l,e.memoizedProps);else m!==l?(m===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):m.count--,l===null?Ev(h,e.type,e.stateNode):Mv(h,l,e.memoizedProps)):l===null&&e.stateNode!==null&&ah(e,e.memoizedProps,s.memoizedProps)}break;case 27:jn(i,e),$n(e),l&512&&(Sn||s===null||Ji(s,s.return)),s!==null&&l&4&&ah(e,e.memoizedProps,s.memoizedProps);break;case 5:if(jn(i,e),$n(e),l&512&&(Sn||s===null||Ji(s,s.return)),e.flags&32){h=e.stateNode;try{Vn(h,"")}catch(Kt){ke(e,e.return,Kt)}}l&4&&e.stateNode!=null&&(h=e.memoizedProps,ah(e,h,s!==null?s.memoizedProps:h)),l&1024&&(oh=!0);break;case 6:if(jn(i,e),$n(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,s=e.stateNode;try{s.nodeValue=l}catch(Kt){ke(e,e.return,Kt)}}break;case 3:if(Oc=null,h=Pi,Pi=Lc(i.containerInfo),jn(i,e),Pi=h,$n(e),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Ur(i.containerInfo)}catch(Kt){ke(e,e.return,Kt)}oh&&(oh=!1,Eg(e));break;case 4:l=Pi,Pi=Lc(e.stateNode.containerInfo),jn(i,e),$n(e),Pi=l;break;case 12:jn(i,e),$n(e);break;case 31:jn(i,e),$n(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,_c(e,l)));break;case 13:jn(i,e),$n(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Sc=Te()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,_c(e,l)));break;case 22:h=e.memoizedState!==null;var k=s!==null&&s.memoizedState!==null,ut=_a,St=Sn;if(_a=ut||h,Sn=St||k,jn(i,e),Sn=St,_a=ut,$n(e),l&8192)t:for(i=e.stateNode,i._visibility=h?i._visibility&-2:i._visibility|1,h&&(s===null||k||_a||Sn||zs(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){k=s=i;try{if(m=k.stateNode,h)M=m.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{D=k.stateNode;var Mt=k.memoizedProps.style,ht=Mt!=null&&Mt.hasOwnProperty("display")?Mt.display:null;D.style.display=ht==null||typeof ht=="boolean"?"":(""+ht).trim()}}catch(Kt){ke(k,k.return,Kt)}}}else if(i.tag===6){if(s===null){k=i;try{k.stateNode.nodeValue=h?"":k.memoizedProps}catch(Kt){ke(k,k.return,Kt)}}}else if(i.tag===18){if(s===null){k=i;try{var mt=k.stateNode;h?dv(mt,!0):dv(k.stateNode,!1)}catch(Kt){ke(k,k.return,Kt)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,_c(e,s))));break;case 19:jn(i,e),$n(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,_c(e,l)));break;case 30:break;case 21:break;default:jn(i,e),$n(e)}}function $n(e){var i=e.flags;if(i&2){try{for(var s,l=e.return;l!==null;){if(mg(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var h=s.stateNode,m=sh(e);vc(e,m,h);break;case 5:var M=s.stateNode;s.flags&32&&(Vn(M,""),s.flags&=-33);var D=sh(e);vc(e,D,M);break;case 3:case 4:var k=s.stateNode.containerInfo,ut=sh(e);rh(e,ut,k);break;default:throw Error(a(161))}}catch(St){ke(e,e.return,St)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function Eg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;Eg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function Sa(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)_g(e,i.alternate,i),i=i.sibling}function zs(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Ja(4,i,i.return),zs(i);break;case 1:Ji(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&dg(i,i.return,s),zs(i);break;case 27:Jo(i.stateNode);case 26:case 5:Ji(i,i.return),zs(i);break;case 22:i.memoizedState===null&&zs(i);break;case 30:zs(i);break;default:zs(i)}e=e.sibling}}function ya(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,h=e,m=i,M=m.flags;switch(m.tag){case 0:case 11:case 15:ya(h,m,s),Ho(4,m);break;case 1:if(ya(h,m,s),l=m,h=l.stateNode,typeof h.componentDidMount=="function")try{h.componentDidMount()}catch(ut){ke(l,l.return,ut)}if(l=m,h=l.updateQueue,h!==null){var D=l.stateNode;try{var k=h.shared.hiddenCallbacks;if(k!==null)for(h.shared.hiddenCallbacks=null,h=0;h<k.length;h++)e0(k[h],D)}catch(ut){ke(l,l.return,ut)}}s&&M&64&&hg(m),Go(m,m.return);break;case 27:gg(m);case 26:case 5:ya(h,m,s),s&&l===null&&M&4&&pg(m),Go(m,m.return);break;case 12:ya(h,m,s);break;case 31:ya(h,m,s),s&&M&4&&yg(h,m);break;case 13:ya(h,m,s),s&&M&4&&Mg(h,m);break;case 22:m.memoizedState===null&&ya(h,m,s),Go(m,m.return);break;case 30:break;default:ya(h,m,s)}i=i.sibling}}function lh(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&wo(s))}function ch(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&wo(e))}function Ii(e,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)Tg(e,i,s,l),i=i.sibling}function Tg(e,i,s,l){var h=i.flags;switch(i.tag){case 0:case 11:case 15:Ii(e,i,s,l),h&2048&&Ho(9,i);break;case 1:Ii(e,i,s,l);break;case 3:Ii(e,i,s,l),h&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&wo(e)));break;case 12:if(h&2048){Ii(e,i,s,l),e=i.stateNode;try{var m=i.memoizedProps,M=m.id,D=m.onPostCommit;typeof D=="function"&&D(M,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(k){ke(i,i.return,k)}}else Ii(e,i,s,l);break;case 31:Ii(e,i,s,l);break;case 13:Ii(e,i,s,l);break;case 23:break;case 22:m=i.stateNode,M=i.alternate,i.memoizedState!==null?m._visibility&2?Ii(e,i,s,l):Vo(e,i):m._visibility&2?Ii(e,i,s,l):(m._visibility|=2,Sr(e,i,s,l,(i.subtreeFlags&10256)!==0||!1)),h&2048&&lh(M,i);break;case 24:Ii(e,i,s,l),h&2048&&ch(i.alternate,i);break;default:Ii(e,i,s,l)}}function Sr(e,i,s,l,h){for(h=h&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var m=e,M=i,D=s,k=l,ut=M.flags;switch(M.tag){case 0:case 11:case 15:Sr(m,M,D,k,h),Ho(8,M);break;case 23:break;case 22:var St=M.stateNode;M.memoizedState!==null?St._visibility&2?Sr(m,M,D,k,h):Vo(m,M):(St._visibility|=2,Sr(m,M,D,k,h)),h&&ut&2048&&lh(M.alternate,M);break;case 24:Sr(m,M,D,k,h),h&&ut&2048&&ch(M.alternate,M);break;default:Sr(m,M,D,k,h)}i=i.sibling}}function Vo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,l=i,h=l.flags;switch(l.tag){case 22:Vo(s,l),h&2048&&lh(l.alternate,l);break;case 24:Vo(s,l),h&2048&&ch(l.alternate,l);break;default:Vo(s,l)}i=i.sibling}}var ko=8192;function yr(e,i,s){if(e.subtreeFlags&ko)for(e=e.child;e!==null;)Ag(e,i,s),e=e.sibling}function Ag(e,i,s){switch(e.tag){case 26:yr(e,i,s),e.flags&ko&&e.memoizedState!==null&&$y(s,Pi,e.memoizedState,e.memoizedProps);break;case 5:yr(e,i,s);break;case 3:case 4:var l=Pi;Pi=Lc(e.stateNode.containerInfo),yr(e,i,s),Pi=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=ko,ko=16777216,yr(e,i,s),ko=l):yr(e,i,s));break;default:yr(e,i,s)}}function wg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Xo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Rn=l,Cg(l,e)}wg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Rg(e),e=e.sibling}function Rg(e){switch(e.tag){case 0:case 11:case 15:Xo(e),e.flags&2048&&Ja(9,e,e.return);break;case 3:Xo(e);break;case 12:Xo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,xc(e)):Xo(e);break;default:Xo(e)}}function xc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Rn=l,Cg(l,e)}wg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Ja(8,i,i.return),xc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,xc(i));break;default:xc(i)}e=e.sibling}}function Cg(e,i){for(;Rn!==null;){var s=Rn;switch(s.tag){case 0:case 11:case 15:Ja(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:wo(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,Rn=l;else t:for(s=e;Rn!==null;){l=Rn;var h=l.sibling,m=l.return;if(xg(l),l===s){Rn=null;break t}if(h!==null){h.return=m,Rn=h;break t}Rn=m}}}var py={getCacheForType:function(e){var i=Nn(vn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Nn(vn).controller.signal}},my=typeof WeakMap=="function"?WeakMap:Map,Be=0,Qe=null,_e=null,ye=0,Ve=0,fi=null,Qa=!1,Mr=!1,uh=!1,Ma=0,cn=0,ja=0,Fs=0,fh=0,hi=0,br=0,Wo=null,ti=null,hh=!1,Sc=0,Dg=0,yc=1/0,Mc=null,$a=null,En=0,ts=null,Er=null,ba=0,dh=0,ph=null,Ug=null,qo=0,mh=null;function di(){return(Be&2)!==0&&ye!==0?ye&-ye:F.T!==null?yh():po()}function Lg(){if(hi===0)if((ye&536870912)===0||Ae){var e=ae;ae<<=1,(ae&3932160)===0&&(ae=262144),hi=e}else hi=536870912;return e=ci.current,e!==null&&(e.flags|=32),hi}function ei(e,i,s){(e===Qe&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)&&(Tr(e,0),es(e,ye,hi,!1)),Yt(e,s),((Be&2)===0||e!==Qe)&&(e===Qe&&((Be&2)===0&&(Fs|=s),cn===4&&es(e,ye,hi,!1)),Qi(e))}function Ng(e,i,s){if((Be&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&e.expiredLanes)===0||Ut(e,i),h=l?_y(e,i):vh(e,i,!0),m=l;do{if(h===0){Mr&&!l&&es(e,i,0,!1);break}else{if(s=e.current.alternate,m&&!gy(s)){h=vh(e,i,!1),m=!1;continue}if(h===2){if(m=i,e.errorRecoveryDisabledLanes&m)var M=0;else M=e.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){i=M;t:{var D=e;h=Wo;var k=D.current.memoizedState.isDehydrated;if(k&&(Tr(D,M).flags|=256),M=vh(D,M,!1),M!==2){if(uh&&!k){D.errorRecoveryDisabledLanes|=m,Fs|=m,h=4;break t}m=ti,ti=h,m!==null&&(ti===null?ti=m:ti.push.apply(ti,m))}h=M}if(m=!1,h!==2)continue}}if(h===1){Tr(e,0),es(e,i,0,!0);break}t:{switch(l=e,m=h,m){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:es(l,i,hi,!Qa);break t;case 2:ti=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(h=Sc+300-Te(),10<h)){if(es(l,i,hi,!Qa),xt(l,0,!0)!==0)break t;ba=i,l.timeoutHandle=uv(Og.bind(null,l,s,ti,Mc,hh,i,hi,Fs,br,Qa,m,"Throttled",-0,0),h);break t}Og(l,s,ti,Mc,hh,i,hi,Fs,br,Qa,m,null,-0,0)}}break}while(!0);Qi(e)}function Og(e,i,s,l,h,m,M,D,k,ut,St,Mt,ht,mt){if(e.timeoutHandle=-1,Mt=i.subtreeFlags,Mt&8192||(Mt&16785408)===16785408){Mt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Si},Ag(i,m,Mt);var Kt=(m&62914560)===m?Sc-Te():(m&4194048)===m?Dg-Te():0;if(Kt=tM(Mt,Kt),Kt!==null){ba=m,e.cancelPendingCommit=Kt(Vg.bind(null,e,i,m,s,l,h,M,D,k,St,Mt,null,ht,mt)),es(e,m,M,!ut);return}}Vg(e,i,m,s,l,h,M,D,k)}function gy(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var h=s[l],m=h.getSnapshot;h=h.value;try{if(!oi(m(),h))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function es(e,i,s,l){i&=~fh,i&=~Fs,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var h=i;0<h;){var m=31-Bt(h),M=1<<m;l[m]=-1,h&=~M}s!==0&&Ue(e,s,i)}function bc(){return(Be&6)===0?(Yo(0),!1):!0}function gh(){if(_e!==null){if(Ve===0)var e=_e.return;else e=_e,ha=Cs=null,Lf(e),mr=null,Co=0,e=_e;for(;e!==null;)fg(e.alternate,e),e=e.return;_e=null}}function Tr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,Iy(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ba=0,gh(),Qe=e,_e=s=ua(e.current,null),ye=i,Ve=0,fi=null,Qa=!1,Mr=Ut(e,i),uh=!1,br=hi=fh=Fs=ja=cn=0,ti=Wo=null,hh=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var h=31-Bt(l),m=1<<h;i|=e[h],l&=~m}return Ma=i,Xl(),s}function Pg(e,i){ce=null,F.H=zo,i===pr||i===jl?(i=Qm(),Ve=3):i===Sf?(i=Qm(),Ve=4):Ve=i===Zf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,fi=i,_e===null&&(cn=1,hc(e,Mi(i,e.current)))}function Ig(){var e=ci.current;return e===null?!0:(ye&4194048)===ye?Ai===null:(ye&62914560)===ye||(ye&536870912)!==0?e===Ai:!1}function zg(){var e=F.H;return F.H=zo,e===null?zo:e}function Fg(){var e=F.A;return F.A=py,e}function Ec(){cn=4,Qa||(ye&4194048)!==ye&&ci.current!==null||(Mr=!0),(ja&134217727)===0&&(Fs&134217727)===0||Qe===null||es(Qe,ye,hi,!1)}function vh(e,i,s){var l=Be;Be|=2;var h=zg(),m=Fg();(Qe!==e||ye!==i)&&(Mc=null,Tr(e,i)),i=!1;var M=cn;t:do try{if(Ve!==0&&_e!==null){var D=_e,k=fi;switch(Ve){case 8:gh(),M=6;break t;case 3:case 2:case 9:case 6:ci.current===null&&(i=!0);var ut=Ve;if(Ve=0,fi=null,Ar(e,D,k,ut),s&&Mr){M=0;break t}break;default:ut=Ve,Ve=0,fi=null,Ar(e,D,k,ut)}}vy(),M=cn;break}catch(St){Pg(e,St)}while(!0);return i&&e.shellSuspendCounter++,ha=Cs=null,Be=l,F.H=h,F.A=m,_e===null&&(Qe=null,ye=0,Xl()),M}function vy(){for(;_e!==null;)Bg(_e)}function _y(e,i){var s=Be;Be|=2;var l=zg(),h=Fg();Qe!==e||ye!==i?(Mc=null,yc=Te()+500,Tr(e,i)):Mr=Ut(e,i);t:do try{if(Ve!==0&&_e!==null){i=_e;var m=fi;e:switch(Ve){case 1:Ve=0,fi=null,Ar(e,i,m,1);break;case 2:case 9:if(Km(m)){Ve=0,fi=null,Hg(i);break}i=function(){Ve!==2&&Ve!==9||Qe!==e||(Ve=7),Qi(e)},m.then(i,i);break t;case 3:Ve=7;break t;case 4:Ve=5;break t;case 7:Km(m)?(Ve=0,fi=null,Hg(i)):(Ve=0,fi=null,Ar(e,i,m,7));break;case 5:var M=null;switch(_e.tag){case 26:M=_e.memoizedState;case 5:case 27:var D=_e;if(M?Tv(M):D.stateNode.complete){Ve=0,fi=null;var k=D.sibling;if(k!==null)_e=k;else{var ut=D.return;ut!==null?(_e=ut,Tc(ut)):_e=null}break e}}Ve=0,fi=null,Ar(e,i,m,5);break;case 6:Ve=0,fi=null,Ar(e,i,m,6);break;case 8:gh(),cn=6;break t;default:throw Error(a(462))}}xy();break}catch(St){Pg(e,St)}while(!0);return ha=Cs=null,F.H=l,F.A=h,Be=s,_e!==null?0:(Qe=null,ye=0,Xl(),cn)}function xy(){for(;_e!==null&&!je();)Bg(_e)}function Bg(e){var i=cg(e.alternate,e,Ma);e.memoizedProps=e.pendingProps,i===null?Tc(e):_e=i}function Hg(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=ig(s,i,i.pendingProps,i.type,void 0,ye);break;case 11:i=ig(s,i,i.pendingProps,i.type.render,i.ref,ye);break;case 5:Lf(i);default:fg(s,i),i=_e=Fm(i,Ma),i=cg(s,i,Ma)}e.memoizedProps=e.pendingProps,i===null?Tc(e):_e=i}function Ar(e,i,s,l){ha=Cs=null,Lf(i),mr=null,Co=0;var h=i.return;try{if(oy(e,h,i,s,ye)){cn=1,hc(e,Mi(s,e.current)),_e=null;return}}catch(m){if(h!==null)throw _e=h,m;cn=1,hc(e,Mi(s,e.current)),_e=null;return}i.flags&32768?(Ae||l===1?e=!0:Mr||(ye&536870912)!==0?e=!1:(Qa=e=!0,(l===2||l===9||l===3||l===6)&&(l=ci.current,l!==null&&l.tag===13&&(l.flags|=16384))),Gg(i,e)):Tc(i)}function Tc(e){var i=e;do{if((i.flags&32768)!==0){Gg(i,Qa);return}e=i.return;var s=uy(i.alternate,i,Ma);if(s!==null){_e=s;return}if(i=i.sibling,i!==null){_e=i;return}_e=i=e}while(i!==null);cn===0&&(cn=5)}function Gg(e,i){do{var s=fy(e.alternate,e);if(s!==null){s.flags&=32767,_e=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){_e=e;return}_e=e=s}while(e!==null);cn=6,_e=null}function Vg(e,i,s,l,h,m,M,D,k){e.cancelPendingCommit=null;do Ac();while(En!==0);if((Be&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(m=i.lanes|i.childLanes,m|=sf,We(e,s,m,M,D,k),e===Qe&&(_e=Qe=null,ye=0),Er=i,ts=e,ba=s,dh=m,ph=h,Ug=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,by(nt,function(){return Yg(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=F.T,F.T=null,h=X.p,X.p=2,M=Be,Be|=4;try{hy(e,i,s)}finally{Be=M,X.p=h,F.T=l}}En=1,kg(),Xg(),Wg()}}function kg(){if(En===1){En=0;var e=ts,i=Er,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=F.T,F.T=null;var l=X.p;X.p=2;var h=Be;Be|=4;try{bg(i,e);var m=Ch,M=Cm(e.containerInfo),D=m.focusedElem,k=m.selectionRange;if(M!==D&&D&&D.ownerDocument&&Rm(D.ownerDocument.documentElement,D)){if(k!==null&&$u(D)){var ut=k.start,St=k.end;if(St===void 0&&(St=ut),"selectionStart"in D)D.selectionStart=ut,D.selectionEnd=Math.min(St,D.value.length);else{var Mt=D.ownerDocument||document,ht=Mt&&Mt.defaultView||window;if(ht.getSelection){var mt=ht.getSelection(),Kt=D.textContent.length,ie=Math.min(k.start,Kt),Ke=k.end===void 0?ie:Math.min(k.end,Kt);!mt.extend&&ie>Ke&&(M=Ke,Ke=ie,ie=M);var st=wm(D,ie),K=wm(D,Ke);if(st&&K&&(mt.rangeCount!==1||mt.anchorNode!==st.node||mt.anchorOffset!==st.offset||mt.focusNode!==K.node||mt.focusOffset!==K.offset)){var ct=Mt.createRange();ct.setStart(st.node,st.offset),mt.removeAllRanges(),ie>Ke?(mt.addRange(ct),mt.extend(K.node,K.offset)):(ct.setEnd(K.node,K.offset),mt.addRange(ct))}}}}for(Mt=[],mt=D;mt=mt.parentNode;)mt.nodeType===1&&Mt.push({element:mt,left:mt.scrollLeft,top:mt.scrollTop});for(typeof D.focus=="function"&&D.focus(),D=0;D<Mt.length;D++){var yt=Mt[D];yt.element.scrollLeft=yt.left,yt.element.scrollTop=yt.top}}Fc=!!Rh,Ch=Rh=null}finally{Be=h,X.p=l,F.T=s}}e.current=i,En=2}}function Xg(){if(En===2){En=0;var e=ts,i=Er,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=F.T,F.T=null;var l=X.p;X.p=2;var h=Be;Be|=4;try{_g(e,i.alternate,i)}finally{Be=h,X.p=l,F.T=s}}En=3}}function Wg(){if(En===4||En===3){En=0,Q();var e=ts,i=Er,s=ba,l=Ug;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?En=5:(En=0,Er=ts=null,qg(e,e.pendingLanes));var h=e.pendingLanes;if(h===0&&($a=null),ho(s),i=i.stateNode,_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(vt,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=F.T,h=X.p,X.p=2,F.T=null;try{for(var m=e.onRecoverableError,M=0;M<l.length;M++){var D=l[M];m(D.value,{componentStack:D.stack})}}finally{F.T=i,X.p=h}}(ba&3)!==0&&Ac(),Qi(e),h=e.pendingLanes,(s&261930)!==0&&(h&42)!==0?e===mh?qo++:(qo=0,mh=e):qo=0,Yo(0)}}function qg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,wo(i)))}function Ac(){return kg(),Xg(),Wg(),Yg()}function Yg(){if(En!==5)return!1;var e=ts,i=dh;dh=0;var s=ho(ba),l=F.T,h=X.p;try{X.p=32>s?32:s,F.T=null,s=ph,ph=null;var m=ts,M=ba;if(En=0,Er=ts=null,ba=0,(Be&6)!==0)throw Error(a(331));var D=Be;if(Be|=4,Rg(m.current),Tg(m,m.current,M,s),Be=D,Yo(0,!1),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(vt,m)}catch{}return!0}finally{X.p=h,F.T=l,qg(e,i)}}function Zg(e,i,s){i=Mi(s,i),i=Yf(e.stateNode,i,2),e=Ya(e,i,2),e!==null&&(Yt(e,2),Qi(e))}function ke(e,i,s){if(e.tag===3)Zg(e,e,s);else for(;i!==null;){if(i.tag===3){Zg(i,e,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&($a===null||!$a.has(l))){e=Mi(s,e),s=K0(2),l=Ya(i,s,2),l!==null&&(J0(s,l,i,e),Yt(l,2),Qi(l));break}}i=i.return}}function _h(e,i,s){var l=e.pingCache;if(l===null){l=e.pingCache=new my;var h=new Set;l.set(i,h)}else h=l.get(i),h===void 0&&(h=new Set,l.set(i,h));h.has(s)||(uh=!0,h.add(s),e=Sy.bind(null,e,i,s),i.then(e,e))}function Sy(e,i,s){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Qe===e&&(ye&s)===s&&(cn===4||cn===3&&(ye&62914560)===ye&&300>Te()-Sc?(Be&2)===0&&Tr(e,0):fh|=s,br===ye&&(br=0)),Qi(e)}function Kg(e,i){i===0&&(i=Et()),e=As(e,i),e!==null&&(Yt(e,i),Qi(e))}function yy(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),Kg(e,s)}function My(e,i){var s=0;switch(e.tag){case 31:case 13:var l=e.stateNode,h=e.memoizedState;h!==null&&(s=h.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),Kg(e,s)}function by(e,i){return fn(e,i)}var wc=null,wr=null,xh=!1,Rc=!1,Sh=!1,ns=0;function Qi(e){e!==wr&&e.next===null&&(wr===null?wc=wr=e:wr=wr.next=e),Rc=!0,xh||(xh=!0,Ty())}function Yo(e,i){if(!Sh&&Rc){Sh=!0;do for(var s=!1,l=wc;l!==null;){if(e!==0){var h=l.pendingLanes;if(h===0)var m=0;else{var M=l.suspendedLanes,D=l.pingedLanes;m=(1<<31-Bt(42|e)+1)-1,m&=h&~(M&~D),m=m&201326741?m&201326741|1:m?m|2:0}m!==0&&(s=!0,$g(l,m))}else m=ye,m=xt(l,l===Qe?m:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(m&3)===0||Ut(l,m)||(s=!0,$g(l,m));l=l.next}while(s);Sh=!1}}function Ey(){Jg()}function Jg(){Rc=xh=!1;var e=0;ns!==0&&Py()&&(e=ns);for(var i=Te(),s=null,l=wc;l!==null;){var h=l.next,m=Qg(l,i);m===0?(l.next=null,s===null?wc=h:s.next=h,h===null&&(wr=s)):(s=l,(e!==0||(m&3)!==0)&&(Rc=!0)),l=h}En!==0&&En!==5||Yo(e),ns!==0&&(ns=0)}function Qg(e,i){for(var s=e.suspendedLanes,l=e.pingedLanes,h=e.expirationTimes,m=e.pendingLanes&-62914561;0<m;){var M=31-Bt(m),D=1<<M,k=h[M];k===-1?((D&s)===0||(D&l)!==0)&&(h[M]=Ht(D,i)):k<=i&&(e.expiredLanes|=D),m&=~D}if(i=Qe,s=ye,s=xt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,s===0||e===i&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Re(l),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||Ut(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(l!==null&&Re(l),ho(s)){case 2:case 8:s=E;break;case 32:s=nt;break;case 268435456:s=gt;break;default:s=nt}return l=jg.bind(null,e),s=fn(s,l),e.callbackPriority=i,e.callbackNode=s,i}return l!==null&&l!==null&&Re(l),e.callbackPriority=2,e.callbackNode=null,2}function jg(e,i){if(En!==0&&En!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(Ac()&&e.callbackNode!==s)return null;var l=ye;return l=xt(e,e===Qe?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(Ng(e,l,i),Qg(e,Te()),e.callbackNode!=null&&e.callbackNode===s?jg.bind(null,e):null)}function $g(e,i){if(Ac())return null;Ng(e,i,!0)}function Ty(){zy(function(){(Be&6)!==0?fn(z,Ey):Jg()})}function yh(){if(ns===0){var e=hr;e===0&&(e=jt,jt<<=1,(jt&261888)===0&&(jt=256)),ns=e}return ns}function tv(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ni(""+e)}function ev(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function Ay(e,i,s,l,h){if(i==="submit"&&s&&s.stateNode===h){var m=tv((h[Un]||null).action),M=l.submitter;M&&(i=(i=M[Un]||null)?tv(i.formAction):M.getAttribute("formAction"),i!==null&&(m=i,M=null));var D=new Hl("action","action",null,l,h);e.push({event:D,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ns!==0){var k=M?ev(h,M):new FormData(h);Gf(s,{pending:!0,data:k,method:h.method,action:m},null,k)}}else typeof m=="function"&&(D.preventDefault(),k=M?ev(h,M):new FormData(h),Gf(s,{pending:!0,data:k,method:h.method,action:m},m,k))},currentTarget:h}]})}}for(var Mh=0;Mh<af.length;Mh++){var bh=af[Mh],wy=bh.toLowerCase(),Ry=bh[0].toUpperCase()+bh.slice(1);Oi(wy,"on"+Ry)}Oi(Lm,"onAnimationEnd"),Oi(Nm,"onAnimationIteration"),Oi(Om,"onAnimationStart"),Oi("dblclick","onDoubleClick"),Oi("focusin","onFocus"),Oi("focusout","onBlur"),Oi(XS,"onTransitionRun"),Oi(WS,"onTransitionStart"),Oi(qS,"onTransitionCancel"),Oi(Pm,"onTransitionEnd"),Z("onMouseEnter",["mouseout","mouseover"]),Z("onMouseLeave",["mouseout","mouseover"]),Z("onPointerEnter",["pointerout","pointerover"]),Z("onPointerLeave",["pointerout","pointerover"]),R("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),R("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),R("onBeforeInput",["compositionend","keypress","textInput","paste"]),R("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zo));function nv(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var l=e[s],h=l.event;l=l.listeners;t:{var m=void 0;if(i)for(var M=l.length-1;0<=M;M--){var D=l[M],k=D.instance,ut=D.currentTarget;if(D=D.listener,k!==m&&h.isPropagationStopped())break t;m=D,h.currentTarget=ut;try{m(h)}catch(St){kl(St)}h.currentTarget=null,m=k}else for(M=0;M<l.length;M++){if(D=l[M],k=D.instance,ut=D.currentTarget,D=D.listener,k!==m&&h.isPropagationStopped())break t;m=D,h.currentTarget=ut;try{m(h)}catch(St){kl(St)}h.currentTarget=null,m=k}}}}function xe(e,i){var s=i[Ss];s===void 0&&(s=i[Ss]=new Set);var l=e+"__bubble";s.has(l)||(iv(i,e,2,!1),s.add(l))}function Eh(e,i,s){var l=0;i&&(l|=4),iv(s,e,l,i)}var Cc="_reactListening"+Math.random().toString(36).slice(2);function Th(e){if(!e[Cc]){e[Cc]=!0,Il.forEach(function(s){s!=="selectionchange"&&(Cy.has(s)||Eh(s,!1,e),Eh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[Cc]||(i[Cc]=!0,Eh("selectionchange",!1,i))}}function iv(e,i,s,l){switch(Lv(i)){case 2:var h=iM;break;case 8:h=aM;break;default:h=Hh}s=h.bind(null,i,s,e),h=void 0,!Xu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(h=!0),l?h!==void 0?e.addEventListener(i,s,{capture:!0,passive:h}):e.addEventListener(i,s,!0):h!==void 0?e.addEventListener(i,s,{passive:h}):e.addEventListener(i,s,!1)}function Ah(e,i,s,l,h){var m=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var M=l.tag;if(M===3||M===4){var D=l.stateNode.containerInfo;if(D===h)break;if(M===4)for(M=l.return;M!==null;){var k=M.tag;if((k===3||k===4)&&M.stateNode.containerInfo===h)return;M=M.return}for(;D!==null;){if(M=oa(D),M===null)return;if(k=M.tag,k===5||k===6||k===26||k===27){l=m=M;continue t}D=D.parentNode}}l=l.return}lm(function(){var ut=m,St=Vu(s),Mt=[];t:{var ht=Im.get(e);if(ht!==void 0){var mt=Hl,Kt=e;switch(e){case"keypress":if(Fl(s)===0)break t;case"keydown":case"keyup":mt=MS;break;case"focusin":Kt="focus",mt=Zu;break;case"focusout":Kt="blur",mt=Zu;break;case"beforeblur":case"afterblur":mt=Zu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":mt=fm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":mt=uS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":mt=TS;break;case Lm:case Nm:case Om:mt=dS;break;case Pm:mt=wS;break;case"scroll":case"scrollend":mt=lS;break;case"wheel":mt=CS;break;case"copy":case"cut":case"paste":mt=mS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":mt=dm;break;case"toggle":case"beforetoggle":mt=US}var ie=(i&4)!==0,Ke=!ie&&(e==="scroll"||e==="scrollend"),st=ie?ht!==null?ht+"Capture":null:ht;ie=[];for(var K=ut,ct;K!==null;){var yt=K;if(ct=yt.stateNode,yt=yt.tag,yt!==5&&yt!==26&&yt!==27||ct===null||st===null||(yt=go(K,st),yt!=null&&ie.push(Ko(K,yt,ct))),Ke)break;K=K.return}0<ie.length&&(ht=new mt(ht,Kt,null,s,St),Mt.push({event:ht,listeners:ie}))}}if((i&7)===0){t:{if(ht=e==="mouseover"||e==="pointerover",mt=e==="mouseout"||e==="pointerout",ht&&s!==Gu&&(Kt=s.relatedTarget||s.fromElement)&&(oa(Kt)||Kt[Kn]))break t;if((mt||ht)&&(ht=St.window===St?St:(ht=St.ownerDocument)?ht.defaultView||ht.parentWindow:window,mt?(Kt=s.relatedTarget||s.toElement,mt=ut,Kt=Kt?oa(Kt):null,Kt!==null&&(Ke=c(Kt),ie=Kt.tag,Kt!==Ke||ie!==5&&ie!==27&&ie!==6)&&(Kt=null)):(mt=null,Kt=ut),mt!==Kt)){if(ie=fm,yt="onMouseLeave",st="onMouseEnter",K="mouse",(e==="pointerout"||e==="pointerover")&&(ie=dm,yt="onPointerLeave",st="onPointerEnter",K="pointer"),Ke=mt==null?ht:Ms(mt),ct=Kt==null?ht:Ms(Kt),ht=new ie(yt,K+"leave",mt,s,St),ht.target=Ke,ht.relatedTarget=ct,yt=null,oa(St)===ut&&(ie=new ie(st,K+"enter",Kt,s,St),ie.target=ct,ie.relatedTarget=Ke,yt=ie),Ke=yt,mt&&Kt)e:{for(ie=Dy,st=mt,K=Kt,ct=0,yt=st;yt;yt=ie(yt))ct++;yt=0;for(var te=K;te;te=ie(te))yt++;for(;0<ct-yt;)st=ie(st),ct--;for(;0<yt-ct;)K=ie(K),yt--;for(;ct--;){if(st===K||K!==null&&st===K.alternate){ie=st;break e}st=ie(st),K=ie(K)}ie=null}else ie=null;mt!==null&&av(Mt,ht,mt,ie,!1),Kt!==null&&Ke!==null&&av(Mt,Ke,Kt,ie,!0)}}t:{if(ht=ut?Ms(ut):window,mt=ht.nodeName&&ht.nodeName.toLowerCase(),mt==="select"||mt==="input"&&ht.type==="file")var Pe=ym;else if(xm(ht))if(Mm)Pe=GS;else{Pe=BS;var Jt=FS}else mt=ht.nodeName,!mt||mt.toLowerCase()!=="input"||ht.type!=="checkbox"&&ht.type!=="radio"?ut&&xi(ut.elementType)&&(Pe=ym):Pe=HS;if(Pe&&(Pe=Pe(e,ut))){Sm(Mt,Pe,s,St);break t}Jt&&Jt(e,ht,ut),e==="focusout"&&ut&&ht.type==="number"&&ut.memoizedProps.value!=null&&bn(ht,"number",ht.value)}switch(Jt=ut?Ms(ut):window,e){case"focusin":(xm(Jt)||Jt.contentEditable==="true")&&(ar=Jt,tf=ut,Eo=null);break;case"focusout":Eo=tf=ar=null;break;case"mousedown":ef=!0;break;case"contextmenu":case"mouseup":case"dragend":ef=!1,Dm(Mt,s,St);break;case"selectionchange":if(kS)break;case"keydown":case"keyup":Dm(Mt,s,St)}var fe;if(Ju)t:{switch(e){case"compositionstart":var Me="onCompositionStart";break t;case"compositionend":Me="onCompositionEnd";break t;case"compositionupdate":Me="onCompositionUpdate";break t}Me=void 0}else ir?vm(e,s)&&(Me="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(Me="onCompositionStart");Me&&(pm&&s.locale!=="ko"&&(ir||Me!=="onCompositionStart"?Me==="onCompositionEnd"&&ir&&(fe=cm()):(Ha=St,Wu="value"in Ha?Ha.value:Ha.textContent,ir=!0)),Jt=Dc(ut,Me),0<Jt.length&&(Me=new hm(Me,e,null,s,St),Mt.push({event:Me,listeners:Jt}),fe?Me.data=fe:(fe=_m(s),fe!==null&&(Me.data=fe)))),(fe=NS?OS(e,s):PS(e,s))&&(Me=Dc(ut,"onBeforeInput"),0<Me.length&&(Jt=new hm("onBeforeInput","beforeinput",null,s,St),Mt.push({event:Jt,listeners:Me}),Jt.data=fe)),Ay(Mt,e,ut,s,St)}nv(Mt,i)})}function Ko(e,i,s){return{instance:e,listener:i,currentTarget:s}}function Dc(e,i){for(var s=i+"Capture",l=[];e!==null;){var h=e,m=h.stateNode;if(h=h.tag,h!==5&&h!==26&&h!==27||m===null||(h=go(e,s),h!=null&&l.unshift(Ko(e,h,m)),h=go(e,i),h!=null&&l.push(Ko(e,h,m))),e.tag===3)return l;e=e.return}return[]}function Dy(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function av(e,i,s,l,h){for(var m=i._reactName,M=[];s!==null&&s!==l;){var D=s,k=D.alternate,ut=D.stateNode;if(D=D.tag,k!==null&&k===l)break;D!==5&&D!==26&&D!==27||ut===null||(k=ut,h?(ut=go(s,m),ut!=null&&M.unshift(Ko(s,ut,k))):h||(ut=go(s,m),ut!=null&&M.push(Ko(s,ut,k)))),s=s.return}M.length!==0&&e.push({event:i,listeners:M})}var Uy=/\r\n?/g,Ly=/\u0000|\uFFFD/g;function sv(e){return(typeof e=="string"?e:""+e).replace(Uy,`
`).replace(Ly,"")}function rv(e,i){return i=sv(i),sv(e)===i}function Ze(e,i,s,l,h,m){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Vn(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Vn(e,""+l);break;case"className":Pt(e,"class",l);break;case"tabIndex":Pt(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Pt(e,s,l);break;case"style":sn(e,l,m);break;case"data":if(i!=="object"){Pt(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Ni(""+l),e.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof m=="function"&&(s==="formAction"?(i!=="input"&&Ze(e,i,"name",h.name,h,null),Ze(e,i,"formEncType",h.formEncType,h,null),Ze(e,i,"formMethod",h.formMethod,h,null),Ze(e,i,"formTarget",h.formTarget,h,null)):(Ze(e,i,"encType",h.encType,h,null),Ze(e,i,"method",h.method,h,null),Ze(e,i,"target",h.target,h,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Ni(""+l),e.setAttribute(s,l);break;case"onClick":l!=null&&(e.onclick=Si);break;case"onScroll":l!=null&&xe("scroll",e);break;case"onScrollEnd":l!=null&&xe("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(h.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}s=Ni(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""+l):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":l===!0?e.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,l):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(s,l):e.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(s):e.setAttribute(s,l);break;case"popover":xe("beforetoggle",e),xe("toggle",e),kt(e,"popover",l);break;case"xlinkActuate":Gt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Gt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Gt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Gt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Gt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Gt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Gt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Gt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Gt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":kt(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=qe.get(s)||s,kt(e,s,l))}}function wh(e,i,s,l,h,m){switch(s){case"style":sn(e,l,m);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(h.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof l=="string"?Vn(e,l):(typeof l=="number"||typeof l=="bigint")&&Vn(e,""+l);break;case"onScroll":l!=null&&xe("scroll",e);break;case"onScrollEnd":l!=null&&xe("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Si);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!mo.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(h=s.endsWith("Capture"),i=s.slice(2,h?s.length-7:void 0),m=e[Un]||null,m=m!=null?m[s]:null,typeof m=="function"&&e.removeEventListener(i,m,h),typeof l=="function")){typeof m!="function"&&m!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,l,h);break t}s in e?e[s]=l:l===!0?e.setAttribute(s,""):kt(e,s,l)}}}function Pn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",e),xe("load",e);var l=!1,h=!1,m;for(m in s)if(s.hasOwnProperty(m)){var M=s[m];if(M!=null)switch(m){case"src":l=!0;break;case"srcSet":h=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,m,M,s,null)}}h&&Ze(e,i,"srcSet",s.srcSet,s,null),l&&Ze(e,i,"src",s.src,s,null);return;case"input":xe("invalid",e);var D=m=M=h=null,k=null,ut=null;for(l in s)if(s.hasOwnProperty(l)){var St=s[l];if(St!=null)switch(l){case"name":h=St;break;case"type":M=St;break;case"checked":k=St;break;case"defaultChecked":ut=St;break;case"value":m=St;break;case"defaultValue":D=St;break;case"children":case"dangerouslySetInnerHTML":if(St!=null)throw Error(a(137,i));break;default:Ze(e,i,l,St,s,null)}}Xt(e,m,D,k,ut,M,h,!1);return;case"select":xe("invalid",e),l=M=m=null;for(h in s)if(s.hasOwnProperty(h)&&(D=s[h],D!=null))switch(h){case"value":m=D;break;case"defaultValue":M=D;break;case"multiple":l=D;default:Ze(e,i,h,D,s,null)}i=m,s=M,e.multiple=!!l,i!=null?de(e,!!l,i,!1):s!=null&&de(e,!!l,s,!0);return;case"textarea":xe("invalid",e),m=h=l=null;for(M in s)if(s.hasOwnProperty(M)&&(D=s[M],D!=null))switch(M){case"value":l=D;break;case"defaultValue":h=D;break;case"children":m=D;break;case"dangerouslySetInnerHTML":if(D!=null)throw Error(a(91));break;default:Ze(e,i,M,D,s,null)}ri(e,l,h,m);return;case"option":for(k in s)if(s.hasOwnProperty(k)&&(l=s[k],l!=null))switch(k){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Ze(e,i,k,l,s,null)}return;case"dialog":xe("beforetoggle",e),xe("toggle",e),xe("cancel",e),xe("close",e);break;case"iframe":case"object":xe("load",e);break;case"video":case"audio":for(l=0;l<Zo.length;l++)xe(Zo[l],e);break;case"image":xe("error",e),xe("load",e);break;case"details":xe("toggle",e);break;case"embed":case"source":case"link":xe("error",e),xe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ut in s)if(s.hasOwnProperty(ut)&&(l=s[ut],l!=null))switch(ut){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,ut,l,s,null)}return;default:if(xi(i)){for(St in s)s.hasOwnProperty(St)&&(l=s[St],l!==void 0&&wh(e,i,St,l,s,void 0));return}}for(D in s)s.hasOwnProperty(D)&&(l=s[D],l!=null&&Ze(e,i,D,l,s,null))}function Ny(e,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var h=null,m=null,M=null,D=null,k=null,ut=null,St=null;for(mt in s){var Mt=s[mt];if(s.hasOwnProperty(mt)&&Mt!=null)switch(mt){case"checked":break;case"value":break;case"defaultValue":k=Mt;default:l.hasOwnProperty(mt)||Ze(e,i,mt,null,l,Mt)}}for(var ht in l){var mt=l[ht];if(Mt=s[ht],l.hasOwnProperty(ht)&&(mt!=null||Mt!=null))switch(ht){case"type":m=mt;break;case"name":h=mt;break;case"checked":ut=mt;break;case"defaultChecked":St=mt;break;case"value":M=mt;break;case"defaultValue":D=mt;break;case"children":case"dangerouslySetInnerHTML":if(mt!=null)throw Error(a(137,i));break;default:mt!==Mt&&Ze(e,i,ht,mt,l,Mt)}}gn(e,M,D,k,ut,St,m,h);return;case"select":mt=M=D=ht=null;for(m in s)if(k=s[m],s.hasOwnProperty(m)&&k!=null)switch(m){case"value":break;case"multiple":mt=k;default:l.hasOwnProperty(m)||Ze(e,i,m,null,l,k)}for(h in l)if(m=l[h],k=s[h],l.hasOwnProperty(h)&&(m!=null||k!=null))switch(h){case"value":ht=m;break;case"defaultValue":D=m;break;case"multiple":M=m;default:m!==k&&Ze(e,i,h,m,l,k)}i=D,s=M,l=mt,ht!=null?de(e,!!s,ht,!1):!!l!=!!s&&(i!=null?de(e,!!s,i,!0):de(e,!!s,s?[]:"",!1));return;case"textarea":mt=ht=null;for(D in s)if(h=s[D],s.hasOwnProperty(D)&&h!=null&&!l.hasOwnProperty(D))switch(D){case"value":break;case"children":break;default:Ze(e,i,D,null,l,h)}for(M in l)if(h=l[M],m=s[M],l.hasOwnProperty(M)&&(h!=null||m!=null))switch(M){case"value":ht=h;break;case"defaultValue":mt=h;break;case"children":break;case"dangerouslySetInnerHTML":if(h!=null)throw Error(a(91));break;default:h!==m&&Ze(e,i,M,h,l,m)}Gn(e,ht,mt);return;case"option":for(var Kt in s)if(ht=s[Kt],s.hasOwnProperty(Kt)&&ht!=null&&!l.hasOwnProperty(Kt))switch(Kt){case"selected":e.selected=!1;break;default:Ze(e,i,Kt,null,l,ht)}for(k in l)if(ht=l[k],mt=s[k],l.hasOwnProperty(k)&&ht!==mt&&(ht!=null||mt!=null))switch(k){case"selected":e.selected=ht&&typeof ht!="function"&&typeof ht!="symbol";break;default:Ze(e,i,k,ht,l,mt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ie in s)ht=s[ie],s.hasOwnProperty(ie)&&ht!=null&&!l.hasOwnProperty(ie)&&Ze(e,i,ie,null,l,ht);for(ut in l)if(ht=l[ut],mt=s[ut],l.hasOwnProperty(ut)&&ht!==mt&&(ht!=null||mt!=null))switch(ut){case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(a(137,i));break;default:Ze(e,i,ut,ht,l,mt)}return;default:if(xi(i)){for(var Ke in s)ht=s[Ke],s.hasOwnProperty(Ke)&&ht!==void 0&&!l.hasOwnProperty(Ke)&&wh(e,i,Ke,void 0,l,ht);for(St in l)ht=l[St],mt=s[St],!l.hasOwnProperty(St)||ht===mt||ht===void 0&&mt===void 0||wh(e,i,St,ht,l,mt);return}}for(var st in s)ht=s[st],s.hasOwnProperty(st)&&ht!=null&&!l.hasOwnProperty(st)&&Ze(e,i,st,null,l,ht);for(Mt in l)ht=l[Mt],mt=s[Mt],!l.hasOwnProperty(Mt)||ht===mt||ht==null&&mt==null||Ze(e,i,Mt,ht,l,mt)}function ov(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Oy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var h=s[l],m=h.transferSize,M=h.initiatorType,D=h.duration;if(m&&D&&ov(M)){for(M=0,D=h.responseEnd,l+=1;l<s.length;l++){var k=s[l],ut=k.startTime;if(ut>D)break;var St=k.transferSize,Mt=k.initiatorType;St&&ov(Mt)&&(k=k.responseEnd,M+=St*(k<D?1:(D-ut)/(k-ut)))}if(--l,i+=8*(m+M)/(h.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Rh=null,Ch=null;function Uc(e){return e.nodeType===9?e:e.ownerDocument}function lv(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function cv(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function Dh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Uh=null;function Py(){var e=window.event;return e&&e.type==="popstate"?e===Uh?!1:(Uh=e,!0):(Uh=null,!1)}var uv=typeof setTimeout=="function"?setTimeout:void 0,Iy=typeof clearTimeout=="function"?clearTimeout:void 0,fv=typeof Promise=="function"?Promise:void 0,zy=typeof queueMicrotask=="function"?queueMicrotask:typeof fv<"u"?function(e){return fv.resolve(null).then(e).catch(Fy)}:uv;function Fy(e){setTimeout(function(){throw e})}function is(e){return e==="head"}function hv(e,i){var s=i,l=0;do{var h=s.nextSibling;if(e.removeChild(s),h&&h.nodeType===8)if(s=h.data,s==="/$"||s==="/&"){if(l===0){e.removeChild(h),Ur(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")Jo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Jo(s);for(var m=s.firstChild;m;){var M=m.nextSibling,D=m.nodeName;m[Ia]||D==="SCRIPT"||D==="STYLE"||D==="LINK"&&m.rel.toLowerCase()==="stylesheet"||s.removeChild(m),m=M}}else s==="body"&&Jo(e.ownerDocument.body);s=h}while(s);Ur(i)}function dv(e,i){var s=e;e=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=l}while(s)}function Lh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Lh(s),za(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function By(e,i,s,l){for(;e.nodeType===1;){var h=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Ia])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(m=e.getAttribute("rel"),m==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(m!==h.rel||e.getAttribute("href")!==(h.href==null||h.href===""?null:h.href)||e.getAttribute("crossorigin")!==(h.crossOrigin==null?null:h.crossOrigin)||e.getAttribute("title")!==(h.title==null?null:h.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(m=e.getAttribute("src"),(m!==(h.src==null?null:h.src)||e.getAttribute("type")!==(h.type==null?null:h.type)||e.getAttribute("crossorigin")!==(h.crossOrigin==null?null:h.crossOrigin))&&m&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var m=h.name==null?null:""+h.name;if(h.type==="hidden"&&e.getAttribute("name")===m)return e}else return e;if(e=wi(e.nextSibling),e===null)break}return null}function Hy(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=wi(e.nextSibling),e===null))return null;return e}function pv(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=wi(e.nextSibling),e===null))return null;return e}function Nh(e){return e.data==="$?"||e.data==="$~"}function Oh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Gy(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function wi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Ph=null;function mv(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return wi(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function gv(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function vv(e,i,s){switch(i=Uc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Jo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);za(e)}var Ri=new Map,_v=new Set;function Lc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ea=X.d;X.d={f:Vy,r:ky,D:Xy,C:Wy,L:qy,m:Yy,X:Ky,S:Zy,M:Jy};function Vy(){var e=Ea.f(),i=bc();return e||i}function ky(e){var i=la(e);i!==null&&i.tag===5&&i.type==="form"?P0(i):Ea.r(e)}var Rr=typeof document>"u"?null:document;function xv(e,i,s){var l=Rr;if(l&&typeof i=="string"&&i){var h=he(i);h='link[rel="'+e+'"][href="'+h+'"]',typeof s=="string"&&(h+='[crossorigin="'+s+'"]'),_v.has(h)||(_v.add(h),e={rel:e,crossOrigin:s,href:i},l.querySelector(h)===null&&(i=l.createElement("link"),Pn(i,"link",e),mn(i),l.head.appendChild(i)))}}function Xy(e){Ea.D(e),xv("dns-prefetch",e,null)}function Wy(e,i){Ea.C(e,i),xv("preconnect",e,i)}function qy(e,i,s){Ea.L(e,i,s);var l=Rr;if(l&&e&&i){var h='link[rel="preload"][as="'+he(i)+'"]';i==="image"&&s&&s.imageSrcSet?(h+='[imagesrcset="'+he(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(h+='[imagesizes="'+he(s.imageSizes)+'"]')):h+='[href="'+he(e)+'"]';var m=h;switch(i){case"style":m=Cr(e);break;case"script":m=Dr(e)}Ri.has(m)||(e=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Ri.set(m,e),l.querySelector(h)!==null||i==="style"&&l.querySelector(Qo(m))||i==="script"&&l.querySelector(jo(m))||(i=l.createElement("link"),Pn(i,"link",e),mn(i),l.head.appendChild(i)))}}function Yy(e,i){Ea.m(e,i);var s=Rr;if(s&&e){var l=i&&typeof i.as=="string"?i.as:"script",h='link[rel="modulepreload"][as="'+he(l)+'"][href="'+he(e)+'"]',m=h;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":m=Dr(e)}if(!Ri.has(m)&&(e=_({rel:"modulepreload",href:e},i),Ri.set(m,e),s.querySelector(h)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(jo(m)))return}l=s.createElement("link"),Pn(l,"link",e),mn(l),s.head.appendChild(l)}}}function Zy(e,i,s){Ea.S(e,i,s);var l=Rr;if(l&&e){var h=Fa(l).hoistableStyles,m=Cr(e);i=i||"default";var M=h.get(m);if(!M){var D={loading:0,preload:null};if(M=l.querySelector(Qo(m)))D.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Ri.get(m))&&Ih(e,s);var k=M=l.createElement("link");mn(k),Pn(k,"link",e),k._p=new Promise(function(ut,St){k.onload=ut,k.onerror=St}),k.addEventListener("load",function(){D.loading|=1}),k.addEventListener("error",function(){D.loading|=2}),D.loading|=4,Nc(M,i,l)}M={type:"stylesheet",instance:M,count:1,state:D},h.set(m,M)}}}function Ky(e,i){Ea.X(e,i);var s=Rr;if(s&&e){var l=Fa(s).hoistableScripts,h=Dr(e),m=l.get(h);m||(m=s.querySelector(jo(h)),m||(e=_({src:e,async:!0},i),(i=Ri.get(h))&&zh(e,i),m=s.createElement("script"),mn(m),Pn(m,"link",e),s.head.appendChild(m)),m={type:"script",instance:m,count:1,state:null},l.set(h,m))}}function Jy(e,i){Ea.M(e,i);var s=Rr;if(s&&e){var l=Fa(s).hoistableScripts,h=Dr(e),m=l.get(h);m||(m=s.querySelector(jo(h)),m||(e=_({src:e,async:!0,type:"module"},i),(i=Ri.get(h))&&zh(e,i),m=s.createElement("script"),mn(m),Pn(m,"link",e),s.head.appendChild(m)),m={type:"script",instance:m,count:1,state:null},l.set(h,m))}}function Sv(e,i,s,l){var h=(h=Dt.current)?Lc(h):null;if(!h)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Cr(s.href),s=Fa(h).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Cr(s.href);var m=Fa(h).hoistableStyles,M=m.get(e);if(M||(h=h.ownerDocument||h,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},m.set(e,M),(m=h.querySelector(Qo(e)))&&!m._p&&(M.instance=m,M.state.loading=5),Ri.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ri.set(e,s),m||Qy(h,e,s,M.state))),i&&l===null)throw Error(a(528,""));return M}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Dr(s),s=Fa(h).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Cr(e){return'href="'+he(e)+'"'}function Qo(e){return'link[rel="stylesheet"]['+e+"]"}function yv(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function Qy(e,i,s,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Pn(i,"link",s),mn(i),e.head.appendChild(i))}function Dr(e){return'[src="'+he(e)+'"]'}function jo(e){return"script[async]"+e}function Mv(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+he(s.href)+'"]');if(l)return i.instance=l,mn(l),l;var h=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),mn(l),Pn(l,"style",h),Nc(l,s.precedence,e),i.instance=l;case"stylesheet":h=Cr(s.href);var m=e.querySelector(Qo(h));if(m)return i.state.loading|=4,i.instance=m,mn(m),m;l=yv(s),(h=Ri.get(h))&&Ih(l,h),m=(e.ownerDocument||e).createElement("link"),mn(m);var M=m;return M._p=new Promise(function(D,k){M.onload=D,M.onerror=k}),Pn(m,"link",l),i.state.loading|=4,Nc(m,s.precedence,e),i.instance=m;case"script":return m=Dr(s.src),(h=e.querySelector(jo(m)))?(i.instance=h,mn(h),h):(l=s,(h=Ri.get(m))&&(l=_({},s),zh(l,h)),e=e.ownerDocument||e,h=e.createElement("script"),mn(h),Pn(h,"link",l),e.head.appendChild(h),i.instance=h);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Nc(l,s.precedence,e));return i.instance}function Nc(e,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),h=l.length?l[l.length-1]:null,m=h,M=0;M<l.length;M++){var D=l[M];if(D.dataset.precedence===i)m=D;else if(m!==h)break}m?m.parentNode.insertBefore(e,m.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function Ih(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function zh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Oc=null;function bv(e,i,s){if(Oc===null){var l=new Map,h=Oc=new Map;h.set(s,l)}else h=Oc,l=h.get(s),l||(l=new Map,h.set(s,l));if(l.has(e))return l;for(l.set(e,null),s=s.getElementsByTagName(e),h=0;h<s.length;h++){var m=s[h];if(!(m[Ia]||m[pn]||e==="link"&&m.getAttribute("rel")==="stylesheet")&&m.namespaceURI!=="http://www.w3.org/2000/svg"){var M=m.getAttribute(i)||"";M=e+M;var D=l.get(M);D?D.push(m):l.set(M,[m])}}return l}function Ev(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function jy(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Tv(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function $y(e,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var h=Cr(l.href),m=i.querySelector(Qo(h));if(m){i=m._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=Pc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=m,mn(m);return}m=i.ownerDocument||i,l=yv(l),(h=Ri.get(h))&&Ih(l,h),m=m.createElement("link"),mn(m);var M=m;M._p=new Promise(function(D,k){M.onload=D,M.onerror=k}),Pn(m,"link",l),s.instance=m}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=Pc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Fh=0;function tM(e,i){return e.stylesheets&&e.count===0&&zc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var l=setTimeout(function(){if(e.stylesheets&&zc(e,e.stylesheets),e.unsuspend){var m=e.unsuspend;e.unsuspend=null,m()}},6e4+i);0<e.imgBytes&&Fh===0&&(Fh=62500*Oy());var h=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&zc(e,e.stylesheets),e.unsuspend)){var m=e.unsuspend;e.unsuspend=null,m()}},(e.imgBytes>Fh?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(h)}}:null}function Pc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)zc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ic=null;function zc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ic=new Map,i.forEach(eM,e),Ic=null,Pc.call(e))}function eM(e,i){if(!(i.state.loading&4)){var s=Ic.get(e);if(s)var l=s.get(null);else{s=new Map,Ic.set(e,s);for(var h=e.querySelectorAll("link[data-precedence],style[data-precedence]"),m=0;m<h.length;m++){var M=h[m];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(s.set(M.dataset.precedence,M),l=M)}l&&s.set(null,l)}h=i.instance,M=h.getAttribute("data-precedence"),m=s.get(M)||l,m===l&&s.set(null,h),s.set(M,h),this.count++,l=Pc.bind(this),h.addEventListener("load",l),h.addEventListener("error",l),m?m.parentNode.insertBefore(h,m.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(h,e.firstChild)),i.state.loading|=4}}var $o={$$typeof:L,Provider:null,Consumer:null,_currentValue:q,_currentValue2:q,_threadCount:0};function nM(e,i,s,l,h,m,M,D,k){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Qt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qt(0),this.hiddenUpdates=Qt(null),this.identifierPrefix=l,this.onUncaughtError=h,this.onCaughtError=m,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=k,this.incompleteTransitions=new Map}function Av(e,i,s,l,h,m,M,D,k,ut,St,Mt){return e=new nM(e,i,s,M,k,ut,St,Mt,D),i=1,m===!0&&(i|=24),m=li(3,null,null,i),e.current=m,m.stateNode=e,i=vf(),i.refCount++,e.pooledCache=i,i.refCount++,m.memoizedState={element:l,isDehydrated:s,cache:i},yf(m),e}function wv(e){return e?(e=or,e):or}function Rv(e,i,s,l,h,m){h=wv(h),l.context===null?l.context=h:l.pendingContext=h,l=qa(i),l.payload={element:s},m=m===void 0?null:m,m!==null&&(l.callback=m),s=Ya(e,l,i),s!==null&&(ei(s,e,i),Uo(s,e,i))}function Cv(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function Bh(e,i){Cv(e,i),(e=e.alternate)&&Cv(e,i)}function Dv(e){if(e.tag===13||e.tag===31){var i=As(e,67108864);i!==null&&ei(i,e,67108864),Bh(e,67108864)}}function Uv(e){if(e.tag===13||e.tag===31){var i=di();i=fo(i);var s=As(e,i);s!==null&&ei(s,e,i),Bh(e,i)}}var Fc=!0;function iM(e,i,s,l){var h=F.T;F.T=null;var m=X.p;try{X.p=2,Hh(e,i,s,l)}finally{X.p=m,F.T=h}}function aM(e,i,s,l){var h=F.T;F.T=null;var m=X.p;try{X.p=8,Hh(e,i,s,l)}finally{X.p=m,F.T=h}}function Hh(e,i,s,l){if(Fc){var h=Gh(l);if(h===null)Ah(e,i,l,Bc,s),Nv(e,l);else if(rM(h,e,i,s,l))l.stopPropagation();else if(Nv(e,l),i&4&&-1<sM.indexOf(e)){for(;h!==null;){var m=la(h);if(m!==null)switch(m.tag){case 3:if(m=m.stateNode,m.current.memoizedState.isDehydrated){var M=wt(m.pendingLanes);if(M!==0){var D=m;for(D.pendingLanes|=2,D.entangledLanes|=2;M;){var k=1<<31-Bt(M);D.entanglements[1]|=k,M&=~k}Qi(m),(Be&6)===0&&(yc=Te()+500,Yo(0))}}break;case 31:case 13:D=As(m,2),D!==null&&ei(D,m,2),bc(),Bh(m,2)}if(m=Gh(l),m===null&&Ah(e,i,l,Bc,s),m===h)break;h=m}h!==null&&l.stopPropagation()}else Ah(e,i,l,null,s)}}function Gh(e){return e=Vu(e),Vh(e)}var Bc=null;function Vh(e){if(Bc=null,e=oa(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=u(i),e!==null)return e;e=null}else if(s===31){if(e=f(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Bc=e,null}function Lv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ce()){case z:return 2;case E:return 8;case nt:case ft:return 32;case gt:return 268435456;default:return 32}default:return 32}}var kh=!1,as=null,ss=null,rs=null,tl=new Map,el=new Map,os=[],sM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Nv(e,i){switch(e){case"focusin":case"focusout":as=null;break;case"dragenter":case"dragleave":ss=null;break;case"mouseover":case"mouseout":rs=null;break;case"pointerover":case"pointerout":tl.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":el.delete(i.pointerId)}}function nl(e,i,s,l,h,m){return e===null||e.nativeEvent!==m?(e={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:m,targetContainers:[h]},i!==null&&(i=la(i),i!==null&&Dv(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,h!==null&&i.indexOf(h)===-1&&i.push(h),e)}function rM(e,i,s,l,h){switch(i){case"focusin":return as=nl(as,e,i,s,l,h),!0;case"dragenter":return ss=nl(ss,e,i,s,l,h),!0;case"mouseover":return rs=nl(rs,e,i,s,l,h),!0;case"pointerover":var m=h.pointerId;return tl.set(m,nl(tl.get(m)||null,e,i,s,l,h)),!0;case"gotpointercapture":return m=h.pointerId,el.set(m,nl(el.get(m)||null,e,i,s,l,h)),!0}return!1}function Ov(e){var i=oa(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){e.blockedOn=i,tr(e.priority,function(){Uv(s)});return}}else if(i===31){if(i=f(s),i!==null){e.blockedOn=i,tr(e.priority,function(){Uv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Hc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Gh(e.nativeEvent);if(s===null){s=e.nativeEvent;var l=new s.constructor(s.type,s);Gu=l,s.target.dispatchEvent(l),Gu=null}else return i=la(s),i!==null&&Dv(i),e.blockedOn=s,!1;i.shift()}return!0}function Pv(e,i,s){Hc(e)&&s.delete(i)}function oM(){kh=!1,as!==null&&Hc(as)&&(as=null),ss!==null&&Hc(ss)&&(ss=null),rs!==null&&Hc(rs)&&(rs=null),tl.forEach(Pv),el.forEach(Pv)}function Gc(e,i){e.blockedOn===i&&(e.blockedOn=null,kh||(kh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,oM)))}var Vc=null;function Iv(e){Vc!==e&&(Vc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Vc===e&&(Vc=null);for(var i=0;i<e.length;i+=3){var s=e[i],l=e[i+1],h=e[i+2];if(typeof l!="function"){if(Vh(l||s)===null)continue;break}var m=la(s);m!==null&&(e.splice(i,3),i-=3,Gf(m,{pending:!0,data:h,method:s.method,action:l},l,h))}}))}function Ur(e){function i(k){return Gc(k,e)}as!==null&&Gc(as,e),ss!==null&&Gc(ss,e),rs!==null&&Gc(rs,e),tl.forEach(i),el.forEach(i);for(var s=0;s<os.length;s++){var l=os[s];l.blockedOn===e&&(l.blockedOn=null)}for(;0<os.length&&(s=os[0],s.blockedOn===null);)Ov(s),s.blockedOn===null&&os.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var h=s[l],m=s[l+1],M=h[Un]||null;if(typeof m=="function")M||Iv(s);else if(M){var D=null;if(m&&m.hasAttribute("formAction")){if(h=m,M=m[Un]||null)D=M.formAction;else if(Vh(h)!==null)continue}else D=M.action;typeof D=="function"?s[l+1]=D:(s.splice(l,3),l-=3),Iv(s)}}}function zv(){function e(m){m.canIntercept&&m.info==="react-transition"&&m.intercept({handler:function(){return new Promise(function(M){return h=M})},focusReset:"manual",scroll:"manual"})}function i(){h!==null&&(h(),h=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var m=navigation.currentEntry;m&&m.url!=null&&navigation.navigate(m.url,{state:m.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,h=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),h!==null&&(h(),h=null)}}}function Xh(e){this._internalRoot=e}kc.prototype.render=Xh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=di();Rv(s,l,e,i,null,null)},kc.prototype.unmount=Xh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;Rv(e.current,2,null,e,null,null),bc(),i[Kn]=null}};function kc(e){this._internalRoot=e}kc.prototype.unstable_scheduleHydration=function(e){if(e){var i=po();e={blockedOn:null,target:e,priority:i};for(var s=0;s<os.length&&i!==0&&i<os[s].priority;s++);os.splice(s,0,e),s===0&&Ov(e)}};var Fv=t.version;if(Fv!=="19.2.7")throw Error(a(527,Fv,"19.2.7"));X.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=d(i),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var lM={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:F,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Xc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xc.isDisabled&&Xc.supportsFiber)try{vt=Xc.inject(lM),_t=Xc}catch{}}return al.createRoot=function(e,i){if(!o(e))throw Error(a(299));var s=!1,l="",h=W0,m=q0,M=Y0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(h=i.onUncaughtError),i.onCaughtError!==void 0&&(m=i.onCaughtError),i.onRecoverableError!==void 0&&(M=i.onRecoverableError)),i=Av(e,1,!1,null,null,s,l,null,h,m,M,zv),e[Kn]=i.current,Th(e),new Xh(i)},al.hydrateRoot=function(e,i,s){if(!o(e))throw Error(a(299));var l=!1,h="",m=W0,M=q0,D=Y0,k=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(h=s.identifierPrefix),s.onUncaughtError!==void 0&&(m=s.onUncaughtError),s.onCaughtError!==void 0&&(M=s.onCaughtError),s.onRecoverableError!==void 0&&(D=s.onRecoverableError),s.formState!==void 0&&(k=s.formState)),i=Av(e,1,!0,i,s??null,l,h,k,m,M,D,zv),i.context=wv(null),s=i.current,l=di(),l=fo(l),h=qa(l),h.callback=null,Ya(s,h,l),s=l,i.current.lanes=s,Yt(i,s),Qi(i),e[Kn]=i.current,Th(e),new kc(i)},al.version="19.2.7",al}var Zv;function _M(){if(Zv)return Yh.exports;Zv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Yh.exports=vM(),Yh.exports}var xM=_M();function SM(r,t,n,a){ze.useEffect(()=>{const o=t.current,c=n.current;if(!a||!o||!c)return;const u=o.closest("[data-scene-surface]")??o;let f=null;const p=_=>{if(!f||_.pointerId!==f.id)return;const g=Math.max(1,Math.min(u.clientWidth,u.clientHeight));r.drag(c,(_.clientX-f.x)/g,(_.clientY-f.y)/g)},d=_=>{!f||_&&_.pointerId!==f.id||(f=null,delete o.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",p),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d))},v=_=>{if(f||!_.isPrimary||_.button!==0)return;const g=_.target instanceof Element?_.target:null;!g||!(o.contains(g)||g.hasAttribute("data-scene-drag"))||(_.pointerType==="mouse"&&_.preventDefault(),f={id:_.pointerId,x:_.clientX,y:_.clientY},o.dataset.look="drag",window.addEventListener("pointermove",p),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))};return u.addEventListener("pointerdown",v),()=>{u.removeEventListener("pointerdown",v),d()}},[a,r,t,n])}function yM(r){const[t,n]=ze.useState(!1);return ze.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>n(r&&!document.hidden&&!a.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(o);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),a.addEventListener("change",o),document.addEventListener("visibilitychange",o),o(),()=>{c.disconnect(),a.removeEventListener("change",o),document.removeEventListener("visibilitychange",o)}},[r]),t}class MM{constructor(t){this.options=t,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null}acquire(t){return window.clearTimeout(this.disposeTimer),this.holders.push(t),this.ensureEngine(),this.attachTop(),t.onStatus(this.status),()=>this.release(t)}setRunning(t,n){t.running=n,this.top===t&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(t){}drag(t,n,a){var o,c;this.top===t&&((c=(o=this.engine)==null?void 0:o.drag)==null||c.call(o,n,a))}releaseDrag(t){var n,a;this.top===t&&((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n))}release(t){var n,a;if(this.holders=this.holders.filter(o=>o!==t),this.holders.length){this.attachTop();return}(n=this.engine)==null||n.stop(),this.observe(null),(a=this.canvas)==null||a.remove(),this.disposeTimer=window.setTimeout(()=>this.teardown(),5e3)}setStatus(t){this.status=t;for(const n of this.holders)n.onStatus(t)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const t=document.createElement("canvas");t.className=this.options.canvasClass,t.setAttribute("aria-hidden","true"),this.canvas=t;try{this.engine=this.options.create(t,()=>this.fail())}catch{this.fail();return}const n=this.engine;this.setStatus("loading"),this.configure(n),this.resize(),n.init().then(()=>{this.engine===n&&(n.renderFrame(0),this.setStatus("ready"),this.applyRunning())}).catch(()=>this.fail())}attachTop(){var n,a;const t=this.top;!t||!this.canvas||((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n),this.canvas.parentElement!==t.mount&&t.mount.appendChild(this.canvas),this.observe(t.mount),this.resize(),this.applyRunning())}observe(t){var n;this.observed!==t&&((n=this.observer)==null||n.disconnect(),this.observed=t,t&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(t)))}resize(){var o,c;const t=(o=this.top)==null?void 0:o.mount;if(!t||!this.engine)return;const n=t.clientWidth||window.innerWidth,a=t.clientHeight||window.innerHeight;this.engine.setSize(n,a,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var t;!this.engine||this.status!=="ready"||((t=this.top)!=null&&t.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}teardown(){var t,n;window.clearTimeout(this.disposeTimer),this.observe(null),(t=this.engine)==null||t.dispose(),this.engine=null,(n=this.canvas)==null||n.remove(),this.canvas=null,this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rp="186",bM=0,Kv=1,EM=2,_u=1,mx=2,pl=3,Ys=0,qn=1,ii=2,Na=0,vl=1,wu=2,Jv=3,Qv=4,TM=5,Yr=100,AM=101,wM=102,RM=103,CM=104,DM=200,UM=201,LM=202,NM=203,gx=204,vx=205,OM=206,PM=207,IM=208,zM=209,FM=210,BM=211,HM=212,GM=213,VM=214,Ld=0,Nd=1,Od=2,bl=3,Pd=4,Id=5,zd=6,Fd=7,_x=0,kM=1,XM=2,aa=0,xx=1,Sx=2,yx=3,Cp=4,Mx=5,bx=6,Ex=7,Tx=300,Zs=301,ao=302,Qh=303,jh=304,Ll=306,Ru=1e3,na=1001,Bd=1002,In=1003,WM=1004,Wc=1005,Tn=1006,$h=1007,Xs=1008,Dn=1009,Ax=1010,wx=1011,El=1012,Dp=1013,sa=1014,Vi=1015,Yn=1016,Up=1017,Lp=1018,Tl=1020,Rx=35902,Cx=35899,Dx=1021,Ux=1022,vi=1023,Pa=1026,Ws=1027,Np=1028,Op=1029,Ks=1030,Pp=1031,Ip=1033,xu=33776,Su=33777,yu=33778,Mu=33779,Hd=35840,Gd=35841,Vd=35842,kd=35843,Xd=36196,Wd=37492,qd=37496,Yd=37488,Zd=37489,Cu=37490,Kd=37491,Jd=37808,Qd=37809,jd=37810,$d=37811,tp=37812,ep=37813,np=37814,ip=37815,ap=37816,sp=37817,rp=37818,op=37819,lp=37820,cp=37821,up=36492,fp=36494,hp=36495,dp=36283,pp=36284,Du=36285,mp=36286,qM=3200,gp=0,YM=1,ea="",ni="srgb",so="srgb-linear",Uu="linear",Xe="srgb",td=7680,ZM=519,KM=512,JM=513,QM=514,zp=515,jM=516,$M=517,Fp=518,tb=519,eb=35044,jv="300 es",ia=2e3,Al=2001;function nb(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Lu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function ib(){const r=Lu("canvas");return r.style.display="block",r}const $v={};function t_(...r){const t="THREE."+r.shift();console.log(t,...r)}function Lx(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function se(...r){r=Lx(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...r)}}function Ne(...r){r=Lx(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...r)}}function to(...r){const t=r.join(" ");t in $v||($v[t]=!0,se(...r))}function ab(r,t,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const sb={[Ld]:Nd,[Od]:zd,[Pd]:Fd,[bl]:Id,[Nd]:Ld,[zd]:Od,[Fd]:Pd,[Id]:bl};class Qs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const o=a[t];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let e_=1234567;const _l=Math.PI/180,wl=180/Math.PI;function js(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[n&63|128]+Bn[n>>8&255]+"-"+Bn[n>>16&255]+Bn[n>>24&255]+Bn[a&255]+Bn[a>>8&255]+Bn[a>>16&255]+Bn[a>>24&255]).toLowerCase()}function ve(r,t,n){return Math.max(t,Math.min(n,r))}function Bp(r,t){return(r%t+t)%t}function rb(r,t,n,a,o){return a+(r-t)*(o-a)/(n-t)}function ob(r,t,n){return r!==t?(n-r)/(t-r):0}function xl(r,t,n){return(1-n)*r+n*t}function lb(r,t,n,a){return xl(r,t,1-Math.exp(-n*a))}function cb(r,t=1){return t-Math.abs(Bp(r,t*2)-t)}function ub(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function fb(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function hb(r,t){return r+Math.floor(Math.random()*(t-r+1))}function db(r,t){return r+Math.random()*(t-r)}function pb(r){return r*(.5-Math.random())}function mb(r){r!==void 0&&(e_=r);let t=e_+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function gb(r){return r*_l}function vb(r){return r*wl}function _b(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function xb(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Sb(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function yb(r,t,n,a,o){const c=Math.cos,u=Math.sin,f=c(n/2),p=u(n/2),d=c((t+a)/2),v=u((t+a)/2),_=c((t-a)/2),g=u((t-a)/2),x=c((a-t)/2),b=u((a-t)/2);switch(o){case"XYX":r.set(f*v,p*_,p*g,f*d);break;case"YZY":r.set(p*g,f*v,p*_,f*d);break;case"ZXZ":r.set(p*_,p*g,f*v,f*d);break;case"XZX":r.set(f*v,p*b,p*x,f*d);break;case"YXY":r.set(p*x,f*v,p*b,f*d);break;case"ZYZ":r.set(p*b,p*x,f*v,f*d);break;default:se("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Zr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Iu={DEG2RAD:_l,RAD2DEG:wl,generateUUID:js,clamp:ve,euclideanModulo:Bp,mapLinear:rb,inverseLerp:ob,lerp:xl,damp:lb,pingpong:cb,smoothstep:ub,smootherstep:fb,randInt:hb,randFloat:db,randFloatSpread:pb,seededRandom:mb,degToRad:gb,radToDeg:vb,isPowerOfTwo:_b,ceilPowerOfTwo:xb,floorPowerOfTwo:Sb,setQuaternionFromProperEuler:yb,normalize:Xn,denormalize:Zr},nm=class nm{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=ve(this.x,t.x,n.x),this.y=ve(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=ve(this.x,t,n),this.y=ve(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ve(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ve(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-t.x,u=this.y-t.y;return this.x=c*a-u*o+t.x,this.y=c*o+u*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};nm.prototype.isVector2=!0;let qt=nm;class Wi{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,c,u,f){let p=a[o+0],d=a[o+1],v=a[o+2],_=a[o+3],g=c[u+0],x=c[u+1],b=c[u+2],w=c[u+3];if(_!==w||p!==g||d!==x||v!==b){let y=p*g+d*x+v*b+_*w;y<0&&(g=-g,x=-x,b=-b,w=-w,y=-y);let S=1-f;if(y<.9995){const C=Math.acos(y),L=Math.sin(C);S=Math.sin(S*C)/L,f=Math.sin(f*C)/L,p=p*S+g*f,d=d*S+x*f,v=v*S+b*f,_=_*S+w*f}else{p=p*S+g*f,d=d*S+x*f,v=v*S+b*f,_=_*S+w*f;const C=1/Math.sqrt(p*p+d*d+v*v+_*_);p*=C,d*=C,v*=C,_*=C}}t[n]=p,t[n+1]=d,t[n+2]=v,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,o,c,u){const f=a[o],p=a[o+1],d=a[o+2],v=a[o+3],_=c[u],g=c[u+1],x=c[u+2],b=c[u+3];return t[n]=f*b+v*_+p*x-d*g,t[n+1]=p*b+v*g+d*_-f*x,t[n+2]=d*b+v*x+f*g-p*_,t[n+3]=v*b-f*_-p*g-d*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,c=t._z,u=t._order,f=Math.cos,p=Math.sin,d=f(a/2),v=f(o/2),_=f(c/2),g=p(a/2),x=p(o/2),b=p(c/2);switch(u){case"XYZ":this._x=g*v*_+d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_-g*x*b;break;case"YXZ":this._x=g*v*_+d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_+g*x*b;break;case"ZXY":this._x=g*v*_-d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_-g*x*b;break;case"ZYX":this._x=g*v*_-d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_+g*x*b;break;case"YZX":this._x=g*v*_+d*x*b,this._y=d*x*_+g*v*b,this._z=d*v*b-g*x*_,this._w=d*v*_-g*x*b;break;case"XZY":this._x=g*v*_-d*x*b,this._y=d*x*_-g*v*b,this._z=d*v*b+g*x*_,this._w=d*v*_+g*x*b;break;default:se("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],c=n[8],u=n[1],f=n[5],p=n[9],d=n[2],v=n[6],_=n[10],g=a+f+_;if(g>0){const x=.5/Math.sqrt(g+1);this._w=.25/x,this._x=(v-p)*x,this._y=(c-d)*x,this._z=(u-o)*x}else if(a>f&&a>_){const x=2*Math.sqrt(1+a-f-_);this._w=(v-p)/x,this._x=.25*x,this._y=(o+u)/x,this._z=(c+d)/x}else if(f>_){const x=2*Math.sqrt(1+f-a-_);this._w=(c-d)/x,this._x=(o+u)/x,this._y=.25*x,this._z=(p+v)/x}else{const x=2*Math.sqrt(1+_-a-f);this._w=(u-o)/x,this._x=(c+d)/x,this._y=(p+v)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,c=t._z,u=t._w,f=n._x,p=n._y,d=n._z,v=n._w;return this._x=a*v+u*f+o*d-c*p,this._y=o*v+u*p+c*f-a*d,this._z=c*v+u*d+a*p-o*f,this._w=u*v-a*f-o*p-c*d,this._onChangeCallback(),this}slerp(t,n){let a=t._x,o=t._y,c=t._z,u=t._w,f=this.dot(t);f<0&&(a=-a,o=-o,c=-c,u=-u,f=-f);let p=1-n;if(f<.9995){const d=Math.acos(f),v=Math.sin(d);p=Math.sin(p*d)/v,n=Math.sin(n*d)/v,this._x=this._x*p+a*n,this._y=this._y*p+o*n,this._z=this._z*p+c*n,this._w=this._w*p+u*n,this._onChangeCallback()}else this._x=this._x*p+a*n,this._y=this._y*p+o*n,this._z=this._z*p+c*n,this._w=this._w*p+u*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const im=class im{constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(n_.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(n_.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=t.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,c=t.x,u=t.y,f=t.z,p=t.w,d=2*(u*o-f*a),v=2*(f*n-c*o),_=2*(c*a-u*n);return this.x=n+p*d+u*_-f*v,this.y=a+p*v+f*d-c*_,this.z=o+p*_+c*v-u*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=ve(this.x,t.x,n.x),this.y=ve(this.y,t.y,n.y),this.z=ve(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=ve(this.x,t,n),this.y=ve(this.y,t,n),this.z=ve(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ve(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,c=t.z,u=n.x,f=n.y,p=n.z;return this.x=o*p-c*f,this.y=c*u-a*p,this.z=a*f-o*u,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return ed.copy(this).projectOnVector(t),this.sub(ed)}reflect(t){return this.sub(ed.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ve(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};im.prototype.isVector3=!0;let H=im;const ed=new H,n_=new Wi,am=class am{constructor(t,n,a,o,c,u,f,p,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,f,p,d)}set(t,n,a,o,c,u,f,p,d){const v=this.elements;return v[0]=t,v[1]=o,v[2]=f,v[3]=n,v[4]=c,v[5]=p,v[6]=a,v[7]=u,v[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],f=a[3],p=a[6],d=a[1],v=a[4],_=a[7],g=a[2],x=a[5],b=a[8],w=o[0],y=o[3],S=o[6],C=o[1],L=o[4],A=o[7],U=o[2],N=o[5],I=o[8];return c[0]=u*w+f*C+p*U,c[3]=u*y+f*L+p*N,c[6]=u*S+f*A+p*I,c[1]=d*w+v*C+_*U,c[4]=d*y+v*L+_*N,c[7]=d*S+v*A+_*I,c[2]=g*w+x*C+b*U,c[5]=g*y+x*L+b*N,c[8]=g*S+x*A+b*I,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],f=t[5],p=t[6],d=t[7],v=t[8];return n*u*v-n*f*d-a*c*v+a*f*p+o*c*d-o*u*p}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],f=t[5],p=t[6],d=t[7],v=t[8],_=v*u-f*d,g=f*p-v*c,x=d*c-u*p,b=n*_+a*g+o*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=_*w,t[1]=(o*d-v*a)*w,t[2]=(f*a-o*u)*w,t[3]=g*w,t[4]=(v*n-o*p)*w,t[5]=(o*c-f*n)*w,t[6]=x*w,t[7]=(a*p-d*n)*w,t[8]=(u*n-a*c)*w,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,c,u,f){const p=Math.cos(c),d=Math.sin(c);return this.set(a*p,a*d,-a*(p*u+d*f)+u+t,-o*d,o*p,-o*(-d*u+p*f)+f+n,0,0,1),this}scale(t,n){return to("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(nd.makeScale(t,n)),this}rotate(t){return to("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(nd.makeRotation(-t)),this}translate(t,n){return to("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(nd.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};am.prototype.isMatrix3=!0;let re=am;const nd=new re,i_=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),a_=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mb(){const r={enabled:!0,workingColorSpace:so,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===Xe&&(o.r=Oa(o.r),o.g=Oa(o.g),o.b=Oa(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Xe&&(o.r=eo(o.r),o.g=eo(o.g),o.b=eo(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===ea?Uu:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return to("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return to("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[so]:{primaries:t,whitePoint:a,transfer:Uu,toXYZ:i_,fromXYZ:a_,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ni},outputColorSpaceConfig:{drawingBufferColorSpace:ni}},[ni]:{primaries:t,whitePoint:a,transfer:Xe,toXYZ:i_,fromXYZ:a_,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ni}}}),r}const we=Mb();function Oa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function eo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Lr;class bb{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Lr===void 0&&(Lr=Lu("canvas")),Lr.width=t.width,Lr.height=t.height;const o=Lr.getContext("2d");t instanceof ImageData?o.putImageData(t,0,0):o.drawImage(t,0,0,t.width,t.height),a=Lr}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Lu("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=Oa(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Oa(n[a]/255)*255):n[a]=Oa(n[a]);return{data:n,width:t.width,height:t.height}}else return se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Eb=0;class Hp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Eb++}),this.uuid=js(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,f=o.length;u<f;u++)o[u].isDataTexture?c.push(id(o[u].image)):c.push(id(o[u]))}else c=id(o);a.url=c}return n||(t.images[this.uuid]=a),a}}function id(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?bb.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(se("Texture: Unable to serialize Texture."),{})}let Tb=0;const ad=new H;class zn extends Qs{constructor(t=zn.DEFAULT_IMAGE,n=zn.DEFAULT_MAPPING,a=na,o=na,c=Tn,u=Xs,f=vi,p=Dn,d=zn.DEFAULT_ANISOTROPY,v=ea){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tb++}),this.uuid=js(),this.name="",this.source=new Hp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=d,this.format=f,this.internalFormat=null,this.type=p,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ad).x}get height(){return this.source.getSize(ad).y}get depth(){return this.source.getSize(ad).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){se(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){se(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Tx)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ru:t.x=t.x-Math.floor(t.x);break;case na:t.x=t.x<0?0:1;break;case Bd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ru:t.y=t.y-Math.floor(t.y);break;case na:t.y=t.y<0?0:1;break;case Bd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}zn.DEFAULT_IMAGE=null;zn.DEFAULT_MAPPING=Tx;zn.DEFAULT_ANISOTROPY=1;const sm=class sm{constructor(t=0,n=0,a=0,o=1){this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=this.w,u=t.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,c;const p=t.elements,d=p[0],v=p[4],_=p[8],g=p[1],x=p[5],b=p[9],w=p[2],y=p[6],S=p[10];if(Math.abs(v-g)<.01&&Math.abs(_-w)<.01&&Math.abs(b-y)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+w)<.1&&Math.abs(b+y)<.1&&Math.abs(d+x+S-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const L=(d+1)/2,A=(x+1)/2,U=(S+1)/2,N=(v+g)/4,I=(_+w)/4,T=(b+y)/4;return L>A&&L>U?L<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(L),o=N/a,c=I/a):A>U?A<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(A),a=N/o,c=T/o):U<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(U),a=I/c,o=T/c),this.set(a,o,c,n),this}let C=Math.sqrt((y-b)*(y-b)+(_-w)*(_-w)+(g-v)*(g-v));return Math.abs(C)<.001&&(C=1),this.x=(y-b)/C,this.y=(_-w)/C,this.z=(g-v)/C,this.w=Math.acos((d+x+S-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=ve(this.x,t.x,n.x),this.y=ve(this.y,t.y,n.y),this.z=ve(this.z,t.z,n.z),this.w=ve(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=ve(this.x,t,n),this.y=ve(this.y,t,n),this.z=ve(this.z,t,n),this.w=ve(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ve(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};sm.prototype.isVector4=!0;let an=sm;class Ab extends Qs{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new an(0,0,t,n),this.scissorTest=!1,this.viewport=new an(0,0,t,n),this.textures=[];const o={width:t,height:n,depth:a.depth},c=new zn(o),u=a.count;for(let f=0;f<u;f++)this.textures[f]=c.clone(),this.textures[f].isRenderTargetTexture=!0,this.textures[f].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:Tn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},t.textures[n].image);this.textures[n].source=new Hp(o)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends Ab{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class Nx extends zn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=In,this.minFilter=In,this.wrapR=na,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class wb extends zn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=In,this.minFilter=In,this.wrapR=na,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Pu=class Pu{constructor(t,n,a,o,c,u,f,p,d,v,_,g,x,b,w,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,f,p,d,v,_,g,x,b,w,y)}set(t,n,a,o,c,u,f,p,d,v,_,g,x,b,w,y){const S=this.elements;return S[0]=t,S[4]=n,S[8]=a,S[12]=o,S[1]=c,S[5]=u,S[9]=f,S[13]=p,S[2]=d,S[6]=v,S[10]=_,S[14]=g,S[3]=x,S[7]=b,S[11]=w,S[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pu().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,o=1/Nr.setFromMatrixColumn(t,0).length(),c=1/Nr.setFromMatrixColumn(t,1).length(),u=1/Nr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,c=t.z,u=Math.cos(a),f=Math.sin(a),p=Math.cos(o),d=Math.sin(o),v=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const g=u*v,x=u*_,b=f*v,w=f*_;n[0]=p*v,n[4]=-p*_,n[8]=d,n[1]=x+b*d,n[5]=g-w*d,n[9]=-f*p,n[2]=w-g*d,n[6]=b+x*d,n[10]=u*p}else if(t.order==="YXZ"){const g=p*v,x=p*_,b=d*v,w=d*_;n[0]=g+w*f,n[4]=b*f-x,n[8]=u*d,n[1]=u*_,n[5]=u*v,n[9]=-f,n[2]=x*f-b,n[6]=w+g*f,n[10]=u*p}else if(t.order==="ZXY"){const g=p*v,x=p*_,b=d*v,w=d*_;n[0]=g-w*f,n[4]=-u*_,n[8]=b+x*f,n[1]=x+b*f,n[5]=u*v,n[9]=w-g*f,n[2]=-u*d,n[6]=f,n[10]=u*p}else if(t.order==="ZYX"){const g=u*v,x=u*_,b=f*v,w=f*_;n[0]=p*v,n[4]=b*d-x,n[8]=g*d+w,n[1]=p*_,n[5]=w*d+g,n[9]=x*d-b,n[2]=-d,n[6]=f*p,n[10]=u*p}else if(t.order==="YZX"){const g=u*p,x=u*d,b=f*p,w=f*d;n[0]=p*v,n[4]=w-g*_,n[8]=b*_+x,n[1]=_,n[5]=u*v,n[9]=-f*v,n[2]=-d*v,n[6]=x*_+b,n[10]=g-w*_}else if(t.order==="XZY"){const g=u*p,x=u*d,b=f*p,w=f*d;n[0]=p*v,n[4]=-_,n[8]=d*v,n[1]=g*_+w,n[5]=u*v,n[9]=x*_-b,n[2]=b*_-x,n[6]=f*v,n[10]=w*_+g}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Rb,t,Cb)}lookAt(t,n,a){const o=this.elements;return pi.subVectors(t,n),pi.lengthSq()===0&&(pi.z=1),pi.normalize(),cs.crossVectors(a,pi),cs.lengthSq()===0&&(Math.abs(a.z)===1?pi.x+=1e-4:pi.z+=1e-4,pi.normalize(),cs.crossVectors(a,pi)),cs.normalize(),qc.crossVectors(pi,cs),o[0]=cs.x,o[4]=qc.x,o[8]=pi.x,o[1]=cs.y,o[5]=qc.y,o[9]=pi.y,o[2]=cs.z,o[6]=qc.z,o[10]=pi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],f=a[4],p=a[8],d=a[12],v=a[1],_=a[5],g=a[9],x=a[13],b=a[2],w=a[6],y=a[10],S=a[14],C=a[3],L=a[7],A=a[11],U=a[15],N=o[0],I=o[4],T=o[8],P=o[12],B=o[1],W=o[5],G=o[9],$=o[13],V=o[2],tt=o[6],F=o[10],X=o[14],q=o[3],it=o[7],rt=o[11],O=o[15];return c[0]=u*N+f*B+p*V+d*q,c[4]=u*I+f*W+p*tt+d*it,c[8]=u*T+f*G+p*F+d*rt,c[12]=u*P+f*$+p*X+d*O,c[1]=v*N+_*B+g*V+x*q,c[5]=v*I+_*W+g*tt+x*it,c[9]=v*T+_*G+g*F+x*rt,c[13]=v*P+_*$+g*X+x*O,c[2]=b*N+w*B+y*V+S*q,c[6]=b*I+w*W+y*tt+S*it,c[10]=b*T+w*G+y*F+S*rt,c[14]=b*P+w*$+y*X+S*O,c[3]=C*N+L*B+A*V+U*q,c[7]=C*I+L*W+A*tt+U*it,c[11]=C*T+L*G+A*F+U*rt,c[15]=C*P+L*$+A*X+U*O,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[12],u=t[1],f=t[5],p=t[9],d=t[13],v=t[2],_=t[6],g=t[10],x=t[14],b=t[3],w=t[7],y=t[11],S=t[15],C=p*x-d*g,L=f*x-d*_,A=f*g-p*_,U=u*x-d*v,N=u*g-p*v,I=u*_-f*v;return n*(w*C-y*L+S*A)-a*(b*C-y*U+S*N)+o*(b*L-w*U+S*I)-c*(b*A-w*N+y*I)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[1],u=t[5],f=t[9],p=t[2],d=t[6],v=t[10];return n*(u*v-f*d)-a*(c*v-f*p)+o*(c*d-u*p)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],f=t[5],p=t[6],d=t[7],v=t[8],_=t[9],g=t[10],x=t[11],b=t[12],w=t[13],y=t[14],S=t[15],C=n*f-a*u,L=n*p-o*u,A=n*d-c*u,U=a*p-o*f,N=a*d-c*f,I=o*d-c*p,T=v*w-_*b,P=v*y-g*b,B=v*S-x*b,W=_*y-g*w,G=_*S-x*w,$=g*S-x*y,V=C*$-L*G+A*W+U*B-N*P+I*T;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const tt=1/V;return t[0]=(f*$-p*G+d*W)*tt,t[1]=(o*G-a*$-c*W)*tt,t[2]=(w*I-y*N+S*U)*tt,t[3]=(g*N-_*I-x*U)*tt,t[4]=(p*B-u*$-d*P)*tt,t[5]=(n*$-o*B+c*P)*tt,t[6]=(y*A-b*I-S*L)*tt,t[7]=(v*I-g*A+x*L)*tt,t[8]=(u*G-f*B+d*T)*tt,t[9]=(a*B-n*G-c*T)*tt,t[10]=(b*N-w*A+S*C)*tt,t[11]=(_*A-v*N-x*C)*tt,t[12]=(f*P-u*W-p*T)*tt,t[13]=(n*W-a*P+o*T)*tt,t[14]=(w*L-b*U-y*C)*tt,t[15]=(v*U-_*L+g*C)*tt,this}scale(t){const n=this.elements,a=t.x,o=t.y,c=t.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=t.x,f=t.y,p=t.z,d=c*u,v=c*f;return this.set(d*u+a,d*f-o*p,d*p+o*f,0,d*f+o*p,v*f+a,v*p-o*u,0,d*p-o*f,v*p+o*u,c*p*p+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,c,u){return this.set(1,a,c,0,t,1,u,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,c=n._x,u=n._y,f=n._z,p=n._w,d=c+c,v=u+u,_=f+f,g=c*d,x=c*v,b=c*_,w=u*v,y=u*_,S=f*_,C=p*d,L=p*v,A=p*_,U=a.x,N=a.y,I=a.z;return o[0]=(1-(w+S))*U,o[1]=(x+A)*U,o[2]=(b-L)*U,o[3]=0,o[4]=(x-A)*N,o[5]=(1-(g+S))*N,o[6]=(y+C)*N,o[7]=0,o[8]=(b+L)*I,o[9]=(y-C)*I,o[10]=(1-(g+w))*I,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;t.x=o[12],t.y=o[13],t.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=Nr.set(o[0],o[1],o[2]).length();const f=Nr.set(o[4],o[5],o[6]).length(),p=Nr.set(o[8],o[9],o[10]).length();c<0&&(u=-u),zi.copy(this);const d=1/u,v=1/f,_=1/p;return zi.elements[0]*=d,zi.elements[1]*=d,zi.elements[2]*=d,zi.elements[4]*=v,zi.elements[5]*=v,zi.elements[6]*=v,zi.elements[8]*=_,zi.elements[9]*=_,zi.elements[10]*=_,n.setFromRotationMatrix(zi),a.x=u,a.y=f,a.z=p,this}makePerspective(t,n,a,o,c,u,f=ia,p=!1){const d=this.elements,v=2*c/(n-t),_=2*c/(a-o),g=(n+t)/(n-t),x=(a+o)/(a-o);let b,w;if(p)b=c/(u-c),w=u*c/(u-c);else if(f===ia)b=-(u+c)/(u-c),w=-2*u*c/(u-c);else if(f===Al)b=-u/(u-c),w=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return d[0]=v,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=_,d[9]=x,d[13]=0,d[2]=0,d[6]=0,d[10]=b,d[14]=w,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,n,a,o,c,u,f=ia,p=!1){const d=this.elements,v=2/(n-t),_=2/(a-o),g=-(n+t)/(n-t),x=-(a+o)/(a-o);let b,w;if(p)b=1/(u-c),w=u/(u-c);else if(f===ia)b=-2/(u-c),w=-(u+c)/(u-c);else if(f===Al)b=-1/(u-c),w=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return d[0]=v,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=_,d[9]=0,d[13]=x,d[2]=0,d[6]=0,d[10]=b,d[14]=w,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}};Pu.prototype.isMatrix4=!0;let Se=Pu;const Nr=new H,zi=new Se,Rb=new H(0,0,0),Cb=new H(1,1,1),cs=new H,qc=new H,pi=new H,s_=new Se,r_=new Wi;class xs{constructor(t=0,n=0,a=0,o=xs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,c=o[0],u=o[4],f=o[8],p=o[1],d=o[5],v=o[9],_=o[2],g=o[6],x=o[10];switch(n){case"XYZ":this._y=Math.asin(ve(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-v,x),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(f,x),this._z=Math.atan2(p,d)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(ve(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,x),this._z=Math.atan2(-u,d)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-ve(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,x),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-u,d));break;case"YZX":this._z=Math.asin(ve(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,d),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(f,x));break;case"XZY":this._z=Math.asin(-ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(f,c)):(this._x=Math.atan2(-v,x),this._y=0);break;default:se("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return s_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(s_,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return r_.setFromEuler(this),this.setFromQuaternion(r_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xs.DEFAULT_ORDER="XYZ";class Gp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Db=0;const o_=new H,Or=new Wi,Ta=new Se,Yc=new H,sl=new H,Ub=new H,Lb=new Wi,l_=new H(1,0,0),c_=new H(0,1,0),u_=new H(0,0,1),f_={type:"added"},Nb={type:"removed"},Pr={type:"childadded",child:null},sd={type:"childremoved",child:null};class Mn extends Qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Db++}),this.uuid=js(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mn.DEFAULT_UP.clone();const t=new H,n=new xs,a=new Wi,o=new H(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Se},normalMatrix:{value:new re}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=Mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Or.setFromAxisAngle(t,n),this.quaternion.multiply(Or),this}rotateOnWorldAxis(t,n){return Or.setFromAxisAngle(t,n),this.quaternion.premultiply(Or),this}rotateX(t){return this.rotateOnAxis(l_,t)}rotateY(t){return this.rotateOnAxis(c_,t)}rotateZ(t){return this.rotateOnAxis(u_,t)}translateOnAxis(t,n){return o_.copy(t).applyQuaternion(this.quaternion),this.position.add(o_.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(l_,t)}translateY(t){return this.translateOnAxis(c_,t)}translateZ(t){return this.translateOnAxis(u_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ta.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Yc.copy(t):Yc.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),sl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ta.lookAt(sl,Yc,this.up):Ta.lookAt(Yc,sl,this.up),this.quaternion.setFromRotationMatrix(Ta),o&&(Ta.extractRotation(o.matrixWorld),Or.setFromRotationMatrix(Ta),this.quaternion.premultiply(Or.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(f_),Pr.child=t,this.dispatchEvent(Pr),Pr.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(Nb),sd.child=t,this.dispatchEvent(sd),sd.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ta.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ta.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ta),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(f_),Pr.child=t,this.dispatchEvent(Pr),Pr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(t,n);if(u!==void 0)return u}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sl,t,Ub),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sl,Lb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,o=t.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const o=this.parent;if(t===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,f=c.length;u<f;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(f=>({...f,boundingBox:f.boundingBox?f.boundingBox.toJSON():void 0,boundingSphere:f.boundingSphere?f.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(f=>({...f})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(f,p){return f[p.uuid]===void 0&&(f[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(t.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const p=f.shapes;if(Array.isArray(p))for(let d=0,v=p.length;d<v;d++){const _=p[d];c(t.shapes,_)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let p=0,d=this.material.length;p<d;p++)f.push(c(t.materials,this.material[p]));o.material=f}else o.material=c(t.materials,this.material);if(this.children.length>0){o.children=[];for(let f=0;f<this.children.length;f++)o.children.push(this.children[f].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let f=0;f<this.animations.length;f++){const p=this.animations[f];o.animations.push(c(t.animations,p))}}if(n){const f=u(t.geometries),p=u(t.materials),d=u(t.textures),v=u(t.images),_=u(t.shapes),g=u(t.skeletons),x=u(t.animations),b=u(t.nodes);f.length>0&&(a.geometries=f),p.length>0&&(a.materials=p),d.length>0&&(a.textures=d),v.length>0&&(a.images=v),_.length>0&&(a.shapes=_),g.length>0&&(a.skeletons=g),x.length>0&&(a.animations=x),b.length>0&&(a.nodes=b)}return a.object=o,a;function u(f){const p=[];for(const d in f){const v=f[d];delete v.metadata,p.push(v)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Mn.DEFAULT_UP=new H(0,1,0);Mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class La extends Mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ob={type:"move"};class rd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new La,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new La,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new La,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,c=null,u=null;const f=this._targetRay,p=this._grip,d=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(d&&t.hand){u=!0;for(const w of t.hand.values()){const y=n.getJointPose(w,a),S=this._getHandJoint(d,w);y!==null&&(S.matrix.fromArray(y.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=y.radius),S.visible=y!==null}const v=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],g=v.position.distanceTo(_.position),x=.02,b=.005;d.inputState.pinching&&g>x+b?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&g<=x-b&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:t,target:this})));f!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(f.matrix.fromArray(o.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,o.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(o.linearVelocity)):f.hasLinearVelocity=!1,o.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(o.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(Ob)))}return f!==null&&(f.visible=o!==null),p!==null&&(p.visible=c!==null),d!==null&&(d.visible=u!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new La;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const Ox={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},us={h:0,s:0,l:0},Zc={h:0,s:0,l:0};function od(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class ee{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ni){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,we.colorSpaceToWorking(this,n),this}setRGB(t,n,a,o=we.workingColorSpace){return this.r=t,this.g=n,this.b=a,we.colorSpaceToWorking(this,o),this}setHSL(t,n,a,o=we.workingColorSpace){if(t=Bp(t,1),n=ve(n,0,1),a=ve(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=od(u,c,t+1/3),this.g=od(u,c,t),this.b=od(u,c,t-1/3)}return we.colorSpaceToWorking(this,o),this}setStyle(t,n=ni){function a(c){c!==void 0&&parseFloat(c)<1&&se("Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const u=o[1],f=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:se("Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);se("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ni){const a=Ox[t.toLowerCase()];return a!==void 0?this.setHex(a,n):se("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oa(t.r),this.g=Oa(t.g),this.b=Oa(t.b),this}copyLinearToSRGB(t){return this.r=eo(t.r),this.g=eo(t.g),this.b=eo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ni){return we.workingToColorSpace(Hn.copy(this),t),Math.round(ve(Hn.r*255,0,255))*65536+Math.round(ve(Hn.g*255,0,255))*256+Math.round(ve(Hn.b*255,0,255))}getHexString(t=ni){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=we.workingColorSpace){we.workingToColorSpace(Hn.copy(this),n);const a=Hn.r,o=Hn.g,c=Hn.b,u=Math.max(a,o,c),f=Math.min(a,o,c);let p,d;const v=(f+u)/2;if(f===u)p=0,d=0;else{const _=u-f;switch(d=v<=.5?_/(u+f):_/(2-u-f),u){case a:p=(o-c)/_+(o<c?6:0);break;case o:p=(c-a)/_+2;break;case c:p=(a-o)/_+4;break}p/=6}return t.h=p,t.s=d,t.l=v,t}getRGB(t,n=we.workingColorSpace){return we.workingToColorSpace(Hn.copy(this),n),t.r=Hn.r,t.g=Hn.g,t.b=Hn.b,t}getStyle(t=ni){we.workingToColorSpace(Hn.copy(this),t);const n=Hn.r,a=Hn.g,o=Hn.b;return t!==ni?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(us),this.setHSL(us.h+t,us.s+n,us.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(us),t.getHSL(Zc);const a=xl(us.h,Zc.h,n),o=xl(us.s,Zc.s,n),c=xl(us.l,Zc.l,n);return this.setHSL(a,o,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Hn=new ee;ee.NAMES=Ox;class Vp{constructor(t,n=1,a=1e3){this.isFog=!0,this.name="",this.color=new ee(t),this.near=n,this.far=a}clone(){return new Vp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class h_ extends Mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xs,this.environmentIntensity=1,this.environmentRotation=new xs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Fi=new H,Aa=new H,ld=new H,wa=new H,Ir=new H,zr=new H,d_=new H,cd=new H,ud=new H,fd=new H,hd=new an,dd=new an,pd=new an;class Gi{constructor(t=new H,n=new H,a=new H){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),Fi.subVectors(t,n),o.cross(Fi);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(t,n,a,o,c){Fi.subVectors(o,n),Aa.subVectors(a,n),ld.subVectors(t,n);const u=Fi.dot(Fi),f=Fi.dot(Aa),p=Fi.dot(ld),d=Aa.dot(Aa),v=Aa.dot(ld),_=u*d-f*f;if(_===0)return c.set(0,0,0),null;const g=1/_,x=(d*p-f*v)*g,b=(u*v-f*p)*g;return c.set(1-x-b,b,x)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,wa)===null?!1:wa.x>=0&&wa.y>=0&&wa.x+wa.y<=1}static getInterpolation(t,n,a,o,c,u,f,p){return this.getBarycoord(t,n,a,o,wa)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,wa.x),p.addScaledVector(u,wa.y),p.addScaledVector(f,wa.z),p)}static getInterpolatedAttribute(t,n,a,o,c,u){return hd.setScalar(0),dd.setScalar(0),pd.setScalar(0),hd.fromBufferAttribute(t,n),dd.fromBufferAttribute(t,a),pd.fromBufferAttribute(t,o),u.setScalar(0),u.addScaledVector(hd,c.x),u.addScaledVector(dd,c.y),u.addScaledVector(pd,c.z),u}static isFrontFacing(t,n,a,o){return Fi.subVectors(a,n),Aa.subVectors(t,n),Fi.cross(Aa).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fi.subVectors(this.c,this.b),Aa.subVectors(this.a,this.b),Fi.cross(Aa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Gi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Gi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,c){return Gi.getInterpolation(t,this.a,this.b,this.c,n,a,o,c)}containsPoint(t){return Gi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Gi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,c=this.c;let u,f;Ir.subVectors(o,a),zr.subVectors(c,a),cd.subVectors(t,a);const p=Ir.dot(cd),d=zr.dot(cd);if(p<=0&&d<=0)return n.copy(a);ud.subVectors(t,o);const v=Ir.dot(ud),_=zr.dot(ud);if(v>=0&&_<=v)return n.copy(o);const g=p*_-v*d;if(g<=0&&p>=0&&v<=0)return u=p/(p-v),n.copy(a).addScaledVector(Ir,u);fd.subVectors(t,c);const x=Ir.dot(fd),b=zr.dot(fd);if(b>=0&&x<=b)return n.copy(c);const w=x*d-p*b;if(w<=0&&d>=0&&b<=0)return f=d/(d-b),n.copy(a).addScaledVector(zr,f);const y=v*b-x*_;if(y<=0&&_-v>=0&&x-b>=0)return d_.subVectors(c,o),f=(_-v)/(_-v+(x-b)),n.copy(o).addScaledVector(d_,f);const S=1/(y+w+g);return u=w*S,f=g*S,n.copy(a).addScaledVector(Ir,u).addScaledVector(zr,f)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class $s{constructor(t=new H(1/0,1/0,1/0),n=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Bi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Bi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Bi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let u=0,f=c.count;u<f;u++)t.isMesh===!0?t.getVertexPosition(u,Bi):Bi.fromBufferAttribute(c,u),Bi.applyMatrix4(t.matrixWorld),this.expandByPoint(Bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Kc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Kc.copy(a.boundingBox)),Kc.applyMatrix4(t.matrixWorld),this.union(Kc)}const o=t.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bi),Bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rl),Jc.subVectors(this.max,rl),Fr.subVectors(t.a,rl),Br.subVectors(t.b,rl),Hr.subVectors(t.c,rl),fs.subVectors(Br,Fr),hs.subVectors(Hr,Br),Bs.subVectors(Fr,Hr);let n=[0,-fs.z,fs.y,0,-hs.z,hs.y,0,-Bs.z,Bs.y,fs.z,0,-fs.x,hs.z,0,-hs.x,Bs.z,0,-Bs.x,-fs.y,fs.x,0,-hs.y,hs.x,0,-Bs.y,Bs.x,0];return!md(n,Fr,Br,Hr,Jc)||(n=[1,0,0,0,1,0,0,0,1],!md(n,Fr,Br,Hr,Jc))?!1:(Qc.crossVectors(fs,hs),n=[Qc.x,Qc.y,Qc.z],md(n,Fr,Br,Hr,Jc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ra[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ra[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ra[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ra[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ra[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ra[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ra[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ra[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ra),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ra=[new H,new H,new H,new H,new H,new H,new H,new H],Bi=new H,Kc=new $s,Fr=new H,Br=new H,Hr=new H,fs=new H,hs=new H,Bs=new H,rl=new H,Jc=new H,Qc=new H,Hs=new H;function md(r,t,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){Hs.fromArray(r,c);const f=o.x*Math.abs(Hs.x)+o.y*Math.abs(Hs.y)+o.z*Math.abs(Hs.z),p=t.dot(Hs),d=n.dot(Hs),v=a.dot(Hs);if(Math.max(-Math.max(p,d,v),Math.min(p,d,v))>f)return!1}return!0}const yn=new H,jc=new qt;let Pb=0;class ki extends Qs{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pb++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=eb,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)jc.fromBufferAttribute(this,n),jc.applyMatrix3(t),this.setXY(n,jc.x,jc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix3(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix4(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyNormalMatrix(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.transformDirection(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=Zr(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=Xn(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Zr(n,this.array)),n}setX(t,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Zr(n,this.array)),n}setY(t,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Zr(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Zr(n,this.array)),n}setW(t,n){return this.normalized&&(n=Xn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=Xn(n,this.array),a=Xn(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=Xn(n,this.array),a=Xn(a,this.array),o=Xn(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t*=this.itemSize,this.normalized&&(n=Xn(n,this.array),a=Xn(a,this.array),o=Xn(o,this.array),c=Xn(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Px extends ki{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class Ix extends ki{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class Ee extends ki{constructor(t,n,a){super(new Float32Array(t),n,a)}}const Ib=new $s,ol=new H,gd=new H;class lo{constructor(t=new H,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):Ib.setFromPoints(t).getCenter(a);let o=0;for(let c=0,u=t.length;c<u;c++)o=Math.max(o,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ol.subVectors(t,this.center);const n=ol.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(ol,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(gd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ol.copy(t.center).add(gd)),this.expandByPoint(ol.copy(t.center).sub(gd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let zb=0;const Ci=new Se,vd=new Mn,Gr=new H,mi=new $s,ll=new $s,Cn=new H;class un extends Qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zb++}),this.uuid=js(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nb(t)?Ix:Px)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new re().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ci.makeRotationFromQuaternion(t),this.applyMatrix4(Ci),this}rotateX(t){return Ci.makeRotationX(t),this.applyMatrix4(Ci),this}rotateY(t){return Ci.makeRotationY(t),this.applyMatrix4(Ci),this}rotateZ(t){return Ci.makeRotationZ(t),this.applyMatrix4(Ci),this}translate(t,n,a){return Ci.makeTranslation(t,n,a),this.applyMatrix4(Ci),this}scale(t,n,a){return Ci.makeScale(t,n,a),this.applyMatrix4(Ci),this}lookAt(t){return vd.lookAt(t),vd.updateMatrix(),this.applyMatrix4(vd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gr).negate(),this.translate(Gr.x,Gr.y,Gr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=t.length;o<c;o++){const u=t[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Ee(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const c=t[o];n.setXYZ(o,c.x,c.y,c.z||0)}t.length>n.count&&se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $s);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];mi.setFromBufferAttribute(c),this.morphTargetsRelative?(Cn.addVectors(this.boundingBox.min,mi.min),this.boundingBox.expandByPoint(Cn),Cn.addVectors(this.boundingBox.max,mi.max),this.boundingBox.expandByPoint(Cn)):(this.boundingBox.expandByPoint(mi.min),this.boundingBox.expandByPoint(mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new lo);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){const a=this.boundingSphere.center;if(mi.setFromBufferAttribute(t),n)for(let c=0,u=n.length;c<u;c++){const f=n[c];ll.setFromBufferAttribute(f),this.morphTargetsRelative?(Cn.addVectors(mi.min,ll.min),mi.expandByPoint(Cn),Cn.addVectors(mi.max,ll.max),mi.expandByPoint(Cn)):(mi.expandByPoint(ll.min),mi.expandByPoint(ll.max))}mi.getCenter(a);let o=0;for(let c=0,u=t.count;c<u;c++)Cn.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(Cn));if(n)for(let c=0,u=n.length;c<u;c++){const f=n[c],p=this.morphTargetsRelative;for(let d=0,v=f.count;d<v;d++)Cn.fromBufferAttribute(f,d),p&&(Gr.fromBufferAttribute(t,d),Cn.add(Gr)),o=Math.max(o,a.distanceToSquared(Cn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new ki(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const f=[],p=[];for(let T=0;T<a.count;T++)f[T]=new H,p[T]=new H;const d=new H,v=new H,_=new H,g=new qt,x=new qt,b=new qt,w=new H,y=new H;function S(T,P,B){d.fromBufferAttribute(a,T),v.fromBufferAttribute(a,P),_.fromBufferAttribute(a,B),g.fromBufferAttribute(c,T),x.fromBufferAttribute(c,P),b.fromBufferAttribute(c,B),v.sub(d),_.sub(d),x.sub(g),b.sub(g);const W=1/(x.x*b.y-b.x*x.y);isFinite(W)&&(w.copy(v).multiplyScalar(b.y).addScaledVector(_,-x.y).multiplyScalar(W),y.copy(_).multiplyScalar(x.x).addScaledVector(v,-b.x).multiplyScalar(W),f[T].add(w),f[P].add(w),f[B].add(w),p[T].add(y),p[P].add(y),p[B].add(y))}let C=this.groups;C.length===0&&(C=[{start:0,count:t.count}]);for(let T=0,P=C.length;T<P;++T){const B=C[T],W=B.start,G=B.count;for(let $=W,V=W+G;$<V;$+=3)S(t.getX($+0),t.getX($+1),t.getX($+2))}const L=new H,A=new H,U=new H,N=new H;function I(T){U.fromBufferAttribute(o,T),N.copy(U);const P=f[T];L.copy(P),L.sub(U.multiplyScalar(U.dot(P))).normalize(),A.crossVectors(N,P);const W=A.dot(p[T])<0?-1:1;u.setXYZW(T,L.x,L.y,L.z,W)}for(let T=0,P=C.length;T<P;++T){const B=C[T],W=B.start,G=B.count;for(let $=W,V=W+G;$<V;$+=3)I(t.getX($+0)),I(t.getX($+1)),I(t.getX($+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new ki(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let g=0,x=a.count;g<x;g++)a.setXYZ(g,0,0,0);const o=new H,c=new H,u=new H,f=new H,p=new H,d=new H,v=new H,_=new H;if(t)for(let g=0,x=t.count;g<x;g+=3){const b=t.getX(g+0),w=t.getX(g+1),y=t.getX(g+2);o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),f.fromBufferAttribute(a,b),p.fromBufferAttribute(a,w),d.fromBufferAttribute(a,y),f.add(v),p.add(v),d.add(v),a.setXYZ(b,f.x,f.y,f.z),a.setXYZ(w,p.x,p.y,p.z),a.setXYZ(y,d.x,d.y,d.z)}else for(let g=0,x=n.count;g<x;g+=3)o.fromBufferAttribute(n,g+0),c.fromBufferAttribute(n,g+1),u.fromBufferAttribute(n,g+2),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),a.setXYZ(g+0,v.x,v.y,v.z),a.setXYZ(g+1,v.x,v.y,v.z),a.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)Cn.fromBufferAttribute(t,n),Cn.normalize(),t.setXYZ(n,Cn.x,Cn.y,Cn.z)}toNonIndexed(){function t(f,p){const d=f.array,v=f.itemSize,_=f.normalized,g=new d.constructor(p.length*v);let x=0,b=0;for(let w=0,y=p.length;w<y;w++){f.isInterleavedBufferAttribute?x=p[w]*f.data.stride+f.offset:x=p[w]*v;for(let S=0;S<v;S++)g[b++]=d[x++]}return new ki(g,v,_)}if(this.index===null)return se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new un,a=this.index.array,o=this.attributes;for(const f in o){const p=o[f],d=t(p,a);n.setAttribute(f,d)}const c=this.morphAttributes;for(const f in c){const p=[],d=c[f];for(let v=0,_=d.length;v<_;v++){const g=d[v],x=t(g,a);p.push(x)}n.morphAttributes[f]=p}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let f=0,p=u.length;f<p;f++){const d=u[f];n.addGroup(d.start,d.count,d.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const p=this.parameters;for(const d in p)p[d]!==void 0&&(t[d]=p[d]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const p in a){const d=a[p];t.data.attributes[p]=d.toJSON(t.data)}const o={};let c=!1;for(const p in this.morphAttributes){const d=this.morphAttributes[p],v=[];for(let _=0,g=d.length;_<g;_++){const x=d[_];v.push(x.toJSON(t.data))}v.length>0&&(o[p]=v,c=!0)}c&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(t.data.groups=JSON.parse(JSON.stringify(u)));const f=this.boundingSphere;return f!==null&&(t.data.boundingSphere=f.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const o=t.attributes;for(const d in o){const v=o[d];this.setAttribute(d,v.clone(n))}const c=t.morphAttributes;for(const d in c){const v=[],_=c[d];for(let g=0,x=_.length;g<x;g++)v.push(_[g].clone(n));this.morphAttributes[d]=v}this.morphTargetsRelative=t.morphTargetsRelative;const u=t.groups;for(let d=0,v=u.length;d<v;d++){const _=u[d];this.addGroup(_.start,_.count,_.materialIndex)}const f=t.boundingBox;f!==null&&(this.boundingBox=f.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _d=new H,Fb=new H,Bb=new re;class Da{constructor(t=new H(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=_d.subVectors(a,n).cross(Fb.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const o=t.delta(_d),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(t.start).addScaledVector(o,u)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||Bb.getNormalMatrix(t),o=this.coplanarPoint(_d).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Hb=0;class co extends Qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hb++}),this.uuid=js(),this.name="",this.type="Material",this.blending=vl,this.side=Ys,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gx,this.blendDst=vx,this.blendEquation=Yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=bl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ZM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=td,this.stencilZFail=td,this.stencilZPass=td,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){se(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){se(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const f in c){const p=c[f];delete p.metadata,u.push(p)}return u}if(n){const c=o(t.textures),u=o(t.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new Da().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new qt().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ca=new H,xd=new H,$c=new H,tu=new H;class kp{constructor(t=new H,n=new H(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ca)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Ca.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ca.copy(this.origin).addScaledVector(this.direction,n),Ca.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){xd.copy(t).add(n).multiplyScalar(.5),$c.copy(n).sub(t).normalize(),tu.copy(this.origin).sub(xd);const c=t.distanceTo(n)*.5,u=-this.direction.dot($c),f=tu.dot(this.direction),p=-tu.dot($c),d=tu.lengthSq(),v=Math.abs(1-u*u);let _,g,x,b;if(v>0)if(_=u*p-f,g=u*f-p,b=c*v,_>=0)if(g>=-b)if(g<=b){const w=1/v;_*=w,g*=w,x=_*(_+u*g+2*f)+g*(u*_+g+2*p)+d}else g=c,_=Math.max(0,-(u*g+f)),x=-_*_+g*(g+2*p)+d;else g=-c,_=Math.max(0,-(u*g+f)),x=-_*_+g*(g+2*p)+d;else g<=-b?(_=Math.max(0,-(-u*c+f)),g=_>0?-c:Math.min(Math.max(-c,-p),c),x=-_*_+g*(g+2*p)+d):g<=b?(_=0,g=Math.min(Math.max(-c,-p),c),x=g*(g+2*p)+d):(_=Math.max(0,-(u*c+f)),g=_>0?c:Math.min(Math.max(-c,-p),c),x=-_*_+g*(g+2*p)+d);else g=u>0?-c:c,_=Math.max(0,-(u*g+f)),x=-_*_+g*(g+2*p)+d;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(xd).addScaledVector($c,g),x}intersectSphere(t,n){if(t.radius<0)return null;Ca.subVectors(t.center,this.origin);const a=Ca.dot(this.direction),o=Ca.dot(Ca)-a*a,c=t.radius*t.radius;if(o>c)return null;const u=Math.sqrt(c-o),f=a-u,p=a+u;return p<0?null:f<0?this.at(p,n):this.at(f,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,c,u,f,p;const d=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return d>=0?(a=(t.min.x-g.x)*d,o=(t.max.x-g.x)*d):(a=(t.max.x-g.x)*d,o=(t.min.x-g.x)*d),v>=0?(c=(t.min.y-g.y)*v,u=(t.max.y-g.y)*v):(c=(t.max.y-g.y)*v,u=(t.min.y-g.y)*v),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),_>=0?(f=(t.min.z-g.z)*_,p=(t.max.z-g.z)*_):(f=(t.max.z-g.z)*_,p=(t.min.z-g.z)*_),a>p||f>o)||((f>a||a!==a)&&(a=f),(p<o||o!==o)&&(o=p),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,Ca)!==null}intersectTriangle(t,n,a,o,c){const u=this.origin,f=this.direction,p=f.x,d=f.y,v=f.z,_=t.x-u.x,g=t.y-u.y,x=t.z-u.z,b=n.x-u.x,w=n.y-u.y,y=n.z-u.z,S=a.x-u.x,C=a.y-u.y,L=a.z-u.z,A=Math.abs(p),U=Math.abs(d),N=Math.abs(v);let I,T,P,B,W,G,$,V,tt,F,X,q;if(A>=U&&A>=N?(P=p,G=_,tt=b,q=S,p>=0?(I=d,T=v,B=g,W=x,$=w,V=y,F=C,X=L):(I=v,T=d,B=x,W=g,$=y,V=w,F=L,X=C)):U>=N?(P=d,G=g,tt=w,q=C,d>=0?(I=v,T=p,B=x,W=_,$=y,V=b,F=L,X=S):(I=p,T=v,B=_,W=x,$=b,V=y,F=S,X=L)):(P=v,G=x,tt=y,q=L,v>=0?(I=p,T=d,B=_,W=g,$=b,V=w,F=S,X=C):(I=d,T=p,B=g,W=_,$=w,V=b,F=C,X=S)),P===0)return null;const it=I/P,rt=T/P,O=1/P,et=B-it*G,j=W-rt*G,J=$-it*tt,bt=V-rt*tt,Dt=F-it*q,at=X-rt*q,pt=Dt*bt-at*J,Tt=et*at-j*Dt,It=J*j-bt*et;if(o){if(pt<0||Tt<0||It<0)return null}else if((pt<0||Tt<0||It<0)&&(pt>0||Tt>0||It>0))return null;const At=pt+Tt+It;if(At===0)return null;const $t=O*(pt*G+Tt*tt+It*q);return(At>0?$t<0:$t>0)?null:this.at($t/At,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zx extends co{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xs,this.combine=_x,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const p_=new Se,Gs=new kp,eu=new lo,m_=new H,nu=new H,iu=new H,au=new H,Sd=new H,su=new H,g_=new H,ru=new H;class Ge extends Mn{constructor(t=new un,n=new zx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const f=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=c}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const f=this.morphTargetInfluences;if(c&&f){su.set(0,0,0);for(let p=0,d=c.length;p<d;p++){const v=f[p],_=c[p];v!==0&&(Sd.fromBufferAttribute(_,t),u?su.addScaledVector(Sd,v):su.addScaledVector(Sd.sub(n),v))}n.add(su)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),eu.copy(a.boundingSphere),eu.applyMatrix4(c),Gs.copy(t.ray).recast(t.near),!(eu.containsPoint(Gs.origin)===!1&&(Gs.intersectSphere(eu,m_)===null||Gs.origin.distanceToSquared(m_)>(t.far-t.near)**2))&&(p_.copy(c).invert(),Gs.copy(t.ray).applyMatrix4(p_),!(a.boundingBox!==null&&Gs.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Gs)))}_computeIntersections(t,n,a){let o;const c=this.geometry,u=this.material,f=c.index,p=c.attributes.position,d=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,x=c.drawRange;if(f!==null)if(Array.isArray(u))for(let b=0,w=g.length;b<w;b++){const y=g[b],S=u[y.materialIndex],C=Math.max(y.start,x.start),L=Math.min(f.count,Math.min(y.start+y.count,x.start+x.count));for(let A=C,U=L;A<U;A+=3){const N=f.getX(A),I=f.getX(A+1),T=f.getX(A+2);o=ou(this,S,t,a,d,v,_,N,I,T),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=y.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),w=Math.min(f.count,x.start+x.count);for(let y=b,S=w;y<S;y+=3){const C=f.getX(y),L=f.getX(y+1),A=f.getX(y+2);o=ou(this,u,t,a,d,v,_,C,L,A),o&&(o.faceIndex=Math.floor(y/3),n.push(o))}}else if(p!==void 0)if(Array.isArray(u))for(let b=0,w=g.length;b<w;b++){const y=g[b],S=u[y.materialIndex],C=Math.max(y.start,x.start),L=Math.min(p.count,Math.min(y.start+y.count,x.start+x.count));for(let A=C,U=L;A<U;A+=3){const N=A,I=A+1,T=A+2;o=ou(this,S,t,a,d,v,_,N,I,T),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=y.materialIndex,n.push(o))}}else{const b=Math.max(0,x.start),w=Math.min(p.count,x.start+x.count);for(let y=b,S=w;y<S;y+=3){const C=y,L=y+1,A=y+2;o=ou(this,u,t,a,d,v,_,C,L,A),o&&(o.faceIndex=Math.floor(y/3),n.push(o))}}}}function Gb(r,t,n,a,o,c,u,f){let p;if(t.side===qn?p=a.intersectTriangle(u,c,o,!0,f):p=a.intersectTriangle(o,c,u,t.side===Ys,f),p===null)return null;ru.copy(f),ru.applyMatrix4(r.matrixWorld);const d=n.ray.origin.distanceTo(ru);return d<n.near||d>n.far?null:{distance:d,point:ru.clone(),object:r}}function ou(r,t,n,a,o,c,u,f,p,d){r.getVertexPosition(f,nu),r.getVertexPosition(p,iu),r.getVertexPosition(d,au);const v=Gb(r,t,n,a,nu,iu,au,g_);if(v){const _=new H;Gi.getBarycoord(g_,nu,iu,au,_),o&&(v.uv=Gi.getInterpolatedAttribute(o,f,p,d,_,new qt)),c&&(v.uv1=Gi.getInterpolatedAttribute(c,f,p,d,_,new qt)),u&&(v.normal=Gi.getInterpolatedAttribute(u,f,p,d,_,new H),v.normal.dot(a.direction)>0&&v.normal.multiplyScalar(-1));const g={a:f,b:p,c:d,normal:new H,materialIndex:0};Gi.getNormal(nu,iu,au,g.normal),v.face=g,v.barycoord=_}return v}class Xp extends zn{constructor(t=null,n=1,a=1,o,c,u,f,p,d=In,v=In,_,g){super(null,u,f,p,d,v,o,c,_,g),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class v_ extends ki{constructor(t,n,a,o=1){super(t,n,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Vr=new Se,__=new Se,lu=[],x_=new $s,Vb=new Se,cl=new Ge,ul=new lo;class Di extends Ge{constructor(t,n,a){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new v_(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<a;o++)this.setMatrixAt(o,Vb)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new $s),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Vr),x_.copy(t.boundingBox).applyMatrix4(Vr),this.boundingBox.union(x_)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new lo),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Vr),ul.copy(t.boundingSphere).applyMatrix4(Vr),this.boundingSphere.union(ul)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){return n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const a=n.morphTargetInfluences,o=this.morphTexture.source.data.data,c=a.length+1,u=t*c+1;for(let f=0;f<a.length;f++)a[f]=o[u+f]}raycast(t,n){const a=this.matrixWorld,o=this.count;if(cl.geometry=this.geometry,cl.material=this.material,cl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ul.copy(this.boundingSphere),ul.applyMatrix4(a),t.ray.intersectsSphere(ul)!==!1))for(let c=0;c<o;c++){this.getMatrixAt(c,Vr),__.multiplyMatrices(a,Vr),cl.matrixWorld=__,cl.raycast(t,lu);for(let u=0,f=lu.length;u<f;u++){const p=lu[u];p.instanceId=c,p.object=this,n.push(p)}lu.length=0}}setColorAt(t,n){return this.instanceColor===null&&(this.instanceColor=new v_(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,n){return n.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,n){const a=n.morphTargetInfluences,o=a.length+1;this.morphTexture===null&&(this.morphTexture=new Xp(new Float32Array(o*this.count),o,this.count,Np,Vi));const c=this.morphTexture.source.data.data;let u=0;for(let d=0;d<a.length;d++)u+=a[d];const f=this.geometry.morphTargetsRelative?1:1-u,p=o*t;return c[p]=f,c.set(a,p+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Vs=new lo,kb=new qt(.5,.5),cu=new H;class Wp{constructor(t=new Da,n=new Da,a=new Da,o=new Da,c=new Da,u=new Da){this.planes=[t,n,a,o,c,u]}set(t,n,a,o,c,u){const f=this.planes;return f[0].copy(t),f[1].copy(n),f[2].copy(a),f[3].copy(o),f[4].copy(c),f[5].copy(u),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=ia,a=!1){const o=this.planes,c=t.elements,u=c[0],f=c[1],p=c[2],d=c[3],v=c[4],_=c[5],g=c[6],x=c[7],b=c[8],w=c[9],y=c[10],S=c[11],C=c[12],L=c[13],A=c[14],U=c[15];if(o[0].setComponents(d-u,x-v,S-b,U-C).normalize(),o[1].setComponents(d+u,x+v,S+b,U+C).normalize(),o[2].setComponents(d+f,x+_,S+w,U+L).normalize(),o[3].setComponents(d-f,x-_,S-w,U-L).normalize(),a)o[4].setComponents(p,g,y,A).normalize(),o[5].setComponents(d-p,x-g,S-y,U-A).normalize();else if(o[4].setComponents(d-p,x-g,S-y,U-A).normalize(),n===ia)o[5].setComponents(d+p,x+g,S+y,U+A).normalize();else if(n===Al)o[5].setComponents(p,g,y,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vs)}intersectsSprite(t){Vs.center.set(0,0,0);const n=kb.distanceTo(t.center);return Vs.radius=.7071067811865476+n,Vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vs)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(cu.x=o.normal.x>0?t.max.x:t.min.x,cu.y=o.normal.y>0?t.max.y:t.min.y,cu.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(cu)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xb extends co{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const S_=new Se,vp=new kp,uu=new lo,fu=new H;class Wb extends Mn{constructor(t=new un,n=new Xb){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.matrixWorld,c=t.params.Points.threshold,u=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),uu.copy(a.boundingSphere),uu.applyMatrix4(o),uu.radius+=c,t.ray.intersectsSphere(uu)===!1)return;S_.copy(o).invert(),vp.copy(t.ray).applyMatrix4(S_);const f=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=f*f,d=a.index,_=a.attributes.position;if(d!==null){const g=Math.max(0,u.start),x=Math.min(d.count,u.start+u.count);for(let b=g,w=x;b<w;b++){const y=d.getX(b);fu.fromBufferAttribute(_,y),y_(fu,y,p,o,t,n,this)}}else{const g=Math.max(0,u.start),x=Math.min(_.count,u.start+u.count);for(let b=g,w=x;b<w;b++)fu.fromBufferAttribute(_,b),y_(fu,b,p,o,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const f=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=c}}}}}function y_(r,t,n,a,o,c,u){const f=vp.distanceSqToPoint(r);if(f<n){const p=new H;vp.closestPointToPoint(r,p),p.applyMatrix4(a);const d=o.ray.origin.distanceTo(p);if(d<o.near||d>o.far)return;c.push({distance:d,distanceToRay:Math.sqrt(f),point:p,index:t,face:null,faceIndex:null,barycoord:null,object:u})}}class Fx extends zn{constructor(t=[],n=Zs,a,o,c,u,f,p,d,v){super(t,n,a,o,c,u,f,p,d,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class qb extends zn{constructor(t,n,a,o,c,u,f,p,d){super(t,n,a,o,c,u,f,p,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rl extends zn{constructor(t,n,a=sa,o,c,u,f=In,p=In,d,v=Pa,_=1){if(v!==Pa&&v!==Ws)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:n,depth:_};super(g,o,c,u,f,p,v,a,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}}class Yb extends Rl{constructor(t,n=sa,a=Zs,o,c,u=In,f=In,p,d=Pa){const v={width:t,height:t,depth:1},_=[v,v,v,v,v,v];super(t,t,n,a,o,c,u,f,p,d),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Bx extends zn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Nl extends un{constructor(t=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const f=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const p=[],d=[],v=[],_=[];let g=0,x=0;b("z","y","x",-1,-1,a,n,t,u,c,0),b("z","y","x",1,-1,a,n,-t,u,c,1),b("x","z","y",1,1,t,a,n,o,u,2),b("x","z","y",1,-1,t,a,-n,o,u,3),b("x","y","z",1,-1,t,n,a,o,c,4),b("x","y","z",-1,-1,t,n,-a,o,c,5),this.setIndex(p),this.setAttribute("position",new Ee(d,3)),this.setAttribute("normal",new Ee(v,3)),this.setAttribute("uv",new Ee(_,2));function b(w,y,S,C,L,A,U,N,I,T,P){const B=A/I,W=U/T,G=A/2,$=U/2,V=N/2,tt=I+1,F=T+1;let X=0,q=0;const it=new H;for(let rt=0;rt<F;rt++){const O=rt*W-$;for(let et=0;et<tt;et++){const j=et*B-G;it[w]=j*C,it[y]=O*L,it[S]=V,d.push(it.x,it.y,it.z),it[w]=0,it[y]=0,it[S]=N>0?1:-1,v.push(it.x,it.y,it.z),_.push(et/I),_.push(1-rt/T),X+=1}}for(let rt=0;rt<T;rt++)for(let O=0;O<I;O++){const et=g+O+tt*rt,j=g+O+tt*(rt+1),J=g+(O+1)+tt*(rt+1),bt=g+(O+1)+tt*rt;p.push(et,j,bt),p.push(j,J,bt),q+=6}f.addGroup(x,q,P),x+=q,g+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class no extends un{constructor(t=1,n=1,a=1,o=32,c=1,u=!1,f=0,p=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:o,heightSegments:c,openEnded:u,thetaStart:f,thetaLength:p};const d=this;o=Math.floor(o),c=Math.floor(c);const v=[],_=[],g=[],x=[];let b=0;const w=[],y=a/2;let S=0;C(),u===!1&&(t>0&&L(!0),n>0&&L(!1)),this.setIndex(v),this.setAttribute("position",new Ee(_,3)),this.setAttribute("normal",new Ee(g,3)),this.setAttribute("uv",new Ee(x,2));function C(){const A=new H,U=new H;let N=0;const I=(n-t)/a;for(let T=0;T<=c;T++){const P=[],B=T/c,W=B*(n-t)+t;for(let G=0;G<=o;G++){const $=G/o,V=$*p+f,tt=Math.sin(V),F=Math.cos(V);U.x=W*tt,U.y=-B*a+y,U.z=W*F,_.push(U.x,U.y,U.z),A.set(tt,I,F).normalize(),g.push(A.x,A.y,A.z),x.push($,1-B),P.push(b++)}w.push(P)}for(let T=0;T<o;T++)for(let P=0;P<c;P++){const B=w[P][T],W=w[P+1][T],G=w[P+1][T+1],$=w[P][T+1];(t>0||P!==0)&&(v.push(B,W,$),N+=3),(n>0||P!==c-1)&&(v.push(W,G,$),N+=3)}d.addGroup(S,N,0),S+=N}function L(A){const U=b,N=new qt,I=new H;let T=0;const P=A===!0?t:n,B=A===!0?1:-1;for(let G=1;G<=o;G++)_.push(0,y*B,0),g.push(0,B,0),x.push(.5,.5),b++;const W=b;for(let G=0;G<=o;G++){const V=G/o*p+f,tt=Math.cos(V),F=Math.sin(V);I.x=P*F,I.y=y*B,I.z=P*tt,_.push(I.x,I.y,I.z),g.push(0,B,0),N.x=tt*.5+.5,N.y=F*.5*B+.5,x.push(N.x,N.y),b++}for(let G=0;G<o;G++){const $=U+G,V=W+G;A===!0?v.push(V,V+1,$):v.push(V+1,V,$),T+=3}d.addGroup(S,T,A===!0?1:2),S+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new no(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nu extends no{constructor(t=1,n=1,a=32,o=1,c=!1,u=0,f=Math.PI*2){super(0,t,n,a,o,c,u,f),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:o,openEnded:c,thetaStart:u,thetaLength:f}}static fromJSON(t){return new Nu(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qp extends un{constructor(t=[],n=[],a=1,o=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:a,detail:o};const c=[],u=[];f(o),d(a),v(),this.setAttribute("position",new Ee(c,3)),this.setAttribute("normal",new Ee(c.slice(),3)),this.setAttribute("uv",new Ee(u,2)),o===0?this.computeVertexNormals():this.normalizeNormals();function f(C){const L=new H,A=new H,U=new H;for(let N=0;N<n.length;N+=3)x(n[N+0],L),x(n[N+1],A),x(n[N+2],U),p(L,A,U,C)}function p(C,L,A,U){const N=U+1,I=[];for(let T=0;T<=N;T++){I[T]=[];const P=C.clone().lerp(A,T/N),B=L.clone().lerp(A,T/N),W=N-T;for(let G=0;G<=W;G++)G===0&&T===N?I[T][G]=P:I[T][G]=P.clone().lerp(B,G/W)}for(let T=0;T<N;T++)for(let P=0;P<2*(N-T)-1;P++){const B=Math.floor(P/2);P%2===0?(g(I[T][B+1]),g(I[T+1][B]),g(I[T][B])):(g(I[T][B+1]),g(I[T+1][B+1]),g(I[T+1][B]))}}function d(C){const L=new H;for(let A=0;A<c.length;A+=3)L.x=c[A+0],L.y=c[A+1],L.z=c[A+2],L.normalize().multiplyScalar(C),c[A+0]=L.x,c[A+1]=L.y,c[A+2]=L.z}function v(){const C=new H;for(let L=0;L<c.length;L+=3){C.x=c[L+0],C.y=c[L+1],C.z=c[L+2];const A=y(C)/2/Math.PI+.5,U=S(C)/Math.PI+.5;u.push(A,1-U)}b(),_()}function _(){for(let C=0;C<u.length;C+=6){const L=u[C+0],A=u[C+2],U=u[C+4],N=Math.max(L,A,U),I=Math.min(L,A,U);N>.9&&I<.1&&(L<.2&&(u[C+0]+=1),A<.2&&(u[C+2]+=1),U<.2&&(u[C+4]+=1))}}function g(C){c.push(C.x,C.y,C.z)}function x(C,L){const A=C*3;L.x=t[A+0],L.y=t[A+1],L.z=t[A+2]}function b(){const C=new H,L=new H,A=new H,U=new H,N=new qt,I=new qt,T=new qt;for(let P=0,B=0;P<c.length;P+=9,B+=6){C.set(c[P+0],c[P+1],c[P+2]),L.set(c[P+3],c[P+4],c[P+5]),A.set(c[P+6],c[P+7],c[P+8]),N.set(u[B+0],u[B+1]),I.set(u[B+2],u[B+3]),T.set(u[B+4],u[B+5]),U.copy(C).add(L).add(A).divideScalar(3);const W=y(U);w(N,B+0,C,W),w(I,B+2,L,W),w(T,B+4,A,W)}}function w(C,L,A,U){U<0&&C.x===1&&(u[L]=C.x-1),A.x===0&&A.z===0&&(u[L]=U/2/Math.PI+.5)}function y(C){return Math.atan2(C.z,-C.x)}function S(C){return Math.atan2(-C.y,Math.sqrt(C.x*C.x+C.z*C.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qp(t.vertices,t.indices,t.radius,t.detail)}}class ra{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){se("Curve: .getPoint() not implemented.")}getPointAt(t,n){const a=this.getUtoTmapping(t);return this.getPoint(a,n)}getPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return n}getSpacedPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPointAt(a/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),c=0;n.push(0);for(let u=1;u<=t;u++)a=this.getPoint(u/t),c+=a.distanceTo(o),n.push(c),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const a=this.getLengths();let o=0;const c=a.length;let u;n?u=n:u=t*a[c-1];let f=0,p=c-1,d;for(;f<=p;)if(o=Math.floor(f+(p-f)/2),d=a[o]-u,d<0)f=o+1;else if(d>0)p=o-1;else{p=o;break}if(o=p,a[o]===u)return o/(c-1);const v=a[o],g=a[o+1]-v,x=(u-v)/g;return(o+x)/(c-1)}getTangent(t,n){let o=t-1e-4,c=t+1e-4;o<0&&(o=0),c>1&&(c=1);const u=this.getPoint(o),f=this.getPoint(c),p=n||(u.isVector2?new qt:new H);return p.copy(f).sub(u).normalize(),p}getTangentAt(t,n){const a=this.getUtoTmapping(t);return this.getTangent(a,n)}computeFrenetFrames(t,n=!1){const a=new H,o=[],c=[],u=[],f=new H,p=new Se;for(let x=0;x<=t;x++){const b=x/t;o[x]=this.getTangentAt(b,new H)}c[0]=new H,u[0]=new H;let d=Number.MAX_VALUE;const v=Math.abs(o[0].x),_=Math.abs(o[0].y),g=Math.abs(o[0].z);v<=d&&(d=v,a.set(1,0,0)),_<=d&&(d=_,a.set(0,1,0)),g<=d&&a.set(0,0,1),f.crossVectors(o[0],a).normalize(),c[0].crossVectors(o[0],f),u[0].crossVectors(o[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),u[x]=u[x-1].clone(),f.crossVectors(o[x-1],o[x]),f.length()>Number.EPSILON){f.normalize();const b=Math.acos(ve(o[x-1].dot(o[x]),-1,1));c[x].applyMatrix4(p.makeRotationAxis(f,b))}u[x].crossVectors(o[x],c[x])}if(n===!0){let x=Math.acos(ve(c[0].dot(c[t]),-1,1));x/=t,o[0].dot(f.crossVectors(c[0],c[t]))>0&&(x=-x);for(let b=1;b<=t;b++)c[b].applyMatrix4(p.makeRotationAxis(o[b],x*b)),u[b].crossVectors(o[b],c[b])}return{tangents:o,normals:c,binormals:u}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Yp extends ra{constructor(t=0,n=0,a=1,o=1,c=0,u=Math.PI*2,f=!1,p=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=c,this.aEndAngle=u,this.aClockwise=f,this.aRotation=p}getPoint(t,n=new qt){const a=n,o=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const u=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=o;for(;c>o;)c-=o;c<Number.EPSILON&&(u?c=0:c=o),this.aClockwise===!0&&!u&&(c===o?c=-o:c=c-o);const f=this.aStartAngle+t*c;let p=this.aX+this.xRadius*Math.cos(f),d=this.aY+this.yRadius*Math.sin(f);if(this.aRotation!==0){const v=Math.cos(this.aRotation),_=Math.sin(this.aRotation),g=p-this.aX,x=d-this.aY;p=g*v-x*_+this.aX,d=g*_+x*v+this.aY}return a.set(p,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Zb extends Yp{constructor(t,n,a,o,c,u){super(t,n,a,a,o,c,u),this.isArcCurve=!0,this.type="ArcCurve"}}function Zp(){let r=0,t=0,n=0,a=0;function o(c,u,f,p){r=c,t=f,n=-3*c+3*u-2*f-p,a=2*c-2*u+f+p}return{initCatmullRom:function(c,u,f,p,d){o(u,f,d*(f-c),d*(p-u))},initNonuniformCatmullRom:function(c,u,f,p,d,v,_){let g=(u-c)/d-(f-c)/(d+v)+(f-u)/v,x=(f-u)/v-(p-u)/(v+_)+(p-f)/_;g*=v,x*=v,o(u,f,g,x)},calc:function(c){const u=c*c,f=u*c;return r+t*c+n*u+a*f}}}const M_=new H,b_=new H,yd=new Zp,Md=new Zp,bd=new Zp;class Hx extends ra{constructor(t=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=a,this.tension=o}getPoint(t,n=new H){const a=n,o=this.points,c=o.length,u=(c-(this.closed?0:1))*t;let f=Math.floor(u),p=u-f;this.closed?f+=f>0?0:(Math.floor(Math.abs(f)/c)+1)*c:p===0&&f===c-1&&(f=c-2,p=1);let d,v;this.closed||f>0?d=o[(f-1)%c]:(b_.subVectors(o[0],o[1]).add(o[0]),d=b_);const _=o[f%c],g=o[(f+1)%c];if(this.closed||f+2<c?v=o[(f+2)%c]:(M_.subVectors(o[c-1],o[c-2]).add(o[c-1]),v=M_),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let b=Math.pow(d.distanceToSquared(_),x),w=Math.pow(_.distanceToSquared(g),x),y=Math.pow(g.distanceToSquared(v),x);w<1e-4&&(w=1),b<1e-4&&(b=w),y<1e-4&&(y=w),yd.initNonuniformCatmullRom(d.x,_.x,g.x,v.x,b,w,y),Md.initNonuniformCatmullRom(d.y,_.y,g.y,v.y,b,w,y),bd.initNonuniformCatmullRom(d.z,_.z,g.z,v.z,b,w,y)}else this.curveType==="catmullrom"&&(yd.initCatmullRom(d.x,_.x,g.x,v.x,this.tension),Md.initCatmullRom(d.y,_.y,g.y,v.y,this.tension),bd.initCatmullRom(d.z,_.z,g.z,v.z,this.tension));return a.set(yd.calc(p),Md.calc(p),bd.calc(p)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new H().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function E_(r,t,n,a,o){const c=(a-t)*.5,u=(o-n)*.5,f=r*r,p=r*f;return(2*n-2*a+c+u)*p+(-3*n+3*a-2*c-u)*f+c*r+n}function Kb(r,t){const n=1-r;return n*n*t}function Jb(r,t){return 2*(1-r)*r*t}function Qb(r,t){return r*r*t}function Sl(r,t,n,a){return Kb(r,t)+Jb(r,n)+Qb(r,a)}function jb(r,t){const n=1-r;return n*n*n*t}function $b(r,t){const n=1-r;return 3*n*n*r*t}function t1(r,t){return 3*(1-r)*r*r*t}function e1(r,t){return r*r*r*t}function yl(r,t,n,a,o){return jb(r,t)+$b(r,n)+t1(r,a)+e1(r,o)}class Gx extends ra{constructor(t=new qt,n=new qt,a=new qt,o=new qt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new qt){const a=n,o=this.v0,c=this.v1,u=this.v2,f=this.v3;return a.set(yl(t,o.x,c.x,u.x,f.x),yl(t,o.y,c.y,u.y,f.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class n1 extends ra{constructor(t=new H,n=new H,a=new H,o=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new H){const a=n,o=this.v0,c=this.v1,u=this.v2,f=this.v3;return a.set(yl(t,o.x,c.x,u.x,f.x),yl(t,o.y,c.y,u.y,f.y),yl(t,o.z,c.z,u.z,f.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vx extends ra{constructor(t=new qt,n=new qt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new qt){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new qt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class i1 extends ra{constructor(t=new H,n=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new H){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new H){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kx extends ra{constructor(t=new qt,n=new qt,a=new qt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new qt){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(Sl(t,o.x,c.x,u.x),Sl(t,o.y,c.y,u.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class a1 extends ra{constructor(t=new H,n=new H,a=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new H){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(Sl(t,o.x,c.x,u.x),Sl(t,o.y,c.y,u.y),Sl(t,o.z,c.z,u.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xx extends ra{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new qt){const a=n,o=this.points,c=(o.length-1)*t,u=Math.floor(c),f=c-u,p=o[u===0?u:u-1],d=o[u],v=o[u>o.length-2?o.length-1:u+1],_=o[u>o.length-3?o.length-1:u+2];return a.set(E_(f,p.x,d.x,v.x,_.x),E_(f,p.y,d.y,v.y,_.y)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new qt().fromArray(o))}return this}}var T_=Object.freeze({__proto__:null,ArcCurve:Zb,CatmullRomCurve3:Hx,CubicBezierCurve:Gx,CubicBezierCurve3:n1,EllipseCurve:Yp,LineCurve:Vx,LineCurve3:i1,QuadraticBezierCurve:kx,QuadraticBezierCurve3:a1,SplineCurve:Xx});class s1 extends ra{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const a=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new T_[a](n,t))}return this}getPoint(t,n){const a=t*this.getLength(),o=this.getCurveLengths();let c=0;for(;c<o.length;){if(o[c]>=a){const u=o[c]-a,f=this.curves[c],p=f.getLength(),d=p===0?0:1-u/p;return f.getPointAt(d,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let a;for(let o=0,c=this.curves;o<c.length;o++){const u=c[o],f=u.isEllipseCurve?t*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?t*u.points.length:t,p=u.getPoints(f);for(let d=0;d<p.length;d++){const v=p[d];a&&a.equals(v)||(n.push(v),a=v)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(new T_[o.type]().fromJSON(o))}return this}}class A_ extends s1{constructor(t){super(),this.type="Path",this.currentPoint=new qt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,a=t.length;n<a;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const a=new Vx(this.currentPoint.clone(),new qt(t,n));return this.curves.push(a),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,a,o){const c=new kx(this.currentPoint.clone(),new qt(t,n),new qt(a,o));return this.curves.push(c),this.currentPoint.set(a,o),this}bezierCurveTo(t,n,a,o,c,u){const f=new Gx(this.currentPoint.clone(),new qt(t,n),new qt(a,o),new qt(c,u));return this.curves.push(f),this.currentPoint.set(c,u),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),a=new Xx(n);return this.curves.push(a),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,a,o,c,u){const f=this.currentPoint.x,p=this.currentPoint.y;return this.absarc(t+f,n+p,a,o,c,u),this}absarc(t,n,a,o,c,u){return this.absellipse(t,n,a,a,o,c,u),this}ellipse(t,n,a,o,c,u,f,p){const d=this.currentPoint.x,v=this.currentPoint.y;return this.absellipse(t+d,n+v,a,o,c,u,f,p),this}absellipse(t,n,a,o,c,u,f,p){const d=new Yp(t,n,a,o,c,u,f,p);if(this.curves.length>0){const _=d.getPoint(0);_.equals(this.currentPoint)||this.lineTo(_.x,_.y)}this.curves.push(d);const v=d.getPoint(1);return this.currentPoint.copy(v),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Wx extends A_{constructor(t){super(t),this.uuid=js(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(new A_().fromJSON(o))}return this}}function r1(r,t,n=2){const a=t&&t.length,o=a?t[0]*n:r.length;let c=qx(r,0,o,n,!0);const u=[];if(!c||c.next===c.prev)return u;let f,p,d;if(a&&(c=f1(r,t,c,n)),r.length>80*n){f=r[0],p=r[1];let v=f,_=p;for(let g=n;g<o;g+=n){const x=r[g],b=r[g+1];x<f&&(f=x),b<p&&(p=b),x>v&&(v=x),b>_&&(_=b)}d=Math.max(v-f,_-p),d=d!==0?32767/d:0}return Cl(c,u,n,f,p,d,0),u}function qx(r,t,n,a,o){let c;if(o===M1(r,t,n,a)>0)for(let u=t;u<n;u+=a)c=w_(u/a|0,r[u],r[u+1],c);else for(let u=n-a;u>=t;u-=a)c=w_(u/a|0,r[u],r[u+1],c);return c&&ro(c,c.next)&&(Ul(c),c=c.next),c}function Js(r,t){if(!r)return r;t||(t=r);let n=r,a;do if(a=!1,!n.steiner&&(ro(n,n.next)||on(n.prev,n,n.next)===0)){if(Ul(n),n=t=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==t);return t}function Cl(r,t,n,a,o,c,u){if(!r)return;!u&&c&&g1(r,a,o,c);let f=r;for(;r.prev!==r.next;){const p=r.prev,d=r.next;if(c?l1(r,a,o,c):o1(r)){t.push(p.i,r.i,d.i),Ul(r),r=d.next,f=d.next;continue}if(r=d,r===f){u?u===1?(r=c1(Js(r),t),Cl(r,t,n,a,o,c,2)):u===2&&u1(r,t,n,a,o,c):Cl(Js(r),t,n,a,o,c,1);break}}}function o1(r){const t=r.prev,n=r,a=r.next;if(on(t,n,a)>=0)return!1;const o=t.x,c=n.x,u=a.x,f=t.y,p=n.y,d=a.y,v=Math.min(o,c,u),_=Math.min(f,p,d),g=Math.max(o,c,u),x=Math.max(f,p,d);let b=a.next;for(;b!==t;){if(b.x>=v&&b.x<=g&&b.y>=_&&b.y<=x&&ml(o,f,c,p,u,d,b.x,b.y)&&on(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function l1(r,t,n,a){const o=r.prev,c=r,u=r.next;if(on(o,c,u)>=0)return!1;const f=o.x,p=c.x,d=u.x,v=o.y,_=c.y,g=u.y,x=Math.min(f,p,d),b=Math.min(v,_,g),w=Math.max(f,p,d),y=Math.max(v,_,g),S=_p(x,b,t,n,a),C=_p(w,y,t,n,a);let L=r.prevZ,A=r.nextZ;for(;L&&L.z>=S&&A&&A.z<=C;){if(L.x>=x&&L.x<=w&&L.y>=b&&L.y<=y&&L!==o&&L!==u&&ml(f,v,p,_,d,g,L.x,L.y)&&on(L.prev,L,L.next)>=0||(L=L.prevZ,A.x>=x&&A.x<=w&&A.y>=b&&A.y<=y&&A!==o&&A!==u&&ml(f,v,p,_,d,g,A.x,A.y)&&on(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;L&&L.z>=S;){if(L.x>=x&&L.x<=w&&L.y>=b&&L.y<=y&&L!==o&&L!==u&&ml(f,v,p,_,d,g,L.x,L.y)&&on(L.prev,L,L.next)>=0)return!1;L=L.prevZ}for(;A&&A.z<=C;){if(A.x>=x&&A.x<=w&&A.y>=b&&A.y<=y&&A!==o&&A!==u&&ml(f,v,p,_,d,g,A.x,A.y)&&on(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function c1(r,t){let n=r;do{const a=n.prev,o=n.next.next;!ro(a,o)&&Zx(a,n,n.next,o)&&Dl(a,o)&&Dl(o,a)&&(t.push(a.i,n.i,o.i),Ul(n),Ul(n.next),n=r=o),n=n.next}while(n!==r);return Js(n)}function u1(r,t,n,a,o,c){let u=r;do{let f=u.next.next;for(;f!==u.prev;){if(u.i!==f.i&&x1(u,f)){let p=Kx(u,f);u=Js(u,u.next),p=Js(p,p.next),Cl(u,t,n,a,o,c,0),Cl(p,t,n,a,o,c,0);return}f=f.next}u=u.next}while(u!==r)}function f1(r,t,n,a){const o=[];for(let c=0,u=t.length;c<u;c++){const f=t[c]*a,p=c<u-1?t[c+1]*a:r.length,d=qx(r,f,p,a,!1);d===d.next&&(d.steiner=!0),o.push(_1(d))}o.sort(h1);for(let c=0;c<o.length;c++)n=d1(o[c],n);return n}function h1(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const a=(r.next.y-r.y)/(r.next.x-r.x),o=(t.next.y-t.y)/(t.next.x-t.x);n=a-o}return n}function d1(r,t){const n=p1(r,t);if(!n)return t;const a=Kx(n,r);return Js(a,a.next),Js(n,n.next)}function p1(r,t){let n=t;const a=r.x,o=r.y;let c=-1/0,u;if(ro(r,n))return n;do{if(ro(r,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const _=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(_<=a&&_>c&&(c=_,u=n.x<n.next.x?n:n.next,_===a))return u}n=n.next}while(n!==t);if(!u)return null;const f=u,p=u.x,d=u.y;let v=1/0;n=u;do{if(a>=n.x&&n.x>=p&&a!==n.x&&Yx(o<d?a:c,o,p,d,o<d?c:a,o,n.x,n.y)){const _=Math.abs(o-n.y)/(a-n.x);Dl(n,r)&&(_<v||_===v&&(n.x>u.x||n.x===u.x&&m1(u,n)))&&(u=n,v=_)}n=n.next}while(n!==f);return u}function m1(r,t){return on(r.prev,r,t.prev)<0&&on(t.next,r,r.next)<0}function g1(r,t,n,a){let o=r;do o.z===0&&(o.z=_p(o.x,o.y,t,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==r);o.prevZ.nextZ=null,o.prevZ=null,v1(o)}function v1(r){let t,n=1;do{let a=r,o;r=null;let c=null;for(t=0;a;){t++;let u=a,f=0;for(let d=0;d<n&&(f++,u=u.nextZ,!!u);d++);let p=n;for(;f>0||p>0&&u;)f!==0&&(p===0||!u||a.z<=u.z)?(o=a,a=a.nextZ,f--):(o=u,u=u.nextZ,p--),c?c.nextZ=o:r=o,o.prevZ=c,c=o;a=u}c.nextZ=null,n*=2}while(t>1);return r}function _p(r,t,n,a,o){return r=(r-n)*o|0,t=(t-a)*o|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function _1(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function Yx(r,t,n,a,o,c,u,f){return(o-u)*(t-f)>=(r-u)*(c-f)&&(r-u)*(a-f)>=(n-u)*(t-f)&&(n-u)*(c-f)>=(o-u)*(a-f)}function ml(r,t,n,a,o,c,u,f){return!(r===u&&t===f)&&Yx(r,t,n,a,o,c,u,f)}function x1(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!S1(r,t)&&(Dl(r,t)&&Dl(t,r)&&y1(r,t)&&(on(r.prev,r,t.prev)||on(r,t.prev,t))||ro(r,t)&&on(r.prev,r,r.next)>0&&on(t.prev,t,t.next)>0)}function on(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function ro(r,t){return r.x===t.x&&r.y===t.y}function Zx(r,t,n,a){const o=du(on(r,t,n)),c=du(on(r,t,a)),u=du(on(n,a,r)),f=du(on(n,a,t));return!!(o!==c&&u!==f||o===0&&hu(r,n,t)||c===0&&hu(r,a,t)||u===0&&hu(n,r,a)||f===0&&hu(n,t,a))}function hu(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function du(r){return r>0?1:r<0?-1:0}function S1(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&Zx(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function Dl(r,t){return on(r.prev,r,r.next)<0?on(r,t,r.next)>=0&&on(r,r.prev,t)>=0:on(r,t,r.prev)<0||on(r,r.next,t)<0}function y1(r,t){let n=r,a=!1;const o=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&o<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==r);return a}function Kx(r,t){const n=xp(r.i,r.x,r.y),a=xp(t.i,t.x,t.y),o=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=o,o.prev=n,a.next=n,n.prev=a,c.next=a,a.prev=c,a}function w_(r,t,n,a){const o=xp(r,t,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function Ul(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function xp(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function M1(r,t,n,a){let o=0;for(let c=t,u=n-a;c<n;c+=a)o+=(r[u]-r[c])*(r[c+1]+r[u+1]),u=c;return o}class b1{static triangulate(t,n,a=2){return r1(t,n,a)}}class Ml{static area(t){const n=t.length;let a=0;for(let o=n-1,c=0;c<n;o=c++)a+=t[o].x*t[c].y-t[c].x*t[o].y;return a*.5}static isClockWise(t){return Ml.area(t)<0}static triangulateShape(t,n){const a=[],o=[],c=[];R_(t),C_(a,t);let u=t.length;n.forEach(R_);for(let p=0;p<n.length;p++)o.push(u),u+=n[p].length,C_(a,n[p]);const f=b1.triangulate(a,o);for(let p=0;p<f.length;p+=3)c.push(f.slice(p,p+3));return c}}function R_(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function C_(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class Kp extends qp{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,o=[-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(o,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new Kp(t.radius,t.detail)}}class qs extends un{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const c=t/2,u=n/2,f=Math.floor(a),p=Math.floor(o),d=f+1,v=p+1,_=t/f,g=n/p,x=[],b=[],w=[],y=[];for(let S=0;S<v;S++){const C=S*g-u;for(let L=0;L<d;L++){const A=L*_-c;b.push(A,-C,0),w.push(0,0,1),y.push(L/f),y.push(1-S/p)}}for(let S=0;S<p;S++)for(let C=0;C<f;C++){const L=C+d*S,A=C+d*(S+1),U=C+1+d*(S+1),N=C+1+d*S;x.push(L,A,N),x.push(A,U,N)}this.setIndex(x),this.setAttribute("position",new Ee(b,3)),this.setAttribute("normal",new Ee(w,3)),this.setAttribute("uv",new Ee(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Jp extends un{constructor(t=new Wx([new qt(0,.5),new qt(-.5,-.5),new qt(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};const a=[],o=[],c=[],u=[];let f=0,p=0;if(Array.isArray(t)===!1)d(t);else for(let v=0;v<t.length;v++)d(t[v]),this.addGroup(f,p,v),f+=p,p=0;this.setIndex(a),this.setAttribute("position",new Ee(o,3)),this.setAttribute("normal",new Ee(c,3)),this.setAttribute("uv",new Ee(u,2));function d(v){const _=o.length/3,g=v.extractPoints(n);let x=g.shape;const b=g.holes;Ml.isClockWise(x)===!1&&(x=x.reverse());for(let y=0,S=b.length;y<S;y++){const C=b[y];Ml.isClockWise(C)===!0&&(b[y]=C.reverse())}const w=Ml.triangulateShape(x,b);for(let y=0,S=b.length;y<S;y++){const C=b[y];x=x.concat(C)}for(let y=0,S=x.length;y<S;y++){const C=x[y];o.push(C.x,C.y,0),c.push(0,0,1),u.push(C.x,C.y)}for(let y=0,S=w.length;y<S;y++){const C=w[y],L=C[0]+_,A=C[1]+_,U=C[2]+_;a.push(L,A,U),p+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes;return E1(n,t)}static fromJSON(t,n){const a=[];for(let o=0,c=t.shapes.length;o<c;o++){const u=n[t.shapes[o]];a.push(u)}return new Jp(a,t.curveSegments)}}function E1(r,t){if(t.shapes=[],Array.isArray(r))for(let n=0,a=r.length;n<a;n++){const o=r[n];t.shapes.push(o.uuid)}else t.shapes.push(r.uuid);return t}class vs extends un{constructor(t=1,n=32,a=16,o=0,c=Math.PI*2,u=0,f=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:o,phiLength:c,thetaStart:u,thetaLength:f},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const p=Math.min(u+f,Math.PI);let d=0;const v=[],_=new H,g=new H,x=[],b=[],w=[],y=[];for(let S=0;S<=a;S++){const C=[],L=S/a,A=u+L*f,U=t*Math.cos(A),N=Math.sqrt(t*t-U*U);let I=0;S===0&&u===0?I=.5/n:S===a&&p===Math.PI&&(I=-.5/n);for(let T=0;T<=n;T++){const P=T/n,B=o+P*c;_.x=-N*Math.cos(B),_.y=U,_.z=N*Math.sin(B),b.push(_.x,_.y,_.z),g.copy(_).normalize(),w.push(g.x,g.y,g.z),y.push(P+I,1-L),C.push(d++)}v.push(C)}for(let S=0;S<a;S++)for(let C=0;C<n;C++){const L=v[S][C+1],A=v[S][C],U=v[S+1][C],N=v[S+1][C+1];(S!==0||u>0)&&x.push(L,A,N),(S!==a-1||p<Math.PI)&&x.push(A,U,N)}this.setIndex(x),this.setAttribute("position",new Ee(b,3)),this.setAttribute("normal",new Ee(w,3)),this.setAttribute("uv",new Ee(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function oo(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const o=r[n][a];if(D_(o))o.isRenderTargetTexture?(se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone();else if(Array.isArray(o))if(D_(o[0])){const c=[];for(let u=0,f=o.length;u<f;u++)c[u]=o[u].clone();t[n][a]=c}else t[n][a]=o.slice();else t[n][a]=o}}return t}function Wn(r){const t={};for(let n=0;n<r.length;n++){const a=oo(r[n]);for(const o in a)t[o]=a[o]}return t}function D_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function T1(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function Jx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:we.workingColorSpace}const Qx={clone:oo,merge:Wn};var A1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,w1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends co{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=A1,this.fragmentShader=w1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=oo(t.uniforms),this.uniformsGroups=T1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(t).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const o=t.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new ee().setHex(o.value);break;case"v2":this.uniforms[a].value=new qt().fromArray(o.value);break;case"v3":this.uniforms[a].value=new H().fromArray(o.value);break;case"v4":this.uniforms[a].value=new an().fromArray(o.value);break;case"m3":this.uniforms[a].value=new re().fromArray(o.value);break;case"m4":this.uniforms[a].value=new Se().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class R1 extends ai{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Li extends co{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gp,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class U_ extends Li{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new qt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class C1 extends co{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class D1 extends co{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Qp extends Mn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class U1 extends Qp{constructor(t,n,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const Ed=new Se,L_=new H,N_=new H;class L1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wp,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new an(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera;L_.setFromMatrixPosition(t.matrixWorld),n.position.copy(L_),N_.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(N_),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,a,o){Ed.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix(Ed,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,u=o?o.z/c.x:1,f=o?o.w/c.y:1,p=o?o.x/c.x:0,d=o?o.y/c.y:0;t.coordinateSystem===Al||t.reversedDepth?n.set(.5*u,0,0,.5*u+p,0,.5*f,0,.5*f+d,0,0,1,0,0,0,0,1):n.set(.5*u,0,0,.5*u+p,0,.5*f,0,.5*f+d,0,0,.5,.5,0,0,0,1),n.multiply(Ed)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const pu=new H,mu=new Wi,ji=new H;class jx extends Mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=ia,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(pu,mu,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pu,mu,ji.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(pu,mu,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pu,mu,ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ds=new H,O_=new qt,P_=new qt;class Ui extends jx{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=wl*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(_l*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wl*2*Math.atan(Math.tan(_l*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){ds.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ds.x,ds.y).multiplyScalar(-t/ds.z),ds.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(ds.x,ds.y).multiplyScalar(-t/ds.z)}getViewSize(t,n){return this.getViewBounds(t,O_,P_),n.subVectors(P_,O_)}setViewOffset(t,n,a,o,c,u){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(_l*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const p=u.fullWidth,d=u.fullHeight;c+=u.offsetX*o/p,n-=u.offsetY*a/d,o*=u.width/p,a*=u.height/d}const f=this.filmOffset;f!==0&&(c+=t*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class jp extends jx{constructor(t=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-t,u=a+t,f=o+n,p=o-n;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,u=c+d*this.view.width,f-=v*this.view.offsetY,p=f-v*this.view.height}this.projectionMatrix.makeOrthographic(c,u,f,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class N1 extends L1{constructor(){super(new jp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Td extends Qp{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.shadow=new N1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const kr=-90,Xr=1;class O1 extends Mn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Ui(kr,Xr,t,n);o.layers=this.layers,this.add(o);const c=new Ui(kr,Xr,t,n);c.layers=this.layers,this.add(c);const u=new Ui(kr,Xr,t,n);u.layers=this.layers,this.add(u);const f=new Ui(kr,Xr,t,n);f.layers=this.layers,this.add(f);const p=new Ui(kr,Xr,t,n);p.layers=this.layers,this.add(p);const d=new Ui(kr,Xr,t,n);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,f,p]=n;for(const d of n)this.remove(d);if(t===ia)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===Al)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of n)this.add(d),d.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,u,f,p,d,v]=this.children,_=t.getRenderTarget(),g=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const w=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let y=!1;t.isWebGLRenderer===!0?y=t.state.buffers.depth.getReversed():y=t.reversedDepthBuffer,t.setRenderTarget(a,0,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,1,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(a,2,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,f),t.setRenderTarget(a,3,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,p),t.setRenderTarget(a,4,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),a.texture.generateMipmaps=w,t.setRenderTarget(a,5,o),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,v),t.setRenderTarget(_,g,x),t.xr.enabled=b,a.texture.needsPMREMUpdate=!0}}class P1 extends Ui{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const I_=new Se;class I1{constructor(t,n,a=0,o=1/0){this.ray=new kp(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new Gp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Ne("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return I_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(I_),this}intersectObject(t,n=!0,a=[]){return Sp(t,this,a,n),a.sort(z_),a}intersectObjects(t,n=!0,a=[]){for(let o=0,c=t.length;o<c;o++)Sp(t[o],this,a,n);return a.sort(z_),a}}function z_(r,t){return r.distance-t.distance}function Sp(r,t,n,a){let o=!0;if(r.layers.test(t.layers)&&r.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,f=c.length;u<f;u++)Sp(c[u],t,n,!0)}}const rm=class rm{constructor(t,n,a,o){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,o){const c=this.elements;return c[0]=t,c[2]=n,c[1]=a,c[3]=o,this}};rm.prototype.isMatrix2=!0;let F_=rm;function B_(r,t,n,a){const o=z1(a);switch(n){case Dx:return r*t;case Np:return r*t/o.components*o.byteLength;case Op:return r*t/o.components*o.byteLength;case Ks:return r*t*2/o.components*o.byteLength;case Pp:return r*t*2/o.components*o.byteLength;case Ux:return r*t*3/o.components*o.byteLength;case vi:return r*t*4/o.components*o.byteLength;case Ip:return r*t*4/o.components*o.byteLength;case xu:case Su:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case yu:case Mu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Gd:case kd:return Math.max(r,16)*Math.max(t,8)/4;case Hd:case Vd:return Math.max(r,8)*Math.max(t,8)/2;case Xd:case Wd:case Yd:case Zd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case qd:case Cu:case Kd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Jd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Qd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case jd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case $d:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case tp:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ep:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case np:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case ip:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case ap:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case sp:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case rp:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case op:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case lp:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case cp:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case up:case fp:case hp:return Math.ceil(r/4)*Math.ceil(t/4)*16;case dp:case pp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Du:case mp:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function z1(r){switch(r){case Dn:case Ax:return{byteLength:1,components:1};case El:case wx:case Yn:return{byteLength:2,components:1};case Up:case Lp:return{byteLength:2,components:4};case sa:case Dp:case Vi:return{byteLength:4,components:1};case Rx:case Cx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rp}}));typeof window<"u"&&(window.__THREE__?se("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $x(){let r=null,t=!1,n=null,a=null;function o(c,u){a=r.requestAnimationFrame(o),n(c,u)}return{start:function(){t!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function F1(r){const t=new WeakMap;function n(f,p){const d=f.array,v=f.usage,_=d.byteLength,g=r.createBuffer();r.bindBuffer(p,g),r.bufferData(p,d,v),f.onUploadCallback();let x;if(d instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)x=r.HALF_FLOAT;else if(d instanceof Uint16Array)f.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=r.SHORT;else if(d instanceof Uint32Array)x=r.UNSIGNED_INT;else if(d instanceof Int32Array)x=r.INT;else if(d instanceof Int8Array)x=r.BYTE;else if(d instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:f.version,size:_}}function a(f,p,d){const v=p.array,_=p.updateRanges;if(r.bindBuffer(d,f),_.length===0)r.bufferSubData(d,0,v);else{_.sort((x,b)=>x.start-b.start);let g=0;for(let x=1;x<_.length;x++){const b=_[g],w=_[x];w.start<=b.start+b.count+1?b.count=Math.max(b.count,w.start+w.count-b.start):(++g,_[g]=w)}_.length=g+1;for(let x=0,b=_.length;x<b;x++){const w=_[x];r.bufferSubData(d,w.start*v.BYTES_PER_ELEMENT,v,w.start,w.count)}p.clearUpdateRanges()}p.onUploadCallback()}function o(f){return f.isInterleavedBufferAttribute&&(f=f.data),t.get(f)}function c(f){f.isInterleavedBufferAttribute&&(f=f.data);const p=t.get(f);p&&(r.deleteBuffer(p.buffer),t.delete(f))}function u(f,p){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const v=t.get(f);(!v||v.version<f.version)&&t.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const d=t.get(f);if(d===void 0)t.set(f,n(f,p));else if(d.version<f.version){if(d.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(d.buffer,f,p),d.version=f.version}}return{get:o,remove:c,update:u}}var B1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,H1=`#ifdef USE_ALPHAHASH
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
#endif`,G1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,V1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,k1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,X1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,W1=`#ifdef USE_AOMAP
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
#endif`,q1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Y1=`#ifdef USE_BATCHING
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
#endif`,Z1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,K1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,J1=`vec3 objectNormal = vec3( normal );
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
} // validated`,j1=`#ifdef USE_IRIDESCENCE
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
#endif`,$1=`#ifdef USE_BUMPMAP
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
#endif`,tE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,eE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,iE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,aE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,oE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,lE=`#define PI 3.141592653589793
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
} // validated`,cE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,uE=`vec3 transformedNormal = objectNormal;
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
#endif`,fE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mE="gl_FragColor = linearToOutputTexel( gl_FragColor );",gE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vE=`#ifdef USE_ENVMAP
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
#endif`,_E=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xE=`#ifdef USE_ENVMAP
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
#endif`,SE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yE=`#ifdef USE_ENVMAP
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
#endif`,ME=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,EE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,TE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,AE=`#ifdef USE_GRADIENTMAP
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
}`,wE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,RE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,CE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,DE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,UE=`#ifdef USE_ENVMAP
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
#endif`,LE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,NE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,OE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,IE=`PhysicalMaterial material;
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
}`,FE=`
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
#endif`,BE=`#if defined( RE_IndirectDiffuse )
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
#endif`,HE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,GE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,VE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,WE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,YE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ZE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,KE=`#if defined( USE_POINTS_UV )
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
#endif`,JE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,QE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$E=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eT=`#ifdef USE_MORPHTARGETS
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
#endif`,nT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,aT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,lT=`#ifdef USE_NORMALMAP
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
#endif`,cT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,mT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_T=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ST=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,MT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ET=`float getShadowMask() {
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
}`,TT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,AT=`#ifdef USE_SKINNING
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
#endif`,wT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,RT=`#ifdef USE_SKINNING
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
#endif`,CT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,DT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,UT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,LT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,NT=`#ifdef USE_TRANSMISSION
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
#endif`,OT=`#ifdef USE_TRANSMISSION
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
#endif`,PT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,IT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,FT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const BT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,HT=`uniform sampler2D t2D;
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
}`,GT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WT=`#include <common>
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
}`,qT=`#if DEPTH_PACKING == 3200
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
}`,YT=`#define DISTANCE
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
}`,ZT=`#define DISTANCE
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
}`,KT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,JT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QT=`uniform float scale;
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
}`,jT=`uniform vec3 diffuse;
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
}`,$T=`#include <common>
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
}`,tA=`uniform vec3 diffuse;
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
}`,eA=`#define LAMBERT
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
}`,nA=`#define LAMBERT
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
}`,iA=`#define MATCAP
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
}`,aA=`#define MATCAP
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
}`,sA=`#define NORMAL
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
}`,rA=`#define NORMAL
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
}`,oA=`#define PHONG
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
}`,lA=`#define PHONG
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
}`,cA=`#define STANDARD
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
}`,uA=`#define STANDARD
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
}`,fA=`#define TOON
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
}`,hA=`#define TOON
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
}`,dA=`uniform float size;
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
}`,pA=`uniform vec3 diffuse;
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
}`,mA=`#include <common>
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
}`,gA=`uniform vec3 color;
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
}`,vA=`uniform float rotation;
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
}`,_A=`uniform vec3 diffuse;
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
}`,pe={alphahash_fragment:B1,alphahash_pars_fragment:H1,alphamap_fragment:G1,alphamap_pars_fragment:V1,alphatest_fragment:k1,alphatest_pars_fragment:X1,aomap_fragment:W1,aomap_pars_fragment:q1,batching_pars_vertex:Y1,batching_vertex:Z1,begin_vertex:K1,beginnormal_vertex:J1,bsdfs:Q1,iridescence_fragment:j1,bumpmap_pars_fragment:$1,clipping_planes_fragment:tE,clipping_planes_pars_fragment:eE,clipping_planes_pars_vertex:nE,clipping_planes_vertex:iE,color_fragment:aE,color_pars_fragment:sE,color_pars_vertex:rE,color_vertex:oE,common:lE,cube_uv_reflection_fragment:cE,defaultnormal_vertex:uE,displacementmap_pars_vertex:fE,displacementmap_vertex:hE,emissivemap_fragment:dE,emissivemap_pars_fragment:pE,colorspace_fragment:mE,colorspace_pars_fragment:gE,envmap_fragment:vE,envmap_common_pars_fragment:_E,envmap_pars_fragment:xE,envmap_pars_vertex:SE,envmap_physical_pars_fragment:UE,envmap_vertex:yE,fog_vertex:ME,fog_pars_vertex:bE,fog_fragment:EE,fog_pars_fragment:TE,gradientmap_pars_fragment:AE,lightmap_pars_fragment:wE,lights_lambert_fragment:RE,lights_lambert_pars_fragment:CE,lights_pars_begin:DE,lights_toon_fragment:LE,lights_toon_pars_fragment:NE,lights_phong_fragment:OE,lights_phong_pars_fragment:PE,lights_physical_fragment:IE,lights_physical_pars_fragment:zE,lights_fragment_begin:FE,lights_fragment_maps:BE,lights_fragment_end:HE,lightprobes_pars_fragment:GE,logdepthbuf_fragment:VE,logdepthbuf_pars_fragment:kE,logdepthbuf_pars_vertex:XE,logdepthbuf_vertex:WE,map_fragment:qE,map_pars_fragment:YE,map_particle_fragment:ZE,map_particle_pars_fragment:KE,metalnessmap_fragment:JE,metalnessmap_pars_fragment:QE,morphinstance_vertex:jE,morphcolor_vertex:$E,morphnormal_vertex:tT,morphtarget_pars_vertex:eT,morphtarget_vertex:nT,normal_fragment_begin:iT,normal_fragment_maps:aT,normal_pars_fragment:sT,normal_pars_vertex:rT,normal_vertex:oT,normalmap_pars_fragment:lT,clearcoat_normal_fragment_begin:cT,clearcoat_normal_fragment_maps:uT,clearcoat_pars_fragment:fT,iridescence_pars_fragment:hT,opaque_fragment:dT,packing:pT,premultiplied_alpha_fragment:mT,project_vertex:gT,dithering_fragment:vT,dithering_pars_fragment:_T,roughnessmap_fragment:xT,roughnessmap_pars_fragment:ST,shadowmap_pars_fragment:yT,shadowmap_pars_vertex:MT,shadowmap_vertex:bT,shadowmask_pars_fragment:ET,skinbase_vertex:TT,skinning_pars_vertex:AT,skinning_vertex:wT,skinnormal_vertex:RT,specularmap_fragment:CT,specularmap_pars_fragment:DT,tonemapping_fragment:UT,tonemapping_pars_fragment:LT,transmission_fragment:NT,transmission_pars_fragment:OT,uv_pars_fragment:PT,uv_pars_vertex:IT,uv_vertex:zT,worldpos_vertex:FT,background_vert:BT,background_frag:HT,backgroundCube_vert:GT,backgroundCube_frag:VT,cube_vert:kT,cube_frag:XT,depth_vert:WT,depth_frag:qT,distance_vert:YT,distance_frag:ZT,equirect_vert:KT,equirect_frag:JT,linedashed_vert:QT,linedashed_frag:jT,meshbasic_vert:$T,meshbasic_frag:tA,meshlambert_vert:eA,meshlambert_frag:nA,meshmatcap_vert:iA,meshmatcap_frag:aA,meshnormal_vert:sA,meshnormal_frag:rA,meshphong_vert:oA,meshphong_frag:lA,meshphysical_vert:cA,meshphysical_frag:uA,meshtoon_vert:fA,meshtoon_frag:hA,points_vert:dA,points_frag:pA,shadow_vert:mA,shadow_frag:gA,sprite_vert:vA,sprite_frag:_A},Ft={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},ta={basic:{uniforms:Wn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:pe.meshbasic_vert,fragmentShader:pe.meshbasic_frag},lambert:{uniforms:Wn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:pe.meshlambert_vert,fragmentShader:pe.meshlambert_frag},phong:{uniforms:Wn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pe.meshphong_vert,fragmentShader:pe.meshphong_frag},standard:{uniforms:Wn([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pe.meshphysical_vert,fragmentShader:pe.meshphysical_frag},toon:{uniforms:Wn([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new ee(0)}}]),vertexShader:pe.meshtoon_vert,fragmentShader:pe.meshtoon_frag},matcap:{uniforms:Wn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:pe.meshmatcap_vert,fragmentShader:pe.meshmatcap_frag},points:{uniforms:Wn([Ft.points,Ft.fog]),vertexShader:pe.points_vert,fragmentShader:pe.points_frag},dashed:{uniforms:Wn([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pe.linedashed_vert,fragmentShader:pe.linedashed_frag},depth:{uniforms:Wn([Ft.common,Ft.displacementmap]),vertexShader:pe.depth_vert,fragmentShader:pe.depth_frag},normal:{uniforms:Wn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:pe.meshnormal_vert,fragmentShader:pe.meshnormal_frag},sprite:{uniforms:Wn([Ft.sprite,Ft.fog]),vertexShader:pe.sprite_vert,fragmentShader:pe.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pe.background_vert,fragmentShader:pe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:pe.backgroundCube_vert,fragmentShader:pe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pe.cube_vert,fragmentShader:pe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pe.equirect_vert,fragmentShader:pe.equirect_frag},distance:{uniforms:Wn([Ft.common,Ft.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pe.distance_vert,fragmentShader:pe.distance_frag},shadow:{uniforms:Wn([Ft.lights,Ft.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:pe.shadow_vert,fragmentShader:pe.shadow_frag}};ta.physical={uniforms:Wn([ta.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:pe.meshphysical_vert,fragmentShader:pe.meshphysical_frag};const gu={r:0,b:0,g:0},xA=new Se,tS=new re;tS.set(-1,0,0,0,1,0,0,0,1);function SA(r,t,n,a,o,c){const u=new ee(0);let f=o===!0?0:1,p,d,v=null,_=0,g=null;function x(C){let L=C.isScene===!0?C.background:null;if(L&&L.isTexture){const A=C.backgroundBlurriness>0;L=t.get(L,A)}return L}function b(C){let L=!1;const A=x(C);A===null?y(u,f):A&&A.isColor&&(y(A,1),L=!0);const U=r.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,c):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||L)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function w(C,L){const A=x(L);A&&(A.isCubeTexture||A.mapping===Ll)?(d===void 0&&(d=new Ge(new Nl(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:oo(ta.backgroundCube.uniforms),vertexShader:ta.backgroundCube.vertexShader,fragmentShader:ta.backgroundCube.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(U,N,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),d.material.uniforms.envMap.value=A,d.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(xA.makeRotationFromEuler(L.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(tS),d.material.toneMapped=we.getTransfer(A.colorSpace)!==Xe,(v!==A||_!==A.version||g!==r.toneMapping)&&(d.material.needsUpdate=!0,v=A,_=A.version,g=r.toneMapping),d.layers.enableAll(),C.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(p===void 0&&(p=new Ge(new qs(2,2),new ai({name:"BackgroundMaterial",uniforms:oo(ta.background.uniforms),vertexShader:ta.background.vertexShader,fragmentShader:ta.background.fragmentShader,side:Ys,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(p)),p.material.uniforms.t2D.value=A,p.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,p.material.toneMapped=we.getTransfer(A.colorSpace)!==Xe,A.matrixAutoUpdate===!0&&A.updateMatrix(),p.material.uniforms.uvTransform.value.copy(A.matrix),(v!==A||_!==A.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,v=A,_=A.version,g=r.toneMapping),p.layers.enableAll(),C.unshift(p,p.geometry,p.material,0,0,null))}function y(C,L){C.getRGB(gu,Jx(r)),n.buffers.color.setClear(gu.r,gu.g,gu.b,L,c)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return u},setClearColor:function(C,L=1){u.set(C),f=L,y(u,f)},getClearAlpha:function(){return f},setClearAlpha:function(C){f=C,y(u,f)},render:b,addToRenderList:w,dispose:S}}function yA(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=g(null);let c=o,u=!1;function f(W,G,$,V,tt){let F=!1;const X=_(W,V,$,G);c!==X&&(c=X,d(c.object)),F=x(W,V,$,tt),F&&b(W,V,$,tt),tt!==null&&t.update(tt,r.ELEMENT_ARRAY_BUFFER),(F||u)&&(u=!1,A(W,G,$,V),tt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(tt).buffer))}function p(){return r.createVertexArray()}function d(W){return r.bindVertexArray(W)}function v(W){return r.deleteVertexArray(W)}function _(W,G,$,V){const tt=V.wireframe===!0;let F=a[G.id];F===void 0&&(F={},a[G.id]=F);const X=W.isInstancedMesh===!0?W.id:0;let q=F[X];q===void 0&&(q={},F[X]=q);let it=q[$.id];it===void 0&&(it={},q[$.id]=it);let rt=it[tt];return rt===void 0&&(rt=g(p()),it[tt]=rt),rt}function g(W){const G=[],$=[],V=[];for(let tt=0;tt<n;tt++)G[tt]=0,$[tt]=0,V[tt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:$,attributeDivisors:V,object:W,attributes:{},index:null}}function x(W,G,$,V){const tt=c.attributes,F=G.attributes;let X=0;const q=$.getAttributes();for(const it in q)if(q[it].location>=0){const O=tt[it];let et=F[it];if(et===void 0&&(it==="instanceMatrix"&&W.instanceMatrix&&(et=W.instanceMatrix),it==="instanceColor"&&W.instanceColor&&(et=W.instanceColor)),O===void 0||O.attribute!==et||et&&O.data!==et.data)return!0;X++}return c.attributesNum!==X||c.index!==V}function b(W,G,$,V){const tt={},F=G.attributes;let X=0;const q=$.getAttributes();for(const it in q)if(q[it].location>=0){let O=F[it];O===void 0&&(it==="instanceMatrix"&&W.instanceMatrix&&(O=W.instanceMatrix),it==="instanceColor"&&W.instanceColor&&(O=W.instanceColor));const et={};et.attribute=O,O&&O.data&&(et.data=O.data),tt[it]=et,X++}c.attributes=tt,c.attributesNum=X,c.index=V}function w(){const W=c.newAttributes;for(let G=0,$=W.length;G<$;G++)W[G]=0}function y(W){S(W,0)}function S(W,G){const $=c.newAttributes,V=c.enabledAttributes,tt=c.attributeDivisors;$[W]=1,V[W]===0&&(r.enableVertexAttribArray(W),V[W]=1),tt[W]!==G&&(r.vertexAttribDivisor(W,G),tt[W]=G)}function C(){const W=c.newAttributes,G=c.enabledAttributes;for(let $=0,V=G.length;$<V;$++)G[$]!==W[$]&&(r.disableVertexAttribArray($),G[$]=0)}function L(W,G,$,V,tt,F,X){X===!0?r.vertexAttribIPointer(W,G,$,tt,F):r.vertexAttribPointer(W,G,$,V,tt,F)}function A(W,G,$,V){w();const tt=V.attributes,F=$.getAttributes(),X=G.defaultAttributeValues;for(const q in F){const it=F[q];if(it.location>=0){let rt=tt[q];if(rt===void 0&&(q==="instanceMatrix"&&W.instanceMatrix&&(rt=W.instanceMatrix),q==="instanceColor"&&W.instanceColor&&(rt=W.instanceColor)),rt!==void 0){const O=rt.normalized,et=rt.itemSize,j=t.get(rt);if(j===void 0)continue;const J=j.buffer,bt=j.type,Dt=j.bytesPerElement,at=bt===r.INT||bt===r.UNSIGNED_INT||rt.gpuType===Dp;if(rt.isInterleavedBufferAttribute){const pt=rt.data,Tt=pt.stride,It=rt.offset;if(pt.isInstancedInterleavedBuffer){for(let At=0;At<it.locationSize;At++)S(it.location+At,pt.meshPerAttribute);W.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let At=0;At<it.locationSize;At++)y(it.location+At);r.bindBuffer(r.ARRAY_BUFFER,J);for(let At=0;At<it.locationSize;At++)L(it.location+At,et/it.locationSize,bt,O,Tt*Dt,(It+et/it.locationSize*At)*Dt,at)}else{if(rt.isInstancedBufferAttribute){for(let pt=0;pt<it.locationSize;pt++)S(it.location+pt,rt.meshPerAttribute);W.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let pt=0;pt<it.locationSize;pt++)y(it.location+pt);r.bindBuffer(r.ARRAY_BUFFER,J);for(let pt=0;pt<it.locationSize;pt++)L(it.location+pt,et/it.locationSize,bt,O,et*Dt,et/it.locationSize*pt*Dt,at)}}else if(X!==void 0){const O=X[q];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(it.location,O);break;case 3:r.vertexAttrib3fv(it.location,O);break;case 4:r.vertexAttrib4fv(it.location,O);break;default:r.vertexAttrib1fv(it.location,O)}}}}C()}function U(){P();for(const W in a){const G=a[W];for(const $ in G){const V=G[$];for(const tt in V){const F=V[tt];for(const X in F)v(F[X].object),delete F[X];delete V[tt]}}delete a[W]}}function N(W){if(a[W.id]===void 0)return;const G=a[W.id];for(const $ in G){const V=G[$];for(const tt in V){const F=V[tt];for(const X in F)v(F[X].object),delete F[X];delete V[tt]}}delete a[W.id]}function I(W){for(const G in a){const $=a[G];for(const V in $){const tt=$[V];if(tt[W.id]===void 0)continue;const F=tt[W.id];for(const X in F)v(F[X].object),delete F[X];delete tt[W.id]}}}function T(W){for(const G in a){const $=a[G],V=W.isInstancedMesh===!0?W.id:0,tt=$[V];if(tt!==void 0){for(const F in tt){const X=tt[F];for(const q in X)v(X[q].object),delete X[q];delete tt[F]}delete $[V],Object.keys($).length===0&&delete a[G]}}}function P(){B(),u=!0,c!==o&&(c=o,d(c.object))}function B(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:f,reset:P,resetDefaultState:B,dispose:U,releaseStatesOfGeometry:N,releaseStatesOfObject:T,releaseStatesOfProgram:I,initAttributes:w,enableAttribute:y,disableUnusedAttributes:C}}function MA(r,t,n){let a;function o(p){a=p}function c(p,d){r.drawArrays(a,p,d),n.update(d,a,1)}function u(p,d,v){v!==0&&(r.drawArraysInstanced(a,p,d,v),n.update(d,a,v))}function f(p,d,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,p,0,d,0,v);let g=0;for(let x=0;x<v;x++)g+=d[x];n.update(g,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=f}function bA(r,t,n,a){let o;function c(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");o=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(I){return!(I!==vi&&a.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(I){const T=I===Yn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==Dn&&I!==Vi&&!T&&a.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function p(I){if(I==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=n.precision!==void 0?n.precision:"highp";const v=p(d);v!==d&&(se("WebGLRenderer:",d,"not supported, using",v,"instead."),d=v);const _=n.logarithmicDepthBuffer===!0,g=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&g===!1&&se("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),C=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),L=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),U=r.getParameter(r.MAX_SAMPLES),N=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:u,textureTypeReadable:f,precision:d,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:x,maxVertexTextures:b,maxTextureSize:w,maxCubemapSize:y,maxAttributes:S,maxVertexUniforms:C,maxVaryings:L,maxFragmentUniforms:A,maxSamples:U,samples:N}}function EA(r){const t=this;let n=null,a=0,o=!1,c=!1;const u=new Da,f=new re,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const x=_.length!==0||g||a!==0||o;return o=g,a=_.length,x},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){n=v(_,g,0)},this.setState=function(_,g,x){const b=_.clippingPlanes,w=_.clipIntersection,y=_.clipShadows,S=r.get(_);if(!o||b===null||b.length===0||c&&!y)c?v(null):d();else{const C=c?0:a,L=C*4;let A=S.clippingState||null;p.value=A,A=v(b,g,L,x);for(let U=0;U!==L;++U)A[U]=n[U];S.clippingState=A,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=C}};function d(){p.value!==n&&(p.value=n,p.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function v(_,g,x,b){const w=_!==null?_.length:0;let y=null;if(w!==0){if(y=p.value,b!==!0||y===null){const S=x+w*4,C=g.matrixWorldInverse;f.getNormalMatrix(C),(y===null||y.length<S)&&(y=new Float32Array(S));for(let L=0,A=x;L!==w;++L,A+=4)u.copy(_[L]).applyMatrix4(C,f),u.normal.toArray(y,A),y[A+3]=u.constant}p.value=y,p.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,y}}const Qr=4,TA=6,AA=20,wA=256,fl=new jp,H_=new ee;let Ad=null,wd=0,Rd=0,Cd=!1;const RA=new H,ks=new H;class yp{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,o=100,c={}){const{size:u=256,position:f=RA}=c;Ad=this._renderer.getRenderTarget(),wd=this._renderer.getActiveCubeFace(),Rd=this._renderer.getActiveMipmapLevel(),Cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(t,a,o,p,f),n>0&&this._blur(p,0,0,n),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=k_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=V_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ad,wd,Rd),this._renderer.xr.enabled=Cd,t.scissorTest=!1,Wr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Zs||t.mapping===ao?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ad=this._renderer.getRenderTarget(),wd=this._renderer.getActiveCubeFace(),Rd=this._renderer.getActiveMipmapLevel(),Cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:Yn,format:vi,colorSpace:so,depthBuffer:!1},o=G_(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=G_(t,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=CA(c)),this._blurMaterial=UA(c,t,n),this._ggxMaterial=DA(c,t,n)}return o}_compileMaterial(t){const n=new Ge(new un,t);this._renderer.compile(n,fl)}_sceneToCubeUV(t,n,a,o,c){const p=new Ui(90,1,n,a),d=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,x=_.toneMapping;_.getClearColor(H_),_.toneMapping=aa,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ge(new Nl,new zx({name:"PMREM.Background",side:qn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,y=w.material;let S=!1;const C=t.background;C?C.isColor&&(y.color.copy(C),t.background=null,S=!0):(y.color.copy(H_),S=!0);for(let L=0;L<6;L++){const A=L%3;A===0?(p.up.set(0,d[L],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x+v[L],c.y,c.z)):A===1?(p.up.set(0,0,d[L]),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y+v[L],c.z)):(p.up.set(0,d[L],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y,c.z+v[L]));const U=this._cubeSize;Wr(o,A*U,L>2?U:0,U,U),_.setRenderTarget(o),S&&_.render(w,p),_.render(t,p)}_.toneMapping=x,_.autoClear=g,t.background=C}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===Zs||t.mapping===ao;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=k_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=V_());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const f=c.uniforms;f.envMap.value=t;const p=this._cubeSize;Wr(n,0,0,3*p,2*p),a.setRenderTarget(n),a.render(u,fl)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=a}_applyGGXFilter(t,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,f=this._lodMeshes[a];f.material=u;const p=u.uniforms,d=a/(this._lodMeshes.length-1),v=n/(this._lodMeshes.length-1),_=Math.sqrt(d*d-v*v),g=d*1.25,x=_*g,{_lodMax:b}=this,w=this._sizeLods[a],y=3*w*(a>b-Qr?a-b+Qr:0),S=4*(this._cubeSize-w);p.envMap.value=t.texture,p.roughness.value=x,p.mipInt.value=b-n,Wr(c,y,S,3*w,2*w),o.setRenderTarget(c),o.render(f,fl),p.envMap.value=c.texture,p.roughness.value=0,p.mipInt.value=b-a,Wr(t,y,S,3*w,2*w),o.setRenderTarget(t),o.render(f,fl)}_blur(t,n,a,o){const c=this._pingPongRenderTarget,u=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(t,c,n,a,u),this._blurPass(c,t,a,a,u)}_blurPass(t,n,a,o,c){const u=this._renderer,f=this._blurMaterial,p=this._lodMeshes[o];p.material=f;const d=f.uniforms;d.envMap.value=t.texture,d.sigma.value=c,d.mipInt.value=this._lodMax-a;const v=this._sizeLods[o],_=3*v*(o>this._lodMax-Qr?o-this._lodMax+Qr:0),g=4*(this._cubeSize-v);Wr(n,_,g,3*v,2*v),u.setRenderTarget(n),u.render(p,fl)}}function CA(r){const t=[],n=[];let a=r;const o=r-Qr+1+TA;for(let c=0;c<o;c++){const u=Math.pow(2,a);t.push(u);const f=1/(u-2),p=-f,d=1+f,v=[p,p,d,p,d,d,p,p,d,d,p,d],_=6,g=6,x=3,b=new Float32Array(x*g*_),w=new Float32Array(x*g*_);for(let S=0;S<_;S++){const C=S%3*2/3-1,L=S>2?0:-1,A=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];b.set(A,x*g*S);for(let U=0;U<g;U++){const N=v[U*2]*2-1,I=v[U*2+1]*2-1;S===0?ks.set(1,I,N):S===1?ks.set(-N,1,-I):S===2?ks.set(-N,I,1):S===3?ks.set(-1,I,-N):S===4?ks.set(-N,-1,I):ks.set(N,I,-1),ks.toArray(w,(S*g+U)*x)}}const y=new un;y.setAttribute("position",new ki(b,x)),y.setAttribute("outputDirection",new ki(w,x)),n.push(new Ge(y,null)),a>Qr&&a--}return{lodMeshes:n,sizeLods:t}}function G_(r,t,n){const a=new _i(r,t,n);return a.texture.mapping=Ll,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Wr(r,t,n,a,o){r.viewport.set(t,n,a,o),r.scissor.set(t,n,a,o)}function DA(r,t,n){return new ai({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zu(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function UA(r,t,n){return new ai({name:"SphericalGaussianBlur",defines:{SAMPLES:AA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zu(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function V_(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zu(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function k_(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Na,depthTest:!1,depthWrite:!1})}function zu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class eS extends _i{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new Fx(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new Nl(5,5,5),c=new ai({name:"CubemapFromEquirect",uniforms:oo(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:qn,blending:Na});c.uniforms.tEquirect.value=n;const u=new Ge(o,c),f=n.minFilter;return n.minFilter===Xs&&(n.minFilter=Tn),new O1(1,10,this).update(t,u),n.minFilter=f,u.geometry.dispose(),u.material.dispose(),this}clear(t,n=!0,a=!0,o=!0){const c=t.getRenderTarget();for(let u=0;u<6;u++)t.setRenderTarget(this,u),t.clear(n,a,o);t.setRenderTarget(c)}}function LA(r){let t=new WeakMap,n=new WeakMap,a=null;function o(g,x=!1){return g==null?null:x?u(g):c(g)}function c(g){if(g&&g.isTexture){const x=g.mapping;if(x===Qh||x===jh)if(t.has(g)){const b=t.get(g).texture;return f(b,g.mapping)}else{const b=g.image;if(b&&b.height>0){const w=new eS(b.height);return w.fromEquirectangularTexture(r,g),t.set(g,w),g.addEventListener("dispose",d),f(w.texture,g.mapping)}else return null}}return g}function u(g){if(g&&g.isTexture){const x=g.mapping,b=x===Qh||x===jh,w=x===Zs||x===ao;if(b||w){let y=n.get(g);const S=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return a===null&&(a=new yp(r)),y=b?a.fromEquirectangular(g,y):a.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),y.texture;if(y!==void 0)return y.texture;{const C=g.image;return b&&C&&C.height>0||w&&C&&p(C)?(a===null&&(a=new yp(r)),y=b?a.fromEquirectangular(g):a.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),g.addEventListener("dispose",v),y.texture):null}}}return g}function f(g,x){return x===Qh?g.mapping=Zs:x===jh&&(g.mapping=ao),g}function p(g){let x=0;const b=6;for(let w=0;w<b;w++)g[w]!==void 0&&x++;return x===b}function d(g){const x=g.target;x.removeEventListener("dispose",d);const b=t.get(x);b!==void 0&&(t.delete(x),b.dispose())}function v(g){const x=g.target;x.removeEventListener("dispose",v);const b=n.get(x);b!==void 0&&(n.delete(x),b.dispose())}function _(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function NA(r){const t={};function n(a){if(t[a]!==void 0)return t[a];const o=r.getExtension(a);return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&to("WebGLRenderer: "+a+" extension not supported."),o}}}function OA(r,t,n,a){const o={},c=new WeakMap;function u(_){const g=_.target;g.index!==null&&t.remove(g.index);for(const b in g.attributes)t.remove(g.attributes[b]);g.removeEventListener("dispose",u),delete o[g.id];const x=c.get(g);x&&(t.remove(x),c.delete(g)),a.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function f(_,g){return o[g.id]===!0||(g.addEventListener("dispose",u),o[g.id]=!0,n.memory.geometries++),g}function p(_){const g=_.attributes;for(const x in g)t.update(g[x],r.ARRAY_BUFFER)}function d(_){const g=[],x=_.index,b=_.attributes.position;let w=0;if(b===void 0)return;if(x!==null){const C=x.array;w=x.version;for(let L=0,A=C.length;L<A;L+=3){const U=C[L+0],N=C[L+1],I=C[L+2];g.push(U,N,N,I,I,U)}}else{const C=b.array;w=b.version;for(let L=0,A=C.length/3-1;L<A;L+=3){const U=L+0,N=L+1,I=L+2;g.push(U,N,N,I,I,U)}}const y=new(b.count>=65535?Ix:Px)(g,1);y.version=w;const S=c.get(_);S&&t.remove(S),c.set(_,y)}function v(_){const g=c.get(_);if(g){const x=_.index;x!==null&&g.version<x.version&&d(_)}else d(_);return c.get(_)}return{get:f,update:p,getWireframeAttribute:v}}function PA(r,t,n){let a;function o(_){a=_}let c,u;function f(_){c=_.type,u=_.bytesPerElement}function p(_,g){r.drawElements(a,g,c,_*u),n.update(g,a,1)}function d(_,g,x){x!==0&&(r.drawElementsInstanced(a,g,c,_*u,x),n.update(g,a,x))}function v(_,g,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,g,0,c,_,0,x);let w=0;for(let y=0;y<x;y++)w+=g[y];n.update(w,a,1)}this.setMode=o,this.setIndex=f,this.render=p,this.renderInstances=d,this.renderMultiDraw=v}function IA(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,f){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=f*(c/3);break;case r.LINES:n.lines+=f*(c/2);break;case r.LINE_STRIP:n.lines+=f*(c-1);break;case r.LINE_LOOP:n.lines+=f*c;break;case r.POINTS:n.points+=f*c;break;default:Ne("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function zA(r,t,n){const a=new WeakMap,o=new an;function c(u,f,p){const d=u.morphTargetInfluences,v=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,_=v!==void 0?v.length:0;let g=a.get(f);if(g===void 0||g.count!==_){let P=function(){I.dispose(),a.delete(f),f.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const x=f.morphAttributes.position!==void 0,b=f.morphAttributes.normal!==void 0,w=f.morphAttributes.color!==void 0,y=f.morphAttributes.position||[],S=f.morphAttributes.normal||[],C=f.morphAttributes.color||[];let L=0;x===!0&&(L=1),b===!0&&(L=2),w===!0&&(L=3);let A=f.attributes.position.count*L,U=1;A>t.maxTextureSize&&(U=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const N=new Float32Array(A*U*4*_),I=new Nx(N,A,U,_);I.type=Vi,I.needsUpdate=!0;const T=L*4;for(let B=0;B<_;B++){const W=y[B],G=S[B],$=C[B],V=A*U*4*B;for(let tt=0;tt<W.count;tt++){const F=tt*T;x===!0&&(o.fromBufferAttribute(W,tt),N[V+F+0]=o.x,N[V+F+1]=o.y,N[V+F+2]=o.z,N[V+F+3]=0),b===!0&&(o.fromBufferAttribute(G,tt),N[V+F+4]=o.x,N[V+F+5]=o.y,N[V+F+6]=o.z,N[V+F+7]=0),w===!0&&(o.fromBufferAttribute($,tt),N[V+F+8]=o.x,N[V+F+9]=o.y,N[V+F+10]=o.z,N[V+F+11]=$.itemSize===4?o.w:1)}}g={count:_,texture:I,size:new qt(A,U)},a.set(f,g),f.addEventListener("dispose",P)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let x=0;for(let w=0;w<d.length;w++)x+=d[w];const b=f.morphTargetsRelative?1:1-x;p.getUniforms().setValue(r,"morphTargetBaseInfluence",b),p.getUniforms().setValue(r,"morphTargetInfluences",d)}p.getUniforms().setValue(r,"morphTargetsTexture",g.texture,n),p.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function FA(r,t,n,a,o){let c=new WeakMap;function u(d){const v=o.render.frame,_=d.geometry,g=t.get(d,_);if(c.get(g)!==v&&(t.update(g),c.set(g,v)),d.isInstancedMesh&&(d.hasEventListener("dispose",p)===!1&&d.addEventListener("dispose",p),c.get(d)!==v&&(n.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&n.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,v))),d.isSkinnedMesh){const x=d.skeleton;c.get(x)!==v&&(x.update(),c.set(x,v))}return g}function f(){c=new WeakMap}function p(d){const v=d.target;v.removeEventListener("dispose",p),a.releaseStatesOfObject(v),n.remove(v.instanceMatrix),v.instanceColor!==null&&n.remove(v.instanceColor)}return{update:u,dispose:f}}const BA={[xx]:"LINEAR_TONE_MAPPING",[Sx]:"REINHARD_TONE_MAPPING",[yx]:"CINEON_TONE_MAPPING",[Cp]:"ACES_FILMIC_TONE_MAPPING",[bx]:"AGX_TONE_MAPPING",[Ex]:"NEUTRAL_TONE_MAPPING",[Mx]:"CUSTOM_TONE_MAPPING"};function HA(r,t,n,a,o,c){const u=new _i(t,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let f=null,p=null;const d=new un;d.setAttribute("position",new Ee([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Ee([0,2,0,0,2,0],2));const v=new R1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new Ge(d,v),g=new jp(-1,1,1,-1,0,1);let x=null,b=null,w=!1,y,S=null,C=[],L=!1;this.setSize=function(A,U){u.setSize(A,U),f!==null&&f.setSize(A,U),p!==null&&p.setSize(A,U);for(let N=0;N<C.length;N++){const I=C[N];I.setSize&&I.setSize(A,U)}},this.setEffects=function(A){C=A,L=C.length>0&&C[0].isRenderPass===!0;const U=u.width,N=u.height;C.length>0&&f===null&&(f=new _i(U,N,{type:Yn,depthBuffer:!1,stencilBuffer:!1}),p=new _i(U,N,{type:Yn,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<C.length;I++){const T=C[I];T.setSize&&T.setSize(U,N)}},this.begin=function(A,U){if(w||A.toneMapping===aa&&C.length===0)return!1;if(S=U,U!==null){const N=U.width,I=U.height;(u.width!==N||u.height!==I)&&this.setSize(N,I)}return L===!1&&A.setRenderTarget(u),y=A.toneMapping,A.toneMapping=aa,!0},this.hasRenderPass=function(){return L},this.end=function(A,U){A.toneMapping=y,w=!0;let N=u,I=f;for(let T=0;T<C.length;T++){const P=C[T];P.enabled!==!1&&(P.render(A,I,N,U),P.needsSwap!==!1&&(N=I,I=I===f?p:f))}if(x!==A.outputColorSpace||b!==A.toneMapping){x=A.outputColorSpace,b=A.toneMapping,v.defines={},we.getTransfer(x)===Xe&&(v.defines.SRGB_TRANSFER="");const T=BA[b];T&&(v.defines[T]=""),v.needsUpdate=!0}v.uniforms.tDiffuse.value=N.texture,A.setRenderTarget(S),A.render(_,g),S=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){u.dispose(),f!==null&&f.dispose(),p!==null&&p.dispose(),d.dispose(),v.dispose()}}const nS=new zn,Mp=new Rl(1,1),iS=new Nx,aS=new wb,sS=new Fx,X_=[],W_=[],q_=new Float32Array(16),Y_=new Float32Array(9),Z_=new Float32Array(4);function uo(r,t,n){const a=r[0];if(a<=0||a>0)return r;const o=t*n;let c=X_[o];if(c===void 0&&(c=new Float32Array(o),X_[o]=c),t!==0){a.toArray(c,0);for(let u=1,f=0;u!==t;++u)f+=n,r[u].toArray(c,f)}return c}function An(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function wn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Fu(r,t){let n=W_[t];n===void 0&&(n=new Int32Array(t),W_[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function GA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function VA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;r.uniform2fv(this.addr,t),wn(n,t)}}function kA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(An(n,t))return;r.uniform3fv(this.addr,t),wn(n,t)}}function XA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;r.uniform4fv(this.addr,t),wn(n,t)}}function WA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),wn(n,t)}else{if(An(n,a))return;Z_.set(a),r.uniformMatrix2fv(this.addr,!1,Z_),wn(n,a)}}function qA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),wn(n,t)}else{if(An(n,a))return;Y_.set(a),r.uniformMatrix3fv(this.addr,!1,Y_),wn(n,a)}}function YA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),wn(n,t)}else{if(An(n,a))return;q_.set(a),r.uniformMatrix4fv(this.addr,!1,q_),wn(n,a)}}function ZA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function KA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;r.uniform2iv(this.addr,t),wn(n,t)}}function JA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(An(n,t))return;r.uniform3iv(this.addr,t),wn(n,t)}}function QA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;r.uniform4iv(this.addr,t),wn(n,t)}}function jA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function $A(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;r.uniform2uiv(this.addr,t),wn(n,t)}}function tw(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(An(n,t))return;r.uniform3uiv(this.addr,t),wn(n,t)}}function ew(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;r.uniform4uiv(this.addr,t),wn(n,t)}}function nw(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(Mp.compareFunction=n.isReversedDepthBuffer()?Fp:zp,c=Mp):c=nS,n.setTexture2D(t||c,o)}function iw(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||aS,o)}function aw(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||sS,o)}function sw(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||iS,o)}function rw(r){switch(r){case 5126:return GA;case 35664:return VA;case 35665:return kA;case 35666:return XA;case 35674:return WA;case 35675:return qA;case 35676:return YA;case 5124:case 35670:return ZA;case 35667:case 35671:return KA;case 35668:case 35672:return JA;case 35669:case 35673:return QA;case 5125:return jA;case 36294:return $A;case 36295:return tw;case 36296:return ew;case 35678:case 36198:case 36298:case 36306:case 35682:return nw;case 35679:case 36299:case 36307:return iw;case 35680:case 36300:case 36308:case 36293:return aw;case 36289:case 36303:case 36311:case 36292:return sw}}function ow(r,t){r.uniform1fv(this.addr,t)}function lw(r,t){const n=uo(t,this.size,2);r.uniform2fv(this.addr,n)}function cw(r,t){const n=uo(t,this.size,3);r.uniform3fv(this.addr,n)}function uw(r,t){const n=uo(t,this.size,4);r.uniform4fv(this.addr,n)}function fw(r,t){const n=uo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function hw(r,t){const n=uo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function dw(r,t){const n=uo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function pw(r,t){r.uniform1iv(this.addr,t)}function mw(r,t){r.uniform2iv(this.addr,t)}function gw(r,t){r.uniform3iv(this.addr,t)}function vw(r,t){r.uniform4iv(this.addr,t)}function _w(r,t){r.uniform1uiv(this.addr,t)}function xw(r,t){r.uniform2uiv(this.addr,t)}function Sw(r,t){r.uniform3uiv(this.addr,t)}function yw(r,t){r.uniform4uiv(this.addr,t)}function Mw(r,t,n){const a=this.cache,o=t.length,c=Fu(n,o);An(a,c)||(r.uniform1iv(this.addr,c),wn(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=Mp:u=nS;for(let f=0;f!==o;++f)n.setTexture2D(t[f]||u,c[f])}function bw(r,t,n){const a=this.cache,o=t.length,c=Fu(n,o);An(a,c)||(r.uniform1iv(this.addr,c),wn(a,c));for(let u=0;u!==o;++u)n.setTexture3D(t[u]||aS,c[u])}function Ew(r,t,n){const a=this.cache,o=t.length,c=Fu(n,o);An(a,c)||(r.uniform1iv(this.addr,c),wn(a,c));for(let u=0;u!==o;++u)n.setTextureCube(t[u]||sS,c[u])}function Tw(r,t,n){const a=this.cache,o=t.length,c=Fu(n,o);An(a,c)||(r.uniform1iv(this.addr,c),wn(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(t[u]||iS,c[u])}function Aw(r){switch(r){case 5126:return ow;case 35664:return lw;case 35665:return cw;case 35666:return uw;case 35674:return fw;case 35675:return hw;case 35676:return dw;case 5124:case 35670:return pw;case 35667:case 35671:return mw;case 35668:case 35672:return gw;case 35669:case 35673:return vw;case 5125:return _w;case 36294:return xw;case 36295:return Sw;case 36296:return yw;case 35678:case 36198:case 36298:case 36306:case 35682:return Mw;case 35679:case 36299:case 36307:return bw;case 35680:case 36300:case 36308:case 36293:return Ew;case 36289:case 36303:case 36311:case 36292:return Tw}}class ww{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=rw(n.type)}}class Rw{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Aw(n.type)}}class Cw{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const f=o[c];f.setValue(t,n[f.id],a)}}}const Dd=/(\w+)(\])?(\[|\.)?/g;function K_(r,t){r.seq.push(t),r.map[t.id]=t}function Dw(r,t,n){const a=r.name,o=a.length;for(Dd.lastIndex=0;;){const c=Dd.exec(a),u=Dd.lastIndex;let f=c[1];const p=c[2]==="]",d=c[3];if(p&&(f=f|0),d===void 0||d==="["&&u+2===o){K_(n,d===void 0?new ww(f,r,t):new Rw(f,r,t));break}else{let _=n.map[f];_===void 0&&(_=new Cw(f),K_(n,_)),n=_}}}class bu{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const f=t.getActiveUniform(n,u),p=t.getUniformLocation(n,f.name);Dw(f,p,this)}const o=[],c=[];for(const u of this.seq)u.type===t.SAMPLER_2D_SHADOW||u.type===t.SAMPLER_CUBE_SHADOW||u.type===t.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(t,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let c=0,u=n.length;c!==u;++c){const f=n[c],p=a[f.id];p.needsUpdate!==!1&&f.setValue(t,p.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,c=t.length;o!==c;++o){const u=t[o];u.id in n&&a.push(u)}return a}}function J_(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const Uw=37297;let Lw=0;function Nw(r,t){const n=r.split(`
`),a=[],o=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let u=o;u<c;u++){const f=u+1;a.push(`${f===t?">":" "} ${f}: ${n[u]}`)}return a.join(`
`)}const Q_=new re;function Ow(r){we._getMatrix(Q_,we.workingColorSpace,r);const t=`mat3( ${Q_.elements.map(n=>n.toFixed(4))} )`;switch(we.getTransfer(r)){case Uu:return[t,"LinearTransferOETF"];case Xe:return[t,"sRGBTransferOETF"];default:return se("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function j_(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const f=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+Nw(r.getShaderSource(t),f)}else return c}function Pw(r,t){const n=Ow(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Iw={[xx]:"Linear",[Sx]:"Reinhard",[yx]:"Cineon",[Cp]:"ACESFilmic",[bx]:"AgX",[Ex]:"Neutral",[Mx]:"Custom"};function zw(r,t){const n=Iw[t];return n===void 0?(se("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const vu=new H;function Fw(){we.getLuminanceCoefficients(vu);const r=vu.x.toFixed(4),t=vu.y.toFixed(4),n=vu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bw(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function Hw(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function Gw(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(t,o),u=c.name;let f=1;c.type===r.FLOAT_MAT2&&(f=2),c.type===r.FLOAT_MAT3&&(f=3),c.type===r.FLOAT_MAT4&&(f=4),n[u]={type:c.type,location:r.getAttribLocation(t,u),locationSize:f}}return n}function gl(r){return r!==""}function $_(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function tx(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vw=/^[ \t]*#include +<([\w\d./]+)>/gm;function bp(r){return r.replace(Vw,Xw)}const kw=new Map;function Xw(r,t){let n=pe[t];if(n===void 0){const a=kw.get(t);if(a!==void 0)n=pe[a],se('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return bp(n)}const Ww=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ex(r){return r.replace(Ww,qw)}function qw(r,t,n,a){let o="";for(let c=parseInt(t);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function nx(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const Yw={[_u]:"SHADOWMAP_TYPE_PCF",[pl]:"SHADOWMAP_TYPE_VSM"};function Zw(r){return Yw[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Kw={[Zs]:"ENVMAP_TYPE_CUBE",[ao]:"ENVMAP_TYPE_CUBE",[Ll]:"ENVMAP_TYPE_CUBE_UV"};function Jw(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Kw[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Qw={[ao]:"ENVMAP_MODE_REFRACTION"};function jw(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Qw[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $w={[_x]:"ENVMAP_BLENDING_MULTIPLY",[kM]:"ENVMAP_BLENDING_MIX",[XM]:"ENVMAP_BLENDING_ADD"};function t2(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":$w[r.combine]||"ENVMAP_BLENDING_NONE"}function e2(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function n2(r,t,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,f=n.fragmentShader;const p=Zw(n),d=Jw(n),v=jw(n),_=t2(n),g=e2(n),x=Bw(n),b=Hw(c),w=o.createProgram();let y,S,C=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(gl).join(`
`),y.length>0&&(y+=`
`),S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(gl).join(`
`),S.length>0&&(S+=`
`)):(y=[nx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),S=[nx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.envMap?"#define "+v:"",n.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==aa?"#define TONE_MAPPING":"",n.toneMapping!==aa?pe.tonemapping_pars_fragment:"",n.toneMapping!==aa?zw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",pe.colorspace_pars_fragment,Pw("linearToOutputTexel",n.outputColorSpace),Fw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(gl).join(`
`)),u=bp(u),u=$_(u,n),u=tx(u,n),f=bp(f),f=$_(f,n),f=tx(f,n),u=ex(u),f=ex(f),n.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,y=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,S=["#define varying in",n.glslVersion===jv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===jv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const L=C+y+u,A=C+S+f,U=J_(o,o.VERTEX_SHADER,L),N=J_(o,o.FRAGMENT_SHADER,A);o.attachShader(w,U),o.attachShader(w,N),n.index0AttributeName!==void 0?o.bindAttribLocation(w,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(w,0,"position"),o.linkProgram(w);function I(W){if(r.debug.checkShaderErrors){const G=o.getProgramInfoLog(w)||"",$=o.getShaderInfoLog(U)||"",V=o.getShaderInfoLog(N)||"",tt=G.trim(),F=$.trim(),X=V.trim();let q=!0,it=!0;if(o.getProgramParameter(w,o.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,w,U,N);else{const rt=j_(o,U,"vertex"),O=j_(o,N,"fragment");Ne("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(w,o.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+tt+`
`+rt+`
`+O)}else tt!==""?se("WebGLProgram: Program Info Log:",tt):(F===""||X==="")&&(it=!1);it&&(W.diagnostics={runnable:q,programLog:tt,vertexShader:{log:F,prefix:y},fragmentShader:{log:X,prefix:S}})}o.deleteShader(U),o.deleteShader(N),T=new bu(o,w),P=Gw(o,w)}let T;this.getUniforms=function(){return T===void 0&&I(this),T};let P;this.getAttributes=function(){return P===void 0&&I(this),P};let B=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=o.getProgramParameter(w,Uw)),B},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Lw++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=U,this.fragmentShader=N,this}let i2=0;class a2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new s2(t),n.set(t,a)),a}}class s2{constructor(t){this.id=i2++,this.code=t,this.usedTimes=0}}function r2(r){return r===Ks||r===Cu||r===Du}function o2(r,t,n,a,o,c){const u=new Gp,f=new a2,p=new Set,d=[],v=new Map,_=a.logarithmicDepthBuffer;let g=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(T){return p.add(T),T===0?"uv":`uv${T}`}function w(T,P,B,W,G,$){const V=W.fog,tt=G.geometry,F=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?W.environment:null,X=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,q=t.get(T.envMap||F,X),it=q&&q.mapping===Ll?q.image.height:null,rt=x[T.type];T.precision!==null&&(g=a.getMaxPrecision(T.precision),g!==T.precision&&se("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const O=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,et=O!==void 0?O.length:0;let j=0;tt.morphAttributes.position!==void 0&&(j=1),tt.morphAttributes.normal!==void 0&&(j=2),tt.morphAttributes.color!==void 0&&(j=3);let J,bt,Dt,at;if(rt){const We=ta[rt];J=We.vertexShader,bt=We.fragmentShader}else{J=T.vertexShader,bt=T.fragmentShader;const We=f.getVertexShaderStage(T),Ue=f.getFragmentShaderStage(T);f.update(T,We,Ue),Dt=We.id,at=Ue.id}const pt=r.getRenderTarget(),Tt=r.state.buffers.depth.getReversed(),It=G.isInstancedMesh===!0,At=G.isBatchedMesh===!0,$t=!!T.map,Oe=!!T.matcap,ne=!!q,me=!!T.aoMap,De=!!T.lightMap,ue=!!T.bumpMap&&T.wireframe===!1,He=!!T.normalMap,$e=!!T.displacementMap,fn=!!T.emissiveMap,Re=!!T.metalnessMap,je=!!T.roughnessMap,Q=T.anisotropy>0,Te=T.clearcoat>0,Ce=T.dispersion>0,z=T.retroreflectivity>0,E=T.iridescence>0,nt=T.sheen>0,ft=T.transmission>0,gt=Q&&!!T.anisotropyMap,Rt=Te&&!!T.clearcoatMap,Lt=Te&&!!T.clearcoatNormalMap,vt=Te&&!!T.clearcoatRoughnessMap,_t=E&&!!T.iridescenceMap,Ct=E&&!!T.iridescenceThicknessMap,Bt=nt&&!!T.sheenColorMap,Ot=nt&&!!T.sheenRoughnessMap,Nt=!!T.specularMap,Wt=!!T.specularColorMap,jt=!!T.specularIntensityMap,ae=ft&&!!T.transmissionMap,Y=ft&&!!T.thicknessMap,wt=!!T.gradientMap,xt=!!T.alphaMap,Ut=T.alphaTest>0,Ht=!!T.alphaHash,Et=!!T.extensions;let Qt=aa;T.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(Qt=r.toneMapping);const Yt={shaderID:rt,shaderType:T.type,shaderName:T.name,vertexShader:J,fragmentShader:bt,defines:T.defines,customVertexShaderID:Dt,customFragmentShaderID:at,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:At,batchingColor:At&&G._colorsTexture!==null,instancing:It,instancingColor:It&&G.instanceColor!==null,instancingMorph:It&&G.morphTexture!==null,outputColorSpace:pt===null?r.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:we.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:$t,matcap:Oe,envMap:ne,envMapMode:ne&&q.mapping,envMapCubeUVHeight:it,aoMap:me,lightMap:De,bumpMap:ue,normalMap:He,displacementMap:$e,emissiveMap:fn,normalMapObjectSpace:He&&T.normalMapType===YM,normalMapTangentSpace:He&&T.normalMapType===gp,packedNormalMap:He&&T.normalMapType===gp&&r2(T.normalMap.format),metalnessMap:Re,roughnessMap:je,anisotropy:Q,anisotropyMap:gt,clearcoat:Te,clearcoatMap:Rt,clearcoatNormalMap:Lt,clearcoatRoughnessMap:vt,dispersion:Ce,retroreflection:z,iridescence:E,iridescenceMap:_t,iridescenceThicknessMap:Ct,sheen:nt,sheenColorMap:Bt,sheenRoughnessMap:Ot,specularMap:Nt,specularColorMap:Wt,specularIntensityMap:jt,transmission:ft,transmissionMap:ae,thicknessMap:Y,gradientMap:wt,opaque:T.transparent===!1&&T.blending===vl&&T.alphaToCoverage===!1,alphaMap:xt,alphaTest:Ut,alphaHash:Ht,combine:T.combine,mapUv:$t&&b(T.map.channel),aoMapUv:me&&b(T.aoMap.channel),lightMapUv:De&&b(T.lightMap.channel),bumpMapUv:ue&&b(T.bumpMap.channel),normalMapUv:He&&b(T.normalMap.channel),displacementMapUv:$e&&b(T.displacementMap.channel),emissiveMapUv:fn&&b(T.emissiveMap.channel),metalnessMapUv:Re&&b(T.metalnessMap.channel),roughnessMapUv:je&&b(T.roughnessMap.channel),anisotropyMapUv:gt&&b(T.anisotropyMap.channel),clearcoatMapUv:Rt&&b(T.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&b(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&b(T.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&b(T.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&b(T.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&b(T.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&b(T.sheenRoughnessMap.channel),specularMapUv:Nt&&b(T.specularMap.channel),specularColorMapUv:Wt&&b(T.specularColorMap.channel),specularIntensityMapUv:jt&&b(T.specularIntensityMap.channel),transmissionMapUv:ae&&b(T.transmissionMap.channel),thicknessMapUv:Y&&b(T.thicknessMap.channel),alphaMapUv:xt&&b(T.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(He||Q),vertexNormals:!!tt.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!tt.attributes.uv&&($t||xt),fog:!!V,useFog:T.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||tt.attributes.normal===void 0&&He===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Tt,skinning:G.isSkinnedMesh===!0,hasPositionAttribute:tt.attributes.position!==void 0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:j,numSunLights:P.sun.length,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numSunLightShadows:P.sunShadowMap.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:Qt,decodeVideoTexture:$t&&T.map.isVideoTexture===!0&&we.getTransfer(T.map.colorSpace)===Xe,decodeVideoTextureEmissive:fn&&T.emissiveMap.isVideoTexture===!0&&we.getTransfer(T.emissiveMap.colorSpace)===Xe,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===ii,flipSided:T.side===qn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Et&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&T.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Yt.vertexUv1s=p.has(1),Yt.vertexUv2s=p.has(2),Yt.vertexUv3s=p.has(3),p.clear(),Yt}function y(T){const P=[];if(T.shaderID?P.push(T.shaderID):(P.push(T.customVertexShaderID),P.push(T.customFragmentShaderID)),T.defines!==void 0)for(const B in T.defines)P.push(B),P.push(T.defines[B]);return T.isRawShaderMaterial===!1&&(S(P,T),C(P,T),P.push(r.outputColorSpace)),P.push(T.customProgramCacheKey),P.join()}function S(T,P){T.push(P.precision),T.push(P.outputColorSpace),T.push(P.envMapMode),T.push(P.envMapCubeUVHeight),T.push(P.mapUv),T.push(P.alphaMapUv),T.push(P.lightMapUv),T.push(P.aoMapUv),T.push(P.bumpMapUv),T.push(P.normalMapUv),T.push(P.displacementMapUv),T.push(P.emissiveMapUv),T.push(P.metalnessMapUv),T.push(P.roughnessMapUv),T.push(P.anisotropyMapUv),T.push(P.clearcoatMapUv),T.push(P.clearcoatNormalMapUv),T.push(P.clearcoatRoughnessMapUv),T.push(P.iridescenceMapUv),T.push(P.iridescenceThicknessMapUv),T.push(P.sheenColorMapUv),T.push(P.sheenRoughnessMapUv),T.push(P.specularMapUv),T.push(P.specularColorMapUv),T.push(P.specularIntensityMapUv),T.push(P.transmissionMapUv),T.push(P.thicknessMapUv),T.push(P.combine),T.push(P.fogExp2),T.push(P.sizeAttenuation),T.push(P.morphTargetsCount),T.push(P.morphAttributeCount),T.push(P.numSunLights),T.push(P.numDirLights),T.push(P.numPointLights),T.push(P.numSpotLights),T.push(P.numSpotLightMaps),T.push(P.numHemiLights),T.push(P.numRectAreaLights),T.push(P.numSunLightShadows),T.push(P.numDirLightShadows),T.push(P.numPointLightShadows),T.push(P.numSpotLightShadows),T.push(P.numSpotLightShadowsWithMaps),T.push(P.numLightProbes),T.push(P.shadowMapType),T.push(P.toneMapping),T.push(P.numClippingPlanes),T.push(P.numClipIntersection),T.push(P.depthPacking)}function C(T,P){u.disableAll(),P.instancing&&u.enable(0),P.instancingColor&&u.enable(1),P.instancingMorph&&u.enable(2),P.matcap&&u.enable(3),P.envMap&&u.enable(4),P.normalMapObjectSpace&&u.enable(5),P.normalMapTangentSpace&&u.enable(6),P.clearcoat&&u.enable(7),P.iridescence&&u.enable(8),P.alphaTest&&u.enable(9),P.vertexColors&&u.enable(10),P.vertexAlphas&&u.enable(11),P.vertexUv1s&&u.enable(12),P.vertexUv2s&&u.enable(13),P.vertexUv3s&&u.enable(14),P.vertexTangents&&u.enable(15),P.anisotropy&&u.enable(16),P.alphaHash&&u.enable(17),P.batching&&u.enable(18),P.dispersion&&u.enable(19),P.retroreflection&&u.enable(24),P.batchingColor&&u.enable(20),P.gradientMap&&u.enable(21),P.packedNormalMap&&u.enable(22),P.vertexNormals&&u.enable(23),T.push(u.mask),u.disableAll(),P.fog&&u.enable(0),P.useFog&&u.enable(1),P.flatShading&&u.enable(2),P.logarithmicDepthBuffer&&u.enable(3),P.reversedDepthBuffer&&u.enable(4),P.skinning&&u.enable(5),P.morphTargets&&u.enable(6),P.morphNormals&&u.enable(7),P.morphColors&&u.enable(8),P.premultipliedAlpha&&u.enable(9),P.shadowMapEnabled&&u.enable(10),P.doubleSided&&u.enable(11),P.flipSided&&u.enable(12),P.useDepthPacking&&u.enable(13),P.dithering&&u.enable(14),P.transmission&&u.enable(15),P.sheen&&u.enable(16),P.opaque&&u.enable(17),P.pointsUvs&&u.enable(18),P.decodeVideoTexture&&u.enable(19),P.decodeVideoTextureEmissive&&u.enable(20),P.alphaToCoverage&&u.enable(21),P.numLightProbeGrids>0&&u.enable(22),P.hasPositionAttribute&&u.enable(23),T.push(u.mask)}function L(T){const P=x[T.type];let B;if(P){const W=ta[P];B=Qx.clone(W.uniforms)}else B=T.uniforms;return B}function A(T,P){let B=v.get(P);return B!==void 0?++B.usedTimes:(B=new n2(r,P,T,o),d.push(B),v.set(P,B)),B}function U(T){if(--T.usedTimes===0){const P=d.indexOf(T);d[P]=d[d.length-1],d.pop(),v.delete(T.cacheKey),T.destroy()}}function N(T){f.remove(T)}function I(){f.dispose()}return{getParameters:w,getProgramCacheKey:y,getUniforms:L,acquireProgram:A,releaseProgram:U,releaseShaderCache:N,programs:d,dispose:I}}function l2(){let r=new WeakMap;function t(u){return r.has(u)}function n(u){let f=r.get(u);return f===void 0&&(f={},r.set(u,f)),f}function a(u){r.delete(u)}function o(u,f,p){r.get(u)[f]=p}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:c}}function c2(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function ix(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function ax(){const r=[];let t=0;const n=[],a=[],o=[];function c(){t=0,n.length=0,a.length=0,o.length=0}function u(g){let x=0;return g.isInstancedMesh&&(x+=2),g.isSkinnedMesh&&(x+=1),x}function f(g,x,b,w,y,S){let C=r[t];return C===void 0?(C={id:g.id,object:g,geometry:x,material:b,materialVariant:u(g),groupOrder:w,renderOrder:g.renderOrder,z:y,group:S},r[t]=C):(C.id=g.id,C.object=g,C.geometry=x,C.material=b,C.materialVariant=u(g),C.groupOrder=w,C.renderOrder=g.renderOrder,C.z=y,C.group=S),t++,C}function p(g,x,b,w,y,S,C){C.reversedDepth===!0&&(y=-y);const L=f(g,x,b,w,y,S);b.transmission>0?a.push(L):b.transparent===!0?o.push(L):n.push(L)}function d(g,x,b,w,y,S){const C=f(g,x,b,w,y,S);b.transmission>0?a.unshift(C):b.transparent===!0?o.unshift(C):n.unshift(C)}function v(g,x){n.length>1&&n.sort(g||c2),a.length>1&&a.sort(x||ix),o.length>1&&o.sort(x||ix)}function _(){for(let g=t,x=r.length;g<x;g++){const b=r[g];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:p,unshift:d,finish:_,sort:v}}function u2(){let r=new WeakMap;function t(a,o){const c=r.get(a);let u;return c===void 0?(u=new ax,r.set(a,[u])):o>=c.length?(u=new ax,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:t,dispose:n}}function f2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new H,color:new ee};break;case"SpotLight":n={position:new H,direction:new H,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new H,color:new ee,distance:0,decay:0};break;case"HemisphereLight":n={direction:new H,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":n={color:new ee,position:new H,halfWidth:new H,halfHeight:new H};break}return r[t.id]=n,n}}}function h2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let d2=0;function p2(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function m2(r){const t=new f2,n=h2(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)a.probe.push(new H);const o=new H,c=new Se,u=new Se;function f(d){let v=0,_=0,g=0;for(let G=0;G<9;G++)a.probe[G].set(0,0,0);let x=0,b=0,w=0,y=0,S=0,C=0,L=0,A=0,U=0,N=0,I=0,T=0,P=0,B=0;d.sort(p2);for(let G=0,$=d.length;G<$;G++){const V=d[G],tt=V.color,F=V.intensity,X=V.distance;let q=null;if(V.shadow&&V.shadow.map&&(V.shadow.map.texture.format===Ks?q=V.shadow.map.texture:q=V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)v+=tt.r*F,_+=tt.g*F,g+=tt.b*F;else if(V.isLightProbe){for(let it=0;it<9;it++)a.probe[it].addScaledVector(V.sh.coefficients[it],F);B++}else if(V.isSunLight){const it=t.get(V);if(it.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const rt=V.shadow,O=n.get(V);O.shadowIntensity=rt.intensity,O.shadowBias=rt.bias,O.shadowNormalBias=rt.normalBias,O.shadowRadius=rt.radius,O.shadowMapSize.copy(rt.mapSize).multiply(rt.getFrameExtents()),a.sunShadow[b]=O,a.sunShadowMap[b]=q;const et=rt.getViewportCount();for(let j=0;j<et;j++)a.sunShadowMatrix[w+j]=rt.getMatrix(j),a.sunShadowCascade[w+j]=rt._cascadeData[j];w+=et,b++}a.sun[x]=it,x++}else if(V.isDirectionalLight){const it=t.get(V);if(it.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const rt=V.shadow,O=n.get(V);O.shadowIntensity=rt.intensity,O.shadowBias=rt.bias,O.shadowNormalBias=rt.normalBias,O.shadowRadius=rt.radius,O.shadowMapSize=rt.mapSize,a.directionalShadow[y]=O,a.directionalShadowMap[y]=q,a.directionalShadowMatrix[y]=V.shadow.matrix,U++}a.directional[y]=it,y++}else if(V.isSpotLight){const it=t.get(V);it.position.setFromMatrixPosition(V.matrixWorld),it.color.copy(tt).multiplyScalar(F),it.distance=X,it.coneCos=Math.cos(V.angle),it.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),it.decay=V.decay,a.spot[C]=it;const rt=V.shadow;if(V.map&&(a.spotLightMap[T]=V.map,T++,rt.updateMatrices(V),V.castShadow&&P++),a.spotLightMatrix[C]=rt.matrix,V.castShadow){const O=n.get(V);O.shadowIntensity=rt.intensity,O.shadowBias=rt.bias,O.shadowNormalBias=rt.normalBias,O.shadowRadius=rt.radius,O.shadowMapSize=rt.mapSize,a.spotShadow[C]=O,a.spotShadowMap[C]=q,I++}C++}else if(V.isRectAreaLight){const it=t.get(V);it.color.copy(tt).multiplyScalar(F),it.halfWidth.set(V.width*.5,0,0),it.halfHeight.set(0,V.height*.5,0),a.rectArea[L]=it,L++}else if(V.isPointLight){const it=t.get(V);if(it.color.copy(V.color).multiplyScalar(V.intensity),it.distance=V.distance,it.decay=V.decay,V.castShadow){const rt=V.shadow,O=n.get(V);O.shadowIntensity=rt.intensity,O.shadowBias=rt.bias,O.shadowNormalBias=rt.normalBias,O.shadowRadius=rt.radius,O.shadowMapSize=rt.mapSize,O.shadowCameraNear=rt.camera.near,O.shadowCameraFar=rt.camera.far,a.pointShadow[S]=O,a.pointShadowMap[S]=q,a.pointShadowMatrix[S]=V.shadow.matrix,N++}a.point[S]=it,S++}else if(V.isHemisphereLight){const it=t.get(V);it.skyColor.copy(V.color).multiplyScalar(F),it.groundColor.copy(V.groundColor).multiplyScalar(F),a.hemi[A]=it,A++}}L>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Ft.LTC_FLOAT_1,a.rectAreaLTC2=Ft.LTC_FLOAT_2):(a.rectAreaLTC1=Ft.LTC_HALF_1,a.rectAreaLTC2=Ft.LTC_HALF_2)),a.ambient[0]=v,a.ambient[1]=_,a.ambient[2]=g;const W=a.hash;(W.sunLength!==x||W.directionalLength!==y||W.pointLength!==S||W.spotLength!==C||W.rectAreaLength!==L||W.hemiLength!==A||W.numSunShadows!==b||W.numDirectionalShadows!==U||W.numPointShadows!==N||W.numSpotShadows!==I||W.numSpotMaps!==T||W.numLightProbes!==B)&&(a.sun.length=x,a.directional.length=y,a.spot.length=C,a.rectArea.length=L,a.point.length=S,a.hemi.length=A,a.sunShadow.length=b,a.sunShadowMap.length=b,a.sunShadowMatrix.length=w,a.sunShadowCascade.length=w,a.directionalShadow.length=U,a.directionalShadowMap.length=U,a.directionalShadowMatrix.length=U,a.pointShadow.length=N,a.pointShadowMap.length=N,a.pointShadowMatrix.length=N,a.spotShadow.length=I,a.spotShadowMap.length=I,a.spotLightMatrix.length=I+T-P,a.spotLightMap.length=T,a.numSpotLightShadowsWithMaps=P,a.numLightProbes=B,W.sunLength=x,W.directionalLength=y,W.pointLength=S,W.spotLength=C,W.rectAreaLength=L,W.hemiLength=A,W.numSunShadows=b,W.numDirectionalShadows=U,W.numPointShadows=N,W.numSpotShadows=I,W.numSpotMaps=T,W.numLightProbes=B,a.version=d2++)}function p(d,v){let _=0,g=0,x=0,b=0,w=0,y=0;const S=v.matrixWorldInverse;for(let C=0,L=d.length;C<L;C++){const A=d[C];if(A.isSunLight){const U=a.sun[_];U.direction.setFromMatrixPosition(A.matrixWorld),U.direction.transformDirection(S),_++}else if(A.isDirectionalLight){const U=a.directional[g];U.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),U.direction.sub(o),U.direction.transformDirection(S),g++}else if(A.isSpotLight){const U=a.spot[b];U.position.setFromMatrixPosition(A.matrixWorld),U.position.applyMatrix4(S),U.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),U.direction.sub(o),U.direction.transformDirection(S),b++}else if(A.isRectAreaLight){const U=a.rectArea[w];U.position.setFromMatrixPosition(A.matrixWorld),U.position.applyMatrix4(S),u.identity(),c.copy(A.matrixWorld),c.premultiply(S),u.extractRotation(c),U.halfWidth.set(A.width*.5,0,0),U.halfHeight.set(0,A.height*.5,0),U.halfWidth.applyMatrix4(u),U.halfHeight.applyMatrix4(u),w++}else if(A.isPointLight){const U=a.point[x];U.position.setFromMatrixPosition(A.matrixWorld),U.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const U=a.hemi[y];U.direction.setFromMatrixPosition(A.matrixWorld),U.direction.transformDirection(S),y++}}}return{setup:f,setupView:p,state:a}}function sx(r){const t=new m2(r),n=[],a=[],o=[];function c(g){_.camera=g,n.length=0,a.length=0,o.length=0}function u(g){n.push(g)}function f(g){a.push(g)}function p(g){o.push(g)}function d(){t.setup(n)}function v(g){t.setupView(n,g)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:d,setupLightsView:v,pushLight:u,pushShadow:f,pushLightProbeGrid:p}}function g2(r){let t=new WeakMap;function n(o,c=0){const u=t.get(o);let f;return u===void 0?(f=new sx(r),t.set(o,[f])):c>=u.length?(f=new sx(r),u.push(f)):f=u[c],f}function a(){t=new WeakMap}return{get:n,dispose:a}}const v2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_2=`uniform sampler2D shadow_pass;
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
}`,x2=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],S2=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],rx=new Se,hl=new H,Ud=new H;function y2(r,t,n){let a=new Wp;const o=new qt,c=new qt,u=new an,f=new C1,p=new D1,d={},v=n.maxTextureSize,_={[Ys]:qn,[qn]:Ys,[ii]:ii},g=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:v2,fragmentShader:_2}),x=g.clone();x.defines.HORIZONTAL_PASS=1;const b=new un;b.setAttribute("position",new ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Ge(b,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_u;let S=this.type;this.render=function(N,I,T){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||N.length===0)return;this.type===mx&&(se("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=_u);const P=r.getRenderTarget(),B=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),G=r.state;G.setBlending(Na),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const $=S!==this.type;$&&I.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(tt=>tt.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,tt=N.length;V<tt;V++){const F=N[V],X=F.shadow;if(X===void 0){se("WebGLShadowMap:",F,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;o.copy(X.mapSize);const q=X.getFrameExtents();o.multiply(q),c.copy(X.mapSize),(o.x>v||o.y>v)&&(o.x>v&&(c.x=Math.floor(v/q.x),o.x=c.x*q.x,X.mapSize.x=c.x),o.y>v&&(c.y=Math.floor(v/q.y),o.y=c.y*q.y,X.mapSize.y=c.y));const it=r.state.buffers.depth.getReversed();if(X.camera._reversedDepth=it,X.map===null||$===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===pl){if(F.isPointLight){se("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new _i(o.x,o.y,{format:Ks,type:Yn,minFilter:Tn,magFilter:Tn,generateMipmaps:!1}),X.map.texture.name=F.name+".shadowMap",X.map.depthTexture=new Rl(o.x,o.y,Vi),X.map.depthTexture.name=F.name+".shadowMapDepth",X.map.depthTexture.format=Pa,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=In,X.map.depthTexture.magFilter=In}else F.isPointLight?(X.map=new eS(o.x),X.map.depthTexture=new Yb(o.x,sa)):(X.map=new _i(o.x,o.y),X.map.depthTexture=new Rl(o.x,o.y,sa)),X.map.depthTexture.name=F.name+".shadowMap",X.map.depthTexture.format=Pa,this.type===_u?(X.map.depthTexture.compareFunction=it?Fp:zp,X.map.depthTexture.minFilter=Tn,X.map.depthTexture.magFilter=Tn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=In,X.map.depthTexture.magFilter=In);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==o.x||X.map.height!==o.y)&&X.map.setSize(o.x,o.y);const rt=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();F.isPointLight!==!0&&X.updateMatrices(F,T);for(let O=0;O<rt;O++){const et=X.getCamera(O);if(F.isPointLight){const j=X.camera,J=X.matrix,bt=F.distance||j.far;bt!==j.far&&(j.far=bt,j.updateProjectionMatrix()),hl.setFromMatrixPosition(F.matrixWorld),j.position.copy(hl),Ud.copy(j.position),Ud.add(x2[O]),j.up.copy(S2[O]),j.lookAt(Ud),j.updateMatrixWorld(),J.makeTranslation(-hl.x,-hl.y,-hl.z),rx.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),X._frustum.setFromProjectionMatrix(rx,j.coordinateSystem,j.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)r.setRenderTarget(X.map,O),r.clear();else{O===0&&(r.setRenderTarget(X.map),r.clear());const j=X.getViewport(O);u.set(c.x*j.x,c.y*j.y,c.x*j.z,c.y*j.w),G.viewport(u)}a=X.getFrustum(O),A(I,T,et,F,this.type)}X.isPointLightShadow!==!0&&this.type===pl&&C(X,T),X.needsUpdate=!1}S=this.type,y.needsUpdate=!1,r.setRenderTarget(P,B,W)};function C(N,I){const T=t.update(w);g.defines.VSM_SAMPLES!==N.blurSamples&&(g.defines.VSM_SAMPLES=N.blurSamples,x.defines.VSM_SAMPLES=N.blurSamples,g.needsUpdate=!0,x.needsUpdate=!0),N.mapPass===null?N.mapPass=new _i(o.x,o.y,{format:Ks,type:Yn}):(N.mapPass.width!==N.map.width||N.mapPass.height!==N.map.height)&&N.mapPass.setSize(N.map.width,N.map.height),g.uniforms.shadow_pass.value=N.map.depthTexture,g.uniforms.resolution.value.set(N.map.width,N.map.height),g.uniforms.radius.value=N.radius,r.setRenderTarget(N.mapPass),r.clear(),r.renderBufferDirect(I,null,T,g,w,null),x.uniforms.shadow_pass.value=N.mapPass.texture,x.uniforms.resolution.value.set(N.map.width,N.map.height),x.uniforms.radius.value=N.radius,r.setRenderTarget(N.map),r.clear(),r.renderBufferDirect(I,null,T,x,w,null)}function L(N,I,T,P){let B=null;const W=T.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(W!==void 0)B=W;else if(B=T.isPointLight===!0?p:f,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const G=B.uuid,$=I.uuid;let V=d[G];V===void 0&&(V={},d[G]=V);let tt=V[$];tt===void 0&&(tt=B.clone(),V[$]=tt,I.addEventListener("dispose",U)),B=tt}if(B.visible=I.visible,B.wireframe=I.wireframe,P===pl?B.side=I.shadowSide!==null?I.shadowSide:I.side:B.side=I.shadowSide!==null?I.shadowSide:_[I.side],B.alphaMap=I.alphaMap,B.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,B.map=I.map,B.clipShadows=I.clipShadows,B.clippingPlanes=I.clippingPlanes,B.clipIntersection=I.clipIntersection,B.displacementMap=I.displacementMap,B.displacementScale=I.displacementScale,B.displacementBias=I.displacementBias,B.wireframeLinewidth=I.wireframeLinewidth,B.linewidth=I.linewidth,T.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const G=r.properties.get(B);G.light=T}return B}function A(N,I,T,P,B){if(N.visible===!1)return;if(N.layers.test(I.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&B===pl)&&(!N.frustumCulled||N.intersectsFrustum(a))){N.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,N.matrixWorld);const $=t.update(N),V=N.material;if(Array.isArray(V)){const tt=$.groups;for(let F=0,X=tt.length;F<X;F++){const q=tt[F],it=V[q.materialIndex];if(it&&it.visible){const rt=L(N,it,P,B);N.onBeforeShadow(r,N,I,T,$,rt,q),r.renderBufferDirect(T,null,$,rt,N,q),N.onAfterShadow(r,N,I,T,$,rt,q)}}}else if(V.visible){const tt=L(N,V,P,B);N.onBeforeShadow(r,N,I,T,$,tt,null),r.renderBufferDirect(T,null,$,tt,N,null),N.onAfterShadow(r,N,I,T,$,tt,null)}}const G=N.children;for(let $=0,V=G.length;$<V;$++)A(G[$],I,T,P,B)}function U(N){N.target.removeEventListener("dispose",U);for(const T in d){const P=d[T],B=N.target.uuid;B in P&&(P[B].dispose(),delete P[B])}}}function M2(r,t){function n(){let Y=!1;const wt=new an;let xt=null;const Ut=new an(0,0,0,0);return{setMask:function(Ht){xt!==Ht&&!Y&&(r.colorMask(Ht,Ht,Ht,Ht),xt=Ht)},setLocked:function(Ht){Y=Ht},setClear:function(Ht,Et,Qt,Yt,We){We===!0&&(Ht*=Yt,Et*=Yt,Qt*=Yt),wt.set(Ht,Et,Qt,Yt),Ut.equals(wt)===!1&&(r.clearColor(Ht,Et,Qt,Yt),Ut.copy(wt))},reset:function(){Y=!1,xt=null,Ut.set(-1,0,0,0)}}}function a(){let Y=!1,wt=!1,xt=null,Ut=null,Ht=null;return{setReversed:function(Et){if(wt!==Et){const Qt=t.get("EXT_clip_control");Et?Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.ZERO_TO_ONE_EXT):Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.NEGATIVE_ONE_TO_ONE_EXT),wt=Et;const Yt=Ht;Ht=null,this.setClear(Yt)}},getReversed:function(){return wt},setTest:function(Et){Et?pt(r.DEPTH_TEST):Tt(r.DEPTH_TEST)},setMask:function(Et){xt!==Et&&!Y&&(r.depthMask(Et),xt=Et)},setFunc:function(Et){if(wt&&(Et=sb[Et]),Ut!==Et){switch(Et){case Ld:r.depthFunc(r.NEVER);break;case Nd:r.depthFunc(r.ALWAYS);break;case Od:r.depthFunc(r.LESS);break;case bl:r.depthFunc(r.LEQUAL);break;case Pd:r.depthFunc(r.EQUAL);break;case Id:r.depthFunc(r.GEQUAL);break;case zd:r.depthFunc(r.GREATER);break;case Fd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ut=Et}},setLocked:function(Et){Y=Et},setClear:function(Et){Ht!==Et&&(Ht=Et,wt&&(Et=1-Et),r.clearDepth(Et))},reset:function(){Y=!1,xt=null,Ut=null,Ht=null,wt=!1}}}function o(){let Y=!1,wt=null,xt=null,Ut=null,Ht=null,Et=null,Qt=null,Yt=null,We=null;return{setTest:function(Ue){Y||(Ue?pt(r.STENCIL_TEST):Tt(r.STENCIL_TEST))},setMask:function(Ue){wt!==Ue&&!Y&&(r.stencilMask(Ue),wt=Ue)},setFunc:function(Ue,Zn,si){(xt!==Ue||Ut!==Zn||Ht!==si)&&(r.stencilFunc(Ue,Zn,si),xt=Ue,Ut=Zn,Ht=si)},setOp:function(Ue,Zn,si){(Et!==Ue||Qt!==Zn||Yt!==si)&&(r.stencilOp(Ue,Zn,si),Et=Ue,Qt=Zn,Yt=si)},setLocked:function(Ue){Y=Ue},setClear:function(Ue){We!==Ue&&(r.clearStencil(Ue),We=Ue)},reset:function(){Y=!1,wt=null,xt=null,Ut=null,Ht=null,Et=null,Qt=null,Yt=null,We=null}}}const c=new n,u=new a,f=new o,p=new WeakMap,d=new WeakMap;let v={},_={},g={},x=new WeakMap,b=[],w=null,y=!1,S=null,C=null,L=null,A=null,U=null,N=null,I=null,T=new ee(0,0,0),P=0,B=!1,W=null,G=null,$=null,V=null,tt=null;const F=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,q=0;const it=r.getParameter(r.VERSION);it.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(it)[1]),X=q>=1):it.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),X=q>=2);let rt=null,O={};const et=r.getParameter(r.SCISSOR_BOX),j=r.getParameter(r.VIEWPORT),J=new an().fromArray(et),bt=new an().fromArray(j);function Dt(Y,wt,xt,Ut){const Ht=new Uint8Array(4),Et=r.createTexture();r.bindTexture(Y,Et),r.texParameteri(Y,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Y,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Qt=0;Qt<xt;Qt++)Y===r.TEXTURE_3D||Y===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,Ut,0,r.RGBA,r.UNSIGNED_BYTE,Ht):r.texImage2D(wt+Qt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ht);return Et}const at={};at[r.TEXTURE_2D]=Dt(r.TEXTURE_2D,r.TEXTURE_2D,1),at[r.TEXTURE_CUBE_MAP]=Dt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[r.TEXTURE_2D_ARRAY]=Dt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),at[r.TEXTURE_3D]=Dt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),f.setClear(0),pt(r.DEPTH_TEST),u.setFunc(bl),ue(!1),He(Kv),pt(r.CULL_FACE),me(Na);function pt(Y){v[Y]!==!0&&(r.enable(Y),v[Y]=!0)}function Tt(Y){v[Y]!==!1&&(r.disable(Y),v[Y]=!1)}function It(Y,wt){return g[Y]!==wt?(r.bindFramebuffer(Y,wt),g[Y]=wt,Y===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=wt),Y===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function At(Y,wt){let xt=b,Ut=!1;if(Y){xt=x.get(wt),xt===void 0&&(xt=[],x.set(wt,xt));const Ht=Y.textures;if(xt.length!==Ht.length||xt[0]!==r.COLOR_ATTACHMENT0){for(let Et=0,Qt=Ht.length;Et<Qt;Et++)xt[Et]=r.COLOR_ATTACHMENT0+Et;xt.length=Ht.length,Ut=!0}}else xt[0]!==r.BACK&&(xt[0]=r.BACK,Ut=!0);Ut&&r.drawBuffers(xt)}function $t(Y){return w!==Y?(r.useProgram(Y),w=Y,!0):!1}const Oe={[Yr]:r.FUNC_ADD,[AM]:r.FUNC_SUBTRACT,[wM]:r.FUNC_REVERSE_SUBTRACT};Oe[RM]=r.MIN,Oe[CM]=r.MAX;const ne={[DM]:r.ZERO,[UM]:r.ONE,[LM]:r.SRC_COLOR,[gx]:r.SRC_ALPHA,[FM]:r.SRC_ALPHA_SATURATE,[IM]:r.DST_COLOR,[OM]:r.DST_ALPHA,[NM]:r.ONE_MINUS_SRC_COLOR,[vx]:r.ONE_MINUS_SRC_ALPHA,[zM]:r.ONE_MINUS_DST_COLOR,[PM]:r.ONE_MINUS_DST_ALPHA,[BM]:r.CONSTANT_COLOR,[HM]:r.ONE_MINUS_CONSTANT_COLOR,[GM]:r.CONSTANT_ALPHA,[VM]:r.ONE_MINUS_CONSTANT_ALPHA};function me(Y,wt,xt,Ut,Ht,Et,Qt,Yt,We,Ue){if(Y===Na){y===!0&&(Tt(r.BLEND),y=!1);return}if(y===!1&&(pt(r.BLEND),y=!0),Y!==TM){if(Y!==S||Ue!==B){if((C!==Yr||U!==Yr)&&(r.blendEquation(r.FUNC_ADD),C=Yr,U=Yr),Ue)switch(Y){case vl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wu:r.blendFunc(r.ONE,r.ONE);break;case Jv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Qv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ne("WebGLState: Invalid blending: ",Y);break}else switch(Y){case vl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Jv:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qv:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",Y);break}L=null,A=null,N=null,I=null,T.set(0,0,0),P=0,S=Y,B=Ue}return}Ht=Ht||wt,Et=Et||xt,Qt=Qt||Ut,(wt!==C||Ht!==U)&&(r.blendEquationSeparate(Oe[wt],Oe[Ht]),C=wt,U=Ht),(xt!==L||Ut!==A||Et!==N||Qt!==I)&&(r.blendFuncSeparate(ne[xt],ne[Ut],ne[Et],ne[Qt]),L=xt,A=Ut,N=Et,I=Qt),(Yt.equals(T)===!1||We!==P)&&(r.blendColor(Yt.r,Yt.g,Yt.b,We),T.copy(Yt),P=We),S=Y,B=!1}function De(Y,wt){Y.side===ii?Tt(r.CULL_FACE):pt(r.CULL_FACE);let xt=Y.side===qn;wt&&(xt=!xt),ue(xt),Y.blending===vl&&Y.transparent===!1?me(Na):me(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),u.setFunc(Y.depthFunc),u.setTest(Y.depthTest),u.setMask(Y.depthWrite),c.setMask(Y.colorWrite);const Ut=Y.stencilWrite;f.setTest(Ut),Ut&&(f.setMask(Y.stencilWriteMask),f.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),f.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),fn(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?pt(r.SAMPLE_ALPHA_TO_COVERAGE):Tt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ue(Y){W!==Y&&(Y?r.frontFace(r.CW):r.frontFace(r.CCW),W=Y)}function He(Y){Y!==bM?(pt(r.CULL_FACE),Y!==G&&(Y===Kv?r.cullFace(r.BACK):Y===EM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Tt(r.CULL_FACE),G=Y}function $e(Y){Y!==$&&(X&&r.lineWidth(Y),$=Y)}function fn(Y,wt,xt){Y?(pt(r.POLYGON_OFFSET_FILL),(V!==wt||tt!==xt)&&(V=wt,tt=xt,u.getReversed()&&(wt=-wt),r.polygonOffset(wt,xt))):Tt(r.POLYGON_OFFSET_FILL)}function Re(Y){Y?pt(r.SCISSOR_TEST):Tt(r.SCISSOR_TEST)}function je(Y){Y===void 0&&(Y=r.TEXTURE0+F-1),rt!==Y&&(r.activeTexture(Y),rt=Y)}function Q(Y,wt,xt){xt===void 0&&(rt===null?xt=r.TEXTURE0+F-1:xt=rt);let Ut=O[xt];Ut===void 0&&(Ut={type:void 0,texture:void 0},O[xt]=Ut),(Ut.type!==Y||Ut.texture!==wt)&&(rt!==xt&&(r.activeTexture(xt),rt=xt),r.bindTexture(Y,wt||at[Y]),Ut.type=Y,Ut.texture=wt)}function Te(){const Y=O[rt];Y!==void 0&&Y.type!==void 0&&(r.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Ce(){try{r.compressedTexImage2D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function z(){try{r.compressedTexImage3D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function E(){try{r.texSubImage2D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function nt(){try{r.texSubImage3D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function ft(){try{r.compressedTexSubImage2D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function gt(){try{r.compressedTexSubImage3D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function Rt(){try{r.texStorage2D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function Lt(){try{r.texStorage3D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function vt(){try{r.texImage2D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function _t(){try{r.texImage3D(...arguments)}catch(Y){Ne("WebGLState:",Y)}}function Ct(Y){return _[Y]!==void 0?_[Y]:r.getParameter(Y)}function Bt(Y,wt){_[Y]!==wt&&(r.pixelStorei(Y,wt),_[Y]=wt)}function Ot(Y){J.equals(Y)===!1&&(r.scissor(Y.x,Y.y,Y.z,Y.w),J.copy(Y))}function Nt(Y){bt.equals(Y)===!1&&(r.viewport(Y.x,Y.y,Y.z,Y.w),bt.copy(Y))}function Wt(Y,wt){let xt=d.get(wt);xt===void 0&&(xt=new WeakMap,d.set(wt,xt));let Ut=xt.get(Y);Ut===void 0&&(Ut=r.getUniformBlockIndex(wt,Y.name),xt.set(Y,Ut))}function jt(Y,wt){const Ut=d.get(wt).get(Y);p.get(wt)!==Ut&&(r.uniformBlockBinding(wt,Ut,Y.__bindingPointIndex),p.set(wt,Ut))}function ae(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},rt=null,O={},g={},x=new WeakMap,b=[],w=null,y=!1,S=null,C=null,L=null,A=null,U=null,N=null,I=null,T=new ee(0,0,0),P=0,B=!1,W=null,G=null,$=null,V=null,tt=null,J.set(0,0,r.canvas.width,r.canvas.height),bt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),f.reset()}return{buffers:{color:c,depth:u,stencil:f},enable:pt,disable:Tt,bindFramebuffer:It,drawBuffers:At,useProgram:$t,setBlending:me,setMaterial:De,setFlipSided:ue,setCullFace:He,setLineWidth:$e,setPolygonOffset:fn,setScissorTest:Re,activeTexture:je,bindTexture:Q,unbindTexture:Te,compressedTexImage2D:Ce,compressedTexImage3D:z,texImage2D:vt,texImage3D:_t,pixelStorei:Bt,getParameter:Ct,updateUBOMapping:Wt,uniformBlockBinding:jt,texStorage2D:Rt,texStorage3D:Lt,texSubImage2D:E,texSubImage3D:nt,compressedTexSubImage2D:ft,compressedTexSubImage3D:gt,scissor:Ot,viewport:Nt,reset:ae}}function b2(r,t,n,a,o,c,u){const f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new qt,v=new WeakMap,_=new Set;let g;const x=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(z,E){return b?new OffscreenCanvas(z,E):Lu("canvas")}function y(z,E,nt){let ft=1;const gt=Ce(z);if((gt.width>nt||gt.height>nt)&&(ft=nt/Math.max(gt.width,gt.height)),ft<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const Rt=Math.floor(ft*gt.width),Lt=Math.floor(ft*gt.height);g===void 0&&(g=w(Rt,Lt));const vt=E?w(Rt,Lt):g;return vt.width=Rt,vt.height=Lt,vt.getContext("2d").drawImage(z,0,0,Rt,Lt),se("WebGLRenderer: Texture has been resized from ("+gt.width+"x"+gt.height+") to ("+Rt+"x"+Lt+")."),vt}else return"data"in z&&se("WebGLRenderer: Image in DataTexture is too big ("+gt.width+"x"+gt.height+")."),z;return z}function S(z){return z.generateMipmaps}function C(z){r.generateMipmap(z)}function L(z){return z.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?r.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(z,E,nt,ft,gt,Rt=!1){if(z!==null){if(r[z]!==void 0)return r[z];se("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let Lt;ft&&(Lt=t.get("EXT_texture_norm16"),Lt||se("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let vt=E;if(E===r.RED&&(nt===r.FLOAT&&(vt=r.R32F),nt===r.HALF_FLOAT&&(vt=r.R16F),nt===r.UNSIGNED_BYTE&&(vt=r.R8),nt===r.UNSIGNED_SHORT&&Lt&&(vt=Lt.R16_EXT),nt===r.SHORT&&Lt&&(vt=Lt.R16_SNORM_EXT)),E===r.RED_INTEGER&&(nt===r.UNSIGNED_BYTE&&(vt=r.R8UI),nt===r.UNSIGNED_SHORT&&(vt=r.R16UI),nt===r.UNSIGNED_INT&&(vt=r.R32UI),nt===r.BYTE&&(vt=r.R8I),nt===r.SHORT&&(vt=r.R16I),nt===r.INT&&(vt=r.R32I)),E===r.RG&&(nt===r.FLOAT&&(vt=r.RG32F),nt===r.HALF_FLOAT&&(vt=r.RG16F),nt===r.UNSIGNED_BYTE&&(vt=r.RG8),nt===r.UNSIGNED_SHORT&&Lt&&(vt=Lt.RG16_EXT),nt===r.SHORT&&Lt&&(vt=Lt.RG16_SNORM_EXT)),E===r.RG_INTEGER&&(nt===r.UNSIGNED_BYTE&&(vt=r.RG8UI),nt===r.UNSIGNED_SHORT&&(vt=r.RG16UI),nt===r.UNSIGNED_INT&&(vt=r.RG32UI),nt===r.BYTE&&(vt=r.RG8I),nt===r.SHORT&&(vt=r.RG16I),nt===r.INT&&(vt=r.RG32I)),E===r.RGB_INTEGER&&(nt===r.UNSIGNED_BYTE&&(vt=r.RGB8UI),nt===r.UNSIGNED_SHORT&&(vt=r.RGB16UI),nt===r.UNSIGNED_INT&&(vt=r.RGB32UI),nt===r.BYTE&&(vt=r.RGB8I),nt===r.SHORT&&(vt=r.RGB16I),nt===r.INT&&(vt=r.RGB32I)),E===r.RGBA_INTEGER&&(nt===r.UNSIGNED_BYTE&&(vt=r.RGBA8UI),nt===r.UNSIGNED_SHORT&&(vt=r.RGBA16UI),nt===r.UNSIGNED_INT&&(vt=r.RGBA32UI),nt===r.BYTE&&(vt=r.RGBA8I),nt===r.SHORT&&(vt=r.RGBA16I),nt===r.INT&&(vt=r.RGBA32I)),E===r.RGB&&(nt===r.UNSIGNED_SHORT&&Lt&&(vt=Lt.RGB16_EXT),nt===r.SHORT&&Lt&&(vt=Lt.RGB16_SNORM_EXT),nt===r.UNSIGNED_INT_5_9_9_9_REV&&(vt=r.RGB9_E5),nt===r.UNSIGNED_INT_10F_11F_11F_REV&&(vt=r.R11F_G11F_B10F)),E===r.RGBA){const _t=Rt?Uu:we.getTransfer(gt);nt===r.FLOAT&&(vt=r.RGBA32F),nt===r.HALF_FLOAT&&(vt=r.RGBA16F),nt===r.UNSIGNED_BYTE&&(vt=_t===Xe?r.SRGB8_ALPHA8:r.RGBA8),nt===r.UNSIGNED_SHORT&&Lt&&(vt=Lt.RGBA16_EXT),nt===r.SHORT&&Lt&&(vt=Lt.RGBA16_SNORM_EXT),nt===r.UNSIGNED_SHORT_4_4_4_4&&(vt=r.RGBA4),nt===r.UNSIGNED_SHORT_5_5_5_1&&(vt=r.RGB5_A1)}return(vt===r.R16F||vt===r.R32F||vt===r.RG16F||vt===r.RG32F||vt===r.RGBA16F||vt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),vt}function U(z,E){let nt;return z?E===null||E===sa||E===Tl?nt=r.DEPTH24_STENCIL8:E===Vi?nt=r.DEPTH32F_STENCIL8:E===El&&(nt=r.DEPTH24_STENCIL8,se("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===sa||E===Tl?nt=r.DEPTH_COMPONENT24:E===Vi?nt=r.DEPTH_COMPONENT32F:E===El&&(nt=r.DEPTH_COMPONENT16),nt}function N(z,E){return S(z)===!0||z.isFramebufferTexture&&z.minFilter!==In&&z.minFilter!==Tn?Math.log2(Math.max(E.width,E.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?E.mipmaps.length:1}function I(z){const E=z.target;E.removeEventListener("dispose",I),P(E),E.isVideoTexture&&v.delete(E),E.isHTMLTexture&&_.delete(E)}function T(z){const E=z.target;E.removeEventListener("dispose",T),W(E)}function P(z){const E=a.get(z);if(E.__webglInit===void 0)return;const nt=z.source,ft=x.get(nt);if(ft){const gt=ft[E.__cacheKey];gt.usedTimes--,gt.usedTimes===0&&B(z),Object.keys(ft).length===0&&x.delete(nt)}a.remove(z)}function B(z){const E=a.get(z);r.deleteTexture(E.__webglTexture);const nt=z.source,ft=x.get(nt);delete ft[E.__cacheKey],u.memory.textures--}function W(z){const E=a.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),a.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(E.__webglFramebuffer[ft]))for(let gt=0;gt<E.__webglFramebuffer[ft].length;gt++)r.deleteFramebuffer(E.__webglFramebuffer[ft][gt]);else r.deleteFramebuffer(E.__webglFramebuffer[ft]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[ft])}else{if(Array.isArray(E.__webglFramebuffer))for(let ft=0;ft<E.__webglFramebuffer.length;ft++)r.deleteFramebuffer(E.__webglFramebuffer[ft]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ft=0;ft<E.__webglColorRenderbuffer.length;ft++)E.__webglColorRenderbuffer[ft]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[ft]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const nt=z.textures;for(let ft=0,gt=nt.length;ft<gt;ft++){const Rt=a.get(nt[ft]);Rt.__webglTexture&&(r.deleteTexture(Rt.__webglTexture),u.memory.textures--),a.remove(nt[ft])}a.remove(z)}let G=0;function $(){G=0}function V(){return G}function tt(z){G=z}function F(){const z=G;return z>=o.maxTextures&&se("WebGLTextures: Trying to use "+(z+1)+" texture units while this GPU supports only "+o.maxTextures),G+=1,z}function X(z){const E=[];return E.push(z.wrapS),E.push(z.wrapT),E.push(z.wrapR||0),E.push(z.magFilter),E.push(z.minFilter),E.push(z.anisotropy),E.push(z.internalFormat),E.push(z.format),E.push(z.type),E.push(z.generateMipmaps),E.push(z.premultiplyAlpha),E.push(z.flipY),E.push(z.unpackAlignment),E.push(z.colorSpace),E.join()}function q(z,E){const nt=a.get(z);if(z.isVideoTexture&&Q(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&nt.__version!==z.version){const ft=z.image;if(ft===null)se("WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)se("WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(nt,z,E);return}}else z.isExternalTexture&&(nt.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,nt.__webglTexture,r.TEXTURE0+E)}function it(z,E){const nt=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&nt.__version!==z.version){Tt(nt,z,E);return}else z.isExternalTexture&&(nt.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,nt.__webglTexture,r.TEXTURE0+E)}function rt(z,E){const nt=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&nt.__version!==z.version){Tt(nt,z,E);return}n.bindTexture(r.TEXTURE_3D,nt.__webglTexture,r.TEXTURE0+E)}function O(z,E){const nt=a.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&nt.__version!==z.version){It(nt,z,E);return}n.bindTexture(r.TEXTURE_CUBE_MAP,nt.__webglTexture,r.TEXTURE0+E)}const et={[Ru]:r.REPEAT,[na]:r.CLAMP_TO_EDGE,[Bd]:r.MIRRORED_REPEAT},j={[In]:r.NEAREST,[WM]:r.NEAREST_MIPMAP_NEAREST,[Wc]:r.NEAREST_MIPMAP_LINEAR,[Tn]:r.LINEAR,[$h]:r.LINEAR_MIPMAP_NEAREST,[Xs]:r.LINEAR_MIPMAP_LINEAR},J={[KM]:r.NEVER,[tb]:r.ALWAYS,[JM]:r.LESS,[zp]:r.LEQUAL,[QM]:r.EQUAL,[Fp]:r.GEQUAL,[jM]:r.GREATER,[$M]:r.NOTEQUAL};function bt(z,E){if(E.type===Vi&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Tn||E.magFilter===$h||E.magFilter===Wc||E.magFilter===Xs||E.minFilter===Tn||E.minFilter===$h||E.minFilter===Wc||E.minFilter===Xs)&&se("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(z,r.TEXTURE_WRAP_S,et[E.wrapS]),r.texParameteri(z,r.TEXTURE_WRAP_T,et[E.wrapT]),(z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY)&&r.texParameteri(z,r.TEXTURE_WRAP_R,et[E.wrapR]),r.texParameteri(z,r.TEXTURE_MAG_FILTER,j[E.magFilter]),r.texParameteri(z,r.TEXTURE_MIN_FILTER,j[E.minFilter]),E.compareFunction&&(r.texParameteri(z,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(z,r.TEXTURE_COMPARE_FUNC,J[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===In||E.minFilter!==Wc&&E.minFilter!==Xs||E.type===Vi&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||a.get(E).__currentAnisotropy){const nt=t.get("EXT_texture_filter_anisotropic");r.texParameterf(z,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,o.getMaxAnisotropy())),a.get(E).__currentAnisotropy=E.anisotropy}}}function Dt(z,E){let nt=!1;z.__webglInit===void 0&&(z.__webglInit=!0,E.addEventListener("dispose",I));const ft=E.source;let gt=x.get(ft);gt===void 0&&(gt={},x.set(ft,gt));const Rt=X(E);if(Rt!==z.__cacheKey){gt[Rt]===void 0&&(gt[Rt]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,nt=!0),gt[Rt].usedTimes++;const Lt=gt[z.__cacheKey];Lt!==void 0&&(gt[z.__cacheKey].usedTimes--,Lt.usedTimes===0&&B(E)),z.__cacheKey=Rt,z.__webglTexture=gt[Rt].texture}return nt}function at(z,E,nt){return Math.floor(Math.floor(z/nt)/E)}function pt(z,E,nt,ft){const Rt=z.updateRanges;if(Rt.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,E.width,E.height,nt,ft,E.data);else{Rt.sort((Bt,Ot)=>Bt.start-Ot.start);let Lt=0;for(let Bt=1;Bt<Rt.length;Bt++){const Ot=Rt[Lt],Nt=Rt[Bt],Wt=Ot.start+Ot.count,jt=at(Nt.start,E.width,4),ae=at(Ot.start,E.width,4);Nt.start<=Wt+1&&jt===ae&&at(Nt.start+Nt.count-1,E.width,4)===jt?Ot.count=Math.max(Ot.count,Nt.start+Nt.count-Ot.start):(++Lt,Rt[Lt]=Nt)}Rt.length=Lt+1;const vt=n.getParameter(r.UNPACK_ROW_LENGTH),_t=n.getParameter(r.UNPACK_SKIP_PIXELS),Ct=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,E.width);for(let Bt=0,Ot=Rt.length;Bt<Ot;Bt++){const Nt=Rt[Bt],Wt=Math.floor(Nt.start/4),jt=Math.ceil(Nt.count/4),ae=Wt%E.width,Y=Math.floor(Wt/E.width),wt=jt,xt=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,ae),n.pixelStorei(r.UNPACK_SKIP_ROWS,Y),n.texSubImage2D(r.TEXTURE_2D,0,ae,Y,wt,xt,nt,ft,E.data)}z.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,vt),n.pixelStorei(r.UNPACK_SKIP_PIXELS,_t),n.pixelStorei(r.UNPACK_SKIP_ROWS,Ct)}}function Tt(z,E,nt){let ft=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ft=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ft=r.TEXTURE_3D);const gt=Dt(z,E),Rt=E.source;n.bindTexture(ft,z.__webglTexture,r.TEXTURE0+nt);const Lt=a.get(Rt);if(Rt.version!==Lt.__version||gt===!0){if(n.activeTexture(r.TEXTURE0+nt),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const xt=we.getPrimaries(we.workingColorSpace),Ut=E.colorSpace===ea?null:we.getPrimaries(E.colorSpace),Ht=E.colorSpace===ea||xt===Ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht)}n.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment);let _t=y(E.image,!1,o.maxTextureSize);_t=Te(E,_t);const Ct=c.convert(E.format,E.colorSpace),Bt=c.convert(E.type);let Ot=A(E.internalFormat,Ct,Bt,E.normalized,E.colorSpace,E.isVideoTexture);bt(ft,E);let Nt;const Wt=E.mipmaps,jt=E.isVideoTexture!==!0,ae=Lt.__version===void 0||gt===!0,Y=Rt.dataReady,wt=N(E,_t);if(E.isDepthTexture)Ot=U(E.format===Ws,E.type),ae&&(jt?n.texStorage2D(r.TEXTURE_2D,1,Ot,_t.width,_t.height):n.texImage2D(r.TEXTURE_2D,0,Ot,_t.width,_t.height,0,Ct,Bt,null));else if(E.isDataTexture)if(Wt.length>0){jt&&ae&&n.texStorage2D(r.TEXTURE_2D,wt,Ot,Wt[0].width,Wt[0].height);for(let xt=0,Ut=Wt.length;xt<Ut;xt++)Nt=Wt[xt],jt?Y&&n.texSubImage2D(r.TEXTURE_2D,xt,0,0,Nt.width,Nt.height,Ct,Bt,Nt.data):n.texImage2D(r.TEXTURE_2D,xt,Ot,Nt.width,Nt.height,0,Ct,Bt,Nt.data);E.generateMipmaps=!1}else jt?(ae&&n.texStorage2D(r.TEXTURE_2D,wt,Ot,_t.width,_t.height),Y&&pt(E,_t,Ct,Bt)):n.texImage2D(r.TEXTURE_2D,0,Ot,_t.width,_t.height,0,Ct,Bt,_t.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){jt&&ae&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,Ot,Wt[0].width,Wt[0].height,_t.depth);for(let xt=0,Ut=Wt.length;xt<Ut;xt++)if(Nt=Wt[xt],E.format!==vi)if(Ct!==null)if(jt){if(Y)if(E.layerUpdates.size>0){const Ht=B_(Nt.width,Nt.height,E.format,E.type);for(const Et of E.layerUpdates){const Qt=Nt.data.subarray(Et*Ht/Nt.data.BYTES_PER_ELEMENT,(Et+1)*Ht/Nt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,Et,Nt.width,Nt.height,1,Ct,Qt)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Nt.width,Nt.height,_t.depth,Ct,Nt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,xt,Ot,Nt.width,Nt.height,_t.depth,0,Nt.data,0,0);else se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else jt?Y&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Nt.width,Nt.height,_t.depth,Ct,Bt,Nt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,xt,Ot,Nt.width,Nt.height,_t.depth,0,Ct,Bt,Nt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{jt&&ae&&n.texStorage2D(r.TEXTURE_2D,wt,Ot,Wt[0].width,Wt[0].height);for(let xt=0,Ut=Wt.length;xt<Ut;xt++)Nt=Wt[xt],E.format!==vi?Ct!==null?jt?Y&&n.compressedTexSubImage2D(r.TEXTURE_2D,xt,0,0,Nt.width,Nt.height,Ct,Nt.data):n.compressedTexImage2D(r.TEXTURE_2D,xt,Ot,Nt.width,Nt.height,0,Nt.data):se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):jt?Y&&n.texSubImage2D(r.TEXTURE_2D,xt,0,0,Nt.width,Nt.height,Ct,Bt,Nt.data):n.texImage2D(r.TEXTURE_2D,xt,Ot,Nt.width,Nt.height,0,Ct,Bt,Nt.data)}else if(E.isDataArrayTexture)if(jt){if(ae&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,Ot,_t.width,_t.height,_t.depth),Y)if(E.layerUpdates.size>0){const xt=B_(_t.width,_t.height,E.format,E.type);for(const Ut of E.layerUpdates){const Ht=_t.data.subarray(Ut*xt/_t.data.BYTES_PER_ELEMENT,(Ut+1)*xt/_t.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ut,_t.width,_t.height,1,Ct,Bt,Ht)}E.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,Ct,Bt,_t.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Ot,_t.width,_t.height,_t.depth,0,Ct,Bt,_t.data);else if(E.isData3DTexture)jt?(ae&&n.texStorage3D(r.TEXTURE_3D,wt,Ot,_t.width,_t.height,_t.depth),Y&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,Ct,Bt,_t.data)):n.texImage3D(r.TEXTURE_3D,0,Ot,_t.width,_t.height,_t.depth,0,Ct,Bt,_t.data);else if(E.isFramebufferTexture){if(ae)if(jt)n.texStorage2D(r.TEXTURE_2D,wt,Ot,_t.width,_t.height);else{let xt=_t.width,Ut=_t.height;for(let Ht=0;Ht<wt;Ht++)n.texImage2D(r.TEXTURE_2D,Ht,Ot,xt,Ut,0,Ct,Bt,null),xt>>=1,Ut>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in r){const xt=r.canvas;if(xt.hasAttribute("layoutsubtree")||xt.setAttribute("layoutsubtree","true"),_t.parentNode!==xt){xt.appendChild(_t),_.add(E),xt.onpaint=Ut=>{const Ht=Ut.changedElements;for(const Et of _)Ht.includes(Et.image)&&(Et.needsUpdate=!0)},xt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,_t);else{const Ht=r.RGBA,Et=r.RGBA,Qt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Ht,Et,Qt,_t)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Wt.length>0){if(jt&&ae){const xt=Ce(Wt[0]);n.texStorage2D(r.TEXTURE_2D,wt,Ot,xt.width,xt.height)}for(let xt=0,Ut=Wt.length;xt<Ut;xt++)Nt=Wt[xt],jt?Y&&n.texSubImage2D(r.TEXTURE_2D,xt,0,0,Ct,Bt,Nt):n.texImage2D(r.TEXTURE_2D,xt,Ot,Ct,Bt,Nt);E.generateMipmaps=!1}else if(jt){if(ae){const xt=Ce(_t);n.texStorage2D(r.TEXTURE_2D,wt,Ot,xt.width,xt.height)}Y&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Ct,Bt,_t)}else n.texImage2D(r.TEXTURE_2D,0,Ot,Ct,Bt,_t);S(E)&&C(ft),Lt.__version=Rt.version,E.onUpdate&&E.onUpdate(E)}z.__version=E.version}function It(z,E,nt){if(E.image.length!==6)return;const ft=Dt(z,E),gt=E.source;n.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+nt);const Rt=a.get(gt);if(gt.version!==Rt.__version||ft===!0){n.activeTexture(r.TEXTURE0+nt);const Lt=we.getPrimaries(we.workingColorSpace),vt=E.colorSpace===ea?null:we.getPrimaries(E.colorSpace),_t=E.colorSpace===ea||Lt===vt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Ct=E.isCompressedTexture||E.image[0].isCompressedTexture,Bt=E.image[0]&&E.image[0].isDataTexture,Ot=[];for(let Et=0;Et<6;Et++)!Ct&&!Bt?Ot[Et]=y(E.image[Et],!0,o.maxCubemapSize):Ot[Et]=Bt?E.image[Et].image:E.image[Et],Ot[Et]=Te(E,Ot[Et]);const Nt=Ot[0],Wt=c.convert(E.format,E.colorSpace),jt=c.convert(E.type),ae=A(E.internalFormat,Wt,jt,E.normalized,E.colorSpace),Y=E.isVideoTexture!==!0,wt=Rt.__version===void 0||ft===!0,xt=gt.dataReady;let Ut=N(E,Nt);bt(r.TEXTURE_CUBE_MAP,E);let Ht;if(Ct){Y&&wt&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Ut,ae,Nt.width,Nt.height);for(let Et=0;Et<6;Et++){Ht=Ot[Et].mipmaps;for(let Qt=0;Qt<Ht.length;Qt++){const Yt=Ht[Qt];E.format!==vi?Wt!==null?Y?xt&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Qt,0,0,Yt.width,Yt.height,Wt,Yt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Qt,ae,Yt.width,Yt.height,0,Yt.data):se("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Qt,0,0,Yt.width,Yt.height,Wt,jt,Yt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Qt,ae,Yt.width,Yt.height,0,Wt,jt,Yt.data)}}}else{if(Ht=E.mipmaps,Y&&wt){Ht.length>0&&Ut++;const Et=Ce(Ot[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Ut,ae,Et.width,Et.height)}for(let Et=0;Et<6;Et++)if(Bt){Y?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,0,0,Ot[Et].width,Ot[Et].height,Wt,jt,Ot[Et].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,ae,Ot[Et].width,Ot[Et].height,0,Wt,jt,Ot[Et].data);for(let Qt=0;Qt<Ht.length;Qt++){const We=Ht[Qt].image[Et].image;Y?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Qt+1,0,0,We.width,We.height,Wt,jt,We.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Qt+1,ae,We.width,We.height,0,Wt,jt,We.data)}}else{Y?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,0,0,Wt,jt,Ot[Et]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,ae,Wt,jt,Ot[Et]);for(let Qt=0;Qt<Ht.length;Qt++){const Yt=Ht[Qt];Y?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Qt+1,0,0,Wt,jt,Yt.image[Et]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Qt+1,ae,Wt,jt,Yt.image[Et])}}}S(E)&&C(r.TEXTURE_CUBE_MAP),Rt.__version=gt.version,E.onUpdate&&E.onUpdate(E)}z.__version=E.version}function At(z,E,nt,ft,gt,Rt){const Lt=c.convert(nt.format,nt.colorSpace),vt=c.convert(nt.type),_t=A(nt.internalFormat,Lt,vt,nt.normalized,nt.colorSpace),Ct=a.get(E),Bt=a.get(nt);if(Bt.__renderTarget=E,!Ct.__hasExternalTextures){const Ot=Math.max(1,E.width>>Rt),Nt=Math.max(1,E.height>>Rt);gt===r.TEXTURE_3D||gt===r.TEXTURE_2D_ARRAY?n.texImage3D(gt,Rt,_t,Ot,Nt,E.depth,0,Lt,vt,null):n.texImage2D(gt,Rt,_t,Ot,Nt,0,Lt,vt,null)}n.bindFramebuffer(r.FRAMEBUFFER,z),je(E)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ft,gt,Bt.__webglTexture,0,Re(E)):(gt===r.TEXTURE_2D||gt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&gt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ft,gt,Bt.__webglTexture,Rt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function $t(z,E,nt){if(r.bindRenderbuffer(r.RENDERBUFFER,z),E.depthBuffer){const ft=E.depthTexture,gt=ft&&ft.isDepthTexture?ft.type:null,Rt=U(E.stencilBuffer,gt),Lt=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;je(E)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Re(E),Rt,E.width,E.height):nt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Re(E),Rt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,Rt,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Lt,r.RENDERBUFFER,z)}else{const ft=E.textures;for(let gt=0;gt<ft.length;gt++){const Rt=ft[gt],Lt=c.convert(Rt.format,Rt.colorSpace),vt=c.convert(Rt.type),_t=A(Rt.internalFormat,Lt,vt,Rt.normalized,Rt.colorSpace);je(E)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Re(E),_t,E.width,E.height):nt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Re(E),_t,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,_t,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Oe(z,E,nt){const ft=E.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,z),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const gt=a.get(E.depthTexture);if(gt.__renderTarget=E,(!gt.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ft){if(gt.__webglInit===void 0&&(gt.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),gt.__webglTexture===void 0){gt.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,gt.__webglTexture),bt(r.TEXTURE_CUBE_MAP,E.depthTexture);const Ct=c.convert(E.depthTexture.format),Bt=c.convert(E.depthTexture.type);let Ot;E.depthTexture.format===Pa?Ot=r.DEPTH_COMPONENT24:E.depthTexture.format===Ws&&(Ot=r.DEPTH24_STENCIL8);for(let Nt=0;Nt<6;Nt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,Ot,E.width,E.height,0,Ct,Bt,null)}}else q(E.depthTexture,0);const Rt=gt.__webglTexture,Lt=Re(E),vt=ft?r.TEXTURE_CUBE_MAP_POSITIVE_X+nt:r.TEXTURE_2D,_t=E.depthTexture.format===Ws?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(E.depthTexture.format===Pa)je(E)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_t,vt,Rt,0,Lt):r.framebufferTexture2D(r.FRAMEBUFFER,_t,vt,Rt,0);else if(E.depthTexture.format===Ws)je(E)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_t,vt,Rt,0,Lt):r.framebufferTexture2D(r.FRAMEBUFFER,_t,vt,Rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(z){const E=a.get(z),nt=z.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==z.depthTexture){const ft=z.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ft){const gt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ft.removeEventListener("dispose",gt)};ft.addEventListener("dispose",gt),E.__depthDisposeCallback=gt}E.__boundDepthTexture=ft}if(z.depthTexture&&!E.__autoAllocateDepthBuffer)if(nt)for(let ft=0;ft<6;ft++)Oe(E.__webglFramebuffer[ft],z,ft);else{const ft=z.texture.mipmaps;ft&&ft.length>0?Oe(E.__webglFramebuffer[0],z,0):Oe(E.__webglFramebuffer,z,0)}else if(nt){E.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[ft]),E.__webglDepthbuffer[ft]===void 0)E.__webglDepthbuffer[ft]=r.createRenderbuffer(),$t(E.__webglDepthbuffer[ft],z,!1);else{const gt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Rt=E.__webglDepthbuffer[ft];r.bindRenderbuffer(r.RENDERBUFFER,Rt),r.framebufferRenderbuffer(r.FRAMEBUFFER,gt,r.RENDERBUFFER,Rt)}}else{const ft=z.texture.mipmaps;if(ft&&ft.length>0?n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),$t(E.__webglDepthbuffer,z,!1);else{const gt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Rt=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Rt),r.framebufferRenderbuffer(r.FRAMEBUFFER,gt,r.RENDERBUFFER,Rt)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function me(z,E,nt){const ft=a.get(z);E!==void 0&&At(ft.__webglFramebuffer,z,z.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),nt!==void 0&&ne(z)}function De(z){const E=z.texture,nt=a.get(z),ft=a.get(E);z.addEventListener("dispose",T);const gt=z.textures,Rt=z.isWebGLCubeRenderTarget===!0,Lt=gt.length>1;if(Lt||(ft.__webglTexture===void 0&&(ft.__webglTexture=r.createTexture()),ft.__version=E.version,u.memory.textures++),Rt){nt.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(E.mipmaps&&E.mipmaps.length>0){nt.__webglFramebuffer[vt]=[];for(let _t=0;_t<E.mipmaps.length;_t++)nt.__webglFramebuffer[vt][_t]=r.createFramebuffer()}else nt.__webglFramebuffer[vt]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){nt.__webglFramebuffer=[];for(let vt=0;vt<E.mipmaps.length;vt++)nt.__webglFramebuffer[vt]=r.createFramebuffer()}else nt.__webglFramebuffer=r.createFramebuffer();if(Lt)for(let vt=0,_t=gt.length;vt<_t;vt++){const Ct=a.get(gt[vt]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=r.createTexture(),u.memory.textures++)}if(z.samples>0&&je(z)===!1){nt.__webglMultisampledFramebuffer=r.createFramebuffer(),nt.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,nt.__webglMultisampledFramebuffer);for(let vt=0;vt<gt.length;vt++){const _t=gt[vt];nt.__webglColorRenderbuffer[vt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,nt.__webglColorRenderbuffer[vt]);const Ct=c.convert(_t.format,_t.colorSpace),Bt=c.convert(_t.type),Ot=A(_t.internalFormat,Ct,Bt,_t.normalized,_t.colorSpace,z.isXRRenderTarget===!0),Nt=Re(z);r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt,Ot,z.width,z.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+vt,r.RENDERBUFFER,nt.__webglColorRenderbuffer[vt])}r.bindRenderbuffer(r.RENDERBUFFER,null),z.depthBuffer&&(nt.__webglDepthRenderbuffer=r.createRenderbuffer(),$t(nt.__webglDepthRenderbuffer,z,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Rt){n.bindTexture(r.TEXTURE_CUBE_MAP,ft.__webglTexture),bt(r.TEXTURE_CUBE_MAP,E);for(let vt=0;vt<6;vt++)if(E.mipmaps&&E.mipmaps.length>0)for(let _t=0;_t<E.mipmaps.length;_t++)At(nt.__webglFramebuffer[vt][_t],z,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,_t);else At(nt.__webglFramebuffer[vt],z,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);S(E)&&C(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Lt){for(let vt=0,_t=gt.length;vt<_t;vt++){const Ct=gt[vt],Bt=a.get(Ct);let Ot=r.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Ot=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Ot,Bt.__webglTexture),bt(Ot,Ct),At(nt.__webglFramebuffer,z,Ct,r.COLOR_ATTACHMENT0+vt,Ot,0),S(Ct)&&C(Ot)}n.unbindTexture()}else{let vt=r.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(vt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(vt,ft.__webglTexture),bt(vt,E),E.mipmaps&&E.mipmaps.length>0)for(let _t=0;_t<E.mipmaps.length;_t++)At(nt.__webglFramebuffer[_t],z,E,r.COLOR_ATTACHMENT0,vt,_t);else At(nt.__webglFramebuffer,z,E,r.COLOR_ATTACHMENT0,vt,0);S(E)&&C(vt),n.unbindTexture()}z.depthBuffer&&ne(z)}function ue(z){const E=z.textures;for(let nt=0,ft=E.length;nt<ft;nt++){const gt=E[nt];if(S(gt)){const Rt=L(z),Lt=a.get(gt).__webglTexture;n.bindTexture(Rt,Lt),C(Rt),n.unbindTexture()}}}const He=[],$e=[];function fn(z){if(z.samples>0){if(je(z)===!1){const E=z.textures,nt=z.width,ft=z.height;let gt=r.COLOR_BUFFER_BIT;const Rt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=a.get(z),vt=E.length>1;if(vt)for(let Ct=0;Ct<E.length;Ct++)n.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const _t=z.texture.mipmaps;_t&&_t.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Ct=0;Ct<E.length;Ct++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(gt|=r.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(gt|=r.STENCIL_BUFFER_BIT)),vt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Lt.__webglColorRenderbuffer[Ct]);const Bt=a.get(E[Ct]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Bt,0)}r.blitFramebuffer(0,0,nt,ft,0,0,nt,ft,gt,r.NEAREST),p===!0&&(He.length=0,$e.length=0,He.push(r.COLOR_ATTACHMENT0+Ct),z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&(He.push(Rt),$e.push(Rt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,$e)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,He))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),vt)for(let Ct=0;Ct<E.length;Ct++){n.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.RENDERBUFFER,Lt.__webglColorRenderbuffer[Ct]);const Bt=a.get(E[Ct]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.TEXTURE_2D,Bt,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&p){const E=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Re(z){return Math.min(o.maxSamples,z.samples)}function je(z){const E=a.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Q(z){const E=u.render.frame;v.get(z)!==E&&(v.set(z,E),z.update())}function Te(z,E){const nt=z.colorSpace,ft=z.format,gt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||nt!==so&&nt!==ea&&(we.getTransfer(nt)===Xe?(ft!==vi||gt!==Dn)&&se("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",nt)),E}function Ce(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(d.width=z.naturalWidth||z.width,d.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(d.width=z.displayWidth,d.height=z.displayHeight):(d.width=z.width,d.height=z.height),d}this.allocateTextureUnit=F,this.resetTextureUnits=$,this.getTextureUnits=V,this.setTextureUnits=tt,this.setTexture2D=q,this.setTexture2DArray=it,this.setTexture3D=rt,this.setTextureCube=O,this.rebindTextures=me,this.setupRenderTarget=De,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=fn,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=At,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function E2(r,t){function n(a,o=ea){let c;const u=we.getTransfer(o);if(a===Dn)return r.UNSIGNED_BYTE;if(a===Up)return r.UNSIGNED_SHORT_4_4_4_4;if(a===Lp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===Rx)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===Cx)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===Ax)return r.BYTE;if(a===wx)return r.SHORT;if(a===El)return r.UNSIGNED_SHORT;if(a===Dp)return r.INT;if(a===sa)return r.UNSIGNED_INT;if(a===Vi)return r.FLOAT;if(a===Yn)return r.HALF_FLOAT;if(a===Dx)return r.ALPHA;if(a===Ux)return r.RGB;if(a===vi)return r.RGBA;if(a===Pa)return r.DEPTH_COMPONENT;if(a===Ws)return r.DEPTH_STENCIL;if(a===Np)return r.RED;if(a===Op)return r.RED_INTEGER;if(a===Ks)return r.RG;if(a===Pp)return r.RG_INTEGER;if(a===Ip)return r.RGBA_INTEGER;if(a===xu||a===Su||a===yu||a===Mu)if(u===Xe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===xu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===Su)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===yu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Mu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===xu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===Su)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===yu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Mu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Hd||a===Gd||a===Vd||a===kd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Hd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Gd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Vd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===kd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Xd||a===Wd||a===qd||a===Yd||a===Zd||a===Cu||a===Kd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Xd||a===Wd)return u===Xe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===Yd)return c.COMPRESSED_R11_EAC;if(a===Zd)return c.COMPRESSED_SIGNED_R11_EAC;if(a===Cu)return c.COMPRESSED_RG11_EAC;if(a===Kd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===Jd||a===Qd||a===jd||a===$d||a===tp||a===ep||a===np||a===ip||a===ap||a===sp||a===rp||a===op||a===lp||a===cp)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Jd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Qd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===jd)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===$d)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===tp)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===ep)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===np)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===ip)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===ap)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===sp)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===rp)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===op)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===lp)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===cp)return u===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===up||a===fp||a===hp)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===up)return u===Xe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===fp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===hp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===dp||a===pp||a===Du||a===mp)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===dp)return c.COMPRESSED_RED_RGTC1_EXT;if(a===pp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Du)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===mp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Tl?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const T2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,A2=`
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

}`;class w2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new Bx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new ai({vertexShader:T2,fragmentShader:A2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ge(new qs(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class R2 extends Qs{constructor(t,n){super();const a=this;let o=null,c=1,u=null,f="local-floor",p=1,d=null,v=null,_=null,g=null,x=null,b=null;const w=typeof XRWebGLBinding<"u",y=new w2,S={},C=n.getContextAttributes();let L=null,A=null;const U=[],N=[],I=new qt;let T=null,P=null;const B=new Ui;B.viewport=new an;const W=new Ui;W.viewport=new an;const G=[B,W],$=new P1;let V=null,tt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let pt=U[at];return pt===void 0&&(pt=new rd,U[at]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(at){let pt=U[at];return pt===void 0&&(pt=new rd,U[at]=pt),pt.getGripSpace()},this.getHand=function(at){let pt=U[at];return pt===void 0&&(pt=new rd,U[at]=pt),pt.getHandSpace()};function F(at){const pt=N.indexOf(at.inputSource);if(pt===-1)return;const Tt=U[pt];Tt!==void 0&&(Tt.update(at.inputSource,at.frame,d||u),Tt.dispatchEvent({type:at.type,data:at.inputSource}))}function X(){o.removeEventListener("select",F),o.removeEventListener("selectstart",F),o.removeEventListener("selectend",F),o.removeEventListener("squeeze",F),o.removeEventListener("squeezestart",F),o.removeEventListener("squeezeend",F),o.removeEventListener("end",X),o.removeEventListener("inputsourceschange",q);for(let at=0;at<U.length;at++){const pt=N[at];pt!==null&&(N[at]=null,U[at].disconnect(pt))}V=null,tt=null,y.reset();for(const at in S)delete S[at];if(t.setRenderTarget(L),x=null,g=null,_=null,o=null,A=null,Dt.stop(),a.isPresenting=!1,t.setPixelRatio(T),t.setSize(I.width,I.height,!1),P!==null){const at=P.camera;at.fov=P.fov,at.zoom=P.zoom,at.updateProjectionMatrix(),P=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){c=at,a.isPresenting===!0&&se("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){f=at,a.isPresenting===!0&&se("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||u},this.setReferenceSpace=function(at){d=at},this.getBaseLayer=function(){return g!==null?g:x},this.getBinding=function(){return _===null&&w&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return b},this.getSession=function(){return o},this.setSession=async function(at){if(o=at,o!==null){if(L=t.getRenderTarget(),o.addEventListener("select",F),o.addEventListener("selectstart",F),o.addEventListener("selectend",F),o.addEventListener("squeeze",F),o.addEventListener("squeezestart",F),o.addEventListener("squeezeend",F),o.addEventListener("end",X),o.addEventListener("inputsourceschange",q),C.xrCompatible!==!0&&await n.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(I),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,It=null,At=null;C.depth&&(At=C.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Tt=C.stencil?Ws:Pa,It=C.stencil?Tl:sa);const $t={colorFormat:n.RGBA8,depthFormat:At,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer($t),o.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),A=new _i(g.textureWidth,g.textureHeight,{format:vi,type:Dn,depthTexture:new Rl(g.textureWidth,g.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:C.stencil,colorSpace:t.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const Tt={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(o,n,Tt),o.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new _i(x.framebufferWidth,x.framebufferHeight,{format:vi,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(p),d=null,u=await o.requestReferenceSpace(f),Dt.setContext(o),Dt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function q(at){for(let pt=0;pt<at.removed.length;pt++){const Tt=at.removed[pt],It=N.indexOf(Tt);It>=0&&(N[It]=null,U[It].disconnect(Tt))}for(let pt=0;pt<at.added.length;pt++){const Tt=at.added[pt];let It=N.indexOf(Tt);if(It===-1){for(let $t=0;$t<U.length;$t++)if($t>=N.length){N.push(Tt),It=$t;break}else if(N[$t]===null){N[$t]=Tt,It=$t;break}if(It===-1)break}const At=U[It];At&&At.connect(Tt)}}const it=new H,rt=new H;function O(at,pt,Tt){it.setFromMatrixPosition(pt.matrixWorld),rt.setFromMatrixPosition(Tt.matrixWorld);const It=it.distanceTo(rt),At=pt.projectionMatrix.elements,$t=Tt.projectionMatrix.elements,Oe=At[14]/(At[10]-1),ne=At[14]/(At[10]+1),me=(At[9]+1)/At[5],De=(At[9]-1)/At[5],ue=(At[8]-1)/At[0],He=($t[8]+1)/$t[0],$e=Oe*ue,fn=Oe*He,Re=It/(-ue+He),je=Re*-ue;if(pt.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(je),at.translateZ(Re),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),At[10]===-1)at.projectionMatrix.copy(pt.projectionMatrix),at.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const Q=Oe+Re,Te=ne+Re,Ce=$e-je,z=fn+(It-je),E=me*ne/Te*Q,nt=De*ne/Te*Q;at.projectionMatrix.makePerspective(Ce,z,E,nt,Q,Te),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function et(at,pt){pt===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(pt.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(o===null)return;let pt=at.near,Tt=at.far;y.texture!==null&&(y.depthNear>0&&(pt=y.depthNear),y.depthFar>0&&(Tt=y.depthFar)),$.near=W.near=B.near=pt,$.far=W.far=B.far=Tt,(V!==$.near||tt!==$.far)&&(o.updateRenderState({depthNear:$.near,depthFar:$.far}),V=$.near,tt=$.far),$.layers.mask=at.layers.mask|6,B.layers.mask=$.layers.mask&-5,W.layers.mask=$.layers.mask&-3;const It=at.parent,At=$.cameras;et($,It);for(let $t=0;$t<At.length;$t++)et(At[$t],It);At.length===2?O($,B,W):$.projectionMatrix.copy(B.projectionMatrix),P===null&&at.isPerspectiveCamera&&(P={camera:at,fov:at.fov,zoom:at.zoom}),j(at,$,It)};function j(at,pt,Tt){Tt===null?at.matrix.copy(pt.matrixWorld):(at.matrix.copy(Tt.matrixWorld),at.matrix.invert(),at.matrix.multiply(pt.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(pt.projectionMatrix),at.projectionMatrixInverse.copy(pt.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=wl*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(g===null&&x===null))return p},this.setFoveation=function(at){p=at,g!==null&&(g.fixedFoveation=at),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=at)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh($)},this.getCameraTexture=function(at){return S[at]};let J=null;function bt(at,pt){if(v=pt.getViewerPose(d||u),b=pt,v!==null){const Tt=v.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let It=!1;Tt.length!==$.cameras.length&&($.cameras.length=0,It=!0);for(let ne=0;ne<Tt.length;ne++){const me=Tt[ne];let De=null;if(x!==null)De=x.getViewport(me);else{const He=_.getViewSubImage(g,me);De=He.viewport,ne===0&&(t.setRenderTargetTextures(A,He.colorTexture,He.depthStencilTexture),t.setRenderTarget(A))}let ue=G[ne];ue===void 0&&(ue=new Ui,ue.layers.enable(ne),ue.viewport=new an,G[ne]=ue),ue.matrix.fromArray(me.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(me.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(De.x,De.y,De.width,De.height),ne===0&&($.matrix.copy(ue.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),It===!0&&$.cameras.push(ue)}const At=o.enabledFeatures;if(At&&At.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&w){_=a.getBinding();const ne=_.getDepthInformation(Tt[0]);ne&&ne.isValid&&ne.texture&&y.init(ne,o.renderState)}if(At&&At.includes("camera-access")&&w){t.state.unbindTexture(),_=a.getBinding();for(let ne=0;ne<Tt.length;ne++){const me=Tt[ne].camera;if(me){let De=S[me];De||(De=new Bx,S[me]=De);const ue=_.getCameraImage(me);De.sourceTexture=ue}}}}for(let Tt=0;Tt<U.length;Tt++){const It=N[Tt],At=U[Tt];It!==null&&At!==void 0&&At.update(It,pt,d||u)}J&&J(at,pt),pt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:pt}),b=null}const Dt=new $x;Dt.setAnimationLoop(bt),this.setAnimationLoop=function(at){J=at},this.dispose=function(){}}}const C2=new Se,rS=new re;rS.set(-1,0,0,0,1,0,0,0,1);function D2(r,t){function n(y,S){y.matrixAutoUpdate===!0&&y.updateMatrix(),S.value.copy(y.matrix)}function a(y,S){S.color.getRGB(y.fogColor.value,Jx(r)),S.isFog?(y.fogNear.value=S.near,y.fogFar.value=S.far):S.isFogExp2&&(y.fogDensity.value=S.density)}function o(y,S,C,L,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(y,S):S.isMeshLambertMaterial?(c(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(y,S),_(y,S)):S.isMeshPhongMaterial?(c(y,S),v(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(y,S),g(y,S),S.isMeshPhysicalMaterial&&x(y,S,A)):S.isMeshMatcapMaterial?(c(y,S),b(y,S)):S.isMeshDepthMaterial?c(y,S):S.isMeshDistanceMaterial?(c(y,S),w(y,S)):S.isMeshNormalMaterial?c(y,S):S.isLineBasicMaterial?(u(y,S),S.isLineDashedMaterial&&f(y,S)):S.isPointsMaterial?p(y,S,C,L):S.isSpriteMaterial?d(y,S):S.isShadowMaterial?(y.color.value.copy(S.color),y.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(y,S){y.opacity.value=S.opacity,S.color&&y.diffuse.value.copy(S.color),S.emissive&&y.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(y.map.value=S.map,n(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,n(S.alphaMap,y.alphaMapTransform)),S.bumpMap&&(y.bumpMap.value=S.bumpMap,n(S.bumpMap,y.bumpMapTransform),y.bumpScale.value=S.bumpScale,S.side===qn&&(y.bumpScale.value*=-1)),S.normalMap&&(y.normalMap.value=S.normalMap,n(S.normalMap,y.normalMapTransform),y.normalScale.value.copy(S.normalScale),S.side===qn&&y.normalScale.value.negate()),S.displacementMap&&(y.displacementMap.value=S.displacementMap,n(S.displacementMap,y.displacementMapTransform),y.displacementScale.value=S.displacementScale,y.displacementBias.value=S.displacementBias),S.emissiveMap&&(y.emissiveMap.value=S.emissiveMap,n(S.emissiveMap,y.emissiveMapTransform)),S.specularMap&&(y.specularMap.value=S.specularMap,n(S.specularMap,y.specularMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest);const C=t.get(S),L=C.envMap,A=C.envMapRotation;L&&(y.envMap.value=L,y.envMapRotation.value.setFromMatrix4(C2.makeRotationFromEuler(A)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(rS),y.reflectivity.value=S.reflectivity,y.ior.value=S.ior,y.refractionRatio.value=S.refractionRatio),S.lightMap&&(y.lightMap.value=S.lightMap,y.lightMapIntensity.value=S.lightMapIntensity,n(S.lightMap,y.lightMapTransform)),S.aoMap&&(y.aoMap.value=S.aoMap,y.aoMapIntensity.value=S.aoMapIntensity,n(S.aoMap,y.aoMapTransform))}function u(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,S.map&&(y.map.value=S.map,n(S.map,y.mapTransform))}function f(y,S){y.dashSize.value=S.dashSize,y.totalSize.value=S.dashSize+S.gapSize,y.scale.value=S.scale}function p(y,S,C,L){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.size.value=S.size*C,y.scale.value=L*.5,S.map&&(y.map.value=S.map,n(S.map,y.uvTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,n(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function d(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.rotation.value=S.rotation,S.map&&(y.map.value=S.map,n(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,n(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function v(y,S){y.specular.value.copy(S.specular),y.shininess.value=Math.max(S.shininess,1e-4)}function _(y,S){S.gradientMap&&(y.gradientMap.value=S.gradientMap)}function g(y,S){y.metalness.value=S.metalness,S.metalnessMap&&(y.metalnessMap.value=S.metalnessMap,n(S.metalnessMap,y.metalnessMapTransform)),y.roughness.value=S.roughness,S.roughnessMap&&(y.roughnessMap.value=S.roughnessMap,n(S.roughnessMap,y.roughnessMapTransform)),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)}function x(y,S,C){y.ior.value=S.ior,S.sheen>0&&(y.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),y.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(y.sheenColorMap.value=S.sheenColorMap,n(S.sheenColorMap,y.sheenColorMapTransform)),S.sheenRoughnessMap&&(y.sheenRoughnessMap.value=S.sheenRoughnessMap,n(S.sheenRoughnessMap,y.sheenRoughnessMapTransform))),S.clearcoat>0&&(y.clearcoat.value=S.clearcoat,y.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(y.clearcoatMap.value=S.clearcoatMap,n(S.clearcoatMap,y.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,n(S.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(y.clearcoatNormalMap.value=S.clearcoatNormalMap,n(S.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===qn&&y.clearcoatNormalScale.value.negate())),S.dispersion>0&&(y.dispersion.value=S.dispersion),S.retroreflectivity>0&&(y.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(y.iridescence.value=S.iridescence,y.iridescenceIOR.value=S.iridescenceIOR,y.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(y.iridescenceMap.value=S.iridescenceMap,n(S.iridescenceMap,y.iridescenceMapTransform)),S.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=S.iridescenceThicknessMap,n(S.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),S.transmission>0&&(y.transmission.value=S.transmission,y.transmissionSamplerMap.value=C.texture,y.transmissionSamplerSize.value.set(C.width,C.height),S.transmissionMap&&(y.transmissionMap.value=S.transmissionMap,n(S.transmissionMap,y.transmissionMapTransform)),y.thickness.value=S.thickness,S.thicknessMap&&(y.thicknessMap.value=S.thicknessMap,n(S.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=S.attenuationDistance,y.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(y.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(y.anisotropyMap.value=S.anisotropyMap,n(S.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=S.specularIntensity,y.specularColor.value.copy(S.specularColor),S.specularColorMap&&(y.specularColorMap.value=S.specularColorMap,n(S.specularColorMap,y.specularColorMapTransform)),S.specularIntensityMap&&(y.specularIntensityMap.value=S.specularIntensityMap,n(S.specularIntensityMap,y.specularIntensityMapTransform))}function b(y,S){S.matcap&&(y.matcap.value=S.matcap)}function w(y,S){const C=t.get(S).light;y.referencePosition.value.setFromMatrixPosition(C.matrixWorld),y.nearDistance.value=C.shadow.camera.near,y.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function U2(r,t,n,a){let o={},c={},u=[];const f=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(A,U){const N=U.program;a.uniformBlockBinding(A,N)}function d(A,U){let N=o[A.id];N===void 0&&(y(A),N=v(A),o[A.id]=N,A.addEventListener("dispose",C));const I=U.program;a.updateUBOMapping(A,I);const T=t.render.frame;c[A.id]!==T&&(g(A),c[A.id]=T)}function v(A){const U=_();A.__bindingPointIndex=U;const N=r.createBuffer(),I=A.__size,T=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,N),r.bufferData(r.UNIFORM_BUFFER,I,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,N),N}function _(){for(let A=0;A<f;A++)if(u.indexOf(A)===-1)return u.push(A),A;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(A){const U=o[A.id],N=A.uniforms,I=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let T=0,P=N.length;T<P;T++){const B=N[T];if(Array.isArray(B))for(let W=0,G=B.length;W<G;W++)x(B[W],T,W,I);else x(B,T,0,I)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,U,N,I){if(w(A,U,N,I)===!0){const T=A.__offset,P=A.value;if(Array.isArray(P)){let B=0;for(let W=0;W<P.length;W++){const G=P[W],$=S(G);b(G,A.__data,B),typeof G!="number"&&typeof G!="boolean"&&!G.isMatrix3&&!ArrayBuffer.isView(G)&&(B+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(P,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,T,A.__data)}}function b(A,U,N){typeof A=="number"||typeof A=="boolean"?U[0]=A:A.isMatrix3?(U[0]=A.elements[0],U[1]=A.elements[1],U[2]=A.elements[2],U[3]=0,U[4]=A.elements[3],U[5]=A.elements[4],U[6]=A.elements[5],U[7]=0,U[8]=A.elements[6],U[9]=A.elements[7],U[10]=A.elements[8],U[11]=0):ArrayBuffer.isView(A)?U.set(new A.constructor(A.buffer,A.byteOffset,U.length)):A.toArray(U,N)}function w(A,U,N,I){const T=A.value,P=U+"_"+N;if(I[P]===void 0)return typeof T=="number"||typeof T=="boolean"?I[P]=T:ArrayBuffer.isView(T)?I[P]=T.slice():I[P]=T.clone(),!0;{const B=I[P];if(typeof T=="number"||typeof T=="boolean"){if(B!==T)return I[P]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(B.equals(T)===!1)return B.copy(T),!0}}return!1}function y(A){const U=A.uniforms;let N=0;const I=16;for(let P=0,B=U.length;P<B;P++){const W=Array.isArray(U[P])?U[P]:[U[P]];for(let G=0,$=W.length;G<$;G++){const V=W[G],tt=Array.isArray(V.value)?V.value:[V.value];for(let F=0,X=tt.length;F<X;F++){const q=tt[F],it=S(q),rt=N%I,O=rt%it.boundary,et=rt+O;N+=O,et!==0&&I-et<it.storage&&(N+=I-et),V.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=N,N+=it.storage}}}const T=N%I;return T>0&&(N+=I-T),A.__size=N,A.__cache={},this}function S(A){const U={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(U.boundary=4,U.storage=4):A.isVector2?(U.boundary=8,U.storage=8):A.isVector3||A.isColor?(U.boundary=16,U.storage=12):A.isVector4?(U.boundary=16,U.storage=16):A.isMatrix3?(U.boundary=48,U.storage=48):A.isMatrix4?(U.boundary=64,U.storage=64):A.isTexture?se("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(U.boundary=16,U.storage=A.byteLength):se("WebGLRenderer: Unsupported uniform value type.",A),U}function C(A){const U=A.target;U.removeEventListener("dispose",C);const N=u.indexOf(U.__bindingPointIndex);u.splice(N,1),r.deleteBuffer(o[U.id]),delete o[U.id],delete c[U.id]}function L(){for(const A in o)r.deleteBuffer(o[A]);u=[],o={},c={}}return{bind:p,update:d,dispose:L}}const L2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let $i=null;function N2(){return $i===null&&($i=new Xp(L2,16,16,Ks,Yn),$i.name="DFG_LUT",$i.minFilter=Tn,$i.magFilter=Tn,$i.wrapS=na,$i.wrapT=na,$i.generateMipmaps=!1,$i.needsUpdate=!0),$i}class O2{constructor(t={}){const{canvas:n=ib(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:f=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:d=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:x=Dn}=t;this.isWebGLRenderer=!0;let b;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=a.getContextAttributes().alpha}else b=u;const w=x,y=new Set([Ip,Pp,Op]),S=new Set([Dn,sa,El,Tl,Up,Lp]),C=new Uint32Array(4),L=new Int32Array(4),A=new H;let U=null,N=null;const I=[],T=[];let P=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=aa,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let W=!1,G=null,$=null,V=null,tt=null;this._outputColorSpace=ni;let F=0,X=0,q=null,it=-1,rt=null;const O=new an,et=new an;let j=null;const J=new ee(0);let bt=0,Dt=n.width,at=n.height,pt=1,Tt=null,It=null;const At=new an(0,0,Dt,at),$t=new an(0,0,Dt,at);let Oe=!1;const ne=new Wp;let me=!1,De=!1;const ue=new Se,He=new H,$e=new an,fn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function je(){return q===null?pt:1}let Q=a;function Te(R,Z){return n.getContext(R,Z)}let Ce,z,E,nt,ft,gt,Rt,Lt,vt,_t,Ct,Bt,Ot,Nt,Wt,jt,ae,Y,wt,xt,Ut,Ht,Et;try{const R={alpha:!0,depth:o,stencil:c,antialias:f,premultipliedAlpha:p,preserveDrawingBuffer:d,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Rp}`),n.addEventListener("webglcontextlost",We,!1),n.addEventListener("webglcontextrestored",Ue,!1),n.addEventListener("webglcontextcreationerror",Zn,!1),Q===null){const Z="webgl2";if(Q=Te(Z,R),Q===null)throw Te(Z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Qt()}catch(R){throw n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",Zn,!1),Ne("WebGLRenderer: "+R.message),R}function Qt(){Ce=new NA(Q),Ce.init(),Ut=new E2(Q,Ce),z=new bA(Q,Ce,t,Ut),E=new M2(Q,Ce),z.reversedDepthBuffer&&g&&E.buffers.depth.setReversed(!0),$=Q.createFramebuffer(),V=Q.createFramebuffer(),tt=Q.createFramebuffer(),nt=new IA(Q),ft=new l2,gt=new b2(Q,Ce,E,ft,z,Ut,nt),Rt=new LA(B),Lt=new F1(Q),Ht=new yA(Q,Lt),vt=new OA(Q,Lt,nt,Ht),_t=new FA(Q,vt,Lt,Ht,nt),Y=new zA(Q,z,gt),Wt=new EA(ft),Ct=new o2(B,Rt,Ce,z,Ht,Wt),Bt=new D2(B,ft),Ot=new u2,Nt=new g2(Ce),ae=new SA(B,Rt,E,_t,b,p),jt=new y2(B,_t,z),Et=new U2(Q,nt,z,E),wt=new MA(Q,Ce,nt),xt=new PA(Q,Ce,nt),nt.programs=Ct.programs,B.capabilities=z,B.extensions=Ce,B.properties=ft,B.renderLists=Ot,B.shadowMap=jt,B.state=E,B.info=nt}w!==Dn&&(P=new HA(w,n.width,n.height,f,o,c));const Yt=new R2(B,Q);this.xr=Yt,this.getContext=function(){return Q},this.getContextAttributes=function(){return Q.getContextAttributes()},this.forceContextLoss=function(){const R=Ce.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ce.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return pt},this.setPixelRatio=function(R){R!==void 0&&(pt=R,this.setSize(Dt,at,!1))},this.getSize=function(R){return R.set(Dt,at)},this.setSize=function(R,Z,dt=!0){if(Yt.isPresenting){se("WebGLRenderer: Can't change size while VR device is presenting.");return}Dt=R,at=Z,n.width=Math.floor(R*pt),n.height=Math.floor(Z*pt),dt===!0&&(n.style.width=R+"px",n.style.height=Z+"px"),P!==null&&P.setSize(n.width,n.height),this.setViewport(0,0,R,Z)},this.getDrawingBufferSize=function(R){return R.set(Dt*pt,at*pt).floor()},this.setDrawingBufferSize=function(R,Z,dt){Dt=R,at=Z,pt=dt,n.width=Math.floor(R*dt),n.height=Math.floor(Z*dt),this.setViewport(0,0,R,Z)},this.setEffects=function(R){if(w===Dn){Ne("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let Z=0;Z<R.length;Z++)if(R[Z].isOutputPass===!0){se("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(O)},this.getViewport=function(R){return R.copy(At)},this.setViewport=function(R,Z,dt,ot){R.isVector4?At.set(R.x,R.y,R.z,R.w):At.set(R,Z,dt,ot),E.viewport(O.copy(At).multiplyScalar(pt).round())},this.getScissor=function(R){return R.copy($t)},this.setScissor=function(R,Z,dt,ot){R.isVector4?$t.set(R.x,R.y,R.z,R.w):$t.set(R,Z,dt,ot),E.scissor(et.copy($t).multiplyScalar(pt).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(R){E.setScissorTest(Oe=R)},this.setOpaqueSort=function(R){Tt=R},this.setTransparentSort=function(R){It=R},this.getClearColor=function(R){return R.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(R=!0,Z=!0,dt=!0){let ot=0;if(R){let lt=!1;if(q!==null){const zt=q.texture.format;lt=y.has(zt)}if(lt){const zt=q.texture.type,kt=S.has(zt),Pt=ae.getClearColor(),Gt=ae.getClearAlpha(),Vt=Pt.r,le=Pt.g,ge=Pt.b;kt?(C[0]=Vt,C[1]=le,C[2]=ge,C[3]=Gt,Q.clearBufferuiv(Q.COLOR,0,C)):(L[0]=Vt,L[1]=le,L[2]=ge,L[3]=Gt,Q.clearBufferiv(Q.COLOR,0,L))}else ot|=Q.COLOR_BUFFER_BIT}Z&&(ot|=Q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),dt&&(ot|=Q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ot!==0&&Q.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),G=R},this.dispose=function(){n.removeEventListener("webglcontextlost",We,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",Zn,!1),ae.dispose(),Ot.dispose(),Nt.dispose(),ft.dispose(),Rt.dispose(),_t.dispose(),Ht.dispose(),Et.dispose(),Ct.dispose(),Yt.dispose(),Yt.removeEventListener("sessionstart",pn),Yt.removeEventListener("sessionend",Un),Kn.stop()};function We(R){R.preventDefault(),t_("WebGLRenderer: Context Lost."),W=!0}function Ue(){t_("WebGLRenderer: Context Restored."),W=!1;const R=nt.autoReset,Z=jt.enabled,dt=jt.autoUpdate,ot=jt.needsUpdate,lt=jt.type;Qt(),nt.autoReset=R,jt.enabled=Z,jt.autoUpdate=dt,jt.needsUpdate=ot,jt.type=lt}function Zn(R){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function si(R){const Z=R.target;Z.removeEventListener("dispose",si),fo(Z)}function fo(R){ho(R),ft.remove(R)}function ho(R){const Z=ft.get(R).programs;Z!==void 0&&(Z.forEach(function(dt){Ct.releaseProgram(dt)}),R.isShaderMaterial&&Ct.releaseShaderCache(R))}this.renderBufferDirect=function(R,Z,dt,ot,lt,zt){Z===null&&(Z=fn);const kt=lt.isMesh&&lt.matrixWorld.determinantAffine()<0,Pt=Fa(R,Z,dt,ot,lt);E.setMaterial(ot,kt);let Gt=dt.index,Vt=1;if(ot.wireframe===!0){if(Gt=vt.getWireframeAttribute(dt),Gt===void 0)return;Vt=2}const le=dt.drawRange,ge=dt.attributes.position;let Zt=le.start*Vt,Le=(le.start+le.count)*Vt;zt!==null&&(Zt=Math.max(Zt,zt.start*Vt),Le=Math.min(Le,(zt.start+zt.count)*Vt)),Gt!==null?(Zt=Math.max(Zt,0),Le=Math.min(Le,Gt.count)):ge!=null&&(Zt=Math.max(Zt,0),Le=Math.min(Le,ge.count));const tn=Le-Zt;if(tn<0||tn===1/0)return;Ht.setup(lt,ot,Pt,dt,Gt);let Je,he=wt;if(Gt!==null&&(Je=Lt.get(Gt),he=xt,he.setIndex(Je)),lt.isMesh)ot.wireframe===!0?(E.setLineWidth(ot.wireframeLinewidth*je()),he.setMode(Q.LINES)):he.setMode(Q.TRIANGLES);else if(lt.isLine){let gn=ot.linewidth;gn===void 0&&(gn=1),E.setLineWidth(gn*je()),lt.isLineSegments?he.setMode(Q.LINES):lt.isLineLoop?he.setMode(Q.LINE_LOOP):he.setMode(Q.LINE_STRIP)}else lt.isPoints?he.setMode(Q.POINTS):lt.isSprite&&he.setMode(Q.TRIANGLES);if(lt.isBatchedMesh)if(Ce.get("WEBGL_multi_draw"))he.renderMultiDraw(lt._multiDrawStarts,lt._multiDrawCounts,lt._multiDrawCount);else{const gn=lt._multiDrawStarts,Xt=lt._multiDrawCounts,bn=lt._multiDrawCount,de=Gt?Lt.get(Gt).bytesPerElement:1,Gn=ft.get(ot).currentProgram.getUniforms();for(let ri=0;ri<bn;ri++)Gn.setValue(Q,"_gl_DrawID",ri),he.render(gn[ri]/de,Xt[ri])}else if(lt.isInstancedMesh)he.renderInstances(Zt,tn,lt.count);else if(dt.isInstancedBufferGeometry){const gn=dt._maxInstanceCount!==void 0?dt._maxInstanceCount:1/0,Xt=Math.min(dt.instanceCount,gn);he.renderInstances(Zt,tn,Xt)}else he.render(Zt,tn)};function po(R,Z,dt,ot){G!==null&&R.isNodeMaterial&&G.setObject(ot,R),me===!0&&Wt.setState(R,dt,!1),R.transparent===!0&&R.side===ii&&R.forceSinglePass===!1?(R.side=qn,R.needsUpdate=!0,za(R,Z,ot),R.side=Ys,R.needsUpdate=!0,za(R,Z,ot),R.side=ii):za(R,Z,ot)}this.compile=function(R,Z,dt=null){dt===null&&(dt=R),G!==null&&G.renderStart(R,Z,dt),N=Nt.get(dt),N.init(Z),T.push(N),dt.traverseVisible(function(lt){lt.isLight&&lt.layers.test(Z.layers)&&(N.pushLight(lt),lt.castShadow&&N.pushShadow(lt))}),R!==dt&&R.traverseVisible(function(lt){lt.isLight&&lt.layers.test(Z.layers)&&(N.pushLight(lt),lt.castShadow&&N.pushShadow(lt))}),N.setupLights(),G!==null&&G.updateLights(N.state.lightsArray),De=this.localClippingEnabled,me=Wt.init(this.clippingPlanes,De),me===!0&&Wt.setGlobalState(this.clippingPlanes,Z),G!==null&&jt.render(N.state.shadowsArray,dt,Z);const ot=new Set;return R.traverse(function(lt){if(!(lt.isMesh||lt.isPoints||lt.isLine||lt.isSprite))return;const zt=lt.material;if(zt)if(Array.isArray(zt))for(let kt=0;kt<zt.length;kt++){const Pt=zt[kt];po(Pt,dt,Z,lt),ot.add(Pt)}else po(zt,dt,Z,lt),ot.add(zt)}),N=T.pop(),G!==null&&G.renderEnd(),ot},this.compileAsync=function(R,Z,dt=null){const ot=this.compile(R,Z,dt);return new Promise(lt=>{function zt(){if(ot.forEach(function(kt){const Gt=ft.get(kt).currentProgram;(Gt===void 0||Gt.isReady())&&ot.delete(kt)}),ot.size===0){lt(R);return}setTimeout(zt,10)}Ce.get("KHR_parallel_shader_compile")!==null?zt():setTimeout(zt,10)})};let tr=null;function qi(R){tr&&tr(R)}function pn(){Kn.stop()}function Un(){Kn.start()}const Kn=new $x;Kn.setAnimationLoop(qi),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(R){tr=R,Yt.setAnimationLoop(R),R===null?Kn.stop():Kn.start()},Yt.addEventListener("sessionstart",pn),Yt.addEventListener("sessionend",Un),this.render=function(R,Z){if(Z!==void 0&&Z.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;G!==null&&G.renderStart(R,Z);const dt=Yt.enabled===!0&&Yt.isPresenting===!0,ot=P!==null&&(q===null||dt)&&P.begin(B,q);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),Yt.enabled===!0&&Yt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Yt.cameraAutoUpdate===!0&&Yt.updateCamera(Z),Z=Yt.getCamera()),R.isScene===!0&&R.onBeforeRender(B,R,Z,q),N=Nt.get(R,T.length),N.init(Z),N.state.textureUnits=gt.getTextureUnits(),T.push(N),ue.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),ne.setFromProjectionMatrix(ue,ia,Z.reversedDepth),De=this.localClippingEnabled,me=Wt.init(this.clippingPlanes,De),U=Ot.get(R,I.length),U.init(),I.push(U),Yt.enabled===!0&&Yt.isPresenting===!0){const kt=B.xr.getDepthSensingMesh();kt!==null&&Ss(kt,Z,-1/0,B.sortObjects)}Ss(R,Z,0,B.sortObjects),U.finish(),G!==null&&G.updateLights(N.state.lightsArray),B.sortObjects===!0&&U.sort(Tt,It),Re=Yt.enabled===!1||Yt.isPresenting===!1||Yt.hasDepthSensing()===!1,Re&&ae.addToRenderList(U,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),me===!0&&Wt.beginShadows();const lt=N.state.shadowsArray;if(jt.render(lt,R,Z),me===!0&&Wt.endShadows(),(ot&&P.hasRenderPass())===!1){const kt=U.opaque,Pt=U.transmissive;if(N.setupLights(),Z.isArrayCamera){const Gt=Z.cameras;if(Pt.length>0)for(let Vt=0,le=Gt.length;Vt<le;Vt++){const ge=Gt[Vt];Pl(kt,Pt,R,ge)}Re&&ae.render(R);for(let Vt=0,le=Gt.length;Vt<le;Vt++){const ge=Gt[Vt];Ol(U,R,ge,ge.viewport)}}else Pt.length>0&&Pl(kt,Pt,R,Z),Re&&ae.render(R),Ol(U,R,Z)}q!==null&&X===0&&(gt.updateMultisampleRenderTarget(q),gt.updateRenderTargetMipmap(q)),ot&&P.end(B),R.isScene===!0&&R.onAfterRender(B,R,Z),Ht.resetDefaultState(),it=-1,rt=null,T.pop(),T.length>0?(N=T[T.length-1],gt.setTextureUnits(N.state.textureUnits),me===!0&&Wt.setGlobalState(B.clippingPlanes,N.state.camera)):N=null,I.pop(),I.length>0?U=I[I.length-1]:U=null,G!==null&&G.renderEnd()};function Ss(R,Z,dt,ot){if(R.visible===!1)return;if(R.layers.test(Z.layers)){if(R.isGroup)dt=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Z);else if(R.isLightProbeGrid)N.pushLightProbeGrid(R);else if(R.isLight)N.pushLight(R),R.castShadow&&N.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(ne)){ot&&$e.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ue);const kt=_t.update(R),Pt=R.material;Pt.visible&&U.push(R,kt,Pt,dt,$e.z,null,Z)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(ne))){const kt=_t.update(R),Pt=R.material;if(ot&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),$e.copy(R.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),$e.copy(kt.boundingSphere.center)),$e.applyMatrix4(R.matrixWorld).applyMatrix4(ue)),Array.isArray(Pt)){const Gt=kt.groups;for(let Vt=0,le=Gt.length;Vt<le;Vt++){const ge=Gt[Vt],Zt=Pt[ge.materialIndex];Zt&&Zt.visible&&U.push(R,kt,Zt,dt,$e.z,ge,Z)}}else Pt.visible&&U.push(R,kt,Pt,dt,$e.z,null,Z)}}const zt=R.children;for(let kt=0,Pt=zt.length;kt<Pt;kt++)Ss(zt[kt],Z,dt,ot)}function Ol(R,Z,dt,ot){const{opaque:lt,transmissive:zt,transparent:kt}=R;N.setupLightsView(dt),me===!0&&Wt.setGlobalState(B.clippingPlanes,dt),ot&&E.viewport(O.copy(ot)),lt.length>0&&ys(lt,Z,dt),zt.length>0&&ys(zt,Z,dt),kt.length>0&&ys(kt,Z,dt),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function Pl(R,Z,dt,ot){if((dt.isScene===!0?dt.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[ot.id]===void 0){const Zt=Ce.has("EXT_color_buffer_half_float")||Ce.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[ot.id]=new _i(1,1,{generateMipmaps:!0,type:Zt?Yn:Dn,minFilter:Xs,samples:Math.max(4,z.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:we.workingColorSpace})}const zt=N.state.transmissionRenderTarget[ot.id],kt=ot.viewport||O;zt.setSize(kt.z*B.transmissionResolutionScale,kt.w*B.transmissionResolutionScale);const Pt=B.getRenderTarget(),Gt=B.getActiveCubeFace(),Vt=B.getActiveMipmapLevel();B.setRenderTarget(zt),B.getClearColor(J),bt=B.getClearAlpha(),bt<1&&B.setClearColor(16777215,.5),B.clear(),Re&&ae.render(dt);const le=B.toneMapping;B.toneMapping=aa;const ge=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),N.setupLightsView(ot),me===!0&&Wt.setGlobalState(B.clippingPlanes,ot),ys(R,dt,ot),gt.updateMultisampleRenderTarget(zt),gt.updateRenderTargetMipmap(zt),Ce.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let Le=0,tn=Z.length;Le<tn;Le++){const Je=Z[Le],{object:he,geometry:gn,material:Xt,group:bn}=Je;if(Xt.side===ii&&he.layers.test(ot.layers)){const de=Xt.side;Xt.side=qn,Xt.needsUpdate=!0,Ia(he,dt,ot,gn,Xt,bn),Xt.side=de,Xt.needsUpdate=!0,Zt=!0}}Zt===!0&&(gt.updateMultisampleRenderTarget(zt),gt.updateRenderTargetMipmap(zt))}B.setRenderTarget(Pt,Gt,Vt),B.setClearColor(J,bt),ge!==void 0&&(ot.viewport=ge),B.toneMapping=le}function ys(R,Z,dt){const ot=Z.isScene===!0?Z.overrideMaterial:null;for(let lt=0,zt=R.length;lt<zt;lt++){const kt=R[lt],{object:Pt,geometry:Gt,group:Vt}=kt;let le=kt.material;le.allowOverride===!0&&ot!==null&&(le=ot),Pt.layers.test(dt.layers)&&Ia(Pt,Z,dt,Gt,le,Vt)}}function Ia(R,Z,dt,ot,lt,zt){G!==null&&lt.isNodeMaterial&&G.setObject(R,lt),R.onBeforeRender(B,Z,dt,ot,lt,zt),R.modelViewMatrix.multiplyMatrices(dt.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),lt.onBeforeRender(B,Z,dt,ot,R,zt),lt.transparent===!0&&lt.side===ii&&lt.forceSinglePass===!1?(lt.side=qn,lt.needsUpdate=!0,B.renderBufferDirect(dt,Z,ot,lt,R,zt),lt.side=Ys,lt.needsUpdate=!0,B.renderBufferDirect(dt,Z,ot,lt,R,zt),lt.side=ii):B.renderBufferDirect(dt,Z,ot,lt,R,zt),R.onAfterRender(B,Z,dt,ot,lt,zt)}function za(R,Z,dt){Z.isScene!==!0&&(Z=fn);const ot=ft.get(R),lt=N.state.lights,zt=N.state.shadowsArray,kt=lt.state.version,Pt=Ct.getParameters(R,lt.state,zt,Z,dt,N.state.lightProbeGridArray),Gt=Ct.getProgramCacheKey(Pt);let Vt=ot.programs;ot.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?Z.environment:null,ot.fog=Z.fog;const le=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ot.envMap=Rt.get(R.envMap||ot.environment,le),ot.envMapRotation=ot.environment!==null&&R.envMap===null?Z.environmentRotation:R.envMapRotation,Vt===void 0&&(R.addEventListener("dispose",si),Vt=new Map,ot.programs=Vt);let ge=Vt.get(Gt);if(ge!==void 0){if(ot.currentProgram===ge&&ot.lightsStateVersion===kt)return la(R,Pt),ge}else Pt.uniforms=Ct.getUniforms(R),G!==null&&R.isNodeMaterial&&G.build(R,dt,Pt),R.onBeforeCompile(Pt,B),ge=Ct.acquireProgram(Pt,Gt),Vt.set(Gt,ge),ot.uniforms=Pt.uniforms;const Zt=ot.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Zt.clippingPlanes=Wt.uniform),la(R,Pt),ot.needsLights=Il(R),ot.lightsStateVersion=kt,ot.needsLights&&(Zt.ambientLightColor.value=lt.state.ambient,Zt.lightProbe.value=lt.state.probe,Zt.sunLights.value=lt.state.sun,Zt.sunLightShadows.value=lt.state.sunShadow,Zt.directionalLights.value=lt.state.directional,Zt.directionalLightShadows.value=lt.state.directionalShadow,Zt.spotLights.value=lt.state.spot,Zt.spotLightShadows.value=lt.state.spotShadow,Zt.rectAreaLights.value=lt.state.rectArea,Zt.ltc_1.value=lt.state.rectAreaLTC1,Zt.ltc_2.value=lt.state.rectAreaLTC2,Zt.pointLights.value=lt.state.point,Zt.pointLightShadows.value=lt.state.pointShadow,Zt.hemisphereLights.value=lt.state.hemi,Zt.sunShadowMatrix.value=lt.state.sunShadowMatrix,Zt.sunShadowCascade.value=lt.state.sunShadowCascade,Zt.directionalShadowMatrix.value=lt.state.directionalShadowMatrix,Zt.spotLightMatrix.value=lt.state.spotLightMatrix,Zt.spotLightMap.value=lt.state.spotLightMap,Zt.pointShadowMatrix.value=lt.state.pointShadowMatrix),ot.lightProbeGrid=N.state.lightProbeGridArray.length>0,ot.currentProgram=ge,ot.uniformsList=null,ge}function oa(R){if(R.uniformsList===null){const Z=R.currentProgram.getUniforms();R.uniformsList=bu.seqWithValue(Z.seq,R.uniforms)}return R.uniformsList}function la(R,Z){const dt=ft.get(R);dt.outputColorSpace=Z.outputColorSpace,dt.batching=Z.batching,dt.batchingColor=Z.batchingColor,dt.instancing=Z.instancing,dt.instancingColor=Z.instancingColor,dt.instancingMorph=Z.instancingMorph,dt.skinning=Z.skinning,dt.morphTargets=Z.morphTargets,dt.morphNormals=Z.morphNormals,dt.morphColors=Z.morphColors,dt.morphTargetsCount=Z.morphTargetsCount,dt.numClippingPlanes=Z.numClippingPlanes,dt.numIntersection=Z.numClipIntersection,dt.vertexAlphas=Z.vertexAlphas,dt.vertexTangents=Z.vertexTangents,dt.toneMapping=Z.toneMapping}function Ms(R,Z){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;A.setFromMatrixPosition(Z.matrixWorld);for(let dt=0,ot=R.length;dt<ot;dt++){const lt=R[dt];if(lt.texture!==null&&lt.boundingBox.containsPoint(A))return lt}return null}function Fa(R,Z,dt,ot,lt){Z.isScene!==!0&&(Z=fn),gt.resetTextureUnits();const zt=Z.fog,kt=ot.isMeshStandardMaterial||ot.isMeshLambertMaterial||ot.isMeshPhongMaterial?Z.environment:null,Pt=q===null?B.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:we.workingColorSpace,Gt=ot.isMeshStandardMaterial||ot.isMeshLambertMaterial&&!ot.envMap||ot.isMeshPhongMaterial&&!ot.envMap,Vt=Rt.get(ot.envMap||kt,Gt),le=ot.vertexColors===!0&&!!dt.attributes.color&&dt.attributes.color.itemSize===4,ge=!!dt.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),Zt=!!dt.morphAttributes.position,Le=!!dt.morphAttributes.normal,tn=!!dt.morphAttributes.color;let Je=aa;ot.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Je=B.toneMapping);const he=dt.morphAttributes.position||dt.morphAttributes.normal||dt.morphAttributes.color,gn=he!==void 0?he.length:0,Xt=ft.get(ot),bn=N.state.lights;if(me===!0&&(De===!0||R!==rt)){const qe=R===rt&&ot.id===it;Wt.setState(ot,R,qe)}let de=!1;ot.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==bn.state.version||Xt.outputColorSpace!==Pt||lt.isBatchedMesh&&Xt.batching===!1||!lt.isBatchedMesh&&Xt.batching===!0||lt.isBatchedMesh&&Xt.batchingColor===!0&&lt._colorsTexture===null||lt.isBatchedMesh&&Xt.batchingColor===!1&&lt._colorsTexture!==null||lt.isInstancedMesh&&Xt.instancing===!1||!lt.isInstancedMesh&&Xt.instancing===!0||lt.isSkinnedMesh&&Xt.skinning===!1||!lt.isSkinnedMesh&&Xt.skinning===!0||lt.isInstancedMesh&&Xt.instancingColor===!0&&lt.instanceColor===null||lt.isInstancedMesh&&Xt.instancingColor===!1&&lt.instanceColor!==null||lt.isInstancedMesh&&Xt.instancingMorph===!0&&lt.morphTexture===null||lt.isInstancedMesh&&Xt.instancingMorph===!1&&lt.morphTexture!==null||Xt.envMap!==Vt||ot.fog===!0&&Xt.fog!==zt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==Wt.numPlanes||Xt.numIntersection!==Wt.numIntersection)||Xt.vertexAlphas!==le||Xt.vertexTangents!==ge||Xt.morphTargets!==Zt||Xt.morphNormals!==Le||Xt.morphColors!==tn||Xt.toneMapping!==Je||Xt.morphTargetsCount!==gn||!!Xt.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(de=!0):(de=!0,Xt.__version=ot.version);let Gn=Xt.currentProgram;de===!0&&(Gn=za(ot,Z,lt),G&&ot.isNodeMaterial&&G.onUpdateProgram(ot,Gn,Xt));let ri=!1,Vn=!1,Ba=!1;const Fe=Gn.getUniforms(),sn=Xt.uniforms;if(E.useProgram(Gn.program)&&(ri=!0,Vn=!0,Ba=!0),ot.id!==it&&(it=ot.id,Vn=!0),Xt.needsLights){const qe=Ms(N.state.lightProbeGridArray,lt);Xt.lightProbeGrid!==qe&&(Xt.lightProbeGrid=qe,Vn=!0)}if(ri||rt!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Fe.setValue(Q,"projectionMatrix",R.projectionMatrix),Fe.setValue(Q,"viewMatrix",R.matrixWorldInverse);const Yi=Fe.map.cameraPosition;Yi!==void 0&&Yi.setValue(Q,He.setFromMatrixPosition(R.matrixWorld)),z.logarithmicDepthBuffer&&Fe.setValue(Q,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Fe.setValue(Q,"isOrthographic",R.isOrthographicCamera===!0),rt!==R&&(rt=R,Vn=!0,Ba=!0)}if(Xt.needsLights&&(bn.state.sunShadowMap.length>0&&Fe.setValue(Q,"sunShadowMap",bn.state.sunShadowMap,gt),bn.state.directionalShadowMap.length>0&&Fe.setValue(Q,"directionalShadowMap",bn.state.directionalShadowMap,gt),bn.state.spotShadowMap.length>0&&Fe.setValue(Q,"spotShadowMap",bn.state.spotShadowMap,gt),bn.state.pointShadowMap.length>0&&Fe.setValue(Q,"pointShadowMap",bn.state.pointShadowMap,gt)),lt.isSkinnedMesh){Fe.setOptional(Q,lt,"bindMatrix"),Fe.setOptional(Q,lt,"bindMatrixInverse");const qe=lt.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),Fe.setValue(Q,"boneTexture",qe.boneTexture,gt))}lt.isBatchedMesh&&(Fe.setOptional(Q,lt,"batchingTexture"),Fe.setValue(Q,"batchingTexture",lt._matricesTexture,gt),Fe.setOptional(Q,lt,"batchingIdTexture"),Fe.setValue(Q,"batchingIdTexture",lt._indirectTexture,gt),Fe.setOptional(Q,lt,"batchingColorTexture"),lt._colorsTexture!==null&&Fe.setValue(Q,"batchingColorTexture",lt._colorsTexture,gt));const xi=dt.morphAttributes;if((xi.position!==void 0||xi.normal!==void 0||xi.color!==void 0)&&Y.update(lt,dt,Gn),(Vn||Xt.receiveShadow!==lt.receiveShadow)&&(Xt.receiveShadow=lt.receiveShadow,Fe.setValue(Q,"receiveShadow",lt.receiveShadow)),(ot.isMeshStandardMaterial||ot.isMeshLambertMaterial||ot.isMeshPhongMaterial)&&ot.envMap===null&&Z.environment!==null&&(sn.envMapIntensity.value=Z.environmentIntensity),sn.dfgLUT!==void 0&&(sn.dfgLUT.value=N2()),Vn){if(Fe.setValue(Q,"toneMappingExposure",B.toneMappingExposure),Xt.needsLights&&mn(sn,Ba),zt&&ot.fog===!0&&Bt.refreshFogUniforms(sn,zt),Bt.refreshMaterialUniforms(sn,ot,pt,at,N.state.transmissionRenderTarget[R.id]),Xt.needsLights&&Xt.lightProbeGrid){const qe=Xt.lightProbeGrid;sn.probesSH.value=qe.texture,sn.probesMin.value.copy(qe.boundingBox.min),sn.probesMax.value.copy(qe.boundingBox.max),sn.probesResolution.value.copy(qe.resolution)}bu.upload(Q,oa(Xt),sn,gt)}if(ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(bu.upload(Q,oa(Xt),sn,gt),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Fe.setValue(Q,"center",lt.center),Fe.setValue(Q,"modelViewMatrix",lt.modelViewMatrix),Fe.setValue(Q,"normalMatrix",lt.normalMatrix),Fe.setValue(Q,"modelMatrix",lt.matrixWorld),ot.uniformsGroups!==void 0){const qe=ot.uniformsGroups;for(let Yi=0,Ni=qe.length;Yi<Ni;Yi++){const Si=qe[Yi];Et.update(Si,Gn),Et.bind(Si,Gn)}}return Gn}function mn(R,Z){R.ambientLightColor.needsUpdate=Z,R.lightProbe.needsUpdate=Z,R.sunLights.needsUpdate=Z,R.sunLightShadows.needsUpdate=Z,R.directionalLights.needsUpdate=Z,R.directionalLightShadows.needsUpdate=Z,R.pointLights.needsUpdate=Z,R.pointLightShadows.needsUpdate=Z,R.spotLights.needsUpdate=Z,R.spotLightShadows.needsUpdate=Z,R.rectAreaLights.needsUpdate=Z,R.hemisphereLights.needsUpdate=Z}function Il(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(R,Z,dt){const ot=ft.get(R);ot.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ot.__autoAllocateDepthBuffer===!1&&(ot.__useRenderToTexture=!1),ft.get(R.texture).__webglTexture=Z,ft.get(R.depthTexture).__webglTexture=ot.__autoAllocateDepthBuffer?void 0:dt,ot.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,Z){const dt=ft.get(R);dt.__webglFramebuffer=Z,dt.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(R,Z=0,dt=0){q=R,F=Z,X=dt;let ot=null,lt=!1,zt=!1;if(R){const Pt=ft.get(R);if(Pt.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(Q.FRAMEBUFFER,Pt.__webglFramebuffer),O.copy(R.viewport),et.copy(R.scissor),j=R.scissorTest,E.viewport(O),E.scissor(et),E.setScissorTest(j),it=-1;return}else if(Pt.__webglFramebuffer===void 0)gt.setupRenderTarget(R);else if(Pt.__hasExternalTextures)gt.rebindTextures(R,ft.get(R.texture).__webglTexture,ft.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const le=R.depthTexture;if(Pt.__boundDepthTexture!==le){if(le!==null&&ft.has(le)&&(R.width!==le.image.width||R.height!==le.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(R)}}const Gt=R.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(zt=!0);const Vt=ft.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Vt[Z])?ot=Vt[Z][dt]:ot=Vt[Z],lt=!0):R.samples>0&&gt.useMultisampledRTT(R)===!1?ot=ft.get(R).__webglMultisampledFramebuffer:Array.isArray(Vt)?ot=Vt[dt]:ot=Vt,O.copy(R.viewport),et.copy(R.scissor),j=R.scissorTest}else O.copy(At).multiplyScalar(pt).floor(),et.copy($t).multiplyScalar(pt).floor(),j=Oe;if(dt!==0&&(ot=$),E.bindFramebuffer(Q.FRAMEBUFFER,ot)&&E.drawBuffers(R,ot),E.viewport(O),E.scissor(et),E.setScissorTest(j),lt){const Pt=ft.get(R.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt.__webglTexture,dt)}else if(zt){const Pt=Z;for(let Gt=0;Gt<R.textures.length;Gt++){const Vt=ft.get(R.textures[Gt]);Q.framebufferTextureLayer(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0+Gt,Vt.__webglTexture,dt,Pt)}}else if(R!==null&&dt!==0){const Pt=ft.get(R.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,Pt.__webglTexture,dt)}it=-1};function mo(R){const Z=ft.get(R);return(Z.__readFormat!==R.format||Z.__readType!==R.type)&&(Z.__readFormat=R.format,Z.__readType=R.type,Z.__formatReadable=z.textureFormatReadable(R.format),Z.__typeReadable=z.textureTypeReadable(R.type)),Z}this.readRenderTargetPixels=function(R,Z,dt,ot,lt,zt,kt,Pt=0){if(!(R&&R.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=ft.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&kt!==void 0&&(Gt=Gt[kt]),Gt){E.bindFramebuffer(Q.FRAMEBUFFER,Gt);try{const Vt=R.textures[Pt],le=Vt.format,ge=Vt.type;R.textures.length>1&&Q.readBuffer(Q.COLOR_ATTACHMENT0+Pt);const Zt=mo(Vt);if(Zt.__formatReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Zt.__typeReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=R.width-ot&&dt>=0&&dt<=R.height-lt&&Q.readPixels(Z,dt,ot,lt,Ut.convert(le),Ut.convert(ge),zt)}finally{const Vt=q!==null?ft.get(q).__webglFramebuffer:null;E.bindFramebuffer(Q.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(R,Z,dt,ot,lt,zt,kt,Pt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Gt=ft.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&kt!==void 0&&(Gt=Gt[kt]),Gt)if(Z>=0&&Z<=R.width-ot&&dt>=0&&dt<=R.height-lt){E.bindFramebuffer(Q.FRAMEBUFFER,Gt);const Vt=R.textures[Pt],le=Vt.format,ge=Vt.type;R.textures.length>1&&Q.readBuffer(Q.COLOR_ATTACHMENT0+Pt);const Zt=mo(Vt);if(Zt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Zt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=Q.createBuffer();Q.bindBuffer(Q.PIXEL_PACK_BUFFER,Le),Q.bufferData(Q.PIXEL_PACK_BUFFER,zt.byteLength,Q.STREAM_READ),Q.readPixels(Z,dt,ot,lt,Ut.convert(le),Ut.convert(ge),0),Q.bindBuffer(Q.PIXEL_PACK_BUFFER,null);const tn=q!==null?ft.get(q).__webglFramebuffer:null;E.bindFramebuffer(Q.FRAMEBUFFER,tn);const Je=Q.fenceSync(Q.SYNC_GPU_COMMANDS_COMPLETE,0);return Q.flush(),await ab(Q,Je,4),Q.bindBuffer(Q.PIXEL_PACK_BUFFER,Le),Q.getBufferSubData(Q.PIXEL_PACK_BUFFER,0,zt),Q.bindBuffer(Q.PIXEL_PACK_BUFFER,null),Q.deleteBuffer(Le),Q.deleteSync(Je),zt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,Z=null,dt=0){const ot=Math.pow(2,-dt),lt=Math.floor(R.image.width*ot),zt=Math.floor(R.image.height*ot),kt=Z!==null?Z.x:0,Pt=Z!==null?Z.y:0;gt.setTexture2D(R,0),Q.copyTexSubImage2D(Q.TEXTURE_2D,dt,0,0,kt,Pt,lt,zt),E.unbindTexture()},this.copyTextureToTexture=function(R,Z,dt=null,ot=null,lt=0,zt=0){let kt,Pt,Gt,Vt,le,ge,Zt,Le,tn;const Je=R.isCompressedTexture?R.mipmaps[zt]:R.image;if(dt!==null)kt=dt.max.x-dt.min.x,Pt=dt.max.y-dt.min.y,Gt=dt.isBox3?dt.max.z-dt.min.z:1,Vt=dt.min.x,le=dt.min.y,ge=dt.isBox3?dt.min.z:0;else{const sn=Math.pow(2,-lt);kt=Math.floor(Je.width*sn),Pt=Math.floor(Je.height*sn),R.isDataArrayTexture?Gt=Je.depth:R.isData3DTexture?Gt=Math.floor(Je.depth*sn):Gt=1,Vt=0,le=0,ge=0}ot!==null?(Zt=ot.x,Le=ot.y,tn=ot.z):(Zt=0,Le=0,tn=0);const he=Ut.convert(Z.format),gn=Ut.convert(Z.type);let Xt;Z.isData3DTexture?(gt.setTexture3D(Z,0),Xt=Q.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(gt.setTexture2DArray(Z,0),Xt=Q.TEXTURE_2D_ARRAY):(gt.setTexture2D(Z,0),Xt=Q.TEXTURE_2D),E.activeTexture(Q.TEXTURE0),E.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,Z.flipY),E.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),E.pixelStorei(Q.UNPACK_ALIGNMENT,Z.unpackAlignment);const bn=E.getParameter(Q.UNPACK_ROW_LENGTH),de=E.getParameter(Q.UNPACK_IMAGE_HEIGHT),Gn=E.getParameter(Q.UNPACK_SKIP_PIXELS),ri=E.getParameter(Q.UNPACK_SKIP_ROWS),Vn=E.getParameter(Q.UNPACK_SKIP_IMAGES);E.pixelStorei(Q.UNPACK_ROW_LENGTH,Je.width),E.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Je.height),E.pixelStorei(Q.UNPACK_SKIP_PIXELS,Vt),E.pixelStorei(Q.UNPACK_SKIP_ROWS,le),E.pixelStorei(Q.UNPACK_SKIP_IMAGES,ge);const Ba=R.isDataArrayTexture||R.isData3DTexture,Fe=Z.isDataArrayTexture||Z.isData3DTexture;if(R.isDepthTexture){const sn=ft.get(R),xi=ft.get(Z),qe=ft.get(sn.__renderTarget),Yi=ft.get(xi.__renderTarget);E.bindFramebuffer(Q.READ_FRAMEBUFFER,qe.__webglFramebuffer),E.bindFramebuffer(Q.DRAW_FRAMEBUFFER,Yi.__webglFramebuffer);for(let Ni=0;Ni<Gt;Ni++)Ba&&(Q.framebufferTextureLayer(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,ft.get(R).__webglTexture,lt,ge+Ni),Q.framebufferTextureLayer(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,ft.get(Z).__webglTexture,zt,tn+Ni)),Q.blitFramebuffer(Vt,le,kt,Pt,Zt,Le,kt,Pt,Q.DEPTH_BUFFER_BIT,Q.NEAREST);E.bindFramebuffer(Q.READ_FRAMEBUFFER,null),E.bindFramebuffer(Q.DRAW_FRAMEBUFFER,null)}else if(lt!==0||R.isRenderTargetTexture||ft.has(R)){const sn=ft.get(R),xi=ft.get(Z);E.bindFramebuffer(Q.READ_FRAMEBUFFER,V),E.bindFramebuffer(Q.DRAW_FRAMEBUFFER,tt);for(let qe=0;qe<Gt;qe++)Ba?Q.framebufferTextureLayer(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,sn.__webglTexture,lt,ge+qe):Q.framebufferTexture2D(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,sn.__webglTexture,lt),Fe?Q.framebufferTextureLayer(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,xi.__webglTexture,zt,tn+qe):Q.framebufferTexture2D(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,xi.__webglTexture,zt),lt!==0?Q.blitFramebuffer(Vt,le,kt,Pt,Zt,Le,kt,Pt,Q.COLOR_BUFFER_BIT,Q.NEAREST):Fe?Q.copyTexSubImage3D(Xt,zt,Zt,Le,tn+qe,Vt,le,kt,Pt):Q.copyTexSubImage2D(Xt,zt,Zt,Le,Vt,le,kt,Pt);E.bindFramebuffer(Q.READ_FRAMEBUFFER,null),E.bindFramebuffer(Q.DRAW_FRAMEBUFFER,null)}else Fe?R.isDataTexture||R.isData3DTexture?Q.texSubImage3D(Xt,zt,Zt,Le,tn,kt,Pt,Gt,he,gn,Je.data):Z.isCompressedArrayTexture?Q.compressedTexSubImage3D(Xt,zt,Zt,Le,tn,kt,Pt,Gt,he,Je.data):Q.texSubImage3D(Xt,zt,Zt,Le,tn,kt,Pt,Gt,he,gn,Je):R.isDataTexture?Q.texSubImage2D(Q.TEXTURE_2D,zt,Zt,Le,kt,Pt,he,gn,Je.data):R.isCompressedTexture?Q.compressedTexSubImage2D(Q.TEXTURE_2D,zt,Zt,Le,Je.width,Je.height,he,Je.data):Q.texSubImage2D(Q.TEXTURE_2D,zt,Zt,Le,kt,Pt,he,gn,Je);E.pixelStorei(Q.UNPACK_ROW_LENGTH,bn),E.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,de),E.pixelStorei(Q.UNPACK_SKIP_PIXELS,Gn),E.pixelStorei(Q.UNPACK_SKIP_ROWS,ri),E.pixelStorei(Q.UNPACK_SKIP_IMAGES,Vn),zt===0&&Z.generateMipmaps&&Q.generateMipmap(Xt),E.unbindTexture()},this.initRenderTarget=function(R){ft.get(R).__webglFramebuffer===void 0&&gt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?gt.setTextureCube(R,0):R.isData3DTexture?gt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?gt.setTexture2DArray(R,0):gt.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){F=0,X=0,q=null,E.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ia}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=we._getDrawingBufferColorSpace(t),n.unpackColorSpace=we._getUnpackColorSpace()}}class Bu extends Ge{constructor(t,n={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,o=n.color!==void 0?new ee(n.color):new ee(8355711),c=n.textureWidth||512,u=n.textureHeight||512,f=n.clipBias||0,p=n.shader||Bu.ReflectorShader,d=n.multisample!==void 0?n.multisample:4,v=new Da,_=new H,g=new H,x=new H,b=new Se,w=new H(0,0,-1),y=new an,S=new H,C=new H,L=new an,A=new Se,U=new _i(c,u,{samples:d,type:Yn}),N=new ai({name:p.name!==void 0?p.name:"unspecified",uniforms:Qx.clone(p.uniforms),fragmentShader:p.fragmentShader,vertexShader:p.vertexShader});N.uniforms.tDiffuse.value=U.texture,N.uniforms.color.value=o,N.uniforms.textureMatrix.value=A,this.material=N,this.onBeforeRender=function(I,T,P){const B=this.getReflectionCamera(P);if(g.setFromMatrixPosition(a.matrixWorld),x.setFromMatrixPosition(P.matrixWorld),b.extractRotation(a.matrixWorld),_.set(0,0,1),_.applyMatrix4(b),S.subVectors(g,x),S.dot(_)>0===!0&&this.forceUpdate===!1)return;S.reflect(_).negate(),S.add(g),b.extractRotation(P.matrixWorld),w.set(0,0,-1),w.applyMatrix4(b),w.add(x),C.subVectors(g,w),C.reflect(_).negate(),C.add(g),B.position.copy(S),B.up.set(0,1,0),B.up.applyMatrix4(b),B.up.reflect(_),B.lookAt(C),B.far=P.far,B.updateMatrixWorld(),B.projectionMatrix.copy(P.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(B.projectionMatrix),A.multiply(B.matrixWorldInverse),A.multiply(a.matrixWorld),v.setFromNormalAndCoplanarPoint(_,g),v.applyMatrix4(B.matrixWorldInverse),y.set(v.normal.x,v.normal.y,v.normal.z,v.constant);const G=B.projectionMatrix;B.isOrthographicCamera?(L.x=(Math.sign(y.x)+G.elements[8])/G.elements[0],L.y=(Math.sign(y.y)+G.elements[9])/G.elements[5],L.z=-P.far,L.w=1):(L.x=(Math.sign(y.x)+G.elements[8])/G.elements[0],L.y=(Math.sign(y.y)+G.elements[9])/G.elements[5],L.z=-1,L.w=(1+G.elements[10])/G.elements[14]),y.multiplyScalar(2/y.dot(L)),G.elements[2]=y.x,G.elements[6]=y.y,B.isOrthographicCamera?(G.elements[10]=y.z-f,G.elements[14]=y.w-1):(G.elements[10]=y.z+1-f,G.elements[14]=y.w),a.visible=!1;const $=I.getRenderTarget(),V=I.xr.enabled,tt=I.shadowMap.autoUpdate;I.xr.enabled=!1,I.shadowMap.autoUpdate=!1,I.setRenderTarget(U),I.state.buffers.depth.setMask(!0),I.autoClear===!1&&I.clear(),I.render(T,B),I.xr.enabled=V,I.shadowMap.autoUpdate=tt,I.setRenderTarget($);const F=P.viewport;F!==void 0&&I.state.viewport(F),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return U},this.dispose=function(){U.dispose(),a.material.dispose()},this.getReflectionCamera=function(I){let T=this._reflectionCameras.get(I);return T===void 0&&(T=I.clone(),this._reflectionCameras.set(I,T)),T}}}Bu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function Eu(r,t=!1){const n=r[0].index!==null,a=new Set(Object.keys(r[0].attributes)),o=new Set(Object.keys(r[0].morphAttributes)),c={},u={},f=r[0].morphTargetsRelative,p=new un;let d=0;for(let v=0;v<r.length;++v){const _=r[v];let g=0;if(n!==(_.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in _.attributes){if(!a.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;c[x]===void 0&&(c[x]=[]),c[x].push(_.attributes[x]),g++}if(g!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". Make sure all geometries have the same number of attributes."),null;if(f!==_.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in _.morphAttributes){if(!o.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+".  .morphAttributes must be consistent throughout all geometries."),null;u[x]===void 0&&(u[x]=[]),u[x].push(_.morphAttributes[x])}if(t){let x;if(n)x=_.index.count;else if(_.attributes.position!==void 0)x=_.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+v+". The geometry must have either an index or a position attribute"),null;p.addGroup(d,x,v),d+=x}}if(n){let v=0;const _=[];for(let g=0;g<r.length;++g){const x=r[g].index;for(let b=0;b<x.count;++b)_.push(x.getX(b)+v);v+=r[g].attributes.position.count}p.setIndex(_)}for(const v in c){const _=ox(c[v]);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+v+" attribute."),null;p.setAttribute(v,_)}for(const v in u){const _=u[v][0].length;if(_!==0){p.morphAttributes=p.morphAttributes||{},p.morphAttributes[v]=[];for(let g=0;g<_;++g){const x=[];for(let w=0;w<u[v].length;++w)x.push(u[v][w][g]);const b=ox(x);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+v+" morphAttribute."),null;p.morphAttributes[v].push(b)}}}return p}function ox(r){let t,n,a,o=-1,c=0;for(let d=0;d<r.length;++d){const v=r[d];if(t===void 0&&(t=v.array.constructor),t!==v.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=v.itemSize),n!==v.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(a===void 0&&(a=v.normalized),a!==v.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(o===-1&&(o=v.gpuType),o!==v.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;c+=v.count*n}const u=new t(c),f=new ki(u,n,a);let p=0;for(let d=0;d<r.length;++d){const v=r[d];if(v.isInterleavedBufferAttribute){const _=p/n;for(let g=0,x=v.count;g<x;g++)for(let b=0;b<n;b++){const w=v.getComponent(g,b);f.setComponent(g+_,b,w)}}else u.set(v.array,p);p+=v.count*n}return o!==void 0&&(f.gpuType=o),f}function lx(r=7391){return()=>{r|=0,r=r+1831565813|0;let t=Math.imul(r^r>>>15,1|r);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Kr(r,t){return Math.hypot((r+.18)/2.55,(t+.55)/3.45)}function ms(r,t){const n=Kr(r,t),a=.32-.77*Math.exp(-Math.pow(n/.91,6)),o=Math.max(0,-t-5)*.034,c=Math.sin(r*1.7+t*.37)*.064+Math.sin(t*2.3-r*.67)*.032;return a+o+c*Math.min(1,n)}const P2={yaw:.105,pitch:.057},I2={follow:.38,settle:2.8};function z2(r,t,n){return Math.max(1,Math.min(2,n||1,Math.sqrt(42e5/Math.max(1,r*t))))}const cx=new H(0,1,0),Ep=Math.PI*2;function ux(r,t,n){return 1+.055*Math.sin(r*5.3+n*4.1)*Math.cos(t*4.6)+.026*Math.sin(n*10.8+r*7.7+t*2.1)}function fx(r,t,n){const a=t+.13*Math.sin(r*8.1+n*3.7)*Math.cos(n*6.3),o=.62+.38*Math.sin(r*4.2+n*3.2+.9);return Iu.smoothstep(a,.22,.79)*o}function F2(){const r=[],t=[];for(let a=0;a<3;a++){const o=a/3*Ep,c=Math.cos(o),u=Math.sin(o),f=r.length/3;for(const[p,d,v]of[[-.2,0,0],[.2,0,0],[-.11,.63,.06],[.11,.63,.06],[0,1,.23]])r.push(p*c-v*u,d,p*u+v*c);t.push(f,f+1,f+2,f+1,f+3,f+2,f+2,f+3,f+4)}const n=new un;return n.setAttribute("position",new Ee(r,3)),n.setIndex(t),n.computeVertexNormals(),n}function B2(r,t){const n=new La;n.name="forest-stones";const a=[],o=[],c=new ee("#a0a7a1"),u=new ee("#69776e"),f=new ee("#7b8a4d"),p=(b,w,y,S=.66)=>{const C=y>=.45,L=new Kp(1,C?3:1),A=L.attributes.position,U=L.attributes.normal,N=[],I=new H;for(let W=0;W<A.count;W++){const G=A.getX(W),$=A.getY(W),V=A.getZ(W),tt=ux(G,$,V);A.setXYZ(W,G*tt,$*tt*S,V*tt*.85),I.set(G,$/S,V/.85).normalize(),U.setXYZ(W,I.x,I.y,I.z);const F=.035*Math.sin(G*17.3+V*12.7)*Math.sin($*11.1-V*3.9),X=c.clone().lerp(u,Iu.smoothstep(-$,-.25,.65)*.58);X.lerp(f,fx(G,$,V)*.77),X.multiplyScalar(.97+F),N.push(X.r,X.g,X.b)}L.setAttribute("color",new Ee(N,3));const T=t()*Ep,P=new Wi().setFromAxisAngle(cx,T),B=new H(b,ms(b,w)+y*.12,w);if(L.scale(y,y,y),L.applyQuaternion(P),L.translate(B.x,B.y,B.z),a.push(L),C)for(let W=0;W<110;W++){const G=(t()-.5)*1.56,$=(t()-.5)*1.56,V=G*G+$*$;if(V>.9)continue;const tt=Math.sqrt(1-V);if(fx(G,tt,$)<.42)continue;const F=ux(G,tt,$),X=new H(G,tt/S,$/.85).normalize(),q=new H(G*F*y,tt*F*S*y,$*F*.85*y);q.addScaledVector(X,-.008).applyQuaternion(P).add(B);const it=new Wi().setFromUnitVectors(cx,X).premultiply(P),rt=.009+t()*.018,O=.018+t()*.022,et=new Se().compose(q,it,new H(O,rt,O)),j=new ee().setHSL(.205+t()*.035,.28+t()*.12,.26+t()*.1);o.push({matrix:et,color:j})}};[[-2.45,1.8,.73],[2.6,1,.77],[-2.25,-2.1,.56],[1.8,-3.45,.69],[-.72,2.91,.33],[.58,3.07,.38],[-3.1,-4.9,.8],[3.4,-6.1,1.1]].forEach(([b,w,y])=>p(b,w,y));for(let b=0;b<76;b++){const w=t()*Ep,y=.9+t()*.32;p(Math.cos(w)*2.55*y-.18,Math.sin(w)*3.45*y-.55,.08+t()*.22)}for(let b=0;b<70;b++){const w=(t()-.5)*4,y=(t()-.5)*5-.5;p(w,y,.035+t()*.09,.6)}const d=r.clone();d.name="forest-smooth-wet-stone",d.color.set("white"),d.vertexColors=!0,d.roughness=.48,d.bumpScale=.015;const v=Eu(a);a.forEach(b=>b.dispose());const _=new Ge(v,d);_.name="forest-stone-surfaces",_.castShadow=!0,_.receiveShadow=!0,n.add(_);const g=new Li({color:"#b7c88a",roughness:.97,side:ii}),x=new Di(F2(),g,o.length);return x.name="forest-stone-moss",o.forEach(({matrix:b,color:w},y)=>{x.setMatrixAt(y,b),x.setColorAt(y,w)}),x.instanceMatrix.needsUpdate=!0,x.castShadow=!0,x.receiveShadow=!0,x.computeBoundingSphere(),n.add(x),n}const H2={follow:.09,settle:.45},hx=2.2;function G2(r,t,n){const a=o=>Number.isFinite(o)?o:0;return{yaw:n.yaw*Math.tanh(a(r)*hx),pitch:-n.pitch*Math.tanh(a(t)*hx)}}function dx(r,t,n,a,o){const c=2/a,u=c*o,f=1/(1+u+.48*u*u+.235*u*u*u),p=r-t,d=(n+c*p)*o,v=t+(p+d)*f;return t-r>0==v>t?[t,0]:[v,(n-c*d)*f]}class V2{constructor(t,n=H2){this.limit=t,this.feel=n,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(t,n){const a=G2(t,n,this.limit);this.targetYaw=a.yaw,this.targetPitch=a.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(t){if(!(t>0))return;const n=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=dx(this.yaw,this.targetYaw,this.yawVelocity,n,t),[this.pitch,this.pitchVelocity]=dx(this.pitch,this.targetPitch,this.pitchVelocity,n,t)}}const oS=new H(0,1,0),Xi=Math.PI*2;function k2(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function Ua(r,t,n){const a=document.createElement("canvas");a.width=a.height=r;const o=a.getContext("2d");t(o,k2(n));const c=new qb(a);return c.colorSpace=ni,c.wrapS=c.wrapT=Ru,c.anisotropy=8,c}function _s(r,t,n,a,o,c){const u=r.canvas.width;for(let f=0;f<n;f++)r.fillStyle=t()>.52?o:c,r.globalAlpha=.12+t()*.35,r.beginPath(),r.ellipse(t()*u,t()*u,.3+t()*a,.4+t()*a,t()*Xi,0,Xi),r.fill();r.globalAlpha=1}function X2(){const r=Ua(512,(u,f)=>{u.fillStyle="#6c6856",u.fillRect(0,0,512,512);for(let p=0;p<170;p++){const d=f()*512,v=1+f()*12;u.strokeStyle=p%3===0?"#373e32":p%3===1?"#93917b":"#565a49",u.lineWidth=v,u.globalAlpha=.3+f()*.35,u.beginPath(),u.moveTo(d,-20);for(let _=0;_<550;_+=24)u.lineTo(d+Math.sin(_*.018+p)*(3+v),_);u.stroke()}u.globalAlpha=1;for(let p=0;p<120;p++){const d=f()*512,v=f()*512;u.strokeStyle="#292f24",u.lineWidth=.7+f(),u.beginPath(),u.moveTo(d,v),u.lineTo(d-2,v+6),u.lineTo(d+2,v+19+f()*30),u.stroke()}_s(u,f,7e3,1.4,"#cbc4a1","#252f26");for(let p=0;p<90;p++)u.fillStyle="#b0b39b",u.globalAlpha=.09+f()*.15,u.beginPath(),u.ellipse(f()*512,f()*512,2+f()*10,3+f()*7,f(),0,Xi),u.fill()},7021);r.repeat.set(2,3);const t=Ua(256,(u,f)=>{const p=u.createLinearGradient(0,256,180,0);p.addColorStop(0,"#4a713b"),p.addColorStop(.5,"#739d49"),p.addColorStop(1,"#9fbf65"),u.fillStyle=p,u.fillRect(0,0,256,256),_s(u,f,3600,.8,"#bfce83","#365e38"),u.lineWidth=1.6,u.strokeStyle="rgba(202,216,142,.62)",u.beginPath(),u.moveTo(128,260),u.quadraticCurveTo(123,115,128,-4),u.stroke();for(let d=24;d<245;d+=24)for(const v of[-1,1]){const _=128+v*Math.sin(Math.PI*d/256)*127;u.strokeStyle="rgba(183,202,119,.38)",u.lineWidth=.7,u.beginPath(),u.moveTo(128,d+31),u.quadraticCurveTo(128+v*37,d+15,_,d-13),u.stroke();for(let g=1;g<=3;g++){const x=128+(_-128)*g/4;u.strokeStyle="rgba(166,186,107,.2)",u.lineWidth=.4,u.beginPath(),u.moveTo(x,d+31-g*11),u.lineTo(x+v*14,d-g*10),u.stroke()}}},8032),n=Ua(256,u=>{u.fillStyle="#737373",u.fillRect(0,0,256,256),u.strokeStyle="#c0c0c0",u.lineWidth=2,u.beginPath(),u.moveTo(128,256),u.lineTo(128,0),u.stroke(),u.lineWidth=1;for(let f=24;f<245;f+=24)for(const p of[-1,1])u.beginPath(),u.moveTo(128,f+31),u.quadraticCurveTo(128+p*37,f+15,128+p*Math.sin(Math.PI*f/256)*127,f-13),u.stroke()},54);n.colorSpace=ea;const a=Ua(512,(u,f)=>{u.fillStyle="#5c6040",u.fillRect(0,0,512,512);for(let p=0;p<240;p++){const d=f()*512,v=f()*512,_=8+f()*40,g=u.createRadialGradient(d,v,0,d,v,_);g.addColorStop(0,p%3===0?"rgba(114,125,59,.55)":"rgba(49,55,37,.5)"),g.addColorStop(1,"rgba(60,62,37,0)"),u.fillStyle=g,u.fillRect(d-_,v-_,_*2,_*2)}_s(u,f,18e3,1.6,"#a19465","#2f392b");for(let p=0;p<650;p++){u.strokeStyle=f()>.5?"#90825c":"#303d2b",u.globalAlpha=.5,u.lineWidth=.4+f();const d=f()*512,v=f()*512;u.beginPath(),u.moveTo(d,v),u.lineTo(d+f()*9-4,v+2+f()*13),u.stroke()}},1643);a.repeat.set(10,10);const o=Ua(512,(u,f)=>{u.fillStyle="#939787",u.fillRect(0,0,512,512);for(let p=0;p<180;p++){const d=f()*512,v=f()*512,_=8+f()*65,g=u.createRadialGradient(d,v,0,d,v,_);g.addColorStop(0,p%2?"rgba(63,72,64,.25)":"rgba(205,203,175,.36)"),g.addColorStop(1,"rgba(100,110,91,0)"),u.fillStyle=g,u.fillRect(d-_,v-_,_*2,_*2)}_s(u,f,13e3,1.1,"#dad7bd","#3c493e"),u.strokeStyle="rgba(208,211,187,.2)",u.lineWidth=1.4;for(let p=0;p<8;p++){u.beginPath(),u.moveTo(f()*512,0);for(let d=0;d<520;d+=40)u.lineTo((p*77+Math.sin(d/90)*39)%512,d);u.stroke()}},9076),c=Ua(256,(u,f)=>{u.fillStyle="#506a32",u.fillRect(0,0,256,256),_s(u,f,12500,1.2,"#a7ae5b","#273f26");for(let p=0;p<900;p++){const d=f()*256,v=f()*256;u.strokeStyle=f()>.5?"#84944a":"#3f572b",u.lineWidth=.7,u.beginPath(),u.moveTo(d,v),u.lineTo(d+f()*3-1.5,v-1-f()*5),u.stroke()}},3363);return c.repeat.set(2,2),{bark:new Li({color:"#c3baa3",map:r,bumpMap:r,bumpScale:.07,roughness:.93}),leaf:new U_({color:"#b9d593",map:t,bumpMap:n,bumpScale:.018,roughness:.48,metalness:0,clearcoat:.26,clearcoatRoughness:.36,side:ii}),ground:new Li({color:"#c0b79a",map:a,bumpMap:a,bumpScale:.08,roughness:.98}),rock:new Li({color:"#bdc1af",map:o,bumpMap:o,bumpScale:.035,roughness:.66}),moss:new Li({color:"#c0cd91",map:c,bumpMap:c,bumpScale:.035,roughness:.97}),twig:new Li({color:"#686b37",roughness:.89}),dew:new U_({color:"#bed7c9",roughness:.075,metalness:.35,transmission:0,transparent:!0,opacity:.55,clearcoat:1,clearcoatRoughness:0,ior:1.33})}}function W2(r){const t=(f,p=!1)=>{f.lineCap="round",f.strokeStyle=p?"#bababa":"rgba(182,201,128,.55)",f.lineWidth=p?3.3:2.8,f.beginPath(),f.moveTo(256,512),f.quadraticCurveTo(250,252,256,0),f.stroke();for(let d=48;d<488;d+=47)for(const v of[-1,1]){const _=v>0?8:0;f.strokeStyle=p?"#929292":"rgba(160,181,107,.34)",f.lineWidth=p?1.8:1.25,f.beginPath(),f.moveTo(255,d+41+_),f.bezierCurveTo(256+v*61,d+22,256+v*147,d-2,256+v*235,d-37),f.stroke();for(let g=1;g<=3;g++){const x=256+v*g*53,b=d+32-g*16;f.strokeStyle=p?"#818181":"rgba(148,175,105,.18)",f.lineWidth=.7,f.beginPath(),f.moveTo(x,b),f.quadraticCurveTo(x+v*11,b-18,x+v*20,b-37),f.stroke()}}},n=Ua(512,(f,p)=>{const d=f.createLinearGradient(0,512,330,0);d.addColorStop(0,"#4b733d"),d.addColorStop(.55,"#709249"),d.addColorStop(1,"#8da65a"),f.fillStyle=d,f.fillRect(0,0,512,512);for(let v=0;v<32;v++){const _=p()*512,g=p()*512,x=25+p()*70,b=f.createRadialGradient(_,g,0,_,g,x);b.addColorStop(0,v%2?"rgba(143,168,87,.10)":"rgba(38,74,37,.08)"),b.addColorStop(1,"rgba(80,116,54,0)"),f.fillStyle=b,f.fillRect(_-x,g-x,x*2,x*2)}_s(f,p,5500,.65,"#adc077","#547442"),t(f)},19481),a=Ua(512,(f,p)=>{f.fillStyle="#747474",f.fillRect(0,0,512,512),_s(f,p,5e3,.7,"#838383","#6c6c6c"),t(f,!0)},19482),o=Ua(256,(f,p)=>{f.fillStyle="#cecece",f.fillRect(0,0,256,256),_s(f,p,4200,1.3,"#ededed","#a4a4a4");for(let d=0;d<14;d++){const v=p()*256,_=p()*256,g=f.createRadialGradient(v,_,0,v,_,18+p()*27);g.addColorStop(0,"rgba(96,96,96,.25)"),g.addColorStop(1,"rgba(140,140,140,0)"),f.fillStyle=g,f.fillRect(v-48,_-48,96,96)}},19483);a.colorSpace=o.colorSpace=ea;for(const f of[n,a,o])f.wrapS=f.wrapT=na;const c=r.leaf.clone();c.map=n,c.bumpMap=a,c.bumpScale=.007,c.roughnessMap=o,c.roughness=.55,c.clearcoat=.28,c.clearcoatRoughness=.3,c.onBeforeCompile=r.leaf.onBeforeCompile,c.customProgramCacheKey=()=>`${r.leaf.customProgramCacheKey()}-foreground-v1`;const u=r.dew.clone();return u.color.set("#e3ecd9"),u.metalness=0,u.roughness=.075,u.ior=1.333,u.clearcoat=0,u.opacity=1,u.transmission=0,u.transparent=!0,u.depthWrite=!1,u.onBeforeCompile=f=>{f.fragmentShader=f.fragmentShader.replace("#include <opaque_fragment>",`
      float dewFacing = clamp(dot(normal, normalize(vViewPosition)), 0., 1.);
      float dewFresnel = .0204 + .9796 * pow(1. - dewFacing, 5.);
      float dewSpecular = max(max(totalSpecular.r, totalSpecular.g), totalSpecular.b);
      diffuseColor.a = .075 + .38 * dewFresnel + clamp(dewSpecular * .65, 0., .48);
      outgoingLight = diffuseColor.rgb * .055 + totalSpecular / max(diffuseColor.a, .075);
      #include <opaque_fragment>`)},u.customProgramCacheKey=()=>"forest-foreground-dew-fresnel-v1",{...r,leaf:c,dew:u}}function Jr(r,t){const n=Math.sin(Math.PI*r),a=Math.pow(n,.78)*.3+.001,o=Iu.smoothstep(r,.72,1)*.032,c=.004*Math.exp(-t*t*48)*n,u=-.057*t*t*n,f=.0035*Math.sin(r*Math.PI*16+Math.abs(t)*1.6)*Math.abs(t)*n,p=.014*t*n*Math.sin(r*Math.PI*.8);return new H(t*a,r,n*.085+r*r*.07-o+u+f+p+c)}function q2(){const n=[],a=[],o=[];for(let u=0;u<=24;u++)for(let f=0;f<=12;f++){const p=u/24,d=f/12*2-1;n.push(...Jr(p,d).toArray()),a.push(f/12,p)}for(let u=0;u<24;u++)for(let f=0;f<12;f++){const p=u*13+f,d=p+12+1;o.push(p,p+1,d,p+1,d+1,d)}const c=new un;return c.setAttribute("position",new Ee(n,3)),c.setAttribute("uv",new Ee(a,2)),c.setIndex(o),c.computeVertexNormals(),c}function $p(r=9,t=1){const n=[],a=[],o=[];for(let u=0;u<=r;u++){const f=u/r,p=Math.pow(Math.sin(Math.PI*f),.78)*.3*t+.001;for(let d=0;d<=2;d++){const v=d-1;n.push(v*p,f,Math.sin(f*Math.PI)*.085-Math.abs(v)*p*.19+f*f*.07),a.push(d/2,f)}}for(let u=0;u<r;u++)for(let f=0;f<2;f++){const p=u*3+f,d=p+3;o.push(p,p+1,d,p+1,d+1,d)}const c=new un;return c.setAttribute("position",new Ee(n,3)),c.setAttribute("uv",new Ee(a,2)),c.setIndex(o),c.computeVertexNormals(),c}function jr(r,t,n,a){const o=new Hx(r),c=Math.max(r.length*3,9),u=o.computeFrenetFrames(c,!1),f=[],p=[],d=[],v=Array.from({length:n},()=>.92+a()*.16);for(let g=0;g<=c;g++){const x=g/c,b=o.getPointAt(x),w=x*(t.length-1),y=Math.floor(w),S=Math.min(y+1,t.length-1),C=Iu.lerp(t[y],t[S],w-y);for(let L=0;L<=n;L++){const A=L/n*Xi,U=C*v[L%n]*(1+Math.sin(g*1.3+L*3.7)*.025),N=b.clone().addScaledVector(u.normals[g],Math.cos(A)*U).addScaledVector(u.binormals[g],Math.sin(A)*U);f.push(N.x,N.y,N.z),p.push(L/n,x)}}for(let g=0;g<c;g++)for(let x=0;x<n;x++){const b=g*(n+1)+x,w=b+n+1;d.push(b,b+1,w,b+1,w+1,w)}const _=new un;return _.setAttribute("position",new Ee(f,3)),_.setAttribute("uv",new Ee(p,2)),_.setIndex(d),_.computeVertexNormals(),_}function tm(r){const t=[],n=[],a=[],o=[];let c=0;for(const f of r){const p=f.getAttribute("position"),d=f.getAttribute("normal"),v=f.getAttribute("uv");for(let g=0;g<p.count;g++)t.push(p.getX(g),p.getY(g),p.getZ(g)),n.push(d.getX(g),d.getY(g),d.getZ(g)),a.push(v.getX(g),v.getY(g));const _=f.getIndex();if(_)for(let g=0;g<_.count;g++)o.push(_.getX(g)+c);c+=p.count,f.dispose()}const u=new un;return u.setAttribute("position",new Ee(t,3)),u.setAttribute("normal",new Ee(n,3)),u.setAttribute("uv",new Ee(a,2)),u.setIndex(o),u.computeBoundingSphere(),u}function Ou(r,t,n,a,o=1){const c=t.clone().normalize(),u=c.clone().cross(n).normalize();u.lengthSq()<.1&&u.set(1,0,0);const f=u.clone().cross(c).normalize(),p=new Se().makeBasis(u,c,f);return p.scale(new H(a*o,a,a)),p.setPosition(r),p}function em(r,t=!1){return new ee().setHSL(.19+r()*.075,.28+r()*.23,(t?.6:.49)+r()*.2)}function Y2(r,t,n){const{height:a,radius:o}=n,c=n.detail==="far"||n.detail===!1||n.detail===0?0:n.detail==="mid"||n.detail===1?1:2,u=new La;u.name="forest-tree";const f=[],p=[],d=new H((t()-.5)*a*.135,0,(t()-.5)*a*.105),v=[new H(0,-.12,0),new H(d.x*.1,a*.2,d.z*.1),new H(d.x*.35,a*.55,d.z*.4),new H(d.x,a,d.z)];if(f.push(jr(v,[o*1.36,o,o*.67,o*.15],c===2?14:9,t)),c>0){const b=5+Math.floor(t()*3);for(let w=0;w<b;w++){const y=w/b*Xi+t()*.28,S=o*(3+t()*2.3);f.push(jr([new H(Math.cos(y)*o*.2,o*.72,Math.sin(y)*o*.2),new H(Math.cos(y)*S*.45,.14,Math.sin(y)*S*.45),new H(Math.cos(y+.15)*S,-.04,Math.sin(y+.15)*S)],[o*.32,o*.19,.018],7,t))}}const _=c===0?7:10;for(let b=0;b<_;b++){const w=.4+b/_*.49,y=b*2.39996+t()*.42,S=a*(.14+t()*.11)*(1-Math.max(0,w-.65)*1.6),C=new H(d.x*w*w,a*w,d.z*w*w),L=new H(C.x+Math.cos(y)*S,C.y+a*(.08+t()*.07),C.z+Math.sin(y)*S),A=C.clone().lerp(L,.53);A.y-=a*.024,f.push(jr([C,A,L],[o*(.31-w*.13),o*.1,o*.024],c===2?8:6,t));const U=c===0?2:3;for(let N=0;N<U;N++){const I=C.clone().lerp(L,.5+N*.2),T=y+(N-1)*.88+(t()-.5)*.55,P=I.clone().add(new H(Math.cos(T)*S*.56,a*(.035+t()*.06),Math.sin(T)*S*.56));c>0&&f.push(jr([I,I.clone().lerp(P,.5).add(new H(0,-.04,0)),P],[o*.064,o*.036,.009],5,t));const B=c===0?32:c===1?46:58;for(let W=0;W<B;W++){const G=t()*Xi,$=Math.sqrt(t()),V=S*(.3+t()*.09),F=I.clone().lerp(P,.45+t()*.67).add(new H(Math.cos(G)*V*$,(t()-.5)*V*.65,Math.sin(G)*V*$)),X=new H(Math.cos(G),(t()-.5)*.9,Math.sin(G)),q=new H((t()-.5)*.75,1,(t()-.5)*.75);p.push(Ou(F,X,q,a*(.021+t()*.016),.9+t()*.45))}}}const g=new Ge(tm(f),r.bark);g.name="forest-tree-bark",g.castShadow=c>0,g.receiveShadow=!0,u.add(g);const x=new Di($p(c===0?3:c===1?4:6),r.leaf,p.length);return x.name="forest-tree-leaves",p.forEach((b,w)=>{x.setMatrixAt(w,b),x.setColorAt(w,em(t))}),x.instanceMatrix.needsUpdate=!0,x.castShadow=c>0,x.receiveShadow=!0,x.computeBoundingSphere(),u.add(x),u.userData.foliage=x,u.userData.swaySeed=t()*Xi,u}function Z2(r,t,n=1){const a=new La;a.name="forest-fern";const o=6+Math.floor(t()*3),c=[],u=[];for(let d=0;d<o;d++){const v=d/o*Xi+t()*.3,_=(.52+t()*.4)*n,g=(.2+t()*.13)*n,x=new H(Math.cos(v),0,Math.sin(v)),b=new H(-Math.sin(v),0,Math.cos(v)),w=y=>x.clone().multiplyScalar(_*y).setY(.055*n+Math.sin(y*Math.PI*.84)*g);u.push(jr([w(0),w(.3),w(.64),w(1)],[.01*n,.007*n,.004*n,.001*n],4,t));for(let y=0;y<11;y++){const S=.17+y/11*.78;for(const C of[-1,1]){const L=w(S),A=b.clone().multiplyScalar(C).addScaledVector(x,.4+S*.45).setY(.06-S*.18),U=Math.sin(S*Math.PI)*(.14+.035*t())*n;c.push(Ou(L,A,new H(0,1,0),U,.53))}}c.push(Ou(w(.93),x.clone().setY(-.25),oS,.08*n,.46))}const f=new Ge(tm(u),r.twig);a.add(f);const p=new Di($p(5,.9),r.leaf,c.length);return p.name="forest-fern-leaves",c.forEach((d,v)=>{p.setMatrixAt(v,d),p.setColorAt(v,em(t,!0))}),p.instanceMatrix.needsUpdate=!0,p.castShadow=!0,p.receiveShadow=!0,p.computeBoundingSphere(),a.add(p),a.userData.foliage=p,a.userData.swaySeed=t()*Xi,a}function K2(r,t,n=1,a=!1){const o=new La;o.name="forest-broadleaf";const c=5+Math.floor(t()*3),u=[],f=[],p=[];for(let g=0;g<c;g++){const x=g/c*Xi+t()*.4,b=n*(.16+t()*.3),w=n*(.12+t()*.18),y=new H(Math.cos(x)*w,b,Math.sin(x)*w);u.push(jr([new H(0,0,0),y.clone().multiplyScalar(.54).add(new H(0,.055*n,0)),y],[.012*n,.008*n,.004*n],5,t));const S=new H(Math.cos(x),-.1-t()*.2,Math.sin(x)),C=(.34+t()*.3)*n,L=Ou(y,S,oS,C,1.2+t()*.2);f.push(L);for(let A=0;A<2;A++){const U=.28+t()*.47,N=(t()-.5)*.26,I=n*(.009+t()*.007);if(a){const T=Math.pow(Math.sin(Math.PI*U),.78)*.3+.001,P=N/T,B=Jr(U,P).applyMatrix4(L),W=Jr(U,P+.001).sub(Jr(U,P-.001)),G=Jr(U+.001,P).sub(Jr(U-.001,P)),$=W.cross(G).normalize().applyMatrix3(new re().getNormalMatrix(L)).normalize(),V=I*.66;B.addScaledVector($,V*.49);const tt=new Wi().setFromUnitVectors(new H(0,0,1),$);p.push(new Se().compose(B,tt,new H(V,V,V*.66)))}else{const T=new H(N,U,Math.sin(U*Math.PI)*.085-Math.abs(N)*.19+U*U*.07+.011).applyMatrix4(L);p.push(new Se().compose(T,new Wi,new H(I,I*.72,I)))}}}const d=new Ge(tm(u),r.twig);d.castShadow=!0,o.add(d);const v=new Di(a?q2():$p(12),r.leaf,c);v.name="forest-broadleaf-leaves",f.forEach((g,x)=>{v.setMatrixAt(x,g),v.setColorAt(x,em(t,!0))}),v.instanceMatrix.needsUpdate=!0,v.castShadow=!0,v.receiveShadow=!0,v.computeBoundingSphere(),o.add(v);const _=new Di(new vs(1,a?16:8,a?10:5),r.dew,p.length);return _.name="forest-leaf-dew",p.forEach((g,x)=>_.setMatrixAt(x,g)),_.instanceMatrix.needsUpdate=!0,_.computeBoundingSphere(),o.add(_),o.userData.foliage=v,o.userData.swaySeed=t()*Xi,o}class J2{constructor(t){this.options=t,this.fences=[],this.request=null,this.redraw=null,this.captures=[],this.submitted=0,this.initializationSubmitted=0,this.completed=0,this.abandoned=0,this.unfenced=0,this.running=!1,this.disposed=!1,this.fault=null,this.last=0,this.tick=n=>{var a,o;if(this.request=null,!(this.disposed||this.fault))try{if(this.retire(),this.disposed||this.fault)return;if(this.fences.length<2&&(((o=(a=this.options).canDraw)==null?void 0:o.call(a))??!0)&&(this.running||this.redraw!==null||this.captures.length)){const c=this.captures.length?0:this.redraw??Math.max(0,(n-this.last)/1e3);this.redraw=null,this.last=n,this.submitted++,this.unfenced++,this.options.draw(c);const{gl:u}=this.options;if(this.disposed||this.fault||u.isContextLost()){this.disposed||this.fault?(this.abandoned+=this.unfenced,this.unfenced=0):this.fail("context-lost"),this.publish();return}const f=u.fenceSync(u.SYNC_GPU_COMMANDS_COMPLETE,0);if(!f){this.fail(u.isContextLost()?"context-lost":"null-fence");return}if(this.fences.push(f),this.unfenced--,u.flush(),u.isContextLost()){this.fail("context-lost");return}if(this.captures.length){const p=this.captures;this.captures=[];try{const d=this.options.readback();if(u.isContextLost()){this.fail("context-lost");for(const v of p)v.reject(this.error())}else for(const v of p)v.resolve(d)}catch(d){for(const v of p)v.reject(d instanceof Error?d:new Error(String(d)))}}}this.publish(),this.schedule()}catch{this.fail(this.options.gl.isContextLost()?"context-lost":"submission-error")}},this.publish()}get state(){return{submitted:this.submitted,initializationSubmitted:this.initializationSubmitted,completed:this.completed,pending:this.fences.length,abandoned:this.abandoned,queued:this.redraw!==null||this.captures.length>0,captures:this.captures.length,running:this.running,disposed:this.disposed,fault:this.fault}}trackInitialization(){if(!(this.disposed||this.fault||this.submitted||this.request!==null)){this.submitted++,this.initializationSubmitted++,this.unfenced++;try{const{gl:t}=this.options;if(t.isContextLost()){this.fail("context-lost");return}const n=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);if(!n){this.fail(t.isContextLost()?"context-lost":"null-fence");return}if(this.fences.push(n),this.unfenced--,t.flush(),t.isContextLost()){this.fail("context-lost");return}this.publish(),this.schedule()}catch{this.fail(this.options.gl.isContextLost()?"context-lost":"submission-error")}}}renderFrame(t=0){this.disposed||this.fault||(this.redraw=Math.max(0,Number.isFinite(t)?t:0),this.publish(),this.schedule())}start(){this.running||this.disposed||this.fault||(this.running=!0,this.last=this.options.now(),this.publish(),this.schedule())}stop(){this.running=!1,this.cancel(),this.publish(),this.schedule()}capture(){if(this.disposed||this.fault)return Promise.reject(this.error());const t=new Promise((n,a)=>this.captures.push({resolve:n,reject:a}));return this.publish(),this.schedule(),t}contextLost(){this.fail("context-lost")}dispose(){this.disposed||(this.disposed=!0,this.running=!1,this.redraw=null,this.cancel(),this.discardFences(),this.rejectCaptures(),this.publish())}error(){return new Error(`Forest GPU scheduler ${this.fault??(this.disposed?"disposed":"unavailable")}.`)}publish(){this.options.onState(this.state)}cancel(){this.request!==null&&this.options.cancelFrame(this.request),this.request=null}schedule(){var t,n;this.request!==null||this.disposed||this.fault||(this.fences.length||(((n=(t=this.options).canDraw)==null?void 0:n.call(t))??!0)&&(this.running||this.redraw!==null||this.captures.length))&&(this.request=this.options.requestFrame(this.tick))}discardFences(){const t=this.fences;if(this.fences=[],this.abandoned+=t.length+this.unfenced,this.unfenced=0,!this.options.gl.isContextLost())for(const n of t)this.options.gl.deleteSync(n)}rejectCaptures(){const t=this.captures;this.captures=[];for(const n of t)n.reject(this.error())}fail(t){this.disposed||this.fault||(this.fault=t,this.running=!1,this.redraw=null,this.cancel(),this.discardFences(),this.rejectCaptures(),this.publish(),this.options.onFault(t))}retire(){const{gl:t}=this.options;if(t.isContextLost()){this.fail("context-lost");return}for(;this.fences.length;){const n=this.fences[0],a=t.clientWaitSync(n,0,0);if(t.isContextLost()){this.fail("context-lost");return}if(a===t.TIMEOUT_EXPIRED)break;if(a!==t.ALREADY_SIGNALED&&a!==t.CONDITION_SATISFIED){this.fail(a===t.WAIT_FAILED?"wait-failed":"unexpected-wait-status");return}this.fences.shift(),t.deleteSync(n),this.completed++}}}function Q2(r,t={}){const n=r.extensions.has("EXT_color_buffer_float"),a=r.extensions.has("EXT_color_buffer_half_float"),o=n||a;return{halfFloatSupported:o,halfFloatEnabled:o&&!t.forceByteTargets,mode:t.forceByteTargets?"forced-byte":o?"native-half-float":"native-byte",reason:t.forceByteTargets?"forced-byte":o?"supported":"extension-unavailable",checks:[]}}function io(r,t,n,a){const o=r.getRenderTarget(),c=r.getActiveCubeFace(),u=r.getActiveMipmapLevel();try{r.setRenderTarget(t,0,0);const f=r.getContext(),p=f.checkFramebufferStatus(f.FRAMEBUFFER),d={label:n,type:t.texture.type===Yn?"half-float":t.texture.type===Dn?"unsigned-byte":"other",width:t.width,height:t.height,status:p,complete:p===f.FRAMEBUFFER_COMPLETE};return a==null||a.push(d),d}finally{r.setRenderTarget(o,c,u)}}function Tp(r){r.halfFloatEnabled=!1,r.mode!=="forced-byte"&&(r.mode="native-byte"),r.reason="framebuffer-incomplete"}function j2(r,t,n){t.texture.type=n.halfFloatEnabled?Yn:Dn,t.texture.internalFormat=null;let a=io(r,t,"reflection",n.checks);if(!a.complete&&t.texture.type===Yn&&(t.dispose(),Tp(n),t.texture.type=Dn,t.texture.internalFormat=null,a=io(r,t,"reflection-byte-fallback",n.checks)),!a.complete)throw new Error("Forest reflection framebuffer is incomplete.");return a}const Hu=256,Tu=3*Hu,Ap=4*Hu,Au=4;function $2(r,t,n){if(n.halfFloatEnabled)for(const o of[!0,!1]){const c=new _i(Tu,Ap,{type:Yn,format:vi,minFilter:Tn,magFilter:Tn,colorSpace:so,generateMipmaps:!1,depthBuffer:o});try{if(!io(r,c,o?"pmrem-scene-preflight":"pmrem-filter-preflight",n.checks).complete){Tp(n);break}}finally{c.dispose()}}if(n.halfFloatEnabled){const o=new yp(r),c=r.getRenderTarget(),u=r.getActiveCubeFace(),f=r.getActiveMipmapLevel(),p=r.xr.enabled,d=r.toneMapping,v=r.autoClear;let _,g=!1;try{_=o.fromScene(t,.05,.1,80,{size:Hu});const b=o._pingPongRenderTarget;b&&(g=io(r,b,"pmrem-filter",n.checks).complete)}finally{o.dispose(),r.setRenderTarget(c,u,f),r.xr.enabled=p,r.toneMapping=d,r.autoClear=v}const x=io(r,_,"pmrem-environment",n.checks).complete;if(g&&x)return{texture:_.texture,intensityScale:1,kind:"half-float-pmrem",dispose:()=>_.dispose()};_.dispose(),Tp(n)}const a=n3();return{texture:a,intensityScale:Au,kind:"byte-cubeuv",dispose:()=>a.dispose()}}function t3(r){return r>=4?Math.pow(2,-r/2)/1.16:r>=3?.305-(r-3)*.095:r>=2?.4-(r-2)*.095:r>=-1?.8-(r+1)*(.4/3):1}function e3(r,t,n,a){switch(r){case 0:a.set(1,n,t);break;case 1:a.set(-t,1,-n);break;case 2:a.set(-t,n,1);break;case 3:a.set(-1,n,-t);break;case 4:a.set(-t,-1,n);break;default:a.set(t,n,-1)}return a.normalize()}function n3(){const r=new Uint8Array(Tu*Ap*4),t=new H,n=new H,a=new H,o=new H(8,13,-18).normalize(),c=new H,u=d=>{let v=0,_=.5;for(;d>0;)v+=(d&1)*_,d>>>=1,_*=.5;return v},f=(d,v,_,g)=>{const x=Math.pow(Math.max(0,v),.7),b=Math.max(0,d*o.x+v*o.y+_*o.z),w=32/(1+32*.05**2),y=700/(1+700*.05**2),S=Math.pow(b,w)*.65*(w+1)/33,C=Math.pow(b,y)*2*(y+1)/701;c.x+=(.72-.33*x+S+C)*g,c.y+=(.77-.13*x+.82*S+.94*C)*g,c.z+=(.59+.11*x+.46*S+.72*C)*g};for(let d=8;d>=-2;d--){const v=2**Math.max(d,4),_=Math.max(4-d,0)*3*16,g=4*(Hu-v),x=[];let b=0;const w=t3(d)**2;for(let y=0;y<(d===8?1:64);y++){const S=2*Math.PI*y/64,C=u(y),L=d===8?1:Math.sqrt((1-C)/(1+(w*w-1)*C)),A=Math.sqrt(Math.max(0,1-L*L)),U=2*L*A*Math.cos(S),N=2*L*A*Math.sin(S),I=2*L*L-1;I>0&&(x.push([U,N,I,I]),b+=I)}for(const y of x)y[3]/=b;for(let y=0;y<6;y++){const S=_+y%3*v,C=g+(y>2?v:0);for(let L=0;L<v;L++)for(let A=0;A<v;A++){e3(y,2*(A-.5)/(v-2)-1,2*(L-.5)/(v-2)-1,t),n.set(0,Math.abs(t.y)<.999?1:0,Math.abs(t.y)<.999?0:1).cross(t).normalize(),a.crossVectors(t,n),c.set(0,0,0);for(const[N,I,T,P]of x)f(n.x*N+a.x*I+t.x*T,n.y*N+a.y*I+t.y*T,n.z*N+a.z*I+t.z*T,P);const U=((C+L)*Tu+S+A)*4;r[U]=Math.round(255*c.x/Au),r[U+1]=Math.round(255*c.y/Au),r[U+2]=Math.round(255*c.z/Au),r[U+3]=255}}}const p=new Xp(r,Tu,Ap,vi,Dn);return p.name="Forest prefiltered byte sky",p.mapping=Ll,p.colorSpace=so,p.minFilter=p.magFilter=Tn,p.generateMipmaps=!1,p.needsUpdate=!0,p}const ps=(r=0,t=0,n=0)=>new H(r,t,n);class i3{constructor(t,n,a={}){this.canvas=t,this.scene=new h_,this.camera=new Ui(55,1,.06,120),this.look=new V2(P2,I2),this.rng=lx(),this.clock={value:0},this.time=0,this.frame=0,this.requestedSize=null,this.appliedSize=null,this.requestedHolder=null,this.staticDirty=!0,this.running=!1,this.disposed=!1,this.ready=!1,this.plants=[],this.solidSurfaces=[],this.birds=[],this.leafHitTime=-20,this.leafHit=null,this.raycaster=new I1,this.resources=[],this.auditedTargets=new Set,this.renderer=new O2({canvas:t,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.targetPolicy=Q2(this.renderer,a),this.renderer.outputColorSpace=ni,this.renderer.toneMapping=Cp,this.renderer.toneMappingExposure=1.08,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=mx,this.renderer.shadowMap.autoUpdate=!1,this.renderer.info.autoReset=!1,this.scheduler=new J2({gl:this.renderer.getContext(),canDraw:()=>this.canvas.isConnected,draw:o=>this.drawFrame(o),readback:()=>{const o=performance.now();return{dataUrl:this.canvas.toDataURL("image/png"),width:this.canvas.width,height:this.canvas.height,time:this.time,method:"same-task-webgl-png",readbackMs:performance.now()-o}},requestFrame:o=>requestAnimationFrame(o),cancelFrame:o=>cancelAnimationFrame(o),now:()=>performance.now(),onState:o=>Object.assign(this.canvas.dataset,{gpuSubmitted:String(o.submitted),gpuSubmissionAttempts:String(o.submitted),gpuInitializationSubmitted:String(o.initializationSubmitted),gpuCompleted:String(o.completed),gpuPending:String(o.pending),gpuAbandoned:String(o.abandoned),gpuQueued:String(o.queued),gpuCaptures:String(o.captures),gpuFault:o.fault??"",running:String(o.running)}),onFault:()=>{this.stop(),n()}}),this.onLost=o=>{o.preventDefault(),this.canvas.dataset.contextLostAt=String(performance.now()),this.scheduler.contextLost()},t.addEventListener("webglcontextlost",this.onLost),t.dataset.frames="0",t.dataset.time="0",t.dataset.waterHits="0",t.dataset.leafHits="0"}async init(){this.buildWorld(),this.renderer.shadowMap.needsUpdate=!0;try{await this.renderer.compileAsync(this.scene,this.camera)}catch(t){if(!this.disposed)throw t}this.disposed||(this.scheduler.trackInitialization(),!this.disposed&&!this.scheduler.state.fault&&(this.ready=!0))}buildWorld(){var et;const t=this.rng,n=X2();this.scene.background=new ee("#b5c7a7"),this.scene.fog=new Vp("#afbea0",15,86),this.camera.position.set(0,1.42,5),this.camera.lookAt(0,1.65,-9),this.scene.add(new U1("#e2eed4","#646447",1.8));const a=new Td("#ffe6ad",4.5);a.position.set(8,13,-18),a.target.position.set(-2,0,1),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),Object.assign(a.shadow.camera,{left:-17,right:17,top:21,bottom:-17,near:1,far:65}),a.shadow.bias=-35e-5,a.shadow.normalBias=.035,this.scene.add(a,a.target);const o=new Td("#bcdad4",.85);o.position.set(-8,5,6),this.scene.add(o);const c=new ai({side:qn,depthWrite:!1,uniforms:{sun:{value:ps(8,13,-18).normalize()}},vertexShader:"varying vec3 vDir; void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 vDir; uniform vec3 sun; void main(){vec3 d=normalize(vDir);float h=max(0.,d.y);vec3 c=mix(vec3(.72,.77,.59),vec3(.39,.64,.70),pow(h,.7));float s=max(0.,dot(d,sun));c+=vec3(1.,.82,.46)*pow(s,32.)*.65+vec3(1.,.94,.72)*pow(s,700.)*2.;gl_FragColor=vec4(c,1.);#include <tonemapping_fragment>
#include <colorspace_fragment>}`.replace(";#include",`;
#include`)}),u=new Ge(new vs(90,24,16),c);this.scene.add(u);const f=new h_;f.add(new Ge(new vs(30,24,16),c));const p=$2(this.renderer,f,this.targetPolicy);this.scene.environment=p.texture,this.scene.environmentIntensity=.55*p.intensityScale,this.canvas.dataset.environmentPath=p.kind,this.resources.push(p),f.children[0].geometry.dispose();const d=new qs(115,115,150,150);d.rotateX(-Math.PI/2),d.translate(0,0,-32);const v=d.attributes.position,_=[];for(let j=0;j<v.count;j++){const J=v.getX(j),bt=v.getZ(j);v.setY(j,ms(J,bt));const Dt=(Math.sin(J*.72+bt*.23)+Math.sin(bt*.9-J*.23))*.25+.5,at=new ee().lerpColors(new ee("#b5a787"),new ee("#a4b773"),Dt);Kr(J,bt)<1&&at.lerp(new ee("#3c4538"),.55),_.push(at.r,at.g,at.b)}d.setAttribute("color",new Ee(_,3)),d.computeVertexNormals();const g=n.ground.clone();g.color.set("#ffffff"),g.vertexColors=!0,(et=g.map)==null||et.repeat.set(42,42);const x=new Ge(d,g);x.receiveShadow=!0,this.scene.add(x),this.solidSurfaces.push(x);const b=[[-3.7,-.2,13,.6],[3.85,-1.8,14,.67],[-6.3,-5.8,16,.63],[5.9,-8,15,.61],[-2.8,-9.8,13.5,.41],[1.7,-12.6,15.6,.4],[-7.8,-14,16,.47],[8.2,-15,17,.6],[-4.7,-19,17,.5],[4.8,-23,18,.48],[-.9,-25,17,.43],[-10,-25,19,.55],[11,-28,18,.51],[-7,-32,18,.47],[2.3,-35,19,.43],[-3.5,-40,21,.5],[8,-43,22,.5],[-14,-38,22,.61],[16,-41,22,.65],[-10,-52,22,.4],[.7,-53,23,.37],[5,-62,24,.41],[-7,-67,24,.44],[15,-59,23,.46]];b.push([-9,-3,14,.43],[10,-4,16,.5],[-13,-12,18,.53],[14,-14,17,.49],[-19,-22,20,.57],[20,-25,21,.6],[-4.8,-7,5,.1],[4.2,-11,6.4,.13],[-8.2,-19,8,.18],[6.5,-22,7,.13]);for(let j=0;j<4;j++)for(let J=0;J<9;J++){const bt=(J-4)*6.4+(t()-.5)*4,Dt=-31-j*11+(t()-.5)*6;b.push([bt,Dt,15+t()*10,.2+t()*.25])}const w=j=>{j.uniforms.forestTime=this.clock,j.vertexShader=`uniform float forestTime;
`+j.vertexShader,j.vertexShader=j.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vec4 branchPosition=vec4(transformed,1.);
        #ifdef USE_INSTANCING
          branchPosition=instanceMatrix*branchPosition;
        #endif
        float flexibility=pow(clamp(branchPosition.y/16.,0.,1.4),1.65);
        float trunkPhase=modelMatrix[3].x*.37+modelMatrix[3].z*.19;
        vec3 bend=vec3(sin(forestTime*.26+trunkPhase),0.,cos(forestTime*.21+trunkPhase))*.035*flexibility;
        mvPosition.xyz+=(viewMatrix*vec4(bend,0.)).xyz;
        gl_Position=projectionMatrix*mvPosition;`)},y=j=>{j.fragmentShader=j.fragmentShader.replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
        #if NUM_DIR_LIGHTS > 0
          float throughLeaf=pow(max(0.,dot(-normal,directionalLights[0].direction)),1.7);
          reflectedLight.indirectDiffuse+=diffuseColor.rgb*vec3(.34,.42,.15)*throughLeaf;
        #endif`)};n.bark.onBeforeCompile=w,n.bark.customProgramCacheKey=()=>"forest-inherited-branch-wind-v1",n.leaf.onBeforeCompile=j=>{w(j),y(j),j.vertexShader=j.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        vec4 windOrigin=vec4(position,1.);
        #ifdef USE_INSTANCING
          windOrigin=instanceMatrix*windOrigin;
        #endif
        windOrigin=modelMatrix*windOrigin;
        float phase=windOrigin.x*.61+windOrigin.z*.42;
        transformed.x+=sin(forestTime*.63+phase)*.012;
        transformed.z+=sin(forestTime*.47+phase*1.7)*.009;`)},n.leaf.customProgramCacheKey=()=>"forest-leaf-wind-v2",n.leaf.clearcoat=0;const S=n.leaf.clone();S.bumpMap=null,S.roughness=.65,S.onBeforeCompile=n.leaf.onBeforeCompile,S.customProgramCacheKey=()=>"forest-distant-leaf-v2";const C=[],L=[],A=[];let U;for(let j=0;j<b.length;j++){const[J,bt,Dt,at]=b[j],pt=j<5?"near":j<12||j>=24&&j<34?"mid":"far",Tt=Y2({...n,leaf:pt==="far"?S:n.leaf},t,{height:Dt,radius:at,detail:pt});if(Tt.position.set(J,ms(J,bt),bt),Tt.rotation.y=t()*Math.PI*2,pt!=="far"){this.scene.add(Tt);continue}Tt.updateMatrixWorld(!0);for(const It of Tt.children){const At=It;if(At instanceof Di){U?At.geometry.dispose():U=At.geometry;for(let $t=0;$t<At.count;$t++){const Oe=new Se,ne=new ee;At.getMatrixAt($t,Oe),At.getColorAt($t,ne),L.push(Oe.premultiply(At.matrixWorld)),A.push(ne)}At.dispose()}else C.push(At.geometry.clone().applyMatrix4(At.matrixWorld)),At.geometry.dispose()}}const N=new Ge(Eu(C),n.bark);N.receiveShadow=!0,this.scene.add(N),C.forEach(j=>j.dispose());const I=new Di(U,S,L.length);L.forEach((j,J)=>{I.setMatrixAt(J,j),I.setColorAt(J,A[J])}),I.receiveShadow=!0,I.computeBoundingSphere(),this.scene.add(I);const T=B2(n.rock,t);this.scene.add(T),this.solidSurfaces.push(T.children[0]),this.addWater();const P=[],B=[],W=[];let G;for(let j=0;j<72;j++){const J=t()*Math.PI*2,bt=3.7+t()*12,Dt=Math.cos(J)*bt,at=Math.sin(J)*bt-5;if(at>3||Kr(Dt,at)<1.1)continue;const pt=Z2(n,t,.85+t()*1.1);pt.position.set(Dt,ms(Dt,at)+.015,at),pt.rotation.y=t()*6.28,pt.updateMatrixWorld(!0);for(const Tt of pt.children){const It=Tt;if(It instanceof Di){G?It.geometry.dispose():G=It.geometry;for(let At=0;At<It.count;At++){const $t=new Se,Oe=new ee;It.getMatrixAt(At,$t),It.getColorAt(At,Oe),B.push($t.premultiply(It.matrixWorld)),W.push(Oe)}It.dispose()}else P.push(It.geometry.clone().applyMatrix4(It.matrixWorld)),It.geometry.dispose()}}const $=new Ge(Eu(P),n.twig);this.scene.add($),P.forEach(j=>j.dispose());const V=new Di(G,n.leaf,B.length);B.forEach((j,J)=>{V.setMatrixAt(J,j),V.setColorAt(J,W[J])}),V.castShadow=!0,V.receiveShadow=!0,V.computeBoundingSphere(),this.scene.add(V);const tt=n.leaf.clone();tt.clearcoat=.45,tt.roughness=.34,tt.onBeforeCompile=y,tt.customProgramCacheKey=()=>"forest-wet-leaf-v2";const F=W2({...n,leaf:tt});for(const[j,J,bt]of[[-1.65,3.22,1.1],[1.95,3.02,.95],[-.48,3.48,.82],[.66,3.58,.65],[-2.95,1.4,1.2],[2.85,.7,.92],[-2.1,-2.8,.8]]){const Dt=J>3,at=K2(Dt?F:{...n,leaf:tt},t,bt,Dt);at.position.set(j,ms(j,J),J),at.rotation.y=t()*6.28,at.userData.baseRotation=at.rotation.z,this.plants.push(at),this.scene.add(at)}const X=new qs(.12,.26,1,2);X.rotateX(-Math.PI/2);const q=new Li({color:"#776443",roughness:.94,side:ii}),it=new Di(X,q,380),rt=new Mn;let O=0;for(let j=0;j<540&&O<380;j++){const J=(t()-.5)*28,bt=t()*-35+4;Kr(J,bt)<1.12||(rt.position.set(J,ms(J,bt)+.025,bt),rt.rotation.set((t()-.5)*.24,t()*6.28,(t()-.5)*.2),rt.scale.setScalar(.45+t()*1.6),rt.updateMatrix(),it.setMatrixAt(O++,rt.matrix))}it.count=O,this.scene.add(it),this.addFallenWood(n.bark),this.addUnderstory(),this.addSurroundingStand(n.bark),this.addBirds(),this.addSunrays(),this.addMotes()}auditRenderTargets(){this.scene.traverse(t=>{if(!(t instanceof Td))return;const n=t.shadow.map;if(!n||this.auditedTargets.has(n))return;if(n.texture.type!==Dn)throw new Error("Unexpected forest shadow color target type.");if(!io(this.renderer,n,"directional-pcf-shadow",this.targetPolicy.checks).complete)throw new Error("Forest shadow framebuffer is incomplete.");this.auditedTargets.add(n)}),Object.assign(this.canvas.dataset,{targetMode:this.targetPolicy.mode,halfFloatSupported:String(this.targetPolicy.halfFloatSupported),targetChecks:JSON.stringify(this.targetPolicy.checks)})}addUnderstory(){const t=new un;t.setAttribute("position",new Ee([-.026,0,0,.026,0,0,-.023,.33,.045,.023,.33,.045,-.012,.68,.13,.012,.68,.13,0,1,.27],3)),t.setIndex([0,1,2,1,3,2,2,3,4,3,5,4,4,5,6]),t.computeVertexNormals();const n=new Li({color:"#829656",roughness:.82,side:ii});n.onBeforeCompile=u=>{u.uniforms.forestTime=this.clock,u.vertexShader=`uniform float forestTime;
`+u.vertexShader,u.vertexShader=u.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float rootPhase=instanceMatrix[3].x*.72+instanceMatrix[3].z*.53;
        transformed.x+=sin(forestTime*.43+rootPhase)*.036*position.y*position.y;
        transformed.z+=sin(forestTime*.31+rootPhase*.71)*.026*position.y*position.y;`)},n.customProgramCacheKey=()=>"forest-rooted-grass-v1";const a=new Di(t,n,6e3),o=new Mn;let c=0;for(let u=0;u<190;u++){const f=(this.rng()-.5)*39,p=3-this.rng()*39;if(Kr(f,p)<1.08)continue;const d=.17+this.rng()*.45;for(let v=0;v<30;v++){const _=f+(this.rng()-.5)*1.65,g=p+(this.rng()-.5)*1.65;Kr(_,g)<1.08||(o.position.set(_,ms(_,g),g),o.rotation.set(0,this.rng()*6.28,0),o.scale.set(.55+this.rng()*.85,d*(.55+this.rng()),.8),o.updateMatrix(),a.setMatrixAt(c,o.matrix),a.setColorAt(c++,new ee().setHSL(.21+this.rng()*.06,.28+this.rng()*.2,.45+this.rng()*.2)))}}a.count=c,a.castShadow=!0,a.receiveShadow=!0,a.computeBoundingSphere(),this.scene.add(a)}addSurroundingStand(t){const n=lx(9187),a=[],o=ps(0,1,0),c=(f,p,d,v)=>{const _=p.clone().sub(f),g=new no(v,d,_.length(),7,3);g.applyQuaternion(new Wi().setFromUnitVectors(o,_.normalize())),g.translate(...f.clone().add(p).multiplyScalar(.5).toArray()),a.push(g)};for(let f=0;f<6;f++)for(let p=0;p<24;p++){const d=(p-11.5)*4.3+(n()-.5)*2.8,v=-9-f*9+(n()-.5)*4;if(Math.abs(d)<8.5)continue;const _=ps(d,ms(d,v)-.1,v),g=9+n()*13,x=.13+n()*.24,b=_.clone().add(ps((n()-.5)*1.7,g,(n()-.5)*1.3));c(_,b,x,.04);for(let w=0;w<3;w++){const y=_.clone().lerp(b,.45+w*.14),S=n()*6.28,C=1.8+n()*2.4;c(y,y.clone().add(ps(Math.cos(S)*C,1.3+n()*1.7,Math.sin(S)*C)),x*.22,.012)}}const u=new Ge(Eu(a),t);a.forEach(f=>f.dispose()),u.castShadow=!0,u.receiveShadow=!0,this.scene.add(u)}addWater(){const t=new Wx;for(let o=0;o<=100;o++){const c=o/100*Math.PI*2,u=1+.045*Math.sin(c*5)+.025*Math.sin(c*9),f=Math.cos(c)*2.6*u-.18,p=Math.sin(c)*3.48*u+.55;o===0?t.moveTo(f,p):t.lineTo(f,p)}const n={name:"ForestWater",uniforms:{color:{value:new ee("#719478")},tDiffuse:{value:null},textureMatrix:{value:new Se},time:{value:0},ripple:{value:new H(0,0,-100)}},vertexShader:"uniform mat4 textureMatrix; varying vec4 vReflection; varying vec3 vWorld; void main(){vReflection=textureMatrix*vec4(position,1.); vWorld=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`
        uniform sampler2D tDiffuse; uniform float time; uniform vec3 ripple; varying vec4 vReflection; varying vec3 vWorld;
        void main(){
          vec2 p=vWorld.xz; float age=time-ripple.z;float dist=length(p-ripple.xy);
          float pulse=sin(dist*26.-age*4.2)*exp(-pow((dist-age*.39)*2.5,2.))*exp(-age*.85)*step(0.,age);
          // Far reflections retain branch forms; near ripples carry more detail.
          float nearFlow=mix(.48,1.35,smoothstep(-3.,2.5,p.y));
          vec2 flow=vec2(sin(p.y*8.+time*.52)+sin(p.x*14.+p.y*3.+time*.37),cos(p.x*9.-time*.43))*.0016*nearFlow;
          vec2 uv=vReflection.xy/vReflection.w+flow+normalize(p-ripple.xy+.0001)*pulse*.004;
          vec3 reflected=texture2D(tDiffuse,uv).rgb;
          vec3 view=normalize(cameraPosition-vWorld);float fresnel=.24+.63*pow(1.-max(0.,view.y),3.);
          float caustic=pow(max(0.,sin(p.x*14.+sin(p.y*10.+time*.37))+cos(p.y*15.+time*.3))*.5,9.);
          vec3 bed=mix(vec3(.09,.14,.075),vec3(.22,.27,.15),.5+.5*sin(p.x*8.)*cos(p.y*12.));
          vec3 c=mix(bed,reflected,fresnel)+vec3(.47,.50,.27)*caustic*.11;
          c+=vec3(.13,.14,.10)*max(0.,pulse)*.32;
          gl_FragColor=vec4(c,.90);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`};this.reflection=new Bu(new Jp(t,48),{textureWidth:1024,textureHeight:1024,clipBias:.004,multisample:0,shader:n}),j2(this.renderer,this.reflection.getRenderTarget(),this.targetPolicy),this.reflection.rotation.x=-Math.PI/2,this.reflection.position.y=.075;const a=this.reflection.material;a.transparent=!0,a.depthWrite=!1,this.waterUniforms=a.uniforms,this.reflection.renderOrder=1,this.scene.add(this.reflection)}addFallenWood(t){const n=new no(.18,.24,3.6,16,8);n.rotateZ(Math.PI/2);const a=new Ge(n,t);a.position.set(-2.8,.59,-5.2),a.rotation.y=-.32,a.castShadow=!0,a.receiveShadow=!0,this.scene.add(a),this.solidSurfaces.push(a)}addBirds(){const t=new Li({color:"#6c6b4d",roughness:.86}),n=new Li({color:"#b6b393",roughness:.9}),a=new Li({color:"#202923",roughness:.28});for(const[o,c,u]of[[-1.68,.93,-5.42]]){const f=new La,p=new Ge(new vs(.12,10,8),t);p.scale.set(.8,1,1.35),f.add(p);const d=new Ge(new vs(.096,10,8),n);d.position.set(0,-.01,.06),d.scale.set(.76,.9,1),f.add(d);const v=new Ge(new vs(.075,10,8),t);v.position.set(0,.12,.08),f.add(v);const _=new Ge(new Nu(.021,.075,6),a);_.rotation.x=Math.PI/2,_.position.set(0,.12,.17),f.add(_);const g=new Ge(new Nu(.055,.24,5),t);g.rotation.x=-1.2,g.position.set(0,-.04,-.2),f.add(g);for(const x of[-.036,.036]){const b=new Ge(new no(.006,.004,.09,4),a);b.position.set(x,-.13,.01),f.add(b)}f.position.set(o,c,u),f.rotation.y=.65,this.birds.push(f),this.scene.add(f)}}addSunrays(){const t=new ai({transparent:!0,depthWrite:!1,side:ii,blending:wu,uniforms:{},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 vUv;void main(){float edge=pow(sin(vUv.x*3.14159),2.);float end=smoothstep(0.,.15,vUv.y)*(1.-smoothstep(.62,1.,vUv.y));gl_FragColor=vec4(.88,.84,.58,edge*end*.034);}"});for(let n=0;n<5;n++){const a=ps(5.3+n*.74,11,-14.5-n*1.5),o=ps(-3.2+n*.65,.1,3-n*.6),c=a.clone().add(o).multiplyScalar(.5),u=a.distanceTo(o),f=new Ge(new qs(.32+n*.16,u),t);f.position.copy(c),f.quaternion.setFromUnitVectors(ps(0,1,0),a.clone().sub(o).normalize()),this.scene.add(f)}}addMotes(){const t=[],n=[];for(let c=0;c<42;c++)t.push((this.rng()-.5)*15,this.rng()*6+.7,-this.rng()*25),n.push(this.rng()*6.28);const a=new un;a.setAttribute("position",new Ee(t,3)),a.setAttribute("phase",new Ee(n,1));const o=new ai({transparent:!0,depthWrite:!1,blending:wu,uniforms:{time:this.clock},vertexShader:"uniform float time;attribute float phase;varying float fade;void main(){vec3 p=position;p.x+=sin(time*.15+phase)*.17;p.y+=sin(time*.19+phase)*.13;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(14./-mv.z,1.,2.6);fade=.1+.15*pow(max(0.,sin(phase+time*.12)),2.);}",fragmentShader:"varying float fade;void main(){float a=1.-smoothstep(.08,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.9,.87,.65,a*fade);}"});this.scene.add(new Wb(a,o))}setSize(t,n,a){if(this.disposed)return;const o={width:Math.max(1,t),height:Math.max(1,n),ratio:z2(t,n,a)},c=this.requestedSize,u=this.canvas.parentElement;c&&c.width===o.width&&c.height===o.height&&c.ratio===o.ratio&&u===this.requestedHolder||(this.requestedSize=o,this.requestedHolder=u,this.staticDirty=!0,this.ready&&this.scheduler.renderFrame(0))}applySize(){const t=this.requestedSize;if(!t)return;const n=this.appliedSize;n&&n.width===t.width&&n.height===t.height&&n.ratio===t.ratio||(this.renderer.getPixelRatio()!==t.ratio&&this.renderer.setPixelRatio(t.ratio),this.renderer.setSize(t.width,t.height,!1),this.appliedSize=t,this.camera.aspect=t.width/t.height,this.camera.fov=this.camera.aspect<.8?66:this.camera.aspect>2?45:55,this.camera.updateProjectionMatrix(),this.canvas.dataset.dpr=String(this.renderer.getPixelRatio()))}renderFrame(t){!this.ready||this.disposed||t===0&&!this.staticDirty||this.scheduler.renderFrame(t)}drawFrame(t){this.applySize(),this.staticDirty=!1;const n=Math.max(0,Math.min(t,.05));this.time+=n,this.clock.value=this.time,this.look.update(Math.max(0,Math.min(t,1))),this.camera.lookAt(Math.sin(this.look.yaw)*14,1.65+this.look.pitch*14,-9),this.waterUniforms.time.value=this.time;for(let o=0;o<this.plants.length;o++){const c=this.plants[o],u=this.time-this.leafHitTime,f=c===this.leafHit&&u<5?Math.sin(u*5.5)*Math.exp(-u*1.15)*.045:0;c.rotation.z=(c.userData.baseRotation||0)+Math.sin(this.time*.48+o*1.8)*.007+f}for(let o=0;o<this.birds.length;o++)this.birds[o].rotation.y=.65+Math.sin(this.time*.21+o*2.1)*.09;const a=performance.now();this.renderer.info.reset(),this.renderer.render(this.scene,this.camera),this.frame++,this.canvas.dataset.cpuSubmissionMs=(performance.now()-a).toFixed(3),Object.assign(this.canvas.dataset,{frames:String(this.frame),time:this.time.toFixed(4),lookYaw:this.look.yaw.toFixed(5),lookPitch:this.look.pitch.toFixed(5),drawCalls:String(this.renderer.info.render.calls),triangles:String(this.renderer.info.render.triangles)}),this.auditRenderTargets()}start(){this.running||this.disposed||!this.ready||this.scheduler.state.fault||(this.running=!0,this.scheduler.start())}stop(){this.running=!1,this.scheduler.stop(),this.look.release()}drag(t,n){this.running&&this.look.drag(t,n)}releaseDrag(){this.look.release()}captureFrame(){return!this.ready||this.disposed?Promise.reject(new Error("Forest renderer is not ready.")):this.scheduler.capture()}setOnInteraction(t){this.onInteraction=t}touch(t,n){var f,p;if(!this.running||this.disposed)return;this.raycaster.setFromCamera(new qt(t,n),this.camera);const a=this.raycaster.intersectObjects(this.plants,!0)[0],o=this.raycaster.intersectObject(this.reflection)[0],c=Math.min((a==null?void 0:a.distance)??1/0,(o==null?void 0:o.distance)??1/0),u=this.raycaster.intersectObjects(this.solidSurfaces,!1)[0];if(!(u&&u.distance<c-.012))if(a&&(!o||a.distance<o.distance)){let d=a.object;for(;d.parent&&!this.plants.includes(d);)d=d.parent;this.leafHit=d,this.leafHitTime=this.time,this.canvas.dataset.leafHits=String(Number(this.canvas.dataset.leafHits)+1),(f=this.onInteraction)==null||f.call(this,{kind:"leaf",position:a.point.toArray(),strength:.18})}else o&&(this.waterUniforms.ripple.value.set(o.point.x,o.point.z,this.time),this.canvas.dataset.waterHits=String(Number(this.canvas.dataset.waterHits)+1),(p=this.onInteraction)==null||p.call(this,{kind:"water",position:o.point.toArray(),strength:.22}))}dispose(){var o;if(this.disposed)return;this.canvas.dataset.disposeStartedAt=String(performance.now()),this.disposed=!0,this.ready=!1,this.stop(),this.onInteraction=void 0,this.scheduler.dispose(),this.canvas.removeEventListener("webglcontextlost",this.onLost);const t=new Set,n=new Set,a=new Set;this.scene.traverse(c=>{var f;const u=c;if(u.geometry&&t.add(u.geometry),c instanceof Di&&c.dispose(),u.material)for(const p of Array.isArray(u.material)?u.material:[u.material])n.add(p);c instanceof Qp&&"shadow"in c&&((f=c.shadow)==null||f.dispose())});for(const c of n){for(const u of Object.values(c))u instanceof zn&&a.add(u);c.dispose()}t.forEach(c=>c.dispose()),a.forEach(c=>c.dispose()),(o=this.reflection)==null||o.getRenderTarget().dispose(),this.resources.forEach(c=>c.dispose()),this.renderer.renderLists.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.scene.clear(),this.canvas.dataset.disposed="true",this.canvas.dataset.disposeFinishedAt=String(performance.now())}}class a3 extends MM{constructor(){super({canvasClass:"forest-world-canvas",isSupported:()=>typeof window.WebGL2RenderingContext<"u",create:(t,n)=>new i3(t,n,{forceByteTargets:this.diagnosticByteTargets})}),this.diagnosticByteTargets=!1}configureDiagnosticTargets(t){if(this.engine)throw new Error("Choose the diagnostic target policy before acquiring the forest.");this.diagnosticByteTargets=t}configure(t){t.setOnInteraction(n=>{var o;const a=this.top;this.status==="ready"&&(a!=null&&a.running)&&((o=a.onInteraction)==null||o.call(a,n))})}touch(t,n,a){var o;this.top!==t||!t.running||this.status!=="ready"||(o=this.engine)==null||o.touch(Math.max(-1,Math.min(1,n)),Math.max(-1,Math.min(1,a)))}captureFrame(){if(!this.top||this.status!=="ready"||!this.engine)throw new Error("No ready forest holder.");return this.engine.captureFrame()}}const $r=new a3;function px({active:r,className:t,onInteraction:n}){const a=ze.useRef(null),o=ze.useRef(null),c=ze.useRef(null),u=ze.useRef(n);u.current=n;const[f,p]=ze.useState("loading"),d=yM(r);return ze.useEffect(()=>{if(!o.current)return;const v={mount:o.current,running:!1,onStatus:p,onInteraction:g=>{var x;return(x=u.current)==null?void 0:x.call(u,g)}};c.current=v;const _=$r.acquire(v);return()=>{c.current=null,_()}},[]),ze.useEffect(()=>{c.current&&$r.setRunning(c.current,d)},[d,f]),SM($r,a,c,d&&f==="ready"),ze.useEffect(()=>{const v=a.current,_=c.current;if(!d||f!=="ready"||!v||!_)return;let g=null;const x=S=>{!S.isPrimary||S.button!==0||g||(g={id:S.pointerId,x:S.clientX,y:S.clientY,moved:!1})},b=S=>{!g||S.pointerId!==g.id||Math.hypot(S.clientX-g.x,S.clientY-g.y)>6&&(g.moved=!0)},w=S=>{if(!g||S.pointerId!==g.id)return;const C=!g.moved&&Math.hypot(S.clientX-g.x,S.clientY-g.y)<=6;if(g=null,!C)return;const L=v.getBoundingClientRect();!L.width||!L.height||S.clientX<L.left||S.clientX>L.right||S.clientY<L.top||S.clientY>L.bottom||$r.touch(_,(S.clientX-L.left)/L.width*2-1,1-(S.clientY-L.top)/L.height*2)},y=()=>{g=null};return v.addEventListener("pointerdown",x),window.addEventListener("pointermove",b),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",y),window.addEventListener("blur",y),()=>{v.removeEventListener("pointerdown",x),window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",y),window.removeEventListener("blur",y),y()}},[d,f]),be.jsxs("div",{ref:a,className:`forest-world${t?` ${t}`:""}`,"data-state":f,"data-motion":d?"running":"paused","data-scene-surface":!0,role:"group","aria-label":"아침 숲: 이슬 맺힌 잎과 물가에 앉아 바라보는 숲속 쉼터",children:[be.jsx("div",{ref:o,className:"forest-world-mount"}),f==="loading"?be.jsx("span",{className:"forest-world-status",role:"status",children:"아침 숲을 준비하고 있어요"}):null,f==="failed"?be.jsxs("div",{className:"forest-world-fallback",role:"status",children:[be.jsx("span",{children:"아침 숲"}),be.jsx("p",{children:"이 기기에서 3D 장면을 표시하지 못했어요."}),be.jsx("p",{children:"세션은 계속 이용할 수 있어요."})]}):null]})}$r.configureDiagnosticTargets(new URLSearchParams(window.location.search).get("byte")==="1");const s3=`
  html, body, #forest-harness-root { margin: 0; width: 100%; height: 100%; overflow: hidden; }
  .forest-harness { position: fixed; inset: 0; background: #263a2c; color: #edf0df; font-family: system-ui, sans-serif; }
  .forest-harness-viewport { position: absolute; inset: 0; display: grid; place-items: safe center; overflow: auto; background: #142017; }
  .forest-harness-frame { position: relative; flex: none; overflow: hidden; background: #263a2c; }
  .forest-harness-stage { position: absolute; inset: 0; }
  .forest-harness-overlay { position: absolute; inset: 0; z-index: 2; }
  .forest-harness-controls { position: fixed; z-index: 5; top: 12px; left: 12px; right: 12px; width: fit-content; max-width: calc(100% - 48px); padding: 12px; border: 1px solid #bacaab40; border-radius: 12px; background: #0d2114cb; box-shadow: 0 6px 24px #09100d30; backdrop-filter: blur(10px); }
  .forest-harness-controls h1 { font-size: 14px; font-weight: 550; margin: 0 0 8px; letter-spacing: .03em; }
  .forest-harness-controls p { font-size: 11px; margin: 6px 0 0; line-height: 1.5; }
  .forest-harness-actions { display: flex; gap: 5px; flex-wrap: wrap; }
  .forest-harness-controls button { color: inherit; background: #e3ecca14; padding: 6px 9px; border: 1px solid #d9e8ba44; border-radius: 5px; cursor: pointer; font: inherit; font-size: 11px; }
  .forest-harness-controls button:focus-visible { outline: 2px solid #e0dda6; outline-offset: 2px; }
  .forest-harness-controls button:disabled { opacity: .45; cursor: wait; }
  .forest-harness-controls button[aria-pressed='true'] { background: #e3ecca2c; }
  .forest-harness-controls .forest-harness-actions + .forest-harness-actions { margin-top: 6px; }
  .forest-harness-controls output { display: block; font-size: 10px; margin-top: 7px; opacity: .8; }
  .forest-harness-controls pre { margin: 8px 0 0; max-height: 200px; width: min(600px, calc(100vw - 78px)); overflow: auto; white-space: pre-wrap; font-size: 10px; line-height: 1.4; }
  .forest-harness-empty { position: absolute; top: 50%; width: 100%; text-align: center; }
  .forest-harness[data-capture='true'] .forest-harness-controls { display: none; }
`,Hi=r=>new Promise(t=>window.setTimeout(t,r));async function gi(r,t,n=15e3){const a=performance.now();for(;!r();){if(performance.now()-a>n)throw new Error(t);await Hi(80)}}function qr(r){return{...r.dataset,cssWidth:r.clientWidth,cssHeight:r.clientHeight,width:r.width,height:r.height}}function gs(r,t,n,a){r.dispatchEvent(new PointerEvent(t,{bubbles:!0,cancelable:!0,composed:!0,pointerId:7101,isPrimary:!0,pointerType:"touch",button:0,buttons:t==="pointerup"||t==="pointercancel"?0:1,clientX:n,clientY:a}))}function dl(r,t,n){const a=r.getBoundingClientRect(),o=a.left+a.width*t,c=a.top+a.height*n;gs(r,"pointerdown",o,c),gs(window,"pointerup",o,c)}function r3(){const r=new URLSearchParams(window.location.search),[t,n]=ze.useState(()=>r.get("paused")!=="1"),[a,o]=ze.useState(!0),[c,u]=ze.useState(!1),[f,p]=ze.useState(!1),[d,v]=ze.useState({main:0,second:0}),_=ze.useRef({main:0,second:0}),[g,x]=ze.useState(null),b=r.get("capture")==="1",w=r.get("viewport"),[y,S]=ze.useState(w==="portrait"||w==="landscape"?w:"desktop"),[C,L]=ze.useState(!1),A=ze.useRef(!1),[U,N]=ze.useState(null),I=ze.useRef(null),[T,P]=ze.useState([]),B=ze.useRef([]),[W,G]=ze.useState(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);ze.useEffect(()=>{const q=document.querySelector(".forest-harness"),it=rt=>{const O=rt.detail;if(O)try{O.result=$r.captureFrame()}catch(et){O.error=et instanceof Error?et.message:String(et)}};return q==null||q.addEventListener("forest:diagnostic-capture",it),()=>q==null?void 0:q.removeEventListener("forest:diagnostic-capture",it)},[]),ze.useEffect(()=>{const q=document.documentElement.classList.contains("reduce-motion");return()=>{document.documentElement.classList.toggle("reduce-motion",q)}},[]),ze.useEffect(()=>{document.documentElement.classList.toggle("reduce-motion",f)},[f]),ze.useEffect(()=>{const q=window.matchMedia("(prefers-reduced-motion: reduce)"),it=()=>G(q.matches);return q.addEventListener("change",it),()=>q.removeEventListener("change",it)},[]),ze.useEffect(()=>{let q=null;const it=O=>{B.current=[...B.current.slice(-19),O],P(B.current)},rt=()=>{const O=document.querySelector(".forest-world-canvas"),et=O?Number(O.dataset.frames):void 0,j=O?Number(O.dataset.time):void 0,J=document.documentElement.dataset.forestVisibilitySimulation==="ci-hook-test",bt={state:document.visibilityState,at:new Date().toISOString(),frames:et,time:j,...J?{simulated:!0}:{}};document.hidden&&O&&et!==void 0&&j!==void 0?(q={canvas:O,frames:et,time:j,at:performance.now()},bt.note=J?"CI-only simulated hidden hook check; not actual tab visibility.":"Real browser visibilitychange; no hidden property override."):!document.hidden&&q&&(bt.durationMs=Math.round(performance.now()-q.at),O===q.canvas&&et!==void 0&&j!==void 0?(bt.framesDelta=et-q.frames,bt.timeDelta=Number((j-q.time).toFixed(4)),bt.durationMs>=800?bt.passed=bt.framesDelta<=2&&bt.timeDelta<=.1:bt.note="Visibility interval shorter than 800 ms; no pause verdict."):bt.note="Canvas changed while hidden; no pause verdict.",q=null),it(bt)};return document.addEventListener("visibilitychange",rt),()=>document.removeEventListener("visibilitychange",rt)},[]);const $=(q,it)=>{_.current={..._.current,[q]:_.current[q]+1},v(_.current),x({holder:q,event:it})},V=async()=>{if(A.current)return;A.current=!0,L(!0);const q={status:"running",startedAt:new Date().toISOString(),method:"In-page DOM PointerEvent assertions through the component handlers. No direct engine calls. Synthetic gestures are not physical-device testing.",environment:{viewportPreset:y,window:[window.innerWidth,window.innerHeight],devicePixelRatio:window.devicePixelRatio,osReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,osReducedMotionTest:"Observed actual media query only; OS emulation is not performed by this harness.",visibilityTest:"Requires a real tab hide/show cycle; see visibilitySamples. No document.hidden override.",userAgent:navigator.userAgent},checks:[]},it=()=>{I.current={...q,checks:[...q.checks]},N(I.current)},rt=(J,bt,Dt)=>{q.checks.push({name:J,passed:bt,detail:Dt}),it()};it();const O=()=>document.querySelector(".forest-world-canvas"),et=()=>!!document.querySelector('.forest-world[data-state="ready"] .forest-world-canvas'),j=()=>{var J;return((J=O())==null?void 0:J.dataset.running)==="true"};try{if(u(!1),o(!0),p(!1),n(!0),q.environment.osReducedMotion)throw new Error("The actual OS reduced-motion preference is on. Turn it off before running motion assertions; the harness will not override it.");await gi(()=>et()&&j(),"The 3D scene did not become ready/running. Inspect fallback and console.",9e4);const J=O();rt("Actual rendered 3D canvas",J.width>0&&J.height>0&&Number(J.dataset.frames)>0&&Number(J.dataset.triangles)>0,qr(J));const bt=Number(J.dataset.frames),Dt=Number(J.dataset.time),at=performance.now();await gi(()=>Number(J.dataset.frames)>bt&&Number(J.dataset.time)>Dt,"Active scene did not advance a frame and simulation time.",3e4);const pt=Number(J.dataset.frames)-bt;rt("Active animation advances",pt>0&&Number(J.dataset.time)>Dt,{frameDelta:pt,timeDelta:Number(J.dataset.time)-Dt,observedMs:Math.round(performance.now()-at),observedFPS:Number((pt*1e3/(performance.now()-at)).toFixed(1))});const Tt={water:Number(J.dataset.waterHits),leaf:Number(J.dataset.leafHits)},It={};for(const Y of[.62,.78,.9,.48,.36,.97]){for(const wt of[.5,.3,.7,.15,.85,.05,.95]){const xt=Number(J.dataset.waterHits),Ut=Number(J.dataset.leafHits);if(dl(J,wt,Y),Number(J.dataset.waterHits)>xt&&(It.water=[wt,Y]),Number(J.dataset.leafHits)>Ut&&(It.leaf=[wt,Y]),await Hi(30),It.water&&It.leaf)break}if(It.water&&It.leaf)break}rt("Water touch through DOM raycast",Number(J.dataset.waterHits)>Tt.water,{before:Tt.water,after:Number(J.dataset.waterHits),screenFraction:It.water}),rt("Leaf touch through DOM raycast",Number(J.dataset.leafHits)>Tt.leaf,{before:Tt.leaf,after:Number(J.dataset.leafHits),screenFraction:It.leaf});const At=It.water??It.leaf??[.5,.78],$t=J.getBoundingClientRect(),Oe=$t.left+$t.width*At[0],ne=$t.top+$t.height*At[1];for(const Y of["pointercancel","blur"]){const wt=_.current.main;gs(J,"pointerdown",Oe,ne),Y==="pointercancel"?gs(window,"pointercancel",Oe,ne):window.dispatchEvent(new Event("blur")),gs(window,"pointerup",Oe,ne),await Hi(40),rt(`Tap ${Y} cancellation rejects callback`,_.current.main===wt,{before:wt,after:_.current.main,simulatedDOMEvent:!0})}n(!1),await gi(()=>J.dataset.running==="false","Active=false did not stop the engine."),await Hi(200);const me=J.dataset.frames,De=J.dataset.time,ue=_.current.main;dl(J,...At),await Hi(700),rt("Active=false freezes animation and rejects touches",J.dataset.frames===me&&J.dataset.time===De&&_.current.main===ue,{before:{frames:me,time:De,callbacks:ue},after:{...qr(J),callbacks:_.current.main}}),n(!0),await gi(j,"Animation did not resume after active=true."),p(!0),await gi(()=>document.documentElement.classList.contains("reduce-motion")&&J.dataset.running==="false","App reduced-motion class did not stop the engine."),await Hi(200);const He=J.dataset.frames,$e=J.dataset.time,fn=_.current.main;dl(J,...At),await Hi(700),rt("App reduced-motion freezes animation and rejects touches",J.dataset.frames===He&&J.dataset.time===$e&&_.current.main===fn,{before:{frames:He,time:$e,callbacks:fn},after:{...qr(J),callbacks:_.current.main}}),p(!1),await gi(j,"Animation did not resume after reduced-motion was disabled.");const Re=J.getBoundingClientRect(),je=Re.left+Re.width*.48,Q=Re.top+Re.height*.48,Te=Math.min(Re.width,Re.height),Ce=_.current.main;gs(J,"pointerdown",je,Q),gs(window,"pointermove",je+Te*.22,Q+Te*.04),await gi(()=>Math.abs(Number(J.dataset.lookYaw))>.009,"DOM drag did not move the camera.",3e4);const z=Math.abs(Number(J.dataset.lookYaw));gs(window,"pointerup",je+Te*.22,Q+Te*.04),await Hi(120);const E=Math.abs(Number(J.dataset.lookYaw));rt("Gentle drag changes view without a tap",z>.009&&_.current.main===Ce,{peakYaw:z,callbacksBefore:Ce,callbacksAfter:_.current.main}),await gi(()=>Math.abs(Number(J.dataset.lookYaw))<z*.65,"Camera did not slowly return after drag release.",12e4),rt("View returns gradually after release",E>z*.5&&Math.abs(Number(J.dataset.lookYaw))<z*.65,{peakYaw:z,yaw120msAfterRelease:E,finalYaw:Number(J.dataset.lookYaw)});const nt={..._.current};u(!0),await gi(()=>document.querySelector('[data-testid="second-holder"] .forest-world-canvas')===J&&j(),"Second holder did not acquire the shared canvas.");const ft=document.querySelector('[data-testid="main-holder"] .forest-world');dl(ft,...At),await Hi(80);const gt=_.current.main===nt.main&&_.current.second===nt.second;dl(J,...At),await Hi(100),rt("One shared canvas; only top holder gets callbacks",document.querySelectorAll(".forest-world-canvas").length===1&&gt&&_.current.main===nt.main&&_.current.second>nt.second,{sameCanvas:document.querySelector('[data-testid="second-holder"] .forest-world-canvas')===J,ignoredCoveredHolder:gt,before:nt,after:{..._.current}}),u(!1),await gi(()=>document.querySelector('[data-testid="main-holder"] .forest-world-canvas')===J&&j(),"Closing the second holder did not return the shared canvas."),rt("Closing second holder returns the same canvas",document.querySelector('[data-testid="main-holder"] .forest-world-canvas')===J,qr(J));let Rt=null;const Lt=()=>{Rt=performance.now()};J.addEventListener("webglcontextlost",Lt);const vt=performance.now(),_t=[];let Ct=performance.now();const Bt=window.setInterval(()=>{const Y=performance.now();_t.push(Y-Ct),Ct=Y},100);o(!1),await gi(()=>!O()&&J.dataset.running==="false","Unmount did not stop and detach the canvas.");const Ot=performance.now(),Nt=J.dataset.frames;await Hi(5500),window.clearInterval(Bt),J.removeEventListener("webglcontextlost",Lt),rt("Clean no-capture lifecycle: host grace and actual disposal events",J.dataset.disposed==="true"&&J.dataset.running==="false"&&J.dataset.frames===Nt,{configuredHostGraceMs:5e3,removalRequestedAt:vt,removalObservedAt:Ot,disposeEntryAt:Number(J.dataset.disposeStartedAt)||null,disposeExitAt:Number(J.dataset.disposeFinishedAt)||null,contextLostAt:Rt,heartbeatMaxIntervalMs:Math.max(0,..._t),observationAt:performance.now(),...qr(J),meaning:"5000 ms is the host retention timer, not a guarantee of GPU resource completion. The independent unit test proves that timer contract."}),o(!0),await gi(()=>et()&&j()&&O()!==J,"Remount did not create a fresh ready engine.",9e4);const Wt=O(),jt=Number(Wt.dataset.frames),ae=Number(Wt.dataset.time);await gi(()=>Number(Wt.dataset.frames)>jt&&Number(Wt.dataset.time)>ae,"Remounted engine did not advance a frame and simulation time.",3e4),rt("Remount creates a fresh working engine",Wt!==J&&Number(Wt.dataset.frames)>jt&&Number(Wt.dataset.time)>ae,qr(Wt))}catch(J){rt("QA sequence completed",!1,J instanceof Error?J.message:String(J))}finally{o(!0),u(!1),p(!1),n(!0),q.finishedAt=new Date().toISOString(),q.status=q.checks.length>0&&q.checks.every(J=>J.passed)?"passed":"failed",it(),A.current=!1,L(!1)}},tt=()=>{const q={report:I.current,visibilitySamples:B.current,actualOSReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches},it=URL.createObjectURL(new Blob([JSON.stringify(q,null,2)],{type:"application/json"})),rt=document.createElement("a");rt.href=it,rt.download="forest-browser-qa.json",rt.click(),window.setTimeout(()=>URL.revokeObjectURL(it),1e3)},F=y==="portrait"?{width:344,height:800}:y==="landscape"?{width:882,height:344}:{width:"100%",height:"100%"},X=T.filter(q=>q.passed===!0&&!q.simulated).length;return be.jsxs("div",{className:"forest-harness","data-capture":b,"data-active":t,"data-mounted":a,"data-reduced":f,"data-second":c,"data-viewport":y,"data-qa-state":(U==null?void 0:U.status)??"idle",children:[be.jsx("style",{children:s3}),be.jsx("div",{className:"forest-harness-viewport",children:be.jsxs("div",{className:"forest-harness-frame","data-testid":"scene-frame",style:F,children:[be.jsx("main",{className:"forest-harness-stage","data-testid":"main-holder",children:a?be.jsx(px,{active:t,onInteraction:q=>$("main",q)}):be.jsx("p",{className:"forest-harness-empty",children:"Scene unmounted"})}),a&&c?be.jsx("section",{className:"forest-harness-overlay","aria-label":"Fullscreen holder","data-testid":"second-holder",children:be.jsx(px,{active:t,onInteraction:q=>$("second",q)})}):null]})}),be.jsxs("aside",{className:"forest-harness-controls","aria-label":"Scene verification controls",children:[be.jsx("h1",{children:"아침 숲 · 독립 3D 검증"}),be.jsxs("div",{className:"forest-harness-actions",children:[be.jsx("button",{disabled:C,type:"button","data-testid":"active-toggle","aria-pressed":t,onClick:()=>n(q=>!q),children:t?"Pause":"Play"}),be.jsxs("button",{disabled:C,type:"button","data-testid":"motion-toggle","aria-pressed":f,onClick:()=>p(q=>!q),children:["Reduced motion ",f?"on":"off"]}),be.jsxs("button",{disabled:C,type:"button","data-testid":"holder-toggle","aria-pressed":c,onClick:()=>u(q=>!q),children:["Second holder ",c?"on":"off"]}),be.jsx("button",{disabled:C,type:"button","data-testid":"mount-toggle","aria-pressed":a,onClick:()=>o(q=>!q),children:a?"Unmount":"Mount"})]}),be.jsxs("div",{className:"forest-harness-actions",children:[be.jsx("button",{disabled:C,type:"button","data-testid":"viewport-desktop","aria-pressed":y==="desktop",onClick:()=>S("desktop"),children:"Desktop"}),be.jsx("button",{disabled:C,type:"button","data-testid":"viewport-portrait","aria-pressed":y==="portrait",onClick:()=>S("portrait"),children:"Fold 344×800"}),be.jsx("button",{disabled:C,type:"button","data-testid":"viewport-landscape","aria-pressed":y==="landscape",onClick:()=>S("landscape"),children:"Fold 882×344"}),be.jsx("button",{disabled:C,type:"button","data-testid":"qa-run",onClick:()=>void V(),children:C?"Running QA…":"Run lifecycle QA"}),be.jsx("button",{type:"button","data-testid":"qa-download",onClick:tt,children:"Download JSON"})]}),be.jsx("p",{children:"조금 드래그하면 시선이 움직이고 천천히 돌아옵니다. 가까운 잎이나 물을 가볍게 눌러 보세요."}),be.jsxs("output",{"data-testid":"interaction-status","data-main-events":d.main,"data-second-events":d.second,"data-event-holder":(g==null?void 0:g.holder)??"","data-event-kind":(g==null?void 0:g.event.kind)??"",children:["Events main ",d.main," / second ",d.second,g?` · ${g.holder}: ${g.event.kind} ${g.event.strength.toFixed(2)}`:" · no audio created"]}),be.jsxs("output",{"data-testid":"visibility-status","data-hidden-passes":X,"data-os-reduced":W,children:["Real hidden cycles passed: ",X," · actual OS reduced motion: ",String(W)," (observed only)"]}),be.jsxs("output",{"data-testid":"qa-status","data-state":(U==null?void 0:U.status)??"idle","data-passed":(U==null?void 0:U.checks.filter(q=>q.passed).length)??0,"data-failed":(U==null?void 0:U.checks.filter(q=>!q.passed).length)??0,children:["QA: ",(U==null?void 0:U.status)??"not run",U?` · ${U.checks.filter(q=>q.passed).length}/${U.checks.length} passed`:""]}),U||T.length?be.jsx("pre",{"data-testid":"qa-report",children:JSON.stringify({report:U,visibilitySamples:T},null,2)}):null]})]})}xM.createRoot(document.getElementById("forest-harness-root")).render(be.jsx(ze.StrictMode,{children:be.jsx(r3,{})}));
