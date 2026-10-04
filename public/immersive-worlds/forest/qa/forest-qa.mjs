var Nh={exports:{}},Xo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mv;function qy(){if(Mv)return Xo;Mv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var h in o)h!=="key"&&(c[h]=o[h])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return Xo.Fragment=t,Xo.jsx=n,Xo.jsxs=n,Xo}var Ev;function Yy(){return Ev||(Ev=1,Nh.exports=qy()),Nh.exports}var je=Yy(),Oh={exports:{}},se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bv;function Zy(){if(bv)return se;bv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function x(I){return I===null||typeof I!="object"?null:(I=v&&I[v]||I["@@iterator"],typeof I=="function"?I:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,M={};function S(I,$,gt){this.props=I,this.context=$,this.refs=M,this.updater=gt||E}S.prototype.isReactComponent={},S.prototype.setState=function(I,$){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,$,"setState")},S.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function L(){}L.prototype=S.prototype;function N(I,$,gt){this.props=I,this.context=$,this.refs=M,this.updater=gt||E}var A=N.prototype=new L;A.constructor=N,w(A,S.prototype),A.isPureReactComponent=!0;var D=Array.isArray;function U(){}var P={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function O(I,$,gt){var Et=gt.ref;return{$$typeof:r,type:I,key:$,ref:Et!==void 0?Et:null,props:gt}}function F(I,$){return O(I.type,$,I.props)}function Y(I){return typeof I=="object"&&I!==null&&I.$$typeof===r}function V(I){var $={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function(gt){return $[gt]})}var tt=/\/+/g;function k(I,$){return typeof I=="object"&&I!==null&&I.key!=null?V(""+I.key):$.toString(36)}function j(I){switch(I.status){case"fulfilled":return I.value;case"rejected":throw I.reason;default:switch(typeof I.status=="string"?I.then(U,U):(I.status="pending",I.then(function($){I.status==="pending"&&(I.status="fulfilled",I.value=$)},function($){I.status==="pending"&&(I.status="rejected",I.reason=$)})),I.status){case"fulfilled":return I.value;case"rejected":throw I.reason}}throw I}function B(I,$,gt,Et,Lt){var kt=typeof I;(kt==="undefined"||kt==="boolean")&&(I=null);var at=!1;if(I===null)at=!0;else switch(kt){case"bigint":case"string":case"number":at=!0;break;case"object":switch(I.$$typeof){case r:case t:at=!0;break;case g:return at=I._init,B(at(I._payload),$,gt,Et,Lt)}}if(at)return Lt=Lt(I),at=Et===""?"."+k(I,0):Et,D(Lt)?(gt="",at!=null&&(gt=at.replace(tt,"$&/")+"/"),B(Lt,$,gt,"",function(te){return te})):Lt!=null&&(Y(Lt)&&(Lt=F(Lt,gt+(Lt.key==null||I&&I.key===Lt.key?"":(""+Lt.key).replace(tt,"$&/")+"/")+at)),$.push(Lt)),1;at=0;var vt=Et===""?".":Et+":";if(D(I))for(var Tt=0;Tt<I.length;Tt++)Et=I[Tt],kt=vt+k(Et,Tt),at+=B(Et,$,gt,kt,Lt);else if(Tt=x(I),typeof Tt=="function")for(I=Tt.call(I),Tt=0;!(Et=I.next()).done;)Et=Et.value,kt=vt+k(Et,Tt++),at+=B(Et,$,gt,kt,Lt);else if(kt==="object"){if(typeof I.then=="function")return B(j(I),$,gt,Et,Lt);throw $=String(I),Error("Objects are not valid as a React child (found: "+($==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":$)+"). If you meant to render a collection of children, use an array instead.")}return at}function W(I,$,gt){if(I==null)return I;var Et=[],Lt=0;return B(I,Et,"","",function(kt){return $.call(gt,kt,Lt++)}),Et}function ct(I){if(I._status===-1){var $=I._result;$=$(),$.then(function(gt){(I._status===0||I._status===-1)&&(I._status=1,I._result=gt)},function(gt){(I._status===0||I._status===-1)&&(I._status=2,I._result=gt)}),I._status===-1&&(I._status=0,I._result=$)}if(I._status===1)return I._result.default;throw I._result}var rt=typeof reportError=="function"?reportError:function(I){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var $=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof I=="object"&&I!==null&&typeof I.message=="string"?String(I.message):String(I),error:I});if(!window.dispatchEvent($))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",I);return}console.error(I)},ht={map:W,forEach:function(I,$,gt){W(I,function(){$.apply(this,arguments)},gt)},count:function(I){var $=0;return W(I,function(){$++}),$},toArray:function(I){return W(I,function($){return $})||[]},only:function(I){if(!Y(I))throw Error("React.Children.only expected to receive a single React element child.");return I}};return se.Activity=_,se.Children=ht,se.Component=S,se.Fragment=n,se.Profiler=o,se.PureComponent=N,se.StrictMode=a,se.Suspense=m,se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,se.__COMPILER_RUNTIME={__proto__:null,c:function(I){return P.H.useMemoCache(I)}},se.cache=function(I){return function(){return I.apply(null,arguments)}},se.cacheSignal=function(){return null},se.cloneElement=function(I,$,gt){if(I==null)throw Error("The argument must be a React element, but you passed "+I+".");var Et=w({},I.props),Lt=I.key;if($!=null)for(kt in $.key!==void 0&&(Lt=""+$.key),$)!b.call($,kt)||kt==="key"||kt==="__self"||kt==="__source"||kt==="ref"&&$.ref===void 0||(Et[kt]=$[kt]);var kt=arguments.length-2;if(kt===1)Et.children=gt;else if(1<kt){for(var at=Array(kt),vt=0;vt<kt;vt++)at[vt]=arguments[vt+2];Et.children=at}return O(I.type,Lt,Et)},se.createContext=function(I){return I={$$typeof:u,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null},I.Provider=I,I.Consumer={$$typeof:c,_context:I},I},se.createElement=function(I,$,gt){var Et,Lt={},kt=null;if($!=null)for(Et in $.key!==void 0&&(kt=""+$.key),$)b.call($,Et)&&Et!=="key"&&Et!=="__self"&&Et!=="__source"&&(Lt[Et]=$[Et]);var at=arguments.length-2;if(at===1)Lt.children=gt;else if(1<at){for(var vt=Array(at),Tt=0;Tt<at;Tt++)vt[Tt]=arguments[Tt+2];Lt.children=vt}if(I&&I.defaultProps)for(Et in at=I.defaultProps,at)Lt[Et]===void 0&&(Lt[Et]=at[Et]);return O(I,kt,Lt)},se.createRef=function(){return{current:null}},se.forwardRef=function(I){return{$$typeof:h,render:I}},se.isValidElement=Y,se.lazy=function(I){return{$$typeof:g,_payload:{_status:-1,_result:I},_init:ct}},se.memo=function(I,$){return{$$typeof:d,type:I,compare:$===void 0?null:$}},se.startTransition=function(I){var $=P.T,gt={};P.T=gt;try{var Et=I(),Lt=P.S;Lt!==null&&Lt(gt,Et),typeof Et=="object"&&Et!==null&&typeof Et.then=="function"&&Et.then(U,rt)}catch(kt){rt(kt)}finally{$!==null&&gt.types!==null&&($.types=gt.types),P.T=$}},se.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},se.use=function(I){return P.H.use(I)},se.useActionState=function(I,$,gt){return P.H.useActionState(I,$,gt)},se.useCallback=function(I,$){return P.H.useCallback(I,$)},se.useContext=function(I){return P.H.useContext(I)},se.useDebugValue=function(){},se.useDeferredValue=function(I,$){return P.H.useDeferredValue(I,$)},se.useEffect=function(I,$){return P.H.useEffect(I,$)},se.useEffectEvent=function(I){return P.H.useEffectEvent(I)},se.useId=function(){return P.H.useId()},se.useImperativeHandle=function(I,$,gt){return P.H.useImperativeHandle(I,$,gt)},se.useInsertionEffect=function(I,$){return P.H.useInsertionEffect(I,$)},se.useLayoutEffect=function(I,$){return P.H.useLayoutEffect(I,$)},se.useMemo=function(I,$){return P.H.useMemo(I,$)},se.useOptimistic=function(I,$){return P.H.useOptimistic(I,$)},se.useReducer=function(I,$,gt){return P.H.useReducer(I,$,gt)},se.useRef=function(I){return P.H.useRef(I)},se.useState=function(I){return P.H.useState(I)},se.useSyncExternalStore=function(I,$,gt){return P.H.useSyncExternalStore(I,$,gt)},se.useTransition=function(){return P.H.useTransition()},se.version="19.2.7",se}var Tv;function fp(){return Tv||(Tv=1,Oh.exports=Zy()),Oh.exports}var xn=fp(),Ph={exports:{}},Wo={},Ih={exports:{}},zh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Av;function Ky(){return Av||(Av=1,(function(r){function t(B,W){var ct=B.length;B.push(W);t:for(;0<ct;){var rt=ct-1>>>1,ht=B[rt];if(0<o(ht,W))B[rt]=W,B[ct]=ht,ct=rt;else break t}}function n(B){return B.length===0?null:B[0]}function a(B){if(B.length===0)return null;var W=B[0],ct=B.pop();if(ct!==W){B[0]=ct;t:for(var rt=0,ht=B.length,I=ht>>>1;rt<I;){var $=2*(rt+1)-1,gt=B[$],Et=$+1,Lt=B[Et];if(0>o(gt,ct))Et<ht&&0>o(Lt,gt)?(B[rt]=Lt,B[Et]=ct,rt=Et):(B[rt]=gt,B[$]=ct,rt=$);else if(Et<ht&&0>o(Lt,ct))B[rt]=Lt,B[Et]=ct,rt=Et;else break t}}return W}function o(B,W){var ct=B.sortIndex-W.sortIndex;return ct!==0?ct:B.id-W.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,h=u.now();r.unstable_now=function(){return u.now()-h}}var m=[],d=[],g=1,_=null,v=3,x=!1,E=!1,w=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function A(B){for(var W=n(d);W!==null;){if(W.callback===null)a(d);else if(W.startTime<=B)a(d),W.sortIndex=W.expirationTime,t(m,W);else break;W=n(d)}}function D(B){if(w=!1,A(B),!E)if(n(m)!==null)E=!0,U||(U=!0,V());else{var W=n(d);W!==null&&j(D,W.startTime-B)}}var U=!1,P=-1,b=5,O=-1;function F(){return M?!0:!(r.unstable_now()-O<b)}function Y(){if(M=!1,U){var B=r.unstable_now();O=B;var W=!0;try{t:{E=!1,w&&(w=!1,L(P),P=-1),x=!0;var ct=v;try{e:{for(A(B),_=n(m);_!==null&&!(_.expirationTime>B&&F());){var rt=_.callback;if(typeof rt=="function"){_.callback=null,v=_.priorityLevel;var ht=rt(_.expirationTime<=B);if(B=r.unstable_now(),typeof ht=="function"){_.callback=ht,A(B),W=!0;break e}_===n(m)&&a(m),A(B)}else a(m);_=n(m)}if(_!==null)W=!0;else{var I=n(d);I!==null&&j(D,I.startTime-B),W=!1}}break t}finally{_=null,v=ct,x=!1}W=void 0}}finally{W?V():U=!1}}}var V;if(typeof N=="function")V=function(){N(Y)};else if(typeof MessageChannel<"u"){var tt=new MessageChannel,k=tt.port2;tt.port1.onmessage=Y,V=function(){k.postMessage(null)}}else V=function(){S(Y,0)};function j(B,W){P=S(function(){B(r.unstable_now())},W)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return v},r.unstable_next=function(B){switch(v){case 1:case 2:case 3:var W=3;break;default:W=v}var ct=v;v=W;try{return B()}finally{v=ct}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(B,W){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var ct=v;v=B;try{return W()}finally{v=ct}},r.unstable_scheduleCallback=function(B,W,ct){var rt=r.unstable_now();switch(typeof ct=="object"&&ct!==null?(ct=ct.delay,ct=typeof ct=="number"&&0<ct?rt+ct:rt):ct=rt,B){case 1:var ht=-1;break;case 2:ht=250;break;case 5:ht=1073741823;break;case 4:ht=1e4;break;default:ht=5e3}return ht=ct+ht,B={id:g++,callback:W,priorityLevel:B,startTime:ct,expirationTime:ht,sortIndex:-1},ct>rt?(B.sortIndex=ct,t(d,B),n(m)===null&&B===n(d)&&(w?(L(P),P=-1):w=!0,j(D,ct-rt))):(B.sortIndex=ht,t(m,B),E||x||(E=!0,U||(U=!0,V()))),B},r.unstable_shouldYield=F,r.unstable_wrapCallback=function(B){var W=v;return function(){var ct=v;v=W;try{return B.apply(this,arguments)}finally{v=ct}}}})(zh)),zh}var Rv;function Jy(){return Rv||(Rv=1,Ih.exports=Ky()),Ih.exports}var Bh={exports:{}},In={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wv;function Qy(){if(wv)return In;wv=1;var r=fp();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)d+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,d,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:m,containerInfo:d,implementation:g}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,In.createPortal=function(m,d){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(m,d,null,g)},In.flushSync=function(m){var d=u.T,g=a.p;try{if(u.T=null,a.p=2,m)return m()}finally{u.T=d,a.p=g,a.d.f()}},In.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,a.d.C(m,d))},In.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},In.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var g=d.as,_=h(g,d.crossOrigin),v=typeof d.integrity=="string"?d.integrity:void 0,x=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;g==="style"?a.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:x}):g==="script"&&a.d.X(m,{crossOrigin:_,integrity:v,fetchPriority:x,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},In.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var g=h(d.as,d.crossOrigin);a.d.M(m,{crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&a.d.M(m)},In.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var g=d.as,_=h(g,d.crossOrigin);a.d.L(m,g,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},In.preloadModule=function(m,d){if(typeof m=="string")if(d){var g=h(d.as,d.crossOrigin);a.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else a.d.m(m)},In.requestFormReset=function(m){a.d.r(m)},In.unstable_batchedUpdates=function(m,d){return m(d)},In.useFormState=function(m,d,g){return u.H.useFormState(m,d,g)},In.useFormStatus=function(){return u.H.useHostTransitionStatus()},In.version="19.2.7",In}var Cv;function jy(){if(Cv)return Bh.exports;Cv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Bh.exports=Qy(),Bh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dv;function $y(){if(Dv)return Wo;Dv=1;var r=Jy(),t=fp(),n=jy();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function u(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(a(188))}function d(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,l=i;;){var f=s.return;if(f===null)break;var p=f.alternate;if(p===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===p.child){for(p=f.child;p;){if(p===s)return m(f),e;if(p===l)return m(f),i;p=p.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=p;else{for(var y=!1,C=f.child;C;){if(C===s){y=!0,s=f,l=p;break}if(C===l){y=!0,l=f,s=p;break}C=C.sibling}if(!y){for(C=p.child;C;){if(C===s){y=!0,s=p,l=f;break}if(C===l){y=!0,l=p,s=f;break}C=C.sibling}if(!y)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),N=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),D=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),Y=Symbol.iterator;function V(e){return e===null||typeof e!="object"?null:(e=Y&&e[Y]||e["@@iterator"],typeof e=="function"?e:null)}var tt=Symbol.for("react.client.reference");function k(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===tt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case D:return"Suspense";case U:return"SuspenseList";case O:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case N:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return i=e.displayName||null,i!==null?i:k(e.type)||"Memo";case b:i=e._payload,e=e._init;try{return k(e(i))}catch{}}return null}var j=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ct={pending:!1,data:null,method:null,action:null},rt=[],ht=-1;function I(e){return{current:e}}function $(e){0>ht||(e.current=rt[ht],rt[ht]=null,ht--)}function gt(e,i){ht++,rt[ht]=e.current,e.current=i}var Et=I(null),Lt=I(null),kt=I(null),at=I(null);function vt(e,i){switch(gt(kt,i),gt(Lt,e),gt(Et,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Wg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Wg(i),e=qg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}$(Et),gt(Et,e)}function Tt(){$(Et),$(Lt),$(kt)}function te(e){e.memoizedState!==null&&gt(at,e);var i=Et.current,s=qg(i,e.type);i!==s&&(gt(Lt,e),gt(Et,s))}function Ft(e){Lt.current===e&&($(Et),$(Lt)),at.current===e&&($(at),Ho._currentValue=ct)}var le,an;function ae(e){if(le===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);le=i&&i[1]||"",an=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+le+e+an}var xe=!1;function Oe(e,i){if(!e||xe)return"";xe=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var yt=function(){throw Error()};if(Object.defineProperty(yt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(yt,[])}catch(ft){var lt=ft}Reflect.construct(e,[],yt)}else{try{yt.call()}catch(ft){lt=ft}e.call(yt.prototype)}}else{try{throw Error()}catch(ft){lt=ft}(yt=e())&&typeof yt.catch=="function"&&yt.catch(function(){})}}catch(ft){if(ft&&lt&&typeof ft.stack=="string")return[ft.stack,lt.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var p=l.DetermineComponentFrameRoot(),y=p[0],C=p[1];if(y&&C){var H=y.split(`
`),st=C.split(`
`);for(f=l=0;l<H.length&&!H[l].includes("DetermineComponentFrameRoot");)l++;for(;f<st.length&&!st[f].includes("DetermineComponentFrameRoot");)f++;if(l===H.length||f===st.length)for(l=H.length-1,f=st.length-1;1<=l&&0<=f&&H[l]!==st[f];)f--;for(;1<=l&&0<=f;l--,f--)if(H[l]!==st[f]){if(l!==1||f!==1)do if(l--,f--,0>f||H[l]!==st[f]){var _t=`
`+H[l].replace(" at new "," at ");return e.displayName&&_t.includes("<anonymous>")&&(_t=_t.replace("<anonymous>",e.displayName)),_t}while(1<=l&&0<=f);break}}}finally{xe=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?ae(s):""}function ge(e,i){switch(e.tag){case 26:case 27:case 5:return ae(e.type);case 16:return ae("Lazy");case 13:return e.child!==i&&i!==null?ae("Suspense Fallback"):ae("Suspense");case 19:return ae("SuspenseList");case 0:case 15:return Oe(e.type,!1);case 11:return Oe(e.type.render,!1);case 1:return Oe(e.type,!0);case 31:return ae("Activity");default:return""}}function Xe(e){try{var i="",s=null;do i+=ge(e,s),s=e,e=e.return;while(e);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var sn=Object.prototype.hasOwnProperty,An=r.unstable_scheduleCallback,We=r.unstable_cancelCallback,rn=r.unstable_shouldYield,K=r.unstable_requestPaint,Pe=r.unstable_now,Ue=r.unstable_getCurrentPriorityLevel,z=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,Q=r.unstable_NormalPriority,ot=r.unstable_LowPriority,dt=r.unstable_IdlePriority,bt=r.log,Ct=r.unstable_setDisableYieldValue,pt=null,mt=null;function At(e){if(typeof bt=="function"&&Ct(e),mt&&typeof mt.setStrictMode=="function")try{mt.setStrictMode(pt,e)}catch{}}var Ht=Math.clz32?Math.clz32:Jt,Nt=Math.log,Dt=Math.LN2;function Jt(e){return e>>>=0,e===0?32:31-(Nt(e)/Dt|0)|0}var Qt=256,ie=262144,Z=4194304;function Rt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function xt(e,i,s){var l=e.pendingLanes;if(l===0)return 0;var f=0,p=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var C=l&134217727;return C!==0?(l=C&~p,l!==0?f=Rt(l):(y&=C,y!==0?f=Rt(y):s||(s=C&~e,s!==0&&(f=Rt(s))))):(C=l&~p,C!==0?f=Rt(C):y!==0?f=Rt(y):s||(s=l&~e,s!==0&&(f=Rt(s)))),f===0?0:i!==0&&i!==f&&(i&p)===0&&(p=f&-f,s=i&-i,p>=s||p===32&&(s&4194048)!==0)?i:f}function wt(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function It(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mt(){var e=Z;return Z<<=1,(Z&62914560)===0&&(Z=4194304),e}function Kt(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function Wt(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,i,s,l,f,p){var y=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var C=e.entanglements,H=e.expirationTimes,st=e.hiddenUpdates;for(s=y&~s;0<s;){var _t=31-Ht(s),yt=1<<_t;C[_t]=0,H[_t]=-1;var lt=st[_t];if(lt!==null)for(st[_t]=null,_t=0;_t<lt.length;_t++){var ft=lt[_t];ft!==null&&(ft.lane&=-536870913)}s&=~yt}l!==0&&be(e,l,0),p!==0&&f===0&&e.tag!==0&&(e.suspendedLanes|=p&~(y&~i))}function be(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-Ht(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|s&261930}function qn(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var l=31-Ht(s),f=1<<l;f&i|e[l]&i&&(e[l]|=i),s&=~f}}function ni(e,i){var s=i&-i;return s=(s&42)!==0?1:jr(s),(s&(e.suspendedLanes|i))!==0?0:s}function jr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function $r(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function to(){var e=W.p;return e!==0?e:(e=window.event,e===void 0?32:mv(e.type))}function qs(e,i){var s=W.p;try{return W.p=e,i()}finally{W.p=s}}var Gi=Math.random().toString(36).slice(2),fn="__reactFiber$"+Gi,Cn="__reactProps$"+Gi,Yn="__reactContainer$"+Gi,fs="__reactEvents$"+Gi,Ml="__reactListeners$"+Gi,El="__reactHandles$"+Gi,hs="__reactResources$"+Gi,Da="__reactMarker$"+Gi;function Ua(e){delete e[fn],delete e[Cn],delete e[fs],delete e[Ml],delete e[El]}function ea(e){var i=e[fn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Yn]||s[fn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=$g(e);e!==null;){if(s=e[fn])return s;e=$g(e)}return i}e=s,s=e.parentNode}return null}function na(e){if(e=e[fn]||e[Yn]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function ds(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function La(e){var i=e[hs];return i||(i=e[hs]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function hn(e){e[Da]=!0}var bl=new Set,eo={};function R(e,i){X(e,i),X(e+"Capture",i)}function X(e,i){for(eo[e]=i,e=0;e<i.length;e++)bl.add(i[e])}var ut=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),et={},nt={};function Ot(e){return sn.call(nt,e)?!0:sn.call(et,e)?!1:ut.test(e)?nt[e]=!0:(et[e]=!0,!1)}function Gt(e,i,s){if(Ot(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Ut(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function zt(e,i,s,l){if(l===null)e.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+l)}}function Bt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function oe(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function pe(e,i,s){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,p=l.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return f.call(this)},set:function(y){s=""+y,p.call(this,y)}}),Object.defineProperty(e,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(y){s=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function qt(e){if(!e._valueTracker){var i=oe(e)?"checked":"value";e._valueTracker=pe(e,i,""+e[i])}}function Te(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return e&&(l=oe(e)?e.checked?"true":"false":e.value),e=l,e!==s?(i.setValue(e),!0):!1}function Ke(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var qe=/[\n"\\]/g;function fe(e){return e.replace(qe,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function dn(e,i,s,l,f,p,y,C){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Bt(i)):e.value!==""+Bt(i)&&(e.value=""+Bt(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?Sn(e,y,Bt(i)):s!=null?Sn(e,y,Bt(s)):l!=null&&e.removeAttribute("value"),f==null&&p!=null&&(e.defaultChecked=!!p),f!=null&&(e.checked=f&&typeof f!="function"&&typeof f!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?e.name=""+Bt(C):e.removeAttribute("name")}function Vt(e,i,s,l,f,p,y,C){if(p!=null&&typeof p!="function"&&typeof p!="symbol"&&typeof p!="boolean"&&(e.type=p),i!=null||s!=null){if(!(p!=="submit"&&p!=="reset"||i!=null)){qt(e);return}s=s!=null?""+Bt(s):"",i=i!=null?""+Bt(i):s,C||i===e.value||(e.value=i),e.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=C?e.checked:!!l,e.defaultChecked=!!l,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),qt(e)}function Sn(e,i,s){i==="number"&&Ke(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function he(e,i,s,l){if(e=e.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<e.length;s++)f=i.hasOwnProperty("$"+e[s].value),e[s].selected!==f&&(e[s].selected=f),f&&l&&(e[s].defaultSelected=!0)}else{for(s=""+Bt(s),i=null,f=0;f<e.length;f++){if(e[f].value===s){e[f].selected=!0,l&&(e[f].defaultSelected=!0);return}i!==null||e[f].disabled||(i=e[f])}i!==null&&(i.selected=!0)}}function Hn(e,i,s){if(i!=null&&(i=""+Bt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Bt(s):""}function ii(e,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(j(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Bt(i),e.defaultValue=s,l=e.textContent,l===s&&l!==""&&l!==null&&(e.value=l),qt(e)}function Gn(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var Na=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Le(e,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,s):typeof s!="number"||s===0||Na.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function tn(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&Le(e,f,l)}else for(var p in i)i.hasOwnProperty(p)&&Le(e,p,i[p])}function pi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var He=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Vi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function wi(e){return Vi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function mi(){}var Cu=null;function Du(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ys=null,Zs=null;function Xp(e){var i=na(e);if(i&&(e=i.stateNode)){var s=e[Cn]||null;t:switch(e=i.stateNode,i.type){case"input":if(dn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+fe(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==e&&l.form===e.form){var f=l[Cn]||null;if(!f)throw Error(a(90));dn(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===e.form&&Te(l)}break t;case"textarea":Hn(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&he(e,!!s.multiple,i,!1)}}}var Uu=!1;function Wp(e,i,s){if(Uu)return e(i,s);Uu=!0;try{var l=e(i);return l}finally{if(Uu=!1,(Ys!==null||Zs!==null)&&(fc(),Ys&&(i=Ys,e=Zs,Zs=Ys=null,Xp(i),e)))for(i=0;i<e.length;i++)Xp(e[i])}}function no(e,i){var s=e.stateNode;if(s===null)return null;var l=s[Cn]||null;if(l===null)return null;s=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var ia=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Lu=!1;if(ia)try{var io={};Object.defineProperty(io,"passive",{get:function(){Lu=!0}}),window.addEventListener("test",io,io),window.removeEventListener("test",io,io)}catch{Lu=!1}var Oa=null,Nu=null,Tl=null;function qp(){if(Tl)return Tl;var e,i=Nu,s=i.length,l,f="value"in Oa?Oa.value:Oa.textContent,p=f.length;for(e=0;e<s&&i[e]===f[e];e++);var y=s-e;for(l=1;l<=y&&i[s-l]===f[p-l];l++);return Tl=f.slice(e,1<l?1-l:void 0)}function Al(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Rl(){return!0}function Yp(){return!1}function Zn(e){function i(s,l,f,p,y){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=p,this.target=y,this.currentTarget=null;for(var C in e)e.hasOwnProperty(C)&&(s=e[C],this[C]=s?s(p):p[C]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?Rl:Yp,this.isPropagationStopped=Yp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Rl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Rl)},persist:function(){},isPersistent:Rl}),i}var ps={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wl=Zn(ps),ao=_({},ps,{view:0,detail:0}),Xx=Zn(ao),Ou,Pu,so,Cl=_({},ao,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==so&&(so&&e.type==="mousemove"?(Ou=e.screenX-so.screenX,Pu=e.screenY-so.screenY):Pu=Ou=0,so=e),Ou)},movementY:function(e){return"movementY"in e?e.movementY:Pu}}),Zp=Zn(Cl),Wx=_({},Cl,{dataTransfer:0}),qx=Zn(Wx),Yx=_({},ao,{relatedTarget:0}),Iu=Zn(Yx),Zx=_({},ps,{animationName:0,elapsedTime:0,pseudoElement:0}),Kx=Zn(Zx),Jx=_({},ps,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Qx=Zn(Jx),jx=_({},ps,{data:0}),Kp=Zn(jx),$x={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},tS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},eS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function nS(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=eS[e])?!!i[e]:!1}function zu(){return nS}var iS=_({},ao,{key:function(e){if(e.key){var i=$x[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Al(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?tS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zu,charCode:function(e){return e.type==="keypress"?Al(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Al(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),aS=Zn(iS),sS=_({},Cl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jp=Zn(sS),rS=_({},ao,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zu}),oS=Zn(rS),lS=_({},ps,{propertyName:0,elapsedTime:0,pseudoElement:0}),cS=Zn(lS),uS=_({},Cl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),fS=Zn(uS),hS=_({},ps,{newState:0,oldState:0}),dS=Zn(hS),pS=[9,13,27,32],Bu=ia&&"CompositionEvent"in window,ro=null;ia&&"documentMode"in document&&(ro=document.documentMode);var mS=ia&&"TextEvent"in window&&!ro,Qp=ia&&(!Bu||ro&&8<ro&&11>=ro),jp=" ",$p=!1;function tm(e,i){switch(e){case"keyup":return pS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function em(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ks=!1;function gS(e,i){switch(e){case"compositionend":return em(i);case"keypress":return i.which!==32?null:($p=!0,jp);case"textInput":return e=i.data,e===jp&&$p?null:e;default:return null}}function vS(e,i){if(Ks)return e==="compositionend"||!Bu&&tm(e,i)?(e=qp(),Tl=Nu=Oa=null,Ks=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Qp&&i.locale!=="ko"?null:i.data;default:return null}}var _S={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nm(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!_S[e.type]:i==="textarea"}function im(e,i,s,l){Ys?Zs?Zs.push(l):Zs=[l]:Ys=l,i=_c(i,"onChange"),0<i.length&&(s=new wl("onChange","change",null,s,l),e.push({event:s,listeners:i}))}var oo=null,lo=null;function xS(e){Fg(e,0)}function Dl(e){var i=ds(e);if(Te(i))return e}function am(e,i){if(e==="change")return i}var sm=!1;if(ia){var Fu;if(ia){var Hu="oninput"in document;if(!Hu){var rm=document.createElement("div");rm.setAttribute("oninput","return;"),Hu=typeof rm.oninput=="function"}Fu=Hu}else Fu=!1;sm=Fu&&(!document.documentMode||9<document.documentMode)}function om(){oo&&(oo.detachEvent("onpropertychange",lm),lo=oo=null)}function lm(e){if(e.propertyName==="value"&&Dl(lo)){var i=[];im(i,lo,e,Du(e)),Wp(xS,i)}}function SS(e,i,s){e==="focusin"?(om(),oo=i,lo=s,oo.attachEvent("onpropertychange",lm)):e==="focusout"&&om()}function yS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Dl(lo)}function MS(e,i){if(e==="click")return Dl(i)}function ES(e,i){if(e==="input"||e==="change")return Dl(i)}function bS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ai=typeof Object.is=="function"?Object.is:bS;function co(e,i){if(ai(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!sn.call(i,f)||!ai(e[f],i[f]))return!1}return!0}function cm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function um(e,i){var s=cm(e);e=0;for(var l;s;){if(s.nodeType===3){if(l=e+s.textContent.length,e<=i&&l>=i)return{node:s,offset:i-e};e=l}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=cm(s)}}function fm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?fm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function hm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=Ke(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=Ke(e.document)}return i}function Gu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var TS=ia&&"documentMode"in document&&11>=document.documentMode,Js=null,Vu=null,uo=null,ku=!1;function dm(e,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;ku||Js==null||Js!==Ke(l)||(l=Js,"selectionStart"in l&&Gu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),uo&&co(uo,l)||(uo=l,l=_c(Vu,"onSelect"),0<l.length&&(i=new wl("onSelect","select",null,i,s),e.push({event:i,listeners:l}),i.target=Js)))}function ms(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var Qs={animationend:ms("Animation","AnimationEnd"),animationiteration:ms("Animation","AnimationIteration"),animationstart:ms("Animation","AnimationStart"),transitionrun:ms("Transition","TransitionRun"),transitionstart:ms("Transition","TransitionStart"),transitioncancel:ms("Transition","TransitionCancel"),transitionend:ms("Transition","TransitionEnd")},Xu={},pm={};ia&&(pm=document.createElement("div").style,"AnimationEvent"in window||(delete Qs.animationend.animation,delete Qs.animationiteration.animation,delete Qs.animationstart.animation),"TransitionEvent"in window||delete Qs.transitionend.transition);function gs(e){if(Xu[e])return Xu[e];if(!Qs[e])return e;var i=Qs[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in pm)return Xu[e]=i[s];return e}var mm=gs("animationend"),gm=gs("animationiteration"),vm=gs("animationstart"),AS=gs("transitionrun"),RS=gs("transitionstart"),wS=gs("transitioncancel"),_m=gs("transitionend"),xm=new Map,Wu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Wu.push("scrollEnd");function Ci(e,i){xm.set(e,i),R(i,[e])}var Ul=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},gi=[],js=0,qu=0;function Ll(){for(var e=js,i=qu=js=0;i<e;){var s=gi[i];gi[i++]=null;var l=gi[i];gi[i++]=null;var f=gi[i];gi[i++]=null;var p=gi[i];if(gi[i++]=null,l!==null&&f!==null){var y=l.pending;y===null?f.next=f:(f.next=y.next,y.next=f),l.pending=f}p!==0&&Sm(s,f,p)}}function Nl(e,i,s,l){gi[js++]=e,gi[js++]=i,gi[js++]=s,gi[js++]=l,qu|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Yu(e,i,s,l){return Nl(e,i,s,l),Ol(e)}function vs(e,i){return Nl(e,null,null,i),Ol(e)}function Sm(e,i,s){e.lanes|=s;var l=e.alternate;l!==null&&(l.lanes|=s);for(var f=!1,p=e.return;p!==null;)p.childLanes|=s,l=p.alternate,l!==null&&(l.childLanes|=s),p.tag===22&&(e=p.stateNode,e===null||e._visibility&1||(f=!0)),e=p,p=p.return;return e.tag===3?(p=e.stateNode,f&&i!==null&&(f=31-Ht(s),e=p.hiddenUpdates,l=e[f],l===null?e[f]=[i]:l.push(i),i.lane=s|536870912),p):null}function Ol(e){if(50<No)throw No=0,ih=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var $s={};function CS(e,i,s,l){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function si(e,i,s,l){return new CS(e,i,s,l)}function Zu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function aa(e,i){var s=e.alternate;return s===null?(s=si(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function ym(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Pl(e,i,s,l,f,p){var y=0;if(l=e,typeof e=="function")Zu(e)&&(y=1);else if(typeof e=="string")y=Oy(e,s,Et.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case O:return e=si(31,s,i,f),e.elementType=O,e.lanes=p,e;case w:return _s(s.children,f,p,i);case M:y=8,f|=24;break;case S:return e=si(12,s,i,f|2),e.elementType=S,e.lanes=p,e;case D:return e=si(13,s,i,f),e.elementType=D,e.lanes=p,e;case U:return e=si(19,s,i,f),e.elementType=U,e.lanes=p,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case N:y=10;break t;case L:y=9;break t;case A:y=11;break t;case P:y=14;break t;case b:y=16,l=null;break t}y=29,s=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=si(y,s,i,f),i.elementType=e,i.type=l,i.lanes=p,i}function _s(e,i,s,l){return e=si(7,e,l,i),e.lanes=s,e}function Ku(e,i,s){return e=si(6,e,null,i),e.lanes=s,e}function Mm(e){var i=si(18,null,null,0);return i.stateNode=e,i}function Ju(e,i,s){return i=si(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var Em=new WeakMap;function vi(e,i){if(typeof e=="object"&&e!==null){var s=Em.get(e);return s!==void 0?s:(i={value:e,source:i,stack:Xe(i)},Em.set(e,i),i)}return{value:e,source:i,stack:Xe(i)}}var tr=[],er=0,Il=null,fo=0,_i=[],xi=0,Pa=null,ki=1,Xi="";function sa(e,i){tr[er++]=fo,tr[er++]=Il,Il=e,fo=i}function bm(e,i,s){_i[xi++]=ki,_i[xi++]=Xi,_i[xi++]=Pa,Pa=e;var l=ki;e=Xi;var f=32-Ht(l)-1;l&=~(1<<f),s+=1;var p=32-Ht(i)+f;if(30<p){var y=f-f%5;p=(l&(1<<y)-1).toString(32),l>>=y,f-=y,ki=1<<32-Ht(i)+f|s<<f|l,Xi=p+e}else ki=1<<p|s<<f|l,Xi=e}function Qu(e){e.return!==null&&(sa(e,1),bm(e,1,0))}function ju(e){for(;e===Il;)Il=tr[--er],tr[er]=null,fo=tr[--er],tr[er]=null;for(;e===Pa;)Pa=_i[--xi],_i[xi]=null,Xi=_i[--xi],_i[xi]=null,ki=_i[--xi],_i[xi]=null}function Tm(e,i){_i[xi++]=ki,_i[xi++]=Xi,_i[xi++]=Pa,ki=i.id,Xi=i.overflow,Pa=e}var Dn=null,Je=null,Me=!1,Ia=null,Si=!1,$u=Error(a(519));function za(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ho(vi(i,e)),$u}function Am(e){var i=e.stateNode,s=e.type,l=e.memoizedProps;switch(i[fn]=e,i[Cn]=l,s){case"dialog":_e("cancel",i),_e("close",i);break;case"iframe":case"object":case"embed":_e("load",i);break;case"video":case"audio":for(s=0;s<Po.length;s++)_e(Po[s],i);break;case"source":_e("error",i);break;case"img":case"image":case"link":_e("error",i),_e("load",i);break;case"details":_e("toggle",i);break;case"input":_e("invalid",i),Vt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":_e("invalid",i);break;case"textarea":_e("invalid",i),ii(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||kg(i.textContent,s)?(l.popover!=null&&(_e("beforetoggle",i),_e("toggle",i)),l.onScroll!=null&&_e("scroll",i),l.onScrollEnd!=null&&_e("scrollend",i),l.onClick!=null&&(i.onclick=mi),i=!0):i=!1,i||za(e,!0)}function Rm(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:Si=!1;return;case 27:case 3:Si=!0;return;default:Dn=Dn.return}}function nr(e){if(e!==Dn)return!1;if(!Me)return Rm(e),Me=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||_h(e.type,e.memoizedProps)),s=!s),s&&Je&&za(e),Rm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Je=jg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Je=jg(e)}else i===27?(i=Je,Qa(e.type)?(e=Eh,Eh=null,Je=e):Je=i):Je=Dn?Mi(e.stateNode.nextSibling):null;return!0}function xs(){Je=Dn=null,Me=!1}function tf(){var e=Ia;return e!==null&&(jn===null?jn=e:jn.push.apply(jn,e),Ia=null),e}function ho(e){Ia===null?Ia=[e]:Ia.push(e)}var ef=I(null),Ss=null,ra=null;function Ba(e,i,s){gt(ef,i._currentValue),i._currentValue=s}function oa(e){e._currentValue=ef.current,$(ef)}function nf(e,i,s){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===s)break;e=e.return}}function af(e,i,s,l){var f=e.child;for(f!==null&&(f.return=e);f!==null;){var p=f.dependencies;if(p!==null){var y=f.child;p=p.firstContext;t:for(;p!==null;){var C=p;p=f;for(var H=0;H<i.length;H++)if(C.context===i[H]){p.lanes|=s,C=p.alternate,C!==null&&(C.lanes|=s),nf(p.return,s,e),l||(y=null);break t}p=C.next}}else if(f.tag===18){if(y=f.return,y===null)throw Error(a(341));y.lanes|=s,p=y.alternate,p!==null&&(p.lanes|=s),nf(y,s,e),y=null}else y=f.child;if(y!==null)y.return=f;else for(y=f;y!==null;){if(y===e){y=null;break}if(f=y.sibling,f!==null){f.return=y.return,y=f;break}y=y.return}f=y}}function ir(e,i,s,l){e=null;for(var f=i,p=!1;f!==null;){if(!p){if((f.flags&524288)!==0)p=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var y=f.alternate;if(y===null)throw Error(a(387));if(y=y.memoizedProps,y!==null){var C=f.type;ai(f.pendingProps.value,y.value)||(e!==null?e.push(C):e=[C])}}else if(f===at.current){if(y=f.alternate,y===null)throw Error(a(387));y.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(e!==null?e.push(Ho):e=[Ho])}f=f.return}e!==null&&af(i,e,s,l),i.flags|=262144}function zl(e){for(e=e.firstContext;e!==null;){if(!ai(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ys(e){Ss=e,ra=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return wm(Ss,e)}function Bl(e,i){return Ss===null&&ys(e),wm(e,i)}function wm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ra===null){if(e===null)throw Error(a(308));ra=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ra=ra.next=i;return s}var DS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},US=r.unstable_scheduleCallback,LS=r.unstable_NormalPriority,pn={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function sf(){return{controller:new DS,data:new Map,refCount:0}}function po(e){e.refCount--,e.refCount===0&&US(LS,function(){e.controller.abort()})}var mo=null,rf=0,ar=0,sr=null;function NS(e,i){if(mo===null){var s=mo=[];rf=0,ar=ch(),sr={status:"pending",value:void 0,then:function(l){s.push(l)}}}return rf++,i.then(Cm,Cm),i}function Cm(){if(--rf===0&&mo!==null){sr!==null&&(sr.status="fulfilled");var e=mo;mo=null,ar=0,sr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function OS(e,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var Dm=B.S;B.S=function(e,i){dg=Pe(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&NS(e,i),Dm!==null&&Dm(e,i)};var Ms=I(null);function of(){var e=Ms.current;return e!==null?e:Ye.pooledCache}function Fl(e,i){i===null?gt(Ms,Ms.current):gt(Ms,i.pool)}function Um(){var e=of();return e===null?null:{parent:pn._currentValue,pool:e}}var rr=Error(a(460)),lf=Error(a(474)),Hl=Error(a(542)),Gl={then:function(){}};function Lm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Nm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(mi,mi),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Pm(e),e;default:if(typeof i.status=="string")i.then(mi,mi);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Pm(e),e}throw bs=i,rr}}function Es(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(bs=s,rr):s}}var bs=null;function Om(){if(bs===null)throw Error(a(459));var e=bs;return bs=null,e}function Pm(e){if(e===rr||e===Hl)throw Error(a(483))}var or=null,go=0;function Vl(e){var i=go;return go+=1,or===null&&(or=[]),Nm(or,e,i)}function vo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function kl(e,i){throw i.$$typeof===v?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Im(e){function i(J,q){if(e){var it=J.deletions;it===null?(J.deletions=[q],J.flags|=16):it.push(q)}}function s(J,q){if(!e)return null;for(;q!==null;)i(J,q),q=q.sibling;return null}function l(J){for(var q=new Map;J!==null;)J.key!==null?q.set(J.key,J):q.set(J.index,J),J=J.sibling;return q}function f(J,q){return J=aa(J,q),J.index=0,J.sibling=null,J}function p(J,q,it){return J.index=it,e?(it=J.alternate,it!==null?(it=it.index,it<q?(J.flags|=67108866,q):it):(J.flags|=67108866,q)):(J.flags|=1048576,q)}function y(J){return e&&J.alternate===null&&(J.flags|=67108866),J}function C(J,q,it,St){return q===null||q.tag!==6?(q=Ku(it,J.mode,St),q.return=J,q):(q=f(q,it),q.return=J,q)}function H(J,q,it,St){var jt=it.type;return jt===w?_t(J,q,it.props.children,St,it.key):q!==null&&(q.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===b&&Es(jt)===q.type)?(q=f(q,it.props),vo(q,it),q.return=J,q):(q=Pl(it.type,it.key,it.props,null,J.mode,St),vo(q,it),q.return=J,q)}function st(J,q,it,St){return q===null||q.tag!==4||q.stateNode.containerInfo!==it.containerInfo||q.stateNode.implementation!==it.implementation?(q=Ju(it,J.mode,St),q.return=J,q):(q=f(q,it.children||[]),q.return=J,q)}function _t(J,q,it,St,jt){return q===null||q.tag!==7?(q=_s(it,J.mode,St,jt),q.return=J,q):(q=f(q,it),q.return=J,q)}function yt(J,q,it){if(typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint")return q=Ku(""+q,J.mode,it),q.return=J,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case x:return it=Pl(q.type,q.key,q.props,null,J.mode,it),vo(it,q),it.return=J,it;case E:return q=Ju(q,J.mode,it),q.return=J,q;case b:return q=Es(q),yt(J,q,it)}if(j(q)||V(q))return q=_s(q,J.mode,it,null),q.return=J,q;if(typeof q.then=="function")return yt(J,Vl(q),it);if(q.$$typeof===N)return yt(J,Bl(J,q),it);kl(J,q)}return null}function lt(J,q,it,St){var jt=q!==null?q.key:null;if(typeof it=="string"&&it!==""||typeof it=="number"||typeof it=="bigint")return jt!==null?null:C(J,q,""+it,St);if(typeof it=="object"&&it!==null){switch(it.$$typeof){case x:return it.key===jt?H(J,q,it,St):null;case E:return it.key===jt?st(J,q,it,St):null;case b:return it=Es(it),lt(J,q,it,St)}if(j(it)||V(it))return jt!==null?null:_t(J,q,it,St,null);if(typeof it.then=="function")return lt(J,q,Vl(it),St);if(it.$$typeof===N)return lt(J,q,Bl(J,it),St);kl(J,it)}return null}function ft(J,q,it,St,jt){if(typeof St=="string"&&St!==""||typeof St=="number"||typeof St=="bigint")return J=J.get(it)||null,C(q,J,""+St,jt);if(typeof St=="object"&&St!==null){switch(St.$$typeof){case x:return J=J.get(St.key===null?it:St.key)||null,H(q,J,St,jt);case E:return J=J.get(St.key===null?it:St.key)||null,st(q,J,St,jt);case b:return St=Es(St),ft(J,q,it,St,jt)}if(j(St)||V(St))return J=J.get(it)||null,_t(q,J,St,jt,null);if(typeof St.then=="function")return ft(J,q,it,Vl(St),jt);if(St.$$typeof===N)return ft(J,q,it,Bl(q,St),jt);kl(q,St)}return null}function Yt(J,q,it,St){for(var jt=null,we=null,Zt=q,ue=q=0,ye=null;Zt!==null&&ue<it.length;ue++){Zt.index>ue?(ye=Zt,Zt=null):ye=Zt.sibling;var Ce=lt(J,Zt,it[ue],St);if(Ce===null){Zt===null&&(Zt=ye);break}e&&Zt&&Ce.alternate===null&&i(J,Zt),q=p(Ce,q,ue),we===null?jt=Ce:we.sibling=Ce,we=Ce,Zt=ye}if(ue===it.length)return s(J,Zt),Me&&sa(J,ue),jt;if(Zt===null){for(;ue<it.length;ue++)Zt=yt(J,it[ue],St),Zt!==null&&(q=p(Zt,q,ue),we===null?jt=Zt:we.sibling=Zt,we=Zt);return Me&&sa(J,ue),jt}for(Zt=l(Zt);ue<it.length;ue++)ye=ft(Zt,J,ue,it[ue],St),ye!==null&&(e&&ye.alternate!==null&&Zt.delete(ye.key===null?ue:ye.key),q=p(ye,q,ue),we===null?jt=ye:we.sibling=ye,we=ye);return e&&Zt.forEach(function(ns){return i(J,ns)}),Me&&sa(J,ue),jt}function $t(J,q,it,St){if(it==null)throw Error(a(151));for(var jt=null,we=null,Zt=q,ue=q=0,ye=null,Ce=it.next();Zt!==null&&!Ce.done;ue++,Ce=it.next()){Zt.index>ue?(ye=Zt,Zt=null):ye=Zt.sibling;var ns=lt(J,Zt,Ce.value,St);if(ns===null){Zt===null&&(Zt=ye);break}e&&Zt&&ns.alternate===null&&i(J,Zt),q=p(ns,q,ue),we===null?jt=ns:we.sibling=ns,we=ns,Zt=ye}if(Ce.done)return s(J,Zt),Me&&sa(J,ue),jt;if(Zt===null){for(;!Ce.done;ue++,Ce=it.next())Ce=yt(J,Ce.value,St),Ce!==null&&(q=p(Ce,q,ue),we===null?jt=Ce:we.sibling=Ce,we=Ce);return Me&&sa(J,ue),jt}for(Zt=l(Zt);!Ce.done;ue++,Ce=it.next())Ce=ft(Zt,J,ue,Ce.value,St),Ce!==null&&(e&&Ce.alternate!==null&&Zt.delete(Ce.key===null?ue:Ce.key),q=p(Ce,q,ue),we===null?jt=Ce:we.sibling=Ce,we=Ce);return e&&Zt.forEach(function(Wy){return i(J,Wy)}),Me&&sa(J,ue),jt}function ke(J,q,it,St){if(typeof it=="object"&&it!==null&&it.type===w&&it.key===null&&(it=it.props.children),typeof it=="object"&&it!==null){switch(it.$$typeof){case x:t:{for(var jt=it.key;q!==null;){if(q.key===jt){if(jt=it.type,jt===w){if(q.tag===7){s(J,q.sibling),St=f(q,it.props.children),St.return=J,J=St;break t}}else if(q.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===b&&Es(jt)===q.type){s(J,q.sibling),St=f(q,it.props),vo(St,it),St.return=J,J=St;break t}s(J,q);break}else i(J,q);q=q.sibling}it.type===w?(St=_s(it.props.children,J.mode,St,it.key),St.return=J,J=St):(St=Pl(it.type,it.key,it.props,null,J.mode,St),vo(St,it),St.return=J,J=St)}return y(J);case E:t:{for(jt=it.key;q!==null;){if(q.key===jt)if(q.tag===4&&q.stateNode.containerInfo===it.containerInfo&&q.stateNode.implementation===it.implementation){s(J,q.sibling),St=f(q,it.children||[]),St.return=J,J=St;break t}else{s(J,q);break}else i(J,q);q=q.sibling}St=Ju(it,J.mode,St),St.return=J,J=St}return y(J);case b:return it=Es(it),ke(J,q,it,St)}if(j(it))return Yt(J,q,it,St);if(V(it)){if(jt=V(it),typeof jt!="function")throw Error(a(150));return it=jt.call(it),$t(J,q,it,St)}if(typeof it.then=="function")return ke(J,q,Vl(it),St);if(it.$$typeof===N)return ke(J,q,Bl(J,it),St);kl(J,it)}return typeof it=="string"&&it!==""||typeof it=="number"||typeof it=="bigint"?(it=""+it,q!==null&&q.tag===6?(s(J,q.sibling),St=f(q,it),St.return=J,J=St):(s(J,q),St=Ku(it,J.mode,St),St.return=J,J=St),y(J)):s(J,q)}return function(J,q,it,St){try{go=0;var jt=ke(J,q,it,St);return or=null,jt}catch(Zt){if(Zt===rr||Zt===Hl)throw Zt;var we=si(29,Zt,null,J.mode);return we.lanes=St,we.return=J,we}finally{}}}var Ts=Im(!0),zm=Im(!1),Fa=!1;function cf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function uf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ha(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ga(e,i,s){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(Ne&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=Ol(e),Sm(e,null,s),i}return Nl(e,l,i,s),Ol(e)}function _o(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,qn(e,s)}}function ff(e,i){var s=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,p=null;if(s=s.firstBaseUpdate,s!==null){do{var y={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};p===null?f=p=y:p=p.next=y,s=s.next}while(s!==null);p===null?f=p=i:p=p.next=i}else f=p=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:p,shared:l.shared,callbacks:l.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var hf=!1;function xo(){if(hf){var e=sr;if(e!==null)throw e}}function So(e,i,s,l){hf=!1;var f=e.updateQueue;Fa=!1;var p=f.firstBaseUpdate,y=f.lastBaseUpdate,C=f.shared.pending;if(C!==null){f.shared.pending=null;var H=C,st=H.next;H.next=null,y===null?p=st:y.next=st,y=H;var _t=e.alternate;_t!==null&&(_t=_t.updateQueue,C=_t.lastBaseUpdate,C!==y&&(C===null?_t.firstBaseUpdate=st:C.next=st,_t.lastBaseUpdate=H))}if(p!==null){var yt=f.baseState;y=0,_t=st=H=null,C=p;do{var lt=C.lane&-536870913,ft=lt!==C.lane;if(ft?(Se&lt)===lt:(l&lt)===lt){lt!==0&&lt===ar&&(hf=!0),_t!==null&&(_t=_t.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});t:{var Yt=e,$t=C;lt=i;var ke=s;switch($t.tag){case 1:if(Yt=$t.payload,typeof Yt=="function"){yt=Yt.call(ke,yt,lt);break t}yt=Yt;break t;case 3:Yt.flags=Yt.flags&-65537|128;case 0:if(Yt=$t.payload,lt=typeof Yt=="function"?Yt.call(ke,yt,lt):Yt,lt==null)break t;yt=_({},yt,lt);break t;case 2:Fa=!0}}lt=C.callback,lt!==null&&(e.flags|=64,ft&&(e.flags|=8192),ft=f.callbacks,ft===null?f.callbacks=[lt]:ft.push(lt))}else ft={lane:lt,tag:C.tag,payload:C.payload,callback:C.callback,next:null},_t===null?(st=_t=ft,H=yt):_t=_t.next=ft,y|=lt;if(C=C.next,C===null){if(C=f.shared.pending,C===null)break;ft=C,C=ft.next,ft.next=null,f.lastBaseUpdate=ft,f.shared.pending=null}}while(!0);_t===null&&(H=yt),f.baseState=H,f.firstBaseUpdate=st,f.lastBaseUpdate=_t,p===null&&(f.shared.lanes=0),qa|=y,e.lanes=y,e.memoizedState=yt}}function Bm(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function Fm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Bm(s[e],i)}var lr=I(null),Xl=I(0);function Hm(e,i){e=ga,gt(Xl,e),gt(lr,i),ga=e|i.baseLanes}function df(){gt(Xl,ga),gt(lr,lr.current)}function pf(){ga=Xl.current,$(lr),$(Xl)}var ri=I(null),yi=null;function Va(e){var i=e.alternate;gt(cn,cn.current&1),gt(ri,e),yi===null&&(i===null||lr.current!==null||i.memoizedState!==null)&&(yi=e)}function mf(e){gt(cn,cn.current),gt(ri,e),yi===null&&(yi=e)}function Gm(e){e.tag===22?(gt(cn,cn.current),gt(ri,e),yi===null&&(yi=e)):ka()}function ka(){gt(cn,cn.current),gt(ri,ri.current)}function oi(e){$(ri),yi===e&&(yi=null),$(cn)}var cn=I(0);function Wl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||yh(s)||Mh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var la=0,ce=null,Ge=null,mn=null,ql=!1,cr=!1,As=!1,Yl=0,yo=0,ur=null,PS=0;function on(){throw Error(a(321))}function gf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!ai(e[s],i[s]))return!1;return!0}function vf(e,i,s,l,f,p){return la=p,ce=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,B.H=e===null||e.memoizedState===null?b0:Lf,As=!1,p=s(l,f),As=!1,cr&&(p=km(i,s,l,f)),Vm(e),p}function Vm(e){B.H=bo;var i=Ge!==null&&Ge.next!==null;if(la=0,mn=Ge=ce=null,ql=!1,yo=0,ur=null,i)throw Error(a(300));e===null||gn||(e=e.dependencies,e!==null&&zl(e)&&(gn=!0))}function km(e,i,s,l){ce=e;var f=0;do{if(cr&&(ur=null),yo=0,cr=!1,25<=f)throw Error(a(301));if(f+=1,mn=Ge=null,e.updateQueue!=null){var p=e.updateQueue;p.lastEffect=null,p.events=null,p.stores=null,p.memoCache!=null&&(p.memoCache.index=0)}B.H=T0,p=i(s,l)}while(cr);return p}function IS(){var e=B.H,i=e.useState()[0];return i=typeof i.then=="function"?Mo(i):i,e=e.useState()[0],(Ge!==null?Ge.memoizedState:null)!==e&&(ce.flags|=1024),i}function _f(){var e=Yl!==0;return Yl=0,e}function xf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function Sf(e){if(ql){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}ql=!1}la=0,mn=Ge=ce=null,cr=!1,yo=Yl=0,ur=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return mn===null?ce.memoizedState=mn=e:mn=mn.next=e,mn}function un(){if(Ge===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Ge.next;var i=mn===null?ce.memoizedState:mn.next;if(i!==null)mn=i,Ge=e;else{if(e===null)throw ce.alternate===null?Error(a(467)):Error(a(310));Ge=e,e={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},mn===null?ce.memoizedState=mn=e:mn=mn.next=e}return mn}function Zl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Mo(e){var i=yo;return yo+=1,ur===null&&(ur=[]),e=Nm(ur,e,i),i=ce,(mn===null?i.memoizedState:mn.next)===null&&(i=i.alternate,B.H=i===null||i.memoizedState===null?b0:Lf),e}function Kl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Mo(e);if(e.$$typeof===N)return Un(e)}throw Error(a(438,String(e)))}function yf(e){var i=null,s=ce.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=ce.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Zl(),ce.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),l=0;l<e;l++)s[l]=F;return i.index++,s}function ca(e,i){return typeof i=="function"?i(e):i}function Jl(e){var i=un();return Mf(i,Ge,e)}function Mf(e,i,s){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=e.baseQueue,p=l.pending;if(p!==null){if(f!==null){var y=f.next;f.next=p.next,p.next=y}i.baseQueue=f=p,l.pending=null}if(p=e.baseState,f===null)e.memoizedState=p;else{i=f.next;var C=y=null,H=null,st=i,_t=!1;do{var yt=st.lane&-536870913;if(yt!==st.lane?(Se&yt)===yt:(la&yt)===yt){var lt=st.revertLane;if(lt===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null}),yt===ar&&(_t=!0);else if((la&lt)===lt){st=st.next,lt===ar&&(_t=!0);continue}else yt={lane:0,revertLane:st.revertLane,gesture:null,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null},H===null?(C=H=yt,y=p):H=H.next=yt,ce.lanes|=lt,qa|=lt;yt=st.action,As&&s(p,yt),p=st.hasEagerState?st.eagerState:s(p,yt)}else lt={lane:yt,revertLane:st.revertLane,gesture:st.gesture,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null},H===null?(C=H=lt,y=p):H=H.next=lt,ce.lanes|=yt,qa|=yt;st=st.next}while(st!==null&&st!==i);if(H===null?y=p:H.next=C,!ai(p,e.memoizedState)&&(gn=!0,_t&&(s=sr,s!==null)))throw s;e.memoizedState=p,e.baseState=y,e.baseQueue=H,l.lastRenderedState=p}return f===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Ef(e){var i=un(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var l=s.dispatch,f=s.pending,p=i.memoizedState;if(f!==null){s.pending=null;var y=f=f.next;do p=e(p,y.action),y=y.next;while(y!==f);ai(p,i.memoizedState)||(gn=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),s.lastRenderedState=p}return[p,l]}function Xm(e,i,s){var l=ce,f=un(),p=Me;if(p){if(s===void 0)throw Error(a(407));s=s()}else s=i();var y=!ai((Ge||f).memoizedState,s);if(y&&(f.memoizedState=s,gn=!0),f=f.queue,Af(Ym.bind(null,l,f,e),[e]),f.getSnapshot!==i||y||mn!==null&&mn.memoizedState.tag&1){if(l.flags|=2048,fr(9,{destroy:void 0},qm.bind(null,l,f,s,i),null),Ye===null)throw Error(a(349));p||(la&127)!==0||Wm(l,i,s)}return s}function Wm(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=ce.updateQueue,i===null?(i=Zl(),ce.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function qm(e,i,s,l){i.value=s,i.getSnapshot=l,Zm(i)&&Km(e)}function Ym(e,i,s){return s(function(){Zm(i)&&Km(e)})}function Zm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!ai(e,s)}catch{return!0}}function Km(e){var i=vs(e,2);i!==null&&$n(i,e,2)}function bf(e){var i=Vn();if(typeof e=="function"){var s=e;if(e=s(),As){At(!0);try{s()}finally{At(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:e},i}function Jm(e,i,s,l){return e.baseState=s,Mf(e,Ge,typeof l=="function"?l:ca)}function zS(e,i,s,l,f){if($l(e))throw Error(a(485));if(e=i.action,e!==null){var p={payload:f,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){p.listeners.push(y)}};B.T!==null?s(!0):p.isTransition=!1,l(p),s=i.pending,s===null?(p.next=i.pending=p,Qm(i,p)):(p.next=s.next,i.pending=s.next=p)}}function Qm(e,i){var s=i.action,l=i.payload,f=e.state;if(i.isTransition){var p=B.T,y={};B.T=y;try{var C=s(f,l),H=B.S;H!==null&&H(y,C),jm(e,i,C)}catch(st){Tf(e,i,st)}finally{p!==null&&y.types!==null&&(p.types=y.types),B.T=p}}else try{p=s(f,l),jm(e,i,p)}catch(st){Tf(e,i,st)}}function jm(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){$m(e,i,l)},function(l){return Tf(e,i,l)}):$m(e,i,s)}function $m(e,i,s){i.status="fulfilled",i.value=s,t0(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Qm(e,s)))}function Tf(e,i,s){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,t0(i),i=i.next;while(i!==l)}e.action=null}function t0(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function e0(e,i){return i}function n0(e,i){if(Me){var s=Ye.formState;if(s!==null){t:{var l=ce;if(Me){if(Je){e:{for(var f=Je,p=Si;f.nodeType!==8;){if(!p){f=null;break e}if(f=Mi(f.nextSibling),f===null){f=null;break e}}p=f.data,f=p==="F!"||p==="F"?f:null}if(f){Je=Mi(f.nextSibling),l=f.data==="F!";break t}}za(l)}l=!1}l&&(i=s[0])}}return s=Vn(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e0,lastRenderedState:i},s.queue=l,s=y0.bind(null,ce,l),l.dispatch=s,l=bf(!1),p=Uf.bind(null,ce,!1,l.queue),l=Vn(),f={state:i,dispatch:null,action:e,pending:null},l.queue=f,s=zS.bind(null,ce,f,p,s),f.dispatch=s,l.memoizedState=e,[i,s,!1]}function i0(e){var i=un();return a0(i,Ge,e)}function a0(e,i,s){if(i=Mf(e,i,e0)[0],e=Jl(ca)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=Mo(i)}catch(y){throw y===rr?Hl:y}else l=i;i=un();var f=i.queue,p=f.dispatch;return s!==i.memoizedState&&(ce.flags|=2048,fr(9,{destroy:void 0},BS.bind(null,f,s),null)),[l,p,e]}function BS(e,i){e.action=i}function s0(e){var i=un(),s=Ge;if(s!==null)return a0(i,s,e);un(),i=i.memoizedState,s=un();var l=s.queue.dispatch;return s.memoizedState=e,[i,l,!1]}function fr(e,i,s,l){return e={tag:e,create:s,deps:l,inst:i,next:null},i=ce.updateQueue,i===null&&(i=Zl(),ce.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(l=s.next,s.next=e,e.next=l,i.lastEffect=e),e}function r0(){return un().memoizedState}function Ql(e,i,s,l){var f=Vn();ce.flags|=e,f.memoizedState=fr(1|i,{destroy:void 0},s,l===void 0?null:l)}function jl(e,i,s,l){var f=un();l=l===void 0?null:l;var p=f.memoizedState.inst;Ge!==null&&l!==null&&gf(l,Ge.memoizedState.deps)?f.memoizedState=fr(i,p,s,l):(ce.flags|=e,f.memoizedState=fr(1|i,p,s,l))}function o0(e,i){Ql(8390656,8,e,i)}function Af(e,i){jl(2048,8,e,i)}function FS(e){ce.flags|=4;var i=ce.updateQueue;if(i===null)i=Zl(),ce.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function l0(e){var i=un().memoizedState;return FS({ref:i,nextImpl:e}),function(){if((Ne&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function c0(e,i){return jl(4,2,e,i)}function u0(e,i){return jl(4,4,e,i)}function f0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function h0(e,i,s){s=s!=null?s.concat([e]):null,jl(4,4,f0.bind(null,i,e),s)}function Rf(){}function d0(e,i){var s=un();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&gf(i,l[1])?l[0]:(s.memoizedState=[e,i],e)}function p0(e,i){var s=un();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&gf(i,l[1]))return l[0];if(l=e(),As){At(!0);try{e()}finally{At(!1)}}return s.memoizedState=[l,i],l}function wf(e,i,s){return s===void 0||(la&1073741824)!==0&&(Se&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=mg(),ce.lanes|=e,qa|=e,s)}function m0(e,i,s,l){return ai(s,i)?s:lr.current!==null?(e=wf(e,s,l),ai(e,i)||(gn=!0),e):(la&42)===0||(la&1073741824)!==0&&(Se&261930)===0?(gn=!0,e.memoizedState=s):(e=mg(),ce.lanes|=e,qa|=e,i)}function g0(e,i,s,l,f){var p=W.p;W.p=p!==0&&8>p?p:8;var y=B.T,C={};B.T=C,Uf(e,!1,i,s);try{var H=f(),st=B.S;if(st!==null&&st(C,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var _t=OS(H,l);Eo(e,i,_t,ui(e))}else Eo(e,i,l,ui(e))}catch(yt){Eo(e,i,{then:function(){},status:"rejected",reason:yt},ui())}finally{W.p=p,y!==null&&C.types!==null&&(y.types=C.types),B.T=y}}function HS(){}function Cf(e,i,s,l){if(e.tag!==5)throw Error(a(476));var f=v0(e).queue;g0(e,f,i,ct,s===null?HS:function(){return _0(e),s(l)})}function v0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:ct,baseState:ct,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:ct},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function _0(e){var i=v0(e);i.next===null&&(i=e.alternate.memoizedState),Eo(e,i.next.queue,{},ui())}function Df(){return Un(Ho)}function x0(){return un().memoizedState}function S0(){return un().memoizedState}function GS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=ui();e=Ha(s);var l=Ga(i,e,s);l!==null&&($n(l,i,s),_o(l,i,s)),i={cache:sf()},e.payload=i;return}i=i.return}}function VS(e,i,s){var l=ui();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},$l(e)?M0(i,s):(s=Yu(e,i,s,l),s!==null&&($n(s,e,l),E0(s,i,l)))}function y0(e,i,s){var l=ui();Eo(e,i,s,l)}function Eo(e,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if($l(e))M0(i,f);else{var p=e.alternate;if(e.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var y=i.lastRenderedState,C=p(y,s);if(f.hasEagerState=!0,f.eagerState=C,ai(C,y))return Nl(e,i,f,0),Ye===null&&Ll(),!1}catch{}finally{}if(s=Yu(e,i,f,l),s!==null)return $n(s,e,l),E0(s,i,l),!0}return!1}function Uf(e,i,s,l){if(l={lane:2,revertLane:ch(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},$l(e)){if(i)throw Error(a(479))}else i=Yu(e,s,l,2),i!==null&&$n(i,e,2)}function $l(e){var i=e.alternate;return e===ce||i!==null&&i===ce}function M0(e,i){cr=ql=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function E0(e,i,s){if((s&4194048)!==0){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,qn(e,s)}}var bo={readContext:Un,use:Kl,useCallback:on,useContext:on,useEffect:on,useImperativeHandle:on,useLayoutEffect:on,useInsertionEffect:on,useMemo:on,useReducer:on,useRef:on,useState:on,useDebugValue:on,useDeferredValue:on,useTransition:on,useSyncExternalStore:on,useId:on,useHostTransitionStatus:on,useFormState:on,useActionState:on,useOptimistic:on,useMemoCache:on,useCacheRefresh:on};bo.useEffectEvent=on;var b0={readContext:Un,use:Kl,useCallback:function(e,i){return Vn().memoizedState=[e,i===void 0?null:i],e},useContext:Un,useEffect:o0,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,Ql(4194308,4,f0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return Ql(4194308,4,e,i)},useInsertionEffect:function(e,i){Ql(4,2,e,i)},useMemo:function(e,i){var s=Vn();i=i===void 0?null:i;var l=e();if(As){At(!0);try{e()}finally{At(!1)}}return s.memoizedState=[l,i],l},useReducer:function(e,i,s){var l=Vn();if(s!==void 0){var f=s(i);if(As){At(!0);try{s(i)}finally{At(!1)}}}else f=i;return l.memoizedState=l.baseState=f,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:f},l.queue=e,e=e.dispatch=VS.bind(null,ce,e),[l.memoizedState,e]},useRef:function(e){var i=Vn();return e={current:e},i.memoizedState=e},useState:function(e){e=bf(e);var i=e.queue,s=y0.bind(null,ce,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:Rf,useDeferredValue:function(e,i){var s=Vn();return wf(s,e,i)},useTransition:function(){var e=bf(!1);return e=g0.bind(null,ce,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var l=ce,f=Vn();if(Me){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Ye===null)throw Error(a(349));(Se&127)!==0||Wm(l,i,s)}f.memoizedState=s;var p={value:s,getSnapshot:i};return f.queue=p,o0(Ym.bind(null,l,p,e),[e]),l.flags|=2048,fr(9,{destroy:void 0},qm.bind(null,l,p,s,i),null),s},useId:function(){var e=Vn(),i=Ye.identifierPrefix;if(Me){var s=Xi,l=ki;s=(l&~(1<<32-Ht(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Yl++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=PS++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Df,useFormState:n0,useActionState:n0,useOptimistic:function(e){var i=Vn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Uf.bind(null,ce,!0,s),s.dispatch=i,[e,i]},useMemoCache:yf,useCacheRefresh:function(){return Vn().memoizedState=GS.bind(null,ce)},useEffectEvent:function(e){var i=Vn(),s={impl:e};return i.memoizedState=s,function(){if((Ne&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Lf={readContext:Un,use:Kl,useCallback:d0,useContext:Un,useEffect:Af,useImperativeHandle:h0,useInsertionEffect:c0,useLayoutEffect:u0,useMemo:p0,useReducer:Jl,useRef:r0,useState:function(){return Jl(ca)},useDebugValue:Rf,useDeferredValue:function(e,i){var s=un();return m0(s,Ge.memoizedState,e,i)},useTransition:function(){var e=Jl(ca)[0],i=un().memoizedState;return[typeof e=="boolean"?e:Mo(e),i]},useSyncExternalStore:Xm,useId:x0,useHostTransitionStatus:Df,useFormState:i0,useActionState:i0,useOptimistic:function(e,i){var s=un();return Jm(s,Ge,e,i)},useMemoCache:yf,useCacheRefresh:S0};Lf.useEffectEvent=l0;var T0={readContext:Un,use:Kl,useCallback:d0,useContext:Un,useEffect:Af,useImperativeHandle:h0,useInsertionEffect:c0,useLayoutEffect:u0,useMemo:p0,useReducer:Ef,useRef:r0,useState:function(){return Ef(ca)},useDebugValue:Rf,useDeferredValue:function(e,i){var s=un();return Ge===null?wf(s,e,i):m0(s,Ge.memoizedState,e,i)},useTransition:function(){var e=Ef(ca)[0],i=un().memoizedState;return[typeof e=="boolean"?e:Mo(e),i]},useSyncExternalStore:Xm,useId:x0,useHostTransitionStatus:Df,useFormState:s0,useActionState:s0,useOptimistic:function(e,i){var s=un();return Ge!==null?Jm(s,Ge,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:yf,useCacheRefresh:S0};T0.useEffectEvent=l0;function Nf(e,i,s,l){i=e.memoizedState,s=s(l,i),s=s==null?i:_({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Of={enqueueSetState:function(e,i,s){e=e._reactInternals;var l=ui(),f=Ha(l);f.payload=i,s!=null&&(f.callback=s),i=Ga(e,f,l),i!==null&&($n(i,e,l),_o(i,e,l))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var l=ui(),f=Ha(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=Ga(e,f,l),i!==null&&($n(i,e,l),_o(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=ui(),l=Ha(s);l.tag=2,i!=null&&(l.callback=i),i=Ga(e,l,s),i!==null&&($n(i,e,s),_o(i,e,s))}};function A0(e,i,s,l,f,p,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,p,y):i.prototype&&i.prototype.isPureReactComponent?!co(s,l)||!co(f,p):!0}function R0(e,i,s,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==e&&Of.enqueueReplaceState(i,i.state,null)}function Rs(e,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(e=e.defaultProps){s===i&&(s=_({},s));for(var f in e)s[f]===void 0&&(s[f]=e[f])}return s}function w0(e){Ul(e)}function C0(e){console.error(e)}function D0(e){Ul(e)}function tc(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function U0(e,i,s){try{var l=e.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Pf(e,i,s){return s=Ha(s),s.tag=3,s.payload={element:null},s.callback=function(){tc(e,i)},s}function L0(e){return e=Ha(e),e.tag=3,e}function N0(e,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var p=l.value;e.payload=function(){return f(p)},e.callback=function(){U0(i,s,l)}}var y=s.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){U0(i,s,l),typeof f!="function"&&(Ya===null?Ya=new Set([this]):Ya.add(this));var C=l.stack;this.componentDidCatch(l.value,{componentStack:C!==null?C:""})})}function kS(e,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&ir(i,s,f,!0),s=ri.current,s!==null){switch(s.tag){case 31:case 13:return yi===null?hc():s.alternate===null&&ln===0&&(ln=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===Gl?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),rh(e,l,f)),!1;case 22:return s.flags|=65536,l===Gl?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),rh(e,l,f)),!1}throw Error(a(435,s.tag))}return rh(e,l,f),hc(),!1}if(Me)return i=ri.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==$u&&(e=Error(a(422),{cause:l}),ho(vi(e,s)))):(l!==$u&&(i=Error(a(423),{cause:l}),ho(vi(i,s))),e=e.current.alternate,e.flags|=65536,f&=-f,e.lanes|=f,l=vi(l,s),f=Pf(e.stateNode,l,f),ff(e,f),ln!==4&&(ln=2)),!1;var p=Error(a(520),{cause:l});if(p=vi(p,s),Lo===null?Lo=[p]:Lo.push(p),ln!==4&&(ln=2),i===null)return!0;l=vi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=f&-f,s.lanes|=e,e=Pf(s.stateNode,l,e),ff(s,e),!1;case 1:if(i=s.type,p=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(Ya===null||!Ya.has(p))))return s.flags|=65536,f&=-f,s.lanes|=f,f=L0(f),N0(f,e,s,l),ff(s,f),!1}s=s.return}while(s!==null);return!1}var If=Error(a(461)),gn=!1;function Ln(e,i,s,l){i.child=e===null?zm(i,null,s,l):Ts(i,e.child,s,l)}function O0(e,i,s,l,f){s=s.render;var p=i.ref;if("ref"in l){var y={};for(var C in l)C!=="ref"&&(y[C]=l[C])}else y=l;return ys(i),l=vf(e,i,s,y,p,f),C=_f(),e!==null&&!gn?(xf(e,i,f),ua(e,i,f)):(Me&&C&&Qu(i),i.flags|=1,Ln(e,i,l,f),i.child)}function P0(e,i,s,l,f){if(e===null){var p=s.type;return typeof p=="function"&&!Zu(p)&&p.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=p,I0(e,i,p,l,f)):(e=Pl(s.type,null,l,i,i.mode,f),e.ref=i.ref,e.return=i,i.child=e)}if(p=e.child,!Xf(e,f)){var y=p.memoizedProps;if(s=s.compare,s=s!==null?s:co,s(y,l)&&e.ref===i.ref)return ua(e,i,f)}return i.flags|=1,e=aa(p,l),e.ref=i.ref,e.return=i,i.child=e}function I0(e,i,s,l,f){if(e!==null){var p=e.memoizedProps;if(co(p,l)&&e.ref===i.ref)if(gn=!1,i.pendingProps=l=p,Xf(e,f))(e.flags&131072)!==0&&(gn=!0);else return i.lanes=e.lanes,ua(e,i,f)}return zf(e,i,s,l,f)}function z0(e,i,s,l){var f=l.children,p=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(p=p!==null?p.baseLanes|s:s,e!==null){for(l=i.child=e.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~p}else l=0,i.child=null;return B0(e,i,p,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Fl(i,p!==null?p.cachePool:null),p!==null?Hm(i,p):df(),Gm(i);else return l=i.lanes=536870912,B0(e,i,p!==null?p.baseLanes|s:s,s,l)}else p!==null?(Fl(i,p.cachePool),Hm(i,p),ka(),i.memoizedState=null):(e!==null&&Fl(i,null),df(),ka());return Ln(e,i,f,s),i.child}function To(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function B0(e,i,s,l,f){var p=of();return p=p===null?null:{parent:pn._currentValue,pool:p},i.memoizedState={baseLanes:s,cachePool:p},e!==null&&Fl(i,null),df(),Gm(i),e!==null&&ir(e,i,l,!0),i.childLanes=f,null}function ec(e,i){return i=ic({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function F0(e,i,s){return Ts(i,e.child,null,s),e=ec(i,i.pendingProps),e.flags|=2,oi(i),i.memoizedState=null,e}function XS(e,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Me){if(l.mode==="hidden")return e=ec(i,l),i.lanes=536870912,To(null,e);if(mf(i),(e=Je)?(e=Qg(e,Si),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Pa!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},s=Mm(e),s.return=i,i.child=s,Dn=i,Je=null)):e=null,e===null)throw za(i);return i.lanes=536870912,null}return ec(i,l)}var p=e.memoizedState;if(p!==null){var y=p.dehydrated;if(mf(i),f)if(i.flags&256)i.flags&=-257,i=F0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(gn||ir(e,i,s,!1),f=(s&e.childLanes)!==0,gn||f){if(l=Ye,l!==null&&(y=ni(l,s),y!==0&&y!==p.retryLane))throw p.retryLane=y,vs(e,y),$n(l,e,y),If;hc(),i=F0(e,i,s)}else e=p.treeContext,Je=Mi(y.nextSibling),Dn=i,Me=!0,Ia=null,Si=!1,e!==null&&Tm(i,e),i=ec(i,l),i.flags|=4096;return i}return e=aa(e.child,{mode:l.mode,children:l.children}),e.ref=i.ref,i.child=e,e.return=i,e}function nc(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function zf(e,i,s,l,f){return ys(i),s=vf(e,i,s,l,void 0,f),l=_f(),e!==null&&!gn?(xf(e,i,f),ua(e,i,f)):(Me&&l&&Qu(i),i.flags|=1,Ln(e,i,s,f),i.child)}function H0(e,i,s,l,f,p){return ys(i),i.updateQueue=null,s=km(i,l,s,f),Vm(e),l=_f(),e!==null&&!gn?(xf(e,i,p),ua(e,i,p)):(Me&&l&&Qu(i),i.flags|=1,Ln(e,i,s,p),i.child)}function G0(e,i,s,l,f){if(ys(i),i.stateNode===null){var p=$s,y=s.contextType;typeof y=="object"&&y!==null&&(p=Un(y)),p=new s(l,p),i.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,p.updater=Of,i.stateNode=p,p._reactInternals=i,p=i.stateNode,p.props=l,p.state=i.memoizedState,p.refs={},cf(i),y=s.contextType,p.context=typeof y=="object"&&y!==null?Un(y):$s,p.state=i.memoizedState,y=s.getDerivedStateFromProps,typeof y=="function"&&(Nf(i,s,y,l),p.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(y=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),y!==p.state&&Of.enqueueReplaceState(p,p.state,null),So(i,l,p,f),xo(),p.state=i.memoizedState),typeof p.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){p=i.stateNode;var C=i.memoizedProps,H=Rs(s,C);p.props=H;var st=p.context,_t=s.contextType;y=$s,typeof _t=="object"&&_t!==null&&(y=Un(_t));var yt=s.getDerivedStateFromProps;_t=typeof yt=="function"||typeof p.getSnapshotBeforeUpdate=="function",C=i.pendingProps!==C,_t||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(C||st!==y)&&R0(i,p,l,y),Fa=!1;var lt=i.memoizedState;p.state=lt,So(i,l,p,f),xo(),st=i.memoizedState,C||lt!==st||Fa?(typeof yt=="function"&&(Nf(i,s,yt,l),st=i.memoizedState),(H=Fa||A0(i,s,H,l,lt,st,y))?(_t||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount()),typeof p.componentDidMount=="function"&&(i.flags|=4194308)):(typeof p.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=st),p.props=l,p.state=st,p.context=y,l=H):(typeof p.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{p=i.stateNode,uf(e,i),y=i.memoizedProps,_t=Rs(s,y),p.props=_t,yt=i.pendingProps,lt=p.context,st=s.contextType,H=$s,typeof st=="object"&&st!==null&&(H=Un(st)),C=s.getDerivedStateFromProps,(st=typeof C=="function"||typeof p.getSnapshotBeforeUpdate=="function")||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(y!==yt||lt!==H)&&R0(i,p,l,H),Fa=!1,lt=i.memoizedState,p.state=lt,So(i,l,p,f),xo();var ft=i.memoizedState;y!==yt||lt!==ft||Fa||e!==null&&e.dependencies!==null&&zl(e.dependencies)?(typeof C=="function"&&(Nf(i,s,C,l),ft=i.memoizedState),(_t=Fa||A0(i,s,_t,l,lt,ft,H)||e!==null&&e.dependencies!==null&&zl(e.dependencies))?(st||typeof p.UNSAFE_componentWillUpdate!="function"&&typeof p.componentWillUpdate!="function"||(typeof p.componentWillUpdate=="function"&&p.componentWillUpdate(l,ft,H),typeof p.UNSAFE_componentWillUpdate=="function"&&p.UNSAFE_componentWillUpdate(l,ft,H)),typeof p.componentDidUpdate=="function"&&(i.flags|=4),typeof p.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof p.componentDidUpdate!="function"||y===e.memoizedProps&&lt===e.memoizedState||(i.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&lt===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=ft),p.props=l,p.state=ft,p.context=H,l=_t):(typeof p.componentDidUpdate!="function"||y===e.memoizedProps&&lt===e.memoizedState||(i.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&lt===e.memoizedState||(i.flags|=1024),l=!1)}return p=l,nc(e,i),l=(i.flags&128)!==0,p||l?(p=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:p.render(),i.flags|=1,e!==null&&l?(i.child=Ts(i,e.child,null,f),i.child=Ts(i,null,s,f)):Ln(e,i,s,f),i.memoizedState=p.state,e=i.child):e=ua(e,i,f),e}function V0(e,i,s,l){return xs(),i.flags|=256,Ln(e,i,s,l),i.child}var Bf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ff(e){return{baseLanes:e,cachePool:Um()}}function Hf(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=ci),e}function k0(e,i,s){var l=i.pendingProps,f=!1,p=(i.flags&128)!==0,y;if((y=p)||(y=e!==null&&e.memoizedState===null?!1:(cn.current&2)!==0),y&&(f=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(Me){if(f?Va(i):ka(),(e=Je)?(e=Qg(e,Si),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Pa!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},s=Mm(e),s.return=i,i.child=s,Dn=i,Je=null)):e=null,e===null)throw za(i);return Mh(e)?i.lanes=32:i.lanes=536870912,null}var C=l.children;return l=l.fallback,f?(ka(),f=i.mode,C=ic({mode:"hidden",children:C},f),l=_s(l,f,s,null),C.return=i,l.return=i,C.sibling=l,i.child=C,l=i.child,l.memoizedState=Ff(s),l.childLanes=Hf(e,y,s),i.memoizedState=Bf,To(null,l)):(Va(i),Gf(i,C))}var H=e.memoizedState;if(H!==null&&(C=H.dehydrated,C!==null)){if(p)i.flags&256?(Va(i),i.flags&=-257,i=Vf(e,i,s)):i.memoizedState!==null?(ka(),i.child=e.child,i.flags|=128,i=null):(ka(),C=l.fallback,f=i.mode,l=ic({mode:"visible",children:l.children},f),C=_s(C,f,s,null),C.flags|=2,l.return=i,C.return=i,l.sibling=C,i.child=l,Ts(i,e.child,null,s),l=i.child,l.memoizedState=Ff(s),l.childLanes=Hf(e,y,s),i.memoizedState=Bf,i=To(null,l));else if(Va(i),Mh(C)){if(y=C.nextSibling&&C.nextSibling.dataset,y)var st=y.dgst;y=st,l=Error(a(419)),l.stack="",l.digest=y,ho({value:l,source:null,stack:null}),i=Vf(e,i,s)}else if(gn||ir(e,i,s,!1),y=(s&e.childLanes)!==0,gn||y){if(y=Ye,y!==null&&(l=ni(y,s),l!==0&&l!==H.retryLane))throw H.retryLane=l,vs(e,l),$n(y,e,l),If;yh(C)||hc(),i=Vf(e,i,s)}else yh(C)?(i.flags|=192,i.child=e.child,i=null):(e=H.treeContext,Je=Mi(C.nextSibling),Dn=i,Me=!0,Ia=null,Si=!1,e!==null&&Tm(i,e),i=Gf(i,l.children),i.flags|=4096);return i}return f?(ka(),C=l.fallback,f=i.mode,H=e.child,st=H.sibling,l=aa(H,{mode:"hidden",children:l.children}),l.subtreeFlags=H.subtreeFlags&65011712,st!==null?C=aa(st,C):(C=_s(C,f,s,null),C.flags|=2),C.return=i,l.return=i,l.sibling=C,i.child=l,To(null,l),l=i.child,C=e.child.memoizedState,C===null?C=Ff(s):(f=C.cachePool,f!==null?(H=pn._currentValue,f=f.parent!==H?{parent:H,pool:H}:f):f=Um(),C={baseLanes:C.baseLanes|s,cachePool:f}),l.memoizedState=C,l.childLanes=Hf(e,y,s),i.memoizedState=Bf,To(e.child,l)):(Va(i),s=e.child,e=s.sibling,s=aa(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=s,i.memoizedState=null,s)}function Gf(e,i){return i=ic({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function ic(e,i){return e=si(22,e,null,i),e.lanes=0,e}function Vf(e,i,s){return Ts(i,e.child,null,s),e=Gf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function X0(e,i,s){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),nf(e.return,i,s)}function kf(e,i,s,l,f,p){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:p}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=l,y.tail=s,y.tailMode=f,y.treeForkCount=p)}function W0(e,i,s){var l=i.pendingProps,f=l.revealOrder,p=l.tail;l=l.children;var y=cn.current,C=(y&2)!==0;if(C?(y=y&1|2,i.flags|=128):y&=1,gt(cn,y),Ln(e,i,l,s),l=Me?fo:0,!C&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&X0(e,s,i);else if(e.tag===19)X0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)e=s.alternate,e!==null&&Wl(e)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),kf(i,!1,f,s,p,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(e=f.alternate,e!==null&&Wl(e)===null){i.child=f;break}e=f.sibling,f.sibling=s,s=f,f=e}kf(i,!0,s,null,p,l);break;case"together":kf(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function ua(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),qa|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(ir(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=aa(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=aa(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Xf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&zl(e)))}function WS(e,i,s){switch(i.tag){case 3:vt(i,i.stateNode.containerInfo),Ba(i,pn,e.memoizedState.cache),xs();break;case 27:case 5:te(i);break;case 4:vt(i,i.stateNode.containerInfo);break;case 10:Ba(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,mf(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(Va(i),i.flags|=128,null):(s&i.child.childLanes)!==0?k0(e,i,s):(Va(i),e=ua(e,i,s),e!==null?e.sibling:null);Va(i);break;case 19:var f=(e.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(ir(e,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return W0(e,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),gt(cn,cn.current),l)break;return null;case 22:return i.lanes=0,z0(e,i,s,i.pendingProps);case 24:Ba(i,pn,e.memoizedState.cache)}return ua(e,i,s)}function q0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)gn=!0;else{if(!Xf(e,s)&&(i.flags&128)===0)return gn=!1,WS(e,i,s);gn=(e.flags&131072)!==0}else gn=!1,Me&&(i.flags&1048576)!==0&&bm(i,fo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var l=i.pendingProps;if(e=Es(i.elementType),i.type=e,typeof e=="function")Zu(e)?(l=Rs(e,l),i.tag=1,i=G0(null,i,e,l,s)):(i.tag=0,i=zf(null,i,e,l,s));else{if(e!=null){var f=e.$$typeof;if(f===A){i.tag=11,i=O0(null,i,e,l,s);break t}else if(f===P){i.tag=14,i=P0(null,i,e,l,s);break t}}throw i=k(e)||e,Error(a(306,i,""))}}return i;case 0:return zf(e,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=Rs(l,i.pendingProps),G0(e,i,l,f,s);case 3:t:{if(vt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));l=i.pendingProps;var p=i.memoizedState;f=p.element,uf(e,i),So(i,l,null,s);var y=i.memoizedState;if(l=y.cache,Ba(i,pn,l),l!==p.cache&&af(i,[pn],s,!0),xo(),l=y.element,p.isDehydrated)if(p={element:l,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){i=V0(e,i,l,s);break t}else if(l!==f){f=vi(Error(a(424)),i),ho(f),i=V0(e,i,l,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Je=Mi(e.firstChild),Dn=i,Me=!0,Ia=null,Si=!0,s=zm(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(xs(),l===f){i=ua(e,i,s);break t}Ln(e,i,l,s)}i=i.child}return i;case 26:return nc(e,i),e===null?(s=iv(i.type,null,i.pendingProps,null))?i.memoizedState=s:Me||(s=i.type,e=i.pendingProps,l=xc(kt.current).createElement(s),l[fn]=i,l[Cn]=e,Nn(l,s,e),hn(l),i.stateNode=l):i.memoizedState=iv(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return te(i),e===null&&Me&&(l=i.stateNode=tv(i.type,i.pendingProps,kt.current),Dn=i,Si=!0,f=Je,Qa(i.type)?(Eh=f,Je=Mi(l.firstChild)):Je=f),Ln(e,i,i.pendingProps.children,s),nc(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Me&&((f=l=Je)&&(l=yy(l,i.type,i.pendingProps,Si),l!==null?(i.stateNode=l,Dn=i,Je=Mi(l.firstChild),Si=!1,f=!0):f=!1),f||za(i)),te(i),f=i.type,p=i.pendingProps,y=e!==null?e.memoizedProps:null,l=p.children,_h(f,p)?l=null:y!==null&&_h(f,y)&&(i.flags|=32),i.memoizedState!==null&&(f=vf(e,i,IS,null,null,s),Ho._currentValue=f),nc(e,i),Ln(e,i,l,s),i.child;case 6:return e===null&&Me&&((e=s=Je)&&(s=My(s,i.pendingProps,Si),s!==null?(i.stateNode=s,Dn=i,Je=null,e=!0):e=!1),e||za(i)),null;case 13:return k0(e,i,s);case 4:return vt(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=Ts(i,null,l,s):Ln(e,i,l,s),i.child;case 11:return O0(e,i,i.type,i.pendingProps,s);case 7:return Ln(e,i,i.pendingProps,s),i.child;case 8:return Ln(e,i,i.pendingProps.children,s),i.child;case 12:return Ln(e,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Ba(i,i.type,l.value),Ln(e,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,ys(i),f=Un(f),l=l(f),i.flags|=1,Ln(e,i,l,s),i.child;case 14:return P0(e,i,i.type,i.pendingProps,s);case 15:return I0(e,i,i.type,i.pendingProps,s);case 19:return W0(e,i,s);case 31:return XS(e,i,s);case 22:return z0(e,i,s,i.pendingProps);case 24:return ys(i),l=Un(pn),e===null?(f=of(),f===null&&(f=Ye,p=sf(),f.pooledCache=p,p.refCount++,p!==null&&(f.pooledCacheLanes|=s),f=p),i.memoizedState={parent:l,cache:f},cf(i),Ba(i,pn,f)):((e.lanes&s)!==0&&(uf(e,i),So(i,null,null,s),xo()),f=e.memoizedState,p=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),Ba(i,pn,l)):(l=p.cache,Ba(i,pn,l),l!==f.cache&&af(i,[pn],s,!0))),Ln(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function fa(e){e.flags|=4}function Wf(e,i,s,l,f){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(f&335544128)===f)if(e.stateNode.complete)e.flags|=8192;else if(xg())e.flags|=8192;else throw bs=Gl,lf}else e.flags&=-16777217}function Y0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!lv(i))if(xg())e.flags|=8192;else throw bs=Gl,lf}function ac(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Mt():536870912,e.lanes|=i,mr|=i)}function Ao(e,i){if(!Me)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function Qe(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,l=0;if(i)for(var f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=l,e.childLanes=s,i}function qS(e,i,s){var l=i.pendingProps;switch(ju(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(i),null;case 1:return Qe(i),null;case 3:return s=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),oa(pn),Tt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(nr(i)?fa(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,tf())),Qe(i),null;case 26:var f=i.type,p=i.memoizedState;return e===null?(fa(i),p!==null?(Qe(i),Y0(i,p)):(Qe(i),Wf(i,f,null,l,s))):p?p!==e.memoizedState?(fa(i),Qe(i),Y0(i,p)):(Qe(i),i.flags&=-16777217):(e=e.memoizedProps,e!==l&&fa(i),Qe(i),Wf(i,f,e,l,s)),null;case 27:if(Ft(i),s=kt.current,f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&fa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return Qe(i),null}e=Et.current,nr(i)?Am(i):(e=tv(f,l,s),i.stateNode=e,fa(i))}return Qe(i),null;case 5:if(Ft(i),f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&fa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return Qe(i),null}if(p=Et.current,nr(i))Am(i);else{var y=xc(kt.current);switch(p){case 1:p=y.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:p=y.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":p=y.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":p=y.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":p=y.createElement("div"),p.innerHTML="<script><\/script>",p=p.removeChild(p.firstChild);break;case"select":p=typeof l.is=="string"?y.createElement("select",{is:l.is}):y.createElement("select"),l.multiple?p.multiple=!0:l.size&&(p.size=l.size);break;default:p=typeof l.is=="string"?y.createElement(f,{is:l.is}):y.createElement(f)}}p[fn]=i,p[Cn]=l;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)p.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=p;t:switch(Nn(p,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&fa(i)}}return Qe(i),Wf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&fa(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=kt.current,nr(i)){if(e=i.stateNode,s=i.memoizedProps,l=null,f=Dn,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}e[fn]=i,e=!!(e.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||kg(e.nodeValue,s)),e||za(i,!0)}else e=xc(e).createTextNode(l),e[fn]=i,i.stateNode=e}return Qe(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(l=nr(i),s!==null){if(e===null){if(!l)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[fn]=i}else xs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Qe(i),e=!1}else s=tf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(oi(i),i):(oi(i),null);if((i.flags&128)!==0)throw Error(a(558))}return Qe(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(f=nr(i),l!==null&&l.dehydrated!==null){if(e===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[fn]=i}else xs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Qe(i),f=!1}else f=tf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(oi(i),i):(oi(i),null)}return oi(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,e=e!==null&&e.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),p=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(p=l.memoizedState.cachePool.pool),p!==f&&(l.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),ac(i,i.updateQueue),Qe(i),null);case 4:return Tt(),e===null&&dh(i.stateNode.containerInfo),Qe(i),null;case 10:return oa(i.type),Qe(i),null;case 19:if($(cn),l=i.memoizedState,l===null)return Qe(i),null;if(f=(i.flags&128)!==0,p=l.rendering,p===null)if(f)Ao(l,!1);else{if(ln!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(p=Wl(e),p!==null){for(i.flags|=128,Ao(l,!1),e=p.updateQueue,i.updateQueue=e,ac(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)ym(s,e),s=s.sibling;return gt(cn,cn.current&1|2),Me&&sa(i,l.treeForkCount),i.child}e=e.sibling}l.tail!==null&&Pe()>cc&&(i.flags|=128,f=!0,Ao(l,!1),i.lanes=4194304)}else{if(!f)if(e=Wl(p),e!==null){if(i.flags|=128,f=!0,e=e.updateQueue,i.updateQueue=e,ac(i,e),Ao(l,!0),l.tail===null&&l.tailMode==="hidden"&&!p.alternate&&!Me)return Qe(i),null}else 2*Pe()-l.renderingStartTime>cc&&s!==536870912&&(i.flags|=128,f=!0,Ao(l,!1),i.lanes=4194304);l.isBackwards?(p.sibling=i.child,i.child=p):(e=l.last,e!==null?e.sibling=p:i.child=p,l.last=p)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=Pe(),e.sibling=null,s=cn.current,gt(cn,f?s&1|2:s&1),Me&&sa(i,l.treeForkCount),e):(Qe(i),null);case 22:case 23:return oi(i),pf(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(Qe(i),i.subtreeFlags&6&&(i.flags|=8192)):Qe(i),s=i.updateQueue,s!==null&&ac(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),e!==null&&$(Ms),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),oa(pn),Qe(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function YS(e,i){switch(ju(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return oa(pn),Tt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Ft(i),null;case 31:if(i.memoizedState!==null){if(oi(i),i.alternate===null)throw Error(a(340));xs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(oi(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));xs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return $(cn),null;case 4:return Tt(),null;case 10:return oa(i.type),null;case 22:case 23:return oi(i),pf(),e!==null&&$(Ms),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return oa(pn),null;case 25:return null;default:return null}}function Z0(e,i){switch(ju(i),i.tag){case 3:oa(pn),Tt();break;case 26:case 27:case 5:Ft(i);break;case 4:Tt();break;case 31:i.memoizedState!==null&&oi(i);break;case 13:oi(i);break;case 19:$(cn);break;case 10:oa(i.type);break;case 22:case 23:oi(i),pf(),e!==null&&$(Ms);break;case 24:oa(pn)}}function Ro(e,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&e)===e){l=void 0;var p=s.create,y=s.inst;l=p(),y.destroy=l}s=s.next}while(s!==f)}}catch(C){ze(i,i.return,C)}}function Xa(e,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var p=f.next;l=p;do{if((l.tag&e)===e){var y=l.inst,C=y.destroy;if(C!==void 0){y.destroy=void 0,f=i;var H=s,st=C;try{st()}catch(_t){ze(f,H,_t)}}}l=l.next}while(l!==p)}}catch(_t){ze(i,i.return,_t)}}function K0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{Fm(i,s)}catch(l){ze(e,e.return,l)}}}function J0(e,i,s){s.props=Rs(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(l){ze(e,i,l)}}function wo(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof s=="function"?e.refCleanup=s(l):s.current=l}}catch(f){ze(e,i,f)}}function Wi(e,i){var s=e.ref,l=e.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){ze(e,i,f)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){ze(e,i,f)}else s.current=null}function Q0(e){var i=e.type,s=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break t;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){ze(e,e.return,f)}}function qf(e,i,s){try{var l=e.stateNode;my(l,e.type,s,i),l[Cn]=i}catch(f){ze(e,e.return,f)}}function j0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Qa(e.type)||e.tag===4}function Yf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||j0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Qa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Zf(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=mi));else if(l!==4&&(l===27&&Qa(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(Zf(e,i,s),e=e.sibling;e!==null;)Zf(e,i,s),e=e.sibling}function sc(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(l!==4&&(l===27&&Qa(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(sc(e,i,s),e=e.sibling;e!==null;)sc(e,i,s),e=e.sibling}function $0(e){var i=e.stateNode,s=e.memoizedProps;try{for(var l=e.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);Nn(i,l,s),i[fn]=e,i[Cn]=s}catch(p){ze(e,e.return,p)}}var ha=!1,vn=!1,Kf=!1,tg=typeof WeakSet=="function"?WeakSet:Set,Rn=null;function ZS(e,i){if(e=e.containerInfo,gh=Ac,e=hm(e),Gu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,p=l.focusNode;l=l.focusOffset;try{s.nodeType,p.nodeType}catch{s=null;break t}var y=0,C=-1,H=-1,st=0,_t=0,yt=e,lt=null;e:for(;;){for(var ft;yt!==s||f!==0&&yt.nodeType!==3||(C=y+f),yt!==p||l!==0&&yt.nodeType!==3||(H=y+l),yt.nodeType===3&&(y+=yt.nodeValue.length),(ft=yt.firstChild)!==null;)lt=yt,yt=ft;for(;;){if(yt===e)break e;if(lt===s&&++st===f&&(C=y),lt===p&&++_t===l&&(H=y),(ft=yt.nextSibling)!==null)break;yt=lt,lt=yt.parentNode}yt=ft}s=C===-1||H===-1?null:{start:C,end:H}}else s=null}s=s||{start:0,end:0}}else s=null;for(vh={focusedElem:e,selectionRange:s},Ac=!1,Rn=i;Rn!==null;)if(i=Rn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Rn=e;else for(;Rn!==null;){switch(i=Rn,p=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)f=e[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&p!==null){e=void 0,s=i,f=p.memoizedProps,p=p.memoizedState,l=s.stateNode;try{var Yt=Rs(s.type,f);e=l.getSnapshotBeforeUpdate(Yt,p),l.__reactInternalSnapshotBeforeUpdate=e}catch($t){ze(s,s.return,$t)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)Sh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Sh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Rn=e;break}Rn=i.return}}function eg(e,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:pa(e,s),l&4&&Ro(5,s);break;case 1:if(pa(e,s),l&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(y){ze(s,s.return,y)}else{var f=Rs(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(f,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){ze(s,s.return,y)}}l&64&&K0(s),l&512&&wo(s,s.return);break;case 3:if(pa(e,s),l&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{Fm(e,i)}catch(y){ze(s,s.return,y)}}break;case 27:i===null&&l&4&&$0(s);case 26:case 5:pa(e,s),i===null&&l&4&&Q0(s),l&512&&wo(s,s.return);break;case 12:pa(e,s);break;case 31:pa(e,s),l&4&&ag(e,s);break;case 13:pa(e,s),l&4&&sg(e,s),l&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=iy.bind(null,s),Ey(e,s))));break;case 22:if(l=s.memoizedState!==null||ha,!l){i=i!==null&&i.memoizedState!==null||vn,f=ha;var p=vn;ha=l,(vn=i)&&!p?ma(e,s,(s.subtreeFlags&8772)!==0):pa(e,s),ha=f,vn=p}break;case 30:break;default:pa(e,s)}}function ng(e){var i=e.alternate;i!==null&&(e.alternate=null,ng(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&Ua(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var en=null,Kn=!1;function da(e,i,s){for(s=s.child;s!==null;)ig(e,i,s),s=s.sibling}function ig(e,i,s){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(pt,s)}catch{}switch(s.tag){case 26:vn||Wi(s,i),da(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:vn||Wi(s,i);var l=en,f=Kn;Qa(s.type)&&(en=s.stateNode,Kn=!1),da(e,i,s),zo(s.stateNode),en=l,Kn=f;break;case 5:vn||Wi(s,i);case 6:if(l=en,f=Kn,en=null,da(e,i,s),en=l,Kn=f,en!==null)if(Kn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(s.stateNode)}catch(p){ze(s,i,p)}else try{en.removeChild(s.stateNode)}catch(p){ze(s,i,p)}break;case 18:en!==null&&(Kn?(e=en,Kg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Er(e)):Kg(en,s.stateNode));break;case 4:l=en,f=Kn,en=s.stateNode.containerInfo,Kn=!0,da(e,i,s),en=l,Kn=f;break;case 0:case 11:case 14:case 15:Xa(2,s,i),vn||Xa(4,s,i),da(e,i,s);break;case 1:vn||(Wi(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&J0(s,i,l)),da(e,i,s);break;case 21:da(e,i,s);break;case 22:vn=(l=vn)||s.memoizedState!==null,da(e,i,s),vn=l;break;default:da(e,i,s)}}function ag(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Er(e)}catch(s){ze(i,i.return,s)}}}function sg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Er(e)}catch(s){ze(i,i.return,s)}}function KS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new tg),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new tg),i;default:throw Error(a(435,e.tag))}}function rc(e,i){var s=KS(e);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=ay.bind(null,e,l);l.then(f,f)}})}function Jn(e,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],p=e,y=i,C=y;t:for(;C!==null;){switch(C.tag){case 27:if(Qa(C.type)){en=C.stateNode,Kn=!1;break t}break;case 5:en=C.stateNode,Kn=!1;break t;case 3:case 4:en=C.stateNode.containerInfo,Kn=!0;break t}C=C.return}if(en===null)throw Error(a(160));ig(p,y,f),en=null,Kn=!1,p=f.alternate,p!==null&&(p.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)rg(i,e),i=i.sibling}var Di=null;function rg(e,i){var s=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(i,e),Qn(e),l&4&&(Xa(3,e,e.return),Ro(3,e),Xa(5,e,e.return));break;case 1:Jn(i,e),Qn(e),l&512&&(vn||s===null||Wi(s,s.return)),l&64&&ha&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=Di;if(Jn(i,e),Qn(e),l&512&&(vn||s===null||Wi(s,s.return)),l&4){var p=s!==null?s.memoizedState:null;if(l=e.memoizedState,s===null)if(l===null)if(e.stateNode===null){t:{l=e.type,s=e.memoizedProps,f=f.ownerDocument||f;e:switch(l){case"title":p=f.getElementsByTagName("title")[0],(!p||p[Da]||p[fn]||p.namespaceURI==="http://www.w3.org/2000/svg"||p.hasAttribute("itemprop"))&&(p=f.createElement(l),f.head.insertBefore(p,f.querySelector("head > title"))),Nn(p,l,s),p[fn]=e,hn(p),l=p;break t;case"link":var y=rv("link","href",f).get(l+(s.href||""));if(y){for(var C=0;C<y.length;C++)if(p=y[C],p.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&p.getAttribute("rel")===(s.rel==null?null:s.rel)&&p.getAttribute("title")===(s.title==null?null:s.title)&&p.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){y.splice(C,1);break e}}p=f.createElement(l),Nn(p,l,s),f.head.appendChild(p);break;case"meta":if(y=rv("meta","content",f).get(l+(s.content||""))){for(C=0;C<y.length;C++)if(p=y[C],p.getAttribute("content")===(s.content==null?null:""+s.content)&&p.getAttribute("name")===(s.name==null?null:s.name)&&p.getAttribute("property")===(s.property==null?null:s.property)&&p.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&p.getAttribute("charset")===(s.charSet==null?null:s.charSet)){y.splice(C,1);break e}}p=f.createElement(l),Nn(p,l,s),f.head.appendChild(p);break;default:throw Error(a(468,l))}p[fn]=e,hn(p),l=p}e.stateNode=l}else ov(f,e.type,e.stateNode);else e.stateNode=sv(f,l,e.memoizedProps);else p!==l?(p===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):p.count--,l===null?ov(f,e.type,e.stateNode):sv(f,l,e.memoizedProps)):l===null&&e.stateNode!==null&&qf(e,e.memoizedProps,s.memoizedProps)}break;case 27:Jn(i,e),Qn(e),l&512&&(vn||s===null||Wi(s,s.return)),s!==null&&l&4&&qf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Jn(i,e),Qn(e),l&512&&(vn||s===null||Wi(s,s.return)),e.flags&32){f=e.stateNode;try{Gn(f,"")}catch(Yt){ze(e,e.return,Yt)}}l&4&&e.stateNode!=null&&(f=e.memoizedProps,qf(e,f,s!==null?s.memoizedProps:f)),l&1024&&(Kf=!0);break;case 6:if(Jn(i,e),Qn(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,s=e.stateNode;try{s.nodeValue=l}catch(Yt){ze(e,e.return,Yt)}}break;case 3:if(Mc=null,f=Di,Di=Sc(i.containerInfo),Jn(i,e),Di=f,Qn(e),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Er(i.containerInfo)}catch(Yt){ze(e,e.return,Yt)}Kf&&(Kf=!1,og(e));break;case 4:l=Di,Di=Sc(e.stateNode.containerInfo),Jn(i,e),Qn(e),Di=l;break;case 12:Jn(i,e),Qn(e);break;case 31:Jn(i,e),Qn(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,rc(e,l)));break;case 13:Jn(i,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(lc=Pe()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,rc(e,l)));break;case 22:f=e.memoizedState!==null;var H=s!==null&&s.memoizedState!==null,st=ha,_t=vn;if(ha=st||f,vn=_t||H,Jn(i,e),vn=_t,ha=st,Qn(e),l&8192)t:for(i=e.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||H||ha||vn||ws(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){H=s=i;try{if(p=H.stateNode,f)y=p.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{C=H.stateNode;var yt=H.memoizedProps.style,lt=yt!=null&&yt.hasOwnProperty("display")?yt.display:null;C.style.display=lt==null||typeof lt=="boolean"?"":(""+lt).trim()}}catch(Yt){ze(H,H.return,Yt)}}}else if(i.tag===6){if(s===null){H=i;try{H.stateNode.nodeValue=f?"":H.memoizedProps}catch(Yt){ze(H,H.return,Yt)}}}else if(i.tag===18){if(s===null){H=i;try{var ft=H.stateNode;f?Jg(ft,!0):Jg(H.stateNode,!1)}catch(Yt){ze(H,H.return,Yt)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,rc(e,s))));break;case 19:Jn(i,e),Qn(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,rc(e,l)));break;case 30:break;case 21:break;default:Jn(i,e),Qn(e)}}function Qn(e){var i=e.flags;if(i&2){try{for(var s,l=e.return;l!==null;){if(j0(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,p=Yf(e);sc(e,p,f);break;case 5:var y=s.stateNode;s.flags&32&&(Gn(y,""),s.flags&=-33);var C=Yf(e);sc(e,C,y);break;case 3:case 4:var H=s.stateNode.containerInfo,st=Yf(e);Zf(e,st,H);break;default:throw Error(a(161))}}catch(_t){ze(e,e.return,_t)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function og(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;og(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function pa(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)eg(e,i.alternate,i),i=i.sibling}function ws(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Xa(4,i,i.return),ws(i);break;case 1:Wi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&J0(i,i.return,s),ws(i);break;case 27:zo(i.stateNode);case 26:case 5:Wi(i,i.return),ws(i);break;case 22:i.memoizedState===null&&ws(i);break;case 30:ws(i);break;default:ws(i)}e=e.sibling}}function ma(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=e,p=i,y=p.flags;switch(p.tag){case 0:case 11:case 15:ma(f,p,s),Ro(4,p);break;case 1:if(ma(f,p,s),l=p,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(st){ze(l,l.return,st)}if(l=p,f=l.updateQueue,f!==null){var C=l.stateNode;try{var H=f.shared.hiddenCallbacks;if(H!==null)for(f.shared.hiddenCallbacks=null,f=0;f<H.length;f++)Bm(H[f],C)}catch(st){ze(l,l.return,st)}}s&&y&64&&K0(p),wo(p,p.return);break;case 27:$0(p);case 26:case 5:ma(f,p,s),s&&l===null&&y&4&&Q0(p),wo(p,p.return);break;case 12:ma(f,p,s);break;case 31:ma(f,p,s),s&&y&4&&ag(f,p);break;case 13:ma(f,p,s),s&&y&4&&sg(f,p);break;case 22:p.memoizedState===null&&ma(f,p,s),wo(p,p.return);break;case 30:break;default:ma(f,p,s)}i=i.sibling}}function Jf(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&po(s))}function Qf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&po(e))}function Ui(e,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)lg(e,i,s,l),i=i.sibling}function lg(e,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Ui(e,i,s,l),f&2048&&Ro(9,i);break;case 1:Ui(e,i,s,l);break;case 3:Ui(e,i,s,l),f&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&po(e)));break;case 12:if(f&2048){Ui(e,i,s,l),e=i.stateNode;try{var p=i.memoizedProps,y=p.id,C=p.onPostCommit;typeof C=="function"&&C(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(H){ze(i,i.return,H)}}else Ui(e,i,s,l);break;case 31:Ui(e,i,s,l);break;case 13:Ui(e,i,s,l);break;case 23:break;case 22:p=i.stateNode,y=i.alternate,i.memoizedState!==null?p._visibility&2?Ui(e,i,s,l):Co(e,i):p._visibility&2?Ui(e,i,s,l):(p._visibility|=2,hr(e,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&Jf(y,i);break;case 24:Ui(e,i,s,l),f&2048&&Qf(i.alternate,i);break;default:Ui(e,i,s,l)}}function hr(e,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var p=e,y=i,C=s,H=l,st=y.flags;switch(y.tag){case 0:case 11:case 15:hr(p,y,C,H,f),Ro(8,y);break;case 23:break;case 22:var _t=y.stateNode;y.memoizedState!==null?_t._visibility&2?hr(p,y,C,H,f):Co(p,y):(_t._visibility|=2,hr(p,y,C,H,f)),f&&st&2048&&Jf(y.alternate,y);break;case 24:hr(p,y,C,H,f),f&&st&2048&&Qf(y.alternate,y);break;default:hr(p,y,C,H,f)}i=i.sibling}}function Co(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,l=i,f=l.flags;switch(l.tag){case 22:Co(s,l),f&2048&&Jf(l.alternate,l);break;case 24:Co(s,l),f&2048&&Qf(l.alternate,l);break;default:Co(s,l)}i=i.sibling}}var Do=8192;function dr(e,i,s){if(e.subtreeFlags&Do)for(e=e.child;e!==null;)cg(e,i,s),e=e.sibling}function cg(e,i,s){switch(e.tag){case 26:dr(e,i,s),e.flags&Do&&e.memoizedState!==null&&Py(s,Di,e.memoizedState,e.memoizedProps);break;case 5:dr(e,i,s);break;case 3:case 4:var l=Di;Di=Sc(e.stateNode.containerInfo),dr(e,i,s),Di=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=Do,Do=16777216,dr(e,i,s),Do=l):dr(e,i,s));break;default:dr(e,i,s)}}function ug(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Uo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Rn=l,hg(l,e)}ug(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)fg(e),e=e.sibling}function fg(e){switch(e.tag){case 0:case 11:case 15:Uo(e),e.flags&2048&&Xa(9,e,e.return);break;case 3:Uo(e);break;case 12:Uo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,oc(e)):Uo(e);break;default:Uo(e)}}function oc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Rn=l,hg(l,e)}ug(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Xa(8,i,i.return),oc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,oc(i));break;default:oc(i)}e=e.sibling}}function hg(e,i){for(;Rn!==null;){var s=Rn;switch(s.tag){case 0:case 11:case 15:Xa(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:po(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,Rn=l;else t:for(s=e;Rn!==null;){l=Rn;var f=l.sibling,p=l.return;if(ng(l),l===s){Rn=null;break t}if(f!==null){f.return=p,Rn=f;break t}Rn=p}}}var JS={getCacheForType:function(e){var i=Un(pn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Un(pn).controller.signal}},QS=typeof WeakMap=="function"?WeakMap:Map,Ne=0,Ye=null,ve=null,Se=0,Ie=0,li=null,Wa=!1,pr=!1,jf=!1,ga=0,ln=0,qa=0,Cs=0,$f=0,ci=0,mr=0,Lo=null,jn=null,th=!1,lc=0,dg=0,cc=1/0,uc=null,Ya=null,yn=0,Za=null,gr=null,va=0,eh=0,nh=null,pg=null,No=0,ih=null;function ui(){return(Ne&2)!==0&&Se!==0?Se&-Se:B.T!==null?ch():to()}function mg(){if(ci===0)if((Se&536870912)===0||Me){var e=ie;ie<<=1,(ie&3932160)===0&&(ie=262144),ci=e}else ci=536870912;return e=ri.current,e!==null&&(e.flags|=32),ci}function $n(e,i,s){(e===Ye&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)&&(vr(e,0),Ka(e,Se,ci,!1)),Wt(e,s),((Ne&2)===0||e!==Ye)&&(e===Ye&&((Ne&2)===0&&(Cs|=s),ln===4&&Ka(e,Se,ci,!1)),qi(e))}function gg(e,i,s){if((Ne&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&e.expiredLanes)===0||wt(e,i),f=l?ty(e,i):sh(e,i,!0),p=l;do{if(f===0){pr&&!l&&Ka(e,i,0,!1);break}else{if(s=e.current.alternate,p&&!jS(s)){f=sh(e,i,!1),p=!1;continue}if(f===2){if(p=i,e.errorRecoveryDisabledLanes&p)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var C=e;f=Lo;var H=C.current.memoizedState.isDehydrated;if(H&&(vr(C,y).flags|=256),y=sh(C,y,!1),y!==2){if(jf&&!H){C.errorRecoveryDisabledLanes|=p,Cs|=p,f=4;break t}p=jn,jn=f,p!==null&&(jn===null?jn=p:jn.push.apply(jn,p))}f=y}if(p=!1,f!==2)continue}}if(f===1){vr(e,0),Ka(e,i,0,!0);break}t:{switch(l=e,p=f,p){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:Ka(l,i,ci,!Wa);break t;case 2:jn=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=lc+300-Pe(),10<f)){if(Ka(l,i,ci,!Wa),xt(l,0,!0)!==0)break t;va=i,l.timeoutHandle=Yg(vg.bind(null,l,s,jn,uc,th,i,ci,Cs,mr,Wa,p,"Throttled",-0,0),f);break t}vg(l,s,jn,uc,th,i,ci,Cs,mr,Wa,p,null,-0,0)}}break}while(!0);qi(e)}function vg(e,i,s,l,f,p,y,C,H,st,_t,yt,lt,ft){if(e.timeoutHandle=-1,yt=i.subtreeFlags,yt&8192||(yt&16785408)===16785408){yt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:mi},cg(i,p,yt);var Yt=(p&62914560)===p?lc-Pe():(p&4194048)===p?dg-Pe():0;if(Yt=Iy(yt,Yt),Yt!==null){va=p,e.cancelPendingCommit=Yt(Tg.bind(null,e,i,p,s,l,f,y,C,H,_t,yt,null,lt,ft)),Ka(e,p,y,!st);return}}Tg(e,i,p,s,l,f,y,C,H)}function jS(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],p=f.getSnapshot;f=f.value;try{if(!ai(p(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Ka(e,i,s,l){i&=~$f,i&=~Cs,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var f=i;0<f;){var p=31-Ht(f),y=1<<p;l[p]=-1,f&=~y}s!==0&&be(e,s,i)}function fc(){return(Ne&6)===0?(Oo(0),!1):!0}function ah(){if(ve!==null){if(Ie===0)var e=ve.return;else e=ve,ra=Ss=null,Sf(e),or=null,go=0,e=ve;for(;e!==null;)Z0(e.alternate,e),e=e.return;ve=null}}function vr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,_y(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),va=0,ah(),Ye=e,ve=s=aa(e.current,null),Se=i,Ie=0,li=null,Wa=!1,pr=wt(e,i),jf=!1,mr=ci=$f=Cs=qa=ln=0,jn=Lo=null,th=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var f=31-Ht(l),p=1<<f;i|=e[f],l&=~p}return ga=i,Ll(),s}function _g(e,i){ce=null,B.H=bo,i===rr||i===Hl?(i=Om(),Ie=3):i===lf?(i=Om(),Ie=4):Ie=i===If?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,li=i,ve===null&&(ln=1,tc(e,vi(i,e.current)))}function xg(){var e=ri.current;return e===null?!0:(Se&4194048)===Se?yi===null:(Se&62914560)===Se||(Se&536870912)!==0?e===yi:!1}function Sg(){var e=B.H;return B.H=bo,e===null?bo:e}function yg(){var e=B.A;return B.A=JS,e}function hc(){ln=4,Wa||(Se&4194048)!==Se&&ri.current!==null||(pr=!0),(qa&134217727)===0&&(Cs&134217727)===0||Ye===null||Ka(Ye,Se,ci,!1)}function sh(e,i,s){var l=Ne;Ne|=2;var f=Sg(),p=yg();(Ye!==e||Se!==i)&&(uc=null,vr(e,i)),i=!1;var y=ln;t:do try{if(Ie!==0&&ve!==null){var C=ve,H=li;switch(Ie){case 8:ah(),y=6;break t;case 3:case 2:case 9:case 6:ri.current===null&&(i=!0);var st=Ie;if(Ie=0,li=null,_r(e,C,H,st),s&&pr){y=0;break t}break;default:st=Ie,Ie=0,li=null,_r(e,C,H,st)}}$S(),y=ln;break}catch(_t){_g(e,_t)}while(!0);return i&&e.shellSuspendCounter++,ra=Ss=null,Ne=l,B.H=f,B.A=p,ve===null&&(Ye=null,Se=0,Ll()),y}function $S(){for(;ve!==null;)Mg(ve)}function ty(e,i){var s=Ne;Ne|=2;var l=Sg(),f=yg();Ye!==e||Se!==i?(uc=null,cc=Pe()+500,vr(e,i)):pr=wt(e,i);t:do try{if(Ie!==0&&ve!==null){i=ve;var p=li;e:switch(Ie){case 1:Ie=0,li=null,_r(e,i,p,1);break;case 2:case 9:if(Lm(p)){Ie=0,li=null,Eg(i);break}i=function(){Ie!==2&&Ie!==9||Ye!==e||(Ie=7),qi(e)},p.then(i,i);break t;case 3:Ie=7;break t;case 4:Ie=5;break t;case 7:Lm(p)?(Ie=0,li=null,Eg(i)):(Ie=0,li=null,_r(e,i,p,7));break;case 5:var y=null;switch(ve.tag){case 26:y=ve.memoizedState;case 5:case 27:var C=ve;if(y?lv(y):C.stateNode.complete){Ie=0,li=null;var H=C.sibling;if(H!==null)ve=H;else{var st=C.return;st!==null?(ve=st,dc(st)):ve=null}break e}}Ie=0,li=null,_r(e,i,p,5);break;case 6:Ie=0,li=null,_r(e,i,p,6);break;case 8:ah(),ln=6;break t;default:throw Error(a(462))}}ey();break}catch(_t){_g(e,_t)}while(!0);return ra=Ss=null,B.H=l,B.A=f,Ne=s,ve!==null?0:(Ye=null,Se=0,Ll(),ln)}function ey(){for(;ve!==null&&!rn();)Mg(ve)}function Mg(e){var i=q0(e.alternate,e,ga);e.memoizedProps=e.pendingProps,i===null?dc(e):ve=i}function Eg(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=H0(s,i,i.pendingProps,i.type,void 0,Se);break;case 11:i=H0(s,i,i.pendingProps,i.type.render,i.ref,Se);break;case 5:Sf(i);default:Z0(s,i),i=ve=ym(i,ga),i=q0(s,i,ga)}e.memoizedProps=e.pendingProps,i===null?dc(e):ve=i}function _r(e,i,s,l){ra=Ss=null,Sf(i),or=null,go=0;var f=i.return;try{if(kS(e,f,i,s,Se)){ln=1,tc(e,vi(s,e.current)),ve=null;return}}catch(p){if(f!==null)throw ve=f,p;ln=1,tc(e,vi(s,e.current)),ve=null;return}i.flags&32768?(Me||l===1?e=!0:pr||(Se&536870912)!==0?e=!1:(Wa=e=!0,(l===2||l===9||l===3||l===6)&&(l=ri.current,l!==null&&l.tag===13&&(l.flags|=16384))),bg(i,e)):dc(i)}function dc(e){var i=e;do{if((i.flags&32768)!==0){bg(i,Wa);return}e=i.return;var s=qS(i.alternate,i,ga);if(s!==null){ve=s;return}if(i=i.sibling,i!==null){ve=i;return}ve=i=e}while(i!==null);ln===0&&(ln=5)}function bg(e,i){do{var s=YS(e.alternate,e);if(s!==null){s.flags&=32767,ve=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){ve=e;return}ve=e=s}while(e!==null);ln=6,ve=null}function Tg(e,i,s,l,f,p,y,C,H){e.cancelPendingCommit=null;do pc();while(yn!==0);if((Ne&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(p=i.lanes|i.childLanes,p|=qu,Fe(e,s,p,y,C,H),e===Ye&&(ve=Ye=null,Se=0),gr=i,Za=e,va=s,eh=p,nh=f,pg=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,sy(Q,function(){return Dg(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=B.T,B.T=null,f=W.p,W.p=2,y=Ne,Ne|=4;try{ZS(e,i,s)}finally{Ne=y,W.p=f,B.T=l}}yn=1,Ag(),Rg(),wg()}}function Ag(){if(yn===1){yn=0;var e=Za,i=gr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=B.T,B.T=null;var l=W.p;W.p=2;var f=Ne;Ne|=4;try{rg(i,e);var p=vh,y=hm(e.containerInfo),C=p.focusedElem,H=p.selectionRange;if(y!==C&&C&&C.ownerDocument&&fm(C.ownerDocument.documentElement,C)){if(H!==null&&Gu(C)){var st=H.start,_t=H.end;if(_t===void 0&&(_t=st),"selectionStart"in C)C.selectionStart=st,C.selectionEnd=Math.min(_t,C.value.length);else{var yt=C.ownerDocument||document,lt=yt&&yt.defaultView||window;if(lt.getSelection){var ft=lt.getSelection(),Yt=C.textContent.length,$t=Math.min(H.start,Yt),ke=H.end===void 0?$t:Math.min(H.end,Yt);!ft.extend&&$t>ke&&(y=ke,ke=$t,$t=y);var J=um(C,$t),q=um(C,ke);if(J&&q&&(ft.rangeCount!==1||ft.anchorNode!==J.node||ft.anchorOffset!==J.offset||ft.focusNode!==q.node||ft.focusOffset!==q.offset)){var it=yt.createRange();it.setStart(J.node,J.offset),ft.removeAllRanges(),$t>ke?(ft.addRange(it),ft.extend(q.node,q.offset)):(it.setEnd(q.node,q.offset),ft.addRange(it))}}}}for(yt=[],ft=C;ft=ft.parentNode;)ft.nodeType===1&&yt.push({element:ft,left:ft.scrollLeft,top:ft.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<yt.length;C++){var St=yt[C];St.element.scrollLeft=St.left,St.element.scrollTop=St.top}}Ac=!!gh,vh=gh=null}finally{Ne=f,W.p=l,B.T=s}}e.current=i,yn=2}}function Rg(){if(yn===2){yn=0;var e=Za,i=gr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=B.T,B.T=null;var l=W.p;W.p=2;var f=Ne;Ne|=4;try{eg(e,i.alternate,i)}finally{Ne=f,W.p=l,B.T=s}}yn=3}}function wg(){if(yn===4||yn===3){yn=0,K();var e=Za,i=gr,s=va,l=pg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?yn=5:(yn=0,gr=Za=null,Cg(e,e.pendingLanes));var f=e.pendingLanes;if(f===0&&(Ya=null),$r(s),i=i.stateNode,mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(pt,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=B.T,f=W.p,W.p=2,B.T=null;try{for(var p=e.onRecoverableError,y=0;y<l.length;y++){var C=l[y];p(C.value,{componentStack:C.stack})}}finally{B.T=i,W.p=f}}(va&3)!==0&&pc(),qi(e),f=e.pendingLanes,(s&261930)!==0&&(f&42)!==0?e===ih?No++:(No=0,ih=e):No=0,Oo(0)}}function Cg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,po(i)))}function pc(){return Ag(),Rg(),wg(),Dg()}function Dg(){if(yn!==5)return!1;var e=Za,i=eh;eh=0;var s=$r(va),l=B.T,f=W.p;try{W.p=32>s?32:s,B.T=null,s=nh,nh=null;var p=Za,y=va;if(yn=0,gr=Za=null,va=0,(Ne&6)!==0)throw Error(a(331));var C=Ne;if(Ne|=4,fg(p.current),lg(p,p.current,y,s),Ne=C,Oo(0,!1),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(pt,p)}catch{}return!0}finally{W.p=f,B.T=l,Cg(e,i)}}function Ug(e,i,s){i=vi(s,i),i=Pf(e.stateNode,i,2),e=Ga(e,i,2),e!==null&&(Wt(e,2),qi(e))}function ze(e,i,s){if(e.tag===3)Ug(e,e,s);else for(;i!==null;){if(i.tag===3){Ug(i,e,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Ya===null||!Ya.has(l))){e=vi(s,e),s=L0(2),l=Ga(i,s,2),l!==null&&(N0(s,l,i,e),Wt(l,2),qi(l));break}}i=i.return}}function rh(e,i,s){var l=e.pingCache;if(l===null){l=e.pingCache=new QS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(jf=!0,f.add(s),e=ny.bind(null,e,i,s),i.then(e,e))}function ny(e,i,s){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Ye===e&&(Se&s)===s&&(ln===4||ln===3&&(Se&62914560)===Se&&300>Pe()-lc?(Ne&2)===0&&vr(e,0):$f|=s,mr===Se&&(mr=0)),qi(e)}function Lg(e,i){i===0&&(i=Mt()),e=vs(e,i),e!==null&&(Wt(e,i),qi(e))}function iy(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),Lg(e,s)}function ay(e,i){var s=0;switch(e.tag){case 31:case 13:var l=e.stateNode,f=e.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),Lg(e,s)}function sy(e,i){return An(e,i)}var mc=null,xr=null,oh=!1,gc=!1,lh=!1,Ja=0;function qi(e){e!==xr&&e.next===null&&(xr===null?mc=xr=e:xr=xr.next=e),gc=!0,oh||(oh=!0,oy())}function Oo(e,i){if(!lh&&gc){lh=!0;do for(var s=!1,l=mc;l!==null;){if(e!==0){var f=l.pendingLanes;if(f===0)var p=0;else{var y=l.suspendedLanes,C=l.pingedLanes;p=(1<<31-Ht(42|e)+1)-1,p&=f&~(y&~C),p=p&201326741?p&201326741|1:p?p|2:0}p!==0&&(s=!0,Ig(l,p))}else p=Se,p=xt(l,l===Ye?p:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(p&3)===0||wt(l,p)||(s=!0,Ig(l,p));l=l.next}while(s);lh=!1}}function ry(){Ng()}function Ng(){gc=oh=!1;var e=0;Ja!==0&&vy()&&(e=Ja);for(var i=Pe(),s=null,l=mc;l!==null;){var f=l.next,p=Og(l,i);p===0?(l.next=null,s===null?mc=f:s.next=f,f===null&&(xr=s)):(s=l,(e!==0||(p&3)!==0)&&(gc=!0)),l=f}yn!==0&&yn!==5||Oo(e),Ja!==0&&(Ja=0)}function Og(e,i){for(var s=e.suspendedLanes,l=e.pingedLanes,f=e.expirationTimes,p=e.pendingLanes&-62914561;0<p;){var y=31-Ht(p),C=1<<y,H=f[y];H===-1?((C&s)===0||(C&l)!==0)&&(f[y]=It(C,i)):H<=i&&(e.expiredLanes|=C),p&=~C}if(i=Ye,s=Se,s=xt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,s===0||e===i&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&We(l),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||wt(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(l!==null&&We(l),$r(s)){case 2:case 8:s=T;break;case 32:s=Q;break;case 268435456:s=dt;break;default:s=Q}return l=Pg.bind(null,e),s=An(s,l),e.callbackPriority=i,e.callbackNode=s,i}return l!==null&&l!==null&&We(l),e.callbackPriority=2,e.callbackNode=null,2}function Pg(e,i){if(yn!==0&&yn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(pc()&&e.callbackNode!==s)return null;var l=Se;return l=xt(e,e===Ye?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(gg(e,l,i),Og(e,Pe()),e.callbackNode!=null&&e.callbackNode===s?Pg.bind(null,e):null)}function Ig(e,i){if(pc())return null;gg(e,i,!0)}function oy(){xy(function(){(Ne&6)!==0?An(z,ry):Ng()})}function ch(){if(Ja===0){var e=ar;e===0&&(e=Qt,Qt<<=1,(Qt&261888)===0&&(Qt=256)),Ja=e}return Ja}function zg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:wi(""+e)}function Bg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function ly(e,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var p=zg((f[Cn]||null).action),y=l.submitter;y&&(i=(i=y[Cn]||null)?zg(i.formAction):y.getAttribute("formAction"),i!==null&&(p=i,y=null));var C=new wl("action","action",null,l,f);e.push({event:C,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Ja!==0){var H=y?Bg(f,y):new FormData(f);Cf(s,{pending:!0,data:H,method:f.method,action:p},null,H)}}else typeof p=="function"&&(C.preventDefault(),H=y?Bg(f,y):new FormData(f),Cf(s,{pending:!0,data:H,method:f.method,action:p},p,H))},currentTarget:f}]})}}for(var uh=0;uh<Wu.length;uh++){var fh=Wu[uh],cy=fh.toLowerCase(),uy=fh[0].toUpperCase()+fh.slice(1);Ci(cy,"on"+uy)}Ci(mm,"onAnimationEnd"),Ci(gm,"onAnimationIteration"),Ci(vm,"onAnimationStart"),Ci("dblclick","onDoubleClick"),Ci("focusin","onFocus"),Ci("focusout","onBlur"),Ci(AS,"onTransitionRun"),Ci(RS,"onTransitionStart"),Ci(wS,"onTransitionCancel"),Ci(_m,"onTransitionEnd"),X("onMouseEnter",["mouseout","mouseover"]),X("onMouseLeave",["mouseout","mouseover"]),X("onPointerEnter",["pointerout","pointerover"]),X("onPointerLeave",["pointerout","pointerover"]),R("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),R("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),R("onBeforeInput",["compositionend","keypress","textInput","paste"]),R("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),R("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),fy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Po));function Fg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var l=e[s],f=l.event;l=l.listeners;t:{var p=void 0;if(i)for(var y=l.length-1;0<=y;y--){var C=l[y],H=C.instance,st=C.currentTarget;if(C=C.listener,H!==p&&f.isPropagationStopped())break t;p=C,f.currentTarget=st;try{p(f)}catch(_t){Ul(_t)}f.currentTarget=null,p=H}else for(y=0;y<l.length;y++){if(C=l[y],H=C.instance,st=C.currentTarget,C=C.listener,H!==p&&f.isPropagationStopped())break t;p=C,f.currentTarget=st;try{p(f)}catch(_t){Ul(_t)}f.currentTarget=null,p=H}}}}function _e(e,i){var s=i[fs];s===void 0&&(s=i[fs]=new Set);var l=e+"__bubble";s.has(l)||(Hg(i,e,2,!1),s.add(l))}function hh(e,i,s){var l=0;i&&(l|=4),Hg(s,e,l,i)}var vc="_reactListening"+Math.random().toString(36).slice(2);function dh(e){if(!e[vc]){e[vc]=!0,bl.forEach(function(s){s!=="selectionchange"&&(fy.has(s)||hh(s,!1,e),hh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[vc]||(i[vc]=!0,hh("selectionchange",!1,i))}}function Hg(e,i,s,l){switch(mv(i)){case 2:var f=Fy;break;case 8:f=Hy;break;default:f=wh}s=f.bind(null,i,s,e),f=void 0,!Lu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?e.addEventListener(i,s,{capture:!0,passive:f}):e.addEventListener(i,s,!0):f!==void 0?e.addEventListener(i,s,{passive:f}):e.addEventListener(i,s,!1)}function ph(e,i,s,l,f){var p=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var y=l.tag;if(y===3||y===4){var C=l.stateNode.containerInfo;if(C===f)break;if(y===4)for(y=l.return;y!==null;){var H=y.tag;if((H===3||H===4)&&y.stateNode.containerInfo===f)return;y=y.return}for(;C!==null;){if(y=ea(C),y===null)return;if(H=y.tag,H===5||H===6||H===26||H===27){l=p=y;continue t}C=C.parentNode}}l=l.return}Wp(function(){var st=p,_t=Du(s),yt=[];t:{var lt=xm.get(e);if(lt!==void 0){var ft=wl,Yt=e;switch(e){case"keypress":if(Al(s)===0)break t;case"keydown":case"keyup":ft=aS;break;case"focusin":Yt="focus",ft=Iu;break;case"focusout":Yt="blur",ft=Iu;break;case"beforeblur":case"afterblur":ft=Iu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ft=Zp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ft=qx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ft=oS;break;case mm:case gm:case vm:ft=Kx;break;case _m:ft=cS;break;case"scroll":case"scrollend":ft=Xx;break;case"wheel":ft=fS;break;case"copy":case"cut":case"paste":ft=Qx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ft=Jp;break;case"toggle":case"beforetoggle":ft=dS}var $t=(i&4)!==0,ke=!$t&&(e==="scroll"||e==="scrollend"),J=$t?lt!==null?lt+"Capture":null:lt;$t=[];for(var q=st,it;q!==null;){var St=q;if(it=St.stateNode,St=St.tag,St!==5&&St!==26&&St!==27||it===null||J===null||(St=no(q,J),St!=null&&$t.push(Io(q,St,it))),ke)break;q=q.return}0<$t.length&&(lt=new ft(lt,Yt,null,s,_t),yt.push({event:lt,listeners:$t}))}}if((i&7)===0){t:{if(lt=e==="mouseover"||e==="pointerover",ft=e==="mouseout"||e==="pointerout",lt&&s!==Cu&&(Yt=s.relatedTarget||s.fromElement)&&(ea(Yt)||Yt[Yn]))break t;if((ft||lt)&&(lt=_t.window===_t?_t:(lt=_t.ownerDocument)?lt.defaultView||lt.parentWindow:window,ft?(Yt=s.relatedTarget||s.toElement,ft=st,Yt=Yt?ea(Yt):null,Yt!==null&&(ke=c(Yt),$t=Yt.tag,Yt!==ke||$t!==5&&$t!==27&&$t!==6)&&(Yt=null)):(ft=null,Yt=st),ft!==Yt)){if($t=Zp,St="onMouseLeave",J="onMouseEnter",q="mouse",(e==="pointerout"||e==="pointerover")&&($t=Jp,St="onPointerLeave",J="onPointerEnter",q="pointer"),ke=ft==null?lt:ds(ft),it=Yt==null?lt:ds(Yt),lt=new $t(St,q+"leave",ft,s,_t),lt.target=ke,lt.relatedTarget=it,St=null,ea(_t)===st&&($t=new $t(J,q+"enter",Yt,s,_t),$t.target=it,$t.relatedTarget=ke,St=$t),ke=St,ft&&Yt)e:{for($t=hy,J=ft,q=Yt,it=0,St=J;St;St=$t(St))it++;St=0;for(var jt=q;jt;jt=$t(jt))St++;for(;0<it-St;)J=$t(J),it--;for(;0<St-it;)q=$t(q),St--;for(;it--;){if(J===q||q!==null&&J===q.alternate){$t=J;break e}J=$t(J),q=$t(q)}$t=null}else $t=null;ft!==null&&Gg(yt,lt,ft,$t,!1),Yt!==null&&ke!==null&&Gg(yt,ke,Yt,$t,!0)}}t:{if(lt=st?ds(st):window,ft=lt.nodeName&&lt.nodeName.toLowerCase(),ft==="select"||ft==="input"&&lt.type==="file")var we=am;else if(nm(lt))if(sm)we=ES;else{we=yS;var Zt=SS}else ft=lt.nodeName,!ft||ft.toLowerCase()!=="input"||lt.type!=="checkbox"&&lt.type!=="radio"?st&&pi(st.elementType)&&(we=am):we=MS;if(we&&(we=we(e,st))){im(yt,we,s,_t);break t}Zt&&Zt(e,lt,st),e==="focusout"&&st&&lt.type==="number"&&st.memoizedProps.value!=null&&Sn(lt,"number",lt.value)}switch(Zt=st?ds(st):window,e){case"focusin":(nm(Zt)||Zt.contentEditable==="true")&&(Js=Zt,Vu=st,uo=null);break;case"focusout":uo=Vu=Js=null;break;case"mousedown":ku=!0;break;case"contextmenu":case"mouseup":case"dragend":ku=!1,dm(yt,s,_t);break;case"selectionchange":if(TS)break;case"keydown":case"keyup":dm(yt,s,_t)}var ue;if(Bu)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else Ks?tm(e,s)&&(ye="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(ye="onCompositionStart");ye&&(Qp&&s.locale!=="ko"&&(Ks||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Ks&&(ue=qp()):(Oa=_t,Nu="value"in Oa?Oa.value:Oa.textContent,Ks=!0)),Zt=_c(st,ye),0<Zt.length&&(ye=new Kp(ye,e,null,s,_t),yt.push({event:ye,listeners:Zt}),ue?ye.data=ue:(ue=em(s),ue!==null&&(ye.data=ue)))),(ue=mS?gS(e,s):vS(e,s))&&(ye=_c(st,"onBeforeInput"),0<ye.length&&(Zt=new Kp("onBeforeInput","beforeinput",null,s,_t),yt.push({event:Zt,listeners:ye}),Zt.data=ue)),ly(yt,e,st,s,_t)}Fg(yt,i)})}function Io(e,i,s){return{instance:e,listener:i,currentTarget:s}}function _c(e,i){for(var s=i+"Capture",l=[];e!==null;){var f=e,p=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||p===null||(f=no(e,s),f!=null&&l.unshift(Io(e,f,p)),f=no(e,i),f!=null&&l.push(Io(e,f,p))),e.tag===3)return l;e=e.return}return[]}function hy(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Gg(e,i,s,l,f){for(var p=i._reactName,y=[];s!==null&&s!==l;){var C=s,H=C.alternate,st=C.stateNode;if(C=C.tag,H!==null&&H===l)break;C!==5&&C!==26&&C!==27||st===null||(H=st,f?(st=no(s,p),st!=null&&y.unshift(Io(s,st,H))):f||(st=no(s,p),st!=null&&y.push(Io(s,st,H)))),s=s.return}y.length!==0&&e.push({event:i,listeners:y})}var dy=/\r\n?/g,py=/\u0000|\uFFFD/g;function Vg(e){return(typeof e=="string"?e:""+e).replace(dy,`
`).replace(py,"")}function kg(e,i){return i=Vg(i),Vg(e)===i}function Ve(e,i,s,l,f,p){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Gn(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Gn(e,""+l);break;case"className":Ut(e,"class",l);break;case"tabIndex":Ut(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Ut(e,s,l);break;case"style":tn(e,l,p);break;case"data":if(i!=="object"){Ut(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=wi(""+l),e.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof p=="function"&&(s==="formAction"?(i!=="input"&&Ve(e,i,"name",f.name,f,null),Ve(e,i,"formEncType",f.formEncType,f,null),Ve(e,i,"formMethod",f.formMethod,f,null),Ve(e,i,"formTarget",f.formTarget,f,null)):(Ve(e,i,"encType",f.encType,f,null),Ve(e,i,"method",f.method,f,null),Ve(e,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=wi(""+l),e.setAttribute(s,l);break;case"onClick":l!=null&&(e.onclick=mi);break;case"onScroll":l!=null&&_e("scroll",e);break;case"onScrollEnd":l!=null&&_e("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}s=wi(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""+l):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":l===!0?e.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,l):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(s,l):e.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(s):e.setAttribute(s,l);break;case"popover":_e("beforetoggle",e),_e("toggle",e),Gt(e,"popover",l);break;case"xlinkActuate":zt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":zt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":zt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":zt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":zt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":zt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":zt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":zt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":zt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Gt(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=He.get(s)||s,Gt(e,s,l))}}function mh(e,i,s,l,f,p){switch(s){case"style":tn(e,l,p);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof l=="string"?Gn(e,l):(typeof l=="number"||typeof l=="bigint")&&Gn(e,""+l);break;case"onScroll":l!=null&&_e("scroll",e);break;case"onScrollEnd":l!=null&&_e("scrollend",e);break;case"onClick":l!=null&&(e.onclick=mi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!eo.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),p=e[Cn]||null,p=p!=null?p[s]:null,typeof p=="function"&&e.removeEventListener(i,p,f),typeof l=="function")){typeof p!="function"&&p!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,l,f);break t}s in e?e[s]=l:l===!0?e.setAttribute(s,""):Gt(e,s,l)}}}function Nn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",e),_e("load",e);var l=!1,f=!1,p;for(p in s)if(s.hasOwnProperty(p)){var y=s[p];if(y!=null)switch(p){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ve(e,i,p,y,s,null)}}f&&Ve(e,i,"srcSet",s.srcSet,s,null),l&&Ve(e,i,"src",s.src,s,null);return;case"input":_e("invalid",e);var C=p=y=f=null,H=null,st=null;for(l in s)if(s.hasOwnProperty(l)){var _t=s[l];if(_t!=null)switch(l){case"name":f=_t;break;case"type":y=_t;break;case"checked":H=_t;break;case"defaultChecked":st=_t;break;case"value":p=_t;break;case"defaultValue":C=_t;break;case"children":case"dangerouslySetInnerHTML":if(_t!=null)throw Error(a(137,i));break;default:Ve(e,i,l,_t,s,null)}}Vt(e,p,C,H,st,y,f,!1);return;case"select":_e("invalid",e),l=y=p=null;for(f in s)if(s.hasOwnProperty(f)&&(C=s[f],C!=null))switch(f){case"value":p=C;break;case"defaultValue":y=C;break;case"multiple":l=C;default:Ve(e,i,f,C,s,null)}i=p,s=y,e.multiple=!!l,i!=null?he(e,!!l,i,!1):s!=null&&he(e,!!l,s,!0);return;case"textarea":_e("invalid",e),p=f=l=null;for(y in s)if(s.hasOwnProperty(y)&&(C=s[y],C!=null))switch(y){case"value":l=C;break;case"defaultValue":f=C;break;case"children":p=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(a(91));break;default:Ve(e,i,y,C,s,null)}ii(e,l,f,p);return;case"option":for(H in s)if(s.hasOwnProperty(H)&&(l=s[H],l!=null))switch(H){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Ve(e,i,H,l,s,null)}return;case"dialog":_e("beforetoggle",e),_e("toggle",e),_e("cancel",e),_e("close",e);break;case"iframe":case"object":_e("load",e);break;case"video":case"audio":for(l=0;l<Po.length;l++)_e(Po[l],e);break;case"image":_e("error",e),_e("load",e);break;case"details":_e("toggle",e);break;case"embed":case"source":case"link":_e("error",e),_e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(st in s)if(s.hasOwnProperty(st)&&(l=s[st],l!=null))switch(st){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ve(e,i,st,l,s,null)}return;default:if(pi(i)){for(_t in s)s.hasOwnProperty(_t)&&(l=s[_t],l!==void 0&&mh(e,i,_t,l,s,void 0));return}}for(C in s)s.hasOwnProperty(C)&&(l=s[C],l!=null&&Ve(e,i,C,l,s,null))}function my(e,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,p=null,y=null,C=null,H=null,st=null,_t=null;for(ft in s){var yt=s[ft];if(s.hasOwnProperty(ft)&&yt!=null)switch(ft){case"checked":break;case"value":break;case"defaultValue":H=yt;default:l.hasOwnProperty(ft)||Ve(e,i,ft,null,l,yt)}}for(var lt in l){var ft=l[lt];if(yt=s[lt],l.hasOwnProperty(lt)&&(ft!=null||yt!=null))switch(lt){case"type":p=ft;break;case"name":f=ft;break;case"checked":st=ft;break;case"defaultChecked":_t=ft;break;case"value":y=ft;break;case"defaultValue":C=ft;break;case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(a(137,i));break;default:ft!==yt&&Ve(e,i,lt,ft,l,yt)}}dn(e,y,C,H,st,_t,p,f);return;case"select":ft=y=C=lt=null;for(p in s)if(H=s[p],s.hasOwnProperty(p)&&H!=null)switch(p){case"value":break;case"multiple":ft=H;default:l.hasOwnProperty(p)||Ve(e,i,p,null,l,H)}for(f in l)if(p=l[f],H=s[f],l.hasOwnProperty(f)&&(p!=null||H!=null))switch(f){case"value":lt=p;break;case"defaultValue":C=p;break;case"multiple":y=p;default:p!==H&&Ve(e,i,f,p,l,H)}i=C,s=y,l=ft,lt!=null?he(e,!!s,lt,!1):!!l!=!!s&&(i!=null?he(e,!!s,i,!0):he(e,!!s,s?[]:"",!1));return;case"textarea":ft=lt=null;for(C in s)if(f=s[C],s.hasOwnProperty(C)&&f!=null&&!l.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:Ve(e,i,C,null,l,f)}for(y in l)if(f=l[y],p=s[y],l.hasOwnProperty(y)&&(f!=null||p!=null))switch(y){case"value":lt=f;break;case"defaultValue":ft=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==p&&Ve(e,i,y,f,l,p)}Hn(e,lt,ft);return;case"option":for(var Yt in s)if(lt=s[Yt],s.hasOwnProperty(Yt)&&lt!=null&&!l.hasOwnProperty(Yt))switch(Yt){case"selected":e.selected=!1;break;default:Ve(e,i,Yt,null,l,lt)}for(H in l)if(lt=l[H],ft=s[H],l.hasOwnProperty(H)&&lt!==ft&&(lt!=null||ft!=null))switch(H){case"selected":e.selected=lt&&typeof lt!="function"&&typeof lt!="symbol";break;default:Ve(e,i,H,lt,l,ft)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var $t in s)lt=s[$t],s.hasOwnProperty($t)&&lt!=null&&!l.hasOwnProperty($t)&&Ve(e,i,$t,null,l,lt);for(st in l)if(lt=l[st],ft=s[st],l.hasOwnProperty(st)&&lt!==ft&&(lt!=null||ft!=null))switch(st){case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(a(137,i));break;default:Ve(e,i,st,lt,l,ft)}return;default:if(pi(i)){for(var ke in s)lt=s[ke],s.hasOwnProperty(ke)&&lt!==void 0&&!l.hasOwnProperty(ke)&&mh(e,i,ke,void 0,l,lt);for(_t in l)lt=l[_t],ft=s[_t],!l.hasOwnProperty(_t)||lt===ft||lt===void 0&&ft===void 0||mh(e,i,_t,lt,l,ft);return}}for(var J in s)lt=s[J],s.hasOwnProperty(J)&&lt!=null&&!l.hasOwnProperty(J)&&Ve(e,i,J,null,l,lt);for(yt in l)lt=l[yt],ft=s[yt],!l.hasOwnProperty(yt)||lt===ft||lt==null&&ft==null||Ve(e,i,yt,lt,l,ft)}function Xg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function gy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],p=f.transferSize,y=f.initiatorType,C=f.duration;if(p&&C&&Xg(y)){for(y=0,C=f.responseEnd,l+=1;l<s.length;l++){var H=s[l],st=H.startTime;if(st>C)break;var _t=H.transferSize,yt=H.initiatorType;_t&&Xg(yt)&&(H=H.responseEnd,y+=_t*(H<C?1:(C-st)/(H-st)))}if(--l,i+=8*(p+y)/(f.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var gh=null,vh=null;function xc(e){return e.nodeType===9?e:e.ownerDocument}function Wg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function qg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function _h(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var xh=null;function vy(){var e=window.event;return e&&e.type==="popstate"?e===xh?!1:(xh=e,!0):(xh=null,!1)}var Yg=typeof setTimeout=="function"?setTimeout:void 0,_y=typeof clearTimeout=="function"?clearTimeout:void 0,Zg=typeof Promise=="function"?Promise:void 0,xy=typeof queueMicrotask=="function"?queueMicrotask:typeof Zg<"u"?function(e){return Zg.resolve(null).then(e).catch(Sy)}:Yg;function Sy(e){setTimeout(function(){throw e})}function Qa(e){return e==="head"}function Kg(e,i){var s=i,l=0;do{var f=s.nextSibling;if(e.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){e.removeChild(f),Er(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")zo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,zo(s);for(var p=s.firstChild;p;){var y=p.nextSibling,C=p.nodeName;p[Da]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&p.rel.toLowerCase()==="stylesheet"||s.removeChild(p),p=y}}else s==="body"&&zo(e.ownerDocument.body);s=f}while(s);Er(i)}function Jg(e,i){var s=e;e=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=l}while(s)}function Sh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Sh(s),Ua(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function yy(e,i,s,l){for(;e.nodeType===1;){var f=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Da])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(p=e.getAttribute("rel"),p==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(p!==f.rel||e.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||e.getAttribute("title")!==(f.title==null?null:f.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(p=e.getAttribute("src"),(p!==(f.src==null?null:f.src)||e.getAttribute("type")!==(f.type==null?null:f.type)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&p&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var p=f.name==null?null:""+f.name;if(f.type==="hidden"&&e.getAttribute("name")===p)return e}else return e;if(e=Mi(e.nextSibling),e===null)break}return null}function My(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Mi(e.nextSibling),e===null))return null;return e}function Qg(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Mi(e.nextSibling),e===null))return null;return e}function yh(e){return e.data==="$?"||e.data==="$~"}function Mh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Ey(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Mi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Eh=null;function jg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return Mi(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function $g(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function tv(e,i,s){switch(i=xc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function zo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);Ua(e)}var Ei=new Map,ev=new Set;function Sc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _a=W.d;W.d={f:by,r:Ty,D:Ay,C:Ry,L:wy,m:Cy,X:Uy,S:Dy,M:Ly};function by(){var e=_a.f(),i=fc();return e||i}function Ty(e){var i=na(e);i!==null&&i.tag===5&&i.type==="form"?_0(i):_a.r(e)}var Sr=typeof document>"u"?null:document;function nv(e,i,s){var l=Sr;if(l&&typeof i=="string"&&i){var f=fe(i);f='link[rel="'+e+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),ev.has(f)||(ev.add(f),e={rel:e,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),Nn(i,"link",e),hn(i),l.head.appendChild(i)))}}function Ay(e){_a.D(e),nv("dns-prefetch",e,null)}function Ry(e,i){_a.C(e,i),nv("preconnect",e,i)}function wy(e,i,s){_a.L(e,i,s);var l=Sr;if(l&&e&&i){var f='link[rel="preload"][as="'+fe(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+fe(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+fe(s.imageSizes)+'"]')):f+='[href="'+fe(e)+'"]';var p=f;switch(i){case"style":p=yr(e);break;case"script":p=Mr(e)}Ei.has(p)||(e=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Ei.set(p,e),l.querySelector(f)!==null||i==="style"&&l.querySelector(Bo(p))||i==="script"&&l.querySelector(Fo(p))||(i=l.createElement("link"),Nn(i,"link",e),hn(i),l.head.appendChild(i)))}}function Cy(e,i){_a.m(e,i);var s=Sr;if(s&&e){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+fe(l)+'"][href="'+fe(e)+'"]',p=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":p=Mr(e)}if(!Ei.has(p)&&(e=_({rel:"modulepreload",href:e},i),Ei.set(p,e),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Fo(p)))return}l=s.createElement("link"),Nn(l,"link",e),hn(l),s.head.appendChild(l)}}}function Dy(e,i,s){_a.S(e,i,s);var l=Sr;if(l&&e){var f=La(l).hoistableStyles,p=yr(e);i=i||"default";var y=f.get(p);if(!y){var C={loading:0,preload:null};if(y=l.querySelector(Bo(p)))C.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Ei.get(p))&&bh(e,s);var H=y=l.createElement("link");hn(H),Nn(H,"link",e),H._p=new Promise(function(st,_t){H.onload=st,H.onerror=_t}),H.addEventListener("load",function(){C.loading|=1}),H.addEventListener("error",function(){C.loading|=2}),C.loading|=4,yc(y,i,l)}y={type:"stylesheet",instance:y,count:1,state:C},f.set(p,y)}}}function Uy(e,i){_a.X(e,i);var s=Sr;if(s&&e){var l=La(s).hoistableScripts,f=Mr(e),p=l.get(f);p||(p=s.querySelector(Fo(f)),p||(e=_({src:e,async:!0},i),(i=Ei.get(f))&&Th(e,i),p=s.createElement("script"),hn(p),Nn(p,"link",e),s.head.appendChild(p)),p={type:"script",instance:p,count:1,state:null},l.set(f,p))}}function Ly(e,i){_a.M(e,i);var s=Sr;if(s&&e){var l=La(s).hoistableScripts,f=Mr(e),p=l.get(f);p||(p=s.querySelector(Fo(f)),p||(e=_({src:e,async:!0,type:"module"},i),(i=Ei.get(f))&&Th(e,i),p=s.createElement("script"),hn(p),Nn(p,"link",e),s.head.appendChild(p)),p={type:"script",instance:p,count:1,state:null},l.set(f,p))}}function iv(e,i,s,l){var f=(f=kt.current)?Sc(f):null;if(!f)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=yr(s.href),s=La(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=yr(s.href);var p=La(f).hoistableStyles,y=p.get(e);if(y||(f=f.ownerDocument||f,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},p.set(e,y),(p=f.querySelector(Bo(e)))&&!p._p&&(y.instance=p,y.state.loading=5),Ei.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ei.set(e,s),p||Ny(f,e,s,y.state))),i&&l===null)throw Error(a(528,""));return y}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Mr(s),s=La(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function yr(e){return'href="'+fe(e)+'"'}function Bo(e){return'link[rel="stylesheet"]['+e+"]"}function av(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function Ny(e,i,s,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Nn(i,"link",s),hn(i),e.head.appendChild(i))}function Mr(e){return'[src="'+fe(e)+'"]'}function Fo(e){return"script[async]"+e}function sv(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+fe(s.href)+'"]');if(l)return i.instance=l,hn(l),l;var f=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),hn(l),Nn(l,"style",f),yc(l,s.precedence,e),i.instance=l;case"stylesheet":f=yr(s.href);var p=e.querySelector(Bo(f));if(p)return i.state.loading|=4,i.instance=p,hn(p),p;l=av(s),(f=Ei.get(f))&&bh(l,f),p=(e.ownerDocument||e).createElement("link"),hn(p);var y=p;return y._p=new Promise(function(C,H){y.onload=C,y.onerror=H}),Nn(p,"link",l),i.state.loading|=4,yc(p,s.precedence,e),i.instance=p;case"script":return p=Mr(s.src),(f=e.querySelector(Fo(p)))?(i.instance=f,hn(f),f):(l=s,(f=Ei.get(p))&&(l=_({},s),Th(l,f)),e=e.ownerDocument||e,f=e.createElement("script"),hn(f),Nn(f,"link",l),e.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,yc(l,s.precedence,e));return i.instance}function yc(e,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,p=f,y=0;y<l.length;y++){var C=l[y];if(C.dataset.precedence===i)p=C;else if(p!==f)break}p?p.parentNode.insertBefore(e,p.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function bh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Th(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Mc=null;function rv(e,i,s){if(Mc===null){var l=new Map,f=Mc=new Map;f.set(s,l)}else f=Mc,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(e))return l;for(l.set(e,null),s=s.getElementsByTagName(e),f=0;f<s.length;f++){var p=s[f];if(!(p[Da]||p[fn]||e==="link"&&p.getAttribute("rel")==="stylesheet")&&p.namespaceURI!=="http://www.w3.org/2000/svg"){var y=p.getAttribute(i)||"";y=e+y;var C=l.get(y);C?C.push(p):l.set(y,[p])}}return l}function ov(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function Oy(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function lv(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Py(e,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=yr(l.href),p=i.querySelector(Bo(f));if(p){i=p._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=Ec.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=p,hn(p);return}p=i.ownerDocument||i,l=av(l),(f=Ei.get(f))&&bh(l,f),p=p.createElement("link"),hn(p);var y=p;y._p=new Promise(function(C,H){y.onload=C,y.onerror=H}),Nn(p,"link",l),s.instance=p}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=Ec.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Ah=0;function Iy(e,i){return e.stylesheets&&e.count===0&&Tc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var l=setTimeout(function(){if(e.stylesheets&&Tc(e,e.stylesheets),e.unsuspend){var p=e.unsuspend;e.unsuspend=null,p()}},6e4+i);0<e.imgBytes&&Ah===0&&(Ah=62500*gy());var f=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Tc(e,e.stylesheets),e.unsuspend)){var p=e.unsuspend;e.unsuspend=null,p()}},(e.imgBytes>Ah?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function Ec(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Tc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var bc=null;function Tc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bc=new Map,i.forEach(zy,e),bc=null,Ec.call(e))}function zy(e,i){if(!(i.state.loading&4)){var s=bc.get(e);if(s)var l=s.get(null);else{s=new Map,bc.set(e,s);for(var f=e.querySelectorAll("link[data-precedence],style[data-precedence]"),p=0;p<f.length;p++){var y=f[p];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(s.set(y.dataset.precedence,y),l=y)}l&&s.set(null,l)}f=i.instance,y=f.getAttribute("data-precedence"),p=s.get(y)||l,p===l&&s.set(null,f),s.set(y,f),this.count++,l=Ec.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),p?p.parentNode.insertBefore(f,p.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(f,e.firstChild)),i.state.loading|=4}}var Ho={$$typeof:N,Provider:null,Consumer:null,_currentValue:ct,_currentValue2:ct,_threadCount:0};function By(e,i,s,l,f,p,y,C,H){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Kt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Kt(0),this.hiddenUpdates=Kt(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=p,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.incompleteTransitions=new Map}function cv(e,i,s,l,f,p,y,C,H,st,_t,yt){return e=new By(e,i,s,y,H,st,_t,yt,C),i=1,p===!0&&(i|=24),p=si(3,null,null,i),e.current=p,p.stateNode=e,i=sf(),i.refCount++,e.pooledCache=i,i.refCount++,p.memoizedState={element:l,isDehydrated:s,cache:i},cf(p),e}function uv(e){return e?(e=$s,e):$s}function fv(e,i,s,l,f,p){f=uv(f),l.context===null?l.context=f:l.pendingContext=f,l=Ha(i),l.payload={element:s},p=p===void 0?null:p,p!==null&&(l.callback=p),s=Ga(e,l,i),s!==null&&($n(s,e,i),_o(s,e,i))}function hv(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function Rh(e,i){hv(e,i),(e=e.alternate)&&hv(e,i)}function dv(e){if(e.tag===13||e.tag===31){var i=vs(e,67108864);i!==null&&$n(i,e,67108864),Rh(e,67108864)}}function pv(e){if(e.tag===13||e.tag===31){var i=ui();i=jr(i);var s=vs(e,i);s!==null&&$n(s,e,i),Rh(e,i)}}var Ac=!0;function Fy(e,i,s,l){var f=B.T;B.T=null;var p=W.p;try{W.p=2,wh(e,i,s,l)}finally{W.p=p,B.T=f}}function Hy(e,i,s,l){var f=B.T;B.T=null;var p=W.p;try{W.p=8,wh(e,i,s,l)}finally{W.p=p,B.T=f}}function wh(e,i,s,l){if(Ac){var f=Ch(l);if(f===null)ph(e,i,l,Rc,s),gv(e,l);else if(Vy(f,e,i,s,l))l.stopPropagation();else if(gv(e,l),i&4&&-1<Gy.indexOf(e)){for(;f!==null;){var p=na(f);if(p!==null)switch(p.tag){case 3:if(p=p.stateNode,p.current.memoizedState.isDehydrated){var y=Rt(p.pendingLanes);if(y!==0){var C=p;for(C.pendingLanes|=2,C.entangledLanes|=2;y;){var H=1<<31-Ht(y);C.entanglements[1]|=H,y&=~H}qi(p),(Ne&6)===0&&(cc=Pe()+500,Oo(0))}}break;case 31:case 13:C=vs(p,2),C!==null&&$n(C,p,2),fc(),Rh(p,2)}if(p=Ch(l),p===null&&ph(e,i,l,Rc,s),p===f)break;f=p}f!==null&&l.stopPropagation()}else ph(e,i,l,null,s)}}function Ch(e){return e=Du(e),Dh(e)}var Rc=null;function Dh(e){if(Rc=null,e=ea(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=u(i),e!==null)return e;e=null}else if(s===31){if(e=h(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Rc=e,null}function mv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ue()){case z:return 2;case T:return 8;case Q:case ot:return 32;case dt:return 268435456;default:return 32}default:return 32}}var Uh=!1,ja=null,$a=null,ts=null,Go=new Map,Vo=new Map,es=[],Gy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function gv(e,i){switch(e){case"focusin":case"focusout":ja=null;break;case"dragenter":case"dragleave":$a=null;break;case"mouseover":case"mouseout":ts=null;break;case"pointerover":case"pointerout":Go.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Vo.delete(i.pointerId)}}function ko(e,i,s,l,f,p){return e===null||e.nativeEvent!==p?(e={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:p,targetContainers:[f]},i!==null&&(i=na(i),i!==null&&dv(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),e)}function Vy(e,i,s,l,f){switch(i){case"focusin":return ja=ko(ja,e,i,s,l,f),!0;case"dragenter":return $a=ko($a,e,i,s,l,f),!0;case"mouseover":return ts=ko(ts,e,i,s,l,f),!0;case"pointerover":var p=f.pointerId;return Go.set(p,ko(Go.get(p)||null,e,i,s,l,f)),!0;case"gotpointercapture":return p=f.pointerId,Vo.set(p,ko(Vo.get(p)||null,e,i,s,l,f)),!0}return!1}function vv(e){var i=ea(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){e.blockedOn=i,qs(e.priority,function(){pv(s)});return}}else if(i===31){if(i=h(s),i!==null){e.blockedOn=i,qs(e.priority,function(){pv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function wc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Ch(e.nativeEvent);if(s===null){s=e.nativeEvent;var l=new s.constructor(s.type,s);Cu=l,s.target.dispatchEvent(l),Cu=null}else return i=na(s),i!==null&&dv(i),e.blockedOn=s,!1;i.shift()}return!0}function _v(e,i,s){wc(e)&&s.delete(i)}function ky(){Uh=!1,ja!==null&&wc(ja)&&(ja=null),$a!==null&&wc($a)&&($a=null),ts!==null&&wc(ts)&&(ts=null),Go.forEach(_v),Vo.forEach(_v)}function Cc(e,i){e.blockedOn===i&&(e.blockedOn=null,Uh||(Uh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,ky)))}var Dc=null;function xv(e){Dc!==e&&(Dc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Dc===e&&(Dc=null);for(var i=0;i<e.length;i+=3){var s=e[i],l=e[i+1],f=e[i+2];if(typeof l!="function"){if(Dh(l||s)===null)continue;break}var p=na(s);p!==null&&(e.splice(i,3),i-=3,Cf(p,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function Er(e){function i(H){return Cc(H,e)}ja!==null&&Cc(ja,e),$a!==null&&Cc($a,e),ts!==null&&Cc(ts,e),Go.forEach(i),Vo.forEach(i);for(var s=0;s<es.length;s++){var l=es[s];l.blockedOn===e&&(l.blockedOn=null)}for(;0<es.length&&(s=es[0],s.blockedOn===null);)vv(s),s.blockedOn===null&&es.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],p=s[l+1],y=f[Cn]||null;if(typeof p=="function")y||xv(s);else if(y){var C=null;if(p&&p.hasAttribute("formAction")){if(f=p,y=p[Cn]||null)C=y.formAction;else if(Dh(f)!==null)continue}else C=y.action;typeof C=="function"?s[l+1]=C:(s.splice(l,3),l-=3),xv(s)}}}function Sv(){function e(p){p.canIntercept&&p.info==="react-transition"&&p.intercept({handler:function(){return new Promise(function(y){return f=y})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var p=navigation.currentEntry;p&&p.url!=null&&navigation.navigate(p.url,{state:p.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function Lh(e){this._internalRoot=e}Uc.prototype.render=Lh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=ui();fv(s,l,e,i,null,null)},Uc.prototype.unmount=Lh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;fv(e.current,2,null,e,null,null),fc(),i[Yn]=null}};function Uc(e){this._internalRoot=e}Uc.prototype.unstable_scheduleHydration=function(e){if(e){var i=to();e={blockedOn:null,target:e,priority:i};for(var s=0;s<es.length&&i!==0&&i<es[s].priority;s++);es.splice(s,0,e),s===0&&vv(e)}};var yv=t.version;if(yv!=="19.2.7")throw Error(a(527,yv,"19.2.7"));W.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=d(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var Xy={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Lc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Lc.isDisabled&&Lc.supportsFiber)try{pt=Lc.inject(Xy),mt=Lc}catch{}}return Wo.createRoot=function(e,i){if(!o(e))throw Error(a(299));var s=!1,l="",f=w0,p=C0,y=D0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(p=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=cv(e,1,!1,null,null,s,l,null,f,p,y,Sv),e[Yn]=i.current,dh(e),new Lh(i)},Wo.hydrateRoot=function(e,i,s){if(!o(e))throw Error(a(299));var l=!1,f="",p=w0,y=C0,C=D0,H=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(p=s.onUncaughtError),s.onCaughtError!==void 0&&(y=s.onCaughtError),s.onRecoverableError!==void 0&&(C=s.onRecoverableError),s.formState!==void 0&&(H=s.formState)),i=cv(e,1,!0,i,s??null,l,f,H,p,y,C,Sv),i.context=uv(null),s=i.current,l=ui(),l=jr(l),f=Ha(l),f.callback=null,Ga(s,f,l),s=l,i.current.lanes=s,Wt(i,s),qi(i),e[Yn]=i.current,dh(e),new Uc(i)},Wo.version="19.2.7",Wo}var Uv;function tM(){if(Uv)return Ph.exports;Uv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ph.exports=$y(),Ph.exports}var eM=tM();function nM(r,t,n,a){xn.useEffect(()=>{const o=t.current,c=n.current;if(!a||!o||!c)return;const u=o.closest("[data-scene-surface]")??o;let h=null;const m=_=>{if(!h||_.pointerId!==h.id)return;const v=Math.max(1,Math.min(u.clientWidth,u.clientHeight));r.drag(c,(_.clientX-h.x)/v,(_.clientY-h.y)/v)},d=_=>{!h||_&&_.pointerId!==h.id||(h=null,delete o.dataset.look,r.releaseDrag(c),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d))},g=_=>{if(h||!_.isPrimary||_.button!==0)return;const v=_.target instanceof Element?_.target:null;!v||!(o.contains(v)||v.hasAttribute("data-scene-drag"))||(_.pointerType==="mouse"&&_.preventDefault(),h={id:_.pointerId,x:_.clientX,y:_.clientY},o.dataset.look="drag",window.addEventListener("pointermove",m),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))};return u.addEventListener("pointerdown",g),()=>{u.removeEventListener("pointerdown",g),d()}},[a,r,t,n])}function iM(r){const[t,n]=xn.useState(!1);return xn.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>n(r&&!document.hidden&&!a.matches&&!document.documentElement.classList.contains("reduce-motion")),c=new MutationObserver(o);return c.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),a.addEventListener("change",o),document.addEventListener("visibilitychange",o),o(),()=>{c.disconnect(),a.removeEventListener("change",o),document.removeEventListener("visibilitychange",o)}},[r]),t}class aM{constructor(t){this.options=t,this.holders=[],this.engine=null,this.canvas=null,this.status="loading",this.unsupported=!1,this.disposeTimer=0,this.observer=null,this.observed=null}acquire(t){return window.clearTimeout(this.disposeTimer),this.holders.push(t),this.ensureEngine(),this.attachTop(),t.onStatus(this.status),()=>this.release(t)}setRunning(t,n){t.running=n,this.top===t&&this.applyRunning()}get top(){return this.holders[this.holders.length-1]}configure(t){}drag(t,n,a){var o,c;this.top===t&&((c=(o=this.engine)==null?void 0:o.drag)==null||c.call(o,n,a))}releaseDrag(t){var n,a;this.top===t&&((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n))}release(t){var n,a;if(this.holders=this.holders.filter(o=>o!==t),this.holders.length){this.attachTop();return}(n=this.engine)==null||n.stop(),this.observe(null),(a=this.canvas)==null||a.remove(),this.disposeTimer=window.setTimeout(()=>this.teardown(),5e3)}setStatus(t){this.status=t;for(const n of this.holders)n.onStatus(t)}ensureEngine(){if(this.engine||this.unsupported)return;if(!this.options.isSupported()){this.unsupported=!0,this.setStatus("failed");return}const t=document.createElement("canvas");t.className=this.options.canvasClass,t.setAttribute("aria-hidden","true"),this.canvas=t;try{this.engine=this.options.create(t,()=>this.fail())}catch{this.fail();return}const n=this.engine;this.setStatus("loading"),this.configure(n),this.resize(),n.init().then(()=>{this.engine===n&&(n.renderFrame(0),this.setStatus("ready"),this.applyRunning())}).catch(()=>this.fail())}attachTop(){var n,a;const t=this.top;!t||!this.canvas||((a=(n=this.engine)==null?void 0:n.releaseDrag)==null||a.call(n),this.canvas.parentElement!==t.mount&&t.mount.appendChild(this.canvas),this.observe(t.mount),this.resize(),this.applyRunning())}observe(t){var n;this.observed!==t&&((n=this.observer)==null||n.disconnect(),this.observed=t,t&&(this.observer??(this.observer=new ResizeObserver(()=>this.resize())),this.observer.observe(t)))}resize(){var o,c;const t=(o=this.top)==null?void 0:o.mount;if(!t||!this.engine)return;const n=t.clientWidth||window.innerWidth,a=t.clientHeight||window.innerHeight;this.engine.setSize(n,a,window.devicePixelRatio||1),this.status==="ready"&&!((c=this.top)!=null&&c.running)&&this.engine.renderFrame(0)}applyRunning(){var t;!this.engine||this.status!=="ready"||((t=this.top)!=null&&t.running?this.engine.start():this.engine.stop())}fail(){this.teardown(),this.setStatus("failed")}teardown(){var t,n;window.clearTimeout(this.disposeTimer),this.observe(null),(t=this.engine)==null||t.dispose(),this.engine=null,(n=this.canvas)==null||n.remove(),this.canvas=null,this.status!=="failed"&&(this.status="loading")}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hp="186",sM=0,Lv=1,rM=2,lu=1,K_=2,el=3,Bs=0,Wn=1,Ai=2,Ra=0,al=1,mu=2,Nv=3,Ov=4,oM=5,Hr=100,lM=101,cM=102,uM=103,fM=104,hM=200,dM=201,pM=202,mM=203,J_=204,Q_=205,gM=206,vM=207,_M=208,xM=209,SM=210,yM=211,MM=212,EM=213,bM=214,xd=0,Sd=1,yd=2,ul=3,Md=4,Ed=5,bd=6,Td=7,j_=0,TM=1,AM=2,ji=0,$_=1,tx=2,ex=3,dp=4,nx=5,ix=6,ax=7,sx=300,Fs=301,qr=302,Fh=303,Hh=304,Tu=306,gu=1e3,Aa=1001,Ad=1002,On=1003,RM=1004,Nc=1005,Fn=1006,Gh=1007,Ps=1008,di=1009,rx=1010,ox=1011,fl=1012,pp=1013,$i=1014,Ii=1015,Hi=1016,mp=1017,gp=1018,hl=1020,lx=35902,cx=35899,ux=1021,fx=1022,zi=1023,Ca=1026,Is=1027,vp=1028,_p=1029,Hs=1030,xp=1031,Sp=1033,cu=33776,uu=33777,fu=33778,hu=33779,Rd=35840,wd=35841,Cd=35842,Dd=35843,Ud=36196,Ld=37492,Nd=37496,Od=37488,Pd=37489,vu=37490,Id=37491,zd=37808,Bd=37809,Fd=37810,Hd=37811,Gd=37812,Vd=37813,kd=37814,Xd=37815,Wd=37816,qd=37817,Yd=37818,Zd=37819,Kd=37820,Jd=37821,Qd=36492,jd=36494,$d=36495,tp=36283,ep=36284,_u=36285,np=36286,wM=3200,ip=0,CM=1,Ta="",ti="srgb",xu="srgb-linear",Su="linear",Be="srgb",Vh=7680,DM=519,UM=512,LM=513,NM=514,yp=515,OM=516,PM=517,Mp=518,IM=519,zM=35044,Pv="300 es",Qi=2e3,dl=2001;function BM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function yu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function FM(){const r=yu("canvas");return r.style.display="block",r}const Iv={};function zv(...r){const t="THREE."+r.shift();console.log(t,...r)}function hx(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ne(...r){r=hx(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...r)}}function Ae(...r){r=hx(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...r)}}function Xr(...r){const t=r.join(" ");t in Iv||(Iv[t]=!0,ne(...r))}function HM(r,t,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const GM={[xd]:Sd,[yd]:bd,[Md]:Td,[ul]:Ed,[Sd]:xd,[bd]:yd,[Td]:Md,[Ed]:ul};class Vs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const o=a[t];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,t);t.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bv=1234567;const sl=Math.PI/180,pl=180/Math.PI;function ks(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]+"-"+zn[t&255]+zn[t>>8&255]+"-"+zn[t>>16&15|64]+zn[t>>24&255]+"-"+zn[n&63|128]+zn[n>>8&255]+"-"+zn[n>>16&255]+zn[n>>24&255]+zn[a&255]+zn[a>>8&255]+zn[a>>16&255]+zn[a>>24&255]).toLowerCase()}function me(r,t,n){return Math.max(t,Math.min(n,r))}function Ep(r,t){return(r%t+t)%t}function VM(r,t,n,a,o){return a+(r-t)*(o-a)/(n-t)}function kM(r,t,n){return r!==t?(n-r)/(t-r):0}function rl(r,t,n){return(1-n)*r+n*t}function XM(r,t,n,a){return rl(r,t,1-Math.exp(-n*a))}function WM(r,t=1){return t-Math.abs(Ep(r,t*2)-t)}function qM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function YM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function ZM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function KM(r,t){return r+Math.random()*(t-r)}function JM(r){return r*(.5-Math.random())}function QM(r){r!==void 0&&(Bv=r);let t=Bv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function jM(r){return r*sl}function $M(r){return r*pl}function tE(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function eE(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function nE(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function iE(r,t,n,a,o){const c=Math.cos,u=Math.sin,h=c(n/2),m=u(n/2),d=c((t+a)/2),g=u((t+a)/2),_=c((t-a)/2),v=u((t-a)/2),x=c((a-t)/2),E=u((a-t)/2);switch(o){case"XYX":r.set(h*g,m*_,m*v,h*d);break;case"YZY":r.set(m*v,h*g,m*_,h*d);break;case"ZXZ":r.set(m*_,m*v,h*g,h*d);break;case"XZX":r.set(h*g,m*E,m*x,h*d);break;case"YXY":r.set(m*x,h*g,m*E,h*d);break;case"ZYZ":r.set(m*E,m*x,h*g,h*d);break;default:ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Gr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function kn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const dx={DEG2RAD:sl,RAD2DEG:pl,generateUUID:ks,clamp:me,euclideanModulo:Ep,mapLinear:VM,inverseLerp:kM,lerp:rl,damp:XM,pingpong:WM,smoothstep:qM,smootherstep:YM,randInt:ZM,randFloat:KM,randFloatSpread:JM,seededRandom:QM,degToRad:jM,radToDeg:$M,isPowerOfTwo:tE,ceilPowerOfTwo:eE,floorPowerOfTwo:nE,setQuaternionFromProperEuler:iE,normalize:kn,denormalize:Gr},Fp=class Fp{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=me(this.x,t.x,n.x),this.y=me(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=me(this.x,t,n),this.y=me(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-t.x,u=this.y-t.y;return this.x=c*a-u*o+t.x,this.y=c*o+u*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Fp.prototype.isVector2=!0;let Xt=Fp;class Xs{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,c,u,h){let m=a[o+0],d=a[o+1],g=a[o+2],_=a[o+3],v=c[u+0],x=c[u+1],E=c[u+2],w=c[u+3];if(_!==w||m!==v||d!==x||g!==E){let M=m*v+d*x+g*E+_*w;M<0&&(v=-v,x=-x,E=-E,w=-w,M=-M);let S=1-h;if(M<.9995){const L=Math.acos(M),N=Math.sin(L);S=Math.sin(S*L)/N,h=Math.sin(h*L)/N,m=m*S+v*h,d=d*S+x*h,g=g*S+E*h,_=_*S+w*h}else{m=m*S+v*h,d=d*S+x*h,g=g*S+E*h,_=_*S+w*h;const L=1/Math.sqrt(m*m+d*d+g*g+_*_);m*=L,d*=L,g*=L,_*=L}}t[n]=m,t[n+1]=d,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,o,c,u){const h=a[o],m=a[o+1],d=a[o+2],g=a[o+3],_=c[u],v=c[u+1],x=c[u+2],E=c[u+3];return t[n]=h*E+g*_+m*x-d*v,t[n+1]=m*E+g*v+d*_-h*x,t[n+2]=d*E+g*x+h*v-m*_,t[n+3]=g*E-h*_-m*v-d*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,c=t._z,u=t._order,h=Math.cos,m=Math.sin,d=h(a/2),g=h(o/2),_=h(c/2),v=m(a/2),x=m(o/2),E=m(c/2);switch(u){case"XYZ":this._x=v*g*_+d*x*E,this._y=d*x*_-v*g*E,this._z=d*g*E+v*x*_,this._w=d*g*_-v*x*E;break;case"YXZ":this._x=v*g*_+d*x*E,this._y=d*x*_-v*g*E,this._z=d*g*E-v*x*_,this._w=d*g*_+v*x*E;break;case"ZXY":this._x=v*g*_-d*x*E,this._y=d*x*_+v*g*E,this._z=d*g*E+v*x*_,this._w=d*g*_-v*x*E;break;case"ZYX":this._x=v*g*_-d*x*E,this._y=d*x*_+v*g*E,this._z=d*g*E-v*x*_,this._w=d*g*_+v*x*E;break;case"YZX":this._x=v*g*_+d*x*E,this._y=d*x*_+v*g*E,this._z=d*g*E-v*x*_,this._w=d*g*_-v*x*E;break;case"XZY":this._x=v*g*_-d*x*E,this._y=d*x*_-v*g*E,this._z=d*g*E+v*x*_,this._w=d*g*_+v*x*E;break;default:ne("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],c=n[8],u=n[1],h=n[5],m=n[9],d=n[2],g=n[6],_=n[10],v=a+h+_;if(v>0){const x=.5/Math.sqrt(v+1);this._w=.25/x,this._x=(g-m)*x,this._y=(c-d)*x,this._z=(u-o)*x}else if(a>h&&a>_){const x=2*Math.sqrt(1+a-h-_);this._w=(g-m)/x,this._x=.25*x,this._y=(o+u)/x,this._z=(c+d)/x}else if(h>_){const x=2*Math.sqrt(1+h-a-_);this._w=(c-d)/x,this._x=(o+u)/x,this._y=.25*x,this._z=(m+g)/x}else{const x=2*Math.sqrt(1+_-a-h);this._w=(u-o)/x,this._x=(c+d)/x,this._y=(m+g)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,c=t._z,u=t._w,h=n._x,m=n._y,d=n._z,g=n._w;return this._x=a*g+u*h+o*d-c*m,this._y=o*g+u*m+c*h-a*d,this._z=c*g+u*d+a*m-o*h,this._w=u*g-a*h-o*m-c*d,this._onChangeCallback(),this}slerp(t,n){let a=t._x,o=t._y,c=t._z,u=t._w,h=this.dot(t);h<0&&(a=-a,o=-o,c=-c,u=-u,h=-h);let m=1-n;if(h<.9995){const d=Math.acos(h),g=Math.sin(d);m=Math.sin(m*d)/g,n=Math.sin(n*d)/g,this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this._onChangeCallback()}else this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Hp=class Hp{constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Fv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Fv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=t.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,c=t.x,u=t.y,h=t.z,m=t.w,d=2*(u*o-h*a),g=2*(h*n-c*o),_=2*(c*a-u*n);return this.x=n+m*d+u*_-h*g,this.y=a+m*g+h*d-c*_,this.z=o+m*_+c*g-u*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=me(this.x,t.x,n.x),this.y=me(this.y,t.y,n.y),this.z=me(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=me(this.x,t,n),this.y=me(this.y,t,n),this.z=me(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,c=t.z,u=n.x,h=n.y,m=n.z;return this.x=o*m-c*h,this.y=c*u-a*m,this.z=a*h-o*u,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return kh.copy(this).projectOnVector(t),this.sub(kh)}reflect(t){return this.sub(kh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Hp.prototype.isVector3=!0;let G=Hp;const kh=new G,Fv=new Xs,Gp=class Gp{constructor(t,n,a,o,c,u,h,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,h,m,d)}set(t,n,a,o,c,u,h,m,d){const g=this.elements;return g[0]=t,g[1]=o,g[2]=h,g[3]=n,g[4]=c,g[5]=m,g[6]=a,g[7]=u,g[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],h=a[3],m=a[6],d=a[1],g=a[4],_=a[7],v=a[2],x=a[5],E=a[8],w=o[0],M=o[3],S=o[6],L=o[1],N=o[4],A=o[7],D=o[2],U=o[5],P=o[8];return c[0]=u*w+h*L+m*D,c[3]=u*M+h*N+m*U,c[6]=u*S+h*A+m*P,c[1]=d*w+g*L+_*D,c[4]=d*M+g*N+_*U,c[7]=d*S+g*A+_*P,c[2]=v*w+x*L+E*D,c[5]=v*M+x*N+E*U,c[8]=v*S+x*A+E*P,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],d=t[7],g=t[8];return n*u*g-n*h*d-a*c*g+a*h*m+o*c*d-o*u*m}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],d=t[7],g=t[8],_=g*u-h*d,v=h*m-g*c,x=d*c-u*m,E=n*_+a*v+o*x;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/E;return t[0]=_*w,t[1]=(o*d-g*a)*w,t[2]=(h*a-o*u)*w,t[3]=v*w,t[4]=(g*n-o*m)*w,t[5]=(o*c-h*n)*w,t[6]=x*w,t[7]=(a*m-d*n)*w,t[8]=(u*n-a*c)*w,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,c,u,h){const m=Math.cos(c),d=Math.sin(c);return this.set(a*m,a*d,-a*(m*u+d*h)+u+t,-o*d,o*m,-o*(-d*u+m*h)+h+n,0,0,1),this}scale(t,n){return Xr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Xh.makeScale(t,n)),this}rotate(t){return Xr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Xh.makeRotation(-t)),this}translate(t,n){return Xr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Xh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Gp.prototype.isMatrix3=!0;let re=Gp;const Xh=new re,Hv=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gv=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function aE(){const r={enabled:!0,workingColorSpace:xu,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===Be&&(o.r=wa(o.r),o.g=wa(o.g),o.b=wa(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Be&&(o.r=Wr(o.r),o.g=Wr(o.g),o.b=Wr(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Ta?Su:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return Xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return Xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[xu]:{primaries:t,whitePoint:a,transfer:Su,toXYZ:Hv,fromXYZ:Gv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:t,whitePoint:a,transfer:Be,toXYZ:Hv,fromXYZ:Gv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}}),r}const Ee=aE();function wa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Wr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let br;class sE{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{br===void 0&&(br=yu("canvas")),br.width=t.width,br.height=t.height;const o=br.getContext("2d");t instanceof ImageData?o.putImageData(t,0,0):o.drawImage(t,0,0,t.width,t.height),a=br}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=yu("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=wa(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(wa(n[a]/255)*255):n[a]=wa(n[a]);return{data:n,width:t.width,height:t.height}}else return ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let rE=0;class bp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:rE++}),this.uuid=ks(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,h=o.length;u<h;u++)o[u].isDataTexture?c.push(Wh(o[u].image)):c.push(Wh(o[u]))}else c=Wh(o);a.url=c}return n||(t.images[this.uuid]=a),a}}function Wh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?sE.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ne("Texture: Unable to serialize Texture."),{})}let oE=0;const qh=new G;class Pn extends Vs{constructor(t=Pn.DEFAULT_IMAGE,n=Pn.DEFAULT_MAPPING,a=Aa,o=Aa,c=Fn,u=Ps,h=zi,m=di,d=Pn.DEFAULT_ANISOTROPY,g=Ta){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oE++}),this.uuid=ks(),this.name="",this.source=new bp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=d,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(qh).x}get height(){return this.source.getSize(qh).y}get depth(){return this.source.getSize(qh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){ne(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){ne(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sx)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gu:t.x=t.x-Math.floor(t.x);break;case Aa:t.x=t.x<0?0:1;break;case Ad:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gu:t.y=t.y-Math.floor(t.y);break;case Aa:t.y=t.y<0?0:1;break;case Ad:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pn.DEFAULT_IMAGE=null;Pn.DEFAULT_MAPPING=sx;Pn.DEFAULT_ANISOTROPY=1;const Vp=class Vp{constructor(t=0,n=0,a=0,o=1){this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=this.w,u=t.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,c;const m=t.elements,d=m[0],g=m[4],_=m[8],v=m[1],x=m[5],E=m[9],w=m[2],M=m[6],S=m[10];if(Math.abs(g-v)<.01&&Math.abs(_-w)<.01&&Math.abs(E-M)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+w)<.1&&Math.abs(E+M)<.1&&Math.abs(d+x+S-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const N=(d+1)/2,A=(x+1)/2,D=(S+1)/2,U=(g+v)/4,P=(_+w)/4,b=(E+M)/4;return N>A&&N>D?N<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(N),o=U/a,c=P/a):A>D?A<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(A),a=U/o,c=b/o):D<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(D),a=P/c,o=b/c),this.set(a,o,c,n),this}let L=Math.sqrt((M-E)*(M-E)+(_-w)*(_-w)+(v-g)*(v-g));return Math.abs(L)<.001&&(L=1),this.x=(M-E)/L,this.y=(_-w)/L,this.z=(v-g)/L,this.w=Math.acos((d+x+S-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=me(this.x,t.x,n.x),this.y=me(this.y,t.y,n.y),this.z=me(this.z,t.z,n.z),this.w=me(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=me(this.x,t,n),this.y=me(this.y,t,n),this.z=me(this.z,t,n),this.w=me(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Vp.prototype.isVector4=!0;let $e=Vp;class lE extends Vs{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new $e(0,0,t,n),this.scissorTest=!1,this.viewport=new $e(0,0,t,n),this.textures=[];const o={width:t,height:n,depth:a.depth},c=new Pn(o),u=a.count;for(let h=0;h<u;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},t.textures[n].image);this.textures[n].source=new bp(o)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends lE{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class px extends Pn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=On,this.minFilter=On,this.wrapR=Aa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class cE extends Pn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=On,this.minFilter=On,this.wrapR=Aa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const bu=class bu{constructor(t,n,a,o,c,u,h,m,d,g,_,v,x,E,w,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,h,m,d,g,_,v,x,E,w,M)}set(t,n,a,o,c,u,h,m,d,g,_,v,x,E,w,M){const S=this.elements;return S[0]=t,S[4]=n,S[8]=a,S[12]=o,S[1]=c,S[5]=u,S[9]=h,S[13]=m,S[2]=d,S[6]=g,S[10]=_,S[14]=v,S[3]=x,S[7]=E,S[11]=w,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bu().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,o=1/Tr.setFromMatrixColumn(t,0).length(),c=1/Tr.setFromMatrixColumn(t,1).length(),u=1/Tr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,c=t.z,u=Math.cos(a),h=Math.sin(a),m=Math.cos(o),d=Math.sin(o),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const v=u*g,x=u*_,E=h*g,w=h*_;n[0]=m*g,n[4]=-m*_,n[8]=d,n[1]=x+E*d,n[5]=v-w*d,n[9]=-h*m,n[2]=w-v*d,n[6]=E+x*d,n[10]=u*m}else if(t.order==="YXZ"){const v=m*g,x=m*_,E=d*g,w=d*_;n[0]=v+w*h,n[4]=E*h-x,n[8]=u*d,n[1]=u*_,n[5]=u*g,n[9]=-h,n[2]=x*h-E,n[6]=w+v*h,n[10]=u*m}else if(t.order==="ZXY"){const v=m*g,x=m*_,E=d*g,w=d*_;n[0]=v-w*h,n[4]=-u*_,n[8]=E+x*h,n[1]=x+E*h,n[5]=u*g,n[9]=w-v*h,n[2]=-u*d,n[6]=h,n[10]=u*m}else if(t.order==="ZYX"){const v=u*g,x=u*_,E=h*g,w=h*_;n[0]=m*g,n[4]=E*d-x,n[8]=v*d+w,n[1]=m*_,n[5]=w*d+v,n[9]=x*d-E,n[2]=-d,n[6]=h*m,n[10]=u*m}else if(t.order==="YZX"){const v=u*m,x=u*d,E=h*m,w=h*d;n[0]=m*g,n[4]=w-v*_,n[8]=E*_+x,n[1]=_,n[5]=u*g,n[9]=-h*g,n[2]=-d*g,n[6]=x*_+E,n[10]=v-w*_}else if(t.order==="XZY"){const v=u*m,x=u*d,E=h*m,w=h*d;n[0]=m*g,n[4]=-_,n[8]=d*g,n[1]=v*_+w,n[5]=u*g,n[9]=x*_-E,n[2]=E*_-x,n[6]=h*g,n[10]=w*_+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(uE,t,fE)}lookAt(t,n,a){const o=this.elements;return fi.subVectors(t,n),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),is.crossVectors(a,fi),is.lengthSq()===0&&(Math.abs(a.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),is.crossVectors(a,fi)),is.normalize(),Oc.crossVectors(fi,is),o[0]=is.x,o[4]=Oc.x,o[8]=fi.x,o[1]=is.y,o[5]=Oc.y,o[9]=fi.y,o[2]=is.z,o[6]=Oc.z,o[10]=fi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],h=a[4],m=a[8],d=a[12],g=a[1],_=a[5],v=a[9],x=a[13],E=a[2],w=a[6],M=a[10],S=a[14],L=a[3],N=a[7],A=a[11],D=a[15],U=o[0],P=o[4],b=o[8],O=o[12],F=o[1],Y=o[5],V=o[9],tt=o[13],k=o[2],j=o[6],B=o[10],W=o[14],ct=o[3],rt=o[7],ht=o[11],I=o[15];return c[0]=u*U+h*F+m*k+d*ct,c[4]=u*P+h*Y+m*j+d*rt,c[8]=u*b+h*V+m*B+d*ht,c[12]=u*O+h*tt+m*W+d*I,c[1]=g*U+_*F+v*k+x*ct,c[5]=g*P+_*Y+v*j+x*rt,c[9]=g*b+_*V+v*B+x*ht,c[13]=g*O+_*tt+v*W+x*I,c[2]=E*U+w*F+M*k+S*ct,c[6]=E*P+w*Y+M*j+S*rt,c[10]=E*b+w*V+M*B+S*ht,c[14]=E*O+w*tt+M*W+S*I,c[3]=L*U+N*F+A*k+D*ct,c[7]=L*P+N*Y+A*j+D*rt,c[11]=L*b+N*V+A*B+D*ht,c[15]=L*O+N*tt+A*W+D*I,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[12],u=t[1],h=t[5],m=t[9],d=t[13],g=t[2],_=t[6],v=t[10],x=t[14],E=t[3],w=t[7],M=t[11],S=t[15],L=m*x-d*v,N=h*x-d*_,A=h*v-m*_,D=u*x-d*g,U=u*v-m*g,P=u*_-h*g;return n*(w*L-M*N+S*A)-a*(E*L-M*D+S*U)+o*(E*N-w*D+S*P)-c*(E*A-w*U+M*P)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[1],u=t[5],h=t[9],m=t[2],d=t[6],g=t[10];return n*(u*g-h*d)-a*(c*g-h*m)+o*(c*d-u*m)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],h=t[5],m=t[6],d=t[7],g=t[8],_=t[9],v=t[10],x=t[11],E=t[12],w=t[13],M=t[14],S=t[15],L=n*h-a*u,N=n*m-o*u,A=n*d-c*u,D=a*m-o*h,U=a*d-c*h,P=o*d-c*m,b=g*w-_*E,O=g*M-v*E,F=g*S-x*E,Y=_*M-v*w,V=_*S-x*w,tt=v*S-x*M,k=L*tt-N*V+A*Y+D*F-U*O+P*b;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/k;return t[0]=(h*tt-m*V+d*Y)*j,t[1]=(o*V-a*tt-c*Y)*j,t[2]=(w*P-M*U+S*D)*j,t[3]=(v*U-_*P-x*D)*j,t[4]=(m*F-u*tt-d*O)*j,t[5]=(n*tt-o*F+c*O)*j,t[6]=(M*A-E*P-S*N)*j,t[7]=(g*P-v*A+x*N)*j,t[8]=(u*V-h*F+d*b)*j,t[9]=(a*F-n*V-c*b)*j,t[10]=(E*U-w*A+S*L)*j,t[11]=(_*A-g*U-x*L)*j,t[12]=(h*O-u*Y-m*b)*j,t[13]=(n*Y-a*O+o*b)*j,t[14]=(w*N-E*D-M*L)*j,t[15]=(g*D-_*N+v*L)*j,this}scale(t){const n=this.elements,a=t.x,o=t.y,c=t.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=t.x,h=t.y,m=t.z,d=c*u,g=c*h;return this.set(d*u+a,d*h-o*m,d*m+o*h,0,d*h+o*m,g*h+a,g*m-o*u,0,d*m-o*h,g*m+o*u,c*m*m+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,c,u){return this.set(1,a,c,0,t,1,u,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,c=n._x,u=n._y,h=n._z,m=n._w,d=c+c,g=u+u,_=h+h,v=c*d,x=c*g,E=c*_,w=u*g,M=u*_,S=h*_,L=m*d,N=m*g,A=m*_,D=a.x,U=a.y,P=a.z;return o[0]=(1-(w+S))*D,o[1]=(x+A)*D,o[2]=(E-N)*D,o[3]=0,o[4]=(x-A)*U,o[5]=(1-(v+S))*U,o[6]=(M+L)*U,o[7]=0,o[8]=(E+N)*P,o[9]=(M-L)*P,o[10]=(1-(v+w))*P,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;t.x=o[12],t.y=o[13],t.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=Tr.set(o[0],o[1],o[2]).length();const h=Tr.set(o[4],o[5],o[6]).length(),m=Tr.set(o[8],o[9],o[10]).length();c<0&&(u=-u),Li.copy(this);const d=1/u,g=1/h,_=1/m;return Li.elements[0]*=d,Li.elements[1]*=d,Li.elements[2]*=d,Li.elements[4]*=g,Li.elements[5]*=g,Li.elements[6]*=g,Li.elements[8]*=_,Li.elements[9]*=_,Li.elements[10]*=_,n.setFromRotationMatrix(Li),a.x=u,a.y=h,a.z=m,this}makePerspective(t,n,a,o,c,u,h=Qi,m=!1){const d=this.elements,g=2*c/(n-t),_=2*c/(a-o),v=(n+t)/(n-t),x=(a+o)/(a-o);let E,w;if(m)E=c/(u-c),w=u*c/(u-c);else if(h===Qi)E=-(u+c)/(u-c),w=-2*u*c/(u-c);else if(h===dl)E=-u/(u-c),w=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return d[0]=g,d[4]=0,d[8]=v,d[12]=0,d[1]=0,d[5]=_,d[9]=x,d[13]=0,d[2]=0,d[6]=0,d[10]=E,d[14]=w,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,n,a,o,c,u,h=Qi,m=!1){const d=this.elements,g=2/(n-t),_=2/(a-o),v=-(n+t)/(n-t),x=-(a+o)/(a-o);let E,w;if(m)E=1/(u-c),w=u/(u-c);else if(h===Qi)E=-2/(u-c),w=-(u+c)/(u-c);else if(h===dl)E=-1/(u-c),w=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return d[0]=g,d[4]=0,d[8]=0,d[12]=v,d[1]=0,d[5]=_,d[9]=0,d[13]=x,d[2]=0,d[6]=0,d[10]=E,d[14]=w,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}};bu.prototype.isMatrix4=!0;let Re=bu;const Tr=new G,Li=new Re,uE=new G(0,0,0),fE=new G(1,1,1),is=new G,Oc=new G,fi=new G,Vv=new Re,kv=new Xs;class us{constructor(t=0,n=0,a=0,o=us.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,c=o[0],u=o[4],h=o[8],m=o[1],d=o[5],g=o[9],_=o[2],v=o[6],x=o[10];switch(n){case"XYZ":this._y=Math.asin(me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,x),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(v,d),this._z=0);break;case"YXZ":this._x=Math.asin(-me(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,x),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(me(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,x),this._z=Math.atan2(-u,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-me(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,d));break;case"YZX":this._z=Math.asin(me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,d),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,x));break;case"XZY":this._z=Math.asin(-me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(v,d),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-g,x),this._y=0);break;default:ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return Vv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Vv,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return kv.setFromEuler(this),this.setFromQuaternion(kv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}us.DEFAULT_ORDER="XYZ";class Tp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hE=0;const Xv=new G,Ar=new Xs,xa=new Re,Pc=new G,qo=new G,dE=new G,pE=new Xs,Wv=new G(1,0,0),qv=new G(0,1,0),Yv=new G(0,0,1),Zv={type:"added"},mE={type:"removed"},Rr={type:"childadded",child:null},Yh={type:"childremoved",child:null};class Mn extends Vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hE++}),this.uuid=ks(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mn.DEFAULT_UP.clone();const t=new G,n=new us,a=new Xs,o=new G(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Re},normalMatrix:{value:new re}}),this.matrix=new Re,this.matrixWorld=new Re,this.matrixAutoUpdate=Mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Ar.setFromAxisAngle(t,n),this.quaternion.multiply(Ar),this}rotateOnWorldAxis(t,n){return Ar.setFromAxisAngle(t,n),this.quaternion.premultiply(Ar),this}rotateX(t){return this.rotateOnAxis(Wv,t)}rotateY(t){return this.rotateOnAxis(qv,t)}rotateZ(t){return this.rotateOnAxis(Yv,t)}translateOnAxis(t,n){return Xv.copy(t).applyQuaternion(this.quaternion),this.position.add(Xv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Wv,t)}translateY(t){return this.translateOnAxis(qv,t)}translateZ(t){return this.translateOnAxis(Yv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Pc.copy(t):Pc.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(qo,Pc,this.up):xa.lookAt(Pc,qo,this.up),this.quaternion.setFromRotationMatrix(xa),o&&(xa.extractRotation(o.matrixWorld),Ar.setFromRotationMatrix(xa),this.quaternion.premultiply(Ar.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ae("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zv),Rr.child=t,this.dispatchEvent(Rr),Rr.child=null):Ae("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(mE),Yh.child=t,this.dispatchEvent(Yh),Yh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xa.multiply(t.parent.matrixWorld)),t.applyMatrix4(xa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zv),Rr.child=t,this.dispatchEvent(Rr),Rr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(t,n);if(u!==void 0)return u}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,t,dE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,pE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,o=t.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const o=this.parent;if(t===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,h=c.length;u<h;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let d=0,g=m.length;d<g;d++){const _=m[d];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,d=this.material.length;m<d;m++)h.push(c(t.materials,this.material[m]));o.material=h}else o.material=c(t.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];o.animations.push(c(t.animations,m))}}if(n){const h=u(t.geometries),m=u(t.materials),d=u(t.textures),g=u(t.images),_=u(t.shapes),v=u(t.skeletons),x=u(t.animations),E=u(t.nodes);h.length>0&&(a.geometries=h),m.length>0&&(a.materials=m),d.length>0&&(a.textures=d),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),v.length>0&&(a.skeletons=v),x.length>0&&(a.animations=x),E.length>0&&(a.nodes=E)}return a.object=o,a;function u(h){const m=[];for(const d in h){const g=h[d];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Mn.DEFAULT_UP=new G(0,1,0);Mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class cs extends Mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gE={type:"move"};class Zh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,c=null,u=null;const h=this._targetRay,m=this._grip,d=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(d&&t.hand){u=!0;for(const w of t.hand.values()){const M=n.getJointPose(w,a),S=this._getHandJoint(d,w);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const g=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],v=g.position.distanceTo(_.position),x=.02,E=.005;d.inputState.pinching&&v>x+E?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&v<=x-E&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));h!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(gE)))}return h!==null&&(h.visible=o!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=u!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new cs;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const mx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},as={h:0,s:0,l:0},Ic={h:0,s:0,l:0};function Kh(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class ee{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ee.colorSpaceToWorking(this,n),this}setRGB(t,n,a,o=Ee.workingColorSpace){return this.r=t,this.g=n,this.b=a,Ee.colorSpaceToWorking(this,o),this}setHSL(t,n,a,o=Ee.workingColorSpace){if(t=Ep(t,1),n=me(n,0,1),a=me(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=Kh(u,c,t+1/3),this.g=Kh(u,c,t),this.b=Kh(u,c,t-1/3)}return Ee.colorSpaceToWorking(this,o),this}setStyle(t,n=ti){function a(c){c!==void 0&&parseFloat(c)<1&&ne("Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const u=o[1],h=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:ne("Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);ne("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ti){const a=mx[t.toLowerCase()];return a!==void 0?this.setHex(a,n):ne("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wa(t.r),this.g=wa(t.g),this.b=wa(t.b),this}copyLinearToSRGB(t){return this.r=Wr(t.r),this.g=Wr(t.g),this.b=Wr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ti){return Ee.workingToColorSpace(Bn.copy(this),t),Math.round(me(Bn.r*255,0,255))*65536+Math.round(me(Bn.g*255,0,255))*256+Math.round(me(Bn.b*255,0,255))}getHexString(t=ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ee.workingColorSpace){Ee.workingToColorSpace(Bn.copy(this),n);const a=Bn.r,o=Bn.g,c=Bn.b,u=Math.max(a,o,c),h=Math.min(a,o,c);let m,d;const g=(h+u)/2;if(h===u)m=0,d=0;else{const _=u-h;switch(d=g<=.5?_/(u+h):_/(2-u-h),u){case a:m=(o-c)/_+(o<c?6:0);break;case o:m=(c-a)/_+2;break;case c:m=(a-o)/_+4;break}m/=6}return t.h=m,t.s=d,t.l=g,t}getRGB(t,n=Ee.workingColorSpace){return Ee.workingToColorSpace(Bn.copy(this),n),t.r=Bn.r,t.g=Bn.g,t.b=Bn.b,t}getStyle(t=ti){Ee.workingToColorSpace(Bn.copy(this),t);const n=Bn.r,a=Bn.g,o=Bn.b;return t!==ti?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(as),this.setHSL(as.h+t,as.s+n,as.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(as),t.getHSL(Ic);const a=rl(as.h,Ic.h,n),o=rl(as.s,Ic.s,n),c=rl(as.l,Ic.l,n);return this.setHSL(a,o,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new ee;ee.NAMES=mx;class Ap{constructor(t,n=1,a=1e3){this.isFog=!0,this.name="",this.color=new ee(t),this.near=n,this.far=a}clone(){return new Ap(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Kv extends Mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new us,this.environmentIntensity=1,this.environmentRotation=new us,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Ni=new G,Sa=new G,Jh=new G,ya=new G,wr=new G,Cr=new G,Jv=new G,Qh=new G,jh=new G,$h=new G,td=new $e,ed=new $e,nd=new $e;class Pi{constructor(t=new G,n=new G,a=new G){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),Ni.subVectors(t,n),o.cross(Ni);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(t,n,a,o,c){Ni.subVectors(o,n),Sa.subVectors(a,n),Jh.subVectors(t,n);const u=Ni.dot(Ni),h=Ni.dot(Sa),m=Ni.dot(Jh),d=Sa.dot(Sa),g=Sa.dot(Jh),_=u*d-h*h;if(_===0)return c.set(0,0,0),null;const v=1/_,x=(d*m-h*g)*v,E=(u*g-h*m)*v;return c.set(1-x-E,E,x)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(t,n,a,o,c,u,h,m){return this.getBarycoord(t,n,a,o,ya)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ya.x),m.addScaledVector(u,ya.y),m.addScaledVector(h,ya.z),m)}static getInterpolatedAttribute(t,n,a,o,c,u){return td.setScalar(0),ed.setScalar(0),nd.setScalar(0),td.fromBufferAttribute(t,n),ed.fromBufferAttribute(t,a),nd.fromBufferAttribute(t,o),u.setScalar(0),u.addScaledVector(td,c.x),u.addScaledVector(ed,c.y),u.addScaledVector(nd,c.z),u}static isFrontFacing(t,n,a,o){return Ni.subVectors(a,n),Sa.subVectors(t,n),Ni.cross(Sa).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ni.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),Ni.cross(Sa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Pi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Pi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,c){return Pi.getInterpolation(t,this.a,this.b,this.c,n,a,o,c)}containsPoint(t){return Pi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Pi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,c=this.c;let u,h;wr.subVectors(o,a),Cr.subVectors(c,a),Qh.subVectors(t,a);const m=wr.dot(Qh),d=Cr.dot(Qh);if(m<=0&&d<=0)return n.copy(a);jh.subVectors(t,o);const g=wr.dot(jh),_=Cr.dot(jh);if(g>=0&&_<=g)return n.copy(o);const v=m*_-g*d;if(v<=0&&m>=0&&g<=0)return u=m/(m-g),n.copy(a).addScaledVector(wr,u);$h.subVectors(t,c);const x=wr.dot($h),E=Cr.dot($h);if(E>=0&&x<=E)return n.copy(c);const w=x*d-m*E;if(w<=0&&d>=0&&E<=0)return h=d/(d-E),n.copy(a).addScaledVector(Cr,h);const M=g*E-x*_;if(M<=0&&_-g>=0&&x-E>=0)return Jv.subVectors(c,o),h=(_-g)/(_-g+(x-E)),n.copy(o).addScaledVector(Jv,h);const S=1/(M+w+v);return u=w*S,h=v*S,n.copy(a).addScaledVector(wr,u).addScaledVector(Cr,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ws{constructor(t=new G(1/0,1/0,1/0),n=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Oi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Oi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Oi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let u=0,h=c.count;u<h;u++)t.isMesh===!0?t.getVertexPosition(u,Oi):Oi.fromBufferAttribute(c,u),Oi.applyMatrix4(t.matrixWorld),this.expandByPoint(Oi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),zc.copy(a.boundingBox)),zc.applyMatrix4(t.matrixWorld),this.union(zc)}const o=t.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Oi),Oi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Yo),Bc.subVectors(this.max,Yo),Dr.subVectors(t.a,Yo),Ur.subVectors(t.b,Yo),Lr.subVectors(t.c,Yo),ss.subVectors(Ur,Dr),rs.subVectors(Lr,Ur),Ds.subVectors(Dr,Lr);let n=[0,-ss.z,ss.y,0,-rs.z,rs.y,0,-Ds.z,Ds.y,ss.z,0,-ss.x,rs.z,0,-rs.x,Ds.z,0,-Ds.x,-ss.y,ss.x,0,-rs.y,rs.x,0,-Ds.y,Ds.x,0];return!id(n,Dr,Ur,Lr,Bc)||(n=[1,0,0,0,1,0,0,0,1],!id(n,Dr,Ur,Lr,Bc))?!1:(Fc.crossVectors(ss,rs),n=[Fc.x,Fc.y,Fc.z],id(n,Dr,Ur,Lr,Bc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Oi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Oi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ma),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ma=[new G,new G,new G,new G,new G,new G,new G,new G],Oi=new G,zc=new Ws,Dr=new G,Ur=new G,Lr=new G,ss=new G,rs=new G,Ds=new G,Yo=new G,Bc=new G,Fc=new G,Us=new G;function id(r,t,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){Us.fromArray(r,c);const h=o.x*Math.abs(Us.x)+o.y*Math.abs(Us.y)+o.z*Math.abs(Us.z),m=t.dot(Us),d=n.dot(Us),g=a.dot(Us);if(Math.max(-Math.max(m,d,g),Math.min(m,d,g))>h)return!1}return!0}const _n=new G,Hc=new Xt;let vE=0;class Bi extends Vs{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vE++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=zM,this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Hc.fromBufferAttribute(this,n),Hc.applyMatrix3(t),this.setXY(n,Hc.x,Hc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)_n.fromBufferAttribute(this,n),_n.applyMatrix3(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)_n.fromBufferAttribute(this,n),_n.applyMatrix4(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)_n.fromBufferAttribute(this,n),_n.applyNormalMatrix(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)_n.fromBufferAttribute(this,n),_n.transformDirection(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=Gr(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=kn(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Gr(n,this.array)),n}setX(t,n){return this.normalized&&(n=kn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Gr(n,this.array)),n}setY(t,n){return this.normalized&&(n=kn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Gr(n,this.array)),n}setZ(t,n){return this.normalized&&(n=kn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Gr(n,this.array)),n}setW(t,n){return this.normalized&&(n=kn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=kn(n,this.array),a=kn(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=kn(n,this.array),a=kn(a,this.array),o=kn(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t*=this.itemSize,this.normalized&&(n=kn(n,this.array),a=kn(a,this.array),o=kn(o,this.array),c=kn(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class gx extends Bi{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class vx extends Bi{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class De extends Bi{constructor(t,n,a){super(new Float32Array(t),n,a)}}const _E=new Ws,Zo=new G,ad=new G;class Kr{constructor(t=new G,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):_E.setFromPoints(t).getCenter(a);let o=0;for(let c=0,u=t.length;c<u;c++)o=Math.max(o,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zo.subVectors(t,this.center);const n=Zo.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(Zo,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ad.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zo.copy(t.center).add(ad)),this.expandByPoint(Zo.copy(t.center).sub(ad))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let xE=0;const bi=new Re,sd=new Mn,Nr=new G,hi=new Ws,Ko=new Ws,wn=new G;class Tn extends Vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xE++}),this.uuid=ks(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(BM(t)?vx:gx)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new re().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return bi.makeRotationFromQuaternion(t),this.applyMatrix4(bi),this}rotateX(t){return bi.makeRotationX(t),this.applyMatrix4(bi),this}rotateY(t){return bi.makeRotationY(t),this.applyMatrix4(bi),this}rotateZ(t){return bi.makeRotationZ(t),this.applyMatrix4(bi),this}translate(t,n,a){return bi.makeTranslation(t,n,a),this.applyMatrix4(bi),this}scale(t,n,a){return bi.makeScale(t,n,a),this.applyMatrix4(bi),this}lookAt(t){return sd.lookAt(t),sd.updateMatrix(),this.applyMatrix4(sd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nr).negate(),this.translate(Nr.x,Nr.y,Nr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=t.length;o<c;o++){const u=t[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new De(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const c=t[o];n.setXYZ(o,c.x,c.y,c.z||0)}t.length>n.count&&ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ws);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];hi.setFromBufferAttribute(c),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ae('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kr);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){const a=this.boundingSphere.center;if(hi.setFromBufferAttribute(t),n)for(let c=0,u=n.length;c<u;c++){const h=n[c];Ko.setFromBufferAttribute(h),this.morphTargetsRelative?(wn.addVectors(hi.min,Ko.min),hi.expandByPoint(wn),wn.addVectors(hi.max,Ko.max),hi.expandByPoint(wn)):(hi.expandByPoint(Ko.min),hi.expandByPoint(Ko.max))}hi.getCenter(a);let o=0;for(let c=0,u=t.count;c<u;c++)wn.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(wn));if(n)for(let c=0,u=n.length;c<u;c++){const h=n[c],m=this.morphTargetsRelative;for(let d=0,g=h.count;d<g;d++)wn.fromBufferAttribute(h,d),m&&(Nr.fromBufferAttribute(t,d),wn.add(Nr)),o=Math.max(o,a.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Ae('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ae("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new Bi(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const h=[],m=[];for(let b=0;b<a.count;b++)h[b]=new G,m[b]=new G;const d=new G,g=new G,_=new G,v=new Xt,x=new Xt,E=new Xt,w=new G,M=new G;function S(b,O,F){d.fromBufferAttribute(a,b),g.fromBufferAttribute(a,O),_.fromBufferAttribute(a,F),v.fromBufferAttribute(c,b),x.fromBufferAttribute(c,O),E.fromBufferAttribute(c,F),g.sub(d),_.sub(d),x.sub(v),E.sub(v);const Y=1/(x.x*E.y-E.x*x.y);isFinite(Y)&&(w.copy(g).multiplyScalar(E.y).addScaledVector(_,-x.y).multiplyScalar(Y),M.copy(_).multiplyScalar(x.x).addScaledVector(g,-E.x).multiplyScalar(Y),h[b].add(w),h[O].add(w),h[F].add(w),m[b].add(M),m[O].add(M),m[F].add(M))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let b=0,O=L.length;b<O;++b){const F=L[b],Y=F.start,V=F.count;for(let tt=Y,k=Y+V;tt<k;tt+=3)S(t.getX(tt+0),t.getX(tt+1),t.getX(tt+2))}const N=new G,A=new G,D=new G,U=new G;function P(b){D.fromBufferAttribute(o,b),U.copy(D);const O=h[b];N.copy(O),N.sub(D.multiplyScalar(D.dot(O))).normalize(),A.crossVectors(U,O);const Y=A.dot(m[b])<0?-1:1;u.setXYZW(b,N.x,N.y,N.z,Y)}for(let b=0,O=L.length;b<O;++b){const F=L[b],Y=F.start,V=F.count;for(let tt=Y,k=Y+V;tt<k;tt+=3)P(t.getX(tt+0)),P(t.getX(tt+1)),P(t.getX(tt+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new Bi(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let v=0,x=a.count;v<x;v++)a.setXYZ(v,0,0,0);const o=new G,c=new G,u=new G,h=new G,m=new G,d=new G,g=new G,_=new G;if(t)for(let v=0,x=t.count;v<x;v+=3){const E=t.getX(v+0),w=t.getX(v+1),M=t.getX(v+2);o.fromBufferAttribute(n,E),c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),g.subVectors(u,c),_.subVectors(o,c),g.cross(_),h.fromBufferAttribute(a,E),m.fromBufferAttribute(a,w),d.fromBufferAttribute(a,M),h.add(g),m.add(g),d.add(g),a.setXYZ(E,h.x,h.y,h.z),a.setXYZ(w,m.x,m.y,m.z),a.setXYZ(M,d.x,d.y,d.z)}else for(let v=0,x=n.count;v<x;v+=3)o.fromBufferAttribute(n,v+0),c.fromBufferAttribute(n,v+1),u.fromBufferAttribute(n,v+2),g.subVectors(u,c),_.subVectors(o,c),g.cross(_),a.setXYZ(v+0,g.x,g.y,g.z),a.setXYZ(v+1,g.x,g.y,g.z),a.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)wn.fromBufferAttribute(t,n),wn.normalize(),t.setXYZ(n,wn.x,wn.y,wn.z)}toNonIndexed(){function t(h,m){const d=h.array,g=h.itemSize,_=h.normalized,v=new d.constructor(m.length*g);let x=0,E=0;for(let w=0,M=m.length;w<M;w++){h.isInterleavedBufferAttribute?x=m[w]*h.data.stride+h.offset:x=m[w]*g;for(let S=0;S<g;S++)v[E++]=d[x++]}return new Bi(v,g,_)}if(this.index===null)return ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Tn,a=this.index.array,o=this.attributes;for(const h in o){const m=o[h],d=t(m,a);n.setAttribute(h,d)}const c=this.morphAttributes;for(const h in c){const m=[],d=c[h];for(let g=0,_=d.length;g<_;g++){const v=d[g],x=t(v,a);m.push(x)}n.morphAttributes[h]=m}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let h=0,m=u.length;h<m;h++){const d=u[h];n.addGroup(d.start,d.count,d.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const d=a[m];t.data.attributes[m]=d.toJSON(t.data)}const o={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],g=[];for(let _=0,v=d.length;_<v;_++){const x=d[_];g.push(x.toJSON(t.data))}g.length>0&&(o[m]=g,c=!0)}c&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(t.data.groups=JSON.parse(JSON.stringify(u)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere=h.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const o=t.attributes;for(const d in o){const g=o[d];this.setAttribute(d,g.clone(n))}const c=t.morphAttributes;for(const d in c){const g=[],_=c[d];for(let v=0,x=_.length;v<x;v++)g.push(_[v].clone(n));this.morphAttributes[d]=g}this.morphTargetsRelative=t.morphTargetsRelative;const u=t.groups;for(let d=0,g=u.length;d<g;d++){const _=u[d];this.addGroup(_.start,_.count,_.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rd=new G,SE=new G,yE=new re;class ba{constructor(t=new G(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=rd.subVectors(a,n).cross(SE.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const o=t.delta(rd),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(t.start).addScaledVector(o,u)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||yE.getNormalMatrix(t),o=this.coplanarPoint(rd).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let ME=0;class Jr extends Vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ME++}),this.uuid=ks(),this.name="",this.type="Material",this.blending=al,this.side=Bs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=J_,this.blendDst=Q_,this.blendEquation=Hr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=ul,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=DM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vh,this.stencilZFail=Vh,this.stencilZPass=Vh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){ne(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){ne(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const h in c){const m=c[h];delete m.metadata,u.push(m)}return u}if(n){const c=o(t.textures),u=o(t.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new ba().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Xt().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ea=new G,od=new G,Gc=new G,Vc=new G;class Rp{constructor(t=new G,n=new G(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ea)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Ea.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ea.copy(this.origin).addScaledVector(this.direction,n),Ea.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){od.copy(t).add(n).multiplyScalar(.5),Gc.copy(n).sub(t).normalize(),Vc.copy(this.origin).sub(od);const c=t.distanceTo(n)*.5,u=-this.direction.dot(Gc),h=Vc.dot(this.direction),m=-Vc.dot(Gc),d=Vc.lengthSq(),g=Math.abs(1-u*u);let _,v,x,E;if(g>0)if(_=u*m-h,v=u*h-m,E=c*g,_>=0)if(v>=-E)if(v<=E){const w=1/g;_*=w,v*=w,x=_*(_+u*v+2*h)+v*(u*_+v+2*m)+d}else v=c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*m)+d;else v=-c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*m)+d;else v<=-E?(_=Math.max(0,-(-u*c+h)),v=_>0?-c:Math.min(Math.max(-c,-m),c),x=-_*_+v*(v+2*m)+d):v<=E?(_=0,v=Math.min(Math.max(-c,-m),c),x=v*(v+2*m)+d):(_=Math.max(0,-(u*c+h)),v=_>0?c:Math.min(Math.max(-c,-m),c),x=-_*_+v*(v+2*m)+d);else v=u>0?-c:c,_=Math.max(0,-(u*v+h)),x=-_*_+v*(v+2*m)+d;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(od).addScaledVector(Gc,v),x}intersectSphere(t,n){if(t.radius<0)return null;Ea.subVectors(t.center,this.origin);const a=Ea.dot(this.direction),o=Ea.dot(Ea)-a*a,c=t.radius*t.radius;if(o>c)return null;const u=Math.sqrt(c-o),h=a-u,m=a+u;return m<0?null:h<0?this.at(m,n):this.at(h,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,c,u,h,m;const d=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return d>=0?(a=(t.min.x-v.x)*d,o=(t.max.x-v.x)*d):(a=(t.max.x-v.x)*d,o=(t.min.x-v.x)*d),g>=0?(c=(t.min.y-v.y)*g,u=(t.max.y-v.y)*g):(c=(t.max.y-v.y)*g,u=(t.min.y-v.y)*g),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),_>=0?(h=(t.min.z-v.z)*_,m=(t.max.z-v.z)*_):(h=(t.max.z-v.z)*_,m=(t.min.z-v.z)*_),a>m||h>o)||((h>a||a!==a)&&(a=h),(m<o||o!==o)&&(o=m),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,Ea)!==null}intersectTriangle(t,n,a,o,c){const u=this.origin,h=this.direction,m=h.x,d=h.y,g=h.z,_=t.x-u.x,v=t.y-u.y,x=t.z-u.z,E=n.x-u.x,w=n.y-u.y,M=n.z-u.z,S=a.x-u.x,L=a.y-u.y,N=a.z-u.z,A=Math.abs(m),D=Math.abs(d),U=Math.abs(g);let P,b,O,F,Y,V,tt,k,j,B,W,ct;if(A>=D&&A>=U?(O=m,V=_,j=E,ct=S,m>=0?(P=d,b=g,F=v,Y=x,tt=w,k=M,B=L,W=N):(P=g,b=d,F=x,Y=v,tt=M,k=w,B=N,W=L)):D>=U?(O=d,V=v,j=w,ct=L,d>=0?(P=g,b=m,F=x,Y=_,tt=M,k=E,B=N,W=S):(P=m,b=g,F=_,Y=x,tt=E,k=M,B=S,W=N)):(O=g,V=x,j=M,ct=N,g>=0?(P=m,b=d,F=_,Y=v,tt=E,k=w,B=S,W=L):(P=d,b=m,F=v,Y=_,tt=w,k=E,B=L,W=S)),O===0)return null;const rt=P/O,ht=b/O,I=1/O,$=F-rt*V,gt=Y-ht*V,Et=tt-rt*j,Lt=k-ht*j,kt=B-rt*ct,at=W-ht*ct,vt=kt*Lt-at*Et,Tt=$*at-gt*kt,te=Et*gt-Lt*$;if(o){if(vt<0||Tt<0||te<0)return null}else if((vt<0||Tt<0||te<0)&&(vt>0||Tt>0||te>0))return null;const Ft=vt+Tt+te;if(Ft===0)return null;const le=I*(vt*V+Tt*j+te*ct);return(Ft>0?le<0:le>0)?null:this.at(le/Ft,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _x extends Jr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new us,this.combine=j_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Qv=new Re,Ls=new Rp,kc=new Kr,jv=new G,Xc=new G,Wc=new G,qc=new G,ld=new G,Yc=new G,$v=new G,Zc=new G;class Ze extends Mn{constructor(t=new Tn,n=new _x){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const h=this.morphTargetInfluences;if(c&&h){Yc.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const g=h[m],_=c[m];g!==0&&(ld.fromBufferAttribute(_,t),u?Yc.addScaledVector(ld,g):Yc.addScaledVector(ld.sub(n),g))}n.add(Yc)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),kc.copy(a.boundingSphere),kc.applyMatrix4(c),Ls.copy(t.ray).recast(t.near),!(kc.containsPoint(Ls.origin)===!1&&(Ls.intersectSphere(kc,jv)===null||Ls.origin.distanceToSquared(jv)>(t.far-t.near)**2))&&(Qv.copy(c).invert(),Ls.copy(t.ray).applyMatrix4(Qv),!(a.boundingBox!==null&&Ls.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ls)))}_computeIntersections(t,n,a){let o;const c=this.geometry,u=this.material,h=c.index,m=c.attributes.position,d=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,v=c.groups,x=c.drawRange;if(h!==null)if(Array.isArray(u))for(let E=0,w=v.length;E<w;E++){const M=v[E],S=u[M.materialIndex],L=Math.max(M.start,x.start),N=Math.min(h.count,Math.min(M.start+M.count,x.start+x.count));for(let A=L,D=N;A<D;A+=3){const U=h.getX(A),P=h.getX(A+1),b=h.getX(A+2);o=Kc(this,S,t,a,d,g,_,U,P,b),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const E=Math.max(0,x.start),w=Math.min(h.count,x.start+x.count);for(let M=E,S=w;M<S;M+=3){const L=h.getX(M),N=h.getX(M+1),A=h.getX(M+2);o=Kc(this,u,t,a,d,g,_,L,N,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(u))for(let E=0,w=v.length;E<w;E++){const M=v[E],S=u[M.materialIndex],L=Math.max(M.start,x.start),N=Math.min(m.count,Math.min(M.start+M.count,x.start+x.count));for(let A=L,D=N;A<D;A+=3){const U=A,P=A+1,b=A+2;o=Kc(this,S,t,a,d,g,_,U,P,b),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const E=Math.max(0,x.start),w=Math.min(m.count,x.start+x.count);for(let M=E,S=w;M<S;M+=3){const L=M,N=M+1,A=M+2;o=Kc(this,u,t,a,d,g,_,L,N,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}}}function EE(r,t,n,a,o,c,u,h){let m;if(t.side===Wn?m=a.intersectTriangle(u,c,o,!0,h):m=a.intersectTriangle(o,c,u,t.side===Bs,h),m===null)return null;Zc.copy(h),Zc.applyMatrix4(r.matrixWorld);const d=n.ray.origin.distanceTo(Zc);return d<n.near||d>n.far?null:{distance:d,point:Zc.clone(),object:r}}function Kc(r,t,n,a,o,c,u,h,m,d){r.getVertexPosition(h,Xc),r.getVertexPosition(m,Wc),r.getVertexPosition(d,qc);const g=EE(r,t,n,a,Xc,Wc,qc,$v);if(g){const _=new G;Pi.getBarycoord($v,Xc,Wc,qc,_),o&&(g.uv=Pi.getInterpolatedAttribute(o,h,m,d,_,new Xt)),c&&(g.uv1=Pi.getInterpolatedAttribute(c,h,m,d,_,new Xt)),u&&(g.normal=Pi.getInterpolatedAttribute(u,h,m,d,_,new G),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const v={a:h,b:m,c:d,normal:new G,materialIndex:0};Pi.getNormal(Xc,Wc,qc,v.normal),g.face=v,g.barycoord=_}return g}class xx extends Pn{constructor(t=null,n=1,a=1,o,c,u,h,m,d=On,g=On,_,v){super(null,u,h,m,d,g,o,c,_,v),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class t_ extends Bi{constructor(t,n,a,o=1){super(t,n,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Or=new Re,e_=new Re,Jc=[],n_=new Ws,bE=new Re,Jo=new Ze,Qo=new Kr;class ml extends Ze{constructor(t,n,a){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new t_(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<a;o++)this.setMatrixAt(o,bE)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Ws),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Or),n_.copy(t.boundingBox).applyMatrix4(Or),this.boundingBox.union(n_)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Kr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<n;a++)this.getMatrixAt(a,Or),Qo.copy(t.boundingSphere).applyMatrix4(Or),this.boundingSphere.union(Qo)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){return n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const a=n.morphTargetInfluences,o=this.morphTexture.source.data.data,c=a.length+1,u=t*c+1;for(let h=0;h<a.length;h++)a[h]=o[u+h]}raycast(t,n){const a=this.matrixWorld,o=this.count;if(Jo.geometry=this.geometry,Jo.material=this.material,Jo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qo.copy(this.boundingSphere),Qo.applyMatrix4(a),t.ray.intersectsSphere(Qo)!==!1))for(let c=0;c<o;c++){this.getMatrixAt(c,Or),e_.multiplyMatrices(a,Or),Jo.matrixWorld=e_,Jo.raycast(t,Jc);for(let u=0,h=Jc.length;u<h;u++){const m=Jc[u];m.instanceId=c,m.object=this,n.push(m)}Jc.length=0}}setColorAt(t,n){return this.instanceColor===null&&(this.instanceColor=new t_(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,n){return n.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,n){const a=n.morphTargetInfluences,o=a.length+1;this.morphTexture===null&&(this.morphTexture=new xx(new Float32Array(o*this.count),o,this.count,vp,Ii));const c=this.morphTexture.source.data.data;let u=0;for(let d=0;d<a.length;d++)u+=a[d];const h=this.geometry.morphTargetsRelative?1:1-u,m=o*t;return c[m]=h,c.set(a,m+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ns=new Kr,TE=new Xt(.5,.5),Qc=new G;class wp{constructor(t=new ba,n=new ba,a=new ba,o=new ba,c=new ba,u=new ba){this.planes=[t,n,a,o,c,u]}set(t,n,a,o,c,u){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(a),h[3].copy(o),h[4].copy(c),h[5].copy(u),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=Qi,a=!1){const o=this.planes,c=t.elements,u=c[0],h=c[1],m=c[2],d=c[3],g=c[4],_=c[5],v=c[6],x=c[7],E=c[8],w=c[9],M=c[10],S=c[11],L=c[12],N=c[13],A=c[14],D=c[15];if(o[0].setComponents(d-u,x-g,S-E,D-L).normalize(),o[1].setComponents(d+u,x+g,S+E,D+L).normalize(),o[2].setComponents(d+h,x+_,S+w,D+N).normalize(),o[3].setComponents(d-h,x-_,S-w,D-N).normalize(),a)o[4].setComponents(m,v,M,A).normalize(),o[5].setComponents(d-m,x-v,S-M,D-A).normalize();else if(o[4].setComponents(d-m,x-v,S-M,D-A).normalize(),n===Qi)o[5].setComponents(d+m,x+v,S+M,D+A).normalize();else if(n===dl)o[5].setComponents(m,v,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ns.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ns)}intersectsSprite(t){Ns.center.set(0,0,0);const n=TE.distanceTo(t.center);return Ns.radius=.7071067811865476+n,Ns.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ns)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(Qc.x=o.normal.x>0?t.max.x:t.min.x,Qc.y=o.normal.y>0?t.max.y:t.min.y,Qc.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(Qc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class AE extends Jr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const i_=new Re,ap=new Rp,jc=new Kr,$c=new G;class RE extends Mn{constructor(t=new Tn,n=new AE){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.matrixWorld,c=t.params.Points.threshold,u=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),jc.copy(a.boundingSphere),jc.applyMatrix4(o),jc.radius+=c,t.ray.intersectsSphere(jc)===!1)return;i_.copy(o).invert(),ap.copy(t.ray).applyMatrix4(i_);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=h*h,d=a.index,_=a.attributes.position;if(d!==null){const v=Math.max(0,u.start),x=Math.min(d.count,u.start+u.count);for(let E=v,w=x;E<w;E++){const M=d.getX(E);$c.fromBufferAttribute(_,M),a_($c,M,m,o,t,n,this)}}else{const v=Math.max(0,u.start),x=Math.min(_.count,u.start+u.count);for(let E=v,w=x;E<w;E++)$c.fromBufferAttribute(_,E),a_($c,E,m,o,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function a_(r,t,n,a,o,c,u){const h=ap.distanceSqToPoint(r);if(h<n){const m=new G;ap.closestPointToPoint(r,m),m.applyMatrix4(a);const d=o.ray.origin.distanceTo(m);if(d<o.near||d>o.far)return;c.push({distance:d,distanceToRay:Math.sqrt(h),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:u})}}class Sx extends Pn{constructor(t=[],n=Fs,a,o,c,u,h,m,d,g){super(t,n,a,o,c,u,h,m,d,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wE extends Pn{constructor(t,n,a,o,c,u,h,m,d){super(t,n,a,o,c,u,h,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gl extends Pn{constructor(t,n,a=$i,o,c,u,h=On,m=On,d,g=Ca,_=1){if(g!==Ca&&g!==Is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:t,height:n,depth:_};super(v,o,c,u,h,m,g,a,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new bp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}}class CE extends gl{constructor(t,n=$i,a=Fs,o,c,u=On,h=On,m,d=Ca){const g={width:t,height:t,depth:1},_=[g,g,g,g,g,g];super(t,t,n,a,o,c,u,h,m,d),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class yx extends Pn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class yl extends Tn{constructor(t=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const h=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const m=[],d=[],g=[],_=[];let v=0,x=0;E("z","y","x",-1,-1,a,n,t,u,c,0),E("z","y","x",1,-1,a,n,-t,u,c,1),E("x","z","y",1,1,t,a,n,o,u,2),E("x","z","y",1,-1,t,a,-n,o,u,3),E("x","y","z",1,-1,t,n,a,o,c,4),E("x","y","z",-1,-1,t,n,-a,o,c,5),this.setIndex(m),this.setAttribute("position",new De(d,3)),this.setAttribute("normal",new De(g,3)),this.setAttribute("uv",new De(_,2));function E(w,M,S,L,N,A,D,U,P,b,O){const F=A/P,Y=D/b,V=A/2,tt=D/2,k=U/2,j=P+1,B=b+1;let W=0,ct=0;const rt=new G;for(let ht=0;ht<B;ht++){const I=ht*Y-tt;for(let $=0;$<j;$++){const gt=$*F-V;rt[w]=gt*L,rt[M]=I*N,rt[S]=k,d.push(rt.x,rt.y,rt.z),rt[w]=0,rt[M]=0,rt[S]=U>0?1:-1,g.push(rt.x,rt.y,rt.z),_.push($/P),_.push(1-ht/b),W+=1}}for(let ht=0;ht<b;ht++)for(let I=0;I<P;I++){const $=v+I+j*ht,gt=v+I+j*(ht+1),Et=v+(I+1)+j*(ht+1),Lt=v+(I+1)+j*ht;m.push($,gt,Lt),m.push(gt,Et,Lt),ct+=6}h.addGroup(x,ct,O),x+=ct,v+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class vl extends Tn{constructor(t=1,n=1,a=1,o=32,c=1,u=!1,h=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:o,heightSegments:c,openEnded:u,thetaStart:h,thetaLength:m};const d=this;o=Math.floor(o),c=Math.floor(c);const g=[],_=[],v=[],x=[];let E=0;const w=[],M=a/2;let S=0;L(),u===!1&&(t>0&&N(!0),n>0&&N(!1)),this.setIndex(g),this.setAttribute("position",new De(_,3)),this.setAttribute("normal",new De(v,3)),this.setAttribute("uv",new De(x,2));function L(){const A=new G,D=new G;let U=0;const P=(n-t)/a;for(let b=0;b<=c;b++){const O=[],F=b/c,Y=F*(n-t)+t;for(let V=0;V<=o;V++){const tt=V/o,k=tt*m+h,j=Math.sin(k),B=Math.cos(k);D.x=Y*j,D.y=-F*a+M,D.z=Y*B,_.push(D.x,D.y,D.z),A.set(j,P,B).normalize(),v.push(A.x,A.y,A.z),x.push(tt,1-F),O.push(E++)}w.push(O)}for(let b=0;b<o;b++)for(let O=0;O<c;O++){const F=w[O][b],Y=w[O+1][b],V=w[O+1][b+1],tt=w[O][b+1];(t>0||O!==0)&&(g.push(F,Y,tt),U+=3),(n>0||O!==c-1)&&(g.push(Y,V,tt),U+=3)}d.addGroup(S,U,0),S+=U}function N(A){const D=E,U=new Xt,P=new G;let b=0;const O=A===!0?t:n,F=A===!0?1:-1;for(let V=1;V<=o;V++)_.push(0,M*F,0),v.push(0,F,0),x.push(.5,.5),E++;const Y=E;for(let V=0;V<=o;V++){const k=V/o*m+h,j=Math.cos(k),B=Math.sin(k);P.x=O*B,P.y=M*F,P.z=O*j,_.push(P.x,P.y,P.z),v.push(0,F,0),U.x=j*.5+.5,U.y=B*.5*F+.5,x.push(U.x,U.y),E++}for(let V=0;V<o;V++){const tt=D+V,k=Y+V;A===!0?g.push(k,k+1,tt):g.push(k+1,k,tt),b+=3}d.addGroup(S,b,A===!0?1:2),S+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Mu extends vl{constructor(t=1,n=1,a=32,o=1,c=!1,u=0,h=Math.PI*2){super(0,t,n,a,o,c,u,h),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:o,openEnded:c,thetaStart:u,thetaLength:h}}static fromJSON(t){return new Mu(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Cp extends Tn{constructor(t=[],n=[],a=1,o=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:a,detail:o};const c=[],u=[];h(o),d(a),g(),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(c.slice(),3)),this.setAttribute("uv",new De(u,2)),o===0?this.computeVertexNormals():this.normalizeNormals();function h(L){const N=new G,A=new G,D=new G;for(let U=0;U<n.length;U+=3)x(n[U+0],N),x(n[U+1],A),x(n[U+2],D),m(N,A,D,L)}function m(L,N,A,D){const U=D+1,P=[];for(let b=0;b<=U;b++){P[b]=[];const O=L.clone().lerp(A,b/U),F=N.clone().lerp(A,b/U),Y=U-b;for(let V=0;V<=Y;V++)V===0&&b===U?P[b][V]=O:P[b][V]=O.clone().lerp(F,V/Y)}for(let b=0;b<U;b++)for(let O=0;O<2*(U-b)-1;O++){const F=Math.floor(O/2);O%2===0?(v(P[b][F+1]),v(P[b+1][F]),v(P[b][F])):(v(P[b][F+1]),v(P[b+1][F+1]),v(P[b+1][F]))}}function d(L){const N=new G;for(let A=0;A<c.length;A+=3)N.x=c[A+0],N.y=c[A+1],N.z=c[A+2],N.normalize().multiplyScalar(L),c[A+0]=N.x,c[A+1]=N.y,c[A+2]=N.z}function g(){const L=new G;for(let N=0;N<c.length;N+=3){L.x=c[N+0],L.y=c[N+1],L.z=c[N+2];const A=M(L)/2/Math.PI+.5,D=S(L)/Math.PI+.5;u.push(A,1-D)}E(),_()}function _(){for(let L=0;L<u.length;L+=6){const N=u[L+0],A=u[L+2],D=u[L+4],U=Math.max(N,A,D),P=Math.min(N,A,D);U>.9&&P<.1&&(N<.2&&(u[L+0]+=1),A<.2&&(u[L+2]+=1),D<.2&&(u[L+4]+=1))}}function v(L){c.push(L.x,L.y,L.z)}function x(L,N){const A=L*3;N.x=t[A+0],N.y=t[A+1],N.z=t[A+2]}function E(){const L=new G,N=new G,A=new G,D=new G,U=new Xt,P=new Xt,b=new Xt;for(let O=0,F=0;O<c.length;O+=9,F+=6){L.set(c[O+0],c[O+1],c[O+2]),N.set(c[O+3],c[O+4],c[O+5]),A.set(c[O+6],c[O+7],c[O+8]),U.set(u[F+0],u[F+1]),P.set(u[F+2],u[F+3]),b.set(u[F+4],u[F+5]),D.copy(L).add(N).add(A).divideScalar(3);const Y=M(D);w(U,F+0,L,Y),w(P,F+2,N,Y),w(b,F+4,A,Y)}}function w(L,N,A,D){D<0&&L.x===1&&(u[N]=L.x-1),A.x===0&&A.z===0&&(u[N]=D/2/Math.PI+.5)}function M(L){return Math.atan2(L.z,-L.x)}function S(L){return Math.atan2(-L.y,Math.sqrt(L.x*L.x+L.z*L.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cp(t.vertices,t.indices,t.radius,t.detail)}}class ta{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ne("Curve: .getPoint() not implemented.")}getPointAt(t,n){const a=this.getUtoTmapping(t);return this.getPoint(a,n)}getPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return n}getSpacedPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPointAt(a/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),c=0;n.push(0);for(let u=1;u<=t;u++)a=this.getPoint(u/t),c+=a.distanceTo(o),n.push(c),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const a=this.getLengths();let o=0;const c=a.length;let u;n?u=n:u=t*a[c-1];let h=0,m=c-1,d;for(;h<=m;)if(o=Math.floor(h+(m-h)/2),d=a[o]-u,d<0)h=o+1;else if(d>0)m=o-1;else{m=o;break}if(o=m,a[o]===u)return o/(c-1);const g=a[o],v=a[o+1]-g,x=(u-g)/v;return(o+x)/(c-1)}getTangent(t,n){let o=t-1e-4,c=t+1e-4;o<0&&(o=0),c>1&&(c=1);const u=this.getPoint(o),h=this.getPoint(c),m=n||(u.isVector2?new Xt:new G);return m.copy(h).sub(u).normalize(),m}getTangentAt(t,n){const a=this.getUtoTmapping(t);return this.getTangent(a,n)}computeFrenetFrames(t,n=!1){const a=new G,o=[],c=[],u=[],h=new G,m=new Re;for(let x=0;x<=t;x++){const E=x/t;o[x]=this.getTangentAt(E,new G)}c[0]=new G,u[0]=new G;let d=Number.MAX_VALUE;const g=Math.abs(o[0].x),_=Math.abs(o[0].y),v=Math.abs(o[0].z);g<=d&&(d=g,a.set(1,0,0)),_<=d&&(d=_,a.set(0,1,0)),v<=d&&a.set(0,0,1),h.crossVectors(o[0],a).normalize(),c[0].crossVectors(o[0],h),u[0].crossVectors(o[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),u[x]=u[x-1].clone(),h.crossVectors(o[x-1],o[x]),h.length()>Number.EPSILON){h.normalize();const E=Math.acos(me(o[x-1].dot(o[x]),-1,1));c[x].applyMatrix4(m.makeRotationAxis(h,E))}u[x].crossVectors(o[x],c[x])}if(n===!0){let x=Math.acos(me(c[0].dot(c[t]),-1,1));x/=t,o[0].dot(h.crossVectors(c[0],c[t]))>0&&(x=-x);for(let E=1;E<=t;E++)c[E].applyMatrix4(m.makeRotationAxis(o[E],x*E)),u[E].crossVectors(o[E],c[E])}return{tangents:o,normals:c,binormals:u}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Dp extends ta{constructor(t=0,n=0,a=1,o=1,c=0,u=Math.PI*2,h=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=c,this.aEndAngle=u,this.aClockwise=h,this.aRotation=m}getPoint(t,n=new Xt){const a=n,o=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const u=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=o;for(;c>o;)c-=o;c<Number.EPSILON&&(u?c=0:c=o),this.aClockwise===!0&&!u&&(c===o?c=-o:c=c-o);const h=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(h),d=this.aY+this.yRadius*Math.sin(h);if(this.aRotation!==0){const g=Math.cos(this.aRotation),_=Math.sin(this.aRotation),v=m-this.aX,x=d-this.aY;m=v*g-x*_+this.aX,d=v*_+x*g+this.aY}return a.set(m,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class DE extends Dp{constructor(t,n,a,o,c,u){super(t,n,a,a,o,c,u),this.isArcCurve=!0,this.type="ArcCurve"}}function Up(){let r=0,t=0,n=0,a=0;function o(c,u,h,m){r=c,t=h,n=-3*c+3*u-2*h-m,a=2*c-2*u+h+m}return{initCatmullRom:function(c,u,h,m,d){o(u,h,d*(h-c),d*(m-u))},initNonuniformCatmullRom:function(c,u,h,m,d,g,_){let v=(u-c)/d-(h-c)/(d+g)+(h-u)/g,x=(h-u)/g-(m-u)/(g+_)+(m-h)/_;v*=g,x*=g,o(u,h,v,x)},calc:function(c){const u=c*c,h=u*c;return r+t*c+n*u+a*h}}}const s_=new G,r_=new G,cd=new Up,ud=new Up,fd=new Up;class Mx extends ta{constructor(t=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=a,this.tension=o}getPoint(t,n=new G){const a=n,o=this.points,c=o.length,u=(c-(this.closed?0:1))*t;let h=Math.floor(u),m=u-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/c)+1)*c:m===0&&h===c-1&&(h=c-2,m=1);let d,g;this.closed||h>0?d=o[(h-1)%c]:(r_.subVectors(o[0],o[1]).add(o[0]),d=r_);const _=o[h%c],v=o[(h+1)%c];if(this.closed||h+2<c?g=o[(h+2)%c]:(s_.subVectors(o[c-1],o[c-2]).add(o[c-1]),g=s_),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let E=Math.pow(d.distanceToSquared(_),x),w=Math.pow(_.distanceToSquared(v),x),M=Math.pow(v.distanceToSquared(g),x);w<1e-4&&(w=1),E<1e-4&&(E=w),M<1e-4&&(M=w),cd.initNonuniformCatmullRom(d.x,_.x,v.x,g.x,E,w,M),ud.initNonuniformCatmullRom(d.y,_.y,v.y,g.y,E,w,M),fd.initNonuniformCatmullRom(d.z,_.z,v.z,g.z,E,w,M)}else this.curveType==="catmullrom"&&(cd.initCatmullRom(d.x,_.x,v.x,g.x,this.tension),ud.initCatmullRom(d.y,_.y,v.y,g.y,this.tension),fd.initCatmullRom(d.z,_.z,v.z,g.z,this.tension));return a.set(cd.calc(m),ud.calc(m),fd.calc(m)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new G().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function o_(r,t,n,a,o){const c=(a-t)*.5,u=(o-n)*.5,h=r*r,m=r*h;return(2*n-2*a+c+u)*m+(-3*n+3*a-2*c-u)*h+c*r+n}function UE(r,t){const n=1-r;return n*n*t}function LE(r,t){return 2*(1-r)*r*t}function NE(r,t){return r*r*t}function ol(r,t,n,a){return UE(r,t)+LE(r,n)+NE(r,a)}function OE(r,t){const n=1-r;return n*n*n*t}function PE(r,t){const n=1-r;return 3*n*n*r*t}function IE(r,t){return 3*(1-r)*r*r*t}function zE(r,t){return r*r*r*t}function ll(r,t,n,a,o){return OE(r,t)+PE(r,n)+IE(r,a)+zE(r,o)}class Ex extends ta{constructor(t=new Xt,n=new Xt,a=new Xt,o=new Xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new Xt){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(ll(t,o.x,c.x,u.x,h.x),ll(t,o.y,c.y,u.y,h.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class BE extends ta{constructor(t=new G,n=new G,a=new G,o=new G){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new G){const a=n,o=this.v0,c=this.v1,u=this.v2,h=this.v3;return a.set(ll(t,o.x,c.x,u.x,h.x),ll(t,o.y,c.y,u.y,h.y),ll(t,o.z,c.z,u.z,h.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class bx extends ta{constructor(t=new Xt,n=new Xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Xt){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Xt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class FE extends ta{constructor(t=new G,n=new G){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new G){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new G){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Tx extends ta{constructor(t=new Xt,n=new Xt,a=new Xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new Xt){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(ol(t,o.x,c.x,u.x),ol(t,o.y,c.y,u.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class HE extends ta{constructor(t=new G,n=new G,a=new G){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new G){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(ol(t,o.x,c.x,u.x),ol(t,o.y,c.y,u.y),ol(t,o.z,c.z,u.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ax extends ta{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Xt){const a=n,o=this.points,c=(o.length-1)*t,u=Math.floor(c),h=c-u,m=o[u===0?u:u-1],d=o[u],g=o[u>o.length-2?o.length-1:u+1],_=o[u>o.length-3?o.length-1:u+2];return a.set(o_(h,m.x,d.x,g.x,_.x),o_(h,m.y,d.y,g.y,_.y)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new Xt().fromArray(o))}return this}}var l_=Object.freeze({__proto__:null,ArcCurve:DE,CatmullRomCurve3:Mx,CubicBezierCurve:Ex,CubicBezierCurve3:BE,EllipseCurve:Dp,LineCurve:bx,LineCurve3:FE,QuadraticBezierCurve:Tx,QuadraticBezierCurve3:HE,SplineCurve:Ax});class GE extends ta{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const a=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new l_[a](n,t))}return this}getPoint(t,n){const a=t*this.getLength(),o=this.getCurveLengths();let c=0;for(;c<o.length;){if(o[c]>=a){const u=o[c]-a,h=this.curves[c],m=h.getLength(),d=m===0?0:1-u/m;return h.getPointAt(d,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let a;for(let o=0,c=this.curves;o<c.length;o++){const u=c[o],h=u.isEllipseCurve?t*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?t*u.points.length:t,m=u.getPoints(h);for(let d=0;d<m.length;d++){const g=m[d];a&&a.equals(g)||(n.push(g),a=g)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(new l_[o.type]().fromJSON(o))}return this}}class c_ extends GE{constructor(t){super(),this.type="Path",this.currentPoint=new Xt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,a=t.length;n<a;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const a=new bx(this.currentPoint.clone(),new Xt(t,n));return this.curves.push(a),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,a,o){const c=new Tx(this.currentPoint.clone(),new Xt(t,n),new Xt(a,o));return this.curves.push(c),this.currentPoint.set(a,o),this}bezierCurveTo(t,n,a,o,c,u){const h=new Ex(this.currentPoint.clone(),new Xt(t,n),new Xt(a,o),new Xt(c,u));return this.curves.push(h),this.currentPoint.set(c,u),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),a=new Ax(n);return this.curves.push(a),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,a,o,c,u){const h=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(t+h,n+m,a,o,c,u),this}absarc(t,n,a,o,c,u){return this.absellipse(t,n,a,a,o,c,u),this}ellipse(t,n,a,o,c,u,h,m){const d=this.currentPoint.x,g=this.currentPoint.y;return this.absellipse(t+d,n+g,a,o,c,u,h,m),this}absellipse(t,n,a,o,c,u,h,m){const d=new Dp(t,n,a,o,c,u,h,m);if(this.curves.length>0){const _=d.getPoint(0);_.equals(this.currentPoint)||this.lineTo(_.x,_.y)}this.curves.push(d);const g=d.getPoint(1);return this.currentPoint.copy(g),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Rx extends c_{constructor(t){super(t),this.uuid=ks(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(new c_().fromJSON(o))}return this}}function VE(r,t,n=2){const a=t&&t.length,o=a?t[0]*n:r.length;let c=wx(r,0,o,n,!0);const u=[];if(!c||c.next===c.prev)return u;let h,m,d;if(a&&(c=YE(r,t,c,n)),r.length>80*n){h=r[0],m=r[1];let g=h,_=m;for(let v=n;v<o;v+=n){const x=r[v],E=r[v+1];x<h&&(h=x),E<m&&(m=E),x>g&&(g=x),E>_&&(_=E)}d=Math.max(g-h,_-m),d=d!==0?32767/d:0}return _l(c,u,n,h,m,d,0),u}function wx(r,t,n,a,o){let c;if(o===a1(r,t,n,a)>0)for(let u=t;u<n;u+=a)c=u_(u/a|0,r[u],r[u+1],c);else for(let u=n-a;u>=t;u-=a)c=u_(u/a|0,r[u],r[u+1],c);return c&&Yr(c,c.next)&&(Sl(c),c=c.next),c}function Gs(r,t){if(!r)return r;t||(t=r);let n=r,a;do if(a=!1,!n.steiner&&(Yr(n,n.next)||nn(n.prev,n,n.next)===0)){if(Sl(n),n=t=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==t);return t}function _l(r,t,n,a,o,c,u){if(!r)return;!u&&c&&jE(r,a,o,c);let h=r;for(;r.prev!==r.next;){const m=r.prev,d=r.next;if(c?XE(r,a,o,c):kE(r)){t.push(m.i,r.i,d.i),Sl(r),r=d.next,h=d.next;continue}if(r=d,r===h){u?u===1?(r=WE(Gs(r),t),_l(r,t,n,a,o,c,2)):u===2&&qE(r,t,n,a,o,c):_l(Gs(r),t,n,a,o,c,1);break}}}function kE(r){const t=r.prev,n=r,a=r.next;if(nn(t,n,a)>=0)return!1;const o=t.x,c=n.x,u=a.x,h=t.y,m=n.y,d=a.y,g=Math.min(o,c,u),_=Math.min(h,m,d),v=Math.max(o,c,u),x=Math.max(h,m,d);let E=a.next;for(;E!==t;){if(E.x>=g&&E.x<=v&&E.y>=_&&E.y<=x&&nl(o,h,c,m,u,d,E.x,E.y)&&nn(E.prev,E,E.next)>=0)return!1;E=E.next}return!0}function XE(r,t,n,a){const o=r.prev,c=r,u=r.next;if(nn(o,c,u)>=0)return!1;const h=o.x,m=c.x,d=u.x,g=o.y,_=c.y,v=u.y,x=Math.min(h,m,d),E=Math.min(g,_,v),w=Math.max(h,m,d),M=Math.max(g,_,v),S=sp(x,E,t,n,a),L=sp(w,M,t,n,a);let N=r.prevZ,A=r.nextZ;for(;N&&N.z>=S&&A&&A.z<=L;){if(N.x>=x&&N.x<=w&&N.y>=E&&N.y<=M&&N!==o&&N!==u&&nl(h,g,m,_,d,v,N.x,N.y)&&nn(N.prev,N,N.next)>=0||(N=N.prevZ,A.x>=x&&A.x<=w&&A.y>=E&&A.y<=M&&A!==o&&A!==u&&nl(h,g,m,_,d,v,A.x,A.y)&&nn(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;N&&N.z>=S;){if(N.x>=x&&N.x<=w&&N.y>=E&&N.y<=M&&N!==o&&N!==u&&nl(h,g,m,_,d,v,N.x,N.y)&&nn(N.prev,N,N.next)>=0)return!1;N=N.prevZ}for(;A&&A.z<=L;){if(A.x>=x&&A.x<=w&&A.y>=E&&A.y<=M&&A!==o&&A!==u&&nl(h,g,m,_,d,v,A.x,A.y)&&nn(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function WE(r,t){let n=r;do{const a=n.prev,o=n.next.next;!Yr(a,o)&&Dx(a,n,n.next,o)&&xl(a,o)&&xl(o,a)&&(t.push(a.i,n.i,o.i),Sl(n),Sl(n.next),n=r=o),n=n.next}while(n!==r);return Gs(n)}function qE(r,t,n,a,o,c){let u=r;do{let h=u.next.next;for(;h!==u.prev;){if(u.i!==h.i&&e1(u,h)){let m=Ux(u,h);u=Gs(u,u.next),m=Gs(m,m.next),_l(u,t,n,a,o,c,0),_l(m,t,n,a,o,c,0);return}h=h.next}u=u.next}while(u!==r)}function YE(r,t,n,a){const o=[];for(let c=0,u=t.length;c<u;c++){const h=t[c]*a,m=c<u-1?t[c+1]*a:r.length,d=wx(r,h,m,a,!1);d===d.next&&(d.steiner=!0),o.push(t1(d))}o.sort(ZE);for(let c=0;c<o.length;c++)n=KE(o[c],n);return n}function ZE(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const a=(r.next.y-r.y)/(r.next.x-r.x),o=(t.next.y-t.y)/(t.next.x-t.x);n=a-o}return n}function KE(r,t){const n=JE(r,t);if(!n)return t;const a=Ux(n,r);return Gs(a,a.next),Gs(n,n.next)}function JE(r,t){let n=t;const a=r.x,o=r.y;let c=-1/0,u;if(Yr(r,n))return n;do{if(Yr(r,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const _=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(_<=a&&_>c&&(c=_,u=n.x<n.next.x?n:n.next,_===a))return u}n=n.next}while(n!==t);if(!u)return null;const h=u,m=u.x,d=u.y;let g=1/0;n=u;do{if(a>=n.x&&n.x>=m&&a!==n.x&&Cx(o<d?a:c,o,m,d,o<d?c:a,o,n.x,n.y)){const _=Math.abs(o-n.y)/(a-n.x);xl(n,r)&&(_<g||_===g&&(n.x>u.x||n.x===u.x&&QE(u,n)))&&(u=n,g=_)}n=n.next}while(n!==h);return u}function QE(r,t){return nn(r.prev,r,t.prev)<0&&nn(t.next,r,r.next)<0}function jE(r,t,n,a){let o=r;do o.z===0&&(o.z=sp(o.x,o.y,t,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==r);o.prevZ.nextZ=null,o.prevZ=null,$E(o)}function $E(r){let t,n=1;do{let a=r,o;r=null;let c=null;for(t=0;a;){t++;let u=a,h=0;for(let d=0;d<n&&(h++,u=u.nextZ,!!u);d++);let m=n;for(;h>0||m>0&&u;)h!==0&&(m===0||!u||a.z<=u.z)?(o=a,a=a.nextZ,h--):(o=u,u=u.nextZ,m--),c?c.nextZ=o:r=o,o.prevZ=c,c=o;a=u}c.nextZ=null,n*=2}while(t>1);return r}function sp(r,t,n,a,o){return r=(r-n)*o|0,t=(t-a)*o|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function t1(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function Cx(r,t,n,a,o,c,u,h){return(o-u)*(t-h)>=(r-u)*(c-h)&&(r-u)*(a-h)>=(n-u)*(t-h)&&(n-u)*(c-h)>=(o-u)*(a-h)}function nl(r,t,n,a,o,c,u,h){return!(r===u&&t===h)&&Cx(r,t,n,a,o,c,u,h)}function e1(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!n1(r,t)&&(xl(r,t)&&xl(t,r)&&i1(r,t)&&(nn(r.prev,r,t.prev)||nn(r,t.prev,t))||Yr(r,t)&&nn(r.prev,r,r.next)>0&&nn(t.prev,t,t.next)>0)}function nn(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function Yr(r,t){return r.x===t.x&&r.y===t.y}function Dx(r,t,n,a){const o=eu(nn(r,t,n)),c=eu(nn(r,t,a)),u=eu(nn(n,a,r)),h=eu(nn(n,a,t));return!!(o!==c&&u!==h||o===0&&tu(r,n,t)||c===0&&tu(r,a,t)||u===0&&tu(n,r,a)||h===0&&tu(n,t,a))}function tu(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function eu(r){return r>0?1:r<0?-1:0}function n1(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&Dx(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function xl(r,t){return nn(r.prev,r,r.next)<0?nn(r,t,r.next)>=0&&nn(r,r.prev,t)>=0:nn(r,t,r.prev)<0||nn(r,r.next,t)<0}function i1(r,t){let n=r,a=!1;const o=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&o<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==r);return a}function Ux(r,t){const n=rp(r.i,r.x,r.y),a=rp(t.i,t.x,t.y),o=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=o,o.prev=n,a.next=n,n.prev=a,c.next=a,a.prev=c,a}function u_(r,t,n,a){const o=rp(r,t,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function Sl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function rp(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function a1(r,t,n,a){let o=0;for(let c=t,u=n-a;c<n;c+=a)o+=(r[u]-r[c])*(r[c+1]+r[u+1]),u=c;return o}class s1{static triangulate(t,n,a=2){return VE(t,n,a)}}class cl{static area(t){const n=t.length;let a=0;for(let o=n-1,c=0;c<n;o=c++)a+=t[o].x*t[c].y-t[c].x*t[o].y;return a*.5}static isClockWise(t){return cl.area(t)<0}static triangulateShape(t,n){const a=[],o=[],c=[];f_(t),h_(a,t);let u=t.length;n.forEach(f_);for(let m=0;m<n.length;m++)o.push(u),u+=n[m].length,h_(a,n[m]);const h=s1.triangulate(a,o);for(let m=0;m<h.length;m+=3)c.push(h.slice(m,m+3));return c}}function f_(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function h_(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class Lp extends Cp{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,o=[-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(o,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new Lp(t.radius,t.detail)}}class zs extends Tn{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const c=t/2,u=n/2,h=Math.floor(a),m=Math.floor(o),d=h+1,g=m+1,_=t/h,v=n/m,x=[],E=[],w=[],M=[];for(let S=0;S<g;S++){const L=S*v-u;for(let N=0;N<d;N++){const A=N*_-c;E.push(A,-L,0),w.push(0,0,1),M.push(N/h),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let L=0;L<h;L++){const N=L+d*S,A=L+d*(S+1),D=L+1+d*(S+1),U=L+1+d*S;x.push(N,A,U),x.push(A,D,U)}this.setIndex(x),this.setAttribute("position",new De(E,3)),this.setAttribute("normal",new De(w,3)),this.setAttribute("uv",new De(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Np extends Tn{constructor(t=new Rx([new Xt(0,.5),new Xt(-.5,-.5),new Xt(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};const a=[],o=[],c=[],u=[];let h=0,m=0;if(Array.isArray(t)===!1)d(t);else for(let g=0;g<t.length;g++)d(t[g]),this.addGroup(h,m,g),h+=m,m=0;this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(u,2));function d(g){const _=o.length/3,v=g.extractPoints(n);let x=v.shape;const E=v.holes;cl.isClockWise(x)===!1&&(x=x.reverse());for(let M=0,S=E.length;M<S;M++){const L=E[M];cl.isClockWise(L)===!0&&(E[M]=L.reverse())}const w=cl.triangulateShape(x,E);for(let M=0,S=E.length;M<S;M++){const L=E[M];x=x.concat(L)}for(let M=0,S=x.length;M<S;M++){const L=x[M];o.push(L.x,L.y,0),c.push(0,0,1),u.push(L.x,L.y)}for(let M=0,S=w.length;M<S;M++){const L=w[M],N=L[0]+_,A=L[1]+_,D=L[2]+_;a.push(N,A,D),m+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes;return r1(n,t)}static fromJSON(t,n){const a=[];for(let o=0,c=t.shapes.length;o<c;o++){const u=n[t.shapes[o]];a.push(u)}return new Np(a,t.curveSegments)}}function r1(r,t){if(t.shapes=[],Array.isArray(r))for(let n=0,a=r.length;n<a;n++){const o=r[n];t.shapes.push(o.uuid)}else t.shapes.push(r.uuid);return t}class ls extends Tn{constructor(t=1,n=32,a=16,o=0,c=Math.PI*2,u=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:o,phiLength:c,thetaStart:u,thetaLength:h},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const m=Math.min(u+h,Math.PI);let d=0;const g=[],_=new G,v=new G,x=[],E=[],w=[],M=[];for(let S=0;S<=a;S++){const L=[],N=S/a,A=u+N*h,D=t*Math.cos(A),U=Math.sqrt(t*t-D*D);let P=0;S===0&&u===0?P=.5/n:S===a&&m===Math.PI&&(P=-.5/n);for(let b=0;b<=n;b++){const O=b/n,F=o+O*c;_.x=-U*Math.cos(F),_.y=D,_.z=U*Math.sin(F),E.push(_.x,_.y,_.z),v.copy(_).normalize(),w.push(v.x,v.y,v.z),M.push(O+P,1-N),L.push(d++)}g.push(L)}for(let S=0;S<a;S++)for(let L=0;L<n;L++){const N=g[S][L+1],A=g[S][L],D=g[S+1][L],U=g[S+1][L+1];(S!==0||u>0)&&x.push(N,A,U),(S!==a-1||m<Math.PI)&&x.push(A,D,U)}this.setIndex(x),this.setAttribute("position",new De(E,3)),this.setAttribute("normal",new De(w,3)),this.setAttribute("uv",new De(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Zr(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const o=r[n][a];if(d_(o))o.isRenderTargetTexture?(ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone();else if(Array.isArray(o))if(d_(o[0])){const c=[];for(let u=0,h=o.length;u<h;u++)c[u]=o[u].clone();t[n][a]=c}else t[n][a]=o.slice();else t[n][a]=o}}return t}function Xn(r){const t={};for(let n=0;n<r.length;n++){const a=Zr(r[n]);for(const o in a)t[o]=a[o]}return t}function d_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function o1(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function Lx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ee.workingColorSpace}const Nx={clone:Zr,merge:Xn};var l1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,c1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends Jr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=l1,this.fragmentShader=c1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zr(t.uniforms),this.uniformsGroups=o1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(t).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const o=t.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new ee().setHex(o.value);break;case"v2":this.uniforms[a].value=new Xt().fromArray(o.value);break;case"v3":this.uniforms[a].value=new G().fromArray(o.value);break;case"v4":this.uniforms[a].value=new $e().fromArray(o.value);break;case"m3":this.uniforms[a].value=new re().fromArray(o.value);break;case"m4":this.uniforms[a].value=new Re().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class u1 extends ei{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ji extends Jr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ip,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new us,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class p_ extends Ji{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Xt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class f1 extends Jr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class h1 extends Jr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Op extends Mn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class d1 extends Op{constructor(t,n,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const hd=new Re,m_=new G,g_=new G;class p1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.mapType=di,this.map=null,this.mapPass=null,this.matrix=new Re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wp,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera;m_.setFromMatrixPosition(t.matrixWorld),n.position.copy(m_),g_.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(g_),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,a,o){hd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix(hd,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,u=o?o.z/c.x:1,h=o?o.w/c.y:1,m=o?o.x/c.x:0,d=o?o.y/c.y:0;t.coordinateSystem===dl||t.reversedDepth?n.set(.5*u,0,0,.5*u+m,0,.5*h,0,.5*h+d,0,0,1,0,0,0,0,1):n.set(.5*u,0,0,.5*u+m,0,.5*h,0,.5*h+d,0,0,.5,.5,0,0,0,1),n.multiply(hd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const nu=new G,iu=new Xs,Yi=new G;class Ox extends Mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Re,this.projectionMatrix=new Re,this.projectionMatrixInverse=new Re,this.coordinateSystem=Qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(nu,iu,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nu,iu,Yi.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(nu,iu,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nu,iu,Yi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const os=new G,v_=new Xt,__=new Xt;class Ti extends Ox{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=pl*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(sl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return pl*2*Math.atan(Math.tan(sl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(os.x,os.y).multiplyScalar(-t/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(os.x,os.y).multiplyScalar(-t/os.z)}getViewSize(t,n){return this.getViewBounds(t,v_,__),n.subVectors(__,v_)}setViewOffset(t,n,a,o,c,u){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(sl*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,d=u.fullHeight;c+=u.offsetX*o/m,n-=u.offsetY*a/d,o*=u.width/m,a*=u.height/d}const h=this.filmOffset;h!==0&&(c+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Pp extends Ox{constructor(t=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-t,u=a+t,h=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,u=c+d*this.view.width,h-=g*this.view.offsetY,m=h-g*this.view.height}this.projectionMatrix.makeOrthographic(c,u,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class m1 extends p1{constructor(){super(new Pp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class x_ extends Op{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.shadow=new m1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const Pr=-90,Ir=1;class g1 extends Mn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Ti(Pr,Ir,t,n);o.layers=this.layers,this.add(o);const c=new Ti(Pr,Ir,t,n);c.layers=this.layers,this.add(c);const u=new Ti(Pr,Ir,t,n);u.layers=this.layers,this.add(u);const h=new Ti(Pr,Ir,t,n);h.layers=this.layers,this.add(h);const m=new Ti(Pr,Ir,t,n);m.layers=this.layers,this.add(m);const d=new Ti(Pr,Ir,t,n);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,h,m]=n;for(const d of n)this.remove(d);if(t===Qi)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===dl)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of n)this.add(d),d.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,u,h,m,d,g]=this.children,_=t.getRenderTarget(),v=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const w=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(a,0,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,1,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(a,2,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(a,3,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,m),t.setRenderTarget(a,4,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),a.texture.generateMipmaps=w,t.setRenderTarget(a,5,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,g),t.setRenderTarget(_,v,x),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class v1 extends Ti{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const S_=new Re;class _1{constructor(t,n,a=0,o=1/0){this.ray=new Rp(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new Tp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Ae("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return S_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(S_),this}intersectObject(t,n=!0,a=[]){return op(t,this,a,n),a.sort(y_),a}intersectObjects(t,n=!0,a=[]){for(let o=0,c=t.length;o<c;o++)op(t[o],this,a,n);return a.sort(y_),a}}function y_(r,t){return r.distance-t.distance}function op(r,t,n,a){let o=!0;if(r.layers.test(t.layers)&&r.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,h=c.length;u<h;u++)op(c[u],t,n,!0)}}const kp=class kp{constructor(t,n,a,o){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,o){const c=this.elements;return c[0]=t,c[2]=n,c[1]=a,c[3]=o,this}};kp.prototype.isMatrix2=!0;let M_=kp;function E_(r,t,n,a){const o=x1(a);switch(n){case ux:return r*t;case vp:return r*t/o.components*o.byteLength;case _p:return r*t/o.components*o.byteLength;case Hs:return r*t*2/o.components*o.byteLength;case xp:return r*t*2/o.components*o.byteLength;case fx:return r*t*3/o.components*o.byteLength;case zi:return r*t*4/o.components*o.byteLength;case Sp:return r*t*4/o.components*o.byteLength;case cu:case uu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case fu:case hu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case wd:case Dd:return Math.max(r,16)*Math.max(t,8)/4;case Rd:case Cd:return Math.max(r,8)*Math.max(t,8)/2;case Ud:case Ld:case Od:case Pd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Nd:case vu:case Id:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case zd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Bd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Fd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Gd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Vd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case kd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Xd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Wd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case qd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Yd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Zd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Kd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Jd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Qd:case jd:case $d:return Math.ceil(r/4)*Math.ceil(t/4)*16;case tp:case ep:return Math.ceil(r/4)*Math.ceil(t/4)*8;case _u:case np:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function x1(r){switch(r){case di:case rx:return{byteLength:1,components:1};case fl:case ox:case Hi:return{byteLength:2,components:1};case mp:case gp:return{byteLength:2,components:4};case $i:case pp:case Ii:return{byteLength:4,components:1};case lx:case cx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hp}}));typeof window<"u"&&(window.__THREE__?ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Px(){let r=null,t=!1,n=null,a=null;function o(c,u){a=r.requestAnimationFrame(o),n(c,u)}return{start:function(){t!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function S1(r){const t=new WeakMap;function n(h,m){const d=h.array,g=h.usage,_=d.byteLength,v=r.createBuffer();r.bindBuffer(m,v),r.bufferData(m,d,g),h.onUploadCallback();let x;if(d instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)x=r.HALF_FLOAT;else if(d instanceof Uint16Array)h.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=r.SHORT;else if(d instanceof Uint32Array)x=r.UNSIGNED_INT;else if(d instanceof Int32Array)x=r.INT;else if(d instanceof Int8Array)x=r.BYTE;else if(d instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:v,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:h.version,size:_}}function a(h,m,d){const g=m.array,_=m.updateRanges;if(r.bindBuffer(d,h),_.length===0)r.bufferSubData(d,0,g);else{_.sort((x,E)=>x.start-E.start);let v=0;for(let x=1;x<_.length;x++){const E=_[v],w=_[x];w.start<=E.start+E.count+1?E.count=Math.max(E.count,w.start+w.count-E.start):(++v,_[v]=w)}_.length=v+1;for(let x=0,E=_.length;x<E;x++){const w=_[x];r.bufferSubData(d,w.start*g.BYTES_PER_ELEMENT,g,w.start,w.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=t.get(h);m&&(r.deleteBuffer(m.buffer),t.delete(h))}function u(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=t.get(h);(!g||g.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const d=t.get(h);if(d===void 0)t.set(h,n(h,m));else if(d.version<h.version){if(d.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(d.buffer,h,m),d.version=h.version}}return{get:o,remove:c,update:u}}var y1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,M1=`#ifdef USE_ALPHAHASH
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
#endif`,E1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,b1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,T1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,A1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,R1=`#ifdef USE_AOMAP
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
#endif`,w1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,C1=`#ifdef USE_BATCHING
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
#endif`,D1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,U1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,L1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,N1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,O1=`#ifdef USE_IRIDESCENCE
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
#endif`,P1=`#ifdef USE_BUMPMAP
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
#endif`,I1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,z1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,B1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,F1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,H1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,G1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,V1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,k1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,X1=`#define PI 3.141592653589793
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
} // validated`,W1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,q1=`vec3 transformedNormal = objectNormal;
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
#endif`,Y1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Z1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,K1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,J1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Q1="gl_FragColor = linearToOutputTexel( gl_FragColor );",j1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$1=`#ifdef USE_ENVMAP
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
#endif`,tb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,eb=`#ifdef USE_ENVMAP
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
#endif`,nb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ib=`#ifdef USE_ENVMAP
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
#endif`,ab=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ob=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lb=`#ifdef USE_GRADIENTMAP
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
}`,cb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ub=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,db=`#ifdef USE_ENVMAP
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
#endif`,pb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_b=`PhysicalMaterial material;
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
#endif`,xb=`uniform sampler2D dfgLUT;
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
}`,Sb=`
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
#endif`,yb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Eb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,bb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ab=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Db=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ub=`#if defined( USE_POINTS_UV )
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
#endif`,Lb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ob=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ib=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zb=`#ifdef USE_MORPHTARGETS
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
#endif`,Bb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Hb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Xb=`#ifdef USE_NORMALMAP
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
#endif`,Wb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$b=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,aT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rT=`float getShadowMask() {
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
}`,oT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lT=`#ifdef USE_SKINNING
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
#endif`,cT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uT=`#ifdef USE_SKINNING
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
#endif`,fT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mT=`#ifdef USE_TRANSMISSION
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
#endif`,gT=`#ifdef USE_TRANSMISSION
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
#endif`,vT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_T=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ST=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,MT=`uniform sampler2D t2D;
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
}`,ET=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,AT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RT=`#include <common>
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
}`,wT=`#if DEPTH_PACKING == 3200
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
}`,CT=`#define DISTANCE
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
}`,DT=`#define DISTANCE
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
}`,UT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,LT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NT=`uniform float scale;
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
}`,OT=`uniform vec3 diffuse;
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
}`,PT=`#include <common>
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
}`,IT=`uniform vec3 diffuse;
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
}`,zT=`#define LAMBERT
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
}`,BT=`#define LAMBERT
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
}`,FT=`#define MATCAP
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
}`,HT=`#define MATCAP
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
}`,GT=`#define NORMAL
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
}`,VT=`#define NORMAL
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
}`,kT=`#define PHONG
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
}`,XT=`#define PHONG
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
}`,WT=`#define STANDARD
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
}`,qT=`#define STANDARD
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
}`,YT=`#define TOON
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
}`,ZT=`#define TOON
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
}`,KT=`uniform float size;
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
}`,JT=`uniform vec3 diffuse;
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
}`,QT=`#include <common>
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
}`,jT=`uniform vec3 color;
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
}`,$T=`uniform float rotation;
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
}`,tA=`uniform vec3 diffuse;
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
}`,de={alphahash_fragment:y1,alphahash_pars_fragment:M1,alphamap_fragment:E1,alphamap_pars_fragment:b1,alphatest_fragment:T1,alphatest_pars_fragment:A1,aomap_fragment:R1,aomap_pars_fragment:w1,batching_pars_vertex:C1,batching_vertex:D1,begin_vertex:U1,beginnormal_vertex:L1,bsdfs:N1,iridescence_fragment:O1,bumpmap_pars_fragment:P1,clipping_planes_fragment:I1,clipping_planes_pars_fragment:z1,clipping_planes_pars_vertex:B1,clipping_planes_vertex:F1,color_fragment:H1,color_pars_fragment:G1,color_pars_vertex:V1,color_vertex:k1,common:X1,cube_uv_reflection_fragment:W1,defaultnormal_vertex:q1,displacementmap_pars_vertex:Y1,displacementmap_vertex:Z1,emissivemap_fragment:K1,emissivemap_pars_fragment:J1,colorspace_fragment:Q1,colorspace_pars_fragment:j1,envmap_fragment:$1,envmap_common_pars_fragment:tb,envmap_pars_fragment:eb,envmap_pars_vertex:nb,envmap_physical_pars_fragment:db,envmap_vertex:ib,fog_vertex:ab,fog_pars_vertex:sb,fog_fragment:rb,fog_pars_fragment:ob,gradientmap_pars_fragment:lb,lightmap_pars_fragment:cb,lights_lambert_fragment:ub,lights_lambert_pars_fragment:fb,lights_pars_begin:hb,lights_toon_fragment:pb,lights_toon_pars_fragment:mb,lights_phong_fragment:gb,lights_phong_pars_fragment:vb,lights_physical_fragment:_b,lights_physical_pars_fragment:xb,lights_fragment_begin:Sb,lights_fragment_maps:yb,lights_fragment_end:Mb,lightprobes_pars_fragment:Eb,logdepthbuf_fragment:bb,logdepthbuf_pars_fragment:Tb,logdepthbuf_pars_vertex:Ab,logdepthbuf_vertex:Rb,map_fragment:wb,map_pars_fragment:Cb,map_particle_fragment:Db,map_particle_pars_fragment:Ub,metalnessmap_fragment:Lb,metalnessmap_pars_fragment:Nb,morphinstance_vertex:Ob,morphcolor_vertex:Pb,morphnormal_vertex:Ib,morphtarget_pars_vertex:zb,morphtarget_vertex:Bb,normal_fragment_begin:Fb,normal_fragment_maps:Hb,normal_pars_fragment:Gb,normal_pars_vertex:Vb,normal_vertex:kb,normalmap_pars_fragment:Xb,clearcoat_normal_fragment_begin:Wb,clearcoat_normal_fragment_maps:qb,clearcoat_pars_fragment:Yb,iridescence_pars_fragment:Zb,opaque_fragment:Kb,packing:Jb,premultiplied_alpha_fragment:Qb,project_vertex:jb,dithering_fragment:$b,dithering_pars_fragment:tT,roughnessmap_fragment:eT,roughnessmap_pars_fragment:nT,shadowmap_pars_fragment:iT,shadowmap_pars_vertex:aT,shadowmap_vertex:sT,shadowmask_pars_fragment:rT,skinbase_vertex:oT,skinning_pars_vertex:lT,skinning_vertex:cT,skinnormal_vertex:uT,specularmap_fragment:fT,specularmap_pars_fragment:hT,tonemapping_fragment:dT,tonemapping_pars_fragment:pT,transmission_fragment:mT,transmission_pars_fragment:gT,uv_pars_fragment:vT,uv_pars_vertex:_T,uv_vertex:xT,worldpos_vertex:ST,background_vert:yT,background_frag:MT,backgroundCube_vert:ET,backgroundCube_frag:bT,cube_vert:TT,cube_frag:AT,depth_vert:RT,depth_frag:wT,distance_vert:CT,distance_frag:DT,equirect_vert:UT,equirect_frag:LT,linedashed_vert:NT,linedashed_frag:OT,meshbasic_vert:PT,meshbasic_frag:IT,meshlambert_vert:zT,meshlambert_frag:BT,meshmatcap_vert:FT,meshmatcap_frag:HT,meshnormal_vert:GT,meshnormal_frag:VT,meshphong_vert:kT,meshphong_frag:XT,meshphysical_vert:WT,meshphysical_frag:qT,meshtoon_vert:YT,meshtoon_frag:ZT,points_vert:KT,points_frag:JT,shadow_vert:QT,shadow_frag:jT,sprite_vert:$T,sprite_frag:tA},Pt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},Ki={basic:{uniforms:Xn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:Xn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:Xn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:Xn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:Xn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:Xn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:Xn([Pt.points,Pt.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:Xn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:Xn([Pt.common,Pt.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:Xn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:Xn([Pt.sprite,Pt.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distance:{uniforms:Xn([Pt.common,Pt.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distance_vert,fragmentShader:de.distance_frag},shadow:{uniforms:Xn([Pt.lights,Pt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};Ki.physical={uniforms:Xn([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const au={r:0,b:0,g:0},eA=new Re,Ix=new re;Ix.set(-1,0,0,0,1,0,0,0,1);function nA(r,t,n,a,o,c){const u=new ee(0);let h=o===!0?0:1,m,d,g=null,_=0,v=null;function x(L){let N=L.isScene===!0?L.background:null;if(N&&N.isTexture){const A=L.backgroundBlurriness>0;N=t.get(N,A)}return N}function E(L){let N=!1;const A=x(L);A===null?M(u,h):A&&A.isColor&&(M(A,1),N=!0);const D=r.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,c):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||N)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function w(L,N){const A=x(N);A&&(A.isCubeTexture||A.mapping===Tu)?(d===void 0&&(d=new Ze(new yl(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Zr(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(D,U,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),d.material.uniforms.envMap.value=A,d.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(eA.makeRotationFromEuler(N.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Ix),d.material.toneMapped=Ee.getTransfer(A.colorSpace)!==Be,(g!==A||_!==A.version||v!==r.toneMapping)&&(d.material.needsUpdate=!0,g=A,_=A.version,v=r.toneMapping),d.layers.enableAll(),L.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new Ze(new zs(2,2),new ei({name:"BackgroundMaterial",uniforms:Zr(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:Bs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,m.material.toneMapped=Ee.getTransfer(A.colorSpace)!==Be,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||_!==A.version||v!==r.toneMapping)&&(m.material.needsUpdate=!0,g=A,_=A.version,v=r.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function M(L,N){L.getRGB(au,Lx(r)),n.buffers.color.setClear(au.r,au.g,au.b,N,c)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(L,N=1){u.set(L),h=N,M(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(L){h=L,M(u,h)},render:E,addToRenderList:w,dispose:S}}function iA(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=v(null);let c=o,u=!1;function h(Y,V,tt,k,j){let B=!1;const W=_(Y,k,tt,V);c!==W&&(c=W,d(c.object)),B=x(Y,k,tt,j),B&&E(Y,k,tt,j),j!==null&&t.update(j,r.ELEMENT_ARRAY_BUFFER),(B||u)&&(u=!1,A(Y,V,tt,k),j!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function m(){return r.createVertexArray()}function d(Y){return r.bindVertexArray(Y)}function g(Y){return r.deleteVertexArray(Y)}function _(Y,V,tt,k){const j=k.wireframe===!0;let B=a[V.id];B===void 0&&(B={},a[V.id]=B);const W=Y.isInstancedMesh===!0?Y.id:0;let ct=B[W];ct===void 0&&(ct={},B[W]=ct);let rt=ct[tt.id];rt===void 0&&(rt={},ct[tt.id]=rt);let ht=rt[j];return ht===void 0&&(ht=v(m()),rt[j]=ht),ht}function v(Y){const V=[],tt=[],k=[];for(let j=0;j<n;j++)V[j]=0,tt[j]=0,k[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:tt,attributeDivisors:k,object:Y,attributes:{},index:null}}function x(Y,V,tt,k){const j=c.attributes,B=V.attributes;let W=0;const ct=tt.getAttributes();for(const rt in ct)if(ct[rt].location>=0){const I=j[rt];let $=B[rt];if($===void 0&&(rt==="instanceMatrix"&&Y.instanceMatrix&&($=Y.instanceMatrix),rt==="instanceColor"&&Y.instanceColor&&($=Y.instanceColor)),I===void 0||I.attribute!==$||$&&I.data!==$.data)return!0;W++}return c.attributesNum!==W||c.index!==k}function E(Y,V,tt,k){const j={},B=V.attributes;let W=0;const ct=tt.getAttributes();for(const rt in ct)if(ct[rt].location>=0){let I=B[rt];I===void 0&&(rt==="instanceMatrix"&&Y.instanceMatrix&&(I=Y.instanceMatrix),rt==="instanceColor"&&Y.instanceColor&&(I=Y.instanceColor));const $={};$.attribute=I,I&&I.data&&($.data=I.data),j[rt]=$,W++}c.attributes=j,c.attributesNum=W,c.index=k}function w(){const Y=c.newAttributes;for(let V=0,tt=Y.length;V<tt;V++)Y[V]=0}function M(Y){S(Y,0)}function S(Y,V){const tt=c.newAttributes,k=c.enabledAttributes,j=c.attributeDivisors;tt[Y]=1,k[Y]===0&&(r.enableVertexAttribArray(Y),k[Y]=1),j[Y]!==V&&(r.vertexAttribDivisor(Y,V),j[Y]=V)}function L(){const Y=c.newAttributes,V=c.enabledAttributes;for(let tt=0,k=V.length;tt<k;tt++)V[tt]!==Y[tt]&&(r.disableVertexAttribArray(tt),V[tt]=0)}function N(Y,V,tt,k,j,B,W){W===!0?r.vertexAttribIPointer(Y,V,tt,j,B):r.vertexAttribPointer(Y,V,tt,k,j,B)}function A(Y,V,tt,k){w();const j=k.attributes,B=tt.getAttributes(),W=V.defaultAttributeValues;for(const ct in B){const rt=B[ct];if(rt.location>=0){let ht=j[ct];if(ht===void 0&&(ct==="instanceMatrix"&&Y.instanceMatrix&&(ht=Y.instanceMatrix),ct==="instanceColor"&&Y.instanceColor&&(ht=Y.instanceColor)),ht!==void 0){const I=ht.normalized,$=ht.itemSize,gt=t.get(ht);if(gt===void 0)continue;const Et=gt.buffer,Lt=gt.type,kt=gt.bytesPerElement,at=Lt===r.INT||Lt===r.UNSIGNED_INT||ht.gpuType===pp;if(ht.isInterleavedBufferAttribute){const vt=ht.data,Tt=vt.stride,te=ht.offset;if(vt.isInstancedInterleavedBuffer){for(let Ft=0;Ft<rt.locationSize;Ft++)S(rt.location+Ft,vt.meshPerAttribute);Y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let Ft=0;Ft<rt.locationSize;Ft++)M(rt.location+Ft);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let Ft=0;Ft<rt.locationSize;Ft++)N(rt.location+Ft,$/rt.locationSize,Lt,I,Tt*kt,(te+$/rt.locationSize*Ft)*kt,at)}else{if(ht.isInstancedBufferAttribute){for(let vt=0;vt<rt.locationSize;vt++)S(rt.location+vt,ht.meshPerAttribute);Y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let vt=0;vt<rt.locationSize;vt++)M(rt.location+vt);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let vt=0;vt<rt.locationSize;vt++)N(rt.location+vt,$/rt.locationSize,Lt,I,$*kt,$/rt.locationSize*vt*kt,at)}}else if(W!==void 0){const I=W[ct];if(I!==void 0)switch(I.length){case 2:r.vertexAttrib2fv(rt.location,I);break;case 3:r.vertexAttrib3fv(rt.location,I);break;case 4:r.vertexAttrib4fv(rt.location,I);break;default:r.vertexAttrib1fv(rt.location,I)}}}}L()}function D(){O();for(const Y in a){const V=a[Y];for(const tt in V){const k=V[tt];for(const j in k){const B=k[j];for(const W in B)g(B[W].object),delete B[W];delete k[j]}}delete a[Y]}}function U(Y){if(a[Y.id]===void 0)return;const V=a[Y.id];for(const tt in V){const k=V[tt];for(const j in k){const B=k[j];for(const W in B)g(B[W].object),delete B[W];delete k[j]}}delete a[Y.id]}function P(Y){for(const V in a){const tt=a[V];for(const k in tt){const j=tt[k];if(j[Y.id]===void 0)continue;const B=j[Y.id];for(const W in B)g(B[W].object),delete B[W];delete j[Y.id]}}}function b(Y){for(const V in a){const tt=a[V],k=Y.isInstancedMesh===!0?Y.id:0,j=tt[k];if(j!==void 0){for(const B in j){const W=j[B];for(const ct in W)g(W[ct].object),delete W[ct];delete j[B]}delete tt[k],Object.keys(tt).length===0&&delete a[V]}}}function O(){F(),u=!0,c!==o&&(c=o,d(c.object))}function F(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:O,resetDefaultState:F,dispose:D,releaseStatesOfGeometry:U,releaseStatesOfObject:b,releaseStatesOfProgram:P,initAttributes:w,enableAttribute:M,disableUnusedAttributes:L}}function aA(r,t,n){let a;function o(m){a=m}function c(m,d){r.drawArrays(a,m,d),n.update(d,a,1)}function u(m,d,g){g!==0&&(r.drawArraysInstanced(a,m,d,g),n.update(d,a,g))}function h(m,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,d,0,g);let v=0;for(let x=0;x<g;x++)v+=d[x];n.update(v,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function sA(r,t,n,a){let o;function c(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");o=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(P){return!(P!==zi&&a.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(P){const b=P===Hi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==di&&P!==Ii&&!b&&a.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=n.precision!==void 0?n.precision:"highp";const g=m(d);g!==d&&(ne("WebGLRenderer:",d,"not supported, using",g,"instead."),d=g);const _=n.logarithmicDepthBuffer===!0,v=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&v===!1&&ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),L=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),N=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),D=r.getParameter(r.MAX_SAMPLES),U=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:h,precision:d,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:x,maxVertexTextures:E,maxTextureSize:w,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:L,maxVaryings:N,maxFragmentUniforms:A,maxSamples:D,samples:U}}function rA(r){const t=this;let n=null,a=0,o=!1,c=!1;const u=new ba,h=new re,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const x=_.length!==0||v||a!==0||o;return o=v,a=_.length,x},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,v){n=g(_,v,0)},this.setState=function(_,v,x){const E=_.clippingPlanes,w=_.clipIntersection,M=_.clipShadows,S=r.get(_);if(!o||E===null||E.length===0||c&&!M)c?g(null):d();else{const L=c?0:a,N=L*4;let A=S.clippingState||null;m.value=A,A=g(E,v,N,x);for(let D=0;D!==N;++D)A[D]=n[D];S.clippingState=A,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=L}};function d(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(_,v,x,E){const w=_!==null?_.length:0;let M=null;if(w!==0){if(M=m.value,E!==!0||M===null){const S=x+w*4,L=v.matrixWorldInverse;h.getNormalMatrix(L),(M===null||M.length<S)&&(M=new Float32Array(S));for(let N=0,A=x;N!==w;++N,A+=4)u.copy(_[N]).applyMatrix4(L,h),u.normal.toArray(M,A),M[A+3]=u.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,M}}const Vr=4,oA=6,lA=20,cA=256,jo=new Pp,b_=new ee;let dd=null,pd=0,md=0,gd=!1;const uA=new G,Os=new G;class lp{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,o=100,c={}){const{size:u=256,position:h=uA}=c;dd=this._renderer.getRenderTarget(),pd=this._renderer.getActiveCubeFace(),md=this._renderer.getActiveMipmapLevel(),gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,a,o,m,h),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=R_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=A_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(dd,pd,md),this._renderer.xr.enabled=gd,t.scissorTest=!1,zr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Fs||t.mapping===qr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),dd=this._renderer.getRenderTarget(),pd=this._renderer.getActiveCubeFace(),md=this._renderer.getActiveMipmapLevel(),gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:Hi,format:zi,colorSpace:xu,depthBuffer:!1},o=T_(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=T_(t,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=fA(c)),this._blurMaterial=dA(c,t,n),this._ggxMaterial=hA(c,t,n)}return o}_compileMaterial(t){const n=new Ze(new Tn,t);this._renderer.compile(n,jo)}_sceneToCubeUV(t,n,a,o,c){const m=new Ti(90,1,n,a),d=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,x=_.toneMapping;_.getClearColor(b_),_.toneMapping=ji,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ze(new yl,new _x({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,M=w.material;let S=!1;const L=t.background;L?L.isColor&&(M.color.copy(L),t.background=null,S=!0):(M.color.copy(b_),S=!0);for(let N=0;N<6;N++){const A=N%3;A===0?(m.up.set(0,d[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+g[N],c.y,c.z)):A===1?(m.up.set(0,0,d[N]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+g[N],c.z)):(m.up.set(0,d[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+g[N]));const D=this._cubeSize;zr(o,A*D,N>2?D:0,D,D),_.setRenderTarget(o),S&&_.render(w,m),_.render(t,m)}_.toneMapping=x,_.autoClear=v,t.background=L}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===Fs||t.mapping===qr;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=R_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=A_());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const h=c.uniforms;h.envMap.value=t;const m=this._cubeSize;zr(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(u,jo)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=a}_applyGGXFilter(t,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,h=this._lodMeshes[a];h.material=u;const m=u.uniforms,d=a/(this._lodMeshes.length-1),g=n/(this._lodMeshes.length-1),_=Math.sqrt(d*d-g*g),v=d*1.25,x=_*v,{_lodMax:E}=this,w=this._sizeLods[a],M=3*w*(a>E-Vr?a-E+Vr:0),S=4*(this._cubeSize-w);m.envMap.value=t.texture,m.roughness.value=x,m.mipInt.value=E-n,zr(c,M,S,3*w,2*w),o.setRenderTarget(c),o.render(h,jo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-a,zr(t,M,S,3*w,2*w),o.setRenderTarget(t),o.render(h,jo)}_blur(t,n,a,o){const c=this._pingPongRenderTarget,u=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(t,c,n,a,u),this._blurPass(c,t,a,a,u)}_blurPass(t,n,a,o,c){const u=this._renderer,h=this._blurMaterial,m=this._lodMeshes[o];m.material=h;const d=h.uniforms;d.envMap.value=t.texture,d.sigma.value=c,d.mipInt.value=this._lodMax-a;const g=this._sizeLods[o],_=3*g*(o>this._lodMax-Vr?o-this._lodMax+Vr:0),v=4*(this._cubeSize-g);zr(n,_,v,3*g,2*g),u.setRenderTarget(n),u.render(m,jo)}}function fA(r){const t=[],n=[];let a=r;const o=r-Vr+1+oA;for(let c=0;c<o;c++){const u=Math.pow(2,a);t.push(u);const h=1/(u-2),m=-h,d=1+h,g=[m,m,d,m,d,d,m,m,d,d,m,d],_=6,v=6,x=3,E=new Float32Array(x*v*_),w=new Float32Array(x*v*_);for(let S=0;S<_;S++){const L=S%3*2/3-1,N=S>2?0:-1,A=[L,N,0,L+2/3,N,0,L+2/3,N+1,0,L,N,0,L+2/3,N+1,0,L,N+1,0];E.set(A,x*v*S);for(let D=0;D<v;D++){const U=g[D*2]*2-1,P=g[D*2+1]*2-1;S===0?Os.set(1,P,U):S===1?Os.set(-U,1,-P):S===2?Os.set(-U,P,1):S===3?Os.set(-1,P,-U):S===4?Os.set(-U,-1,P):Os.set(U,P,-1),Os.toArray(w,(S*v+D)*x)}}const M=new Tn;M.setAttribute("position",new Bi(E,x)),M.setAttribute("outputDirection",new Bi(w,x)),n.push(new Ze(M,null)),a>Vr&&a--}return{lodMeshes:n,sizeLods:t}}function T_(r,t,n){const a=new Ri(r,t,n);return a.texture.mapping=Tu,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function zr(r,t,n,a,o){r.viewport.set(t,n,a,o),r.scissor.set(t,n,a,o)}function hA(r,t,n){return new ei({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:cA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Au(),fragmentShader:`

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
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function dA(r,t,n){return new ei({name:"SphericalGaussianBlur",defines:{SAMPLES:lA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Au(),fragmentShader:`

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
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function A_(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Au(),fragmentShader:`

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
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function R_(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function Au(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class zx extends Ri{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new Sx(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new yl(5,5,5),c=new ei({name:"CubemapFromEquirect",uniforms:Zr(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Wn,blending:Ra});c.uniforms.tEquirect.value=n;const u=new Ze(o,c),h=n.minFilter;return n.minFilter===Ps&&(n.minFilter=Fn),new g1(1,10,this).update(t,u),n.minFilter=h,u.geometry.dispose(),u.material.dispose(),this}clear(t,n=!0,a=!0,o=!0){const c=t.getRenderTarget();for(let u=0;u<6;u++)t.setRenderTarget(this,u),t.clear(n,a,o);t.setRenderTarget(c)}}function pA(r){let t=new WeakMap,n=new WeakMap,a=null;function o(v,x=!1){return v==null?null:x?u(v):c(v)}function c(v){if(v&&v.isTexture){const x=v.mapping;if(x===Fh||x===Hh)if(t.has(v)){const E=t.get(v).texture;return h(E,v.mapping)}else{const E=v.image;if(E&&E.height>0){const w=new zx(E.height);return w.fromEquirectangularTexture(r,v),t.set(v,w),v.addEventListener("dispose",d),h(w.texture,v.mapping)}else return null}}return v}function u(v){if(v&&v.isTexture){const x=v.mapping,E=x===Fh||x===Hh,w=x===Fs||x===qr;if(E||w){let M=n.get(v);const S=M!==void 0?M.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==S)return a===null&&(a=new lp(r)),M=E?a.fromEquirectangular(v,M):a.fromCubemap(v,M),M.texture.pmremVersion=v.pmremVersion,n.set(v,M),M.texture;if(M!==void 0)return M.texture;{const L=v.image;return E&&L&&L.height>0||w&&L&&m(L)?(a===null&&(a=new lp(r)),M=E?a.fromEquirectangular(v):a.fromCubemap(v),M.texture.pmremVersion=v.pmremVersion,n.set(v,M),v.addEventListener("dispose",g),M.texture):null}}}return v}function h(v,x){return x===Fh?v.mapping=Fs:x===Hh&&(v.mapping=qr),v}function m(v){let x=0;const E=6;for(let w=0;w<E;w++)v[w]!==void 0&&x++;return x===E}function d(v){const x=v.target;x.removeEventListener("dispose",d);const E=t.get(x);E!==void 0&&(t.delete(x),E.dispose())}function g(v){const x=v.target;x.removeEventListener("dispose",g);const E=n.get(x);E!==void 0&&(n.delete(x),E.dispose())}function _(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function mA(r){const t={};function n(a){if(t[a]!==void 0)return t[a];const o=r.getExtension(a);return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&Xr("WebGLRenderer: "+a+" extension not supported."),o}}}function gA(r,t,n,a){const o={},c=new WeakMap;function u(_){const v=_.target;v.index!==null&&t.remove(v.index);for(const E in v.attributes)t.remove(v.attributes[E]);v.removeEventListener("dispose",u),delete o[v.id];const x=c.get(v);x&&(t.remove(x),c.delete(v)),a.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function h(_,v){return o[v.id]===!0||(v.addEventListener("dispose",u),o[v.id]=!0,n.memory.geometries++),v}function m(_){const v=_.attributes;for(const x in v)t.update(v[x],r.ARRAY_BUFFER)}function d(_){const v=[],x=_.index,E=_.attributes.position;let w=0;if(E===void 0)return;if(x!==null){const L=x.array;w=x.version;for(let N=0,A=L.length;N<A;N+=3){const D=L[N+0],U=L[N+1],P=L[N+2];v.push(D,U,U,P,P,D)}}else{const L=E.array;w=E.version;for(let N=0,A=L.length/3-1;N<A;N+=3){const D=N+0,U=N+1,P=N+2;v.push(D,U,U,P,P,D)}}const M=new(E.count>=65535?vx:gx)(v,1);M.version=w;const S=c.get(_);S&&t.remove(S),c.set(_,M)}function g(_){const v=c.get(_);if(v){const x=_.index;x!==null&&v.version<x.version&&d(_)}else d(_);return c.get(_)}return{get:h,update:m,getWireframeAttribute:g}}function vA(r,t,n){let a;function o(_){a=_}let c,u;function h(_){c=_.type,u=_.bytesPerElement}function m(_,v){r.drawElements(a,v,c,_*u),n.update(v,a,1)}function d(_,v,x){x!==0&&(r.drawElementsInstanced(a,v,c,_*u,x),n.update(v,a,x))}function g(_,v,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,v,0,c,_,0,x);let w=0;for(let M=0;M<x;M++)w+=v[M];n.update(w,a,1)}this.setMode=o,this.setIndex=h,this.render=m,this.renderInstances=d,this.renderMultiDraw=g}function _A(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,h){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:Ae("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function xA(r,t,n){const a=new WeakMap,o=new $e;function c(u,h,m){const d=u.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let v=a.get(h);if(v===void 0||v.count!==_){let O=function(){P.dispose(),a.delete(h),h.removeEventListener("dispose",O)};v!==void 0&&v.texture.dispose();const x=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,w=h.morphAttributes.color!==void 0,M=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],L=h.morphAttributes.color||[];let N=0;x===!0&&(N=1),E===!0&&(N=2),w===!0&&(N=3);let A=h.attributes.position.count*N,D=1;A>t.maxTextureSize&&(D=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const U=new Float32Array(A*D*4*_),P=new px(U,A,D,_);P.type=Ii,P.needsUpdate=!0;const b=N*4;for(let F=0;F<_;F++){const Y=M[F],V=S[F],tt=L[F],k=A*D*4*F;for(let j=0;j<Y.count;j++){const B=j*b;x===!0&&(o.fromBufferAttribute(Y,j),U[k+B+0]=o.x,U[k+B+1]=o.y,U[k+B+2]=o.z,U[k+B+3]=0),E===!0&&(o.fromBufferAttribute(V,j),U[k+B+4]=o.x,U[k+B+5]=o.y,U[k+B+6]=o.z,U[k+B+7]=0),w===!0&&(o.fromBufferAttribute(tt,j),U[k+B+8]=o.x,U[k+B+9]=o.y,U[k+B+10]=o.z,U[k+B+11]=tt.itemSize===4?o.w:1)}}v={count:_,texture:P,size:new Xt(A,D)},a.set(h,v),h.addEventListener("dispose",O)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let x=0;for(let w=0;w<d.length;w++)x+=d[w];const E=h.morphTargetsRelative?1:1-x;m.getUniforms().setValue(r,"morphTargetBaseInfluence",E),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",v.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:c}}function SA(r,t,n,a,o){let c=new WeakMap;function u(d){const g=o.render.frame,_=d.geometry,v=t.get(d,_);if(c.get(v)!==g&&(t.update(v),c.set(v,g)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==g&&(n.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&n.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,g))),d.isSkinnedMesh){const x=d.skeleton;c.get(x)!==g&&(x.update(),c.set(x,g))}return v}function h(){c=new WeakMap}function m(d){const g=d.target;g.removeEventListener("dispose",m),a.releaseStatesOfObject(g),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:u,dispose:h}}const yA={[$_]:"LINEAR_TONE_MAPPING",[tx]:"REINHARD_TONE_MAPPING",[ex]:"CINEON_TONE_MAPPING",[dp]:"ACES_FILMIC_TONE_MAPPING",[ix]:"AGX_TONE_MAPPING",[ax]:"NEUTRAL_TONE_MAPPING",[nx]:"CUSTOM_TONE_MAPPING"};function MA(r,t,n,a,o,c){const u=new Ri(t,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,m=null;const d=new Tn;d.setAttribute("position",new De([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new De([0,2,0,0,2,0],2));const g=new u1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new Ze(d,g),v=new Pp(-1,1,1,-1,0,1);let x=null,E=null,w=!1,M,S=null,L=[],N=!1;this.setSize=function(A,D){u.setSize(A,D),h!==null&&h.setSize(A,D),m!==null&&m.setSize(A,D);for(let U=0;U<L.length;U++){const P=L[U];P.setSize&&P.setSize(A,D)}},this.setEffects=function(A){L=A,N=L.length>0&&L[0].isRenderPass===!0;const D=u.width,U=u.height;L.length>0&&h===null&&(h=new Ri(D,U,{type:Hi,depthBuffer:!1,stencilBuffer:!1}),m=new Ri(D,U,{type:Hi,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<L.length;P++){const b=L[P];b.setSize&&b.setSize(D,U)}},this.begin=function(A,D){if(w||A.toneMapping===ji&&L.length===0)return!1;if(S=D,D!==null){const U=D.width,P=D.height;(u.width!==U||u.height!==P)&&this.setSize(U,P)}return N===!1&&A.setRenderTarget(u),M=A.toneMapping,A.toneMapping=ji,!0},this.hasRenderPass=function(){return N},this.end=function(A,D){A.toneMapping=M,w=!0;let U=u,P=h;for(let b=0;b<L.length;b++){const O=L[b];O.enabled!==!1&&(O.render(A,P,U,D),O.needsSwap!==!1&&(U=P,P=P===h?m:h))}if(x!==A.outputColorSpace||E!==A.toneMapping){x=A.outputColorSpace,E=A.toneMapping,g.defines={},Ee.getTransfer(x)===Be&&(g.defines.SRGB_TRANSFER="");const b=yA[E];b&&(g.defines[b]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=U.texture,A.setRenderTarget(S),A.render(_,v),S=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){u.dispose(),h!==null&&h.dispose(),m!==null&&m.dispose(),d.dispose(),g.dispose()}}const Bx=new Pn,cp=new gl(1,1),Fx=new px,Hx=new cE,Gx=new Sx,w_=[],C_=[],D_=new Float32Array(16),U_=new Float32Array(9),L_=new Float32Array(4);function Qr(r,t,n){const a=r[0];if(a<=0||a>0)return r;const o=t*n;let c=w_[o];if(c===void 0&&(c=new Float32Array(o),w_[o]=c),t!==0){a.toArray(c,0);for(let u=1,h=0;u!==t;++u)h+=n,r[u].toArray(c,h)}return c}function En(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function bn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Ru(r,t){let n=C_[t];n===void 0&&(n=new Int32Array(t),C_[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function EA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function bA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2fv(this.addr,t),bn(n,t)}}function TA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(En(n,t))return;r.uniform3fv(this.addr,t),bn(n,t)}}function AA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4fv(this.addr,t),bn(n,t)}}function RA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;L_.set(a),r.uniformMatrix2fv(this.addr,!1,L_),bn(n,a)}}function wA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;U_.set(a),r.uniformMatrix3fv(this.addr,!1,U_),bn(n,a)}}function CA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(En(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),bn(n,t)}else{if(En(n,a))return;D_.set(a),r.uniformMatrix4fv(this.addr,!1,D_),bn(n,a)}}function DA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function UA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2iv(this.addr,t),bn(n,t)}}function LA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(En(n,t))return;r.uniform3iv(this.addr,t),bn(n,t)}}function NA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4iv(this.addr,t),bn(n,t)}}function OA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function PA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(En(n,t))return;r.uniform2uiv(this.addr,t),bn(n,t)}}function IA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(En(n,t))return;r.uniform3uiv(this.addr,t),bn(n,t)}}function zA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(En(n,t))return;r.uniform4uiv(this.addr,t),bn(n,t)}}function BA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(cp.compareFunction=n.isReversedDepthBuffer()?Mp:yp,c=cp):c=Bx,n.setTexture2D(t||c,o)}function FA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||Hx,o)}function HA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||Gx,o)}function GA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||Fx,o)}function VA(r){switch(r){case 5126:return EA;case 35664:return bA;case 35665:return TA;case 35666:return AA;case 35674:return RA;case 35675:return wA;case 35676:return CA;case 5124:case 35670:return DA;case 35667:case 35671:return UA;case 35668:case 35672:return LA;case 35669:case 35673:return NA;case 5125:return OA;case 36294:return PA;case 36295:return IA;case 36296:return zA;case 35678:case 36198:case 36298:case 36306:case 35682:return BA;case 35679:case 36299:case 36307:return FA;case 35680:case 36300:case 36308:case 36293:return HA;case 36289:case 36303:case 36311:case 36292:return GA}}function kA(r,t){r.uniform1fv(this.addr,t)}function XA(r,t){const n=Qr(t,this.size,2);r.uniform2fv(this.addr,n)}function WA(r,t){const n=Qr(t,this.size,3);r.uniform3fv(this.addr,n)}function qA(r,t){const n=Qr(t,this.size,4);r.uniform4fv(this.addr,n)}function YA(r,t){const n=Qr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function ZA(r,t){const n=Qr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function KA(r,t){const n=Qr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function JA(r,t){r.uniform1iv(this.addr,t)}function QA(r,t){r.uniform2iv(this.addr,t)}function jA(r,t){r.uniform3iv(this.addr,t)}function $A(r,t){r.uniform4iv(this.addr,t)}function tR(r,t){r.uniform1uiv(this.addr,t)}function eR(r,t){r.uniform2uiv(this.addr,t)}function nR(r,t){r.uniform3uiv(this.addr,t)}function iR(r,t){r.uniform4uiv(this.addr,t)}function aR(r,t,n){const a=this.cache,o=t.length,c=Ru(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=cp:u=Bx;for(let h=0;h!==o;++h)n.setTexture2D(t[h]||u,c[h])}function sR(r,t,n){const a=this.cache,o=t.length,c=Ru(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTexture3D(t[u]||Hx,c[u])}function rR(r,t,n){const a=this.cache,o=t.length,c=Ru(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTextureCube(t[u]||Gx,c[u])}function oR(r,t,n){const a=this.cache,o=t.length,c=Ru(n,o);En(a,c)||(r.uniform1iv(this.addr,c),bn(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(t[u]||Fx,c[u])}function lR(r){switch(r){case 5126:return kA;case 35664:return XA;case 35665:return WA;case 35666:return qA;case 35674:return YA;case 35675:return ZA;case 35676:return KA;case 5124:case 35670:return JA;case 35667:case 35671:return QA;case 35668:case 35672:return jA;case 35669:case 35673:return $A;case 5125:return tR;case 36294:return eR;case 36295:return nR;case 36296:return iR;case 35678:case 36198:case 36298:case 36306:case 35682:return aR;case 35679:case 36299:case 36307:return sR;case 35680:case 36300:case 36308:case 36293:return rR;case 36289:case 36303:case 36311:case 36292:return oR}}class cR{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=VA(n.type)}}class uR{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=lR(n.type)}}class fR{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const h=o[c];h.setValue(t,n[h.id],a)}}}const vd=/(\w+)(\])?(\[|\.)?/g;function N_(r,t){r.seq.push(t),r.map[t.id]=t}function hR(r,t,n){const a=r.name,o=a.length;for(vd.lastIndex=0;;){const c=vd.exec(a),u=vd.lastIndex;let h=c[1];const m=c[2]==="]",d=c[3];if(m&&(h=h|0),d===void 0||d==="["&&u+2===o){N_(n,d===void 0?new cR(h,r,t):new uR(h,r,t));break}else{let _=n.map[h];_===void 0&&(_=new fR(h),N_(n,_)),n=_}}}class du{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const h=t.getActiveUniform(n,u),m=t.getUniformLocation(n,h.name);hR(h,m,this)}const o=[],c=[];for(const u of this.seq)u.type===t.SAMPLER_2D_SHADOW||u.type===t.SAMPLER_CUBE_SHADOW||u.type===t.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(t,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let c=0,u=n.length;c!==u;++c){const h=n[c],m=a[h.id];m.needsUpdate!==!1&&h.setValue(t,m.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,c=t.length;o!==c;++o){const u=t[o];u.id in n&&a.push(u)}return a}}function O_(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const dR=37297;let pR=0;function mR(r,t){const n=r.split(`
`),a=[],o=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let u=o;u<c;u++){const h=u+1;a.push(`${h===t?">":" "} ${h}: ${n[u]}`)}return a.join(`
`)}const P_=new re;function gR(r){Ee._getMatrix(P_,Ee.workingColorSpace,r);const t=`mat3( ${P_.elements.map(n=>n.toFixed(4))} )`;switch(Ee.getTransfer(r)){case Su:return[t,"LinearTransferOETF"];case Be:return[t,"sRGBTransferOETF"];default:return ne("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function I_(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const h=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+mR(r.getShaderSource(t),h)}else return c}function vR(r,t){const n=gR(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const _R={[$_]:"Linear",[tx]:"Reinhard",[ex]:"Cineon",[dp]:"ACESFilmic",[ix]:"AgX",[ax]:"Neutral",[nx]:"Custom"};function xR(r,t){const n=_R[t];return n===void 0?(ne("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const su=new G;function SR(){Ee.getLuminanceCoefficients(su);const r=su.x.toFixed(4),t=su.y.toFixed(4),n=su.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yR(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(il).join(`
`)}function MR(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function ER(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(t,o),u=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[u]={type:c.type,location:r.getAttribLocation(t,u),locationSize:h}}return n}function il(r){return r!==""}function z_(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function B_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bR=/^[ \t]*#include +<([\w\d./]+)>/gm;function up(r){return r.replace(bR,AR)}const TR=new Map;function AR(r,t){let n=de[t];if(n===void 0){const a=TR.get(t);if(a!==void 0)n=de[a],ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return up(n)}const RR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function F_(r){return r.replace(RR,wR)}function wR(r,t,n,a){let o="";for(let c=parseInt(t);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function H_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const CR={[lu]:"SHADOWMAP_TYPE_PCF",[el]:"SHADOWMAP_TYPE_VSM"};function DR(r){return CR[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const UR={[Fs]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE",[Tu]:"ENVMAP_TYPE_CUBE_UV"};function LR(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":UR[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const NR={[qr]:"ENVMAP_MODE_REFRACTION"};function OR(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":NR[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const PR={[j_]:"ENVMAP_BLENDING_MULTIPLY",[TM]:"ENVMAP_BLENDING_MIX",[AM]:"ENVMAP_BLENDING_ADD"};function IR(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":PR[r.combine]||"ENVMAP_BLENDING_NONE"}function zR(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function BR(r,t,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,h=n.fragmentShader;const m=DR(n),d=LR(n),g=OR(n),_=IR(n),v=zR(n),x=yR(n),E=MR(c),w=o.createProgram();let M,S,L=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(il).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(il).join(`
`),S.length>0&&(S+=`
`)):(M=[H_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(il).join(`
`),S=[H_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ji?"#define TONE_MAPPING":"",n.toneMapping!==ji?de.tonemapping_pars_fragment:"",n.toneMapping!==ji?xR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,vR("linearToOutputTexel",n.outputColorSpace),SR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(il).join(`
`)),u=up(u),u=z_(u,n),u=B_(u,n),h=up(h),h=z_(h,n),h=B_(h,n),u=F_(u),h=F_(h),n.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",n.glslVersion===Pv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Pv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const N=L+M+u,A=L+S+h,D=O_(o,o.VERTEX_SHADER,N),U=O_(o,o.FRAGMENT_SHADER,A);o.attachShader(w,D),o.attachShader(w,U),n.index0AttributeName!==void 0?o.bindAttribLocation(w,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(w,0,"position"),o.linkProgram(w);function P(Y){if(r.debug.checkShaderErrors){const V=o.getProgramInfoLog(w)||"",tt=o.getShaderInfoLog(D)||"",k=o.getShaderInfoLog(U)||"",j=V.trim(),B=tt.trim(),W=k.trim();let ct=!0,rt=!0;if(o.getProgramParameter(w,o.LINK_STATUS)===!1)if(ct=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,w,D,U);else{const ht=I_(o,D,"vertex"),I=I_(o,U,"fragment");Ae("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(w,o.VALIDATE_STATUS)+`

Material Name: `+Y.name+`
Material Type: `+Y.type+`

Program Info Log: `+j+`
`+ht+`
`+I)}else j!==""?ne("WebGLProgram: Program Info Log:",j):(B===""||W==="")&&(rt=!1);rt&&(Y.diagnostics={runnable:ct,programLog:j,vertexShader:{log:B,prefix:M},fragmentShader:{log:W,prefix:S}})}o.deleteShader(D),o.deleteShader(U),b=new du(o,w),O=ER(o,w)}let b;this.getUniforms=function(){return b===void 0&&P(this),b};let O;this.getAttributes=function(){return O===void 0&&P(this),O};let F=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=o.getProgramParameter(w,dR)),F},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=pR++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=D,this.fragmentShader=U,this}let FR=0;class HR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new GR(t),n.set(t,a)),a}}class GR{constructor(t){this.id=FR++,this.code=t,this.usedTimes=0}}function VR(r){return r===Hs||r===vu||r===_u}function kR(r,t,n,a,o,c){const u=new Tp,h=new HR,m=new Set,d=[],g=new Map,_=a.logarithmicDepthBuffer;let v=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(b){return m.add(b),b===0?"uv":`uv${b}`}function w(b,O,F,Y,V,tt){const k=Y.fog,j=V.geometry,B=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?Y.environment:null,W=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ct=t.get(b.envMap||B,W),rt=ct&&ct.mapping===Tu?ct.image.height:null,ht=x[b.type];b.precision!==null&&(v=a.getMaxPrecision(b.precision),v!==b.precision&&ne("WebGLProgram.getParameters:",b.precision,"not supported, using",v,"instead."));const I=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,$=I!==void 0?I.length:0;let gt=0;j.morphAttributes.position!==void 0&&(gt=1),j.morphAttributes.normal!==void 0&&(gt=2),j.morphAttributes.color!==void 0&&(gt=3);let Et,Lt,kt,at;if(ht){const Fe=Ki[ht];Et=Fe.vertexShader,Lt=Fe.fragmentShader}else{Et=b.vertexShader,Lt=b.fragmentShader;const Fe=h.getVertexShaderStage(b),be=h.getFragmentShaderStage(b);h.update(b,Fe,be),kt=Fe.id,at=be.id}const vt=r.getRenderTarget(),Tt=r.state.buffers.depth.getReversed(),te=V.isInstancedMesh===!0,Ft=V.isBatchedMesh===!0,le=!!b.map,an=!!b.matcap,ae=!!ct,xe=!!b.aoMap,Oe=!!b.lightMap,ge=!!b.bumpMap&&b.wireframe===!1,Xe=!!b.normalMap,sn=!!b.displacementMap,An=!!b.emissiveMap,We=!!b.metalnessMap,rn=!!b.roughnessMap,K=b.anisotropy>0,Pe=b.clearcoat>0,Ue=b.dispersion>0,z=b.retroreflectivity>0,T=b.iridescence>0,Q=b.sheen>0,ot=b.transmission>0,dt=K&&!!b.anisotropyMap,bt=Pe&&!!b.clearcoatMap,Ct=Pe&&!!b.clearcoatNormalMap,pt=Pe&&!!b.clearcoatRoughnessMap,mt=T&&!!b.iridescenceMap,At=T&&!!b.iridescenceThicknessMap,Ht=Q&&!!b.sheenColorMap,Nt=Q&&!!b.sheenRoughnessMap,Dt=!!b.specularMap,Jt=!!b.specularColorMap,Qt=!!b.specularIntensityMap,ie=ot&&!!b.transmissionMap,Z=ot&&!!b.thicknessMap,Rt=!!b.gradientMap,xt=!!b.alphaMap,wt=b.alphaTest>0,It=!!b.alphaHash,Mt=!!b.extensions;let Kt=ji;b.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(Kt=r.toneMapping);const Wt={shaderID:ht,shaderType:b.type,shaderName:b.name,vertexShader:Et,fragmentShader:Lt,defines:b.defines,customVertexShaderID:kt,customFragmentShaderID:at,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:v,batching:Ft,batchingColor:Ft&&V._colorsTexture!==null,instancing:te,instancingColor:te&&V.instanceColor!==null,instancingMorph:te&&V.morphTexture!==null,outputColorSpace:vt===null?r.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Ee.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:le,matcap:an,envMap:ae,envMapMode:ae&&ct.mapping,envMapCubeUVHeight:rt,aoMap:xe,lightMap:Oe,bumpMap:ge,normalMap:Xe,displacementMap:sn,emissiveMap:An,normalMapObjectSpace:Xe&&b.normalMapType===CM,normalMapTangentSpace:Xe&&b.normalMapType===ip,packedNormalMap:Xe&&b.normalMapType===ip&&VR(b.normalMap.format),metalnessMap:We,roughnessMap:rn,anisotropy:K,anisotropyMap:dt,clearcoat:Pe,clearcoatMap:bt,clearcoatNormalMap:Ct,clearcoatRoughnessMap:pt,dispersion:Ue,retroreflection:z,iridescence:T,iridescenceMap:mt,iridescenceThicknessMap:At,sheen:Q,sheenColorMap:Ht,sheenRoughnessMap:Nt,specularMap:Dt,specularColorMap:Jt,specularIntensityMap:Qt,transmission:ot,transmissionMap:ie,thicknessMap:Z,gradientMap:Rt,opaque:b.transparent===!1&&b.blending===al&&b.alphaToCoverage===!1,alphaMap:xt,alphaTest:wt,alphaHash:It,combine:b.combine,mapUv:le&&E(b.map.channel),aoMapUv:xe&&E(b.aoMap.channel),lightMapUv:Oe&&E(b.lightMap.channel),bumpMapUv:ge&&E(b.bumpMap.channel),normalMapUv:Xe&&E(b.normalMap.channel),displacementMapUv:sn&&E(b.displacementMap.channel),emissiveMapUv:An&&E(b.emissiveMap.channel),metalnessMapUv:We&&E(b.metalnessMap.channel),roughnessMapUv:rn&&E(b.roughnessMap.channel),anisotropyMapUv:dt&&E(b.anisotropyMap.channel),clearcoatMapUv:bt&&E(b.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&E(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&E(b.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&E(b.iridescenceMap.channel),iridescenceThicknessMapUv:At&&E(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&E(b.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&E(b.sheenRoughnessMap.channel),specularMapUv:Dt&&E(b.specularMap.channel),specularColorMapUv:Jt&&E(b.specularColorMap.channel),specularIntensityMapUv:Qt&&E(b.specularIntensityMap.channel),transmissionMapUv:ie&&E(b.transmissionMap.channel),thicknessMapUv:Z&&E(b.thicknessMap.channel),alphaMapUv:xt&&E(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Xe||K),vertexNormals:!!j.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!j.attributes.uv&&(le||xt),fog:!!k,useFog:b.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||j.attributes.normal===void 0&&Xe===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Tt,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:j.attributes.position!==void 0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:gt,numSunLights:O.sun.length,numDirLights:O.directional.length,numPointLights:O.point.length,numSpotLights:O.spot.length,numSpotLightMaps:O.spotLightMap.length,numRectAreaLights:O.rectArea.length,numHemiLights:O.hemi.length,numSunLightShadows:O.sunShadowMap.length,numDirLightShadows:O.directionalShadowMap.length,numPointLightShadows:O.pointShadowMap.length,numSpotLightShadows:O.spotShadowMap.length,numSpotLightShadowsWithMaps:O.numSpotLightShadowsWithMaps,numLightProbes:O.numLightProbes,numLightProbeGrids:tt.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Kt,decodeVideoTexture:le&&b.map.isVideoTexture===!0&&Ee.getTransfer(b.map.colorSpace)===Be,decodeVideoTextureEmissive:An&&b.emissiveMap.isVideoTexture===!0&&Ee.getTransfer(b.emissiveMap.colorSpace)===Be,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ai,flipSided:b.side===Wn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Mt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&b.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Wt.vertexUv1s=m.has(1),Wt.vertexUv2s=m.has(2),Wt.vertexUv3s=m.has(3),m.clear(),Wt}function M(b){const O=[];if(b.shaderID?O.push(b.shaderID):(O.push(b.customVertexShaderID),O.push(b.customFragmentShaderID)),b.defines!==void 0)for(const F in b.defines)O.push(F),O.push(b.defines[F]);return b.isRawShaderMaterial===!1&&(S(O,b),L(O,b),O.push(r.outputColorSpace)),O.push(b.customProgramCacheKey),O.join()}function S(b,O){b.push(O.precision),b.push(O.outputColorSpace),b.push(O.envMapMode),b.push(O.envMapCubeUVHeight),b.push(O.mapUv),b.push(O.alphaMapUv),b.push(O.lightMapUv),b.push(O.aoMapUv),b.push(O.bumpMapUv),b.push(O.normalMapUv),b.push(O.displacementMapUv),b.push(O.emissiveMapUv),b.push(O.metalnessMapUv),b.push(O.roughnessMapUv),b.push(O.anisotropyMapUv),b.push(O.clearcoatMapUv),b.push(O.clearcoatNormalMapUv),b.push(O.clearcoatRoughnessMapUv),b.push(O.iridescenceMapUv),b.push(O.iridescenceThicknessMapUv),b.push(O.sheenColorMapUv),b.push(O.sheenRoughnessMapUv),b.push(O.specularMapUv),b.push(O.specularColorMapUv),b.push(O.specularIntensityMapUv),b.push(O.transmissionMapUv),b.push(O.thicknessMapUv),b.push(O.combine),b.push(O.fogExp2),b.push(O.sizeAttenuation),b.push(O.morphTargetsCount),b.push(O.morphAttributeCount),b.push(O.numSunLights),b.push(O.numDirLights),b.push(O.numPointLights),b.push(O.numSpotLights),b.push(O.numSpotLightMaps),b.push(O.numHemiLights),b.push(O.numRectAreaLights),b.push(O.numSunLightShadows),b.push(O.numDirLightShadows),b.push(O.numPointLightShadows),b.push(O.numSpotLightShadows),b.push(O.numSpotLightShadowsWithMaps),b.push(O.numLightProbes),b.push(O.shadowMapType),b.push(O.toneMapping),b.push(O.numClippingPlanes),b.push(O.numClipIntersection),b.push(O.depthPacking)}function L(b,O){u.disableAll(),O.instancing&&u.enable(0),O.instancingColor&&u.enable(1),O.instancingMorph&&u.enable(2),O.matcap&&u.enable(3),O.envMap&&u.enable(4),O.normalMapObjectSpace&&u.enable(5),O.normalMapTangentSpace&&u.enable(6),O.clearcoat&&u.enable(7),O.iridescence&&u.enable(8),O.alphaTest&&u.enable(9),O.vertexColors&&u.enable(10),O.vertexAlphas&&u.enable(11),O.vertexUv1s&&u.enable(12),O.vertexUv2s&&u.enable(13),O.vertexUv3s&&u.enable(14),O.vertexTangents&&u.enable(15),O.anisotropy&&u.enable(16),O.alphaHash&&u.enable(17),O.batching&&u.enable(18),O.dispersion&&u.enable(19),O.retroreflection&&u.enable(24),O.batchingColor&&u.enable(20),O.gradientMap&&u.enable(21),O.packedNormalMap&&u.enable(22),O.vertexNormals&&u.enable(23),b.push(u.mask),u.disableAll(),O.fog&&u.enable(0),O.useFog&&u.enable(1),O.flatShading&&u.enable(2),O.logarithmicDepthBuffer&&u.enable(3),O.reversedDepthBuffer&&u.enable(4),O.skinning&&u.enable(5),O.morphTargets&&u.enable(6),O.morphNormals&&u.enable(7),O.morphColors&&u.enable(8),O.premultipliedAlpha&&u.enable(9),O.shadowMapEnabled&&u.enable(10),O.doubleSided&&u.enable(11),O.flipSided&&u.enable(12),O.useDepthPacking&&u.enable(13),O.dithering&&u.enable(14),O.transmission&&u.enable(15),O.sheen&&u.enable(16),O.opaque&&u.enable(17),O.pointsUvs&&u.enable(18),O.decodeVideoTexture&&u.enable(19),O.decodeVideoTextureEmissive&&u.enable(20),O.alphaToCoverage&&u.enable(21),O.numLightProbeGrids>0&&u.enable(22),O.hasPositionAttribute&&u.enable(23),b.push(u.mask)}function N(b){const O=x[b.type];let F;if(O){const Y=Ki[O];F=Nx.clone(Y.uniforms)}else F=b.uniforms;return F}function A(b,O){let F=g.get(O);return F!==void 0?++F.usedTimes:(F=new BR(r,O,b,o),d.push(F),g.set(O,F)),F}function D(b){if(--b.usedTimes===0){const O=d.indexOf(b);d[O]=d[d.length-1],d.pop(),g.delete(b.cacheKey),b.destroy()}}function U(b){h.remove(b)}function P(){h.dispose()}return{getParameters:w,getProgramCacheKey:M,getUniforms:N,acquireProgram:A,releaseProgram:D,releaseShaderCache:U,programs:d,dispose:P}}function XR(){let r=new WeakMap;function t(u){return r.has(u)}function n(u){let h=r.get(u);return h===void 0&&(h={},r.set(u,h)),h}function a(u){r.delete(u)}function o(u,h,m){r.get(u)[h]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:c}}function WR(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function G_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function V_(){const r=[];let t=0;const n=[],a=[],o=[];function c(){t=0,n.length=0,a.length=0,o.length=0}function u(v){let x=0;return v.isInstancedMesh&&(x+=2),v.isSkinnedMesh&&(x+=1),x}function h(v,x,E,w,M,S){let L=r[t];return L===void 0?(L={id:v.id,object:v,geometry:x,material:E,materialVariant:u(v),groupOrder:w,renderOrder:v.renderOrder,z:M,group:S},r[t]=L):(L.id=v.id,L.object=v,L.geometry=x,L.material=E,L.materialVariant=u(v),L.groupOrder=w,L.renderOrder=v.renderOrder,L.z=M,L.group=S),t++,L}function m(v,x,E,w,M,S,L){L.reversedDepth===!0&&(M=-M);const N=h(v,x,E,w,M,S);E.transmission>0?a.push(N):E.transparent===!0?o.push(N):n.push(N)}function d(v,x,E,w,M,S){const L=h(v,x,E,w,M,S);E.transmission>0?a.unshift(L):E.transparent===!0?o.unshift(L):n.unshift(L)}function g(v,x){n.length>1&&n.sort(v||WR),a.length>1&&a.sort(x||G_),o.length>1&&o.sort(x||G_)}function _(){for(let v=t,x=r.length;v<x;v++){const E=r[v];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:m,unshift:d,finish:_,sort:g}}function qR(){let r=new WeakMap;function t(a,o){const c=r.get(a);let u;return c===void 0?(u=new V_,r.set(a,[u])):o>=c.length?(u=new V_,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:t,dispose:n}}function YR(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new G,color:new ee};break;case"SpotLight":n={position:new G,direction:new G,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new G,color:new ee,distance:0,decay:0};break;case"HemisphereLight":n={direction:new G,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":n={color:new ee,position:new G,halfWidth:new G,halfHeight:new G};break}return r[t.id]=n,n}}}function ZR(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let KR=0;function JR(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function QR(r){const t=new YR,n=ZR(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)a.probe.push(new G);const o=new G,c=new Re,u=new Re;function h(d){let g=0,_=0,v=0;for(let V=0;V<9;V++)a.probe[V].set(0,0,0);let x=0,E=0,w=0,M=0,S=0,L=0,N=0,A=0,D=0,U=0,P=0,b=0,O=0,F=0;d.sort(JR);for(let V=0,tt=d.length;V<tt;V++){const k=d[V],j=k.color,B=k.intensity,W=k.distance;let ct=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===Hs?ct=k.shadow.map.texture:ct=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)g+=j.r*B,_+=j.g*B,v+=j.b*B;else if(k.isLightProbe){for(let rt=0;rt<9;rt++)a.probe[rt].addScaledVector(k.sh.coefficients[rt],B);F++}else if(k.isSunLight){const rt=t.get(k);if(rt.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const ht=k.shadow,I=n.get(k);I.shadowIntensity=ht.intensity,I.shadowBias=ht.bias,I.shadowNormalBias=ht.normalBias,I.shadowRadius=ht.radius,I.shadowMapSize.copy(ht.mapSize).multiply(ht.getFrameExtents()),a.sunShadow[E]=I,a.sunShadowMap[E]=ct;const $=ht.getViewportCount();for(let gt=0;gt<$;gt++)a.sunShadowMatrix[w+gt]=ht.getMatrix(gt),a.sunShadowCascade[w+gt]=ht._cascadeData[gt];w+=$,E++}a.sun[x]=rt,x++}else if(k.isDirectionalLight){const rt=t.get(k);if(rt.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const ht=k.shadow,I=n.get(k);I.shadowIntensity=ht.intensity,I.shadowBias=ht.bias,I.shadowNormalBias=ht.normalBias,I.shadowRadius=ht.radius,I.shadowMapSize=ht.mapSize,a.directionalShadow[M]=I,a.directionalShadowMap[M]=ct,a.directionalShadowMatrix[M]=k.shadow.matrix,D++}a.directional[M]=rt,M++}else if(k.isSpotLight){const rt=t.get(k);rt.position.setFromMatrixPosition(k.matrixWorld),rt.color.copy(j).multiplyScalar(B),rt.distance=W,rt.coneCos=Math.cos(k.angle),rt.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),rt.decay=k.decay,a.spot[L]=rt;const ht=k.shadow;if(k.map&&(a.spotLightMap[b]=k.map,b++,ht.updateMatrices(k),k.castShadow&&O++),a.spotLightMatrix[L]=ht.matrix,k.castShadow){const I=n.get(k);I.shadowIntensity=ht.intensity,I.shadowBias=ht.bias,I.shadowNormalBias=ht.normalBias,I.shadowRadius=ht.radius,I.shadowMapSize=ht.mapSize,a.spotShadow[L]=I,a.spotShadowMap[L]=ct,P++}L++}else if(k.isRectAreaLight){const rt=t.get(k);rt.color.copy(j).multiplyScalar(B),rt.halfWidth.set(k.width*.5,0,0),rt.halfHeight.set(0,k.height*.5,0),a.rectArea[N]=rt,N++}else if(k.isPointLight){const rt=t.get(k);if(rt.color.copy(k.color).multiplyScalar(k.intensity),rt.distance=k.distance,rt.decay=k.decay,k.castShadow){const ht=k.shadow,I=n.get(k);I.shadowIntensity=ht.intensity,I.shadowBias=ht.bias,I.shadowNormalBias=ht.normalBias,I.shadowRadius=ht.radius,I.shadowMapSize=ht.mapSize,I.shadowCameraNear=ht.camera.near,I.shadowCameraFar=ht.camera.far,a.pointShadow[S]=I,a.pointShadowMap[S]=ct,a.pointShadowMatrix[S]=k.shadow.matrix,U++}a.point[S]=rt,S++}else if(k.isHemisphereLight){const rt=t.get(k);rt.skyColor.copy(k.color).multiplyScalar(B),rt.groundColor.copy(k.groundColor).multiplyScalar(B),a.hemi[A]=rt,A++}}N>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Pt.LTC_FLOAT_1,a.rectAreaLTC2=Pt.LTC_FLOAT_2):(a.rectAreaLTC1=Pt.LTC_HALF_1,a.rectAreaLTC2=Pt.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=v;const Y=a.hash;(Y.sunLength!==x||Y.directionalLength!==M||Y.pointLength!==S||Y.spotLength!==L||Y.rectAreaLength!==N||Y.hemiLength!==A||Y.numSunShadows!==E||Y.numDirectionalShadows!==D||Y.numPointShadows!==U||Y.numSpotShadows!==P||Y.numSpotMaps!==b||Y.numLightProbes!==F)&&(a.sun.length=x,a.directional.length=M,a.spot.length=L,a.rectArea.length=N,a.point.length=S,a.hemi.length=A,a.sunShadow.length=E,a.sunShadowMap.length=E,a.sunShadowMatrix.length=w,a.sunShadowCascade.length=w,a.directionalShadow.length=D,a.directionalShadowMap.length=D,a.directionalShadowMatrix.length=D,a.pointShadow.length=U,a.pointShadowMap.length=U,a.pointShadowMatrix.length=U,a.spotShadow.length=P,a.spotShadowMap.length=P,a.spotLightMatrix.length=P+b-O,a.spotLightMap.length=b,a.numSpotLightShadowsWithMaps=O,a.numLightProbes=F,Y.sunLength=x,Y.directionalLength=M,Y.pointLength=S,Y.spotLength=L,Y.rectAreaLength=N,Y.hemiLength=A,Y.numSunShadows=E,Y.numDirectionalShadows=D,Y.numPointShadows=U,Y.numSpotShadows=P,Y.numSpotMaps=b,Y.numLightProbes=F,a.version=KR++)}function m(d,g){let _=0,v=0,x=0,E=0,w=0,M=0;const S=g.matrixWorldInverse;for(let L=0,N=d.length;L<N;L++){const A=d[L];if(A.isSunLight){const D=a.sun[_];D.direction.setFromMatrixPosition(A.matrixWorld),D.direction.transformDirection(S),_++}else if(A.isDirectionalLight){const D=a.directional[v];D.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),D.direction.sub(o),D.direction.transformDirection(S),v++}else if(A.isSpotLight){const D=a.spot[E];D.position.setFromMatrixPosition(A.matrixWorld),D.position.applyMatrix4(S),D.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),D.direction.sub(o),D.direction.transformDirection(S),E++}else if(A.isRectAreaLight){const D=a.rectArea[w];D.position.setFromMatrixPosition(A.matrixWorld),D.position.applyMatrix4(S),u.identity(),c.copy(A.matrixWorld),c.premultiply(S),u.extractRotation(c),D.halfWidth.set(A.width*.5,0,0),D.halfHeight.set(0,A.height*.5,0),D.halfWidth.applyMatrix4(u),D.halfHeight.applyMatrix4(u),w++}else if(A.isPointLight){const D=a.point[x];D.position.setFromMatrixPosition(A.matrixWorld),D.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const D=a.hemi[M];D.direction.setFromMatrixPosition(A.matrixWorld),D.direction.transformDirection(S),M++}}}return{setup:h,setupView:m,state:a}}function k_(r){const t=new QR(r),n=[],a=[],o=[];function c(v){_.camera=v,n.length=0,a.length=0,o.length=0}function u(v){n.push(v)}function h(v){a.push(v)}function m(v){o.push(v)}function d(){t.setup(n)}function g(v){t.setupView(n,v)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:d,setupLightsView:g,pushLight:u,pushShadow:h,pushLightProbeGrid:m}}function jR(r){let t=new WeakMap;function n(o,c=0){const u=t.get(o);let h;return u===void 0?(h=new k_(r),t.set(o,[h])):c>=u.length?(h=new k_(r),u.push(h)):h=u[c],h}function a(){t=new WeakMap}return{get:n,dispose:a}}const $R=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t2=`uniform sampler2D shadow_pass;
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
}`,e2=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],n2=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],X_=new Re,$o=new G,_d=new G;function i2(r,t,n){let a=new wp;const o=new Xt,c=new Xt,u=new $e,h=new f1,m=new h1,d={},g=n.maxTextureSize,_={[Bs]:Wn,[Wn]:Bs,[Ai]:Ai},v=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:$R,fragmentShader:t2}),x=v.clone();x.defines.HORIZONTAL_PASS=1;const E=new Tn;E.setAttribute("position",new Bi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Ze(E,v),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lu;let S=this.type;this.render=function(U,P,b){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||U.length===0)return;this.type===K_&&(ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=lu);const O=r.getRenderTarget(),F=r.getActiveCubeFace(),Y=r.getActiveMipmapLevel(),V=r.state;V.setBlending(Ra),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const tt=S!==this.type;tt&&P.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(j=>j.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,j=U.length;k<j;k++){const B=U[k],W=B.shadow;if(W===void 0){ne("WebGLShadowMap:",B,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;o.copy(W.mapSize);const ct=W.getFrameExtents();o.multiply(ct),c.copy(W.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(c.x=Math.floor(g/ct.x),o.x=c.x*ct.x,W.mapSize.x=c.x),o.y>g&&(c.y=Math.floor(g/ct.y),o.y=c.y*ct.y,W.mapSize.y=c.y));const rt=r.state.buffers.depth.getReversed();if(W.camera._reversedDepth=rt,W.map===null||tt===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===el){if(B.isPointLight){ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Ri(o.x,o.y,{format:Hs,type:Hi,minFilter:Fn,magFilter:Fn,generateMipmaps:!1}),W.map.texture.name=B.name+".shadowMap",W.map.depthTexture=new gl(o.x,o.y,Ii),W.map.depthTexture.name=B.name+".shadowMapDepth",W.map.depthTexture.format=Ca,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=On,W.map.depthTexture.magFilter=On}else B.isPointLight?(W.map=new zx(o.x),W.map.depthTexture=new CE(o.x,$i)):(W.map=new Ri(o.x,o.y),W.map.depthTexture=new gl(o.x,o.y,$i)),W.map.depthTexture.name=B.name+".shadowMap",W.map.depthTexture.format=Ca,this.type===lu?(W.map.depthTexture.compareFunction=rt?Mp:yp,W.map.depthTexture.minFilter=Fn,W.map.depthTexture.magFilter=Fn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=On,W.map.depthTexture.magFilter=On);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==o.x||W.map.height!==o.y)&&W.map.setSize(o.x,o.y);const ht=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();B.isPointLight!==!0&&W.updateMatrices(B,b);for(let I=0;I<ht;I++){const $=W.getCamera(I);if(B.isPointLight){const gt=W.camera,Et=W.matrix,Lt=B.distance||gt.far;Lt!==gt.far&&(gt.far=Lt,gt.updateProjectionMatrix()),$o.setFromMatrixPosition(B.matrixWorld),gt.position.copy($o),_d.copy(gt.position),_d.add(e2[I]),gt.up.copy(n2[I]),gt.lookAt(_d),gt.updateMatrixWorld(),Et.makeTranslation(-$o.x,-$o.y,-$o.z),X_.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),W._frustum.setFromProjectionMatrix(X_,gt.coordinateSystem,gt.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)r.setRenderTarget(W.map,I),r.clear();else{I===0&&(r.setRenderTarget(W.map),r.clear());const gt=W.getViewport(I);u.set(c.x*gt.x,c.y*gt.y,c.x*gt.z,c.y*gt.w),V.viewport(u)}a=W.getFrustum(I),A(P,b,$,B,this.type)}W.isPointLightShadow!==!0&&this.type===el&&L(W,b),W.needsUpdate=!1}S=this.type,M.needsUpdate=!1,r.setRenderTarget(O,F,Y)};function L(U,P){const b=t.update(w);v.defines.VSM_SAMPLES!==U.blurSamples&&(v.defines.VSM_SAMPLES=U.blurSamples,x.defines.VSM_SAMPLES=U.blurSamples,v.needsUpdate=!0,x.needsUpdate=!0),U.mapPass===null?U.mapPass=new Ri(o.x,o.y,{format:Hs,type:Hi}):(U.mapPass.width!==U.map.width||U.mapPass.height!==U.map.height)&&U.mapPass.setSize(U.map.width,U.map.height),v.uniforms.shadow_pass.value=U.map.depthTexture,v.uniforms.resolution.value.set(U.map.width,U.map.height),v.uniforms.radius.value=U.radius,r.setRenderTarget(U.mapPass),r.clear(),r.renderBufferDirect(P,null,b,v,w,null),x.uniforms.shadow_pass.value=U.mapPass.texture,x.uniforms.resolution.value.set(U.map.width,U.map.height),x.uniforms.radius.value=U.radius,r.setRenderTarget(U.map),r.clear(),r.renderBufferDirect(P,null,b,x,w,null)}function N(U,P,b,O){let F=null;const Y=b.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(Y!==void 0)F=Y;else if(F=b.isPointLight===!0?m:h,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const V=F.uuid,tt=P.uuid;let k=d[V];k===void 0&&(k={},d[V]=k);let j=k[tt];j===void 0&&(j=F.clone(),k[tt]=j,P.addEventListener("dispose",D)),F=j}if(F.visible=P.visible,F.wireframe=P.wireframe,O===el?F.side=P.shadowSide!==null?P.shadowSide:P.side:F.side=P.shadowSide!==null?P.shadowSide:_[P.side],F.alphaMap=P.alphaMap,F.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,F.map=P.map,F.clipShadows=P.clipShadows,F.clippingPlanes=P.clippingPlanes,F.clipIntersection=P.clipIntersection,F.displacementMap=P.displacementMap,F.displacementScale=P.displacementScale,F.displacementBias=P.displacementBias,F.wireframeLinewidth=P.wireframeLinewidth,F.linewidth=P.linewidth,b.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const V=r.properties.get(F);V.light=b}return F}function A(U,P,b,O,F){if(U.visible===!1)return;if(U.layers.test(P.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&F===el)&&(!U.frustumCulled||U.intersectsFrustum(a))){U.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,U.matrixWorld);const tt=t.update(U),k=U.material;if(Array.isArray(k)){const j=tt.groups;for(let B=0,W=j.length;B<W;B++){const ct=j[B],rt=k[ct.materialIndex];if(rt&&rt.visible){const ht=N(U,rt,O,F);U.onBeforeShadow(r,U,P,b,tt,ht,ct),r.renderBufferDirect(b,null,tt,ht,U,ct),U.onAfterShadow(r,U,P,b,tt,ht,ct)}}}else if(k.visible){const j=N(U,k,O,F);U.onBeforeShadow(r,U,P,b,tt,j,null),r.renderBufferDirect(b,null,tt,j,U,null),U.onAfterShadow(r,U,P,b,tt,j,null)}}const V=U.children;for(let tt=0,k=V.length;tt<k;tt++)A(V[tt],P,b,O,F)}function D(U){U.target.removeEventListener("dispose",D);for(const b in d){const O=d[b],F=U.target.uuid;F in O&&(O[F].dispose(),delete O[F])}}}function a2(r,t){function n(){let Z=!1;const Rt=new $e;let xt=null;const wt=new $e(0,0,0,0);return{setMask:function(It){xt!==It&&!Z&&(r.colorMask(It,It,It,It),xt=It)},setLocked:function(It){Z=It},setClear:function(It,Mt,Kt,Wt,Fe){Fe===!0&&(It*=Wt,Mt*=Wt,Kt*=Wt),Rt.set(It,Mt,Kt,Wt),wt.equals(Rt)===!1&&(r.clearColor(It,Mt,Kt,Wt),wt.copy(Rt))},reset:function(){Z=!1,xt=null,wt.set(-1,0,0,0)}}}function a(){let Z=!1,Rt=!1,xt=null,wt=null,It=null;return{setReversed:function(Mt){if(Rt!==Mt){const Kt=t.get("EXT_clip_control");Mt?Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.ZERO_TO_ONE_EXT):Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.NEGATIVE_ONE_TO_ONE_EXT),Rt=Mt;const Wt=It;It=null,this.setClear(Wt)}},getReversed:function(){return Rt},setTest:function(Mt){Mt?vt(r.DEPTH_TEST):Tt(r.DEPTH_TEST)},setMask:function(Mt){xt!==Mt&&!Z&&(r.depthMask(Mt),xt=Mt)},setFunc:function(Mt){if(Rt&&(Mt=GM[Mt]),wt!==Mt){switch(Mt){case xd:r.depthFunc(r.NEVER);break;case Sd:r.depthFunc(r.ALWAYS);break;case yd:r.depthFunc(r.LESS);break;case ul:r.depthFunc(r.LEQUAL);break;case Md:r.depthFunc(r.EQUAL);break;case Ed:r.depthFunc(r.GEQUAL);break;case bd:r.depthFunc(r.GREATER);break;case Td:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}wt=Mt}},setLocked:function(Mt){Z=Mt},setClear:function(Mt){It!==Mt&&(It=Mt,Rt&&(Mt=1-Mt),r.clearDepth(Mt))},reset:function(){Z=!1,xt=null,wt=null,It=null,Rt=!1}}}function o(){let Z=!1,Rt=null,xt=null,wt=null,It=null,Mt=null,Kt=null,Wt=null,Fe=null;return{setTest:function(be){Z||(be?vt(r.STENCIL_TEST):Tt(r.STENCIL_TEST))},setMask:function(be){Rt!==be&&!Z&&(r.stencilMask(be),Rt=be)},setFunc:function(be,qn,ni){(xt!==be||wt!==qn||It!==ni)&&(r.stencilFunc(be,qn,ni),xt=be,wt=qn,It=ni)},setOp:function(be,qn,ni){(Mt!==be||Kt!==qn||Wt!==ni)&&(r.stencilOp(be,qn,ni),Mt=be,Kt=qn,Wt=ni)},setLocked:function(be){Z=be},setClear:function(be){Fe!==be&&(r.clearStencil(be),Fe=be)},reset:function(){Z=!1,Rt=null,xt=null,wt=null,It=null,Mt=null,Kt=null,Wt=null,Fe=null}}}const c=new n,u=new a,h=new o,m=new WeakMap,d=new WeakMap;let g={},_={},v={},x=new WeakMap,E=[],w=null,M=!1,S=null,L=null,N=null,A=null,D=null,U=null,P=null,b=new ee(0,0,0),O=0,F=!1,Y=null,V=null,tt=null,k=null,j=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ct=0;const rt=r.getParameter(r.VERSION);rt.indexOf("WebGL")!==-1?(ct=parseFloat(/^WebGL (\d)/.exec(rt)[1]),W=ct>=1):rt.indexOf("OpenGL ES")!==-1&&(ct=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),W=ct>=2);let ht=null,I={};const $=r.getParameter(r.SCISSOR_BOX),gt=r.getParameter(r.VIEWPORT),Et=new $e().fromArray($),Lt=new $e().fromArray(gt);function kt(Z,Rt,xt,wt){const It=new Uint8Array(4),Mt=r.createTexture();r.bindTexture(Z,Mt),r.texParameteri(Z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Kt=0;Kt<xt;Kt++)Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,wt,0,r.RGBA,r.UNSIGNED_BYTE,It):r.texImage2D(Rt+Kt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,It);return Mt}const at={};at[r.TEXTURE_2D]=kt(r.TEXTURE_2D,r.TEXTURE_2D,1),at[r.TEXTURE_CUBE_MAP]=kt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[r.TEXTURE_2D_ARRAY]=kt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),at[r.TEXTURE_3D]=kt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),h.setClear(0),vt(r.DEPTH_TEST),u.setFunc(ul),ge(!1),Xe(Lv),vt(r.CULL_FACE),xe(Ra);function vt(Z){g[Z]!==!0&&(r.enable(Z),g[Z]=!0)}function Tt(Z){g[Z]!==!1&&(r.disable(Z),g[Z]=!1)}function te(Z,Rt){return v[Z]!==Rt?(r.bindFramebuffer(Z,Rt),v[Z]=Rt,Z===r.DRAW_FRAMEBUFFER&&(v[r.FRAMEBUFFER]=Rt),Z===r.FRAMEBUFFER&&(v[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function Ft(Z,Rt){let xt=E,wt=!1;if(Z){xt=x.get(Rt),xt===void 0&&(xt=[],x.set(Rt,xt));const It=Z.textures;if(xt.length!==It.length||xt[0]!==r.COLOR_ATTACHMENT0){for(let Mt=0,Kt=It.length;Mt<Kt;Mt++)xt[Mt]=r.COLOR_ATTACHMENT0+Mt;xt.length=It.length,wt=!0}}else xt[0]!==r.BACK&&(xt[0]=r.BACK,wt=!0);wt&&r.drawBuffers(xt)}function le(Z){return w!==Z?(r.useProgram(Z),w=Z,!0):!1}const an={[Hr]:r.FUNC_ADD,[lM]:r.FUNC_SUBTRACT,[cM]:r.FUNC_REVERSE_SUBTRACT};an[uM]=r.MIN,an[fM]=r.MAX;const ae={[hM]:r.ZERO,[dM]:r.ONE,[pM]:r.SRC_COLOR,[J_]:r.SRC_ALPHA,[SM]:r.SRC_ALPHA_SATURATE,[_M]:r.DST_COLOR,[gM]:r.DST_ALPHA,[mM]:r.ONE_MINUS_SRC_COLOR,[Q_]:r.ONE_MINUS_SRC_ALPHA,[xM]:r.ONE_MINUS_DST_COLOR,[vM]:r.ONE_MINUS_DST_ALPHA,[yM]:r.CONSTANT_COLOR,[MM]:r.ONE_MINUS_CONSTANT_COLOR,[EM]:r.CONSTANT_ALPHA,[bM]:r.ONE_MINUS_CONSTANT_ALPHA};function xe(Z,Rt,xt,wt,It,Mt,Kt,Wt,Fe,be){if(Z===Ra){M===!0&&(Tt(r.BLEND),M=!1);return}if(M===!1&&(vt(r.BLEND),M=!0),Z!==oM){if(Z!==S||be!==F){if((L!==Hr||D!==Hr)&&(r.blendEquation(r.FUNC_ADD),L=Hr,D=Hr),be)switch(Z){case al:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mu:r.blendFunc(r.ONE,r.ONE);break;case Nv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ov:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ae("WebGLState: Invalid blending: ",Z);break}else switch(Z){case al:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Nv:Ae("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ov:Ae("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ae("WebGLState: Invalid blending: ",Z);break}N=null,A=null,U=null,P=null,b.set(0,0,0),O=0,S=Z,F=be}return}It=It||Rt,Mt=Mt||xt,Kt=Kt||wt,(Rt!==L||It!==D)&&(r.blendEquationSeparate(an[Rt],an[It]),L=Rt,D=It),(xt!==N||wt!==A||Mt!==U||Kt!==P)&&(r.blendFuncSeparate(ae[xt],ae[wt],ae[Mt],ae[Kt]),N=xt,A=wt,U=Mt,P=Kt),(Wt.equals(b)===!1||Fe!==O)&&(r.blendColor(Wt.r,Wt.g,Wt.b,Fe),b.copy(Wt),O=Fe),S=Z,F=!1}function Oe(Z,Rt){Z.side===Ai?Tt(r.CULL_FACE):vt(r.CULL_FACE);let xt=Z.side===Wn;Rt&&(xt=!xt),ge(xt),Z.blending===al&&Z.transparent===!1?xe(Ra):xe(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),u.setFunc(Z.depthFunc),u.setTest(Z.depthTest),u.setMask(Z.depthWrite),c.setMask(Z.colorWrite);const wt=Z.stencilWrite;h.setTest(wt),wt&&(h.setMask(Z.stencilWriteMask),h.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),h.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),An(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?vt(r.SAMPLE_ALPHA_TO_COVERAGE):Tt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ge(Z){Y!==Z&&(Z?r.frontFace(r.CW):r.frontFace(r.CCW),Y=Z)}function Xe(Z){Z!==sM?(vt(r.CULL_FACE),Z!==V&&(Z===Lv?r.cullFace(r.BACK):Z===rM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Tt(r.CULL_FACE),V=Z}function sn(Z){Z!==tt&&(W&&r.lineWidth(Z),tt=Z)}function An(Z,Rt,xt){Z?(vt(r.POLYGON_OFFSET_FILL),(k!==Rt||j!==xt)&&(k=Rt,j=xt,u.getReversed()&&(Rt=-Rt),r.polygonOffset(Rt,xt))):Tt(r.POLYGON_OFFSET_FILL)}function We(Z){Z?vt(r.SCISSOR_TEST):Tt(r.SCISSOR_TEST)}function rn(Z){Z===void 0&&(Z=r.TEXTURE0+B-1),ht!==Z&&(r.activeTexture(Z),ht=Z)}function K(Z,Rt,xt){xt===void 0&&(ht===null?xt=r.TEXTURE0+B-1:xt=ht);let wt=I[xt];wt===void 0&&(wt={type:void 0,texture:void 0},I[xt]=wt),(wt.type!==Z||wt.texture!==Rt)&&(ht!==xt&&(r.activeTexture(xt),ht=xt),r.bindTexture(Z,Rt||at[Z]),wt.type=Z,wt.texture=Rt)}function Pe(){const Z=I[ht];Z!==void 0&&Z.type!==void 0&&(r.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function Ue(){try{r.compressedTexImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function z(){try{r.compressedTexImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function T(){try{r.texSubImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function Q(){try{r.texSubImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function ot(){try{r.compressedTexSubImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function dt(){try{r.compressedTexSubImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function bt(){try{r.texStorage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function Ct(){try{r.texStorage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function pt(){try{r.texImage2D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function mt(){try{r.texImage3D(...arguments)}catch(Z){Ae("WebGLState:",Z)}}function At(Z){return _[Z]!==void 0?_[Z]:r.getParameter(Z)}function Ht(Z,Rt){_[Z]!==Rt&&(r.pixelStorei(Z,Rt),_[Z]=Rt)}function Nt(Z){Et.equals(Z)===!1&&(r.scissor(Z.x,Z.y,Z.z,Z.w),Et.copy(Z))}function Dt(Z){Lt.equals(Z)===!1&&(r.viewport(Z.x,Z.y,Z.z,Z.w),Lt.copy(Z))}function Jt(Z,Rt){let xt=d.get(Rt);xt===void 0&&(xt=new WeakMap,d.set(Rt,xt));let wt=xt.get(Z);wt===void 0&&(wt=r.getUniformBlockIndex(Rt,Z.name),xt.set(Z,wt))}function Qt(Z,Rt){const wt=d.get(Rt).get(Z);m.get(Rt)!==wt&&(r.uniformBlockBinding(Rt,wt,Z.__bindingPointIndex),m.set(Rt,wt))}function ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),g={},_={},ht=null,I={},v={},x=new WeakMap,E=[],w=null,M=!1,S=null,L=null,N=null,A=null,D=null,U=null,P=null,b=new ee(0,0,0),O=0,F=!1,Y=null,V=null,tt=null,k=null,j=null,Et.set(0,0,r.canvas.width,r.canvas.height),Lt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),h.reset()}return{buffers:{color:c,depth:u,stencil:h},enable:vt,disable:Tt,bindFramebuffer:te,drawBuffers:Ft,useProgram:le,setBlending:xe,setMaterial:Oe,setFlipSided:ge,setCullFace:Xe,setLineWidth:sn,setPolygonOffset:An,setScissorTest:We,activeTexture:rn,bindTexture:K,unbindTexture:Pe,compressedTexImage2D:Ue,compressedTexImage3D:z,texImage2D:pt,texImage3D:mt,pixelStorei:Ht,getParameter:At,updateUBOMapping:Jt,uniformBlockBinding:Qt,texStorage2D:bt,texStorage3D:Ct,texSubImage2D:T,texSubImage3D:Q,compressedTexSubImage2D:ot,compressedTexSubImage3D:dt,scissor:Nt,viewport:Dt,reset:ie}}function s2(r,t,n,a,o,c,u){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Xt,g=new WeakMap,_=new Set;let v;const x=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(z,T){return E?new OffscreenCanvas(z,T):yu("canvas")}function M(z,T,Q){let ot=1;const dt=Ue(z);if((dt.width>Q||dt.height>Q)&&(ot=Q/Math.max(dt.width,dt.height)),ot<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const bt=Math.floor(ot*dt.width),Ct=Math.floor(ot*dt.height);v===void 0&&(v=w(bt,Ct));const pt=T?w(bt,Ct):v;return pt.width=bt,pt.height=Ct,pt.getContext("2d").drawImage(z,0,0,bt,Ct),ne("WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+bt+"x"+Ct+")."),pt}else return"data"in z&&ne("WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),z;return z}function S(z){return z.generateMipmaps}function L(z){r.generateMipmap(z)}function N(z){return z.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?r.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(z,T,Q,ot,dt,bt=!1){if(z!==null){if(r[z]!==void 0)return r[z];ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let Ct;ot&&(Ct=t.get("EXT_texture_norm16"),Ct||ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pt=T;if(T===r.RED&&(Q===r.FLOAT&&(pt=r.R32F),Q===r.HALF_FLOAT&&(pt=r.R16F),Q===r.UNSIGNED_BYTE&&(pt=r.R8),Q===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.R16_EXT),Q===r.SHORT&&Ct&&(pt=Ct.R16_SNORM_EXT)),T===r.RED_INTEGER&&(Q===r.UNSIGNED_BYTE&&(pt=r.R8UI),Q===r.UNSIGNED_SHORT&&(pt=r.R16UI),Q===r.UNSIGNED_INT&&(pt=r.R32UI),Q===r.BYTE&&(pt=r.R8I),Q===r.SHORT&&(pt=r.R16I),Q===r.INT&&(pt=r.R32I)),T===r.RG&&(Q===r.FLOAT&&(pt=r.RG32F),Q===r.HALF_FLOAT&&(pt=r.RG16F),Q===r.UNSIGNED_BYTE&&(pt=r.RG8),Q===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RG16_EXT),Q===r.SHORT&&Ct&&(pt=Ct.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(Q===r.UNSIGNED_BYTE&&(pt=r.RG8UI),Q===r.UNSIGNED_SHORT&&(pt=r.RG16UI),Q===r.UNSIGNED_INT&&(pt=r.RG32UI),Q===r.BYTE&&(pt=r.RG8I),Q===r.SHORT&&(pt=r.RG16I),Q===r.INT&&(pt=r.RG32I)),T===r.RGB_INTEGER&&(Q===r.UNSIGNED_BYTE&&(pt=r.RGB8UI),Q===r.UNSIGNED_SHORT&&(pt=r.RGB16UI),Q===r.UNSIGNED_INT&&(pt=r.RGB32UI),Q===r.BYTE&&(pt=r.RGB8I),Q===r.SHORT&&(pt=r.RGB16I),Q===r.INT&&(pt=r.RGB32I)),T===r.RGBA_INTEGER&&(Q===r.UNSIGNED_BYTE&&(pt=r.RGBA8UI),Q===r.UNSIGNED_SHORT&&(pt=r.RGBA16UI),Q===r.UNSIGNED_INT&&(pt=r.RGBA32UI),Q===r.BYTE&&(pt=r.RGBA8I),Q===r.SHORT&&(pt=r.RGBA16I),Q===r.INT&&(pt=r.RGBA32I)),T===r.RGB&&(Q===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RGB16_EXT),Q===r.SHORT&&Ct&&(pt=Ct.RGB16_SNORM_EXT),Q===r.UNSIGNED_INT_5_9_9_9_REV&&(pt=r.RGB9_E5),Q===r.UNSIGNED_INT_10F_11F_11F_REV&&(pt=r.R11F_G11F_B10F)),T===r.RGBA){const mt=bt?Su:Ee.getTransfer(dt);Q===r.FLOAT&&(pt=r.RGBA32F),Q===r.HALF_FLOAT&&(pt=r.RGBA16F),Q===r.UNSIGNED_BYTE&&(pt=mt===Be?r.SRGB8_ALPHA8:r.RGBA8),Q===r.UNSIGNED_SHORT&&Ct&&(pt=Ct.RGBA16_EXT),Q===r.SHORT&&Ct&&(pt=Ct.RGBA16_SNORM_EXT),Q===r.UNSIGNED_SHORT_4_4_4_4&&(pt=r.RGBA4),Q===r.UNSIGNED_SHORT_5_5_5_1&&(pt=r.RGB5_A1)}return(pt===r.R16F||pt===r.R32F||pt===r.RG16F||pt===r.RG32F||pt===r.RGBA16F||pt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),pt}function D(z,T){let Q;return z?T===null||T===$i||T===hl?Q=r.DEPTH24_STENCIL8:T===Ii?Q=r.DEPTH32F_STENCIL8:T===fl&&(Q=r.DEPTH24_STENCIL8,ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===$i||T===hl?Q=r.DEPTH_COMPONENT24:T===Ii?Q=r.DEPTH_COMPONENT32F:T===fl&&(Q=r.DEPTH_COMPONENT16),Q}function U(z,T){return S(z)===!0||z.isFramebufferTexture&&z.minFilter!==On&&z.minFilter!==Fn?Math.log2(Math.max(T.width,T.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?T.mipmaps.length:1}function P(z){const T=z.target;T.removeEventListener("dispose",P),O(T),T.isVideoTexture&&g.delete(T),T.isHTMLTexture&&_.delete(T)}function b(z){const T=z.target;T.removeEventListener("dispose",b),Y(T)}function O(z){const T=a.get(z);if(T.__webglInit===void 0)return;const Q=z.source,ot=x.get(Q);if(ot){const dt=ot[T.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&F(z),Object.keys(ot).length===0&&x.delete(Q)}a.remove(z)}function F(z){const T=a.get(z);r.deleteTexture(T.__webglTexture);const Q=z.source,ot=x.get(Q);delete ot[T.__cacheKey],u.memory.textures--}function Y(z){const T=a.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),a.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(T.__webglFramebuffer[ot]))for(let dt=0;dt<T.__webglFramebuffer[ot].length;dt++)r.deleteFramebuffer(T.__webglFramebuffer[ot][dt]);else r.deleteFramebuffer(T.__webglFramebuffer[ot]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ot])}else{if(Array.isArray(T.__webglFramebuffer))for(let ot=0;ot<T.__webglFramebuffer.length;ot++)r.deleteFramebuffer(T.__webglFramebuffer[ot]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ot=0;ot<T.__webglColorRenderbuffer.length;ot++)T.__webglColorRenderbuffer[ot]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ot]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Q=z.textures;for(let ot=0,dt=Q.length;ot<dt;ot++){const bt=a.get(Q[ot]);bt.__webglTexture&&(r.deleteTexture(bt.__webglTexture),u.memory.textures--),a.remove(Q[ot])}a.remove(z)}let V=0;function tt(){V=0}function k(){return V}function j(z){V=z}function B(){const z=V;return z>=o.maxTextures&&ne("WebGLTextures: Trying to use "+(z+1)+" texture units while this GPU supports only "+o.maxTextures),V+=1,z}function W(z){const T=[];return T.push(z.wrapS),T.push(z.wrapT),T.push(z.wrapR||0),T.push(z.magFilter),T.push(z.minFilter),T.push(z.anisotropy),T.push(z.internalFormat),T.push(z.format),T.push(z.type),T.push(z.generateMipmaps),T.push(z.premultiplyAlpha),T.push(z.flipY),T.push(z.unpackAlignment),T.push(z.colorSpace),T.join()}function ct(z,T){const Q=a.get(z);if(z.isVideoTexture&&K(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&Q.__version!==z.version){const ot=z.image;if(ot===null)ne("WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(Q,z,T);return}}else z.isExternalTexture&&(Q.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,Q.__webglTexture,r.TEXTURE0+T)}function rt(z,T){const Q=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&Q.__version!==z.version){Tt(Q,z,T);return}else z.isExternalTexture&&(Q.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,Q.__webglTexture,r.TEXTURE0+T)}function ht(z,T){const Q=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&Q.__version!==z.version){Tt(Q,z,T);return}n.bindTexture(r.TEXTURE_3D,Q.__webglTexture,r.TEXTURE0+T)}function I(z,T){const Q=a.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&Q.__version!==z.version){te(Q,z,T);return}n.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture,r.TEXTURE0+T)}const $={[gu]:r.REPEAT,[Aa]:r.CLAMP_TO_EDGE,[Ad]:r.MIRRORED_REPEAT},gt={[On]:r.NEAREST,[RM]:r.NEAREST_MIPMAP_NEAREST,[Nc]:r.NEAREST_MIPMAP_LINEAR,[Fn]:r.LINEAR,[Gh]:r.LINEAR_MIPMAP_NEAREST,[Ps]:r.LINEAR_MIPMAP_LINEAR},Et={[UM]:r.NEVER,[IM]:r.ALWAYS,[LM]:r.LESS,[yp]:r.LEQUAL,[NM]:r.EQUAL,[Mp]:r.GEQUAL,[OM]:r.GREATER,[PM]:r.NOTEQUAL};function Lt(z,T){if(T.type===Ii&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Fn||T.magFilter===Gh||T.magFilter===Nc||T.magFilter===Ps||T.minFilter===Fn||T.minFilter===Gh||T.minFilter===Nc||T.minFilter===Ps)&&ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(z,r.TEXTURE_WRAP_S,$[T.wrapS]),r.texParameteri(z,r.TEXTURE_WRAP_T,$[T.wrapT]),(z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY)&&r.texParameteri(z,r.TEXTURE_WRAP_R,$[T.wrapR]),r.texParameteri(z,r.TEXTURE_MAG_FILTER,gt[T.magFilter]),r.texParameteri(z,r.TEXTURE_MIN_FILTER,gt[T.minFilter]),T.compareFunction&&(r.texParameteri(z,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(z,r.TEXTURE_COMPARE_FUNC,Et[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===On||T.minFilter!==Nc&&T.minFilter!==Ps||T.type===Ii&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||a.get(T).__currentAnisotropy){const Q=t.get("EXT_texture_filter_anisotropic");r.texParameterf(z,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,o.getMaxAnisotropy())),a.get(T).__currentAnisotropy=T.anisotropy}}}function kt(z,T){let Q=!1;z.__webglInit===void 0&&(z.__webglInit=!0,T.addEventListener("dispose",P));const ot=T.source;let dt=x.get(ot);dt===void 0&&(dt={},x.set(ot,dt));const bt=W(T);if(bt!==z.__cacheKey){dt[bt]===void 0&&(dt[bt]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,Q=!0),dt[bt].usedTimes++;const Ct=dt[z.__cacheKey];Ct!==void 0&&(dt[z.__cacheKey].usedTimes--,Ct.usedTimes===0&&F(T)),z.__cacheKey=bt,z.__webglTexture=dt[bt].texture}return Q}function at(z,T,Q){return Math.floor(Math.floor(z/Q)/T)}function vt(z,T,Q,ot){const bt=z.updateRanges;if(bt.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,Q,ot,T.data);else{bt.sort((Ht,Nt)=>Ht.start-Nt.start);let Ct=0;for(let Ht=1;Ht<bt.length;Ht++){const Nt=bt[Ct],Dt=bt[Ht],Jt=Nt.start+Nt.count,Qt=at(Dt.start,T.width,4),ie=at(Nt.start,T.width,4);Dt.start<=Jt+1&&Qt===ie&&at(Dt.start+Dt.count-1,T.width,4)===Qt?Nt.count=Math.max(Nt.count,Dt.start+Dt.count-Nt.start):(++Ct,bt[Ct]=Dt)}bt.length=Ct+1;const pt=n.getParameter(r.UNPACK_ROW_LENGTH),mt=n.getParameter(r.UNPACK_SKIP_PIXELS),At=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let Ht=0,Nt=bt.length;Ht<Nt;Ht++){const Dt=bt[Ht],Jt=Math.floor(Dt.start/4),Qt=Math.ceil(Dt.count/4),ie=Jt%T.width,Z=Math.floor(Jt/T.width),Rt=Qt,xt=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,ie),n.pixelStorei(r.UNPACK_SKIP_ROWS,Z),n.texSubImage2D(r.TEXTURE_2D,0,ie,Z,Rt,xt,Q,ot,T.data)}z.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,pt),n.pixelStorei(r.UNPACK_SKIP_PIXELS,mt),n.pixelStorei(r.UNPACK_SKIP_ROWS,At)}}function Tt(z,T,Q){let ot=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ot=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ot=r.TEXTURE_3D);const dt=kt(z,T),bt=T.source;n.bindTexture(ot,z.__webglTexture,r.TEXTURE0+Q);const Ct=a.get(bt);if(bt.version!==Ct.__version||dt===!0){if(n.activeTexture(r.TEXTURE0+Q),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const xt=Ee.getPrimaries(Ee.workingColorSpace),wt=T.colorSpace===Ta?null:Ee.getPrimaries(T.colorSpace),It=T.colorSpace===Ta||xt===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,It)}n.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let mt=M(T.image,!1,o.maxTextureSize);mt=Pe(T,mt);const At=c.convert(T.format,T.colorSpace),Ht=c.convert(T.type);let Nt=A(T.internalFormat,At,Ht,T.normalized,T.colorSpace,T.isVideoTexture);Lt(ot,T);let Dt;const Jt=T.mipmaps,Qt=T.isVideoTexture!==!0,ie=Ct.__version===void 0||dt===!0,Z=bt.dataReady,Rt=U(T,mt);if(T.isDepthTexture)Nt=D(T.format===Is,T.type),ie&&(Qt?n.texStorage2D(r.TEXTURE_2D,1,Nt,mt.width,mt.height):n.texImage2D(r.TEXTURE_2D,0,Nt,mt.width,mt.height,0,At,Ht,null));else if(T.isDataTexture)if(Jt.length>0){Qt&&ie&&n.texStorage2D(r.TEXTURE_2D,Rt,Nt,Jt[0].width,Jt[0].height);for(let xt=0,wt=Jt.length;xt<wt;xt++)Dt=Jt[xt],Qt?Z&&n.texSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Ht,Dt.data):n.texImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,At,Ht,Dt.data);T.generateMipmaps=!1}else Qt?(ie&&n.texStorage2D(r.TEXTURE_2D,Rt,Nt,mt.width,mt.height),Z&&vt(T,mt,At,Ht)):n.texImage2D(r.TEXTURE_2D,0,Nt,mt.width,mt.height,0,At,Ht,mt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Qt&&ie&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Nt,Jt[0].width,Jt[0].height,mt.depth);for(let xt=0,wt=Jt.length;xt<wt;xt++)if(Dt=Jt[xt],T.format!==zi)if(At!==null)if(Qt){if(Z)if(T.layerUpdates.size>0){const It=E_(Dt.width,Dt.height,T.format,T.type);for(const Mt of T.layerUpdates){const Kt=Dt.data.subarray(Mt*It/Dt.data.BYTES_PER_ELEMENT,(Mt+1)*It/Dt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,Mt,Dt.width,Dt.height,1,At,Kt)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Dt.width,Dt.height,mt.depth,At,Dt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,xt,Nt,Dt.width,Dt.height,mt.depth,0,Dt.data,0,0);else ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qt?Z&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Dt.width,Dt.height,mt.depth,At,Ht,Dt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,xt,Nt,Dt.width,Dt.height,mt.depth,0,At,Ht,Dt.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{Qt&&ie&&n.texStorage2D(r.TEXTURE_2D,Rt,Nt,Jt[0].width,Jt[0].height);for(let xt=0,wt=Jt.length;xt<wt;xt++)Dt=Jt[xt],T.format!==zi?At!==null?Qt?Z&&n.compressedTexSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Dt.data):n.compressedTexImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,Dt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?Z&&n.texSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Ht,Dt.data):n.texImage2D(r.TEXTURE_2D,xt,Nt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(T.isDataArrayTexture)if(Qt){if(ie&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Nt,mt.width,mt.height,mt.depth),Z)if(T.layerUpdates.size>0){const xt=E_(mt.width,mt.height,T.format,T.type);for(const wt of T.layerUpdates){const It=mt.data.subarray(wt*xt/mt.data.BYTES_PER_ELEMENT,(wt+1)*xt/mt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,wt,mt.width,mt.height,1,At,Ht,It)}T.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,At,Ht,mt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Nt,mt.width,mt.height,mt.depth,0,At,Ht,mt.data);else if(T.isData3DTexture)Qt?(ie&&n.texStorage3D(r.TEXTURE_3D,Rt,Nt,mt.width,mt.height,mt.depth),Z&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,At,Ht,mt.data)):n.texImage3D(r.TEXTURE_3D,0,Nt,mt.width,mt.height,mt.depth,0,At,Ht,mt.data);else if(T.isFramebufferTexture){if(ie)if(Qt)n.texStorage2D(r.TEXTURE_2D,Rt,Nt,mt.width,mt.height);else{let xt=mt.width,wt=mt.height;for(let It=0;It<Rt;It++)n.texImage2D(r.TEXTURE_2D,It,Nt,xt,wt,0,At,Ht,null),xt>>=1,wt>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const xt=r.canvas;if(xt.hasAttribute("layoutsubtree")||xt.setAttribute("layoutsubtree","true"),mt.parentNode!==xt){xt.appendChild(mt),_.add(T),xt.onpaint=wt=>{const It=wt.changedElements;for(const Mt of _)It.includes(Mt.image)&&(Mt.needsUpdate=!0)},xt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,mt);else{const It=r.RGBA,Mt=r.RGBA,Kt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,It,Mt,Kt,mt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Jt.length>0){if(Qt&&ie){const xt=Ue(Jt[0]);n.texStorage2D(r.TEXTURE_2D,Rt,Nt,xt.width,xt.height)}for(let xt=0,wt=Jt.length;xt<wt;xt++)Dt=Jt[xt],Qt?Z&&n.texSubImage2D(r.TEXTURE_2D,xt,0,0,At,Ht,Dt):n.texImage2D(r.TEXTURE_2D,xt,Nt,At,Ht,Dt);T.generateMipmaps=!1}else if(Qt){if(ie){const xt=Ue(mt);n.texStorage2D(r.TEXTURE_2D,Rt,Nt,xt.width,xt.height)}Z&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Ht,mt)}else n.texImage2D(r.TEXTURE_2D,0,Nt,At,Ht,mt);S(T)&&L(ot),Ct.__version=bt.version,T.onUpdate&&T.onUpdate(T)}z.__version=T.version}function te(z,T,Q){if(T.image.length!==6)return;const ot=kt(z,T),dt=T.source;n.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+Q);const bt=a.get(dt);if(dt.version!==bt.__version||ot===!0){n.activeTexture(r.TEXTURE0+Q);const Ct=Ee.getPrimaries(Ee.workingColorSpace),pt=T.colorSpace===Ta?null:Ee.getPrimaries(T.colorSpace),mt=T.colorSpace===Ta||Ct===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const At=T.isCompressedTexture||T.image[0].isCompressedTexture,Ht=T.image[0]&&T.image[0].isDataTexture,Nt=[];for(let Mt=0;Mt<6;Mt++)!At&&!Ht?Nt[Mt]=M(T.image[Mt],!0,o.maxCubemapSize):Nt[Mt]=Ht?T.image[Mt].image:T.image[Mt],Nt[Mt]=Pe(T,Nt[Mt]);const Dt=Nt[0],Jt=c.convert(T.format,T.colorSpace),Qt=c.convert(T.type),ie=A(T.internalFormat,Jt,Qt,T.normalized,T.colorSpace),Z=T.isVideoTexture!==!0,Rt=bt.__version===void 0||ot===!0,xt=dt.dataReady;let wt=U(T,Dt);Lt(r.TEXTURE_CUBE_MAP,T);let It;if(At){Z&&Rt&&n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ie,Dt.width,Dt.height);for(let Mt=0;Mt<6;Mt++){It=Nt[Mt].mipmaps;for(let Kt=0;Kt<It.length;Kt++){const Wt=It[Kt];T.format!==zi?Jt!==null?Z?xt&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt,0,0,Wt.width,Wt.height,Jt,Wt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt,ie,Wt.width,Wt.height,0,Wt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt,0,0,Wt.width,Wt.height,Jt,Qt,Wt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt,ie,Wt.width,Wt.height,0,Jt,Qt,Wt.data)}}}else{if(It=T.mipmaps,Z&&Rt){It.length>0&&wt++;const Mt=Ue(Nt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ie,Mt.width,Mt.height)}for(let Mt=0;Mt<6;Mt++)if(Ht){Z?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Nt[Mt].width,Nt[Mt].height,Jt,Qt,Nt[Mt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ie,Nt[Mt].width,Nt[Mt].height,0,Jt,Qt,Nt[Mt].data);for(let Kt=0;Kt<It.length;Kt++){const Fe=It[Kt].image[Mt].image;Z?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt+1,0,0,Fe.width,Fe.height,Jt,Qt,Fe.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt+1,ie,Fe.width,Fe.height,0,Jt,Qt,Fe.data)}}else{Z?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Jt,Qt,Nt[Mt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ie,Jt,Qt,Nt[Mt]);for(let Kt=0;Kt<It.length;Kt++){const Wt=It[Kt];Z?xt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt+1,0,0,Jt,Qt,Wt.image[Mt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt+1,ie,Jt,Qt,Wt.image[Mt])}}}S(T)&&L(r.TEXTURE_CUBE_MAP),bt.__version=dt.version,T.onUpdate&&T.onUpdate(T)}z.__version=T.version}function Ft(z,T,Q,ot,dt,bt){const Ct=c.convert(Q.format,Q.colorSpace),pt=c.convert(Q.type),mt=A(Q.internalFormat,Ct,pt,Q.normalized,Q.colorSpace),At=a.get(T),Ht=a.get(Q);if(Ht.__renderTarget=T,!At.__hasExternalTextures){const Nt=Math.max(1,T.width>>bt),Dt=Math.max(1,T.height>>bt);dt===r.TEXTURE_3D||dt===r.TEXTURE_2D_ARRAY?n.texImage3D(dt,bt,mt,Nt,Dt,T.depth,0,Ct,pt,null):n.texImage2D(dt,bt,mt,Nt,Dt,0,Ct,pt,null)}n.bindFramebuffer(r.FRAMEBUFFER,z),rn(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ot,dt,Ht.__webglTexture,0,We(T)):(dt===r.TEXTURE_2D||dt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ot,dt,Ht.__webglTexture,bt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function le(z,T,Q){if(r.bindRenderbuffer(r.RENDERBUFFER,z),T.depthBuffer){const ot=T.depthTexture,dt=ot&&ot.isDepthTexture?ot.type:null,bt=D(T.stencilBuffer,dt),Ct=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;rn(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(T),bt,T.width,T.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(T),bt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,bt,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ct,r.RENDERBUFFER,z)}else{const ot=T.textures;for(let dt=0;dt<ot.length;dt++){const bt=ot[dt],Ct=c.convert(bt.format,bt.colorSpace),pt=c.convert(bt.type),mt=A(bt.internalFormat,Ct,pt,bt.normalized,bt.colorSpace);rn(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(T),mt,T.width,T.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(T),mt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,mt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function an(z,T,Q){const ot=T.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,z),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const dt=a.get(T.depthTexture);if(dt.__renderTarget=T,(!dt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ot){if(dt.__webglInit===void 0&&(dt.__webglInit=!0,T.depthTexture.addEventListener("dispose",P)),dt.__webglTexture===void 0){dt.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T.depthTexture);const At=c.convert(T.depthTexture.format),Ht=c.convert(T.depthTexture.type);let Nt;T.depthTexture.format===Ca?Nt=r.DEPTH_COMPONENT24:T.depthTexture.format===Is&&(Nt=r.DEPTH24_STENCIL8);for(let Dt=0;Dt<6;Dt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,Nt,T.width,T.height,0,At,Ht,null)}}else ct(T.depthTexture,0);const bt=dt.__webglTexture,Ct=We(T),pt=ot?r.TEXTURE_CUBE_MAP_POSITIVE_X+Q:r.TEXTURE_2D,mt=T.depthTexture.format===Is?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===Ca)rn(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,pt,bt,0,Ct):r.framebufferTexture2D(r.FRAMEBUFFER,mt,pt,bt,0);else if(T.depthTexture.format===Is)rn(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,pt,bt,0,Ct):r.framebufferTexture2D(r.FRAMEBUFFER,mt,pt,bt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(z){const T=a.get(z),Q=z.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==z.depthTexture){const ot=z.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ot){const dt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ot.removeEventListener("dispose",dt)};ot.addEventListener("dispose",dt),T.__depthDisposeCallback=dt}T.__boundDepthTexture=ot}if(z.depthTexture&&!T.__autoAllocateDepthBuffer)if(Q)for(let ot=0;ot<6;ot++)an(T.__webglFramebuffer[ot],z,ot);else{const ot=z.texture.mipmaps;ot&&ot.length>0?an(T.__webglFramebuffer[0],z,0):an(T.__webglFramebuffer,z,0)}else if(Q){T.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ot]),T.__webglDepthbuffer[ot]===void 0)T.__webglDepthbuffer[ot]=r.createRenderbuffer(),le(T.__webglDepthbuffer[ot],z,!1);else{const dt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=T.__webglDepthbuffer[ot];r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,bt)}}else{const ot=z.texture.mipmaps;if(ot&&ot.length>0?n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),le(T.__webglDepthbuffer,z,!1);else{const dt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,bt)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(z,T,Q){const ot=a.get(z);T!==void 0&&Ft(ot.__webglFramebuffer,z,z.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Q!==void 0&&ae(z)}function Oe(z){const T=z.texture,Q=a.get(z),ot=a.get(T);z.addEventListener("dispose",b);const dt=z.textures,bt=z.isWebGLCubeRenderTarget===!0,Ct=dt.length>1;if(Ct||(ot.__webglTexture===void 0&&(ot.__webglTexture=r.createTexture()),ot.__version=T.version,u.memory.textures++),bt){Q.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(T.mipmaps&&T.mipmaps.length>0){Q.__webglFramebuffer[pt]=[];for(let mt=0;mt<T.mipmaps.length;mt++)Q.__webglFramebuffer[pt][mt]=r.createFramebuffer()}else Q.__webglFramebuffer[pt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Q.__webglFramebuffer=[];for(let pt=0;pt<T.mipmaps.length;pt++)Q.__webglFramebuffer[pt]=r.createFramebuffer()}else Q.__webglFramebuffer=r.createFramebuffer();if(Ct)for(let pt=0,mt=dt.length;pt<mt;pt++){const At=a.get(dt[pt]);At.__webglTexture===void 0&&(At.__webglTexture=r.createTexture(),u.memory.textures++)}if(z.samples>0&&rn(z)===!1){Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let pt=0;pt<dt.length;pt++){const mt=dt[pt];Q.__webglColorRenderbuffer[pt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Q.__webglColorRenderbuffer[pt]);const At=c.convert(mt.format,mt.colorSpace),Ht=c.convert(mt.type),Nt=A(mt.internalFormat,At,Ht,mt.normalized,mt.colorSpace,z.isXRRenderTarget===!0),Dt=We(z);r.renderbufferStorageMultisample(r.RENDERBUFFER,Dt,Nt,z.width,z.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.RENDERBUFFER,Q.__webglColorRenderbuffer[pt])}r.bindRenderbuffer(r.RENDERBUFFER,null),z.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),le(Q.__webglDepthRenderbuffer,z,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(bt){n.bindTexture(r.TEXTURE_CUBE_MAP,ot.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,T);for(let pt=0;pt<6;pt++)if(T.mipmaps&&T.mipmaps.length>0)for(let mt=0;mt<T.mipmaps.length;mt++)Ft(Q.__webglFramebuffer[pt][mt],z,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,mt);else Ft(Q.__webglFramebuffer[pt],z,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);S(T)&&L(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ct){for(let pt=0,mt=dt.length;pt<mt;pt++){const At=dt[pt],Ht=a.get(At);let Nt=r.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Nt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Nt,Ht.__webglTexture),Lt(Nt,At),Ft(Q.__webglFramebuffer,z,At,r.COLOR_ATTACHMENT0+pt,Nt,0),S(At)&&L(Nt)}n.unbindTexture()}else{let pt=r.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(pt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(pt,ot.__webglTexture),Lt(pt,T),T.mipmaps&&T.mipmaps.length>0)for(let mt=0;mt<T.mipmaps.length;mt++)Ft(Q.__webglFramebuffer[mt],z,T,r.COLOR_ATTACHMENT0,pt,mt);else Ft(Q.__webglFramebuffer,z,T,r.COLOR_ATTACHMENT0,pt,0);S(T)&&L(pt),n.unbindTexture()}z.depthBuffer&&ae(z)}function ge(z){const T=z.textures;for(let Q=0,ot=T.length;Q<ot;Q++){const dt=T[Q];if(S(dt)){const bt=N(z),Ct=a.get(dt).__webglTexture;n.bindTexture(bt,Ct),L(bt),n.unbindTexture()}}}const Xe=[],sn=[];function An(z){if(z.samples>0){if(rn(z)===!1){const T=z.textures,Q=z.width,ot=z.height;let dt=r.COLOR_BUFFER_BIT;const bt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=a.get(z),pt=T.length>1;if(pt)for(let At=0;At<T.length;At++)n.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const mt=z.texture.mipmaps;mt&&mt.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let At=0;At<T.length;At++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(dt|=r.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(dt|=r.STENCIL_BUFFER_BIT)),pt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const Ht=a.get(T[At]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ht,0)}r.blitFramebuffer(0,0,Q,ot,0,0,Q,ot,dt,r.NEAREST),m===!0&&(Xe.length=0,sn.length=0,Xe.push(r.COLOR_ATTACHMENT0+At),z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&(Xe.push(bt),sn.push(bt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,sn)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Xe))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let At=0;At<T.length;At++){n.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const Ht=a.get(T[At]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,Ht,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&m){const T=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function We(z){return Math.min(o.maxSamples,z.samples)}function rn(z){const T=a.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function K(z){const T=u.render.frame;g.get(z)!==T&&(g.set(z,T),z.update())}function Pe(z,T){const Q=z.colorSpace,ot=z.format,dt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||Q!==xu&&Q!==Ta&&(Ee.getTransfer(Q)===Be?(ot!==zi||dt!==di)&&ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ae("WebGLTextures: Unsupported texture color space:",Q)),T}function Ue(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(d.width=z.naturalWidth||z.width,d.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(d.width=z.displayWidth,d.height=z.displayHeight):(d.width=z.width,d.height=z.height),d}this.allocateTextureUnit=B,this.resetTextureUnits=tt,this.getTextureUnits=k,this.setTextureUnits=j,this.setTexture2D=ct,this.setTexture2DArray=rt,this.setTexture3D=ht,this.setTextureCube=I,this.rebindTextures=xe,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=An,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Ft,this.useMultisampledRTT=rn,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function r2(r,t){function n(a,o=Ta){let c;const u=Ee.getTransfer(o);if(a===di)return r.UNSIGNED_BYTE;if(a===mp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===gp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===lx)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===cx)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===rx)return r.BYTE;if(a===ox)return r.SHORT;if(a===fl)return r.UNSIGNED_SHORT;if(a===pp)return r.INT;if(a===$i)return r.UNSIGNED_INT;if(a===Ii)return r.FLOAT;if(a===Hi)return r.HALF_FLOAT;if(a===ux)return r.ALPHA;if(a===fx)return r.RGB;if(a===zi)return r.RGBA;if(a===Ca)return r.DEPTH_COMPONENT;if(a===Is)return r.DEPTH_STENCIL;if(a===vp)return r.RED;if(a===_p)return r.RED_INTEGER;if(a===Hs)return r.RG;if(a===xp)return r.RG_INTEGER;if(a===Sp)return r.RGBA_INTEGER;if(a===cu||a===uu||a===fu||a===hu)if(u===Be)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===cu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===uu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===fu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===hu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===cu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===uu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===fu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===hu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Rd||a===wd||a===Cd||a===Dd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Rd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===wd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Cd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Dd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Ud||a===Ld||a===Nd||a===Od||a===Pd||a===vu||a===Id)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Ud||a===Ld)return u===Be?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Nd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===Od)return c.COMPRESSED_R11_EAC;if(a===Pd)return c.COMPRESSED_SIGNED_R11_EAC;if(a===vu)return c.COMPRESSED_RG11_EAC;if(a===Id)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===zd||a===Bd||a===Fd||a===Hd||a===Gd||a===Vd||a===kd||a===Xd||a===Wd||a===qd||a===Yd||a===Zd||a===Kd||a===Jd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===zd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Bd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Fd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Hd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Gd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Vd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===kd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Xd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Wd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===qd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Yd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Zd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Kd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Jd)return u===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===Qd||a===jd||a===$d)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===Qd)return u===Be?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===jd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===$d)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===tp||a===ep||a===_u||a===np)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===tp)return c.COMPRESSED_RED_RGTC1_EXT;if(a===ep)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===_u)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===np)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===hl?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const o2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l2=`
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

}`;class c2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new yx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new ei({vertexShader:o2,fragmentShader:l2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ze(new zs(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class u2 extends Vs{constructor(t,n){super();const a=this;let o=null,c=1,u=null,h="local-floor",m=1,d=null,g=null,_=null,v=null,x=null,E=null;const w=typeof XRWebGLBinding<"u",M=new c2,S={},L=n.getContextAttributes();let N=null,A=null;const D=[],U=[],P=new Xt;let b=null,O=null;const F=new Ti;F.viewport=new $e;const Y=new Ti;Y.viewport=new $e;const V=[F,Y],tt=new v1;let k=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let vt=D[at];return vt===void 0&&(vt=new Zh,D[at]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(at){let vt=D[at];return vt===void 0&&(vt=new Zh,D[at]=vt),vt.getGripSpace()},this.getHand=function(at){let vt=D[at];return vt===void 0&&(vt=new Zh,D[at]=vt),vt.getHandSpace()};function B(at){const vt=U.indexOf(at.inputSource);if(vt===-1)return;const Tt=D[vt];Tt!==void 0&&(Tt.update(at.inputSource,at.frame,d||u),Tt.dispatchEvent({type:at.type,data:at.inputSource}))}function W(){o.removeEventListener("select",B),o.removeEventListener("selectstart",B),o.removeEventListener("selectend",B),o.removeEventListener("squeeze",B),o.removeEventListener("squeezestart",B),o.removeEventListener("squeezeend",B),o.removeEventListener("end",W),o.removeEventListener("inputsourceschange",ct);for(let at=0;at<D.length;at++){const vt=U[at];vt!==null&&(U[at]=null,D[at].disconnect(vt))}k=null,j=null,M.reset();for(const at in S)delete S[at];if(t.setRenderTarget(N),x=null,v=null,_=null,o=null,A=null,kt.stop(),a.isPresenting=!1,t.setPixelRatio(b),t.setSize(P.width,P.height,!1),O!==null){const at=O.camera;at.fov=O.fov,at.zoom=O.zoom,at.updateProjectionMatrix(),O=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){c=at,a.isPresenting===!0&&ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){h=at,a.isPresenting===!0&&ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||u},this.setReferenceSpace=function(at){d=at},this.getBaseLayer=function(){return v!==null?v:x},this.getBinding=function(){return _===null&&w&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(at){if(o=at,o!==null){if(N=t.getRenderTarget(),o.addEventListener("select",B),o.addEventListener("selectstart",B),o.addEventListener("selectend",B),o.addEventListener("squeeze",B),o.addEventListener("squeezestart",B),o.addEventListener("squeezeend",B),o.addEventListener("end",W),o.addEventListener("inputsourceschange",ct),L.xrCompatible!==!0&&await n.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(P),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,te=null,Ft=null;L.depth&&(Ft=L.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Tt=L.stencil?Is:Ca,te=L.stencil?hl:$i);const le={colorFormat:n.RGBA8,depthFormat:Ft,scaleFactor:c};_=this.getBinding(),v=_.createProjectionLayer(le),o.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),A=new Ri(v.textureWidth,v.textureHeight,{format:zi,type:di,depthTexture:new gl(v.textureWidth,v.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:L.stencil,colorSpace:t.outputColorSpace,samples:L.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const Tt={antialias:L.antialias,alpha:!0,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(o,n,Tt),o.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new Ri(x.framebufferWidth,x.framebufferHeight,{format:zi,type:di,colorSpace:t.outputColorSpace,stencilBuffer:L.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),d=null,u=await o.requestReferenceSpace(h),kt.setContext(o),kt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function ct(at){for(let vt=0;vt<at.removed.length;vt++){const Tt=at.removed[vt],te=U.indexOf(Tt);te>=0&&(U[te]=null,D[te].disconnect(Tt))}for(let vt=0;vt<at.added.length;vt++){const Tt=at.added[vt];let te=U.indexOf(Tt);if(te===-1){for(let le=0;le<D.length;le++)if(le>=U.length){U.push(Tt),te=le;break}else if(U[le]===null){U[le]=Tt,te=le;break}if(te===-1)break}const Ft=D[te];Ft&&Ft.connect(Tt)}}const rt=new G,ht=new G;function I(at,vt,Tt){rt.setFromMatrixPosition(vt.matrixWorld),ht.setFromMatrixPosition(Tt.matrixWorld);const te=rt.distanceTo(ht),Ft=vt.projectionMatrix.elements,le=Tt.projectionMatrix.elements,an=Ft[14]/(Ft[10]-1),ae=Ft[14]/(Ft[10]+1),xe=(Ft[9]+1)/Ft[5],Oe=(Ft[9]-1)/Ft[5],ge=(Ft[8]-1)/Ft[0],Xe=(le[8]+1)/le[0],sn=an*ge,An=an*Xe,We=te/(-ge+Xe),rn=We*-ge;if(vt.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(rn),at.translateZ(We),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),Ft[10]===-1)at.projectionMatrix.copy(vt.projectionMatrix),at.projectionMatrixInverse.copy(vt.projectionMatrixInverse);else{const K=an+We,Pe=ae+We,Ue=sn-rn,z=An+(te-rn),T=xe*ae/Pe*K,Q=Oe*ae/Pe*K;at.projectionMatrix.makePerspective(Ue,z,T,Q,K,Pe),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function $(at,vt){vt===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(vt.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(o===null)return;let vt=at.near,Tt=at.far;M.texture!==null&&(M.depthNear>0&&(vt=M.depthNear),M.depthFar>0&&(Tt=M.depthFar)),tt.near=Y.near=F.near=vt,tt.far=Y.far=F.far=Tt,(k!==tt.near||j!==tt.far)&&(o.updateRenderState({depthNear:tt.near,depthFar:tt.far}),k=tt.near,j=tt.far),tt.layers.mask=at.layers.mask|6,F.layers.mask=tt.layers.mask&-5,Y.layers.mask=tt.layers.mask&-3;const te=at.parent,Ft=tt.cameras;$(tt,te);for(let le=0;le<Ft.length;le++)$(Ft[le],te);Ft.length===2?I(tt,F,Y):tt.projectionMatrix.copy(F.projectionMatrix),O===null&&at.isPerspectiveCamera&&(O={camera:at,fov:at.fov,zoom:at.zoom}),gt(at,tt,te)};function gt(at,vt,Tt){Tt===null?at.matrix.copy(vt.matrixWorld):(at.matrix.copy(Tt.matrixWorld),at.matrix.invert(),at.matrix.multiply(vt.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(vt.projectionMatrix),at.projectionMatrixInverse.copy(vt.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=pl*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return tt},this.getFoveation=function(){if(!(v===null&&x===null))return m},this.setFoveation=function(at){m=at,v!==null&&(v.fixedFoveation=at),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=at)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(tt)},this.getCameraTexture=function(at){return S[at]};let Et=null;function Lt(at,vt){if(g=vt.getViewerPose(d||u),E=vt,g!==null){const Tt=g.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let te=!1;Tt.length!==tt.cameras.length&&(tt.cameras.length=0,te=!0);for(let ae=0;ae<Tt.length;ae++){const xe=Tt[ae];let Oe=null;if(x!==null)Oe=x.getViewport(xe);else{const Xe=_.getViewSubImage(v,xe);Oe=Xe.viewport,ae===0&&(t.setRenderTargetTextures(A,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(A))}let ge=V[ae];ge===void 0&&(ge=new Ti,ge.layers.enable(ae),ge.viewport=new $e,V[ae]=ge),ge.matrix.fromArray(xe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(xe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),ae===0&&(tt.matrix.copy(ge.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale)),te===!0&&tt.cameras.push(ge)}const Ft=o.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&w){_=a.getBinding();const ae=_.getDepthInformation(Tt[0]);ae&&ae.isValid&&ae.texture&&M.init(ae,o.renderState)}if(Ft&&Ft.includes("camera-access")&&w){t.state.unbindTexture(),_=a.getBinding();for(let ae=0;ae<Tt.length;ae++){const xe=Tt[ae].camera;if(xe){let Oe=S[xe];Oe||(Oe=new yx,S[xe]=Oe);const ge=_.getCameraImage(xe);Oe.sourceTexture=ge}}}}for(let Tt=0;Tt<D.length;Tt++){const te=U[Tt],Ft=D[Tt];te!==null&&Ft!==void 0&&Ft.update(te,vt,d||u)}Et&&Et(at,vt),vt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:vt}),E=null}const kt=new Px;kt.setAnimationLoop(Lt),this.setAnimationLoop=function(at){Et=at},this.dispose=function(){}}}const f2=new Re,Vx=new re;Vx.set(-1,0,0,0,1,0,0,0,1);function h2(r,t){function n(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function a(M,S){S.color.getRGB(M.fogColor.value,Lx(r)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function o(M,S,L,N,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),_(M,S)):S.isMeshPhongMaterial?(c(M,S),g(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),v(M,S),S.isMeshPhysicalMaterial&&x(M,S,A)):S.isMeshMatcapMaterial?(c(M,S),E(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),w(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(u(M,S),S.isLineDashedMaterial&&h(M,S)):S.isPointsMaterial?m(M,S,L,N):S.isSpriteMaterial?d(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,n(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Wn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,n(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Wn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,n(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,n(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,n(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const L=t.get(S),N=L.envMap,A=L.envMapRotation;N&&(M.envMap.value=N,M.envMapRotation.value.setFromMatrix4(f2.makeRotationFromEuler(A)).transpose(),N.isCubeTexture&&N.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(Vx),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,n(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,n(S.aoMap,M.aoMapTransform))}function u(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform))}function h(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,L,N){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*L,M.scale.value=N*.5,S.map&&(M.map.value=S.map,n(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function d(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function g(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function _(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function v(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,n(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,n(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,L){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,n(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,n(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,n(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,n(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,n(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Wn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,n(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,n(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=L.texture,M.transmissionSamplerSize.value.set(L.width,L.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,n(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,n(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,n(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,n(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,n(S.specularIntensityMap,M.specularIntensityMapTransform))}function E(M,S){S.matcap&&(M.matcap.value=S.matcap)}function w(M,S){const L=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(L.matrixWorld),M.nearDistance.value=L.shadow.camera.near,M.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function d2(r,t,n,a){let o={},c={},u=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,D){const U=D.program;a.uniformBlockBinding(A,U)}function d(A,D){let U=o[A.id];U===void 0&&(M(A),U=g(A),o[A.id]=U,A.addEventListener("dispose",L));const P=D.program;a.updateUBOMapping(A,P);const b=t.render.frame;c[A.id]!==b&&(v(A),c[A.id]=b)}function g(A){const D=_();A.__bindingPointIndex=D;const U=r.createBuffer(),P=A.__size,b=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,P,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,D,U),U}function _(){for(let A=0;A<h;A++)if(u.indexOf(A)===-1)return u.push(A),A;return Ae("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(A){const D=o[A.id],U=A.uniforms,P=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,D);for(let b=0,O=U.length;b<O;b++){const F=U[b];if(Array.isArray(F))for(let Y=0,V=F.length;Y<V;Y++)x(F[Y],b,Y,P);else x(F,b,0,P)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,D,U,P){if(w(A,D,U,P)===!0){const b=A.__offset,O=A.value;if(Array.isArray(O)){let F=0;for(let Y=0;Y<O.length;Y++){const V=O[Y],tt=S(V);E(V,A.__data,F),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(F+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(O,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,b,A.__data)}}function E(A,D,U){typeof A=="number"||typeof A=="boolean"?D[0]=A:A.isMatrix3?(D[0]=A.elements[0],D[1]=A.elements[1],D[2]=A.elements[2],D[3]=0,D[4]=A.elements[3],D[5]=A.elements[4],D[6]=A.elements[5],D[7]=0,D[8]=A.elements[6],D[9]=A.elements[7],D[10]=A.elements[8],D[11]=0):ArrayBuffer.isView(A)?D.set(new A.constructor(A.buffer,A.byteOffset,D.length)):A.toArray(D,U)}function w(A,D,U,P){const b=A.value,O=D+"_"+U;if(P[O]===void 0)return typeof b=="number"||typeof b=="boolean"?P[O]=b:ArrayBuffer.isView(b)?P[O]=b.slice():P[O]=b.clone(),!0;{const F=P[O];if(typeof b=="number"||typeof b=="boolean"){if(F!==b)return P[O]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(F.equals(b)===!1)return F.copy(b),!0}}return!1}function M(A){const D=A.uniforms;let U=0;const P=16;for(let O=0,F=D.length;O<F;O++){const Y=Array.isArray(D[O])?D[O]:[D[O]];for(let V=0,tt=Y.length;V<tt;V++){const k=Y[V],j=Array.isArray(k.value)?k.value:[k.value];for(let B=0,W=j.length;B<W;B++){const ct=j[B],rt=S(ct),ht=U%P,I=ht%rt.boundary,$=ht+I;U+=I,$!==0&&P-$<rt.storage&&(U+=P-$),k.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=U,U+=rt.storage}}}const b=U%P;return b>0&&(U+=P-b),A.__size=U,A.__cache={},this}function S(A){const D={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(D.boundary=4,D.storage=4):A.isVector2?(D.boundary=8,D.storage=8):A.isVector3||A.isColor?(D.boundary=16,D.storage=12):A.isVector4?(D.boundary=16,D.storage=16):A.isMatrix3?(D.boundary=48,D.storage=48):A.isMatrix4?(D.boundary=64,D.storage=64):A.isTexture?ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(D.boundary=16,D.storage=A.byteLength):ne("WebGLRenderer: Unsupported uniform value type.",A),D}function L(A){const D=A.target;D.removeEventListener("dispose",L);const U=u.indexOf(D.__bindingPointIndex);u.splice(U,1),r.deleteBuffer(o[D.id]),delete o[D.id],delete c[D.id]}function N(){for(const A in o)r.deleteBuffer(o[A]);u=[],o={},c={}}return{bind:m,update:d,dispose:N}}const p2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Zi=null;function m2(){return Zi===null&&(Zi=new xx(p2,16,16,Hs,Hi),Zi.name="DFG_LUT",Zi.minFilter=Fn,Zi.magFilter=Fn,Zi.wrapS=Aa,Zi.wrapT=Aa,Zi.generateMipmaps=!1,Zi.needsUpdate=!0),Zi}class g2{constructor(t={}){const{canvas:n=FM(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1,outputBufferType:x=di}=t;this.isWebGLRenderer=!0;let E;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=a.getContextAttributes().alpha}else E=u;const w=x,M=new Set([Sp,xp,_p]),S=new Set([di,$i,fl,hl,mp,gp]),L=new Uint32Array(4),N=new Int32Array(4),A=new G;let D=null,U=null;const P=[],b=[];let O=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let Y=!1,V=null,tt=null,k=null,j=null;this._outputColorSpace=ti;let B=0,W=0,ct=null,rt=-1,ht=null;const I=new $e,$=new $e;let gt=null;const Et=new ee(0);let Lt=0,kt=n.width,at=n.height,vt=1,Tt=null,te=null;const Ft=new $e(0,0,kt,at),le=new $e(0,0,kt,at);let an=!1;const ae=new wp;let xe=!1,Oe=!1;const ge=new Re,Xe=new G,sn=new $e,An={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function rn(){return ct===null?vt:1}let K=a;function Pe(R,X){return n.getContext(R,X)}let Ue,z,T,Q,ot,dt,bt,Ct,pt,mt,At,Ht,Nt,Dt,Jt,Qt,ie,Z,Rt,xt,wt,It,Mt;try{const R={alpha:!0,depth:o,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${hp}`),n.addEventListener("webglcontextlost",Fe,!1),n.addEventListener("webglcontextrestored",be,!1),n.addEventListener("webglcontextcreationerror",qn,!1),K===null){const X="webgl2";if(K=Pe(X,R),K===null)throw Pe(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Kt()}catch(R){throw n.removeEventListener("webglcontextlost",Fe,!1),n.removeEventListener("webglcontextrestored",be,!1),n.removeEventListener("webglcontextcreationerror",qn,!1),Ae("WebGLRenderer: "+R.message),R}function Kt(){Ue=new mA(K),Ue.init(),wt=new r2(K,Ue),z=new sA(K,Ue,t,wt),T=new a2(K,Ue),z.reversedDepthBuffer&&v&&T.buffers.depth.setReversed(!0),tt=K.createFramebuffer(),k=K.createFramebuffer(),j=K.createFramebuffer(),Q=new _A(K),ot=new XR,dt=new s2(K,Ue,T,ot,z,wt,Q),bt=new pA(F),Ct=new S1(K),It=new iA(K,Ct),pt=new gA(K,Ct,Q,It),mt=new SA(K,pt,Ct,It,Q),Z=new xA(K,z,dt),Jt=new rA(ot),At=new kR(F,bt,Ue,z,It,Jt),Ht=new h2(F,ot),Nt=new qR,Dt=new jR(Ue),ie=new nA(F,bt,T,mt,E,m),Qt=new i2(F,mt,z),Mt=new d2(K,Q,z,T),Rt=new aA(K,Ue,Q),xt=new vA(K,Ue,Q),Q.programs=At.programs,F.capabilities=z,F.extensions=Ue,F.properties=ot,F.renderLists=Nt,F.shadowMap=Qt,F.state=T,F.info=Q}w!==di&&(O=new MA(w,n.width,n.height,h,o,c));const Wt=new u2(F,K);this.xr=Wt,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const R=Ue.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ue.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(R){R!==void 0&&(vt=R,this.setSize(kt,at,!1))},this.getSize=function(R){return R.set(kt,at)},this.setSize=function(R,X,ut=!0){if(Wt.isPresenting){ne("WebGLRenderer: Can't change size while VR device is presenting.");return}kt=R,at=X,n.width=Math.floor(R*vt),n.height=Math.floor(X*vt),ut===!0&&(n.style.width=R+"px",n.style.height=X+"px"),O!==null&&O.setSize(n.width,n.height),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(kt*vt,at*vt).floor()},this.setDrawingBufferSize=function(R,X,ut){kt=R,at=X,vt=ut,n.width=Math.floor(R*ut),n.height=Math.floor(X*ut),this.setViewport(0,0,R,X)},this.setEffects=function(R){if(w===di){Ae("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let X=0;X<R.length;X++)if(R[X].isOutputPass===!0){ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy(Ft)},this.setViewport=function(R,X,ut,et){R.isVector4?Ft.set(R.x,R.y,R.z,R.w):Ft.set(R,X,ut,et),T.viewport(I.copy(Ft).multiplyScalar(vt).round())},this.getScissor=function(R){return R.copy(le)},this.setScissor=function(R,X,ut,et){R.isVector4?le.set(R.x,R.y,R.z,R.w):le.set(R,X,ut,et),T.scissor($.copy(le).multiplyScalar(vt).round())},this.getScissorTest=function(){return an},this.setScissorTest=function(R){T.setScissorTest(an=R)},this.setOpaqueSort=function(R){Tt=R},this.setTransparentSort=function(R){te=R},this.getClearColor=function(R){return R.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(R=!0,X=!0,ut=!0){let et=0;if(R){let nt=!1;if(ct!==null){const Ot=ct.texture.format;nt=M.has(Ot)}if(nt){const Ot=ct.texture.type,Gt=S.has(Ot),Ut=ie.getClearColor(),zt=ie.getClearAlpha(),Bt=Ut.r,oe=Ut.g,pe=Ut.b;Gt?(L[0]=Bt,L[1]=oe,L[2]=pe,L[3]=zt,K.clearBufferuiv(K.COLOR,0,L)):(N[0]=Bt,N[1]=oe,N[2]=pe,N[3]=zt,K.clearBufferiv(K.COLOR,0,N))}else et|=K.COLOR_BUFFER_BIT}X&&(et|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ut&&(et|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),et!==0&&K.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),V=R},this.dispose=function(){n.removeEventListener("webglcontextlost",Fe,!1),n.removeEventListener("webglcontextrestored",be,!1),n.removeEventListener("webglcontextcreationerror",qn,!1),ie.dispose(),Nt.dispose(),Dt.dispose(),ot.dispose(),bt.dispose(),mt.dispose(),It.dispose(),Mt.dispose(),At.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",fn),Wt.removeEventListener("sessionend",Cn),Yn.stop()};function Fe(R){R.preventDefault(),zv("WebGLRenderer: Context Lost."),Y=!0}function be(){zv("WebGLRenderer: Context Restored."),Y=!1;const R=Q.autoReset,X=Qt.enabled,ut=Qt.autoUpdate,et=Qt.needsUpdate,nt=Qt.type;Kt(),Q.autoReset=R,Qt.enabled=X,Qt.autoUpdate=ut,Qt.needsUpdate=et,Qt.type=nt}function qn(R){Ae("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ni(R){const X=R.target;X.removeEventListener("dispose",ni),jr(X)}function jr(R){$r(R),ot.remove(R)}function $r(R){const X=ot.get(R).programs;X!==void 0&&(X.forEach(function(ut){At.releaseProgram(ut)}),R.isShaderMaterial&&At.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,ut,et,nt,Ot){X===null&&(X=An);const Gt=nt.isMesh&&nt.matrixWorld.determinantAffine()<0,Ut=La(R,X,ut,et,nt);T.setMaterial(et,Gt);let zt=ut.index,Bt=1;if(et.wireframe===!0){if(zt=pt.getWireframeAttribute(ut),zt===void 0)return;Bt=2}const oe=ut.drawRange,pe=ut.attributes.position;let qt=oe.start*Bt,Te=(oe.start+oe.count)*Bt;Ot!==null&&(qt=Math.max(qt,Ot.start*Bt),Te=Math.min(Te,(Ot.start+Ot.count)*Bt)),zt!==null?(qt=Math.max(qt,0),Te=Math.min(Te,zt.count)):pe!=null&&(qt=Math.max(qt,0),Te=Math.min(Te,pe.count));const Ke=Te-qt;if(Ke<0||Ke===1/0)return;It.setup(nt,et,Ut,ut,zt);let qe,fe=Rt;if(zt!==null&&(qe=Ct.get(zt),fe=xt,fe.setIndex(qe)),nt.isMesh)et.wireframe===!0?(T.setLineWidth(et.wireframeLinewidth*rn()),fe.setMode(K.LINES)):fe.setMode(K.TRIANGLES);else if(nt.isLine){let dn=et.linewidth;dn===void 0&&(dn=1),T.setLineWidth(dn*rn()),nt.isLineSegments?fe.setMode(K.LINES):nt.isLineLoop?fe.setMode(K.LINE_LOOP):fe.setMode(K.LINE_STRIP)}else nt.isPoints?fe.setMode(K.POINTS):nt.isSprite&&fe.setMode(K.TRIANGLES);if(nt.isBatchedMesh)if(Ue.get("WEBGL_multi_draw"))fe.renderMultiDraw(nt._multiDrawStarts,nt._multiDrawCounts,nt._multiDrawCount);else{const dn=nt._multiDrawStarts,Vt=nt._multiDrawCounts,Sn=nt._multiDrawCount,he=zt?Ct.get(zt).bytesPerElement:1,Hn=ot.get(et).currentProgram.getUniforms();for(let ii=0;ii<Sn;ii++)Hn.setValue(K,"_gl_DrawID",ii),fe.render(dn[ii]/he,Vt[ii])}else if(nt.isInstancedMesh)fe.renderInstances(qt,Ke,nt.count);else if(ut.isInstancedBufferGeometry){const dn=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,Vt=Math.min(ut.instanceCount,dn);fe.renderInstances(qt,Ke,Vt)}else fe.render(qt,Ke)};function to(R,X,ut,et){V!==null&&R.isNodeMaterial&&V.setObject(et,R),xe===!0&&Jt.setState(R,ut,!1),R.transparent===!0&&R.side===Ai&&R.forceSinglePass===!1?(R.side=Wn,R.needsUpdate=!0,Ua(R,X,et),R.side=Bs,R.needsUpdate=!0,Ua(R,X,et),R.side=Ai):Ua(R,X,et)}this.compile=function(R,X,ut=null){ut===null&&(ut=R),V!==null&&V.renderStart(R,X,ut),U=Dt.get(ut),U.init(X),b.push(U),ut.traverseVisible(function(nt){nt.isLight&&nt.layers.test(X.layers)&&(U.pushLight(nt),nt.castShadow&&U.pushShadow(nt))}),R!==ut&&R.traverseVisible(function(nt){nt.isLight&&nt.layers.test(X.layers)&&(U.pushLight(nt),nt.castShadow&&U.pushShadow(nt))}),U.setupLights(),V!==null&&V.updateLights(U.state.lightsArray),Oe=this.localClippingEnabled,xe=Jt.init(this.clippingPlanes,Oe),xe===!0&&Jt.setGlobalState(this.clippingPlanes,X),V!==null&&Qt.render(U.state.shadowsArray,ut,X);const et=new Set;return R.traverse(function(nt){if(!(nt.isMesh||nt.isPoints||nt.isLine||nt.isSprite))return;const Ot=nt.material;if(Ot)if(Array.isArray(Ot))for(let Gt=0;Gt<Ot.length;Gt++){const Ut=Ot[Gt];to(Ut,ut,X,nt),et.add(Ut)}else to(Ot,ut,X,nt),et.add(Ot)}),U=b.pop(),V!==null&&V.renderEnd(),et},this.compileAsync=function(R,X,ut=null){const et=this.compile(R,X,ut);return new Promise(nt=>{function Ot(){if(et.forEach(function(Gt){const zt=ot.get(Gt).currentProgram;(zt===void 0||zt.isReady())&&et.delete(Gt)}),et.size===0){nt(R);return}setTimeout(Ot,10)}Ue.get("KHR_parallel_shader_compile")!==null?Ot():setTimeout(Ot,10)})};let qs=null;function Gi(R){qs&&qs(R)}function fn(){Yn.stop()}function Cn(){Yn.start()}const Yn=new Px;Yn.setAnimationLoop(Gi),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(R){qs=R,Wt.setAnimationLoop(R),R===null?Yn.stop():Yn.start()},Wt.addEventListener("sessionstart",fn),Wt.addEventListener("sessionend",Cn),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){Ae("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Y===!0)return;V!==null&&V.renderStart(R,X);const ut=Wt.enabled===!0&&Wt.isPresenting===!0,et=O!==null&&(ct===null||ut)&&O.begin(F,ct);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(X),X=Wt.getCamera()),R.isScene===!0&&R.onBeforeRender(F,R,X,ct),U=Dt.get(R,b.length),U.init(X),U.state.textureUnits=dt.getTextureUnits(),b.push(U),ge.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),ae.setFromProjectionMatrix(ge,Qi,X.reversedDepth),Oe=this.localClippingEnabled,xe=Jt.init(this.clippingPlanes,Oe),D=Nt.get(R,P.length),D.init(),P.push(D),Wt.enabled===!0&&Wt.isPresenting===!0){const Gt=F.xr.getDepthSensingMesh();Gt!==null&&fs(Gt,X,-1/0,F.sortObjects)}fs(R,X,0,F.sortObjects),D.finish(),V!==null&&V.updateLights(U.state.lightsArray),F.sortObjects===!0&&D.sort(Tt,te),We=Wt.enabled===!1||Wt.isPresenting===!1||Wt.hasDepthSensing()===!1,We&&ie.addToRenderList(D,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&Jt.beginShadows();const nt=U.state.shadowsArray;if(Qt.render(nt,R,X),xe===!0&&Jt.endShadows(),(et&&O.hasRenderPass())===!1){const Gt=D.opaque,Ut=D.transmissive;if(U.setupLights(),X.isArrayCamera){const zt=X.cameras;if(Ut.length>0)for(let Bt=0,oe=zt.length;Bt<oe;Bt++){const pe=zt[Bt];El(Gt,Ut,R,pe)}We&&ie.render(R);for(let Bt=0,oe=zt.length;Bt<oe;Bt++){const pe=zt[Bt];Ml(D,R,pe,pe.viewport)}}else Ut.length>0&&El(Gt,Ut,R,X),We&&ie.render(R),Ml(D,R,X)}ct!==null&&W===0&&(dt.updateMultisampleRenderTarget(ct),dt.updateRenderTargetMipmap(ct)),et&&O.end(F),R.isScene===!0&&R.onAfterRender(F,R,X),It.resetDefaultState(),rt=-1,ht=null,b.pop(),b.length>0?(U=b[b.length-1],dt.setTextureUnits(U.state.textureUnits),xe===!0&&Jt.setGlobalState(F.clippingPlanes,U.state.camera)):U=null,P.pop(),P.length>0?D=P[P.length-1]:D=null,V!==null&&V.renderEnd()};function fs(R,X,ut,et){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)ut=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLightProbeGrid)U.pushLightProbeGrid(R);else if(R.isLight)U.pushLight(R),R.castShadow&&U.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(ae)){et&&sn.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ge);const Gt=mt.update(R),Ut=R.material;Ut.visible&&D.push(R,Gt,Ut,ut,sn.z,null,X)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(ae))){const Gt=mt.update(R),Ut=R.material;if(et&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),sn.copy(R.boundingSphere.center)):(Gt.boundingSphere===null&&Gt.computeBoundingSphere(),sn.copy(Gt.boundingSphere.center)),sn.applyMatrix4(R.matrixWorld).applyMatrix4(ge)),Array.isArray(Ut)){const zt=Gt.groups;for(let Bt=0,oe=zt.length;Bt<oe;Bt++){const pe=zt[Bt],qt=Ut[pe.materialIndex];qt&&qt.visible&&D.push(R,Gt,qt,ut,sn.z,pe,X)}}else Ut.visible&&D.push(R,Gt,Ut,ut,sn.z,null,X)}}const Ot=R.children;for(let Gt=0,Ut=Ot.length;Gt<Ut;Gt++)fs(Ot[Gt],X,ut,et)}function Ml(R,X,ut,et){const{opaque:nt,transmissive:Ot,transparent:Gt}=R;U.setupLightsView(ut),xe===!0&&Jt.setGlobalState(F.clippingPlanes,ut),et&&T.viewport(I.copy(et)),nt.length>0&&hs(nt,X,ut),Ot.length>0&&hs(Ot,X,ut),Gt.length>0&&hs(Gt,X,ut),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function El(R,X,ut,et){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;if(U.state.transmissionRenderTarget[et.id]===void 0){const qt=Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float");U.state.transmissionRenderTarget[et.id]=new Ri(1,1,{generateMipmaps:!0,type:qt?Hi:di,minFilter:Ps,samples:Math.max(4,z.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ee.workingColorSpace})}const Ot=U.state.transmissionRenderTarget[et.id],Gt=et.viewport||I;Ot.setSize(Gt.z*F.transmissionResolutionScale,Gt.w*F.transmissionResolutionScale);const Ut=F.getRenderTarget(),zt=F.getActiveCubeFace(),Bt=F.getActiveMipmapLevel();F.setRenderTarget(Ot),F.getClearColor(Et),Lt=F.getClearAlpha(),Lt<1&&F.setClearColor(16777215,.5),F.clear(),We&&ie.render(ut);const oe=F.toneMapping;F.toneMapping=ji;const pe=et.viewport;if(et.viewport!==void 0&&(et.viewport=void 0),U.setupLightsView(et),xe===!0&&Jt.setGlobalState(F.clippingPlanes,et),hs(R,ut,et),dt.updateMultisampleRenderTarget(Ot),dt.updateRenderTargetMipmap(Ot),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Te=0,Ke=X.length;Te<Ke;Te++){const qe=X[Te],{object:fe,geometry:dn,material:Vt,group:Sn}=qe;if(Vt.side===Ai&&fe.layers.test(et.layers)){const he=Vt.side;Vt.side=Wn,Vt.needsUpdate=!0,Da(fe,ut,et,dn,Vt,Sn),Vt.side=he,Vt.needsUpdate=!0,qt=!0}}qt===!0&&(dt.updateMultisampleRenderTarget(Ot),dt.updateRenderTargetMipmap(Ot))}F.setRenderTarget(Ut,zt,Bt),F.setClearColor(Et,Lt),pe!==void 0&&(et.viewport=pe),F.toneMapping=oe}function hs(R,X,ut){const et=X.isScene===!0?X.overrideMaterial:null;for(let nt=0,Ot=R.length;nt<Ot;nt++){const Gt=R[nt],{object:Ut,geometry:zt,group:Bt}=Gt;let oe=Gt.material;oe.allowOverride===!0&&et!==null&&(oe=et),Ut.layers.test(ut.layers)&&Da(Ut,X,ut,zt,oe,Bt)}}function Da(R,X,ut,et,nt,Ot){V!==null&&nt.isNodeMaterial&&V.setObject(R,nt),R.onBeforeRender(F,X,ut,et,nt,Ot),R.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),nt.onBeforeRender(F,X,ut,et,R,Ot),nt.transparent===!0&&nt.side===Ai&&nt.forceSinglePass===!1?(nt.side=Wn,nt.needsUpdate=!0,F.renderBufferDirect(ut,X,et,nt,R,Ot),nt.side=Bs,nt.needsUpdate=!0,F.renderBufferDirect(ut,X,et,nt,R,Ot),nt.side=Ai):F.renderBufferDirect(ut,X,et,nt,R,Ot),R.onAfterRender(F,X,ut,et,nt,Ot)}function Ua(R,X,ut){X.isScene!==!0&&(X=An);const et=ot.get(R),nt=U.state.lights,Ot=U.state.shadowsArray,Gt=nt.state.version,Ut=At.getParameters(R,nt.state,Ot,X,ut,U.state.lightProbeGridArray),zt=At.getProgramCacheKey(Ut);let Bt=et.programs;et.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?X.environment:null,et.fog=X.fog;const oe=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;et.envMap=bt.get(R.envMap||et.environment,oe),et.envMapRotation=et.environment!==null&&R.envMap===null?X.environmentRotation:R.envMapRotation,Bt===void 0&&(R.addEventListener("dispose",ni),Bt=new Map,et.programs=Bt);let pe=Bt.get(zt);if(pe!==void 0){if(et.currentProgram===pe&&et.lightsStateVersion===Gt)return na(R,Ut),pe}else Ut.uniforms=At.getUniforms(R),V!==null&&R.isNodeMaterial&&V.build(R,ut,Ut),R.onBeforeCompile(Ut,F),pe=At.acquireProgram(Ut,zt),Bt.set(zt,pe),et.uniforms=Ut.uniforms;const qt=et.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(qt.clippingPlanes=Jt.uniform),na(R,Ut),et.needsLights=bl(R),et.lightsStateVersion=Gt,et.needsLights&&(qt.ambientLightColor.value=nt.state.ambient,qt.lightProbe.value=nt.state.probe,qt.sunLights.value=nt.state.sun,qt.sunLightShadows.value=nt.state.sunShadow,qt.directionalLights.value=nt.state.directional,qt.directionalLightShadows.value=nt.state.directionalShadow,qt.spotLights.value=nt.state.spot,qt.spotLightShadows.value=nt.state.spotShadow,qt.rectAreaLights.value=nt.state.rectArea,qt.ltc_1.value=nt.state.rectAreaLTC1,qt.ltc_2.value=nt.state.rectAreaLTC2,qt.pointLights.value=nt.state.point,qt.pointLightShadows.value=nt.state.pointShadow,qt.hemisphereLights.value=nt.state.hemi,qt.sunShadowMatrix.value=nt.state.sunShadowMatrix,qt.sunShadowCascade.value=nt.state.sunShadowCascade,qt.directionalShadowMatrix.value=nt.state.directionalShadowMatrix,qt.spotLightMatrix.value=nt.state.spotLightMatrix,qt.spotLightMap.value=nt.state.spotLightMap,qt.pointShadowMatrix.value=nt.state.pointShadowMatrix),et.lightProbeGrid=U.state.lightProbeGridArray.length>0,et.currentProgram=pe,et.uniformsList=null,pe}function ea(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=du.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function na(R,X){const ut=ot.get(R);ut.outputColorSpace=X.outputColorSpace,ut.batching=X.batching,ut.batchingColor=X.batchingColor,ut.instancing=X.instancing,ut.instancingColor=X.instancingColor,ut.instancingMorph=X.instancingMorph,ut.skinning=X.skinning,ut.morphTargets=X.morphTargets,ut.morphNormals=X.morphNormals,ut.morphColors=X.morphColors,ut.morphTargetsCount=X.morphTargetsCount,ut.numClippingPlanes=X.numClippingPlanes,ut.numIntersection=X.numClipIntersection,ut.vertexAlphas=X.vertexAlphas,ut.vertexTangents=X.vertexTangents,ut.toneMapping=X.toneMapping}function ds(R,X){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;A.setFromMatrixPosition(X.matrixWorld);for(let ut=0,et=R.length;ut<et;ut++){const nt=R[ut];if(nt.texture!==null&&nt.boundingBox.containsPoint(A))return nt}return null}function La(R,X,ut,et,nt){X.isScene!==!0&&(X=An),dt.resetTextureUnits();const Ot=X.fog,Gt=et.isMeshStandardMaterial||et.isMeshLambertMaterial||et.isMeshPhongMaterial?X.environment:null,Ut=ct===null?F.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Ee.workingColorSpace,zt=et.isMeshStandardMaterial||et.isMeshLambertMaterial&&!et.envMap||et.isMeshPhongMaterial&&!et.envMap,Bt=bt.get(et.envMap||Gt,zt),oe=et.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pe=!!ut.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),qt=!!ut.morphAttributes.position,Te=!!ut.morphAttributes.normal,Ke=!!ut.morphAttributes.color;let qe=ji;et.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(qe=F.toneMapping);const fe=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,dn=fe!==void 0?fe.length:0,Vt=ot.get(et),Sn=U.state.lights;if(xe===!0&&(Oe===!0||R!==ht)){const He=R===ht&&et.id===rt;Jt.setState(et,R,He)}let he=!1;et.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==Sn.state.version||Vt.outputColorSpace!==Ut||nt.isBatchedMesh&&Vt.batching===!1||!nt.isBatchedMesh&&Vt.batching===!0||nt.isBatchedMesh&&Vt.batchingColor===!0&&nt._colorsTexture===null||nt.isBatchedMesh&&Vt.batchingColor===!1&&nt._colorsTexture!==null||nt.isInstancedMesh&&Vt.instancing===!1||!nt.isInstancedMesh&&Vt.instancing===!0||nt.isSkinnedMesh&&Vt.skinning===!1||!nt.isSkinnedMesh&&Vt.skinning===!0||nt.isInstancedMesh&&Vt.instancingColor===!0&&nt.instanceColor===null||nt.isInstancedMesh&&Vt.instancingColor===!1&&nt.instanceColor!==null||nt.isInstancedMesh&&Vt.instancingMorph===!0&&nt.morphTexture===null||nt.isInstancedMesh&&Vt.instancingMorph===!1&&nt.morphTexture!==null||Vt.envMap!==Bt||et.fog===!0&&Vt.fog!==Ot||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==Jt.numPlanes||Vt.numIntersection!==Jt.numIntersection)||Vt.vertexAlphas!==oe||Vt.vertexTangents!==pe||Vt.morphTargets!==qt||Vt.morphNormals!==Te||Vt.morphColors!==Ke||Vt.toneMapping!==qe||Vt.morphTargetsCount!==dn||!!Vt.lightProbeGrid!=U.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,Vt.__version=et.version);let Hn=Vt.currentProgram;he===!0&&(Hn=Ua(et,X,nt),V&&et.isNodeMaterial&&V.onUpdateProgram(et,Hn,Vt));let ii=!1,Gn=!1,Na=!1;const Le=Hn.getUniforms(),tn=Vt.uniforms;if(T.useProgram(Hn.program)&&(ii=!0,Gn=!0,Na=!0),et.id!==rt&&(rt=et.id,Gn=!0),Vt.needsLights){const He=ds(U.state.lightProbeGridArray,nt);Vt.lightProbeGrid!==He&&(Vt.lightProbeGrid=He,Gn=!0)}if(ii||ht!==R){T.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Le.setValue(K,"projectionMatrix",R.projectionMatrix),Le.setValue(K,"viewMatrix",R.matrixWorldInverse);const Vi=Le.map.cameraPosition;Vi!==void 0&&Vi.setValue(K,Xe.setFromMatrixPosition(R.matrixWorld)),z.logarithmicDepthBuffer&&Le.setValue(K,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&Le.setValue(K,"isOrthographic",R.isOrthographicCamera===!0),ht!==R&&(ht=R,Gn=!0,Na=!0)}if(Vt.needsLights&&(Sn.state.sunShadowMap.length>0&&Le.setValue(K,"sunShadowMap",Sn.state.sunShadowMap,dt),Sn.state.directionalShadowMap.length>0&&Le.setValue(K,"directionalShadowMap",Sn.state.directionalShadowMap,dt),Sn.state.spotShadowMap.length>0&&Le.setValue(K,"spotShadowMap",Sn.state.spotShadowMap,dt),Sn.state.pointShadowMap.length>0&&Le.setValue(K,"pointShadowMap",Sn.state.pointShadowMap,dt)),nt.isSkinnedMesh){Le.setOptional(K,nt,"bindMatrix"),Le.setOptional(K,nt,"bindMatrixInverse");const He=nt.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),Le.setValue(K,"boneTexture",He.boneTexture,dt))}nt.isBatchedMesh&&(Le.setOptional(K,nt,"batchingTexture"),Le.setValue(K,"batchingTexture",nt._matricesTexture,dt),Le.setOptional(K,nt,"batchingIdTexture"),Le.setValue(K,"batchingIdTexture",nt._indirectTexture,dt),Le.setOptional(K,nt,"batchingColorTexture"),nt._colorsTexture!==null&&Le.setValue(K,"batchingColorTexture",nt._colorsTexture,dt));const pi=ut.morphAttributes;if((pi.position!==void 0||pi.normal!==void 0||pi.color!==void 0)&&Z.update(nt,ut,Hn),(Gn||Vt.receiveShadow!==nt.receiveShadow)&&(Vt.receiveShadow=nt.receiveShadow,Le.setValue(K,"receiveShadow",nt.receiveShadow)),(et.isMeshStandardMaterial||et.isMeshLambertMaterial||et.isMeshPhongMaterial)&&et.envMap===null&&X.environment!==null&&(tn.envMapIntensity.value=X.environmentIntensity),tn.dfgLUT!==void 0&&(tn.dfgLUT.value=m2()),Gn){if(Le.setValue(K,"toneMappingExposure",F.toneMappingExposure),Vt.needsLights&&hn(tn,Na),Ot&&et.fog===!0&&Ht.refreshFogUniforms(tn,Ot),Ht.refreshMaterialUniforms(tn,et,vt,at,U.state.transmissionRenderTarget[R.id]),Vt.needsLights&&Vt.lightProbeGrid){const He=Vt.lightProbeGrid;tn.probesSH.value=He.texture,tn.probesMin.value.copy(He.boundingBox.min),tn.probesMax.value.copy(He.boundingBox.max),tn.probesResolution.value.copy(He.resolution)}du.upload(K,ea(Vt),tn,dt)}if(et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(du.upload(K,ea(Vt),tn,dt),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&Le.setValue(K,"center",nt.center),Le.setValue(K,"modelViewMatrix",nt.modelViewMatrix),Le.setValue(K,"normalMatrix",nt.normalMatrix),Le.setValue(K,"modelMatrix",nt.matrixWorld),et.uniformsGroups!==void 0){const He=et.uniformsGroups;for(let Vi=0,wi=He.length;Vi<wi;Vi++){const mi=He[Vi];Mt.update(mi,Hn),Mt.bind(mi,Hn)}}return Hn}function hn(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.sunLights.needsUpdate=X,R.sunLightShadows.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function bl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ct},this.setRenderTargetTextures=function(R,X,ut){const et=ot.get(R);et.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,et.__autoAllocateDepthBuffer===!1&&(et.__useRenderToTexture=!1),ot.get(R.texture).__webglTexture=X,ot.get(R.depthTexture).__webglTexture=et.__autoAllocateDepthBuffer?void 0:ut,et.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,X){const ut=ot.get(R);ut.__webglFramebuffer=X,ut.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(R,X=0,ut=0){ct=R,B=X,W=ut;let et=null,nt=!1,Ot=!1;if(R){const Ut=ot.get(R);if(Ut.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(K.FRAMEBUFFER,Ut.__webglFramebuffer),I.copy(R.viewport),$.copy(R.scissor),gt=R.scissorTest,T.viewport(I),T.scissor($),T.setScissorTest(gt),rt=-1;return}else if(Ut.__webglFramebuffer===void 0)dt.setupRenderTarget(R);else if(Ut.__hasExternalTextures)dt.rebindTextures(R,ot.get(R.texture).__webglTexture,ot.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const oe=R.depthTexture;if(Ut.__boundDepthTexture!==oe){if(oe!==null&&ot.has(oe)&&(R.width!==oe.image.width||R.height!==oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");dt.setupDepthRenderbuffer(R)}}const zt=R.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(Ot=!0);const Bt=ot.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Bt[X])?et=Bt[X][ut]:et=Bt[X],nt=!0):R.samples>0&&dt.useMultisampledRTT(R)===!1?et=ot.get(R).__webglMultisampledFramebuffer:Array.isArray(Bt)?et=Bt[ut]:et=Bt,I.copy(R.viewport),$.copy(R.scissor),gt=R.scissorTest}else I.copy(Ft).multiplyScalar(vt).floor(),$.copy(le).multiplyScalar(vt).floor(),gt=an;if(ut!==0&&(et=tt),T.bindFramebuffer(K.FRAMEBUFFER,et)&&T.drawBuffers(R,et),T.viewport(I),T.scissor($),T.setScissorTest(gt),nt){const Ut=ot.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ut.__webglTexture,ut)}else if(Ot){const Ut=X;for(let zt=0;zt<R.textures.length;zt++){const Bt=ot.get(R.textures[zt]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+zt,Bt.__webglTexture,ut,Ut)}}else if(R!==null&&ut!==0){const Ut=ot.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Ut.__webglTexture,ut)}rt=-1};function eo(R){const X=ot.get(R);return(X.__readFormat!==R.format||X.__readType!==R.type)&&(X.__readFormat=R.format,X.__readType=R.type,X.__formatReadable=z.textureFormatReadable(R.format),X.__typeReadable=z.textureTypeReadable(R.type)),X}this.readRenderTargetPixels=function(R,X,ut,et,nt,Ot,Gt,Ut=0){if(!(R&&R.isWebGLRenderTarget)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=ot.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Gt!==void 0&&(zt=zt[Gt]),zt){T.bindFramebuffer(K.FRAMEBUFFER,zt);try{const Bt=R.textures[Ut],oe=Bt.format,pe=Bt.type;R.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ut);const qt=eo(Bt);if(qt.__formatReadable===!1){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qt.__typeReadable===!1){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-et&&ut>=0&&ut<=R.height-nt&&K.readPixels(X,ut,et,nt,wt.convert(oe),wt.convert(pe),Ot)}finally{const Bt=ct!==null?ot.get(ct).__webglFramebuffer:null;T.bindFramebuffer(K.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(R,X,ut,et,nt,Ot,Gt,Ut=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let zt=ot.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Gt!==void 0&&(zt=zt[Gt]),zt)if(X>=0&&X<=R.width-et&&ut>=0&&ut<=R.height-nt){T.bindFramebuffer(K.FRAMEBUFFER,zt);const Bt=R.textures[Ut],oe=Bt.format,pe=Bt.type;R.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ut);const qt=eo(Bt);if(qt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,Te),K.bufferData(K.PIXEL_PACK_BUFFER,Ot.byteLength,K.STREAM_READ),K.readPixels(X,ut,et,nt,wt.convert(oe),wt.convert(pe),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);const Ke=ct!==null?ot.get(ct).__webglFramebuffer:null;T.bindFramebuffer(K.FRAMEBUFFER,Ke);const qe=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await HM(K,qe,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,Te),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,Ot),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(Te),K.deleteSync(qe),Ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,X=null,ut=0){const et=Math.pow(2,-ut),nt=Math.floor(R.image.width*et),Ot=Math.floor(R.image.height*et),Gt=X!==null?X.x:0,Ut=X!==null?X.y:0;dt.setTexture2D(R,0),K.copyTexSubImage2D(K.TEXTURE_2D,ut,0,0,Gt,Ut,nt,Ot),T.unbindTexture()},this.copyTextureToTexture=function(R,X,ut=null,et=null,nt=0,Ot=0){let Gt,Ut,zt,Bt,oe,pe,qt,Te,Ke;const qe=R.isCompressedTexture?R.mipmaps[Ot]:R.image;if(ut!==null)Gt=ut.max.x-ut.min.x,Ut=ut.max.y-ut.min.y,zt=ut.isBox3?ut.max.z-ut.min.z:1,Bt=ut.min.x,oe=ut.min.y,pe=ut.isBox3?ut.min.z:0;else{const tn=Math.pow(2,-nt);Gt=Math.floor(qe.width*tn),Ut=Math.floor(qe.height*tn),R.isDataArrayTexture?zt=qe.depth:R.isData3DTexture?zt=Math.floor(qe.depth*tn):zt=1,Bt=0,oe=0,pe=0}et!==null?(qt=et.x,Te=et.y,Ke=et.z):(qt=0,Te=0,Ke=0);const fe=wt.convert(X.format),dn=wt.convert(X.type);let Vt;X.isData3DTexture?(dt.setTexture3D(X,0),Vt=K.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(dt.setTexture2DArray(X,0),Vt=K.TEXTURE_2D_ARRAY):(dt.setTexture2D(X,0),Vt=K.TEXTURE_2D),T.activeTexture(K.TEXTURE0),T.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,X.flipY),T.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),T.pixelStorei(K.UNPACK_ALIGNMENT,X.unpackAlignment);const Sn=T.getParameter(K.UNPACK_ROW_LENGTH),he=T.getParameter(K.UNPACK_IMAGE_HEIGHT),Hn=T.getParameter(K.UNPACK_SKIP_PIXELS),ii=T.getParameter(K.UNPACK_SKIP_ROWS),Gn=T.getParameter(K.UNPACK_SKIP_IMAGES);T.pixelStorei(K.UNPACK_ROW_LENGTH,qe.width),T.pixelStorei(K.UNPACK_IMAGE_HEIGHT,qe.height),T.pixelStorei(K.UNPACK_SKIP_PIXELS,Bt),T.pixelStorei(K.UNPACK_SKIP_ROWS,oe),T.pixelStorei(K.UNPACK_SKIP_IMAGES,pe);const Na=R.isDataArrayTexture||R.isData3DTexture,Le=X.isDataArrayTexture||X.isData3DTexture;if(R.isDepthTexture){const tn=ot.get(R),pi=ot.get(X),He=ot.get(tn.__renderTarget),Vi=ot.get(pi.__renderTarget);T.bindFramebuffer(K.READ_FRAMEBUFFER,He.__webglFramebuffer),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let wi=0;wi<zt;wi++)Na&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,ot.get(R).__webglTexture,nt,pe+wi),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,ot.get(X).__webglTexture,Ot,Ke+wi)),K.blitFramebuffer(Bt,oe,Gt,Ut,qt,Te,Gt,Ut,K.DEPTH_BUFFER_BIT,K.NEAREST);T.bindFramebuffer(K.READ_FRAMEBUFFER,null),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(nt!==0||R.isRenderTargetTexture||ot.has(R)){const tn=ot.get(R),pi=ot.get(X);T.bindFramebuffer(K.READ_FRAMEBUFFER,k),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,j);for(let He=0;He<zt;He++)Na?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,tn.__webglTexture,nt,pe+He):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,tn.__webglTexture,nt),Le?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,pi.__webglTexture,Ot,Ke+He):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,pi.__webglTexture,Ot),nt!==0?K.blitFramebuffer(Bt,oe,Gt,Ut,qt,Te,Gt,Ut,K.COLOR_BUFFER_BIT,K.NEAREST):Le?K.copyTexSubImage3D(Vt,Ot,qt,Te,Ke+He,Bt,oe,Gt,Ut):K.copyTexSubImage2D(Vt,Ot,qt,Te,Bt,oe,Gt,Ut);T.bindFramebuffer(K.READ_FRAMEBUFFER,null),T.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else Le?R.isDataTexture||R.isData3DTexture?K.texSubImage3D(Vt,Ot,qt,Te,Ke,Gt,Ut,zt,fe,dn,qe.data):X.isCompressedArrayTexture?K.compressedTexSubImage3D(Vt,Ot,qt,Te,Ke,Gt,Ut,zt,fe,qe.data):K.texSubImage3D(Vt,Ot,qt,Te,Ke,Gt,Ut,zt,fe,dn,qe):R.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,Ot,qt,Te,Gt,Ut,fe,dn,qe.data):R.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,Ot,qt,Te,qe.width,qe.height,fe,qe.data):K.texSubImage2D(K.TEXTURE_2D,Ot,qt,Te,Gt,Ut,fe,dn,qe);T.pixelStorei(K.UNPACK_ROW_LENGTH,Sn),T.pixelStorei(K.UNPACK_IMAGE_HEIGHT,he),T.pixelStorei(K.UNPACK_SKIP_PIXELS,Hn),T.pixelStorei(K.UNPACK_SKIP_ROWS,ii),T.pixelStorei(K.UNPACK_SKIP_IMAGES,Gn),Ot===0&&X.generateMipmaps&&K.generateMipmap(Vt),T.unbindTexture()},this.initRenderTarget=function(R){ot.get(R).__webglFramebuffer===void 0&&dt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?dt.setTextureCube(R,0):R.isData3DTexture?dt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?dt.setTexture2DArray(R,0):dt.setTexture2D(R,0),T.unbindTexture()},this.resetState=function(){B=0,W=0,ct=null,T.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Ee._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ee._getUnpackColorSpace()}}class wu extends Ze{constructor(t,n={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,o=n.color!==void 0?new ee(n.color):new ee(8355711),c=n.textureWidth||512,u=n.textureHeight||512,h=n.clipBias||0,m=n.shader||wu.ReflectorShader,d=n.multisample!==void 0?n.multisample:4,g=new ba,_=new G,v=new G,x=new G,E=new Re,w=new G(0,0,-1),M=new $e,S=new G,L=new G,N=new $e,A=new Re,D=new Ri(c,u,{samples:d,type:Hi}),U=new ei({name:m.name!==void 0?m.name:"unspecified",uniforms:Nx.clone(m.uniforms),fragmentShader:m.fragmentShader,vertexShader:m.vertexShader});U.uniforms.tDiffuse.value=D.texture,U.uniforms.color.value=o,U.uniforms.textureMatrix.value=A,this.material=U,this.onBeforeRender=function(P,b,O){const F=this.getReflectionCamera(O);if(v.setFromMatrixPosition(a.matrixWorld),x.setFromMatrixPosition(O.matrixWorld),E.extractRotation(a.matrixWorld),_.set(0,0,1),_.applyMatrix4(E),S.subVectors(v,x),S.dot(_)>0===!0&&this.forceUpdate===!1)return;S.reflect(_).negate(),S.add(v),E.extractRotation(O.matrixWorld),w.set(0,0,-1),w.applyMatrix4(E),w.add(x),L.subVectors(v,w),L.reflect(_).negate(),L.add(v),F.position.copy(S),F.up.set(0,1,0),F.up.applyMatrix4(E),F.up.reflect(_),F.lookAt(L),F.far=O.far,F.updateMatrixWorld(),F.projectionMatrix.copy(O.projectionMatrix),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(F.projectionMatrix),A.multiply(F.matrixWorldInverse),A.multiply(a.matrixWorld),g.setFromNormalAndCoplanarPoint(_,v),g.applyMatrix4(F.matrixWorldInverse),M.set(g.normal.x,g.normal.y,g.normal.z,g.constant);const V=F.projectionMatrix;F.isOrthographicCamera?(N.x=(Math.sign(M.x)+V.elements[8])/V.elements[0],N.y=(Math.sign(M.y)+V.elements[9])/V.elements[5],N.z=-O.far,N.w=1):(N.x=(Math.sign(M.x)+V.elements[8])/V.elements[0],N.y=(Math.sign(M.y)+V.elements[9])/V.elements[5],N.z=-1,N.w=(1+V.elements[10])/V.elements[14]),M.multiplyScalar(2/M.dot(N)),V.elements[2]=M.x,V.elements[6]=M.y,F.isOrthographicCamera?(V.elements[10]=M.z-h,V.elements[14]=M.w-1):(V.elements[10]=M.z+1-h,V.elements[14]=M.w),a.visible=!1;const tt=P.getRenderTarget(),k=P.xr.enabled,j=P.shadowMap.autoUpdate;P.xr.enabled=!1,P.shadowMap.autoUpdate=!1,P.setRenderTarget(D),P.state.buffers.depth.setMask(!0),P.autoClear===!1&&P.clear(),P.render(b,F),P.xr.enabled=k,P.shadowMap.autoUpdate=j,P.setRenderTarget(tt);const B=O.viewport;B!==void 0&&P.state.viewport(B),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return D},this.dispose=function(){D.dispose(),a.material.dispose()},this.getReflectionCamera=function(P){let b=this._reflectionCameras.get(P);return b===void 0&&(b=P.clone(),this._reflectionCameras.set(P,b)),b}}}wu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function v2(r,t=!1){const n=r[0].index!==null,a=new Set(Object.keys(r[0].attributes)),o=new Set(Object.keys(r[0].morphAttributes)),c={},u={},h=r[0].morphTargetsRelative,m=new Tn;let d=0;for(let g=0;g<r.length;++g){const _=r[g];let v=0;if(n!==(_.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in _.attributes){if(!a.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;c[x]===void 0&&(c[x]=[]),c[x].push(_.attributes[x]),v++}if(v!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". Make sure all geometries have the same number of attributes."),null;if(h!==_.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in _.morphAttributes){if(!o.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+".  .morphAttributes must be consistent throughout all geometries."),null;u[x]===void 0&&(u[x]=[]),u[x].push(_.morphAttributes[x])}if(t){let x;if(n)x=_.index.count;else if(_.attributes.position!==void 0)x=_.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+g+". The geometry must have either an index or a position attribute"),null;m.addGroup(d,x,g),d+=x}}if(n){let g=0;const _=[];for(let v=0;v<r.length;++v){const x=r[v].index;for(let E=0;E<x.count;++E)_.push(x.getX(E)+g);g+=r[v].attributes.position.count}m.setIndex(_)}for(const g in c){const _=W_(c[g]);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" attribute."),null;m.setAttribute(g,_)}for(const g in u){const _=u[g][0].length;if(_!==0){m.morphAttributes=m.morphAttributes||{},m.morphAttributes[g]=[];for(let v=0;v<_;++v){const x=[];for(let w=0;w<u[g].length;++w)x.push(u[g][w][v]);const E=W_(x);if(!E)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+g+" morphAttribute."),null;m.morphAttributes[g].push(E)}}}return m}function W_(r){let t,n,a,o=-1,c=0;for(let d=0;d<r.length;++d){const g=r[d];if(t===void 0&&(t=g.array.constructor),t!==g.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=g.itemSize),n!==g.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(a===void 0&&(a=g.normalized),a!==g.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(o===-1&&(o=g.gpuType),o!==g.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;c+=g.count*n}const u=new t(c),h=new Bi(u,n,a);let m=0;for(let d=0;d<r.length;++d){const g=r[d];if(g.isInterleavedBufferAttribute){const _=m/n;for(let v=0,x=g.count;v<x;v++)for(let E=0;E<n;E++){const w=g.getComponent(v,E);h.setComponent(v+_,E,w)}}else u.set(g.array,m);m+=g.count*n}return o!==void 0&&(h.gpuType=o),h}const _2={follow:.09,settle:.45},q_=2.2;function x2(r,t,n){const a=o=>Number.isFinite(o)?o:0;return{yaw:n.yaw*Math.tanh(a(r)*q_),pitch:-n.pitch*Math.tanh(a(t)*q_)}}function Y_(r,t,n,a,o){const c=2/a,u=c*o,h=1/(1+u+.48*u*u+.235*u*u*u),m=r-t,d=(n+c*m)*o,g=t+(m+d)*h;return t-r>0==g>t?[t,0]:[g,(n-c*d)*h]}class S2{constructor(t,n=_2){this.limit=t,this.feel=n,this.yaw=0,this.pitch=0,this.yawVelocity=0,this.pitchVelocity=0,this.targetYaw=0,this.targetPitch=0,this.held=!1}drag(t,n){const a=x2(t,n,this.limit);this.targetYaw=a.yaw,this.targetPitch=a.pitch,this.held=!0}release(){this.targetYaw=0,this.targetPitch=0,this.held=!1}get moving(){return this.held||this.yaw!==0||this.pitch!==0}update(t){if(!(t>0))return;const n=this.held?this.feel.follow:this.feel.settle;[this.yaw,this.yawVelocity]=Y_(this.yaw,this.targetYaw,this.yawVelocity,n,t),[this.pitch,this.pitchVelocity]=Y_(this.pitch,this.targetPitch,this.pitchVelocity,n,t)}}const kx=new G(0,1,0),Fi=Math.PI*2;function y2(r){let t=r>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function Br(r,t,n){const a=document.createElement("canvas");a.width=a.height=r;const o=a.getContext("2d");t(o,y2(n));const c=new wE(a);return c.colorSpace=ti,c.wrapS=c.wrapT=gu,c.anisotropy=8,c}function tl(r,t,n,a,o,c){const u=r.canvas.width;for(let h=0;h<n;h++)r.fillStyle=t()>.52?o:c,r.globalAlpha=.12+t()*.35,r.beginPath(),r.ellipse(t()*u,t()*u,.3+t()*a,.4+t()*a,t()*Fi,0,Fi),r.fill();r.globalAlpha=1}function M2(){const r=Br(512,(u,h)=>{u.fillStyle="#6c6856",u.fillRect(0,0,512,512);for(let m=0;m<170;m++){const d=h()*512,g=1+h()*12;u.strokeStyle=m%3===0?"#373e32":m%3===1?"#93917b":"#565a49",u.lineWidth=g,u.globalAlpha=.3+h()*.35,u.beginPath(),u.moveTo(d,-20);for(let _=0;_<550;_+=24)u.lineTo(d+Math.sin(_*.018+m)*(3+g),_);u.stroke()}u.globalAlpha=1;for(let m=0;m<120;m++){const d=h()*512,g=h()*512;u.strokeStyle="#292f24",u.lineWidth=.7+h(),u.beginPath(),u.moveTo(d,g),u.lineTo(d-2,g+6),u.lineTo(d+2,g+19+h()*30),u.stroke()}tl(u,h,7e3,1.4,"#cbc4a1","#252f26");for(let m=0;m<90;m++)u.fillStyle="#b0b39b",u.globalAlpha=.09+h()*.15,u.beginPath(),u.ellipse(h()*512,h()*512,2+h()*10,3+h()*7,h(),0,Fi),u.fill()},7021);r.repeat.set(2,3);const t=Br(256,(u,h)=>{const m=u.createLinearGradient(0,256,180,0);m.addColorStop(0,"#4a713b"),m.addColorStop(.5,"#739d49"),m.addColorStop(1,"#9fbf65"),u.fillStyle=m,u.fillRect(0,0,256,256),tl(u,h,3600,.8,"#bfce83","#365e38"),u.lineWidth=1.6,u.strokeStyle="rgba(202,216,142,.62)",u.beginPath(),u.moveTo(128,260),u.quadraticCurveTo(123,115,128,-4),u.stroke();for(let d=24;d<245;d+=24)for(const g of[-1,1]){const _=128+g*Math.sin(Math.PI*d/256)*127;u.strokeStyle="rgba(183,202,119,.38)",u.lineWidth=.7,u.beginPath(),u.moveTo(128,d+31),u.quadraticCurveTo(128+g*37,d+15,_,d-13),u.stroke();for(let v=1;v<=3;v++){const x=128+(_-128)*v/4;u.strokeStyle="rgba(166,186,107,.2)",u.lineWidth=.4,u.beginPath(),u.moveTo(x,d+31-v*11),u.lineTo(x+g*14,d-v*10),u.stroke()}}},8032),n=Br(256,u=>{u.fillStyle="#737373",u.fillRect(0,0,256,256),u.strokeStyle="#c0c0c0",u.lineWidth=2,u.beginPath(),u.moveTo(128,256),u.lineTo(128,0),u.stroke(),u.lineWidth=1;for(let h=24;h<245;h+=24)for(const m of[-1,1])u.beginPath(),u.moveTo(128,h+31),u.quadraticCurveTo(128+m*37,h+15,128+m*Math.sin(Math.PI*h/256)*127,h-13),u.stroke()},54);n.colorSpace=Ta;const a=Br(512,(u,h)=>{u.fillStyle="#5c6040",u.fillRect(0,0,512,512);for(let m=0;m<240;m++){const d=h()*512,g=h()*512,_=8+h()*40,v=u.createRadialGradient(d,g,0,d,g,_);v.addColorStop(0,m%3===0?"rgba(114,125,59,.55)":"rgba(49,55,37,.5)"),v.addColorStop(1,"rgba(60,62,37,0)"),u.fillStyle=v,u.fillRect(d-_,g-_,_*2,_*2)}tl(u,h,18e3,1.6,"#a19465","#2f392b");for(let m=0;m<650;m++){u.strokeStyle=h()>.5?"#90825c":"#303d2b",u.globalAlpha=.5,u.lineWidth=.4+h();const d=h()*512,g=h()*512;u.beginPath(),u.moveTo(d,g),u.lineTo(d+h()*9-4,g+2+h()*13),u.stroke()}},1643);a.repeat.set(10,10);const o=Br(512,(u,h)=>{u.fillStyle="#939787",u.fillRect(0,0,512,512);for(let m=0;m<180;m++){const d=h()*512,g=h()*512,_=8+h()*65,v=u.createRadialGradient(d,g,0,d,g,_);v.addColorStop(0,m%2?"rgba(63,72,64,.25)":"rgba(205,203,175,.36)"),v.addColorStop(1,"rgba(100,110,91,0)"),u.fillStyle=v,u.fillRect(d-_,g-_,_*2,_*2)}tl(u,h,13e3,1.1,"#dad7bd","#3c493e"),u.strokeStyle="rgba(208,211,187,.2)",u.lineWidth=1.4;for(let m=0;m<8;m++){u.beginPath(),u.moveTo(h()*512,0);for(let d=0;d<520;d+=40)u.lineTo((m*77+Math.sin(d/90)*39)%512,d);u.stroke()}},9076),c=Br(256,(u,h)=>{u.fillStyle="#506a32",u.fillRect(0,0,256,256),tl(u,h,12500,1.2,"#a7ae5b","#273f26");for(let m=0;m<900;m++){const d=h()*256,g=h()*256;u.strokeStyle=h()>.5?"#84944a":"#3f572b",u.lineWidth=.7,u.beginPath(),u.moveTo(d,g),u.lineTo(d+h()*3-1.5,g-1-h()*5),u.stroke()}},3363);return c.repeat.set(2,2),{bark:new Ji({color:"#c3baa3",map:r,bumpMap:r,bumpScale:.07,roughness:.93}),leaf:new p_({color:"#b9d593",map:t,bumpMap:n,bumpScale:.018,roughness:.48,metalness:0,clearcoat:.26,clearcoatRoughness:.36,side:Ai}),ground:new Ji({color:"#c0b79a",map:a,bumpMap:a,bumpScale:.08,roughness:.98}),rock:new Ji({color:"#bdc1af",map:o,bumpMap:o,bumpScale:.035,roughness:.66}),moss:new Ji({color:"#c0cd91",map:c,bumpMap:c,bumpScale:.035,roughness:.97}),twig:new Ji({color:"#686b37",roughness:.89}),dew:new p_({color:"#e7f6ed",roughness:.07,metalness:.04,transmission:0,transparent:!0,opacity:.8,clearcoat:1,clearcoatRoughness:0,ior:1.33})}}function Ip(r=9,t=1){const n=[],a=[],o=[];for(let u=0;u<=r;u++){const h=u/r,m=Math.pow(Math.sin(Math.PI*h),.78)*.3*t+.001;for(let d=0;d<=2;d++){const g=d-1;n.push(g*m,h,Math.sin(h*Math.PI)*.085-Math.abs(g)*m*.19+h*h*.07),a.push(d/2,h)}}for(let u=0;u<r;u++)for(let h=0;h<2;h++){const m=u*3+h,d=m+3;o.push(m,m+1,d,m+1,d+1,d)}const c=new Tn;return c.setAttribute("position",new De(n,3)),c.setAttribute("uv",new De(a,2)),c.setIndex(o),c.computeVertexNormals(),c}function kr(r,t,n,a){const o=new Mx(r),c=Math.max(r.length*3,9),u=o.computeFrenetFrames(c,!1),h=[],m=[],d=[],g=Array.from({length:n},()=>.92+a()*.16);for(let v=0;v<=c;v++){const x=v/c,E=o.getPointAt(x),w=x*(t.length-1),M=Math.floor(w),S=Math.min(M+1,t.length-1),L=dx.lerp(t[M],t[S],w-M);for(let N=0;N<=n;N++){const A=N/n*Fi,D=L*g[N%n]*(1+Math.sin(v*1.3+N*3.7)*.025),U=E.clone().addScaledVector(u.normals[v],Math.cos(A)*D).addScaledVector(u.binormals[v],Math.sin(A)*D);h.push(U.x,U.y,U.z),m.push(N/n,x)}}for(let v=0;v<c;v++)for(let x=0;x<n;x++){const E=v*(n+1)+x,w=E+n+1;d.push(E,E+1,w,E+1,w+1,w)}const _=new Tn;return _.setAttribute("position",new De(h,3)),_.setAttribute("uv",new De(m,2)),_.setIndex(d),_.computeVertexNormals(),_}function zp(r){const t=[],n=[],a=[],o=[];let c=0;for(const h of r){const m=h.getAttribute("position"),d=h.getAttribute("normal"),g=h.getAttribute("uv");for(let v=0;v<m.count;v++)t.push(m.getX(v),m.getY(v),m.getZ(v)),n.push(d.getX(v),d.getY(v),d.getZ(v)),a.push(g.getX(v),g.getY(v));const _=h.getIndex();if(_)for(let v=0;v<_.count;v++)o.push(_.getX(v)+c);c+=m.count,h.dispose()}const u=new Tn;return u.setAttribute("position",new De(t,3)),u.setAttribute("normal",new De(n,3)),u.setAttribute("uv",new De(a,2)),u.setIndex(o),u.computeBoundingSphere(),u}function Eu(r,t,n,a,o=1){const c=t.clone().normalize(),u=c.clone().cross(n).normalize();u.lengthSq()<.1&&u.set(1,0,0);const h=u.clone().cross(c).normalize(),m=new Re().makeBasis(u,c,h);return m.scale(new G(a*o,a,a)),m.setPosition(r),m}function Bp(r,t=!1){return new ee().setHSL(.19+r()*.075,.28+r()*.23,(t?.6:.49)+r()*.2)}function E2(r,t,n){const{height:a,radius:o}=n,c=n.detail==="far"||n.detail===!1||n.detail===0?0:n.detail==="mid"||n.detail===1?1:2,u=new cs;u.name="forest-tree";const h=[],m=[],d=new G((t()-.5)*a*.1,0,(t()-.5)*a*.07),g=[new G(0,-.12,0),new G(d.x*.1,a*.2,d.z*.1),new G(d.x*.35,a*.55,d.z*.4),new G(d.x,a,d.z)];if(h.push(kr(g,[o*1.36,o,o*.67,o*.15],c===2?14:9,t)),c>0){const E=5+Math.floor(t()*3);for(let w=0;w<E;w++){const M=w/E*Fi+t()*.28,S=o*(3+t()*2.3);h.push(kr([new G(Math.cos(M)*o*.2,o*.72,Math.sin(M)*o*.2),new G(Math.cos(M)*S*.45,.14,Math.sin(M)*S*.45),new G(Math.cos(M+.15)*S,-.04,Math.sin(M+.15)*S)],[o*.32,o*.19,.018],7,t))}}const _=c===0?7:10;for(let E=0;E<_;E++){const w=.4+E/_*.49,M=E*2.39996+t()*.42,S=a*(.14+t()*.11)*(1-Math.max(0,w-.65)*1.6),L=new G(d.x*w*w,a*w,d.z*w*w),N=new G(L.x+Math.cos(M)*S,L.y+a*(.08+t()*.07),L.z+Math.sin(M)*S),A=L.clone().lerp(N,.53);A.y-=a*.024,h.push(kr([L,A,N],[o*(.31-w*.13),o*.1,o*.024],c===2?8:6,t));const D=c===0?2:3;for(let U=0;U<D;U++){const P=L.clone().lerp(N,.5+U*.2),b=M+(U-1)*.88+(t()-.5)*.55,O=P.clone().add(new G(Math.cos(b)*S*.56,a*(.035+t()*.06),Math.sin(b)*S*.56));c>0&&h.push(kr([P,P.clone().lerp(O,.5).add(new G(0,-.04,0)),O],[o*.064,o*.036,.009],5,t));const F=c===0?27:c===1?37:45;for(let Y=0;Y<F;Y++){const V=t()*Fi,tt=Math.sqrt(t()),k=S*(.3+t()*.09),B=P.clone().lerp(O,.45+t()*.67).add(new G(Math.cos(V)*k*tt,(t()-.5)*k*.65,Math.sin(V)*k*tt)),W=new G(Math.cos(V),(t()-.5)*.9,Math.sin(V)),ct=new G((t()-.5)*.75,1,(t()-.5)*.75);m.push(Eu(B,W,ct,a*(.029+t()*.022),.9+t()*.45))}}}const v=new Ze(zp(h),r.bark);v.name="forest-tree-bark",v.castShadow=c>0,v.receiveShadow=!0,u.add(v);const x=new ml(Ip(c===0?4:6),r.leaf,m.length);return x.name="forest-tree-leaves",m.forEach((E,w)=>{x.setMatrixAt(w,E),x.setColorAt(w,Bp(t))}),x.instanceMatrix.needsUpdate=!0,x.castShadow=c>0,x.receiveShadow=!0,x.computeBoundingSphere(),u.add(x),u.userData.foliage=x,u.userData.swaySeed=t()*Fi,u}function b2(r,t,n=1){const a=new cs;a.name="forest-fern";const o=6+Math.floor(t()*3),c=[],u=[];for(let d=0;d<o;d++){const g=d/o*Fi+t()*.3,_=(.52+t()*.4)*n,v=(.2+t()*.13)*n,x=new G(Math.cos(g),0,Math.sin(g)),E=new G(-Math.sin(g),0,Math.cos(g)),w=M=>x.clone().multiplyScalar(_*M).setY(.055*n+Math.sin(M*Math.PI*.84)*v);u.push(kr([w(0),w(.3),w(.64),w(1)],[.01*n,.007*n,.004*n,.001*n],4,t));for(let M=0;M<11;M++){const S=.17+M/11*.78;for(const L of[-1,1]){const N=w(S),A=E.clone().multiplyScalar(L).addScaledVector(x,.4+S*.45).setY(.06-S*.18),D=Math.sin(S*Math.PI)*(.14+.035*t())*n;c.push(Eu(N,A,new G(0,1,0),D,.53))}}c.push(Eu(w(.93),x.clone().setY(-.25),kx,.08*n,.46))}const h=new Ze(zp(u),r.twig);a.add(h);const m=new ml(Ip(5,.9),r.leaf,c.length);return m.name="forest-fern-leaves",c.forEach((d,g)=>{m.setMatrixAt(g,d),m.setColorAt(g,Bp(t,!0))}),m.instanceMatrix.needsUpdate=!0,m.castShadow=!0,m.receiveShadow=!0,m.computeBoundingSphere(),a.add(m),a.userData.foliage=m,a.userData.swaySeed=t()*Fi,a}function T2(r,t,n=1){const a=new cs;a.name="forest-broadleaf";const o=5+Math.floor(t()*3),c=[],u=[],h=[];for(let _=0;_<o;_++){const v=_/o*Fi+t()*.4,x=n*(.16+t()*.3),E=n*(.12+t()*.18),w=new G(Math.cos(v)*E,x,Math.sin(v)*E);c.push(kr([new G(0,0,0),w.clone().multiplyScalar(.54).add(new G(0,.055*n,0)),w],[.012*n,.008*n,.004*n],5,t));const M=new G(Math.cos(v),-.1-t()*.2,Math.sin(v)),S=(.34+t()*.3)*n,L=Eu(w,M,kx,S,1.2+t()*.2);u.push(L);for(let N=0;N<2;N++){const A=.28+t()*.47,D=(t()-.5)*.26,U=new G(D,A,Math.sin(A*Math.PI)*.085-Math.abs(D)*.19+A*A*.07+.011).applyMatrix4(L),P=n*(.009+t()*.007);h.push(new Re().compose(U,new Xs,new G(P,P*.72,P)))}}const m=new Ze(zp(c),r.twig);m.castShadow=!0,a.add(m);const d=new ml(Ip(12),r.leaf,o);d.name="forest-broadleaf-leaves",u.forEach((_,v)=>{d.setMatrixAt(v,_),d.setColorAt(v,Bp(t,!0))}),d.instanceMatrix.needsUpdate=!0,d.castShadow=!0,d.receiveShadow=!0,d.computeBoundingSphere(),a.add(d);const g=new ml(new ls(1,8,5),r.dew,h.length);return g.name="forest-leaf-dew",h.forEach((_,v)=>g.setMatrixAt(v,_)),g.instanceMatrix.needsUpdate=!0,g.computeBoundingSphere(),a.add(g),a.userData.foliage=d,a.userData.swaySeed=t()*Fi,a}function A2(r=7391){return()=>{r|=0,r=r+1831565813|0;let t=Math.imul(r^r>>>15,1|r);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function pu(r,t){return Math.hypot((r+.18)/2.55,(t+.55)/3.45)}function Fr(r,t){const n=pu(r,t),a=.32-.77*Math.exp(-Math.pow(n/.91,6)),o=Math.max(0,-t-5)*.034,c=Math.sin(r*1.7+t*.37)*.064+Math.sin(t*2.3-r*.67)*.032;return a+o+c*Math.min(1,n)}const R2={yaw:.105,pitch:.057},w2={follow:.38,settle:2.8};function C2(r,t,n){return Math.max(1,Math.min(2,n||1,Math.sqrt(42e5/Math.max(1,r*t))))}const ru=(r=0,t=0,n=0)=>new G(r,t,n);class D2{constructor(t,n){this.canvas=t,this.scene=new Kv,this.camera=new Ti(55,1,.06,120),this.look=new S2(R2,w2),this.rng=A2(),this.clock={value:0},this.time=0,this.frame=0,this.request=0,this.last=0,this.running=!1,this.disposed=!1,this.ready=!1,this.plants=[],this.birds=[],this.leafHitTime=-20,this.leafHit=null,this.raycaster=new _1,this.resources=[],this.renderer=new g2({canvas:t,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=ti,this.renderer.toneMapping=dp,this.renderer.toneMappingExposure=1.08,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=K_,this.renderer.shadowMap.autoUpdate=!1,this.renderer.info.autoReset=!1,this.onLost=a=>{a.preventDefault(),this.stop(),n()},t.addEventListener("webglcontextlost",this.onLost),t.dataset.frames="0",t.dataset.time="0",t.dataset.waterHits="0",t.dataset.leafHits="0"}async init(){this.buildWorld(),this.ready=!0,this.renderer.shadowMap.needsUpdate=!0;try{await this.renderer.compileAsync(this.scene,this.camera)}catch(t){if(!this.disposed)throw t}}buildWorld(){const t=this.rng,n=M2();this.scene.background=new ee("#b5c7a7"),this.scene.fog=new Ap("#bccab0",10,72),this.camera.position.set(0,1.42,5),this.camera.lookAt(0,1.65,-9),this.scene.add(new d1("#e2eed4","#646447",2.05));const a=new x_("#fff1c9",3.8);a.position.set(8,13,-18),a.target.position.set(-2,0,1),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),Object.assign(a.shadow.camera,{left:-17,right:17,top:21,bottom:-17,near:1,far:65}),a.shadow.bias=-35e-5,a.shadow.normalBias=.035,this.scene.add(a,a.target);const o=new x_("#bcdad4",.58);o.position.set(-8,5,6),this.scene.add(o);const c=new ei({side:Wn,depthWrite:!1,uniforms:{sun:{value:ru(8,13,-18).normalize()}},vertexShader:"varying vec3 vDir; void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 vDir; uniform vec3 sun; void main(){vec3 d=normalize(vDir);float h=max(0.,d.y);vec3 c=mix(vec3(.72,.77,.59),vec3(.39,.64,.70),pow(h,.7));float s=max(0.,dot(d,sun));c+=vec3(1.,.82,.46)*pow(s,32.)*.65+vec3(1.,.94,.72)*pow(s,700.)*2.;gl_FragColor=vec4(c,1.);#include <tonemapping_fragment>
#include <colorspace_fragment>}`.replace(";#include",`;
#include`)}),u=new Ze(new ls(90,24,16),c);this.scene.add(u);const h=new Kv;h.add(new Ze(new ls(30,24,16),c));const m=new lp(this.renderer),d=m.fromScene(h,.05,.1,80);this.scene.environment=d.texture,this.scene.environmentIntensity=.55,this.resources.push(d),m.dispose(),h.children[0].geometry.dispose();const g=new zs(115,115,150,150);g.rotateX(-Math.PI/2),g.translate(0,0,-32);const _=g.attributes.position,v=[];for(let D=0;D<_.count;D++){const U=_.getX(D),P=_.getZ(D);_.setY(D,Fr(U,P));const b=(Math.sin(U*.72+P*.23)+Math.sin(P*.9-U*.23))*.25+.5,O=new ee().lerpColors(new ee("#60523b"),new ee("#5f7233"),b);pu(U,P)<1&&O.lerp(new ee("#3c4538"),.55),v.push(O.r,O.g,O.b)}g.setAttribute("color",new De(v,3)),g.computeVertexNormals();const x=n.ground.clone();x.color.set("#ffffff"),x.vertexColors=!0;const E=new Ze(g,x);E.receiveShadow=!0,this.scene.add(E);const w=[[-3.7,-.2,13,.6],[3.85,-1.8,14,.67],[-6.3,-5.8,16,.63],[5.9,-8,15,.61],[-2.8,-9.8,13.5,.41],[1.7,-12.6,15.6,.4],[-7.8,-14,16,.47],[8.2,-15,17,.6],[-4.7,-19,17,.5],[4.8,-23,18,.48],[-.9,-25,17,.43],[-10,-25,19,.55],[11,-28,18,.51],[-7,-32,18,.47],[2.3,-35,19,.43],[-3.5,-40,21,.5],[8,-43,22,.5],[-14,-38,22,.61],[16,-41,22,.65],[-10,-52,22,.4],[.7,-53,23,.37],[5,-62,24,.41],[-7,-67,24,.44],[15,-59,23,.46]];for(let D=0;D<w.length;D++){const[U,P,b,O]=w[D],F=E2(n,t,{height:b,radius:O,detail:D<5?"near":D<12?"mid":"far"});F.position.set(U,Fr(U,P),P),F.rotation.y=t()*Math.PI*2,this.scene.add(F)}n.leaf.onBeforeCompile=D=>{D.uniforms.forestTime=this.clock,D.vertexShader=`uniform float forestTime;
`+D.vertexShader,D.vertexShader=D.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        vec4 windOrigin=vec4(position,1.);
        #ifdef USE_INSTANCING
          windOrigin=instanceMatrix*windOrigin;
        #endif
        windOrigin=modelMatrix*windOrigin;
        float phase=windOrigin.x*.61+windOrigin.z*.42;
        transformed.x+=sin(forestTime*.63+phase)*.012;
        transformed.z+=sin(forestTime*.47+phase*1.7)*.009;`)},n.leaf.customProgramCacheKey=()=>"forest-leaf-wind-v1",this.addRocks(n.rock),this.addWater();for(let D=0;D<36;D++){const U=t()*Math.PI*2,P=3.7+t()*12,b=Math.cos(U)*P,O=Math.sin(U)*P-5;if(O>3||pu(b,O)<1.1)continue;const F=b2(n,t,.65+t()*.9);F.position.set(b,Fr(b,O)+.015,O),F.rotation.y=t()*6.28,this.scene.add(F)}for(const[D,U,P]of[[-1.65,3.22,1.1],[1.95,3.02,.95],[-2.95,1.4,1.2],[2.85,.7,.92],[-2.1,-2.8,.8]]){const b=T2(n,t,P);b.position.set(D,Fr(D,U),U),b.rotation.y=t()*6.28,b.userData.baseRotation=b.rotation.z,this.plants.push(b),this.scene.add(b)}const M=new zs(.12,.26,1,2);M.rotateX(-Math.PI/2);const S=new Ji({color:"#776443",roughness:.94,side:Ai}),L=new ml(M,S,380),N=new Mn;let A=0;for(let D=0;D<540&&A<380;D++){const U=(t()-.5)*28,P=t()*-35+4;pu(U,P)<1.12||(N.position.set(U,Fr(U,P)+.025,P),N.rotation.set((t()-.5)*.24,t()*6.28,(t()-.5)*.2),N.scale.setScalar(.45+t()*1.6),N.updateMatrix(),L.setMatrixAt(A++,N.matrix))}L.count=A,this.scene.add(L),this.addFallenWood(n.bark),this.addBirds(),this.addSunrays(),this.addMotes()}addRocks(t){const n=[],a=this.rng,o=(m,d,g,_=.66)=>{const v=new Lp(1,2),x=v.attributes.position,E=[];for(let w=0;w<x.count;w++){const M=x.getX(w),S=x.getY(w),L=x.getZ(w),N=1+.1*Math.sin(M*8+L*5)*Math.cos(S*7)+.055*Math.sin(L*18+M*11);x.setXYZ(w,M*N,S*N*_,L*N*.85);const A=dx.smoothstep(S+.18*Math.sin(M*8)*Math.cos(L*9),.12,.78),D=new ee("#777c6a").lerp(new ee("#647736"),A*.88);D.multiplyScalar(.8+a()*.3),E.push(D.r,D.g,D.b)}v.setAttribute("color",new De(E,3)),v.computeVertexNormals(),v.scale(g,g,g),v.rotateY(a()*6.28),v.translate(m,Fr(m,d)+g*.12,d),n.push(v)};[[-2.45,1.8,.73],[2.6,1,.77],[-2.25,-2.1,.56],[1.8,-3.45,.69],[-.72,2.91,.33],[.58,3.07,.38],[-3.1,-4.9,.8],[3.4,-6.1,1.1]].forEach(([m,d,g])=>o(m,d,g));for(let m=0;m<76;m++){const d=a()*6.28,g=.9+a()*.32;o(Math.cos(d)*2.55*g-.18,Math.sin(d)*3.45*g-.55,.08+a()*.22)}for(let m=0;m<70;m++){const d=(a()-.5)*4,g=(a()-.5)*5-.5;o(d,g,.035+a()*.09,.6)}const c=v2(n);n.forEach(m=>m.dispose());const u=t.clone();u.color.set("white"),u.vertexColors=!0,u.roughness=.65;const h=new Ze(c,u);h.castShadow=!0,h.receiveShadow=!0,this.scene.add(h)}addWater(){const t=new Rx;for(let o=0;o<=100;o++){const c=o/100*Math.PI*2,u=1+.045*Math.sin(c*5)+.025*Math.sin(c*9),h=Math.cos(c)*2.6*u-.18,m=Math.sin(c)*3.48*u+.55;o===0?t.moveTo(h,m):t.lineTo(h,m)}const n={name:"ForestWater",uniforms:{color:{value:new ee("#719478")},tDiffuse:{value:null},textureMatrix:{value:new Re},time:{value:0},ripple:{value:new G(0,0,-100)}},vertexShader:"uniform mat4 textureMatrix; varying vec4 vReflection; varying vec3 vWorld; void main(){vReflection=textureMatrix*vec4(position,1.); vWorld=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`
        uniform sampler2D tDiffuse; uniform float time; uniform vec3 ripple; varying vec4 vReflection; varying vec3 vWorld;
        void main(){
          vec2 p=vWorld.xz; float age=time-ripple.z;float dist=length(p-ripple.xy);
          float pulse=sin(dist*26.-age*4.2)*exp(-pow((dist-age*.39)*2.5,2.))*exp(-age*.85)*step(0.,age);
          vec2 flow=vec2(sin(p.y*8.+time*.52)+sin(p.x*14.+p.y*3.+time*.37),cos(p.x*9.-time*.43))*.0016;
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
        }`};this.reflection=new wu(new Np(t,48),{textureWidth:1024,textureHeight:1024,clipBias:.004,multisample:0,shader:n}),this.reflection.rotation.x=-Math.PI/2,this.reflection.position.y=.075;const a=this.reflection.material;a.transparent=!0,a.depthWrite=!1,this.waterUniforms=a.uniforms,this.reflection.renderOrder=1,this.scene.add(this.reflection)}addFallenWood(t){const n=new vl(.18,.24,3.6,16,8);n.rotateZ(Math.PI/2);const a=new Ze(n,t);a.position.set(-2.8,.59,-5.2),a.rotation.y=-.32,a.castShadow=!0,a.receiveShadow=!0,this.scene.add(a)}addBirds(){const t=new Ji({color:"#6c6b4d",roughness:.86}),n=new Ji({color:"#b6b393",roughness:.9}),a=new Ji({color:"#202923",roughness:.28});for(const[o,c,u]of[[-1.68,.93,-5.42]]){const h=new cs,m=new Ze(new ls(.12,10,8),t);m.scale.set(.8,1,1.35),h.add(m);const d=new Ze(new ls(.096,10,8),n);d.position.set(0,-.01,.06),d.scale.set(.76,.9,1),h.add(d);const g=new Ze(new ls(.075,10,8),t);g.position.set(0,.12,.08),h.add(g);const _=new Ze(new Mu(.021,.075,6),a);_.rotation.x=Math.PI/2,_.position.set(0,.12,.17),h.add(_);const v=new Ze(new Mu(.055,.24,5),t);v.rotation.x=-1.2,v.position.set(0,-.04,-.2),h.add(v);for(const x of[-.036,.036]){const E=new Ze(new vl(.006,.004,.09,4),a);E.position.set(x,-.13,.01),h.add(E)}h.position.set(o,c,u),h.rotation.y=.65,this.birds.push(h),this.scene.add(h)}}addSunrays(){const t=new ei({transparent:!0,depthWrite:!1,side:Ai,blending:mu,uniforms:{},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 vUv;void main(){float edge=pow(sin(vUv.x*3.14159),2.);float end=smoothstep(0.,.15,vUv.y)*(1.-smoothstep(.62,1.,vUv.y));gl_FragColor=vec4(.88,.84,.58,edge*end*.034);}"});for(let n=0;n<5;n++){const a=ru(5.3+n*.74,11,-14.5-n*1.5),o=ru(-3.2+n*.65,.1,3-n*.6),c=a.clone().add(o).multiplyScalar(.5),u=a.distanceTo(o),h=new Ze(new zs(.32+n*.16,u),t);h.position.copy(c),h.quaternion.setFromUnitVectors(ru(0,1,0),a.clone().sub(o).normalize()),this.scene.add(h)}}addMotes(){const t=[],n=[];for(let c=0;c<42;c++)t.push((this.rng()-.5)*15,this.rng()*6+.7,-this.rng()*25),n.push(this.rng()*6.28);const a=new Tn;a.setAttribute("position",new De(t,3)),a.setAttribute("phase",new De(n,1));const o=new ei({transparent:!0,depthWrite:!1,blending:mu,uniforms:{time:this.clock},vertexShader:"uniform float time;attribute float phase;varying float fade;void main(){vec3 p=position;p.x+=sin(time*.15+phase)*.17;p.y+=sin(time*.19+phase)*.13;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(14./-mv.z,1.,2.6);fade=.1+.15*pow(max(0.,sin(phase+time*.12)),2.);}",fragmentShader:"varying float fade;void main(){float a=1.-smoothstep(.08,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.9,.87,.65,a*fade);}"});this.scene.add(new RE(a,o))}setSize(t,n,a){this.disposed||(this.renderer.setPixelRatio(C2(t,n,a)),this.renderer.setSize(Math.max(1,t),Math.max(1,n),!1),this.camera.aspect=t/Math.max(1,n),this.camera.fov=this.camera.aspect<.8?66:55,this.camera.updateProjectionMatrix(),this.canvas.dataset.dpr=String(this.renderer.getPixelRatio()))}renderFrame(t){if(!this.ready||this.disposed)return;const n=Math.max(0,Math.min(t,.05));this.time+=n,this.clock.value=this.time,this.look.update(n),this.camera.lookAt(Math.sin(this.look.yaw)*14,1.65+this.look.pitch*14,-9),this.waterUniforms.time.value=this.time;for(let a=0;a<this.plants.length;a++){const o=this.plants[a],c=this.time-this.leafHitTime,u=o===this.leafHit&&c<5?Math.sin(c*5.5)*Math.exp(-c*1.15)*.045:0;o.rotation.z=(o.userData.baseRotation||0)+Math.sin(this.time*.48+a*1.8)*.007+u}for(let a=0;a<this.birds.length;a++)this.birds[a].rotation.y=.65+Math.sin(this.time*.21+a*2.1)*.09;this.renderer.info.reset(),this.renderer.render(this.scene,this.camera),this.frame++,Object.assign(this.canvas.dataset,{frames:String(this.frame),time:this.time.toFixed(4),lookYaw:this.look.yaw.toFixed(5),lookPitch:this.look.pitch.toFixed(5),drawCalls:String(this.renderer.info.render.calls),triangles:String(this.renderer.info.render.triangles)})}start(){if(this.running||this.disposed)return;this.running=!0,this.canvas.dataset.running="true",this.last=performance.now();const t=n=>{if(!this.running)return;const a=(n-this.last)/1e3;this.last=n,this.renderFrame(a),this.request=requestAnimationFrame(t)};this.request=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.request),this.request=0,this.canvas.dataset.running="false",this.look.release()}drag(t,n){this.running&&this.look.drag(t,n)}releaseDrag(){this.look.release()}setOnInteraction(t){this.onInteraction=t}touch(t,n){var c,u;if(!this.running||this.disposed)return;this.raycaster.setFromCamera(new Xt(t,n),this.camera);const a=this.raycaster.intersectObjects(this.plants,!0)[0],o=this.raycaster.intersectObject(this.reflection)[0];if(a&&(!o||a.distance<o.distance)){let h=a.object;for(;h.parent&&!this.plants.includes(h);)h=h.parent;this.leafHit=h,this.leafHitTime=this.time,this.canvas.dataset.leafHits=String(Number(this.canvas.dataset.leafHits)+1),(c=this.onInteraction)==null||c.call(this,{kind:"leaf",position:a.point.toArray(),strength:.18})}else o&&(this.waterUniforms.ripple.value.set(o.point.x,o.point.z,this.time),this.canvas.dataset.waterHits=String(Number(this.canvas.dataset.waterHits)+1),(u=this.onInteraction)==null||u.call(this,{kind:"water",position:o.point.toArray(),strength:.22}))}dispose(){var o;if(this.disposed)return;this.stop(),this.disposed=!0,this.ready=!1,this.onInteraction=void 0,this.canvas.removeEventListener("webglcontextlost",this.onLost);const t=new Set,n=new Set,a=new Set;this.scene.traverse(c=>{var h;const u=c;if(u.geometry&&t.add(u.geometry),u.material)for(const m of Array.isArray(u.material)?u.material:[u.material])n.add(m);c instanceof Op&&"shadow"in c&&((h=c.shadow)==null||h.dispose())});for(const c of n){for(const u of Object.values(c))u instanceof Pn&&a.add(u);c.dispose()}t.forEach(c=>c.dispose()),a.forEach(c=>c.dispose()),(o=this.reflection)==null||o.getRenderTarget().dispose(),this.resources.forEach(c=>c.dispose()),this.renderer.renderLists.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.scene.clear(),this.canvas.dataset.disposed="true"}}class U2 extends aM{constructor(){super({canvasClass:"forest-world-canvas",isSupported:()=>typeof window.WebGL2RenderingContext<"u",create:(t,n)=>new D2(t,n)})}configure(t){t.setOnInteraction(n=>{var o;const a=this.top;this.status==="ready"&&(a!=null&&a.running)&&((o=a.onInteraction)==null||o.call(a,n))})}touch(t,n,a){var o;this.top!==t||!t.running||this.status!=="ready"||(o=this.engine)==null||o.touch(Math.max(-1,Math.min(1,n)),Math.max(-1,Math.min(1,a)))}}const ou=new U2;function Z_({active:r,className:t,onInteraction:n}){const a=xn.useRef(null),o=xn.useRef(null),c=xn.useRef(null),u=xn.useRef(n);u.current=n;const[h,m]=xn.useState("loading"),d=iM(r);return xn.useEffect(()=>{if(!o.current)return;const g={mount:o.current,running:!1,onStatus:m,onInteraction:v=>{var x;return(x=u.current)==null?void 0:x.call(u,v)}};c.current=g;const _=ou.acquire(g);return()=>{c.current=null,_()}},[]),xn.useEffect(()=>{c.current&&ou.setRunning(c.current,d)},[d,h]),nM(ou,a,c,d&&h==="ready"),xn.useEffect(()=>{const g=a.current,_=c.current;if(!d||h!=="ready"||!g||!_)return;let v=null;const x=S=>{!S.isPrimary||S.button!==0||v||(v={id:S.pointerId,x:S.clientX,y:S.clientY,moved:!1})},E=S=>{!v||S.pointerId!==v.id||Math.hypot(S.clientX-v.x,S.clientY-v.y)>6&&(v.moved=!0)},w=S=>{if(!v||S.pointerId!==v.id)return;const L=!v.moved&&Math.hypot(S.clientX-v.x,S.clientY-v.y)<=6;if(v=null,!L)return;const N=g.getBoundingClientRect();!N.width||!N.height||S.clientX<N.left||S.clientX>N.right||S.clientY<N.top||S.clientY>N.bottom||ou.touch(_,(S.clientX-N.left)/N.width*2-1,1-(S.clientY-N.top)/N.height*2)},M=()=>{v=null};return g.addEventListener("pointerdown",x),window.addEventListener("pointermove",E),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",M),window.addEventListener("blur",M),()=>{g.removeEventListener("pointerdown",x),window.removeEventListener("pointermove",E),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",M),window.removeEventListener("blur",M),M()}},[d,h]),je.jsxs("div",{ref:a,className:`forest-world${t?` ${t}`:""}`,"data-state":h,"data-motion":d?"running":"paused","data-scene-surface":!0,role:"group","aria-label":"아침 숲: 이슬 맺힌 잎과 물가에 앉아 바라보는 숲속 쉼터",children:[je.jsx("div",{ref:o,className:"forest-world-mount"}),h==="loading"?je.jsx("span",{className:"forest-world-status",role:"status",children:"아침 숲을 준비하고 있어요"}):null,h==="failed"?je.jsxs("div",{className:"forest-world-fallback",role:"status",children:[je.jsx("span",{children:"아침 숲"}),je.jsx("p",{children:"이 기기에서 3D 장면을 표시하지 못했어요."}),je.jsx("p",{children:"세션은 계속 이용할 수 있어요."})]}):null]})}const L2=`
  html, body, #forest-harness-root { margin: 0; width: 100%; height: 100%; overflow: hidden; }
  .forest-harness { position: fixed; inset: 0; background: #263a2c; color: #edf0df; font-family: system-ui, sans-serif; }
  .forest-harness-stage { position: absolute; inset: 0; }
  .forest-harness-overlay { position: fixed; inset: 0; z-index: 2; }
  .forest-harness-controls { position: fixed; z-index: 5; top: 12px; left: 12px; right: 12px; width: fit-content; max-width: calc(100% - 48px); padding: 12px; border: 1px solid #bacaab40; border-radius: 12px; background: #0d2114cb; box-shadow: 0 6px 24px #09100d30; backdrop-filter: blur(10px); }
  .forest-harness-controls h1 { font-size: 14px; font-weight: 550; margin: 0 0 8px; letter-spacing: .03em; }
  .forest-harness-controls p { font-size: 11px; margin: 6px 0 0; line-height: 1.5; }
  .forest-harness-actions { display: flex; gap: 5px; flex-wrap: wrap; }
  .forest-harness-controls button { color: inherit; background: #e3ecca14; padding: 6px 9px; border: 1px solid #d9e8ba44; border-radius: 5px; cursor: pointer; font: inherit; font-size: 11px; }
  .forest-harness-controls button:focus-visible { outline: 2px solid #e0dda6; outline-offset: 2px; }
  .forest-harness-controls output { display: block; font-size: 10px; margin-top: 7px; opacity: .8; }
  .forest-harness-empty { position: absolute; top: 50%; width: 100%; text-align: center; }
  .forest-harness[data-capture='true'] .forest-harness-controls { display: none; }
`;function N2(){const[r,t]=xn.useState(!0),[n,a]=xn.useState(!0),[o,c]=xn.useState(!1),[u,h]=xn.useState(!1),[m,d]=xn.useState({main:0,second:0}),[g,_]=xn.useState(null),v=new URLSearchParams(window.location.search).get("capture")==="1";xn.useEffect(()=>{const E=document.documentElement.classList.contains("reduce-motion");return()=>{document.documentElement.classList.toggle("reduce-motion",E)}},[]),xn.useEffect(()=>{document.documentElement.classList.toggle("reduce-motion",u)},[u]);const x=(E,w)=>{d(M=>({...M,[E]:M[E]+1})),_({holder:E,event:w})};return je.jsxs("div",{className:"forest-harness","data-capture":v,"data-active":r,"data-mounted":n,"data-reduced":u,"data-second":o,children:[je.jsx("style",{children:L2}),je.jsx("main",{className:"forest-harness-stage","data-testid":"main-holder",children:n?je.jsx(Z_,{active:r,onInteraction:E=>x("main",E)}):je.jsx("p",{className:"forest-harness-empty",children:"Scene unmounted"})}),n&&o?je.jsx("section",{className:"forest-harness-overlay","aria-label":"Fullscreen holder","data-testid":"second-holder",children:je.jsx(Z_,{active:r,onInteraction:E=>x("second",E)})}):null,je.jsxs("aside",{className:"forest-harness-controls","aria-label":"Scene verification controls",children:[je.jsx("h1",{children:"아침 숲 · 독립 3D 검증"}),je.jsxs("div",{className:"forest-harness-actions",children:[je.jsx("button",{type:"button","data-testid":"active-toggle","aria-pressed":r,onClick:()=>t(E=>!E),children:r?"Pause":"Play"}),je.jsxs("button",{type:"button","data-testid":"motion-toggle","aria-pressed":u,onClick:()=>h(E=>!E),children:["Reduced motion ",u?"on":"off"]}),je.jsxs("button",{type:"button","data-testid":"holder-toggle","aria-pressed":o,onClick:()=>c(E=>!E),children:["Second holder ",o?"on":"off"]}),je.jsx("button",{type:"button","data-testid":"mount-toggle","aria-pressed":n,onClick:()=>a(E=>!E),children:n?"Unmount":"Mount"})]}),je.jsx("p",{children:"조금 드래그하면 시선이 움직이고 천천히 돌아옵니다. 가까운 잎이나 물을 가볍게 눌러 보세요."}),je.jsxs("output",{"data-testid":"interaction-status","data-main-events":m.main,"data-second-events":m.second,"data-event-holder":(g==null?void 0:g.holder)??"","data-event-kind":(g==null?void 0:g.event.kind)??"",children:["Events main ",m.main," / second ",m.second,g?` · ${g.holder}: ${g.event.kind} ${g.event.strength.toFixed(2)}`:" · no audio created"]})]})]})}eM.createRoot(document.getElementById("forest-harness-root")).render(je.jsx(xn.StrictMode,{children:je.jsx(N2,{})}));
